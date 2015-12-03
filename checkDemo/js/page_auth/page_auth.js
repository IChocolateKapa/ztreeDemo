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
        },
        key: {
            title: "description"
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
    { id:22, pId:2, name:"a_4_site_data(4网经纪人数据分析)",  checked: false},
    { id:23, pId:2, name:"a_4_site_data(4网经纪人数据分析)", checked: false}
];

function initZNodes (plat_name, biz_name) {

}



$(function(){

    AuthManager.initBizNamesDropdown($('#selectDatasetType'), "58");
});



