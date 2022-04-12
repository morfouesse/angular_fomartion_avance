import {Component, OnInit} from '@angular/core';
import {IFaceSnap} from "../../../models/i-face-snap.model";
import {FaceSnapsService} from "../../../shared/services/face-snaps.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit {
  faceSnaps$: Observable<IFaceSnap[]> = new Observable<IFaceSnap[]>();

  constructor(private faceSnapsService: FaceSnapsService) {
  }

  ngOnInit(): void {
    this.faceSnaps$ = this.faceSnapsService.getAllFaceSnaps();

  }

}
