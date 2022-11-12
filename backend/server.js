const express=require('express');
const path=require('path');
const dotenv=require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });;

// Imp line
const app=express();

const PORT=process.env.PORT || 5000;
app.listen(PORT,console.log(`Server started on port ${PORT} `));
