(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('ngTimeline.config', [])
      .value('ngTimeline.config', {
          debug: true
      });

  // Modules
  angular.module('ngTimeline.directives', []);
  angular.module('ngTimeline.filters', []);
  angular.module('ngTimeline.services', []);
  angular.module('ngTimeline',
      [
          'ngTimeline.config',
          'ngTimeline.directives',
          'ngTimeline.filters',
          'ngTimeline.services'
      ]);

})(angular);
