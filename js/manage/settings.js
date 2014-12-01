define(function (require) {
    var $=require('jquery'),
        view=require('sl/view'),
        tmpl=require('sl/tmpl'),
        popup=require('lib/popup');

    window.resizeSettingPopup=function (width,height) {
        settingPopup&&settingPopup.resize(width,height);
    };

    var settingPopup;
    var urls={
        images: '/Manage/Media/Images/',
        htmlblocks: '/Manage/Media/HtmlBlocks/',
        links: '/Manage/Media/Links/'
    };

    var SettingView=view.extend({
        isDialogOpen: false,

        template: tmpl('<div style="position:absolute;border: 1px solid #c00;z-index:10000"><div data-type="${type}" data-name="${name}" style="background:#c00;position:absolute;right:0;top:0;color:#fff;font-size:12px;padding: 2px 5px;">编辑</div></div>'),

        initialize: function () {
            var that=this;

            this.$target=$(this.template({
                name: this.$el.data('name'),
                type: this.$el.data('setting'),
                desc: this.$el.data('desc')

            })).appendTo(document.body);

            this.listenTo(this.$target,'mouseleave',function () {
                this.hide();

            }).listenTo(this.$target,'click','[data-name]',function (e) {
                that.isDialogOpen=true;

                var name=e.currentTarget.getAttribute('data-name');
                var type=e.currentTarget.getAttribute('data-type');
                var desc=e.currentTarget.getAttribute('data-desc');

                !settingPopup&&(settingPopup=new popup.IFrame({ width: 650,height: 400 }));

                settingPopup.load(urls[type]+"?name="+name);
                settingPopup.title(desc||"媒体管理");
                settingPopup.show();
            });
        },

        show: function (el,target) {
            el=el||this.$el;
            target=target||this.$target;

            target.css({
                top: el.offset().top,
                left: el.offset().left,
                height: el.outerHeight(),
                width: el.outerWidth()

            }).show();
        },

        hide: function () {
            if(!this.isDialogOpen) {
                this.$target.hide();
            }
            this.isDialogOpen=false;
        }
    });

    $(document.body).delegate('[data-setting]','mouseenter',function (e) {
        var target=e.currentTarget,
            settingView=target.settingView||(target.settingView=new SettingView(target));

        settingView.show();
    });

});