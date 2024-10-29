import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
    userID : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Post = mongoose.model('Post', postsSchema);

export default Post;