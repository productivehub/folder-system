import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadTask } from '@angular/fire/storage/interfaces';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FilesService, IFile } from 'src/app/services/files.service';
import { FsPath } from 'src/app/services/folder.service';


@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {
  @Input() folder: FsPath;

  uploadPercent: Observable<number>;

  public uploadTask: UploadTask;

  constructor(
    private storage: AngularFireStorage,
    private fileSvc: FilesService
  ) { }


  /**
   * Just the basic upload method.
   * normally  I would add more validation, use dropzones, etc...
   * @param $event
   */
  uploadFiles($event) {
    const files: FileList = $event?.target?.files;

    if (files?.length) {

      for (let i = 0; i < files.length; i++) {
        const file: File = files.item(i);

        // hashing the timestamp to create unique file name.
        const fileName = `files/${this.folder.path}/${(+new Date).toString(36)}_${file.name}`;

        // should change to the actual folder
        const storageRef = this.storage.ref(fileName);

        const task = storageRef.put(file);


        this.uploadPercent = task.percentageChanges();

        task.snapshotChanges().pipe(
          finalize(async () => {
            const fileObj: IFile = {
              fileName: file.name,

              downloadUrl: await storageRef.getDownloadURL().toPromise(),
              folder: this.folder.path,
              size: file.size,
              type: file.type,
              name: file.name,
              lastModified: file.lastModified,
              // uid?: string
            };

            console.log(fileObj);
            await this.fileSvc.upload(fileObj);
          })
        ).subscribe();

      }




    }
  }

  ngOnInit(): void {
  }

}
