// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
	var element = arguments[1] || document.body;
  var hasClass = arguments[2] || [];
  var children = arguments[3] || Array.prototype.slice.call(element.childNodes);                    

  //base case
  if(element.classList !== undefined){
    for(var i=0;i<element.classList.length;i++){
      if(element.classList[i] === className){
        hasClass.push(element);
      }
    }
  }
  
  //recursive
  if(children.length >= 1){
    element = children.shift();
    if(element.childNodes.length >= 0){
      hasClass.concat(getElementsByClassName(className, element, hasClass));
      element = children.shift();
      if(element === undefined){
        return hasClass;
      }
      return getElementsByClassName(className, element,hasClass,children);
    }else{
      return getElementsByClassName(className, element, hasClass, children);
    }
  }
  return hasClass;

};
