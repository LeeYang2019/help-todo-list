const express = require('express');
const app = express();

//routes
const todos = require('./routes/todos');

app.use(express.json());
app.use('/api/todos', todos);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening to ${port}`));
