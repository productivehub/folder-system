import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  unsub$ = new Subject();
  page$: Observable<any>;
  isAdmin = false;

  constructor(
    private auth: AuthService,
    private svc: PageService,
  ) { }


  ngOnDestroy() {
    // unsusbscribe from all open streams
    this.unsub$.next();
  }


  logout() {
    this.auth.signout().then(() => location.href = '/');
  }

  async ngOnInit(): Promise<void> {
    this.isAdmin = await this.auth.isAdmin()

    // I'm wrapping it in a timeout to move it down in the queue to after the change notifier has fired
    // alternatively I could have called `ChangeDetectorRef`
    // setTimeout(() => {
    this.page$ = this.svc.page$.pipe(
      takeUntil(this.unsub$)
    );
    // }, 0);

  }

}
