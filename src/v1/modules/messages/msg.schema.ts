import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';


const guidanceCore = {
  guidanceId: z.string({required_error:"guidanceId is Required!"}).length(14, {message: "guidanceID is 14 characters long"}),
}

const CreateMessageSchema = z.object({
  ...guidanceCore,
  text : z.string({ required_error: "No text informed" }),
})

export type CreateMessageInput = z.infer<typeof CreateMessageSchema>;

const messageCore = {
  ...guidanceCore,
  text: z.string({required_error: "No text provided"}),
  messageId: z.string({required_error: "messageId is Required"}).length(24, {message: "messageID is 24 chars long"}),
  byUser: z.boolean({ required_error: "byUser is Required" }),
}

const EditMessageSchema = z.object({
  ...messageCore,
})
export type EditMessageSchema = z.infer<typeof EditMessageSchema>

export const { schemas: msgSchemas, $ref} = buildJsonSchemas({
  CreateMessageSchema
})
