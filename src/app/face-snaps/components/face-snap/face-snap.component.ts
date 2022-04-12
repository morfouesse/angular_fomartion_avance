import {Component, Input, OnInit} from '@angular/core';
import {IFaceSnap} from "../../../models/i-face-snap.model";
import {FaceSnapsService} from "../../../shared/services/face-snaps.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.less']
})
export class FaceSnapComponent implements OnInit {
  // me permet de recevoir une donnée du parent
  @Input() snap!: IFaceSnap;
  buttonText: string = 'Oh Snap!';

  constructor(private snapsService: FaceSnapsService, private router: Router) {
  }

  ngOnInit() {
  }


  onViewFaceSnap() {
    this.router.navigateByUrl("facesnaps/" + this.snap.id).then(res => res, error => error);
  }


}
