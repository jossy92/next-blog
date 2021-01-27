import dbConnect from '../../../utils/dbConnect';
import Comment from '../../../models/Comment';



export default async (req, res) => {
    await dbConnect()
    console.log(req)
    const {
        method
    } = req;

    switch(method) {
        case 'GET':
            try {
                const comment = await Comment.findById(id);

                if (!comment) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: comment });
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        case 'PUT':
            try {
                const comment =  await Comment.findByIdAndUpdate(id, req.body, {
                    new:true,
                    runValidators:true
                });
                if(!comment) {
                    return res.status(400).json({success: false});
                }

                res.status(200).json({ success: true, data: comment });
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        case 'DELETE':
            try {
                const deletedcomment = await Comment.deleteOne({_id: id });

                if(!deletedComment) {
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
