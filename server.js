import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// importing necessary modules

import connectionToDb from './controllers/db-connection.js';
import User from './models/usersModel.js';
import authenticate from './middleware/authenticate.js';
import Post from './models/postsModel.js';

// Generating express app and necessary information

const app = express();
app.use(cookieParser());
app.use(express.static('public'))
dotenv.config();
const PORT = process.env.PORT;
const secret_key = process.env.SECRET_KEY;
app.use(express.json());

// Calling Database Connetion

connectionToDb();

// Sending Signup Page

app.get('/', (req,res)=> {
    res.render('index.html')
});

// API Routes Goes Here

// Signup

app.post('/signup', async(req,res) => {
    const { fullName, username, email, password} = req.body;
    try{
        const exisingUser = await User.findOne({ $or: [{ username }, { email }] })
        if(exisingUser){
            return res.status(400).json({
                message: "User Already Exist !"
            })
        }
        const hashingPassword = await bcrypt.hash(password, 10);
        const user = new User({
            fullName,
            username,
            email,
            password: hashingPassword
        })
        await user.save();
        return res.status(200).json({message: "User Created Successfully!!"})
    } catch(error){
        console.error(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
});

// Login

app.post('/login', async(req,res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "Invalid Credentials !"
            })
        }
        const matchingPassword = await bcrypt.compare(password, user.password);
        if(!matchingPassword){
            res.status(400).json({
                message: "Invalid Credentials"
            })
        }
        const token = jwt.sign({id:user.id}, process.env.SECRET_KEY, {expiresIn: '1h'})
        res.cookie('token', token, {httpOnly: true});
        // const posts = await Post.find({ userID: user.id }).populate('userID', 'username fullName');
        return res.status(200).json({
            message:"login successfull"
        })
    } catch(error){
        console.error(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
})

// Posts

app.post('/post', authenticate, async(req,res) => {
    const { title, content } = req.body;
    const userID = req.user.id;
    try{
        const post = new Post({
            userID :userID,
            title,
            content,
        })
        await post.save();
        res.status(200).json({
            message: "Post Created Successfully!", post
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
})

// Get Posts

app.get('/timeline/posts',authenticate, async(req,res) => {
    const userID = req.user.id;
    try{
        const posts = await Post.find({userID: { $ne: userID }}).populate('userID', 'username fullName');
        return res.status(200).json(posts);
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
})

// Update Post

app.put('/update/post/:id', authenticate, async(req,res) => {
    const { title, content } = req.body;
    const postId = req.params.id;
    try{
        const postUpdate = await Post.findByIdAndUpdate(
            postId,
            {title, content},
            {new: true, runValidators: true}
        )
        if (!postUpdate) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.status(200).json({
            message: "Post updated successfully",
            post: postUpdate,
        });
    } catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
})

// Port Listening Server

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});