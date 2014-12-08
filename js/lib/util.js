define(function (require,exports,module) {
    var $=require('jquery'),
        _=require('./underscore'),
        _guid=0,
        doc=document,
        ArrayProto=Array.prototype,
        push=ArrayProto.push,
        slice=ArrayProto.slice,
        concat=ArrayProto.concat,
        ua=navigator.userAgent;

    !window.JSON&&require("sl/util/json");

    var util={
        isIE: /MSIE/.test(ua),
        isIE6: /MSIE 6/.test(ua),
        guid: function () {
            return ++_guid;
        },
        format: function (t,obj) {
            return t.replace(/\{([^}]+)\}/g,function (g0,key) {
                var $data=obj[key];
                return $data;
            });
        },
        pad: function (num,n) {
            var a='0000000000000000'+num;
            return a.substr(a.length-(n||2));
        },
        sum: function (arr,f) {
            var res=0;
            if(f) for(var i=0,n=arr.length;i<n;i++) res+=f(i,arr[i],n);
            else for(var i=0,n=arr.length;i<n;i++) res+=arr[i];
            return res;
        },
        formatDate: function (d,f) {
            if(typeof d=="string"&&/^\/Date\(\d+\)\/$/.test(d)) {
                d=new Function("return new "+d.replace(/\//g,''))();
            }

            var y=d.getFullYear()+"",M=d.getMonth()+1,D=d.getDate(),H=d.getHours(),m=d.getMinutes(),s=d.getSeconds(),mill=d.getMilliseconds()+"0000",pad=this.pad;
            return (f||'yyyy-MM-dd HH:mm:ss').replace(/\y{4}/,y)
                .replace(/y{2}/,y.substr(2,2))
                .replace(/M{2}/,pad(M))
                .replace(/M/,M)
                .replace(/d{2,}/,pad(D))
                .replace(/d/,d)
                .replace(/H{2,}/i,pad(H))
                .replace(/H/i,H)
                .replace(/m{2,}/,pad(m))
                .replace(/m/,m)
                .replace(/s{2,}/,pad(s))
                .replace(/s/,s)
                .replace(/f+/,function (w) {
                    return mill.substr(0,w.length)
                })
        },
        addStyle: function (css) {
            var style=doc.createElement("style");
            style.type="text/css";
            try {
                style.appendChild(doc.createTextNode(css));
            } catch(ex) {
                style.styleSheet.cssText=css;
            }
            var head=doc.getElementsByTagName("head")[0];
            head.appendChild(style);
        },
        submit: function (form,url,fn) {
            var me=$(form),
                blankFn=function () { };

            var settings=url&&typeof url==="object"?$.extend({
                url: me.attr('action'),
                validate: function () {
                    return true;
                },
                beforeSend: blankFn,
                success: blankFn,
                error: blankFn
            },url):{
                url: $.isFunction(url)&&me.attr('action')||url,
                success: fn||!fn&&$.isFunction(url)&&url
            };

            if(settings.validate&&!settings.validate()) {
                settings.error&&settings.error.call(me,'表单验证失败');
            } else {
                settings.beforeSend&&settings.beforeSend.call(me);
                if(me.has('[type="file"]').length>0) {
                    me.attr('action',settings.url);

                    util.submitForm(me,function (data) {
                        settings.success&&settings.success.call(me,data)
                    });
                } else {
                    $.ajax({
                        url: settings.url,
                        type: 'POST',
                        dataType: 'json',
                        data: me.serialize(),
                        success: function (data) {
                            settings.success&&settings.success.call(me,data)
                        },
                        error: function (xhr) {
                            settings.error&&settings.error.call(me,xhr);
                        }
                    });
                }
            }
        },
        submitForm: function (form,callback) {
            var $form=$(form),
                $callback=$form.find('[name="callback"]'),
                guid=this.guid(),
                target="_submit_iframe"+guid,
                eventName="_submitForm_"+guid,
                $iframe=$('<iframe style="top:-999px;left:-999px;position:absolute;display:none;" frameborder="0" width="0" height="0" name="'+target+'"></iframe>');

            window[eventName]=function (data) {
                callback.call($form,data);
                $iframe.remove();
                delete window[eventName];
            };

            $(doc.body).append($iframe);
            if(!$callback.length)
                $callback=$('<input type="hidden" name="callback" />').appendTo($form);

            $callback.val(eventName)
            $form.attr("target",target)
                .submit();
        },

        syncButton: function ($btn,fn) {
            !($btn instanceof $)&&($btn=$($btn));

            $btn.click(function (e) {
                var $btn=$(e.currentTarget);
                if(!$btn.hasClass('disabled')) {

                    var val=$btn[0].tagName=="INPUT"?"val":'html',
                        data=fn.call($btn);

                    if(!data) return;

                    $btn.data('val',$btn[val]())
                    $btn.addClass('disabled')[val](($btn[0].tagName=="INPUT"?'':'<i></i>')+"请稍候...");

                    $.ajax({
                        url: data.url,
                        type: 'POST',
                        dataType: 'json',
                        data: data.data,
                        success: function (res) {
                            data.success&&data.success.call($btn,res);
                        },
                        error: (data.error||function (res) {
                            alert((res&&res.msg)||"网络错误");
                        }),

                        complete: function () {
                            $btn.removeClass('disabled')[val]($btn.data('val'));
                        }
                    });
                }
            });
        },

        queryString: function (name) {
            var result=location.search.match(new RegExp("[\?\&]"+name+"=([^\&]+)","i"));
            return (result==null||result.length<1)?null:result[1];
        },
        offsetParent: function (el) {
            var parent=el.parent(),
                position;
            while(parent.length!=0&&parent[0].tagName.toLowerCase()!="body") {
                if($.inArray(parent.css('position'),['fixed','absolute','relative'])!= -1)
                    return parent;
                parent=parent.parent();
            }
            return parent;
        },
        cookie: function (a,b,c,p) {
            if(typeof b==='undefined') {
                var res=document.cookie.match(new RegExp("(^| )"+a+"=([^;]*)(;|$)"));
                if(res!=null)
                    return unescape(res[2]);
                return null;
            } else {
                if(typeof b===null) {
                    b=this.cookie(name);
                    if(b!=null) c= -1;
                    else return;
                }
                if(c) {
                    var d=new Date();
                    d.setTime(d.getTime()+c*24*60*60*1000);
                    c=";expires="+d.toGMTString();
                }
                document.cookie=a+"="+escape(b)+(c||"")+";path="+(p||'/')
            }
        },
        store: function (key,value) {
            if(typeof value==='undefined')
                return JSON.parse(this.cookie(key));
            if(value===null)
                this.cookie(key,-1);
            else
                this.cookie(key,JSON.stringify(value));
        }
    };

    _.extend(_,util);

    module.exports=_;
});