import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  userEmail: string = "ss";
  userName: string = "Harry";

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onContinue(): void {
    this.router.navigateByUrl('facesnaps').then(r => r);
  }

  onSubmitForm(form: NgForm) {
    console.log(form.value);
  }
}
