function dividir(a, b) {
  a = Number(a);
  b = Number(b);

  if (isNaN(a) || isNaN(b)) {
    throw new Error("dividir: los valores deben ser numeros");
  }

  if (b === 0) {
    throw new Error("No se puede dividir entre cero");
  }

  return Number((a / b).toFixed(10));
}