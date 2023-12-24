const { Kafka } = require("kafkajs");
exports.kafka = new Kafka({
  brokers: ["localhost:9092"],
  //   Insert your ip/ localhost along with the port number.
  // If there is not change in the docker compose, this can be retained as it is.
});
