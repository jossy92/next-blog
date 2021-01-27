import dbConnect from '../../../utils/dbConnect';
import Subscriber from '../../../models/Subscribers';


export default async (req, res) => {
    const { method } = req;

    switch(method) {
        case 'GET':
            try {
                const subscribers = await Subscriber.find({});
                res.status(200).json({success:true, data: subscribers })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const subscriber = await Subscriber.create(req.body);

                res.status(200).json({ success: true, data: subscriber})
            } catch (error){
                res.status(400).json({ success: false });

            }
            break;
        default:
            res.status(400).json({ success: false})
            break;
    }
}