import './style.scss';

$('a[name=downlist]').click(function(){
    $('#downlist').slideToggle(500);
});

const msg: string = 'Test';
alert(msg);