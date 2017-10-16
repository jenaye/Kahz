import {Component, AfterViewChecked, ElementRef, ViewChild, OnInit} from '@angular/core';
import * as io from 'socket.io-client';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {

  constructor( private notif: NotificationsService ) {}
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  private message: string;
  private TouslesMessages: any[];
  private userid: string;
  private counter: any;
  private encrypt: any;

    public options = {
        position: ['top', 'right'],
        timeOut: 5000,
        lastOnBottom: true
    }
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
           this.notif.warn('New user connected', data.NewUser, {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true
          });
      })
      this.socket.on('counter', data => {
          this.counter = data.counter;
      })
      this.socket.on('LogoutSession', data => {
          this.notif.info('User disconnect', data.logoutMessage, {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true
          });

      })

    this.scrollToBottom();
  }

  send() {
      if(this.message.length < 0) {
        alert('Message vide')
    } else {
        this.encrypt = btoa(this.message);
        const data = {'message': this.encrypt, 'userid': this.userid }
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
