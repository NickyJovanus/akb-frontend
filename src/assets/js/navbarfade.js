
var content;
if(document.getElementById('container'))
    content = document.getElementById('container');

content.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.getElementById('container').scrollTop > 100 || document.getElementById('container').scrollTop > 100) {
        document.querySelector(".navbar-fixed-top").style.background = "#000";
        document.querySelector(".navbar-fixed-top").style.transition = "0.2s";
        document.querySelector(".navbar-fixed-top").style.boxShadow = "0px 5px 20px #000000a1";
    } else {
        document.querySelector(".navbar-fixed-top").style.background = "linear-gradient(rgb(255 82 0 / 8%), transparent, transparent)";
        document.querySelector(".navbar-fixed-top").style.boxShadow = "none";
    }
}