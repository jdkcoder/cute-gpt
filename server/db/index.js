import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
const client = createClient({
   url: process.env.TURSO_DB,
   authToken: process.env.TURSO_TOKEN,
});
export default drizzle(client);
