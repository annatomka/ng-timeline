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
