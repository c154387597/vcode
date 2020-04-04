/* eslint-disable */

/**
 * version: 1.0.0
 * ie >= 9
 * @type: 1: 初始化滑块（默认）
 * @success: 完成回调
 * @close: 关闭回调
 */
(function () {
  var e = void 0;

  function addEvent (dom, name, fn) {
    dom.addEventListener ? dom.addEventListener(name, fn, !1) : dom.attachEvent('on' + name, fn)
  }
  function removeEvent (dom, name, fn) {
    dom.removeEventListener ? dom.removeEventListener(name, fn, !1) : dom.detachEvent('on' + name, fn)
  }
  function hasClass (dom, name) {
    return !!dom.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'))
  }
  function addClass (dom, name) {
    hasClass(dom, name) || (dom.className += ' ' + name)
  }
  function removeClass (dom, name) {
    hasClass(dom, name) && (dom.className = dom.className.indexOf(' ' + name + '') >= 0 ? dom.className.replace(new RegExp('(\\s|^)' + name + '(\\s|$)'), ' ') : dom.className.replace(new RegExp('(\\s|^)' + name + '(\\s|$)')), '')
  }

  !function (i) {
    var vcode;

    if (typeof i === 'function') e = i()

    e.loadCss('./vcode/vcode.css'),

    vcode = function (obj) {
      var target = {
        type: 1,
        success: function () {},
        close: function () {}
      }
        , obj = e.assign(target, obj);
      this.init(obj)
    },
    vcode.prototype = {
      init: function (obj) {
        this.initConfig(),
        this.mobileCheck(),
        obj.type === 1 && this.initSlideDom(),
        this.obj = obj
      },
      initConfig: function () {
        this.num = Math.floor(1e3 * Math.random()),
        this.lang = {
          title: '安全验证',
          introduce: '滑至最右 完成验证',
          verifySuccess: '验证成功',
          verifyError: '验证失败',
          bottomTitle: '为了你的帐号安全，本次操作需要进行安全验证'
        },
        this.store = {
          version: '1.0.0'
        },
        this.check = !1
      },
      mobileCheck: function () {
        var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
          , flag = true;
        for (var i = 0; i < Agents.length; i++) {
          if (navigator.userAgent.indexOf(Agents[i]) > 0) {
            flag = false
            break
          }
        }
        flag ? this.pcSetConfig() : this.mobileSetConfig()
      },
      mobileSetConfig: function () {
        this.deviceType = 'mobile',
        this.eventClick = 'touchstart',
        this.eventMove = 'touchmove',
        this.eventEnd = 'touchend',
        this.eventEnd2 = 'touchcancel'
      },
      pcSetConfig: function () {
        this.deviceType = 'pc',
        this.eventClick = 'mousedown',
        this.eventMove = 'mousemove',
        this.eventEnd = 'mouseup'
      },
      createBody: function () {
        var t = this;
        t.bodyDiv = document.createElement('div');
        t.bodyDiv.id = 'vcode-body' + t.num,
        t.bodyDiv.className = 'vcode-body',
        document.body.appendChild(t.bodyDiv)
      },
      createMask: function () {
        var t = this;
        t.maskDiv = document.createElement('div');
        t.maskDiv.id = 'vcode-mask' + t.num,
        t.maskDiv.className = 'vcode-mask',
        document.body.appendChild(t.maskDiv)
      },
      appendDom: function (c) {
        var t = this;
        t.createBody(),
        t.createMask(),
        t.bodyDiv.appendChild(c),
        t.closeDiv = document.createElement('div'),
        t.closeDiv.id = 'vcode-close' + t.num,
        t.closeDiv.className = 'vcode-close',
        t.bodyDiv.appendChild(t.closeDiv)
        addEvent(t.closeDiv, t.eventClick, function () {
          t.removeMask()
        })
      },
      removeMask: function () {
        var t = this;
        t.maskDiv && document.body.removeChild(t.maskDiv),
        t.bodyDiv && document.body.removeChild(t.bodyDiv),
        t.maskDiv = null,
        t.bodyDiv = null,
        t.closeDiv = null,
        t.obj.close(),
        t.removeSlideEvent && (t.removeSlideEvent(),
        t.removeSlideEvent = null)
      },
      initSlideDom: function () {
        var t = this
          , slide = document.createElement('div');
        slide.className = 'vcode',
        slide.innerHTML = '<p class="title">' + this.lang.title + '</p>'+
          '<div class="vcode-slide-faceboder"><div id="vcode-slide-img-finish' + this.num + '"></div><div id="vcode-slide-img' + this.num + '" class="vcode-slide-img"></div></div>'+
          '<div class="vcode-slide-container">'+
            '<div id="vcode-slide-bottom' + this.num + '" class="vcode-slide-bottom">'+
              '<div id="vcode-slide-cover' + this.num + '" class="vcode-slide-cover"><p id="vcode-slide-cover-p' + this.num + '"></p></div>' +
              '<div id="vcode-slide-button' + this.num + '" class="vcode-slide-button"><p class="icon-right"></p></div>'+
              '<p id="vcode-slide-bottom-p' + this.num + '">' + this.lang.introduce + '</p>'+
            '</div>'+
          '</div>'+
          '<p class="vcode-slide-footer">' + this.lang.bottomTitle + '</p>',
        this.appendDom(slide)

        setTimeout(function () {
          t.initSlideEvent()
        }, 100)
      },
      initSlideEvent: function () {
        var t = this
          , vcode = document.getElementById('vcode-body' + t.num)
          , slideImg = document.getElementById('vcode-slide-img' + t.num)
          , slideImgFinish = document.getElementById('vcode-slide-img-finish' + t.num)
          , slideBtm = document.getElementById('vcode-slide-bottom' + t.num)
          , slideBtmP = document.getElementById('vcode-slide-bottom-p' + t.num)
          , slideBtn = document.getElementById('vcode-slide-button' + t.num)
          , slideCover = document.getElementById('vcode-slide-cover' + t.num)
          , slideCoverP = document.getElementById('vcode-slide-cover-p' + t.num)
          , slideBtnWidth = slideBtn.offsetWidth
          , moveX = slideBtm.offsetWidth - slideBtnWidth
          , successCallback = function () {
            addClass(slideCoverP, 'vcode-transition'),
            addClass(slideImgFinish, 'vcode-slide-img-finish')
            slideCoverP.innerHTML = t.lang.verifySuccess,
            slideCoverP.style.top = 0,
            t.obj.success(),
            t.removeSlideEvent(),
            setTimeout(function () {
              t.removeMask()
            }, 1000)
          }
          , c = function () {
            t.finish = !1,
            addClass(slideBtn, 'vcode-transition'),
            addClass(slideCover, 'vcode-transition'),
            addClass(slideBtmP, 'vcode-transition'),
            addClass(slideImg, 'vcode-transition'),
            slideBtn.style.msTransform = 'translateX(0)',
            slideBtn.style.webkitTransform = 'translateX(0)',
            slideBtn.style.MozTransform = 'translateX(0)',
            slideBtn.style.OTransform = 'translateX(0)',
            slideImg.style.height = '0',
            slideBtmP.style.transform = 'translateX(0)',
            slideCover.style.width = slideBtnWidth + 'px',
            setTimeout(function () {
              removeClass(slideBtn, 'vcode-slide-button-focus'),
              removeClass(slideBtn, 'vcode-transition'),
              removeClass(slideCover, 'vcode-transition'),
              removeClass(slideBtmP, 'vcode-transition'),
              removeClass(slideImg, 'vcode-transition')
            }, 300)
          }
          , slideBtnClick = function (n) {
            if (t.finish) return !1
            var i = t.deviceType === 'mobile' ? n.touches[0] || n.changedTouches[0] : n;
            addClass(slideBtn, 'vcode-slide-button-focus'),
            t.start = !0,
            t.currentX = i.clientX
          }
          , slideBtnMove = function (n) {
            if (t.finish || !t.start) return !1
            var i = t.deviceType === 'mobile' ? n.changedTouches[0] : n
              , o = i.clientX - t.currentX;
            o >= moveX ? (t.finish = !0,
            o = moveX, successCallback()) : 0 >= o && (o = 0);
            var c = parseFloat(o / moveX).toFixed(2);
            slideBtn.style.msTransform = 'translateX(' + o + 'px)',
            slideBtn.style.webkitTransform = 'translateX(' + o + 'px)',
            slideBtn.style.MozTransform = 'translateX(' + o + 'px)',
            slideBtn.style.OTransform = 'translateX(' + o + 'px)',
            slideImg.style.height =  (95 * c) + '%',
            slideBtmP.style.transform = 'translateX(' + 10 * c + '%)',
            slideCover.style.width = (slideBtnWidth + o) + 'px',
            n.stopPropagation()
          }
          , slideBtnEnd = function (n) {
            var i = t.deviceType === 'mobile' ? n.changedTouches[0] : n
              , o = i.clientX - t.currentX;
            t.start = !1,
            0 >= o ? (removeClass(slideBtn, 'vcode-slide-button-focus'))
            : t.finish || c()
          };
        addEvent(slideBtn, t.eventClick, slideBtnClick),
        addEvent(vcode, t.eventMove, slideBtnMove),
        addEvent(vcode, t.eventEnd, slideBtnEnd),
        t.eventEnd2 && addEvent(vcode, t.eventEnd2, slideBtnEnd),
        t.removeSlideEvent = function () {
          removeEvent(slideBtn, t.eventClick, slideBtnClick),
          removeEvent(vcode, t.eventMove, slideBtnMove),
          removeEvent(vcode, t.eventEnd, slideBtnEnd),
          t.eventEnd2 && removeEvent(vcode, t.eventEnd2, slideBtnEnd)
        }
      }
    },

    window.$vcode = vcode

  }(function () {
    var n = Object.create || function () {
      function e () {}
      return function (obj) {
        var n;
        return e.prototype = obj,
        n = new e,
        e.prototype = null,
        n
      }
    }()
    , s = function () {
      return {
        init: function () {},
        extend: function (e) {
          var t = n(this);
          return e && t.mixIn(e),
          t.init.prototype = t,
          t.$super = this,
          t
        },
        mixIn: function (e) {
          for (var t in e) {
            e.hasOwnProperty(t) && (this[t] = e[t])
          }
        }
      }
    }()
    , i = s.extend({
      assign: Object.assign || function (target, obj) {
        var i
          , j
          , copy = {};
        if (typeof obj === 'object') {
          copy = obj
          for (i in target) {
            for (j in obj) {
              !obj[i] && (copy[i] = target[i])
            }
          }
        } else copy = target
        return copy
      },
      loadCss: function (url, fn) {
        var doc = document
          , i = doc.createElement('link');
        i.rel = 'stylesheet',
        i.type = 'text/css',
        i.href = url,
        i.disabled = !1,
        doc.getElementsByTagName('head')[0].appendChild(i),
        i.readyState ? i.onreadystatechange = function () {
          (i.readyState === 'loaded' || i.readyState === 'complete') && (i.onreadystatechange = null, fn && fn())
        }
        : i.onload = function () {
          fn && fn()
        }
      }
    });
    return i
  })
})(window)
