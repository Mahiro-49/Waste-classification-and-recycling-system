module.exports = app => {
  const express = require('express')
  const router = express.Router({mergeParams: true})
  const bcrypt = require('bcryptjs')
  const jwt = require('jsonwebtoken')

  const User = require('../../model/User')

  process.on('unhandledRejection', error => {
    console.log('我帮你处理了', error.message);
   });

  // --------->登录注册接口 开始
  // 加密规则
  const secret = 'register-rule'
  // 获取用户列表
  app.get("/admin/api/getlist", async (req, res) => {
    const list = await User.find()
    res.send(list)
  })
  // 注册接口
  app.post("/admin/api/register", async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    if (user) {
      return res.status(409).send("该用户已存在")
    }

    const newUser = await new User(req.body).save()
    res.send(newUser)
  })
  // 登录接口
  app.post('/admin/api/login', async (req, res) => {
    // 查询用户是否存在
    const user = await User.findOne({ username: req.body.username })
    if (!user) { return res.status(422).send("该用户不存在") }

    // bcrypt加密处理
    let isPassword = await bcrypt.compareSync(req.body.password, user.password)
    if (!isPassword) {
      return res.status(422).send("密码错误，请重新输入");
    }

    // 返回 token
    const { _id, username } = user;
    const token = jwt.sign({ _id, username }, secret, { expiresIn: '24h' })
    res.send(token)
  })
  // 验证
  app.get('/admin/api/verify', async (req, res) => {
    console.log(req.headers.authorization);
    // 获取token
    // jwt
    const token = req.headers.authorization.split(' ')[1]
    console.log(jwt.verify(token, secret));
    const { _id } = jwt.verify(token, secret)
    const { username } = jwt.verify(token, secret)
    console.log(_id);
    console.log(username);
  })
  // --------->登录注册接口 结束

  // --------->通用CRUD接口 开始
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if(req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions)
    res.send(items)
  })
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({ success: true })
  })
  // --------->通用CRUD接口 结束

  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)    // 将复数和小写的单词转为单数和大写的单词
    req.Model = require(`../../model/${modelName}`);  // 挂载在req上
    next();
  }, router)


  // --------------------------------------------------------------------------------------------------
  // --------->上传图片接口 开始
  const multer = require('multer');
  const upload = multer({dest: __dirname + '/../../uploads'})    // 上传文件所保存的地址
  app.post('/admin/api/upload', upload.single('file') ,async (req, res) => {
    const file = req.file;
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
  
  // --------->上传图片接口 结束
}