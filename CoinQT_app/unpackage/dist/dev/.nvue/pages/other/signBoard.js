import { defineComponent, getCurrentInstance, ref, onMounted, nextTick, openBlock, createElementBlock, normalizeStyle, createCommentVNode, createBlock, withCtx, createVNode, createElementVNode, Fragment, renderList, unref } from "vue";
import { _ as _export_sfc, r as requireNativePlugin, g as formatAppLog, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { T as TmButton } from "../../tm-button.js";
import { e as enable, W as WeexBridge } from "../../index.js";
import { t as tmDivider } from "../../tm-divider.js";
import { t as tmRadioGroup, a as tmRadio } from "../../tm-radio.js";
import { t as tmSlider } from "../../tm-slider.js";
import "pinia";
import "../../tm-icon.js";
import "../../tm-translate.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-sign-board",
  props: {
    width: {
      type: Number,
      default: 750
    },
    height: {
      type: Number,
      default: 500
    },
    lineWidth: {
      type: Number,
      default: 5
    },
    lineColor: {
      type: String,
      default: "red"
    }
  },
  setup(__props, { expose }) {
    var _a, _b;
    const props = __props;
    const dom = requireNativePlugin("dom");
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const canvasId = ref("canvasId");
    canvasId.value = "tm" + uni.$tm.u.getUid(5);
    let ctx;
    let ctxLeft = 0;
    let ctxTop = 0;
    let drawhd;
    const show = ref(false);
    let isAndroid = false;
    isAndroid = uni.getSystemInfoSync().osName == "android";
    onMounted(() => {
      if (isAndroid) {
        setTimeout(() => {
          show.value = true;
          setTimeout(function() {
            drawNvue_init();
          }, 100);
        }, 200);
      } else {
        show.value = true;
        setTimeout(() => drawNvue_init(), 250);
      }
    });
    function drawNvue_init() {
      var ganvas = proxy == null ? void 0 : proxy.$refs[canvasId.value];
      var canvasObj = enable(ganvas, {
        bridge: WeexBridge
      });
      ctx = canvasObj.getContext("2d");
      nextTick(function() {
        setTimeout(function() {
          dom == null ? void 0 : dom.getComponentRect(proxy == null ? void 0 : proxy.$refs.tmspin, function(res) {
            if (res == null ? void 0 : res.size) {
              ctxLeft = Math.floor(res.size.left);
              ctxTop = Math.floor(res.size.top);
              drawhd = new draw(ctx, uni.upx2px(props.width), uni.upx2px(props.height));
            }
          });
        }, 200);
      });
    }
    function touchstart(event) {
      if (!drawhd)
        return;
      if (event.type.indexOf("mouse") == -1 && event.changedTouches.length == 1) {
        var touch = event.changedTouches[0];
        if (isAndroid) {
          drawhd.down(touch.pageX, touch.pageY);
        } else {
          drawhd.down(touch.pageX - ctxLeft, touch.pageY - ctxTop);
        }
      } else {
        drawhd.down(event.pageX - event.currentTarget.offsetLeft - ctxLeft, event.pageY - event.currentTarget.offsetTop - ctxTop);
      }
    }
    function touchsmove(event) {
      if (!drawhd)
        return;
      if (event == null ? void 0 : event.preventDefault)
        event == null ? void 0 : event.preventDefault();
      if (event == null ? void 0 : event.stopPropagation)
        event == null ? void 0 : event.stopPropagation();
      if (event.type.indexOf("mouse") == -1 && event.changedTouches.length == 1) {
        var touch = event.changedTouches[0];
        if (isAndroid) {
          drawhd.move(touch.pageX, touch.pageY);
        } else {
          drawhd.move(touch.pageX - ctxLeft, touch.pageY - ctxTop);
        }
      } else {
        drawhd.move(event.pageX - event.currentTarget.offsetLeft - ctxLeft, event.pageY - event.currentTarget.offsetTop - ctxTop);
      }
    }
    function touchsend(event) {
      if (!drawhd)
        return;
      if (event.type.indexOf("mouse") == -1 && event.changedTouches.length == 1) {
        var touch = event.changedTouches[0];
        if (isAndroid) {
          drawhd.up(touch.pageX, touch.pageY);
        } else {
          drawhd.up(touch.pageX - ctxLeft, touch.pageY - ctxTop);
        }
      } else {
        drawhd.up(event.pageX - event.currentTarget.offsetLeft - ctxLeft, event.pageY - event.currentTarget.offsetTop - ctxTop);
      }
    }
    function clear() {
      if (!ctx) {
        uni.showToast({ title: "\u521D\u59CB\u5316\u5931\u8D25", icon: "none" });
        return;
      }
      ctx.clearRect(0, 0, uni.upx2px(props.width), uni.upx2px(props.height));
      ctx.draw(false);
    }
    function save() {
      return new Promise((su, fa) => {
        if (!ctx) {
          uni.showToast({ title: "\u521D\u59CB\u5316\u5931\u8D25", icon: "none" });
          fa("\u521D\u59CB\u5316\u5931\u8D25");
          return;
        }
        uni.showLoading({ title: "..." });
        ctx.toTempFilePath(0, 0, props.width, props.height, uni.upx2px(props.width), uni.upx2px(props.height), "png", 1, function(res) {
          uni.hideLoading();
          formatAppLog("log", "at tmui/components/tm-sign-board/tm-sign-board.vue:284", res.errMsg);
          if (res.errMsg == "canvasToTempFilePath:ok") {
            su(res.tempFilePath);
          } else {
            fa(res.errMsg);
          }
        });
      });
    }
    expose({ save, clear });
    class draw {
      constructor(ctx2, w, h, lineWidth = 2, lineColor = "black") {
        this._x = 0;
        this._y = 0;
        this._lineWidth = 2;
        this._lineColor = "black";
        this.width = 0;
        this.height = 0;
        this._isDown = false;
        this._points = [];
        this._lineColor = lineColor;
        this._lineWidth = lineWidth;
        this.width = w;
        this.height = h;
        this.cx = ctx2;
      }
      down(x = 0, y = 0) {
        this._isDown = true;
        this._x = x;
        this._y = y;
      }
      move(x = 0, y = 0) {
        if (!this._isDown)
          return;
        ctx.setStrokeStyle(props.lineColor);
        ctx.setLineWidth(props.lineWidth);
        ctx.setLineCap("round");
        ctx.beginPath();
        ctx.moveTo(this._x, this._y);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();
        ctx.draw(true);
        this._x = x;
        this._y = y;
      }
      up(x = 0, y = 0) {
        this._isDown = false;
        this._x = x;
        this._y = y;
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        onMouseleave: touchsend,
        onTouchcancel: touchsend,
        ref: "tmspin",
        style: normalizeStyle({ width: `${props.width}rpx`, height: `${props.height}rpx` }),
        renderWhole: true
      }, [
        show.value ? (openBlock(), createElementBlock("gcanvas", {
          key: 0,
          onTouchstart: touchstart,
          onTouchmove: touchsmove,
          onTouchend: touchsend,
          id: canvasId.value,
          ref: canvasId.value,
          class: "canvas",
          style: normalizeStyle({ width: `${props.width}rpx`, height: `${props.height}rpx` })
        }, null, 44, ["id"])) : createCommentVNode("v-if", true)
      ], 36);
    };
  }
});
var tmSignBoard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-sign-board/tm-sign-board.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "signBoard",
  setup(__props) {
    const { proxy } = getCurrentInstance();
    const board = ref(null);
    const colors = ["red", "blue", "black", "green"];
    const colorNow = ref("red");
    const lineWidth = ref(5);
    const saveImg = async () => {
      var _a;
      let src = await ((_a = board.value) == null ? void 0 : _a.save());
      uni.showToast({ title: "\u6210\u529F\uFF0C\u8BF7\u67E5\u770B\u65E5\u5FD7", icon: "none" });
      uni.previewImage({
        current: src,
        urls: [src]
      });
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(tmApp, null, {
        default: withCtx(() => [
          createVNode(tmSheet, { width: 662 }, {
            default: withCtx(() => [
              createVNode(tmText, { label: "\u7B7E\u540D\u677F\u5168\u7AEF\u517C\u5BB9\uFF0C\u7528\u4E8E\u7B7E\u540D\u4F7F\u7528\u3002\u8BF7\u5728\u4E0B\u65B9\u4E66\u5199" }),
              createVNode(tmDivider),
              createVNode(tmSignBoard, {
                "line-color": colorNow.value,
                "line-width": lineWidth.value,
                ref_key: "board",
                ref: board,
                width: 638,
                height: 400
              }, null, 8, ["line-color", "line-width"]),
              createVNode(tmDivider),
              createElementVNode("view", { class: "py-24" }, [
                createVNode(tmText, { label: "\u9009\u62E9\u4E66\u5199\u989C\u8272" })
              ]),
              createVNode(tmRadioGroup, {
                modelValue: colorNow.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => colorNow.value = $event)
              }, {
                default: withCtx(() => [
                  (openBlock(), createElementBlock(Fragment, null, renderList(colors, (item, index) => {
                    return createVNode(tmRadio, {
                      color: item,
                      value: item,
                      label: item,
                      key: "index"
                    }, null, 8, ["color", "value", "label"]);
                  }), 64))
                ]),
                _: 1
              }, 8, ["modelValue"]),
              createElementVNode("view", { class: "py-24" }, [
                createVNode(tmText, { label: "\u62D6\u52A8\u6539\u53D8\u7C97\u7EC6" })
              ]),
              createVNode(tmSlider, {
                max: 20,
                modelValue: lineWidth.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => lineWidth.value = $event),
                "default-value": lineWidth.value
              }, null, 8, ["modelValue", "default-value"]),
              createVNode(tmDivider),
              createElementVNode("view", { class: "flex flex-row flex-center" }, [
                createVNode(TmButton, {
                  onClick: _cache[2] || (_cache[2] = ($event) => unref(proxy).$refs.board.clear()),
                  label: "\u6E05\u7A7A"
                }),
                createVNode(TmButton, {
                  color: "green",
                  margin: [24, 0],
                  onClick: saveImg,
                  label: "\u4FDD\u5B58\u7B7E\u540D"
                })
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
var signBoard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/other/signBoard.nvue"]]);
export { signBoard as default };
