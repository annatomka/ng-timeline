'use strict';

describe('', function() {

  var module;
  var dependencies;
  dependencies = [];

  var hasModule = function(module) {
  return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function() {

  // Get module
  module = angular.module('ngTimeline');
  dependencies = module.requires;
  });

  it('should load config module', function() {
    expect(hasModule('ngTimeline.config')).to.be.ok;
  });

  
  it('should load filters module', function() {
    expect(hasModule('ngTimeline.filters')).to.be.ok;
  });
  

  
  it('should load directives module', function() {
    expect(hasModule('ngTimeline.directives')).to.be.ok;
  });
  

  
  it('should load services module', function() {
    expect(hasModule('ngTimeline.services')).to.be.ok;
  });
  

});