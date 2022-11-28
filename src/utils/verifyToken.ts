import jwtDecode from "jwt-decode"


export async function getToken(header:any):Promise<string>{
  const authorized: any = await jwtDecode(header)
  const token = authorized.token.toString()
  return token
}

export async function getID(header:any):Promise<string>{
  const authorized: any = await jwtDecode(header)
  const token = authorized.id.toString()
  return token
}

export async function getInfoOnJWT(header:any):Promise<any>{
  const authorized: any = await jwtDecode(header)
  return authorized
}



/*
async function verifyProfessorToken(token: String | any, idProfessor: String | any): [string, string, number] {
  const auth = String(token)
  try{
    await prisma.professor.findFirstOrThrow({
      where:{
        id: idProfessor,
        AND:{
          token : auth
        }
      }
    })
    return ["é o professor", auth, 1]
  }
  catch{
    await prisma.professor.findFirstOrThrow({
      where:{
        id: idProfessor
      }
    })
    await prisma.curso.findFirstOrThrow({
      where:{
        coordenador:{
          token: auth
        }
      }
    })
    return ["é o coordenador", auth, 2]
  }
  finally{
    return ["error code: 03", "", 3]
  }
}
*/