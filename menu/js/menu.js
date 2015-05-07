function dataView(data) {
    var body = tools.getElesByClass('menuBody')[0];
    var htmlStr = '';
    for(var key in data){
        var item = data[key];
        htmlStr += '<div class="mbChild"><h3>';
        if(item['child']){
            htmlStr += '<span class="bg1"></span>';
        }
        htmlStr += item['name'];
        htmlStr += '</h3>';
        if(item['child']){
            htmlStr += '<ul>';
            for (var i = 0; i < item['child'].length; i++) {
                var eachChild = item['child'][i];
                if(!eachChild){
                    continue;
                }
                htmlStr += '<li>';
                htmlStr += eachChild;
                htmlStr += '</li>';
            };
            htmlStr += '</ul>';
        }
        htmlStr += '</h3></div>';
    }
    body.innerHTML = htmlStr;
}
dataView(json);


function initHeight(){
    var oUl = document.getElementsByTagName('ul');
    for (var i = 0; i < oUl.length; i++) {
        var ul = oUl[i];
        ul.style.display = 'block';
        ul.style.height = getHeight(ul) + 'px';
    };
}
initHeight();
function getHeight(ele){
    var height = 0;
    var lis = ele.getElementsByTagName('li');
    for (var i = 0; i < lis.length; i++) {
        var element = lis[i];
        if(element.style.display != 'none'){
            if(element.className == 'more'){
                height += 22;
            }else{
                height += 28;
            }
        }
    };
    return height;
}

var oH3 = document.getElementsByTagName('h3');
for (var i = 0; i < oH3.length; i++) {
    var h3 = oH3[i];
    if(tools.getNext(h3)){
        h3.onclick = (function(i){
            return function(){
                var ul = tools.getNext(this);
                var span = tools.getChildren(this, 'span')[0];
                if(ul.style.display === 'none'){
                    animate(ul, 0, getHeight(ul));
                    span.className = 'bg1';
                }else{
                    animate(ul, getHeight(ul), 0);
                    span.className = 'bg2';
                }
            };
        })(i);
    }
};

function animate(ele, start, target){
    ele.timer = null;
    var current = start;
    _move();
    function _move(){
        window.clearTimeout(ele.timer);
        ele.timer = null;
        if(start < target){
            ele.style.display = 'block';
            if(current >= target){
                ele.style.height = target + 'px';
                return;
            }
            current += 3;
            ele.style.height = current + 'px';
        }else if(start > target){
            if(current <= target){
                ele.style.height = target + 'px';
                ele.style.display = 'none';
                return;
            }
            current -= 3;
            ele.style.height = current + 'px';
        }    
        ele.timer = window.setTimeout(_move, 6);
    }
}