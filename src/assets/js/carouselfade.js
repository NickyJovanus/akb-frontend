var fireOnHashChangesToo = true;
var $ = require('jquery');
var pageURLCheckTimer = setInterval (
    function () {
        if (this.lastPathStr !== location.pathname
            || this.lastQueryStr !== location.search
            || (fireOnHashChangesToo && this.lastHashStr !== location.hash)) {
                locationHashChanged();
        }
}, 100);

function imglink(imagename) {
    return require("@/assets/images/" + imagename);
}

function locationHashChanged() {
    var content;
    var title;

    content = document.getElementsByClassName('intro')[0];
    title   = document.getElementsByClassName('intro-text')[0];

    if(content != null) {
        title.style.opacity = "0";
        // var cycle = 0;
        var images = ['carousel1.jpg', 'carousel1.jpg', 'carousel2.jpg', 'carousel3.jpg'],
            index  = 0,
            $intro = $('.intro');

        setTimeout(function(){
            title.style.transition = "3s";
            title.style.opacity    = "1";
            content.style = `transition: 2s`;
        }, 100);

        setInterval(function() {
            $intro.animate({ opacity: 1 }, 500, function() {
              $intro.css('background', 'url('+ imglink(images[++index])+')  no-repeat top center scroll');
              $intro.animate({ opacity: 1 }, 500, function() {
                if(index === images.length -1) index = 0;
              });
            });
         }, 3000);

        // setInterval(function() {
        //     if(cycle==0) {
        //         content.style.background = "url("+ require('@/assets/images/carousel1.jpg') +") no-repeat top center scroll";
        //         cycle++;
        //     } else if(cycle == 1 && content.style.background.indexOf("images/carousel1") < 0) {
        //         content.style.background = "url("+ require('@/assets/images/carousel2.jpg') +") no-repeat top center scroll";
        //         cycle++;
        //     } else if(cycle == 2 &&  content.style.background.indexOf("images/carousel2") < 0) {
        //         content.style.background = "url("+ require('@/assets/images/carousel3.jpg') +") no-repeat top center scroll";
        //         cycle = 0;
        //     } else {
        //         cycle = 0;
        //     }
        // }, 2900);
    }
}
