import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MyserviceService } from './../myservice.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail  } from "firebase/auth";
import { environment } from 'src/environments/environment.prod';
import {FormsModule, NgForm} from '@angular/forms';
import { SpinnerComponent } from '../shared/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './login.component.html',
  providers: [MyserviceService],
})
export class LoginComponent {
  emailreset: string;
  msg = '';
  constructor(
    private service: MyserviceService,
     private routes: Router,
     private spinner: NgxSpinnerService,) {}

 

  app = firebase.initializeApp(environment.firebaseConfig);
  auth = getAuth();

  ngOnInit(): void {
  }

  afte;

  loginform = true;
  recoverform = false;

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  showRecoverFormv() {
    this.loginform = true;
    this.recoverform = false;
  }

  check(uname: string, p: string) {
    // console.log('ingresamos');
    this.spinner.show();
    signInWithEmailAndPassword(this.auth, uname, p)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log('activamos', user);
        this.spinner.hide();
        localStorage.setItem('td', 'login');
        this.routes.navigate(['/starter']);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.spinner.hide();
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Error En Usuario o Contraseña',
          showConfirmButton: false,
          timer: 1500,
        });
      });

    // const output = this.service.checkusernameandpassword(uname, p);
    // if (output == true) {
    //   this.routes.navigate(['/starter']);
    // } else {
    //   this.msg = 'Invalid Username or Password';
    // }
  }

  registro() {
    this.routes.navigate(['/registro']);
  }

  onSubmit(f: NgForm) {
    // console.log(f.value);
    if (f.invalid) {
      // console.log('invalido');
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Debes Completar el Formulario',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      if (!f.value.email.includes('@')) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Formato Email Incorrecto',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        sendPasswordResetEmail(this.auth, f.value.email)
          .then(() => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se ha Enviado el Email',
              showConfirmButton: false,
              timer: 1500,
            });
            this.showRecoverFormv();

            // Password reset email sent!
            // ..
          })
          .catch((error) => {
            // console.log(error.code);
            const errorCode = error.code;
            const errorMessage = error.message;
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: errorCode,
              showConfirmButton: false,
              timer: 1500,
            });
            // ..
          });
      }
    }
  }
}
