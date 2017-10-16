const express = require('express')  
const app = express()  
//const port = 8080

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'))

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res){
	res.render("index");
})

/* 
app.get('/', (request, response) => {  
  response.send('Hello from Express!')
})*/

app.get('/calc', (request, response) => {  
  response.send('Hello from Express Calc!')
})

var data = {};
var albumsArray = [];

app.get('/getJSON', (request, response) => {  
    // Website you wish to allow to connect
    response.setHeader('Access-Control-Allow-Origin', '*');		
    response.setHeader('Content-Type', 'application/json');

	response.send(data);
})


	function Album (id, albumName, artistName, imageUrl, songUrlArray) {
		Album.count = ++Album.count || 1;
		this.id = Album.count;
		this.albumName = albumName;
		this.artistName = artistName;
		this.imageUrl = imageUrl;
		this.songUrlArray = songUrlArray;
	}


	
app.get('/getAlbums', (request, response) => {  

    response.setHeader('Access-Control-Allow-Origin', '*');		
    response.setHeader('Content-Type', 'application/json');

    console.log(albumsArray);
	response.send(albumsArray);
	
})

app.post('/removeAlbum', function(request, response){
  response.setHeader('Access-Control-Allow-Origin', '*');	
  response.setHeader('Content-Type', 'application/json');

  console.log(request.body); // your JSON 
  var albumObj = request.body.data;
  var index = albumsArray.findIndex(function( obj ) {
		return obj.id == albumObj;
   });

  if(index >= 0)
  {	
	albumsArray.splice(index,1);
  }
	
  response.send({album_Array: albumsArray});    // echo the result back 
});



app.post('/addAlbum', function(request, response){
  response.setHeader('Access-Control-Allow-Origin', '*');	
  response.setHeader('Content-Type', 'application/json');
	var albumObj = request.body;
	albumObj = new Album(albumObj.id, albumObj.albumName, albumObj.artistName, albumObj.imageUrl, albumObj.songUrlArray);

	albumsArray.push(albumObj);
	console.log(albumsArray);
 
  response.send(albumObj);    // echo the result back
});

app.post('/editChanges', function(request, response){
  response.setHeader('Access-Control-Allow-Origin', '*');	
  response.setHeader('Content-Type', 'application/json');
	var newArray = request.body.array;
	console.log(newArray);
	
	albumsArray[0].songUrlArray = newArray;
  response.send(newArray);    // echo the result back
});



app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})