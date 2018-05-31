var observableModule = require("data/observable");
const SocketIO = require('nativescript-socket.io');
var dialogs = require("ui/dialogs");
var ObservableArray = require("data/observable-array").ObservableArray;


 
//SocketIO.enableDebug(); // optionnal
 
// or use your own debug function
// SocketIO.enableDebug(myCustomDebugFunction);
 
const options = {'forceNew':true};
 
const socketio = SocketIO.connect('http://192.168.15.13:3001', {'forceNew': true});

var pageData = new observableModule.fromObject({
    messages: new ObservableArray([
        
    ]),
    message : "",
    idUser: 18

});
var page;
const USER = "Juan Mateo";
const ID = 18;

socketio.on('get-messages', function(data){
	console.dir(data);
	pageData.messages = data;
	
	//pageData.messages = data;
});

exports.onNavigatingTo = function(args) {
    page = args.object;
    page.bindingContext = pageData;
    socketio.emit('new-user', {username: USER});    
}

exports.send = function(){
	var payload = {
		id: ID,
		autor: USER,
		txt: pageData.message
	};

	socketio.emit('new-mensaje', payload);
	pageData.message = "";
}