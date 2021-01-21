import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent implements OnInit {
  @Input() folder: string;
  groups$: Observable<any[]>

  constructor(
    private auth: AuthService,
    private groupsSvc: GroupsService,
  ) { }

  async toggleGroup(group: any, $event: any) {
    // just to ensure the object is iterable
    group.folders = group.folders || [];

    group.folders = $event.checked ? [
      ...group.folders,
      this.folder
    ] : group.folders.filter(t => t !== this.folder);


    await this.groupsSvc.update(group.id, {
      folders: group.folders
    });

  }

  async ngOnInit() {
    // only admin should be able to see list of groups
    // NOTE : there is a second layer of protection in the DB, so even if you remove
    //        the following condition you won't be able to view the list of groups if you are
    //        not an admin
    if(! (await this.auth.isInRole('admin'))) return ;


    this.groups$ = this.groupsSvc.list().pipe(
      take(1),
      map((list: any[]) => {
        return list.map(item => ({
          ...item,
          selected: item.folders?.indexOf(this.folder) > -1
        }));
      })
    );
  }

}
