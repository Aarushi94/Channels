'use strict';

import angular from 'angular';
import SignupOrganisationController from './signupOrganisation.controller';

export default angular.module('yoCollabaApp.signupOrganisation', [])
  .controller('SignupOrganisationController', SignupOrganisationController)
  .name;
