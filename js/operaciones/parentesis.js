function tokenizar(expresion) {
  const texto = expresion
    .replace(/\s+/g, "")
    .replace(/\*/g, "×")
    .replace(/\//g, "÷");
  const tokens = [];
  const pila = [];
  let i = 0;

  while (i < texto.length) {
    const c = texto[i];
    const anterior = tokens[tokens.length - 1];
    const anteriorEsValor = typeof anterior === "number" || anterior === ")";

    if (/[0-9.]/.test(c) || (c === "-" && !anteriorEsValor && /[0-9.]/.test(texto[i + 1] || ""))) {
      let signo = 1;
      if (c === "-") {
        signo = -1;
        i++;
      }
      let numero = "";
      while (i < texto.length && /[0-9.]/.test(texto[i])) {
        numero += texto[i];
        i++;
      }
      if (numero === "." || numero.split(".").length > 2) {
        throw new Error("Numero invalido");
      }
      if (anteriorEsValor) {
        tokens.push("×");
      }
      tokens.push(Number(numero) * signo);
      continue;
    }

    if (c === "(") {
      if (anteriorEsValor) {
        tokens.push("×");
      }
      pila.push(false);
      tokens.push("(");
    } else if (c === "-" && !anteriorEsValor && texto[i + 1] === "(") {
      pila.push(true);
      tokens.push("(", -1, "×", "(");
      i++;
    } else if (c === ")") {
      if (pila.length === 0) {
        throw new Error("Parentesis sin abrir");
      }
      const extra = pila.pop();
      tokens.push(")");
      if (extra) {
        tokens.push(")");
      }
    } else if ("+-×÷".includes(c)) {
      tokens.push(c);
    } else {
      throw new Error("Caracter invalido");
    }
    i++;
  }

  return tokens;
}

function resolverPlano(tokens) {
  if (tokens.length === 0) {
    throw new Error("Expresion vacia");
  }
  if (tokens.length % 2 === 0) {
    throw new Error("Expresion invalida");
  }
  for (let i = 0; i < tokens.length; i++) {
    const esNumero = typeof tokens[i] === "number";
    if ((i % 2 === 0) !== esNumero) {
      throw new Error("Expresion invalida");
    }
  }

  const lista = tokens.slice();
  let i = 0;
  while (i < lista.length) {
    if (lista[i] === "×" || lista[i] === "÷") {
      const resultado =
        lista[i] === "×"
          ? multiplicar(lista[i - 1], lista[i + 1])
          : dividir(lista[i - 1], lista[i + 1]);
      lista.splice(i - 1, 3, resultado);
    } else {
      i++;
    }
  }

  let total = lista[0];
  for (let j = 1; j < lista.length; j += 2) {
    total =
      lista[j] === "+"
        ? sumar(total, lista[j + 1])
        : restar(total, lista[j + 1]);
  }

  return total;
}

function resolver(expresion) {
  const tokens = tokenizar(expresion);

  while (tokens.includes("(")) {
    const abre = tokens.lastIndexOf("(");
    const cierra = tokens.indexOf(")", abre);
    if (cierra === -1) {
      throw new Error("Parentesis sin cerrar");
    }
    const valor = resolverPlano(tokens.slice(abre + 1, cierra));
    tokens.splice(abre, cierra - abre + 1, valor);
  }

  return resolverPlano(tokens);
}