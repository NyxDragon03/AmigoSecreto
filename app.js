//array para los nombres
let participantes = [];

function agregarAmigo(){
    let input = document.getElementById("amigo");
    //verificación de null
    if (!input) { 
        console.error("El elemento con id='amigo' no existe.");
        return;
    };

    let nombre = input.value.trim();
    //validar solo letras y espacios con expresión regular
    let nombreCorrecto = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
    if (!nombre.match(nombreCorrecto)) {
        alert("Ingrese un nombre válido (solo letras y espacios).");
        input.value = ""; //limpiar el imput para corregir
        return;
    };

    //convertir todo a minusculas para comparar y que los nombres no se repitan
    let nombreMin = nombre.toLowerCase();
    //verificar si ya existe
    let existe = participantes.some(nombre => nombre.toLowerCase() === nombreMin);
    if (existe) {
        alert("El nombre ya fue registrado.");
        input.value = "";
        return;
    };

    participantes.push(nombre);
    actualizarLista();
    input.value = "";
};

function actualizarLista(){
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    for(let i = 0; i < participantes.length; i++){
        let item = document.createElement("li");
        item.textContent = participantes[i];
        lista.appendChild(item);
    };
};

let sortear = false; //controlar si es el primer sorteo

function sortearAmigo() {

    if (participantes.length === 0 && !sortear){
        alert("Aún no se ha añadido a ningún participante.");
        return;
    };

    if (!sortear && participantes.length < 3) { 
        alert("Debe haber al menos 3 participantes para iniciar el sorteo.");
        return;
    };

    sortear = true; //ya no se valida la cantidad de participantes

    let indice = Math.floor(Math.random() * participantes.length);
    let amigoSecreto = participantes[indice];

    if(sortear && participantes.length >=2) {
        let jugador = confirm(`¿Eres ${amigoSecreto}?`);
        if (jugador) {
            sortearAmigo();
            return;
        };
    };
    
    if (participantes.length === 0) { 
            alert("No hay más participantes para sortear.");
            document.getElementById("reiniciar").style.display = "block"; //el botón de reinicio se muestra
            return;
    };

    mostrarResultado(amigoSecreto);
    participantes.splice(indice, 1);
};

function mostrarResultado(amigoSecreto) {
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    let item = document.createElement("li");
    item.textContent = `Tu amigo secreto es: ${amigoSecreto}`;
    resultado.appendChild(item);
};

function reiniciarSorteo() {
    participantes = []; //vacia la lista de participantes
    sortear = false; //reinicia la validación del primer sorteo

    //borra las listas
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";

    //oculta el botón de reinicio nuevamente
    document.getElementById("reiniciar").style.display = "none";
};