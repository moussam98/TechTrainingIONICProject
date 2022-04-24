import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/firebase.service';
import { User } from 'src/app/User';
import {Formation} from '../../Formation';
import { DetailFormationPage } from '../detail-formation/detail-formation.page';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.page.html',
  styleUrls: ['./formation.page.scss'],
})
export class FormationPage implements OnInit {

  userID: string | undefined; 
  liste : Formation [];
  user : User;
  constructor(
    private route : ActivatedRoute, 
    private firebaseService : FirebaseService,
    private router : Router,
    private modalCtrl : ModalController,
    ) { }

  ngOnInit() { 
    this.userID = this.route.snapshot.paramMap.get('id'); 
    this.getFormations();  
  }


  getUser(){
    this.firebaseService.getUser(this.userID).subscribe( 
      (data : User) =>  {
        this.user = data;
      },
      (err) => { console.log("Une erreur s'est produite  :  ", err)},
      ); 

  }

  getFormations(){
    this.firebaseService.getFormations().subscribe(
      (data : Formation [] ) => {
       this.liste = data.map( x => { 
         // Retrieve the icon and image of each formation 
          this.firebaseService.getImage(x.icon).getDownloadURL().then( res => x.iconURL = res);
          this.firebaseService.getImage(x.img).getDownloadURL().then( res => x.imgURL = res);
          return x;
        });
      },
      (err) => console.log("une erreur s'est produite : ", err)
     )
  }

  detailFormation(id : number){
    this.router.navigate(['/detail', id]);
  }

  async openModal(id){
    const modal = await this.modalCtrl.create({
      component : DetailFormationPage,
      componentProps : { formationId : id}
    });

    await modal.present();
  }
}
