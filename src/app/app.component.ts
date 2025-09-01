import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { NgxSpinnerModule } from 'ngx-spinner';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerModule,],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Tu aDelanto';

  app = firebase.initializeApp(environment.firebaseConfig);
  auth = getAuth();

  constructor (
    // private swUpdate: SwUpdate,
    private routes: Router
  ) {}

  ngOnInit(): void {
    // this.updatePWA();
    onAuthStateChanged(this.auth, (user) => {
      // if (user) {
      //   // User is signed in, see docs for a list of available properties
      //   // https://firebase.google.com/docs/reference/js/firebase.User
      //   // console.log(user);
      //   const uid = user.uid;
      //   // console.log(user);
      //   // console.log()
      //   if ( user.email !== null ){
      //     localStorage.setItem('td', 'login');
      //     this.routes.navigate(['/starter']);
      //   }  else {
      //     this.routes.navigate(['/registroemail']);
      //   }
      //   // ...
      // } else {
      //   // this.routes.navigate(['/login']);
      //   // User is signed out
      //   // ...
      // }
    });
  }

  // updatePWA() {
  //   this.swUpdate.available.subscribe( value => {
  //     console.log('update:', value);
  //     window.location.reload();
  //   });
  // }

}
