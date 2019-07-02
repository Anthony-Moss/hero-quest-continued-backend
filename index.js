const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const session = require("express-session");
const FileStore = require("session-file-store")(session);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    session({
      store: new FileStore(), // no options for now
      secret: 'abc123'
    })
  );

const userRouter =  require('./routers/users')
const loginRouter = require('./routers/userLoginRoutes')

app.use('/login', loginRouter);
app.use('/heroQuest', userRouter);

app.listen(port, () => {
    console.log(`you got the backend running on port ${port}`);
});