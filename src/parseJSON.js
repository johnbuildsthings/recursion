// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  
  var type = arguments [1] || json[0];
  //var content = json.split(',') || json;
  //console.log(json);
  //base case
  if(type === '{'){
    json = json.slice(1,json.length-1);
    type = {};
  }else if(type === '['){
    json = json.slice(1,json.length-1);
    type = [];
  }
  console.log(json);
  var pattern = /,(?=([^"\\]*(\\.|"([^"\\]*\\.)*[^\\]*"))*[^"]*$)/g;
  var pattern2 = /\,(?=([^"]*"[^"]*")*[^"]*$)/g;
  if(json.length>0){
    var content;
    if(Array.isArray(json)){
      content = json;
    }else{
    content = json.split(pattern2);
    }
  }else{
    return type;
  }
  console.log(content);
  //recursive
  if(Array.isArray(type)){
    return type;
  }
  if(typeof type === 'object'){
    //console.log('test1', content);
    if(content.length >0){
      var element = content.shift();
      element = element.split(': ');
      type[remove(element[0])] = remove(element[1]);
      //content = (',').join(content);
      return parseJSON(content, type);
    }
  }
  return type;
};

var remove = function(string){
  var reg = /"/g;
  console.log('string: ', string);
  string = string.replace(reg, '');
  if(string === 'true'){
    return true
  }else if (string === 'false'){
    return false;
  }else if (string === 'null'){
    return null
  }
  return string;
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
  console.log('control: ', JSON.parse(test));
});

