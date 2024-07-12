import mongoose from "mongoose";

type ConnectionObject  = {
    isConnected?: number;
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    console.log("Connecting to the database -----------------1111----------------"); 
    if(connection.isConnected) {
        console.log("Already connected to the database");
        return;
    }
    console.log("Connecting to the database -----------------0000----------------");  
    try{
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {})
        console.log("Connecting to the database -------------2222--------------------"); 
        connection.isConnected = db.connections[0].readyState;
        console.log(db.connections);
        console.log("Connected to the database");

    }catch(error) {
        console.log("Connecting to the database ----------------3333-----------------"); 
        console.log("Error connecting to the database", error);
        process.exit(1);
    }
}

export default dbConnect;