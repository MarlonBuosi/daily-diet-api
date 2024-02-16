// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      sessionId?: string
      name: string
      createdAt: string
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
