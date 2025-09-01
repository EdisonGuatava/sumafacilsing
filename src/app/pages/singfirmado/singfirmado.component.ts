import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-singfirmado',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './singfirmado.component.html',
  styleUrl: './singfirmado.component.scss'
})
export class SingfirmadoComponent implements OnInit {

  fecha: number
  constructor(
    private routes: Router
  ) {}

  ngOnInit(): void {
    this.fecha = moment().unix() * 1000;
  }


  inicio(){
    this.routes.navigate(['/login']);
  }



}


