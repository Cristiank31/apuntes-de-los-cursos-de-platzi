const XMLHttppRequest = require('xmlhttprquest'); //llamado del modulo XmlHttpRequest para trabajar con el;
const API = 'https://api.escuelajs.co/api/v1'; //API en mayúscula porque es una referencia que no va a cambiar, hace referencia al root del API;

function fetchData(urlApi, callback){ //urlApi: no confundir y colocar API, 1er argumento es la URL a la cual va a comunicarse y el callback;
	let xhttp = new XMLHttppRequest(); //referencia a new XMLHttpRequest

	xhttp.open('GET', urlApi, true); //para abrir una peticion al servidor, 1er parametro el tipo de solicitud ('GET','PUT','DELETE') , 2do parametro la url de la api a trabajar, 3ro parametro valor boolean para saber si vamos a trabajar con asincronismo o no;
	xhttp.onreadystatechange = function(event) { //escucha diferentes estados de la solicitud (son 5 estados: 0=Se ha inicializado, 1=cargando, 2=Se ha cargado, 3=trabajando la solicitud, 4=Se completo la informacion) y conocer cuando está disponible la información
	if(xhttp.readyState === 4) { //Para validar que se haya completado la solicitud correctamente;
		if(xhttp.status === 200 ){ //se valida que el servido responde de forma correcta (puede retornar y valores, 1(100-199)=peticion recibida y siendo procesada por el servidor, 2(200-299)= peticion recibida,aceptada y procesada, 3(300-399)=hay que tomar acciones adicionales para completar solicitud, 4(400-499)=error en la solicitud, 5(500-599)=error de parte del servidor 
			callback(null, JSON.parse(xhttp.responseText)); //dentro de xhttp.responseTex recibimos lo que entrega el servidor en texto y se hace la transformación en JSON
		}
	} else {
		const error = new Error('Error' + urlApi);
		return callback(error,null); //se crea else para manejar los errores si el if no regresa 4 ya que no estaria retornando ninguna informacion;
	}
	}
	xhttp.send(); //para que se ejecute la logica de la function;
}