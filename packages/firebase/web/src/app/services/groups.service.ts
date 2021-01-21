import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Group {
  name: string;
  userIds?: { [key: string]: any };
  folders: string[];
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(
    private db: AngularFirestore
  ) { }

  /**
   * Return a list of groups
   */
  list(): Observable<any[]> {
    return this.db.collection('groups').valueChanges({
      idField: 'id'
    });
  }

  add(formData: Group): Promise<DocumentReference<Group>> {
    return this.db.collection<Group>('groups').add({
      ...formData
    });
  }

  update(id: string, formData: Partial<Group>): Promise<void> {
    return this.db.collection('groups').doc(id).set(formData, { merge: true });
  }


  async delete(id: string) {
    await this.db.doc(`groups/${id}`).delete();
  }

  /**
   * Adds user to a group
   *
   * @param uid
   * @param gid
   */
  async addUserToGroup(uid: string, gid: string) {
    await this.db.collection(`users/${uid}/groups`).doc(gid).set({ enabled: true });
    await this.db.doc(`users/${gid}`).set({
      groups: {
        [uid]: true,
      }
    }, { merge: true });

    // the reason I'm saving in two places is because I couldn't make
    // a final decision in such short time, I had to plan for different
    // approaches
    await this.db.collection(`groups/${gid}/users`).doc(uid).set({ enabled: true });
    await this.db.doc(`groups/${gid}`).set({
      userIds: {
        [uid]: true,
      }
    }, { merge: true });


  }

  async removeUserFromGroup(uid: string, gid: string) {
    await this.db.collection(`users/${uid}/groups`).doc(gid).delete();

    // see the above note on the following duplication
    await this.db.collection(`groups/${gid}/users`).doc(uid).delete();
    await this.db.collection(`groups/${gid}`).doc(uid).set({
      userIds: {
        [uid]: false,
      }
    }, { merge: true });


  }

}
