const Hapi = require('@hapi/hapi')
const routes = require('./routes/routes')

const initServer = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost'
  })
  server.route(routes)
  await server.start()
}

initServer()
