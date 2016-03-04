var chatroomgl =[];  var num = 0;

  var names = ["Sale Support Chatroom", "The Fun One", "Something", "Chat2 "]
  while (num < 4) {
    chatroomgl[num] = {"name": names[num], "id": num};
    num++;
  }

route('/', 'home', function () {
  this.chatrooms = [];
   this.chatrooms = chatroomgl;

  console.log(this);
});

route('/chatroom/new', 'newchattroom', function () {


});

route('/chatroom/:id', 'chatroom', function (id) {
  console.log(id);
  this.id = id;
  this.name = 'Loading...';

  // Simulating an Ajax call which take 0.5 s
  setTimeout(function () {
    this.name = chatroomgl[this.id].name;
  }.bind(this), 500);
});

route('404', '404', function () {
  this.greeting = '404 ';
  this.moreText = 'Loading...';
});
