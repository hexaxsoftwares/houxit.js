  /*
    Prince Chukwuemeka Godswill Ezeta 
  @pure This project, 'HOUXIT', is been sponsored by the HEXAX SOFTWARES FOUNDATION.
  @pure Visit 'www.houxit.com/guide' for for more information on the houxit project , documentation and houxit's development process roadmap.
  @pure This is a web JIT development version of Houxit
  @pure We at the core team of Houxit project are determined on developing and improving Houxit.js features and perfomance issues, we only need your support to help and encourage us on maintaing this template engine.
  @pure Thanks for choosing Houxit
  */
const Houxit=(function(global){
  "use strict"
  const log=console.log;
  const version = "0.1.10";
  const get_version=()=>'houxit-'+version;//houxit at it's earliest version
  const isArray=Array.isArray;
  const toString=Object.prototype.toString;
  const _toStringCall=txt=>toString.call(txt);
  const isDate=date=>_toStringCall(date) === '[object Date]';
  const isSet=val=>_toStringCall(val) === '[object Set]';

const isMap=map=>_toStringCall(map) === '[object Map]';
  const isWeakMap=map=>_toStringCall(map) === '[object WeakMap]';
  const isWeakSet=setup=>_toStringCall(setup) === '[object WeakSet]';
  const toStringType=value=>_toStringCall(value).slice(8, -1).toLowerCase();
  const isString=str=>getType(str) === 'string';
  const isNull=arg=>arg==null;
  const isUndefined=arg=>_toStringCall(arg) === '[object Undefined]';
  const isObject=obj=>getType(obj) === 'object';
  const isPObject=obj=>_toStringCall(obj) === '[object Object]';
  const isPrimitive=val=>validateType(val, [ String, Number, Symbol, Boolean, Date ]) || isNull(val);
  const hasOwn=Object.hasOwn;
  const assign=Object.assign;
  const entries=Object.entries;
  const keys=Object.keys;
  const values=Object.values;
  const preventX=Object.preventExtensions;
  // function define(object, propKey, value){
  //   return Object.defineProperty(object, propKey, { enumerable, configurable, value });
  // }
  const define=Object.defineProperty;
  const isS=Object.is;
  const hasProp=(obj, prop)=> prop  in obj;
  function _mapValue(obj, arg){
    return isString(obj) ? new Set(obj.split(',')).has(arg) : validateType(arg, [Set, Tuple, Map ]) ? obj.has(arg) : isPObject(obj) ? hasProp(obj, arg) : isArray(obj) ? obj.includes(arg) :  false;
  }
  const E_Obj=Object.freeze({});
  const inBrowserCompiler = typeof self !== "undefined" && typeof self === "object";
  const variableDeclarationRegex=/([\s\S]+[^=]*)[ ]*=[ ]*([\s\S]+)/m;
  const invalidIdentifierCharRegex=/[='"!@#%^&*()+\-\[\]{};:\\|,.<\/? ]/;
  const invalidAccessorCharRegex=/[='"!@#%^&*(){};:\\|,<? ]/;
  const isValidAccessor=variable => isString(variable) && /[\w$]/.test(variable.at(0)) && !invalidAccessorCharRegex.test(variable);
  const isValidIdentifier=variable => isString(variable) && /[\w$]/.test(variable.at(0)) && !invalidIdentifierCharRegex.test(variable);
  const constBlockContext="if_Block,for_Block,slots_Block,children_Block";
  const isValidCtxType=type=>_mapValue(constBlockContext, type);
  const isFunction=func=>getType(func) === 'function';
  const isPFunction=func=>isFunction(func) && !isClass(func);
  const isNumber=num=>getType(num) === 'number';
  const isBoolean=bool=>getType(bool) === 'boolean';
  const bool=Boolean;
  const defProps=Object.defineProperties;
  const isSymbol=sym=>_toStringCall(sym) === '[object Symbol]';
  const isChar=char=>isString(char) || isSymbol(char);
  const isPromise=prom=> _toStringCall(prom) === '[object Promise]' && isFunction(prom.then) && isFunction(prom.catch);
  const nullObj=()=> Object.create(null);
  const isTrue=compute=>compute === true;
  const isFalse=compute=>compute === false;
  const $warner=`<<< Houxit Exception >>> ..... >>>>>>>`;
  const characters=/\!\"\#\%\&\'\(\)\*\+\,\.\/\;\<\=\>\@\[\\\]\^\`\{\|\}\~ /;
  const stringsMonitorRegex=/"(.*?)"|'(.*?)'|`+(.*?\s)`+/gm;
  
  function $debug_log(msg, self, dictateW=false, txt=''){
    let shouldlog=true;
    if(isHouxitBuild(self)) shouldlog=self[$$$core].settings.debug && !self[$$$operands].initializedRender;
    if(shouldlog ) {
      if(dictateW) console.warn(`${$warner}\n\nEncountered a problem ${txt} \n\n at  at  \n <${self && isHouxitBuild(self) ? self[$$$ownProperties].name : 'UnknownWidget' }> widget`);//houxit warming debugger
      console.error(`${$warner}\n\n${msg}\n\n"${msg?.stack || ''}"`);//houxit warming debugger
      // $warn(msg.stack ? msg.stack : msg, self)
    }
  }
  function $warn(msg, self){
    let shouldlog=true
    if(isHouxitBuild(self)) shouldlog=self[$$$core].settings.debug;
    if(shouldlog) console.warn(`${$warner}\n\n${msg}`);//houxit warming debugger
  }
  const isIterator=iterator=>iterator && !isArray(iterator) && isPFunction(iterator[Symbol.iterator]);
  const isIterable=iterable=>(validateType(iterable, [Object,Array,Set,Map,Tuple]) || isIterator(iterable)) && !isString(iterable);
  const enumerable =true, configurable =true, writable = true ;
  const isEmptyStr=str=>str === "";
  const $Error=(msg,self)=>{
    let shouldlog=true
    if(self) shouldlog=self[$$$compiler].config.debug
    if(isTrue(shouldlog)) console.error(`${$warner}\n\n ${msg}`);//houxit warming debugger
  }
  const blockTagRegex=/^(::[\w$]+)/;
  const isBlockTag=tagName=>blockTagRegex.test(tagName);
  const hasHyphen_bind=key=>/^\-\-[\w\-|[\]]+/.test(key);
  const hasAt_bind=key=>/^@[\w\-|[\]]+/.test(key);
  const has$$_bind=key=>/^\$\$[\w\-|[\]]+/.test(key);
  const hasDir_bind=key=>/^dir\-\-[\w\-|[\]]+/.test(key);
  const hasAsh_bind=key=>/^\#[\w\-|[\]]+/.test(key);
  const hasSpread_bind=( key , useAccessor=false )=> ( useAccessor ? /^\.\.\.[\w$.]+/ : /^\.\.\.[\w$]+/ ).test(key);//useAccessor requests if dot notation is acceptd on match
  const HouxitSpecialProperties="bind,ref,key,on"
  const exists=value=> value || isNumber(value) ? true : false ;
  const hasAsterisks_bind=key=>/^\*[\w\-|[\]]+/.test(key)
  const widgetOptionType={ 
    build:Function, 
    model:Function, 
    widgets:Object, 
    preBuild:Function, 
    postBuild:Function, 
    preMount:Function, 
    postMount:Function, 
    preUpdate:Function, 
    postUpdate:Function, 
    postDestroy:Function, 
    preDestroy:Function, 
    handlers:Object, 
    params:[Array, Object], 
    buildConfig:Object, 
    styleSheet:String, 
    directives:Object, 
    template:String, 
    name:String, 
    observers:Object, 
    templateSrc:String, 
    styleSheetSrc:String, 
    filters:Object, 
    blocks:Object,
    signals:Array, 
    publish:Function, 
    transmit:[Array, Object], 
    slots:Array, 
    markdownSrc:String, 
    markdown:String,
    context:Function,
    computedTokens:Object,
    mixins:Array,
    onTracked:Function,
    onEffect:Function,
    onCatch:Function,
    onSlotRender:Function,
    onSlotEffect:Function,
    render:Function,
    anchorRefs:Array
  }
  const validWidgetOptions=keys(widgetOptionType).join(',');//valid widget options---
  const plainFunctionOptions="model,preBuild,postBuild,preMount,postMount,preUpdate,postUpdate,postDestroy,preDestroy,publish,context,onEffect,onTracked,onCatch,build,onSlotEffect,onSlotRender,anchorRefs";
  const nonAFuncMethod=fnName=> _mapValue(plainFunctionOptions, fnName);
  const calledOnceFNOptions="model,preBuild,postBuild,preMount,postMount,onTracked,build,onSlotRender"
  const isCalledOnceOpt=opt=>_mapValue(calledOnceFNOptions, opt)
  const nodeJSOnlyOption="markdownSrc,styleSheetSrc,templateSrc";
  const isNodeJSOnlyOption=opt=>_mapValue(nodeJSOnlyOption, opt);
  const primaryKeyOptions="build,styleSheetSrc,styleSheet,templateSrc,template,name,markdownSrc,markdown,context";
  const isPrimaryKeyOption=opt=>_mapValue(opt, primaryKeyOptions);
  const isArgument=arg=>_toStringCall(arg) === "[object Arguments]";
  function len(obj){
    if(!obj) return -1;
    return validateType(obj, [ String , Array ] ) || isArgument(obj) ? obj.length : isToken(obj) ? len(unwrap(obj)) : validateType(obj, [ Set, Map, Tuple ]) ? obj.size : isObject(obj) ? keys(obj).length : isNumber(obj) ? obj : -1 ;
  }
  const isValidWidgetOption=opts=>_mapValue(validWidgetOptions, opts);//checks if an option is a vslid Houxit widget option
  const HTML_TAGS="html,head,style,title,body,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,main,nav,section,blockquote,dd,div,dl,dt,figcaption,figure,li,menu,ol,p,pre,ul,a,abbr,b,bdi,bdo,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,audio,map,video,iframe,object,picture,portal,svg,math,canvas,noscript,script,del,ins,caption,col,colgroup,table,tbody,td,tfoot,th,thead,tr,datalist,fieldset,form,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,summary,button,base,link,meta,hr,br,wbr,area,img,track,embed,source,input,template,slot" ;//All html valid tags supported by the Houxit framework
  const IS_HTML_TAG=txt=>_mapValue(HTML_TAGS, txt);
  const WEB_COMPONENTS="template,slot";//Web components tags , also supported by the Houxit framework
  const HTML_FORM_ELEMENTS="select,textarea,input,form,progress,meter,option";
  const Is_Form_Element=element=>IS_ELEMENT_NODE(element) && _mapValue(HTML_FORM_ELEMENTS, element.localName);
  const IS_WEB_COMPONENT=txt=>_mapValue(WEB_COMPONENTS, txt);
  const HTML_VOID_TAGS="base,link,meta,hr,br,wbr,area,img,track,embed,source,input";//HTML void tags, also supported by the Houxit framework
  const IS_HTML_VOID_TAG=txt=>_mapValue(HTML_VOID_TAGS, txt);
  const HTML_DEPRECATED_TAGS="acronym,noembed,applet,noframes,bgsound,param,big,blink,plaintext,center,rb,content,rtc,dir,shadow,font,spacer,frame,strike,frameset,image,tt,keygen,xmp,marquee,nobr,menuitem";//HTML obselete and deprecated element. 
  //The above tags are no more been supported by the houxit framework
  const IS_HTML_DEPRECATED_TAG= txt => _mapValue(HTML_DEPRECATED_TAGS, txt);
  const HTMLIDLAttributes="accesskey,contenteditable,dir,draggable,enterkeyhint,hidden,inert,innerText,inputmode,popover,lang,noModule,nonce,outerText,spellcheck,style,tabindex,title,translate,className,value,innerHTML,outerHTML";
  const isHTMLIDLAttributes=txt=>_mapValue(HTMLIDLAttributes, txt)
  const HTMLBooleanAttributes="disabled,hidden,draggable,checked,selected,defer,ismap,reversed,readonly,autoplay,disableremoteplayback,muted,loop";
  const isHTMLBooleanAttributes=txt=>_mapValue(HTMLBooleanAttributes, txt)
  const DomParserTags="html,head,link,meta,body,style,script,noscript,template"
  const isINDOMElements=tag=>_mapValue(DomParserTags, tag);
  const SVG_TAGS="animate,animateMotion,animateTransform,circle,clipPath,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,stopsvg,switch,symbol,text,textPath,tspan,use,view";
  const SVG_DEPRECATED_TAGS="altGlyph,altGlyphDef,altGlyphItem,cursor,font,font-face,font-face-format,font-face-name,font-face-src,font-face-uri,glyph,glyphToken,hkern,missing-glyph,tref,vkern";
  const IS_SVG_TAG=tag=>_mapValue(SVG_TAGS, tag);
  const IS_SVG_DEPRRCATED_TAG=tag=>_mapValue(SVG_DEPRECATED_TAGS, tag);
  const MATHML_TAGS = "malignmark,menclose,annotation,annotation-xml,maction,merror,maligngroup,mfenced,mn,mo,mmultiscripts,mfrac,semantics,none,mlongdiv,mlabeledtr,mfraction,mtr,mglyph,mi,mover,munder,munderover,mpadded,mphantom,mspace,mroot,mprescripts,msline,mrow,ms,mscarries,mscarry,msgroup,msqrt,mstack,mtd,mtext,mtable,mstyle,msub,msubsup,msrow,msup";
  const IS_MATHML_TAG=tag=>_mapValue(MATHML_TAGS, tag);
  const IS_VALID_TAGNAME=(txt)=>{
    if(IS_HTML_TAG(txt)||IS_WEB_COMPONENT(txt)||IS_HTML_VOID_TAG(txt) || IS_SVG_TAG(txt) || IS_MATHML_TAG(txt)) return true;
    if(IS_HTML_DEPRECATED_TAG(txt) || IS_SVG_DEPRRCATED_TAG(txt)){
      $debug_log(`"${txt}" is an html/svg deprecated tag, and should not be used in new projects\n\nhouxit    does not offer the compilation of obselete elements`);
    }
    return false;
  }
  const dataStringTypes="string,function,object,array,boolean,number,symbol,set,map,bigint,set,map,weakmap,weakset,date,weakref,promise,proxy,tuple";//Valid javascript datatypes
  const isValidDataStringType=obj=>_mapValue(dataTypes, obj);//checks if a string value is a dataTypes return text
  class Tuple extends Base_Tuple{
    constructor(){
      super(...arguments);
    }
  }
  const DataFunctionMap=[String, Function, Object, Array, Symbol, Number, Boolean];
  const XtructDataCallableTypes=[Set,Map,WeakMap,WeakSet, Date,WeakRef,Promise,RegExp,Proxy,BigInt,ArrayBuffer,Tuple];
  const isBuiltinType=type=>_mapValue(DataFunctionMap, type) || _mapValue(XtructDataCallableTypes, type);
  function isDomSpecialConstructor(value){
    const domSpecialConstructors=[ Element];
    if(new Set(domSpecialConstructors).has(value)) return true
    return isNativeElement(value) || value instanceof Element;
  }
  const Data_Flags="NodeList,PATCH_FLAGS,PATCH-TYPE-TUPLE"
  const hasUpperCase=str=>str.match(/[A-Z]/);
  const hasLowerCase=str=>str.match(/[a-z]/);
  const hasDigit=dig=>dig.match(/[0-9]/);
  const NodeTypeMap={ 
    ELEMENT_NODE:1, 
    ATTRIBUTE_NODE:2, 
    TEXT_NODE:3, 
    CDATA_SECTION_NODE:4, 
    ENTITY_REFERENCE_NODE:5,
    ENTITY_NODE:6, 
    PROCESSING_INSTRUCTION_NODE:7,
    COMMENT_NODE:8, 
    DOCUMENT_NODE:9, 
    DOCUMENT_TYPE_NODE:10,
    DOCUMENT_FRAGMENT_NODE:11,
    NOTATION_NODE:12 
  }
  if( inBrowserCompiler ) HTMLElement, SVGElement, Element = class {};
  class HouxitCustomElement extends HTMLElement{
    constructor(){
      super(...arguments);
    }
  }
  const isNativeElement=(vnode)=> (vnode instanceof HTMLElement || vnode instanceof SVGElement);
  const IS_TEXT_NODE=node=>node && node.nodeType === NodeTypeMap.TEXT_NODE;
  const IS_ATTRIBUTE_NODE=node=>node && node.nodeType === NodeTypeMap.ATTRIBUTE_NODE;
  const IS_ELEMENT_NODE=node=>node && isNativeElement(node) && node.nodeType === NodeTypeMap.ELEMENT_NODE;
  const IS_ENTITY_NODE=node=>node && node.nodeType === NodeTypeMap.ENTITY_NODE;
  const IS_DOCUMENT_TYPE_NODE=node=>node && node.nodeType === NodeTypeMap.DOCUMENT_TYPE_NODE;
  const IS_DOCUMENT_NODE=node=>node && node.nodeType === NodeTypeMap.DOCUMENT_NODE;
  const IS_NOTATION_NODE=node=>node && node.nodeType === NodeTypeMap.NOTATION_NODE;
  const IS_DOCUMENT_FRAGMENT_NODE=node=>node && node.nodeType === NodeTypeMap.DOCUMENT_FRAGMENT_NODE;
  const IS_CDATA_SECTION_NODE=node=>node && isNativeElement(node) && node.nodeType === NodeTypeMap.CDATA_SECTION_NODE;
  const IS_PROCESSING_INSTRUCTION_NODE=node=>node && node.nodeType === NodeTypeMap.PROCESSING_INSTRUCTION_NODE;
  const IS_ENTITY_REFERENCE_NODE=node=>node && node.nodeType === NodeTypeMap.ENTITY_REFERENCE_NODE;
  const IS_COMMENT_NODE=node=>node && node.nodeType === NodeTypeMap.COMMENT_NODE;
  // const TypeMethods={isString, isFunction, isObject, isArray, isBoolean, isNumber, isDate, isSymbol, isSet, isMap, isTuple }
  const isCustomElement=node=>  node instanceof  HTMLElement && isNativeElement(node);
  function isChildrenNode(val){
    return isPrimitive(val) || isArray(val) || isHouxitElement(val) || isCustomElement(val)  || isSlotInstance(val) || isRenderVNodeClass(val);
  }
  function isChildrenObjInstances(val){
    if(!isChildrenObj(val)) return false;
    return isHouxitElement(val) || isHouxitBuild(val) || isCustomElement(val)  || isSlotInstance(val) || isRenderVNodeClass(val);
  }
  function isChildrenObj(val){
    return isChildrenNode(val) && !( isPrimitive(val) || isArray(val))
  }
  const isBaseWidget=widget=> isPObject(widget) && widget instanceof Widget;
  const isProxy=value=>validateType(value, Proxy);
  const validHouxitWidget=(w)=> w && (isObject(w) && !isProxy(w) && !isStream(w)) || isFunction(w) ;
  const isHoistedVNode=vnode=>isHouxitElement(vnode) && isTrue(vnode.VNodeManager.patchFlags.isHoisted);
  const isStaticVnode=vnode=>isHouxitElement(vnode) && !isHoistedVNode(vnode);
  function lazy(callback){
    if(!isPFunction(callback)){
      $debug_log(`lazy method expects a plain function as its formal argument`);
      return ""
    }
    return ;
  }
  function parseScript(script, args){
    return new Function(`"use strict"; return (${script})`)(args);
  }//helps compile string values to javascript statement
  function passableBlock(block, warn){
    try{
      parseScript(block);
      return true;
    }catch(err){
      if(isTrue(warn)){
        $debug_log(`Statement not passage in Mustache/binding context\n\nContext expects a single expression\n"${block}"`);
        $debug_log(err);
      }
      return false
    }
  }
  const isInDomNode=element=> isNativeElement(element) && element.getRootNode() === document;
  const GLOBAL_EVENTS="abort,animationcancel,animationend,animationiteration,animationstart,auxclick,blur,error,focus,canplay,canplaythrough,cancel,change,click,close,contextmenu,dblclick,drag,dragend,dragenter,dragleave,dragover,dragstart,drop,durationchange,emptied,ended,formdata,gotpointercapture,input,invalid,keydown,keypress,load,keyup,loadeddata,loadedmetadata,loadend,loadstart,lostpointercapture,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,mousewheel,wheel,pause,play,playing,pointerdown,pointermove,pointerup,pointercancel,pointerover,pointerout,pointerleave,pointerenter,pointerlockchange,pointerlockerror,progress,ratechange,reset,resize,scroll,securitypolicyviolation,seeked,seeking,select,selectstart,selectionchange,slotchange,stalled,submit,suspend,timeupdate,touchcancel,touchend,touchstart,touchmove,transitioncancel,transitionrun,transitioned,transitionstart,waiting,volumechange,autocompleteerror,autocomplete,hover";//Html event names managed by houxit on elements
  const IS_VALID_EVENT_HANDLER=eventName=>_mapValue(GLOBAL_EVENTS, eventName);
  const isClass = val=> isFunction(val) && val.toString().startsWith('class');
  const directivesHooksMap="created,mounted,updated,init,destroyed";
  function isInstanceOf(val, construct){
    if(isFunction(construct) && isXtruct(construct)) return val instanceof construct;
    return false;
  }
  function instance_Has_Widget(self, name ){
    return _mapValue(BUILT_IN_WIDGETS, name) || _mapValue(self[$$$register]?.widgets || {}, name ) ;
  }
  const normalize_Widget=(self, name)=>_mapValue(BUILT_IN_WIDGETS, name) ? BUILT_IN_WIDGETS[name] : _mapValue(self[$$$register].widgets, name) ? self[$$$register].widgets[name]: null;
  function instance_Has_Directive(self, name ){
    return !isHouxitDirective(name) && _mapValue(self[$$$register]?.directives || {}, name ) ;
  }
  const normalize_Directives=(self, name)=> _mapValue(self[$$$register].directives, name) ? self[$$$register].directives[name]: null;
  const isSlotInstance=val=> val instanceof slotInstanceMap;
  const requestMethods="POST,GET,PATCH,HEAD,DELETE,PUT,CONNECT,OPTIONS,TRACE";
  const isRequestMethod=method=>_mapValue(requestMethods, method);
  const isHouxitElement=vnode=>vnode instanceof HouxitElement;
  const isHouxitBuild=widget=>widget instanceof _Houxit_Build;
  const isHouxitTextElement=vnode=>vnode instanceof HouxitTextElement;
  const isHouxitNativeElement=vnode=> vnode instanceof HouxitNativeElement;
  const isHouxitFragmentElement=vnode => vnode instanceof HouxitFragmentElement;
  const readonlyModelProps="$element,$params,$attrs,$signals,$slots,$parent,$root";
  const proxySkipped="$element,$signals,$parent,$root,_observe,_useAgent,_deferTick,_write,_effectHook,[[[Reactive__Token_]]]";
  const validTokenConfigOptions="onTrack,onEffect,isComputed,isReadonly"
  const isProxySkipped=prop=>_mapValue(proxySkipped, prop);
  function createObj(name, props){
    if(len(arguments) === 1 && isPObject(name)) props=name;
    if(props && !isPObject(props)) props=null;
    let objXtruct=Function('name',`
     return name ? class ${name}{} : Object ;
    `)
    objXtruct=objXtruct(name);
    objXtruct= new objXtruct();
    if(props) assign(objXtruct, props);
    return objXtruct;
  }
  const canRender=value=>isPrimitive(value) && !isNull(value);
  function compileToRenderable(value){
    value=unwrap(value);
    if(canRender(value)) return String(value);
    else if(validateType(value, [Array, Date, Function])) return value.toString();
    else if(!isNull(value) && !isPObject(value)) return JSON.stringify(value);
    return "";
  }
  const arrowFNRegex=/^(\(([\w$,\[\]\{\} ]*)\)|[\w$]+)[ ]*=>[ ]*[{]?\s*/;
  const functionFNRegex=/^(async[ ]+)?(function)?([*]?([ ]*)[\w$]*)?\(([\w$]*)?\)[ ]*\{\s*/m;
  const isAFunction=(fn)=> isPFunction(fn) && arrowFNRegex.test(fn.toString());
  const isFNString=str => isString(str) && isTrue(arrowFNRegex.test(str) || functionFNRegex.test(str));
  const boundFNRegex=/^bound [\w$]*$/;
  const isBFunction=func=>isPFunction(func) && !isAFunction(func) && boundFNRegex.test(func.name);
  const objectDestructureRegex=/^{(.*?)}$/;
  const arrayDestructureRegex=/^\[(.*?)\]$/;
  const isDestructureSyntax=syntax=>objectDestructureRegex.test(syntax) || arrayDestructureRegex.test(syntax) ;
  class Model{};
  class Params{};
  class Attrs{};
  class Slots{};
  class Signals{};
  class ReactiveEffectObject{};
  const isModelInstance=model=>model instanceof Model;
  const isParamsInstance=param=>param instanceof Params;
  const isAttrsInstance=param=>param instanceof Attrs;
  const isSlotsInstance=param=>param instanceof Slots;
  const isSignalsInstance=param=>param instanceof Signals;
  const isREffObj=param=>param instanceof ReactiveEffectObject;
  const isClassBasedBuild=build=>isHouxitBuild(build) && build[$$$ownProperties].widgetType === 'class-based';
  const isFunctionBasedBuild=build=>isHouxitBuild(build) && build[$$$ownProperties].widgetType === 'function-based';
  const isObjectBasedBuild=build=>isHouxitBuild(build) && build[$$$ownProperties].widgetType === 'object-based';
  const $$tupleStore=Symbol()
  const $$tupleUnique=Symbol()
  const $$tupleIsFrozen=Symbol()
  const $$dexTransformKey=Symbol();
  const genericKeyProp=Symbol();
  const $$$$dir__ref$$$$=Symbol('[[[$$$$dir__ref$$$$]]]');
  const dir$$__render=Symbol("[[[$$@@dir$$__render]]]");
  const $$$context=Symbol("[[[$$@context]]]");
  const $$slotName=Symbol('[[[~~slotName~~]]]');
  const $$$Events=Symbol('[[[@@Events]]]');
  const $$$operands=Symbol();//for the operands property of a widget instance
  const $$$ownProperties=Symbol();
  const $$$compiler=Symbol();
  const $$$core=Symbol();
  const $$$register=Symbol();
  const $$$StreamProxyKey=Symbol();//used in marking an stream object
  const scopedDirKey=Symbol();//for the scoped directive
  const lifeCiycleBinding=Symbol();
  const $$$customDirs=Symbol();
  const $$renderClass=Symbol();
  const rawObjKey=Symbol()
  const $$$ModelUpdateKey = Symbol();//resolving a midel directive consumption on widget 
  const $$BuiltinWidgetKey=Symbol();
  const $buildWidgetNormalizerKey=Symbol();
  const factoryHXSelfInstance=Symbol();
  const $factoryTokenKey=Symbol();
  const isFRKey=(key)=> $factoryTokenKey === key && isS($factoryTokenKey, key);
  const isBuiltinWidgetBuild=self=> isHouxitBuild(self) && hasOwn(self[$$$ownProperties], 'builtin_widget');
  const isBuiltinWidgetAndType=( self, type ) => isBuiltinWidgetBuild(self) && self[$$$ownProperties].builtin_widget === type ;
  const isBuiltinPortalWidget=self=> isBuiltinWidgetAndType(self, 'hx:portal')
  const isBuiltinMotionWidget=self=>isBuiltinWidgetAndType(self, 'hx:motion')
  const isBuiltinMemoWidget=self=>isBuiltinWidgetAndType(self, 'hx:memo')
  const isBuiltinFragmentWidget=self=>isBuiltinWidgetAndType(self, 'hx:fragment')
  const isBuiltinSelfWidget=self=>isBuiltinWidgetAndType(self, 'hx:self')
  const isBuiltinBuildWidget=self=>isBuiltinWidgetAndType(self, 'hx:build')
  const isBuiltinSuspenseWidget=self=>isBuiltinWidgetAndType(self, 'hx:suspense')
  const isBuiltinWidget =widget=> hasOwn(widget, $$BuiltinWidgetKey);
  const builtinValidWidget=(widget, type)=> isBuiltinWidget(widget) && widget[$$BuiltinWidgetKey] === type ;
  const $buildHx_ElementKey=Symbol()//saving the $buildHx_ElementKey key while passing widget to houxit build.
  const widgetSpecialAttrProps = new Set([ $$$$dir__ref$$$$ , dir$$__render, $$$context , $$slotName, $$$Events, $$$ModelUpdateKey ]);
  const isSelfRecursiveWidget=build=> isHouxitBuild(build) && build[$$$ownProperties].isSelfRecursive === (true);
  const isSpecProp = prop => widgetSpecialAttrProps.has(prop);
  const isBuiltinBlocks=block=>_mapValue("if,else,else:if,for,const", block);
  const isBuiltinVoidBlocks=block=>_mapValue("else,else:if,const", block);
  function createRenderFN(self, fn){
    if(!isPFunction(fn)){
      $debug_log(`parameter 2 of "createRenderFN" macro expects a plain Function`);
      return pass
    }
    let callback=Function('self', 'fn',`
      return function renderClass(instance, updated, forceFragment){
        return fn(self);
      }
    `)
    callback = callback(self, fn);
    callback[$$renderClass]=true;
    return callback;
  }
  const isRenderClass=render=>isPFunction(render) && render.name === "renderClass" && render[$$renderClass];
  const $passKey=Symbol()
  function pass(){}
  pass[$passKey]=true;
  function isContextMethodString ( self , hx__Element , str ){ 
    return ((isValidIdentifier(str) || object_Has_Path(self.__public_model__, str)) || isTrue(hx__Element && object_Has_Path(hx__Element.LabContext||{}, str) || isFNString(str)));
  }
  const isIfKey=key=>/^\$\$if[\w|$ ]*$/.test(key);
  const isElseIfKey=key=>/^\$\$else-if[\w$| ]*$/.test(key);
  const isElseKey=key=>/^\$\$else[\w$| ]*$/.test(key);
  const isForKey=key=>/^\$\$for[\w_$| ]*$/.test(key);
  function read(fn){
    return unToken(isFunction(fn) ? fn() : fn );
  }
  function isElementType(element, type){
    if(type === 'text') return IS_TEXT_NODE(element);
    return isNativeElement(element) && IS_ELEMENT_NODE(element) && element.localName === type;
  }
  const create_Houxit_Element_Flags_=()=>createObj('__Houxit_Element_', {
    _vnode_key:undefined,
    hx__Element:undefined,
  });
  const rawObjectStoreMap=new WeakMap()
  function markRaw(obj){
    if(isChildrenObj){
      $debug_log(`Cannot mark a renderable Houxit instance as a raw data`);
      return obj;
    }
    if(!validateType(obj, [Object, Array]) || isRaw(obj)) return obj;
    obj[rawObjKey]=true;
    return obj
  }
  function isRaw(obj){
    return validateType(obj, [Object, Array]) && ( isObject(obj) ? hasOwn(obj, rawObjKey ) : isTrue(obj[rawObjKey]));
  }
  function getCharcodes(value){
    const record=[];
    let index=0
    for( let char of value){
      record.push(char.codePointAt(0))
      index++
    }
    return record;
  }
  function campareStrings(value, data){
    const valCP=getCharcodes(value)
    const datCP=getCharcodes(data)
    return deepEqualityCheck(valCP, datCP)
  }
  function memMove(value, deep){
    return _makeCloneVerson(...arguments)
  }
  const isCollection=item=>validateType(item, [Array, Set, Tuple, Arguments ]);
  const isInvalidInjectorOpt=opt=>_mapValue("build,preBuild", opt);
  const isAllowedComposersOpt=opt=>_mapValue("postBuild,preMount,postMount,preUpdate,postUpdate,preDestroy,postDestroy,defineConfig,useSignals,useSlots,makePublish,useTransmit,useContext,useParams,onEffect,onTracked,onCatch,onSlotRender,onSlotEffect", opt);
  const adaptableComposers={
    params:useParams,
    postBuild,
    preMount,
    postMount,
    preUpdate,
    postUpdate,
    preDestroy,
    postDestroy,
    onEffect,
    onCatch,
    onTracked,
    onSlotEffect,
    onSlotRender,
    buildConfig:defineConfig,
    signals:useSignals,
    slots:useSlots,
    publish:makePublish,
    transmit:useTransmit,
    context:useContext,
  }
  const optionalAdapterrs="name,widgets,directives,mixins"
  const isAllowedAdapterOpts=opt=>_mapValue( keys(adaptableComposers).join(','), opt);
  const isNonDuplicateFunc=opt=>_mapValue("params,context,publish", opt)
  const isAdapterOpt=opt=>_mapValue("params,preBuild", opt)
  function _useOptionsAdapter(instance={}){
    const response=validateCollectionArgs(arguments, {
      name:'useOptions',
      required:[true],
      count:1,
      validators:[ Object ]
    })
    if(!response) return [ pass, pass ]
    const self=getCurrentRunningEffect({
      name:'useOptions'
    })
    if(!self && !(validateCollectionArgs(arguments, {
      name:"useOptions",
      validators:[Object],
      count:1
    } ))) return {};
    for(const [ key, value ] of entries(instance)){
      if(!isValidWidgetOption(key)) {
        self[$$$operands]._OPTIONS[key]=value
      }else if(isAllowedAdapterOpts(key)){
        adaptableComposers[key](value);
      }else if(isInvalidInjectorOpt(key)){
        $debug_log(`invalid option "${key}" passed to options Adapter: not a valid  adapter.\n\nuse the options API instead`, self);
      }else{
        self[$$$core].opts[key]=value;
      }
    }
    return self
  }
  function useOptions(obj){
    return _useOptionsAdapter(...arguments);
  }
  function _mergeProps_(...props_list){
    const validators=[];
    props_list.forEach(()=> validators.push(Object));
    if(!validateCollectionArgs(props_list, {
      validators,
      name:'mergeProps',
      min:1
    })) return  E_Obj;
    const originProps ={};
    for(let [ index, attrs ] of props_list.entries()){
      transformGeneticPropsMerge(originProps, attrs);
    }
    return originProps;
  }
  function transformGeneticPropsMerge(origin, attrs){
    for(const [ key, item ] of entries(attrs)){
      if(hasOwn(origin, key)){ //check if key exists inorih  object
        if(isOnListener(key)) {
          const value =  (!isArray(origin[key]) ? [origin[key]] : origin[key] );
          const itemData = ( !isArray( item ) ? [ item ] : item ) ;
          origin[ key ] = [ ...value, ...itemData ];
        }else if(key === 'class'){
          const patchRecord= new Tuple();
          mapClassTypeTransform(origin[key], patchRecord);
          origin[key]=mapClassTypeTransform(item, patchRecord);
        }else if(key === 'style'){
          origin[key]={
            ...compileStyleProps(null, origin[key], {}, null),
            ...compileStyleProps(null, item, {}, null)
          }
        }
      }else{ 
        if(key === 'class') origin[key]=mapClassTypeTransform(item, new Tuple());
        else if(key === 'style') origin[key] = compileStyleProps(null, item, {}, null);
        else origin[key]=item;
      }
    }
    return origin;
  }
  function mergeProps(...props){
    return _mergeProps_(...props);
  }
  function _combineCallbacksCalls_(...handlers){
    function __merged_Methods_Calls(...args){
      for(const [ key, method ] of handlers.entries()){
        method.call(this, ...args);
      }
    }
    return function (...args){
      return __merged_Methods_Calls.call(this, ...args);
    }
  }
  function mergeMethods(...args){
    return  _combineCallbacksCalls_(...args);
  }
  const GLOBALS_ALLOWED ='Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol'
  const isGloballyAllowed = (key) =>/*@__PURE__*/ _mapValue(GLOBALS_ALLOWED, key);
  const argumentsValidator={
    name:"",
    max:Infinity,//maximum arguments in number
    validators:[],//arguments type validators by array indexes
    self:undefined,//widget instance.
    min:0,//minimum arguments validatoe
    required:[],//required truthy values by array indexes,
    count:undefined,
    validator:()=>true
  }
  function validateCollectionArgs(args, config=argumentsValidator){
    args = [ ...args ]
    if(!isS(argumentsValidator, config)) config={ 
      ...config, 
      ...argumentsValidator
    };
    else return true;
    const { name, max, validators, self, required, min, count, validator }=config;
    /* a string 'name', number max, array validator, houxit self instance and indexes of required arguments */
    if(isNumber(max) && len(args) > max) {
      $debug_log(max === 0 ? `${name} Adapter does not accept any Argument` : `Parameter arguments received at ${name} macro exceds validator arguments maximum count\n\n"${name}()" expects only maximum of ${max} arguments`, self);
      return false;
    }
    if( min && len(args) < min ) {
      $debug_log(`"${name}" function expects atleastt ${min} minimum of arguments\n\n${len(args)} received`, self);
      return false;
    }
    if(!isUndefined(count) && !len(args) === count){
      $debug_log(`"${name}" method expects only ${count} number of arguments\n${len(args)} passed`, self);
      return false;
    }
    if(!validator(...args)) return false;
    if(len(required)){
      for(let [ index, check ] of required.entries()){
        if((!len(args) >= Number(index) && isUndefined(args[index]))){
          $debug_log(`Argument at index ${index} of ${name} expects a required positional parameter\n\nparameter not provided or is undefined :: use "null" instead if you tend to skip or not context an argument value `, self);
          return false;
        }
      }
    }
    if(isArray(validators) && len(validators) && len(args)){
      for(let [ key, item ] of args.entries()){
        if(!key > len(validators)) break;
        const validator = validators[key] || Any ;
        let response=validateType(item, validator )
        if(isFalse(response)) {
          $debug_log(`unexpected argument value type received at ${key} index of the "${name}" adapter\n\nInvalid input type`, self);
          return false;
        }
      }
    }
    return true
  }
  const objectPropsValidator={
    name:"",
    self:undefined,//widget instance scope
    props:{},
  }
  const validatorProps={//internal validators default
    type:undefined,
    required:false,
    default:undefined,
  }
  function validatePropsInput( value, config){
    if(!isS(config, objectPropsValidator)) config = {
      ...config,
      ...objectPropsValidator
    }
    let { name, props, self,  } = config ;
    if(!isObject(config)){
      $debug_log(`configuration parameter at argument 2 of validatorProps expects a plain javascript object`);
      return
    }else if(!isPObject(value) || hasOwn(value, 'props') && !isPObject(value.props)){
      $debug_log(`unexpected value received at "${name}, validation for ${isPObject(value) ? '{}.prop' : '{}'}" adapter\n\nInvalid input type :: expects a plain Object`, self);
      return false;
    }
    const propsSet = {};
    for(let [ param, ind ] of entries(config.props) ){
      if(!isPObject(param)){
        $debug_log(`Properties validator expects a plain object\n
        For the "${ind}" prop validation`);
        return false;
      }
      if(!isS(param, validatorProps) ) param = {
        ...param,
        ...validatorProps
      }
      if(!runObjectifiedParamsValidation(null, propsSet, [ value, param, ind ], 'prop')) return false;
      else if(!paramsValidationCircle(null, propsSet, [value, param, ind ],'prop')) return false;
    }
    return true;
  }
  function _validateCollection(collection, config){
    const response=validateCollectionArgs(arguments, {
      validators:[ [ Array, Set, Tuple, Arguments ], Object ],
      count:2,
      required:[true, true ],
      name:'validateCollection'
    })
    if(!response) return false;
    return validateCollectionArgs(collection, config )
  }
  function validateCollection( collection, config ){
    return _validateCollection(...arguments)
  }
  function validateProps(value, config){
    return validatePropsInput(...arguments )
  }
  function vb(self){
    if(!isHouxitBuild(self)) return ;
    return {
      operands:self[$$$operands],
      ownProperties:self[$$$ownProperties],
      compiler:self[$$$compiler],
      core:self[$$$core],
      register:self[$$$register],
      build:self.build,
      model:self.__public_model__,
      proto:self.__proto__
    }
  }
  function deferTokenComputedGetter(computed__Token, effective, watchers){
    if(computed__Token[refInternalEffectKey].updateFlags){
      computed__Token[refInternalEffectKey].updateFlags=0;
      const getCookie = computed__Token[refInternalEffectKey].computed.call(computed__Token[refInternalEffectKey].ModelInstance) ;
      computed__Token[refInternalEffectKey].cache=getCookie;
      return getCookie;
    }
    return computed__Token[refInternalEffectKey].ModelInstance ? computed__Token[refInternalEffectKey].cache : effective[watchers.accessor] ;
  }
  function hydrateEffectSubs(watchers){
    if(isHouxitBuild(watchers.self)) watchers.watchGetters=watchers.self[$$$operands].onEffectWatch;
    else watchers.watchGetters=false;
    return watchers.watchGetters;
  }
  function deepTranformMacro(watchers){
    function _transform(value, config){
      const res=validateCollectionArgs(arguments, {
        min:1,
        max:2,
        validators:[Any, Object],
        name:'deepTranform'
      })
      if(!res) return value;
      return _createReactiveProxyCollectons(value,  watchers, config?.isShallow || false, config || {});
    }
    return function deepTranform(value, config){
      return _transform(...arguments);
    }
  }
  function fineTuneFactoryTokenCompile(effective, watchers, config){
    const  callback =  config[$factoryTokenKey];
    delete config[$factoryTokenKey];
    function track(){
      return watchers.effectTrack();
    }
    function effect(){
      return  watchers.effectTrigger();
    }
    config = callback(track, effect, deepTranformMacro(watchers));
    const factoryObject=watchers.factoryObject;
    watchers.config=config;
    if(config.accessor){
      delete effective[watchers.accessor]
      watchers.accessor=config.accessor;
      effective[watchers.accessor]=undefined;
      delete config.accessor;
    }
    for (let desc of ['get', 'set'].values()){
      if(hasOwn(config, desc)) {
        if(!isFunction(config[desc])){
          $debug_log(`"${desc}" property descriptor at "factoryToken" is of an invalid data type\ntype of 'Function' expected`);
          return E_Obj;
        }
        factoryObject[desc]=config[desc];
        delete config[desc];
      }
    }
    return config;
  }
  function refLifeCircleHooksConfig(watchers, config){
    if(config.onTracked) watchers.onTrackedHook=()=>{
      if(watchers.trackZoom) return;
      watchers.trackZoom=true;
      deferTick(config.onTracked.bind(this)).then(()=> watchers.trackZoom=false);
    };
    if(config.onEffect) watchers.onEffectHook=()=>{
      if(watchers.effectZoom) return;
      watchers.effectZoom=true;
      deferTick(config.onEffect.bind(this)).then(()=> watchers.effectZoom=false);
    }
  }
  function Token_X_ReactiveEffectObject(){
    return assign( new ReactiveEffectObject(), { 
      observers : new Tuple(),
      mutated : 0,
      effectFlush:new Tuple(),
      subscribers:new Tuple(),
      getHandler:pass,
      self:undefined,
      superObs:undefined,
      onTrackedHook:pass,
      onEffectHook:pass,
      accessor:'data',
      effectTrack:pass,
      effectTrigger:pass,
      factoryObject:{},
      trackZoom:false,
      effectZoom:false
    } );
  }
  function factoryGetter(accessor, isFactoryToken, d_o){
    if(isFactoryToken) return ()=> this[accessor()];
    else return d_o.getter;//accessing getter from dirty_object
  }
  function defineTokenRuntime_Carriers(effective, watchers, metrics){
    const { isFactoryToken, isComputed, isReadonly, isShallow, accessor, config } = metrics ;
    const returnValue=()=>{
      if(isComputed) return deferTokenComputedGetter(this, effective, watchers);
      return unwrap(effective);
    }
    const descriptor = {};
    const dirty_object={};
    watchers.effectTrack=function(){
      hydrateEffectSubs(watchers)
      if(watchers.watchGetters) watchers.subscribers.add(factoryGetter.call(this, accessor, isFactoryToken, dirty_object));
      watchers.mutated;
      watchers.onTrackedHook();
    }.bind(this);
    watchers.effectTrigger=function (){
      watchers.mutated=1;
      watchers.onEffectHook();
    }
    if(isFactoryToken){
      if(hasOwn(watchers.factoryObject, 'get')) descriptor.get=watchers.factoryObject.get;
      if(hasOwn(watchers.factoryObject, 'set')) descriptor.set=watchers.factoryObject.set;
    }else{
      descriptor.get= function(){
        function getter(){
          return  isComputed ? returnValue() : effective[accessor()]  ;
        }
        dirty_object.getter=getter;
        watchers.effectTrack()
        return getter();
      }
      descriptor.set=function(value, prop){
        if(isReadonly && !isReadonlyBypasser(value)){
          $debug_log(`Cannot reassign/mutate a "readonly" token value\n\n___MUTATION FAILED___\n........".${prop}" property assignment \n\nFailed writing to a readonly \n.........>>>bypassKey verification failure`);
          return false;
        }
        value=unwrap(isReadonly ? value[bypassSymbol] : value) ;
        value = _createReactiveProxyCollectons(value, watchers, isShallow, config );
        watchers.effectTrigger();
        effective[accessor()]=value;
        return true;
      }
    }
    return descriptor;
  }
  const _data_key=Symbol("[[[_data_key]]]");
  function _Houxit_Token__Constructor(effective, config ){
    const watchers= Token_X_ReactiveEffectObject()
    const accessor=()=>watchers.accessor;
    config =( isPObject(config) ? config :  {}) ;
    const isFactoryToken=hasOwn(config, $factoryTokenKey);
    if(isFactoryToken) config = fineTuneFactoryTokenCompile.call(this, effective, watchers, config);
    if(isS(config, E_Obj)) return;
    const reConfig={}
    if(hasOwn(config, 'shallow')) {
      reConfig.isShallow=config.shallow
      delete config.shallow;
    }
    if(hasOwn(config, 'readonly')) {
      reConfig.isReadonly=config.readonly
      delete config.readonly;
    }
    config = assign(config, reConfig);
    const { isReadonly=false, isComputed=false, isShallow=false } = config;
    refLifeCircleHooksConfig.call(this, watchers,  config );
    effective[accessor()]=_createReactiveProxyCollectons( effective[accessor()], watchers, isShallow, config);
    this[refInternalEffectKey]=watchers;
    const descriptors = defineTokenRuntime_Carriers.call(this, effective, watchers, { 
      isFactoryToken, 
      isComputed, 
      isReadonly, 
      isShallow, 
      accessor, 
      config
    });
    delete watchers.factoryObject;
    define(this, accessor() , descriptors );
    watchers.cache=undefined;
    watchers["[[[computed__Token]]]"]=false
    watchers.updateFlags=0;
    watchers.computed=pass
    watchers.ModelInstance=null;
    watchers.isStateToken=false;
    watchers.watchGetters=false;
    define(this, refIsShallowKey, { 
      value:isShallow, 
      enumerable 
    })
    define(this, _data_key, { 
      value:generateUUID(7, 'alphaNum').toUpperCase(),
      enumerable
    });
    define(this, refGenreId, { 
      value: `[[[_${ isReadonly ? "Readonly" : "Reactive" }__Token_]]]`,
      enumerable
    });
  }
  class Houxit_Token__ {
    constructor(effective, config={} ){
      _Houxit_Token__Constructor.call(this, ...arguments );
    }
    effectTrigger(fn, self){
      return _effectTriggerHook.call(this, ...arguments);
    }
    isSameToken(ref){
      return isToken(ref) && this[_data_key] ===  ref[_data_key];
    }
    create(valueX, config){
      return token(...arguments);
    }
  }
  function _effectTriggerHook(fn, self){
    if(this[refGenreId] === '[[[Readonly__Token_]]]' && isFalse(this[refIsShallowKey])) return ;
    const watchers = this[refInternalEffectKey];
    let mutated=watchers.mutated;
    watchers.getHandler= fn.getHandler || pass;
    define(watchers , 'mutated', {
      get(){
        watchers.getHandler(watchers.subscribers);
        cleanupSubscribers(watchers.subscribers);
        return mutated;
      },
      set(valueX){
        mutated=valueX;
        fn(this[refInternalEffectKey]);
        return true;
      }
    });
    if(hasOwn(fn, 'init')) fn.init(watchers);
    return true //call the effectTrigger callback with a function parameter
  }
  class Reactive__Token_ extends Houxit_Token__{
    constructor(token, config){
      super(...arguments)
    }
  }
  class Readonly__Token_ extends Houxit_Token__{
    constructor(token, config){
      super(...arguments)
    }
  }
  class Token extends Houxit_Token__{
    constructor(token, config){
      super(...CustomTokenizerArgs(token, config));
    }
  }
  const CustomTokenizerArgs=(token, config)=>[ {
    data:token
  }, config];
  function _createReactiveProxyCollectons(iterable, watcher, isShallow, config ) {
    if(isDomSpecialConstructor(iterable) || !isIterable(iterable) ) return iterable;
    if(!isStream(iterable) && !isToken(iterable)){ 
      iterable = _createStream(iterable, config, watcher );
    }
    function mounter(effObj){
      watcher.mutated=1;
    }
    mounter.init=function(effObj){
      effObj.self=EffectReactiveMaster(watcher)
    }
    mounter.getter=function (subscribers){
      subscribeEffect(watcher, subscribers);
      watcher.mutated;
    }
    _mountReactiveWatcher(iterable, mounter);
    return iterable;
  }
  function __Houxit__Tokenizer__Machine___( target , config={} ) {
    if(!isToken(target)) {
      if(isComputedMacro(target)){
        $debug_log(`Unaccepted computed token cache passed to a Token\nWill not compile...`);
        return target;
        // target = hydrateComputedTokenTransform(self, target, true);
      }
      target = preventX( new Reactive__Token_( {
        data:target
      }, config ));
    }
    const self = getCurrentRunningEffect({
      silently:true,
      name:'token'
    });
    if(isHouxitBuild(self)){
      _mountReactiveWatcher(target, self, true);
    }
    return target;
  }
  function token(target, config){
    return __Houxit__Tokenizer__Machine___(...arguments);
  }
  function _factoryToken(callback){
    const response=validateCollectionArgs(arguments, {
      count:1,
      validators:[Function],
      name:"factoryToken"
    })
    if(!response) return;
    const target = new Token({ 
      data:undefined
    }, {
      [$factoryTokenKey]:callback//key used to recognise a custom ref by houxit
    });
    const self = getCurrentRunningEffect({
      silently:true,
      name:"factoryToken"
    });
    if(isHouxitBuild(self)){
      _mountReactiveWatcher(target, self, true);
    }
    return target;
  }
  function factoryToken(callback){
    return _factoryToken(...arguments);
  }
  function traceBack(){
    const date = new Date();
    return createObj('TraceBack', {
      h:date.getHours(),
      m:date.getMinutes(),
      s:date.getSeconds(),
      ms:date.getMilliseconds()
    });
  }
  function effectObject(value){
    
  }
  class Exception extends Error{
    constructor(msg, ...args){
      super(...args)
    }
  }
  const isException = ctruct => ctruct instanceof Exception;
  function raise(){
    
  }
  function isTuple(tp){
    return tp instanceof Tuple;
  }
  const arrSet=setData=>isSet( setData ) ? [...setData] : isTuple(setData) ? setData.list() : setData ;
  function setValueIndex(setData , value){
    if(!isSet(setData) && !len(setData) && !setData.has(value)) return NaN;
    let index=0
    for(let data of setData.values()){
      if(data === value) return index;
      index++;
    }
  }
  const arrayMM="push,pop,shift,unshift,splice,sort,reverse,write,copyWithin,fill";
  const setMM="add,delete,clear,write";
  const mapMM="set,delete,clear,write";
  const tupleMM=setMM+",shift,unshift,splice,pop,extend,replace,prepend";
  const objectMM="define,write,delete";
  function getMutationArgs(data){
    return isArray(data) ? arrayMM : isSet(data) ? setMM : isMap(data) ? mapMM : isTuple(data) ? tupleMM : isPObject(data) ? objectMM : "write";
  }
  function getAgentMutators(data, prop, model){
    const value=data;
    data=unwrap(data);
    let mutateArgs= getMutationArgs(data);
    const mutation_object=createObj('mutatations');
    for(let name of mutateArgs.split(',').values()){
      function mutate(arg){
        let rv=undefined;
        if( validateType(data, [Set, Tuple,Array, Map])) {
          rv=data[name](arg);
        }else if(isPObject(data)){
          if('define' === name) rv=define(data, ...arguments );
          else if('delete' === name ) {
            delete data[arg];
            rv = true;
          }
        }
        let assV=rv;
        if((model || !isPrimitive(value) ) && prop  && name === 'write'){ 
          assV=set_Object_Value(isModelInstance(model) ? model : !isPrimitive(value) ? value : E_Obj , prop, len(arguments) ? arg : data  );
        }
        return assV ;
      }
      mutate = Function('fn', `
        return function ${name === 'delete' ? 'del' : name }(value){
          return fn(...arguments);
        }
      `)(mutate);
      define( mutation_object, name, {
        value : mutate,
        enumerable
      });
    }
    return mutation_object;
  }
  function _useAgent_(data, ModelInstance){
    const dataRead = ()=> data
    const response = validateCollectionArgs(arguments, {
      min:1,
      max:2,
      validators:[ Any, [Model]],
      name : 'useAgent'
    });
    if(!response) return [ dataRead , pass];
    if(isHouxitBuild(this) && !isChar(data)){
      $debug_log(`data path at positional argument 1 expects a string/symbol value of an existing model path\n\n.>..._useAgent`);
      return [ dataRead, pass ];
    }else if(isModelInstance(ModelInstance) && !isChar(data)){
      $debug_log(`data property at positional argument 1 of "useAgent" expects a string/symbol value\n\nMust be a model valid path`);
      return [dataRead, pass];
    }
    const self= isHouxitBuild(this) ? this : isModelInstance(ModelInstance) ? {
      __public_model__ : ModelInstance
    } : null;
    ModelInstance= self ? self.__public_model__ : null;
    if(self && !isHouxitBuild(self)) delete self.__public_model__;
    let prop=isModelInstance(ModelInstance) ? data : isToken(data) ? data[refInternalEffectKey].accessor : "";
    if( isModelInstance(ModelInstance) && !object_Has_Path(ModelInstance, prop)){
      $debug_log(`"${prop}" property is not a valid model property`, );
      return[dataRead, pass];
    }
    data = isModelInstance(ModelInstance) && exists(prop) ? _$runModelBind( ModelInstance , prop ||  "" ) : data;
    const mutateArgs= getAgentMutators(data, prop , ModelInstance);
    let defineCount = 0;
    const unwrappedGetter= ()=> read(data)
    function mutate(mutation){
      if(isPFunction(mutation) && defineCount < 1){
        defineCount++;
        define(mutateArgs, 'data', {
          get(){
            return unwrappedGetter();
          }
        })
      }
      if(isPFunction(mutation) ){
        try{
          mutation(mutateArgs)
        }catch(err){
          $debug_log(`Encountered an error during the call of the writer callback\n\n${err}`);
          return false;
        }
      }else if(!isPFunction(mutation)){
        set_Object_Value( isModelInstance(ModelInstance) ? ModelInstance : !isPrimitive(data) ? data : E_Obj , prop, mutation  );
        return true;
      }
    }
    function reader(){
      return unwrappedGetter();
    }
    function writer(...args){
      return mutate(...args);
    }
    return [ reader, writer ] ;
  }
  function useAgent(data, ModelInstance){
    return _useAgent_(...arguments);
  }
  function WRITE(props){
    const response=validateCollectionArgs(arguments, {
      name:'_write',
      count:1,
      validators:[Object]
    })
    if(!response) return false
    for (const [prop, value] of entries(props)){
      if(!object_Has_Path(this.__public_model__, prop)){
        $debug_log(`"${prop}" not found in model instance\n\n..............at......"_write"`, this, true);
        return false
      }
      const [ V, mutate ] = this.__public_model__._useAgent(prop);
      mutate( agent => agent.write(value));
    }
    return true;
  }
  function getIterator(obj){
    return validateType(obj, [Set, Map, Array, Tuple ]) ? obj.entries() : isPObject(obj) ? entries(obj) : isIterator(obj) ? obj : [].entries() ;
  }
  class IterateController{
    constructor(config){
      const { value, type } = config;
      this.value=value;
      this._type=type;
    }
    value=undefined
    _type=""
  }
  const isIterateController=value=> value instanceof IterateController;
  function Continue(value=undefined){
    return new IterateController({
      value,
      type:'continue'
    });
  }
  function Break(value){
    return new IterateController({
      value,
      type:'break'
    });
  }
  function Return(value){
    return new IterateController({
      value,
      type:'return'
    });
  }
  function trigger_callback(value, callback, useOF){
    let index=0;
    let returnValue;
    if(isNumber(value)){
      for(let i=0;i<value;i++) {
        const response = callback(i, index);
        index++;
        if(isIterateController(response)){
          if(response._type === "continue") continue;
          else if(response._type === "break") break;
          else if(response._type === 'return') return response.value;
        }
      }
    }else{
      if(useOF){
        for(let [key, item] of getIterator(value)) {
          const response = callback(item, key, index);
          index++;
          if(isIterateController(response)){
            if(response._type === "continue") continue;
            else if(response._type === "break") break
            else if(response._type === 'return') return response.value;
          }
        }
      }else{
        for(let [ key, item ] in entries(value)) {
          const response = callback(key, item, index);
          index++;
          if(isIterateController(response)){
            if(response._type === "continue") continue;
            else if(response._type === "break") break
            else if(response._type === 'return') return response.value;
          }
        }
      }
    }
    return returnValue;
  }
  function iterate(value, type){
    if(!validateCollectionArgs(arguments, {
      name:'iterate',
      min:1,
      max:2,
      validators:[Object, String]
    })) return false;
    if(!type || !_mapValue("of,in", type)) type='of';
    else if(!isIterable(value) && !isNumber(value)){
      $debug_log(`No iterable .value prop received at parameter 1 object of the "iterate" helper macro`);
      return false;
    }
    const useOF=type && type.trim() === 'of';
    return {
      test(callback){
        return trigger_callback(value, callback, useOF);
      }
    };
  }
  const refGenreId=Symbol("[[[GenreIDType]]]");
  const refInternalEffectKey=Symbol();
  const refIsShallowKey=Symbol();
  function __createReadonlyToken__(value, config={}){
    const response=validateCollectionArgs(arguments, {
      name:'readonlyToken',
      required:[true],
      min:1,
      max:2,
      validators:[ Any, Object ]
    });
    if(!response) return;
    const metrics = config.metrics || []
    if(hasOwn(config, 'metrics')) delete config.metrics
    if(isReactiveToken(value)) return toReadonlyToken(value);
    else if(isReadonlyToken(value)) return value;
    let [ mutate=false, key ]=metrics;
    config.isReadonly=true;
    return preventX(new Readonly__Token_({
      data:value
    }, config ))
  }
  function readonlyToken(value, config){
    return __createReadonlyToken__(...arguments);
  }
  function __createShallowToken__(value, config={}){
    const response=validateCollectionArgs(arguments, {
      name:'shallowToken',
      required:[true],
      min:1,
      max:2,
      validators:[ Any, Object ]
    });
    if(!response) return;
    const metrics = config.metrics || []
    if(hasOwn(config, 'metrics')) delete config.metrics
    if(isToken(value) && !isShallowToken(value)) return toShallowToken(value);
    else if(isShallowToken(value)) return value;
    let [ mutate=false, key ]=metrics;
    config.isShallow=true;
    return preventX(new Reactive__Token_({
      data:value
    }, config ));
  }
  function shallowToken(value, config){
    return __createShallowToken__(...arguments);
  }
  function isToken(value){
    return value instanceof Houxit_Token__;
  }
  function unwrap(value){
    if(!isToken(value)) return value;
    return value[ value[refInternalEffectKey].accessor ];
  }
  function unToken(ref){
    return unwrap(ref);
  }
  function fromToken(ref){
    return unwrap(ref);
  }
  function _toToken(object, path, config){
    const res=validateCollectionArgs(arguments, {
      min:2,
      max:3,
      validators:[[Object, Array], [String, Symbol], Object],
      name:'toToken',
      required:[true, true ]
    })
    if(!res) return E_Obj;
    return token(object[path], config);
  }
  function toToken(object, path){
    return _toToken(...arguments);
  }
  function isReactiveToken(value){
    return isToken(value) && value[refGenreId] === "[[[Reactive__Token_]]]";
  }
  function isReadonlyToken(value){
    return isToken(value) && "[[[Readonly__Token_]]]" === value[refGenreId];
  }
  function isShallowToken(value){
    return isToken(value) && isTrue(value[refIsShallowKey]);
  }
  function isShallowReactiveToken(value){
    return isReactiveToken(value) && isReadonlyToken(value);
  }
  function isShallowReadonlyToken(value){
    return isReadonlyToken(value) && isShallowToken(value)
  }
  function isComputedToken(value){
    return isReadonlyToken(value) && isTrue(value[refInternalEffectKey]['[[[computed__Token]]]'])
  }
  function fromReadonlyToken(ref, config){
    if(!isToken(ref)) return token(ref, config);
    if(isReadonlyToken(ref)) return token(unwrap(ref), config);
    return ref;
  }
  function toShallowToken(ref, config={}){
    if(!isShallowToken(ref)) return shallowToken(unwrap(ref), config );
    return ref;
  }
  function toReadonlyToken(ref, config={}){
    if(!isReadonlyToken(ref)) return readonlyToken(unwrap(ref), config );
    return ref;
  }
  function isStateToken(ref){
    return isToken(ref) && isTrue(ref[refInternalEffectKey].isStateToken)
  }
  function cleanupSubscribers(subs){
    if(!len(subs)) return;
    if(validateType(subs, [ Set, Tuple ])) subs.clear();
    else if(isArray(subs)) subs.splice(0, len(subs));
  }
  function _mountTokenEffect(token, self, force=false ){
    if(!isToken(token)){
      $debug_log(`Effect value  is not a token/stream value`);
      return false;
    }
    if(isHouxitBuild(self) && (!isStateToken(token) || force)){
      function refMount(_){
        self.__public_model__._pushEffect();
        if(!isStateToken(token)) token[refInternalEffectKey].isStateToken=true;
      }
      refMount.init=function(eff){
        eff.self=self;
      }
      refMount.getHandler=function(subscribers){
        generateDependencySubscriptions(self, subscribers);
      }
      token.effectTrigger(refMount)
      return true;
    }else if(isFunction(self)){
      token.effectTrigger(self);
      return true;
    }
    return false;
  }
  function _mountProxyStream(obj, self, so){
    if(!isStream(obj)) return false;
    const streamMap=obj[$$$StreamProxyKey];
    const effObj=streamMap.get(obj);
    if(!isHouxitBuild(self) && isFunction(self)){
      const getter=isFunction(self.getter) ? self.getter : pass
      effObj.mountWatcher(self, getter );
      return true;
    }else if(!isFunction(self) && !isHouxitBuild(self)) return false;
    const dependency=self[$$$operands].dependency
    effObj.self=self;
    function effectMount(){
      self.__public_model__._pushEffect();
    }
    effectMount.init=function(eff){
      eff.self=self;
      eff.isStateStream = true;
    }
    effObj.mountWatcher(effectMount , (subscribers)=>{
      trackDependency(self, dependency);
      generateDependencySubscriptions(self, subscribers);
    });
    return true;
  }
  function _mountReactiveWatcher(value, self, force){
    if(isToken(value)) return _mountTokenEffect(...arguments);
    else if(isStream(value)) return _mountProxyStream(...arguments);
    return false;
  }
  function mountEffect(value, self, force){
    return _mountReactiveWatcher(...arguments)
  }
  function _transformMountToken(token, force=true){
    const res=validateCollectionArgs(arguments, {
      min:1,
      max:2,
      validators:[Houxit_Token__, Boolean],
      name:'mountToken'
    });
    if(!res) return false
    const self=getCurrentRunningEffect({
      name:'mountToken'
    });
    if(!isHouxitBuild(self)) return false;
    return _mountTokenEffect(token, self, force)
  }
  function mountToken(token, force){
    return _transformMountToken(...arguments);
  }
  function _transformMountStream(obj){
    const res=validateCollectionArgs(arguments, {
      count:1,
      validators:[[Object,Array,Set,Tuple,Map]],
      name:'mountStream'
    });
    if(!res) return false
    else if(!isStream(obj)){
      $debug_log(`object pased to the mountStream function is not a stream value `);
      return false;
    }
    const self=getCurrentRunningEffect({
      name:'mountStream'
    });
    if(!isHouxitBuild(self)) return false;
    return _mountProxyStream(obj, self);
  }
  function mountStream(obj){
    return _transformMountStream(...arguments)
  }
  class readonlyBypasser {
    constructor(value=undefined){
      this[bypassSymbol]=value;
    }
  }
  function _isProxyStream(stream){
    const res=validateCollectionArgs(arguments, {
      count:1,
      name:'isStream'
    })
    if(!stream || !res && !validateType(stream, [Object, Set, Tuple, Map, Array])) return false;
    const ReactiveMap=stream[$$$StreamProxyKey];
    return hasOwn(stream, $$$StreamProxyKey) && isWeakMap(ReactiveMap) && isREffObj(ReactiveMap.get(stream));
  }
  function isStream(value){
    return _isProxyStream(...arguments);
  }
  function _isShallowStream_(stream){
    return isStream(stream) && stream[$$$StreamProxyKey].get(stream).isShallow;
  }
  function isShallowStream(stream){
    return _isShallowStream_(...arguments);
  }
  function isReadonlyStream(stream){
    return isStream(stream) && stream[$$$StreamProxyKey].get(stream).isReadonly;
  }
  function isShallowReadonlyStream(stream){
    return isShallowStream(stream) && isReadonlyStream(stream);
  }
  function isStateStream(stream){
    return isStream(stream) && stream[$$$StreamProxyKey].get(stream).isStateStream;
  }
  function genericStreamTransform(stream, config, types){
    if(isPrimitive(stream)){
      $debug_log(`Value Exception\nFailed to convert a primutive Value to a streamable object\n\nExpects a plain object or collection`);
      return ;
    }else {
      types = new Tuple(...types);
      if(types.contains('readonly', 'shallow') && isShallowReadonlyStream(stream)) return stream;
      else if(types.has('readonly') && isReadonlyStream(stream)) return stream;
      else if(types.has('shallow') && isShallowStream(stream)) return stream;
    }
    if(isStream(stream)) {
      stream = stream[$$$StreamProxyKey].get(stream).origin
    }
    return _createStream(stream, {
      isReadonly : types.has('readonly'),
      isShallow : types.has('shallow'),
      ...( !isPObject(config) ? {} : config  )
    });
  }
  function _toReadonlyStream(stream, config){
    return genericStreamTransform(stream, config, ["readonly"]);
  }
  function toReadonlyStream(stream, config){
    return _toReadonlyStream(...arguments)
  }
  function _toShallowStream(stream, config){
    return genericStreamTransform(stream, config, ["shallow"]);
  }
  function toShallowStream(stream, config){
    return _toShallowStream(...arguments);
  }
  function _toShallowReadonlyStream(stream, config){
    return dynamicStreamTransform(stream, config, ['readonly', 'shallow']);
  }
  function toShallowReadonlyStream(stream, config){
    return _toShallowReadonlyStream(...arguments);
  }
  const isReadonlyBypasser = bypasser=>bypasser instanceof readonlyBypasser;
  const bypassSymbol=Symbol("Readonly_Bypass_Symbol");
  const isBypassSymbol=sym=>sym === bypassSymbol;
  function defineReadonlyGetter(parent, prop, value, metrics=[], ){ 
    let [ isShallow=false, isComputed=false ]=metrics;
    value=isReadonlyToken(value) ? value : isToken(value) ? toReadonlyToken(value, { 
      isComputed
    }) : readonlyToken(value, {
      isComputed
    });
    define(parent, prop, { 
      value,
      enumerable 
    });
  }
  function useReadonlyBypasser(parent, key, value){
    return set_Object_Value(parent, key, new readonlyBypasser(value) );
  }
  function objFreeze(obj, deep=false){
    if(!validateType(obj, [Object, Array, Tuple])) return obj;
    if(isTuple(obj)) return obj.freeze();
    if(isTrue(deep)){
      for (let [key, value] of getIterator(obj)){
        obj[key]=objFreeze(value, true);
      }
    }
    return isTuple(obj) ? obj : Object.freeze(obj);
  }
  function effectDependencyTracking(self, fn , args=[]){
    args=!isArray(args) ? [args] : args;
    self[$$$operands].onEffectWatch = true;
    const value = fn(...args);
    self[$$$operands].onEffectWatch=false;
    const subscribers=[ ...arrSet(self[$$$core].effectSubscribers) ];
    self[$$$core].effectSubscribers.clear();
    return [ subscribers, value ];
  }
  function _trackEffectDeps(fn, ...args ){
    if(validateCollectionArgs(arguments, {
      count : 1,
      validators:[Function],
      name:'trackEffectDeps'
    })) return [];
    const self = getCurrentRunningEffect({
      name:'trackEffectDeps'
    });
    if(!isHouxitBuild(self)) return [];
    return effectDependencyTracking(self, fn, args );
  }
  function trackEffectDeps(fn){
    return _trackEffectDeps(...arguments)
  }
  const effectHookValueKey=Symbol();
  function _runGlobalEffectHook(fn, config){
    const response=validateCollectionArgs(arguments, {
      name:'effectFlush',
      required:[true, false ],
      min:1,
      max:2,
      validators:[ Function, Object ]
    })
    if(!response) return pass;
    const self=getCurrentRunningEffect({
      name:'effectHook'
    });
    if(!self ){
      $debug_log(`effectHook called out of scope`);
      return pass;
    }
    return EffectAdapterHook.call(self, ...arguments);
  }
  function effectHook(fn, config){
    return _runGlobalEffectHook(...arguments);
  }
  function EffectAdapterHook(fn, config={}){
    if(!isPFunction(fn)){
      $debug_log(`"effectHook" at parameter 1 argument expects a plain function`, this, true);
      return ;
    }else if(len(arguments) > 1 && !isPObject(config)){
      $debug_log(`config parameter 2 argument of effectHook expects a plain object`);
      return;
    }
    config.initial=false;
    const [ subscribers, returnValue ]=effectDependencyTracking(this, function(){
      return fn();
    } );
    const stoper=this.__public_model__._observe(subscribers, fn, config);
    return function stopEffect(callback){
      if(len(arguments) ) {
        if(isPFunction(callback)){
          callback[effectHookValueKey]=returnValue;
          stoper(callback);
        }
      }else stoper();
    }
  }
  class Type{
    constructor(type, validator){
      this.type=type;
      this.validator=validator;
    }
  }
  class AnyType extends Type{
    constructor(){
      super([], (value)=> true);
    }
  }
  class NoneType extends Type{
    constructor(){
      super([], (value)=> isNull(value) || isEmptyStr(value));
    }
  }
  const isBaseType=type=>type instanceof Type;
  const Any=new AnyType();
  const None=new NoneType();
  const isAnyType=data=>validateType(data, AnyType);
  const isNoneType=data=>validateType(data, NoneType);
  class ClassFunctionType extends Type {
    constructor(){
      super([Function], (value)=> isClass(value));
    }
  }
  const Class = new ClassFunctionType();
  class ArgumentType extends Type{
    constructor(){
      super([], (value)=> isArgument(value));
    }
  }
  const Arguments = new ArgumentType();
  class CollectionType extends Type{
    constructor(){
      super([Array, Set, Arguments, Tuple], (value)=> isCollection(value));
    }
  }
  const Collections = new CollectionType();
  function getType(value){
    return isArray(value) ? 'array' : isDate(value) ? 'date' : isSet(value) ? 'set' : isMap(value) ? 'map' : isTuple(value) ? 'tuple' : value instanceof AnyType ? 'any' : value instanceof NoneType ? 'none' : isToken(value) ? '_'+isReactiveToken(value) ? 'Reactive' : 'Readonly' +'__Token_' :typeof value;
  }
  function customTypeReader(type){
    //for reading names of custom dataTypes;
  }
  function isFrozenWarn(isFrozen, action, type){
    if(isFrozen){
      $debug_log(`cannot perfom ${action} on ${type}\n\ninstance may have been frozen or sealed from future possible mutations`);
      return false;
    }
    return true;
  }
  class TupleSizeOverride{
    value = 0;
    constructor(value){
      this.value=Number(value);
    }
  }
  const isTSO=asset=>asset instanceof TupleSizeOverride;
  function setTupleSize(value){
    return new TupleSizeOverride(value);
  }
  function TupleConstructorManager(args){
    this[$$tupleStore]=[];
    this[$$tupleUnique]=new Set();
    let size=0;
    define(this, 'size', {
      get(){
        return size;
      },
      set(NS){
        if(!isTSO(NS)){
          $debug_log(`Mutation Exception\nCannot mutate the size property of a Tuple Object\n`);
          return false;
        }
        size=NS.value;
        return true;
      }
    })
    this[$$tupleIsFrozen]=false;
    let index=0;
    for(const item of args.values()){
      if(!this[$$tupleUnique].has(item)){
        this[$$tupleUnique].add(item);
        this[$$tupleStore].push(item)
        instanciate_tuple_indexes(this);
        index++
      }
    }
    this.size=setTupleSize(Number(len(this[$$tupleStore])));
  }
  function instanciate_tuple_indexes(tuple){
    let ind=0;
    const newList=tuple.list();
    let oldListKeys=keys(tuple);
    for (let key of oldListKeys.values()){
      key=Number(key);
      if(!key === ind ) {
        tuple[key]=ind;
      }
      if(ind > len(newList)-1) delete tuple[ind];
      ind ++;
    }
    ind = 0;
    oldListKeys=keys(tuple);
    for( const [ key, value ] of newList.entries()){
      if(key > len(oldListKeys)-1 || !isS(value, tuple[key])){
        if(key > len(oldListKeys)-1 ){
          
        } else pass
        tuple[key]=value;
      } 
    }
  }
  function Base_Tuple(...args){
    TupleConstructorManager.call(this, args );
  }
  function Tuple_filter(fn){
    return [ ...this[$$tupleStore].filter(...arguments) ];
  }
  Base_Tuple.prototype.filter=function filter(fn){
    return Tuple_filter(...arguments);
  }
  Base_Tuple.prototype.find=function find(fn){
    return this[$$tupleStore].find(...arguments)
  }
  Base_Tuple.prototype.shift=function shift(){
    if(isFalse(isFrozenWarn(this[$$tupleIsFrozen], 'shift()', 'tuple'))) return false
    const firstValue=this[$$tupleStore][0];
    if(this.size > 0){
      this[$$tupleStore].shift();
      this[$$tupleUnique].delete(firstValue);
      this.size=setTupleSize(this.size-1);
      instanciate_tuple_indexes(this);
    }
    return firstValue;
  }
  Base_Tuple.prototype.freeze=function freeze(deep=false){
    this[$$tupleStore]=objFreeze(this[$$tupleStore], deep);
    this[$$tupleIsFrozen]=true;
    return this;
  }
  Base_Tuple.prototype.values=function values(){
    return this[$$tupleStore].values();
  }
  Base_Tuple.prototype.keys=function keys(){
    return this[$$tupleStore].keys()
  }
  Base_Tuple.prototype.entries=function entries(){
    return this[$$tupleStore].entries()
  }
  Base_Tuple.prototype.has=function has(value){
    return this[$$tupleUnique].has(value)
  }
  Base_Tuple.prototype.indexOf=function indexOf(value){
    return len(arguments) && this[$$tupleUnique].has(value) ? this[$$tupleStore].indexOf(value) : -1 ;
  }
  Base_Tuple.prototype.add=function add(value){
    if(isFalse(isFrozenWarn(this[$$tupleIsFrozen], 'add()', 'tuple'))) return false
    if(len(arguments) && !this.has(value)){
      this[$$tupleUnique].add(value);
      this[$$tupleStore].push(value);
      this.size=setTupleSize(this.size+1);
      instanciate_tuple_indexes(this);
      return true;
    }
    return false;
  }
  Base_Tuple.prototype.delete=function Tuple_delete(value){
    if(isFalse(isFrozenWarn(this[$$tupleIsFrozen], 'delete()', 'tuple'))) return false
    if(this.has(value)) {
      const index=this.indexOf(value);
      if(index <= 0) {
        this[$$tupleStore].splice(index, 1);
      }
      this[$$tupleUnique].delete(value);
      this.size=setTupleSize(this.size-1);
      instanciate_tuple_indexes(this);
      return index
    }
    return null;
  }
  Base_Tuple.prototype.replace=function replace(oldV, newV){
    if(isFalse(isFrozenWarn(this[$$tupleIsFrozen], 'replace()', 'tuple'))) return false
    if(!this.has(oldV) && this.has(newV)) return false;
    const index=this.indexOf(oldV);
    this[$$tupleStore].splice(index, 1 , newV);
    this[$$tupleUnique].delete(oldV);
    this[$$tupleUnique].add(newV);
    instanciate_tuple_indexes(this);
    return true;
  }
  Base_Tuple.prototype.prepend=function prepend(value){
    if(isFalse(isFrozenWarn(this[$$tupleIsFrozen], 'prepend()', 'tuple'))) return false
    if(!this.has(value)) {
      this[$$tupleStore].unshift(value)
      this[$$tupleUnique].add(value);
      this.size=setTupleSize(this.size+1);
      instanciate_tuple_indexes(this);
      return true
    }
    return false
  }
  Base_Tuple.prototype.splice=function splice(index, count, ...newV){
    if(isFalse(isFrozenWarn(this[$$tupleIsFrozen], 'splice()', 'tuple'))) return false;
    if(!len(arguments)) return true;
    index = index || 0;
    count = count ||  this.size
    newV= len(newV) ? newV : [];
    for(let i=0;i<count;i++){
      const oldV=this[$$tupleStore][index+i];
      const newValue=newV.shift();
      this[$$tupleUnique].delete(oldV)
      if(index+i < len(newValue) && !this.has(newValue)) {
        this[$$tupleStore].splice(index+i, 1, newValue);
        this[$$tupleUnique].add(newValue)
      }else this[$$tupleStore].splice(index+i, 1)
    }
    if(len(newV)){
      for(let item of newV.values()){
        if(!this.has(item)){
          this.add(item);
        }
      }
    }
    this.size=setTupleSize(len(this[$$tupleStore]));
    instanciate_tuple_indexes(this);
    return true;
  }
  Base_Tuple.prototype.clear=function clear(){
    if(isFalse(isFrozenWarn(this[$$tupleIsFrozen], 'clear()', 'tuple'))) return false
    this[$$tupleStore].splice(0, this[$$tupleStore].length);
    this[$$tupleUnique].clear();
    this.size=setTupleSize(0);
    instanciate_tuple_indexes(this);
    return true;
  }
  Base_Tuple.prototype.pop=function pop(){
    if(isFalse(isFrozenWarn(this[$$tupleIsFrozen], 'pop()', 'tuple'))) return false
    const lastIndex=this[$$tupleStore][this.size-1];
    if(this.size-1 < 0  && !this.has(lastIndex) ) return;
    this[$$tupleUnique].delete(lastIndex);
    this[$$tupleStore].pop();
    this.size=setTupleSize(this.size-1);
    instanciate_tuple_indexes(this);
    return lastIndex;
  }
  Base_Tuple.prototype.at=function at(index){
    if(index < 0 && index > this.size){
      $debug_log(`index exceded Tuple limit.........\n"at()"`);
      return null
    }
    return this[$$tupleStore][Number(index)];
  }
  Base_Tuple.prototype.list=function list(){
    return [ ...this[$$tupleStore] ] ;
  }
  Base_Tuple.prototype.extend=function extend(collection){
    const res=validateCollectionArgs(arguments, {
      count:1,
      validators:[[Array, Tuple, Set]],
      name:'Tuple.extent()'
    })
    if(!res) return false;
    for(let [index, value] of getIterator(collection)){
      this.add(value);
    }
    instanciate_tuple_indexes(this);
    return true;
  }
  Base_Tuple.prototype.contains = function contains(...args){
    if(!len(args)) return true;
    for (let [ index, item ] of args.values()){
      if(isFalse(this.has(item))) return false;
    }
    return true;
  }
  const effectTuple= new Tuple();
  var previousRunningEffectBuild = undefined ;
  var currentRunningEffectBuild = undefined ;
  var ancestorRunningEffect = undefined ;
  function installCurrentRunningEffect(self){
    effectTuple.add(self);
    if(isHouxitBuild(currentRunningEffectBuild)){
      previousRunningEffectBuild = currentRunningEffectBuild;
    }
    currentRunningEffectBuild = self;
  }
  function reinstatePreviousRunningEffect(){
    if(previousRunningEffectBuild) {
      currentRunningEffectBuild = previousRunningEffectBuild;
    }else currentRunningEffectBuild = undefined;
  }
  function getCurrentRunningEffect(binding){
    const self=currentRunningEffectBuild;
    const { name, silently } = binding;
    if(!isHouxitBuild(self)){
      if(!silently) $debug_log(`"${name}()" Adapter method cannot be called outside of a build option widget or function widget body.\n\n"${name}()" may ve ben called in an asynchronous thread from the origin or outside of the build option method/function based widget`);
      return false;
    }
    return self;
  }
  function _createAgent(value, config){
    const response=validateCollectionArgs(arguments, {
      name:'createAgent',
      required:[true, false ],
      min:1,
      max:2,
      validators:[ Any, Object ]
    })
    if(!response) return pass
    const self=getCurrentRunningEffect({
      name:'createAgent'
    })
    if(!self) return [ pass, pass ];
    const parameters = exists(config) ? [ value, config ] : [ value ] ;
    const state = !isToken(value) && !isPrimitive(value) ? stream(...parameters) : token(...parameters);
    return _useAgent_(state);
  }
  function createAgent(value, config){
    return _createAgent(...arguments);
  }
  function deferWatch(getter){
    if(!isPFunction(getter)){
      $debug_log(`deferWatch expects a getter function`);
      return 
    }
  }
  function _pushEffect_(callback=pass){
    let self=this;
    if(!isHouxitBuild(this)){
      self=getCurrentRunningEffect({
        name:"pushEffect"
      });
      if(!isHouxitBuild(self)) return;
    }
    if(!validateCollectionArgs(arguments, {
      max:1,
      validators:[Function],
      name:"pushEffect",
      self:this
    })) return;
    self[$$$operands].dependency.notify();
    return self.__public_model__._deferTick(callback);
  }
  function pushEffect(callback){
    return _pushEffect_.call(this, ...arguments);
  }
  function isSameNodeType(node1, node2){
    if(!node1 instanceof Element && !node2 instanceof Element) return false;
    else if(!node1.nodeType === node2.nodeType) return false;
    else if(!node1.localName === node2.localName) return false;
    return true
  }
  function isEQNode(node1, node2){
    if(!isSameNodeType(node1, node2)) return false;
    else if(!node1.outerHTML === node2.outerHTML) return false;
    else if(!len(node1.attributes) === len(node2.attributes)) return false;
    else if (len(node1.attributes) === len(node2.attributes)){
      const node2Attrs=node2.attributes;
      for(let [key, attr ] of entries(node1.attributes)){
        const { name , value } = attr;
        const { name:node2N, value:node2V } = node2Attrs[key];
        if(!name === node2N && !value === node2V) return false;
      }
    }
    return true;
  }
  function cloneVElement(vnode){
    if(!isHouxitElement(vnode)){
      $debug_log(`cloneVElement() macro expects a houxit virtual node as it's first argument`);
      return;
    }
    return vnode.compiler_options.createElement()
  }
  function getFunctionBoundTarget(fn){
    
  }
  function _makeCloneVerson(value, deep=false){
    let cValue
    if(isHouxitElement(value)) return cloneVElement(value)
    else if(isToken(value)) pass
    else if(isPrimitive(value) ) return value;
    else if(validateType(value, [Array, Set, Tuple])){
      cValue= isArray(value) ? [] : isSet(value) ? new Set() : isTuple(value) ? new Tuple() : isObject(value) ? new value.__proto__.constructor() : undefined;
      let index = 0 ;
      for(let [ prop, item] of getIterator(value)){
        item =  _makeCloneVerson(item, deep) ;
        value[ validateType(value, [Set, Tuple]) ? "add" : "push" ]( item );
        index ++
      }
      return cValue;
    }else if(isFunction(value)){
      if(isClass(value)){
        cValue = Function('Base', `return class ${value.name || '' } extends Base{
          constructor(...args){
            super(...args);
          }
        }`)(value);
      }else {
        cValue=Proxy(fn, {
          apply(target, thisArg, args ){
            return Reflect.apply(...arguments);
          }
        });
      }
    }else if(isPObject(value)) cValue = deep ? structuredClone(value) : assign({}, value);
    return cValue;
  }
  function deepEqualityCheck(val1, val2){
    val1=unwrap(val1)
    val2=unwrap(val2)
    if(validateType(val1, None) && validateType(val2, None)){
      if(isEmptyStr(val1) && isEmptyStr(val2)) return true;
      else if(isUndefined(val1) && isUndefined(val2)) return true;
      else if(val1 === null && val2 === null) return true;
      else return false;
    }
    if(!getType(val1) === getType(val2)) return false;
    if(isPrimitive(val1) && isPrimitive(val2)) return val1 === val2;
    if(isCollection(val1)){
      if(!len(val1) === len(val2)) return false;
      val2=validateType(val2, [Set, Tuple]) ? arrSet(val2) : val2;
      for(const [ key, value] of val1.entries()){
        if(isFalse(deepEqualityCheck(value, val2[key]))) return false;
      }
      return true;
    }else if(isMap(val1)){
      if(!len(val1) === len(val2)) return false;
      let index=0;
      for(const [ key, value] of val1.entries()){
        const val2Key=val2.keys().next();
        if(isFalse(deepEqualityCheck(key, val2Key))) return false;
        const value2=val2.values().next();
        if(isFalse(deepEqualityCheck(val2, value2))) return false;
        index++;
      }
      return true;
    }else if(isObject(val1)){
      if(!len(val1) === len(val2)) return false;
      let index=0;
      for(const [ key, value] of entries(val1)){
        if(isFalse(key === keys(val2)[index])) return false;
        if(isFalse(deepEqualityCheck(value, val2[key]))) return false;
        index++;
      }
      return true
    }
    return JSON.stringify(val1) === JSON.stringify(val2);
  }
  function _$compiler_engine_hydrator(){
    global=createObj('Houxit');
    if(inBrowserCompiler) window.Houxit=global;
  }
  const exceptions=createObj('Exceptions',{
    SE:(self)=>$debug_log(``, self, isHouxitBuild(self))
  });
  const ConfigValidator={
    debug:Boolean, 
    forwardSlot:Boolean, 
    forwardAttrs:Boolean, 
    delimiters:Array, 
    scopedStyleSheet:Boolean, 
    isAsync:Boolean,
    isCustomElement:Boolean,
    useSSRCompiler:Boolean
  }
  class FrameworkCompilerOptions{
    debug=true
    forwardSlot=true
    forwardAttrs=true
    delimiters=['{{','}}']
    scopedStyleSheet=true
    isAsync=false
    isCustomElement=false
    useSSRCompiler=false
  }
  const isGlobalConfig=config=>config instanceof FrameworkCompilerOptions;
  const Compiler_Config_Options= new FrameworkCompilerOptions()
  class HouxitCompilerSetup{
    debug(debug){
      if(isFalse(mapSettingCheck(this, 'debug', debug))) return this;
      Compiler_Config_Options.debug=debug
    }
    forwardAttrs(forwardAttrs){
      if(isFalse(mapSettingCheck(this, 'forwardAttrs', forwardAttrs))) return this;
      Compiler_Config_Options.forwardAttrs=forwardAttrs
    }
    forwardSlot(forwardSlot){
      if(isFalse(mapSettingCheck(this, 'forwardSlot', forwardSlot))) return this;
      Compiler_Config_Options.forwardSlot=forwardSlot
    }
    delimiters(delimiters){
      if(isFalse(mapSettingCheck(this, 'delimiters', delimiters))) return this;
      Compiler_Config_Options.delimiters=delimiters
    }
    scopedStyleSheet(scopedStyleSheet){
      if(isFalse(mapSettingCheck(this, 'scopedStyleSheet', scopedStyleSheet))) return this;
      Compiler_Config_Options.scopedStyleSheet=scopedStyleSheet
    }
    isAsync(isAsync){
      if(isFalse(mapSettingCheck(this, 'isAsync', isAsync))) return this;
      Compiler_Config_Options.isAsync=isAsync
    }
    isCustomElement(isCustomElement){
      if(isFalse(mapSettingCheck(this, 'isCustomElement', isCustomElement))) return this;
      Compiler_Config_Options.isCustomElement=isCustomElement;
    }
    useSSRCompiler(useSSRCompiler){
      if(isFalse(mapSettingCheck(this, 'useSSRCompiler', useSSRCompiler ))) return this;
      Compiler_Config_Options.useSSRCompiler=useSSRCompiler
    }
  }
  function isXtruct(func) {
    try {
      new func();
      return true;
    } catch (error) {
      return false;
    }
  }
  const reverseRegex=new RegExp(`(${escapeRegExp("*****")}[\\d])`, 'g');
  function ArgsExtractor(source, funcN, config={}){
    const orgFName=funcN;
    config=Object.assign({
      global:false,
      block:"declare"
    }, config);
    const { global, block } = config;
    if(hasSpecialCharacters(funcN)) funcN=escapeRegExp(funcN);
    let flags="mu"
    if(global) flags+"g";
    const fxRegex=new RegExp(`(${funcN} *${`\\(`})([\\S\\s]*)`, flags);
    const drafts=[];
    let draftCount=0;
    source=source.replace(stringsMonitorRegex, (match, rex, roll)=>{
      drafts.push(match);
      let dataDraft="*****"+draftCount;
      draftCount++;
      return dataDraft;
    });
    let [ match, context, rest ] =source.match(fxRegex);
    rest=rest.replace(reverseRegex, (match, rex, roll)=> drafts[Number(rex.match(/\d/))]);
    let value="";
    let callCount=0;
    let opQ="";
    let compile=true;
    const isQo=val=>/['"]/.test(val);
    for(let [ key, val ] of entries(rest)){
      value = value + val;
      if(isQo(val)){
        if(!opQ){
          compile=false;
          opQ=val;
        }
        if(val === opQ){
          opQ="";
          compile=true;
        }
      }
      if(!compile) continue;
      if(val === "(") callCount++;
      else if(val === ")"){
        if(callCount === 0 ) break;
        else callCount--;
      }
    }
    return {
      name:orgFName,
      content:value.slice(0, -1),
      source:orgFName+"("+value,
    }
  }
  function validateType(val, type){
    if(isFunction(type) ){
      if(new Set(DataFunctionMap).has(type)){
        return getType(val) === getType(type()) && !isNull(val)
      }else if(new Set(XtructDataCallableTypes).has(type)){
        let res=false;
         try {
           res=getType(val) === getType(new type()) && !isNull(val);
         }catch(err){
           return res;
         }
         return res;
      }else if(isDomSpecialConstructor(type) || isClass(type) || isXtruct(type) ) {
        let res=false;
        try {
          res=val instanceof type;
        }catch(err){
          return res;
        }
        return res;
      }
    }else if(isArray(type)){
      let res=false;
      for(let typeF of type.values()){
        if(!isFunction(typeF) && !isBaseType(typeF) && !isNull(typeF) && !isEmptyStr(typeF)){
          $debug_log(`type check value is not a function or class constructor type\n\n found "${typeF}"`); 
          return false;
        }
        res=validateType(val, typeF);
        if(isTrue(res)) {
          return res;
          break;
        }
      }
      return res;
    }else if(isBaseType(type)){
      if(type instanceof AnyType) return !validateType(val , None );
      else if(type instanceof NoneType) return validateType(val, [undefined, null, ""]);
      let res;
      if(type.validator) res=type.validator(val);
      if(!isTrue(res) && type.type ) res=validateType(val, type.type);
      return res;
    }else if(new Set([undefined, null, "" ]).has(type)) return isString(val) ? isEmptyStr(val) : isNull(val);
    return false;
  }
  function Signal(name, callback, options){
    this.name=name;
    this.receiverForm=new Set()
    this.depend=callback
  }
  Signal.prototype.fire=function fire(...params){
    this.depend( ...params)
  }
  const isSignal=val=>validateType(val, Signal);
  function createTextElement(self, text, hx__Element, isRerender){
    return _createTextElement(self, text, hx__Element, isRerender);
  }
  function _createTextElement(self, text, hx__Element, isRerender){
    if(!isPrimitive(text)){
      $debug_log(`cannot create a TEXT_NODE element from a none primitive value.......\n\n"${text}" value`, self);
      text = "";
    }
    let hasSkip;
    let node;
    let is_hyperscript=hx__Element.is_hyperscript;
    const initializedRender=self[$$$operands]?.initializedRender;
    if(!initializedRender) node=document.createTextNode(text);
    if(hasSpecialCharacters(text)  && !is_hyperscript) {
      let [subscribers, textContent] = effectDependencyTracking(self, function(){
        return resolveAccessor(self, text, hx__Element);
      })
      if(!initializedRender) node.textContent=textContent
      else {
        node=textContent;
        hx__Element.$element=textContent;
      }
      hx__Element.PATCH_FLAGS.add('ELEMENT_CHILDREN');
      hx__Element.render_tracked=exists(len(subscribers));
      hx__Element.VNodeManager.patchFlags.isHoisted=true
    }
    return node ;
  }
  const DEPENDENCY_FLAGS={
    [16]:'CLASS',
    [32]:'STYLE',
    [48]:'ATTRS',
    [64]:'EVENTS',
    [80]:'PROPS',
    [96]:'TEXT',
    [112]:'SLOTS',
    [128]:'CHILDREN'
  }
  const flagNames="CLASS,STYLE,ATTRS,EVENTS,PROPS,TEXT,SLOTS,CHILDREN".split(",");
  class BasevNodeClass{
    constructor(type, props, children, configOptions={}){
      this.type=type
      if(validHouxitWidget(type)) this.GeneticProvider=type;
      this.props=isPObject(props) ? props : {} ;
      if(hasOwn(this.props, 'key')){
        this.key=this.props.key;
      }
      this.children= exists(children) && !isArray(children) ? [ children ] : exists(children) ? children : null;
      let { subs, ctx, is_hyperscript, key, config, self, flags=[] } = configOptions;
      this.ctx=ctx;
      for(let fl of flags.values()){
        this.subscriptions[DEPENDENCY_FLAGS[fl]]=DEPENDENCY_FLAGS[fl].toString(2);
      }
      this.prototype_=type
    }
    type=null
    props={}
    compiler=null
    prototype_=null
    children=null
    key=null
    config=null
    _is_VNodeClass=true
    filesFilter={
      $Events:null,
      $Model_Event:null,
      $Notifiers:null
    }
    rawChildren=null
    rawProps=null
    children=null
    subscriptions={}
    dependencies=[]
    hx__Element=null
    is_hyperscript=false
    GeneticProvider=null
  }
  class vNodeClass extends BasevNodeClass{
    constructor(type, propsOrChildren, childrenOrProps, config){
      super(...arguments);
    }
  }
  const isRenderVNodeClass=vnode=>vnode instanceof vNodeClass ;
  class HouxitElement{
    constructor(){
      if (isNativeElement(this.$element)) define(this.$element, 'houxitElement',{
        value:this, 
        enumerable, 
        configurable
      });
    }
    base_element=undefined
    get_parent_element(){
      return this.$element.parentElement.houxitElement
    }
    prototype_=undefined
    render_tracked=false
    $element=undefined
    slot_name=undefined
    widget_instance=undefined
    updated_hook=pass
    destroyed_hook=pass
    _vnode_key=undefined
    patch_tracks=new Set()
    conditional_record={ src:undefined, res:false, passed:false}
    compiler_options=createObj('compiler_options', { context:createObj('context')});
    VNodeManager=createObj('VNodeManager', { 
      updateFlags:{ 
        active:false
      },
      GeneticProvider:undefined,
      vNodeClass:undefined,
      factoryCompiler:pass,
      LifeCycleHooks:{
        init_hook:new Tuple(),
        created_hook:new Tuple(),
        mounted_hook:new Tuple(),
        updated_hook:new Tuple(),
        destroyed_hook:new Tuple()
      },
      patchFlags:{
        isHoisted:false,
        subscriptions:new Tuple(),
        PropFlags:new Tuple(),
        shapeProps:{}
      },
      dexTransform:{
        sourcesArray:[],
        syntaxArray:[]
      }
    })
    VN_Tree={}
    hx_hash_=undefined
    is_hyperscript=false
    IS_RENDERLESS=false
    LabContext=undefined
    mounted=false
    isLoopWrappRenderer=false
    NodeList=new Tuple()
    PATCH_FLAGS=new Set()
  }
  function isTagMatch(open, close){//match syntax for a $$for opening and closing tags
    let res=false;
    const tags=[['[',']'],['{','}'],['(',')'],['<','>']];
    for(const items of tags.values()){
      if(items.includes(open) || items.includes(close)){
        if(open === items[0] && close === items[1] || open === items[1] && close === items[0]) {
          return true;
        }
      }
    }
    return res;
  }
  function tagMachErr(self, metrics){
    let [ op, cl, p1 ] = metrics;
    if(!isTagMatch(op, cl) ) {
      $debug_log(`Unmaching tags for "for" directive loop data keys mapping\n opening tag does not match a closing tag\n\n found ${p1} Unmaching`, self, true);
      return false;
    }
  }
  const keyValueRegex=/((\(|\<)(.*?)?(\)|\>))[ ]+([of|in]+)[ ]+([.\w\$\[\]\(\) \S]+)/;
  const DestructuredRegex=/((\{|\[)(.*?[ ]*)*?(\}|\]))[ ]+([of|in]+)[ ]+([\w.\$\[\]\(\) \S]+)/;
  const valueRegex=/([\w\$]+)[ ]+([of|in]+)[ ]+([\w.\-\[\]\$\(\) \S]+)/;
  const iterableRegex=/^([.\w\$\[\]\(\) \S]+)$/
  const interRegex=/[ ]*(\{|\[)(.*?)(\}|\])[ ]/;
  function get_Loop_Data(self, str, isBlock=false){
    const Loop_Data={}
    if(keyValueRegex.test(str)){
      str=str.replace(keyValueRegex,(match, p1, op, value, cl, type, obj)=>{
        if(isFalse(tagMachErr(self, [ op, cl, p1]))) return ;
        let item , index , key ;
        if(interRegex.test(value)){
          let destrV=value.replace(interRegex, (match, opn, vvv, cls )=>{
            if(isFalse(tagMachErr(self, [ opn, cls, vvv]))) return ''
            item = match
            return ''
          })
          let [ em, keyX, indexX ] = destrV.split(' ').join('').split(',');
          key=keyX;
          index=indexX;
        }else{
          let [ itemX, keyX, indexX ] = value.split(' ').join('').split(',');
          key=keyX;
          item=itemX;
          index=indexX;
        }
        if( value ) Loop_Data.value=item;
        if( key ) Loop_Data.key=key;
        if( index ) Loop_Data.index=index;
        define(Loop_Data, 'type', {value:type});
        define(Loop_Data, 'obj',{value:obj});
        return match;
      })
    }else if(DestructuredRegex.test(str)){
      str=str.replace(DestructuredRegex, (match, structs,  op, items, cl, type, value)=>{
        if(!isTagMatch(op, cl) ) {
          $debug_log(`Unmaching tags for "for" ${isBlock ? 'block' : 'directive'} loop data keys mapping\n opening tag does not match a closing tag\n\n found at${match}`, self, true);
          return;
        }
        Loop_Data.obj=value;
        Loop_Data.type=type;
        Loop_Data.value=structs;
        return match;
      })
    }else if(valueRegex.test(str)){
      str=str.replace(valueRegex,(match, value, type, obj)=>{
        Loop_Data.value=value;
        Loop_Data.type=type;
        Loop_Data.obj=obj;
        return match;
      })
    }else if(str.match(iterableRegex)){
      str=str.replace(iterableRegex,(match, value)=>{
        Loop_Data.obj=value;
      })
    }else{
      $debug_log(`Usupported Loop format in 'for' ${isBlock ? 'block' : 'directive'}\n\n"${str}" loop syntax is invalid or is not recognised`, self, true);
      return;
    }
    return Loop_Data
  }
  function For_Loop(self, attr, hx__Element, isBlock=false){
    const data=get_Loop_Data(self, attr, isBlock);
    if(!data) return ;
    let dataObject;
    try{
      dataObject=_$runModelBind(self, data.obj, hx__Element);
      dataObject=unwrap(dataObject);
    }catch(error){
      $debug_log(`Trouble accessing '${data.obj}' object for for loop\n\nnot found on instance or is undefined\n\n${error}`, self, true);
      return;
    }
    if(!isIterable(dataObject) && !isNumber(dataObject)){
      $debug_log(`Undefined scope for for, \n\n${data.obj} not iterable`, self, true);
      return ;
    }
    const Valid_LoopType="of,in";
    if(data.type && !_mapValue(Valid_LoopType, data.type)){
      $debug_log(`((Iteration issue))\n\n"${data.type}" is not an iterator\n "of" or "in" only supported by Houxit`, self, true);
      return;
    }
    return { 
      obj:dataObject, 
      keyName:data.key?.trim(), 
      valToken:data.value?.trim(), 
      loopType:data.type?.trim(), 
      token:data.obj, 
      index:data.index?.trim()
    }
  }
  function NormalizeDirGarbage(props){
    let has_conditional=false;
    let has_loop=false
    let dataRecord={};
    let index=0
    
    for(const [key, val] of entries(props)){
      if(!has_conditional) has_conditional=isIfKey(key) || isElseKey(key) || isElseIfKey(key) ;
      if(isIfKey(key)) assign(dataRecord, {
        ifIndex:index,
        hasIf:true,
        getIf:val,
        ifKey:key
      });
      if(isElseKey(key)) assign(dataRecord, {
        elseIndex:index,
        hasElse:true,
        getElse:val,
        elseKey:key
      });
      if(isElseIfKey(key)) assign(dataRecord, {
        elseIfIndex:index,
        getElseIf:val,
        hasElseIf:true,
        elseIfKey:key
      });
      if(isForKey(key)) {
        has_loop=true;
        assign(dataRecord, {
          forIndex:index,
          hasFor:true,
          getFor:val,
          forKey:key
        });
      }
      index++
    }
    assign(dataRecord, {
      hasIFWithFor:has_conditional && has_loop,
      has_conditional
    });
    return dataRecord;
  }
  const isRenderlessElement=vnode=> isHouxitElement(vnode) && isTrue(vnode.IS_RENDERLESS);
  function hasMultiConditionals(hasIf, hasElseIf, hasElse){
    let count = 0;
    for (let value of [ ...arguments ].values()){
      if(value) count++;
    }
    return count;
  }
  function _$Conditional_Dir_Resolver(self, vnode, hx__Element, siblings, ctx, recordPatch, isRerender){
    const [ hasIf, hasElseIf , hasElse ] = recordPatch[3];
    const condCount=hasMultiConditionals(hasIf, hasElse, hasElseIf);
    if(condCount > 1){
      $debug_log(`((directive))>.....Numerous Conditional directive found on element`, self, true);
      return ;
    }
    const GIC=new _$Directive_$Conditional$_Renderer(self, vnode, hx__Element, siblings, recordPatch, isRerender, ctx);
    if(hasIf) return GIC.Panel_If_Block();
    else if(hasElseIf || hasElse) return GIC.Panel_elseif_Block(hasElse);
  }
  const isConditionalVnode=(vnode, cond)=> isHouxitElement(vnode) ? vnode.conditional_record.src === cond : false;
  class _$Directive_$Conditional$_Renderer{
    options=undefined
    constructor(self, vnode, hx__Element, siblings, recordPatch, isRerender, ctx){
      let { type, props, children, key } = vnode;
      const [ hasEx , propValue , srcKey ]=recordPatch;
      const LabContext=hx__Element ? assign({}, hx__Element.LabContext) : {};
      ctx=assign(assign({}, ctx), LabContext);
      assign(this, {
        propValue, 
        srcKey, 
        self,
        props,
        vnode,
        hx__Element,
        siblings,
        ctx,
        createElement:()=>createHouxitElement(vnode, self, false, hx__Element?.LabContext, siblings, ctx, isRerender,  hx__Element)
      });
    };
    Panel_If_Block(){
      const { self, propValue, hx__Element, vnode, siblings, srcKey, ctx } = this ;
      let data=_$runModelBind(self, propValue, ctx);
      delete vnode.props[srcKey];
      if(!data) return $IfElseDirRenderLess.call(this, data, 'if');
      const node=this.createElement();
      assign(node.conditional_record, {
        src:'if',
        res:true,
        passed:true
      });
      if(hx__Element) hx__Element.NodeList.add(node);
      return node;
    } 
    Panel_elseif_Block(isElse=false){
      const block=isElse ? 'else' : 'else-if' ;
      const { self, propValue, hx__Element, siblings, vnode, srcKey, ctx } = this
      let data= isElse ? false : _$runModelBind(self, propValue, ctx);
      const previous=siblings[len(siblings)-1];
      let passed;
      
      if(previous) passed=previous.conditional_record.passed;
      delete vnode.props[srcKey];
      let node;
      if(!len(siblings) || !previous || (!isConditionalVnode(previous, 'if') && !isConditionalVnode(previous, 'else-if'))){
        $debug_log(`The "$$${block}" conditional rendering directive block expects a preceding "$$if" or "$$else-if" directive element\n\nMay return unexpected result\ndid you mean "$$if" directive instead?\n at>>>>>`, self, true);
        node = this.createElement();
      }else if(!passed && isRenderlessElement(previous) && !(previous.conditional_record.res)){
        data=isElse || data;
        if(data){
          node = this.createElement();
          assign(node.conditional_record, {
            src:block,
            res:true,
            passed:data
          });
        }else node = $IfElseDirRenderLess.call(this, data, block, previous );
      }else node = $IfElseDirRenderLess.call(this, data, block, previous);
      if(hx__Element) hx__Element.NodeList.add(node);
      return node;
    }
  }
  function $IfElseDirRenderLess( data, block, previous){
    const hx__Element= new HouxitRenderlessElement();
    assign(hx__Element.conditional_record, {
      src:block,
      res:false,
      passed:previous ? previous.conditional_record.passed : false ,
    });
    return hx__Element;
  }
  function has_Intersect_Prop(obj1, obj2 ){
    let res=false;
    for(const [key, value] of entries(obj1)){
      if(isArray(obj1)) res=_mapValue(obj2, value);
      else if(isPObject(obj1)) res=_mapValue(obj2, key);
      if(isTrue(res)) break;
    }
    return res;
  }
  function destructWarn(ref, object, self){
    if(ref && objectDestructureRegex.test(ref) && !isObject(object)){
      $debug_log(`Invalid object destructuring from a none object value\n\nillegal destructuring found at "${object}" on $$*** directive definition\nTarget value is not an object`, self, true);
      return false;
    }else if(ref && arrayDestructureRegex.test(ref) && !isArray(object)){
      $debug_log(`Invalid array destructuring from a none array value\n\nillegal destructuring found at "${object}" on $$*** directive definition\nTarget value is not an array iterable`, self, true);
      return false;
    }
    return true;
  }
  function _$Directive_$For_Loop$_Renderer(self, vNode, hx__Element, siblings, ctx, renderPatch, saveGarbageContent){
    const [ check, propValue , srcKey ] = renderPatch;
    const isRerender=!self[$$$operands].initializedRender;
    let { obj, keyName, valToken, loopType, ref, index }=For_Loop(self, propValue, hx__Element) || {};
    delete vNode.props[srcKey];
    if(loopType === 'in' && valToken && ( validateType(obj, [ Object, Collections]))){
      $warn(`((Warning))\n\nWe recommend agaimst the use of the 'for...in' loops type since it iterates over all of the object's enumerable and non-symbol properties \n\nLeaving the value data as "undefined"\nUse "for...of" instead......`, self);
      $warn(`Many JavaScript style guides and linters recommend against the use of 'for...in', because it iterates over the entire prototype chain which is rarely what one wants, and may be a confusion with the more widely-used "for...of" loop\n\nIt's included in Houxit for completeness.`, self);
    }
    const NodeList=[];
    let league=[];
    iterate(obj, loopType).test(function(value, key, index){
      ctx=assign({}, ctx);
      if(!destructWarn(valToken, obj, self)) return;
      if(isNumber(obj)){
        if(valToken) ctx[valToken]=value+1;
        if(keyName) ctx[keyName]=valToken ? value : value+1;
        if(index) ctx[index]=index;
        renderForConditional(league, self,  vNode, ctx, NodeList, key, value, hx__Element, saveGarbageContent, siblings);
      }else{
        const fallprops={};
        if(valToken) fallprops.valToken=valToken;
        if(keyName) fallprops.keyName=keyName;
        if(index) fallprops.index=index;
        ctx=mapCTXFallProps(self, {
          valToken, 
          keyName,
          index
        }, { 
          ky:key, 
          vl:value,
          count:index
        }, ctx);
        renderForConditional(league, self, vNode, ctx, NodeList, index, value, hx__Element, saveGarbageContent, siblings);
      }
    });
    const lastElement=NodeList[len(NodeList)-1];
    const wrapper= new HouxitFragmentElement(NodeList, self, hx__Element, isRerender,  league);
    if(lastElement) assign(wrapper.conditional_record, lastElement.conditional_record);
    wrapper.isLoopWrappRenderer=true;
    if(hx__Element) hx__Element.NodeList.add(wrapper);
    return wrapper
  }
  function mapCTXFallProps(self, Loop_Data, it_Data, ctx){
    const { valToken, keyName, index} = Loop_Data;
    const { ky, vl, count } = it_Data;
    if(keyName && isDestructureSyntax(keyName)){
      if(!(destructWarn(keyName, valToken, self))) return ctx;
      ctx=smartDextCtxMerging(hx__Element.LabContext, {
        [$$dexTransformKey]:{
          sourcesArray:[ valToken ],
          syntaxArray:[ value ]
        }
      });
    }else{
      if(valToken) ctx[valToken]=vl;
      if(keyName) ctx[keyName]=valToken ? ky : vl;
      if(index) ctx[index]=count;
    }
    return assign({}, ctx);
  }
  function renderForConditional(league, self, vnode, ctx, NodeList, count, vl, hx__Element, saveGarbageContent, siblings){
    if(hx__Element?.LabContext) ctx=assign(assign({}, hx__Element.LabContext), ctx);
    let key=vnode.key || count;
    const { has_conditional } = saveGarbageContent;
    const loopNode=createHouxitElement(vnode, self, false, ctx,  has_conditional && count === 0 ? siblings : NodeList, null, null, hx__Element);
    if(loopNode) {
      NodeList.push(loopNode);
      key = validateType(key, [String, Number] ) ? key : count;
      if(hasOwn(league, key)){
        $warn(`keyed element seemed to have been dublicated\n\nCheck for possible duplicates in special key props`, self, true);
        return;
      }
      league.push(key);
    }
  }
  function keyIndex(obj, key){
    return isObject(obj) ? keys(obj).indexOf(key) : validateType(obj, [Array, Set, Number]) ? Number(key) : isMap(obj) ? obj.keys().indexOf(key) : NaN;
  }
  function VNodeManager(self, vnode, element, hx__Element, siblings, saveGarbageContent, isRerender, ctx){
    const is_hyperscript=vnode.is_hyperscript;
    const { type, props, children }=vnode;
    const { hasIFWithFor , ifIndex , elseIndex, elseIfIndex, forIndex}=saveGarbageContent
    const {getIf, hasIf, hasElse, getElse, hasElseIf, getElseIf, hasFor, getFor } = saveGarbageContent;
    const { ifKey, elseKey, elseIfKey, forKey } = saveGarbageContent;
    const getValue=hasIf ? getIf : hasElse ? getElse : hasElseIf ? getElseIf : hasFor ? getFor : null ;
    const getEx=hasIf || hasElse || hasElseIf;
    const getKey= hasIf ? ifKey : hasElse ? elseKey : hasElseIf ? elseIfKey : hasFor ? forKey : null ;
    const conditionalArgs= [getEx, getValue, getKey, [ hasIf, hasElseIf, hasElse ]];
    if(hasElse && hasFor && elseIndex > forIndex){
      $debug_log(`A "$$for" directive loop cannot take precedence in the presence of an "$$else" condition directive\m\ndirective scoping error`, self, true);
      return;
    }
    vnode = assign(h(vnode.type), vnode);
    vnode.props=assign({}, vnode.props);
    if((hasIFWithFor && (hasIf ? ifIndex : hasElse ? elseIndex : hasElseIf ? elseIfIndex : -1 ) < forIndex) ) {
      return _$Conditional_Dir_Resolver(self, vnode,  hx__Element, siblings, ctx, conditionalArgs, isRerender );
    }else if(hasFor) return _$Directive_$For_Loop$_Renderer(self, vnode, hx__Element, siblings, ctx,  [getEx, getFor, forKey ], saveGarbageContent );
    else if(getEx) return _$Conditional_Dir_Resolver(self, vnode, hx__Element, siblings, ctx, conditionalArgs, isRerender );
    return createHouxitElement(vnode, self, is_hyperscript, ctx, siblings,null, isRerender, hx__Element );
  }
  function callSetHooks(self, hooks, element, bindObj={}, hx__Element, Name="" ){
    function Callback(){
      for(let hook of hooks.values()){
        if(isPass(hook)) continue
        try{
          const bindings = hook[lifeCiycleBinding];
          const instance=isHouxitNativeElement(hx__Element) ? element : self.__public_model__;
          hook.call(self.__public_model__, instance, bindings );
        }catch(err){
          $debug_log("("+Name.slice(0, -5)+") >>\nUnresolved problem during the call of the "+Name.slice(0, -5) +" hook of custom "+hook.dirName||""+" directive\n",  self, true);
          $debug_log(err, self);
          return element;
        }
      }
      return element;
    }
    return Callback();
  }
  function HouxitElementLifeCircleHooks(self, element, hx__Element){
    const args=(hookN)=> [ self, hx__Element.VNodeManager.LifeCycleHooks[hookN], element, self.__public_model__, hx__Element, hookN ];
    if(len(hx__Element.VNodeManager.LifeCycleHooks.created_hook)) callSetHooks( ...args('created_hook') );
    if(len(hx__Element.VNodeManager.LifeCycleHooks.mounted_hook)){
      self[$$$compiler].whenMountedHooks.add(function(){
        whenMounted(self, element, ()=>{
          callSetHooks( ...args('mounted_hook') );
        })
      })
    }
    iterate(["updated_hook", "destroyed_hook"]).test((hookName)=>{
      if(len(hx__Element.VNodeManager.LifeCycleHooks[hookName])) $assignToHookFN( ...args(hookName) );
    });
    return  element;
  }
  function $assignToHookFN(self, hookSet, element, model, hx__Element, hookN){
    hx__Element[hookN]=function hook(){
      callSetHooks(self, hookSet, element, self.__public_model__, hx__Element, hookN);
    }
  }
  function resolveElementToken(self, ref, element, hx__Element){
    try{
      whenMounted(self, element, ()=>{
        ref[ref[refInternalEffectKey].accessor]=element;
      });
    }catch(err){
      $debug_log(`(ref) >>\nUresolved problem when resolving the special ref prop>>>\n\n${err}`, self, true);
      return;
    }
  }
  const frameDirectives="$$for,$$if,$$else-if,$$else";
  function createHouxitElement(vnode, self, is_hyperscript, ctx, siblings, ssc, isRerender=false, hx__Element){
    ctx=smartDextCtxMerging(assign({}, ctx || {}), ssc || {});
    ssc=null;
    const saveGarbageContent = NormalizeDirGarbage(vnode.props||{});
    const initializedRender=self[$$$operands]?.initializedRender;
    const { has_conditional, hasFor } = saveGarbageContent;
    const hasDir=( hasFor || has_conditional );
    let ELEMENT;
    const { prototype_ } = vnode;
    const args=[vnode, self, is_hyperscript, ctx, siblings, ssc, isRerender, hx__Element];
    if(!is_hyperscript && hasDir ) ELEMENT = VNodeManager(self, vnode, null, hx__Element, siblings, saveGarbageContent, isRerender, ctx);
    else if(validHouxitWidget(prototype_)){
      if(builtinValidWidget(prototype_, 'hx:self') && isSelfRecursiveWidget(self)) ELEMENT = new HouxitRenderlessElement();
      else ELEMENT = new HouxitWidgetElement(...args);
    }else ELEMENT = new  HouxitNativeElement(...args);
    if(ELEMENT) ELEMENT.compiler_options.createElement=()=>createHouxitElement(...arguments);
    return ELEMENT;
  }
  function translateVElementNormalizer(virtualElement, self){
  }
  function smartDextCtxMerging(context, ssc){
    if(!(context || ssc)) return assign({}, context || ssc || {}); 
    context=assign({}, context);
    if(hasOwn(ssc, $$dexTransformKey)){
      if(!hasOwn(context, $$dexTransformKey) && hasOwn(ssc, $$dexTransformKey)) context[$$dexTransformKey]={
          sourcesArray:[],
          syntaxArray:[]
        }
      else if(hasOwn(context, $$dexTransformKey)) context[$$dexTransformKey]=assign({}, context[$$dexTransformKey]);
      context[$$dexTransformKey].syntaxArray=arrSet(new Set([ ...context[$$dexTransformKey].syntaxArray, ...ssc[$$dexTransformKey].syntaxArray ]));
      context[$$dexTransformKey].sourcesArray=arrSet(new Set([ ...context[$$dexTransformKey].sourcesArray, ...ssc[$$dexTransformKey].sourcesArray ]));
      ssc=assign({}, ssc);
      delete ssc[$$dexTransformKey];
    }
    context=assign(context, ssc);
    return context;
  }
  function HouxitTemplateGenerators(vnode, self, is_hyperscript=false, ctx, siblings, ssc, isRerender=false, hx__Element, isWidget=false){
    this.VN_Tree.KEYS_INDEXES=keys;
    this.VN_Tree.LEAGUE_TREE={};
    this.VNodeManager.vNodeClass=vnode;
    is_hyperscript=vnode.is_hyperscript;
    this.is_hyperscript=is_hyperscript;
    const initializedRender=self[$$$operands]?.initializedRender;
    const slotBindings=hx__Element?.VNodeManager.slotBindings;
    if(slotBindings) this.VNodeManager.slotBindings=slotBindings;
    let { type, props, children, key } = vnode;
    ctx=smartDextCtxMerging(ctx || {}, ssc || {});
    this.LabContext=smartDextCtxMerging(this.LabContext, ctx);
    vnode.hx__Element=this;
    if(isWidget) this.VNodeManager.rawChildren=()=> vnode.rawChildren;
    bufferDirSetups(self, props, this);
    const element=generateTemplateElement(vnode, self, this, siblings, isRerender);
    if(!initializedRender && isHouxitNativeElement(this)) HouxitElementLifeCircleHooks(self, element, this);
    this.$element=element;
    if(!initializedRender){
      if(self && (isNull(self[$$$core].posixVNode) || isElementType(this.$element, 'slot')) && IS_ELEMENT_NODE(this.$element)) {
        self[$$$core].posixVNode=this.$element;
      }
      // if(!isRenderlessElement(this) && hasProp( isHouxitWidgetElement(this) ?  this.widget_instance[$$$ownProperties] : this.compiler_options, 'ref_$$Prop')){
      //   resolveElementToken(self, isHouxitWidgetElement(this) ? this.widget_instance[$$$ownProperties]['ref_$$Prop']  : this.compiler_options['ref_$$Prop'], isHouxitWidgetElement(this) ? this.widget_instance : this.$element, this );
      // }
    }
  }
  class HouxitNativeElement extends HouxitElement{
    constructor(vnode, self, is_hyperscript=false, ctx, siblings, ssc, isRerender=false, hx__Element){
      super();
      HouxitTemplateGenerators.call(this, ...arguments);
      this.prototype_=vnode.type;
    }
  }
  class HouxitWidgetElement extends HouxitElement{
    constructor(vnode, self, is_hyperscript=false, ctx, siblings, ssc, isRerender=false, hx__Element){
      super(...arguments);
      HouxitTemplateGenerators.call(this, ...arguments, true);
      this.prototype_=vnode.GeneticProvider;
    }
  }
  class HouxitFragmentElement extends HouxitElement{
    constructor(vnodes=[], self, hx__Element, isRerender, keys){
      super();
      if(keys){
        this.VN_Tree.KEYS_INDEXES=keys;
        this.VN_Tree.LEAGUE_TREE={};
      }
      if(!isHouxitBuild(self)) self=null;
      vnodes=!isArray(vnodes) ? [vnodes] : vnodes;;
      let index=0;
      const fragment = _createFragment();
      for(let [ key, node ] of vnodes.entries()){
        if(isCustomElement(node)) {
          this.NodeList.add(node)
          fragment.append(node);
          node=null;
        }else if(isHouxitElement(node)){
          if(!isBuiltinPortalWidget(node.widget_instance)) this.NodeList.add(node);
          else node = null;
        }
        if(node) {
          fragment.append(node.$element);
          if(index === 0) this.posixStart=node;
          if(index === len(vnodes)-1) this.posixEnd=node;
          if(keys) this.VN_Tree.LEAGUE_TREE[this.VN_Tree.KEYS_INDEXES[key]]=node;
          index ++;
        }
      }
      this.$element=fragment;
    }
    forEach(callback){
      for(let [ index, element ] of this.NodeList.entries()){
        if(isHouxitElement(element)){
          if(isHouxitFragmentElement(element)){
            const arrayEl=[];
            element.forEach((el)=> arrayEl.push(el));
            element=arrayEl;
          }else if(isHouxitWidgetElement(element)){
          }else element=element.$element;
        }
        callback(element, index);
      }
    }
    upload(wrapper){
      this.forEach((element)=>{
        if(isArray(element)){
          const frag=_createFragment()
          element.forEach((el)=>{
            frag.append(el);
          });
          element=frag;
        }
        wrapper.append(element);
      });
    }
    remove(doc){
      this.forEach((element, index)=>{
        if(isArray(element)) element.forEach((el)=>el.remove());
        else element.remove();
      });
      return true;
    }
  }
  class HouxitRenderlessElement extends HouxitFragmentElement{
    constructor(){
      super([]);
      this.IS_RENDERLESS=true;
    }
  }
  class HouxitTextElement extends HouxitElement{
    constructor(text, self, hx__Element, fall, isRerender){
      super();
      const initializedRender=self[$$$operands].initializedRender;
      this.is_hyperscript= hx__Element?.is_hyperscript ;
      if(hx__Element) this.LabContext=assign({}, hx__Element?.LabContext || {});
      if(!this.is_hyperscript && fall ) {
        this.LabContext=smartDextCtxMerging(this.LabContext, fall);
      }
      this.$element=_createTextElement(self, text, this, initializedRender);
      if(this.render_tracked && isHouxitElement(hx__Element)) {
        hx__Element.render_tracked=this.render_tracked
        hx__Element.VNodeManager.patchFlags.isHoisted=true;
      }else if(this.render_tracked && isHouxitBuild(self)){
        self[$$$compiler].hoistedNodelist.add(this);
      }
      this.prototype_=initializedRender ? this.$element : this.$element.textContent;
    }
  }
  function isSameHouxitElement(el1, el2){
    return isS(el1.__proto__.constructor, el2.__proto__.constructor);
  }
  class slotInstanceMap{
    slots=new Object();
    constructor(opts){
      for(let [name, value] of entries(opts)){
        define(this.slots, name, { 
          value, 
          enumerable, 
          configurable
        });
      }
    }
  }
  function bufferDirSetups(self, props, hx__Element){
    if(!props || !props[dir$$__render] || !len(props[dir$$__render])) return;
    for(let dir of props[dir$$__render].values()){
      if(isChar(dir.name) && !isHouxitDirective(dir.name)){
        if(!hasProp(self[$$$register].directives, dir.name) || !self[$$$register].directives[dir.name]){
          $debug_log(`"${dir.name}" is not a registered directive\n`, self, true);
          return;
        }else if(!validateType(self[$$$register].directives[dir.name], [Function, Object])){
          $debug_log(`directive resolved at "${dir.name}" is not a valid directive data value`,self, true);
          return;
        }
        dirMap(self, dir, self[$$$register].directives[dir.name], hx__Element );
        props[dir$$__render].delete(dir);
      }else if(!isString(dir.name)) {
        dirMap(self, dir, dir.name, hx__Element);
        props[dir$$__render].delete(dir);
      }
    }
  }
  function dirMap(self, resolver, dir, hx__Element){
    if(isPObject(dir)){
      for(let [name, hook] of entries(dir)){
        if(_mapValue(directivesHooksMap, name)){
          if(!isPFunction(hook)){
            $debug_log(`"${name} directive hook received at batch is not a function`, self, true);
            return;
          }
          hook.value=resolver.value;
          hook.modifiers=resolver.modifiers
          hx__Element[name+'_hook'].add(hook);
        }
      }
    }else if(isPFunction(dir)){
      dir.value=resolver.value;
      dir.modifiers=resolver.modifiers;
      hx__Element.created_hook.add(dir);
    }
  }
  function __renderSlots__(options){
    if(!validateCollectionArgs(arguments, {
      count:1,
      validators:[[Object, Function]],
      required:[true],
      name:"renderSlots"
    })) return ;//renderimg of slots contents in hyperscript;
    if(isClass(options)){
      $debug_log(`Uresolved function type ---- received at "renderSlots"\n\nSeems to be a "class" instance value type`);
      return;
    }else if(isPFunction(options)) options={
      default:options
    }
    return new slotInstanceMap(options);
  }
  function renderSlots(options){
    return __renderSlots__(...arguments);
  }
  function renderFor(iterable, render){
    if(!isIterable(iterable) && !isNumber(iterable)){
      $debug_log(`Undefined scope for "renderFor" macro, \n\n${iterable} value not iterable`);
      return "";
    }
    const NodeList=[];
    iterable=isPFunction(iterable) ? iterable() : iterable;
    iterate(iterable).test((value, key, index)=> NodeList.push(render(value, key, index)));
    return h(Fragment, NodeList);
  }
  const isHouxitWidgetElement=vnode=> vnode instanceof HouxitWidgetElement;
  function extentDirectiveShorhand(key){
    if(hasAsterisks_bind(key)) return '$$bind:'+key.slice(1);
    else if(hasAt_bind(key)) return '$$on:'+key.slice(1);
    else if(hasAsh_bind(key)) return "$$slot:"+key.slice(1);
    return key;
  }
  function dirExistenceCheck(props, dir){
    let RawMap={ hasDir:false  };
    for(let [key, val] of entries(props)){
      const keyP=key;
      key = extentDirectiveShorhand(key);
      if(key.startsWith(dir)){
        RawMap.hasDir=true;
        RawMap.getDir=val;
        RawMap.getKey=keyP;
        return RawMap
      } 
    }
    return RawMap;
  }
  function prefixRenderBuidProperties(self, props, index, hx__Element){
    const [ key, value ] = props ;
    if(isHouxitElement(hx__Element)) hx__Element.VNodeManager.patchFlags.shapeProps[index]={
      key,
      value
    }
  }
  function _resolveCustomNativeElement(self, nativeArgs, hx__Element){
    let { type, attributes, children }=nativeArgs;
    const body=generateTemplateElement({ 
      type:'body'
    });
    let attrsStr="";
    for(const [key, attr]  of entries(attributes||{})){
      attrsStr=`${attrsStr} ${key}="${attr}"`;
    }
    if( children){
      if(!isString(children)) body.append(isHouxitElement(children)  ? children.$element  : isHouxitWidgetElement(children) ? children.build.$element : children);
      else body.innerHTML=children;
      children=body.innerHTML;
    }
    const html=`<${type} ${attrsStr.trim()}>${children||''}</${type}>`;
    const customEl=new DOMParser().parseFromString(html,'text/html').body.childNodes[0];
    if(isCustomElement(customEl) || isNativeElement(customEl)) return customEl;
  }
  function generateTemplateElement(vnode, self, hx__Element, siblings, isRerender, IS_RENDERLESS ){
    return _generateTemplateElement( ...arguments );
  }
  function _generateTemplateElement(virtualNode, self, hx__Element, siblings, isRerender, IS_RENDERLESS){
    let { props, children, type } = virtualNode;
    const initializedRender=self[$$$operands]?.initializedRender;
    if(isString(type) && IS_VALID_TAGNAME(type)) return _createNativeElement(...arguments);
    else return _createWidgetElement(...arguments, self && initializedRender );
  }
  function generateElementFlag(element, hx__Element){
    const _Houxit_Element_VNodeFlag = create_Houxit_Element_Flags_();
    assign(_Houxit_Element_VNodeFlag, {
      hx__Element,
      _vnode_key:hx__Element?._vnode_key || 0
    })
    define(element, '_Houxit_Element_Flag', {
      value : _Houxit_Element_VNodeFlag,
      enumerable
    });
  }
  function _createNativeElement(virtualNode, self, hx__Element, siblings, isRerender){
    let { type, props, children, key } = virtualNode;
    const argsCount=len(arguments);
    let element;
    const is_hyperscript=hx__Element?.is_hyperscript || false;
    const initializedRender=self[$$$operands]?.initializedRender;
    if(isString(type)){
      if(!initializedRender && IS_VALID_TAGNAME(type) ){
        element=document.createElement(type);
        if(hx__Element) {
          if(isHouxitBuild(self)) {
            hx__Element.hx_hash_=self[$$$ownProperties].hx_hash_
            if(self[$$$ownProperties].hx_hash_) element.setAttribute("data-hx_hash_", self[$$$ownProperties].hx_hash_);
          }
        }
      }else if(!initializedRender) return _resolveCustomNativeElement(self, { 
        type, 
        attributes:props, 
        children
      }, hx__Element);
    }
    const metrics ={
      is_hyperscript,
      isRerender
    }
    const { hasDir:hasSlot, getKey:getSlot, getDir:getSlotValue } =dirExistenceCheck(props || {}, "$$slot");
    if(hasSlot) {
      const bindings=validateIncomingPropsKeys(self, {
        key:getSlot,
        attr:getSlotValue
      }, is_hyperscript, hx__Element, metrics, );
      $$dir_SLOT(self, bindings, virtualNode, hx__Element, metrics, {});
    }
    if(!initializedRender) element.PATCH_FLAGS=new Set();
    if(children && !IS_HTML_VOID_TAG(type)) {
      if( hasOwn(virtualNode.filesFilter ,'dir--raw')){ 
        const item= _$runModelBind(self, virtualNode.filesFilter['dir--raw'], hx__Element, true);
        if(item){
          const content=escapeDecoder(virtualNode.rawChildren);
          if(!initializedRender) element.innerHTML=content;
          else hx__Element.$element=content;
        }
      } else {
        let childNodes=_HouxitTemplateParser(children, self, true, hx__Element, assign({}, hx__Element.LabContext), isRerender);
        childNodes = childNodes && !isArray(childNodes) ? [ childNodes ] : isArray(childNodes) ? childNodes : [];
        for(let [key, els] of childNodes.entries()){
          if(!els) continue
          hx__Element.NodeList.add(els);
          if(!initializedRender) element.append(els.$element)
        }
      }
    }
    if(!initializedRender && props) Props_dilation_compile(virtualNode, self, hx__Element, metrics, element);
    if(element.localName==='slot' && !element.name.trim()){
      slotNamingTRANSITION(self, {
        value:'default'
      }, element, hx__Element, {
        is_hyperscript,
        isRerender
      });
    }
    const { hasDir:hasModel } = dirExistenceCheck(props||{}, '$$model');
    if(!initializedRender) {
      generateElementFlag(element, hx__Element);
      return element;
    }
  }
  function createNativeElement(virtualNode,  hx__Element, siblings, isRerender, IS_RENDERLESS  ){
    return _createNativeElement( ...arguments );
  }
  function _createWidgetElement(virtualNode, self, hx__Element, siblings, isRerender, IS_RENDERLESS){
    let { type, props, children, prototype_ } = virtualNode;
    const is_hyperscript=hx__Element?.is_hyperscript;
    let buildInstance;
    const slotsCompilerArgs={
      self,
      hx__Element,
      isRerender,
      is_hyperscript,
      IS_RENDERLESS
    }
    if(!is_hyperscript){
      slotsCompilerArgs.config={
        contextScope:'slots_Block',
        slots_Block:true,
        props:{
        
        },
        ctx:{}
      }
      buildInstance=ResolveWidget(self, hx__Element, virtualNode, IS_RENDERLESS, slotsCompilerArgs)//reso;ving a widget data object
     if(buildInstance) hx__Element.hx_hash_=buildInstance[$$$ownProperties].hx_hash_;
    }else if(validHouxitWidget(type)) buildInstance =$compilerEngine(self, virtualNode, hx__Element, slotsCompilerArgs);
    if(buildInstance && buildInstance[$$$ownProperties]?.slot_name) hx__Element.slot_name=buildInstance[$$$ownProperties].slot_name;
    return isHouxitBuild(buildInstance) ? buildInstance.build?.$element : createTextElement(self, '', hx__Element, isRerender);
  }
  function createWidgetElement(virtualNode, metrics ){
    const { hx__Element, siblings, isRerender, IS_RENDERLESS } = metrics; 
    return _createWidgetElement(virtualNode, config.hx__Element, siblings, isRerender, IS_RENDERLESS );
  }
  function formatExpression(objKey, keys, expression){
    keys=new Set(keys)
    const keysRegex=/[\w@$.]+/g
    return expression.replace(keysRegex, (match, p2)=>{
      const matches=match.match(/[\w@#$]+/)
      if(keys.has(matches[0])) match = `${objKey}.${match}`;
      return match;
    });
  }
//A replacement for the with  js expression
  function _EvalWith( data , expression , autoReturn=false) {
    expression=formatExpression('obj', keys(data), expression)
    const run = Function( 'obj',...keys( data ) , `"use strict"; ${ autoReturn ? 'return' : '' } ${ expression }` );
    return run( data );
  }
  function hasSpecialCharacters(value) {// Define the regular expression for special characters
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/m.test(value);  // Test if the value contains any special characters
  }
  const unsupportedDelimiters="<,>";
  function includesUnsupported(delimiters){
    let response=false;
    for(const deli of delimiters.values()){
      unsupportedDelimiters.split(',').forEach((v)=>{
        response=deli.includes(v);
        if(isTrue(response)) return response;
      })
    }
    return response;
  }
  function escapeRegExp(string) { 
    return string.replace(/[.!@#%_\,<>:;'"\-=*+?^${}()|[\]\\]/g, '\\$&'); 
  }
  const entities = {
    '!':`&excl;`,
    '@':`&commat;`,
    '#':`&num;`,
    '$':`&dollar;`,
    '%':`&percnt;`,
    '^':`&Hat;`,
    '&':`&amp;`,
    '*':`&ast;`,
    '(':`&lpar;`,
    ')':`&rpar;`,
    '_':`&lowbar;`,
    '+':`&plus;`,
    '-':`&minus;`,
    '=':`&equals;`,
    '[':`&lsqb;`,
    ']':`&rsqb;`,
    '\\':`&bsol;`,
    '{':`&lcub;`,
    '}':`&rcub;`,
    ';':`&semi;`,
    ':':`&colon;`,
    '"':`&quot;`,
    "'":`&apos;`,
    '|':`&vert;`,
    ',':`&comma;`,
    '<':`&lt;`,
    '.':`&period;`,
    '>':`&gt;`,
    '/':`&sol;`,
    '?':`&quest;`
  }
  function escapeDecoder(str, useReverse=false){
    // for(const char of keys(entities)){
    //   let entity = entities[char]
      
    //   const regex = new RegExp(`/${isTrue( useReverse ) ? entity : char }/g`, isTrue(useReverse) ? char : entity );
    //   if(!regex.test(str)) continue;
    //   str=str.replace(regex)
    // }
    return str/*.replace(/&/g, '&amp;')*/.replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')     
      // .replace(/\[/g, '&lsqb;')     
      .replace(/"/g, '&quot;')     
      .replace(/\\/g, '&#39;'); 
  }
  
  function escapeReverseDecoder(str){
    return str.replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      //.replace(/&amp;/g, '&')
      .replace(/&#39;/g, '\\')
  }
  const isSafeString=text=>/\[\[\[\%\%safe\-\-(.*?)\-\-\%\%\]\]\]/.test(text);
  function markSafeString(text){
    return `[[[%%safe--${text}--%%]]]`;
  }
  function RenderableContextManager(self, text, hasSafeString ){
    text=compileToRenderable(unwrap(text));
    return hasSafeString ? escapeDecoder(text) : text ;
  }
  function validateDelimiterConstruct(self, delimiters){
    if(!isArray(delimiters)){
      $debug_log(`expects an arrah of character strings encoding\n\n.....delimiters config setup`, self, isHouxitBuild(self));
      return false;
    }
    let [ open, close ] = delimiters ;
    if( open && close ){
      if( !hasSpecialCharacters( open ) || !hasSpecialCharacters( close ) ) {
        $debug_log(`mustache customization error::\n\n delimeters must match value of special characters\n\ne.g !, @, #, $, %, ^, &, *, (, ),  [, ], {, }, ;, :, ?`,  self, isHouxitBuild(self) ); 
        return false;
      }else if(includesUnsupported([ open, close ])) {
        $debug_log(`Invalid  delimiter value :: \n\n"${open} or ${close} is an unsupported delimiter constructs"\n cannot be used as a string mustache delimeter since this are javascript multiline string interpolation technic\n\n Delimeter Configuration failed`, self, isHouxitBuild(self));
        return false;
      }
    }
    return true
  }
  function resolveAccessor(self, str, hx__Element, $$bind=false){
    let [ open, close ] = self[$$$core].settings.delimiters ;
    open=hasSpecialCharacters(open) ? escapeRegExp(open) : open ;
    close=hasSpecialCharacters(close) ? escapeRegExp(close) : close ;
    const pattern=new RegExp(`${open}([${open}]?.*?[${close}]*)${close}`, 'mg');
    let link;
    if(str.match(pattern)) {
      str=str.replace(pattern, (match, text)=>{
        text=escapeReverseDecoder(text.trim());
        const drafts=[];
        let draftCount=0;
        text=text.replace(stringsMonitorRegex, (match, rex, roll)=>{
          drafts.push(match);
          let dataDraft="*****"+draftCount;
          draftCount++;
          return dataDraft;
        });
        const filters=text.split('%');
        for( const [ index, flt ] of filters.entries()){
          filters[index]=flt.replace(reverseRegex, (match, rex, roll)=> drafts[Number(rex.match(/\d/))]);
        }
        let hasSafeString;
        text=_$runModelBind(self, filters.shift().trim(), hx__Element);
        text=unwrap(text);
        if(len(filters)) text=$Filter_HelpersService(self, text, filters, hx__Element, $$bind);
        return RenderableContextManager(self, text, hasSafeString);
      })
    }
    return str;
  }
  function checkForModeLAndContextAvailability(model, context, ref, returnToken){
    if(!hasOwn(model, ref) && !hasOwn(context, ref) && !returnToken) {
      throw new Error('Accessor Error')
      return;
    }else if (returnToken) return ref;
  }
  function _$runModelBind(self, ref, hx__Element, returnToken=false){
    let value;
    const model= isHouxitBuild(self) ? self.__public_model__ : isModelInstance(self) ? self : Object.create(null);
    const context=isHouxitElement(hx__Element) ? hx__Element?.LabContext || {} : isPObject(hx__Element) ? hx__Element : {};
    try{
      value=_Evaluate_THIS( model, ref, self, context) ;
      if(isNull(value) && !hasSpecialCharacters(ref) && !isNullBasedKeyword(ref) ){
        return checkForModeLAndContextAvailability(model, context, ref, returnToken);
      }
    } catch(err){
        if(!returnToken){
          $debug_log(`Accessor Error::\n\n"${ref}" property value was accessed during render, but not initialized on model or is undefined\n\nat at\n ..."${ref}" property \n\n${err}`, self, true);
          return;
        }else return ref
    }
    return value 
  }
  function _useBind__(ref, config){
    const response=validateCollectionArgs(arguments, {
      name:'useBind',
      required:[true, false ],
      min:1,
      max:2,
      validators:[ String, Object ]
    })
    if(!response) return null
    const self=getCurrentRunningEffect({
      name:'useBind'
    });
    if(!self) return null;
    
  }
  function useBind(ref, config){
    return _useBind__(ref, config);
  }
  const hasFilterInstance=(self, name)=>_mapValue(BUILT_IN_FILTERS, name) || _mapValue(self[$$$register].filters, name);
  const normalize_Filter=(self, name)=>hasOwn(BUILT_IN_FILTERS, name) ? BUILT_IN_FILTERS[name] : self[$$$register].filters[name] || pass;
  function customFilterDebugger(value, filter){
    if(!canRender(value)){
      $debug_log(`"${filter}" template filter expects a plain string value`);
      return false;
    }
    return true;
  }
  function evaluateShortener(defaultValue, digitsSlice, secondValueSlice, appendText, verboseText){
    let dValue=String(defaultValue).trim();
    let digitsValue=digitsSlice;
    let secondSlice=secondValueSlice
    let text=String(appendText);
    let digits=dValue.slice(Number(digitsValue.at(0)),Number(digitsValue.at(-1)));
    let secondValue=dValue.slice(secondSlice.at(0),secondSlice.at(-1));
    let SConvert=Number(secondValue);
    let res=digits+text;
    if (SConvert>0){
      let term=digits+'.'+secondValue;
      res=term+text;
    }
    if (verboseText) return res+' '+useVerbose(Number(dValue),verboseText);
    else return res;
}
  function useShortenerFilter(value, verboseText=""){
    value=Number(value);
    if(!isNumber(value) || isNaN(value)){
      $debug_log(`shortener filter Adapter at argument <1> expects a number`);
      return value;
    }else if(!isString(verboseText)){
      $debug_log(`shortener filter Adapter at argument <2> expects a string`);
      return value;
    }
    var result=value;
    if (value > 999 && value < 999999 ) result=evaluateShortener(value,[0,-3],[-3,-2],'K');
    else if(value > 1000000 && value < 999999999 ) result=evaluateShortener(value,[0,-6],[-6,-5],' Million');
    else if(value > 1000000000 && value < 999999999999 ) result=evaluateShortener(value,[0,-9],[-9,-8],' Billion');
    else if(value> 1000000000000 && value < 999999999999999 ) result=evaluateShortener(value,[0,-12],[-12,-11],' Trillion');
    else if(value > 1000000000000000){
      let digits=String(value).slice(0,-15);
      let digitsConvert=Number(digits);
      let expo=digitsConvert.toExponential();
      result=expo+' E';
    }
    if (verboseText) return result+' '+useVerbose(value,verboseText);
    else return result;
  }
  function useVerbose(value, txt){
    var val=Number(value);
    var result=String(txt);
    if (val>1) result=result+'s';
    return result;
  }
  function usePercentageAdapter(value, arg, decimalIndex){
    let index=Number(decimalIndex);
    let div=100/value;
    let e=div*arg;
    let fix=e.toFixed(index);
    let result=Number(fix);
    return String(result)+"%";
  }
  function useCurrencyAdapter(value, currency='$'){
    if(!isNumber(value) || isNaN(value)){
      $debug_log(`currency filter Adapter at argument <1> expects a number`);
      return value;
    }else if(!isString(currency)){
      $debug_log(`currency filter Adapter at argument <2> expects a string`);
      return value;
    }
    const stringifyNum=String(value);
    const houxitBank=[];
    let recorder=[];
    const reInstate=()=>{
      houxitBank.push(recorder.toReversed().join(""));
      recorder=[];
    }
    for(const val of values(stringifyNum).toReversed()){
      if(len(recorder) === 3 ) reInstate();
      else recorder.push(val);
    }
    if(len(recorder)) reInstate();
    return currency+houxitBank.toReversed().join(",")+".00";
  }
  function UPPER_FILTER_SERVICE(value){
    if(!customFilterDebugger(value, 'upper')) return value;
    return compileToRenderable(value).toUpperCase();
  }
  function TITLE_FILTER_SERVICE(value){
    if(!customFilterDebugger(value, 'title')) return value;
    const splitted=String(value).split(' ');
    for(let [ind, val] of entries(splitted)){
      splitted[Number(ind)]=val.charAt(0).toUpperCase()+val.slice(1);
    }
    return splitted.join(' ');
  }
  function LOWER_FILTER_SERVICE(value){
    if(!customFilterDebugger(value, 'lower')) return value;
    return String(value).toLowerCase();
  }
  const BUILT_IN_FILTERS={
    upper:UPPER_FILTER_SERVICE,
    title:TITLE_FILTER_SERVICE,
    lower:LOWER_FILTER_SERVICE,
    shortener:useShortenerFilter,
    percent:usePercentageAdapter,
    currency:useCurrencyAdapter
  }
  function $Filter_HelpersService(self, value, filters,hx__Element, $$bind){
    if(!len(filters)) return  value;
    let filterInstance;
    let parameters;
    for(const [ index, filter ] of filters.entries()){
      let name=filter.trim() ||  null;
      if(!name){
        $warn(`undefined filter name\n\nCheck template filter definition`, self);
        return;
      }
      const VResponse=filterInstancesValidator(name, self, hx__Element);
      if(!VResponse ) break;
      [ filterInstance, parameters ] = VResponse;
     const filterCallback=isPFunction(filterInstance) ? {
       filter:filterInstance
     } : filterInstance;
      try{
        const filterResponse=filterCallback.filter(value, ...parameters);
        value=filterResponse;
      }catch(error){
        $debug_log(`Encountered an error when running the filter callback at >>>>>> ${name}`, self, true);
        $debug_log(error, self);
        break;
      }
    }
    return value
  }
  function filterInstancesValidator(name, self, hx__Element){
    let parameters=[];
    if(name.includes("(") && name.includes(")")){
      const filter=name;
      name=abstractFilterName(name);
      let { content } = ArgsExtractor(filter, name);
      const reader=`((...args)=> args)(${content})`;
      parameters=_$runModelBind(self, reader, hx__Element);
    }
    if(!hasFilterInstance(self, name)) {
      $debug_log(`Unrecognized  filter name "${name}"\n\n if this is a custom filter, make sure it's registered through the local filter option or global prototype 'filter' method`,  self, true);
      return;
    }
    const filterInstance=normalize_Filter(self, name);
    if(!validateType(filterInstance, [Function, Object])){
      $debug_log(`${name} filter receives an Invalid type definition\n\nExpects a filter function or a plain object type exposing a filter method which acts as the filter callable itself`, self, true);
      return;
    }else if(isPObject(filterInstance)){
      if(!hasProp(filterInstance, 'filter')){
        $debug_log(`"${name}" filter instance object does not expose a "filter" method which acts as the filter function`, self, true);
        return;
      }else if(!isPFunction(filterInstance.filter)){
        $debug_log(`"${name}".<filter> instance filter property value is not a method/callable  \n\n Expects a function type which acts as the filter function`, self, true);
        return;
      }
    }
    return [ filterInstance, parameters ];
  }
  function abstractFilterName(filter){
    return filter.match(/^([^(]+)/)[0];
  }
  const HouxitDirectives="if,else,else-if,html,text,for,raw,slot,model,bind,on,scoped,provide,motion,clone";
  const preCompiledDirs="if,else-if,else,for,raw";
  const buildUsableDirectives="scoped,model,clone,motion";
  const isHyperscriptDirective=dir=>_mapValue(buildUsableDirectives, dir);
  const isHouxitDirective=dir=>_mapValue(HouxitDirectives, dir);
  
  const validIdentifierRegex=/([...]*[\w\d]+)/g;
  function trackExistentDextructureNamespace(self, syntaxes){
    const register= new Tuple();
    const newSyntaxRecord=[]
    let rIndex=0;
    for(let [index, syntax] of syntaxes.toReversed().entries()){
      let setup=syntax;
      syntax=syntax.replace(validIdentifierRegex, (match, valId)=>{
        valId=hasSpread_bind(valId) ? valId.slice(3) : valId;
        if(register.has(valId)){
          // setup=setup.replace(new RegExp(`${valId}`), (m, v)=> v)
        }else register.add(valId)
      })
      newSyntaxRecord.unshift(setup)
      rIndex++
    }
    return newSyntaxRecord;
  }
  const isNullBasedKeyword=str=>/^(null|undefined)$/.test(str);
  function _Evaluate_THIS(obj, str, self, optional){
  // Use a regular expression to match statements or multiple expressions
    const statementRegex = /^(?:let|var|const|if|for|while|do|switch|else|else if|await|break|case|yield|with|catch|continue|debugget|void|try|import|throw|finally|exports|do|delete|return|throw|delete|;).*$/;
    // =|\+\+|\+=|--|-=|\*|\*=|\.\.|\/\/|\/\*|\*\*|\[=|==\+|\/=|%=\*\*=|&&=|\|\|=|<=|>=|\\|
    if (statementRegex.test(str) && !passableBlock(str)) {
      throw new Error(`Invalid expression: \n\n"${str}" Your binding seems to contain an unallowed expression a a statement\n Only single expressions are allowed.`, self, true);
    }// Use a regular expression to remove comments from the expression by using string .replace regex method
    const commentRegex = /\/\/.*$|\/\*[^]*?\*\//g;//comment matching regular expression
    let expressionWithoutComments = str.replace(commentRegex, '');// Use a regular expression to match any remaining unsupported constructs and statement keywords
    // const unsupportedRegex = /(?:\.\.|\/\/|\/\*|\*\*|\[=|==\+|-\+|\+=|\-=|\*=|\/=|%=\*\*=|&&=|\|\|=|<=|>=|\breturn\b|\bthrow\b|\bfunction\b|\bnew\b|\btypeof\b|\bdelete\b|\binstanceof\b|\bvoid\b|\bnull\b|\bundefined\b|\bconst\b|\blet\b|\bvar\bclass\b)/;
    const unsupportedRegex = /(?:\.\.|\bthrow\b|\bdelete\b|\bvoid\b|\bconst\b|\blet\b|\bvar\b)/;
    let scriptRender;
    let checkRegex=false;
    try{
      scriptRender=parseScript(expressionWithoutComments);
    }catch(err){
      checkRegex=true;
    }
    expressionWithoutComments = expressionWithoutComments.replace(stringsMonitorRegex, ()=> "");
    if (checkRegex && unsupportedRegex.test(expressionWithoutComments)) {
      throw new Error(`Invalid expression: \n\nUnsupported constructs are not allowed.\n\n"${str}"`, self, true);
    }
    let dexTransform;
    if(optional && isPObject(optional) && hasOwn(optional, $$dexTransformKey)){
      dexTransform=optional[$$dexTransformKey];
      let syntaxArray=dexTransform.syntaxArray;
      syntaxArray = trackExistentDextructureNamespace(self, syntaxArray)
      dexTransform.traverse=()=>transformDestructureContext(syntaxArray, dexTransform.sourcesArray, str, [obj, optional]);
    }
    const getValue = new Function('obj','$$$ctx','dexTransform', `
      with(obj){
        with($$$ctx){
          return dexTransform ? dexTransform.traverse()  : ${str.trim() || "undefined" };
        }
      }
    `);
    let value;
    try{
      value = getValue.call(obj, obj, isPObject(optional) ? optional : {}, dexTransform);
    }catch(error){
      // throw new  Error(error);
    }
      return value;
  }
  function transformDestructureContext(props, sources, vv, metrics=[]){
    const traverse =Function('obj', '$$$ctx',`
      with(obj){
        with($$$ctx){
          return function transform(${props.join(",")}){
            return ${vv}
          }
        }
      }
    `)
    const [obj={}, $$$ctx={}]=metrics;
    return traverse.call(obj, obj, $$$ctx )(...sources);
  }
  const dynamicAttrRegex=/\[(.*?)\]/;
  function _DynamicAttrNameResolver(self, attr, hx__Element, isRerender, metrics){
    let iniAttr=attr;
    attr= fall_AttrName(attr) ;
    const initializedRender=self[$$$operands]?.initializedRender;
    if(dynamicAttrRegex.test(attr)){
      const matches=attr.match(dynamicAttrRegex);
      let name=''
      let subscribers;
      [ subscribers, attr ] = effectDependencyTracking(self, function(){
        return matches[0].replace(dynamicAttrRegex, (match, text)=>{
          return unwrap(_$runModelBind(self.__public_model__, text, hx__Element, true));
        })
      });
      if(len(subscribers) && !initializedRender){
        
      }else if(isRerender){
        
      }
    }
    if(!isString(attr)){
      $debug_log(`Unexpected value at "${iniAttr}" as dynamically evaluated prop name binding is not a valId prop string`);
      return iniAttr;
    }
    return iniAttr.replace(dynamicAttrRegex, function (match, space){
      return attr;
    });
  }
  const DebugFlags={
    slots:"compilation of slot element",
    template:"template compile process",
    hook:name=>"during the call of "+name.toUpperCase()+" hook",
    build:"during the call of the build function",
    register:(name)=>"the registration of a "+name,
    forloop:"during mapping of the for directive",
    ifElse:name=>"during the consitional rendering of the "+name+" directive",
  }
  function get_Object_Value(obj, path, check=false){
    const processor=Function('obj','check',`
      let value;
      try{
        value= obj.${path}
      }catch(err){
        if(check) throw new Error(err)
        return
      }
      return value;
    `)
    return processor(obj, check);
  }
  const accessorsRegex=/[.[\]]/;
  const dynamicAccessorsRegex=/(\[(.*?)\])/g;
  function object_Has_Path(obj, str, getRes) {
    let res=false;
    let value=obj
    if ((!isEmptyStr(str) ? accessorsRegex.test(str) : false)) {
      const navigation = str.split('.');
      for (const key of navigation) {
        if(dynamicAccessorsRegex.test(key)){
          let shouldBreak=false;
          let access=[];
          let match=key.replace(dynamicAccessorsRegex, (match, p1, internal)=>{
            internal=Number(internal)
            if(!isNaN(internal)) access.push(internal)
            return "";
          })
          if((shouldBreak && !res) || !value ) return false;
          if(!isEmptyStr(match)) value = value[match];
          if(len(access)) {
            for(let [index, keys ] of access.entries()){
              if( !validateType(value, [ Object , Array, Function]) && isTrue(isArray(value) && isNaN(Number(keys))) && Number(keys)+1 > len(value)) return false
              value=value[keys];
            }
          }
        }else if (!hasOwn(value||{}, key)) return false;
        else {
          value = value[key];
          res=true;
        }
      }
    } else {
      if (hasOwn(obj, str)) value=value[str];
      else return false;
      return true;
    }
    return res;
  }
  function set_Object_Value(obj, path, value, check=false){
    return Function('obj','value','check','metrics',`
      try{
        const [ isToken, get_Object_Value, debug ] = metrics;
        const initVal=get_Object_Value(obj, "${path}" );
        if(isToken(initVal)) obj.${path}[initVal[refInternalEffectKey].accessor]=value;
        else obj.${path}=value;
      }catch(err){
        if(check) $debug_log(err)
        return err
      }
      return obj;
    `)(obj, value, check, [isToken, get_Object_Value, $debug_log]);
  }
  function get_Prop_Path(obj, prop) {
    const stack = [{ 
      object: obj, 
      path: '' 
    }];
    while (len(stack) > 0) {
      const { object, path } = stack.pop();
      for (const [key, value] of getIterator(object)) {
        const currentPath = path ? `${path}${ isPObject(object) ? '.' : '[' }${key}${isArray(object) ? ']' : ''}` : key;
        prop = isNumber(key) ? ( isNaN(Number(prop) ) ? prop : Number(prop ) ): prop ;
        if (key === prop) return currentPath;
        if (validateType(value, [Object, Array ])) stack.push({ 
          object: value, 
          path: currentPath 
        });
      }
    }
    return null;
  }
  function toCamelCase(str) {
    return str.replace(/-+([a-zA-Z])/g, (match, letter) => letter.toUpperCase());
  }
  function ToPascalCase(str){
    const camelCase=toCamelCase(str);
    return camelCase.at(0).toUpperCase()+camelCase.slice(1);
  }
  function to_kebab_case(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }
  function mapClassTypeTransform(item, transpiled){
    if(isPObject(item)){
      entries(item).forEach(([key, value])=>{
        value=unwrap(value);
        if(value) {
          for(let val of values(key.split(' '))){
            transpiled.add(val);
          }
        }
      })
    }else if(isCollection(item)){
      for(let value of item.values()){
        item = unwrap(item);
        mapClassTypeTransform(value, transpiled);
      }
    }else if(isString(item)){
      for(let val of values(item.split(' '))){
        transpiled.add(val);
      }
    }
    return transpiled.list();
  }
  function resolveDiffing(class1, class2){
    if(deepEqualityCheck(class1, class2)) return [];
    for(let [key, index] of getIterator(class1)){
      
    }
  }
  function parse_Class_Binding(self, item, element, hx__Element){
    item=unwrap(item);
    const transform=mapClassTypeTransform(item, new Tuple());
    for(let [index, cls] of transform.entries()){
      cls=unwrap(cls)
      if(!element.classList.contains(cls)) {
        toggleClassNames(element, cls);
      }
    }
  }
  function toggleClassNames(element, classes, remove=false){
    const toggler=remove ? 'remove' : 'add';
    classes.split(' ').forEach((cls)=>{
      if(cls)  element.classList[toggler](cls);
    })
  }
  function compileStyleProps(self, item, styleProps, element){
    if(isPObject(item)){
      entries(item).forEach(([key, style])=>{
        if(!isString(unwrap(style))){ 
          $debug_log(`Unrecognized stype property value \n\nat at\n "${key}" style property\n\n${element?.outerHTML || "" }`, self); 
        return;
        }
         styleProps[toCamelCase(key)]=style;
      })
    }else if(isArray(item)){
      for(const value of item.values()){
        compileStyleProps(self, value, styleProps, element)
      }
    }else if(isString(item)){
      let splited=item.trim().split(';');
      for(let styling of splited.values() ){
        if(styling && styling.includes(':')){
          const spread=styling.split(':');
          styleProps[spread[0]]=spread[1];
        }
      }
    }
    return styleProps;
  }
  function parse_Style_Binding(self, item, element, hx__Element){
    const styleProps=compileStyleProps(self, item, {}, element);
    const prevStyles={};
    const initializedRender=self[$$$operands]?.initializedRender;
    for(let [ prop, style ] of entries(styleProps)){
      style=unwrap(style)
      element.style[prop]=style;
    }
  }
  function fall_AttrName(key, attr){
    const Key_Binding={ 
      '*':1, 
      '@':1, 
      '...':3, 
      "$$" : 2
    };
    if( !isString(key) && !key.trim() && hasSpecialCharacters(attr)) return key ;
    for(const [ky, sl] of entries(Key_Binding)){
      if(key.startsWith(ky)){
        if(has$$_bind(key)){ 
          key=key.split(':')
          key.shift();
          return key.join(':')
        }
        return key.slice(sl);
      }
    }
    return key;
  }
  function isOnListener(key){
    return exists(key) && isString(key) && /^on[A-Z]+\w+$/.test(key);
  }
  function directive_sep(key){
    return key.includes(':') ? key.split(':') : [key]
  }
  function elementObserverWatch(element, callback, config={}){
    const observer= new MutationObserver(callback);
    const obsConfig= {
      attributes: true,
      childList: true, 
      subtree: true 
    }
    observer.observe(element, {
      ...config,
      ...obsConfig
    });
  }
  const keysSeparatorRegex= /([a-zA-Z_$][\w$]*)|\[([^\]]+)\]/g;
  function AttrsKeyNormalizer(key, value, self){
    const binding={
      modifiers:[],
      directive:undefined,
      key:undefined,
      deepKeys:[],
      src:key,
      value
    }
    if(hasSpread_bind(key, true)){
      let prop=key.slice(3);
      binding.value=key.slice(3);
      binding.directive="bind";
    }else if(!key.includes(':') && !key.includes('|') && !has$$_bind(key )) {
      binding.key=key;
    }else{
      let [ dir, keys, unecessary ] = directive_sep(key);
      if(exists(unecessary)) $debug_log(`Error in directive saperator chain.\n\nExcessive directive chain, unable to determine\n >>>> "${unecessary}"`, self, true);
      binding[ ( key.startsWith("$$")) ? 'directive' : 'key' ]=dir;
      if(!binding.key) binding.key=keys;
      else keys = binding.key;
      if(keys?.includes('|') || dir.includes('|')) {
        const ssd=!keys ? dir : keys;
        binding.modifiers=(ssd).split('|');
        const fV=binding.modifiers.shift();
        if(keys) keys=fV;
        else {
          dir=fV;
          binding.directive=dir
        }
        if(len(binding.modifiers)){
          iterate(binding.modifiers).test((value, key)=>{
            if(!value.trim()) binding.modifiers.splice(key, 1);
          });
        }
      }
      binding.key=keys;
      binding.directive=binding.directive?.slice(2);
    }
    if(keysSeparatorRegex.test(binding.key)){
      const deeps=[ ...(binding.key?.match(keysSeparatorRegex) || [])];
      if(len(deeps)) binding.key=deeps.shift();
      binding.deepKeys=deeps;
    }
    binding.src=key;
    if(binding.directive && !binding.value){
      const canBindDyy =_mapValue("provide,html,text,model,clone,scoped,motion,bind,slot", binding.directive);
      if(canBindDyy)  bindings.value= key || directive;
    }
    return binding;
  }
  function AttrsKeyNormalizerDebugging(bindings, self){
    const { directive, modifiers, deepKeys, key, src } = bindings;
    let response=true;
    if(!directive){
      let errType=[];
      if(len(modifiers)) errType.push("modifiers");
      if(len(deepKeys)) errType.push("nestedKeys");
      if(modifiers || deepKeys){
        iterate(errType).test((val, ind)=>{
          $debug_log(`"${val}" carriers are only supported in directives\n\n"${val}" interference has been rescinded`, self, true);
          response=false;
        })
      }
    }
    return response;
  }
  function validateIncomingPropsKeys(self, { key, attr }, is_hyperscript, hx__Element, metrics){
    if(is_hyperscript && isillegalKeyBinding(key, is_hyperscript)){
      $debug_log(`Illegal binding not allowed in build Adapter mode\n\n"${key}" property has a disallowed binding directive property`, true, self);
      return {};
    }
    let { isRerender, patch } = metrics ;
    let $orgKey=key;
    let modifiers=[];
    let deepKeys=[];
    let directive;
    let bindings={};
    if(!is_hyperscript){
      key = extentDirectiveShorhand(key);
      bindings=AttrsKeyNormalizer(key, attr, self);
      const debugResponse=AttrsKeyNormalizerDebugging(bindings, self);
      modifiers=bindings.modifiers; 
      deepKeys=bindings.deepKeys;
      directive=bindings.directive; 
      key=bindings.key;
      const ResolveDAName=(kk)=>_DynamicAttrNameResolver(self, kk, hx__Element, isRerender, metrics);
      if(key && dynamicAttrRegex.test(key) ) bindings.key=ResolveDAName(key);
      iterate(deepKeys).test((v, k)=>{
        if(deepKeys[k] && dynamicAttrRegex.test(deepKeys[k])) deepKeys[k]=ResolveDAName(v);
      });
    }else {
      bindings= {
        directive,
        key,
        modifiers,
        deepKeys,
        value:attr,
        src:$orgKey
      }
      if(isOnListener(key)){
        const events=to_kebab_case(key.slice(2)).split('-');
        bindings.key=events.shift();
        bindings.deepKeys=events;
      }
      
    }
    return bindings;
  }
  function HTMLAttrsMagnifier(element, bindings, hx__Element, self, metrics, toggle=true){
    let { is_hyperscript, isRerender, patch } = metrics ;
    let { key, value:attr, src } = bindings;
    if(isHTMLBooleanAttributes(key)) BooleanAttributesManager(element, key, attr, { is_hyperscript }, hx__Element);
    else if(key === 'class') parse_Class_Binding(self, attr, element, hx__Element);
    else if(isHTMLIDLAttributes(key)) IDLPropsTransform(self, { key, attr}, element, hx__Element )
    else if(isOnListener(src)) {
      attr=unwrap(attr);
      if(!isPFunction(attr)){
        $debug_log(`on<EventName> listener expects a function value\n\nFound "${attr}" of "${getType(attr)}" type`, self, !isNull(self));
        return
      }
      const options=attr.options || {};
      bindings.value=attr;
      metrics=assign({ options }, metrics);
      $$dir_ON(self, bindings, element, hx__Element, metrics);
    }else if(key === "ref") Special_REF_Modifier(self, element, bindings, hx__Element, metrics);
    else if(key==='bind') {
      if(!element.localName === "slot"){
        $debug_log(`"bind" special properti is only scoped to html "<slot>" element in Houxit\n"Slot scope bind property found on a none "slot" element\n\nFailed to resolve binding`);
        return;
      }
      SlotBindingTRANSITON(self, bindings, element, hx__Element, metrics);
    }else if(key === 'name' && element.localName ==='slot') slotNamingTRANSITION(self, bindings, element, hx__Element, metrics);
    else{
      try{ 
        element.setAttribute(key, compileToRenderable(unwrap(attr)));
      }catch(err){
        $debug_log(`Attribute Error::\n\n...unable to set node attribute "${key}\n\n ${err}`, self, true, `When setting the attribute "${key}" on "${element.outerHTML}"`, self, !is_hyperscript );
        return
      }
    }
  }
  function widget_props_plugin(element, bindings, hx__Element, self, metrics){
    const { key, value } = bindings;
    element[key]=value;
  }
  function attributes_hydration(props, self, hx__Element, metrics, element){
    let { key, attr } = props;
    let { isW, is_hyperscript, isRerender } = metrics ;
    const bindings=validateIncomingPropsKeys(self, { key, attr }, is_hyperscript, hx__Element, metrics);
    let { directive, deepKeys, modifiers, src, value } = bindings;
    key=bindings.key;
    const $orgKey=src;
    if(!is_hyperscript && directive) _Resolve_Directives_Hydration(self, bindings, element, hx__Element, metrics );
    else ( isW ? widget_props_plugin : HTMLAttrsMagnifier )(element, bindings, hx__Element, self, metrics );
  }
  function slotNamingTRANSITION(self, bindings, element, hx__Element, metrics){
    let { value }=bindings;
    if(!isString(value)){
      $debug_log(`slot "name" atrribute value expects a "string" value data type\n\nuntraceable data type found`, self, true);
      return;
    }
    const SSBs=self[$$$compiler].scopeSlotsBindings;
    if(hasOwn(SSBs, value)){
      $debug_log(`slot with name "${value}" has been duplicated\n\nMore than one slot with same name mapping cannot be implemented to avoid dublicated renderimg of slots contents`, self, true);
      $warn(`NOTE: Un-named slots elements shares the same naming scope with implicitly "name='default'" slots elements`, self);
      return;
    }
    element.setAttribute('name', compileToRenderable(unwrap(value)));
    SSBs[value]={
      bindings:undefined,
      element
    }
  }
  function SlotBindingTRANSITON(self, bindings, element, hx__Element, metrics){
    if(!element.name){
      $debug_log(`To specifically bind context scope to slots, they are obliged to be contexrually named\n\nIt's either this slot element was not named proper…\nOr that the "bind property preccedes the special "bind" key`, self, true);
      $warn(`To resolve this, make sure the name prop comes befor the "bind" prop on this slot element`, self);
      return;
    }
    let { value }=bindings;
    const slotName=element.name;
    self[$$$compiler].scopeSlotsBindings[slotName].bindings=value;
  }
  function IDLPropsTransform(self, props, element, hx__Element ){
    const { key, attr } = props;
    const initializedRender=self[$$$operands]?.initializedRender;
    const is_hyperscript=hx__Element.is_hyperscript
    if(key === 'style') return parse_Style_Binding(self, attr, element, hx__Element);
    else if(key === "className") {
      const transform=mapClassTypeTransform(attr, new Tuple());
      element.className=element.className+" "+transform.join(" ");
    }else element[key]=attr ;
  }
  const isillegalKeyBinding=(prop, is_hyperscript)=>is_hyperscript && (hasAsterisks_bind(prop) || has$$_bind(prop) || hasAt_bind(prop)) || hasAsh_bind(prop);
  function Props_dilation_compile(vNode, self, hx__Element, metrics, element){
    const isW=!IS_ELEMENT_NODE(element) && validHouxitWidget(vNode.prototype_);
    const props=vNode.props;
    if(!isPObject(props)) return element;
    const is_hyperscript= self ? self[$$$core].map.is_hyperscript : hx__Element ? hx__Element.is_hyperscript : true;
    const initializedRender=self[$$$operands]?.initializedRender;
    metrics = { 
      isRerender:initializedRender,
      is_hyperscript, 
      isW
    }
    let propsIndex=0;
    entries(unwrap(props)).forEach(function([key, attr ]){
      attributes_hydration({
        key,
        attr
      }, self, hx__Element, metrics, element) ;
    });
  }
  function specialPropsPrefix(self, props, element, hx__Element){
    
  }
  function BooleanAttributesManager(vnode, [ key, attr ], is_hyperscript, hx__Element){
    attr=unwrap(attr)
    if(exists(attr) || isString(attr)) {
      if (isHTMLIDLAttributes(key)) vnode[key]=attr;
      else vnode.setAttribute(key, attr||'');
    }
  }
  function generateCustomDirBinding(self, hx__Element, bindings){
    const { modifiers, deepKeys } = bindings;
    return createObj('Binding', {
      modifiers,
      deepKeys
    });
  }
  function _With_Custom_Directives(self, bindings, element, hx__Element, vNode){
    let { key, value:attr, modifiers, deepKeys, src, directive:Name  } = bindings;
    let value;
    if(attr) value=_$runModelBind(self, attr, hx__Element, true)
    let has_modifiers=len(modifiers) ? true : false;
    if( !hasOwn(self[$$$register].directives, Name )){
      $debug_log(
        `((Undefined Directives reference))\n\n "${key}" directive is not a registered houxit directive on this widget\n\nat...........at>>>.\n ${element.outerHTML}`
      , self, true, "during directive resolving"  );
      return element;
    }
    const directive= self[$$$register].directives[Name];
    const CustomDir ={ 
      init:pass, 
      destroyed:pass,
      created:pass, 
      updated :pass,  
      mounted :pass
    };
    let dirB=generateCustomDirBinding(self, hx__Element, bindings)
    if(isPFunction(directive)) CustomDir.mounted=directive;
    else if(isPObject(directive) ){
      if( !has_Intersect_Prop(directivesHooksMap.split(','), keys(directive))) {
        $debug_log(`((Directive Error))\n\ndirective ${ typeof directive } does not define any of widget Directive hook.\n  "created/mounted/updated/init/destroyed" method`, self, true); 
        return element;
      }else{
        for(const [ name, hook] of  entries(directive)){
          if(new Set(directivesHooksMap.split(',')).has(name)){
            if(!isPFunction(directive[name])){
              $debug_log(`((Custom directive))\n\ncustom Directive "${Name}" ${name}  hook is not a function`,self, true);
              return element;
            }else {
              hook[lifeCiycleBinding]={
                modifiers:new Tuple(...keys(modifiers || [])),
                key,
                deepKeys,
                value
              }
              CustomDir[name]=hook;
            }
          }
        }
      }
    }
    if(!isNativeElement(element) && validHouxitWidget(element.type)){
      define(element, $$$customDirs,{ value:{
        init_hook:new Tuple(), 
        created_hook:new Tuple(),
        mounted_hook:new Tuple(),
        updated_hook:new Tuple(),
        destroyed_hook:new Tuple()
      }, enumerable, configurable });
    }
    for(let hook of directivesHooksMap.split(',').values()){
      if(CustomDir[hook] && !isPass(CustomDir[hook])) {
        if(isNativeElement(element)){
          if(hook === 'init') continue;
          hx__Element.VNodeManager.LifeCycleHooks[hook+'_hook'].add(CustomDir[hook]);
        }else if(validHouxitWidget(element.type)) element[$$$customDirs][hook+'_hook'].add(CustomDir[hook]);
      }
    }
    return element;
  }
  function isPass(func){
    return isPFunction(func) && func.name === 'pass' && hasOwn(func, $passKey);
  }
  function _Run_With_Modifiers(vnode, modifiers, func, events, runImmediately=true){
    if(!isFunction(func)){
      $debug_log(`"${key}" event Callback must be passed as  a function \n \n${func } is not a valid event callback  method`, self, true);
      return;
    }
    modifiers=isArray(modifiers) ? new Set(modifiers) : modifiers;
    const options=createObj('Options');
    if(modifiers.has('once')) options.once=true;
    if(modifiers.has('passive')) options.passive=true;
    if(modifiers.has('nonpassive')) options.passive=false;
    if(modifiers.has('capture')) options.capture=true;
    if(modifiers.has('noncapture')) options.capture=false;
    function __With_Modifiers(event){
      if(modifiers.has('prevent')) event.preventDefault()
      if(modifiers.has('stop')) event.stopPropagation()
      if(modifiers.has('trusted')) func=event.isTrusted ? func : pass
      if(modifiers.has('self')){
        if(!vnode.isEqualNode(event.target)) return;
      }
      func(event)
    }
    if(!runImmediately)  return [ __With_Modifiers, options]
    if(!(IS_ELEMENT_NODE(vnode) && len(events))) return;
    for (let eventName of events.values()) vnode.addEventListener(eventName, __With_Modifiers, options);
  }
  function _useModifiersAdapter(Callback, modifiers){
    if(!isFunction(Callback)){
      $debug_log(`Callback argument passed  to useModifiers is not a function`);return pass
    }else if( modifiers && !isArray(modifiers)){
      $debug_log(`Having a problem during the call of the "useModifiers" method.\n\nPositional argument, :"Modifiers" must be of type "Array" with string values. `);
      modifiers=[];
    }
    const Data=_Run_With_Modifiers(null, modifiers, Callback, [], false);
    const [ func, options ]=Data;
    if(len(options)) func.options=options;
    return func;
  }
  function useModifiers(callback, modifiers){
    return _useModifiersAdapter(...arguments);
  }
  function Special_REF_Modifier(self, node, binding, hx__Element, metrics){
    let { key, value, src, }=binding;
    const isWidget=!isNativeElement(node);
    const is_hyperscript=hx__Element.is_hyperscript;
    if(!isToken(value)){
      $debug_log(`"ref" prop value expects a Houxit token value\n\nfailed to mount ref token property value`,self, true);
      return;
    }else if(isReadonlyToken(value)){
        $debug_log(`Path provided to the ref special prop resolves to a readonly token value\n\nfailed to mutate excep a readonly readonlyBypasser is to be implemented by the Houxit compiler`, self, true);
        return;
    }
    if(node && isWidget) node.props[$$$$dir__ref$$$$]=value;
    else if(node) hx__Element.compiler_options['ref_$$Prop']=value;
  }
  function $$dir_HTML(self, bindings, vnode, hx__Element, metrics, text ){
    let { value, modifiers } = bindings;
    modifiers=new Set(modifiers);
    const is_hyperscript=hx__Element.is_hyperscript;
    const item=value;
    let subscribers;
    const initializedRender=self[$$$operands].initializedRender;
    const runBinding= ()=> _$runModelBind(self, value, hx__Element, !modifiers.has('bind'))
    if(!is_hyperscript) {
      [ subscribers, value ] = effectDependencyTracking(self, function(){
        return runBinding()
      } )
    }else value= runBinding();
    value=unwrap(value)
    const innerProp=isTrue(text) ? 'innerText' : 'innerHTML';
    if( isPrimitive(value)) {
      value=compileToRenderable(value)
      if(!isNativeElement(vnode) && value)  self.__public_model__.$attrs[innerProp]=value;
      else if(value) vnode[innerProp]=value;
    }
    if(!initializedRender && len(subscribers)){
      hx__Element.VNodeManager.patchFlags.subscriptions.extend(subscribers);
      const PropFlags=hx__Element.VNodeManager.patchFlags.PropFlags;
      PropFlags.add({
        key:innerProp,
        directive:text ? 'text' :'html',
        value:transform,
        subs:subscribers,
      })
    }
      log(hx__Element)
  }
  function $$dir_SLOT(self, bindings, vnode, hx__Element, metrics){
    let { value, modifiers, key } = bindings;
    if(!key){
      $debug_log(`"$$slot" directive has no key mapping defined to the "slot" element\n\nfailed to normalize slot directive`);
      return;
    }
    modifiers=new Set(modifiers);
    const iswt=!isNativeElement(vnode) && validHouxitWidget(vnode?.GeneticProvider);
    if(!iswt) {
      hx__Element.slot_name=key;
    }else vnode.props[$$slotName]=key;
    const slotBindings=assign({}, hx__Element?.VNodeManager.slotBindings || {});
    const dataBind=slotBindings ? slotBindings[key]?.bindings : undefined;
    if(!hx__Element.LabContext) hx__Element.LabContext={};
    else hx__Element.LabContext=assign({}, hx__Element.LabContext)
    if(value && isDestructureSyntax(value)){
      if(!(destructWarn(value, dataBind, self))) return;
      hx__Element.LabContext=smartDextCtxMerging(hx__Element.LabContext, {
        [$$dexTransformKey]:{
          sourcesArray:[ dataBind ],
          syntaxArray:[ value ]
        }
      });
    }else if(value) hx__Element.LabContext[value]=dataBind;
  }
  function __dilateHandler(self, props, hx__Element, is_hyperscript){
    const { key, item, src } = props;
    if(is_hyperscript || (!isOnListener(src) && !hasAt_bind(src) && !src.startsWith("$$on:") ) || isContextMethodString(self, hx__Element, item)){
      return item;
    }
    return "()=>{ "+item+" }";
  }
  function $$dir_BIND(self, binding, el, hx__Element, metrics){
    const { isRerender, is_hyperscript } = metrics
    let { key, value:item, modifiers, deepKeys, src }= binding;
    item=__dilateHandler(self, { 
      key,
      item,
      src
    }, hx__Element, is_hyperscript );
    let [ subscribers , transform ] = effectDependencyTracking(self, function(){
      return isString(item) ? _$runModelBind(self, item, hx__Element ) : item ;
    });
    const initializedRender=self[$$$operands]?.initializedRender;
    transform = unwrap(transform);
    if(!key && !isPObject(transform)) {
      $debug_log(`"$$bind" Directive attributes binding expects a plain object value when not chained to any attribute/property argument`, self, true);
      return 
    }else if(!key && isPObject(transform)) {
      for(const [ key, attr ] of entries(transform)){
        attributes_hydration({
          key,
          attr
        }, self, hx__Element, metrics, el);
      }
    }else attributes_hydration({
      key,
      attr:transform
    }, self, hx__Element, metrics, el);
    if(!initializedRender && len(subscribers)){
      hx__Element.VNodeManager.patchFlags.subscriptions.extend(subscribers);
      const PropFlags=hx__Element.VNodeManager.patchFlags.PropFlags;
      PropFlags.add({
        key,
        directive:'bind',
        value:transform,
        subs:subscribers,
        deepKeys
      })
    }
  }
  function $$dir_ON(self, bindings, node, hx__Element, metrics){
    let { key, value:attr, deepKeys, modifiers, src } = bindings;
    let options=metrics.options;
    const isWidget=!IS_ELEMENT_NODE(node);
    if(isString(attr)){
      try{
        const funcToken=attr;
        attr=__dilateHandler(self, {
          key,
          item:attr,
          src
        }, hx__Element, metrics.is_hyperscript);
        attr=_$runModelBind(self, attr, hx__Element);
        attr=object_Has_Path(self.__public_model__, funcToken) && isPFunction(attr) ? attr.bind(self.__public_model__) : attr;
      }catch(err){
        $debug_log(`${err}`, self, true);
        return node;
      }
      attr=unwrap(attr)
      if(!isPFunction(attr)){
        $debug_log(`"${name}" event must be wrapped as or in a function \n\non.....on...\n  "${isWidget ?  '' : node.localName}" \n`, self, true);
        return node;
      }
    }
    let opts;
    if(len(modifiers) || len(options)) {
      if(isWidget){
        [ attr, opts ] = _Run_With_Modifiers( null, modifiers, isFunction(attr) ? attr : pass, events, false);
        if(len(options)) assign(opts, options);
      }else {
        _Run_With_Modifiers(node, modifiers, isFunction(attr) ? attr : pass, deepKeys);
        return node;
      }
    }
    if(key) deepKeys=[ key, ...deepKeys];
    if(isWidget){
      if(!node.props[$$$Events]) node.props[$$$Events]={};
      for( let [ ind, ev ] of deepKeys.entries()){
        define(node.props[$$$Events], ev,{ value: new houxitSignal(ev, attr , opts) , enumerable, configurable});
      }
    }else if(IS_ELEMENT_NODE(node)){
      let index=0
      for(let event of deepKeys.values()) {
        if(!IS_VALID_EVENT_HANDLER(event)){
          $debug_log(`"${event}" is not a valid event name`, self, true);
        }else node.addEventListener(event, isFunction(attr) ? attr : pass);
      }
    }
    return node;
  }
  function $$dir_CLONE(self, bindings, vnode, hx__Element, metrics){
    const is_hyperscript=hx__Element.is_hyperscript;
    let { key, value:item, modifiers, deepKeys, directive:name }=bindings;
    modifiers=new Set(modifiers);
    if(!object_Has_Path(self.__public_model__, item)){
      $debug_log(`value "${item}" property value was referenced during render, but not initializedRender on model or is undefined\n\nat at\n ..."${name} directive on ${isWidget ? '$$clone' : vnode.localName} `,self, true);
      return;
    }
    let ref;
    let subscribers;
    try{
      if(!is_hyperscript){
        [ subscribers, ref ] = effectDependencyTracking(self, function(){
          return get_Object_Value(self.__public_model__, item, modifiers.has('bind'));
        })
      }
      if(ref && !isNull(ref)) ref = get_Object_Value(self.__public_model__, item, modifiers.has('bind'));
    }catch(err){
      $debug_log(`There is a problem with accessing the path "${item}" property which was referenced during render, but seems not initializedRender on model or is undefined\n\nat at\n ..."${name} directive on ${isWidget ? '$$ref' : vnode.localName} `, self, true);
      $debug_log(err)
      return;
    }
    let propPath=item;
    if(isToken(ref)){
      if(isReadonlyToken(ref)){
        $debug_log(`Path provided to the $$clone directive path "${item}" resolves to a readonly ref value\n\nFailed to mutate a readonly ref......at ......."${name}"`, self, true);
        return;
      }
      propPath= item+ref[refInternalEffectKey].accessor;
    }
  }
  function $$dir_MOTION(self, bindings, node, hx__Element, metrics, patchFlags, transit){
    let { value, modifiers } = bindings;
    modifiers=new Set(modifiers);
    const is_hyperscript=hx__Element.is_hyperscript;
    const item=value;
    let subscribers;
    const runBinding= ()=> _$runModelBind(self, value, hx__Element, !modifiers.has('bind'))
    if(!is_hyperscript) {
      [ subscribers, value ] = effectDependencyTracking(self, function(){
        return runBinding()
      } )
    }else value= runBinding();
    value=unwrap(value)
    motionElementNode(self, node, {
      hx__Element,
      modifiers,
      item : value,
    });
  }
  function $$dir_SCOPED(self, bindings, node, hx__Element,  metrics, patchFlags){
    let { value:item, modifiers, directive:name } = bindings;
    modifiers=new Set(modifiers);
    const isStyleEl=isNativeElement(node) && node.localName === 'style';
    if(!isStyleEl) {
      $debug_log(`"$$scoped" directive is only scoped to document <style> elements only`, self, true);
      return node;
    }
    let subscribers;
    let value;
    const runBinding= ()=>_$runModelBind(self, item, hx__Element, !modifiers.has('bind'));
    if(!is_hyperscript){
      [ subscribers, value] = effectDependencyTracking(self, function(){
        return runBinding();
      })
    }else value=runBinding();
    const unwraped=unwrap(value);
    if(isFalse(unwraped) || isNull(unwraped)) return node;
    node.innerHTML=_styleSheet_hydration(self, node.innerHTML);
    return node;
  }
  function $$dir_PROVIDE(self, Binding, vNode, hx__Element, modifiers){
    const node = vNode.GeneticProvider;
    const isWidget=!isNativeElement(node) && validHouxitWidget(node);
    const is_hyperscript=hx__Element.is_hyperscript;
    let { directive, value, key, }=Binding;
    vNode.props[$$$context]=createObj('Provide', { 
      prop:value
    });
    return node;
  }
  function $$dir_MODEL(self, bindings, node, hx__Element, metrics){
    let { value:item, modifiers, key, }=bindings;
    let initVal='';
    try{
      initVal=get_Object_Value(self.__public_model__, item, true);
    }catch(err){
      $debug_log(`undefined reference for directive "$$model"\n\n "${item}" is not defined on widget model instance\n\n${err}`, self, true);
      return
    }
    function compileStraightModelBinding(element, failSilently=false){
      if(!Is_Form_Element(element) ){
        $debug_log(`Compilation Error::\n\n cannot bind a data model to  a none form element\n\n`, self, true);
        if(failSilently) $warn("widget root element is not a form element", self);
        return;
      }
      element.value=compileToRenderable(unwrap(initVal));
      const eventName=get_Model_Event(element);
      if(eventName){
        element.addEventListener(eventName, function(){
          try{
            set_Object_Value(self.__public_model__, item , element.value );
            hx__Element.render_tracked=true;
          }catch(err){
            $debug_log(`${err}`, self, true);
          }
        });
      }
      hx__Element.patch_tracks.add({
        'model:Value':item,
        initialValue:unwrap(initVal),
        "parent:instance":self
      });
      if(failSilently){
        self.__public_model__._observe(item, (newV, oldV)=>{
          if(!deepEqualityCheck(newV, oldV)){
            element.value=unwrap(newV);
          }
        })
      }
    }
    if(!isNativeElement(node) && validHouxitWidget(node)){
      if(!node.props) node.props=createObj('props');
      if(!hasOwn(node.props, $$$ModelUpdateKey)) node.props[$$$ModelUpdateKey]={};
      node.props[$$$ModelUpdateKey]['resourceModel:IPAddress:Binding']=new houxitSignal("resourceModel:IPAddress:Binding", compileStraightModelBinding, {});
    }else{
      compileStraightModelBinding(node)
    }
  }
  const DirectiveMacros={
    bind:$$dir_BIND,
    html:$$dir_HTML,
    text:$$dir_HTML,
    scoped:$$dir_SCOPED,
    model:$$dir_MODEL,
    on:$$dir_ON,
    motion:$$dir_MOTION,
    clone:$$dir_CLONE
  }
  function motionElementNode(self, vnode, binding){
    const { directive } = binding;
  }
  function get_Model_Event(vnode ){
    const tag=vnode.localName;
    const type=vnode.type;
    if(IS_ELEMENT_NODE(vnode) && Is_Form_Element(vnode)){
      if(tag === 'input') return _mapValue(['file'], type) ? 'change' : _mapValue(['button','submit','reset'], type) ? 'click' : _mapValue(['image','hidden'], type ) ? 'change' : 'input';
      return tag === 'form' ? 'submit' : tag === 'select' ? 'change' : tag === 'textarea' ? 'input' : 'input';
    }
  }
  function _compileToStaticTemplateScaffold(self, render, recursive=false){
    render= __HouxitHTMLParser__(render, [] )
    return len(NodeList) && len(NodeList) > 1 ? h(Fragment, NodeList) : len(NodeList) ? NodeList.pop() : [] ;
  }
  function scaffold(render){
    render=isPFunction(render) ? render() : render;
    if(!isChildrenNode(render)){
      $debug_log(`Illegal value type passed to scaffold `);
      return;
    }else if(isPrimitive(render) && !isNull(render)) render=String(render);
    return _compileToStaticTemplateScaffold(this, render);
  }
  function hyperscriptElArgumentsValidator(args){
    const [ type , propsOrChildren , childrenOrProps ] = args ;
    if(  len( args ) > 3 ) {
      $debug_log( `h render function cannot receive more than 3 arguments\n\n"...........${ len( args ) }" received" `  )
      return false ;
    }else if( !validateType( type , [ String , Object , Function , HTMLElement ] )  ) {
      $debug_log( `parameter 1 at h macro expects a native Element name or a widget options instance dataType `) ;
      return false ;
    }else if( isPObject( propsOrChildren ) && !isChildrenObj(propsOrChildren) && isPObject( childrenOrProps ) && !isChildrenObj(childrenOrProps) ) {
      $debug_log( `Unintended plain object parsed at parameter 2 and 3 of h render macro\n\nplain objects are considered as props and cannot be duplicated`) ;
      return false ;
    }else if( ( exists( propsOrChildren ) && isChildrenNode( propsOrChildren ) )  && ( exists( childrenOrProps ) && isChildrenNode( childrenOrProps ) ) ) {
      $debug_log( `arguments 2 and arguments 3 of h render receives duplicated identical Vnodes instance \n\nRenderable Vnodes cannot be duplicated` );
      return false ;
    }
    return true ;
  }
  function propsAndChildrenGetter( type , propsOrChildren , childrenOrProps ) {
    if(!hyperscriptElArgumentsValidator( [ ...arguments ] ))  return [ ] ;
    let props ;
    const lab = new Set() ;
    if( isPObject( propsOrChildren ) && !isChildrenNode( propsOrChildren ) ) { 
      props = propsOrChildren ;
      lab.add( 'propsOrChildren' ) ;
    }else if( isPObject( childrenOrProps ) && !isChildrenNode( childrenOrProps ) ) { 
      props = childrenOrProps ;
      lab.add( 'childrenOrProps' ) ;
    }
    if( !lab.has( 'propsOrChildren' ) && isChildrenNode( propsOrChildren ) ) childrenOrProps = propsOrChildren ;
    lab.clear();
    return {
      type,
      props,
      children: childrenOrProps
    };
  }
  function _hyperscriptCompiler_() {
    return defineVNode(propsAndChildrenGetter( ...arguments )) ;
  }
  function h(type, propsOrChildren, childrenOrProps){
    return _hyperscriptCompiler_(...arguments);
  }
  class BaseWidget {
    constructor(options){
      if(!options) {
        let model=new Model();
        this.model=model;
        define( this, 'model', { 
          get(){
            return model
          },
          set(modelX){
            if(!isPObject(modelX)){
              $debug_log(`Unexpected assignment to the model instance object\n\nassignment expects a plain object`);
              return false;
            }
            model=modelX;
            return true;
          }
        })
      }else if(isPObject(options)) {
        for(const [key, value] of entries(options)){
          this[key]=value;
        }
      }else if(isPFunction(options)){
        this.build=options;
        if(opts && isPObject(opts)) {
          if(hasProp(opts, 'build')) delete opts.build;
          assign(this, opts);
        }
      }else if(isClass(options)){
        options=new options();
        if(!isBaseWidget(options)){
          $debug_log('class widget not an instance of the "Widget" base Widget');
        }else{
          for(let [key, value ] of entries(options)){
            this[key]=value;
          }
        }
      }
    }
    define(widget){
      return defineWidget(...arguments);
    }
  }
  class Widget extends BaseWidget{
    constructor(...args){
      super(...args);
    }
  }
  class Build extends Widget {
    constructor(){ 
      super()
      this[$$BuiltinWidgetKey]='hx:build'
    }
    name='Build'
    params={ 
      self:{
        type:[Object, Function, String], 
        required:true
      }
    }
  }
  class Fragment extends Widget {
    constructor(){ 
      super();
      this[$$BuiltinWidgetKey]='hx:fragment'
    }
    name='Fragment'
    buildConfig={
      debug:false
    }
  }
  class Self extends Widget {
    constructor(){ 
      super()
      this[$$BuiltinWidgetKey]='hx:self'
    }
    name='Self'
  }
  class Motion extends Widget {
    constructor(){
      super()
      this[$$BuiltinWidgetKey]='hx:motion'
    }
    name='Motion'
    
  }
  class Suspense extends Widget{
    constructor(){
      super()
      this[$$BuiltinWidgetKey]='hx:suspense'
    }
    name='Suspense'
  }
  class Memo extends Widget {
    constructor(){
      super();
      this[$$BuiltinWidgetKey]='hx:memo'
    }
    name='Memo'
  }
  class Portal extends Widget {
    constructor(){
      super()
      this[$$BuiltinWidgetKey]='hx:portal'
    }
    name="Portal"
    params={
      target:{
        type:[String, Element ],
        required:true
      },
      disabled:{
        type:Boolean,
        default:false
      }
    }
  }
  class Provider extends Widget{
    constructor(){
      super()
      this[$$BuiltinWidgetKey]='hx:provider'
    }
    name="Provider"
  }
  const BUILT_IN_WIDGETS={ 
    'hx:fragment':Fragment, 
    'hx:build':Build, 
    'hx:self':Self, 
    'hx:motion':Motion, 
    'hx:memo':Memo, 
    'hx:portal':Portal,
    'hx:suspense':Suspense,
    'hx:provider':Provider
  }
  function appendSygnals(){
    for(let [ name, widget ] of entries(BUILT_IN_WIDGETS)){
      widget[$$BuiltinWidgetKey]=name;
    }
  }
  appendSygnals();
  function animate(){
    
  }
  function transite(){
    
  }
  const garbageKey=Symbol();
  function _transformTheParamsInjectorHook(params){
    const self=getCurrentRunningEffect({
      name:'useParams'
    })
    if(!self && !(validateCollectionArgs(arguments, {
      name:"useParams",
      validators:[Array, Object],
      count:1
    } ))) return self.__public_model__.$params;
    paramsManager(self, {
      props:self[$$$core]?.opts?.props || {},
      params
    }, true);
    return self.__public_model__.$params
  }
  function useParams(params){
    return _transformTheParamsInjectorHook(...arguments)
  }
  function _composersSlotsMappingHook(slots){
    const self=getCurrentRunningEffect({
      name:'useSlots'
    })
    if( !self && (!validateCollectionArgs(arguments, { 
      name: "useSlots",
      count:1,
      validators:[Array]
    }))) {
      defineFallbackSlotsToken(self, {
        slots:[]
      }, self[$$$core].slots);
      return self[$$$core].slots;
    }
    for(const [index, sl ] of slots.entries()){
      if(!isString(sl)) {
        $debug_log(`useSlots() adapter macro array value expects a String value\n\nat array index ..........${index}`, self, true);
        continue;
      }
    }
    defineFallbackSlotsToken(self, { 
      slots 
    }, [], self[$$$core].slots );
    return self[$$$core].slots;
  }
  function useSlots(slots){
    return _composersSlotsMappingHook(...arguments);
  }
  function _defineSignalsEvents(signals){
    const self=getCurrentRunningEffect({
      name:'useSignals'
    })
    if(!self && !(validateCollectionArgs(arguments, {
      name:"useSignals",
      count:1,
      validators:[Array]
    }))) return self.__public_model__.$signals;
    $construct_With_Signals(self, { 
      signals 
    }, true);
    for(const [key, value] of entries((self[$$$core].opts.props||{})[$$$Events]||{})){
      const transformKey=toCamelCase(`on-${key}`);
      if(hasOwn(self.__public_model__.$attrs, transformKey) && hasOwn(self.__public_model__.$signals, key)){
        delete self.__public_model__.$attrs[transformKey];
      }
    }
    return self.__public_model__.$signals
  }
  function useSignals(signals){
    return _defineSignalsEvents(...arguments)
  }
  function _compilerOptionsConfigHook(config){
    const self=getCurrentRunningEffect({
      name:'defineConfig'
    })
    if(!self && !(validateCollectionArgs(arguments, {
      name:"defineConfig",
      count:1,
      validators:[Object]
    }))) return
    setConfig(self, { 
      buildConfig: config 
    });
    return void 0
  }
  function defineConfig(config){
    return _compilerOptionsConfigHook(...arguments);
  }
  function makePublish(publish){
    const self=getCurrentRunningEffect({
      name:"makePublish"
    })
    if(!self && !(validateCollectionArgs(arguments, {
      name:"makePublish",
      validators:[Object],
      count:1
    } ))) return false;
    mapPublicationsTraverse(self, { 
      publish(){
        return publish;
      }
    })
    return true;
  }
  function useTransmit(transmit){
    const self=getCurrentRunningEffect({
      name:'useTransmit'
    })
    if(!self && !(validateCollectionArgs(arguments, {
      name:"useTransmit",
      validators:[[Array, Object]],
      count:1
    } ))) return false;
    return transmitPublicationPrefix(self, { 
      transmit 
    });
    return true
  }
  function useContext(context){
    const self=getCurrentRunningEffect({
      name:'useContext'
    })
    if(!self && !(validateCollectionArgs(arguments, {
      name:"useContext",
      validators:[Function],
      count:1
    } ))) return false;
    if(!hasOwn(self[$$$core].opts, "context")){
      self[$$$core].opts.context=function context(){
        return context.call(this);
      }
    }
    return true;
  }
  function runLifeCircleHooksAdapter(args, name){
    const self=getCurrentRunningEffect({ name });
    const response = validateCollectionArgs(args, {
      count:1,
      name,
      validators:[Function],
      required:[true]
    })
    if(!self && !response ) return false;
    self[$$$compiler][garbageKey][name].add([ ...args ][0]);
    return true;
  }
  function onSlotEffect(){
    
  }
  function onSlotRender(){
    
  }
  function postBuild(callback){
    return runLifeCircleHooksAdapter(arguments, 'postBuild');
  }
  function preMount(callback){
    return runLifeCircleHooksAdapter(arguments, 'preMount');
  }
  function postMount(callback){
    return runLifeCircleHooksAdapter(arguments, 'postMount');
  }
  function preUpdate(callback){
    return runLifeCircleHooksAdapter(arguments, 'preUpdate');
  }
  function onEffect(callback){
    return runLifeCircleHooksAdapter(arguments, 'onEffect');
  }
  function onCatch(callback){
    return runLifeCircleHooksAdapter(arguments, 'onCatch');
  }
  function onTracked(callback){
    return runLifeCircleHooksAdapter(arguments, 'onTracked');
  }
  function postUpdate(callback){
    return runLifeCircleHooksAdapter(arguments, 'postUpdate');
  }
  function preDestroy(callback){
    return runLifeCircleHooksAdapter(arguments, 'preDestroy');
  }
  function postDestroy(callback){
    return runLifeCircleHooksAdapter(arguments, 'postDestroy');
  }
  const resolvableMacros="postDestroy,preDestroy,postMount,preMount,preUpdate,postUpdate,postBuild,useAdapter,onEffect,onTracked,onCatch,onSlotRender,onSlotEffect";
  function useAdapter(widget){
    if(!self && !(validateCollectionArgs(arguments, {
      name:"useAdapter",
      validators:[[Object,Function]],
      count:1
    } ))) return pass;
    return Function('adapter', `
      return function ${widget.name || ""}(propsOrChildren, childrenOrProps){
        return adapter(...arguments)
      }
    `)((propsOrChildren, childrenOrProps)=>{
      return h(widget, propsOrChildren, childrenOrProps);
    });
  }
  async function _use(callback){
    const response = validateCollectionArgs(arguments, {
      count:1,
      name:'use',
      validators:[Function],
      required:[true]
    });
    if(!response) return E_Obj;
    installCurrentRunningEffect(this);
    let program;
    deferTick(()=>{
      program = callback();
    }).then(()=> reinstatePreviousRunningEffect());
    return await program;
  }
  async function use(callback){
    return await _use.call(this, ...arguments);
  }
  function useStyleSheet(styles, config){
    
  }
  function directiveKeyInfo(self, key , dirName){
    
  }
  function genericModelPropTransform(self, key, value, code , mygetters, useModel=false){
    if(isComputedMacro(value)){
      if(!useModel){
        $debug_log(`The computed macro is not allowed in the model option\n\nOnly allowed to be used within the body of the Build method option, in a function based widget or within the <script build> SFW (Single File Widget) build system scope\n\nUse the "computedTokens" option instead if you are using the options API`, self, true);
        return;
      }
    }else if(isReadonlyToken(value)){
      define(self[code], key, mygetters ? mygetters : {
        get(){
          if(isTrue(useModel) && isShallowReadonlyToken(value) && !isStateToken(value)){
            _mountTokenEffect(ref, self)
          }
          return value;
        },
        set(valueX){
          $debug_log(`cannot reassign/mutate a "readonly" ReactiveEffect property\n\n.........on property "${key}"`) ;
          return false;
        }
      })
    }else if(isToken(value) || isStream(value)){
      const statefull=isToken(value) ? isStateToken(value) : isStateStream(value);
      if( useModel && !statefull){
        _mountReactiveWatcher(value, self, true);
      }
      define(self[code], key, { 
        value, 
        enumerable
      } );
    }else self[code][key]=value;
  }
  function modelManager(self, opts){
    if(isNull(opts.model)) return;
    const modelData=isBaseWidget(opts) ? opts.model : new Model() ;
    if(hasOwn(opts, 'model') && isPFunction(opts.model)) {
      try{
        opts.model.call(modelData, self.__public_model__.$params, self.__public_model__.$attrs) ;
      }catch(err){
        $debug_log(`There is an error when running the model method option\n\n${err}`, self, true);
      }
    }
    self.__public_model__=assign( self.__public_model__, modelData );
  }
  function widgetsSetup(opts, self, vnode){
    if(!isNull(opts.widgets)){
      const validNameRegex=/^[_A-Z0-9\-]+/;
      const FirstCharRegex=/^[a-zA-Z_]+/;
      entries(opts.widgets).forEach(([key, widget])=>{
        if(!FirstCharRegex.test(key.at(0)) && !validNameRegex.test(key)){
          $debug_log(`Widget registration failed,\nImproper widget namecasing found at "${key}"\n\nwidget names must atleast start with an uppercase letter or a multi-word string seperated by a hyphen or an underscore and not start with hyphen or a number`, self, true);
          return;
        }
        define(self[$$$register].widgets, key, {
          value:widget,
          enumerable
        });
      })
    }
  }
  const $$isHandler=Symbol()
  function methodsManager(opts, self, vnode){
    if(!opts.handlers) return;
    entries(opts.handlers).forEach(([ind, method])=>{
      if(!isPFunction(method)){
          $debug_log(`widget method option's values must be a method or a function\n\n type of "${getType(method)}" found`, self, true);
          return;
      }
      method[$$isHandler]=true;
      define(self[$$$register].handlers, ind, {
        value:method, 
        enumerable, 
        configurable
      })
    });
  }
  function inDomPropsFallback(self, props, params, garbage){
    const paramsKeys=isArray(params) ? params.values() : isObject(params) ? keys(params) : [];
    let index=0;
    paramsKeys.forEach((key)=>{
      index++;
      if(hasUpperCase(key)){
        const transpiled=to_kebab_case(key);
        if(_mapValue(props, transpiled) && !_mapValue(paramsKeys, transpiled)){
          if(isPObject(params)) {
            define(garbage, transpiled, { value:params[key], enumerable, configurable});
            delete props[transpiled];
          }
        }
      }
    })
  }
  function paramsKeysDefer(self, paramsSet, essenceTags, ){
    const [ props, ind , param ] = essenceTags;
    if(!_mapValue(props || {}, ind)){
      define(paramsSet,ind,{value:undefined, enumerable, configurable, writable});
      return false;
    }else if(props ){
      const value=props[ind];
      if(validateType(value, param)){
        define(paramsSet,ind,{value, enumerable, configurable, writable});
      }else{
        define(paramsSet,ind,{value:undefined, enumerable, configurable, writable});
        $debug_log(`params validation error\n\nproperty validation for widget default value failed, property "${ind}" is of an invalid type\n\n typeof "${param.name}" required`, self, true);
        return false;
      }
    }
  }
  function arrayParamsResolver(self, paramsSet, metrics ){
    const [ props, param ] = metrics ;
    if(props && _mapValue(props, param)){
      const value=!props[param] && !isBoolean(props[param]) ? undefined : props[param];
      paramsSet[param]=value;
    }else paramsSet[param]=undefined; 
  }
  function runObjectifiedParamsValidation(self, paramsSet, objMetrics, PN){
    const [ props, param, ind ] = objMetrics;
    let response = true;
    if(isTrue(param.required) && hasProp(param, 'default')){
      $debug_log(`validation error  .......\n\nthe required validator should not be truthy alongside a default value\nat at\n\n"${ind}" ${PN}`, self, true);
      response = false;
    }else if(hasProp(param, 'required') && !isBoolean(param.required)){
      $debug_log(`The "required" validation options receives an unresolvable value \nat at \n"${ind}" ${PN}\n requires a boolean value`, self, true);
      response = false;
    }else if(!hasProp(param, 'type')){
      $debug_log(`The type validator property is  required\n  Mising at "${ind}" param`, self, true);
      response = false;
    }else if(!validateType(param.type,[Function, Array]) ){
      $debug_log(`unexpected value passed as the type validator option\n expects a function or an Array of type function`, self, true);
      response = false;
    }else if(hasProp(param,'validator') && !isPFunction(param.validator)){
      $debug_log(`The "validator option must be a  function\n\nat ${ind} ${PN}`, self, true);
      response = false;
    }else if(isTrue(param.required) && !_mapValue(props || {}, ind)){
      $debug_log(`Params validation error........\n\nThe ${PN+ ' of the '+'"'+self[$$$ownProperties].name+'"'+' widget' } params is required and seems not to  be provided "\nrequired ${PN} is missing\n\nat at\n  ....."${ind}"  param`, self, true);
      paramsSet[ind]=undefined;
      response = false;
    }
    return response;
  }
  function defaultParamBuffering(self, paramsSet, deferable){
    const [ props, param, ind ] = deferable ;
    if(hasOwn(param, 'default')){
      const defaultValue=()=> isFunction(param.default) ? ( !isAFunction(param.default) ? param.default.call(self.__public_model__) : param.default() ) : param.default;
      if(!hasOwn(props || {}, ind)){
        if(!validateType(defaultValue(), param.type)){
          paramsSet[ind]=undefined;
          $debug_log(`Params validation error .....\n\nproperty validation for widget default value failed, property "${ind}" is of an invalid type\n\n${ isArray(param.type) ? "Matches no type in the validation list" :  'typeof '+ param.type.name+" required"}`, self, true); 
          return false;
        }else paramsSet[ind]=defaultValue() ;
      }
    }
    return true;
  }
  function paramsValidationCircle(self, paramsSet, deferable, pn){
    const [ props, param, ind] = deferable;
    const value=props ? props[ind] :  undefined;
    if(hasOwn(props, ind) && validateType(value, param.type)){
      if(hasOwn(param, 'validator')){
        let valRes=param.validator(value)
        if(!isBoolean(valRes)){
          $debug_log(`${pn} validator option method must return a Boolean value of true/false`, self, true);
          return false;
        }
        if(isFalse(valRes)){
          $debug_log(`Validation for ${pn} ${ind} returned false`, self, true);
          return false ;
        }
      }
      paramsSet[ind]=value
    }else if(hasOwn(props, ind) && !validateType(value, param.type)){
      paramsSet[ind]=undefined;
      $debug_log(`${pn} validation error .....\n\nproperty validation for ${ self ? 'widget' : 'object'} ${pn} value failed, property "${ind}" is of an invalid type\n\n${ isArray(param.type) ? "Matches no type in the required validation list" :  'typeof '+param.type.name+" required" }`, self,  true);
      return false;
    }
    return true;
  }
  function resolveParamsPossibility(self, outlinedMetrics, vnode){
    let [ props, opts, params ] = outlinedMetrics;
    if(isFunctionBasedBuild(self)){
      entries(props).forEach(([ind, attr])=>{
        self.__public_model__.$attrs[ind]=attr;
      });
      return ;
    }
    let paramsSet;
    let rv;
    if(params && len(params)){
      paramsSet=self.__public_model__.$params;
      entries(params).forEach(([ind, param])=>{
        if(has$$_bind(ind)){
          $debug_log(`Params validation error "${ind}" passed to widget as a houxit directive binding
            \n\n
            The "$$" may not be appended or used on a params identifier key name`, 
            self, true);
          return false;
        }
        if(!validationCoreManager(self, params, paramsSet, {
          ind,
          props,
          param
        })) return paramsSet;
      })
    }
    return paramsSet;
  }
  function validationCoreManager(self, params, paramsSet, metrics){
    const { ind , props, param } = metrics;
    if(validateType(param, [Function, Array]) ){
      if(isFalse(paramsKeysDefer(self, paramsSet, [ props, ind, param ]))) return false;//Defer type, runs validation for tyoes in Array and JavaScript prototype Methods tyoes
    }else if(isArray(params) && isChar(param)) arrayParamsResolver(self, paramsSet, [props, param])//array and string based validation
    if(isPObject(param)){
      if(!runObjectifiedParamsValidation(self, paramsSet, [ props, param, ind ], 'params')) return false;//params in object type
      if(!defaultParamBuffering(self, paramsSet, [  props, param, ind ])) return false;//validating defaut values
      if(!paramsValidationCircle(self, paramsSet, [props, param, ind ], "params")) return false;
      if(!hasOwn(paramsSet, ind)) paramsSet[ind]=undefined;
    }
    return true;
  }
  function paramsManager(self, opts, in_build=false, vnode){
    if(in_build) vnode=opts;
    const params= opts.params ;
    const props=assign( {}, vnode.props||{} );
    const garbage={};
    inDomPropsFallback(self, props, params, garbage);
    if(!in_build) defineGetter(self.__public_model__, '$params', new Params())
    if(params && !validateType(params, [ Object, Array ])){
      $debug_log(`Param option type validation failed, \n\n unexpected data type ${getType(params)}`, self,  true);
      return;
    }
    const paramsSet=resolveParamsPossibility(self, [ props, opts, params], vnode);
    if(!paramsSet) return;
    GarbagePropsPrefix(self, paramsSet, garbage, props);
    entries(props||{}).forEach(([ind, value])=>{
      if(!hasOwn(paramsSet||{}, ind) && ind !== $$$Events) {
        self.__public_model__.$attrs[ind]=value;
      }else if(hasOwn(paramsSet || {}, ind) && hasOwn(self.__public_model__.$attrs, ind)) delete self.__public_model__.$attrs[ind];
    });
    if(paramsSet && len(paramsSet)){
      for(const [key, value ] of entries(paramsSet)){
        defineReadonlyGetter(paramsSet, key, value , [ true, false ] );
      }
    }
  }
  function GarbagePropsPrefix(self, paramsSet, garbage, props){
  
  }
  function _hydrate_props(opts, self, vnode, metrics){
    const forwardAttrs=self[$$$core].settings.forwardAttrs;
    if(!forwardAttrs || !isHouxitNativeElement(vnode) || !IS_ELEMENT_NODE(vnode.$element)) return vnode ;
    iterate(self.__public_model__.$attrs).test(([  key, attr ])=>{
      try{
        HTMLAttrsMagnifier(vnode.$element, {
          key,
          attr,
          src:key
        }, vnode, self, {
        
        })
      }catch(err){
        $debug_log(`Encountered a road block during attributes fallthrough forwarding on element "<${vnode.$element.localName}>"\n\nCheck warning details info on attribute "${key}"`, self);
        return Break();
      }
    })
    if(hasOwn(self.__public_model__.$signals, 'resourceModel:IPAddress:Binding')){
      self.__public_model__.$signals["resourceModel:IPAddress:Binding"].fire(vnode.$element, true);
    }
    return vnode;
  }
  const houxitProps="props,children";
  const isHouxitProp=prop=>_mapValue(houxitProps, prop);
  const initBuildInstaceKey=Symbol("<<<!@---initBuild---@>>>");
  const widgetTypeKey=Symbol("[[[widget-typing-system]]]");
  function sanitizedOptions(self, options, vnode){
    const argcount=len(options);
    if(hasOwn(vnode, initBuildInstaceKey)){
      self[$$$ownProperties].isInitialBuild = vnode[initBuildInstaceKey] ;
      delete vnode[initBuildInstaceKey];
    }
    if(hasOwn(vnode, widgetTypeKey)){
      self[$$$ownProperties].widgetType=vnode[widgetTypeKey];
      delete vnode[widgetTypeKey];
    }
    for(const [ key, opt] of entries(options)){
      if(isHouxitProp(key)) pass;
      else if(isValidWidgetOption(key) && !isNodeJSOnlyOption(key) && !validateType(opt, widgetOptionType[key])){
        if(isClassBasedBuild(self) && key === 'model' && !isPObject(opt) || !isClassBasedBuild(self) ){
          $debug_log(`${key} option is of an invalid type, \n\n "${key}" option cannot be a ${getType(opt)} type`, self, true);
          return;
        }
      }else if(nonAFuncMethod(key)){
        if(!isAFunction(opt)) {
          if(isClass(opt)){
            $debug_log(`class function cannot be used as an option\n\n.........at___"${key}"`, self, true);
            return ;
          }
        }else{
          $debug_log(`${key} option expects a method or a "function()" declaration\n\nfound an arrow function`, self, true);
          return;
        }
      }else if(isNodeJSOnlyOption(key)) {
        $debug_log(`"${key}" option is a nodejs only option, and cannot be used in houxit inbrowser compiler`, self, true);
      }else if(!isValidWidgetOption(key)) self[$$$operands]._OPTIONS[key]=opt
    }
  }
  function _hydrateHashToSelector(selector, $Data_Hash){
    const trimmed = selector.trim();
    let modified=trimmed;
    const _Manage_Hash_Class=function(sel, sep){
      const splited=sel.split(sep);
      let fir=splited.shift();
      fir=`${fir}${$Data_Hash}`;
      splited.unshift(fir);
      return splited.join(sep);
    }
    const $make_Tape=function(sep){
      const split=trimmed.split(sep);
      for (let [key, sel] of entries(split)){
        sel=sel.trim();
        sel=_hydrateHashToSelector(sel, $Data_Hash)
        split[key]=sel;
      }
      return split.join(` ${sep} `)
    }
    if(trimmed.startsWith('@g ')) return trimmed.slice(2);
    if(trimmed.includes(',')) return $make_Tape(',');
    if(trimmed.includes('+')) return _Manage_Hash_Class(trimmed, '+')
    if(trimmed.includes('~')) return _Manage_Hash_Class(trimmed, '~')
    if(trimmed.includes('>')) return _Manage_Hash_Class(trimmed, '>')
    if(!trimmed.startsWith('@') && !trimmed.startsWith('body') && !trimmed.includes(':')  ) return trimmed ? `${trimmed}${$Data_Hash}` : trimmed;
    else if(trimmed.includes('::')) return _Manage_Hash_Class(trimmed, '::');
    else if(trimmed.includes(':') && !trimmed.startsWith('@') && !trimmed.startsWith(':')) return _Manage_Hash_Class(trimmed, ':')
    return modified;
  };
  const selectorPattern = /([^\r\n{]+)\s*{/g;
  function _styleSheet_hydration(self, styles){
    return styles.replace(selectorPattern, (match, text)=>{
      return _hydrateHashToSelector(text, `[data-hx_hash_=${self[$$$ownProperties].hx_hash_}]`)+'{';
    });
  }
  function _preCompile_StyleSheet(opts, self, vnode){
    if(IS_TEXT_NODE(vnode?.$element)) return vnode;
    const scopedConfig=self[$$$core].settings.scopedStyleSheet;
    const CssStylesheet=opts.styleSheet ? opts.styleSheet : null;
    if(CssStylesheet){
      const styleEl=generateTemplateElement({ 
        type:'style'
      }, { 
        type:'text/css'
      }, null);
      const ModifiedCssStylesheet=isTrue(scopedConfig) ? _styleSheet_hydration(self, CssStylesheet) : CssStylesheet ;
      styleEl.textContent=ModifiedCssStylesheet;
      if(vnode  && !IS_TEXT_NODE(vnode.$element)) vnode.$element.append(styleEl);
    }
    return vnode;
  }
  function assignSlot(self, slot, content, name, assynedSlots, renderedSlotsList, tillMount){
    if(content && isHouxitElement(content) && !hasOwn(renderedSlotsList, name)){
      whenMounted(self, slot, ()=> slot.append(content.$element||""));
      assynedSlots.add(name);
      renderedSlotsList[name]=content
    }
  }
  function resolveSlotsFilter(self, vnode){
    const scopedList={};
    for(const [ key, slt] of entries(self[$$$compiler].scopeSlotsBindings) ){
      scopedList[key]=slt.element;
    }
    return scopedList;
  }
  const shouldForwwardSlots=(element, slots)=>!len(slots) && IS_ELEMENT_NODE(element) && !element.innerHTML.trim() && element?.localName !== 'slot';
  function _$slotHydrationRenderer(self, opts, vnode_build){
    const slots=self[$$$core].slots;
    if(!len(slots) || !vnode_build || !isHouxitElement(vnode_build) || isHouxitTextElement(vnode_build)) return vnode_build ;
    const renderedSlotsList={}
    const slot_elements=resolveSlotsFilter( self, vnode_build ) ;
    const assynedSlots=new Tuple()
    for(const [ slotN, slot_el ] of entries(slot_elements)){
      if(hasOwn(slots, slotN) && !assynedSlots.has(slotN)) {
        assignSlot(self, slot_el, slots[slotN](self), slotN, assynedSlots, renderedSlotsList);
      }
    }
    if(shouldForwwardSlots(vnode_build?.$element, slot_elements) && !len(vnode_build.NodeList)){
      const forwardSlot=self[$$$core].settings.forwardSlot;
      if(forwardSlot) {
        const slotContent=hasOwn(slots, 'default') ? slots.default(self) : null;
        if(slotContent) vnode_build.$element.append(slotContent.$element);
        assynedSlots.add('default');
        renderedSlotsList['default']=slotContent
      }
    }
    if(!len(renderedSlotsList)) return vnode_build 
    for(const [name, content] of entries(renderedSlotsList) ){
      self[$$$core].slotsFactory.renderedSlotsList[name]=content;
    }
    return vnode_build;
  }
  function injectCustomDirective(self, options, vnode){//custom directives installer
    if(hasProp(options,'directives')){
      for(let [key, value] of entries(options.directives)){
        if(!validateType(value, [ Object, Function])){
          $debug_log(`a directive requires an object of directive hooks or a function to act as a "mounted" hook `, self, true); 
          return;
        }
        define(self[$$$register].directives, has$$_bind(key) ? key.slice(2) : key, {
          value, 
          enumerable, 
          configurable,
          writable
        });
      }
    }
  }
  const configOptionsSettings = keys(ConfigValidator).join(',') ;
  function mapSettingCheck(self, key, setting){
    self=!isHouxitBuild(self) ? null : self
    if(!_mapValue(configOptionsSettings, key)){
      $debug_log(`unrecognised settings option found in buildConfig defineConfig  at   at\n"${key} name property`,self, isHouxitBuild(self));
      return false;
    }else if(!validateType(setting, ConfigValidator[key])){
      $debug_log(`${key} config option of buildConfig receives an invalid type\n\nExpects a/an "${ConfigValidator[key].name.toLowerCase()}" type`, self, isHouxitBuild(self));
      return false;
    }
    if(key === 'delimiters'){
      let rv=validateDelimiterConstruct(self, setting);
      if(isFalse(rv)) return false
    };
    return true;
  }
  function setConfig( self, opts ){
    if(!opts.buildConfig || !len(opts.buildConfig)) return false;
    entries(opts.buildConfig).forEach(([key, setting])=>{
      let rv= mapSettingCheck(self, key, setting);
      if(isFalse(rv)) return false;
      define(self[$$$core].settings, key,{
        value:setting, 
        enumerable,
        configurable
      });
    })
    return true
  }
  const globalProps="filters,widgets,directives,handlers,publish,blocks,mixins";
  const exceptionsOptions="children,props";
  const flushOptions="post,sync"
  class _OBS{
    flushType='post'
    constructor(self, propOrGetter, oldValue, callback, options, depps){
      this.propOrGetter=propOrGetter;
      this.oldValue=oldValue;
      this.callback=callback;
      this.self=self
      this.options=options;
      this.depps=depps
      if(isTrue(options.initial)) {
        depps.value = this.callback.call(self.__public_model__, ...this.wrapValueArgs(self));
      }
      if(hasOwn(options, 'flushType')){
        const flushType=options.flushType
        if(!isString(flushType) && !_mapValue(flushOptions, flushType)){
          $debug_log(`unrecognised flushType options received\n\nvakue "${flushType}" is not a vailid flushType`, self, true);
        }else this.flushType=flushType
      }
    }
    getNewV(self){
      return getObsCurrentValue(self, this.propOrGetter ) ;
    }
    shouldTrigger(self){
      return !deepEqualityCheck(this.oldValue, this.getNewV(self));
    }
    trigger(self){
      if(this.shouldTrigger(self)){
        this.depps.value=this.callback.call(self.__public_model__, ...this.wrapValueArgs(self));
        this.oldValue=this.getNewV(self);
      }
    }
    wrapValueArgs(self){
      if(isArray(this.oldValue)){
        const list=[]
        const newValue=this.getNewV(self)
        for (const [key, valueX] of this.oldValue.entries()){
          const content=[newValue[key], valueX ]
          list.push(content)
        }
        return list
      }else{
        return [ this.getNewV(self), this.oldValue , function stopEffect(){
          this.stopEffect(self, this);
        } ]
      }
    }
    stopEffect( self, obs){
      self[$$$operands]._OBSERVERS.delete(obs);
    }
  }
  function Observer_Track(self, opts){
    entries(opts.observers||{}).forEach(([name, method])=>{
      EffectObserver.call(self.__public_model__, name, method);
    })
  }
  async function _EffectDependencyNotifier(self){
    self[$$$operands]._OBSERVERS.values().forEach((obs)=>{
      obs.trigger(self);
    })
  }
  function RuntimeUtilitiesProvide( self , opts, vnode ) {
    defineGetter( self.__public_model__ , "_observe" , EffectObserver.bind( self ) ) ;
    defineGetter( self.__public_model__ , "_deferTick" , deferTick.bind( self ) ) ;
    defineGetter( self.__public_model__ , "_useAgent" , useAgent.bind( self ) ) ;
    defineGetter( self.__public_model__ , "_write", WRITE.bind( self ) ) ;
    defineGetter( self.__public_model__ , "_effectHook" , EffectAdapterHook.bind( self ) ) ;
    defineGetter( self.__public_model__ , "_pushEffect" , pushEffect.bind( self ) ) ;
  }
  function __useModelAdapter__( props ) {
    if(!validateCollectionArgs(arguments, {
      min:0,
      max:1,
      validators:[Object],
      required:[false],
      name:"useModel"
    })){
      return undefined
    }
    let self = isHouxitBuild(this) ? this : getCurrentRunningEffect({
      name:"useModel",
      silently:isModelInstance(this)
    });
    if(!self){
      if(isModelInstance(this)){
        for(let [ key, value ] of entries(props)){
          this[key] = value;
        }
      }
      return undefined;
    }
    if( props && !isPObject( props ) ) {
      $debug_log( `argument at position 1 of the "useModel" utils macro expects a plain object` , self , true ) ;
      return ;
    } else if( !props || !len(props) ) return self.__public_model__ ;
    for( let [ key , value ] of entries( props ) ) {
      if( !object_Has_Path( self.__public_model__ , key ) && (!isProxySkipped( key ) && key !== '$params')) genericModelPropTransform( self , key , value , '__public_model__' , null , true ) ;
      else if(object_Has_Path( self.__public_model__ , key ) && !isProxySkipped( key ) && ! key === "$params") self.__public_model__._write( { [ key ] : value } ) ;
    }
    return self.__public_model__ ;
  }
  function useModel(props){
    return __useModelAdapter__.call(this, props)
  }
  function checkObserversValidations(self, propOrGetter, callback){
    const errArgs=()=>[ self, true, 'During the call of the "effect" macro'];
    if(!validateType(propOrGetter, [Function, String, Array, Tuple, Set])){
      $debug_log(`proplem setting Observer for tracked Dependency value "${propOrGetter}"\n\n invalid type`, ...errArgs());
      return false
    }else if(!isPFunction(callback)){
      $debug_log(`observer callback expects a plain function method`);
      return false
    } else if(isString(propOrGetter) && !object_Has_Path(self.__public_model__, propOrGetter)){
      $debug_log(`undefined property "${propOrGetter}" accessed in effect  macro`, ...errArgs());
      return false
    }
    return true
  }
  function getObsCurrentValue(self, propOrGetter){
    const list=[]
     let response;
    if(validateType(propOrGetter, [Function, String])){
      response=isFunction(propOrGetter) ? propOrGetter() : get_Object_Value(self.__public_model__, propOrGetter);
    }else{
      propOrGetter=!isArray(propOrGetter) ? arrSet(propOrGetter) : propOrGetter;
      propOrGetter.forEach((value)=>{
        response=isPFunction(value) ? value() : get_Object_Value(self.__public_model__, value);
        list.push(unwrap(response));
      })
    }
    return !validateType(propOrGetter, [Function, String]) ? list : unwrap(response);
  }
  function _observeAdapter_(propOrGetter, callback, options){
    const self=getCurrentRunningEffect({
      name:'observe'
    })
    if(!self && !(validateCollectionArgs(arguments, {
      name:"observe",
      validators:[[Function, Array, String], Function, Object],
      min:2,
      max:2,
      required:[true, true]
    } ))) {
      if(!self) $debug_log(`You can't use the "_observe()" adapter within a widget public model instance`);
      return
    }
    return EffectObserver.call(self, ...arguments );
  }
  function observe(propOrGetter, callback, options){
    return _observeAdapter_(propOrGetter, callback, options);
  }
  function EffectObserver(propOrGetter, callback, options){
    if(len(arguments) === 3 && !isPObject(options)){
      $debug_log(`parameter 3 arguments of effect observer expects a plain object`);
      return 
    }
    let rv=checkObserversValidations(this, propOrGetter, callback);
    if(isFalse(rv)) return;
    if(isArray(propOrGetter)){
      propOrGetter.forEach((value)=>{
        rv=checkObserversValidations(this, value, callback);
        if(isFalse(rv)) return
      })
    }
    const effectDeps={
      value:undefined
    }
    const observer=new _OBS(this, propOrGetter, getObsCurrentValue(this, propOrGetter), callback, options || {}, effectDeps)
    this[$$$operands]._OBSERVERS.add(observer);
    const self=this
    return function stopEffect(callback){
      if(!self[$$$operands]._OBSERVERS.has(observer)){
        $debug_log(`effect observer has already been stopped`, self, true);
        return false;
      }
      observer.stopEffect(self, observer);
      if(isPFunction(callback) ) {
        let returnValue=undefined
        if(hasOwn(callback, effectHookValueKey)) returnValue=callback[effectHookValueKey];
        else returnValue = effectDeps.value;
        callback.call(self.__public_model__, returnValue);
        return true;
      }else if(len(arguments) && !isPFunction(callback)) {
        $debug_log(`callback at effect stopper expects a plain function`, self, true);
        return false;
      }
    }
  }
  function map_Events_Fall(self, options, vnode){
    defineGetter(self.__public_model__, '$attrs', new Attrs());
    if(!vnode.props || !vnode.props[$$$Events]) return;
    for(let [ name, value ] of entries(vnode.props[$$$Events])){
      value=value.callback;
      define(self.__public_model__.$attrs, toCamelCase("on-"+name), { 
        value , 
        enumerable, 
        configurable 
      });
    }
    // delete vnode.props[$$$Events];
  }
  function $construct_With_Signals(self, options, in_build=false, vnode){
    if(in_build) vnode = options
    if(vnode.props && hasOwn(vnode.props, $$$ModelUpdateKey)){
      if(len(vnode.props[$$$ModelUpdateKey])){
        if(!options.signals) options.signals=[];
        if(!hasOwn(vnode.props, $$$Events)) vnode.props[$$$Events] = {}
        for(const [eventName, signal] of entries(vnode.props[$$$ModelUpdateKey])){
          self.__public_model__.$signals[eventName]=new Signal(eventName, signal?.callback || pass, signal?.options);
        }
      }
    }
    const $$events=((in_build ? self[$$$core].opts : vnode)?.props||{})[$$$Events]
    if(!len(options.signals) && !$$events ) return;
    const signals=new Set(options.signals);
    for(const  [ key, event] of entries( $$events || {})){
      if(!hasOwn((vnode?.props||{})[$$$ModelUpdateKey] || {}, key) && signals.has(key)){
        self.__public_model__.$signals[key]=new Signal(key, event?.callback || pass, event?.options);
      }
    }
    for(const signal of (options.signals || []).values()){
      if('resourceModel:IPAddress:Binding' === signal){
        $warn(`"resourceModel:IPAddress:Binding" defined signal is a houxit built in signal name`, self);
        continue;
      }
      if(!hasOwn(self.__public_model__.$signals, signal)){
        self.__public_model__.$signals[signal]=new Signal(signal, pass )
      }
    };
  }
  function resolveCustomFiltersOrBlocks(self, options, optName, vnode){
    if(!hasOwn(options, optName) || !len(options[optName])) return;
    const sName=optName.slice(0, -1)
    for(const [name, filter] of entries(options[optName])){
      if(optName === 'blocks' ? isBuiltinBlocks(name) : _mapValue(BUILT_IN_FILTERS, name)){
        $debug_log(`registration failure\nFailed to register the custom ${sName} with the name "${name}\n\n Which collides with a BUILT_IN_${sName.toUpperCase()} name\nregistration FAILED___`,self, true);
        continue;
      }else if(!validateType(filter, [ Function, Object] )) {
        $debug_log(`${sName.at(0).toUpperCase()+sName.slice(1)} must be a function or an object exposing a "${sName}" method option \n\nat        at\n "${name}" ${sName} registration`, self, true);
        continue;
      }
      if(isObject(filter) && (!hasOwn(filter, sName) || !isPFunction(filter[sName]))){
        $debug_log(`"${name}" ${sName} object must expose a ${sName} method\n\nregistration FAILED___`, self, true);
        continue
      }
      self[$$$register][optName][name]=filter
    }
  }
  function __Ensure_Renderer(self, options, vnode){
    widgetsSetup(options, self, vnode);
    methodsManager(options, self, vnode);
    resolveCustomFiltersOrBlocks(self, options, 'filters', vnode);
    resolveCustomFiltersOrBlocks(self, options, 'blocks', vnode);
    RuntimeUtilitiesProvide(self, options, vnode);
    injectCustomDirective(self, options, vnode);
    __Generate_Widget_Hash(self);
    return options;
  }
  const alphaNum ='A,a,B,b,C,c,D,d,E,e,F,f,G,g,H,h,I,i,J,j,K,k,L,l,M,m,N,n,O,o,P,p,Q,q,R,r,S,s,T,t,U,u,V,v,W,w,X,x,Y,y,Z,z,0,1,2,3,4,5,6,7,8,9,$';
  const alpha ='A,a,B,b,C,c,D,d,E,e,F,f,G,g,H,h,I,i,J,j,K,k,L,l,M,m,N,n,O,o,P,p,Q,q,R,r,S,s,T,t,U,u,V,v,W,w,X,x,Y,y,Z,z'
  const num='0,1,2,3,4,5,6,7,8,9';
  const numRegex=/\d/;
  const alphaNumRegex=/\w/;
  const alphaRegex=/\b/;
  function generateUUID(length, type) {
    const isAlpha=type === 'alpha';
    const isNum=type === 'num';
    let letters=(isAlpha ? alpha : isNum ? num : alphaNum).split(',');
    let id = '';
    let stack=[];
    for(let i = 0; i < len(letters); i=i){
      const randomIndex = Math.floor(Math.random() * len(letters));
      stack.push(letters[randomIndex]);
      letters.splice(randomIndex, 1);
    }
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * len(stack));
      id += stack[randomIndex];
    }
    return isNum ? Number(id) : id;
  }
  function __Generate_Widget_Hash(self){
    let id=generateUUID(10).toUpperCase();
    define(self[$$$ownProperties], 'hx_hash_', {value:`_hx_${id}`, configurable, enumerable});
  }
  function _Data_Hydrations(self, options){
    const vnode=self[$$$core].virtualNode;
    if(hasProp(options, 'buildConfig')) setConfig(self, options);
    paramsManager(self, options, false, vnode);
    modelManager(self, options);
    self.__public_model__=Setup_State_Effect(self, self.__public_model__, true);
    entries(self[$$$register].handlers).forEach(([key, handler])=>{
      define(self.__public_model__, key, { 
        value:handler.bind(self.__public_model__),
        enumerable
      });
      defineGetter(self.__public_model__, "$refs", self[$$$operands].templateTokenizedInputs);
    })
    computedTokensCompile(self, options)
    transmitPublicationPrefix(self, options);
    Observer_Track(self, options);
  }
  class Observer{
    constructor(getter, callback, self){
      this.getter = getter;
      this.callback = callback;
      this.self=self;
      this.value = this.get();
    }
    update() {
      const oldValue = this.value;
      this.value = this.getter();
      if (this.self[$$$operands].PATCH_FLAG && this.self[$$$operands].onRenderTracked && !this.self[$$$operands].garbageWatch){
        deferEventCircleThread(this.self, ()=>{
          deferTick(()=>this.callback(this.value, oldValue));
        })
      }
    }
    get() {
      this.self[$$$core].activeObserver = this;
      const value = this.getter();
      this.self[$$$core].activeObserver = null;
      return value;
    }
  }
  class Dependency {
    constructor(self) {
      this.self=self;
      this.subscribers = new Set();
    }
    depend() {
      if (this.self[$$$core].activeObserver) {
        this.subscribers.add(this.self[$$$core].activeObserver);
      }
    }
    notify() {
      this.self[$$$operands].PATCH_FLAG++
      this.subscribers.forEach((observer) => observer.update());
    }
  }
  function trackDependency(self, dependency) {
    if (self[$$$core].activeObserver) dependency.depend();//call the depend
  }
  function pausePlayEffectScope(self, action){
    if(action === 'pause'){
      self[$$$operands].PATCH_FLAG=0
    }else if(action === 'play'){
      
    }
  }
  function defineProxyScopeProps(obj, config, master){
    const ReactiveEffect=assign(new ReactiveEffectObject(), {
      data_cache:undefined,//for cavged rendrr chsrges
      effectTrigger:pass,//tge pass argument callbact, to be cslled on stream
      effectFlush:new Tuple(),//tuple of effect callbact
      mountWatcher:pass,//to avtivste the effect
      subscribers:new Tuple(),//list of subscritions
      getHandler:pass,//gettrr handlrr, helos in subscrubing to getters
      self:undefined,//widget build instance
      watchGetters:false,
      trackZoom:false,
      effectZoom:false,
      origin:obj,
      onEffectHook:hasOwn(config, 'onEffect') ? config.onEffect : pass,
      onTrackedHook:hasOwn(config, 'onTracked') ? config.onTracked : pass,
      isReadonly:false,
      isShallow:false,
      thisArg:{},
      isStateStream:false
    })
    let value=0;
    define(ReactiveEffect, 'effect_sync', {
      get(){
        ReactiveEffect.getHandler(ReactiveEffect.subscribers.list())
        cleanupSubscribers(ReactiveEffect.subscribers);
        adaptiveStreamHook(ReactiveEffect, master, 'track');
        return value;
      },
      set(valueX){
        value=valueX
        ReactiveEffect.effectTrigger(ReactiveEffect);
        value=0;
        adaptiveStreamHook(ReactiveEffect, master, 'effect');
        return true
      }
    })
    return ReactiveEffect;
  }
  function adaptiveStreamHook(ReactiveEffect, master, type){
    const zoom = `${type}Zoom`;
      const rootEffect = master && isREffObj(master) ? master : ReactiveEffect;
    if(isFalse(rootEffect[zoom])){
      rootEffect[zoom]=true;
      deferTick(()=>{
        rootEffect[`on${type === 'track' ? 'Tracked' : 'Effect' }Hook`]();
      }).then(()=> {
        rootEffect[zoom]=false;
      });
    }
  }
  function subscribeEffect(effObj, sub, master){
    if(!isHouxitBuild(effObj.self) && !(effObj.self || {} )[$$$operands]?.onEffectWatch) pass;
    else if(isHouxitBuild(effObj.self) && (effObj.self || {} )[$$$operands]?.onEffectWatch){ 
      effObj.self[$$$core].effectSubscribers.extend(sub);;
    }else if(isREffObj(master)) {
      if(master.watchGetters) master.subscribers.extend(sub);
    }
  }
  const EffectReactiveMaster=(master)=>{
    return isREffObj(master) ? master.self : undefined ;
  }
  function proxyEffectDeepConversion(obj, ReactiveEffect, deep, config, master){
    for(let [key , value] of getIterator(obj)){
      if(isToken(value)){
        function refMount(_){
          ReactiveEffect.effect_sync++
        }
        refMount.init=function(eff){
          eff.self=EffectReactiveMaster(master);
        }
        refMount.getHandler=function(subscribers){
          subscribeEffect(ReactiveEffect, subscribers);
          ReactiveEffect.effect_sync;
        }
        _mountTokenEffect(value, refMount);
      }else if(_isProxyStream(value) || isTrue(validateType(value, [Object, Array, Tuple, Set, Map]) && !isProxySkipped(key) && !(isPFunction(value) && value[$$isHandler]) && !isToken(value) && !isRaw(value))){ 
        if(!_isProxyStream(value)) value=_createStream(value, config, master );
        function effectMount(){
          ReactiveEffect.effect_sync++;
        }
        effectMount.init=function(eff){
          eff.self=EffectReactiveMaster(master);
        }
        _mountProxyStream(value, effectMount, true)
        // ReactiveEffect.mountWatcher( effectMount, function(subscribers){
        //   subscribeEffect(ReactiveEffect, subscribers);
        //   ReactiveEffect.effect_sync;
        // });
        obj[key]=value;
      }
    }
  }
  function streamMutationTransform(args, object, effObj, name, config, master, oldValue){
    const { isReadonly = false , isShallow = false } = config;
    args = [ ...args ]
    const [ target, prop, valueX, receiver ] = args ;
    const desc = {
      ...valueX
    }
    let value = desc.value;
    if(prop === $$$StreamProxyKey) {
      Reflect[name](...args);
      return true;
    }
    if(isReadonly && (name === 'deleteProperty' || !isReadonlyBypasser(value)) ){
      $debug_log(`Cannot reassign/mutate a "readonly" stream prop\n\n___MUTATION FAILED___\n........"{}.${prop}" property assignment/mutation \n\n{##} object props are readonly \n.........>>>bypassKey verification failure`);
      return false;
    }else if(isReadonly && (!name === 'deleteProperty' || isReadonlyBypasser(value))){
      value =  value[bypassSymbol]
    }
    if( !isPrimitive(value) && !isShallow && !isToken(value) && !isStream(value) ){
      value = _createStream(value, {
        ...config 
      }, master ) ;
      valueX.value = value;
    }
    function mounter(){
      effObj.effect_sync++
    }
    mounter.getter=function getter(subscribers){
      subscribeEffect(effObj, subscribers)
      effObj.effect_sync;
    }
    _mountReactiveWatcher(valueX, mounter, true);
    Reflect[name](...args);
    effObj.effect_sync++;
    return true;
  }
  function collectionStreamEffectNotifier(effObj, ...args){
    effObj.effect_sync++;
  }
  function createCollectionStream(obj, ReactiveEffect ){
    if(isCollection(obj)){
      function effectNotifier(){
        return collectionStreamEffectNotifier.call(this, ReactiveEffect, ...[ ...arguments ]);
      }
      if(isMap(obj)) obj = _createMapStream(obj, effectNotifier);
      else if(isSet(obj)) obj = _createSetStream(obj, effectNotifier);
      else if(isTuple(obj)) obj= _createTupleStream(obj, effectNotifier);
      else if(isArray(obj)) obj = _createArrayStream(obj, effectNotifier);
    }
    return obj;
  }
  function _createStream(obj, config, master ){
    if(isStream(obj) || isToken(obj) || isDomSpecialConstructor(obj)) return obj
    const response=validateCollectionArgs(arguments, {
      max:3,
      min:1,
      validators:[[Object, Array, Tuple, Set, Map], Object ],
      name:'stream'
    });
    if(!response) return E_Obj;
    config = isPObject(config) ? config : {};
    const { isShallow=false, isReadonly=false } = config;
    const streamMap=new WeakMap();
    const useDeep= !isShallow && isFalse(isShallow);
    const ReactiveEffect = defineProxyScopeProps(obj, config, master );
    ReactiveEffect.isShallow=isShallow;
    ReactiveEffect.isReadonly=isReadonly;
    obj = createCollectionStream(obj, ReactiveEffect);
    if(isTrue(useDeep)) proxyEffectDeepConversion(obj, ReactiveEffect, useDeep, config, master);
    obj = transformProxyStream(obj, ReactiveEffect, config, master);
    define(obj, $$$StreamProxyKey, { 
      value : streamMap,
      enumerable,
      writable
    });
    ReactiveEffect.mountWatcher=function mountWatcher(callback, getHandler){
      ReactiveEffect.effectTrigger=callback;
      if(isFunction(getHandler)) ReactiveEffect.getHandler=getHandler;
      if(hasOwn(callback, 'init')) callback.init(ReactiveEffect);
    }
    streamMap.set(obj, ReactiveEffect);
    const self = getCurrentRunningEffect({
      silently:true
    });
    if(isHouxitBuild(self)) _mountReactiveWatcher(obj, self, true);
    return obj;
  }
  function transformProxyStream(obj, ReactiveEffect, config, master){
    if(validateType(obj, [Object, Array, Tuple ])) return new Proxy(obj, {
      get(target, prop){
        const getter=()=> Reflect.get(...arguments);
        hydrateEffectSubs(ReactiveEffect)
        if(ReactiveEffect.watchGetters) subscribeEffect( ReactiveEffect, [ getter ]);
        let effect_sync=ReactiveEffect.effect_sync;
        return getter();
      },
      set(target, prop, value, receiver){
        return streamMutationTransform(arguments, obj, ReactiveEffect, 'set', config, master);
      },
      defineProperty(target, prop, value, receiver){
        return streamMutationTransform(arguments, obj, ReactiveEffect, 'defineProperty', config, master);
      },
      deleteProperty(target, prop, value, receiver){
        return streamMutationTransform(arguments, obj, ReactiveEffect, 'deleteProperty', config, master);
      },
      // apply(target, thisArg, args ){
      //   return Reflect.apply(...arguments);
      // }
    });
    else return obj;
  }
  function streamReactiveHook(X, args, name, callback){
    const res = X.prototype[name].call(this, ...args);
    callback.call(this,...args);
    return res;
  }
  function _createTupleStream(tuple, callback){
    class TupleStream extends Tuple{
      constructor(){
        super(...arguments);
      }
      add(){
        return streamReactiveHook.call(this, Tuple, arguments, 'add', callback);
      }
      pop(){
        return streamReactiveHook.call(this, Tuple, arguments, 'pop', callback);
      }
      shift(){
        return streamReactiveHook.call(this, Tuple, arguments, 'shift', callback);
      }
      unshift(){
        return streamReactiveHook.call(this, Tuple, arguments, 'unshift', callback);
      }
      splice(){
        return streamReactiveHook.call(this, Tuple, arguments, 'splice', callback);
      }
      extend(){
        return streamReactiveHook.call(this, Tuple, arguments, 'extend', callback);
      }
      delete(){
        return streamReactiveHook.call(this, Tuple, arguments, 'delete', callback);
      }
      clear(){
        return streamReactiveHook.call(this, Tuple, arguments, 'clear', callback);
      }
      prepend(){
        return streamReactiveHook.call(this, Tuple, arguments, 'prepend', callback);
      }
      replace(){
        return streamReactiveHook.call(this, Tuple, arguments, 'replace', callback);
      }
    }
    return new TupleStream(...tuple.list());
  }
  function _createArrayStream(array, callback){
    const isSVA=len(array) === 1 && isNumber(array[0]);
    if(isSVA) array.push(undefined);
    class ArrayStream extends Array{
      constructor(array){
        super(...array);
        if(isSVA) this.pop();
      }
      push(){
        return streamReactiveHook.call(this, Array, arguments, 'push', callback);
      }
      pop(){
        return streamReactiveHook.call(this, Array, arguments, 'pop', callback);
      }
      shift(){
        return streamReactiveHook.call(this, Array, arguments, 'shift', callback);
      }
      unshift(){
        return streamReactiveHook.call(this, Array, arguments, 'unshift', callback);
      }
      splice(){
        return streamReactiveHook.call(this, Array, arguments, 'splice', callback);
      }
      sort(){
        return streamReactiveHook.call(this, Array, arguments, 'sort' , callback);
      }
      reverse(){
        return streamReactiveHook.call(this, Array, arguments, 'reverse', callback);
      }
      copyWithin(){
        return streamReactiveHook.call(this, Array, arguments, 'copyWithin', callback);
      }
      fill(){
        return streamReactiveHook.call(this, Array, arguments, 'fill', callback);
      }
    }
    return new ArrayStream(array);
  }
  function _createSetStream(setArg, callback){
    class SetStream extends Set{
      constructor(){
        super(...arguments)
      }
      add(){
        return streamReactiveHook.call(this, Set, arguments, 'add', callback);
      }
      delete(){
        return streamReactiveHook.call(this, Set, arguments, 'delete', callback);
      }
      clear(){
        return streamReactiveHook.call(this, Array, arguments, 'clear', callback);
      }
    }
    return new SetStream(...setArg)
  }
  function _createMapStream(map, callback){
    class MapStream extends Map{
      constructor(){
        super(...arguments);
      }
      set(){
        return streamReactiveHook.call(this, Map, arguments, 'set', callback);
      }
      clear(){
        return streamReactiveHook.call(this, Map, arguments, 'clear', callback);
      }
      delete(){
        return streamReactiveHook.call(this, Map, arguments, 'delete', callback);
      }
    }
    return new MapStream(...map)
  }
  function stream(obj, config){
    return _createStream(...arguments)
  }
  function shallowStream(obj, config){
    return stream(obj, {
      isShallow:true,
      ...( isObject(config) ? config :  {})
    })
  }
  function readonlyStream(obj, config){
    return stream(obj, {
      isReadonly:true, 
      ...( isPObject(config) ? config : {} )
    })
  }
  function shallowReadonlyStream(obj, config){
    return readonlyStream(obj, {
      isShallow:true,
      ...( isObject(config) ? config :  {})
    } );
  }
  function Setup_State_Effect(self, obj ){
    const dependency = new  Dependency(self);
    self[$$$operands].dependency=dependency;
    for(let [key , value] of entries(self.__public_model__.$params)){
      _mountTokenEffect(value, self, true);
    }
    obj=_createStream(obj, {} );
    _mountProxyStream(obj, self)
    return obj;
  }
  function generateDependencySubscriptions(self, subscribers){
    if(!self[$$$operands].onEffectWatch) return false;
    subscribers = !isCollection(subscribers) ? [ subscribers ] : arrSet(subscribers);
    self[$$$core].effectSubscribers.extend(subscribers);
    return true;
  }
  function defineGetter(obj, prop, value, desc={}){
    const { enumerable=false, writable=false, debug=false }=desc;
    const descriptor={
      get (){
        return value
      },
    }
    if(writable || debug ){
      descriptor.set=function(valueX){
        if(writable){
          value=valueX
        }
        if(debug){
          $debug_log(`"${prop}" prop cannot be assigned`)
        }
      }
    }
    if(isTrue(enumerable)) descriptor.enumerable=enumerable
    return define(obj, prop, descriptor)
  }
  const registra=()=> createObj( 'Register', { 
    directives:createObj('directives'), 
    filters:createObj('filters'), 
    widgets:createObj('widgets'), 
    handlers:createObj('handlers'), 
    agents:createObj('agents'), 
    blocks:createObj('blocks'),
    mixins:new Tuple(),
    properties:createObj('properties')
  });
  const HXBuildOwnPropertiesInitial=(opts, vNode)=>({ 
    name:opts?.name ? opts.name : isString(vNode.type) ? vNode.type : 'AnonymousWidget', 
    slot_name:hasProp(opts, 'props')  ? opts.props[$$slotName] : undefined , 
    isInitialBuild:false ,
    widgetType:undefined,
    hx__Element:undefined,
    isSelfRecursive:false
  })
  const HXBuildCoreInitial= (opts, vnode)=> ({
    GeneticProvider:opts,
    virtualNode:vnode,
    utils:createObj('Utils'), 
    posixVNode:undefined,
    settings:createObj('settings', Compiler_Config_Options), 
    slots: new Slots(), 
    rootNodesList:[],
    map:createObj('map',{ 
      is_hyperscript:vnode.is_hyperscript
    } ), 
    activeObserver:null, 
    effectSubscribers:new Tuple(),
    slotsFactory:createObj('slotsFactory', {
      renderedSlotsList:createObj('renderedSlotsList'),
    })
  })
  const HXBuildCompilerInitial=()=>({
    templateProcessor:pass,
    slotsTransformRender,
    slotRendererNotified:false,
    whenMountedHooks:new Tuple(),
    hoistedNodelist:new Tuple(),
    composedSlots:createObj('composedSlots'),
    compilerFlags:{},
    rawChildren:()=> undefined,
    VN_Tree:{
      KEYS_INDEXES:[],
      LEAGUE_TREE:{}
    },
    scopeSlotsBindings:{}
  })
  const HXBuildOperandInitial=()=>({
    _OBSERVERS:new Set(), 
    _LIFECIRCLEHOOKS:createObj('_LIFECIRCLEHOOKS'), 
    _OPTIONS:createObj('_OPTIONS'),  
    garbageWatch:false, 
    initializedRender:false , 
    PATCH_FLAG:0, 
    onRenderTracked:false,
    onEffectWatch:false, 
    modelMethods:createObj('modelMethods'),
    templateTokenizedInputs:createObj("Refs", {})
  })
  function createCordinationProperties(self, vnode){
    self.__public_model__=new Model();
    let opts=vnode;
    if(isRenderVNodeClass(vnode)){
      opts=vnode.GeneticProvider || (validHouxitWidget(vnode.GeneticProvider) ? vnode.GeneticProvider : {});
      if(!vnode.GeneticProvider && validHouxitWidget(vnode.GeneticProvider)) opts=defineWidget(vnode.GeneticProvider);
    }
    // opts= defineWidget(validHouxitWidget( vnode.type) ? vnode.type : validHouxitWidget(vnode) ? vnode : {} );
    defineGetter(self, $$$ownProperties, createObj('OwnProperties', HXBuildOwnPropertiesInitial(opts, vnode) ), {} )
    if(exists(opts.props) && hasOwn(opts.props, $$slotName)) delete opts.props[$$slotName];
    defineGetter(self, $$$register, registra() );
    defineGetter(self, $$$operands, createObj('Operands', HXBuildOperandInitial()));
    defineGetter(self, $$$core ,createObj('core', HXBuildCoreInitial(opts, vnode) ));
    defineGetter(self[$$$core], '$globals', createObj('$globals',{
      register:createObj('Register', registra() ),
      setupOptions:createObj('setupOptions'), 
       published:createObj('Published'), 
      legalOptions:createObj('legalOptions'), 
      controller:new Set(),
    }) );
    defineGetter(self, $$$compiler, createObj('compiler', HXBuildCompilerInitial()));
    defineGetter(self.__public_model__, '$signals', new Signals());
    getHouxitBuildInstance(self, opts, vnode);
    return [ opts, vnode ];
  }
  function maintainCompilerFlag_flag(self, effect){
    let flag=0;
    define(self[$$$compiler].compilerFlags, 'flags', {
      get(){
        return flag
      },
      set(newFlag){
        flag = newFlag;
        effect(self, flag)
        flag=0
        return true;
      }
    })
  }
  function triggerSlotsElementsEffect(self, renderedSlotsList, rawChildren){
    const observer = { 
      mutated:false, 
      willMutate:false, 
      updated_hooks:new Tuple(),
      effectFlush:new Tuple(),
      active:false
    } ;
    const data_set=slotsGeneticProvider(self, self[$$$core].opts, self[$$$core].virtualNode, true, true, rawChildren);
    const slotsCore=_induceSlotContents(self, self[$$$core].opts, data_set, createObj("renderedSlotsList"));
    let index=0;
    for(const [key, node] of entries(renderedSlotsList)){
      if(!hasOwn(slotsCore, key)) {
        inDOMElementNodesRemover(self, node)
        delete renderedSlotsList[key]
        continue
      }
      let vnode=slotsCore[key](data_set[1], true) ;
      Render_Effect_Reactive_Transform(data_set[1], node, vnode, observer);
      self.__public_model__._deferTick( function( resolve, reject ){
        if(len(observer.effectFlush)) {
          callSetHooks(self, observer.effectFlush  );
        }
      }).then(function(){
        if( observer.mutated && len(observer.updated_hooks ) && len(observer.effectFlush)) {
          callSetHooks( self , observer.updated_hooks, null, self.__public_model__ ) ;
          observer.updated_hooks.clear();
        }
      }) ;
      index++
    }
  }
  function slotsTransformRender(self, observer, rawChildren){
    const notified=self[$$$compiler].slotRendererNotified;
    if(isTrue(notified)) return;
    self[$$$compiler].slotRendererNotified=(true);
    const renderedSlotsList=self[$$$core].slotsFactory.renderedSlotsList
    if(!len(renderedSlotsList)) return;
    self.__public_model__._deferTick(function(){
      triggerSlotsElementsEffect(self, renderedSlotsList, rawChildren);
    }).then(()=>{
      self[$$$compiler].slotRendererNotified= (false);
    })
  }
  function slotDebuger(self){
    return (slotName, slotContent)=>{
      $debug_log(`Problem when mapping slot element>>>\n\nMore than one vnode slot name seems to be pointing to the  same slot\nat at "${slotName}" slot Directive  of "${slotContent.$element.outerHTML}" \n\nmaybe you should wrap them within a single template wrapper`, self, true, "During the induction of slots contents");
      $warn(`Note: unnamed contents will be automatically mapped  as "default" slot\nWon't conflict with other default contents`, self );
      return false;
    }
  }
  function smartSlotMapping(self, slotContent, slotName, defaultSlotsRecord, slotsCore, patchFlags){
    if(slotName === 'default'){
      defaultSlotsRecord.push(slotContent)
    }else if(!hasOwn(slotsCore, slotName) ){
      slotsCore[slotName]=function slotRender() {
        return  new HouxitFragmentElement( isArray(slotContent) ? slotContent : [ slotContent ], patchFlags)
      }
    }else{
      slotDebuger(self)(slotName, slotContent);
      return;
    }
  }
  const shouldUnwrap = child=> isHouxitFragmentElement(child) && child.isLoopWrappRenderer;
  function unwrapLoopWrappers(children){
    const childrenRender=[];
    for(const child of children.values()){
      if(shouldUnwrap(child)){
        for(const gChild of child.NodeList.values()){
          childrenRender.push(gChild);
        }
      }else childrenRender.push(child)
    }
    return childrenRender;
  }
  function _induceSlotContents(self, options, setData , renderedSlotsList){
    let [ children, patchFlags, Flaghx__Element ] = setData;
    const defaultSlotsRecord=[];
    const slotsCore=renderedSlotsList ? renderedSlotsList : self[$$$core].slots;
    if(!children || !len(children) ) {
      defineFallbackSlotsToken(self, options, defaultSlotsRecord, slotsCore);
      return renderedSlotsList;
    }
    children = unwrapLoopWrappers(children);
    const hx__Element=options.children?.hx__Element;
    const is_hyperscript= self[$$$core].map.is_hyperscript;
    for(let slotContent of (children || [])?.values() ){
      if(isHouxitElement(slotContent)){
        const slotName=slotContent.slot_name || 'default';
        smartSlotMapping(self, slotContent, slotName, defaultSlotsRecord, slotsCore, patchFlags);
      }
    }
    if(len(defaultSlotsRecord)){
      slotsCore.default=function slotRender() {
        return _getNodeListResponse(defaultSlotsRecord, patchFlags);
      }
    }
    if(is_hyperscript ) defineFallbackSlotsToken(self, options, defaultSlotsRecord, slotsCore);
    return renderedSlotsList;
  }
  function defineFallbackSlotsToken(self, options, defaultSlotsRecord, slotsCore){
    function factory(name){
      return function slotRender(def){
        if(len(arguments) && def && !isChildrenNode(def) || (isAFunction(def) && !isChildrenNode(def()))){
          $debug_log(`Render functions default slot content requires to be a render function also`, self, true);
           return null;
        }else if(def && isChildrenNode(def)) {
          def=isPFunction(def) ? def(self) : def;
          return defineVNode({
            type:"slot", 
            props:{ 
              name 
            },
            children:def 
          })
        }
        return defineVNode({
          type:"slot", 
          props:{ 
            name 
          }
        });
      }
    }
    const o_slots=new Tuple(...(options.slots && len(options.slots) ? options.slots : [ "default" ]) );
    if(!o_slots.has("default")) o_slots.add("default");
    for(const sn of o_slots.values()){
      if(!hasOwn(self[$$$compiler].composedSlots, sn)){
        self[$$$compiler].composedSlots[sn]=factory(sn);;
      }
    }
  }
  function _$instanciateModelProps(self){
    if(isBuiltinWidgetBuild(self)) maintainCompilerFlag_flag(self, (instance)=>{
        instance.__public_model__._pushEffect();
    })
  }
  function $ensureLifeCircleHooks(self, options, vnode){
    const hooks="preBuild,postBuild,postMount,preMount,postUpdate,preUpdate,preDestroy,postDestroy,onTracked,onEffect,onCatch,onSlotEffect,onSlotRender";
    const dirHKAlibi={ 
      init_hook:'preBuild',
      mounted_hook:'postMount',
      created_hook:'postBuild',
      updated_hook:'postUpdate',
      destroyed_hook:'postDestroy'
    }
    let customDirHk={}
    if(vnode[$$$customDirs]){
      entries(vnode[$$$customDirs]).forEach(([key, dirhk])=>{
        if(len(dirhk)){
          customDirHk[dirHKAlibi[key]]=function(){
            callSetHooks(self, dirhk, null, self.__public_model__);
          }
        }
      })
      delete vnode[$$$customDirs];
    }
    hooks.split(',').forEach((hookN)=>{
      if(options[hookN] || len(customDirHk)){
        if( len( customDirHk) &&  hasOwn(customDirHk, hookN)){
          let thisHook=customDirHk[hookN];
          const user_defined_callback=vnode[hookN] || pass;
          options[hookN]=function(utils){
            if(isPFunction(thisHook)) thisHook();
            if(user_defined_callback) user_defined_callback.call(self.__public_model__, utils)
          }
        }
        self[$$$operands]._LIFECIRCLEHOOKS[hookN]=options[hookN]||pass;
      }else self[$$$operands]._LIFECIRCLEHOOKS[hookN]=pass;
    })
    if(isFalse(self[$$$operands].initializedRender)) callbackHookWithCatch(self, self[$$$operands]._LIFECIRCLEHOOKS.preBuild,'preBuild');
  }
  function callbackHookWithCatch(self, hook, name){//this function calls a lifecircle hook with a catch debugger
    if(isPass(hook)) return
    try{
      hook.call(self.__public_model__);
    }catch(err){
      $debug_log(`${name} hook \n\n`,self, true, `during the call of the "${name}" LifeCycle hook` );
      $warn(`${err}`);
    }
  }
  function RuntimeTokenDir(self, options, vnode){
    const hasToken=vnode.props && hasProp(vnode.props, $$$$dir__ref$$$$);
    if(!hasToken) return;
    self[$$$ownProperties]['ref_$$Prop']=vnode.props[$$$$dir__ref$$$$];
    delete vnode.props[$$$$dir__ref$$$$];
  }
  function normalizeHyperscriptSlotting(self, children, hx__Element, patchFlags, isRerender, config){
    const renderSlotList=[];
    const except=new Set();
    for(let [key, value] of children.entries()){
      if(isSlotInstance(value)){
        const slotBindings=self[$$$compiler].scopeSlotsBindings;
        for(let [slotN, slotRender] of entries(value.slots)){
          slotRender=slotRender.call((self[$$$core].map.$$$context), slotBindings[slotN].bindings);
          if(!isChildrenNode(slotRender)){
            $debug_log(`unrecognised element/value passed to render`, self, true);
            return;
          }
          if(!isArray(slotRender)) slotRender=[slotRender];
          slotRender=_HouxitTemplateParser(slotRender, patchFlags, null, hx__Element, null, isRerender, config);
          if(!isArray(slotRender)) slotRender=[ slotRender ];
          if(slotN !=='default' && except.has(slotN) ){
            $debug_log(`slot content with the name mapping "${slotN}" has already be declared\n\nUntraced slotting mapping\n Duplicate fount`, self, true);
            return;
          }else{
            except.add(slotN);
            slotRender.forEach((hx_el)=> {
              hx_el.slot_name=slotN;
              renderSlotList.push(hx_el);
            });
          }
        }
      }else{
        except.add("default");
        const slotRender=_HouxitTemplateParser(value, patchFlags, null, hx__Element, null, isRerender, config);
        (!isArray(slotRender) ? [slotRender] : slotRender).forEach((hx_el)=> {
          hx_el.slot_name="default";
          renderSlotList.push(hx_el);
        });
      }
    }
    except.clear();
    return renderSlotList;
  }
  function slotsGeneticProvider(self, options, vnode, isRerender=false, inSlot, rawChildren){
    if(!vnode.children) return;
    let children = vnode.children;
    const slotsCompilerArgs= isInitialBuild(self) ? {
      self,
      hx__Element:vnode.hx__Element,
      config:{}
    } : vnode.filesFilter?.slotsCompilerArgs;
    let { hx__Element, self:patchFlags, is_hyperscript, fall, config } =  slotsCompilerArgs;
    if(!is_hyperscript) config.slotBindings=self[$$$compiler].scopeSlotsBindings;
    const context=self[$$$core].context ;
    const initializedRender=self[$$$operands]?.initializedRender;
    let childrenRender;
    if(is_hyperscript) childrenRender=normalizeHyperscriptSlotting(self, children, hx__Element, patchFlags, context, isRerender, config);
    else childrenRender=_HouxitTemplateParser(children, patchFlags, null, hx__Element, context, isRerender, config );
    childrenRender = childrenRender && !isArray( childrenRender ) ? [ childrenRender ] : exists(childrenRender) ? childrenRender : [] ;
    return [ childrenRender, patchFlags, hx__Element ] ;
  }
  function $contextEngine(self, options, vnode){
    if(!options.context) return;
    let data;
    let subscribers;
    try{
      [ subscribers , data ] = effectDependencyTracking(self , function(){
        return options.context.call(self.__public_model__);
      })
    }catch(err){
      $debug_log(`Encountered an error when trying to run the context option method`, self, true);
      $debug_log(err, self);
      return;
    }
    if(isNull(data)){
      $debug_log(`The context option returns a nullish or undefined value \n\nReturning null is an invalid semantic `, self, true);
      return;
    }
    if(subscribers && len(subscribers)) self.__public_model__._observe(subscribers, function(){
      self[$$$core].map.$$$context=options.context.call(self.__public_model__) ;
      runtimeSlotsFallThrough(self, options, {}, self[$$$core].virtualNode )
      self[$$$compiler].slotsTransformRender(self);
    });
    self[$$$core].map.$$$context=data;
  }
  function runtimeSlotsFallThrough(self, options, patch, vnode ){
    if(!vnode.props && !hasProp(vnode.props||{}, $$$context ) ) return;
    if(!patch) $contextEngine(self, options, vnode);
    const value=self[$$$core].map?.$$$context;
    const context=vnode.props[$$$context];
    const prop=context?.prop;
    if(!hasOwn(self[$$$core].map, '$$$context')) return;
    const { hx__Element, self:patchFlags } = vnode.filesFilter.slotsCompilerArgs;
    if(isFalse(destructWarn(prop, value, self))) return;
    if(isDestructureSyntax(prop)){
      const contextProps = createObj('context');
      contextProps[$$dexTransformKey]=hx__Element.VNodeManager.dexTransform
      self[$$$core].context=contextProps;
      contextProps[$$dexTransformKey].sourcesArray.push(value)
      contextProps[$$dexTransformKey].syntaxArray.push(prop)
    }else self[$$$core].context=createObj('context', {[prop]:value});
  }
  function defineLateGlobalProps(self, build){
    if(isHouxitElement(build)) useModel.call(self, { $element:build.$element});
  }
  function isInitialBuild(self){
    return isHouxitBuild(self) && isTrue(self[$$$ownProperties].isInitialBuild)
  }
  function mapPublicationsTraverse(self, opts){
    if(!hasOwn(opts, 'publish')) return;
    const [ subscribers, value ]=effectDependencyTracking(self, ()=>{
      return opts.publish.call(self.__public_model__)
    });
    if(!isPObject(value)) {
      $debug_log(`Publish method option expects a plain object as a return value`, self, true);
      return;
    }
    const globalBoard= isInitialBuild(self) ? self[$$$core].$globals.published : self[$$$core]._root[$$$core].$globals.published;
    for(const [key, valueX] of entries(value)){
      define(globalBoard, key, { 
        value: valueX, 
        enumerable 
      })
    }
  }
  function transmitPublicationPrefix(self, opts){
    if(!hasOwn(opts, 'transmit')) return;
    const globalBoard= isInitialBuild(self) ? self[$$$core]?.$globals.published : (self[$$$core]._root||{})[$$$core]?.$globals.published;
    for(let [ key, valueX] of getIterator(opts.transmit)){
      let keyName = isArray(opts.transmit) ? valueX : key ;
      if( !validateType(keyName, [String, Symbol])){
        $debug_log(`Arrays value of Transmit option expects a string / Symbol values of published property names\n\n........"${keyName}"`, self, true);
        return
      }
      let defaultValue;
      if(!hasOwn(globalBoard, keyName)){
        if(isPObject(valueX) && hasProp(valueX, 'default')){
          if(!isPFunction(valueX.default)) defaultValue=valueX.default
          else{
            defaultValue = !isAFunction(valueX.default) ? valueX.default.call(self.__public_model__) : valueX.default()
          }
        }else{ 
          $debug_log(`No published props with the provided transmit key "${keyName}"\n\nUnrecognized transmit property`, self, true);
          return;
        }
      }
      let transmited= get_Object_Value( globalBoard , keyName );
      if(isPObject(valueX) && hasOwn(valueX, 'transmit')){
        if(!isPFunction(valueX.transmit)){
          $debug_log(`transmit option of "${key}" transmit property expects a function`, self, true);
          return 
        }
        transmited = !isAFunction(valueX.transmit) ? valueX.transmit.call(self.__public_model__, transmited ) : valueX.transmit(transmited);
      }
      if(!hasOwn(globalBoard, keyName) && !exists(transmited) && hasProp(valueX, 'default') && exists(defaultValue)) transmited=defaultValue ;
      if(isReactiveToken(transmited) || isShallowReadonlyToken(transmited)){
        _mountTokenEffect(transmited, self, true);
      }
      let aliasKey=keyName;
      if(isPObject(valueX)){
        if(!hasOwn(valueX, 'alias')){
          $debug_log(`transmit prop "${keyName}" object expects an "alias" property`, self, true);
          return;
        }else if(!validateType(valueX.alias, [ String, Symbol])){
          $debug_log(`"${keyName}" transmit alias property expects a String or a Symbol`, self, true);
          return;
        }else if(!exists(valueX.alias)){
          $debug_log(`alias property of "${keyName}" transmit property is an empty string or undefined prop naming`, self, true);
          return
        }else if(validateType(valueX, [String, Symbol])){
          valueX={ alias:valueX };
        }
        aliasKey = valueX.alias;
      }
      if(object_Has_Path(self.__public_model__, aliasKey)){
        $debug_log(`"${aliasKey}" property of transmit conflicts with an existing model property\n\nTry configuring an alias property instead\n\n............at "${keyName}"`, self, true);
        return;
      }
      define( self.__public_model__ , aliasKey , { 
        value : transmited  ,
        enumerable , 
        configurable 
      } ) ;
    }
    return true;
  }
  function traverseMixins_Inheritance(self, options){
    if(!hasOwn(options, 'mixins') && !len(options.mixins)) return;
    for(const [ index, mx ] of entries(options.mixins)){
      if(isPFunction(mx) ){
        
      }
    }
  }
  function getHouxitBuildInstance(self, options, vnode){
    if(isBuiltinWidget(vnode.prototype_)){
      self[$$$ownProperties].builtin_widget=vnode.prototype_[$$BuiltinWidgetKey];
    }
    if(hasOwn(vnode, factoryHXSelfInstance)){
      self[$$$ownProperties].isSelfRecursive=true;
      delete vnode[factoryHXSelfInstance];
    }
    if(!hasOwn(options, 'hx__Element') && !isHouxitElement(options['hx__Element'])) return;
    self[$$$ownProperties].hx__Element=options['hx__Element'];
  }
  function _Houxit_Build( options ) {
    const [ opts, vnode ] = createCordinationProperties( this , options ) ; //create properties;
    sanitizedOptions( this , opts, vnode ) ;//sanitize received options
    $ensureLifeCircleHooks( this , opts, vnode ) ;
    setConfig(this, opts, vnode ); 
    $construct_With_Signals(this, opts, false, vnode);
    map_Events_Fall(this , opts, vnode);
    __Ensure_Renderer(this, opts, vnode);
    this[$$$compiler].templateProcessor = function (self, build, rerender ){
      if(!rerender) build=_$slotHydrationRenderer(self, opts, build);
      build =  _hydrate_props(opts, self, build);
      build=_preCompile_StyleSheet(opts, self, build);
      RuntimeTokenDir(self, opts, vnode);
      defineLateGlobalProps(self, build);
      return build;
    }
    resolveBuildLab(this, opts, vnode);
    resolve_Proto_Call(this, opts, vnode);
  }
  function resolveBuildLab(self, options){
    self[$$$core].build=options.build || options.template || options.markdown 
    self[$$$core].opts=options;
  }
  function isRender(build){
    return isPFunction(build) && build.name === 'render';
  }
  function $$houxitPower(){
    
  }
  function getComposersContext(self, ){
    const adapters=createObj("Adapters", {
      signals:self.__public_model__.$signals,
      attrs:self.__public_model__.$attrs,
      slots:self[$$$compiler].composedSlots,
      use:use.bind(self)
    });
    for(const [key, macro] of entries(assign( adapters, self[$$$core].utils))){
      define(adapters, key, { 
        value:macro, 
        enumerable 
      })
    }
    return adapters;
  }
  function trackTemplateSource(self, selector, fall, hx__Element, ssc){
    fall = fall || {};
    if(ssc) fall= smartDextCtxMerging(fall, ssc);
    let render = pass;
    const core_build=self[$$$core].build;
    inDomCaveatRemodeling(self);
    if(isString(core_build) || isCollection(core_build)){
      render = (instance, update)=> _HouxitTemplateParser(self[$$$core].build, instance, false, hx__Element, fall, update);
      self[$$$core].render=render;
    }else if(isNull(core_build) && selector){
      self[$$$core].build=_GenerateRoot(selector, self)?.innerHTML || '';
      render = (instance, update)=> _HouxitTemplateParser( self[$$$core].build, instance, false, hx__Element, fall, update);
      self[$$$core].render=render;
    }
    self[$$$core].map.is_hyperscript=false
    return render
  }
  function createGarbageCollector(self){
    self[$$$compiler][garbageKey]={
      postBuild:new Tuple(),
      postUpdate:new Tuple(),
      postMount:new Tuple(),
      postDestroy:new Tuple(),
      preDestroy:new Tuple(),
      preUpdate:new Tuple(),
      preMount:new Tuple(),
      onEffect:new Tuple(),
      onTracked:new Tuple(),
      onCatch:new Tuple()
    }
  }
  function mapGarbargeHooks(self){
    for(const [name, tuple] of entries(self[$$$compiler][garbageKey])){
      if(!len(tuple)) continue;
      function hook(){
        tuple.list().forEach(function(fn){
          callbackHookWithCatch(self, fn, name );
        })
      }
      const joinder=self[$$$operands]._LIFECIRCLEHOOKS[name];
      if(isPass(joinder)) self[$$$operands]._LIFECIRCLEHOOKS[name]=hook;
      else {
        self[$$$operands]._LIFECIRCLEHOOKS[name]=function(){
          hook();
          callbackHookWithCatch(self, joinder, name );
        }
      }
    }
    delete self[$$$compiler][garbageKey];
  }
  function HydrateBuiltInTransform(self){
    const vNode=self[$$$core].virtualNode;
    if(isBuiltinBuildWidget(self)) self[$$$core].build=[ vNode.filesFilter.BuildVNode ];
    else if(isBuiltinSelfWidget(self)) ContextifyingSelfWidget(self, vNode);
    else if(isBuiltinPortalWidget(self) || isBuiltinFragmentWidget(self) ) portalAndFragmentSpecialHydration(self, vNode);
  }
  function portalAndFragmentSpecialHydration(self, vNode){
    const normalizer=vNode.filesFilter.$WidgetNormalizer;
    self[$$$core].build=normalizer.children;
  }
  function ContextifyingSelfWidget(self, vNode){
    const SelfVNode=vNode.filesFilter.SelfVNode ;
    SelfVNode[factoryHXSelfInstance]=true;
    self[$$$core].build=[ SelfVNode ];
  }
  function handleBuildGenerator(self, selector){
    let context
    let render;
    if(isBuiltinWidgetBuild(self)) HydrateBuiltInTransform(self);
    if(isFunction(self[$$$core].build)){
      let responseRender;
      let renderer;
      createGarbageCollector(self);
      try{
        installCurrentRunningEffect(self);
        renderer = self[$$$core].build.call(undefined, self.__public_model__.$params, getComposersContext(self), $$houxitPower );
        reinstatePreviousRunningEffect();
        responseRender=renderer;
        if(isAFunction(self[$$$core].build) && !isPFunction(renderer) ) responseRender=()=>renderer;
      }catch(err){
        $debug_log(`Error during the call of the build function`,self, true, DebugFlags.build);
        if(isXtruct(self[$$$core].build)){
          $debug_log(`build options method seems to be a constructor function`, self);
        }else $debug_log(err, self);
        return ;
      }
      mapGarbargeHooks(self);
      if(isModelInstance(renderer) && (!isFunctionBasedBuild(self) || isInitialBuild(self))) {
        const options = self[$$$core].opts;
        if(hasOwn(options, 'render')) responseRender=()=>options.render.call(self.__public_model__);
        else{
          self[$$$core].build=hasOwn(options, "template") ? options.template : null ;
          const templateRender= trackTemplateSource(self, selector, null, context?.hx__Element, context?.props || undefined );
          return templateRender;
        }
      }
      if(!isPFunction(responseRender) && !isAFunction(self[$$$core].build) ){
        $debug_log(`Error during the call of ${ !isFunctionBasedBuild(self) ? 'the build function' : 'functional widget' } context
          \nfailed to return a render function when returning the build method::\nCross-Check your returned renderable Data as This may lead to
          Unexpected results during DOM nodes Compilation`, self, true, DebugFlags.build);
        return;
      }else if(!isChildrenNode(responseRender())){
        $debug_log(`value not a valid Houxit-DOM instance`, self, true);
        return;
      }
      self[$$$core].map.is_hyperscript=true;
      self[$$$core].render= function factoryRender(instance, update=false){
        let response=responseRender();
        return !isArray(response) && isChildrenNode(response) ? [ response ] : isChildrenNode(response) ? response : [] ;
      };
      return self[$$$core].render;
    }else if(hasOwn(self[$$$core].opts, 'render')){
      self[$$$core].map.is_hyperscript=true;
      self[$$$core].render= function factoryRender(instance, update=false){
        let response=responseRender.call(self.__public_model__);
        return !isArray(response) && isChildrenNode(response) ? [ response ] : isChildrenNode(response) ? response : [] ;
      };
      return self[$$$core].render;
    }else {
      return trackTemplateSource(self, selector, context?.hx__Element, context?.props );
    }
    render= (sf, update)=>self[$$$core].render(context?.self || sf, update);
    self[$$$core].render=render
    return render;
  }
  function inDomCaveatRemodeling(self){
    for(const [ name, item] of entries(self[$$$register].widgets)){
      if(hasUpperCase(name)) self[$$$register].widgets[to_kebab_case(name)]=item;
    }
    for(const [ name, item] of entries(self[$$$register].directives)){
      if(hasUpperCase(name)) self[$$$register].directives[to_kebab_case(name)]=item;
    }
  }
  function resolve_Proto_Call(self, opts){
    new Promise((resolve, reject)=>{
      
    }).then((data)=>{
      if(!self[$$$operands].hasMountProto){
      }
      return self;
    })
    return self;
  }
  function _GenerateRoot(nodeSelector, self){
    if(isNull(nodeSelector)){
      $debug_log(`No node model or selector value passed for deployment`, self, true);
      return;
    }
    let domRoot;
    if(isString(nodeSelector)){
      domRoot=document.querySelector(nodeSelector);
      if(!isNativeElement(domRoot)){
        $debug_log(`Error generating element, target not a valid native element instance`, self, true);
        return;
      }
    }else if(isNativeElement(nodeSelector) || nodeSelector.isHouxit_Fragment || nodeSelector === document){
      domRoot=nodeSelector;
    }
    return domRoot
  }
  function getGlobalRegistery(self){
    return self[$$$core].$globals ;
  }
  function mergeRegisteries(self){
    entries(self[$$$core].$globals.register).forEach(([name, value])=>{
      for(let [key, content] of entries(value)){
        if(!hasProp(self[$$$register][name], key)){
          self[$$$register][name][key]=content
        }
      }
    });
    assign(self.__public_model__, self[$$$register].properties);
  }
  function validateRegistryProvider(self){
    const registeredOpts=getGlobalRegistery(self).legalOptions;
    const _opts=self[$$$operands]._OPTIONS;
    for(let [ key, opt] of entries(_opts)){
      if(!_mapValue(registeredOpts, key)){
        $debug_log(`Unrecognised option found\n\n"${key}" option is not a valid widget option or not registered,
        \n\nYou can register this option by passing an "optionRegistry" object prop to "build.controller({})" method as an object argument method`, self, true);
        return;
      }else if(!validateType(opt, registeredOpts[key])){
        $debug_log(`The provided "${key}" option validation failed on the required type\n\n
        Type of "${getType(opt)}"" found`,self, true );
        return;
      }
      
    }
  }
  function createPortalEntryDisplay(self){
    if(!isBuiltinPortalWidget(self)) return;
    const target=unToken(self.__public_model__.$params.target);
    const portalElement=target ? _GenerateRoot(target) : undefined;
    if(!portalElement){
      $debug_log(`Unable to generate portal element\n\nTarget not existing in the current document model layer`, self, true);
      return;
    }else if(!IS_ELEMENT_NODE(portalElement) && !IS_DOCUMENT_FRAGMENT_NODE(portalElement) && !IS_DOCUMENT_NODE(portalElement)){
      $debug_log(`Mount target for Portal widget is not a valid element node`, self, true);
      return;
    }
    return portalElement
  }
  function widgetSlotsManager(self, options, vnode){
    runtimeSlotsFallThrough( self , options, null, vnode ) ;
    const setData = slotsGeneticProvider( self , options, vnode );
    _induceSlotContents( self , options , setData || [] ) ;
    for(const [key, content] of entries(self[$$$core].slots)){
      self[$$$compiler].composedSlots[key]=function slotRender(){
        return defineVNode({
          type:'slot', 
          props:{ 
            name: key 
          }
        });
      }
    }
  }
  function activateTemplateTokenizedOptions(self, options){
    if(!options.anchorRefs)return;
    const instanceTemplateTokens=self[$$$operands].templateTokenizedInputs;
    iterate(options.anchorRefs).test((keyName, index)=> _AnchorRefAdapter_(self, keyName));
  }
  function _AnchorRefAdapter_(self, ref){
    if(!isString(ref)){
      $debug_log(`anchorRefs options received an invalid data type`, self, true);
      return;
    }
    const tokenized=new Token(null);
    _mountTokenEffect(tokenized, self, true);
    self[$$$operands].templateTokenizedInputs[ref]=tokenized;
    return tokenized;
  }
  function _useAnchorRef(ref){
    const self= getCurrentRunningEffect({
      name:'useAnchorRef'
    });
    if(!isHouxitBuild(self) && !validateCollectionArgs({
      validators:[String],
      count:1,
      required:[true]
    })) return E_Obj;
    return _AnchorRefAdapter_(self, ref);
  }
  function useAnchorRef(ref){
    return _useAnchorRef(...arguments);
  }
  function prefixManagement( self ) {
    const options = self[$$$core].opts ;
    mapPublicationsTraverse(self, options) ;
    validateRegistryProvider( self ) ;
    mergeRegisteries( self ) ;
    _$instanciateModelProps( self ) ;
    activateTemplateTokenizedOptions(self, options)
  }
  const isGettersObject=computed=>isPObject(computed) && ( isPFunction(computed.get) && ( !hasOwn(computed, 'set') ? false : isPFunction(computed.set) ) );
  class computedTokenCache {
    computedTokenData = pass
    constructor( callback, config ) {
      this.computedTokenData=callback;
      this.computedTokenData.config = config || {};
    }
    transformer(prop){
      return {
        computedTokens:{
          [prop]:this.computedTokenData
        }
      }
    }
  }
  const isComputedMacro=value=> value instanceof computedTokenCache;
  function _computed_(callback, config){
    const res=validateCollectionArgs(arguments, {
      min:1,
      max:2,
      name:'computed',
      validators:[[Function, Object], Object ]
    })
    if(!res && !isPFunction(callback) && !isGettersObject(callback)){
      $debug_log(`computedToken macro at Parameter 1 expects a getter function or a descriptor object of a "get" and an optional "set" property methods`, self, true);
      return;
    }
    const self=getCurrentRunningEffect({
      name:'computedToken',
    })
    if(!isHouxitBuild(self)) return new computedTokenCache(callback, config || {});
    const computed=hydrateComputedTokenTransform(self, callback, true, config || {});
     _mountTokenEffect(computed, self);
    return computed;
  }
  function computedToken(callback, config){
    return _computed_.call(this, ...arguments);
  }
  function composedTokenHydration(self, computed, config){
    const [ subscribers, value ] = effectDependencyTracking(self, ()=>{
      return ( isPFunction(computed) ? computed : computed.get).call(self.__public_model__);
    } );
    if(isPFunction(computed)) return [ readonlyToken(value, {
      isComputed:true ,
      ...( config || {} )
    }), subscribers ];
    return [ factoryToken(function(track, effect, deepTranform){
      const descriptor={
        get(){
          track();
          return computed.get.call(self.__public_model__, ...arguments);
        },
        isComputed:true,
        ...( config || {} )
      }
      if(hasOwn(computed, 'set') && isPFunction(computed.set)){ 
        descriptor.set=function(){
          effect();
          return computed.set.call(self.__public_model__, ...arguments);
        }
        if(descriptor.isReadonly) delete descriptor.isReadonly;
      }else descriptor.isReadonly=true;
      return descriptor;
    }), subscribers ];
  }
  function hydrateComputedTokenTransform(self, computed, composed, config){
    if(composed && !isPFunction(computed) && !isGettersObject(computed)){
      $debug_log(`computedToken macro at Parameter 1 expects a getter function or a descriptor object of a "get" and an optional "set" property methods`, self, true);
      computed = pass;
    }
    const [ computedTokenData, subscribers ] =composedTokenHydration(self, computed, config);
    computedTokenData[refInternalEffectKey][ '[[[computed__Token]]]' ] = true;
    computedTokenData[refInternalEffectKey].computed=( isPFunction(computed) ? computed : computed.get ).bind(self.__public_model__)  ;
    if( len( subscribers ) ) {
      self.__public_model__._observe( subscribers , () => {
        if( isComputedToken( computedTokenData ) ) {
          computedTokenData[refInternalEffectKey].updateFlags ++;
          if( !computedTokenData[refInternalEffectKey].ModelInstance ){ 
            computedTokenData[refInternalEffectKey].ModelInstance = self.__public_model__;
          }
        }
      } )
    }
    return computedTokenData;
  }
  function computedTokensCompile(self, opts){
    if(!opts.computedTokens || !len(opts.computedTokens)) return
    for(let [key, computed] of entries(opts.computedTokens)){
      if(!isPFunction(computed) && !isGettersObject(computed)){
        $debug_log(`computedTokens option  at "${key}" property expects a getter function method option or a descriptor object of a "get" and an optional "set" property methods`, self, true);
        return;
      }
      const computedTokenData = hydrateComputedTokenTransform(self, computed);
      if(self) define(self.__public_model__, key, {
        get(){
          return computedTokenData;
        }
      })
    }
  }
  function callUpdatedHook(self, obs, ){
    for( let fn of obs.updated_hooks.values()){
      fn();
    }
    obs.updated_hooks.clear();
    callbackHookWithCatch(self, self[$$$operands]._LIFECIRCLEHOOKS.postUpdate, 'postUpdate');
  }
  function mount(nodeSelector){
    let domRoot=_GenerateRoot(nodeSelector, this);
    if(!bool(domRoot.isHouxit_Fragment)) define(domRoot, 'NodeList',{
      value:new Tuple(), 
      configurable, 
      writable
    });
    if(!domRoot.PATCH_FLAGS) define(domRoot, 'PATCH_FLAGS',{
      value:new Set(),
      configurable, 
      writable
    });
    const fakePortal = activateWatchObserverPlugin(this, nodeSelector);
    if(isBuiltinPortalWidget(this)) domRoot = fakePortal;
    if(IS_ELEMENT_NODE(domRoot) && isInitialBuild(this) ) domRoot.innerHTML='';
    if(isInitialBuild(this) && !IS_ELEMENT_NODE(domRoot)){
      $debug_log('Initial entry Point mount root expects an element node', this, true);
      return this
    }
    if((isInitialBuild(this) || isBuiltinPortalWidget(this)) && isTrue(domRoot.IS_HOUXIT_MOUNTROOT)){
      this[$$$operands].initializedRender=false;
        $debug_log(`A Houxit widget has already been mounted on this element, cannot mount more than one Widget on a single root element`, this, true, `When trying to mount this ${ isBuiltinPortalWidget(this) ? "portal content" : "initialBuild" } to the target DOM`);
      this[$$$operands].initializedRender=true;
      return this;
    }
    adapterDOMMountingProduction(this, domRoot)
    return this;
  }
  function activateWatchObserverPlugin(self, nodeSelector){
    _Data_Hydrations(self, self[$$$core].opts)
    prefixManagement(self);
    let initialBuild=handleBuildGenerator(self, nodeSelector);
    
    defineGetter(self, 'build', Render_Template(self, initialBuild) );
    _Reactive_Adapter_Plugin( self.__public_model__ ,async function adapter(newV, oldV, ref){
      _EffectDependencyNotifier(self);
      _ReconciliationTransformTrigger(self, { newV, oldV, ref },  nodeSelector );
    }, self, true);
    callbackHookWithCatch(self, self[$$$operands]._LIFECIRCLEHOOKS.onTracked, 'onTracked');
    callbackHookWithCatch(self, self[$$$operands]._LIFECIRCLEHOOKS.postBuild, 'postBuild');
    deferTick(()=>self[$$$operands].onRenderTracked=true);
    self[$$$operands].initializedRender = true ;
    return createPortalEntryDisplay(self);
  }
  function adapterDOMMountingProduction(self, domRoot){
    const MoutRootToken={
      IS_HOUXIT_MOUNTROOT:true,
      __mountRootToken:'hx__'+generateUUID(5),
    }
    callbackHookWithCatch(self, self[$$$operands]._LIFECIRCLEHOOKS.preMount, 'preMount');
    domRoot = activateBuildMount(self, domRoot, MoutRootToken);
    whenMounted(self, self[$$$core].posixVNode, ()=>{
      for(const fn of self[$$$compiler].whenMountedHooks.values()){
        callbackHookWithCatch(self, fn, '')
      }
      callbackHookWithCatch(self, self[$$$operands]._LIFECIRCLEHOOKS.postMount, 'postMount');
    });
    self[$$$operands].hasMountProto=true;
  }
  function activateBuildMount(self, domRoot, MoutRootToken){
    if(isInDomNode(domRoot) && IS_ELEMENT_NODE(domRoot) ) {
      domRoot.innerHTML='';
      if( (isInitialBuild(self) || isBuiltinPortalWidget(self) ) && !(isHouxitWidgetElement(self.build) && isBuiltinPortalWidget(self.build?.widget_instance))){
        domRoot.append(self.build?.$element || '');
      }
      if(isInitialBuild(self)) {
        self.property('$root', self.build);
        domRoot.IS_HOUXIT_MOUNTROOT=true
      }
    }else domRoot=self.build?.$element;
    if(domRoot?.isHouxit_Fragment && !domRoot?.trigger_Effect_Run ) define(domRoot, 'trigger_Effect_Run', {
      value: Widget_Effect_Trigger.bind(self)
    });
    return domRoot
  }
  function _getElementsByAttrName(source, attrName){
    source = _GenerateRoot(source);
    const NodeList = new Tuple();
    if(!source) return NodeList;
    const selected = source.querySelectorAll('*');
    for(const [ index, el ] of selected.entries()){
      if(el.hasAttribute(attrName)){
        NodeList.add(el);
      }
    }
    return NodeList;
  }
  function getElementsByAttrName( source, attrName){
    return _getElementsByAttrName(...arguments);
  }
  function createCloakDirectiveHydrator(){
    const NodeList=getElementsByAttrName('cloak', document);
    for(let [ind, el] of NodeList.entries()){
      toggleCloakDirective(el, 'on');
    }
  }
  // createCloakDirectiveHydrator()
  function toggleCloakDirective(element, action){
    if(action === 'on'){
      
    }else if(action === 'off'){
      
    }
  }
  function widget(name, widget){
    if(!isString(name) || !validHouxitWidget(widget)){
      $debug_log(`unrecognised global widget registration for "${name}" widget`, this, true);
      return this;
    }
    if(len(new Set(arguments)) === 2){
     define(this[$$$core].$globals.register.widgets, name, {
       value:widget,
       enumerable, 
       configurable
     });
    }
    return this;
  }
  function install(plugin, options){
    if(!validateType(plugin, [ Object, Function ])){ 
      $debug_log(`plugin installation Error::\n\n install argument must be an object value with  an exposed plugin installation method or a function which acts as the plugin method itself`, this, true);
      return this;
    }else if(isPObject(plugin) && !isPFunction(plugin.plugin)){
      $debug_log(`plugin installation Error::\n\n plugin object did not expose a plugin installation method`, this, true);
      return this;
    }
    let usePlugin=isPObject(plugin) ? plugin.plugin : plugin;
    if(isPObject(usePlugin) ) plugin.plugin(this, options);
    else usePlugin(this, options);
    return this;
  }
  function handler(name, handler){
    if(!isChar(name) && !isFunction(handler)){
      $debug_log(`unrecognised global handler registration for ${handler}`, this, true);
      return this;
    }
    if(len(arguments) === 2){
      this[$$$core].$globals.register.handlers[name]=handler;
    }
    
    return this
  }
  function directive(name, directive){
    if(!isChar(name) && !validateType(directive, [ Function, Object ])){
      $debug_log(`unrecognised global directives registration for ${directive}`, this, true);
      return this;
    }
    if(len(arguments) === 2){
      this[$$$core].$globals.register.directives[name]=directive;
    }
    return this;
  }
  function mixin(mixin){
    if(!isClass(mixin) && !validateType(mixin, [Object])){
      $debug_log(`unrecognised global mixin registration for\n ${compileToRenderable(mixin)}`, this, true);
      return this;
    }else if(!len(arguments) === 1){
      $debug_log(`.mixin() expects not more than one formal argument`, this);
      return this;
    }
    this[$$$core].$globals.register.mixins.add(mixin);
    return this ;
  }
  function filter(name, filter){
    if(!isChar(name) && !isFunction(filter)){
      $debug_log(`unrecognised global filter helper registration for ${filter}`, this, true);
      return this;
    }
    if(len(arguments) === 2){
      this[$$$core].$globals.register.filters[name]=filter;
    }
    return this ;
  }
  function block(name, block){
    if(!isChar(name) && !isFunction(block)){
      $debug_log(`unrecognised global block helper registration for ${block}`, this, true);
      return this;
    }
    if(len(arguments) === 2){
      this[$$$core].$globals.register.blocks[name]=block;
    }
    return this ;
  }
  
  function property(name, value){
     if(!isChar(name)){
      $debug_log(`unrecognised global property registration for ${value}`, this, true);
      return this;
    }
    if(len(arguments) === 2){
      this[$$$core].$globals.register.properties[name]=value;
    }
    return this
  }
  function _Build_destroy(){
    if(len(arguments)){
      $debug_log(`.destroy() method of initBuild accepts no formal parameters`, this);
    }else if(!this[$$$operands].hasMountProto){
      $debug_log(`instance of widget not yet mounted\n\nwidget unmounting failure`);
      return false
    }
    try{
      inDOMElementNodesRemover(this, this.build);
      /*
      delete this[$$$operands];
      delete this[$$$core];
      delete this[$$$compiler];
      delete this[$$$ownProperties];
      delete this.__public_model__;
      delete this.build;
      // Object.setProtypeOf(this, null)
      */
    }catch(err){
      $debug_log(`widget instance destroy failed`, this, true);
      $debug_log(err);
      return false;
    }
    return freeze(this);
  }
  function destroy(){
    return _Build_destroy.call(this, ...arguments);
  }
  function createConfig_Constraint(name, ...args){
    const [ argument ] = args;
    if(isFalse(mapSettingCheck(this, name, argument ))) return this;
    this[$$$core].settings[name]=argument;
    return this;
  }
  function configDelimiters(delimiters){
    return createConfig_Constraint.call(this, "delimiters", ...arguments);
  }
  function configDebug(debug){
    return createConfig_Constraint.call(this, "debug", ...arguments);
  }
  function configForwardAttrs(forwardAttrs){
    return createConfig_Constraint.call(this, "forwardAttrs", ...arguments);
  }
  function configIsAsync(isAsync){
    return createConfig_Constraint.call(this, "isAsync", ...arguments);
  }
  function configForwardSlot(forwardSlot){
    return createConfig_Constraint.call(this, "forwardSlot", ...arguments);
  }
  function configIsCustomElement(isCustomElement){
    return createConfig_Constraint.call(this, "isCustomElement", ...arguments);
  }
  function configUseSSRCompiler(useSSRCompiler){
    return createConfig_Constraint.call(this, "useSSRCompiler", ...arguments);
  }
  function configScopedStyleSheet(scopedStyleSheet){
    return createConfig_Constraint.call(this, "scopedStyleSheet", ...arguments);
  }
  function optionsHookTransform(hookName, callback ){
    
  }
  function _controller_Adapter(options){
    if(!isPObject(options)){
      $debug_log(`argument at position 1 expects a plain object\n\nType unaccepted`, this, true);
      return;
    }
    this[$$$core].$globals.controller.add(options);
    optionsRegistery(this, options);
    let { setupOptions , pluginAdapter } = options;
    if(hasOwn(options, 'pluginAdapter') && !isPFunction(pluginAdapter)) {
      $debug_log(`pluginAdapter option of .controller() method expects a function/method type`, this, true);
      return this;
    }
    if(!exists(pluginAdapter) && !isPFunction(pluginAdapter)) pluginAdapter = pass
    pluginAdapter( this , optionsHookTransform );
    return this
  }
  function controller(options){
    return _controller_Adapter.call(this, ...arguments);
  }
  function configOptions(buildConfig={}){
    setConfig(this, { buildConfig });
    return this
  }
  function optionsRegistery(self, options){
    if(!hasProp(options, 'optionsRegistery')) return;
    else if(!isPObject(options.optionsRegistery)){
      $debug_log(`The "optionsRegistery" property argument of controller expects a plain object\n\nType Unexpected`, self, true);
      return;
    }
    const registered=options.optionsRegistery;
    const globals=getGlobalRegistery(self);
    entries(options.optionsRegistery).forEach(([key, validator])=>{
      if(_mapValue(globals.legalOptions, key)){
        $debug_log(`${key} custom optionsRegistery already exists in the registery record`, self, true);
        return;
      }
      define(globals.legalOptions, key, {
        value: validator, 
        enumerable
      });
    })
  }
  function mountedWarning(self, name){
    if(isTrue(self[$$$operands].hasMountProto)){
      if(!self[$$$core].map.mountWarn) {
        $debug_log(`This "mount" method has been called and calling of methods after the widget is mounted is prohibited\n\n call to the ('.${name}') method is considered an invalid houxit syntax`, self, true);
        self[$$$core].map.mountWarn=true;
      }
      return false;
    }
    return true;
  }
  function publish(prop, value){
    if(!validateType(prop, [ String, Symbol ])){
      $debug_log(`Parameter 1 on .publish() expects a string or a Symbol `, this, true);
      return this;
    }
    const globalBoard= isInitialBuild(this) ? this[$$$core].$globals.published : this[$$$core]._root[$$$core].$globals.published;
    define(globalBoard, prop, { 
      value: value, 
      enumerable 
    });
    return this;
  }
  function hydrate(){
    
    return this
  }
  function buildMethods(){
    return { 
      mount,
      widget, 
      mixin,
      install, 
      handler, 
      directive,
      property,
      filter,
      block,
      configDelimiters,
      configIsAsync,
      configIsCustomElement,
      configForwardSlot, 
      configScopedStyleSheet,
      configUseSSRCompiler, 
      controller,
      configForwardAttrs,
      hydrate,
      configOptions,
      destroy,
      publish
    };
  }
  for(let [ key, fn ] of entries( buildMethods() )){
    fn=new Proxy(fn, {
      apply(target, self, args){
        const res = key === 'destroy' ? true :  mountedWarning(self, key ) ;
        if(isTrue(res)) Reflect.apply(...arguments);
        return self;
      }
    })
    _Houxit_Build.prototype[key]=fn;
  }
  function openTaskPrefix(self){
    self[$$$core].depsQueue.vibrate();
  }
  async function deferEventCircleThread(self, fn, persist=false){
    if(isHouxitBuild(self)){
      if(isFalse(self[$$$operands].garbageWatch)){
        self[$$$operands].garbageWatch=true;
        queueMicrotask(()=>{
        fn.call(self.__public_model__);
          queueMicrotask(()=>{
            self[$$$operands].garbageWatch=false;
          });
        })
      }
      if(persist){
        new Promise((resolve, reject)=>{
          resolve(isFalse(self[$$$operands].garbageWatch))
        }).then(()=>{
          queueMicrotask(fn);
        })
      }
    }else queueMicrotask(fn);
  }
  function whenMounted(self, build, callback) {
    return new Promise((resolve, reject) => {
      const el = isHouxitElement(build) ? build.$element : build;
      if (document.body.contains(el)) {     // Check if it's already in the DOM
        resolve(el);
        return;
      }
      const observer = new MutationObserver((mutations, obs) => {
        if (document.body.contains(el)) {
          obs.disconnect(); // Stop observing once mounted
          resolve(el);
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }).then(() => callback()).catch((err) => $debug_log(`${err}`, self, true));
  }
  function whenUnMounted(self, build, callback){
    
  }
  function useMountWatcher(self, build, config){
    
  }
  function posixVNodeTransform(self, build, isRerender){
    if(!self[$$$core].posixVNode || isElementType(self[$$$core].posixVNode, 'slot')){
      const newPosixVnode = new HouxitTextElement("", self);
      if(isElementType(self[$$$core].posixVNode, 'slot')){
        if(IS_DOCUMENT_FRAGMENT_NODE(build.$element) || (IS_ELEMENT_NODE(build.$element) && !isElementType(build.$element, 'slot'))){
          build.$element.append(newPosixVnode.$element)
        }else if(isElementType(build.$element, 'slot')){
          build=new HouxitFragmentElement([ newPosixVnode, build], self )
        }else build = newPosixVnode;
      }
      self[$$$core].posixVNode=newPosixVnode;
    }
    return build
  }
  function Render_Template( self , initBuild , update = false ) {
    const instance =isBuiltinWidgetBuild(self)  ? self[$$$core].virtualNode.filesFilter.INSTANCE_NORMALIZER : self;
    const is_hyperscript=self[$$$core].map.is_hyperscript;
    initBuild = isFunction(initBuild) ? initBuild( instance , update ) : initBuild  ;
    if(is_hyperscript) initBuild=_HouxitTemplateParser(!isArray(initBuild) ? [initBuild] : initBuild, instance, null, null, null, update);
    if(isArray(initBuild) ) initBuild= new HouxitFragmentElement(initBuild, self, null, update, )
    initBuild = posixVNodeTransform(self, initBuild)
    if(!initBuild || !initBuild.$element ){
      initBuild=self[$$$core].posixVNode;
    }
    if(!isBuiltinWidgetBuild(self)) widgetSlotsManager(self, self[$$$core].opts, self[$$$core].virtualNode);
    initBuild = self[$$$compiler].templateProcessor( instance , initBuild, update ) ;
    return initBuild ;
  }
  function _deferTick( fn ) {
    const response = validateCollectionArgs(arguments, {
      count:1,
      validators:[Function],
      name:"deferTick"
    });
    if(!response) return E_Obj;
    const self= this && isHouxitBuild( this ) ? this : null
    if( len( arguments ) && !isPFunction( fn ) ) {
      $debug_log( `positional argument 1 on "deferTick" is not a function\n\n callback argument 1 requires a function type` , self , !isNull( self ) ) ;
      fn = pass ;
    }
    return new Promise( ( resolve , reject ) => {
      resolve( deferEventCircleThread( self , isFunction(fn) ? fn : pass , isHouxitBuild( self ) ) ) ;
    } ) ;
  }
  function deferTick( fn ){
    return _deferTick( ...arguments );
  }
  function _Reactive_Adapter_Plugin(data, callback, self, deep=false){
    const observers=[];
    const observe=(getter, callback)=>{
      const observer = new Observer( getter, callback, self);
      observers.push(observer);
      observer.update();
    }
    if(self[$$$operands].PATCH_FLAG ){
      observe(()=>data[$$$StreamProxyKey], (newV, oldV)=>{
        try{
          callback(newV, oldV, $$$StreamProxyKey);
          self[$$$operands].PATCH_FLAG=0;
        }catch(err){
          $debug_log(`Encountered a Problem during DOM rendering effect trigger\n\n>>>>>`, self, true);
          $warn(`${err}`, self);
          return;
        }
      })
    }
  }
  const isReadonlyProp=key=>_mapValue(readonlyModelProp, key);
  function preUpdateHookFlush(self){
    
  }
  function triggerHydration(self, observer){
    callbackHookWithCatch(self, self[$$$operands]._LIFECIRCLEHOOKS.onEffect, 'onEffect');
    const is_hyperscript=self[$$$core].map.is_hyperscript
    self.__public_model__._deferTick(function() {
      if(len(observer.effectFlush)){
        callbackHookWithCatch(self, self[$$$operands]._LIFECIRCLEHOOKS.preUpdate, 'preUpdate');
        callSetHooks(self, observer.effectFlush );
      }
    } ).then(function(){
      if( observer.mutated && len(observer.effectFlush) ){
        callUpdatedHook( self , observer ) ;
        observer.updated_hooks.clear();
      }
    }) ;
  }
  function _ReconciliationTransformTrigger(self, reacteData, selector){
    const { newV:newValue, oldV:oldValue, ref:reference  }= reacteData;
    const observer={ 
      mutated:false, 
      updated_hooks:new Tuple(), 
      active:false , 
      willMutate:false,
      effectFlush:new Tuple()
    };
    triggerHydration(self, observer);
  }
  const HouxitUpdateSkippDirectives="if,else,else-if,for,raw,slot,model,hx,on,scoped,provide,motion,clone";
  const HouxitUpdateDirs="html,text,bind,ref"
  function shouldUpdateProp(prop){
    if((has$$_bind(prop) && !(prop.startsWith("$$html") || prop.startsWith("$$text") )  ) || hasAt_bind(prop) || hasAsterisks_bind(prop) || isOnListener(prop) || hasAsh_bind(prop)) return false;
    return true;
  }
  function callDepsGetters(depsArray){
    if(!len(depsArray)) return [];
    const valueDeps=[];
    depsArray.entries().forEach(([index, getter])=>{
      if(isPFunction(getter)) valueDeps[index]= getter();
    });
    return valueDeps;
  }
  function validityPropsHydration(self, element, vnode, observer, is_hyperscript){
    const PropFlags=vnode.VNodeManager.patchFlags.PropFlags;
    let index=0;
    for(const [ key, item ] of entries(PropFlags)){
      if(!(shouldUpdateProp(key) )) continue;
      let { dependencies, accessor, evaluatedValue, initialDependencies, resolvedPropName } = item;
      const response=AttributeEqualityDiffing(self, vnode, {
        value:evaluatedValue(),
        key:resolvedPropName(),
        index
      } , {
        is_hyperscript,
        observer,
        value:accessor(),
        key
      })
      index++
      if(!response) continue;
      Props_dilation_compile( { 
        [key]:accessor()
      }, element, self, vnode, true, {
        evaluatedValue,
        observer,
        accessor,
        key
      })
    }
  }
  function AttributeEqualityDiffing(self, hx__Element, shapeProps, metrics){
    const { index, key, value, observer, is_hyperscript } = metrics;
    const initialValue=is_hyperscript ? shapeProps[index] : shapeProps;
    const valueX=initialValue.value;
    const keyX=initialValue.key;
    if(!key === keyX && is_hyperscript){
      shapeProps[index].key=key;
      shapeProps[index].value=value;
      Props_dilation_compile({
        [keyX]:null 
      }, hx__Element.$element, self, hx__Element, true, {
        observer
      })
      Props_dilation_compile({
        [key]:value
      }, hx__Element.$element, self, hx__Element);
      return false
    }
    return !deepEqualityCheck(value, valueX)
  }
  function AttributeAndPropsReactiveManager(self, virtualElement,virtualBuild, metrics){
    let [ is_hyperscript, observer ] = metrics
    if(!IS_ELEMENT_NODE(virtualElement.$element)) return;
    let props;
    if(is_hyperscript && isPFunction(virtualBuild.compiler_options.props)) props=assign({}, virtualBuild.compiler_options.props())
    else props=assign({}, isFunction(virtualElement.compiler_options.props) ? virtualElement.compiler_options.props() : virtualElement.compiler_options.args ? virtualElement.compiler_options.args.props : {});
    const element=virtualElement.$element;
    if(!is_hyperscript && len(virtualElement.VNodeManager.patchFlags.PropFlags)){
      validityPropsHydration(self, element, virtualElement, observer, is_hyperscript);
      if(observer.mutated) linkUpdateHook(self, virtualElement, observer);
    }else if(is_hyperscript){
      let index = 0;
      const shapeProps = virtualElement.VNodeManager.patchFlags.shapeProps;
      for(let [key, prop] of entries(props)){
        if( shouldUpdateProp( key ) && AttributeEqualityDiffing(self, virtualElement, shapeProps, { 
          index, 
          key, 
          value:prop,
          observer,
          is_hyperscript
        })){
          shapeProps[index].value=prop;
          Props_dilation_compile( { [key]:prop }, element, self, virtualElement.compiler_options.hx__Element||virtualElement, true, {
            observer
          });
          linkUpdateHook(self, virtualElement, observer);
            observer.mutated=true;
        }
        index++
      }
    }
    if(Is_Form_Element(element) && len(virtualElement.patch_tracks)){
      const patch=arrSet(virtualElement.patch_tracks)[0]
      const prop=patch['model:Value'];
      const initVal=patch.initialValue;
      const currentValue=get_Object_Value(self.__public_model__, prop);
      if(!deepEqualityCheck(initVal, unwrap(currentValue))){
        observer.effectFlush.add(function(){
          element.value=unwrap(currentValue)
          observer.active=false
          linkUpdateHook(self, virtualElement, observer);
        })
      }
    }
  }
  const isConditionalHx_Vnode=node=>isConditionalVnode(node, 'if') || isConditionalVnode(node, 'else-if') || isConditionalVnode(node, 'else') ;
  function virtualBuildFilterExchange(self, node, vnode, parent, observer){
    self[$$$operands].initializedRender=false;
    const NewNode=vnode.compiler_options.createElement();
    self[$$$operands].initializedRender=true;
    const getPosixVNode=node.VNodeManager.posixVNode
    inDOMElementNodesRemover(self, node);
    getPosixVNode.$element.after(NewNode.$element);
    parent.NodeList.replace(node, NewNode);
  }
  function heuristicsHouxitElementDiffing(node, vnode){
    if((isSameHouxitElement(node, vnode) && isHouxitFragmentElement()) || deepEqualityCheck(node.prototype_, vnode.prototype_)) return true;
    return false;
  }
  function Render_Effect_Reactive_Transform(self, virtualElement, virtualBuild, observer, parent){
    const is_hyperscript=isHouxitBuild(self) ? self[$$$core].map.is_hyperscript : false ;
    if(!heuristicsHouxitElementDiffing(virtualElement, virtualBuild)) {
      virtualBuildFilterExchange(self, virtualElement, virtualBuild, parent, observer );
      return 
    }else if(!isHouxitFragmentElement(virtualElement)){
      effectCleanupFlush(self, virtualElement, virtualBuild, null, observer, true );
    }
    if(len(virtualElement?.NodeList) || len(virtualBuild?.NodeList)){
      const NodeListElementsCollection= virtualBuild?.NodeList || new Tuple()
      for( const [ ind, node] of virtualElement.NodeList.entries()){
        const vNode= NodeListElementsCollection.at(ind)
        effectCleanupFlush(self, node, vNode, virtualElement, observer);
      }
    }
    AttributeAndPropsReactiveManager(self, virtualElement, virtualBuild, [ is_hyperscript, observer ]);
  }
  function effectCleanupFlush(self, node, vNode, virtualElement, observer, ignore){
    if(isHouxitElement(node)){
      if(!vNode && len(virtualElement?.NodeList > len(vNode?.NodeList))) pass;//vhecking if indom is greater than memo
      else if(isHouxitTextElement(node) ) RerenderingTextsContents(self, node, vNode, observer, virtualElement);
      else if(isConditionalHx_Vnode(node) || isRenderlessElement(node)) cond_Directive_Rerenderer(self, node, virtualElement, vNode, observer);
      else if(isHouxitWidgetElement(node)) Widget_Effect_Trigger(self, node, virtualElement, observer, vNode);
      else if(isTrue(node.isLoopWrappRenderer)) LoopWrapperRehydration(self, node, virtualElement, vNode, observer);
      else if(!ignore) Render_Effect_Reactive_Transform( self, node, vNode, observer );
    }else if(isCustomElement(node)){
        
    }
  }
  function Widget_Effect_Trigger(self, node, virtualElement, observer, virtualNode){
    const is_hyperscript=self[$$$core].map.is_hyperscript;
    const props=assign({}, isFunction(node.compiler_options?.props) ? node.compiler_options.props() : node.compiler_options.args ? node.compiler_options.args.props : {} );
    const PropFlags = node.VNodeManager.patchFlags.PropFlags;
    const attrsObject={ 
      props:{} 
    }
    if(!node.is_hyperscript){
      for(const [key, flags] of entries(PropFlags)){
        const { accessor, initialDependencies, resolvedPropName, evaluatedValue, dependencies } = flags ;
        CompileWidgetPropsManager(self, {
          props:{
            [key] : accessor()
          }
        }, virtualElement?.LabContext ? virtualElement : node, true, {
          observer,
          evaluatedValue,
          accessor,
          key
        })
      }
    }else{
      const shapeProps=virtualElement.VNodeManager.patchFlags.shapeProps;
    }
    const instance=node.widget_instance;
    for(const [ key, val ] of entries(attrsObject.props)){
      if(object_Has_Path(instance.__public_model__.$params, key) && !deepEqualityCheck(unwrap(get_Object_Value(instance.__public_model__.$params, key)), unwrap(val)) && shouldUpdateProp(key) ) {
        observer.effectFlush.add(function(){
          useReadonlyBypasser(instance.__public_model__.$params, key, unwrap(val) );
          observer.mutated=true
          observer.active=false
        })
      }
    }
    if(isBuiltinWidgetBuild(instance)) {
      /*instance[$$$compiler].rawChildren=virtualNode.VNodeManager.rawChildren;
      instance[$$$compiler].compilerFlags.flags++;//call internal streamr of 'instance' widget.*/
    }
    instance[$$$compiler].slotsTransformRender(instance, observer, virtualNode.VNodeManager.rawChildren);
  }
  function RerenderingTextsContents(self, node, vNode, observer, parent){
    const value=node.compiler_options.value;
    if(!(node?.prototype_ === vNode?.prototype_)) {
      observer.effectFlush.add(function(){
        node.$element.textContent=vNode?.$element;
        if(parent) linkUpdateHook(self, parent, observer);
        observer.mutated=true
        observer.active=false
      })
    }
  }
  function findElementNode(vnode, last){
    let hasElementNode=false ,  elementNode=undefined;
    if(isRenderlessElement(vnode) ) return [false, undefined];
    if(IS_ELEMENT_NODE(vnode.$element) || IS_TEXT_NODE(vnode.$element)) {
      elementNode=vnode.$element
      hasElementNode=true
       return [ true, elementNode ] ;
    }else if(IS_DOCUMENT_FRAGMENT_NODE(vnode.$element)){
      let list=[];
      for(let node of vnode?.NodeList?.values() || []){
        let  [ has, elem ]=findElementNode(node, last);
        if(isTrue(has) && IS_ELEMENT_NODE(elem) || IS_TEXT_NODE(elem)) {
          hasElementNode=true;
          elementNode=elem;
          list.push(elementNode)
          if(!last) break;
        }
      }
      if(last) elementNode=list.pop();
    }
    return [ hasElementNode ,  elementNode ] ;
  }
  function backTrackForElementNode(parent, ind, last){
    let has=false, element=null;
    let getPrevNode=parent.NodeList.at(ind);
    let [ hasEl, node]=findElementNode(getPrevNode, last);
    if(isFalse(hasEl) && Number(ind) > 0) {
      [has, element] = backTrackForElementNode(parent, ind-1, last);
    }else{
      has=hasEl;
      element=node;
    }
    return [ has, has ? element : null ];
  }
  
  function inDOMElementNodesRemover(self, vnode){
    const getEl=elem=>isHouxitElement(elem) ? elem.$element : isNativeElement(elem) || IS_DOCUMENT_FRAGMENT_NODE(elem) ? elem : isHouxitBuild(elem) ? elem.build.$element : null;
    const replace=isArray(vnode);
    vnode = replace ? vnode[0] : vnode;
    const element = getEl(vnode);
    let replacer=replace ? vnode[1] : null;
    replacer = isHouxitBuild(replacer) ? replacer.build : replacer ;
    const replacerEl=replacer ? getEl(replacer) : null;
    if(isHouxitWidgetElement(vnode)) {
      vnode.widget_instance.destroy()
    }else if( isHouxitElement(vnode) && IS_DOCUMENT_FRAGMENT_NODE(element)){
      let index=0;
      let done=false;
      for(let node of vnode.NodeList.values()){
        inDOMElementNodesRemover(self, node);
        index++;
        vnode.NodeList.delete(node);
      }
    }else if(isNativeElement(element) || IS_TEXT_NODE(element)){
      if(replace && ( IS_ELEMENT_NODE(element) || IS_TEXT_NODE(element))){
        element.replaceWith(replacerEl);
        if(isHouxitElement(vnode)) vnode.$element=replacerEl;
      }else if(!replace) element.remove();
    }else{
      $debug_log(`Unexpected inDom Node removal Input system`, self);
    }
  }
  function findAndObserveProcessor(vnode, ind, NewNode){
    let [ hasEl, element ]=backTrackForElementNode(vnode, ind-1, true);
    if(hasEl){
      element.after(NewNode.$element)
      vnode.NodeList.splice(ind, 1, NewNode);
    }
  }
  function cond_Directive_Rerenderer(self, node, vnode, virtualBuild, observer){
    if(isRenderlessElement(node) && !isRenderlessElement(virtualBuild)){//add a newly created node and make it render
      observer.effectFlush.add(function(){
        self[$$$operands].initializedRender=false;
        const NewNode=virtualBuild.compiler_options.createElement();
        NewNode.conditional_record=virtualBuild.conditional_record;
        self[$$$operands].initializedRender=true;
        const ind=vnode.NodeList.indexOf(node);
        findAndObserveProcessor(vnode, ind, NewNode);
        observer.mutated=true;
        observer.active=false;
      })
    }else if(isRenderlessElement(virtualBuild) && !isRenderlessElement(node)){//remove the old a make it re
      observer.effectFlush.add(function(){
        inDOMElementNodesRemover(self, node);
        node.IS_RENDERLESS=virtualBuild.IS_RENDERLESS;
        node.conditional_record=virtualBuild.conditional_record;
        observer.mutated=true;
        observer.active=false;
      })
    }
  }
  function LoopWrapperRehydration( self, node, vnode, virtualBuild, observer){
    const  { orgType, ref, src }=node.compiler_options;;
    const is_hyperscript=self[$$$core].map.is_hyperscript;
    const value=!is_hyperscript ? (object_Has_Path(self.__public_model__, ref) ? get_Object_Value(self.__public_model__, ref) : parseScript(ref) ): null;
    const added=new Tuple();
    const garbage=new Tuple();
    let index=0;
    for(const [ind, atom] of node.NodeList.entries()){
      index++;
      if(index > len(virtualBuild.NodeList)) garbage.add(atom);
    }
    if(len(virtualBuild.NodeList) > len(node.NodeList)){
      for(let i=0;i<len(virtualBuild.NodeList)-len(node.NodeList); i++){
        added.add(virtualBuild.NodeList.at(len(node.NodeList)));
      }
    }
    if(len(added)){
      let key =0;
      for(let atom of added.values()){
        key++;
        let addedNode;
        if(is_hyperscript) addedNode=atom;
        else{
          let { type, props, children,is_hyperscript, hx__Element, alias  }=node.compiler_options.args;
          let { valToken, keyName }=alias;
          let  ctx={};
          if(valToken) ctx[valToken]=atom;
          if(keyName) ctx[keyName]=key;
          if(hx__Element.LabContext) ctx=assign(hx__Element.LabContext, ctx);
          self[$$$operands].initializedRender=false;
          addedNode=node.compiler_options.createElement();
          self[$$$operands].initializedRender=true;
          addedNode.LabContext=ctx;
          addedNode.compiler_options.index=len(src)+key;
        }
        observer.effectFlush.add(function(){
          findAndObserveProcessor(node, len(node.NodeList), addedNode);
        })
      }
    }
    if(len(garbage)){
      for(let atom of garbage.values()){
        observer.effectFlush.add(function(){
          inDOMElementNodesRemover(self, atom);
          node.NodeList.delete(atom);
        })
      }
    }
    Render_Effect_Reactive_Transform(self, node, virtualBuild, observer);
    node.compiler_options.src=value;
  }
  function _fromKey(obj, key){
    return isPObject(obj) ? values(obj)[key] : isSet(obj) ? arrSet(obj)[key] : isMap(obj) ? obj[obj.keys()[key]] :  isArray(obj) ? obj[key] : isNumber(key) ? Number(key) : null;
  }
  function linkUpdateHook(self, vnode, observer){
    if(!isPass(vnode.updated_hook)){
      observer.updated_hooks.add(vnode.updated_hook);
    }
  }
  const recordFieldTypes="auto,number,boolean,password,string,date,date-time,email,file,image,token,ip-address,json,slug,time,url,uuid,mtm,oto,fk,option,choice,regex,decimal,typed-option";
  const isFormFieldType=type=>_mapValue(recordFieldTypes, type);
  const FieldProps = {
    required:Boolean,
    options:[Array, Object, Tuple, Set],
    default:Any,
    unique:Boolean,
    writable:Boolean,
    validator:Function,
    primaryKey:Boolean,
    maxSize:Number,
    disabled:Boolean,
    label:String,
  }
  function processValidationTransform(type, record){
    
  }
  class AdminDatasaseTable{
    constructor(){
      
    }
    registerForm(record){
      
    }
  }
  class FormField {
    constructor(type, validators){
      if(!isString(type) && !isFormField(type)){
        $debug_log(`Parameter 1 at FormField instance expects a string value of a value FormField type`);
        return;
      }
      processValidationTransform(type, this);
    }
  }
  const isFormField= field=>field instanceof FormField;
  function validatorsIsValid(validators, type){
    if(!isPObject(validators)){
      $debug_log(`properties passed to field must be an object `);
      return false;
    }
  }
  function genericFormFieldsGenerator(type, xtruct){
    const FieldKlass=new Function('FormField', 'xtructcall', `
      class ${type} extends FormField{
        constructor(){
          super(...arguments);
          xtructcall(...arguments);
        }
      }
      const is${type}=(value)=> value instanceof ${type};
      return [ ${type}, is${type} ];
    `)
    return FieldKlass(FormField, isPFunction(xtruct) ? xtruct : pass );
  }
  const fieldKlassNames="AutoField,NumberField,BooleanField,StringField,DateField,DateTimeField,EmailField,FileField,ImageField,TokenField,IPAddressField,JSONField,SlugField,TimeField,OptionField,MTMField,OTOField,FKField,RegexField,ChoiceField,DecimalField,UUIDField,URLField,TypedOptionField,PasswordField";
  function createSystemFields(){
    const fields=createObj('Field')
    for(let [index, name] of fieldKlassNames.split(',').entries()){
      const [ klass, isKlass ] = genericFormFieldsGenerator(name, pass);
      const nmz=to_kebab_case(name.slice(0,-5));
      function createFormField(validators){
        if(!validatorsIsValid(validators, nmz)) return
        return new klass(nmz, validators);
      }
      fields[name]=new Function('createFormField', `
        return function ${name}(validators){
          return createFormField(validators);
        }
      `)(createFormField);
    }
    return fields;
  }
  const fields = createSystemFields();
  class BaseForm {
    self=undefined;
    FormFields={}
    constructor(name="Form", tableKeys=[]){
      if(!validateType(name, String) && !validateType(tableKeys, [ Array, Object ])){
        $debug_log(`"name" and "tableKeys" arguments of FormFields are nit valid dataTypes`);
        return;
      }
      const xtruct=parseScript(`class ${name}{}`);
      for(let [ key, value ] of getIterator(tableKeys)){
        if(isArray(tableKeys) && !isString(value)){
          $debug_log(`"tableKeys" array values expects strings`);
          return;
        }
        this.FormFields[isObject(tableKeys) ? key : value ] = isPObject(tableKeys) ? value : Any ;
      } 
      this.self=xtruct
    }
    create(fields){
      const name = this.self.name
      let fieldAlias={}
      let fieldKeys=keys(this.FormFields)
      if(!isPObject(fields)){
        for(let [ind, value] of getIterator([...arguments])){
          if(ind+1 > len(fieldKeys)){
            $debug_log(`arguments passed to create exceded the Form fields length`);
            return
          }
          fieldAlias[fieldKeys[ind]]=value
        }
        fields=fieldAlias;
      }
      const record=new this.self()
      for(let [key, value] of entries(fields)){
        if(!hasOwn(this.FormFields, key)){
          $debug_log(`"${name}" Form have no such field as "${key}"\n\n........during create\n`);
          return 
        }
        if(!isFormField(this.FormFields[key]) && !validateType(value, this.FormFields[key])){
          $debug_log(`invalid dataTypes received at "${key}" field \n\n........at "${name}" Form\n\ntype validation failed`);
          return;
        }
        record[key]=value
      }
      return record
    }
    createField(){
      
    }
    deleteField(){
      
    }
    clearForm(){
      
    }
    extendForm(){
      
    }
  }
  class Form extends BaseForm{
    constructor(name, tableKeys){
      super(...arguments);
    }
  }
  function getFieldType(field){
    if(!isFormField(field)){
      $debug_log(`isFieldTypeOf  argument 1 not a form Input field`);
      return false
    }
    return field
  }
  function isFieldTypeOf(field, type){
    if(!isFormField(field)){
      $debug_log(`isFieldTypeOf  argument 1 not a form Input field`);
      return false
    }else if(!isString(type) && !isFormFieldType(to_kebab_case(type))){
      $debug_log(`Input at argument 2 of isFieldTypeOf macro is not a valid houxit form field type`);
      return false;
    }
    return getFieldType(field) === to_kebab_case(type)
  }
  function createFormModel(){
    return preventX(new Form(...arguments))
  }
  function createFormAdmin(){
    return preventX(new AdminDatasaseTable(...arguments))
  }
  class houxitSignal{
    constructor(signal, func, options){
      this.signal=signal
      this.callback=func
      this.options=options
    }
    signal=undefined
    callback=undefined
    options=undefined
  }
  function _Resolve_Directives_Hydration(self, bindings, virtualNode, hx__Element, metrics){
    const { isRerender, is_hyperscript } = metrics;
    let { directive, value, key } = bindings;
    if(!isHouxitDirective(directive)){
      _With_Custom_Directives(self, bindings, virtualNode, hx__Element, metrics );
      return;
    }
    if(directive === "provide"){
      if(!validHouxitWidget(virtualNode?.GeneticProvider)) {
        $debug_log(`"$$provide" directive is only scoped to widget instances vnode only\n\n found on "${isNativeElement(virtualNode) ? virtualNode.outerHTML+" element" : ""}"`, self, true);
        return ;
      }
      $$dir_PROVIDE(self, bindings, virtualNode, hx__Element, metrics);
    }
    const directiveArgs=[self, bindings, virtualNode, hx__Element, metrics];
    if(!hasOwn(DirectiveMacros, directive)) {
      return;
    }
    if(directive === 'text') directiveArgs.push(true);
    DirectiveMacros[directive](...directiveArgs);
  }
  function dynamicPropRemover(obj, propName){
    for(let [key, value ] of entries(obj)){
      if(!key.includes(propName)) continue;
      let keyCache;
      if(key.startsWith('$$bind') || key.startsWith('$$slot') ) keyCache=key.slice(6);
      else if(key.startsWith('$$on')) keyCache=key.slice(4);
      keyCache=fall_AttrName(key);
      if(key.includes("|")) keyCache=keyCache.split('|').shift();
      if(propName === keyCache){
        delete obj[key];
        break;
      }
    }
    return obj;
  }
  function _Houxit_token_GENERATOR_(config, FN, frkey){
    if(!isFRKey(frkey) && !validateCollectionArgs(arguments,  {
      validators:[Object, Function, Symbol],
      max:3,
      min:1,
      name:'tokenGENERATOR'
    })) return  undefined;
    if(!isFRKey(frkey)) config = assign({
      size:10,
      type:'alpha'
    }, config );
    let uuid=generateUUID(config.size, config.type);
    if(isFalse(FN(uuid))) uuid=_Houxit_token_GENERATOR_(config,  FN, $factoryTokenKey);
    return uuid;
  }
  function tokenGENERATOR(config, Test_Callback){
    return _Houxit_token_GENERATOR_( config, Test_Callback );//type,size,
  }
  const builtInWidgetTypes="Build,Self,Motion,Provider,Suspense,Portal,Fragment,Memo";
  const nonSBIW=ww=> _mapValue("motion,suspense,portal,fragment,memo,motion", ww.slice(3))
  function Built_in_widget_Transform(self, vNode, hx__Element){
    const type=vNode.prototype_[$$BuiltinWidgetKey].slice(3);
    vNode.filesFilter.INSTANCE_NORMALIZER=self;
    vNode.filesFilter.hx__Element=hx__Element
    if(builtinValidWidget(vNode.prototype_, 'hx:build')) BuildWidgetNormalizer(self, vNode);
    else if(builtinValidWidget(vNode.prototype_, 'hx:self')) SelfWidgetNormalizer(self, vNode);
    else if(nonSBIW(vNode.prototype_[$$BuiltinWidgetKey])) NormalizingBuiltinRange(self, vNode);
  }
  function liquidateBuiltinGenerators(self, vNode, selfProp, prop){
    const is_hyperscript=vNode.is_hyperscript;
    let children=vNode.children;
    children = !is_hyperscript ? ( children ? children.NodeList : null ) : ( children && !isArray(children) ? [ children ] : children ? children : null );
    if(!selfProp) return children;
    const dataVnode=h(selfProp, assign({}, vNode.props || {}), children );
    if(prop === "BuildVNode") delete dataVnode.props.self;
    dataVnode.is_hyperscript=vNode.is_hyperscript;
    vNode.filesFilter[prop]=dataVnode;
  }
  function BuildWidgetNormalizer(self, vNode){
    let selfProp=vNode.props.self;
    const is_hyperscript=vNode.is_hyperscript;
    if(isString(selfProp) && !IS_VALID_TAGNAME(selfProp)){
      if (instance_Has_Widget(self, selfProp) ) selfProp = normalize_Widget(self, selfProp);
      else{
        $debug_log(`Build Widget Resolver was unable to find a widget with the provided name "${selfProp}"\n\n are you sure this is a correct reference to a builtIn widget or globaly/localy registered widget`, self, true);
        return;
      }
    }else if(!isString(selfProp) && !validHouxitWidget(selfProp)){
      $debug_log(`Provided value to the Build widget is not a valid Houxit Widget`, self, true);
      return;
    }
    liquidateBuiltinGenerators(self, vNode, selfProp, "BuildVNode");
  }
  function SelfWidgetNormalizer(self, vNode){
    const selfProp=self[$$$core].virtualNode.prototype_;
    liquidateBuiltinGenerators(self, vNode, selfProp, "SelfVNode");
  }
  function NormalizingBuiltinRange(self, vNode){
    let props=assign({}, vNode.props || {});
    if(builtinValidWidget(vNode.prototype_, 'hx:fragment') || builtinValidWidget(vNode.prototype_, 'hx:portal')) props = null;
    const children=liquidateBuiltinGenerators(self, vNode, null);
    vNode.filesFilter.$WidgetNormalizer={
      children,
      props
    }
  }
  function installTransformersArgumentations(self, child){
    const root= isTrue(self[$$$ownProperties].isInitialBuild) ? self : self[$$$core]._root;
    defineGetter(child[$$$core], '_root', root ) ;
    defineGetter(child[$$$core], '_parent', self ) ;
    for(let [ prop, content] of entries(root[$$$core].$globals.register)){
      child[$$$core].$globals.register[prop] = assign(child[$$$core].$globals.register[prop], content);
    }
  }
  function resolveInstanceWidgetNormalizer(self, vNode){
    const tagname=isBlockTag(vNode.type) ? vNode.type.slice(2).trim() : vNode.type;
    let widget;
    if(!isBlockTag(vNode.type) && !instance_Has_Widget( self , tagname )){
      $debug_log(`Template Compilation Error::\n\nUnresolved tagname "<${tagname}>"\n\n   ...if this is a houxit widget, make sure its registered through the "widgets" option or defined through the CustomElementsInstance.define() method if it's a customElement `, self, true);
      return false;
    }else if(isBlockTag(vNode.type)){
      if(isBuiltinBlocks(tagname)) return true;
      if(!instance_Has_Block(self, tagname)){
        $debug_log(`((Block Resolver Error))\n\n"${tagname}" block is not a registered block element`, self, true);
        return false;
      }else vNode.GeneticProvider=normalize_Block(self, tagname)
      return true
    }else if(_mapValue(BUILT_IN_WIDGETS, tagname)){
      widget=BUILT_IN_WIDGETS[tagname];
    }
    widget=normalize_Widget(self, tagname);
    if(!validHouxitWidget(widget)){
      $debug_log(`>>>> "${tagname}\n\nCannot compile value as a Houxit widget\nMaybe an invalid houxit widget value`, self, true);
      return false;
    }
    vNode.GeneticProvider=widget;
    vNode.prototype_=widget;
    return true;
  }
  function ResolveWidget(self, hx__Element, vNode, IS_RENDERLESS, slotsCompilerArgs){
    const widget=vNode.GeneticProvider;
    return $compilerEngine(self, vNode, hx__Element, slotsCompilerArgs);//$compilerEngine the widget flags, passed the widget to _Houxit_Build, sets global widgets from  its parents if any, installs all GLOBAL_WIDGETS_AND_PLUGINS, mounts the widget to a fragment and return the build'
  }
  function $compilerEngine ( self , virtualNode , hx__Element, slotsCompilerArgs ) {
    let { rawChildren, GeneticProvider:widget } =virtualNode
    const is_hyperscript=self[$$$core].map.is_hyperscript;
    const propsElements={};
    if(virtualNode.props) {
      Props_dilation_compile(virtualNode, self, hx__Element, {
        is_hyperscript
      }, propsElements);
      virtualNode.props=propsElements;
    }
    widget = defineWidget( widget );
    if(!validHouxitWidget(widget)) return;
    virtualNode[widgetTypeKey]=widget[widgetTypeKey];
    virtualNode.widget_instance=widget;
    virtualNode.filesFilter.slotsCompilerArgs=slotsCompilerArgs;
    if(isBuiltinWidget(virtualNode.prototype_)) Built_in_widget_Transform(self, virtualNode, hx__Element );
    if(isHouxitElement(hx__Element)) virtualNode[$buildHx_ElementKey]=hx__Element ;
    const child = new _Houxit_Build( virtualNode ) ;
    if( self ) {
      controllerHydration( self , child ) ;
      child.install( controllerGlobalPlugin , { self } ) ;//build the widget and other installations
    }
    return child.mount( _createFragment() ) ;//mounts the build to a houxit fragment
  }
  function controllerHydration( self , build ) {
    const globals=getGlobalRegistery(self)
    if( !len( globals.controller ) ) return build ;
    for( let genre of globals.controller.values() ) {
      build.controller( genre ) ;
    }
    installTransformersArgumentations(self, build )
    // build.property('$parent', self.build)
    return build;
  }
  function controllerGlobalPlugin ( build , options ) {
    for ( const [ key , value ] of entries( getGlobalRegistery(options.self).register ) ) {
      for ( const [ name, data ] of getIterator( value ) ) {
        if(key === 'widgets') build.widget( name , data ) ;//in the root, uses the build.widget prototype to define global widgets
        else if(key === 'mixins') build.mixin( data ) ;//in the root, uses the build.widget prototype to define global properties
        else if(key === 'filters') build.filter( name , data ) ;//in the root, uses the build.widget prototype to define global properties
        else if(key  === 'blocks') build.block( name , data ) ;//in the root, uses the build.widget prototype to define global properties
        else if(key === 'directives') build.directive( name , data );//in the root, uses the build.widget prototype to define global directive
        else if(key === 'handlers')  build.handler( name , data ) ;//in the root8, uses the build.widget prototype to define global handlers
        else if(key  === 'published') build.publish( name , data ) ;//in the root8, uses the build.widget prototype to define global published
        else if(key  === 'properties' ) build.property( name , data ) ;//in the root8, uses the buil/d.widget prototype to define global propertiess
      }
    }
  }
  function _createFragment(){
    const fragment=new DocumentFragment();
    define(fragment, 'isHouxit_Fragment',{
      value:true
    });
    define(fragment, 'NodeList',{
      value:[], 
      configurable,
      writable
    });
    define(fragment, 'PATCH_FLAGS',{
      value:new Set(), 
      configurable,
      writable
    });
    return fragment;
  }
  const devInfo="You're running the development version of houxit "+get_version().slice(7)+", make sure you switched to the minified build version with the (*.min.js) file extension when deploying to production.";//development information
  function __traverseRESOLVER(name){//dynamically resolving widget name
    const self=getCurrentRunningEffect({
      name:'traverse'
    });
    if(!validateCollectionArgs(arguments, {
      validators:[String],
      max:1,
      name:'traverse'
    })) return;
    let instance;
    if(!isHouxitBuild(self)) return;
    if (instance_Has_Widget(self, name) ){
      instance=normalize_Widget(self, name);
    }else{
      $debug_log(`traverse macro was unable to find a widget with the provided name "${type.name}"\n\n are you sure this is a builtIn/globaly/localy registered widget`, self, true);
      return;
    }
    return instance;
  }
  function traverse(name){
    return __traverseRESOLVER(...arguments);
  }
  function _directive_batch__(name, value, modifiers){//dynamically resolving and controlling of directives and arguments
    const self=getCurrentRunningEffect({
      name:'batch'
    });
    if(!validateCollectionArgs(arguments, {
      validators:[[String, Function, Object], Any, Array],
      max:3,
      min:1,
      name:'batch',
      required:[true]
    })) return;
    let instance=name;
    if(!isHouxitBuild(self)) return;
    if(!isString(name)) instance=name;
    else{
      if(!isHouxitDirective(name)){
        if (instance_Has_Directive(self, name) ){
          instance=normalize_Widget(self, name);
        }else{
          $debug_log(`batch macro was unable to find a directive with the provided name "${type.name}"\n\n are you sure this is a builtIn/globaly/localy registered directive`, self, true);
          return;
        }
      }
    }
    return {
      value,
      directive:instance,
      modifiers,
      binding:{}
    }
  }
  function batch(name, value, modifiers){
    return _directive_batch__(...arguments);
  }
  function _withDirectives(...dirs){
    const response = validateCollectionArgs(arguments, {
      min:1,
      name: "useDirs"
    })
    let props={};
    dirs=[ ...dirs ];
    if(!response && !len(dirs) ) return isPObject(props) ? props : {} ;
    const dirSet=new Tuple();
    if(len(dirs)){
      for(const directive of dirs.values()){
        if(isArray(directive)) directive = batch(...directive);
        dirSet.add(directive);
      }
    }
    props[dir$$__render]=dirSet;
    return props;
  }
  function useDirs(...directives ){
    return _withDirectives(...arguments )
  }
  function PropsParserContainment(setup, props){
    let value = setup.propValue.join("");
    let key = setup.openPropName.join("");
    if(!len(setup.propValue)) value = null;
    if(hasOwn(props, key)) props['__hx:keys__'].push([key, value ]);
    else props[key]=value;
    setup.openPropName=[];
    setup.openPropQuote=null;
    setup.isPropValue=false;
    setup.isPropName=true;
    setup.propValue=[];
    setup.namingSpace=false;
  }
  const QuoteRegex=/(['"`])/;
  function __HTMLPropsParser__(attrs, config, self){
    attrs=(attrs || "").trim()
    if(!attrs) return {};
    const props={
      ['__hx:keys__']:[]
    };
    const setup={
      openPropName:[],
      openPropQuote:null,
      propValue:[],
      isPropValue:false,
      isPropName:true,
      prev:null,
      next:null,
      namingSpace:false
    }
    for(let [index, str ] of entries(attrs)){
      index=Number(index);
      setup.next=attrs[index+1];
      const closure=()=> setup.prev=str;
      if(setup.isPropName){
        if(setup.namingSpace && (/\S/.test(str) || setup.next+1 == null || index+1 > len(attrs) )){
          if(!/=/.test(str) || setup.next == null || index+1 > len(attrs)) {
            PropsParserContainment( setup, props );
            if(!/[=]/.test(str) || /\S/.test(str) ) setup.openPropName.push(str);
            closure();
            continue;
          }else setup.namingSpace=false
        }
        if(/=/.test(str) && !setup.namingSpace){
          setup.isPropName=false;
          setup.isPropValue=true;
        }else if( len(setup.openPropName) < 1 && /\s/.test(str)){ 
          closure();
          continue;
        }
        if(len(setup.openPropName) && /\s/.test(str) ) setup.namingSpace=true;
        else if(setup.isPropName && ( setup.next == null || index+1 > len(attrs)) ){ 
          setup.openPropName.push(str);
          PropsParserContainment( setup, props );
          closure();
          continue;
        }else if(!setup.namingSpace && setup.isPropName) setup.openPropName.push(str);
      }else if(setup.isPropValue){
        if((/\s/.test(str) && len(setup.propValue) < 1)) {
          closure();
          continue;
        }
        if(len(setup.propValue) < 1 && QuoteRegex.test(str) && !setup.openPropQuote){ 
          setup.openPropQuote=str;
          closure();
          continue;
        }else if(setup.openPropQuote && QuoteRegex.test(str) && str !== setup.openPropQuote ){
          setup.propValue.push(str);
          closure();
          continue;
        }
        if((setup.openPropQuote && QuoteRegex.test(str) && str=== setup.openPropQuote) || (!setup.openPropQuote && (/(\s$)/.test(str) || /(\s$)/.test(setup.next) || ( index+1 === len(attrs) || setup.next == null) ))){
          if( (/(\s$)/.test(setup.next) || index+1 === len(attrs) || setup.next == null) && !(setup.openPropQuote && QuoteRegex.test(str) && str=== setup.openPropQuote) ) setup.propValue.push(str);
          PropsParserContainment( setup, props );
          closure()
          continue
        }else setup.propValue.push(str);
      }else if(len(setup.openPropName)) PropsParserContainment( setup, props );
      closure();
    }
    if(len(setup.openPropName)) PropsParserContainment( setup, props );
    if(!len(props['__hx:keys__'])) delete props['__hx:keys__'];
    return props;
  }
  function HTMLPropsParser(attrs){
    return __HTMLPropsParser__(attrs);
  }
  const isUncompiledChildrenTags=(txt)=> new Set("script,style,title,textarea".split(',')).has(txt);
  class comment{
    constructor(value){
      if(value && isString(value)){
        this.content=value;
      }
    }
    content="";
  }
  class text{
    constructor(value){
      if(value && isString(value)){
        this.content=value;
        this.rawChildren=value;
      }
    }
    content=""
    rawContent=""
    scriptsDeps=[]
  }
  const isHtmlComment=(value) => value instanceof comment;
  const isHtmlText=(value) => value instanceof comment;
  function generateBlockTagRegex(delimiters){
    let [ open, close ] = !delimiters ? [ "{{", "}}"] : delimiters;
    open = hasSpecialCharacters(open) ? escapeDecoder(open) : open;
    close = hasSpecialCharacters(close) ? escapeDecoder(close) : close;
    return new RegExp(`(${open}(\\/)?::([\\w\\-$:]+)(.*?)(\\/)?${close})`,'mg');
  }
  const emptyTagRegex=/\<[\/]?[ ]*\>/;
  const isEmptyTag=(tag)=>emptyTagRegex.test(tag);
  const isOpenEmptyTag=(tag)=>/(\<[ ]*\>)/.test(tag);
  const isCloseEmptyTag=tag=>/(\<\/[ ]*\>)/.test(tag);
  const openingTagsRegex = /(\<[ ]*\>|\<\/[ ]*\>)|(<(\/)?([\w\-\$!:\#\@.()[\]%&]+)(\s+[^>]*?(?:(?:[\w]+[_!@#$'"%^&*()+\-\[\]{};:\\|,.<\/?~`]*)|(?:'[^']*')|(?:"[^"]*")))*\s*(\/)?>)|([\w \s!@#$'"%^&*()+\-\[\]{};:\\|,.\/?`~]+)/mg;
  const openingTagRegex=/<([\w\-\$!:\#\@.()[\]%&]+)(\s+[^>]*?(?:(?:[\w]+[_!@#$'"%^&*()+\-\[\]{};:\\|,.<\/?`~]*)|(?:'[^']*')|(?:"[^"]*")))*\s*(\/)?>/m;
  const isOpeningTag = (source)=> openingTagRegex.test(source);
  const closingTagRegex= /<[\/]([\w$.:\-\@()[\]%&]+)[ ]*>/;
  const isClosingTag=(source)=> closingTagRegex.test(source);
  const isText=(text)=> !openingTagRegex.test(text) && /([\w \s!@#$'"%^&*()+\-\[\]{};:\\|,.\/?`~]+)/m.test(text);
  const openingTagAttrRegex=/^<[\w\-\$!\@:.()[\]%&]+([\s\S]*[^\/>])?\s*(\/)?>\s*$/m;
  const JSXParserRegex=/hx:\(\(__(\d)__\)\)/;
  const isOpeningCommentTag=(tag)=> /<!-->/.test(tag);
  const isClosingCommentTag=(tag)=> /<\/-->/.test(tag);
  const commentRegex=/((<!--)|(-->))/g;
  function compelToResolveTagname(self, vNode, config={}){
    if((isHouxitBuild(self) && isString(vNode.type) && !IS_VALID_TAGNAME(vNode.type))){
      resolveInstanceWidgetNormalizer(self, vNode);
    }else if(config.JSXParser && isString(vNode.type) && JSXParserRegex.test(vNode.type)){
      const instance=normalizeJSXPropValue(config, vNode.type);
      vNode.type=instance;
      if(validHouxitWidget(instance)){
        vNode.GeneticProvider=instance;
        vNode.prototype_=instance;
      }
    }
  }
  function finishTagLoader(tagName, setup, NodeList, self, config, tagMatch){
    let { loaderList, trackNodes, child_src } = setup;
    let activeObj=loaderList[0][1];
    activeObj.rawChildren=child_src || "";
    if(isUncompiledChildrenTags(tagName)) activeObj.children=child_src;
    else if(child_src?.trim() && config.deep){
      activeObj.children=__HouxitHTMLParser__(child_src, [], config, self);
      if(JSXParserRegex.test(activeObj.rawChildren)){ 
        activeObj.rawChildren=activeObj.rawChildren.replace(JSXParserRegex, (match, num)=>{
          const instance=config.JSXParser.sources[Number(num)];
          if(canRender(instance)) return instance;
          return match;
        });
      }
    }else if(tagMatch.trim()) activeObj.rawChildren=activeObj.rawChildren+tagMatch;
    compelToResolveTagname(self, activeObj, config);
    NodeList.push(activeObj);
    loaderList.splice(0);
    trackNodes.splice(0);
    return "";
  }
  function normalizeJSXPropValue(config, value){
    const index=Number(value.match(JSXParserRegex)[1]);
    return config.JSXParser.sources[index];
  }
  function normalize_Props_State(vnode, self){
    const props=vnode.props;
    return props;
  }
  function normalize_jsx_props(vnode, config){
    for(let [key, value] of entries(vnode.props)){
      if(JSXParserRegex.test(value)) vnode.props[key]=normalizeJSXPropValue(config, value);
      else if(JSXParserRegex.test(value)){
        const instance=normalizeJSXPropValue(config, key);
        if(!isString(instance)) {
          $debug_log(`property key value passed to the "html" macro is not a valid prop name\n\ntype of "${typeof instance}" found >>>> Expects a "string" value`);
          return;
        }
        vnode.props[instance]=vnode.props[key];
        delete vnode.props[key];
      }
    }
  }
  function openingTagHydrate(tagMatch, NodeList, setup, metrics){
    const { config, self } = metrics;
    let { loaderList, trackNodes, child_src, isComment } = setup;
    const is_hyperscript=config.is_hyperscript;
    let [ match, tagName ] =isOpeningTag(tagMatch) ? tagMatch.match(openingTagRegex) : [];
    let vnode= new vNodeClass(tagName);
    if(isOpeningCommentTag(tagMatch)){
      vnode= new comment();
      if(isComment){
        child_src=child_src+tagMatch;
      }else{
        isComment=true;
        loaderList.push(['comment', vnode]);
      }
    }else if(isComment){
      child_src=child_src+tagMatch;
    }
    if(isComment) {
      isComment=true;
      child_src=child_src+tagMatch;
      return {
        child_src,
        isComment,
        response:true
      };
    }
    const [ attrsMatch, attrs, selfClosed ] = tagMatch.match(openingTagAttrRegex) ;
    vnode.props=__HTMLPropsParser__(attrs, null, self);
    if(config.JSXParser && vnode.props) normalize_jsx_props(vnode, config);
    if(!is_hyperscript && isHouxitBuild(self)) vnode.props=normalize_Props_State(vnode, self);
    if(hasOwn(vnode.props, 'key')){
      vnode.key=vnode.props.key;
      delete vnode.props.key;
    }
    if(attrs && /::([\w\-$]+)/.test(tagName)){
      if(!hasOwn(vnode.props, 'exp')  || len(vnode.props) > 1 ) vnode.props={
        exp:attrs
      }
      vnode.props.exp=escapeReverseDecoder(vnode.props.exp || "");
    }
    if(len(vnode.props) < 1) vnode.props = null;
    const isSelfClosed= selfClosed && selfClosed.trim() == "/";
    if( !(len(loaderList)) && ((isBlockTag(tagName) && isBuiltinVoidBlocks(tagName.slice(2))) || (IS_HTML_VOID_TAG(tagName) || isSelfClosed))){
      vnode.children=null;
      vnode.rawChildren=null
      compelToResolveTagname(self, vnode, config);
      NodeList.push(vnode);
      return  {
        child_src,
        isComment:false,
        response:false
      };
    }
    if(len(loaderList)) {
      child_src=child_src+tagMatch;
      trackNodes.push(tagName);
      return  {
        child_src,
        isComment:false,
        response:false
      };
    }
    loaderList.push([tagName, vnode]);
    return  {
      child_src,
      isComment:false,
      response:true
    };
  }
  function parserSourceInitializer(source, self){
    return source.replace(generateBlockTagRegex(isHouxitBuild(self) ? self[$$$core].settings.delimiters : undefined), (match, timing, ClosingTag, name, value, selfClosed)=>{
      return `<${ClosingTag ? "/" : "" }::${name} ${ !ClosingTag ? "exp="+'"'+escapeDecoder(value)+'"' : "" } ${selfClosed ? "/" : ""}>`;
    }).replace(commentRegex, (match, path, r)=>{
      return /<!--/.test(match) ? "<!-->" : /-->/.test(match) ? "</-->" : match ;
    });
  }
  function __HouxitHTMLParser__(source, NodeList=[], config={}, self){
    if(!isString(source) && !source.trim()) return !isArray(NodeList) ? [] : NodeList;
    assign(config, {
      deep:true,
      trim:true
    })
    source=parserSourceInitializer(source, self);
    let tag_matches=source.match(openingTagsRegex);
    let child_src="";
    let skipComment=false;
    let loaderList=[];
    let trackNodes=[];
    let isComment=false;
    NodeList = NodeList || [];
    for(let [ index, tagMatch ] of tag_matches.entries()){
      if(config.trim && !(len(loaderList) && isUncompiledChildrenTags(loaderList[0][0]) )){ 
        tagMatch = tagMatch.trim();
        if(tagMatch == "") continue;
      }else if(!config.trim && !(len(loaderList) && isUncompiledChildrenTags(loaderList[0][0]) )) tagMatch=tagMatch.trim();
      tagMatch = isOpenEmptyTag(tagMatch) ? "<hx:fragment>" : isCloseEmptyTag(tagMatch) ? "</hx:fragment>" : tagMatch ;
      if(isOpeningCommentTag(tagMatch) || isOpeningTag(tagMatch) ) {
        if(isOpeningCommentTag(tagMatch) && len(loaderList)) {
          child_src=child_src+tagMatch.slice(0, -1);
          skipComment=true;
          continue;
        }
        let response=openingTagHydrate(tagMatch, NodeList, {
          loaderList,
          trackNodes,
          child_src,
          isComment
        }, {
          config,
          self
        });
        child_src=response.child_src;
        isComment=response.isComment;
        if(!response.response) continue;
      }else if(isClosingCommentTag(tagMatch) || isClosingTag(tagMatch) ){
        if(isClosingCommentTag(tagMatch) ){
          if(skipComment){
            child_src=child_src+tagMatch.slice(2);
            skipComment=false;
            continue;
          }
          if(isComment){
            const comment=loaderList[0][1];
            if(isHtmlComment(comment)) comment.content=child_src;
            child_src="";
            loaderList.splice(0);
            isComment=false;
            NodeList.push(comment);
          }
          continue;
        }else if(isComment){
          child_src=child_src+tagMatch;
          continue;
        }
        let [ match, tagName ]=tagMatch.match(closingTagRegex);
        let lastLoader=trackNodes[len(trackNodes)-1];
        if(len(loaderList)){
          if(config.JSXParser && tagName === "%%") child_src= finishTagLoader(tagName, {
            loaderList,
            trackNodes,
            child_src
          }, NodeList, self, config, tagMatch);
          else if(len(trackNodes) && new Set(trackNodes).has(tagName) ){
            child_src=child_src+tagMatch;
            let mIndex=trackNodes.findLastIndex((f)=> f== tagName)
            if(mIndex > 0) trackNodes.splice(mIndex, 1);
            continue;
          }else if(tagName === loaderList[0][0]){
            child_src=finishTagLoader(tagName, {
              loaderList,
              trackNodes,
              child_src
            }, NodeList, self, config, "");
          }else child_src=child_src+tagMatch;
        }
      }else if(isText(tagMatch)){
        let useObjChild=undefined
        if(JSXParserRegex.test(tagMatch)) {
          tagMatch=tagMatch.replace(JSXParserRegex, (match, num)=>{
            const srcValue=config.JSXParser.sources[Number(num)];
            if(canRender(srcValue)) return srcValue;
            useObjChild={
              srcValue
            }
            return match;
          });
        }
        if(len(loaderList)) child_src=child_src+tagMatch;
        else NodeList.push(useObjChild ? useObjChild.srcValue : tagMatch);
      }
    }
    if(len(loaderList)){
      if(isComment){
        const comment=loaderList[0][1];
        if(isHtmlComment(comment)) comment.content=child_src;
        child_src="";
        loaderList=[];
        isComment=false;
        trackNodes=[];
      }else {
        child_src = finishTagLoader(loaderList[0][0], {
          loaderList,
          trackNodes,
          child_src
        }, NodeList, self, config, "");
      }
    }
    return NodeList;
  }
  function HTMLParser(html, NodeList, config, self ){
    return __HouxitHTMLParser__(...arguments);
  }
  function negotiateRawDirective(self, node){
    if(!node.props) return;
   const { hasDir, getDir, getKey } = dirExistenceCheck(node.props, "$$raw");
    if(isTrue(hasDir) && isHouxitBuild(self) )  {
      node.filesFilter['dir--raw']=getDir;
    }
  }
  function specializedTemplateProductionProcessor(self, attributes, node, metrics, isRerender=false, config ){
    let [ hx__Element, NodeList , tagName, fall ]=metrics;
    let Vnode;
    if(config.if_Block && !config.props?.status) return
    if(isHouxitBuild(self)){
      negotiateRawDirective(self, node);
      if(!config.slotBindings && IS_VALID_TAGNAME(tagName)) {
        config={
          contextScope:"children_Block",
          children_Block:true,
          props:{
            subscriptions:[]
          },
          ctx:{}
        }
      }else if(config.slotBindings && !node.is_hyperscript) hx__Element.VNodeManager.slotBindings=config.slotBindings;
      Vnode=createHouxitElement(node, self, false, assign({}, hx__Element?.LabContext), NodeList, assign({}, fall), isRerender, hx__Element );
    }else{
      let children=null;
      if(node.children){
        children= isUncompiledChildrenTags(tagName) ? node.children : _HouxitTemplateParser(node.rawChildren, null, true);
      }
      Vnode=defineVNode({
        type:tagName, 
        props:len(attributes) ? attributes : null,
        children
      })
    }
    NodeList.add(Vnode)
  }
  const validAttrNameRegex= /[\w\$]+/;
  function transcript_to_VNodeClass(){
    
  }
  function templateElementNodeCompiler(self, vNode, hx__Element, config, isRerender, NodeList, fall, ign=false ){
    let { type:tagName, props, children, rawChildren, key } = vNode;
    let attributes=props;
    if(!config?.contextScope){
      fall=assign({}, fall);
    }
    let context=smartDextCtxMerging(hx__Element?.LabContext, fall);
    if(config) mountConstBlockTransform(self, context, config, hx__Element);
    vNode.hx__Element=hx__Element;
    vNode.ctx=context;
    const args=()=> [ hx__Element, NodeList, tagName, context ];
    if(isBlockTag(tagName)) {
      if(!isHouxitBuild(self)) {
        $debug_log(`block tags Cannot be used in build/static templates mode`, self, true);
      }else blockElementsPreProcessors(self, vNode, isRerender, args(), config );
    }else specializedTemplateProductionProcessor(self, attributes, vNode, args(), isRerender, config);
  }
  function templateTextNodeCompiler(self, node, hx__Element, config, isRerender, NodeList, fall){
    if(node){
      let LabContext;
      if(len(config.ctx)){
        fall=smartDextCtxMerging(fall||{}, config.ctx||{})
      }
      if(fall) {
        LabContext=smartDextCtxMerging(hx__Element?.LabContext || {} , fall );
        if(hx__Element) {
          hx__Element.LabContext=LabContext
          LabContext=null
        }
      }
      const value=node;
      node=self ? new HouxitTextElement(value, self, hx__Element, LabContext, isRerender) : value;
      NodeList.add(node);
    }
  }
  function generateTemplateClasses(self, parser, hx__Element, config, isRerender, NodeList, fall ){
    fall=assign({}, fall)
    for (let [ index, node ] of parser.entries()){
      if(node){
        if(isString(node) && node.trim()){
          templateTextNodeCompiler(self, node, hx__Element, config, isRerender, NodeList, fall);
        }else if(isHtmlComment(node)){/*Ignore comment nodes*/pass;
        }else if(isRenderVNodeClass(node)){
          templateElementNodeCompiler(self, node, hx__Element, config, isRerender, NodeList, fall )
        }
      }
    }
  }
  function _HouxitTemplateParser(html, self, parent, hx__Element, fall, isRerender=false, config={}){
    if(!html && !validateType(html, (String, Array, Object))) return null;
    const initializedRender=self[$$$operands]?.initializedRender;
    const parser= isString(html) ? __HouxitHTMLParser__(html, [], {
      trim:true,
      is_hyperscript:isHouxitBuild(self) && config.is_hyperscript
    }, self) : isObject(html) ? [ html ] : isArray(html) ? html : [] ;
    const NodeList=new Tuple();
    generateTemplateClasses(self, parser, hx__Element, config, isRerender, NodeList, fall );
    if(self && !config.contextScope === 'children_Block' && !initializedRender) return _getNodeListResponse(NodeList.list(), isHouxitBuild(self) ? self : parent);
    else if(isRerender) return NodeList.list();
    else return len(NodeList) > 1 ? NodeList.list() : len(NodeList) === 1 ? NodeList.shift() : null ;
  }
  function mountConstBlockTransform(self, context, config, hx__Element){
    if(!isValidCtxType(config.contextScope) && !config.ctx && !len(config.ctx)) return;
    if(config.ctx && hasOwn(config.ctx||{}, $$dexTransformKey)){
      smartDextCtxMerging(context, config.ctx);
    }else if(config.ctx && len(config.ctx) && !hasOwn(context, keys(config?.ctx||{})[0] )){
      const key=keys(config.ctx)[0];
      if(key) context[key]=config.ctx[key];
    }
    return context;
  }
  function controlBuiltInBlocks(self, node, blockN, isRerender, metrics, config){
    const [ hx__Element, NodeList, tagName, context, fall ] = metrics ;
    const args=()=>[ self, node, blockN, isRerender, metrics ]
    const children=node.children
    const exp=node.props.exp
    let template=[]
    let subscribers=[];
    let data;
    const ctx=[children, exp ]
    if(blockN === 'if') template = blockIFPreprocessor(...args(), ctx);
    else if(blockN === 'else' || blockN === "else:if") blockElseIfPreprocessor(self, node, config, blockN);
    else if(blockN === 'for') template = blockForProcessor(...args(), ctx);
    else if(blockN === 'const') blockConstPreprocessor(...args(), ctx, config);
    return !isArray(template) ? (validateType(template, [Set, Tuple]) ? [...arrSet(template)] : [template] ) : template ;
  }
  function blockConstPreprocessor(self, node, blockN, isRerender, metrics , [children, exp], config){
    const [ hx__Element, NodeList, tagName, context, fall ] = metrics ;
    if(!hx__Element){
      $debug_log(`((Unresolved top-level block))>>>> The "::const" block tag Cannot be used on a top level scope.\n\nExcept as a slot, elemeng child or within another block content tag`, self, true);
      return [];
    }
    if(!config || !config.ctx) config={
      ctx:hx__Element.LabContext
    }
    if(!variableDeclarationRegex.test(exp)){
      $debug_log(`"${exp}" statement is not recognised or not a valid statement or expression`, self);
      return [];
    }
    let [ match, variable, expression ] = exp.match(variableDeclarationRegex);
    variable=variable.trim();
    if(!isDestructureSyntax(variable) && !isValidIdentifier(variable)){
      $debug_log(`"${variable}" is an invalid identifier`, self);
      return []
    }
    const data = _$runModelBind(self, expression.trim(), hx__Element || context );
    if(isDestructureSyntax(variable)){
      if(isFalse(destructWarn(variable, data, self))){
        return []
      }
      config.ctx[$$dexTransformKey]={
        sourcesArray:[data],
        syntaxArray:[variable]
      }
    }else if(!hasOwn(context, variable)){
      define(context, variable, { 
        value:data, 
        enumerable, 
        configurable,
        writable
      });
    }else if(hasOwn(context, variable)){
      $debug_log(`"${variable}" const block namespace already declared`, self);
    }
  }
  function blockForProcessor(self, node, blockN, isRerender, metrics , [children, exp]){
    const [ hx__Element, NodeList, tagName, context, fall ] = metrics ;
    let Loop_Data=For_Loop(self, exp, hx__Element, true);
    let template = []
    if(!isIterable(Loop_Data.obj) && !isNumber(Loop_Data.obj)){
      $debug_log(`${getType(Loop_Data.obj)} value passed to the if block is not an iterable object`, self, true);
      return template;
    }
    function factoryRender(option, config){
      return _HouxitTemplateParser(children, self, true, hx__Element, option, isRerender, config);
    }
    iterate(unwrap(Loop_Data.obj), Loop_Data.loopType).test((value, key, index)=>{
      const options=assign(fall||{}, {});
      const config={
        contextScope:'for_Block',
        for_Block:true,
        props:{
        
        },
        ctx:{}
      }
      mapCTXFallProps(self, {
        valToken:Loop_Data.valToken?.trim(),
        keyName:Loop_Data.keyName?.trim(),
        index:Loop_Data.index?.trim()
      }, { 
        ky:key,
        vl:value,
        count:index
      }, options );
      const source=factoryRender(options, config);
      if(isCollection(source)){
        for(let [ ind, vnode] of getIterator(source)){
          template.push(vnode);
        }
      }else template.push(source);
      
    });
    return template;
  }
  function blockIFPreprocessor(self, node, blockN, isRerender, metrics, [rawChildren, exp]){
    const [ hx__Element, NodeList, tagName, context, fall ] = metrics ;
    const children=node.children || [];
    const [ subscribers, data ]=effectDependencyTracking(self, ()=>{
      return _$runModelBind(self, exists(exp.trim()) ? exp : "undefined", hx__Element);
    })
    let template = []
    const condition = unwrap(data) ? true : false;
    const config={
      contextScope:"if_Block",
      if_Block:true,
      props:{
        status:condition,
        prevBlock:"::if",
        activeBlock:"::if",
        shouldContinue:!condition
      },
      ctx:{},
      keywordLists:[]
    }
    for(const [index, vNode] of children.entries()){
      const res=conditionalBlockCompile(self, vNode, metrics, config, NodeList, vNode.props?.exp);
      if(!res) break;
    }
  }
  function conditionalBlockCompile(self, vNode, metrics, config, NodeList, exp){
    const [ hx__Element, tagName, context, fall ] = metrics ;
    const isRerender=false;
    const blockN=!isString(vNode) ? ( isBlockTag(vNode.type) ? vNode.type.slice(2) : vNode.type) : vNode;
    if(isString(vNode)){
      if(!config.props.status) return true;
      const node=new HouxitTextElement(vNode, vNode);
      NodeList.add(node);
      return true;
    }else if( blockN === 'else:if'){
      if(!conditionTagOrderCheck(self, config, 'else:if')) return false;
      if(!config.props.shouldContinue) return false;
      const [ subscribers, data ]=effectDependencyTracking(self, ()=>{
        return _$runModelBind(self, exists(exp.trim()) ? exp : "undefined", hx__Element);
      })
      const condition=unwrap(data) ? true : false;
      config.props.status=condition;
      config.props.shouldContinue=!condition;
      return true;
    }else if(blockN === "else" ) {
      if(!conditionTagOrderCheck(self, config, 'else')) return false;
      if(!config.props.shouldContinue) return false;
      config.props.status=true;
      config.props.shouldContinue=false;
      return true;
    }
    if(!config.props.status) return true;
    const vNodes=_HouxitTemplateParser(vNode, self, true, hx__Element, fall, isRerender, config);
    iterate(!isArray(vNode) ? [ vNodes ] : vNodes).test((node)=> NodeList.add(node));
    return true;
  }
  function conditionTagOrderCheck(self, config, tag){
    const prev=config.keywordLists[len(config.keywordLists)-1];
    if(prev === 'else' && (tag === 'else' || tag === 'else:if')){
      $debug_log(`An "${prev}" block already existing\n\nUnresolved Error:: cannot precced an "${tag}" block`, self, true);
      return false;
    }
    config.keywordLists.push(tag);
    return true;
  }
  function blockElseIfPreprocessor(self, node, config, blockN){
    $debug_log(`The "${blockN}" block cannot be used outside of the "::if" template block scope`, self, true);
    return;
  }
  function instance_Has_Block(self, name ){
    name = name.startsWith("::") ? name.slice(2) : name;
    return _mapValue(self[$$$register]?.blocks || {}, name ) ;
  }
  const normalize_Block=(self, name)=>{
    name = name.startsWith("::") ? name.slice(2) : name;
    return _mapValue(self[$$$register].blocks, name) ? self[$$$register].blocks[name]: null;
  }
  function blockElementsPreProcessors(self, vNode, isRerender, metrics, config){
    let children = vNode.children;
    const [ hx__Element, NodeList, tagName, context, fall ] = metrics ;
    const blockN=tagName.slice(2).trim();
    let renderedNodes=[];
    if(isBuiltinBlocks(blockN)) {
      renderedNodes = controlBuiltInBlocks(self, vNode, blockN, isRerender, metrics, config)
    }else if(instance_Has_Block(self, blockN)){
      renderedNodes=customBlocksTraverse(self, vNode, blockN, isRerender, metrics);
    }else{
      $debug_log(`((Block Resolver Error))\n\n"${blockN}" block is not a registered block element`, self, true);
      return;
    }
    for(const [ index, vnode ] of (!isArray(renderedNodes) ? (validateType(renderedNodes, [Set, Tuple]) ? [...arrSet(renderedNodes)] : [renderedNodes] ) : renderedNodes).entries()){
      if(vnode) NodeList.add(vnode);
    }
  }
  function customBlocksTraverse(self, node, blockN, isRerender, metrics){
    let [ hx__Element, NodeList, tagName, context, fall ] = metrics ;
    const children=node.rawChildren;
    const [ subscribers, data ]=effectDependencyTracking(self, ()=>{
      return _$runModelBind(self, node.props.exp, hx__Element);
    });
    function factoryRender(ctx={}){
      if(!isPObject(ctx)){
        $debug_log(`context data passed to factoryRender expects a plain object`, self);
      }
      fall=smartDextCtxMerging(fall||{}, ctx);
      return _HouxitTemplateParser(children, self, true, hx__Element, fall, isRerender);
    }
    const template = factoryRender()
    const block=normalize_Block(self, blockN );
    const blockCalllback=isObject(block) ? block.block : block
    const response=blockCalllback.call(self.__public_model__, !template ? [] : !isArray(template) ? (validateType(template, [Set, Tuple]) ? [...arrSet(template)] : [template] ) : template, data, factoryRender )
    return !response ? [] : !isArray(response) ? (validateType(response, [Set, Tuple]) ? [...arrSet(response)] : [response] ) : response
  }
  function _getNodeListResponse(NodeList, parent=false){
    NodeList=isSet(NodeList) ? arrSet(NodeList) : isTuple(NodeList) ? NodeList.list() : NodeList;
    if(isTrue(parent) && len(NodeList)) {
      const response = len(NodeList) > 1 ? NodeList : NodeList[0];
      return isString(response) ? new HouxitTextElement( response, parent) : response ;
    }else if(len(NodeList)) return len(NodeList) > 1 ?  new HouxitFragmentElement( NodeList, parent) : ( isPrimitive(NodeList[0]) ? new  HouxitTextElement(isNull(NodeList[0]) ? "" :  NodeList[0], parent) : NodeList[0] ) ;
    else return null ;
  }
  function normalizePreJSXFormat(strings, values){
    let boundJoin=[];
    const restTag=(count)=> `hx:((__${count}__))`
    for(let [index, strs ] of strings.entries()){
      boundJoin.push(strs);
      if(hasOwn(values, index)) boundJoin.push(restTag(index));
    }
    return __HouxitHTMLParser__(boundJoin.join(""), [], {
      JSXParser:{
        sources:values
      }
    });
  }
  function html( strings, ...values){
    return __EncodeJSXParser__(strings, values)
  }
  function __EncodeJSXParser__(strings, values){
    if(!isFunction(strings.reduce)){
      $debug_log(`html macro can only be called with backticks embeded directly to method name\n\n"html\`<templates>\`" instead of "html()"\nCheck html macro call`);
      return
    }
    if(len(values)) return normalizePreJSXFormat(strings, values);
    const html = strings.reduce(( acc, str, i) => {
      const value = !isNull( values[i]) ? values[i] : '';
      return acc + str + value;
    }, ''); 
    if(!isString(html)){
      $debug_log(`html parser macro expects strings values`);  
      return null;
    }
    return __HouxitHTMLParser__( html, [], {
      trim:true
    }, null);
  };
  function importStyleSheet(path){
    let el=generateTemplateElement({
      type:'link',
      props:{
        rel:'stylesheet',
        href:path
      }
    })
  }
  function markdown(mkd){
    if(!isString(mkd)){
      $debug_log(`markdown helper expects strings values`);
      return null
    }
  }
  function createCustomElement(options){
    return _createCustomElement.call(this, ...arguments);
  }
  function _createCustomElement(opts){
    this.is_Custom_Node=true;
    const response=validateCollectionArgs(arguments, {
      count:1,
      validators:[[Function,Object]],
      name:"createCustomElement"
    });
    if(!response) return
    opts=defineWidget(opts);
    const isMNEOwnOptions=opt=>_mapValue("plugin,onConnected,onDisconnected,onAdopted,onAttrChanged",opt);
    entries(opts).forEach(([key, value])=>{
      if(!isMNEOwnOptions(key) && !isValidWidgetOption(key)){
        $debug_log(`invalid option value....\n\n "${key}" is not a recognised createCustomElement option `);
        return;
      }
    });
    const LifeCycleHooksList="onConnected,onDisconnected, onAdopted,onAttrChanged,plugin";
    let Hooks={};
    entries(opts).forEach(([ind, value])=>{
      if(_mapValue(LifeCycleHooksList, ind)){
        if(!isFunction(value)){
          $debug_log(`LifeCycle callback error\n\n"${ind}" is a callback function, received an invalid type`);
          return;
        }
        if('onConnected' === ind) define(Hooks, 'connectedCallback',{value, configurable});
        if('onDisconnected' === ind) define(Hooks, 'disConnectedCallback',{value, configurable});
        if('onAdopted' === ind) define(Hooks, 'adoptedCallback',{value, configurable});
        if('onAttrChanged' === ind) define(Hooks, 'attributeChangedCallback',{value, configurable});
      } 
    })
    HouxitCustomElement.prototype.disConnectedCallback=Hooks.disConnectedCallback || pass;
    HouxitCustomElement.prototype.adoptedCallback=Hooks.adoptedCallback || pass;
      HouxitCustomElement.prototype.attributeChangedCallback=Hooks.attributeChangedCallback || pass;
    HouxitCustomElement.prototype.connectedCallback=connectedCallback;
    function connectedCallback(){
      const props=new Object();
      if(len(entries(this.attributes))){
        for( const [key, attr ] of entries(this.attributes)) {
          const { name, value } = attr;
          props[name]=value
        }
      }
      const shadow=this.attachShadow({ mode: 'open'});
      const template=defineVNode({
        type:opts,
        props
      })
      // this.replaceWith(template)
      shadow.appendChild(template);
      const user_defined_callback=Hooks.connectedCallback || pass
      user_defined_callback.call(this, ...arguments);
    }
    function render(){
      return HouxitCustomElement;
    }
    render.define=function define(name, inherit){
      if(!isString(name) || isEmptyStr(name) || IS_VALID_TAGNAME(name)){
        $debug_log('Name positional argument passed to define is not a string or a valid name value\n\n or may have conflicted with native html/svg/mathml tags');
        return;
      }
      if(inherit && !isString(inherit) && !IS_HTML_TAG(inherit)){
        $debug_log(`problem with the inherit value, \n\n may not be a string value or a valid HTML tagName`);
        $debug_log(`CustomElement registration failed`);
        return;
      }
      customElements.define(name, HouxitCustomElement, inherit ? { 
        extends:inherit
      } : {});
    }
    return render;
  }
  createCustomElement=createCustomElement.bind({});
  const validStoreOptions="model,actions";
  const isValidStoreOption=opt=>_mapValue(validStoreOptions, opt);
  class effectStorePlugin{
    constructor(data){
      
    }
    plugin=function plugin(build, options){
      const store=createObj('Store')
      build.property('$store', store);
    }
  }
  function openEffectStore(data){
    return new effectStorePlugin(data);
  }
  class Anchor extends Widget{
    constructor(){
      super()
      this[$$BuiltinWidgetKey]='hx:acchor'
    }
    params={
      to:{
        type:String,
        default:'/'
      }
    }
    handlers={
      clickHandler(){
        
      }
    }
    build(params, { slots }){
      return ()=>defineVNode({
        type:'a', 
        props:{ 
          onClick:useModifiers( this.clickHandler, [ 'prevent' ]),
        }, 
        children: slots.default()
      });
    }
  }
  class Display extends Widget {
    constructor(){
      super()
      this[$$BuiltinWidgetKey]='hx:nav-view'
    }
    build(params, { slots }){
      
      return ()=> slots.default()
    }
  }
  function mergerPathsToRouter(router){
    
  }
  class buildRouterPlugin{
    constructor(routes){
      mergerPathsToRouter(this)
    }
    plugin=function plugin(build, options){
      build.widget('hx:anchor', Anchor)
      const router=createObj('Router')
      useModel.call(build, { 
        $router:router
      } )
    }
    extend(routes){
      mergerPathsToRouter(this);
      return this;
    }
    
  }
  const validRouterOptions="as,widget,path";
  const isRouteOpt=key=>_mapValue(validRouterOptions, key);
  class URLRouterPath{
    constructor(path, widget, as){
      this.path=path
      this.widget=widget
      this.as=as
    }
    routify(){
      
    }
  }
  const isURLRouterPath=route=>route instanceof URLRouterPath
  function _path(path, widget, alias){
    if(!isString(path)){
      $debug_log(`parameter 1 received at path is not a string valid path`)
    }else if(!path.includes('/')){
      $debug_log(`"${path}" is invalid\n\nMissing "/" decorator`)
    }else if(!validHouxitWidget(widget) && !isPromise(widget)){
      $debug_log(`parameter 2 of path macro expects a valid Houxit Widget or an asynchronous Promise instance`)
    }else if(alias && !isString(alias)){
      $debug_log(`parameter 3 "alias" alias expects a string value`);
    }
    return new URLRouterPath(...arguments);
  }
  function path(path, widget, alias){
    return _path(...arguments);
  }
  async function asyncPath(path, widget, alias){
    return await path(...arguments)
  }
  function _buildRouter(routes){
    if(!isArray(routes)){
      $debug_log(`"buildRouter" at parameter 1, routes expects an array value of routes object maps`);
      return ;
    }
    for (const [ ind,  path] of routes.entries()){
      if(!isURLRouterPath(path)){
        $debug_log(`Path arguments values  must be passed to the "Houxit.path" routing macro\n\nAt the route index ${ind+1}`);
        return ;
      }
      
    }
    return new buildRouterPlugin(routes)
  }
  function buildRouter(routes){
    return _buildRouter(...arguments)
  }
  function setAsyncSettings(opts){
    if(opts.buildConfig && isPObject(opts.buildConfig)) opts.buildConfig.isAsync=true;
    else if(!opts.buildConfig || !isPObject(opts.buildConfig)) opts.buildConfig={ 
      isAsync:true 
    };
    return opts;
  }
  async function _asyncWidget(opts){
    opts=await defineWidget(opts);
    opts=await setAsyncSettings(opts);
    return await opts;
  }
  function asyncWidget(opts){
    return _asyncWidget(...arguments)
  }
  function defineWidget(opts, config ){
    return _defineWidget(...arguments)
  }
  function _defineWidget(opts, options){
    if(!validHouxitWidget(opts)){
      $debug_log(`Value Error\n\n invalid value for the defineWidget macro\n/... at /././. at`);
      return;
    }else if(len(arguments) > 2){
      $debug_log(`Parameter Error\n\nmax-2 argument required\n ${len(arguments)} given`);
      return;
    }else if(isPObject(opts) || isFunction(opts)){
      const type=isClass(opts) ? 'class-based' : isPFunction(opts) ? 'function-based' : 'object-based' ;
      let widget= new Object();
      if(isPFunction(opts)) {
        widget.build=opts;
      }else if(isPObject(opts)){
        for( const [ key, value ] of entries(opts)){
          if(!hasProp(widget, key)) widget[key]=value;
        }
      }else if(isClass(opts)) widget=new opts();
      if(options) {
        for( const [ key, value ] of entries(options)){
          if(!hasProp(widget, key ) && !isHouxitProp(key)) widget[key]=value;
        }
      }
      if(!hasOwn(widget, widgetTypeKey)) widget[widgetTypeKey]=type;
      return widget;
    }
  }
  function initialBuildTransform(options, propsOrChildren, childrenOrProps ){
    if(isRenderVNodeClass(options)) {
      propsOrChildren = options.props;
      childrenOrProps = options.children;
      options = options.type;
    }
    if(!validHouxitWidget(options)){
      $debug_log(`initBuild Error\n\nCannot compile value as a Houxit widget\nMaybe an invalid houxit widget value`);
      return  ;
    }else if(isBuiltinWidget(options)){
      const name = ToPascalCase(options[$$BuiltinWidgetKey].slice(3))
      $debug_log(`The built-in ${name} widget cannot be used in an initBuild widget`);
      return ;
    }
    const widget = createVNodeClass(...values(propsAndChildrenGetter( ...arguments )));
    widget[initBuildInstaceKey]=true;
    return widget;
  }
  function _initBuild(options, props, children){
    const widget = initialBuildTransform(...arguments);
    if(!isRenderVNodeClass(widget)) return undefined;
    return new _Houxit_Build( widget );
  }
  function initBuild(options, propsOrChildren, childrenOrProps){
    return _initBuild(...arguments);
  }
  function createSSRStreamHack(vnodePlate, ssrConfig){
    const [ options, props = {} , children = [] ] = [ ...vnodePlate ];
    return vnodePlate;
  }
  function initSSRBuild(options, props, children){
    createSSRStreamHack( arguments, {
      type:'stream',
      render:None
    })
    return initBuild( ...arguments )
  }
  function boilerPlate(){
    
  }
  function defineElementOptionsValidator(options){
    const optionsName="type,props,children";
    if(!isPObject(options)){ 
      $debug_log(`defineVNode Error\n expects an 'object' at......\n\nparameter 1`);
      return false;
    }else if(len(options) > 3){
      $debug_log(`Options Error\n\n defineVNode does not accept more than 3 options props arguments`);
      return false
    }else if(!options.type && !validateType(options.type, [String, Object, Function ] )){
      $debug_log(`Unexpected value passed to type in defineVNode\n\n"${getType(options.type)}" is an invalid type value to type option`);
      $debug_log(`NOTE : The "type" option is required`);
      return false;
    }
    for(let [ name, opt ] of entries(options)){
      if(!_mapValue(optionsName, name)) {
        $debug_log(`${name} is not a valid defineVNode options value`);
        return false;
      }else if(name === 'props' && opt && !isPObject(opt)){
        $debug_log(`Element props property expects an object value\n\nUnexpected "${getType(opt)}" value`);
        return false;
      }else if(name  === 'children' && exists(opt) && !isChildrenNode(opt)){
        $debug_log(`Element children property expects a valid houxit child node instance value\n\nUnexpected "${getType(opt)}" value`);
        return false;
      }
    }
    return true;
  }
  function createVNodeClass(type, props, children){
    return new vNodeClass(...arguments);
  }
  function _defineVNode_ELEMENT(options){
    if(isFalse(defineElementOptionsValidator(options))) return undefined;
    let { type , props , children } = options ;
    const vNode= createVNodeClass( type, props, children ) ;
    vNode.is_hyperscript=true;
    if(validHouxitWidget(type)) {
      vNode.GeneticProvider=type;
      vNode.prototype_=type;
    }
    return vNode;
  }
  function defineVNode(options){
    return _defineVNode_ELEMENT(options);
  }
  function TranslateWidgetPropsAndChildren(type, props, children){
    if(validHouxitWidget(type)){
      children = children && !isArray( children ) ? [ children ] : children ;
    }
    
  }
  const elements = createObj('Elements');
  function transform_Elements_build(){
    generate_native_elements_(HTML_TAGS.split(','));
    generate_native_elements_(SVG_TAGS.split(','));
    // generate_native_elements_(HTML_DEPRECATED_TAGS.split(','));
    // generate_native_elements_(SVG_DEPRECATED_TAGS.split(','));
    generate_native_elements_(MATHML_TAGS.split(','));
    for(const [ name, widget ] of entries(BUILT_IN_WIDGETS)){
      map_registration(name, function(propsOrChildren, childrenOrProps){
        return h(widget, propsOrChildren, childrenOrProps)
      });
    }
  }
  function generate_native_elements_(el_arr){
    for(const name of el_arr.values()){
      map_registration(name, function(propsOrChildren, childrenOrProps){
        return h(name.trim(), propsOrChildren, childrenOrProps)
      });
    }
  }
  function map_registration(name, value){
    name=IS_VALID_TAGNAME(name) && name.includes('-') ? toCamelCase(name) : name.startsWith('hx:') ? ToPascalCase(name.slice(3)) :name;
    value = Function('element', `
      return function _${ name.trim() }(propsOrChildren, childrenOrProps){
       return element(...arguments)
      }
    `)(value);
    define(elements, name, {
      value ,
      enumerable
    });
  }
  function perfomSpeedDiffing(start, end, diffing){
    
  }
  function _perfomanceTracker(callback){
    const startTime=traceBack();
    callback();
    const endTime=traceBack();
    return perfomSpeedDiffing(startTime, endTime, createObj('Performance', {
      h:0,
      m:0,
      s:0,
      ms:0
    }));
  }
  function Req__init__(urlOrOptions, methodOrOptions, options={}){
    let url;
    if(isPObject(urlOrOpts)){
      method=urlOrOpts.method||'GET'
      url=urlOrOpts.url
      delete urlOrOpts.method
      delete urlOrOpts.url
      options=urlOrOpts
    }else if(isString(urlOrOpts)){
      url=urlOrOpts
      if(isPObject(method)){
        method='GET'
        options=method
      }else if(isString(method)) method=method||'GET'
      else method='GET'
    }
    method=method.toUpperCase();
    return new Promise((resolve, reject)=>{
      const xhr=new XMLHttpRequest()
      xhr.open(method,url,options.async||true)
      if(hasOwn(options,'timeout')) xhr.timeout=options.timeout
      if(hasOwn(options,'headers')  && isPObject(options.headers)){
        for(const [header, value] of entries(options.headers)){
          xhr.setRequestHeader(header, value)
        }
      }
      resolveHooks(xhr, options)
      xhr.send()
      resolve(xhr.response)
    })
  }
  class _HouxitHttpRequestModule{
    post=function post(url,options){
      return new Req__init__(url,'POST',options)
    }
    get=function get(url, options){
      return new Req__init__(url,'GET',options)
    }
    delete =function del(url, options) {
      return new Req__init__(url,'DELETE',options)
    }
    head=function head(url, options){
      return new Req__init__(url,'HEAD',options)
    }
    patch=function patch(url, options){
      return new Req__init__(url,'PATCH',options)
    }
    put=function put(url, options){
      return new Req__init__(url,'PUT',options)
    }
    options=function options(url, options){
      return new Req__init__(url,'OPTIONS',options)
    }
    trace=function trace(url, options){
      return new Req__init__(url,'TRACE',options)
    }
    connect=function connect(url, options){
      return new Req__init__(url,'CONNECT',options)
    }
    request=function request(urlOrOptions, methodOrOptions, options){
      return new Req__init__(...arguments)
    }
  }
  function Request(urlOrOpts, methodOrOptions, options){
    return new Req__init__(...arguments)
  }
  assign(Request, new _HouxitHttpRequestModule());
  function resolveHooks(xhr, opts){
  
  }
  transform_Elements_build();
  _$compiler_engine_hydrator();

  global.createFormAdmin = createFormAdmin ;
  global.isToken = isToken ;
  global.scaffold = scaffold ;
  global.defineVNode = defineVNode ;
  global.get_version = get_version ;//dev
  global.h = h ;
  global.shallowStream = shallowStream ;
  global.None = None ;
  global.useBind = useBind ;
  global.useStyleSheet = useStyleSheet ;
  global.renderSlots = renderSlots ;
  global.escapeReverseDecoder = escapeReverseDecoder ;
  global.HouxitCompilerSetup = HouxitCompilerSetup ;
  global.isReactiveToken = isReactiveToken ;
  global.trackEffectDeps = trackEffectDeps ;
  global._mapValue = _mapValue ;
  global.initBuild = initBuild ;
  global.useModifiers = useModifiers ;
  global._$runModelBind = _$runModelBind ;
  global.Memo = Memo ;
  global.postUpdate = postUpdate ;
  global.Suspense = Suspense ;
  global.initSSRBuild = initSSRBuild ;
  global.log = log ;//dev
  global.readonlyStream = readonlyStream ;
  global.preMount = preMount ;
  global.Portal = Portal ;
  global.postDestroy = postDestroy ;
  global.Anchor = Anchor ;
  global.Display = Display ;
  global.renderFor = renderFor ;
  global.Build = Build ;
  global.Self = Self ;
  global.asyncWidget = asyncWidget ;
  global.preUpdate = preUpdate ;
  global.shallowReadonlyStream = shallowReadonlyStream ;
  global.isShallowToken = isShallowToken ;
  global.useAnchorRef = useAnchorRef ;
  global.Motion = Motion ;
  global.HTMLParser = HTMLParser ;
  global.Provider = Provider ;
  global.postMount = postMount ;
  global.postBuild = postBuild ;
  global.useTransmit = useTransmit ;
  global.unToken = unToken ;
  global.onSlotRender = onSlotRender;
  global.onSlotEffect = onSlotEffect;
  global.makePublish = makePublish ;
  global.defineConfig = defineConfig ;
  global.useStyleSheet = useStyleSheet ;
  global.useContext = useContext ;
  global.useSlots = useSlots ;
  global.useParams = useParams ;
  global.useAdapter = useAdapter ;
  global.useModel = useModel ;
  global.createHouxitElement = createHouxitElement ;
  global.isReadonlyToken = isReadonlyToken ;
  global.preDestroy = preDestroy ;
  global.markdown = markdown ;
  global.validateType = validateType ;
  global.FormField = FormField ;
  global.Any = Any ;
  global.Arguments = Arguments ;
  global.mergeProps = mergeProps ;
  global.fields = fields ;
  global._getNodeListResponse = _getNodeListResponse ;
  global.deferTick = deferTick ;
  global.generateUUID = generateUUID ;
  global.boilerPlate = boilerPlate ;
  global.Type = Type ;
  global.defineWidget = defineWidget ;
  global.isShallowStream = isShallowStream ;
  global.onCatch = onCatch ;
  global.createFormModel = createFormModel ;
  global.onEffect = onEffect ;
  global.onTracked = onTracked ;
  global.html = html ;
  global.Class = Class ;
  global.getElementsByAttrName = getElementsByAttrName ;
  global.deferWatch = deferWatch ;
  global.readonlyToken = readonlyToken ;
  global.escapeDecoder = escapeDecoder ;
  global.path = path ;
  global.useDirs = useDirs ;
  global.traverse = traverse ;
  global.observe = observe ;
  global.effectHook = effectHook ;
  global.batch = batch ;
  global.generateTemplateElement = generateTemplateElement ;
  global.memMove = memMove ;
  global.useOptions = useOptions ;
  global.useSignals = useSignals ;
  global.Widget = Widget ;
  global.len = len ;
  global.markRaw = markRaw ;
  global.isRaw = isRaw ;
  global.asyncPath = asyncPath ;
  global.validateProps = validateProps ;
  global.toReadonlyToken = toReadonlyToken ;
  global.toShallowToken = toShallowToken ;
  global.fromReadonlyToken = fromReadonlyToken ;
  global.validateCollection = validateCollection ;
  global.isStream = isStream ;
  global.useReadonlyBypasser = useReadonlyBypasser ;
  global._HouxitTemplateParser = _HouxitTemplateParser ;
  global._EvalWith = _EvalWith ;
  global.stream = stream ;
  global.token = token ;
  global.createNativeElement = createNativeElement ;
  global.Request = Request ;
  global.computedToken = computedToken ;
  global.read = read ;
  global.factoryToken = factoryToken ;
  global.Form = Form ;
  global.isNativeElement = isNativeElement ;
  global.createWidgetElement = createWidgetElement ;
  global.fromToken = fromToken ;
  global.isFieldTypeOf = isFieldTypeOf ;
  global.tokenGENERATOR = tokenGENERATOR ;
  global.elements = elements ;
  global.getFieldType = getFieldType ;
  global.mountEffect = mountEffect ;
  global.toToken = toToken ;
  global.to_kebab_case = to_kebab_case ;
  global.Token = Token ;
  global.ToPascalCase = ToPascalCase ;
  global.openEffectStore = openEffectStore ;
  global.toCamelCase = toCamelCase ;
  global.createTextElement = createTextElement ;
  global.buildRouter = buildRouter ;
  global.effectObject = effectObject ;
  global.cloneVElement = cloneVElement ;
  global.createCustomElement = createCustomElement ;
  global._createFragment = _createFragment ; //dev
  global.$debug_log = $debug_log ; //dev
  global.Fragment = Fragment ;
  global.createAgent = createAgent ;
  global.Exception = Exception ;
  global.isShallowReactiveToken = isShallowReactiveToken ;
  global.Tuple = Tuple ;
  global._GenerateRoot = _GenerateRoot ;
  global.mountStream = mountStream ;
  global.traceBack = traceBack ;
  global.lazy = lazy ;
  global.version = version ;
  global.mountToken = mountToken ;
  global.raise = raise ;
  global.deepEqualityCheck = deepEqualityCheck ;
  global.isShallowReadonlyToken = isShallowReadonlyToken ;
  global.isShallowReadonlyStream = isShallowReadonlyStream ;
  global.toReadonlyStream = toReadonlyStream ;
  global.toShallowStream = toShallowStream ;
  global.toShallowReadonlyStream = toShallowReadonlyStream ;
  global.pushEffect = pushEffect ;
  global.HTMLPropsParser = HTMLPropsParser ;
  global.animate = animate ;
  global.isReadonlyStream = isReadonlyStream ;
  global.isStateStream = isStateStream ;
  global.isComputedToken = isComputedToken ;
  global.useAgent = useAgent ;
  console.info( devInfo ) ; //dev
  return global ;
} )( ( { } ) ) ;
