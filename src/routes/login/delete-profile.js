const server = require('../../server');

function deleteRoute(){
server.delete('/profile/delete',async(request,reply)=>{
  return{hey:'your profile is deleted'}
})
}

module.exports=deleteRoute();