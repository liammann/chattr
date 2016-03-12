
function xhrSuccess () { 
  this.callback.apply(this, this.arguments);
}
function xhrError () { }

function dataAPI (method, sURL, data, fCallback, arguments1) {
  var oReq = new XMLHttpRequest();
  oReq.callback = fCallback;
  oReq.arguments = Array.prototype.slice.call(arguments, 3);
  oReq.onload = xhrSuccess;
  oReq.onerror = xhrError;
  oReq.open(method, ""+sURL, true);
    oReq.setRequestHeader("Content-type", "application/json");

  oReq.send(data);
}





var chatroomgl =[];  var num = 0;

  var names = ["Sale Support Chatroom", "The Fun One", "Something", "Chat2 "]
  while (num < 4) {
    chatroomgl[num] = {"name": names[num], "id": num};
    num++;
  }

route('/', 'home', function () {
  this.chatrooms = [];
  var this2 = this;
  dataAPI('GET',BASE_URL+'api/v1/users/'+USER_ID+'/chatrooms', null, function () {
    var responseText = JSON.parse(this.responseText);
    if(this.status !== 404){
      this2.chatrooms = responseText['data'];
    }
  }, this2);


}, function () {});

route('/chatroom/new', 'newchattroom', function () {

}, function () {
  var numberOfSiteConfigs = 0;
  numberOfSiteConfigs = addSiteConfig(numberOfSiteConfigs);

  document.getElementById('add-site-config').addEventListener('click', function(){
    numberOfSiteConfigs = addSiteConfig(numberOfSiteConfigs);
  });
  document.getElementById('add-new').addEventListener('click', function(e){ //submit event
    submitChatroom();
  });

});


route('/chatroom/:id', 'chatroom', function (id) {
  this.id = id;
  var this2 = this;

  dataAPI('GET',BASE_URL+'api/v1/users/'+USER_ID+'/chatrooms/'+id, null, function () {
    var response = JSON.parse(this.responseText);
    if(this.status !== 404){
      console.log(response);
    }
  }, this2);



}, function () {
 
 
});

function submitChatroom(type = 'POST'){
  data = {};
  siteConfigs = [];
  data.name = document.getElementById('name').value;

  var siteConfigBox = document.getElementsByClassName('site-config');
  for (var i = 0; i < siteConfigBox.length; i++) {
      siteConfigs[siteConfigBox[i].id] = {};
      siteConfigs[siteConfigBox[i].id]['siteId'] = siteConfigBox[i].id;
      siteConfigs[siteConfigBox[i].id]['siteURL'] = siteConfigBox[i].childNodes[1].childNodes[3].value;
      siteConfigs[siteConfigBox[i].id]['siteBGColour'] = siteConfigBox[i].childNodes[3].childNodes[3].value;
      siteConfigs[siteConfigBox[i].id]['siteTextColour'] = siteConfigBox[i].childNodes[5].childNodes[3].value; 
  }
  sites = [];
  for (var i = siteConfigs.length - 1; i >= 0; i--) {
    if(siteConfigs[i] !== undefined){
      sites[i] = siteConfigs[i];
    }
  }
  data.sites = sites;

  dataAPI(type,BASE_URL+'api/v1/users/'+USER_ID+'/chatrooms',  JSON.stringify({'chat_room': data}), function () {
    var responseText = JSON.parse(this.responseText);
  }, null);
}

function addSiteConfig(num){
  var div = document.createElement('div');
  var tmpl = document.getElementById('site-template').innerHTML;

  div.innerHTML = tmpl;
  var elements = div.childNodes[1];
  elements.id = num;
  elements.className = 'site-config';
  document.getElementById('site-configs-con').appendChild(elements);

  var removeBtns = document.getElementsByClassName('remove-site-config');
  for (var i = removeBtns.length - 1; i >= 0; i--) {
    removeBtns[i].addEventListener('click', function(){
      this.parentNode.parentNode.removeChild(this.parentNode);
      siteConfigs.pop(this.parentNode.id);
    });
  }
  return num++;
}





route('404', '404', function () {
  this.greeting = '404 ';
  this.moreText = 'Loading...';
}, function () {});
