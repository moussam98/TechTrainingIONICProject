import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Formation } from './Formation';
import { User } from './User'; 


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private auth : AngularFireAuth, 
    private route : Router,
    private firestore : AngularFirestore, 
    private fireStorage : AngularFireStorage, 
    private toastCtrl : ToastController
    ) { }

  loginWithEmail(data) {
    this.auth.signInWithEmailAndPassword(data.email, data.password).then((userCredential) => {
      const user = userCredential.user;
      sessionStorage.setItem('userId', user.uid);
      this.route.navigate(['./home/tabs/formation']);
      this.openToast('Bienvenu ! '); 
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  signUp(data) {
    this.auth.createUserWithEmailAndPassword(data.email, data.password).then((userCredential) => {
      const user = userCredential.user;
      let userInformation : User = {lastName : data.nom, firstName : data.prenom, email : data.email};
      this.saveUser(userInformation, user.uid).then(
        () => { 
          sessionStorage.setItem('userId', user.uid);
          this.openToast("Compte créé !");
          this.route.navigate(['./home/tabs/formation']); 
        }
      ).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  signOut(){
    return this.auth.signOut();
  }

  saveUser(data : User, uid) {
    return this.firestore.collection("users").doc(uid).set(data);
  }

  getUser(uid){
    return this.firestore.collection("users").doc(uid).valueChanges() ;
  }

  getFormations(){
    return this.firestore.collection('Formations').valueChanges();
  }

  saveFormation(uid, formation : Formation){
    return this.firestore.collection('myTraining').doc(uid).collection('formation').add(formation);
  }

  getUserFormations(uid){
    return this.firestore.collection('myTraining').doc(uid).collection('formation').valueChanges();
  }

  getImage(filepath){
    let storageRef  = this.fireStorage.storage.ref();
    // Create a reference to a image
    const imageRef = storageRef.child('images/'+filepath);
    
     return imageRef; 
  }
  
  editUser(uid : string, data){
    return this.firestore.collection("users").doc(uid).set(data);
  }

  openToast( message) {
    const toast =  this.toastCtrl.create({
      message: message,
      duration: 2000, 
    });
    toast.then( res => res.present());
  }

}
