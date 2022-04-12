import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FaceSnapListComponent} from "./face-snaps/components/face-snap-list/face-snap-list.component";
import {LandingPageComponent} from "./landing-page/componants/landing-page/landing-page.component";
import {SingleFaceSnapComponent} from "./face-snaps/components/single-face-snap/single-face-snap.component";
import {FormReactiveComponent} from "./face-snaps/components/form-reactive/form-reactive.component";

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
