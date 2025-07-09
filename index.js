require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const usersRouter = require('./src/routes/user.route');
const authRouter = require('./src/routes/auth.routes');
const accountRoutes = require('./src/routes/account.route');
const budgetRoutes = require('./src/routes/budget.route');
const monthlyBudgetRoutes = require('./src/routes/monthlybudget.route');
const existingUserRoutes = require('./src/routes/existing-user.route');
const app = express();
const PORT = 5000;


app.get('/', (req, res) => {
    res.send('Hello Spend sense!');
});

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', usersRouter);
app.use("/api/v1/accounts", accountRoutes);
app.use("/api/v1/budgets", budgetRoutes);
app.use("/api/v1/monthlybudgets", monthlyBudgetRoutes);
app.use("/api/v1/existingusers", existingUserRoutes);


async function connectDB() {
   try {
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log('database succesful');  
        app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
    } catch (error) {
        console.log(error);   
    }
}
connectDB();