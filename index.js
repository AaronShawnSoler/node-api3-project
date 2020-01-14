// code away!
const express = require('express');
const userRoutes = require('./users/userRouter');
const postRoutes = require('./posts/postRouter');

const server = express();
server.use(express.json());

server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);

const port = 8000;
server.listen(port, () => console.log(`Listening on port ${port}`));