import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { NgxSpinnerService } from 'ngx-spinner';
import { Clientes } from 'src/app/models/clientes.model';
import { Usuario } from 'src/app/models/usuario.model';
import { SolicitudService } from 'src/app/services/solicitud/solicitud.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [ImageCropperComponent, FeatherModule],
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss'
})
export class SolicitudComponent {

  auth = getAuth();
  app = initializeApp(environment.firebaseConfig);
  db = getFirestore(this.app);

  imageChangedEvent: any = '';
  croppedImage: any = '';
  imagen: any = '';
  camimg: boolean = false;
  tabla = 'Users';

  usuario = new Usuario( '');
  newcliente = new Clientes('', '', '', '', null, '');
  campofoto: string;
  modalcerrar: any;
  filedoc: any;
  pdfSrc: any;
  campopdf: string;

  constructor(
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    private solicitudservice: SolicitudService,
    public router: Router,
  ) { }


  ngOnInit() {
    // this.locatison();
    this.spinner.show();
    this.uservalid();
  }

  subpdf(campo: string){
    // console.log(campo);
    this.campopdf = campo;
  }

fileChangeEvent1(event: any): void {
//  console.log('onevent', event);
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    let reader = new FileReader();
    // console.log(files[0]);
    this.filedoc = files[0];
    if (files[0].type === 'application/pdf'){
     let $img: any = document.querySelector('#file');
     if (typeof (FileReader) !== 'undefined') {
       let reader = new FileReader();    
       reader.onload = (e: any) => {
         this.pdfSrc = e.target.result;
        //  console.log('pdf', this.pdfSrc); 
       };
       reader.readAsArrayBuffer($img.files[0]);
     }      
      // console.log('pdf1', target); 
      this.subirarchivopdf(this.filedoc, this.campopdf );
    }
}

subirarchivopdf(file: any, campo:string){
  this.spinner.show();
  const storage = getStorage();
  const metadata = {
    contentType: file.type
};
const storageRef = ref(
  storage,
  'ClienteTa' +
    '/' +
    this.usuario.ident +
    '/' 
    + file.name
);
const uploadTask = uploadBytesResumable(storageRef, file, metadata);
// this.carga = true;
// this.buffer = 0.10;
uploadTask.on('state_changed',
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) ;
    // console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        // console.log('Upload is paused');
        break;
      case 'running':
        // console.log('Upload is running');
        break;
    }
  },
  (error) => {
    switch (error.code) {
      case 'storage/unauthorized':
        break;
      case 'storage/canceled':
        break;
      case 'storage/unknown':
        break;
    }
  },
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      this.spinner.hide();
      this.newcliente[campo] = downloadURL;
    });
  }
);
}

modalOpen(modalBasic: any, campo: string) {
  // console.log('auqi')
  this.modalcerrar =  this.modalService.open(modalBasic);
  this.campofoto = campo;
  this.imagen  = '';
}

fileChangeEvent(event: any): void {
  // console.log('onevent', event);
  // this.modalOpen('modalBasic');
  this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {
  this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
  // this.croppedImage = event.base64;
  this.imagen = event;
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

subirimg() {
  this.spinner.show();
  // console.log('llegamos');
  this.modalcerrar.close();
  // console.log(this.newcliente);
  // this.spinner.show();
  this.subirarchivo(this.campofoto);
}

subirarchivo(campo: string) {
  // const file = this.transformimg(this.imagen.changingThisBreaksApplicationSecurity);
  // console.log(this.imagen);
  const storage = getStorage();
  const namepicture = campo;
  const storageRef = ref(
    storage,
    'ClienteTa' +
      '/' +
      this.usuario.ident +
      '/' +
      namepicture +
      '.png'
  );
  uploadBytes(storageRef, this.imagen.blob).then((snapshot) => {
    // console.log('Uploaded a base64url string!');
    getDownloadURL(snapshot.ref).then((downloadURL) => {
      // console.log('File available at', downloadURL);

      this.spinner.hide();
      this.newcliente[campo] = downloadURL;
      // this.spinner.hide();
      // this.calccliente(this.newcliente);
    });
  });
}

uservalid() {
  onAuthStateChanged(this.auth, async (user) => {
    if (user) {
      // console.log(user);
      // this.user = user;
      // console.log(this.user);

      const q = query(
        collection(this.db, this.tabla),
        where('email', '==', user.email)
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
          this.newcliente.identificacion = this.usuario.ident;
          this.newcliente.nombre = this.usuario.name;          


        });
      } else {
        this.spinner.hide();
       
      }
    } else {
    }
  });
}



solicituden(){
  // console.log(this.newcliente );
  if (this.newcliente.imgdocfrontal !== undefined && 
    this.newcliente.imgdocposterior !== undefined 
    // &&
    // this.newcliente.imgservicios !== undefined &&
    // this.newcliente.imgcolilla !== undefined &&
    // this.newcliente.imgcartalab !== undefined 
  )
    {

    this.newcliente.Estado = 'Solicitud';
    this.newcliente.date = new Date().getTime();
    this.newcliente.labelestado = 'warning' ;
    this.newcliente.email = this.usuario.email;
    this.newcliente.nombres = this.usuario.name;
    this.newcliente.telefono = this.usuario.phone;
    this.newcliente.telefonowhat = '+57' + this.usuario.whatapps.toString();
    const datomov = JSON.parse (JSON.stringify (this.newcliente));
    this.solicitudservice.adddoc(datomov).then(reps => {
      Swal.fire ({
        position: 'center',
        icon: 'success',
         title: 'Gracias en Confiar en Nosotros Analizaremos tu Credito te enviaremos estado a tu Correo',
        showConfirmButton: false,
        timer: 3000 
      });
            this.router.navigate(['/starter']);
    })


  } else {
    Swal.fire ({
      position: 'center',
      icon: 'error',
       title: 'Debe Completar la Informacion',
      showConfirmButton: false,
      timer: 3000 
    });
  }

    // imgdocfrontal
    // imgdocposterior
    // imgservicios
    // imgcolilla
    // imgcartalab

 
}

}
