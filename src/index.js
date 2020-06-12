const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let xhttp = new XMLHttpRequest();

const API = "https://rickandmortyapi.com/api/character/";

const fetchData = (url_api, callback) => {
  xhttp.open("GET", url_api, false);

  xhttp.onreadystatechange = function (event) {
    if (this.readyState === 4) {
      if (this.status == 200) {
        callback(null, JSON.parse(this.responseText));
      } else return callback(url_api);
    }
  };
  xhttp.send();
};

fetchData(API, (error1, data1) => {
  if (error1) return console.error(`Error ${error1}`);
  console.log("Primer Llamado...");
  fetchData(API + data1.results[3].id, (error2, data2) => {
    if (error2) return console.error(error1);
    console.log("Segundo Llamado...");
    fetchData(data2.origin.url, (error3, data3) => {
      if (error3) return console.error(error3);
      console.log("Tercero Llamado...");
      console.log(`Personajes: ${data1.info.count}`);
      console.log(`Primer Personaje: ${data2.name}`);
      console.log(`Dimensión: ${data3.dimension}`);
    });
  });
});
