import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApisolicitudService {

  constructor(
    public http: HttpClient,
  ) { }



apicontrac(datos: string ) {
  // console.log(datos);
  const httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/pdf'
    })
  };
  const  body2 = {
    "id": datos
} 
  const urlbase = 'https://us-central1-zantoen-85d78.cloudfunctions.net/infmens/v1/contratopsm';
  // const urlcontex = 'proestadoadd';
  return this.http.post(urlbase, body2, {responseType : 'blob'} );
  // return this.http.post(urlbase, body2 );
  // return this.http.get( urlbase + urlcontex  );
}

apicontracsing(id: string, firma: string ) {
  // console.log(id);
  const httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/pdf'
    })
  };
  const  body2 = {
    "id": id,
    "sing": true,
    "firma": firma,
} 
  const urlbase = 'https://us-central1-zantoen-85d78.cloudfunctions.net/infmens/v1/contratosm';
  // const urlcontex = 'proestadoadd';
  return this.http.post(urlbase, body2 );
  // return this.http.get( urlbase + urlcontex  );
}

apivalid(datos: string ) {
  // console.log(datos);
  const httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/pdf'
    })
  };
  const  body2 = {
    "id": datos
} 
  const urlbase = 'https://us-central1-zantoen-85d78.cloudfunctions.net/infmens/v1/valid';
  // const urlcontex = 'proestadoadd';
  // return this.http.post(urlbase, body2, {responseType : 'blob'} );
  return this.http.post(urlbase, body2 );
  // return this.http.get( urlbase + urlcontex  );
}





}
