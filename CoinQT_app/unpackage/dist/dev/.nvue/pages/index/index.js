import { defineComponent, ref, getCurrentInstance, resolveComponent, openBlock, createElementBlock, createVNode, withCtx, unref, createElementVNode } from "vue";
import { _ as _export_sfc, u as useTmpiniaStore, o as onLoad, t as tmApp, a as tmText } from "../../tm-text.js";
import { l as language, t as tmMessage } from "../../tm-message.js";
import { t as tmSheet } from "../../tm-sheet.js";
import { T as TmButton } from "../../tm-button.js";
import { t as tmFloatButton } from "../../tm-float-button.js";
import { t as tmInput } from "../../tm-input.js";
import { t as tmDivider } from "../../tm-divider.js";
import { t as tmIcon } from "../../tm-icon.js";
import { t as tmGrid, a as tmGridItem } from "../../tm-grid.js";
import { t as tmNavbar } from "../../tm-navbar.js";
import { t as tmCell } from "../../tm-cell.js";
import { t as tmImage } from "../../tm-image.js";
import { t as tmDrawer } from "../../tm-drawer.js";
import { l as logoimg } from "../../logo.js";
import "pinia";
import "../../tm-translate.js";
import "../../tm-overlay.js";
import "../../tm-badge.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    const store = useTmpiniaStore();
    const app = ref(null);
    const msg = ref(null);
    getCurrentInstance();
    const str = ref("");
    const showCustomColor = ref("#60ab41");
    const showCustomName = ref("darkGreen");
    const showCustom = ref(false);
    ref(20);
    function onChangeDark() {
      var _a;
      (_a = app.value) == null ? void 0 : _a.setDark();
    }
    function search() {
      var _a;
      if (str.value.trim() === "") {
        (_a = msg.value) == null ? void 0 : _a.show({
          model: "error",
          text: "\u4E0D\u80FD\u4E3A\u7A7A",
          mask: true
        });
        return;
      }
      uni.navigateTo({
        url: "search?key=" + str.value
      });
    }
    function seLocal() {
      if (language("language") == "English-US") {
        uni.setLocale("zh-Hans");
      } else {
        uni.setLocale("en");
      }
    }
    function setTheme(colorname) {
      var _a;
      (_a = app.value) == null ? void 0 : _a.setTheme(colorname);
    }
    function changeCustomColor() {
      var _a;
      if (!showCustomColor.value || !showCustomName.value) {
        (_a = msg.value) == null ? void 0 : _a.show({
          model: "error",
          text: "\u5FC5\u586B\u5185\u5BB9",
          mask: true
        });
        return;
      }
      showCustom.value = false;
      store.setTmVuetifyAddTheme(showCustomName.value, showCustomColor.value);
    }
    onLoad(() => {
    });
    return (_ctx, _cache) => {
      const _component_navigator = resolveComponent("navigator");
      return openBlock(), createElementBlock("scroll-view", {
        scrollY: true,
        showScrollbar: true,
        enableBackToTop: true,
        bubble: "true",
        style: { flexDirection: "column" }
      }, [
        createVNode(tmApp, {
          ref_key: "app",
          ref: app
        }, {
          default: withCtx(() => [
            createVNode(tmNavbar, {
              title: unref(language)("index.com.navtitle"),
              shadow: 0,
              "hide-home": ""
            }, {
              left: withCtx(() => [
                createElementVNode("view", { class: "flex flex-center flex-row" }, [
                  createVNode(_component_navigator, {
                    url: "settheme",
                    class: "pl-10 pr-12"
                  }, {
                    default: withCtx(() => [
                      createVNode(tmIcon, {
                        "font-size": 32,
                        name: "tmicon-cog-fill"
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(tmIcon, {
                    onClick: onChangeDark,
                    color: unref(store).tmStore.dark ? "yellow" : "",
                    _class: "pl-32",
                    "font-size": 42,
                    name: "tmicon-ios-sunny"
                  }, null, 8, ["color"])
                ])
              ]),
              _: 1
            }, 8, ["title"]),
            createVNode(tmSheet, {
              margin: [0, 0],
              followTheme: true
            }, {
              default: withCtx(() => [
                createElementVNode("view", { class: "flex-row flex-row-center-start pb-10" }, [
                  createVNode(tmImage, {
                    width: 108,
                    height: 67.5,
                    src: unref(logoimg)
                  }, null, 8, ["height", "src"]),
                  createElementVNode("view", {
                    class: "pl-16 flex-1",
                    style: { "width": "0px" }
                  }, [
                    createVNode(tmText, {
                      _class: "text-weight-b",
                      "font-size": 36,
                      label: "TMUI 3.0.78"
                    }),
                    createVNode(tmText, {
                      _class: "opacity-6",
                      label: unref(language)("index.search.subtext")
                    }, null, 8, ["label"])
                  ])
                ])
              ]),
              _: 1
            }),
            createVNode(tmSheet, { margin: [0, 0] }, {
              default: withCtx(() => [
                createVNode(tmInput, {
                  placeholder: unref(language)("index.search.tips"),
                  border: 1,
                  showClear: "",
                  prefix: "tmicon-search",
                  modelValue: str.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => str.value = $event),
                  onSearch: search,
                  searchLabel: unref(language)("index.search.btntext")
                }, null, 8, ["placeholder", "modelValue", "searchLabel"])
              ]),
              _: 1
            }),
            createElementVNode("view", { class: "mt-24" }),
            createVNode(tmSheet, {
              margin: [32, 0],
              round: 3
            }, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: unref(language)("index.com.themetext")
                }, null, 8, ["label"]),
                createVNode(tmDivider),
                createElementVNode("view", { class: "flex flex-row flex-around" }, [
                  createVNode(TmButton, {
                    width: 100,
                    color: "yellow",
                    size: "small",
                    onClick: _cache[1] || (_cache[1] = ($event) => setTheme("yellow")),
                    label: unref(language)("index.com.themeGreen")
                  }, null, 8, ["label"]),
                  createVNode(TmButton, {
                    width: 100,
                    color: "blue",
                    size: "small",
                    onClick: _cache[2] || (_cache[2] = ($event) => setTheme("blue")),
                    label: unref(language)("index.com.themeBlue")
                  }, null, 8, ["label"]),
                  createVNode(TmButton, {
                    width: 100,
                    color: "red",
                    size: "small",
                    onClick: _cache[3] || (_cache[3] = ($event) => setTheme("red")),
                    label: unref(language)("index.com.themeRed")
                  }, null, 8, ["label"]),
                  createVNode(TmButton, {
                    color: "brown",
                    shadow: 0,
                    width: 100,
                    size: "small",
                    onClick: _cache[4] || (_cache[4] = ($event) => showCustom.value = true),
                    label: unref(language)("index.com.themeCustText")
                  }, null, 8, ["label"]),
                  createVNode(TmButton, {
                    width: 160,
                    size: "small",
                    onClick: _cache[5] || (_cache[5] = ($event) => setTheme("")),
                    label: unref(language)("index.com.themeDefault")
                  }, null, 8, ["label"])
                ])
              ]),
              _: 1
            }),
            createElementVNode("u-input"),
            createVNode(tmSheet, {
              round: 3,
              margin: [32, 24]
            }, {
              default: withCtx(() => [
                createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: unref(language)("index.com.title")
                }, null, 8, ["label"]),
                createVNode(tmDivider),
                createVNode(tmGrid, {
                  col: 3,
                  width: 630
                }, {
                  default: withCtx(() => [
                    createVNode(tmGridItem, {
                      url: "../changyong/index",
                      height: 180,
                      count: 3,
                      color: "primary"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmIcon, {
                          color: "primary",
                          _class: "pb-10",
                          "font-size": 52,
                          name: "tmicon-layergroup-fill"
                        }),
                        createVNode(tmText, {
                          "font-size": 28,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.tongyong")
                        }, null, 8, ["label"]),
                        createVNode(tmText, {
                          color: "grey",
                          "font-size": 22,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.tongyongSub")
                        }, null, 8, ["label"])
                      ]),
                      _: 1
                    }),
                    createVNode(tmGridItem, {
                      url: "../layout/index",
                      height: 180
                    }, {
                      default: withCtx(() => [
                        createVNode(tmIcon, {
                          color: "blue",
                          _class: "pb-10",
                          "font-size": 52,
                          name: "tmicon-map-fill"
                        }),
                        createVNode(tmText, {
                          "font-size": 28,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.row")
                        }, null, 8, ["label"]),
                        createVNode(tmText, {
                          color: "grey",
                          "font-size": 22,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.rowSub")
                        }, null, 8, ["label"])
                      ]),
                      _: 1
                    }),
                    createVNode(tmGridItem, {
                      url: "../showdata/index",
                      height: 180
                    }, {
                      default: withCtx(() => [
                        createVNode(tmIcon, {
                          color: "pink",
                          _class: "pb-10",
                          "font-size": 52,
                          name: "tmicon-paperplane-fill"
                        }),
                        createVNode(tmText, {
                          "font-size": 28,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.show")
                        }, null, 8, ["label"]),
                        createVNode(tmText, {
                          color: "grey",
                          "font-size": 22,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.showSub")
                        }, null, 8, ["label"])
                      ]),
                      _: 1
                    }),
                    createVNode(tmGridItem, {
                      url: "../form/index",
                      height: 180,
                      dot: "",
                      color: "green"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmIcon, {
                          color: "orange",
                          _class: "pb-10",
                          "font-size": 52,
                          name: "tmicon-commentdots-fill"
                        }),
                        createVNode(tmText, {
                          "font-size": 28,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.form")
                        }, null, 8, ["label"]),
                        createVNode(tmText, {
                          color: "grey",
                          "font-size": 22,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.formSub")
                        }, null, 8, ["label"])
                      ]),
                      _: 1
                    }),
                    createVNode(tmGridItem, {
                      url: "../fankui/index",
                      height: 180,
                      count: "YES"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmIcon, {
                          color: "green",
                          _class: "pb-10",
                          "font-size": 52,
                          name: "tmicon-lightbulb-fill"
                        }),
                        createVNode(tmText, {
                          "font-size": 28,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.fd")
                        }, null, 8, ["label"]),
                        createVNode(tmText, {
                          color: "grey",
                          "font-size": 22,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.fdSub")
                        }, null, 8, ["label"])
                      ]),
                      _: 1
                    }),
                    createVNode(tmGridItem, {
                      url: "../daohang/index",
                      height: 180,
                      count: "NEW"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmIcon, {
                          color: "teal",
                          _class: "pb-10",
                          "font-size": 52,
                          name: "tmicon-flag-fill"
                        }),
                        createVNode(tmText, {
                          "font-size": 28,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.nav")
                        }, null, 8, ["label"]),
                        createVNode(tmText, {
                          color: "grey",
                          "font-size": 22,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.navSub")
                        }, null, 8, ["label"])
                      ]),
                      _: 1
                    }),
                    createVNode(tmGridItem, {
                      transprent: false,
                      "bg-color": "red",
                      text: "",
                      url: "../yewu/index",
                      height: 180,
                      count: "HOT",
                      color: "orange"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmIcon, {
                          color: "red",
                          _class: "pb-10",
                          "font-size": 52,
                          name: "tmicon-box-fill"
                        }),
                        createVNode(tmText, {
                          "font-size": 28,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.yewu")
                        }, null, 8, ["label"]),
                        createVNode(tmText, {
                          color: "grey",
                          "font-size": 22,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.yewuSub")
                        }, null, 8, ["label"])
                      ]),
                      _: 1
                    }),
                    createVNode(tmGridItem, {
                      url: "../other/index",
                      height: 180
                    }, {
                      default: withCtx(() => [
                        createVNode(tmIcon, {
                          color: "cyan",
                          _class: "pb-10",
                          "font-size": 52,
                          name: "tmicon-smile-fill"
                        }),
                        createVNode(tmText, {
                          "font-size": 28,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.other")
                        }, null, 8, ["label"]),
                        createVNode(tmText, {
                          color: "grey",
                          "font-size": 22,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.otherSub")
                        }, null, 8, ["label"])
                      ]),
                      _: 1
                    }),
                    createVNode(tmGridItem, {
                      text: "",
                      url: "../chart/index",
                      height: 180,
                      count: "CHAR"
                    }, {
                      default: withCtx(() => [
                        createVNode(tmIcon, {
                          color: "blue-grey",
                          _class: "pb-10",
                          "font-size": 52,
                          name: "tmicon-borderbottom-fill"
                        }),
                        createVNode(tmText, {
                          "font-size": 28,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.tubiao")
                        }, null, 8, ["label"]),
                        createVNode(tmText, {
                          color: "grey",
                          "font-size": 22,
                          _class: "font-weight-b",
                          label: unref(language)("index.com.tubiaoSub")
                        }, null, 8, ["label"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(tmCell, {
              url: "../wxaccount/user",
              margin: [32, 16],
              showAvatar: "",
              round: 3,
              titleFontSize: 30,
              title: unref(language)("index.com.love"),
              label: "\u53EF\u767B\u5F55\u6A21\u677F\u5E02\u573A",
              rightText: unref(language)("index.com.loveSub")
            }, {
              avatar: withCtx(() => [
                createVNode(tmIcon, {
                  color: "orange",
                  "font-size": 38,
                  name: "tmicon-heart-fill"
                })
              ]),
              _: 1
            }, 8, ["title", "rightText"]),
            createVNode(tmCell, {
              onClick: seLocal,
              showAvatar: "",
              round: 3,
              titleFontSize: 30,
              title: unref(language)("index.com.setLocal"),
              rightText: unref(language)("language")
            }, {
              avatar: withCtx(() => [
                createVNode(tmIcon, {
                  color: "primary",
                  "font-size": 38,
                  name: "tmicon-resource"
                })
              ]),
              _: 1
            }, 8, ["title", "rightText"]),
            createElementVNode("view", { class: "py-32 mx-32" }, [
              createVNode(tmDivider, {
                color: "grey-2",
                label: unref(language)("index.com.bottom")
              }, null, 8, ["label"])
            ]),
            createVNode(tmFloatButton, {
              onClick: onChangeDark,
              btn: { icon: "tmicon-ios-sunny", color: "pink", linear: "right" }
            }),
            createVNode(tmMessage, {
              ref_key: "msg",
              ref: msg
            }, null, 512),
            createVNode(tmDrawer, {
              show: showCustom.value,
              "onUpdate:show": _cache[8] || (_cache[8] = ($event) => showCustom.value = $event),
              placement: "center",
              hideHeader: "",
              height: 450,
              width: 600
            }, {
              default: withCtx(() => [
                createElementVNode("view", { class: "pa-32 flex flex-col" }, [
                  createElementVNode("view", { class: "text-align-center py-24" }, [
                    createVNode(tmText, {
                      _class: "text-weight-b",
                      "font-size": 32,
                      label: "\u81EA\u5B9A\u4E49\u4E3B\u9898"
                    })
                  ]),
                  createVNode(tmInput, {
                    prefixLabel: "\u989C\u8272\u503C",
                    placeholder: "\u8BF7\u8F93\u5165\u989C\u8272\u503C,\u6BD4\u5982:#FF00FF",
                    border: 1,
                    showClear: "",
                    modelValue: showCustomColor.value,
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => showCustomColor.value = $event)
                  }, null, 8, ["modelValue"]),
                  createVNode(tmInput, {
                    prefixLabel: "\u989C\u8272\u540D\u79F0",
                    margin: [0, 24],
                    placeholder: "\u5B57\u6BCD,\u5982:darkGreen",
                    border: 1,
                    showClear: "",
                    modelValue: showCustomName.value,
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => showCustomName.value = $event)
                  }, null, 8, ["modelValue"]),
                  createVNode(TmButton, {
                    onClick: changeCustomColor,
                    block: "",
                    label: "\u786E\u8BA4\u5207\u6362"
                  })
                ])
              ]),
              _: 1
            }, 8, ["show"])
          ]),
          _: 1
        }, 512)
      ]);
    };
  }
});
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/pages/index/index.nvue"]]);
export { index as default };
