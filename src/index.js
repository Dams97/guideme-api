
const server=require('./server')

// Run the server!
server.listen({ port: 3000 }).catch ((err)=>{
    server.log.error(err)
    process.exit(1)
  });
module.exports=server;