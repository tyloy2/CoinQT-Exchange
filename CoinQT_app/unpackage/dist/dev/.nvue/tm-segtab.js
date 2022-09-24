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
import { _ as _export_sfc, c as custom_props, r as requireNativePlugin, a as tmText } from "./tm-text.js";
import { defineComponent, getCurrentInstance, ref, computed, watch, onMounted, nextTick, inject, openBlock, createElementBlock, normalizeClass, normalizeStyle, createVNode, withCtx, createCommentVNode, createElementVNode, Fragment, renderList, unref, toRaw } from "vue";
import { t as tmSheet } from "./tm-sheet.js";
var _style_0 = { "bgbtnpos": { "": { "transitionTimingFunction": "linear", "transitionDuration": 200, "transitionProperty": "left,width,transform", "transitionDelay": 0 } }, "@TRANSITION": { "bgbtnpos": { "timingFunction": "linear", "duration": 200, "property": "left,width,transform", "delay": 0 } } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-segtab",
  props: __spreadProps(__spreadValues({}, custom_props), {
    round: {
      type: Number,
      default: 2
    },
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 64
    },
    gutter: {
      type: Number,
      default: 2
    },
    list: {
      type: Array,
      default: () => [],
      required: true
    },
    modelValue: {
      type: [Number, String],
      default: 0
    },
    defaultValue: {
      type: [Number, String],
      default: 0
    },
    beforeChange: {
      type: [Function, Boolean],
      default: () => false
    },
    color: {
      type: String,
      default: "white"
    },
    bgColor: {
      type: String,
      default: "grey-3"
    },
    fontSize: {
      type: Number,
      default: 24
    },
    activeColor: {
      type: String,
      default: "primary"
    }
  }),
  emits: ["update:modelValue", "change", "click"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c, _d;
    const props = __props;
    const dom = requireNativePlugin("dom");
    const animation = requireNativePlugin("animation");
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const leftPos = ref(0);
    const leftWidth = ref(0);
    let timid = uni.$tm.u.getUid();
    const _list = computed(() => {
      var _a2;
      let templist = [];
      for (let i = 0, len = props.list.length; i < len; i++) {
        let al = { text: "", id: i };
        let el = props.list[i];
        if (typeof el == "string" || typeof el == "number") {
          al.text = el;
        } else if (typeof el == "object") {
          al.text = (_a2 = el == null ? void 0 : el.text) != null ? _a2 : "";
          if (typeof (el == null ? void 0 : el.id) != "undefined") {
            al.id = el["id"];
          }
        }
        templist.push(al);
      }
      return templist;
    });
    const _cId = ref((_c = props.defaultValue) != null ? _c : 0);
    async function itemClick(index, id) {
      emits("click", index);
      if (typeof props.beforeChange === "function") {
        uni.showLoading({ title: "...", mask: true });
        let p = await props.beforeChange(index);
        if (typeof p === "function") {
          p = await p(index);
        }
        uni.hideLoading();
        if (!p)
          return;
      }
      if (_cId.value === id)
        return;
      _cId.value = id;
      getDomRectBound(index);
      emits("change", _cId.value);
      emits("update:modelValue", _cId.value);
      pushFormItem();
    }
    watch([() => props.modelValue, () => props.list], () => {
      _cId.value = props.modelValue;
    }, { deep: true });
    watch([_cId], () => {
      initPos();
    }, { deep: true });
    onMounted(() => {
      initPos();
    });
    function initPos() {
      let indexel = _list.value.findIndex((el) => el.id === _cId.value);
      clearTimeout(timid);
      timid = setTimeout(() => {
        nextTick(() => getDomRectBound(indexel));
      }, 300);
    }
    function getEl(el) {
      if (typeof el === "string" || typeof el === "number")
        return el;
      if (WXEnvironment) {
        return el.ref;
      } else {
        return el instanceof HTMLElement ? el : el.$el;
      }
    }
    function getDomRectBound(idx) {
      dom.getComponentRect(proxy == null ? void 0 : proxy.$refs["tm-segtab"], function(PARENAREDS) {
        var _a2;
        if (PARENAREDS == null ? void 0 : PARENAREDS.size) {
          let parentleft = Math.floor((_a2 = PARENAREDS.size.left) != null ? _a2 : 0);
          dom.getComponentRect(proxy == null ? void 0 : proxy.$refs["tab_"][idx], function(res) {
            if (res == null ? void 0 : res.size) {
              const { left, top, width } = res.size;
              getEl(proxy == null ? void 0 : proxy.$refs["tmBgEl"]);
              leftWidth.value = Math.ceil(width != null ? width : 0);
              leftPos.value = Math.ceil((left != null ? left : 0) - uni.upx2px(props.gutter) - parentleft);
              animation.transition(proxy == null ? void 0 : proxy.$refs["tmBgEl"], {
                styles: {
                  transform: "translateX(" + leftPos.value + "px)"
                },
                duration: 200,
                timingFunction: "ease",
                delay: 0
              }, () => {
              });
            }
          });
        }
      });
    }
    const rulesObj = inject("tmFormItemRules", computed(() => {
      return [
        {
          message: "\u8BF7\u9009\u62E9",
          required: false,
          validator: false
        }
      ];
    }));
    let parentFormItem = proxy.$parent;
    while (parentFormItem) {
      if ((parentFormItem == null ? void 0 : parentFormItem.tmFormComnameFormItem) == "tmFormComnameFormItem" || !parentFormItem) {
        break;
      } else {
        parentFormItem = (_d = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _d : void 0;
      }
    }
    const validate = (rules) => {
      rules = rules.map((el) => {
        if (typeof el.validator === "function" && el.required === true) {
          return el;
        } else if (typeof el.validator === "boolean" && el.required === true) {
          return __spreadProps(__spreadValues({}, el), {
            validator: (val) => {
              return val === "" ? false : true;
            }
          });
        } else {
          return __spreadProps(__spreadValues({}, el), {
            validator: (val) => {
              return true;
            }
          });
        }
      });
      let rules_filter = rules.filter((el) => {
        return typeof el.validator === "function" && el.required === true;
      });
      let rules_fun = rules_filter.map((el) => {
        return new Promise(async (res, rej) => {
          if (typeof el.validator === "function") {
            let vr = await el.validator(_cId.value);
            if (vr) {
              res({
                message: String(el.message),
                validator: true
              });
            } else {
              rej({
                message: el.message,
                validator: false
              });
            }
          } else {
            res({
              message: el.message,
              validator: true
            });
          }
        });
      });
      return Promise.all(rules_fun);
    };
    async function pushFormItem(isCheckVail = true) {
      if (parentFormItem) {
        if (isCheckVail) {
          validate(toRaw(rulesObj.value)).then((ev) => {
            parentFormItem.pushCom({
              value: _cId.value,
              isRequiredError: false,
              componentsName: "tm-segtab",
              message: ev.length == 0 ? "" : ev[0].message
            });
          }).catch((er) => {
            parentFormItem.pushCom({
              value: _cId.value,
              isRequiredError: true,
              componentsName: "tm-segtab",
              message: er.message
            });
          });
        }
      }
    }
    pushFormItem();
    const tmFormFun = inject("tmFormFun", computed(() => ""));
    watch(tmFormFun, () => {
      if (tmFormFun.value == "reset") {
        _cId.value = "";
        emits("update:modelValue", "");
        pushFormItem(false);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: normalizeClass(["tm-segtab relative flex flex-col", [`round-${props.round}`]]),
        ref: "tm-segtab",
        style: normalizeStyle({ width: props.width + props.gutter * 2 + "rpx" }),
        renderWhole: true
      }, [
        createVNode(tmSheet, {
          round: props.round,
          border: props.border,
          linear: props.linear,
          "linear-deep": props.linearDeep,
          "no-level": true,
          height: props.height,
          color: props.bgColor,
          width: props.width,
          _class: "flex-row relative overflow",
          padding: [props.gutter, props.gutter],
          margin: [0, 0]
        }, {
          default: withCtx(() => [
            _cId.value !== "" ? (openBlock(), createElementBlock("view", {
              key: 0,
              ref: "tmBgEl",
              class: "relative flex flex-row",
              style: normalizeStyle([{ width: leftWidth.value + "px" }])
            }, [
              createCommentVNode(" left:leftPos+'px',width:leftWidth+'px' "),
              createVNode(tmSheet, {
                "follow-dark": props.followDark,
                round: props.round,
                class: "flex-1",
                _class: "flex-1",
                color: props.color,
                margin: [0, 0],
                padding: [0, 0]
              }, null, 8, ["follow-dark", "round", "color"])
            ], 4)) : createCommentVNode("v-if", true),
            createElementVNode("view", {
              class: normalizeClass(["absolute flex flex-row flex-row-center-start", [`pa-${props.gutter}`, `l--${props.gutter / 2}`]]),
              style: normalizeStyle([{ width: `${props.width}rpx`, height: `${props.height - props.gutter}rpx` }])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(_list), (item, index) => {
                return openBlock(), createElementBlock("view", {
                  onClick: ($event) => itemClick(index, item.id),
                  ref_for: true,
                  ref: "tab_",
                  class: normalizeClass([["tab" + index], "flex-1 flex flex-row flex-row-center-center"]),
                  style: normalizeStyle({ height: `${props.height - props.gutter}rpx` }),
                  key: index
                }, [
                  createVNode(tmText, {
                    color: item.id === _cId.value ? props.activeColor : "",
                    "font-size": props.fontSize,
                    userInteractionEnabled: false,
                    label: item.text
                  }, null, 8, ["color", "font-size", "label"])
                ], 14, ["onClick"]);
              }), 128))
            ], 6)
          ]),
          _: 1
        }, 8, ["round", "border", "linear", "linear-deep", "height", "color", "width", "padding"])
      ], 6);
    };
  }
});
var tmSegtab = /* @__PURE__ */ _export_sfc(_sfc_main, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-segtab/tm-segtab.vue"]]);
export { tmSegtab as t };
