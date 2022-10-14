import pkg from 'pg'
import dotenv from 'dotenv'

dotenv.config();

let connection;
const {Pool} = pkg;

try {
    connection = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
} catch (error) {
console.log(`Error "${error}" while trying to connect to ${process.env.DATABASE_URL}.`)    
}

export default connection;