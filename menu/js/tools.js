/*
 * 将项目中常用的非逻辑业务操作方法放在这里，实现公用
 */
var tools=(function(){
    var flag=document.getElementsByClassName?true:false;

    return {
        getElesByClass:function(cName,context){
            var ary=[];
            if(typeof cName==="undefined"){
                return ary;
            }
            context=context||document;
            if(flag){
                return this.nodeListToArray(context.getElementsByClassName(cName));
            }
            var reg=new RegExp("(?:^| +)"+cName+"(?: +|$)","g");
            var allNodes=context.getElementsByTagName("*");
            for(var i=0;i<allNodes.length;i++){
                var cur=allNodes[i];
                if(reg.test(cur.className)){
                    ary.push(cur);
                    continue;
                }
            }
            return ary;
        },
        hasClass:function(ele,cName){
            var boo=false;
            var reg=new RegExp("(?:^| +)"+cName+"(?: +|$)","g");
            if(reg.test(ele.className)){
                boo=true;
            }
            return boo;
        },
        addClass:function(ele,cName){
            if(!this.hasClass(ele,cName)){
                ele.className+=" "+cName;
            }
        },
        removeClass:function(ele,cName){
            var reg=new RegExp("(?:^| +)"+cName+"(?: +|$)","g");
            if(this.hasClass(ele,cName)){
                ele.className=ele.className.replace(reg,"");
            }
        },
        getChildren:function(ele,tagName){
            tagName=tagName||"";
            var ary=[];
            var allNodes=ele.childNodes;
            for(var i=0;i<allNodes.length;i++){
                if(allNodes[i].nodeType===1){
                    if(tagName){
                        if(allNodes[i].nodeName.toLowerCase()===tagName.toLowerCase()){
                            ary.push(allNodes[i]);
                        }
                    }else{
                        ary.push(allNodes[i]);
                    }
                }
            }
            return ary;
        },
        getPre:function(ele){
            var pre=ele.previousSibling;
            while(pre && pre.nodeType!=1){
                pre=pre.previousSibling;
            }
            return pre;
        },
        getNext:function(ele){
            var next=ele.nextSibling;
            while(next && next.nodeType!=1){
                next=next.nextSibling;
            }
            return next;
        },
        getPreAll:function(ele){
            var ary=[];
            var pre=ele.previousSibling;
            while(pre){
                if(pre.nodeType===1){
                    ary.unshift(pre);
                }
                pre=pre.previousSibling;
            }
            return ary;
        },
        getNextAll:function(ele){
            var ary=[];
            var next=ele.nextSibling;
            while(next){
                if(next.nodeType===1){
                    ary.push(next);
                }
                next=next.nextSibling;
            }
            return ary;
        },
        getSiblings:function(ele){
            return this.getPreAll(ele).concat(this.getNextAll(ele));
        },
        nodeListToArray:function(nodeList){
            var ary=[];
            try{
                ary=[].slice.call(nodeList);
            }catch(e){
                for(var i=0;i<nodeList.length;i++){
                    ary.push(nodeList[i]);
                }
            }
            return ary;
        },
        getCss:function(ele,attr){
            if(flag){
                return parseFloat(window.getComputedStyle(ele,null)[attr]);
            }else{
                return parseFloat(ele.currentStyle[attr]);
            }
        }
    };
})();
