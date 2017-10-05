import {Component, AfterViewChecked, ElementRef, ViewChild, OnInit} from '@angular/core';
import * as io from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  private message: string;
  private TouslesMessages: any[];
  private userid: string;

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
    this.socket.on('userid', data => {
      this.userid = data.userid;
      console.log(this.userid) // un id
    })
   this.scrollToBottom();
  }

  send() {
    /*
    check if string != null
    */
    if(this.message == ''){
      console.log('desole string vide')
    }else{
      let data = {"message": this.message, "userid ": new Date()}
      this.socket.emit('new', data)
      this.TouslesMessages.push(data)
    }

  }

  ngAfterViewChecked() {
      this.scrollToBottom();
  }

  scrollToBottom(): void {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }
  }


}
