

import express from 'express';
import bodyParser from 'body-parser';
// 1
import session from 'express-session';
import Keycloak from 'keycloak-connect';

const app = express()

app.use(bodyParser.json());

// 2
const memoryStore = new session.MemoryStore();

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


app.use('/', keycloak.protect(), express.static('public/videos'));

app.get('/index.html', keycloak.protect(), function (req, res) {
  var s = `<html><head><title>HLS Player fed by node.js' +
        '</title></head>
        <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
        
        <body>
        <video id="video" controls autoplay></video>   
        <BR>
        <a href="/logout"> logout</a>     
        <script>
  var video = document.getElementById('video');
  if(Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource('http://localhost:3000/output.m3u8');
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED,function() {
      video.play();
  });
 }
  else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = 'http://localhost:3000/output.m3u8';
    video.addEventListener('loadedmetadata',function() {
      video.play();
    });
  }
</script>
        </body></html>`
  res.send(s);
});




app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})