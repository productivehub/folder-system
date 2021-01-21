import { flatten } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FolderService } from './folder.service';

export interface IFile {
  fileName: string;
  downloadUrl: string;
  folder?: string;
  uid?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private svc: FolderService,
    private db: AngularFirestore
  ) { }

  async upload(file: IFile) {
    await this.svc.putObject({
      collection: 'files',
      data: {
        ...file,
        version: 1,
      },
      path: file.folder,
      id: file.fileName
    });

    await this.svc.putObject({
      collection: `files/${file.fileName}/versions`,
      data: {
        ...file,
      },
      path: file.folder,
      id: '1'
    });


  }
}
