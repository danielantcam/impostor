const configForm = document.querySelector("#config-form");
const playerInput = document.querySelector("#player-input");
const impostorInput = document.querySelector("#impostor-input");
const noClueModeCheckBox = document.querySelector("#no-clue-mode-checkbox");
const wordListInput = document.querySelector("#word-list-input");

const inGameText = document.querySelector("#in-game-text");

let showing = false;
let assignedPlayers = 0;
let impostorsSet = 0;
let orderedWords = [];

let wordsShown = 0;

const defaultWords = ["ábaco","abdomen","abeja","abismo","abogado","abrigo","abrupto","absurdo","abuelo","acceso","acción","aceite",
  "acento","acero","aclarar","acné","acoger","acompañar","acorde","acoso","acre","actitud","actor","actriz","acudir",
  "acuerdo","acuífero","acumular","acusar","adecuado","adelante","adentro","adherir","adiestrar","adiós","adivinar",
  "adjunto","admirar","admitir","adoptar","adorno","aduana","adverbio","advertir","aéreo","afectar","afición","afinar",
  "afirmar","afligir","afortunado","afuera","agarrar","agente","ágil","agitar","agonía","agosto","agotar","agradable",
  "agrandar","agrario","agravar","agredir","agregar","agresión","agrupar","agua","aguardar","agudo","águila","aguja",
  "ahí","ahogar","ahorro","aire","aislado","ajedrez","ajeno","ajustar","álbum","alcalde","aldea","alegre","alejar",
  "alentar","alergia","alerta","aleteo","alfombra","alga","algodón","aliado","aliento","alivio","alma","almeja",
  "almohada","alojar","alondra","alpino","altar","alterar","altura","aluminio","alumno","alzar","amable","amante",
  "amapola","amargo","amasar","ámbar","ambición","ámbito","ameno","amigo","amistad","amnesia","amor","amplio",
  "análisis","ancla","anciano","ancho","ancla","andamio","andén","andino","andrógino","anécdota","anemia","anfitrión",
  "ángel","angosto","anguila","ángulo","anhelo","anidar","anillo","animado","ánimo","aniquilado","anís","aniversario",
  "anochecer","anotar","antena","ántrax","anual","anunciar","anzuelo","año","apagar","apetito","apio","aplanar",
  "aplaudir","aplicación","aplicar","apodo","aportar","aposento","apoyo","aprender","apresurar","aprobar","aprovechar",
  "aproximar","árbitro","árbol","arcángel","arcilla","arder","ardilla","arduo","arena","árido","aries","aristocracia",
  "arma","armadillo","armonía","arnés","aroma","arpa","arquero","arrastrar","arrebato","arreglar","arremeter",
  "arrepentido","arriba","arrogante","arrojar","arroyo","arte","artesanía","artificial","artista","arzobispo",
  "asado","asalto","ascensor","aseado","asegurar","asesino","asesor","asiento","asilo","asistir","asno","asociar",
  "asombro","áspero","astilla","astro","astuto","asumir","asunto","atacar","atajo","atar","atardecer","ataúd","atento",
  "aterrador","aterrizar","ático","atleta","atmósfera","atolón","átomo","atraco","atraer","atrapar","atraso",
  "atrevimiento","atrevido","atributo","atroz","audaz","aumentar","aun","aunque","ausente","autor","autoridad",
  "auxilio","avance","avaro","ave","avellana","avena","aventura","avería","avión","aviso","ayer","ayuda","ayunar",
  "azar","azteca","azúcar","azufre","azul","baba","babor","babel","bache","bahía","bailar","bajar","bajo","bala",
  "balanza","balcón","balsa","baluarte","bambú","banco","banda","bandera","bandido","banquete","bañera","bar",
  "barato","barba","barco","barniz","barranca","barrendero","barrera","barro","basado","bastón","batería","batido",
  "batir","batuta","baúl","bebé","belleza","besar","bestia","biblioteca","bici","bicicleta","bifurcar","bigote",
  "bilis","bioma","biopsia","bipolar","birmania","bisonte","bisutería","blanco","blando","bloque","blusa","boa",
  "bobina","bobo","boca","bocadillo","bocina","boda","bodega","bofetada","bogotá","boina","bola","bolero","bolígrafo",
  "bolsa","bomba","bondad","bondadoso","borde","bordón","borrar","bosque","bote","botella","botón","bóveda","bozal",
  "bravo","brazada","brazo","brecha","breve","brillo","brincar","brindis","brisa","broca","broma","bronce","brote",
  "bruja","brujería","brusco","brutal","bucear","bucle","buen","bueno","bufanda","bufón","buitre","bulto","burbuja",
  "burdel","burla","burro","buscar","buzón","caballo","cabaña","cabello","caber","cabeza","cabra","cabreado","cacao",
  "cada","cadena","caer","café","cagar","caída","caimán","caja","cajón","cal","calabaza","calamar","calambre","calavera",
  "caldo","calentador","calentar","calidad","calificar","calizo","calma","calor","calumniar","caluroso","calvo",
  "cama","camarero","cambiar","camello","caminar","camino","campaña","campeón","campo","camuflaje","canal","canasta",
  "candado","candelabro","canela","cangrejo","canica","cansancio","cantar","cañón","caos","capaz","capilla","capitán",
  "capote","captura","cara","caracol","carácter","caradura","carajo","caramelo","caravana","carbono","carcajada",
  "carcelero","carga","cargar","cariño","carisma","carne","carnicería","caro","carpeta","carpintero","carretera",
  "carro","carta","cartel","casa","casar","cascabel","casco","casero","casi","caso","caspa","castaño","castigar",
  "castillo","casto","casualidad","catar","catástrofe","catre","caudal","cauce","causa","cautela","cavar","cazador",
  "cazo","cebolla","ceder","cedro","ceja","celebrar","célebre","celeste","celoso","célula","cementerio","cenar",
  "ceniza","censo","censura","centavo","central","centro","céntimo","cerca","cerco","cerdo","cereal","cereza","cero",
  "cerrar","certeza","cerveza","cesar","cesta","césped","cetro","chacal","chal","chaleco","chamán","champú","chancla",
  "chapa","charco","charla","chico","chicle","chico","chillar","chimenea","chino","chirrido","chispa","chispear",
  "chiste","chivo","choque","choza","chuleta","chupar","ciclón","ciego","cielo","cien","ciencia","cierto","cifra",
  "cigarrillo","cima","cimiento","cinco","cinta","cintura","circo","ciruela","cisne","cita","ciudad","clamor","clan",
  "claro","clase","clásico","clavar","clavel","clavo","cliente","clima","clínica","cloaca","clon","club","coartada",
  "cobarde","cobre","cobro","cocina","coche","cochino","coco","codicia","código","cofre","coger","cohete","coincidir",
  "cojín","cojo","col","cola","colapso","colección","colega","colegio","colina","collar","colmo","colocar","colonia",
  "color","columna","columpio","colza","comarca","combate","comedor","cometa","comida","comisión","comité","comodo",
  "compadre","compañero","comparar","compasión","competencia","complacer","completo","componer","comprar","compresión",
  "compuerta","computadora","común","comunión","conceder","concepto","conciencia","concluir","concordia","condenar",
  "conducir","conejo","conectar","confiado","confianza","congelar","conjurar","conmover","conocer","conquista",
  "consagrado","consejo","consenso","conservar","consigna","consistir","consolar","constante","consultar","consumo",
  "contacto","contar","contener","contento","contestar","continuar","contorno","contra","conveniente","conversar",
  "convertir","convicción","convocar","cooperar","coordinar","copa","copiar","copla","copón","coraje","corazón",
  "corbata","coro","corona","coronel","corral","corrección","corredor","correo","correr","corriente","corte","cortejo",
  "cortesía","cortina","corvo","cosa","coser","cosmos","costa","costilla","coyuntura","cráter","crédito","creación",
  "creativo","crecer","creer","crema","crepitar","crepúsculo","crescente","cresta","criada","criado","criar","crimen",
  "crin","cripta","crisis","crispar","cristal","criterio","crítica","crítico","crónica","croqueta","crudo","cruel",
  "cruz","cruzar","cuadro","cuadrúpedo","cuajada","cualidad","cuantía","cuarentena","cuarto","cuarzo","cuate","cubeta",
  "cubo","cubrir","cuchara","cuchillo","cuello","cuento","cuerda","cuerno","cuero","cuerpo","cuervo","cuesta",
  "cueva","cuidar","culebra","culminar","culpa","culpar","cultivo","cultura","cumbre","cumplir","cuna","cundir",
  "cuota","curandero","curar","curioso","curso","curva","custodia","cutis","dama","danza","daño","dardo","dársena",
  "dato","década","decente","decidido","decidir","décimo","declarar","decorado","decreto","dedo","defecto","defender",
  "definición","deforme","degenerar","deidad","dejar","delantal","deleite","delgado","deliberar","delicado",
  "delincuente","delirio","demanda","demente","demoler","denso","dental","dentro","depósito","derecha","derrota",
  "descanso","descarga","descendencia","desconfianza","descontento","describir","descubrir","descuidado","desde",
  "desdicha","desear","desembocar","desempleado","desencanto","desenlace","desesperado","desfilar","desgaste",
  "desgracia","deshacer","deshonra","desierto","desigual","desintegrar","deslizar","desmayar","desnudo","despensa",
  "despertar","despido","despistado","desplazar","despreciado","desprolijo","destacado","destapar","destello",
  "destino","destructor","desvalido","desviar","detalle","detención","detener","determinar","detrás","detrito",
  "deuda","devoción","devolver","día","diablo","diadema","diagnóstico","diagrama","dial","diálogo","diamante","diario",
  "dibujo","diccionario","dicha","dicho","diente","dieta","diez","difamar","difunto","digerir","digno","dilema",
  "diligente","diminuto","dinero","dios","diploma","diputado","dirección","director","dirigir","disciplina","disco",
  "discreción","disculpa","discutir","diseño","disfraz","disfrutar","disgustar","disimular","disipar","disminuir",
  "disolución","disparar","dispensa","disperso","disputa","distante","distinción","distraer","distribuir","diverso",
  "divino","divisa","división","divorcio","doblar","doce","dolencia","dolor","domador","domar","dómino","domingo",
  "don","donar","donde","dormir","dorso","dos","dosis","dudar","duelo","dueño","dulce","duque","durar","durazno",
  "dureza","echar","eco","ecuador","edad","edén","edición","edificio","editorial","educación","educado","efecto",
  "eficaz","efigie","eje","ejemplo","ejercer","elástico","elección","elector","elegante","elevar","eliminar","elipse",
  "elogio","eludir","embarcación","embargo","embestir","embotellado","embrujar","emergencia","emigrar","emitir",
  "emoción","empacar","empanada","emparejar","empate","empeine","empeñar","empequeñecer","emperador","empezar",
  "emplazar","emplear","empleo","emprender","empresa","empujar","enamorar","enano","enardecer","encantado","encarar",
  "encender","encía","encima","enclavar","encoger","encontrar","encuadrar","encuentro","encuesta","endeble","enderezar",
  "enemigo","energía","enfermo","enfocar","enfrente","engañar","engendro","engranaje","engullir","enigma","enjambre",
  "enjuagar","enlace","enmarañar","ennegrecer","enojado","enorme","enredar","enrojecer","enrollar","ensalada","ensayo",
  "enseñar","entero","entrar","entre","entrega","entretener","entorno","entristecer","entumecer","enviar","envío",
  "envolver","épico","episodio","epígrafe","época","equidad","equilibrar","equipo","equivocar","erigir","erosión",
  "erótico","errar","error","erudito","esbelto","esbozo","escalar","escalera","escama","escándalo","escapar",
  "escarcha","escarpa","escasez","escena","esclavo","esclusa","escoger","escolta","escombro","esconder","escopeta",
  "escote","escribir","escrito","escritor","escuchar","escudo","esencia","esfinge","esfuerzo","esgrima","eslabón",
  "esmalte","espacio","espalda","espantar","especia","espejismo","espejo","esperanza","espeso","espiar","espina",
  "espiral","espíritu","espléndido","esposa","espuma","esquina","esquivar","estable","establo","estación","estadio",
  "estafar","estallar","estampar","estandarte","estar","estatua","este","estela","estilo","estima","estimular",
  "estirpe","estómago","estrella","estremecer","estreno","estreñimiento","estreñido","estrépito","estrés","estrofa",
  "estructura","estruendo","estrujar","estudiar","estufa","etéreo","eterno","ética","etiqueta","euforia","evacuar",
  "evaluar","evaporar","evento","evidencia","evitar","exactitud","exagerar","examen","exasperar","exceder","excelso",
  "excepto","exceso","excitar","excluir","excremento","excursión","exento","exhalar","exhausto","exhibir","exigir",
  "exilio","existir","éxito","exótico","expandir","expansión","expedición","expedir","experiencia","experto",
  "explicar","explorar","explosión","exponer","expresar","exprimir","expulsar","extender","extinguir","extirpar",
  "extracción","extraer","extranjero","extraño","extravagante","extremista","exuberante","fábula","fachada","fácil",
  "facilidad","factor","faena","faja","falacia","fallecer","fallo","falsedad","falta","familiar","familia","famoso",
  "fango","fantasma","fanático","faquir","faraón","farol","farsa","fase","fatalidad","fatiga","fatuo","favor",
  "faz","febrero","fecha","fecundar","felicidad","felino","feliz","femenino","fémur","feo","feria","fermento",
  "feroz","ferrocarril","fértil","fertilidad","fervor","festín","fiable","fianza","fiar","fibra","ficha","fiel",
  "fiera","fiesta","fijar","fila","filial","filtro","final","finanza","finca","fingir","finito","firma","fiscal",
  "fisura","flaco","flagelo","flauta","flecha","flexión","flojo","flor","florecer","flota","foca","fogata","fogón",
  "folio","follaje","fomentar","fonema","fondo","forma","formato","fornido","forraje","forro","fortaleza","fortuna",
  "forzar","fosforescente","foto","fracaso","fracción","fragancia","fragata","fragmento","frambuesa","francés",
  "franco","franja","frase","fraude","fregar","frenar","fresco","frijol","frío","frisón","frontera","frotar",
  "fruta","frutal","frustrado","fuego","fuente","fuerza","fuga","fugar","fugitivo","fulano","fulgor","fulminante",
  "fumador","fumigar","función","funda","fundición","fundir","fundón","funeral","furia","furor","furtivo","fusión",
  "fusil","futuro","gacela","gafas","gaita","gajo","gala","galán","galardón","galeón","galope","gamba","gamberro",
  "ganado","ganador","ganancia","ganar","gancho","ganga","ganso","garaje","garbanzo","garfio","garganta","gárgola",
  "garra","gaseosa","gastar","gato","gaviota","gazapo","gel","gemelo","gemir","gen","genial","género","gente",
  "geranio","gestión","gesto","gigante","gimnasio","girar","giro","glaciar","gladiador","glándula","globo","gloria",
  "gobernar","gobierno","gol","goloso","golpe","golpear","golpista","goma","gordo","gorila","gorra","gota","goteo",
  "gozar","gozo","grada","gráfico","grada","gráfico","gráfico","gracia","grado","graffiti","granada","grande",
  "granero","granjero","grano","grasa","gratis","grave","graznido","gregario","gremio","grifo","grillo","gris",
  "gritar","groenlandia","grosero","grúa","grueso","grupo","guacamayo","guante","guardar","guardián","guarida",
  "guayaba","guerra","guerrero","guía","guiño","guitarra","gusano","gustar","gustoso","gusto","haber","hábil",
  "habitar","habitación","hablador","hablar","hacer","hachazo","hada","hallar","hambre","hambriento","hamster",
  "haragán","harapo","harina","hazaña","harto","hasta","hastío","haya","haz","hebra","hechizo","hecho","helado",
  "helar","helicóptero","heliotropo","hemano","herbívoro","heredar","herida","herir","hermana","hermano","héroe",
  "hermosa","hervir","híbrido","hice","hierba","hielo","hiena","hijo","hilo","himno","hincar","hindi","hinojo",
  "hiperbole","hipopótamo","hoguera","hoja","holanda","holgazán","hombre","homilía","hongo","honor","honra","hora",
  "horca","horchata","hormiga","hormiguero","hornear","horno","horrible","horror","hospedaje","hospedar","hospital",
  "hostil","hotel","huevo","huésped","huerta","huerto","hueso","huésped","huida","huir","humano","humareda","humilde",
  "humo","hundir","huracán","hurto","icono","idea","ideal","identidad","ideología","ídolo","iglesia","ignorar",
  "igual","ilegal","ilimitado","ilusión","imagen","imán","imitar","imparcial","impecable","impedir","impensado",
  "imperio","implante","imponer","importancia","importar","imposición","impregnar","impreso","improviso","impulso",
  "impureza","inacción","incendiar","incienso","incierto","inclinación","incógnito","increíble","incubar","indecente",
  "indeciso","independencia","indiferencia","indígena","indigno","indio","indispensable","indistinto","individuo",
  "inducir","indulgencia","industria","inebriado","inédito","ineficaz","inerte","infancia","infantil","infarto",
  "infeliz","inferior","inflamable","inflamado","inflexible","influencia","informal","ingenio","ingrato","inhalar",
  "iniciar","inimaginable","inmediato","innato","inocente","inodoro","insaciable","insano","inseguro","insensato",
  "insípido","insistir","insólito","insomnio","inspiración","instante","instinto","instituto","instrucción","insulto",
  "intacto","integrar","inteligente","intención","intenso","interés","interior","intimidar","inundación","inusual",
  "invadir","inválido","invasión","invención","inventar","invertir","investigar","invierno","invitado","invocar",
  "ir","ira","ironía","irracional","irreal","irresponsable","irrigar","irrompible","isla","jabón","jactancia",
  "jaguar","jamás","japonés","jarabe","jardín","jefe","jengibre","jeringa","jinete","jocoso","jornada","joroba",
  "joven","joya","jubileo","jubiloso","juguete","juicio","junio","juntar","jurel","jurídico","justicia","justo",
  "juvenil","juzgado","lacio","lacra","lácteo","lado","ladrillo","ladrón","lago","lágrima","lamentar","lamento",
  "lámina","lámpara","lana","lancha","langosta","lanzar","lápiz","largo","lasaña","lástima","lata","látigo","lavabo",
  "lavanda","lazo","leal","lealtad","lección","leche","lecho","lector","leer","legal","legendario","legible",
  "legumbre","lejano","lengua","lento","león","leopardo","leña","lesión","letal","letargo","letra","leve","leyenda",
  "liana","libar","libelo","liberal","libertad","libra","libranza","libre","librería","libro","licencia","líder",
  "lidiar","lienzo","liga","ligero","limar","limitar","limón","limosna","limpiar","linda","línea","linfa","lío",
  "lípido","liso","listado","listo","litera","literal","litigar","litio","litro","llaga","llama","llanura","llave",
  "llegar","llenar","lleno","llevar","llorar","llover","lluvia","loable","loado","lobera","lobo","loción","loco",
  "locura","lograr","logro","lombriz","lomo","loncha","lona","loro","lote","lucha","lucir","lugar","lujo","luminoso",
  "luna","lunar","luz","madrina","madrugar","madurar","maestro","magnético","magnitud","mago","mágico","maíz",
  "majestad","mal","maldecir","maldición","maleta","malicioso","malo","maltratar","mamut","manco","mancha","mandar",
  "mandíbula","mando","mandril","manga","mango","manía","maniquí","manjar","mano","manso","manta","mantener",
  "mantequilla","mantis","manto","manual","manuscrito","mañana","mapa","máquina","maraña","maratón","maravilla",
  "marcar","marfil","margarita","marido","marina","marioneta","mariposa","marítimo","mármol","marrón","martillo",
  "mártir","masaje","máscara","masivo","masonería","mástil","matador","matemática","materia","matorral","matriz",
  "mayo","mazamorra","mazo","máximo","mayor","mecha","médico","mediodía","medir","meditar","medusa","mejilla",
  "mejor","melancolía","melocotón","melodía","memoria","mendigo","meneo","menguar","menor","menos","mensaje",
  "mensajero","mente","mentira","menudo","mercado","merced","merecer","merienda","mero","mes","mesón","meta",
  "metafísica","meter","metro","mezcla","mi","miedo","miel","miembro","miga","milagro","milicia","militante",
  "millón","mimar","mineral","minga","mínimo","ministerio","minúsculo","minuto","mío","mirar","miserable","miseria",
  "mismo","mitad","mito","mitología","mocoso","modelo","mojar","molde","moler","molestar","molino","momento","monarca",
  "monasterio","mondar","moneda","monje","mono","montaña","montar","monte","montón","monumento","moño","morada",
  "moraleja","moralidad","morbo","morder","moreno","mortal","mosca","mosquito","mostrar","motín","moto","mover",
  "movido","móvil","mucama","muchacho","muchedumbre","mucho","mudar","mudo","muela","muelle","muera","muero","muerte",
  "muestra","mugre","mujer","mula","muleta","mullir","multiplicar","mundo","muñeca","muñeco","muralla","murciélago",
  "murmurar","muro","musaraña","muscular","museo","musgo","música","músico","muslo","nácar","nacer","nación","nadar",
  "nadie","naranja","narciso","nariz","narrar","nativo","natural","náufrago","navaja","navegar","navidad","necio",
  "negar","negativo","negocio","negro","neón","nervio","nervioso","nervudo","neta","neto","neutro","nevado","niño",
  "nicho","nido","niebla","nieto","nietzsche","nieve","nieve","nihilismo","nítido","noble","noche","noche","nódulo",
  "nómada","nombre","nómbrame","nordico","noria","normal","norma","norte","norteño","nostalgia","notable","notar",
  "noticia","notorio","novela","novelista","noviazgo","nube","nublar","nuboso","nuca","nuera","nueve","nuevo",
  "nuez","nulo","nunca","nutrir","obedecer","obediente","obelisco","obeso","obispo","objeto","obligar","oblongo",
  "obra","obrero","obsequio","observar","obstáculo","obstruir","ocasión","océano","ochenta","ocho","ocioso","ocre",
  "octavo","oculto","ocupado","ocurrir","odiar","odio","odisea","ofender","oferta","oficial","oficiar","oficio",
  "ofrecer","ogro","oído","oír","ojo","ola","olfato","oliva","olivo","olla","olor","olvidar","ombligo","onda",
  "oneroso","onza","opaco","operar","opinar","oponer","oportunidad","opresión","opresor","opuesto","orador",
  "oración","oráculo","orador","oración","oráculo","orbe","orca","orcos","órdenes","orden","ordenanza","ordenar",
  "ordinal","oreja","orfandad","orgía","orgullo","oriental","orificio","orilla","orinar","orla","ornar","oro",
  "orquídea","ortiga","osadía","oscilar","oscuro","osezno","oso","ostra","otorgar","otoño","oveja","óvulo","óxido",
  "oxígeno","oyente","pacto","padre","pagar","pagoda","país","paisaje","paja","pájaro","pala","palacio","paladar",
  "pálido","paliza","palma","palmera","palmo","paloma","palpar","palpitar","pan","pánico","panorama","pantano",
  "pantorilla","pantufla","pañal","paño","papá","papel","papilla","paquete","parada","parado","paradoja","paralelo",
  "parar","parásito","parcela","parcial","pardo","parecer","pared","pareja","pareo","parir","parlante","parque",
  "párrafo","párroco","parte","particular","partir","pasa","pasado","pasajero","pasamontañas","pasar","pasear",
  "pasil","pasión","paso","pasta","pasto","pastor","pata","patente","paternal","patético","patio","patria","patrón",
  "pavimento","pavor","payaso","paz","peaje","peatón","pecado","pecar","pececillo","peces","peculiar","pedal",
  "pedazo","pedestal","pedido","pedir","peinado","pelaje","pelar","pelea","pelear","pelear","peletero","película",
  "pellizco","pelota","peluche","pena","penal","penar","pender","pendiente","pendón","penetrar","península",
  "penoso","pensador","pensamiento","pensar","pensión","pentágono","peña","peón","peor","pepino","pequeñez",
  "pequeño","pera","percal","percibir","perder","perdigón","perdón","perdurable","perenne","perezoso","pericia",
  "perfil","perforar","perfumado","perfume","perímetro","periodo","perla","permanente","permitir","pernoctar",
  "perola","perplejo","perro","perseguir","persona","personaje","perspectiva","perseguir","pertenecer","pertinente",
  "perverso","peso","pesquisas","pestaña","peste","petaca","petición","petróleo","pez","pezón","pezuna","picar",
  "picardía","picor","pictórico","piedra","pierna","pieza","pijama","pilar","piloto","pimienta","pintado","pintar",
  "pintura","pío","pipa","piragua","piramidal","pirar","pirata","piscina","piso","pistola","pitillo","pitón",
  "pivote","placer","plácido","plaga","plan","plancha","plano","planeta","planta","plantilla","plata","plátano",
  "platino","plato","playa","plaza","plazoleta","plazo","plebe","pleito","pleno","plomo","pluma","plural","pobre",
  "población","poblar","pobre","pobreza","poder","podrido","poema","poesía","poeta","polar","policía","polilla",
  "político","polizón","polvo","polvorón","pomada","pomelo","poner","poniente","ponte","popa","por","porción",
  "pordiosero","porfiar","pormenor","porque","portal","portar","porte","porvenir","poseer","posición","positivo",
  "postergar","posterior","postre","postura","potente","pote","potrillo","pozo","pradera","prado","pragmático",
  "pragmatismo","pragmático","prado","pregonero","pregunta","preludio","prematuro","premio","prenda","prensa",
  "presencia","presente","presidente","presión","preso","prestado","prestar","presumido","presumir","presunto",
  "pretender","pretexto","prevalente","prevenir","prever","previamente","previsor","príncipe","principio","prisión",
  "privado","privar","prócer","procurar","prodigio","producir","profano","profanar","profe","profesor","prófugo",
  "profundo","progreso","prohibir","prole","prójimo","prolífico","promesa","prometer","promoción","promotor",
  "pronóstico","pronunciar","propagar","propio","proponer","proposición","prosa","proseguir","prosperar","proteger",
  "proteína","protesta","protocolo","proveedor","proverbio","providencia","provincia","provocar","prudencia",
  "prudente","prueba","público","pudrir","pueblo","puente","puerta","puesto","pulga","pulgar","pulir","pulla",
  "pulpo","pulsera","pulso","puma","punción","punta","puntal","punteo","punto","punzar","pupila","puro","purpura",
  "pusilánime","putrefacto","quebrar","quebrada","quebrantado","quedarse","queja","quemar","querer","queso",
  "quien","quieto","quietud","quijote","quimera","quimico","quince","quiniela","quinto","quitar","ración","radical",
  "ráfaga","rayo","ración","racionar","radical","raíz","rajado","rajar","rama","ramo","rancio","rango","rapto",
  "rarísimo","rasgo","raspar","rasurar","rata","ratificar","rato","rastro","rasuradora","rata","ratificar","raudo",
  "rayo","razón","rebelde","rebotar","recaer","recargar","receloso","recelo","receta","rechazo","recibir","recinto",
  "recitar","reclamar","recoger","recogida","reclutar","recoger","reconocer","recordar","recreo","recreación",
  "rector","rectángulo","recuerdo","red","redecilla","redentor","redil","redimir","reducir","refinación","refinar",
  "reflejar","reflejo","reflotar","reformar","refrán","refrescante","refugio","refutar","regar","regazo","región",
  "registrar","regla","regocijo","regresar","regular","rehén","rehusar","reina","reinar","reino","reír","reja",
  "relámpago","relato","relevante","relevar","relinchar","religión","reluciente","remar","remedio","remolino",
  "remontar","rencor","rendija","rendido","rendir","rendición","renglón","renovar","reparar","repartir","repasar",
  "repetir","repisa","repleto","reportaje","repostería","reptil","repudiar","reputación","requiebro","resaca",
  "resbalar","resbalón","rescate","resistencia","residir","resignación","resina","resistente","resolución",
  "resolver","resonar","respecto","respeto","respirar","resplandor","responder","restablecer","restar","restaurar",
  "restituir","resto","resucitar","resumen","resurgir","retaguardia","retener","retintín","retirado","retirar",
  "reto","retorcido","retoñar","retratar","retraso","retrato","retro","retroceder","reunión","revelación","revelar",
  "reverendo","reverencia","rever","revoltijo","revés","revocar","revolución","revolver","rey","rezar","rezagado",
  "rezar","rezo","riachuelo","ribera","rico","ridículo","rienda","riesgo","rigidez","rigor","río","rival","rizo",
  "robar","roble","roca","roce","rociar","rodar","rodar","rodeo","roer","rogatorio","rojizo","rojo","rollo",
  "romántico","romper","ron","roncar","ronco","rondar","ropa","rosal","rosa","roseta","rostro","rotación","rotar",
  "roto","rubio","rubor","rudo","rueda","ruego","rugir","ruidoso","ruina","ruiseñor","ruleta","rumbo","rumiar",
  "runa","ruptura","rural","rústico","sábana","sabático","saber","sabio","sabroso","sacar","sacerdote","saco",
  "sacramento","sacrificio","sádico","sahumerio","sal","salado","salario","saldo","salida","salir","salón","salsa",
  "saltamontes","saltar","salto","salud","saludar","salvar","sanar","sangre","sano","santa","santo","sapo","saqueo",
  "saquear","sardina","sartén","satisfacción","satisfacer","saturar","sazón","sección","seco","secretario","secreto",
  "secuaz","secular","sed","seda","secuencia","seducción","seducir","segmento","seguir","segundo","seguridad",
  "sello","selva","semana","semilla","semitono","señal","señalar","seña","senda","sensible","sensual","sentado",
  "sentar","sentencia","sentido","sentimiento","sentir","separar","sepultura","sequedad","ser","sereno","seriedad",
  "serie","sermón","serpiente","serrano","serrucho","servicio","servilleta","sesión","seta","setenta","severo",
  "sexo","sexy","si","sí","sibarita","siberia","sibilino","sibilancia","siboney","sideral","siempre","siena","sierra",
  "siete","sigilo","significado","signo","significar","siglo","silbar","silencio","silente","silicio","silla",
  "símbolo","simbolismo","simetría","simple","simulacro","simular","sin","síncopa","sinceridad","sincero",
  "sincronía","sínodo","síntesis","sinuoso","síndrome","sinfonía","singular","siniestra","sinónimo","sintaxis",
  "sinvergüenza","siquiera","sirena","sistema","sito","sitio","situación","situado","situar","sobre","sobriedad",
  "sobrina","sobrino","socavón","sociedad","socialismo","sociedad","socorrer","socio","socolor","sol","soldado",
  "solemnidad","soler","solicitud","sólido","solitario","sollozar","solo","soltar","soltero","soltura","solución",
  "sombra","sombrero","someter","sopor","soplar","soportar","soportón","sorbete","sordo","sorpresa","sortija",
  "soso","sótano","sótano","soviet","suave","subasta","subida","subir","subrayar","subterráneo","subversión",
  "subyacer","suciedad","sucio","sudar","sudor","sudoroso","sueco","sueldo","suelo","sueño","suerte","sufrir",
  "sujetar","sultán","sumar","sumiso","sumo","suntuoso","superficie","superior","superstición","supervisor",
  "súplica","suplir","suponer","supremo","sur","surtido","surtir","susceptible","suscitar","suscripción","suspense",
  "susurro","sutil","sustancia","sustituir","susto","sutil","suyo","tabaco","tabla","tacto","tarde","tacto",
  "tajada","tajo","taladro","talar","talento","talla","tamaño","tambor","tamboril","tambor","tanto","tapar","tapia",
  "tapón","tapón","taponar","tapete","taquilla","tarántula","tarde","tardío","tarea","tarifa","tarjeta","tarot",
  "tartamudo","tártaro","tasajo","tasa","taza","tazón","teatro","techo","técnico","tejado","tejer","tela","telar",
  "telegrama","teléfono","telaraña","teledirigido","telegrafista","telegráfico","telegráfico","televisor",
  "temblar","temblor","tembloroso","temer","temible","temor","temperatura","templanza","templo","temprano",
  "tenedor","tenencia","tener","tenis","tensa","tensión","tenso","tentación","tentar","teñir","teoría","terapia",
  "tercera","tercer","terco","teresa","terminal","terminar","termino","terna","ternura","ternero","terquedad",
  "territorio","terror","tertulia","testamento","testigo","textil","tía","tiburón","tigre","tijeras","tímido",
  "timón","tímpano","tina","tío","tinta","tinte","tintorería","tintura","tiovivo","tipo","tiranía","tirano",
  "tirita","tirón","tiroteo","tiro","tiza","tobillo","tocar","todavía","todo","toldo","tomar","tomate","tono",
  "topar","toque","torbellino","torcer","tormenta","torneo","toro","torre","torreón","torso","torta","tortilla",
  "tórrido","torso","tótem","trabajar","trabajo","trabilla","tradición","traducir","traer","tragedia","trágico",
  "trago","traje","trampa","tranquilo","transatlántico","transatlántico","trance","transcurso","transferir",
  "transformar","tránsito","transitar","transmisión","transparente","transportar","transporte","trapecio","trapo",
  "tras","trascendental","trasero","trasfondo","trasladar","traspasar","trasplante","trasquilón","trastornar",
  "tratar","trato","travesura","trazar","treinta","treinta","treja","trepar","tres","tresillo","tribu","tridente",
  "trilogía","trino","tristeza","triunfo","trivial","trofeo","trompa","tronco","tropezar","trotar","trovador",
  "truco","trueque","tubo","tubérculo","tucán","tuerto","tulipán","tumba","tumbar","tumulto","túnel","turbante",
  "turbina","turbo","turbulento","turista","turno","turrón","tutor","ubicar","ubiquo","ufo","último","ultraje",
  "umbral","unión","universal","universo","universitario","uno","untar","uñas","urbano","urbano","urbe","urdimbre",
  "urgente","urgir","urna","urnario","usado","usar","usualmente","usted","utensilio","útil","utilidad","utopía",
  "utópico","uva","vaca","vacante","vacante","vacío","vacilar","vacío","vacuna","vagabundo","vago","vagueza",
  "vagón","vagón","vajilla","valer","valeroso","valiente","valiosa","valor","valioso","valle","valor","vampiro",
  "vano","vapor","vara","varado","vara","varga","varios","varón","varonil","vasto","vasija","vaticano","vaticinar",
  "vaya","vayamos","vea","vecindario","vecino","vehemente","vejez","vela","velero","vello","velo","veloz","vena",
  "venerar","venganza","venir","venta","vendedor","veneno","venerar","venir","ventaja","ventana","ventilar",
  "ventilador","ventisca","ventoso","ventura","venus","ver","verano","veraz","verbo","verde","vereda","vergüenza",
  "verídico","verificar","verja","versátil","versículo","verso","versículo","verso","verso","verter","vertiente",
  "vestíbulo","vestido","vetar","vetusto","vía","viaje","viajar","viaje","viandante","vicio","vicisitud","vicioso",
  "víctima","victorioso","vida","vidrio","viejo","viento","vientre","vigilancia","vigilar","vigía","vigor","vigoroso",
  "vil","villa","vimos","vimos","vinagre","viña","violento","violín","violín","violinista","viperino","virar",
  "virgen","viril","virtud","virus","visceral","visión","visitar","vista","vital","vitamina","vitorear","vitrina",
  "vívido","vivienda","vivir","volar","voluntad","volver","volcán","vómito","volumen","voraz","votación","votar",
  "voz","vuelo","vuelo","vulgar","vulnerable","vulpeja","vuelto","vuelta","vuelta","vuelta","vuelvo","xenófobo",
  "yacer","yate","yegua","yema","yerno","yerro","yeso","yodo","yugo","yunta","yunque","zapato","zarza","zarzillo",
  "zodiacal","zodiaco","zoonosis","zorro","zumbido","zurdo","zurro","zurullero"];


const togleInGameText = (players)=>{
    if(wordsShown >= players){
        location.reload();
    }
    
    if(showing){
        inGameText.textContent = "PULSA LA PANTALLA PARA REVELAR LA PALABRA";
        showing = false;
    }else{
        inGameText.textContent = orderedWords[wordsShown].toUpperCase();
        wordsShown++;
        showing = true;
    }
}

inGameText.style.display = "none";
wordListInput.textContent = defaultWords.join(",");


configForm.addEventListener("submit", event=>{
    event.preventDefault();
    
    startGame(playerInput.value, impostorInput.value, noClueModeCheckBox.checked, wordListInput.value.split(","));
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

    //console.log(impostorSpaces, wordSpaces);

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
