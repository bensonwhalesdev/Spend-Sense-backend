require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const connectDB = require('./src/config/db');
const usersRouter = require('./src/routes/user.route');
const authRouter = require('./src/routes/auth.routes');
const accountRoutes = require('./src/routes/account.route');
const budgetRoutes = require('./src/routes/budget.route');
const monthlyBudgetRoutes = require('./src/routes/monthlybudget.route');
const existingUserRoutes = require('./src/routes/existing-user.route');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "https://spend-sense-six.vercel.app",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use("/api/v1/accounts", accountRoutes);
app.use("/api/v1/budgets", budgetRoutes);
app.use("/api/v1/monthlybudgets", monthlyBudgetRoutes);
app.use("/api/v1/existingusers", existingUserRoutes);

app.get('/', (req, res) => {
  res.send('Hello Spend Sense!');
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
