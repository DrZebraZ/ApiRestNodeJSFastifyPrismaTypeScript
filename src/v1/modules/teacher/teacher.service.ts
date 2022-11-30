import prisma from "../../../utils/prisma"
import { getID } from "../../../utils/verifyToken"
import { AddTeacherToClassInput } from "./teacher.schema"


export async function getGuidancesAndTccs(headers: any):Promise<any>{
  const id = await getID(headers)
  const guidances = await prisma.guidance.findMany({
    where:{
      teacherId:id
    },
    select:{
      id:true,
      student: {
        select:{
          name:true,
          avatarUrl: true,
        }
      },
      tcc: {
        select:{
          title: true,
        }
      }
    }
  })
  
  return ({"data": guidances})
}



//ADMIN ONLY
export async function addTeacherToClass(input:AddTeacherToClassInput):Promise<any>{
  try{
    const { teacherId, classId } = input
    console.log(input)
    const newClass = await prisma.class.update({
      where:{
        id: classId,
      },data:{
        teachers:{
          connect:{
            id: teacherId,
          }
        }
      }
    })
    if (newClass){
      return (true)
    }else{
      return (false)
    }
  }catch(e){
    return ({"data": { "error": e}})
  }
}

export async function getAllTeachers(){
  const teachers = await prisma.teacher.findMany({
    orderBy:{
      name: "asc",
    },select:{
      id: true,
      name: true,
      userEmail: true,
    }
  })
  return ({"data":teachers})
}