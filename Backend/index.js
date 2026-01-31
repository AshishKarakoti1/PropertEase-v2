const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./dbConnect');

const buyRoute = require('./Routes/buy_route');
const sellRoute = require('./Routes/sell_route');
const authRouter = require('./Routes/authRoute');
const userRouter = require('./Routes/userRoute');
const emailRouter = require('./Routes/emailRoutes');
const passwordRouter = require('./Routes/passwordRoute');

const PORT = process.env.PORT || 9090;
const URL = process.env.MONGO_URL_PROD;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/buy', buyRoute);
app.use('/sell', sellRoute);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/contact', emailRouter);
app.use('/password', passwordRouter);

// Express 5 Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

const startServer = async () => {
    try {
        await connectDB(URL);
        console.log('Connected to MongoDB');
        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Startup Error:', error);
        process.exit(1);
    }
};

startServer();