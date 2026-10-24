function restar(a, b) {
  a = Number(a);
  b = Number(b);

  if (isNaN(a) || isNaN(b)) {
    throw new Error("Restar: Los valores deben ser numeros");
  }

  return Number((a - b).toFixed(10));
}
