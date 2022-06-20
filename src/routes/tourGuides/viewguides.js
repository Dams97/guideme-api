
const server = require('../../server');

function addViewRoutes(){
    server.get('/tourguides',async(request,reply)=>{
        const tourGuides=['Saleh','Ahmed','Hadi'];
        return tourGuides;
    })}

module.exports=addViewRoutes();
