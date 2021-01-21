import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import firebase from 'firebase/app';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // subject to accept and transmit changes to user auth state
  user$ = new BehaviorSubject(null);

  constructor(
    private afAuth: AngularFireAuth
  ) {
    afAuth.onAuthStateChanged(async (user) => {
      if (user) {
        this.user$.next(user);
      } else {
        this.user$.next(null);
      }
    });
  }

  async userId(): Promise<string> {
    return (await this.afAuth.currentUser)?.uid;
  }

  async isAdmin(): Promise<boolean> {
    const idTokenResult = await (await this.afAuth.currentUser).getIdTokenResult();
    return !!idTokenResult?.claims?.admin;
  }

  googleSignin() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }


  async isInRole(role: string) {
    const currentUser = await this.afAuth.currentUser;
    const claims = (await currentUser?.getIdTokenResult()).claims ?? {};
    return claims[role] ?? false
  }



  login(email: string, password: string): Promise<any> {

    return this
      .afAuth
      .signInWithEmailAndPassword(email, password);
  }

  async signout() {
    await this.afAuth.signOut();
  }
}
