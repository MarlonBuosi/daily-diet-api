import { FastifyInstance } from "fastify";


export async function mealsRoutes(app: FastifyInstance) {
  app.get('/', async (request) => {


    return 'Hello Meals'
  })
}
