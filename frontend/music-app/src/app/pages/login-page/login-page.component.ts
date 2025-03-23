import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  form = new FormGroup({
    username : new FormControl(null),
    password : new FormControl(null)
  })

  onSubmit(event : Event) {
    console.log("MIKU dayo");
  }

}
