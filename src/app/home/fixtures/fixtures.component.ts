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

    // Get the current round. Using that find the particular event.


    this._dataService.getNextGeneralFixtures().subscribe((fixtures)=>{
      let round = fixtures["events"][0].intRound;
      let nextFixtures;
     this._dataService.getNextRoundFixtures(round).subscribe((fixtures)=>{
       this.nextFixtures = fixtures["events"];
     });

      this.nextFixtures = nextFixtures.sort((a,b)=>{
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

 showDate(eventDate:string){
   let now = new Date();
   let dateArray = eventDate.split("-");
   let fixtureMonth = dateArray[1];
   let fixtureDate = dateArray[2];
   let fixtureYear = dateArray[0];

   if(parseInt(fixtureYear) == now.getFullYear()){
     if(parseInt(fixtureMonth) == (now.getMonth()+1)){
       if(parseInt(fixtureDate) == now.getDate()){
         return "Today at";
       }else if(parseInt(fixtureDate) == (now.getDate()+1)){
         return "Tomorrow at"
       }else{return eventDate}
     }
   }

 }

//  Convert eventTime to Locale time

toLocaleTime(eventTime){
  let now = new Date();
  let timezoneOffset = now.getTimezoneOffset();
 

  let realTimeStr = eventTime.split('+')[0].split(':');
    realTimeStr = realTimeStr.splice(0,2);

  realTimeStr[0] = parseInt(realTimeStr[0]) + (timezoneOffset/-60);

  return realTimeStr.join(":");


}
  
}
