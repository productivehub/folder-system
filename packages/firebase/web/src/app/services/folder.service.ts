import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap, mergeMapTo, switchMap } from 'rxjs/operators';

/**
 *
 */
export interface PutObjectRequest {
  // the folder we want to add an object to
  path: string;
  // sub collection we want to put an object in
  collection: string;
  // the object data
  data: any;
  // id (if known)
  id?: string;
}

/**
 *
 */
export interface FsPath {
  /**
     * Holds the path
     */
  path: string;

  /**
   * Holds the parts of the path
   */
  pathParts: {
    // folder name, e.g: `folderA`
    name: string;

    // folder path, e.g: `/root/topFolder/folderA`
    path: string;

    // folder path, e.g: `/root/topFolder/`
    parent: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  path: FsPath;
  path$ = new BehaviorSubject<FsPath>(null);

  constructor(
    private db: AngularFirestore
  ) { }

  /**
   * extract firebase refPath from folder path
   * @returns
   */
  getRefPath(name: string): string {

    const refJoined = name.split('/').filter(t => t).join(`/folders/`);
    return `folders/${refJoined}`;
  }

  /**
   * Loads a path (folder)
   *
   * @param path requested path (folder)
   */
  loadPath(path: string) {
    const pathParts = [];

    let arr = path.split('/').filter(t => t);

    while (arr.length > 0) {
      const name = arr.pop();

      pathParts.push({
        name,
        path: `/${arr.join('/')}/root`,
        parent: `/${arr.join('/')}`,
      })
    }

    this.path = {
      path: path,
      pathParts: pathParts.reverse()
    };

    // broadcast path changes to all subscribers
    this.path$.next(this.path);

    return this.path$;

  }

  /**
   * add sub folder to the current folder in 'this.path' object
   * @param params folder object
   */
  async addSubfolder(params: {
    name: string
  }) {
    const fullPath = `${this.path.path}/${params.name}`;
    const doc = await this.db.doc(`${this.getRefPath(fullPath)}`).get().toPromise();

    if (doc.exists) {
      throw new Error('folder already exists');
    } else {
      await doc.ref.set({ name: params.name });
    }
  }

  /**
   * return all objects in the folder, including subfolders and files
   */
  getObjects(path: string): Observable<any> {
    const refPath = this.getRefPath(path);
    return combineLatest([
      this.db.collection(`${refPath}/folders`).valueChanges({ idField: 'id' }).pipe(
        map((folders: any[]) => folders.map(folder => ({
          ...folder,
          path: `${path}/${folder.name}`
        }))
        )
      ),
      this.db.collection(`${refPath}/files`).valueChanges({ idField: 'id' })
    ]).pipe(
      map(([folders, files]) => {
        return {
          folders: folders || [],
          files: files || [],
        }
      })
    );
  }

  async putObject(req: PutObjectRequest) {
    const refPath = this.getRefPath(req.path);
    const colRef = this.db.collection(`${refPath}/${req.collection}`)
    return req.id ? colRef.doc(req.id).set(req.data, { merge: true }) : colRef.add(req.data);
  }

}
