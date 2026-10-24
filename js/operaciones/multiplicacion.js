function multiplicar(a, b) {
  a = Number(a);
  b = Number(b);

  if (isNaN(a) || isNaN(b)) {
    throw new Error("multiplicar: los valores deben ser numeros");
  }

  return Number((a * b).toFixed(10));
}