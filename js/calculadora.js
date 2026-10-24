const display = document.getElementById("display");
let expresion = "";
let estado = "normal";

function mostrar(texto) {
  display.value = texto;
}

function presionar(valor) {
  if (estado === "error") {
    expresion = "";
  } else if (estado === "resultado" && !"+-×÷*/".includes(valor)) {
    expresion = "";
  }
  estado = "normal";
  expresion += valor;
  mostrar(expresion);
}

function calcular() {
  if (expresion === "" || estado === "error") {
    return;
  }
  try {
    const resultado = resolver(expresion);
    expresion = String(resultado);
    estado = "resultado";
    mostrar(expresion);
  } catch (error) {
    expresion = "";
    estado = "error";
    mostrar(error.message);
  }
}

function limpiar() {
  expresion = "";
  estado = "normal";
  mostrar("");
}

function borrar() {
  if (estado === "error") {
    limpiar();
    return;
  }
  expresion = expresion.slice(0, -1);
  estado = "normal";
  mostrar(expresion);
}