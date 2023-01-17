import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentialsForm!: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private loadingController: LoadingController,
    private alertController:AlertController,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.credentialsForm =  this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],

    })
  }

  async cadastra(){
    const loading = await this.loadingController.create();
    //await loading.present();

    const usuario = this.credentialsForm.getRawValue() as UserModel

    const user = await this.authService.cadastrar(usuario);
    await loading.dismiss()
    if (user){
      this.router.navigateByUrl('./home',{replaceUrl:true})
    }else{
      this.mostraAlerta('Campo de Cadastro','Por favor, tente de novo!')
    }
  }

  async login(){
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(this.credentialsForm.value);
    await loading.dismiss()
    if (user){
      this.router.navigateByUrl('./home',{replaceUrl:true})
    }else{
      this.mostraAlerta('Falha de Login','Por favor, tente de novo!')
    }
  }

  async mostraAlerta(header:string, message:string){
    const alerta = await this.alertController.create({
      header,
      message,
      buttons:[]
    })

    alerta.present()
  }



  get email(){return this.credentialsForm.get('email')}
  get password(){return this.credentialsForm.get('password')}

}
