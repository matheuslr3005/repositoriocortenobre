/* @ds-bundle: {"format":4,"namespace":"FacasArtesanaisDesignSystem_ba06ad","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/Icon.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Radio","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Switch","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Input.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Badge","sourcePath":"components/surfaces/Badge.jsx"},{"name":"Tag","sourcePath":"components/surfaces/Badge.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"CardMeta","sourcePath":"components/surfaces/Card.jsx"},{"name":"CardTitle","sourcePath":"components/surfaces/Card.jsx"},{"name":"CardText","sourcePath":"components/surfaces/Card.jsx"}],"sourceHashes":{"components/core/Button.jsx":"af0ffe85b180","components/core/Icon.jsx":"dc61b777075a","components/feedback/Dialog.jsx":"7fb628ebdc17","components/forms/Checkbox.jsx":"dc2916da5630","components/forms/Input.jsx":"aa307ef80c0e","components/navigation/Tabs.jsx":"2b0c2d9b043e","components/surfaces/Badge.jsx":"90393ca52949","components/surfaces/Card.jsx":"3c53cdb282f8","ui_kits/site-catalogo/Chrome.jsx":"19847ebda150","ui_kits/site-catalogo/Screens.jsx":"541f065d4f96","ui_kits/site-catalogo/data.js":"94b159d57d05"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FacasArtesanaisDesignSystem_ba06ad = window.FacasArtesanaisDesignSystem_ba06ad || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const BASE = {
  fontFamily: "var(--font-body)",
  fontWeight: "var(--weight-medio)",
  letterSpacing: "var(--tracking-kicker)",
  borderRadius: "var(--radius-none)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--space-10)",
  cursor: "pointer",
  textDecoration: "none",
  transition: "var(--transicao-cor)",
  borderStyle: "solid",
  borderWidth: "var(--border-width)",
  whiteSpace: "nowrap"
};
const SIZES = {
  sm: {
    padding: "var(--pad-botao-sm)",
    fontSize: "var(--text-legenda)"
  },
  md: {
    padding: "var(--pad-botao)",
    fontSize: "var(--text-caption)"
  }
};
function skin(variant, hover, active) {
  if (variant === "primary") {
    return {
      background: active ? "var(--action-bg-press)" : hover ? "var(--action-bg-hover)" : "var(--action-bg)",
      color: "var(--action-fg)",
      borderColor: active ? "var(--action-bg-press)" : hover ? "var(--action-bg-hover)" : "var(--action-bg)"
    };
  }
  if (variant === "secondary") {
    return {
      background: "transparent",
      color: "var(--text-primary)",
      borderColor: hover || active ? "var(--prata)" : "var(--action-quiet-border)"
    };
  }
  return {
    background: "transparent",
    color: hover || active ? "var(--text-primary)" : "var(--text-secondary)",
    borderColor: "transparent"
  };
}
function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  href,
  iconLeft,
  iconRight,
  onClick,
  type = "button",
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const Tag = href ? "a" : "button";
  const composed = {
    ...BASE,
    ...SIZES[size],
    ...skin(variant, !disabled && hover, !disabled && active),
    width: fullWidth ? "100%" : undefined,
    opacity: disabled ? 0.45 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
    color: disabled ? "var(--state-disabled-fg)" : skin(variant, false, false).color,
    ...style
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({}, rest, {
    type: href ? undefined : type,
    href: href,
    onClick: disabled ? undefined : onClick,
    "aria-disabled": disabled || undefined,
    disabled: href ? undefined : disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: composed
  }), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/* Ícone Lucide (lucide-static via CDN) desenhado como máscara sobre currentColor,
   para herdar a cor do texto sem inline de SVG. */
const CDN = "https://unpkg.com/lucide-static@0.446.0/icons/";
function Icon({
  name,
  size = 16,
  color,
  style,
  ...rest
}) {
  const url = `url("${CDN}${name}.svg")`;
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    "aria-hidden": "true",
    style: {
      display: "inline-block",
      width: size,
      height: size,
      flex: "none",
      background: color || "currentColor",
      WebkitMaskImage: url,
      maskImage: url,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      ...style
    }
  }));
}
function IconButton({
  icon,
  label,
  variant = "quiet",
  size = 36,
  disabled,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const filete = variant === "filete";
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    type: "button",
    title: label,
    "aria-label": label,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: size,
      height: size,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: "transparent",
      borderRadius: "var(--radius-none)",
      borderStyle: "solid",
      borderWidth: "var(--border-width)",
      borderColor: filete ? hover ? "var(--prata)" : "var(--linha)" : "transparent",
      color: disabled ? "var(--state-disabled-fg)" : hover ? "var(--text-primary)" : "var(--text-muted)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      transition: "var(--transicao-cor)",
      ...style
    }
  }), icon);
}
Object.assign(__ds_scope, { Icon, IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Dialog({
  open,
  title,
  kicker,
  children,
  footer,
  onClose,
  width = 520,
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "presentation",
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(23,21,15,0.86)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "var(--space-32)",
      zIndex: 100,
      animation: "none"
    }
  }, /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: width,
      background: "var(--surface-raised)",
      border: "var(--border-hairline-forte)",
      borderRadius: "var(--radius-none)",
      boxShadow: "var(--shadow-none)",
      padding: "var(--space-32)",
      ...style
    }
  }), kicker ? /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-legenda)",
      letterSpacing: "var(--tracking-kicker)",
      color: "var(--text-muted)",
      margin: "0 0 var(--space-10)"
    }
  }, kicker) : null, title ? /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-titulo-2)",
      color: "var(--text-primary)",
      margin: "0 0 var(--space-16)"
    }
  }, title) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-caption)",
      color: "var(--text-secondary)"
    }
  }, children), footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-12)",
      justifyContent: "flex-end",
      marginTop: "var(--space-28)",
      paddingTop: "var(--space-20)",
      borderTop: "var(--border-hairline)"
    }
  }, footer) : null));
}
function Toast({
  children,
  tone = "neutro",
  onClose,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    role: "status",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-14)",
      background: "var(--surface-raised)",
      border: "var(--border-hairline-forte)",
      borderRadius: "var(--radius-none)",
      padding: "var(--space-14) var(--space-18)",
      font: "var(--type-caption)",
      color: "var(--text-primary)",
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 5,
      flex: "none",
      borderRadius: "var(--radius-pill)",
      background: tone === "brasa" ? "var(--brasa)" : "var(--prata)"
    }
  }), /*#__PURE__*/React.createElement("span", null, children), onClose ? /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Fechar",
    style: {
      background: "none",
      border: "none",
      color: "var(--text-muted)",
      cursor: "pointer",
      fontSize: 15,
      lineHeight: 1,
      padding: 0,
      marginLeft: "var(--space-6)"
    }
  }, "\xD7") : null);
}
function Tooltip({
  label,
  children,
  side = "top",
  style,
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const pos = side === "bottom" ? {
    top: "calc(100% + 8px)",
    left: "50%",
    transform: "translateX(-50%)"
  } : side === "right" ? {
    left: "calc(100% + 8px)",
    top: "50%",
    transform: "translateY(-50%)"
  } : {
    bottom: "calc(100% + 8px)",
    left: "50%",
    transform: "translateX(-50%)"
  };
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false),
    style: {
      position: "relative",
      display: "inline-flex",
      ...style
    }
  }), children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: "absolute",
      ...pos,
      opacity: open ? 1 : 0,
      visibility: open ? "visible" : "hidden",
      transition: "var(--transicao-fade)",
      pointerEvents: "none",
      background: "var(--carbono-alt)",
      border: "var(--border-hairline-forte)",
      color: "var(--text-primary)",
      font: "var(--type-legenda)",
      padding: "var(--space-6) var(--space-10)",
      whiteSpace: "nowrap",
      zIndex: 50
    }
  }, label));
}
Object.assign(__ds_scope, { Dialog, Toast, Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ROW = {
  display: "inline-flex",
  alignItems: "flex-start",
  gap: "var(--space-12)",
  cursor: "pointer",
  font: "var(--type-caption)",
  color: "var(--text-primary)"
};
const BOX = {
  width: 16,
  height: 16,
  flex: "none",
  marginTop: 3,
  borderStyle: "solid",
  borderWidth: "var(--border-width)",
  transition: "var(--transicao-cor)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};
function Checkbox({
  label,
  checked,
  defaultChecked,
  disabled,
  onChange,
  id,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      ...ROW,
      opacity: disabled ? 0.45 : 1,
      cursor: disabled ? "not-allowed" : "pointer",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({}, rest, {
    id: id,
    type: "checkbox",
    checked: checked,
    defaultChecked: defaultChecked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  })), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      ...BOX,
      borderRadius: "var(--radius-none)",
      borderColor: checked ? "var(--brasa)" : "var(--linha-forte)",
      background: checked ? "var(--brasa)" : "transparent"
    }
  }, checked ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 6,
      borderLeft: "1.5px solid var(--osso)",
      borderBottom: "1.5px solid var(--osso)",
      transform: "rotate(-45deg) translate(1px, -1px)"
    }
  }) : null), /*#__PURE__*/React.createElement("span", null, label));
}
function Radio({
  label,
  checked,
  name,
  value,
  disabled,
  onChange,
  id,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      ...ROW,
      opacity: disabled ? 0.45 : 1,
      cursor: disabled ? "not-allowed" : "pointer",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({}, rest, {
    id: id,
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  })), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      ...BOX,
      borderRadius: "var(--radius-pill)",
      borderColor: checked ? "var(--brasa)" : "var(--linha-forte)"
    }
  }, checked ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "var(--radius-pill)",
      background: "var(--brasa)"
    }
  }) : null), /*#__PURE__*/React.createElement("span", null, label));
}
function Switch({
  label,
  checked,
  disabled,
  onChange,
  id,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      ...ROW,
      alignItems: "center",
      opacity: disabled ? 0.45 : 1,
      cursor: disabled ? "not-allowed" : "pointer",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({}, rest, {
    id: id,
    type: "checkbox",
    role: "switch",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  })), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 38,
      height: 18,
      flex: "none",
      borderStyle: "solid",
      borderWidth: "var(--border-width)",
      borderColor: checked ? "var(--brasa)" : "var(--linha-forte)",
      background: checked ? "var(--brasa-fosca)" : "transparent",
      display: "flex",
      alignItems: "center",
      padding: 2,
      transition: "var(--transicao-cor)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 12,
      background: checked ? "var(--brasa)" : "var(--aco)",
      marginLeft: checked ? 18 : 0,
      transition: `margin-left var(--dur-rapido) var(--ease-fio), background-color var(--dur-rapido) var(--ease-fio)`
    }
  })), /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox, Radio, Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const LABEL = {
  display: "block",
  font: "var(--type-legenda)",
  color: "var(--text-secondary)",
  marginBottom: "var(--space-8)"
};
const FIELD = {
  width: "100%",
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-corpo-sm)",
  fontWeight: "var(--weight-regular)",
  lineHeight: "var(--leading-compacto)",
  color: "var(--text-primary)",
  background: "var(--field-bg)",
  padding: "var(--pad-campo)",
  borderRadius: "var(--radius-none)",
  borderStyle: "solid",
  borderWidth: "var(--border-width)",
  transition: "var(--transicao-cor)",
  outline: "none"
};
function Input({
  label,
  hint,
  error,
  multiline = false,
  rows = 4,
  disabled,
  id,
  style,
  wrapperStyle,
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  const Tag = multiline ? "textarea" : "input";
  const borderColor = error ? "var(--brasa)" : focus ? "var(--field-border-focus)" : "var(--field-border)";
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: "block",
      ...wrapperStyle
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: LABEL
  }, label) : null, /*#__PURE__*/React.createElement(Tag, _extends({}, rest, {
    id: id,
    rows: multiline ? rows : undefined,
    disabled: disabled,
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      ...FIELD,
      borderColor,
      opacity: disabled ? 0.45 : 1,
      resize: multiline ? "vertical" : undefined,
      ...style
    }
  })), hint || error ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "var(--type-legenda)",
      color: error ? "var(--brasa)" : "var(--text-muted)",
      marginTop: "var(--space-6)"
    }
  }, error || hint) : null);
}
function Select({
  label,
  hint,
  options = [],
  disabled,
  id,
  style,
  wrapperStyle,
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: "block",
      ...wrapperStyle
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: LABEL
  }, label) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({}, rest, {
    id: id,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      ...FIELD,
      borderColor: focus ? "var(--field-border-focus)" : "var(--field-border)",
      opacity: disabled ? 0.45 : 1,
      appearance: "none",
      paddingRight: "var(--space-36)",
      ...style
    }
  }), options.map(o => {
    const value = typeof o === "string" ? o : o.value;
    const text = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value,
      style: {
        background: "var(--carbono-alt)",
        color: "var(--osso)"
      }
    }, text);
  })), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      right: "var(--space-12)",
      top: "50%",
      marginTop: -3,
      width: 8,
      height: 6,
      background: "var(--text-muted)",
      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
      pointerEvents: "none"
    }
  })), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "var(--type-legenda)",
      color: "var(--text-muted)",
      marginTop: "var(--space-6)"
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Input, Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  style,
  ...rest
}) {
  const [internal, setInternal] = useState(defaultValue ?? (items[0] && (items[0].value ?? items[0])));
  const active = value !== undefined ? value : internal;
  const select = v => {
    if (value === undefined) setInternal(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    role: "tablist",
    style: {
      display: "flex",
      gap: "var(--space-28)",
      borderBottom: "var(--border-hairline)",
      ...style
    }
  }), items.map(it => {
    const v = it.value ?? it;
    const label = it.label ?? it;
    const on = v === active;
    return /*#__PURE__*/React.createElement(Tab, {
      key: v,
      label: label,
      active: on,
      onSelect: () => select(v)
    });
  }));
}
function Tab({
  label,
  active,
  onSelect
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("button", {
    role: "tab",
    "aria-selected": active,
    onClick: onSelect,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      appearance: "none",
      background: "transparent",
      border: "none",
      borderBottom: `2px solid ${active ? "var(--brasa)" : "transparent"}`,
      borderRadius: "var(--radius-none)",
      padding: "0 0 var(--space-12)",
      marginBottom: -1,
      cursor: "pointer",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-caption)",
      fontWeight: active ? "var(--weight-medio)" : "var(--weight-regular)",
      letterSpacing: "var(--tracking-kicker)",
      color: active ? "var(--text-primary)" : hover ? "var(--text-primary)" : "var(--text-secondary)",
      transition: "var(--transicao-cor)"
    }
  }, label);
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const SHARED = {
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--space-8)",
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-legenda)",
  lineHeight: 1,
  letterSpacing: "var(--tracking-kicker)",
  borderRadius: "var(--radius-none)",
  borderStyle: "solid",
  borderWidth: "var(--border-width)",
  padding: "6px 10px",
  whiteSpace: "nowrap"
};
const TONES = {
  neutro: {
    color: "var(--text-secondary)",
    borderColor: "var(--linha)",
    background: "transparent"
  },
  brasa: {
    color: "var(--brasa)",
    borderColor: "var(--brasa)",
    background: "transparent"
  },
  cheio: {
    color: "var(--osso)",
    borderColor: "var(--brasa)",
    background: "var(--brasa)"
  },
  prata: {
    color: "var(--carbono)",
    borderColor: "var(--prata)",
    background: "var(--prata)"
  }
};
function Badge({
  children,
  tone = "neutro",
  dot = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      ...SHARED,
      ...TONES[tone],
      ...style
    }
  }), dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 5,
      borderRadius: "var(--radius-pill)",
      background: "currentColor",
      flex: "none"
    }
  }) : null, children);
}
function Tag({
  children,
  selected = false,
  onClick,
  onRemove,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const interactive = Boolean(onClick);
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    role: interactive ? "button" : undefined,
    tabIndex: interactive ? 0 : undefined,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...SHARED,
      padding: "8px 12px",
      cursor: interactive ? "pointer" : "default",
      color: selected ? "var(--carbono)" : "var(--text-primary)",
      background: selected ? "var(--osso)" : "transparent",
      borderColor: selected ? "var(--osso)" : hover ? "var(--prata)" : "var(--linha-forte)",
      transition: "var(--transicao-cor)",
      ...style
    }
  }), children, onRemove ? /*#__PURE__*/React.createElement("span", {
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    },
    style: {
      cursor: "pointer",
      opacity: 0.7,
      fontFamily: "var(--font-body)",
      fontSize: "14px",
      lineHeight: 1
    }
  }, "\xD7") : null);
}
Object.assign(__ds_scope, { Badge, Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Badge.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANTS = {
  filete: {
    background: "transparent",
    border: "var(--border-hairline)",
    padding: 0
  },
  erguido: {
    background: "var(--surface-raised)",
    border: "var(--border-hairline)",
    padding: "var(--pad-card-y) var(--pad-card-x)"
  },
  topo: {
    background: "transparent",
    borderTop: "var(--border-hairline)",
    paddingTop: "var(--space-16)"
  },
  couro: {
    background: "var(--surface-couro)",
    border: "none",
    padding: "var(--space-28) var(--space-24)"
  },
  nua: {
    background: "transparent",
    border: "none",
    padding: 0
  }
};
function Card({
  variant = "erguido",
  children,
  as = "div",
  style,
  ...rest
}) {
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({}, rest, {
    style: {
      borderRadius: "var(--radius-none)",
      boxShadow: "var(--shadow-none)",
      ...VARIANTS[variant],
      ...style
    }
  }), children);
}
function CardMeta({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      padding: "var(--pad-meta-card)",
      ...style
    }
  }), children);
}
function CardTitle({
  children,
  level = "h3",
  style,
  ...rest
}) {
  const Tag = level;
  return /*#__PURE__*/React.createElement(Tag, _extends({}, rest, {
    style: {
      font: "var(--type-titulo-2)",
      color: "var(--text-primary)",
      margin: "0 0 var(--space-4)",
      ...style
    }
  }), children);
}
function CardText({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("p", _extends({}, rest, {
    style: {
      font: "var(--type-caption)",
      color: "var(--text-secondary)",
      margin: 0,
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Card, CardMeta, CardTitle, CardText });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site-catalogo/Chrome.jsx
try { (() => {
/* Cabeçalho, rodapé e blocos de moldura do site. */
const {
  IconButton,
  Icon,
  Button,
  Badge
} = window.FacasArtesanaisDesignSystem_ba06ad;
function Wordmark({
  size = 19
}) {
  /* Sem logotipo na identidade original: o nome em Fraunces 300 ocupa o lugar da marca. */
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 300,
      fontSize: size,
      letterSpacing: "0.02em",
      color: "var(--osso)",
      lineHeight: 1
    }
  }, "Facas Artesanais");
}
function Header({
  rota,
  ir,
  onSacola,
  itens
}) {
  const links = [["catalogo", "Catálogo"], ["produto", "A peça"], ["oficio", "Ofício"]];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      borderBottom: "1px solid var(--linha)",
      position: "sticky",
      top: 0,
      background: "var(--carbono)",
      zIndex: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--page-max)",
      margin: "0 auto",
      padding: "20px var(--page-pad)",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-40)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      ir("home");
    },
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(Wordmark, null)), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: "var(--space-28)",
      marginLeft: "auto"
    }
  }, links.map(([r, label]) => /*#__PURE__*/React.createElement("a", {
    key: r,
    href: "#",
    onClick: e => {
      e.preventDefault();
      ir(r === "oficio" ? "oficio" : r);
    },
    style: {
      fontSize: "var(--text-caption)",
      letterSpacing: "var(--tracking-kicker)",
      textDecoration: "none",
      color: rota === r ? "var(--osso)" : "var(--osso-dim)",
      paddingBottom: 2,
      borderBottom: rota === r ? "1px solid var(--brasa)" : "1px solid transparent"
    }
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Buscar",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 16
    })
  }), /*#__PURE__*/React.createElement(IconButton, {
    label: "Sacola",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "shopping-bag",
      size: 16
    }),
    onClick: onSacola
  }), itens ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-legenda)",
      color: "var(--brasa)",
      marginLeft: -4
    }
  }, itens) : null)));
}
function Kicker({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-kicker)",
      letterSpacing: "var(--tracking-kicker)",
      color: "var(--text-secondary)",
      margin: 0,
      ...style
    }
  }, children);
}
function Secao({
  titulo,
  children,
  regra = true
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      marginTop: "var(--secao-gap)"
    }
  }, regra ? /*#__PURE__*/React.createElement("hr", {
    style: {
      border: "none",
      borderTop: "1px solid var(--linha)",
      margin: "0 0 var(--regra-gap)"
    }
  }) : null, titulo ? /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-secao)",
      color: "var(--text-primary)",
      margin: "0 0 var(--space-20)"
    }
  }, titulo) : null, children);
}

/* Placeholder de fotografia: a identidade pede macro de produto, que não existe nos
   arquivos fornecidos. Fica declarado em vez de ilustrado. */
function Foto({
  ratio = "4/5",
  rotulo = "macro de produto",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: ratio,
      background: "var(--carbono-alt)",
      border: "1px solid var(--linha)",
      display: "flex",
      alignItems: "flex-end",
      padding: "var(--space-12)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-legenda)",
      color: "var(--aco)",
      letterSpacing: "var(--tracking-kicker)"
    }
  }, rotulo));
}
function Footer({
  ir
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      marginTop: "var(--space-140)",
      borderTop: "1px solid var(--linha)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--page-max)",
      margin: "0 auto",
      padding: "40px var(--page-pad) 64px",
      display: "flex",
      gap: "var(--space-40)",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 17
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-legenda)",
      color: "var(--text-muted)",
      marginTop: "var(--space-12)",
      maxWidth: "38ch"
    }
  }, "Pe\xE7as forjadas uma a uma. Lotes numerados, afia\xE7\xE3o anual inclusa.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-40)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Kicker, {
    style: {
      marginBottom: "var(--space-12)",
      fontSize: "var(--text-legenda)",
      color: "var(--text-muted)"
    }
  }, "Cat\xE1logo"), ["Chef", "Nakiri", "Petty"].map(t => /*#__PURE__*/React.createElement("p", {
    key: t,
    style: {
      margin: "0 0 var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      ir("catalogo");
    },
    style: {
      font: "var(--type-caption)",
      color: "var(--text-secondary)",
      textDecoration: "none"
    }
  }, t)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Kicker, {
    style: {
      marginBottom: "var(--space-12)",
      fontSize: "var(--text-legenda)",
      color: "var(--text-muted)"
    }
  }, "Contato"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-caption)",
      color: "var(--text-secondary)",
      margin: "0 0 var(--space-8)"
    }
  }, "oficina@exemplo.com"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-caption)",
      color: "var(--text-secondary)",
      margin: 0
    }
  }, "Atelier \u2014 visita agendada")))));
}
Object.assign(window, {
  Wordmark,
  Header,
  Footer,
  Kicker,
  Secao,
  Foto
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site-catalogo/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site-catalogo/Screens.jsx
try { (() => {
/* Telas do site/catálogo. Fotografia fica declarada como placeholder (não há imagens nos arquivos). */
const {
  Button,
  Card,
  CardMeta,
  CardTitle,
  CardText,
  Badge,
  Tag,
  Tabs,
  Input,
  Select,
  Checkbox,
  Switch,
  Dialog,
  Toast,
  Tooltip,
  Icon
} = window.FacasArtesanaisDesignSystem_ba06ad;
const PAGE = {
  maxWidth: "var(--page-max)",
  margin: "0 auto",
  padding: "0 var(--page-pad)"
};
function Home({
  ir
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...PAGE,
      paddingTop: "var(--page-top)"
    }
  }, /*#__PURE__*/React.createElement(Kicker, null, window.KIT.lote, " \xB7 aberto at\xE9 esgotar"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--type-hero)",
      color: "var(--text-primary)",
      maxWidth: "var(--measure-hero)",
      margin: "var(--space-18) 0 var(--space-28)"
    }
  }, "Sil\xEAncio afiado"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-lead)",
      color: "var(--text-secondary)",
      maxWidth: "var(--measure-lead)",
      margin: 0
    }
  }, "Cada faca \xE9 forjada, mo\xEDda e temperada \xE0 m\xE3o, uma de cada vez. \xC9 assim desde a primeira pe\xE7a \u2014 e \xE9 assim que continuar\xE1 sendo."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-16)",
      marginTop: "var(--space-36)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => ir("catalogo"),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 14
    })
  }, "Ver o lote 04"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => ir("oficio")
  }, "O of\xEDcio")), /*#__PURE__*/React.createElement(Foto, {
    ratio: "16/7",
    rotulo: "macro de l\xE2mina \u2014 full-bleed",
    style: {
      marginTop: "var(--space-56)"
    }
  }), /*#__PURE__*/React.createElement(Secao, {
    titulo: "Princ\xEDpios"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "var(--grid-gap-largo)"
    }
  }, [["Precisão", "Grid rígido, alinhamentos exatos, nada solto por acaso."], ["Matéria-prima", "A paleta e as texturas remetem aos materiais reais da faca."], ["Ofício", "Peso visual construído aos poucos, como uma lâmina temperada."], ["Discrição", "A marca não disputa espaço com o produto — ela o apresenta."]].map(([n, d]) => /*#__PURE__*/React.createElement(Card, {
    key: n,
    variant: "topo"
  }, /*#__PURE__*/React.createElement(CardTitle, {
    style: {
      color: "var(--brasa)"
    }
  }, n), /*#__PURE__*/React.createElement(CardText, null, d))))), /*#__PURE__*/React.createElement(Secao, {
    titulo: "No lote atual"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "var(--grid-gap)"
    }
  }, window.KIT.pecas.slice(0, 3).map(p => /*#__PURE__*/React.createElement(PecaCard, {
    key: p.id,
    peca: p,
    ir: ir
  })))));
}
function PecaCard({
  peca,
  ir
}) {
  return /*#__PURE__*/React.createElement(Card, {
    variant: "filete",
    as: "div",
    style: {
      cursor: "pointer"
    },
    onClick: () => ir("produto")
  }, /*#__PURE__*/React.createElement(Foto, {
    style: {
      border: "none",
      borderBottom: "1px solid var(--linha)"
    }
  }), /*#__PURE__*/React.createElement(CardMeta, null, /*#__PURE__*/React.createElement(CardTitle, null, peca.nome), /*#__PURE__*/React.createElement(CardText, null, peca.aco, " \xB7 ", peca.cabo), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "var(--space-14)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-caption)",
      color: "var(--text-primary)"
    }
  }, peca.preco), peca.estado === "ultimo" ? /*#__PURE__*/React.createElement(Badge, {
    tone: "brasa"
  }, "\xDAltimo do lote") : peca.estado === "reservado" ? /*#__PURE__*/React.createElement(Badge, null, "Reservado") : /*#__PURE__*/React.createElement(Badge, {
    dot: true
  }, "Pe\xE7a ", peca.num))));
}
function Catalogo({
  ir
}) {
  const [filtro, setFiltro] = React.useState("todas");
  const [ordem, setOrdem] = React.useState("lote");
  const lista = window.KIT.pecas.filter(p => filtro === "todas" || p.familia === filtro);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...PAGE,
      paddingTop: "var(--space-64)"
    }
  }, /*#__PURE__*/React.createElement(Kicker, null, window.KIT.lote), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--weight-leve) var(--text-display-sm)/var(--leading-display) var(--font-display)",
      color: "var(--text-primary)",
      margin: "var(--space-14) 0 var(--space-36)"
    }
  }, "Cat\xE1logo"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: "var(--space-16)",
      borderTop: "1px solid var(--linha)",
      paddingTop: "var(--space-24)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-8)",
      flexWrap: "wrap"
    }
  }, window.KIT.filtros.map(f => /*#__PURE__*/React.createElement(Tag, {
    key: f.value,
    selected: filtro === f.value,
    onClick: () => setFiltro(f.value)
  }, f.label))), /*#__PURE__*/React.createElement(Select, {
    id: "ordem",
    options: [{
      value: "lote",
      label: "Ordem do lote"
    }, {
      value: "preco",
      label: "Preço"
    }],
    value: ordem,
    onChange: e => setOrdem(e.target.value),
    wrapperStyle: {
      marginLeft: "auto",
      width: 180
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "var(--grid-gap)",
      marginTop: "var(--space-36)"
    }
  }, lista.map(p => /*#__PURE__*/React.createElement(PecaCard, {
    key: p.id,
    peca: p,
    ir: ir
  }))), lista.length === 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-caption)",
      color: "var(--text-muted)",
      marginTop: "var(--space-32)"
    }
  }, "Nada nesta fam\xEDlia no lote 04.") : null);
}
function Produto({
  ir,
  reservar
}) {
  const [aba, setAba] = React.useState("Especificações");
  const [afiacao, setAfiacao] = React.useState(true);
  const p = window.KIT.pecas[0];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...PAGE,
      paddingTop: "var(--space-64)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--grid-gap-brief)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-12)"
    }
  }, /*#__PURE__*/React.createElement(Foto, {
    ratio: "4/5",
    rotulo: "macro \u2014 fio"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "var(--space-12)"
    }
  }, /*#__PURE__*/React.createElement(Foto, {
    ratio: "1/1",
    rotulo: "cabo"
  }), /*#__PURE__*/React.createElement(Foto, {
    ratio: "1/1",
    rotulo: "marca"
  }), /*#__PURE__*/React.createElement(Foto, {
    ratio: "1/1",
    rotulo: "bainha"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Kicker, null, window.KIT.lote, " \xB7 pe\xE7a ", p.num), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--weight-leve) var(--text-display-sm)/var(--leading-display) var(--font-display)",
      color: "var(--text-primary)",
      margin: "var(--space-12) 0 var(--space-20)"
    }
  }, p.nome), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-corpo)",
      color: "var(--text-secondary)",
      maxWidth: "var(--measure-amostra)",
      margin: "0 0 var(--space-28)"
    }
  }, "Forjada em ", p.aco.toLowerCase(), ", temperada em tr\xEAs banhos e mo\xEDda \xE0 m\xE3o. ", p.cabo, ", com pinos de lat\xE3o."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--space-16)",
      paddingBottom: "var(--space-20)",
      borderBottom: "1px solid var(--linha)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-titulo-2)",
      color: "var(--text-primary)"
    }
  }, p.preco), /*#__PURE__*/React.createElement(Tooltip, {
    label: "A\xE7o carbono 1095 \xB7 61 HRC",
    side: "bottom"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      font: "var(--type-legenda)",
      color: "var(--text-muted)"
    }
  }, "dureza ", /*#__PURE__*/React.createElement(Icon, {
    name: "info",
    size: 13
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-14)",
      margin: "var(--space-20) 0 var(--space-28)"
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    id: "p-afiacao",
    label: "Incluir afia\xE7\xE3o anual (sem custo)",
    checked: afiacao,
    onChange: e => setAfiacao(e.target.checked)
  }), /*#__PURE__*/React.createElement(Checkbox, {
    id: "p-grav",
    label: "Grava\xE7\xE3o a fogo no cabo (+ R$ 120)",
    checked: false,
    onChange: () => {}
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-12)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: reservar
  }, "Reservar pe\xE7a"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => ir("catalogo")
  }, "Voltar ao lote")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-40)"
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    items: Object.keys(window.KIT.especificacoes),
    value: aba,
    onChange: setAba
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-caption)",
      color: "var(--text-secondary)",
      marginTop: "var(--space-20)"
    }
  }, window.KIT.especificacoes[aba])))), /*#__PURE__*/React.createElement(Secao, {
    titulo: "Materiais"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "var(--grid-gap)"
    }
  }, [["Aço escovado", "Reflexo controlado, nunca espelhado."], ["Couro cru", "Bainha costurada à mão."], ["Madeira de lei", "Cabo em imbuia estabilizada."], ["Papel kraft", "Certificado numerado."]].map(([n, d]) => /*#__PURE__*/React.createElement(Card, {
    key: n
  }, /*#__PURE__*/React.createElement(CardTitle, {
    style: {
      fontSize: "var(--text-rotulo)",
      fontFamily: "var(--font-body)",
      fontWeight: 600
    }
  }, n), /*#__PURE__*/React.createElement(CardText, {
    style: {
      marginTop: "var(--space-8)"
    }
  }, d))))));
}
function Oficio() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...PAGE,
      paddingTop: "var(--space-64)"
    }
  }, /*#__PURE__*/React.createElement(Kicker, null, "O of\xEDcio"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--weight-leve) var(--text-display-sm)/var(--leading-display) var(--font-display)",
      color: "var(--text-primary)",
      maxWidth: "16ch",
      margin: "var(--space-14) 0 var(--space-28)"
    }
  }, "Feita no fogo, provada no fio"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-corpo)",
      color: "var(--text-secondary)",
      maxWidth: "var(--measure-corpo)"
    }
  }, "Uma faca feita \xE0 m\xE3o carrega decis\xF5es, n\xE3o efeitos: a liga escolhida, o tempo de forja, o \xE2ngulo do fio. Nada que sirva s\xF3 para decorar."), /*#__PURE__*/React.createElement(Card, {
    variant: "couro",
    style: {
      marginTop: "var(--space-36)",
      maxWidth: "var(--measure-corpo)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--weight-leve) 26px/1.25 var(--font-display)",
      color: "var(--osso)",
      margin: 0
    }
  }, "Autoridade n\xE3o vem de volume visual. Vem de restri\xE7\xE3o.")), /*#__PURE__*/React.createElement(Foto, {
    ratio: "16/7",
    rotulo: "forja \u2014 still ambiente",
    style: {
      marginTop: "var(--space-36)"
    }
  }));
}
function Reserva({
  ir,
  concluir
}) {
  const [aviso, setAviso] = React.useState(true);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...PAGE,
      paddingTop: "var(--space-64)",
      maxWidth: 640
    }
  }, /*#__PURE__*/React.createElement(Kicker, null, "Reserva \xB7 pe\xE7a 014/40"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--weight-leve) var(--text-display-sm)/var(--leading-display) var(--font-display)",
      color: "var(--text-primary)",
      margin: "var(--space-14) 0 var(--space-28)"
    }
  }, "Seus dados"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-18)"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    id: "r-nome",
    label: "Nome",
    placeholder: "Como devemos gravar no certificado"
  }), /*#__PURE__*/React.createElement(Input, {
    id: "r-email",
    label: "E-mail",
    placeholder: "voce@exemplo.com",
    hint: "A reserva vale por 48 horas."
  }), /*#__PURE__*/React.createElement(Input, {
    id: "r-cep",
    label: "CEP",
    placeholder: "00000-000"
  }), /*#__PURE__*/React.createElement(Input, {
    id: "r-obs",
    label: "Observa\xE7\xF5es para a oficina",
    multiline: true,
    rows: 3
  }), /*#__PURE__*/React.createElement(Switch, {
    id: "r-aviso",
    label: "Avisar quando abrir o pr\xF3ximo lote",
    checked: aviso,
    onChange: e => setAviso(e.target.checked)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-12)",
      marginTop: "var(--space-32)",
      paddingTop: "var(--space-20)",
      borderTop: "1px solid var(--linha)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: concluir
  }, "Confirmar reserva"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => ir("produto")
  }, "Voltar")));
}
Object.assign(window, {
  Home,
  Catalogo,
  Produto,
  Oficio,
  Reserva,
  PecaCard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site-catalogo/Screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site-catalogo/data.js
try { (() => {
window.KIT = {
  lote: "Lote 04 — 40 peças",
  pecas: [{
    id: "chef-210",
    nome: "Chef 210mm",
    aco: "Aço carbono 1095",
    cabo: "Cabo em imbuia",
    preco: "R$ 1.480",
    num: "014/40",
    estado: "disponivel",
    familia: "chef"
  }, {
    id: "nakiri-165",
    nome: "Nakiri 165mm",
    aco: "Aço carbono 1095",
    cabo: "Cabo em imbuia",
    preco: "R$ 1.240",
    num: "021/40",
    estado: "ultimo",
    familia: "nakiri"
  }, {
    id: "petty-120",
    nome: "Petty 120mm",
    aco: "Aço carbono 1075",
    cabo: "Cabo em osso",
    preco: "R$ 890",
    num: "027/40",
    estado: "disponivel",
    familia: "petty"
  }, {
    id: "santoku-180",
    nome: "Santoku 180mm",
    aco: "Aço carbono 1095",
    cabo: "Cabo em osso",
    preco: "R$ 1.360",
    num: "031/40",
    estado: "reservado",
    familia: "santoku"
  }, {
    id: "desossa-150",
    nome: "Desossa 150mm",
    aco: "Aço carbono 1075",
    cabo: "Cabo em imbuia",
    preco: "R$ 980",
    num: "034/40",
    estado: "disponivel",
    familia: "desossa"
  }, {
    id: "pao-240",
    nome: "Pão 240mm",
    aco: "Aço inox 12C27",
    cabo: "Cabo em imbuia",
    preco: "R$ 1.120",
    num: "038/40",
    estado: "disponivel",
    familia: "pao"
  }],
  filtros: [{
    value: "todas",
    label: "Todas"
  }, {
    value: "chef",
    label: "Chef"
  }, {
    value: "nakiri",
    label: "Nakiri"
  }, {
    value: "petty",
    label: "Petty"
  }, {
    value: "santoku",
    label: "Santoku"
  }],
  especificacoes: {
    "Especificações": "Lâmina 210mm · aço carbono 1095 · 61 HRC · peso 212g · espessura 2,4mm no lombo",
    "Materiais": "Cabo em imbuia estabilizada, pinos de latão, bainha em couro cru costurada à mão.",
    "Cuidados": "Secar imediatamente após o uso. Óleo mineral a cada dois meses. Nunca lava-louças.",
    "Garantia": "Afiação anual gratuita pelo tempo de vida da peça. Reparo de cabo sem custo no primeiro ano."
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site-catalogo/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardMeta = __ds_scope.CardMeta;

__ds_ns.CardTitle = __ds_scope.CardTitle;

__ds_ns.CardText = __ds_scope.CardText;

})();
