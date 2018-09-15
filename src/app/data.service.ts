import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

leagueTableUri = 'https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=4328&s=1819';
nextFixturesUri = 'https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4328';

  constructor(private _http:HttpClient) { }

  // Get the League table
  getTable(){
    return this._http.get(this.leagueTableUri);
  }

  // Get next league fixtures
  getNextFixtures(){
    return this._http.get(this.nextFixturesUri);
  }

}
