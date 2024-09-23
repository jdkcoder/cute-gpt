import { OpenAI } from "openai"
import { eq } from "drizzle-orm";
import db from "../db"
import * as schema from '../db/schema'


export default defineEventHandler(async (e) => {
   try {
      const { model, conversation } = getQuery(e)
      const body = await readBody(e)
      const openai = new OpenAI({
         apiKey: process.env.OPENAI_API_KEY
      });

      const chatHistory = []
      if (conversation) {
         const messages = await db.select().from(schema[ 'message' ]).where(eq(schema[ 'message' ][ 'conversation_id' ], conversation))
         for (const message of messages) {
            chatHistory.push({ role: message.role, content: message.content })
         }
      }
      const completion = await openai.chat.completions.create({
         model,
         messages: [ ...chatHistory, { role: 'user', content: body.prompt } ],
      })

      return { data: completion.choices[ 0 ].message }
   } catch (err) {
      return err
   }
})