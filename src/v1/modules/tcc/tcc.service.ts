import prisma from "../../../utils/prisma";
import { AssignTeacherToTCCAndGuidanceInput, CreateTccInput, UpdateTccInput } from './tcc.schema';
import { generateTccID, generateGuidanceID } from '../../../utils/generate';
import { getID, getToken } from "../../../utils/verifyToken";

export async function createTCC(input: CreateTccInput, header:any):Promise<any>{
  const token = await getToken(header)
  const { title, summary } = input
  if (!title){
    return ({data:{"error": "Missing Title"}})
  }
  else if (!summary){
    return ({data:{"error":"missing summary"}})
  }
  const student:any = await prisma.student.findUnique({
    where:{
      token: token
    }
  })
  const possuiTCC = await prisma.tcc.findFirst({
    where:{
      studentId: student.id,
      AND:{
        status: "ANDAMENTO"
      }
    }
  })
  if (possuiTCC){
    return ({"data":{
      "error": "You already have a TCC in production mode!",
      "tcc": possuiTCC
    }})
  }
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
      return ({"data": {"tcc":tcc2}})
    }catch(e){
      return e
    }
  }else{
    console.log("No user found")
    return (false)
  }

}

export async function updateTCC(input: UpdateTccInput, header: any):Promise<any>{
  const studentID = await getID(header)
  const { id, ...rest } = input
  const tcc1 = await prisma.tcc.findFirst({
    where:{
      id:id,
      AND:{
        studentId:studentID
      }
    }
  })
  if (tcc1){
    const tcc = await prisma.tcc.update({
      where:{
        studentId: studentID,
      },
      data:{
        ...rest,
      }
    })
    return ({"data": {"tcc":tcc}})
  }else{
    return ({"data": {"error":"No tcc found for this user and tcc ID"}})
  }
}

export async function assignTeacherToTccAndGuidance(input: AssignTeacherToTCCAndGuidanceInput):Promise<any>{
  const { teacherId, tccId } = input
  try{
    const tcc = await prisma.tcc.update({
      where:{
        id:tccId,
      },
      data:{
        guidance:{
          update:{
            teacher:{
              connect:{
                id: teacherId,
              }
            }
          }
        },
        teacher:{
          connect:{
            id: teacherId,
          }
        }
      }
    })
    if(tcc){
      return (true)
    }else{
      return (false)
    }
  }catch(e){
    return({"data": {"error": e}})
  }

}