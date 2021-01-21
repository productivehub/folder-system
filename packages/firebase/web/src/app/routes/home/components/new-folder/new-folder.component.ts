import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FolderService } from 'src/app/services/folder.service';

@Component({
  selector: 'app-folders-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.scss']
})
export class NewFolderComponent implements OnInit {
  folderForm: FormGroup;
  showForm = false;

  constructor(
    private fb: FormBuilder,
    private svc: FolderService
  ) {
    this.initForm();
  }


  initForm() {
    this.folderForm = this.fb.group({
      name: [null, Validators.required]
    })
  }

  async submit($event: any) {
    if ($event.preventDefault) $event.preventDefault();

    if (this.folderForm.valid) {
      this.svc.addSubfolder(this.folderForm.value).then(() => {
        this.folderForm.reset();
        this.showForm = false;

      }).catch(err => {
        alert(err.message);
      });
    }

  }


  ngOnInit(): void {
  }

}
