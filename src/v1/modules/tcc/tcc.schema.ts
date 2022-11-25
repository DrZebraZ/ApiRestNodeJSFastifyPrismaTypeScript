import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

const tccCore = {
  title : z.string({ required_error: "Must inform a Title"}).min(5, { message: 'min 5 digits'}),
  summary: z.string({ required_error: "Must inform a Description"})
}

const createTccSchema = z.object({
  title : z.string({ required_error: "Must inform a Title"}).min(5, { message: 'min 5 digits'}),
  summary: z.string({ required_error: "Must inform a Description"})
})

export type CreateTccInput = z.infer<typeof createTccSchema>;

const updateTccUrlSchema = z.object({
  ...tccCore,
  docFileLink: z.string({required_error: "must inform the PDF URL"}).url()
})


const models = {
  createTccSchema,
  updateTccUrlSchema
}

export const { schemas: tccSchemas, $ref} = buildJsonSchemas(models, {$id: "tccSchemas"})
