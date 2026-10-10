import "dotenv/config";
import app from "./app.js";
import { db } from "./config/database.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const testDatabase = async () => {
  try {
    const result = await db.execute("SELECT NOW()");
    console.log("Database connected successfully");
    console.log(result);
  } catch (error) {
    console.error("Database connection failed");
    console.error(error);
  }
};

testDatabase();
