import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

leagueTableUri = 'https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=4328&s=1819';
nextFixturesUri = 'https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4328';
thisRoundsFixturesUri = 'https://www.thesportsdb.com/api/v1/json/1/eventsround.php?id=4328'; 

teams:any = {
  133604 : "ARS",
  133610 : "CHE",
  133613 : "MCI",
  133612 : "MUN",
  133602 : "LIV",
  133624 : "WAT",
  133626 : "LEI",
  133616 : "TOT",
  133636 : "WHU",
  134777 : "NEW",
  134778 : "SOU",
  133632 : "CRY",
  134301 : "BOU",
  133615 : "EVE",
  133600 : "FUL",
  133637 : "CAR",
  133932 : "HUD",
  133623 : "BUR",
  133619 : "BHA",
  133599 : "WOL"


}

  constructor(private _http:HttpClient) { }

  // Get the League table
  getTable(){
    return this._http.get(this.leagueTableUri);
  }

  // Get next league fixtures to get this round.
  getNextGeneralFixtures(){
    return this._http.get(this.nextFixturesUri);
  }

  // Get Fixtures for current round
  getNextRoundFixtures(round:string){
    return this._http.get(`${this.thisRoundsFixturesUri}\&r=${round}\&s=1819`)
  }



}
