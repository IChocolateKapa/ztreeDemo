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
        var selectVPName = new DropdownBox({
            parent: $obj,
            localData : localData,
            refreshShowable : false,
            searchShowable : false,
            onChangeFunc : function () {
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

                var zNodes = self.initZNodesList(plat_name, biz_name, authOwnedList);


                $(".authTree").removeClass("dead");
                var treeObj = $("#treeDemo");
                $.fn.zTree.init(treeObj, setting, zNodes);
                /*下面三行代码是初始时选中第一个节点*/
                //var zTree_Menu = $.fn.zTree.getZTreeObj("treeDemo");
                //var curProgramNode = zTree_Menu.getNodes()[0];
                //zTree_Menu.selectNode(curProgramNode);
            }
        });
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
                sessionStorage.vp_name = biz_name;
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
                first_order_text = fir_sec_orders[i].first_order.text;

            var checked1 = true;//????如何取得checked属性，需要与传入data做对比,先不做这个功能，一步一步么

            var firstID = i + 1;
            zNodes.push({ id: firstID, pId: 0, name: first_order_text, checked: checked1,open:true, description: first_order});

            var second_orders = fir_sec_orders[i].second_order;
            for (var j = 0; j < second_orders.length; j++) {

                var second_order = second_orders[j].value,
                    second_order_text = second_orders[j].text,
                    secondID = firstID * 10 + j + 1;

                var checked2 = (j%2 == 0)? true: false;

                zNodes.push({ id: secondID, pId: firstID, name: second_order_text, checked: checked2, /*open:true,*/ description: second_order});
            }

        }

        return zNodes;

    },

    /*
    * 获取返回的权限信息与所有信息对比的，ifchecked
    * */

    getCheckedNodes: function () {
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

        //与

    }
};
