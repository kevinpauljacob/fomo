import mongoose from "mongoose";
import logger from "./logger";
require("dotenv").config();

async function connect() {
  const dbUri = process.env.DB_URI;

  if (!dbUri) {
    logger.error(
      "Database URI (dbUri) is not defined in the environment variables."
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(dbUri);
    logger.info("Connected to DB");
  } catch (error) {
    logger.error("Could not connect to DB", error);
    process.exit(1);
  }
}

export default connect;
