import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { NotificationService } from './notification.service';
import { Storage } from '@ionic/storage';
import { ModalController, NavController } from '@ionic/angular';
import { NotificationDetails } from 'src/app/interfaces/notification';
import { ModalDetailsProfilePage } from '../profile/modal-details-profile/modal-details-profile.page';
import { ModalFollowUsersPage } from '../home/modal-follow-users/modal-follow-users.page';
import { ProfileService } from '../profile/profile.service';
import { b2bUserModel } from 'src/app/models/b2b-user-model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  userStorageId: string;
  notificationDetails: NotificationDetails[];
  userProfileContacts: b2bUserModel[];

  constructor(private notificationService: NotificationService,
    private profileService: ProfileService,
    private storage: Storage,
    private navCtrl: NavController,
    private modalCrtl: ModalController,) { }

  ngOnInit() {
    this.storage.get('idUserFromDb').then((val)=>{
      if(val != null ){
        console.log('Your id from db storage is ', val);
        this.userStorageId = val;
        this.getUserProfileContacts(val);
      //  this.getNotifications(val);
      }else{
        this.navCtrl.navigateRoot('/login');
      }
    })
  }

  getUserProfileContacts(userId){
    this.profileService.getUserContacts(userId)
    .subscribe((data)=>{
      this.userProfileContacts = data;
      console.log(data);
    })
  }
  
  
  async findUsers(){
    
    const modal = await this.modalCrtl.create({
      component: ModalFollowUsersPage
    });

    await modal.present();
  }


  //-------------------
  getNotifications(idUser){
    this.notificationService.getNotificationUser(idUser)
    .subscribe((data)=>{
      this.notificationDetails = data;
      console.log(data);
    })
  }

  async goToSponsorProfile(sponsorUserId){
    console.log("this is the view details"+sponsorUserId);
    const modal = await this.modalCrtl.create({
      component: ModalDetailsProfilePage,
      componentProps:{
       'sponsorUserId': sponsorUserId
      }
    });

    await modal.present();
  }





  
  doRefresh(event){
    console.log("do refresh")
      this.ngOnInit();
      event.target.complete();
  }
   

}
