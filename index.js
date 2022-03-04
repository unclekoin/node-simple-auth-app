const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const authRouter = require('./routes/auth.routes');

const PORT = process.env.PORT || 5050;

const app = express();

app.use(express.json());
app.use('/api/auth', authRouter);

const start = async () => {
  try {
    await mongoose.connect(config.get('endpoint'));
    app.listen(PORT, () => console.log(`Server started on port ${ PORT }...`));
  } catch (e) {
    console.log(e);
  }
};

start();
