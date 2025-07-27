import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 8050;
export const MONGO_URI = process.env.MONGO_URI;
export const STORE_ID = process.env.STORE_ID;
export const STORE_PASSWORD = process.env.STORE_PASSWORD;