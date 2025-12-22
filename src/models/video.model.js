import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";// new shit js installed for some reason

const videoSchema = new Schema({

    videoFile :{
        type : String, // url cloud
        required: true
    },

    thumbnail :{
        type : String, // url cloud
        required: true
    },

    title :{
        type : String, 
        required: true
    },

    description :{
        type : String, 
        required: true
    },

    
    duration :{
        type : Number, 
        required: true
    },

     views :{
        type : Number, 
        default : 0
    },

    isPublished :{

        type : Boolean,
        default :true

    },

    owner :{
        type :Schema.Type.ObjectId,
        ref :"User"

    }

},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)// new shit
export const Video = mongoose.model("Video",videoSchema)