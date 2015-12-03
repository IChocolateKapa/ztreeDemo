/**
 * Created by Echo on 2015/9/6.
 */

/*在这个js中写一些ajax之类的操作*/


var setting = {
    check: {
        enable: true
    },
    edit: {
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false
    },
    view: {
        showLine: false,
        selectedMulti: false,
        dblClickExpand: false,
        showTitle: true
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        onClick: onClick
    }
};


function onClick(e,treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    zTree.expandNode(treeNode);
}


var zNodes =[
    { id:1, pId:0, name:"app", checked: false, open:true},
    { id:11, pId:1, name:"a_4_site_data(4网经纪人数据分析)", checked: false, open:true},
    { id:2, pId:0, name:"bi", checked: false, open:true},
    { id:21, pId:2, name:"bi-You", checked: false},
    { id:211, pId:21, name:"a_4_site_data(4网经纪人数据分析)",  checked: false},
    { id:212, pId:21, name:"a_4_site_data(4网经纪人数据分析)",  checked: false},
    { id:22, pId:2, name:"a_4_site_data(4网经纪人数据分析)",  checked: false},
    { id:23, pId:2, name:"a_4_site_data(4网经纪人数据分析)", checked: false}
];



$(function(){
    /*仓库搜索 选择下拉框*/
    var selectDatasetType = new DropdownBox({
        parent: $('#selectDatasetType'),
        localData : [{value:'Mysql', label:'mysql'},{value:'Hive', label:'Hive'}],
        refreshShowable : false,
        searchShowable : false,
        onChangeFunc : function () {
            /*获取label*/
            var curValue = $('.show_label').text().trim();
            /*获取value*/
            /*测试*/
            $(".authTree").removeClass("dead");
            var treeObj = $("#treeDemo");
            $.fn.zTree.init(treeObj, setting, zNodes);
            /*下面三行代码是初始时选中第一个节点*/
            //var zTree_Menu = $.fn.zTree.getZTreeObj("treeDemo");
            //var curProgramNode = zTree_Menu.getNodes()[0];
            //zTree_Menu.selectNode(curProgramNode);
        }
    });
});



