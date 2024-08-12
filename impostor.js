const configForm = document.querySelector("#config-form");
const playerInput = document.querySelector("#player-input");
const impostorInput = document.querySelector("#impostor-input");
const noClueModeCheckBox = document.querySelector("#no-clue-mode-checkbox");
const wordListInput = document.querySelector("#word-list-input");
const resetWords = document.querySelector("#reset-words");

const inGameText = document.querySelector("#in-game-text");

let showing = false;
let assignedPlayers = 0;
let impostorsSet = 0;
let orderedWords = [];

let wordsShown = 0;

const defaultWords = ["banco", "hoja", "carta", "planta", "cuadro", "llave", "mono", "sobre", "corriente", 
    "mango", "rata", "copa", "batería", "corona", "cara", "rama", "gato", "sierra", 
    "vela", "pico", "luz", "sol", "barra", "punto", "boca", "frente", "modelo", 
    "ratón", "teléfono", "casco", "reloj", "cadena", "traje", "muelle", "nota", 
    "pez", "estrella", "rueda", "bala", "cola", "freno", "sala", "cinta", "vuelta", 
    "escalera", "cintura", "botón", "bolsa", "cabo", "escala", "zapato", "cuenta", 
    "vestido", "sombrero", "papel", "paso", "gol", "disco", "aguja", "camisa", 
    "juego", "arco", "pinza", "cámara", "corte", "libro", "dado", "pasta", "artículo", 
    "red", "silla", "tecla", "globo", "anillo", "banda", "letra", "caja", "bloque", 
    "peineta", "mesa", "campana", "sello", "lana", "radio", "pluma", "tela", 
    "capa", "aro", "canal", "luna", "marcha", "raya", "portada", "lente", "agua", 
    "suelo", "campo", "tierra", "peso", "bota", "base", "fondo", "pie", "mano", 
    "mar", "masa", "liga", "caza", "ala", "cuerda", "par", "clave", "pata", 
    "punta", "foco", "grupo", "línea", "pista", "cita", "puerto", "vaso", 
    "rayo", "viento", "bando", "torre", "lista", "vena", "tira", "raza", "plato", 
    "piedra", "toro", "cruce", "fila", "salto", "vara", "ángulo", "ficha", 
    "rostro", "sombra", "nave", "tronco", "raíz", "lomo", "tabla", "grano"];

let customWords = [];

inGameText.style.display = "none";

//LOAD SETTINGS
if(localStorage.getItem("customWords")){
    customWords = JSON.parse(localStorage.getItem("customWords"));
}

if(customWords.length > 0){
    wordListInput.textContent = customWords.join(",");
}else{
    wordListInput.textContent = defaultWords.join(",");
}

if(localStorage.getItem("playerCount")){
    playerInput.value = parseInt(localStorage.getItem("playerCount"));
}

if(localStorage.getItem("impostorCount")){
    impostorInput.value = parseInt(localStorage.getItem("impostorCount"));
}

if(localStorage.getItem("noclueMode")){
    if(localStorage.getItem("noclueMode") === "true"){
        noClueModeCheckBox.checked = true;
    }
}

const togleInGameText = (players)=>{
    if(wordsShown >= players){
        location.reload();
    }
    
    if(showing){
        inGameText.textContent = "PULSA PARA REVELAR TU PALABRA";
        showing = false;
    }else{
        inGameText.textContent = orderedWords[wordsShown].toUpperCase();
        wordsShown++;
        showing = true;
    }
}


configForm.addEventListener("submit", event=>{
    event.preventDefault();
    
    startGame(playerInput.value, impostorInput.value, noClueModeCheckBox.checked, wordListInput.value.split(","));
})

//GUARDAR AJUSTES
wordListInput.addEventListener("blur", ()=>{
    customWords = wordListInput.value.split(",");
    localStorage.setItem("customWords", JSON.stringify(customWords));
})

resetWords.addEventListener("click", ()=>{
    localStorage.removeItem("customWords");
    wordListInput.value = defaultWords.join(",");
})

playerInput.addEventListener("blur", ()=>{
    localStorage.setItem("playerCount", playerInput.value);
})

impostorInput.addEventListener("blur", ()=>{
    localStorage.setItem("impostorCount", impostorInput.value);
})

noClueModeCheckBox.addEventListener("change", ()=>{
    localStorage.setItem("noclueMode", noClueModeCheckBox.checked);
})

const startGame = (players, impostors, noClue, wordList)=>{
    //CHOOSE WORDS
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    const impostorWord = wordList[Math.floor(Math.random() * wordList.length)];

    console.log(word, impostorWord);

    //HIDE THE CONFIG
    configForm.style.display = "none";
    inGameText.style.display = "block";

    //ORDER WORDS
    orderedWords.length = players;
    let impostorSpaces = [];
    let wordSpaces = [];

    while(impostorsSet < impostors){
        let numberToPush = Math.floor(Math.random() * players)
        if(!impostorSpaces.includes(numberToPush)){
            impostorSpaces.push(numberToPush);
            impostorsSet++;
        }
    } 

    for(let i = 0; i < players; i++){
        if(!impostorSpaces.includes(i)){
            wordSpaces.push(i);
        }
    }


    wordSpaces.forEach(position=>orderedWords[position] = word);
    if(noClue){
        impostorSpaces.forEach(position=>orderedWords[position] = impostorWord);
    }else{
        impostorSpaces.forEach(position=>orderedWords[position] = "impostor");
    }

    console.log(orderedWords);

    document.documentElement.addEventListener("click", ()=>{
        togleInGameText(players);
    })
}
