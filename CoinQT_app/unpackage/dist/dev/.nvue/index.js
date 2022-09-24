import { g as formatAppLog } from "./tm-text.js";
class FillStylePattern {
  constructor(img, pattern) {
    this._style = pattern;
    this._img = img;
  }
}
class FillStyleLinearGradient {
  constructor(x0, y0, x1, y1) {
    this.addColorStop = function(pos, color) {
      if (this._stop_count < 5 && 0 <= pos && pos <= 1) {
        this._stops[this._stop_count] = { _pos: pos, _color: color };
        this._stop_count++;
      }
    };
    this._start_pos = { _x: x0, _y: y0 };
    this._end_pos = { _x: x1, _y: y1 };
    this._stop_count = 0;
    this._stops = [0, 0, 0, 0, 0];
  }
}
class FillStyleRadialGradient {
  constructor(x0, y0, r0, x1, y1, r1) {
    this._start_pos = { _x: x0, _y: y0, _r: r0 };
    this._end_pos = { _x: x1, _y: y1, _r: r1 };
    this._stop_count = 0;
    this._stops = [0, 0, 0, 0, 0];
  }
  addColorStop(pos, color) {
    if (this._stop_count < 5 && 0 <= pos && pos <= 1) {
      this._stops[this._stop_count] = { _pos: pos, _color: color };
      this._stop_count++;
    }
  }
}
let incId = 1;
const noop = function() {
};
const _GImage = class {
  constructor() {
    this._id = incId++;
    this._width = 0;
    this._height = 0;
    this._src = void 0;
    this._onload = noop;
    this._onerror = noop;
    this.complete = false;
  }
  get width() {
    return this._width;
  }
  set width(v) {
    this._width = v;
  }
  get height() {
    return this._height;
  }
  set height(v) {
    this._height = v;
  }
  get src() {
    return this._src;
  }
  set src(v) {
    if (v.startsWith("//")) {
      v = "http:" + v;
    }
    this._src = v;
    _GImage.GBridge.perloadImage([this._src, this._id], (data) => {
      if (typeof data === "string") {
        data = JSON.parse(data);
      }
      if (data.error) {
        var evt = { type: "error", target: this };
        this.onerror(evt);
      } else {
        this.complete = true;
        this.width = typeof data.width === "number" ? data.width : 0;
        this.height = typeof data.height === "number" ? data.height : 0;
        var evt = { type: "load", target: this };
        this.onload(evt);
      }
    });
  }
  addEventListener(name2, listener) {
    if (name2 === "load") {
      this.onload = listener;
    } else if (name2 === "error") {
      this.onerror = listener;
    }
  }
  removeEventListener(name2, listener) {
    if (name2 === "load") {
      this.onload = noop;
    } else if (name2 === "error") {
      this.onerror = noop;
    }
  }
  get onload() {
    return this._onload;
  }
  set onload(v) {
    this._onload = v;
  }
  get onerror() {
    return this._onerror;
  }
  set onerror(v) {
    this._onerror = v;
  }
};
let GImage = _GImage;
GImage.GBridge = null;
function ArrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8ClampedArray(buffer);
  for (var len = bytes.byteLength, i2 = 0; i2 < len; i2++) {
    binary += String.fromCharCode(bytes[i2]);
  }
  return btoa(binary);
}
function Base64ToUint8ClampedArray(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8ClampedArray(rawData.length);
  for (let i2 = 0; i2 < rawData.length; ++i2) {
    outputArray[i2] = rawData.charCodeAt(i2);
  }
  return outputArray;
}
class CanvasRenderingContext2D {
  constructor() {
    this._drawCommands = "";
    this._globalAlpha = 1;
    this._fillStyle = "rgb(0,0,0)";
    this._strokeStyle = "rgb(0,0,0)";
    this._lineWidth = 1;
    this._lineCap = "butt";
    this._lineJoin = "miter";
    this._miterLimit = 10;
    this._globalCompositeOperation = "source-over";
    this._textAlign = "start";
    this._textBaseline = "alphabetic";
    this._font = "10px sans-serif";
    this._savedGlobalAlpha = [];
    this.timer = null;
    this.componentId = null;
    this._notCommitDrawImageCache = [];
    this._needRedrawImageCache = [];
    this._redrawCommands = "";
    this._autoSaveContext = true;
    this.createRadialGradient = function(x0, y0, r0, x1, y1, r1) {
      return new FillStyleRadialGradient(x0, y0, r0, x1, y1, r1);
    };
    this.createCircularGradient = function(x0, y0, r0) {
      return new FillStyleRadialGradient(x0, y0, 0, x0, y0, r0);
    };
    this.quadraticCurveTo = function(cpx, cpy, x, y) {
      this._drawCommands = this._drawCommands.concat("u" + cpx + "," + cpy + "," + x + "," + y + ";");
    };
    this.strokeText = function(text, x, y) {
      let tmptext = text.replace(/!/g, "!!");
      tmptext = tmptext.replace(/,/g, "!,");
      tmptext = tmptext.replace(/;/g, "!;");
      this._drawCommands = this._drawCommands.concat("U" + tmptext + "," + x + "," + y + ",0.0;");
    };
    this.isPointInPath = function(x, y) {
      throw new Error("GCanvas not supported yet");
    };
    this.className = "CanvasRenderingContext2D";
  }
  setFillStyle(value) {
    this.fillStyle = value;
  }
  set fillStyle(value) {
    this._fillStyle = value;
    if (typeof value == "string") {
      this._drawCommands = this._drawCommands.concat("F" + value + ";");
    } else if (value instanceof FillStylePattern) {
      const image2 = value._img;
      if (!image2.complete) {
        image2.onload = () => {
          var index = this._needRedrawImageCache.indexOf(image2);
          if (index > -1) {
            this._needRedrawImageCache.splice(index, 1);
            CanvasRenderingContext2D.GBridge.bindImageTexture(this.componentId, image2.src, image2._id);
            this._redrawflush(true);
          }
        };
        this._notCommitDrawImageCache.push(image2);
      } else {
        CanvasRenderingContext2D.GBridge.bindImageTexture(this.componentId, image2.src, image2._id);
      }
      this._drawCommands = this._drawCommands.concat("G" + image2._id + "," + value._style + ";");
    } else if (value instanceof FillStyleLinearGradient) {
      var command = "D" + value._start_pos._x.toFixed(2) + "," + value._start_pos._y.toFixed(2) + "," + value._end_pos._x.toFixed(2) + "," + value._end_pos._y.toFixed(2) + "," + value._stop_count;
      for (var i2 = 0; i2 < value._stop_count; ++i2) {
        command += "," + value._stops[i2]._pos + "," + value._stops[i2]._color;
      }
      this._drawCommands = this._drawCommands.concat(command + ";");
    } else if (value instanceof FillStyleRadialGradient) {
      var command = "H" + value._start_pos._x.toFixed(2) + "," + value._start_pos._y.toFixed(2) + "," + value._start_pos._r.toFixed(2) + "," + value._end_pos._x.toFixed(2) + "," + value._end_pos._y.toFixed(2) + "," + value._end_pos._r.toFixed(2) + "," + value._stop_count;
      for (var i2 = 0; i2 < value._stop_count; ++i2) {
        command += "," + value._stops[i2]._pos + "," + value._stops[i2]._color;
      }
      this._drawCommands = this._drawCommands.concat(command + ";");
    }
  }
  get fillStyle() {
    return this._fillStyle;
  }
  get globalAlpha() {
    return this._globalAlpha;
  }
  setGlobalAlpha(value) {
    this.globalAlpha = value;
  }
  set globalAlpha(value) {
    this._globalAlpha = value;
    this._drawCommands = this._drawCommands.concat("a" + value.toFixed(2) + ";");
  }
  get strokeStyle() {
    return this._strokeStyle;
  }
  setStrokeStyle(value) {
    this.strokeStyle = value;
  }
  set strokeStyle(value) {
    this._strokeStyle = value;
    if (typeof value == "string") {
      this._drawCommands = this._drawCommands.concat("S" + value + ";");
    } else if (value instanceof FillStylePattern) {
      CanvasRenderingContext2D.GBridge.bindImageTexture(this.componentId, image.src, image._id);
      this._drawCommands = this._drawCommands.concat("G" + image._id + "," + value._style + ";");
    } else if (value instanceof FillStyleLinearGradient) {
      var command = "D" + value._start_pos._x.toFixed(2) + "," + value._start_pos._y.toFixed(2) + "," + value._end_pos._x.toFixed(2) + "," + value._end_pos._y.toFixed(2) + "," + value._stop_count;
      for (var i2 = 0; i2 < value._stop_count; ++i2) {
        command += "," + value._stops[i2]._pos + "," + value._stops[i2]._color;
      }
      this._drawCommands = this._drawCommands.concat(command + ";");
    } else if (value instanceof FillStyleRadialGradient) {
      var command = "H" + value._start_pos._x.toFixed(2) + "," + value._start_pos._y.toFixed(2) + "," + value._start_pos._r.toFixed(2) + "," + value._end_pos._x.toFixed(2) + "," + value._end_pos._y + ",".toFixed(2) + value._end_pos._r.toFixed(2) + "," + value._stop_count;
      for (var i2 = 0; i2 < value._stop_count; ++i2) {
        command += "," + value._stops[i2]._pos + "," + value._stops[i2]._color;
      }
      this._drawCommands = this._drawCommands.concat(command + ";");
    }
  }
  get lineWidth() {
    return this._lineWidth;
  }
  setLineWidth(value) {
    this.lineWidth = value;
  }
  set lineWidth(value) {
    this._lineWidth = value;
    this._drawCommands = this._drawCommands.concat("W" + value + ";");
  }
  get lineCap() {
    return this._lineCap;
  }
  setLineCap(value) {
    this.lineCap = value;
  }
  set lineCap(value) {
    this._lineCap = value;
    this._drawCommands = this._drawCommands.concat("C" + value + ";");
  }
  get lineJoin() {
    return this._lineJoin;
  }
  setLineJoin(value) {
    this.lineJoin = value;
  }
  set lineJoin(value) {
    this._lineJoin = value;
    this._drawCommands = this._drawCommands.concat("J" + value + ";");
  }
  get miterLimit() {
    return this._miterLimit;
  }
  setMiterLimit(value) {
    this.miterLimit = value;
  }
  set miterLimit(value) {
    this._miterLimit = value;
    this._drawCommands = this._drawCommands.concat("M" + value + ";");
  }
  get globalCompositeOperation() {
    return this._globalCompositeOperation;
  }
  set globalCompositeOperation(value) {
    this._globalCompositeOperation = value;
    let mode = 0;
    switch (value) {
      case "source-over":
        mode = 0;
        break;
      case "source-atop":
        mode = 5;
        break;
      case "source-in":
        mode = 0;
        break;
      case "source-out":
        mode = 2;
        break;
      case "destination-over":
        mode = 4;
        break;
      case "destination-atop":
        mode = 4;
        break;
      case "destination-in":
        mode = 4;
        break;
      case "destination-out":
        mode = 3;
        break;
      case "lighter":
        mode = 1;
        break;
      case "copy":
        mode = 2;
        break;
      case "xor":
        mode = 6;
        break;
      default:
        mode = 0;
    }
    this._drawCommands = this._drawCommands.concat("B" + mode + ";");
  }
  get textAlign() {
    return this._textAlign;
  }
  setTextAlign(value) {
    this.textAlign = value;
  }
  set textAlign(value) {
    this._textAlign = value;
    let Align = 0;
    switch (value) {
      case "start":
        Align = 0;
        break;
      case "end":
        Align = 1;
        break;
      case "left":
        Align = 2;
        break;
      case "center":
        Align = 3;
        break;
      case "right":
        Align = 4;
        break;
      default:
        Align = 0;
    }
    this._drawCommands = this._drawCommands.concat("A" + Align + ";");
  }
  get textBaseline() {
    return this._textBaseline;
  }
  setTextBaseline(value) {
    this.textBaseline = value;
  }
  set textBaseline(value) {
    this._textBaseline = value;
    let baseline = 0;
    switch (value) {
      case "alphabetic":
        baseline = 0;
        break;
      case "middle":
        baseline = 1;
        break;
      case "top":
        baseline = 2;
        break;
      case "hanging":
        baseline = 3;
        break;
      case "bottom":
        baseline = 4;
        break;
      case "ideographic":
        baseline = 5;
        break;
      default:
        baseline = 0;
        break;
    }
    this._drawCommands = this._drawCommands.concat("E" + baseline + ";");
  }
  get font() {
    return this._font;
  }
  setFontSize(size) {
    var str = this._font;
    var strs = str.trim().split(/\s+/);
    for (var i2 = 0; i2 < strs.length; i2++) {
      var values = [
        "normal",
        "italic",
        "oblique",
        "normal",
        "small-caps",
        "normal",
        "bold",
        "bolder",
        "lighter",
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
        "normal",
        "ultra-condensed",
        "extra-condensed",
        "condensed",
        "semi-condensed",
        "semi-expanded",
        "expanded",
        "extra-expanded",
        "ultra-expanded"
      ];
      if (values.indexOf(strs[i2].trim()) == -1) {
        if (typeof size === "string") {
          strs[i2] = size;
        } else if (typeof size === "number") {
          strs[i2] = String(size) + "px";
        }
        break;
      }
    }
    this.font = strs.join(" ");
  }
  set font(value) {
    this._font = value;
    this._drawCommands = this._drawCommands.concat("j" + value + ";");
  }
  setTransform(a, b, c, d, tx, ty) {
    this._drawCommands = this._drawCommands.concat("t" + (a === 1 ? "1" : a.toFixed(2)) + "," + (b === 0 ? "0" : b.toFixed(2)) + "," + (c === 0 ? "0" : c.toFixed(2)) + "," + (d === 1 ? "1" : d.toFixed(2)) + "," + tx.toFixed(2) + "," + ty.toFixed(2) + ";");
  }
  transform(a, b, c, d, tx, ty) {
    this._drawCommands = this._drawCommands.concat("f" + (a === 1 ? "1" : a.toFixed(2)) + "," + (b === 0 ? "0" : b.toFixed(2)) + "," + (c === 0 ? "0" : c.toFixed(2)) + "," + (d === 1 ? "1" : d.toFixed(2)) + "," + tx + "," + ty + ";");
  }
  resetTransform() {
    this._drawCommands = this._drawCommands.concat("m;");
  }
  scale(a, d) {
    this._drawCommands = this._drawCommands.concat("k" + a.toFixed(2) + "," + d.toFixed(2) + ";");
  }
  rotate(angle) {
    this._drawCommands = this._drawCommands.concat("r" + angle.toFixed(6) + ";");
  }
  translate(tx, ty) {
    this._drawCommands = this._drawCommands.concat("l" + tx.toFixed(2) + "," + ty.toFixed(2) + ";");
  }
  save() {
    this._savedGlobalAlpha.push(this._globalAlpha);
    this._drawCommands = this._drawCommands.concat("v;");
  }
  restore() {
    this._drawCommands = this._drawCommands.concat("e;");
    this._globalAlpha = this._savedGlobalAlpha.pop();
  }
  createPattern(img, pattern) {
    if (typeof img === "string") {
      var imgObj = new GImage();
      imgObj.src = img;
      img = imgObj;
    }
    return new FillStylePattern(img, pattern);
  }
  createLinearGradient(x0, y0, x1, y1) {
    return new FillStyleLinearGradient(x0, y0, x1, y1);
  }
  strokeRect(x, y, w, h) {
    this._drawCommands = this._drawCommands.concat("s" + x + "," + y + "," + w + "," + h + ";");
  }
  clearRect(x, y, w, h) {
    this._drawCommands = this._drawCommands.concat("c" + x + "," + y + "," + w + "," + h + ";");
  }
  clip() {
    this._drawCommands = this._drawCommands.concat("p;");
  }
  resetClip() {
    this._drawCommands = this._drawCommands.concat("q;");
  }
  closePath() {
    this._drawCommands = this._drawCommands.concat("o;");
  }
  moveTo(x, y) {
    this._drawCommands = this._drawCommands.concat("g" + x.toFixed(2) + "," + y.toFixed(2) + ";");
  }
  lineTo(x, y) {
    this._drawCommands = this._drawCommands.concat("i" + x.toFixed(2) + "," + y.toFixed(2) + ";");
  }
  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
    this._drawCommands = this._drawCommands.concat("z" + cp1x.toFixed(2) + "," + cp1y.toFixed(2) + "," + cp2x.toFixed(2) + "," + cp2y.toFixed(2) + "," + x.toFixed(2) + "," + y.toFixed(2) + ";");
  }
  arcTo(x1, y1, x2, y2, radius) {
    this._drawCommands = this._drawCommands.concat("h" + x1 + "," + y1 + "," + x2 + "," + y2 + "," + radius + ";");
  }
  beginPath() {
    this._drawCommands = this._drawCommands.concat("b;");
  }
  fillRect(x, y, w, h) {
    this._drawCommands = this._drawCommands.concat("n" + x + "," + y + "," + w + "," + h + ";");
  }
  rect(x, y, w, h) {
    this._drawCommands = this._drawCommands.concat("w" + x + "," + y + "," + w + "," + h + ";");
  }
  fill() {
    this._drawCommands = this._drawCommands.concat("L;");
  }
  stroke(path) {
    this._drawCommands = this._drawCommands.concat("x;");
  }
  arc(x, y, radius, startAngle, endAngle, anticlockwise) {
    let ianticlockwise = 0;
    if (anticlockwise) {
      ianticlockwise = 1;
    }
    this._drawCommands = this._drawCommands.concat("y" + x.toFixed(2) + "," + y.toFixed(2) + "," + radius.toFixed(2) + "," + startAngle + "," + endAngle + "," + ianticlockwise + ";");
  }
  fillText(text, x, y) {
    let tmptext = text.replace(/!/g, "!!");
    tmptext = tmptext.replace(/,/g, "!,");
    tmptext = tmptext.replace(/;/g, "!;");
    this._drawCommands = this._drawCommands.concat("T" + tmptext + "," + x + "," + y + ",0.0;");
  }
  measureText(text) {
    return CanvasRenderingContext2D.GBridge.measureText(text, this.font, this.componentId);
  }
  drawImage(image2, sx, sy, sw, sh, dx, dy, dw, dh) {
    if (typeof image2 === "string") {
      var imgObj = new GImage();
      imgObj.src = image2;
      image2 = imgObj;
    }
    formatAppLog("log", "at tmui/tool/gcanvas/context-2d/RenderingContext.js:531", imgObj);
    if (image2 instanceof GImage) {
      if (!image2.complete) {
        imgObj.onload = () => {
          var index = this._needRedrawImageCache.indexOf(image2);
          if (index > -1) {
            this._needRedrawImageCache.splice(index, 1);
            CanvasRenderingContext2D.GBridge.bindImageTexture(this.componentId, image2.src, image2._id);
            this._redrawflush(true);
          }
        };
        this._notCommitDrawImageCache.push(image2);
      } else {
        CanvasRenderingContext2D.GBridge.bindImageTexture(this.componentId, image2.src, image2._id);
      }
      var srcArgs = [image2, sx, sy, sw, sh, dx, dy, dw, dh];
      var args = [];
      for (var arg in srcArgs) {
        if (typeof srcArgs[arg] != "undefined") {
          args.push(srcArgs[arg]);
        }
      }
      this.__drawImage.apply(this, args);
    }
  }
  __drawImage(image2, sx, sy, sw, sh, dx, dy, dw, dh) {
    const numArgs = arguments.length;
    function drawImageCommands() {
      if (numArgs === 3) {
        const x = parseFloat(sx) || 0;
        const y = parseFloat(sy) || 0;
        return "d" + image2._id + ",0,0," + image2.width + "," + image2.height + "," + x + "," + y + "," + image2.width + "," + image2.height + ";";
      } else if (numArgs === 5) {
        const x = parseFloat(sx) || 0;
        const y = parseFloat(sy) || 0;
        const width = parseInt(sw) || image2.width;
        const height = parseInt(sh) || image2.height;
        return "d" + image2._id + ",0,0," + image2.width + "," + image2.height + "," + x + "," + y + "," + width + "," + height + ";";
      } else if (numArgs === 9) {
        sx = parseFloat(sx) || 0;
        sy = parseFloat(sy) || 0;
        sw = parseInt(sw) || image2.width;
        sh = parseInt(sh) || image2.height;
        dx = parseFloat(dx) || 0;
        dy = parseFloat(dy) || 0;
        dw = parseInt(dw) || image2.width;
        dh = parseInt(dh) || image2.height;
        return "d" + image2._id + "," + sx + "," + sy + "," + sw + "," + sh + "," + dx + "," + dy + "," + dw + "," + dh + ";";
      }
    }
    this._drawCommands += drawImageCommands();
  }
  _flush(reserve, callback) {
    const commands = this._drawCommands;
    this._drawCommands = "";
    CanvasRenderingContext2D.GBridge.render2d(this.componentId, commands, callback);
    this._needRender = false;
  }
  _redrawflush(reserve, callback) {
    const commands = this._redrawCommands;
    CanvasRenderingContext2D.GBridge.render2d(this.componentId, commands, callback);
    if (this._needRedrawImageCache.length == 0) {
      this._redrawCommands = "";
    }
  }
  draw(reserve, callback) {
    if (!reserve) {
      this._globalAlpha = this._savedGlobalAlpha.pop();
      this._savedGlobalAlpha.push(this._globalAlpha);
      this._redrawCommands = this._drawCommands;
      this._needRedrawImageCache = this._notCommitDrawImageCache;
      if (this._autoSaveContext) {
        this._drawCommands = "v;" + this._drawCommands;
        this._autoSaveContext = false;
      } else {
        this._drawCommands = "e;X;v;" + this._drawCommands;
      }
    } else {
      this._needRedrawImageCache = this._needRedrawImageCache.concat(this._notCommitDrawImageCache);
      this._redrawCommands += this._drawCommands;
      if (this._autoSaveContext) {
        this._drawCommands = "v;" + this._drawCommands;
        this._autoSaveContext = false;
      }
    }
    this._notCommitDrawImageCache = [];
    if (this._flush) {
      this._flush(reserve, callback);
    }
  }
  getImageData(x, y, w, h, callback) {
    CanvasRenderingContext2D.GBridge.getImageData(this.componentId, x, y, w, h, function(res) {
      res.data = Base64ToUint8ClampedArray(res.data);
      if (typeof callback == "function") {
        callback(res);
      }
    });
  }
  putImageData(data, x, y, w, h, callback) {
    if (data instanceof Uint8ClampedArray) {
      data = ArrayBufferToBase64(data);
      CanvasRenderingContext2D.GBridge.putImageData(this.componentId, data, x, y, w, h, function(res) {
        if (typeof callback == "function") {
          callback(res);
        }
      });
    }
  }
  toTempFilePath(x, y, width, height, destWidth, destHeight, fileType, quality, callback) {
    CanvasRenderingContext2D.GBridge.toTempFilePath(this.componentId, x, y, width, height, destWidth, destHeight, fileType, quality, function(res) {
      if (typeof callback == "function") {
        callback(res);
      }
    });
  }
}
var GLenum = {
  "DEPTH_BUFFER_BIT": 256,
  "STENCIL_BUFFER_BIT": 1024,
  "COLOR_BUFFER_BIT": 16384,
  "POINTS": 0,
  "LINES": 1,
  "LINE_LOOP": 2,
  "LINE_STRIP": 3,
  "TRIANGLES": 4,
  "TRIANGLE_STRIP": 5,
  "TRIANGLE_FAN": 6,
  "ZERO": 0,
  "ONE": 1,
  "SRC_COLOR": 768,
  "ONE_MINUS_SRC_COLOR": 769,
  "SRC_ALPHA": 770,
  "ONE_MINUS_SRC_ALPHA": 771,
  "DST_ALPHA": 772,
  "ONE_MINUS_DST_ALPHA": 773,
  "DST_COLOR": 774,
  "ONE_MINUS_DST_COLOR": 775,
  "SRC_ALPHA_SATURATE": 776,
  "FUNC_ADD": 32774,
  "BLEND_EQUATION": 32777,
  "BLEND_EQUATION_RGB": 32777,
  "BLEND_EQUATION_ALPHA": 34877,
  "FUNC_SUBTRACT": 32778,
  "FUNC_REVERSE_SUBTRACT": 32779,
  "BLEND_DST_RGB": 32968,
  "BLEND_SRC_RGB": 32969,
  "BLEND_DST_ALPHA": 32970,
  "BLEND_SRC_ALPHA": 32971,
  "CONSTANT_COLOR": 32769,
  "ONE_MINUS_CONSTANT_COLOR": 32770,
  "CONSTANT_ALPHA": 32771,
  "ONE_MINUS_CONSTANT_ALPHA": 32772,
  "BLEND_COLOR": 32773,
  "ARRAY_BUFFER": 34962,
  "ELEMENT_ARRAY_BUFFER": 34963,
  "ARRAY_BUFFER_BINDING": 34964,
  "ELEMENT_ARRAY_BUFFER_BINDING": 34965,
  "STREAM_DRAW": 35040,
  "STATIC_DRAW": 35044,
  "DYNAMIC_DRAW": 35048,
  "BUFFER_SIZE": 34660,
  "BUFFER_USAGE": 34661,
  "CURRENT_VERTEX_ATTRIB": 34342,
  "FRONT": 1028,
  "BACK": 1029,
  "FRONT_AND_BACK": 1032,
  "TEXTURE_2D": 3553,
  "CULL_FACE": 2884,
  "BLEND": 3042,
  "DITHER": 3024,
  "STENCIL_TEST": 2960,
  "DEPTH_TEST": 2929,
  "SCISSOR_TEST": 3089,
  "POLYGON_OFFSET_FILL": 32823,
  "SAMPLE_ALPHA_TO_COVERAGE": 32926,
  "SAMPLE_COVERAGE": 32928,
  "NO_ERROR": 0,
  "INVALID_ENUM": 1280,
  "INVALID_VALUE": 1281,
  "INVALID_OPERATION": 1282,
  "OUT_OF_MEMORY": 1285,
  "CW": 2304,
  "CCW": 2305,
  "LINE_WIDTH": 2849,
  "ALIASED_POINT_SIZE_RANGE": 33901,
  "ALIASED_LINE_WIDTH_RANGE": 33902,
  "CULL_FACE_MODE": 2885,
  "FRONT_FACE": 2886,
  "DEPTH_RANGE": 2928,
  "DEPTH_WRITEMASK": 2930,
  "DEPTH_CLEAR_VALUE": 2931,
  "DEPTH_FUNC": 2932,
  "STENCIL_CLEAR_VALUE": 2961,
  "STENCIL_FUNC": 2962,
  "STENCIL_FAIL": 2964,
  "STENCIL_PASS_DEPTH_FAIL": 2965,
  "STENCIL_PASS_DEPTH_PASS": 2966,
  "STENCIL_REF": 2967,
  "STENCIL_VALUE_MASK": 2963,
  "STENCIL_WRITEMASK": 2968,
  "STENCIL_BACK_FUNC": 34816,
  "STENCIL_BACK_FAIL": 34817,
  "STENCIL_BACK_PASS_DEPTH_FAIL": 34818,
  "STENCIL_BACK_PASS_DEPTH_PASS": 34819,
  "STENCIL_BACK_REF": 36003,
  "STENCIL_BACK_VALUE_MASK": 36004,
  "STENCIL_BACK_WRITEMASK": 36005,
  "VIEWPORT": 2978,
  "SCISSOR_BOX": 3088,
  "COLOR_CLEAR_VALUE": 3106,
  "COLOR_WRITEMASK": 3107,
  "UNPACK_ALIGNMENT": 3317,
  "PACK_ALIGNMENT": 3333,
  "MAX_TEXTURE_SIZE": 3379,
  "MAX_VIEWPORT_DIMS": 3386,
  "SUBPIXEL_BITS": 3408,
  "RED_BITS": 3410,
  "GREEN_BITS": 3411,
  "BLUE_BITS": 3412,
  "ALPHA_BITS": 3413,
  "DEPTH_BITS": 3414,
  "STENCIL_BITS": 3415,
  "POLYGON_OFFSET_UNITS": 10752,
  "POLYGON_OFFSET_FACTOR": 32824,
  "TEXTURE_BINDING_2D": 32873,
  "SAMPLE_BUFFERS": 32936,
  "SAMPLES": 32937,
  "SAMPLE_COVERAGE_VALUE": 32938,
  "SAMPLE_COVERAGE_INVERT": 32939,
  "COMPRESSED_TEXTURE_FORMATS": 34467,
  "DONT_CARE": 4352,
  "FASTEST": 4353,
  "NICEST": 4354,
  "GENERATE_MIPMAP_HINT": 33170,
  "BYTE": 5120,
  "UNSIGNED_BYTE": 5121,
  "SHORT": 5122,
  "UNSIGNED_SHORT": 5123,
  "INT": 5124,
  "UNSIGNED_INT": 5125,
  "FLOAT": 5126,
  "DEPTH_COMPONENT": 6402,
  "ALPHA": 6406,
  "RGB": 6407,
  "RGBA": 6408,
  "LUMINANCE": 6409,
  "LUMINANCE_ALPHA": 6410,
  "UNSIGNED_SHORT_4_4_4_4": 32819,
  "UNSIGNED_SHORT_5_5_5_1": 32820,
  "UNSIGNED_SHORT_5_6_5": 33635,
  "FRAGMENT_SHADER": 35632,
  "VERTEX_SHADER": 35633,
  "MAX_VERTEX_ATTRIBS": 34921,
  "MAX_VERTEX_UNIFORM_VECTORS": 36347,
  "MAX_VARYING_VECTORS": 36348,
  "MAX_COMBINED_TEXTURE_IMAGE_UNITS": 35661,
  "MAX_VERTEX_TEXTURE_IMAGE_UNITS": 35660,
  "MAX_TEXTURE_IMAGE_UNITS": 34930,
  "MAX_FRAGMENT_UNIFORM_VECTORS": 36349,
  "SHADER_TYPE": 35663,
  "DELETE_STATUS": 35712,
  "LINK_STATUS": 35714,
  "VALIDATE_STATUS": 35715,
  "ATTACHED_SHADERS": 35717,
  "ACTIVE_UNIFORMS": 35718,
  "ACTIVE_ATTRIBUTES": 35721,
  "SHADING_LANGUAGE_VERSION": 35724,
  "CURRENT_PROGRAM": 35725,
  "NEVER": 512,
  "LESS": 513,
  "EQUAL": 514,
  "LEQUAL": 515,
  "GREATER": 516,
  "NOTEQUAL": 517,
  "GEQUAL": 518,
  "ALWAYS": 519,
  "KEEP": 7680,
  "REPLACE": 7681,
  "INCR": 7682,
  "DECR": 7683,
  "INVERT": 5386,
  "INCR_WRAP": 34055,
  "DECR_WRAP": 34056,
  "VENDOR": 7936,
  "RENDERER": 7937,
  "VERSION": 7938,
  "NEAREST": 9728,
  "LINEAR": 9729,
  "NEAREST_MIPMAP_NEAREST": 9984,
  "LINEAR_MIPMAP_NEAREST": 9985,
  "NEAREST_MIPMAP_LINEAR": 9986,
  "LINEAR_MIPMAP_LINEAR": 9987,
  "TEXTURE_MAG_FILTER": 10240,
  "TEXTURE_MIN_FILTER": 10241,
  "TEXTURE_WRAP_S": 10242,
  "TEXTURE_WRAP_T": 10243,
  "TEXTURE": 5890,
  "TEXTURE_CUBE_MAP": 34067,
  "TEXTURE_BINDING_CUBE_MAP": 34068,
  "TEXTURE_CUBE_MAP_POSITIVE_X": 34069,
  "TEXTURE_CUBE_MAP_NEGATIVE_X": 34070,
  "TEXTURE_CUBE_MAP_POSITIVE_Y": 34071,
  "TEXTURE_CUBE_MAP_NEGATIVE_Y": 34072,
  "TEXTURE_CUBE_MAP_POSITIVE_Z": 34073,
  "TEXTURE_CUBE_MAP_NEGATIVE_Z": 34074,
  "MAX_CUBE_MAP_TEXTURE_SIZE": 34076,
  "TEXTURE0": 33984,
  "TEXTURE1": 33985,
  "TEXTURE2": 33986,
  "TEXTURE3": 33987,
  "TEXTURE4": 33988,
  "TEXTURE5": 33989,
  "TEXTURE6": 33990,
  "TEXTURE7": 33991,
  "TEXTURE8": 33992,
  "TEXTURE9": 33993,
  "TEXTURE10": 33994,
  "TEXTURE11": 33995,
  "TEXTURE12": 33996,
  "TEXTURE13": 33997,
  "TEXTURE14": 33998,
  "TEXTURE15": 33999,
  "TEXTURE16": 34e3,
  "TEXTURE17": 34001,
  "TEXTURE18": 34002,
  "TEXTURE19": 34003,
  "TEXTURE20": 34004,
  "TEXTURE21": 34005,
  "TEXTURE22": 34006,
  "TEXTURE23": 34007,
  "TEXTURE24": 34008,
  "TEXTURE25": 34009,
  "TEXTURE26": 34010,
  "TEXTURE27": 34011,
  "TEXTURE28": 34012,
  "TEXTURE29": 34013,
  "TEXTURE30": 34014,
  "TEXTURE31": 34015,
  "ACTIVE_TEXTURE": 34016,
  "REPEAT": 10497,
  "CLAMP_TO_EDGE": 33071,
  "MIRRORED_REPEAT": 33648,
  "FLOAT_VEC2": 35664,
  "FLOAT_VEC3": 35665,
  "FLOAT_VEC4": 35666,
  "INT_VEC2": 35667,
  "INT_VEC3": 35668,
  "INT_VEC4": 35669,
  "BOOL": 35670,
  "BOOL_VEC2": 35671,
  "BOOL_VEC3": 35672,
  "BOOL_VEC4": 35673,
  "FLOAT_MAT2": 35674,
  "FLOAT_MAT3": 35675,
  "FLOAT_MAT4": 35676,
  "SAMPLER_2D": 35678,
  "SAMPLER_CUBE": 35680,
  "VERTEX_ATTRIB_ARRAY_ENABLED": 34338,
  "VERTEX_ATTRIB_ARRAY_SIZE": 34339,
  "VERTEX_ATTRIB_ARRAY_STRIDE": 34340,
  "VERTEX_ATTRIB_ARRAY_TYPE": 34341,
  "VERTEX_ATTRIB_ARRAY_NORMALIZED": 34922,
  "VERTEX_ATTRIB_ARRAY_POINTER": 34373,
  "VERTEX_ATTRIB_ARRAY_BUFFER_BINDING": 34975,
  "IMPLEMENTATION_COLOR_READ_TYPE": 35738,
  "IMPLEMENTATION_COLOR_READ_FORMAT": 35739,
  "COMPILE_STATUS": 35713,
  "LOW_FLOAT": 36336,
  "MEDIUM_FLOAT": 36337,
  "HIGH_FLOAT": 36338,
  "LOW_INT": 36339,
  "MEDIUM_INT": 36340,
  "HIGH_INT": 36341,
  "FRAMEBUFFER": 36160,
  "RENDERBUFFER": 36161,
  "RGBA4": 32854,
  "RGB5_A1": 32855,
  "RGB565": 36194,
  "DEPTH_COMPONENT16": 33189,
  "STENCIL_INDEX8": 36168,
  "DEPTH_STENCIL": 34041,
  "RENDERBUFFER_WIDTH": 36162,
  "RENDERBUFFER_HEIGHT": 36163,
  "RENDERBUFFER_INTERNAL_FORMAT": 36164,
  "RENDERBUFFER_RED_SIZE": 36176,
  "RENDERBUFFER_GREEN_SIZE": 36177,
  "RENDERBUFFER_BLUE_SIZE": 36178,
  "RENDERBUFFER_ALPHA_SIZE": 36179,
  "RENDERBUFFER_DEPTH_SIZE": 36180,
  "RENDERBUFFER_STENCIL_SIZE": 36181,
  "FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE": 36048,
  "FRAMEBUFFER_ATTACHMENT_OBJECT_NAME": 36049,
  "FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL": 36050,
  "FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE": 36051,
  "COLOR_ATTACHMENT0": 36064,
  "DEPTH_ATTACHMENT": 36096,
  "STENCIL_ATTACHMENT": 36128,
  "DEPTH_STENCIL_ATTACHMENT": 33306,
  "NONE": 0,
  "FRAMEBUFFER_COMPLETE": 36053,
  "FRAMEBUFFER_INCOMPLETE_ATTACHMENT": 36054,
  "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT": 36055,
  "FRAMEBUFFER_INCOMPLETE_DIMENSIONS": 36057,
  "FRAMEBUFFER_UNSUPPORTED": 36061,
  "FRAMEBUFFER_BINDING": 36006,
  "RENDERBUFFER_BINDING": 36007,
  "MAX_RENDERBUFFER_SIZE": 34024,
  "INVALID_FRAMEBUFFER_OPERATION": 1286,
  "UNPACK_FLIP_Y_WEBGL": 37440,
  "UNPACK_PREMULTIPLY_ALPHA_WEBGL": 37441,
  "CONTEXT_LOST_WEBGL": 37442,
  "UNPACK_COLORSPACE_CONVERSION_WEBGL": 37443,
  "BROWSER_DEFAULT_WEBGL": 37444
};
class WebGLActiveInfo {
  constructor({
    type,
    name: name2,
    size
  }) {
    this.className = "WebGLActiveInfo";
    this.type = type;
    this.name = name2;
    this.size = size;
  }
}
function getTransferedObjectUUID(name2, id) {
  return `${name2.toLowerCase()}-${id}`;
}
const name$6 = "WebGLBuffer";
function uuid$6(id) {
  return getTransferedObjectUUID(name$6, id);
}
class WebGLBuffer {
  constructor(id) {
    this.className = name$6;
    this.id = id;
  }
  uuid() {
    return uuid$6(this.id);
  }
}
WebGLBuffer.uuid = uuid$6;
const name$5 = "WebGLFrameBuffer";
function uuid$5(id) {
  return getTransferedObjectUUID(name$5, id);
}
class WebGLFramebuffer {
  constructor(id) {
    this.className = name$5;
    this.id = id;
  }
  uuid() {
    return uuid$5(this.id);
  }
}
WebGLFramebuffer.uuid = uuid$5;
const name$4 = "WebGLRenderBuffer";
function uuid$4(id) {
  return getTransferedObjectUUID(name$4, id);
}
class WebGLRenderbuffer {
  constructor(id) {
    this.className = name$4;
    this.id = id;
  }
  uuid() {
    return uuid$4(this.id);
  }
}
WebGLRenderbuffer.uuid = uuid$4;
const name$3 = "WebGLTexture";
function uuid$3(id) {
  return getTransferedObjectUUID(name$3, id);
}
class WebGLTexture {
  constructor(id, type) {
    this.className = name$3;
    this.id = id;
    this.type = type;
  }
  uuid() {
    return uuid$3(this.id);
  }
}
WebGLTexture.uuid = uuid$3;
const name$2 = "WebGLProgram";
function uuid$2(id) {
  return getTransferedObjectUUID(name$2, id);
}
class WebGLProgram {
  constructor(id) {
    this.className = name$2;
    this.id = id;
  }
  uuid() {
    return uuid$2(this.id);
  }
}
WebGLProgram.uuid = uuid$2;
const name$1 = "WebGLShader";
function uuid$1(id) {
  return getTransferedObjectUUID(name$1, id);
}
class WebGLShader {
  constructor(id, type) {
    this.className = name$1;
    this.id = id;
    this.type = type;
  }
  uuid() {
    return uuid$1(this.id);
  }
}
WebGLShader.uuid = uuid$1;
class WebGLShaderPrecisionFormat {
  constructor({
    rangeMin,
    rangeMax,
    precision
  }) {
    this.className = "WebGLShaderPrecisionFormat";
    this.rangeMin = rangeMin;
    this.rangeMax = rangeMax;
    this.precision = precision;
  }
}
const name = "WebGLUniformLocation";
function uuid(id) {
  return getTransferedObjectUUID(name, id);
}
class WebGLUniformLocation {
  constructor(id, type) {
    this.className = name;
    this.id = id;
    this.type = type;
  }
  uuid() {
    return uuid(this.id);
  }
}
WebGLUniformLocation.uuid = uuid;
let i = 1;
const GLmethod = {};
GLmethod.activeTexture = i++;
GLmethod.attachShader = i++;
GLmethod.bindAttribLocation = i++;
GLmethod.bindBuffer = i++;
GLmethod.bindFramebuffer = i++;
GLmethod.bindRenderbuffer = i++;
GLmethod.bindTexture = i++;
GLmethod.blendColor = i++;
GLmethod.blendEquation = i++;
GLmethod.blendEquationSeparate = i++;
GLmethod.blendFunc = i++;
GLmethod.blendFuncSeparate = i++;
GLmethod.bufferData = i++;
GLmethod.bufferSubData = i++;
GLmethod.checkFramebufferStatus = i++;
GLmethod.clear = i++;
GLmethod.clearColor = i++;
GLmethod.clearDepth = i++;
GLmethod.clearStencil = i++;
GLmethod.colorMask = i++;
GLmethod.compileShader = i++;
GLmethod.compressedTexImage2D = i++;
GLmethod.compressedTexSubImage2D = i++;
GLmethod.copyTexImage2D = i++;
GLmethod.copyTexSubImage2D = i++;
GLmethod.createBuffer = i++;
GLmethod.createFramebuffer = i++;
GLmethod.createProgram = i++;
GLmethod.createRenderbuffer = i++;
GLmethod.createShader = i++;
GLmethod.createTexture = i++;
GLmethod.cullFace = i++;
GLmethod.deleteBuffer = i++;
GLmethod.deleteFramebuffer = i++;
GLmethod.deleteProgram = i++;
GLmethod.deleteRenderbuffer = i++;
GLmethod.deleteShader = i++;
GLmethod.deleteTexture = i++;
GLmethod.depthFunc = i++;
GLmethod.depthMask = i++;
GLmethod.depthRange = i++;
GLmethod.detachShader = i++;
GLmethod.disable = i++;
GLmethod.disableVertexAttribArray = i++;
GLmethod.drawArrays = i++;
GLmethod.drawArraysInstancedANGLE = i++;
GLmethod.drawElements = i++;
GLmethod.drawElementsInstancedANGLE = i++;
GLmethod.enable = i++;
GLmethod.enableVertexAttribArray = i++;
GLmethod.flush = i++;
GLmethod.framebufferRenderbuffer = i++;
GLmethod.framebufferTexture2D = i++;
GLmethod.frontFace = i++;
GLmethod.generateMipmap = i++;
GLmethod.getActiveAttrib = i++;
GLmethod.getActiveUniform = i++;
GLmethod.getAttachedShaders = i++;
GLmethod.getAttribLocation = i++;
GLmethod.getBufferParameter = i++;
GLmethod.getContextAttributes = i++;
GLmethod.getError = i++;
GLmethod.getExtension = i++;
GLmethod.getFramebufferAttachmentParameter = i++;
GLmethod.getParameter = i++;
GLmethod.getProgramInfoLog = i++;
GLmethod.getProgramParameter = i++;
GLmethod.getRenderbufferParameter = i++;
GLmethod.getShaderInfoLog = i++;
GLmethod.getShaderParameter = i++;
GLmethod.getShaderPrecisionFormat = i++;
GLmethod.getShaderSource = i++;
GLmethod.getSupportedExtensions = i++;
GLmethod.getTexParameter = i++;
GLmethod.getUniform = i++;
GLmethod.getUniformLocation = i++;
GLmethod.getVertexAttrib = i++;
GLmethod.getVertexAttribOffset = i++;
GLmethod.isBuffer = i++;
GLmethod.isContextLost = i++;
GLmethod.isEnabled = i++;
GLmethod.isFramebuffer = i++;
GLmethod.isProgram = i++;
GLmethod.isRenderbuffer = i++;
GLmethod.isShader = i++;
GLmethod.isTexture = i++;
GLmethod.lineWidth = i++;
GLmethod.linkProgram = i++;
GLmethod.pixelStorei = i++;
GLmethod.polygonOffset = i++;
GLmethod.readPixels = i++;
GLmethod.renderbufferStorage = i++;
GLmethod.sampleCoverage = i++;
GLmethod.scissor = i++;
GLmethod.shaderSource = i++;
GLmethod.stencilFunc = i++;
GLmethod.stencilFuncSeparate = i++;
GLmethod.stencilMask = i++;
GLmethod.stencilMaskSeparate = i++;
GLmethod.stencilOp = i++;
GLmethod.stencilOpSeparate = i++;
GLmethod.texImage2D = i++;
GLmethod.texParameterf = i++;
GLmethod.texParameteri = i++;
GLmethod.texSubImage2D = i++;
GLmethod.uniform1f = i++;
GLmethod.uniform1fv = i++;
GLmethod.uniform1i = i++;
GLmethod.uniform1iv = i++;
GLmethod.uniform2f = i++;
GLmethod.uniform2fv = i++;
GLmethod.uniform2i = i++;
GLmethod.uniform2iv = i++;
GLmethod.uniform3f = i++;
GLmethod.uniform3fv = i++;
GLmethod.uniform3i = i++;
GLmethod.uniform3iv = i++;
GLmethod.uniform4f = i++;
GLmethod.uniform4fv = i++;
GLmethod.uniform4i = i++;
GLmethod.uniform4iv = i++;
GLmethod.uniformMatrix2fv = i++;
GLmethod.uniformMatrix3fv = i++;
GLmethod.uniformMatrix4fv = i++;
GLmethod.useProgram = i++;
GLmethod.validateProgram = i++;
GLmethod.vertexAttrib1f = i++;
GLmethod.vertexAttrib2f = i++;
GLmethod.vertexAttrib3f = i++;
GLmethod.vertexAttrib4f = i++;
GLmethod.vertexAttrib1fv = i++;
GLmethod.vertexAttrib2fv = i++;
GLmethod.vertexAttrib3fv = i++;
GLmethod.vertexAttrib4fv = i++;
GLmethod.vertexAttribPointer = i++;
GLmethod.viewport = i++;
const processArray = (array, checkArrayType = false) => {
  function joinArray2(arr, sep) {
    let res = "";
    for (let i2 = 0; i2 < arr.length; i2++) {
      if (i2 !== 0) {
        res += sep;
      }
      res += arr[i2];
    }
    return res;
  }
  let type = "Float32Array";
  if (checkArrayType) {
    if (array instanceof Uint8Array) {
      type = "Uint8Array";
    } else if (array instanceof Uint16Array) {
      type = "Uint16Array";
    } else if (array instanceof Uint32Array) {
      type = "Uint32Array";
    } else if (array instanceof Float32Array) {
      type = "Float32Array";
    } else {
      throw new Error("Check array type failed. Array type is " + typeof array);
    }
  }
  const ArrayTypes = {
    Uint8Array: 1,
    Uint16Array: 2,
    Uint32Array: 4,
    Float32Array: 14
  };
  return ArrayTypes[type] + "," + btoa(joinArray2(array, ","));
};
class WebGLRenderingContext {
  constructor(canvas, type, attrs) {
    this.className = "WebGLRenderingContext";
    this.activeTexture = function(textureUnit) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.activeTexture + "," + textureUnit, true);
    };
    this.attachShader = function(progarm, shader) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.attachShader + "," + progarm.id + "," + shader.id, true);
    };
    this.bindAttribLocation = function(program, index, name2) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.bindAttribLocation + "," + program.id + "," + index + "," + name2, true);
    };
    this.bindBuffer = function(target2, buffer) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.bindBuffer + "," + target2 + "," + (buffer ? buffer.id : 0), true);
    };
    this.bindFramebuffer = function(target2, framebuffer) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.bindFramebuffer + "," + target2 + "," + (framebuffer ? framebuffer.id : 0), true);
    };
    this.bindRenderbuffer = function(target2, renderBuffer) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.bindRenderbuffer + "," + target2 + "," + (renderBuffer ? renderBuffer.id : 0), true);
    };
    this.bindTexture = function(target2, texture) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.bindTexture + "," + target2 + "," + (texture ? texture.id : 0), true);
    };
    this.blendColor = function(r, g, b, a) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.blendColor + "," + target + "," + r + "," + g + "," + b + "," + a, true);
    };
    this.blendEquation = function(mode) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.blendEquation + "," + mode, true);
    };
    this.blendEquationSeparate = function(modeRGB, modeAlpha) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.blendEquationSeparate + "," + modeRGB + "," + modeAlpha, true);
    };
    this.blendFunc = function(sfactor, dfactor) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.blendFunc + "," + sfactor + "," + dfactor, true);
    };
    this.blendFuncSeparate = function(srcRGB, dstRGB, srcAlpha, dstAlpha) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.blendFuncSeparate + "," + srcRGB + "," + dstRGB + "," + srcAlpha + "," + dstAlpha, true);
    };
    this.bufferData = function(target2, data, usage) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.bufferData + "," + target2 + "," + processArray(data, true) + "," + usage, true);
    };
    this.bufferSubData = function(target2, offset, data) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.bufferSubData + "," + target2 + "," + offset + "," + processArray(data, true), true);
    };
    this.checkFramebufferStatus = function(target2) {
      const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.checkFramebufferStatus + "," + target2);
      return Number(result);
    };
    this.clear = function(mask) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.clear + "," + mask);
      this._canvas._needRender = true;
    };
    this.clearColor = function(r, g, b, a) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.clearColor + "," + r + "," + g + "," + b, true);
    };
    this.clearDepth = function(depth) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.clearDepth + "," + depth, true);
    };
    this.clearStencil = function(s) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.clearStencil + "," + s);
    };
    this.colorMask = function(r, g, b, a) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.colorMask + "," + r + "," + g + "," + b + "," + a);
    };
    this.compileShader = function(shader) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.compileShader + "," + shader.id, true);
    };
    this.compressedTexImage2D = function(target2, level, internalformat, width, height, border, pixels) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.compressedTexImage2D + "," + target2 + "," + level + "," + internalformat + "," + width + "," + height + "," + border + "," + processArray(pixels), true);
    };
    this.compressedTexSubImage2D = function(target2, level, xoffset, yoffset, width, height, format, pixels) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.compressedTexSubImage2D + "," + target2 + "," + level + "," + xoffset + "," + yoffset + "," + width + "," + height + "," + format + "," + processArray(pixels), true);
    };
    this.copyTexImage2D = function(target2, level, internalformat, x, y, width, height, border) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.copyTexImage2D + "," + target2 + "," + level + "," + internalformat + "," + x + "," + y + "," + width + "," + height + "," + border, true);
    };
    this.copyTexSubImage2D = function(target2, level, xoffset, yoffset, x, y, width, height) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.copyTexSubImage2D + "," + target2 + "," + level + "," + xoffset + "," + yoffset + "," + x + "," + y + "," + width + "," + height);
    };
    this.createBuffer = function() {
      const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.createBuffer + "");
      const buffer = new WebGLBuffer(result);
      this._map.set(buffer.uuid(), buffer);
      return buffer;
    };
    this.createFramebuffer = function() {
      const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.createFramebuffer + "");
      const framebuffer = new WebGLFramebuffer(result);
      this._map.set(framebuffer.uuid(), framebuffer);
      return framebuffer;
    };
    this.createProgram = function() {
      const id = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.createProgram + "");
      const program = new WebGLProgram(id);
      this._map.set(program.uuid(), program);
      return program;
    };
    this.createRenderbuffer = function() {
      const id = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.createRenderbuffer + "");
      const renderBuffer = new WebGLRenderbuffer(id);
      this._map.set(renderBuffer.uuid(), renderBuffer);
      return renderBuffer;
    };
    this.createShader = function(type) {
      const id = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.createShader + "," + type);
      const shader = new WebGLShader(id, type);
      this._map.set(shader.uuid(), shader);
      return shader;
    };
    this.createTexture = function() {
      const id = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.createTexture + "");
      const texture = new WebGLTexture(id);
      this._map.set(texture.uuid(), texture);
      return texture;
    };
    this.cullFace = function(mode) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.cullFace + "," + mode, true);
    };
    this.deleteBuffer = function(buffer) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.deleteBuffer + "," + buffer.id, true);
    };
    this.deleteFramebuffer = function(framebuffer) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.deleteFramebuffer + "," + framebuffer.id, true);
    };
    this.deleteProgram = function(program) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.deleteProgram + "," + program.id, true);
    };
    this.deleteRenderbuffer = function(renderbuffer2) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.deleteRenderbuffer + "," + renderbuffer2.id, true);
    };
    this.deleteShader = function(shader) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.deleteShader + "," + shader.id, true);
    };
    this.deleteTexture = function(texture) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.deleteTexture + "," + texture.id, true);
    };
    this.depthFunc = function(func) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.depthFunc + "," + func);
    };
    this.depthMask = function(flag) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.depthMask + "," + Number(flag), true);
    };
    this.depthRange = function(zNear, zFar) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.depthRange + "," + zNear + "," + zFar, true);
    };
    this.detachShader = function(program, shader) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.detachShader + "," + program.id + "," + shader.id, true);
    };
    this.disable = function(cap) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.disable + "," + cap, true);
    };
    this.disableVertexAttribArray = function(index) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.disableVertexAttribArray + "," + index, true);
    };
    this.drawArrays = function(mode, first, count) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.drawArrays + "," + mode + "," + first + "," + count);
      this._canvas._needRender = true;
    };
    this.drawElements = function(mode, count, type, offset) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.drawElements + "," + mode + "," + count + "," + type + "," + offset + ";");
      this._canvas._needRender = true;
    };
    this.enable = function(cap) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.enable + "," + cap, true);
    };
    this.enableVertexAttribArray = function(index) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.enableVertexAttribArray + "," + index, true);
    };
    this.flush = function() {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.flush + "");
    };
    this.framebufferRenderbuffer = function(target2, attachment, textarget, texture, level) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.framebufferRenderbuffer + "," + target2 + "," + attachment + "," + textarget + "," + (texture ? texture.id : 0) + "," + level, true);
    };
    this.framebufferTexture2D = function(target2, attachment, textarget, texture, level) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.framebufferTexture2D + "," + target2 + "," + attachment + "," + textarget + "," + (texture ? texture.id : 0) + "," + level, true);
    };
    this.frontFace = function(mode) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.frontFace + "," + mode, true);
    };
    this.generateMipmap = function(target2) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.generateMipmap + "," + target2, true);
    };
    this.getActiveAttrib = function(progarm, index) {
      const resultString = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getActiveAttrib + "," + progarm.id + "," + index);
      const [type, size, name2] = resultString.split(",");
      return new WebGLActiveInfo({
        type: Number(type),
        size: Number(size),
        name: name2
      });
    };
    this.getActiveUniform = function(progarm, index) {
      const resultString = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getActiveUniform + "," + progarm.id + "," + index);
      const [type, size, name2] = resultString.split(",");
      return new WebGLActiveInfo({
        type: Number(type),
        size: Number(size),
        name: name2
      });
    };
    this.getAttachedShaders = function(progarm) {
      const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getAttachedShaders + "," + progarm.id);
      const [type, ...ids] = result;
      return ids.map((id) => this._map.get(WebGLShader.uuid(id)));
    };
    this.getAttribLocation = function(progarm, name2) {
      return WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getAttribLocation + "," + progarm.id + "," + name2);
    };
    this.getBufferParameter = function(target2, pname) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getBufferParameter + "," + target2 + "," + pname);
      const [type, res] = getBufferParameter;
      return res;
    };
    this.getError = function() {
      const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getError + "");
      return result;
    };
    this.getExtension = function(name2) {
      return null;
    };
    this.getFramebufferAttachmentParameter = function(target2, attachment, pname) {
      const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getFramebufferAttachmentParameter + "," + target2 + "," + attachment + "," + pname);
      switch (pname) {
        case GLenum.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME:
          return this._map.get(WebGLRenderbuffer.uuid(result)) || this._map.get(WebGLTexture.uuid(result)) || null;
        default:
          return result;
      }
    };
    this.getParameter = function(pname) {
      const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getParameter + "," + pname);
      switch (pname) {
        case GLenum.VERSION:
          return this._version;
        case GLenum.ARRAY_BUFFER_BINDING:
        case GLenum.ELEMENT_ARRAY_BUFFER_BINDING:
          return this._map.get(WebGLBuffer.uuid(result)) || null;
        case GLenum.CURRENT_PROGRAM:
          return this._map.get(WebGLProgram.uuid(result)) || null;
        case GLenum.FRAMEBUFFER_BINDING:
          return this._map.get(WebGLFramebuffer.uuid(result)) || null;
        case GLenum.RENDERBUFFER_BINDING:
          return this._map.get(WebGLRenderbuffer.uuid(result)) || null;
        case GLenum.TEXTURE_BINDING_2D:
        case GLenum.TEXTURE_BINDING_CUBE_MAP:
          return this._map.get(WebGLTexture.uuid(result)) || null;
        case GLenum.ALIASED_LINE_WIDTH_RANGE:
        case GLenum.ALIASED_POINT_SIZE_RANGE:
        case GLenum.BLEND_COLOR:
        case GLenum.COLOR_CLEAR_VALUE:
        case GLenum.DEPTH_RANGE:
        case GLenum.MAX_VIEWPORT_DIMS:
        case GLenum.SCISSOR_BOX:
        case GLenum.VIEWPORT:
        case GLenum.COMPRESSED_TEXTURE_FORMATS:
        default:
          const [type, ...res] = result.split(",");
          if (res.length === 1) {
            return Number(res[0]);
          } else {
            return res.map(Number);
          }
      }
    };
    this.getProgramInfoLog = function(progarm) {
      return WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getProgramInfoLog + "," + progarm.id);
    };
    this.getProgramParameter = function(program, pname) {
      const res = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getProgramParameter + "," + program.id + "," + pname);
      const [type, result] = res.split(",").map((i2) => parseInt(i2));
      if (type === 1) {
        return Boolean(result);
      } else if (type === 2) {
        return result;
      } else {
        throw new Error("Unrecongized program paramater " + res + ", type: " + typeof res);
      }
    };
    this.getRenderbufferParameter = function(target2, pname) {
      const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getRenderbufferParameter + "," + target2 + "," + pname);
      return result;
    };
    this.getShaderInfoLog = function(shader) {
      return WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getShaderInfoLog + "," + shader.id);
    };
    this.getShaderParameter = function(shader, pname) {
      return WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getShaderParameter + "," + shader.id + "," + pname);
    };
    this.getShaderPrecisionFormat = function(shaderType, precisionType) {
      const [rangeMin, rangeMax, precision] = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getShaderPrecisionFormat + "," + shaderType + "," + precisionType);
      const shaderPrecisionFormat = new WebGLShaderPrecisionFormat({
        rangeMin: Number(rangeMin),
        rangeMax: Number(rangeMax),
        precision: Number(precision)
      });
      return shaderPrecisionFormat;
    };
    this.getShaderSource = function(shader) {
      const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getShaderSource + "," + shader.id);
      return result;
    };
    this.getSupportedExtensions = function() {
      return Object.keys({});
    };
    this.getTexParameter = function(target2, pname) {
      const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getTexParameter + "," + target2 + "," + pname);
      return result;
    };
    this.getUniformLocation = function(program, name2) {
      const id = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getUniformLocation + "," + program.id + "," + name2);
      if (id === -1) {
        return null;
      } else {
        return new WebGLUniformLocation(Number(id));
      }
    };
    this.getVertexAttrib = function(index, pname) {
      const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getVertexAttrib + "," + index + "," + pname);
      switch (pname) {
        case GLenum.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING:
          return this._map.get(WebGLBuffer.uuid(result)) || null;
        case GLenum.CURRENT_VERTEX_ATTRIB:
        default:
          return result;
      }
    };
    this.getVertexAttribOffset = function(index, pname) {
      const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.getVertexAttribOffset + "," + index + "," + pname);
      return Number(result);
    };
    this.isBuffer = function(buffer) {
      const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.isBuffer + "," + buffer.id);
      return Boolean(result);
    };
    this.isContextLost = function() {
      return false;
    };
    this.isEnabled = function(cap) {
      const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.isEnabled + "," + cap);
      return Boolean(result);
    };
    this.isFramebuffer = function(framebuffer) {
      const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.isFramebuffer + "," + framebuffer.id);
      return Boolean(result);
    };
    this.isProgram = function(program) {
      const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.isProgram + "," + program.id);
      return Boolean(result);
    };
    this.isRenderbuffer = function(renderBuffer) {
      const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.isRenderbuffer + "," + renderbuffer.id);
      return Boolean(result);
    };
    this.isShader = function(shader) {
      const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.isShader + "," + shader.id);
      return Boolean(result);
    };
    this.isTexture = function(texture) {
      const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.isTexture + "," + texture.id);
      return Boolean(result);
    };
    this.lineWidth = function(width) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.lineWidth + "," + width, true);
    };
    this.linkProgram = function(program) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.linkProgram + "," + program.id, true);
    };
    this.pixelStorei = function(pname, param) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.pixelStorei + "," + pname + "," + Number(param));
    };
    this.polygonOffset = function(factor, units) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.polygonOffset + "," + factor + "," + units);
    };
    this.readPixels = function(x, y, width, height, format, type, pixels) {
      const result = WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.readPixels + "," + x + "," + y + "," + width + "," + height + "," + format + "," + type);
      return result;
    };
    this.renderbufferStorage = function(target2, internalFormat, width, height) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.renderbufferStorage + "," + target2 + "," + internalFormat + "," + width + "," + height, true);
    };
    this.sampleCoverage = function(value, invert) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.sampleCoverage + "," + value + "," + Number(invert), true);
    };
    this.scissor = function(x, y, width, height) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.scissor + "," + x + "," + y + "," + width + "," + height, true);
    };
    this.shaderSource = function(shader, source) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.shaderSource + "," + shader.id + "," + source);
    };
    this.stencilFunc = function(func, ref, mask) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.stencilFunc + "," + func + "," + ref + "," + mask, true);
    };
    this.stencilFuncSeparate = function(face, func, ref, mask) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.stencilFuncSeparate + "," + face + "," + func + "," + ref + "," + mask, true);
    };
    this.stencilMask = function(mask) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.stencilMask + "," + mask, true);
    };
    this.stencilMaskSeparate = function(face, mask) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.stencilMaskSeparate + "," + face + "," + mask, true);
    };
    this.stencilOp = function(fail, zfail, zpass) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.stencilOp + "," + fail + "," + zfail + "," + zpass);
    };
    this.stencilOpSeparate = function(face, fail, zfail, zpass) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.stencilOp + "," + face + "," + fail + "," + zfail + "," + zpass, true);
    };
    this.texImage2D = function(...args) {
      WebGLRenderingContext.GBridge.texImage2D(this._canvas.id, ...args);
    };
    this.texParameterf = function(target2, pname, param) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.texParameterf + "," + target2 + "," + pname + "," + param, true);
    };
    this.texParameteri = function(target2, pname, param) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.texParameteri + "," + target2 + "," + pname + "," + param);
    };
    this.texSubImage2D = function(...args) {
      WebGLRenderingContext.GBridge.texSubImage2D(this._canvas.id, ...args);
    };
    this.uniform1f = function(location, v0) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform1f + "," + location.id + "," + v0);
    };
    this.uniform1fv = function(location, value) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform1fv + "," + location.id + "," + processArray(value), true);
    };
    this.uniform1i = function(location, v0) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform1i + "," + location.id + "," + v0);
    };
    this.uniform1iv = function(location, value) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform1iv + "," + location.id + "," + processArray(value), true);
    };
    this.uniform2f = function(location, v0, v1) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform2f + "," + location.id + "," + v0 + "," + v1, true);
    };
    this.uniform2fv = function(location, value) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform2fv + "," + location.id + "," + processArray(value), true);
    };
    this.uniform2i = function(location, v0, v1) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform2i + "," + location.id + "," + v0 + "," + v1, true);
    };
    this.uniform2iv = function(location, value) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform2iv + "," + location.id + "," + processArray(value), true);
    };
    this.uniform3f = function(location, v0, v1, v2) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform3f + "," + location.id + "," + v0 + "," + v1 + "," + v2, true);
    };
    this.uniform3fv = function(location, value) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform3fv + "," + location.id + "," + processArray(value), true);
    };
    this.uniform3i = function(location, v0, v1, v2) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform3i + "," + location.id + "," + v0 + "," + v1 + "," + v2, true);
    };
    this.uniform3iv = function(location, value) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform3iv + "," + location.id + "," + processArray(value), true);
    };
    this.uniform4f = function(location, v0, v1, v2, v3) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform4f + "," + location.id + "," + v0 + "," + v1 + "," + v2 + "," + v3, true);
    };
    this.uniform4fv = function(location, value) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform4fv + "," + location.id + "," + processArray(value), true);
    };
    this.uniform4i = function(location, v0, v1, v2, v3) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform4i + "," + location.id + "," + v0 + "," + v1 + "," + v2 + "," + v3, true);
    };
    this.uniform4iv = function(location, value) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniform4iv + "," + location.id + "," + processArray(value, true), true);
    };
    this.uniformMatrix2fv = function(location, transpose, value) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniformMatrix2fv + "," + location.id + "," + Number(transpose) + "," + processArray(value), true);
    };
    this.uniformMatrix3fv = function(location, transpose, value) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniformMatrix3fv + "," + location.id + "," + Number(transpose) + "," + processArray(value), true);
    };
    this.uniformMatrix4fv = function(location, transpose, value) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.uniformMatrix4fv + "," + location.id + "," + Number(transpose) + "," + processArray(value), true);
    };
    this.useProgram = function(progarm) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.useProgram + "," + progarm.id, true);
    };
    this.validateProgram = function(program) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.validateProgram + "," + program.id, true);
    };
    this.vertexAttrib1f = function(index, v0) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.vertexAttrib1f + "," + index + "," + v0, true);
    };
    this.vertexAttrib2f = function(index, v0, v1) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.vertexAttrib2f + "," + index + "," + v0 + "," + v1, true);
    };
    this.vertexAttrib3f = function(index, v0, v1, v2) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.vertexAttrib3f + "," + index + "," + v0 + "," + v1 + "," + v2, true);
    };
    this.vertexAttrib4f = function(index, v0, v1, v2, v3) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.vertexAttrib4f + "," + index + "," + v0 + "," + v1 + "," + v2 + "," + v3, true);
    };
    this.vertexAttrib1fv = function(index, value) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.vertexAttrib1fv + "," + index + "," + processArray(value), true);
    };
    this.vertexAttrib2fv = function(index, value) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.vertexAttrib2fv + "," + index + "," + processArray(value), true);
    };
    this.vertexAttrib3fv = function(index, value) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.vertexAttrib3fv + "," + index + "," + processArray(value), true);
    };
    this.vertexAttrib4fv = function(index, value) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.vertexAttrib4fv + "," + index + "," + processArray(value), true);
    };
    this.vertexAttribPointer = function(index, size, type, normalized, stride, offset) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.vertexAttribPointer + "," + index + "," + size + "," + type + "," + Number(normalized) + "," + stride + "," + offset, true);
    };
    this.viewport = function(x, y, width, height) {
      WebGLRenderingContext.GBridge.callNative(this._canvas.id, GLmethod.viewport + "," + x + "," + y + "," + width + "," + height, true);
    };
    this._canvas = canvas;
    this._type = type;
    this._version = "WebGL 1.0";
    this._attrs = attrs;
    this._map = /* @__PURE__ */ new Map();
    Object.keys(GLenum).forEach((name2) => Object.defineProperty(this, name2, {
      value: GLenum[name2]
    }));
  }
  get canvas() {
    return this._canvas;
  }
}
class GCanvas {
  constructor(id, { disableAutoSwap }) {
    this.id = null;
    this._needRender = true;
    this.id = id;
    this._disableAutoSwap = disableAutoSwap;
    if (disableAutoSwap) {
      this._swapBuffers = () => {
        GCanvas.GBridge.render(this.id);
      };
    }
  }
  getContext(type) {
    let context = null;
    if (type.match(/webgl/i)) {
      context = new WebGLRenderingContext(this);
      context.componentId = this.id;
      if (!this._disableAutoSwap) {
        const render = () => {
          if (this._needRender) {
            GCanvas.GBridge.render(this.id);
            this._needRender = false;
          }
        };
        setInterval(render, 16);
      }
      GCanvas.GBridge.callSetContextType(this.id, 1);
    } else if (type.match(/2d/i)) {
      context = new CanvasRenderingContext2D(this);
      context.componentId = this.id;
      GCanvas.GBridge.callSetContextType(this.id, 0);
    } else {
      throw new Error("not supported context " + type);
    }
    return context;
  }
  reset() {
    GCanvas.GBridge.callReset(this.id);
  }
}
const isWeex = typeof WXEnvironment !== "undefined";
const isWeexIOS = isWeex && /ios/i.test(WXEnvironment.platform);
const isWeexAndroid = isWeex && !isWeexIOS;
const GCanvasModule = typeof weex !== "undefined" && weex.requireModule ? weex.requireModule("gcanvas") : typeof __weex_require__ !== "undefined" ? __weex_require__("@weex-module/gcanvas") : {};
let isDebugging = false;
let isComboDisabled = false;
const logCommand = function() {
  const methodQuery = [];
  Object.keys(GLmethod).forEach((key) => {
    methodQuery[GLmethod[key]] = key;
  });
  const queryMethod = (id) => {
    return methodQuery[parseInt(id)] || "NotFoundMethod";
  };
  const logCommand2 = (id, cmds) => {
    const mId = cmds.split(",")[0];
    const mName = queryMethod(mId);
    formatAppLog("log", "at tmui/tool/gcanvas/bridge/bridge-weex.js:26", `=== callNative - componentId:${id}; method: ${mName}; cmds: ${cmds}`);
  };
  return logCommand2;
}();
function joinArray(arr, sep) {
  let res = "";
  for (let i2 = 0; i2 < arr.length; i2++) {
    if (i2 !== 0) {
      res += sep;
    }
    res += arr[i2];
  }
  return res;
}
const commandsCache = {};
const GBridge = {
  callEnable: (ref, configArray) => {
    commandsCache[ref] = [];
    return GCanvasModule.enable({
      componentId: ref,
      config: configArray
    });
  },
  callEnableDebug: () => {
    isDebugging = true;
  },
  callEnableDisableCombo: () => {
    isComboDisabled = true;
  },
  callSetContextType: function(componentId2, context_type) {
    GCanvasModule.setContextType(context_type, componentId2);
  },
  callReset: function(id) {
    GCanvasModule.resetComponent && canvasModule.resetComponent(componentId);
  },
  render: isWeexIOS ? function(componentId2) {
    return GCanvasModule.extendCallNative({
      contextId: componentId2,
      type: 1610612737
    });
  } : function(componentId2) {
    return callGCanvasLinkNative(componentId2, 1610612737, "render");
  },
  render2d: isWeexIOS ? function(componentId2, commands, callback) {
    if (isDebugging) {
      formatAppLog("log", "at tmui/tool/gcanvas/bridge/bridge-weex.js:84", ">>> >>> render2d ===");
      formatAppLog("log", "at tmui/tool/gcanvas/bridge/bridge-weex.js:85", ">>> commands: " + commands);
    }
    GCanvasModule.render([commands, callback ? true : false], componentId2, callback);
  } : function(componentId2, commands, callback) {
    if (isDebugging) {
      formatAppLog("log", "at tmui/tool/gcanvas/bridge/bridge-weex.js:93", ">>> >>> render2d ===");
      formatAppLog("log", "at tmui/tool/gcanvas/bridge/bridge-weex.js:94", ">>> commands: " + commands);
    }
    callGCanvasLinkNative(componentId2, 536870913, commands);
    if (callback) {
      callback();
    }
  },
  callExtendCallNative: isWeexIOS ? function(componentId2, cmdArgs) {
    throw "should not be here anymore " + cmdArgs;
  } : function(componentId2, cmdArgs) {
    throw "should not be here anymore " + cmdArgs;
  },
  flushNative: isWeexIOS ? function(componentId2) {
    const cmdArgs = joinArray(commandsCache[componentId2], ";");
    commandsCache[componentId2] = [];
    if (isDebugging) {
      formatAppLog("log", "at tmui/tool/gcanvas/bridge/bridge-weex.js:120", ">>> >>> flush native ===");
      formatAppLog("log", "at tmui/tool/gcanvas/bridge/bridge-weex.js:121", ">>> commands: " + cmdArgs);
    }
    const result = GCanvasModule.extendCallNative({
      "contextId": componentId2,
      "type": 1610612736,
      "args": cmdArgs
    });
    const res = result && result.result;
    if (isDebugging) {
      formatAppLog("log", "at tmui/tool/gcanvas/bridge/bridge-weex.js:133", ">>> result: " + res);
    }
    return res;
  } : function(componentId2) {
    const cmdArgs = joinArray(commandsCache[componentId2], ";");
    commandsCache[componentId2] = [];
    if (isDebugging) {
      formatAppLog("log", "at tmui/tool/gcanvas/bridge/bridge-weex.js:144", ">>> >>> flush native ===");
      formatAppLog("log", "at tmui/tool/gcanvas/bridge/bridge-weex.js:145", ">>> commands: " + cmdArgs);
    }
    const result = callGCanvasLinkNative(componentId2, 1610612736, cmdArgs);
    if (isDebugging) {
      formatAppLog("log", "at tmui/tool/gcanvas/bridge/bridge-weex.js:151", ">>> result: " + result);
    }
    return result;
  },
  callNative: function(componentId2, cmdArgs, cache) {
    if (isDebugging) {
      logCommand(componentId2, cmdArgs);
    }
    commandsCache[componentId2].push(cmdArgs);
    if (!cache || isComboDisabled) {
      return GBridge.flushNative(componentId2);
    } else {
      return void 0;
    }
  },
  texImage2D(componentId2, ...args) {
    if (isWeexIOS) {
      if (args.length === 6) {
        const [target2, level, internalformat, format, type, image2] = args;
        GBridge.callNative(componentId2, GLmethod.texImage2D + "," + 6 + "," + target2 + "," + level + "," + internalformat + "," + format + "," + type + "," + image2.src);
      } else if (args.length === 9) {
        const [target2, level, internalformat, width, height, border, format, type, image2] = args;
        GBridge.callNative(componentId2, GLmethod.texImage2D + "," + 9 + "," + target2 + "," + level + "," + internalformat + "," + width + "," + height + "," + border + "," + +format + "," + type + "," + (image2 ? image2.src : 0));
      }
    } else if (isWeexAndroid) {
      if (args.length === 6) {
        const [target2, level, internalformat, format, type, image2] = args;
        GCanvasModule.texImage2D(componentId2, target2, level, internalformat, format, type, image2.src);
      } else if (args.length === 9) {
        const [target2, level, internalformat, width, height, border, format, type, image2] = args;
        GCanvasModule.texImage2D(componentId2, target2, level, internalformat, width, height, border, format, type, image2 ? image2.src : 0);
      }
    }
  },
  texSubImage2D(componentId2, target2, level, xoffset, yoffset, format, type, image2) {
    if (isWeexIOS) {
      if (arguments.length === 8) {
        GBridge.callNative(componentId2, GLmethod.texSubImage2D + "," + 6 + "," + target2 + "," + level + "," + xoffset + "," + yoffset, +"," + format + "," + type + "," + image2.src);
      }
    } else if (isWeexAndroid) {
      GCanvasModule.texSubImage2D(componentId2, target2, level, xoffset, yoffset, format, type, image2.src);
    }
  },
  bindImageTexture(componentId2, src, imageId) {
    GCanvasModule.bindImageTexture([src, imageId], componentId2);
  },
  perloadImage([url, id], callback) {
    GCanvasModule.preLoadImage([url, id], function(image2) {
      image2.url = url;
      image2.id = id;
      callback(image2);
    });
  },
  measureText(text, fontStyle, componentId2) {
    return GCanvasModule.measureText([text, fontStyle], componentId2);
  },
  getImageData(componentId2, x, y, w, h, callback) {
    GCanvasModule.getImageData([x, y, w, h], componentId2, callback);
  },
  putImageData(componentId2, data, x, y, w, h, callback) {
    GCanvasModule.putImageData([x, y, w, h, data], componentId2, callback);
  },
  toTempFilePath(componentId2, x, y, width, height, destWidth, destHeight, fileType, quality, callback) {
    GCanvasModule.toTempFilePath([x, y, width, height, destWidth, destHeight, fileType, quality], componentId2, callback);
  }
};
let WeexBridge = GBridge;
function enable(el, { bridge, debug, disableAutoSwap, disableComboCommands } = {}) {
  const GBridge2 = GImage.GBridge = GCanvas.GBridge = WebGLRenderingContext.GBridge = CanvasRenderingContext2D.GBridge = bridge;
  GBridge2.callEnable(el.ref, [
    0,
    -1,
    false,
    false,
    1,
    "white",
    false
  ]);
  if (debug === true) {
    GBridge2.callEnableDebug();
  }
  if (disableComboCommands) {
    GBridge2.callEnableDisableCombo();
  }
  var canvas = new GCanvas(el.ref, { disableAutoSwap });
  canvas.width = el.style.width;
  canvas.height = el.style.height;
  return canvas;
}
export { WeexBridge as W, enable as e };
