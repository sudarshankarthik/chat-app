
import {compare, genSalt, hash} from 'bcrypt'
import {UserModel} from '../model/userModel.js'
import jwt from 'jsonwebtoken';

export const createUser =  async (req,res) => {
    try {
        const {
            firstName,
            lastName,
            userName,
            email,
            password,
            picturePath
        } = req.body


        let user = await UserModel.findOne({userName: userName})

        if (user)
            return res.status(402).json({error: "user name already taken"})
        
        user = await UserModel.findOne({email: email})

        if (user)
            return res.status(402).json({error: "email already in use"})
        
        const salt = await genSalt()
        const hashedPassword = await hash(password, salt)
    
        const newUser = new UserModel({
            firstName,
            lastName,
            email, 
            userName,
            password: hashedPassword,
            picturePath
        })
    
        const savedUser = await newUser.save()
        const token = jwt.sign({id: savedUser._id},process.env.JWT_SECRET)
        savedUser.password = undefined
        return res.status(200).json({user: savedUser,token})
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}

export const authUser = async (req,res) => {
    try {
        const {
            email,
            password
        } = req.body
    
        const user = await UserModel.findOne({email: email})

         if (!user)
            return res.status(401).json({error: "user not found"})

        const pssdMatch = await compare(password,user.password)
        if (!pssdMatch)
            return res.status(401).json({error: "password did not match"})

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET)
        
        user.password = undefined
 
        return res.status(200).json({user,token})
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: error.message})
    }

}