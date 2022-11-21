const express=require('express');
const path=require('path');
const dotenv=require('dotenv');
const connectDB = require('./config/db');
const userRoutes=require("./routes/userRoutes");
const chatRoutes=require("./routes/chatRoutes");
dotenv.config({ path: path.resolve(__dirname, '../.env') });;
const { errorHandler, notFound } = require('./middlewares/errorMiddlewares');
// Imp line
connectDB();
const app=express();
app.use(express.json());
app.use('/api/users',userRoutes); 
app.use('/api/chat',chatRoutes); 

// Error handler 

app.use(notFound);
app.use(errorHandler);
const PORT=process.env.PORT || 5000;
app.listen(PORT,console.log(`Server started on port ${PORT} `));
