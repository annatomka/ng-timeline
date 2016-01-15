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
