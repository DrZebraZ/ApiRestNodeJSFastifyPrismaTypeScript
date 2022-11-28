import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

const tccCore = {
  title : z.string({ required_error: "Must inform a Title"}).min(5, { message: 'min 5 digits'}),
  summary: z.string({ required_error: "Must inform a Description"}).min(10, { message: 'min 10 digits'}),
}

const createTccSchema = z.object({
  ...tccCore
})

export type CreateTccInput = z.infer<typeof createTccSchema>;

const updateTccSchema = z.object({
  ...tccCore,
  id: z.string({required_error: "Must inform the Tcc ID"}).length(14,{message:"Must inform the Tcc ID (14 characters required)"}),
  docFileLink: z.string({required_error: "must inform the PDF URL"}).url()
})

const assignTeacherToTCCAndGuidanceSchema = z.object({
  teacherId: z.string({ required_error : "must inform a teacher id"}).length(8, { message: "must be 8 char long"}),
  tccId: z.string({required_error: "Must inform the Tcc ID"}).length(14,{message:"Must inform the Tcc ID (14 characters required)"}),
})

export type AssignTeacherToTCCAndGuidanceInput = z.infer<typeof assignTeacherToTCCAndGuidanceSchema>

export type UpdateTccInput = z.infer<typeof updateTccSchema>

const models = {
  createTccSchema,
  updateTccSchema,
  assignTeacherToTCCAndGuidanceSchema
}



export const { schemas: tccSchemas, $ref} = buildJsonSchemas(models, {$id: "tccSchemas"})
