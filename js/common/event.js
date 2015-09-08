/**
 * Created by 58 on 2015/9/2.
 */

var eventUtil = {
    /*绑定事件*/
    addHandler: function(element, type, method){
        if(element.addEventListener){
            element.addEventListener(type, method, false);
        } else if(element.attachEvent){
            element.attachEvent('on'+type, method);
        } else{
            /*Dom 0级事件处理程序*/
            /*js中，所有点号连接的事件处理程序都可以使用中括号来代替， 即：*/
            /*element.onclick === element['onclick']*/
            element['on'+type] = method;
        }
    },
    /*删除绑定事件*/
    removeHandler: function(element, type, method){
        if(element.removeEventListener){
            element.removeEventListener(type, method, false);
        } else if(element.dettachEvent){
            element.dettachEvent('on'+type, method);
        } else{
            /*Dom 0级事件处理程序*/
            /*js中，所有点号连接的事件处理程序都可以使用中括号来代替， 即：*/
            /*element.onclick === element['onclick']*/
            element['on'+type] = null;
        }
    },

    /*获取事件*/
    getEvent: function(event){
        return event?event:window.event;
    },

    /*获取事件类型*/
    getType: function(event){
        return event.type;
    },

    /*获取事件目标对象target*/
    getTarget: function(event){
        return event.target || event.srcElement;
    },

    /*取消事件默认行为*/
    preventDefault: function(event){
        if(event.preventDefault){
            event.preventDefault();
        } else{
            event.returnValue = false;
        }
    },

    /*取消事件冒泡*/
    stopPropagation: function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        } else{
            event.cancelBubble = false;
        }
    },

    /*鼠标按下事件*/
    enterKeyPress: function(event, handler){
        event = this.getEvent(event);
        if(event.keyCode == 13){
            handler();
        } else{
            return false;
        }
    }


}