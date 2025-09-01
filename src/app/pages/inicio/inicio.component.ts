import { Component } from '@angular/core';
import { NgbAlertModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { CurrencyPipe } from '@angular/common';
import {MatSliderModule} from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [NgbAlertModule, FeatherModule, CurrencyPipe, MatSliderModule, FormsModule, NgbPopoverModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

  user: Usuario;
  usuario = new Usuario (
    'cliente@zantoen.com',
    '',
    'Cliente'
  );

  auth = getAuth();
  app = initializeApp(environment.firebaseConfig);
  db = getFirestore(this.app);

  subtitle: string;
  emailVerified: boolean = false;
  perfil: boolean = true;


  plazo: number;


  monto: number;
  aval: number;
  desembolso: number;
  iva: number;
  totalcargos: number;
  totalapagar: number;
  interes: number;
  interespa: number;
   tabla = 'Users';
   tasaea: number = 26.85;

   solicitudesv: boolean = false;




  constructor(
    private routes: Router
  ) {}

  
  ngOnInit(): void {
    this.usuario.nameuser = 'Tuadelanto';
    this.uservalid();
    this.monto = 50000;
    this.aval = 0;
    this.desembolso = 0;
    this.iva = 0;
    this.totalcargos = 0;
    this.totalapagar = 0;
    this.plazo = 15;
    this.interes = 0;
    this.interespa = 1.877;
    this.interespa = Math.pow(1 + this.tasaea / 100, 1 / 365) - 1;
    // console.log(this.interespa);
    this.calculosini();
  
  }

  ngAfterViewInit() {
    this.uservalid();
  }

  reload(){
    location.reload();
  }

  uservalid(){
    this.emailVerified = true;
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // console.log(user);
        this.emailVerified = user.emailVerified;
        // this.usuario = user;
        // console.log('starter' , this.usuario);
        
        const q = query(collection(this.db, this.tabla), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot);
        if (querySnapshot.docs.length >= 1) {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const data = JSON.parse (JSON.stringify (doc.data()));
            this.usuario = data;
            this.perfil = false;
            this.solicitudes();
            // this.imagen = this.usuario.img;
          });


        } else {
          this.usuario.nameuser = user.displayName;
           this.perfil = true;
        }


        // ...
      } else {
        // User is signed out
        // ...
      }
      // location.reload();
    });
  }


  async solicitudes(){
    const q = query(collection(this.db, 'Solicitudes'), where("identificacion", "==", this.usuario.ident));
    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot);
    if (querySnapshot.docs.length >= 1) {
      this.solicitudesv = true;
    }
  }

  onChange(){
    // console.log(this.monto);
    this.calculos();
  }

  onChange1(){
    // console.log(this.plazo);
    this.calculos();
  }

  calculosini (){
    this.interes = Math.round( this.monto * this.interespa * this.plazo);
    // this.desembolso = (this.monto * 0.10);
    // this.iva = (this.desembolso * 0.19);
    this.aval = (this.monto * 0.20)  - this.interes ;
    this.totalcargos = this.interes  + this.aval;
    this.totalapagar = this.totalcargos + this.monto ;
  }


  calculos (){
    this.interes = Math.round( this.monto * this.interespa * this.plazo);
    // this.desembolso = (this.monto * 0.10);
    // this.iva = (this.desembolso * 0.19);
    this.aval = (this.monto * 0.20)  - this.interes ;
    this.totalcargos = this.interes  + this.aval;
    this.totalapagar = this.totalcargos + this.monto ;
  }

  perfilli(){
    this.routes.navigate(['/perfil']);
  }

  soli(){
    if ( this.perfil === true) {
      Swal.fire ({
        position: 'center',
        icon: 'success',
        title: 'Debes Completar El Perfil',
        showConfirmButton: false,
        timer: 1500 
      });
      this.routes.navigate(['/perfil']);
    } else {
      this.routes.navigate(['/solicitud']);
    }
  }


  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

}


