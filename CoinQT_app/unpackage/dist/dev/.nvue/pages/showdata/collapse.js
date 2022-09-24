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
import { defineComponent, ref, provide, computed, openBlock, createElementBlock, renderSlot, getCurrentInstance, inject, watchEffect, normalizeClass, createVNode, unref, withCtx, createElementVNode, normalizeStyle, createCommentVNode } from "vue";
import { _ as _export_sfc, c as custom_props, a as tmText, t as tmApp } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmIcon } from "../../tm-icon.js";
import "pinia";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "tm-collapse",
  props: {
    activeKey: {
      type: [Array],
      default: () => []
    },
    defaultActiveKey: {
      type: [Array],
      default: () => []
    },
    accordion: {
      type: [Boolean, String],
      default: false
    },
    border: {
      type: [Number, String],
      default: 2
    },
    iconPos: {
      type: String,
      default: "left"
    },
    openIcon: {
      type: String,
      default: "tmicon-angle-up"
    },
    closeIcon: {
      type: String,
      default: "tmicon-angle-down"
    }
  },
  emits: ["change", "update:active-key"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const _activeKey = ref([...props.activeKey, ...props.defaultActiveKey]);
    if (props.accordion) {
      if (_activeKey.value.length > 0) {
        _activeKey.value = [_activeKey.value[0]];
      }
    }
    const cacheKey = ref([]);
    const pushKey = function(key) {
      cacheKey.value = [.../* @__PURE__ */ new Set([...cacheKey.value, key])];
    };
    const setKey = function(key) {
      let findkey = _activeKey.value.findIndex((el) => String(el) == String(key));
      if (props.accordion) {
        if (findkey > -1) {
          _activeKey.value = [];
        } else {
          _activeKey.value = [key];
        }
      } else {
        if (findkey > -1) {
          _activeKey.value.splice(findkey, 1);
        } else {
          _activeKey.value.push(key);
        }
      }
      emits("update:active-key", _activeKey.value);
      emits("change", _activeKey.value);
    };
    emits("update:active-key", _activeKey.value);
    expose({ tmCollapse: "tmCollapse", setKey, pushKey, border: props.border });
    provide("tmCollapseKeyList", computed(() => _activeKey.value));
    provide("tmCollapseIconPos", computed(() => props.iconPos));
    provide("tmCollapseopenIcon", computed(() => props.openIcon));
    provide("tmCollapsecloseIcon", computed(() => props.closeIcon));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex-col flex",
        renderWhole: true
      }, [
        renderSlot(_ctx.$slots, "default")
      ]);
    };
  }
});
var tmCollapse = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-collapse/tm-collapse.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-collapse-item",
  props: __spreadProps(__spreadValues({}, custom_props), {
    transprent: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    title: {
      type: String,
      default: ""
    },
    titleSize: {
      type: Number,
      default: 30
    },
    height: {
      type: Number,
      default: 88
    },
    name: {
      type: [Number, String],
      default: ""
    },
    activeColor: {
      type: [String],
      default: "primary"
    },
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    padding: {
      type: Array,
      default: () => [24, 0]
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    leftIcon: {
      type: [String],
      default: ""
    },
    leftIconColor: {
      type: [String],
      default: ""
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const _activekeyArray = inject("tmCollapseKeyList", computed(() => []));
    const _tmCollapseIconPos = inject("tmCollapseIconPos", computed(() => "left"));
    const _tmCollapsecloseIcon = inject("tmCollapsecloseIcon", computed(() => "tmicon-caret-right"));
    const _tmCollapseopenIcon = inject("tmCollapseopenIcon", computed(() => "tmicon-sort-down"));
    const _leftIcon = computed(() => props.leftIcon);
    const isActiveAfter = ref(false);
    let parent = proxy == null ? void 0 : proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.tmCollapse) == "tmCollapse" || !parent) {
        break;
      } else {
        parent = (_c = parent == null ? void 0 : parent.$parent) != null ? _c : void 0;
      }
    }
    if (parent) {
      parent == null ? void 0 : parent.pushKey(props.name);
    }
    const cborder = ref(props.border ? props.border : parent == null ? void 0 : parent.border);
    const isActive = computed(() => {
      let index = _activekeyArray.value.findIndex((el) => {
        return el == props.name;
      });
      return index > -1;
    });
    const _leftIconColor = computed(() => {
      if (props.leftIconColor)
        return props.leftIconColor;
      if (props.leftIconColor === "" && props.activeColor !== "" && isActive.value)
        return props.activeColor;
      return "";
    });
    watchEffect(() => {
      if (isActive.value) {
        setTimeout(function() {
          isActiveAfter.value = true;
        }, 20);
      } else {
        isActiveAfter.value = false;
      }
    });
    function openAndClose(e) {
      emits("click", e);
      if (props.disabled)
        return;
      parent == null ? void 0 : parent.setKey(props.name);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: normalizeClass(["flex flex-col overflow", [__props.disabled ? "opacity-7" : ""]]),
        renderWhole: true
      }, [
        createVNode(tmSheet, {
          transprent: props.transprent,
          onClick: openAndClose,
          color: props.color,
          text: __props.disabled,
          border: unref(isActive) ? 0 : cborder.value,
          linear: props.linear,
          linearDeep: props.linearDeep,
          dark: props.dark,
          followDark: props.followDark,
          followTheme: props.followTheme,
          borderDirection: "bottom",
          margin: props.margin,
          padding: props.padding
        }, {
          default: withCtx(() => [
            createElementVNode("view", {
              style: normalizeStyle({ height: props.height + "rpx" }),
              userInteractionEnabledn: false,
              class: "flex-row-center-start flex-row"
            }, [
              unref(_tmCollapseIconPos) == "left" ? (openBlock(), createElementBlock("view", {
                key: 0,
                class: "pr-16 flex-center"
              }, [
                createVNode(tmIcon, {
                  dark: props.dark,
                  followDark: props.followDark,
                  color: unref(isActive) ? props.activeColor : "grey-1",
                  name: unref(isActive) ? unref(_tmCollapseopenIcon) : unref(_tmCollapsecloseIcon),
                  "font-size": 20
                }, null, 8, ["dark", "followDark", "color", "name"])
              ])) : createCommentVNode("v-if", true),
              renderSlot(_ctx.$slots, "icon", {}, () => [
                unref(_leftIcon) ? (openBlock(), createElementBlock("view", {
                  key: 0,
                  class: "flex flex-center pr-16"
                }, [
                  createVNode(tmIcon, {
                    style: { "line-height": "0px" },
                    color: unref(_leftIconColor),
                    "font-size": 24,
                    name: unref(_leftIcon)
                  }, null, 8, ["color", "name"])
                ])) : createCommentVNode("v-if", true)
              ]),
              createElementVNode("view", {
                class: "flex flex-1",
                style: { "width": "0px" }
              }, [
                renderSlot(_ctx.$slots, "title", {
                  data: { isActive: unref(isActive) }
                }, () => [
                  createVNode(tmText, {
                    _class: "",
                    dark: props.dark,
                    followDark: props.followDark,
                    fontSize: props.titleSize,
                    color: unref(isActive) ? props.activeColor : "",
                    label: props.title
                  }, null, 8, ["dark", "followDark", "fontSize", "color", "label"])
                ])
              ]),
              renderSlot(_ctx.$slots, "rightLabel"),
              unref(_tmCollapseIconPos) == "right" ? (openBlock(), createElementBlock("view", {
                key: 1,
                class: "pl-16 flex-center"
              }, [
                createVNode(tmIcon, {
                  dark: props.dark,
                  followDark: props.followDark,
                  color: unref(isActive) ? props.activeColor : "grey-1",
                  name: unref(isActive) ? unref(_tmCollapseopenIcon) : unref(_tmCollapsecloseIcon),
                  "font-size": 20
                }, null, 8, ["dark", "followDark", "color", "name"])
              ])) : createCommentVNode("v-if", true)
            ], 4)
          ]),
          _: 3
        }, 8, ["transprent", "color", "text", "border", "linear", "linearDeep", "dark", "followDark", "followTheme", "margin", "padding"]),
        unref(isActive) ? (openBlock(), createElementBlock("view", {
          key: 0,
          class: "flex overflow"
        }, [
          createElementVNode("view", {
            class: normalizeClass(["flex content flex-col flex-1", [isActiveAfter.value ? "on" : ""]])
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 2)
        ])) : createCommentVNode("v-if", true)
      ], 2);
    };
  }
});
var tmCollapseItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-collapse-item/tm-collapse-item.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "collapse",
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
            createVNode(tmCollapse, { defaultActiveKey: ["2"] }, {
              default: withCtx(() => [
                createVNode(tmCollapseItem, {
                  title: "\u9762\u677F\u6807\u98981",
                  name: "1"
                }, {
                  default: withCtx(() => [
                    createElementVNode("view", { class: "pa-24" }, [
                      createVNode(tmText, {
                        "font-size": 28,
                        _class: "font-weight-b",
                        label: "\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F"
                      })
                    ])
                  ]),
                  _: 1
                }),
                createVNode(tmCollapseItem, {
                  title: "\u9762\u677F\u6807\u98982",
                  name: "2"
                }, {
                  default: withCtx(() => [
                    createElementVNode("view", { class: "pa-24" }, [
                      createVNode(tmText, {
                        "font-size": 28,
                        _class: "font-weight-b",
                        label: "\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F"
                      })
                    ])
                  ]),
                  _: 1
                }),
                createVNode(tmCollapseItem, {
                  "left-icon": "tmicon-check-circle-fill",
                  title: "\u9762\u677F\u6807\u98983\uFF0C\u5141\u8BB8\u5D4C\u5957\u4F7F\u7528\uFF0C\u5C55\u5F00\u5D4C\u5957\u9762\u677F",
                  name: "3"
                }, {
                  default: withCtx(() => [
                    createElementVNode("view", { class: "pa-24" }, [
                      createVNode(tmCollapse, {
                        iconPos: "right",
                        defaultActiveKey: ["1"]
                      }, {
                        default: withCtx(() => [
                          createVNode(tmCollapseItem, {
                            title: "\u9762\u677F\u6807\u98981",
                            name: "1"
                          }, {
                            default: withCtx(() => [
                              createVNode(tmText, {
                                "font-size": 28,
                                _class: "font-weight-b",
                                label: "\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F"
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(tmCollapseItem, {
                            "left-icon": "tmicon-times-circle",
                            "left-icon-color": "red",
                            title: "\u9762\u677F\u6807\u98982",
                            name: "2"
                          }, {
                            default: withCtx(() => [
                              createVNode(tmText, {
                                "font-size": 28,
                                _class: "font-weight-b",
                                label: "\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F"
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(tmCollapseItem, {
                            "left-icon": "tmicon-gem",
                            "left-icon-color": "green",
                            title: "\u9762\u677F\u6807\u98983",
                            name: "3"
                          }, {
                            default: withCtx(() => [
                              createVNode(tmText, {
                                "font-size": 28,
                                _class: "font-weight-b",
                                label: "\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F"
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(tmSheet, { color: "primary" }, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u53EA\u5141\u8BB8\u5355\u4E2A\u5C55\u5F00"
                })
              ]),
              _: 1
            }),
            createVNode(tmCollapse, {
              accordion: true,
              defaultActiveKey: ["1"]
            }, {
              default: withCtx(() => [
                createVNode(tmCollapseItem, {
                  title: "\u53EA\u80FD\u5C55\u5F00\u4E00\u4E2A1",
                  name: "1"
                }, {
                  default: withCtx(() => [
                    createElementVNode("view", { class: "pa-24" }, [
                      createVNode(tmText, {
                        "font-size": 28,
                        _class: "font-weight-b",
                        label: "\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F"
                      })
                    ])
                  ]),
                  _: 1
                }),
                createVNode(tmCollapseItem, {
                  color: "red",
                  linear: "bottom",
                  activeColor: "yellow",
                  title: "\u968F\u4FBF\u66F4\u6539\u80CC\u666F",
                  name: "2"
                }, {
                  default: withCtx(() => [
                    createElementVNode("view", { class: "pa-24" }, [
                      createVNode(tmText, {
                        "font-size": 28,
                        _class: "font-weight-b",
                        label: "\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F"
                      })
                    ])
                  ]),
                  _: 1
                }),
                createVNode(tmCollapseItem, {
                  title: "\u53EA\u80FD\u5C55\u5F00\u4E00\u4E2A3",
                  name: "3"
                }, {
                  default: withCtx(() => [
                    createElementVNode("view", { class: "pa-24" }, [
                      createVNode(tmText, {
                        "font-size": 28,
                        _class: "font-weight-b",
                        label: "\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F\u8FD9\u662F\u6298\u53E0\u9762\u677F"
                      })
                    ])
                  ]),
                  _: 1
                })
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
var collapse = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/collapse.nvue"]]);
export { collapse as default };
