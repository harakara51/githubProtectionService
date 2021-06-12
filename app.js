const express = require('express')
const createServer = require("./server")

const app = createServer()
const port = 4567

app.listen(port, () => {
  console.log(`Example  app listening at http://localhost:${port}`)
})

module.exports = app;