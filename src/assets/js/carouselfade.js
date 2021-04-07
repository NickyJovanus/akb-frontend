var fireOnHashChangesToo = true
var pageURLCheckTimer = setInterval (
    function () {
        if (this.lastPathStr !== location.pathname
            || this.lastQueryStr !== location.search
            || (fireOnHashChangesToo && this.lastHashStr !== location.hash)) {
            locationHashChanged();
        }
}, 100);

window.onhashchange = locationHashChanged;
locationHashChanged();

function locationHashChanged() {
    var content;
    var title;

    content = document.getElementsByClassName('intro')[0];
    title = document.getElementsByClassName('intro-text')[0];
    title.style.opacity = "0";
    var cycle = 0;

    setTimeout(function(){
        title.style.transition = "3s";
        title.style.opacity = "1";
        content.style = `transition: 2s`;
    },1000);

    setInterval(function() {
        setTimeout(function(){
            if(cycle==0) {
                content.style.background = "url("+ require('@/assets/images/carousel1.jpg') +") no-repeat top center scroll";
                cycle++;
            } else if(cycle == 1) {
                content.style.background = "url("+ require('@/assets/images/carousel2.jpg') +") no-repeat top center scroll";
                cycle++;
            } else {
                content.style.background = "url("+ require('@/assets/images/carousel3.jpg') +") no-repeat top center scroll";
                cycle=0;
            }
        },100);
    }, 2900);
}
