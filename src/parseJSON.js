// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  
  var type = arguments [1] || json[0];
  //var content = json.split(',') || json;
  
  //base case
  if(type === '{'){
    json = json.slice(1,json.length-1);
    type = {};
  }else if(type === '['){
    json = json.slice(1,json.length-1);
    type = [];
  }
  if(json.length>0){
  var content = json.split(',') || json;
  }else{
    return type;
  }
  console.log(type);
  //recursive
  if(Array.isArray(type)){
    return type;
  }
  if(typeof type === 'object'){
    //console.log('test1');
    if(content.length >0){
      var element = content.shift();
      element = element.split(':');
      element[0] = remove(element[0]);
      type[element[0]] = element[1];
      console.log(type);
      return parseJSON(content, type);
    }
  }
  return type;
};

var remove = function(string){
  if(Number(string) === NaN){
    var single = string.slice(1,string.length-1)
    return single;
  }else if(string === 'null'){
    return null;
  }else{
    var single = string.slice(1,string.length-1)
    return single;
  }
}

var tests = [
  '[]',
  '{"foo": ""}',
  '{}',
  '{"foo": "bar"}',
  '["one", "two"]',
  '{"a": "b", "c": "d"}',
  '[null,false,true]',
  '{"foo": true, "bar": false, "baz": null}',
  '[1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]',
  '{"boolean, true": true, "boolean, false": false, "null": null }',
  ];

tests.forEach(function(test){
  console.log('testing: ', parseJSON(test));
});

