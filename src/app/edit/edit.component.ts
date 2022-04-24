import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { User } from '../User';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  @Input() userName;
  user: User;
  name: string;
  type: string; 
  uid: string;
  constructor(
    private modalCtrl : ModalController, 
    private firebaseService : FirebaseService, private toastCtrl : ToastController) { }

  ngOnInit() {
    this.uid = sessionStorage.getItem('userId'); 
    this.getUser(this.uid);
  }

  edit(form : NgForm){
    let name = form.value.nom; 
    
    if(this.type === 'Prénom')
      this.user.firstName = name;
    else if( this.type === 'Nom')
      this.user.lastName = name; 
    this.firebaseService.editUser(this.uid, this.user)
    .then(
      () => {
        this.presentToast(" Modication reuusit !"); 
        this.modalCtrl.dismiss();}
     ).catch( (err) => {console.log("Erreur ! "); this.modalCtrl.dismiss();}
     );
  }

  cancel(){
    this.modalCtrl.dismiss();
  }

  getUser(uid){
    this.firebaseService.getUser(uid).subscribe(
      (data : User) => {
        this.user = data;

        if(this.userName === 'firstName'){
          this.type = 'Prénom';
          this.name = this.user.firstName;
        }
        else if (this.userName === 'lastName'){
          this.type = 'Nom';
          this.name = this.user.lastName;
        }; 
      }
    )
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
