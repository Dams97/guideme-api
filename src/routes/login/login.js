

const server = require('../../server');

function addLoginRoutes(){
server.get('/login',async(request,reply)=>{
  return{hey:'you are logged in'}
})
}

module.exports=addLoginRoutes();
