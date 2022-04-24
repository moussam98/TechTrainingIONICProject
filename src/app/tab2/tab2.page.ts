import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { Formation } from '../Formation';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  formation : Formation;
  idFormationSession : Number;
  idFormationRoute : Number;
  constructor(
    private firebaseService : FirebaseService,
    private route : ActivatedRoute) {}

  ngOnInit(): void {

    this.idFormationRoute = parseInt(this.route.snapshot.queryParamMap.get('id'));
    this.idFormationSession = parseInt(sessionStorage.getItem('formationId'));
    if(this.idFormationRoute)
      this.getFormation(this.idFormationRoute);
    else{
      this.getFormation(this.idFormationSession);
    } 
  }

  getFormation(id){
    this.firebaseService.getFormations().subscribe(
      (data : Formation [] ) => {
        this.formation = data.find(formation => formation.id == id );
      },
      (err) => console.log("une erreur s'est produite : ", err)
     )

  }

}
