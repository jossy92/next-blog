import dbConnect from '../../../utils/dbConnect';
import Post from '../../../models/Post';
import Comment from '../../../models/Comment'
const mongoose = require('mongoose');


const posts =  async (req, res) => {
    await dbConnect();
    const { method } = req;
    
    switch(method) {
        case 'GET':
            try {
                    const category = req.query.category 
                    ? { category: {
                        $regex:  req.query.category,
                        $options: 'i',
                        } 
                    }
                        : {};
                        const searchKeyword = req.query.searchKeyword 
                        ? {
                            title: {
                                $regex: req.query.searchKeyword,
                                $options: 'i',
                            },
                            }
                        : {};
                        const sortOrder = req.query.sortOrder
                        ? req.query.sortOrder === 'popular'
                          ? { createdAt: 1 }
                          : { createdAt: -1 }
                        : { _id: -1 };
                        
                const posts = await Post.find({ ...category, ...searchKeyword }).sort(
                    sortOrder
                  );
                 
                res.status(200).json({success:true, data: posts })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const post = await Post.create(req.body);

                res.status(200).json({ success: true, data: post})
            } catch (error){
                res.status(400).json({ success: false });

            }
            break;
        default:
            res.status(400).json({ success: false})
            break;
    }
}

export default posts