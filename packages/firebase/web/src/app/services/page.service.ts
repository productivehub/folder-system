import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  page$ = new BehaviorSubject({

  });

  constructor() { }

  updatePage(pageObj: any) {
    this.page$.next(pageObj);
  }
}
