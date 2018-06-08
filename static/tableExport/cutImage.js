// Array.prototype.deldel = function (h) {
//     h.sort();
//     for (var q = this.concat([]), b = h.length - 1; 0 <= b; b--) q = q.slice(0, h[b]).concat(q.slice(h[b] + 1));
//     return q
// };
HTMLImageElement.prototype.loadOnce = function (h) {
    var q = 0;
    this.onload = function () {
        q || h.call(this, null);
        q++
    }
};
(function (h) {
    var q = {
        lib: [],
        init: function () {
            this.require("config")
        },
        module: function (b, a) {
            this.lib[b] = a.call(null, this)
        },
        require: function (b) {
            var a = this,
                c = document.createElement("script");
            document.body.appendChild(c);
            c.src = "./js/module/" + b + ".js";
            c.onload = c.onerror = function (c) {
                a.handlerror(c)
            }
        },
        handlerror: function () {},
        destroySelf: function (b) {
            delete window[h];
            throw Error(b);
        },
        reflect: function (b, a, c) {
            b = this.lib.config.getModuleName(b);
            return this.lib[b].process(a, c)
        },
        reflectEasy: function (b) {
            b = this.lib.config.getEasyFun(b);
            return this.lib.easy.getFun(b)
        },
        add: function (b, a, c, f, g, e, j, l) {
            return this.lib.addLayer.add(b, a, c, f, g, e, j, l)
        },
        applyMatrix: function () {}
    };
    window[h] = function (b, a, c) {
        if (this instanceof window[h]) {
            this.startTime = +new Date;
            var f = document.createElement("canvas"),
                g = f.getContext("2d");
            isNaN(b) ? (f.width = parseInt(b.width), f.height = parseInt(b.height), a = getComputedStyle(b), imgWidth = parseInt(a.getPropertyValue("width")), imgHeight = parseInt(a.getPropertyValue("height")), isNaN(imgWidth) ? g.drawImage(b, 0, 0) : g.drawImage(b,
                0, 0, imgWidth, imgHeight)) : (f.width = b, f.height = a, g.fillStyle = c || "#fff", g.fillRect(0, 0, b, a));
            this.canvas = f;
            this.context = g;
            this.imgData = g.getImageData(0, 0, f.width, f.height);
            this.name = h + "_" + Math.random();
            this.canvas.id = this.name;
            this.layers = [];
            b = document.createElement("canvas");
            b.width = f.width;
            b.height = f.height;
            this.ctxCanvas = b;
            this.ctxContext = f.getContext("2d")
        } else return new window[h](b, a, c)
    };
    window[h].module = function (b, a) {
        q.module(b, a)
    };
    window[h].dorsyMath = function () {
        return q.lib.dorsyMath
    };
    window[h].prototype = {
        act: function (b, a) {
            var c = [],
                c = Array.prototype.slice.call(arguments, 1);
            q.reflect(b, this.imgData, c);
            return this
        },
        view: function (b, a, c, f, g) {
            var e = this.clone();
            e.type = 1;
            this.addLayer(e, "\u6b63\u5e38", 0, 0);
            e.act(b, a, c, f, g);
            return this
        },
        excute: function () {
            var b = this.layers,
                a = b.length;
            b[a - 1] && 1 == b[a - 1][0].type && (this.imgData = b[a - 1][0].imgData, delete b[a - 1])
        },
        cancel: function () {
            var b = this.layers,
                a = b.length;
            b[a - 1] && 1 == b[a - 1][0].type && delete b[a - 1]
        },
        show: function (b, a) {
            var c = new window[h](this.canvas.width, this.canvas.height);
            c.add(this, "\u6b63\u5e38", 0, 0, a);
            this.tempPsLib = c;
            for (var f = 0; f < this.layers.length; f++) {
                var g = this.layers[f],
                    e = g[0].layers,
                    j = g[0];
                e[e.length - 1] && 1 == e[e.length - 1][0].type && (j = e[e.length - 1][0]);
                c.add(j, g[1], g[2], g[3], a)
            }
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.putImageData(c.imgData, 0, 0);
            b ? document.querySelector(b).appendChild(this.canvas) : document.body.appendChild(this.canvas);
            return this
        },
        replace: function (b) {
            b && (b.onload = function () {}, b.src = this.save());
            return this
        },
        add: function () {
            var b = [],
                a, c, f, g, e;
            for (f = 0; f < arguments.length; f++)
                if (f) switch (typeof arguments[f]) {
                    case "string":
                        /\d+%/.test(arguments[f]) ? c = arguments[f].replace("%", "") : /[RGB]+/.test(arguments[f]) ? e = arguments[f] : a = arguments[f];
                        break;
                    case "number":
                        b.push(arguments[f]);
                        break;
                    case "boolean":
                        g = arguments[f]
                }
            f = b[0] || 0;
            b = b[1] || 0;
            this.imgData = q.add(this.imgData, arguments[0].imgData, a || "\u6b63\u5e38", c / 100 || 1, f, b, g || !1, e || "RGB");
            return this
        },
        addLayer: function (b, a, c, f) {
            this.layers.push([b, a, c, f]);
            return this
        },
        clone: function () {
            var b = new window[h](this.canvas.width, this.canvas.height);
            b.context.putImageData(this.imgData, 0, 0);
            b.imgData = b.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
            return b
        },
        swap: function (b, a) {
            var c = this.layers[b];
            this.layers[b] = this.layers[a];
            this.layers[a] = c;
            return this
        },
        deleteLayers: function (b) {
            b.sort();
            var q;
            for (q = this.concat([]), b = h.length - 1; 0 <= b; b--) q = q.slice(0, h[b]).concat(q.slice(h[b] + 1));

            this.layers = q
        },
        save: function (b) {
            if (!this.layers.length) return this.context.putImageData(this.imgData, 0, 0), this.canvas.toDataURL();
            var a = new window[h](this.canvas.width,
                this.canvas.height);
            a.add(this, "\u6b63\u5e38", 0, 0, b);
            this.tempPsLib = a;
            for (var c = 0; c < this.layers.length; c++) {
                var f = this.layers[c],
                    g = f[0].layers,
                    e = f[0];
                g[g.length - 1] && 1 == g[g.length - 1][0].type && (e = g[g.length - 1][0]);
                a.add(e, f[1], f[2], f[3], b)
            }
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.putImageData(a.imgData, 0, 0);
            return this.canvas.toDataURL()
        },
        drawRect: function () {
            var b;
            if (!(b = document.getElementById("imgRect"))) b = document.createElement("canvas"), b.id = "imgRect", document.body.appendChild(b),
                b.width = parseInt(this.canvas.width), b.height = parseInt(this.canvas.height);
            var a = b.getContext("2d");
            a.clearRect(0, 0, b.width, b.height);
            for (var c = [], f = this.tempPsLib.imgData.data, g = 0, e = f.length; g < e; g++) c[f[g]] ? c[f[g]]++ : c[f[g]] = 1;
            a.beginPath();
            a.moveTo(0, b.height);
            for (g = f = 0; 255 > g; g++) c[g] > f && (f = c[g]);
            for (g = 0; 255 > g; g++) e = c[g] || 0, e = b.height - 0.8 * (e / f) * b.height, a.lineTo(g / 256 * b.width, e, 1, 1);
            a.lineTo(b.width + 10, b.height);
            a.fill()
        },
        ps: function (b) {
            var a;
            a = q.reflectEasy(b).call(this);
            this.logTime("\u7ec4\u5408\u6548\u679c" +
                b);
            return a
        },
        logTime: function (b) {
            console.log(b + ": " + (+new Date - this.startTime) / 1E3 + "s")
        },
        ctx: function (b) {
            var a = this.ctxContext;
            a.putImageData(this.imgData, 0, 0);
            b.call(a);
            this.imgData = a.getImageData(0, 0, this.canvas.width, this.canvas.height);
            return this
        }
    }
})("psLib");
window.AlloyImage = $AI = window.psLib;
(function (h) {
    window[h].module("ImageEnhance", function () {
        return {
            process: function (q) {
                for (var b = q.data, a = 0, c = b.length; a < c; a += 4);
                q.data = b;
                return q
            }
        }
    })
})("psLib");
(function (h) {
    window[h].module("addLayer", function () {
        return {
            add: function (q, b, a, c, f, g, e, j) {
                e = q.data;
                var l = b.data;
                f = f || 0;
                g = g || 0;
                c = c || 1;
                j = j || "RGB";
                /[RGB]+/.test(j) || (j = "RGB");
                var n = j.replace("R", "0").replace("G", "1").replace("B", "2"),
                    k;
                j = q.width;
                var h = l.length;
                b = b.width;
                for (var n = [-1 < n.indexOf("0"), -1 < n.indexOf("1"), -1 < n.indexOf("2")], d, p, m = 0, s = e.length; m < s; m += 4)
                    if (d = m / 4, p = parseInt(d / j), d %= j, p -= g, d -= f, p = p * b + d, p *= 4, 0 <= p && p < h - 4 && d < b && 0 <= d)
                        for (d = 0; 3 > d && 0 != l[p + 3]; d++) switch (e[m + 3] = l[p + 3], a) {
                            case "\u989c\u8272\u51cf\u6de1":
                                n[d] &&
                                    (k = e[m + d] + e[m + d] * l[p + d] / (255 - l[p + d]), e[m + d] = (1 - c) * e[m + d] + c * k);
                                break;
                            case "\u53d8\u6697":
                                n[d] && (k = e[m + d] < l[p + d] ? e[m + d] : l[p + d], e[m + d] = (1 - c) * e[m + d] + c * k);
                                break;
                            case "\u53d8\u4eae":
                                n[d] && (k = e[m + d] > l[p + d] ? e[m + d] : l[p + d], e[m + d] = (1 - c) * e[m + d] + c * k);
                                break;
                            case "\u6b63\u7247\u53e0\u5e95":
                                n[d] && (k = parseInt(e[m + d] * l[p + d] / 255), e[m + d] = (1 - c) * e[m + d] + c * k);
                                break;
                            case "\u6ee4\u8272":
                                n[d] && (k = parseInt(255 - (255 - e[m + d]) * (255 - l[p + d]) / 255), e[m + d] = (1 - c) * e[m + d] + c * k);
                                break;
                            case "\u53e0\u52a0":
                                n[d] && (k = 127.5 >= e[m + d] ? e[m + d] * l[p +
                                    d] / 127.5 : 255 - (255 - e[m + d]) * (255 - l[p + d]) / 127.5, e[m + d] = (1 - c) * e[m + d] + c * k);
                                break;
                            case "\u5f3a\u5149":
                                n[d] && (k = 127.5 >= l[p + d] ? e[m + d] * l[p + d] / 127.5 : e[m + d] + (255 - e[m + d]) * (l[p + d] - 127.5) / 127.5, e[m + d] = (1 - c) * e[m + d] + c * k);
                                break;
                            case "\u5dee\u503c":
                                n[d] && (k = e[m + d] > l[p + d] ? e[m + d] - l[p + d] : l[p + d] - e[m + d], e[m + d] = (1 - c) * e[m + d] + c * k);
                                break;
                            case "\u6392\u9664":
                                n[d] && (k = e[m + d] + l[p + d] - e[m + d] * l[p + d] / 127.5, e[m + d] = (1 - c) * e[m + d] + c * k);
                                break;
                            case "\u70b9\u5149":
                                n[d] && (k = e[m + d] < 2 * l[p + d] - 255 ? 2 * l[p + d] - 255 : e[m + d] < 2 * l[p + d] ? e[m + d] : 2 * l[p + d],
                                    e[m + d] = (1 - c) * e[m + d] + c * k);
                                break;
                            case "\u989c\u8272\u52a0\u6df1":
                                n[d] && (k = 255 - 255 * (255 - e[m + d]) / l[p + d], e[m + d] = (1 - c) * e[m + d] + c * k);
                                break;
                            case "\u7ebf\u6027\u52a0\u6df1":
                                n[d] && (k = e[m + d] + l[p + d], k = 255 < k ? k - 255 : 0, e[m + d] = (1 - c) * e[m + d] + c * k);
                                break;
                            case "\u7ebf\u6027\u51cf\u6de1":
                                n[d] && (k = e[m + d] + l[p + d], k = 255 < k ? 255 : k, e[m + d] = (1 - c) * e[m + d] + c * k);
                                break;
                            case "\u67d4\u5149":
                                n[d] && (k = 127.5 > l[p + d] ? ((2 * l[p + d] - 255) * (255 - e[m + d]) / 65025 + 1) * e[m + d] : (2 * l[p + d] - 255) * (Math.sqrt(e[m + d] / 255) - e[m + d] / 255) + e[m + d], e[m + d] = (1 - c) * e[m + d] + c * k);
                                break;
                            case "\u4eae\u5149":
                                n[d] && (k = 127.5 > l[p + d] ? 255 * (1 - (255 - e[m + d]) / (2 * l[p + d])) : e[m + d] / (2 * (1 - l[p + d] / 255)), e[m + d] = (1 - c) * e[m + d] + c * k);
                                break;
                            case "\u7ebf\u6027\u5149":
                                n[d] && (k = e[m + d] + 2 * l[p + d] - 255, k = 255 < k ? 255 : k, e[m + d] = (1 - c) * e[m + d] + c * k);
                                break;
                            case "\u5b9e\u8272\u6df7\u5408":
                                n[d] && (k = l[p + d] < 255 - e[m + d] ? 0 : 255, e[m + d] = (1 - c) * e[m + d] + c * k);
                                break;
                            default:
                                n[d] && (k = l[p + d], e[m + d] = (1 - c) * e[m + d] + c * k)
                        }
                return q
            }
        }
    })
})("psLib");
(function (h) {
    window[h].module("brightness", function () {
        return {
            process: function (q, b) {
                for (var a = q.data, c = b[0] / 50, f = Math.tan((45 + 44 * ((b[1] || 0) / 50)) * Math.PI / 180), g = 0, e = a.length; g < e; g += 4)
                    for (var j = 0; 3 > j; j++) a[g + j] = (a[g + j] - 127.5 * (1 - c)) * f + 127.5 * (1 + c);
                return q
            }
        }
    })
})("psLib");
(function (h) {
    window[h].module("applyMatrix", function (q) {
        return {
            process: function (b) {
                for (var a = b.data, c = b.width, f = new q.lib.dorsyMath.Matrix([-2, -4, -4, -4, -2, -4, 0, 8, 0, -4, -4, 8, 24, 8, -4, -4, 0, 8, 0, -4, -2, -4, -4, -4, -2], 25, 1), g = [], e = 0, j = a.length; e < j; e += 4) {
                    var l = e / 4,
                        n = parseInt(l / c),
                        k = l % c;
                    if (!(0 == n || 0 == k)) {
                        for (var h = [
                                [],
                                [],
                                []
                            ], d = -2; 3 > d; d++)
                            for (var p = n + d, m = -2; 3 > m; m++)
                                for (var s = 4 * (p * c + (k + m)), l = 0; 3 > l; l++) h[l].push(a[s + l]);
                        n = (new q.lib.dorsyMath.Matrix(h, 3, matrixSize)).mutiply(f);
                        for (l = 0; 3 > l; l++) g[e + l] = n.data[l];
                        g[e +
                            4] = a[e + 4]
                    }
                }
                e = 0;
                for (j = a.length; e < j; e++) a[e] = g[e] || a[e];
                return b
            }
        }
    })
})("psLib");
(function (h) {
    window[h].module("config", function () {
        var q = {
                "\u7070\u5ea6\u5904\u7406": "toGray",
                "\u53cd\u8272": "toReverse",
                "\u7070\u5ea6\u9608\u503c": "toThresh",
                "\u9ad8\u65af\u6a21\u7cca": "gaussBlur",
                "\u4eae\u5ea6": "brightness",
                "\u6d6e\u96d5\u6548\u679c": "embossment",
                "\u67e5\u627e\u8fb9\u7f18": "borderline",
                "\u8272\u76f8/\u9971\u548c\u5ea6\u8c03\u8282": "setHSI",
                "\u9a6c\u8d5b\u514b": "mosaic",
                "\u6cb9\u753b": "oilPainting",
                "\u8150\u8680": "corrode",
                "\u9510\u5316": "sharp",
                "\u6dfb\u52a0\u6742\u8272": "noise",
                "\u66f2\u7ebf": "curve",
                "\u6697\u89d2": "darkCorner",
                "\u55b7\u70b9": "dotted"
            },
            b = {
                "\u7f8e\u80a4": "softenFace",
                "\u7d20\u63cf": "sketch",
                "\u81ea\u7136\u589e\u5f3a": "softEnhancement",
                "\u7d2b\u8c03": "purpleStyle",
                "\u67d4\u7126": "soften",
                "\u590d\u53e4": "vintage",
                "\u9ed1\u767d": "gray",
                "\u4efflomo": "lomo",
                "\u4eae\u767d\u589e\u5f3a": "strongEnhancement",
                "\u7070\u767d": "strongGray",
                "\u7070\u8272": "lightGray",
                "\u6696\u79cb": "warmAutumn",
                "\u6728\u96d5": "carveStyle",
                "\u7c97\u7cd9": "rough"
            };
        return {
            getModuleName: function (a) {
                return q[a] ||
                    a
            },
            getEasyFun: function (a) {
                return b[a] || a
            }
        }
    })
})("psLib");
(function (h) {
    window[h].module("corrode", function () {
        return {
            process: function (q, b) {
                for (var a = parseInt(b[0]) || 3, c = q.data, f = q.width, g = q.height, e = 0; e < f; e++)
                    for (var j = 0; j < g; j++)
                        for (var l = parseInt(2 * Math.random() * a) - a, n = parseInt(2 * Math.random() * a) - a, k = j * f + e, l = (j + l) * f + e + n, n = 0; 3 > n; n++) c[4 * k + n] = c[4 * l + n];
                return q
            }
        }
    })
})("psLib");
(function (h) {
    window[h].module("curve", function (q) {
        return {
            process: function (b, a) {
                for (var c = q.lib.dorsyMath.lagrange(a[0], a[1]), f = b.data, g = b.width, e = b.height, j = 0; j < g; j++)
                    for (var l = 0; l < e; l++)
                        for (var n = l * g + j, k = 0; 3 > k; k++) f[4 * n + k] = c(f[4 * n + k]);
                return b
            }
        }
    })
})("psLib");
(function (h) {
    window[h].module("darkCorner", function (q) {
        return {
            process: function (b, a) {
                for (var c = parseInt(a[0]) || 3, f = a[1] || 30, g = b.data, e = b.width, j = b.height, l = 2 * e / 3, n = 1 * j / 2, k = q.lib.dorsyMath.distance([l, n]), c = k * (1 - c / 10), h = 0; h < e; h++)
                    for (var d = 0; d < j; d++)
                        for (var p = d * e + h, m = 0; 3 > m; m++) {
                            var s;
                            s = g[4 * p + m];
                            var r = (q.lib.dorsyMath.distance([h, d], [l, n]) - c) / (k - c);
                            0 > r && (r = 0);
                            s = (0 * Math.pow(1 - r, 3) + 0.06 * r * Math.pow(1 - r, 2) + 3 * 0.3 * r * r * (1 - r) + 1 * Math.pow(r, 3)) * s * f / 255;
                            g[4 * p + m] -= s
                        }
                return b
            }
        }
    })
})("psLib");
(function (h) {
    window[h].module("dorsyMath", function (q) {
        var b = {
            FFT1: function (a) {
                function c() {
                    g++;
                    for (var j = f / Math.pow(2, g), n = f / j, k = 0; k < j; k++)
                        for (var q = k * n, d = (k + 1) * n - 1, p = g, m = Math.pow(2, p - 1), h = 0; q <= d - m; q++) {
                            var r = q + m,
                                v = h * f / Math.pow(2, p),
                                u = v + f / 4;
                            a[q] instanceof b.C || (a[q] = new b.C(a[q]));
                            a[r] instanceof b.C || (a[r] = new b.C(a[r]));
                            v = a[q].plus(a[r].mutiply(e[v]));
                            u = a[q].plus(a[r].mutiply(e[u]));
                            a[q] = v;
                            a[r] = u;
                            h++
                        }
                    1 < j && c()
                }
                for (var f = a.length, g = 0, e = [], j = 0; j < f; j++) e[j] = this.exp(-2 * Math.PI * j / f);
                c();
                return a
            },
            DFT: function () {},
            Matrix: function (a, c, b) {
                var g = [];
                if (c) {
                    if (isNaN(c)) {
                        var e = /(\d+)\*/.exec(c)[1];
                        c = /\*(\d+)/.exec(c)[1]
                    } else e = c, c = b;
                    if (a[0] && a[0][0])
                        for (b = 0; b < e; b++) {
                            g[b] = [];
                            for (var j = 0; j < c; j++) g[b][j] = a[b][j] || 0
                        } else
                            for (b = 0; b < e; b++) {
                                g[b] = [];
                                for (j = 0; j < c; j++) g[b][j] = a[b * c + j] || 0
                            }
                    this.m = e;
                    this.n = c
                } else this.m = a.length, this.n = a[0].length;
                this.data = g
            },
            C: function (a, c) {
                this.r = a || 0;
                this.i = c || 0
            },
            exp: function (a, c) {
                a = a || 0;
                c = c || 1;
                var f = new b.C;
                f.r = c * Math.cos(a);
                f.i = c * Math.sin(a);
                return f
            },
            lagrange: function (a, c) {
                var b = a.length;
                return function (g) {
                    for (var e = 0, j = 0; j < b; j++) {
                        for (var l = 1, n = 1, k = 0; k < b; k++) k != j && (l *= a[j] - a[k], n *= g - a[k]);
                        e += c[j] * (n / l)
                    }
                    return e
                }
            },
            applyMatrix: function (a, c, f) {
                f = f || 0;
                var g = a.data,
                    e = a.width,
                    j = c.length;
                c = new b.Matrix(c, j, 1);
                for (var l = [], n = -(Math.sqrt(j) - 1) / 2, k = 0, h = g.length; k < h; k += 4) {
                    var d = k / 4,
                        p = parseInt(d / e),
                        m = d % e;
                    if (!(0 == p || 0 == m)) {
                        for (var s = [
                                [],
                                [],
                                []
                            ], r = n; r <= -n; r++)
                            for (var v = p + r, u = n; u <= -n; u++)
                                for (var w = 4 * (v * e + (m + u)), d = 0; 3 > d; d++) s[d].push(g[w + d]);
                        p = (new q.lib.dorsyMath.Matrix(s, 3, j)).mutiply(c);
                        for (d =
                            0; 3 > d; d++) l[k + d] = p.data[d];
                        l[k + 4] = g[k + 4]
                    }
                }
                k = 0;
                for (h = g.length; k < h; k++) l[k] && (g[k] = l[k] < f ? l[k] : g[k]);
                return a
            },
            RGBToHSI: function (a, c, b) {
                var g = (a - c + a - b) / 2 / Math.sqrt((a - c) * (a - c) + (a - b) * (c - b)) || 0,
                    g = Math.acos(g),
                    g = b > c ? 2 * Math.PI - g : g,
                    e = 1 - 3 * Math.min(a, c, b) / (a + c + b);
                g > 2 * Math.PI && (g = 2 * Math.PI);
                0 > g && (g = 0);
                return {
                    H: g,
                    S: e,
                    I: (a + c + b) / 3
                }
            },
            HSIToRGB: function (a, b, f) {
                0 > a ? (a %= 2 * Math.PI, a += 2 * Math.PI) : a %= 2 * Math.PI;
                if (a <= 2 * Math.PI / 3) var g = f * (1 - b),
                    e = f * (1 + b * Math.cos(a) / Math.cos(Math.PI / 3 - a)),
                    j = 3 * f - (e + g);
                else a <= 4 * Math.PI / 3 ? (a -=
                    2 * Math.PI / 3, e = f * (1 - b), j = f * (1 + b * Math.cos(a) / Math.cos(Math.PI / 3 - a)), g = 3 * f - (j + e)) : (a -= 4 * Math.PI / 3, j = f * (1 - b), g = f * (1 + b * Math.cos(a) / Math.cos(Math.PI / 3 - a)), e = 3 * f - (j + g));
                return {
                    R: e,
                    G: j,
                    B: g
                }
            },
            applyInHSI: function (a, b) {
                for (var f = a.data, g = 0, e = f.length; g < e; g += 4) {
                    var j = this.RGBToHSI(f[g], f[g + 1], f[g + 2]);
                    b(j);
                    1 < j.S && (j.S = 1);
                    0 > j.S && (j.S = 0);
                    j = this.HSIToRGB(j.H, j.S, j.I);
                    f[g] = j.R;
                    f[g + 1] = j.G;
                    f[g + 2] = j.B
                }
            },
            applyInCoordinate: function () {},
            distance: function (a, c) {
                c = c || [0, 0];
                a = new b.C(a[0], a[1]);
                c = new b.C(c[0], c[1]);
                return a.minus(c).distance()
            },
            xyToIFun: function (a) {
                return function (b, f, g) {
                    return 4 * (f * a + b) + (g || 0)
                }
            },
            xyCal: function (a, b, f, g, e) {
                for (var j = this.xyToIFun(a.width), l = 0; 3 > l; l++) {
                    var n = j(b, f, l);
                    a[n] = g(a[n])
                }
                e && (a[n + 1] = e(a[n + 1]))
            }
        };
        b.Matrix.prototype = {
            plus: function (a) {
                if (this.m != a.m || this.n != a.n) throw Error("\u77e9\u9635\u52a0\u6cd5\u884c\u5217\u4e0d\u5339\u914d");
                for (var c = new b.Matrix([], this.m, this.n), f = 0; f < this.m; f++)
                    for (var g = 0; g < this.n; g++) c.data[f][g] = this.data[f][g] + a.data[f][g];
                return c
            },
            minus: function (a) {
                if (this.m != a.m || this.n !=
                    a.n) throw Error("\u77e9\u9635\u51cf\u6cd5\u6cd5\u884c\u5217\u4e0d\u5339\u914d");
                for (var c = new b.Matrix([], this.m, this.n), f = 0; f < this.m; f++)
                    for (var g = 0; g < this.n; g++) c.data[f][g] = this.data[f][g] - a.data[f][g];
                return c
            },
            mutiply: function (a) {
                if (this.n != a.m) throw Error("\u77e9\u9635\u4e58\u6cd5\u884c\u5217\u4e0d\u5339\u914d");
                for (var c = new b.Matrix([], this.m, a.n), f = 0; f < this.m; f++)
                    for (var g = 0; g < a.n; g++) {
                        for (var e = 0, j = 0; j < this.n; j++) e += this.data[f][j] * a.data[j][g];
                        c.data[f][g] = e
                    }
                return c
            }
        };
        b.C.prototype = {
            plus: function (a) {
                var c =
                    new b.C;
                c.r = this.r + a.r;
                c.i = this.i + a.i;
                return c
            },
            minus: function (a) {
                var c = new b.C;
                c.r = this.r - a.r;
                c.i = this.i - a.i;
                return c
            },
            mutiply: function (a) {
                var c = new b.C;
                c.r = this.r * a.r - this.i * a.i;
                c.i = this.r * a.i + this.i * a.r;
                return c
            },
            divide: function (a) {
                var c = new b.C,
                    f = a.mutiply(a.conjugated());
                a = this.mutiply(a.conjugated());
                c.r = a.r / f.r;
                c.i = a.i / f.r;
                return c
            },
            conjugated: function () {
                return new b.C(this.r, -this.i)
            },
            distance: function () {
                return Math.sqrt(this.r * this.r + this.i * this.i)
            }
        };
        return b
    })
})("psLib");
(function (h) {
    window[h].module("dotted", function (q) {
        return {
            process: function (b, a) {
                for (var c = parseInt(a[0]) || 1, f = parseInt(a[1]) || 1, g = b.data, e = b.width, j = b.height, l = 2 * c + 1, n = [], k = f * f, f = -c; f < c; f++)
                    for (var h = -c; h < c; h++) f * f + h * h > k && n.push([f, h]);
                c = q.lib.dorsyMath.xyToIFun(e);
                f = 0;
                for (e = parseInt(e / l); f < e; f++) {
                    h = 0;
                    for (k = parseInt(j / l); h < k; h++)
                        for (var d = parseInt((f + 0.5) * l), p = parseInt((h + 0.5) * l), m = 0; m < n.length; m++) {
                            var s = d + n[m][0],
                                r = p + n[m][1];
                            g[c(s, r, 3)] = 225;
                            g[c(s, r, 2)] = 225;
                            g[c(s, r, 0)] = 225;
                            g[c(s, r, 1)] = 225
                        }
                }
                return b
            }
        }
    })
})("psLib");
(function (h) {
    window[h].module("easy", function () {
        return {
            getFun: function (q) {
                return {
                    softenFace: function () {
                        return this.clone().add(this.act("\u9ad8\u65af\u6a21\u7cca", 10), "\u6ee4\u8272").act("\u4eae\u5ea6", -10, 5)
                    },
                    sketch: function () {
                        var b = this.act("\u7070\u5ea6\u5904\u7406").clone();
                        return this.add(b.act("\u53cd\u8272").act("\u9ad8\u65af\u6a21\u7cca", 8), "\u989c\u8272\u51cf\u6de1").act("\u9510\u5316", 1)
                    },
                    softEnhancement: function () {
                        return this.act("\u66f2\u7ebf", [0, 190, 255], [0, 229, 255])
                    },
                    purpleStyle: function () {
                        var b =
                            this.clone();
                        return this.add(b.act("\u9ad8\u65af\u6a21\u7cca", 3), "\u6b63\u7247\u53e0\u5e95", "RG")
                    },
                    soften: function () {
                        var b = this.clone();
                        return this.add(b.act("\u9ad8\u65af\u6a21\u7cca", 6), "\u53d8\u6697")
                    },
                    vintage: function () {
                        this.clone();
                        return this.act("\u7070\u5ea6\u5904\u7406").add(window[h](this.canvas.width, this.canvas.height, "#808080").act("\u6dfb\u52a0\u6742\u8272").act("\u9ad8\u65af\u6a21\u7cca", 4).act("\u8272\u76f8/\u9971\u548c\u5ea6\u8c03\u8282", 32, 19, 0, !0), "\u53e0\u52a0")
                    },
                    gray: function () {
                        return this.act("\u7070\u5ea6\u5904\u7406")
                    },
                    lomo: function () {
                        return this.clone().add(this.clone(), "\u6ee4\u8272").add(this.clone(), "\u67d4\u5149").add(this.clone().act("\u53cd\u8272"), "\u6b63\u5e38", "20%", "B").act("\u6697\u89d2", 6, 200)
                    },
                    strongEnhancement: function () {
                        return this.clone().add(this.clone().act("\u66f2\u7ebf", [0, 50, 255], [0, 234, 255]), "\u67d4\u5149")
                    },
                    strongGray: function () {
                        return this.act("\u7070\u5ea6\u5904\u7406").act("\u66f2\u7ebf", [0, 61, 69, 212, 255], [0, 111, 176, 237, 255])
                    },
                    lightGray: function () {
                        return this.act("\u7070\u5ea6\u5904\u7406").act("\u66f2\u7ebf", [0, 60, 142, 194, 255], [0, 194, 240, 247, 255])
                    },
                    warmAutumn: function () {
                        var b = this.clone().act("\u8272\u76f8/\u9971\u548c\u5ea6\u8c03\u8282", 36, 47, 8, !0).act("\u6697\u89d2", 6, 150);
                        return this.add(b, "\u53e0\u52a0")
                    },
                    carveStyle: function () {
                        var b = this.clone().act("\u9a6c\u8d5b\u514b").act("\u67e5\u627e\u8fb9\u7f18").act("\u6d6e\u96d5\u6548\u679c");
                        return this.add(b, "\u7ebf\u6027\u5149")
                    },
                    rough: function () {
                        return this.add(window[h](this.canvas.width, this.canvas.height, "#000").act("\u55b7\u70b9").act("\u53cd\u8272").act("\u6d6e\u96d5\u6548\u679c"),
                            "\u53e0\u52a0")
                    }
                }[q]
            }
        }
    })
})("psLib");
(function (h) {
    window[h].module("embossment", function () {
        return {
            process: function (q) {
                for (var b = q.data, a = q.width, c = [], f = 0, g = b.length; f < g; f += 4) {
                    var e = f / 4,
                        j = parseInt(e / a),
                        l = e % a,
                        e = 4 * ((j - 1) * a + (l - 1)),
                        n = 4 * (j + 1) * a + 4 * (l + 1);
                    if (!(0 == j || 0 == l)) {
                        for (j = 0; 3 > j; j++) c[f + j] = b[e + j] - b[n + j] + 127.5;
                        c[f + 4] = b[f + 4]
                    }
                }
                f = 0;
                for (g = b.length; f < g; f++) b[f] = c[f] || b[f];
                return q
            }
        }
    })
})("psLib");
(function (h) {
    window[h].module("gaussBlur", function () {
        return {
            process: function (q, b, a) {
                var c = q.data,
                    f = q.width,
                    g = q.height,
                    e = [],
                    j = 0,
                    l, n, k, h, d, p;
                b = Math.floor(b) || 3;
                a = a || b / 3;
                l = 1 / (Math.sqrt(2 * Math.PI) * a);
                h = -1 / (2 * a * a);
                d = 0;
                for (a = -b; a <= b; a++, d++) k = l * Math.exp(h * a * a), e[d] = k, j += k;
                d = 0;
                for (a = e.length; d < a; d++) e[d] /= j;
                for (l = 0; l < g; l++)
                    for (a = 0; a < f; a++) {
                        j = n = k = h = 0;
                        for (p = -b; p <= b; p++) d = a + p, 0 <= d && d < f && (d = 4 * (l * f + d), n += c[d] * e[p + b], k += c[d + 1] * e[p + b], h += c[d + 2] * e[p + b], j += e[p + b]);
                        d = 4 * (l * f + a);
                        c[d] = n / j;
                        c[d + 1] = k / j;
                        c[d + 2] = h / j
                    }
                for (a =
                    0; a < f; a++)
                    for (l = 0; l < g; l++) {
                        j = n = k = h = 0;
                        for (p = -b; p <= b; p++) d = l + p, 0 <= d && d < g && (d = 4 * (d * f + a), n += c[d] * e[p + b], k += c[d + 1] * e[p + b], h += c[d + 2] * e[p + b], j += e[p + b]);
                        d = 4 * (l * f + a);
                        c[d] = n / j;
                        c[d + 1] = k / j;
                        c[d + 2] = h / j
                    }
                q.data = c;
                return q
            }
        }
    })
})("psLib");
(function (h) {
    window[h].module("borderline", function (h) {
        return {
            process: function (b) {
                return h.lib.dorsyMath.applyMatrix(b, [0, 1, 0, 1, -4, 1, 0, 1, 0], 250)
            }
        }
    })
})("psLib");
(function (h) {
    window[h].module("mosaic", function () {
        return {
            process: function (h, b) {
                for (var a = parseInt(b[0]) || 3, c = h.data, f = h.width, g = h.height, a = 2 * a + 1, e = 0, j = parseInt(f / a); e < j; e++)
                    for (var l = 0, n = parseInt(g / a); l < n; l++) {
                        for (var k = [], t = [0, 0, 0], d = 0; d < a; d++)
                            for (var p = 0; p < a; p++) {
                                var m = (l * a + d) * f + e * a + p;
                                t[0] += c[4 * m];
                                t[1] += c[4 * m + 1];
                                t[2] += c[4 * m + 2]
                            }
                        k[0] = t[0] / (a * a);
                        k[1] = t[1] / (a * a);
                        k[2] = t[2] / (a * a);
                        for (d = 0; d < a; d++)
                            for (p = 0; p < a; p++) m = (l * a + d) * f + e * a + p, c[4 * m] = k[0], c[4 * m + 1] = k[1], c[4 * m + 2] = k[2]
                    }
                return h
            }
        }
    })
})("psLib");
(function (h) {
    window[h].module("noise", function () {
        return {
            process: function (h, b) {
                for (var a = parseInt(b[0]) || 100, c = h.data, f = h.width, g = h.height, e = 0; e < f; e++)
                    for (var j = 0; j < g; j++)
                        for (var l = j * f + e, n = 0; 3 > n; n++) {
                            var k = parseInt(2 * Math.random() * a) - a;
                            c[4 * l + n] += k
                        }
                return h
            }
        }
    })
})("psLib");
(function (h) {
    window[h].module("oilPainting", function () {
        return {
            process: function (h, b) {
                for (var a = parseInt(b[0]) || 16, c = h.data, f = h.width, g = h.height, e = 0; e < f; e++)
                    for (var j = 0; j < g; j++) {
                        for (var l = j * f + e, n = 0, k = 0; 3 > k; k++) n += c[4 * l + k];
                        n /= 3;
                        n = parseInt(n / a) * a;
                        for (k = 0; 3 > k; k++) c[4 * l + k] = n
                    }
                return h
            }
        }
    })
})("psLib");
(function (h) {
    window[h].module("setHSI", function (h) {
        return {
            process: function (b, a) {
                a[0] = a[0] / 180 * Math.PI;
                a[1] = a[1] / 100 || 0;
                a[2] = 255 * (a[2] / 100) || 0;
                a[3] = a[3] || !1;
                h.lib.dorsyMath.applyInHSI(b, function (b) {
                    a[3] ? (b.H = a[0], b.S = a[1]) : (b.H += a[0], b.S += a[1]);
                    b.I += a[2]
                });
                return b
            }
        }
    })
})("psLib");
(function (h) {
    window[h].module("sharp", function () {
        return {
            process: function (h, b) {
                for (var a = b[0] || 0.6, c = h.data, f = h.width, g = 0, e = c.length; g < e; g += 4) {
                    var j = g / 4,
                        l = parseInt(j / f),
                        n = j % f;
                    if (!(0 == l || 0 == n))
                        for (var k = 4 * ((l - 1) * f + (n - 1)), l = 4 * ((l - 1) * f + n), j = 4 * (j - 1), n = 0; 3 > n; n++) c[g + n] += (c[g + n] - (c[l + n] + c[j + n] + c[k + n]) / 3) * a
                }
                return h
            }
        }
    })
})("psLib");
(function (h) {
    window[h].module("toGray", function () {
        return {
            process: function (h) {
                for (var b = h.data, a = 0, c = b.length; a < c; a += 4) {
                    var f = parseInt((b[a] + b[a + 1] + b[a + 2]) / 3);
                    b[a + 2] = b[a + 1] = b[a] = f
                }
                h.data = b;
                return h
            }
        }
    })
})("psLib");
(function (h) {
    window[h].module("toReverse", function () {
        return {
            process: function (h) {
                for (var b = h.data, a = 0, c = b.length; a < c; a += 4) b[a] = 255 - b[a], b[a + 1] = 255 - b[a + 1], b[a + 2] = 255 - b[a + 2];
                h.data = b;
                return h
            }
        }
    })
})("psLib");
(function (h) {
    window[h].module("toThresh", function (h) {
        return {
            process: function (b, a) {
                b = h.lib.toGray.process(b);
                var c = b.data;
                a = a[0] || 128;
                for (var f = 0, g = c.length; f < g; f++)(f + 1) % 4 && (c[f] = c[f] > a ? 255 : 0);
                b.data = c;
                return b
            }
        }
    })
})("psLib");

/*
  html2canvas 0.5.0-alpha1 <http://html2canvas.hertzen.com>
  Copyright (c) 2015 Niklas von Hertzen

  Released under MIT License
*/

(function (window, document, exports, global, define, undefined) {

    /*!
     * @overview es6-promise - a tiny implementation of Promises/A+.
     * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
     * @license   Licensed under MIT license
     *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
     * @version   2.0.1
     */

    (function () {
        function r(a, b) {
            n[l] = a;
            n[l + 1] = b;
            l += 2;
            2 === l && A()
        }

        function s(a) {
            return "function" === typeof a
        }

        function F() {
            return function () {
                process.nextTick(t)
            }
        }

        function G() {
            var a = 0,
                b = new B(t),
                c = document.createTextNode("");
            b.observe(c, {
                characterData: !0
            });
            return function () {
                c.data = a = ++a % 2
            }
        }

        function H() {
            var a = new MessageChannel;
            a.port1.onmessage = t;
            return function () {
                a.port2.postMessage(0)
            }
        }

        function I() {
            return function () {
                setTimeout(t, 1)
            }
        }

        function t() {
            for (var a = 0; a < l; a += 2)(0, n[a])(n[a + 1]), n[a] = void 0, n[a + 1] = void 0;
            l = 0
        }

        function p() {}

        function J(a, b, c, d) {
            try {
                a.call(b, c, d)
            } catch (e) {
                return e
            }
        }

        function K(a, b, c) {
            r(function (a) {
                var e = !1,
                    f = J(c, b, function (c) {
                        e || (e = !0, b !== c ? q(a, c) : m(a, c))
                    }, function (b) {
                        e || (e = !0, g(a, b))
                    });
                !e && f && (e = !0, g(a, f))
            }, a)
        }

        function L(a, b) {
            1 === b.a ? m(a, b.b) : 2 === a.a ? g(a, b.b) : u(b, void 0, function (b) {
                q(a, b)
            }, function (b) {
                g(a, b)
            })
        }

        function q(a, b) {
            if (a === b) g(a, new TypeError("You cannot resolve a promise with itself"));
            else if ("function" === typeof b || "object" === typeof b && null !== b)
                if (b.constructor === a.constructor) L(a,
                    b);
                else {
                    var c;
                    try {
                        c = b.then
                    } catch (d) {
                        v.error = d, c = v
                    }
                    c === v ? g(a, v.error) : void 0 === c ? m(a, b) : s(c) ? K(a, b, c) : m(a, b)
                }
            else m(a, b)
        }

        function M(a) {
            a.f && a.f(a.b);
            x(a)
        }

        function m(a, b) {
            void 0 === a.a && (a.b = b, a.a = 1, 0 !== a.e.length && r(x, a))
        }

        function g(a, b) {
            void 0 === a.a && (a.a = 2, a.b = b, r(M, a))
        }

        function u(a, b, c, d) {
            var e = a.e,
                f = e.length;
            a.f = null;
            e[f] = b;
            e[f + 1] = c;
            e[f + 2] = d;
            0 === f && a.a && r(x, a)
        }

        function x(a) {
            var b = a.e,
                c = a.a;
            if (0 !== b.length) {
                for (var d, e, f = a.b, g = 0; g < b.length; g += 3) d = b[g], e = b[g + c], d ? C(c, d, e, f) : e(f);
                a.e.length = 0
            }
        }

        function D() {
            this.error =
                null
        }

        function C(a, b, c, d) {
            var e = s(c),
                f, k, h, l;
            if (e) {
                try {
                    f = c(d)
                } catch (n) {
                    y.error = n, f = y
                }
                f === y ? (l = !0, k = f.error, f = null) : h = !0;
                if (b === f) {
                    g(b, new TypeError("A promises callback cannot return that same promise."));
                    return
                }
            } else f = d, h = !0;
            void 0 === b.a && (e && h ? q(b, f) : l ? g(b, k) : 1 === a ? m(b, f) : 2 === a && g(b, f))
        }

        function N(a, b) {
            try {
                b(function (b) {
                    q(a, b)
                }, function (b) {
                    g(a, b)
                })
            } catch (c) {
                g(a, c)
            }
        }

        function k(a, b, c, d) {
            this.n = a;
            this.c = new a(p, d);
            this.i = c;
            this.o(b) ? (this.m = b, this.d = this.length = b.length, this.l(), 0 === this.length ? m(this.c,
                this.b) : (this.length = this.length || 0, this.k(), 0 === this.d && m(this.c, this.b))) : g(this.c, this.p())
        }

        function h(a) {
            O++;
            this.b = this.a = void 0;
            this.e = [];
            if (p !== a) {
                if (!s(a)) throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
                if (!(this instanceof h)) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                N(this, a)
            }
        }
        var E = Array.isArray ? Array.isArray : function (a) {
                return "[object Array]" ===
                    Object.prototype.toString.call(a)
            },
            l = 0,
            w = "undefined" !== typeof window ? window : {},
            B = w.MutationObserver || w.WebKitMutationObserver,
            w = "undefined" !== typeof Uint8ClampedArray && "undefined" !== typeof importScripts && "undefined" !== typeof MessageChannel,
            n = Array(1E3),
            A;
        A = "undefined" !== typeof process && "[object process]" === {}.toString.call(process) ? F() : B ? G() : w ? H() : I();
        var v = new D,
            y = new D;
        k.prototype.o = function (a) {
            return E(a)
        };
        k.prototype.p = function () {
            return Error("Array Methods must be provided an Array")
        };
        k.prototype.l =
            function () {
                this.b = Array(this.length)
            };
        k.prototype.k = function () {
            for (var a = this.length, b = this.c, c = this.m, d = 0; void 0 === b.a && d < a; d++) this.j(c[d], d)
        };
        k.prototype.j = function (a, b) {
            var c = this.n;
            "object" === typeof a && null !== a ? a.constructor === c && void 0 !== a.a ? (a.f = null, this.g(a.a, b, a.b)) : this.q(c.resolve(a), b) : (this.d--, this.b[b] = this.h(a))
        };
        k.prototype.g = function (a, b, c) {
            var d = this.c;
            void 0 === d.a && (this.d--, this.i && 2 === a ? g(d, c) : this.b[b] = this.h(c));
            0 === this.d && m(d, this.b)
        };
        k.prototype.h = function (a) {
            return a
        };
        k.prototype.q = function (a, b) {
            var c = this;
            u(a, void 0, function (a) {
                c.g(1, b, a)
            }, function (a) {
                c.g(2, b, a)
            })
        };
        var O = 0;
        h.all = function (a, b) {
            return (new k(this, a, !0, b)).c
        };
        h.race = function (a, b) {
            function c(a) {
                q(e, a)
            }

            function d(a) {
                g(e, a)
            }
            var e = new this(p, b);
            if (!E(a)) return (g(e, new TypeError("You must pass an array to race.")), e);
            for (var f = a.length, h = 0; void 0 === e.a && h < f; h++) u(this.resolve(a[h]), void 0, c, d);
            return e
        };
        h.resolve = function (a, b) {
            if (a && "object" === typeof a && a.constructor === this) return a;
            var c = new this(p, b);
            q(c, a);
            return c
        };
        h.reject = function (a, b) {
            var c = new this(p, b);
            g(c, a);
            return c
        };
        h.prototype = {
            constructor: h,
            then: function (a, b) {
                var c = this.a;
                if (1 === c && !a || 2 === c && !b) return this;
                var d = new this.constructor(p),
                    e = this.b;
                if (c) {
                    var f = arguments[c - 1];
                    r(function () {
                        C(c, d, f, e)
                    })
                } else u(this, d, a, b);
                return d
            },
            "catch": function (a) {
                return this.then(null, a)
            }
        };
        var z = {
            Promise: h,
            polyfill: function () {
                var a;
                a = "undefined" !== typeof global ? global : "undefined" !== typeof window && window.document ? window : self;
                "Promise" in a && "resolve" in
                    a.Promise && "reject" in a.Promise && "all" in a.Promise && "race" in a.Promise && function () {
                        var b;
                        new a.Promise(function (a) {
                            b = a
                        });
                        return s(b)
                    }() || (a.Promise = h)
            }
        };
        "function" === typeof define && define.amd ? define(function () {
            return z
        }) : "undefined" !== typeof module && module.exports ? module.exports = z : "undefined" !== typeof this && (this.ES6Promise = z);
    }).call(window);
    if (window) {
        window.ES6Promise.polyfill();
    }


    if (typeof (document) === "undefined" || typeof (Object.create) !== "function" || typeof (document.createElement("canvas").getContext) !== "function") {
        (window || module.exports).html2canvas = function () {
            return Promise.reject("No canvas support");
        };
        return;
    }

    /*! https://mths.be/punycode v1.3.1 by @mathias */
    ;
    (function (root) {

        /** Detect free variables */
        var freeExports = typeof exports == 'object' && exports &&
            !exports.nodeType && exports;
        var freeModule = typeof module == 'object' && module &&
            !module.nodeType && module;
        var freeGlobal = typeof global == 'object' && global;
        if (
            freeGlobal.global === freeGlobal ||
            freeGlobal.window === freeGlobal ||
            freeGlobal.self === freeGlobal
        ) {
            root = freeGlobal;
        }

        /**
         * The `punycode` object.
         * @name punycode
         * @type Object
         */
        var punycode,

            /** Highest positive signed 32-bit float value */
            maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

            /** Bootstring parameters */
            base = 36,
            tMin = 1,
            tMax = 26,
            skew = 38,
            damp = 700,
            initialBias = 72,
            initialN = 128, // 0x80
            delimiter = '-', // '\x2D'

            /** Regular expressions */
            regexPunycode = /^xn--/,
            regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
            regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

            /** Error messages */
            errors = {
                'overflow': 'Overflow: input needs wider integers to process',
                'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
                'invalid-input': 'Invalid input'
            },

            /** Convenience shortcuts */
            baseMinusTMin = base - tMin,
            floor = Math.floor,
            stringFromCharCode = String.fromCharCode,

            /** Temporary variable */
            key;

        /*--------------------------------------------------------------------------*/

        /**
         * A generic error utility function.
         * @private
         * @param {String} type The error type.
         * @returns {Error} Throws a `RangeError` with the applicable error message.
         */
        function error(type) {
            throw RangeError(errors[type]);
        }

        /**
         * A generic `Array#map` utility function.
         * @private
         * @param {Array} array The array to iterate over.
         * @param {Function} callback The function that gets called for every array
         * item.
         * @returns {Array} A new array of values returned by the callback function.
         */
        function map(array, fn) {
            var length = array.length;
            var result = [];
            while (length--) {
                result[length] = fn(array[length]);
            }
            return result;
        }

        /**
         * A simple `Array#map`-like wrapper to work with domain name strings or email
         * addresses.
         * @private
         * @param {String} domain The domain name or email address.
         * @param {Function} callback The function that gets called for every
         * character.
         * @returns {Array} A new string of characters returned by the callback
         * function.
         */
        function mapDomain(string, fn) {
            var parts = string.split('@');
            var result = '';
            if (parts.length > 1) {
                // In email addresses, only the domain name should be punycoded. Leave
                // the local part (i.e. everything up to `@`) intact.
                result = parts[0] + '@';
                string = parts[1];
            }
            var labels = string.split(regexSeparators);
            var encoded = map(labels, fn).join('.');
            return result + encoded;
        }

        /**
         * Creates an array containing the numeric code points of each Unicode
         * character in the string. While JavaScript uses UCS-2 internally,
         * this function will convert a pair of surrogate halves (each of which
         * UCS-2 exposes as separate characters) into a single code point,
         * matching UTF-16.
         * @see `punycode.ucs2.encode`
         * @see <https://mathiasbynens.be/notes/javascript-encoding>
         * @memberOf punycode.ucs2
         * @name decode
         * @param {String} string The Unicode input string (UCS-2).
         * @returns {Array} The new array of code points.
         */
        function ucs2decode(string) {
            var output = [],
                counter = 0,
                length = string.length,
                value,
                extra;
            while (counter < length) {
                value = string.charCodeAt(counter++);
                if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
                    // high surrogate, and there is a next character
                    extra = string.charCodeAt(counter++);
                    if ((extra & 0xFC00) == 0xDC00) { // low surrogate
                        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
                    } else {
                        // unmatched surrogate; only append this code unit, in case the next
                        // code unit is the high surrogate of a surrogate pair
                        output.push(value);
                        counter--;
                    }
                } else {
                    output.push(value);
                }
            }
            return output;
        }

        /**
         * Creates a string based on an array of numeric code points.
         * @see `punycode.ucs2.decode`
         * @memberOf punycode.ucs2
         * @name encode
         * @param {Array} codePoints The array of numeric code points.
         * @returns {String} The new Unicode string (UCS-2).
         */
        function ucs2encode(array) {
            return map(array, function (value) {
                var output = '';
                if (value > 0xFFFF) {
                    value -= 0x10000;
                    output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
                    value = 0xDC00 | value & 0x3FF;
                }
                output += stringFromCharCode(value);
                return output;
            }).join('');
        }

        /**
         * Converts a basic code point into a digit/integer.
         * @see `digitToBasic()`
         * @private
         * @param {Number} codePoint The basic numeric code point value.
         * @returns {Number} The numeric value of a basic code point (for use in
         * representing integers) in the range `0` to `base - 1`, or `base` if
         * the code point does not represent a value.
         */
        function basicToDigit(codePoint) {
            if (codePoint - 48 < 10) {
                return codePoint - 22;
            }
            if (codePoint - 65 < 26) {
                return codePoint - 65;
            }
            if (codePoint - 97 < 26) {
                return codePoint - 97;
            }
            return base;
        }

        /**
         * Converts a digit/integer into a basic code point.
         * @see `basicToDigit()`
         * @private
         * @param {Number} digit The numeric value of a basic code point.
         * @returns {Number} The basic code point whose value (when used for
         * representing integers) is `digit`, which needs to be in the range
         * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
         * used; else, the lowercase form is used. The behavior is undefined
         * if `flag` is non-zero and `digit` has no uppercase form.
         */
        function digitToBasic(digit, flag) {
            //  0..25 map to ASCII a..z or A..Z
            // 26..35 map to ASCII 0..9
            return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
        }

        /**
         * Bias adaptation function as per section 3.4 of RFC 3492.
         * http://tools.ietf.org/html/rfc3492#section-3.4
         * @private
         */
        function adapt(delta, numPoints, firstTime) {
            var k = 0;
            delta = firstTime ? floor(delta / damp) : delta >> 1;
            delta += floor(delta / numPoints);
            for ( /* no initialization */ ; delta > baseMinusTMin * tMax >> 1; k += base) {
                delta = floor(delta / baseMinusTMin);
            }
            return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
        }

        /**
         * Converts a Punycode string of ASCII-only symbols to a string of Unicode
         * symbols.
         * @memberOf punycode
         * @param {String} input The Punycode string of ASCII-only symbols.
         * @returns {String} The resulting string of Unicode symbols.
         */
        function decode(input) {
            // Don't use UCS-2
            var output = [],
                inputLength = input.length,
                out,
                i = 0,
                n = initialN,
                bias = initialBias,
                basic,
                j,
                index,
                oldi,
                w,
                k,
                digit,
                t,
                /** Cached calculation results */
                baseMinusT;

            // Handle the basic code points: let `basic` be the number of input code
            // points before the last delimiter, or `0` if there is none, then copy
            // the first basic code points to the output.

            basic = input.lastIndexOf(delimiter);
            if (basic < 0) {
                basic = 0;
            }

            for (j = 0; j < basic; ++j) {
                // if it's not a basic code point
                if (input.charCodeAt(j) >= 0x80) {
                    error('not-basic');
                }
                output.push(input.charCodeAt(j));
            }

            // Main decoding loop: start just after the last delimiter if any basic code
            // points were copied; start at the beginning otherwise.

            for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */ ) {

                // `index` is the index of the next character to be consumed.
                // Decode a generalized variable-length integer into `delta`,
                // which gets added to `i`. The overflow checking is easier
                // if we increase `i` as we go, then subtract off its starting
                // value at the end to obtain `delta`.
                for (oldi = i, w = 1, k = base; /* no condition */ ; k += base) {

                    if (index >= inputLength) {
                        error('invalid-input');
                    }

                    digit = basicToDigit(input.charCodeAt(index++));

                    if (digit >= base || digit > floor((maxInt - i) / w)) {
                        error('overflow');
                    }

                    i += digit * w;
                    t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

                    if (digit < t) {
                        break;
                    }

                    baseMinusT = base - t;
                    if (w > floor(maxInt / baseMinusT)) {
                        error('overflow');
                    }

                    w *= baseMinusT;

                }

                out = output.length + 1;
                bias = adapt(i - oldi, out, oldi == 0);

                // `i` was supposed to wrap around from `out` to `0`,
                // incrementing `n` each time, so we'll fix that now:
                if (floor(i / out) > maxInt - n) {
                    error('overflow');
                }

                n += floor(i / out);
                i %= out;

                // Insert `n` at position `i` of the output
                output.splice(i++, 0, n);

            }

            return ucs2encode(output);
        }

        /**
         * Converts a string of Unicode symbols (e.g. a domain name label) to a
         * Punycode string of ASCII-only symbols.
         * @memberOf punycode
         * @param {String} input The string of Unicode symbols.
         * @returns {String} The resulting Punycode string of ASCII-only symbols.
         */
        function encode(input) {
            var n,
                delta,
                handledCPCount,
                basicLength,
                bias,
                j,
                m,
                q,
                k,
                t,
                currentValue,
                output = [],
                /** `inputLength` will hold the number of code points in `input`. */
                inputLength,
                /** Cached calculation results */
                handledCPCountPlusOne,
                baseMinusT,
                qMinusT;

            // Convert the input in UCS-2 to Unicode
            input = ucs2decode(input);

            // Cache the length
            inputLength = input.length;

            // Initialize the state
            n = initialN;
            delta = 0;
            bias = initialBias;

            // Handle the basic code points
            for (j = 0; j < inputLength; ++j) {
                currentValue = input[j];
                if (currentValue < 0x80) {
                    output.push(stringFromCharCode(currentValue));
                }
            }

            handledCPCount = basicLength = output.length;

            // `handledCPCount` is the number of code points that have been handled;
            // `basicLength` is the number of basic code points.

            // Finish the basic string - if it is not empty - with a delimiter
            if (basicLength) {
                output.push(delimiter);
            }

            // Main encoding loop:
            while (handledCPCount < inputLength) {

                // All non-basic code points < n have been handled already. Find the next
                // larger one:
                for (m = maxInt, j = 0; j < inputLength; ++j) {
                    currentValue = input[j];
                    if (currentValue >= n && currentValue < m) {
                        m = currentValue;
                    }
                }

                // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
                // but guard against overflow
                handledCPCountPlusOne = handledCPCount + 1;
                if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                    error('overflow');
                }

                delta += (m - n) * handledCPCountPlusOne;
                n = m;

                for (j = 0; j < inputLength; ++j) {
                    currentValue = input[j];

                    if (currentValue < n && ++delta > maxInt) {
                        error('overflow');
                    }

                    if (currentValue == n) {
                        // Represent delta as a generalized variable-length integer
                        for (q = delta, k = base; /* no condition */ ; k += base) {
                            t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
                            if (q < t) {
                                break;
                            }
                            qMinusT = q - t;
                            baseMinusT = base - t;
                            output.push(
                                stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
                            );
                            q = floor(qMinusT / baseMinusT);
                        }

                        output.push(stringFromCharCode(digitToBasic(q, 0)));
                        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                        delta = 0;
                        ++handledCPCount;
                    }
                }

                ++delta;
                ++n;

            }
            return output.join('');
        }

        /**
         * Converts a Punycode string representing a domain name or an email address
         * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
         * it doesn't matter if you call it on a string that has already been
         * converted to Unicode.
         * @memberOf punycode
         * @param {String} input The Punycoded domain name or email address to
         * convert to Unicode.
         * @returns {String} The Unicode representation of the given Punycode
         * string.
         */
        function toUnicode(input) {
            return mapDomain(input, function (string) {
                return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
            });
        }

        /**
         * Converts a Unicode string representing a domain name or an email address to
         * Punycode. Only the non-ASCII parts of the domain name will be converted,
         * i.e. it doesn't matter if you call it with a domain that's already in
         * ASCII.
         * @memberOf punycode
         * @param {String} input The domain name or email address to convert, as a
         * Unicode string.
         * @returns {String} The Punycode representation of the given domain name or
         * email address.
         */
        function toASCII(input) {
            return mapDomain(input, function (string) {
                return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
            });
        }

        /*--------------------------------------------------------------------------*/

        /** Define the public API */
        punycode = {
            /**
             * A string representing the current Punycode.js version number.
             * @memberOf punycode
             * @type String
             */
            'version': '1.3.1',
            /**
             * An object of methods to convert from JavaScript's internal character
             * representation (UCS-2) to Unicode code points, and back.
             * @see <https://mathiasbynens.be/notes/javascript-encoding>
             * @memberOf punycode
             * @type Object
             */
            'ucs2': {
                'decode': ucs2decode,
                'encode': ucs2encode
            },
            'decode': decode,
            'encode': encode,
            'toASCII': toASCII,
            'toUnicode': toUnicode
        };

        /** Expose `punycode` */
        // Some AMD build optimizers, like r.js, check for specific condition patterns
        // like the following:
        if (
            typeof define == 'function' &&
            typeof define.amd == 'object' &&
            define.amd
        ) {
            define('punycode', function () {
                return punycode;
            });
        } else if (freeExports && freeModule) {
            if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
                freeModule.exports = punycode;
            } else { // in Narwhal or RingoJS v0.7.0-
                for (key in punycode) {
                    punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
                }
            }
        } else { // in Rhino or a web browser
            root.punycode = punycode;
        }

    }(this));

    var html2canvasNodeAttribute = "data-html2canvas-node";
    var html2canvasCanvasCloneAttribute = "data-html2canvas-canvas-clone";
    var html2canvasCanvasCloneIndex = 0;
    var html2canvasCloneIndex = 0;
    window.html2canvas = function (nodeList, options) {
        var index = html2canvasCloneIndex++;
        options = options || {};
        if (options.logging) {
            window.html2canvas.logging = true;
            window.html2canvas.start = Date.now();
        }

        options.async = typeof (options.async) === "undefined" ? true : options.async;
        options.allowTaint = typeof (options.allowTaint) === "undefined" ? false : options.allowTaint;
        options.removeContainer = typeof (options.removeContainer) === "undefined" ? true : options.removeContainer;
        options.javascriptEnabled = typeof (options.javascriptEnabled) === "undefined" ? false : options.javascriptEnabled;
        options.imageTimeout = typeof (options.imageTimeout) === "undefined" ? 10000 : options.imageTimeout;
        options.renderer = typeof (options.renderer) === "function" ? options.renderer : CanvasRenderer;
        options.strict = !!options.strict;

        if (typeof (nodeList) === "string") {
            if (typeof (options.proxy) !== "string") {
                return Promise.reject("Proxy must be used when rendering url");
            }
            var width = options.width != null ? options.width : window.innerWidth;
            var height = options.height != null ? options.height : window.innerHeight;
            return loadUrlDocument(absoluteUrl(nodeList), options.proxy, document, width, height, options).then(function (container) {
                return renderWindow(container.contentWindow.document.documentElement, container, options, width, height);
            });
        }

        var node = document.getElementById('map');
        node.setAttribute(html2canvasNodeAttribute + index, index);
        return renderDocument(node.ownerDocument, options, node.ownerDocument.defaultView.innerWidth, node.ownerDocument.defaultView.innerHeight, index).then(function (canvas) {
            if (typeof (options.onrendered) === "function") {
                log("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas");
                options.onrendered(canvas);
            }
            return canvas;
        });
    };

    window.html2canvas.punycode = this.punycode;
    window.html2canvas.proxy = {};

    function renderDocument(document, options, windowWidth, windowHeight, html2canvasIndex) {
        return createWindowClone(document, document, windowWidth, windowHeight, options, document.defaultView.pageXOffset, document.defaultView.pageYOffset).then(function (container) {
            log("Document cloned");
            var attributeName = html2canvasNodeAttribute + html2canvasIndex;
            var selector = "[" + attributeName + "='" + html2canvasIndex + "']";
            document.querySelector(selector).removeAttribute(attributeName);
            var clonedWindow = container.contentWindow;
            var node = clonedWindow.document.querySelector(selector);
            var oncloneHandler = (typeof (options.onclone) === "function") ? Promise.resolve(options.onclone(clonedWindow.document)) : Promise.resolve(true);
            return oncloneHandler.then(function () {
                return renderWindow(node, container, options, windowWidth, windowHeight);
            });
        });
    }

    function renderWindow(node, container, options, windowWidth, windowHeight) {
        var clonedWindow = container.contentWindow;
        var support = new Support(clonedWindow.document);
        var imageLoader = new ImageLoader(options, support);
        var bounds = getBounds(node);
        var width = options.type === "view" ? windowWidth : documentWidth(clonedWindow.document);
        var height = options.type === "view" ? windowHeight : documentHeight(clonedWindow.document);
        var renderer = new options.renderer(width, height, imageLoader, options, document);
        var parser = new NodeParser(node, renderer, support, imageLoader, options);
        return parser.ready.then(function () {
            log("Finished rendering");
            var canvas;

            if (options.type === "view") {
                canvas = crop(renderer.canvas, {
                    width: renderer.canvas.width,
                    height: renderer.canvas.height,
                    top: 0,
                    left: 0,
                    x: 0,
                    y: 0
                });
            } else if (node === clonedWindow.document.body || node === clonedWindow.document.documentElement || options.canvas != null) {
                canvas = renderer.canvas;
            } else {
                canvas = crop(renderer.canvas, {
                    width: options.width != null ? options.width : bounds.width,
                    height: options.height != null ? options.height : bounds.height,
                    top: bounds.top,
                    left: bounds.left,
                    x: clonedWindow.pageXOffset,
                    y: clonedWindow.pageYOffset
                });
            }

            cleanupContainer(container, options);
            return canvas;
        });
    }

    function cleanupContainer(container, options) {
        if (options.removeContainer) {
            container.parentNode.removeChild(container);
            log("Cleaned up container");
        }
    }

    function crop(canvas, bounds) {
        var croppedCanvas = document.createElement("canvas");
        var x1 = Math.min(canvas.width - 1, Math.max(0, bounds.left));
        var x2 = Math.min(canvas.width, Math.max(1, bounds.left + bounds.width));
        var y1 = Math.min(canvas.height - 1, Math.max(0, bounds.top));
        var y2 = Math.min(canvas.height, Math.max(1, bounds.top + bounds.height));
        croppedCanvas.width = bounds.width;
        croppedCanvas.height = bounds.height;
        log("Cropping canvas at:", "left:", bounds.left, "top:", bounds.top, "width:", (x2 - x1), "height:", (y2 - y1));
        log("Resulting crop with width", bounds.width, "and height", bounds.height, " with x", x1, "and y", y1);
        croppedCanvas.getContext("2d").drawImage(canvas, x1, y1, x2 - x1, y2 - y1, bounds.x, bounds.y, x2 - x1, y2 - y1);
        return croppedCanvas;
    }

    function documentWidth(doc) {
        return Math.max(
            Math.max(doc.body.scrollWidth, doc.documentElement.scrollWidth),
            Math.max(doc.body.offsetWidth, doc.documentElement.offsetWidth),
            Math.max(doc.body.clientWidth, doc.documentElement.clientWidth)
        );
    }

    function documentHeight(doc) {
        return Math.max(
            Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight),
            Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight),
            Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
        );
    }

    function smallImage() {
        return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    }

    function isIE9() {
        return document.documentMode && document.documentMode <= 9;
    }

    // https://github.com/niklasvh/html2canvas/issues/503
    function cloneNodeIE9(node, javascriptEnabled) {
        var clone = node.nodeType === 3 ? document.createTextNode(node.nodeValue) : node.cloneNode(false);

        var child = node.firstChild;
        while (child) {
            if (javascriptEnabled === true || child.nodeType !== 1 || child.nodeName !== 'SCRIPT') {
                clone.appendChild(cloneNodeIE9(child, javascriptEnabled));
            }
            child = child.nextSibling;
        }

        return clone;
    }

    function createWindowClone(ownerDocument, containerDocument, width, height, options, x, y) {
        labelCanvasElements(ownerDocument);
        var documentElement = isIE9() ? cloneNodeIE9(ownerDocument.documentElement, options.javascriptEnabled) : ownerDocument.documentElement.cloneNode(true);
        var container = containerDocument.createElement("iframe");

        container.className = "html2canvas-container";
        container.style.visibility = "hidden";
        container.style.position = "fixed";
        container.style.left = "-10000px";
        container.style.top = "0px";
        container.style.border = "0";
        container.width = width;
        container.height = height;
        container.scrolling = "no"; // ios won't scroll without it
        containerDocument.body.appendChild(container);

        return new Promise(function (resolve) {
            var documentClone = container.contentWindow.document;

            cloneNodeValues(ownerDocument.documentElement, documentElement, "textarea");
            cloneNodeValues(ownerDocument.documentElement, documentElement, "select");

            /* Chrome doesn't detect relative background-images assigned in inline <style> sheets when fetched through getComputedStyle
             if window url is about:blank, we can assign the url to current by writing onto the document
             */
            container.contentWindow.onload = container.onload = function () {
                var interval = setInterval(function () {
                    if (documentClone.body.childNodes.length > 0) {
                        cloneCanvasContents(ownerDocument, documentClone);
                        clearInterval(interval);
                        if (options.type === "view") {
                            container.contentWindow.scrollTo(x, y);
                        }
                        resolve(container);
                    }
                }, 50);
            };

            documentClone.open();
            documentClone.write("<!DOCTYPE html><html></html>");
            // Chrome scrolls the parent document for some reason after the write to the cloned window???
            restoreOwnerScroll(ownerDocument, x, y);
            documentClone.replaceChild(options.javascriptEnabled === true ? documentClone.adoptNode(documentElement) : removeScriptNodes(documentClone.adoptNode(documentElement)), documentClone.documentElement);
            documentClone.close();
        });
    }

    function cloneNodeValues(document, clone, nodeName) {
        var originalNodes = document.getElementsByTagName(nodeName);
        var clonedNodes = clone.getElementsByTagName(nodeName);
        var count = originalNodes.length;
        for (var i = 0; i < count; i++) {
            clonedNodes[i].value = originalNodes[i].value;
        }
    }

    function restoreOwnerScroll(ownerDocument, x, y) {
        if (ownerDocument.defaultView && (x !== ownerDocument.defaultView.pageXOffset || y !== ownerDocument.defaultView.pageYOffset)) {
            ownerDocument.defaultView.scrollTo(x, y);
        }
    }

    function loadUrlDocument(src, proxy, document, width, height, options) {
        return new Proxy(src, proxy, window.document).then(documentFromHTML(src)).then(function (doc) {
            return createWindowClone(doc, document, width, height, options, 0, 0);
        });
    }

    function documentFromHTML(src) {
        return function (html) {
            var parser = new DOMParser(),
                doc;
            try {
                doc = parser.parseFromString(html, "text/html");
            } catch (e) {
                log("DOMParser not supported, falling back to createHTMLDocument");
                doc = document.implementation.createHTMLDocument("");
                try {
                    doc.open();
                    doc.write(html);
                    doc.close();
                } catch (ee) {
                    log("createHTMLDocument write not supported, falling back to document.body.innerHTML");
                    doc.body.innerHTML = html; // ie9 doesnt support writing to documentElement
                }
            }

            var b = doc.querySelector("base");
            if (!b || !b.href.host) {
                var base = doc.createElement("base");
                base.href = src;
                doc.head.insertBefore(base, doc.head.firstChild);
            }

            return doc;
        };
    }


    function labelCanvasElements(ownerDocument) {
        [].slice.call(ownerDocument.querySelectorAll("canvas"), 0).forEach(function (canvas) {
            canvas.setAttribute(html2canvasCanvasCloneAttribute, "canvas-" + html2canvasCanvasCloneIndex++);
        });
    }

    function cloneCanvasContents(ownerDocument, documentClone) {
        [].slice.call(ownerDocument.querySelectorAll("[" + html2canvasCanvasCloneAttribute + "]"), 0).forEach(function (canvas) {
            try {
                var clonedCanvas = documentClone.querySelector('[' + html2canvasCanvasCloneAttribute + '="' + canvas.getAttribute(html2canvasCanvasCloneAttribute) + '"]');
                if (clonedCanvas) {
                    clonedCanvas.width = canvas.width;
                    clonedCanvas.height = canvas.height;
                    clonedCanvas.getContext("2d").putImageData(canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height), 0, 0);
                }
            } catch (e) {
                log("Unable to copy canvas content from", canvas, e);
            }
            canvas.removeAttribute(html2canvasCanvasCloneAttribute);
        });
    }

    function removeScriptNodes(parent) {
        [].slice.call(parent.childNodes, 0).filter(isElementNode).forEach(function (node) {
            if (node.tagName === "SCRIPT") {
                parent.removeChild(node);
            } else {
                removeScriptNodes(node);
            }
        });
        return parent;
    }

    function isElementNode(node) {
        return node.nodeType === Node.ELEMENT_NODE;
    }

    function absoluteUrl(url) {
        var link = document.createElement("a");
        link.href = url;
        link.href = link.href;
        return link;
    }

    // http://dev.w3.org/csswg/css-color/

    function Color(value) {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = null;
        var result = this.fromArray(value) ||
            this.namedColor(value) ||
            this.rgb(value) ||
            this.rgba(value) ||
            this.hex6(value) ||
            this.hex3(value);
    }

    Color.prototype.darken = function (amount) {
        var a = 1 - amount;
        return new Color([
            Math.round(this.r * a),
            Math.round(this.g * a),
            Math.round(this.b * a),
            this.a
        ]);
    };

    Color.prototype.isTransparent = function () {
        return this.a === 0;
    };

    Color.prototype.isBlack = function () {
        return this.r === 0 && this.g === 0 && this.b === 0;
    };

    Color.prototype.fromArray = function (array) {
        if (Array.isArray(array)) {
            this.r = Math.min(array[0], 255);
            this.g = Math.min(array[1], 255);
            this.b = Math.min(array[2], 255);
            if (array.length > 3) {
                this.a = array[3];
            }
        }

        return (Array.isArray(array));
    };

    var _hex3 = /^#([a-f0-9]{3})$/i;

    Color.prototype.hex3 = function (value) {
        var match = null;
        if ((match = value.match(_hex3)) !== null) {
            this.r = parseInt(match[1][0] + match[1][0], 16);
            this.g = parseInt(match[1][1] + match[1][1], 16);
            this.b = parseInt(match[1][2] + match[1][2], 16);
        }
        return match !== null;
    };

    var _hex6 = /^#([a-f0-9]{6})$/i;

    Color.prototype.hex6 = function (value) {
        var match = null;
        if ((match = value.match(_hex6)) !== null) {
            this.r = parseInt(match[1].substring(0, 2), 16);
            this.g = parseInt(match[1].substring(2, 4), 16);
            this.b = parseInt(match[1].substring(4, 6), 16);
        }
        return match !== null;
    };


    var _rgb = /^rgb\((\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3})\)$/;

    Color.prototype.rgb = function (value) {
        var match = null;
        if ((match = value.match(_rgb)) !== null) {
            this.r = Number(match[1]);
            this.g = Number(match[2]);
            this.b = Number(match[3]);
        }
        return match !== null;
    };

    var _rgba = /^rgba\((\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3}) *, *(\d+\.?\d*)\)$/;

    Color.prototype.rgba = function (value) {
        var match = null;
        if ((match = value.match(_rgba)) !== null) {
            this.r = Number(match[1]);
            this.g = Number(match[2]);
            this.b = Number(match[3]);
            this.a = Number(match[4]);
        }
        return match !== null;
    };

    Color.prototype.toString = function () {
        return this.a !== null && this.a !== 1 ?
            "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")" :
            "rgb(" + [this.r, this.g, this.b].join(",") + ")";
    };

    Color.prototype.namedColor = function (value) {
        var color = colors[value.toLowerCase()];
        if (color) {
            this.r = color[0];
            this.g = color[1];
            this.b = color[2];
        } else if (value.toLowerCase() === "transparent") {
            this.r = this.g = this.b = this.a = 0;
            return true;
        }

        return !!color;
    };

    Color.prototype.isColor = true;

    // JSON.stringify([].slice.call($$('.named-color-table tr'), 1).map(function(row) { return [row.childNodes[3].textContent, row.childNodes[5].textContent.trim().split(",").map(Number)] }).reduce(function(data, row) {data[row[0]] = row[1]; return data}, {}))
    var colors = {
        "aliceblue": [240, 248, 255],
        "antiquewhite": [250, 235, 215],
        "aqua": [0, 255, 255],
        "aquamarine": [127, 255, 212],
        "azure": [240, 255, 255],
        "beige": [245, 245, 220],
        "bisque": [255, 228, 196],
        "black": [0, 0, 0],
        "blanchedalmond": [255, 235, 205],
        "blue": [0, 0, 255],
        "blueviolet": [138, 43, 226],
        "brown": [165, 42, 42],
        "burlywood": [222, 184, 135],
        "cadetblue": [95, 158, 160],
        "chartreuse": [127, 255, 0],
        "chocolate": [210, 105, 30],
        "coral": [255, 127, 80],
        "cornflowerblue": [100, 149, 237],
        "cornsilk": [255, 248, 220],
        "crimson": [220, 20, 60],
        "cyan": [0, 255, 255],
        "darkblue": [0, 0, 139],
        "darkcyan": [0, 139, 139],
        "darkgoldenrod": [184, 134, 11],
        "darkgray": [169, 169, 169],
        "darkgreen": [0, 100, 0],
        "darkgrey": [169, 169, 169],
        "darkkhaki": [189, 183, 107],
        "darkmagenta": [139, 0, 139],
        "darkolivegreen": [85, 107, 47],
        "darkorange": [255, 140, 0],
        "darkorchid": [153, 50, 204],
        "darkred": [139, 0, 0],
        "darksalmon": [233, 150, 122],
        "darkseagreen": [143, 188, 143],
        "darkslateblue": [72, 61, 139],
        "darkslategray": [47, 79, 79],
        "darkslategrey": [47, 79, 79],
        "darkturquoise": [0, 206, 209],
        "darkviolet": [148, 0, 211],
        "deeppink": [255, 20, 147],
        "deepskyblue": [0, 191, 255],
        "dimgray": [105, 105, 105],
        "dimgrey": [105, 105, 105],
        "dodgerblue": [30, 144, 255],
        "firebrick": [178, 34, 34],
        "floralwhite": [255, 250, 240],
        "forestgreen": [34, 139, 34],
        "fuchsia": [255, 0, 255],
        "gainsboro": [220, 220, 220],
        "ghostwhite": [248, 248, 255],
        "gold": [255, 215, 0],
        "goldenrod": [218, 165, 32],
        "gray": [128, 128, 128],
        "green": [0, 128, 0],
        "greenyellow": [173, 255, 47],
        "grey": [128, 128, 128],
        "honeydew": [240, 255, 240],
        "hotpink": [255, 105, 180],
        "indianred": [205, 92, 92],
        "indigo": [75, 0, 130],
        "ivory": [255, 255, 240],
        "khaki": [240, 230, 140],
        "lavender": [230, 230, 250],
        "lavenderblush": [255, 240, 245],
        "lawngreen": [124, 252, 0],
        "lemonchiffon": [255, 250, 205],
        "lightblue": [173, 216, 230],
        "lightcoral": [240, 128, 128],
        "lightcyan": [224, 255, 255],
        "lightgoldenrodyellow": [250, 250, 210],
        "lightgray": [211, 211, 211],
        "lightgreen": [144, 238, 144],
        "lightgrey": [211, 211, 211],
        "lightpink": [255, 182, 193],
        "lightsalmon": [255, 160, 122],
        "lightseagreen": [32, 178, 170],
        "lightskyblue": [135, 206, 250],
        "lightslategray": [119, 136, 153],
        "lightslategrey": [119, 136, 153],
        "lightsteelblue": [176, 196, 222],
        "lightyellow": [255, 255, 224],
        "lime": [0, 255, 0],
        "limegreen": [50, 205, 50],
        "linen": [250, 240, 230],
        "magenta": [255, 0, 255],
        "maroon": [128, 0, 0],
        "mediumaquamarine": [102, 205, 170],
        "mediumblue": [0, 0, 205],
        "mediumorchid": [186, 85, 211],
        "mediumpurple": [147, 112, 219],
        "mediumseagreen": [60, 179, 113],
        "mediumslateblue": [123, 104, 238],
        "mediumspringgreen": [0, 250, 154],
        "mediumturquoise": [72, 209, 204],
        "mediumvioletred": [199, 21, 133],
        "midnightblue": [25, 25, 112],
        "mintcream": [245, 255, 250],
        "mistyrose": [255, 228, 225],
        "moccasin": [255, 228, 181],
        "navajowhite": [255, 222, 173],
        "navy": [0, 0, 128],
        "oldlace": [253, 245, 230],
        "olive": [128, 128, 0],
        "olivedrab": [107, 142, 35],
        "orange": [255, 165, 0],
        "orangered": [255, 69, 0],
        "orchid": [218, 112, 214],
        "palegoldenrod": [238, 232, 170],
        "palegreen": [152, 251, 152],
        "paleturquoise": [175, 238, 238],
        "palevioletred": [219, 112, 147],
        "papayawhip": [255, 239, 213],
        "peachpuff": [255, 218, 185],
        "peru": [205, 133, 63],
        "pink": [255, 192, 203],
        "plum": [221, 160, 221],
        "powderblue": [176, 224, 230],
        "purple": [128, 0, 128],
        "rebeccapurple": [102, 51, 153],
        "red": [255, 0, 0],
        "rosybrown": [188, 143, 143],
        "royalblue": [65, 105, 225],
        "saddlebrown": [139, 69, 19],
        "salmon": [250, 128, 114],
        "sandybrown": [244, 164, 96],
        "seagreen": [46, 139, 87],
        "seashell": [255, 245, 238],
        "sienna": [160, 82, 45],
        "silver": [192, 192, 192],
        "skyblue": [135, 206, 235],
        "slateblue": [106, 90, 205],
        "slategray": [112, 128, 144],
        "slategrey": [112, 128, 144],
        "snow": [255, 250, 250],
        "springgreen": [0, 255, 127],
        "steelblue": [70, 130, 180],
        "tan": [210, 180, 140],
        "teal": [0, 128, 128],
        "thistle": [216, 191, 216],
        "tomato": [255, 99, 71],
        "turquoise": [64, 224, 208],
        "violet": [238, 130, 238],
        "wheat": [245, 222, 179],
        "white": [255, 255, 255],
        "whitesmoke": [245, 245, 245],
        "yellow": [255, 255, 0],
        "yellowgreen": [154, 205, 50]
    };


    function DummyImageContainer(src) {
        this.src = src;
        log("DummyImageContainer for", src);
        if (!this.promise || !this.image) {
            log("Initiating DummyImageContainer");
            DummyImageContainer.prototype.image = new Image();
            var image = this.image;
            DummyImageContainer.prototype.promise = new Promise(function (resolve, reject) {
                image.onload = resolve;
                image.onerror = reject;
                image.src = smallImage();
                if (image.complete === true) {
                    resolve(image);
                }
            });
        }
    }

    function Font(family, size) {
        var container = document.createElement('div'),
            img = document.createElement('img'),
            span = document.createElement('span'),
            sampleText = 'Hidden Text',
            baseline,
            middle;

        container.style.visibility = "hidden";
        container.style.fontFamily = family;
        container.style.fontSize = size;
        container.style.margin = 0;
        container.style.padding = 0;

        document.body.appendChild(container);

        img.src = smallImage();
        img.width = 1;
        img.height = 1;

        img.style.margin = 0;
        img.style.padding = 0;
        img.style.verticalAlign = "baseline";

        span.style.fontFamily = family;
        span.style.fontSize = size;
        span.style.margin = 0;
        span.style.padding = 0;

        span.appendChild(document.createTextNode(sampleText));
        container.appendChild(span);
        container.appendChild(img);
        baseline = (img.offsetTop - span.offsetTop) + 1;

        container.removeChild(span);
        container.appendChild(document.createTextNode(sampleText));

        container.style.lineHeight = "normal";
        img.style.verticalAlign = "super";

        middle = (img.offsetTop - container.offsetTop) + 1;

        document.body.removeChild(container);

        this.baseline = baseline;
        this.lineWidth = 1;
        this.middle = middle;
    }

    function FontMetrics() {
        this.data = {};
    }

    FontMetrics.prototype.getMetrics = function (family, size) {
        if (this.data[family + "-" + size] === undefined) {
            this.data[family + "-" + size] = new Font(family, size);
        }
        return this.data[family + "-" + size];
    };

    function FrameContainer(container, sameOrigin, options) {
        this.image = null;
        this.src = container;
        var self = this;
        var bounds = getBounds(container);
        this.promise = (!sameOrigin ? this.proxyLoad(options.proxy, bounds, options) : new Promise(function (resolve) {
            if (container.contentWindow.document.URL === "about:blank" || container.contentWindow.document.documentElement == null) {
                container.contentWindow.onload = container.onload = function () {
                    resolve(container);
                };
            } else {
                resolve(container);
            }
        })).then(function (container) {
            return html2canvas(container.contentWindow.document.documentElement, {
                type: 'view',
                width: container.width,
                height: container.height,
                proxy: options.proxy,
                javascriptEnabled: options.javascriptEnabled,
                removeContainer: options.removeContainer,
                allowTaint: options.allowTaint,
                imageTimeout: options.imageTimeout / 2
            });
        }).then(function (canvas) {
            return self.image = canvas;
        });
    }

    FrameContainer.prototype.proxyLoad = function (proxy, bounds, options) {
        var container = this.src;
        return loadUrlDocument(container.src, proxy, container.ownerDocument, bounds.width, bounds.height, options);
    };

    function GradientContainer(imageData) {
        this.src = imageData.value;
        this.colorStops = [];
        this.type = null;
        this.x0 = 0.5;
        this.y0 = 0.5;
        this.x1 = 0.5;
        this.y1 = 0.5;
        this.promise = Promise.resolve(true);
    }

    GradientContainer.prototype.TYPES = {
        LINEAR: 1,
        RADIAL: 2
    };

    function ImageContainer(src, cors) {
        this.src = src;
        this.image = new Image();
        var self = this;
        this.tainted = null;
        this.promise = new Promise(function (resolve, reject) {
            self.image.onload = resolve;
            self.image.onerror = reject;
            if (cors) {
                self.image.crossOrigin = "anonymous";
            }
            self.image.src = src;
            if (self.image.complete === true) {
                resolve(self.image);
            }
        });
    }

    function ImageLoader(options, support) {
        this.link = null;
        this.options = options;
        this.support = support;
        this.origin = this.getOrigin(window.location.href);
    }

    ImageLoader.prototype.findImages = function (nodes) {
        var images = [];
        nodes.reduce(function (imageNodes, container) {
            switch (container.node.nodeName) {
                case "IMG":
                    return imageNodes.concat([{
                        args: [container.node.src],
                        method: "url"
                    }]);
                case "svg":
                case "IFRAME":
                    return imageNodes.concat([{
                        args: [container.node],
                        method: container.node.nodeName
                    }]);
            }
            return imageNodes;
        }, []).forEach(this.addImage(images, this.loadImage), this);
        return images;
    };

    ImageLoader.prototype.findBackgroundImage = function (images, container) {
        container.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(images, this.loadImage), this);
        return images;
    };

    ImageLoader.prototype.addImage = function (images, callback) {
        return function (newImage) {
            newImage.args.forEach(function (image) {
                if (!this.imageExists(images, image)) {
                    images.splice(0, 0, callback.call(this, newImage));
                    log('Added image #' + (images.length), typeof (image) === "string" ? image.substring(0, 100) : image);
                }
            }, this);
        };
    };

    ImageLoader.prototype.hasImageBackground = function (imageData) {
        return imageData.method !== "none";
    };

    ImageLoader.prototype.loadImage = function (imageData) {
        if (imageData.method === "url") {
            var src = imageData.args[0];
            if (this.isSVG(src) && !this.support.svg && !this.options.allowTaint) {
                return new SVGContainer(src);
            } else if (src.match(/data:image\/.*;base64,/i)) {
                return new ImageContainer(src.replace(/url\(['"]{0,}|['"]{0,}\)$/ig, ''), false);
            } else if (this.isSameOrigin(src) || this.options.allowTaint === true || this.isSVG(src)) {
                return new ImageContainer(src, false);
            } else if (this.support.cors && !this.options.allowTaint && this.options.useCORS) {
                return new ImageContainer(src, true);
            } else if (this.options.proxy) {
                return new ProxyImageContainer(src, this.options.proxy);
            } else {
                return new DummyImageContainer(src);
            }
        } else if (imageData.method === "linear-gradient") {
            return new LinearGradientContainer(imageData);
        } else if (imageData.method === "gradient") {
            return new WebkitGradientContainer(imageData);
        } else if (imageData.method === "svg") {
            return new SVGNodeContainer(imageData.args[0], this.support.svg);
        } else if (imageData.method === "IFRAME") {
            return new FrameContainer(imageData.args[0], this.isSameOrigin(imageData.args[0].src), this.options);
        } else {
            return new DummyImageContainer(imageData);
        }
    };

    ImageLoader.prototype.isSVG = function (src) {
        return src.substring(src.length - 3).toLowerCase() === "svg" || SVGContainer.prototype.isInline(src);
    };

    ImageLoader.prototype.imageExists = function (images, src) {
        return images.some(function (image) {
            return image.src === src;
        });
    };

    ImageLoader.prototype.isSameOrigin = function (url) {
        return (this.getOrigin(url) === this.origin);
    };

    ImageLoader.prototype.getOrigin = function (url) {
        var link = this.link || (this.link = document.createElement("a"));
        link.href = url;
        link.href = link.href; // IE9, LOL! - http://jsfiddle.net/niklasvh/2e48b/
        return link.protocol + link.hostname + link.port;
    };

    ImageLoader.prototype.getPromise = function (container) {
        return this.timeout(container, this.options.imageTimeout)['catch'](function () {
            var dummy = new DummyImageContainer(container.src);
            return dummy.promise.then(function (image) {
                container.image = image;
            });
        });
    };

    ImageLoader.prototype.get = function (src) {
        var found = null;
        return this.images.some(function (img) {
            return (found = img).src === src;
        }) ? found : null;
    };

    ImageLoader.prototype.fetch = function (nodes) {
        this.images = nodes.reduce(bind(this.findBackgroundImage, this), this.findImages(nodes));
        this.images.forEach(function (image, index) {
            image.promise.then(function () {
                log("Succesfully loaded image #" + (index + 1), image);
            }, function (e) {
                log("Failed loading image #" + (index + 1), image, e);
            });
        });
        this.ready = Promise.all(this.images.map(this.getPromise, this));
        log("Finished searching images");
        return this;
    };

    ImageLoader.prototype.timeout = function (container, timeout) {
        var timer;
        var promise = Promise.race([container.promise, new Promise(function (res, reject) {
            timer = setTimeout(function () {
                log("Timed out loading image", container);
                reject(container);
            }, timeout);
        })]).then(function (container) {
            clearTimeout(timer);
            return container;
        });
        promise['catch'](function () {
            clearTimeout(timer);
        });
        return promise;
    };

    function LinearGradientContainer(imageData) {
        GradientContainer.apply(this, arguments);
        this.type = this.TYPES.LINEAR;

        var hasDirection = imageData.args[0].match(this.stepRegExp) === null;

        if (hasDirection) {
            imageData.args[0].split(" ").reverse().forEach(function (position) {
                switch (position) {
                    case "left":
                        this.x0 = 0;
                        this.x1 = 1;
                        break;
                    case "top":
                        this.y0 = 0;
                        this.y1 = 1;
                        break;
                    case "right":
                        this.x0 = 1;
                        this.x1 = 0;
                        break;
                    case "bottom":
                        this.y0 = 1;
                        this.y1 = 0;
                        break;
                    case "to":
                        var y0 = this.y0;
                        var x0 = this.x0;
                        this.y0 = this.y1;
                        this.x0 = this.x1;
                        this.x1 = x0;
                        this.y1 = y0;
                        break;
                }
            }, this);
        } else {
            this.y0 = 0;
            this.y1 = 1;
        }

        this.colorStops = imageData.args.slice(hasDirection ? 1 : 0).map(function (colorStop) {
            var colorStopMatch = colorStop.match(this.stepRegExp);
            return {
                color: new Color(colorStopMatch[1]),
                stop: colorStopMatch[3] === "%" ? colorStopMatch[2] / 100 : null
            };
        }, this);

        if (this.colorStops[0].stop === null) {
            this.colorStops[0].stop = 0;
        }

        if (this.colorStops[this.colorStops.length - 1].stop === null) {
            this.colorStops[this.colorStops.length - 1].stop = 1;
        }

        this.colorStops.forEach(function (colorStop, index) {
            if (colorStop.stop === null) {
                this.colorStops.slice(index).some(function (find, count) {
                    if (find.stop !== null) {
                        colorStop.stop = ((find.stop - this.colorStops[index - 1].stop) / (count + 1)) + this.colorStops[index - 1].stop;
                        return true;
                    } else {
                        return false;
                    }
                }, this);
            }
        }, this);
    }

    LinearGradientContainer.prototype = Object.create(GradientContainer.prototype);

    LinearGradientContainer.prototype.stepRegExp = /((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/;

    function log() {
        if (window.html2canvas.logging && window.console && window.console.log) {
            Function.prototype.bind.call(window.console.log, (window.console)).apply(window.console, [(Date.now() - window.html2canvas.start) + "ms", "html2canvas:"].concat([].slice.call(arguments, 0)));
        }
    }

    function NodeContainer(node, parent) {
        this.node = node;
        this.parent = parent;
        this.stack = null;
        this.bounds = null;
        this.borders = null;
        this.clip = [];
        this.backgroundClip = [];
        this.offsetBounds = null;
        this.visible = null;
        this.computedStyles = null;
        this.colors = {};
        this.styles = {};
        this.backgroundImages = null;
        this.transformData = null;
        this.transformMatrix = null;
        this.isPseudoElement = false;
        this.opacity = null;
    }

    NodeContainer.prototype.cloneTo = function (stack) {
        stack.visible = this.visible;
        stack.borders = this.borders;
        stack.bounds = this.bounds;
        stack.clip = this.clip;
        stack.backgroundClip = this.backgroundClip;
        stack.computedStyles = this.computedStyles;
        stack.styles = this.styles;
        stack.backgroundImages = this.backgroundImages;
        stack.opacity = this.opacity;
    };

    NodeContainer.prototype.getOpacity = function () {
        return this.opacity === null ? (this.opacity = this.cssFloat('opacity')) : this.opacity;
    };

    NodeContainer.prototype.assignStack = function (stack) {
        this.stack = stack;
        stack.children.push(this);
    };

    NodeContainer.prototype.isElementVisible = function () {
        return this.node.nodeType === Node.TEXT_NODE ? this.parent.visible : (
            this.css('display') !== "none" &&
            this.css('visibility') !== "hidden" &&
            !this.node.hasAttribute("data-html2canvas-ignore") &&
            (this.node.nodeName !== "INPUT" || this.node.getAttribute("type") !== "hidden")
        );
    };

    NodeContainer.prototype.css = function (attribute) {
        if (!this.computedStyles) {
            this.computedStyles = this.isPseudoElement ? this.parent.computedStyle(this.before ? ":before" : ":after") : this.computedStyle(null);
        }

        return this.styles[attribute] || (this.styles[attribute] = this.computedStyles[attribute]);
    };

    NodeContainer.prototype.prefixedCss = function (attribute) {
        var prefixes = ["webkit", "moz", "ms", "o"];
        var value = this.css(attribute);
        if (value === undefined) {
            prefixes.some(function (prefix) {
                value = this.css(prefix + attribute.substr(0, 1).toUpperCase() + attribute.substr(1));
                return value !== undefined;
            }, this);
        }
        return value === undefined ? null : value;
    };

    NodeContainer.prototype.computedStyle = function (type) {
        return this.node.ownerDocument.defaultView.getComputedStyle(this.node, type);
    };

    NodeContainer.prototype.cssInt = function (attribute) {
        var value = parseInt(this.css(attribute), 10);
        return (isNaN(value)) ? 0 : value; // borders in old IE are throwing 'medium' for demo.html
    };

    NodeContainer.prototype.color = function (attribute) {
        return this.colors[attribute] || (this.colors[attribute] = new Color(this.css(attribute)));
    };

    NodeContainer.prototype.cssFloat = function (attribute) {
        var value = parseFloat(this.css(attribute));
        return (isNaN(value)) ? 0 : value;
    };

    NodeContainer.prototype.fontWeight = function () {
        var weight = this.css("fontWeight");
        switch (parseInt(weight, 10)) {
            case 401:
                weight = "bold";
                break;
            case 400:
                weight = "normal";
                break;
        }
        return weight;
    };

    NodeContainer.prototype.parseClip = function () {
        var matches = this.css('clip').match(this.CLIP);
        if (matches) {
            return {
                top: parseInt(matches[1], 10),
                right: parseInt(matches[2], 10),
                bottom: parseInt(matches[3], 10),
                left: parseInt(matches[4], 10)
            };
        }
        return null;
    };

    NodeContainer.prototype.parseBackgroundImages = function () {
        return this.backgroundImages || (this.backgroundImages = parseBackgrounds(this.css("backgroundImage")));
    };

    NodeContainer.prototype.cssList = function (property, index) {
        var value = (this.css(property) || '').split(',');
        value = value[index || 0] || value[0] || 'auto';
        value = value.trim().split(' ');
        if (value.length === 1) {
            value = [value[0], value[0]];
        }
        return value;
    };

    NodeContainer.prototype.parseBackgroundSize = function (bounds, image, index) {
        var size = this.cssList("backgroundSize", index);
        var width, height;

        if (isPercentage(size[0])) {
            width = bounds.width * parseFloat(size[0]) / 100;
        } else if (/contain|cover/.test(size[0])) {
            var targetRatio = bounds.width / bounds.height,
                currentRatio = image.width / image.height;
            return (targetRatio < currentRatio ^ size[0] === 'contain') ? {
                width: bounds.height * currentRatio,
                height: bounds.height
            } : {
                width: bounds.width,
                height: bounds.width / currentRatio
            };
        } else {
            width = parseInt(size[0], 10);
        }

        if (size[0] === 'auto' && size[1] === 'auto') {
            height = image.height;
        } else if (size[1] === 'auto') {
            height = width / image.width * image.height;
        } else if (isPercentage(size[1])) {
            height = bounds.height * parseFloat(size[1]) / 100;
        } else {
            height = parseInt(size[1], 10);
        }

        if (size[0] === 'auto') {
            width = height / image.height * image.width;
        }

        return {
            width: width,
            height: height
        };
    };

    NodeContainer.prototype.parseBackgroundPosition = function (bounds, image, index, backgroundSize) {
        var position = this.cssList('backgroundPosition', index);
        var left, top;

        if (isPercentage(position[0])) {
            left = (bounds.width - (backgroundSize || image).width) * (parseFloat(position[0]) / 100);
        } else {
            left = parseInt(position[0], 10);
        }

        if (position[1] === 'auto') {
            top = left / image.width * image.height;
        } else if (isPercentage(position[1])) {
            top = (bounds.height - (backgroundSize || image).height) * parseFloat(position[1]) / 100;
        } else {
            top = parseInt(position[1], 10);
        }

        if (position[0] === 'auto') {
            left = top / image.height * image.width;
        }

        return {
            left: left,
            top: top
        };
    };

    NodeContainer.prototype.parseBackgroundRepeat = function (index) {
        return this.cssList("backgroundRepeat", index)[0];
    };

    NodeContainer.prototype.parseTextShadows = function () {
        var textShadow = this.css("textShadow");
        var results = [];

        if (textShadow && textShadow !== 'none') {
            var shadows = textShadow.match(this.TEXT_SHADOW_PROPERTY);
            for (var i = 0; shadows && (i < shadows.length); i++) {
                var s = shadows[i].match(this.TEXT_SHADOW_VALUES);
                results.push({
                    color: new Color(s[0]),
                    offsetX: s[1] ? parseFloat(s[1].replace('px', '')) : 0,
                    offsetY: s[2] ? parseFloat(s[2].replace('px', '')) : 0,
                    blur: s[3] ? s[3].replace('px', '') : 0
                });
            }
        }
        return results;
    };

    NodeContainer.prototype.parseTransform = function () {
        if (!this.transformData) {
            if (this.hasTransform()) {
                var offset = this.parseBounds();
                var origin = this.prefixedCss("transformOrigin").split(" ").map(removePx).map(asFloat);
                origin[0] += offset.left;
                origin[1] += offset.top;
                this.transformData = {
                    origin: origin,
                    matrix: this.parseTransformMatrix()
                };
            } else {
                this.transformData = {
                    origin: [0, 0],
                    matrix: [1, 0, 0, 1, 0, 0]
                };
            }
        }
        return this.transformData;
    };

    NodeContainer.prototype.parseTransformMatrix = function () {
        if (!this.transformMatrix) {
            var transform = this.prefixedCss("transform");
            var matrix = transform ? parseMatrix(transform.match(this.MATRIX_PROPERTY)) : null;
            this.transformMatrix = matrix ? matrix : [1, 0, 0, 1, 0, 0];
        }
        return this.transformMatrix;
    };

    NodeContainer.prototype.parseBounds = function () {
        return this.bounds || (this.bounds = this.hasTransform() ? offsetBounds(this.node) : getBounds(this.node));
    };

    NodeContainer.prototype.hasTransform = function () {
        return this.parseTransformMatrix().join(",") !== "1,0,0,1,0,0" || (this.parent && this.parent.hasTransform());
    };

    NodeContainer.prototype.getValue = function () {
        var value = this.node.value || "";
        if (this.node.tagName === "SELECT") {
            value = selectionValue(this.node);
        } else if (this.node.type === "password") {
            value = Array(value.length + 1).join('\u2022'); // jshint ignore:line
        }
        return value.length === 0 ? (this.node.placeholder || "") : value;
    };

    NodeContainer.prototype.MATRIX_PROPERTY = /(matrix)\((.+)\)/;
    NodeContainer.prototype.TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g;
    NodeContainer.prototype.TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g;
    NodeContainer.prototype.CLIP = /^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/;

    function selectionValue(node) {
        var option = node.options[node.selectedIndex || 0];
        return option ? (option.text || "") : "";
    }

    function parseMatrix(match) {
        if (match && match[1] === "matrix") {
            return match[2].split(",").map(function (s) {
                return parseFloat(s.trim());
            });
        }
    }

    function isPercentage(value) {
        return value.toString().indexOf("%") !== -1;
    }

    function parseBackgrounds(backgroundImage) {
        var whitespace = ' \r\n\t',
            method, definition, prefix, prefix_i, block, results = [],
            mode = 0,
            numParen = 0,
            quote, args;
        var appendResult = function () {
            if (method) {
                if (definition.substr(0, 1) === '"') {
                    definition = definition.substr(1, definition.length - 2);
                }
                if (definition) {
                    args.push(definition);
                }
                if (method.substr(0, 1) === '-' && (prefix_i = method.indexOf('-', 1) + 1) > 0) {
                    prefix = method.substr(0, prefix_i);
                    method = method.substr(prefix_i);
                }
                results.push({
                    prefix: prefix,
                    method: method.toLowerCase(),
                    value: block,
                    args: args,
                    image: null
                });
            }
            args = [];
            method = prefix = definition = block = '';
        };
        args = [];
        method = prefix = definition = block = '';
        backgroundImage.split("").forEach(function (c) {
            if (mode === 0 && whitespace.indexOf(c) > -1) {
                return;
            }
            switch (c) {
                case '"':
                    if (!quote) {
                        quote = c;
                    } else if (quote === c) {
                        quote = null;
                    }
                    break;
                case '(':
                    if (quote) {
                        break;
                    } else if (mode === 0) {
                        mode = 1;
                        block += c;
                        return;
                    } else {
                        numParen++;
                    }
                    break;
                case ')':
                    if (quote) {
                        break;
                    } else if (mode === 1) {
                        if (numParen === 0) {
                            mode = 0;
                            block += c;
                            appendResult();
                            return;
                        } else {
                            numParen--;
                        }
                    }
                    break;

                case ',':
                    if (quote) {
                        break;
                    } else if (mode === 0) {
                        appendResult();
                        return;
                    } else if (mode === 1) {
                        if (numParen === 0 && !method.match(/^url$/i)) {
                            args.push(definition);
                            definition = '';
                            block += c;
                            return;
                        }
                    }
                    break;
            }

            block += c;
            if (mode === 0) {
                method += c;
            } else {
                definition += c;
            }
        });

        appendResult();
        return results;
    }

    function removePx(str) {
        return str.replace("px", "");
    }

    function asFloat(str) {
        return parseFloat(str);
    }

    function getBounds(node) {
        if (node.getBoundingClientRect) {
            var clientRect = node.getBoundingClientRect();
            var width = node.offsetWidth == null ? clientRect.width : node.offsetWidth;
            return {
                top: clientRect.top,
                bottom: clientRect.bottom || (clientRect.top + clientRect.height),
                right: clientRect.left + width,
                left: clientRect.left,
                width: width,
                height: node.offsetHeight == null ? clientRect.height : node.offsetHeight
            };
        }
        return {};
    }

    function offsetBounds(node) {
        var parent = node.offsetParent ? offsetBounds(node.offsetParent) : {
            top: 0,
            left: 0
        };

        return {
            top: node.offsetTop + parent.top,
            bottom: node.offsetTop + node.offsetHeight + parent.top,
            right: node.offsetLeft + parent.left + node.offsetWidth,
            left: node.offsetLeft + parent.left,
            width: node.offsetWidth,
            height: node.offsetHeight
        };
    }

    function NodeParser(element, renderer, support, imageLoader, options) {
        log("Starting NodeParser");
        this.renderer = renderer;
        this.options = options;
        this.range = null;
        this.support = support;
        this.renderQueue = [];
        this.stack = new StackingContext(true, 1, element.ownerDocument, null);
        var parent = new NodeContainer(element, null);
        if (options.background) {
            renderer.rectangle(0, 0, renderer.width, renderer.height, new Color(options.background));
        }
        if (element === element.ownerDocument.documentElement) {
            // http://www.w3.org/TR/css3-background/#special-backgrounds
            var canvasBackground = new NodeContainer(parent.color('backgroundColor').isTransparent() ? element.ownerDocument.body : element.ownerDocument.documentElement, null);
            renderer.rectangle(0, 0, renderer.width, renderer.height, canvasBackground.color('backgroundColor'));
        }
        parent.visibile = parent.isElementVisible();
        this.createPseudoHideStyles(element.ownerDocument);
        this.disableAnimations(element.ownerDocument);
        this.nodes = flatten([parent].concat(this.getChildren(parent)).filter(function (container) {
            return container.visible = container.isElementVisible();
        }).map(this.getPseudoElements, this));
        this.fontMetrics = new FontMetrics();
        log("Fetched nodes, total:", this.nodes.length);
        log("Calculate overflow clips");
        this.calculateOverflowClips();
        log("Start fetching images");
        this.images = imageLoader.fetch(this.nodes.filter(isElement));
        this.ready = this.images.ready.then(bind(function () {
            log("Images loaded, starting parsing");
            log("Creating stacking contexts");
            this.createStackingContexts();
            log("Sorting stacking contexts");
            this.sortStackingContexts(this.stack);
            this.parse(this.stack);
            log("Render queue created with " + this.renderQueue.length + " items");
            return new Promise(bind(function (resolve) {
                if (!options.async) {
                    this.renderQueue.forEach(this.paint, this);
                    resolve();
                } else if (typeof (options.async) === "function") {
                    options.async.call(this, this.renderQueue, resolve);
                } else if (this.renderQueue.length > 0) {
                    this.renderIndex = 0;
                    this.asyncRenderer(this.renderQueue, resolve);
                } else {
                    resolve();
                }
            }, this));
        }, this));
    }

    NodeParser.prototype.calculateOverflowClips = function () {
        this.nodes.forEach(function (container) {
            if (isElement(container)) {
                if (isPseudoElement(container)) {
                    container.appendToDOM();
                }
                container.borders = this.parseBorders(container);
                var clip = (container.css('overflow') === "hidden") ? [container.borders.clip] : [];
                var cssClip = container.parseClip();
                if (cssClip && ["absolute", "fixed"].indexOf(container.css('position')) !== -1) {
                    clip.push([
                        ["rect",
                            container.bounds.left + cssClip.left,
                            container.bounds.top + cssClip.top,
                            cssClip.right - cssClip.left,
                            cssClip.bottom - cssClip.top
                        ]
                    ]);
                }
                container.clip = hasParentClip(container) ? container.parent.clip.concat(clip) : clip;
                container.backgroundClip = (container.css('overflow') !== "hidden") ? container.clip.concat([container.borders.clip]) : container.clip;
                if (isPseudoElement(container)) {
                    container.cleanDOM();
                }
            } else if (isTextNode(container)) {
                container.clip = hasParentClip(container) ? container.parent.clip : [];
            }
            if (!isPseudoElement(container)) {
                container.bounds = null;
            }
        }, this);
    };

    function hasParentClip(container) {
        return container.parent && container.parent.clip.length;
    }

    NodeParser.prototype.asyncRenderer = function (queue, resolve, asyncTimer) {
        asyncTimer = asyncTimer || Date.now();
        this.paint(queue[this.renderIndex++]);
        if (queue.length === this.renderIndex) {
            resolve();
        } else if (asyncTimer + 20 > Date.now()) {
            this.asyncRenderer(queue, resolve, asyncTimer);
        } else {
            setTimeout(bind(function () {
                this.asyncRenderer(queue, resolve);
            }, this), 0);
        }
    };

    NodeParser.prototype.createPseudoHideStyles = function (document) {
        this.createStyles(document, '.' + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ':before { content: "" !important; display: none !important; }' +
            '.' + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER + ':after { content: "" !important; display: none !important; }');
    };

    NodeParser.prototype.disableAnimations = function (document) {
        this.createStyles(document, '* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; ' +
            '-webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}');
    };

    NodeParser.prototype.createStyles = function (document, styles) {
        var hidePseudoElements = document.createElement('style');
        hidePseudoElements.innerHTML = styles;
        document.body.appendChild(hidePseudoElements);
    };

    NodeParser.prototype.getPseudoElements = function (container) {
        var nodes = [
            [container]
        ];
        if (container.node.nodeType === Node.ELEMENT_NODE) {
            var before = this.getPseudoElement(container, ":before");
            var after = this.getPseudoElement(container, ":after");

            if (before) {
                nodes.push(before);
            }

            if (after) {
                nodes.push(after);
            }
        }
        return flatten(nodes);
    };

    function toCamelCase(str) {
        return str.replace(/(\-[a-z])/g, function (match) {
            return match.toUpperCase().replace('-', '');
        });
    }

    NodeParser.prototype.getPseudoElement = function (container, type) {
        var style = container.computedStyle(type);
        if (!style || !style.content || style.content === "none" || style.content === "-moz-alt-content" || style.display === "none") {
            return null;
        }

        var content = stripQuotes(style.content);
        var isImage = content.substr(0, 3) === 'url';
        var pseudoNode = document.createElement(isImage ? 'img' : 'html2canvaspseudoelement');
        var pseudoContainer = new PseudoElementContainer(pseudoNode, container, type);

        for (var i = style.length - 1; i >= 0; i--) {
            var property = toCamelCase(style.item(i));
            pseudoNode.style[property] = style[property];
        }

        pseudoNode.className = PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER;

        if (isImage) {
            pseudoNode.src = parseBackgrounds(content)[0].args[0];
            return [pseudoContainer];
        } else {
            var text = document.createTextNode(content);
            pseudoNode.appendChild(text);
            return [pseudoContainer, new TextContainer(text, pseudoContainer)];
        }
    };


    NodeParser.prototype.getChildren = function (parentContainer) {
        return flatten([].filter.call(parentContainer.node.childNodes, renderableNode).map(function (node) {
            var container = [node.nodeType === Node.TEXT_NODE ? new TextContainer(node, parentContainer) : new NodeContainer(node, parentContainer)].filter(nonIgnoredElement);
            return node.nodeType === Node.ELEMENT_NODE && container.length && node.tagName !== "TEXTAREA" ? (container[0].isElementVisible() ? container.concat(this.getChildren(container[0])) : []) : container;
        }, this));
    };

    NodeParser.prototype.newStackingContext = function (container, hasOwnStacking) {
        var stack = new StackingContext(hasOwnStacking, container.getOpacity(), container.node, container.parent);
        container.cloneTo(stack);
        var parentStack = hasOwnStacking ? stack.getParentStack(this) : stack.parent.stack;
        parentStack.contexts.push(stack);
        container.stack = stack;
    };

    NodeParser.prototype.createStackingContexts = function () {
        this.nodes.forEach(function (container) {
            if (isElement(container) && (this.isRootElement(container) || hasOpacity(container) || isPositionedForStacking(container) || this.isBodyWithTransparentRoot(container) || container.hasTransform())) {
                this.newStackingContext(container, true);
            } else if (isElement(container) && ((isPositioned(container) && zIndex0(container)) || isInlineBlock(container) || isFloating(container))) {
                this.newStackingContext(container, false);
            } else {
                container.assignStack(container.parent.stack);
            }
        }, this);
    };

    NodeParser.prototype.isBodyWithTransparentRoot = function (container) {
        return container.node.nodeName === "BODY" && container.parent.color('backgroundColor').isTransparent();
    };

    NodeParser.prototype.isRootElement = function (container) {
        return container.parent === null;
    };

    NodeParser.prototype.sortStackingContexts = function (stack) {
        stack.contexts.sort(zIndexSort(stack.contexts.slice(0)));
        stack.contexts.forEach(this.sortStackingContexts, this);
    };

    NodeParser.prototype.parseTextBounds = function (container) {
        return function (text, index, textList) {
            if (container.parent.css("textDecoration").substr(0, 4) !== "none" || text.trim().length !== 0) {
                if (this.support.rangeBounds && !container.parent.hasTransform()) {
                    var offset = textList.slice(0, index).join("").length;
                    return this.getRangeBounds(container.node, offset, text.length);
                } else if (container.node && typeof (container.node.data) === "string") {
                    var replacementNode = container.node.splitText(text.length);
                    var bounds = this.getWrapperBounds(container.node, container.parent.hasTransform());
                    container.node = replacementNode;
                    return bounds;
                }
            } else if (!this.support.rangeBounds || container.parent.hasTransform()) {
                container.node = container.node.splitText(text.length);
            }
            return {};
        };
    };

    NodeParser.prototype.getWrapperBounds = function (node, transform) {
        var wrapper = node.ownerDocument.createElement('html2canvaswrapper');
        var parent = node.parentNode,
            backupText = node.cloneNode(true);

        wrapper.appendChild(node.cloneNode(true));
        parent.replaceChild(wrapper, node);
        var bounds = transform ? offsetBounds(wrapper) : getBounds(wrapper);
        parent.replaceChild(backupText, wrapper);
        return bounds;
    };

    NodeParser.prototype.getRangeBounds = function (node, offset, length) {
        var range = this.range || (this.range = node.ownerDocument.createRange());
        range.setStart(node, offset);
        range.setEnd(node, offset + length);
        return range.getBoundingClientRect();
    };

    function ClearTransform() {}

    NodeParser.prototype.parse = function (stack) {
        // http://www.w3.org/TR/CSS21/visuren.html#z-index
        var negativeZindex = stack.contexts.filter(negativeZIndex); // 2. the child stacking contexts with negative stack levels (most negative first).
        var descendantElements = stack.children.filter(isElement);
        var descendantNonFloats = descendantElements.filter(not(isFloating));
        var nonInlineNonPositionedDescendants = descendantNonFloats.filter(not(isPositioned)).filter(not(inlineLevel)); // 3 the in-flow, non-inline-level, non-positioned descendants.
        var nonPositionedFloats = descendantElements.filter(not(isPositioned)).filter(isFloating); // 4. the non-positioned floats.
        var inFlow = descendantNonFloats.filter(not(isPositioned)).filter(inlineLevel); // 5. the in-flow, inline-level, non-positioned descendants, including inline tables and inline blocks.
        var stackLevel0 = stack.contexts.concat(descendantNonFloats.filter(isPositioned)).filter(zIndex0); // 6. the child stacking contexts with stack level 0 and the positioned descendants with stack level 0.
        var text = stack.children.filter(isTextNode).filter(hasText);
        var positiveZindex = stack.contexts.filter(positiveZIndex); // 7. the child stacking contexts with positive stack levels (least positive first).
        negativeZindex.concat(nonInlineNonPositionedDescendants).concat(nonPositionedFloats)
            .concat(inFlow).concat(stackLevel0).concat(text).concat(positiveZindex).forEach(function (container) {
                this.renderQueue.push(container);
                if (isStackingContext(container)) {
                    this.parse(container);
                    this.renderQueue.push(new ClearTransform());
                }
            }, this);
    };

    NodeParser.prototype.paint = function (container) {
        try {
            if (container instanceof ClearTransform) {
                this.renderer.ctx.restore();
            } else if (isTextNode(container)) {
                if (isPseudoElement(container.parent)) {
                    container.parent.appendToDOM();
                }
                this.paintText(container);
                if (isPseudoElement(container.parent)) {
                    container.parent.cleanDOM();
                }
            } else {
                this.paintNode(container);
            }
        } catch (e) {
            log(e);
            if (this.options.strict) {
                throw e;
            }
        }
    };

    NodeParser.prototype.paintNode = function (container) {
        if (isStackingContext(container)) {
            this.renderer.setOpacity(container.opacity);
            this.renderer.ctx.save();
            if (container.hasTransform()) {
                this.renderer.setTransform(container.parseTransform());
            }
        }

        if (container.node.nodeName === "INPUT" && container.node.type === "checkbox") {
            this.paintCheckbox(container);
        } else if (container.node.nodeName === "INPUT" && container.node.type === "radio") {
            this.paintRadio(container);
        } else {
            this.paintElement(container);
        }
    };

    NodeParser.prototype.paintElement = function (container) {
        var bounds = container.parseBounds();
        this.renderer.clip(container.backgroundClip, function () {
            this.renderer.renderBackground(container, bounds, container.borders.borders.map(getWidth));
        }, this);

        this.renderer.clip(container.clip, function () {
            this.renderer.renderBorders(container.borders.borders);
        }, this);

        this.renderer.clip(container.backgroundClip, function () {
            switch (container.node.nodeName) {
                case "svg":
                case "IFRAME":
                    var imgContainer = this.images.get(container.node);
                    if (imgContainer) {
                        this.renderer.renderImage(container, bounds, container.borders, imgContainer);
                    } else {
                        log("Error loading <" + container.node.nodeName + ">", container.node);
                    }
                    break;
                case "IMG":
                    var imageContainer = this.images.get(container.node.src);
                    if (imageContainer) {
                        this.renderer.renderImage(container, bounds, container.borders, imageContainer);
                    } else {
                        log("Error loading <img>", container.node.src);
                    }
                    break;
                case "CANVAS":
                    this.renderer.renderImage(container, bounds, container.borders, {
                        image: container.node
                    });
                    break;
                case "SELECT":
                case "INPUT":
                case "TEXTAREA":
                    this.paintFormValue(container);
                    break;
            }
        }, this);
    };

    NodeParser.prototype.paintCheckbox = function (container) {
        var b = container.parseBounds();

        var size = Math.min(b.width, b.height);
        var bounds = {
            width: size - 1,
            height: size - 1,
            top: b.top,
            left: b.left
        };
        var r = [3, 3];
        var radius = [r, r, r, r];
        var borders = [1, 1, 1, 1].map(function (w) {
            return {
                color: new Color('#A5A5A5'),
                width: w
            };
        });

        var borderPoints = calculateCurvePoints(bounds, radius, borders);

        this.renderer.clip(container.backgroundClip, function () {
            this.renderer.rectangle(bounds.left + 1, bounds.top + 1, bounds.width - 2, bounds.height - 2, new Color("#DEDEDE"));
            this.renderer.renderBorders(calculateBorders(borders, bounds, borderPoints, radius));
            if (container.node.checked) {
                this.renderer.font(new Color('#424242'), 'normal', 'normal', 'bold', (size - 3) + "px", 'arial');
                this.renderer.text("\u2714", bounds.left + size / 6, bounds.top + size - 1);
            }
        }, this);
    };

    NodeParser.prototype.paintRadio = function (container) {
        var bounds = container.parseBounds();

        var size = Math.min(bounds.width, bounds.height) - 2;

        this.renderer.clip(container.backgroundClip, function () {
            this.renderer.circleStroke(bounds.left + 1, bounds.top + 1, size, new Color('#DEDEDE'), 1, new Color('#A5A5A5'));
            if (container.node.checked) {
                this.renderer.circle(Math.ceil(bounds.left + size / 4) + 1, Math.ceil(bounds.top + size / 4) + 1, Math.floor(size / 2), new Color('#424242'));
            }
        }, this);
    };

    NodeParser.prototype.paintFormValue = function (container) {
        var value = container.getValue();
        if (value.length > 0) {
            var document = container.node.ownerDocument;
            var wrapper = document.createElement('html2canvaswrapper');
            var properties = ['lineHeight', 'textAlign', 'fontFamily', 'fontWeight', 'fontSize', 'color',
                'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom',
                'width', 'height', 'borderLeftStyle', 'borderTopStyle', 'borderLeftWidth', 'borderTopWidth',
                'boxSizing', 'whiteSpace', 'wordWrap'
            ];

            properties.forEach(function (property) {
                try {
                    wrapper.style[property] = container.css(property);
                } catch (e) {
                    // Older IE has issues with "border"
                    log("html2canvas: Parse: Exception caught in renderFormValue: " + e.message);
                }
            });
            var bounds = container.parseBounds();
            wrapper.style.position = "fixed";
            wrapper.style.left = bounds.left + "px";
            wrapper.style.top = bounds.top + "px";
            wrapper.textContent = value;
            document.body.appendChild(wrapper);
            this.paintText(new TextContainer(wrapper.firstChild, container));
            document.body.removeChild(wrapper);
        }
    };

    NodeParser.prototype.paintText = function (container) {
        container.applyTextTransform();
        var characters = window.html2canvas.punycode.ucs2.decode(container.node.data);
        var textList = (!this.options.letterRendering || noLetterSpacing(container)) && !hasUnicode(container.node.data) ? getWords(characters) : characters.map(function (character) {
            return window.html2canvas.punycode.ucs2.encode([character]);
        });

        var weight = container.parent.fontWeight();
        var size = container.parent.css('fontSize');
        var family = container.parent.css('fontFamily');
        var shadows = container.parent.parseTextShadows();

        this.renderer.font(container.parent.color('color'), container.parent.css('fontStyle'), container.parent.css('fontVariant'), weight, size, family);
        if (shadows.length) {
            // TODO: support multiple text shadows
            this.renderer.fontShadow(shadows[0].color, shadows[0].offsetX, shadows[0].offsetY, shadows[0].blur);
        } else {
            this.renderer.clearShadow();
        }

        this.renderer.clip(container.parent.clip, function () {
            textList.map(this.parseTextBounds(container), this).forEach(function (bounds, index) {
                if (bounds) {
                    this.renderer.text(textList[index], bounds.left, bounds.bottom);
                    this.renderTextDecoration(container.parent, bounds, this.fontMetrics.getMetrics(family, size));
                }
            }, this);
        }, this);
    };

    NodeParser.prototype.renderTextDecoration = function (container, bounds, metrics) {
        switch (container.css("textDecoration").split(" ")[0]) {
            case "underline":
                // Draws a line at the baseline of the font
                // TODO As some browsers display the line as more than 1px if the font-size is big, need to take that into account both in position and size
                this.renderer.rectangle(bounds.left, Math.round(bounds.top + metrics.baseline + metrics.lineWidth), bounds.width, 1, container.color("color"));
                break;
            case "overline":
                this.renderer.rectangle(bounds.left, Math.round(bounds.top), bounds.width, 1, container.color("color"));
                break;
            case "line-through":
                // TODO try and find exact position for line-through
                this.renderer.rectangle(bounds.left, Math.ceil(bounds.top + metrics.middle + metrics.lineWidth), bounds.width, 1, container.color("color"));
                break;
        }
    };

    var borderColorTransforms = {
        inset: [
            ["darken", 0.60],
            ["darken", 0.10],
            ["darken", 0.10],
            ["darken", 0.60]
        ]
    };

    NodeParser.prototype.parseBorders = function (container) {
        var nodeBounds = container.parseBounds();
        var radius = getBorderRadiusData(container);
        var borders = ["Top", "Right", "Bottom", "Left"].map(function (side, index) {
            var style = container.css('border' + side + 'Style');
            var color = container.color('border' + side + 'Color');
            if (style === "inset" && color.isBlack()) {
                color = new Color([255, 255, 255, color.a]); // this is wrong, but
            }
            var colorTransform = borderColorTransforms[style] ? borderColorTransforms[style][index] : null;
            return {
                width: container.cssInt('border' + side + 'Width'),
                color: colorTransform ? color[colorTransform[0]](colorTransform[1]) : color,
                args: null
            };
        });
        var borderPoints = calculateCurvePoints(nodeBounds, radius, borders);

        return {
            clip: this.parseBackgroundClip(container, borderPoints, borders, radius, nodeBounds),
            borders: calculateBorders(borders, nodeBounds, borderPoints, radius)
        };
    };

    function calculateBorders(borders, nodeBounds, borderPoints, radius) {
        return borders.map(function (border, borderSide) {
            if (border.width > 0) {
                var bx = nodeBounds.left;
                var by = nodeBounds.top;
                var bw = nodeBounds.width;
                var bh = nodeBounds.height - (borders[2].width);

                switch (borderSide) {
                    case 0:
                        // top border
                        bh = borders[0].width;
                        border.args = drawSide({
                                c1: [bx, by],
                                c2: [bx + bw, by],
                                c3: [bx + bw - borders[1].width, by + bh],
                                c4: [bx + borders[3].width, by + bh]
                            }, radius[0], radius[1],
                            borderPoints.topLeftOuter, borderPoints.topLeftInner, borderPoints.topRightOuter, borderPoints.topRightInner);
                        break;
                    case 1:
                        // right border
                        bx = nodeBounds.left + nodeBounds.width - (borders[1].width);
                        bw = borders[1].width;

                        border.args = drawSide({
                                c1: [bx + bw, by],
                                c2: [bx + bw, by + bh + borders[2].width],
                                c3: [bx, by + bh],
                                c4: [bx, by + borders[0].width]
                            }, radius[1], radius[2],
                            borderPoints.topRightOuter, borderPoints.topRightInner, borderPoints.bottomRightOuter, borderPoints.bottomRightInner);
                        break;
                    case 2:
                        // bottom border
                        by = (by + nodeBounds.height) - (borders[2].width);
                        bh = borders[2].width;
                        border.args = drawSide({
                                c1: [bx + bw, by + bh],
                                c2: [bx, by + bh],
                                c3: [bx + borders[3].width, by],
                                c4: [bx + bw - borders[3].width, by]
                            }, radius[2], radius[3],
                            borderPoints.bottomRightOuter, borderPoints.bottomRightInner, borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner);
                        break;
                    case 3:
                        // left border
                        bw = borders[3].width;
                        border.args = drawSide({
                                c1: [bx, by + bh + borders[2].width],
                                c2: [bx, by],
                                c3: [bx + bw, by + borders[0].width],
                                c4: [bx + bw, by + bh]
                            }, radius[3], radius[0],
                            borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner, borderPoints.topLeftOuter, borderPoints.topLeftInner);
                        break;
                }
            }
            return border;
        });
    }

    NodeParser.prototype.parseBackgroundClip = function (container, borderPoints, borders, radius, bounds) {
        var backgroundClip = container.css('backgroundClip'),
            borderArgs = [];

        switch (backgroundClip) {
            case "content-box":
            case "padding-box":
                parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftInner, borderPoints.topRightInner, bounds.left + borders[3].width, bounds.top + borders[0].width);
                parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightInner, borderPoints.bottomRightInner, bounds.left + bounds.width - borders[1].width, bounds.top + borders[0].width);
                parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightInner, borderPoints.bottomLeftInner, bounds.left + bounds.width - borders[1].width, bounds.top + bounds.height - borders[2].width);
                parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftInner, borderPoints.topLeftInner, bounds.left + borders[3].width, bounds.top + bounds.height - borders[2].width);
                break;

            default:
                parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftOuter, borderPoints.topRightOuter, bounds.left, bounds.top);
                parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightOuter, borderPoints.bottomRightOuter, bounds.left + bounds.width, bounds.top);
                parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightOuter, borderPoints.bottomLeftOuter, bounds.left + bounds.width, bounds.top + bounds.height);
                parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftOuter, borderPoints.topLeftOuter, bounds.left, bounds.top + bounds.height);
                break;
        }

        return borderArgs;
    };

    function getCurvePoints(x, y, r1, r2) {
        var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
        var ox = (r1) * kappa, // control point offset horizontal
            oy = (r2) * kappa, // control point offset vertical
            xm = x + r1, // x-middle
            ym = y + r2; // y-middle
        return {
            topLeft: bezierCurve({
                x: x,
                y: ym
            }, {
                x: x,
                y: ym - oy
            }, {
                x: xm - ox,
                y: y
            }, {
                x: xm,
                y: y
            }),
            topRight: bezierCurve({
                x: x,
                y: y
            }, {
                x: x + ox,
                y: y
            }, {
                x: xm,
                y: ym - oy
            }, {
                x: xm,
                y: ym
            }),
            bottomRight: bezierCurve({
                x: xm,
                y: y
            }, {
                x: xm,
                y: y + oy
            }, {
                x: x + ox,
                y: ym
            }, {
                x: x,
                y: ym
            }),
            bottomLeft: bezierCurve({
                x: xm,
                y: ym
            }, {
                x: xm - ox,
                y: ym
            }, {
                x: x,
                y: y + oy
            }, {
                x: x,
                y: y
            })
        };
    }

    function calculateCurvePoints(bounds, borderRadius, borders) {
        var x = bounds.left,
            y = bounds.top,
            width = bounds.width,
            height = bounds.height,

            tlh = borderRadius[0][0],
            tlv = borderRadius[0][1],
            trh = borderRadius[1][0],
            trv = borderRadius[1][1],
            brh = borderRadius[2][0],
            brv = borderRadius[2][1],
            blh = borderRadius[3][0],
            blv = borderRadius[3][1];

        var topWidth = width - trh,
            rightHeight = height - brv,
            bottomWidth = width - brh,
            leftHeight = height - blv;

        return {
            topLeftOuter: getCurvePoints(x, y, tlh, tlv).topLeft.subdivide(0.5),
            topLeftInner: getCurvePoints(x + borders[3].width, y + borders[0].width, Math.max(0, tlh - borders[3].width), Math.max(0, tlv - borders[0].width)).topLeft.subdivide(0.5),
            topRightOuter: getCurvePoints(x + topWidth, y, trh, trv).topRight.subdivide(0.5),
            topRightInner: getCurvePoints(x + Math.min(topWidth, width + borders[3].width), y + borders[0].width, (topWidth > width + borders[3].width) ? 0 : trh - borders[3].width, trv - borders[0].width).topRight.subdivide(0.5),
            bottomRightOuter: getCurvePoints(x + bottomWidth, y + rightHeight, brh, brv).bottomRight.subdivide(0.5),
            bottomRightInner: getCurvePoints(x + Math.min(bottomWidth, width - borders[3].width), y + Math.min(rightHeight, height + borders[0].width), Math.max(0, brh - borders[1].width), brv - borders[2].width).bottomRight.subdivide(0.5),
            bottomLeftOuter: getCurvePoints(x, y + leftHeight, blh, blv).bottomLeft.subdivide(0.5),
            bottomLeftInner: getCurvePoints(x + borders[3].width, y + leftHeight, Math.max(0, blh - borders[3].width), blv - borders[2].width).bottomLeft.subdivide(0.5)
        };
    }

    function bezierCurve(start, startControl, endControl, end) {
        var lerp = function (a, b, t) {
            return {
                x: a.x + (b.x - a.x) * t,
                y: a.y + (b.y - a.y) * t
            };
        };

        return {
            start: start,
            startControl: startControl,
            endControl: endControl,
            end: end,
            subdivide: function (t) {
                var ab = lerp(start, startControl, t),
                    bc = lerp(startControl, endControl, t),
                    cd = lerp(endControl, end, t),
                    abbc = lerp(ab, bc, t),
                    bccd = lerp(bc, cd, t),
                    dest = lerp(abbc, bccd, t);
                return [bezierCurve(start, ab, abbc, dest), bezierCurve(dest, bccd, cd, end)];
            },
            curveTo: function (borderArgs) {
                borderArgs.push(["bezierCurve", startControl.x, startControl.y, endControl.x, endControl.y, end.x, end.y]);
            },
            curveToReversed: function (borderArgs) {
                borderArgs.push(["bezierCurve", endControl.x, endControl.y, startControl.x, startControl.y, start.x, start.y]);
            }
        };
    }

    function drawSide(borderData, radius1, radius2, outer1, inner1, outer2, inner2) {
        var borderArgs = [];

        if (radius1[0] > 0 || radius1[1] > 0) {
            borderArgs.push(["line", outer1[1].start.x, outer1[1].start.y]);
            outer1[1].curveTo(borderArgs);
        } else {
            borderArgs.push(["line", borderData.c1[0], borderData.c1[1]]);
        }

        if (radius2[0] > 0 || radius2[1] > 0) {
            borderArgs.push(["line", outer2[0].start.x, outer2[0].start.y]);
            outer2[0].curveTo(borderArgs);
            borderArgs.push(["line", inner2[0].end.x, inner2[0].end.y]);
            inner2[0].curveToReversed(borderArgs);
        } else {
            borderArgs.push(["line", borderData.c2[0], borderData.c2[1]]);
            borderArgs.push(["line", borderData.c3[0], borderData.c3[1]]);
        }

        if (radius1[0] > 0 || radius1[1] > 0) {
            borderArgs.push(["line", inner1[1].end.x, inner1[1].end.y]);
            inner1[1].curveToReversed(borderArgs);
        } else {
            borderArgs.push(["line", borderData.c4[0], borderData.c4[1]]);
        }

        return borderArgs;
    }

    function parseCorner(borderArgs, radius1, radius2, corner1, corner2, x, y) {
        if (radius1[0] > 0 || radius1[1] > 0) {
            borderArgs.push(["line", corner1[0].start.x, corner1[0].start.y]);
            corner1[0].curveTo(borderArgs);
            corner1[1].curveTo(borderArgs);
        } else {
            borderArgs.push(["line", x, y]);
        }

        if (radius2[0] > 0 || radius2[1] > 0) {
            borderArgs.push(["line", corner2[0].start.x, corner2[0].start.y]);
        }
    }

    function negativeZIndex(container) {
        return container.cssInt("zIndex") < 0;
    }

    function positiveZIndex(container) {
        return container.cssInt("zIndex") > 0;
    }

    function zIndex0(container) {
        return container.cssInt("zIndex") === 0;
    }

    function inlineLevel(container) {
        return ["inline", "inline-block", "inline-table"].indexOf(container.css("display")) !== -1;
    }

    function isStackingContext(container) {
        return (container instanceof StackingContext);
    }

    function hasText(container) {
        return container.node.data.trim().length > 0;
    }

    function noLetterSpacing(container) {
        return (/^(normal|none|0px)$/.test(container.parent.css("letterSpacing")));
    }

    function getBorderRadiusData(container) {
        return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function (side) {
            var value = container.css('border' + side + 'Radius');
            var arr = value.split(" ");
            if (arr.length <= 1) {
                arr[1] = arr[0];
            }
            return arr.map(asInt);
        });
    }

    function renderableNode(node) {
        return (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE);
    }

    function isPositionedForStacking(container) {
        var position = container.css("position");
        var zIndex = (["absolute", "relative", "fixed"].indexOf(position) !== -1) ? container.css("zIndex") : "auto";
        return zIndex !== "auto";
    }

    function isPositioned(container) {
        return container.css("position") !== "static";
    }

    function isFloating(container) {
        return container.css("float") !== "none";
    }

    function isInlineBlock(container) {
        return ["inline-block", "inline-table"].indexOf(container.css("display")) !== -1;
    }

    function not(callback) {
        var context = this;
        return function () {
            return !callback.apply(context, arguments);
        };
    }

    function isElement(container) {
        return container.node.nodeType === Node.ELEMENT_NODE;
    }

    function isPseudoElement(container) {
        return container.isPseudoElement === true;
    }

    function isTextNode(container) {
        return container.node.nodeType === Node.TEXT_NODE;
    }

    function zIndexSort(contexts) {
        return function (a, b) {
            return (a.cssInt("zIndex") + (contexts.indexOf(a) / contexts.length)) - (b.cssInt("zIndex") + (contexts.indexOf(b) / contexts.length));
        };
    }

    function hasOpacity(container) {
        return container.getOpacity() < 1;
    }

    function bind(callback, context) {
        return function () {
            return callback.apply(context, arguments);
        };
    }

    function asInt(value) {
        return parseInt(value, 10);
    }

    function getWidth(border) {
        return border.width;
    }

    function nonIgnoredElement(nodeContainer) {
        return (nodeContainer.node.nodeType !== Node.ELEMENT_NODE || ["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"].indexOf(nodeContainer.node.nodeName) === -1);
    }

    function flatten(arrays) {
        return [].concat.apply([], arrays);
    }

    function stripQuotes(content) {
        var first = content.substr(0, 1);
        return (first === content.substr(content.length - 1) && first.match(/'|"/)) ? content.substr(1, content.length - 2) : content;
    }

    function getWords(characters) {
        var words = [],
            i = 0,
            onWordBoundary = false,
            word;
        while (characters.length) {
            if (isWordBoundary(characters[i]) === onWordBoundary) {
                word = characters.splice(0, i);
                if (word.length) {
                    words.push(window.html2canvas.punycode.ucs2.encode(word));
                }
                onWordBoundary = !onWordBoundary;
                i = 0;
            } else {
                i++;
            }

            if (i >= characters.length) {
                word = characters.splice(0, i);
                if (word.length) {
                    words.push(window.html2canvas.punycode.ucs2.encode(word));
                }
            }
        }
        return words;
    }

    function isWordBoundary(characterCode) {
        return [
            32, // <space>
            13, // \r
            10, // \n
            9, // \t
            45 // -
        ].indexOf(characterCode) !== -1;
    }

    function hasUnicode(string) {
        return (/[^\u0000-\u00ff]/).test(string);
    }

    function Proxy(src, proxyUrl, document) {
        if (!proxyUrl) {
            return Promise.reject("No proxy configured");
        }
        var callback = createCallback(supportsCORS);
        var url = createProxyUrl(proxyUrl, src, callback);

        return supportsCORS ? XHR(url) : (jsonp(document, url, callback).then(function (response) {
            return decode64(response.content);
        }));
    }
    var proxyCount = 0;

    var supportsCORS = ('withCredentials' in new XMLHttpRequest());
    var supportsCORSImage = ('crossOrigin' in new Image());

    function ProxyURL(src, proxyUrl, document) {
        var callback = createCallback(supportsCORSImage);
        var url = createProxyUrl(proxyUrl, src, callback);
        return (supportsCORSImage ? Promise.resolve(url) : jsonp(document, url, callback).then(function (response) {
            return "data:" + response.type + ";base64," + response.content;
        }));
    }

    function jsonp(document, url, callback) {
        return new Promise(function (resolve, reject) {
            var s = document.createElement("script");
            var cleanup = function () {
                delete window.html2canvas.proxy[callback];
                document.body.removeChild(s);
            };
            window.html2canvas.proxy[callback] = function (response) {
                cleanup();
                resolve(response);
            };
            s.src = url;
            s.onerror = function (e) {
                cleanup();
                reject(e);
            };
            document.body.appendChild(s);
        });
    }

    function createCallback(useCORS) {
        return !useCORS ? "html2canvas_" + Date.now() + "_" + (++proxyCount) + "_" + Math.round(Math.random() * 100000) : "";
    }

    function createProxyUrl(proxyUrl, src, callback) {
        return proxyUrl + "?url=" + encodeURIComponent(src) + (callback.length ? "&callback=html2canvas.proxy." + callback : "");
    }

    function ProxyImageContainer(src, proxy) {
        var script = document.createElement("script");
        var link = document.createElement("a");
        link.href = src;
        src = link.href;
        this.src = src;
        this.image = new Image();
        var self = this;
        this.promise = new Promise(function (resolve, reject) {
            //self.image.crossOrigin = "Anonymous";
            self.image.onload = resolve;
            self.image.onerror = reject;

            new ProxyURL(src, proxy, document).then(function (url) {
                self.image.src = url;
            })['catch'](reject);
        });
    }

    function PseudoElementContainer(node, parent, type) {
        NodeContainer.call(this, node, parent);
        this.isPseudoElement = true;
        this.before = type === ":before";
    }

    PseudoElementContainer.prototype.cloneTo = function (stack) {
        PseudoElementContainer.prototype.cloneTo.call(this, stack);
        stack.isPseudoElement = true;
        stack.before = this.before;
    };

    PseudoElementContainer.prototype = Object.create(NodeContainer.prototype);

    PseudoElementContainer.prototype.appendToDOM = function () {
        if (this.before) {
            this.parent.node.insertBefore(this.node, this.parent.node.firstChild);
        } else {
            this.parent.node.appendChild(this.node);
        }
        this.parent.node.className += " " + this.getHideClass();
    };

    PseudoElementContainer.prototype.cleanDOM = function () {
        this.node.parentNode.removeChild(this.node);
        this.parent.node.className = this.parent.node.className.replace(this.getHideClass(), "");
    };

    PseudoElementContainer.prototype.getHideClass = function () {
        return this["PSEUDO_HIDE_ELEMENT_CLASS_" + (this.before ? "BEFORE" : "AFTER")];
    };

    PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before";
    PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after";

    function Renderer(width, height, images, options, document) {
        this.width = width;
        this.height = height;
        this.images = images;
        this.options = options;
        this.document = document;
    }

    Renderer.prototype.renderImage = function (container, bounds, borderData, imageContainer) {
        var paddingLeft = container.cssInt('paddingLeft'),
            paddingTop = container.cssInt('paddingTop'),
            paddingRight = container.cssInt('paddingRight'),
            paddingBottom = container.cssInt('paddingBottom'),
            borders = borderData.borders;

        var width = bounds.width - (borders[1].width + borders[3].width + paddingLeft + paddingRight);
        var height = bounds.height - (borders[0].width + borders[2].width + paddingTop + paddingBottom);
        this.drawImage(
            imageContainer,
            0,
            0,
            imageContainer.image.width || width,
            imageContainer.image.height || height,
            bounds.left + paddingLeft + borders[3].width,
            bounds.top + paddingTop + borders[0].width,
            width,
            height
        );
    };

    Renderer.prototype.renderBackground = function (container, bounds, borderData) {
        if (bounds.height > 0 && bounds.width > 0) {
            this.renderBackgroundColor(container, bounds);
            this.renderBackgroundImage(container, bounds, borderData);
        }
    };

    Renderer.prototype.renderBackgroundColor = function (container, bounds) {
        var color = container.color("backgroundColor");
        if (!color.isTransparent()) {
            this.rectangle(bounds.left, bounds.top, bounds.width, bounds.height, color);
        }
    };

    Renderer.prototype.renderBorders = function (borders) {
        borders.forEach(this.renderBorder, this);
    };

    Renderer.prototype.renderBorder = function (data) {
        if (!data.color.isTransparent() && data.args !== null) {
            this.drawShape(data.args, data.color);
        }
    };

    Renderer.prototype.renderBackgroundImage = function (container, bounds, borderData) {
        var backgroundImages = container.parseBackgroundImages();
        backgroundImages.reverse().forEach(function (backgroundImage, index, arr) {
            switch (backgroundImage.method) {
                case "url":
                    var image = this.images.get(backgroundImage.args[0]);
                    if (image) {
                        this.renderBackgroundRepeating(container, bounds, image, arr.length - (index + 1), borderData);
                    } else {
                        log("Error loading background-image", backgroundImage.args[0]);
                    }
                    break;
                case "linear-gradient":
                case "gradient":
                    var gradientImage = this.images.get(backgroundImage.value);
                    if (gradientImage) {
                        this.renderBackgroundGradient(gradientImage, bounds, borderData);
                    } else {
                        log("Error loading background-image", backgroundImage.args[0]);
                    }
                    break;
                case "none":
                    break;
                default:
                    log("Unknown background-image type", backgroundImage.args[0]);
            }
        }, this);
    };

    Renderer.prototype.renderBackgroundRepeating = function (container, bounds, imageContainer, index, borderData) {
        var size = container.parseBackgroundSize(bounds, imageContainer.image, index);
        var position = container.parseBackgroundPosition(bounds, imageContainer.image, index, size);
        var repeat = container.parseBackgroundRepeat(index);
        switch (repeat) {
            case "repeat-x":
            case "repeat no-repeat":
                this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + borderData[3], bounds.top + position.top + borderData[0], 99999, size.height, borderData);
                break;
            case "repeat-y":
            case "no-repeat repeat":
                this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + position.left + borderData[3], bounds.top + borderData[0], size.width, 99999, borderData);
                break;
            case "no-repeat":
                this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + position.left + borderData[3], bounds.top + position.top + borderData[0], size.width, size.height, borderData);
                break;
            default:
                this.renderBackgroundRepeat(imageContainer, position, size, {
                    top: bounds.top,
                    left: bounds.left
                }, borderData[3], borderData[0]);
                break;
        }
    };

    function StackingContext(hasOwnStacking, opacity, element, parent) {
        NodeContainer.call(this, element, parent);
        this.ownStacking = hasOwnStacking;
        this.contexts = [];
        this.children = [];
        this.opacity = (this.parent ? this.parent.stack.opacity : 1) * opacity;
    }

    StackingContext.prototype = Object.create(NodeContainer.prototype);

    StackingContext.prototype.getParentStack = function (context) {
        var parentStack = (this.parent) ? this.parent.stack : null;
        return parentStack ? (parentStack.ownStacking ? parentStack : parentStack.getParentStack(context)) : context.stack;
    };

    function Support(document) {
        this.rangeBounds = this.testRangeBounds(document);
        this.cors = this.testCORS();
        this.svg = this.testSVG();
    }

    Support.prototype.testRangeBounds = function (document) {
        var range, testElement, rangeBounds, rangeHeight, support = false;

        if (document.createRange) {
            range = document.createRange();
            if (range.getBoundingClientRect) {
                testElement = document.createElement('boundtest');
                testElement.style.height = "123px";
                testElement.style.display = "block";
                document.body.appendChild(testElement);

                range.selectNode(testElement);
                rangeBounds = range.getBoundingClientRect();
                rangeHeight = rangeBounds.height;

                if (rangeHeight === 123) {
                    support = true;
                }
                document.body.removeChild(testElement);
            }
        }

        return support;
    };

    Support.prototype.testCORS = function () {
        return typeof ((new Image()).crossOrigin) !== "undefined";
    };

    Support.prototype.testSVG = function () {
        var img = new Image();
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";

        try {
            ctx.drawImage(img, 0, 0);
            canvas.toDataURL();
        } catch (e) {
            return false;
        }
        return true;
    };

    function SVGContainer(src) {
        this.src = src;
        this.image = null;
        var self = this;

        this.promise = this.hasFabric().then(function () {
            return (self.isInline(src) ? Promise.resolve(self.inlineFormatting(src)) : XHR(src));
        }).then(function (svg) {
            return new Promise(function (resolve) {
                html2canvas.fabric.loadSVGFromString(svg, self.createCanvas.call(self, resolve));
            });
        });
    }

    SVGContainer.prototype.hasFabric = function () {
        return !html2canvas.fabric ? Promise.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg")) : Promise.resolve();
    };

    SVGContainer.prototype.inlineFormatting = function (src) {
        return (/^data:image\/svg\+xml;base64,/.test(src)) ? this.decode64(this.removeContentType(src)) : this.removeContentType(src);
    };

    SVGContainer.prototype.removeContentType = function (src) {
        return src.replace(/^data:image\/svg\+xml(;base64)?,/, '');
    };

    SVGContainer.prototype.isInline = function (src) {
        return (/^data:image\/svg\+xml/i.test(src));
    };

    SVGContainer.prototype.createCanvas = function (resolve) {
        var self = this;
        return function (objects, options) {
            var canvas = new html2canvas.fabric.StaticCanvas('c');
            self.image = canvas.lowerCanvasEl;
            canvas
                .setWidth(options.width)
                .setHeight(options.height)
                .add(html2canvas.fabric.util.groupSVGElements(objects, options))
                .renderAll();
            resolve(canvas.lowerCanvasEl);
        };
    };

    SVGContainer.prototype.decode64 = function (str) {
        return (typeof (window.atob) === "function") ? window.atob(str) : decode64(str);
    };

    /*
     * base64-arraybuffer
     * https://github.com/niklasvh/base64-arraybuffer
     *
     * Copyright (c) 2012 Niklas von Hertzen
     * Licensed under the MIT license.
     */

    function decode64(base64) {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var len = base64.length,
            i, encoded1, encoded2, encoded3, encoded4, byte1, byte2, byte3;

        var output = "";

        for (i = 0; i < len; i += 4) {
            encoded1 = chars.indexOf(base64[i]);
            encoded2 = chars.indexOf(base64[i + 1]);
            encoded3 = chars.indexOf(base64[i + 2]);
            encoded4 = chars.indexOf(base64[i + 3]);

            byte1 = (encoded1 << 2) | (encoded2 >> 4);
            byte2 = ((encoded2 & 15) << 4) | (encoded3 >> 2);
            byte3 = ((encoded3 & 3) << 6) | encoded4;
            if (encoded3 === 64) {
                output += String.fromCharCode(byte1);
            } else if (encoded4 === 64 || encoded4 === -1) {
                output += String.fromCharCode(byte1, byte2);
            } else {
                output += String.fromCharCode(byte1, byte2, byte3);
            }
        }

        return output;
    }

    function SVGNodeContainer(node, native) {
        this.src = node;
        this.image = null;
        var self = this;

        this.promise = native ? new Promise(function (resolve, reject) {
            self.image = new Image();
            self.image.onload = resolve;
            self.image.onerror = reject;
            self.image.src = "data:image/svg+xml," + (new XMLSerializer()).serializeToString(node);
            if (self.image.complete === true) {
                resolve(self.image);
            }
        }) : this.hasFabric().then(function () {
            return new Promise(function (resolve) {
                html2canvas.fabric.parseSVGDocument(node, self.createCanvas.call(self, resolve));
            });
        });
    }

    SVGNodeContainer.prototype = Object.create(SVGContainer.prototype);

    function TextContainer(node, parent) {
        NodeContainer.call(this, node, parent);
    }

    TextContainer.prototype = Object.create(NodeContainer.prototype);

    TextContainer.prototype.applyTextTransform = function () {
        this.node.data = this.transform(this.parent.css("textTransform"));
    };

    TextContainer.prototype.transform = function (transform) {
        var text = this.node.data;
        switch (transform) {
            case "lowercase":
                return text.toLowerCase();
            case "capitalize":
                return text.replace(/(^|\s|:|-|\(|\))([a-z])/g, capitalize);
            case "uppercase":
                return text.toUpperCase();
            default:
                return text;
        }
    };

    function capitalize(m, p1, p2) {
        if (m.length > 0) {
            return p1 + p2.toUpperCase();
        }
    }

    function WebkitGradientContainer(imageData) {
        GradientContainer.apply(this, arguments);
        this.type = (imageData.args[0] === "linear") ? this.TYPES.LINEAR : this.TYPES.RADIAL;
    }

    WebkitGradientContainer.prototype = Object.create(GradientContainer.prototype);

    function XHR(url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);

            xhr.withCredentials = true;
            xhr.onload = function () {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject(new Error(xhr.statusText));
                }
            };

            xhr.onerror = function () {
                reject(new Error("Network Error"));
            };

            xhr.send();
        });
    }

    function CanvasRenderer(width, height) {
        Renderer.apply(this, arguments);
        this.canvas = this.options.canvas || this.document.createElement("canvas");
        if (!this.options.canvas) {
            this.canvas.width = width;
            this.canvas.height = height;
        }
        this.ctx = this.canvas.getContext("2d");
        this.taintCtx = this.document.createElement("canvas").getContext("2d");
        this.ctx.textBaseline = "bottom";
        this.variables = {};
        log("Initialized CanvasRenderer with size", width, "x", height);
    }

    CanvasRenderer.prototype = Object.create(Renderer.prototype);

    CanvasRenderer.prototype.setFillStyle = function (fillStyle) {
        this.ctx.fillStyle = typeof (fillStyle) === "object" && !!fillStyle.isColor ? fillStyle.toString() : fillStyle;
        return this.ctx;
    };

    CanvasRenderer.prototype.rectangle = function (left, top, width, height, color) {
        this.setFillStyle(color).fillRect(left, top, width, height);
    };

    CanvasRenderer.prototype.circle = function (left, top, size, color) {
        this.setFillStyle(color);
        this.ctx.beginPath();
        this.ctx.arc(left + size / 2, top + size / 2, size / 2, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
    };

    CanvasRenderer.prototype.circleStroke = function (left, top, size, color, stroke, strokeColor) {
        this.circle(left, top, size, color);
        this.ctx.strokeStyle = strokeColor.toString();
        this.ctx.stroke();
    };

    CanvasRenderer.prototype.drawShape = function (shape, color) {
        this.shape(shape);
        this.setFillStyle(color).fill();
    };

    CanvasRenderer.prototype.taints = function (imageContainer) {
        if (imageContainer.tainted === null) {
            this.taintCtx.drawImage(imageContainer.image, 0, 0);
            try {
                this.taintCtx.getImageData(0, 0, 1, 1);
                imageContainer.tainted = false;
            } catch (e) {
                this.taintCtx = document.createElement("canvas").getContext("2d");
                imageContainer.tainted = true;
            }
        }

        return imageContainer.tainted;
    };

    CanvasRenderer.prototype.drawImage = function (imageContainer, sx, sy, sw, sh, dx, dy, dw, dh) {
        if (!this.taints(imageContainer) || this.options.allowTaint) {
            this.ctx.drawImage(imageContainer.image, sx, sy, sw, sh, dx, dy, dw, dh);
        }
    };

    CanvasRenderer.prototype.clip = function (shapes, callback, context) {
        this.ctx.save();
        shapes.filter(hasEntries).forEach(function (shape) {
            this.shape(shape).clip();
        }, this);
        callback.call(context);
        this.ctx.restore();
    };

    CanvasRenderer.prototype.shape = function (shape) {
        this.ctx.beginPath();
        shape.forEach(function (point, index) {
            if (point[0] === "rect") {
                this.ctx.rect.apply(this.ctx, point.slice(1));
            } else {
                this.ctx[(index === 0) ? "moveTo" : point[0] + "To"].apply(this.ctx, point.slice(1));
            }
        }, this);
        this.ctx.closePath();
        return this.ctx;
    };

    CanvasRenderer.prototype.font = function (color, style, variant, weight, size, family) {
        this.setFillStyle(color).font = [style, variant, weight, size, family].join(" ").split(",")[0];
    };

    CanvasRenderer.prototype.fontShadow = function (color, offsetX, offsetY, blur) {
        this.setVariable("shadowColor", color.toString())
            .setVariable("shadowOffsetY", offsetX)
            .setVariable("shadowOffsetX", offsetY)
            .setVariable("shadowBlur", blur);
    };

    CanvasRenderer.prototype.clearShadow = function () {
        this.setVariable("shadowColor", "rgba(0,0,0,0)");
    };

    CanvasRenderer.prototype.setOpacity = function (opacity) {
        this.ctx.globalAlpha = opacity;
    };

    CanvasRenderer.prototype.setTransform = function (transform) {
        this.ctx.translate(transform.origin[0], transform.origin[1]);
        this.ctx.transform.apply(this.ctx, transform.matrix);
        this.ctx.translate(-transform.origin[0], -transform.origin[1]);
    };

    CanvasRenderer.prototype.setVariable = function (property, value) {
        if (this.variables[property] !== value) {
            this.variables[property] = this.ctx[property] = value;
        }

        return this;
    };

    CanvasRenderer.prototype.text = function (text, left, bottom) {
        this.ctx.fillText(text, left, bottom);
    };

    CanvasRenderer.prototype.backgroundRepeatShape = function (imageContainer, backgroundPosition, size, bounds, left, top, width, height, borderData) {
        var shape = [
            ["line", Math.round(left), Math.round(top)],
            ["line", Math.round(left + width), Math.round(top)],
            ["line", Math.round(left + width), Math.round(height + top)],
            ["line", Math.round(left), Math.round(height + top)]
        ];
        this.clip([shape], function () {
            this.renderBackgroundRepeat(imageContainer, backgroundPosition, size, bounds, borderData[3], borderData[0]);
        }, this);
    };

    CanvasRenderer.prototype.renderBackgroundRepeat = function (imageContainer, backgroundPosition, size, bounds, borderLeft, borderTop) {
        var offsetX = Math.round(bounds.left + backgroundPosition.left + borderLeft),
            offsetY = Math.round(bounds.top + backgroundPosition.top + borderTop);
        this.setFillStyle(this.ctx.createPattern(this.resizeImage(imageContainer, size), "repeat"));
        this.ctx.translate(offsetX, offsetY);
        this.ctx.fill();
        this.ctx.translate(-offsetX, -offsetY);
    };

    CanvasRenderer.prototype.renderBackgroundGradient = function (gradientImage, bounds) {
        if (gradientImage instanceof LinearGradientContainer) {
            var gradient = this.ctx.createLinearGradient(
                bounds.left + bounds.width * gradientImage.x0,
                bounds.top + bounds.height * gradientImage.y0,
                bounds.left + bounds.width * gradientImage.x1,
                bounds.top + bounds.height * gradientImage.y1);
            gradientImage.colorStops.forEach(function (colorStop) {
                gradient.addColorStop(colorStop.stop, colorStop.color.toString());
            });
            this.rectangle(bounds.left, bounds.top, bounds.width, bounds.height, gradient);
        }
    };

    CanvasRenderer.prototype.resizeImage = function (imageContainer, size) {
        var image = imageContainer.image;
        if (image.width === size.width && image.height === size.height) {
            return image;
        }

        var ctx, canvas = document.createElement('canvas');
        canvas.width = size.width;
        canvas.height = size.height;
        ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, size.width, size.height);
        return canvas;
    };

    function hasEntries(array) {
        return array.length > 0;
    }

}).call({}, typeof (window) !== "undefined" ? window : undefined, typeof (document) !== "undefined" ? document : undefined);
/*!
 * jQuery Confirm Action
 * https://github.com/sdelements/jquery-confirm-action
 *
 * Copyright 2015, Houssam Haidar
 * Released under the MIT license
 */

'use strict';

(function ($) {

    //
    // Helpers
    //

    var each = function (iterable, callback, context) {
        $.each(iterable, context ? $.proxy(callback, context) : callback);
    };

    var map = function (iterable, callback, context) {
        return $.map(iterable, context ? $.proxy(callback, context) : callback);
    };

    //
    // Modal
    //

    var ConfirmActionModal = function (options) {

        this.options = options;

        this.init();

    };

    ConfirmActionModal.prototype = {

        constructor: ConfirmActionModal,

        styles: {
            overlay: {
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: 1000,
                backgroundColor: '#000000'
            },
            base: {
                width: '100%',
                height: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                zIndex: 2901,
                overflow: 'auto'
            },
            dialog: {
                backgroundColor: '#ffffff',
                width: '70%',
                // maxWidth: '700px',
                margin: '40px auto',
                textAlign: 'center',
                fontSize: '14px',
                borderRadius: '3px',
                position: 'relative',
                zIndex: 2901
            },
            header: {
                padding: '0px'
            },
            title: {
                fontSize: '20px',
                color: '#555555',
                marginBottom: '0'
            },
            close: {
                position: 'absolute',
                top: '-25px',
                right: '-25px',
                fontSize: '30px',
                color: '#f2f2f2',
                cursor: 'pointer'
            },
            content: {
                padding: '10px 10px 10px 10px',
                color: '#888888',
                fontSize: '16px',
                fontWeight: '300',
                lineHeight: '20px'
            },
            actions: {
                backgroundColor: '#f5f5f5',
                padding: '30px',
                borderRadius: '0 0 3px 3px'
            },
            button: {
                background: 'none',
                fontSize: '14px',
                color: '#aaaaaa',
                padding: '10px 40px',
                margin: '3px 6px',
                border: '1px #cccccc solid',
                borderRadius: '4px'
            },
            titles: {
                danger: {
                    color: '#e56657'
                },
                warning: {
                    color: '#ffb347'
                },
                success: {
                    color: '#77dd77'
                }
            },
            buttons: {
                danger: {
                    backgroundColor: '#e56657',
                    borderColor: '#e56657',
                    color: '#ffffff'
                },
                warning: {
                    backgroundColor: '#ffb347',
                    borderColor: '#ffb347',
                    color: '#ffffff'
                },
                success: {
                    backgroundColor: '#77dd77',
                    borderColor: '#77dd77',
                    color: '#ffffff'
                }
            },
            conditions: {
                width: '60%',
                textAlign: 'left',
                margin: '0 auto',
                marginTop: '20px'
            },
            label: {
                fontSize: '14px',
                color: '#aaaaaa',
                marginTop: '10px',
                display: 'block'
            },
            checkbox: {
                margin: '0 5px 0 0',
                verticalAlign: 'baseline'
            }
        },

        html: {
            overlay: '<div class="confirm-action-overlay" />',
            base: '<div class="confirm-action-modal" />',
            dialog: '<div class="confirm-action-modal-dialog" />',
            header: '<div class="confirm-action-modal-header" />',
            title: '<h2 class="confirm-action-modal-title">Confirm</h2>',
            close: '<span class="confirm-action-modal-close" data-confirm-action-close>&times;</span>',
            content: '<div class="confirm-action-modal-content" />',
            conditions: '<div class="confirm-action-modal-conditions" />',
            actions: '<div class="confirm-action-modal-actions" />',
            button: '<button class="confirm-action-modal-button">Confirm</button>',
            label: '<label class="confirm-action-label" />',
            checkbox: '<input type="checkbox" />',
            conditionText: '<span class="confirm-action-condition-text" />'
        },

        init: function () {

            this.components = {};

            each(this.html, function (key, html) {

                this.components['$' + key] = $(html).css(this.styles[key] || {});

            }, this);

            this.$overlay = this.components.$overlay.fadeTo(0, 0.5);

            this.components.$title
                .css(this.styles.titles[this.options.title.style || 'danger']);

            var $conditions = map(this.options.conditions, function (condition, key) {

                if (condition.type === 'checkbox') {
                    return this.components.$label.clone()
                        .append([
                            this.components.$checkbox.clone().attr('data-confirm-condition-id', key),
                            this.components.$conditionText.clone().text(condition.text || 'Are you sure?')
                        ]);
                }

            }, this);

            var $buttons = [
                this.components.$button.clone()
                .text('取消')
                .attr('data-confirm-action-close', true)
            ];

            each(this.options.actions, function (key, action) {

                $buttons.push(
                    this.components.$button.clone()
                    .attr('data-confirm-action-id', key)
                    .text(action.text)
                    .css(this.styles.buttons[action.style || 'danger'])
                );

            }, this);

            this.$element = this.components.$base.append([
                this.$overlay,
                this.components.$dialog.append([
                    this.components.$header.append([
                        this.components.$title,
                        this.components.$close
                    ]),
                    this.components.$content.append(
                        this.components.$conditions.append($conditions)
                    ),
                    this.components.$actions.append($buttons)
                ])
            ]);

            this.update();

        },

        setTitleAndMessage: function () {
            this.setContent(this.options.title, this.components.$title);
            this.setContent(this.options.message, this.components.$content);
        },

        setContent: function (options, container) {
            if (options.html) {
                var html = typeof options.html === 'function' ? options.html() : options.html;
                if ($.isArray(html)) {
                    html = html.join('\n');
                }
                container.html(html);
            }

            if (options.text) {
                var text = typeof options.text === 'function' ? options.text() : options.text;
                container.text(text);
            }
        },

        listen: function (sourceEvent) {

            var that = this;

            this.$element.delegate('[data-confirm-action-close]', 'click', $.proxy(this.close, this));

            this.$overlay.on('click', $.proxy(this.close, this));

            var confirm = function () {

                $(sourceEvent.target).trigger('click', true);

                that.close();

            };

            this.$element.find('[data-confirm-condition-id]').each(function () {

                $(this).on('change.confirm.condition', function () {

                    that.update();

                });

            });

            this.$element.find('[data-confirm-action-id]').each(function () {

                $(this).on('click.confirm.action', function (e) {

                    e.preventDefault();

                    var callback = that.options.actions[$(this).data('confirm-action-id')].callback;

                    if (typeof callback !== 'function') {

                        callback = $.fn.confirmAction.defaults.actions.confirm.callback;

                    }

                    callback(confirm, $.proxy(that.close, that));

                });

            });

        },

        update: function () {

            var that = this;

            each(this.options.actions, function (actionKey, action) {

                var disabled = false;

                each(action.conditions || [], function (key, condition) {

                    if (disabled) {

                        return;

                    }

                    if (!that.options.conditions[condition]) {

                        disabled = true;
                    }

                    if (that.options.conditions[condition].type === 'checkbox') {

                        if (!that.$element.find('[data-confirm-condition-id=' + condition + ']').is(':checked')) {

                            disabled = true;

                        }

                    }

                });

                that.$element.find('[data-confirm-action-id=' + actionKey + ']')
                    .prop('disabled', disabled)
                    .css('cursor', disabled ? 'not-allowed' : 'pointer')
                    .fadeTo(50, disabled ? .5 : 1);

            });

        },

        show: function (sourceEvent) {

            this.setTitleAndMessage();

            this.$element.appendTo('body');

            this.listen(sourceEvent || $.Event('click'));

        },

        close: function () {

            this.resetConditions();
            this.$element.remove();

        },

        resetConditions: function () {
            this.components.$conditions.find('input[type=checkbox]').prop('checked', false);
        }

    };

    //
    // Core
    //

    var ConfirmAction = function (element, options) {

        this.init(element, options);

    };

    ConfirmAction.prototype = {

        constructor: ConfirmAction,

        init: function (element, options) {

            this.options = options;

            this.$element = $(element);

            this.$element.on('click.confirm', $.proxy(this.intercept, this));

            this.modal = new ConfirmActionModal(this.options);

        },

        intercept: function (e, confirmed) {

            var that = this;

            var execute = function (run) {

                if (!run) {
                    return;
                }

                that.modal.show(e);

                if (confirmed !== true) {

                    e.preventDefault();
                    e.stopImmediatePropagation();

                }

            };

            if (typeof this.options.conditional === 'function') {

                this.options.conditional(execute);

                return;

            }

            execute(true);

        }

    };

    //
    // jQuery Plugin
    //

    $.fn.confirmAction = function (options) {

        return this.each(function () {
            var title;
            var message;

            if (typeof options.title === 'string' || typeof options.message === 'function') {
                title = options.title;
                delete options.title;
            }

            if (typeof options === 'string') {
                message = options;
            }

            if (typeof options.message === 'string' || typeof options.message === 'function') {
                message = options.message;
                delete options.message;
            }

            options = $.extend({}, $.fn.confirmAction.defaults, typeof options === 'object' && options);

            if (title) {
                options.title.text = message;
            }

            if (message) {
                options.message.text = message;
            }

            new ConfirmAction(this, options);
        });

    };

    $.fn.confirmAction.defaults = {
        title: {
            text: 'Warning',
            style: 'danger'
        },
        message: {
            text: 'Are you sure?'
        },
        actions: {
            confirm: {
                text: 'Confirm',
                style: 'danger',
                callback: function (confirm) {
                    confirm();
                }
            }
        },
        conditions: {}
    };

})(jQuery);

//图片打印控件开始
;
(function (w, $) {
    $.noop = $.noop || function () {};
    var _$window = $(window),
        _$document = $(document),
        _$html = $('html'),
        _$body = $('body'),
        _isMobile = 'createTouch' in document && !('onmousemove' in _elem) || /(iPhone|iPad|iPod)/i.test(navigator.userAgent),
        _elem = document.documentElement;
    var cutImage = function (config) {

        //判断是否为空
        config = config || {};

        //合并默认配置
        $.extend(config, cutImage.default);

        //必设属性server
        if (config.server == undefined) {
            throw "必须对cutImage类设置server";
            return;
        }
        this._init(config);
    };

    cutImage.fn = cutImage.prototype = {
        version: '1.0.0',
        _init: function (config) {
            this.config = config;
            this.canvasImg;
            this.ibase64;
            this.imgAction = "<a id='_cutImgAction' style='size:0'></a>";

        },
        //生成图片
        cut: function () {
            var title = arguments[0];
            var that = this;
            html2canvas(
                $(that.config.elem), {
                    "logging": false, //Enable log (use Web Console for get Errors and Warnings)
                    "proxy": that.config.proxy,
                    onrendered: function (canvas) {
                        jQuery.support.cors = true;
                        that.canvasImg = canvas;
                        that.ibase64 = canvas.toDataURL();
                        $('#_cutImgAction').remove();

                        _$body.append(that.imgAction);
                        $('#_cutImgAction').confirmAction({
                            title: {
                                html: [
                                    '<i class="fa fa-warning"></i><br />',
                                    title
                                ],
                                style: 'danger'
                            },
                            message: {
                                html: '<img id="cutimg_showimg" style="height:100%;width:100%;" src="' + canvas.toDataURL() + '"></img><img id="cutimg_showimg1" style="display:none" src="' + canvas.toDataURL() + '"></img><div style="position:absolute;bottom:30px;"><img id="cutimg_gl" style="height:50px;float:left;margin-left:5px;" src="' + that.config.glimg + '"/><img id="cutimg_hb" style="height:50px;float:left;margin-left:5px;" src="' + that.config.hbimg + '"/><img id="cutimg_yt" style="height:50px;float:left;margin-left:5px;" src="' + that.config.ytimg_click + '"/><div class="clearfix"></div></div>'
                            },
                            actions: {
                                confirm: {
                                    text: '保存图片',
                                    callback: function (confirm, cancel) {
                                        // window.open("that.config.server?base64=" + $("#cutimg_showimg1").attr("src").replace("data:image/png;base64,", ""))
                                        // var xdr = new XDomainRequest();
                                        // var para = "base64=" + $("#cutimg_showimg1").attr("src").replace("data:image/png;base64,", "");
                                        // xdr.open("POST", that.config.server);
                                        // xdr.send(para);
                                        // xdr.onload = function() {
                                        //     alert(xdr.responseText)
                                        // };
                                        // xdr.onerror = function() {
                                        //     alert("error!")
                                        // };
                                        $.ajax({
                                            url: that.config.server,
                                            type: "POST",
                                            crossDomain: true,
                                            xhrFields: {
                                                withCredentials: true
                                            },
                                            data: {
                                                "base64": $("#cutimg_showimg1").attr("src").replace("data:image/png;base64,", "")
                                            },
                                            success: function (data) {
                                                if (that.config.name == "") {
                                                    window.location.href = that.config.server.replace("download", "img") + "?code=" + data.message;
                                                } else {
                                                    window.location.href = that.config.server.replace("download", "img") + "?code=" + data.message + "&name=" + encodeURI(that.config.name);
                                                    // window.location.href = that.config.server.replace("download", "img") + "?code=" + data.code + "&name=" + encodeURI(that.config.name);
                                                }
                                                that.config.name = "";
                                            }
                                        });
                                        confirm();
                                    }
                                }
                            }
                        });
                        $('#_cutImgAction').trigger("click");
                        $("#cutimg_yt").click(function () {
                            $("#cutimg_yt").attr("src", that.config.ytimg_click);
                            $("#cutimg_hb").attr("src", that.config.hbimg);
                            $("#cutimg_gl").attr("src", that.config.glimg);
                            $("#cutimg_showimg").attr("src", that.ibase64);
                            $("#cutimg_showimg1").attr("src", that.ibase64);
                        });
                        $("#cutimg_hb").click(function () {
                            $("#cutimg_yt").attr("src", that.config.ytimg);
                            $("#cutimg_hb").attr("src", that.config.hbimg_click);
                            $("#cutimg_gl").attr("src", that.config.glimg);
                            $("#cutimg_showimg").attr("src", that.ibase64);
                            $("#cutimg_showimg1").attr("src", that.ibase64);
                            var img = document.getElementById("cutimg_showimg");
                            var ps = AlloyImage(img);
                            ps.act("灰度处理").replace(img);
                            var img = document.getElementById("cutimg_showimg1");
                            var ps = AlloyImage(img);
                            ps.act("灰度处理").replace(img);
                        });
                        $("#cutimg_gl").click(function () {
                            $("#cutimg_yt").attr("src", that.config.ytimg);
                            $("#cutimg_hb").attr("src", that.config.hbimg);
                            $("#cutimg_gl").attr("src", that.config.glimg_click);
                            $("#cutimg_showimg").attr("src", that.ibase64);
                            $("#cutimg_showimg1").attr("src", that.ibase64);
                            var img = document.getElementById("cutimg_showimg");
                            var ps = AlloyImage(img);
                            ps.act("brightness", 5, 5).replace(img);
                            var img = document.getElementById("cutimg_showimg1");
                            var ps = AlloyImage(img);
                            ps.act("brightness", 5, 5).replace(img);
                        });
                    }
                });

        },
        //关闭
        close: function () {},
        createCORSRequest: function (method, url) {
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {
                // 此时即支持CORS的情况
                // 检查XMLHttpRequest对象是否有“withCredentials”属性
                // “withCredentials”仅存在于XMLHTTPRequest2对象里
                xhr.open(method, url, true);

            } else if (typeof (XDomainRequest) != "undefined") {

                // 否则检查是否支持XDomainRequest，IE8和IE9支持
                // XDomainRequest仅存在于IE中，是IE用于支持CORS请求的方式
                xhr = new XDomainRequest();
                xhr.open(method, url);

            } else {

                // 否则，浏览器不支持CORS
                xhr = null;

            }
            return xhr;
        }
    }

    cutImage.default = {
        elem: document.getElementById('map'), //选取默认截图对象，为超图map控件
        proxy: constants.SERVER_URL + "/proxy/load",
        server: constants.SERVER_URL + "/proxy/download",
        locked: true, //是否开启模态对话框
        tools: false, //是否开启图片编辑功能
        glimg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAABaCAYAAABpPHJhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkUxNERDRTU4N0M4NzExRTVBMTk2RkUwMDkwRTlENjFFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkUxNERDRTU5N0M4NzExRTVBMTk2RkUwMDkwRTlENjFFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REZCMEMwMDk3Qzg3MTFFNUExOTZGRTAwOTBFOUQ2MUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REZCMEMwMEE3Qzg3MTFFNUExOTZGRTAwOTBFOUQ2MUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6EWb2kAAASfUlEQVR42uxdeXAb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",
        glimg_click: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAABaCAYAAABpPHJhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkUxNERDRTVDN0M4NzExRTVBMTk2RkUwMDkwRTlENjFFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkUxNERDRTVEN0M4NzExRTVBMTk2RkUwMDkwRTlENjFFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTE0RENFNUE3Qzg3MTFFNUExOTZGRTAwOTBFOUQ2MUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTE0RENFNUI3Qzg3MTFFNUExOTZGRTAwOTBFOUQ2MUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6trJCgAAASk0lEQVR42uxdCXAc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",
        ytimg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAABaCAYAAABpPHJhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRGQjBDMDA3N0M4NzExRTVBMTk2RkUwMDkwRTlENjFFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRGQjBDMDA4N0M4NzExRTVBMTk2RkUwMDkwRTlENjFFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REZCMEMwMDU3Qzg3MTFFNUExOTZGRTAwOTBFOUQ2MUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REZCMEMwMDY3Qzg3MTFFNUExOTZGRTAwOTBFOUQ2MUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4k0KhqAAAUt0lEQVR42uxdC3QU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",
        ytimg_click: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAABaCAYAAABpPHJhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRGQjBDMDAzN0M4NzExRTVBMTk2RkUwMDkwRTlENjFFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRGQjBDMDA0N0M4NzExRTVBMTk2RkUwMDkwRTlENjFFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REZCMEMwMDE3Qzg3MTFFNUExOTZGRTAwOTBFOUQ2MUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REZCMEMwMDI3Qzg3MTFFNUExOTZGRTAwOTBFOUQ2MUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7L5E5vAAAUxUlEQVR42uxdCXRU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",
        hbimg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAABaCAYAAABpPHJhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkUxNERDRTYwN0M4NzExRTVBMTk2RkUwMDkwRTlENjFFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkUxNERDRTYxN0M4NzExRTVBMTk2RkUwMDkwRTlENjFFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTE0RENFNUU3Qzg3MTFFNUExOTZGRTAwOTBFOUQ2MUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTE0RENFNUY3Qzg3MTFFNUExOTZGRTAwOTBFOUQ2MUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7oUethAAANd0lEQVR42uydyWsU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",
        hbimg_click: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAABaCAYAAABpPHJhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkUzN0VFNzk5N0M4NzExRTVBMTk2RkUwMDkwRTlENjFFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkUzN0VFNzlBN0M4NzExRTVBMTk2RkUwMDkwRTlENjFFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTE0RENFNjI3Qzg3MTFFNUExOTZGRTAwOTBFOUQ2MUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTM3RUU3OTg3Qzg3MTFFNUExOTZGRTAwOTBFOUQ2MUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7sgKWhAAANoUlEQVR42uydSWwU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"
    };


    window.cutImage = cutImage;
})(window, $)
