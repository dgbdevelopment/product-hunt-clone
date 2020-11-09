export default function validate(values) {
  let errors = {};
  if (Object.keys(values).includes("username")) {
    const usernameRegex = /^[a-z0-9_-]{3,32}$/;
    if (!usernameRegex.test(values.username))
      errors.username =
        "Usuario obligatorio: mínimo 3 caracteres sin espacios y sin mayúsculas";
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
  if (Object.keys(values).includes("url")) {
    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/;
    if (values.url.trim() === "") errors.url = "La URL es obligatoria";
    else if (!urlRegex.test(values.url))
      errors.url = "Formato de URL no válido";
  }
  if (Object.keys(values).includes("productname")) {
    if (values.productname.trim() === "")
      errors.productname = "El nombre del producto es obligatorio";
  }
  if (Object.keys(values).includes("company")) {
    if (values.company.trim() === "")
      errors.company = "El nombre de la empresa es obligatorio";
  }
  if (Object.keys(values).includes("description")) {
    if (values.description.trim() === "")
      errors.description = "La descripción del producto es obligatoria";
  }

  return errors;
}
