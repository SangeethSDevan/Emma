const mongoose=require("mongoose")
const app=require('./app')
const cors=require('cors')

require("dotenv").config()

const PORT=process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log(`Connection to DB success!`)
})

app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})