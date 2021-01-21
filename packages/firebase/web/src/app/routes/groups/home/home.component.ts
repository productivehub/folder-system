import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, VirtualTimeScheduler } from 'rxjs';
import { GroupsService } from 'src/app/services/groups.service';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  errorMessage: string = null;
  newGroupForm: FormGroup;

  list$: Observable<any[]>;

  constructor(
    private svc: GroupsService,
    private fb: FormBuilder,
    private pageSvc: PageService,
  ) {
    this.initForm();

  }

  initForm() {
    this.newGroupForm = this.fb.group({
      name: [null, Validators.required]
    });
  }


  async submit($event: any) {
    this.errorMessage = null;

    if ($event.preventDefault) $event.preventDefault();

    this.errorMessage = null;

    if(this.newGroupForm.valid) {
      await this.svc.add({
        ...this.newGroupForm.value,
      });

      this.newGroupForm.reset();
    }

  }

  async delete(group: any) {
    if(confirm('Are you sure? ')) {
      await this.svc.delete(group.id);
    }
  }

  ngOnInit(): void {
    this.pageSvc.updatePage({ title: 'Groups' });
    this.list$ = this.svc.list();
  }

}
