import { eq, or } from "drizzle-orm";
import db from "../db"
import * as schema from '../db/schema'

export default defineEventHandler(async (e) => {
   try {
      const { type, mode } = getQuery(e)
      const body = await readBody(e)
      const res_obj = { success: true }
      switch (type) {
         case 'conversation':
            const [ user ] = await db.select().from(schema[ 'user' ]).where(eq(schema[ 'user' ][ 'name' ], body.user))
            const [ conversation ] = await db.insert(schema[ 'conversation' ]).values({ ...body, user_id: user.id }).returning()
            return { ...res_obj, data: conversation }
         case 'reply':
            const [ reply ] = await db.insert(schema[ 'reply' ]).values(body).returning()
            let messages
            if (mode === 'init') messages = []
            return { ...res_obj, data: { ...reply, messages: [] } }
         case 'message':
            const [ model ] = await db.select().from(schema[ 'model' ]).where(or(eq(schema[ 'model' ][ 'name' ], body.model), eq(schema[ 'model' ][ 'id' ], body.model)))
            const [ message ] = await db.insert(schema[ 'message' ]).values({ ...body, model_id: model.id }).returning()
            return { ...res_obj, data: message }
      }
   } catch (err) {
      console.log(err)
      return err
   }
})