import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 4000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const DEV_DB_URL = process.env.DEV_DB_URL;
export const PROD_DB_URL = process.env.PROD_DB_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
export const COOKIE_EXPIRES_IN = process.env.COOKIE_EXPIRES_IN || 7; // days
export const COOKIE_SECURE = NODE_ENV === 'production';
export const COOKIE_HTTP_ONLY = true;
