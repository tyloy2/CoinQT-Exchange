import { defineComponent, getCurrentInstance, ref, onMounted, nextTick, openBlock, createElementBlock, withModifiers, normalizeStyle, unref, createElementVNode, createCommentVNode, normalizeClass, createVNode, withCtx } from "vue";
import { _ as _export_sfc, a as tmText, g as formatAppLog, t as tmApp } from "../../tm-text.js";
import "pinia";
var _style_0 = { "rect": { "": { "borderWidth": 1, "borderStyle": "solid", "borderColor": "#FFFFFF" } }, "ani": { "": { "transitionProperty": "transform", "transitionTimingFunction": "ease" } }, "@TRANSITION": { "ani": { "property": "transform", "timingFunction": "ease" } } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-cropimg",
  props: {
    url: {
      type: String,
      default: ""
    },
    width: {
      type: Number,
      default: 150
    },
    height: {
      type: Number,
      default: 150
    }
  },
  emits: ["confirm", "cance"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const url = ref(props.url);
    const {
      safeArea,
      windowWidth,
      windowHeight,
      statusBarHeight
    } = uni.getSystemInfoSync();
    const view_width = (safeArea == null ? void 0 : safeArea.width) || windowWidth;
    let view_height = (_c = safeArea == null ? void 0 : safeArea.height) != null ? _c : windowHeight - 44;
    const points = ref({
      px: 0,
      py: 0,
      px2: 0,
      py2: 0,
      xy: 0
    });
    const rectPos = ref({
      w: props.width,
      h: props.height,
      x: 0,
      y: 0
    });
    const imgPos = ref({
      scale: 1,
      oldscale: 1,
      center: [0, 0],
      sourceImgWidth: 0,
      sourceImgHeight: 0,
      w: 0,
      h: 0,
      x: 0,
      y: 0
    });
    let moveable = ref(false);
    let moveType = 0;
    let scaleing = ref(false);
    onMounted(() => {
      nextTick(function() {
        setTimeout(function() {
        }, 50);
      });
    });
    setRectPos();
    function touchStart(res) {
      if (!url.value)
        return;
      moveable.value = true;
      let event = res.touches[0];
      let event2 = res.touches[1];
      if (res.type == "mousedown") {
        event = res;
      }
      moveType = getMoveTypeNumber(event.pageX, event.pageY);
      if (moveType == 0) {
        points.value.px = event.pageX - imgPos.value.x;
        points.value.py = event.pageY - imgPos.value.y;
      } else {
        points.value.px = event.pageX - rectPos.value.x;
        points.value.py = event.pageY - rectPos.value.y;
      }
      if (event2) {
        points.value.px2 = event2.pageX;
        points.value.py2 = event2.pageY;
      }
      imgPos.value.oldscale = imgPos.value.scale;
    }
    function touchMove(res) {
      let event = res.touches[0];
      res.touches[1];
      if (res.type == "mousedown") {
        event = res;
      }
      if (!moveable.value)
        return;
      if (moveType == 0) {
        imgPos.value.x = event.pageX - points.value.px;
        imgPos.value.y = event.pageY - points.value.py;
      } else {
        rectPos.value.x = event.pageX - points.value.px;
        rectPos.value.y = event.pageY - points.value.py;
      }
      return;
    }
    function touchEnd(res) {
      moveable.value = false;
      scaleing.value = false;
      if (rectPos.value.x <= 12) {
        rectPos.value.x = 12;
      }
      if (rectPos.value.x >= view_width - rectPos.value.w - 12) {
        rectPos.value.x = view_width - rectPos.value.w - 12;
      }
      if (rectPos.value.y <= 12) {
        rectPos.value.y = 12;
      }
      if (rectPos.value.y >= view_height - rectPos.value.h - 90) {
        rectPos.value.y = view_height - rectPos.value.h - 90;
      }
      if (imgPos.value.x >= rectPos.value.x) {
        imgPos.value.x = rectPos.value.x;
      }
      if (imgPos.value.x + imgPos.value.w <= rectPos.value.x + rectPos.value.w) {
        imgPos.value.x = rectPos.value.x - (imgPos.value.w - rectPos.value.w);
      }
      if (imgPos.value.y >= rectPos.value.y) {
        imgPos.value.y = rectPos.value.y;
      }
      if (imgPos.value.y + imgPos.value.h <= rectPos.value.y + rectPos.value.h) {
        imgPos.value.y = rectPos.value.y - (imgPos.value.h - rectPos.value.h);
      }
    }
    function chooseImg() {
      formatAppLog("log", "at tmui/components/tm-cropimg/tm-cropimg.vue:283", 5);
      uni.chooseImage({
        count: 1,
        success(res) {
          let files = res.tempFilePaths;
          if (files.length == 1) {
            url.value = files[0];
            imgPos.value.scale = 1;
            imgPos.value.oldscale = 1;
          }
        }
      });
    }
    function imgLoad(res) {
      const {
        width,
        height
      } = res.detail;
      imgPos.value.sourceImgWidth = width;
      imgPos.value.sourceImgHeight = height;
      setImgPosScaleXy();
    }
    function imgError(res) {
      formatAppLog("log", "at tmui/components/tm-cropimg/tm-cropimg.vue:322", res);
    }
    function getMoveTypeNumber(x, y) {
      if (x >= rectPos.value.x - 15 && x <= rectPos.value.x + 15 && y >= rectPos.value.y && y <= rectPos.value.y + rectPos.value.h) {
        return 1;
      }
      if (x >= rectPos.value.x && x <= rectPos.value.w && y >= rectPos.value.y - 15 && y <= rectPos.value.y + 15) {
        return 1;
      }
      if (x >= rectPos.value.x + rectPos.value.w - 15 && x <= rectPos.value.x + rectPos.value.w + 15 && y >= rectPos.value.y && y <= rectPos.value.y + rectPos.value.h) {
        return 1;
      }
      if (x >= rectPos.value.x && x <= rectPos.value.x + rectPos.value.w && y >= rectPos.value.y + rectPos.value.h - 15 && y <= rectPos.value.y + rectPos.value.h + 15) {
        return 1;
      }
      return 0;
    }
    function setRectPos() {
      let x = (view_width - rectPos.value.w) / 2;
      let y = (view_height - rectPos.value.h) / 2;
      rectPos.value.x = x;
      rectPos.value.y = y;
    }
    function setImgPosScaleXy() {
      imgPos.value.x = rectPos.value.x;
      let now_w = rectPos.value.w;
      let now_h = now_w / (imgPos.value.sourceImgWidth / imgPos.value.sourceImgHeight);
      imgPos.value.h = now_h;
      imgPos.value.w = now_w;
      if (imgPos.value.h < rectPos.value.h) {
        imgPos.value.h = rectPos.value.h;
        imgPos.value.w = imgPos.value.h * (now_w / now_h);
      }
      imgPos.value.y = -(imgPos.value.h - rectPos.value.h) / 2 + rectPos.value.y;
      imgPos.value.center = [imgPos.value.w / 2, imgPos.value.h / 2];
    }
    function pushImgToCanvas() {
      Math.abs(imgPos.value.x - rectPos.value.x);
      Math.abs(imgPos.value.y - rectPos.value.y);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        onLongpress: _cache[1] || (_cache[1] = () => {
        }),
        onTouchstart: touchStart,
        onTouchmove: withModifiers(touchMove, ["stop", "prevent"]),
        onTouchend: touchEnd,
        onTouchcancel: touchEnd,
        onMousedown: touchStart,
        onMousemove: withModifiers(touchMove, ["stop", "prevent"]),
        onMouseup: touchEnd,
        onMouseleave: touchEnd,
        class: "relative overflow",
        style: normalizeStyle([{ width: `${unref(view_width)}px`, height: `${unref(view_height)}px`, background: "#000000" }]),
        renderWhole: true
      }, [
        !url.value ? (openBlock(), createElementBlock("view", {
          key: 0,
          class: "flex flex-center py-24"
        }, [
          createElementVNode("u-text", { style: { "font-size": "24rpx", "color": "white" } }, "\u8BF7\u9009\u62E9\u9009\u62E9\u56FE\u7247\u624D\u53EF\u64CD\u4F5C")
        ])) : createCommentVNode("v-if", true),
        createCommentVNode(" transform: `translate(${imgPos.x}px,${imgPos.y}px) scale(${imgPos.scale},${imgPos.scale})` "),
        createCommentVNode(' <image v-if="url" :src="url"></image> '),
        url.value ? (openBlock(), createElementBlock("u-image", {
          key: 1,
          onError: imgError,
          class: normalizeClass(["absolute l-0 t-0", [unref(moveable) ? "opacity-10" : "ani opacity-5"]]),
          userInteractionEnabled: false,
          onLoad: imgLoad,
          src: url.value,
          style: normalizeStyle([
            {
              width: `${imgPos.value.w || 1}px`,
              height: `${imgPos.value.h || 1}px`,
              transform: url.value ? `translate(${imgPos.value.x}px,${imgPos.value.y}px) scale(${imgPos.value.scale},${imgPos.value.scale})` : `translate(-1000px,-1000px)`,
              "transform-origin": `${imgPos.value.center[0]}px ${imgPos.value.center[1]}px`
            }
          ])
        }, null, 46, ["src"])) : createCommentVNode("v-if", true),
        createCommentVNode(" 		   "),
        createElementVNode("view", {
          class: normalizeClass([[unref(moveable) ? "" : "ani"], "absolute l-0 t-0 rect"]),
          userInteractionEnabled: false,
          style: normalizeStyle([
            { width: rectPos.value.w + "px", height: rectPos.value.h + "px", transform: `translate(${rectPos.value.x}px,${rectPos.value.y}px)` }
          ])
        }, null, 6),
        createElementVNode("view", {
          class: "absolute l-0 b-0",
          style: normalizeStyle({ width: `${unref(view_width)}px`, height: `${80}px` })
        }, [
          createCommentVNode(` 	<view class="flex-center mb-24">\r
				<tm-slider @change="scaleChange" :width="600" :max='3' :min='1'></tm-slider>\r
			</view> `),
          createElementVNode("view", { class: "flex-row flex-between" }, [
            createCommentVNode(" \u7FFB\u8F6C "),
            createCommentVNode(' <view class="flex-1 flex flex-center">\r\n					<tm-text :userInteractionEnabled="false" color="white" label="\u65CB\u8F6C"></tm-text>\r\n				</view> '),
            createCommentVNode(" \u53D6\u6D88 "),
            createElementVNode("view", {
              onClick: _cache[0] || (_cache[0] = ($event) => emits("cance")),
              class: "flex-1 flex flex-center"
            }, [
              createVNode(tmText, {
                userInteractionEnabled: false,
                color: "white",
                label: "\u53D6\u6D88"
              })
            ]),
            createCommentVNode(" \u9009\u62E9\u56FE\u7247 "),
            createElementVNode("view", {
              onClick: chooseImg,
              class: "flex-1 flex flex-center"
            }, [
              createVNode(tmText, {
                userInteractionEnabled: false,
                color: "white",
                label: "\u9009\u62E9\u56FE\u7247"
              })
            ]),
            createCommentVNode(" \u786E\u8BA4 "),
            createElementVNode("view", {
              onClick: pushImgToCanvas,
              class: "flex-1 flex flex-center"
            }, [
              createVNode(tmText, {
                userInteractionEnabled: false,
                color: "white",
                label: "\u786E\u8BA4"
              })
            ])
          ])
        ], 4)
      ], 44, ["onTouchmove", "onMousemove"]);
    };
  }
});
var tmCropimg = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-cropimg/tm-cropimg.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cropimg",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("scroll-view", {
        scrollY: true,
        showScrollbar: true,
        enableBackToTop: true,
        bubble: "true",
        style: { flexDirection: "column" }
      }, [
        createVNode(tmApp, null, {
          default: withCtx(() => [
            createVNode(tmCropimg)
          ]),
          _: 1
        })
      ]);
    };
  }
});
var cropimg = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/other/cropimg.nvue"]]);
export { cropimg as default };
