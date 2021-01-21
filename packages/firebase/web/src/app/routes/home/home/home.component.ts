import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { FolderService, FsPath } from 'src/app/services/folder.service';
import { GroupsService } from 'src/app/services/groups.service';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  path$: Observable<FsPath>;

  pathObjects$: Observable<any>;
  unsub$ = new Subject();



  public folder: string;

  constructor(
    private route: ActivatedRoute,
    private svc: FolderService,
    private pageSvc: PageService,

  ) { }

  ngOnDestroy() {
    // preventing a memory leak by closing observables when user
    // navigates away from the page
    this.unsub$.next();
  }

  ngOnInit() {
    this.pageSvc.updatePage({ title: 'Folders' });



    this.route.queryParams.subscribe(q => {
      const folder = this.folder = (q.path || '/root').replace('//','/');
      // load path from querystring, default to '/root'
      this.path$ = this.svc.loadPath(folder).pipe(
        takeUntil(this.unsub$),
        map(path => {
          this.pathObjects$ = this.svc.getObjects(path.path).pipe(
            tap(pathObjects => {
              // console.log('pathObjects');
              // console.log(pathObjects);
            })
          );
          return path;
        })
      );


    })
  }



}
