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
selectedFixture = {intAwayScore: "Score goes here..."};
collapseSpinner;
table:any;
teamPositions;
homeRecentMatches;
awayRecentMatches;

  constructor(private _dataService:DataService) { }

  ngOnInit() {

    // Get league table
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
      });
      this.table = this.table.map((position, i)=>{
        position["pos"] = i+1;
        return position;
      });

    })

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
      this.thisGameWeekFixtures = thisGameWeek.sort(this.sortFixtures);

      this._dataService.getNextRoundFixtures(nextRound).subscribe((nextfixtures)=>{
        let nextGameWeek;
        nextGameWeek = nextfixtures["events"];
        nextGameWeek = nextGameWeek.map((fixture)=>{
          fixture.strLocaleTime = this.toLocaleTime(fixture.strTime);
          return fixture;
        });
        
         // Sort next week fixtures
         this.nextGameWeekFixtures = nextGameWeek.sort(this.sortFixtures);
        
      }, err=>{console.error(err)});
  

     });
     
  
    },err=>{console.error(err)});
  }

  // Highter order function for sorting fixtures
sortFixtures(a,b){
  if(parseInt(a.strDate.split("/")[2]) == parseInt(b.strDate.split("/")[2])){ // Check if they are in the same year
    if(parseInt(a.strDate.split("/")[1]) == parseInt(b.strDate.split("/")[1])){ // Check if both fixtures have same month
      if(parseInt(a.strDate.split("/")[0]) == parseInt(b.strDate.split("/")[0])){ // Check if both fixtures have the same day
        return parseInt(a.strTime) - parseInt(b.strTime); //If both fixtures have same month and day sort by time
      }
  }else{
        return parseInt(a.strDate.split("/")[1]) - parseInt(b.strDate.split("/")[1])
      }
    }else{ return parseInt(a.strDate.split("/")[2]) - parseInt(b.strDate.split("/")[2])}
  }

  // Higher order function to filter-out fixtures that have not been played

  haveBeenPlayed(fixture){
    return fixture.intHomeScore != null;
  }

  // Higher order function to filter-out fixtures that are not in the EPL

  inEpl(fixture){
    return fixture.idLeague == "4328";
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

//  Convert eventTime to Locale time

toLocaleTime(eventTime){
  let now = new Date();
  let timezoneOffset = now.getTimezoneOffset();

  let realTimeStr = eventTime.split('+')[0].split(':');
    realTimeStr = realTimeStr.splice(0,2);

  realTimeStr[0] = parseInt(realTimeStr[0]) + (timezoneOffset/-60);

  return realTimeStr.join(":");

}




// Get last meetings
getLastMeetings(home:string, away:string, num:number){
  if(this.selectedFixture["strHomeTeam"] != home && this.selectedFixture["strAwayTeam"] != away ){

    this.collapseSpinner = true;

    this._dataService.getLastMeetings(home,away).subscribe((res)=>{

    let recent = res["event"].filter(this.haveBeenPlayed).sort(this.sortFixtures);

    this.selectedFixture = recent.splice((recent.length-num),num)[0];

    this._dataService.getTeamRecentMatches(this.selectedFixture["idHomeTeam"]).subscribe((res)=>{
      this.homeRecentMatches = res["results"].filter(this.inEpl).splice(0,4);
    }, e=> console.error(e));

    this._dataService.getTeamRecentMatches(this.selectedFixture["idAwayTeam"]).subscribe((res)=>{
      this.awayRecentMatches = res["results"].filter(this.inEpl).splice(0,4);
    }, e=>{console.error(e)}, ()=>{this.collapseSpinner = !this.collapseSpinner});
    
    }, e=>console.error(e));
  
  };

 this.teamPositions = this.table.filter((position)=>{
   return position["name"] == home || position["name"] == away;
 });

}

}
