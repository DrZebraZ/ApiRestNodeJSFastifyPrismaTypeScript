import { z } from 'zod';
import { buildJsonSchemas, BuildJsonSchemasOptions } from 'fastify-zod';

const userCore = {
  email: z.string({required_error: "Must inform a email"}).email({ message: 'Must be a valid email' }),
  name: z.string({required_error: "Must inform a name"}).min(3, { message: 'Min 3 digits'}),
  cpf: z.string({required_error: "Must inform a CPF"}).length(11, {message: '11 digits no . -'}),
  }

const createUserCore = {
  ...userCore,
  password: z.string({required_error: "Must inform a password"}).min(5, { message: 'Min 5 digits' }),
}

const createStudentSchema = z.object({
  ...createUserCore,
  classId: z.string({required_error: "Must inform a class"}).length(4, { message: 'need to select the class' }), 
})
export type CreateStudentInput = z.infer<typeof createStudentSchema>;

const createTeacherSchema = z.object({
  ...createUserCore,
})
export type CreateTeacherInput = z.infer<typeof createTeacherSchema>


const createUserLoginSchema = z.object({
  email: z.string({required_error: "Must inform a email"}).email({ message: 'Must be a valid email' }),
  password: z.string({required_error: "Must inform a password"}).min(5, { message: 'Min 5 digits' }),
})

export type CreateUserLoginInput = z.infer<typeof createUserLoginSchema>

const createChangePasswordSchema = z.object({
  password: z.string(),
  newPassword: z.string()
}).required()

export type ChangePasswordInput = z.infer<typeof createChangePasswordSchema>


const createEditUserSchema = z.object({
  name: z.string({required_error: "Must inform a name"}).min(3, { message: 'Min 3 digits'}),
  datenasc: z.date(),
  avatarUrl: z.string().url(),
  personalDescription: z.string(),
})

export type EditUserInput = z.infer<typeof createEditUserSchema>

export const UserDTO = z.object({
  name: z.string(),
  datenasc: z.date(),
  avatarUrl: z.string(),
  personalDescription: z.string()
})

const models = {
  createStudentSchema,
  createTeacherSchema,
  createUserLoginSchema,
  createChangePasswordSchema,
  createEditUserSchema
}

export const {schemas: userSchemas, $ref } = buildJsonSchemas(models,{$id: "userSchemas"})


