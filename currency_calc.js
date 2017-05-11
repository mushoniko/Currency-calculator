var myApp = angular.module("myApp",[]);

myApp.controller("CalcCtrl",CalcCtrl);


function CalcCtrl($scope,$http)
{
    $scope.cur_ar = ["USD","EUR"];
    
    $scope.amount_input = 1;
    $scope.from_cur = "USD";
    $scope.to_cur = "EUR";
    

    $scope.init = function() {
        $scope.loadAllCur();
        document.getElementById("anotherPage").style.display = "none";
    };
    
    
    $scope.ajaxCurFunc = function()
    {
     var _from = $scope.from_cur;
     var _to = $scope.to_cur;
     $http.get("http://apilayer.net/api/live?access_key=3c81786f9b3d2e267f40d08af97b97f2&currencies="+_from+","+_to)
             .then(function(response){
        $scope.cur = response.data;
            $scope.curDate = timeConverter($scope.cur.timestamp);
            var score = $scope.cur.quotes["USD"+_to]/$scope.cur.quotes["USD"+_from];
            
            $scope.cur_val = formatNumber(score);
            
     });
    };
    
    $scope.loadAllCur = function()
    {
        $http.get("http://apilayer.net/api/list?access_key=3c81786f9b3d2e267f40d08af97b97f2")
             .then(function(response){
        $scope.allCur_obj = response.data.currencies;
       
        for(var key in $scope.allCur_obj) {
            
            $scope.cur_ar.push(key);
        }
        $scope.ajaxCurFunc();
            
     });
    };
    
    
    $scope.changeSelectCur = function(){
        
        var tempFromCur = $scope.from_cur ;
        $scope.from_cur = $scope.to_cur;
        $scope.to_cur = tempFromCur;
        $scope.ajaxCurFunc();
    };
        
}

//functions from outsource
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function formatNumber(num)
{
    num *= 100000000;
    num = Math.round(num);
    num /= 100000000;
    return num;
}