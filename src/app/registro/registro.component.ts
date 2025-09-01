import { Component } from '@angular/core';
import { NgxOtpInputComponent, NgxOtpInputComponentOptions } from 'ngx-otp-input';
import firebase from 'firebase/compat/app';
import { environment } from 'src/environments/environment.prod';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, reauthenticateWithCredential } from 'firebase/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { WindowService } from '../services/window/window.service';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input-gg';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule, NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [NgxOtpInputComponent, NgxIntlTelInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {

  app = firebase.initializeApp(environment.firebaseConfig);
  auth = getAuth();

  validar: boolean | undefined ;
  conti: boolean | undefined;
  numero: string | undefined;
  segundos: number ;
  numero1: string | undefined;
  numero2: string | undefined;
  windowRef: any;
  itemayuda: boolean = false;

  otpInputConfig: NgxOtpInputComponentOptions = {
    otpLength: 6,
    autoFocus: true,
    hideInputValues: false,
    showBlinkingCursor: true,
    // classList: {
    //   inputBox: 'my-super-box-class',
    //   input: 'my-super-class',
    //   inputFilled: 'my-super-filled-class',
    //   inputDisabled: 'my-super-disable-class',
    //   inputSuccess: 'my-super-success-class',
    //   inputError: 'my-super-error-class',
    // },
  };

  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
	});

	changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}
  constructor(
    private router: Router,
    public win: WindowService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.validar = true;
    this.conti = false;

    //  this.validar = true;
    this.segundos = 120;
    // this.auth.languageCode = 'it';
    this.windowRef = this.win.windowRef;

    // this.windowRef.recaptchaVerifier = new RecaptchaVerifier( 'sign-in-button', {
    //   'size': 'invisible',
    //   'callback': (response) => {
    //     // reCAPTCHA solved, allow signInWithPhoneNumber.
    //     // onSignInSubmit();
    //   }
    // }, this.auth);
  
    this.windowRef.recaptchaVerifier = new RecaptchaVerifier(this.auth ,'recaptcha-container', {
      size: 'invisible',
      callback: (resp) => {
        // console.log('recath', resp);

      }
    });
  }

  

  countrySelected(log: any){
    // console.log(log);
  }



  getNumber(event: string ){
    this.numero = event;
    // console.log('getnumber',this.numero);
    this.numero1  = this.numero.substring(0, 4);
    this.numero2 = this.numero.substring(9, 13);
    this.segun();
    this.sendLoginCode(this.numero);

  }
  telInputObject(event: any){
    // console.log(event);
  }
  onCountryChange(event: any){
    // console.log(event);

    // this.alerta('Cambio de Pais');
  }

  valid(){

  }


  handeOtpChange(value: string[]): void {
    // console.log('change', value);
  }

  handleFillEvent(value: string): void {
    // console.log('validar', value);
    this.verificarsms(value);
    this.spinner.show();
    // this.router.navigate(['registro']);
  }

segun() {
  setInterval(() => {
    if (this.segundos >= 1) {
      this.segundos--;
    } else {
      this.itemayuda = true;
    }
  }, 1000);
}

sendLoginCode(numero: string) {
  // const auth = getAuth();
  this.numero1  = numero.substring(0, 4);
  this.numero2 = numero.substring(9, 13);
  this.segun();
// console.log('numero', numero );
const appVerifier = this.windowRef.recaptchaVerifier;
// console.log(appVerifier);
signInWithPhoneNumber(this.auth, numero, appVerifier)
    .then((confirmationResult) => {
      this.spinner.hide();
      // console.log('enviado',confirmationResult);
      this.validar = false;
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      this.windowRef.confirmationResult = confirmationResult;
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
      this.spinner.hide();
      // console.log('noenviado', error);
    });
}


verificarsms(code: string) {
  // const code = getCodeFromUserInput();
  this.windowRef.confirmationResult.confirm(code).then((result: any) => {
    this.spinner.hide();
  // User signed in successfully.
  const user = result.user;
  // console.log(result);
  this.router.navigate(['registroemail']);
  // ...
}).catch((error: any) => {
  this.spinner.hide();
  // console.log(error);
  Swal.fire ({
    position: 'center',
     icon: 'warning',
      title: 'Su Codigo es Incorrecto Intente Nuevamente',
  showConfirmButton: false,
  timer: 1500
});

  // this.alerta('Su Codigo es Incorrecto Intente Nuevamente');
  this.validar = true;
  // User couldn't sign in (bad verification code?)
  // ...
});
}


validarphone(){
  this.spinner.show();
  // console.log(this.phoneForm);
  if ( this.phoneForm.invalid === false ){
    const number = this.phoneForm.value.phone.e164Number;
    this.sendLoginCode(number);
  }   else {
    Swal.fire ({
      position: 'center',
       icon: 'warning',
        title: 'Numero Incorrecto',
    showConfirmButton: false,
    timer: 1500
  });
  }


// validarphone(){
}
// }

ayuda(){
  window.open('https://wa.me/573175170235?text=Solicito%20Ayuda%20Registro', '_blank');
}

}
