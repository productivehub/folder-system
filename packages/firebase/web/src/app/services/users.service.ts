import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private svc: AngularFirestore,
    private auth: AuthService
  ) { }

  list(): Observable<any[]> {
    return from(this.auth.userId()).pipe(
      switchMap((uid: string) => {
        return this
          .svc
          .collection(`users`, ref => ref.where('uid', '!=', uid))
          .valueChanges({ idField: 'id' });
      })
    )

  }
}
