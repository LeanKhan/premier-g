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
  
        this.table = res["table"].sort((a,b)=>{ //Sort the array according to goalsdifference, points, goals for
          if(b.total == a.total){ //If both teams have the same points sort them based on goal diff
            if(b.goalsdifference == a.goalsdifference){ //If both teams also have the same goal diff, sort based on goals scored
              return b.goalsfor - a.goalsfor
            }else{
              return b.goalsdifference - a.goalsdifference
            }
          }else{
            return b.total - a.total
          }
        })
  
      })
    
  }


}
