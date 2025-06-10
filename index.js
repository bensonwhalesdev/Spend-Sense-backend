require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRouter = require('./src/routes/user.route');
const accountRoutes = require('./src/routes/account.route');
const budgetRoutes = require('./src/routes/budget.route');
const app = express();
const PORT = 5000;


app.get('/', (req, res) => {
    res.send('Hello Spend sense!');
})

app.use(cors());
app.use(express.json());
app.use('/api/v1/users', usersRouter);
app.use("/api/v1/accounts", accountRoutes);
app.use("/api/v1/budgets", budgetRoutes);


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