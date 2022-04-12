import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {FaceSnapListComponent} from "./components/face-snap-list/face-snap-list.component";
import {SingleFaceSnapComponent} from "./components/single-face-snap/single-face-snap.component";
import {FormReactiveComponent} from "./components/form-reactive/form-reactive.component";
import {FaceSnapComponent} from "./components/face-snap/face-snap.component";


@NgModule({
  declarations: [
    FaceSnapListComponent,
    SingleFaceSnapComponent,
    FormReactiveComponent,
    FaceSnapComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    FaceSnapListComponent,
    SingleFaceSnapComponent,
    FormReactiveComponent,
    FaceSnapComponent
  ]

})
export class FaceSnapsModule {
}
