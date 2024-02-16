import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

interface Meal {
  mealId: string,
  createdBy: string,
  name: string,
  description: string,
  createdAt: Date,
  isDiet: 0 | 1
}

export async function mealsRoutes(app: FastifyInstance) {

  app.post('/', {
    preHandler: [checkSessionIdExists]
  }, async (request, reply) => {
    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      isDiet: z.boolean()
    })

    const sessionId = request.cookies.sessionId
    const { name, description, isDiet } = createMealBodySchema.parse(request.body)

    await knex('meals')
      .insert({
        mealId: randomUUID(),
        createdBy: sessionId,
        name,
        description,
        isDiet,
      })

    return reply.status(201).send()
  })

  app.put('/:id', {
    preHandler: [checkSessionIdExists]
  }, async (request, reply) => {
    const { sessionId } = request.cookies

    const editMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      isDiet: z.boolean()
    })

    const editMealParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = editMealParamsSchema.parse(request.params)
    const { description, isDiet, name } = editMealBodySchema.parse(request.body)

    const meal = await knex('meals').where('mealId', id).andWhere('createdBy', sessionId).first()

    const newMeal = {
      ...meal,
      name,
      description,
      isDiet
    }

    await knex('meals').where('mealId', id).update(newMeal)

    return reply.status(201).send(newMeal)
  })

  app.delete('/:id', {
    preHandler: [checkSessionIdExists]
  }, async (request, reply) => {
    const editMealParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { sessionId } = request.cookies
    const { id } = editMealParamsSchema.parse(request.params)

    await knex('meals').where('createdBy', sessionId).andWhere('id', id).del()

    return reply.status(200).send()
  })

  app.get('/', {
    preHandler: [checkSessionIdExists]
  }, async (request, reply) => {
    const { sessionId } = request.cookies

    const meals = await knex('meals').where('createdBy', sessionId)

    return reply.status(200).send(meals)
  })

  app.get('/:id', {
    preHandler: [checkSessionIdExists]
  }, async (request, reply) => {
    const editMealParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { sessionId } = request.cookies
    const { id } = editMealParamsSchema.parse(request.params)

    const meals = await knex('meals').where('createdBy', sessionId).andWhere('mealId', id).first()

    return reply.status(200).send(meals)
  })

  app.get('/metrics', {
    preHandler: [checkSessionIdExists]
  }, async (request, reply) => {
    const { sessionId } = request.cookies

    const meals = await knex('meals').where('createdBy', sessionId) as Meal[]
    const totalNumberOfMeals = meals.length
    const mealsOnDiet = meals.filter(meal => meal.isDiet).length
    const mealsNotOnDiet = meals.filter(meal => !meal.isDiet).length

    //TODO: get the best sequence on diet meals
    const sortedMealsByDate = meals.sort(
      (objA, objB) => Number(objA.createdAt) - Number(objB.createdAt),
    );

    let count = 0
    sortedMealsByDate.map(meal => {
      if (meal.isDiet) {
        count++
      }
    })

    const metrics = {
      totalNumberOfMeals,
      mealsOnDiet,
      mealsNotOnDiet
    }

    return reply.status(200).send(metrics)
  })
}
