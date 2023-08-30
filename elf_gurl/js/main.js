var main_win = document.getElementsByClassName('window-container')[0],
    btnPressed = false,
    playBtn = document.getElementById( 'playButton' ),
    _body = document.getElementById( 'body' ),
    _browser;


function effect (e) {
    var ax = -(window.innerWidth / 2 - e.pageX) / 40;
    var ay = (window.innerHeight / 2 - e.pageY) / 30;
    main_win.style.cssText = "-webkit-transform: rotate3d( "+ ay +" , "+ ax +", 0, 10deg);" +
        "-moz-transform: rotate3d( "+ ay +" , "+ ax +", 0, 10deg);" +
        "-ms-transform: rotate3d( "+ ay +" , "+ ax +", 0, 10deg);" +
        "transform: rotate3d( "+ ay +" , "+ ax +", 0, 10deg);";
}

function animationWindow(){

    var b_window = document.getElementById('dv');

    b_window.style.cssText = 'transform-style: preserve-3d;' +
        '-webkit-transform-style: preserve-3d;' +
        '-moz-transform-style: preserve-3d;' +
        '-o-transform-style: preserve-3d;' +
        'transform: rotateY( 360deg );' +
        '-webkit-transform: rotateY( 360deg );' +
        '-o-transform: rotateY( 360deg );' +
        '-moz-transform: rotateY( 360deg );' +
        'transition: transform 1s;' +
        '-webkit-transition: transform 1s;' +
        '-o-transition: transform 1s;' +
        '-moz-transition: transform 1s;' +
        'top: 0';

    setTimeout(function () {
        b_window.style.cssText = 'transform: rotateY( 0deg );' +
            '-webkit-transform: rotateY( 0deg );' +
            '-o-transform: rotateY( 0deg );' +
            '-moz-transform: rotateY( 0deg );' +
            'transition: none;' +
            '-webkit-transition: none' +
            '-o-transition: none;' +
            '-moz-transition: none;';
    }, 1000);
}

document.addEventListener('mousemove', effect);

function fadeIn( elem, ms )
{
    if( ! elem )
        return;

    elem.style.opacity = 0;
    elem.style.filter = "alpha(opacity=0)";
    elem.style.display = "block";
    elem.style.visibility = "visible";

    if( ms )
    {
        var opacity = 0;
        var timer = setInterval( function() {
            opacity += 50 / ms;
            if( opacity >= 1 )
            {
                clearInterval(timer);
                opacity = 1;
            }
            elem.style.opacity = opacity;
            elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
        }, 50 );
    }
    else
    {
        elem.style.opacity = 1;
        elem.style.filter = "alpha(opacity=1)";
    }
}

function fadeOut( elem, ms )
{
    if( ! elem )
        return;

    if( ms )
    {
        var opacity = 1;
        var timer = setInterval( function() {
            opacity -= 50 / ms;
            if( opacity <= 0 )
            {
                clearInterval(timer);
                opacity = 0;
                elem.style.display = "none";
                elem.style.visibility = "hidden";
            }
            elem.style.opacity = opacity;
            elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
        }, 50 );
    }
    else
    {
        elem.style.opacity = 0;
        elem.style.filter = "alpha(opacity=0)";
        elem.style.display = "none";
        elem.style.visibility = "hidden";
    }
}

var el = document.getElementById('qsn');
var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
var fontSize = parseFloat(style);

var y_b = document.getElementsByClassName("yes_button");
var n_b = document.getElementsByClassName("no_button");
var numb_clicks = 0;

function step_1(evt) {

    animationWindow();
    fadeOut( document.getElementById('step_1'), 300 );
    setTimeout(function(){fadeIn( document.getElementById('step_2'), 300 )}, 300);
    numb_clicks++;
}

function step_2(evt) {
    animationWindow();
    fadeOut( document.getElementById('step_2'), 300 );
    setTimeout(function(){fadeIn( document.getElementById('step_3'), 300 ); document.getElementById("head_text").innerHTML = ""; }, 300);
    numb_clicks++;

    function move() {
        var elem = document.getElementById("myBar");
        var width = 1;
        var id = setInterval(frame, 30);

        function frame() {
            if (width >= 100) {
                clearInterval(id);

                fadeOut( document.getElementById('step_3'), 300 );
                setTimeout(function(){

                    fadeIn( document.getElementById('step_4'), 300 );
                    document.getElementById("head_text").innerHTML = "";

                    document.getElementById("outlink").onmouseover = function(){
                        btnPressed = true;
                    };

                    document.getElementById("outlink").onmouseleave = function(){
                        btnPressed = false;
                    };


                }, 300);

            } else {
                width++;
                elem.style.width = width + '%';
            }
        }
    }
    setTimeout(function(){move()}, 500);
}

y_b[0].addEventListener("click", step_1, false);
n_b[0].addEventListener("click", step_1, false);

y_b[1].addEventListener("click", step_2, false);
n_b[1].addEventListener("click", step_2, false);

function enter(e) {
    e = e.keyCode;

    if (e == 32 || e == 13) {

        switch(numb_clicks) {
            case 0:
                y_b[0].click();
                break;

            case 1:
                y_b[1].click();
                break;

            default:
                go_away();
        }
    }
}

addEventListener("keydown", enter);

// video

function audio_prelend(){
    var audio_prelend = document.getElementById('audio_prelend');
    audio_prelend.play();
    audio_prelend.playbackRate = 1;
    audio_prelend.volume = 0.5;

    audio_prelend.onended = function() {
        audio_prelend.play();
    };
}

var video = document.getElementById('bgvideo');
var modal = document.getElementById('modal');

var btnV1 = document.getElementById('play1');
var btnV2 = document.getElementById('play2');

function playVideo(){
    audio_prelend();
    modal.style.display = 'none';
    video.play();
    video.playbackRate = 1;
    video.volume = 1.0;
    video.onended = function(){
        video.currentTime = 11;
        if(document.documentElement.clientWidth <= 768 && document.documentElement.clientHeight <= 1024 || document.documentElement.clientWidth <= 1024 && document.documentElement.clientHeight <= 768){
            modal.style.display = 'block';
        }
        else{
            playVideo();
        }
    };

}

function play_mobi(){
    if(document.documentElement.clientWidth <= 768 && document.documentElement.clientHeight <= 1024 || document.documentElement.clientWidth <= 1024 && document.documentElement.clientHeight <= 768){
        if(video.currentTime <= 0){
            modal.style.display = 'block';
        }
    }

    else {
        playVideo();
    }
}

function calculatePpoportions() {

    if ( document.documentElement.clientWidth / document.documentElement.clientHeight < 1.78 ){

        if (video.classList)
            video.classList.add( 'bgvideo_scale' );
        else
            video.className += ' ' + 'bgvideo_scale';

    } else {

        if (video.classList) {
            video.classList.remove( 'bgvideo_scale' );
        }

    }

}

btnV1.onclick = function(){
    playVideo();
    btnV1.style.display = 'none';
    btnV2.style.display = 'block';
};

btnV2.onclick = function(){
    playVideo();
};

_body.onclick = function(){
    playVideo();
    return false;
};

video.onplaying = function(){
    playBtn.style.display = 'none';
};

function windowReady() {
    calculatePpoportions();

    function get_name_browser(){
        var ua = navigator.userAgent;
        if (ua.search(/Chrome/) > 0) return 'Google Chrome';
        if (ua.search(/Firefox/) > 0) return 'Firefox';
        if (ua.search(/Opera/) > 0) return 'Opera';
        if (ua.search(/Safari/) > 0) return 'Safari';
        if (ua.search(/MSIE/) > 0) return 'Internet Explorer';
        return 'Не определен';
    }
    _browser = get_name_browser();
    if ( _browser === 'Safari' ){

        _body.onclick = function(){
            playVideo();
            return false;
        };

    } else {

        setTimeout(function(){
            play_mobi();
            window.onresize = function(){
                calculatePpoportions();
                play_mobi();
            };
        },2000);

        video.play();

    }

}

document.addEventListener( "DOMContentLoaded", windowReady() );

window.onload = function(){

    function button_animation(time_switch){

        setInterval(function(){
            var yes = y_b;
            var no = n_b;

            for(var i = 0; i < yes.length; i++){

                if(yes[i].classList.contains('animation_button')){
                    yes[i].classList.remove('animation_button');
                    no[i].classList.add('animation_button');
                }

                else if(no[i].classList.contains('animation_button')){
                    no[i].classList.remove('animation_button');
                    yes[i].classList.add('animation_button');
                }

            }

        }, time_switch);

    }

    button_animation(500);
};

window.onbeforeunload = function(evt){

    if ( !btnPressed ){

        var message = "Вы действительно хотите покинуть эту страницу?";
        if (typeof evt == "undefined") {
            evt = window.event;
        }
        if (evt) {
            evt.returnValue = message;
        }

        return message;

    }

};