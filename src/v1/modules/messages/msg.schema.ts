import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';


const guidanceCore = {
  guidanceId: z.string({required_error:"guidanceId is Required!"}).length(14, {message: "guidanceID is 14 characters long"}),
}

const createMessageSchema = z.object({
  ...guidanceCore,
  text : z.string({ required_error: "No text informed" }).min(1,{ message : "text is empty" }),
})

export type CreateMessageInput = z.infer<typeof createMessageSchema>;

const messageCore = {
  ...guidanceCore,
  text: z.string({required_error: "No text provided"}).min(1, { message : "text is empty"}),
  messageId: z.string({required_error: "messageId is Required"}).length(24, {message: "messageID is 24 chars long"}),
  byUser: z.boolean({ required_error: "byUser is Required" }),
}

const editMessageSchema = z.object({
  ...messageCore,
})
export type EditMessageSchema = z.infer<typeof editMessageSchema>


const models = {
  createMessageSchema,
  editMessageSchema
}

export const { schemas: msgSchemas, $ref} = buildJsonSchemas(models, {$id:"msgSchemas"})
