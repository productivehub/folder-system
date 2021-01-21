import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-item-folder',
  templateUrl: './list-item-folder.component.html',
  styleUrls: ['./list-item-folder.component.scss']
})
export class ListItemFolderComponent implements OnInit {
  @Input() folder: any;

  constructor() { }

  ngOnInit(): void {
  }

}
