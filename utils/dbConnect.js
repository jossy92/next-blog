/*import mongoose from 'mongoose'

const connection = {};

async function dbConnect() {
     if(connection.isConnected) {
        return;
    }
 
    const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
   
        
    connection.isConnected = db.connections[0].readyState
    console.log(connection.isConnected);
 
   
}
export default dbConnect;
*/
// db.js
import mongoose from 'mongoose';

export default async () => {
  if (mongoose.connections[0].readyState) return;
  // Using new database connection
  await mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
     useUnifiedTopology: true 
  });
};