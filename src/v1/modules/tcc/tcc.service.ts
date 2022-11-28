import prisma from "../../../utils/prisma";
import { CreateTccInput } from './tcc.schema';
import { generateTccID, generateGuidanceID } from '../../../utils/generate';
import { getToken } from "../../../utils/verifyToken";

export async function createTCC(input: CreateTccInput, header:any):Promise<any>{
  const token = await getToken(header)
  console.log(token)
  const { title, summary } = input
  if (!title){
    return ({data:{"error": "Missing Title"}})
  }
  else if (!summary){
    return ({data:{"error":"missing summary"}})
  }
  const student = await prisma.student.findUnique({
    where:{
      token: token
    }
  })
  console.log("achou")
  if (student){
    try{
      const idTcc = generateTccID()
      const idGuidance = generateGuidanceID()
      const tcc = await prisma.tcc.create({
        data:{
          id: idTcc,
          title: title,
          summary: summary,
          classId: student.classId,
          studentId: student.id,
          guidance:{
            create:{
              id: idGuidance,
              studentId: student.id,
            }
          }
        }
      })
      const tcc2 = await prisma.tcc.update({
        where:{
          id: tcc.id,
        },
        data:{
          guidanceId: idGuidance,
        }
      })
      return ({"data": tcc2})
    }catch(e){
      return e
    }
  }else{
    console.log("No user found")
    return (false)
  }

}