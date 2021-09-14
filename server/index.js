const express = require('express');

const app = express();

app.use(require('cors')())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 将uploads文件夹下的文件作为静态文件暴露出来 使其可以访问得到
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./routes/admin')(app)
require('./plugins/db')(app)

app.listen(3000, () => {console.log("http://localhost:3000")})