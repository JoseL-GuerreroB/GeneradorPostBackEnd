import bcrypt from 'bcryptjs';

export const encriptar = async (contrasena) => {
  const hash = await bcrypt.hash(contrasena, 10);
  return hash;
}

export const comparar = async (contrasena, hashContrasena) => {
  return await bcrypt.compare(contrasena, hashContrasena);
}