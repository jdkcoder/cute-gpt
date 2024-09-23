import { eq } from "drizzle-orm";
import db from "../db"
import * as schema from '../db/schema'

export default defineEventHandler(async (e) => {
   try {
      const body = await readBody(e)
      const [ user ] = await db.select().from(schema[ 'user' ]).where(eq(schema[ 'user' ][ 'name' ], body.user))
      return { data: user }
   } catch (err) {
      console.log(err)
      return err
   }
})