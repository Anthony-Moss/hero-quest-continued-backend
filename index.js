const express = require('express');
const app = express();
const port = 4000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const userRouter =  require('./routers/users')

app.use('/api', userRouter);

app.listen(port, () => {
    console.log(`you got the backend running on port ${port}`);
});