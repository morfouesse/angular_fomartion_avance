import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingPageComponent} from "./componants/landing-page/landing-page.component";
import {FormsModule} from "@angular/forms";
import { ObservableExercisesComponent } from './componants/observable-exercises/observable-exercises.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    ObservableExercisesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    LandingPageComponent
  ]
})
export class LandingPageModule {
}
