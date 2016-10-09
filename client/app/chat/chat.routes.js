'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('chat', {
      url: '/chat/:id',
      template: '<chat></chat>'
    });
}
