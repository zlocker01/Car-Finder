/* variables */
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const  color = document.querySelector('#color');

/* contenedor para los resutados */
const resultado = document.querySelector('#resultado');
const max = new Date ().getFullYear();
const min = max - 10;

//geerar un object con la busqueda
const datosBusqueda = {
    marca: '',
    modelo: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
};


/* eventos */
document.addEventListener('DOMContentLoaded', () => {
    mostratAutos(autos);
    //muestra la seleccion de años
    llenarSelect();
});

/* eventos para los select del buscador */
marca.addEventListener('change', (e) => {
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
});
year.addEventListener('change', (e) => {
    datosBusqueda.year = parseInt(e.target.value);

    filtrarAuto();
});
minimo.addEventListener('change', (e) => {
    datosBusqueda.minimo = e.target.value;

    filtrarAuto();
});
maximo.addEventListener('change', (e) => {
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();
});
puertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = parseInt(e.target.value);

    filtrarAuto();
});
transmision.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();
});
color.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value;

    filtrarAuto();
});


/* funciones */
function mostratAutos(autos){
    limpiarHTML();

    autos.forEach( auto => {
        const autoHTML = document.createElement('P');
        const {marca, modelo, year, transmision, puertas, precio, color } = auto;
        autoHTML.textContent = `${marca}- ${modelo} - ${year} - ${transmision} - ${puertas} - ${precio} - ${color}`;

        /* insertar en el html */
        resultado.appendChild(autoHTML);
    });
};

function llenarSelect(){
    for(let i = max; i >= min; i--){
        const opcion = document.createElement('option')
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); //agrega las opciones de año el select
    }
};

/* limpiar html */
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
};

//funcion de alto nivel
function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    
    limpiarHTML();
    if(resultado.length){
        mostratAutos(resultado);
    }else{
        noResultado();
    }
};

function filtrarMarca(auto){
    const {marca} = datosBusqueda;
    if(marca){
        return auto.marca === marca;
    };
    return auto;
};

function filtrarYear(auto){
    const {year} = datosBusqueda;
    if(year){
        return auto.year === year;//este valor se convierte en numero ya que es string arriba en el evento
    };
    return auto;
};

function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
    if(minimo){
        return auto.precio >= minimo;
    };
    return auto;
};

function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;
    if(maximo){
        return auto.precio <= maximo;
    };
    return auto;
};

function filtrarPuertas(auto){ 
    const {puertas} = datosBusqueda;
    if(puertas){
        return auto.puertas === puertas;
    };
    return auto;
};

function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if(transmision){
        return auto.transmision === transmision;
    };
    return auto;
};

function filtrarColor(auto){
    const {color} = datosBusqueda;
    if(color){
        return auto.color === color;
    };
    return auto;
};

function noResultado(){
    const noResultado = document.createElement('DIV');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'Sin Resultados';
    resultado.appendChild(noResultado);
}
