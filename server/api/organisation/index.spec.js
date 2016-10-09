'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var organisationCtrlStub = {
  index: 'organisationCtrl.index',
  show: 'organisationCtrl.show',
  create: 'organisationCtrl.create',
  upsert: 'organisationCtrl.upsert',
  patch: 'organisationCtrl.patch',
  destroy: 'organisationCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var organisationIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './organisation.controller': organisationCtrlStub
});

describe('Organisation API Router:', function() {
  it('should return an express router instance', function() {
    expect(organisationIndex).to.equal(routerStub);
  });

  describe('GET /api/organisations', function() {
    it('should route to organisation.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'organisationCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/organisations/:id', function() {
    it('should route to organisation.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'organisationCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/organisations', function() {
    it('should route to organisation.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'organisationCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/organisations/:id', function() {
    it('should route to organisation.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'organisationCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/organisations/:id', function() {
    it('should route to organisation.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'organisationCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/organisations/:id', function() {
    it('should route to organisation.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'organisationCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
