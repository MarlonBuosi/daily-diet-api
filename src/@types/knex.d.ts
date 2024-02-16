// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      createdAt: string
      sessionId?: string
    }

    meal: {
      mealId: string
      createdBy: string
      name: string
      description: string
      createdAt: string
      isDiet: boolean
    }
  }
}
