import { defineConfig } from 'drizzle-kit';
export default defineConfig({
    schema: './server/db/schema.js',
    out: './server/db/migrations',
    dialect: 'sqlite',
    driver: 'turso',
    dbCredentials: {
        url: process.env.TURSO_DB,
        authToken: process.env.TURSO_TOKEN,
    },
});