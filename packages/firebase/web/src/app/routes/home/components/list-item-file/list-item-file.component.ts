import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-item-file',
  templateUrl: './list-item-file.component.html',
  styleUrls: ['./list-item-file.component.scss']
})
export class ListItemFileComponent implements OnInit {
  @Input() file : any;

  constructor() { }

  ngOnInit(): void {
  }

}
