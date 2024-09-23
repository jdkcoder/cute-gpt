import { eq } from "drizzle-orm";
import db from "../db"
import * as schema from '../db/schema'


export default defineEventHandler(async (e) => {
   try {
      const { user } = getRequestHeaders(e)
      const [ { id: user_id } ] = await db.select().from(schema[ 'user' ]).where(eq(schema[ 'user' ][ 'name' ], user))
      const conversations = await db.select().from(schema[ 'conversation' ]).where(eq(schema[ 'conversation' ][ 'user_id' ], user_id))
      return { data: conversations }
   } catch (err) {
      console.log(err)
      return err
   }
})