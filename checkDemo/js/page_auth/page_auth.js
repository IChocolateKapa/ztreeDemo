/**
 * Created by Echo on 2015/9/6.
 */

/*在这个js中写一些ajax之类的操作*/

function debounce (wait, immediate) {
    var timeout,
        func = this;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};



var setting = {
    check: {
        enable: true
    },
    edit: {
        enable: true,
        showRemoveBtn: showRemoveBtn,
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
        onClick: onClick,
        beforeRemove: beforeRemove,
    }
};



function beforeRemove (treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    zTree.selectNode(treeNode);
    var confirmTip = confirm("确认删除 权限 -- " + treeNode.name + " 吗？");


    if (confirmTip) {
        /*
        * 给秀玉姐发送删除权限的请求
        * */
        var method = {
            'operate': 'delete'
        };
        method.user_name = $("#user_name").val();
        method.vp_name = sessionStorage.vp_name_w? sessionStorage.vp_name_w: "gengxiuyu";
        method.plat_name = sessionStorage.plat_name_w? sessionStorage.plat_name_w: "58";
        method.biz_name = sessionStorage.biz_name_w? sessionStorage.biz_name_w: "page_detail";

        //如果是子节点，需要获取first_order值
        if (!treeNode.isParent) {
            var parentNode = treeNode.getParentNode(),
                first_order = parentNode.description,
                second_order = treeNode.description;

            method.first_order = first_order;
            method.second_order = second_order;


           /* $.ajax({
             //url: 'http://fvp.58corp.com/user_admin.php',
             url: 'http://10.9.17.55:8080/user_admin.php',
             type: 'post',
             async: true,
             data: method,
             dataType: 'json',
             success: function(data, textStatus) {
                 console.log("method: ", method);
                 treeNode.checked = false;
                 treeNode.checkedOld = false;
                zTree.updateNode(treeNode);
             }
             });*/

            treeNode.checked = false;
            treeNode.checkedOld = false;
            zTree.updateNode(treeNode);
            zTree.refresh();
            return false;
        }
    } else {
        return false;
    }
}
function showRemoveBtn (treeId, treeNode) {
    if (treeNode.checked && treeNode.checkedOld && !treeNode.isParent) {
        return true;
    } else {
        return false;
    }
}
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
        sessionStorage.biz_name_w = biz_name;
        /*
         * 发送请求，获取该plat_name和biz_name之下的权限信息
         * */
        var authOwnedList = [
         {
         first_order: "page_detail",
         second_order: "pvuv"
         },
         {
         "first_order": "visitview",
         "second_order": "visit_count"
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

        $.ajax({
            //                                 url: 'http://fvp.58corp.com/user_admin.php',
            url: 'http://10.9.17.55:8080/user_admin.php',
            type: 'post',
            async: true,
            data: {
                'operate': 'select',
                'type': 2,
                'biz_name': biz_name,
                'user_name': $("#user_name").val(),
                'plat_name': plat_name
            },
            dataType: 'json',
            success: function(data, textStatus) {
                if (data.status !== "succcess") {
                    alert("查找数据失败");
                    return;
                } else {
                    var zNodes = AuthManager.initZNodesList(plat_name, biz_name, data.data);

                    $(".authTree").removeClass("dead");
                    var treeObj = $("#treeDemo");
                    $.fn.zTree.init(treeObj, setting, zNodes);
                }
            }
        });

    });

}


$(function(){

    sessionStorage.plat_name_w = "58";

    var vpnameData = AuthManager.handleLocalData(ADMIN_LIST);
    AuthManager.initDropdown($('#selectVPName'), vpnameData, function () {
        sessionStorage.vp_name_w = this.value();
    });

    callBackInitZNodes("58");


    $(".query_plat_name a").click(function () {

        $(".query_plat_name a").removeClass("curr");
        $(this).addClass("curr");

        var plat_name = $(this).attr("data-val");
        sessionStorage.plat_name_w = plat_name;

        callBackInitZNodes(plat_name);

    })


    /*输入名字时进行模糊查询*/
    $("#user_name").keyup(function () {
        var _this = this;
        var user = _this.value;

        if (user === "") {
            $(".query_box").empty().fadeOut(500);
            return false;
        }

         $.ajax({
             //url: 'http://fvp.58corp.com/user_admin.php',
             //url: 'http://10.9.17.55:8080/user_admin.php',
             type: 'post',
             async: true,
             data: {
                 'operate': 'select',
                 'type': 3,
                 'user_name': user
             },
             dataType: 'json',
             success: function(data, textStatus) {
                 if (data.status !== "success") {
                     return;
                 }
                 var nameList = data.user_list.split(","),
                     nameHtml = "";
                 for (var i = 0; i < nameList.length; i++) {
                     var name = nameList[i];
                     nameHtml += "<a href='javascript:void(0)'>" + name + "</a>";
                 }
                 $(".query_box").html(nameHtml).fadeIn(500);
             }
         });
        /*var ret = Math.floor(Math.random()*100)%2 == 0? true: false;
        if (ret) {
            var nameStr = "liushaohua,liuweiwei,wangliuxian,wuliuan",
                nameList = nameStr.split(","),
                nameHtml = "";
            for (var i = 0; i < nameList.length; i++) {
                var name = nameList[i];
                nameHtml += "<a href='javascript:void(0)'>" + name + "</a>";
            }
            $(".query_box").html(nameHtml).fadeIn(0);
            //console.log("kkkkkk")
        }*/

    }).keydown(function () {
        var user = this.value;
        if (user === "") {
            $(".query_box").empty().fadeOut(500);
            //return false;
        }
    });

    $(".query_box").on("click", "a", function () {
        $(".query_box").empty().fadeOut(500);
        $("#user_name").val($(this).html());
    })
});



