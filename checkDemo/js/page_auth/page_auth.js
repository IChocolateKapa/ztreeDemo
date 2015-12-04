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

    var vpnameData = AuthManager.handleLocalData(ADMIN_LIST);
    AuthManager.initDropdown($('#selectVPName'), vpnameData, function () {
        /*获取选中业务线值*/
        var admin = this.value();
    });

    var biz_names = PLAT_BIZ_NAMES["58"];
    var localData = AuthManager.handleLocalData(biz_names);
    AuthManager.initDropdown($('#selectDatasetType'), localData, function () {
        /*获取选中业务线值*/
        var biz_name = this.value();
        /*
         * 发送请求，获取该plat_name和biz_name之下的权限信息
         * */
        //$.ajax({});
        var authOwnedList = [
            {
                first_order: "page_detail",
                second_order: "pvuv"
            },
            {
                "first_order": "visitview",
                "second_order": "visit_time"
            },
            {
                "first_order": "visitview",
                "second_order": "visit_depth"
            }
        ];

        var zNodes = AuthManager.initZNodesList('58', biz_name, authOwnedList);

        $(".authTree").removeClass("dead");
        var treeObj = $("#treeDemo");
        $.fn.zTree.init(treeObj, setting, zNodes);
    });

});



