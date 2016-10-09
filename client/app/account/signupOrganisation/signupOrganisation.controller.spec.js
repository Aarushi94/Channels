'use strict';

describe('Controller: SignupOrganisationCtrl', function() {
  // load the controller's module
  beforeEach(module('yoCollabaApp.signupOrganisation'));

  var SignupOrganisationCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    SignupOrganisationCtrl = $controller('SignupOrganisationCtrl', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
