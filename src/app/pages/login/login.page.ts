import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseService } from 'src/app/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string; 
  password : string; 
  constructor(private firebaseService : FirebaseService) { }

  ngOnInit() {
  }

  login( form: NgForm){
    this.email = form.value.email; 
    this.password = form.value.password;
    let data = { email : this.email, password : this.password}
    this.firebaseService.loginWithEmail(data);
  }

}
