import {Component, OnDestroy, OnInit} from '@angular/core';
import {IFaceSnap} from "../models/i-face-snap.model";
import {FaceSnapsService} from "../shared/services/face-snaps.service";

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit, OnDestroy {
  snapList: IFaceSnap[] = [];

  //private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private snapsService: FaceSnapsService) {
  }


  ngOnInit(): void {
    this.snapList = this.snapsService.snapList;
  }

  ngOnDestroy(): void {
    // this.destroy$.next(true);
  }

}
