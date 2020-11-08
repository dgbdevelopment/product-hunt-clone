export default function validate(values) {
  let errors = {}
  if (Object.keys(values).includes("username")) {
    const usernameRegex = /^[a-z0-9_-]{3,32}$/;
    if (!usernameRegex.test(values.username))
      errors.username = "Usuario obligatorio: mínimo 3 caracteres sin espacios y sin mayúsculas";
  }
  if (Object.keys(values).includes("email")) {
    const emailRegex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(values.email)) errors.email = "Email no válido";
  }
  if (Object.keys(values).includes("password")) {
    const passwordRegex = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{6,}$/;
    if (!passwordRegex.test(values.password))
      errors.password = "Mínimo 6 caracteres con miníscula, mayúscula y número";
  }
  return errors;
}