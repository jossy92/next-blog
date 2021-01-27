import dbConnect from '../../../utils/dbConnect';
import Post from '../../../models/Post';
import Comment from '../../../models/Comment'
import async from 'async'

export default async (req, res) => {
await dbConnect()
    const {
        query: { id },
        method
    } = req;

    switch(method) {
        case 'GET':
            try {
                const post = await Post.findById(id);

                if (!post) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: post });
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        case 'PUT':
            try {
                if(req.body.views){
                   const post= await Post.findById(id,function(err, post) {
                        if (!err && post) {
                        post.views = post.views + 1;
                        post.save();
                         }
                        }, {
                            new:true,
                           
                        });
                        res.status(200).json({ success: true, data: post });
                }else{
                const post =  await Post.findByIdAndUpdate(id, req.body, {
                    new:true,
                    runValidators:true
                });
                if(!post) {
                    return res.status(400).json({success: false});
                }
           
                res.status(200).json({ success: true, data: post });
                }
            } catch (error) {
                res.status(400).json({ error: error })
            }
            
            break;
        case 'DELETE':
            try {
                const deletePost = await async.parallel({
                    post: function(callback) {
                        Post.deleteOne({_id: id })
                          .exec(callback)
                    },
                    comments: function(callback) {
                        Comment.deleteMany({ post_id:id})
                          .exec(callback)
                    }
                })
                if(!deletePost) {
                 return  res.status(400).json({ success: false })   
                }
                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false })
                
            }
            break;
         default:
                res.status(400).json({ success: false})
                break;
        }
    }
