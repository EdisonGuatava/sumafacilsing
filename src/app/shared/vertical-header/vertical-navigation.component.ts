import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, EventEmitter, Output, inject, TemplateRef } from '@angular/core';
import {
  NgbModal,
  NgbDropdownModule,
  NgbAccordionModule,
  NgbCarouselModule,
  NgbDatepickerModule,
  NgbOffcanvas,
  OffcanvasDismissReasons 
} from '@ng-bootstrap/ng-bootstrap';

import { TranslateService } from '@ngx-translate/core';
import { FeatherModule } from 'angular-feather';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { Router, RouterModule } from '@angular/router';
import { options } from 'src/app/config';
import { initializeApp } from 'firebase/app';
import { Usuario } from 'src/app/models/usuario.model';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { environment } from 'src/environments/environment.prod';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

declare var $: any;

@Component({
  selector: 'app-vertical-navigation',
  standalone: true,
  imports: [
    NgbDropdownModule,
    CommonModule,
    FeatherModule,
    NgbAccordionModule,
    NgbCarouselModule,
    NgbDatepickerModule,
    NgScrollbarModule, RouterModule
  ],
  templateUrl: './vertical-navigation.component.html',
})
export class VerticalNavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  themeOptions = options;

  openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end' });
	}

  private offcanvasService = inject(NgbOffcanvas);
	closeResult = '';

  public showSearch = false;

  items = ['Apps'];

  // This is for Notifications
 

  // This is for Mymessages


  public selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us',
  };

  public languages: any[] = [
    {
      language: 'English',
      code: 'en',
      type: 'US',
      icon: 'us',
    },
    {
      language: 'Español',
      code: 'es',
      icon: 'es',
    },
    {
      language: 'Français',
      code: 'fr',
      icon: 'fr',
    },
    {
      language: 'German',
      code: 'de',
      icon: 'de',
    },
  ];

  

  user: Usuario;
  usuario = new Usuario (
    'cliente@zantoen.com',
    '',
    'Cliente'
  );

  auth = getAuth();
  app = initializeApp(environment.firebaseConfig);
  db = getFirestore(this.app);

  tabla = 'Users';
  imagen: any;

  constructor(
    private modalService: NgbModal,
    private translate: TranslateService,
    private router: Router
  ) {
    translate.setDefaultLang('es');
  }

  ngOnInit(): void {
    this.uservalid();
  }
  ngAfterViewInit() { }

  changeLanguage(lang: any) {
    this.translate.use(lang.code);
    this.selectedLanguage = lang;
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
            this.usuario.email = user.email;
            // this.usuario.estado = true;           
          }         
          
      } else {
      }
    });
  }
}
