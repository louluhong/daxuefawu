/**
 * @author {郑芳}({WB112921})
 * @version 0.0.1
 */
define(function(require) {

  function Mod() {
    this.init.apply(this, arguments);
  }

  Mod.prototype = {
    /**
     * 入口
     * @param dom 模块根节点
     * @param conf 数据描述，为空说明已渲染
     */
    init: function(container, conf) {
      var self = this;
      self.$container = $(container);
      // self.error可用于记录模块的异常 并且在jstracker平台查看 self.error('api错误')
      // 存在数据描述，异步渲染
      if (conf) {
        self.loadData(conf);
      } else {
        // 为空 绑定事件
        self.bindEvent();
      }
      
      $('.xiami-percentage').hide();
      $('.xiami-song-info').hide();
      /* 音频播放对象 */
      var _music = {
        _isautoplayed: false,
        obj: document.getElementById('Video'),
        playm: function() {
          $('.u-globalAudio').hide();
          $('.icon-spin1').show();
          this.obj.play();
        },
        pausem: function() {
          
          $('.u-globalAudio').show();
          $('.icon-spin1').hide();
          this.obj.pause();
        },
        init: function() {
          var _this = this;
          $('.u-globalAudio').on('click', function() {
            if (_this.obj.paused) {
              _this.playm();
            } else {
              _this.pausem();
            }
          });
        }
      };
      /* 每一屏初始化动画控制 */
      function anim(index) {
          // 先移除所有动画样式，再给每一屏加进去，有几屏动画就有几个case，注意动画的class要先移除
        (function() {
          $('.removeable').removeClass('fadeIn delay5 delay8 delay7 animated delay2 delay3 delay4 delay6 delay10 delay12 delay25 delay40 box boxCover handshake shakeFoot coinTwinkle fingRotat backpageRotat colorTwinkle topHand bottomHand rotatGun topCoin circleC tjbCase coinRainDown rotatPP moneyDown1 moneyDown2 moneyDown3 rotatHands bullet coinRainDown2 rotatArm rotatPole rotatCrown blackbg fadeInUp coinRightIn coinLeftIn coinSlide coinMenSlide shopCar spin coinMenY foot1 foot2 basket scaleChange');
          $('.box4-num').html('');
        })();
          // console.log(index);
        switch (index) {
          case 0:
            $('.box0_5-anim').addClass('animated');
            $('.box0_1-anim').addClass('animated');
            break;
          case 1:
            $('.box1-0-anim').addClass('animated');
            $('.box1-1-anim').addClass('animated');
            $('.box1-2-anim').addClass('animated');
            $('.box1-3-anim').addClass('animated');
            $('.box1-4-anim').addClass('animated topCoin delay4');
            $('.box1-6-anim').addClass('animated delay4');
            $('.box1-7-anim').addClass('animated topCoin delay10');
            $('.box1-8-anim').addClass('animated topCoin delay10');
            break;
          case 2:
            $('.box2-0-anim').addClass('animated');
            $('.box2-1-anim').addClass('animated scale_img delay4');
            $('.box2-2-anim').addClass('animated');
            $('.box2-3-anim').addClass('animated');
            $('.box2-4-anim').addClass('animated topCoin delay4');
            $('.box2-6-anim').addClass('animated');
            $('.box2-7-anim').addClass('animated topCoin delay6');
            $('.box2-8-anim').addClass('animated topCoin delay6');
            $('.box2-9-anim').addClass('animated delay7');
            $('.box2-10-anim').addClass('animated');
            break;
          case 3:
            $('.box3-0-anim').addClass('animated'); 
            $('.box3-1-anim').addClass('animated box3Cz delay5');
            $('.box3-2-anim').addClass('animated');
            $('.box3-3-anim').addClass('animated');
            $('.box3-4-anim').addClass('animated topCoin delay6');
            $('.box3-5-anim').addClass('animated');
            $('.box3-6-anim').addClass('animated');
            $('.box3-7-anim').addClass('animated topCoin delay10');
            $('.box3-8-anim').addClass('animated topCoin delay10');
            $('.box3-9-anim').addClass('animated');
            break;
          case 4:
            $('.box4-1-anim').addClass('animated');
            $('.box4-2-anim').addClass('animated box4_top_anim delay5');
            $('.box4-3-anim').addClass('animated box4_top_anim delay8');
            $('.box4-4-anim').addClass('animated box4_top_anim delay2');
            $('.box4-5-anim').addClass('animated box4_top_anim delay5');
            $('.box4-6-anim').addClass('animated box4_top_anim delay7');
            $('.box4-7-anim').addClass('animated topCoin delay4');
            $('.box4-8-anim').addClass('animated fadeIn delay6');
            $('.box4-9-anim').addClass('animated');
            $('.box4-10-anim').addClass('animated');
            $('.box4-11-anim').addClass('animated');
            break;
          case 5:
            $('.box5-0-anim').addClass('animated ');
            $('.box5-1-anim').addClass('animated ');
            $('.box5-2-anim').addClass('animated ');
            $('.box5-3-anim').addClass('animated ');
            $('.box5-4-anim').addClass('animated');
            $('.box5-5-anim').addClass('animated');
            break;
          case 6:
            $('.box6-0-anim').addClass('animated ');
            $('.box6-1-anim').addClass('animated topCoin delay4');
            $('.box6-2-anim').addClass('animated topCoin delay4');
            $('.box6-3-anim').addClass('animated');
            $('.box6-4-anim').addClass('animated');
            $('.item_img').addClass('animated');
            break;
          case 7:
            $('.box7-0-anim').addClass('animated ');
            $('.box7-1-anim').addClass('animated topCoin delay4');
            $('.box7-2-anim').addClass('animated topCoin delay6');
            $('.box7-3-anim').addClass('animated');
            $('.box7-4-anim').addClass('animated topCoin delay8');
            $('.box7-5-anim').addClass('animated topCoin delay7');
            break;
        }
      }
        /* 图片自定义懒加载,当执行new时加载对应模块的图片 */
      var lazyload = function(obj) {
        this.con = obj.container || $('body');
        this.nodename = obj.node || '.lazyload';
        this.init = function() {
          var _self = this;
          // 懒加载背景图
          // 懒加载img图
          this.con.find(_self.nodename).each(function() {
            var src = $(this).attr('data-src');
            var bg = $(this).attr('data-bg');
            config.log(bg);
            bg ? $(this).css('background-image', 'url(' + bg + ')') : '';
            src ? $(this).attr('src', src) : '';
          });
          delete this;
        };
        this.init();
      };
      
      /* 配置对象 */
      var config = {
        el: '.main-box', // 每一屏节点的容器名
        isdebug: false, // 开启debug模式
        speed: 0.5, // 滑屏动画的时间
        triggerdis: 50, // 滑屏多少像素后有效，小于这个值将回退到初始状态
        eventlist: ['touchstart', 'touchmove', 'touchend'],
        wh: $(window).height(),
        log: function(a) {
          if (config.isdebug) {
            console.log(a);
            $('.show').html(a);
          }
        },
        init: function() {
          var _this = this;
          // 初始化高度
          $(_this.el).height($(window).height());
          $(_this.el).find('.box-wrapper').height($(window).height());
          // 初始化第一屏动画
        
          anim(0);
          new lazyload({// eslint-disable-line
            container: $(_this.el).eq(1)
          });
          // 播放音频
          // $('body')[0].addEventListener("touchstart", function () {
          //   !_music._isautoplayed ? (function () {
          //     _music.init();
          //     _music._isautoplayed = true;
          //     _music.playm();
          //   })() : "";
          // });
          // if ($('#Video').attr('src') !== '') {
          //   _music.init();
          //   _music._isautoplayed = true;
          //   _music.playm();
          // };
          
          
        }
      };
      config.init(); // 全局初始化
      // 移动相关对象
      var _move = {
        dis: 0, // 触摸的方向，大于0为向上
        dir: 0, // 手指划过的距离
        touchtime: 0, // 触摸的次数，避免多指触摸
        index: 0, // 当前滚屏的索引值
        per: 0 // 滚动时候改变高度的百分比
      };
      // 绑定触摸事件
      var _touch = {
        touch: function(el, index) {
          var y1 = 0,
            y2 = 0;
          $(el)[0].addEventListener(config.eventlist[0], function(e) {
            // touchstart
            if (e.targetTouches[0].target.className.indexOf('url-div') > -1) {
              self.tk_open();
              return false;
            }
            _move.index = index; // 按下的时候记录索引值，阻止默认事件
            e.preventDefault();
            y1 = e.targetTouches[0].pageY;
            _move.dis = 0;
            _move.dir = 0;
            _move.touchtime += 1;
            // 触摸开始时懒加载,提前两屏

          }); 
          $(el)[0].addEventListener(config.eventlist[2], function(e) {
            // 触摸结束的时候
            if (e.changedTouches[0].target.className.indexOf('url-div') > -1) {
              console.log(e.changedTouches[0]);
              self.tk_open();
              return false;
            }
            y2 = e.changedTouches[0].pageY;
            _move.dis = y2 - y1;
            $(el).next(config.el) ? new lazyload({// eslint-disable-line
              container: $(el).next(config.el).next(config.el)
            }) : '';
            // 判断几个点触摸，大于2个的时候不执行后续操作
            if (_move.touchtime >= 2) {
              _move.touchtime = 0;
              return false;
            }
            // e.preventDefault();
            _move.touchtime = 0;
            if (_move.dis < 0) {
              // 向上滑，滚至下一张
              if ($(el).next(config.el).length > 0) {
                $(el).removeClass('fadeInDown animated').addClass('fadeOutUp animated');
                setTimeout(function() {
                  anim(index + 1);
                }, 1000);
                // anim(index+1);
              }
            } else if (_move.dis > 0) {
              // 向下滑
              if ($(el).prev(config.el).length > 0) {
                $(el).prev(config.el).removeClass('fadeOutUp').addClass('fadeInDown animated');
                // anim(index-1);
                setTimeout(function() {
                  anim(index - 1);
                }, 1000);
              }
            }
          });
          $(el)[0].addEventListener(config.eventlist[1], function(e) {
            // 正在触摸的期间，触摸多少距离，容器的高度就减小多少距离，高度按百分比来计算
            e.preventDefault();
            if (e.targetTouches[0].target.className.indexOf('url-div') > -1) {
              self.tk_open();
              return false;
            }
            
            // config.log(_move.touchtime);
            if (_move.touchtime >= 2) {
              return false;
            }
          });
        },
        init: function() {
          // 通过循环给每一屏绑定触摸事件,注意节点的角标序号
          for (var i = 0; i < $(config.el).length; i++) {
            this.touch('.main-box-' + i, i);
          }
          $('.to_link').on('tap', function() {
            var url = $(this).attr('href');
            location.href = url;
          });
          $('.movie_icon').on('tap', function() {
            var url = $(this).attr('href');
            location.href = url;
          });
        }
      };
      _touch.init();
    },
    tk_open: function() {
      var self = this;
      self.$container.on('tap click', '.by_tklink', function(e) {
        var i = $(this).attr('data-index');
        $('.by_tk').css('display', 'none');
        $('.by_tk').eq(i).css({'display': 'block', 'z-index': '33'});
        $('.tk_colse').css('opacity', '1');
        $(this).parent().find('.by_mask').css({'opacity': '1', 'z-index': '9'});
      });
      self.$container.on('tap click', '.tk_colse', function(e) {
        $('.by_tk').css({'display': 'none', 'z-index': '1'});
        $('.tk_colse').css('opacity', '0');
        $(this).parent().parent().find('.by_mask').css({'opacity': '0', 'z-index': '1'});
      });
    },
    // 加载数据
    loadData: function(conf) {
      var self = this;
//            //XCtrl逻辑，参考文档：http://gitlab.alibaba-inc.com/tbc/market/blob/master/xctrl.md
//            XCtrl.dynamic(conf, "items", function (data) {
//                //数据处理，模板渲染
//                S.log(data);
//                //模板完绑定事件
//                self.bindEvent();
//            })
    },
    // 事件绑定
    bindEvent: function() {

    }
  };

  return Mod;

});
