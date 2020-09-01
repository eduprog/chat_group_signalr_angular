import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, NgForm, FormControl } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ConversationService } from '../../services/conversation.service';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/models/user-info';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
export class InitialComponent {

  form: FormGroup;

  matcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private conversationService: ConversationService,
    private router: Router
  ) {
    this.form = this.fb.group({
      groupName: ['', [Validators.required]],
      userName: ['', [Validators.required]]
    });

    this.form.markAllAsTouched();
  }

  handleEnterGroup() {

    const model: UserInfo = new UserInfo(this.form.get('groupName').value, this.form.get('userName').value);

    this.conversationService.enterGroup(model).then(
      response => {
        if (response) {
          this.conversationService.receiveMessages();
          this.router.navigateByUrl("conversation");
        }
        else {
          alert("Erro ao entrar no grupo")
        }
      },
      error => {
        alert("Erro ao entrar no grupo")
        console.log(error);
      }
    )

  }

}
