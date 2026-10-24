function sumar(a, b) {
  a = Number(a);
  b = Number(b);

  if (isNaN(a) || isNaN(b)) {
    throw new Error("sumar: los valores deben ser numeros");
  }

  return Number((a + b).toFixed(10));
}
