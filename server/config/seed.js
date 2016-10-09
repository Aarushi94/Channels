/**
* Populate DB with sample data on server start
* to disable, edit config/environment/index.js, and set `seedDB: false`
*/

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Organisation from '../api/organisation/organisation.model';
import Team from '../components/models/team.model';
import Channel from '../components/models/channel.model';

Thing.find({}).remove()
.then(() => {
  Thing.create({
    name: 'Development Tools',
    info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
    + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
    + 'Stylus, Sass, and Less.'
  }, {
    name: 'Server and Client integration',
    info: 'Built with a powerful and fun stack: MongoDB, Express, '
    + 'AngularJS, and Node.'
  }, {
    name: 'Smart Build System',
    info: 'Build system ignores `spec` files, allowing you to keep '
    + 'tests alongside code. Automatic injection of scripts and '
    + 'styles into your index.html'
  }, {
    name: 'Modular Structure',
    info: 'Best practice client and server structures allow for more '
    + 'code reusability and maximum scalability'
  }, {
    name: 'Optimized Build',
    info: 'Build process packs up your templates as a single JavaScript '
    + 'payload, minifies your scripts/css/images, and rewrites asset '
    + 'names for caching.'
  }, {
    name: 'Deployment Ready',
    info: 'Easily deploy your app to Heroku or Openshift with the heroku '
    + 'and openshift subgenerators'
  });
});

var user1=new User({name:'a', email:'a@gmail.com',password:'123'});
var user2=new User({name:'b', email:'b@gmail.com',password:'123'});
var user3=new User({name:'c', email:'c@gmail.com',password:'123'});
var user4=new User({name:'d', email:'d@gmail.com',password:'123'});
var user6=new User({name:'e', email:'e@gmail.com',password:'123'});
var user5=new User({name:'f', email:'f@gmail.com',password:'123'});
var user7=new User({name:'g', email:'g@gmail.com',password:'123'});
var user8=new User({name:'h', email:'h@gmail.com',password:'123'});
var user9=new User({name:'ij', email:'ij@gmail.com',password:'123'});
User.find({}).remove().then(()=>{
  User.create(user1, user2, user3, user4, user5, user6, user7, user8,user9).then(()=>{
    Organisation.find({}).remove().then(()=>{
      var org = new Organisation({name: 'Niit Technologies', email: 'niit@gmail.com',members:[user1._id,user2._id,user3._id,user4._id,user5._id,user6._id,user7._id,user8._id], teams:[]});
      org.save();

      //team code
      var team1=new Team({name:'HR',organisation:org._id,members:[{member:user1._id,role:'team_admin'},{member:user2._id,role:'user'},{member:user5._id,role:'user'},{member:user7._id,role:'user'},{member:user9._id,role:'user'}]});
      var team2=new Team({name:'IT',organisation:org._id,members:[{member:user3._id,role:'team_admin'},{member:user4._id,role:'user'},{member:user6._id,role:'user'},{member:user8._id,role:'user'},{member:user9._id,role:'user'}]});
      Team.find({}).remove().then(()=>{
        Team.create(team1,team2).then(()=>{
          Organisation.findById(org._id).exec().then(org => {
            org.teams.push(team1._id);
            org.teams.push(team2._id);
            org.save();
          });

          //Channel code
          var channel1=new Channel({name:'maask',team:team1._id,members:[user1._id,user2._id,user7._id]});
          var channel2=new Channel({name:'logistics',team:team1._id,members:[user1._id,user5._id,user7._id,user9._id]});
          var channel3=new Channel({name:'developers',team:team2._id,members:[user3._id,user4._id,user8._id,user9._id]});
          var channel4=new Channel({name:'testers',team:team2._id,members:[user3._id,user6._id,user8._id]});
          Channel.find({}).remove().then(()=>{
            Channel.create(channel1,channel2,channel3,channel4).then(()=>{
              Team.findById(team1._id).exec().then(team => {
                team.channels.push(channel1._id);
                team.channels.push(channel2._id);
                team.save();
              });

              Team.findById(team2._id).exec().then(team => {
                team.channels.push(channel3._id);
                team.channels.push(channel4._id);
                team.save();
              });

              User.findById(user1._id).exec().then(user => {
                user.organisation=org._id;
                user.channels.push(channel1._id);
                user.channels.push(channel2._id);
                user.teams.push(team1._id);
                user.save();
              });

              User.findById(user2._id).exec().then(user => {
                user.organisation=org._id;
                user.channels.push(channel1._id);
                user.teams.push(team1._id);
                user.save();
              });

              User.findById(user3._id).exec().then(user => {
                user.organisation=org._id;
                user.channels.push(channel3._id);
                user.channels.push(channel4._id);
                user.teams.push(team2._id);
                user.save();
              });

              User.findById(user4._id).exec().then(user => {
                user.organisation=org._id;
                user.channels.push(channel3._id);
                user.teams.push(team2._id);
                user.save();
              });

              User.findById(user5._id).exec().then(user => {
                user.organisation=org._id;
                user.channels.push(channel2._id);
                user.teams.push(team1._id);
                user.save();
              });

              User.findById(user6._id).exec().then(user => {
                user.organisation=org._id;
                user.channels.push(channel4._id);
                user.teams.push(team2._id);
                user.save();
              });

              User.findById(user7._id).exec().then(user => {
                user.organisation=org._id;
                user.channels.push(channel1._id);
                user.channels.push(channel2._id);
                user.teams.push(team1._id);
                user.save();
              });

              User.findById(user8._id).exec().then(user => {
                user.organisation=org._id;
                user.channels.push(channel3._id);
                user.channels.push(channel4._id);
                user.teams.push(team2._id);
                user.save();
              });

              User.findById(user9._id).exec().then(user => {
                user.organisation=org._id;
                user.channels.push(channel3._id);
                user.channels.push(channel2._id);
                user.teams.push(team1._id);
                user.teams.push(team2._id);
                user.save();
              });
            });
          });
        });
      });
    });
  });
});
