var http = require('http');
var fs = require('fs');
var path = require('path');

var port = 3000;
var image_folder = './image_folder';
var files = [];



function randomImg(){

	var index = Math.floor(Math.random()*files.length);
	var file =  files[index];

	console.log(file);
	return path.join(image_folder,file);
}



function runServer(){
	http.createServer(function(request,response){

		console.log('request..');
		response.writeHead(200,{"Content-Type":"image/png"});

		fs.readFile(randomImg(),'binary',function(err,file){
			response.write(file,"binary");
			response.end();
		});

		
	}).listen(port,function(){
		console.log('placehold server is listening on ' + port);
	});
}

function isImg(ext){
	return ext == "png" || ext == "jpg" || ext == "jpeg";
}

function initImgFiles(callback){
	fs.readdir(image_folder,function(err,_files){
		for(var i in _files){
			var file = _files[i];
			var file_ext = file.split('.')[1];
			if(file_ext && isImg(file_ext)){
				files.push(file);
			}
		}

		if(callback) callback();
	});
}

function main(){
		initImgFiles(function(){
			runServer();
		});
}

if (require.main === module) {
    main();
}