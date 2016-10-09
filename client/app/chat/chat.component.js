'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routes from './chat.routes';

export class ChatComponent {
  message = '';
  info='';
  teams=[];
  channels=[];
  channelId='';
  chatHistory=[];
  id='';
  userName='';
  /*@ngInject*/
  constructor(socket,$http,$stateParams) {
    this.socket = socket;
    this.$http = $http;
    this.id=$stateParams.id;
  }

//On intializing the controller
  $onInit() {
    //Get user Info, Organisations, Teams and channels
    this.$http.get('/api/users/getUserInfo/'+this.id)
    .then(response => {
      //On response from the api
      console.log("responde data: "+response.data);
      //set the userName
      this.userName=response.data.name;
      //Get all teams for that user and set in select option
      this.teams = response.data.teams;
      //Set the default team name in the select option
      this.selectedTeam = this.teams[0].name;
      //TODO: change channels according to teams
      for (var i = 0; i < response.data.channels.length; i++) {
        this.channels.push(response.data.channels[i]);
      }
      //set default channel id
      this.channelId = response.data.channels[0]._id;

      //Connect to that room for chatting
      this.socket.room(this.channelId);

      //Set history in the chatHistory array coming from the api
      if(response.data.channels[0].history.length != 0){
        for (var i = 0; i < response.data.channels[0].history.length; i++) {
          this.chatHistory.push({sender: response.data.channels[0].history[i].user,message: response.data.channels[0].history[i].message });

        }
      }
      console.log("InitMethod channel: "+this.channelId);

    });
    //Updating chat messages when new message is set on the room
    this.socket.syncUpdatesChats(data=>{
      this.chatHistory.push({sender: data.sender, message: data.message});
    });

  }

  teamChange(){

    console.log("team change method called");
    console.log(this.selectedTeam._id);
  }

// On changing channel, click method
  channelClick(channel){
    //Empty the chat history
    this.chatHistory= [];
    //Set new channelId in the current scope
    this.channelId=channel._id;
    //Set new chat room on the server side
    this.socket.room(this.channelId);
    //Hit the api to get chat history for current channel id
    this.$http.get('/api/users/getChannelInfo/'+this.id+"/"+this.channelId)
    .then(response => {
      console.log("channel: "+this.channelId);
      console.log(response.data);
      //Set history in the chatHistory array coming from the api
      if(response.data.history.length != 0){
        for (var i = 0; i < response.data.history.length; i++) {
          this.chatHistory.push({sender: response.data.history[i].user,message: response.data.history[i].message });
        }
      }
    });
  }


  sendMessage(){
    console.log(this.message);
    //If the input field is not empty
    if(this.message){
      //Emit the socket with senderName, message and channelId
      this.socket.sendMessage({'sender':this.userName,'message':this.message,'room':this.channelId});
      //Hit api to update chat history in the db
      this.$http.post('/api/users/saveMessage/'+this.channelId,{data:{'user':this.userName,'message':this.message,'type':'text'}})
      .then(response => {
        console.log(response.data);
      });
      //Empty the input field
      this.message='';
    }
  }
}

export default angular.module('yoCollabaApp.chat', [uiRouter])
.config(routes)
.component('chat', {
  template: require('./chat.html'),
  controller: ChatComponent,
  controllerAs: 'chatCtrl'
})
.name;
