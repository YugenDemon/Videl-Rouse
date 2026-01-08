const grupos = document.querySelectorAll(".grupo");
const precios = document.querySelectorAll(".precio");
const labelsVersion = document.querySelectorAll(".versiones label");
const botonesExtra = document.querySelectorAll(".pricesDetails button");

// ----- FUNCIONES -----
function ocultarTodo() {
  grupos.forEach(g => g.classList.remove("activo"));
}

function limpiarPrecios() {
  precios.forEach(p => p.classList.remove("activo"));
}

function limpiarVersiones() {
  labelsVersion.forEach(l => l.classList.remove("activo"));
  document.querySelectorAll(".versiones input").forEach(i => i.checked = false);
}

// ----- VERSIONES -----
labelsVersion.forEach(label => {
  label.addEventListener("click", () => {
    const version = label.dataset.version;

    ocultarTodo();
    limpiarPrecios();
    limpiarVersiones();

    document.querySelector(`.grupo.${version}`).classList.add("activo");
    document.querySelector(`.precio.${version}`).classList.add("activo");
    label.classList.add("activo");
  });
});

// ----- VISTAS EXTRA -----
botonesExtra.forEach(btn => {
  btn.addEventListener("click", () => {
    const grupo = btn.dataset.grupo;

    ocultarTodo();
    limpiarVersiones();

    document.querySelector(`.grupo.${grupo}`).classList.add("activo");

    // SIEMPRE FullHD
    limpiarPrecios();
    document.querySelector(".precio.fullHD").classList.add("activo");
  });
});


const imagenes = document.querySelectorAll('.grupo img');
const modal = document.getElementById('modalImagen');
const modalImg = modal.querySelector('.modalImg');
const cerrar = modal.querySelector('.cerrar');
const btnPrev = modal.querySelector('.prev');
const btnNext = modal.querySelector('.next');
let grupoActual = [];
let indiceActual = 0;
imagenes.forEach((img, index) => {
  img.addEventListener('click', () => {

    // capturamos SOLO el grupo visible
    const grupo = img.closest('.grupo');
    grupoActual = Array.from(grupo.querySelectorAll('img'));

    indiceActual = grupoActual.indexOf(img);

    mostrarImagen();
    modal.classList.add('activo');
  });
});
function mostrarImagen() {
  modalImg.src = grupoActual[indiceActual].src;
}
btnNext.addEventListener('click', () => {
  indiceActual = (indiceActual + 1) % grupoActual.length;
  mostrarImagen();
});

btnPrev.addEventListener('click', () => {
  indiceActual = (indiceActual - 1 + grupoActual.length) % grupoActual.length;
  mostrarImagen();
});
cerrar.addEventListener('click', () => {
  modal.classList.remove('activo');
});

modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.remove('activo');
  }
});
