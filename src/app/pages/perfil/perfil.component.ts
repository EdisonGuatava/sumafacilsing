import { Component, NgZone, ViewChild } from '@angular/core';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadString,
  uploadBytes,
} from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { environment } from 'src/environments/environment.prod';
import { LocationMap } from 'src/app/models/googlemaps/location.model';
import { Market } from 'src/app/models/googlemaps/market.model';
import { Usuario } from 'src/app/models/usuario.model';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbAlertModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ImageCroppedEvent,
  ImageCropperComponent,
  LoadedImage,
} from 'ngx-image-cropper';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { GoogleMap, GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ImageCropperComponent,
    CommonModule,
    FeatherModule,
    GoogleMapsModule,
    NgbAlertModule
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent {
  auth = getAuth();
  app = initializeApp(environment.firebaseConfig);
  db = getFirestore(this.app);
  perfil: boolean = false;
  plazo: number;
  user: any;
  geocoder: any;
  directions: any;
  directionsDisplay: any;
  marcador: any;
  traffico: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imagen: any = '';
  imagenon: any = '';
  mapinsta: any;
  camimg: boolean = false;
  viewmap: boolean = false;

  public location: google.maps.LatLngLiteral  = {lat: 3.436091, lng: -76.518916};
  markerOptions: google.maps.MarkerOptions = {draggable: true,  animation: google.maps.Animation.BOUNCE};
  zoom = 6;


  market: Market = new Market(0, 0, true);

  usuario = new Usuario('');

  tabla = 'Users';

  @ViewChild('f', { static: true }) floatingLabelForm: NgForm =
    Object.create(null);
  @ViewChild('vform', { static: true }) validationForm: FormGroup =
    Object.create(null);
  regularForm: FormGroup = Object.create(null);
  radioOptions = ['Choose this', 'Choose me'];

  config = { mimeType: 'video/webm' };
  globalStream = null;

  constructor(
    public router: Router,
    public activateRoute: ActivatedRoute,
    public http: HttpClient,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
  ) {
    
  }

  ngOnInit() {
    // this.locatison();
    this.spinner.show();
    this.uservalid();
    this.regularForm = new FormGroup(
      {
        inputnombre: new FormControl(null, [Validators.required]),
        identidad: new FormControl(null, [Validators.required]),
        expe: new FormControl(null, [Validators.required]),
        direccion: new FormControl(null, [Validators.required]),
        whatapps: new FormControl(null, [Validators.required]),
        ciudad: new FormControl(null, [Validators.required]),
      },
      { updateOn: 'blur' }
    );
    this.regularForm;
    // this.regularForm.get('inputnombre')?.enable();
    // this.regularForm.get('inputnombre')?.disable();
  }

  onReactiveFormSubmit() {
    // console.log();
    this.regularForm.reset();
  }
  onTemplateFormSubmit() {
    this.floatingLabelForm.reset();
  }
  onCustomFormSubmit() {
    this.validationForm.reset();
  }

  uservalid() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        // console.log(user);
        this.user = user;
        // console.log(this.user);

        const q = query(
          collection(this.db, this.tabla),
          where('email', '==', this.user.email)
        );
        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot);
        if (querySnapshot.docs.length >= 1) {
          this.spinner.hide();
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, ' => ', doc.data());
            const data = JSON.parse(JSON.stringify(doc.data()));
            this.usuario = data;
            this.imagen = this.usuario.img;
            this.perfil = true;
            this.location.lat = this.usuario.dirlat;
            this.location.lng = this.usuario.dirlng;
            // this.location.zoom = 15;
            this.regularForm.get('identidad')?.disable();
            // const data = JSON.parse (JSON.stringify (this.usuario));
          });
        } else {
          this.spinner.hide();
          this.usuario.name = user.displayName;
          this.usuario.estado = false;
          this.perfil = true;
          this.usuario.img = '';
        }
      } else {
      }
    });
  }

  // locatison() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const pos = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       };
  //       this.usuario.lat = pos.lat;
  //       this.usuario.lng = pos.lng;
  //     });
  //   } else {
  //   }
  // }

  fotoimagen() {
    navigator.mediaDevices.getUserMedia({
      video: true,
    });
    this.disposi();
  }

  async disposi() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    // console.log(devices);
  }

  modalOpen(modalBasic: any) {
    this.modalService.open(modalBasic);
  }

  fileChangeEvent(event: any): void {
    // console.log('onevent', event);
    this.modalOpen;
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    // this.croppedImage = event.base64;
    this.imagen = this.croppedImage;
    this.imagenon = event;
    this.usuario.img = '1';

    // console.log(event);
    // this.usuario.img = this.imagen;
    this.camimg = true;
  }
  imageLoaded() {
    // console.log(image)
  }
  cropperReady() {
    // console.log('ready');
  }
  loadImageFailed() {
    // console.log('ImageFailed');
  }



  validarinfo() {
    // console.log(f.value); // { first: '', last: '' }
    // console.log(f.valid); // false
    this.spinner.show();
    if (this.usuario.estado === true) {
      // console.log('editar');
      this.perfileditar();
    } else {
      if (this.usuario.busdir === true) {
        if (this.usuario.img !== '' ) {
          this.usuario.email = this.user.email;
          this.usuario.nameuser = this.user.displayName;
          this.usuario.phone = this.user.phoneNumber;
          // this.usuario.name = f.value.inputnombre;
          // this.usuario.adress = f.value.direccion;
          // this.usuario.datenaci = f.value.expe;
          // this.usuario.ident = f.value.identidad;
          // this.usuario.img = this.imagen;
          this.usuario.estado = true;
          const storage = getStorage();
          const storageRef = ref(
            storage,
            'usuarios/' + this.usuario.ident + '/' + 'selfie'
          );
          uploadBytes(storageRef, this.imagenon.blob).then((snapshot) => {
            // console.log('Uploaded a base64url string!');
            getDownloadURL(snapshot.ref).then((downloadURL) => {
              // console.log('File available at', downloadURL);
              this.usuario.img = downloadURL;
              // console.log(this.usuario);
              const data = JSON.parse(JSON.stringify(this.usuario));
              setDoc(doc(this.db, 'Users', this.usuario.ident.toString()), data)
                .then((resp) => {
                  this.spinner.hide();
                  // console.log(resp);
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se ha Guardado Correctamente',
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  this.router.navigate(['starter']);
                })
                .catch((error) => {
                  this.spinner.hide();
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error Al Guardar',
                    showConfirmButton: false,
                    timer: 1500,
                  });
                });
            });
          });
        } else {
          this.spinner.hide();
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: '¡Imagen No Valida!',
            text: 'Por favor Complete el Campo selfie Dondo Click Sobre la Imagen',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        this.spinner.hide();
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: '¡Direccion No Valida Debe Ubicar en el Mapa dale Click Boton Ubicar!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }

  perfileditar() {
    this.usuario.email = this.user.email;
    this.usuario.nameuser = this.user.displayName;
    this.usuario.phone = this.user.phoneNumber;
    // this.usuario.name = f.value.inputnombre;
    // this.usuario.adress = f.value.direccion;
    // this.usuario.datenaci = f.value.expe;
    this.usuario.estado = true;
    if (this.camimg === true) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        'ClienteTa' +
        '/' +
        this.usuario.ident +
        '/' +
        'selfie.png'
      );
      uploadBytes(storageRef, this.imagenon.blob).then((snapshot) => {
        // console.log('Uploaded a base64url string!');
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          // console.log('File available at', downloadURL);
          this.usuario.img = downloadURL;
          // console.log(this.usuario);
          const data = JSON.parse(JSON.stringify(this.usuario));
          setDoc(doc(this.db, 'Users', this.usuario.ident.toString()), data)
            .then((resp) => {
              this.spinner.hide();
              // console.log(resp);
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se ha Editado Correctamente',
                showConfirmButton: false,
                timer: 1500,
              });
              this.router.navigate(['starter']);
            })
            .catch((error) => {
              this.spinner.hide();
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error Al Guardar',
                showConfirmButton: false,
                timer: 1500,
              });
            });
        });
      });
    } else {
      this.usuario.email = this.user.email;
      this.usuario.nameuser = this.user.displayName;
      this.usuario.phone = this.user.phoneNumber;
      // this.usuario.name = f.value.inputnombre;
      // this.usuario.adress = f.value.direccion;
      // this.usuario.datenaci = f.value.expe;
      this.usuario.estado = true;
      const data = JSON.parse(JSON.stringify(this.usuario));
      setDoc(doc(this.db, 'Users', this.usuario.ident.toString()), data)
        .then((resp) => {
          this.spinner.hide();
          // console.log(resp);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se ha Editado Correctamente',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['starter']);
        })
        .catch((error) => {
          this.spinner.hide();
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error Al Guardar',
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  }



  findireccion(address: string, ciudad: string) {
    // console.log(address, ciudad);
    this.geocoder = new google.maps.Geocoder();
    this.geocoder.geocode(
      {
        address: address + ', ' + ciudad,
      },
      (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          // console.log(results[0]);
          this.spinner.hide();
          if (results[0].geometry.location) {
            // this.location.lat = results[0].geometry.location.lat();
            // this.location.lng = results[0].geometry.location.lng();
            this.market.lat = results[0].geometry.location.lat();
            this.market.lng = results[0].geometry.location.lng();
            this.location = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            };
           this.zoom = 15;
            // this.location.viewport = results[0].geometry.viewport;
            // this.location.zoom = 18;
            this.usuario.dirlat = this.location.lat;
            this.usuario.dirlng = this.location.lng;
            this.usuario.busdir = true;
            this.viewmap = true;
            this.usuario.direcciono = results[0];
          }
        } else {
          this.spinner.hide();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Lo Sentimos No Tenemos Resultados..',
          });
        }
      }
    );
  }

  async validarpermiso(address: string , ciudad: string) {
    this.spinner.show();
    const ua = navigator.userAgent;
    // console.log(ua);
    // this.spinner.show();
    const ipAPI = "//api.ipify.org?format=json";
    const response = await fetch(ipAPI);
    const data = await response.json();
    const inputValue = data.ip;
    // console.log(data);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.usuario.lat = position.coords.latitude;
          this.usuario.lng = position.coords.longitude;
          this.usuario.ipconex = inputValue;
          this.usuario.device = ua;
          // this.location = new google.maps.LatLngLiteral = {lat: 0, lng: 0};
          // this.location.lat =  pos.lat;
          // this.location.lng =  pos.lng; 
          // this.location = {
          //   lat: position.coords.latitude,
          //   lng: position.coords.longitude,
          // };
          this.findireccion(address, ciudad);

          // console.log('logs', this.usuario);
          // this.log.iduser = this.usuario._id;
          // this.log.date = new Date().getTime();
          // this.log.tipo = 'Login';
          // this.log.user = this.usuario.email;
          // this.log.dispositivo = ua;
          // this.log.lat = position.coords.latitude;
          // this.log.lng = position.coords.longitude;
          // this.log.ip = inputValue;
          // const dataa = JSON.parse (JSON.stringify (this.log));
          // this.logsservice.adddoc(dataa).then(resp => {
          // })
        }, e => {
          // console.log(e);
          if (e.PERMISSION_DENIED){
            this.spinner.hide();
            
            Swal.fire({
              title: "Para Registrarte Debes Aceptar el permiso Lo encuentra en la parte Superior izquierda'",
              // showDenyButton: true,
              // showCancelButton: true,
              confirmButtonText: "Habilitado",
              // denyButtonText: `Don't save`,
              toast: true,
              width: 1024,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                // Swal.fire("Saved!", "", "success");
        
                location.reload();
              } else if (result.isDenied) {
                // Swal.fire("Changes are not saved", "", "info");
              }
            });
         
          }

       });
    } else {
    }
}


  // validarpermiso(address: String) {
  //   navigator.permissions.query({ name: 'geolocation' }).then((result) => {
  //     console.log(result);
  //     if (result.state === 'granted') {
  //       console.log('granted');
  //       this.findireccion(address);
  //     } else if (result.state === 'prompt') {
  //       console.log('prompt');
  //       this.findireccion(address);
  //     } else {
  //       console.log('denegado');
  //       this.locatison();
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'warning',
  //         title: 'Para Registrarte Debes Aceptar el permiso',
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //     }
  //   });
  // }

  regresar() {
    this.router.navigate(['starter']);
  }


  direccion(event: any ){
    // console.log(event.latLng);
    // console.log(event.latLng.lat());
    this.usuario.dirlat = event.latLng.lat();
    this.usuario.dirlng = event.latLng.lng();


  }


}
