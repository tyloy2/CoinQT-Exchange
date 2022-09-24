import { defineComponent, getCurrentInstance, computed, onMounted, nextTick, openBlock, createElementBlock, normalizeClass, normalizeStyle, unref, Fragment, renderList, createVNode, createElementVNode, createCommentVNode, ref, withCtx } from "vue";
import { _ as _export_sfc, u as useTmpiniaStore, r as requireNativePlugin, e as computedDark, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "tm-skeleton-line",
  props: {
    height: {
      type: Number,
      default: 60
    },
    dark: {
      type: [Boolean, String],
      default: false
    },
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    followDark: {
      type: [Boolean, String],
      default: true
    },
    round: {
      type: Number,
      default: 4
    }
  },
  setup(__props) {
    var _a, _b;
    const props = __props;
    const store = useTmpiniaStore();
    const animation = requireNativePlugin("animation");
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const tmcfg = computed(() => store.tmStore);
    const isDark = computed(() => computedDark(props, tmcfg.value));
    onMounted(() => {
      try {
        nextTick(function() {
          setTimeout(function() {
            spinNvueAni();
          }, 50);
        });
      } catch (e) {
      }
    });
    function spinNvueAni(opacity = 0) {
      var _a2;
      let icon = (_a2 = proxy == null ? void 0 : proxy.$refs) == null ? void 0 : _a2.dombg;
      if (!icon)
        return;
      animation.transition(icon, {
        styles: {
          opacity
        },
        duration: 1e3,
        timingFunction: "linear",
        delay: 0
      }, () => {
        nextTick(function() {
          spinNvueAni(opacity == 0 ? 1 : 0);
        });
      });
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        ref: "dombg",
        class: normalizeClass(["tmSkeletonLine flex-12 my-10", [`round-${props.round}`]]),
        style: normalizeStyle([
          { backgroundColor: unref(isDark) ? "#1e1e1e" : "#ebebeb" },
          { paddingTop: props.height / 2 + "rpx", paddingBottom: props.height / 2 + "rpx" }
        ]),
        renderWhole: true
      }, null, 6);
    };
  }
});
var tmSkeletonLine = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-skeleton-line/tm-skeleton-line.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-skeleton",
  props: {
    height: {
      type: Number,
      default: 60
    },
    rows: {
      type: Number,
      default: 3
    },
    model: {
      type: String,
      default: "line"
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-col",
        renderWhole: true
      }, [
        props.model == "line" ? (openBlock(), createElementBlock("view", {
          key: 0,
          class: "ma-32"
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(props.rows, (item) => {
            return openBlock(), createElementBlock("view", {
              key: item,
              class: "flex flex-col"
            }, [
              createVNode(tmSkeletonLine, {
                height: props.height
              }, null, 8, ["height"])
            ]);
          }), 128)),
          createElementVNode("view", { class: "flex flex-row" }, [
            createElementVNode("view", { class: "flex-2" }, [
              createVNode(tmSkeletonLine, {
                height: props.height * 2
              }, null, 8, ["height"])
            ]),
            createElementVNode("view", { class: "flex-2 mx-24" }, [
              createVNode(tmSkeletonLine, {
                height: props.height * 2
              }, null, 8, ["height"])
            ]),
            createElementVNode("view", { class: "flex-2 mr-24" }, [
              createVNode(tmSkeletonLine, {
                height: props.height * 2
              }, null, 8, ["height"])
            ]),
            createElementVNode("view", { class: "flex-4" }, [
              createVNode(tmSkeletonLine, {
                height: props.height * 2
              }, null, 8, ["height"])
            ])
          ])
        ])) : createCommentVNode("v-if", true),
        props.model == "rect" ? (openBlock(), createElementBlock("view", {
          key: 1,
          class: "ma-32"
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(props.rows, (item) => {
            return openBlock(), createElementBlock("view", {
              key: item,
              class: "flex flex-row"
            }, [
              createElementVNode("view", { class: "flex-2" }, [
                createVNode(tmSkeletonLine, {
                  height: props.height * 2
                }, null, 8, ["height"])
              ]),
              createElementVNode("view", { class: "flex-4 mx-24" }, [
                createVNode(tmSkeletonLine, {
                  height: props.height * 2
                }, null, 8, ["height"])
              ]),
              createElementVNode("view", { class: "flex-2 mr-24" }, [
                createVNode(tmSkeletonLine, {
                  height: props.height * 2
                }, null, 8, ["height"])
              ]),
              createElementVNode("view", { class: "flex-2" }, [
                createVNode(tmSkeletonLine, {
                  height: props.height * 2
                }, null, 8, ["height"])
              ])
            ]);
          }), 128))
        ])) : createCommentVNode("v-if", true),
        props.model == "card" ? (openBlock(), createElementBlock("view", {
          key: 2,
          class: "ma-32"
        }, [
          createElementVNode("view", { class: "flex flex-row" }, [
            createElementVNode("view", { class: "flex-1" }, [
              createVNode(tmSkeletonLine, {
                height: props.height
              }, null, 8, ["height"])
            ]),
            createElementVNode("view", { class: "flex-10 mx-24" }, [
              createVNode(tmSkeletonLine, {
                height: props.height
              }, null, 8, ["height"])
            ]),
            createElementVNode("view", { class: "flex-1" }, [
              createVNode(tmSkeletonLine, {
                height: props.height
              }, null, 8, ["height"])
            ])
          ]),
          createElementVNode("view", { class: "" }, [
            createVNode(tmSkeletonLine, {
              height: props.height * 4
            }, null, 8, ["height"])
          ]),
          createElementVNode("view", { class: "flex flex-row" }, [
            createElementVNode("view", { class: "flex-2" }, [
              createVNode(tmSkeletonLine, {
                height: props.height
              }, null, 8, ["height"])
            ]),
            createElementVNode("view", { class: "flex-4 mx-24" }, [
              createVNode(tmSkeletonLine, {
                height: props.height
              }, null, 8, ["height"])
            ]),
            createElementVNode("view", { class: "flex-2 mr-24" }, [
              createVNode(tmSkeletonLine, {
                height: props.height
              }, null, 8, ["height"])
            ]),
            createElementVNode("view", { class: "flex-2" }, [
              createVNode(tmSkeletonLine, {
                height: props.height
              }, null, 8, ["height"])
            ])
          ])
        ])) : createCommentVNode("v-if", true),
        props.model == "chat" ? (openBlock(), createElementBlock("view", {
          key: 3,
          class: "flex flex-row ma-32"
        }, [
          createElementVNode("view", {
            class: "flex-2",
            style: normalizeStyle([{ height: props.height * 2 + "rpx" }])
          }, [
            createVNode(tmSkeletonLine, {
              height: props.height * 2
            }, null, 8, ["height"])
          ], 4),
          createElementVNode("view", { class: "flex-8 mx-24" }, [
            createVNode(tmSkeletonLine, {
              height: props.height
            }, null, 8, ["height"]),
            createVNode(tmSkeletonLine, {
              height: props.height
            }, null, 8, ["height"]),
            createVNode(tmSkeletonLine, {
              height: props.height
            }, null, 8, ["height"]),
            createVNode(tmSkeletonLine, {
              height: props.height
            }, null, 8, ["height"])
          ])
        ])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var tmSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-skeleton/tm-skeleton.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "skeleton",
  setup(__props) {
    getCurrentInstance();
    ref(true);
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
                createVNode(tmSkeleton)
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  fontSize: 24,
                  _class: "font-weight-b",
                  label: "\u7C7B\u578B\u5206\u4E3A\uFF1Aline ,rect,card,chat,"
                }),
                createVNode(tmDivider),
                createVNode(tmSkeleton, { model: "chat" })
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  fontSize: 24,
                  _class: "font-weight-b",
                  label: "\u4E5F\u53EF\u4EE5\u81EA\u5B9A\u4E49\u9AA8\u67B6\u5E03\u5C40"
                }),
                createVNode(tmDivider),
                createVNode(tmSkeletonLine, { height: 50 }),
                createVNode(tmSkeletonLine, { height: 50 }),
                createElementVNode("view", { style: { "width": "300rpx" } }, [
                  createVNode(tmSkeletonLine, { height: 50 })
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
var skeleton = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/fankui/skeleton.nvue"]]);
export { skeleton as default };
