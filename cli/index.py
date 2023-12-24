import json
from rich.console import Console
from rich.table import Table
from rich.traceback import install
from rich.theme import Theme
import psycopg2
from click_shell import shell

custom_theme = Theme({"success": "green", "error": "bold red", "info": "cyan"})
console = Console(theme=custom_theme)

connection = psycopg2.connect(
    user="postgres",
    password="password",
    host="127.0.0.1",
    port="5432",
    database="postgres"
)
cursor = connection.cursor()

@shell(prompt="CasaDigitalCLI >> ", intro="""
__      __   _                    _____       ___                 ___  _      _ _        _   _
\ \    / /__| |__ ___ _ __  ___  |_   _|__   / __|__ _ ___ __ _  |   \(_)__ _(_) |_ __ _| | | |
 \ \/\/ / -_) / _/ _ \ '  \/ -_)   | |/ _ \ | (__/ _` (_-</ _` | | |) | / _` | |  _/ _` | | |_|
  \_/\_/\___|_\__\___/_|_|_\___|   |_|\___/  \___\__,_/__/\__,_| |___/|_\__, |_|\__\__,_|_| (_)
                                                                        |___/                            
""")
def casa_digital_cli():
    pass

@casa_digital_cli.command()
def help():
    console.log("""
        Here is a list of commands for you!
        1. help: The command you just executed!
        2. show-data: Fetch data from a selected table.
        3. quit: To quit the application.
        4. more: To know more about the application.
    """)

def fetch_and_display_data(table_name):
    try:
        query = f"SELECT * FROM {table_name};"
        cursor.execute(query)
        rows = cursor.fetchall()
        if not rows:
            console.print(
                f"No data found in {table_name} table! 🔴", style='error')
        else:
            table = Table(title=f"{table_name.capitalize()} Table")
            for col_description in cursor.description:
                table.add_column(col_description.name, style='cyan')

            for row in rows:
                table.add_row(*map(str, row))

            console.print(table)

    except psycopg2.Error as e:
        console.print(f"Error executing SQL query: {e}", style='error')

@casa_digital_cli.command()
def show_data():
    config_path = "../config.json"  # Update with the correct path
    with open(config_path, "r") as config_file:
        config_data = json.load(config_file)

    table_names = config_data["topics"]

    console.log("Available tables:")
    for idx, table_name in enumerate(table_names, start=1):
        console.log(f"{idx}. {table_name}")

    selected_index = int(
        input("Enter the number of the table you want to fetch data from: ")) - 1

    if 0 <= selected_index < len(table_names):
        selected_table = table_names[selected_index]
        fetch_and_display_data(selected_table)
    else:
        console.print("Invalid selection! 🔴", style='error')

if __name__ == "__main__":
    casa_digital_cli()
# from rich.console import Console
# from rich.table import Table
# from rich.traceback import install
# from rich.theme import Theme
# import psycopg2
# from click_shell import shell

# custom_theme = Theme({"success": "green", "error": "bold red", "info": "cyan"})
# console = Console(theme=custom_theme)


# connection = psycopg2.connect(
#     user="postgres",
#     password="password",
#     host="127.0.0.1",
#     port="5432",
#     database="postgres"
# )
# cursor = connection.cursor()

# # Assume you have a PostgreSQL connection and cursor already created and available globally
# # connection = psycopg2.connect(...)
# # cursor = connection.cursor()


# @shell(prompt="CasaDigitalCLI >> ", intro="Welcome to the CasaDigitalCLI!")
# def casa_digital_cli():
#     pass


# @casa_digital_cli.command()
# def help():
#     console.log("""
#         Here is a list of commands for you!
#         1. help: The command you just executed!
#         2. show-gas-data: Fetch data from the gas table.
#         3. show-temperature-data: Fetch data from the temperature table.
#         4. show-water-level-data: Fetch data from the water level table.
#         5. show-cascasa-digital-status-data: Fetch data from the casa_digital_status table.
#         6. quit: To quit the application.
#         7. more: To know more about the application.
#     """)


# def fetch_and_display_data(table_name):
#     try:
#         query = f"SELECT * FROM {table_name};"
#         cursor.execute(query)
#         rows = cursor.fetchall()
#         print(rows)

#         if not rows:
#             console.print(
#                 f"No data found in {table_name} table! 🔴", style='error')
#         else:
#             table = Table(title=f"{table_name.capitalize()} Table")
#             for col_description in cursor.description:
#                 table.add_column(col_description.name, style='cyan')

#             for row in rows:
#                 table.add_row(*map(str, row))

#             console.print(table)

#     except psycopg2.Error as e:
#         console.print(f"Error executing SQL query: {e}", style='error')


# @casa_digital_cli.command()
# def show_gas_data():
#     fetch_and_display_data("gas_sensor_data")


# @casa_digital_cli.command()
# def show_temperature_data():
#     fetch_and_display_data("temperature_data")


# @casa_digital_cli.command()
# def show_water_level_data():
#     fetch_and_display_data("water_level_table")


# @casa_digital_cli.command()
# def show_cascasa_digital_status_data():
#     fetch_and_display_data("casa_digital_status_table")


# if __name__ == "__main__":
#     casa_digital_cli()
