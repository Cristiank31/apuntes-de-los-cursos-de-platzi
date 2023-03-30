import fetch from 'node-fetch';
const API = 'https://api.escuelajs.co/api/v1';

//función que va a recibir como argumento la url que queremos llamar y esto retornará el llamado de fecth: una promesa
function fetchData(urlApi){
    return fetch(urlApi); // fetch lo que hace es devolvernos una promesa 
};
// //el llamado
// fetchData(`${API}/products`)
//     .then(response => response.json()) //lo que responde el API(archivo txt) se transforma en un objeto json,
//     .then(products => {
//         console.log(products);//teniendo la transformacion ya se puede hacer lo que se necesite con el objeto retornado por la API, en este caso un
//     })
//     .then(() => {
//         console.log('hola');
//     }) //se pueden anidar múltiples .then
//     .catch(error => console.log(error));


    // otro ejemplo 

    // En este ejemplo cada return se vuelve una nueva solicutud

    fetchData(`${API}/products`)
    .then(response => response.json()) //se hace la conversión de los datos obtenidos por el API a un objeto json
    .then(products => {
        console.log(products[1]);
        return fetchData(`${API}/products/${products[1].id}`) // solo se quiere mostrar el primer elemento de la primera solicitud
    })
    .then(response => response.json()) //se vuelve traer la data y transoformarla nuevamente
    .then(product => {
        console.log(product.title); // como en la solicud anterior se paso a solo un producto ya no se puede solicitar products sino product
        return fetchData(`${API}/categories/${product.category.id}`) //se quiere mostrar la categoria de un producto en particular
    })
    .then(response => response.json())
    .then(category => {
        console.log(category.name);
    })
    .catch(err => console.log(err)) //detectar un error
    .finally(() => console.log('Finally')); //es opcional para mostrar que se terminó la solicitud

