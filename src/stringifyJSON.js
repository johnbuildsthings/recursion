// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

//var exports = module.exports = {};
var stringifyJSON = function(set) {
  var stack = arguments[1] || '';
  var element;
  var base = function(element){
    var stack = arguments[1] || '';
    //base case
    if(typeof element === 'string'){
      stack += '"'+element+'"';
    }else if(typeof element === 'number' || typeof element ==='boolean' || String(element) ==='null'){
      stack += String(element);
    }
    return stack;
  }

  if(Array.isArray(set)){
    var arr = set.slice(0,set.length);
    stack = arguments[1] || '[';
    element = arr.shift();
    stack = base(element, stack);
    if(Array.isArray(element) || (typeof element === 'object' && element !== null)){
      stack += stringifyJSON(element);
      if(arr.length>0){
        stack += ',';
      }
      return stringifyJSON(arr, stack);
    }else if(arr.length>0){
      stack+=',';
      return stringifyJSON(arr, stack);
    }else{
      stack+=']';
      return stack;  
    }
  }else if(typeof set === 'object' && set !== null){
    var keys = Object.keys(set);  
    var count = arguments[2] || 0;
    var stack = arguments[1] || '{';

    //key and value
    var element = keys[count];
    var value = set[keys[count]];

    //test for undefined and functions
    if(value === undefined || typeof value === 'function' || count>keys.length){
      if(count++ === keys.length){
        return stack + '}';
      }
      return stringifyJSON(set, stack, count++);
    }

    //base case
    stack = base(element, stack);
    
    //recursive cases
    if((typeof value === 'object' && value !== null)|| Array.isArray(value)){
      if(value !== undefined || typeof value !== 'function'){
        stack += ':' + stringifyJSON(value);
        if(count++ < keys.length-1){
          stack +=',';
        }
      }else{count++}
      return stringifyJSON(set, stack, count);
    }else if(count <= keys.length){
      value = base(value);
      if(count++ < keys.length){
        stack += ':'+value;
        if(count < keys.length){
          stack += ',';
        }
        return stringifyJSON(set, stack, count);
      }else{
        stack += '}';
        return stack;
      }
    }
  }else{
    stack = base(set);
    return stack;
  }
};
