var coffer = (function () {
  var asyncGet,
      syncGet,
      create;
  
  asyncGet = function (url, callback) {
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      }
    };
    
    // method, url, async
    xhr.open('GET', url, true);
    
    xhr.send();
  };
  
  syncGet = function (url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();
    return JSON.parse(xhr.responseText);
  };
  
  create = function (someJson) {
    var extract, data;
    
    data = (Object.prototype.toString.call(someJson) === "[object Array]") ? someJson : [someJson];

    extract = function (accessor, def) {
      var keysToTry = accessor.split('.'), 
          currentValue = data[0];
          
      for (var i = 0, len = keysToTry.length; (i < len) && (currentValue !== undefined); (i+=1)) {
        currentValue = currentValue[keysToTry[i]];
      }
      
      return currentValue ? currentValue : def;
    };
    
    return {
      extract: extract
    };
  };
  
  return {
    asyncGet: asyncGet,
    syncGet: syncGet,
    create: create
  };
}());
