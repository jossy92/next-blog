import dbConnect from '../../../utils/dbConnect';
import Comment from '../../../models/Comment';


export default async (req, res) => {
    const { method } = req;

    switch(method) {
        case 'GET':
            try {
                const comment = await Comment.find({ post_id: req.query.post_id 
                });
                const comments=comment.sort((a, b) =>a.timeStamp < b.timeStamp ? 1 : -1);

               
                res.status(200).json({success:true, data: comments })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const comment = await Comment.create(req.body);

                res.status(200).json({ success: true, data: comment})
            } catch (error){
                res.status(400).json({ success: false });

            }
            break;
            case 'DELETE':
                try {
                    const deletedcomment = await Comment.deleteOne({_id: req.query.id });
    
                    if(!deletedcomment ) {
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