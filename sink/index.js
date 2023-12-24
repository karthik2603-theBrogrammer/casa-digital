import { kafka } from "../kafka/index.js";
import fs from "fs/promises";
import c from "pg";
const { Client } = c;

const init = async () => {
  try {
    const jsonFilePath = "config.json";
    const data = await fs.readFile(jsonFilePath, "utf8");
    const jsonFileData = JSON.parse(data);
    console.log(jsonFileData);
    return jsonFileData;
  } catch (err) {
    console.error("Error reading JSON file:", err);
    throw err;
  }
};

const configData = await init();
console.log(configData);

const client = new Client(configData.docker.timescale_config);

const initDatabaseTables = async () => {
  await client.connect();

  try {
    // Iterate over topics and create corresponding hypertables if they don't exist
    for (const topic of configData.topics) {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${topic} (
          time TIMESTAMPTZ NOT NULL,
          key TEXT,
          value TEXT,
          PRIMARY KEY (time, key)
        );
        
        SELECT create_hypertable('${topic}', 'time', if_not_exists => TRUE);
      `;
      await client.query(createTableQuery);
      console.log(`Hypertable ${topic} is ready.`);
    }
  } catch (error) {
    console.error("Error initializing database hypertables:", error);
  }
};

const initKafka = async () => {
  await initDatabaseTables();

  const consumer = kafka.consumer({ groupId: "casa-digital" });
  await consumer.subscribe({ topics: configData.topics, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      const data = {
        time: new Date(), // You may adjust this based on the actual time from Kafka message
        key: message.key.toString(),
        value: message.value.toString(),
      };
      try {
        const insertQuery = {
          text: `INSERT INTO ${topic} (time, key, value) VALUES ($1, $2, $3) ON CONFLICT (time, key) DO NOTHING;`,
          values: [data.time, data.key, data.value],
        };
        await client.query(insertQuery);
        console.log(`Record inserted into ${topic} table:`, data);
      } catch (error) {
        console.error("Error inserting record:", error);
      } 
    },
  });
};

initKafka();
