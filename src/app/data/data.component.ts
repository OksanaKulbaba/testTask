import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Data, ModalCreateDataComponent} from '../modal-create-data/modal-create-data.component';
import {SaveDataService} from '../save-data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  constructor(
    public saveDateService: SaveDataService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(ModalCreateDataComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openEditModal(data: Data): void{
    const dialogRef = this.dialog.open(ModalCreateDataComponent , { data });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
