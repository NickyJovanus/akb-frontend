var fireOnHashChangesToo = true;
var pageURLCheckTimer = setInterval (
    function () {
        if (this.lastPathStr !== location.pathname
            || this.lastQueryStr !== location.search
            || (fireOnHashChangesToo && this.lastHashStr !== location.hash)) {
                locationHashChanged();
        }
}, 100);

function locationHashChanged() {
    var content;
    var title;

    content = document.getElementsByClassName('intro')[0];
    title   = document.getElementsByClassName('intro-text')[0];

    if(content != null) {
        title.style.opacity = "0";
        var cycle = 0;

        setTimeout(function(){
            title.style.transition = "3s";
            title.style.opacity    = "1";
            content.style = `transition: 2s`;
        },1000);

        setInterval(function() {
            setTimeout(function(){
                if(cycle==0) {
                    content.style.background = "url("+ require('@/assets/images/carousel1.jpg') +") no-repeat top center scroll";
                    cycle++;
                } else if(cycle == 1 && content.style.background.indexOf("images/carousel1") < 0) {
                    content.style.background = "url("+ require('@/assets/images/carousel2.jpg') +") no-repeat top center scroll";
                    cycle++;
                } else if(cycle == 2 &&  content.style.background.indexOf("images/carousel2") < 0) {
                    content.style.background = "url("+ require('@/assets/images/carousel3.jpg') +") no-repeat top center scroll";
                    cycle = 0;
                } else {
                    cycle = 0;
                }
            },300);
        }, 2900);
    }
}
