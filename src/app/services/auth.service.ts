import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth:Auth
  ) { }

    async cadastrar(usuario:UserModel){
      try{
        const user =  createUserWithEmailAndPassword(this.auth,usuario.email,usuario.password);
        return user
      }catch(e){
        return null;
      }


    }

    async login(usuario:UserModel){
      try{
        const user =  signInWithEmailAndPassword(this.auth,usuario.email,usuario.password);
        return user
      }catch(e){
        return null;
      }
    }

    logout(){
      return signOut(this.auth)
    }
}
