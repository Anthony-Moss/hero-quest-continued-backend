const express = require('express');
const app = express();
const port = 5000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// const userRouter =  require(route_to_user_router)

// app.use('/heroQuest', userRouter);

app.listen(port, () => {
    console.log(`you got the backend running on port ${port}`);
});