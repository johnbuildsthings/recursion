// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
	var element = arguments[1] || document.body;
  var hasClass = arguments[2] || [];
  var children = Array.prototype.slice.call(element.childNodes);                    

  if(element.classList !== undefined){
    for(var i=0;i<element.classList.length;i++){
      if(element.classList[i] === className){
        hasClass.push(element);
      }
    }
  }

  if(children.length >= 1){
    for(var n=0;n<children.length;n++){
      element = children[n];
      var has = getElementsByClassName(className, element, hasClass);
      hasClass.concat(has);
    }
  }
  return hasClass;

};
