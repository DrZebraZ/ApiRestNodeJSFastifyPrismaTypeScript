import { FastifyReply, FastifyRequest } from "fastify"
import replyHandler from '../../../utils/replyHandler';
import { AddTeacherToClassInput } from "./teacher.schema"
import { addTeacherToClass, getAllTeachers, getGuidancesAndTccs } from "./teacher.service"


//ADMIN USAGE
export async function addTeacherToClassHandler(request: FastifyRequest<{Body: AddTeacherToClassInput}>, reply: FastifyReply){
  console.log("Adding teacher to class")
  const body = request.body
  const newClass = await addTeacherToClass(body)
  return replyHandler(newClass, "adding teacher to class", 201, reply)
}

export async function getAllTeachersHandler(request: FastifyRequest, reply: FastifyReply){
  const teachers = await getAllTeachers()
  return replyHandler(teachers, "getting teachers", 200, reply)

}

export async function getGuidancesAndTccsHandler(request: FastifyRequest, reply: FastifyReply){
  const headers = request.headers.authorization
  const retorno = await getGuidancesAndTccs(headers)
  return replyHandler(retorno, "Getting Guidances and TCC for teacher", 200, reply)
}