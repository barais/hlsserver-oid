
const express = require('express')
const app = express()


app.use('/', express.static('public/videos'));

app.get('/player.html', function (req, res) {
    var s = `<html><head><title>HLS Player fed by node.js' +
        '</title></head>
        <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
        
        <body>
        <video id="video" controls autoplay></video>        
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


