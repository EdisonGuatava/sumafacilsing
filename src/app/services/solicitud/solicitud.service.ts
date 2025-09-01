import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
import { Clientes } from 'src/app/models/clientes.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor() { }


  app = initializeApp(environment.firebaseConfig);
  auth = getAuth();
  db = getFirestore(this.app);
  tabla = 'Solicitudes'

  async getsolicitud( ) {
    const q = collection(this.db, this.tabla)
    return  await getDocs(q).then(actions => actions.docs.map(a => {
      const data = a.data() as Clientes;
      const id = a.id;
      data._id = id;
      return { id, ...data };
    }))
  } 

 

  async buscardocumentostring(numero: string ) {
    const q = query(collection(this.db, this.tabla), where('identificacion', '==', numero))
    return  getDocs(q).then(actions => actions.docs.map(a => {
      const data = a.data() as Clientes;
      const id = a.id;
      data._id = id;
      return { id, ...data };
    }))
  }  
  
  async getclienteid(id: string ) {
    const docRef = doc(this.db, this.tabla, id);
    return  await getDoc(docRef).then(actions => {
      const data = actions.data() as Clientes;
      const id = actions.id;
      data._id = id;
      return { id, ...data };      
    })
  } 
  
 
  
    async setdocumento(docu: Clientes){
      return setDoc(doc(this.db, this.tabla, docu._id), docu );
    }
  
    async adddoc(docu: Clientes){
      return addDoc(collection(this.db, this.tabla,), docu );
    }
  
    async deletedoc(docu: Clientes){
      return deleteDoc(doc(this.db, this.tabla, docu._id) );
    }
}
