export interface PrismTheme {
  token: string;
  languageJavascript: string;
  javascript: string;
  background: string;
  comment: string;
  string: string;
  var: string;
  number: string;
  constant: string;
  plain: string;
  doctype: string;
  tag: string;
  keyword: string;
  boolean: string;
  function: string;
  parameter: string;
  className: string;
  attrName: string;
  attrValue: string;
  interpolation: string;
  punctuation: string;
  ['maybe-class-name']: string;
  property: string;
  propertyAccess: string;
  namespace: string;
  highlight: string;
  highlightBorder: string;
  dom: string;
  operator: string;
}

const prismTheme: PrismTheme = {
  token: `#fff`,
  languageJavascript: `#e8696b`,
  javascript: `#e8696b`,
  background: `#292c34`,
  comment: `#5e6a76`,
  string: `#a8e2a8`,
  var: `#b3bac5`,
  number: `#e4854d`,
  constant: `#b3bac5`,
  plain: `#fff`,
  doctype: `#e8696b`,
  tag: `#e8696b`,
  keyword: `#d49fd4`,
  boolean: `#ff5874`,
  function: `#5F8DC3`,
  parameter: `#F9965D`,
  className: `#ffcf74`,
  attrName: `#bf87ba`,
  attrValue: `#a8e2a8`,
  interpolation: `#fff`,
  punctuation: `#5FA8AA`,
  ['maybe-class-name']: `#fff`,
  property: `#80cbc4`,
  propertyAccess: `#fff`,
  namespace: `#b2ccd6`,
  highlight: `rgba(255,255,255,0.07)`,
  highlightBorder: `#e1bde2`,
  dom: `#5F8DC3`,
  operator: `#5FA8AA`,
};

export default prismTheme;
