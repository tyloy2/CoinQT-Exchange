var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { _ as _export_sfc, c as custom_props, g as formatAppLog, a as tmText } from "./tm-text.js";
import { defineComponent, ref, getCurrentInstance, computed, inject, watch, openBlock, createBlock, unref, withCtx, createVNode, normalizeClass, createElementVNode, createElementBlock, createCommentVNode, normalizeStyle, withModifiers, renderSlot } from "vue";
import { t as tmSheet } from "./tm-sheet.js";
import { t as tmIcon } from "./tm-icon.js";
import { t as tmTranslate } from "./tm-translate.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-image",
  props: __spreadProps(__spreadValues({}, custom_props), {
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    color: {
      type: String,
      default: "white"
    },
    transprent: {
      type: [Boolean, String],
      default: true
    },
    border: {
      type: Number,
      default: 0
    },
    width: {
      type: [Number],
      default: 200,
      required: true
    },
    height: {
      type: [Number],
      default: 200,
      required: true
    },
    src: {
      type: String,
      default: "",
      required: true
    },
    errorIcon: {
      type: String,
      default: ""
    },
    errorLabel: {
      type: String,
      default: "\u52A0\u8F7D\u9519\u8BEF"
    },
    loadIcon: {
      type: String,
      default: ""
    },
    showLoad: {
      type: Boolean,
      default: true
    },
    preview: {
      type: [Boolean],
      default: false
    },
    extra: {
      type: [Boolean],
      default: false
    },
    extraPosition: {
      type: String,
      default: "in"
    },
    delete: {
      type: [Boolean],
      default: false
    },
    allowDelete: {
      type: [Boolean],
      default: true
    },
    model: {
      type: String,
      default: "scaleToFill"
    },
    unit: {
      type: String,
      default: "rpx"
    },
    showMenuByLongPress: {
      type: [Boolean],
      default: false
    }
  }),
  emits: ["load", "error", "click", "delete", "close"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    const aniplay = ref(null);
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    if (!props.height && !props.width) {
      formatAppLog("error", "at tmui/components/tm-image/tm-image.vue:161", "\u9519\u8BEF\uFF1A\u56FE\u7247\u5BBD\u5EA6\u548C\u9AD8\u5EA6\u5FC5\u987B\u8BBE\u7F6E\u4E00\u4E2A");
    }
    const img_width = computed(() => {
      return props.width;
    });
    const img_height = computed(() => {
      return props.height - props.padding[1];
    });
    const img_src = computed(() => props.src);
    const loading = ref(true);
    const error = ref(false);
    const isRmove = ref(false);
    let parent = proxy == null ? void 0 : proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.tmImageGroup) == "tmImageGroup" || !parent) {
        break;
      } else {
        parent = (_c = parent == null ? void 0 : parent.$parent) != null ? _c : void 0;
      }
    }
    const ImagGrupList = inject("ImagGrupList", computed(() => []));
    if (parent == null ? void 0 : parent.pushKey) {
      parent.pushKey({
        width: img_width.value,
        height: img_width.value,
        src: props.src
      });
    }
    watch(img_src, () => {
      loading.value = true;
      error.value = false;
      if (parent == null ? void 0 : parent.pushKey) {
        parent.pushKey({
          width: img_width.value,
          height: img_width.value,
          src: props.src
        });
      }
    });
    function imageLoad(event) {
      loading.value = false;
      emits("load", event);
    }
    function imageError(event) {
      formatAppLog("error", "at tmui/components/tm-image/tm-image.vue:212", "\u56FE\u7247\u52A0\u8F7D\u9519:" + props.src, event);
      error.value = true;
      loading.value = false;
      emits("error", event);
    }
    function imageClick(event) {
      emits("click", event);
      if (props.preview) {
        let list = ImagGrupList.value.length > 0 ? ImagGrupList.value : [props.src];
        uni.previewImage({
          urls: list,
          current: props.src
        });
      }
    }
    async function del() {
      var _a2, _b2;
      isRmove.value = false;
      if (!props.allowDelete) {
        emits("delete", props.src);
        return;
      }
      if ((_a2 = aniplay.value) == null ? void 0 : _a2.play) {
        (_b2 = aniplay.value) == null ? void 0 : _b2.play();
      } else {
        isRmove.value = true;
        emits("close", props.src);
      }
    }
    function aniEnd() {
      isRmove.value = true;
      emits("close", props.src);
    }
    return (_ctx, _cache) => {
      return !isRmove.value ? (openBlock(), createBlock(tmTranslate, {
        key: 0,
        width: unref(img_width) + props.padding[0] * 2 + props.unit,
        onEnd: aniEnd,
        ref_key: "aniplay",
        ref: aniplay,
        autoPlay: false,
        name: "zoom",
        reverse: ""
      }, {
        default: withCtx(() => [
          createVNode(tmSheet, {
            color: props.color,
            transprent: props.transprent,
            margin: props.margin,
            round: props.round,
            border: props.border,
            padding: [props.padding[0], 0],
            class: normalizeClass(["round-" + props.round]),
            width: unref(img_width) - props.padding[0] * 2,
            unit: props.unit
          }, {
            default: withCtx(() => [
              createElementVNode("view", {
                class: normalizeClass([`pb-${props.padding[1]}`])
              }, [
                loading.value ? (openBlock(), createElementBlock("u-image", {
                  key: 0,
                  src: unref(img_src),
                  style: { "width": "10px", "height": "10px", "opacity": "0", "transform": "translateX(1200px)" },
                  onLoad: imageLoad,
                  onError: imageError,
                  mode: "scaleToFill"
                }, null, 40, ["src"])) : createCommentVNode("v-if", true),
                !loading.value && !error.value ? (openBlock(), createElementBlock("u-image", {
                  key: 1,
                  showMenuByLongpress: props.showMenuByLongPress,
                  onClick: imageClick,
                  class: normalizeClass(["round-" + props.round]),
                  src: unref(img_src),
                  style: normalizeStyle([{ width: unref(img_width) + props.unit, height: unref(img_height) + props.unit }]),
                  mode: props.model
                }, null, 14, ["showMenuByLongpress", "src", "mode"])) : createCommentVNode("v-if", true),
                loading.value && !error.value ? (openBlock(), createElementBlock("view", {
                  key: 2,
                  style: normalizeStyle([{ width: unref(img_width) + props.unit, height: unref(img_height) + props.unit }]),
                  class: "flex flex-center opacity-3"
                }, [
                  props.showLoad ? (openBlock(), createBlock(tmIcon, {
                    key: 0,
                    "font-size": 26,
                    spin: "",
                    name: "tmicon-loading"
                  })) : createCommentVNode("v-if", true)
                ], 4)) : createCommentVNode("v-if", true),
                !loading.value && error.value ? (openBlock(), createElementBlock("view", {
                  key: 3,
                  style: normalizeStyle([{ width: unref(img_width) + props.unit, height: unref(img_height) + props.unit }]),
                  class: "flex flex-col flex-center opacity-5"
                }, [
                  createVNode(tmIcon, { name: "tmicon-exclamation-circle" }),
                  createVNode(tmText, {
                    _class: "pt-10",
                    "font-size": 26,
                    label: props.errorLabel
                  }, null, 8, ["label"])
                ], 4)) : createCommentVNode("v-if", true),
                createCommentVNode(" extra "),
                props.extra ? (openBlock(), createElementBlock("view", {
                  key: 4,
                  onClick: withModifiers(imageClick, ["stop"]),
                  class: normalizeClass([
                    props.extraPosition == "in" ? "absolute l-0 b-0 zIndex-5" : "",
                    "flex flex-col flex-col-bottom-start"
                  ]),
                  style: normalizeStyle([
                    props.extra && props.extraPosition == "in" ? { height: unref(img_height) + props.unit, width: unref(img_width) + props.unit } : "",
                    props.extra && props.extraPosition == "out" ? { width: unref(img_width) + props.unit } : ""
                  ])
                }, [
                  renderSlot(_ctx.$slots, "extra")
                ], 14, ["onClick"])) : createCommentVNode("v-if", true),
                createCommentVNode(" delete \u5C55\u793A\u5220\u9664\u6309\u94AE\u3002 "),
                props.delete ? (openBlock(), createElementBlock("view", {
                  key: 5,
                  class: "absolute r-10 t-10 flex flex-col flex-col-center-end zIndex-10",
                  style: normalizeStyle([props.delete ? { width: unref(img_width) + props.unit } : ""])
                }, [
                  createVNode(tmIcon, {
                    onClick: del,
                    color: "red",
                    name: "tmicon-times-circle-fill"
                  })
                ], 4)) : createCommentVNode("v-if", true)
              ], 2)
            ]),
            _: 3
          }, 8, ["color", "transprent", "margin", "round", "border", "padding", "class", "width", "unit"])
        ]),
        _: 3
      }, 8, ["width"])) : createCommentVNode("v-if", true);
    };
  }
});
var tmImage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-image/tm-image.vue"]]);
export { tmImage as t };
