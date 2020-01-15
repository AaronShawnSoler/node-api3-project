// code away!
const express = require('express');
const userRoutes = require('./users/userRouter');
const postRoutes = require('./posts/postRouter');

const server = express();
server.use(express.json());

function logger(req, res, next) {
    console.log(`[${new Date().toString()}] METHOD: ${req.method} | URL: ${req.url}`);
    next();
}

server.use(logger);

server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);

server.use(function(req, res) {
    res.status(404).send(`No such directory`);
});

const port = 8000;
server.listen(port, () => console.log(`Listening on port ${port}`));