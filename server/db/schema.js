import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { ulid } from "ulidx";

export const user = sqliteTable('users', {
   id: text('id').primaryKey().$defaultFn(ulid),
   created_at: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
   updated_at: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
   name: text('name'),
})

export const conversation = sqliteTable('conversations', {
   id: text('id').primaryKey().$defaultFn(ulid),
   created_at: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
   updated_at: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
   first_question: text(`first_question`),
   user_id: text('user_id').references(() => user.id),
});

export const reply = sqliteTable('replies', {
   id: text('id').primaryKey().$defaultFn(ulid),
   created_at: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
   updated_at: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
   question_id: text('question_id').references(() => message.id),
   conversation_id: text('conversation_id').references(() => conversation.id),
})

export const message = sqliteTable('messages', {
   id: text('id').primaryKey().$defaultFn(ulid),
   created_at: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
   updated_at: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
   content: text('msg'),
   role: text('role'),
   reply_id: text('reply_id').references(() => reply.id),
   conversation_id: text('conversation_id').references(() => conversation.id),
   model_id: text('model_id').references(() => model.id),
})

export const model = sqliteTable('models', {
   id: text('id').primaryKey().$defaultFn(ulid),
   created_at: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
   updated_at: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
   name: text('name'),
})
