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
    if(treeNode.level == 0){
        var addFlag = false;
        /*仅在没有加载过数据时加载*/
        if(addFlag){
            var zSTNodes = [
                { id:41, pId:4, name:"Documents"},
                { id:42, pId:4, name:"Photos"},
                { id:411, pId:41, name:"DDDDD"}
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
                zTree.addNodes(treeNode, {id:(zSTNodes[i].id + newCount), pId:zSTNodes[i].pId, isParent:isP, name:"新建文件夹" + (newCount++)});
            }
        }
    }



    /*点击第三层文件时*/
    if (treeNode.level == 2 ) {
        $(".editor_ask").hide();
        $("#editor").show();
        /*如何检测内容发生了变化*/
        var curtEXT = editor.getValue();
        if(changeFlag){
            //询问框
            var cfm = layer.confirm('是否需要保存文件？', {
                btn: ['是','否'] //按钮
            }, function(){
                /*进行保存， 成功或者失败提示*/
                layer.close(cfm);
                //结果提示信息框
                layer.msg('这成功或者失败？？');
                editor.setValue("the new text here1");
            }, function(){
                editor.setValue("the new text here2");
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
    var ret;
    var cfm = layer.confirm("C确定删除节点  '" + treeNode.name + "' 吗?", function(){
        ret = true;
    }, function(){
        ret = false;
    });
    return ret;
}
function onRemove(e, treeId, treeNode) {
    var ret;
    var cfm = layer.confirm("确定删除节点 '" + treeNode.name + "' 吗?", function(){
        ret = true;
    }, function(){
        ret = false;
    });
    return ret;
}
function beforeRename(treeId, treeNode, newName) {
    if (newName.length == 0) {
        //alert("Node name can not be empty.");
        layer.alert('Node name can not be empty.');
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
        layer.alert("请先选择一个编辑节点...");

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
        layer.alert("请先选择一个节点...");
        return;
    }
    var cfm = layer.confirm("确定删除节点 '" + treeNode.name + "' 吗?", function(){
        layer.close(cfm);
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
    { id:1, pId:0, name:"我的程序", open:true, iconOpen:"images/yiji.png", iconClose:"images/yijiclose.png"},
    { id:11, pId:1, name:"常用程序"},
    { id:12, pId:1, name:"不用程序"},
    { id:121, pId:12, name:"YYY用程序"},
    { id:13, pId:1, name:"你用程序"},
    { id:131, pId:13, name:"A用程序"},
    { id:111, pId:11, name:"Shared file"},
    { id:112, pId:11, name:"Executable file"},
    { id:113, pId:11, name:"Portable object files"},
    { id:113, pId:11, name:"Aortable object files"},
    { id:2, pId:0, name:"王小明01的程序", iconOpen:"images/yiji.png", iconClose:"images/yijiclose.png"},
    { id:3, pId:0, name:"张明04的程序", iconOpen:"images/yiji.png", iconClose:"images/yijiclose.png"},
    { id:4, pId:0, name:"李明明的程序", iconOpen:"images/yiji.png", iconClose:"images/yijiclose.png"},
    { id:5, pId:0, name:"赵大明01的程序", iconOpen:"images/yiji.png", iconClose:"images/yijiclose.png"}
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
        //alert("Leaf node is locked and can not add child node.");
        layer.alert('Leaf node is locked and can not add child node.');
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
    //$(".ztree, .ztree").on("click", "li.level0>a .btn-sort, li.level0>a  .btn-sort", function(){
    $(".ztree li.level0>a, .ztree li.level1>a").on("click", ".btn-sort", function(){
        var $this = $(this);
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
    })

});


function initRoot(){
    var zSTNodes = [
        { id:1, pId:0, name:"Documents"},
        { id:2, pId:0, name:"Photos"},
        { id:3, pId:0, name:"DDDDD"}
    ];
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");

    for(var i = 0; i < zSTNodes.length; i++){
        zTree.addNodes(zTree, {id:(i + 1), pId:0, isParent:true, name:"新建文件夹" + (i++)});
    }

}


function setSortIcon(){
    if(!$(".ztree li.level0>a>i, .ztree li.level1>a>i").hasClass("btn-sort")){
        $(".ztree li.level0>a, .ztree li.level1>a").append("<i class='btn-sort sheng'>");
    }
}


