/**
 * Created by Echo on 2015/12/3.
 */


var AuthManager =  {

    /**
     * 初始化权限增加页面
     * */
    initAppearance: function () {

    },

    /**
     * 初始化操作者列表
     *
     * */
    initAdmins: function () {

    },

    /**
     * 初始化业务线列表
     *
     * */
    initDropdown: function ($obj, localData, changeFunc) {

        var selectDatasetType = new DropdownBox({
            parent: $obj,
            localData : localData,
            refreshShowable : false,
            searchShowable : false,
            onChangeFunc : changeFunc
        });
    },

    /**
     * 获取初始化业务线列表所需的localData
     * */
    handleLocalData: function (biz_names) {

        var biz_local = [];

        for (var i = 0; i < biz_names.length; i++) {


            var biz_name = biz_names[i].value,
                biz_name_text = biz_names[i].text;
            var node = {
                value: biz_name,
                label: biz_name_text
            };


            if (biz_names[i].selected) {
                sessionStorage.vp_name_w = biz_name;
                node.selected = true;
            }

            biz_local.push(node);
        }

        return biz_local;
    },


    /**
     * 生成树的节点
     * data是已有权限
     * */
    initZNodesList: function (plat_name, biz_name, data) {
        //获取
        var plat = plat_name == "58"? FIRST_SECOND_ORDERS_58: FIRST_SECOND_ORDERS_GANJI,
            type = (biz_name != "58-all" && biz_name != "sys_monitor")? 'normal': biz_name,
            fir_sec_orders = plat[type],
            zNodes = [];

        for (var i = 0; i < fir_sec_orders.length; i++) {

            var first_order = fir_sec_orders[i].first_order.value,
                first_order_text = fir_sec_orders[i].first_order.text,
                checked1 = false,
                firstID = i + 1,
                second_orders = fir_sec_orders[i].second_order,
                count = 0;

            for (var j = 0; j < second_orders.length; j++) {

                var second_order = second_orders[j].value,
                    second_order_text = second_orders[j].text,
                    secondID = firstID * 10 + j + 1,
                    checked2 = false;

                for (var k = 0; k < data.length; k++) {
                    if(data[k].first_order === first_order
                        &&  data[k].second_order === second_order ) {
                        checked2 = true;
                        count++;
                    }
                }
                zNodes.push({ id: secondID, pId: firstID, name: second_order_text, checked: checked2, /*open:true,*/ description: second_order});
            }

            if (count === second_orders.length) checked1 = true;

            zNodes.push({ id: firstID, pId: 0, name: first_order_text, checked: checked1,open:true, description: first_order});

        }

        return zNodes;

    },
    /*
    * 处理树节点操作： 删除 或者 新增
    * */
     handleZtree: function (method) {
         var method2 = {};
         $.extend(true, method2, method);


         var zTree_Menu = $.fn.zTree.getZTreeObj("treeDemo");
         if (!zTree_Menu) return;
         var checkedNodes = zTree_Menu.getCheckedNodes();

         method2.user_name = $("#user_name").val();
         method2.vp_name = sessionStorage.vp_name_w? sessionStorage.vp_name_w: "gengxiuyu";
         method2.plat_name = sessionStorage.plat_name_w? sessionStorage.plat_name_w: "58";
         method2.biz_name = sessionStorage.biz_name_w? sessionStorage.biz_name_w: "page_detail";

         var isUpdate = method.operate === "delete"? true: false;

         for (var j = 0; j < checkedNodes.length; j++) {

             (function (i) {
                 var level = checkedNodes[i].level;

                 /*1级节点处理方式*/
                 if (level == 0) {
    //                        continue;
                    /*一级节点处理方式*/
                    /*if (checkedNodes[i].children) {
                     var sec_list = checkedNodes[i].children;

                     if (isUpdate) {
                     checkedNodes[i].checked = false;
                     checkedNodes[i].checkedOld = false;
                     zTree_Menu.updateNode(checkedNodes[i]);
                     }

                     method.first_order = order;

                     var secStr = "";
                     for (var j = 0; j < sec_list.length; j++) {
                     //不是之前已有权限不会发送删除命令
                     //                        if (sec_list[j].checked && isUpdate) {
                     if (isUpdate) {
                     if (sec_list[j].checked && sec_list[j].checkedOld) {
                     secStr += sec_list[j].description + ",";
                     sec_list[j].checked = false;
                     sec_list[j].checkedOld = false;
                     zTree_Menu.updateNode(sec_list[j]);
                     }
                     } else {
                     if (sec_list[j].checked && !sec_list[j].checkedOld) {
                     //                                method.first_order = order;
                     //                                method.second_order = sec_list[j].description;
                     secStr += sec_list[j].description + ",";
                     }
                     }

                     }
                     if (secStr) {
                     method.second_order = secStr.substring(0, secStr.length - 1);
                     } else {
                     continue;
                     }
                     }*/
                 } else {

                     var method3 = {},
                         order,
                         parNode;

                     if (isUpdate) {
                         if (checkedNodes[i].checked && checkedNodes[i].checkedOld) {
                             order = checkedNodes[i].description;
                             parNode = checkedNodes[i].getParentNode();


                             method3.first_order = parNode.description;
                             method3.second_order = order;

                             $.extend(true, method3, method2);

                             console.log(method3);

                             checkedNodes[i].checked = false;
                             checkedNodes[i].checkedOld = false;
                             zTree_Menu.updateNode(checkedNodes[i]);
                             zTree_Menu.refresh();

                         }
                     } else {
                         if (checkedNodes[i].checked && !checkedNodes[i].checkedOld) {
                             order = checkedNodes[i].description;
                             parNode = checkedNodes[i].getParentNode();


                             method3.first_order = parNode.description;
                             method3.second_order = order;

                             $.extend(true, method3, method2);

                             console.log(method3);

                         }
                     }



                    /*向秀玉姐发送请求，批量删除权限*/
                     $.ajax({
                         //                                 url: 'http://fvp.58corp.com/user_admin.php',
                         //                                 url: 'http://10.9.17.55:8080/user_admin.php',
                         type: 'post',
                         async: true,
                         data: method3,
                         dataType: 'json',
                         success: function(data, textStatus) {
                             if (data.status !== "success") {
                                 alert("删除发生问题！");
                             }
                         }
                     });
                }
            })(j);
        }
    },

    /*
    * 获取返回的权限信息与所有信息对比的，ifchecked
    * */

    getUserCheckedNodes: function (method) {

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

        $.extend(true, method, {
            'operate': 'select',
            'type': 2
        });
        //与
         $.ajax({
             //                                 url: 'http://fvp.58corp.com/user_admin.php',
             //                                 url: 'http://10.9.17.55:8080/user_admin.php',
             type: 'post',
             async: true,
             data: method,
             dataType: 'json',
             success: function(data, textStatus) {
                console.log("method: ", method);
             }
         });


    }
};
