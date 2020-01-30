import { Injectable } from '@angular/core';
import { Usuario } from '../entidades/usuario';

@Injectable({
  providedIn: 'root'
})
export class AlmacenUsuariosService {

  private listaUsuarios: Usuario[];

  constructor() {

    this.cargarListaLocalStrg();
    if (this.listaUsuarios == null || typeof this.listaUsuarios === "undefined"){
      this.listaUsuarios = [];
    }
  }

  insertar(usuario: Usuario){

      let siYaExiste = false; //presuponemos que no existe

      for (let usu of this.listaUsuarios){ // Buscamos en todo el array
        if (usu.email === usuario.email){ //Y si ya existe el mail
          siYaExiste = true;               //Marcamos que ya existe
          break;                           // y no hace falta seguir buscandio, por eso ponemos un break
        }

      }
      if (siYaExiste){
          alert("El email ya existe " + usuario.email);
      } else{
          //let clonUsu = usuario.clon);
          this.listaUsuarios.push(usuario);
          this.guardarListaLocalStrg();
          //break;
      }

   }
  guardarListaLocalStrg(){
    let textoJsonUsuarios = JSON.stringify(this.listaUsuarios);
    //Guardamos en la cache del ordenador ese string
    //dandole un nmbre (clave/key): listaUsuarios
    window.localStorage.setItem("listaUsuarios", textoJsonUsuarios);
    //Es decir, SERIALIZAR y guardar
   }
  cargarListaLocalStrg(){
     //Leer el JSON del almacen localStorage(se persiste en el navegador aunque cierre el navegador)
     let textoJsonUsuarios = window.localStorage.getItem("listaUsuarios");
     //Convertimos el JSON en un objeto de JS, es decir :DESSERIALIZAR
     this.listaUsuarios = JSON.parse(textoJsonUsuarios);
   }
  getListaUsuarios(){
     return this.listaUsuarios;
   }
   // Este metodo se puede usar en cualquier parte
  eliminarUsuario(posicionUsu: number){
    this.listaUsuarios.splice(posicionUsu, 1);
    this.guardarListaLocalStrg();
    return true;

   }
   editarUsuario(){
    this.guardarListaLocalStrg();
    return true;

   }


}
