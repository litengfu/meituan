import mongoose from 'mongoose'
let position =new mongoose.Schema({
    province:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    }
})
export default mongoose.model('Position',position)