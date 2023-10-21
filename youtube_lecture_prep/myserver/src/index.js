const express = require('express')
const path = require('path')
const hbs = require('hbs')

const bodyParser = require('body-parser')
const airdata = require('./utils/airdata')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
const port = process.env.PORT || 5000

// Heroku

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

app.get('/', (req, res) => {
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
  res.render('about', {
    제목: '미세먼지 정보 앱',
    이름: '도우미',
    이메일: 'about@hotmail.com'
  })
})

// JSON endpoint
app.post('/air', (req, res) => {
  airdata(req.body.location, (error, {air}={}) => {
    if (error) {
      return res.send({error})
    }
    return res.render('air', {
      제목: '미세먼지 정보',
      이름: '유지수',
      이메일: 'air@hotmail.com',
      location: air['parm']['stationName'],
      time: air['list'][0]['dataTime'],
      pm10: air['list'][0]['pm10value'],
      pm25: air['list'][0]['pm25value']
    })
  })
})

app.listen(port, () => {
  console.log(`Server is up and running at port ${port}`)
}) // port number

