define(function (require) {

    var $=require('jquery');
    var _=require('lib/util');
    var popup=require('lib/popup');
    require('lib/jquery.datepicker');

    var user={
        loading: _.syncButton
    };

    user.showLogin=function () {
        !this.loginDialog&&(this.loginDialog=this._createLoginDialog());
        this.loginDialog.show()
    };

    user._createLoginDialog=function () {
        var dialog=new popup.Dialog({
            title: '',
            drag: false,
            width: 759,
            height: 449,
            content: ['<div class="d_login js_login_con"><div class="hd">登录</div><div class="bd">',
                '<ul>',
                    '<li><span>手机：</span><input class="js_mobile" /></li>',
                    '<li><span>邮箱：</span><input class="js_email" /></li>',
                    '<li><span>验证码：</span><input class="js_validcode validcode" /><img class="validcode" data-src="/checkcode/1.jpg" /></li>',
                '</ul>',
            '</div>',
            '<div class="action"><input class="btn js_login" type="button" value="立即登录" /></div></div>',
            '<div class="d_register js_register_con"><div class="hd">还没有注册？立即注册，预约免费课程咨询！</div><div class="bd">',
                '<ul>',
                    '<li><span>姓名：</span><input class="js_username" /></li>',
                    '<li><span>手机：</span><input class="js_mobile" /></li>',
                    '<li><span>邮箱：</span><input class="js_email"  /></li>',
                    '<li><span>年龄：</span><input class="js_birth" /></li>',
                '</ul>',
            '</div>',
            '<div class="action"><input class="btn js_register" type="button" value="立即注册" /></div></div>'].join('')
        });

        var $cont=dialog.container.addClass('login_dialog'),
            $validcode=$cont.find('img.validcode');

        $validcode.attr('src',$validcode.data('src')+'?r='+new Date().getTime());

        return dialog;
    };

    user.loginDialog=user._createLoginDialog();

    $('.js_birth').datePicker({
        clickInput: true,
        verticalOffset: 4,
        startDate: "1960-01-01"
    }).dpSetDisplayedMonth('0','1980');

    _.syncButton('.js_register',function () {
        var $con=this.closest('.js_register_con');

        return {
            url: '/json/user/register',
            data: {
                username: $con.find('.js_username').val(),
                mobile: $con.find('.js_mobile').val(),
                email: $con.find('.js_email').val(),
                birthday: $con.find('.js_birth').val()
            },
            success: function (res) {
                if(res.success) {
                    alert("注册成功！");
                    location.reload();
                } else {
                    alert(res.msg);
                }
            }
        }
    });

    _.syncButton('.js_login',function () {
        var $con=this.closest('.js_login_con');

        return {
            url: '/json/user/login',
            data: {
                mobile: $con.find('.js_mobile').val(),
                email: $con.find('.js_email').val(),
                validcode: $con.find('.js_validcode').val()
            },
            success: function (res) {
                if(res.success) {
                    alert("登录成功！");
                    location.reload();
                } else {
                    alert(res.msg);
                }
            }
        }
    });

    $('.js_nav_login').click(function () {
        user.showLogin();
    });

    return user;
});