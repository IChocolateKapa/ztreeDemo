/**
 * Created by 58 on 2015/9/6.
 */

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
    /*点击第一层文字时， 异步加载数据*/
    var zSTNodes = [
        {}
    ]
    if(treeNode.level == 0){

    }


    /*点击第三层文件时*/
    if (treeNode.level == 2 ) {
        $(".editor_ask").hide();
        $("#editor").show();
        /*如何检测内容发生了变化*/
        var curtEXT = editor.getValue();
        if(changeFlag){
            var ret = confirm("save?", curProgramNode);
            if(ret){
                alert("Done");
                editor.setValue("the new text here1");
            } else {
                editor.setValue("the new text here2");
            }

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
    return confirm("Confirm delete node '" + treeNode.name + "' it?");
}
function onRemove(e, treeId, treeNode) {
    return confirm("Confirm delete node '" + treeNode.name + "' it?");
}
function beforeRename(treeId, treeNode, newName) {
    if (newName.length == 0) {
        alert("Node name can not be empty.");
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
        alert("Please select one node at first...");
        return;
    }
    zTree.editName(treeNode);
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
        alert("Please select one node at first...");
        return;
    }
    var rt = confirm("Confirm delete node '" + treeNode.name + "' it?");
    if(rt){
        var callbackFlag = $("#callbackTrigger").attr("checked");
        zTree.removeNode(treeNode, callbackFlag);
    } else{
        return;
    }

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
        dblClickExpand: true,
        addDiyDom: addDiyDom
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        beforeClick: beforeClick,
        beforeDrag: beforeDrag,
        beforeDrop: beforeDrop,
        beforeDragOpen: beforeDragOpen,
        onDrag: onDrag,
        onDrop: onDrop,
        beforeRemove: beforeRemove,
        beforeRename: beforeRename,
        onRemove: onRemove
    }
};

var zNodes =[
    { id:1, pId:0, name:"我的程序", open:true},
    { id:11, pId:1, name:"常用程序"},
    { id:111, pId:11, name:"Portable file"},
    { id:112, pId:11, name:"Executable file"},
    { id:113, pId:11, name:"Shared object files"},
    { id:2, pId:0, name:"王小明01的程序"},
    { id:21, pId:2, name:"常用程序"},
    { id:211, pId:21, name:"Portable files"},
    { id:22, pId:2, name:"不常用程序"},
    { id:3, pId:0, name:"张明04的程序"},
    { id:31, pId:3, name:"Documents"},
    { id:32, pId:3, name:"Photos"},
    { id:4, pId:0, name:"李明明的程序"},
    { id:41, pId:4, name:"Documents"},
    { id:42, pId:4, name:"Photos"},
    { id:5, pId:0, name:"赵大明01的程序"},
    { id:51, pId:5, name:"Documents"},
    { id:52, pId:5, name:"Photos"}
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

    console.log(treeNode.level);

    /*在这里检测如果不可编辑，则不执行*/
    var ret = isTabNotAllowed($("#add"));
    if(ret){
        eventUtil.preventDefault(event);
        return false;
    }


    var level = treeNode.level;

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
        }

    }
    if (treeNode) {
        zTree.editName(treeNode[0]);
    } else {
        alert("Leaf node is locked and can not add child node.");
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


    var treeObj2 = $("#tree2");
    treeObj2.addClass("showIcon");
    $.fn.zTree.init(treeObj2, setting, zNodes);
});