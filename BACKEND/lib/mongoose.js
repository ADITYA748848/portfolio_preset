import mongoose from "mongoose" ;


export function mangooseonnect(){
    if (mongoose.connection.readystate ===1){
        return mangooseonnect.connection.saPromise();

    }else{
        const uri = process.env.MONGODB_URI
        return mongoose.connect(uri);
    }

}