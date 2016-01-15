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

angular.module('ngTimeline.directives').directive('timelineComponent', [function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'src/ng-timeline/directives/timeline.component.directive.tpl.html',
        scope:{
            rows:'=',
          startDate: '='
        },
        link: function(scope, $element, attrs) {
            //$('.popover').remove();
            //$('html').on('click', function(e) {
            //    if (typeof $(e.target).data('original-title') === 'undefined') {
            //        $('[data-original-title]').popover('hide');
            //    }
            //});
        },
        controller: function ($scope) {
            $scope.$watch('rows', function (newItems, oldItems) {
                $('.popover').remove();
            });

        }
    };
}]);

angular.module('ngTimeline.directives').directive('timelineComponentRow', [function () {
  return {
    restrict: 'E',
    templateUrl: 'src/ng-timeline/directives/timeline.component.row.directive.tpl.html',
    replace: true,
    scope: {
      row: '=',
      startDate: '='
    },
    link: function ($scope, $element, attrs) {
      $scope.isToday = moment().diff($scope.startDate, 'days') === 0;

      $scope.$watch('startDate', function () {
        var dayStart = new Date(
          $scope.startDate.getFullYear(),
          $scope.startDate.getMonth(),
          $scope.startDate.getDate());
        var dayEnd = new Date(dayStart.getFullYear(), dayStart.getMonth(), dayStart.getDate() + 1);
        var dayDuration = dayEnd.getTime() - dayStart.getTime();

        var actualDate = new Date();

        var now = actualDate;
        var then = dayStart;


        var diffNowThen = moment.utc(moment(now).diff(moment(then)));
        var diffDay = moment.utc(moment(dayEnd).diff(moment(dayStart)));

        $scope.todayOffset = diffNowThen / diffDay;
        $scope.isToday = moment().diff($scope.startDate, 'days') === 0;
      });
    }
  };
}]);

angular.module('ngTimeline.directives').directive('timelineComponentSession', [
  '$timeout', '$window', '$rootScope',
  function ($timeout, $window, $rootScope) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'src/ng-timeline/directives/timeline.component.session.directive.tpl.html',
      scope: {
        session: '='
      },
      link: function (scope, element, attrs) {
        var $element = $(element);
        function onResize() {
          $element.width(scope.sessionDurationPercentage * 100 + '%');
          $timeout(function () {
            var translationValue = $element.parent().width() * scope.sessionOffsetPercentage;
            $element.css('transform', 'translateX(' + translationValue + 'px)');
            $element.css('opacity', 1);
          }, 200);
        }

        var w = $($window);
        scope.getWindowDimensions = function () {
          return {
            'h': w.height(),
            'w': w.width()
          };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
          onResize();
        }, true);

        w.bind('resize', function () {
          scope.$apply();
        });

        //scope.onClick = function(e){
        //    if(e.ctrlKey){
        //        $('.popover').remove();
        //        $(e.currentTarget).popover('show');
        //    }else{
        //        console.log('time line clicked, session id: ' + scope.session.Id);
        //    }
        //};
      },
      controller: function ($scope) {
        var dayStart = new Date(
          $scope.session.startTime.getFullYear(),
          $scope.session.startTime.getMonth(),
          $scope.session.startTime.getDate());
        var dayEnd = new Date(dayStart.getFullYear(), dayStart.getMonth(), dayStart.getDate() + 1);
        var dayDuration = dayEnd.getTime() - dayStart.getTime();

        var sessionStart = $scope.session.startTime;
        var sessionEnd = $scope.session.endTime;

        var sessionOffset = sessionStart.getTime() - dayStart.getTime();
        var sessionDuration = sessionEnd.getTime() - sessionStart.getTime();

        $scope.sessionOffsetPercentage = sessionOffset / dayDuration;
        $scope.sessionDurationPercentage = sessionDuration / dayDuration;
        var dateFormat = 'YYYY.MM.DD. HH:mm';
        $scope.sessionContent = ['Start time: ',
          moment($scope.session.startTime).format(dateFormat),
          '<br/>', 'End time: ',
          moment($scope.session.endTime).format(dateFormat)].join(' ');


      }
    };
  }]);

angular.module('ngTimeline.directives')
  .directive('timelineComponentUnit', [
    '$timeout','$window',
    function ($timeout, $window) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'src/ng-timeline/directives/timeline.component.unit.directive.tpl.html',
        scope: {
            session: '=',
            index: '=',
            unit: '='
        },
        link: function (scope, element, attrs) {
          var $element = $(element);
            function onResize(){
                var delay = 0.1 + scope.index*0.05;
                $element.css('transition-delay',delay +'s');
                $element.width(scope.unitDurationPercentage*100 + '%');
                $timeout(function () {

                    $element.css('transform', 'translateX(' +
                      $element.parent().width()*scope.unitOffsetPercentage + 'px)');
                    $element.css('opacity', 1);
                },300);
            }

            var w = $($window);
            scope.getWindowDimensions = function () {
                return {
                    'h': w.height(),
                    'w': w.width()
                };
            };
            scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
                onResize();
            }, true);

            w.bind('resize', function () {
                scope.$apply();
            });

            scope.onClick = function(e){
                if(e.ctrlKey){
                    $('.popover').remove();
                    $(e.currentTarget).popover('show');
                    e.stopPropagation();
                }
            };

        },
        controller: function ($scope) {
            var sessionStart = $scope.session.startTime;
            var sessionEnd = $scope.session.endTime;
            var sessionDuration = sessionEnd.getTime() - sessionStart.getTime();

            var unitStart = $scope.unit.startTime;
            var unitEnd = $scope.unit.endTime;

            var unitOffset = unitStart.getTime() - sessionStart.getTime();
            var unitDuration = unitEnd.getTime() - unitStart.getTime();

            $scope.unitOffsetPercentage = unitOffset/ sessionDuration;
            $scope.unitDurationPercentage = unitDuration/ sessionDuration;

            var dateFormat = 'YYYY.MM.DD. HH:mm';
            $scope.unitContent = 'Start time: ' +
              moment($scope.unit.startTime).format(dateFormat) + '<br/>' +
              'End time: ' +
              moment($scope.unit.endTime).format(dateFormat);
        }
    };
}]);
