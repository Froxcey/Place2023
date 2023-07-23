const e = window,
  t =
    e.ShadowRoot &&
    (void 0 === e.ShadyCSS || e.ShadyCSS.nativeShadow) &&
    "adoptedStyleSheets" in Document.prototype &&
    "replace" in CSSStyleSheet.prototype,
  n = Symbol(),
  i = new WeakMap();
class r {
  constructor(e, t, i) {
    if (((this._$cssResult$ = !0), i !== n))
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    (this.cssText = e), (this.t = t);
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (t && void 0 === e) {
      const t = void 0 !== n && 1 === n.length;
      t && (e = i.get(n)),
        void 0 === e && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && i.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
}
const o = (e, ...t) => {
    const i =
      1 === e.length
        ? e[0]
        : t.reduce(
            (t, n, i) =>
              t +
              ((e) => {
                if (!0 === e._$cssResult$) return e.cssText;
                if ("number" == typeof e) return e;
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    e +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
                );
              })(n) +
              e[i + 1],
            e[0]
          );
    return new r(i, e, n);
  },
  s = t
    ? (e) => e
    : (e) =>
        e instanceof CSSStyleSheet
          ? ((e) => {
              let t = "";
              for (const n of e.cssRules) t += n.cssText;
              return ((e) => new r("string" == typeof e ? e : e + "", void 0, n))(t);
            })(e)
          : e;
var a;
const c = window,
  l = c.trustedTypes,
  u = l ? l.emptyScript : "",
  h = c.reactiveElementPolyfillSupport,
  d = {
    toAttribute(e, t) {
      switch (t) {
        case Boolean:
          e = e ? u : null;
          break;
        case Object:
        case Array:
          e = null == e ? e : JSON.stringify(e);
      }
      return e;
    },
    fromAttribute(e, t) {
      let n = e;
      switch (t) {
        case Boolean:
          n = null !== e;
          break;
        case Number:
          n = null === e ? null : Number(e);
          break;
        case Object:
        case Array:
          try {
            n = JSON.parse(e);
          } catch (e) {
            n = null;
          }
      }
      return n;
    },
  },
  p = (e, t) => t !== e && (t == t || e == e),
  f = { attribute: !0, type: String, converter: d, reflect: !1, hasChanged: p };
class v extends HTMLElement {
  constructor() {
    super(), (this._$Ei = new Map()), (this.isUpdatePending = !1), (this.hasUpdated = !1), (this._$El = null), this.u();
  }
  static addInitializer(e) {
    var t;
    this.finalize(), (null !== (t = this.h) && void 0 !== t ? t : (this.h = [])).push(e);
  }
  static get observedAttributes() {
    this.finalize();
    const e = [];
    return (
      this.elementProperties.forEach((t, n) => {
        const i = this._$Ep(n, t);
        void 0 !== i && (this._$Ev.set(i, n), e.push(i));
      }),
      e
    );
  }
  static createProperty(e, t = f) {
    if (
      (t.state && (t.attribute = !1),
      this.finalize(),
      this.elementProperties.set(e, t),
      !t.noAccessor && !this.prototype.hasOwnProperty(e))
    ) {
      const n = "symbol" == typeof e ? Symbol() : "__" + e,
        i = this.getPropertyDescriptor(e, n, t);
      void 0 !== i && Object.defineProperty(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, n) {
    return {
      get() {
        return this[t];
      },
      set(i) {
        const r = this[e];
        (this[t] = i), this.requestUpdate(e, r, n);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) || f;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized")) return !1;
    this.finalized = !0;
    const e = Object.getPrototypeOf(this);
    if (
      (e.finalize(),
      void 0 !== e.h && (this.h = [...e.h]),
      (this.elementProperties = new Map(e.elementProperties)),
      (this._$Ev = new Map()),
      this.hasOwnProperty("properties"))
    ) {
      const e = this.properties,
        t = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const n of t) this.createProperty(n, e[n]);
    }
    return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const n = new Set(e.flat(1 / 0).reverse());
      for (const e of n) t.unshift(s(e));
    } else void 0 !== e && t.push(s(e));
    return t;
  }
  static _$Ep(e, t) {
    const n = t.attribute;
    return !1 === n ? void 0 : "string" == typeof n ? n : "string" == typeof e ? e.toLowerCase() : void 0;
  }
  u() {
    var e;
    (this._$E_ = new Promise((e) => (this.enableUpdating = e))),
      (this._$AL = new Map()),
      this._$Eg(),
      this.requestUpdate(),
      null === (e = this.constructor.h) || void 0 === e || e.forEach((e) => e(this));
  }
  addController(e) {
    var t, n;
    (null !== (t = this._$ES) && void 0 !== t ? t : (this._$ES = [])).push(e),
      void 0 !== this.renderRoot && this.isConnected && (null === (n = e.hostConnected) || void 0 === n || n.call(e));
  }
  removeController(e) {
    var t;
    null === (t = this._$ES) || void 0 === t || t.splice(this._$ES.indexOf(e) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((e, t) => {
      this.hasOwnProperty(t) && (this._$Ei.set(t, this[t]), delete this[t]);
    });
  }
  createRenderRoot() {
    var n;
    const i =
      null !== (n = this.shadowRoot) && void 0 !== n ? n : this.attachShadow(this.constructor.shadowRootOptions);
    return (
      ((n, i) => {
        t
          ? (n.adoptedStyleSheets = i.map((e) => (e instanceof CSSStyleSheet ? e : e.styleSheet)))
          : i.forEach((t) => {
              const i = document.createElement("style"),
                r = e.litNonce;
              void 0 !== r && i.setAttribute("nonce", r), (i.textContent = t.cssText), n.appendChild(i);
            });
      })(i, this.constructor.elementStyles),
      i
    );
  }
  connectedCallback() {
    var e;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      null === (e = this._$ES) ||
        void 0 === e ||
        e.forEach((e) => {
          var t;
          return null === (t = e.hostConnected) || void 0 === t ? void 0 : t.call(e);
        });
  }
  enableUpdating(e) {}
  disconnectedCallback() {
    var e;
    null === (e = this._$ES) ||
      void 0 === e ||
      e.forEach((e) => {
        var t;
        return null === (t = e.hostDisconnected) || void 0 === t ? void 0 : t.call(e);
      });
  }
  attributeChangedCallback(e, t, n) {
    this._$AK(e, n);
  }
  _$EO(e, t, n = f) {
    var i;
    const r = this.constructor._$Ep(e, n);
    if (void 0 !== r && !0 === n.reflect) {
      const o = (
        void 0 !== (null === (i = n.converter) || void 0 === i ? void 0 : i.toAttribute) ? n.converter : d
      ).toAttribute(t, n.type);
      (this._$El = e), null == o ? this.removeAttribute(r) : this.setAttribute(r, o), (this._$El = null);
    }
  }
  _$AK(e, t) {
    var n;
    const i = this.constructor,
      r = i._$Ev.get(e);
    if (void 0 !== r && this._$El !== r) {
      const e = i.getPropertyOptions(r),
        o =
          "function" == typeof e.converter
            ? { fromAttribute: e.converter }
            : void 0 !== (null === (n = e.converter) || void 0 === n ? void 0 : n.fromAttribute)
            ? e.converter
            : d;
      (this._$El = r), (this[r] = o.fromAttribute(t, e.type)), (this._$El = null);
    }
  }
  requestUpdate(e, t, n) {
    let i = !0;
    void 0 !== e &&
      (((n = n || this.constructor.getPropertyOptions(e)).hasChanged || p)(this[e], t)
        ? (this._$AL.has(e) || this._$AL.set(e, t),
          !0 === n.reflect && this._$El !== e && (void 0 === this._$EC && (this._$EC = new Map()), this._$EC.set(e, n)))
        : (i = !1)),
      !this.isUpdatePending && i && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (e) {
      Promise.reject(e);
    }
    const e = this.scheduleUpdate();
    return null != e && (await e), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var e;
    if (!this.isUpdatePending) return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((e, t) => (this[t] = e)), (this._$Ei = void 0));
    let t = !1;
    const n = this._$AL;
    try {
      (t = this.shouldUpdate(n)),
        t
          ? (this.willUpdate(n),
            null === (e = this._$ES) ||
              void 0 === e ||
              e.forEach((e) => {
                var t;
                return null === (t = e.hostUpdate) || void 0 === t ? void 0 : t.call(e);
              }),
            this.update(n))
          : this._$Ek();
    } catch (e) {
      throw ((t = !1), this._$Ek(), e);
    }
    t && this._$AE(n);
  }
  willUpdate(e) {}
  _$AE(e) {
    var t;
    null === (t = this._$ES) ||
      void 0 === t ||
      t.forEach((e) => {
        var t;
        return null === (t = e.hostUpdated) || void 0 === t ? void 0 : t.call(e);
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(e)),
      this.updated(e);
  }
  _$Ek() {
    (this._$AL = new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    void 0 !== this._$EC && (this._$EC.forEach((e, t) => this._$EO(t, this[t], e)), (this._$EC = void 0)), this._$Ek();
  }
  updated(e) {}
  firstUpdated(e) {}
}
var m;
(v.finalized = !0),
  (v.elementProperties = new Map()),
  (v.elementStyles = []),
  (v.shadowRootOptions = { mode: "open" }),
  null == h || h({ ReactiveElement: v }),
  (null !== (a = c.reactiveElementVersions) && void 0 !== a ? a : (c.reactiveElementVersions = [])).push("1.6.1");
const g = window,
  y = g.trustedTypes,
  b = y ? y.createPolicy("lit-html", { createHTML: (e) => e }) : void 0,
  x = "$lit$",
  w = `lit$${(Math.random() + "").slice(9)}$`,
  S = "?" + w,
  _ = `<${S}>`,
  T = document,
  C = () => T.createComment(""),
  E = (e) => null === e || ("object" != typeof e && "function" != typeof e),
  k = Array.isArray,
  A = (e) => k(e) || "function" == typeof (null == e ? void 0 : e[Symbol.iterator]),
  O = "[ \t\n\f\r]",
  I = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  M = /-->/g,
  P = />/g,
  D = RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"),
  R = /'/g,
  N = /"/g,
  $ = /^(?:script|style|textarea|title)$/i,
  L =
    (e) =>
    (t, ...n) => ({ _$litType$: e, strings: t, values: n }),
  j = L(1),
  z = L(2),
  F = Symbol.for("lit-noChange"),
  V = Symbol.for("lit-nothing"),
  U = new WeakMap(),
  B = T.createTreeWalker(T, 129, null, !1),
  H = (e, t) => {
    const n = e.length - 1,
      i = [];
    let r,
      o = 2 === t ? "<svg>" : "",
      s = I;
    for (let t = 0; t < n; t++) {
      const n = e[t];
      let a,
        c,
        l = -1,
        u = 0;
      for (; u < n.length && ((s.lastIndex = u), (c = s.exec(n)), null !== c); )
        (u = s.lastIndex),
          s === I
            ? "!--" === c[1]
              ? (s = M)
              : void 0 !== c[1]
              ? (s = P)
              : void 0 !== c[2]
              ? ($.test(c[2]) && (r = RegExp("</" + c[2], "g")), (s = D))
              : void 0 !== c[3] && (s = D)
            : s === D
            ? ">" === c[0]
              ? ((s = null != r ? r : I), (l = -1))
              : void 0 === c[1]
              ? (l = -2)
              : ((l = s.lastIndex - c[2].length), (a = c[1]), (s = void 0 === c[3] ? D : '"' === c[3] ? N : R))
            : s === N || s === R
            ? (s = D)
            : s === M || s === P
            ? (s = I)
            : ((s = D), (r = void 0));
      const h = s === D && e[t + 1].startsWith("/>") ? " " : "";
      o +=
        s === I
          ? n + _
          : l >= 0
          ? (i.push(a), n.slice(0, l) + x + n.slice(l) + w + h)
          : n + w + (-2 === l ? (i.push(void 0), t) : h);
    }
    const a = o + (e[n] || "<?>") + (2 === t ? "</svg>" : "");
    if (!Array.isArray(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return [void 0 !== b ? b.createHTML(a) : a, i];
  };
class q {
  constructor({ strings: e, _$litType$: t }, n) {
    let i;
    this.parts = [];
    let r = 0,
      o = 0;
    const s = e.length - 1,
      a = this.parts,
      [c, l] = H(e, t);
    if (((this.el = q.createElement(c, n)), (B.currentNode = this.el.content), 2 === t)) {
      const e = this.el.content,
        t = e.firstChild;
      t.remove(), e.append(...t.childNodes);
    }
    for (; null !== (i = B.nextNode()) && a.length < s; ) {
      if (1 === i.nodeType) {
        if (i.hasAttributes()) {
          const e = [];
          for (const t of i.getAttributeNames())
            if (t.endsWith(x) || t.startsWith(w)) {
              const n = l[o++];
              if ((e.push(t), void 0 !== n)) {
                const e = i.getAttribute(n.toLowerCase() + x).split(w),
                  t = /([.?@])?(.*)/.exec(n);
                a.push({
                  type: 1,
                  index: r,
                  name: t[2],
                  strings: e,
                  ctor: "." === t[1] ? Z : "?" === t[1] ? K : "@" === t[1] ? J : Y,
                });
              } else a.push({ type: 6, index: r });
            }
          for (const t of e) i.removeAttribute(t);
        }
        if ($.test(i.tagName)) {
          const e = i.textContent.split(w),
            t = e.length - 1;
          if (t > 0) {
            i.textContent = y ? y.emptyScript : "";
            for (let n = 0; n < t; n++) i.append(e[n], C()), B.nextNode(), a.push({ type: 2, index: ++r });
            i.append(e[t], C());
          }
        }
      } else if (8 === i.nodeType)
        if (i.data === S) a.push({ type: 2, index: r });
        else {
          let e = -1;
          for (; -1 !== (e = i.data.indexOf(w, e + 1)); ) a.push({ type: 7, index: r }), (e += w.length - 1);
        }
      r++;
    }
  }
  static createElement(e, t) {
    const n = T.createElement("template");
    return (n.innerHTML = e), n;
  }
}
function Q(e, t, n = e, i) {
  var r, o, s, a;
  if (t === F) return t;
  let c = void 0 !== i ? (null === (r = n._$Co) || void 0 === r ? void 0 : r[i]) : n._$Cl;
  const l = E(t) ? void 0 : t._$litDirective$;
  return (
    (null == c ? void 0 : c.constructor) !== l &&
      (null === (o = null == c ? void 0 : c._$AO) || void 0 === o || o.call(c, !1),
      void 0 === l ? (c = void 0) : ((c = new l(e)), c._$AT(e, n, i)),
      void 0 !== i ? ((null !== (s = (a = n)._$Co) && void 0 !== s ? s : (a._$Co = []))[i] = c) : (n._$Cl = c)),
    void 0 !== c && (t = Q(e, c._$AS(e, t.values), c, i)),
    t
  );
}
class G {
  constructor(e, t) {
    (this._$AV = []), (this._$AN = void 0), (this._$AD = e), (this._$AM = t);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    var t;
    const {
        el: { content: n },
        parts: i,
      } = this._$AD,
      r = (null !== (t = null == e ? void 0 : e.creationScope) && void 0 !== t ? t : T).importNode(n, !0);
    B.currentNode = r;
    let o = B.nextNode(),
      s = 0,
      a = 0,
      c = i[0];
    for (; void 0 !== c; ) {
      if (s === c.index) {
        let t;
        2 === c.type
          ? (t = new W(o, o.nextSibling, this, e))
          : 1 === c.type
          ? (t = new c.ctor(o, c.name, c.strings, this, e))
          : 6 === c.type && (t = new ee(o, this, e)),
          this._$AV.push(t),
          (c = i[++a]);
      }
      s !== (null == c ? void 0 : c.index) && ((o = B.nextNode()), s++);
    }
    return r;
  }
  v(e) {
    let t = 0;
    for (const n of this._$AV)
      void 0 !== n && (void 0 !== n.strings ? (n._$AI(e, n, t), (t += n.strings.length - 2)) : n._$AI(e[t])), t++;
  }
}
class W {
  constructor(e, t, n, i) {
    var r;
    (this.type = 2),
      (this._$AH = V),
      (this._$AN = void 0),
      (this._$AA = e),
      (this._$AB = t),
      (this._$AM = n),
      (this.options = i),
      (this._$Cp = null === (r = null == i ? void 0 : i.isConnected) || void 0 === r || r);
  }
  get _$AU() {
    var e, t;
    return null !== (t = null === (e = this._$AM) || void 0 === e ? void 0 : e._$AU) && void 0 !== t ? t : this._$Cp;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return void 0 !== t && 11 === (null == e ? void 0 : e.nodeType) && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    (e = Q(this, e, t)),
      E(e)
        ? e === V || null == e || "" === e
          ? (this._$AH !== V && this._$AR(), (this._$AH = V))
          : e !== this._$AH && e !== F && this._(e)
        : void 0 !== e._$litType$
        ? this.g(e)
        : void 0 !== e.nodeType
        ? this.$(e)
        : A(e)
        ? this.T(e)
        : this._(e);
  }
  k(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  $(e) {
    this._$AH !== e && (this._$AR(), (this._$AH = this.k(e)));
  }
  _(e) {
    this._$AH !== V && E(this._$AH) ? (this._$AA.nextSibling.data = e) : this.$(T.createTextNode(e)), (this._$AH = e);
  }
  g(e) {
    var t;
    const { values: n, _$litType$: i } = e,
      r = "number" == typeof i ? this._$AC(e) : (void 0 === i.el && (i.el = q.createElement(i.h, this.options)), i);
    if ((null === (t = this._$AH) || void 0 === t ? void 0 : t._$AD) === r) this._$AH.v(n);
    else {
      const e = new G(r, this),
        t = e.u(this.options);
      e.v(n), this.$(t), (this._$AH = e);
    }
  }
  _$AC(e) {
    let t = U.get(e.strings);
    return void 0 === t && U.set(e.strings, (t = new q(e))), t;
  }
  T(e) {
    k(this._$AH) || ((this._$AH = []), this._$AR());
    const t = this._$AH;
    let n,
      i = 0;
    for (const r of e)
      i === t.length ? t.push((n = new W(this.k(C()), this.k(C()), this, this.options))) : (n = t[i]), n._$AI(r), i++;
    i < t.length && (this._$AR(n && n._$AB.nextSibling, i), (t.length = i));
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var n;
    for (null === (n = this._$AP) || void 0 === n || n.call(this, !1, !0, t); e && e !== this._$AB; ) {
      const t = e.nextSibling;
      e.remove(), (e = t);
    }
  }
  setConnected(e) {
    var t;
    void 0 === this._$AM && ((this._$Cp = e), null === (t = this._$AP) || void 0 === t || t.call(this, e));
  }
}
class Y {
  constructor(e, t, n, i, r) {
    (this.type = 1),
      (this._$AH = V),
      (this._$AN = void 0),
      (this.element = e),
      (this.name = t),
      (this._$AM = i),
      (this.options = r),
      n.length > 2 || "" !== n[0] || "" !== n[1]
        ? ((this._$AH = Array(n.length - 1).fill(new String())), (this.strings = n))
        : (this._$AH = V);
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e, t = this, n, i) {
    const r = this.strings;
    let o = !1;
    if (void 0 === r) (e = Q(this, e, t, 0)), (o = !E(e) || (e !== this._$AH && e !== F)), o && (this._$AH = e);
    else {
      const i = e;
      let s, a;
      for (e = r[0], s = 0; s < r.length - 1; s++)
        (a = Q(this, i[n + s], t, s)),
          a === F && (a = this._$AH[s]),
          o || (o = !E(a) || a !== this._$AH[s]),
          a === V ? (e = V) : e !== V && (e += (null != a ? a : "") + r[s + 1]),
          (this._$AH[s] = a);
    }
    o && !i && this.j(e);
  }
  j(e) {
    e === V ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != e ? e : "");
  }
}
class Z extends Y {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  j(e) {
    this.element[this.name] = e === V ? void 0 : e;
  }
}
const X = y ? y.emptyScript : "";
class K extends Y {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  j(e) {
    e && e !== V ? this.element.setAttribute(this.name, X) : this.element.removeAttribute(this.name);
  }
}
class J extends Y {
  constructor(e, t, n, i, r) {
    super(e, t, n, i, r), (this.type = 5);
  }
  _$AI(e, t = this) {
    var n;
    if ((e = null !== (n = Q(this, e, t, 0)) && void 0 !== n ? n : V) === F) return;
    const i = this._$AH,
      r = (e === V && i !== V) || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive,
      o = e !== V && (i === V || r);
    r && this.element.removeEventListener(this.name, this, i),
      o && this.element.addEventListener(this.name, this, e),
      (this._$AH = e);
  }
  handleEvent(e) {
    var t, n;
    "function" == typeof this._$AH
      ? this._$AH.call(
          null !== (n = null === (t = this.options) || void 0 === t ? void 0 : t.host) && void 0 !== n
            ? n
            : this.element,
          e
        )
      : this._$AH.handleEvent(e);
  }
}
class ee {
  constructor(e, t, n) {
    (this.element = e), (this.type = 6), (this._$AN = void 0), (this._$AM = t), (this.options = n);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Q(this, e);
  }
}
const te = { O: x, P: w, A: S, C: 1, M: H, L: G, D: A, R: Q, I: W, V: Y, H: K, N: J, U: Z, F: ee },
  ne = g.litHtmlPolyfillSupport;
null == ne || ne(q, W), (null !== (m = g.litHtmlVersions) && void 0 !== m ? m : (g.litHtmlVersions = [])).push("2.7.3");
const ie = (e, t, n) => {
  var i, r;
  const o = null !== (i = null == n ? void 0 : n.renderBefore) && void 0 !== i ? i : t;
  let s = o._$litPart$;
  if (void 0 === s) {
    const e = null !== (r = null == n ? void 0 : n.renderBefore) && void 0 !== r ? r : null;
    o._$litPart$ = s = new W(t.insertBefore(C(), e), e, void 0, null != n ? n : {});
  }
  return s._$AI(e), s;
};
var re, oe;
class se extends v {
  constructor() {
    super(...arguments), (this.renderOptions = { host: this }), (this._$Do = void 0);
  }
  createRenderRoot() {
    var e, t;
    const n = super.createRenderRoot();
    return (null !== (e = (t = this.renderOptions).renderBefore) && void 0 !== e) || (t.renderBefore = n.firstChild), n;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(e),
      (this._$Do = ie(t, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), null === (e = this._$Do) || void 0 === e || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), null === (e = this._$Do) || void 0 === e || e.setConnected(!1);
  }
  render() {
    return F;
  }
}
(se.finalized = !0),
  (se._$litElement$ = !0),
  null === (re = globalThis.litElementHydrateSupport) || void 0 === re || re.call(globalThis, { LitElement: se });
const ae = globalThis.litElementPolyfillSupport;
null == ae || ae({ LitElement: se }),
  (null !== (oe = globalThis.litElementVersions) && void 0 !== oe ? oe : (globalThis.litElementVersions = [])).push(
    "3.3.2"
  );
const ce = (e) => (null != e ? e : V),
  le = 1,
  ue = 2,
  he = 6,
  de =
    (e) =>
    (...t) => ({ _$litDirective$: e, values: t });
class pe {
  constructor(e) {}
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, n) {
    (this._$Ct = e), (this._$AM = t), (this._$Ci = n);
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
}
const { I: fe } = te,
  ve = () => document.createComment(""),
  me = (e, t, n) => {
    var i;
    const r = e._$AA.parentNode,
      o = void 0 === t ? e._$AB : t._$AA;
    if (void 0 === n) {
      const t = r.insertBefore(ve(), o),
        i = r.insertBefore(ve(), o);
      n = new fe(t, i, e, e.options);
    } else {
      const t = n._$AB.nextSibling,
        s = n._$AM,
        a = s !== e;
      if (a) {
        let t;
        null === (i = n._$AQ) || void 0 === i || i.call(n, e),
          (n._$AM = e),
          void 0 !== n._$AP && (t = e._$AU) !== s._$AU && n._$AP(t);
      }
      if (t !== o || a) {
        let e = n._$AA;
        for (; e !== t; ) {
          const t = e.nextSibling;
          r.insertBefore(e, o), (e = t);
        }
      }
    }
    return n;
  },
  ge = (e, t, n = e) => (e._$AI(t, n), e),
  ye = {},
  be = (e) => {
    var t;
    null === (t = e._$AP) || void 0 === t || t.call(e, !1, !0);
    let n = e._$AA;
    const i = e._$AB.nextSibling;
    for (; n !== i; ) {
      const e = n.nextSibling;
      n.remove(), (n = e);
    }
  },
  xe = (e, t, n) => {
    const i = new Map();
    for (let r = t; r <= n; r++) i.set(e[r], r);
    return i;
  },
  we = de(
    class extends pe {
      constructor(e) {
        if ((super(e), e.type !== ue)) throw Error("repeat() can only be used in text expressions");
      }
      dt(e, t, n) {
        let i;
        void 0 === n ? (n = t) : void 0 !== t && (i = t);
        const r = [],
          o = [];
        let s = 0;
        for (const t of e) (r[s] = i ? i(t, s) : s), (o[s] = n(t, s)), s++;
        return { values: o, keys: r };
      }
      render(e, t, n) {
        return this.dt(e, t, n).values;
      }
      update(e, [t, n, i]) {
        var r;
        const o = ((e) => e._$AH)(e),
          { values: s, keys: a } = this.dt(t, n, i);
        if (!Array.isArray(o)) return (this.ht = a), s;
        const c = null !== (r = this.ht) && void 0 !== r ? r : (this.ht = []),
          l = [];
        let u,
          h,
          d = 0,
          p = o.length - 1,
          f = 0,
          v = s.length - 1;
        for (; d <= p && f <= v; )
          if (null === o[d]) d++;
          else if (null === o[p]) p--;
          else if (c[d] === a[f]) (l[f] = ge(o[d], s[f])), d++, f++;
          else if (c[p] === a[v]) (l[v] = ge(o[p], s[v])), p--, v--;
          else if (c[d] === a[v]) (l[v] = ge(o[d], s[v])), me(e, l[v + 1], o[d]), d++, v--;
          else if (c[p] === a[f]) (l[f] = ge(o[p], s[f])), me(e, o[d], o[p]), p--, f++;
          else if ((void 0 === u && ((u = xe(a, f, v)), (h = xe(c, d, p))), u.has(c[d])))
            if (u.has(c[p])) {
              const t = h.get(a[f]),
                n = void 0 !== t ? o[t] : null;
              if (null === n) {
                const t = me(e, o[d]);
                ge(t, s[f]), (l[f] = t);
              } else (l[f] = ge(n, s[f])), me(e, o[d], n), (o[t] = null);
              f++;
            } else be(o[p]), p--;
          else be(o[d]), d++;
        for (; f <= v; ) {
          const t = me(e, l[v + 1]);
          ge(t, s[f]), (l[f++] = t);
        }
        for (; d <= p; ) {
          const e = o[d++];
          null !== e && be(e);
        }
        return (
          (this.ht = a),
          ((e, t = ye) => {
            e._$AH = t;
          })(e, l),
          F
        );
      }
    }
  ),
  Se = "important",
  _e = " !" + Se,
  Te = de(
    class extends pe {
      constructor(e) {
        var t;
        if (
          (super(e),
          e.type !== le || "style" !== e.name || (null === (t = e.strings) || void 0 === t ? void 0 : t.length) > 2)
        )
          throw Error(
            "The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute."
          );
      }
      render(e) {
        return Object.keys(e).reduce((t, n) => {
          const i = e[n];
          return null == i
            ? t
            : t +
                `${(n = n.includes("-")
                  ? n
                  : n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase())}:${i};`;
        }, "");
      }
      update(e, [t]) {
        const { style: n } = e.element;
        if (void 0 === this.ut) {
          this.ut = new Set();
          for (const e in t) this.ut.add(e);
          return this.render(t);
        }
        this.ut.forEach((e) => {
          null == t[e] && (this.ut.delete(e), e.includes("-") ? n.removeProperty(e) : (n[e] = ""));
        });
        for (const e in t) {
          const i = t[e];
          if (null != i) {
            this.ut.add(e);
            const t = "string" == typeof i && i.endsWith(_e);
            e.includes("-") || t ? n.setProperty(e, t ? i.slice(0, -11) : i, t ? Se : "") : (n[e] = i);
          }
        }
        return F;
      }
    }
  );
const Ce = de(
  class extends pe {
    constructor(e) {
      if ((super(e), (this._previousAttrs = new Set()), e.type !== he))
        throw new Error("attrs directive must be used on element");
    }
    render(e) {
      return F;
    }
    update(e, [t]) {
      const n = e.element;
      this._previousAttrs.forEach((e) => {
        (e in t && t[e]) || n.removeAttribute(e);
      }),
        this._previousAttrs.clear();
      for (const e in t) {
        const i = t[e];
        if (!i) continue;
        const r = "boolean" == typeof i ? "" : i.toString();
        n.setAttribute(e, r), this._previousAttrs.add(e);
      }
      return F;
    }
  }
);
let Ee = Object.assign({}, { templateRenderingStrategy: null });
const ke = () => Object.assign({}, Ee),
  Ae = () => {
    const { templateRenderingStrategy: e = null } = ke();
    if (null == e)
      throw new Error(
        "Faceplate-ui templateRenderingStrategy is undefined.\n\n      Please import a templateRenderingStrategy so that faceplate-ui can render\n      template components properly for your environment. For example:\n\n      import '@reddit/faceplate-ui/templateRenderingStrategy/clientStrategy.js'\n\n      or, for a server environment:\n\n      import '@reddit/faceplate-ui/templateRenderingStrategy/serverStrategy.js'\n      "
      );
    return e;
  };
function Oe(e, t) {
  return "className" !== e && (null == t || "string" == typeof t || "number" == typeof t || "boolean" == typeof t);
}
const Ie = "client";
!(function (e) {
  var t;
  const n = null === (t = ke().templateRenderingStrategy) || void 0 === t ? void 0 : t.getType();
  if (null != n && n !== e)
    throw new Error(
      `\nFaceplate UI templateRenderingStrategy is being set to ${e}, but it has already been set to ${n}.\ntemplateRenderingStrategy cannot be changed once it has been set because it is not possible to switch from the client to the server.\n  \nThis usually happens when mixing imports from faceplate-ui/templates/client and faceplate-ui/templates/server, since these imports\nautomatically set templateRenderingStrategy, but can also happen if multiple calls to setConfig try to set conflicting strategies.\n  `
    );
})(Ie);
const Me = (e) => {
  const t = {};
  for (const n in e) {
    const i = e[n];
    Object.prototype.hasOwnProperty.call(e, n) && Oe(n, i) && (t[n] = i);
  }
  return t;
};
((e) => {
  Ee = Object.assign(Object.assign({}, Ee), e);
})({
  templateRenderingStrategy: {
    _toHtml_TEST_ONLY: (e) => {
      const t = document.createElement("div");
      return ie(e, t), t.children[0];
    },
    attrs: (e) => (null == e ? V : Ce(Me(e))),
    getType: () => Ie,
    html: j,
    ifDefined: ce,
    repeat: we,
    styleMap: Te,
    svg: z,
  },
});
var Pe = function (e, t) {
  return (
    (Pe =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (e, t) {
          e.__proto__ = t;
        }) ||
      function (e, t) {
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      }),
    Pe(e, t)
  );
};
function De(e, t) {
  if ("function" != typeof t && null !== t)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  function n() {
    this.constructor = e;
  }
  Pe(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
}
var Re = function () {
  return (
    (Re =
      Object.assign ||
      function (e) {
        for (var t, n = 1, i = arguments.length; n < i; n++)
          for (var r in (t = arguments[n])) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
        return e;
      }),
    Re.apply(this, arguments)
  );
};
function Ne(e, t) {
  var n = {};
  for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.indexOf(i) < 0 && (n[i] = e[i]);
  if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
    var r = 0;
    for (i = Object.getOwnPropertySymbols(e); r < i.length; r++)
      t.indexOf(i[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, i[r]) && (n[i[r]] = e[i[r]]);
  }
  return n;
}
function $e(e, t, n, i) {
  var r,
    o = arguments.length,
    s = o < 3 ? t : null === i ? (i = Object.getOwnPropertyDescriptor(t, n)) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, i);
  else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(t, n, s) : r(t, n)) || s);
  return o > 3 && s && Object.defineProperty(t, n, s), s;
}
function Le(e, t, n, i) {
  return new (n || (n = Promise))(function (r, o) {
    function s(e) {
      try {
        c(i.next(e));
      } catch (e) {
        o(e);
      }
    }
    function a(e) {
      try {
        c(i.throw(e));
      } catch (e) {
        o(e);
      }
    }
    function c(e) {
      var t;
      e.done
        ? r(e.value)
        : ((t = e.value),
          t instanceof n
            ? t
            : new n(function (e) {
                e(t);
              })).then(s, a);
    }
    c((i = i.apply(e, t || [])).next());
  });
}
function je(e, t) {
  var n,
    i,
    r,
    o,
    s = {
      label: 0,
      sent: function () {
        if (1 & r[0]) throw r[1];
        return r[1];
      },
      trys: [],
      ops: [],
    };
  return (
    (o = { next: a(0), throw: a(1), return: a(2) }),
    "function" == typeof Symbol &&
      (o[Symbol.iterator] = function () {
        return this;
      }),
    o
  );
  function a(o) {
    return function (a) {
      return (function (o) {
        if (n) throw new TypeError("Generator is already executing.");
        for (; s; )
          try {
            if (
              ((n = 1),
              i &&
                (r = 2 & o[0] ? i.return : o[0] ? i.throw || ((r = i.return) && r.call(i), 0) : i.next) &&
                !(r = r.call(i, o[1])).done)
            )
              return r;
            switch (((i = 0), r && (o = [2 & o[0], r.value]), o[0])) {
              case 0:
              case 1:
                r = o;
                break;
              case 4:
                return s.label++, { value: o[1], done: !1 };
              case 5:
                s.label++, (i = o[1]), (o = [0]);
                continue;
              case 7:
                (o = s.ops.pop()), s.trys.pop();
                continue;
              default:
                if (!((r = s.trys), (r = r.length > 0 && r[r.length - 1]) || (6 !== o[0] && 2 !== o[0]))) {
                  s = 0;
                  continue;
                }
                if (3 === o[0] && (!r || (o[1] > r[0] && o[1] < r[3]))) {
                  s.label = o[1];
                  break;
                }
                if (6 === o[0] && s.label < r[1]) {
                  (s.label = r[1]), (r = o);
                  break;
                }
                if (r && s.label < r[2]) {
                  (s.label = r[2]), s.ops.push(o);
                  break;
                }
                r[2] && s.ops.pop(), s.trys.pop();
                continue;
            }
            o = t.call(e, s);
          } catch (e) {
            (o = [6, e]), (i = 0);
          } finally {
            n = r = 0;
          }
        if (5 & o[0]) throw o[1];
        return { value: o[0] ? o[1] : void 0, done: !0 };
      })([o, a]);
    };
  }
}
function ze(e, t, n) {
  if (n || 2 === arguments.length)
    for (var i, r = 0, o = t.length; r < o; r++)
      (!i && r in t) || (i || (i = Array.prototype.slice.call(t, 0, r)), (i[r] = t[r]));
  return e.concat(i || Array.prototype.slice.call(t));
}
const Fe = (e) => (t) =>
    "function" == typeof t
      ? ((e, t) => (customElements.define(e, t), t))(e, t)
      : ((e, t) => {
          const { kind: n, elements: i } = t;
          return {
            kind: n,
            elements: i,
            finisher(t) {
              customElements.define(e, t);
            },
          };
        })(e, t),
  Ve = (e, t) =>
    "method" === t.kind && t.descriptor && !("value" in t.descriptor)
      ? {
          ...t,
          finisher(n) {
            n.createProperty(t.key, e);
          },
        }
      : {
          kind: "field",
          key: Symbol(),
          placement: "own",
          descriptor: {},
          originalKey: t.key,
          initializer() {
            "function" == typeof t.initializer && (this[t.key] = t.initializer.call(this));
          },
          finisher(n) {
            n.createProperty(t.key, e);
          },
        };
function Ue(e) {
  return (t, n) =>
    void 0 !== n
      ? ((e, t, n) => {
          t.constructor.createProperty(n, e);
        })(e, t, n)
      : Ve(e, t);
}
function Be(e) {
  return Ue({ ...e, state: !0 });
}
const He =
  ({ finisher: e, descriptor: t }) =>
  (n, i) => {
    var r;
    if (void 0 === i) {
      const i = null !== (r = n.originalKey) && void 0 !== r ? r : n.key,
        o = null != t ? { kind: "method", placement: "prototype", key: i, descriptor: t(n.key) } : { ...n, key: i };
      return (
        null != e &&
          (o.finisher = function (t) {
            e(t, i);
          }),
        o
      );
    }
    {
      const r = n.constructor;
      void 0 !== t && Object.defineProperty(n, i, t(i)), null == e || e(r, i);
    }
  };
function qe(e, t) {
  return He({
    descriptor: (n) => {
      const i = {
        get() {
          var t, n;
          return null !== (n = null === (t = this.renderRoot) || void 0 === t ? void 0 : t.querySelector(e)) &&
            void 0 !== n
            ? n
            : null;
        },
        enumerable: !0,
        configurable: !0,
      };
      if (t) {
        const t = "symbol" == typeof n ? Symbol() : "__" + n;
        i.get = function () {
          var n, i;
          return (
            void 0 === this[t] &&
              (this[t] =
                null !== (i = null === (n = this.renderRoot) || void 0 === n ? void 0 : n.querySelector(e)) &&
                void 0 !== i
                  ? i
                  : null),
            this[t]
          );
        };
      }
      return i;
    },
  });
}
var Qe;
const Ge =
  null != (null === (Qe = window.HTMLSlotElement) || void 0 === Qe ? void 0 : Qe.prototype.assignedElements)
    ? (e, t) => e.assignedElements(t)
    : (e, t) => e.assignedNodes(t).filter((e) => e.nodeType === Node.ELEMENT_NODE);
const We = Symbol("mixins/connect-event");
function Ye(e, t, n = !0) {
  return new CustomEvent(e, { composed: !0, bubbles: n, cancelable: !0, detail: t });
}
var Ze, Xe, Ke, Je;
!(function (e) {
  (e[(e.emergency = 0)] = "emergency"),
    (e[(e.alert = 1)] = "alert"),
    (e[(e.critical = 2)] = "critical"),
    (e[(e.error = 3)] = "error"),
    (e[(e.warning = 4)] = "warning"),
    (e[(e.notice = 5)] = "notice"),
    (e[(e.info = 6)] = "info"),
    (e[(e.success = 7)] = "success"),
    (e[(e.debug = 8)] = "debug"),
    (e[(e.none = 9)] = "none");
})(Ze || (Ze = {})),
  (function (e) {
    (e.Programmatic = "programmatic"),
      (e.Eager = "eager"),
      (e.Action = "action"),
      (e.Intent = "intent"),
      (e.Lazy = "lazy"),
      (e.Preload = "preload");
  })(Xe || (Xe = {})),
  (function (e) {
    (e.Once = "once"), (e.Always = "always");
  })(Ke || (Ke = {})),
  (function (e) {
    (e.Get = "get"), (e.Post = "post"), (e.Dialog = "dialog"), (e.Log = "log");
  })(Je || (Je = {}));
let et = class extends (function (e) {
  if (We in e) return e;
  class t extends e {
    connectedCallback() {
      super.connectedCallback && super.connectedCallback(), window.queueMicrotask(() => this.dispatchConnectEvent());
    }
    dispatchConnectEvent() {
      if (!this.isConnected) return;
      const e = this.makeConnectEvent();
      return this.dispatchEvent(e), e;
    }
    makeConnectEvent() {
      throw new Error("FaceplateEvent makeConnectEvent() method not implemented!");
    }
  }
  return (t[We] = !0), t;
})(HTMLElement) {
  makeConnectEvent() {
    const e = this.getAttribute("level");
    let t;
    if (e) {
      const n = e.toLowerCase();
      if (!Object.hasOwnProperty.call(Ze, n))
        return Ye("faceplate-error", new Error(`Unknown level value "${e}" specified on <faceplate-alert> element`));
      const i = parseInt(n, 10);
      t = isNaN(i) ? Ze[n] : i;
    }
    const n = this.getAttribute("message"),
      i = this.getAttribute("name"),
      r = this.getAttribute("meta"),
      o = this.getAttribute("count");
    return Ye("faceplate-alert", {
      level: t,
      name: i || void 0,
      message: n || void 0,
      meta: r || void 0,
      count: null === o ? 1 : parseInt(o),
      originalAlert: this,
    });
  }
};
et = $e([Fe("faceplate-alert")], et);
class tt extends se {
  render() {
    return j` <slot></slot> `;
  }
}
tt.styles = o`:host{display:block}`;
const nt = (function () {
    const e = new WeakMap();
    let t = !1;
    return {
      get isDirty() {
        return t;
      },
      register(n, i) {
        const r = e.get(n);
        r && !r.has(i) ? r.add(i) : r || e.set(n, new Set([i])), (t = !0);
      },
      unregister(n, i) {
        const r = e.get(n);
        r && r.has(i) && (r.delete(i), (t = !0));
      },
      getRegisteredElements(n) {
        const i = e.get(n);
        return (t = !1), i;
      },
      unregisterAll(n) {
        e.delete(n), (t = !0);
      },
    };
  })(),
  it = (function () {
    const e = new Set(),
      t = (t) => e.has(t.constructor);
    return {
      registerAncestorClass(t) {
        e.add(t);
      },
      connectToAncestor: (e) =>
        (async function (e, t) {
          let n = e;
          for (; n.parentElement; ) {
            if (((n = n.parentElement), !n.tagName.includes("-"))) continue;
            const e = n.tagName.toLowerCase();
            if ((customElements.get(e) || (await customElements.whenDefined(e)), t(n))) return n;
          }
        })(e, t),
    };
  })(),
  rt = it.registerAncestorClass,
  ot = it.connectToAncestor,
  st = {
    fromAttribute(e) {
      if (e in Ze) return Ze[e];
    },
    toAttribute(e) {
      if (e in Ze) return Ze[e];
    },
  };
function at(e, t, n, i) {
  return { level: e, message: t, meta: n[0] && "string" == typeof n[0] ? n.join("\n") : void 0, count: i };
}
class ct {
  constructor(e) {
    (this._handleAlertEvent = (e) => {
      const t = e.detail;
      this.report(t) && e.stopImmediatePropagation();
    }),
      e.addController(this),
      rt(e.constructor),
      (this.host = e);
  }
  hostConnected() {
    this.host.addEventListener("faceplate-alert", this._handleAlertEvent);
  }
  hostDisconnected() {
    this.host.removeEventListener("faceplate-alert", this._handleAlertEvent);
  }
  report(e) {
    const t = nt.getRegisteredElements(this.host);
    if (t) for (const n of t) if (n.shouldDisplayAlert(e)) return n.displayAlert(e), !0;
    return !1;
  }
}
let lt = class extends tt {
  constructor() {
    super(...arguments), (this.reporter = new ct(this));
  }
};
lt = $e([Fe("faceplate-alert-reporter")], lt);
class ut {
  constructor(e, t) {
    (this._events = new Map()),
      (this._isConnected = !1),
      e.addController(this),
      (this._host = e),
      (this._getTarget = t);
  }
  _getEventTarget() {
    return this._getTarget ? this._getTarget() : this._host;
  }
  hostConnected() {
    const e = this._getEventTarget();
    for (const [t, n] of this._events) Array.isArray(n) ? e.addEventListener(t, n[0], n[1]) : e.addEventListener(t, n);
    this._isConnected = !0;
  }
  hostDisconnected() {
    const e = this._getEventTarget();
    for (const [t, n] of this._events)
      Array.isArray(n) ? e.removeEventListener(t, n[0], n[1]) : e.removeEventListener(t, n);
    this._isConnected = !1;
  }
  define(e, t, n) {
    const i = e.toString();
    if (this._events.has(i)) throw new Error(`Event ${i} already defined.`);
    if ((n ? this._events.set(i, [t, n]) : this._events.set(i, t), this._isConnected)) {
      const e = this._getEventTarget();
      e && e.addEventListener(i, t, n);
    }
    return t;
  }
}
class ht extends (function (e) {
  var t;
  return ((t = class extends e {}).VERSION = "2.2.1"), t;
})(se) {}
var dt, pt;
!(function (e) {
  (e.NEUTRAL = "neutral"), (e.SUCCESS = "success");
})(dt || (dt = {})),
  (function (e) {
    (e.TOP = "top"), (e.BOTTOM = "bottom");
  })(pt || (pt = {}));
let ft = class extends ht {
  constructor() {
    super(...arguments), (this.type = void 0), (this._fading = !1), (this._events = new ut(this));
  }
  static get styles() {
    return o`:host{display:flex;align-items:center;box-sizing:border-box;min-height:var(--rem64);border-radius:var(--radius-lg);width:400px;max-width:calc(100vw - var(--radius-lg));padding:var(--spacer-sm) var(--spacer-lg);background-color:var(--color-neutral-content-strong);color:var(--color-neutral-background-weak);font-size:var(--font-14-20-regular);opacity:1;transition:opacity .3s}:host([type=success]){background-color:var(--color-success-background);color:var(--color-success-onBackground)}:host(.hasAvatar){padding-left:var(--rem16)}:host(.hasIcon){padding-left:var(--rem20)}:host(.hasAction){padding-right:var(--spacer-md)}:host(.hasAvatar)>slot[name=avatar]{padding-right:var(--spacer-xs)}:host(.hasIcon)>slot[name=icon]{padding-right:var(--spacer-sm)}:host(.hasAction)>slot[name=action]{padding-left:var(--spacer-sm)}:host([_fading]){opacity:0}slot:not([name]){display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-break:break-word;flex-grow:1}slot{display:block}`;
  }
  connectedCallback() {
    super.connectedCallback(),
      this._events.define("onslotchange", () => {
        this.requestUpdate();
      }),
      this._events.define("transitionend", () => {
        if (this._fading) {
          const e = Ye("faceplate-close");
          this.dispatchEvent(e), e.defaultPrevented || this.remove();
        }
      });
  }
  dismiss() {
    this._fading = !0;
  }
  render() {
    const e = !!this.querySelector(':scope > [slot="avatar"]'),
      t = !!this.querySelector(':scope > [slot="icon"]'),
      n = !!this.querySelector(':scope > [slot="action"]');
    return (
      this.classList.toggle("hasAvatar", e),
      this.classList.toggle("hasIcon", t),
      this.classList.toggle("hasAction", n),
      j` <slot name="avatar"></slot> <slot name="icon"></slot> <slot></slot> <slot name="action"></slot> `
    );
  }
};
$e([Ue({ type: String, reflect: !0 })], ft.prototype, "type", void 0),
  $e([Ue({ type: Boolean, reflect: !0 })], ft.prototype, "_fading", void 0),
  (ft = $e([Fe("faceplate-toast")], ft));
class vt {
  constructor(e, t) {
    (this.element = e),
      (this.touchStartX = null),
      (this.touchStartY = null),
      (this.touchEndX = null),
      (this.touchEndY = null),
      (this.touchMoveX = null),
      (this.touchMoveY = null),
      (this.velocityX = null),
      (this.velocityY = null),
      (this.longPressTimer = null),
      (this.doubleTapTimer = null),
      (this.doubleTapWaiting = !1),
      (this.thresholdX = 0),
      (this.thresholdY = 0),
      (this.disregardVelocityThresholdX = 0),
      (this.disregardVelocityThresholdY = 0),
      (this.swipingHorizontal = !1),
      (this.swipingVertical = !1),
      (this.swipingDirection = null),
      (this.swipedHorizontal = !1),
      (this.swipedVertical = !1),
      (this.handlers = {
        panstart: [],
        panmove: [],
        panend: [],
        swipeleft: [],
        swiperight: [],
        swipeup: [],
        swipedown: [],
        tap: [],
        doubletap: [],
        longpress: [],
      }),
      (this._onTouchStart = this.onTouchStart.bind(this)),
      (this._onTouchMove = this.onTouchMove.bind(this)),
      (this._onTouchEnd = this.onTouchEnd.bind(this)),
      (this.opts = Object.assign({}, vt.defaults, t)),
      this.element.addEventListener("touchstart", this._onTouchStart, mt),
      this.element.addEventListener("touchmove", this._onTouchMove, mt),
      this.element.addEventListener("touchend", this._onTouchEnd, mt),
      this.opts.mouseSupport &&
        !("ontouchstart" in window) &&
        (this.element.addEventListener("mousedown", this._onTouchStart, mt),
        document.addEventListener("mousemove", this._onTouchMove, mt),
        document.addEventListener("mouseup", this._onTouchEnd, mt));
  }
  destroy() {
    var e, t;
    this.element.removeEventListener("touchstart", this._onTouchStart),
      this.element.removeEventListener("touchmove", this._onTouchMove),
      this.element.removeEventListener("touchend", this._onTouchEnd),
      this.element.removeEventListener("mousedown", this._onTouchStart),
      document.removeEventListener("mousemove", this._onTouchMove),
      document.removeEventListener("mouseup", this._onTouchEnd),
      clearTimeout(null !== (e = this.longPressTimer) && void 0 !== e ? e : void 0),
      clearTimeout(null !== (t = this.doubleTapTimer) && void 0 !== t ? t : void 0);
  }
  on(e, t) {
    if (this.handlers[e]) return this.handlers[e].push(t), { type: e, fn: t, cancel: () => this.off(e, t) };
  }
  off(e, t) {
    if (this.handlers[e]) {
      const n = this.handlers[e].indexOf(t);
      -1 !== n && this.handlers[e].splice(n, 1);
    }
  }
  fire(e, t) {
    for (let n = 0; n < this.handlers[e].length; n++) this.handlers[e][n](t);
  }
  onTouchStart(e) {
    (this.thresholdX = this.opts.threshold("x", this)),
      (this.thresholdY = this.opts.threshold("y", this)),
      (this.disregardVelocityThresholdX = this.opts.disregardVelocityThreshold("x", this)),
      (this.disregardVelocityThresholdY = this.opts.disregardVelocityThreshold("y", this)),
      (this.touchStartX = "mousedown" === e.type ? e.screenX : e.changedTouches[0].screenX),
      (this.touchStartY = "mousedown" === e.type ? e.screenY : e.changedTouches[0].screenY),
      (this.touchMoveX = null),
      (this.touchMoveY = null),
      (this.touchEndX = null),
      (this.touchEndY = null),
      (this.swipingDirection = null),
      (this.longPressTimer = setTimeout(() => this.fire("longpress", e), this.opts.longPressTime)),
      this.fire("panstart", e);
  }
  onTouchMove(e) {
    var t, n, i, r, o;
    if ("mousemove" === e.type && (!this.touchStartX || null !== this.touchEndX)) return;
    const s =
      ("mousemove" === e.type ? e.screenX : e.changedTouches[0].screenX) -
      (null !== (t = this.touchStartX) && void 0 !== t ? t : 0);
    (this.velocityX = s - (null !== (n = this.touchMoveX) && void 0 !== n ? n : 0)), (this.touchMoveX = s);
    const a =
      ("mousemove" === e.type ? e.screenY : e.changedTouches[0].screenY) -
      (null !== (i = this.touchStartY) && void 0 !== i ? i : 0);
    (this.velocityY = a - (null !== (r = this.touchMoveY) && void 0 !== r ? r : 0)), (this.touchMoveY = a);
    const c = Math.abs(this.touchMoveX),
      l = Math.abs(this.touchMoveY);
    (this.swipingHorizontal = c > this.thresholdX),
      (this.swipingVertical = l > this.thresholdY),
      (this.swipingDirection =
        c > l
          ? this.swipingHorizontal
            ? "horizontal"
            : "pre-horizontal"
          : this.swipingVertical
          ? "vertical"
          : "pre-vertical"),
      Math.max(c, l) > this.opts.pressThreshold &&
        clearTimeout(null !== (o = this.longPressTimer) && void 0 !== o ? o : void 0),
      this.fire("panmove", e);
  }
  onTouchEnd(e) {
    var t, n, i, r, o, s, a, c;
    if ("mouseup" === e.type && (!this.touchStartX || null !== this.touchEndX)) return;
    (this.touchEndX = "mouseup" === e.type ? e.screenX : e.changedTouches[0].screenX),
      (this.touchEndY = "mouseup" === e.type ? e.screenY : e.changedTouches[0].screenY),
      this.fire("panend", e),
      clearTimeout(null !== (t = this.longPressTimer) && void 0 !== t ? t : void 0);
    const l = this.touchEndX - (null !== (n = this.touchStartX) && void 0 !== n ? n : 0),
      u = Math.abs(l),
      h = this.touchEndY - (null !== (i = this.touchStartY) && void 0 !== i ? i : 0),
      d = Math.abs(h);
    u > this.thresholdX || d > this.thresholdY
      ? ((this.swipedHorizontal = this.opts.diagonalSwipes
          ? Math.abs(l / h) <= this.opts.diagonalLimit
          : u >= d && u > this.thresholdX),
        (this.swipedVertical = this.opts.diagonalSwipes
          ? Math.abs(h / l) <= this.opts.diagonalLimit
          : d > u && d > this.thresholdY),
        this.swipedHorizontal &&
          (l < 0
            ? ((null !== (r = this.velocityX) && void 0 !== r ? r : 0) < -this.opts.velocityThreshold ||
                l < -this.disregardVelocityThresholdX) &&
              this.fire("swipeleft", e)
            : ((null !== (o = this.velocityX) && void 0 !== o ? o : 0) > this.opts.velocityThreshold ||
                l > this.disregardVelocityThresholdX) &&
              this.fire("swiperight", e)),
        this.swipedVertical &&
          (h < 0
            ? ((null !== (s = this.velocityY) && void 0 !== s ? s : 0) < -this.opts.velocityThreshold ||
                h < -this.disregardVelocityThresholdY) &&
              this.fire("swipeup", e)
            : ((null !== (a = this.velocityY) && void 0 !== a ? a : 0) > this.opts.velocityThreshold ||
                h > this.disregardVelocityThresholdY) &&
              this.fire("swipedown", e)))
      : u < this.opts.pressThreshold &&
        d < this.opts.pressThreshold &&
        (this.doubleTapWaiting
          ? ((this.doubleTapWaiting = !1),
            clearTimeout(null !== (c = this.doubleTapTimer) && void 0 !== c ? c : void 0),
            this.fire("doubletap", e))
          : ((this.doubleTapWaiting = !0),
            (this.doubleTapTimer = setTimeout(() => (this.doubleTapWaiting = !1), this.opts.doubleTapTime)),
            this.fire("tap", e)));
  }
}
vt.defaults = {
  threshold: (e, t) =>
    Math.max(
      25,
      Math.floor(
        0.15 *
          ("x" === e
            ? window.innerWidth || document.body.clientWidth
            : window.innerHeight || document.body.clientHeight)
      )
    ),
  velocityThreshold: 10,
  disregardVelocityThreshold: (e, t) => Math.floor(0.5 * ("x" === e ? t.element.clientWidth : t.element.clientHeight)),
  pressThreshold: 8,
  diagonalSwipes: !1,
  diagonalLimit: Math.tan(0.375 * Math.PI),
  longPressTime: 500,
  doubleTapTime: 300,
  mouseSupport: !0,
};
let mt = !1;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        mt = { passive: !0 };
      },
    })
  );
} catch (e) {}
class gt {
  constructor(e, t) {
    (this._batchTimer = 0),
      (this._batchDisplay = () => {
        if (((this._batchTimer = 0), !this._batchQueue || !this._batchQueue.length)) return;
        const e = (function (e, t = at) {
          const n = [];
          if (!e.length) return n;
          e.sort((e, t) => (void 0 === e.level ? Ze.none : e.level) - (void 0 === t.level ? Ze.none : t.level));
          let i = {},
            r = e[0].level,
            o = 0;
          function s() {
            for (const e in i) {
              const o = i[e];
              if (1 === o.length) n.push(o[0]);
              else {
                const i = [];
                let s = 0;
                for (const e of o) e.meta && i.push(e.meta), (s += void 0 === e.count ? 1 : e.count);
                n.push(t(r, e, i, s));
              }
            }
          }
          for (const t of e) {
            t.level !== r && (s(), (i = {}), (r = t.level), (o = 0));
            const e = t.message || "";
            Object.prototype.hasOwnProperty.call(i, e) ? i[e].push(t) : (i[e] = [t]), (o += t.count || 1);
          }
          return o > 0 && s(), n;
        })(this._batchQueue);
        for (const t of e) this.options.onAlert(t);
        this._batchQueue.length = 0;
      }),
      e.addController(this),
      (this.host = e),
      (this.options = t),
      t.batchWindow && t.batchWindow > 0 && (this._batchQueue = []);
  }
  hostConnected() {
    ot(this.host).then((e) => {
      e && ((this._reporter = e), nt.register(e, this));
    });
  }
  hostDisconnected() {
    this._reporter && (nt.unregister(this._reporter, this), (this._reporter = void 0)),
      this._batchTimer && window.clearTimeout(this._batchTimer),
      this._batchQueue && (this._batchQueue.length = 0);
  }
  shouldDisplayAlert(e) {
    const t = this.options;
    if ("number" == typeof e.level) {
      if (t.max && e.level > t.max) return !1;
      if (t.min && e.level < t.min) return !1;
    } else if (void 0 !== t.min || void 0 !== t.max) return !1;
    return !t.name || t.name === e.name;
  }
  displayAlert(e) {
    if (this._batchQueue) {
      if ((this._batchQueue.push(e), this._batchTimer)) return;
      this._batchTimer = window.setTimeout(this._batchDisplay, this.options.batchWindow);
    } else this.options.onAlert(e);
  }
}
var yt;
function bt(e, t, n) {
  n || (n = t);
  const i = (function (e) {
    const t = e.getRootNode();
    return t instanceof ShadowRoot ? t.host.localName : "";
  })(n);
  i ? ie(e, t, { scope: i }) : ie(e, t);
}
!(function (e) {
  (e.ExtraSmall = "xs"),
    (e.Small = "sm"),
    (e.Medium = "md"),
    (e.Large = "lg"),
    (e.ExtraLarge = "xl"),
    (e.XXLarge = "2xl");
})(yt || (yt = {}));
const xt = { xs: 12, sm: 16, md: 20, lg: 24, xl: 32, "2xl": 48 },
  wt = (e, t, n) => (i) => {
    var r, o, s;
    const { attrs: a, svg: c, ifDefined: l } = Ae(),
      u = null !== (r = null == i ? void 0 : i.attributes) && void 0 !== r ? r : {},
      h = null !== (o = null == i ? void 0 : i.size) && void 0 !== o ? o : yt.Medium;
    return (
      (u.xmlns = "http://www.w3.org/2000/svg"),
      (u.viewBox = t),
      (u.width = u.height = xt[h]),
      (u["icon-name"] = n),
      (u.fill = null !== (s = null == u ? void 0 : u.fill) && void 0 !== s ? s : "currentColor"),
      c`<svg rpl class="${l(u.className)}" ${a(u)}>${e}</svg>`
    );
  },
  { svg: St } = Ae();
var _t,
  Tt = wt(
    St`<path d="M10 13.125a.624.624 0 01-.442-.183l-5-5 .884-.884L10 11.616l4.558-4.558.884.884-5 5a.624.624 0 01-.442.183z"></path>`,
    "0 0 20 20",
    "caret-down-outline"
  );
!(function (e) {
  (e.Small = "sm"), (e.Medium = "md"), (e.Large = "lg");
})(_t || (_t = {}));
const Ct = { sm: "button-small", md: "button-medium", lg: "button-large" },
  Et = {
    sm: { label: "px-[length:var(--rem10)]", icon: "px-[length:var(--rem6)]", iconLabel: "px-[length:var(--rem10)]" },
    md: {
      label: "px-[length:var(--rem14)]",
      icon: "px-[length:var(--rem8)]",
      iconLabel: "pl-[length:var(--rem10)] pr-[length:var(--rem14)]",
    },
    lg: {
      label: "px-[length:var(--rem14)]",
      icon: "px-[length:var(--rem12)]",
      iconLabel: "pl-[length:var(--rem10)] pr-[length:var(--rem14)]",
    },
  },
  kt = {
    sm: {
      label: "pl-[length:var(--rem10)] pr-[length:var(--rem6)]",
      icon: "pl-[length:var(--rem10)] pr-[length:var(--rem6)]",
      iconLabel: "pl-[length:var(--rem10)] pr-[length:var(--rem6)]",
    },
    md: {
      label: "pl-[length:var(--rem14)] pr-[length:var(--rem10)]",
      icon: "pl-[length:var(--rem10)] pr-[length:var(--rem6)]",
      iconLabel: "px-[length:var(--rem10)]",
    },
    lg: {
      label: "pl-[length:var(--rem14)] pr-[length:var(--rem10)]",
      icon: "px-[length:var(--rem14)]",
      iconLabel: "pl-[length:var(--rem14)] pr-[length:var(--rem10)]",
    },
  },
  At = {
    primary: "button-primary",
    secondary: "button-secondary",
    tertiary: "button-tertiary",
    plain: "button-plain",
    bordered: "button-bordered",
    destructive: "button-destructive",
    media: "button-media",
    brand: "button-brand",
    success: "button-success",
    plainInverted: "button-plain-inverted",
  },
  { svg: Ot } = Ae();
var It = wt(
  Ot`<g clip-path="url(#clip0_473_116)"><path d="M10 0a10 10 0 1010 10A10.011 10.011 0 0010 0zm3.832 12.418l-1.414 1.414L10 11.414l-2.418 2.418-1.414-1.414L8.586 10 6.168 7.582l1.414-1.414L10 8.586l2.418-2.418 1.414 1.414L11.414 10l2.418 2.418z"></path></g><defs><clipPath id="clip0_473_116"><path d="M0 0h20v20H0z"></path></clipPath></defs>`,
  "0 0 20 20",
  "clear-fill"
);
const { svg: Mt } = Ae();
var Pt = wt(
  Mt`<path d="M18.442 2.442l-.884-.884L10 9.116 2.442 1.558l-.884.884L9.116 10l-7.558 7.558.884.884L10 10.884l7.558 7.558.884-.884L10.884 10l7.558-7.558z"></path>`,
  "0 0 20 20",
  "close-outline"
);
const { svg: Dt } = Ae();
var Rt = wt(
  Dt`<path d="M18.628 6.73l-5.364-5.365a4.626 4.626 0 00-6.542 0L1.355 6.73a4.634 4.634 0 000 6.542l5.367 5.365a4.627 4.627 0 006.542 0l5.364-5.365a4.627 4.627 0 000-6.542zM11.162 5l-.28 6.747H9.117L8.837 5h2.325zm-.038 9.536a1.29 1.29 0 01-.462.472 1.24 1.24 0 01-.655.178 1.286 1.286 0 111.117-.65z"></path>`,
  "0 0 20 20",
  "spoiler-fill"
);
let Nt = class extends ht {
  constructor() {
    super(...arguments),
      (this.ariaLive = "polite"),
      (this.min = Ze.error),
      (this.max = Ze.success),
      (this._gesture = new vt(this, { mouseSupport: !0 })),
      (this._alertsCtrl = new gt(this, {
        batchWindow: 100,
        onAlert: (e) => {
          var t, n, i;
          const r = Object.assign(Object.assign({}, e), {
              meta: Object.assign({}, e.meta),
              namedContent: Object.assign({}, e.namedContent),
            }),
            { level: o, namedContent: s } = r;
          (null !== (t = s.action) && void 0 !== t) ||
            (s.action = (({
              attributes: e,
              children: t,
              size: n = _t.Medium,
              appearance: i = "secondary",
              selected: r,
              shape: o = "pill",
              leadingIcon: s,
              dropdown: a,
              ariaControls: c,
              screenReaderContent: l,
              role: u,
              hideChildrenOverflow: h,
            }) => {
              const { attrs: d, html: p, ifDefined: f } = Ae();
              let v = "label",
                m = "flex";
              s && t ? (v = "iconLabel") : t || (v = "icon"), (t || a) && (m += " mr-xs");
              const g = a ? kt : Et,
                y = "tab" === u ? (r ? "true" : "false") : void 0;
              return p` <button rpl ${d(e)} @click="${null == e ? void 0 : e.onclick}" aria-controls="${f(
                c
              )}" aria-selected="${f(y)}" role="${f(null != u ? u : void 0)}" class="${
                (null == e ? void 0 : e.className) || ""
              } ${n ? `${Ct[n]} ${g[n][v]}` : ""} ${i ? At[i] : ""} ${r ? "button-activated" : ""} ${
                "square" === o ? "rounded-[.5rem]" : ""
              } ${
                "icon" === v ? "icon" : ""
              } button flex items-center justify-center"> <span class="flex items-center justify-center ${
                h ? "overflow-hidden" : ""
              }"> ${s ? p`<span class="${m}"> ${s} </span>` : void 0} ${
                t ? p`<span class="${"flex items-center gap-xs"} ${h ? "overflow-hidden" : ""}"> ${t} </span>` : void 0
              } </span> ${
                a
                  ? p`<span class="inline-flex dropdown-icon ${t && "ml-2xs"}"> ${Tt({
                      size: n === _t.Small ? yt.Small : yt.Medium,
                    })} </span>`
                  : void 0
              } ${l ? p`<faceplate-screen-reader-content> ${l} </faceplate-screen-reader-content>` : ""} </button> `;
            })({ attributes: { onclick: () => a.dismiss() }, appearance: "plainInverted", leadingIcon: Pt() })),
            o === Ze.error && (s.icon = It({ size: yt.Large })),
            o === Ze.warning && (s.icon = Rt({ size: yt.Large }));
          const a = (function (e, t) {
            const { level: n, message: i, content: r, namedContent: o } = t,
              s = document.createElement("faceplate-toast");
            return (
              s.classList.add("theme-rpl"),
              n === Ze.success && s.setAttribute("type", dt.SUCCESS),
              bt(
                j` ${
                  (null == o ? void 0 : o.avatar) ? j`<div slot="avatar">${null == o ? void 0 : o.avatar}</div>` : ""
                } ${(null == o ? void 0 : o.icon) ? j`<div slot="icon">${null == o ? void 0 : o.icon}</div>` : ""} ${
                  null != r ? r : i
                } ${
                  (null == o ? void 0 : o.action) ? j`<div slot="action">${null == o ? void 0 : o.action}</div>` : ""
                } `,
                s,
                e
              ),
              s
            );
          })(this, r);
          o &&
            o >= Ze.warning &&
            o <= Ze.success &&
            window.setTimeout(
              () => {
                a.dismiss();
              },
              null !== (i = null === (n = r.meta) || void 0 === n ? void 0 : n.duration) && void 0 !== i ? i : 4e3
            ),
            this.appendChild(a);
        },
      }));
  }
  static get styles() {
    return o`:host{position:fixed}:host>slot{display:flex;flex-direction:column;gap:var(--spacer-md);align-items:center;position:fixed;left:50%;transform:translateX(-50%);padding:0 1rem;bottom:var(--rem16)}`;
  }
  connectedCallback() {
    super.connectedCallback(),
      (this._alertsCtrl.options.min = this.min),
      (this._alertsCtrl.options.max = this.max),
      this._gesture.on("swipeleft", this._onSwipe),
      this._gesture.on("swiperight", this._onSwipe);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._gesture.destroy();
  }
  _onSwipe(e) {
    if (e instanceof MouseEvent) return;
    const t = e.target instanceof HTMLElement ? e.target : null,
      n = null == t ? void 0 : t.closest("faceplate-toast");
    n instanceof ft && n.dismiss();
  }
  render() {
    return j`<slot></slot>`;
  }
};
function $t(e) {
  const t = [e];
  return (t.raw = t), o(t);
}
$e([Ue({ type: String, reflect: !0, attribute: "aria-live" })], Nt.prototype, "ariaLive", void 0),
  $e([Ue({ attribute: "min", converter: st })], Nt.prototype, "min", void 0),
  $e([Ue({ attribute: "max", converter: st })], Nt.prototype, "max", void 0),
  (Nt = $e([Fe("faceplate-toaster")], Nt));
const Lt = (e) => {
  const t = {
    state: e,
    listeners: [],
    getState: () => t.state,
    updateState: (e) => {
      t.state !== e && ((t.state = e), t.listeners.forEach((e) => e.requestUpdate()));
    },
    subscribe: (e) => (
      t.listeners.includes(e) || t.listeners.push(e),
      () => {
        const n = t.listeners.indexOf(e);
        t.listeners.splice(n, 1);
      }
    ),
    unsubscribe: (e) => {
      const n = t.listeners.indexOf(e);
      n >= 0 && t.listeners.splice(n, 1);
    },
  };
  return t;
};
var jt;
!(function (e) {
  (e.CX = "cx"),
    (e.CY = "cy"),
    (e.Debug = "debug"),
    (e.Edit = "edit"),
    (e.FullScreen = "fullscreen"),
    (e.PX = "px"),
    (e.ScreenMode = "screenmode"),
    (e.TS = "ts");
})(jt || (jt = {}));
const zt = 6e4,
  Ft = 36e5,
  Vt = zt,
  Ut = 1686862993045,
  Bt = 1686934982581,
  Ht = Bt - Math.ceil(1199.8256) * Vt,
  qt = 1500,
  Qt = 1e3;
var Gt;
function Wt(e, t) {
  const n = parseInt(e.searchParams.get(t) || "");
  return isFinite(n) ? n : void 0;
}
!(function (e) {
  (e.Preview = "preview"), (e.FullScreen = "fullscreen"), (e.PictureInPicture = "pip");
})(Gt || (Gt = {}));
function Yt() {
  const e = new URL(location.href);
  let t = !1,
    n = Gt.Preview;
  const i = ((e, t) => e.searchParams.get(t) || void 0)(e, jt.ScreenMode);
  return (
    i ? (t = i === Gt.FullScreen) : ((t = e.searchParams.has(jt.FullScreen)), (n = t ? Gt.FullScreen : Gt.Preview)),
    {
      cx: Wt(e, jt.CX),
      cy: Wt(e, jt.CY),
      debug: e.searchParams.has(jt.Debug),
      edit: e.searchParams.has(jt.Edit),
      fullscreen: t,
      px: Wt(e, jt.PX),
      screenmode: i || n,
      ts: Wt(e, jt.TS),
    }
  );
}
var Zt;
function Xt() {
  return { min: sn.getState() ? Zt.FarOut : Zt.Min, max: Zt.Max };
}
!(function (e) {
  (e[(e.FarOut = 0.12)] = "FarOut"),
    (e[(e.Min = 1)] = "Min"),
    (e[(e.Radar = 10)] = "Radar"),
    (e[(e.Optimal = 20)] = "Optimal"),
    (e[(e.Max = 50)] = "Max");
})(Zt || (Zt = {}));
const Kt = Lt({ authHeaders: !1, camera: !1, canvas: !1, cooldown: !1 });
function Jt() {
  return Object.values(Kt.getState()).every((e) => e);
}
const en = Yt(),
  tn = Lt(en.fullscreen),
  nn = Lt(!1),
  rn = Lt(null),
  on = Lt(null),
  sn = Lt(!1),
  an = Lt(en.screenmode),
  cn = Lt(-1),
  ln = Lt(-1),
  un = Lt(-1),
  hn = Lt(Zt.Min),
  dn = Lt(1686934982581),
  pn = Lt([]),
  fn = Lt(!0);
function vn(e) {
  return function (...t) {
    if (an.getState() === Gt.FullScreen) return e(...t);
  };
}
const mn = Lt({
    colorPalette: { colors: [] },
    canvasConfigurations: [],
    activeZone: { topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 } },
    canvasHeight: 0,
    canvasWidth: 0,
    adminConfiguration: { maxAllowedCircles: Number.MAX_SAFE_INTEGER, maxUsersPerAdminBan: Number.MAX_SAFE_INTEGER },
  }),
  gn = Lt(0),
  yn = Lt(0),
  bn = Lt(!1),
  xn = Lt([]),
  wn = Lt(null),
  Sn = Lt([]),
  _n = Lt({});
class Tn {
  constructor(e, t) {
    (this.host = e), (this.globalState = t), (this.host = e), (this.globalState = t), e.addController(this);
  }
  hostConnected() {
    this.globalState.subscribe(this.host);
  }
  hostDisconnected() {
    this.globalState.unsubscribe(this.host);
  }
  state(e) {
    if (null == e) return this.globalState.getState();
    this.globalState.updateState(e);
  }
}
const Cn = (e, t) => new Tn(e, t),
  En = (e, t) => navigator.sendBeacon(e, t),
  kn = (e, t) => fetch(e, { body: t, headers: { "Content-Type": "text/plain" }, keepalive: !0, method: "POST" }),
  An = (e) => {
    const t = "function" == typeof navigator.sendBeacon ? En : "function" == typeof fetch ? kn : void 0;
    void 0 !== t && t("/svc/garlic-bread/v2j", JSON.stringify(e));
  };
let On,
  In = [];
function Mn() {
  An([...In]), Pn();
}
function Pn() {
  (In = []), On && clearTimeout(On), (On = void 0);
}
function Dn(e) {
  var t, n;
  if ("number" == typeof e)
    return null ===
      (n = null === (t = mn.getState()) || void 0 === t ? void 0 : t.colorPalette.colors.find((t) => t.index === e)) ||
      void 0 === n
      ? void 0
      : n.hex;
}
const Rn = {
  0: () => "burgundy",
  1: () => "dark red",
  2: () => "red",
  3: () => "orange",
  4: () => "yellow",
  5: () => "pale yellow",
  6: () => "dark green",
  7: () => "green",
  8: () => "light green",
  9: () => "dark teal",
  10: () => "teal",
  11: () => "light teal",
  12: () => "dark blue",
  13: () => "blue",
  14: () => "light blue",
  15: () => "indigo",
  16: () => "periwinkle",
  17: () => "lavender",
  18: () => "dark purple",
  19: () => "purple",
  20: () => "pale purple",
  21: () => "magenta",
  22: () => "pink",
  23: () => "light pink",
  24: () => "dark brown",
  25: () => "brown",
  26: () => "beige",
  27: () => "black",
  28: () => "dark gray",
  29: () => "gray",
  30: () => "light gray",
  31: () => "white",
};
function Nn(e) {
  const t = e.toLowerCase();
  return "#fff" === t || "#ffffff" === t;
}
function $n(e) {
  return e.toString(16).padStart(2, "0");
}
var Ln,
  jn = new Uint8Array(16);
function zn() {
  if (
    !Ln &&
    !(Ln =
      ("undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
      ("undefined" != typeof msCrypto &&
        "function" == typeof msCrypto.getRandomValues &&
        msCrypto.getRandomValues.bind(msCrypto)))
  )
    throw new Error(
      "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
    );
  return Ln(jn);
}
var Fn =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
for (var Vn = [], Un = 0; Un < 256; ++Un) Vn.push((Un + 256).toString(16).substr(1));
function Bn(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
    n = (
      Vn[e[t + 0]] +
      Vn[e[t + 1]] +
      Vn[e[t + 2]] +
      Vn[e[t + 3]] +
      "-" +
      Vn[e[t + 4]] +
      Vn[e[t + 5]] +
      "-" +
      Vn[e[t + 6]] +
      Vn[e[t + 7]] +
      "-" +
      Vn[e[t + 8]] +
      Vn[e[t + 9]] +
      "-" +
      Vn[e[t + 10]] +
      Vn[e[t + 11]] +
      Vn[e[t + 12]] +
      Vn[e[t + 13]] +
      Vn[e[t + 14]] +
      Vn[e[t + 15]]
    ).toLowerCase();
  if (
    !(function (e) {
      return "string" == typeof e && Fn.test(e);
    })(n)
  )
    throw TypeError("Stringified UUID is invalid");
  return n;
}
function Hn(e, t, n) {
  var i = (e = e || {}).random || (e.rng || zn)();
  if (((i[6] = (15 & i[6]) | 64), (i[8] = (63 & i[8]) | 128), t)) {
    n = n || 0;
    for (var r = 0; r < 16; ++r) t[n + r] = i[r];
    return t;
  }
  return Bn(i);
}
var qn =
  "undefined" != typeof globalThis
    ? globalThis
    : "undefined" != typeof window
    ? window
    : "undefined" != typeof global
    ? global
    : "undefined" != typeof self
    ? self
    : {};
function Qn(e) {
  if (e.__esModule) return e;
  var t = Object.defineProperty({}, "__esModule", { value: !0 });
  return (
    Object.keys(e).forEach(function (n) {
      var i = Object.getOwnPropertyDescriptor(e, n);
      Object.defineProperty(
        t,
        n,
        i.get
          ? i
          : {
              enumerable: !0,
              get: function () {
                return e[n];
              },
            }
      );
    }),
    t
  );
}
function Gn(e) {
  var t = { exports: {} };
  return e(t, t.exports), t.exports;
}
var Wn = Gn(function (e, t) {
  var n;
  (n = function () {
    function e() {
      for (var e = 0, t = {}; e < arguments.length; e++) {
        var n = arguments[e];
        for (var i in n) t[i] = n[i];
      }
      return t;
    }
    function t(e) {
      return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
    }
    return (function n(i) {
      function r() {}
      function o(t, n, o) {
        if ("undefined" != typeof document) {
          "number" == typeof (o = e({ path: "/" }, r.defaults, o)).expires &&
            (o.expires = new Date(1 * new Date() + 864e5 * o.expires)),
            (o.expires = o.expires ? o.expires.toUTCString() : "");
          try {
            var s = JSON.stringify(n);
            /^[\{\[]/.test(s) && (n = s);
          } catch (e) {}
          (n = i.write
            ? i.write(n, t)
            : encodeURIComponent(String(n)).replace(
                /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
                decodeURIComponent
              )),
            (t = encodeURIComponent(String(t))
              .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
              .replace(/[\(\)]/g, escape));
          var a = "";
          for (var c in o) o[c] && ((a += "; " + c), !0 !== o[c] && (a += "=" + o[c].split(";")[0]));
          return (document.cookie = t + "=" + n + a);
        }
      }
      function s(e, n) {
        if ("undefined" != typeof document) {
          for (var r = {}, o = document.cookie ? document.cookie.split("; ") : [], s = 0; s < o.length; s++) {
            var a = o[s].split("="),
              c = a.slice(1).join("=");
            n || '"' !== c.charAt(0) || (c = c.slice(1, -1));
            try {
              var l = t(a[0]);
              if (((c = (i.read || i)(c, l) || t(c)), n))
                try {
                  c = JSON.parse(c);
                } catch (e) {}
              if (((r[l] = c), e === l)) break;
            } catch (e) {}
          }
          return e ? r[e] : r;
        }
      }
      return (
        (r.set = o),
        (r.get = function (e) {
          return s(e, !1);
        }),
        (r.getJSON = function (e) {
          return s(e, !0);
        }),
        (r.remove = function (t, n) {
          o(t, "", e(n, { expires: -1 }));
        }),
        (r.defaults = {}),
        (r.withConverter = n),
        r
      );
    })(function () {});
  }),
    (e.exports = n());
});
var Yn, Zn;
!(function (e) {
  (e.RefreshAuth = "refreshAuth"),
    (e.Close = "close"),
    (e.Share = "share"),
    (e.SignIn = "signIn"),
    (e.SyncCoordinates = "syncCoordinates"),
    (e.OpenProfile = "openProfile"),
    (e.VerifyAccount = "verifyAccount"),
    (e.ShowPNPopup = "showPNPopup"),
    (e.TogglePip = "togglePip"),
    (e.ToggleSound = "toggleSound"),
    (e.NavigateToDeeplink = "navigateToDeeplink");
})(Yn || (Yn = {})),
  (function (e) {
    (e.SetFullScreen = "setFullScreen"),
      (e.InjectAuthHeaders = "injectAuthHeaders"),
      (e.InjectTelemetryDefaults = "injectTelemetryDefaults"),
      (e.SetScreenMode = "setScreenMode");
  })(Zn || (Zn = {}));
class Xn {
  close() {
    throw new Error("Not implemented");
  }
  refreshAuth() {
    throw new Error("Not implemented");
  }
  signIn(e) {
    throw new Error("Not implemented");
  }
  share(e) {
    throw new Error("Not implemented");
  }
  syncCoordinates(e) {}
  openProfile(e) {
    throw new Error("Not implemented");
  }
  verifyAccount() {
    throw new Error("Not implemented");
  }
  showPNPopup() {
    throw new Error("Not implemented");
  }
  togglePip() {
    throw new Error("Not implemented");
  }
  toggleSound(e) {
    throw new Error("Not implemented");
  }
  navigateToDeeplink(e) {
    throw new Error("Not implemented");
  }
}
class Kn extends Xn {
  get host() {
    return window.garlic_bread_native;
  }
  close() {
    this.host.close();
  }
  refreshAuth() {
    this.host.refreshAuth();
  }
  signIn() {
    this.host.signIn();
  }
  share({ mode: e, fileName: t, fileData: n, url: i }) {
    this.host.share(e, t, n, i);
  }
  openProfile({ profileName: e }) {
    this.host.openProfile(e);
  }
  verifyAccount() {
    this.host.verifyAccount();
  }
  showPNPopup() {
    this.host.showPNPopup();
  }
  togglePip() {
    this.host.togglePip();
  }
  toggleSound({ isOn: e }) {
    this.host.toggleSound(e);
  }
  navigateToDeeplink({ link: e }) {
    this.host.navigateToDeeplink(e);
  }
}
class Jn extends Xn {
  sendMessage(e) {
    window.webkit.messageHandlers.callbackHandler.postMessage(e);
  }
  close() {
    this.sendMessage(Yn.Close);
  }
  refreshAuth() {
    this.sendMessage(Yn.RefreshAuth);
  }
  signIn() {
    this.sendMessage(Yn.SignIn);
  }
  share(e) {
    this.sendMessage(
      JSON.stringify({ type: Yn.Share, fileName: e.fileName, fileData: e.fileData, mode: e.mode, url: e.url })
    );
  }
  openProfile({ profileName: e }) {
    this.sendMessage(JSON.stringify({ type: Yn.OpenProfile, userName: e }));
  }
  verifyAccount() {
    this.sendMessage(Yn.VerifyAccount);
  }
  showPNPopup() {
    this.sendMessage(Yn.ShowPNPopup);
  }
  togglePip() {
    this.sendMessage(Yn.TogglePip);
  }
  toggleSound({ isOn: e }) {
    this.sendMessage(JSON.stringify({ type: Yn.ToggleSound, isOn: e }));
  }
  navigateToDeeplink({ link: e }) {
    this.sendMessage(JSON.stringify({ type: Yn.NavigateToDeeplink, link: e }));
  }
}
class ei extends Xn {
  sendMessage(e) {
    const t = (function () {
      const e = parent !== window ? document.referrer : document.location.origin,
        t = e.endsWith("/") ? e.slice(0, -1) : e;
      return /^https:\/\/[\w\d-.]+\.snoo\.dev$/.test(t)
        ? "*"
        : t.startsWith("https://new.reddit.com")
        ? t
        : CLIENT_CONFIG.REDDIT_MESSAGE_TARGET;
    })();
    window.parent.postMessage(e, t);
  }
  close() {
    this.sendMessage({ type: Yn.Close });
  }
  refreshAuth() {
    this.sendMessage({ type: Yn.RefreshAuth });
  }
  signIn(e) {
    this.sendMessage({ type: Yn.SignIn, dest: e });
  }
  syncCoordinates(e) {
    this.sendMessage({ type: Yn.SyncCoordinates, data: e });
  }
  openProfile(e) {
    this.sendMessage({ type: Yn.OpenProfile, data: e });
  }
  verifyAccount() {
    this.sendMessage({ type: Yn.VerifyAccount });
  }
  showPNPopup() {
    this.sendMessage({ type: Yn.ShowPNPopup });
  }
  togglePip() {}
  toggleSound(e) {}
  navigateToDeeplink(e) {
    this.sendMessage({ type: Yn.NavigateToDeeplink, data: e });
  }
}
function ti() {
  return !!window.garlic_bread_native;
}
function ni() {
  var e, t, n;
  return (
    void 0 !==
    (null ===
      (n =
        null === (t = null === (e = window.webkit) || void 0 === e ? void 0 : e.messageHandlers) || void 0 === t
          ? void 0
          : t.callbackHandler) || void 0 === n
      ? void 0
      : n.postMessage)
  );
}
function ii() {
  return ti() || ni();
}
const ri = ti() ? new Kn() : ni() ? new Jn() : window.parent !== window ? new ei() : void 0,
  oi = () => {
    const e = Wn.get("session_tracker"),
      { domain: t, url: n } = ai();
    return Object.assign(
      Object.assign(
        {},
        ((e = "") => {
          const t = e.split(".");
          return { id: t[0], created_timestamp: parseInt(t[2], 10) };
        })(e)
      ),
      { referrer_domain: t, referrer_url: n }
    );
  },
  si = () => {
    const e = Wn.get("loid"),
      t =
        e &&
        ((e = "") => {
          let t = "",
            n = "";
          const i = e.split(".");
          i.length >= 3 && ((t = `t2_${i[0].replace(/\b0+/g, "")}`), (n = i[2]));
          return { id: t, cookie_created_timestamp: parseInt(n, 10) };
        })(e),
      n = rn.getState(),
      i = n && { id: n.id, logged_in: n.canParticipate };
    return Object.assign(Object.assign({}, t), i);
  },
  ai = () => {
    const e = document.referrer;
    let t = "";
    if (e) {
      t = new URL(document.referrer).hostname;
    }
    return { url: e, domain: t };
  },
  ci = () => {
    const { hostname: e, origin: t, pathname: n, search: i } = window.location,
      r = `${t}${n}`;
    return { base_url: i ? `${r}${i}` : r, domain: e, user_agent: window.navigator.userAgent };
  },
  li = ({ source: e, action: t, noun: n }, i = {}) =>
    Object.assign(
      Object.assign(
        { source: e, action: t, noun: n, uuid: Hn(), request: ci() },
        (() => {
          const e = on.getState() || {},
            { app: t } = e,
            n = Ne(e, ["app"]);
          return Object.assign(Object.assign({}, n), {
            client_timestamp: Date.now(),
            app: Object.assign(Object.assign({}, t), {
              name: (null == t ? void 0 : t.name) || (ni() && "ios") || (ti() && "android") || "garlic-bread",
            }),
            referrer: n.referrer || ai(),
            session: n.session || oi(),
            user: n.user || si(),
          });
        })()
      ),
      i
    );
var ui, hi, di;
!(function (e) {
  (e.Global = "global"), (e.GarlicBread = "garlic_bread");
})(ui || (ui = {})),
  (function (e) {
    (e.Click = "click"),
      (e.Complete = "complete"),
      (e.Left = "left"),
      (e.View = "view"),
      (e.Set = "set"),
      (e.Update = "update"),
      (e.Delete = "delete"),
      (e.Load = "load");
  })(hi || (hi = {})),
  (function (e) {
    (e.Pixel = "pixel"),
      (e.Screen = "screen"),
      (e.Share = "share"),
      (e.Submit = "submit"),
      (e.Tutorial = "tutorial"),
      (e.Username = "username"),
      (e.Rectangle = "rectangle"),
      (e.Circle = "circle"),
      (e.AdminBan = "admin_ban"),
      (e.CommunityPin = "community_pin"),
      (e.Sonar = "sonar");
  })(di || (di = {}));
const pi = (e, t, n) =>
    li(
      { source: ui.GarlicBread, action: hi.Click, noun: di.Circle },
      { action_info: { setting_value: `x: ${e}, y: ${t}, r: ${n}` } }
    ),
  fi = Symbol("mixins/with-tracking");
function vi(e) {
  if (fi in e) return e;
  class t extends e {
    constructor() {
      super(...arguments),
        (this.trackEvent = (e) => {
          const t = Ye("track-event", { details: e });
          this.dispatchEvent(t);
        });
    }
  }
  return (t[fi] = !0), t;
}
const mi = vi(se);
let gi = class extends mi {
  constructor() {
    super(),
      (this.debug = !1),
      (this.routeName = ""),
      (this.screenMode = Cn(this, an)),
      (this._events = new ut(this)),
      (this._trackEvent = this._events.define("track-event", (e) => {
        const t = e.detail.details;
        var n;
        (n = t),
          In.push(n),
          ((e) => {
            if (!e) return !1;
            const { source: t, action: n, noun: i } = e;
            return "global__view__screen" == `${t}__${n}__${i}`;
          })(n) || In.length >= 40
            ? Mn()
            : On || (On = setTimeout(() => Mn(), 3e3));
      })),
      (this._onPageHide = () => {
        !(function (e) {
          const t = [...In, ...(e || [])];
          An(t), Pn();
        })([
          li({ source: ui.Global, action: hi.Left, noun: di.Screen }, { action_info: { page_type: "place_editor" } }),
        ]);
      }),
      Cn(this, Kt);
  }
  static get styles() {
    return $t(
      "header {\n  padding-left: calc(50vw - 50%);\n  padding-right: calc(50vw - 50%);\n  margin-left: calc(0px - (50vw - 50%));\n  margin-right: calc(0px - (50vw - 50%));\n  padding-top: var(--faceplate-body-padding);\n  padding-bottom: var(--faceplate-body-padding);\n  margin-top: calc(-1 * var(--faceplate-body-padding));\n  margin-bottom: var(--faceplate-body-padding);\n  background: var(--color-tone-6);\n  font-size: 18px;\n  font-weight: 700;\n  background-color: var(--color-tone-5);\n  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);\n  margin: 0;\n  padding: 0 16px;\n  height: 60px;\n  line-height: 60px;\n}\n"
    );
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("pagehide", this._onPageHide);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("pagehide", this._onPageHide);
  }
  updated(e) {
    this.screenMode.state() === Gt.FullScreen &&
      Jt() &&
      this.trackEvent(
        li({ source: ui.Global, action: hi.View, noun: di.Screen }, { action_info: { page_type: "place_editor" } })
      ),
      super.updated(e);
  }
  render() {
    return j` <slot></slot> `;
  }
};
$e([Ue({ type: Boolean })], gi.prototype, "debug", void 0),
  $e([Ue({ type: String })], gi.prototype, "routeName", void 0),
  (gi = $e([Fe("garlic-bread-app")], gi));
var yi = xi,
  bi = xi;
function xi(e, t, n) {
  n = n || 2;
  var i,
    r,
    o,
    s,
    a,
    c,
    l,
    u = t && t.length,
    h = u ? t[0] * n : e.length,
    d = wi(e, 0, h, n, !0),
    p = [];
  if (!d || d.next === d.prev) return p;
  if (
    (u &&
      (d = (function (e, t, n, i) {
        var r,
          o,
          s,
          a = [];
        for (r = 0, o = t.length; r < o; r++)
          (s = wi(e, t[r] * i, r < o - 1 ? t[r + 1] * i : e.length, i, !1)) === s.next && (s.steiner = !0),
            a.push(Pi(s));
        for (a.sort(Ai), r = 0; r < a.length; r++) n = Oi(a[r], n);
        return n;
      })(e, t, d, n)),
    e.length > 80 * n)
  ) {
    (i = o = e[0]), (r = s = e[1]);
    for (var f = n; f < h; f += n)
      (a = e[f]) < i && (i = a), (c = e[f + 1]) < r && (r = c), a > o && (o = a), c > s && (s = c);
    l = 0 !== (l = Math.max(o - i, s - r)) ? 32767 / l : 0;
  }
  return _i(d, p, n, i, r, l, 0), p;
}
function wi(e, t, n, i, r) {
  var o, s;
  if (r === qi(e, t, n, i) > 0) for (o = t; o < n; o += i) s = Ui(o, e[o], e[o + 1], s);
  else for (o = n - i; o >= t; o -= i) s = Ui(o, e[o], e[o + 1], s);
  return s && $i(s, s.next) && (Bi(s), (s = s.next)), s;
}
function Si(e, t) {
  if (!e) return e;
  t || (t = e);
  var n,
    i = e;
  do {
    if (((n = !1), i.steiner || (!$i(i, i.next) && 0 !== Ni(i.prev, i, i.next)))) i = i.next;
    else {
      if ((Bi(i), (i = t = i.prev) === i.next)) break;
      n = !0;
    }
  } while (n || i !== t);
  return t;
}
function _i(e, t, n, i, r, o, s) {
  if (e) {
    !s &&
      o &&
      (function (e, t, n, i) {
        var r = e;
        do {
          0 === r.z && (r.z = Mi(r.x, r.y, t, n, i)), (r.prevZ = r.prev), (r.nextZ = r.next), (r = r.next);
        } while (r !== e);
        (r.prevZ.nextZ = null),
          (r.prevZ = null),
          (function (e) {
            var t,
              n,
              i,
              r,
              o,
              s,
              a,
              c,
              l = 1;
            do {
              for (n = e, e = null, o = null, s = 0; n; ) {
                for (s++, i = n, a = 0, t = 0; t < l && (a++, (i = i.nextZ)); t++);
                for (c = l; a > 0 || (c > 0 && i); )
                  0 !== a && (0 === c || !i || n.z <= i.z)
                    ? ((r = n), (n = n.nextZ), a--)
                    : ((r = i), (i = i.nextZ), c--),
                    o ? (o.nextZ = r) : (e = r),
                    (r.prevZ = o),
                    (o = r);
                n = i;
              }
              (o.nextZ = null), (l *= 2);
            } while (s > 1);
          })(r);
      })(e, i, r, o);
    for (var a, c, l = e; e.prev !== e.next; )
      if (((a = e.prev), (c = e.next), o ? Ci(e, i, r, o) : Ti(e)))
        t.push((a.i / n) | 0), t.push((e.i / n) | 0), t.push((c.i / n) | 0), Bi(e), (e = c.next), (l = c.next);
      else if ((e = c) === l) {
        s
          ? 1 === s
            ? _i((e = Ei(Si(e), t, n)), t, n, i, r, o, 2)
            : 2 === s && ki(e, t, n, i, r, o)
          : _i(Si(e), t, n, i, r, o, 1);
        break;
      }
  }
}
function Ti(e) {
  var t = e.prev,
    n = e,
    i = e.next;
  if (Ni(t, n, i) >= 0) return !1;
  for (
    var r = t.x,
      o = n.x,
      s = i.x,
      a = t.y,
      c = n.y,
      l = i.y,
      u = r < o ? (r < s ? r : s) : o < s ? o : s,
      h = a < c ? (a < l ? a : l) : c < l ? c : l,
      d = r > o ? (r > s ? r : s) : o > s ? o : s,
      p = a > c ? (a > l ? a : l) : c > l ? c : l,
      f = i.next;
    f !== t;

  ) {
    if (f.x >= u && f.x <= d && f.y >= h && f.y <= p && Di(r, a, o, c, s, l, f.x, f.y) && Ni(f.prev, f, f.next) >= 0)
      return !1;
    f = f.next;
  }
  return !0;
}
function Ci(e, t, n, i) {
  var r = e.prev,
    o = e,
    s = e.next;
  if (Ni(r, o, s) >= 0) return !1;
  for (
    var a = r.x,
      c = o.x,
      l = s.x,
      u = r.y,
      h = o.y,
      d = s.y,
      p = a < c ? (a < l ? a : l) : c < l ? c : l,
      f = u < h ? (u < d ? u : d) : h < d ? h : d,
      v = a > c ? (a > l ? a : l) : c > l ? c : l,
      m = u > h ? (u > d ? u : d) : h > d ? h : d,
      g = Mi(p, f, t, n, i),
      y = Mi(v, m, t, n, i),
      b = e.prevZ,
      x = e.nextZ;
    b && b.z >= g && x && x.z <= y;

  ) {
    if (
      b.x >= p &&
      b.x <= v &&
      b.y >= f &&
      b.y <= m &&
      b !== r &&
      b !== s &&
      Di(a, u, c, h, l, d, b.x, b.y) &&
      Ni(b.prev, b, b.next) >= 0
    )
      return !1;
    if (
      ((b = b.prevZ),
      x.x >= p &&
        x.x <= v &&
        x.y >= f &&
        x.y <= m &&
        x !== r &&
        x !== s &&
        Di(a, u, c, h, l, d, x.x, x.y) &&
        Ni(x.prev, x, x.next) >= 0)
    )
      return !1;
    x = x.nextZ;
  }
  for (; b && b.z >= g; ) {
    if (
      b.x >= p &&
      b.x <= v &&
      b.y >= f &&
      b.y <= m &&
      b !== r &&
      b !== s &&
      Di(a, u, c, h, l, d, b.x, b.y) &&
      Ni(b.prev, b, b.next) >= 0
    )
      return !1;
    b = b.prevZ;
  }
  for (; x && x.z <= y; ) {
    if (
      x.x >= p &&
      x.x <= v &&
      x.y >= f &&
      x.y <= m &&
      x !== r &&
      x !== s &&
      Di(a, u, c, h, l, d, x.x, x.y) &&
      Ni(x.prev, x, x.next) >= 0
    )
      return !1;
    x = x.nextZ;
  }
  return !0;
}
function Ei(e, t, n) {
  var i = e;
  do {
    var r = i.prev,
      o = i.next.next;
    !$i(r, o) &&
      Li(r, i, i.next, o) &&
      Fi(r, o) &&
      Fi(o, r) &&
      (t.push((r.i / n) | 0), t.push((i.i / n) | 0), t.push((o.i / n) | 0), Bi(i), Bi(i.next), (i = e = o)),
      (i = i.next);
  } while (i !== e);
  return Si(i);
}
function ki(e, t, n, i, r, o) {
  var s = e;
  do {
    for (var a = s.next.next; a !== s.prev; ) {
      if (s.i !== a.i && Ri(s, a)) {
        var c = Vi(s, a);
        return (s = Si(s, s.next)), (c = Si(c, c.next)), _i(s, t, n, i, r, o, 0), void _i(c, t, n, i, r, o, 0);
      }
      a = a.next;
    }
    s = s.next;
  } while (s !== e);
}
function Ai(e, t) {
  return e.x - t.x;
}
function Oi(e, t) {
  var n = (function (e, t) {
    var n,
      i = t,
      r = e.x,
      o = e.y,
      s = -1 / 0;
    do {
      if (o <= i.y && o >= i.next.y && i.next.y !== i.y) {
        var a = i.x + ((o - i.y) * (i.next.x - i.x)) / (i.next.y - i.y);
        if (a <= r && a > s && ((s = a), (n = i.x < i.next.x ? i : i.next), a === r)) return n;
      }
      i = i.next;
    } while (i !== t);
    if (!n) return null;
    var c,
      l = n,
      u = n.x,
      h = n.y,
      d = 1 / 0;
    i = n;
    do {
      r >= i.x &&
        i.x >= u &&
        r !== i.x &&
        Di(o < h ? r : s, o, u, h, o < h ? s : r, o, i.x, i.y) &&
        ((c = Math.abs(o - i.y) / (r - i.x)),
        Fi(i, e) && (c < d || (c === d && (i.x > n.x || (i.x === n.x && Ii(n, i))))) && ((n = i), (d = c))),
        (i = i.next);
    } while (i !== l);
    return n;
  })(e, t);
  if (!n) return t;
  var i = Vi(n, e);
  return Si(i, i.next), Si(n, n.next);
}
function Ii(e, t) {
  return Ni(e.prev, e, t.prev) < 0 && Ni(t.next, e, e.next) < 0;
}
function Mi(e, t, n, i, r) {
  return (
    (e =
      1431655765 &
      ((e =
        858993459 & ((e = 252645135 & ((e = 16711935 & ((e = ((e - n) * r) | 0) | (e << 8))) | (e << 4))) | (e << 2))) |
        (e << 1))) |
    ((t =
      1431655765 &
      ((t =
        858993459 & ((t = 252645135 & ((t = 16711935 & ((t = ((t - i) * r) | 0) | (t << 8))) | (t << 4))) | (t << 2))) |
        (t << 1))) <<
      1)
  );
}
function Pi(e) {
  var t = e,
    n = e;
  do {
    (t.x < n.x || (t.x === n.x && t.y < n.y)) && (n = t), (t = t.next);
  } while (t !== e);
  return n;
}
function Di(e, t, n, i, r, o, s, a) {
  return (
    (r - s) * (t - a) >= (e - s) * (o - a) &&
    (e - s) * (i - a) >= (n - s) * (t - a) &&
    (n - s) * (o - a) >= (r - s) * (i - a)
  );
}
function Ri(e, t) {
  return (
    e.next.i !== t.i &&
    e.prev.i !== t.i &&
    !(function (e, t) {
      var n = e;
      do {
        if (n.i !== e.i && n.next.i !== e.i && n.i !== t.i && n.next.i !== t.i && Li(n, n.next, e, t)) return !0;
        n = n.next;
      } while (n !== e);
      return !1;
    })(e, t) &&
    ((Fi(e, t) &&
      Fi(t, e) &&
      (function (e, t) {
        var n = e,
          i = !1,
          r = (e.x + t.x) / 2,
          o = (e.y + t.y) / 2;
        do {
          n.y > o != n.next.y > o &&
            n.next.y !== n.y &&
            r < ((n.next.x - n.x) * (o - n.y)) / (n.next.y - n.y) + n.x &&
            (i = !i),
            (n = n.next);
        } while (n !== e);
        return i;
      })(e, t) &&
      (Ni(e.prev, e, t.prev) || Ni(e, t.prev, t))) ||
      ($i(e, t) && Ni(e.prev, e, e.next) > 0 && Ni(t.prev, t, t.next) > 0))
  );
}
function Ni(e, t, n) {
  return (t.y - e.y) * (n.x - t.x) - (t.x - e.x) * (n.y - t.y);
}
function $i(e, t) {
  return e.x === t.x && e.y === t.y;
}
function Li(e, t, n, i) {
  var r = zi(Ni(e, t, n)),
    o = zi(Ni(e, t, i)),
    s = zi(Ni(n, i, e)),
    a = zi(Ni(n, i, t));
  return (
    (r !== o && s !== a) ||
    !(0 !== r || !ji(e, n, t)) ||
    !(0 !== o || !ji(e, i, t)) ||
    !(0 !== s || !ji(n, e, i)) ||
    !(0 !== a || !ji(n, t, i))
  );
}
function ji(e, t, n) {
  return (
    t.x <= Math.max(e.x, n.x) && t.x >= Math.min(e.x, n.x) && t.y <= Math.max(e.y, n.y) && t.y >= Math.min(e.y, n.y)
  );
}
function zi(e) {
  return e > 0 ? 1 : e < 0 ? -1 : 0;
}
function Fi(e, t) {
  return Ni(e.prev, e, e.next) < 0
    ? Ni(e, t, e.next) >= 0 && Ni(e, e.prev, t) >= 0
    : Ni(e, t, e.prev) < 0 || Ni(e, e.next, t) < 0;
}
function Vi(e, t) {
  var n = new Hi(e.i, e.x, e.y),
    i = new Hi(t.i, t.x, t.y),
    r = e.next,
    o = t.prev;
  return (
    (e.next = t), (t.prev = e), (n.next = r), (r.prev = n), (i.next = n), (n.prev = i), (o.next = i), (i.prev = o), i
  );
}
function Ui(e, t, n, i) {
  var r = new Hi(e, t, n);
  return i ? ((r.next = i.next), (r.prev = i), (i.next.prev = r), (i.next = r)) : ((r.prev = r), (r.next = r)), r;
}
function Bi(e) {
  (e.next.prev = e.prev),
    (e.prev.next = e.next),
    e.prevZ && (e.prevZ.nextZ = e.nextZ),
    e.nextZ && (e.nextZ.prevZ = e.prevZ);
}
function Hi(e, t, n) {
  (this.i = e),
    (this.x = t),
    (this.y = n),
    (this.prev = null),
    (this.next = null),
    (this.z = 0),
    (this.prevZ = null),
    (this.nextZ = null),
    (this.steiner = !1);
}
function qi(e, t, n, i) {
  for (var r = 0, o = t, s = n - i; o < n; o += i) (r += (e[s] - e[o]) * (e[o + 1] + e[s + 1])), (s = o);
  return r;
}
function Qi(e, t, n, i) {
  var r,
    o = !1,
    s = 0;
  function a() {
    r && clearTimeout(r);
  }
  function c() {
    for (var c = arguments.length, l = new Array(c), u = 0; u < c; u++) l[u] = arguments[u];
    var h = this,
      d = Date.now() - s;
    function p() {
      (s = Date.now()), n.apply(h, l);
    }
    o ||
      (i && !r && p(),
      a(),
      void 0 === i && d > e
        ? p()
        : !0 !== t &&
          (r = setTimeout(
            i
              ? function () {
                  r = void 0;
                }
              : p,
            void 0 === i ? e - d : e
          )));
  }
  return (
    "boolean" != typeof t && ((i = n), (n = t), (t = void 0)),
    (c.cancel = function () {
      a(), (o = !0);
    }),
    c
  );
}
function Gi(e, t, n) {
  return void 0 === n ? Qi(e, t, !1) : Qi(e, n, !1 !== t);
}
(xi.deviation = function (e, t, n, i) {
  var r = t && t.length,
    o = r ? t[0] * n : e.length,
    s = Math.abs(qi(e, 0, o, n));
  if (r)
    for (var a = 0, c = t.length; a < c; a++) {
      var l = t[a] * n,
        u = a < c - 1 ? t[a + 1] * n : e.length;
      s -= Math.abs(qi(e, l, u, n));
    }
  var h = 0;
  for (a = 0; a < i.length; a += 3) {
    var d = i[a] * n,
      p = i[a + 1] * n,
      f = i[a + 2] * n;
    h += Math.abs((e[d] - e[f]) * (e[p + 1] - e[d + 1]) - (e[d] - e[p]) * (e[f + 1] - e[d + 1]));
  }
  return 0 === s && 0 === h ? 0 : Math.abs((h - s) / s);
}),
  (xi.flatten = function (e) {
    for (var t = e[0][0].length, n = { vertices: [], holes: [], dimensions: t }, i = 0, r = 0; r < e.length; r++) {
      for (var o = 0; o < e[r].length; o++) for (var s = 0; s < t; s++) n.vertices.push(e[r][o][s]);
      r > 0 && ((i += e[r - 1].length), n.holes.push(i));
    }
    return n;
  }),
  (yi.default = bi);
class Wi extends Event {
  constructor(e, t, n) {
    super("context-request", { bubbles: !0, composed: !0 }),
      (this.context = e),
      (this.callback = t),
      (this.subscribe = n);
  }
}
class Yi {
  constructor(e, t, n, i) {
    var r;
    if (
      ((this.subscribe = !1),
      (this.provided = !1),
      (this.value = void 0),
      (this.t = (e, t) => {
        this.unsubscribe &&
          (this.unsubscribe !== t && ((this.provided = !1), this.unsubscribe()), this.subscribe || this.unsubscribe()),
          (this.value = e),
          this.host.requestUpdate(),
          (this.provided && !this.subscribe) || ((this.provided = !0), this.callback && this.callback(e, t)),
          (this.unsubscribe = t);
      }),
      (this.host = e),
      void 0 !== t.context)
    ) {
      const e = t;
      (this.context = e.context),
        (this.callback = e.callback),
        (this.subscribe = null !== (r = e.subscribe) && void 0 !== r && r);
    } else (this.context = t), (this.callback = n), (this.subscribe = null != i && i);
    this.host.addController(this);
  }
  hostConnected() {
    this.dispatchRequest();
  }
  hostDisconnected() {
    this.unsubscribe && (this.unsubscribe(), (this.unsubscribe = void 0));
  }
  dispatchRequest() {
    this.host.dispatchEvent(new Wi(this.context, this.t, this.subscribe));
  }
}
class Zi {
  constructor(e) {
    (this.callbacks = new Map()),
      (this.updateObservers = () => {
        for (const [e, t] of this.callbacks) e(this.o, t);
      }),
      void 0 !== e && (this.value = e);
  }
  get value() {
    return this.o;
  }
  set value(e) {
    this.setValue(e);
  }
  setValue(e, t = !1) {
    const n = t || !Object.is(e, this.o);
    (this.o = e), n && this.updateObservers();
  }
  addCallback(e, t) {
    t &&
      (this.callbacks.has(e) ||
        this.callbacks.set(e, () => {
          this.callbacks.delete(e);
        })),
      e(this.value);
  }
  clearCallbacks() {
    this.callbacks.clear();
  }
}
class Xi extends Event {
  constructor(e) {
    super("context-provider", { bubbles: !0, composed: !0 }),
      (this.context = e),
      Object.setPrototypeOf(this, new.target.prototype);
  }
}
class Ki extends Zi {
  constructor(e, t, n) {
    super(void 0 !== t.context ? t.initialValue : n),
      (this.onContextRequest = (e) => {
        e.context === this.context &&
          e.composedPath()[0] !== this.host &&
          (e.stopPropagation(), this.addCallback(e.callback, e.subscribe));
      }),
      (this.host = e),
      void 0 !== t.context ? (this.context = t.context) : (this.context = t),
      this.attachListeners(),
      this.host.addController(this);
  }
  attachListeners() {
    this.host.addEventListener("context-request", this.onContextRequest);
  }
  hostConnected() {
    this.host.dispatchEvent(new Xi(this.context));
  }
}
function Ji({ context: e }) {
  return He({
    finisher: (t, n) => {
      const i = new WeakMap();
      t.addInitializer((t) => {
        i.set(t, new Ki(t, { context: e }));
      });
      const r = Object.getOwnPropertyDescriptor(t.prototype, n),
        o = null == r ? void 0 : r.set,
        s = {
          ...r,
          set: function (e) {
            var t;
            null === (t = i.get(this)) || void 0 === t || t.setValue(e), o && o.call(this, e);
          },
        };
      Object.defineProperty(t.prototype, n, s);
    },
  });
}
function er({ context: e, subscribe: t }) {
  return He({
    finisher: (n, i) => {
      n.addInitializer((n) => {
        new Yi(n, {
          context: e,
          callback: (e) => {
            n[i] = e;
          },
          subscribe: t,
        });
      });
    },
  });
}
const tr = de(
  class extends pe {
    constructor(e) {
      var t;
      if (
        (super(e),
        e.type !== le || "class" !== e.name || (null === (t = e.strings) || void 0 === t ? void 0 : t.length) > 2)
      )
        throw Error(
          "`classMap()` can only be used in the `class` attribute and must be the only part in the attribute."
        );
    }
    render(e) {
      return (
        " " +
        Object.keys(e)
          .filter((t) => e[t])
          .join(" ") +
        " "
      );
    }
    update(e, [t]) {
      var n, i;
      if (void 0 === this.it) {
        (this.it = new Set()),
          void 0 !== e.strings &&
            (this.nt = new Set(
              e.strings
                .join(" ")
                .split(/\s/)
                .filter((e) => "" !== e)
            ));
        for (const e in t) t[e] && !(null === (n = this.nt) || void 0 === n ? void 0 : n.has(e)) && this.it.add(e);
        return this.render(t);
      }
      const r = e.element.classList;
      this.it.forEach((e) => {
        e in t || (r.remove(e), this.it.delete(e));
      });
      for (const e in t) {
        const n = !!t[e];
        n === this.it.has(e) ||
          (null === (i = this.nt) || void 0 === i ? void 0 : i.has(e)) ||
          (n ? (r.add(e), this.it.add(e)) : (r.remove(e), this.it.delete(e)));
      }
      return F;
    }
  }
);
var nr, ir;
function rr({ x: e, y: t }) {
  return {
    x: Math.round(Math.min(yn.getState(), Math.max(0, e || 0))),
    y: Math.round(Math.min(gn.getState(), Math.max(0, t || 0))),
  };
}
function or() {
  return rr({ x: cn.getState(), y: ln.getState() });
}
function sr() {
  const { x: e, y: t } = rr({ x: cn.getState(), y: ln.getState() });
  return { cx: e, cy: t, px: Math.floor(un.getState()) };
}
function ar(e, t, n, i) {
  const r = Math.abs(n - e),
    o = Math.abs(i - t);
  return Math.hypot(r, o);
}
function cr(e) {
  const { topLeft: t, bottomRight: n } = e;
  return { width: 1 + n.x - t.x, height: 1 + n.y - t.y };
}
function lr(e, t, n) {
  return e.reduce(
    ({ width: e, height: i }, { dx: r, dy: o }) => ({ width: Math.max(e, r + t), height: Math.max(i, o + n) }),
    { width: 0, height: 0 }
  );
}
function ur({ x: e, y: t }) {
  const n = mn.getState(),
    i = (function (e, t, n) {
      const i =
        null == n
          ? void 0
          : n.canvasConfigurations.find(
              (i) => e >= i.dx && e < i.dx + n.canvasWidth && t >= i.dy && t < i.dy + n.canvasHeight
            );
      return i;
    })(e, t, n);
  if (i && n) return { x: e % n.canvasWidth, y: t % n.canvasHeight, index: i.index };
}
function hr({ x: e, y: t }) {
  const n = yn.getState(),
    i = gn.getState();
  return !n || !i || e < 0 || e >= n || t < 0 || t >= i;
}
function dr(e, t) {
  return t
    ? t.canvasConfigurations.reduce((n, i) => {
        const r = { x1: i.dx, y1: i.dy, x2: i.dx + t.canvasWidth - 1, y2: i.dy + t.canvasHeight - 1 },
          o = Math.max(r.x1, e.x1),
          s = Math.min(r.x2, e.x2),
          a = Math.max(r.y1, e.y1),
          c = Math.min(r.y2, e.y2);
        var l, u, h, d;
        return (
          c - a + 1 > 0 &&
            s - o + 1 > 0 &&
            n.push(
              Object.assign(
                { canvasIndex: i.index },
                ((l = o % t.canvasWidth),
                (u = a % t.canvasHeight),
                (h = s % t.canvasWidth),
                (d = c % t.canvasHeight),
                { topLeftCoordinate: { x: l, y: u }, bottomRightCoordinate: { x: h, y: d } })
              )
            ),
          n
        );
      }, [])
    : [];
}
function pr() {
  const e = xn.getState();
  if (2 === e.length) {
    const { x: t, y: n } = e[0],
      { x: i, y: r } = e[1];
    if (n > r || t > i) return !0;
  }
  return !1;
}
function fr(e) {
  return 2 === e.length;
}
function vr(e) {
  const t = mn.getState().activeZone.topLeft;
  return { x: e.x + t.x, y: e.y + t.y };
}
function mr(e) {
  const t = mn.getState().activeZone.topLeft;
  return { x: e.x + qt - t.x, y: e.y + Qt - t.y };
}
function gr(e) {
  const t = mn.getState().activeZone.topLeft;
  return { x: e.x - qt + t.x, y: e.y - Qt + t.y };
}
function yr(e) {
  const t = null == e ? void 0 : e.getVisibilityRect();
  if (!t) return [];
  const n = (function (e) {
    const t = vr({ x: e.x1, y: e.y1 }),
      n = vr({ x: e.x2, y: e.y2 });
    return { x1: t.x, y1: t.y, x2: n.x, y2: n.y };
  })(t);
  return (function (e, t) {
    if (1 === t.canvasConfigurations.length) return [t.canvasConfigurations[0].index];
    const { topLeft: n, bottomRight: i } = t.activeZone;
    return dr(
      { x1: Math.max(e.x1, n.x), y1: Math.max(e.y1, n.y), x2: Math.min(e.x2, i.x), y2: Math.min(e.y2, i.y) },
      t
    ).map((e) => e.canvasIndex);
  })(n, mn.getState());
}
function br(e) {
  const { cx: t, cy: n, px: i } = sr(),
    r = gr({ x: t, y: n });
  null == ri || ri.syncCoordinates(Object.assign({ cx: r.x, cy: r.y, px: i }, e ? { ts: dn.getState() } : {}));
}
!(function (e) {
  (e.Circle = "circle"), (e.Rectangle = "rectangle"), (e.Shape = "shape");
})(nr || (nr = {})),
  (function (e) {
    (e.Solid = "solid"), (e.Checkered = "checkered"), (e.Random = "random");
  })(ir || (ir = {}));
const xr = `${CLIENT_CONFIG.REDDIT_ORIGIN}/r/place`;
function wr(e, t) {
  const n = new URL(e ? "https://reddit.app.link/place" : xr),
    i = gr(or());
  return (
    n.searchParams.set(jt.CX, `${i.x}`),
    n.searchParams.set(jt.CY, `${i.y}`),
    n.searchParams.set(jt.PX, `${Math.floor(un.getState())}`),
    t && n.searchParams.set(jt.TS, `${dn.getState()}`),
    n.searchParams.set(jt.ScreenMode, Gt.FullScreen),
    n.toString()
  );
}
function Sr(...e) {
  nn.getState() && console.info(e);
}
function _r(e, t, ...n) {
  console.error(e, t, ...n),
    t instanceof Error
      ? window.Sentry.captureException(t)
      : e instanceof Error
      ? window.Sentry.captureException(e)
      : "string" == typeof e && window.Sentry.captureMessage(e);
}
var Tr, Cr;
!(function (e) {
  (e.Android = "android"), (e.IOS = "ios"), (e.WebDesktop = "desktop-web"), (e.Whatever = "whatever");
})(Tr || (Tr = {})),
  (function (e) {
    (e.Safari = "safari"), (e.Whatever = "whatever");
  })(Cr || (Cr = {}));
class Er extends pe {
  constructor(e) {
    if ((super(e), (this.et = V), e.type !== ue))
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e) {
    if (e === V || null == e) return (this.ft = void 0), (this.et = e);
    if (e === F) return e;
    if ("string" != typeof e) throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e === this.et) return this.ft;
    this.et = e;
    const t = [e];
    return (t.raw = t), (this.ft = { _$litType$: this.constructor.resultType, strings: t, values: [] });
  }
}
(Er.directiveName = "unsafeHTML"), (Er.resultType = 1);
class kr extends Er {}
(kr.directiveName = "unsafeSVG"), (kr.resultType = 2);
const Ar = de(kr),
  Or = o`:host{display:inline-block;fill:currentColor;vertical-align:middle;line-height:1em}svg{fill:currentColor;width:auto}:host([size=sm])>svg{height:1em}:host([size=md])>svg{height:1.25em}:host([size=lg])>svg{height:1.5em}:host([size=xl])>svg{height:2em}`;
function Ir(e, t, n, i = Or) {
  if (n) {
    class r extends ht {
      constructor() {
        super(...arguments), (this.size = yt.Small), (this.fill = !1);
      }
      static get styles() {
        return i;
      }
      render() {
        return this.fill ? n : t;
      }
    }
    $e([Ue({ type: String, reflect: !0 })], r.prototype, "size", void 0),
      $e([Ue({ type: Boolean })], r.prototype, "fill", void 0),
      window.customElements.define(e, r);
  } else {
    class n extends ht {
      constructor() {
        super(...arguments), (this.size = yt.Small);
      }
      static get styles() {
        return i;
      }
      render() {
        return t;
      }
    }
    $e([Ue({ type: String, reflect: !0 })], n.prototype, "size", void 0), window.customElements.define(e, n);
  }
}
Ir(
  "icon-delete",
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><g clip-path="url(#clip0_472_1132)"><path d="M15.751 6.059L17 6.142l-.761 11.441a2.579 2.579 0 01-2.439 2.542H6.2a2.578 2.578 0 01-2.437-2.536L3 6.142l1.248-.083.761 11.441A1.366 1.366 0 006.2 18.875h7.6a1.369 1.369 0 001.191-1.381l.76-11.435zM18 3v1.25H2V3h4v-.375A2.762 2.762 0 018.875 0h2.25A2.762 2.762 0 0114 2.625V3h4zM7.25 3h5.5v-.375a1.518 1.518 0 00-1.625-1.375h-2.25A1.518 1.518 0 007.25 2.625V3z"/></g><defs><clipPath id="clip0_472_1132"><path d="M0 0h20v20H0z"/></clipPath></defs></svg>'
  )}`,
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><g clip-path="url(#clip0_472_1133)"><path d="M14.375 3a3.136 3.136 0 00-3.25-3h-2.25a3.136 3.136 0 00-3.25 3H2v2h16V3h-3.625zm-5.5-1h2.25a1.148 1.148 0 011.25 1h-4.75a1.148 1.148 0 011.25-1zm-5.85 4.5h13.95l-.737 11.083a2.58 2.58 0 01-2.438 2.542H6.2a2.578 2.578 0 01-2.437-2.536L3.025 6.5z"/></g><defs><clipPath id="clip0_472_1133"><path d="M0 0h20v20H0z"/></clipPath></defs></svg>'
  )}`
);
let Mr = class extends se {
  constructor() {
    super(...arguments), (this.selected = !1);
  }
  static get styles() {
    return o`:host{--font-size:20px;--button-size:38px}button{font-size:inherit;background:0 0;cursor:pointer;border:none;margin:0;padding:0;pointer-events:all;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;-webkit-text-size-adjust:none;-webkit-user-select:none;user-select:none}.layout{border:var(--pixel-border);box-shadow:var(--pixel-box-shadow);font-family:var(--garlic-bread-font-pixel);background-color:#fff;display:flex;align-items:center;justify-content:center;height:var(--button-size);width:var(--button-size);color:#000;font-size:var(--font-size);pointer-events:all;position:relative}@media (min-width:460px){.layout:hover{background:linear-gradient(rgba(0,0,0,.2) 0 0),#fff}}.layout:active{background:linear-gradient(rgba(0,0,0,.3) 0 0),#fff;transform:scale(.95,.95)}.selected{color:#fff;background:red}`;
  }
  render() {
    return j` <button> <div class="layout ${tr({ selected: this.selected })}"> <slot></slot> </div> </button> `;
  }
};
$e([Ue({ type: Boolean })], Mr.prototype, "selected", void 0), (Mr = $e([Fe("garlic-bread-icon-button")], Mr));
function Pr(e) {
  e.stopPropagation();
}
let Dr = class extends se {
  constructor() {
    super(...arguments),
      (this.pattern = ir.Solid),
      (this.x = 0),
      (this.y = 0),
      (this.radius = 10),
      (this.isHoldingResizeHandle = !1),
      (this.isHoldingMoveHandle = !1),
      (this.holdResizeHandle = (e) => {
        Pr(e), (this.isHoldingResizeHandle = !0);
      }),
      (this.onMouseMove = (e) => {
        if (this.isHoldingResizeHandle) {
          if ((Pr(e), !this.moveHandle)) return;
          const t = this.moveHandle.getBoundingClientRect(),
            n = t.right - t.left,
            i = (t.left + t.right) / 2,
            r = Math.round((e.clientX - i) / n);
          this.dispatchEvent(Ye("resize-circle", { radius: Math.max(1, Math.min(20, r)) }));
        }
      }),
      (this.onMouseUp = (e) => {
        (this.isHoldingMoveHandle || this.isHoldingResizeHandle) &&
          ((this.isHoldingMoveHandle = !1), (this.isHoldingResizeHandle = !1), Pr(e));
      }),
      (this.deleteCircle = (e) => {
        Pr(e), this.dispatchEvent(Ye("delete"));
      });
  }
  static get styles() {
    return $t(
      ":host {\n  pointer-events: all;\n}\n.circle {\n  transform: translate(calc(-50% + 25px), calc(-50% + 25px));\n  border-radius: 9999px;\n  cursor: grab;\n}\n.circle:not(.resizing):not(:hover) garlic-bread-icon-button,\n.circle:not(.resizing):not(:hover) .handle-box,\n.circle:not(.resizing):not(:hover) .radius {\n  opacity: 0;\n  transition: opacity 0.1s ease-out 0.3s;\n}\n.pattern {\n  --vertical-offset: '0px';\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  border-radius: 9999px;\n  overflow: hidden;\n}\n.pattern.solid {\n  opacity: 0.8;\n  background-color: var(--solid-color);\n}\n.pattern.random {\n  background: linear-gradient(217deg, #ff0000, rgba(255, 0, 0, 0) 70%), linear-gradient(127deg, #00ff00, rgba(0, 255, 0, 0) 70%), linear-gradient(336deg, #0000ff, rgba(0, 0, 255, 0) 70%);\n}\n.pattern.checkered {\n  --base-color: #fff;\n  background: repeating-conic-gradient(var(--solid-color) 0% 25%, var(--base-color) 0% 50%);\n  background-size: 100px 100px;\n  background-position: 50px var(--vertical-offset);\n  opacity: 0.8;\n}\n.layout {\n  position: relative;\n  border: var(--pixel-border);\n  border-radius: 9999px;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n}\n.radius {\n  position: absolute;\n  background: #000;\n  height: 3px;\n  top: 50%;\n  left: calc(50% + 25px);\n  transform: translate(0, -50%);\n  width: calc(50% - 50px);\n  opacity: 1;\n  transition: opacity 0.1s ease-out 0s;\n}\n.handle-box {\n  pointer-events: all;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  transform: translate(-50%, -50%);\n  width: 100px;\n  height: 100px;\n  border-radius: 9999px;\n  opacity: 1;\n  transition: opacity 0.1s ease-out 0s;\n}\n.handle-box.move {\n  top: 50%;\n  left: 50%;\n}\n.handle-box.resize {\n  top: 50%;\n  left: 100%;\n  cursor: col-resize;\n}\n.handle {\n  background-color: #fff;\n  border-radius: 9999px;\n  border: var(--pixel-border);\n  box-sizing: border-box;\n  width: 50%;\n  height: 50%;\n}\ngarlic-bread-icon-button {\n  --font-size: 50px;\n  --button-size: 78px;\n  pointer-events: all;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(50px, -150px);\n  font-size: 50px;\n  opacity: 1;\n  transition: opacity 0.1s ease-out 0s;\n}\n"
    );
  }
  disconnectedCallback() {
    super.disconnectedCallback(),
      document.removeEventListener("mousemove", this.onMouseMove),
      document.removeEventListener("mouseup", this.onMouseUp);
  }
  connectedCallback() {
    super.connectedCallback(),
      document.addEventListener("mousemove", this.onMouseMove, { capture: !0 }),
      document.addEventListener("mouseup", this.onMouseUp, { capture: !0 });
  }
  shouldOffset() {}
  render() {
    const e = 100 * (2 * this.radius + 1);
    return j` <div class="${tr({ circle: !0, resizing: this.isHoldingResizeHandle })}" style="${Te({
      height: `${e}%`,
      width: `${e}%`,
    })}"> <div class="pattern ${this.pattern}" style="${Te({
      "--solid-color": ("number" == typeof this.color && Dn(this.color)) || "",
      "--vertical-offset": this.x % 2 ^ this.y % 2 ? "50px" : "0px",
    })}"></div> <div class="layout"> <div class="radius"></div> <div class="handle-box move"> <div class="handle"></div> </div> <div class="handle-box resize" @mousedown="${
      this.holdResizeHandle
    }"> <div class="handle"></div> </div> </div> <garlic-bread-icon-button @mousedown="${Pr}" @mouseup="${
      this.deleteCircle
    }"> <icon-delete fill></icon-delete> </garlic-bread-icon-button> </div> `;
  }
};
$e([Ue({ type: Number })], Dr.prototype, "color", void 0),
  $e([Ue({ type: String })], Dr.prototype, "pattern", void 0),
  $e([Ue({ type: Number })], Dr.prototype, "x", void 0),
  $e([Ue({ type: Number })], Dr.prototype, "y", void 0),
  $e([Ue({ type: Number })], Dr.prototype, "radius", void 0),
  $e([qe(".circle")], Dr.prototype, "circle", void 0),
  $e([qe(".move .handle")], Dr.prototype, "moveHandle", void 0),
  $e([Be()], Dr.prototype, "isHoldingResizeHandle", void 0),
  (Dr = $e([Fe("garlic-bread-admin-circle-tool")], Dr));
var Rr = {
    update: null,
    begin: null,
    loopBegin: null,
    changeBegin: null,
    change: null,
    changeComplete: null,
    loopComplete: null,
    complete: null,
    loop: 1,
    direction: "normal",
    autoplay: !0,
    timelineOffset: 0,
  },
  Nr = { duration: 1e3, delay: 0, endDelay: 0, easing: "easeOutElastic(1, .5)", round: 0 },
  $r = [
    "translateX",
    "translateY",
    "translateZ",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "perspective",
    "matrix",
    "matrix3d",
  ],
  Lr = { CSS: {}, springs: {} };
function jr(e, t, n) {
  return Math.min(Math.max(e, t), n);
}
function zr(e, t) {
  return e.indexOf(t) > -1;
}
function Fr(e, t) {
  return e.apply(null, t);
}
var Vr = {
  arr: function (e) {
    return Array.isArray(e);
  },
  obj: function (e) {
    return zr(Object.prototype.toString.call(e), "Object");
  },
  pth: function (e) {
    return Vr.obj(e) && e.hasOwnProperty("totalLength");
  },
  svg: function (e) {
    return e instanceof SVGElement;
  },
  inp: function (e) {
    return e instanceof HTMLInputElement;
  },
  dom: function (e) {
    return e.nodeType || Vr.svg(e);
  },
  str: function (e) {
    return "string" == typeof e;
  },
  fnc: function (e) {
    return "function" == typeof e;
  },
  und: function (e) {
    return void 0 === e;
  },
  nil: function (e) {
    return Vr.und(e) || null === e;
  },
  hex: function (e) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e);
  },
  rgb: function (e) {
    return /^rgb/.test(e);
  },
  hsl: function (e) {
    return /^hsl/.test(e);
  },
  col: function (e) {
    return Vr.hex(e) || Vr.rgb(e) || Vr.hsl(e);
  },
  key: function (e) {
    return !Rr.hasOwnProperty(e) && !Nr.hasOwnProperty(e) && "targets" !== e && "keyframes" !== e;
  },
};
function Ur(e) {
  var t = /\(([^)]+)\)/.exec(e);
  return t
    ? t[1].split(",").map(function (e) {
        return parseFloat(e);
      })
    : [];
}
function Br(e, t) {
  var n = Ur(e),
    i = jr(Vr.und(n[0]) ? 1 : n[0], 0.1, 100),
    r = jr(Vr.und(n[1]) ? 100 : n[1], 0.1, 100),
    o = jr(Vr.und(n[2]) ? 10 : n[2], 0.1, 100),
    s = jr(Vr.und(n[3]) ? 0 : n[3], 0.1, 100),
    a = Math.sqrt(r / i),
    c = o / (2 * Math.sqrt(r * i)),
    l = c < 1 ? a * Math.sqrt(1 - c * c) : 0,
    u = 1,
    h = c < 1 ? (c * a - s) / l : -s + a;
  function d(e) {
    var n = t ? (t * e) / 1e3 : e;
    return (
      (n = c < 1 ? Math.exp(-n * c * a) * (u * Math.cos(l * n) + h * Math.sin(l * n)) : (u + h * n) * Math.exp(-n * a)),
      0 === e || 1 === e ? e : 1 - n
    );
  }
  return t
    ? d
    : function () {
        var t = Lr.springs[e];
        if (t) return t;
        for (var n = 1 / 6, i = 0, r = 0; ; )
          if (1 === d((i += n))) {
            if (++r >= 16) break;
          } else r = 0;
        var o = i * n * 1e3;
        return (Lr.springs[e] = o), o;
      };
}
function Hr(e) {
  return (
    void 0 === e && (e = 10),
    function (t) {
      return Math.ceil(jr(t, 1e-6, 1) * e) * (1 / e);
    }
  );
}
var qr,
  Qr,
  Gr = (function () {
    var e = 0.1;
    function t(e, t) {
      return 1 - 3 * t + 3 * e;
    }
    function n(e, t) {
      return 3 * t - 6 * e;
    }
    function i(e) {
      return 3 * e;
    }
    function r(e, r, o) {
      return ((t(r, o) * e + n(r, o)) * e + i(r)) * e;
    }
    function o(e, r, o) {
      return 3 * t(r, o) * e * e + 2 * n(r, o) * e + i(r);
    }
    return function (t, n, i, s) {
      if (0 <= t && t <= 1 && 0 <= i && i <= 1) {
        var a = new Float32Array(11);
        if (t !== n || i !== s) for (var c = 0; c < 11; ++c) a[c] = r(c * e, t, i);
        return function (e) {
          return (t === n && i === s) || 0 === e || 1 === e ? e : r(l(e), n, s);
        };
      }
      function l(n) {
        for (var s = 0, c = 1; 10 !== c && a[c] <= n; ++c) s += e;
        --c;
        var l = s + ((n - a[c]) / (a[c + 1] - a[c])) * e,
          u = o(l, t, i);
        return u >= 0.001
          ? (function (e, t, n, i) {
              for (var s = 0; s < 4; ++s) {
                var a = o(t, n, i);
                if (0 === a) return t;
                t -= (r(t, n, i) - e) / a;
              }
              return t;
            })(n, l, t, i)
          : 0 === u
          ? l
          : (function (e, t, n, i, o) {
              var s,
                a,
                c = 0;
              do {
                (s = r((a = t + (n - t) / 2), i, o) - e) > 0 ? (n = a) : (t = a);
              } while (Math.abs(s) > 1e-7 && ++c < 10);
              return a;
            })(n, s, s + e, t, i);
      }
    };
  })(),
  Wr =
    ((qr = {
      linear: function () {
        return function (e) {
          return e;
        };
      },
    }),
    (Qr = {
      Sine: function () {
        return function (e) {
          return 1 - Math.cos((e * Math.PI) / 2);
        };
      },
      Circ: function () {
        return function (e) {
          return 1 - Math.sqrt(1 - e * e);
        };
      },
      Back: function () {
        return function (e) {
          return e * e * (3 * e - 2);
        };
      },
      Bounce: function () {
        return function (e) {
          for (var t, n = 4; e < ((t = Math.pow(2, --n)) - 1) / 11; );
          return 1 / Math.pow(4, 3 - n) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2);
        };
      },
      Elastic: function (e, t) {
        void 0 === e && (e = 1), void 0 === t && (t = 0.5);
        var n = jr(e, 1, 10),
          i = jr(t, 0.1, 2);
        return function (e) {
          return 0 === e || 1 === e
            ? e
            : -n *
                Math.pow(2, 10 * (e - 1)) *
                Math.sin(((e - 1 - (i / (2 * Math.PI)) * Math.asin(1 / n)) * (2 * Math.PI)) / i);
        };
      },
    }),
    ["Quad", "Cubic", "Quart", "Quint", "Expo"].forEach(function (e, t) {
      Qr[e] = function () {
        return function (e) {
          return Math.pow(e, t + 2);
        };
      };
    }),
    Object.keys(Qr).forEach(function (e) {
      var t = Qr[e];
      (qr["easeIn" + e] = t),
        (qr["easeOut" + e] = function (e, n) {
          return function (i) {
            return 1 - t(e, n)(1 - i);
          };
        }),
        (qr["easeInOut" + e] = function (e, n) {
          return function (i) {
            return i < 0.5 ? t(e, n)(2 * i) / 2 : 1 - t(e, n)(-2 * i + 2) / 2;
          };
        }),
        (qr["easeOutIn" + e] = function (e, n) {
          return function (i) {
            return i < 0.5 ? (1 - t(e, n)(1 - 2 * i)) / 2 : (t(e, n)(2 * i - 1) + 1) / 2;
          };
        });
    }),
    qr);
function Yr(e, t) {
  if (Vr.fnc(e)) return e;
  var n = e.split("(")[0],
    i = Wr[n],
    r = Ur(e);
  switch (n) {
    case "spring":
      return Br(e, t);
    case "cubicBezier":
      return Fr(Gr, r);
    case "steps":
      return Fr(Hr, r);
    default:
      return Fr(i, r);
  }
}
function Zr(e) {
  try {
    return document.querySelectorAll(e);
  } catch (e) {
    return;
  }
}
function Xr(e, t) {
  for (var n = e.length, i = arguments.length >= 2 ? arguments[1] : void 0, r = [], o = 0; o < n; o++)
    if (o in e) {
      var s = e[o];
      t.call(i, s, o, e) && r.push(s);
    }
  return r;
}
function Kr(e) {
  return e.reduce(function (e, t) {
    return e.concat(Vr.arr(t) ? Kr(t) : t);
  }, []);
}
function Jr(e) {
  return Vr.arr(e)
    ? e
    : (Vr.str(e) && (e = Zr(e) || e), e instanceof NodeList || e instanceof HTMLCollection ? [].slice.call(e) : [e]);
}
function eo(e, t) {
  return e.some(function (e) {
    return e === t;
  });
}
function to(e) {
  var t = {};
  for (var n in e) t[n] = e[n];
  return t;
}
function no(e, t) {
  var n = to(e);
  for (var i in e) n[i] = t.hasOwnProperty(i) ? t[i] : e[i];
  return n;
}
function io(e, t) {
  var n = to(e);
  for (var i in t) n[i] = Vr.und(e[i]) ? t[i] : e[i];
  return n;
}
function ro(e) {
  return Vr.rgb(e)
    ? (n = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec((t = e)))
      ? "rgba(" + n[1] + ",1)"
      : t
    : Vr.hex(e)
    ? (function (e) {
        var t = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (e, t, n, i) {
            return t + t + n + n + i + i;
          }),
          n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
        return "rgba(" + parseInt(n[1], 16) + "," + parseInt(n[2], 16) + "," + parseInt(n[3], 16) + ",1)";
      })(e)
    : Vr.hsl(e)
    ? (function (e) {
        var t,
          n,
          i,
          r =
            /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(e) ||
            /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(e),
          o = parseInt(r[1], 10) / 360,
          s = parseInt(r[2], 10) / 100,
          a = parseInt(r[3], 10) / 100,
          c = r[4] || 1;
        function l(e, t, n) {
          return (
            n < 0 && (n += 1),
            n > 1 && (n -= 1),
            n < 1 / 6 ? e + 6 * (t - e) * n : n < 0.5 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e
          );
        }
        if (0 == s) t = n = i = a;
        else {
          var u = a < 0.5 ? a * (1 + s) : a + s - a * s,
            h = 2 * a - u;
          (t = l(h, u, o + 1 / 3)), (n = l(h, u, o)), (i = l(h, u, o - 1 / 3));
        }
        return "rgba(" + 255 * t + "," + 255 * n + "," + 255 * i + "," + c + ")";
      })(e)
    : void 0;
  var t, n;
}
function oo(e) {
  var t =
    /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(
      e
    );
  if (t) return t[1];
}
function so(e, t) {
  return Vr.fnc(e) ? e(t.target, t.id, t.total) : e;
}
function ao(e, t) {
  return e.getAttribute(t);
}
function co(e, t, n) {
  if (eo([n, "deg", "rad", "turn"], oo(t))) return t;
  var i = Lr.CSS[t + n];
  if (!Vr.und(i)) return i;
  var r = document.createElement(e.tagName),
    o = e.parentNode && e.parentNode !== document ? e.parentNode : document.body;
  o.appendChild(r), (r.style.position = "absolute"), (r.style.width = 100 + n);
  var s = 100 / r.offsetWidth;
  o.removeChild(r);
  var a = s * parseFloat(t);
  return (Lr.CSS[t + n] = a), a;
}
function lo(e, t, n) {
  if (t in e.style) {
    var i = t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
      r = e.style[t] || getComputedStyle(e).getPropertyValue(i) || "0";
    return n ? co(e, r, n) : r;
  }
}
function uo(e, t) {
  return Vr.dom(e) && !Vr.inp(e) && (!Vr.nil(ao(e, t)) || (Vr.svg(e) && e[t]))
    ? "attribute"
    : Vr.dom(e) && eo($r, t)
    ? "transform"
    : Vr.dom(e) && "transform" !== t && lo(e, t)
    ? "css"
    : null != e[t]
    ? "object"
    : void 0;
}
function ho(e) {
  if (Vr.dom(e)) {
    for (var t, n = e.style.transform || "", i = /(\w+)\(([^)]*)\)/g, r = new Map(); (t = i.exec(n)); )
      r.set(t[1], t[2]);
    return r;
  }
}
function po(e, t, n, i) {
  var r = zr(t, "scale")
      ? 1
      : 0 +
        (function (e) {
          return zr(e, "translate") || "perspective" === e ? "px" : zr(e, "rotate") || zr(e, "skew") ? "deg" : void 0;
        })(t),
    o = ho(e).get(t) || r;
  return n && (n.transforms.list.set(t, o), (n.transforms.last = t)), i ? co(e, o, i) : o;
}
function fo(e, t, n, i) {
  switch (uo(e, t)) {
    case "transform":
      return po(e, t, i, n);
    case "css":
      return lo(e, t, n);
    case "attribute":
      return ao(e, t);
    default:
      return e[t] || 0;
  }
}
function vo(e, t) {
  var n = /^(\*=|\+=|-=)/.exec(e);
  if (!n) return e;
  var i = oo(e) || 0,
    r = parseFloat(t),
    o = parseFloat(e.replace(n[0], ""));
  switch (n[0][0]) {
    case "+":
      return r + o + i;
    case "-":
      return r - o + i;
    case "*":
      return r * o + i;
  }
}
function mo(e, t) {
  if (Vr.col(e)) return ro(e);
  if (/\s/g.test(e)) return e;
  var n = oo(e),
    i = n ? e.substr(0, e.length - n.length) : e;
  return t ? i + t : i;
}
function go(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function yo(e) {
  for (var t, n = e.points, i = 0, r = 0; r < n.numberOfItems; r++) {
    var o = n.getItem(r);
    r > 0 && (i += go(t, o)), (t = o);
  }
  return i;
}
function bo(e) {
  if (e.getTotalLength) return e.getTotalLength();
  switch (e.tagName.toLowerCase()) {
    case "circle":
      return (function (e) {
        return 2 * Math.PI * ao(e, "r");
      })(e);
    case "rect":
      return (function (e) {
        return 2 * ao(e, "width") + 2 * ao(e, "height");
      })(e);
    case "line":
      return (function (e) {
        return go({ x: ao(e, "x1"), y: ao(e, "y1") }, { x: ao(e, "x2"), y: ao(e, "y2") });
      })(e);
    case "polyline":
      return yo(e);
    case "polygon":
      return (function (e) {
        var t = e.points;
        return yo(e) + go(t.getItem(t.numberOfItems - 1), t.getItem(0));
      })(e);
  }
}
function xo(e, t) {
  var n = t || {},
    i =
      n.el ||
      (function (e) {
        for (var t = e.parentNode; Vr.svg(t) && Vr.svg(t.parentNode); ) t = t.parentNode;
        return t;
      })(e),
    r = i.getBoundingClientRect(),
    o = ao(i, "viewBox"),
    s = r.width,
    a = r.height,
    c = n.viewBox || (o ? o.split(" ") : [0, 0, s, a]);
  return { el: i, viewBox: c, x: c[0] / 1, y: c[1] / 1, w: s, h: a, vW: c[2], vH: c[3] };
}
function wo(e, t, n) {
  function i(n) {
    void 0 === n && (n = 0);
    var i = t + n >= 1 ? t + n : 0;
    return e.el.getPointAtLength(i);
  }
  var r = xo(e.el, e.svg),
    o = i(),
    s = i(-1),
    a = i(1),
    c = n ? 1 : r.w / r.vW,
    l = n ? 1 : r.h / r.vH;
  switch (e.property) {
    case "x":
      return (o.x - r.x) * c;
    case "y":
      return (o.y - r.y) * l;
    case "angle":
      return (180 * Math.atan2(a.y - s.y, a.x - s.x)) / Math.PI;
  }
}
function So(e, t) {
  var n = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
    i = mo(Vr.pth(e) ? e.totalLength : e, t) + "";
  return { original: i, numbers: i.match(n) ? i.match(n).map(Number) : [0], strings: Vr.str(e) || t ? i.split(n) : [] };
}
function _o(e) {
  return Xr(e ? Kr(Vr.arr(e) ? e.map(Jr) : Jr(e)) : [], function (e, t, n) {
    return n.indexOf(e) === t;
  });
}
function To(e) {
  var t = _o(e);
  return t.map(function (e, n) {
    return { target: e, id: n, total: t.length, transforms: { list: ho(e) } };
  });
}
function Co(e, t) {
  var n = to(t);
  if ((/^spring/.test(n.easing) && (n.duration = Br(n.easing)), Vr.arr(e))) {
    var i = e.length;
    2 === i && !Vr.obj(e[0]) ? (e = { value: e }) : Vr.fnc(t.duration) || (n.duration = t.duration / i);
  }
  var r = Vr.arr(e) ? e : [e];
  return r
    .map(function (e, n) {
      var i = Vr.obj(e) && !Vr.pth(e) ? e : { value: e };
      return (
        Vr.und(i.delay) && (i.delay = n ? 0 : t.delay),
        Vr.und(i.endDelay) && (i.endDelay = n === r.length - 1 ? t.endDelay : 0),
        i
      );
    })
    .map(function (e) {
      return io(e, n);
    });
}
function Eo(e, t) {
  var n = [],
    i = t.keyframes;
  for (var r in (i &&
    (t = io(
      (function (e) {
        for (
          var t = Xr(
              Kr(
                e.map(function (e) {
                  return Object.keys(e);
                })
              ),
              function (e) {
                return Vr.key(e);
              }
            ).reduce(function (e, t) {
              return e.indexOf(t) < 0 && e.push(t), e;
            }, []),
            n = {},
            i = function (i) {
              var r = t[i];
              n[r] = e.map(function (e) {
                var t = {};
                for (var n in e) Vr.key(n) ? n == r && (t.value = e[n]) : (t[n] = e[n]);
                return t;
              });
            },
            r = 0;
          r < t.length;
          r++
        )
          i(r);
        return n;
      })(i),
      t
    )),
  t))
    Vr.key(r) && n.push({ name: r, tweens: Co(t[r], e) });
  return n;
}
function ko(e, t) {
  var n;
  return e.tweens.map(function (i) {
    var r = (function (e, t) {
        var n = {};
        for (var i in e) {
          var r = so(e[i], t);
          Vr.arr(r) &&
            ((r = r.map(function (e) {
              return so(e, t);
            })),
            1 === r.length && (r = r[0])),
            (n[i] = r);
        }
        return (n.duration = parseFloat(n.duration)), (n.delay = parseFloat(n.delay)), n;
      })(i, t),
      o = r.value,
      s = Vr.arr(o) ? o[1] : o,
      a = oo(s),
      c = fo(t.target, e.name, a, t),
      l = n ? n.to.original : c,
      u = Vr.arr(o) ? o[0] : l,
      h = oo(u) || oo(c),
      d = a || h;
    return (
      Vr.und(s) && (s = l),
      (r.from = So(u, d)),
      (r.to = So(vo(s, u), d)),
      (r.start = n ? n.end : 0),
      (r.end = r.start + r.delay + r.duration + r.endDelay),
      (r.easing = Yr(r.easing, r.duration)),
      (r.isPath = Vr.pth(o)),
      (r.isPathTargetInsideSVG = r.isPath && Vr.svg(t.target)),
      (r.isColor = Vr.col(r.from.original)),
      r.isColor && (r.round = 1),
      (n = r),
      r
    );
  });
}
var Ao = {
  css: function (e, t, n) {
    return (e.style[t] = n);
  },
  attribute: function (e, t, n) {
    return e.setAttribute(t, n);
  },
  object: function (e, t, n) {
    return (e[t] = n);
  },
  transform: function (e, t, n, i, r) {
    if ((i.list.set(t, n), t === i.last || r)) {
      var o = "";
      i.list.forEach(function (e, t) {
        o += t + "(" + e + ") ";
      }),
        (e.style.transform = o);
    }
  },
};
function Oo(e, t) {
  To(e).forEach(function (e) {
    for (var n in t) {
      var i = so(t[n], e),
        r = e.target,
        o = oo(i),
        s = fo(r, n, o, e),
        a = vo(mo(i, o || oo(s)), s),
        c = uo(r, n);
      Ao[c](r, n, a, e.transforms, !0);
    }
  });
}
function Io(e, t) {
  return Xr(
    Kr(
      e.map(function (e) {
        return t.map(function (t) {
          return (function (e, t) {
            var n = uo(e.target, t.name);
            if (n) {
              var i = ko(t, e),
                r = i[i.length - 1];
              return {
                type: n,
                property: t.name,
                animatable: e,
                tweens: i,
                duration: r.end,
                delay: i[0].delay,
                endDelay: r.endDelay,
              };
            }
          })(e, t);
        });
      })
    ),
    function (e) {
      return !Vr.und(e);
    }
  );
}
function Mo(e, t) {
  var n = e.length,
    i = function (e) {
      return e.timelineOffset ? e.timelineOffset : 0;
    },
    r = {};
  return (
    (r.duration = n
      ? Math.max.apply(
          Math,
          e.map(function (e) {
            return i(e) + e.duration;
          })
        )
      : t.duration),
    (r.delay = n
      ? Math.min.apply(
          Math,
          e.map(function (e) {
            return i(e) + e.delay;
          })
        )
      : t.delay),
    (r.endDelay = n
      ? r.duration -
        Math.max.apply(
          Math,
          e.map(function (e) {
            return i(e) + e.duration - e.endDelay;
          })
        )
      : t.endDelay),
    r
  );
}
var Po = 0;
var Do = [],
  Ro = (function () {
    var e;
    function t(n) {
      for (var i = Do.length, r = 0; r < i; ) {
        var o = Do[r];
        o.paused ? (Do.splice(r, 1), i--) : (o.tick(n), r++);
      }
      e = r > 0 ? requestAnimationFrame(t) : void 0;
    }
    return (
      "undefined" != typeof document &&
        document.addEventListener("visibilitychange", function () {
          $o.suspendWhenDocumentHidden &&
            (No()
              ? (e = cancelAnimationFrame(e))
              : (Do.forEach(function (e) {
                  return e._onDocumentVisibility();
                }),
                Ro()));
        }),
      function () {
        e || (No() && $o.suspendWhenDocumentHidden) || !(Do.length > 0) || (e = requestAnimationFrame(t));
      }
    );
  })();
function No() {
  return !!document && document.hidden;
}
function $o(e) {
  void 0 === e && (e = {});
  var t,
    n = 0,
    i = 0,
    r = 0,
    o = 0,
    s = null;
  function a(e) {
    var t =
      window.Promise &&
      new Promise(function (e) {
        return (s = e);
      });
    return (e.finished = t), t;
  }
  var c = (function (e) {
    var t = no(Rr, e),
      n = no(Nr, e),
      i = Eo(n, e),
      r = To(e.targets),
      o = Io(r, i),
      s = Mo(o, n),
      a = Po;
    return (
      Po++,
      io(t, {
        id: a,
        children: [],
        animatables: r,
        animations: o,
        duration: s.duration,
        delay: s.delay,
        endDelay: s.endDelay,
      })
    );
  })(e);
  function l() {
    var e = c.direction;
    "alternate" !== e && (c.direction = "normal" !== e ? "normal" : "reverse"),
      (c.reversed = !c.reversed),
      t.forEach(function (e) {
        return (e.reversed = c.reversed);
      });
  }
  function u(e) {
    return c.reversed ? c.duration - e : e;
  }
  function h() {
    (n = 0), (i = u(c.currentTime) * (1 / $o.speed));
  }
  function d(e, t) {
    t && t.seek(e - t.timelineOffset);
  }
  function p(e) {
    for (var t = 0, n = c.animations, i = n.length; t < i; ) {
      var r = n[t],
        o = r.animatable,
        s = r.tweens,
        a = s.length - 1,
        l = s[a];
      a &&
        (l =
          Xr(s, function (t) {
            return e < t.end;
          })[0] || l);
      for (
        var u = jr(e - l.start - l.delay, 0, l.duration) / l.duration,
          h = isNaN(u) ? 1 : l.easing(u),
          d = l.to.strings,
          p = l.round,
          f = [],
          v = l.to.numbers.length,
          m = void 0,
          g = 0;
        g < v;
        g++
      ) {
        var y = void 0,
          b = l.to.numbers[g],
          x = l.from.numbers[g] || 0;
        (y = l.isPath ? wo(l.value, h * b, l.isPathTargetInsideSVG) : x + h * (b - x)),
          p && ((l.isColor && g > 2) || (y = Math.round(y * p) / p)),
          f.push(y);
      }
      var w = d.length;
      if (w) {
        m = d[0];
        for (var S = 0; S < w; S++) {
          d[S];
          var _ = d[S + 1],
            T = f[S];
          isNaN(T) || (m += _ ? T + _ : T + " ");
        }
      } else m = f[0];
      Ao[r.type](o.target, r.property, m, o.transforms), (r.currentValue = m), t++;
    }
  }
  function f(e) {
    c[e] && !c.passThrough && c[e](c);
  }
  function v(e) {
    var h = c.duration,
      v = c.delay,
      m = h - c.endDelay,
      g = u(e);
    (c.progress = jr((g / h) * 100, 0, 100)),
      (c.reversePlayback = g < c.currentTime),
      t &&
        (function (e) {
          if (c.reversePlayback) for (var n = o; n--; ) d(e, t[n]);
          else for (var i = 0; i < o; i++) d(e, t[i]);
        })(g),
      !c.began && c.currentTime > 0 && ((c.began = !0), f("begin")),
      !c.loopBegan && c.currentTime > 0 && ((c.loopBegan = !0), f("loopBegin")),
      g <= v && 0 !== c.currentTime && p(0),
      ((g >= m && c.currentTime !== h) || !h) && p(h),
      g > v && g < m
        ? (c.changeBegan || ((c.changeBegan = !0), (c.changeCompleted = !1), f("changeBegin")), f("change"), p(g))
        : c.changeBegan && ((c.changeCompleted = !0), (c.changeBegan = !1), f("changeComplete")),
      (c.currentTime = jr(g, 0, h)),
      c.began && f("update"),
      e >= h &&
        ((i = 0),
        c.remaining && !0 !== c.remaining && c.remaining--,
        c.remaining
          ? ((n = r), f("loopComplete"), (c.loopBegan = !1), "alternate" === c.direction && l())
          : ((c.paused = !0),
            c.completed ||
              ((c.completed = !0),
              f("loopComplete"),
              f("complete"),
              !c.passThrough && "Promise" in window && (s(), a(c)))));
  }
  return (
    a(c),
    (c.reset = function () {
      var e = c.direction;
      (c.passThrough = !1),
        (c.currentTime = 0),
        (c.progress = 0),
        (c.paused = !0),
        (c.began = !1),
        (c.loopBegan = !1),
        (c.changeBegan = !1),
        (c.completed = !1),
        (c.changeCompleted = !1),
        (c.reversePlayback = !1),
        (c.reversed = "reverse" === e),
        (c.remaining = c.loop),
        (t = c.children);
      for (var n = (o = t.length); n--; ) c.children[n].reset();
      ((c.reversed && !0 !== c.loop) || ("alternate" === e && 1 === c.loop)) && c.remaining++,
        p(c.reversed ? c.duration : 0);
    }),
    (c._onDocumentVisibility = h),
    (c.set = function (e, t) {
      return Oo(e, t), c;
    }),
    (c.tick = function (e) {
      (r = e), n || (n = r), v((r + (i - n)) * $o.speed);
    }),
    (c.seek = function (e) {
      v(u(e));
    }),
    (c.pause = function () {
      (c.paused = !0), h();
    }),
    (c.play = function () {
      c.paused && (c.completed && c.reset(), (c.paused = !1), Do.push(c), h(), Ro());
    }),
    (c.reverse = function () {
      l(), (c.completed = !c.reversed), h();
    }),
    (c.restart = function () {
      c.reset(), c.play();
    }),
    (c.remove = function (e) {
      jo(_o(e), c);
    }),
    c.reset(),
    c.autoplay && c.play(),
    c
  );
}
function Lo(e, t) {
  for (var n = t.length; n--; ) eo(e, t[n].animatable.target) && t.splice(n, 1);
}
function jo(e, t) {
  var n = t.animations,
    i = t.children;
  Lo(e, n);
  for (var r = i.length; r--; ) {
    var o = i[r],
      s = o.animations;
    Lo(e, s), s.length || o.children.length || i.splice(r, 1);
  }
  n.length || i.length || t.pause();
}
($o.version = "3.2.1"),
  ($o.speed = 1),
  ($o.suspendWhenDocumentHidden = !0),
  ($o.running = Do),
  ($o.remove = function (e) {
    for (var t = _o(e), n = Do.length; n--; ) {
      jo(t, Do[n]);
    }
  }),
  ($o.get = fo),
  ($o.set = Oo),
  ($o.convertPx = co),
  ($o.path = function (e, t) {
    var n = Vr.str(e) ? Zr(e)[0] : e,
      i = t || 100;
    return function (e) {
      return { property: e, el: n, svg: xo(n), totalLength: bo(n) * (i / 100) };
    };
  }),
  ($o.setDashoffset = function (e) {
    var t = bo(e);
    return e.setAttribute("stroke-dasharray", t), t;
  }),
  ($o.stagger = function (e, t) {
    void 0 === t && (t = {});
    var n = t.direction || "normal",
      i = t.easing ? Yr(t.easing) : null,
      r = t.grid,
      o = t.axis,
      s = t.from || 0,
      a = "first" === s,
      c = "center" === s,
      l = "last" === s,
      u = Vr.arr(e),
      h = u ? parseFloat(e[0]) : parseFloat(e),
      d = u ? parseFloat(e[1]) : 0,
      p = oo(u ? e[1] : e) || 0,
      f = t.start || 0 + (u ? h : 0),
      v = [],
      m = 0;
    return function (e, t, g) {
      if ((a && (s = 0), c && (s = (g - 1) / 2), l && (s = g - 1), !v.length)) {
        for (var y = 0; y < g; y++) {
          if (r) {
            var b = c ? (r[0] - 1) / 2 : s % r[0],
              x = c ? (r[1] - 1) / 2 : Math.floor(s / r[0]),
              w = b - (y % r[0]),
              S = x - Math.floor(y / r[0]),
              _ = Math.sqrt(w * w + S * S);
            "x" === o && (_ = -w), "y" === o && (_ = -S), v.push(_);
          } else v.push(Math.abs(s - y));
          m = Math.max.apply(Math, v);
        }
        i &&
          (v = v.map(function (e) {
            return i(e / m) * m;
          })),
          "reverse" === n &&
            (v = v.map(function (e) {
              return o ? (e < 0 ? -1 * e : -e) : Math.abs(m - e);
            }));
      }
      return f + (u ? (d - h) / m : h) * (Math.round(100 * v[t]) / 100) + p;
    };
  }),
  ($o.timeline = function (e) {
    void 0 === e && (e = {});
    var t = $o(e);
    return (
      (t.duration = 0),
      (t.add = function (n, i) {
        var r = Do.indexOf(t),
          o = t.children;
        function s(e) {
          e.passThrough = !0;
        }
        r > -1 && Do.splice(r, 1);
        for (var a = 0; a < o.length; a++) s(o[a]);
        var c = io(n, no(Nr, e));
        c.targets = c.targets || e.targets;
        var l = t.duration;
        (c.autoplay = !1),
          (c.direction = t.direction),
          (c.timelineOffset = Vr.und(i) ? l : vo(i, l)),
          s(t),
          t.seek(c.timelineOffset);
        var u = $o(c);
        s(u), o.push(u);
        var h = Mo(o, e);
        return (
          (t.delay = h.delay),
          (t.endDelay = h.endDelay),
          (t.duration = h.duration),
          t.seek(0),
          t.reset(),
          t.autoplay && t.play(),
          t
        );
      }),
      t
    );
  }),
  ($o.easing = Yr),
  ($o.penner = Wr),
  ($o.random = function (e, t) {
    return Math.floor(Math.random() * (t - e + 1)) + e;
  });
let zo = class extends se {
  constructor() {
    super(),
      (this.name = ""),
      (this.isOpen = !1),
      (this.small = !1),
      (this.shouldShowOnZoomedOut = !1),
      Cn(this, tn),
      Cn(this, hn);
  }
  static get styles() {
    return o`.tooltip{display:none;background:#fff;border:var(--pixel-border);box-shadow:var(--pixel-box-shadow);position:absolute;width:fit-content;white-space:nowrap;justify-content:center;align-items:center;text-align:center;color:#000;font-family:var(--garlic-bread-font-pixel);font-size:14px;line-height:20px;font-weight:600;top:calc(-50% + -11px);left:50%;transform:translate(-50%,-50%);padding:5px 13px;z-index:2}.tooltip::before{content:'';position:absolute;bottom:calc(-1 * (2 * var(--pixel-shadow-size) + var(--pixel-border-size) + -.5px));left:50%;width:0;height:0;border-left:var(--pixel-shadow-size) solid transparent;border-right:var(--pixel-shadow-size) solid transparent;border-top:var(--pixel-shadow-size) solid var(--pixel-shadow-color)}.tooltip::after{content:'';position:absolute;width:11px;height:11px;bottom:calc(-1 * (11px / 2 + var(--pixel-border-size)));left:calc(50% - ((11px + var(--pixel-border-size)))/ 2);background-color:#fff;transform:rotate(135deg);border-radius:50% 50% 0 100%/0 0 100% 100%;border-right:var(--pixel-border);border-top:var(--pixel-border)}:host([isOpen])>.tooltip{display:flex}:host([small]) .tooltip{top:calc(-50% + -14px);text-transform:capitalize}`;
  }
  render() {
    return (tn.getState() && !(hn.getState() < Zt.Optimal)) || this.shouldShowOnZoomedOut
      ? j`<div class="tooltip"> <slot></slot> </div>`
      : "";
  }
};
$e([Ue({ type: String, reflect: !0 })], zo.prototype, "name", void 0),
  $e([Ue({ type: Boolean, reflect: !0 })], zo.prototype, "isOpen", void 0),
  $e([Ue({ type: Boolean })], zo.prototype, "small", void 0),
  $e([Ue({ type: Boolean })], zo.prototype, "shouldShowOnZoomedOut", void 0),
  (zo = $e([Fe("garlic-bread-tooltip")], zo));
const Fo = Symbol("host-app-type"),
  Vo = Symbol("browser-type"),
  Uo = Symbol("show-color-picker"),
  Bo = { rootMargin: "200px" },
  Ho = new Map();
function qo(e, t) {
  return (
    !Ho.has(e) &&
      t &&
      Ho.set(
        e,
        (function (e) {
          return new IntersectionObserver((e) => {
            for (const t of e) {
              const e = t.target,
                n = t.isIntersecting ? Ye("faceplate-enter", t, !1) : Ye("faceplate-leave", t, !1);
              e.dispatchEvent(n);
            }
          }, e);
        })(t)
      ),
    Ho.get(e)
  );
}
class Qo {
  constructor(e = Bo) {
    this._observer = qo(JSON.stringify(e), e);
  }
  observe(e) {
    this._observer.observe(e);
  }
  unobserve(e) {
    this._observer.unobserve(e);
  }
}
const Go = Symbol("mixins/observer");
const Wo = Symbol("mixins/user-action");
let Yo = class extends (function (e) {
  if (Wo in e) return e;
  class t extends e {
    constructor() {
      super(...arguments),
        (this._userActionEnabled = !1),
        (this._loadingHandleClick = () => {
          this._userActionEnabled && this.userActionCallback();
        }),
        (this._loadingHandleKeyDown = (e) => {
          this._userActionEnabled &&
            (("Enter" !== e.code && "Space" !== e.code) ||
              (e.preventDefault(), e.stopPropagation(), this.userActionCallback()));
        });
    }
    get isActionable() {
      return this._userActionEnabled;
    }
    enableUserActions() {
      this._userActionEnabled ||
        ((this._userActionEnabled = !0),
        this.addEventListener("click", this._loadingHandleClick),
        this.addEventListener("keydown", this._loadingHandleKeyDown));
    }
    disableUserActions() {
      this._userActionEnabled &&
        ((this._userActionEnabled = !1),
        this.removeEventListener("click", this._loadingHandleClick),
        this.removeEventListener("keydown", this._loadingHandleKeyDown));
    }
    userActionCallback() {}
  }
  return (t[Wo] = !0), t;
})(
  (function (e) {
    if (Go in e) return e;
    class t extends e {
      constructor() {
        super(...arguments),
          (this._observer = null),
          (this._handleEnter = (e) => {
            this.observerIsIntersectingCallback(e.detail);
          }),
          (this._handleLeave = (e) => {
            this.observerIsNotIntersectingCallback(e.detail);
          });
      }
      get isObserved() {
        return !!this._observer;
      }
      enableObserver(e) {
        this._observer ||
          ((this._observer = new Qo(e)),
          this._observer.observe(this),
          this.addEventListener("faceplate-enter", this._handleEnter),
          this.addEventListener("faceplate-leave", this._handleLeave));
      }
      disableObserver() {
        this._observer &&
          (this._observer.unobserve(this),
          (this._observer = null),
          this.removeEventListener("faceplate-enter", this._handleEnter),
          this.removeEventListener("faceplate-leave", this._handleLeave));
      }
      observerIsIntersectingCallback(e) {}
      observerIsNotIntersectingCallback(e) {}
    }
    return (t[Go] = !0), t;
  })(se)
) {
  constructor() {
    super(...arguments),
      (this.src = ""),
      (this.srcset = ""),
      (this.sizes = ""),
      (this.loading = Xe.Lazy),
      (this.width = 0),
      (this.height = 0),
      (this.perfmark = ""),
      (this.isRequestInProgress = !1);
  }
  static get styles() {
    return o`:host{display:inline-block}:host([loading=action]) div.placeholder{cursor:pointer}div{display:flex;align-items:center;justify-content:center;text-align:center;height:inherit;width:inherit;margin:auto;position:relative;overflow:hidden;border-radius:inherit}img{width:100%;height:100%}*{max-height:inherit;max-width:inherit;min-height:inherit;min-width:inherit;object-fit:inherit}`;
  }
  connectedCallback() {
    super.connectedCallback(), this.img || this.executeLoadingStrategy();
  }
  update(e) {
    e.has("src") && ((this.img = void 0), (this.isRequestInProgress = !1), this.executeLoadingStrategy()),
      super.update(e);
  }
  executeLoadingStrategy() {
    this.loading === Xe.Lazy
      ? this.enableObserver()
      : this.loading === Xe.Action
      ? this.enableUserActions()
      : this.loading === Xe.Eager && this.loadContent();
  }
  observerIsIntersectingCallback() {
    this.isObserved && this.disableObserver(), this.isRequestInProgress || this.loadContent();
  }
  userActionCallback() {
    this.isActionable && this.disableUserActions(), this.isRequestInProgress || this.loadContent();
  }
  disconnectedCallback() {
    super.disconnectedCallback(),
      this.isObserved && this.disableObserver(),
      this.isActionable && this.disableUserActions();
  }
  async loadContent() {
    const { src: e } = this,
      t = new Image();
    (t.onload = () => {
      if (t.src !== new URL(this.src, location.origin).href) return;
      (this.isRequestInProgress = !1),
        (this.img = t),
        this.requestUpdate(),
        this.perfmark &&
          this.updateComplete.then(() => {
            performance.mark(this.perfmark);
          });
      const e = Ye("faceplate-load", { resource: t.src, src: this.src });
      this.dispatchEvent(e);
    }),
      (t.onerror = () => {
        const e = Ye("faceplate-error", new Error("Image failed to load"));
        this.dispatchEvent(e);
      }),
      (this.isRequestInProgress = !0),
      (t.src = e);
  }
  render() {
    const e = this.isRequestInProgress && this.loading === Xe.Action;
    let t = j` <slot name="${ce(e ? "loading" : void 0)}"></slot> `;
    return (
      this.img &&
        (t = j` <img src="${this.img.src}" srcset="${ce(this.srcset)}" sizes="${ce(this.sizes)}" alt="${ce(
          this.alt
        )}"> `),
      j` <div class="${this.img ? "loaded" : "placeholder"}" style="${Te({
        width: this.width ? this.width + "px" : "inherit",
        height: this.height ? this.height + "px" : "inherit",
      })}" tabindex="${ce(this.isActionable ? 0 : void 0)}"> ${t} </div> `
    );
  }
};
$e([Ue({ type: String })], Yo.prototype, "src", void 0),
  $e([Ue({ type: String })], Yo.prototype, "srcset", void 0),
  $e([Ue({ type: String })], Yo.prototype, "sizes", void 0),
  $e([Ue({ type: String })], Yo.prototype, "loading", void 0),
  $e([Ue({ type: Number })], Yo.prototype, "width", void 0),
  $e([Ue({ type: Number })], Yo.prototype, "height", void 0),
  $e([Ue({ type: String })], Yo.prototype, "perfmark", void 0),
  $e([Ue({ type: String })], Yo.prototype, "alt", void 0),
  (Yo = $e([Fe("faceplate-img")], Yo));
let Zo = class extends se {
  constructor() {
    super(...arguments), (this.height = "20"), (this.width = "20");
  }
  static get styles() {
    return o`svg{display:block}`;
  }
  render() {
    return j` <svg width="${this.width}" height="${this.height}" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_1910_351354)"> <rect width="20" height="20" rx="10" fill="#FF4500"/> <g clip-path="url(#clip1_1910_351354)"> <path d="M10 2.14282C8.446 2.14282 6.9269 2.60364 5.6348 3.46699C4.3427 4.33034 3.33563 5.55746 2.74095 6.99317C2.14626 8.42887 1.99066 10.0087 2.29383 11.5328C2.597 13.057 3.34532 14.457 4.44416 15.5558C5.543 16.6546 6.94301 17.403 8.46715 17.7061C9.99128 18.0093 11.5711 17.8537 13.0068 17.259C14.4425 16.6643 15.6696 15.6573 16.533 14.3652C17.3963 13.0731 17.8571 11.554 17.8571 9.99996C17.8549 7.91682 17.0263 5.91966 15.5533 4.44665C14.0803 2.97365 12.0831 2.14511 10 2.14282V2.14282ZM8.44114 8.92589C8.33449 9.1197 8.28032 9.338 8.284 9.55918V12.75H6.80293V6.99225H8.21721V7.69939H8.24786C8.47113 7.45364 8.74367 7.25767 9.04771 7.12425C9.40666 6.96858 9.79506 6.89245 10.1862 6.90111C10.3793 6.89875 10.572 6.91666 10.7614 6.95454C10.8851 6.97351 11.0038 7.01734 11.1102 7.08339L10.5139 8.52282C10.2516 8.37766 9.95461 8.30701 9.65507 8.31854C9.39562 8.31106 9.13829 8.36716 8.9055 8.48196C8.71059 8.58129 8.54913 8.73565 8.44114 8.92589V8.92589ZM10.7197 14.3615H9.49321L13.6929 4.21161C14.0276 4.42524 14.3431 4.66763 14.6357 4.93604L10.7197 14.3615Z" fill="black"/> </g> </g> <defs> <clipPath id="clip0_1910_351354"> <rect width="20" height="20" rx="10" fill="white"/> </clipPath> <clipPath id="clip1_1910_351354"> <rect width="15.7143" height="15.7143" fill="white" transform="translate(2.14286 2.14282)"/> </clipPath> </defs> </svg> `;
  }
};
$e([Ue({ type: String })], Zo.prototype, "height", void 0),
  $e([Ue({ type: String })], Zo.prototype, "width", void 0),
  (Zo = $e([Fe("garlic-bread-icon-community")], Zo));
const Xo = `${CLIENT_CONFIG.REDDIT_ORIGIN}/r/`;
let Ko = class extends vi(se) {
  constructor() {
    super(),
      (this.hostAppType = Tr.Whatever),
      (this.browserType = Cr.Whatever),
      (this.showColorPicker = !1),
      Cn(this, pn),
      Cn(this, fn),
      Cn(this, hn),
      Cn(this, an);
  }
  static get styles() {
    return o`.container{position:absolute;z-index:100;top:0;left:0;opacity:0;transition:opacity .5s ease-in-out}.container.fade-in{opacity:1}.community-pin-button{font-family:var(--garlic-bread-font-pixel);font-size:14px;line-height:20px;font-weight:600;background:0 0;color:#000;border:0;outline:0;padding:5px 13px;cursor:pointer;pointer-events:all;margin:-5px -13px;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;-webkit-text-size-adjust:none;-webkit-user-select:none;user-select:none}.community-pin-button-container{display:flex;justify-items:center;align-items:center}.community-pin-button-container>.community-logo{display:block;border-radius:50%;margin-right:8px}garlic-bread-tooltip{position:absolute}`;
  }
  getEndScale() {
    return hn.getState() / Xt().max;
  }
  getScaleStyles(e) {
    const t = {},
      n = 1 / (e || 1);
    return (
      this.browserType === Cr.Safari || this.hostAppType === Tr.IOS ? (t.zoom = n) : (t.transform = `scale(${n})`), t
    );
  }
  onCommunityPinMouseDown(e, t) {
    e.stopPropagation(),
      0 === e.button
        ? (this.trackEvent(li({ source: ui.GarlicBread, action: hi.Click, noun: di.CommunityPin })),
          null == ri || ri.navigateToDeeplink({ link: `${Xo}${t}` }),
          this.hostAppType !== Tr.WebDesktop &&
            window.setTimeout(() => {
              pn.updateState([]);
            }, 500))
        : 2 === e.button && this.dispatchEvent(Ye("trigger-radar"));
  }
  shouldFadeIn() {
    return pn.getState().length > 0 && !fn.getState() && an.getState() === Gt.FullScreen && !this.showColorPicker;
  }
  render() {
    const e = pn.getState(),
      t = this.getEndScale(),
      n = this.getScaleStyles(t),
      i = (50 * t) / 2,
      r = -15 * t + 15;
    return j`<div class="container ${this.shouldFadeIn() ? "fade-in" : ""}" style="${Te(n)}"> ${e.map((e) => {
      const n = 50 * t * e.coordinates.x + i,
        o = 50 * t * e.coordinates.y - i - r;
      return j`<garlic-bread-tooltip isOpen shouldShowOnZoomedOut name="community-pin-tooltip" style="${Te({
        top: `${o}px`,
        left: `${n}px`,
      })}"><button class="community-pin-button" @mousedown="${(t) =>
        this.onCommunityPinMouseDown(t, e.name)}" @touchstart="${(e) => {
        e.stopPropagation();
      }}" @mouseup="${(e) => {
        e.stopPropagation();
      }}"> <div class="community-pin-button-container"> ${
        e.imageUrl
          ? j`<faceplate-img src="${
              e.imageUrl
            }" alt="${"Image logo of a subreddit"}" class="community-logo" width="28" height="28"></faceplate-img>`
          : j`<garlic-bread-icon-community width="28" height="28" class="community-logo"></garlic-bread-icon-community>`
      } <span class="user-prefix">r/</span>${e.name} </div> </button></garlic-bread-tooltip>`;
    })} </div>`;
  }
};
$e([er({ context: Fo })], Ko.prototype, "hostAppType", void 0),
  $e([er({ context: Vo })], Ko.prototype, "browserType", void 0),
  $e([er({ context: Uo, subscribe: !0 })], Ko.prototype, "showColorPicker", void 0),
  (Ko = $e([Fe("garlic-bread-community-pins-container")], Ko));
var Jo = "Invariant Violation",
  es = Object.setPrototypeOf,
  ts =
    void 0 === es
      ? function (e, t) {
          return (e.__proto__ = t), e;
        }
      : es,
  ns = (function (e) {
    function t(n) {
      void 0 === n && (n = Jo);
      var i =
        e.call(
          this,
          "number" == typeof n ? Jo + ": " + n + " (see https://github.com/apollographql/invariant-packages)" : n
        ) || this;
      return (i.framesToPop = 1), (i.name = Jo), ts(i, t.prototype), i;
    }
    return De(t, e), t;
  })(Error);
function is(e, t) {
  if (!e) throw new ns(t);
}
var rs = ["debug", "log", "warn", "error", "silent"],
  os = rs.indexOf("log");
function ss(e) {
  return function () {
    if (rs.indexOf(e) >= os) return (console[e] || console.log).apply(console, arguments);
  };
}
function as(e) {
  try {
    return e();
  } catch (e) {}
}
!(function (e) {
  (e.debug = ss("debug")), (e.log = ss("log")), (e.warn = ss("warn")), (e.error = ss("error"));
})(is || (is = {}));
var cs =
    as(function () {
      return globalThis;
    }) ||
    as(function () {
      return window;
    }) ||
    as(function () {
      return self;
    }) ||
    as(function () {
      return global;
    }) ||
    as(function () {
      return as.constructor("return this")();
    }),
  ls = "__",
  us = [ls, ls].join("DEV");
var hs = (function () {
  try {
    return Boolean(__DEV__);
  } catch (e) {
    return (
      Object.defineProperty(cs, us, {
        value:
          "production" !==
          as(function () {
            return process.env.NODE_ENV;
          }),
        enumerable: !1,
        configurable: !0,
        writable: !0,
      }),
      cs[us]
    );
  }
})();
function ds(e) {
  try {
    return e();
  } catch (e) {}
}
var ps =
    ds(function () {
      return globalThis;
    }) ||
    ds(function () {
      return window;
    }) ||
    ds(function () {
      return self;
    }) ||
    ds(function () {
      return global;
    }) ||
    ds(function () {
      return ds.constructor("return this")();
    }),
  fs = !1;
function vs() {
  fs && (delete ps.process, (fs = !1));
}
function ms(e) {
  return (
    (ms =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          }),
    ms(e)
  );
}
!ps ||
  ds(function () {
    return process.env.NODE_ENV;
  }) ||
  ds(function () {
    return process;
  }) ||
  (Object.defineProperty(ps, "process", {
    value: { env: { NODE_ENV: "production" } },
    configurable: !0,
    enumerable: !1,
    writable: !0,
  }),
  (fs = !0));
var gs = "function" == typeof Symbol && null != Symbol.toStringTag ? Symbol.toStringTag : "@@toStringTag";
function ys(e, t) {
  for (var n, i = /\r\n|[\n\r]/g, r = 1, o = t + 1; (n = i.exec(e.body)) && n.index < t; )
    (r += 1), (o = t + 1 - (n.index + n[0].length));
  return { line: r, column: o };
}
function bs(e) {
  return xs(e.source, ys(e.source, e.start));
}
function xs(e, t) {
  var n = e.locationOffset.column - 1,
    i = Ss(n) + e.body,
    r = t.line - 1,
    o = e.locationOffset.line - 1,
    s = t.line + o,
    a = 1 === t.line ? n : 0,
    c = t.column + a,
    l = "".concat(e.name, ":").concat(s, ":").concat(c, "\n"),
    u = i.split(/\r\n|[\n\r]/g),
    h = u[r];
  if (h.length > 120) {
    for (var d = Math.floor(c / 80), p = c % 80, f = [], v = 0; v < h.length; v += 80) f.push(h.slice(v, v + 80));
    return (
      l +
      ws(
        [["".concat(s), f[0]]].concat(
          f.slice(1, d + 1).map(function (e) {
            return ["", e];
          }),
          [
            [" ", Ss(p - 1) + "^"],
            ["", f[d + 1]],
          ]
        )
      )
    );
  }
  return (
    l +
    ws([
      ["".concat(s - 1), u[r - 1]],
      ["".concat(s), h],
      ["", Ss(c - 1) + "^"],
      ["".concat(s + 1), u[r + 1]],
    ])
  );
}
function ws(e) {
  var t = e.filter(function (e) {
      return e[0], void 0 !== e[1];
    }),
    n = Math.max.apply(
      Math,
      t.map(function (e) {
        return e[0].length;
      })
    );
  return t
    .map(function (e) {
      var t,
        i = e[0],
        r = e[1];
      return Ss(n - (t = i).length) + t + (r ? " | " + r : " |");
    })
    .join("\n");
}
function Ss(e) {
  return Array(e + 1).join(" ");
}
function _s(e) {
  return (
    (_s =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          }),
    _s(e)
  );
}
function Ts(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    (i.enumerable = i.enumerable || !1),
      (i.configurable = !0),
      "value" in i && (i.writable = !0),
      Object.defineProperty(e, i.key, i);
  }
}
function Cs(e, t) {
  return !t || ("object" !== _s(t) && "function" != typeof t) ? Es(e) : t;
}
function Es(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function ks(e) {
  var t = "function" == typeof Map ? new Map() : void 0;
  return (
    (ks = function (e) {
      if (null === e || ((n = e), -1 === Function.toString.call(n).indexOf("[native code]"))) return e;
      var n;
      if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
      if (void 0 !== t) {
        if (t.has(e)) return t.get(e);
        t.set(e, i);
      }
      function i() {
        return As(e, arguments, Ms(this).constructor);
      }
      return (
        (i.prototype = Object.create(e.prototype, {
          constructor: { value: i, enumerable: !1, writable: !0, configurable: !0 },
        })),
        Is(i, e)
      );
    }),
    ks(e)
  );
}
function As(e, t, n) {
  return (
    (As = Os()
      ? Reflect.construct
      : function (e, t, n) {
          var i = [null];
          i.push.apply(i, t);
          var r = new (Function.bind.apply(e, i))();
          return n && Is(r, n.prototype), r;
        }),
    As.apply(null, arguments)
  );
}
function Os() {
  if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" == typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function Is(e, t) {
  return (
    (Is =
      Object.setPrototypeOf ||
      function (e, t) {
        return (e.__proto__ = t), e;
      }),
    Is(e, t)
  );
}
function Ms(e) {
  return (
    (Ms = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        }),
    Ms(e)
  );
}
var Ps = (function (e) {
  !(function (e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
    (e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
      t && Is(e, t);
  })(a, ks(Error));
  var t,
    n,
    i,
    r,
    o,
    s =
      ((t = a),
      (n = Os()),
      function () {
        var e,
          i = Ms(t);
        if (n) {
          var r = Ms(this).constructor;
          e = Reflect.construct(i, arguments, r);
        } else e = i.apply(this, arguments);
        return Cs(this, e);
      });
  function a(e, t, n, i, r, o, c) {
    var l, u, h, d, p;
    !(function (e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    })(this, a),
      (p = s.call(this, e));
    var f,
      v = Array.isArray(t) ? (0 !== t.length ? t : void 0) : t ? [t] : void 0,
      m = n;
    !m && v && (m = null === (f = v[0].loc) || void 0 === f ? void 0 : f.source);
    var g,
      y = i;
    !y &&
      v &&
      (y = v.reduce(function (e, t) {
        return t.loc && e.push(t.loc.start), e;
      }, [])),
      y && 0 === y.length && (y = void 0),
      i && n
        ? (g = i.map(function (e) {
            return ys(n, e);
          }))
        : v &&
          (g = v.reduce(function (e, t) {
            return t.loc && e.push(ys(t.loc.source, t.loc.start)), e;
          }, []));
    var b,
      x = c;
    if (null == x && null != o) {
      var w = o.extensions;
      "object" == ms((b = w)) && null !== b && (x = w);
    }
    return (
      Object.defineProperties(Es(p), {
        name: { value: "GraphQLError" },
        message: { value: e, enumerable: !0, writable: !0 },
        locations: { value: null !== (l = g) && void 0 !== l ? l : void 0, enumerable: null != g },
        path: { value: null != r ? r : void 0, enumerable: null != r },
        nodes: { value: null != v ? v : void 0 },
        source: { value: null !== (u = m) && void 0 !== u ? u : void 0 },
        positions: { value: null !== (h = y) && void 0 !== h ? h : void 0 },
        originalError: { value: o },
        extensions: { value: null !== (d = x) && void 0 !== d ? d : void 0, enumerable: null != x },
      }),
      null != o && o.stack
        ? (Object.defineProperty(Es(p), "stack", { value: o.stack, writable: !0, configurable: !0 }), Cs(p))
        : (Error.captureStackTrace
            ? Error.captureStackTrace(Es(p), a)
            : Object.defineProperty(Es(p), "stack", { value: Error().stack, writable: !0, configurable: !0 }),
          p)
    );
  }
  return (
    (i = a),
    (r = [
      {
        key: "toString",
        value: function () {
          return (function (e) {
            var t = e.message;
            if (e.nodes)
              for (var n = 0, i = e.nodes; n < i.length; n++) {
                var r = i[n];
                r.loc && (t += "\n\n" + bs(r.loc));
              }
            else if (e.source && e.locations)
              for (var o = 0, s = e.locations; o < s.length; o++) {
                var a = s[o];
                t += "\n\n" + xs(e.source, a);
              }
            return t;
          })(this);
        },
      },
      {
        key: gs,
        get: function () {
          return "Object";
        },
      },
    ]) && Ts(i.prototype, r),
    o && Ts(i, o),
    a
  );
})();
function Ds(e, t, n) {
  return new Ps("Syntax Error: ".concat(n), void 0, e, [t]);
}
var Rs = Object.freeze({
  NAME: "Name",
  DOCUMENT: "Document",
  OPERATION_DEFINITION: "OperationDefinition",
  VARIABLE_DEFINITION: "VariableDefinition",
  SELECTION_SET: "SelectionSet",
  FIELD: "Field",
  ARGUMENT: "Argument",
  FRAGMENT_SPREAD: "FragmentSpread",
  INLINE_FRAGMENT: "InlineFragment",
  FRAGMENT_DEFINITION: "FragmentDefinition",
  VARIABLE: "Variable",
  INT: "IntValue",
  FLOAT: "FloatValue",
  STRING: "StringValue",
  BOOLEAN: "BooleanValue",
  NULL: "NullValue",
  ENUM: "EnumValue",
  LIST: "ListValue",
  OBJECT: "ObjectValue",
  OBJECT_FIELD: "ObjectField",
  DIRECTIVE: "Directive",
  NAMED_TYPE: "NamedType",
  LIST_TYPE: "ListType",
  NON_NULL_TYPE: "NonNullType",
  SCHEMA_DEFINITION: "SchemaDefinition",
  OPERATION_TYPE_DEFINITION: "OperationTypeDefinition",
  SCALAR_TYPE_DEFINITION: "ScalarTypeDefinition",
  OBJECT_TYPE_DEFINITION: "ObjectTypeDefinition",
  FIELD_DEFINITION: "FieldDefinition",
  INPUT_VALUE_DEFINITION: "InputValueDefinition",
  INTERFACE_TYPE_DEFINITION: "InterfaceTypeDefinition",
  UNION_TYPE_DEFINITION: "UnionTypeDefinition",
  ENUM_TYPE_DEFINITION: "EnumTypeDefinition",
  ENUM_VALUE_DEFINITION: "EnumValueDefinition",
  INPUT_OBJECT_TYPE_DEFINITION: "InputObjectTypeDefinition",
  DIRECTIVE_DEFINITION: "DirectiveDefinition",
  SCHEMA_EXTENSION: "SchemaExtension",
  SCALAR_TYPE_EXTENSION: "ScalarTypeExtension",
  OBJECT_TYPE_EXTENSION: "ObjectTypeExtension",
  INTERFACE_TYPE_EXTENSION: "InterfaceTypeExtension",
  UNION_TYPE_EXTENSION: "UnionTypeExtension",
  ENUM_TYPE_EXTENSION: "EnumTypeExtension",
  INPUT_OBJECT_TYPE_EXTENSION: "InputObjectTypeExtension",
});
var Ns =
  "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : void 0;
function $s(e) {
  var t = e.prototype.toJSON;
  "function" == typeof t ||
    (function (e, t) {
      if (!Boolean(e)) throw new Error(null != t ? t : "Unexpected invariant triggered.");
    })(0),
    (e.prototype.inspect = t),
    Ns && (e.prototype[Ns] = t);
}
var Ls = (function () {
  function e(e, t, n) {
    (this.start = e.start), (this.end = t.end), (this.startToken = e), (this.endToken = t), (this.source = n);
  }
  return (
    (e.prototype.toJSON = function () {
      return { start: this.start, end: this.end };
    }),
    e
  );
})();
$s(Ls);
var js = (function () {
  function e(e, t, n, i, r, o, s) {
    (this.kind = e),
      (this.start = t),
      (this.end = n),
      (this.line = i),
      (this.column = r),
      (this.value = s),
      (this.prev = o),
      (this.next = null);
  }
  return (
    (e.prototype.toJSON = function () {
      return { kind: this.kind, value: this.value, line: this.line, column: this.column };
    }),
    e
  );
})();
function zs(e) {
  return null != e && "string" == typeof e.kind;
}
$s(js);
var Fs = Object.freeze({
  SOF: "<SOF>",
  EOF: "<EOF>",
  BANG: "!",
  DOLLAR: "$",
  AMP: "&",
  PAREN_L: "(",
  PAREN_R: ")",
  SPREAD: "...",
  COLON: ":",
  EQUALS: "=",
  AT: "@",
  BRACKET_L: "[",
  BRACKET_R: "]",
  BRACE_L: "{",
  PIPE: "|",
  BRACE_R: "}",
  NAME: "Name",
  INT: "Int",
  FLOAT: "Float",
  STRING: "String",
  BLOCK_STRING: "BlockString",
  COMMENT: "Comment",
});
function Vs(e) {
  return (
    (Vs =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          }),
    Vs(e)
  );
}
var Us = 10,
  Bs = 2;
function Hs(e) {
  return qs(e, []);
}
function qs(e, t) {
  switch (Vs(e)) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? "[function ".concat(e.name, "]") : "[function]";
    case "object":
      return null === e
        ? "null"
        : (function (e, t) {
            if (-1 !== t.indexOf(e)) return "[Circular]";
            var n = [].concat(t, [e]),
              i = (function (e) {
                var t = e[String(Ns)];
                if ("function" == typeof t) return t;
                if ("function" == typeof e.inspect) return e.inspect;
              })(e);
            if (void 0 !== i) {
              var r = i.call(e);
              if (r !== e) return "string" == typeof r ? r : qs(r, n);
            } else if (Array.isArray(e))
              return (function (e, t) {
                if (0 === e.length) return "[]";
                if (t.length > Bs) return "[Array]";
                for (var n = Math.min(Us, e.length), i = e.length - n, r = [], o = 0; o < n; ++o) r.push(qs(e[o], t));
                1 === i ? r.push("... 1 more item") : i > 1 && r.push("... ".concat(i, " more items"));
                return "[" + r.join(", ") + "]";
              })(e, n);
            return (function (e, t) {
              var n = Object.keys(e);
              if (0 === n.length) return "{}";
              if (t.length > Bs)
                return (
                  "[" +
                  (function (e) {
                    var t = Object.prototype.toString
                      .call(e)
                      .replace(/^\[object /, "")
                      .replace(/]$/, "");
                    if ("Object" === t && "function" == typeof e.constructor) {
                      var n = e.constructor.name;
                      if ("string" == typeof n && "" !== n) return n;
                    }
                    return t;
                  })(e) +
                  "]"
                );
              var i = n.map(function (n) {
                return n + ": " + qs(e[n], t);
              });
              return "{ " + i.join(", ") + " }";
            })(e, n);
          })(e, t);
    default:
      return String(e);
  }
}
function Qs(e, t) {
  if (!Boolean(e)) throw new Error(t);
}
var Gs =
  "production" === process.env.NODE_ENV
    ? function (e, t) {
        return e instanceof t;
      }
    : function (e, t) {
        if (e instanceof t) return !0;
        if (e) {
          var n = e.constructor,
            i = t.name;
          if (i && n && n.name === i)
            throw new Error(
              "Cannot use "
                .concat(i, ' "')
                .concat(
                  e,
                  '" from another module or realm.\n\nEnsure that there is only one instance of "graphql" in the node_modules\ndirectory. If different versions of "graphql" are the dependencies of other\nrelied on modules, use "resolutions" to ensure only one version is installed.\n\nhttps://yarnpkg.com/en/docs/selective-version-resolutions\n\nDuplicate "graphql" modules cannot be used at the same time since different\nversions may have different capabilities and behavior. The data from one\nversion used in the function from another could produce confusing and\nspurious results.'
                )
            );
        }
        return !1;
      };
function Ws(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    (i.enumerable = i.enumerable || !1),
      (i.configurable = !0),
      "value" in i && (i.writable = !0),
      Object.defineProperty(e, i.key, i);
  }
}
var Ys = (function () {
  function e(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "GraphQL request",
      n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { line: 1, column: 1 };
    "string" == typeof e || Qs(0, "Body must be a string. Received: ".concat(Hs(e), ".")),
      (this.body = e),
      (this.name = t),
      (this.locationOffset = n),
      this.locationOffset.line > 0 || Qs(0, "line in locationOffset is 1-indexed and must be positive."),
      this.locationOffset.column > 0 || Qs(0, "column in locationOffset is 1-indexed and must be positive.");
  }
  var t, n, i;
  return (
    (t = e),
    (n = [
      {
        key: gs,
        get: function () {
          return "Source";
        },
      },
    ]) && Ws(t.prototype, n),
    i && Ws(t, i),
    e
  );
})();
var Zs = Object.freeze({
  QUERY: "QUERY",
  MUTATION: "MUTATION",
  SUBSCRIPTION: "SUBSCRIPTION",
  FIELD: "FIELD",
  FRAGMENT_DEFINITION: "FRAGMENT_DEFINITION",
  FRAGMENT_SPREAD: "FRAGMENT_SPREAD",
  INLINE_FRAGMENT: "INLINE_FRAGMENT",
  VARIABLE_DEFINITION: "VARIABLE_DEFINITION",
  SCHEMA: "SCHEMA",
  SCALAR: "SCALAR",
  OBJECT: "OBJECT",
  FIELD_DEFINITION: "FIELD_DEFINITION",
  ARGUMENT_DEFINITION: "ARGUMENT_DEFINITION",
  INTERFACE: "INTERFACE",
  UNION: "UNION",
  ENUM: "ENUM",
  ENUM_VALUE: "ENUM_VALUE",
  INPUT_OBJECT: "INPUT_OBJECT",
  INPUT_FIELD_DEFINITION: "INPUT_FIELD_DEFINITION",
});
function Xs(e) {
  var t = e.split(/\r\n|[\n\r]/g),
    n = (function (e) {
      for (var t, n = !0, i = !0, r = 0, o = null, s = 0; s < e.length; ++s)
        switch (e.charCodeAt(s)) {
          case 13:
            10 === e.charCodeAt(s + 1) && ++s;
          case 10:
            (n = !1), (i = !0), (r = 0);
            break;
          case 9:
          case 32:
            ++r;
            break;
          default:
            i && !n && (null === o || r < o) && (o = r), (i = !1);
        }
      return null !== (t = o) && void 0 !== t ? t : 0;
    })(e);
  if (0 !== n) for (var i = 1; i < t.length; i++) t[i] = t[i].slice(n);
  for (var r = 0; r < t.length && Ks(t[r]); ) ++r;
  for (var o = t.length; o > r && Ks(t[o - 1]); ) --o;
  return t.slice(r, o).join("\n");
}
function Ks(e) {
  for (var t = 0; t < e.length; ++t) if (" " !== e[t] && "\t" !== e[t]) return !1;
  return !0;
}
var Js = (function () {
  function e(e) {
    var t = new js(Fs.SOF, 0, 0, 0, 0, null);
    (this.source = e), (this.lastToken = t), (this.token = t), (this.line = 1), (this.lineStart = 0);
  }
  var t = e.prototype;
  return (
    (t.advance = function () {
      return (this.lastToken = this.token), (this.token = this.lookahead());
    }),
    (t.lookahead = function () {
      var e = this.token;
      if (e.kind !== Fs.EOF)
        do {
          var t;
          e = null !== (t = e.next) && void 0 !== t ? t : (e.next = ta(this, e));
        } while (e.kind === Fs.COMMENT);
      return e;
    }),
    e
  );
})();
function ea(e) {
  return isNaN(e)
    ? Fs.EOF
    : e < 127
    ? JSON.stringify(String.fromCharCode(e))
    : '"\\u'.concat(("00" + e.toString(16).toUpperCase()).slice(-4), '"');
}
function ta(e, t) {
  for (var n = e.source, i = n.body, r = i.length, o = t.end; o < r; ) {
    var s = i.charCodeAt(o),
      a = e.line,
      c = 1 + o - e.lineStart;
    switch (s) {
      case 65279:
      case 9:
      case 32:
      case 44:
        ++o;
        continue;
      case 10:
        ++o, ++e.line, (e.lineStart = o);
        continue;
      case 13:
        10 === i.charCodeAt(o + 1) ? (o += 2) : ++o, ++e.line, (e.lineStart = o);
        continue;
      case 33:
        return new js(Fs.BANG, o, o + 1, a, c, t);
      case 35:
        return ia(n, o, a, c, t);
      case 36:
        return new js(Fs.DOLLAR, o, o + 1, a, c, t);
      case 38:
        return new js(Fs.AMP, o, o + 1, a, c, t);
      case 40:
        return new js(Fs.PAREN_L, o, o + 1, a, c, t);
      case 41:
        return new js(Fs.PAREN_R, o, o + 1, a, c, t);
      case 46:
        if (46 === i.charCodeAt(o + 1) && 46 === i.charCodeAt(o + 2)) return new js(Fs.SPREAD, o, o + 3, a, c, t);
        break;
      case 58:
        return new js(Fs.COLON, o, o + 1, a, c, t);
      case 61:
        return new js(Fs.EQUALS, o, o + 1, a, c, t);
      case 64:
        return new js(Fs.AT, o, o + 1, a, c, t);
      case 91:
        return new js(Fs.BRACKET_L, o, o + 1, a, c, t);
      case 93:
        return new js(Fs.BRACKET_R, o, o + 1, a, c, t);
      case 123:
        return new js(Fs.BRACE_L, o, o + 1, a, c, t);
      case 124:
        return new js(Fs.PIPE, o, o + 1, a, c, t);
      case 125:
        return new js(Fs.BRACE_R, o, o + 1, a, c, t);
      case 34:
        return 34 === i.charCodeAt(o + 1) && 34 === i.charCodeAt(o + 2) ? aa(n, o, a, c, t, e) : sa(n, o, a, c, t);
      case 45:
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        return ra(n, o, s, a, c, t);
      case 65:
      case 66:
      case 67:
      case 68:
      case 69:
      case 70:
      case 71:
      case 72:
      case 73:
      case 74:
      case 75:
      case 76:
      case 77:
      case 78:
      case 79:
      case 80:
      case 81:
      case 82:
      case 83:
      case 84:
      case 85:
      case 86:
      case 87:
      case 88:
      case 89:
      case 90:
      case 95:
      case 97:
      case 98:
      case 99:
      case 100:
      case 101:
      case 102:
      case 103:
      case 104:
      case 105:
      case 106:
      case 107:
      case 108:
      case 109:
      case 110:
      case 111:
      case 112:
      case 113:
      case 114:
      case 115:
      case 116:
      case 117:
      case 118:
      case 119:
      case 120:
      case 121:
      case 122:
        return ua(n, o, a, c, t);
    }
    throw Ds(n, o, na(s));
  }
  var l = e.line,
    u = 1 + o - e.lineStart;
  return new js(Fs.EOF, r, r, l, u, t);
}
function na(e) {
  return e < 32 && 9 !== e && 10 !== e && 13 !== e
    ? "Cannot contain the invalid character ".concat(ea(e), ".")
    : 39 === e
    ? "Unexpected single quote character ('), did you mean to use a double quote (\")?"
    : "Cannot parse the unexpected character ".concat(ea(e), ".");
}
function ia(e, t, n, i, r) {
  var o,
    s = e.body,
    a = t;
  do {
    o = s.charCodeAt(++a);
  } while (!isNaN(o) && (o > 31 || 9 === o));
  return new js(Fs.COMMENT, t, a, n, i, r, s.slice(t + 1, a));
}
function ra(e, t, n, i, r, o) {
  var s = e.body,
    a = n,
    c = t,
    l = !1;
  if ((45 === a && (a = s.charCodeAt(++c)), 48 === a)) {
    if ((a = s.charCodeAt(++c)) >= 48 && a <= 57)
      throw Ds(e, c, "Invalid number, unexpected digit after 0: ".concat(ea(a), "."));
  } else (c = oa(e, c, a)), (a = s.charCodeAt(c));
  if (
    (46 === a && ((l = !0), (a = s.charCodeAt(++c)), (c = oa(e, c, a)), (a = s.charCodeAt(c))),
    (69 !== a && 101 !== a) ||
      ((l = !0),
      (43 !== (a = s.charCodeAt(++c)) && 45 !== a) || (a = s.charCodeAt(++c)),
      (c = oa(e, c, a)),
      (a = s.charCodeAt(c))),
    46 === a ||
      (function (e) {
        return 95 === e || (e >= 65 && e <= 90) || (e >= 97 && e <= 122);
      })(a))
  )
    throw Ds(e, c, "Invalid number, expected digit but got: ".concat(ea(a), "."));
  return new js(l ? Fs.FLOAT : Fs.INT, t, c, i, r, o, s.slice(t, c));
}
function oa(e, t, n) {
  var i = e.body,
    r = t,
    o = n;
  if (o >= 48 && o <= 57) {
    do {
      o = i.charCodeAt(++r);
    } while (o >= 48 && o <= 57);
    return r;
  }
  throw Ds(e, r, "Invalid number, expected digit but got: ".concat(ea(o), "."));
}
function sa(e, t, n, i, r) {
  for (
    var o = e.body, s = t + 1, a = s, c = 0, l = "";
    s < o.length && !isNaN((c = o.charCodeAt(s))) && 10 !== c && 13 !== c;

  ) {
    if (34 === c) return (l += o.slice(a, s)), new js(Fs.STRING, t, s + 1, n, i, r, l);
    if (c < 32 && 9 !== c) throw Ds(e, s, "Invalid character within String: ".concat(ea(c), "."));
    if ((++s, 92 === c)) {
      switch (((l += o.slice(a, s - 1)), (c = o.charCodeAt(s)))) {
        case 34:
          l += '"';
          break;
        case 47:
          l += "/";
          break;
        case 92:
          l += "\\";
          break;
        case 98:
          l += "\b";
          break;
        case 102:
          l += "\f";
          break;
        case 110:
          l += "\n";
          break;
        case 114:
          l += "\r";
          break;
        case 116:
          l += "\t";
          break;
        case 117:
          var u = ca(o.charCodeAt(s + 1), o.charCodeAt(s + 2), o.charCodeAt(s + 3), o.charCodeAt(s + 4));
          if (u < 0) {
            var h = o.slice(s + 1, s + 5);
            throw Ds(e, s, "Invalid character escape sequence: \\u".concat(h, "."));
          }
          (l += String.fromCharCode(u)), (s += 4);
          break;
        default:
          throw Ds(e, s, "Invalid character escape sequence: \\".concat(String.fromCharCode(c), "."));
      }
      a = ++s;
    }
  }
  throw Ds(e, s, "Unterminated string.");
}
function aa(e, t, n, i, r, o) {
  for (var s = e.body, a = t + 3, c = a, l = 0, u = ""; a < s.length && !isNaN((l = s.charCodeAt(a))); ) {
    if (34 === l && 34 === s.charCodeAt(a + 1) && 34 === s.charCodeAt(a + 2))
      return (u += s.slice(c, a)), new js(Fs.BLOCK_STRING, t, a + 3, n, i, r, Xs(u));
    if (l < 32 && 9 !== l && 10 !== l && 13 !== l)
      throw Ds(e, a, "Invalid character within String: ".concat(ea(l), "."));
    10 === l
      ? (++a, ++o.line, (o.lineStart = a))
      : 13 === l
      ? (10 === s.charCodeAt(a + 1) ? (a += 2) : ++a, ++o.line, (o.lineStart = a))
      : 92 === l && 34 === s.charCodeAt(a + 1) && 34 === s.charCodeAt(a + 2) && 34 === s.charCodeAt(a + 3)
      ? ((u += s.slice(c, a) + '"""'), (c = a += 4))
      : ++a;
  }
  throw Ds(e, a, "Unterminated string.");
}
function ca(e, t, n, i) {
  return (la(e) << 12) | (la(t) << 8) | (la(n) << 4) | la(i);
}
function la(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function ua(e, t, n, i, r) {
  for (
    var o = e.body, s = o.length, a = t + 1, c = 0;
    a !== s &&
    !isNaN((c = o.charCodeAt(a))) &&
    (95 === c || (c >= 48 && c <= 57) || (c >= 65 && c <= 90) || (c >= 97 && c <= 122));

  )
    ++a;
  return new js(Fs.NAME, t, a, n, i, r, o.slice(t, a));
}
var ha = (function () {
  function e(e, t) {
    var n = (function (e) {
      return Gs(e, Ys);
    })(e)
      ? e
      : new Ys(e);
    (this._lexer = new Js(n)), (this._options = t);
  }
  var t = e.prototype;
  return (
    (t.parseName = function () {
      var e = this.expectToken(Fs.NAME);
      return { kind: Rs.NAME, value: e.value, loc: this.loc(e) };
    }),
    (t.parseDocument = function () {
      var e = this._lexer.token;
      return { kind: Rs.DOCUMENT, definitions: this.many(Fs.SOF, this.parseDefinition, Fs.EOF), loc: this.loc(e) };
    }),
    (t.parseDefinition = function () {
      if (this.peek(Fs.NAME))
        switch (this._lexer.token.value) {
          case "query":
          case "mutation":
          case "subscription":
            return this.parseOperationDefinition();
          case "fragment":
            return this.parseFragmentDefinition();
          case "schema":
          case "scalar":
          case "type":
          case "interface":
          case "union":
          case "enum":
          case "input":
          case "directive":
            return this.parseTypeSystemDefinition();
          case "extend":
            return this.parseTypeSystemExtension();
        }
      else {
        if (this.peek(Fs.BRACE_L)) return this.parseOperationDefinition();
        if (this.peekDescription()) return this.parseTypeSystemDefinition();
      }
      throw this.unexpected();
    }),
    (t.parseOperationDefinition = function () {
      var e = this._lexer.token;
      if (this.peek(Fs.BRACE_L))
        return {
          kind: Rs.OPERATION_DEFINITION,
          operation: "query",
          name: void 0,
          variableDefinitions: [],
          directives: [],
          selectionSet: this.parseSelectionSet(),
          loc: this.loc(e),
        };
      var t,
        n = this.parseOperationType();
      return (
        this.peek(Fs.NAME) && (t = this.parseName()),
        {
          kind: Rs.OPERATION_DEFINITION,
          operation: n,
          name: t,
          variableDefinitions: this.parseVariableDefinitions(),
          directives: this.parseDirectives(!1),
          selectionSet: this.parseSelectionSet(),
          loc: this.loc(e),
        }
      );
    }),
    (t.parseOperationType = function () {
      var e = this.expectToken(Fs.NAME);
      switch (e.value) {
        case "query":
          return "query";
        case "mutation":
          return "mutation";
        case "subscription":
          return "subscription";
      }
      throw this.unexpected(e);
    }),
    (t.parseVariableDefinitions = function () {
      return this.optionalMany(Fs.PAREN_L, this.parseVariableDefinition, Fs.PAREN_R);
    }),
    (t.parseVariableDefinition = function () {
      var e = this._lexer.token;
      return {
        kind: Rs.VARIABLE_DEFINITION,
        variable: this.parseVariable(),
        type: (this.expectToken(Fs.COLON), this.parseTypeReference()),
        defaultValue: this.expectOptionalToken(Fs.EQUALS) ? this.parseValueLiteral(!0) : void 0,
        directives: this.parseDirectives(!0),
        loc: this.loc(e),
      };
    }),
    (t.parseVariable = function () {
      var e = this._lexer.token;
      return this.expectToken(Fs.DOLLAR), { kind: Rs.VARIABLE, name: this.parseName(), loc: this.loc(e) };
    }),
    (t.parseSelectionSet = function () {
      var e = this._lexer.token;
      return {
        kind: Rs.SELECTION_SET,
        selections: this.many(Fs.BRACE_L, this.parseSelection, Fs.BRACE_R),
        loc: this.loc(e),
      };
    }),
    (t.parseSelection = function () {
      return this.peek(Fs.SPREAD) ? this.parseFragment() : this.parseField();
    }),
    (t.parseField = function () {
      var e,
        t,
        n = this._lexer.token,
        i = this.parseName();
      return (
        this.expectOptionalToken(Fs.COLON) ? ((e = i), (t = this.parseName())) : (t = i),
        {
          kind: Rs.FIELD,
          alias: e,
          name: t,
          arguments: this.parseArguments(!1),
          directives: this.parseDirectives(!1),
          selectionSet: this.peek(Fs.BRACE_L) ? this.parseSelectionSet() : void 0,
          loc: this.loc(n),
        }
      );
    }),
    (t.parseArguments = function (e) {
      var t = e ? this.parseConstArgument : this.parseArgument;
      return this.optionalMany(Fs.PAREN_L, t, Fs.PAREN_R);
    }),
    (t.parseArgument = function () {
      var e = this._lexer.token,
        t = this.parseName();
      return (
        this.expectToken(Fs.COLON), { kind: Rs.ARGUMENT, name: t, value: this.parseValueLiteral(!1), loc: this.loc(e) }
      );
    }),
    (t.parseConstArgument = function () {
      var e = this._lexer.token;
      return {
        kind: Rs.ARGUMENT,
        name: this.parseName(),
        value: (this.expectToken(Fs.COLON), this.parseValueLiteral(!0)),
        loc: this.loc(e),
      };
    }),
    (t.parseFragment = function () {
      var e = this._lexer.token;
      this.expectToken(Fs.SPREAD);
      var t = this.expectOptionalKeyword("on");
      return !t && this.peek(Fs.NAME)
        ? {
            kind: Rs.FRAGMENT_SPREAD,
            name: this.parseFragmentName(),
            directives: this.parseDirectives(!1),
            loc: this.loc(e),
          }
        : {
            kind: Rs.INLINE_FRAGMENT,
            typeCondition: t ? this.parseNamedType() : void 0,
            directives: this.parseDirectives(!1),
            selectionSet: this.parseSelectionSet(),
            loc: this.loc(e),
          };
    }),
    (t.parseFragmentDefinition = function () {
      var e,
        t = this._lexer.token;
      return (
        this.expectKeyword("fragment"),
        !0 === (null === (e = this._options) || void 0 === e ? void 0 : e.experimentalFragmentVariables)
          ? {
              kind: Rs.FRAGMENT_DEFINITION,
              name: this.parseFragmentName(),
              variableDefinitions: this.parseVariableDefinitions(),
              typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
              directives: this.parseDirectives(!1),
              selectionSet: this.parseSelectionSet(),
              loc: this.loc(t),
            }
          : {
              kind: Rs.FRAGMENT_DEFINITION,
              name: this.parseFragmentName(),
              typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
              directives: this.parseDirectives(!1),
              selectionSet: this.parseSelectionSet(),
              loc: this.loc(t),
            }
      );
    }),
    (t.parseFragmentName = function () {
      if ("on" === this._lexer.token.value) throw this.unexpected();
      return this.parseName();
    }),
    (t.parseValueLiteral = function (e) {
      var t = this._lexer.token;
      switch (t.kind) {
        case Fs.BRACKET_L:
          return this.parseList(e);
        case Fs.BRACE_L:
          return this.parseObject(e);
        case Fs.INT:
          return this._lexer.advance(), { kind: Rs.INT, value: t.value, loc: this.loc(t) };
        case Fs.FLOAT:
          return this._lexer.advance(), { kind: Rs.FLOAT, value: t.value, loc: this.loc(t) };
        case Fs.STRING:
        case Fs.BLOCK_STRING:
          return this.parseStringLiteral();
        case Fs.NAME:
          switch ((this._lexer.advance(), t.value)) {
            case "true":
              return { kind: Rs.BOOLEAN, value: !0, loc: this.loc(t) };
            case "false":
              return { kind: Rs.BOOLEAN, value: !1, loc: this.loc(t) };
            case "null":
              return { kind: Rs.NULL, loc: this.loc(t) };
            default:
              return { kind: Rs.ENUM, value: t.value, loc: this.loc(t) };
          }
        case Fs.DOLLAR:
          if (!e) return this.parseVariable();
      }
      throw this.unexpected();
    }),
    (t.parseStringLiteral = function () {
      var e = this._lexer.token;
      return (
        this._lexer.advance(), { kind: Rs.STRING, value: e.value, block: e.kind === Fs.BLOCK_STRING, loc: this.loc(e) }
      );
    }),
    (t.parseList = function (e) {
      var t = this,
        n = this._lexer.token;
      return {
        kind: Rs.LIST,
        values: this.any(
          Fs.BRACKET_L,
          function () {
            return t.parseValueLiteral(e);
          },
          Fs.BRACKET_R
        ),
        loc: this.loc(n),
      };
    }),
    (t.parseObject = function (e) {
      var t = this,
        n = this._lexer.token;
      return {
        kind: Rs.OBJECT,
        fields: this.any(
          Fs.BRACE_L,
          function () {
            return t.parseObjectField(e);
          },
          Fs.BRACE_R
        ),
        loc: this.loc(n),
      };
    }),
    (t.parseObjectField = function (e) {
      var t = this._lexer.token,
        n = this.parseName();
      return (
        this.expectToken(Fs.COLON),
        { kind: Rs.OBJECT_FIELD, name: n, value: this.parseValueLiteral(e), loc: this.loc(t) }
      );
    }),
    (t.parseDirectives = function (e) {
      for (var t = []; this.peek(Fs.AT); ) t.push(this.parseDirective(e));
      return t;
    }),
    (t.parseDirective = function (e) {
      var t = this._lexer.token;
      return (
        this.expectToken(Fs.AT),
        { kind: Rs.DIRECTIVE, name: this.parseName(), arguments: this.parseArguments(e), loc: this.loc(t) }
      );
    }),
    (t.parseTypeReference = function () {
      var e,
        t = this._lexer.token;
      return (
        this.expectOptionalToken(Fs.BRACKET_L)
          ? ((e = this.parseTypeReference()),
            this.expectToken(Fs.BRACKET_R),
            (e = { kind: Rs.LIST_TYPE, type: e, loc: this.loc(t) }))
          : (e = this.parseNamedType()),
        this.expectOptionalToken(Fs.BANG) ? { kind: Rs.NON_NULL_TYPE, type: e, loc: this.loc(t) } : e
      );
    }),
    (t.parseNamedType = function () {
      var e = this._lexer.token;
      return { kind: Rs.NAMED_TYPE, name: this.parseName(), loc: this.loc(e) };
    }),
    (t.parseTypeSystemDefinition = function () {
      var e = this.peekDescription() ? this._lexer.lookahead() : this._lexer.token;
      if (e.kind === Fs.NAME)
        switch (e.value) {
          case "schema":
            return this.parseSchemaDefinition();
          case "scalar":
            return this.parseScalarTypeDefinition();
          case "type":
            return this.parseObjectTypeDefinition();
          case "interface":
            return this.parseInterfaceTypeDefinition();
          case "union":
            return this.parseUnionTypeDefinition();
          case "enum":
            return this.parseEnumTypeDefinition();
          case "input":
            return this.parseInputObjectTypeDefinition();
          case "directive":
            return this.parseDirectiveDefinition();
        }
      throw this.unexpected(e);
    }),
    (t.peekDescription = function () {
      return this.peek(Fs.STRING) || this.peek(Fs.BLOCK_STRING);
    }),
    (t.parseDescription = function () {
      if (this.peekDescription()) return this.parseStringLiteral();
    }),
    (t.parseSchemaDefinition = function () {
      var e = this._lexer.token,
        t = this.parseDescription();
      this.expectKeyword("schema");
      var n = this.parseDirectives(!0),
        i = this.many(Fs.BRACE_L, this.parseOperationTypeDefinition, Fs.BRACE_R);
      return { kind: Rs.SCHEMA_DEFINITION, description: t, directives: n, operationTypes: i, loc: this.loc(e) };
    }),
    (t.parseOperationTypeDefinition = function () {
      var e = this._lexer.token,
        t = this.parseOperationType();
      this.expectToken(Fs.COLON);
      var n = this.parseNamedType();
      return { kind: Rs.OPERATION_TYPE_DEFINITION, operation: t, type: n, loc: this.loc(e) };
    }),
    (t.parseScalarTypeDefinition = function () {
      var e = this._lexer.token,
        t = this.parseDescription();
      this.expectKeyword("scalar");
      var n = this.parseName(),
        i = this.parseDirectives(!0);
      return { kind: Rs.SCALAR_TYPE_DEFINITION, description: t, name: n, directives: i, loc: this.loc(e) };
    }),
    (t.parseObjectTypeDefinition = function () {
      var e = this._lexer.token,
        t = this.parseDescription();
      this.expectKeyword("type");
      var n = this.parseName(),
        i = this.parseImplementsInterfaces(),
        r = this.parseDirectives(!0),
        o = this.parseFieldsDefinition();
      return {
        kind: Rs.OBJECT_TYPE_DEFINITION,
        description: t,
        name: n,
        interfaces: i,
        directives: r,
        fields: o,
        loc: this.loc(e),
      };
    }),
    (t.parseImplementsInterfaces = function () {
      var e;
      if (!this.expectOptionalKeyword("implements")) return [];
      if (!0 === (null === (e = this._options) || void 0 === e ? void 0 : e.allowLegacySDLImplementsInterfaces)) {
        var t = [];
        this.expectOptionalToken(Fs.AMP);
        do {
          t.push(this.parseNamedType());
        } while (this.expectOptionalToken(Fs.AMP) || this.peek(Fs.NAME));
        return t;
      }
      return this.delimitedMany(Fs.AMP, this.parseNamedType);
    }),
    (t.parseFieldsDefinition = function () {
      var e;
      return !0 === (null === (e = this._options) || void 0 === e ? void 0 : e.allowLegacySDLEmptyFields) &&
        this.peek(Fs.BRACE_L) &&
        this._lexer.lookahead().kind === Fs.BRACE_R
        ? (this._lexer.advance(), this._lexer.advance(), [])
        : this.optionalMany(Fs.BRACE_L, this.parseFieldDefinition, Fs.BRACE_R);
    }),
    (t.parseFieldDefinition = function () {
      var e = this._lexer.token,
        t = this.parseDescription(),
        n = this.parseName(),
        i = this.parseArgumentDefs();
      this.expectToken(Fs.COLON);
      var r = this.parseTypeReference(),
        o = this.parseDirectives(!0);
      return {
        kind: Rs.FIELD_DEFINITION,
        description: t,
        name: n,
        arguments: i,
        type: r,
        directives: o,
        loc: this.loc(e),
      };
    }),
    (t.parseArgumentDefs = function () {
      return this.optionalMany(Fs.PAREN_L, this.parseInputValueDef, Fs.PAREN_R);
    }),
    (t.parseInputValueDef = function () {
      var e = this._lexer.token,
        t = this.parseDescription(),
        n = this.parseName();
      this.expectToken(Fs.COLON);
      var i,
        r = this.parseTypeReference();
      this.expectOptionalToken(Fs.EQUALS) && (i = this.parseValueLiteral(!0));
      var o = this.parseDirectives(!0);
      return {
        kind: Rs.INPUT_VALUE_DEFINITION,
        description: t,
        name: n,
        type: r,
        defaultValue: i,
        directives: o,
        loc: this.loc(e),
      };
    }),
    (t.parseInterfaceTypeDefinition = function () {
      var e = this._lexer.token,
        t = this.parseDescription();
      this.expectKeyword("interface");
      var n = this.parseName(),
        i = this.parseImplementsInterfaces(),
        r = this.parseDirectives(!0),
        o = this.parseFieldsDefinition();
      return {
        kind: Rs.INTERFACE_TYPE_DEFINITION,
        description: t,
        name: n,
        interfaces: i,
        directives: r,
        fields: o,
        loc: this.loc(e),
      };
    }),
    (t.parseUnionTypeDefinition = function () {
      var e = this._lexer.token,
        t = this.parseDescription();
      this.expectKeyword("union");
      var n = this.parseName(),
        i = this.parseDirectives(!0),
        r = this.parseUnionMemberTypes();
      return { kind: Rs.UNION_TYPE_DEFINITION, description: t, name: n, directives: i, types: r, loc: this.loc(e) };
    }),
    (t.parseUnionMemberTypes = function () {
      return this.expectOptionalToken(Fs.EQUALS) ? this.delimitedMany(Fs.PIPE, this.parseNamedType) : [];
    }),
    (t.parseEnumTypeDefinition = function () {
      var e = this._lexer.token,
        t = this.parseDescription();
      this.expectKeyword("enum");
      var n = this.parseName(),
        i = this.parseDirectives(!0),
        r = this.parseEnumValuesDefinition();
      return { kind: Rs.ENUM_TYPE_DEFINITION, description: t, name: n, directives: i, values: r, loc: this.loc(e) };
    }),
    (t.parseEnumValuesDefinition = function () {
      return this.optionalMany(Fs.BRACE_L, this.parseEnumValueDefinition, Fs.BRACE_R);
    }),
    (t.parseEnumValueDefinition = function () {
      var e = this._lexer.token,
        t = this.parseDescription(),
        n = this.parseName(),
        i = this.parseDirectives(!0);
      return { kind: Rs.ENUM_VALUE_DEFINITION, description: t, name: n, directives: i, loc: this.loc(e) };
    }),
    (t.parseInputObjectTypeDefinition = function () {
      var e = this._lexer.token,
        t = this.parseDescription();
      this.expectKeyword("input");
      var n = this.parseName(),
        i = this.parseDirectives(!0),
        r = this.parseInputFieldsDefinition();
      return {
        kind: Rs.INPUT_OBJECT_TYPE_DEFINITION,
        description: t,
        name: n,
        directives: i,
        fields: r,
        loc: this.loc(e),
      };
    }),
    (t.parseInputFieldsDefinition = function () {
      return this.optionalMany(Fs.BRACE_L, this.parseInputValueDef, Fs.BRACE_R);
    }),
    (t.parseTypeSystemExtension = function () {
      var e = this._lexer.lookahead();
      if (e.kind === Fs.NAME)
        switch (e.value) {
          case "schema":
            return this.parseSchemaExtension();
          case "scalar":
            return this.parseScalarTypeExtension();
          case "type":
            return this.parseObjectTypeExtension();
          case "interface":
            return this.parseInterfaceTypeExtension();
          case "union":
            return this.parseUnionTypeExtension();
          case "enum":
            return this.parseEnumTypeExtension();
          case "input":
            return this.parseInputObjectTypeExtension();
        }
      throw this.unexpected(e);
    }),
    (t.parseSchemaExtension = function () {
      var e = this._lexer.token;
      this.expectKeyword("extend"), this.expectKeyword("schema");
      var t = this.parseDirectives(!0),
        n = this.optionalMany(Fs.BRACE_L, this.parseOperationTypeDefinition, Fs.BRACE_R);
      if (0 === t.length && 0 === n.length) throw this.unexpected();
      return { kind: Rs.SCHEMA_EXTENSION, directives: t, operationTypes: n, loc: this.loc(e) };
    }),
    (t.parseScalarTypeExtension = function () {
      var e = this._lexer.token;
      this.expectKeyword("extend"), this.expectKeyword("scalar");
      var t = this.parseName(),
        n = this.parseDirectives(!0);
      if (0 === n.length) throw this.unexpected();
      return { kind: Rs.SCALAR_TYPE_EXTENSION, name: t, directives: n, loc: this.loc(e) };
    }),
    (t.parseObjectTypeExtension = function () {
      var e = this._lexer.token;
      this.expectKeyword("extend"), this.expectKeyword("type");
      var t = this.parseName(),
        n = this.parseImplementsInterfaces(),
        i = this.parseDirectives(!0),
        r = this.parseFieldsDefinition();
      if (0 === n.length && 0 === i.length && 0 === r.length) throw this.unexpected();
      return { kind: Rs.OBJECT_TYPE_EXTENSION, name: t, interfaces: n, directives: i, fields: r, loc: this.loc(e) };
    }),
    (t.parseInterfaceTypeExtension = function () {
      var e = this._lexer.token;
      this.expectKeyword("extend"), this.expectKeyword("interface");
      var t = this.parseName(),
        n = this.parseImplementsInterfaces(),
        i = this.parseDirectives(!0),
        r = this.parseFieldsDefinition();
      if (0 === n.length && 0 === i.length && 0 === r.length) throw this.unexpected();
      return { kind: Rs.INTERFACE_TYPE_EXTENSION, name: t, interfaces: n, directives: i, fields: r, loc: this.loc(e) };
    }),
    (t.parseUnionTypeExtension = function () {
      var e = this._lexer.token;
      this.expectKeyword("extend"), this.expectKeyword("union");
      var t = this.parseName(),
        n = this.parseDirectives(!0),
        i = this.parseUnionMemberTypes();
      if (0 === n.length && 0 === i.length) throw this.unexpected();
      return { kind: Rs.UNION_TYPE_EXTENSION, name: t, directives: n, types: i, loc: this.loc(e) };
    }),
    (t.parseEnumTypeExtension = function () {
      var e = this._lexer.token;
      this.expectKeyword("extend"), this.expectKeyword("enum");
      var t = this.parseName(),
        n = this.parseDirectives(!0),
        i = this.parseEnumValuesDefinition();
      if (0 === n.length && 0 === i.length) throw this.unexpected();
      return { kind: Rs.ENUM_TYPE_EXTENSION, name: t, directives: n, values: i, loc: this.loc(e) };
    }),
    (t.parseInputObjectTypeExtension = function () {
      var e = this._lexer.token;
      this.expectKeyword("extend"), this.expectKeyword("input");
      var t = this.parseName(),
        n = this.parseDirectives(!0),
        i = this.parseInputFieldsDefinition();
      if (0 === n.length && 0 === i.length) throw this.unexpected();
      return { kind: Rs.INPUT_OBJECT_TYPE_EXTENSION, name: t, directives: n, fields: i, loc: this.loc(e) };
    }),
    (t.parseDirectiveDefinition = function () {
      var e = this._lexer.token,
        t = this.parseDescription();
      this.expectKeyword("directive"), this.expectToken(Fs.AT);
      var n = this.parseName(),
        i = this.parseArgumentDefs(),
        r = this.expectOptionalKeyword("repeatable");
      this.expectKeyword("on");
      var o = this.parseDirectiveLocations();
      return {
        kind: Rs.DIRECTIVE_DEFINITION,
        description: t,
        name: n,
        arguments: i,
        repeatable: r,
        locations: o,
        loc: this.loc(e),
      };
    }),
    (t.parseDirectiveLocations = function () {
      return this.delimitedMany(Fs.PIPE, this.parseDirectiveLocation);
    }),
    (t.parseDirectiveLocation = function () {
      var e = this._lexer.token,
        t = this.parseName();
      if (void 0 !== Zs[t.value]) return t;
      throw this.unexpected(e);
    }),
    (t.loc = function (e) {
      var t;
      if (!0 !== (null === (t = this._options) || void 0 === t ? void 0 : t.noLocation))
        return new Ls(e, this._lexer.lastToken, this._lexer.source);
    }),
    (t.peek = function (e) {
      return this._lexer.token.kind === e;
    }),
    (t.expectToken = function (e) {
      var t = this._lexer.token;
      if (t.kind === e) return this._lexer.advance(), t;
      throw Ds(this._lexer.source, t.start, "Expected ".concat(pa(e), ", found ").concat(da(t), "."));
    }),
    (t.expectOptionalToken = function (e) {
      var t = this._lexer.token;
      if (t.kind === e) return this._lexer.advance(), t;
    }),
    (t.expectKeyword = function (e) {
      var t = this._lexer.token;
      if (t.kind !== Fs.NAME || t.value !== e)
        throw Ds(this._lexer.source, t.start, 'Expected "'.concat(e, '", found ').concat(da(t), "."));
      this._lexer.advance();
    }),
    (t.expectOptionalKeyword = function (e) {
      var t = this._lexer.token;
      return t.kind === Fs.NAME && t.value === e && (this._lexer.advance(), !0);
    }),
    (t.unexpected = function (e) {
      var t = null != e ? e : this._lexer.token;
      return Ds(this._lexer.source, t.start, "Unexpected ".concat(da(t), "."));
    }),
    (t.any = function (e, t, n) {
      this.expectToken(e);
      for (var i = []; !this.expectOptionalToken(n); ) i.push(t.call(this));
      return i;
    }),
    (t.optionalMany = function (e, t, n) {
      if (this.expectOptionalToken(e)) {
        var i = [];
        do {
          i.push(t.call(this));
        } while (!this.expectOptionalToken(n));
        return i;
      }
      return [];
    }),
    (t.many = function (e, t, n) {
      this.expectToken(e);
      var i = [];
      do {
        i.push(t.call(this));
      } while (!this.expectOptionalToken(n));
      return i;
    }),
    (t.delimitedMany = function (e, t) {
      this.expectOptionalToken(e);
      var n = [];
      do {
        n.push(t.call(this));
      } while (this.expectOptionalToken(e));
      return n;
    }),
    e
  );
})();
function da(e) {
  var t = e.value;
  return pa(e.kind) + (null != t ? ' "'.concat(t, '"') : "");
}
function pa(e) {
  return (function (e) {
    return (
      e === Fs.BANG ||
      e === Fs.DOLLAR ||
      e === Fs.AMP ||
      e === Fs.PAREN_L ||
      e === Fs.PAREN_R ||
      e === Fs.SPREAD ||
      e === Fs.COLON ||
      e === Fs.EQUALS ||
      e === Fs.AT ||
      e === Fs.BRACKET_L ||
      e === Fs.BRACKET_R ||
      e === Fs.BRACE_L ||
      e === Fs.PIPE ||
      e === Fs.BRACE_R
    );
  })(e)
    ? '"'.concat(e, '"')
    : e;
}
var fa = {
    Name: [],
    Document: ["definitions"],
    OperationDefinition: ["name", "variableDefinitions", "directives", "selectionSet"],
    VariableDefinition: ["variable", "type", "defaultValue", "directives"],
    Variable: ["name"],
    SelectionSet: ["selections"],
    Field: ["alias", "name", "arguments", "directives", "selectionSet"],
    Argument: ["name", "value"],
    FragmentSpread: ["name", "directives"],
    InlineFragment: ["typeCondition", "directives", "selectionSet"],
    FragmentDefinition: ["name", "variableDefinitions", "typeCondition", "directives", "selectionSet"],
    IntValue: [],
    FloatValue: [],
    StringValue: [],
    BooleanValue: [],
    NullValue: [],
    EnumValue: [],
    ListValue: ["values"],
    ObjectValue: ["fields"],
    ObjectField: ["name", "value"],
    Directive: ["name", "arguments"],
    NamedType: ["name"],
    ListType: ["type"],
    NonNullType: ["type"],
    SchemaDefinition: ["description", "directives", "operationTypes"],
    OperationTypeDefinition: ["type"],
    ScalarTypeDefinition: ["description", "name", "directives"],
    ObjectTypeDefinition: ["description", "name", "interfaces", "directives", "fields"],
    FieldDefinition: ["description", "name", "arguments", "type", "directives"],
    InputValueDefinition: ["description", "name", "type", "defaultValue", "directives"],
    InterfaceTypeDefinition: ["description", "name", "interfaces", "directives", "fields"],
    UnionTypeDefinition: ["description", "name", "directives", "types"],
    EnumTypeDefinition: ["description", "name", "directives", "values"],
    EnumValueDefinition: ["description", "name", "directives"],
    InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
    DirectiveDefinition: ["description", "name", "arguments", "locations"],
    SchemaExtension: ["directives", "operationTypes"],
    ScalarTypeExtension: ["name", "directives"],
    ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
    InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
    UnionTypeExtension: ["name", "directives", "types"],
    EnumTypeExtension: ["name", "directives", "values"],
    InputObjectTypeExtension: ["name", "directives", "fields"],
  },
  va = Object.freeze({});
function ma(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : fa,
    i = void 0,
    r = Array.isArray(e),
    o = [e],
    s = -1,
    a = [],
    c = void 0,
    l = void 0,
    u = void 0,
    h = [],
    d = [],
    p = e;
  do {
    var f = ++s === o.length,
      v = f && 0 !== a.length;
    if (f) {
      if (((l = 0 === d.length ? void 0 : h[h.length - 1]), (c = u), (u = d.pop()), v)) {
        if (r) c = c.slice();
        else {
          for (var m = {}, g = 0, y = Object.keys(c); g < y.length; g++) {
            var b = y[g];
            m[b] = c[b];
          }
          c = m;
        }
        for (var x = 0, w = 0; w < a.length; w++) {
          var S = a[w][0],
            _ = a[w][1];
          r && (S -= x), r && null === _ ? (c.splice(S, 1), x++) : (c[S] = _);
        }
      }
      (s = i.index), (o = i.keys), (a = i.edits), (r = i.inArray), (i = i.prev);
    } else {
      if (((l = u ? (r ? s : o[s]) : void 0), null == (c = u ? u[l] : p))) continue;
      u && h.push(l);
    }
    var T,
      C = void 0;
    if (!Array.isArray(c)) {
      if (!zs(c)) throw new Error("Invalid AST Node: ".concat(Hs(c), "."));
      var E = ga(t, c.kind, f);
      if (E) {
        if ((C = E.call(t, c, l, u, h, d)) === va) break;
        if (!1 === C) {
          if (!f) {
            h.pop();
            continue;
          }
        } else if (void 0 !== C && (a.push([l, C]), !f)) {
          if (!zs(C)) {
            h.pop();
            continue;
          }
          c = C;
        }
      }
    }
    if ((void 0 === C && v && a.push([l, c]), f)) h.pop();
    else
      (i = { inArray: r, index: s, keys: o, edits: a, prev: i }),
        (o = (r = Array.isArray(c)) ? c : null !== (T = n[c.kind]) && void 0 !== T ? T : []),
        (s = -1),
        (a = []),
        u && d.push(u),
        (u = c);
  } while (void 0 !== i);
  return 0 !== a.length && (p = a[a.length - 1][1]), p;
}
function ga(e, t, n) {
  var i = e[t];
  if (i) {
    if (!n && "function" == typeof i) return i;
    var r = n ? i.leave : i.enter;
    if ("function" == typeof r) return r;
  } else {
    var o = n ? e.leave : e.enter;
    if (o) {
      if ("function" == typeof o) return o;
      var s = o[t];
      if ("function" == typeof s) return s;
    }
  }
}
function ya(e) {
  return ma(e, { leave: ba });
}
var ba = {
  Name: function (e) {
    return e.value;
  },
  Variable: function (e) {
    return "$" + e.name;
  },
  Document: function (e) {
    return wa(e.definitions, "\n\n") + "\n";
  },
  OperationDefinition: function (e) {
    var t = e.operation,
      n = e.name,
      i = _a("(", wa(e.variableDefinitions, ", "), ")"),
      r = wa(e.directives, " "),
      o = e.selectionSet;
    return n || r || i || "query" !== t ? wa([t, wa([n, i]), r, o], " ") : o;
  },
  VariableDefinition: function (e) {
    var t = e.variable,
      n = e.type,
      i = e.defaultValue,
      r = e.directives;
    return t + ": " + n + _a(" = ", i) + _a(" ", wa(r, " "));
  },
  SelectionSet: function (e) {
    return Sa(e.selections);
  },
  Field: function (e) {
    var t = e.alias,
      n = e.name,
      i = e.arguments,
      r = e.directives,
      o = e.selectionSet,
      s = _a("", t, ": ") + n,
      a = s + _a("(", wa(i, ", "), ")");
    return a.length > 80 && (a = s + _a("(\n", Ta(wa(i, "\n")), "\n)")), wa([a, wa(r, " "), o], " ");
  },
  Argument: function (e) {
    return e.name + ": " + e.value;
  },
  FragmentSpread: function (e) {
    return "..." + e.name + _a(" ", wa(e.directives, " "));
  },
  InlineFragment: function (e) {
    var t = e.typeCondition,
      n = e.directives,
      i = e.selectionSet;
    return wa(["...", _a("on ", t), wa(n, " "), i], " ");
  },
  FragmentDefinition: function (e) {
    var t = e.name,
      n = e.typeCondition,
      i = e.variableDefinitions,
      r = e.directives,
      o = e.selectionSet;
    return (
      "fragment ".concat(t).concat(_a("(", wa(i, ", "), ")"), " ") +
      "on ".concat(n, " ").concat(_a("", wa(r, " "), " ")) +
      o
    );
  },
  IntValue: function (e) {
    return e.value;
  },
  FloatValue: function (e) {
    return e.value;
  },
  StringValue: function (e, t) {
    var n = e.value;
    return e.block
      ? (function (e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            i = -1 === e.indexOf("\n"),
            r = " " === e[0] || "\t" === e[0],
            o = '"' === e[e.length - 1],
            s = "\\" === e[e.length - 1],
            a = !i || o || s || n,
            c = "";
          return (
            !a || (i && r) || (c += "\n" + t),
            (c += t ? e.replace(/\n/g, "\n" + t) : e),
            a && (c += "\n"),
            '"""' + c.replace(/"""/g, '\\"""') + '"""'
          );
        })(n, "description" === t ? "" : "  ")
      : JSON.stringify(n);
  },
  BooleanValue: function (e) {
    return e.value ? "true" : "false";
  },
  NullValue: function () {
    return "null";
  },
  EnumValue: function (e) {
    return e.value;
  },
  ListValue: function (e) {
    return "[" + wa(e.values, ", ") + "]";
  },
  ObjectValue: function (e) {
    return "{" + wa(e.fields, ", ") + "}";
  },
  ObjectField: function (e) {
    return e.name + ": " + e.value;
  },
  Directive: function (e) {
    return "@" + e.name + _a("(", wa(e.arguments, ", "), ")");
  },
  NamedType: function (e) {
    return e.name;
  },
  ListType: function (e) {
    return "[" + e.type + "]";
  },
  NonNullType: function (e) {
    return e.type + "!";
  },
  SchemaDefinition: xa(function (e) {
    var t = e.directives,
      n = e.operationTypes;
    return wa(["schema", wa(t, " "), Sa(n)], " ");
  }),
  OperationTypeDefinition: function (e) {
    return e.operation + ": " + e.type;
  },
  ScalarTypeDefinition: xa(function (e) {
    return wa(["scalar", e.name, wa(e.directives, " ")], " ");
  }),
  ObjectTypeDefinition: xa(function (e) {
    var t = e.name,
      n = e.interfaces,
      i = e.directives,
      r = e.fields;
    return wa(["type", t, _a("implements ", wa(n, " & ")), wa(i, " "), Sa(r)], " ");
  }),
  FieldDefinition: xa(function (e) {
    var t = e.name,
      n = e.arguments,
      i = e.type,
      r = e.directives;
    return t + (Ea(n) ? _a("(\n", Ta(wa(n, "\n")), "\n)") : _a("(", wa(n, ", "), ")")) + ": " + i + _a(" ", wa(r, " "));
  }),
  InputValueDefinition: xa(function (e) {
    var t = e.name,
      n = e.type,
      i = e.defaultValue,
      r = e.directives;
    return wa([t + ": " + n, _a("= ", i), wa(r, " ")], " ");
  }),
  InterfaceTypeDefinition: xa(function (e) {
    var t = e.name,
      n = e.interfaces,
      i = e.directives,
      r = e.fields;
    return wa(["interface", t, _a("implements ", wa(n, " & ")), wa(i, " "), Sa(r)], " ");
  }),
  UnionTypeDefinition: xa(function (e) {
    var t = e.name,
      n = e.directives,
      i = e.types;
    return wa(["union", t, wa(n, " "), i && 0 !== i.length ? "= " + wa(i, " | ") : ""], " ");
  }),
  EnumTypeDefinition: xa(function (e) {
    var t = e.name,
      n = e.directives,
      i = e.values;
    return wa(["enum", t, wa(n, " "), Sa(i)], " ");
  }),
  EnumValueDefinition: xa(function (e) {
    return wa([e.name, wa(e.directives, " ")], " ");
  }),
  InputObjectTypeDefinition: xa(function (e) {
    var t = e.name,
      n = e.directives,
      i = e.fields;
    return wa(["input", t, wa(n, " "), Sa(i)], " ");
  }),
  DirectiveDefinition: xa(function (e) {
    var t = e.name,
      n = e.arguments,
      i = e.repeatable,
      r = e.locations;
    return (
      "directive @" +
      t +
      (Ea(n) ? _a("(\n", Ta(wa(n, "\n")), "\n)") : _a("(", wa(n, ", "), ")")) +
      (i ? " repeatable" : "") +
      " on " +
      wa(r, " | ")
    );
  }),
  SchemaExtension: function (e) {
    var t = e.directives,
      n = e.operationTypes;
    return wa(["extend schema", wa(t, " "), Sa(n)], " ");
  },
  ScalarTypeExtension: function (e) {
    return wa(["extend scalar", e.name, wa(e.directives, " ")], " ");
  },
  ObjectTypeExtension: function (e) {
    var t = e.name,
      n = e.interfaces,
      i = e.directives,
      r = e.fields;
    return wa(["extend type", t, _a("implements ", wa(n, " & ")), wa(i, " "), Sa(r)], " ");
  },
  InterfaceTypeExtension: function (e) {
    var t = e.name,
      n = e.interfaces,
      i = e.directives,
      r = e.fields;
    return wa(["extend interface", t, _a("implements ", wa(n, " & ")), wa(i, " "), Sa(r)], " ");
  },
  UnionTypeExtension: function (e) {
    var t = e.name,
      n = e.directives,
      i = e.types;
    return wa(["extend union", t, wa(n, " "), i && 0 !== i.length ? "= " + wa(i, " | ") : ""], " ");
  },
  EnumTypeExtension: function (e) {
    var t = e.name,
      n = e.directives,
      i = e.values;
    return wa(["extend enum", t, wa(n, " "), Sa(i)], " ");
  },
  InputObjectTypeExtension: function (e) {
    var t = e.name,
      n = e.directives,
      i = e.fields;
    return wa(["extend input", t, wa(n, " "), Sa(i)], " ");
  },
};
function xa(e) {
  return function (t) {
    return wa([t.description, e(t)], "\n");
  };
}
function wa(e) {
  var t,
    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
  return null !==
    (t =
      null == e
        ? void 0
        : e
            .filter(function (e) {
              return e;
            })
            .join(n)) && void 0 !== t
    ? t
    : "";
}
function Sa(e) {
  return _a("{\n", Ta(wa(e, "\n")), "\n}");
}
function _a(e, t) {
  return null != t && "" !== t ? e + t + (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "") : "";
}
function Ta(e) {
  return _a("  ", e.replace(/\n/g, "\n  "));
}
function Ca(e) {
  return -1 !== e.indexOf("\n");
}
function Ea(e) {
  return null != e && e.some(Ca);
}
var ka = Object.freeze({ __proto__: null, print: ya });
var Aa = Object.freeze({
  __proto__: null,
  getOperationAST: function (e, t) {
    for (var n = null, i = 0, r = e.definitions; i < r.length; i++) {
      var o,
        s = r[i];
      if (s.kind === Rs.OPERATION_DEFINITION)
        if (null == t) {
          if (n) return null;
          n = s;
        } else if ((null === (o = s.name) || void 0 === o ? void 0 : o.value) === t) return s;
    }
    return n;
  },
});
function Oa(e, t) {
  var n = e.directives;
  return (
    !n ||
    !n.length ||
    (function (e) {
      var t = [];
      e &&
        e.length &&
        e.forEach(function (e) {
          if (
            (function (e) {
              var t = e.name.value;
              return "skip" === t || "include" === t;
            })(e)
          ) {
            var n = e.arguments,
              i = e.name.value;
            __DEV__
              ? is(n && 1 === n.length, "Incorrect number of arguments for the @".concat(i, " directive."))
              : is(n && 1 === n.length, 38);
            var r = n[0];
            __DEV__
              ? is(r.name && "if" === r.name.value, "Invalid argument for the @".concat(i, " directive."))
              : is(r.name && "if" === r.name.value, 39);
            var o = r.value;
            __DEV__
              ? is(
                  o && ("Variable" === o.kind || "BooleanValue" === o.kind),
                  "Argument for the @".concat(i, " directive must be a variable or a boolean value.")
                )
              : is(o && ("Variable" === o.kind || "BooleanValue" === o.kind), 40),
              t.push({ directive: e, ifArgument: r });
          }
        });
      return t;
    })(n).every(function (e) {
      var n = e.directive,
        i = e.ifArgument,
        r = !1;
      return (
        "Variable" === i.value.kind
          ? ((r = t && t[i.value.name.value]),
            __DEV__
              ? is(void 0 !== r, "Invalid variable referenced in @".concat(n.name.value, " directive."))
              : is(void 0 !== r, 37))
          : (r = i.value.value),
        "skip" === n.name.value ? !r : r
      );
    })
  );
}
function Ia(e, t) {
  return (function (e) {
    var t = [];
    return (
      ma(e, {
        Directive: function (e) {
          t.push(e.name.value);
        },
      }),
      t
    );
  })(t).some(function (t) {
    return e.indexOf(t) > -1;
  });
}
function Ma(e) {
  return e && Ia(["client"], e) && Ia(["export"], e);
}
function Pa(e, t) {
  var n = t,
    i = [];
  return (
    e.definitions.forEach(function (e) {
      if ("OperationDefinition" === e.kind)
        throw __DEV__
          ? new ns(
              "Found a "
                .concat(e.operation, " operation")
                .concat(e.name ? " named '".concat(e.name.value, "'") : "", ". ") +
                "No operations are allowed when using a fragment as a query. Only fragments are allowed."
            )
          : new ns(41);
      "FragmentDefinition" === e.kind && i.push(e);
    }),
    void 0 === n &&
      (__DEV__
        ? is(
            1 === i.length,
            "Found ".concat(
              i.length,
              " fragments. `fragmentName` must be provided when there is not exactly 1 fragment."
            )
          )
        : is(1 === i.length, 42),
      (n = i[0].name.value)),
    Re(Re({}, e), {
      definitions: ze(
        [
          {
            kind: "OperationDefinition",
            operation: "query",
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: n } }],
            },
          },
        ],
        e.definitions,
        !0
      ),
    })
  );
}
function Da(e) {
  void 0 === e && (e = []);
  var t = {};
  return (
    e.forEach(function (e) {
      t[e.name.value] = e;
    }),
    t
  );
}
function Ra(e, t) {
  switch (e.kind) {
    case "InlineFragment":
      return e;
    case "FragmentSpread":
      var n = t && t[e.name.value];
      return __DEV__ ? is(n, "No fragment named ".concat(e.name.value, ".")) : is(n, 43), n;
    default:
      return null;
  }
}
function Na(e) {
  return null !== e && "object" == typeof e;
}
function $a(e) {
  return { __ref: String(e) };
}
function La(e) {
  return Boolean(e && "object" == typeof e && "string" == typeof e.__ref);
}
function ja(e, t, n, i) {
  if (
    (function (e) {
      return "IntValue" === e.kind;
    })(n) ||
    (function (e) {
      return "FloatValue" === e.kind;
    })(n)
  )
    e[t.value] = Number(n.value);
  else if (
    (function (e) {
      return "BooleanValue" === e.kind;
    })(n) ||
    (function (e) {
      return "StringValue" === e.kind;
    })(n)
  )
    e[t.value] = n.value;
  else if (
    (function (e) {
      return "ObjectValue" === e.kind;
    })(n)
  ) {
    var r = {};
    n.fields.map(function (e) {
      return ja(r, e.name, e.value, i);
    }),
      (e[t.value] = r);
  } else if (
    (function (e) {
      return "Variable" === e.kind;
    })(n)
  ) {
    var o = (i || {})[n.name.value];
    e[t.value] = o;
  } else if (
    (function (e) {
      return "ListValue" === e.kind;
    })(n)
  )
    e[t.value] = n.values.map(function (e) {
      var n = {};
      return ja(n, t, e, i), n[t.value];
    });
  else if (
    (function (e) {
      return "EnumValue" === e.kind;
    })(n)
  )
    e[t.value] = n.value;
  else {
    if (
      !(function (e) {
        return "NullValue" === e.kind;
      })(n)
    )
      throw __DEV__
        ? new ns(
            'The inline argument "'.concat(t.value, '" of kind "').concat(n.kind, '"') +
              "is not supported. Use variables instead of inline arguments to overcome this limitation."
          )
        : new ns(52);
    e[t.value] = null;
  }
}
vs(), __DEV__ ? is("boolean" == typeof hs, hs) : is("boolean" == typeof hs, 36);
var za = ["connection", "include", "skip", "client", "rest", "export"],
  Fa = Object.assign(
    function (e, t, n) {
      if (t && n && n.connection && n.connection.key) {
        if (n.connection.filter && n.connection.filter.length > 0) {
          var i = n.connection.filter ? n.connection.filter : [];
          i.sort();
          var r = {};
          return (
            i.forEach(function (e) {
              r[e] = t[e];
            }),
            "".concat(n.connection.key, "(").concat(Va(r), ")")
          );
        }
        return n.connection.key;
      }
      var o = e;
      if (t) {
        var s = Va(t);
        o += "(".concat(s, ")");
      }
      return (
        n &&
          Object.keys(n).forEach(function (e) {
            -1 === za.indexOf(e) &&
              (n[e] && Object.keys(n[e]).length
                ? (o += "@".concat(e, "(").concat(Va(n[e]), ")"))
                : (o += "@".concat(e)));
          }),
        o
      );
    },
    {
      setStringify: function (e) {
        var t = Va;
        return (Va = e), t;
      },
    }
  ),
  Va = function (e) {
    return JSON.stringify(e, Ua);
  };
function Ua(e, t) {
  return (
    Na(t) &&
      !Array.isArray(t) &&
      (t = Object.keys(t)
        .sort()
        .reduce(function (e, n) {
          return (e[n] = t[n]), e;
        }, {})),
    t
  );
}
function Ba(e, t) {
  if (e.arguments && e.arguments.length) {
    var n = {};
    return (
      e.arguments.forEach(function (e) {
        var i = e.name,
          r = e.value;
        return ja(n, i, r, t);
      }),
      n
    );
  }
  return null;
}
function Ha(e) {
  return e.alias ? e.alias.value : e.name.value;
}
function qa(e, t, n) {
  if ("string" == typeof e.__typename) return e.__typename;
  for (var i = 0, r = t.selections; i < r.length; i++) {
    var o = r[i];
    if (Qa(o)) {
      if ("__typename" === o.name.value) return e[Ha(o)];
    } else {
      var s = qa(e, Ra(o, n).selectionSet, n);
      if ("string" == typeof s) return s;
    }
  }
}
function Qa(e) {
  return "Field" === e.kind;
}
function Ga(e) {
  return "InlineFragment" === e.kind;
}
function Wa(e) {
  __DEV__
    ? is(
        e && "Document" === e.kind,
        'Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a "gql" tag? http://docs.apollostack.com/apollo-client/core.html#gql'
      )
    : is(e && "Document" === e.kind, 44);
  var t = e.definitions
    .filter(function (e) {
      return "FragmentDefinition" !== e.kind;
    })
    .map(function (e) {
      if ("OperationDefinition" !== e.kind)
        throw __DEV__
          ? new ns('Schema type definitions not allowed in queries. Found: "'.concat(e.kind, '"'))
          : new ns(45);
      return e;
    });
  return (
    __DEV__
      ? is(t.length <= 1, "Ambiguous GraphQL document: contains ".concat(t.length, " operations"))
      : is(t.length <= 1, 46),
    e
  );
}
function Ya(e) {
  return (
    Wa(e),
    e.definitions.filter(function (e) {
      return "OperationDefinition" === e.kind;
    })[0]
  );
}
function Za(e) {
  return (
    e.definitions
      .filter(function (e) {
        return "OperationDefinition" === e.kind && e.name;
      })
      .map(function (e) {
        return e.name.value;
      })[0] || null
  );
}
function Xa(e) {
  return e.definitions.filter(function (e) {
    return "FragmentDefinition" === e.kind;
  });
}
function Ka(e) {
  var t = Ya(e);
  return (
    __DEV__
      ? is(t && "query" === t.operation, "Must contain a query definition.")
      : is(t && "query" === t.operation, 47),
    t
  );
}
function Ja(e) {
  var t;
  Wa(e);
  for (var n = 0, i = e.definitions; n < i.length; n++) {
    var r = i[n];
    if ("OperationDefinition" === r.kind) {
      var o = r.operation;
      if ("query" === o || "mutation" === o || "subscription" === o) return r;
    }
    "FragmentDefinition" !== r.kind || t || (t = r);
  }
  if (t) return t;
  throw __DEV__
    ? new ns("Expected a parsed GraphQL query with a query, mutation, subscription, or a fragment.")
    : new ns(51);
}
function ec(e) {
  var t = Object.create(null),
    n = e && e.variableDefinitions;
  return (
    n &&
      n.length &&
      n.forEach(function (e) {
        e.defaultValue && ja(t, e.variable.name, e.defaultValue);
      }),
    t
  );
}
function tc(e, t, n) {
  var i = 0;
  return (
    e.forEach(function (n, r) {
      t.call(this, n, r, e) && (e[i++] = n);
    }, n),
    (e.length = i),
    e
  );
}
var nc = { kind: "Field", name: { kind: "Name", value: "__typename" } };
function ic(e, t) {
  return e.selectionSet.selections.every(function (e) {
    return "FragmentSpread" === e.kind && ic(t[e.name.value], t);
  });
}
function rc(e) {
  return ic(
    Ya(e) ||
      (function (e) {
        __DEV__
          ? is(
              "Document" === e.kind,
              'Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a "gql" tag? http://docs.apollostack.com/apollo-client/core.html#gql'
            )
          : is("Document" === e.kind, 48),
          __DEV__
            ? is(e.definitions.length <= 1, "Fragment must have exactly one definition.")
            : is(e.definitions.length <= 1, 49);
        var t = e.definitions[0];
        return (
          __DEV__
            ? is("FragmentDefinition" === t.kind, "Must be a fragment definition.")
            : is("FragmentDefinition" === t.kind, 50),
          t
        );
      })(e),
    Da(Xa(e))
  )
    ? null
    : e;
}
function oc(e) {
  return function (t) {
    return e.some(function (e) {
      return (e.name && e.name === t.name.value) || (e.test && e.test(t));
    });
  };
}
function sc(e, t) {
  var n = Object.create(null),
    i = [],
    r = Object.create(null),
    o = [],
    s = rc(
      ma(t, {
        Variable: {
          enter: function (e, t, i) {
            "VariableDefinition" !== i.kind && (n[e.name.value] = !0);
          },
        },
        Field: {
          enter: function (t) {
            if (
              e &&
              t.directives &&
              e.some(function (e) {
                return e.remove;
              }) &&
              t.directives &&
              t.directives.some(oc(e))
            )
              return (
                t.arguments &&
                  t.arguments.forEach(function (e) {
                    "Variable" === e.value.kind && i.push({ name: e.value.name.value });
                  }),
                t.selectionSet &&
                  lc(t.selectionSet).forEach(function (e) {
                    o.push({ name: e.name.value });
                  }),
                null
              );
          },
        },
        FragmentSpread: {
          enter: function (e) {
            r[e.name.value] = !0;
          },
        },
        Directive: {
          enter: function (t) {
            if (oc(e)(t)) return null;
          },
        },
      })
    );
  return (
    s &&
      tc(i, function (e) {
        return !!e.name && !n[e.name];
      }).length &&
      (s = (function (e, t) {
        var n = (function (e) {
          return function (t) {
            return e.some(function (e) {
              return (
                t.value &&
                "Variable" === t.value.kind &&
                t.value.name &&
                (e.name === t.value.name.value || (e.test && e.test(t)))
              );
            });
          };
        })(e);
        return rc(
          ma(t, {
            OperationDefinition: {
              enter: function (t) {
                return Re(Re({}, t), {
                  variableDefinitions: t.variableDefinitions
                    ? t.variableDefinitions.filter(function (t) {
                        return !e.some(function (e) {
                          return e.name === t.variable.name.value;
                        });
                      })
                    : [],
                });
              },
            },
            Field: {
              enter: function (t) {
                if (
                  e.some(function (e) {
                    return e.remove;
                  })
                ) {
                  var i = 0;
                  if (
                    (t.arguments &&
                      t.arguments.forEach(function (e) {
                        n(e) && (i += 1);
                      }),
                    1 === i)
                  )
                    return null;
                }
              },
            },
            Argument: {
              enter: function (e) {
                if (n(e)) return null;
              },
            },
          })
        );
      })(i, s)),
    s &&
      tc(o, function (e) {
        return !!e.name && !r[e.name];
      }).length &&
      (s = (function (e, t) {
        function n(t) {
          if (
            e.some(function (e) {
              return e.name === t.name.value;
            })
          )
            return null;
        }
        return rc(ma(t, { FragmentSpread: { enter: n }, FragmentDefinition: { enter: n } }));
      })(o, s)),
    s
  );
}
var ac = Object.assign(
    function (e) {
      return ma(Wa(e), {
        SelectionSet: {
          enter: function (e, t, n) {
            if (!n || "OperationDefinition" !== n.kind) {
              var i = e.selections;
              if (i)
                if (
                  !i.some(function (e) {
                    return Qa(e) && ("__typename" === e.name.value || 0 === e.name.value.lastIndexOf("__", 0));
                  })
                ) {
                  var r = n;
                  if (
                    !(
                      Qa(r) &&
                      r.directives &&
                      r.directives.some(function (e) {
                        return "export" === e.name.value;
                      })
                    )
                  )
                    return Re(Re({}, e), { selections: ze(ze([], i, !0), [nc], !1) });
                }
            }
          },
        },
      });
    },
    {
      added: function (e) {
        return e === nc;
      },
    }
  ),
  cc = {
    test: function (e) {
      var t = "connection" === e.name.value;
      return (
        t &&
          ((e.arguments &&
            e.arguments.some(function (e) {
              return "key" === e.name.value;
            })) ||
            (__DEV__ &&
              is.warn(
                "Removing an @connection directive even though it does not have a key. You may want to use the key parameter to specify a store key."
              ))),
        t
      );
    },
  };
function lc(e) {
  var t = [];
  return (
    e.selections.forEach(function (e) {
      (Qa(e) || Ga(e)) && e.selectionSet
        ? lc(e.selectionSet).forEach(function (e) {
            return t.push(e);
          })
        : "FragmentSpread" === e.kind && t.push(e);
    }),
    t
  );
}
function uc(e) {
  return "query" === Ja(e).operation
    ? e
    : ma(e, {
        OperationDefinition: {
          enter: function (e) {
            return Re(Re({}, e), { operation: "query" });
          },
        },
      });
}
var hc = Object.prototype.hasOwnProperty;
function dc() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  return pc(e);
}
function pc(e) {
  var t = e[0] || {},
    n = e.length;
  if (n > 1) for (var i = new vc(), r = 1; r < n; ++r) t = i.merge(t, e[r]);
  return t;
}
var fc = function (e, t, n) {
    return this.merge(e[n], t[n]);
  },
  vc = (function () {
    function e(e) {
      void 0 === e && (e = fc), (this.reconciler = e), (this.isObject = Na), (this.pastCopies = new Set());
    }
    return (
      (e.prototype.merge = function (e, t) {
        for (var n = this, i = [], r = 2; r < arguments.length; r++) i[r - 2] = arguments[r];
        return Na(t) && Na(e)
          ? (Object.keys(t).forEach(function (r) {
              if (hc.call(e, r)) {
                var o = e[r];
                if (t[r] !== o) {
                  var s = n.reconciler.apply(n, ze([e, t, r], i, !1));
                  s !== o && ((e = n.shallowCopyForMerge(e))[r] = s);
                }
              } else (e = n.shallowCopyForMerge(e))[r] = t[r];
            }),
            e)
          : t;
      }),
      (e.prototype.shallowCopyForMerge = function (e) {
        if (Na(e)) {
          if (this.pastCopies.has(e)) {
            if (!Object.isFrozen(e)) return e;
            this.pastCopies.delete(e);
          }
          (e = Array.isArray(e) ? e.slice(0) : Re({ __proto__: Object.getPrototypeOf(e) }, e)), this.pastCopies.add(e);
        }
        return e;
      }),
      e
    );
  })();
function mc(e, t) {
  var n = ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
  if (n) return (n = n.call(e)).next.bind(n);
  if (
    Array.isArray(e) ||
    (n = (function (e, t) {
      if (!e) return;
      if ("string" == typeof e) return gc(e, t);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      "Object" === n && e.constructor && (n = e.constructor.name);
      if ("Map" === n || "Set" === n) return Array.from(e);
      if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return gc(e, t);
    })(e)) ||
    (t && e && "number" == typeof e.length)
  ) {
    n && (e = n);
    var i = 0;
    return function () {
      return i >= e.length ? { done: !0 } : { done: !1, value: e[i++] };
    };
  }
  throw new TypeError(
    "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}
function gc(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
  return i;
}
function yc(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    (i.enumerable = i.enumerable || !1),
      (i.configurable = !0),
      "value" in i && (i.writable = !0),
      Object.defineProperty(e, i.key, i);
  }
}
function bc(e, t, n) {
  return t && yc(e.prototype, t), n && yc(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
var xc = function () {
    return "function" == typeof Symbol;
  },
  wc = function (e) {
    return xc() && Boolean(Symbol[e]);
  },
  Sc = function (e) {
    return wc(e) ? Symbol[e] : "@@" + e;
  };
xc() && !wc("observable") && (Symbol.observable = Symbol("observable"));
var _c = Sc("iterator"),
  Tc = Sc("observable"),
  Cc = Sc("species");
function Ec(e, t) {
  var n = e[t];
  if (null != n) {
    if ("function" != typeof n) throw new TypeError(n + " is not a function");
    return n;
  }
}
function kc(e) {
  var t = e.constructor;
  return void 0 !== t && null === (t = t[Cc]) && (t = void 0), void 0 !== t ? t : Lc;
}
function Ac(e) {
  return e instanceof Lc;
}
function Oc(e) {
  Oc.log
    ? Oc.log(e)
    : setTimeout(function () {
        throw e;
      });
}
function Ic(e) {
  Promise.resolve().then(function () {
    try {
      e();
    } catch (e) {
      Oc(e);
    }
  });
}
function Mc(e) {
  var t = e._cleanup;
  if (void 0 !== t && ((e._cleanup = void 0), t))
    try {
      if ("function" == typeof t) t();
      else {
        var n = Ec(t, "unsubscribe");
        n && n.call(t);
      }
    } catch (e) {
      Oc(e);
    }
}
function Pc(e) {
  (e._observer = void 0), (e._queue = void 0), (e._state = "closed");
}
function Dc(e, t, n) {
  e._state = "running";
  var i = e._observer;
  try {
    var r = Ec(i, t);
    switch (t) {
      case "next":
        r && r.call(i, n);
        break;
      case "error":
        if ((Pc(e), !r)) throw n;
        r.call(i, n);
        break;
      case "complete":
        Pc(e), r && r.call(i);
    }
  } catch (e) {
    Oc(e);
  }
  "closed" === e._state ? Mc(e) : "running" === e._state && (e._state = "ready");
}
function Rc(e, t, n) {
  if ("closed" !== e._state) {
    if ("buffering" !== e._state)
      return "ready" !== e._state
        ? ((e._state = "buffering"),
          (e._queue = [{ type: t, value: n }]),
          void Ic(function () {
            return (function (e) {
              var t = e._queue;
              if (t) {
                (e._queue = void 0), (e._state = "ready");
                for (var n = 0; n < t.length && (Dc(e, t[n].type, t[n].value), "closed" !== e._state); ++n);
              }
            })(e);
          }))
        : void Dc(e, t, n);
    e._queue.push({ type: t, value: n });
  }
}
var Nc = (function () {
    function e(e, t) {
      (this._cleanup = void 0), (this._observer = e), (this._queue = void 0), (this._state = "initializing");
      var n = new $c(this);
      try {
        this._cleanup = t.call(void 0, n);
      } catch (e) {
        n.error(e);
      }
      "initializing" === this._state && (this._state = "ready");
    }
    return (
      (e.prototype.unsubscribe = function () {
        "closed" !== this._state && (Pc(this), Mc(this));
      }),
      bc(e, [
        {
          key: "closed",
          get: function () {
            return "closed" === this._state;
          },
        },
      ]),
      e
    );
  })(),
  $c = (function () {
    function e(e) {
      this._subscription = e;
    }
    var t = e.prototype;
    return (
      (t.next = function (e) {
        Rc(this._subscription, "next", e);
      }),
      (t.error = function (e) {
        Rc(this._subscription, "error", e);
      }),
      (t.complete = function () {
        Rc(this._subscription, "complete");
      }),
      bc(e, [
        {
          key: "closed",
          get: function () {
            return "closed" === this._subscription._state;
          },
        },
      ]),
      e
    );
  })(),
  Lc = (function () {
    function e(t) {
      if (!(this instanceof e)) throw new TypeError("Observable cannot be called as a function");
      if ("function" != typeof t) throw new TypeError("Observable initializer must be a function");
      this._subscriber = t;
    }
    var t = e.prototype;
    return (
      (t.subscribe = function (e) {
        return (
          ("object" == typeof e && null !== e) || (e = { next: e, error: arguments[1], complete: arguments[2] }),
          new Nc(e, this._subscriber)
        );
      }),
      (t.forEach = function (e) {
        var t = this;
        return new Promise(function (n, i) {
          if ("function" == typeof e)
            var r = t.subscribe({
              next: function (t) {
                try {
                  e(t, o);
                } catch (e) {
                  i(e), r.unsubscribe();
                }
              },
              error: i,
              complete: n,
            });
          else i(new TypeError(e + " is not a function"));
          function o() {
            r.unsubscribe(), n();
          }
        });
      }),
      (t.map = function (e) {
        var t = this;
        if ("function" != typeof e) throw new TypeError(e + " is not a function");
        return new (kc(this))(function (n) {
          return t.subscribe({
            next: function (t) {
              try {
                t = e(t);
              } catch (e) {
                return n.error(e);
              }
              n.next(t);
            },
            error: function (e) {
              n.error(e);
            },
            complete: function () {
              n.complete();
            },
          });
        });
      }),
      (t.filter = function (e) {
        var t = this;
        if ("function" != typeof e) throw new TypeError(e + " is not a function");
        return new (kc(this))(function (n) {
          return t.subscribe({
            next: function (t) {
              try {
                if (!e(t)) return;
              } catch (e) {
                return n.error(e);
              }
              n.next(t);
            },
            error: function (e) {
              n.error(e);
            },
            complete: function () {
              n.complete();
            },
          });
        });
      }),
      (t.reduce = function (e) {
        var t = this;
        if ("function" != typeof e) throw new TypeError(e + " is not a function");
        var n = kc(this),
          i = arguments.length > 1,
          r = !1,
          o = arguments[1];
        return new n(function (n) {
          return t.subscribe({
            next: function (t) {
              var s = !r;
              if (((r = !0), !s || i))
                try {
                  o = e(o, t);
                } catch (e) {
                  return n.error(e);
                }
              else o = t;
            },
            error: function (e) {
              n.error(e);
            },
            complete: function () {
              if (!r && !i) return n.error(new TypeError("Cannot reduce an empty sequence"));
              n.next(o), n.complete();
            },
          });
        });
      }),
      (t.concat = function () {
        for (var e = this, t = arguments.length, n = new Array(t), i = 0; i < t; i++) n[i] = arguments[i];
        var r = kc(this);
        return new r(function (t) {
          var i,
            o = 0;
          return (
            (function e(s) {
              i = s.subscribe({
                next: function (e) {
                  t.next(e);
                },
                error: function (e) {
                  t.error(e);
                },
                complete: function () {
                  o === n.length ? ((i = void 0), t.complete()) : e(r.from(n[o++]));
                },
              });
            })(e),
            function () {
              i && (i.unsubscribe(), (i = void 0));
            }
          );
        });
      }),
      (t.flatMap = function (e) {
        var t = this;
        if ("function" != typeof e) throw new TypeError(e + " is not a function");
        var n = kc(this);
        return new n(function (i) {
          var r = [],
            o = t.subscribe({
              next: function (t) {
                if (e)
                  try {
                    t = e(t);
                  } catch (e) {
                    return i.error(e);
                  }
                var o = n.from(t).subscribe({
                  next: function (e) {
                    i.next(e);
                  },
                  error: function (e) {
                    i.error(e);
                  },
                  complete: function () {
                    var e = r.indexOf(o);
                    e >= 0 && r.splice(e, 1), s();
                  },
                });
                r.push(o);
              },
              error: function (e) {
                i.error(e);
              },
              complete: function () {
                s();
              },
            });
          function s() {
            o.closed && 0 === r.length && i.complete();
          }
          return function () {
            r.forEach(function (e) {
              return e.unsubscribe();
            }),
              o.unsubscribe();
          };
        });
      }),
      (t[Tc] = function () {
        return this;
      }),
      (e.from = function (t) {
        var n = "function" == typeof this ? this : e;
        if (null == t) throw new TypeError(t + " is not an object");
        var i = Ec(t, Tc);
        if (i) {
          var r = i.call(t);
          if (Object(r) !== r) throw new TypeError(r + " is not an object");
          return Ac(r) && r.constructor === n
            ? r
            : new n(function (e) {
                return r.subscribe(e);
              });
        }
        if (wc("iterator") && (i = Ec(t, _c)))
          return new n(function (e) {
            Ic(function () {
              if (!e.closed) {
                for (var n, r = mc(i.call(t)); !(n = r()).done; ) {
                  var o = n.value;
                  if ((e.next(o), e.closed)) return;
                }
                e.complete();
              }
            });
          });
        if (Array.isArray(t))
          return new n(function (e) {
            Ic(function () {
              if (!e.closed) {
                for (var n = 0; n < t.length; ++n) if ((e.next(t[n]), e.closed)) return;
                e.complete();
              }
            });
          });
        throw new TypeError(t + " is not observable");
      }),
      (e.of = function () {
        for (var t = arguments.length, n = new Array(t), i = 0; i < t; i++) n[i] = arguments[i];
        return new ("function" == typeof this ? this : e)(function (e) {
          Ic(function () {
            if (!e.closed) {
              for (var t = 0; t < n.length; ++t) if ((e.next(n[t]), e.closed)) return;
              e.complete();
            }
          });
        });
      }),
      bc(e, null, [
        {
          key: Cc,
          get: function () {
            return this;
          },
        },
      ]),
      e
    );
  })();
xc() &&
  Object.defineProperty(Lc, Symbol("extensions"), { value: { symbol: Tc, hostReportError: Oc }, configurable: !0 }),
  (function (e) {
    var t,
      n = e.Symbol;
    if ("function" == typeof n)
      if (n.observable) t = n.observable;
      else {
        t =
          "function" == typeof n.for
            ? n.for("https://github.com/benlesh/symbol-observable")
            : n("https://github.com/benlesh/symbol-observable");
        try {
          n.observable = t;
        } catch (e) {}
      }
    else t = "@@observable";
  })(
    "undefined" != typeof self
      ? self
      : "undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof module
      ? module
      : Function("return this")()
  );
var jc = Lc.prototype,
  zc = "@@observable";
jc[zc] ||
  (jc[zc] = function () {
    return this;
  });
var Fc = Object.prototype.toString;
function Vc(e) {
  return Uc(e);
}
function Uc(e, t) {
  switch (Fc.call(e)) {
    case "[object Array]":
      if ((t = t || new Map()).has(e)) return t.get(e);
      var n = e.slice(0);
      return (
        t.set(e, n),
        n.forEach(function (e, i) {
          n[i] = Uc(e, t);
        }),
        n
      );
    case "[object Object]":
      if ((t = t || new Map()).has(e)) return t.get(e);
      var i = Object.create(Object.getPrototypeOf(e));
      return (
        t.set(e, i),
        Object.keys(e).forEach(function (n) {
          i[n] = Uc(e[n], t);
        }),
        i
      );
    default:
      return e;
  }
}
function Bc(e) {
  var t = new Set([e]);
  return (
    t.forEach(function (e) {
      Na(e) &&
        (function (e) {
          if (__DEV__ && !Object.isFrozen(e))
            try {
              Object.freeze(e);
            } catch (e) {
              if (e instanceof TypeError) return null;
              throw e;
            }
          return e;
        })(e) === e &&
        Object.getOwnPropertyNames(e).forEach(function (n) {
          Na(e[n]) && t.add(e[n]);
        });
    }),
    e
  );
}
function Hc(e) {
  return __DEV__ && Bc(e), e;
}
function qc(e, t, n) {
  var i = [];
  e.forEach(function (e) {
    return e[t] && i.push(e);
  }),
    i.forEach(function (e) {
      return e[t](n);
    });
}
function Qc(e, t, n) {
  return new Lc(function (i) {
    var r = i.next,
      o = i.error,
      s = i.complete,
      a = 0,
      c = !1,
      l = {
        then: function (e) {
          return new Promise(function (t) {
            return t(e());
          });
        },
      };
    function u(e, t) {
      return e
        ? function (t) {
            ++a;
            var n = function () {
              return e(t);
            };
            l = l
              .then(n, n)
              .then(
                function (e) {
                  --a, r && r.call(i, e), c && h.complete();
                },
                function (e) {
                  throw (--a, e);
                }
              )
              .catch(function (e) {
                o && o.call(i, e);
              });
          }
        : function (e) {
            return t && t.call(i, e);
          };
    }
    var h = {
        next: u(t, r),
        error: u(n, o),
        complete: function () {
          (c = !0), a || (s && s.call(i));
        },
      },
      d = e.subscribe(h);
    return function () {
      return d.unsubscribe();
    };
  });
}
var Gc = "function" == typeof WeakMap && !("object" == typeof navigator && "ReactNative" === navigator.product),
  Wc = "function" == typeof WeakSet,
  Yc = "function" == typeof Symbol && "function" == typeof Symbol.for;
function Zc(e) {
  function t(t) {
    Object.defineProperty(e, t, { value: Lc });
  }
  return Yc && Symbol.species && t(Symbol.species), t("@@species"), e;
}
function Xc(e) {
  return e && "function" == typeof e.then;
}
var Kc = (function (e) {
  function t(t) {
    var n =
      e.call(this, function (e) {
        return (
          n.addObserver(e),
          function () {
            return n.removeObserver(e);
          }
        );
      }) || this;
    return (
      (n.observers = new Set()),
      (n.addCount = 0),
      (n.promise = new Promise(function (e, t) {
        (n.resolve = e), (n.reject = t);
      })),
      (n.handlers = {
        next: function (e) {
          null !== n.sub && ((n.latest = ["next", e]), qc(n.observers, "next", e));
        },
        error: function (e) {
          var t = n.sub;
          null !== t &&
            (t &&
              setTimeout(function () {
                return t.unsubscribe();
              }),
            (n.sub = null),
            (n.latest = ["error", e]),
            n.reject(e),
            qc(n.observers, "error", e));
        },
        complete: function () {
          if (null !== n.sub) {
            var e = n.sources.shift();
            e
              ? Xc(e)
                ? e.then(function (e) {
                    return (n.sub = e.subscribe(n.handlers));
                  })
                : (n.sub = e.subscribe(n.handlers))
              : ((n.sub = null),
                n.latest && "next" === n.latest[0] ? n.resolve(n.latest[1]) : n.resolve(),
                qc(n.observers, "complete"));
          }
        },
      }),
      (n.cancel = function (e) {
        n.reject(e), (n.sources = []), n.handlers.complete();
      }),
      n.promise.catch(function (e) {}),
      "function" == typeof t && (t = [new Lc(t)]),
      Xc(t)
        ? t.then(function (e) {
            return n.start(e);
          }, n.handlers.error)
        : n.start(t),
      n
    );
  }
  return (
    De(t, e),
    (t.prototype.start = function (e) {
      void 0 === this.sub && ((this.sources = Array.from(e)), this.handlers.complete());
    }),
    (t.prototype.deliverLastMessage = function (e) {
      if (this.latest) {
        var t = this.latest[0],
          n = e[t];
        n && n.call(e, this.latest[1]), null === this.sub && "next" === t && e.complete && e.complete();
      }
    }),
    (t.prototype.addObserver = function (e) {
      this.observers.has(e) || (this.deliverLastMessage(e), this.observers.add(e), ++this.addCount);
    }),
    (t.prototype.removeObserver = function (e, t) {
      this.observers.delete(e) &&
        --this.addCount < 1 &&
        !t &&
        this.handlers.error(new Error("Observable cancelled prematurely"));
    }),
    (t.prototype.cleanup = function (e) {
      var t = this,
        n = !1,
        i = function () {
          n || ((n = !0), t.observers.delete(r), e());
        },
        r = { next: i, error: i, complete: i },
        o = this.addCount;
      this.addObserver(r), (this.addCount = o);
    }),
    t
  );
})(Lc);
function Jc(e) {
  return Array.isArray(e) && e.length > 0;
}
function el(e) {
  return (e.errors && e.errors.length > 0) || !1;
}
function tl() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  var n = Object.create(null);
  return (
    e.forEach(function (e) {
      e &&
        Object.keys(e).forEach(function (t) {
          var i = e[t];
          void 0 !== i && (n[t] = i);
        });
    }),
    n
  );
}
Zc(Kc);
var nl = new Map();
function il(e) {
  var t = nl.get(e) || 1;
  return nl.set(e, t + 1), "".concat(e, ":").concat(t, ":").concat(Math.random().toString(36).slice(2));
}
function rl(e) {
  return new Lc(function (t) {
    t.error(e);
  });
}
var ol = function (e, t, n) {
  var i = new Error(n);
  throw ((i.name = "ServerError"), (i.response = e), (i.statusCode = e.status), (i.result = t), i);
};
function sl(e, t) {
  return t ? t(e) : Lc.of();
}
function al(e) {
  return "function" == typeof e ? new ul(e) : e;
}
function cl(e) {
  return e.request.length <= 1;
}
var ll = (function (e) {
    function t(t, n) {
      var i = e.call(this, t) || this;
      return (i.link = n), i;
    }
    return De(t, e), t;
  })(Error),
  ul = (function () {
    function e(e) {
      e && (this.request = e);
    }
    return (
      (e.empty = function () {
        return new e(function () {
          return Lc.of();
        });
      }),
      (e.from = function (t) {
        return 0 === t.length
          ? e.empty()
          : t.map(al).reduce(function (e, t) {
              return e.concat(t);
            });
      }),
      (e.split = function (t, n, i) {
        var r = al(n),
          o = al(i || new e(sl));
        return cl(r) && cl(o)
          ? new e(function (e) {
              return t(e) ? r.request(e) || Lc.of() : o.request(e) || Lc.of();
            })
          : new e(function (e, n) {
              return t(e) ? r.request(e, n) || Lc.of() : o.request(e, n) || Lc.of();
            });
      }),
      (e.execute = function (e, t) {
        return (
          e.request(
            (function (e, t) {
              var n = Re({}, e);
              return (
                Object.defineProperty(t, "setContext", {
                  enumerable: !1,
                  value: function (e) {
                    n = Re(Re({}, n), "function" == typeof e ? e(n) : e);
                  },
                }),
                Object.defineProperty(t, "getContext", {
                  enumerable: !1,
                  value: function () {
                    return Re({}, n);
                  },
                }),
                t
              );
            })(
              t.context,
              (function (e) {
                var t = {
                  variables: e.variables || {},
                  extensions: e.extensions || {},
                  operationName: e.operationName,
                  query: e.query,
                };
                return (
                  t.operationName || (t.operationName = "string" != typeof t.query ? Za(t.query) || void 0 : ""), t
                );
              })(
                (function (e) {
                  for (
                    var t = ["query", "operationName", "variables", "extensions", "context"], n = 0, i = Object.keys(e);
                    n < i.length;
                    n++
                  ) {
                    var r = i[n];
                    if (t.indexOf(r) < 0) throw __DEV__ ? new ns("illegal argument: ".concat(r)) : new ns(24);
                  }
                  return e;
                })(t)
              )
            )
          ) || Lc.of()
        );
      }),
      (e.concat = function (t, n) {
        var i = al(t);
        if (cl(i))
          return (
            __DEV__ && is.warn(new ll("You are calling concat on a terminating link, which will have no effect", i)), i
          );
        var r = al(n);
        return cl(r)
          ? new e(function (e) {
              return (
                i.request(e, function (e) {
                  return r.request(e) || Lc.of();
                }) || Lc.of()
              );
            })
          : new e(function (e, t) {
              return (
                i.request(e, function (e) {
                  return r.request(e, t) || Lc.of();
                }) || Lc.of()
              );
            });
      }),
      (e.prototype.split = function (t, n, i) {
        return this.concat(e.split(t, n, i || new e(sl)));
      }),
      (e.prototype.concat = function (t) {
        return e.concat(this, t);
      }),
      (e.prototype.request = function (e, t) {
        throw __DEV__ ? new ns("request is not implemented") : new ns(19);
      }),
      (e.prototype.onError = function (e, t) {
        if (t && t.error) return t.error(e), !1;
        throw e;
      }),
      (e.prototype.setOnError = function (e) {
        return (this.onError = e), this;
      }),
      e
    );
  })(),
  hl = ul.split,
  dl = ul.execute,
  pl = Object.prototype.hasOwnProperty;
var fl = function (e, t) {
    var n;
    try {
      n = JSON.stringify(e);
    } catch (e) {
      var i = __DEV__
        ? new ns("Network request failed. ".concat(t, " is not serializable: ").concat(e.message))
        : new ns(21);
      throw ((i.parseError = e), i);
    }
    return n;
  },
  vl = {
    http: { includeQuery: !0, includeExtensions: !1 },
    headers: { accept: "*/*", "content-type": "application/json" },
    options: { method: "POST" },
  },
  ml = function (e, t) {
    return t(e);
  };
function gl(e, t) {
  for (var n = [], i = 2; i < arguments.length; i++) n[i - 2] = arguments[i];
  var r = {},
    o = {};
  n.forEach(function (e) {
    (r = Re(Re(Re({}, r), e.options), { headers: Re(Re({}, r.headers), yl(e.headers)) })),
      e.credentials && (r.credentials = e.credentials),
      (o = Re(Re({}, o), e.http));
  });
  var s = e.operationName,
    a = e.extensions,
    c = e.variables,
    l = e.query,
    u = { operationName: s, variables: c };
  return o.includeExtensions && (u.extensions = a), o.includeQuery && (u.query = t(l, ya)), { options: r, body: u };
}
function yl(e) {
  if (e) {
    var t = Object.create(null);
    return (
      Object.keys(Object(e)).forEach(function (n) {
        t[n.toLowerCase()] = e[n];
      }),
      t
    );
  }
  return e;
}
var bl = as(function () {
    return fetch;
  }),
  xl = function (e) {
    void 0 === e && (e = {});
    var t = e.uri,
      n = void 0 === t ? "/graphql" : t,
      i = e.fetch,
      r = e.print,
      o = void 0 === r ? ml : r,
      s = e.includeExtensions,
      a = e.useGETForQueries,
      c = e.includeUnusedVariables,
      l = void 0 !== c && c,
      u = Ne(e, ["uri", "fetch", "print", "includeExtensions", "useGETForQueries", "includeUnusedVariables"]);
    __DEV__ &&
      (function (e) {
        if (!e && "undefined" == typeof fetch)
          throw __DEV__
            ? new ns(
                "\n\"fetch\" has not been found globally and no fetcher has been configured. To fix this, install a fetch package (like https://www.npmjs.com/package/cross-fetch), instantiate the fetcher, and pass it into your HttpLink constructor. For example:\n\nimport fetch from 'cross-fetch';\nimport { ApolloClient, HttpLink } from '@apollo/client';\nconst client = new ApolloClient({\n  link: new HttpLink({ uri: '/graphql', fetch })\n});\n    "
              )
            : new ns(20);
      })(i || bl);
    var h = { http: { includeExtensions: s }, options: u.fetchOptions, credentials: u.credentials, headers: u.headers };
    return new ul(function (e) {
      var t = (function (e, t) {
          var n = e.getContext().uri;
          return n || ("function" == typeof t ? t(e) : t || "/graphql");
        })(e, n),
        r = e.getContext(),
        s = {};
      if (r.clientAwareness) {
        var c = r.clientAwareness,
          u = c.name,
          d = c.version;
        u && (s["apollographql-client-name"] = u), d && (s["apollographql-client-version"] = d);
      }
      var p,
        f = Re(Re({}, s), r.headers),
        v = { http: r.http, options: r.fetchOptions, credentials: r.credentials, headers: f },
        m = gl(e, o, vl, h, v),
        g = m.options,
        y = m.body;
      if (y.variables && !l) {
        var b = new Set(Object.keys(y.variables));
        ma(e.query, {
          Variable: function (e, t, n) {
            n && "VariableDefinition" !== n.kind && b.delete(e.name.value);
          },
        }),
          b.size &&
            ((y.variables = Re({}, y.variables)),
            b.forEach(function (e) {
              delete y.variables[e];
            }));
      }
      if (!g.signal) {
        var x = (function () {
            if ("undefined" == typeof AbortController) return { controller: !1, signal: !1 };
            var e = new AbortController();
            return { controller: e, signal: e.signal };
          })(),
          w = x.controller,
          S = x.signal;
        (p = w) && (g.signal = S);
      }
      if (
        (a &&
          !e.query.definitions.some(function (e) {
            return "OperationDefinition" === e.kind && "mutation" === e.operation;
          }) &&
          (g.method = "GET"),
        "GET" === g.method)
      ) {
        var _ = (function (e, t) {
            var n = [],
              i = function (e, t) {
                n.push("".concat(e, "=").concat(encodeURIComponent(t)));
              };
            if (
              ("query" in t && i("query", t.query), t.operationName && i("operationName", t.operationName), t.variables)
            ) {
              var r = void 0;
              try {
                r = fl(t.variables, "Variables map");
              } catch (e) {
                return { parseError: e };
              }
              i("variables", r);
            }
            if (t.extensions) {
              var o = void 0;
              try {
                o = fl(t.extensions, "Extensions map");
              } catch (e) {
                return { parseError: e };
              }
              i("extensions", o);
            }
            var s = "",
              a = e,
              c = e.indexOf("#");
            -1 !== c && ((s = e.substr(c)), (a = e.substr(0, c)));
            var l = -1 === a.indexOf("?") ? "?" : "&";
            return { newURI: a + l + n.join("&") + s };
          })(t, y),
          T = _.newURI,
          C = _.parseError;
        if (C) return rl(C);
        t = T;
      } else
        try {
          g.body = fl(y, "Payload");
        } catch (C) {
          return rl(C);
        }
      return new Lc(function (n) {
        var r;
        return (
          (
            i ||
            as(function () {
              return fetch;
            }) ||
            bl
          )(t, g)
            .then(function (t) {
              return e.setContext({ response: t }), t;
            })
            .then(
              ((r = e),
              function (e) {
                return e
                  .text()
                  .then(function (t) {
                    try {
                      return JSON.parse(t);
                    } catch (i) {
                      var n = i;
                      throw (
                        ((n.name = "ServerParseError"),
                        (n.response = e),
                        (n.statusCode = e.status),
                        (n.bodyText = t),
                        n)
                      );
                    }
                  })
                  .then(function (t) {
                    return (
                      e.status >= 300 && ol(e, t, "Response not successful: Received status code ".concat(e.status)),
                      Array.isArray(t) ||
                        pl.call(t, "data") ||
                        pl.call(t, "errors") ||
                        ol(
                          e,
                          t,
                          "Server response was missing for query '".concat(
                            Array.isArray(r)
                              ? r.map(function (e) {
                                  return e.operationName;
                                })
                              : r.operationName,
                            "'."
                          )
                        ),
                      t
                    );
                  });
              })
            )
            .then(function (e) {
              return n.next(e), n.complete(), e;
            })
            .catch(function (e) {
              "AbortError" !== e.name && (e.result && e.result.errors && e.result.data && n.next(e.result), n.error(e));
            }),
          function () {
            p && p.abort();
          }
        );
      });
    });
  },
  wl = (function (e) {
    function t(t) {
      void 0 === t && (t = {});
      var n = e.call(this, xl(t).request) || this;
      return (n.options = t), n;
    }
    return De(t, e), t;
  })(ul);
const { toString: Sl, hasOwnProperty: _l } = Object.prototype,
  Tl = Function.prototype.toString,
  Cl = new Map();
function El(e, t) {
  try {
    return kl(e, t);
  } finally {
    Cl.clear();
  }
}
function kl(e, t) {
  if (e === t) return !0;
  const n = Sl.call(e);
  if (n !== Sl.call(t)) return !1;
  switch (n) {
    case "[object Array]":
      if (e.length !== t.length) return !1;
    case "[object Object]": {
      if (Ml(e, t)) return !0;
      const n = Al(e),
        i = Al(t),
        r = n.length;
      if (r !== i.length) return !1;
      for (let e = 0; e < r; ++e) if (!_l.call(t, n[e])) return !1;
      for (let i = 0; i < r; ++i) {
        const r = n[i];
        if (!kl(e[r], t[r])) return !1;
      }
      return !0;
    }
    case "[object Error]":
      return e.name === t.name && e.message === t.message;
    case "[object Number]":
      if (e != e) return t != t;
    case "[object Boolean]":
    case "[object Date]":
      return +e == +t;
    case "[object RegExp]":
    case "[object String]":
      return e == `${t}`;
    case "[object Map]":
    case "[object Set]": {
      if (e.size !== t.size) return !1;
      if (Ml(e, t)) return !0;
      const i = e.entries(),
        r = "[object Map]" === n;
      for (;;) {
        const e = i.next();
        if (e.done) break;
        const [n, o] = e.value;
        if (!t.has(n)) return !1;
        if (r && !kl(o, t.get(n))) return !1;
      }
      return !0;
    }
    case "[object Uint16Array]":
    case "[object Uint8Array]":
    case "[object Uint32Array]":
    case "[object Int32Array]":
    case "[object Int8Array]":
    case "[object Int16Array]":
    case "[object ArrayBuffer]":
      (e = new Uint8Array(e)), (t = new Uint8Array(t));
    case "[object DataView]": {
      let n = e.byteLength;
      if (n === t.byteLength) for (; n-- && e[n] === t[n]; );
      return -1 === n;
    }
    case "[object AsyncFunction]":
    case "[object GeneratorFunction]":
    case "[object AsyncGeneratorFunction]":
    case "[object Function]": {
      const n = Tl.call(e);
      return (
        n === Tl.call(t) &&
        !(function (e, t) {
          const n = e.length - t.length;
          return n >= 0 && e.indexOf(t, n) === n;
        })(n, Il)
      );
    }
  }
  return !1;
}
function Al(e) {
  return Object.keys(e).filter(Ol, e);
}
function Ol(e) {
  return void 0 !== this[e];
}
const Il = "{ [native code] }";
function Ml(e, t) {
  let n = Cl.get(e);
  if (n) {
    if (n.has(t)) return !0;
  } else Cl.set(e, (n = new Set()));
  return n.add(t), !1;
}
var Pl = function () {
    return Object.create(null);
  },
  Dl = Array.prototype,
  Rl = Dl.forEach,
  Nl = Dl.slice,
  $l = (function () {
    function e(e, t) {
      void 0 === e && (e = !0), void 0 === t && (t = Pl), (this.weakness = e), (this.makeData = t);
    }
    return (
      (e.prototype.lookup = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return this.lookupArray(e);
      }),
      (e.prototype.lookupArray = function (e) {
        var t = this;
        return (
          Rl.call(e, function (e) {
            return (t = t.getChildTrie(e));
          }),
          t.data || (t.data = this.makeData(Nl.call(e)))
        );
      }),
      (e.prototype.getChildTrie = function (t) {
        var n =
            this.weakness &&
            (function (e) {
              switch (typeof e) {
                case "object":
                  if (null === e) break;
                case "function":
                  return !0;
              }
              return !1;
            })(t)
              ? this.weak || (this.weak = new WeakMap())
              : this.strong || (this.strong = new Map()),
          i = n.get(t);
        return i || n.set(t, (i = new e(this.weakness, this.makeData))), i;
      }),
      e
    );
  })();
let Ll = null;
const jl = {};
let zl = 1;
function Fl(e) {
  try {
    return e();
  } catch (e) {}
}
const Vl = "@wry/context:Slot",
  Ul = Fl(() => globalThis) || Fl(() => global) || Object.create(null),
  Bl =
    Ul[Vl] ||
    Array[Vl] ||
    (function (e) {
      try {
        Object.defineProperty(Ul, Vl, { value: e, enumerable: !1, writable: !1, configurable: !0 });
      } finally {
        return e;
      }
    })(
      class {
        constructor() {
          this.id = ["slot", zl++, Date.now(), Math.random().toString(36).slice(2)].join(":");
        }
        hasValue() {
          for (let e = Ll; e; e = e.parent)
            if (this.id in e.slots) {
              const t = e.slots[this.id];
              if (t === jl) break;
              return e !== Ll && (Ll.slots[this.id] = t), !0;
            }
          return Ll && (Ll.slots[this.id] = jl), !1;
        }
        getValue() {
          if (this.hasValue()) return Ll.slots[this.id];
        }
        withValue(e, t, n, i) {
          const r = { __proto__: null, [this.id]: e },
            o = Ll;
          Ll = { parent: o, slots: r };
          try {
            return t.apply(i, n);
          } finally {
            Ll = o;
          }
        }
        static bind(e) {
          const t = Ll;
          return function () {
            const n = Ll;
            try {
              return (Ll = t), e.apply(this, arguments);
            } finally {
              Ll = n;
            }
          };
        }
        static noContext(e, t, n) {
          if (!Ll) return e.apply(n, t);
          {
            const i = Ll;
            try {
              return (Ll = null), e.apply(n, t);
            } finally {
              Ll = i;
            }
          }
        }
      }
    );
function Hl() {}
var ql,
  Ql = (function () {
    function e(e, t) {
      void 0 === e && (e = 1 / 0),
        void 0 === t && (t = Hl),
        (this.max = e),
        (this.dispose = t),
        (this.map = new Map()),
        (this.newest = null),
        (this.oldest = null);
    }
    return (
      (e.prototype.has = function (e) {
        return this.map.has(e);
      }),
      (e.prototype.get = function (e) {
        var t = this.getNode(e);
        return t && t.value;
      }),
      (e.prototype.getNode = function (e) {
        var t = this.map.get(e);
        if (t && t !== this.newest) {
          var n = t.older,
            i = t.newer;
          i && (i.older = n),
            n && (n.newer = i),
            (t.older = this.newest),
            (t.older.newer = t),
            (t.newer = null),
            (this.newest = t),
            t === this.oldest && (this.oldest = i);
        }
        return t;
      }),
      (e.prototype.set = function (e, t) {
        var n = this.getNode(e);
        return n
          ? (n.value = t)
          : ((n = { key: e, value: t, newer: null, older: this.newest }),
            this.newest && (this.newest.newer = n),
            (this.newest = n),
            (this.oldest = this.oldest || n),
            this.map.set(e, n),
            n.value);
      }),
      (e.prototype.clean = function () {
        for (; this.oldest && this.map.size > this.max; ) this.delete(this.oldest.key);
      }),
      (e.prototype.delete = function (e) {
        var t = this.map.get(e);
        return (
          !!t &&
          (t === this.newest && (this.newest = t.older),
          t === this.oldest && (this.oldest = t.newer),
          t.newer && (t.newer.older = t.older),
          t.older && (t.older.newer = t.newer),
          this.map.delete(e),
          this.dispose(t.value, e),
          !0)
        );
      }),
      e
    );
  })(),
  Gl = new Bl(),
  Wl = Object.prototype.hasOwnProperty,
  Yl =
    void 0 === (ql = Array.from)
      ? function (e) {
          var t = [];
          return (
            e.forEach(function (e) {
              return t.push(e);
            }),
            t
          );
        }
      : ql;
function Zl(e) {
  var t = e.unsubscribe;
  "function" == typeof t && ((e.unsubscribe = void 0), t());
}
var Xl = [],
  Kl = 100;
function Jl(e, t) {
  if (!e) throw new Error(t || "assertion failure");
}
function eu(e) {
  switch (e.length) {
    case 0:
      throw new Error("unknown value");
    case 1:
      return e[0];
    case 2:
      throw e[1];
  }
}
var tu = (function () {
  function e(t) {
    (this.fn = t),
      (this.parents = new Set()),
      (this.childValues = new Map()),
      (this.dirtyChildren = null),
      (this.dirty = !0),
      (this.recomputing = !1),
      (this.value = []),
      (this.deps = null),
      ++e.count;
  }
  return (
    (e.prototype.peek = function () {
      if (1 === this.value.length && !ru(this)) return nu(this), this.value[0];
    }),
    (e.prototype.recompute = function (e) {
      return (
        Jl(!this.recomputing, "already recomputing"),
        nu(this),
        ru(this)
          ? (function (e, t) {
              hu(e),
                Gl.withValue(e, iu, [e, t]),
                (function (e, t) {
                  if ("function" == typeof e.subscribe)
                    try {
                      Zl(e), (e.unsubscribe = e.subscribe.apply(null, t));
                    } catch (t) {
                      return e.setDirty(), !1;
                    }
                  return !0;
                })(e, t) &&
                  (function (e) {
                    if (((e.dirty = !1), ru(e))) return;
                    su(e);
                  })(e);
              return eu(e.value);
            })(this, e)
          : eu(this.value)
      );
    }),
    (e.prototype.setDirty = function () {
      this.dirty || ((this.dirty = !0), (this.value.length = 0), ou(this), Zl(this));
    }),
    (e.prototype.dispose = function () {
      var e = this;
      this.setDirty(),
        hu(this),
        au(this, function (t, n) {
          t.setDirty(), du(t, e);
        });
    }),
    (e.prototype.forget = function () {
      this.dispose();
    }),
    (e.prototype.dependOn = function (e) {
      e.add(this), this.deps || (this.deps = Xl.pop() || new Set()), this.deps.add(e);
    }),
    (e.prototype.forgetDeps = function () {
      var e = this;
      this.deps &&
        (Yl(this.deps).forEach(function (t) {
          return t.delete(e);
        }),
        this.deps.clear(),
        Xl.push(this.deps),
        (this.deps = null));
    }),
    (e.count = 0),
    e
  );
})();
function nu(e) {
  var t = Gl.getValue();
  if (t) return e.parents.add(t), t.childValues.has(e) || t.childValues.set(e, []), ru(e) ? cu(t, e) : lu(t, e), t;
}
function iu(e, t) {
  (e.recomputing = !0), (e.value.length = 0);
  try {
    e.value[0] = e.fn.apply(null, t);
  } catch (t) {
    e.value[1] = t;
  }
  e.recomputing = !1;
}
function ru(e) {
  return e.dirty || !(!e.dirtyChildren || !e.dirtyChildren.size);
}
function ou(e) {
  au(e, cu);
}
function su(e) {
  au(e, lu);
}
function au(e, t) {
  var n = e.parents.size;
  if (n) for (var i = Yl(e.parents), r = 0; r < n; ++r) t(i[r], e);
}
function cu(e, t) {
  Jl(e.childValues.has(t)), Jl(ru(t));
  var n = !ru(e);
  if (e.dirtyChildren) {
    if (e.dirtyChildren.has(t)) return;
  } else e.dirtyChildren = Xl.pop() || new Set();
  e.dirtyChildren.add(t), n && ou(e);
}
function lu(e, t) {
  Jl(e.childValues.has(t)), Jl(!ru(t));
  var n = e.childValues.get(t);
  0 === n.length
    ? e.childValues.set(t, t.value.slice(0))
    : (function (e, t) {
        var n = e.length;
        return n > 0 && n === t.length && e[n - 1] === t[n - 1];
      })(n, t.value) || e.setDirty(),
    uu(e, t),
    ru(e) || su(e);
}
function uu(e, t) {
  var n = e.dirtyChildren;
  n && (n.delete(t), 0 === n.size && (Xl.length < Kl && Xl.push(n), (e.dirtyChildren = null)));
}
function hu(e) {
  e.childValues.size > 0 &&
    e.childValues.forEach(function (t, n) {
      du(e, n);
    }),
    e.forgetDeps(),
    Jl(null === e.dirtyChildren);
}
function du(e, t) {
  t.parents.delete(e), e.childValues.delete(t), uu(e, t);
}
var pu = { setDirty: !0, dispose: !0, forget: !0 };
function fu(e) {
  var t = new Map(),
    n = e && e.subscribe;
  function i(e) {
    var i = Gl.getValue();
    if (i) {
      var r = t.get(e);
      r || t.set(e, (r = new Set())), i.dependOn(r), "function" == typeof n && (Zl(r), (r.unsubscribe = n(e)));
    }
  }
  return (
    (i.dirty = function (e, n) {
      var i = t.get(e);
      if (i) {
        var r = n && Wl.call(pu, n) ? n : "setDirty";
        Yl(i).forEach(function (e) {
          return e[r]();
        }),
          t.delete(e),
          Zl(i);
      }
    }),
    i
  );
}
function vu() {
  var e = new $l("function" == typeof WeakMap);
  return function () {
    return e.lookupArray(arguments);
  };
}
vu();
var mu = new Set();
function gu(e, t) {
  void 0 === t && (t = Object.create(null));
  var n = new Ql(t.max || Math.pow(2, 16), function (e) {
      return e.dispose();
    }),
    i = t.keyArgs,
    r = t.makeCacheKey || vu(),
    o = function () {
      var o = r.apply(null, i ? i.apply(null, arguments) : arguments);
      if (void 0 === o) return e.apply(null, arguments);
      var s = n.get(o);
      s ||
        (n.set(o, (s = new tu(e))),
        (s.subscribe = t.subscribe),
        (s.forget = function () {
          return n.delete(o);
        }));
      var a = s.recompute(Array.prototype.slice.call(arguments));
      return (
        n.set(o, s),
        mu.add(n),
        Gl.hasValue() ||
          (mu.forEach(function (e) {
            return e.clean();
          }),
          mu.clear()),
        a
      );
    };
  function s(e) {
    var t = n.get(e);
    t && t.setDirty();
  }
  function a(e) {
    var t = n.get(e);
    if (t) return t.peek();
  }
  function c(e) {
    return n.delete(e);
  }
  return (
    Object.defineProperty(o, "size", {
      get: function () {
        return n.map.size;
      },
      configurable: !1,
      enumerable: !1,
    }),
    (o.dirtyKey = s),
    (o.dirty = function () {
      s(r.apply(null, arguments));
    }),
    (o.peekKey = a),
    (o.peek = function () {
      return a(r.apply(null, arguments));
    }),
    (o.forgetKey = c),
    (o.forget = function () {
      return c(r.apply(null, arguments));
    }),
    (o.makeCacheKey = r),
    (o.getKey = i
      ? function () {
          return r.apply(null, i.apply(null, arguments));
        }
      : r),
    Object.freeze(o)
  );
}
var yu = (function () {
    function e() {
      this.getFragmentDoc = gu(Pa);
    }
    return (
      (e.prototype.batch = function (e) {
        var t,
          n = this,
          i = "string" == typeof e.optimistic ? e.optimistic : !1 === e.optimistic ? null : void 0;
        return (
          this.performTransaction(function () {
            return (t = e.update(n));
          }, i),
          t
        );
      }),
      (e.prototype.recordOptimisticTransaction = function (e, t) {
        this.performTransaction(e, t);
      }),
      (e.prototype.transformDocument = function (e) {
        return e;
      }),
      (e.prototype.identify = function (e) {}),
      (e.prototype.gc = function () {
        return [];
      }),
      (e.prototype.modify = function (e) {
        return !1;
      }),
      (e.prototype.transformForLink = function (e) {
        return e;
      }),
      (e.prototype.readQuery = function (e, t) {
        return (
          void 0 === t && (t = !!e.optimistic),
          this.read(Re(Re({}, e), { rootId: e.id || "ROOT_QUERY", optimistic: t }))
        );
      }),
      (e.prototype.readFragment = function (e, t) {
        return (
          void 0 === t && (t = !!e.optimistic),
          this.read(
            Re(Re({}, e), { query: this.getFragmentDoc(e.fragment, e.fragmentName), rootId: e.id, optimistic: t })
          )
        );
      }),
      (e.prototype.writeQuery = function (e) {
        var t = e.id,
          n = e.data,
          i = Ne(e, ["id", "data"]);
        return this.write(Object.assign(i, { dataId: t || "ROOT_QUERY", result: n }));
      }),
      (e.prototype.writeFragment = function (e) {
        var t = e.id,
          n = e.data,
          i = e.fragment,
          r = e.fragmentName,
          o = Ne(e, ["id", "data", "fragment", "fragmentName"]);
        return this.write(Object.assign(o, { query: this.getFragmentDoc(i, r), dataId: t, result: n }));
      }),
      (e.prototype.updateQuery = function (e, t) {
        return this.batch({
          update: function (n) {
            var i = n.readQuery(e),
              r = t(i);
            return null == r ? i : (n.writeQuery(Re(Re({}, e), { data: r })), r);
          },
        });
      }),
      (e.prototype.updateFragment = function (e, t) {
        return this.batch({
          update: function (n) {
            var i = n.readFragment(e),
              r = t(i);
            return null == r ? i : (n.writeFragment(Re(Re({}, e), { data: r })), r);
          },
        });
      }),
      e
    );
  })(),
  bu = function (e, t, n, i) {
    (this.message = e), (this.path = t), (this.query = n), (this.variables = i);
  },
  xu = Object.prototype.hasOwnProperty;
function wu(e, t) {
  var n = e.__typename,
    i = e.id,
    r = e._id;
  if (
    "string" == typeof n &&
    (t && (t.keyObject = void 0 !== i ? { id: i } : void 0 !== r ? { _id: r } : void 0),
    void 0 === i && (i = r),
    void 0 !== i)
  )
    return "".concat(n, ":").concat("number" == typeof i || "string" == typeof i ? i : JSON.stringify(i));
}
var Su = { dataIdFromObject: wu, addTypename: !0, resultCaching: !0, canonizeResults: !1 };
function _u(e) {
  var t = e.canonizeResults;
  return void 0 === t ? Su.canonizeResults : t;
}
var Tu = /^[_a-z][_0-9a-z]*/i;
function Cu(e) {
  var t = e.match(Tu);
  return t ? t[0] : e;
}
function Eu(e, t, n) {
  return (
    !!Na(t) &&
    (Array.isArray(t)
      ? t.every(function (t) {
          return Eu(e, t, n);
        })
      : e.selections.every(function (e) {
          if (Qa(e) && Oa(e, n)) {
            var i = Ha(e);
            return xu.call(t, i) && (!e.selectionSet || Eu(e.selectionSet, t[i], n));
          }
          return !0;
        }))
  );
}
function ku(e) {
  return Na(e) && !La(e) && !Array.isArray(e);
}
var Au = Object.create(null),
  Ou = function () {
    return Au;
  },
  Iu = Object.create(null),
  Mu = (function () {
    function e(e, t) {
      var n = this;
      (this.policies = e),
        (this.group = t),
        (this.data = Object.create(null)),
        (this.rootIds = Object.create(null)),
        (this.refs = Object.create(null)),
        (this.getFieldValue = function (e, t) {
          return Hc(La(e) ? n.get(e.__ref, t) : e && e[t]);
        }),
        (this.canRead = function (e) {
          return La(e) ? n.has(e.__ref) : "object" == typeof e;
        }),
        (this.toReference = function (e, t) {
          if ("string" == typeof e) return $a(e);
          if (La(e)) return e;
          var i = n.policies.identify(e)[0];
          if (i) {
            var r = $a(i);
            return t && n.merge(i, e), r;
          }
        });
    }
    return (
      (e.prototype.toObject = function () {
        return Re({}, this.data);
      }),
      (e.prototype.has = function (e) {
        return void 0 !== this.lookup(e, !0);
      }),
      (e.prototype.get = function (e, t) {
        if ((this.group.depend(e, t), xu.call(this.data, e))) {
          var n = this.data[e];
          if (n && xu.call(n, t)) return n[t];
        }
        return "__typename" === t && xu.call(this.policies.rootTypenamesById, e)
          ? this.policies.rootTypenamesById[e]
          : this instanceof Nu
          ? this.parent.get(e, t)
          : void 0;
      }),
      (e.prototype.lookup = function (e, t) {
        return (
          t && this.group.depend(e, "__exists"),
          xu.call(this.data, e)
            ? this.data[e]
            : this instanceof Nu
            ? this.parent.lookup(e, t)
            : this.policies.rootTypenamesById[e]
            ? Object.create(null)
            : void 0
        );
      }),
      (e.prototype.merge = function (e, t) {
        var n,
          i = this;
        La(e) && (e = e.__ref), La(t) && (t = t.__ref);
        var r = "string" == typeof e ? this.lookup((n = e)) : e,
          o = "string" == typeof t ? this.lookup((n = t)) : t;
        if (o) {
          __DEV__ ? is("string" == typeof n, "store.merge expects a string ID") : is("string" == typeof n, 1);
          var s = new vc(Lu).merge(r, o);
          if (((this.data[n] = s), s !== r && (delete this.refs[n], this.group.caching))) {
            var a = Object.create(null);
            r || (a.__exists = 1),
              Object.keys(o).forEach(function (e) {
                if (!r || r[e] !== s[e]) {
                  a[e] = 1;
                  var t = Cu(e);
                  t === e || i.policies.hasKeyArgs(s.__typename, t) || (a[t] = 1),
                    void 0 !== s[e] || i instanceof Nu || delete s[e];
                }
              }),
              !a.__typename ||
                (r && r.__typename) ||
                this.policies.rootTypenamesById[n] !== s.__typename ||
                delete a.__typename,
              Object.keys(a).forEach(function (e) {
                return i.group.dirty(n, e);
              });
          }
        }
      }),
      (e.prototype.modify = function (e, t) {
        var n = this,
          i = this.lookup(e);
        if (i) {
          var r = Object.create(null),
            o = !1,
            s = !0,
            a = {
              DELETE: Au,
              INVALIDATE: Iu,
              isReference: La,
              toReference: this.toReference,
              canRead: this.canRead,
              readField: function (t, i) {
                return n.policies.readField("string" == typeof t ? { fieldName: t, from: i || $a(e) } : t, {
                  store: n,
                });
              },
            };
          if (
            (Object.keys(i).forEach(function (c) {
              var l = Cu(c),
                u = i[c];
              if (void 0 !== u) {
                var h = "function" == typeof t ? t : t[c] || t[l];
                if (h) {
                  var d =
                    h === Ou
                      ? Au
                      : h(Hc(u), Re(Re({}, a), { fieldName: l, storeFieldName: c, storage: n.getStorage(e, c) }));
                  d === Iu
                    ? n.group.dirty(e, c)
                    : (d === Au && (d = void 0), d !== u && ((r[c] = d), (o = !0), (u = d)));
                }
                void 0 !== u && (s = !1);
              }
            }),
            o)
          )
            return (
              this.merge(e, r),
              s &&
                (this instanceof Nu ? (this.data[e] = void 0) : delete this.data[e], this.group.dirty(e, "__exists")),
              !0
            );
        }
        return !1;
      }),
      (e.prototype.delete = function (e, t, n) {
        var i,
          r = this.lookup(e);
        if (r) {
          var o = this.getFieldValue(r, "__typename"),
            s = t && n ? this.policies.getStoreFieldName({ typename: o, fieldName: t, args: n }) : t;
          return this.modify(e, s ? (((i = {})[s] = Ou), i) : Ou);
        }
        return !1;
      }),
      (e.prototype.evict = function (e, t) {
        var n = !1;
        return (
          e.id &&
            (xu.call(this.data, e.id) && (n = this.delete(e.id, e.fieldName, e.args)),
            this instanceof Nu && this !== t && (n = this.parent.evict(e, t) || n),
            (e.fieldName || n) && this.group.dirty(e.id, e.fieldName || "__exists")),
          n
        );
      }),
      (e.prototype.clear = function () {
        this.replace(null);
      }),
      (e.prototype.extract = function () {
        var e = this,
          t = this.toObject(),
          n = [];
        return (
          this.getRootIdSet().forEach(function (t) {
            xu.call(e.policies.rootTypenamesById, t) || n.push(t);
          }),
          n.length && (t.__META = { extraRootIds: n.sort() }),
          t
        );
      }),
      (e.prototype.replace = function (e) {
        var t = this;
        if (
          (Object.keys(this.data).forEach(function (n) {
            (e && xu.call(e, n)) || t.delete(n);
          }),
          e)
        ) {
          var n = e.__META,
            i = Ne(e, ["__META"]);
          Object.keys(i).forEach(function (e) {
            t.merge(e, i[e]);
          }),
            n && n.extraRootIds.forEach(this.retain, this);
        }
      }),
      (e.prototype.retain = function (e) {
        return (this.rootIds[e] = (this.rootIds[e] || 0) + 1);
      }),
      (e.prototype.release = function (e) {
        if (this.rootIds[e] > 0) {
          var t = --this.rootIds[e];
          return t || delete this.rootIds[e], t;
        }
        return 0;
      }),
      (e.prototype.getRootIdSet = function (e) {
        return (
          void 0 === e && (e = new Set()),
          Object.keys(this.rootIds).forEach(e.add, e),
          this instanceof Nu
            ? this.parent.getRootIdSet(e)
            : Object.keys(this.policies.rootTypenamesById).forEach(e.add, e),
          e
        );
      }),
      (e.prototype.gc = function () {
        var e = this,
          t = this.getRootIdSet(),
          n = this.toObject();
        t.forEach(function (i) {
          xu.call(n, i) && (Object.keys(e.findChildRefIds(i)).forEach(t.add, t), delete n[i]);
        });
        var i = Object.keys(n);
        if (i.length) {
          for (var r = this; r instanceof Nu; ) r = r.parent;
          i.forEach(function (e) {
            return r.delete(e);
          });
        }
        return i;
      }),
      (e.prototype.findChildRefIds = function (e) {
        if (!xu.call(this.refs, e)) {
          var t = (this.refs[e] = Object.create(null)),
            n = this.data[e];
          if (!n) return t;
          var i = new Set([n]);
          i.forEach(function (e) {
            La(e) && (t[e.__ref] = !0),
              Na(e) &&
                Object.keys(e).forEach(function (t) {
                  var n = e[t];
                  Na(n) && i.add(n);
                });
          });
        }
        return this.refs[e];
      }),
      (e.prototype.makeCacheKey = function () {
        return this.group.keyMaker.lookupArray(arguments);
      }),
      e
    );
  })(),
  Pu = (function () {
    function e(e, t) {
      void 0 === t && (t = null), (this.caching = e), (this.parent = t), (this.d = null), this.resetCaching();
    }
    return (
      (e.prototype.resetCaching = function () {
        (this.d = this.caching ? fu() : null), (this.keyMaker = new $l(Gc));
      }),
      (e.prototype.depend = function (e, t) {
        if (this.d) {
          this.d(Du(e, t));
          var n = Cu(t);
          n !== t && this.d(Du(e, n)), this.parent && this.parent.depend(e, t);
        }
      }),
      (e.prototype.dirty = function (e, t) {
        this.d && this.d.dirty(Du(e, t), "__exists" === t ? "forget" : "setDirty");
      }),
      e
    );
  })();
function Du(e, t) {
  return t + "#" + e;
}
function Ru(e, t) {
  ju(e) && e.group.depend(t, "__exists");
}
!(function (e) {
  var t = (function (e) {
    function t(t) {
      var n = t.policies,
        i = t.resultCaching,
        r = void 0 === i || i,
        o = t.seed,
        s = e.call(this, n, new Pu(r)) || this;
      return (s.stump = new $u(s)), (s.storageTrie = new $l(Gc)), o && s.replace(o), s;
    }
    return (
      De(t, e),
      (t.prototype.addLayer = function (e, t) {
        return this.stump.addLayer(e, t);
      }),
      (t.prototype.removeLayer = function () {
        return this;
      }),
      (t.prototype.getStorage = function () {
        return this.storageTrie.lookupArray(arguments);
      }),
      t
    );
  })(e);
  e.Root = t;
})(Mu || (Mu = {}));
var Nu = (function (e) {
    function t(t, n, i, r) {
      var o = e.call(this, n.policies, r) || this;
      return (o.id = t), (o.parent = n), (o.replay = i), (o.group = r), i(o), o;
    }
    return (
      De(t, e),
      (t.prototype.addLayer = function (e, n) {
        return new t(e, this, n, this.group);
      }),
      (t.prototype.removeLayer = function (e) {
        var t = this,
          n = this.parent.removeLayer(e);
        return e === this.id
          ? (this.group.caching &&
              Object.keys(this.data).forEach(function (e) {
                var i = t.data[e],
                  r = n.lookup(e);
                r
                  ? i
                    ? i !== r &&
                      Object.keys(i).forEach(function (n) {
                        El(i[n], r[n]) || t.group.dirty(e, n);
                      })
                    : (t.group.dirty(e, "__exists"),
                      Object.keys(r).forEach(function (n) {
                        t.group.dirty(e, n);
                      }))
                  : t.delete(e);
              }),
            n)
          : n === this.parent
          ? this
          : n.addLayer(this.id, this.replay);
      }),
      (t.prototype.toObject = function () {
        return Re(Re({}, this.parent.toObject()), this.data);
      }),
      (t.prototype.findChildRefIds = function (t) {
        var n = this.parent.findChildRefIds(t);
        return xu.call(this.data, t) ? Re(Re({}, n), e.prototype.findChildRefIds.call(this, t)) : n;
      }),
      (t.prototype.getStorage = function () {
        for (var e = this.parent; e.parent; ) e = e.parent;
        return e.getStorage.apply(e, arguments);
      }),
      t
    );
  })(Mu),
  $u = (function (e) {
    function t(t) {
      return e.call(this, "EntityStore.Stump", t, function () {}, new Pu(t.group.caching, t.group)) || this;
    }
    return (
      De(t, e),
      (t.prototype.removeLayer = function () {
        return this;
      }),
      (t.prototype.merge = function () {
        return this.parent.merge.apply(this.parent, arguments);
      }),
      t
    );
  })(Nu);
function Lu(e, t, n) {
  var i = e[n],
    r = t[n];
  return El(i, r) ? i : r;
}
function ju(e) {
  return !!(e instanceof Mu && e.group.caching);
}
var zu,
  Fu,
  Vu = (function () {
    function e() {
      (this.known = new (Wc ? WeakSet : Set)()),
        (this.pool = new $l(Gc)),
        (this.passes = new WeakMap()),
        (this.keysByJSON = new Map()),
        (this.empty = this.admit({}));
    }
    return (
      (e.prototype.isKnown = function (e) {
        return Na(e) && this.known.has(e);
      }),
      (e.prototype.pass = function (e) {
        if (Na(e)) {
          var t = (function (e) {
            return Na(e) ? (Array.isArray(e) ? e.slice(0) : Re({ __proto__: Object.getPrototypeOf(e) }, e)) : e;
          })(e);
          return this.passes.set(t, e), t;
        }
        return e;
      }),
      (e.prototype.admit = function (e) {
        var t = this;
        if (Na(e)) {
          var n = this.passes.get(e);
          if (n) return n;
          switch (Object.getPrototypeOf(e)) {
            case Array.prototype:
              if (this.known.has(e)) return e;
              var i = e.map(this.admit, this);
              return (
                (a = this.pool.lookupArray(i)).array || (this.known.add((a.array = i)), __DEV__ && Object.freeze(i)),
                a.array
              );
            case null:
            case Object.prototype:
              if (this.known.has(e)) return e;
              var r = Object.getPrototypeOf(e),
                o = [r],
                s = this.sortedKeys(e);
              o.push(s.json);
              var a,
                c = o.length;
              if (
                (s.sorted.forEach(function (n) {
                  o.push(t.admit(e[n]));
                }),
                !(a = this.pool.lookupArray(o)).object)
              ) {
                var l = (a.object = Object.create(r));
                this.known.add(l),
                  s.sorted.forEach(function (e, t) {
                    l[e] = o[c + t];
                  }),
                  __DEV__ && Object.freeze(l);
              }
              return a.object;
          }
        }
        return e;
      }),
      (e.prototype.sortedKeys = function (e) {
        var t = Object.keys(e),
          n = this.pool.lookupArray(t);
        if (!n.keys) {
          t.sort();
          var i = JSON.stringify(t);
          (n.keys = this.keysByJSON.get(i)) || this.keysByJSON.set(i, (n.keys = { sorted: t, json: i }));
        }
        return n.keys;
      }),
      e
    );
  })(),
  Uu = Object.assign(
    function (e) {
      if (Na(e)) {
        void 0 === zu && Bu();
        var t = zu.admit(e),
          n = Fu.get(t);
        return void 0 === n && Fu.set(t, (n = JSON.stringify(t))), n;
      }
      return JSON.stringify(e);
    },
    { reset: Bu }
  );
function Bu() {
  (zu = new Vu()), (Fu = new (Gc ? WeakMap : Map)());
}
function Hu(e) {
  return [e.selectionSet, e.objectOrReference, e.context, e.context.canonizeResults];
}
var qu = (function () {
  function e(e) {
    var t = this;
    (this.knownResults = new (Gc ? WeakMap : Map)()),
      (this.config = tl(e, { addTypename: !1 !== e.addTypename, canonizeResults: _u(e) })),
      (this.canon = e.canon || new Vu()),
      (this.executeSelectionSet = gu(
        function (e) {
          var n,
            i = e.context.canonizeResults,
            r = Hu(e);
          r[3] = !i;
          var o = (n = t.executeSelectionSet).peek.apply(n, r);
          return o
            ? i
              ? Re(Re({}, o), { result: t.canon.admit(o.result) })
              : o
            : (Ru(e.context.store, e.enclosingRef.__ref), t.execSelectionSetImpl(e));
        },
        {
          max: this.config.resultCacheMaxSize,
          keyArgs: Hu,
          makeCacheKey: function (e, t, n, i) {
            if (ju(n.store)) return n.store.makeCacheKey(e, La(t) ? t.__ref : t, n.varString, i);
          },
        }
      )),
      (this.executeSubSelectedArray = gu(
        function (e) {
          return Ru(e.context.store, e.enclosingRef.__ref), t.execSubSelectedArrayImpl(e);
        },
        {
          max: this.config.resultCacheMaxSize,
          makeCacheKey: function (e) {
            var t = e.field,
              n = e.array,
              i = e.context;
            if (ju(i.store)) return i.store.makeCacheKey(t, n, i.varString);
          },
        }
      ));
  }
  return (
    (e.prototype.resetCanon = function () {
      this.canon = new Vu();
    }),
    (e.prototype.diffQueryAgainstStore = function (e) {
      var t = e.store,
        n = e.query,
        i = e.rootId,
        r = void 0 === i ? "ROOT_QUERY" : i,
        o = e.variables,
        s = e.returnPartialData,
        a = void 0 === s || s,
        c = e.canonizeResults,
        l = void 0 === c ? this.config.canonizeResults : c,
        u = this.config.cache.policies;
      o = Re(Re({}, ec(Ka(n))), o);
      var h,
        d = $a(r),
        p = new vc(),
        f = this.executeSelectionSet({
          selectionSet: Ja(n).selectionSet,
          objectOrReference: d,
          enclosingRef: d,
          context: {
            store: t,
            query: n,
            policies: u,
            variables: o,
            varString: Uu(o),
            canonizeResults: l,
            fragmentMap: Da(Xa(n)),
            merge: function (e, t) {
              return p.merge(e, t);
            },
          },
        });
      if (f.missing && ((h = [new bu(Qu(f.missing), f.missing, n, o)]), !a)) throw h[0];
      return { result: f.result, complete: !h, missing: h };
    }),
    (e.prototype.isFresh = function (e, t, n, i) {
      if (ju(i.store) && this.knownResults.get(e) === n) {
        var r = this.executeSelectionSet.peek(n, t, i, this.canon.isKnown(e));
        if (r && e === r.result) return !0;
      }
      return !1;
    }),
    (e.prototype.execSelectionSetImpl = function (e) {
      var t = this,
        n = e.selectionSet,
        i = e.objectOrReference,
        r = e.enclosingRef,
        o = e.context;
      if (La(i) && !o.policies.rootTypenamesById[i.__ref] && !o.store.has(i.__ref))
        return { result: this.canon.empty, missing: "Dangling reference to missing ".concat(i.__ref, " object") };
      var s,
        a = o.variables,
        c = o.policies,
        l = o.store.getFieldValue(i, "__typename"),
        u = {};
      function h(e, t) {
        var n;
        return e.missing && (s = o.merge(s, (((n = {})[t] = e.missing), n))), e.result;
      }
      this.config.addTypename && "string" == typeof l && !c.rootIdsByTypename[l] && (u = { __typename: l });
      var d = new Set(n.selections);
      d.forEach(function (e) {
        var n, p;
        if (Oa(e, a))
          if (Qa(e)) {
            var f = c.readField({ fieldName: e.name.value, field: e, variables: o.variables, from: i }, o),
              v = Ha(e);
            void 0 === f
              ? ac.added(e) ||
                (s = o.merge(
                  s,
                  (((n = {})[v] = "Can't find field '"
                    .concat(e.name.value, "' on ")
                    .concat(La(i) ? i.__ref + " object" : "object " + JSON.stringify(i, null, 2))),
                  n)
                ))
              : Array.isArray(f)
              ? (f = h(t.executeSubSelectedArray({ field: e, array: f, enclosingRef: r, context: o }), v))
              : e.selectionSet
              ? null != f &&
                (f = h(
                  t.executeSelectionSet({
                    selectionSet: e.selectionSet,
                    objectOrReference: f,
                    enclosingRef: La(f) ? f : r,
                    context: o,
                  }),
                  v
                ))
              : o.canonizeResults && (f = t.canon.pass(f)),
              void 0 !== f && (u = o.merge(u, (((p = {})[v] = f), p)));
          } else {
            var m = Ra(e, o.fragmentMap);
            m && c.fragmentMatches(m, l) && m.selectionSet.selections.forEach(d.add, d);
          }
      });
      var p = { result: u, missing: s },
        f = o.canonizeResults ? this.canon.admit(p) : Hc(p);
      return f.result && this.knownResults.set(f.result, n), f;
    }),
    (e.prototype.execSubSelectedArrayImpl = function (e) {
      var t,
        n = this,
        i = e.field,
        r = e.array,
        o = e.enclosingRef,
        s = e.context;
      function a(e, n) {
        var i;
        return e.missing && (t = s.merge(t, (((i = {})[n] = e.missing), i))), e.result;
      }
      return (
        i.selectionSet && (r = r.filter(s.store.canRead)),
        (r = r.map(function (e, t) {
          return null === e
            ? null
            : Array.isArray(e)
            ? a(n.executeSubSelectedArray({ field: i, array: e, enclosingRef: o, context: s }), t)
            : i.selectionSet
            ? a(
                n.executeSelectionSet({
                  selectionSet: i.selectionSet,
                  objectOrReference: e,
                  enclosingRef: La(e) ? e : o,
                  context: s,
                }),
                t
              )
            : (__DEV__ &&
                (function (e, t, n) {
                  if (!t.selectionSet) {
                    var i = new Set([n]);
                    i.forEach(function (n) {
                      Na(n) &&
                        (__DEV__
                          ? is(
                              !La(n),
                              "Missing selection set for object of type "
                                .concat(
                                  (function (e, t) {
                                    return La(t) ? e.get(t.__ref, "__typename") : t && t.__typename;
                                  })(e, n),
                                  " returned for query field "
                                )
                                .concat(t.name.value)
                            )
                          : is(!La(n), 5),
                        Object.values(n).forEach(i.add, i));
                    });
                  }
                })(s.store, i, e),
              e);
        })),
        { result: s.canonizeResults ? this.canon.admit(r) : r, missing: t }
      );
    }),
    e
  );
})();
function Qu(e) {
  try {
    JSON.stringify(e, function (e, t) {
      if ("string" == typeof t) throw t;
      return t;
    });
  } catch (e) {
    return e;
  }
}
var Gu = null,
  Wu = {},
  Yu = 1,
  Zu = "@wry/context:Slot",
  Xu = Array,
  Ku =
    Xu[Zu] ||
    (function () {
      var e = (function () {
        function e() {
          this.id = ["slot", Yu++, Date.now(), Math.random().toString(36).slice(2)].join(":");
        }
        return (
          (e.prototype.hasValue = function () {
            for (var e = Gu; e; e = e.parent)
              if (this.id in e.slots) {
                var t = e.slots[this.id];
                if (t === Wu) break;
                return e !== Gu && (Gu.slots[this.id] = t), !0;
              }
            return Gu && (Gu.slots[this.id] = Wu), !1;
          }),
          (e.prototype.getValue = function () {
            if (this.hasValue()) return Gu.slots[this.id];
          }),
          (e.prototype.withValue = function (e, t, n, i) {
            var r,
              o = (((r = { __proto__: null })[this.id] = e), r),
              s = Gu;
            Gu = { parent: s, slots: o };
            try {
              return t.apply(i, n);
            } finally {
              Gu = s;
            }
          }),
          (e.bind = function (e) {
            var t = Gu;
            return function () {
              var n = Gu;
              try {
                return (Gu = t), e.apply(this, arguments);
              } finally {
                Gu = n;
              }
            };
          }),
          (e.noContext = function (e, t, n) {
            if (!Gu) return e.apply(n, t);
            var i = Gu;
            try {
              return (Gu = null), e.apply(n, t);
            } finally {
              Gu = i;
            }
          }),
          e
        );
      })();
      try {
        Object.defineProperty(Xu, Zu, { value: (Xu[Zu] = e), enumerable: !1, writable: !1, configurable: !1 });
      } finally {
        return e;
      }
    })();
Ku.bind, Ku.noContext;
var Ju = new Ku(),
  eh = new WeakMap();
function th(e) {
  var t = eh.get(e);
  return t || eh.set(e, (t = { vars: new Set(), dep: fu() })), t;
}
function nh(e) {
  th(e).vars.forEach(function (t) {
    return t.forgetCache(e);
  });
}
function ih(e) {
  var t = new Set(),
    n = new Set(),
    i = function (o) {
      if (arguments.length > 0) {
        if (e !== o) {
          (e = o),
            t.forEach(function (e) {
              th(e).dep.dirty(i),
                (function (e) {
                  e.broadcastWatches && e.broadcastWatches();
                })(e);
            });
          var s = Array.from(n);
          n.clear(),
            s.forEach(function (t) {
              return t(e);
            });
        }
      } else {
        var a = Ju.getValue();
        a && (r(a), th(a).dep(i));
      }
      return e;
    };
  i.onNextChange = function (e) {
    return (
      n.add(e),
      function () {
        n.delete(e);
      }
    );
  };
  var r = (i.attachCache = function (e) {
    return t.add(e), th(e).vars.add(i), i;
  });
  return (
    (i.forgetCache = function (e) {
      return t.delete(e);
    }),
    i
  );
}
var rh = Object.create(null);
function oh(e) {
  var t = JSON.stringify(e);
  return rh[t] || (rh[t] = Object.create(null));
}
function sh(e) {
  var t = oh(e);
  return (
    t.keyFieldsFn ||
    (t.keyFieldsFn = function (t, n) {
      var i = function (e, t) {
          return n.readField(t, e);
        },
        r = (n.keyObject = ch(e, function (e) {
          var r = hh(n.storeObject, e, i);
          return (
            void 0 === r && t !== n.storeObject && xu.call(t, e[0]) && (r = hh(t, e, uh)),
            __DEV__
              ? is(
                  void 0 !== r,
                  "Missing field '".concat(e.join("."), "' while extracting keyFields from ").concat(JSON.stringify(t))
                )
              : is(void 0 !== r, 2),
            r
          );
        }));
      return "".concat(n.typename, ":").concat(JSON.stringify(r));
    })
  );
}
function ah(e) {
  var t = oh(e);
  return (
    t.keyArgsFn ||
    (t.keyArgsFn = function (t, n) {
      var i = n.field,
        r = n.variables,
        o = n.fieldName,
        s = ch(e, function (e) {
          var n = e[0],
            o = n.charAt(0);
          if ("@" !== o)
            if ("$" !== o) {
              if (t) return hh(t, e);
            } else {
              var s = n.slice(1);
              if (r && xu.call(r, s)) {
                var a = e.slice(0);
                return (a[0] = s), hh(r, a);
              }
            }
          else if (i && Jc(i.directives)) {
            var c = n.slice(1),
              l = i.directives.find(function (e) {
                return e.name.value === c;
              }),
              u = l && Ba(l, r);
            return u && hh(u, e.slice(1));
          }
        }),
        a = JSON.stringify(s);
      return (t || "{}" !== a) && (o += ":" + a), o;
    })
  );
}
function ch(e, t) {
  var n = new vc();
  return lh(e).reduce(function (e, i) {
    var r,
      o = t(i);
    if (void 0 !== o) {
      for (var s = i.length - 1; s >= 0; --s) ((r = {})[i[s]] = o), (o = r);
      e = n.merge(e, o);
    }
    return e;
  }, Object.create(null));
}
function lh(e) {
  var t = oh(e);
  if (!t.paths) {
    var n = (t.paths = []),
      i = [];
    e.forEach(function (t, r) {
      Array.isArray(t)
        ? (lh(t).forEach(function (e) {
            return n.push(i.concat(e));
          }),
          (i.length = 0))
        : (i.push(t), Array.isArray(e[r + 1]) || (n.push(i.slice(0)), (i.length = 0)));
    });
  }
  return t.paths;
}
function uh(e, t) {
  return e[t];
}
function hh(e, t, n) {
  return (
    (n = n || uh),
    dh(
      t.reduce(function e(t, i) {
        return Array.isArray(t)
          ? t.map(function (t) {
              return e(t, i);
            })
          : t && n(t, i);
      }, e)
    )
  );
}
function dh(e) {
  return Na(e)
    ? Array.isArray(e)
      ? e.map(dh)
      : ch(Object.keys(e).sort(), function (t) {
          return hh(e, t);
        })
    : e;
}
function ph(e) {
  return void 0 !== e.args ? e.args : e.field ? Ba(e.field, e.variables) : null;
}
Fa.setStringify(Uu);
var fh = function () {},
  vh = function (e, t) {
    return t.fieldName;
  },
  mh = function (e, t, n) {
    return (0, n.mergeObjects)(e, t);
  },
  gh = function (e, t) {
    return t;
  },
  yh = (function () {
    function e(e) {
      (this.config = e),
        (this.typePolicies = Object.create(null)),
        (this.toBeAdded = Object.create(null)),
        (this.supertypeMap = new Map()),
        (this.fuzzySubtypes = new Map()),
        (this.rootIdsByTypename = Object.create(null)),
        (this.rootTypenamesById = Object.create(null)),
        (this.usingPossibleTypes = !1),
        (this.config = Re({ dataIdFromObject: wu }, e)),
        (this.cache = this.config.cache),
        this.setRootTypename("Query"),
        this.setRootTypename("Mutation"),
        this.setRootTypename("Subscription"),
        e.possibleTypes && this.addPossibleTypes(e.possibleTypes),
        e.typePolicies && this.addTypePolicies(e.typePolicies);
    }
    return (
      (e.prototype.identify = function (e, t) {
        var n,
          i = this,
          r =
            (t && (t.typename || (null === (n = t.storeObject) || void 0 === n ? void 0 : n.__typename))) ||
            e.__typename;
        if (r === this.rootTypenamesById.ROOT_QUERY) return ["ROOT_QUERY"];
        for (
          var o,
            s = (t && t.storeObject) || e,
            a = Re(Re({}, t), {
              typename: r,
              storeObject: s,
              readField:
                (t && t.readField) ||
                function () {
                  var e = xh(arguments, s);
                  return i.readField(e, { store: i.cache.data, variables: e.variables });
                },
            }),
            c = r && this.getTypePolicy(r),
            l = (c && c.keyFn) || this.config.dataIdFromObject;
          l;

        ) {
          var u = l(e, a);
          if (!Array.isArray(u)) {
            o = u;
            break;
          }
          l = sh(u);
        }
        return (o = o ? String(o) : void 0), a.keyObject ? [o, a.keyObject] : [o];
      }),
      (e.prototype.addTypePolicies = function (e) {
        var t = this;
        Object.keys(e).forEach(function (n) {
          var i = e[n],
            r = i.queryType,
            o = i.mutationType,
            s = i.subscriptionType,
            a = Ne(i, ["queryType", "mutationType", "subscriptionType"]);
          r && t.setRootTypename("Query", n),
            o && t.setRootTypename("Mutation", n),
            s && t.setRootTypename("Subscription", n),
            xu.call(t.toBeAdded, n) ? t.toBeAdded[n].push(a) : (t.toBeAdded[n] = [a]);
        });
      }),
      (e.prototype.updateTypePolicy = function (e, t) {
        var n = this,
          i = this.getTypePolicy(e),
          r = t.keyFields,
          o = t.fields;
        function s(e, t) {
          e.merge = "function" == typeof t ? t : !0 === t ? mh : !1 === t ? gh : e.merge;
        }
        s(i, t.merge),
          (i.keyFn = !1 === r ? fh : Array.isArray(r) ? sh(r) : "function" == typeof r ? r : i.keyFn),
          o &&
            Object.keys(o).forEach(function (t) {
              var i = n.getFieldPolicy(e, t, !0),
                r = o[t];
              if ("function" == typeof r) i.read = r;
              else {
                var a = r.keyArgs,
                  c = r.read,
                  l = r.merge;
                (i.keyFn = !1 === a ? vh : Array.isArray(a) ? ah(a) : "function" == typeof a ? a : i.keyFn),
                  "function" == typeof c && (i.read = c),
                  s(i, l);
              }
              i.read && i.merge && (i.keyFn = i.keyFn || vh);
            });
      }),
      (e.prototype.setRootTypename = function (e, t) {
        void 0 === t && (t = e);
        var n = "ROOT_" + e.toUpperCase(),
          i = this.rootTypenamesById[n];
        t !== i &&
          (__DEV__
            ? is(!i || i === e, "Cannot change root ".concat(e, " __typename more than once"))
            : is(!i || i === e, 3),
          i && delete this.rootIdsByTypename[i],
          (this.rootIdsByTypename[t] = n),
          (this.rootTypenamesById[n] = t));
      }),
      (e.prototype.addPossibleTypes = function (e) {
        var t = this;
        (this.usingPossibleTypes = !0),
          Object.keys(e).forEach(function (n) {
            t.getSupertypeSet(n, !0),
              e[n].forEach(function (e) {
                t.getSupertypeSet(e, !0).add(n);
                var i = e.match(Tu);
                (i && i[0] === e) || t.fuzzySubtypes.set(e, new RegExp(e));
              });
          });
      }),
      (e.prototype.getTypePolicy = function (e) {
        var t = this;
        if (!xu.call(this.typePolicies, e)) {
          var n = (this.typePolicies[e] = Object.create(null));
          n.fields = Object.create(null);
          var i = this.supertypeMap.get(e);
          i &&
            i.size &&
            i.forEach(function (e) {
              var i = t.getTypePolicy(e),
                r = i.fields,
                o = Ne(i, ["fields"]);
              Object.assign(n, o), Object.assign(n.fields, r);
            });
        }
        var r = this.toBeAdded[e];
        return (
          r &&
            r.length &&
            r.splice(0).forEach(function (n) {
              t.updateTypePolicy(e, n);
            }),
          this.typePolicies[e]
        );
      }),
      (e.prototype.getFieldPolicy = function (e, t, n) {
        if (e) {
          var i = this.getTypePolicy(e).fields;
          return i[t] || (n && (i[t] = Object.create(null)));
        }
      }),
      (e.prototype.getSupertypeSet = function (e, t) {
        var n = this.supertypeMap.get(e);
        return !n && t && this.supertypeMap.set(e, (n = new Set())), n;
      }),
      (e.prototype.fragmentMatches = function (e, t, n, i) {
        var r = this;
        if (!e.typeCondition) return !0;
        if (!t) return !1;
        var o = e.typeCondition.name.value;
        if (t === o) return !0;
        if (this.usingPossibleTypes && this.supertypeMap.has(o))
          for (
            var s = this.getSupertypeSet(t, !0),
              a = [s],
              c = function (e) {
                var t = r.getSupertypeSet(e, !1);
                t && t.size && a.indexOf(t) < 0 && a.push(t);
              },
              l = !(!n || !this.fuzzySubtypes.size),
              u = !1,
              h = 0;
            h < a.length;
            ++h
          ) {
            var d = a[h];
            if (d.has(o))
              return (
                s.has(o) ||
                  (u && __DEV__ && is.warn("Inferring subtype ".concat(t, " of supertype ").concat(o)), s.add(o)),
                !0
              );
            d.forEach(c),
              l &&
                h === a.length - 1 &&
                Eu(e.selectionSet, n, i) &&
                ((l = !1),
                (u = !0),
                this.fuzzySubtypes.forEach(function (e, n) {
                  var i = t.match(e);
                  i && i[0] === t && c(n);
                }));
          }
        return !1;
      }),
      (e.prototype.hasKeyArgs = function (e, t) {
        var n = this.getFieldPolicy(e, t, !1);
        return !(!n || !n.keyFn);
      }),
      (e.prototype.getStoreFieldName = function (e) {
        var t,
          n = e.typename,
          i = e.fieldName,
          r = this.getFieldPolicy(n, i, !1),
          o = r && r.keyFn;
        if (o && n)
          for (var s = { typename: n, fieldName: i, field: e.field || null, variables: e.variables }, a = ph(e); o; ) {
            var c = o(a, s);
            if (!Array.isArray(c)) {
              t = c || i;
              break;
            }
            o = ah(c);
          }
        return (
          void 0 === t &&
            (t = e.field
              ? (function (e, t) {
                  var n = null;
                  e.directives &&
                    ((n = {}),
                    e.directives.forEach(function (e) {
                      (n[e.name.value] = {}),
                        e.arguments &&
                          e.arguments.forEach(function (i) {
                            var r = i.name,
                              o = i.value;
                            return ja(n[e.name.value], r, o, t);
                          });
                    }));
                  var i = null;
                  return (
                    e.arguments &&
                      e.arguments.length &&
                      ((i = {}),
                      e.arguments.forEach(function (e) {
                        var n = e.name,
                          r = e.value;
                        return ja(i, n, r, t);
                      })),
                    Fa(e.name.value, i, n)
                  );
                })(e.field, e.variables)
              : Fa(i, ph(e))),
          !1 === t ? i : i === Cu(t) ? t : i + ":" + t
        );
      }),
      (e.prototype.readField = function (e, t) {
        var n = e.from;
        if (n && (e.field || e.fieldName)) {
          if (void 0 === e.typename) {
            var i = t.store.getFieldValue(n, "__typename");
            i && (e.typename = i);
          }
          var r = this.getStoreFieldName(e),
            o = Cu(r),
            s = t.store.getFieldValue(n, r),
            a = this.getFieldPolicy(e.typename, o, !1),
            c = a && a.read;
          if (c) {
            var l = bh(this, n, e, t, t.store.getStorage(La(n) ? n.__ref : n, r));
            return Ju.withValue(this.cache, c, [s, l]);
          }
          return s;
        }
      }),
      (e.prototype.getReadFunction = function (e, t) {
        var n = this.getFieldPolicy(e, t, !1);
        return n && n.read;
      }),
      (e.prototype.getMergeFunction = function (e, t, n) {
        var i = this.getFieldPolicy(e, t, !1),
          r = i && i.merge;
        return !r && n && (r = (i = this.getTypePolicy(n)) && i.merge), r;
      }),
      (e.prototype.runMergeFunction = function (e, t, n, i, r) {
        var o = n.field,
          s = n.typename,
          a = n.merge;
        return a === mh
          ? wh(i.store)(e, t)
          : a === gh
          ? t
          : (i.overwrite && (e = void 0),
            a(
              e,
              t,
              bh(
                this,
                void 0,
                { typename: s, fieldName: o.name.value, field: o, variables: i.variables },
                i,
                r || Object.create(null)
              )
            ));
      }),
      e
    );
  })();
function bh(e, t, n, i, r) {
  var o = e.getStoreFieldName(n),
    s = Cu(o),
    a = n.variables || i.variables,
    c = i.store,
    l = c.toReference,
    u = c.canRead;
  return {
    args: ph(n),
    field: n.field || null,
    fieldName: s,
    storeFieldName: o,
    variables: a,
    isReference: La,
    toReference: l,
    storage: r,
    cache: e.cache,
    canRead: u,
    readField: function () {
      return e.readField(xh(arguments, t, i), i);
    },
    mergeObjects: wh(i.store),
  };
}
function xh(e, t, n) {
  var i,
    r,
    o,
    s = e[0],
    a = e[1],
    c = e.length;
  return (
    "string" == typeof s
      ? (i = { fieldName: s, from: c > 1 ? a : t })
      : ((i = Re({}, s)), xu.call(i, "from") || (i.from = t)),
    __DEV__ &&
      void 0 === i.from &&
      __DEV__ &&
      is.warn(
        "Undefined 'from' passed to readField with arguments ".concat(
          ((r = Array.from(e)),
          (o = il("stringifyForDisplay")),
          JSON.stringify(r, function (e, t) {
            return void 0 === t ? o : t;
          })
            .split(JSON.stringify(o))
            .join("<undefined>"))
        )
      ),
    void 0 === i.variables && (i.variables = n),
    i
  );
}
function wh(e) {
  return function (t, n) {
    if (Array.isArray(t) || Array.isArray(n)) throw __DEV__ ? new ns("Cannot automatically merge arrays") : new ns(4);
    if (Na(t) && Na(n)) {
      var i = e.getFieldValue(t, "__typename"),
        r = e.getFieldValue(n, "__typename");
      if (i && r && i !== r) return n;
      if (La(t) && ku(n)) return e.merge(t.__ref, n), t;
      if (ku(t) && La(n)) return e.merge(t, n.__ref), n;
      if (ku(t) && ku(n)) return Re(Re({}, t), n);
    }
    return n;
  };
}
function Sh(e, t, n) {
  var i = "".concat(t).concat(n),
    r = e.flavors.get(i);
  return (
    r ||
      e.flavors.set(
        i,
        (r = e.clientOnly === t && e.deferred === n ? e : Re(Re({}, e), { clientOnly: t, deferred: n }))
      ),
    r
  );
}
var _h = (function () {
    function e(e, t) {
      (this.cache = e), (this.reader = t);
    }
    return (
      (e.prototype.writeToStore = function (e, t) {
        var n = this,
          i = t.query,
          r = t.result,
          o = t.dataId,
          s = t.variables,
          a = t.overwrite,
          c = Ya(i),
          l = new vc();
        s = Re(Re({}, ec(c)), s);
        var u = {
            store: e,
            written: Object.create(null),
            merge: function (e, t) {
              return l.merge(e, t);
            },
            variables: s,
            varString: Uu(s),
            fragmentMap: Da(Xa(i)),
            overwrite: !!a,
            incomingById: new Map(),
            clientOnly: !1,
            deferred: !1,
            flavors: new Map(),
          },
          h = this.processSelectionSet({
            result: r || Object.create(null),
            dataId: o,
            selectionSet: c.selectionSet,
            mergeTree: { map: new Map() },
            context: u,
          });
        if (!La(h)) throw __DEV__ ? new ns("Could not identify object ".concat(JSON.stringify(r))) : new ns(6);
        return (
          u.incomingById.forEach(function (t, i) {
            var r = t.storeObject,
              o = t.mergeTree,
              s = t.fieldNodeSet,
              a = $a(i);
            if (o && o.map.size) {
              var c = n.applyMerges(o, a, r, u);
              if (La(c)) return;
              r = c;
            }
            if (__DEV__ && !u.overwrite) {
              var l = Object.create(null);
              s.forEach(function (e) {
                e.selectionSet && (l[e.name.value] = !0);
              });
              Object.keys(r).forEach(function (e) {
                (function (e) {
                  return !0 === l[Cu(e)];
                })(e) &&
                  !(function (e) {
                    var t = o && o.map.get(e);
                    return Boolean(t && t.info && t.info.merge);
                  })(e) &&
                  (function (e, t, n, i) {
                    var r = function (e) {
                        var t = i.getFieldValue(e, n);
                        return "object" == typeof t && t;
                      },
                      o = r(e);
                    if (!o) return;
                    var s = r(t);
                    if (!s) return;
                    if (La(o)) return;
                    if (El(o, s)) return;
                    if (
                      Object.keys(o).every(function (e) {
                        return void 0 !== i.getFieldValue(s, e);
                      })
                    )
                      return;
                    var a = i.getFieldValue(e, "__typename") || i.getFieldValue(t, "__typename"),
                      c = Cu(n),
                      l = "".concat(a, ".").concat(c);
                    if (Oh.has(l)) return;
                    Oh.add(l);
                    var u = [];
                    Array.isArray(o) ||
                      Array.isArray(s) ||
                      [o, s].forEach(function (e) {
                        var t = i.getFieldValue(e, "__typename");
                        "string" != typeof t || u.includes(t) || u.push(t);
                      });
                    __DEV__ &&
                      is.warn(
                        "Cache data may be lost when replacing the "
                          .concat(c, " field of a ")
                          .concat(a, " object.\n\nTo address this problem (which is not a bug in Apollo Client), ")
                          .concat(
                            u.length
                              ? "either ensure all objects of type " +
                                  u.join(" and ") +
                                  " have an ID or a custom merge function, or "
                              : "",
                            "define a custom merge function for the "
                          )
                          .concat(l, " field, so InMemoryCache can safely merge these objects:\n\n  existing: ")
                          .concat(JSON.stringify(o).slice(0, 1e3), "\n  incoming: ")
                          .concat(
                            JSON.stringify(s).slice(0, 1e3),
                            "\n\nFor more information about these options, please refer to the documentation:\n\n  * Ensuring entity objects have IDs: https://go.apollo.dev/c/generating-unique-identifiers\n  * Defining custom merge functions: https://go.apollo.dev/c/merging-non-normalized-objects\n"
                          )
                      );
                  })(a, r, e, u.store);
              });
            }
            e.merge(i, r);
          }),
          e.retain(h.__ref),
          h
        );
      }),
      (e.prototype.processSelectionSet = function (e) {
        var t = this,
          n = e.dataId,
          i = e.result,
          r = e.selectionSet,
          o = e.context,
          s = e.mergeTree,
          a = this.cache.policies,
          c = Object.create(null),
          l = (n && a.rootTypenamesById[n]) || qa(i, r, o.fragmentMap) || (n && o.store.get(n, "__typename"));
        "string" == typeof l && (c.__typename = l);
        var u = function () {
            var e = xh(arguments, c, o.variables);
            if (La(e.from)) {
              var t = o.incomingById.get(e.from.__ref);
              if (t) {
                var n = a.readField(Re(Re({}, e), { from: t.storeObject }), o);
                if (void 0 !== n) return n;
              }
            }
            return a.readField(e, o);
          },
          h = new Set();
        this.flattenFields(r, i, o, l).forEach(function (e, n) {
          var r,
            o = Ha(n),
            d = i[o];
          if ((h.add(n), void 0 !== d)) {
            var p = a.getStoreFieldName({ typename: l, fieldName: n.name.value, field: n, variables: e.variables }),
              f = Ch(s, p),
              v = t.processFieldValue(d, n, n.selectionSet ? Sh(e, !1, !1) : e, f),
              m = void 0;
            n.selectionSet && (La(v) || ku(v)) && (m = u("__typename", v));
            var g = a.getMergeFunction(l, n.name.value, m);
            g ? (f.info = { field: n, typename: l, merge: g }) : Ah(s, p), (c = e.merge(c, (((r = {})[p] = v), r)));
          } else !__DEV__ || e.clientOnly || e.deferred || ac.added(n) || a.getReadFunction(l, n.name.value) || (__DEV__ && is.error("Missing field '".concat(Ha(n), "' while writing result ").concat(JSON.stringify(i, null, 2)).substring(0, 1e3)));
        });
        try {
          var d = a.identify(i, {
              typename: l,
              selectionSet: r,
              fragmentMap: o.fragmentMap,
              storeObject: c,
              readField: u,
            }),
            p = d[0],
            f = d[1];
          (n = n || p), f && (c = o.merge(c, f));
        } catch (e) {
          if (!n) throw e;
        }
        if ("string" == typeof n) {
          var v = $a(n),
            m = o.written[n] || (o.written[n] = []);
          if (m.indexOf(r) >= 0) return v;
          if ((m.push(r), this.reader && this.reader.isFresh(i, v, r, o))) return v;
          var g = o.incomingById.get(n);
          return (
            g
              ? ((g.storeObject = o.merge(g.storeObject, c)),
                (g.mergeTree = Eh(g.mergeTree, s)),
                h.forEach(function (e) {
                  return g.fieldNodeSet.add(e);
                }))
              : o.incomingById.set(n, { storeObject: c, mergeTree: kh(s) ? void 0 : s, fieldNodeSet: h }),
            v
          );
        }
        return c;
      }),
      (e.prototype.processFieldValue = function (e, t, n, i) {
        var r = this;
        return t.selectionSet && null !== e
          ? Array.isArray(e)
            ? e.map(function (e, o) {
                var s = r.processFieldValue(e, t, n, Ch(i, o));
                return Ah(i, o), s;
              })
            : this.processSelectionSet({ result: e, selectionSet: t.selectionSet, context: n, mergeTree: i })
          : __DEV__
          ? Vc(e)
          : e;
      }),
      (e.prototype.flattenFields = function (e, t, n, i) {
        void 0 === i && (i = qa(t, e, n.fragmentMap));
        var r = new Map(),
          o = this.cache.policies,
          s = new $l(!1);
        return (
          (function e(a, c) {
            var l = s.lookup(a, c.clientOnly, c.deferred);
            l.visited ||
              ((l.visited = !0),
              a.selections.forEach(function (s) {
                if (Oa(s, n.variables)) {
                  var a = c.clientOnly,
                    l = c.deferred;
                  if (
                    ((a && l) ||
                      !Jc(s.directives) ||
                      s.directives.forEach(function (e) {
                        var t = e.name.value;
                        if (("client" === t && (a = !0), "defer" === t)) {
                          var i = Ba(e, n.variables);
                          (i && !1 === i.if) || (l = !0);
                        }
                      }),
                    Qa(s))
                  ) {
                    var u = r.get(s);
                    u && ((a = a && u.clientOnly), (l = l && u.deferred)), r.set(s, Sh(n, a, l));
                  } else {
                    var h = Ra(s, n.fragmentMap);
                    h && o.fragmentMatches(h, i, t, n.variables) && e(h.selectionSet, Sh(n, a, l));
                  }
                }
              }));
          })(e, n),
          r
        );
      }),
      (e.prototype.applyMerges = function (e, t, n, i, r) {
        var o,
          s = this;
        if (e.map.size && !La(n)) {
          var a,
            c = Array.isArray(n) || (!La(t) && !ku(t)) ? void 0 : t,
            l = n;
          c && !r && (r = [La(c) ? c.__ref : c]);
          var u = function (e, t) {
            return Array.isArray(e) ? ("number" == typeof t ? e[t] : void 0) : i.store.getFieldValue(e, String(t));
          };
          e.map.forEach(function (e, t) {
            var n = u(c, t),
              o = u(l, t);
            if (void 0 !== o) {
              r && r.push(t);
              var h = s.applyMerges(e, n, o, i, r);
              h !== o && (a = a || new Map()).set(t, h), r && is(r.pop() === t);
            }
          }),
            a &&
              ((n = Array.isArray(l) ? l.slice(0) : Re({}, l)),
              a.forEach(function (e, t) {
                n[t] = e;
              }));
        }
        return e.info
          ? this.cache.policies.runMergeFunction(t, n, e.info, i, r && (o = i.store).getStorage.apply(o, r))
          : n;
      }),
      e
    );
  })(),
  Th = [];
function Ch(e, t) {
  var n = e.map;
  return n.has(t) || n.set(t, Th.pop() || { map: new Map() }), n.get(t);
}
function Eh(e, t) {
  if (e === t || !t || kh(t)) return e;
  if (!e || kh(e)) return t;
  var n = e.info && t.info ? Re(Re({}, e.info), t.info) : e.info || t.info,
    i = e.map.size && t.map.size,
    r = { info: n, map: i ? new Map() : e.map.size ? e.map : t.map };
  if (i) {
    var o = new Set(t.map.keys());
    e.map.forEach(function (e, n) {
      r.map.set(n, Eh(e, t.map.get(n))), o.delete(n);
    }),
      o.forEach(function (n) {
        r.map.set(n, Eh(t.map.get(n), e.map.get(n)));
      });
  }
  return r;
}
function kh(e) {
  return !e || !(e.info || e.map.size);
}
function Ah(e, t) {
  var n = e.map,
    i = n.get(t);
  i && kh(i) && (Th.push(i), n.delete(t));
}
var Oh = new Set();
var Ih = (function (e) {
  function t(t) {
    void 0 === t && (t = {});
    var n = e.call(this) || this;
    return (
      (n.watches = new Set()),
      (n.typenameDocumentCache = new Map()),
      (n.makeVar = ih),
      (n.txCount = 0),
      (n.config = (function (e) {
        return tl(Su, e);
      })(t)),
      (n.addTypename = !!n.config.addTypename),
      (n.policies = new yh({
        cache: n,
        dataIdFromObject: n.config.dataIdFromObject,
        possibleTypes: n.config.possibleTypes,
        typePolicies: n.config.typePolicies,
      })),
      n.init(),
      n
    );
  }
  return (
    De(t, e),
    (t.prototype.init = function () {
      var e = (this.data = new Mu.Root({ policies: this.policies, resultCaching: this.config.resultCaching }));
      (this.optimisticData = e.stump), this.resetResultCache();
    }),
    (t.prototype.resetResultCache = function (e) {
      var t = this,
        n = this.storeReader;
      (this.storeWriter = new _h(
        this,
        (this.storeReader = new qu({
          cache: this,
          addTypename: this.addTypename,
          resultCacheMaxSize: this.config.resultCacheMaxSize,
          canonizeResults: _u(this.config),
          canon: e ? void 0 : n && n.canon,
        }))
      )),
        (this.maybeBroadcastWatch = gu(
          function (e, n) {
            return t.broadcastWatch(e, n);
          },
          {
            max: this.config.resultCacheMaxSize,
            makeCacheKey: function (e) {
              var n = e.optimistic ? t.optimisticData : t.data;
              if (ju(n)) {
                var i = e.optimistic,
                  r = e.rootId,
                  o = e.variables;
                return n.makeCacheKey(e.query, e.callback, Uu({ optimistic: i, rootId: r, variables: o }));
              }
            },
          }
        )),
        new Set([this.data.group, this.optimisticData.group]).forEach(function (e) {
          return e.resetCaching();
        });
    }),
    (t.prototype.restore = function (e) {
      return this.init(), e && this.data.replace(e), this;
    }),
    (t.prototype.extract = function (e) {
      return void 0 === e && (e = !1), (e ? this.optimisticData : this.data).extract();
    }),
    (t.prototype.read = function (e) {
      var t = e.returnPartialData,
        n = void 0 !== t && t;
      try {
        return (
          this.storeReader.diffQueryAgainstStore(
            Re(Re({}, e), {
              store: e.optimistic ? this.optimisticData : this.data,
              config: this.config,
              returnPartialData: n,
            })
          ).result || null
        );
      } catch (e) {
        if (e instanceof bu) return null;
        throw e;
      }
    }),
    (t.prototype.write = function (e) {
      try {
        return ++this.txCount, this.storeWriter.writeToStore(this.data, e);
      } finally {
        --this.txCount || !1 === e.broadcast || this.broadcastWatches();
      }
    }),
    (t.prototype.modify = function (e) {
      if (xu.call(e, "id") && !e.id) return !1;
      var t = e.optimistic ? this.optimisticData : this.data;
      try {
        return ++this.txCount, t.modify(e.id || "ROOT_QUERY", e.fields);
      } finally {
        --this.txCount || !1 === e.broadcast || this.broadcastWatches();
      }
    }),
    (t.prototype.diff = function (e) {
      return this.storeReader.diffQueryAgainstStore(
        Re(Re({}, e), {
          store: e.optimistic ? this.optimisticData : this.data,
          rootId: e.id || "ROOT_QUERY",
          config: this.config,
        })
      );
    }),
    (t.prototype.watch = function (e) {
      var t = this;
      return (
        this.watches.size ||
          (function (e) {
            th(e).vars.forEach(function (t) {
              return t.attachCache(e);
            });
          })(this),
        this.watches.add(e),
        e.immediate && this.maybeBroadcastWatch(e),
        function () {
          t.watches.delete(e) && !t.watches.size && nh(t), t.maybeBroadcastWatch.forget(e);
        }
      );
    }),
    (t.prototype.gc = function (e) {
      Uu.reset();
      var t = this.optimisticData.gc();
      return (
        e &&
          !this.txCount &&
          (e.resetResultCache
            ? this.resetResultCache(e.resetResultIdentities)
            : e.resetResultIdentities && this.storeReader.resetCanon()),
        t
      );
    }),
    (t.prototype.retain = function (e, t) {
      return (t ? this.optimisticData : this.data).retain(e);
    }),
    (t.prototype.release = function (e, t) {
      return (t ? this.optimisticData : this.data).release(e);
    }),
    (t.prototype.identify = function (e) {
      if (La(e)) return e.__ref;
      try {
        return this.policies.identify(e)[0];
      } catch (e) {
        __DEV__ && is.warn(e);
      }
    }),
    (t.prototype.evict = function (e) {
      if (!e.id) {
        if (xu.call(e, "id")) return !1;
        e = Re(Re({}, e), { id: "ROOT_QUERY" });
      }
      try {
        return ++this.txCount, this.optimisticData.evict(e, this.data);
      } finally {
        --this.txCount || !1 === e.broadcast || this.broadcastWatches();
      }
    }),
    (t.prototype.reset = function (e) {
      var t = this;
      return (
        this.init(),
        Uu.reset(),
        e && e.discardWatches
          ? (this.watches.forEach(function (e) {
              return t.maybeBroadcastWatch.forget(e);
            }),
            this.watches.clear(),
            nh(this))
          : this.broadcastWatches(),
        Promise.resolve()
      );
    }),
    (t.prototype.removeOptimistic = function (e) {
      var t = this.optimisticData.removeLayer(e);
      t !== this.optimisticData && ((this.optimisticData = t), this.broadcastWatches());
    }),
    (t.prototype.batch = function (e) {
      var t,
        n = this,
        i = e.update,
        r = e.optimistic,
        o = void 0 === r || r,
        s = e.removeOptimistic,
        a = e.onWatchUpdated,
        c = function (e) {
          var r = n,
            o = r.data,
            s = r.optimisticData;
          ++n.txCount, e && (n.data = n.optimisticData = e);
          try {
            return (t = i(n));
          } finally {
            --n.txCount, (n.data = o), (n.optimisticData = s);
          }
        },
        l = new Set();
      return (
        a &&
          !this.txCount &&
          this.broadcastWatches(
            Re(Re({}, e), {
              onWatchUpdated: function (e) {
                return l.add(e), !1;
              },
            })
          ),
        "string" == typeof o
          ? (this.optimisticData = this.optimisticData.addLayer(o, c))
          : !1 === o
          ? c(this.data)
          : c(),
        "string" == typeof s && (this.optimisticData = this.optimisticData.removeLayer(s)),
        a && l.size
          ? (this.broadcastWatches(
              Re(Re({}, e), {
                onWatchUpdated: function (e, t) {
                  var n = a.call(this, e, t);
                  return !1 !== n && l.delete(e), n;
                },
              })
            ),
            l.size &&
              l.forEach(function (e) {
                return n.maybeBroadcastWatch.dirty(e);
              }))
          : this.broadcastWatches(e),
        t
      );
    }),
    (t.prototype.performTransaction = function (e, t) {
      return this.batch({ update: e, optimistic: t || null !== t });
    }),
    (t.prototype.transformDocument = function (e) {
      if (this.addTypename) {
        var t = this.typenameDocumentCache.get(e);
        return t || ((t = ac(e)), this.typenameDocumentCache.set(e, t), this.typenameDocumentCache.set(t, t)), t;
      }
      return e;
    }),
    (t.prototype.broadcastWatches = function (e) {
      var t = this;
      this.txCount ||
        this.watches.forEach(function (n) {
          return t.maybeBroadcastWatch(n, e);
        });
    }),
    (t.prototype.broadcastWatch = function (e, t) {
      var n = e.lastDiff,
        i = this.diff(e);
      (t &&
        (e.optimistic && "string" == typeof t.optimistic && (i.fromOptimisticTransaction = !0),
        t.onWatchUpdated && !1 === t.onWatchUpdated.call(this, e, i, n))) ||
        (n && El(n.result, i.result)) ||
        e.callback((e.lastDiff = i), n);
    }),
    t
  );
})(yu);
var Mh,
  Ph = (function (e) {
    function t(n) {
      var i,
        r,
        o = n.graphQLErrors,
        s = n.clientErrors,
        a = n.networkError,
        c = n.errorMessage,
        l = n.extraInfo,
        u = e.call(this, c) || this;
      return (
        (u.graphQLErrors = o || []),
        (u.clientErrors = s || []),
        (u.networkError = a || null),
        (u.message =
          c ||
          ((r = ""),
          (Jc((i = u).graphQLErrors) || Jc(i.clientErrors)) &&
            (i.graphQLErrors || []).concat(i.clientErrors || []).forEach(function (e) {
              var t = e ? e.message : "Error message not found.";
              r += "".concat(t, "\n");
            }),
          i.networkError && (r += "".concat(i.networkError.message, "\n")),
          (r = r.replace(/\n$/, "")))),
        (u.extraInfo = l),
        (u.__proto__ = t.prototype),
        u
      );
    }
    return De(t, e), t;
  })(Error);
function Dh(e) {
  return !!e && e < 7;
}
!(function (e) {
  (e[(e.loading = 1)] = "loading"),
    (e[(e.setVariables = 2)] = "setVariables"),
    (e[(e.fetchMore = 3)] = "fetchMore"),
    (e[(e.refetch = 4)] = "refetch"),
    (e[(e.poll = 6)] = "poll"),
    (e[(e.ready = 7)] = "ready"),
    (e[(e.error = 8)] = "error");
})(Mh || (Mh = {}));
var Rh = Object.assign,
  Nh = Object.hasOwnProperty,
  $h = !1,
  Lh = (function (e) {
    function t(t) {
      var n = t.queryManager,
        i = t.queryInfo,
        r = t.options,
        o =
          e.call(this, function (e) {
            try {
              var t = e._subscription._observer;
              t && !t.error && (t.error = jh);
            } catch (e) {}
            var n = !o.observers.size;
            o.observers.add(e);
            var i = o.last;
            return (
              i && i.error ? e.error && e.error(i.error) : i && i.result && e.next && e.next(i.result),
              n && o.reobserve().catch(function () {}),
              function () {
                o.observers.delete(e) && !o.observers.size && o.tearDownQuery();
              }
            );
          }) || this;
      (o.observers = new Set()),
        (o.subscriptions = new Set()),
        (o.isTornDown = !1),
        (o.options = r),
        (o.queryId = i.queryId || n.generateQueryId());
      var s = Ya(r.query);
      return (
        (o.queryName = s && s.name && s.name.value),
        (o.initialFetchPolicy = r.fetchPolicy || "cache-first"),
        (o.queryManager = n),
        (o.queryInfo = i),
        o
      );
    }
    return (
      De(t, e),
      Object.defineProperty(t.prototype, "variables", {
        get: function () {
          return this.options.variables;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype.result = function () {
        var e = this;
        return new Promise(function (t, n) {
          var i = {
              next: function (n) {
                t(n),
                  e.observers.delete(i),
                  e.observers.size || e.queryManager.removeQuery(e.queryId),
                  setTimeout(function () {
                    r.unsubscribe();
                  }, 0);
              },
              error: n,
            },
            r = e.subscribe(i);
        });
      }),
      (t.prototype.getCurrentResult = function (e) {
        void 0 === e && (e = !0);
        var t = this.getLastResult(!0),
          n = this.queryInfo.networkStatus || (t && t.networkStatus) || Mh.ready,
          i = Re(Re({}, t), { loading: Dh(n), networkStatus: n }),
          r = this.options.fetchPolicy,
          o = void 0 === r ? "cache-first" : r;
        if (
          "network-only" === o ||
          "no-cache" === o ||
          "standby" === o ||
          this.queryManager.transform(this.options.query).hasForcedResolvers
        );
        else {
          var s = this.queryInfo.getDiff();
          (s.complete || this.options.returnPartialData) && (i.data = s.result),
            El(i.data, {}) && (i.data = void 0),
            s.complete
              ? (delete i.partial,
                !s.complete ||
                  i.networkStatus !== Mh.loading ||
                  ("cache-first" !== o && "cache-only" !== o) ||
                  ((i.networkStatus = Mh.ready), (i.loading = !1)))
              : (i.partial = !0),
            !__DEV__ || s.complete || this.options.partialRefetch || i.loading || i.data || i.error || zh(s.missing);
        }
        return e && this.updateLastResult(i), i;
      }),
      (t.prototype.isDifferentFromLastResult = function (e) {
        return !this.last || !El(this.last.result, e);
      }),
      (t.prototype.getLast = function (e, t) {
        var n = this.last;
        if (n && n[e] && (!t || El(n.variables, this.variables))) return n[e];
      }),
      (t.prototype.getLastResult = function (e) {
        return this.getLast("result", e);
      }),
      (t.prototype.getLastError = function (e) {
        return this.getLast("error", e);
      }),
      (t.prototype.resetLastResults = function () {
        delete this.last, (this.isTornDown = !1);
      }),
      (t.prototype.resetQueryStoreErrors = function () {
        this.queryManager.resetErrors(this.queryId);
      }),
      (t.prototype.refetch = function (e) {
        var t,
          n = { pollInterval: 0 },
          i = this.options.fetchPolicy;
        if (
          ((n.fetchPolicy = "cache-and-network" === i ? i : "no-cache" === i ? "no-cache" : "network-only"),
          __DEV__ && e && Nh.call(e, "variables"))
        ) {
          var r = Ka(this.options.query),
            o = r.variableDefinitions;
          (o &&
            o.some(function (e) {
              return "variables" === e.variable.name.value;
            })) ||
            (__DEV__ &&
              is.warn(
                "Called refetch("
                  .concat(JSON.stringify(e), ") for query ")
                  .concat(
                    (null === (t = r.name) || void 0 === t ? void 0 : t.value) || JSON.stringify(r),
                    ", which does not declare a $variables variable.\nDid you mean to call refetch(variables) instead of refetch({ variables })?"
                  )
              ));
        }
        return (
          e &&
            !El(this.options.variables, e) &&
            (n.variables = this.options.variables = Re(Re({}, this.options.variables), e)),
          this.queryInfo.resetLastWrite(),
          this.reobserve(n, Mh.refetch)
        );
      }),
      (t.prototype.fetchMore = function (e) {
        var t = this,
          n = Re(
            Re(
              {},
              e.query
                ? e
                : Re(Re(Re({}, this.options), e), { variables: Re(Re({}, this.options.variables), e.variables) })
            ),
            { fetchPolicy: "no-cache" }
          ),
          i = this.queryManager.generateQueryId();
        return (
          n.notifyOnNetworkStatusChange && ((this.queryInfo.networkStatus = Mh.fetchMore), this.observe()),
          this.queryManager
            .fetchQuery(i, n, Mh.fetchMore)
            .then(function (i) {
              var r = i.data,
                o = e.updateQuery;
              return (
                o
                  ? (__DEV__ &&
                      !$h &&
                      (__DEV__ &&
                        is.warn(
                          "The updateQuery callback for fetchMore is deprecated, and will be removed\nin the next major version of Apollo Client.\n\nPlease convert updateQuery functions to field policies with appropriate\nread and merge functions, or use/adapt a helper function (such as\nconcatPagination, offsetLimitPagination, or relayStylePagination) from\n@apollo/client/utilities.\n\nThe field policy system handles pagination more effectively than a\nhand-written updateQuery function, and you only need to define the policy\nonce, rather than every time you call fetchMore."
                        ),
                      ($h = !0)),
                    t.updateQuery(function (e) {
                      return o(e, { fetchMoreResult: r, variables: n.variables });
                    }))
                  : t.queryManager.cache.writeQuery({ query: n.query, variables: n.variables, data: r }),
                i
              );
            })
            .finally(function () {
              t.queryManager.stopQuery(i), t.reobserve();
            })
        );
      }),
      (t.prototype.subscribeToMore = function (e) {
        var t = this,
          n = this.queryManager
            .startGraphQLSubscription({ query: e.document, variables: e.variables, context: e.context })
            .subscribe({
              next: function (n) {
                var i = e.updateQuery;
                i &&
                  t.updateQuery(function (e, t) {
                    var r = t.variables;
                    return i(e, { subscriptionData: n, variables: r });
                  });
              },
              error: function (t) {
                e.onError ? e.onError(t) : __DEV__ && is.error("Unhandled GraphQL subscription error", t);
              },
            });
        return (
          this.subscriptions.add(n),
          function () {
            t.subscriptions.delete(n) && n.unsubscribe();
          }
        );
      }),
      (t.prototype.setOptions = function (e) {
        return this.reobserve(e);
      }),
      (t.prototype.setVariables = function (e) {
        return El(this.variables, e)
          ? this.observers.size
            ? this.result()
            : Promise.resolve()
          : ((this.options.variables = e),
            this.observers.size
              ? this.reobserve({ fetchPolicy: this.initialFetchPolicy, variables: e }, Mh.setVariables)
              : Promise.resolve());
      }),
      (t.prototype.updateQuery = function (e) {
        var t = this.queryManager,
          n = e(
            t.cache.diff({
              query: this.options.query,
              variables: this.variables,
              returnPartialData: !0,
              optimistic: !1,
            }).result,
            { variables: this.variables }
          );
        n &&
          (t.cache.writeQuery({ query: this.options.query, data: n, variables: this.variables }), t.broadcastQueries());
      }),
      (t.prototype.startPolling = function (e) {
        (this.options.pollInterval = e), this.updatePolling();
      }),
      (t.prototype.stopPolling = function () {
        (this.options.pollInterval = 0), this.updatePolling();
      }),
      (t.prototype.fetch = function (e, t) {
        return this.queryManager.setObservableQuery(this), this.queryManager.fetchQueryObservable(this.queryId, e, t);
      }),
      (t.prototype.updatePolling = function () {
        var e = this;
        if (!this.queryManager.ssrMode) {
          var t = this.pollingInfo,
            n = this.options.pollInterval;
          if (n) {
            if (!t || t.interval !== n) {
              __DEV__ ? is(n, "Attempted to start a polling query without a polling interval.") : is(n, 10),
                ((t || (this.pollingInfo = {})).interval = n);
              var i = function () {
                  e.pollingInfo &&
                    (Dh(e.queryInfo.networkStatus)
                      ? r()
                      : e.reobserve({ fetchPolicy: "network-only" }, Mh.poll).then(r, r));
                },
                r = function () {
                  var t = e.pollingInfo;
                  t && (clearTimeout(t.timeout), (t.timeout = setTimeout(i, t.interval)));
                };
              r();
            }
          } else t && (clearTimeout(t.timeout), delete this.pollingInfo);
        }
      }),
      (t.prototype.updateLastResult = function (e, t) {
        return (
          void 0 === t && (t = this.variables),
          (this.last = Re(Re({}, this.last), {
            result: this.queryManager.assumeImmutableResults ? e : Vc(e),
            variables: t,
          })),
          Jc(e.errors) || delete this.last.error,
          this.last
        );
      }),
      (t.prototype.reobserve = function (e, t) {
        var n = this;
        this.isTornDown = !1;
        var i = t === Mh.refetch || t === Mh.fetchMore || t === Mh.poll,
          r = this.options.variables,
          o = i ? tl(this.options, e) : Rh(this.options, tl(e));
        i ||
          (this.updatePolling(),
          e &&
            e.variables &&
            !e.fetchPolicy &&
            !El(e.variables, r) &&
            ((o.fetchPolicy = this.initialFetchPolicy), void 0 === t && (t = Mh.setVariables)));
        var s = o.variables && Re({}, o.variables),
          a = this.fetch(o, t),
          c = {
            next: function (e) {
              n.reportResult(e, s);
            },
            error: function (e) {
              n.reportError(e, s);
            },
          };
        return (
          i ||
            (this.concast && this.observer && this.concast.removeObserver(this.observer, !0),
            (this.concast = a),
            (this.observer = c)),
          a.addObserver(c),
          a.promise
        );
      }),
      (t.prototype.observe = function () {
        this.reportResult(this.getCurrentResult(!1), this.variables);
      }),
      (t.prototype.reportResult = function (e, t) {
        (this.getLastError() || this.isDifferentFromLastResult(e)) &&
          (this.updateLastResult(e, t), qc(this.observers, "next", e));
      }),
      (t.prototype.reportError = function (e, t) {
        var n = Re(Re({}, this.getLastResult()), {
          error: e,
          errors: e.graphQLErrors,
          networkStatus: Mh.error,
          loading: !1,
        });
        this.updateLastResult(n, t), qc(this.observers, "error", (this.last.error = e));
      }),
      (t.prototype.hasObservers = function () {
        return this.observers.size > 0;
      }),
      (t.prototype.tearDownQuery = function () {
        this.isTornDown ||
          (this.concast &&
            this.observer &&
            (this.concast.removeObserver(this.observer), delete this.concast, delete this.observer),
          this.stopPolling(),
          this.subscriptions.forEach(function (e) {
            return e.unsubscribe();
          }),
          this.subscriptions.clear(),
          this.queryManager.stopQuery(this.queryId),
          this.observers.clear(),
          (this.isTornDown = !0));
      }),
      t
    );
  })(Lc);
function jh(e) {
  __DEV__ && is.error("Unhandled error", e.message, e.stack);
}
function zh(e) {
  __DEV__ && e && __DEV__ && is.debug("Missing cache result fields: ".concat(JSON.stringify(e)), e);
}
Zc(Lh);
var Fh = (function () {
    function e(e) {
      var t = e.cache,
        n = e.client,
        i = e.resolvers,
        r = e.fragmentMatcher;
      (this.cache = t), n && (this.client = n), i && this.addResolvers(i), r && this.setFragmentMatcher(r);
    }
    return (
      (e.prototype.addResolvers = function (e) {
        var t = this;
        (this.resolvers = this.resolvers || {}),
          Array.isArray(e)
            ? e.forEach(function (e) {
                t.resolvers = dc(t.resolvers, e);
              })
            : (this.resolvers = dc(this.resolvers, e));
      }),
      (e.prototype.setResolvers = function (e) {
        (this.resolvers = {}), this.addResolvers(e);
      }),
      (e.prototype.getResolvers = function () {
        return this.resolvers || {};
      }),
      (e.prototype.runResolvers = function (e) {
        var t = e.document,
          n = e.remoteResult,
          i = e.context,
          r = e.variables,
          o = e.onlyRunForcedResolvers,
          s = void 0 !== o && o;
        return Le(this, void 0, void 0, function () {
          return je(this, function (e) {
            return t
              ? [
                  2,
                  this.resolveDocument(t, n.data, i, r, this.fragmentMatcher, s).then(function (e) {
                    return Re(Re({}, n), { data: e.result });
                  }),
                ]
              : [2, n];
          });
        });
      }),
      (e.prototype.setFragmentMatcher = function (e) {
        this.fragmentMatcher = e;
      }),
      (e.prototype.getFragmentMatcher = function () {
        return this.fragmentMatcher;
      }),
      (e.prototype.clientQuery = function (e) {
        return Ia(["client"], e) && this.resolvers ? e : null;
      }),
      (e.prototype.serverQuery = function (e) {
        return (function (e) {
          Wa(e);
          var t = sc(
            [
              {
                test: function (e) {
                  return "client" === e.name.value;
                },
                remove: !0,
              },
            ],
            e
          );
          return (
            t &&
              (t = ma(t, {
                FragmentDefinition: {
                  enter: function (e) {
                    if (
                      e.selectionSet &&
                      e.selectionSet.selections.every(function (e) {
                        return Qa(e) && "__typename" === e.name.value;
                      })
                    )
                      return null;
                  },
                },
              })),
            t
          );
        })(e);
      }),
      (e.prototype.prepareContext = function (e) {
        var t = this.cache;
        return Re(Re({}, e), {
          cache: t,
          getCacheKey: function (e) {
            return t.identify(e);
          },
        });
      }),
      (e.prototype.addExportedVariables = function (e, t, n) {
        return (
          void 0 === t && (t = {}),
          void 0 === n && (n = {}),
          Le(this, void 0, void 0, function () {
            return je(this, function (i) {
              return e
                ? [
                    2,
                    this.resolveDocument(e, this.buildRootValueFromCache(e, t) || {}, this.prepareContext(n), t).then(
                      function (e) {
                        return Re(Re({}, t), e.exportedVariables);
                      }
                    ),
                  ]
                : [2, Re({}, t)];
            });
          })
        );
      }),
      (e.prototype.shouldForceResolvers = function (e) {
        var t = !1;
        return (
          ma(e, {
            Directive: {
              enter: function (e) {
                if (
                  "client" === e.name.value &&
                  e.arguments &&
                  (t = e.arguments.some(function (e) {
                    return "always" === e.name.value && "BooleanValue" === e.value.kind && !0 === e.value.value;
                  }))
                )
                  return va;
              },
            },
          }),
          t
        );
      }),
      (e.prototype.buildRootValueFromCache = function (e, t) {
        return this.cache.diff({ query: uc(e), variables: t, returnPartialData: !0, optimistic: !1 }).result;
      }),
      (e.prototype.resolveDocument = function (e, t, n, i, r, o) {
        return (
          void 0 === n && (n = {}),
          void 0 === i && (i = {}),
          void 0 === r &&
            (r = function () {
              return !0;
            }),
          void 0 === o && (o = !1),
          Le(this, void 0, void 0, function () {
            var s, a, c, l, u, h, d, p, f;
            return je(this, function (v) {
              return (
                (s = Ja(e)),
                (a = Xa(e)),
                (c = Da(a)),
                (l = s.operation),
                (u = l ? l.charAt(0).toUpperCase() + l.slice(1) : "Query"),
                (d = (h = this).cache),
                (p = h.client),
                (f = {
                  fragmentMap: c,
                  context: Re(Re({}, n), { cache: d, client: p }),
                  variables: i,
                  fragmentMatcher: r,
                  defaultOperationType: u,
                  exportedVariables: {},
                  onlyRunForcedResolvers: o,
                }),
                [
                  2,
                  this.resolveSelectionSet(s.selectionSet, t, f).then(function (e) {
                    return { result: e, exportedVariables: f.exportedVariables };
                  }),
                ]
              );
            });
          })
        );
      }),
      (e.prototype.resolveSelectionSet = function (e, t, n) {
        return Le(this, void 0, void 0, function () {
          var i,
            r,
            o,
            s,
            a,
            c = this;
          return je(this, function (l) {
            return (
              (i = n.fragmentMap),
              (r = n.context),
              (o = n.variables),
              (s = [t]),
              (a = function (e) {
                return Le(c, void 0, void 0, function () {
                  var a, c;
                  return je(this, function (l) {
                    return Oa(e, o)
                      ? Qa(e)
                        ? [
                            2,
                            this.resolveField(e, t, n).then(function (t) {
                              var n;
                              void 0 !== t && s.push((((n = {})[Ha(e)] = t), n));
                            }),
                          ]
                        : (Ga(e)
                            ? (a = e)
                            : ((a = i[e.name.value]),
                              __DEV__ ? is(a, "No fragment named ".concat(e.name.value)) : is(a, 9)),
                          a && a.typeCondition && ((c = a.typeCondition.name.value), n.fragmentMatcher(t, c, r))
                            ? [
                                2,
                                this.resolveSelectionSet(a.selectionSet, t, n).then(function (e) {
                                  s.push(e);
                                }),
                              ]
                            : [2])
                      : [2];
                  });
                });
              }),
              [
                2,
                Promise.all(e.selections.map(a)).then(function () {
                  return pc(s);
                }),
              ]
            );
          });
        });
      }),
      (e.prototype.resolveField = function (e, t, n) {
        return Le(this, void 0, void 0, function () {
          var i,
            r,
            o,
            s,
            a,
            c,
            l,
            u,
            h,
            d = this;
          return je(this, function (p) {
            return (
              (i = n.variables),
              (r = e.name.value),
              (o = Ha(e)),
              (s = r !== o),
              (a = t[o] || t[r]),
              (c = Promise.resolve(a)),
              (n.onlyRunForcedResolvers && !this.shouldForceResolvers(e)) ||
                ((l = t.__typename || n.defaultOperationType),
                (u = this.resolvers && this.resolvers[l]) &&
                  (h = u[s ? r : o]) &&
                  (c = Promise.resolve(
                    Ju.withValue(this.cache, h, [t, Ba(e, i), n.context, { field: e, fragmentMap: n.fragmentMap }])
                  ))),
              [
                2,
                c.then(function (t) {
                  return (
                    void 0 === t && (t = a),
                    e.directives &&
                      e.directives.forEach(function (e) {
                        "export" === e.name.value &&
                          e.arguments &&
                          e.arguments.forEach(function (e) {
                            "as" === e.name.value &&
                              "StringValue" === e.value.kind &&
                              (n.exportedVariables[e.value.value] = t);
                          });
                      }),
                    e.selectionSet
                      ? null == t
                        ? t
                        : Array.isArray(t)
                        ? d.resolveSubSelectedArray(e, t, n)
                        : e.selectionSet
                        ? d.resolveSelectionSet(e.selectionSet, t, n)
                        : void 0
                      : t
                  );
                }),
              ]
            );
          });
        });
      }),
      (e.prototype.resolveSubSelectedArray = function (e, t, n) {
        var i = this;
        return Promise.all(
          t.map(function (t) {
            return null === t
              ? null
              : Array.isArray(t)
              ? i.resolveSubSelectedArray(e, t, n)
              : e.selectionSet
              ? i.resolveSelectionSet(e.selectionSet, t, n)
              : void 0;
          })
        );
      }),
      e
    );
  })(),
  Vh = new (Gc ? WeakMap : Map)();
function Uh(e, t) {
  var n = e[t];
  "function" == typeof n &&
    (e[t] = function () {
      return Vh.set(e, (Vh.get(e) + 1) % 1e15), n.apply(this, arguments);
    });
}
function Bh(e) {
  e.notifyTimeout && (clearTimeout(e.notifyTimeout), (e.notifyTimeout = void 0));
}
var Hh = (function () {
  function e(e, t) {
    void 0 === t && (t = e.generateQueryId()),
      (this.queryId = t),
      (this.listeners = new Set()),
      (this.document = null),
      (this.lastRequestId = 1),
      (this.subscriptions = new Set()),
      (this.stopped = !1),
      (this.dirty = !1),
      (this.observableQuery = null);
    var n = (this.cache = e.cache);
    Vh.has(n) || (Vh.set(n, 0), Uh(n, "evict"), Uh(n, "modify"), Uh(n, "reset"));
  }
  return (
    (e.prototype.init = function (e) {
      var t = e.networkStatus || Mh.loading;
      return (
        this.variables &&
          this.networkStatus !== Mh.loading &&
          !El(this.variables, e.variables) &&
          (t = Mh.setVariables),
        El(e.variables, this.variables) || (this.lastDiff = void 0),
        Object.assign(this, {
          document: e.document,
          variables: e.variables,
          networkError: null,
          graphQLErrors: this.graphQLErrors || [],
          networkStatus: t,
        }),
        e.observableQuery && this.setObservableQuery(e.observableQuery),
        e.lastRequestId && (this.lastRequestId = e.lastRequestId),
        this
      );
    }),
    (e.prototype.reset = function () {
      Bh(this), (this.lastDiff = void 0), (this.dirty = !1);
    }),
    (e.prototype.getDiff = function (e) {
      void 0 === e && (e = this.variables);
      var t = this.getDiffOptions(e);
      if (this.lastDiff && El(t, this.lastDiff.options)) return this.lastDiff.diff;
      this.updateWatch((this.variables = e));
      var n = this.observableQuery;
      if (n && "no-cache" === n.options.fetchPolicy) return { complete: !1 };
      var i = this.cache.diff(t);
      return this.updateLastDiff(i, t), i;
    }),
    (e.prototype.updateLastDiff = function (e, t) {
      this.lastDiff = e ? { diff: e, options: t || this.getDiffOptions() } : void 0;
    }),
    (e.prototype.getDiffOptions = function (e) {
      var t;
      return (
        void 0 === e && (e = this.variables),
        {
          query: this.document,
          variables: e,
          returnPartialData: !0,
          optimistic: !0,
          canonizeResults: null === (t = this.observableQuery) || void 0 === t ? void 0 : t.options.canonizeResults,
        }
      );
    }),
    (e.prototype.setDiff = function (e) {
      var t = this,
        n = this.lastDiff && this.lastDiff.diff;
      this.updateLastDiff(e),
        this.dirty ||
          El(n && n.result, e && e.result) ||
          ((this.dirty = !0),
          this.notifyTimeout ||
            (this.notifyTimeout = setTimeout(function () {
              return t.notify();
            }, 0)));
    }),
    (e.prototype.setObservableQuery = function (e) {
      var t = this;
      e !== this.observableQuery &&
        (this.oqListener && this.listeners.delete(this.oqListener),
        (this.observableQuery = e),
        e
          ? ((e.queryInfo = this),
            this.listeners.add(
              (this.oqListener = function () {
                t.getDiff().fromOptimisticTransaction ? e.observe() : e.reobserve();
              })
            ))
          : delete this.oqListener);
    }),
    (e.prototype.notify = function () {
      var e = this;
      Bh(this),
        this.shouldNotify() &&
          this.listeners.forEach(function (t) {
            return t(e);
          }),
        (this.dirty = !1);
    }),
    (e.prototype.shouldNotify = function () {
      if (!this.dirty || !this.listeners.size) return !1;
      if (Dh(this.networkStatus) && this.observableQuery) {
        var e = this.observableQuery.options.fetchPolicy;
        if ("cache-only" !== e && "cache-and-network" !== e) return !1;
      }
      return !0;
    }),
    (e.prototype.stop = function () {
      if (!this.stopped) {
        (this.stopped = !0),
          this.reset(),
          this.cancel(),
          (this.cancel = e.prototype.cancel),
          this.subscriptions.forEach(function (e) {
            return e.unsubscribe();
          });
        var t = this.observableQuery;
        t && t.stopPolling();
      }
    }),
    (e.prototype.cancel = function () {}),
    (e.prototype.updateWatch = function (e) {
      var t = this;
      void 0 === e && (e = this.variables);
      var n = this.observableQuery;
      if (!n || "no-cache" !== n.options.fetchPolicy) {
        var i = Re(Re({}, this.getDiffOptions(e)), {
          watcher: this,
          callback: function (e) {
            return t.setDiff(e);
          },
        });
        (this.lastWatch && El(i, this.lastWatch)) ||
          (this.cancel(), (this.cancel = this.cache.watch((this.lastWatch = i))));
      }
    }),
    (e.prototype.resetLastWrite = function () {
      this.lastWrite = void 0;
    }),
    (e.prototype.shouldWrite = function (e, t) {
      var n = this.lastWrite;
      return !(n && n.dmCount === Vh.get(this.cache) && El(t, n.variables) && El(e.data, n.result.data));
    }),
    (e.prototype.markResult = function (e, t, n) {
      var i = this;
      (this.graphQLErrors = Jc(e.errors) ? e.errors : []),
        this.reset(),
        "no-cache" === t.fetchPolicy
          ? this.updateLastDiff({ result: e.data, complete: !0 }, this.getDiffOptions(t.variables))
          : 0 !== n &&
            (qh(e, t.errorPolicy)
              ? this.cache.performTransaction(function (r) {
                  if (i.shouldWrite(e, t.variables))
                    r.writeQuery({ query: i.document, data: e.data, variables: t.variables, overwrite: 1 === n }),
                      (i.lastWrite = { result: e, variables: t.variables, dmCount: Vh.get(i.cache) });
                  else if (i.lastDiff && i.lastDiff.diff.complete) return void (e.data = i.lastDiff.diff.result);
                  var o = i.getDiffOptions(t.variables),
                    s = r.diff(o);
                  i.stopped || i.updateWatch(t.variables), i.updateLastDiff(s, o), s.complete && (e.data = s.result);
                })
              : (this.lastWrite = void 0));
    }),
    (e.prototype.markReady = function () {
      return (this.networkError = null), (this.networkStatus = Mh.ready);
    }),
    (e.prototype.markError = function (e) {
      return (
        (this.networkStatus = Mh.error),
        (this.lastWrite = void 0),
        this.reset(),
        e.graphQLErrors && (this.graphQLErrors = e.graphQLErrors),
        e.networkError && (this.networkError = e.networkError),
        e
      );
    }),
    e
  );
})();
function qh(e, t) {
  void 0 === t && (t = "none");
  var n = "ignore" === t || "all" === t,
    i = !el(e);
  return !i && n && e.data && (i = !0), i;
}
var Qh = Object.prototype.hasOwnProperty,
  Gh = (function () {
    function e(e) {
      var t = e.cache,
        n = e.link,
        i = e.queryDeduplication,
        r = void 0 !== i && i,
        o = e.onBroadcast,
        s = e.ssrMode,
        a = void 0 !== s && s,
        c = e.clientAwareness,
        l = void 0 === c ? {} : c,
        u = e.localState,
        h = e.assumeImmutableResults;
      (this.clientAwareness = {}),
        (this.queries = new Map()),
        (this.fetchCancelFns = new Map()),
        (this.transformCache = new (Gc ? WeakMap : Map)()),
        (this.queryIdCounter = 1),
        (this.requestIdCounter = 1),
        (this.mutationIdCounter = 1),
        (this.inFlightLinkObservables = new Map()),
        (this.cache = t),
        (this.link = n),
        (this.queryDeduplication = r),
        (this.clientAwareness = l),
        (this.localState = u || new Fh({ cache: t })),
        (this.ssrMode = a),
        (this.assumeImmutableResults = !!h),
        (this.onBroadcast = o) && (this.mutationStore = Object.create(null));
    }
    return (
      (e.prototype.stop = function () {
        var e = this;
        this.queries.forEach(function (t, n) {
          e.stopQueryNoBroadcast(n);
        }),
          this.cancelPendingFetches(__DEV__ ? new ns("QueryManager stopped while query was in flight") : new ns(11));
      }),
      (e.prototype.cancelPendingFetches = function (e) {
        this.fetchCancelFns.forEach(function (t) {
          return t(e);
        }),
          this.fetchCancelFns.clear();
      }),
      (e.prototype.mutate = function (e) {
        var t = e.mutation,
          n = e.variables,
          i = e.optimisticResponse,
          r = e.updateQueries,
          o = e.refetchQueries,
          s = void 0 === o ? [] : o,
          a = e.awaitRefetchQueries,
          c = void 0 !== a && a,
          l = e.update,
          u = e.onQueryUpdated,
          h = e.errorPolicy,
          d = void 0 === h ? "none" : h,
          p = e.fetchPolicy,
          f = void 0 === p ? "network-only" : p,
          v = e.keepRootFields,
          m = e.context;
        return Le(this, void 0, void 0, function () {
          var e, o, a;
          return je(this, function (h) {
            switch (h.label) {
              case 0:
                return (
                  __DEV__
                    ? is(
                        t,
                        "mutation option is required. You must specify your GraphQL document in the mutation option."
                      )
                    : is(t, 12),
                  __DEV__
                    ? is(
                        "network-only" === f || "no-cache" === f,
                        "Mutations support only 'network-only' or 'no-cache' fetchPolicy strings. The default `network-only` behavior automatically writes mutation results to the cache. Passing `no-cache` skips the cache write."
                      )
                    : is("network-only" === f || "no-cache" === f, 13),
                  (e = this.generateMutationId()),
                  (t = this.transform(t).document),
                  (n = this.getVariables(t, n)),
                  this.transform(t).hasClientExports ? [4, this.localState.addExportedVariables(t, n, m)] : [3, 2]
                );
              case 1:
                (n = h.sent()), (h.label = 2);
              case 2:
                return (
                  (o =
                    this.mutationStore &&
                    (this.mutationStore[e] = { mutation: t, variables: n, loading: !0, error: null })),
                  i &&
                    this.markMutationOptimistic(i, {
                      mutationId: e,
                      document: t,
                      variables: n,
                      fetchPolicy: f,
                      errorPolicy: d,
                      context: m,
                      updateQueries: r,
                      update: l,
                      keepRootFields: v,
                    }),
                  this.broadcastQueries(),
                  (a = this),
                  [
                    2,
                    new Promise(function (h, p) {
                      return Qc(
                        a.getObservableFromLink(t, Re(Re({}, m), { optimisticResponse: i }), n, !1),
                        function (h) {
                          if (el(h) && "none" === d) throw new Ph({ graphQLErrors: h.errors });
                          o && ((o.loading = !1), (o.error = null));
                          var p = Re({}, h);
                          return (
                            "function" == typeof s && (s = s(p)),
                            "ignore" === d && el(p) && delete p.errors,
                            a.markMutationResult({
                              mutationId: e,
                              result: p,
                              document: t,
                              variables: n,
                              fetchPolicy: f,
                              errorPolicy: d,
                              context: m,
                              update: l,
                              updateQueries: r,
                              awaitRefetchQueries: c,
                              refetchQueries: s,
                              removeOptimistic: i ? e : void 0,
                              onQueryUpdated: u,
                              keepRootFields: v,
                            })
                          );
                        }
                      ).subscribe({
                        next: function (e) {
                          a.broadcastQueries(), h(e);
                        },
                        error: function (t) {
                          o && ((o.loading = !1), (o.error = t)),
                            i && a.cache.removeOptimistic(e),
                            a.broadcastQueries(),
                            p(t instanceof Ph ? t : new Ph({ networkError: t }));
                        },
                      });
                    }),
                  ]
                );
            }
          });
        });
      }),
      (e.prototype.markMutationResult = function (e, t) {
        var n = this;
        void 0 === t && (t = this.cache);
        var i = e.result,
          r = [],
          o = "no-cache" === e.fetchPolicy;
        if (!o && qh(i, e.errorPolicy)) {
          r.push({ result: i.data, dataId: "ROOT_MUTATION", query: e.document, variables: e.variables });
          var s = e.updateQueries;
          s &&
            this.queries.forEach(function (e, o) {
              var a = e.observableQuery,
                c = a && a.queryName;
              if (c && Qh.call(s, c)) {
                var l = s[c],
                  u = n.queries.get(o),
                  h = u.document,
                  d = u.variables,
                  p = t.diff({ query: h, variables: d, returnPartialData: !0, optimistic: !1 }),
                  f = p.result;
                if (p.complete && f) {
                  var v = l(f, { mutationResult: i, queryName: (h && Za(h)) || void 0, queryVariables: d });
                  v && r.push({ result: v, dataId: "ROOT_QUERY", query: h, variables: d });
                }
              }
            });
        }
        if (r.length > 0 || e.refetchQueries || e.update || e.onQueryUpdated || e.removeOptimistic) {
          var a = [];
          if (
            (this.refetchQueries({
              updateCache: function (t) {
                o ||
                  r.forEach(function (e) {
                    return t.write(e);
                  });
                var s = e.update;
                if (s) {
                  if (!o) {
                    var a = t.diff({
                      id: "ROOT_MUTATION",
                      query: n.transform(e.document).asQuery,
                      variables: e.variables,
                      optimistic: !1,
                      returnPartialData: !0,
                    });
                    a.complete && (i = Re(Re({}, i), { data: a.result }));
                  }
                  s(t, i, { context: e.context, variables: e.variables });
                }
                o ||
                  e.keepRootFields ||
                  t.modify({
                    id: "ROOT_MUTATION",
                    fields: function (e, t) {
                      var n = t.fieldName,
                        i = t.DELETE;
                      return "__typename" === n ? e : i;
                    },
                  });
              },
              include: e.refetchQueries,
              optimistic: !1,
              removeOptimistic: e.removeOptimistic,
              onQueryUpdated: e.onQueryUpdated || null,
            }).forEach(function (e) {
              return a.push(e);
            }),
            e.awaitRefetchQueries || e.onQueryUpdated)
          )
            return Promise.all(a).then(function () {
              return i;
            });
        }
        return Promise.resolve(i);
      }),
      (e.prototype.markMutationOptimistic = function (e, t) {
        var n = this,
          i = "function" == typeof e ? e(t.variables) : e;
        return this.cache.recordOptimisticTransaction(function (e) {
          try {
            n.markMutationResult(Re(Re({}, t), { result: { data: i } }), e);
          } catch (e) {
            __DEV__ && is.error(e);
          }
        }, t.mutationId);
      }),
      (e.prototype.fetchQuery = function (e, t, n) {
        return this.fetchQueryObservable(e, t, n).promise;
      }),
      (e.prototype.getQueryStore = function () {
        var e = Object.create(null);
        return (
          this.queries.forEach(function (t, n) {
            e[n] = {
              variables: t.variables,
              networkStatus: t.networkStatus,
              networkError: t.networkError,
              graphQLErrors: t.graphQLErrors,
            };
          }),
          e
        );
      }),
      (e.prototype.resetErrors = function (e) {
        var t = this.queries.get(e);
        t && ((t.networkError = void 0), (t.graphQLErrors = []));
      }),
      (e.prototype.transform = function (e) {
        var t,
          n = this.transformCache;
        if (!n.has(e)) {
          var i = this.cache.transformDocument(e),
            r = ((t = this.cache.transformForLink(i)), sc([cc], Wa(t))),
            o = this.localState.clientQuery(i),
            s = r && this.localState.serverQuery(r),
            a = {
              document: i,
              hasClientExports: Ma(i),
              hasForcedResolvers: this.localState.shouldForceResolvers(i),
              clientQuery: o,
              serverQuery: s,
              defaultVars: ec(Ya(i)),
              asQuery: Re(Re({}, i), {
                definitions: i.definitions.map(function (e) {
                  return "OperationDefinition" === e.kind && "query" !== e.operation
                    ? Re(Re({}, e), { operation: "query" })
                    : e;
                }),
              }),
            },
            c = function (e) {
              e && !n.has(e) && n.set(e, a);
            };
          c(e), c(i), c(o), c(s);
        }
        return n.get(e);
      }),
      (e.prototype.getVariables = function (e, t) {
        return Re(Re({}, this.transform(e).defaultVars), t);
      }),
      (e.prototype.watchQuery = function (e) {
        void 0 ===
          (e = Re(Re({}, e), { variables: this.getVariables(e.query, e.variables) })).notifyOnNetworkStatusChange &&
          (e.notifyOnNetworkStatusChange = !1);
        var t = new Hh(this),
          n = new Lh({ queryManager: this, queryInfo: t, options: e });
        return (
          this.queries.set(n.queryId, t), t.init({ document: e.query, observableQuery: n, variables: e.variables }), n
        );
      }),
      (e.prototype.query = function (e, t) {
        var n = this;
        return (
          void 0 === t && (t = this.generateQueryId()),
          __DEV__
            ? is(e.query, "query option is required. You must specify your GraphQL document in the query option.")
            : is(e.query, 14),
          __DEV__
            ? is("Document" === e.query.kind, 'You must wrap the query string in a "gql" tag.')
            : is("Document" === e.query.kind, 15),
          __DEV__
            ? is(!e.returnPartialData, "returnPartialData option only supported on watchQuery.")
            : is(!e.returnPartialData, 16),
          __DEV__ ? is(!e.pollInterval, "pollInterval option only supported on watchQuery.") : is(!e.pollInterval, 17),
          this.fetchQuery(t, e).finally(function () {
            return n.stopQuery(t);
          })
        );
      }),
      (e.prototype.generateQueryId = function () {
        return String(this.queryIdCounter++);
      }),
      (e.prototype.generateRequestId = function () {
        return this.requestIdCounter++;
      }),
      (e.prototype.generateMutationId = function () {
        return String(this.mutationIdCounter++);
      }),
      (e.prototype.stopQueryInStore = function (e) {
        this.stopQueryInStoreNoBroadcast(e), this.broadcastQueries();
      }),
      (e.prototype.stopQueryInStoreNoBroadcast = function (e) {
        var t = this.queries.get(e);
        t && t.stop();
      }),
      (e.prototype.clearStore = function (e) {
        return (
          void 0 === e && (e = { discardWatches: !0 }),
          this.cancelPendingFetches(
            __DEV__ ? new ns("Store reset while query was in flight (not completed in link chain)") : new ns(18)
          ),
          this.queries.forEach(function (e) {
            e.observableQuery ? (e.networkStatus = Mh.loading) : e.stop();
          }),
          this.mutationStore && (this.mutationStore = Object.create(null)),
          this.cache.reset(e)
        );
      }),
      (e.prototype.getObservableQueries = function (e) {
        var t = this;
        void 0 === e && (e = "active");
        var n = new Map(),
          i = new Map(),
          r = new Set();
        return (
          Array.isArray(e) &&
            e.forEach(function (e) {
              var n;
              "string" == typeof e
                ? i.set(e, !1)
                : Na((n = e)) && "Document" === n.kind && Array.isArray(n.definitions)
                ? i.set(t.transform(e).document, !1)
                : Na(e) && e.query && r.add(e);
            }),
          this.queries.forEach(function (t, r) {
            var o = t.observableQuery,
              s = t.document;
            if (o) {
              if ("all" === e) return void n.set(r, o);
              var a = o.queryName;
              if ("standby" === o.options.fetchPolicy || ("active" === e && !o.hasObservers())) return;
              ("active" === e || (a && i.has(a)) || (s && i.has(s))) &&
                (n.set(r, o), a && i.set(a, !0), s && i.set(s, !0));
            }
          }),
          r.size &&
            r.forEach(function (e) {
              var i = il("legacyOneTimeQuery"),
                r = t.getQuery(i).init({ document: e.query, variables: e.variables }),
                o = new Lh({ queryManager: t, queryInfo: r, options: Re(Re({}, e), { fetchPolicy: "network-only" }) });
              is(o.queryId === i), r.setObservableQuery(o), n.set(i, o);
            }),
          __DEV__ &&
            i.size &&
            i.forEach(function (e, t) {
              e ||
                (__DEV__ &&
                  is.warn(
                    "Unknown query "
                      .concat("string" == typeof t ? "named " : "")
                      .concat(JSON.stringify(t, null, 2), " requested in refetchQueries options.include array")
                  ));
            }),
          n
        );
      }),
      (e.prototype.reFetchObservableQueries = function (e) {
        var t = this;
        void 0 === e && (e = !1);
        var n = [];
        return (
          this.getObservableQueries(e ? "all" : "active").forEach(function (i, r) {
            var o = i.options.fetchPolicy;
            i.resetLastResults(),
              (e || ("standby" !== o && "cache-only" !== o)) && n.push(i.refetch()),
              t.getQuery(r).setDiff(null);
          }),
          this.broadcastQueries(),
          Promise.all(n)
        );
      }),
      (e.prototype.setObservableQuery = function (e) {
        this.getQuery(e.queryId).setObservableQuery(e);
      }),
      (e.prototype.startGraphQLSubscription = function (e) {
        var t = this,
          n = e.query,
          i = e.fetchPolicy,
          r = e.errorPolicy,
          o = e.variables,
          s = e.context,
          a = void 0 === s ? {} : s;
        (n = this.transform(n).document), (o = this.getVariables(n, o));
        var c = function (e) {
          return t.getObservableFromLink(n, a, e).map(function (o) {
            if (
              ("no-cache" !== i &&
                (qh(o, r) && t.cache.write({ query: n, result: o.data, dataId: "ROOT_SUBSCRIPTION", variables: e }),
                t.broadcastQueries()),
              el(o))
            )
              throw new Ph({ graphQLErrors: o.errors });
            return o;
          });
        };
        if (this.transform(n).hasClientExports) {
          var l = this.localState.addExportedVariables(n, o, a).then(c);
          return new Lc(function (e) {
            var t = null;
            return (
              l.then(function (n) {
                return (t = n.subscribe(e));
              }, e.error),
              function () {
                return t && t.unsubscribe();
              }
            );
          });
        }
        return c(o);
      }),
      (e.prototype.stopQuery = function (e) {
        this.stopQueryNoBroadcast(e), this.broadcastQueries();
      }),
      (e.prototype.stopQueryNoBroadcast = function (e) {
        this.stopQueryInStoreNoBroadcast(e), this.removeQuery(e);
      }),
      (e.prototype.removeQuery = function (e) {
        this.fetchCancelFns.delete(e), this.getQuery(e).stop(), this.queries.delete(e);
      }),
      (e.prototype.broadcastQueries = function () {
        this.onBroadcast && this.onBroadcast(),
          this.queries.forEach(function (e) {
            return e.notify();
          });
      }),
      (e.prototype.getLocalState = function () {
        return this.localState;
      }),
      (e.prototype.getObservableFromLink = function (e, t, n, i) {
        var r,
          o,
          s = this;
        void 0 === i &&
          (i = null !== (r = null == t ? void 0 : t.queryDeduplication) && void 0 !== r ? r : this.queryDeduplication);
        var a = this.transform(e).serverQuery;
        if (a) {
          var c = this.inFlightLinkObservables,
            l = this.link,
            u = {
              query: a,
              variables: n,
              operationName: Za(a) || void 0,
              context: this.prepareContext(Re(Re({}, t), { forceFetch: !i })),
            };
          if (((t = u.context), i)) {
            var h = c.get(a) || new Map();
            c.set(a, h);
            var d = Uu(n);
            if (!(o = h.get(d))) {
              var p = new Kc([dl(l, u)]);
              h.set(d, (o = p)),
                p.cleanup(function () {
                  h.delete(d) && h.size < 1 && c.delete(a);
                });
            }
          } else o = new Kc([dl(l, u)]);
        } else (o = new Kc([Lc.of({ data: {} })])), (t = this.prepareContext(t));
        var f = this.transform(e).clientQuery;
        return (
          f &&
            (o = Qc(o, function (e) {
              return s.localState.runResolvers({ document: f, remoteResult: e, context: t, variables: n });
            })),
          o
        );
      }),
      (e.prototype.getResultsFromLink = function (e, t, n) {
        var i = (e.lastRequestId = this.generateRequestId());
        return Qc(
          this.getObservableFromLink(e.document, n.context, n.variables),
          function (r) {
            var o = Jc(r.errors);
            if (i >= e.lastRequestId) {
              if (o && "none" === n.errorPolicy) throw e.markError(new Ph({ graphQLErrors: r.errors }));
              e.markResult(r, n, t), e.markReady();
            }
            var s = { data: r.data, loading: !1, networkStatus: e.networkStatus || Mh.ready };
            return o && "ignore" !== n.errorPolicy && (s.errors = r.errors), s;
          },
          function (t) {
            var n = t.hasOwnProperty("graphQLErrors") ? t : new Ph({ networkError: t });
            throw (i >= e.lastRequestId && e.markError(n), n);
          }
        );
      }),
      (e.prototype.fetchQueryObservable = function (e, t, n) {
        var i = this;
        void 0 === n && (n = Mh.loading);
        var r = this.transform(t.query).document,
          o = this.getVariables(r, t.variables),
          s = this.getQuery(e),
          a = t.fetchPolicy,
          c = void 0 === a ? "cache-first" : a,
          l = t.errorPolicy,
          u = void 0 === l ? "none" : l,
          h = t.returnPartialData,
          d = void 0 !== h && h,
          p = t.notifyOnNetworkStatusChange,
          f = void 0 !== p && p,
          v = t.context,
          m = void 0 === v ? {} : v,
          g = Object.assign({}, t, {
            query: r,
            variables: o,
            fetchPolicy: c,
            errorPolicy: u,
            returnPartialData: d,
            notifyOnNetworkStatusChange: f,
            context: m,
          }),
          y = function (e) {
            return (g.variables = e), i.fetchQueryByPolicy(s, g, n);
          };
        this.fetchCancelFns.set(e, function (e) {
          setTimeout(function () {
            return b.cancel(e);
          });
        });
        var b = new Kc(
          this.transform(g.query).hasClientExports
            ? this.localState.addExportedVariables(g.query, g.variables, g.context).then(y)
            : y(g.variables)
        );
        return (
          b.cleanup(function () {
            i.fetchCancelFns.delete(e),
              (function (e) {
                var t = e.fetchPolicy,
                  n = void 0 === t ? "cache-first" : t,
                  i = e.nextFetchPolicy;
                i && (e.fetchPolicy = "function" == typeof i ? i.call(e, n) : i);
              })(t);
          }),
          b
        );
      }),
      (e.prototype.refetchQueries = function (e) {
        var t = this,
          n = e.updateCache,
          i = e.include,
          r = e.optimistic,
          o = void 0 !== r && r,
          s = e.removeOptimistic,
          a = void 0 === s ? (o ? il("refetchQueries") : void 0) : s,
          c = e.onQueryUpdated,
          l = new Map();
        i &&
          this.getObservableQueries(i).forEach(function (e, n) {
            l.set(n, { oq: e, lastDiff: t.getQuery(n).getDiff() });
          });
        var u = new Map();
        return (
          n &&
            this.cache.batch({
              update: n,
              optimistic: (o && a) || !1,
              removeOptimistic: a,
              onWatchUpdated: function (e, t, n) {
                var i = e.watcher instanceof Hh && e.watcher.observableQuery;
                if (i) {
                  if (c) {
                    l.delete(i.queryId);
                    var r = c(i, t, n);
                    return !0 === r && (r = i.refetch()), !1 !== r && u.set(i, r), r;
                  }
                  null !== c && l.set(i.queryId, { oq: i, lastDiff: n, diff: t });
                }
              },
            }),
          l.size &&
            l.forEach(function (e, n) {
              var i,
                r = e.oq,
                o = e.lastDiff,
                s = e.diff;
              if (c) {
                if (!s) {
                  var a = r.queryInfo;
                  a.reset(), (s = a.getDiff());
                }
                i = c(r, s, o);
              }
              (c && !0 !== i) || (i = r.refetch()),
                !1 !== i && u.set(r, i),
                n.indexOf("legacyOneTimeQuery") >= 0 && t.stopQueryNoBroadcast(n);
            }),
          a && this.cache.removeOptimistic(a),
          u
        );
      }),
      (e.prototype.fetchQueryByPolicy = function (e, t, n) {
        var i = this,
          r = t.query,
          o = t.variables,
          s = t.fetchPolicy,
          a = t.refetchWritePolicy,
          c = t.errorPolicy,
          l = t.returnPartialData,
          u = t.context,
          h = t.notifyOnNetworkStatusChange,
          d = e.networkStatus;
        e.init({ document: r, variables: o, networkStatus: n });
        var p = function () {
            return e.getDiff(o);
          },
          f = function (t, n) {
            void 0 === n && (n = e.networkStatus || Mh.loading);
            var s = t.result;
            !__DEV__ || l || El(s, {}) || zh(t.missing);
            var a = function (e) {
              return Lc.of(Re({ data: e, loading: Dh(n), networkStatus: n }, t.complete ? null : { partial: !0 }));
            };
            return s && i.transform(r).hasForcedResolvers
              ? i.localState
                  .runResolvers({
                    document: r,
                    remoteResult: { data: s },
                    context: u,
                    variables: o,
                    onlyRunForcedResolvers: !0,
                  })
                  .then(function (e) {
                    return a(e.data || void 0);
                  })
              : a(s);
          },
          v = "no-cache" === s ? 0 : n === Mh.refetch && "merge" !== a ? 1 : 2,
          m = function () {
            return i.getResultsFromLink(e, v, { variables: o, context: u, fetchPolicy: s, errorPolicy: c });
          },
          g = h && "number" == typeof d && d !== n && Dh(n);
        switch (s) {
          default:
          case "cache-first":
            return (y = p()).complete ? [f(y, e.markReady())] : l || g ? [f(y), m()] : [m()];
          case "cache-and-network":
            var y;
            return (y = p()).complete || l || g ? [f(y), m()] : [m()];
          case "cache-only":
            return [f(p(), e.markReady())];
          case "network-only":
            return g ? [f(p()), m()] : [m()];
          case "no-cache":
            return g ? [f(e.getDiff()), m()] : [m()];
          case "standby":
            return [];
        }
      }),
      (e.prototype.getQuery = function (e) {
        return e && !this.queries.has(e) && this.queries.set(e, new Hh(this, e)), this.queries.get(e);
      }),
      (e.prototype.prepareContext = function (e) {
        void 0 === e && (e = {});
        var t = this.localState.prepareContext(e);
        return Re(Re({}, t), { clientAwareness: this.clientAwareness });
      }),
      e
    );
  })(),
  Wh = !1;
function Yh(e, t) {
  return tl(e, t, t.variables && { variables: Re(Re({}, e.variables), t.variables) });
}
var Zh = (function () {
    function e(e) {
      var t = this;
      (this.defaultOptions = {}), (this.resetStoreCallbacks = []), (this.clearStoreCallbacks = []);
      var n = e.uri,
        i = e.credentials,
        r = e.headers,
        o = e.cache,
        s = e.ssrMode,
        a = void 0 !== s && s,
        c = e.ssrForceFetchDelay,
        l = void 0 === c ? 0 : c,
        u = e.connectToDevTools,
        h = void 0 === u ? "object" == typeof window && !window.__APOLLO_CLIENT__ && __DEV__ : u,
        d = e.queryDeduplication,
        p = void 0 === d || d,
        f = e.defaultOptions,
        v = e.assumeImmutableResults,
        m = void 0 !== v && v,
        g = e.resolvers,
        y = e.typeDefs,
        b = e.fragmentMatcher,
        x = e.name,
        w = e.version,
        S = e.link;
      if ((S || (S = n ? new wl({ uri: n, credentials: i, headers: r }) : ul.empty()), !o))
        throw __DEV__
          ? new ns(
              "To initialize Apollo Client, you must specify a 'cache' property in the options object. \nFor more information, please visit: https://go.apollo.dev/c/docs"
            )
          : new ns(7);
      if (
        ((this.link = S),
        (this.cache = o),
        (this.disableNetworkFetches = a || l > 0),
        (this.queryDeduplication = p),
        (this.defaultOptions = f || {}),
        (this.typeDefs = y),
        l &&
          setTimeout(function () {
            return (t.disableNetworkFetches = !1);
          }, l),
        (this.watchQuery = this.watchQuery.bind(this)),
        (this.query = this.query.bind(this)),
        (this.mutate = this.mutate.bind(this)),
        (this.resetStore = this.resetStore.bind(this)),
        (this.reFetchObservableQueries = this.reFetchObservableQueries.bind(this)),
        h && "object" == typeof window && (window.__APOLLO_CLIENT__ = this),
        !Wh &&
          __DEV__ &&
          ((Wh = !0),
          "undefined" != typeof window &&
            window.document &&
            window.top === window.self &&
            !window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__))
      ) {
        var _ = window.navigator,
          T = _ && _.userAgent,
          C = void 0;
        "string" == typeof T &&
          (T.indexOf("Chrome/") > -1
            ? (C =
                "https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm")
            : T.indexOf("Firefox/") > -1 &&
              (C = "https://addons.mozilla.org/en-US/firefox/addon/apollo-developer-tools/")),
          C && __DEV__ && is.log("Download the Apollo DevTools for a better development experience: " + C);
      }
      (this.version = "3.5.8"),
        (this.localState = new Fh({ cache: o, client: this, resolvers: g, fragmentMatcher: b })),
        (this.queryManager = new Gh({
          cache: this.cache,
          link: this.link,
          queryDeduplication: p,
          ssrMode: a,
          clientAwareness: { name: x, version: w },
          localState: this.localState,
          assumeImmutableResults: m,
          onBroadcast: h
            ? function () {
                t.devToolsHookCb &&
                  t.devToolsHookCb({
                    action: {},
                    state: { queries: t.queryManager.getQueryStore(), mutations: t.queryManager.mutationStore || {} },
                    dataWithOptimisticResults: t.cache.extract(!0),
                  });
              }
            : void 0,
        }));
    }
    return (
      (e.prototype.stop = function () {
        this.queryManager.stop();
      }),
      (e.prototype.watchQuery = function (e) {
        return (
          this.defaultOptions.watchQuery && (e = Yh(this.defaultOptions.watchQuery, e)),
          !this.disableNetworkFetches ||
            ("network-only" !== e.fetchPolicy && "cache-and-network" !== e.fetchPolicy) ||
            (e = Re(Re({}, e), { fetchPolicy: "cache-first" })),
          this.queryManager.watchQuery(e)
        );
      }),
      (e.prototype.query = function (e) {
        return (
          this.defaultOptions.query && (e = Yh(this.defaultOptions.query, e)),
          __DEV__
            ? is(
                "cache-and-network" !== e.fetchPolicy,
                "The cache-and-network fetchPolicy does not work with client.query, because client.query can only return a single result. Please use client.watchQuery to receive multiple results from the cache and the network, or consider using a different fetchPolicy, such as cache-first or network-only."
              )
            : is("cache-and-network" !== e.fetchPolicy, 8),
          this.disableNetworkFetches &&
            "network-only" === e.fetchPolicy &&
            (e = Re(Re({}, e), { fetchPolicy: "cache-first" })),
          this.queryManager.query(e)
        );
      }),
      (e.prototype.mutate = function (e) {
        return this.defaultOptions.mutate && (e = Yh(this.defaultOptions.mutate, e)), this.queryManager.mutate(e);
      }),
      (e.prototype.subscribe = function (e) {
        return this.queryManager.startGraphQLSubscription(e);
      }),
      (e.prototype.readQuery = function (e, t) {
        return void 0 === t && (t = !1), this.cache.readQuery(e, t);
      }),
      (e.prototype.readFragment = function (e, t) {
        return void 0 === t && (t = !1), this.cache.readFragment(e, t);
      }),
      (e.prototype.writeQuery = function (e) {
        this.cache.writeQuery(e), this.queryManager.broadcastQueries();
      }),
      (e.prototype.writeFragment = function (e) {
        this.cache.writeFragment(e), this.queryManager.broadcastQueries();
      }),
      (e.prototype.__actionHookForDevTools = function (e) {
        this.devToolsHookCb = e;
      }),
      (e.prototype.__requestRaw = function (e) {
        return dl(this.link, e);
      }),
      (e.prototype.resetStore = function () {
        var e = this;
        return Promise.resolve()
          .then(function () {
            return e.queryManager.clearStore({ discardWatches: !1 });
          })
          .then(function () {
            return Promise.all(
              e.resetStoreCallbacks.map(function (e) {
                return e();
              })
            );
          })
          .then(function () {
            return e.reFetchObservableQueries();
          });
      }),
      (e.prototype.clearStore = function () {
        var e = this;
        return Promise.resolve()
          .then(function () {
            return e.queryManager.clearStore({ discardWatches: !0 });
          })
          .then(function () {
            return Promise.all(
              e.clearStoreCallbacks.map(function (e) {
                return e();
              })
            );
          });
      }),
      (e.prototype.onResetStore = function (e) {
        var t = this;
        return (
          this.resetStoreCallbacks.push(e),
          function () {
            t.resetStoreCallbacks = t.resetStoreCallbacks.filter(function (t) {
              return t !== e;
            });
          }
        );
      }),
      (e.prototype.onClearStore = function (e) {
        var t = this;
        return (
          this.clearStoreCallbacks.push(e),
          function () {
            t.clearStoreCallbacks = t.clearStoreCallbacks.filter(function (t) {
              return t !== e;
            });
          }
        );
      }),
      (e.prototype.reFetchObservableQueries = function (e) {
        return this.queryManager.reFetchObservableQueries(e);
      }),
      (e.prototype.refetchQueries = function (e) {
        var t = this.queryManager.refetchQueries(e),
          n = [],
          i = [];
        t.forEach(function (e, t) {
          n.push(t), i.push(e);
        });
        var r = Promise.all(i);
        return (
          (r.queries = n),
          (r.results = i),
          r.catch(function (e) {
            __DEV__ && is.debug("In client.refetchQueries, Promise.all promise rejected with error ".concat(e));
          }),
          r
        );
      }),
      (e.prototype.getObservableQueries = function (e) {
        return void 0 === e && (e = "active"), this.queryManager.getObservableQueries(e);
      }),
      (e.prototype.extract = function (e) {
        return this.cache.extract(e);
      }),
      (e.prototype.restore = function (e) {
        return this.cache.restore(e);
      }),
      (e.prototype.addResolvers = function (e) {
        this.localState.addResolvers(e);
      }),
      (e.prototype.setResolvers = function (e) {
        this.localState.setResolvers(e);
      }),
      (e.prototype.getResolvers = function () {
        return this.localState.getResolvers();
      }),
      (e.prototype.setLocalStateFragmentMatcher = function (e) {
        this.localState.setFragmentMatcher(e);
      }),
      (e.prototype.setLink = function (e) {
        this.link = this.queryManager.link = e;
      }),
      e
    );
  })(),
  Xh = new Map(),
  Kh = new Map(),
  Jh = !0,
  ed = !1;
function td(e) {
  return e.replace(/[\s,]+/g, " ").trim();
}
function nd(e) {
  var t = new Set(),
    n = [];
  return (
    e.definitions.forEach(function (e) {
      if ("FragmentDefinition" === e.kind) {
        var i = e.name.value,
          r = td((s = e.loc).source.body.substring(s.start, s.end)),
          o = Kh.get(i);
        o && !o.has(r)
          ? Jh &&
            console.warn(
              "Warning: fragment with name " +
                i +
                " already exists.\ngraphql-tag enforces all fragment names across your application to be unique; read more about\nthis in the docs: http://dev.apollodata.com/core/fragments.html#unique-names"
            )
          : o || Kh.set(i, (o = new Set())),
          o.add(r),
          t.has(r) || (t.add(r), n.push(e));
      } else n.push(e);
      var s;
    }),
    Re(Re({}, e), { definitions: n })
  );
}
function id(e) {
  var t = td(e);
  if (!Xh.has(t)) {
    var n = (function (e, t) {
      return new ha(e, t).parseDocument();
    })(e, { experimentalFragmentVariables: ed, allowLegacyFragmentVariables: ed });
    if (!n || "Document" !== n.kind) throw new Error("Not a valid GraphQL document.");
    Xh.set(
      t,
      (function (e) {
        var t = new Set(e.definitions);
        t.forEach(function (e) {
          e.loc && delete e.loc,
            Object.keys(e).forEach(function (n) {
              var i = e[n];
              i && "object" == typeof i && t.add(i);
            });
        });
        var n = e.loc;
        return n && (delete n.startToken, delete n.endToken), e;
      })(nd(n))
    );
  }
  return Xh.get(t);
}
function rd(e) {
  for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
  "string" == typeof e && (e = [e]);
  var i = e[0];
  return (
    t.forEach(function (t, n) {
      t && "Document" === t.kind ? (i += t.loc.source.body) : (i += t), (i += e[n + 1]);
    }),
    id(i)
  );
}
var od,
  sd = rd,
  ad = function () {
    Xh.clear(), Kh.clear();
  },
  cd = function () {
    Jh = !1;
  },
  ld = function () {
    ed = !0;
  },
  ud = function () {
    ed = !1;
  };
((od = rd || (rd = {})).gql = sd),
  (od.resetCaches = ad),
  (od.disableFragmentWarnings = cd),
  (od.enableExperimentalFragmentVariables = ld),
  (od.disableExperimentalFragmentVariables = ud),
  (rd.default = rd);
var hd = dd;
function dd(e) {
  (e = e || {}),
    (this.ms = e.min || 100),
    (this.max = e.max || 1e4),
    (this.factor = e.factor || 2),
    (this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0),
    (this.attempts = 0);
}
(dd.prototype.duration = function () {
  var e = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var t = Math.random(),
      n = Math.floor(t * this.jitter * e);
    e = 0 == (1 & Math.floor(10 * t)) ? e - n : e + n;
  }
  return 0 | Math.min(e, this.max);
}),
  (dd.prototype.reset = function () {
    this.attempts = 0;
  }),
  (dd.prototype.setMin = function (e) {
    this.ms = e;
  }),
  (dd.prototype.setMax = function (e) {
    this.max = e;
  }),
  (dd.prototype.setJitter = function (e) {
    this.jitter = e;
  });
var pd = Gn(function (e) {
  var t = Object.prototype.hasOwnProperty,
    n = "~";
  function i() {}
  function r(e, t, n) {
    (this.fn = e), (this.context = t), (this.once = n || !1);
  }
  function o(e, t, i, o, s) {
    if ("function" != typeof i) throw new TypeError("The listener must be a function");
    var a = new r(i, o || e, s),
      c = n ? n + t : t;
    return (
      e._events[c]
        ? e._events[c].fn
          ? (e._events[c] = [e._events[c], a])
          : e._events[c].push(a)
        : ((e._events[c] = a), e._eventsCount++),
      e
    );
  }
  function s(e, t) {
    0 == --e._eventsCount ? (e._events = new i()) : delete e._events[t];
  }
  function a() {
    (this._events = new i()), (this._eventsCount = 0);
  }
  Object.create && ((i.prototype = Object.create(null)), new i().__proto__ || (n = !1)),
    (a.prototype.eventNames = function () {
      var e,
        i,
        r = [];
      if (0 === this._eventsCount) return r;
      for (i in (e = this._events)) t.call(e, i) && r.push(n ? i.slice(1) : i);
      return Object.getOwnPropertySymbols ? r.concat(Object.getOwnPropertySymbols(e)) : r;
    }),
    (a.prototype.listeners = function (e) {
      var t = n ? n + e : e,
        i = this._events[t];
      if (!i) return [];
      if (i.fn) return [i.fn];
      for (var r = 0, o = i.length, s = new Array(o); r < o; r++) s[r] = i[r].fn;
      return s;
    }),
    (a.prototype.listenerCount = function (e) {
      var t = n ? n + e : e,
        i = this._events[t];
      return i ? (i.fn ? 1 : i.length) : 0;
    }),
    (a.prototype.emit = function (e, t, i, r, o, s) {
      var a = n ? n + e : e;
      if (!this._events[a]) return !1;
      var c,
        l,
        u = this._events[a],
        h = arguments.length;
      if (u.fn) {
        switch ((u.once && this.removeListener(e, u.fn, void 0, !0), h)) {
          case 1:
            return u.fn.call(u.context), !0;
          case 2:
            return u.fn.call(u.context, t), !0;
          case 3:
            return u.fn.call(u.context, t, i), !0;
          case 4:
            return u.fn.call(u.context, t, i, r), !0;
          case 5:
            return u.fn.call(u.context, t, i, r, o), !0;
          case 6:
            return u.fn.call(u.context, t, i, r, o, s), !0;
        }
        for (l = 1, c = new Array(h - 1); l < h; l++) c[l - 1] = arguments[l];
        u.fn.apply(u.context, c);
      } else {
        var d,
          p = u.length;
        for (l = 0; l < p; l++)
          switch ((u[l].once && this.removeListener(e, u[l].fn, void 0, !0), h)) {
            case 1:
              u[l].fn.call(u[l].context);
              break;
            case 2:
              u[l].fn.call(u[l].context, t);
              break;
            case 3:
              u[l].fn.call(u[l].context, t, i);
              break;
            case 4:
              u[l].fn.call(u[l].context, t, i, r);
              break;
            default:
              if (!c) for (d = 1, c = new Array(h - 1); d < h; d++) c[d - 1] = arguments[d];
              u[l].fn.apply(u[l].context, c);
          }
      }
      return !0;
    }),
    (a.prototype.on = function (e, t, n) {
      return o(this, e, t, n, !1);
    }),
    (a.prototype.once = function (e, t, n) {
      return o(this, e, t, n, !0);
    }),
    (a.prototype.removeListener = function (e, t, i, r) {
      var o = n ? n + e : e;
      if (!this._events[o]) return this;
      if (!t) return s(this, o), this;
      var a = this._events[o];
      if (a.fn) a.fn !== t || (r && !a.once) || (i && a.context !== i) || s(this, o);
      else {
        for (var c = 0, l = [], u = a.length; c < u; c++)
          (a[c].fn !== t || (r && !a[c].once) || (i && a[c].context !== i)) && l.push(a[c]);
        l.length ? (this._events[o] = 1 === l.length ? l[0] : l) : s(this, o);
      }
      return this;
    }),
    (a.prototype.removeAllListeners = function (e) {
      var t;
      return (
        e ? ((t = n ? n + e : e), this._events[t] && s(this, t)) : ((this._events = new i()), (this._eventsCount = 0)),
        this
      );
    }),
    (a.prototype.off = a.prototype.removeListener),
    (a.prototype.addListener = a.prototype.on),
    (a.prefixed = n),
    (a.EventEmitter = a),
    (e.exports = a);
});
var fd = function (e) {
    return "string" == typeof e;
  },
  vd = Object.defineProperty({ default: fd }, "__esModule", { value: !0 });
var md = function (e) {
    return null !== e && "object" == typeof e;
  },
  gd = Object.defineProperty({ default: md }, "__esModule", { value: !0 });
var yd = (function (e) {
    var t,
      n = e.Symbol;
    return (
      "function" == typeof n
        ? n.observable
          ? (t = n.observable)
          : ((t = n("observable")), (n.observable = t))
        : (t = "@@observable"),
      t
    );
  })(
    "undefined" != typeof self
      ? self
      : "undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof module
      ? module
      : Function("return this")()
  ),
  bd = Object.freeze({ __proto__: null, default: yd }),
  xd = Gn(function (e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), (t.GRAPHQL_SUBSCRIPTIONS = t.GRAPHQL_WS = void 0);
    t.GRAPHQL_WS = "graphql-ws";
    t.GRAPHQL_SUBSCRIPTIONS = "graphql-subscriptions";
  }),
  wd = Gn(function (e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), (t.WS_TIMEOUT = t.MIN_WS_TIMEOUT = void 0);
    t.MIN_WS_TIMEOUT = 1e3;
    t.WS_TIMEOUT = 3e4;
  }),
  Sd = (function () {
    function e() {
      throw new Error("Static Class");
    }
    return (
      (e.GQL_CONNECTION_INIT = "connection_init"),
      (e.GQL_CONNECTION_ACK = "connection_ack"),
      (e.GQL_CONNECTION_ERROR = "connection_error"),
      (e.GQL_CONNECTION_KEEP_ALIVE = "ka"),
      (e.GQL_CONNECTION_TERMINATE = "connection_terminate"),
      (e.GQL_START = "start"),
      (e.GQL_DATA = "data"),
      (e.GQL_ERROR = "error"),
      (e.GQL_COMPLETE = "complete"),
      (e.GQL_STOP = "stop"),
      (e.SUBSCRIPTION_START = "subscription_start"),
      (e.SUBSCRIPTION_DATA = "subscription_data"),
      (e.SUBSCRIPTION_SUCCESS = "subscription_success"),
      (e.SUBSCRIPTION_FAIL = "subscription_fail"),
      (e.SUBSCRIPTION_END = "subscription_end"),
      (e.INIT = "init"),
      (e.INIT_SUCCESS = "init_success"),
      (e.INIT_FAIL = "init_fail"),
      (e.KEEP_ALIVE = "keepalive"),
      e
    );
  })(),
  _d = Object.defineProperty({ default: Sd }, "__esModule", { value: !0 }),
  Td = Qn(ka),
  Cd = Qn(Aa),
  Ed = Qn(bd),
  kd = Gn(function (e, t) {
    var n =
        (qn && qn.__assign) ||
        function () {
          return (
            (n =
              Object.assign ||
              function (e) {
                for (var t, n = 1, i = arguments.length; n < i; n++)
                  for (var r in (t = arguments[n])) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                return e;
              }),
            n.apply(this, arguments)
          );
        },
      i =
        (qn && qn.__awaiter) ||
        function (e, t, n, i) {
          return new (n || (n = Promise))(function (r, o) {
            function s(e) {
              try {
                c(i.next(e));
              } catch (e) {
                o(e);
              }
            }
            function a(e) {
              try {
                c(i.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function c(e) {
              var t;
              e.done
                ? r(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function (e) {
                        e(t);
                      })).then(s, a);
            }
            c((i = i.apply(e, t || [])).next());
          });
        },
      r =
        (qn && qn.__generator) ||
        function (e, t) {
          var n,
            i,
            r,
            o,
            s = {
              label: 0,
              sent: function () {
                if (1 & r[0]) throw r[1];
                return r[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (o = { next: a(0), throw: a(1), return: a(2) }),
            "function" == typeof Symbol &&
              (o[Symbol.iterator] = function () {
                return this;
              }),
            o
          );
          function a(o) {
            return function (a) {
              return (function (o) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; s; )
                  try {
                    if (
                      ((n = 1),
                      i &&
                        (r = 2 & o[0] ? i.return : o[0] ? i.throw || ((r = i.return) && r.call(i), 0) : i.next) &&
                        !(r = r.call(i, o[1])).done)
                    )
                      return r;
                    switch (((i = 0), r && (o = [2 & o[0], r.value]), o[0])) {
                      case 0:
                      case 1:
                        r = o;
                        break;
                      case 4:
                        return s.label++, { value: o[1], done: !1 };
                      case 5:
                        s.label++, (i = o[1]), (o = [0]);
                        continue;
                      case 7:
                        (o = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (!((r = s.trys), (r = r.length > 0 && r[r.length - 1]) || (6 !== o[0] && 2 !== o[0]))) {
                          s = 0;
                          continue;
                        }
                        if (3 === o[0] && (!r || (o[1] > r[0] && o[1] < r[3]))) {
                          s.label = o[1];
                          break;
                        }
                        if (6 === o[0] && s.label < r[1]) {
                          (s.label = r[1]), (r = o);
                          break;
                        }
                        if (r && s.label < r[2]) {
                          (s.label = r[2]), s.ops.push(o);
                          break;
                        }
                        r[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    o = t.call(e, s);
                  } catch (e) {
                    (o = [6, e]), (i = 0);
                  } finally {
                    n = r = 0;
                  }
                if (5 & o[0]) throw o[1];
                return { value: o[0] ? o[1] : void 0, done: !0 };
              })([o, a]);
            };
          }
        },
      o =
        (qn && qn.__spreadArrays) ||
        function () {
          for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
          var i = Array(e),
            r = 0;
          for (t = 0; t < n; t++) for (var o = arguments[t], s = 0, a = o.length; s < a; s++, r++) i[r] = o[s];
          return i;
        };
    Object.defineProperty(t, "__esModule", { value: !0 }), (t.SubscriptionClient = void 0);
    var s = void 0 !== qn ? qn : "undefined" != typeof window ? window : {},
      a = s.WebSocket || s.MozWebSocket,
      c = (function () {
        function e(e, t, n, i) {
          var r = t || {},
            o = r.connectionCallback,
            s = void 0 === o ? void 0 : o,
            c = r.connectionParams,
            l = void 0 === c ? {} : c,
            u = r.minTimeout,
            h = void 0 === u ? wd.MIN_WS_TIMEOUT : u,
            d = r.timeout,
            p = void 0 === d ? wd.WS_TIMEOUT : d,
            f = r.reconnect,
            v = void 0 !== f && f,
            m = r.reconnectionAttempts,
            g = void 0 === m ? 1 / 0 : m,
            y = r.lazy,
            b = void 0 !== y && y,
            x = r.inactivityTimeout,
            w = void 0 === x ? 0 : x,
            S = r.wsOptionArguments,
            _ = void 0 === S ? [] : S;
          if (((this.wsImpl = n || a), !this.wsImpl))
            throw new Error("Unable to find native implementation, or alternative implementation for WebSocket!");
          (this.wsProtocols = i || xd.GRAPHQL_WS),
            (this.connectionCallback = s),
            (this.url = e),
            (this.operations = {}),
            (this.nextOperationId = 0),
            (this.minWsTimeout = h),
            (this.wsTimeout = p),
            (this.unsentMessagesQueue = []),
            (this.reconnect = v),
            (this.reconnecting = !1),
            (this.reconnectionAttempts = g),
            (this.lazy = !!b),
            (this.inactivityTimeout = w),
            (this.closedByUser = !1),
            (this.backoff = new hd({ jitter: 0.5 })),
            (this.eventEmitter = new pd.EventEmitter()),
            (this.middlewares = []),
            (this.client = null),
            (this.maxConnectTimeGenerator = this.createMaxConnectTimeGenerator()),
            (this.connectionParams = this.getConnectionParams(l)),
            (this.wsOptionArguments = _),
            this.lazy || this.connect();
        }
        return (
          Object.defineProperty(e.prototype, "status", {
            get: function () {
              return null === this.client ? this.wsImpl.CLOSED : this.client.readyState;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.close = function (e, t) {
            void 0 === e && (e = !0),
              void 0 === t && (t = !0),
              this.clearInactivityTimeout(),
              null !== this.client &&
                ((this.closedByUser = t),
                e &&
                  (this.clearCheckConnectionInterval(),
                  this.clearMaxConnectTimeout(),
                  this.clearTryReconnectTimeout(),
                  this.unsubscribeAll(),
                  this.sendMessage(void 0, _d.default.GQL_CONNECTION_TERMINATE, null)),
                this.client.close(),
                (this.client.onopen = null),
                (this.client.onclose = null),
                (this.client.onerror = null),
                (this.client.onmessage = null),
                (this.client = null),
                this.eventEmitter.emit("disconnected"),
                e || this.tryReconnect());
          }),
          (e.prototype.request = function (e) {
            var t,
              n,
              i = this.getObserver.bind(this),
              r = this.executeOperation.bind(this),
              o = this.unsubscribe.bind(this);
            return (
              this.clearInactivityTimeout(),
              ((t = {})[Ed.default] = function () {
                return this;
              }),
              (t.subscribe = function (t, s, a) {
                var c = i(t, s, a);
                return (
                  (n = r(e, function (e, t) {
                    null === e && null === t
                      ? c.complete && c.complete()
                      : e
                      ? c.error && c.error(e[0])
                      : c.next && c.next(t);
                  })),
                  {
                    unsubscribe: function () {
                      n && (o(n), (n = null));
                    },
                  }
                );
              }),
              t
            );
          }),
          (e.prototype.on = function (e, t, n) {
            var i = this.eventEmitter.on(e, t, n);
            return function () {
              i.off(e, t, n);
            };
          }),
          (e.prototype.onConnected = function (e, t) {
            return this.on("connected", e, t);
          }),
          (e.prototype.onConnecting = function (e, t) {
            return this.on("connecting", e, t);
          }),
          (e.prototype.onDisconnected = function (e, t) {
            return this.on("disconnected", e, t);
          }),
          (e.prototype.onReconnected = function (e, t) {
            return this.on("reconnected", e, t);
          }),
          (e.prototype.onReconnecting = function (e, t) {
            return this.on("reconnecting", e, t);
          }),
          (e.prototype.onError = function (e, t) {
            return this.on("error", e, t);
          }),
          (e.prototype.unsubscribeAll = function () {
            var e = this;
            Object.keys(this.operations).forEach(function (t) {
              e.unsubscribe(t);
            });
          }),
          (e.prototype.applyMiddlewares = function (e) {
            var t = this;
            return new Promise(function (n, i) {
              var r, s, a;
              (r = o(t.middlewares)),
                (s = t),
                (a = function (t) {
                  if (t) i(t);
                  else if (r.length > 0) {
                    var o = r.shift();
                    o && o.applyMiddleware.apply(s, [e, a]);
                  } else n(e);
                }),
                a();
            });
          }),
          (e.prototype.use = function (e) {
            var t = this;
            return (
              e.map(function (e) {
                if ("function" != typeof e.applyMiddleware)
                  throw new Error("Middleware must implement the applyMiddleware function.");
                t.middlewares.push(e);
              }),
              this
            );
          }),
          (e.prototype.getConnectionParams = function (e) {
            return function () {
              return new Promise(function (t, n) {
                if ("function" == typeof e)
                  try {
                    return t(e.call(null));
                  } catch (e) {
                    return n(e);
                  }
                t(e);
              });
            };
          }),
          (e.prototype.executeOperation = function (e, t) {
            var n = this;
            null === this.client && this.connect();
            var i = this.generateOperationId();
            return (
              (this.operations[i] = { options: e, handler: t }),
              this.applyMiddlewares(e)
                .then(function (e) {
                  n.checkOperationOptions(e, t),
                    n.operations[i] &&
                      ((n.operations[i] = { options: e, handler: t }), n.sendMessage(i, _d.default.GQL_START, e));
                })
                .catch(function (e) {
                  n.unsubscribe(i), t(n.formatErrors(e));
                }),
              i
            );
          }),
          (e.prototype.getObserver = function (e, t, n) {
            return "function" == typeof e
              ? {
                  next: function (t) {
                    return e(t);
                  },
                  error: function (e) {
                    return t && t(e);
                  },
                  complete: function () {
                    return n && n();
                  },
                }
              : e;
          }),
          (e.prototype.createMaxConnectTimeGenerator = function () {
            var e = this.minWsTimeout,
              t = this.wsTimeout;
            return new hd({ min: e, max: t, factor: 1.2 });
          }),
          (e.prototype.clearCheckConnectionInterval = function () {
            this.checkConnectionIntervalId &&
              (clearInterval(this.checkConnectionIntervalId), (this.checkConnectionIntervalId = null));
          }),
          (e.prototype.clearMaxConnectTimeout = function () {
            this.maxConnectTimeoutId && (clearTimeout(this.maxConnectTimeoutId), (this.maxConnectTimeoutId = null));
          }),
          (e.prototype.clearTryReconnectTimeout = function () {
            this.tryReconnectTimeoutId &&
              (clearTimeout(this.tryReconnectTimeoutId), (this.tryReconnectTimeoutId = null));
          }),
          (e.prototype.clearInactivityTimeout = function () {
            this.inactivityTimeoutId && (clearTimeout(this.inactivityTimeoutId), (this.inactivityTimeoutId = null));
          }),
          (e.prototype.setInactivityTimeout = function () {
            var e = this;
            this.inactivityTimeout > 0 &&
              0 === Object.keys(this.operations).length &&
              (this.inactivityTimeoutId = setTimeout(function () {
                0 === Object.keys(e.operations).length && e.close();
              }, this.inactivityTimeout));
          }),
          (e.prototype.checkOperationOptions = function (e, t) {
            var n = e.query,
              i = e.variables,
              r = e.operationName;
            if (!n) throw new Error("Must provide a query.");
            if (!t) throw new Error("Must provide an handler.");
            if ((!vd.default(n) && !Cd.getOperationAST(n, r)) || (r && !vd.default(r)) || (i && !gd.default(i)))
              throw new Error(
                "Incorrect option types. query must be a string or a document,`operationName` must be a string, and `variables` must be an object."
              );
          }),
          (e.prototype.buildMessage = function (e, t, i) {
            return {
              id: e,
              type: t,
              payload:
                i && i.query ? n(n({}, i), { query: "string" == typeof i.query ? i.query : Td.print(i.query) }) : i,
            };
          }),
          (e.prototype.formatErrors = function (e) {
            return Array.isArray(e)
              ? e
              : e && e.errors
              ? this.formatErrors(e.errors)
              : e && e.message
              ? [e]
              : [{ name: "FormatedError", message: "Unknown error", originalError: e }];
          }),
          (e.prototype.sendMessage = function (e, t, n) {
            this.sendMessageRaw(this.buildMessage(e, t, n));
          }),
          (e.prototype.sendMessageRaw = function (e) {
            switch (this.status) {
              case this.wsImpl.OPEN:
                var t = JSON.stringify(e);
                try {
                  JSON.parse(t);
                } catch (t) {
                  this.eventEmitter.emit("error", new Error("Message must be JSON-serializable. Got: " + e));
                }
                this.client.send(t);
                break;
              case this.wsImpl.CONNECTING:
                this.unsentMessagesQueue.push(e);
                break;
              default:
                this.reconnecting ||
                  this.eventEmitter.emit(
                    "error",
                    new Error(
                      "A message was not sent because socket is not connected, is closing or is already closed. Message was: " +
                        JSON.stringify(e)
                    )
                  );
            }
          }),
          (e.prototype.generateOperationId = function () {
            return String(++this.nextOperationId);
          }),
          (e.prototype.tryReconnect = function () {
            var e = this;
            if (this.reconnect && !(this.backoff.attempts >= this.reconnectionAttempts)) {
              this.reconnecting ||
                (Object.keys(this.operations).forEach(function (t) {
                  e.unsentMessagesQueue.push(e.buildMessage(t, _d.default.GQL_START, e.operations[t].options));
                }),
                (this.reconnecting = !0)),
                this.clearTryReconnectTimeout();
              var t = this.backoff.duration();
              this.tryReconnectTimeoutId = setTimeout(function () {
                e.connect();
              }, t);
            }
          }),
          (e.prototype.flushUnsentMessagesQueue = function () {
            var e = this;
            this.unsentMessagesQueue.forEach(function (t) {
              e.sendMessageRaw(t);
            }),
              (this.unsentMessagesQueue = []);
          }),
          (e.prototype.checkConnection = function () {
            this.wasKeepAliveReceived ? (this.wasKeepAliveReceived = !1) : this.reconnecting || this.close(!1, !0);
          }),
          (e.prototype.checkMaxConnectTimeout = function () {
            var e = this;
            this.clearMaxConnectTimeout(),
              (this.maxConnectTimeoutId = setTimeout(function () {
                e.status !== e.wsImpl.OPEN && ((e.reconnecting = !0), e.close(!1, !0));
              }, this.maxConnectTimeGenerator.duration()));
          }),
          (e.prototype.connect = function () {
            var e,
              t = this;
            (this.client = new ((e = this.wsImpl).bind.apply(
              e,
              o([void 0, this.url, this.wsProtocols], this.wsOptionArguments)
            ))()),
              this.checkMaxConnectTimeout(),
              (this.client.onopen = function () {
                return i(t, void 0, void 0, function () {
                  var e, t;
                  return r(this, function (n) {
                    switch (n.label) {
                      case 0:
                        if (this.status !== this.wsImpl.OPEN) return [3, 4];
                        this.clearMaxConnectTimeout(),
                          (this.closedByUser = !1),
                          this.eventEmitter.emit(this.reconnecting ? "reconnecting" : "connecting"),
                          (n.label = 1);
                      case 1:
                        return n.trys.push([1, 3, , 4]), [4, this.connectionParams()];
                      case 2:
                        return (
                          (e = n.sent()),
                          this.sendMessage(void 0, _d.default.GQL_CONNECTION_INIT, e),
                          this.flushUnsentMessagesQueue(),
                          [3, 4]
                        );
                      case 3:
                        return (
                          (t = n.sent()),
                          this.sendMessage(void 0, _d.default.GQL_CONNECTION_ERROR, t),
                          this.flushUnsentMessagesQueue(),
                          [3, 4]
                        );
                      case 4:
                        return [2];
                    }
                  });
                });
              }),
              (this.client.onclose = function () {
                t.closedByUser || t.close(!1, !1);
              }),
              (this.client.onerror = function (e) {
                t.eventEmitter.emit("error", e);
              }),
              (this.client.onmessage = function (e) {
                var n = e.data;
                t.processReceivedData(n);
              });
          }),
          (e.prototype.processReceivedData = function (e) {
            var t, i;
            try {
              i = (t = JSON.parse(e)).id;
            } catch (t) {
              throw new Error("Message must be JSON-parseable. Got: " + e);
            }
            if (
              -1 === [_d.default.GQL_DATA, _d.default.GQL_COMPLETE, _d.default.GQL_ERROR].indexOf(t.type) ||
              this.operations[i]
            )
              switch (t.type) {
                case _d.default.GQL_CONNECTION_ERROR:
                  this.connectionCallback && this.connectionCallback(t.payload);
                  break;
                case _d.default.GQL_CONNECTION_ACK:
                  this.eventEmitter.emit(this.reconnecting ? "reconnected" : "connected", t.payload),
                    (this.reconnecting = !1),
                    this.backoff.reset(),
                    this.maxConnectTimeGenerator.reset(),
                    this.connectionCallback && this.connectionCallback();
                  break;
                case _d.default.GQL_COMPLETE:
                  var r = this.operations[i].handler;
                  delete this.operations[i], r.call(this, null, null);
                  break;
                case _d.default.GQL_ERROR:
                  this.operations[i].handler(this.formatErrors(t.payload), null), delete this.operations[i];
                  break;
                case _d.default.GQL_DATA:
                  var o = t.payload.errors
                    ? n(n({}, t.payload), { errors: this.formatErrors(t.payload.errors) })
                    : t.payload;
                  this.operations[i].handler(null, o);
                  break;
                case _d.default.GQL_CONNECTION_KEEP_ALIVE:
                  var s = void 0 === this.wasKeepAliveReceived;
                  (this.wasKeepAliveReceived = !0),
                    s && this.checkConnection(),
                    this.checkConnectionIntervalId &&
                      (clearInterval(this.checkConnectionIntervalId), this.checkConnection()),
                    (this.checkConnectionIntervalId = setInterval(this.checkConnection.bind(this), this.wsTimeout));
                  break;
                default:
                  throw new Error("Invalid message type!");
              }
            else this.unsubscribe(i);
          }),
          (e.prototype.unsubscribe = function (e) {
            this.operations[e] &&
              (delete this.operations[e],
              this.setInactivityTimeout(),
              this.sendMessage(e, _d.default.GQL_STOP, void 0));
          }),
          e
        );
      })();
    t.SubscriptionClient = c;
  }),
  Ad = (function (e) {
    function t(t) {
      var n = e.call(this) || this;
      return (
        t instanceof kd.SubscriptionClient
          ? (n.subscriptionClient = t)
          : (n.subscriptionClient = new kd.SubscriptionClient(t.uri, t.options, t.webSocketImpl)),
        n
      );
    }
    return (
      De(t, e),
      (t.prototype.request = function (e) {
        return this.subscriptionClient.request(e);
      }),
      t
    );
  })(ul);
const Od = { reconnect: !0, reconnectionAttempts: 6, lazy: !0, timeout: 3e4, inactivityTimeout: 15e3 },
  Id = { name: "garlic-bread", version: "0.0.1" },
  Md = rd`
  mutation setPixel($input: ActInput!) {
    act(input: $input) {
      data {
        ... on BasicMessage {
          id
          data {
            ... on GetUserCooldownResponseMessageData {
              nextAvailablePixelTimestamp
            }
            ... on SetPixelResponseMessageData {
              timestamp
            }
          }
        }
      }
    }
  }
`,
  Pd = rd`
  mutation pixelHistory($input: ActInput!) {
    act(input: $input) {
      data {
        ... on BasicMessage {
          id
          data {
            ... on GetTileHistoryResponseMessageData {
              lastModifiedTimestamp
              userInfo {
                userID
                username
              }
            }
          }
        }
      }
    }
  }
`,
  Dd = rd`
  mutation getUserCooldown($input: ActInput!) {
    act(input: $input) {
      data {
        ... on BasicMessage {
          id
          data {
            ... on GetUserCooldownResponseMessageData {
              nextAvailablePixelTimestamp
            }
          }
        }
      }
    }
  }
`,
  Rd = rd`
  mutation setRect($input: ActInput!) {
    act(input: $input) {
      data {
        id
      }
    }
  }
`,
  Nd = rd`
  mutation UserAdminBan($input: ActInput!) {
    act(input: $input) {
      data {
        ... on BasicMessage {
          id
          data {
            ... on UserAdminBanResponseMessageData {
              numUserIDs
            }
          }
        }
      }
    }
  }
`,
  $d = rd`
  subscription configuration($input: SubscribeInput!) {
    subscribe(input: $input) {
      id
      ... on BasicMessage {
        data {
          __typename
          ... on ConfigurationMessageData {
            colorPalette {
              colors {
                hex
                index
              }
            }
            canvasConfigurations {
              index
              dx
              dy
            }
            activeZone {
              topLeft {
                x
                y
              }
              bottomRight {
                x
                y
              }
            }
            canvasWidth
            canvasHeight
            adminConfiguration {
              maxAllowedCircles
              maxUsersPerAdminBan
            }
          }
        }
      }
    }
  }
`,
  Ld = rd`
  subscription replace($input: SubscribeInput!) {
    subscribe(input: $input) {
      id
      ... on BasicMessage {
        data {
          __typename
          ... on FullFrameMessageData {
            __typename
            name
            timestamp
          }
          ... on DiffFrameMessageData {
            __typename
            name
            currentTimestamp
            previousTimestamp
          }
        }
      }
    }
  }
`,
  jd = rd`
  mutation frameHistory($input: ActInput!) {
    act(input: $input) {
      data {
        ... on BasicMessage {
          id
          data {
            ... on GetFrameHistoryResponseMessageData {
              frames {
                canvasIndex
                url
              }
            }
          }
        }
      }
    }
  }
`,
  zd = rd`
  mutation getSubredditsCoordinates($input: ActInput!) {
    act(input: $input) {
      data {
        ... on BasicMessage {
          id
          data {
            ... on GetSubredditsCoordinatesResponseMessageData {
              subredditsCoordinates {
                subredditID
                coordinates {
                  x
                  y
                  z
                }
              }
            }
          }
        }
      }
    }
  }
`,
  Fd = rd`
  mutation getSubredditsForArea($input: ActInput!) {
    act(input: $input) {
      data {
        ... on BasicMessage {
          id
          data {
            ... on GetSubredditsCoordinatesResponseMessageData {
              subredditsCoordinates {
                subredditID
                subredditName
                imageUrl
                coordinates {
                  x
                  y
                  z
                }
              }
            }
          }
        }
      }
    }
  }
`,
  Vd = rd`
  mutation setSubredditCoordinates($input: ActInput!) {
    act(input: $input) {
      data {
        ... on BasicMessage {
          id
        }
      }
    }
  }
`,
  Ud = rd`
  mutation setCirclesArea($input: ActInput!) {
    act(input: $input) {
      data {
        ... on BasicMessage {
          id
        }
      }
    }
  }
`,
  Bd = "You are doing this too often",
  Hd = "Oops, something went wrong";
class qd {
  handleApiError(e) {
    let t;
    return (
      e.networkError
        ? "statusCode" in e.networkError &&
          401 === e.networkError.statusCode &&
          (t = { type: ap.UnauthorizedError, message: e.message })
        : e.graphQLErrors && (t = this.parseGraphQLErrors(e.graphQLErrors)),
      t || (_r(e), { type: ap.GenericError, message: e.message || Hd })
    );
  }
  parseGraphQLErrors(e) {
    for (const t of e) {
      const e = this.parseGraphQLError(t);
      if (e) return e;
    }
  }
  parseGraphQLError(e) {
    var t, n;
    if (null === (t = e.extensions) || void 0 === t ? void 0 : t.nextAvailablePixelTs)
      return { type: ap.PixelRateLimit, message: Bd, nextAvailablePixelTimestamp: e.extensions.nextAvailablePixelTs };
    if ("429: too many requests" === e.message) return { type: ap.SubscribeRateLimit, message: Bd };
    if (e.message) {
      const t = null === (n = e.message) || void 0 === n ? void 0 : n.match(/^ratelimit hit, next available: (\d+)$/),
        i = parseInt((null == t ? void 0 : t[1]) || "0");
      if (isFinite(i) && i > 0) return { type: ap.PixelRateLimit, message: Bd, nextAvailablePixelTimestamp: i };
    }
  }
}
const Qd = async (e, t) =>
  401 === e.status
    ? { type: ap.UnauthorizedError, message: Hd }
    : 200 !== e.status
    ? (_r(`Failed to fetch ${t}: ${e.status} ${e.statusText}`), { type: ap.GenericError, message: Hd })
    : { type: ap.Success, data: await e.json() };
var Gd;
!(function (e) {
  (e[(e.Init = 0)] = "Init"),
    (e[(e.Error = 1)] = "Error"),
    (e[(e.Subscribed = 2)] = "Subscribed"),
    (e[(e.Unsubscribed = 3)] = "Unsubscribed");
})(Gd || (Gd = {}));
class Wd extends qd {
  constructor({ canvasIndex: e, client: t, query: n, variables: i, onMessage: r }) {
    super(),
      (this.state = Gd.Init),
      (this.isRateLimited = !1),
      (this.attempts = 0),
      (this.onSubscribeNext = (e) => {
        var t;
        this.onMessage(null === (t = e.data) || void 0 === t ? void 0 : t.subscribe.data);
      }),
      (this.subscribe = async () => (
        await this.waitIfRateLimited(),
        new Promise((e, t) => {
          const { query: n, variables: i } = this,
            r = this.client.subscribe({ query: n, variables: i }),
            o =
              null == r
                ? void 0
                : r.subscribe(
                    async (t) => {
                      var n;
                      (this.isRateLimited = !1),
                        (this.attempts = 0),
                        this.onMessage(null === (n = t.data) || void 0 === n ? void 0 : n.subscribe.data),
                        e();
                    },
                    async (n) => {
                      _r(
                        `Received an error message for ${this.variables.input.channel.category}:${this.variables.input.channel.tag}`,
                        { err: n }
                      );
                      const i = this.handleApiError(n);
                      if ((this.changeState(Gd.Error), i.type === ap.SubscribeRateLimit)) {
                        this.isRateLimited = !0;
                        try {
                          await this.subscribe(), e();
                        } catch (n) {
                          t(n);
                        }
                      }
                    }
                  );
          (this.subscription = o),
            this.changeState(Gd.Subscribed),
            Sr(`Subscribe to ${this.variables.input.channel.category} (index: ${this.canvasIndex})`);
        })
      )),
      (this.canvasIndex = e),
      (this.client = t),
      (this.query = n),
      (this.variables = { input: { channel: Object.assign({ teamOwner: "GARLICBREAD" }, i) } }),
      (this.onMessage = r),
      window.addEventListener("pagehide", () => {
        this.rateLimitTimeout && clearTimeout(this.rateLimitTimeout);
      });
  }
  changeState(e) {
    this.state !== e && (this.state = e);
  }
  waitIfRateLimited() {
    return this.isRateLimited
      ? this.attempts >= 6
        ? (_r("Rate limited subscription exceeded max allowed attempts"), Promise.reject(new Error(Bd)))
        : new Promise((e) => {
            const t = 1e3 * Math.exp(this.attempts++);
            this.rateLimitTimeout = window.setTimeout(() => {
              (this.rateLimitTimeout = void 0), e();
            }, t);
          })
      : Promise.resolve();
  }
  unsubscribe() {
    var e;
    null === (e = this.subscription) || void 0 === e || e.unsubscribe(),
      this.changeState(Gd.Unsubscribed),
      Sr("Unsubscribe from", this.variables);
  }
}
class Yd {
  constructor(e) {
    (this.visibleCanvasIndexList = []),
      (this.subscriptions = { config: void 0, canvas: new Map() }),
      (this.subscribeToConfigUpdates = async (e) => {
        if ((this.unsubscribeFromConfigUpdates(), !this.client)) return;
        const t = {
          canvasIndex: 0,
          client: this.client,
          query: $d,
          variables: { category: op.Config },
          onMessage: (t) => e(t),
        };
        (this.subscriptions.config = new Wd(t)), await this.subscriptions.config.subscribe();
      }),
      (this.subscribeToCanvasUpdates = async (e, t) => {
        if ((this.unsubscribeFromCanvasUpdates(t.index), !this.client)) return;
        const n = t.index;
        this.createCanvasSubscription(n, e), this.subscribeToVisibleCanvas(n);
      }),
      (this.subscribeToVisibleCanvas = async (e) => {
        var t;
        this.visibleCanvasIndexList.includes(e) &&
          (await (null === (t = this.subscriptions.canvas.get(e)) || void 0 === t ? void 0 : t.subscribe()));
      }),
      (this.toggleVisibleCanvasListSubscription = (e) => {
        this.visibleCanvasIndexList.join() !== e.join() &&
          ((this.visibleCanvasIndexList = e),
          Sr("Visibility changed (resubscribe canvases)", e),
          this.subscriptions.canvas.forEach((t) => {
            const { canvasIndex: n, state: i } = t,
              { Subscribed: r } = Gd,
              o = e.includes(n);
            o && i !== r ? t.subscribe() : o || i !== r || t.unsubscribe();
          }));
      }),
      (this.client = e);
  }
  resetClient(e) {
    this.client = e;
  }
  unsubscribeFromConfigUpdates() {
    var e;
    null === (e = this.subscriptions.config) || void 0 === e || e.unsubscribe(), (this.subscriptions.config = void 0);
  }
  createCanvasSubscription(e, t) {
    const n = {
      canvasIndex: e,
      client: this.client,
      query: Ld,
      variables: { category: op.Canvas, tag: e.toString() },
      onMessage: (n) => t(n, e),
    };
    this.subscriptions.canvas.set(e, new Wd(n));
  }
  unsubscribeFromCanvasUpdates(e) {
    var t;
    void 0 === e
      ? (this.subscriptions.canvas.forEach((e) => e.unsubscribe()), this.subscriptions.canvas.clear())
      : this.subscriptions.canvas.has(e) &&
        (null === (t = this.subscriptions.canvas.get(e)) || void 0 === t || t.unsubscribe());
  }
}
const Zd = "r/replace",
  Xd = `${Zd}:set_pixel`,
  Kd = `${Zd}:get_tile_history`,
  Jd = `${Zd}:get_user_cooldown`,
  ep = `${Zd}:set_rectangle_area`,
  tp = `${Zd}:ban_users`,
  np = `${Zd}:get_subreddits_coordinates`,
  ip = `${Zd}:get_subreddits_for_area`,
  rp = `${Zd}:set_subreddit_coordinates`;
var op, sp, ap;
!(function (e) {
  (e.Config = "CONFIG"), (e.Canvas = "CANVAS");
})(op || (op = {})),
  (function (e) {
    (e.BasicMessage = "BasicMessage"),
      (e.FullFrame = "FullFrameMessageData"),
      (e.DiffFrame = "DiffFrameMessageData"),
      (e.ConfigurationUpdate = "ConfigurationMessageData"),
      (e.FrameHistoryResponseMessage = "GetFrameHistoryResponseMessageData"),
      (e.PixelMessage = "PixelMessageData"),
      (e.SetPixelResponseMessage = "SetPixelResponseMessageData"),
      (e.SetRectangleAreaMessage = "SetRectangleAreaMessageData"),
      (e.GetUserCooldownResponseMessage = "GetUserCooldownResponseMessageData"),
      (e.PixelHistoryResponseMessage = "GetTileHistoryResponseMessageData"),
      (e.UserAdminBan = "UserAdminBanMessageData"),
      (e.UserAdminBanResponseMessage = "UserAdminBanResponseMessageData"),
      (e.GetSubredditsCoordinatesResponseMessage = "GetSubredditsCoordinatesResponseMessageData"),
      (e.GetSubredditsForAreaResponseMessage = "GetSubredditsForAreaResponseMessageData");
  })(sp || (sp = {})),
  (function (e) {
    (e.GenericError = "GenericError"),
      (e.PixelRateLimit = "PixelRateLimitError"),
      (e.Success = "Success"),
      (e.UnauthorizedError = "UnauthorizedError"),
      (e.SubscribeRateLimit = "SubscribeRateLimitError");
  })(ap || (ap = {}));
const cp = new (class extends qd {
    constructor() {
      super(),
        (this.shouldSubscribe = !0),
        (this.connectionCallback = () => {}),
        (this.subscribeToConfigUpdates = async (e) => {
          var t;
          return null === (t = this.subscriptions) || void 0 === t ? void 0 : t.subscribeToConfigUpdates(e);
        }),
        (this.subscribeToCanvasUpdates = async (e, t) => {
          var n;
          return null === (n = this.subscriptions) || void 0 === n ? void 0 : n.subscribeToCanvasUpdates(e, t);
        }),
        window.addEventListener("pagehide", () => {
          this.destroy();
        });
    }
    setShouldSubscribe(e) {
      this.shouldSubscribe = e;
    }
    setConnectionCallback(e) {
      this.connectionCallback = e;
    }
    setAuthHeaders(e) {
      (this.headers = e), this.createClient();
    }
    createReadonlyClient() {
      this.destroy();
      const e = new wl({ uri: `${CLIENT_CONFIG.REALTIME_SERVICE_DOMAIN}/query`, headers: this.headers });
      this.client = new Zh(Object.assign(Object.assign({}, Id), { cache: new Ih(), headers: this.headers, link: e }));
    }
    createClient() {
      this.destroy();
      let e = new wl({ uri: `${CLIENT_CONFIG.REALTIME_SERVICE_DOMAIN}/query`, headers: this.headers });
      if (this.shouldSubscribe) {
        const t = new Ad({
          uri: `${CLIENT_CONFIG.REALTIME_WS_SERVICE_DOMAIN}/query`,
          options: Object.assign(Object.assign({}, Od), {
            connectionParams: this.headers,
            connectionCallback: (e) => {
              var t, n, i;
              Array.isArray(e) && (e = e[0]),
                e
                  ? "401: 401 Unauthorized" === e.message || "request is missing authentication data" === e.message
                    ? null === (n = this.connectionCallback) ||
                      void 0 === n ||
                      n.call(this, { type: ap.UnauthorizedError, message: e.message })
                    : (_r("Failed to establish a websocket connection", e),
                      null === (i = this.connectionCallback) ||
                        void 0 === i ||
                        i.call(this, { type: ap.GenericError, message: e.message }))
                  : null === (t = this.connectionCallback) ||
                    void 0 === t ||
                    t.call(this, { type: ap.Success, data: void 0 });
            },
          }),
        });
        e = hl(
          ({ query: e }) => {
            const t = Ja(e);
            return "OperationDefinition" === t.kind && "subscription" === t.operation;
          },
          t,
          e
        );
      }
      (this.client = new Zh(Object.assign(Object.assign({}, Id), { cache: new Ih(), headers: this.headers, link: e }))),
        this.shouldSubscribe && this.createSubscriptions();
    }
    destroy() {
      var e;
      this.unsubscribeFromConfigUpdates(),
        this.unsubscribeFromCanvasUpdates(),
        null === (e = this.client) || void 0 === e || e.stop(),
        (this.client = void 0);
    }
    createSubscriptions() {
      var e, t;
      this.client &&
        (this.subscriptions &&
          (null === (e = this.subscriptions) || void 0 === e || e.unsubscribeFromConfigUpdates(),
          null === (t = this.subscriptions) || void 0 === t || t.unsubscribeFromCanvasUpdates()),
        (this.subscriptions = new Yd(this.client)));
    }
    async makeRequest(e, t, n) {
      var i;
      try {
        const r = await (null === (i = this.client) || void 0 === i
          ? void 0
          : i.mutate({ mutation: e, variables: { input: t } }));
        if (null == r ? void 0 : r.errors) {
          const e = this.parseGraphQLErrors(r.errors);
          return e || (_r(`Failed to fetch ${t.actionName}`, r.errors[0]), { type: ap.GenericError, message: Hd });
        }
        if (!(null == r ? void 0 : r.data)) return { type: ap.GenericError, message: Hd };
        const o = n(r.data);
        return { type: ap.Success, data: o };
      } catch (e) {
        return this.handleApiError(e);
      }
    }
    async setPixel(e) {
      const t = ur(e);
      return t
        ? this.makeRequest(
            Md,
            {
              actionName: Xd,
              PixelMessageData: { coordinate: { x: t.x, y: t.y }, colorIndex: e.colorIndex, canvasIndex: t.index },
            },
            (e) => {
              let t = {};
              for (const n of e.act.data)
                (n.data.__typename !== sp.SetPixelResponseMessage &&
                  n.data.__typename !== sp.GetUserCooldownResponseMessage) ||
                  (t = Object.assign(Object.assign({}, t), n.data));
              return t;
            }
          )
        : (_r(`Set Pixel: Failed to convert pixel coordinates to canvas coordinates (${"x: " + e.x + ", y: " + e.y})`),
          { type: ap.GenericError, message: Hd });
    }
    async setRect({ topLeftCoordinate: e, bottomRightCoordinate: t, colorIndex: n, canvasIndex: i }) {
      return this.makeRequest(
        Rd,
        {
          actionName: ep,
          SetRectangleAreaMessageData: {
            topLeftCoordinate: e,
            bottomRightCoordinate: t,
            colorIndex: n,
            canvasIndex: i,
          },
        },
        () => {}
      );
    }
    async userAdminBan({ userIDs: e, banDuration: t }) {
      return this.makeRequest(Nd, { actionName: tp, UserAdminBanMessageData: { userIDs: e, banDuration: t } }, (e) => {
        for (const t of e.act.data) if (t.data.__typename === sp.UserAdminBanResponseMessage) return t.data;
      });
    }
    async getPixelHistory(e) {
      const t = ur(e);
      return t
        ? this.makeRequest(
            Pd,
            {
              actionName: Kd,
              PixelMessageData: { coordinate: { x: t.x, y: t.y }, colorIndex: 0, canvasIndex: t.index },
            },
            (e) => {
              for (const t of e.act.data) if (t.data.__typename === sp.PixelHistoryResponseMessage) return t.data;
            }
          )
        : (_r(
            `Get Pixel History: Failed to convert pixel coordinates to canvas coordinates (${
              "x: " + e.x + ", y: " + e.y
            })`
          ),
          { type: ap.GenericError, message: Hd });
    }
    async getUserCooldown() {
      return this.makeRequest(Dd, { actionName: Jd }, (e) => {
        for (const t of e.act.data) if (t.data.__typename === sp.GetUserCooldownResponseMessage) return t.data;
      });
    }
    async fetchUserData() {
      try {
        const e = await fetch("/svc/garlic-bread/get-user-data", {
          method: "GET",
          headers: Object.assign(Object.assign({}, this.headers), { "content-type": "application/json" }),
        });
        return await Qd(e, "user data");
      } catch (e) {
        return _r("Failed to fetch user data", e), { type: ap.GenericError, message: Hd };
      }
    }
    async getFrameHistory(e) {
      return this.makeRequest(
        jd,
        { actionName: "get_frame_history", GetFrameHistoryMessageData: { timestamp: e } },
        (e) => {
          for (const t of e.act.data) if (t.data.__typename === sp.FrameHistoryResponseMessage) return t.data;
        }
      );
    }
    async getSubredditsCoordinates(e) {
      return this.makeRequest(zd, { actionName: np, GetSubredditsCoordinatesMessageData: { subredditIDs: e } }, (e) => {
        for (const t of e.act.data) if (t.data.__typename === sp.GetSubredditsCoordinatesResponseMessage) return t.data;
      });
    }
    async getSubredditsForArea(e, t, n = 5) {
      const i = { topLeftCoordinate: e, bottomRightCoordinate: t, count: n };
      return this.makeRequest(Fd, { actionName: ip, GetSubredditsForAreaMessageData: i }, (e) => {
        for (const t of e.act.data) if (t.data.__typename === sp.GetSubredditsCoordinatesResponseMessage) return t.data;
      });
    }
    async setCirclesArea(e, t) {
      return this.makeRequest(
        Ud,
        { actionName: "r/replace:set_circles_area", SetMultipleCirclesAreaMessageData: { circles: e, colorIndex: t } },
        () => {}
      );
    }
    async setSubredditCoordinates({ subredditID: e, coordinates: t }) {
      return this.makeRequest(
        Vd,
        { actionName: rp, SubredditCoordinatesMessageData: { subredditID: e, coordinates: t } },
        (e) => {
          for (const t of e.act.data) return t.id;
        }
      );
    }
    async fetchModeratedSubreddits() {
      try {
        const e = await fetch("/svc/garlic-bread/get-moderated-subreddits", {
          method: "GET",
          headers: Object.assign(Object.assign({}, this.headers), { "content-type": "application/json" }),
        });
        return await Qd(e, "user data");
      } catch (e) {
        return _r("Failed to fetch moderatedSubreddits data", e), { type: ap.GenericError, message: Hd };
      }
    }
    unsubscribeFromConfigUpdates() {
      var e;
      null === (e = this.subscriptions) || void 0 === e || e.unsubscribeFromConfigUpdates();
    }
    unsubscribeFromCanvasUpdates(e) {
      var t;
      null === (t = this.subscriptions) || void 0 === t || t.unsubscribeFromCanvasUpdates(e);
    }
    toggleVisibleCanvasListSubscription(e) {
      var t;
      null === (t = this.subscriptions) || void 0 === t || t.toggleVisibleCanvasListSubscription(e);
    }
  })(),
  lp = 300,
  up = `${CLIENT_CONFIG.REDDIT_ORIGIN}/u/`,
  hp = "easeOutQuint",
  dp = "easeInQuint",
  pp = ["[blocked user]"];
function fp(e, t, n = Date.now()) {
  return { when: n, where: { x: e, y: t } };
}
let vp = class extends vi(se) {
  constructor() {
    super(),
      (this.hostAppType = Tr.Whatever),
      (this.browserType = Cr.Whatever),
      (this.shouldTrackMouseMove = !1),
      (this.widgets = {}),
      (this.shouldCenterReticle = !1),
      (this.tooltipName = ""),
      (this.cameraBoundaries = { x: 0, y: 0 }),
      (this.cx = 0),
      (this.cy = 0),
      (this.zoom = hn.getState()),
      (this.isDragging = !1),
      (this.isPinching = !1),
      (this.lastMouseDown = fp(-1, -1, -1)),
      (this.firstTouch = fp(-1, -1, -1)),
      (this.lastTouch = fp(-1, -1, -1)),
      (this.movePathDistance = 0),
      (this.pinchEndedTimestamp = -1),
      (this.prevVectorDiff = 0),
      (this.isTileHistoryEnabled = !0),
      (this.isMovingCamera = !1),
      (this.onTouchStart = vn((e) => {
        if (((this.movePathDistance = 0), 1 === e.targetTouches.length)) {
          const t = e.targetTouches.item(0);
          t && ((this.isDragging = !0), (this.firstTouch = this.lastTouch = fp(t.clientX, t.clientY)));
        } else if (2 === e.targetTouches.length) {
          const t = e.targetTouches.item(0),
            n = e.targetTouches.item(1);
          if (!t || !n) return;
          (this.isDragging = !0),
            (this.firstTouch = this.lastTouch = fp((t.clientX + n.clientX) / 2, (t.clientY + n.clientY) / 2));
        }
      })),
      (this.onMouseDown = vn((e) => {
        var t;
        if (
          ((this.movePathDistance = 0),
          0 === e.button && (this.lastMouseDown = fp(e.clientX, e.clientY)),
          null === (t = this.widgetNodes) || void 0 === t ? void 0 : t.length)
        ) {
          const t = Array.from(this.widgetNodes).find((t) => e.composedPath().includes(t));
          if (t) {
            const { key: e } = t.dataset;
            return (this.activeWidget = e), void (this.activeWidgetStartPosition = this.widgets[e || ""]);
          }
        }
        0 === e.button && (this.isDragging = !0);
      })),
      (this.onTouchMove = vn((e) => {
        if (this.camera && e.composedPath().includes(this.camera)) {
          if ((e.preventDefault(), e.stopPropagation(), 1 === e.targetTouches.length && 1 === e.touches.length)) {
            const t = e.targetTouches.item(0);
            if (t) {
              const e = Date.now() - this.pinchEndedTimestamp >= lp;
              if (this.isDragging && e) {
                const e = t.clientX - (this.lastTouch.where.x || this.lastMouseDown.where.x),
                  n = t.clientY - (this.lastTouch.where.y || this.lastMouseDown.where.y);
                (e || n) && (this.moveBy(e, n), (this.movePathDistance += ar(0, 0, e, n))),
                  (this.lastTouch = fp(t.clientX, t.clientY));
              }
            }
          }
          if (2 === e.targetTouches.length || 2 === e.touches.length) {
            let t = e.targetTouches[0],
              n = e.targetTouches[1];
            if ((e.targetTouches.length < e.touches.length && ((t = e.touches[0]), (n = e.touches[1])), t && n)) {
              const e = ar(t.clientX, t.clientY, n.clientX, n.clientY),
                i = (t.clientX + n.clientX) / 2,
                r = (t.clientY + n.clientY) / 2;
              if (this.prevVectorDiff && this.prevVectorDiff !== e) {
                this.isPinching = !0;
                const t = (e - this.prevVectorDiff) / this.zoomMultiplier;
                this.zoomAt(t, { x: i, y: r });
              }
              if (this.isDragging) {
                const e = i - (this.lastTouch.where.x || this.lastMouseDown.where.x),
                  t = r - (this.lastTouch.where.y || this.lastMouseDown.where.y);
                (e || t) && (this.moveBy(e, t), (this.movePathDistance += ar(0, 0, e, t))), (this.lastTouch = fp(i, r));
              }
              this.prevVectorDiff = e;
            }
          }
        }
      })),
      (this.onMouseMove = vn((e) => {
        this.camera &&
          e.composedPath().includes(this.camera) &&
          (e.preventDefault(),
          e.stopPropagation(),
          (this.activeWidget || this.shouldTrackMouseMove) && this.trackEraseToolThrottled(e),
          this.isDragging &&
            "number" == typeof e.movementX &&
            "number" == typeof e.movementY &&
            (e.movementX || e.movementY) &&
            (this.moveBy(e.movementX, e.movementY), (this.movePathDistance += ar(0, 0, e.movementX, e.movementY))));
      })),
      (this.trackEraseTool = vn((e) => {
        let t;
        if (this.activeWidget && this.activeWidgetStartPosition && 0 === e.button && this.lastMouseDown) {
          const n = e.clientX - this.lastMouseDown.where.x,
            i = e.clientY - this.lastMouseDown.where.y,
            r = Math.floor(n / this.zoom),
            o = Math.floor(i / this.zoom);
          t = { x: this.activeWidgetStartPosition.x + r, y: this.activeWidgetStartPosition.y + o };
        } else t = this.clientToCanvas(e);
        t &&
          this.dispatchEvent(
            Ye(
              "hover-canvas",
              Object.assign(Object.assign({}, this.ensureSafeCoordinates(t)), { pixelId: this.activeWidget })
            )
          );
      })),
      (this.trackEraseToolThrottled = Qi(50, !1, this.trackEraseTool)),
      (this.onTouchStop = vn(() => {
        (this.isDragging = !1),
          (this.prevVectorDiff = 0),
          this.isPinching && ((this.isPinching = !1), (this.pinchEndedTimestamp = Date.now()));
      })),
      (this.onMouseUp = vn((e) => {
        if (((this.isDragging = !1), !this.camera || !e.composedPath().includes(this.camera) || 0 !== e.button)) return;
        if (this.activeWidget) return (this.activeWidget = void 0), void (this.activeWidgetStartPosition = void 0);
        if (this.firstTouch.when > 0) {
          const { where: t, when: n } = this.firstTouch;
          if (ar(t.x, t.y, e.clientX, e.clientY) >= 5 || Date.now() - n >= lp) return;
        } else if (this.lastMouseDown.when > 0) {
          const { where: t, when: n } = this.lastMouseDown;
          if (ar(t.x, t.y, e.clientX, e.clientY) >= 5 || Date.now() - n >= lp) return;
        }
        if (this.movePathDistance >= 5 || Date.now() - this.pinchEndedTimestamp < lp) return;
        const t = this.clientToCanvas(e);
        t && !hr(t) && ((this.lastMouseDown = this.firstTouch = this.lastTouch = fp(-1, -1, -1)), this.selectPixel(t));
      })),
      (this.fetchPixelHistoryDebounced = Gi(50, this.fetchPixelHistory)),
      (this.onWheel = vn((e) => {
        e.preventDefault(), e.stopPropagation();
        const t = -e.deltaY / this.zoomMultiplier,
          n = this.clientToCamera({ x: e.clientX, y: e.clientY });
        this.zoomAt(t, n);
      })),
      (this.onCameraResize = () => {
        this.updateCameraDimensions(),
          (this.shouldCenterReticle && this.isMovingCamera) ||
            (this.applyPosition({ x: this.cx, y: this.cy, zoom: this.zoom }),
            this.animateScheduledPositionDebounced({}));
      }),
      (this.animatePositionDebounced = Qi(300, !1, this.animatePosition)),
      (this.animateScheduledPositionDebounced = Gi(50, !1, this.animateScheduledPosition)),
      Cn(this, gn),
      Cn(this, yn),
      Cn(this, xn),
      Cn(this, pn);
  }
  static get styles() {
    return o`
      :host {
        box-sizing: border-box;
        display: block;
        flex: 1 1 0%;
        width: 100%;
      }

      .camera {
        display: block;
        height: 100%;
        overflow: hidden;
        position: relative;
        width: 100%;
        -webkit-touch-callout: none !important;
        -webkit-user-select: none !important;
      }

      .position-container {
        position: absolute;
        pointer-events: none;
      }

      .zoom-container {
        position: relative;
        transform-origin: top left;
      }

      .edge {
        pointer-events: none;
        position: absolute;
        top: -147px;
        left: -109px;
        transform: rotate(3.21deg);
        user-select: none;
      }

      .frame {
        position: absolute;
        background-color: #fff;
        box-shadow: 0 0 0 6px #505050, 0 0 0 3px rgba(67, 59, 59, 0.3) inset;
      }

      .pixel {
        position: absolute;
        left: 0;
        top: 0;
        height: ${Xt().max}px;
        width: ${Xt().max}px;
      }

      .user-prefix {
        letter-spacing: 1px;
      }

      .profile-button {
        font-family: var(--garlic-bread-font-pixel);
        font-size: 14px;
        line-height: 20px;
        font-weight: 600;
        background: none;
        color: #000;
        border: 0;
        outline: 0;
        padding: 5px 13px;
        cursor: pointer;
        pointer-events: all;
        margin: -5px -13px;
      }
    `;
  }
  get left() {
    return this.cx - this.cameraBoundaries.x / this.zoom;
  }
  get top() {
    return this.cy - this.cameraBoundaries.y / this.zoom;
  }
  get zoomMultiplier() {
    return (3 * Zt.Max) / this.zoom;
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(),
      document.removeEventListener("mousemove", this.onMouseMove),
      document.removeEventListener("mouseup", this.onMouseUp),
      document.removeEventListener("touchmove", this.onTouchMove),
      this.camera && (null === (e = this.resizeObserver) || void 0 === e || e.unobserve(this.camera));
  }
  initialize(e = !0) {
    var t, n, i, r;
    if (
      ((this.cx = cn.getState()),
      (this.nextCx = void 0),
      (this.cy = ln.getState()),
      (this.nextCy = void 0),
      (this.nextZoom = void 0),
      (this.isDragging = !1),
      (this.isPinching = !1),
      (this.lastMouseDown = fp(-1, -1, -1)),
      (this.firstTouch = fp(-1, -1, -1)),
      (this.lastTouch = fp(-1, -1, -1)),
      (this.movePathDistance = 0),
      (this.pinchEndedTimestamp = -1),
      (this.lastFetchedHistoryPixel = void 0),
      (this.prevVectorDiff = 0),
      null === (t = this.cameraAnimation) || void 0 === t || t.pause(),
      null === (n = this.showTooltipAnimation) || void 0 === n || n.pause(),
      (this.tooltipName = ""),
      e)
    ) {
      const e = this.calculateZoomFromPx();
      e && ((this.zoom = e), hn.updateState(this.zoom));
    }
    this.updateCameraDimensions(),
      this.updateCameraBoundaries(),
      this.applyPosition(),
      document.removeEventListener("mousemove", this.onMouseMove),
      document.addEventListener("mousemove", this.onMouseMove),
      document.removeEventListener("mouseup", this.onMouseUp),
      document.addEventListener("mouseup", this.onMouseUp),
      document.removeEventListener("touchcancel", this.onTouchStop),
      document.addEventListener("touchcancel", this.onTouchStop),
      document.removeEventListener("touchend", this.onTouchStop),
      document.addEventListener("touchend", this.onTouchStop),
      document.removeEventListener("touchmove", this.onTouchMove),
      document.addEventListener("touchmove", this.onTouchMove),
      this.camera &&
        (null === (i = this.resizeObserver) || void 0 === i || i.unobserve(this.camera),
        (this.resizeObserver = new ResizeObserver(this.onCameraResize)),
        null === (r = this.resizeObserver) || void 0 === r || r.observe(this.camera)),
      Kt.getState().camera || Kt.updateState(Object.assign(Object.assign({}, Kt.getState()), { camera: !0 }));
  }
  clientToCamera(e) {
    var t;
    if (!e) return;
    const n = null === (t = this.camera) || void 0 === t ? void 0 : t.getBoundingClientRect();
    return n ? { x: e.x - n.left, y: e.y - n.top } : void 0;
  }
  cameraToCanvas(e) {
    if (e) return { x: Math.floor(this.left + e.x / this.zoom), y: Math.floor(this.top + e.y / this.zoom) };
  }
  canvasToCamera(e) {
    if (e) return { x: Math.floor((e.x - this.left) * this.zoom), y: Math.floor((e.y - this.top) * this.zoom) };
  }
  clientToCanvas(e) {
    const t = { x: e.clientX, y: e.clientY },
      n = this.clientToCamera(t);
    return this.cameraToCanvas(n);
  }
  movePointBy(e, t) {
    const n = (1 / this.zoom) * Zt.Min;
    return { x: e.x - t.x * n, y: e.y - t.y * n };
  }
  moveBy(e, t) {
    (this.nextCx = void 0),
      (this.nextCy = void 0),
      (this.nextZoom = void 0),
      this.applyPosition(this.movePointBy({ x: this.cx, y: this.cy }, { x: e, y: t }));
  }
  selectPixel(e) {
    hn.updateState(this.zoom);
    const t = Ye("click-canvas", e);
    this.dispatchEvent(t);
  }
  getTooltipOverride({ x: e, y: t }, n) {
    var i;
    const r = wn.getState();
    if ((null == r ? void 0 : r.x) === e && (null == r ? void 0 : r.y) === t) {
      if (n && n > r.timestamp) return;
      return null === (i = rn.getState()) || void 0 === i ? void 0 : i.name;
    }
  }
  async fetchPixelHistory(e) {
    if (
      ((this.lastFetchedHistoryPixel = e),
      (this.tooltipName = ""),
      !this.showPixelHistory || !this.isTileHistoryEnabled || !tn.getState())
    )
      return;
    const t = vr(e),
      n = { x: t.x, y: t.y },
      i = await cp.getPixelHistory(n),
      r = or();
    if (e.x === r.x && e.y === r.y)
      if (i.type === ap.Success) {
        const { data: t } = i;
        t && Number.isInteger(t.lastModifiedTimestamp)
          ? (this.tooltipName = this.getTooltipOverride(e, t.lastModifiedTimestamp) || t.userInfo.username)
          : (this.tooltipName = this.getTooltipOverride(e) || ""),
          this.showTooltip();
      } else i.type === ap.UnauthorizedError && this.dispatchEvent(Ye("api-error", i));
  }
  zoomAt(e, t) {
    var n;
    null === (n = this.cameraAnimation) || void 0 === n || n.pause();
    const i = Xt(),
      r = Math.max(Math.min(this.zoom + e, i.max), i.min);
    if (t && this.cameraRect) {
      const e = {
          x: (this.cameraRect.left + this.cameraRect.right) / 2,
          y: (this.cameraRect.top + this.cameraRect.bottom) / 2,
        },
        n = { x: e.x - t.x, y: e.y - t.y };
      (this.isTileHistoryEnabled = !1),
        this.moveBy(n.x, n.y),
        this.applyPosition({ zoom: r }),
        (this.isTileHistoryEnabled = !0),
        this.moveBy(-n.x, -n.y);
    }
    hn.updateState(r);
  }
  calculateZoomFromPx() {
    if (!un.getState()) return;
    if ((this.updateCameraDimensions(), !this.cameraRect)) return;
    const e = 2 * un.getState() + 1,
      t = Math.floor(this.cameraRect.width / e),
      n = Math.floor(this.cameraRect.height / e),
      i = Math.min(t, n),
      r = Xt();
    return Math.max(Zt.Min, Math.min(r.max, i));
  }
  jumpTo(e, t) {
    this.schedulePosition(Object.assign(Object.assign({}, e), { zoom: t }));
  }
  moveTo(e, t) {
    this.animatePositionDebounced(Object.assign(Object.assign({}, e), { zoom: t }));
  }
  zoomIn(e) {
    var t;
    Math.abs(this.zoom - e) > 1
      ? this.animatePosition({ zoom: e, zoomEasing: hp })
      : (null === (t = this.cameraAnimation) || void 0 === t || t.pause(),
        (this.nextZoom = void 0),
        this.applyPosition({ zoom: e }));
  }
  refreshTooltip() {
    this.fetchPixelHistory(rr({ x: this.cx, y: this.cy }));
  }
  getRandomCenter() {
    var e, t;
    this.updateCameraDimensions(), this.updateCameraBoundaries();
    const n = this.calculateZoomFromPx() || this.zoom,
      i = { x: this.cameraBoundaries.x / n, y: this.cameraBoundaries.y / n },
      r = (null === (e = this.cameraRect) || void 0 === e ? void 0 : e.width) || 0,
      o = (null === (t = this.cameraRect) || void 0 === t ? void 0 : t.height) || 0,
      s = yn.getState(),
      a = gn.getState(),
      c = { x: Math.random() * s, y: Math.random() * a };
    return {
      x: r >= s * n ? s / 2 : Math.min(Math.max(Math.ceil(i.x), c.x), Math.floor(s - i.x)),
      y: o >= a * n ? a / 2 : Math.min(Math.max(Math.ceil(i.y), c.y), Math.floor(a - i.y)),
    };
  }
  renderCurrentPosition() {
    var e, t;
    if (this.zoomContainer) {
      const e = this.zoom / Xt().max;
      this.browserType === Cr.Safari || this.hostAppType === Tr.IOS
        ? (this.zoomContainer.style.zoom = e)
        : (this.zoomContainer.style.transform = `scale(${e})`);
    }
    if (this.positionContainer) {
      const e = -(this.cx * this.zoom - this.cameraBoundaries.x) + "px",
        t = -(this.cy * this.zoom - this.cameraBoundaries.y) + "px";
      this.positionContainer.style.transform = `translateX(${e}) translateY(${t})`;
    }
    if (this.pixel) {
      const n = xn.getState(),
        i = n.length ? rr({ x: n[0].x, y: n[0].y }) : rr({ x: this.cx, y: this.cy }),
        r = Xt(),
        o = i.x * r.max,
        s = i.y * r.max;
      (this.pixel.style.transform = `translateX(${o}px) translateY(${s}px)`),
        this.showPixelHistory &&
          this.isTileHistoryEnabled &&
          ((null === (e = this.lastFetchedHistoryPixel) || void 0 === e ? void 0 : e.x) !== i.x ||
            (null === (t = this.lastFetchedHistoryPixel) || void 0 === t ? void 0 : t.y) !== i.y) &&
          ((this.tooltipName = ""), tn.getState() && hn.getState() >= Zt.Optimal && this.fetchPixelHistoryDebounced(i));
    }
  }
  ensureSafeCoordinates(e) {
    return { x: Math.max(0, Math.min(e.x, yn.getState() - 1)), y: Math.max(0, Math.min(e.y, gn.getState() - 1)) };
  }
  applyPosition({ x: e = this.cx, y: t = this.cy, zoom: n = this.zoom } = {}) {
    const i = Xt();
    (this.zoom = Math.max(i.min, Math.min(n, i.max))), this.updateCameraBoundaries(), this.updateVisiblePixels();
    const r = this.ensureSafeCoordinates({ x: e, y: t });
    (this.cx = r.x), (this.cy = r.y), this.renderCurrentPosition(), this.sendMoveCameraEvent();
  }
  schedulePosition({ x: e = this.cx, y: t = this.cy, zoom: n = this.zoom } = {}) {
    (this.nextCx = Math.max(0, Math.min(e, yn.getState() - 1))),
      (this.nextCy = Math.max(0, Math.min(t, gn.getState() - 1)));
    const i = Xt();
    this.nextZoom = Math.max(i.min, Math.min(n, i.max));
  }
  animatePosition({ x: e = this.cx, y: t = this.cy, zoom: n = this.zoom, zoomEasing: i = dp } = {}) {
    var r;
    null === (r = this.cameraAnimation) || void 0 === r || r.pause(),
      tn.getState()
        ? (this.schedulePosition({ x: e, y: t, zoom: n }), this.animateScheduledPosition({ zoomEasing: i }))
        : this.applyPosition({ x: e, y: t, zoom: n });
  }
  async animateScheduledPosition({ zoomEasing: e = dp }) {
    const t = { x: this.cx, y: this.cy },
      n = { zoom: this.zoom };
    this.shouldCenterReticle && (this.isMovingCamera = !0),
      (this.cameraAnimation = $o
        .timeline({
          delay: 0,
          update: () => {
            this.applyPosition(Object.assign(Object.assign({}, t), n));
          },
          complete: () => {
            (this.nextCx = void 0), (this.nextCy = void 0), (this.nextZoom = void 0);
          },
        })
        .add({ targets: t, x: this.nextCx, y: this.nextCy, easing: hp }, 0)
        .add({ targets: n, zoom: this.nextZoom, easing: e }, 0)),
      await this.cameraAnimation.finished,
      (this.isMovingCamera = !1);
  }
  updateCameraDimensions() {
    this.camera && (this.cameraRect = this.camera.getBoundingClientRect());
  }
  updateCameraBoundaries() {
    if (this.cameraRect) {
      const e = (this.cameraRect.width - this.zoom) / 2,
        t = (this.cameraRect.height - this.zoom) / 2;
      this.cameraBoundaries = { x: e, y: t };
    }
  }
  updateVisiblePixels() {
    if (this.cameraBoundaries) {
      const e = Math.min(
        Math.floor(this.cameraBoundaries.x / this.zoom),
        Math.floor(this.cameraBoundaries.y / this.zoom)
      );
      this.dispatchEvent(Ye("update-visible-pixels", { px: e }));
    }
  }
  sendMoveCameraEvent() {
    this.cameraRect && this.dispatchEvent(Ye("move-camera", { x: this.cx, y: this.cy }));
  }
  getVisibilityRect() {
    if (!this.cameraRect) return;
    const { width: e, height: t } = this.cameraRect;
    return (function (e, t, n, i, r) {
      const o = rr({ x: Math.floor(e), y: Math.floor(t) }),
        s = rr({ x: Math.ceil(e + n / r), y: Math.ceil(t + i / r) });
      return { x1: o.x, y1: o.y, x2: s.x, y2: s.y };
    })(this.left, this.top, e, t, this.zoom);
  }
  showTooltip(e = !0) {
    var t;
    null === (t = this.showTooltipAnimation) || void 0 === t || t.pause();
    const n = { opacity: 0 };
    this.showTooltipAnimation = $o({
      targets: n,
      duration: 50,
      opacity: 1,
      easing: e ? "easeInOutQuad" : "steps(1)",
      update: () => {
        this.tooltip && (this.tooltip.style.opacity = `${n.opacity}`);
      },
    });
  }
  renderFrame() {
    const e = gn.getState(),
      t = yn.getState();
    if (!e || !t) return "";
    const n = Xt();
    return j`
      <faceplate-img
        class="edge"
        src="${CLIENT_CONFIG.STATIC_BASE_URL}assets/img/snoo-edge.png"
        height="226"
        width="290"
      ></faceplate-img>
      <div
        class="frame"
        style=${Te({ height: e * n.max + "px", width: t * n.max + "px" })}
      ></div>
    `;
  }
  onProfileNameMouseDown(e) {
    e.stopPropagation(),
      pp.includes(this.tooltipName) ||
        (this.trackEvent(li({ source: ui.GarlicBread, action: hi.Click, noun: di.Username })),
        this.hostAppType === Tr.WebDesktop
          ? null == ri || ri.navigateToDeeplink({ link: `${up}${this.tooltipName}` })
          : null == ri || ri.openProfile({ profileName: this.tooltipName }));
  }
  onProfileNameMouseUp(e) {
    e.stopPropagation(), (this.tooltipName = "");
  }
  render() {
    const e = Xt();
    return j`
      <div
        class="camera"
        @wheel=${this.onWheel}
        @mousedown=${this.onMouseDown}
        @touchstart=${this.onTouchStart}
      >
        <div class="position-container">
          <div class="zoom-container">
            ${this.renderFrame()}
            <slot></slot>
            ${Object.values(this.widgets).map(
              (t) => j`
                <div
                  data-key=${t.id}
                  class="pixel widget"
                  style=${Te({ left: t.x * e.max + "px", top: t.y * e.max + "px" })}
                >
                  <slot name="pixel-${t.id}"></slot>
                </div>
              `
            )}
            <garlic-bread-community-pins-container></garlic-bread-community-pins-container>
            <div class="pixel center">
              ${
                this.showPixelHistory && 0 === pn.getState().length
                  ? j`
                    <garlic-bread-tooltip
                      name="pixel-history-tooltip"
                      ?isOpen=${this.tooltipName.length > 0}
                    >
                      <button
                        class="profile-button"
                        @mousedown=${this.onProfileNameMouseDown}
                        @mouseup=${this.onProfileNameMouseUp}
                      >
                        <span class="user-prefix">u/</span>${this.tooltipName}
                      </button>
                    </garlic-bread-tooltip>
                  `
                  : ""
              }
              <slot name="pixel"> </slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
var mp;
$e([er({ context: Fo })], vp.prototype, "hostAppType", void 0),
  $e([er({ context: Vo })], vp.prototype, "browserType", void 0),
  $e([Ue({ type: Boolean, attribute: "track-mousemove" })], vp.prototype, "shouldTrackMouseMove", void 0),
  $e([Ue({ type: Object })], vp.prototype, "widgets", void 0),
  $e([Ue({ type: Boolean, attribute: "show-pixel-history" })], vp.prototype, "showPixelHistory", void 0),
  $e([Ue({ type: Boolean, attribute: "should-center-reticle" })], vp.prototype, "shouldCenterReticle", void 0),
  $e([Be()], vp.prototype, "tooltipName", void 0),
  $e(
    [
      (function (e) {
        return He({
          descriptor: (t) => ({
            get() {
              var t, n;
              return null !== (n = null === (t = this.renderRoot) || void 0 === t ? void 0 : t.querySelectorAll(e)) &&
                void 0 !== n
                ? n
                : [];
            },
            enumerable: !0,
            configurable: !0,
          }),
        });
      })(".widget"),
    ],
    vp.prototype,
    "widgetNodes",
    void 0
  ),
  $e([qe(".camera")], vp.prototype, "camera", void 0),
  $e([qe(".zoom-container")], vp.prototype, "zoomContainer", void 0),
  $e([qe(".position-container")], vp.prototype, "positionContainer", void 0),
  $e([qe(".pixel.center")], vp.prototype, "pixel", void 0),
  $e([qe("garlic-bread-tooltip")], vp.prototype, "tooltip", void 0),
  (vp = $e([Fe("garlic-bread-camera")], vp)),
  (function (e) {
    (e.FIRST_CONTENTFUL_PAINT = "first-contentful-paint"), (e.FIRST_MEANINGFUL_PAINT = "first-meaningful-paint");
  })(mp || (mp = {}));
Ir(
  "icon-refresh",
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><g clip-path="url(#clip0_457_91)"><path d="M16.75 11.5A7.25 7.25 0 119.5 4.25h4.069L11.31 6.133l.8.96 3.59-2.988a.626.626 0 000-.96L12.109.157l-.8.96L13.569 3H9.5a8.5 8.5 0 108.5 8.5h-1.25z"/></g><defs><clipPath id="clip0_457_91"><path d="M0 0h20v20H0z"/></clipPath></defs></svg>'
  )}`,
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><g clip-path="url(#clip0_457_79)"><path d="M16 11.5A6.5 6.5 0 119.5 5H11v1.914a1 1 0 001.665.747l3.318-2.951a1 1 0 000-1.495L12.665.265A1 1 0 0011 1.012V3H9.5a8.5 8.5 0 108.5 8.5h-2zm-2.214-7.512v-.05l.028.025-.028.025z"/></g><defs><clipPath id="clip0_457_79"><path d="M0 0h20v20H0z"/></clipPath></defs></svg>'
  )}`
);
Ir(
  "icon-settings",
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><g clip-path="url(#clip0_473_79)"><path d="M10 20c-.401 0-.802-.027-1.2-.079a1.145 1.145 0 01-.992-1.137v-1.073a.97.97 0 00-.627-.878A.98.98 0 006.1 17l-.755.753a1.149 1.149 0 01-1.521.1 10.16 10.16 0 01-1.671-1.671 1.149 1.149 0 01.1-1.523L3 13.906a.97.97 0 00.176-1.069.98.98 0 00-.887-.649H1.216A1.145 1.145 0 01.079 11.2a9.1 9.1 0 010-2.393 1.145 1.145 0 011.137-.992h1.073a.97.97 0 00.878-.627A.979.979 0 003 6.1l-.754-.754a1.15 1.15 0 01-.1-1.522 10.16 10.16 0 011.673-1.676 1.155 1.155 0 011.522.1L6.1 3a.966.966 0 001.068.176.98.98 0 00.649-.887V1.216A1.145 1.145 0 018.8.079a9.129 9.129 0 012.393 0 1.144 1.144 0 01.991 1.137v1.073a.971.971 0 00.628.878A.977.977 0 0013.905 3l.754-.754a1.152 1.152 0 011.522-.1c.62.49 1.18 1.05 1.671 1.671a1.15 1.15 0 01-.1 1.522L17 6.1a.967.967 0 00-.176 1.068.98.98 0 00.887.649h1.073a1.145 1.145 0 011.137.991 9.096 9.096 0 010 2.392 1.145 1.145 0 01-1.137.992h-1.073A1.041 1.041 0 0017 13.905l.753.755a1.149 1.149 0 01.1 1.521c-.49.62-1.05 1.18-1.671 1.671a1.149 1.149 0 01-1.522-.1L13.906 17a.97.97 0 00-1.069-.176.981.981 0 00-.65.887v1.073a1.144 1.144 0 01-.99 1.137A9.431 9.431 0 0110 20zm-.938-1.307a7.638 7.638 0 001.875 0v-.982a2.292 2.292 0 013.853-1.6l.693.694a8.796 8.796 0 001.326-1.326l-.694-.694a2.29 2.29 0 011.6-3.851h.982a7.746 7.746 0 000-1.876h-.982a2.213 2.213 0 01-2.034-1.4 2.223 2.223 0 01.438-2.451l.694-.693a8.76 8.76 0 00-1.327-1.326l-.692.694a2.219 2.219 0 01-2.434.445 2.221 2.221 0 01-1.419-2.041v-.979a7.638 7.638 0 00-1.875 0v.982a2.213 2.213 0 01-1.4 2.034 2.23 2.23 0 01-2.456-.438l-.693-.694a8.757 8.757 0 00-1.326 1.327l.694.692a2.216 2.216 0 01.445 2.434 2.22 2.22 0 01-2.041 1.418h-.982a7.746 7.746 0 000 1.876h.982a2.213 2.213 0 012.034 1.4 2.223 2.223 0 01-.438 2.451l-.694.693c.394.488.838.933 1.326 1.326l.694-.694a2.218 2.218 0 012.433-.445 2.22 2.22 0 011.418 2.041v.983zM10 13.229a3.23 3.23 0 110-6.458 3.23 3.23 0 010 6.458zm0-5.208a1.979 1.979 0 100 3.958 1.979 1.979 0 000-3.958z"/></g><defs><clipPath id="clip0_473_79"><path d="M0 0h20v20H0z"/></clipPath></defs></svg>'
  )}`,
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><g clip-path="url(#clip0_473_76)"><path d="M19.921 8.8a1.145 1.145 0 00-1.137-.991h-1.073a.98.98 0 01-.887-.649A.969.969 0 0117 6.1l.754-.754a1.15 1.15 0 00.1-1.522 10.16 10.16 0 00-1.671-1.671 1.152 1.152 0 00-1.522.1L13.905 3a.975.975 0 01-1.09.167.97.97 0 01-.628-.878V1.216A1.144 1.144 0 0011.2.079a9.129 9.129 0 00-2.4 0 1.145 1.145 0 00-.991 1.137v1.073a.98.98 0 01-.649.887A.966.966 0 016.1 3l-.754-.754a1.152 1.152 0 00-1.522-.1 10.16 10.16 0 00-1.676 1.673 1.15 1.15 0 00.1 1.522L3 6.1a.979.979 0 01.167 1.09.97.97 0 01-.878.627H1.216A1.145 1.145 0 00.079 8.8a9.1 9.1 0 000 2.393 1.145 1.145 0 001.137.991h1.073a.98.98 0 01.887.649A.97.97 0 013 13.906l-.751.752a1.149 1.149 0 00-.1 1.523c.49.62 1.05 1.18 1.671 1.671a1.148 1.148 0 001.521-.1L6.1 17a.98.98 0 011.09-.167.97.97 0 01.627.878v1.073a1.145 1.145 0 00.983 1.137 9.103 9.103 0 002.393 0 1.144 1.144 0 00.99-1.137v-1.073a.981.981 0 01.65-.887.968.968 0 011.073.176l.753.753a1.149 1.149 0 001.522.1c.62-.49 1.18-1.05 1.671-1.671a1.149 1.149 0 00-.1-1.521L17 13.905a1.04 1.04 0 01.711-1.717h1.073a1.145 1.145 0 001.137-.992 9.096 9.096 0 000-2.392V8.8zM11.979 10a1.98 1.98 0 11-3.958 0 1.98 1.98 0 013.958 0z"/></g><defs><clipPath id="clip0_473_76"><path d="M0 0h20v20H0z"/></clipPath></defs></svg>'
  )}`
);
let gp = class extends se {
  static get styles() {
    return o`img{width:min(128px,70vw,70vh)}`;
  }
  render() {
    return j` <img alt="Loader icon" src="${CLIENT_CONFIG.STATIC_BASE_URL}assets/img/loader.gif"> `;
  }
};
gp = $e([Fe("garlic-bread-loader")], gp);
var yp;
!(function (e) {
  (e.Auth = "auth"), (e.GameOver = "gameOver"), (e.Init = "init"), (e.Sync = "sync");
})(yp || (yp = {}));
let bp = class extends se {
  static get styles() {
    return $t(
      ":host {\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.3s ease-out;\n  background-color: white;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #000;\n}\n:host([type]) {\n  opacity: 1;\n  pointer-events: all;\n  z-index: 1;\n}\nh3 {\n  text-align: center;\n}\n.reload {\n  display: flex;\n  align-items: center;\n}\ngarlic-bread-icon-button {\n  display: inline-block;\n  margin: 0 10px 0 2px;\n}\nicon-refresh {\n  display: inline-flex;\n  font-size: 18px;\n}\n.gears {\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  justify-content: center;\n}\nicon-settings {\n  display: inline-flex;\n  font-size: 64px;\n  animation: rotate 1s 0s infinite both;\n}\n.second-gear {\n  margin-left: -8px;\n  transform: rotate(22.5deg) scaleX(-1);\n}\n@keyframes rotate {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n"
    );
  }
  reload() {
    const e = new URL(location.href);
    tn.getState() ? e.searchParams.set(jt.FullScreen, "") : e.searchParams.delete(jt.FullScreen),
      (location.href = e.toString());
  }
  render() {
    return this.type === yp.GameOver
      ? j` <div> <h3> Oops, something went wrong. </h3> <div class="reload"> Press <garlic-bread-icon-button @click="${this.reload}"><icon-refresh fill></icon-refresh></garlic-bread-icon-button> to reload the page. </div> </div> `
      : this.type === yp.Init || this.type === yp.Auth
      ? j`<garlic-bread-loader></garlic-bread-loader>`
      : this.type === yp.Sync
      ? j` <div> <h1> Sychronizing configuration </h1> <div class="gears"> <icon-settings fill></icon-settings> <div class="second-gear"><icon-settings></icon-settings></div> </div> </div> `
      : "";
  }
};
$e([Ue({ type: String })], bp.prototype, "type", void 0), (bp = $e([Fe("garlic-bread-overlay")], bp));
const xp = Symbol("show-canvas-history");
var wp;
!(function (e) {
  (e.CLOSE_PALLETTE = "close-pallette"),
    (e.COOLDOWN_END = "cooldown-end"),
    (e.COOLDOWN_START = "cooldown-start"),
    (e.HIGHLIGHT = "highlight"),
    (e.INVALID = "invalid"),
    (e.SELECT_COLOR = "select-color");
})(wp || (wp = {}));
const Sp = Object.keys(wp).length,
  _p = (e) => (t) => {
    Object.values(e).forEach((e) => {
      e.muted = t;
    });
  },
  Tp = (() => {
    const e = {};
    return (
      Object.values(wp).forEach((t) => {
        const n = new Audio();
        (n.src = `${CLIENT_CONFIG.MEDIA_STORAGE_BASE_URL}interactions/${t}.mp3`),
          (n.loop = !1),
          (n.controls = !0),
          (n.muted = !0),
          (e[t] = n);
      }),
      e
    );
  })();
function Cp(e) {
  return !!CLIENT_CONFIG.REDDIT_DOMAINS.find((t) => e.endsWith(t));
}
function Ep(e) {
  return new Promise((t, n) => {
    const i = document.createElement("img");
    (i.crossOrigin = "anonymous"), (i.onerror = n), (i.onload = () => t(i)), (i.src = e);
  });
}
var kp;
!(function (e) {
  (e.None = "none"),
    (e.Settings = "settings"),
    (e.HowTo = "how-to"),
    (e.CanvasHistory = "canvas-history"),
    (e.CommunityPin = "community-pin");
})(kp || (kp = {}));
var Ap;
!(function (e) {
  (e.Active = "Active"), (e.Idle = "Idle"), (e.Hidden = "Hidden");
})(Ap || (Ap = {}));
class Op {
  constructor(e) {
    (this.host = e),
      (this.timeout = 0),
      (this.status = Ap.Active),
      (this.pageActivityEvents = {
        document: ["mousemove", "mouseup", "keyup", "touchcancel", "touchend", "touchmove"],
        window: ["resize", "message"],
      }),
      (this.pageVisibilityEvents = { document: ["visibilitychange"], window: ["blur", "focus", "pagehide"] }),
      (this.onAppInitializationUpdate = () => {
        Jt() && this.stopIdleTimer();
      }),
      (this.stopIdleTimer = () => {
        clearTimeout(this.timeout), (this.timeout = void 0);
      }),
      (this.startIdleTimer = () => {
        if ((this.stopIdleTimer(), !Jt())) return;
        let e;
        document.hidden ? (this.hide(), (e = 3e5)) : (this.wakeUp(), (e = 6e5)), this.tickUntil(e + Date.now());
      }),
      (this.tickUntil = (e) => {
        e >= Date.now() ? (this.timeout = window.setTimeout(() => this.tickUntil(e), 1e3)) : this.idle();
      }),
      (this.startIdleTimerThrottled = Qi(1e3, !1, this.startIdleTimer)),
      (this.registerPageActivityThrottled = () => {
        this.status === Ap.Active ? this.startIdleTimerThrottled() : this.startIdleTimer();
      }),
      (this.idle = () => {
        this.changeStatus(Ap.Idle) && this.host.onInactive();
      }),
      (this.wakeUp = () => {
        this.status === Ap.Idle && this.host.onActive(), this.changeStatus(Ap.Active);
      }),
      (this.hide = () => {
        this.changeStatus(Ap.Hidden);
      }),
      e.addController(this);
  }
  toggleEvents(e, t) {
    [...this.pageActivityEvents.document, ...this.pageVisibilityEvents.document].forEach((n) => document[e](n, t)),
      [...this.pageActivityEvents.window, ...this.pageVisibilityEvents.window].forEach((n) => window[e](n, t));
  }
  hostConnected() {
    this.toggleEvents("addEventListener", this.registerPageActivityThrottled),
      Kt.subscribe({ requestUpdate: this.onAppInitializationUpdate });
  }
  hostDisconnected() {
    this.toggleEvents("removeEventListener", this.registerPageActivityThrottled), this.stopIdleTimer();
  }
  changeStatus(e) {
    return this.status !== e && ((this.status = e), Sr(`Page activity status ${e}`), !0);
  }
}
const Ip = Symbol("mixins/with-app-link");
class Mp {
  constructor(e) {
    (this.host = e), (this.timeoutId = 0), (this.startedAt = 0), (this.expireAt = 0), e.addController(this);
  }
  startTimer(e) {
    (this.startedAt = Date.now()), (this.expireAt = this.startedAt + Mp.INTERVAL * e), this.start();
  }
  hostDisconnected() {
    this.timeoutId && (clearTimeout(this.timeoutId), (this.timeoutId = 0));
  }
  start() {
    this.timeoutId && (clearTimeout(this.timeoutId), (this.timeoutId = 0));
    const e = this.getRemainingSeconds();
    if ((this.notify(e), 0 === e)) return;
    let t = this.startedAt + Mp.INTERVAL;
    const n = () => {
      const e = Date.now() - t;
      t += Mp.INTERVAL;
      const i = this.getRemainingSeconds();
      this.notify(i), (this.timeoutId = 0 !== i ? window.setTimeout(n, Math.max(0, Mp.INTERVAL - e)) : 0);
    };
    this.timeoutId = window.setTimeout(n, Mp.INTERVAL);
  }
  notify(e) {
    this.host.onPixelAvailabilityTimerTick(e);
  }
  getRemainingSeconds() {
    return Math.max(0, Math.round((this.expireAt - Date.now()) / Mp.INTERVAL));
  }
}
Mp.INTERVAL = 1e3;
var Pp = function (e, t) {
    return {
      name: e,
      value: void 0 === t ? -1 : t,
      delta: 0,
      entries: [],
      id: "v2-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12),
    };
  },
  Dp = function (e, t) {
    try {
      if (PerformanceObserver.supportedEntryTypes.includes(e)) {
        if ("first-input" === e && !("PerformanceEventTiming" in self)) return;
        var n = new PerformanceObserver(function (e) {
          return e.getEntries().map(t);
        });
        return n.observe({ type: e, buffered: !0 }), n;
      }
    } catch (e) {}
  },
  Rp = function (e, t) {
    var n = function n(i) {
      ("pagehide" !== i.type && "hidden" !== document.visibilityState) ||
        (e(i), t && (removeEventListener("visibilitychange", n, !0), removeEventListener("pagehide", n, !0)));
    };
    addEventListener("visibilitychange", n, !0), addEventListener("pagehide", n, !0);
  },
  Np = function (e) {
    addEventListener(
      "pageshow",
      function (t) {
        t.persisted && e(t);
      },
      !0
    );
  },
  $p = function (e, t, n) {
    var i;
    return function (r) {
      t.value >= 0 && (r || n) && ((t.delta = t.value - (i || 0)), (t.delta || void 0 === i) && ((i = t.value), e(t)));
    };
  },
  Lp = -1,
  jp = function () {
    Rp(function (e) {
      var t = e.timeStamp;
      Lp = t;
    }, !0);
  },
  zp = function () {
    return (
      Lp < 0 &&
        ((Lp = window.webVitals.firstHiddenTime) === 1 / 0 && jp(),
        Np(function () {
          setTimeout(function () {
            (Lp = "hidden" === document.visibilityState ? 0 : 1 / 0), jp();
          }, 0);
        })),
      {
        get firstHiddenTime() {
          return Lp;
        },
      }
    );
  },
  Fp = function (e, t) {
    var n,
      i = zp(),
      r = Pp("FCP"),
      o = function (e) {
        "first-contentful-paint" === e.name &&
          (a && a.disconnect(), e.startTime < i.firstHiddenTime && ((r.value = e.startTime), r.entries.push(e), n(!0)));
      },
      s =
        window.performance && performance.getEntriesByName && performance.getEntriesByName("first-contentful-paint")[0],
      a = s ? null : Dp("paint", o);
    (s || a) &&
      ((n = $p(e, r, t)),
      s && o(s),
      Np(function (i) {
        (r = Pp("FCP")),
          (n = $p(e, r, t)),
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              (r.value = performance.now() - i.timeStamp), n(!0);
            });
          });
      }));
  },
  Vp = !1,
  Up = -1,
  Bp = {};
const Hp = "iphone",
  qp = [
    { dpi: 3, height: 926, width: 428, version: `${Hp} 12 Pro Max`, yearClass: 2020 },
    { dpi: 3, height: 896, width: 414, version: `${Hp} 11 Pro Max`, yearClass: 2019 },
    { dpi: 3, height: 844, width: 390, version: `${Hp} 12`, yearClass: 2020 },
    { dpi: 3, height: 812, width: 375, version: `${Hp} 7`, yearClass: 2016 },
    { dpi: 3, height: 736, width: 414, version: `${Hp} 8 Plus`, yearClass: 2017 },
    { dpi: 2, height: 896, width: 414, version: `${Hp} 11`, yearClass: 2019 },
    { dpi: 2, height: 667, width: 375, version: `${Hp} SE 2nd Gen`, yearClass: 2020 },
    { dpi: 2, height: 568, width: 320, version: `${Hp} 5S`, yearClass: 2013 },
    { dpi: 2, height: 480, width: 320, version: `${Hp} 4S`, yearClass: 2011 },
  ];
function Qp() {
  const e = (function (e) {
    if (!window.screen || !window.devicePixelRatio) return;
    const { height: t, width: n } = window.screen,
      i = window.devicePixelRatio;
    return n && t && i ? e.find((e) => i === e.dpi && t === e.height && n === e.width) : void 0;
  })(qp);
  if (e) return { deviceName: e.version.toLowerCase().replace(" ", "-"), yearClass: e.yearClass };
}
const Gp = (e, t) => {
  "function" == typeof navigator.sendBeacon
    ? navigator.sendBeacon(e, t)
    : ((e, t) => {
        fetch(e, { body: t, headers: { "Content-Type": "text/plain" }, keepalive: !0, method: "POST" });
      })(e, t);
};
class Wp {
  constructor() {
    let e, t;
    (this.promise = new Promise((n, i) => {
      (e = n), (t = i);
    })),
      (this.resolve = e),
      (this.reject = t);
  }
}
const Yp = (() => {
    const e = "test";
    try {
      return sessionStorage.setItem(e, e), sessionStorage.removeItem(e), !0;
    } catch (e) {
      return !1;
    }
  })(),
  Zp = () => {
    if (window.serverTimestamp && Yp) {
      const { serverTimestamp: e } = window;
      try {
        const t = sessionStorage.getItem("serverTimestamps");
        if (t) {
          return JSON.parse(t)[`${e}`];
        }
      } catch (e) {}
    }
    const e = window.performance.getEntriesByType("navigation")[0];
    return e && e.responseEnd - e.responseStart < 8;
  };
class Xp {
  constructor(e) {
    (this._custom = {}),
      (this._metrics = {}),
      (this._isCached = !1),
      (this.remeasureForBFCacheRestore = (e) => {
        const t = { metrics: {}, meta: {}, cache_restore: !0 };
        Object.keys(this._metrics).forEach((e) => {
          this.isKeyCustomMetric(e) || (this._metrics[e] && (t.metrics[e] = 0));
        }),
          Object.keys(t.metrics).length &&
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                const n = performance.now() - e.timeStamp;
                Object.keys(t.metrics).forEach((e) => {
                  t.metrics[e] = n;
                }),
                  this.notifyAndSendMetrics(t);
              });
            });
      }),
      (this._callback = e);
  }
  async connect() {
    const { isCached: e, unsubscribe: t } = await ((e) => {
      const t = (t) => {
        t.persisted && e(t);
      };
      window.addEventListener("pageshow", t, !0);
      const n = new Wp();
      return (
        n.resolve({
          isCached: Zp(),
          unsubscribe: () => {
            window.removeEventListener("pageshow", t);
          },
        }),
        n.promise
      );
    })(this.remeasureForBFCacheRestore);
    (this._unsubscribeFromCacheRestore = t), (this._isCached = e), this.gatherThenSendMetrics();
    Object.keys(this._metrics).some((e) => !this.isKeyCustomMetric(e) && !this._metrics[e]) &&
      this.registerPerfObserver();
  }
  disconnect() {
    var e, t;
    null === (e = this._observer) || void 0 === e || e.disconnect(),
      null === (t = this._unsubscribeFromCacheRestore) || void 0 === t || t.call(this);
  }
  gatherThenSendMetrics() {
    const e = this.gatherMetrics();
    this.notifyAndSendMetrics(e);
  }
  notifyAndSendMetrics(e) {
    Object.keys(e.metrics).length && this._callback(e);
  }
  isKeyCustomMetric(e) {
    return Object.prototype.hasOwnProperty.call(this._custom, e);
  }
  gatherMetrics() {
    const e = { metrics: {}, meta: {} };
    return (
      this._isCached && (e.cache_restore = !0),
      Object.keys(this._metrics).forEach((t) => {
        if (this._metrics[t]) return;
        if (this.isKeyCustomMetric(t)) {
          const n = this._custom[t];
          n > -1 && ((e.metrics[t] = n), (this._metrics[t] = !0));
        }
        performance.getEntriesByName(t, "mark").length && performance.measure(t, "fetchStart", t);
        const n = performance.getEntriesByName(t, "measure");
        if (n.length) {
          const { duration: i } = n[0];
          (e.metrics[t] = Math.ceil(i)), (this._metrics[t] = !0);
        }
      }),
      e
    );
  }
  registerPerfObserver() {
    (this._observer = new PerformanceObserver((e) => {
      e.getEntries().some((e) => !!e.name && !this._metrics[e.name]) && this.gatherThenSendMetrics();
    })),
      this._observer.observe({ entryTypes: ["mark"] });
  }
  registerPerfMetric(e) {
    this._metrics[e] = !1;
  }
  registerCustomMetric(e) {
    return (
      (this._custom[e] = -1),
      this.registerPerfMetric(e),
      (t) => {
        (this._custom[e] = t), this.gatherThenSendMetrics();
      }
    );
  }
  getCustomMetricValue(e) {
    return this._custom[e];
  }
}
var Kp;
!(function (e) {
  (e.CLS = "cumulative-layout-shift"),
    (e.FID = "first-input-delay"),
    (e.LCP = "longest-contentful-paint"),
    (e.TTFB = "time-to-first-byte");
})(Kp || (Kp = {}));
let Jp = class extends se {
  constructor() {
    super(...arguments),
      (this._perfMetrics = new Xp((e) => {
        var t;
        const n = null === (t = Qp()) || void 0 === t ? void 0 : t.yearClass,
          i = Object.assign(Object.assign({}, e), {
            meta: Object.assign(Object.assign({}, e.meta), n && { yearClass: n }),
          }),
          r = Ye("faceplate-request", { resource: this.endpoint, request: { body: i } });
        if ((this.dispatchEvent(r), r.defaultPrevented)) return;
        const o = JSON.stringify(r.detail.request.body);
        Gp(this.endpoint, o);
      })),
      (this.endpoint = "");
  }
  render() {
    return j` <slot hidden></slot> `;
  }
  firstUpdated() {
    if (this.endpoint) {
      if (this._slottedContent)
        for (const e of this._slottedContent) e instanceof HTMLDataElement && this.parseDataElement(e);
      !(function (e, t) {
        Vp ||
          (Fp(function (e) {
            Up = e.value;
          }),
          (Vp = !0));
        var n,
          i = function (t) {
            Up > -1 && e(t);
          },
          r = Pp("CLS", 0),
          o = 0,
          s = [],
          a = function (e) {
            if (!e.hadRecentInput) {
              var t = s[0],
                i = s[s.length - 1];
              o && e.startTime - i.startTime < 1e3 && e.startTime - t.startTime < 5e3
                ? ((o += e.value), s.push(e))
                : ((o = e.value), (s = [e])),
                o > r.value && ((r.value = o), (r.entries = s), n());
            }
          },
          c = Dp("layout-shift", a);
        c &&
          ((n = $p(i, r, t)),
          Rp(function () {
            c.takeRecords().map(a), n(!0);
          }),
          Np(function () {
            (o = 0), (Up = -1), (r = Pp("CLS", 0)), (n = $p(i, r, t));
          }));
      })(this.onWebVitalMeasured(Kp.CLS, (e) => e)),
        (function (e, t) {
          var n,
            i = zp(),
            r = Pp("FID"),
            o = function (e) {
              e.startTime < i.firstHiddenTime &&
                ((r.value = e.processingStart - e.startTime), r.entries.push(e), n(!0));
            },
            s = Dp("first-input", o);
          (n = $p(e, r, t)),
            s &&
              Rp(function () {
                s.takeRecords().map(o), s.disconnect();
              }, !0),
            s || window.webVitals.firstInputPolyfill(o),
            Np(function () {
              (r = Pp("FID")),
                (n = $p(e, r, t)),
                window.webVitals.resetFirstInputPolyfill(),
                window.webVitals.firstInputPolyfill(o);
            });
        })(this.onWebVitalMeasured(Kp.FID, Math.ceil)),
        (function (e, t) {
          var n,
            i = zp(),
            r = Pp("LCP"),
            o = function (e) {
              var t = e.startTime;
              t < i.firstHiddenTime && ((r.value = t), r.entries.push(e), n());
            },
            s = Dp("largest-contentful-paint", o);
          if (s) {
            n = $p(e, r, t);
            var a = function () {
              Bp[r.id] || (s.takeRecords().map(o), s.disconnect(), (Bp[r.id] = !0), n(!0));
            };
            ["keydown", "click"].forEach(function (e) {
              addEventListener(e, a, { once: !0, capture: !0 });
            }),
              Rp(a, !0),
              Np(function (i) {
                (r = Pp("LCP")),
                  (n = $p(e, r, t)),
                  requestAnimationFrame(function () {
                    requestAnimationFrame(function () {
                      (r.value = performance.now() - i.timeStamp), (Bp[r.id] = !0), n(!0);
                    });
                  });
              });
          }
        })(this.onWebVitalMeasured(Kp.LCP, Math.ceil)),
        (function (e) {
          var t,
            n = Pp("TTFB");
          (t = function () {
            try {
              var t =
                performance.getEntriesByType("navigation")[0] ||
                (function () {
                  var e = performance.timing,
                    t = { entryType: "navigation", startTime: 0 };
                  for (var n in e)
                    "navigationStart" !== n && "toJSON" !== n && (t[n] = Math.max(e[n] - e.navigationStart, 0));
                  return t;
                })();
              if (((n.value = n.delta = t.responseStart), n.value < 0 || n.value > performance.now())) return;
              (n.entries = [t]), e(n);
            } catch (t) {}
          }),
            "complete" === document.readyState
              ? setTimeout(t, 0)
              : addEventListener("load", function () {
                  return setTimeout(t, 0);
                });
        })(this.onWebVitalMeasured(Kp.TTFB, Math.ceil)),
        this._perfMetrics.connect();
    } else console.error("faceplate-perfmetric-collector: no endpoint specified");
  }
  onWebVitalMeasured(e, t) {
    const n = this._perfMetrics.registerCustomMetric(e);
    return (i) => {
      -1 === i.value || this._perfMetrics.getCustomMetricValue(e) > -1 || n(t(i.value));
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._perfMetrics.disconnect();
  }
  parseDataElement(e) {
    const t = e.value;
    this._perfMetrics.registerPerfMetric(t);
  }
};
$e(
  [
    (function (e, t, n) {
      let i,
        r = e;
      return (
        "object" == typeof e ? ((r = e.slot), (i = e)) : (i = { flatten: t }),
        n
          ? (function (e) {
              const { slot: t, selector: n } = null != e ? e : {};
              return He({
                descriptor: (i) => ({
                  get() {
                    var i;
                    const r = "slot" + (t ? `[name=${t}]` : ":not([name])"),
                      o = null === (i = this.renderRoot) || void 0 === i ? void 0 : i.querySelector(r),
                      s = null != o ? Ge(o, e) : [];
                    return n ? s.filter((e) => e.matches(n)) : s;
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
              });
            })({ slot: r, flatten: t, selector: n })
          : He({
              descriptor: (e) => ({
                get() {
                  var e, t;
                  const n = "slot" + (r ? `[name=${r}]` : ":not([name])"),
                    o = null === (e = this.renderRoot) || void 0 === e ? void 0 : e.querySelector(n);
                  return null !== (t = null == o ? void 0 : o.assignedNodes(i)) && void 0 !== t ? t : [];
                },
                enumerable: !0,
                configurable: !0,
              }),
            })
      );
    })(),
  ],
  Jp.prototype,
  "_slottedContent",
  void 0
),
  $e([Ue({ type: String })], Jp.prototype, "endpoint", void 0),
  (Jp = $e([Fe("faceplate-perfmetric-collector")], Jp));
Ir(
  "icon-pin",
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M19.6 6.876L13.125.4a1.132 1.132 0 00-1.606 0l-.665.665a2.084 2.084 0 00-.378 2.435L6.68 7.292a2.086 2.086 0 00-2.432.374l-.665.665a1.14 1.14 0 000 1.612l2.8 2.8-5.82 5.82.884.884 5.82-5.82 2.8 2.8a1.132 1.132 0 001.607 0l.665-.665a2.084 2.084 0 00.374-2.432L16.5 9.528a2.129 2.129 0 002.433-.375l.666-.666a1.142 1.142 0 00.002-1.611zm-1.55 1.393a.849.849 0 01-1.174 0l-.442-.442-5.426 5.426.443.442a.832.832 0 010 1.174l-.588.587-6.319-6.319.587-.587a.833.833 0 011.175 0l.442.442 5.426-5.426-.442-.441a.832.832 0 010-1.175l.565-.609 6.34 6.341-.587.587z"/></svg>'
  )}`,
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M19.6 6.876L13.124.4a1.132 1.132 0 00-1.606 0l-.665.665a2.083 2.083 0 00-.379 2.435L6.68 7.292a2.085 2.085 0 00-2.432.374l-.665.665a1.14 1.14 0 000 1.612l2.53 2.53-5.82 5.82 1.414 1.414 5.82-5.82 2.53 2.53a1.132 1.132 0 001.606 0l.665-.665a2.084 2.084 0 00.375-2.432L16.5 9.528a2.126 2.126 0 002.433-.375l.666-.666a1.142 1.142 0 00.001-1.611z"/></svg>'
  )}`
);
Ir(
  "icon-close",
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M18.442 2.442l-.884-.884L10 9.116 2.442 1.558l-.884.884L9.116 10l-7.558 7.558.884.884L10 10.884l7.558 7.558.884-.884L10.884 10l7.558-7.558z"/></svg>'
  )}`,
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M18.707 2.707l-1.414-1.414L10 8.586 2.707 1.293 1.293 2.707 8.586 10l-7.293 7.293 1.414 1.414L10 11.414l7.293 7.293 1.414-1.414L11.414 10l7.293-7.293z"/></svg>'
  )}`
);
Ir(
  "icon-info",
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><g clip-path="url(#clip0_474_84)"><path d="M10 20a10 10 0 1110-10 10.011 10.011 0 01-10 10zm0-18.75A8.75 8.75 0 1018.75 10 8.76 8.76 0 0010 1.25zm-.543 5.705a1.058 1.058 0 01-.39-.393 1.11 1.11 0 010-1.09c.093-.161.228-.295.39-.386a1.1 1.1 0 011.484.39c.098.163.149.35.147.54a1.08 1.08 0 01-.54.936A1.05 1.05 0 0110 7.1a1.062 1.062 0 01-.543-.145zm1.354 8.463H9.2V8.124h1.614l-.003 7.294z"/></g><defs><clipPath id="clip0_474_84"><path d="M0 0h20v20H0z"/></clipPath></defs></svg>'
  )}`,
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><g clip-path="url(#clip0_474_83)"><path d="M10 0a10 10 0 1010 10A10.011 10.011 0 0010 0zm1.081 15.418H8.92V8.062h2.161v7.356zm.065-8.859a1.307 1.307 0 01-1.139.656 1.29 1.29 0 01-.67-.178 1.343 1.343 0 01-.475-1.811c.113-.197.277-.36.475-.472a1.344 1.344 0 011.326.008 1.321 1.321 0 01.483 1.797z"/></g><defs><clipPath id="clip0_474_83"><path d="M0 0h20v20H0z"/></clipPath></defs></svg>'
  )}`
);
Ir(
  "icon-duplicate",
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M17.875 13h-9.75A1.126 1.126 0 017 11.875v-9.75A1.127 1.127 0 018.125 1h9.75A1.127 1.127 0 0119 2.125v9.75A1.126 1.126 0 0117.875 13zM8.25 11.75h9.5v-9.5h-9.5v9.5zM13 17.875v-3.409h-1.25v3.284h-9.5v-9.5h3.284V7H2.125A1.127 1.127 0 001 8.125v9.75A1.127 1.127 0 002.125 19h9.75A1.127 1.127 0 0013 17.875z"/></svg>'
  )}`,
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M11 15h2v2.875A1.127 1.127 0 0111.875 19h-9.75A1.127 1.127 0 011 17.875v-9.75A1.127 1.127 0 012.125 7H5v2H3v8h8v-2zm8-12.875v9.75A1.126 1.126 0 0117.875 13h-9.75A1.126 1.126 0 017 11.875v-9.75A1.127 1.127 0 018.125 1h9.75A1.127 1.127 0 0119 2.125zM9 3v8h8V3H9z"/></svg>'
  )}`
);
Ir(
  "icon-history",
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><g clip-path="url(#clip0_473_38)"><path d="M13.558 14.442l-4.183-4.183V4h1.25v5.741l3.817 3.817-.884.884zM20 10a10 10 0 10-10 10 10.011 10.011 0 0010-10zm-1.25 0A8.75 8.75 0 1110 1.25 8.76 8.76 0 0118.75 10z"/></g><defs><clipPath id="clip0_473_38"><path d="M0 0h20v20H0z"/></clipPath></defs></svg>'
  )}`,
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><g clip-path="url(#clip0_473_33)"><path d="M10 0a10 10 0 1010 10A10.011 10.011 0 0010 0zm3.47 14.53l-4.22-4.219V4h1.5v5.689l3.78 3.781-1.06 1.06z"/></g><defs><clipPath id="clip0_473_33"><path d="M0 0h20v20H0z"/></clipPath></defs></svg>'
  )}`
);
let ef = class extends se {
  constructor() {
    super(...arguments), (this.height = "16"), (this.width = "16");
  }
  static get styles() {
    return o`svg{display:block}`;
  }
  render() {
    return j` <svg width="${this.width}" height="${this.height}" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M15.68 5.50074L10.4992 0.319938C10.4147 0.234961 10.3142 0.167588 10.2036 0.121722C10.0929 0.0758558 9.97418 0.0524083 9.85437 0.0527378V0.0527378C9.73537 0.0530412 9.6176 0.0767959 9.50778 0.122644C9.39797 0.168492 9.29826 0.235534 9.21437 0.319938L8.68237 0.851938C8.43129 1.10222 8.26652 1.42602 8.21199 1.77632C8.15747 2.12662 8.21603 2.48519 8.37917 2.79994L5.34397 5.83354C5.02987 5.67059 4.67208 5.61175 4.32233 5.66554C3.97259 5.71932 3.64901 5.88294 3.39838 6.13274L2.86638 6.66474C2.69539 6.83576 2.59934 7.0677 2.59934 7.30954C2.59934 7.55138 2.69539 7.78331 2.86638 7.95434L4.89037 9.97834L0.234375 14.6343L1.36558 15.7655L6.02157 11.1095L8.04558 13.1335C8.12946 13.2179 8.22917 13.285 8.33898 13.3308C8.4488 13.3767 8.56657 13.4004 8.68558 13.4007V13.4007C8.8054 13.4012 8.92411 13.3777 9.0348 13.3319C9.1455 13.286 9.24597 13.2186 9.33038 13.1335L9.86238 12.6015C10.1124 12.3511 10.2763 12.0275 10.3302 11.6777C10.3841 11.328 10.3254 10.9701 10.1624 10.6559L13.2 7.62234C13.5154 7.78042 13.8723 7.83646 14.221 7.78271C14.5698 7.72896 14.8931 7.56807 15.1464 7.32234L15.6792 6.78954C15.8496 6.61844 15.9454 6.38682 15.9456 6.1453C15.9457 5.90379 15.8502 5.67204 15.68 5.50074V5.50074Z" fill="#576F76"/> </svg> `;
  }
};
$e([Ue({ type: String })], ef.prototype, "height", void 0),
  $e([Ue({ type: String })], ef.prototype, "width", void 0),
  (ef = $e([Fe("garlic-bread-icon-pin")], ef));
let tf = class extends se {
  constructor() {
    super(...arguments), (this.height = "16"), (this.width = "14");
  }
  static get styles() {
    return o`svg{display:block}`;
  }
  render() {
    return j` <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11.6008 4.84721L12.6 4.91361L11.9912 14.0664C11.9844 14.5896 11.7792 15.0907 11.4169 15.4683C11.0546 15.8458 10.5625 16.0716 10.04 16.1H3.95998C3.43853 16.0715 2.94732 15.8462 2.58548 15.4697C2.22363 15.0932 2.0181 14.5934 2.01038 14.0712L1.39998 4.91361L2.39838 4.84721L3.00718 14C3.0032 14.2684 3.09812 14.5288 3.27384 14.7317C3.44956 14.9345 3.69379 15.0657 3.95998 15.1H10.04C10.3068 15.0651 10.5514 14.9331 10.7271 14.7293C10.9028 14.5256 10.9974 14.2642 10.9928 13.9952L11.6008 4.84721ZM13.4 2.40001V3.40001H0.599976V2.40001H3.79998V2.10001C3.8284 1.51721 4.08619 0.969319 4.51709 0.575891C4.94798 0.182464 5.51701 -0.0245568 6.09998 7.87846e-06H7.89998C8.48295 -0.0245568 9.05197 0.182464 9.48286 0.575891C9.91376 0.969319 10.1716 1.51721 10.2 2.10001V2.40001H13.4ZM4.79998 2.40001H9.19998V2.10001C9.17086 1.78279 9.01827 1.48972 8.77509 1.28396C8.53192 1.0782 8.21763 0.976221 7.89998 1.00001H6.09998C5.78232 0.976221 5.46803 1.0782 5.22486 1.28396C4.98168 1.48972 4.82909 1.78279 4.79998 2.10001V2.40001Z" fill="#576F76"/> </svg> `;
  }
};
$e([Ue({ type: String })], tf.prototype, "height", void 0),
  $e([Ue({ type: String })], tf.prototype, "width", void 0),
  (tf = $e([Fe("garlic-bread-icon-delete")], tf));
let nf = class extends se {
  constructor() {
    super(...arguments),
      (this.isPinned = !1),
      (this.subredditId = ""),
      (this.icon = ""),
      (this.name = ""),
      (this.px = ""),
      (this.py = "");
  }
  static get styles() {
    return $t(
      ":host {\n  padding: 8px 0 0;\n  box-sizing: border-box;\n  box-shadow: none;\n  max-width: 100%;\n}\n.community-widget {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  height: 44px;\n  padding: 12px 16px;\n  background: #eaedef;\n  border: 3px solid black;\n  box-sizing: border-box;\n  width: 100%;\n  cursor: pointer;\n}\n.community-widget:active {\n  background: linear-gradient(rgba(0, 0, 0, 0.3) 0 0), #eaedef;\n}\n.community-pin-icon {\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  overflow: hidden;\n}\n.community {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n.community-name {\n  display: inline-block;\n  padding: 0 8px;\n  margin: auto;\n  font-style: normal;\n  font-weight: 600;\n  font-size: 14px;\n  color: #000000;\n}\n.delete-widget {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  box-sizing: border-box;\n}\n.current-pin {\n  font-weight: 400;\n  font-size: 14px;\n  color: var(--gray-color);\n  margin: 16px 0;\n}\n.bottom-divider {\n  width: 100%;\n  height: 1px;\n  background: rgba(0, 0, 0, 0.1);\n}\ngarlic-bread-icon-delete {\n  cursor: pointer;\n  padding: 10px;\n}\ngarlic-bread-icon-pin {\n  cursor: pointer;\n}\n.hidden {\n  display: none !important;\n}\n.no-select {\n  -moz-user-select: none;\n  -ms-user-select: none;\n  -webkit-user-select: none;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n  -webkit-text-size-adjust: none;\n  user-select: none;\n}\n"
    );
  }
  deletePin() {
    this.dispatchEvent(
      new CustomEvent("delete-community-pin", { bubbles: !0, composed: !0, detail: { subredditId: this.subredditId } })
    );
  }
  setPin() {
    this.dispatchEvent(
      new CustomEvent("set-community-pin", { bubbles: !0, composed: !0, detail: { subredditId: this.subredditId } })
    );
  }
  render() {
    return j` <button class="community-widget no-select" @click="${this.setPin}"> <div class="community"> ${
      this.icon
        ? j` <faceplate-img class="community-pin-icon" src="${this.icon}" alt="Subreddit Icon" name="${this.name}"></faceplate-img> `
        : j`<garlic-bread-icon-community class="community-pin-icon"></garlic-bread-icon-community>`
    } <div class="community-name">${this.name}</div> </div> <garlic-bread-icon-pin></garlic-bread-icon-pin> </button> ${
      this.isPinned
        ? j` <div class="delete-widget"> <p class="current-pin no-select"> Current Pin: (${this.px}, ${this.py}) </p> <garlic-bread-icon-delete class="no-select" @click="${this.deletePin}"></garlic-bread-icon-delete> </div> <div class="bottom-divider no-select"></div> `
        : ""
    } `;
  }
};
$e([Ue({ type: Boolean, attribute: "is-pinned" })], nf.prototype, "isPinned", void 0),
  $e([Ue({ type: String, attribute: "subreddit-id" })], nf.prototype, "subredditId", void 0),
  $e([Ue({ type: String, attribute: "icon" })], nf.prototype, "icon", void 0),
  $e([Ue({ type: String, attribute: "name" })], nf.prototype, "name", void 0),
  $e([Ue({ type: String, attribute: "current-pin-x" })], nf.prototype, "px", void 0),
  $e([Ue({ type: String, attribute: "current-pin-y" })], nf.prototype, "py", void 0),
  (nf = $e([Fe("garlic-bread-community-widget")], nf));
var rf;
!(function (e) {
  (e.CIRCLE = "circle"), (e.RECTANGLE = "rectangle"), (e.PILL = "pill");
})(rf || (rf = {}));
const of = 2500;
let sf = 0,
  af = null,
  cf = class extends ht {
    constructor() {
      super(...arguments),
        (this.shape = rf.RECTANGLE),
        (this.calcDelay = (e) => {
          var t;
          if (0 === e) return 0;
          let n = 0;
          const i = null == af ? void 0 : af.getAnimations()[0];
          return (
            i && (n = (null === (t = i.effect) || void 0 === t ? void 0 : t.getComputedTiming().progress) * of),
            (n + 200 * e) % of
          );
        }),
        (this.shimmer = (e) => {
          var t;
          af || (af = this.shimmerObject);
          const n = { duration: of, delay: -1 * this.calcDelay(e), iterations: 1 / 0 };
          null === (t = this.shimmerObject) || void 0 === t || t.animate([{ transform: "translateX(50%)" }], n);
        });
    }
    static get styles() {
      return o`:host{display:inline-flex}:host([shape=pill]) #loader{border-radius:var(--rem8)}:host([shape=circle]) #loader{border-radius:50%}#loader{background:var(--color-shimmer-background);height:100%;width:100%;position:relative;overflow-x:hidden}#shimmer-object{background:var(--color-shimmer-gradient-overlay);border-radius:.5rem;height:100%;width:200%;position:absolute;top:0;left:0;transform:translateX(-100%)}`;
    }
    firstUpdated() {
      this.shimmer(sf++);
    }
    render() {
      return j`<div id="loader"> <span id="shimmer-object"></span> </div> `;
    }
  };
$e([Ue({ type: String })], cf.prototype, "shape", void 0),
  $e([qe("#shimmer-object")], cf.prototype, "shimmerObject", void 0),
  (cf = $e([Fe("faceplate-shimmer")], cf));
const lf = 250;
let uf = class extends vi(se) {
  constructor() {
    super(),
      (this._events = new ut(this)),
      (this.endIndex = lf),
      (this.observer = null),
      (this.onDeletePin = this._events.define("delete-community-pin", async (e) => {
        var t;
        this.trackEvent(
          ((t = e.detail.subredditId),
          li(
            { source: ui.GarlicBread, action: hi.Delete, noun: di.CommunityPin },
            { action_info: { setting_value: `subredditId: ${t}` } }
          ))
        );
        const n = await cp.setSubredditCoordinates({ subredditID: e.detail.subredditId });
        if (n.type === ap.Success) {
          const t = _n.getState();
          if ((delete t[e.detail.subredditId], _n.updateState(Object.assign({}, t)), tn.getState())) {
            const e = Ye("faceplate-alert", { level: Ze.notice, message: "Pin removed." });
            this.dispatchEvent(e);
          }
          this.requestUpdate();
        } else this.dispatchEvent(Ye("api-error", n));
      })),
      (this.onSetPin = this._events.define("set-community-pin", async (e) => {
        const t = _n.getState()[e.detail.subredditId],
          n = this.getClientCoordinates();
        ((null == t ? void 0 : t.x) === n.x &&
          (null == t ? void 0 : t.y) === n.y &&
          (null == t ? void 0 : t.z) === un.getState()) ||
          (null != t
            ? this.trackEvent(
                ((e, t, n, i) =>
                  li(
                    { source: ui.GarlicBread, action: hi.Update, noun: di.CommunityPin },
                    { action_info: { setting_value: `subredditId: ${e}, x: ${t}, y: ${n}, z: ${i}` } }
                  ))(e.detail.subredditId, n.x, n.y, un.getState())
              )
            : this.trackEvent(
                ((e, t, n, i) =>
                  li(
                    { source: ui.GarlicBread, action: hi.Set, noun: di.CommunityPin },
                    { action_info: { setting_value: `subredditId: ${e}, x: ${t}, y: ${n}, z: ${i}` } }
                  ))(e.detail.subredditId, n.x, n.y, un.getState())
              ),
          this.setNewPinCoordinates(e.detail.subredditId, n));
      })),
      Cn(this, cn),
      Cn(this, ln),
      Cn(this, un),
      Cn(this, Sn),
      Cn(this, _n),
      this.initializeModeratedCommunities();
  }
  static get styles() {
    return $t(
      ":host {\n  margin-top: -8px;\n  box-sizing: border-box;\n  box-shadow: none;\n}\n.sub-header {\n  font-size: 14px;\n  font-weight: 400;\n  margin-bottom: 16px;\n  color: var(--color-neutral-content-weak);\n}\n.list-title {\n  color: var(--gray-color);\n  font-style: normal;\n  font-weight: 600;\n  font-size: 14px;\n  height: 20px;\n  line-height: 20px;\n  margin-bottom: 8px;\n}\n.community-list {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  height: 200px;\n  overflow-y: scroll;\n  overflow-x: visible;\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n  scroll-margin-bottom: 3px;\n}\n.community-list::-webkit-scrollbar {\n  display: none;\n}\n@media (min-width: 450px) {\n  .community-list {\n    height: 300px;\n  }\n}\n@media (min-height: 670px) {\n  .community-list {\n    height: 300px;\n  }\n}\n.gradient {\n  position: sticky;\n  bottom: -2px;\n  min-height: 32px;\n  width: 100%;\n  background: linear-gradient(to top, white, rgba(255, 255, 255, 0));\n  pointer-events: none;\n}\n.hidden {\n  display: none;\n}\n.load-more {\n  min-height: 10px;\n  width: 100%;\n}\n.spacer {\n  position: absolute;\n  bottom: -1px;\n  /* adjust this value to the amount of overflow you want */\n  height: 1px;\n  /* adjust this to your preference */\n  width: 100%;\n  pointer-events: none;\n}\nfaceplate-shimmer {\n  width: 100%;\n  height: 44px;\n  margin-top: 8px;\n}\n"
    );
  }
  setupInfiniteScroll() {
    null !== this.loadMore &&
      void 0 !== this.loadMore &&
      ((this.observer = new IntersectionObserver((e) => {
        e.forEach((e) => {
          e.isIntersecting && this.fetchNewCoordinates(e.target);
        });
      })),
      this.observer.observe(this.loadMore));
  }
  fetchNewCoordinates(e) {
    var t, n;
    this.trackEvent(
      ((n = this.endIndex),
      li(
        { source: ui.GarlicBread, action: hi.Load, noun: di.CommunityPin },
        { action_info: { reason: `index: ${n}` } }
      ))
    );
    const i = Sn.getState();
    if (this.endIndex < i.length) {
      const e = this.endIndex + lf;
      (this.endIndex = e < i.length ? e : i.length), this.initializeCommunityPins();
    } else null === (t = this.observer) || void 0 === t || t.unobserve(e);
  }
  async initializeModeratedCommunities() {
    if (0 !== Sn.getState().length) return;
    const e = await cp.fetchModeratedSubreddits();
    e.type === ap.Success
      ? (Sn.updateState(e.data), this.initializeCommunityPins())
      : this.dispatchEvent(Ye("api-error", e));
  }
  convertToCoordinateMap(e) {
    const t = {};
    return (
      e.forEach((e) => {
        null !== e.coordinates && (t[e.subredditID] = e.coordinates);
      }),
      t
    );
  }
  async initializeCommunityPins() {
    const e = Sn.getState();
    if (0 === e.length) return;
    const t = this.endIndex - lf,
      n = e.slice(t, this.endIndex).map((e) => e.id),
      i = await cp.getSubredditsCoordinates(n);
    if (i.type === ap.Success) {
      if (null === i.data || void 0 === i.data) return;
      _n.updateState(
        Object.assign(Object.assign({}, _n.getState()), this.convertToCoordinateMap(i.data.subredditsCoordinates))
      );
    } else this.dispatchEvent(Ye("api-error", i));
  }
  updated(e) {
    null === this.observer && Sn.getState().length > lf && this.setupInfiniteScroll(), super.updated(e);
  }
  getSubheader() {
    return j`<p> Pinning adds a link to your coordinates to the top of your community and makes you eligible to be discoverable on the canvas and listed as one of the participating communities. </p> <p> You can update or remove your pin any time during the event. </p>`;
  }
  async setNewPinCoordinates(e, t) {
    const n = _n.getState(),
      i = { x: t.x, y: t.y, z: un.getState() },
      r = await cp.setSubredditCoordinates({ subredditID: e, coordinates: i });
    if (r.type === ap.Success) {
      if ((_n.updateState(Object.assign(Object.assign({}, n), { [e]: i })), tn.getState())) {
        const e = Ye("faceplate-alert", { level: Ze.notice, message: "Coordinates pinned." });
        this.dispatchEvent(e);
      }
    } else this.dispatchEvent(Ye("api-error", r));
  }
  getClientCoordinates() {
    return gr(or());
  }
  render() {
    const e = Sn.getState(),
      t = _n.getState(),
      n = e.length >= lf;
    return j` <div class="sub-header">${this.getSubheader()}</div> <div class="list-title"> Communities you moderate </div> <div class="community-list"> ${
      0 === e.length
        ? j` <faceplate-shimmer shape="rectangle"></faceplate-shimmer> <faceplate-shimmer shape="rectangle"></faceplate-shimmer> <faceplate-shimmer shape="rectangle"></faceplate-shimmer> `
        : ""
    } ${e.slice(0, this.endIndex).map((e, n) => {
      const i = t[e.id];
      return j`<garlic-bread-community-widget idx="${n}" name="${e.name}" subreddit-id="${e.id}" ?is-pinned="${
        void 0 !== t[e.id]
      }" icon="${e.logo ? e.logo : ""}" current-pin-x="${
        void 0 !== (null == i ? void 0 : i.x) ? (null == i ? void 0 : i.x) : ""
      }" current-pin-y="${
        void 0 !== (null == i ? void 0 : i.y) ? (null == i ? void 0 : i.y) : ""
      }"> ></garlic-bread-community-widget>`;
    })} ${n ? j`<div class="load-more"></div>` : ""} <div class="spacer"></div> <div class="gradient"></div> </div> `;
  }
};
$e([Be()], uf.prototype, "endIndex", void 0),
  $e([qe(".load-more")], uf.prototype, "loadMore", void 0),
  (uf = $e([Fe("garlic-bread-community-pin-tool")], uf));
Ir(
  "icon-volume",
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M9.891 19.854c-.25 0-.494-.087-.687-.247l-5.389-4.662H2.108A1.125 1.125 0 011 13.807V6.193a1.125 1.125 0 011.108-1.138h1.707L9.19.405a1.089 1.089 0 011.168-.153A1.129 1.129 0 0111 1.285v17.43a1.129 1.129 0 01-.643 1.033c-.145.07-.305.106-.466.106zM2.251 13.7h2.03l5.47 4.727V1.572L4.28 6.305h-2.03V13.7zM16.124 10A3.13 3.13 0 0013 6.875v1.25a1.875 1.875 0 110 3.75v1.25A3.129 3.129 0 0016.125 10zM20 10a7.008 7.008 0 00-7-7v1.25a5.75 5.75 0 110 11.5V17a7.008 7.008 0 007-7z"/></svg>'
  )}`,
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M13 13.5v-2a1.5 1.5 0 100-3v-2a3.5 3.5 0 110 7zM13 3v2a5 5 0 110 10v2a7 7 0 100-14zM10.357.252A1.091 1.091 0 009.19.405l-5.374 4.65H2.108A1.125 1.125 0 001 6.193v7.614a1.125 1.125 0 001.108 1.138h1.707l5.39 4.663a1.081 1.081 0 001.153.14A1.131 1.131 0 0011 18.715V1.285a1.13 1.13 0 00-.643-1.033z"/></svg>'
  )}`
);
Ir(
  "icon-volume-mute",
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M16.784 9.5l2.558 2.558-.884.884-2.558-2.558-2.558 2.558-.884-.884L15.016 9.5l-2.558-2.558.884-.884L15.9 8.616l2.558-2.558.884.884L16.784 9.5zm-6.427 10.248A1.128 1.128 0 0011 18.715V1.286a1.131 1.131 0 00-.643-1.034A1.091 1.091 0 009.19.405L3.815 5.056H2.108A1.124 1.124 0 001 6.194v7.613a1.124 1.124 0 001.108 1.138h1.707L9.2 19.608a1.084 1.084 0 001.157.14zM2.25 6.306h2.031l5.47-4.733v16.855L4.28 13.7h-2.03V6.306z"/></svg>'
  )}`,
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M11 1.285v17.43a1.131 1.131 0 01-.642 1.033 1.081 1.081 0 01-1.153-.14l-5.39-4.663H2.108A1.125 1.125 0 011 13.807V6.193a1.125 1.125 0 011.108-1.138h1.707L9.19.405a1.09 1.09 0 011.168-.153A1.129 1.129 0 0111 1.285zm8.607 5.922l-1.414-1.414L15.9 8.086l-2.293-2.293-1.414 1.414L14.486 9.5l-2.293 2.293 1.414 1.414 2.293-2.293 2.293 2.293 1.414-1.414L17.314 9.5l2.293-2.293z"/></svg>'
  )}`
);
let hf = class extends se {
  constructor() {
    super(...arguments), (this.hostAppType = Tr.Whatever), (this.audioIsMuted = !1);
  }
  static get styles() {
    return o`.action-button{width:100%;font-weight:600;font-size:14px;line-height:20px;text-align:left;color:#000;align-self:stretch;background:#eaedef;border:var(--pixel-border);padding:9px 0 9px 13px;cursor:pointer;margin:4px 0;display:flex;align-items:center}.action-button:active{background:linear-gradient(rgba(0,0,0,.3) 0 0),#eaedef}@media (min-width:460px){.action-button:hover{background:linear-gradient(rgba(0,0,0,.2) 0 0),#eaedef}}.setting-icon{width:20px;height:20px;font-size:20px;margin-right:8px}`;
  }
  toggleMute() {
    (this.audioIsMuted = !this.audioIsMuted),
      _p(Tp)(this.audioIsMuted),
      null == ri || ri.toggleSound({ isOn: !this.audioIsMuted });
    try {
      localStorage.setItem("ml-muted-state", JSON.stringify(this.audioIsMuted));
    } catch (e) {
      _r(e);
    }
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      (this.audioIsMuted = JSON.parse(`${localStorage.getItem("ml-muted-state")}`)), _p(Tp)(this.audioIsMuted);
    } catch (e) {
      _r(e);
    }
  }
  render() {
    return j` <button class="action-button" @click="${this.toggleMute}"> ${
      this.hostAppType === Tr.WebDesktop
        ? this.audioIsMuted
          ? j`<icon-volume-mute fill class="setting-icon"></icon-volume-mute>Sound Off`
          : j`<icon-volume fill class="setting-icon"></icon-volume>Sound On`
        : j`<icon-volume fill class="setting-icon"></icon-volume>Sound (On/Off)`
    } </button> `;
  }
};
$e([er({ context: Fo })], hf.prototype, "hostAppType", void 0),
  $e([Be()], hf.prototype, "audioIsMuted", void 0),
  (hf = $e([Fe("garlic-bread-mute-button")], hf));
let df = class extends se {
  constructor() {
    super(...arguments), (this.height = "24"), (this.width = "24"), (this.fill = !1);
  }
  static get styles() {
    return o`svg{display:block}`;
  }
  render() {
    return j` <svg width="${this.width}" height="${
      this.height
    }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M23.88 3.3V4.8C23.005 4.80064 22.166 5.14852 21.5473 5.76725C20.9285 6.38598 20.5806 7.22498 20.58 8.1H19.08C19.0791 7.2257 18.7316 6.38743 18.1137 5.76887C17.4958 5.15031 16.6579 4.8019 15.7836 4.8V3.3C16.6579 3.29809 17.4958 2.94969 18.1137 2.33113C18.7316 1.71257 19.0791 0.874299 19.08 0H20.58C20.5806 0.875019 20.9285 1.71402 21.5473 2.33275C22.166 2.95148 23.005 3.29936 23.88 3.3ZM22.08 18.6C21.3642 18.599 20.678 18.3143 20.1719 17.8081C19.6657 17.302 19.381 16.6158 19.38 15.9H17.88C17.8791 16.6158 17.5943 17.302 17.0881 17.8081C16.582 18.3143 15.8958 18.599 15.18 18.6V20.1C15.8958 20.101 16.582 20.3857 17.0881 20.8919C17.5943 21.398 17.8791 22.0842 17.88 22.8H19.38C19.381 22.0842 19.6657 21.398 20.1719 20.8919C20.678 20.3857 21.3642 20.101 22.08 20.1V18.6ZM20.46 12.7704V11.2296L19.8288 11.1288C14.3796 10.2564 12.0288 7.8996 11.1588 2.4312L11.058 1.8H9.462L9.36 2.4312C8.4912 7.8996 6.1404 10.2564 0.692403 11.1288L0.0600033 11.2296V12.7704L0.692403 12.8712C6.1404 13.7436 8.4924 16.1004 9.3612 21.5688L9.462 22.2H11.058L11.1588 21.5688C12.0288 16.1004 14.3796 13.7436 19.8288 12.8712L20.46 12.7704Z" fill="${
      this.fill ? "black" : "white"
    }"/> </svg> `;
  }
};
$e([Ue({ type: String })], df.prototype, "height", void 0),
  $e([Ue({ type: String })], df.prototype, "width", void 0),
  $e([Ue({ type: Boolean })], df.prototype, "fill", void 0),
  (df = $e([Fe("garlic-bread-icon-sparks")], df));
let pf = class extends se {
  constructor() {
    super(...arguments), (this.height = "24"), (this.width = "22");
  }
  static get styles() {
    return o`svg{display:block}`;
  }
  render() {
    return j` <svg width="${this.width}" height="${this.height}" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2.52802 8.43719L4.04102 12.0302L2.34102 12.7462C2.18798 12.8095 2.01605 12.8095 1.86302 12.7462C1.78682 12.7152 1.71749 12.6694 1.65898 12.6116C1.60046 12.5538 1.55392 12.485 1.52202 12.4092L0.500015 9.97119C0.468082 9.89555 0.451365 9.81436 0.450819 9.73226C0.450274 9.65016 0.465909 9.56875 0.496833 9.49269C0.527758 9.41664 0.573364 9.34742 0.631047 9.28899C0.688731 9.23057 0.75736 9.18408 0.833015 9.15219L2.52802 8.43719ZM3.91702 6.97319C3.77132 7.04183 3.65781 7.16414 3.60022 7.31454C3.54263 7.46495 3.54542 7.63179 3.60802 7.78019L5.26602 11.7172C5.31366 11.8306 5.39373 11.9275 5.4962 11.9956C5.59867 12.0638 5.71897 12.1001 5.84202 12.1002C5.91607 12.1 5.98951 12.0868 6.05902 12.0612L15.178 8.67819L12.709 2.81419L3.91702 6.97319ZM19.786 6.90019L17.194 0.745186C17.1622 0.669324 17.1158 0.600494 17.0573 0.542654C16.9988 0.484814 16.9295 0.439106 16.8533 0.408159C16.7771 0.377211 16.6955 0.361636 16.6132 0.362327C16.531 0.363018 16.4497 0.379963 16.374 0.412186L14.131 1.36619C13.9788 1.43098 13.8585 1.55347 13.7965 1.70679C13.7345 1.86012 13.7357 2.03179 13.8 2.18419L16.391 8.33819C16.456 8.49095 16.5785 8.612 16.732 8.67519C16.8068 8.70512 16.8865 8.72073 16.967 8.72119C17.0512 8.72103 17.1345 8.70403 17.212 8.67119L19.454 7.71819C19.6062 7.65337 19.7265 7.53095 19.7888 7.37767C19.851 7.2244 19.85 7.05274 19.786 6.90019ZM9.78602 11.9742L5.60802 19.5742L5.67902 19.6252H7.60002L10 15.3092V19.6222H12V15.2092L14.461 19.6222H16.375L16.447 19.5712L11.654 11.4002L9.78602 11.9742Z" fill="black"/> </svg> `;
  }
};
$e([Ue({ type: String })], pf.prototype, "height", void 0),
  $e([Ue({ type: String })], pf.prototype, "width", void 0),
  (pf = $e([Fe("garlic-bread-icon-telescope")], pf));
let ff = class extends se {
  static get styles() {
    return o`.action-button{width:100%;font-weight:600;font-size:14px;line-height:20px;text-align:left;color:#000;align-self:stretch;background:#eaedef;border:var(--pixel-border);padding:9px 0 9px 13px;cursor:pointer;margin:4px 0;display:flex}.action-button:active{background:linear-gradient(rgba(0,0,0,.3) 0 0),#eaedef}@media (min-width:460px){.action-button:hover{background:linear-gradient(rgba(0,0,0,.2) 0 0),#eaedef}}.setting-icon{width:20px;height:20px;font-size:20px;margin-right:8px}`;
  }
  onPipClick() {
    try {
      null == ri || ri.togglePip();
    } catch (e) {
      _r(e);
    }
  }
  render() {
    return j` <button class="action-button" @click="${this.onPipClick}"> <icon-duplicate fill class="setting-icon"></icon-duplicate>Picture-in-Picture (On/Off) </button> `;
  }
};
ff = $e([Fe("garlic-bread-pip-button")], ff);
let vf = class extends se {
  constructor() {
    super(),
      (this.hostAppType = Tr.Whatever),
      (this.isOpen = !1),
      (this.modalType = kp.Settings),
      (this.handleKeyPress = (e) => {
        "Escape" === e.key && this.handleModalClose();
      }),
      (this.handleModalTypeChange = (e) => this.dispatchEvent(Ye("change-modal-type", { modalType: e }))),
      (this.handleModalClose = () => {
        (this.header = void 0), this.handleModalTypeChange(kp.None);
      }),
      (this.onClickHowTo = () => {
        this.handleModalClose(), this.handleModalTypeChange(kp.HowTo);
      }),
      (this.onClickScan = () => {
        this.dispatchEvent(Ye("trigger-radar")), this.handleModalClose();
      }),
      (this.onClickExplore = () => {
        this.handleModalClose(), null == ri || ri.navigateToDeeplink({ link: CLIENT_CONFIG.REDDIT_ORIGIN });
      }),
      (this.renderModalBody = () => {
        switch (this.modalType) {
          case kp.Settings:
            return this.renderSettings();
          case kp.HowTo:
            return this.renderHowTo();
          case kp.CanvasHistory:
            return this.renderCanvasHistory();
          case kp.CommunityPin:
            return this.renderCommunityPin();
          case kp.None:
          default:
            return "";
        }
      }),
      (this.renderSettings = () =>
        j` <button class="action-button" @click="${
          this.onClickHowTo
        }"> <icon-info fill class="setting-icon"></icon-info> How it Works </button> <button class="action-button" @click="${
          this.onClickScan
        }"> <garlic-bread-icon-sparks fill class="setting-icon" width="20" height="20"></garlic-bread-icon-sparks> Scan for Communities </button> ${
          this.hostAppType !== Tr.WebDesktop ? j`<garlic-bread-pip-button></garlic-bread-pip-button>` : ""
        } <garlic-bread-mute-button></garlic-bread-mute-button> ${
          this.hostAppType === Tr.WebDesktop
            ? j`<button class="action-button" @click="${this.onClickExplore}"> <garlic-bread-icon-telescope class="setting-icon"></garlic-bread-icon-telescope> Explore Reddit </button>`
            : ""
        } `),
      (this.renderHowTo = () =>
        j`<div> <div class="how-to-label"> <garlic-bread-target fill="#fff" class="how-to-icon yellow"></garlic-bread-target> Add a pixel to start creating something. </div> <div class="how-to-label"> <icon-history fill class="how-to-icon blue"></icon-history> Every few minutes you can place another pixel. </div> <div class="how-to-label"> <garlic-bread-icon-sparks class="how-to-icon purple"></garlic-bread-icon-sparks> Long press or right click to scan the canvas and discover communities nearby. </div> <button class="action-button orange" @click="${this.handleModalClose}"> Let\u2019s Goooooo! </button> </div>`),
      (this.renderCanvasHistory = () =>
        j` <p> Place has ended. </p> <p> Thank you to everyone who participated. </p> <p> Maybe the real art was the friends we made along the way. </p> `),
      Cn(this, cn),
      Cn(this, ln);
  }
  static get styles() {
    return $t(
      ":host {\n  display: none;\n  width: 100vw;\n  height: 100vh;\n  z-index: 100;\n  font-family: var(--garlic-bread-font-pixel);\n}\n:host([isOpen]) {\n  display: block;\n}\n.overlay {\n  position: fixed;\n  background: rgba(0, 0, 0, 0.5);\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  width: 100vw;\n  height: 100vh;\n  z-index: 1;\n}\n.modal {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background: #ffffff;\n  display: flex;\n  flex-direction: column;\n  color: #000000;\n  width: 261px;\n  padding: 21px;\n  z-index: 1;\n  border: var(--pixel-border);\n  box-shadow: var(--pixel-box-shadow);\n}\n.modal-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.modal-header > h2 {\n  font-size: 18px;\n  line-height: 24px;\n  font-weight: 600;\n  margin: 5px 0 0;\n  padding: 0;\n}\n.modal-content {\n  display: flex;\n  flex-direction: column;\n  flex-grow: grow;\n  margin-top: 24px;\n}\n.close-button {\n  position: absolute;\n  right: 0;\n  top: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 29px;\n  height: 29px;\n  font-size: 20px;\n  cursor: pointer;\n  border-left: var(--pixel-border);\n  border-bottom: var(--pixel-border);\n}\n/**\n* For Settings modal\n*/\n.action-button {\n  width: 100%;\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 20px;\n  text-align: left;\n  color: #000000;\n  align-self: stretch;\n  background: #eaedef;\n  border: var(--pixel-border);\n  padding: 9px 0 9px 13px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n}\n.action-button.orange {\n  background-color: var(--pixel-color-orange);\n  color: #ffffff;\n  text-align: center;\n  justify-content: center;\n}\n.action-button:not(:first-child) {\n  margin-top: 4px;\n}\n.action-button:not(:last-child) {\n  margin-bottom: 4px;\n}\n.action-button:active {\n  background: linear-gradient(rgba(0, 0, 0, 0.3) 0 0), #eaedef;\n}\n.action-button.orange:active {\n  background: linear-gradient(rgba(0, 0, 0, 0.3) 0 0), var(--pixel-color-orange);\n}\n@media (min-width: 460px) {\n  .action-button:hover {\n    background: linear-gradient(rgba(0, 0, 0, 0.2) 0 0), #eaedef;\n  }\n  .action-button.orange:hover {\n    background: linear-gradient(rgba(0, 0, 0, 0.2) 0 0), var(--pixel-color-orange);\n  }\n}\n.setting-icon {\n  width: 20px;\n  height: 20px;\n  font-size: 20px;\n  margin-right: 8px;\n}\n/**\n* For HowTo modal\n*/\n.how-to-label {\n  font-weight: 400;\n  font-size: 14px;\n  line-height: 20px;\n  text-align: left;\n  color: #576f76;\n  display: flex;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.how-to-icon {\n  flex: 0 0 38px;\n  width: 38px;\n  height: 38px;\n  border: var(--pixel-border);\n  font-size: 24px;\n  color: #ffffff;\n  margin-right: 16px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.how-to-icon.yellow {\n  background-color: #e59500;\n}\n.how-to-icon.blue {\n  background-color: #0000ea;\n}\n.how-to-icon.purple {\n  background-color: #820080;\n}\n.header-point {\n  color: var(--pixel-color-orange);\n}\n"
    );
  }
  connectedCallback() {
    super.connectedCallback();
  }
  renderCommunityPin() {
    return j`<garlic-bread-community-pin-tool></garlic-bread-community-pin-tool>`;
  }
  getHeader() {
    if (this.modalType == kp.CommunityPin) {
      const { x: e, y: t } = gr({ x: cn.getState(), y: ln.getState() });
      this.header = j`Pin your community\u2019s coordinates to <span class="header-point">(${e}, ${t})</span> `;
    }
    this.modalType == kp.HowTo &&
      (this.header = "Welcome to r/place, a blank canvas redditors transform one pixel at a time");
  }
  updated(e) {
    e.has("modalType") && this.getHeader();
  }
  render() {
    return j`<div class="overlay" @click="${this.handleModalClose}" @keyup="${
      this.handleKeyPress
    }"></div> <div class="modal"> <icon-close fill class="close-button" @click="${
      this.handleModalClose
    }"></icon-close> ${
      this.header ? j`<div class="modal-header"> <h2>${this.header}</h2> </div>` : ""
    } <div class="modal-content">${this.renderModalBody()}</div> </div>`;
  }
};
var mf;
$e([er({ context: Fo })], vf.prototype, "hostAppType", void 0),
  $e([Ue({ type: Boolean, reflect: !0 })], vf.prototype, "isOpen", void 0),
  $e([Ue({ type: kp, attribute: "modal-type" })], vf.prototype, "modalType", void 0),
  $e([Be()], vf.prototype, "header", void 0),
  (vf = $e([Fe("garlic-bread-modal")], vf));
let gf = (mf = class extends vi(vf) {
  constructor() {
    super(...arguments),
      (this.state = mf.STATE_INPUT),
      (this.bannedUsersCount = 0),
      (this.banDuration = 0),
      (this.header = "Ban Users"),
      (this.handleModalClose = () => (this.resetInput(), bn.updateState(!1), (this.state = mf.STATE_INPUT), !1)),
      (this.validateUserIds = () => {
        var e;
        if (null === this.userIdsInput || null == this.userIdsInput) return;
        const t = null === (e = this.userIdsInput) || void 0 === e ? void 0 : e.value;
        if ("" === t) {
          const e = "User IDs cannot be empty";
          return this.setInputValidity(this.userIdsInput, e), !1;
        }
        const n = t.split(","),
          i = mn.getState().adminConfiguration.maxUsersPerAdminBan;
        if (n.length > i) {
          const e = `You can only ban ${i} users at a time`;
          return this.setInputValidity(this.userIdsInput, e), !1;
        }
        const r = n.filter((e) => e.trim().length < 4 || e.trim().length > 16);
        if (r.length > 0) {
          const e = `User IDs: ${r} must be between 4 and 16 characters`;
          return this.setInputValidity(this.userIdsInput, e), !1;
        }
        return this.setInputValidity(this.userIdsInput, ""), !0;
      }),
      (this.validateDuration = () => {
        var e;
        if (null === this.banDurationInput || void 0 === this.banDurationInput) return;
        const t = null === (e = this.banDurationInput) || void 0 === e ? void 0 : e.value;
        if ("" === t) {
          const e = "Duration cannot be empty";
          return this.setInputValidity(this.banDurationInput, e), !1;
        }
        if (isNaN(Number(t))) {
          const e = "Duration must be a number";
          return this.setInputValidity(this.banDurationInput, e), !1;
        }
        if (Number(t) < 0) {
          const e = "Duration must be zero (for unbanning) or a positive number";
          return this.setInputValidity(this.banDurationInput, e), !1;
        }
        return this.setInputValidity(this.banDurationInput, ""), !0;
      }),
      (this.submitBan = async () => {
        var e, t, n;
        if (!this.validateUserIds() || !this.validateDuration()) return;
        const i = null === (e = this.userIdsInput) || void 0 === e ? void 0 : e.value.split(",").map((e) => e.trim()),
          r = null === (t = this.banDurationInput) || void 0 === t ? void 0 : t.value,
          o = Number(r);
        var s;
        this.trackEvent(
          ((s = this.bannedUsersCount),
          li(
            { source: ui.GarlicBread, action: hi.Click, noun: di.AdminBan },
            { action_info: { setting_value: `ban ${s} users` } }
          ))
        );
        const a = await cp.userAdminBan({ userIDs: i, banDuration: o });
        a.type !== ap.Success
          ? this.handleErrorMessage()
          : this.handleSuccessMessage(null === (n = a.data) || void 0 === n ? void 0 : n.numUserIDs, o);
      }),
      (this.handleSubmitClick = () => {
        this.state === mf.STATE_INPUT ? this.submitBan() : (this.resetInput(), (this.state = mf.STATE_INPUT));
      });
  }
  static get styles() {
    const e = vf.styles;
    return o`${e}.ban-input{padding:8px;color:#121212;font-size:20px;position:relative;background-color:#fff;border:3px solid #000;box-sizing:border-box;width:100%}.ban-input:focus{outline:0}.ban-input:invalid{border:3px solid red}.modal-footer{display:flex;justify-content:center;margin:20px 0 0}`;
  }
  resetInput() {
    null !== this.userIdsInput && void 0 !== this.userIdsInput && (this.userIdsInput.value = ""),
      null !== this.banDurationInput &&
        void 0 !== this.banDurationInput &&
        (this.banDurationInput.value = mf.DEFAULT_VALUE);
  }
  setInputValidity(e, t) {
    e.setCustomValidity(t);
    const n = e.name;
    let i;
    "user-ids-input" === n ? (i = this.userIdsInputError) : "duration-input" === n && (i = this.banDurationInputError),
      void 0 !== i && (i.textContent = t);
  }
  handleErrorMessage() {
    this.state = mf.STATE_ERROR;
  }
  handleSuccessMessage(e, t) {
    (this.banDuration = t), (this.bannedUsersCount = void 0 !== e ? e : 0), (this.state = mf.STATE_SUCCESS);
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("keyup", this.handleKeyPress);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("keyup", this.handleKeyPress);
  }
  renderInputForm() {
    return j` <label for="message">User IDs (comma-separated):</label> <textarea class="ban-input" name="user-ids-input" rows="5"></textarea> <small class="error-message" name="user-ids-input-error"></small> <br> <label for="message">Ban Duration (seconds):</label> <input class="ban-input" name="duration-input" type="number" value="${mf.DEFAULT_VALUE}"> <small class="error-message" name="duration-input-error"></small>`;
  }
  renderErrorMessage() {
    return j`<p> Oops! Something went wrong. </p>`;
  }
  renderSuccessMessage() {
    const e = `Successfully banned ${this.bannedUsersCount} user(s).`,
      t = `Successfully unbanned ${this.bannedUsersCount} user(s).`;
    return j`<p>${0 === this.banDuration ? t : e}</p>`;
  }
  render() {
    return j`<div class="overlay" @click="${this.handleModalClose}" @keyup="${
      this.handleKeyPress
    }"></div> <div class="modal"> <div class="modal-header"> <h2>${
      this.header
    }</h2> <icon-close class="close-button" @click="${
      this.handleModalClose
    }"></icon-close> </div> <div class="modal-content"> ${
      this.state === mf.STATE_INPUT ? this.renderInputForm() : ""
    } ${this.state === mf.STATE_ERROR ? this.renderErrorMessage() : ""} ${
      this.state === mf.STATE_SUCCESS ? this.renderSuccessMessage() : ""
    } </div> <div class="modal-footer"> <garlic-bread-icon-button @click="${
      this.handleSubmitClick
    }"> <icon-checkmark></icon-checkmark> </garlic-bread-icon-button> </div> </div>`;
  }
});
function yf(e) {
  return e * Zt.Max;
}
(gf.STATE_INPUT = "input"),
  (gf.STATE_SUCCESS = "success"),
  (gf.STATE_ERROR = "error"),
  (gf.DEFAULT_VALUE = "604800"),
  $e([Ue({ type: String })], gf.prototype, "state", void 0),
  $e([Ue({ type: Number })], gf.prototype, "bannedUsersCount", void 0),
  $e([Ue({ type: Number })], gf.prototype, "banDuration", void 0),
  $e([Be()], gf.prototype, "header", void 0),
  $e([qe('textarea[name="user-ids-input"]')], gf.prototype, "userIdsInput", void 0),
  $e([qe('input[name="duration-input"]')], gf.prototype, "banDurationInput", void 0),
  $e([qe('small[name="user-ids-input-error"]')], gf.prototype, "userIdsInputError", void 0),
  $e([qe('small[name="duration-input-error"]')], gf.prototype, "banDurationInputError", void 0),
  (gf = mf = $e([Fe("garlic-bread-admin-ban")], gf));
let bf = class extends se {
  static get styles() {
    return o`svg{opacity:.3}.vertice{width:50px;height:50px;position:absolute;transform:translate(-25px,-25px);border-radius:9999px;border:var(--pixel-border);box-sizing:border-box;background-color:#fff}`;
  }
  render() {
    if (!this.shape) return "";
    const e = { x1: Number.MAX_SAFE_INTEGER, y1: Number.MAX_SAFE_INTEGER, x2: 0, y2: 0 };
    for (const t of this.shape.path)
      (e.x1 = Math.min(e.x1, t.x)),
        (e.y1 = Math.min(e.y1, t.y)),
        (e.x2 = Math.max(e.x2, t.x)),
        (e.y2 = Math.max(e.y2, t.y));
    const t = (function (e, t) {
        return e.map((e) => ({ x: e.x - t.x1, y: e.y - t.y1 }));
      })(this.shape.path, e),
      [n, ...i] = t;
    return j` <div style="${Te({
      transform: `translate(${yf(-n.x) + Zt.Max / 2}px, ${yf(-n.y) + Zt.Max / 2}px)`,
    })}"> <svg width="${yf(e.x2 - e.x1 + 1)}" height="${yf(
      e.y2 - e.y1 + 1
    )}" xmlns="http://www.w3.org/2000/svg"> ${z` <path d="M ${yf(n.x)} ${yf(n.y)} L ${i.map(
      (e) => `${yf(e.x)} ${yf(e.y)}`
    )}">`} </svg> ${t.map(
      ({ x: e, y: t }) => j`<div class="vertice" style="${Te({ top: `${yf(t)}px`, left: `${yf(e)}px` })}"></div>`
    )} </div> `;
  }
};
$e([Ue({ type: Object })], bf.prototype, "shape", void 0), (bf = $e([Fe("garlic-bread-admin-shape-tool")], bf));
let xf = class extends se {
  constructor() {
    super(), (this.count = 0), Cn(this, mn);
  }
  static get styles() {
    return o`:host{height:38px;width:260px;display:flex;justify-content:center;align-items:center;background:#fff;color:#000;font-size:14px;border:var(--pixel-border);box-shadow:var(--pixel-box-shadow);font-family:var(--garlic-bread-font-pixel)}`;
  }
  render() {
    const e = mn.getState().adminConfiguration.maxAllowedCircles;
    return 0 === this.count
      ? j`You can draw up to ${e} circles at a time`
      : this.count === e - 1
      ? j`You can draw 1 more circle`
      : this.count >= e
      ? j`Submit what you drew`
      : j`You can draw ${e - this.count} more circles`;
  }
};
$e([Ue({ type: Number })], xf.prototype, "count", void 0), (xf = $e([Fe("garlic-bread-admin-circle-tool-status")], xf));
Ir(
  "icon-aspect-rectangle",
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M1.25 6.925H0v-3.8A1.127 1.127 0 011.125 2h3.8v1.25H1.25v3.675zm3.675 9.825H1.25v-3.675H0v3.8A1.127 1.127 0 001.125 18h3.8v-1.25zM20 3.125A1.127 1.127 0 0018.875 2h-3.8v1.25h3.675v3.675H20v-3.8zm0 13.75v-3.8h-1.25v3.675h-3.675V18h3.8A1.127 1.127 0 0020 16.875z"/></svg>'
  )}`,
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2.5 3H6v2H3v3H1V4.5A1.5 1.5 0 012.5 3zm.5 9H1v3.5A1.5 1.5 0 002.5 17H6v-2H3v-3zm14 3h-3v2h3.5a1.5 1.5 0 001.5-1.5V12h-2v3zm.5-12H14v2h3v3h2V4.5A1.5 1.5 0 0017.5 3z"/></svg>'
  )}`
);
Ir(
  "icon-ban",
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M19.59 9.705l-1.062-1.061a2.606 2.606 0 00-1.856-.769h-.913l-3.634-3.634v-.912a2.597 2.597 0 00-.769-1.856L10.3.411a1.128 1.128 0 00-1.6.001L3.411 5.705a1.125 1.125 0 000 1.59l1.061 1.061a2.607 2.607 0 001.856.769h.913l.375.375-6.557 6.558a2.04 2.04 0 002.883 2.884l6.558-6.558.375.375v.913a2.608 2.608 0 00.77 1.856l1.06 1.06a1.127 1.127 0 001.591 0l5.292-5.288a1.124 1.124 0 000-1.591l.001-.004zM3.06 18.058a.79.79 0 11-1.118-1.116L8.5 10.384 9.616 11.5 3.06 18.058zm10.44-2.442l-.972-.972a1.38 1.38 0 01-.4-.972v-1.431L7.76 7.875H6.33a1.367 1.367 0 01-.973-.4L4.384 6.5 9.5 1.384l.972.972c.257.259.4.609.4.973v1.43l4.366 4.366h1.431c.364 0 .713.144.972.4l.972.972-5.113 5.119z"/></svg>'
  )}`,
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M19.918 10.5a1.114 1.114 0 01-.33.8L14.3 16.588a1.127 1.127 0 01-1.592 0l-1.06-1.06a2.608 2.608 0 01-.769-1.856v-.913L7.241 9.125h-.913a2.607 2.607 0 01-1.856-.769L3.412 7.3a1.125 1.125 0 010-1.59L8.7.412a1.128 1.128 0 011.591 0l1.061 1.062a2.601 2.601 0 01.77 1.856v.912l3.633 3.634h.913a2.607 2.607 0 011.856.769l1.061 1.061a1.12 1.12 0 01.333.794zM8.834 12.834l-1.392-1.392-.884-.884-5.5 5.5a2.04 2.04 0 002.883 2.884l5.5-5.5-.607-.608z"/></svg>'
  )}`
);
Ir(
  "icon-edit",
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M18.236 3.158l-1.4-1.4a2.615 2.615 0 00-3.667-.021L1.336 13.318a1.129 1.129 0 00-.336.8v3.757A1.122 1.122 0 002.121 19h3.757a1.131 1.131 0 00.8-.337L18.256 6.826a2.616 2.616 0 00-.02-3.668zM5.824 17.747H2.25v-3.574l9.644-9.435L15.259 8.1l-9.435 9.647zM17.363 5.952l-1.23 1.257-3.345-3.345 1.257-1.23a1.362 1.362 0 011.91.01l1.4 1.4a1.364 1.364 0 01.008 1.908z"/></svg>'
  )}`,
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M17.279 7.825l-5.107-5.107 1-.978a2.615 2.615 0 013.667.021l1.4 1.4a2.616 2.616 0 01.02 3.668l-.98.996zM1.336 13.318a1.129 1.129 0 00-.336.8v3.757A1.122 1.122 0 002.121 19h3.757a1.131 1.131 0 00.8-.337l9.2-9.406-5.136-5.141-9.406 9.202z"/></svg>'
  )}`
);
let wf = class extends se {
  constructor() {
    super(), Cn(this, bn);
  }
  static get styles() {
    return o`:host{position:absolute;z-index:1;left:16px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column}garlic-bread-icon-button{margin:16px 0}icon-aspect-rectangle,icon-ban,icon-radio-button{display:inline-flex}`;
  }
  toggleAdminEraseTool(e) {
    this.dispatchEvent(Ye("toggle-admin-erase-tool", { mode: e }));
  }
  toggleRectangleTool() {
    this.toggleAdminEraseTool(nr.Rectangle);
  }
  toggleCircleTool() {
    this.toggleAdminEraseTool(nr.Circle);
  }
  toggleShapeTool() {
    this.toggleAdminEraseTool(nr.Shape);
  }
  toggleAdminBanTool() {
    this.dispatchEvent(Ye("toggle-admin-ban-tool"));
  }
  render() {
    return j` <garlic-bread-icon-button @click="${this.toggleRectangleTool}" ?selected="${
      this.eraseToolMode === nr.Rectangle
    }"> <icon-aspect-rectangle fill></icon-aspect-rectangle> </garlic-bread-icon-button> <garlic-bread-icon-button @click="${
      this.toggleCircleTool
    }" ?selected="${
      this.eraseToolMode === nr.Circle
    }"> <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"> <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="2"/> </svg> </garlic-bread-icon-button> ${
      this.enableAdminShapeTool
        ? j` <garlic-bread-icon-button @click="${this.toggleShapeTool}" ?selected="${
            this.eraseToolMode === nr.Shape
          }"> <icon-edit fill></icon-edit> </garlic-bread-icon-button> `
        : ""
    } <garlic-bread-icon-button @click="${
      this.toggleAdminBanTool
    }" .selected="${bn.getState()}"> <icon-ban fill></icon-ban> </garlic-bread-icon-button>`;
  }
};
$e([Ue({ type: String, attribute: "erase-tool-mode" })], wf.prototype, "eraseToolMode", void 0),
  $e([Ue({ type: Boolean, attribute: "enable-admin-shape-tool" })], wf.prototype, "enableAdminShapeTool", void 0),
  (wf = $e([Fe("garlic-bread-admin-controls")], wf));
let Sf = class extends se {
  constructor() {
    super(), (this.hostAppType = Tr.Whatever), (this.browserType = Cr.Whatever), Cn(this, Kt);
  }
  static get styles() {
    return o`:host{position:relative}.container{transform-origin:top left}canvas{display:block;-ms-interpolation-mode:bicubic;image-rendering:-moz-crisp-edges;image-rendering:-webkit-optimize-contrast;image-rendering:crisp-edges;image-rendering:pixelated}`;
  }
  drawPixel({ x: e, y: t, colorIndex: n }) {
    var i;
    const r = null === (i = this.canvas) || void 0 === i ? void 0 : i.getContext("2d");
    r && ((r.fillStyle = Dn(n) || "transparent"), r.fillRect(e, t, 1, 1));
  }
  getPixelColor(e) {
    try {
      if (!this.canvas) return;
      const t = this.getImageData(e.x, e.y, 1, 1);
      if (!t) return;
      const [n, i, r] = t.data;
      return (function (e, t, n) {
        return `#${$n(e)}${$n(t)}${$n(n)}`;
      })(n, i, r);
    } catch (e) {
      return;
    }
  }
  drawImage({ image: e, x: t, y: n }) {
    var i;
    const r = null === (i = this.canvas) || void 0 === i ? void 0 : i.getContext("2d");
    r && r.drawImage(e, t, n);
  }
  drawEmptyRect({ x: e, y: t }) {
    var n;
    const i = null === (n = this.canvas) || void 0 === n ? void 0 : n.getContext("2d");
    i && ((i.fillStyle = "#ffffff"), i.fillRect(e, t, yn.getState(), gn.getState()));
  }
  initialize(e) {
    var t;
    const n = null === (t = this.canvas) || void 0 === t ? void 0 : t.getContext("2d");
    if (!n || !this.canvas) return;
    const i = Kt.getState().canvas;
    let r;
    try {
      i && (r = n.getImageData(0, 0, yn.getState(), gn.getState()));
    } catch (e) {
      _r(e);
    }
    if (((this.canvas.height = gn.getState()), (this.canvas.width = yn.getState()), r)) {
      const t = { x: 0, y: 0 };
      e && ((t.x = e.x), (t.y = e.y)), n.putImageData(r, t.x, t.y);
    }
    i || Kt.updateState(Object.assign(Object.assign({}, Kt.getState()), { canvas: !0 }));
  }
  getImageData(e, t, n, i) {
    var r, o;
    return null === (o = null === (r = this.canvas) || void 0 === r ? void 0 : r.getContext("2d")) || void 0 === o
      ? void 0
      : o.getImageData(e, t, n, i);
  }
  render() {
    const e = Xt();
    return j` <div class="container" style="${Te(
      this.hostAppType === Tr.IOS || this.browserType === Cr.Safari
        ? { zoom: `${e.max}` }
        : { transform: `scale(${e.max})` }
    )}"> <canvas></canvas> </div> `;
  }
};
$e([er({ context: Fo })], Sf.prototype, "hostAppType", void 0),
  $e([er({ context: Vo })], Sf.prototype, "browserType", void 0),
  $e([Ue({ type: Boolean, attribute: "show-canvas-history" })], Sf.prototype, "showCanvasHistory", void 0),
  $e([qe("canvas")], Sf.prototype, "canvas", void 0),
  (Sf = $e([Fe("garlic-bread-canvas")], Sf));
Ir(
  "icon-checkmark",
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M7.5 15.583a.72.72 0 01-.513-.212L1.558 9.942l.884-.884L7.5 14.116 18.058 3.558l.884.884-10.93 10.929a.723.723 0 01-.512.212z"/></svg>'
  )}`,
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M7.5 15.958a1.102 1.102 0 01-.778-.322l-5.429-5.429 1.414-1.414L7.5 13.586 17.793 3.293l1.414 1.414L8.278 15.636a1.101 1.101 0 01-.778.322z"/></svg>'
  )}`
);
let _f = class extends se {
  constructor() {
    super(),
      (this.showCanvasHistory = !1),
      (this.syncCoordinatesToHost = Qi(500, !1, () => {
        br(this.showCanvasHistory);
      })),
      Cn(this, cn),
      Cn(this, ln),
      Cn(this, hn);
  }
  updated(e) {
    this.syncCoordinatesToHost(), super.updated(e);
  }
  async copyLocationUrl() {
    try {
      await navigator.clipboard.writeText(location.href);
    } catch (e) {
      _r(e);
    }
  }
  render() {
    const e = or(),
      { x: t, y: n } = gr(e),
      i = (function () {
        const e = hn.getState(),
          t = e >= 1 ? 0 : 1;
        return e.toFixed(t).replace(/\.0+$/, "");
      })();
    return j` (${t},${n}) ${i}X `;
  }
};
$e([er({ context: xp })], _f.prototype, "showCanvasHistory", void 0), (_f = $e([Fe("garlic-bread-coordinates")], _f));
let Tf = class extends se {
  constructor() {
    super(...arguments), (this.nextTileAvailableIn = 0), (this.timerDuration = 0);
  }
  static get styles() {
    return o`.progress{opacity:1;width:100%;background:#576f76;position:absolute;left:0;top:0;right:0;bottom:0}`;
  }
  render() {
    const e = (100 / this.timerDuration) * this.nextTileAvailableIn;
    return j`<div class="progress" style="${Te({ width: `${e}%` })}"></div>`;
  }
};
$e([Ue({ type: Number, attribute: "next-tile-available-in" })], Tf.prototype, "nextTileAvailableIn", void 0),
  $e([Ue({ type: Number, attribute: "timer-duration" })], Tf.prototype, "timerDuration", void 0),
  (Tf = $e([Fe("garlic-bread-progress-bar")], Tf));
let Cf = class extends se {
  constructor() {
    super(...arguments),
      (this.hostAppType = Tr.Whatever),
      (this.showCanvasHistory = !1),
      (this.userData = Cn(this, rn)),
      (this.formatTime = (e, t) => {
        const n = `${Math.floor(e / 3600)}`.padStart(2, "0");
        return `${t ? `${n}:` : ""}${`${Math.floor((e % 3600) / 60)}`.padStart(2, "0")}:${`${Math.floor(
          e % 60
        )}`.padStart(2, "0")}`;
      });
  }
  static get styles() {
    return $t(
      ":host {\n  pointer-events: all;\n}\nbutton {\n  cursor: pointer;\n  border: none;\n  background: none;\n  padding: 0px;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n  -webkit-text-size-adjust: none;\n  -webkit-user-select: none;\n  user-select: none;\n}\n/*\n* common style for a pixeled rectangle\n*/\n.pixeled {\n  border: var(--pixel-border);\n  box-shadow: var(--pixel-box-shadow);\n  font-family: var(--garlic-bread-font-pixel);\n}\n/*\n* style for fullscreen\n*/\n.fullscreen {\n  width: 142px;\n  height: 46px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  color: #ffffff;\n  background-color: var(--pixel-color-orange);\n  font-size: 14px;\n  position: relative;\n}\n@media (min-width: 460px) {\n  .fullscreen:hover {\n    background: linear-gradient(rgba(0, 0, 0, 0.2) 0 0), var(--pixel-color-orange);\n  }\n}\n.fullscreen:active {\n  background: linear-gradient(rgba(0, 0, 0, 0.3) 0 0), var(--pixel-color-orange);\n  transform: scale(0.95, 0.95);\n}\n.fullscreen.blocked {\n  background-color: #2a3c42;\n}\n.fullscreen.counting {\n  width: 174px;\n  pointer-events: none;\n  background-color: #2a3c42;\n}\n.centered {\n  left: 50%;\n  position: fixed;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  white-space: nowrap;\n}\n.main-text {\n  font-style: normal;\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 20px;\n  margin: 0;\n  z-index: 1;\n}\n.secondary-text {\n  font-style: normal;\n  font-weight: 400;\n  font-size: 12px;\n  line-height: 16px;\n  margin: 0;\n  z-index: 1;\n}\n/*\n* style for preview\n*/\n.preview {\n  min-width: 61px;\n  background-color: #ffffff;\n  color: #0f1a1c;\n  padding: 7px 13px;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n/*\n* style for pip\n*/\n.pip {\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  border-right: var(--pixel-border);\n  border-bottom: var(--pixel-border);\n  background-color: #ffffff;\n  color: #0f1a1c;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  padding: 3px 5px;\n}\n.pip.counting {\n  min-width: 61px;\n}\n.pip-text {\n  font-style: normal;\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 16px;\n  letter-spacing: -0.1px;\n  margin: 0;\n}\nicon-history {\n  display: inline-flex;\n  font-size: 16px;\n  margin-right: 4px;\n}\n"
    );
  }
  onSignInClick() {
    null == ri || ri.signIn(wr(!1, this.showCanvasHistory));
  }
  onPlaceATileClick() {
    this.dispatchEvent(Ye("click-canvas", { x: cn.getState(), y: ln.getState() }));
  }
  confirmShape() {
    this.dispatchEvent(Ye("confirm-shape"));
  }
  render() {
    var e, t;
    const n = this.hostAppType === Tr.WebDesktop;
    return this.showCanvasHistory
      ? this.screenMode === Gt.PictureInPicture
        ? ""
        : j`<div class="${tr({
            pixeled: !0,
            preview: !0,
            centered: !n,
          })}"> <p class="main-text"> View Canvas History </p> </div>`
      : this.eraseToolMode === nr.Shape &&
        ((null === (e = this.shape) || void 0 === e ? void 0 : e.path.length) || 0) >= 3
      ? j` <button @click="${this.confirmShape}"> <div class="pixeled fullscreen"> Confirm shape </div> </button> `
      : this.eraseToolMode
      ? j` <div class="pixeled fullscreen"> Select area to erase </div> `
      : this.screenMode === Gt.PictureInPicture
      ? this.nextTileAvailableIn
        ? j`<div class="pip counting"> <icon-history fill></icon-history> <p class="pip-text">${this.formatTime(
            this.nextTileAvailableIn
          )}</p> </div>`
        : j`<div class="pip"> <p class="pip-text"> Place! </p> </div>`
      : this.screenMode === Gt.Preview
      ? this.nextTileAvailableIn
        ? j` <div class="${tr({
            pixeled: !0,
            preview: !0,
            centered: !n,
          })}"> <icon-history fill></icon-history> <p class="main-text">${this.formatTime(
            this.nextTileAvailableIn
          )}</p> </div> `
        : j`<div class="${tr({
            pixeled: !0,
            preview: !0,
            centered: !n,
          })}"> <p class="main-text"> Place Your Pixel </p> </div>`
      : (null === (t = this.userData.state()) || void 0 === t ? void 0 : t.canParticipate)
      ? this.nextTileAvailableIn
        ? j` <div class="pixeled fullscreen counting"> <div class="main-text"> Place in ${this.formatTime(
            this.nextTileAvailableIn
          )} </div> <div class="secondary-text"> <garlic-bread-coordinates></garlic-bread-coordinates> </div> <garlic-bread-progress-bar next-tile-available-in="${
            this.nextTileAvailableIn
          }" timer-duration="${this.timerDuration}"></garlic-bread-progress-bar> </div> `
        : j` <button @click="${this.onPlaceATileClick}"> <div class="pixeled fullscreen"> <div class="main-text"> Place! </div> <div class="secondary-text"> <garlic-bread-coordinates></garlic-bread-coordinates> </div> </div> </button> `
      : j` <button @click="${this.onSignInClick}"> <div class="pixeled fullscreen blocked"> <div class="main-text"> Place! </div> <div class="secondary-text"> <garlic-bread-coordinates></garlic-bread-coordinates> </div> </div> </button> `;
  }
};
$e([er({ context: Fo })], Cf.prototype, "hostAppType", void 0),
  $e([Ue({ type: Number, attribute: "next-tile-available-in" })], Cf.prototype, "nextTileAvailableIn", void 0),
  $e([Ue({ type: Number, attribute: "timer-duration" })], Cf.prototype, "timerDuration", void 0),
  $e([Ue({ type: String, attribute: "screen-mode" })], Cf.prototype, "screenMode", void 0),
  $e([Ue({ type: String, attribute: "erase-tool-mode" })], Cf.prototype, "eraseToolMode", void 0),
  $e([Ue({ type: Object, attribute: "shape" })], Cf.prototype, "shape", void 0),
  $e([er({ context: xp })], Cf.prototype, "showCanvasHistory", void 0),
  (Cf = $e([Fe("garlic-bread-status-pill")], Cf));
let Ef = class extends se {
  constructor() {
    super(),
      (this.isVisible = !1),
      (this.isLocked = !1),
      (this.circleToolPattern = ir.Solid),
      (this.shouldCenterReticle = !1),
      (this.onResize = () => {
        var e;
        this.contentHeight = null === (e = this.layout) || void 0 === e ? void 0 : e.offsetHeight;
      }),
      (this.cancelPixel = () => {
        this.dispatchEvent(Ye("cancel-pixel"));
      }),
      (this.confirmPixel = () => {
        this.dispatchEvent(Ye("confirm-pixel"));
      }),
      (this.selectCircleToolPattern = (e) => {
        const { pattern: t } = e.target.dataset;
        this.dispatchEvent(Ye("set-circle-tool-pattern", { pattern: t }));
      }),
      Cn(this, rn),
      Cn(this, mn);
  }
  static get styles() {
    return $t(
      ":host {\n  display: block;\n  background-color: #fff;\n  bottom: 0px;\n  left: 0;\n  right: 0;\n  padding: 0;\n}\n.layout {\n  padding: 16px calc(14px + var(--sail)) calc(16px + var(--saib)) calc(14px + var(--sair));\n  border-top: var(--pixel-border);\n}\n/**\n* Color palette section\n*/\n.palette {\n  bottom: 0px;\n  justify-content: center;\n  left: 0px;\n  padding: 0px;\n  position: relative;\n  margin-bottom: 16px;\n  display: grid;\n  grid: repeat(var(--colors-rows), 44px) / auto-flow 44px;\n}\n@media (max-width: 719px) {\n  .palette {\n    grid: auto-flow auto / repeat(8, 1fr);\n    place-items: stretch;\n    place-content: stretch;\n    transform: translate(calc(50% - var(--colors-multiplier) / 8 * 50%), 0px);\n  }\n}\n.color-container {\n  position: relative;\n  line-height: 0;\n}\n.color {\n  border: none;\n  position: relative;\n  outline: none;\n  height: 44px;\n  width: 44px;\n  border: 2px solid #ffffff;\n  padding: 0;\n  margin: 0;\n  background: transparent;\n  cursor: pointer;\n}\n@media (max-width: 720px) {\n  .color {\n    aspect-ratio: 1;\n    width: 100%;\n    height: 100%;\n  }\n}\n.color.selected {\n  border: 2.5px solid #000000;\n  box-shadow: var(--pixel-box-shadow);\n  z-index: 1;\n  transform: scale(1.2) perspective(1px);\n}\n.color:not([disabled]):hover + garlic-bread-tooltip {\n  display: block;\n}\n.color[disabled] {\n  cursor: not-allowed;\n  opacity: 0.3;\n}\n.color div {\n  box-sizing: border-box;\n  height: 100%;\n  width: 100%;\n}\n@supports not (aspect-ratio: 1) {\n  .color div {\n    float: left;\n    padding-top: calc(100% - 2px);\n  }\n}\ngarlic-bread-tooltip {\n  display: none;\n}\n.color-name {\n  min-width: 50px;\n}\n/**\n* Action buttons: confirmation and cancel\n*/\n.actions {\n  display: flex;\n  flex-flow: row nowrap;\n  margin: 0 auto;\n  padding: 0 2px;\n  justify-content: center;\n  max-width: calc(240px * 2 + 16px);\n}\n.action-button {\n  max-width: 240px;\n  height: 44px;\n  border: var(--pixel-border);\n  padding: 0;\n  cursor: pointer;\n  display: flex;\n  flex: 1;\n  justify-content: center;\n  align-items: center;\n}\n.cancel {\n  max-width: 240px;\n  height: 44px;\n  border: var(--pixel-border);\n  padding: 0;\n  cursor: pointer;\n  display: flex;\n  flex: 1;\n  justify-content: center;\n  align-items: center;\n  background-color: #eaedef;\n  color: #000000;\n}\n.confirm {\n  max-width: 240px;\n  height: 44px;\n  border: var(--pixel-border);\n  padding: 0;\n  cursor: pointer;\n  display: flex;\n  flex: 1;\n  justify-content: center;\n  align-items: center;\n  margin-left: 16px;\n  background: #d93a00;\n  color: #ffffff;\n  transition: background-color 0.2s ease-in-out 0s;\n}\n.confirm.disabled {\n  cursor: not-allowed;\n  background-color: #2a3c42;\n}\nicon-close,\nicon-checkmark {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n  position: relative;\n}\n.disable-default-select {\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n  -webkit-text-size-adjust: none;\n  -webkit-user-select: none;\n  user-select: none;\n}\n/**\n* Admin tools: circle tool buttons\n*/\n.circle-tool-patterns {\n  --selected-color: #000;\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: center;\n  margin-bottom: 20px;\n}\n.circle-tool-pattern {\n  max-width: 240px;\n  height: 44px;\n  border: var(--pixel-border);\n  padding: 0;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex: 1;\n  margin-right: 32px;\n}\n.circle-tool-pattern.active {\n  box-shadow: var(--pixel-box-shadow);\n  z-index: 1;\n  transform: scale(1.2) perspective(1px);\n}\n.circle-tool-pattern[data-pattern='solid'] {\n  background-color: var(--selected-color);\n}\n.circle-tool-pattern[data-pattern='random'] {\n  background: linear-gradient(217deg, #ff0000, rgba(255, 0, 0, 0) 70%), linear-gradient(127deg, #00ff00, rgba(0, 255, 0, 0) 70%), linear-gradient(336deg, #0000ff, rgba(0, 0, 255, 0) 70%);\n}\n.circle-tool-pattern[data-pattern='checkered'] {\n  --base-color: #fff;\n  background: repeating-conic-gradient(var(--selected-color) 0% 50%, var(--base-color) 0% 100%);\n  background-size: 40px;\n}\n.circle-tool-pattern:last-child {\n  margin-right: 0;\n}\n"
    );
  }
  firstUpdated(e) {
    (this.resizeObserver = new ResizeObserver(this.onResize)),
      this.layout && this.resizeObserver.observe(this.layout),
      super.firstUpdated(e);
  }
  updated(e) {
    var t;
    const n = null === (t = mn.getState()) || void 0 === t ? void 0 : t.colorPalette.colors;
    this.isVisible && !this.isLocked && 1 === n.length && this.selectColor(n[0].index), super.updated(e);
  }
  disconnectedCallback() {
    var e;
    this.layout && (null === (e = this.resizeObserver) || void 0 === e || e.unobserve(this.layout)),
      super.disconnectedCallback();
  }
  onColorClick(e) {
    var t;
    const { color: n } = null === (t = e.currentTarget) || void 0 === t ? void 0 : t.dataset;
    if (!n) return;
    const i = parseInt(n);
    isFinite(i) && this.selectColor(i);
  }
  selectColor(e) {
    this.selectedColor !== e && this.dispatchEvent(Ye("select-color", { color: e }));
  }
  renderPalette() {
    var e;
    const t = null === (e = mn.getState()) || void 0 === e ? void 0 : e.colorPalette.colors,
      n = this.eraseToolMode === nr.Circle && this.circleToolPattern === ir.Random,
      i = !n && null == this.selectedColor;
    return j` <div class="palette" style="${Te({
      "--colors-rows": "" + (t.length <= 16 ? 1 : 2),
      "--colors-multiplier": `${Math.min(t.length, 8)}`,
    })}"> ${
      null == t
        ? void 0
        : t.map((e) => {
            const t = !this.isLocked && this.selectedColor === e.index,
              i = ((r = e.index), Rn[r]());
            var r;
            return j` <div class="color-container"> <button class="color disable-default-select ${tr({
              selected: t,
            })}" data-color="${e.index}" ?disabled="${n}" @click="${this.onColorClick}"> <div style="${Te({
              backgroundColor: e.hex,
              border: `1px solid ${Nn(e.hex) && !t ? "#E9EBED" : e.hex}`,
            })}"></div> </button> ${
              i
                ? j` <garlic-bread-tooltip isOpen small> <div class="color-name disable-default-select">${i}</div> </garlic-bread-tooltip> `
                : ""
            } </div> `;
          })
    } </div> <div class="actions"> <button class="cancel disable-default-select" @click="${
      this.cancelPixel
    }"> <icon-close fill></icon-close> </button> <button class="confirm disable-default-select ${tr({
      disabled: i,
    })}" ?disabled="${i}" @click="${this.confirmPixel}"> <icon-checkmark fill></icon-checkmark> </button> </div> `;
  }
  renderCircleToolModes() {
    return j` <div class="circle-tool-patterns" style="${Te({
      "--selected-color": Dn(this.selectedColor),
    })}"> ${Object.values(ir).map(
      (e) =>
        j` <button class="${tr({
          "disable-default-select": !0,
          "circle-tool-pattern": !0,
          active: this.circleToolPattern === e,
        })}" data-pattern="${e}" @click="${this.selectCircleToolPattern}"> <div class="swatch"></div> </button> `
    )} </div> `;
  }
  render() {
    return j` <div class="container" style="${Te({
      height: `${(this.isVisible && this.contentHeight) || 0}px`,
      opacity: "" + (this.isVisible && this.contentHeight ? 1 : 0),
      visibility: "" + (this.isVisible && this.contentHeight ? "visible" : "hidden"),
      transition:
        this.isVisible && !this.shouldCenterReticle
          ? "height 0.2s ease-in-out 0.2s, opacity 0.2s ease-in-out 0.2s, visibility 0.2s ease-in-out 0.2s"
          : "height 0.2s ease-in-out 0s, opacity 0.2s ease-in-out 0s, visibility 0.2s ease-in-out 0s",
    })}"> <div class="layout"> ${
      this.eraseToolMode === nr.Circle ? j`<div>${this.renderCircleToolModes()}</div>` : ""
    } ${this.renderPalette()} </div> </div> `;
  }
};
$e([Ue({ type: Number, attribute: "color" })], Ef.prototype, "selectedColor", void 0),
  $e([Ue({ type: Boolean, attribute: "is-visible" })], Ef.prototype, "isVisible", void 0),
  $e([Ue({ type: Boolean, attribute: "is-locked" })], Ef.prototype, "isLocked", void 0),
  $e([Ue({ type: String, attribute: "erase-tool-mode" })], Ef.prototype, "eraseToolMode", void 0),
  $e([Ue({ type: String, attribute: "circle-tool-pattern" })], Ef.prototype, "circleToolPattern", void 0),
  $e([Ue({ type: Boolean, attribute: "should-center-reticle" })], Ef.prototype, "shouldCenterReticle", void 0),
  $e([Be()], Ef.prototype, "contentHeight", void 0),
  $e([qe(".layout")], Ef.prototype, "layout", void 0),
  (Ef = $e([Fe("garlic-bread-color-picker")], Ef));
Ir(
  "icon-down",
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 15.625a.624.624 0 01-.442-.183l-9-9 .884-.884L10 14.116l8.558-8.558.884.884-9 9a.624.624 0 01-.442.183z"/></svg>'
  )}`,
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 16a1 1 0 01-.707-.293l-9-9 1.414-1.414L10 13.586l8.293-8.293 1.414 1.414-9 9A1 1 0 0110 16z"/></svg>'
  )}`
);
let kf = class extends se {
  constructor() {
    super(...arguments), (this.hostAppType = Tr.Whatever);
  }
  static get styles() {
    return o`:host{z-index:1}icon-close{display:inline-flex}`;
  }
  handleClose() {
    this.hostAppType !== Tr.IOS && (an.updateState(Gt.Preview), tn.updateState(!1)),
      document.querySelectorAll("faceplate-toast").forEach((e) => {
        e.dismiss();
      }),
      null == ri || ri.close();
  }
  render() {
    return j` <garlic-bread-icon-button @click="${this.handleClose}"> ${
      this.hostAppType === Tr.WebDesktop ? j`<icon-close fill></icon-close>` : j`<icon-down fill></icon-down>`
    } </garlic-bread-icon-button>`;
  }
};
$e([er({ context: Fo })], kf.prototype, "hostAppType", void 0), (kf = $e([Fe("garlic-bread-close-button")], kf));
const Af = Zt.Max;
function Of(e) {
  return e * Zt.Max;
}
function If(e) {
  return { x: Of(e.x), y: Of(e.y), width: Of(e.width), height: Of(e.height) };
}
function Mf(e, t) {
  return `A ${Af} ${Af} 1 0 0 ${e} ${t}`;
}
function Pf(e, t = !0) {
  return t
    ? `M ${e.x} ${e.y + Af} V ${e.y + e.height - Af} ${Mf(e.x + Af, e.y + e.height)} H ${e.x + e.width - Af} ${Mf(
        e.x + e.width,
        e.y + e.height - Af
      )} V ${e.y + Af} ${Mf(e.x + e.width - Af, e.y)} H ${e.x + Af} ${Mf(e.x, e.y + Af)}`
    : `M ${e.x} ${e.y} V ${e.y + e.height} H ${e.x + e.width} V ${e.y}`;
}
let Df = class extends se {
  constructor() {
    super(), Cn(this, mn);
  }
  static get styles() {
    return o`:host{display:block;height:100%;width:100%}`;
  }
  render() {
    if (!this.activeZone) return j``;
    const e = mn.getState(),
      { width: t, height: n } = lr(e.canvasConfigurations, e.canvasWidth, e.canvasHeight);
    if (!t || !n) return j``;
    const { width: i, height: r } = cr(this.activeZone);
    if (i === t && r === n) return j``;
    const { topLeft: o, bottomRight: s } = this.activeZone,
      a = { x: 0, y: 0, width: t, height: n },
      c = { x: o.x, y: o.y, width: s.x - o.x + 1, height: s.y - o.y + 1 },
      l = (function (e, t) {
        return { x: e.x - t, y: e.y - t, width: e.width + 2 * t, height: e.height + 2 * t };
      })(c, 3);
    return j` <svg width="${Of(t)}" height="${Of(
      n
    )}" xmlns="http://www.w3.org/2000/svg"> ${z` <defs> <pattern id="fog-solid" patternUnits="userSpaceOnUse" width="100" height="100"> <rect fill="#c7c4c4" x="0" y="0" width="100" height="100"></rect> <line stroke="#000" x1="0" x2="100" y1="0" y2="0"></line> <line stroke="#000" x1="0" x2="100" y1="50" y2="50"></line> <line stroke="#000" x1="0" x2="100" y1="100" y2="100"></line> <line stroke="#000" x1="0" x2="0" y1="0" y2="100"></line> <line stroke="#000" x1="50" x2="50" y1="0" y2="100"></line> <line stroke="#000" x1="100" x2="100" y1="00" y2="100"></line> </pattern> <pattern id="fog-thick" patternUnits="userSpaceOnUse" width="10" height="10"> <path fill-rule="evenodd" fill="#c7c4c4" d="M 0 1.25 L 1.25 0 H 3.75 L 5 1.25 L 6.25 0 H 8.75 L 10 1.25 V 3.75 L 8.75 5 L 10 6.25 V 8.75 L 8.75 10 H 6.25 L 5 8.75 L 3.75 10 H 1.25 L 0 8.75 V 6.25 L 1.25 5 L 0 3.75 V 1.25 Z M 3.75 5 L 5 3.75 L 6.25 5 L 5 6.25 L 3.75 5"></path> </pattern> <pattern id="fog-medium" patternUnits="userSpaceOnUse" width="10" height="10"> <path fill-rule="evenodd" fill="#c7c4c4" d="M 0 2.5 L 2.5 0 L 5 2.5 L 7.5 0 L 10 2.5 L 7.5 5 L 10 7.5 L 7.5 10 L 5 7.5 L 2.5 10 L 0 7.5 L 2.5 5 L 5 7.5 L 7.5 5 L 5 2.5 L 2.5 5 L 0 2.5"></path> </pattern> <pattern id="fog-thin" patternUnits="userSpaceOnUse" width="10" height="10"> <path fill-rule="evenodd" fill="#c7c4c4" d="M 1.25 2.5 L 2.5 1.25 L 3.75 2.5 L 2.5 3.75 Z M 6.25 2.5 L 7.5 1.25 L 8.75 2.5 L 7.5 3.75 Z M 1.25 7.5 L 2.5 6.25 L 3.75 7.5 L 2.5 8.75 Z M 6.25 7.5 L 7.5 6.25 L 8.75 7.5 L 7.5 8.75"></path> </pattern> </defs> <g fill-rule="evenodd"> <path fill="url(#fog-solid)" d="${Pf(
      If(a),
      !1
    )} Z ${Pf(If(l))}"></path> <path fill="#fff" d="${Pf(If(l))} Z ${Pf(
      If(c)
    )}"></path> <path fill="url(#fog-medium)" d="${Pf(If(l))} Z ${Pf(If(c))}"></path> </g> `} </svg> `;
  }
};
$e([Ue({ type: Object, attribute: "active-zone" })], Df.prototype, "activeZone", void 0),
  (Df = $e([Fe("garlic-bread-fog-of-war")], Df));
const Rf = vi(se);
let Nf = class extends Rf {
  static get styles() {
    return o`icon-help{display:inline-flex}`;
  }
  handleClick() {
    this.trackEvent(li({ source: ui.GarlicBread, action: hi.Click, noun: di.Tutorial }));
  }
  render() {
    return j` <garlic-bread-icon-button @click="${this.handleClick}"> <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"> <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm4-2a2 2 0 100 4 2 2 0 000-4zm6 0a2 2 0 100 4 2 2 0 000-4z"/> </svg> </garlic-bread-icon-button>`;
  }
};
Nf = $e([Fe("garlic-bread-help-button")], Nf);
let $f = class extends se {
  constructor() {
    super(),
      (this.onKeyUp = (e) => {
        "Escape" === e.key && this.dispatchEvent(Ye("cancel-pixel"));
      }),
      Cn(this, xn);
  }
  static get styles() {
    return o`.pixel{display:block;border:5px solid #fff;box-sizing:border-box}`;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("keyup", this.onKeyUp);
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("keyup", this.onKeyUp);
  }
  calculateDimension(e, t, n) {
    if (t.length <= 1 || n) return 100;
    return 100 * (Math.abs(t[0][e] - t[1][e]) + 1);
  }
  renderRectangularPreview() {
    const e = pr(),
      t = this.calculateDimension("y", xn.getState(), e),
      n = this.calculateDimension("x", xn.getState(), e);
    return j` <div class="pixel" style="${Te({
      height: `${t}%`,
      width: `${n}%`,
      background:
        "number" == typeof this.color
          ? Dn(this.color)
          : "repeating-linear-gradient(\n      135deg,\n      rgba(255, 255, 255, 0.4),\n      rgba(255, 255, 255, 0.4) 10px,\n      rgba(0,0,0, 0.1) 10px,\n      rgba(0,0,0, 0.1) 20px\n    )",
    })}"></div> `;
  }
  render() {
    return this.eraseToolMode === nr.Rectangle ? this.renderRectangularPreview() : "";
  }
};
$e([Ue({ type: Number, reflect: !0 })], $f.prototype, "color", void 0),
  $e([Ue({ type: String, attribute: "erase-tool-mode" })], $f.prototype, "eraseToolMode", void 0),
  ($f = $e([Fe("garlic-bread-erasure-preview")], $f));
let Lf = class extends se {
  constructor() {
    super(...arguments), (this.height = "28"), (this.width = "26"), (this.fill = "#E2E7E9");
  }
  static get styles() {
    return o`svg{display:block}`;
  }
  render() {
    return j` <svg fill="none" width="${this.width}" height="${this.height}" viewBox="0 0 26 28" xmlns="http://www.w3.org/2000/svg"> <rect x="3" y="3" width="3" height="7" fill="black"/> <rect width="3" height="7" transform="matrix(-1 0 0 1 23 3)" fill="black"/> <rect width="3" height="7" transform="matrix(-1 0 0 1 26 3)" fill="${this.fill}"/> <rect y="3" width="3" height="7" fill="${this.fill}"/> <rect width="3" height="7" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 23 26)" fill="${this.fill}"/> <rect x="3" y="26" width="3" height="7" transform="rotate(-90 3 26)" fill="${this.fill}"/> <rect width="3" height="10" transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 26 3)" fill="${this.fill}"/> <rect y="3" width="3" height="10" transform="rotate(-90 0 3)" fill="${this.fill}"/> <rect width="3" height="10" transform="matrix(1 5.56363e-08 5.56363e-08 -1 23 26)" fill="${this.fill}"/> <rect x="3" y="26" width="3" height="10" transform="rotate(180 3 26)" fill="${this.fill}"/> <rect x="3" y="23" width="3" height="7" transform="rotate(-90 3 23)" fill="black"/> <rect width="3" height="7" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 23 23)" fill="black"/> <rect x="10" y="3" width="3" height="7" transform="rotate(90 10 3)" fill="black"/> <rect opacity="0.5" x="10" y="26" width="2" height="10" transform="rotate(90 10 26)" fill="black"/> <rect opacity="0.5" x="26" y="26" width="2" height="10" transform="rotate(90 26 26)" fill="black"/> <rect opacity="0.5" x="10" y="6" width="2" height="4" transform="rotate(90 10 6)" fill="black"/> <rect opacity="0.5" x="6" y="10" width="2" height="6" transform="rotate(90 6 10)" fill="black"/> <rect opacity="0.5" x="26" y="10" width="2" height="6" transform="rotate(90 26 10)" fill="black"/> <rect opacity="0.5" x="20" y="6" width="2" height="4" transform="rotate(90 20 6)" fill="black"/> <rect width="3" height="7" transform="matrix(4.37114e-08 1 1 -4.37114e-08 16 3)" fill="black"/> <rect x="3" y="16" width="3" height="7" fill="black"/> <rect width="3" height="7" transform="matrix(-1 0 0 1 23 16)" fill="black"/> </svg> `;
  }
};
$e([Ue({ type: String })], Lf.prototype, "height", void 0),
  $e([Ue({ type: String })], Lf.prototype, "width", void 0),
  $e([Ue({ type: String })], Lf.prototype, "fill", void 0),
  (Lf = $e([Fe("garlic-bread-target")], Lf));
let jf = class extends se {
  static get styles() {
    return o`.pixel{display:block;transform:translate(-11px,-8px);width:100%;height:100%}:host([color]) .pixel{border:var(--pixel-border);box-shadow:2px 2px 0 rgba(0,0,0,.5);transform:translate(-3px,-3px)}`;
  }
  render() {
    return j` <div class="pixel" style="${Te({ backgroundColor: Dn(this.color) })}"> ${
      "number" != typeof this.color ? j`<garlic-bread-target height="141%" width="146%"></garlic-bread-target>` : ""
    } </div> `;
  }
};
$e([Ue({ type: Number, reflect: !0 })], jf.prototype, "color", void 0),
  (jf = $e([Fe("garlic-bread-pixel-preview")], jf));
let zf = class extends se {
  constructor() {
    super(), Cn(this, dn);
  }
  static get styles() {
    return $t(
      ":host {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  width: 100%;\n}\n.pixeled {\n  border: var(--pixel-border);\n  font-family: var(--garlic-bread-font-pixel);\n}\ninput {\n  pointer-events: all;\n  display: block;\n  -webkit-appearance: none;\n  margin: 0;\n  outline: none;\n  position: relative;\n  cursor: pointer;\n  background: none;\n  width: 100%;\n  height: 40px;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n  -webkit-text-size-adjust: none;\n  -webkit-user-select: none;\n  user-select: none;\n}\ninput::-moz-range-thumb {\n  box-shadow: var(--pixel-box-shadow);\n  border: none;\n  cursor: pointer;\n  background: #ffffff;\n  width: 60px;\n  height: 36px;\n}\ninput::-webkit-slider-thumb {\n  box-shadow: var(--pixel-box-shadow);\n  -webkit-appearance: none;\n  appearance: none;\n  border: none;\n  cursor: pointer;\n  background: #ffffff;\n  width: 60px;\n  height: 36px;\n}\n.line {\n  box-shadow: var(--pixel-box-shadow);\n  box-sizing: border-box;\n  position: absolute;\n  top: 20px;\n  transform: translateY(-50%);\n  height: 16px;\n  width: 100%;\n  background: #fff;\n}\n.progress {\n  background-color: #ff4500;\n  position: relative;\n  height: 100%;\n}\n.timestamp-box {\n  position: absolute;\n  width: calc(100% - 60px);\n}\n.timestamp {\n  background-color: #fff;\n  box-sizing: border-box;\n  position: absolute;\n  width: 60px;\n  transform: translate(-50%, -50%);\n  height: 36px;\n  color: #000000;\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 20px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n"
    );
  }
  firstUpdated(e) {
    var t;
    try {
      null === (t = this.input) || void 0 === t || t.focus();
    } catch (e) {}
    super.firstUpdated(e);
  }
  onRangeInput(e) {
    const t = parseInt(e.currentTarget.value);
    isFinite(t) && this.dispatchEvent(Ye("change-timestamp", { timestamp: t }));
  }
  render() {
    const e = dn.getState(),
      t = ((e - Ht) / (Bt - Ht)) * 100;
    return j` <input type="range" min="${Ht}" max="${Bt}" step="${Vt}" .value="${`${e}`}" @input="${
      this.onRangeInput
    }" @change="${this.onRangeInput}"> <div class="line pixeled"> <div class="progress" style="${Te({
      width: `${t}%`,
    })}"></div> </div> <div class="timestamp-box"> <div class="pixeled timestamp" style="${Te({
      left: `${t}%`,
    })}"> ${(function (e) {
      const t = e - Ht;
      return t < 0
        ? "00:00"
        : `${`${Math.floor(t / Ft)}`.padStart(2, "0")}:${`${Math.floor((t % Ft) / zt)}`.padStart(2, "0")}`;
    })(e)} </div> </div> `;
  }
};
$e([qe("input")], zf.prototype, "input", void 0), (zf = $e([Fe("garlic-bread-scrubber")], zf));
Ir(
  "icon-share-android",
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M16 13a2.983 2.983 0 00-2.35 1.157l-6.785-3.314a2.7 2.7 0 00.029-1.591l6.774-3.387A2.984 2.984 0 1013 4c.003.253.039.504.106.748L6.33 8.135a3 3 0 10-.063 3.807l6.83 3.336A2.968 2.968 0 0013 16a3 3 0 103-3zm0-10.75a1.75 1.75 0 110 3.5 1.75 1.75 0 010-3.5zm-12 9.5a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zm12 6a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5z"/></svg>'
  )}`,
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M16 13c-.786 0-1.54.31-2.1.862l-6.947-3.394c.028-.155.044-.311.047-.468a2.914 2.914 0 00-.037-.364l6.96-3.48A2.994 2.994 0 1013 4c.005.122.017.243.037.363l-6.961 3.48a3.005 3.005 0 10-.083 4.382l7.04 3.439c-.017.111-.028.223-.033.336a3 3 0 103-3z"/></svg>'
  )}`
);
Ir(
  "icon-share-ios",
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M19 11v5.378A2.625 2.625 0 0116.378 19H3.622A2.625 2.625 0 011 16.378V11h1.25v5.378a1.373 1.373 0 001.372 1.372h12.756a1.373 1.373 0 001.372-1.372V11H19zM9.375 3.009V14h1.25V3.009l2.933 2.933.884-.884-4-4a.624.624 0 00-.884 0l-4 4 .884.884 2.933-2.933z"/></svg>'
  )}`,
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M19 11v5a3 3 0 01-3 3H4a3 3 0 01-3-3v-5h2v5a1 1 0 001 1h12a1 1 0 001-1v-5h2zM9 4.414V14h2V4.414l2.293 2.293 1.414-1.414-4-4a1 1 0 00-1.414 0l-4 4 1.414 1.414L9 4.414z"/></svg>'
  )}`
);
var Ff;
Ir(
  "icon-share",
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M18.942 7.058L12.8.912l-.883.883 5.079 5.08h-2.871A13.189 13.189 0 001.067 18h1.267a11.94 11.94 0 0111.79-9.875h2.867l-5.08 5.08.884.883 6.147-6.146a.626.626 0 000-.884z"/></svg>'
  )}`,
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M19.207 6.793L13.061.646l-1.415 1.415 4.44 4.439H14A13.507 13.507 0 00.658 18h2.028A11.5 11.5 0 0114 8.5h2.086l-4.44 4.439 1.415 1.415 6.146-6.147a1 1 0 000-1.414z"/></svg>'
  )}`
),
  (function (e) {
    (e.Coordinates = "coordinate"), (e.Image = "canvas_image"), (e.URL = "url");
  })(Ff || (Ff = {}));
const Vf = vi(se);
let Uf = class extends Vf {
  constructor() {
    super(...arguments), (this.hostAppType = Tr.Whatever);
  }
  static get styles() {
    return o`icon-share,icon-share-android,icon-share-ios{display:inline-flex}`;
  }
  share() {
    this.dispatchEvent(Ye("share", { mode: Ff.URL })),
      this.trackEvent(li({ source: ui.GarlicBread, action: hi.Click, noun: di.Share }));
  }
  render() {
    return this.hostAppType === Tr.IOS
      ? j` <garlic-bread-icon-button @click="${this.share}"> <icon-share-ios fill></icon-share-ios> </garlic-bread-icon-button> `
      : this.hostAppType === Tr.Android
      ? j` <garlic-bread-icon-button @click="${this.share}"> <icon-share-android fill></icon-share-android> </garlic-bread-icon-button> `
      : j` <garlic-bread-icon-button @click="${this.share}"> <icon-share fill></icon-share> </garlic-bread-icon-button> `;
  }
};
function Bf(e, t) {
  return (
    (Bf = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (e, t) {
          return (e.__proto__ = t), e;
        }),
    Bf(e, t)
  );
}
function Hf(e) {
  return (
    (Hf = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        }),
    Hf(e)
  );
}
function qf(e, t, n) {
  return (
    (qf = (function () {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
      } catch (e) {
        return !1;
      }
    })()
      ? Reflect.construct.bind()
      : function (e, t, n) {
          var i = [null];
          i.push.apply(i, t);
          var r = new (Function.bind.apply(e, i))();
          return n && Bf(r, n.prototype), r;
        }),
    qf.apply(null, arguments)
  );
}
function Qf(e) {
  var t = "function" == typeof Map ? new Map() : void 0;
  return (
    (Qf = function (e) {
      if (null === e || ((n = e), -1 === Function.toString.call(n).indexOf("[native code]"))) return e;
      var n;
      if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
      if (void 0 !== t) {
        if (t.has(e)) return t.get(e);
        t.set(e, i);
      }
      function i() {
        return qf(e, arguments, Hf(this).constructor);
      }
      return (
        (i.prototype = Object.create(e.prototype, {
          constructor: { value: i, enumerable: !1, writable: !0, configurable: !0 },
        })),
        Bf(i, e)
      );
    }),
    Qf(e)
  );
}
$e([er({ context: Fo })], Uf.prototype, "hostAppType", void 0), (Uf = $e([Fe("garlic-bread-share-button")], Uf));
var Gf = {
  1: "Passed invalid arguments to hsl, please pass multiple numbers e.g. hsl(360, 0.75, 0.4) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75 }).\n\n",
  2: "Passed invalid arguments to hsla, please pass multiple numbers e.g. hsla(360, 0.75, 0.4, 0.7) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75, alpha: 0.7 }).\n\n",
  3: "Passed an incorrect argument to a color function, please pass a string representation of a color.\n\n",
  4: "Couldn't generate valid rgb string from %s, it returned %s.\n\n",
  5: "Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.\n\n",
  6: "Passed invalid arguments to rgb, please pass multiple numbers e.g. rgb(255, 205, 100) or an object e.g. rgb({ red: 255, green: 205, blue: 100 }).\n\n",
  7: "Passed invalid arguments to rgba, please pass multiple numbers e.g. rgb(255, 205, 100, 0.75) or an object e.g. rgb({ red: 255, green: 205, blue: 100, alpha: 0.75 }).\n\n",
  8: "Passed invalid argument to toColorString, please pass a RgbColor, RgbaColor, HslColor or HslaColor object.\n\n",
  9: "Please provide a number of steps to the modularScale helper.\n\n",
  10: "Please pass a number or one of the predefined scales to the modularScale helper as the ratio.\n\n",
  11: 'Invalid value passed as base to modularScale, expected number or em string but got "%s"\n\n',
  12: 'Expected a string ending in "px" or a number passed as the first argument to %s(), got "%s" instead.\n\n',
  13: 'Expected a string ending in "px" or a number passed as the second argument to %s(), got "%s" instead.\n\n',
  14: 'Passed invalid pixel value ("%s") to %s(), please pass a value like "12px" or 12.\n\n',
  15: 'Passed invalid base value ("%s") to %s(), please pass a value like "12px" or 12.\n\n',
  16: "You must provide a template to this method.\n\n",
  17: "You passed an unsupported selector state to this method.\n\n",
  18: "minScreen and maxScreen must be provided as stringified numbers with the same units.\n\n",
  19: "fromSize and toSize must be provided as stringified numbers with the same units.\n\n",
  20: "expects either an array of objects or a single object with the properties prop, fromSize, and toSize.\n\n",
  21: "expects the objects in the first argument array to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
  22: "expects the first argument object to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
  23: "fontFace expects a name of a font-family.\n\n",
  24: "fontFace expects either the path to the font file(s) or a name of a local copy.\n\n",
  25: "fontFace expects localFonts to be an array.\n\n",
  26: "fontFace expects fileFormats to be an array.\n\n",
  27: "radialGradient requries at least 2 color-stops to properly render.\n\n",
  28: "Please supply a filename to retinaImage() as the first argument.\n\n",
  29: "Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.\n\n",
  30: "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
  31: "The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation\n\n",
  32: "To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s')\n\n",
  33: "The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation\n\n",
  34: "borderRadius expects a radius value as a string or number as the second argument.\n\n",
  35: 'borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.\n\n',
  36: "Property must be a string value.\n\n",
  37: "Syntax Error at %s.\n\n",
  38: "Formula contains a function that needs parentheses at %s.\n\n",
  39: "Formula is missing closing parenthesis at %s.\n\n",
  40: "Formula has too many closing parentheses at %s.\n\n",
  41: "All values in a formula must have the same unit or be unitless.\n\n",
  42: "Please provide a number of steps to the modularScale helper.\n\n",
  43: "Please pass a number or one of the predefined scales to the modularScale helper as the ratio.\n\n",
  44: "Invalid value passed as base to modularScale, expected number or em/rem string but got %s.\n\n",
  45: "Passed invalid argument to hslToColorString, please pass a HslColor or HslaColor object.\n\n",
  46: "Passed invalid argument to rgbToColorString, please pass a RgbColor or RgbaColor object.\n\n",
  47: "minScreen and maxScreen must be provided as stringified numbers with the same units.\n\n",
  48: "fromSize and toSize must be provided as stringified numbers with the same units.\n\n",
  49: "Expects either an array of objects or a single object with the properties prop, fromSize, and toSize.\n\n",
  50: "Expects the objects in the first argument array to have the properties prop, fromSize, and toSize.\n\n",
  51: "Expects the first argument object to have the properties prop, fromSize, and toSize.\n\n",
  52: "fontFace expects either the path to the font file(s) or a name of a local copy.\n\n",
  53: "fontFace expects localFonts to be an array.\n\n",
  54: "fontFace expects fileFormats to be an array.\n\n",
  55: "fontFace expects a name of a font-family.\n\n",
  56: "linearGradient requries at least 2 color-stops to properly render.\n\n",
  57: "radialGradient requries at least 2 color-stops to properly render.\n\n",
  58: "Please supply a filename to retinaImage() as the first argument.\n\n",
  59: "Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.\n\n",
  60: "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
  61: "Property must be a string value.\n\n",
  62: "borderRadius expects a radius value as a string or number as the second argument.\n\n",
  63: 'borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.\n\n',
  64: "The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation.\n\n",
  65: "To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s').\n\n",
  66: "The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation.\n\n",
  67: "You must provide a template to this method.\n\n",
  68: "You passed an unsupported selector state to this method.\n\n",
  69: 'Expected a string ending in "px" or a number passed as the first argument to %s(), got %s instead.\n\n',
  70: 'Expected a string ending in "px" or a number passed as the second argument to %s(), got %s instead.\n\n',
  71: 'Passed invalid pixel value %s to %s(), please pass a value like "12px" or 12.\n\n',
  72: 'Passed invalid base value %s to %s(), please pass a value like "12px" or 12.\n\n',
  73: "Please provide a valid CSS variable.\n\n",
  74: "CSS variable not found and no default was provided.\n\n",
  75: "important requires a valid style object, got a %s instead.\n\n",
  76: "fromSize and toSize must be provided as stringified numbers with the same units as minScreen and maxScreen.\n\n",
  77: 'remToPx expects a value in "rem" but you provided it in "%s".\n\n',
  78: 'base must be set in "px" or "%" but you set it in "%s".\n',
};
function Wf() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  var i,
    r = t[0],
    o = [];
  for (i = 1; i < t.length; i += 1) o.push(t[i]);
  return (
    o.forEach(function (e) {
      r = r.replace(/%[a-z]/, e);
    }),
    r
  );
}
var Yf = (function (e) {
  var t, n;
  function i(t) {
    var n;
    if ("production" === process.env.NODE_ENV)
      n =
        e.call(
          this,
          "An error occurred. See https://github.com/styled-components/polished/blob/main/src/internalHelpers/errors.md#" +
            t +
            " for more information."
        ) || this;
    else {
      for (var i = arguments.length, r = new Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++) r[o - 1] = arguments[o];
      n = e.call(this, Wf.apply(void 0, [Gf[t]].concat(r))) || this;
    }
    return (function (e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    })(n);
  }
  return (n = e), ((t = i).prototype = Object.create(n.prototype)), (t.prototype.constructor = t), Bf(t, n), i;
})(Qf(Error));
function Zf(e) {
  return Math.round(255 * e);
}
function Xf(e, t, n) {
  return Zf(e) + "," + Zf(t) + "," + Zf(n);
}
function Kf(e, t, n, i) {
  if ((void 0 === i && (i = Xf), 0 === t)) return i(n, n, n);
  var r = (((e % 360) + 360) % 360) / 60,
    o = (1 - Math.abs(2 * n - 1)) * t,
    s = o * (1 - Math.abs((r % 2) - 1)),
    a = 0,
    c = 0,
    l = 0;
  r >= 0 && r < 1
    ? ((a = o), (c = s))
    : r >= 1 && r < 2
    ? ((a = s), (c = o))
    : r >= 2 && r < 3
    ? ((c = o), (l = s))
    : r >= 3 && r < 4
    ? ((c = s), (l = o))
    : r >= 4 && r < 5
    ? ((a = s), (l = o))
    : r >= 5 && r < 6 && ((a = o), (l = s));
  var u = n - o / 2;
  return i(a + u, c + u, l + u);
}
var Jf = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "00ffff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000",
  blanchedalmond: "ffebcd",
  blue: "0000ff",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "00ffff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "ff00ff",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslategray: "789",
  lightslategrey: "789",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "0f0",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "f0f",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370db",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "db7093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "639",
  red: "f00",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  wheat: "f5deb3",
  white: "fff",
  whitesmoke: "f5f5f5",
  yellow: "ff0",
  yellowgreen: "9acd32",
};
var ev = /^#[a-fA-F0-9]{6}$/,
  tv = /^#[a-fA-F0-9]{8}$/,
  nv = /^#[a-fA-F0-9]{3}$/,
  iv = /^#[a-fA-F0-9]{4}$/,
  rv = /^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i,
  ov = /^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i,
  sv = /^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i,
  av =
    /^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
function cv(e) {
  if ("string" != typeof e) throw new Yf(3);
  var t = (function (e) {
    if ("string" != typeof e) return e;
    var t = e.toLowerCase();
    return Jf[t] ? "#" + Jf[t] : e;
  })(e);
  if (t.match(ev))
    return {
      red: parseInt("" + t[1] + t[2], 16),
      green: parseInt("" + t[3] + t[4], 16),
      blue: parseInt("" + t[5] + t[6], 16),
    };
  if (t.match(tv)) {
    var n = parseFloat((parseInt("" + t[7] + t[8], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + t[1] + t[2], 16),
      green: parseInt("" + t[3] + t[4], 16),
      blue: parseInt("" + t[5] + t[6], 16),
      alpha: n,
    };
  }
  if (t.match(nv))
    return {
      red: parseInt("" + t[1] + t[1], 16),
      green: parseInt("" + t[2] + t[2], 16),
      blue: parseInt("" + t[3] + t[3], 16),
    };
  if (t.match(iv)) {
    var i = parseFloat((parseInt("" + t[4] + t[4], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + t[1] + t[1], 16),
      green: parseInt("" + t[2] + t[2], 16),
      blue: parseInt("" + t[3] + t[3], 16),
      alpha: i,
    };
  }
  var r = rv.exec(t);
  if (r) return { red: parseInt("" + r[1], 10), green: parseInt("" + r[2], 10), blue: parseInt("" + r[3], 10) };
  var o = ov.exec(t.substring(0, 50));
  if (o)
    return {
      red: parseInt("" + o[1], 10),
      green: parseInt("" + o[2], 10),
      blue: parseInt("" + o[3], 10),
      alpha: parseFloat("" + o[4]) > 1 ? parseFloat("" + o[4]) / 100 : parseFloat("" + o[4]),
    };
  var s = sv.exec(t);
  if (s) {
    var a = "rgb(" + Kf(parseInt("" + s[1], 10), parseInt("" + s[2], 10) / 100, parseInt("" + s[3], 10) / 100) + ")",
      c = rv.exec(a);
    if (!c) throw new Yf(4, t, a);
    return { red: parseInt("" + c[1], 10), green: parseInt("" + c[2], 10), blue: parseInt("" + c[3], 10) };
  }
  var l = av.exec(t.substring(0, 50));
  if (l) {
    var u = "rgb(" + Kf(parseInt("" + l[1], 10), parseInt("" + l[2], 10) / 100, parseInt("" + l[3], 10) / 100) + ")",
      h = rv.exec(u);
    if (!h) throw new Yf(4, t, u);
    return {
      red: parseInt("" + h[1], 10),
      green: parseInt("" + h[2], 10),
      blue: parseInt("" + h[3], 10),
      alpha: parseFloat("" + l[4]) > 1 ? parseFloat("" + l[4]) / 100 : parseFloat("" + l[4]),
    };
  }
  throw new Yf(5);
}
function lv(e) {
  if ("transparent" === e) return 0;
  var t = cv(e),
    n = Object.keys(t).map(function (e) {
      var n = t[e] / 255;
      return n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
    }),
    i = n[0],
    r = n[1],
    o = n[2];
  return parseFloat((0.2126 * i + 0.7152 * r + 0.0722 * o).toFixed(3));
}
let uv = class extends se {
  constructor() {
    super(...arguments), (this.height = 32), (this.width = 32);
  }
  render() {
    return j` <svg fill="none" height="${this.height}" viewBox="0 0 32 32" width="${this.width}" xmlns="http://www.w3.org/2000/svg"> <g fill="#ff4500"> <path d="m6.4 0h-6.4v6.4h6.4z"/> <path d="m12.8 0h-6.4v6.4h6.4z"/> <path d="m19.2 0h-6.4v6.4h6.4z"/> <path d="m25.6 0h-6.4v6.4h6.4z"/> <path d="m32 6.4h-6.4v6.4h6.4z"/> <path d="m32 12.8h-6.4v6.4h6.4z"/> <path d="m32 19.2h-6.4v6.4h6.4z"/> <path d="m32 25.6h-6.4v6.4h6.4z"/> <path d="m19.2 25.6h-6.4v6.4h6.4z"/> <path d="m25.6 25.6h-6.4v6.4h6.4z"/> <path d="m6.4 25.6h-6.4v6.4h6.4z"/> </g> <path d="m19.2 12.8h-6.4v6.4h6.4z" fill="#000"/> <g fill="#ff4500"> <path d="m6.4 19.2h-6.4v6.4h6.4z"/> <path d="m6.4 12.8h-6.4v6.4h6.4z"/> <path d="m6.4 6.4h-6.4v6.4h6.4z"/> </g> <path d="m19.2 6.4h-12.8v25.6h6.4v-6.4h12.8v-19.2zm0 12.8h-6.4v-6.4h6.4z" fill="#fff"/> </svg> `;
  }
};
$e([Ue({ type: Number })], uv.prototype, "height", void 0),
  $e([Ue({ type: Number })], uv.prototype, "width", void 0),
  (uv = $e([Fe("garlic-bread-logo")], uv));
Ir(
  "icon-download",
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M19 11v5.373A2.63 2.63 0 0116.373 19H3.627A2.629 2.629 0 011 16.373V11h1.25v5.373a1.379 1.379 0 001.377 1.377h12.746a1.379 1.379 0 001.377-1.377V11H19zm-9.259 3.583H10l.33-.029 4.112-4.112-.884-.884-2.933 2.933V1h-1.25v11.491L6.442 9.558l-.884.884 3.929 3.929.254.212z"/></svg>'
  )}`,
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M19 11v5a3 3 0 01-3 3H4a3 3 0 01-3-3v-5h2v5a1 1 0 001 1h12a1 1 0 001-1v-5h2zm-9.415 3.958H10l.484-.029 4.223-4.222-1.414-1.414L11 11.586V1H9v10.586L6.707 9.293l-1.414 1.414 3.929 3.929.363.322z"/></svg>'
  )}`
);
Ir(
  "icon-location",
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10.046 20l-.465-.268C8.809 19.18 2 14.142 2 8.39A8.212 8.212 0 0110 0a8.212 8.212 0 018 8.39c0 5.752-6.809 10.79-7.585 11.345l-.369.265zM10 1.242A6.966 6.966 0 003.25 8.39c0 4.644 5.361 9.042 6.75 10.1 1.4-1.067 6.75-5.461 6.75-10.1A6.966 6.966 0 0010 1.242zM10 12a4 4 0 110-8 4 4 0 010 8zm0-6.75a2.75 2.75 0 100 5.5 2.75 2.75 0 000-5.5z"/></svg>'
  )}`,
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 0a8.212 8.212 0 00-8 8.39c0 5.752 6.809 10.79 7.581 11.342l.465.268.369-.265C11.191 19.18 18 14.142 18 8.39A8.212 8.212 0 0010 0zm0 11.3a3.354 3.354 0 113.375-3.354A3.365 3.365 0 0110 11.3z"/></svg>'
  )}`
);
Ir(
  "icon-image-post",
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M13 4a3 3 0 100 6 3 3 0 000-6zm0 4.75a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5z"/><path d="M17.375 1H2.625A1.627 1.627 0 001 2.625v14.75A1.627 1.627 0 002.625 19h14.75A1.627 1.627 0 0019 17.375V2.625A1.627 1.627 0 0017.375 1zM2.25 17.375v-2.683L4.9 12.04a2.332 2.332 0 013.3 0l5.71 5.71H2.625a.375.375 0 01-.375-.375zm15.5 0a.375.375 0 01-.375.375h-1.7l-6.6-6.594a3.582 3.582 0 00-5.063 0L2.25 12.925v-10.3a.375.375 0 01.375-.375h14.75a.375.375 0 01.375.375v14.75z"/></svg>'
  )}`,
  z`${Ar(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M7.935 12.305l6.7 6.7h-12A1.626 1.626 0 011 17.375v-.946l.022.022 4.146-4.146a1.96 1.96 0 012.767 0zM19 2.625v14.75a1.623 1.623 0 01-1.565 1.619l.008-.009-8.094-8.094a3.961 3.961 0 00-5.6 0L1 13.645V2.625A1.627 1.627 0 012.625 1h14.75A1.627 1.627 0 0119 2.625zM15.5 7a2.5 2.5 0 10-5 0 2.5 2.5 0 005 0z"/></svg>'
  )}`
);
let hv = class extends se {
  constructor() {
    super(...arguments), (this.isPending = !1), (this.mode = Ff.Image);
  }
  static get styles() {
    return $t(
      ".cancel,\n.share {\n  height: 40px;min-width: 40px;padding: 0;border: none;border-radius: 40px;color: #121212;font-size: 20px;position: relative;\n}\n:host {\n  display: flex;\n  flex-flow: column nowrap;\n  padding: 0;\n  pointer-events: all;\n}\n.controls {\n  background: #fff;\n  flex: 0 0 auto;\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  justify-content: center;\n  height: 48px;\n  padding: 8px calc(var(--sair) + 8px) calc(var(--saib) + 8px) calc(var(--sail) + 8px);\n  position: relative;\n}\n.modes {\n  background: #edeff1;\n  border: 4px solid #edeff1;\n  border-radius: 40px;\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  justify-content: center;\n  margin: 0 16px;\n  padding: 2px;\n  box-sizing: border-box;\n}\n.modes label {\n  width: 58px;\n  height: 32px;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modes label.selected {\n  background: #ffffff;\n  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.12);\n  border-radius: 32px;\n}\n.modes label input {\n  display: none;\n}\n.modes label icon-image-post,\n.modes label icon-location {\n  color: #121212;\n  font-size: 20px;\n}\n.cancel {\n  background-color: #fff;\n  border: 1px solid #d4d7d9;\n  box-sizing: border-box;\n  flex: 1 1 0%;\n  max-width: 163.5px;\n}\n.share {\n  --button-border-width: 4px;\n  border-image-slice: 1;\n  background-image: linear-gradient(to bottom, #ff6600, #ff4500);\n  position: relative;\n  flex: 1 1 0%;\n  max-width: 163.5px;\n}\n.share::before {\n  content: '';\n  position: absolute;\n  inset: 4px;\n  border-radius: 32px;\n  background-color: #fff;\n}\n.share[disabled] {\n  cursor: not-allowed;\n  background-image: linear-gradient(to bottom, #f1f1f1, #f1f1f1);\n  transition: background-image 0.3s ease-out;\n}\ngarlic-bread-loader {\n  position: relative;\n}\nicon-close,\nicon-checkmark {\n  font-size: 20px;\n  position: relative;\n}\n"
    );
  }
  onCancelClick() {
    this.dispatchEvent(Ye("toggle-share-sheet", { isVisible: !1 }));
  }
  async onShareClick() {
    this.dispatchEvent(Ye("share", { mode: this.mode }));
  }
  changeMode(e) {
    (this.mode = e.target.value), this.dispatchEvent(Ye("change-share-mode", { mode: this.mode }));
  }
  render() {
    return j` <div class="controls"> <button class="cancel" @click="${
      this.onCancelClick
    }"> <icon-close></icon-close> </button> <div class="modes"> ${[Ff.Image, Ff.Coordinates].map(
      (e) =>
        j` <label class="${tr({
          selected: e === this.mode,
        })}"> <input type="radio" name="mode" value="${e}" ?checked="${e === this.mode}" @change="${
          this.changeMode
        }"> ${
          e === Ff.Coordinates
            ? j`<icon-location></icon-location>`
            : e === Ff.Image
            ? j`<icon-image-post></icon-image-post>`
            : ""
        } </label> `
    )} </div> <button class="share" @click="${this.onShareClick}" ?disabled="${this.isPending}"> ${
      this.isPending ? j`<garlic-bread-loader></garlic-bread-loader>` : j`<icon-checkmark></icon-checkmark>`
    } </button> </div> `;
  }
};
$e([Ue({ type: Boolean, attribute: "is-pending" })], hv.prototype, "isPending", void 0),
  $e([Ue({ type: String })], hv.prototype, "mode", void 0),
  (hv = $e([Fe("garlic-bread-share-sheet")], hv));
const dv = "text/plain",
  pv = 120;
const fv = vi(se);
let vv = class extends fv {
  constructor() {
    super(),
      (this.browserType = Cr.Whatever),
      (this.showCanvasHistory = !1),
      (this.isSheetOpen = !1),
      (this.timestamp = Date.now()),
      (this.mode = Ff.URL),
      (this.renderShareUI = !1),
      (this.renderAllFrames = !1),
      (this.isSharing = !1),
      (this._events = new ut(this)),
      (this.onShare = this._events.define("share", async () => {
        (this.isSharing = !0), await this.updateComplete, await this.share(), (this.isSharing = !1);
      })),
      (this.onChangeShareMode = this._events.define("change-share-mode", (e) => {
        (this.mode = e.detail.mode), (this.renderAllFrames = !0);
      })),
      (this.renderCoordinates = (e) => {
        const t = or(),
          n = this.getCanvasPixelColor(t);
        return j` <div class="shadow ${tr({
          selected: e,
        })}"> <div class="coordinates"> <div class="backdrop" style="${Te({
          backgroundColor: n,
          color: n && (lv(n) < 0.5 ? "#fff" : "#000"),
        })}"> <span>${`${t.x}`.padStart(4, "0")}</span> <span class="coordinate-y">${`${t.y}`.padStart(
          4,
          "0"
        )}</span> </div> <garlic-bread-logo></garlic-bread-logo> </div> </div> `;
      }),
      (this.renderImage = (e) => j` <div class="lense ${tr({ selected: e })}"></div> `),
      Cn(this, cn),
      Cn(this, ln),
      Cn(this, tn);
  }
  static get styles() {
    return $t(
      ":host {\n  display: flex;\n  flex-flow: column nowrap;\n}\n.share {\n  display: flex;\n  flex-flow: column nowrap;\n  position: fixed;\n  height: calc(var(--vh, 1vh) * 100);\n  padding: 0;\n  width: 100vw;\n  top: 0;\n  left: 0;\n  pointer-events: none;\n}\n.frame {\n  flex: 1;\n  position: relative;\n}\n.shadow {\n  position: absolute;\n  inset: 0;\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(0, 0, 0, 0.53);\n  animation: fade-out 0.3s 0s linear both;\n}\n:host([is-sheet-open]) .shadow.selected {\n  animation: fade-in 0.3s 0.3s linear both;\n}\n.lense {\n  position: absolute;\n  inset: calc(var(--sait) + 32px) calc(var(--sair) + 8px) 8px calc(var(--sail) + 8px);\n}\n.lense:before {\n  content: '';\n  position: absolute;\n  box-shadow: 0 0 0 128px rgba(0, 0, 0, 0.5);\n  inset: 0;\n  animation: focus-out 0.3s 0s linear both;\n}\n:host([is-sheet-open]) .lense.selected:before {\n  animation: focus-in 0.3s 0.3s linear both;\n}\n.coordinates {\n  background-color: #fff;\n  box-sizing: border-box;\n  border-radius: 8px;\n  padding: 8px 8px 12px;\n  display: flex;\n  flex-flow: column nowrap;\n  align-items: center;\n  font-family: var(--font-mono);\n}\n.coordinates garlic-bread-logo {\n  margin-top: 16px;\n  flex: 0 0 32px;\n}\n.backdrop {\n  height: 256px;\n  width: 256px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-flow: column nowrap;\n  background-color: #ff4500;\n  font-weight: 600;\n  font-size: 85px;\n  line-height: 85px;\n  border-radius: 4px;\n}\n.coordinate-y {\n  margin-top: 10px;\n}\ngarlic-bread-share-sheet {\n  animation: slide-out 0.3s 0.3s linear both;\n}\n:host([is-sheet-open]) garlic-bread-share-sheet {\n  animation: slide-in 0.3s 0s linear both;\n}\n@keyframes slide-in {\n  0% {\n    transform: translateY(100%);\n  }\n  100% {\n    transform: translateY(0%);\n  }\n}\n@keyframes slide-out {\n  0% {\n    transform: translateY(0%);\n  }\n  100% {\n    transform: translateY(100%);\n  }\n}\n@keyframes focus-in {\n  0% {\n    inset: -32px;\n    border-radius: 0;\n    opacity: 0;\n  }\n  100% {\n    inset: 0px;\n    border-radius: 8px;\n    opacity: 1;\n  }\n}\n@keyframes focus-out {\n  0% {\n    inset: 0px;\n    border-radius: 8px;\n    opacity: 1;\n  }\n  100% {\n    inset: -32px;\n    border-radius: 0;\n    opacity: 0;\n  }\n}\n@keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes fade-out {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n"
    );
  }
  get camera() {
    return this.querySelector("garlic-bread-camera");
  }
  get canvas() {
    return this.querySelector("garlic-bread-canvas");
  }
  updated(e) {
    tn.getState()
      ? this.isSheetOpen
        ? e.has("isSheetOpen") && (this.renderShareUI = !0)
        : (this.renderAllFrames = !1)
      : ((this.renderShareUI = !1), (this.renderAllFrames = !1)),
      super.updated(e);
  }
  blobToFile(e, t) {
    return new File([e], `${t}_${this.timestamp}.png`, { type: "image/png" });
  }
  async loadWatermarkImages() {
    let e, t;
    try {
      e = await Ep(`${CLIENT_CONFIG.STATIC_BASE_URL}assets/img/reddit-logo@3x.png`);
    } catch (e) {
      _r(e);
    }
    try {
      t = await Ep(`${CLIENT_CONFIG.STATIC_BASE_URL}assets/img/r-place-logo@3x.png`);
    } catch (e) {
      _r(e);
    }
    return { redditLogo: e, rPlaceLogo: t };
  }
  async getFile() {
    if (this.mode !== Ff.URL)
      if (this.mode === Ff.Coordinates) {
        if (!this.coordinates) return;
        try {
          const { toBlob: e } = await import("./es-c93816b89fdece08.js"),
            t = await e(this.coordinates);
          if (!t) return;
          const n = or();
          return { blob: t, file: this.blobToFile(t, `${n.x}_${n.y}`) };
        } catch (e) {
          _r(e);
        }
      } else if (this.mode === Ff.Image) {
        if (!this.lense || !this.camera || !this.canvas) return;
        const e = this.lense.getBoundingClientRect(),
          t = this.camera.cameraToCanvas({ x: e.left, y: e.top });
        if (!t) return;
        const n = this.camera.cameraToCanvas({ x: e.left + e.width, y: e.top + e.height });
        if (!n) return;
        const { x: i, y: r } = rr(t),
          o = rr(n),
          s = o.x - i,
          a = o.y - r,
          c = this.canvas.getImageData(i, r, s, a);
        if (!c) return;
        const { redditLogo: l, rPlaceLogo: u } = await this.loadWatermarkImages(),
          h = !!l || !!u,
          d = (((null == l ? void 0 : l.width) || 0) + ((null == u ? void 0 : u.width) || 0) + 168) / 3,
          p = Math.max(Zt.Min, 3 * Math.round(Math.max(hn.getState(), d / s))),
          f = document.createElement("canvas");
        (f.height = a * p + (h ? pv : 0)), (f.width = s * p);
        const v = f.getContext("2d");
        if (!v) return;
        v.putImageData(
          (function (e, t, n) {
            const i = e.createImageData(t.width * n, t.height * n),
              r = e.createImageData(n, 1).data;
            for (let e = 0; e < t.height; e++)
              for (let o = 0; o < t.width; o++) {
                const s = t.data.subarray(4 * (e * t.width + o), 4 * (e * t.width + o) + 4);
                for (let e = 0; e < n; e++) r.set(s, 4 * e);
                for (let t = 0; t < n; t++) {
                  const s = e * n + t,
                    a = o * n;
                  i.data.set(r, 4 * (s * i.width + a));
                }
              }
            return i;
          })(v, c, p),
          0,
          0
        ),
          h &&
            ((v.fillStyle = "#fff"),
            v.fillRect(0, a * p, s * p, pv),
            l && v.drawImage(l, 24, a * p + (pv - l.height) / 2),
            u && v.drawImage(u, s * p - u.width, a * p + (pv - u.height) / 2));
        try {
          const e = await new Promise((e) => {
            f.toBlob(e, "image/png");
          });
          if (!e) return;
          return {
            blob: e,
            file: this.blobToFile(
              e,
              `${Math.max(0, i)}_${Math.max(0, r)}_${Math.min(yn.getState(), o.x - 1)}_${Math.min(
                gn.getState(),
                o.y - 1
              )}.png`
            ),
          };
        } catch (e) {
          _r(e);
        }
      }
  }
  closeShareSheet() {
    this.mode !== Ff.URL && this.dispatchEvent(Ye("toggle-share-sheet", { isVisible: !1 }));
  }
  async share() {
    const e = this.mode === Ff.URL,
      t = this.mode === Ff.Image,
      n = wr(t || e, this.showCanvasHistory),
      i = await this.getFile();
    if (!i && !e) return;
    const { blob: r, file: o } = i || {};
    try {
      if (ii()) {
        const t = r
          ? await (function (e) {
              return new Promise((t) => {
                const n = new FileReader();
                (n.onloadend = () => t(n.result)), n.readAsDataURL(e);
              });
            })(r)
          : void 0;
        if (t || e)
          return (
            null == ri || ri.share({ fileName: null == o ? void 0 : o.name, fileData: t, mode: this.mode, url: n }),
            void this.closeShareSheet()
          );
      }
    } catch (e) {
      _r("Error while trying to share via Native Share API", e);
    }
    var s;
    this.trackEvent(
      ((s = this.mode),
      li({ source: ui.GarlicBread, action: hi.Complete, noun: di.Share }, { action_info: { reason: s } }))
    );
    try {
      if ("share" in navigator) {
        const e = !!o && "canShare" in navigator && navigator.canShare({ files: [o] });
        return (
          await navigator.share(Object.assign({ url: n }, e && o ? { files: [o] } : {})), void this.closeShareSheet()
        );
      }
    } catch (e) {
      _r("Error while trying to share via WebShare API", e);
    }
    try {
      if (navigator.clipboard.write && ClipboardItem) {
        const e = new Blob([n], { type: dv });
        if (
          (await navigator.clipboard.write([
            new ClipboardItem(
              this.browserType === Cr.Safari
                ? Object.assign(Object.assign({}, r ? { [r.type]: new Promise(async (e) => e(r)) } : {}), {
                    [dv]: new Promise(async (t) => t(e)),
                  })
                : Object.assign(Object.assign({}, r ? { [r.type]: r } : {}), { [dv]: e })
            ),
          ]),
          tn.getState())
        ) {
          const e = Ye("faceplate-alert", {
            level: Ze.info,
            message: t
              ? "Image and link copied to your clipboard and ready to share"
              : "Sharable link copied to clipboard",
          });
          this.dispatchEvent(e);
        }
      } else if ((await navigator.clipboard.writeText(n), tn.getState())) {
        const e = Ye("faceplate-alert", { level: Ze.info, message: "Sharable link copied to clipboard" });
        this.dispatchEvent(e);
      }
    } catch (e) {
      _r("Error while trying to share via Clipboard API", e);
    }
    if (!e && r && o) {
      const e = window.URL.createObjectURL(r),
        t = document.createElement("a");
      (t.style.display = "none"), (t.href = e), (t.download = o.name), document.body.appendChild(t), t.click();
    }
    this.closeShareSheet();
  }
  getCanvasPixelColor({ x: e, y: t }) {
    if (Kt.getState().camera && Kt.getState().canvas && this.canvas) return this.canvas.getPixelColor({ x: e, y: t });
  }
  renderShareMode(e, t) {
    const n = this.mode === e;
    return this.renderAllFrames || n ? t(n) : "";
  }
  render() {
    return j` <slot></slot> ${
      tn.getState() && this.renderShareUI
        ? j` <div class="share"> <div class="frame"> ${this.renderShareMode(
            Ff.Coordinates,
            this.renderCoordinates
          )} ${this.renderShareMode(Ff.Image, this.renderImage)} </div> <garlic-bread-share-sheet ?is-pending="${
            this.isSharing
          }" mode="${this.mode}"></garlic-bread-share-sheet> </div> `
        : ""
    } `;
  }
};
$e([er({ context: Vo })], vv.prototype, "browserType", void 0),
  $e([er({ context: xp })], vv.prototype, "showCanvasHistory", void 0),
  $e([Ue({ type: Boolean, attribute: "is-sheet-open" })], vv.prototype, "isSheetOpen", void 0),
  $e([Ue({ type: Number })], vv.prototype, "timestamp", void 0),
  $e([Be()], vv.prototype, "mode", void 0),
  $e([Be()], vv.prototype, "renderShareUI", void 0),
  $e([Be()], vv.prototype, "renderAllFrames", void 0),
  $e([Be()], vv.prototype, "isSharing", void 0),
  $e([qe(".coordinates")], vv.prototype, "coordinates", void 0),
  $e([qe(".lense")], vv.prototype, "lense", void 0),
  (vv = $e([Fe("garlic-bread-share-container")], vv));
let mv = class extends se {
  constructor() {
    super(...arguments),
      (this.showRadarAnimation = !1),
      (this.removeFromDOM = !0),
      (this.animationGrid = this.radarAnimationGrid());
  }
  static get styles() {
    return o`.container{position:fixed;opacity:0;transition:opacity .5s ease-in-out;left:50%;top:50%;transform:translate(-50%,-50%);pointer-events:none}.fade-in{opacity:1}#radar-animation{display:flex;flex-wrap:wrap;width:150vh}#radar-animation div{width:calc(100% / 31);aspect-ratio:1/1;background-color:#eaedef;background-blend-mode:multiply;box-sizing:border-box;border-width:0;opacity:0;animation:fadeIn 6s infinite forwards}@keyframes fadeIn{0%{opacity:0}10%{opacity:.8}20%{opacity:0}100%{opacity:0}}`;
  }
  update(e) {
    e.has("showRadarAnimation") &&
      (!1 === e.get("showRadarAnimation") && !0 === this.showRadarAnimation && this.updateRemoveFromDOM(!1),
      !0 === e.get("showRadarAnimation") &&
        !1 === this.showRadarAnimation &&
        window.setTimeout(() => {
          this.updateRemoveFromDOM(!0);
        }, 500)),
      super.update(e);
  }
  updateRemoveFromDOM(e) {
    this.removeFromDOM = e;
  }
  radarAnimationGrid() {
    const e = [];
    for (let t = 0; t < 31; t++)
      for (let n = 0; n < 31; n++) {
        const i = Math.abs(15 - t) + Math.abs(15 - n),
          r = i - (15 === t || 15 === n ? 0.5 : 0),
          o = j`<div style="${Te(
            Object.assign({ animationDelay: 0.1 * r + "s" }, i > 15 && { visibility: "hidden" })
          )}"></div>`;
        e.push(o);
      }
    return j`${e}`;
  }
  render() {
    if (!this.removeFromDOM)
      return j`<div class="container ${this.showRadarAnimation ? "fade-in" : ""}"> <div id="radar-animation">${
        this.animationGrid
      }</div> </div>`;
  }
};
function gv(e) {
  return new Promise((t) => setTimeout(t, e));
}
$e([Ue({ type: Boolean, attribute: "show-radar-animation" })], mv.prototype, "showRadarAnimation", void 0),
  $e([Be()], mv.prototype, "removeFromDOM", void 0),
  (mv = $e([Fe("garlic-bread-sonar-animation")], mv));
const yv = "clickzoomin",
  bv = "default",
  xv = (function (e) {
    if (Ip in e) return e;
    class t extends e {
      constructor() {
        super(...arguments),
          (this.expirationTimer = 0),
          (this.injectAuthHeaders = (e, t) => {
            if ((Sr("_injectAuthHeaders called"), !e || 0 === Object.keys(e).length))
              return void Sr("Received empty headers");
            let n = !0;
            this.headers
              ? ((n = JSON.stringify(this.headers) !== JSON.stringify(e)),
                Sr(n ? "Replacing with new headers" : "Received identical headers"))
              : Sr("Initializing headers"),
              this.expirationTimer && (window.clearTimeout(this.expirationTimer), (this.expirationTimer = 0)),
              (this.headers = e),
              this.onUpdateAuthHeaders(e, n);
            const i = t - Date.now();
            i > 0
              ? (Sr("Setting timer to request refresh: " + i.toString() + "ms"),
                (this.expirationTimer = window.setTimeout(this.requestAuthRefresh, i)))
              : Sr(
                  `App injected expired auth (${t})! Will not attempt further auth refresh unless app injects valid auth`
                );
          }),
          (this.requestAuthRefresh = () => {
            null == ri || ri.refreshAuth();
          }),
          (this.onInjectAuthHeaders = (e) => {
            if (Cp(e.origin) && e.data.type === Zn.InjectAuthHeaders)
              this.injectAuthHeaders(e.data.headers, e.data.expiration);
          });
      }
      onUpdateAuthHeaders(e, t) {
        throw new Error("Not implemented");
      }
      connectedCallback() {
        var e;
        null === (e = super.connectedCallback) || void 0 === e || e.call(this),
          (window._injectAuthHeaders = this.injectAuthHeaders),
          window.addEventListener("message", this.onInjectAuthHeaders),
          this.requestAuthRefresh();
      }
      disconnectedCallback() {
        var e;
        window.removeEventListener("message", this.onInjectAuthHeaders),
          (window._injectAuthHeaders = void 0),
          null === (e = super.disconnectedCallback) || void 0 === e || e.call(this);
      }
    }
    return (t[Ip] = !0), t;
  })(vi(se));
let wv = class extends xv {
  constructor() {
    super(),
      (this._events = new ut(this)),
      (this.hostAppType = Tr.Whatever),
      (this.browserType = Cr.Whatever),
      (this.showCanvasHistory = !1),
      (this.shouldZoomOut = !1),
      (this.shouldCenterReticle = !1),
      (this.shouldShowHelpModal = !1),
      (this.shouldShowCommunityRadar = !1),
      (this.radarZoomVariant = bv),
      (this.activeZones = []),
      (this.showColorPicker = !1),
      (this.showZoomControl = !1),
      (this.isSharing = !1),
      (this.canvasStateById = {}),
      (this.isPlacingPixel = !1),
      (this.currentModalType = kp.None),
      (this.isSynchronizingConfiguration = !1),
      (this.isRestoringAuthorization = !1),
      (this.isRestoringAfterInactive = !1),
      (this.isGameOver = !1),
      (this.isFetchingHistory = !1),
      (this.circleToolPattern = ir.Solid),
      (this.isFullScreen = Cn(this, tn)),
      (this.pxRatio = window.devicePixelRatio || window.screen.availWidth / document.documentElement.clientWidth),
      (this.screenMode = Cn(this, an)),
      (this.isSessionFirstSetPixel = !0),
      (this.wasVerifyAccountEventSent = !1),
      (this.timerDuration = 0),
      (this.isPlacingPixelViaDeeplink = !1),
      (this.pendingHistoryTimestamps = new Set([])),
      (this.pixelAvailabilityTimer = new Mp(this)),
      (this.audioSetupCount = 0),
      (this.isLongPressing = !1),
      (this.lastLongPressCoordinates = fp(-1, -1, -1)),
      (this.isRequestingCommunityPins = !1),
      (this.showRadarAnimation = !1),
      (this.circlesData = {}),
      (this._handleResize = () => {
        this._handleZooming(), this._setViewportCustomProperty();
      }),
      (this.onError = (e) => {
        this.haltAndAskToReload(e.message);
      }),
      (this.onUnhandledRejection = (e) => {
        this.haltAndAskToReload(e.reason);
      }),
      (this.setUpAudio = () => {
        this.audioSetupCount >= Sp ||
          (((e) => {
            let t = !1;
            try {
              t = JSON.parse(`${localStorage.getItem("ml-muted-state")}`);
            } catch (e) {
              _r(e);
            }
            _p(e)(t);
          })(Tp),
          this.audioSetupCount++,
          Sr("SetupAudio was fired"));
      }),
      (this.onTouchStart = vn((e) => {
        if ((this.setUpAudio(), 1 === e.touches.length)) {
          Sr("Long press started"), (this.isLongPressing = !0);
          const t = e.targetTouches.item(0);
          t
            ? ((this.radarTriggerMouseOrTouchEvent = t),
              (this.lastLongPressCoordinates = fp(t.clientX, t.clientY)),
              (this.longPressTimer = window.setTimeout(() => {
                this.onRadarTriggered();
              }, 500)))
            : 2 === e.targetTouches.length && ((this.isLongPressing = !1), clearTimeout(this.longPressTimer));
        }
      })),
      (this.onTouchEnd = vn((e) => {
        this.isLongPressing &&
          0 === e.touches.length &&
          ((this.isLongPressing = !1), clearTimeout(this.longPressTimer));
      })),
      (this.onTouchMove = vn((e) => {
        if (1 === e.targetTouches.length) {
          const t = e.targetTouches.item(0);
          if (t) {
            const e = fp(t.clientX, t.clientY);
            ar(e.where.x, e.where.y, this.lastLongPressCoordinates.where.x, this.lastLongPressCoordinates.where.y) >
              10 && ((this.isLongPressing = !1), clearTimeout(this.longPressTimer));
          }
        }
        if (2 === e.targetTouches.length) {
          const t = e.targetTouches.item(0),
            n = e.targetTouches.item(1);
          t && n && ((this.isLongPressing = !1), clearTimeout(this.longPressTimer));
        }
      })),
      (this.onMouseDown = vn((e) => {
        this.setUpAudio(),
          Sr(e),
          2 === e.button && (e.preventDefault(), (this.radarTriggerMouseOrTouchEvent = e), this.onRadarTriggered());
      })),
      (this.syncValuesToURL = Qi(500, !1, () => {
        if (!history) return;
        const e = Kt.getState();
        if (!e.camera || !e.canvas) return;
        const t = new URL(location.href),
          { cx: n, cy: i, px: r } = sr(),
          o = gr({ x: n, y: i });
        t.searchParams.set(jt.CX, `${o.x}`),
          t.searchParams.set(jt.CY, `${o.y}`),
          t.searchParams.set(jt.PX, `${r}`),
          this.showCanvasHistory && t.searchParams.set(jt.TS, `${dn.getState()}`),
          history.replaceState({}, "", t.toString());
      })),
      (this.cleanSynchronizeConfigurationTimeout = () => {
        this.synchronizeConfigurationTimeout &&
          (clearTimeout(this.synchronizeConfigurationTimeout), (this.synchronizeConfigurationTimeout = void 0));
      }),
      (this.cleanReleaseSyncLockTimeout = () => {
        this.releaseSyncLockTimeout &&
          (clearTimeout(this.releaseSyncLockTimeout), (this.releaseSyncLockTimeout = void 0));
      }),
      (this.cleanRestoreAuthTimeout = () => {
        this.restoreAuthTimeout && (clearTimeout(this.restoreAuthTimeout), (this.restoreAuthTimeout = void 0));
      }),
      (this.cleanReleaseAuthLockTimeout = () => {
        this.releaseAuthLockTimeout &&
          (clearTimeout(this.releaseAuthLockTimeout), (this.releaseAuthLockTimeout = void 0));
      }),
      (this.onEmbedHostMessage = (e) => {
        if (ii() || Cp(e.origin))
          if (e.data.type === Zn.SetFullScreen)
            this.setFullScreen(e.data.state),
              e.data.state ? this.setScreenMode(Gt.FullScreen) : this.setScreenMode(Gt.Preview);
          else if (e.data.type === Zn.InjectTelemetryDefaults) {
            const { telemetryDefaults: t } = e.data;
            "object" == typeof t && Object.keys(t).length && on.updateState(t);
          } else
            e.data.type === Zn.SetScreenMode &&
              (this.setScreenMode(e.data.state),
              e.data.state === Gt.FullScreen ? this.setFullScreen(!0) : this.setFullScreen(!1));
      }),
      (this.setFullScreen = (e) => {
        if (
          (e && an.getState() !== Gt.FullScreen && this.screenMode.state(Gt.FullScreen),
          this.isFullScreen.state(e),
          this._setViewportCustomProperty(),
          !1 === e)
        )
          (this.isPlacingPixel = !1),
            (this.isSharing = !1),
            (this.selectedColor = void 0),
            (this.selectedPixel = void 0),
            (this.showColorPicker = !1),
            (this.currentModalType = kp.None),
            pn.updateState([]);
        else if (this.isPlacingPixelViaDeeplink && !this.isGameOver) {
          const e = { x: cn.getState(), y: ln.getState() },
            t = ur(vr(e));
          t && this.canvasStateById[t.index] && this.selectPixel(e);
        }
        e && (this.reactivateAfterInactive(), this.showHelpModal());
      }),
      (this.setScreenMode = (e, t) => {
        switch ((this.screenMode.state(e), e)) {
          case Gt.FullScreen:
            this.setFullScreen(!0);
            break;
          case Gt.PictureInPicture:
          case Gt.Preview:
          default:
            this.setFullScreen(!1);
        }
        t && this.moveCameraToPosition(t);
      }),
      (this.moveCameraToPosition = (e) => {
        const t = this.createPositionFromMoveToMessage(e),
          n = mr(t);
        (t.x = n.x),
          (t.y = n.y),
          this.camera &&
            ((null == e ? void 0 : e.isAnimated) ? this.camera.moveTo(t, e.z) : this.camera.applyPosition(t));
      }),
      (this.createPositionFromMoveToMessage = (e) => Object.assign({ x: e.x, y: e.y }, e.z ? { zoom: e.z } : {})),
      (this.onConfigurationUpdateMessage = async (e) => {
        var t;
        if (!this.showCanvasHistory)
          switch ((Sr("Received configuration message", e), e.__typename)) {
            case sp.ConfigurationUpdate: {
              const n = Ne(e, ["__typename"]),
                { width: i, height: r } = cr(n.activeZone);
              if (i === yn.getState() && r === gn.getState())
                mn.updateState(n), this.isRestoringAfterInactive && this.changeCanvasSize(n);
              else if (Jt())
                if (i < yn.getState() || r < gn.getState()) this.changeCanvasSize(n);
                else {
                  const e = Ne(n, ["canvasConfigurations", "canvasHeight", "canvasWidth", "activeZone"]);
                  mn.updateState(Object.assign(Object.assign({}, mn.getState()), e)),
                    this.scheduleCanvasResize(n),
                    this.isRestoringAfterInactive && this.changeCanvasSize(mn.getState());
                }
              else
                this.changeCanvasSize(n),
                  (null === (t = rn.getState()) || void 0 === t ? void 0 : t.readonlyMode) &&
                    cp.unsubscribeFromConfigUpdates();
              this.isRestoringAfterInactive && (this.isRestoringAfterInactive = !1);
              break;
            }
            default:
              _r(`Unsupported message data received over configuration channel ${e.__typename}`);
          }
      }),
      (this.changeCanvasSize = async (e) => {
        var t;
        const n = gr(or()),
          i = gr({ x: 0, y: 0 });
        if (this.showCanvasHistory) return;
        mn.updateState(e), this.updateCanvasSize(e, i);
        const r = mr(n);
        null === (t = this.camera) || void 0 === t || t.applyPosition(r),
          this.initializeCamera(),
          this.updateVisibleCanvasIndexList(),
          (this.canvasStateById = {}),
          this.subscribeToCanvasUpdates();
      }),
      (this.subscribeToCanvasUpdates = async (e) => {
        if (!this.showCanvasHistory)
          try {
            const t = e ? [e] : mn.getState().canvasConfigurations;
            await Promise.all(t.map((e) => cp.subscribeToCanvasUpdates(this.onCanvasMessage, e)));
          } catch (e) {
            if (tn.getState()) {
              const t = Ye("faceplate-alert", { level: Ze.error, message: e.message });
              _r("Error while expanding canvas", e), this.dispatchEvent(t);
            }
          }
      }),
      (this.onCanvasMessage = async (e, t) => {
        var n, i, r;
        if (!this.showCanvasHistory && (Sr("Received canvas message", t, e), this.canvas)) {
          switch (e.__typename) {
            case sp.FullFrame:
              if (
                (this.drawCanvasImage(await Ep(e.name), t),
                (this.canvasStateById[t] = { isTainted: !1 }),
                this.isPlacingPixelViaDeeplink && (tn.getState() || an.getState() === Gt.FullScreen))
              ) {
                const e = { x: cn.getState(), y: ln.getState() },
                  n = ur(e);
                t === (null == n ? void 0 : n.index) && this.selectPixel(e);
              }
              (null === (n = rn.getState()) || void 0 === n ? void 0 : n.readonlyMode) &&
                cp.unsubscribeFromCanvasUpdates(t),
                this.releaseSyncLock();
              break;
            case sp.DiffFrame: {
              const n = this.canvasStateById[t];
              if (!n) break;
              const { previousDiffTimestamp: r, isTainted: o } = n;
              if (o) break;
              if (r && r !== e.previousTimestamp) {
                n.isTainted = !0;
                const e =
                  null === (i = mn.getState()) || void 0 === i
                    ? void 0
                    : i.canvasConfigurations.find((e) => e.index === t);
                e && this.subscribeToCanvasUpdates(e);
                break;
              }
              n.previousDiffTimestamp = e.currentTimestamp;
              const s = wn.getState();
              s && s.timestamp < e.currentTimestamp && this.canvas.drawPixel(s),
                this.drawCanvasImage(await Ep(e.name), t),
                s && s.timestamp >= e.currentTimestamp && this.canvas.drawPixel(s);
              break;
            }
            default:
              _r("Unsupported API message data received over canvas subscription", e);
          }
          (null === (r = rn.getState()) || void 0 === r ? void 0 : r.readonlyMode) &&
            mn.getState().canvasConfigurations.every((e) => this.canvasStateById[e.index]) &&
            (cp.createReadonlyClient(), Sr("Websocket connection severed, reinstantiated w/ readonly client"));
        }
      }),
      (this.drawCanvasImage = async (e, t) => {
        const n = mn.getState(),
          i = this.getCanvasConfig(t);
        if (!this.canvas || !i || !n) return;
        const { topLeft: r } = n.activeZone,
          o = i.dx - r.x,
          s = i.dy - r.y;
        try {
          this.canvas.drawImage({ image: e, x: o, y: s });
        } catch (e) {
          _r(e);
        }
      }),
      (this.onUpdateVisiblePixels = this._events.define("update-visible-pixels", (e) => {
        un.updateState(e.detail.px);
      })),
      (this.onCancelPixel = this._events.define("cancel-pixel", () => {
        this.cancelPixel();
      })),
      (this.onClickCanvas = this._events.define("click-canvas", async (e) => {
        var t;
        this.selectPixel(e.detail);
        const { x: n, y: i } = e.detail,
          r = null === (t = this.canvas) || void 0 === t ? void 0 : t.getPixelColor({ x: n, y: i }),
          o = gr(rr({ x: n, y: i }));
        this.trackEvent(
          (({ x: e, y: t, color: n }) =>
            li(
              { source: ui.GarlicBread, action: hi.Click, noun: di.Pixel },
              { action_info: { setting_value: n, reason: [e, t].join(",") } }
            ))({ x: o.x, y: o.y, color: r })
        );
      })),
      (this.onHoverCanvas = this._events.define("hover-canvas", (e) => {
        if (this.eraseToolMode === nr.Rectangle)
          xn.getState().length > 0 && xn.updateState([xn.getState()[0], e.detail]);
        else if (this.eraseToolMode === nr.Circle) {
          const { pixelId: t } = e.detail;
          if (t) {
            const n = this.circlesData[t];
            n &&
              (this.circlesData = Object.assign(Object.assign({}, this.circlesData), {
                [t]: Object.assign(Object.assign({}, n), { x: e.detail.x, y: e.detail.y }),
              }));
          }
        }
      })),
      (this.isAccountVerificationRequired = async () => {
        var e, t;
        return (
          !(null === (e = rn.getState()) || void 0 === e ? void 0 : e.isVerified) &&
            this.wasVerifyAccountEventSent &&
            (rn.updateState(null), await this.fetchUserData()),
          !(null === (t = rn.getState()) || void 0 === t ? void 0 : t.isVerified)
        );
      }),
      (this.requestAccountVerification = () => {
        (this.wasVerifyAccountEventSent = !0), null == ri || ri.verifyAccount();
      }),
      (this.fetchFrameHistory = async () => {
        var e;
        const t = dn.getState();
        this.isFetchingHistory = !0;
        const n = await cp.getFrameHistory(Math.min(Bt, Math.max(Ut, t)));
        if (this.pendingHistoryTimestamps.size > 0 && !this.pendingHistoryTimestamps.has(dn.getState()))
          this.pendingHistoryTimestamps.delete(t);
        else {
          if (n.type !== ap.Success) this.handleFailedResponse(n);
          else if (n.data && n.type === ap.Success) {
            const i = gn.getState(),
              r = yn.getState();
            this.updateActiveZone(t);
            try {
              const o = await Promise.all(
                n.data.frames.map(
                  (e) =>
                    new Promise((t, n) => {
                      Ep(e.url)
                        .then((n) => {
                          t({ canvasIndex: e.canvasIndex, image: n });
                        })
                        .catch(n);
                    })
                )
              );
              if (this.pendingHistoryTimestamps.size > 0 && !this.pendingHistoryTimestamps.has(dn.getState()))
                return void this.pendingHistoryTimestamps.delete(t);
              if (o.length > 0) for (const e of o) this.drawCanvasImage(e.image, e.canvasIndex);
              else this.canvas.drawEmptyRect({ x: 0, y: 0 });
              if (gn.getState() < i || yn.getState() < r) {
                const t = rr({ x: cn.getState(), y: ln.getState() });
                (t.x === cn.getState() && t.y === ln.getState()) ||
                  (cn.updateState(t.x),
                  ln.updateState(t.y),
                  null === (e = this.camera) || void 0 === e || e.initialize(!1));
              }
            } catch (e) {
              if ((_r(e), tn.getState())) {
                const e = Ye("faceplate-alert", { level: Ze.error, message: Hd });
                this.dispatchEvent(e);
              }
            }
          }
          (this.isFetchingHistory = !1), this.pendingHistoryTimestamps.delete(t);
        }
      }),
      (this.fetchFrameHistoryDebounced = Qi(100, this.fetchFrameHistory)),
      (this.onChangeZoom = this._events.define("change-zoom", (e) => {
        var t;
        const { zoom: n } = e.detail;
        hn.updateState(n), null === (t = this.camera) || void 0 === t || t.zoomIn(n);
      })),
      (this.onConfirmPixel = this._events.define("confirm-pixel", async () => {
        var e;
        if (!(null === (e = rn.getState()) || void 0 === e ? void 0 : e.canParticipate)) return;
        if (this.eraseToolMode) return this.dispatchEvent(Ye("confirm-erase")), void this.cancelPixel();
        if (!this.canvas || !this.showColorPicker || "number" != typeof this.selectedColor || this.nextTileAvailableIn)
          return;
        const t = { x: cn.getState(), y: ln.getState(), colorIndex: this.selectedColor };
        if (await this.isAccountVerificationRequired()) return void this.requestAccountVerification();
        this.canvas.drawPixel(t), wn.updateState(Object.assign(Object.assign({}, t), { timestamp: Date.now() }));
        const n = Object.assign(Object.assign({}, t), vr(t)),
          i = Object.assign(Object.assign({}, t), gr(t));
        this.trackEvent(
          (({ x: e, y: t, colorIndex: n }) =>
            li(
              { source: ui.GarlicBread, action: hi.Click, noun: di.Submit },
              { action_info: { setting_value: Dn(n) || "", reason: [e, t].join(",") } }
            ))(i)
        ),
          (this.isPlacingPixel = !0);
        const r = await cp.setPixel(n);
        if (r.type === ap.Success) {
          const { data: e } = r;
          (null == e ? void 0 : e.nextAvailablePixelTimestamp) &&
            ((this.timerDuration = this.countTimerDuration(e.nextAvailablePixelTimestamp)),
            this.pixelAvailabilityTimer.startTimer(this.timerDuration));
          const t = wn.getState();
          t &&
            (null == e ? void 0 : e.timestamp) &&
            wn.updateState(Object.assign(Object.assign({}, t), { timestamp: e.timestamp })),
            (this.showColorPicker = !1),
            (this.selectedColor = void 0),
            this.isSessionFirstSetPixel && ((this.isSessionFirstSetPixel = !1), null == ri || ri.showPNPopup());
        } else if (r.type === ap.PixelRateLimit) {
          if (tn.getState()) {
            const e = Ye("faceplate-alert", { level: Ze.warning, message: Hd });
            this.dispatchEvent(e);
          }
          (this.timerDuration = this.countTimerDuration(r.nextAvailablePixelTimestamp)),
            this.pixelAvailabilityTimer.startTimer(this.timerDuration);
        } else this.handleFailedResponse(r), wn.updateState(null);
        this.isPlacingPixel = !1;
      })),
      (this.haltAndAskToReload = (e) => {
        (this.isGameOver = !0),
          _r(`Game over: ${e}`),
          this.showCanvasHistory || (this.cleanSynchronizeConfigurationTimeout(), this.cleanReleaseSyncLockTimeout()),
          this.cleanReleaseAuthLockTimeout(),
          (this.canvasStateById = {}),
          cp.destroy();
      }),
      (this.onContextMenu = this._events.define("contextmenu", (e) => {
        e.preventDefault(), (this.showColorPicker = !1);
      })),
      (this.onMoveCamera = this._events.define("move-camera", (e) => {
        if (this.eraseToolMode === nr.Rectangle && xn.getState().length) return;
        const t = rr(e.detail);
        cn.updateState(t.x),
          ln.updateState(t.y),
          this.showCanvasHistory || this.updateVisibleCanvasIndexListThrottled();
      })),
      (this.updateVisibleCanvasIndexList = () => {
        const e = yr(this.camera);
        cp.toggleVisibleCanvasListSubscription(e);
      }),
      (this.updateVisibleCanvasIndexListThrottled = Qi(1e3, !1, this.updateVisibleCanvasIndexList)),
      (this.onFaceplateRequest = this._events.define("faceplate-request", (e) => {
        if ("/svc/garlic-bread/perf-metrics" === e.detail.resource) {
          const { body: t } = e.detail.request;
          t.meta = Object.assign(Object.assign({}, t.meta), { route_name: "embed", page_type: "embed" });
        }
      })),
      (this.onSelectColor = this._events.define("select-color", (e) => {
        this.selectedColor = e.detail.color;
      })),
      (this.onChangeModalType = this._events.define("change-modal-type", (e) => {
        this.currentModalType = e.detail.modalType;
      })),
      (this.onAdminBanModalClose = this._events.define("admin-ban-modal", () => {
        bn.updateState(!1);
      })),
      (this.onWebSocketConnection = (e) => {
        e.type === ap.Success
          ? (this.releaseAuthLock(), (this.isGameOver = !1))
          : e.type === ap.GenericError &&
            this.haltAndAskToReload("Failed to instantiate a connection to the Realtime API");
      }),
      (this.onToggleZoomButton = this._events.define("toggle-zoom-control", () => {
        this.showZoomControl = !this.showZoomControl;
      })),
      (this.onPixelAvailabilityTimerTick = (e) => {
        this.nextTileAvailableIn = e;
      }),
      (this.onToggleShareSheet = this._events.define("toggle-share-sheet", (e) => {
        (this.isSharing = e.detail.isVisible), this.isSharing && (this.showColorPicker = !1);
      })),
      (this.onToggleEraseTool = this._events.define("toggle-admin-erase-tool", (e) => {
        this.toggleEraseTool(e.detail.mode);
      })),
      (this.toggleEraseTool = (e) => {
        if (
          (xn.updateState([]),
          this.eraseToolMode || this.dispatchEvent(Ye("cancel-pixel")),
          (this.showColorPicker = !1),
          (this.circlesData = {}),
          (this.shape = void 0),
          this.eraseToolMode === e)
        )
          (this.eraseToolMode = void 0), (this.selectedColor = void 0);
        else if (((this.eraseToolMode = e), e === nr.Circle)) {
          this.circleToolPattern = ir.Solid;
          const { colors: e } = mn.getState().colorPalette;
          this.selectedColor = e[Math.round(Math.random() * e.length)].index;
        } else e === nr.Rectangle && (this.selectedColor = void 0);
      }),
      (this.onToggleAdminBanTool = this._events.define("toggle-admin-ban-tool", () => {
        const e = bn.getState();
        bn.updateState(!e);
      })),
      (this.onConfirmErase = this._events.define("confirm-erase", async () => {
        const e = xn.getState();
        if (this.eraseToolMode === nr.Rectangle) {
          const t = pr(),
            { x: n, y: i } = e[0];
          let { x: r, y: o } = e[1];
          t && ((r = n), (o = i));
          const s = vr({ x: n, y: i }),
            a = vr({ x: r, y: o }),
            c = mn.getState(),
            l = dr({ x1: s.x, y1: s.y, x2: a.x, y2: a.y }, c);
          if (!l) return void _r("Failed to split the area into canvas rectangles");
          const u = gr({ x: n, y: i }),
            h = gr({ x: r, y: o });
          this.trackEvent(
            ((e, t, n, i) =>
              li(
                { source: ui.GarlicBread, action: hi.Click, noun: di.Rectangle },
                { action_info: { setting_value: `x1: ${e}, y1: ${t}, x2: ${n}, y2: ${i}` } }
              ))(u.x, u.y, h.x, h.y)
          ),
            l.forEach(async (e) => {
              const t = await cp.setRect(
                Object.assign(Object.assign({}, e), {
                  colorIndex: "number" == typeof this.selectedColor ? this.selectedColor : 31,
                })
              );
              t.type !== ap.Success && this.handleFailedResponse(t);
            });
        } else if (this.eraseToolMode === nr.Circle && this.selectedColor) {
          let e;
          e =
            this.circleToolPattern === ir.Random
              ? -1
              : this.circleToolPattern === ir.Checkered
              ? this.selectedColor + 900
              : this.selectedColor;
          const t = [],
            n = [];
          for (const e of Object.values(this.circlesData)) {
            const i = ur(vr(e)),
              r = gr(e);
            i && t.push({ x: i.x, y: i.y, canvasIndex: i.index, radius: e.radius }),
              r && n.push({ x: r.x, y: r.y, radius: e.radius });
          }
          if (t.length) {
            const { maxAllowedCircles: i } = mn.getState().adminConfiguration;
            for (let r = 0; r < t.length; r += i) {
              const o = n.slice(r, r + i);
              for (const e of o) this.trackEvent(pi(e.x, e.y, e.radius));
              const s = t.slice(r, r + i);
              await cp.setCirclesArea(s, e);
            }
          }
        }
        this.eraseToolMode && this.toggleEraseTool(this.eraseToolMode);
      })),
      (this.onApiError = this._events.define("api-error", (e) => {
        this.handleFailedResponse(e.detail);
      })),
      (this.onHelpButtonClick = () => {
        this.showCanvasHistory ? (this.currentModalType = kp.CanvasHistory) : (this.currentModalType = kp.Settings),
          this.trackEvent(li({ source: ui.GarlicBread, action: hi.View, noun: di.Tutorial }));
      }),
      (this.onPinButtonClick = () => {
        (this.currentModalType = kp.CommunityPin),
          this.trackEvent(li({ source: ui.GarlicBread, action: hi.View, noun: di.CommunityPin }));
      }),
      (this.onRadarTriggerdEvent = this._events.define("trigger-radar", () => {
        (this.radarTriggerMouseOrTouchEvent = void 0), this.onRadarTriggered();
      })),
      (this.onRadarTriggered = async () => {
        var e, t, n;
        if (
          this.shouldShowCommunityRadar &&
          !(null === (e = rn.getState()) || void 0 === e ? void 0 : e.readonlyMode) &&
          !this.showCanvasHistory &&
          !this.isRequestingCommunityPins
        ) {
          if (
            (Sr("Radar action was triggered"),
            (this.isRequestingCommunityPins = !0),
            (this.showColorPicker = !1),
            fn.updateState(!0),
            this.radarZoomVariant !== bv)
          ) {
            let e = { x: cn.getState(), y: ln.getState() },
              n = hn.getState();
            ("centerzoomin" !== this.radarZoomVariant && this.radarZoomVariant !== yv) ||
              ((n = Math.max(hn.getState(), Zt.Radar)), hn.updateState(n)),
              (this.radarZoomVariant !== yv && "clickconstantzoom" !== this.radarZoomVariant) ||
                (this.radarTriggerMouseOrTouchEvent &&
                  this.camera &&
                  (e = this.camera.clientToCanvas(this.radarTriggerMouseOrTouchEvent) || e)),
              "centerconstantzoom" !== this.radarZoomVariant &&
                (null === (t = this.camera) || void 0 === t || t.moveTo(e, n), await gv(600));
          }
          (this.showRadarAnimation = !0), clearTimeout(this.communityPinsDismissTimeout), await gv(1100);
          try {
            const e = this.camera.getVisibilityRect(),
              t = gr({ x: e.x1, y: e.y1 }),
              i = gr({ x: e.x2, y: e.y2 }),
              r = await cp.getSubredditsForArea(t, i, (this.hostAppType, Tr.WebDesktop, 5));
            r.type === ap.Success &&
            r.data &&
            (null === (n = r.data) || void 0 === n ? void 0 : n.subredditsCoordinates)
              ? (fn.updateState(!1),
                this.drawCommunityPins(r.data.subredditsCoordinates),
                (this.communityPinsDismissTimeout = window.setTimeout(() => {
                  fn.updateState(!0),
                    window.setTimeout(() => {
                      this.drawCommunityPins([]);
                    }, 500);
                }, 7e3)))
              : r.type !== ap.Success && this.handleFailedResponse(r);
          } catch (e) {
            _r("Error while fetching subreddits for area, community radar", e);
          }
          this.trackEvent(li({ source: ui.GarlicBread, action: hi.Click, noun: di.Sonar })),
            (this.showRadarAnimation = !1),
            await gv(500),
            (this.isRequestingCommunityPins = !1);
        }
      }),
      (this.drawCommunityPins = async (e) => {
        const t = e.map((e) => ({ coordinates: mr(e.coordinates), name: e.subredditName, imageUrl: e.imageUrl }));
        pn.updateState(t);
      }),
      (this.onChangeTimestamp = this._events.define("change-timestamp", (e) => {
        dn.getState() !== e.detail.timestamp &&
          (dn.updateState(e.detail.timestamp),
          this.pendingHistoryTimestamps.add(e.detail.timestamp),
          this.fetchFrameHistoryDebounced());
      })),
      (this.syncCurrentPositionToHost = Qi(500, !1, () => {
        br(this.showCanvasHistory);
      })),
      (this.countTimerDuration = (e) => Math.ceil((e - Date.now()) / 1e3)),
      (this.onSetCircleToolPattern = this._events.define("set-circle-tool-pattern", (e) => {
        this.circleToolPattern = e.detail.pattern;
      })),
      (this.onDeleteCircle = (e) => {
        const { id: t } = e.target.dataset;
        t &&
          (delete this.circlesData[t],
          (this.circlesData = Object.assign({}, this.circlesData)),
          0 === Object.keys(this.circlesData).length && (this.showColorPicker = !1));
      }),
      (this.onResizeCircle = (e) => {
        const { id: t } = e.target.dataset;
        if (t) {
          const { radius: n } = e.detail;
          (this.lastUsedCircleRadius = n),
            (this.circlesData = Object.assign(Object.assign({}, this.circlesData), {
              [t]: Object.assign(Object.assign({}, this.circlesData[t]), { radius: n }),
            }));
        }
      }),
      (this.onConfirmShape = this._events.define("confirm-shape", () => {
        const e = this.shape;
        if (!e || e.path.length < 3) return;
        const t = e.path.reduce((e, t) => (e.push(t.x), e.push(t.y), e), []),
          n = yi(t),
          i = n.reduce(
            (t, i, r) => (r % 3 == 2 && t.push([e.path[n[r - 2]], e.path[n[r - 1]], e.path[n[r - 0]]]), t),
            []
          );
        (this.circlesData = i.reduce((e, [t, n, i]) => {
          const r = (t.x + n.x + i.x) / 3,
            o = (t.y + n.y + i.y) / 3,
            s = ((ar(r, o, t.x, t.y) + ar(r, o, n.x, n.y) + ar(r, o, i.x, i.y)) / 3) * 0.75,
            a = { id: Hn(), x: Math.round(r), y: Math.round(o), radius: Math.min(Math.round(s), 20) };
          return (e[a.id] = a), e;
        }, {})),
          (this.eraseToolMode = nr.Circle),
          (this.circleToolPattern = ir.Solid);
        const { colors: r } = mn.getState().colorPalette;
        (this.selectedColor = r[Math.round(Math.random() * r.length)].index), (this.showColorPicker = !0);
      })),
      new Op(this),
      cp.setConnectionCallback(this.onWebSocketConnection),
      this._setViewportCustomProperty(),
      Cn(this, cn),
      Cn(this, ln),
      Cn(this, un),
      Cn(this, dn),
      Cn(this, rn),
      Cn(this, bn),
      Cn(this, xn),
      Cn(this, Kt),
      Cn(this, pn),
      Cn(this, fn);
    const e = Yt();
    tn.updateState(e.fullscreen),
      an.updateState(e.screenmode),
      nn.updateState(CLIENT_CONFIG.USE_DEBUG || e.debug),
      e.ts && dn.updateState(Math.max(Ht, Math.min(Bt, e.ts)));
  }
  static get styles() {
    return $t(
      ":host {\n  display: block;\n  color: var(--color-global-white);\n}\n.layout {\n  display: flex;\n  flex-direction: column;\n  height: calc(var(--vh, 1vh) * 100);\n}\n.shadow-styles,\n.top-shadow,\n.bottom-shadow {\n  content: '';\n  position: fixed;\n  left: 0;\n  right: 0;\n  background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(196, 196, 196, 0) 100%);\n  height: 120px;\n  pointer-events: none;\n}\n.top-shadow {\n  top: 0;\n}\n.bottom-shadow {\n  bottom: 0;\n  transform: rotate(180deg);\n}\n.controls,\n.top-controls,\n.bottom-controls {\n  position: fixed;\n  left: calc(var(--sail) + 16px);\n  right: calc(var(--sair) + 16px);\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  justify-content: center;\n  height: 40px;\n  pointer-events: none;\n}\n.top-controls {\n  height: 44px;\n  top: calc(var(--sait) + 16px - 8px);\n}\ngarlic-bread-close-button {\n  position: fixed;\n  left: calc(var(--sail) + 16px);\n  top: calc(var(--sait) + 16px - 8px);\n}\n.garlic-bread-icon-pin {\n  position: fixed;\n  right: calc(var(--sair) + 16px);\n  top: calc(var(--sait) + 16px - 8px);\n}\ngarlic-bread-mute-button {\n  position: fixed;\n  left: calc(var(--sail) + 76px);\n  top: calc(var(--sait) + 16px - 8px);\n}\ngarlic-bread-share-button {\n  margin-right: 55px;\n}\n@media (max-width: 460px) {\n  garlic-bread-share-button {\n    margin-right: auto;\n  }\n}\ngarlic-bread-help-button {\n  margin-left: 55px;\n}\n@media (max-width: 460px) {\n  garlic-bread-help-button {\n    margin-left: auto;\n  }\n}\n.bottom-controls {\n  bottom: calc(var(--saib) + 18px);\n}\ngarlic-bread-share-container {\n  flex: 1;\n}\ngarlic-bread-color-picker {\n  position: absolute;\n  flex: 0 0 auto;\n}\ngarlic-bread-color-picker.relative {\n  position: relative;\n}\n.help-modal {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n.help-modal p {\n  font-size: 16px;\n  line-height: 18px;\n  margin: 0 0 18px;\n}\n@media (min-width: 800px) {\n  .help-modal p {\n    font-size: 18px;\n    line-height: 20px;\n    margin: 0 0 20px;\n  }\n}\n.scrubber-box {\n  margin: 0 10px;\n  flex: 1;\n}\n"
    );
  }
  _setViewportCustomProperty() {
    const e = 0.01 * window.innerHeight;
    e !== this.vhUnit && (document.documentElement.style.setProperty("--vh", `${e}px`), (this.vhUnit = e));
  }
  setDesktopSafeArea() {
    this.hostAppType === Tr.WebDesktop &&
      (document.documentElement.style.setProperty("--desktop-safe-area-inset-top", "20px"),
      document.documentElement.style.setProperty("--desktop-safe-area-inset-bottom", "16px"));
  }
  _handleZooming() {
    const e = window.devicePixelRatio || window.screen.availWidth / document.documentElement.clientWidth;
    if (e != this.pxRatio && ((this.pxRatio = e), tn.getState())) {
      const e = Ye("faceplate-alert", {
        level: Ze.warning,
        message: "100% browser zoom recommended, pinch or scroll to zoom",
      });
      this.dispatchEvent(e);
    }
  }
  connectedCallback() {
    super.connectedCallback(),
      window.addEventListener("resize", this._handleResize),
      window.addEventListener("message", this.onEmbedHostMessage),
      this.shouldGameOverOnError &&
        (window.addEventListener("error", this.onError),
        window.addEventListener("unhandledrejection", this.onUnhandledRejection)),
      (window._setFullScreen = this.setFullScreen),
      (window._setScreenMode = this.setScreenMode),
      this.setDesktopSafeArea(),
      (this.setVHUnitInterval = window.setInterval(this._setViewportCustomProperty, 1e3)),
      this.showHelpModal();
  }
  showHelpModal() {
    if (this.shouldShowHelpModal && this.screenMode.state() === Gt.FullScreen)
      try {
        "1" ===
          (null === localStorage || void 0 === localStorage ? void 0 : localStorage.getItem("help-modal-shown")) ||
          ((this.currentModalType = kp.HowTo),
          null === localStorage || void 0 === localStorage || localStorage.setItem("help-modal-shown", "1"));
      } catch (e) {}
  }
  firstUpdated(e) {
    this.showCanvasHistory && mn.updateState(Object.assign(Object.assign({}, mn.getState()), this.canvasConfiguration)),
      this.user && rn.updateState(this.user),
      sn.updateState(this.shouldZoomOut),
      super.firstUpdated(e);
  }
  update(e) {
    const t = [];
    try {
      !this.showCanvasHistory &&
        e.has("showColorPicker") &&
        !1 === this.showColorPicker &&
        !0 === e.get("showColorPicker") &&
        ((e.has("nextTileAvailableIn") &&
          this.nextTileAvailableIn > 0 &&
          (0 === e.get("nextTileAvailableIn") || void 0 === e.get("nextTileAvailableIn"))) ||
          ((Tp["close-pallette"].currentTime = 0), t.push(Tp["close-pallette"].play()))),
        e.has("selectedPixel") &&
          this.selectedPixel !== e.get("selectedPixel") &&
          (this.nextTileAvailableIn > 0
            ? ((Tp.invalid.currentTime = 0), t.push(Tp.invalid.play()))
            : ((Tp.highlight.currentTime = 0), t.push(Tp.highlight.play()))),
        e.has("selectedColor") &&
          this.selectedColor !== e.get("selectedColor") &&
          void 0 !== this.selectedColor &&
          (!this.showCanvasHistory && this.nextTileAvailableIn > 0
            ? ((Tp.invalid.currentTime = 0), t.push(Tp.invalid.play()))
            : ((Tp["select-color"].currentTime = 0), t.push(Tp["select-color"].play()))),
        !this.showCanvasHistory &&
          e.has("nextTileAvailableIn") &&
          (0 === this.nextTileAvailableIn && 1 === e.get("nextTileAvailableIn") && t.push(Tp["cooldown-end"].play()),
          this.nextTileAvailableIn > 0 &&
            (0 === e.get("nextTileAvailableIn") || void 0 === e.get("nextTileAvailableIn")) &&
            t.push(Tp["cooldown-start"].play()));
    } catch (e) {}
    super.update(e), Promise.all(t).catch(() => {});
  }
  updated(e) {
    this.syncValuesToURL(),
      this.showCanvasHistory && this.syncCurrentPositionToHost(),
      super.updated(e),
      this.showCanvasHistory && (this.initializeDefaultApp(), this.updateActiveZone(dn.getState()));
  }
  initializeDefaultApp() {
    if (!Jt() && this.canvas) {
      const e = mn.getState(),
        t = e.canvasConfigurations.slice(0, e.canvasConfigurations.length),
        { width: n, height: i } = lr(t, e.canvasWidth, e.canvasHeight);
      yn.updateState(n),
        gn.updateState(i),
        this.initializeCanvas(),
        this.updateActiveZone(dn.getState()),
        this.initializeCamera(),
        this.canvas.drawEmptyRect({ x: 0, y: 0 });
    }
  }
  disconnectedCallback() {
    window.removeEventListener("resize", this._handleResize),
      window.removeEventListener("message", this.onEmbedHostMessage),
      window.removeEventListener("error", this.onError),
      window.removeEventListener("unhandledrejection", this.onUnhandledRejection),
      this.showCanvasHistory || (this.cleanSynchronizeConfigurationTimeout(), this.cleanReleaseSyncLockTimeout()),
      this.cleanRestoreAuthTimeout(),
      this.cleanReleaseAuthLockTimeout(),
      clearInterval(this.setVHUnitInterval),
      super.disconnectedCallback();
  }
  initializeCamera() {
    var e, t, n;
    if (!this.camera) return;
    const i = Yt();
    un.updateState(null !== (e = i.px) && void 0 !== e ? e : un.getState());
    const r = mr({
        x: null !== (t = i.cx) && void 0 !== t ? t : Number.NEGATIVE_INFINITY,
        y: null !== (n = i.cy) && void 0 !== n ? n : Number.NEGATIVE_INFINITY,
      }),
      o = !hr(r);
    this.isPlacingPixelViaDeeplink = i.edit && o;
    const s = rr(o ? r : this.camera.getRandomCenter());
    cn.updateState(s.x), ln.updateState(s.y), this.camera.initialize(!this.isPlacingPixelViaDeeplink);
  }
  initializeCanvas(e) {
    var t;
    null === (t = this.canvas) || void 0 === t || t.initialize(e);
  }
  scheduleCanvasResize(e) {
    if (this.showCanvasHistory) return;
    if (this.isSynchronizingConfiguration) return;
    if (((this.nextCanvasConfig = e), this.synchronizeConfigurationTimeout)) return;
    const t = Math.round(3e5 * Math.random());
    Sr(`Scheduled a config update in ${t}ms`),
      (this.synchronizeConfigurationTimeout = window.setTimeout(async () => {
        (this.synchronizeConfigurationTimeout = void 0),
          this.nextCanvasConfig
            ? ((this.isSynchronizingConfiguration = !0),
              await this.updateComplete,
              this.changeCanvasSize(this.nextCanvasConfig))
            : _r("Should not happen: Missing canvas config when trying to apply a scheduled config");
      }, t));
  }
  updateCanvasSize(e, t) {
    const { width: n, height: i } = cr(e.activeZone);
    if ((yn.updateState(n), gn.updateState(i), t)) {
      const e = mr(t);
      this.initializeCanvas(e);
    }
    this.initializeCanvas();
  }
  updateActiveZone(e) {
    var t, n;
    const i =
      null === (n = null === (t = this.activeZones) || void 0 === t ? void 0 : t.sort((e, t) => t.when - e.when)) ||
      void 0 === n
        ? void 0
        : n.find((t) => t.when <= e);
    i && (this.activeZone = i.zone);
  }
  onActive() {
    this.showCanvasHistory || ((tn.getState() || an.getState() === Gt.FullScreen) && this.reactivateAfterInactive());
  }
  reactivateAfterInactive() {
    this.showCanvasHistory ||
      this.showCanvasHistory ||
      !this.isRestoringAfterInactive ||
      this.isGameOver ||
      (Sr("Page active. Enable the connection"),
      (this.isRestoringAuthorization = !1),
      this.cleanRestoreAuthTimeout(),
      this.lockUIAndRefreshAuth());
  }
  onInactive() {
    this.showCanvasHistory ||
      (Sr("Page inactive. Destroy the connection"),
      this.isGameOver || (cp.destroy(), (this.isRestoringAfterInactive = !0)));
  }
  releaseSyncLock() {
    if (this.showCanvasHistory) return;
    if (!mn.getState()) return void _r("Should not happen: Missing global config when trying to release the lock");
    yr(this.camera).find((e) => {
      var t;
      return (
        !this.canvasStateById[e] || (null === (t = this.canvasStateById[e]) || void 0 === t ? void 0 : t.isTainted)
      );
    }) ||
      this.releaseSyncLockTimeout ||
      (this.releaseSyncLockTimeout = window.setTimeout(() => {
        (this.releaseSyncLockTimeout = void 0), (this.isSynchronizingConfiguration = !1);
      }, 3e3));
  }
  getCanvasConfig(e) {
    const t = mn.getState();
    return null == t ? void 0 : t.canvasConfigurations.find((t) => t.index === e);
  }
  cancelPixel() {
    (this.showColorPicker = !1), (this.selectedColor = void 0), (this.circlesData = {}), xn.updateState([]);
  }
  selectPixel(e) {
    var t, n, i, r, o, s, a, c;
    if (!this.isSharing)
      if (null === (t = rn.getState()) || void 0 === t ? void 0 : t.canParticipate)
        if (((this.isPlacingPixelViaDeeplink = !1), this.eraseToolMode))
          if (this.eraseToolMode === nr.Rectangle)
            fr(xn.getState())
              ? (null === (i = this.camera) ||
                  void 0 === i ||
                  i.moveTo(fr((l = xn.getState())) ? { x: (l[0].x + l[1].x) / 2, y: (l[0].y + l[1].y) / 2 } : l[0]),
                (this.showColorPicker = !0))
              : (xn.updateState([e]), null === (r = this.camera) || void 0 === r || r.moveTo(e));
          else if (this.eraseToolMode === nr.Circle) {
            if (Object.keys(this.circlesData).length < mn.getState().adminConfiguration.maxAllowedCircles) {
              const t = Hn();
              (this.circlesData = Object.assign(Object.assign({}, this.circlesData), {
                [t]: Object.assign(Object.assign({}, e), { id: t, radius: this.lastUsedCircleRadius || 10 }),
              })),
                "number" != typeof this.selectedColor && (this.selectedColor = 31),
                (this.showColorPicker = !0),
                null === (o = this.camera) || void 0 === o || o.applyPosition();
            }
          } else
            this.eraseToolMode === nr.Shape &&
              (this.shape
                ? (this.shape = Object.assign(Object.assign({}, this.shape), { path: [...this.shape.path, e] }))
                : (this.shape = Object.assign(Object.assign({}, e), { id: Hn(), path: [e] })));
        else {
          var l;
          if (!this.showCanvasHistory && this.showColorPicker)
            null === (s = this.camera) || void 0 === s || s.moveTo(e);
          else {
            const t = Math.max(hn.getState(), Zt.Optimal);
            hn.updateState(t), null === (a = this.camera) || void 0 === a || a.moveTo(e, t);
          }
          (this.selectedPixel = e),
            this.showCanvasHistory ||
              this.nextTileAvailableIn ||
              (null === (c = rn.getState()) || void 0 === c ? void 0 : c.readonlyMode) ||
              (this.showColorPicker = !0);
        }
      else
        (null === (n = rn.getState()) || void 0 === n ? void 0 : n.readonlyMode) ||
          null == ri ||
          ri.signIn(wr(!1, this.showCanvasHistory));
  }
  lockUIAndRefreshAuth() {
    this.isRestoringAuthorization ||
      this.restoreAuthTimeout ||
      ((this.isRestoringAuthorization = !0),
      this.requestAuthRefresh(),
      (this.restoreAuthTimeout = window.setTimeout(() => {
        this.haltAndAskToReload("Failed to restore authorization");
      }, 15e3)));
  }
  releaseAuthLock() {
    this.isRestoringAuthorization &&
      !this.releaseAuthLockTimeout &&
      (this.cleanRestoreAuthTimeout(),
      (this.releaseAuthLockTimeout = window.setTimeout(() => {
        (this.releaseAuthLockTimeout = void 0), (this.isRestoringAuthorization = !1);
      }, 3e3)));
  }
  handleFailedResponse(e) {
    if (e.type === ap.UnauthorizedError) this.lockUIAndRefreshAuth();
    else if (e.type === ap.PixelRateLimit)
      (this.timerDuration = this.countTimerDuration(e.nextAvailablePixelTimestamp)),
        this.pixelAvailabilityTimer.startTimer(this.timerDuration);
    else {
      if (tn.getState()) {
        const t = Ye("faceplate-alert", { level: Ze.warning, message: this.showCanvasHistory ? Hd : e.message });
        this.dispatchEvent(t);
      }
      e.type !== ap.GenericError && _r(`Error while making an API request: ${e.message}`, e);
    }
  }
  async onUpdateAuthHeaders(e, t) {
    var n;
    if (this.isGameOver) return;
    if (!t && !this.isRestoringAfterInactive) return;
    const i =
      (null === (n = rn.getState()) || void 0 === n ? void 0 : n.readonlyMode) &&
      mn.getState().canvasConfigurations.every((e) => this.canvasStateById[e.index]) &&
      Jt();
    cp.setShouldSubscribe(!this.showCanvasHistory && !i),
      cp.setAuthHeaders(e),
      this.showCanvasHistory && (this.releaseAuthLock(), (this.isGameOver = !1)),
      Kt.getState().authHeaders || Kt.updateState(Object.assign(Object.assign({}, Kt.getState()), { authHeaders: !0 }));
    try {
      const e = [];
      this.showCanvasHistory || e.push(cp.subscribeToConfigUpdates(this.onConfigurationUpdateMessage)),
        e.push(this.fetchUserData()),
        await Promise.all(e),
        await this.initializeCooldownTimer();
    } catch (e) {
      if (tn.getState()) {
        const t = Ye("faceplate-alert", { level: Ze.error, message: e.message });
        this.dispatchEvent(t);
      }
      _r("Error while updating auth headers", e);
    }
    this.showCanvasHistory && this.fetchFrameHistory();
  }
  async fetchUserData() {
    if (!rn.getState())
      try {
        const e = await cp.fetchUserData();
        e.type === ap.Success ? rn.updateState(e.data) : this.handleFailedResponse(e);
      } catch (e) {
        _r("Error while fetching user data", e);
      }
  }
  async initializeCooldownTimer() {
    var e, t, n;
    if (!Kt.getState().cooldown) {
      if (null === (e = rn.getState()) || void 0 === e ? void 0 : e.canParticipate)
        try {
          const e = await cp.getUserCooldown();
          e.type === ap.Success
            ? (null === (t = e.data) || void 0 === t ? void 0 : t.nextAvailablePixelTimestamp) &&
              ((this.timerDuration = this.countTimerDuration(
                null === (n = e.data) || void 0 === n ? void 0 : n.nextAvailablePixelTimestamp
              )),
              this.pixelAvailabilityTimer.startTimer(this.timerDuration))
            : e.type !== ap.GenericError && this.handleFailedResponse(e);
        } catch (e) {
          _r("Error while fetching user cooldown", e);
        }
      Kt.updateState(Object.assign(Object.assign({}, Kt.getState()), { cooldown: !0 }));
    }
  }
  render() {
    var e, t, n, i;
    const r = Jt(),
      o = this.isFullScreen.state(),
      s = ii(),
      a = null === (e = rn.getState()) || void 0 === e ? void 0 : e.readonlyMode,
      c = this.screenMode.state(),
      l = bn.getState(),
      u = null === (t = rn.getState()) || void 0 === t ? void 0 : t.isModerator,
      h = !this.showCanvasHistory && this.isAdminOverride && r && !s && o,
      d = this.shouldCenterReticle && !this.eraseToolMode;
    return j` ${
      h
        ? j`<garlic-bread-admin-controls erase-tool-mode="${ce(this.eraseToolMode)}" ?enable-admin-shape-tool="${
            this.enableAdminShapeTool
          }"></garlic-bread-admin-controls>`
        : ""
    } <div class="layout" @mousedown="${this.onMouseDown}" @touchstart="${this.onTouchStart}" @touchend="${
      this.onTouchEnd
    }" @touchmove="${this.onTouchMove}"> <garlic-bread-share-container ?is-sheet-open="${
      this.isSharing
    }"> <garlic-bread-camera widgets="${JSON.stringify(
      Object.assign(
        Object.assign(Object.assign({}, this.shape ? { [this.shape.id]: this.shape } : {}), this.circlesData),
        this.activeZone ? { fog: { x: 0, y: 0, id: "fog" } } : {}
      )
    )}" ?track-mousemove="${!this.showColorPicker && this.eraseToolMode === nr.Rectangle}" ?show-pixel-history="${
      this.showPixelHistory
    }" ?should-center-reticle="${d}"> <garlic-bread-canvas ?is-pending="${
      this.isFetchingHistory
    }"></garlic-bread-canvas> ${
      o && !this.eraseToolMode
        ? j` <garlic-bread-pixel-preview slot="pixel" color="${ce(this.selectedColor)}"></garlic-bread-pixel-preview> `
        : ""
    } ${
      this.eraseToolMode && (null === (n = xn.getState()) || void 0 === n ? void 0 : n.length)
        ? j`<garlic-bread-erasure-preview slot="pixel" color="${ce(this.selectedColor)}" erase-tool-mode="${ce(
            this.eraseToolMode
          )}"></garlic-bread-erasure-preview>`
        : ""
    } ${
      this.shape
        ? j` <garlic-bread-admin-shape-tool slot="pixel-${this.shape.id}" shape="${JSON.stringify(
            this.shape
          )}"></garlic-bread-admin-shape-tool> `
        : ""
    } ${
      this.eraseToolMode === nr.Circle
        ? Object.entries(this.circlesData).map(
            ([e, { x: t, y: n, radius: i }]) =>
              j` <garlic-bread-admin-circle-tool slot="pixel-${e}" data-id="${e}" x="${t}" y="${n}" radius="${i}" color="${ce(
                this.selectedColor
              )}" pattern="${ce(this.circleToolPattern)}" @delete="${this.onDeleteCircle}" @resize-circle="${
                this.onResizeCircle
              }"></garlic-bread-admin-circle-tool> `
          )
        : ""
    } ${
      this.activeZone
        ? j` <garlic-bread-fog-of-war slot="pixel-fog" active-zone="${JSON.stringify(
            this.activeZone
          )}"></garlic-bread-fog-of-war> `
        : ""
    } </garlic-bread-camera> <garlic-bread-sonar-animation ?show-radar-animation="${
      this.showRadarAnimation
    }"></garlic-bread-sonar-animation> ${
      o
        ? j` <div class="top-shadow"></div> <div class="bottom-shadow"></div> <div class="top-controls"> ${
            !u || this.showCanvasHistory || a
              ? ""
              : j`<garlic-bread-icon-button class="garlic-bread-icon-pin" @click="${this.onPinButtonClick}"> <icon-pin fill></icon-pin> </garlic-bread-icon-button>`
          } ${
            this.eraseToolMode === nr.Circle
              ? j`<garlic-bread-admin-circle-tool-status count="${
                  Object.values(this.circlesData).filter(Boolean).length
                }"></garlic-bread-admin-circle-tool-status> `
              : ""
          } </div> `
        : ""
    } <div class="bottom-controls" style="${Te({
      opacity: this.showColorPicker ? "0" : "1",
      visibility: this.showColorPicker ? "hidden" : "visible",
      transition: this.showColorPicker
        ? "opacity 0.2s ease-in-out 0s, visibility 0.2s ease-in-out 0s"
        : "opacity 0.2s ease-in-out 0.2s, visibility 0.2s ease-in-out 0.2s",
    })}"> ${o ? j`<garlic-bread-share-button></garlic-bread-share-button>` : ""} ${
      this.showCanvasHistory
        ? o
          ? j`<div class="scrubber-box"> <garlic-bread-scrubber></garlic-bread-scrubber> </div>`
          : j`<garlic-bread-status-pill screen-mode="${ce(c)}" erase-tool-mode="${ce(this.eraseToolMode)}" shape="${ce(
              JSON.stringify(this.shape)
            )}"></garlic-bread-status-pill>`
        : a
        ? ""
        : j` <garlic-bread-status-pill next-tile-available-in="${ce(this.nextTileAvailableIn)}" timer-duration="${
            this.timerDuration
          }" screen-mode="${ce(c)}" erase-tool-mode="${ce(this.eraseToolMode)}" shape="${ce(
            JSON.stringify(this.shape)
          )}"></garlic-bread-status-pill> `
    } ${o ? j`<garlic-bread-help-button @click="${this.onHelpButtonClick}"></garlic-bread-help-button>` : ""} </div> ${
      o && (null === (i = rn.getState()) || void 0 === i ? void 0 : i.canParticipate)
        ? j` <garlic-bread-color-picker class="${tr({ relative: d })}" color="${ce(
            this.selectedColor
          )}" erase-tool-mode="${ce(this.eraseToolMode)}" circle-tool-pattern="${ce(
            this.circleToolPattern
          )}" ?is-visible="${this.showColorPicker}" ?is-locked="${
            this.isPlacingPixel || !!this.nextTileAvailableIn
          }" ?should-center-reticle="${d}"></garlic-bread-color-picker> `
        : ""
    } </garlic-bread-share-container> </div> <garlic-bread-modal ?isOpen="${
      this.currentModalType !== kp.None
    }" modal-type="${this.currentModalType}"> </garlic-bread-modal> ${
      l ? j` <garlic-bread-admin-ban ?isOpen="${l}"> </garlic-bread-admin-ban> ` : ""
    } <faceplate-perfmark name="${mp.FIRST_CONTENTFUL_PAINT}"></faceplate-perfmark> ${
      r ? j` <faceplate-perfmark name="${mp.FIRST_MEANINGFUL_PAINT}"></faceplate-perfmark> ` : ""
    } <slot></slot> <garlic-bread-overlay type="${ce(
      (this.isGameOver && yp.GameOver) ||
        (!r && yp.Init) ||
        (!this.showCanvasHistory && this.isSynchronizingConfiguration && yp.Sync) ||
        (this.isRestoringAuthorization && yp.Auth) ||
        void 0
    )}"></garlic-bread-overlay> ${
      o && !this.isSharing ? j`<garlic-bread-close-button></garlic-bread-close-button>` : ""
    } `;
  }
};
$e([Ji({ context: Fo }), Ue({ type: String, attribute: "host-app-type" })], wv.prototype, "hostAppType", void 0),
  $e([Ji({ context: Vo }), Ue({ type: String, attribute: "browser-type" })], wv.prototype, "browserType", void 0),
  $e(
    [Ji({ context: xp }), Ue({ type: Boolean, attribute: "show-canvas-history" })],
    wv.prototype,
    "showCanvasHistory",
    void 0
  ),
  $e([Ue({ type: Boolean, attribute: "is-admin-override" })], wv.prototype, "isAdminOverride", void 0),
  $e([Ue({ type: Boolean, attribute: "enable-admin-shape-tool" })], wv.prototype, "enableAdminShapeTool", void 0),
  $e([Ue({ type: Boolean, attribute: "show-help-link" })], wv.prototype, "showHelpLink", void 0),
  $e([Ue({ type: Boolean, attribute: "show-pixel-history" })], wv.prototype, "showPixelHistory", void 0),
  $e([Ue({ type: Boolean, attribute: "game-over-on-error" })], wv.prototype, "shouldGameOverOnError", void 0),
  $e([Ue({ type: Boolean, attribute: "should-zoom-out" })], wv.prototype, "shouldZoomOut", void 0),
  $e([Ue({ type: Boolean, attribute: "should-center-reticle" })], wv.prototype, "shouldCenterReticle", void 0),
  $e([Ue({ type: Boolean, attribute: "should-show-help-modal" })], wv.prototype, "shouldShowHelpModal", void 0),
  $e(
    [Ue({ type: Boolean, attribute: "should-show-community-radar" })],
    wv.prototype,
    "shouldShowCommunityRadar",
    void 0
  ),
  $e([Ue({ type: String, attribute: "radar-zoom-variant" })], wv.prototype, "radarZoomVariant", void 0),
  $e([Ue({ type: Object })], wv.prototype, "user", void 0),
  $e([Ue({ type: Object, attribute: "canvas-configuration" })], wv.prototype, "canvasConfiguration", void 0),
  $e([Ue({ type: Array, attribute: "active-zones" })], wv.prototype, "activeZones", void 0),
  $e([Ji({ context: Uo }), Be()], wv.prototype, "showColorPicker", void 0),
  $e([Be()], wv.prototype, "eraseToolMode", void 0),
  $e([Be()], wv.prototype, "selectedColor", void 0),
  $e([Be()], wv.prototype, "nextTileAvailableIn", void 0),
  $e([Be()], wv.prototype, "selectedPixel", void 0),
  $e([Be()], wv.prototype, "showZoomControl", void 0),
  $e([Be()], wv.prototype, "isSharing", void 0),
  $e([Be()], wv.prototype, "canvasStateById", void 0),
  $e([Be()], wv.prototype, "isPlacingPixel", void 0),
  $e([Be()], wv.prototype, "currentModalType", void 0),
  $e([Be()], wv.prototype, "isSynchronizingConfiguration", void 0),
  $e([Be()], wv.prototype, "isRestoringAuthorization", void 0),
  $e([Be()], wv.prototype, "isRestoringAfterInactive", void 0),
  $e([Be()], wv.prototype, "isGameOver", void 0),
  $e([Be()], wv.prototype, "isFetchingHistory", void 0),
  $e([Be()], wv.prototype, "circleToolPattern", void 0),
  $e([Be()], wv.prototype, "activeZone", void 0),
  $e([qe("garlic-bread-camera")], wv.prototype, "camera", void 0),
  $e([qe("garlic-bread-canvas")], wv.prototype, "canvas", void 0),
  $e([Be()], wv.prototype, "showRadarAnimation", void 0),
  $e([Be()], wv.prototype, "circlesData", void 0),
  $e([Be()], wv.prototype, "shape", void 0),
  (wv = $e([Fe("garlic-bread-embed")], wv));
//# sourceMappingURL=index-f77fa3f5fff04de1.js.map
