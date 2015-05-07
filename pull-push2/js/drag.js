var handler = document.getElementById('handler');
function processThis(obj,fn){
    return function (e){fn.call(obj,e)};
}
var box = document.getElementById('handler-box');
var leftPanel = document.getElementById('leftPanel');
var rightPanel = document.getElementById('rightPanel');
var handler = document.getElementById('handler');
function down(e){
    this.leftPanelWidth = parseFloat(window.getComputedStyle(leftPanel, null).width);
    this.rightPanelLeft = parseFloat(window.getComputedStyle(rightPanel, null).left);
    this.handlerLeft = parseFloat(window.getComputedStyle(handler, null).left);
    var movingObj = document.createElement('div');
    movingObj.id = 'handler-moving';
    movingObj.style.left = this.handlerLeft + 'px';
    this.moving = movingObj;
    box.appendChild(movingObj);
    this.x=this.offsetLeft;
    this.mx=e.pageX;
    if(this.setCapture){
        on(this,"mousemove",move);
        on(this,"mouseup",up);
        this.setCapture();

    }else{
        this.MOVE=processThis(this,move);
        this.UP=processThis(this,up);
        on(document,"mousemove",this.MOVE);
        on(document,"mouseup",this.UP);
    }
    e.preventDefault();
}

function move(e){
    this.change = e.pageX - this.mx ;
    this.moving.style.left = this.handlerLeft + this.change + 'px';

}
function up(e){

    changeView.call(this);
    box.removeChild(this.moving);
    if(this.releaseCapture){
        off(this,"mousemove",move);
        off(this,"mouseup",up);
        this.releaseCapture();
    }else{
        off(document,"mouseup",this.UP);
        off(document,"mousemove",this.MOVE);
    }
}
function changeView(){
    this.style.left = this.x + this.change + "px";
    leftPanel.style.width = this.leftPanelWidth + this.change + "px";
    rightPanel.style.left = this.rightPanelLeft + this.change + "px";
}
on(handler,"mousedown",down);