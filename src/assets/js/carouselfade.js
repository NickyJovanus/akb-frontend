var content;
var title;

content = document.getElementsByClassName('intro')[0];
title = document.getElementsByClassName('intro-text')[0];
title.style.opacity = "0";
var load = 0;
var cycle = 0;

var refreshIntervalId = setInterval(function() {
    if(load == 0)
    setTimeout(function(){
        content.style = `transition: 2s`;
        if(cycle==0) {
            content.style.background = "url(https://images.unsplash.com/photo-1550388342-b3fd986e4e67?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80) no-repeat top center scroll";
            cycle++;
        } else if(cycle == 1) {
            content.style.background = "url(https://images.unsplash.com/photo-1563176057-26febab5c153?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80) no-repeat top center scroll";
            cycle++;
        } else if(cycle == 2) {
            content.style.background = "url(https://images.unsplash.com/photo-1591274014221-36d4fe45f4a5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80) no-repeat top center scroll";
            cycle++;
        } else {
            content.style.background = "url(https://images.unsplash.com/photo-1550388342-b3fd986e4e67?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80) no-repeat top center scroll";
            cycle=0;
            load=1;
            clearInterval(refreshIntervalId);
        }
    },15);
}, 10);

setTimeout(function(){
    title.style.transition = "2s";
    title.style.opacity = "1";
},1000);

setInterval(function() {
    setTimeout(function(){
        content.style.backgroundAttachment= "fixed";
        if(cycle==0) {
            content.style.background = "url(https://images.unsplash.com/photo-1550388342-b3fd986e4e67?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80) no-repeat top center scroll";
            cycle++;
        } else if(cycle == 1) {
            content.style.background = "url(https://images.unsplash.com/photo-1563176057-26febab5c153?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80) no-repeat top center scroll";
            cycle++;
        } else {
            content.style.background = "url(https://images.unsplash.com/photo-1591274014221-36d4fe45f4a5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80) no-repeat top center scroll";
            cycle=0;
        }
    },100);
}, 2900);

