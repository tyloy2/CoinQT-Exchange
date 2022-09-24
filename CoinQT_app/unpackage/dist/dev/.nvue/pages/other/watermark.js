import { defineComponent, getCurrentInstance, ref, computed, onMounted, nextTick, watch, openBlock, createElementBlock, renderSlot, createElementVNode, normalizeStyle, normalizeClass, unref, createVNode, withCtx } from "vue";
import { e as enable, W as WeexBridge } from "../../index.js";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmDivider } from "../../tm-divider.js";
import { t as tmRadioGroup, a as tmRadio } from "../../tm-radio.js";
import { t as tmInput } from "../../tm-input.js";
import { t as tmUpload } from "../../tm-upload.js";
import "pinia";
import "../../tm-icon.js";
import "../../tm-translate.js";
import "../../tm-button.js";
import "../../tm-image.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-watermark",
  props: {
    cross: Boolean,
    debug: Boolean,
    fullscreen: Boolean,
    width: {
      type: Number,
      default: 64
    },
    height: {
      type: Number,
      default: 64
    },
    zIndex: {
      type: Number,
      default: 999
    },
    xGap: {
      type: Number,
      default: 0
    },
    yGap: {
      type: Number,
      default: 0
    },
    yOffset: {
      type: Number,
      default: 0
    },
    xOffset: {
      type: Number,
      default: 0
    },
    rotate: {
      type: Number,
      default: 0
    },
    image: String,
    imageOpacity: { type: Number, default: 1 },
    imageHeight: Number,
    imageWidth: Number,
    content: String,
    selectable: {
      type: Boolean,
      default: true
    },
    fontSize: {
      type: Number,
      default: 14
    },
    fontFamily: String,
    fontStyle: {
      type: String,
      default: "normal"
    },
    fontVariant: {
      type: String,
      default: ""
    },
    fontWeight: {
      type: Number,
      default: 400
    },
    fontColor: {
      type: String,
      default: "rgba(128, 128, 128, .3)"
    },
    fontStretch: {
      type: String,
      default: ""
    },
    lineHeight: {
      type: Number,
      default: 14
    },
    unit: {
      type: String,
      default: "rpx"
    }
  },
  setup(__props) {
    const props = __props;
    getCurrentInstance();
    const waterCanvasRef = ref();
    const boxInfo = ref({ width: props.width, height: props.height });
    const base64UrlRef = ref();
    const imageWaterStyle = computed(() => {
      return {
        zIndex: props.zIndex,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        backgroundRepeat: "repeat",
        top: 0,
        left: 0,
        backgroundSize: props.unit == "rpx" ? `${uni.upx2px(props.xGap + props.width)} px` : `${props.xGap + props.width} px`,
        backgroundPosition: props.cross ? `${props.unit == "rpx" ? uni.upx2px(props.width / 2) : props.width / 2}px ${props.unit == "rpx" ? uni.upx2px(props.height / 2) : props.height / 2}px, 0 0` : "",
        backgroundImage: props.cross ? `url(${base64UrlRef.value}), url(${base64UrlRef.value})` : `url(${base64UrlRef.value})`
      };
    });
    onMounted(() => {
      nextTick(async function() {
        await init();
      });
    });
    watch(() => props, async () => {
      await init();
    }, { deep: true });
    async function init() {
      const canvas = enable(waterCanvasRef.value, {
        bridge: WeexBridge
      });
      const ctx = canvas.getContext("2d");
      const ratio = uni.getSystemInfoSync().pixelRatio;
      const {
        xGap,
        yGap,
        width,
        height,
        yOffset,
        xOffset,
        rotate,
        image,
        content,
        fontColor,
        fontStyle,
        fontVariant,
        fontStretch,
        fontWeight,
        fontFamily,
        fontSize,
        lineHeight,
        debug
      } = props;
      const canvasWidth = (xGap + (width > 0 ? width : 1)) * ratio;
      const canvasHeight = (yGap + (height > 0 ? height : 1)) * ratio;
      const canvasOffsetLeft = props.unit == "rpx" ? uni.upx2px(xOffset * ratio) : xOffset * ratio;
      const canvasOffsetTop = props.unit == "rpx" ? uni.upx2px(yOffset * ratio) : yOffset * ratio;
      const canvasWidthPx = props.unit == "rpx" ? uni.upx2px(canvasWidth) : canvasWidth;
      const canvasHeightPx = props.unit == "rpx" ? uni.upx2px(canvasHeight) : canvasHeight;
      boxInfo.value = { width: canvasWidth, height: canvasHeight };
      if (ctx) {
        ctx.translate(0, 0);
        const markWidth = props.unit == "rpx" ? uni.upx2px(width * ratio) : width * ratio;
        const markHeight = props.unit == "rpx" ? uni.upx2px(height * ratio) : height * ratio;
        if (debug) {
          ctx.strokeStyle = "grey";
          ctx.strokeRect(0, 0, markWidth, markHeight);
        }
        ctx.rotate(rotate * (Math.PI / 180));
        if (image) {
          const { imageWidth, imageHeight } = props;
          await uni.getImageInfo({
            src: image,
            success: function(img) {
              ctx.globalAlpha = props.imageOpacity;
              ctx.drawImage(image, canvasOffsetLeft, canvasOffsetTop, (props.imageWidth || (imageHeight ? img.width * imageHeight / img.height : img.width)) * ratio, (props.imageHeight || (imageWidth ? img.height * imageWidth / img.width : img.height)) * ratio);
              endInit({ ctx, canvas, canvasWidthPx, canvasHeightPx });
            }
          });
        } else if (content) {
          if (debug) {
            ctx.strokeStyle = "green";
            ctx.strokeRect(0, 0, markWidth, markHeight);
          }
          const fontSizePx = props.unit == "rpx" ? uni.upx2px(fontSize * ratio) : fontSize * ratio;
          const fontLineHeightPx = props.unit == "rpx" ? uni.upx2px(lineHeight * ratio) : lineHeight * ratio;
          const ySize = props.unit == "rpx" ? uni.upx2px(canvasOffsetTop + lineHeight * ratio) : canvasOffsetTop + lineHeight * ratio;
          ctx.font = `${fontStyle} ${fontWeight} ${fontSizePx}px/${fontLineHeightPx}px ${fontStretch} ${fontVariant} ${fontFamily || "sans-serif"}`;
          ctx.fillStyle = fontColor;
          ctx.fillText(content, canvasOffsetLeft, ySize);
          endInit({ ctx, canvas, canvasWidthPx, canvasHeightPx });
        }
      }
    }
    function endInit({
      ctx,
      canvas,
      canvasWidthPx,
      canvasHeightPx
    }) {
      ctx.draw(false, () => {
        ctx.toTempFilePath(0, 0, canvasWidthPx, canvasHeightPx, canvasWidthPx, canvasHeightPx, "png", 1, function(res) {
          base64UrlRef.value = res.tempFilePath;
        });
      });
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", { renderWhole: true }, [
        renderSlot(_ctx.$slots, "default"),
        createElementVNode("view", {
          class: "overflow fixed",
          style: { "left": "-999px" }
        }, [
          createElementVNode("gcanvas", {
            id: "waterCanvas",
            ref_key: "waterCanvasRef",
            ref: waterCanvasRef,
            style: normalizeStyle({ width: `${boxInfo.value.width}${props.unit}`, height: `${boxInfo.value.height}${props.unit}` })
          }, null, 4)
        ]),
        createElementVNode("view", {
          class: normalizeClass(props.fullscreen ? "fixed" : "absolute"),
          style: normalizeStyle(unref(imageWaterStyle))
        }, null, 6)
      ]);
    };
  }
});
var TmWatermark = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-watermark/tm-watermark.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "watermark",
  setup(__props) {
    const opts = ref({
      content: "TMUI",
      fontSize: 12,
      lineHeight: 12,
      fullscreen: false,
      width: 60,
      height: 60,
      xGap: 0,
      yGap: 0,
      xOffset: 14,
      yOffset: 30,
      rotate: -20,
      image: "",
      imageOpacity: 0.24,
      imageWidth: 60,
      imageHeight: 60
    });
    function handleUpload(res) {
      opts.value.image = res[0].url;
    }
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
            createVNode(tmSheet, { followDark: false }, {
              default: withCtx(() => [
                createVNode(tmText, {
                  _class: "text-weight-b",
                  label: "\u9875\u9762\u6C34\u5370"
                }),
                createVNode(tmText, {
                  "font-size": 24,
                  label: "\u7B80\u5355\u70B9\uFF0C\u6EE1\u8DB3\u5C31\u597D"
                })
              ]),
              _: 1
            }),
            createVNode(TmWatermark, {
              selectable: "",
              "font-size": opts.value.fontSize,
              "line-height": opts.value.lineHeight,
              fullscreen: opts.value.fullscreen,
              width: opts.value.width,
              height: opts.value.height,
              "x-offset": opts.value.xOffset,
              "y-offset": opts.value.yOffset,
              "x-gap": opts.value.xGap,
              "y-gap": opts.value.yGap,
              rotate: opts.value.rotate,
              content: opts.value.content,
              image: opts.value.image,
              "image-width": opts.value.imageWidth,
              "image-height": opts.value.imageHeight,
              "image-opacity": opts.value.imageOpacity
            }, {
              default: withCtx(() => [
                createVNode(tmSheet, null, {
                  default: withCtx(() => [
                    createElementVNode("view", { class: "flex flex-row flex-row-bottom-start" }, [
                      createVNode(tmText, { label: "\u5C5E\u6027\u8BBE\u7F6E" }),
                      createVNode(tmText, {
                        "font-size": 22,
                        _class: "ml-10",
                        label: "(\u5B9E\u65F6\u751F\u6548)"
                      })
                    ]),
                    createVNode(tmDivider),
                    createVNode(tmRadioGroup, {
                      modelValue: opts.value.fullscreen,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => opts.value.fullscreen = $event),
                      defaultValue: false
                    }, {
                      default: withCtx(() => [
                        createVNode(tmRadio, {
                          value: true,
                          label: "\u5168\u5C4F\u5E55"
                        }),
                        createVNode(tmRadio, {
                          value: false,
                          label: "\u5305\u56F4\u5185"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    createVNode(tmDivider),
                    createVNode(tmInput, {
                      prefixLabel: "\u6587\u672C\u5185\u5BB9",
                      align: "right",
                      placeholder: "\u8BF7\u8F93\u5165\u6587\u672C",
                      modelValue: opts.value.content,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => opts.value.content = $event)
                    }, null, 8, ["modelValue"]),
                    createVNode(tmInput, {
                      margin: [0, 24],
                      prefixLabel: "\u5B57\u4F53\u5927\u5C0F",
                      align: "right",
                      placeholder: "\u8BF7\u8F93\u5165\u5B57\u53F7",
                      modelValue: opts.value.fontSize,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => opts.value.fontSize = $event),
                      modelModifiers: { number: true },
                      type: "number"
                    }, null, 8, ["modelValue"]),
                    createVNode(tmInput, {
                      prefixLabel: "\u5B57\u4F53\u884C\u9AD8",
                      align: "right",
                      placeholder: "\u8BF7\u8F93\u5165\u884C\u9AD8",
                      modelValue: opts.value.lineHeight,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => opts.value.lineHeight = $event),
                      modelModifiers: { number: true },
                      type: "number"
                    }, null, 8, ["modelValue"]),
                    createVNode(tmInput, {
                      margin: [0, 24],
                      prefixLabel: "\u65CB\u8F6C\u89D2\u5EA6",
                      align: "right",
                      placeholder: "\u8BF7\u8F93\u5165\u65CB\u8F6C\u89D2\u5EA6",
                      modelValue: opts.value.rotate,
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => opts.value.rotate = $event),
                      modelModifiers: { number: true },
                      type: "number"
                    }, null, 8, ["modelValue"]),
                    createVNode(tmInput, {
                      prefixLabel: "\u5BBD\u5EA6",
                      align: "right",
                      placeholder: "\u8BF7\u8F93\u5165\u5BBD\u5EA6",
                      modelValue: opts.value.width,
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => opts.value.width = $event),
                      modelModifiers: { number: true },
                      type: "number"
                    }, null, 8, ["modelValue"]),
                    createVNode(tmInput, {
                      margin: [0, 24],
                      prefixLabel: "\u9AD8\u5EA6",
                      align: "right",
                      placeholder: "\u8BF7\u8F93\u5165\u9AD8\u5EA6",
                      modelValue: opts.value.height,
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => opts.value.height = $event),
                      modelModifiers: { number: true },
                      type: "number"
                    }, null, 8, ["modelValue"]),
                    createVNode(tmInput, {
                      prefixLabel: "x \u8F74\u95F4\u9694",
                      align: "right",
                      placeholder: "\u8BF7\u8F93\u5165x \u8F74\u95F4\u9694",
                      modelValue: opts.value.xGap,
                      "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => opts.value.xGap = $event),
                      modelModifiers: { number: true },
                      type: "number"
                    }, null, 8, ["modelValue"]),
                    createVNode(tmInput, {
                      margin: [0, 24],
                      prefixLabel: "y \u8F74\u95F4\u9694",
                      align: "right",
                      placeholder: "\u8BF7\u8F93\u5165y \u8F74\u95F4\u9694",
                      modelValue: opts.value.yGap,
                      "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => opts.value.yGap = $event),
                      modelModifiers: { number: true },
                      type: "number"
                    }, null, 8, ["modelValue"]),
                    createVNode(tmInput, {
                      prefixLabel: "x \u8F74\u504F\u79FB",
                      align: "right",
                      placeholder: "\u8BF7\u8F93\u5165x \u8F74\u504F\u79FB",
                      modelValue: opts.value.xOffset,
                      "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => opts.value.xOffset = $event),
                      modelModifiers: { number: true },
                      type: "number"
                    }, null, 8, ["modelValue"]),
                    createVNode(tmInput, {
                      margin: [0, 24],
                      prefixLabel: "y \u8F74\u504F\u79FB",
                      align: "right",
                      placeholder: "\u8BF7\u8F93\u5165y \u8F74\u504F\u79FB",
                      modelValue: opts.value.yOffset,
                      "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => opts.value.yOffset = $event),
                      modelModifiers: { number: true },
                      type: "number"
                    }, null, 8, ["modelValue"]),
                    createVNode(tmUpload, {
                      width: 636,
                      onChange: handleUpload,
                      rows: 1,
                      maxFile: 1,
                      url: "https://mockapi.eolink.com/tNYKNA7ac71aa90bcbe83c5815871a5b419601e96a5524d/upload"
                    }),
                    createVNode(tmInput, {
                      margin: [0, 24],
                      prefixLabel: "\u56FE\u7247\u5BBD\u5EA6",
                      align: "right",
                      placeholder: "\u8BF7\u8F93\u5165\u56FE\u7247\u5BBD\u5EA6",
                      modelValue: opts.value.imageWidth,
                      "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => opts.value.imageWidth = $event),
                      modelModifiers: { number: true },
                      type: "number"
                    }, null, 8, ["modelValue"]),
                    createVNode(tmInput, {
                      prefixLabel: "\u56FE\u7247\u9AD8\u5EA6",
                      align: "right",
                      placeholder: "\u8BF7\u8F93\u5165\u56FE\u7247\u9AD8\u5EA6",
                      modelValue: opts.value.imageHeight,
                      "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => opts.value.imageHeight = $event),
                      modelModifiers: { number: true },
                      type: "number"
                    }, null, 8, ["modelValue"]),
                    createVNode(tmInput, {
                      margin: [0, 24],
                      prefixLabel: "\u56FE\u7247\u900F\u660E\u5EA6",
                      align: "right",
                      placeholder: "\u8BF7\u8F93\u5165\u56FE\u7247\u900F\u660E\u5EA6",
                      modelValue: opts.value.imageOpacity,
                      "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => opts.value.imageOpacity = $event),
                      modelModifiers: { number: true },
                      type: "number"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["font-size", "line-height", "fullscreen", "width", "height", "x-offset", "y-offset", "x-gap", "y-gap", "rotate", "content", "image", "image-width", "image-height", "image-opacity"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
var watermark = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/other/watermark.nvue"]]);
export { watermark as default };
