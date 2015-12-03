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
    initBizNamesDropdown: function ($obj, plat_name) {

        var localData = this.handleLocalData(plat_name);

        var selectDatasetType = new DropdownBox({
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
     * 获取初始化业务线列表所需的localData
     * */
    handleLocalData: function (plat_name) {

        var biz_names = PLAT_BIZ_NAMES[plat_name],
            biz_local = [];

        for (var i = 0; i < biz_names.length; i++) {

            var biz_name = biz_names[i].value,
                biz_name_text = biz_names[i].text;

            biz_local.push({
                value: biz_name,
                label: biz_name_text
            })
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
        var zNodes2 =[
            { id:1, pId:0, name:"app", checked: false, open:true, description: "app's value"},
            { id:11, pId:1, name:"a_4_site_data(4网经纪人数据分析)", checked: false, open:true},
            { id:2, pId:0, name:"bi", checked: false, open:true},
            { id:21, pId:2, name:"bi-You", checked: false},
            { id:22, pId:2, name:"a_4_site_data(4网经纪人数据分析)",  checked: false},
            { id:23, pId:2, name:"a_4_site_data(4网经纪人数据分析)", checked: false}
        ];
        for (var i = 0; i < fir_sec_orders.length; i++) {

            var first_order = fir_sec_orders[i].first_order.value,
                first_order_text = fir_sec_orders[i].first_order.text;

            zNodes.push()

            var second_orders = fir_sec_orders[i].second_order;
            for (var j = 0; j < second_orders.length; j++) {

            }

        }

    },


    /**
     *
     * */
    addPerson: function () {

    }

};
