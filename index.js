const express = require('express')

const app = express()

app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: "Backend is Running Well"
  })
})

app.listen(8080, () => {
  console.log("App Running on Port 8080")
})