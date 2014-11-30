define(function (require,exports,module) {
    var $=require('jquery');
    function Slide(options) {
        var defaults={
            slide: null,
            items: null,
            itemWidth: 0,
            currCls: 'curr',
            triggers: null,
            arrowLeft: null,
            arrowRight: null,
            triggerEvent: 'click',
            direction: 'h',
            time: 0,
            visible: 1,
            onTrigge: null,
            step: 1
        };
        options=$.extend(defaults,options),
        triggers=[];

        if(options.triggers) {
            if($.isArray(options.triggers)) {
                $.each(options.triggers,function (i,item) {
                    triggers.push($(item));
                });
            } else
                triggers.push($(options.triggers));
        }

        var that=this;

        this.options=options;
        this.slide=$(options.slide);
        this.items=$(options.items);
        this.triggers=triggers;
        this.index=0;

        this.arrowLeft=$(options.arrowLeft).click(function () {
            if(!$(this).hasClass('disabled')) {
                that.trigge(that.index-options.step);
            }
        }).addClass('disabled');

        this.arrowRight=$(options.arrowRight).click(function () {
            if(!$(this).hasClass('disabled')) {
                that.trigge(that.index+options.step);
            }
        });

        if(this.items.length==options.visible)
            this.arrowRight.addClass('disabled');

        this._init();
    };

    Slide.prototype._init=function () {
        var that=this,
            slide=this.slide,
            triggers=this.triggers,
            options=this.options,
            items=this.items,
            direction=options.direction,
            itemWidth=options[direction=='h'?'itemWidth':'itemHeight']||items.eq(that.index)[direction=='h'?'outerWidth':'outerHeight']();

        var size=direction=='h'?'width':'height';

        items.css(size,itemWidth);
        slide.css(size,itemWidth*items.length);
        slide.parent().on('mouseenter',function () {
            that.stop();
        })
        .on('mouseleave',function () {
            that.start();
        });

        $.each(triggers,function (i,item) {
            item.on(options.triggerEvent,function () {
                that.stop();
                that.trigge(item.index(this));
            });
        });

        this.start();
    };

    Slide.prototype.stop=function () {
        if(this.timer) {
            clearTimeout(this.timer);
            this.timer=null;
        }
    };

    Slide.prototype.trigge=function (index) {
        var that=this,
            slide=this.slide,
			options=this.options,
			direction=options.direction,
			items=this.items,
            width=options[direction=='h'?'itemWidth':'itemHeight']||items.eq(index)[direction=='h'?'outerWidth':'outerHeight'](),
            triggers=this.triggers,
            length=items.length,
			currCls=options.currCls,
			onTrigge=options.onTrigge;
        //step = options.step;

        var origIndex=that.index;

        if(index>=length-options.visible+options.step) index=0;
        if(index<0) index=length;
        if(origIndex==index) return;

        that.arrowLeft[index==0?'addClass':'removeClass']('disabled');
        that.arrowRight[index==length-options.visible?'addClass':'removeClass']('disabled');

        that.index=index;

        var anim={};
        anim[direction=='h'?'left':'top']=width*index* -1;

        slide.animate(anim,200,function () {
            $.each(triggers,function (i,item) {
                $(item).removeClass(currCls);
                item.eq(index).addClass(currCls)
            });
            if(onTrigge) onTrigge.call(that,index);
        });
    };

    Slide.prototype.start=function () {
        var that=this,
            time=that.options.time;

        if(!time) return;

        if(this.timer) this.stop();

        this.timer=setTimeout(function () {
            that.trigge(that.index+1);
            that.stop();
            that.timer=setTimeout(arguments.callee,time);
        },time);
    };

    module.exports=Slide;
});