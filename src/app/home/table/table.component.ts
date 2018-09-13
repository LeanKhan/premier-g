import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

table:any;

  constructor(private _dataService:DataService) { }

  ngOnInit() {
    this._dataService.getTable().subscribe((res)=>{
      this.table = res["table"];
      console.log(res);
    })
  }



}
