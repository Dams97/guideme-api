import { FastifyInstance } from 'fastify';
// import * as bcrypt from 'bcrypt';
import { Static,Type } from "@sinclair/typebox";


import bcrypt from "bcrypt";
import { prismaClient } from '../../prisma';
  

const loginSchema=Type.Object({
    email:    Type.String() ,    
    password:  Type.String() ,  
  
})
type loginSchema=Static<typeof loginSchema>
export const JwtVerificationSchema = Type.Object({
	token: Type.String(),
  });
  export type JwtVerificationSchema=Static<typeof JwtVerificationSchema>
  export const createUser=Type.Object({
    email:    Type.String() ,   
    name  :    Type.String(),   
    password:  Type.String() ,  
    phone:     Type.String() ,

    // reservations:Type.Optional(Type.Array(Reservation))
})
export type createUser=Static<typeof createUser>
//login
export default async function(server:FastifyInstance) {
	server.route({
		method:'POST',
		url:'/login',
		schema:{
			summary:'Ask user to login and returns summary',
			tags:['Tourist'],
			body:loginSchema
		},
		handler:async (request,reply)=>{
			const loginTourist=request.body as loginSchema
			
			const checkUser=await prismaClient.tourist.findFirst({
				where:{email:loginTourist.email}
			});
			//if new user?
			if(!checkUser){		
				const newtourist = request.body as createUser;
			// if(!newtourist){
			// 	reply.badRequest("Please enter all required fields");
			// }
			const userExist=await prismaClient.tourist.findFirst({
				where:{email:newtourist.email}
			});
			if(userExist){
				reply.badRequest("User already exists")
			}
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(newtourist.password, salt)
			const newTourist= await prismaClient.tourist.create({
				data:{
					email:newtourist.email,
					name:newtourist.name,
					password:hashedPassword,
					phone:newtourist.phone

				}
			}); const token = server.jwt.sign({
				id: newTourist.tourist_id,
				email: newTourist.email,
				name: newTourist.name,
			});


			return {
				newTourist,
			token,
		type:'SignUp'};
		
		}else {
			if(checkUser && (await bcrypt.compare(loginTourist.password,checkUser.password))){
				const token=server.jwt.sign({id:checkUser.tourist_id,name:checkUser.name,email:loginTourist.email})
				reply.send({message:"You are logged in",
				data:{name:checkUser.name,id:checkUser.tourist_id,token,type:'SignIn'}});

			}else{
				reply.unauthorized('Incorrect email or password')
			}
		
		}
	
	
		
	}
})


}


