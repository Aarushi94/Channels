'use strict';

describe('Component: ChatComponent', function() {
  // load the controller's module
  beforeEach(module('yoCollabaApp.chat'));

  var ChatComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ChatComponent = $componentController('chat', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
