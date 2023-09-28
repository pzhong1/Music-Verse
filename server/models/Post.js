const { model, Schema } = require('mongoose');

const commentSchema = new Schema(
    {
        commentId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        
        commentBody: {
            type:String,
            required:true,
            max_Length: 280,
        },
        
            username: {
                type:String, 
                required: true,
            },
           createAt: {
            type:Date,
            default:Date.now,
           } 
        
    }
)

const postSchema = new Schema(
    {
       postText: {
        type: String,
        required: true,
        minLength: 1,
        max_Length: 560
       }, 
       
       username:{
        type:String, 
        required:true
       },
       
       createdAt: {
        type: Date,
        default:Date.now,
       },

        comments:[commentSchema]
     
        
},
    {
        toJSON: {
            getters:true,

        }, 
        id: false,
    }
);


const Post = model('Post', postSchema);
// const Post = model('Post', { postSchema, commentSchema });

module.exports = Post; 