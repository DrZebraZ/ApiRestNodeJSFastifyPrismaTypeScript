import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";


const createClassSchema = z.object({
  name: z.string({required_error: "must inform a name"}).min(5, { message: "too short (5 min)"}),
  classAreaId: z.string({ required_error: "must inform a classAreaId"}).length(2, {message:"must be 2 char long"})
})

const getClassUsersSchema = z.object({
  classId : z.string({ required_error: "must inform a class"}).length(4, { message: "must be 4 char long"})
})


const getClassTeacherSchema = z.object({
  classId : z.string({ required_error: "must inform a class"}).length(4, { message: "must be 4 char long"})
})

export type CreateClassInput = z.infer<typeof createClassSchema>;

export type GetClassUsersInput = z.infer<typeof getClassUsersSchema>;

export type GetClassTeacherInput = z.infer<typeof getClassTeacherSchema>;


const models = {

  createClassSchema,
  getClassUsersSchema,
  getClassTeacherSchema,

}

export const { schemas: classSchemas, $ref} = buildJsonSchemas(models,{$id: "classSchemas"})
