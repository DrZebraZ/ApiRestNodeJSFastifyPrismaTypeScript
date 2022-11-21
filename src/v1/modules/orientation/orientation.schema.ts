import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';



const CreateMessageSchema = z.object({
  orientationId : z.string(),
  text : z.string({ required_error: "No text informed" }),
})

export type CreateMessageInput = z.infer<typeof CreateMessageSchema>;
