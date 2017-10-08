import {Component, AfterViewChecked, ElementRef, ViewChild, OnInit} from '@angular/core';
import * as io from 'socket.io-client';

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
  private counter: any;
  private encrypt:any;

  title = 'Kahz';
  socket = io('http://localhost:8000');

  ngOnInit() {
      this.TouslesMessages = [];
      this.socket.on('userid', data => {
          this.userid = data.userid;
          this.socket.on('ShowMessage', data => {
                this.TouslesMessages = data.TouslesMessages;
          });
      })
      this.socket.on('new-connection', data => {
        alert('les gars il y a un nouveau mec qui est la' + data.NewUser)
      })
      this.socket.on('counter', data => {
        this.counter = data.counter;
      })
      
    this.scrollToBottom();
  }

  send() {
      if(this.message.length < 0) {
        alert('Message vide')
    } else {
        this.encrypt = btoa(this.message);
        const data = {'message': this.encrypt, 'userid': this.userid }
        console.log(this.encrypt)
        this.socket.emit('newMessage', data)
        // show decrypted message when user submit it
        data.message = atob(data.message);
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
