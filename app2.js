
import cors  from 'cors';

import express from 'express';
import bodyParser from 'body-parser';
// 1
import session from 'express-session';
import Keycloak from 'keycloak-connect';

const app = express()
app.use(cors());
app.use(bodyParser.json());

// 2
const memoryStore = new session.MemoryStore();

// on précise ici qu'on autorise toutes les sources
// puis dans le second header, quels headers http sont acceptés
app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(
  session({
    secret: '6d44fd6e-982f-4e9d-9d18-ef95cd064bc2',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  })
);

// 3
const keycloak = new Keycloak({
  store: memoryStore
});

app.use(
  keycloak.middleware({
    logout: '/logout',
    admin: '/'
  })
);

app.get('/api/unsecured', function(req, res) {
  res.json({ message: 'This is an unsecured endpoint payload' });
});

app.get('/api/user', keycloak.protect(), function(req, res) {
  res.json({ message: 'This is an USER endpoint payload' });
});
app.get('/api/admin', keycloak.protect('realm:admin'), function(req, res) {
  res.json({ message: 'This is an ADMIN endpoint payload' });
});


app.use('/node_modules/keycloak-js/', express.static('node_modules/keycloak-js'));

app.use('/keycloak.json', express.static('keycloak.json'));





app.get('/index.html', function (req, res) {
  var s = `<html><head><title>HLS Player fed by node.js' +
        '</title>
        <link href="https://unpkg.com/video.js/dist/video-js.css" rel="stylesheet">

        </head>
        
<!--        <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>-->
        <script src="http://localhost:8080/auth/js/keycloak.js"></script>
        
        <body>
        <video-js id="my_video_1" class="vjs-default-skin" controls preload="auto" width="640" height="268">
        <source id="video" type="application/x-mpegURL">        
        </video-js>
        <BR>
        <a href="/logout"> logout</a>     
          
        <script src="https://unpkg.com/video.js/dist/video.js"></script>
        <script src="https://unpkg.com/@videojs/http-streaming/dist/videojs-http-streaming.js"></script>
  
        <script src="/client.js"></script>

</script>

        </body></html>`
  res.send(s);
});


app.use('/client.js', express.static('public/videos/client.js'));



app.use('/', keycloak.protect(), express.static('public/videos'));



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})