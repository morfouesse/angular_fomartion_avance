import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {httpInterceptorProviders} from "../interceptors";
import * as fr from "@angular/common/locales/fr";
import {HeaderComponent} from "./component/header/header.component";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  // me sert à utilsrr la balise <header> dans app component html
  exports: [
    HeaderComponent
  ],
  // Un provider est un objet que l'on déclare à Angular pour qu'il puisse l'injecter à différentes endroits de l'application.
  providers: [
    httpInterceptorProviders,
    {provide: LOCALE_ID, useValue: 'fr-FR'},
  ]
})
export class CoreModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
