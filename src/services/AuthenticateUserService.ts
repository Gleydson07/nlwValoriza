import { getCustomRepository } from 'typeorm';

import { UsersRepositories } from '../repositories/UsersRepositories';

import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken';

interface IAutheticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService{
    async execute({email, password}: IAutheticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne({email});

        if(!user){
            throw new Error("Email/Password incorrect")
        }

        const isCorrectPassword = await compare(password, user.password);

        if(!isCorrectPassword){
            throw new Error("Email/Password incorrect")
        }

        const token = sign(
            { 
                email: user.email
            }, 
            "6425ddbf9cd648e1e4d33c4340d3373d",
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return token;
    }
}

export { AuthenticateUserService }