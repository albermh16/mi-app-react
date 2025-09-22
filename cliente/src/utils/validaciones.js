export const tieneMinimo = (value, n = 4) => value.length >= n;
export const tieneArroba = (value) => value.includes("@");
export const tieneMayuscula = (value) => /[A-Z]/.test(value);
export const seleccionar = (value) => value != "";