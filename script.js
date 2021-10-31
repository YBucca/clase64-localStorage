// Elementos HTML
const botonIniciarSesion = document.querySelector("#iniciar-sesion")
const formulario = document.querySelector("#form")
const botonEnviarFormulario = document.querySelector("#enviar-form")
const inputNombreUsuario = document.querySelector("#nombre-usuario")
const inputContrasenia = document.querySelector("#contrasenia")
const titulo = document.querySelector("#titulo")
const botonesSesionIniciada = document.querySelector("#botones-sesion-iniciada")
const botonCerrarSesion = document.querySelector("#cerrar-sesion")
const botonCambiarDatos = document.querySelector("#cambiar-datos")


// Funciones auxiliares 

const modificarNombreDeUsuario = (usuario, nuevoNombre) => {
  usuario.nombre = nuevoNombre
  return usuario
}

const convertirAJSON = (usuario) => {
  const objetoConvertidoAJSON = JSON.stringify(usuario)
  return objetoConvertidoAJSON  
}

const convertirDesdeJSON = (json) => {
  const JSONconvertidoaObjeto = JSON.parse(json)
  return JSONconvertidoaObjeto
}

const guardarEnLocalStorage = (objetoDeJS, clave) => {
  let objetoConvertido = convertirAJSON(objetoDeJS)
  localStorage.setItem(clave, objetoConvertido) 
}


const obtenerDesdeLocalStorage = (clave) => {
  const json = localStorage.getItem(clave)
  const objeto = convertirDesdeJSON(json)
  return objeto 
}


// Variables de estado
let sesionEstaIniciada = false; 


const usuario = {
  nombreUsuario: "lala", 
  contrasenia: "lala", 
}

// funciones reutilizables 
const mostrarHTMLComoSesionIniciada = () => {
  titulo.textContent = `Hola, ${usuario.nombreUsuario}!!`
  botonIniciarSesion.classList.add("ocultar")
  formulario.classList.add("ocultar")
  botonesSesionIniciada.classList.remove("ocultar")
}

const mostrarHTMLComoSesionCerrada = () => {
  titulo.textContent = "Hola"
  botonIniciarSesion.classList.remove("ocultar")
  botonesSesionIniciada.classList.add("ocultar")
  formulario.classList.add("ocultar")
}


///pseudoCodigo 

// cuando la sesion esta cerrada 
// - se muesra el titulo como hola
// se hace tal cosa
// se hace tal cosa 



/// codigo de la aplicación 

const sesionEstaIniciadaLocalS = obtenerDesdeLocalStorage("sesion") // es un objeto

///la sesion esta iniciada chequeo.
if (sesionEstaIniciadaLocalS.sesionEstaIniciada === true) {
  // sesionEstaIniciadaLocalS -->es un objeto con su propiedad sesionEstaIniciada
  mostrarHTMLComoSesionIniciada()
}
else {
  mostrarHTMLComoSesionCerrada()
}


botonIniciarSesion.onclick = () => {
  formulario.classList.remove("ocultar")
}

botonEnviarFormulario.onclick = () => {
  // el usuario quiere iniciar sesion, o quiere cambiar datos? 
  const sesionEstaIniciadaLocalS = obtenerDesdeLocalStorage("sesion") // guardo lo que hay en mi localstorage
  if (sesionEstaIniciadaLocalS.sesionEstaIniciada === false ) {
    
    //inicia sesion 
    if (inputNombreUsuario.value === usuario.nombreUsuario
      && inputContrasenia.value === usuario.contrasenia) {
        sesionEstaIniciada = true
        guardarEnLocalStorage( { sesionEstaIniciada: true }, "sesion" )
        mostrarHTMLComoSesionIniciada()
      }
      else {
        console.log("ingresaste datos erroneos")
      }

      
   //si la sesion esta en true , ya iniciada puede editar los datos del mismo usuario-

  }else { 
      usuario.nombreUsuario = inputNombreUsuario.value
      usuario.contrasenia = inputContrasenia.value
      titulo.textContent = `Hola, ${usuario.nombreUsuario}!!`
      formulario.classList.add("ocultar")
  }
}

botonCerrarSesion.onclick = () => {
  sesionEstaIniciada = false
  guardarEnLocalStorage( { sesionEstaIniciada: false }, "sesion" ) // se guarda en local Storage
  mostrarHTMLComoSesionCerrada()
}

botonCambiarDatos.onclick = () => {
  formulario.classList.remove("ocultar")
}
