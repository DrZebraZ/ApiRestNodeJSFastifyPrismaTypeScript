import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const userCore = {
  email: z.string({required_error: "Must inform a email"}).email({ message: 'Must be a valid email' }),
  name: z.string({required_error: "Must inform a name"}).min(3, { message: 'Min 3 digits'}),
  classId: z.string({required_error: "Must inform a class"}).length(4, { message: 'need to select the class' }), 

}

const createUserSchema = z.object({
  ...userCore,
  password: z.string({required_error: "Must inform a password"}).min(5, { message: 'Min 5 digits' }),
  cpf: z.string({required_error: "Must inform a CPF"}).length(11, {message: '11 digits no . -'}),
})
export type CreateUserInput = z.infer<typeof createUserSchema>;

const createUserResponseSchema = z.object({
  ...userCore,
  id: z.string(),
})

const createUserLoginSchema = z.object({
  email: z.string({required_error: "Must inform a email"}).email({ message: 'Must be a valid email' }),
  password: z.string({required_error: "Must inform a password"}).min(5, { message: 'Min 5 digits' }),
})

export type CreateUserLoginInput = z.infer<typeof createUserLoginSchema>

const createChangePasswordSchema = z.object({
  password: z.string(),
  newPassword: z.string()
})

export type ChangePasswordInput = z.infer<typeof createChangePasswordSchema>


export const { schemas: userSchemas, $ref} = buildJsonSchemas({
  createUserSchema,
  createUserLoginSchema,
  createChangePasswordSchema
})

