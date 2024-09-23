import { eq } from "drizzle-orm";
import db from "../db"
import * as schema from '../db/schema'


export default defineEventHandler(async (e) => {
   try {
      await db.delete(schema[ 'message' ]).where(eq(schema[ 'message' ][ 'conversation_id' ], conversation_id))
      await db.delete(schema[ 'reply' ]).where(eq(schema[ 'reply' ][ 'conversation_id' ], conversation_id))
      await db.delete(schema[ 'conversation' ]).where(eq(schema[ 'conversation' ][ 'id' ], conversation_id))
      return { success: true }
   } catch (err) {
      console.log(err)
      return err
   }
})