define(function (require) {
    var $=require('jquery'),
        view=require('sl/view'),
        tmpl=require('sl/tmpl'),
        popup=require('lib/popup');

    var isImage=function (item) {
        //暂时禁用该功能
        return false;

        if(item.tagName!="IMG")
            return false;
        var url=item.src.replace(/^http\:\/\//,"");
        url=url.substr(url.indexOf('/'));
        if(!/^\/media\//i.test(url)) {
            return false;
        }

        var p=item.parentNode;
        while(p&&p.tagName!="BODY") {
            if($(p).attr("editor")&&$(p).attr("editor")=="media")
                return false;
            p=p.parentNode;
        }

        return true;
    };


    function bindEditor(elem) {
        var editor=$("<DIV>").appendTo(document.body).css({
            display: "none",
            width: "40px",
            height: "14px",
            background: "#c00",
            color: "#fff",
            position: "absolute",
            "z-index": "1000",
            cursor: "pointer",
            "text-align": "center",
            fontSize: '12px'
        }).on("mouseenter",function () {
            var rect=$(elem).offset(),
                w=elem.offsetWidth,
                h=elem.offsetHeight;
            shower.css({
                display: "block",
                width: w+"px",
                height: h+"px",
                top: (rect.top-2)+"px",
                left: (rect.left-2)+"px"
            });
        }).html("[编辑]");

        var showEditor=function () {
            var rect=$(elem).offset(),
                w=elem.offsetWidth;

            if(elem.tagName=="IMG")
                editor.css({
                    top: rect.top+"px",
                    left: rect.left+"px"
                });
            else
                editor.css({
                    top: rect.top+"px",
                    left: (rect.left+w-40)+"px"
                });
        };

        $(elem).mouseenter(function () {
            editor.show();
            showEditor();
        });

        var mediaName=$(elem).attr("medianame"),
                mediaType=$(elem).attr("editor");

        if(mediaType=="media") {
            editor.on("click",function () {
                showPopup("/Manage/Media/Medias/?name="+mediaName,580,350);
            });
        } else if(mediaType=="htmlblock") {
            editor.on("click",function () {
                showPopup("/Manage/Media/HtmlBlocks/?name="+mediaName,580,350);
            });
        } else if(mediaType=="links") {
            editor.on("click",function () {
                showPopup("/Manage/Media/Links/?name="+mediaName,680,350);
            });
        } else if(mediaType=="products") {
            editor.on("click",function () {
                showPopup("/Manage/Manage/Products/?name="+mediaName,580,350);
            });
        } else if(elem.tagName=="IMG") {
            var url=elem.src.replace(/^http\:\/\//,"");
            url=url.substr(url.indexOf('/'));
            if(!/^\/media\//i.test(url))
                return;
            editor.on("click",function () {
                url=elem.src.replace(/^http\:\/\//,"");
                url=url.substr(url.indexOf('/'));
                showPopup("/Manage/Media/ModifyPicture/?src="+url,350,174);
            });
        }
    };
    window.resizePopup=function (width,height) {
        settingPopup&&settingPopup.resize(width,height);
    };

    var settingPopup;
    var urls={
        images: '/Manage/Media/Images/',
        htmlblock: '/Manage/Media/HtmlBlocks/',
        links: '/Manage/Media/Links/'
    };

    var SettingView=view.extend({
        isDialogOpen: false,

        template: tmpl('<div style="position:absolute;border: 1px solid #c00;z-index:10000"><div data-type="${type}" data-name="${name}" style="background:#c00;position:absolute;right:0;top:0;color:#fff;font-size:12px;padding: 2px 5px;">编辑</div></div>'),

        initialize: function () {

            this.$target=$(this.template({
                name: this.$el.data('name'),
                type: this.$el.data('setting'),
                desc: this.$el.data('desc')

            })).appendTo(document.body);

            this.listenTo(this.$target,'mouseleave',function () {
                this.hide();

            }).listenTo(this.$target,'click','[data-name]',function (e) {
                var name=e.currentTarget.getAttribute('data-name');
                var type=e.currentTarget.getAttribute('data-type');
                var desc=e.currentTarget.getAttribute('data-desc');

                !settingPopup&&(settingPopup=new popup.IFrame({ width: 580,height: 350 }));

                settingPopup.load(urls[type]+"?name="+name);
                settingPopup.title(desc||"媒体管理");
                settingPopup.show();
            });
        },

        show: function (el,target) {
            el=el||this.$el;
            target=target||this.$target;

            target.css({
                top: el.position().top,
                left: el.position().left,
                height: el.outerHeight(),
                width: el.outerWidth()

            }).show();
        },

        hide: function () {
            if(!this.isDialogOpen) {
                this.$target.hide();
            }
        }
    });

    $(document.body).delegate('[data-setting]','mouseenter',function (e) {
        var target=e.currentTarget,
            settingView=target.settingView||(target.settingView=new SettingView(target));

        settingView.show();
    });

});