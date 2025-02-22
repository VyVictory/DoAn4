import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js'; 
import routerUser from './routes/user.js';
import routerPost from './routes/postApi.js';
import routerCmt from './routes/cmtApi.js';
import routerGroup from './routes/groupApi.js';
import routerNotifi from './routes/notifiApi.js';
const app = express();

// Enable CORS for your frontend (localhost:3000)
app.use(cors({
    origin: 'http://localhost:3000', // Allow only requests from localhost:3000
    methods: 'GET,POST,PUT,DELETE', // Allow specific HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Allow specific headers
}));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', routerUser);
app.use('/post', routerPost);
app.use('/cmt', routerCmt);
app.use('/group', routerGroup);
app.use('/noti', routerNotifi);

mongoose.connect('mongodb+srv://vyvictory:1234567899@cluster0.vahim.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successful connection
    app.listen(3001, () => {
        console.log('Server is running on port 3001');
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});




