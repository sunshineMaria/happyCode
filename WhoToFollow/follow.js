var Offset = 0;
var dataList = [];
var refreshButton = $('.refresh');
var SHOWNUM = 3;
var innerContent = $( '.content' );
var AMOUNT = 0;

init();
refreshButton.on( 'click', refresh );
innerContent.on( 'click', '.close_btn', close );

//获得用户列表，存储在一个全局变量数组dataList中。
function getList() {
  $.ajax({
    url: 'users.json',
    type: 'GET',
    dataType: 'json',
    success: function( data ) {
      dataList = data;
      AMOUNT = dataList.length - 1;
      refresh();
    }
  })
}

function getSingle() {
    renderSingle()
}

function render( dataList ) {   
  for( var i = 0; i < SHOWNUM ; i ++ ){
    console.log( Offset );
    renderTpl( dataList[ Offset++ ] );
  }
}

function renderTpl ( data ) {
  var tpl = '<li class="user"><a href="javascript:void(0)" class="close_btn"> X </a><span class="user_avater" style="background-image: url('+data.avatar_url+')"></span>'+
            '<a href="https://github.com/mojombo" class="user_name">'+data.login+'</a></li>';
  $('.content').append( tpl ); 
}

function replaceTpl ( data, container ) {
  var tpl = '<a href="javascript:void(0)" class="close_btn"> X </a><span class="user_avater" style="background-image: url('+data.avatar_url+')"></span>'+
            '<a href="https://github.com/mojombo" class="user_name">'+data.login+'</a>';
  container.append( tpl );
  Offset ++;
}

function close() {
  if( Offset <= AMOUNT ){
    console.log( Offset );
    var container = $( this ).parent();
    container.empty();
    replaceTpl( dataList[Offset], container );
  }
}

function refresh() {
  if( Offset <= AMOUNT ) {
    if( Offset+3 > AMOUNT ) {
      SHOWNUM = AMOUNT - Offset + 1;
    }
    $( '.content' ).empty();
    render( dataList );
  }
}

function init() {
  getList();
}
