//array para los nombres
let participantes = [];

function agregarAmigo(){
    let input = document.getElementById("amigo");
    //verificación de null
    if (!input) { 
        console.error("El elemento con id='amigo' no existe.");
        return;
    }

    let nombre = input.value.trim();
    //validar solo letras y espacios con expresión regular
    let nombreCorrecto = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
    if (!nombre.match(nombreCorrecto)) {
        alert("Ingrese un nombre válido (solo letras y espacios).");
        input.value = ""; //limpiar el imput para corregir
        return;
    }

    //convertir todo a minusculas para comparar y que los nombres no se repitan
    let nombreMin = nombre.toLowerCase();
    //verificar si ya existe
    let existe = participantes.some(nombre => nombre.toLowerCase() === nombreMin);
    if (existe) {
        alert("El nombre ya fue registrado.");
        input.value = "";
        return;
    }
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
    }
};