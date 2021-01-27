import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export default async(req, res) => {
     dbConnect();
    const { method } = req;

    switch(method) {
       
        case 'POST':
            try {
                const {email,password} = req.body;
                if(!email||!password){
                   return res.status(422).json({error:'please add email or password'})
                }
                const user = await User.findOne({email:email})
              
                    if(!user){
                       return res.status(422).json({error:'Invalid email or password'})
                    }
                   const doMatch = await bcrypt.compare(password,user.password)
                   
                        if(doMatch){
                           
                            const token = jwt.sign({_id:user._id},process.env.JWT)
                            const {_id,name,email}=user
                           res.json({token,user:{_id, name,email}})
                        }else{
                            return res.status(422).json({error:'Invalid Email or password'})
                        }
                 
            } catch (error){
                res.status(400).json({ success: false });

            }
            break;
        default:
            res.status(400).json({ success: false})
            break;
    }
}