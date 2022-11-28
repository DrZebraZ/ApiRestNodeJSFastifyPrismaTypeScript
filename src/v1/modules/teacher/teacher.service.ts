

/* 
fastify.post('/professor/create', async (request, reply) => {
  const createAlunoBody = z.object({
    email: z.string().email({ message: 'Must be a valid email' }),
    senha: z.string().min(5, { message: 'Min 5 digits' }),
    nome: z.string().min(3, { message: 'Min 3 digits'}),
    cpf: z.string().length(11, {message: '11 digits no . -'}),
  })
  const { email, senha, nome, cpf } = createAlunoBody.parse(request.body)
  const id = generateProfessorID()
  const token = generateToken()
  await prisma.professor.create({
    data : {
      id,
      cpf,
      email,
      nome,
      senha,
      token
    }
  })
  return reply.status(201).send({
    "professorID": id,
    "email": email,
    "nome": nome,
    "token": token
  })
  })  

  fastify.post('/professor/login' , async (request, reply) => {
    const alunoLoginBody = z.object({
      email: z.string(),
      senha: z.string(),
    })
    const { email, senha } = alunoLoginBody.parse(request.body)

    return await prisma.professor.findFirstOrThrow({
      where:{
        email: email,
        senha: senha
      },
      select:{
        id:true,
        nome:true,
        avatarUrl: true,
        cpf: true,
        descricaoPessoal: true,
        datanac: true,
        email: true,
        token: true
      }
    })
  })

  fastify.get('/professor/getALL' , async () => {
  return prisma.professor.findMany({
    select:{
      id: true,
      nome: true,
      email: true,
      token: true,
      cursos: true,
      orientacoes: {
        select:{
          _count: true,
        }
      },
      tccs: {
        select:{
          titulo: true,
          aluno: {
            select:{
              id: true,
              nome: true,
            }
          }
        }
      }
    }
  })
  })

  fastify.patch('/professor/addCursoToProfessor', async (request, reply) => {
    try{
      const createAddCursoBody = z.object({
        idProfessor: z.string(),
        idCurso: z.string(),
      })
      const { idProfessor, idCurso } = createAddCursoBody.parse(request.body)
      const auth = verifyProfessorToken(request.headers.token, idProfessor)
      fastify.log.info(auth)
      if (auth[2] === 3){
        return reply.status(401).send({ message: auth[0]})
      }
      try{
        await prisma.professor.update({
          where:{
            id: idProfessor
          },
          data:{
            cursos:{
              connect:{
                id: idCurso
              }
            }
          }
        })
        return reply.status(201).send({message: "Adicionado com sucesso!"})
      }
      catch{return reply.status(401).send({message: "Erro ao adicionar curso ao professor! error code: 02"})}
        
    }catch{
      return reply.status(404).send({ message: "error code: 04"})
    }
  })

  */