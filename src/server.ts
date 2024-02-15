import { env } from './env'
import { app } from './app'

console.log(env.PORT)

app.listen({
  host: 'RENDER' in process.env ? `0.0.0.0` : `localhost`,
  port: env.PORT,
}).then(() => {
  console.log('HTTP server running')
})
