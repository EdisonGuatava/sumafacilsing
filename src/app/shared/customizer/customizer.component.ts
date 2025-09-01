import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbCollapseModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbarModule } from 'ngx-scrollbar';
declare var $: any;
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { options } from 'src/app/config';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'app-customizer',
  standalone: true,
  imports: [
    RouterModule,
    NgScrollbarModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbCollapseModule,
    TablerIconsModule,
    NgbTooltipModule,
    FeatherModule,
  ],
  templateUrl: './customizer.component.html',
})
export class CustomizerComponent {
  active = 1;

  themeOptions = options;

  constructor(public router: Router) {}

  setBodyAttribute(attribute: string, value: string): void {
    document.body.setAttribute(attribute, value);
  }

  tabStatus = 'justified';

  openasesor(){
    window.open('https://wa.me/573175170235?text=Solicito%20Ayuda%20', '_blank');
  }

 
}
