/**
 * Created by 58 on 2015/9/6.
 */

/*获取当前树的level*/
function getCurLevel(treeNode){
    var curLevel;
    if(treeNode.level == 0){
        if(treeNode.name == "我的程序"){
            curLevel = 0
        } else if(treeNode.name == "共享程序"){
            curLevel = -1
        }
    } else if(treeNode.level == 1){
        var parentNode = treeNode.getParentNode();
        //var parentNode = zTree.getNodeByParam("tId",  treeNode.parentTId);

        if(parentNode.name == "我的程序"){
            curLevel = 1;
        } else if(parentNode.name == "共享程序"){
            curLevel = 0;
        }
    } else if(treeNode.level == 2){
        var parent_parentNode = treeNode.getParentNode().getParentNode();
        //var parentNode = zTree.getNodeByParam("tId",  treeNode.parentTId);
        if(parent_parentNode.name == "我的程序"){
            curLevel = 2;
        } else if(parent_parentNode.name == "共享程序"){
            curLevel = 1;
        }
    } else {
        /*只有共享程序中会有第四层*/
        curLevel = 2;
    }

    return curLevel;
}





function dropPrev(treeId, nodes, targetNode) {
    var pNode = targetNode.getParentNode();
    if (pNode && pNode.dropInner === false) {
        return false;
    } else {
        for (var i=0,l=curDragNodes.length; i<l; i++) {
            var curPNode = curDragNodes[i].getParentNode();
            if (curPNode && curPNode !== targetNode.getParentNode() && curPNode.childOuter === false) {
                return false;
            }
        }
    }
    return true;
}
function dropInner(treeId, nodes, targetNode) {
    if (targetNode && targetNode.dropInner === false) {
        return false;
    } else {
        for (var i=0,l=curDragNodes.length; i<l; i++) {
            if (!targetNode && curDragNodes[i].dropRoot === false) {
                return false;
            } else if (curDragNodes[i].parentTId && curDragNodes[i].getParentNode() !== targetNode && curDragNodes[i].getParentNode().childOuter === false) {
                return false;
            }
        }
    }
    return true;
}
function dropNext(treeId, nodes, targetNode) {
    var pNode = targetNode.getParentNode();
    if (pNode && pNode.dropInner === false) {
        return false;
    } else {
        for (var i=0,l=curDragNodes.length; i<l; i++) {
            var curPNode = curDragNodes[i].getParentNode();
            if (curPNode && curPNode !== targetNode.getParentNode() && curPNode.childOuter === false) {
                return false;
            }
        }
    }
    return true;
}
function addDiyDom(treeId, treeNode) {
    var spaceWidth = 5;
    var switchObj = $("#" + treeNode.tId + "_switch"),
        icoObj = $("#" + treeNode.tId + "_ico");
    switchObj.remove();
    icoObj.before(switchObj);

    if (treeNode.level > 1) {
        var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level)+ "px'></span>";
        switchObj.before(spaceStr);
    }
}

function beforeClick(treeId, treeNode) {
    var curLevel =  getCurLevel(treeNode);


    /*点击第一层文字时， 异步加载数据*/
    if(curLevel == 0){
        var addFlag = true;
        /*仅在没有加载过数据时加载*/
        if(!addFlag){
            var zSTNodes = [
                { id:211, pId:21, name:"Documents", description: "12"},
                { id:221, pId:22, name:"Photos", description: "e3q"},
                { id:223, pId:22, name:"DDDDD", description: "t543w"}
            ];
            var curName = treeNode.name;
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");

            for(var i = 0; i < zSTNodes.length; i++){
                var strPid = zSTNodes[i].pId+"";
                if(strPid.length == 1){
                    var isP = true;
                } else {
                    var isP = false;
                }
                var newNode = zTree.addNodes(
                    treeNode,
                    {
                        id:(zSTNodes[i].id + newCount),
                        pId:zSTNodes[i].pId,
                        isParent:isP,
                        name:"新建文件夹" + (newCount++),
                        description: zSTNodes[i].description
                    },
                    true);

                $("#"+newNode[0].tId).children("a").append("<i class='btn-sort sheng'>");
            }
        }
    }

    /*点击第三层文件时*/
    if (curLevel == 2 ) {
        $(".editor_ask").hide();
        $("#editor").show();
        /*如何检测内容发生了变化*/
        var curtEXT = editor.getValue();
        if(changeFlag){
            //询问框
            eModal.confirm('是否需要保存文件？', function(){
                /*进行保存， 成功或者失败提示*/
                //结果提示信息框
                editor.setValue("提示：请在“我的程序”里选");
            });

            changeFlag = false;
        }

        curProgramNode = treeNode.id;

    } else{
        $(".editor_ask").show();
        $("#editor").hide();
    }

    return true;
}

var log, className = "dark", curDragNodes, autoExpandNode;
function beforeDrag(treeId, treeNodes) {
    className = (className === "dark" ? "":"dark");
    for (var i=0,l=treeNodes.length; i<l; i++) {
        if (treeNodes[i].drag === false) {
            curDragNodes = null;
            return false;
        } else if (treeNodes[i].parentTId && treeNodes[i].getParentNode().childDrag === false) {
            curDragNodes = null;
            return false;
        }
    }
    curDragNodes = treeNodes;
    return true;
}
function beforeDragOpen(treeId, treeNode) {
    autoExpandNode = treeNode;
    return true;
}
function beforeDrop(treeId, treeNodes, targetNode, moveType, isCopy) {
    className = (className === "dark" ? "":"dark");
    return true;
}
function onDrag(event, treeId, treeNodes) {
    className = (className === "dark" ? "":"dark");
}
function onDrop(event, treeId, treeNodes, targetNode, moveType, isCopy) {
    className = (className === "dark" ? "":"dark");
}
function onExpand(event, treeId, treeNode) {
    if (treeNode === autoExpandNode) {
        className = (className === "dark" ? "":"dark");
    }
}


function beforeRemove(treeId, treeNode) {
    className = (className === "dark" ? "":"dark");
    var ret = false;
    eModal.confirm("C确定删除节点  '" + treeNode.name + "' 吗?", function(){
        ret = true;
    });
    return ret;
}
function onRemove(e, treeId, treeNode) {
    var ret = false;
    eModal.confirm("确定删除节点 '" + treeNode.name + "' 吗?", function(){
        ret = true;
    });
    return ret;
}
function beforeRename(treeId, treeNode, newName) {
    if (newName.length == 0) {
        //alert("Node name can not be empty.");
        eModal.alert('Node name can not be empty.');
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        setTimeout(function(){zTree.editName(treeNode)}, 10);
        return false;
    }
    return true;
}



function edit() {

    /*在这里检测如果不可编辑，则不执行*/
    var ret = isTabNotAllowed($("#add"));
    if(ret){
        eventUtil.preventDefault(event);
        return false;
    }

    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = zTree.getSelectedNodes(),
        treeNode = nodes[0];
    if (nodes.length == 0) {
        eModal.alert("请先选择一个编辑节点...");

        return;
    }
    zTree.editName(treeNode);
    console.log("jfjrewj");
}


function remove(e) {
    /*在这里检测如果不可编辑，则不执行*/
    var ret = isTabNotAllowed($("#add"));
    if(ret){
        editor.setValue(null);
        //curProgramNode = null;
        eventUtil.preventDefault(event);
        return false;
    }



    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = zTree.getSelectedNodes(),
        treeNode = nodes[0];
    if (nodes.length == 0) {
        eModal.alert("请先选择一个节点...");
        return;
    }
    eModal.confirm("确定324删除节点 '" + treeNode.name + "' 吗?", function(){
        var callbackFlag = $("#callbackTrigger").attr("checked");
        zTree.removeNode(treeNode, callbackFlag);
    }, function(){});

}


var curProgramNode = null, zTree_Menu = null;
var setting = {
    edit: {
        drag: {
            autoExpandTrigger: true,
            prev: dropPrev,
            inner: dropInner,
            next: dropNext
        },
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false
    },
    view: {
        showLine: false,
        selectedMulti: false,
        dblClickExpand: false,
        showTitle: true,
        addDiyDom: addDiyDom
    },
    data: {
        simpleData: {
            enable: true
        },
        key: {
            title: "description"
        }

    },
    remark:"remark",
    callback: {
        beforeClick: beforeClick,
        beforeDrag: beforeDrag,
        beforeDrop: beforeDrop,
        beforeDragOpen: beforeDragOpen,
        onDrag: onDrag,
        onDrop: onDrop,
        beforeRemove: beforeRemove,
        beforeRename: beforeRename,
        onRemove: onRemove,
        onClick: onClick
    }
};


function onClick(e,treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    zTree.expandNode(treeNode);
    console.log("jsjj")
}


var zNodes =[
    { id:1, pId:0, name:"我的程序", open:true, description: "jdskagt54y465y64ryhjfkjfi"},
    { id:11, pId:1, name:"常用程序", open:true, description: "j6t56dskajfkjfi"},
    { id:111, pId:11, name:"Portable file", open:true, description: "jdskaj646fkjfi"},
    { id:112, pId:11, name:"Executable file", open:true, description: "jdskajfkjfi"},
    { id:113, pId:11, name:"Shared object files", description: "635654376"},
    { id:2, pId:0, name:"共享程序", open:true, description: "jr43wdskajfkjfi"},
    { id:21, pId:2, name:"张明04的程序", description: "cxsfre"},
    { id:211, pId:21, name:"常用",  description: "路明年给你给你"},
    { id:2111, pId:211, name:"计算圆周率",  description: "计算圆周率是啥子鬼"},
    { id:2112, pId:211, name:"勾股定理", description: "勾股定理是结果"},
    { id:212, pId:21, name:"不常用程序",  description: "cxsfre"},
    { id:22, pId:2, name:"李明明的程序",  description: "r43w"},
    { id:23, pId:2, name:"赵大明01的程序", description: "yt5ry6"}
];

function focusOn(treeId, treeNode){
    //模拟点击事件，切换显示的程序内容，并更新各按钮的状态
}


var newCount = 1;
function add() {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = zTree.getSelectedNodes(),
        treeNode = nodes[0],
        parTreeNode = treeNode.getParentNode();


    /*在这里检测如果不可编辑，则不执行*/
    var ret = isTabNotAllowed($("#add"));
    if(ret){
        eventUtil.preventDefault(event);
        return false;
    }


    var level = getCurLevel(treeNode);
    //var level = treeNode.level;

    if (treeNode) {
        var pid2 = treeNode.id;
        var pid3 = treeNode.pId;
        /*第二层，添加第三层文件*/
        if(level == 1){
            /*ok*/
            treeNode = zTree.addNodes(treeNode, {id:(pid2 + newCount), pId: pid2, isParent:false, name:"程序文件" + (newCount++)});
        } else if(level == 2){
            /*not ok,加在了子级别*/
            treeNode = zTree.addNodes(parTreeNode, {id:(pid3 + newCount), pId:pid3, isParent:false, name:"程序文件" + (newCount++)});
        } else {
            /*ok*/
            treeNode = zTree.addNodes(treeNode, {id:(pid2 + newCount), pId:pid2, isParent:true, name:"新建文件夹" + (newCount++)});
            $("#"+treeNode[0].tId).children("a").append("<i class='btn-sort sheng'>");
        }

    }
    if (treeNode) {
        zTree.editName(treeNode[0]);
    } else {
        //alert("Leaf node is locked and can not add child node.");
        eModal.alert('Leaf node is locked and can not add child node.');
    }
}

$(function(){
    var treeObj = $("#treeDemo");
    treeObj.addClass("showIcon");
    $.fn.zTree.init(treeObj, setting, zNodes);
    zTree_Menu = $.fn.zTree.getZTreeObj("treeDemo");
    curProgramNode = zTree_Menu.getNodes()[0]/*.children[0].children[0]*/;
    zTree_Menu.selectNode(curProgramNode);
    $("#edit").bind("click", edit);
    $("#remove").bind("click", remove);
    $("#add").bind("click", add);



    /*当有新节点生成时需要调用这个方法进行加载排序图标*/
    setSortIcon();

    /*点击排序时*/
    /*点击排序时*/
    //$(".ztree, .ztree").on("click", "li.level0>a .btn-sort, li.level0>a  .btn-sort", function(){
    /*遇到问题是，新加节点绑定事件消失*/
    $(".ztree").on("click", ".btn-sort", function(){
        var $this = $(this);
        sortNodes($this);
    })

});



function setSortIcon(){
    if(!$(".ztree li.level0>a>i").hasClass("btn-sort")){
        $(".ztree li.level0>a").append("<i class='btn-sort sheng'>");
    }
    if(!$(".ztree li.level1>a>i").hasClass("btn-sort")){
        $(".ztree li.level1>a").append("<i class='btn-sort sheng'>");
    }
    /*if($(".ztree li.level3").length && !$(".ztree li.level2>a>i").hasClass("btn-sort") && $(".ztree li.level2").closest("level0")){
     $(".ztree li.level2>a").append("<i class='btn-sort sheng'>");
     }*/
}



function sortNodes($this){
    var closetLi = $this.closest("li");
    var curUL = closetLi.children("ul");
    var curLi = curUL.children("li");


    var zTree = $.fn.zTree.getZTreeObj("treeDemo");


    var data = {};
    var dataArr = [];
    curLi.each(function(index, ele){
        var id = $(ele).attr("id");
        var curNode = zTree.getNodeByParam("tId", id);
        data[id] = ele;
        dataArr.push(curNode);
    });

    /*这个是对汉字拼音的排序， 返回的是排序好的子节点数组*/
    var dataNew = dataArr.sort(function(a,b){return a.name.localeCompare(b.name)});
    $(curUL).empty();

    /*图标为升序，进行升序排列*/
    if($this.hasClass("sheng")){
        /*升序排列*/
        /*子节点数目大于1时才进行排序*/
        $this.removeClass("sheng");
        $this.addClass("jiang");

        for(var i = 0; i < dataNew.length; i++){
            var idTar = dataNew[i].tId;
            $(curUL).append(data[idTar]);
        }
    } else {
        /*图标为降序， 进行降序排列*/
        $this.addClass("sheng");
        $this.removeClass("jiang");
        /*降序排列*/
        /*子节点数目大于1时才进行排序*/
        for(var i = 0; i < dataNew.length; i++){
            var idTar = dataNew[i].tId;
            $(curUL).prepend(data[idTar]);
        }

    }
    eventUtil.preventDefault(event);
    eventUtil.stopPropagation(event);
}

