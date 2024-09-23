import { OpenAI } from "openai"


export default defineEventHandler(async (e) => {
   try {
      const { model } = getQuery(e)
      const body = await readBody(e)
      const openai = new OpenAI({
         apiKey: process.env.OPENAI_API_KEY
      });

      const chatHistory = []
      if (Array.isArray(body.history)) {
         for (const message of body.history) {
            chatHistory.push({ role: message.role, content: message.content })
         }
      }

      console.log(chatHistory)
      const completion = await openai.chat.completions.create({
         model,
         messages: [ ...chatHistory, { role: 'user', content: body.prompt + '. Please answer me briefly and to the point.' } ],
      })

      const data = completion.choices[ 0 ].message
      console.log(data)
      return { data }
   } catch (err) {
      return err
   }
})