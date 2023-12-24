const { kafka } = require("../kafka");
const initKafka = async () => {
  const producer = kafka.producer();
  console.log("Kafka Connecting ..");
  await producer.connect();
  console.log("Kafka Producer connected !");
  await producer.send({
    topic: "test",
    messages: [
      {
        partition: 0,
        key: "test-key",
        value: JSON.stringify({ HEYYYYYY: "HEYYYYYYYYYYY" }),
      },
    ],
  });
};
initKafka();
