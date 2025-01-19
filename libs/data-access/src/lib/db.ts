import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();
const connectDb = async () => {
  try {
    const connection = await mysql.createPool({
      host: process.env['DB_HOST'],
      user: process.env['DB_USER'],
      password: process.env['DB_PASSWORD'],
      database: process.env['DB_NAME'],
      waitForConnections: true,
    });
    console.log('MySQL Connected');
    return connection;
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDb;
