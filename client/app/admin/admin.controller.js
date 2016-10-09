'use strict';

export default class AdminController {

  /*@ngInject*/
  constructor(User,Auth) {
    this.Auth = Auth;
    // Use the User $resource to fetch all users

    this.users = User.query();
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
  approve(user,id){
    this.Auth.approve(id)
    .then(() => {
      this.users.splice(this.users.indexOf(user), 1);
    });

  }
}
