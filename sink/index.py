# consumer = KafkaConsumer(like_topic, bootstrap_servers='localhost:9092')
import json
import psycopg2
from kafka import KafkaConsumer

def init():
    try:
        with open("config.json", "r") as json_file:
            json_data = json.load(json_file)
            print(json_data)
            return json_data
    except Exception as e:
        print(f"Error reading JSON file: {e}")
        raise e

config_data = init()
print(config_data)

client = psycopg2.connect(
    user="postgres",
    password="timescale",
    host="localhost",
    port="5432",
    database="postgres",
)

def init_database_tables():
    try:
        cursor = client.cursor()
        # Iterate over topics and create corresponding hypertables if they don't exist
        for topic in config_data["topics"]:
            create_table_query = f"""
                CREATE TABLE IF NOT EXISTS {topic} (
                    time TIMESTAMPTZ NOT NULL,
                    key TEXT,
                    value TEXT,
                    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY (time, key)
                );
                
                SELECT create_hypertable('{topic}', 'time', if_not_exists => TRUE);
            """
            cursor.execute(create_table_query)
            print(f"Hypertable {topic} is ready.")
        cursor.close()
        client.commit()
    except Exception as e:
        print(f"Error initializing database hypertables: {e}")

def init_kafka():
    init_database_tables()

    consumer = KafkaConsumer(
        *config_data["topics"],
        group_id="casa-digital",
        bootstrap_servers=config_data["kafka"]["bootstrap_servers"],
    )

    for message in consumer:
        print({
            "key": message.key.decode("utf-8"),
            "value": message.value.decode("utf-8"),
        })

init_kafka()
