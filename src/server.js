const fastify = require('fastify')
const server=fastify({ logger: true })
const addLoginRoutes=require('./routes/login/login')
// Declare a route
server.get('/', async (request, reply) => {
  return { hello: 'world' }
});


// Run the server!

module.exports=server;
//addLoginRoutes(server);