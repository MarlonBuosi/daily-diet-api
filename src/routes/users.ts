import { randomUUID } from "crypto";
import { FastifyInstance } from "fastify";
import knex from "knex";
import { z } from "zod";

export async function usersRoutes(app: FastifyInstance) {
  app.post('/create', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
    })

    const { name } = createUserBodySchema.parse(request.body)

    console.log({
      id: randomUUID(),
      name,
    })

    await knex('users')
      .insert({
        id: randomUUID(),
        name,
      })

    return reply.status(201).send()
  })


  app.get('/', async (request) => {


    return 'Hello World'
  })
}
