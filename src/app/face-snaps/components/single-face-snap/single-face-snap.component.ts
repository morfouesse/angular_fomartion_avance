import {Component, OnInit} from '@angular/core';
import {IFaceSnap} from "../../../models/i-face-snap.model";
import {FaceSnapsService} from "../../../shared/services/face-snaps.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, tap} from "rxjs";
import {SnapOrUnsnapEnum} from "../../../utils/snap-or-unsnap-enum";

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {

  snap!: IFaceSnap;
  faceSnap$: Observable<IFaceSnap> = new Observable<IFaceSnap>();
  buttonText: string = 'Oh Snap!';

  constructor(private snapsService: FaceSnapsService, private route: ActivatedRoute) {
  }


  ngOnInit() {

    const faceSnapId = +this.route.snapshot.params['id'];
    this.faceSnap$ = this.snapsService.getFaceSnapById(faceSnapId);

  }

  onSnap(snapId: number): void {
    if (this.buttonText === 'Oh Snap!') {
      // crée un effet "flash" qu'il faudra remplacé par un state managment
      this.faceSnap$ = this.snapsService.addOneSnapOrRemoveOneSnap(snapId, SnapOrUnsnapEnum.snap).pipe(
        tap(() => this.buttonText = 'Oops, unSnap!')
      );
    } else {
      this.faceSnap$ = this.snapsService.addOneSnapOrRemoveOneSnap(snapId, SnapOrUnsnapEnum.unSnap).pipe(
        tap(() => this.buttonText = 'Oh Snap!')
      );
    }
  }


}

