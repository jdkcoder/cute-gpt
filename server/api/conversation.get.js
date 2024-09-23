import { eq, and } from "drizzle-orm";
import db from "../db"
import * as schema from '../db/schema'


export default defineEventHandler(async (e) => {
   try {
      const { id: conversation_id } = getQuery(e)
      const data = await db.select({
         ...schema[ 'conversation' ],
         reply: {
            ...schema[ 'reply' ],
            message: schema[ 'message' ]
         },
      }).from(schema[ 'conversation' ])
         .where(eq(schema[ 'conversation' ][ 'id' ], conversation_id))
         .leftJoin(schema[ 'reply' ], eq(schema[ 'conversation' ][ 'id' ], schema[ 'reply' ][ 'conversation_id' ]))
         .leftJoin(schema[ 'message' ], and(eq(schema[ 'conversation' ][ 'id' ], schema[ 'message' ][ 'conversation_id' ]), eq(schema[ 'reply' ][ 'id' ], schema[ 'message' ][ 'reply_id' ])))

      return {
         data: data.reduce((acc, curr) => {
            const { id, created_at, updated_at, user_id, reply } = curr;

            const message = {
               id: reply.message.id,
               created_at: reply.message.created_at,
               updated_at: reply.message.updated_at,
               role: reply.message.role,
               reply_id: reply.message.reply_id,
               conversation_id: reply.message.conversation_id,
               model_id: reply.message.model_id,
               content: reply.message.content,
            };

            const replyEntry = {
               id: reply.id,
               created_at: reply.created_at,
               updated_at: reply.updated_at,
               question_id: reply.question_id,
               conversation_id: reply.conversation_id,
               messages: [ message ],
            };

            // Check if conversation already exists in the accumulator
            const existingConversation = acc.find(conv => conv.id === id);

            if (existingConversation) {
               const existingReply = existingConversation.replies.find(rep => rep.id === reply.id);

               if (existingReply) {
                  // If the reply already exists, just add the message to the existing reply
                  existingReply.messages.push(message);
               } else {
                  // If the reply doesn't exist, add it as a new reply to the conversation
                  existingConversation.replies.push(replyEntry);
               }
            } else {
               // If conversation doesn't exist, create a new one with the current reply and message
               acc.push({
                  id,
                  created_at,
                  updated_at,
                  user_id,
                  replies: [ replyEntry ],
               });
            }

            return acc;
         }, []).at(0)
      }

   } catch (err) {
      console.log(err)
      return err
   }
})