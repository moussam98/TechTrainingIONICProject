import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { EditComponent } from '../edit/edit.component';
import { FirebaseService } from '../firebase.service';
import { Formation } from '../Formation';
import { User } from '../User';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  liste : Formation [];
  user : User; 
  isEmpty :boolean = false; 
  constructor(
    private firebaseService: FirebaseService,
    private modalCtrl : ModalController,
    private toastCtrl : ToastController,
    private route : Router
    ) {}

  ngOnInit() {
    let uid = sessionStorage.getItem('userId'); 
    this.getUser(uid); 
    this.getUserFormations(uid);
  }

  getUser(uid: string){
    this.firebaseService.getUser(uid).subscribe(
      (data : User ) => this.user = data, 
      (err) => console.log('Erreur ! ', err)
    ); 
  }

  getUserFormations(uid:string){
    this.firebaseService.getUserFormations(uid).subscribe(
      (data : Formation []) => { 
        //Retrieve of the icon and image of each formation
        this.liste = data.map( x => { 
          this.firebaseService.getImage(x.icon).getDownloadURL().then( res => x.iconURL = res);
          this.firebaseService.getImage(x.img).getDownloadURL().then( res => x.imgURL = res);
          return x;
        });
        
        if(this.liste.length === 0)
          this.isEmpty = true;
        else
          this.isEmpty = false;
          
      },
      (err) => console.log('Error ! ', err)
    );
  }

  async edit(name){
    // we create a MadalController for edit name
    const modal = await this.modalCtrl.create({
      component : EditComponent,
      componentProps : { userName : name}
    });

    await modal.present();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: "Deconnexion !",
      duration: 2000
    });
    toast.present();
  }

  startTraining(id){
    sessionStorage.setItem('formationId', id);
    this.route.navigate(['home/tabs/tab2', id]);
  }

  signOut(){
    this.firebaseService.signOut().then(
      () => {
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('formationId');
        this.presentToast();
        this.route.navigate(['']);
      }
    ).catch( (err) => console.log('Erreur : ', err)  )  
  }

}
