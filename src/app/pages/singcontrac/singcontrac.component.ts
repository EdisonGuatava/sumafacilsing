import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxSpinnerService } from 'ngx-spinner';
import SignaturePad from 'signature_pad';
import { ApisolicitudService } from 'src/app/services/apisolicitud/apisolicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-singcontrac',
  standalone: true,
  imports: [PdfViewerModule],
  templateUrl: './singcontrac.component.html',
  styleUrl: './singcontrac.component.scss'
})
export class SingcontracComponent {


  @ViewChild("canvas", { static: true }) canvas: ElementRef;
  sig: SignaturePad;

  pdfSrc: Uint8Array;
  tempBlob: any;
  singfirm: boolean;
  id1:  string;
  cargapdf: boolean;

  constructor(
    private apicontrac: ApisolicitudService,
    private activateRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private routes: Router
  ) {
    activateRoute.params.subscribe((params) => {
      this.id1 = params['id'];
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    this.descargainfopara();
    // this.cargapdf = true;

  }

  descargainfopara(){
    // const id = 'WctxLdYBqFTaVh8f9uHt'
    // this.spinner.show();
      //  console.log(dat);
    this.apicontrac.apivalid(this.id1).subscribe((resp: any) => {
      // console.log(resp);
      if (resp.data === false ){
        this.sig = new SignaturePad(this.canvas.nativeElement);
      this.apicontrac.apicontrac(this.id1).subscribe(resp => {
            // console.log(resp);
            // this.spinner.hide();
            this.tempBlob = new Blob([resp], { type: 'application/pdf' });
            const fileReader = new FileReader();
            fileReader.onload = () => {
                this.pdfSrc = new Uint8Array(fileReader.result as ArrayBuffer);
            };
            fileReader.readAsArrayBuffer(this.tempBlob);
            this.spinner.hide();
          })
      }  else {
        this.routes.navigate(['/singfirmado']);
        this.spinner.hide();
      }

      //
    })

  }

  clear() {
    this.sig.clear();
    this.singfirm = false;
  }
  startSignPadDrawing(event: Event) {
    // console.log(event);
  }
  movedFinger(event: Event) {
    // console.log('movedFinger');
    this.singfirm =true;
  }

  enviarfirma(){


    const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger me-3"
  },
  buttonsStyling: false
});
swalWithBootstrapButtons.fire({
  title: "¿Autorizo Continuar con el Aval?",
  text: "¿Autorizo Continuar con el Aval?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "¡Deseo Continuar!",
  cancelButtonText: "No!",
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    swalWithBootstrapButtons.fire({
      title: "¡Autorizado!",
      text: "Debes Cumplir Con los Requisitos.",
      icon: "success"
    });
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire({
      title: "Proceso No Autorizado",
      // text: "El proceso no continuará.",
      icon: "info",
      html: `
            <p class="text-start">Para poder continuar con el aval, debes cumplir con los siguientes requisitos:</p>
            <ul class="text-start">
                <li>Fotocopia de la cédula del codeudor con propiedad raíz libre de hipoteca.</li>
                <li>Certificado de tradición vigente (máximo 30 días de expedición).</li>
                <li>Certificación laboral del codeudor solidario.</li>
                <li>Certificado de ingresos expedido por contador.</li>
                <li>Pagaré y carta de instrucciones diligenciados y notarizados (adjunto).</li>
            </ul>
        `,
        confirmButtonText: 'Entendido'
    });
  }
});

//Generemos


  // Swal.fire ({
  //     position: 'center',
  //     icon: 'success',
  //     title: 'Felicitaciones solo nos Falta el ultimo Paso Contrato Aval',
  //     showConfirmButton: false,
  //   });

    // this.routes.navigate(['/singcontracaval/' + this.id1]);


  //   this.spinner.show();
  //  if (this.singfirm === true ){
  //   // console.log('finaliza', this.sig.toDataURL());
  //   this.apicontrac.apicontracsing(this.id1, this.sig.toDataURL() ).subscribe(resp => {
  //     // console.log(resp);
  //     this.spinner.hide();
  //     this.routes.navigate(['/singfirmado']);
  //   });
  //  } else {
  //   this.spinner.hide();
  //   Swal.fire ({
  //     position: 'center',
  //     icon: 'error',
  //     title: 'No Se ha Firmado',
  //     showConfirmButton: false,
  //     timer: 1500
  //   });
  //  }
  }



}
