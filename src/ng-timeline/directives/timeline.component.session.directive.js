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
