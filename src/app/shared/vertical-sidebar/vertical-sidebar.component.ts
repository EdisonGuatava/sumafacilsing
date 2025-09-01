import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RouteInfo } from './vertical-sidebar.metadata';
import { VerticalSidebarService } from './vertical-sidebar.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { options } from 'src/app/config';
import { Usuario } from 'src/app/models/usuario.model';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment.prod';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

@Component({
  selector: 'app-vertical-sidebar',
  standalone: true,
  imports: [TranslateModule, RouterModule, CommonModule, FeatherModule, NgbDropdownModule],
  templateUrl: './vertical-sidebar.component.html',
})

export class VerticalSidebarComponent {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: RouteInfo[] = [];
  path = '';

  themeOptions = options;

  @Input() showClass: boolean = false;
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleNotify() {
    this.notify.emit(!this.showClass);
  }

  user: Usuario;
  usuario = new Usuario (
    'cliente@tuadelanto.com',
    '',
    'Cliente'
  );

  tabla = 'Users';
  imagen: any;


  auth = getAuth();
  app = initializeApp(environment.firebaseConfig);
  db = getFirestore(this.app);

  constructor(
    private menuServise: VerticalSidebarService,
    private router: Router
  ) {
    this.menuServise.items.subscribe((menuItems) => {
      this.sidebarnavItems = menuItems;

      // Active menu
      this.sidebarnavItems.filter((m) =>
        m.submenu.filter((s) => {
          if (s.path === this.router.url) {
            this.path = m.title;
          }
        })
      );
      this.addExpandClass(this.path);
    });
  }

  ngOnInit(): void {
    this.uservalid();
  }
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  logaut(){
    signOut(this.auth).then(() => {
      localStorage.removeItem('zantoenon');
      this.router.navigate(['login']);
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  uservalid(){

    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.user = user;
          const q = query(collection(this.db, this.tabla), where("email", "==", this.user.email));
          const querySnapshot = await getDocs(q);
          // console.log(querySnapshot);
          if (querySnapshot.docs.length >= 1) {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              // console.log(doc.id, " => ", doc.data());
              const data = JSON.parse (JSON.stringify (doc.data()));
              this.usuario = data;
              this.imagen = this.usuario.img;
            });
  
          } else {
            this.usuario.name = user.displayName;

            // this.usuario.estado = true;
           
          }
          
          
      } else {
      }
    });
  }
}
