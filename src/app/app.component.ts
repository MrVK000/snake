import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Snake Game';
  info: string = 'Press space to pause or continue the game';
  scoreValue: number = 0;
  gameBoard=document.getElementById('gameBoard');
  // context=this.gameBoard?.getContext('2d');


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.context
  }




}
