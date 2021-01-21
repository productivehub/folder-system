import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NewFolderComponent } from './components/new-folder/new-folder.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { UploaderComponent } from './components/uploader/uploader.component';
import { ListItemFolderComponent } from './components/list-item-folder/list-item-folder.component';
import { ListItemFileComponent } from './components/list-item-file/list-item-file.component';
import { GroupsListComponent } from './components/groups-list/groups-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [HomeComponent, NewFolderComponent, UploaderComponent, ListItemFolderComponent, ListItemFileComponent, GroupsListComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class HomeModule { }
