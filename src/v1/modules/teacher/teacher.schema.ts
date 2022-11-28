import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const addTeacherToClassSchema = z.object({
  classId : z.string({ required_error: "must inform a class"}).length(4, { message: "must be 4 char long"}),
  teacherId: z.string({ required_error : "must inform a teacher id"}).length(8, { message: "must be 8 char long"})
})

export type AddTeacherToClassInput = z.infer<typeof addTeacherToClassSchema>;


const models = {
  addTeacherToClassSchema
}

export const { schemas: teacherSchemas, $ref} = buildJsonSchemas(models,{$id: "teacherSchemas"})
