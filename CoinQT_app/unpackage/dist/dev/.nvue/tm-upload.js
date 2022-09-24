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
import { defineComponent, getCurrentInstance, computed, ref, watch, toRaw, inject, openBlock, createElementBlock, createElementVNode, normalizeStyle, Fragment, renderList, unref, createVNode, withCtx, normalizeClass, createBlock, createCommentVNode, renderSlot } from "vue";
import { g as formatAppLog, _ as _export_sfc, a as tmText } from "./tm-text.js";
import { t as tmImage } from "./tm-image.js";
import { t as tmIcon } from "./tm-icon.js";
import { t as tmSheet } from "./tm-sheet.js";
var statusCode = /* @__PURE__ */ ((statusCode2) => {
  statusCode2[statusCode2["upload"] = 0] = "upload";
  statusCode2[statusCode2["uploading"] = 1] = "uploading";
  statusCode2[statusCode2["fail"] = 2] = "fail";
  statusCode2[statusCode2["success"] = 3] = "success";
  statusCode2[statusCode2["max"] = 4] = "max";
  return statusCode2;
})(statusCode || {});
function getUid(length = 3) {
  return Number(Number(Math.random().toString().substr(3, length) + Date.now()).toString(8));
}
class uploadfile {
  constructor(config) {
    var _a;
    this.filelist = [];
    this.isStop = false;
    this.index = 0;
    this.config = {};
    let cf = { maxSize: 10 * 1024 * 1024, maxFile: 9, fileType: ["album", "camera"], fileList: [], autoUpload: true, header: {}, formData: {} };
    cf = __spreadValues(__spreadValues({}, cf), (_a = arguments[0]) != null ? _a : {});
    this.config = cf;
    this.addFile(cf.fileList);
    delete this.config.fileList;
  }
  async beforeChooesefile() {
    return true;
  }
  async chooesefileAfter(fileList) {
    return fileList;
  }
  async chooesefileSuccess(fileList) {
    return fileList;
  }
  delete(item) {
    let index = this.filelist.findIndex((el) => el.uid == item.uid);
    if (index > -1) {
      let p = [...this.filelist];
      p.splice(index, 1);
      this.filelist = [...p];
    }
    return this.filelist;
  }
  setFileStatus(item) {
    let index = this.filelist.findIndex((el) => el.uid == item.uid);
    if (index > -1) {
      let p = [...this.filelist];
      p.splice(index, 1, item);
      this.filelist = [...p];
    }
  }
  async chooesefile() {
    let t = this;
    return new Promise(async (rs, rj) => {
      let isready = await t.beforeChooesefile();
      if (!isready) {
        rs([]);
        return;
      }
      uni.chooseImage({
        count: t.config.maxFile,
        sourceType: t.config.fileType,
        fail: (e) => {
          rj("\u53D6\u6D88\u9009\u62E9");
        },
        success: async (res) => {
          if (res.tempFilePaths.length == 0) {
            rj("\u672A\u9009\u62E9");
            return;
          }
          let imgarray = res.tempFilePaths;
          let fielist = res.tempFiles;
          let jgsk = [];
          imgarray.forEach((item, index) => {
            var _a;
            let isMaxsize = fielist[index].size > t.config.maxSize ? true : false;
            jgsk.push({
              url: item,
              status: isMaxsize ? "\u8D85\u8FC7\u5927\u5C0F" : "\u5F85\u4E0A\u4F20",
              progress: isMaxsize ? 100 : 0,
              uid: getUid(),
              statusCode: isMaxsize ? 4 : 0,
              response: null,
              name: (_a = fielist[index].name) != null ? _a : ""
            });
          });
          let isreadyChoose = await t.chooesefileAfter(jgsk);
          if (!Array.isArray(isreadyChoose) || typeof isreadyChoose != "object") {
            rj("chooesefileAfter:\u51FD\u6570\u8FC7\u6EE4\uFF0C\u6CA1\u6709\u8FD4\u56DE\u6587\u4EF6\u5217\u8868\u3002");
            return;
          }
          t.filelist.push(...isreadyChoose);
          t.chooesefileSuccess(isreadyChoose);
          rs(isreadyChoose);
          if (t.config.autoUpload) {
            setTimeout(function() {
              t.start();
            }, 500);
          }
        }
      });
    });
  }
  async chooseMPH5weixinFile() {
    let t = this;
    return new Promise((rs, rj) => {
      var _a;
      var fs = uni.chooseFile;
      var config = {
        count: t.config.maxfile,
        type: t.config.type,
        extension: t.config.extension
      };
      if (!t.config.extension || !Array.isArray(t.config.extension) || ((_a = t.config.extension) == null ? void 0 : _a.length) == 0) {
        delete config.extension;
      }
      fs(__spreadProps(__spreadValues({}, config), {
        fail: (e) => {
          formatAppLog("error", "at tmui/components/tm-upload/upload.ts:186", e);
          uni.$tm.toast("\u5DF2\u53D6\u6D88\u9009\u62E9");
          rj(e);
        },
        success: (res) => {
          if (res.tempFiles.length == 0) {
            uni.$tm.toast("\u672A\u9009\u62E9");
            return;
          }
          let fielist = res.tempFiles;
          let jgsk = [];
          fielist.forEach((item, index) => {
            let isMaxsize = fielist[index].size > t.config.maxsize ? true : false;
            let ftype = item.name || "";
            if (ftype) {
              ftype = ftype.substr(ftype.lastIndexOf(".") + 1).toLocaleLowerCase();
            }
            jgsk.push({
              url: item.path,
              name: item.name || "\u9ED8\u8BA4\u6587\u4EF6\u540D\u79F0",
              type: ftype,
              status: isMaxsize ? "\u8D85\u8FC7\u5927\u5C0F" : "\u5F85\u4E0A\u4F20",
              progress: isMaxsize ? 100 : 0,
              fileId: guid(),
              statusCode: isMaxsize ? 4 : 0,
              data: null
            });
          });
          t.filelist.push(...jgsk);
          t.selected(t.filelist);
          if (t.config.isAuto) {
            t.start();
          }
          rs(t.filelist);
        }
      }));
    });
  }
  setConfig(config) {
    this.config = __spreadValues(__spreadValues({}, this.config), config != null ? config : {});
  }
  addFile(filelist = []) {
    if (typeof filelist !== "object" && !Array.isArray(filelist))
      return;
    let total_uid = new Set(this.filelist.map((e) => e.uid));
    let total_url = new Set(this.filelist.map((e) => e.url));
    let cfilelist = filelist.map((el) => {
      var _a, _b, _c, _d, _e, _f, _g;
      return __spreadProps(__spreadValues({}, el), {
        status: (_a = el == null ? void 0 : el.status) != null ? _a : "\u5F85\u4E0A\u4F20",
        statusCode: (_b = el == null ? void 0 : el.statusCode) != null ? _b : 0,
        uid: (_c = el == null ? void 0 : el.uid) != null ? _c : getUid(),
        progress: (_d = el == null ? void 0 : el.progress) != null ? _d : 0,
        name: (_e = el == null ? void 0 : el.name) != null ? _e : "",
        response: (_f = el == null ? void 0 : el.response) != null ? _f : null,
        url: (_g = el == null ? void 0 : el.url) != null ? _g : ""
      });
    });
    let filterFIle = cfilelist.filter((item) => !total_uid.has(item.uid) && !total_url.has(item.url));
    this.filelist.push(...filterFIle);
  }
  async beforeSuccess(item) {
    return true;
  }
  async beforeStart(item) {
    return true;
  }
  progress(item) {
  }
  fail(item) {
  }
  success(item, fileList) {
  }
  complete(filelist) {
  }
  uploadComplete(filelist) {
  }
  async start() {
    if (this.filelist.length <= 0) {
      formatAppLog("error", "at tmui/components/tm-upload/upload.ts:272", "\u672A\u9009\u62E9\u56FE\u7247,\u5DF2\u53D6\u6D88\u4E0A\u4F20");
      return;
    }
    let t = this;
    this.index = 0;
    this.isStop = false;
    async function startupload() {
      var _a, _b;
      if (t.isStop)
        return;
      let item = t.filelist[t.index];
      let canbleStart = await t.beforeStart(item);
      if (!canbleStart) {
        item.statusCode = 2;
        item.status = "\u4E0D\u5141\u8BB8\u4E0A\u4F20";
        t.filelist.splice(t.index, 1, item);
        t.index++;
        startupload();
        return;
      }
      if (!item || typeof item === "undefined") {
        t.uploadComplete(t.filelist);
        return;
      }
      if (item.statusCode == 3 || item.statusCode == 1 || item.statusCode == 4) {
        t.index++;
        startupload();
        return;
      }
      item.statusCode = 1;
      item.status = "\u4E0A\u4F20\u4E2D...";
      t.setFileStatus(item);
      const upObj = uni.uploadFile({
        url: String(t.config.hostUrl),
        name: "file",
        header: (_b = (_a = t.config) == null ? void 0 : _a.header) != null ? _b : {},
        filePath: item.url,
        formData: __spreadValues({ name: item.name }, t.config.formData),
        success: (res) => {
          if (res.statusCode != 200) {
            item.statusCode = 2;
            item.status = "\u4E0A\u4F20\u5931\u8D25";
            t.fail(item);
            t.setFileStatus(item);
            t.index++;
            return;
          }
          item.response = res.data;
          let isOksuccess = t.beforeSuccess(item);
          if (!isOksuccess) {
            item.statusCode = 2;
            item.status = "\u4E0A\u4F20\u5931\u8D25";
            t.fail(item);
            t.setFileStatus(item);
            t.index++;
            return;
          }
          item.statusCode = 3;
          item.status = "\u4E0A\u4F20\u6210\u529F";
          t.setFileStatus(item);
          t.success(item, t.filelist);
          t.index++;
        },
        fail: (res) => {
          item.statusCode = 2;
          item.status = "\u4E0A\u4F20\u5931\u8D25";
          t.setFileStatus(item);
          t.fail(item);
          t.index++;
        },
        complete: (res) => {
          t.complete(item);
          startupload();
        }
      });
      if (upObj) {
        let item2 = t.filelist[t.index];
        upObj.onProgressUpdate((res) => {
          item2.progress = res.progress;
          if (item2.progress >= 100) {
            item2.status = "\u4E0A\u4F20\u6210\u529F";
            item2.statusCode = 3;
          } else {
            item2.statusCode = 1;
            item2.status = "\u4E0A\u4F20\u4E2D...";
          }
          t.setFileStatus(item2);
          t.progress(item2);
        });
      }
    }
    await startupload();
  }
  stop() {
    this.isStop = true;
  }
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-upload",
  props: {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    width: {
      type: Number,
      default: 700
    },
    rows: {
      type: Number,
      default: 5
    },
    imageHeight: {
      type: Number,
      default: 140
    },
    defaultValue: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    color: {
      type: String,
      default: "primary"
    },
    header: {
      type: Object,
      default: () => {
      }
    },
    formData: {
      type: Object,
      default: () => {
      }
    },
    maxFile: {
      type: Number,
      default: 9
    },
    maxSize: {
      type: Number,
      default: 10 * 1024 * 1024
    },
    url: {
      type: String,
      default: "",
      required: true
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    onRemove: {
      type: [Function, Boolean],
      default: () => {
        return (item) => true;
      }
    },
    onStart: {
      type: [Function, Boolean],
      default: () => {
        return (item) => true;
      }
    },
    onSuccessAfter: {
      type: [Function, Boolean],
      default: () => {
        return (item) => true;
      }
    },
    beforeChooese: {
      type: [Function, Boolean],
      default: () => {
        return (item) => true;
      }
    }
  },
  emits: ["success", "fail", "complete", "change", "remove", "uploadComplete", "update:modelValue"],
  setup(__props, { expose, emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const itemWidth = computed(() => {
      return props.width / props.rows;
    });
    const itemHeight = computed(() => {
      return props.imageHeight;
    });
    const _filelist = ref([]);
    const _disabledAdd = computed(() => {
      return props.disabled || _filelist.value.length >= props.maxFile;
    });
    const _uploadObj = new uploadfile({ hostUrl: props.url, autoUpload: props.autoUpload, fileList: addSuccess(props.defaultValue), header: props.header, formData: props.formData, maxFile: props.maxFile, maxSize: props.maxSize });
    _filelist.value = [..._uploadObj.filelist];
    emits("update:modelValue", _filelist.value);
    watch([() => props.header, () => props.maxFile, () => props.maxSize, () => props.formData], () => {
      _uploadObj.setConfig({ hostUrl: props.url, header: props.header, formData: props.formData, maxFile: props.maxFile, maxSize: props.maxSize });
    }, { deep: true });
    function addSuccess(fileList = []) {
      fileList = toRaw(fileList);
      let fl = fileList.map((e) => {
        let _itemfile = { url: "" };
        if (typeof e == "string") {
          _itemfile.url = e;
        } else {
          _itemfile = __spreadValues({}, e);
        }
        _itemfile = __spreadProps(__spreadValues({}, _itemfile), { statusCode: statusCode.success, status: "\u4E0A\u4F20\u6210\u529F", progress: 100 });
        return _itemfile;
      });
      return fl;
    }
    _uploadObj.beforeChooesefile = async function() {
      _uploadObj.setConfig({ maxFile: props.maxFile - _filelist.value.length });
      if (typeof props.beforeChooese === "function") {
        let p = await props.beforeChooese();
        if (typeof p === "function") {
          p = await p();
        }
        if (!p)
          return false;
      }
      return true;
    };
    _uploadObj.beforeSuccess = async function(item) {
      if (typeof props.onSuccessAfter === "function") {
        let p = await props.onSuccessAfter(item);
        if (typeof p === "function") {
          p = await p(item);
        }
        if (!p)
          return false;
      }
      return true;
    };
    _uploadObj.beforeStart = async function(item) {
      if (typeof props.onStart === "function") {
        let p = await props.onStart(item);
        if (typeof p === "function") {
          p = await p(item);
        }
        if (!p)
          return false;
      }
      return true;
    };
    _uploadObj.complete = function(item) {
      _filelist.value = [..._uploadObj.filelist];
      emits("complete", toRaw(item), toRaw(_filelist.value));
      emits("update:modelValue", _filelist.value);
      pushFormItem(true);
    };
    watch(() => props.modelValue, () => {
      let fl = Array.isArray(props.modelValue) ? props.modelValue : [];
      if (fl.length == 0) {
        _filelist.value = [];
        _uploadObj.filelist = [];
      } else {
        _uploadObj.addFile(addSuccess(fl));
        _filelist.value = [..._uploadObj.filelist];
      }
    });
    _uploadObj.uploadComplete = function(filelist) {
      emits("uploadComplete", filelist);
    };
    _uploadObj.success = function(item, fileList) {
      let index = _filelist.value.findIndex((el) => el.uid == item.uid);
      if (index > -1) {
        _filelist.value.splice(index, 1, item);
        emits("success", toRaw(item), toRaw(_filelist.value));
        emits("change", toRaw(_filelist.value));
      }
    };
    _uploadObj.fail = function(item) {
      let index = _filelist.value.findIndex((el) => el.uid == item.uid);
      if (index > -1) {
        _filelist.value.splice(index, 1, item);
        emits("fail", toRaw(item), toRaw(_filelist.value));
        emits("change", toRaw(_filelist.value));
      }
    };
    function chooseFile() {
      _uploadObj.chooesefile().then((fileList) => {
        _filelist.value.push(...fileList);
        emits("update:modelValue", _filelist.value);
      });
    }
    async function deletedFile(item) {
      if (typeof props.onRemove === "function") {
        let p = await props.onRemove(item);
        if (typeof p === "function") {
          p = await p(item);
        }
        if (!p)
          return false;
      }
      const delfilelist = _uploadObj.delete(item);
      _filelist.value = [...delfilelist];
      emits("remove", toRaw(item));
      emits("update:modelValue", _filelist.value);
      emits("change", toRaw(_filelist.value));
      pushFormItem();
    }
    function clear() {
      _uploadObj.filelist = [];
      _filelist.value = [];
      emits("update:modelValue", []);
      pushFormItem();
    }
    function del(fileId) {
      let index = _uploadObj.filelist.findIndex((el) => el.uid == fileId);
      if (index > -1) {
        const item = _uploadObj.filelist[index];
        const delfilelist = _uploadObj.delete(item);
        _filelist.value = [...delfilelist];
        emits("remove", toRaw(item));
        emits("update:modelValue", _filelist.value);
        emits("change", toRaw(_filelist.value));
        pushFormItem();
      }
    }
    function getFailList() {
      return _uploadObj.filelist.filter((el) => el.statusCode != statusCode.fail && el.statusCode != statusCode.max);
    }
    function clearFail() {
      const list = _uploadObj.filelist.filter((el) => el.statusCode != statusCode.fail && el.statusCode != statusCode.max);
      _uploadObj.filelist = list;
      _filelist.value = [...list];
      emits("update:modelValue", _filelist.value);
    }
    expose({
      start: () => {
        _uploadObj.start();
      },
      stop: () => {
        _uploadObj.stop();
      },
      clear,
      del,
      getFailList,
      clearFail
    });
    const rulesObj = inject("tmFormItemRules", computed(() => {
      return [
        {
          message: "\u8BF7\u9009\u62E9\u56FE\u7247\u4E0A\u4F20",
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
        parentFormItem = (_c = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c : void 0;
      }
    }
    const validate = (rules) => {
      let successFile = _filelist.value.filter((el) => el.statusCode === 3);
      rules = rules.map((el) => {
        if (typeof el.validator === "function" && el.required === true) {
          return el;
        } else if (typeof el.validator === "boolean" && el.required === true) {
          return __spreadProps(__spreadValues({}, el), {
            validator: (val) => {
              return val.length == 0 ? false : true;
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
            let vr = await el.validator(successFile);
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
          let successFile = _filelist.value.filter((el) => el.statusCode === 3);
          validate(toRaw(rulesObj.value)).then((ev) => {
            parentFormItem.pushCom({
              value: successFile,
              isRequiredError: false,
              componentsName: "tm-rate",
              message: ev.length == 0 ? "" : ev[0].message
            });
          }).catch((er) => {
            parentFormItem.pushCom({
              value: successFile,
              isRequiredError: true,
              componentsName: "tm-rate",
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
        _filelist.value = [];
        _uploadObj.filelist = [];
        emits("update:modelValue", []);
        pushFormItem(false);
      }
      if (tmFormFun.value == "validate") {
        pushFormItem(true);
      }
      if (tmFormFun.value == "clearValidate") {
        pushFormItem(false);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-col flex-col-top-start",
        renderWhole: true
      }, [
        createElementVNode("view", {
          class: "flex flex-row flex-row-top-start",
          style: normalizeStyle([{ "flex-wrap": "wrap" }, { width: __props.width + "rpx" }])
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_filelist.value, (item, index) => {
            return openBlock(), createElementBlock("view", {
              class: "ma-5",
              key: index,
              style: normalizeStyle({ width: unref(itemWidth) - 10 + "rpx" })
            }, [
              createVNode(tmSheet, {
                round: 2,
                color: "primary",
                text: "",
                transprent: true,
                padding: [0, 0],
                margin: [0, 0],
                class: ""
              }, {
                default: withCtx(() => [
                  createVNode(tmImage, {
                    round: 2,
                    allowDelete: false,
                    onDelete: ($event) => deletedFile(item),
                    extra: "",
                    delete: "",
                    src: item.url,
                    width: unref(itemWidth) - 10,
                    height: unref(itemHeight) - 10
                  }, {
                    extra: withCtx(() => [
                      createElementVNode("view", {
                        style: normalizeStyle({ background: "rgba(0, 0, 0, 0.7)", width: unref(itemWidth) - 10 + "rpx" }),
                        class: normalizeClass([[`round-b-${2}`], "py-4 px-4 flex flex-row flex-row-center-start"])
                      }, [
                        item.statusCode == 0 || item.statusCode == 1 ? (openBlock(), createBlock(tmIcon, {
                          key: 0,
                          "font-size": 23,
                          color: "grey-3",
                          name: "tmicon-clock-fill"
                        })) : createCommentVNode("v-if", true),
                        item.statusCode == 0 || item.statusCode == 1 ? (openBlock(), createBlock(tmText, {
                          key: 1,
                          color: "grey-3",
                          _class: "pl-5",
                          "font-size": 23,
                          label: item.status
                        }, null, 8, ["label"])) : createCommentVNode("v-if", true),
                        item.statusCode == 2 || item.statusCode == 4 ? (openBlock(), createBlock(tmIcon, {
                          key: 2,
                          "font-size": 23,
                          color: "red",
                          name: "tmicon-times-circle-fill"
                        })) : createCommentVNode("v-if", true),
                        item.statusCode == 2 || item.statusCode == 4 ? (openBlock(), createBlock(tmText, {
                          key: 3,
                          color: "red",
                          _class: "pl-5",
                          "font-size": 23,
                          label: item.status
                        }, null, 8, ["label"])) : createCommentVNode("v-if", true),
                        item.statusCode == 3 ? (openBlock(), createBlock(tmIcon, {
                          key: 4,
                          "font-size": 23,
                          color: "green",
                          name: "tmicon-check-circle-fill"
                        })) : createCommentVNode("v-if", true),
                        item.statusCode == 3 ? (openBlock(), createBlock(tmText, {
                          key: 5,
                          color: "green",
                          _class: "pl-5",
                          "font-size": 23,
                          label: item.status
                        }, null, 8, ["label"])) : createCommentVNode("v-if", true)
                      ], 4)
                    ]),
                    _: 2
                  }, 1032, ["onDelete", "src", "width", "height"])
                ]),
                _: 2
              }, 1024)
            ], 4);
          }), 128)),
          !unref(_disabledAdd) ? (openBlock(), createElementBlock("view", {
            key: 0,
            onClick: chooseFile,
            class: "ma-5",
            style: normalizeStyle({ width: unref(itemWidth) - 10 + "rpx" })
          }, [
            createVNode(tmSheet, {
              eventPenetrationEnabled: true,
              followTheme: props.followTheme,
              round: 2,
              color: "primary",
              text: "",
              padding: [0, 0],
              margin: [0, 0],
              _class: "flex-center",
              height: unref(itemHeight) - 10
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "icon", {}, () => [
                  createVNode(tmIcon, {
                    "font-size": 42,
                    userInteractionEnabled: false,
                    name: "tmicon-plus"
                  })
                ])
              ]),
              _: 3
            }, 8, ["followTheme", "height"])
          ], 4)) : createCommentVNode("v-if", true)
        ], 4)
      ]);
    };
  }
});
var tmUpload = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/CoinQT/CoinQT_app/tmui/components/tm-upload/tm-upload.vue"]]);
export { tmUpload as t };
