import dbConnect from '../../utils/dbConnect';
import User from '../../models/User'
import bcrypt from 'bcrypt'


export default async (req, res) => {
    await dbConnect();
    const { method } = req;

    switch(method) {
        case 'GET':
            try {
                const users = await User.find({});
                res.status(200).json({success:true, data: users })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const {name,email,password} = req.body;
            if(!email||!password||!name){
                return res.status(422).json({error:'please add all the fields'})
            }
        
            const user = await User.findOne({email:email})
            .then((savedUser)=>{
                if(savedUser){
                    return res.status(422).json({error:"A user with this email already exists"})
                }
                bcrypt.hash(password,12)
                .then(hashedPassword=>{
                    const user = new User({
                        email,
                        password:hashedPassword,
                        name,
                       
                    })
                    user.save();
                    
                    })
                    
                })
                res.status(200).json({success:true,message:'User saved Successfully'} )
       
            } catch (error){
                res.status(400).json({ success: false });

            }
            break;
        default:
            res.status(400).json({ success: false})
            break;
    }
}