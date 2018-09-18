import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  thisRoute:String;
  constructor(private activatedRoute: ActivatedRoute, private router:Router ) { }

  ngOnInit() {
   
  }

  get getThisRoute(){
    return this.activatedRoute.snapshot.children["0"].routeConfig.path;
  }

  goTo(component){
    this.router.navigateByUrl(`home/${component}`)
  }

}
