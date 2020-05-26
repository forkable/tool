/**
 * @fileoverview Countdown
 * @desc ʵ�õĵ���ʱ�����
 *       ��ͳ�ĵ���ʱ���ͨ������������ʵ������ʱ���ʼ��һ����ʱ����Ȼ�󽫲������ڻص������У���ô����2��ȱ��
 *       1.����Բ���еĲ�����д�ڻص���
 *       2.�ص��в�����ʱ���ᵼ�µ���ʱ��׼����ο���ʱ������ԭ��http://www.cnblogs.com/rainman/archive/2008/12/26/1363321.html
 *       simplecountdownʵ��ԭ��ܼ򵥣�ʵ������ʱ���¼��ʼʱ��ͽ���ʱ�䣬���ܸ���ʵ�����ʵʱfetchʣ���¼�
 * @author ��ط<satans17@gmail.com>
 * @date 20110604
 * @version 1.0
 * @depends kissy core
 */
KISSY.add("gallery/easycountdown/1.0/easycountdown",function(S, undefined){
    var $ = S.all, DOM = S.DOM,
		//ʱ�䵥λ
		timeUnitsKey = ["d","h","m","s","i"],
		//ʱ�䵥λ��Ӧ�ĺ�����
        timeUnits = {
            "d": 86400000,//24*60*60*1000,
            "h": 3600000,//60*1000*60
            "m": 60000,//60*1000
            "s": 1000,
            "i":1
        },
        //�ַ�����ʽ��ʱ��,��ʱֻ֧��1900-12-12 12:12:12 ���ָ�ʽ
        parseDate = function(str){
			if(S.isDate(str)){
				return str;
			}else if(/^(\d{4})\-(\d{1,2})\-(\d{1,2})(\s+)(\d{1,2}):(\d{1,2}):(\d{1,2})$/ig.test(str.replace(/\./g,"-"))){
                var d = str.match(/\d+/g);
                return new Date(d[0],d[1]-1,d[2],d[3],d[4],d[5]);
            }else{
                return null;
            }
        };


    /**
     * Count down core
     * @param finish {Date | Number} ����ʱ��|ʣ��ʱ��
     * @param config {Object} ������
     */
    function Core(finish,config){
        var self = this;
            cfg = {
				//��ʼʱ��
                timeBegin: new Date(),
				//У׼url
                collateurl:"#",
                //У׼ָ
				collateval:0
            };

		/**
		 * ��¼��ʼ��ʱʱ��
		 */
        self._timeStart = new Date();

		/**
		 * ����
		 */
        self.config = S.merge(cfg,config||{});

		/**
		 * ʣ��ʱ��
		 */
        self.timeRemain = self._countTime(finish);

        self.container = null;

    }

    Core.prototype = {
    	  resetTime : function(finish){
    	  		var self=this;
    	  		self.timeRemain = self._countTime(finish);
    	  		if(self.timer){
					clearInterval(self.timer);
    	  		}
    	  		self.counter(self.container);
    	  		return self;
    	  },
        // ����ʣ��ʱ��
        _countTime: function(finish){
            var self = this, cfg = self.config,
                begin = cfg.timeBegin,
                end = 0;
            //finishΪDate����
            if(S.isDate(finish)){
                finish = finish;
            }
            //finishΪ�ַ�����������
            else if(parseDate(finish)){
                finish = parseDate(finish);
            }
            //ֱ������ʣ��ʱ�䣬ʣ�������
            else if(!isNaN(parseInt(finish))){
                finish = parseInt(finish);
            }
            //û��������ȷ��ʣ��ʱ�������Ϊ0
            else {
                return -1;
            }

            //����ʣ��ʱ�� ��ΪDate����
            if( S.isDate(finish) && S.isDate(parseDate(begin)) ){
                end = finish - parseDate(begin);
            }
            //��Ϊint����
            else if(S.isNumber(finish) && S.isNumber(begin)){
                end = finish - begin;
            }
			//beginΪDate��end Ϊint
			//else if(S.isNumber(finish) && S.isDate(begin)){
			//	end = finish;
			//}
			else if(S.isNumber(finish)){
				end = finish;
			}

            return end;
        },

        /**
         * ��ȡʣ��ʱ��,��������ʱ��,�򵥣����㣬ʵ��
         */
        getRemain: function(){
            var time = parseInt(this.timeRemain-(new Date()-this._timeStart));
            if(isNaN(time) || time<=0){
                return 0;
            }else{
                return time;
            }
        },

        /**
         * ��ʽ��ʣ��ʱ��
         * @param time ��Ҫ��ʽ���ĺ�����
         * @param ����������timeUnitsKey���и�ʽ��
         */
        format: function(time /*timeUnitsKey*/){
            var units = Array.prototype.slice.call(arguments, 1);
            var result = [];
            S.each(units,function(unit){
               if(timeUnits[unit]){
                   var t = Math.floor(time/timeUnits[unit]);
                   time = time - t*timeUnits[unit];
                   result.push(t);
               }
            });
            return result;
        },

        /**
         * �൱�ڴ�ͳ��ʱ�����Ǹ��ص�,ʹ����������������Զ�����κ�����Ҫ����ʾ���
         * @param interval ���ʱ��
         * @param run ��ʱ�����еĻص�����
         * @param finish ��ʱ������Ļص�����
         */
        fetch: function(interval,run,finish){
            var self = this,
                timer = setInterval(function(){
                    var remain = self.getRemain();
                    if(remain>0){
                        run && run.call(self,remain);
                    }else{
                        run && run.call(self,0);
                        finish && finish.call(self);
                        clearInterval(timer);
                        self.timer = null;
                    }
                },interval);
            self.timer = timer;
            return timer;
        }

    };


    /**
     * Countdown widget
     * @param container ��ʱ����ʾ������
     * @param finish ����ʱ��
     * @param config ��������
     */
    function EasyCountdown(container,finish,config) {
        var cfg = S.merge(EasyCountdown.Config,config||{});

        //У��fun & end �ص�
        if(cfg.run && !S.isFunction(cfg.run)){
            delete cfg.run;
        }
        if(cfg.end && !S.isFunction(cfg.end)){
            delete cfg.end;
        }

        //У�鶨ʱ��
        if(!S.isNumber(cfg.interval)){
            cfg.interval = 200;
        }

        EasyCountdown.superclass.constructor.call(this, finish, cfg);
        this.container = container;
        this.counter(container);
    }

    /**
     * Ĭ������
     */
    EasyCountdown.Config = {
        "prefix": "ks-",
        "interval": 1000,
        "minDigit": 1,
        "timeRunCls": 'countdown-run',
        "timeEndCls": 'countdown-end',
        "timeUnitCls" : {"d": "d", "h": "h", "m": "m", "s": "s", "i": "i"}
    };

    //�̳�Count down Core
    S.extend(EasyCountdown, Core, {
    	formatTime : function(t){
    		var self = this,
                cfg = self.config,
                v = new String(t);
    		while(v.length<cfg.minDigit){
    			v='0'+v;
    		}
    		return v;
    	},
    	__getClz : function(p,c){
    		return ((c.substring(0,1)=='.') ? '' : '.'+p)+c;
    	},
        counter: function(container){
            var self = this,
                cfg = self.config,
                div = [],
                keys = [],
                //��ʱ�������еĻص�
                run = function(time){
                    var args = [time].concat(keys), times = self.format.apply(self,args);
                    S.each(div,function(item,index){
                        item.text(self.formatTime(times[index]));
                    });
                    cfg.run && cfg.run.call(self,args,times);
                },
                //��ʱ�������ص�
                end = function(){
                    runDiv.hide();
                    endDiv.show();
                    cfg.end && cfg.end.call(self);
                },
                //classǰ׺
                prefix = cfg.prefix,
                //ʱ�䵥λ��Ӧ��class
                timeUnitCls = cfg.timeUnitCls,
                //����
                container = S.all(container),
                //��ʱ��������ʾ��div
                runDiv = container.all(self.__getClz(prefix,cfg.timeRunCls)),
                //��ʱ��������ʾ��div
                endDiv = container.all(self.__getClz(prefix,cfg.timeEndCls));
            //��ȡ�û�ͨ��el.class����Ҫ��ʽ����ʱ���ʽ
            S.each(timeUnitsKey,function(unit){
                var el =  container.all(self.__getClz(prefix,timeUnitCls[unit]));
                if(timeUnitCls[unit] && el.length>0){
                    div.push(el);
                    keys.push(unit);
                }
            });

            //��ʼ��ʱ����
            runDiv.show();
            endDiv.hide();
            self.fetch(cfg.interval,run,end);
        },
        destory : function(){
        		if(this.timer) clearInterval(this.timer);
        		//delete this;
        }
    });



    /**
     * ȡ��������ǰʱ��,Ϊ��У׼
     * @param url
     * @param callback
     */
    function getServerTime(url,callback){
        var times = 0;
        function chktime(request,date){
            if(request<1000){
                callback(date);
            }else{
                if(times<3){
                    act();
                }else{
                    callback(new Date(date.setMilliseconds(date.getMilliseconds()+request/2)));
                }
            }
        }
        function act(){
            var flag = new Date();
            times++;
            S.io({
                url:url,
                type:'HEAD',
                success:function(d,s,xhr){
                    chktime(new Date()-flag,new Date(xhr.getResponseHeader('date')));
                },
                error:function(){
                    chktime();
                },
                cache:false
            });
        }
        act();
    }


    /**
     * ����Switchable��autoRender
     * @param hook
     * @param container
     * @param url
     */
    function autoRender(hook, container, url){
        hook = '.' + (hook || 'J_TWidget');
        var f = function(timeBegin){
            S.query(hook, container).each(function(elem) {
                var type = DOM.attr(elem,"data-widget-type"),
                    config = DOM.attr(elem,"data-widget-config");
                if(type!=="Countdown"){
                    return;
                }
                if(S.isNull(config)){
                    config = {};
                }else{
                    config = JSON.parse(config.replace(/'/g, '"'));
                }
                if(timeBegin && S.isDate(timeBegin)){
                    config.timeBegin = timeBegin;
                }

                new EasyCountdown(elem,config.endTime,config);
            });
        };
        if(url){
            getServerTime(url,f);
        }else{
            f();
        }
    }



    EasyCountdown.autoRender = autoRender;
    EasyCountdown.Core = Core;
    EasyCountdown.getServerTime = getServerTime;
    return EasyCountdown;

});