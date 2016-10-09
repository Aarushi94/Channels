'use strict';

import angular from 'angular';

import uiRouter from 'angular-ui-router';

import routing from './account.routes';
import login from './login';
import settings from './settings';
import signup from './signup';
import oauthButtons from '../../components/oauth-buttons';
import signupOrganisation from './signupOrganisation';
export default angular.module('yoCollabaApp.account', [uiRouter, login, settings, signup,
    oauthButtons, signupOrganisation
  ])
  .config(routing)
  .run(function($rootScope) {
    'ngInject';

    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if(next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  })
  .name;
