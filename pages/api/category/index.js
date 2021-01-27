import dbConnect from '../../../utils/dbConnect';
import Post from '../../../models/Post';
import async from 'async'
const mongoose = require('mongoose');



const category =  async (req, res) => {
  await dbConnect();
    const { method } = req;

    switch(method) {
        case 'GET':
          try {
            const categories = await async.parallel({
                faith: function(callback) {
                    Post.find({category:'faith'})
                      .exec(callback)
                },
                beautyForAshes: function(callback) {
                  Post.find({category:'beautyForAshes'})
                  .exec(callback)
                },

                christianLiving: function(callback) {
                    Post.find({category:'christianLiving'})
                      .exec(callback)
                },
                spiritualGrowth: function(callback) {
                    Post.find({category:'spiritualGrowth'})
                  .exec(callback)
                },
                grace: function(callback) {
                    Post.find({category:'grace'})
                      .exec(callback)
                },
            })
             // console.log(categories)
               res.status(200).json({success:true, data:categories })   
        
      
      } catch (error) {
        res.status(400).json({ success: false });
    }
            break;
      
        default:
            res.status(400).json({ success: false})
            break;
    }
}
export default category