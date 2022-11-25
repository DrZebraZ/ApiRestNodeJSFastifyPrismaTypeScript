import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const createClassAreaSchema = z.object({
  name: z.string({required_error: "must inform a name"}).min(5, { message: "too short (5 min)"})
})
export type CreateClassAreaInput = z.infer<typeof createClassAreaSchema>;

const models = {
  createClassAreaSchema,
}
export const { schemas: classAreaSchemas, $ref} = buildJsonSchemas(models,{$id: "classAreaSchemas"})
