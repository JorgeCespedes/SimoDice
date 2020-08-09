const cuadro11 = document.getElementById('cuadro11')
const cuadro12 = document.getElementById('cuadro12')
const cuadro13 = document.getElementById('cuadro13')
const cuadro14 = document.getElementById('cuadro14')
const cuadro21 = document.getElementById('cuadro21')
const cuadro22 = document.getElementById('cuadro22')
const cuadro23 = document.getElementById('cuadro23')
const cuadro24 = document.getElementById('cuadro24')

const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 2

class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        this.iluminarCuadro = this.iluminarCuadro.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 500)
    }

    inicializar() {
        this.elegirCuadro = this.elegirCuadro.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)

        this.toggleBtnEmpezar()
        this.nivel = 1
        this.cuadros = {
            cuadro11,
            cuadro12,
            cuadro13,
            cuadro14,
            cuadro21,
            cuadro22,
            cuadro23,
            cuadro24
        }
    }

    toggleBtnEmpezar() {
        if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')
        } else {
            btnEmpezar.classList.add('hide')
        }
    }

    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 8))
    }

    siguienteNivel() {
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroACuadro(numero) {
        switch (numero) {
            case 0:
                return 'cuadro11'
            case 1:
                return 'cuadro12'
            case 2:
                return 'cuadro13'
            case 3:
                return 'cuadro14'
            case 4:
                return 'cuadro21'
            case 5:
                return 'cuadro22'
            case 6:
                return 'cuadro23'
            case 7:
                return 'cuadro24'
        }
    }

    transformarCuadroANumero(cuadro) {
        switch (cuadro) {
            case 'cuadro11':
                return 0
            case 'cuadro12':
                return 1
            case 'cuadro13':
                return 2
            case 'cuadro14':
                return 3
            case 'cuadro21':
                return 4
            case 'cuadro22':
                return 5
            case 'cuadro23':
                return 6
            case 'cuadro24':
                return 7
        }
    }


    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            let cuadro = this.transformarNumeroACuadro(this.secuencia[i])
            setTimeout(() => {
                console.log(cuadro)
                this.iluminarCuadro(cuadro)
            }, 1000 * i)
        }
    }


    iluminarCuadro(cuadro) {
        this.cuadros[cuadro].classList.add('light')
        setTimeout(() => this.apagarCuadro(cuadro), 400)
    }


    apagarCuadro(cuadro) {
        this.cuadros[cuadro].classList.remove('light')
    }

    agregarEventosClick() {
        this.cuadros.cuadro11.addEventListener('click', this.elegirCuadro)
        this.cuadros.cuadro12.addEventListener('click', this.elegirCuadro)
        this.cuadros.cuadro13.addEventListener('click', this.elegirCuadro)
        this.cuadros.cuadro14.addEventListener('click', this.elegirCuadro)
        this.cuadros.cuadro21.addEventListener('click', this.elegirCuadro)
        this.cuadros.cuadro22.addEventListener('click', this.elegirCuadro)
        this.cuadros.cuadro23.addEventListener('click', this.elegirCuadro)
        this.cuadros.cuadro24.addEventListener('click', this.elegirCuadro)
    }

    eliminarEventosClick() {
        this.cuadros.cuadro11.removeEventListener('click', this.elegirCuadro)
        this.cuadros.cuadro12.removeEventListener('click', this.elegirCuadro)
        this.cuadros.cuadro13.removeEventListener('click', this.elegirCuadro)
        this.cuadros.cuadro14.removeEventListener('click', this.elegirCuadro)
        this.cuadros.cuadro21.removeEventListener('click', this.elegirCuadro)
        this.cuadros.cuadro22.removeEventListener('click', this.elegirCuadro)
        this.cuadros.cuadro23.removeEventListener('click', this.elegirCuadro)
        this.cuadros.cuadro24.removeEventListener('clikc', this.elegirCuadro)
    }

    elegirCuadro(ev) {
        const nombreCuadro = ev.target.dataset.cuadro
        const numeroCuadro = this.transformarCuadroANumero(nombreCuadro)

        this.iluminarCuadro(nombreCuadro)
        if (numeroCuadro === this.secuencia[this.subnivel]) {

            this.subnivel++
                if (this.subnivel == this.nivel) {
                    this.nivel++
                        this.eliminarEventosClick()
                    if (this.nivel == (ULTIMO_NIVEL + 1)) {
                        this.ganoElJuego()
                    } else {
                        setTimeout(this.siguienteNivel, 1500)
                    }
                }

        } else {
            this.perdioElJuego()
        }
    }


    ganoElJuego() {
        swal('Plazi', 'Felicidades, ganaste!', 'success')
            .then(this.inicializar)
    }

    perdioElJuego() {
        swal('Plazi', 'Qué mala suerte. Sigue intentando', 'error')
            .then(() => {
                this.eliminarEventosClick()
                this.inicializar()
            })
    }
}

function empezarJuego() {
    window.juego = new Juego()
}