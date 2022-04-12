import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map, Observable, tap} from "rxjs";
import {IFaceSnap} from "../../../models/i-face-snap.model";
import {FaceSnapsService} from "../../../shared/services/face-snaps.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-form-reactive',
  templateUrl: './form-reactive.component.html',
  styleUrls: ['./form-reactive.component.scss']
})
export class FormReactiveComponent implements OnInit {

  snapForm!: FormGroup;
  faceSnapPreview$!: Observable<IFaceSnap>;
  urlRegex: RegExp = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

  constructor(private formBuilder: FormBuilder, private snapsService: FaceSnapsService, private router: Router) {
  }

  ngOnInit(): void {
    // on crée le form
    this.snapForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      imageUrl: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
      location: [null]
    }, {
      updateOn: 'blur'
    });
    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
      map(formValue => ({
        id: formValue.id,
        title: formValue.title,
        description: formValue.description,
        createdDate: new Date(),
        snaps: 0,
        imageUrl: formValue.imageUrl,
        location: formValue.location,
      }))
    );
  }

  onSubmitForm() {
    this.snapsService.addFaceSnap(this.snapForm).pipe(
      tap(() => this.router.navigateByUrl('/facesnaps'))
    ).subscribe();
  }

}
