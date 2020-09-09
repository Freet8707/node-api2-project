const express = require('express');

const expressRouter = require("./routes/expressRouter")

const server = express();

const PORT = 4000;

server.use("/api/posts", expressRouter);

server.listen(PORT, console.log(`server listening on port : ${PORT}`))