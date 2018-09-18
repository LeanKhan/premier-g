import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {

thisGameWeekFixtures = [{alive:"I am alive"}]; //Placeholder values
nextGameWeekFixtures = [{alive:"I am alive too!"}]; //Placeholder values

  constructor(private _dataService:DataService) { }

  ngOnInit() {

    // Get the current round. Using that find the particular event.


    this._dataService.getNextGeneralFixtures().subscribe((fixtures)=>{
      let round:string = fixtures["events"][0].intRound;
      let nextRound:string = (parseInt(round) + 1).toString(); 
      
      
     this._dataService.getNextRoundFixtures(round).subscribe((fixtures)=>{
      let thisGameWeek;
       thisGameWeek = fixtures["events"];
       thisGameWeek = thisGameWeek.map((fixture)=>{
         fixture.strLocaleTime = this.toLocaleTime(fixture.strTime);
         return fixture;
        });
      

       // Sort fixtures for this week
      this.thisGameWeekFixtures = thisGameWeek.sort((a,b)=>{
        if(parseInt(a.strDate.split("/")[1]) == parseInt(b.strDate.split("/")[1])){ // Check if both fixtures have same month
          if(parseInt(a.strDate.split("/")[0]) == parseInt(b.strDate.split("/")[0])){ // Check if both fixtures have the same day
            return parseInt(a.strTime) - parseInt(b.strTime); //If both fixtures have same month and day sort by time
          }else{
            return parseInt(a.strDate.split("/")[0]) - parseInt(b.strDate.split("/")[0])
          }
        }
      });

      this._dataService.getNextRoundFixtures(nextRound).subscribe((nextfixtures)=>{
        let nextGameWeek;
        nextGameWeek = nextfixtures["events"];
        nextGameWeek = nextGameWeek.map((fixture)=>{
          fixture.strLocaleTime = this.toLocaleTime(fixture.strTime);
          return fixture;
        });
        
         // Sort next week fixtures
         this.nextGameWeekFixtures = nextGameWeek.sort((a,b)=>{
          if(parseInt(a.strDate.split("/")[1]) == parseInt(b.strDate.split("/")[1])){ // Check if both fixtures have same month
            if(parseInt(a.strDate.split("/")[0]) == parseInt(b.strDate.split("/")[0])){ // Check if both fixtures have the same day
              return parseInt(a.strTime) - parseInt(b.strTime); //If both fixtures have same month and day sort by time
            }else{
              return parseInt(a.strDate.split("/")[0]) - parseInt(b.strDate.split("/")[0])
            }
          }
        });
      }, err=>{console.error(err)}, ()=>{console.log("Done with nextFixtures")});
  

     });
     
  
    },err=>{console.error(err)},()=>{console.log("Done! totally")})
  }

  // Returns the date of the fixture
 showDate(eventDate:string){
   let now = new Date();
   let dateArray = eventDate.split("-");
   let fixtureMonth = dateArray[1];
   let fixtureDate = dateArray[2];
   let fixtureYear = dateArray[0];

   if(parseInt(fixtureYear) == now.getFullYear()){     //Check if the fixture is in the year
     if(parseInt(fixtureMonth) == (now.getMonth()+1)){ //If so, Check if the fixture is in the present month
       if(parseInt(fixtureDate) == now.getDate()){     //If in same Year AND same Month, check if in the same Day
         return "Today"; // If TRUE return 'Today'
       }else if(parseInt(fixtureDate) == (now.getDate()+1)){ 
         return "Tomorrow" // If fixture date is the next day, return 'Tomorrow'
       }else if(parseInt(fixtureDate) == (now.getDate()-1)){return "Yesterday"} //If fixture date was a day less return the 'Yesterday'
       else {return eventDate} // Otherwise return the event date string
     } else {return eventDate} //If fixture is not in the same month though, just return the date string
    
   }

 }

//  Test function

hover(e:Event){
  e.target['children'][0].children[1].lastChild['lastChild'].className = 'rounded-0-hover';
}
unHover(e:Event){
  e.target['children'][0].children[1].lastChild['lastChild'].className = 'rounded-0';
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
