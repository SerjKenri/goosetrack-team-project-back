const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./routes/api/authRoutes');
const tasksRouter = require('./routes/api/tasksRoutes');
const userRouter = require('./routes/api/userRoutes');
require('dotenv').config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

mongoose
  .connect(process.env.MONGO_URL)
  .then(connection => {
    console.log('Database connection successful');
  })
  .catch(err => {
    console.log(err);

    process.exit(1);
  });

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/tasks', tasksRouter);
// app.use("/api/columns", columnsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Page not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

console.log('process.env', process.env.PORT);

module.exports = app;
