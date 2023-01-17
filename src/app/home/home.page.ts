import { Component } from '@angular/core';
import { AvatarService } from '../services/avatar.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Camera } from '@capacitor/camera'
import { CameraResultType, CameraSource } from '@capacitor/camera/dist/esm/definitions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  profile:any = null;

  constructor(
    private avatarService:AvatarService,
    private authService:AuthService,
    private router:Router,
    private loadingController:LoadingController,
    private alertController:AlertController
  ) {
    this.avatarService.getUserProfile().subscribe({
      next:(data)=>{
        this.profile = data;
        console.info(data)
      },
      error:(err) =>console.error(err)

    }
    )
  }



  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/',{replaceUrl:true})
  }

  async changeImage(){
    const image = await Camera.getPhoto({
      quality:90,
      allowEditing:false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
    });

    console.log(image);

    if (image){
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadImage(image);
      loading.dismiss()

      if(!result){
        const alert = await this.alertController.create({
          header:'Upload Falhou',
          message: 'Houve um problema fazer o upload do seu avatar',
          buttons:['OK']

        })
        await alert.present()
      }
    }
  }

}
