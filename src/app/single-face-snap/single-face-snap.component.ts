import {Component, OnInit} from '@angular/core';
import {IFaceSnap} from "../models/i-face-snap.model";
import {FaceSnapsService} from "../shared/services/face-snaps.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {

  snap!: IFaceSnap;
  buttonText: string = 'Oh Snap!';

  constructor(private snapsService: FaceSnapsService, private route: ActivatedRoute) {
  }


  ngOnInit() {

    const snapId = +this.route.snapshot.params['id'];
    this.snap = this.snapsService.snapGetSnapById(snapId);
  }


  onSnap(): void {
    if (this.buttonText === 'Oh Snap!') {
      this.snapsService.snapOrUnsnap(this.snap.id, 'snap');
      this.buttonText = 'Oops, unSnap!';
    } else {
      this.snapsService.snapOrUnsnap(this.snap.id, 'unsnap');
      this.buttonText = 'Oh Snap!';
    }
  }


}

