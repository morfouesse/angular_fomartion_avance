import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SingleFaceSnapComponent} from './components/single-face-snap/single-face-snap.component';
import {FaceSnapListComponent} from './components/face-snap-list/face-snap-list.component';
import {FormReactiveComponent} from "./components/form-reactive/form-reactive.component";
import {AuthGuard} from "../core/guards/auth.guard";


const routes: Routes = [
  {path: 'create', component: FormReactiveComponent, canActivate: [AuthGuard]},
  {path: ':id', component: SingleFaceSnapComponent, canActivate: [AuthGuard]},
  {path: '', component: FaceSnapListComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaceSnapsRoutingModule {
}
