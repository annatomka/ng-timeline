var app = angular.module('timelineTest', [
  'ngTimeline'
]);

app.run(function () {
  console.log("timeline test initiated")
});

app.controller("TestController",["$scope", function($scope){
  $scope.rows = [
    {
      "label": "Ádi",
      "items": [
        {
          "startTime": new Date("Fri Jan 15 2016 10:00:00 GMT+0100 (CET)"),
          "endTime": new Date("Fri Jan 15 2016 18:30:00 GMT+0100 (CET)"),
          "subItems": [
            {
              "startTime": new Date("Fri Jan 15 2016 12:00:00 GMT+0100 (CET)"),
              "endTime": new Date("Fri Jan 15 2016 13:30:00 GMT+0100 (CET)")
            }
          ]
        }
      ]
    },
    {
      "label": "Panno",
      "items": [
        {
          "startTime": new Date("Fri Jan 15 2016 13:30:00 GMT+0100 (CET)"),
          "endTime": new Date("Fri Jan 15 2016 20:00:00 GMT+0100 (CET)"),
          "subItems": [
            {
              "startTime": new Date("Fri Jan 15 2016 14:00:00 GMT+0100 (CET)"),
              "endTime": new Date("Fri Jan 15 2016 14:30:00 GMT+0100 (CET)")
            }
          ]
        }
      ]
    }
  ];

  $scope.startDate = new Date("Fri Jan 15 2016 06:00:00 GMT+0100 (CET)");
}]);
