import app from "./app";
import config from "./config";
import { prisma } from "./libs/prisma";
const PORT = config.port || 5000;
async function main() {
  try {
    await prisma.$connect();
    console.log("DATABASE CONNECT SUCCESSFULLY");
    app.listen(PORT, () => {
      console.log(`SERVER IS RUNNING ON PORT http://localhost:${PORT}`);
    });
  } catch (error) {
    await prisma.$disconnect();
    process.exit(1);
    console.error(error);
  }
}
main()
