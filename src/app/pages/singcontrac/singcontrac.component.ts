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


  Swal.fire ({
      position: 'center',
      icon: 'success',
      title: 'Felicitaciones solo nos Falta el ultimo Paso',
      showConfirmButton: false,
      timer: 1500
    });

    this.routes.navigate(['/singcontracaval/' + this.id1]);


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
