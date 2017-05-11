  /* global myApp */

myApp.controller("TabsCtrl",TabsCtrl);

function TabsCtrl($scope)
{
    $scope.king = "prince";
    $scope.showAnotherPage = function()
    {
        
        document.getElementById("mainCalc").style.display = "none";
        document.getElementById("anotherPage").style.display = "block";
    };
    $scope.showCalcPage = function()
    {
        
        document.getElementById("mainCalc").style.display = "block";
        document.getElementById("anotherPage").style.display = "none";
    };
}
