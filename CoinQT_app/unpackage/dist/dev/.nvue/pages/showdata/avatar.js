import { defineComponent, openBlock, createElementBlock, createVNode, withCtx, createElementVNode } from "vue";
import { _ as _export_sfc, t as tmApp, a as tmText } from "../../tm-text.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { t as tmAvatar } from "../../tm-avatar.js";
import { t as tmBadge } from "../../tm-badge.js";
import { t as tmDivider } from "../../tm-divider.js";
import "pinia";
import "../../tm-icon.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "avatar",
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
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u57FA\u7840\u793A\u4F8B"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex flex-row" }, [
                  createVNode(tmAvatar, { img: "https://picsum.photos/200/300" }),
                  createVNode(tmAvatar, {
                    "font-size": 42,
                    margin: [10, 0],
                    icon: "tmicon-QQ"
                  }),
                  createVNode(tmAvatar, {
                    "font-size": 42,
                    round: 12,
                    color: "pink",
                    linear: "top",
                    icon: "tmicon-QQ"
                  }),
                  createVNode(tmAvatar, {
                    trigger: "",
                    triggerIcon: "tmicon-check",
                    round: 12,
                    text: "",
                    margin: [10, 0],
                    label: "QQ"
                  }),
                  createVNode(tmAvatar, {
                    color: "orange",
                    trigger: "",
                    triggerColor: "red",
                    triggerIcon: "tmicon-check",
                    round: 4,
                    text: "",
                    margin: [10, 0],
                    img: "https://picsum.photos/200/300?id=99"
                  })
                ])
              ]),
              _: 1
            }),
            createVNode(tmSheet, null, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u66F4\u591A\u81EA\u5B9A\u4E49\u5C5E\u6027"
                }),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex flex-row" }, [
                  createVNode(tmBadge, {
                    count: "5",
                    color: "orange"
                  }, {
                    default: withCtx(() => [
                      createVNode(tmAvatar, {
                        color: "green",
                        "font-size": 42,
                        margin: [10, 0],
                        icon: "tmicon-QQ"
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(tmAvatar, {
                    outlined: "",
                    round: 12,
                    "font-size": 52,
                    color: "pink",
                    icon: "tmicon-weixin"
                  }),
                  createVNode(tmAvatar, {
                    round: 12,
                    text: "",
                    margin: [10, 0],
                    label: "\u738B"
                  }),
                  createVNode(tmAvatar, {
                    outlined: "",
                    text: "",
                    color: "grey",
                    round: 12,
                    margin: [10, 0],
                    label: "\u738B"
                  })
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
var avatar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/showdata/avatar.nvue"]]);
export { avatar as default };
