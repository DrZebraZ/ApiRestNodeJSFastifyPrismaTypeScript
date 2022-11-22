import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';


const guidanceCore = {
  guidanceId: z.string(),
}

const CreateMessageSchema = z.object({
  ...guidanceCore,
  text : z.string({ required_error: "No text informed" }),
})

export type CreateMessageInput = z.infer<typeof CreateMessageSchema>;


const CreateGetMessagesSchema = z.object({
  
})