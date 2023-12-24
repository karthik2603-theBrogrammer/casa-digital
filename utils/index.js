import fs from "fs/promises";
export const init = async () => {
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