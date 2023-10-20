const express = require('express')
const path = require('path')
const hbs = require('hbs')

const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
const port = process

// Heroku

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

app.get('', (req, res) => {
  res.render('index', {
    제목: '미세먼지 정보 앱',
    이름: '유지수',
    이메일: 'air@hotmail.com'
  })
})
app.get('/help', (req, res) => {
  res.render('help', {
    제목: '미세먼지 정보 앱',
    이름: '도우미',
    이메일: 'help@hotmail.com'
  })
})
app.get('/about', (req, res) => {
  res.render('help', {
    제목: '미세먼지 정보 앱',
    이름: '도우미',
    이메일: 'about@hotmail.com'
  })
})

// JSON endpoint
app.get('/air', (req, res) => {
  res.send({
    forecast: '현재는 쌀쌀합니다',
    위치: "서울"
  })
})

app.listen(5000, () => {
  console.log('Server is up and running at port 5000')
}) // port number

