import {Component} from '@angular/core';
import * as io from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private message: string;
  private TouslesMessages: any[];
  title = 'Kahz';
  socket = io('http://localhost:8000');

  /*
  init on recupere les messages du tableau
   */
  ngOnInit() {
    this.TouslesMessages = [];
    this.socket.on('ShowMessage', data => {
      this.TouslesMessages = data.TouslesMessages;
    })
  }

  send() {
    let data = {"message": this.message, "userid ": new Date()}
    this.socket.emit('new', data)
    this.TouslesMessages.push(data)
  }


}
