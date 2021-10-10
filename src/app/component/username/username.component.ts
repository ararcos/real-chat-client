import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent implements OnInit {
  @Output() userNameEvent= new EventEmitter<string>();
  username='';
  constructor() { }

  ngOnInit(): void {
  }
  setUsername(){
    this.userNameEvent.emit(this.username)
  }

}
