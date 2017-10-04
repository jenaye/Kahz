import { Component } from '@angular/core';
import * as io from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private message: string;
  private AllMessage: any;
  private TouslesMessages:any;
  title = 'Kahz';
  socket = io('http://localhost:8000');

  /*
  init on recupere les messages du tableau
   */
    ngOnInit() {
          this.socket.on('ShowMessage', data =>{
              this.TouslesMessages = data;
              console.log(data)
          })
    }

    send(){
      this.socket.emit('new', { "message": this.message, "userid ": new Date() })
        this.socket.on('ShowMessage', data =>{
            this.TouslesMessages = data;
            console.log(data)
        })
    }


}
