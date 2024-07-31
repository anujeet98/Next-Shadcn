import mongoose from "mongoose";


export const connectToDB = async() => {
    try{
      if(mongoose.connections && mongoose.connections[0].readyState)
        return;
  
      const { connection } = await mongoose.connect(
        process.env.MONGO_URI as string,
        {
          dbName: 'nextshadcn'
        }
      );
  
      console.log('database connected!');
    }
    catch(err){
      throw new Error('Error connecting to database');
    }
  }