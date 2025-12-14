const form = document.getElementById("form-client");
const submitBtn = document.getElementById("btnGuardar");
const message = document.getElementById("formMessage");

submitBtn.disabled = true;

function marcar_error(input, error, mensaje) {
   input.classList.add("invalid");
   input.classList.remove("valid");
   error.textContent = mensaje;
}

function marcar_valido(input, error) {
   input.classList.remove("invalid");
   input.classList.add("valid");
   error.textContent = "";
}

function validar_texto (id_input, id_error) {
   const input = document.getElementById(id_input);
   const error = document.getElementById(id_error);
   const valor = input.value.trim();
   const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;

   if (valor == "") {
      marcar_error(input, error, "Campo Obligatorio");
      return false;
   }

   if (!regex.test(valor)) {
      marcar_error(input, error, "Solo Letras");
      return false;
   }

   marcar_valido(input, error);
   return true;
}

function validar_email(){
   const input = document.getElementById("email");
   const error = document.getElementById("error-email");
   const valor = input.value.trim();
   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   if (valor == "") {
      marcar_error(input, error, "Campo Obligatorio");
      return false;
   }

   if (!regex.test(valor)) {
      marcar_error(input, error, "Email Invalido");
      return false;
   }

   marcar_valido(input, error);
   return true;
}

function validar_telefono () {
   const input = document.getElementById("telefono");
   const error = document.getElementById("error-telefono");
   const valor = input.value.trim();

   const regexFlexible = /^(\+\d{1,3}[\s-]?)?(\(\d{1,4}\)[\s-]?)?(\d[\s-]?){6,19}\d$/;

   if (valor === "") {
      marcar_error(input, error, "Campo Obligatorio");
      return false;
   }

   if (!regexFlexible.test(valor)) {
      marcar_error(input, error, "El formato del número no es válido (ej: +52 55 1234-5678).");
      return false;
   }

   marcar_valido(input, error);
   return true;
}

function validar_direccion () {
   const input = document.getElementById("direccion");
   const error = document.getElementById("error-direccion");
   const valor = input.value.trim();

   if (valor == "") {
      marcar_error(input, error, "Campo Obligatorio");
      return false;
   }

   marcar_valido(input, error);
   return true;
}

function validar_formulario_completo() {
   const valalidaciones = [
      validar_texto("nombre", "error-nombre"),
      validar_texto("apellido-paterno", "error-apellido-paterno"),
      validar_texto("apellido-materno", "error-apellido-materno"),
      validar_email(),
      validar_telefono(),
      validar_direccion(),
      validar_texto("producto", "error-producto")
   ];

   submitBtn.disabled = valalidaciones.includes(false);
}

document.getElementById("nombre").addEventListener("input", () => {
   validar_texto("nombre", "error-nombre");
   validar_formulario_completo();
});

document.getElementById("apellido-paterno").addEventListener("input", () => {
   validar_texto("apellido-paterno", "error-apellido-paterno");
   validar_formulario_completo();
});

document.getElementById("apellido-materno").addEventListener("input", () => {
   validar_texto("apellido-materno", "error-apellido-materno");
   validar_formulario_completo();
});

document.getElementById("email").addEventListener("input", () => {
   validar_email();
   validar_formulario_completo();
});

document.getElementById("telefono").addEventListener("input", ()  => {
   validar_telefono();
   validar_formulario_completo();
});

document.getElementById("direccion").addEventListener("input", () => {
   validar_direccion();
   validar_formulario_completo();
});

document.getElementById("producto").addEventListener("input", () => {
   validar_texto("producto", "error-producto");
   validar_formulario_completo();
});

form.addEventListener("submit", (e) => {
   e.preventDefault();

   if (submitBtn.disabled) return;

   const valalidaciones = [
      validar_texto("nombre", "error-nombre"),
      validar_texto("apellido-paterno", "error-apellido-paterno"),
      validar_texto("apellido-materno", "error-apellido-materno"),
      validar_email(),
      validar_telefono(),
      validar_direccion(),
      validar_texto("producto", "error-producto")
   ];

   if (valalidaciones.includes(false)) {
      message.textContent = "Corregir Los Campos Marcados en Rojo";
      message.className = "form-client__message form-client__message--error";
      message.style.opacity = 1;
      return;

   }

   submitBtn.classList.add("is-loading");

   setTimeout(() => {
      submitBtn.classList.remove("is-loading");
      submitBtn.classList.add("is-success");
      message.textContent = "Cliente registrado Correctamente ✅";
      message.className = "form-client__message form-client__message--success";
      message.style.opacity = 1;
      form.reset();

      document.querySelectorAll(".valid, .invalid").forEach(el => {
         el.classList.remove("valid", "invalid")
      });

      submitBtn.disabled = true;

      setTimeout(() => {
         submitBtn.classList.remove("is-success");
         message.style.opacity = 0;
      }, 2500);

   }, 1500);

});