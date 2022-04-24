import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseService } from 'src/app/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  nom : string;
  prenom : string; 
  email : string;
  password : string;

  constructor(private firebaseService : FirebaseService) { }

  ngOnInit() {
  }

  signUp( form : NgForm){
    this.nom = form.value.nom; 
    this.prenom = form.value.prenom;
    this.email = form.value.email; 
    this.password = form.value.password 
    this.firebaseService.signUp({nom : this.nom, prenom : this.prenom, email: this.email, password : this.password});
  }
}
