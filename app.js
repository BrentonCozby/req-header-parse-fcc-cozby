var express = require('express')
var UAParser = require('user-agent-parser')
var parser = new UAParser()
var app = express()

app.set('port', (process.env.PORT || 5000))

app.use(express.static(__dirname + '/public'))

// views is directory for all template files
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    const ua = req.headers['user-agent']
    parser.setUA(ua)

    console.log(parser.getUA());

    var data = {
        ipAddress: req.ip.split('::ffff:')[1],
        language: req.headers["accept-language"].split(',')[0],
        os: parser.getOS()
    }

    if(JSON.stringify(parser.getBrowser()) !== '{}') data.browser = parser.getBrowser()
    if(JSON.stringify(parser.getDevice()) !== '{}') data.device = parser.getDevice()
    if(JSON.stringify(parser.getEngine()) !== '{}') data.engine = parser.getEngine()
    if(JSON.stringify(parser.getCPU()) !== '{}') data.cpu = parser.getCPU()

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data, null, 3))
})

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'))
})
