$('#showbut').click(function(){
    $('#firstcontent').hide();
    $('.mastfoot').hide();
    $('#secondcontent').show();
    //$('#player')[0].play();
    return false;
});

$('#hidebut').click(function(){
	$('#secondcontent').hide();
    $('#firstcontent').show();
    $('.mastfoot').show();
    $('#player').stop();
    return false;
});

$(".img-thumbnail").on('click', function(e) {
    var modal = $('#modalimg');
    modal.css('width', '73%');
    modal.css('height', 'auto');
    modal.css('overflow', 'auto');
    modal.css('position', 'fixed');
    modal.css('margin', 'auto');
    modal.css('top', 40);
    modal.css('left', 0);
    modal.css('bottom', 0);
    modal.css('right', 0);
    modal.css('z-index', 999);
    modal.attr('src', $(e.target).attr('src'));
    modal.show();
});

$("#modalimg").on('click', function(e){
    $(this).hide();
});

