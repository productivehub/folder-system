import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, merge, Observable, of, Subject } from 'rxjs';
import { map, mapTo, switchMap, take } from 'rxjs/operators';
import { GroupsService } from 'src/app/services/groups.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private unsub$ = new Subject();
  public users$: Observable<any[]>;
  public groups: any[];

  constructor(
    private svc: UsersService,
    private groupSvc: GroupsService,
  ) { }

  ngOnDestroy() {
    this.unsub$.next();
  }

  ngOnInit(): void {
    this.groupSvc.list().subscribe(console.log);

    this.users$ = this.svc
      .list()
      .pipe(
        take(1),
        map(users => users)
        //   {
        //   users.forEach(user => {
        //     user.meta = {
        //       groups: this.groups.map(group => ({
        //         ...group,
        //         checked: (user.groups || []).indexOf(group.id) > -1
        //       }))
        //     }
        //   });

        //   console.log(users);

        //   return users;
        // })
      );

  }

}
