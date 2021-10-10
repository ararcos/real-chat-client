import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'socket.io-client';
import { MessageI } from './model/message.interface';
import { UserI } from './model/user.interface';

import * as client from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  spinner = false;
  username = '';
  stringMessage = '';
  messageList: MessageI[] = [];
  userList: UserI[] = [];
  socket!: Socket;
  @ViewChild("messages_list") divMessage!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  updateUserName(name:string):void{
    this.username = name;
    this.conectChatServe();
  }
  conectChatServe(){
    this.spinner=true;
    this.socket = client.io(`${environment.chatServer}/?name=${this.username}`);
    this.socket.on('users',(users:UserI[])=>{
      this.userList = users;
    });
    
    this.socket.on('messages',(messages: MessageI[])=>{
      this.messageList = messages.map((element)=>{
        element.mine = element.user?.name==this.username;
        this.spinner = false;
        return element;
      });
    });

    this.socket.on('chat',(message:MessageI)=>{
      if(message){
        message.mine = message.user?.name==this.username;
        this.messageList.push(message);
      }
    });
  }

  sendMessage(){
    let newMessage : MessageI = {message:this.stringMessage,mine:true,user:{name:this.username}};
    this.socket.emit('chat',newMessage);
    this.messageList.push(newMessage);
    this.stringMessage ='';
  }

  desconectServer(){
    this.userList=[];
    this.messageList=[];
    this.username='';
    this.socket.disconnect()
  }
  ngAfterViewChecked(): void {
    this.divMessage.nativeElement.scrollTop=this.divMessage.nativeElement.scrollHeight;    
  }
}
