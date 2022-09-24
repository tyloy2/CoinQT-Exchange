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
import { defineComponent, inject, computed, getCurrentInstance, ref, onUpdated, onMounted, watch, openBlock, createElementBlock, unref, withModifiers, normalizeStyle, createCommentVNode, createElementVNode, normalizeClass, renderSlot, createVNode, withCtx, createBlock, Fragment, renderList, nextTick } from "vue";
import { _ as _export_sfc, c as custom_props, r as requireNativePlugin, a as tmText, t as tmApp } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmTranslate } from "../../tm-translate.js";
import { t as tmIcon } from "../../tm-icon.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
var _style_0 = { "popover-tcc": { "": { "transform": "translateY(-15rpx)" } }, "popover-bcc": { "": { "transform": "translateY(15rpx)" } }, "popover-tr": { "": { "display": "flex", "justifyContent": "flex-start", "alignItems": "flex-start" } } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-dropdown",
  props: __spreadProps(__spreadValues({}, custom_props), {
    border: {
      type: [Number],
      default: 0
    },
    round: {
      type: [Number],
      default: 3
    },
    transprent: {
      type: [Boolean],
      default: false
    },
    color: {
      type: String,
      default: "grey-darken-4"
    },
    width: {
      type: Number,
      default: 0
    },
    position: {
      type: String,
      default: "bc"
    },
    list: {
      type: Array,
      default: () => [],
      required: true,
      validator: (val) => {
        return typeof val === "object" && Array.isArray(val);
      }
    },
    rangKey: {
      type: String,
      default: "text"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    var _a, _b;
    const props = __props;
    const dom = requireNativePlugin("dom");
    const sysinfo = inject("tmuiSysInfo", computed(() => {
      return { bottom: 0, height: 750, width: uni.upx2px(750), top: 0, isCustomHeader: false, sysinfo: null };
    }));
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const aniDom = ref(null);
    const windowWidth = computed(() => sysinfo.value.width);
    const windowHeight = computed(() => sysinfo.value.height);
    let isNvue = ref(false);
    isNvue.value = true;
    let timeid = ref(uni.$tm.u.getUid(5));
    let show = ref(false);
    let domNvuePosCss = ref({
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      width: 0,
      height: 0
    });
    let domNvueContentCss = ref({
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      width: 0,
      height: 0
    });
    const listData = computed(() => {
      let list = props.list.map((item) => {
        let el = {
          text: "",
          icon: "",
          iconColor: ""
        };
        if (typeof item === "string" || typeof item === "number") {
          el.text = item;
        } else {
          el.text = item[props.rangKey];
          el = __spreadValues(__spreadValues({}, el), item);
        }
        return el;
      });
      return list;
    });
    const tarnslateName = computed(() => {
      if (props.position == "bc" || props.position == "bl" || props.position == "br")
        return "up";
      return "down";
    });
    function nvueDomPos() {
      try {
        nextTick(function() {
          dom.getComponentRect(proxy.$refs.popver, function(res) {
            domNvuePosCss.value = __spreadValues({}, res.size);
          });
          dom.getComponentRect(proxy.$refs.content, function(res) {
            if (res == null ? void 0 : res.size) {
              domNvueContentCss.value = __spreadValues({}, res.size);
            }
          });
        });
      } catch (e) {
      }
    }
    onUpdated(() => {
      if (domNvuePosCss.value.width == 0 || !domNvueContentCss.value.height) {
        nvueDomPos();
      }
    });
    onMounted(() => nvueDomPos());
    watch(() => show.value, () => {
      clearTimeout(timeid.value);
      if (show.value == true) {
        timeid.value = setTimeout(function() {
          var _a2;
          (_a2 = aniDom.value) == null ? void 0 : _a2.play();
        }, 80);
      }
    });
    function openDromenu() {
      uni.$tm.u.throttle(() => show.value = true, 200);
    }
    function closeDromenu() {
      uni.$tm.u.debounce(() => show.value = false, 250);
    }
    function onclick(index, data) {
      emits("click", { index, data });
      show.value = false;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-row relative",
        renderWhole: true
      }, [
        unref(show) ? (openBlock(), createElementBlock("view", {
          key: 0,
          onClick: withModifiers(closeDromenu, ["stop"]),
          class: "l-0 t-0 fixed zIndex-9",
          style: normalizeStyle([{ width: unref(windowWidth) + "px", height: unref(windowHeight) + "px", background: "rgba(0,0,0,0)" }])
        }, null, 12, ["onClick"])) : createCommentVNode("v-if", true),
        createElementVNode("view", {
          class: normalizeClass(["flex flex-col", [
            props.position == "tc" ? "popover-tc" : "",
            props.position == "tl" ? "popover-tl" : "",
            props.position == "tr" ? "popover-tr" : "",
            props.position == "bc" ? "popover-bc" : "",
            props.position == "bl" ? "popover-bl" : "",
            props.position == "br" ? "popover-br" : ""
          ]])
        }, [
          createElementVNode("view", {
            onClick: withModifiers(openDromenu, ["stop"]),
            class: "relative zIndex-1 flex flex-row"
          }, [
            createElementVNode("view", {
              eventPenetrationEnabled: false,
              userInteractionEnabled: false,
              ref: "popver",
              class: "flex flex-row"
            }, [
              renderSlot(_ctx.$slots, "default")
            ], 512)
          ], 8, ["onClick"]),
          unref(show) ? (openBlock(), createElementBlock("view", {
            key: 0,
            style: normalizeStyle([{ "z-index": "400" }, [
              unref(isNvue) && props.position == "tc" ? {
                top: unref(domNvuePosCss).top - unref(domNvueContentCss).height + "px",
                left: unref(domNvuePosCss).left + unref(domNvuePosCss).width / 2 - unref(domNvueContentCss).width / 2 + "px"
              } : "",
              unref(isNvue) && props.position == "tl" ? {
                top: unref(domNvuePosCss).top - unref(domNvueContentCss).height + "px",
                left: unref(domNvuePosCss).left + "px"
              } : "",
              unref(isNvue) && props.position == "tr" ? {
                top: unref(domNvuePosCss).top - unref(domNvueContentCss).height + "px",
                left: unref(domNvuePosCss).right - unref(domNvueContentCss).width + "px"
              } : "",
              unref(isNvue) && props.position == "bc" ? {
                top: unref(domNvuePosCss).bottom + "px",
                left: unref(domNvuePosCss).left + unref(domNvuePosCss).width / 2 - unref(domNvueContentCss).width / 2 + "px"
              } : "",
              unref(isNvue) && props.position == "bl" ? {
                top: unref(domNvuePosCss).bottom + "px",
                left: unref(domNvuePosCss).left + "px"
              } : "",
              unref(isNvue) && props.position == "br" ? {
                top: unref(domNvuePosCss).bottom + "px",
                left: unref(domNvuePosCss).right - unref(domNvueContentCss).width + "px"
              } : ""
            ]]),
            class: normalizeClass([
              unref(isNvue) ? "fixed" : "absolute",
              props.position == "tc" || props.position == "tl" || props.position == "tr" ? "popover-tcc" : "",
              props.position == "bc" || props.position == "bl" || props.position == "br" ? "popover-bcc" : ""
            ]),
            ref: "content"
          }, [
            createVNode(tmTranslate, {
              ref_key: "aniDom",
              ref: aniDom,
              reverse: "",
              name: unref(tarnslateName),
              duration: 180,
              autoPlay: !unref(isNvue)
            }, {
              default: withCtx(() => [
                createElementVNode("view", {
                  class: normalizeClass(["flex flex-col", [
                    props.position == "tc" ? "flex-col-center-center" : "",
                    props.position == "tl" ? "flex-col-top-start" : "",
                    props.position == "tr" ? "flex-col-bottom-end" : "",
                    props.position == "bc" ? "flex-col-center-center" : "",
                    props.position == "bl" ? "flex-col-top-start" : "",
                    props.position == "br" ? "flex-col-bottom-end" : ""
                  ]]),
                  style: normalizeStyle([props.width ? { width: props.width + "rpx" } : ""])
                }, [
                  props.position == "bc" || props.position == "bl" || props.position == "br" ? (openBlock(), createBlock(tmSheet, {
                    key: 0,
                    color: props.color,
                    _class: props._class,
                    followTheme: props.followTheme,
                    dark: props.dark,
                    round: 0,
                    shadow: props.shadow,
                    outlined: props.outlined,
                    border: props.border,
                    borderStyle: props.borderStyle,
                    borderDirection: props.borderDirection,
                    text: props.text,
                    transprent: props.transprent,
                    linear: props.linear,
                    linearDeep: props.linearDeep,
                    _style: [
                      { zIndex: 1 },
                      props.position == "bc" ? { transform: " rotate(45deg)", bottom: "-10rpx", marginRight: "0rpx" } : {},
                      props.position == "bl" ? { transform: " rotate(45deg)", bottom: "-12rpx", marginLeft: "12rpx" } : {},
                      props.position == "br" ? { transform: " rotate(45deg)", bottom: "-12rpx", marginRight: "12rpx" } : {}
                    ],
                    margin: [0, 0],
                    padding: [0, 0],
                    width: 20,
                    height: 20
                  }, null, 8, ["color", "_class", "followTheme", "dark", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "_style"])) : createCommentVNode("v-if", true),
                  createVNode(tmSheet, {
                    color: props.color,
                    _class: props._class,
                    padding: [0, 0],
                    _style: [{ zIndex: 2, position: "relative" }],
                    followTheme: props.followTheme,
                    dark: props.dark,
                    round: props.round,
                    shadow: props.shadow,
                    outlined: props.outlined,
                    border: props.border,
                    borderStyle: props.borderStyle,
                    borderDirection: props.borderDirection,
                    text: props.text,
                    transprent: props.transprent,
                    linear: props.linear,
                    linearDeep: props.linearDeep,
                    width: props.width,
                    margin: [0, 0]
                  }, {
                    default: withCtx(() => [
                      createElementVNode("view", { style: { "height": "24rpx" } }),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(unref(listData), (item, index) => {
                        return openBlock(), createElementBlock("view", {
                          hoverClass: "opacity-7",
                          onClick: withModifiers(($event) => onclick(index, item), ["stop"]),
                          key: index,
                          class: "flex-1 flex px-24 py-16"
                        }, [
                          createElementVNode("view", { class: "flex-row flex pb-12 flex-between" }, [
                            createElementVNode("view", { class: "flex flex-row flex-row-center-start flex-1" }, [
                              item.icon ? (openBlock(), createBlock(tmIcon, {
                                key: 0,
                                color: item.iconColor,
                                dark: props.dark,
                                fontSize: 36,
                                _class: "pr-12",
                                name: item.icon
                              }, null, 8, ["color", "dark", "name"])) : createCommentVNode("v-if", true),
                              createVNode(tmText, {
                                fontSize: 32,
                                label: item.text
                              }, null, 8, ["label"])
                            ]),
                            createVNode(tmIcon, {
                              "font-size": 22,
                              _class: "pl-24",
                              name: "tmicon-angle-right"
                            })
                          ])
                        ], 8, ["onClick"]);
                      }), 128)),
                      createElementVNode("view", { style: { "height": "8rpx" } })
                    ]),
                    _: 1
                  }, 8, ["color", "_class", "followTheme", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "width"]),
                  props.position == "tc" || props.position == "tl" || props.position == "tr" ? (openBlock(), createBlock(tmSheet, {
                    key: 1,
                    color: props.color,
                    _class: props._class,
                    followTheme: props.followTheme,
                    dark: props.dark,
                    round: 0,
                    shadow: props.shadow,
                    outlined: props.outlined,
                    border: props.border,
                    borderStyle: props.borderStyle,
                    borderDirection: props.borderDirection,
                    text: props.text,
                    transprent: props.transprent,
                    linear: props.linear,
                    linearDeep: props.linearDeep,
                    _style: [
                      { zIndex: 1 },
                      props.position == "tc" ? { transform: " rotate(45deg)", top: "-12rpx" } : {},
                      props.position == "tl" ? { transform: " rotate(45deg)", top: "-12rpx", marginLeft: "12rpx" } : {},
                      props.position == "tr" ? { transform: " rotate(45deg)", top: "-12rpx", marginRight: "12rpx" } : {}
                    ],
                    margin: [0, 0],
                    padding: [0, 0],
                    width: 20,
                    height: 20
                  }, null, 8, ["color", "_class", "followTheme", "dark", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "_style"])) : createCommentVNode("v-if", true)
                ], 6)
              ]),
              _: 1
            }, 8, ["name", "autoPlay"])
          ], 6)) : createCommentVNode("v-if", true)
        ], 2)
      ]);
    };
  }
});
var tmDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0]], ["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-dropdown/tm-dropdown.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dropdown",
  setup(__props) {
    const list = ref([
      { text: "\u82F9\u679C", id: "1", icon: "tmicon-collection" },
      { text: "\u83E0\u841D", id: "2", icon: "tmicon-account-plus" },
      { text: "\u7535\u8BDD", id: "3", icon: "tmicon-phone" }
    ]);
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
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  fontSize: 24,
                  _class: "font-weight-b",
                  label: "\u57FA\u7840\u5C5E\u6027,\u66F4\u591A\u73A9\u6CD5\u8BF7\u524D\u5F80\u6587\u6863\u3002"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex flex-between flex-row px-32" }, [
                  createVNode(tmDropdown, {
                    position: "bl",
                    color: "grey-darken-4",
                    width: 220,
                    list: list.value
                  }, {
                    default: withCtx(() => [
                      createVNode(tmText, { label: "\u663E\u793A\u83DC\u5355" })
                    ]),
                    _: 1
                  }, 8, ["list"]),
                  createVNode(tmDropdown, {
                    width: 220,
                    color: "red",
                    list: list.value
                  }, {
                    default: withCtx(() => [
                      createVNode(tmText, { label: "\u6837\u5F0F1" })
                    ]),
                    _: 1
                  }, 8, ["list"]),
                  createVNode(tmDropdown, {
                    position: "br",
                    width: 220,
                    color: "primary",
                    linear: "bottom",
                    linearDeep: "accent",
                    list: list.value
                  }, {
                    default: withCtx(() => [
                      createVNode(tmText, { label: "\u53F3\u5BF9\u9F50" })
                    ]),
                    _: 1
                  }, 8, ["list"])
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]);
    };
  }
});
var dropdown = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/daohang/dropdown.nvue"]]);
export { dropdown as default };
