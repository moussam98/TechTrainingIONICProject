import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/firebase.service';
import {Formation} from '../../Formation';

@Component({
  selector: 'app-detail-formation',
  templateUrl: './detail-formation.page.html',
  styleUrls: ['./detail-formation.page.scss'],
})
export class DetailFormationPage implements OnInit {

@Input() formationId;
test : number | undefined;
formation : Formation | undefined;

liste : Formation []; 


  constructor(
    private route: ActivatedRoute, 
    private firebaseService : FirebaseService, 
    private router : Router, 
    private modalCtrl : ModalController, 
    private toastCtrl : ToastController
    ) {  
   }

  ngOnInit() {
    this.getFormations();
  }

  getFormations(){
    this.firebaseService.getFormations().subscribe(
      (data : Formation [] ) => {
        this.liste = data; 
        this.formation = this.liste.find(formation => formation.id == this.formationId);
        this.firebaseService.getImage(this.formation.img)
        .getDownloadURL()
        .then(res => this.formation.imgURL = res)
        .catch(err => console.log("Erreur : ", err)
        )
      },
      (err) => console.log("une erreur s'est produite : ", err)
     )
  }


  add(){
    let uid  = sessionStorage.getItem('userId'); 
    this.firebaseService.saveFormation(uid, this.formation).then(
      () => { 
        sessionStorage.setItem('formationId', this.formation.id.toString());
        this.presentToast();
        this.modalCtrl.dismiss(); 
        this.router.navigate(['home/tabs/tab2'])}
    ).catch(
      (err) => console.log("Erreur ! ", err)
    ); 
  }

  cancel(){
    this.modalCtrl.dismiss();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: "L'ajout a  étè effectué avec succès !",
      duration: 2000
    });
    toast.present();
  }

}
