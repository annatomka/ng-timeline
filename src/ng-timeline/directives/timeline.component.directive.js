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
