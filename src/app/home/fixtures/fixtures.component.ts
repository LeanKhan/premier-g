import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {

nextFixtures = [{alive:"I am alive"}];

  constructor(private _dataService:DataService) { }

  ngOnInit() {
    this._dataService.getNextFixtures().subscribe((fixtures)=>{
      let splicedFixtures = fixtures["events"].splice(0,10);
      this.nextFixtures = splicedFixtures.sort((a,b)=>{
        if(parseInt(a.strDate.split("/")[1]) == parseInt(b.strDate.split("/")[1])){ // Check if both fixtures have same month
          if(parseInt(a.strDate.split("/")[0]) == parseInt(b.strDate.split("/")[0])){ // Check if both fixtures have the same day
            return parseInt(a.strTime) - parseInt(b.strTime); //If both fixtures have same month and day sort by time
          }else{
            return parseInt(a.strDate.split("/")[0]) - parseInt(b.strDate.split("/")[0])
          }
        }
      });
    },err=>{console.error(err)},()=>{console.log("Done!")})
  }

}
