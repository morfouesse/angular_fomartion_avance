import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FaceSnapListComponent} from "./face-snap-list/face-snap-list.component";
import {LandingPageComponent} from "./shared/components/landing-page/landing-page.component";
import {SingleFaceSnapComponent} from "./single-face-snap/single-face-snap.component";
import {FormReactiveComponent} from "./form-reactive/form-reactive.component";

const routes: Routes = [
  {path: 'facesnaps/:id', component: SingleFaceSnapComponent},
  {path: 'facesnaps', component: FaceSnapListComponent},
  {path: 'form-reactive', component: FormReactiveComponent},
  {path: '', component: LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
