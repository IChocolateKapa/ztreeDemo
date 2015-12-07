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
        showRemoveBtn: true,
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

function callBackInitZNodes (plat_name) {
    var biz_names = PLAT_BIZ_NAMES[plat_name];
    var localData = AuthManager.handleLocalData(biz_names);
    AuthManager.initDropdown($('#selectDatasetType'), localData, function () {
        /*获取选中业务线值*/
        var biz_name = this.value();
        sessionStorage.biz_name = biz_name;
        /*
         * 发送请求，获取该plat_name和biz_name之下的权限信息
         * */
        //$.ajax({});
        /*var authOwnedList = [
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
         ];*/

        var zNodes = AuthManager.initZNodesList(plat_name, biz_name);

        $(".authTree").removeClass("dead");
        var treeObj = $("#treeDemo");
        $.fn.zTree.init(treeObj, setting, zNodes);
    });

}


$(function(){

    sessionStorage.plat_name = "58";

    var vpnameData = AuthManager.handleLocalData(ADMIN_LIST);
    AuthManager.initDropdown($('#selectVPName'), vpnameData, function () {
        sessionStorage.vp_name = this.value();
    });

    callBackInitZNodes("58");


    $(".query_plat_name a").click(function () {

        $(".query_plat_name a").removeClass("curr");
        $(this).addClass("curr");

        var plat_name = $(this).attr("data-val");
        sessionStorage.plat_name = plat_name;

        callBackInitZNodes(plat_name);

    })

});



