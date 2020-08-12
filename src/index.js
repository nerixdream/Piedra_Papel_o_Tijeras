import './styles.css';

//Referencias html
const nombreUsuario = document.querySelector('#usuario');
const opcionUsuario = document.querySelector('.gameplay__resultados--usuario');
const opcionComputadora = document.querySelector('.gameplay__resultados--computadora');
const resultado = document.querySelector('.resultado__titulo');
const plus = document.querySelectorAll('.gameplay__point');
const cajaBoton = document.querySelector('.resultado');
const menuBotones = document.querySelector('.volver-jugar');
const resultadoFinal = document.querySelector('.volver-jugar__resultado');
const container = document.querySelector('.container');
const inicioJuego = document.querySelector('.inicio-juego');

let nombreIngresado;

const averageJugador = document.querySelector('#puntos-usuario');
const averageComputadora = document.querySelector('#puntos-computadora');

const jugadores = [opcionUsuario, opcionComputadora];
//Botones
const piedra = document.querySelector('#piedra');
const papel = document.querySelector('#papel');
const tijeras = document.querySelector('#tijeras');

const botonReset = document.querySelector('#reset-game');
const initGame = document.querySelector('#init-game');

const btnAceptar = document.querySelector('#aceptar');
//Puntos
let puntosUsuario = 0;
let puntosComputadora = 0;

//Arreglo de botones
let botones = [piedra, papel, tijeras];
let opcionPC = [];

//Listeners

botonReset.addEventListener('click', () => {
	setTimeout(() => {
		container.style.display = 'block';
		botonesActividad(false);
		puntosUsuario = 0;
		puntosComputadora = 0;
		menuBotones.style.display = 'none';
		averageComputadora.innerText = 0;
		averageJugador.innerText = 0;
	}, 400);
});

initGame.addEventListener('click', () => {
	setTimeout(() => {
		botonesActividad(false);
		puntosUsuario = 0;
		puntosComputadora = 0;
		menuBotones.style.display = 'none';
		averageComputadora.innerText = 0;
		averageJugador.innerText = 0;

		init();
	}, 400);
});
//EventListener por cada boton
botones.forEach((boton) => {
	boton.addEventListener('click', () => {
		const valorBoton = boton.value;
		botonElegido(jugadores[0], valorBoton);
		comprobarGanador(valorBoton, botonElegidoComputadora());
		botonesActividad(true);
	});
});

//Funciones
//Función para asignar un nombre ingresado
const ingresarUsuario = (nombre) => {
	// nombreIngresado = prompt('Ingresa tu nombre');
	container.style.display = 'block';

	if (parseInt(nombre) || nombre === '' || nombre === undefined) {
		const div = document.createElement('div');
		div.classList.add('error');
		div.innerText = 'Ingresa un nombre válido';
		inicioJuego.appendChild(div);
		setTimeout(() => {
			div.remove();
		}, 2000);
	} else {
		inicioJuego.style.display = 'none';
		nombreUsuario.textContent = nombre;
	}
};

//Agregar la opcion selecionada al html
const botonElegido = (jugador, opcion) => {
	let icono;
	if (opcion === 'question') {
		icono = `
            <i class="fas fa-${opcion}"></i>
        `;
	} else {
		icono = `
        <i class="fas fa-hand-${opcion}"></i>
        `;
	}

	setTimeout(() => {
		jugador.innerHTML = icono;
	}, 300);
};

//Funcion opcion aleatoria de PC
const botonElegidoComputadora = () => {
	botones.forEach((valorBoton) => {
		opcionPC.push(valorBoton.value);
	});
	const valorAleatorio = _.shuffle(opcionPC);
	const valorSeleccionado = valorAleatorio.pop();
	botonElegido(jugadores[1], valorSeleccionado);
	return valorSeleccionado;
};

const comprobarGanador = (usuario, computadora) => {
	setTimeout(() => {
		if (usuario === computadora) {
			puntos();
		} else if (usuario === 'rock' && computadora === 'paper') {
			puntos('computadora', 'Computadora Gana');
		} else if (usuario === 'rock' && computadora === 'scissors') {
			puntos('usuario', 'Jugador Gana');
		} else if (usuario === 'paper' && computadora === 'rock') {
			puntos('usuario', 'Jugador Gana');
		} else if (usuario === 'paper' && computadora === 'scissors') {
			puntos('computadora', 'Computadora Gana');
		} else if (usuario === 'scissors' && computadora === 'rock') {
			puntos('computadora', 'Computadora Gana');
		} else if (usuario === 'scissors' && computadora === 'paper') {
			puntos('usuario', 'Jugador Gana');
		}
	}, 300);
	opcionPC = [];
};

const puntos = (jugador, mensaje) => {
	resultado.style.opacity = 1;

	if (jugador === 'computadora') {
		puntosComputadora++;
		averageComputadora.innerText = puntosComputadora;
		resultado.innerText = mensaje;

		setTimeout(() => {
			plus[0].style.opacity = 1;
		}, 200);
	} else if (jugador === 'usuario') {
		puntosUsuario++;
		averageJugador.innerText = puntosUsuario;
		resultado.innerText = mensaje;
		setTimeout(() => {
			plus[1].style.opacity = 1;
		}, 200);
	} else {
		resultado.innerText = 'Empate';
	}

	reset();
};

const reset = () => {
	setTimeout(() => {
		setTimeout(() => {
			plus[0].style.opacity = 0;
		}, 800);
		setTimeout(() => {
			plus[1].style.opacity = 0;
		}, 800);
		botonElegido(jugadores[0], 'question');
		botonElegido(jugadores[1], 'question');
		resultado.style.opacity = 0;
		botonesActividad(false);
		imprimirGanador();
	}, 800);
};

const crearMenu = (ganador) => {
	setTimeout(() => {
		menuBotones.style.display = 'flex';
		container.style.display = 'none';
		resultadoFinal.innerText = `¡El ganador del juego es: ${ganador}!`;
	}, 500);
};

const imprimirGanador = () => {
	if (puntosUsuario === 5) {
		botonesActividad(true);
		crearMenu(nombreIngresado.value);
	} else if (puntosComputadora === 5) {
		botonesActividad(true);
		crearMenu('Computadora');
	}
};

const botonesActividad = (estado) => {
	botones.forEach((boton) => {
		boton.disabled = estado;
	});
};

const init = () => {
	opcionPC = [];

	// ingresarUsuario();
	btnAceptar.addEventListener('click', (e) => {
		e.preventDefault();

		nombreIngresado = document.querySelector('#nombre');
		ingresarUsuario(nombreIngresado.value.trim());
	});
	inicioJuego.style.display = 'flex';
};

init();
