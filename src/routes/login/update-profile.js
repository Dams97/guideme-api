
const server = require('../../server');

function addupdateRoutes(){
    server.put('/profile/update',async(request,reply)=>{
        return {hey:'profile updated'};
    })}

module.exports=addupdateRoutes();