// Initialize Firebase
var config = {
  apiKey: "AIzaSyBSnhdVwFDFmv6MDAwSuX83vd4EdcDqX6c",
  authDomain: "cursovue-a0fe9.firebaseapp.com",
  databaseURL: "https://cursovue-a0fe9.firebaseio.com",
  projectId: "cursovue-a0fe9",
  storageBucket: "cursovue-a0fe9.appspot.com",
  messagingSenderId: "882954572296"
  };
  firebase.initializeApp(config);
  var db = firebase.database();


new Vue({
    el:"main",
    created(){
      db.ref('/user').on('value', snapshot => this.cargarMensajes(snapshot.val()))
    },
    data:{
      Desabilitado: true,
      editable: null,
      respuesta: [],
      formulario:{
        nombre: null,
        user: null,
        email: null,
        grado: 'primero',
        mensaje:null,
        opcion: null,
        acepta:null
    },
       grado:[
         "primero",
         "segundo",
         "tercero",
         "cuarto",
         "quinto",
         "sexto"
       ],
       
    },
    methods:{
      enviarmensaje(){
        db.ref('/user')
        .push({
          name: this.formulario.nombre,
          usuario: this.formulario.user,
          correo: this.formulario.email,
          estudios: this.formulario.grado,
          mensaje: this.formulario.mensaje,
          opcion: this.formulario.opcion,
          acepta: this.formulario.acepta
        }).then((data)=> {
          this.formulario.nombre= "",
          this.formulario.user= "",
          this.formulario.email= "",
          this.formulario.grado= "primero",
          this.formulario.mensaje= "",
          this.formulario.nombre= null,
          this.formulario.nombre= false
          console.log(data.key);
        });
        },
        cargarMensajes(respuestas){
          this.respuesta = [];
          for (let key in respuestas) {
           
              this.respuesta.push({
                  nombre: respuestas[key].name,
                  user: respuestas[key].usuario,
                  email: respuestas[key].correo,
                  grado: respuestas[key].estudios,
                  mensaje: respuestas[key].mensaje,
                  opcion: respuestas[key].opcion,
                  acepta: respuestas[key].acepta,
               
                  key:key
                  
              });
              
          this.respuesta.reverse();
          console.log(respuestas ); 
          }
      },
      elimiarMensaje(key){
        console.log(key);
        if(confirm("¿seguro?")){
            db.ref('/user/' + key)
            .remove();
      }
        
    },
    edit(key){
      console.log("edit")
      this.Desabilitado=!  this.Desabilitado;
      console.log(this.Desabilitado);
      

    },
    enviar(nombre,user,email,grado,mensaje,oppcion,key){
     
      db.ref('/user/' + key)
      .update({
        name: nombre,
        usuario: user,
        correo: email,
        estudios: grado,
        mensaje: mensaje,
        opcion: oppcion,
               
      }).then(()=>{
        this.Desabilitado=!  this.Desabilitado;
        console.log(oppcion);
      });
      },
     /* botonSi(oppcion){
        if(this.Desabilitado == false ){
        if(oppcion == "si"){
          oppcion ="si";
        }else{
          oppcion = "si";
        }  
        console.log(oppcion);
        }
        
      },
      botonNo(oppcion){
        if(this.Desabilitado == false ){
        if(oppcion == "no"){
          
        }else{
          oppcion = "no";
        }
        console.log(oppcion);
      }
        
      }*/
    
     
      }
    });


//nav
document.addEventListener('DOMContentLoaded', function () {

    // Get all "navbar-burger" elements
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach(function ($el) {
        $el.addEventListener('click', function () {
  
          // Get the target from the "data-target" attribute
          var target = $el.dataset.target;
          var $target = document.getElementById(target);
  
          // Toggle the class on both the "navbar-burger" and the "navbar-menu"
          $el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  
  });