import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';
import { getAuth, sendEmailVerification, signOut, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registroemail',
  standalone: true,
  imports: [FormsModule, FeatherModule , PdfViewerModule],
  templateUrl: './registroemail.component.html',
  styleUrl: './registroemail.component.scss'
})
export class RegistroemailComponent {

  app = firebase.initializeApp(environment.firebaseConfig);
  auth = getAuth();

  nombre: string;
  email: string;
  contrasena: string;
  pdfSrc: string;
  pdfSrcp: string;


  condiciones: boolean;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
     
  ) { }

  ngOnInit(): void {
    this.condiciones = false;
  }

  onSubmit(f: any) {
    this.spinner.show();
    // console.log(f.value);
    if (f.invalid){
      this.spinner.hide();
      // console.log('invalido');
      Swal.fire ({
      position: 'center',
      icon: 'error',
      title: 'Debes Completar el Formulario',
      showConfirmButton: false,
      timer: 1500
    });

    }else {
      // console.log(f.value.nombre);
       if (f.value.nombre.length <= 5 ){
        this.spinner.hide();
        Swal.fire ({
          position: 'center',
          icon: 'error',
          title: 'Nombre Corto',
          showConfirmButton: false,
          timer: 1500
        });
       } else {
        if (!(f.value.email.includes('@')) ){
          this.spinner.hide();
          Swal.fire ({
            position: 'center',
            icon: 'error',
            title: 'Formato Email Incorrecto',
            showConfirmButton: false,
            timer: 1500
          });
          } else {
            this.spinner.hide();
            if (f.value.password1.length <= 5 ){
              Swal.fire ({
                position: 'center',
                icon: 'error',
                title: 'La Contraseña debe Contener minimo 6 caracteres',
                showConfirmButton: false,
                timer: 1500
              });

            } else {  
              this.spinner.hide();
              if (f.value.password1 !== f.value.password2 ){
                Swal.fire ({
                  position: 'center',
                  icon: 'error',
                  title: 'La Contraseña no son validas',
                  showConfirmButton: false,
                  timer: 1500
                });


              } else {
                  if (this.condiciones === true ){
                    this.spinner.hide();
                    Swal.fire({
                      icon: 'success',
                      title: 'Felicitaciones falta Poco enviaremos un correo de confirmacion a tu cuenta  ' + f.value.email,
                      showDenyButton: true,
                      showCancelButton: true,
                      confirmButtonText: 'Enviar',
                      // denyButtonText: `Don't save`,
                    }).then((result) => {
                      /* Read more about isConfirmed, isDenied below */
                      if (result.isConfirmed) {
                        Swal.fire('Enviado!', '', 'success')
                        this.nombre = f.value.nombre;
                        this.email = f.value.email;
                        this.contrasena = f.value.password1;
                        this.registrofi();
                      } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                      }
                    })

                  } else {
                    this.spinner.hide();
                    Swal.fire ({
                      position: 'center',
                      icon: 'warning',
                      title: 'Para nosotros es importante que aceptes las condiciones',
                      showConfirmButton: false,
                      timer: 1500
                    });
                  }
              }
            }
          }
    }
}

}


checkValue(event: any){
  // console.log(event.srcElement.id, event );
  // console.log(event.srcElement.checked );
  this.condiciones = event.srcElement.checked;
}

terminos(modalBasic: any){ //this.router.navigateByUrl("https://www.google.com"); window.location.href="https://www.google.com"; }
this.modalService.open(modalBasic);
    this.pdfSrcp = "../../../assets/document/privacidadta.pdf"
  // window.location.href="https://firebasestorage.googleapis.com/v0/b/zantoenonline.appspot.com/o/documentos%2FBORRADOR%204.%20ZANTOEN%20-TERMINOS%20Y%20CONDICIONES.pdf?alt=media&token=23944706-adc0-4270-a822-6eb0efbf5310";  
}

politica(modalBasic: any){
  // window.location.href="https://firebasestorage.googleapis.com/v0/b/zantoenonline.appspot.com/o/documentos%2FBORRADOR%204.%20ZANTOEN%20-POLITICA%20DE%20TRATAMIENTO.pdf?alt=media&token=88f0fd5c-c940-471b-a26e-388d383dc57c";  
    this.modalService.open(modalBasic);
    this.pdfSrc = "../../../assets/document/PoliticasPyTD.pdf"
}


registrofi(){
  this.spinner.show();
  updateProfile(this.auth.currentUser, {
    displayName: this.nombre
  }).then(() => {
    // console.log('ok');
    this.cambioemaial();
    // Profile updated!
    // ...
  }).catch((error) => {
    this.spinner.hide();
    // console.log('error');
    // An error occurred
    // ...
  });
}

cambioemaial(){
  updateEmail(this.auth.currentUser, this.email).then(() => {
    // console.log('Emailcambio')
    this.enviamosemail();
    // Email updated!
    // ...
  }).catch((error) => {
    this.spinner.show();
    console.error(error);
    Swal.fire ({
      position: 'center',
      icon: 'warning',
      title: 'Debes Volver a registrarte',
      showConfirmButton: false,
      timer: 1500
    });
    this.router.navigate(['registro']);

    });
}


// const auth = getAuth();
// sendEmailVerification(auth.currentUser)
//   .then(() => {
//     // Email verification sent!
//     // ...
//   });

enviamosemail(){
  
  sendEmailVerification(this.auth.currentUser)
  .then(() => {
    // console.log('emailenviado');
    this.crearpass();
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    this.spinner.hide();
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

}

crearpass(){
const auth = getAuth();
const user = auth.currentUser;
// console.log(user);

updatePassword(user, this.contrasena).then(() => {
  // console.log('secreo la cuenta');
  this.spinner.hide();
  // Update successful.
  this.router.navigate(['starter']);


}).catch((error) => {
  this.spinner.hide();
  // console.log(error)
  Swal.fire ({
    position: 'center',
    icon: 'warning',
    title: 'Debes Volver a registrarte',
    showConfirmButton: false,
    timer: 1500
  });
  this.router.navigate(['registro']);
});
}

cancelar(){
  signOut(this.auth).then(() => {
    localStorage.removeItem('zantoenon');
    this.router.navigate(['login']);
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}

ayuda(){
  window.open('https://wa.me/573175170235?text=Solicito%20Ayuda%20Registro', '_blank');
}

}



