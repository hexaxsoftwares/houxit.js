
  //Prince Chukwuemeka Godswill Ezeta 
  // @pure This project, 'HOUXIT', is been sponsored by the HEXAX SOFTWARES FOUNDATION.
  // @pure Visit 'www.houxit.com/guide' for for more information on the houxit project , documentation and houxit's development process roadmap.
  // @pure This is a web JIT development version of Houxit
  // @pure We at the core team of Houxit project are determined on developing and improving Houxit.js features and perfomance issues, we only need your support to help and encourage us on maintaing this template engine.
  // @pure Thanks for choosing Houxit
const Houxit=(function(global){
  "use strict";
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
  const define=Object.defineProperty;
  const isS=Object.is;
  const hasProp=(obj, prop)=> prop in obj;
  function _makeMap_(obj, arg){
    return isString(obj) ? new Set(obj.split(',')).has(arg) : validateType(arg, [Set, Tuple, Map ]) ? obj.has(arg) : isPObject(obj) ? hasProp(obj, arg) : isArray(obj) ? obj.includes(arg) :  false;
  }
  const E_Obj=Object.freeze({});
  const inBrowserCompiler = typeof self !== "undefined" && typeof self === "object";
  const variableDeclarationRegex=/([\s\S]+[^=]*)[ ]*=[ ]*([\s\S]+)?|([\w_$\-]+)/m;
  const templateClassVslidatorRegex=/^([\w\-$.[\]\(\)]+)::/;
  const invalidIdentifierCharRegex=/[='"!@#%^&*()+\-\[\]{};:\\|,.<\/? ]/;
  const invalidAccessorCharRegex=/[='"!@#%^&*(){};:\\|,<? ]/;
  const isValidAccessor=variable => isString(variable) && /[\w$]/.test(variable.at(0)) && !invalidAccessorCharRegex.test(variable);
  const isValidIdentifier=variable => isString(variable) && /[\w$]/.test(variable.at(0)) && !invalidIdentifierCharRegex.test(variable);
  const constBlockContext="if_Block,for_Block,slots_Block,children_Block";
  const isValidCtxType=type=>_makeMap_(constBlockContext, type);
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
  const characters=/[\!\"\#\%\&\'\(\)\*\+\,\.\/\;\<\=\>\@\[\\\]\^\`\{\|\}\~ ]+/;
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
    let shouldlog=true;
    if(isHouxitBuild(self)) shouldlog=self[$$$core].settings.debug;
    if(shouldlog) console.warn(`${$warner}\n\n${msg}`);//houxit warming debugger
  }
  const isIterator=iterator=>iterator && !isArray(iterator) && isPFunction(iterator[Symbol.iterator]);
  const isIterable=iterable=>(validateType(iterable, [Object,Array,Set,Map,Tuple]) || isIterator(iterable)) && !isString(iterable);
  const enumerable =true, configurable =true, writable = true ;
  const isEmptyStr=str=>str === "";
  const $Error=(msg,self)=>{
    let shouldlog=true;
    if(self) shouldlog=self[$$$compiler].config.debug
    if(isTrue(shouldlog)) console.error(`${$warner}\n\n ${msg}`);//houxit warming debugger
  }
  const hasHyphen_bind=key=>/^\-\-[\w\-|[\]]+/.test(key);
  const hasAt_bind=key=>/^@[\w\-|[\]]+/.test(key);
  const has$$_bind=key=>/^\$\$[\w\-|[\]]+/.test(key);
  const hasDir_bind=key=>/^dir\-\-[\w\-|[\]]+/.test(key);
  const hasAsh_bind=key=>/^\#[\w\-|[\]]+/.test(key);
  const hasSpread_bind=( key , useAccessor=false )=> ( useAccessor ? /^\.\.\.[\w$.]+/ : /^\.\.\.[\w$]+/ ).test(key);//useAccessor requests if dot notation is acceptd on match
  const HouxitSpecialProperties="ref,key,onListen,attach,context";
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
    transmit:Function, 
    receive:[Array, Object], 
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
    tokenRefs:Array,
    install:Function,
    templateClasses:Object
  }
  const validWidgetOptions=keys(widgetOptionType).join(',');//valid widget options---
  const __compiler_Engine_Options={
    type:'browser',//[ node, browser]
    _isSingleFileWidget:false,//[true, false]
    __WUFTransformType:'options',//['build']
    WUFNamespaceObject:undefined,
    lookupLoader:pass,
    dev_loggers:[]
  }
  const plainFunctionOptions="model,preBuild,postBuild,preMount,postMount,preUpdate,postUpdate,postDestroy,preDestroy,transmit,context,onEffect,onTracked,onCatch,build,onSlotEffect,onSlotRender,tokenRefs";
  const nonAFuncMethod=fnName=> _makeMap_(plainFunctionOptions, fnName);
  const calledOnceFNOptions="model,preBuild,postBuild,preMount,postMount,onTracked,build,onSlotRender"
  const isCalledOnceOpt=opt=>_makeMap_(calledOnceFNOptions, opt)
  const nodeJSOnlyOption="markdownSrc,styleSheetSrc,templateSrc";
  const isNodeJSOnlyOption=opt=>_makeMap_(nodeJSOnlyOption, opt);
  const primaryKeyOptions="build,styleSheetSrc,styleSheet,templateSrc,template,name,markdownSrc,markdown,context";
  const isPrimaryKeyOption=opt=>_makeMap_(opt, primaryKeyOptions);
  const isArgument=arg=>_toStringCall(arg) === "[object Arguments]";
  function len(obj){
    if(!obj) return -1;
    obj=unwrap(obj);
    return validateType(obj, [ String , Array, Arguments ] ) ? obj.length : validateType(obj, [ Set, Map, Tuple ]) ? obj.size : isObject(obj) ? keys(obj).length : isNumber(obj) ? obj : -1 ;
  }
  const isValidWidgetOption=opts=>_makeMap_(validWidgetOptions, opts);//checks if an option is a vslid Houxit widget option
  const HTML_TAGS="html,head,style,title,body,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,main,nav,section,blockquote,dd,div,dl,dt,figcaption,figure,li,menu,ol,p,pre,ul,a,abbr,b,bdi,bdo,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,audio,map,video,iframe,object,picture,portal,svg,math,canvas,noscript,script,del,ins,caption,col,colgroup,table,tbody,td,tfoot,th,thead,tr,datalist,fieldset,form,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,summary,button,base,link,meta,hr,br,wbr,area,img,track,embed,source,input,template,slot" ;//All html valid tags supported by the Houxit framework
  const IS_HTML_TAG=txt=>_makeMap_(HTML_TAGS, txt);
  const WEB_COMPONENTS="template,slot";//Web components tags , also supported by the Houxit framework
  const HTML_FORM_ELEMENTS="select,textarea,input,form,progress,meter,option";
  const Is_Form_Element=element=>IS_ELEMENT_NODE(element) && _makeMap_(HTML_FORM_ELEMENTS, element.localName);
  const IS_WEB_COMPONENT=txt=>_makeMap_(WEB_COMPONENTS, txt);
  const HTML_VOID_TAGS="base,link,meta,hr,br,wbr,area,img,track,embed,source,input";//HTML void tags, also supported by the Houxit framework
  const IS_HTML_VOID_TAG=txt=>_makeMap_(HTML_VOID_TAGS, txt);
  const HTML_DEPRECATED_TAGS="acronym,noembed,applet,noframes,bgsound,param,big,blink,plaintext,center,rb,content,rtc,dir,shadow,font,spacer,frame,strike,frameset,image,tt,keygen,xmp,marquee,nobr,menuitem";//HTML obselete and deprecated element. 
  //The above tags are no more been supported by the houxit framework
  const IS_HTML_DEPRECATED_TAG= txt => _makeMap_(HTML_DEPRECATED_TAGS, txt);
  const HTMLIDLAttributes="accesskey,contenteditable,dir,draggable,enterkeyhint,hidden,inert,innerText,inputmode,popover,lang,noModule,nonce,outerText,spellcheck,style,tabindex,title,translate,className,value,innerHTML,outerHTML";
  const isHTMLIDLAttributes=txt=>_makeMap_(HTMLIDLAttributes, txt)
  const HTMLBooleanAttributes="disabled,hidden,draggable,checked,selected,defer,ismap,reversed,readonly,autoplay,disableremoteplayback,muted,loop";
  const isHTMLBooleanAttributes=txt=>_makeMap_(HTMLBooleanAttributes, txt);
  const DomParserTags="html,head,link,meta,body,style,script,noscript,template";
  const isINDOMElements=tag=>_makeMap_(DomParserTags, tag);
  const SVG_TAGS="animate,animateMotion,animateTransform,circle,clipPath,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,stopsvg,switch,symbol,text,textPath,tspan,use,view";
  const SVG_DEPRECATED_TAGS="altGlyph,altGlyphDef,altGlyphItem,cursor,font,font-face,font-face-format,font-face-name,font-face-src,font-face-uri,glyph,glyphToken,hkern,missing-glyph,tref,vkern";
  const IS_SVG_TAG=tag=>_makeMap_(SVG_TAGS, tag);
  const IS_SVG_DEPRRCATED_TAG=tag=>_makeMap_(SVG_DEPRECATED_TAGS, tag);
  const MATHML_TAGS = "malignmark,menclose,annotation,annotation-xml,maction,merror,maligngroup,mfenced,mn,mo,mmultiscripts,mfrac,semantics,none,mlongdiv,mlabeledtr,mfraction,mtr,mglyph,mi,mover,munder,munderover,mpadded,mphantom,mspace,mroot,mprescripts,msline,mrow,ms,mscarries,mscarry,msgroup,msqrt,mstack,mtd,mtext,mtable,mstyle,msub,msubsup,msrow,msup";
  const IS_MATHML_TAG=tag=>_makeMap_(MATHML_TAGS, tag);
  const IS_VALID_TAGNAME=(txt)=>{
    if(IS_HTML_TAG(txt)||IS_WEB_COMPONENT(txt)||IS_HTML_VOID_TAG(txt) || IS_SVG_TAG(txt) || IS_MATHML_TAG(txt)) return true;
    if(IS_HTML_DEPRECATED_TAG(txt) || IS_SVG_DEPRRCATED_TAG(txt)){
      $debug_log(`"${txt}" is an html/svg deprecated tag, and should not be used in new projects\n\nhouxit does not allow the compilation of obselete
      elements`);
    }
    return false;
  }
  const dataStringTypes="string,function,object,array,boolean,number,symbol,set,map,bigint,set,map,weakmap,weakset,date,weakref,promise,proxy,tuple";//Valid javascript datatypes
  const isValidDataStringType=obj=>_makeMap_(dataTypes, obj);//checks if a string value is a dataTypes return text
  class Tuple extends BaseTuple{
    constructor(){
      super(...arguments);
    }
  }
  class Dict extends BaseDict{
    constructor(){
      super(...arguments);
    }
  }
  const TemplateClassKey=Symbol("template-class");
  class BaseTemplateClass{
    constructor(callback, ...args){
    }
  }
  const isTemplateClass=klass=> klass instanceof BaseTemplateClass;
  const DataFunctionMap=[String, Function, Object, Array, Symbol, Number, Boolean];
  const XtructDataCallableTypes=[Set,Map,WeakMap,WeakSet, Date,WeakRef,Promise,RegExp,Proxy,BigInt,ArrayBuffer,Tuple];
  const isGlobalBuiltinType=type=>_makeMap_(DataFunctionMap, type) || _makeMap_(XtructDataCallableTypes, type);
  function isDomSpecialConstructor(value){
    if(!inBrowserCompiler) return false;
    const domSpecialConstructors=[ Element];
    if(new Set(domSpecialConstructors).has(value)) return true;
    return isNativeElement(value) || value instanceof Element;
  }
  const Data_Flags="NodeList,PATCH_FLAGS,PATCH-TYPE-TUPLE";
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
  if( inBrowserCompiler ) {
    
  }
  const isNativeElement=(vnode)=> inBrowserCompiler && (vnode instanceof HTMLElement || vnode instanceof SVGElement);
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
  function isHouxitRenderNode(node){
    return isPrimitive(node) || isArray(node) || isSlotInstance(node) ||
    isVNodeClass(node) || isTemplateClass(node);
  }
  function isChildrenNode(val){
    return isPrimitive(val) || isArray(val) || isHouxitElement(val) || isNativeElement(val)  || isSlotInstance(val) || isVNodeClass(val) || isTemplateClass(val);
  }
  function isChildrenObjInstances(val){
    if(!isChildrenObj(val)) return false;
    return isHouxitElement(val) || isHouxitBuild(val) || isNativeElement(val)  || isSlotInstance(val) || isVNodeClass(val) || isTemplateClass(val);
  }
  function isChildrenObj(val){
    return isChildrenNode(val) && !( isPrimitive(val) || isArray(val))
  }
  const isBaseWidget=widget=> isPObject(widget) && widget instanceof Widget;
  const isProxy=value=>validateType(value, Proxy);
  const validHouxitWidget=(w)=> w && ((isObject(w) && !isProxy(w) && !isStream(w)) || isFunction(w) || isHouxitBuiltinSymbolWidget(w));
  const isHoistedVNode=vnode=>isHouxitElement(vnode) && isTrue(vnode.VNodeManager.patchFlags.isHoisted);
  const isStaticVnode=vnode=>isHouxitElement(vnode) && !isHoistedVNode(vnode);
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
  const isInDomNode=element=> inBrowserCompiler && element instanceof Node && element.getRootNode() === document;
  const GLOBAL_EVENTS="abort,animationcancel,animationend,animationiteration,animationstart,auxclick,blur,error,focus,canplay,canplaythrough,cancel,change,click,close,contextmenu,dblclick,drag,dragend,dragenter,dragleave,dragover,dragstart,drop,durationchange,emptied,ended,formdata,gotpointercapture,input,invalid,keydown,keypress,load,keyup,loadeddata,loadedmetadata,loadend,loadstart,lostpointercapture,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,mousewheel,wheel,pause,play,playing,pointerdown,pointermove,pointerup,pointercancel,pointerover,pointerout,pointerleave,pointerenter,pointerlockchange,pointerlockerror,progress,ratechange,reset,resize,scroll,securitypolicyviolation,seeked,seeking,select,selectstart,selectionchange,slotchange,stalled,submit,suspend,timeupdate,touchcancel,touchend,touchstart,touchmove,transitioncancel,transitionrun,transitioned,transitionstart,waiting,volumechange,autocompleteerror,autocomplete,hover";//Html event names managed by houxit on elements
  const IS_VALID_EVENT_HANDLER=eventName=>_makeMap_(GLOBAL_EVENTS, eventName);
  const isClass = val=> isFunction(val) && val.toString().startsWith('class');
  const directivesHooksMap="created,mounted,updated,init,destroyed";
  function instance_Has_Widget(self, name ){
    return _makeMap_(BUILT_IN_WIDGETS, name) || _makeMap_(self[$$$register]?.widgets || {}, name ) ;
  }
  const normalize_Widget=(self, name)=>_makeMap_(BUILT_IN_WIDGETS, name) ? BUILT_IN_WIDGETS[name] : _makeMap_(self[$$$register].widgets, name) ? self[$$$register].widgets[name]: null;
  function instance_Has_Directive(self, name ){
    return !isHouxitDirective(name) && _makeMap_(self[$$$register]?.directives || {}, name ) ;
  }
  const normalize_Directives=(self, name)=> _makeMap_(self[$$$register].directives, name) ? self[$$$register].directives[name]: null;
  class slotInstanceMap{
    slots=new Object();
    constructor(opts){
      entries(opts).forEach((value, name)=>this.slots[name]=value);
    }
  }
  const isSlotInstance=val=> val instanceof slotInstanceMap;
  const requestMethods="POST,GET,PATCH,HEAD,DELETE,PUT,CONNECT,OPTIONS,TRACE";
  const isRequestMethod=method=>_makeMap_(requestMethods, method);
  const isHouxitElement=vnode=>vnode instanceof HouxitElement;
  const isHouxitBuild=widget=>widget instanceof HouxitBuild;
  const isHouxitTextElement=vnode=>vnode instanceof HouxitTextElement;
  const isHouxitNativeElement=vnode=> vnode instanceof HouxitNativeElement;
  const isHouxitCustomNativeElement=vnode=> vnode instanceof HouxitCustomNativeElement;
  const isHouxitFragmentElement=vnode => vnode instanceof HouxitFragmentElement;
  const readonlyModelProps="$element,$params,$attrs,$signals,$slots,$parent,$root";
  const proxySkipped="$element,$signals,$parent,$root,_observe,_useAgent,_deferTick,_write,_effectHook,[[[reactive__Token]]]";
  const validTokenConfigOptions="onTrack,onEffect,isComputed,isReadonly"
  const isProxySkipped=prop=>_makeMap_(proxySkipped, prop);
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
  const $StarterKitKey=Symbol();
  const isFRKey=(key)=> $factoryTokenKey === key && isS($factoryTokenKey, key);
  const Fragment=Symbol('hx:fragment');
  const Portal=Symbol('hx:portal');
  const Build=Symbol('hx:build');
  const Self=Symbol('hx:self');
  const Provider=Symbol('hx:provider');
  const Motion=Symbol('hx:motion');
  const Suspense=Symbol('hx:suspense');
  const Memo=Symbol('hx:memo');
  const BUILT_IN_WIDGETS={
    'hx:fragment':Fragment,
    'hx:provider':Provider,
    'hx:portal':Portal,
    'hx:build':Build,
    'hx:self':Self,
    'hx:motion':Motion,
    'hx:memo':Memo,
    'hx:suspense':Suspense
  }
  function isHouxitBuiltinSymbolWidget(widget){
    for(const sym of values(BUILT_IN_WIDGETS)){
      if(widget === sym ) return true;
    }
    return false;
  }
  const isBuiltinWidgetBuild=self=> isHouxitBuild(self) && hasOwn(self[$$$ownProperties], 'builtin_widget');
  const isBuiltinWidgetAndType=( self, type ) => isBuiltinWidgetBuild(self) && self[$$$ownProperties].builtin_widget === type ;
  const isBuiltinMotionWidget=self=>isBuiltinWidgetAndType(self, 'hx:motion')
  const isBuiltinMemoWidget=self=>isBuiltinWidgetAndType(self, 'hx:memo');
  const isBuiltinSuspenseWidget=self=>isBuiltinWidgetAndType(self, 'hx:suspense')
  const isBuiltinWidget =widget=> hasOwn(widget, $$BuiltinWidgetKey);
  const builtinValidWidget=(widget, type)=> isBuiltinWidget(widget) && widget[$$BuiltinWidgetKey] === type ;
  const $buildHx_ElementKey=Symbol()//saving the $buildHx_ElementKey key while passing widget to houxit build.
  const widgetSpecialAttrProps = new Set([ $$$$dir__ref$$$$ , dir$$__render, $$$context , $$slotName, $$$Events, $$$ModelUpdateKey ]);
  const isSelfRecursiveWidget=build=> isHouxitBuild(build) && build[$$$ownProperties].isSelfRecursive === (true);
  const isSpecProp = prop => widgetSpecialAttrProps.has(prop);
  const isBuiltinBlocks=block=>_makeMap_("if,else,else:if,for,const,class,new,debugger,html", block);
  const isBuiltinVoidBlocks=block=>_makeMap_("else,else:if,const,new,debugger,html", block);
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
  function isContextMethodString ( self , hx_Element , str ){ 
    return ((isValidIdentifier(str) || object_Has_Path(self.__public_model__, str)) || isTrue(hx_Element && object_Has_Path(hx_Element.LabContext||{}, str) || isFNString(str)));
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
    hx_Element:undefined,
  });
  const rawObjectStoreMap=new WeakMap()
  function markRaw(obj){
    if(isChildrenObj(obj)){
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
    return _makeCloneVersion(...arguments);
  }
  const isCollection=item=>validateType(item, [Array, Set, Tuple, Arguments ]);
  const isInvalidInjectorOpt=opt=>_makeMap_("build,preBuild", opt);
  const isAllowedComposersOpt=opt=>_makeMap_("postBuild,preMount,postMount,preUpdate,postUpdate,preDestroy,postDestroy,defineConfig,useSignals,useSlots,useTransmit,useReceiver,useContext,useParams,onEffect,onTracked,onCatch,onSlotRender,onSlotEffect", opt);
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
    transmit:useTransmit,
    receive:useReceiver,
    context:useContext,
    install:useInstall
  }
  const optionalAdapterrs="name,widgets,directives,mixins"
  const isAllowedAdapterOpts=opt=>_makeMap_( keys(adaptableComposers).join(','), opt);
  const isNonDuplicateFunc=opt=>_makeMap_("params,context,transmit", opt)
  function useInstall(callback){
    return _useInstallAdaptor(...arguments);
  }
  function _useInstallAdaptor(callback){
    if(!validateCollectionArgs(arguments, {
      count:1,
      validators:[Function],
      name:"useInstall()"
    })) return;
    const self=getCurrentRunningEffect({
      name:'useInstall()'
    });
    if(!isHouxitBuild(self)) return;
    (self, callback);
    if(irresponsibleInstallWarn(self, callback, "useInstall()" )){
      self[$$$operands].installers_plugin.add(callback);
    }
    return true;
  }
  function irresponsibleInstallWarn(self, callback, ns){
    if(isInitialBuild(self)){
      $debug_log(`Irresponsible use of "${ns}" in an initBuild widget instance`, self, true);
      return false
    }
    return true
  }
  const isAdapterOpt=opt=>_makeMap_("params,preBuild", opt)
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
    props_list.forEach((object)=> validators.push(object));
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
  const isGloballyAllowed = (key) =>/*@__PURE__*/ _makeMap_(GLOBALS_ALLOWED, key);
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
    args = [ ...args ];
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
    return validateCollectionArgs(collection, config );
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
    const { initial, updateFlags, subscribers, ModelInstance, computed } =
    computed__Token[refInternalEffectKey];
    if(!deepEqualityCheck(initial,
    callDepsGetters(subscribers)) || updateFlags){
      computed__Token[refInternalEffectKey].updateFlags=0;
      const getCookie = computed.call(ModelInstance) ;
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
      value: `[[[${ isReadonly ? "readonly" : "reactive" }__Token]]]`,
      enumerable
    });
  }
  class BaseToken {
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
    if(this[refGenreId] === '[[[readonly__Token]]]' && isFalse(this[refIsShallowKey])) return ;
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
  class reactive__Token extends BaseToken{
    constructor(token, config){
      super(...arguments)
    }
  }
  class readonly__Token extends BaseToken{
    constructor(token, config){
      super(...arguments)
    }
  }
  class Token extends BaseToken{
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
      target = preventX( new reactive__Token( {
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
  const arrSet=setData=>isSet( setData ) || isArgument(setData) || isArray(setData) ? [...setData] : isTuple(setData) ? setData.list() : setData ;
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
  const tupleMM=setMM+",shift,unshift,splice,pop,extend,replace,prepend,arrange,exchange";
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
    });
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
    if(!type || !_makeMap_("of,in", type)) type='of';
    else if(!isIterable(value) && !isNumber(value)){
      $debug_log(`No iterable .value prop received at parameter 1 object of the "iterate" helper macro`);
      return false;
    }
    const useOF=type && type.trim() === 'of';
    function each(callback){
      return trigger_callback(value, callback, useOF);
    }
    each.each=each;
    return each;
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
    return preventX(new readonly__Token({
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
    return preventX(new reactive__Token({
      data:value
    }, config ));
  }
  function shallowToken(value, config){
    return __createShallowToken__(...arguments);
  }
  function isToken(value){
    return value instanceof BaseToken;
  }
  function unwrap(value){
    if(!isToken(value)) return value;
    return value[ value[refInternalEffectKey].accessor ];
  }
  function unToken(ref){
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
    if(!res || !object) return undefined;
    return token(object[path], config);
  }
  function toToken(object, path){
    return _toToken(...arguments);
  }
  function isReactiveToken(value){
    return isToken(value) && value[refGenreId] === "[[[reactive__Token]]]";
  }
  function isReadonlyToken(value){
    return isToken(value) && "[[[readonly__Token]]]" === value[refGenreId];
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
      validators:[BaseToken, Boolean],
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
    });
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
      $debug_log(`Value Exception\nFailed to convert a primutive Value to a streamable object\n\nExpects a plain object or a collection`);
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
    return isArray(value) ? 'array' : isDate(value) ? 'date' : isSet(value) ? 'set' : isMap(value) ? 'map' : isTuple(value) ? 'tuple' : value instanceof AnyType ? 'any' : value instanceof NoneType ? 'none' : isToken(value) ? '_'+isReactiveToken(value) ? 'reactive' : 'readonly' +'__Token' :typeof  value;
  }
  function customTypeReader(type){
    //for reading names of custom dataTypes;
  }
  function BaseDict(...args){
    
  }
  BaseDict.prototype.set=function set(key, value){
    
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
    this.size=setTupleSize(len(this.list()));
  }
  function instanciate_tuple_indexes(tuple){
    const oldListKeys=keys(tuple);
    const newList=tuple.list();
    for( const [ key, value ] of newList.entries()){
      if( value !== tuple[key] || key > len(this)-1){
        tuple[key]=value;
      } 
    }
    let ind = 0;
    for (let key of oldListKeys.values()){
      key=Number(key);
      if(key !== ind ) {
        tuple[key]=ind;
      }
      if(ind > len(newList)-1) delete tuple[ind];
      ind ++;
    }
  }
  function BaseTuple(...args){
    TupleConstructorManager.call(this, args );
  }
  function Tuple_filter(fn){
    if(!validateCollectionArgs(arguments, {
      count:1,
      validators:[Function],
      name:"Tuple.filter()"
    })) return;
    return new Tuple( ...this.list().filter(fn) );
  }
  BaseTuple.prototype.filter=function filter(fn){
    return Tuple_filter(...arguments);
  }
  BaseTuple.prototype.find=function find(fn){
    return this.list().find(...arguments)
  }
  BaseTuple.prototype.shift=function shift(){
    if(isFalse(isFrozenWarn(this[$$tupleIsFrozen], 'Tuple.shift()', 'tuple'))) return false;
    let firstValue;
    if(this.size > 0){
      firstValue=this[$$tupleStore].shift();
      this[$$tupleUnique].delete(firstValue);
      this.size=setTupleSize(this.size-1);
      instanciate_tuple_indexes(this);
    }
    return firstValue;
  }
  BaseTuple.prototype.freeze=function freeze(deep=false){
    this[$$tupleStore]=objFreeze(this[$$tupleStore], deep);
    this[$$tupleIsFrozen]=true;
    return this;
  }
  BaseTuple.prototype.values=function values(){
    return this.list().values();
  }
  BaseTuple.prototype.keys=function keys(){
    return this.list().keys()
  }
  BaseTuple.prototype.entries=function entries(){
    return this.list().entries()
  }
  BaseTuple.prototype.isTuple=function(tuple){
    return isTuple(tuple);
  }
  BaseTuple.prototype.has=function has(value){
    return this[$$tupleUnique].has(value)
  }
  BaseTuple.prototype.indexOf=function indexOf(value){
    return len(arguments) && this.has(value) ? this.list().indexOf(value) : -1 ;
  }
  BaseTuple.prototype.add=function add(value){
    if(isFalse(isFrozenWarn(this[$$tupleIsFrozen], 'Tuple.add()', 'tuple'))) return false
    if(len(arguments) && !this.has(value)){
      this[$$tupleUnique].add(value);
      this[$$tupleStore].push(value);
      this.size=setTupleSize(this.size+1);
      instanciate_tuple_indexes(this);
      return true;
    }
    return false;
  }
  BaseTuple.prototype.delete=function Tuple_delete(value){
    if(isFalse(isFrozenWarn(this[$$tupleIsFrozen], 'Tuple.delete()', 'tuple'))) return false;
    if(this.has(value)) {
      const index=this.indexOf(value);
      return this.splice(this.indexOf(value), 1);
    }
    return false;
  }
  BaseTuple.prototype.replace=function replace(oldV, newV){
    if(isFalse(isFrozenWarn(this[$$tupleIsFrozen], 'replace()', 'tuple'))) return false
    if(!this.has(oldV) && this.has(newV)) return false;
    return this.splice(this.indexOf(oldV), 1, newV );
  }
  BaseTuple.prototype.prepend=function prepend(value){
    if(isFalse(isFrozenWarn(this[$$tupleIsFrozen], 'Tuple.prepend()', 'tuple'))) return false
    if(!this.has(value)) {
      this[$$tupleStore].unshift(value)
      this[$$tupleUnique].add(value);
      this.size=setTupleSize(this.size+1);
      instanciate_tuple_indexes(this);
      return true
    }
    return false
  }
  BaseTuple.prototype.splice=function splice(start, deleteCount, ...insertElements){
    if(isFalse(isFrozenWarn(this[$$tupleIsFrozen], 'Tuple.splice()', 'tuple'))) return false;
    if(!len(arguments)) return false;
    if(!validateCollectionArgs(arguments, {
      min:0,
      max:Infinity,
      validators:[Number, Number],
      name:"Tuple.splice()",
    })) return false;
    if(len(arguments)>1 && (start + deleteCount-1) > this.size){
      $debug_log(`deleteCount argument 2 count at "Tuple.splice()" exceeds the tuple size`);
      return false;
    }
    if(len(arguments) === 1){
      for(const [ index, value ] of this.list().entries()){
        if(index >= start){
          this[$$tupleUnique].delete(value);
        }
      }
      this[$$tupleStore].splice(start);
    }else if(len(arguments) === 2){
      let tuple_delete_count=deleteCount;
      for(const [ index, value ] of this.list().entries()){
        if(index >= start && tuple_delete_count > 0){
          this[$$tupleUnique].delete(value);
          tuple_delete_count--;
        }
      }
      this[$$tupleStore].splice(start, deleteCount);
    }else if(len(insertElements)){
      let tuple_delete_count=deleteCount;
      for(const [ index, value ] of this.list().entries()){
        if(index >= start && tuple_delete_count > 0){
          this[$$tupleUnique].delete(value);
          tuple_delete_count--;
        }
      }
      for(const value of insertElements.values()){
        if(this.has(value)) insertElements.splice(insertElements.indexOf(value), 1);
        else this[$$tupleUnique].add(value);
      }
      if(len(insertElements)) this[$$tupleStore].splice(start, deleteCount, ...insertElements );
    }
    this.size=setTupleSize(len(this.list()));
    instanciate_tuple_indexes(this);
    return true;
  }
  BaseTuple.prototype.map=function map(callback){
    return this.list().map(callback);
  }
  BaseTuple.prototype.exchange=function exchange(value1, value2){
    if(!(this.has(value1) && this.has(value2))){
      $debug_log(`argument ${!this.has(value1) ? "1" : "2"} not a member of this tuple`);
      return false;
    }
    const index1=this.indexOf(value1);
    const index2=this.indexOf(value2);
    this[$$tupleStore][index1]=value2;
    this[$$tupleStore][index2]=value1;
    instanciate_tuple_indexes(this);
    return true;
  }
  BaseTuple.prototype.arrange=function arrange(sort, start=0){
    if(!validateCollectionArgs(arguments, {
      name:"Tuple.arrange()",
      min:1,
      max:2,
      validators:[Collections, Number]
    })) return false;
    else if(!len(sort)) return;
    else if(start > this.size-1){
      $debug_log(`Tuple.arrange()'s start parameter 2 exceeds the tuple size\n"${start}"`);
      return false;
    }
    const flowTuple=new Tuple();
    for(let [ ind, sort_value] of getIterator(sort)){
      if(this.has(sort_value)) this[$$tupleStore].splice(this.indexOf(sort_value), 1);
      else this[$$tupleUnique].add(sort_value);
      flowTuple.add(sort_value)
    }
    this[$$tupleStore].splice(start, len(flowTuple), ...arrSet(flowTuple));
    instanciate_tuple_indexes(this);
    this.size=setTupleSize(len(this.list()));
    return true;
  }
  BaseTuple.prototype.clear=function clear(){
    if(isFalse(isFrozenWarn(this[$$tupleIsFrozen], 'Tuple.clear()', 'tuple'))) return false
    return this.splice(0);
  }
  BaseTuple.prototype.pop=function pop(){
    if(isFalse(isFrozenWarn(this[$$tupleIsFrozen], 'Tuple.pop()', 'tuple'))) return false;
    if(this.size <= 0) return undefined;;
    const value = this[$$tupleStore].pop();
    this[$$tupleUnique].delete(value);
    this.size=setTupleSize(len(this.list()));
    instanciate_tuple_indexes(this);
    return value;
  }
  BaseTuple.prototype.at=function at(index){
    if(!validateCollectionArgs(arguments, {
      count:1,
      validators:[Number],
      name:"Tuple.at()"
    })) return;
    if(index < 0 && index > this.size){
      $debug_log(`index exceded Tuple limit.........\n"at()"`);
      return null
    }
    return this.list()[Number(index)];
  }
  BaseTuple.prototype.list=function list(){
    return [ ...this[$$tupleStore] ] ;
  }
  BaseTuple.prototype.extend=function extend(collection){
    const res=validateCollectionArgs(arguments, {
      count:1,
      validators:[Collections],
      name:'Tuple.extend()'
    })
    if(!res) return false;
    for(let [index, value] of getIterator(collection)){
      this.add(value);
    }
    return true;
  }
  BaseTuple.prototype.forEach=function forEach(callback){
    return this.list().forEach(...arguments);
  }
  BaseTuple.prototype.contains = function contains(...args){
    if(!len(args)) return true;
    for (let item of args.values()){
      if(!this.has(item)) return false;
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
      if(!silently) $debug_log(`"${name}()" Adapter method cannot be called outside of a build widget or function widget body.\n\n"${name}()" may have been called from an asynchronous thread from the origin or outside of the build option method/function based widget\n\nCheck if the widget instance build method is an arrow function`);
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
    });
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
    if(!inBrowserCompiler) return false;
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
    return vnode.compiler_options.createElement();
  }
  function getFunctionBoundTarget(fn){
    
  }
  function _makeCloneVersion(value, deep=false){
    let cValue;
    if(isHouxitElement(value)) return value// cloneVElement(value);
    else if(isToken(value)) return toToken(unToken(value));
    else if(isPrimitive(value) ) return value;
    else if(isCollection(value)){
      cValue= new value.__proto__.constructor(...arrSet(value));
      // for(let [ prop, item] of getIterator(value)){
      //   if(deep) item =  _makeCloneVersion(item, deep) ;
      //   cValue[ validateType(value, [Set, Tuple]) ? "add" : "push" ]( item );
      // }
    }else if(isFunction(value)){
      if(isGlobalBuiltinType(value)) return value;
      if(isClass(value)) return Function('Base', `return class ${value.name || '' } extends Base{
          constructor(...args){
            super(...args);
          }
        }`)(value);
      else {
        return new Proxy(value, {
          apply(target, thisArg, args ){
            return Reflect.apply(...arguments);
          }
        });
      }
    }else if(isObject(value)) {
      const isSVA= isArray(value) && len(value) === 1 && isNumber(value[0]);
      if(isSVA) {
        value=[ ...value ];
        value.push(undefined);
      }
      cValue = assign(new value.__proto__.constructor(), value);
      if(isSVA) cValue.pop();
      if(!deep) return cValue;
      for(let [ ky, vl ] of getIterator(cValue)){
        if(!isPrimitive(vl)) cValue[ky]=_makeCloneVersion(vl, deep);
      }
    }
    return cValue;
  }
  function deepEqualityCheck(val1, val2){
    val1=unwrap(val1);
    val2=unwrap(val2);
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
  }
  class FrameworkCompilerOptions{
    debug=true
    forwardSlot=true
    forwardAttrs=true
    delimiters=['{{','}}']
    scopedStyleSheet=true
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
    config=assign({
      global:false,
      block:"declare"
    }, config);
    const { global, block } = config;
    if(hasSpecialCharacters(funcN)) funcN=escapeRegExp(funcN);
    let flags="mu";
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
  function createTextElement(self, text, hx_Element, isRerender){
    return _createTextElement(self, text, hx_Element, isRerender);
  }
  function _createTextElement(self, text, hx_Element, isRerender){
    if(!isPrimitive(text)){
      $debug_log(`cannot create a TEXT_NODE element from a none primitive value.......\n\n"${text}" value`, self);
      text = "";
    }
    let hasSkip;
    let node;
    let is_hyperscript=hx_Element.is_hyperscript;
    if(!isRerender) node=document.createTextNode(text);
    if(hasSpecialCharacters(text)  && !is_hyperscript) {
      let [subscribers, textContent] = effectDependencyTracking(self, function(){
        return resolveAccessor(self, text, hx_Element);
      })
      if(!isRerender) node.textContent=textContent
      else {
        node=textContent;
        hx_Element.$element=textContent;
      }
      if(len(subscribers)) hx_Element.VNodeManager.patchFlags.subscriptions.extend(subscribers);
    }else if(is_hyperscript && isRerender) {
      node = text;
      hx_Element.$element=text;
    
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
        delete this.props.key;
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
      $Notifiers:null,
      $StarterKit:null
    }
    rawChildren=null
    rawProps=null
    children=null
    subscriptions={}
    dependencies=[]
    hx_Element=null
    is_hyperscript=false
    GeneticProvider=null
  }
  class vNodeClass extends BasevNodeClass{
    constructor(type, propsOrChildren, childrenOrProps, config){
      super(...arguments);
    }
  }
  const wuf_class_prop=Symbol("wfu_class_prop");
  class WUFClass{
    constructor(){
      this[wuf_class_prop]=undefined
    }
  }
  const is_wuf_class=klass=>klass instanceof WUFClass;
  const isVNodeClass=vnode=>vnode instanceof vNodeClass ;
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
      templateRefs:new Tuple(),
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
      },
      propsTraversers:new Tuple()
    })
    VN_Tree={
      KEYS_INDEXES:new Tuple(),
      LEAGUE_TREE:{},
      PRIORITIES:{},
      ELEMENTS:new Tuple()
    }
    hx_build=undefined
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
  function For_Loop(self, attr, hx_Element, isBlock=false){
    const data=get_Loop_Data(self, attr, isBlock);
    if(!data) return ;
    let dataObject;
    try{
      dataObject=_$runModelBind(self, data.obj, hx_Element);
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
    if(data.type && !_makeMap_(Valid_LoopType, data.type)){
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
  function _$Conditional_Dir_Resolver(self, vnode, hx_Element, siblings, ctx, recordPatch){
    const [ hasIf, hasElseIf , hasElse ] = recordPatch[3];
    const condCount=hasMultiConditionals(hasIf, hasElse, hasElseIf);
    if(condCount > 1){
      $debug_log(`((directive))>.....Numerous Conditional directive found on element instance\n\n
        "${hasIf ? "$$if" : hasElseIf ? "$$else-if" : "$$else" }"`, self, true);
      return ;
    }
    const GIC=new _$Directive_$Conditional$_Renderer(self, vnode, hx_Element, siblings, recordPatch, ctx);
    if(hasIf) return GIC.Panel_If_Block();
    else if(hasElseIf || hasElse) return GIC.Panel_elseif_Block(hasElse);
  }
  const isConditionalVnode=(vnode, cond)=> isHouxitElement(vnode) ? vnode.conditional_record.src === cond : false;
  class _$Directive_$Conditional$_Renderer{
    options=undefined;
    constructor(self, vnode, hx_Element, siblings, recordPatch, ctx){
      let { type, props, children, key } = vnode;
      const [ hasEx , propValue , srcKey ]=recordPatch;
      const LabContext=hx_Element ? assign({}, hx_Element.LabContext) : {};
      ctx=assign(assign({}, ctx), LabContext);
      assign(this, {
        propValue, 
        srcKey, 
        self,
        props,
        vnode,
        hx_Element,
        siblings,
        ctx,
        createElement:()=>createHouxitElement(this.vnode, self, false, hx_Element?.LabContext, siblings, ctx,  hx_Element)
      });
    };
    Panel_If_Block(){
      const { self, propValue, hx_Element, vnode, siblings, srcKey, ctx } = this ;
      let data=_$runModelBind(self, propValue, ctx);
      this.vnode=memMove(vnode, true)
      delete this.vnode.props[srcKey];
      if(!data) return $IfElseDirRenderLess.call(this, data, 'if');
      const node=this.createElement();
      node.compiler_options.createElement=createElement;
      assign(node.conditional_record, {
        src:'if',
        res:true,
        passed:true
      });
      if(hx_Element) hx_Element.NodeList.add(node);
      return node;
    } 
    Panel_elseif_Block(isElse=false){
      const block=isElse ? 'else' : 'else-if' ;
      const { self, propValue, hx_Element, siblings, vnode, srcKey, ctx } = this
      let data= isElse ? false : _$runModelBind(self, propValue, ctx);
      const previous=siblings[len(siblings)-1];
      let passed;
      if(previous) passed=previous.conditional_record.passed;
      this.vnode=memMove(vnode.props);
      delete vnode.props[srcKey];
      let node;
      if(!len(siblings) || !previous || (!isConditionalVnode(previous, 'if') && !isConditionalVnode(previous, 'else-if'))){
        $debug_log(`The "$$${block}" conditional rendering directive block expects a preceding "$$if" or "$$else-if" directive element\n\nMay return unexpected result\ndid you mean "$$if" directive instead?\n at>>>>>`, self, true);
        node = this.createElement();
        node.compiler_options.createElement=createElement;
      }else if(!passed && isRenderlessElement(previous) && !(previous.conditional_record.res)){
        data=isElse || data;
        if(data){
          node = this.createElement();
          node.compiler_options.createElement=createElement;
          assign(node.conditional_record, {
            src:block,
            res:true,
            passed:data
          });
        }else node = $IfElseDirRenderLess.call(this, data, block, previous );
      }else node = $IfElseDirRenderLess.call(this, data, block, previous);
      if(hx_Element) hx_Element.NodeList.add(node);
      return node;
    }
  }
  function $IfElseDirRenderLess( data, block, previous){
    return createRenderlessElement((hx_Element)=>{
      assign(hx_Element.conditional_record, {
        src:block,
        res:false,
        passed:previous ? previous.conditional_record.passed : false ,
      });
    })
  }
  function has_Intersect_Prop(obj1, obj2 ){
    let res=false;
    for(const [key, value] of entries(obj1)){
      if(isArray(obj1)) res=_makeMap_(obj2, value);
      else if(isPObject(obj1)) res=_makeMap_(obj2, key);
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
  function _$Directive_$For_Loop$_Renderer(self, vNode, hx_Element, siblings, ctx, renderPatch, saveGarbageContent){
    const [ check, propValue , srcKey ] = renderPatch;
    let { obj, keyName, valToken, loopType, ref, index }=For_Loop(self, propValue, hx_Element) || {};
    // vNode.props=assign({}, vNode.props);
    delete vNode.props[srcKey];
    if(loopType === 'in' && valToken && ( validateType(obj, [ Object, Collections]))){
      $warn(`((Warning))\n\nWe recommend agaimst the use of the 'for...in' loops type since it iterates over all of the object's enumerable and non-symbol properties \n\nLeaving the value data as "undefined"\nUse "for...of" instead......`, self);
      $warn(`Many JavaScript style guides and linters recommend against the use of 'for...in', because it iterates over the entire prototype chain which is rarely what one wants, and may be a confusion with the more widely-used "for...of" loop\n\nIt's included in Houxit for completeness.`, self);
    }
    const NodeList=[];
    iterate(obj, loopType).each(function(value, key, indexV){
      const vNodeClass=memMove(vNode, true);
      ctx=assign({}, ctx);
      if(!destructWarn(valToken, obj, self)) return;
      if(isNumber(obj)){
        if(valToken) ctx[valToken]=value+1;
        if(keyName) ctx[keyName]=valToken ? value : value+1;
        if(index) ctx[index]=index;
        renderForConditional(self, vNodeClass, ctx, NodeList, key, value, hx_Element, saveGarbageContent, siblings);
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
          count:indexV
        }, ctx);
        renderForConditional(self, vNodeClass, ctx, NodeList, indexV, value, hx_Element, saveGarbageContent, siblings);
      }
    });
    const lastElement=NodeList[len(NodeList)-1];
    const wrapper= new HouxitFragmentElement(NodeList, self, hx_Element);
    if(lastElement) assign(wrapper.conditional_record, lastElement.conditional_record);
    wrapper.isLoopWrappRenderer=true;
    if(isHouxitElement(hx_Element)) hx_Element.NodeList.add(wrapper);
    return wrapper
  }
  function mapCTXFallProps(self, Loop_Data, it_Data, ctx){
    const { valToken, keyName, index} = Loop_Data;
    const { ky, vl, count } = it_Data;
    if(keyName && isDestructureSyntax(keyName)){
      if(!(destructWarn(keyName, valToken, self))) return ctx;
      ctx=smartDextCtxMerging(hx_Element.LabContext, {
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
  function renderForConditional(self, vnode, ctx, NodeList, count, vl, hx_Element, saveGarbageContent, siblings){
    if(hx_Element?.LabContext) ctx=assign(assign({}, hx_Element.LabContext), ctx);
    const { has_conditional } = saveGarbageContent;
    const createElement=()=>createHouxitElement(vnode, self, false, ctx,  has_conditional && count === 0 ? siblings : NodeList, null, hx_Element);
    const loopNode=createElement();
    loopNode.compiler_options.createElement=createElement;
    if(loopNode) NodeList.push(loopNode);
  }
  function keyIndex(obj, key){
    return isObject(obj) ? keys(obj).indexOf(key) : validateType(obj, [Array, Set, Number]) ? Number(key) : isMap(obj) ? obj.keys().indexOf(key) : NaN;
  }
  function VNodeManager(self, vnode, element, hx_Element, siblings, saveGarbageContent, ctx){
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
      $debug_log(`A "$$for" directive loop cannot take precedence in the presence of an "$$else" condition directive statements\n\ndirective scoping error`, self, true);
      return;
    }
    vnode =memMove(vnode, true);
    if((hasIFWithFor && (hasIf ? ifIndex : hasElse ? elseIndex : hasElseIf ? elseIfIndex : -1 ) < forIndex) ) {
      return _$Conditional_Dir_Resolver(self, vnode,  hx_Element, siblings, ctx, conditionalArgs );
    }else if(hasFor) return _$Directive_$For_Loop$_Renderer(self, vnode, hx_Element, siblings, ctx,  [getEx, getFor, forKey ], saveGarbageContent );
    else if(getEx) return _$Conditional_Dir_Resolver(self, vnode, hx_Element, siblings, ctx, conditionalArgs);
    return createHouxitElement(vnode, self, is_hyperscript, ctx, siblings,null, hx_Element );
  }
  function callSetHooks(self, hooks, element, bindObj={}, hx_Element, Name="" ){
    function Callback(){
      for(let hook of hooks.values()){
        if(isPass(hook)) continue
        try{
          const bindings = hook[lifeCiycleBinding];
          const instance=isHouxitNativeElement(hx_Element) ? element : self.__public_model__;
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
  function HouxitElementLifeCircleHooks(self, element, hx_Element){
    const args=(hookN)=> [ self, hx_Element.VNodeManager.LifeCycleHooks[hookN], element, self.__public_model__, hx_Element, hookN ];
    if(len(hx_Element.VNodeManager.LifeCycleHooks.created_hook)) callSetHooks( ...args('created_hook') );
    if(len(hx_Element.VNodeManager.LifeCycleHooks.mounted_hook)){
      self[$$$compiler].whenMountedHooks.add(function(){
        whenMounted(self, element, ()=>{
          callSetHooks( ...args('mounted_hook') );
        })
      })
    }
    iterate(["updated_hook", "destroyed_hook"]).each((hookName)=>{
      if(len(hx_Element.VNodeManager.LifeCycleHooks[hookName])) $assignToHookFN( ...args(hookName) );
    });
    return  element;
  }
  function $assignToHookFN(self, hookSet, element, model, hx_Element, hookN){
    hx_Element[hookN]=function hook(){
      callSetHooks(self, hookSet, element, self.__public_model__, hx_Element, hookN);
    }
  }
  function resolveElementToken(self, ref, element, hx_Element){
    try{
      deferTick(()=>ref[ref[refInternalEffectKey].accessor]=element);
    }catch(err){
      $debug_log(`(ref) >>\nUresolved problem when dilating the special ref prop>>>\n\n${err}`, self, true);
      return;
    }
  }
  const frameDirectives="$$for,$$if,$$else-if,$$else";
  function built_in_fragment_widget(vnode, self, is_hyperscript, ctx, siblings, ssc, hx_Element){
    const fragmented_elements=vnode.children ? _HouxitTemplateParser(vnode.children, self, null, hx_Element, ctx) : [];
    const fragment=new HouxitFragmentElement(fragmented_elements, self, hx_Element, vnode.props?.key);
    return fragment;
  }
  function debug_self_prop_warn(props, self, args){
    const [ WidgetName, propName ] = args;
    if(!props || !hasOwn(props, propName)){
      $debug_log(`"${WidgetName}" built-in widget expects a "${propName}" params\nMissing...`, self, true);
      return false;
    }
    return true;
  }
  function built_in_self_widget(vnode, self, is_hyperscript, ctx, siblings, ssc, hx_Element){
    if(isSelfRecursiveWidget(self)) return createRenderlessElement();
    const prototype_=self[$$$core].virtualNode.prototype_;
    vnode=h(prototype_, memMove(vnode.props), memMove(vnode.children || []));
    vnode[factoryHXSelfInstance]=true;
    const ELEMENT= createHouxitElement(vnode, self, is_hyperscript, ctx, siblings, ssc, hx_Element);
    return ELEMENT;
  }
  function built_in_Build_widget(vnode, self, is_hyperscript, ctx, siblings, ssc, hx_Element){
    if(!debug_self_prop_warn(vnode.props, self, ["hx:build", 'self' ])) return createRenderlessElement();
    let props = vnode.props;
    const prototype_=(isString(props.self) && IS_VALID_TAGNAME(props.self)) || validHouxitWidget(props.self) ? props.self : isString(props.self) ? normalize_Widget(self, props.self) : null;
    props=memMove(props, true);
    delete props.self;
    if(isNull(prototype_)) return createRenderlessElement();
    props.key = vnode.key;
    vnode=h(prototype_, props, memMove(vnode.children || []));
    const ELEMENT= createHouxitElement(vnode, self, is_hyperscript, ctx, siblings, ssc);
    return ELEMENT;
  }
  function createPortalEntryDisplay(self, props){
    const target=unToken(props.target);
    const portalElement=target ? _GenerateRoot(target) : undefined;
    if(!portalElement || !IS_ELEMENT_NODE(portalElement)){
      $debug_log(`Unable to generate portal element\n\n
        Target not existing in the current document model layer\n\n
        Mount target for Portal widget is not a valid element node`, self, true);
      return;
    }
    return portalElement;
  }
  function built_in_portal_widget(vnode, self, is_hyperscript, ctx, siblings, ssc, hx_Element){
    if(!debug_self_prop_warn(vnode.props, self, ["hx:portal", 'target'])) return createRenderlessElement();
    const portal=createPortalEntryDisplay(self, vnode.props);
    if(!portal) return createRenderlessElement();
    const portalContent=vnode.children ? _HouxitTemplateParser(vnode.children, self, null, hx_Element, ctx) : [];
    const wrapper=new HouxitFragmentElement(portalContent, self, hx_Element, vnode.key);
    portal.append(wrapper.$element);
    wrapper.$element=_createFragment();
    return wrapper;
  }
  function generateWidgetBasedBuiltin(vnode, self, is_hyperscript, ctx, siblings, ssc, hx__Elemen){
    const { prototype_ } = vnode;
    let instance;
    if(prototype_ === Motion){
      vnode.GeneticProvider={
        name:'hx:motion',
        signals:['introstart', 'introend', 'outrostart', 'outroend'],
        params:{
          options:Object,
          transite:Any,
          animate:Any
        }
      }
    }else if(prototype_ === Memo){
      vnode.GeneticProvider={
        name:"hx:memo",
        params:{
          test:Function
        },
        signals:['activated', 'deactivated']
      }
    }else if(prototype_ === Suspence){
      vnode.GeneticProvider={
        name:'hx:suspense',
        slots:['fallback'],
      }
    }
    return createRenderlessElement();
  }
  function simulate_buitin_widget_syms(vnode, self, is_hyperscript, ctx, siblings, ssc, hx_Element){
    const { prototype_ } = vnode;
    const props_object={};
    hx_Element={
      subscriptions:new Tuple(),
      PropFlags:new Tuple()
    }
    Props_dilation_compile(vnode, self, hx_Element, {
      is_hyperscript,
      ctx,
      ssc
    }, props_object);
    vnode.props=props_object;
    const resArgs=[vnode, self, is_hyperscript, ctx, siblings, ssc, hx_Element];
    if(prototype_ === Fragment ) return built_in_fragment_widget(...resArgs);
    else if(prototype_ === Self ) return built_in_self_widget(...resArgs);
    else if(prototype_ === Build ) return built_in_Build_widget(...resArgs);
    else if(prototype_ === Portal) return built_in_portal_widget(...resArgs);
    else return generateWidgetBasedBuiltin(...resArgs);
  }
  function createHouxitElement(vnode, self, is_hyperscript, ctx, siblings, ssc,  hx_Element){
    let starterKit;
    const isRerender=self[$$$operands].initializedRender;
    if(isRerender && vnode.filesFilter.memMoved) delete vnode.filesFilter.memMoved;
    if(!vnode.filesFilter.memMoved){
      starterKit=vnode;
      vnode=memMove(vnode, true);
      vnode.filesFilter.memMoved=true;
    }
    ctx=smartDextCtxMerging(assign({}, ctx || {}), ssc || {});
    ssc=null;
    const saveGarbageContent = NormalizeDirGarbage(vnode.props||{});
    const { has_conditional, hasFor } = saveGarbageContent;
    const hasDir=hasFor || has_conditional;
    let ELEMENT;
    const { prototype_ } = vnode;
    const args=[vnode, self, is_hyperscript, ctx, siblings, ssc, hx_Element, starterKit];
    if(!is_hyperscript && hasDir ) ELEMENT = VNodeManager(self, vnode, null, hx_Element, siblings, saveGarbageContent, ctx, starterKit);
    else if(isHouxitBuiltinSymbolWidget(prototype_)) ELEMENT = simulate_buitin_widget_syms(...args);
    else if(validHouxitWidget(prototype_)) ELEMENT = new HouxitWidgetElement(...args);
    else if(isString(prototype_)){
      if(IS_VALID_TAGNAME(prototype_)) ELEMENT = new  HouxitNativeElement(...args);
      else if(isCustomElementTagname(prototype_)) ELEMENT = new HouxitCustomNativeElement(...args);
      else debug_unrecognized_tagname(prototype_, self);
    }
    return ELEMENT;
  }
  function debug_unrecognized_tagname(tagname, self){
    $debug_log(`tagname "${tagname}" is not a valid html element, or a registered widget instance\n\n
      if this is a customElement, make sure its defined through the "customElements.define()" method `, self, true);
  }
  function isCustomElementTagname(tagname){
    return isFunction(customElements.get(tagname));
  }
  function translateVElementNormalizer(virtualElement, self){
    
  }
  
  function smartDextCtxMerging(context, ssc, merge=false){
    if(!(context || ssc)) return merge ? context || ssc : assign({}, context || ssc || {}); 
    context=merge ? context : assign({}, context);
    if(hasOwn(ssc, $$dexTransformKey)){
      if(!hasOwn(context, $$dexTransformKey) && hasOwn(ssc, $$dexTransformKey)) context[$$dexTransformKey]={
          sourcesArray:[],
          syntaxArray:[]
        }
      else if(hasOwn(context, $$dexTransformKey)){
        if(!merge) context[$$dexTransformKey]=assign({}, context[$$dexTransformKey]);
      }
      context[$$dexTransformKey].syntaxArray=arrSet(new Set([ ...context[$$dexTransformKey].syntaxArray, ...ssc[$$dexTransformKey].syntaxArray ]));
      context[$$dexTransformKey].sourcesArray=arrSet(new Set([ ...context[$$dexTransformKey].sourcesArray, ...ssc[$$dexTransformKey].sourcesArray ]));
      ssc=assign({}, ssc);
      delete ssc[$$dexTransformKey];
    }
    context=assign(context, ssc);
    return context;
  }
  function evaluateKeyOnElement(hx_Element, key, self){
    if(!isHouxitElement(hx_Element)) return;
    if(key && !isPrimitive(key)){
      $debug_log(`key prop value expects primitive values`, self, true);
      return;
    }
    hx_Element._vnode_key=key || undefined;
  }
  function HouxitTemplateGenerators(vnode, self, is_hyperscript=false, ctx, siblings, ssc, hx_Element, starterKit, isWidget=false){
    this.VNodeManager.vNodeClass=vnode;
    is_hyperscript=vnode.is_hyperscript;
    this.is_hyperscript=is_hyperscript;
    const isRerender=self[$$$operands]?.initializedRender;
    const slotBindings=hx_Element?.VNodeManager?.slotBindings;
    if(slotBindings) this.VNodeManager.slotBindings=slotBindings;
    let { type, props, children, key } = vnode;
    ctx=smartDextCtxMerging(ctx || {}, ssc || {});
    this.LabContext=smartDextCtxMerging(this.LabContext, ctx);
    vnode.hx_Element=this;
    if(isWidget) this.VNodeManager.rawChildren=()=> vnode.rawChildren;
    bufferDirSetups(self, props, this);
    const customElementsArgs=[...arguments];
    customElementsArgs.pop();
    const element=generateTemplateElement(vnode, self, this, siblings,
    vnode.IS_RENDERLESS, customElementsArgs, starterKit);
    if(!isRerender && isHouxitNativeElement(this)) HouxitElementLifeCircleHooks(self, element, this);
    this.$element=element;
    if(!isRerender){
      if(!isRenderlessElement(this) && hasProp( isHouxitWidgetElement(this) ?  this.widget_instance[$$$ownProperties] : this.compiler_options, 'ref_$$Prop')){
        resolveElementToken(self, isHouxitWidgetElement(this) ? this.widget_instance[$$$ownProperties]['ref_$$Prop']  : this.compiler_options['ref_$$Prop'], isHouxitWidgetElement(this) ? this.widget_instance : this.$element, this );
      }
    }
    evaluateKeyOnElement(this, vnode.key, self);
  }
  class HouxitNativeElement extends HouxitElement{
    constructor(vnode){
      super(...arguments);
      HouxitTemplateGenerators.call(this, ...arguments);
      this.prototype_=vnode.type;
    }
  }
  class HouxitCustomNativeElement extends HouxitNativeElement{
    constructor(){
      super(...arguments);
    }
  }
  class HouxitWidgetElement extends HouxitElement{
    constructor(vnode){
      super(...arguments);
      HouxitTemplateGenerators.call(this, ...arguments, true);
      this.prototype_=vnode.prototype_;
    }
  }
  class HouxitFragmentElement extends HouxitElement{
    constructor(vnodes=[], self, hx_Element, key){
      super();
      if(!isHouxitBuild(self)) self=null;
      vnodes=!isArray(vnodes) ? [vnodes] : vnodes;;
      let index=0;
      const isRerender = self ? self[$$$operands].initializedRender : undefined;
      const fragment = !isRerender ?  _createFragment() : undefined;
      const template=!isRerender ? document.createElement('template') : undefined;
      template?.append(document.createTextNode(""));
      for(let [ key, node ] of vnodes.entries()){
        if(!node && !fragment) continue;
        if(isHouxitElement(node)) this.NodeList.add(node);
        template?.append(node.$element);
        resolve_keyed_mapping(this, node, index, self);
        index ++;
      }
      template?.append(document.createTextNode(""));
      evaluateKeyOnElement(this, key, self);
      if(!isRerender){
        for(const [ index, els ] of entries(template.childNodes)){
          this.VN_Tree.ELEMENTS.add(els);
          fragment.append(els);
        }
      }
      this.$element=fragment;
    }
    forEach(callback){
      return this.NodeList.forEach(callback);
    }
    upload(callback){
      this.VN_Tree.ELEMENTS.forEach((el, ind)=> callback(el));
    }
  }
  class HouxitRenderlessElement extends HouxitFragmentElement{
    constructor(){
      super();
      this.IS_RENDERLESS=true;
    }
  }
  class HouxitTextElement extends HouxitElement{
    constructor(text, self, hx_Element, fall){
      super();
      const isRerender=self[$$$operands].initializedRender;
      this.is_hyperscript= hx_Element?.is_hyperscript ;
      if(hx_Element) this.LabContext=assign({}, hx_Element?.LabContext || {});
      if(!this.is_hyperscript && fall ) this.LabContext=smartDextCtxMerging(this.LabContext, fall);
      this.$element=_createTextElement(self, text, this, isRerender);
      if(this.render_tracked && isHouxitElement(hx_Element)) {
        hx_Element.render_tracked=this.render_tracked
        hx_Element.VNodeManager.patchFlags.isHoisted=true;
      }else if(this.render_tracked && isHouxitBuild(self)) self[$$$compiler].hoistedNodelist.add(this);
      this.prototype_=isRerender ? this.$element : this.$element.textContent;
    }
  }
  function createRenderlessElement(callback=pass){
    const renderlessElement=new HouxitRenderlessElement();
    callback(renderlessElement);
    return renderlessElement;
  }
  function isSameHouxitElementType(el1, el2){
    const isHE=isHouxitElement(el1) && isHouxitElement(el2);
    return isHE && isS(el1.__proto__.constructor, el2.__proto__.constructor);
  }
  function bufferDirSetups(self, props, hx_Element){
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
        dirMap(self, dir, self[$$$register].directives[dir.name], hx_Element );
        props[dir$$__render].delete(dir);
      }else if(!isString(dir.name)) {
        dirMap(self, dir, dir.name, hx_Element);
        props[dir$$__render].delete(dir);
      }
    }
  }
  function dirMap(self, resolver, dir, hx_Element){
    if(isPObject(dir)){
      for(let [name, hook] of entries(dir)){
        if(_makeMap_(directivesHooksMap, name)){
          if(!isPFunction(hook)){
            $debug_log(`"${name} directive hook received at $$ is not a function`, self, true);
            return;
          }
          hook.value=resolver.value;
          hook.modifiers=resolver.modifiers
          hx_Element[name+'_hook'].add(hook);
        }
      }
    }else if(isPFunction(dir)){
      dir.value=resolver.value;
      dir.modifiers=resolver.modifiers;
      hx_Element.created_hook.add(dir);
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
  const isHouxitWidgetElement=vnode=> vnode instanceof HouxitWidgetElement;
  function transpileDirectiveShorhand(key){
    return (hasAsterisks_bind(key) ? '$$bind:' : hasAt_bind(key) ? '$$on:' : hasAsh_bind(key) ? '$$slot:' : key[0])+key.slice(1);
  }
  function dirExistenceCheck(props, dir){
    let RawMap={ hasDir:false  };
    for(let [key, val] of entries(props)){
      const keyP=key;
      key = transpileDirectiveShorhand(key);
      if(key.startsWith(dir)) return {
        hasDir:true,
        getDir:val,
        getKey:keyP
      }
    }
    return RawMap;
  }
  function prefixRenderBuidProperties(self, props, index, hx_Element){
    const [ key, value ] = props ;
    if(isHouxitElement(hx_Element)) hx_Element.VNodeManager.patchFlags.shapeProps[index]={
      key,
      value
    }
  }
  function resolve_keyed_mapping(hx_Element, child, index, self){
    let key=isHouxitTextElement(child) ? index : (child._vnode_key || index );
    key = isNaN(Number(key)) ? key : Number(key);
    const KEYS_INDEXES=hx_Element.VN_Tree.KEYS_INDEXES;
    if(KEYS_INDEXES.has(key)){
      $debug_log(`keyed element seemes to have been dublicated within this render siblings >>"${key}"<<<\n\nCheck for possible duplicates in special key props\n`, self, true);
      return;
    }
    KEYS_INDEXES.add(key);
    hx_Element.VN_Tree.LEAGUE_TREE[key]=[ child, index ];
  }
  function generateTemplateElement(vnode, self, hx_Element, siblings, IS_RENDERLESS, customElementsArgs, startsWith ){
    return _generateTemplateElement( ...arguments );
  }
  function _generateTemplateElement(virtualNode, self, hx_Element, siblings, IS_RENDERLESS, customElementsArgs, starterKit){
    const { prototype_ } = virtualNode;
    if(isString(prototype_) && IS_VALID_TAGNAME(prototype_)) return _createNativeElement(...arguments);
    else if(isString(prototype_)) return generateCustomNativeElement(...arguments );
    else return _createWidgetElement(...arguments );
  }
  function generateCustomNativeElement(vnode, self, hx_Element, siblings, IS_RENDERLESS, customElementsArgs ){
    let { type, props, children, key} = vnode;
    const argsCount=len(arguments);
    const is_hyperscript=hx_Element?.is_hyperscript || false;
    const isRerender=self[$$$operands]?.isRerender;
    if(isRerender) return 
    const element=document.createElement(type);
    element._set_compiler_options(...arguments);
    return element
  }
  function generateElementFlag(element, hx_Element){
    const _Houxit_Element_VNodeFlag = create_Houxit_Element_Flags_();
    assign(_Houxit_Element_VNodeFlag, {
      hx_Element,
      _vnode_key:hx_Element?._vnode_key || 0
    })
    define(element, '_Houxit_Element_Flag', {
      value : _Houxit_Element_VNodeFlag,
      enumerable
    });
  }
  function _createNativeElement(virtualNode, self, hx_Element, siblings, IS_RENDERLESS, customElementsArgs, starterKit){
    let { type, props, children, key } = virtualNode;
    const argsCount=len(arguments);
    let element;
    const is_hyperscript=hx_Element?.is_hyperscript || false;
    const isRerender=self[$$$operands]?.initializedRender;
    if(isString(type)){
      if(!isRerender ){
        element=document.createElement(type);
        if(hx_Element) {
          if(isHouxitBuild(self)) {
            hx_Element.hx_build=self[$$$ownProperties].hx_build
            if(self[$$$ownProperties].hx_build) element.setAttribute("data-hx_build", self[$$$ownProperties].hx_build);
          }
        }
      }
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
      }, is_hyperscript, hx_Element, metrics, );
      $$dir_SLOT(self, bindings, virtualNode, hx_Element, metrics, {});
    }
    let childNodes;
    if(children && !IS_HTML_VOID_TAG(type)) {
      if( hasOwn(virtualNode.filesFilter ,'dir--raw')){ 
        const item= _$runModelBind(self, virtualNode.filesFilter['dir--raw'], hx_Element, true);
        if(item){
          const content=escapeDecoder(virtualNode.rawChildren);
          if(!isRerender) element.innerHTML=content; 
          else hx_Element.$element=content;
        }
      } else {
        childNodes=_HouxitTemplateParser(children, self, true, hx_Element, assign({}, hx_Element.LabContext));
        childNodes = childNodes && !isArray(childNodes) ? [ childNodes ] : isArray(childNodes) ? childNodes : [];
        let index=0;
        for(let [key, els] of childNodes.entries()){
          if(!els) continue;
          hx_Element.NodeList.add(els);
          if(!isRerender) element.append(els.$element);
          resolve_keyed_mapping(hx_Element, els, index, self);
          index++;
        }
      }
    }
    if(props) Props_dilation_compile(virtualNode, self, hx_Element, metrics, element);
    if(!isRerender && virtualNode.prototype_==='slot' && !element?.name.trim()){
      slotNamingTRANSITION(self, {
        value:'default'
      }, element, hx_Element, {
        is_hyperscript,
        isRerender,
        vNode:virtualNode
      });
      childNodes?.forEach((node)=> hx_Element.VNodeManager.patchFlags.subscriptions.extend(node.VNodeManager.patchFlags.subscriptions));
    }
    const { hasDir:hasModel } = dirExistenceCheck(props||{}, '$$model');
    if(!isRerender) {
      generateElementFlag(element, hx_Element);
      return element;
    }
  }
  function createNativeElement(virtualNode,  hx_Element, siblings, isRerender, IS_RENDERLESS  ){
    return _createNativeElement( ...arguments );
  }
  function _createWidgetElement(virtualNode, self, hx_Element, siblings,IS_RENDERLESS, customElementsArgs, starterKit){
    let { type, props, children, prototype_ } = virtualNode;
    const is_hyperscript=hx_Element?.is_hyperscript;
    let buildInstance;
    const slotsCompilerArgs={
      self,
      hx_Element,
      isRerender:self[$$$operands]?.initializedRender,
      is_hyperscript,
      IS_RENDERLESS
    }
    if(!is_hyperscript){
      slotsCompilerArgs.config={};
      buildInstance=ResolveWidget(self, hx_Element, virtualNode, IS_RENDERLESS, slotsCompilerArgs)//reso;ving a widget data object
     if(buildInstance) hx_Element.hx_build=buildInstance[$$$ownProperties].hx_build;
    }else if(validHouxitWidget(type)) buildInstance =$compilerEngine(self, virtualNode, hx_Element, slotsCompilerArgs);
    if(buildInstance && buildInstance[$$$ownProperties]?.slot_name) hx_Element.slot_name=buildInstance[$$$ownProperties].slot_name;
    return isHouxitBuild(buildInstance) ? buildInstance.build?.$element : undefined;;
  }
  function createWidgetElement(virtualNode, metrics ){
    const { hx_Element, siblings, IS_RENDERLESS } = metrics; 
    return _createWidgetElement(virtualNode, config.hx_Element, siblings, IS_RENDERLESS );
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
    expression=formatExpression('obj', keys(data), expression);
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
        if(response) return response;
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
  function resolveAccessor(self, str, hx_Element, $$bind=false){
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
        text=_$runModelBind(self, filters.shift().trim(), hx_Element);
        text=unwrap(text);
        if(len(filters)) text=$Filter_HelpersService(self, text, filters, hx_Element, $$bind);
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
  function _$runModelBind(self, ref, hx_Element, returnToken=false){
    let value;
    const model= isHouxitBuild(self) ? self.__public_model__ : isModelInstance(self) ? self : Object.create(null);
    const context=isHouxitElement(hx_Element) ? hx_Element?.LabContext || {} : isPObject(hx_Element) ? hx_Element : {};
    try{
      value=_Evaluate_THIS( model, ref, self, context) ;
      if(isNull(value) && !hasSpecialCharacters(ref) && !isNullBasedKeyword(ref) ){
        return checkForModeLAndContextAvailability(model, context, ref, returnToken);
      }
    } catch(err){
        if(ref && !returnToken){
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
    });
    if(!response) return null
    const self=getCurrentRunningEffect({
      name:'useBind'
    });
    if(!self) return null;
  }
  function useBind(ref, config){
    return _useBind__(ref, config);
  }
  const hasFilterInstance=(self, name)=>_makeMap_(BUILT_IN_FILTERS, name) || _makeMap_(self[$$$register].filters, name);
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
  function $Filter_HelpersService(self, value, filters,hx_Element, $$bind){
    if(!len(filters)) return  value;
    let filterInstance;
    let parameters;
    for(const [ index, filter ] of filters.entries()){
      let name=filter.trim() ||  null;
      if(!name){
        $warn(`undefined filter name\n\nCheck template filter definition`, self);
        return;
      }
      const VResponse=filterInstancesValidator(name, self, hx_Element);
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
  function filterInstancesValidator(name, self, hx_Element){
    let parameters=[];
    if(name.includes("(") && name.includes(")")){
      const filter=name;
      name=abstractFilterName(name);
      let { content } = ArgsExtractor(filter, name);
      const reader=`((...args)=> args)(${content})`;
      parameters=_$runModelBind(self, reader, hx_Element);
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
  const HouxitDirectives="if,else,else-if,html,text,for,raw,slot,model,bind,on,scoped,provide,transite,animate,clone";
  const preCompiledDirs="if,else-if,else,for,raw";
  const buildUsableDirectives="scoped,model,clone,motion";
  const isHyperscriptDirective=dir=>_makeMap_(buildUsableDirectives, dir);
  const isHouxitDirective=dir=>_makeMap_(HouxitDirectives, dir);
  
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
    const statementRegex = /^(?:let|var|const|if|for|while|do|switch|else|else if|await|break|case|yield|with|catch|continue|debugger|void|try|import|throw|finally|exports|do|delete|return|throw|delete|;).*$/;
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
  function _DynamicAttrNameResolver(self, attr, hx_Element, metrics){
    let iniAttr=attr;
    attr= fall_AttrName(attr) ;
    const isRerender=self[$$$operands]?.initializedRender;
    if(dynamicAttrRegex.test(attr)){
      const matches=attr.match(dynamicAttrRegex);
      let name=''
      let subscribers;
      [ subscribers, attr ] = effectDependencyTracking(self, function(){
        return matches[0].replace(dynamicAttrRegex, (match, text)=>{
          return unwrap(_$runModelBind(self.__public_model__, text, hx_Element, true));
        })
      });
      if(len(subscribers) && !isRerender){
        
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
  function resolveClassDiffing(newClass, oldClass){
    [ oldClass, newClass ] = [ new Tuple(...arrSet(oldClass)), new Tuple(...arrSet(newClass ))];
    if(deepEqualityCheck(newClass, oldClass)) return ;
    const insert=new Tuple();
    const remove=new Tuple();
    newClass.forEach((klass)=>{
      if(!oldClass.has(klass)) insert.add(klass);
    });
    oldClass.forEach((klass)=>{
      if(!newClass.has(klass)) remove.add(klass);
    });
    return [ insert, remove ];
  }
  function parse_Class_Binding(self, item, element, hx_Element, patch, { is_hyperscript, $orgKey }){
    item=unwrap(item);
    const [ subs ]= patch || [];
    const transform=mapClassTypeTransform(item, new Tuple());
    for(let [index, cls] of transform.entries()){
      cls=unwrap(cls)
      if(!element.classList.contains(cls)) {
        toggleClassNames(element, cls);
      }
    }
    if(!is_hyperscript && !len(subs)) return;
    hx_Element.VNodeManager.propsTraversers.add(function(observers, vnode){
      item=_createElementPropsEffectBlock_(self, {
        element, 
        mode:'class', 
        patch, 
        bindings:{
          value:memMove(item)
        },
        $orgKey
      }, is_hyperscript, observers)
    });
  }
  function toggleClassNames(element, classes, remove=false){
    const toggler=remove ? 'remove' : 'add';
    classes.split(' ').forEach((cls)=>{
      if(cls) element.classList[toggler](cls);
    })
  }
  function compileStyleProps(self, item, styleProps, element){
    styleProps = styleProps || {};
    if(isPObject(item)){
      entries(item).forEach(([key, style])=>{
        if(!isString(unwrap(style))){ 
          $debug_log(`"${key}" style prop: Unrecognized stype property value \nat at\n "${key}" style property\n\n${element?.outerHTML || "" }`, self); 
          return;
        }
        styleProps[toCamelCase(key)]=style;
      });
    }else if(isArray(item)) item.forEach(value=>compileStyleProps(self, value, styleProps, element));
    else if(isString(item)){
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
  function parse_Style_Binding(self, item, element, metrics, hx_Element){
    const { is_hyperscript, patch, $orgKey } = metrics;
    const styleProps=compileStyleProps(self, item, {}, element);
    for(let [ prop, style ] of entries(styleProps)){
      style=unwrap(style)
      element.style[prop]=style;
    }
    if(!is_hyperscript && !len(patch[0])) return;
    hx_Element.VNodeManager.propsTraversers.add(function(observers, vnode){
      item=_createElementPropsEffectBlock_(self, {
        element, 
        mode:'style', 
        patch, 
        bindings:{
          value:memMove(item),
        },
        $orgKey
      }, is_hyperscript, observers);
    });
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
          iterate(binding.modifiers).each((value, key)=>{
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
      const canBindDyy =_makeMap_("provide,html,text,model,clone,scoped,transite,animate,bind,slot", binding.directive);
      if(canBindDyy)  binding.value= binding.key || binding.directive;
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
        iterate(errType).each((val, ind)=>{
          $debug_log(`"${val}" carriers are only supported in directives\n\n"${val}" interference has been rescinded`, self, true);
          response=false;
        })
      }
    }
    return response;
  }
  function validateIncomingPropsKeys(self, { key, attr }, is_hyperscript, hx_Element, metrics){
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
      key = transpileDirectiveShorhand(key);
      bindings=AttrsKeyNormalizer(key, attr, self);
      const debugResponse=AttrsKeyNormalizerDebugging(bindings, self);
      modifiers=bindings.modifiers; 
      deepKeys=bindings.deepKeys;
      directive=bindings.directive; 
      key=bindings.key;
      const ResolveDAName=(kk)=>_DynamicAttrNameResolver(self, kk, hx_Element, metrics);
      if(key && dynamicAttrRegex.test(key) ) bindings.key=ResolveDAName(key);
      iterate(deepKeys).each((v, k)=>{
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
    }
    return bindings;
  }
  function validateListenSpecialEvent(self, bindings){
    const key = bindings.key;//.slice(2).toLowerCase();
    const is_listen_ev=key==='onListen';
    if(!is_listen_ev && isFunction(bindings.value)) bindings.value=[ bindings.value, bindings.value.options || []];
    let response=validateCollectionArgs(bindings.value, {
      validators:is_listen_ev ? [ [String, Array], Function, [String, Array]] : [Function, [String, Array]],
      name:bindings.key,
      max:is_listen_ev ? 3 : 2,
      min:is_listen_ev ? 2 : 1,
      name:`<${key}> event`
    });
    let [ events, method, modifiers ] = bindings.value;
    if(!is_listen_ev){
      const func=events;
      modifiers= method;
      events=to_kebab_case(key).split('-');
      events.shift();
      method=func;
    }
    bindings.deepKeys=isString(events) ? events.split(".") : isArray(events) ? events : [];
    bindings.key=bindings.deepKeys.shift();
    bindings.value=method;
    bindings.modifiers=isString(modifiers) ? modifiers.split("|") : isArray(modifiers) ? modifiers : [];
    return true
  }
  function HTMLAttrsMagnifier(element, bindings, hx_Element, self, metrics, toggle=true){
    let { is_hyperscript, isRerender, patch, vNode } = metrics ;
    if(isRerender) return;
    let { key, value:attr, src } = bindings;
    if(isHTMLBooleanAttributes(key)) BooleanAttributesManager(self, element, [ key, attr], { 
      is_hyperscript,
      patch,
      $orgKey:src
    }, hx_Element );
    else if(key === 'class') parse_Class_Binding(self, attr, element, hx_Element, patch, {
      is_hyperscript,
      $orgKey:src
    });
    else if(isHTMLIDLAttributes(key)) IDLPropsTransform(self, [ key, attr], element, {
      is_hyperscript,
      patch,
      $orgKey:src,
    }, hx_Element );
    else if(isOnListener(src)) {
      attr=unwrap(attr);
      if(!validateType(attr, [Function, Array])){
        if(!(bindings.key.slice(2).toLowerCase() === "listen" && isArray(attr))){
          $debug_log(`on<Listen> listener expects an array value\n\nFound "${attr}" of "${getType(attr)}" type`, self, !isNull(self));
        }else $debug_log(`on<EventName> listener expects a function value or an array of valid methods functions\n\nFound "${attr}" of "${getType(attr)}" type`, self, !isNull(self));
        return;
      }
      const options=attr.options || {};
      bindings.value=attr;
      metrics=assign({ options }, metrics);
      if(!validateListenSpecialEvent(self, bindings)) return
      $$dir_ON(self, bindings, element, hx_Element, metrics);
    }else if(!isRerender && key === "ref") Special_REF_Modifier(self, element, bindings, hx_Element, metrics);
    else if(!isRerender && key==="context") SlotContextBindingTRANSITON(self, bindings, element, hx_Element, metrics);
    else if(!isRerender && key === "attach") transformAttachProp(self, bindings, element, hx_Element, metrics);
    else if(!isRerender && isHouxitNativeElement(hx_Element) && key === 'name' && vNode.prototype_ ==='slot') slotNamingTRANSITION(self, bindings, element, hx_Element, metrics);
    else{
      try{ 
        if(!isRerender) element.setAttribute(key, compileToRenderable(unwrap(attr)));
      }catch(err){
        $debug_log(`Attribute Error::\n\n...unable to set node attribute "${key}\n\n ${err}`, self, true, `When setting the attribute "${key}" on "${element.outerHTML}"`, self, !is_hyperscript );
        return
      }
    }
  }
  function _createElementPropsEffectBlock_(self, metrics, observer, vnode){
    const { element, mode, patch, bindings, is_hyperscript, $orgKey }=metrics;
    const [ subs, carrier, value ]=(patch || []);
    let [ s, transform ] = carrier?.();
    const newValue=is_hyperscript ? vnode.props[$orgKey] : transform;
    if(deepEqualityCheck(newValue, bindings.value)) return bindings.value;
    if(mode === 'class' || (mode === 'idl' && bindings.key === 'className')){
      const [ insert, remove ] = resolveClassDiffing(mapClassTypeTransform(newValue, new Tuple()), mapClassTypeTransform(bindings.value, new Tuple()));
      remove.forEach((klass)=>toggleClassNames(element, klass, true));
      insert.forEach((klass)=>toggleClassNames(element, klass));
    }else if(mode === 'bool'){
      if((newValue || isString(newValue)) && !(bindings.value || isString(bindings.value))){
        if (isHTMLIDLAttributes(bindings.key)) element[key]=attr;
        else element.setAttribute(bindings.key, newValue||'');
      }else{
        if(!(newValue || isString(newValue)) && (bindings.value || isString(bindings.value))){
          if(isHTMLIDLAttributes(bindings.key)) element[bindings.key]=false;
          else element.removeAttribute(bindings.key);
        }
      }
    }else if(mode === 'style'){
      const styleProps=compileStyleProps(self, newValue, {}, element);
      const oldStyleProps=compileStyleProps(self, bindings.value, {}, element);
      for(let [ prop, style ] of entries(styleProps)){
        style=unwrap(style);
        if(!deepEqualityCheck(style, oldStyleProps[prop])) element.style[prop]=style;
      }
      keys(oldStyleProps).forEach(style=>{
        if(!hasOwn(styleProps, style)) element.style[style]="";
      });
    }else if(mode === 'idl') element[bindings.key]= newValue || "";
    else if(mode === 'ref');
    else if(isUndefined(mode))  element.setAttribute(bindings.key, newValue || "");
    return newValue;
  }
  function genericLifecircleTransmitter(args, hooksTuple, name, el){
    const [ callback ]=args;
    if(!validateCollectionArgs(args, {
      count:1,
      validators:[Function],
      required:[true],
      name:"attach=function(ctx){ctx."+name+"()}"
    })) return;
    hooksTuple.add(callback);
    return undefined;
  }
  function attachOnListener(self, args, element, hx_Element, metrics){
    if(!validateCollectionArgs(args, {
      min:2,
      max:3,
      validators:[[String, Array], Function, [String, Array]],
      required:[true, true],
      name:"attach=Function(ctx){ctx.on()}"
    })) return;
    let [ events, callback, modifiers ] = args;
    events=isString(events) ? events.split(".") : events;
    $$dir_ON(self, {
      value:callback,
      modifiers:isString(modifiers) ? modifiers.split("|") : modifiers || [],
      key:events.shift(),
      deepKeys:events,
      directive:undefined,
    }, element, hx_Element, metrics);
  }
  function attachUseCallback(self, args, element, hx_Element, metrics, hooksList){
    const [ directive, value, modifiers ] = args;
    if(!validateCollectionArgs(args, {
      min:2,
      max:3,
      validators:[[Object, Function], Any, [String, Array]],
      required:[true, true],
      name:"attach=function(ctx){ctx.use()}"
    })) return;
    _With_Custom_Directives(self, {
      value:directive,
      modifiers:isString(modifiers) ? modifiers.split("|") : modifiers || [],
      key:undefined,
      deepKeys:[],
      directive:undefined,
    }, element, hx_Element, metrics.vNode );
  }
  function transformAttachProp(self, bindings, element, hx_Element, metrics){
    const { key, value, } = bindings
    if(!isPFunction(value)){
      $debug_log(`"attach" special property expects a plain function type`, self, true);
      return;
    }
    const hooks=hx_Element.VNodeManager.LifeCycleHooks;
    const hooksList=new Tuple(...directivesHooksMap.split(","));
    hooksList.delete("init");
    const context_obj={
      use(directive, value, modifiers){
        attachUseCallback(self, [...arguments], element, hx_Element, metrics, hooksList);
      },
      on(events, callback, modifiers){
        attachOnListener(self, [ ...arguments ], element, hx_Element, metrics);
      }
    }
    for(let hk of hooksList.values()){
      context_obj[hk]=function(callback){
        return genericLifecircleTransmitter([...arguments], hooks[hk+'_hook'], hk, element);
      }
    }
    value(element, context_obj);
  }
  function widget_props_plugin(element, bindings, hx_Element, self, metrics){
    const { key, value } = bindings;
    element[key]=value;
  }
  function attributes_hydration(props, self, hx_Element, metrics, element){
    const { key, attr, data } = props;
    let { isW, is_hyperscript, isRerender, patch } = metrics ;
    const bindings=validateIncomingPropsKeys(self, { key, attr }, is_hyperscript, hx_Element, metrics);
    const $orgKey=bindings.src;
    bindings.data=data;
    if(!is_hyperscript && bindings.directive) _Resolve_Directives_Hydration(self, bindings, element, hx_Element, metrics );
    else if(bindings.key === 'key' && isHouxitElement(hx_Element)) hx_Element.VNodeManager.vNodeClass.key=bindings.value;
    else ( isW ? widget_props_plugin : HTMLAttrsMagnifier )(element, bindings, hx_Element, self, metrics );
  }
  function slotNamingTRANSITION(self, bindings, element, hx_Element, metrics){
    let { value }=bindings;
    const { isRerender, vNode, is_hyperscript } = metrics;
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
    if(!isRerender) element.setAttribute('name', compileToRenderable(unwrap(value)));
    SSBs[value]={
      bindings:undefined,
      element
    }
  }
  function SlotContextBindingTRANSITON(self, bindings, element, hx_Element, metrics){
    if(!element.localName === "slot"){
      $debug_log(`"context" special property is only scoped to html "<slot>" element in Houxit\n<slot> element scope context property found on a none "<slot>" element\n\nFailed to resolve binding`);
      return;
    }
    if(!element.name){
      $debug_log(`To specifically bind context scope to slots, they are obliged to be contextually named\n\nIt's either this slot element was not named properly…\nOr that the "context" property preccedes the special slot "name" prop`, self, true);
      $warn(`To resolve this, make sure the name prop comes befor the "context" key on this slot element`, self);
      return;
    }
    let { value }=bindings;
    const slotName=element.name;
    self[$$$compiler].scopeSlotsBindings[slotName].bindings=value;
  }
  function IDLPropsTransform(self, props, element, metrics, hx_Element ){
    const [ key, attr ] = props;
    const { is_hyperscript, patch, $orgKey } = metrics;
    if(key === 'style') return parse_Style_Binding(self, attr, element, metrics, hx_Element);
    else if(key === "className") {
      const transform=mapClassTypeTransform(attr, new Tuple());
      element.className=element.className+" "+transform.join(" ");
    }else element[key]=attr ;
    if(!is_hyperscript && !len(patch[0])) return;
    hx_Element.VNodeManager.propsTraversers.add(function(observers, vnode){
      attr=_createElementPropsEffectBlock_(self, {
        element, 
        mode:'idl', 
        patch, 
        bindings:{
          value:memMove(attr),
          key
        },
        $orgKey
      }, is_hyperscript, observers);
    });
  }
  const isillegalKeyBinding=(prop, is_hyperscript)=>is_hyperscript && (hasAsterisks_bind(prop) || has$$_bind(prop) || hasAt_bind(prop)) || hasAsh_bind(prop);
  function Props_dilation_compile(vNode, self, hx_Element, metrics, element){
    const props=vNode.props ;
    const shatteredFlags=!isHouxitElement(hx_Element) ? hx_Element : null;
    hx_Element = !isHouxitElement(hx_Element) ? null : hx_Element;
    if(!isPObject(props)) return element;
    const is_hyperscript= metrics.is_hyperscript;
    const ctx=metrics.ctx;
    metrics = { 
      isRerender: self[$$$operands]?.initializedRender,
      is_hyperscript: self ? self[$$$core].map.is_hyperscript : hx_Element ? hx_Element.is_hyperscript : undefined,
      isW: !IS_ELEMENT_NODE(element) && validHouxitWidget(vNode.prototype_)
    }
    let propsIndex=0;
    metrics.shatteredFlags=shatteredFlags;
    metrics.ctx=ctx;
    entries(unwrap(props)).forEach(function([key, attr ]){
      metrics.vNode=vNode;
      attributes_hydration({
        key,
        attr
      }, self, hx_Element, metrics, element) ;
    });
  }
  function specialPropsPrefix(self, props, element, hx_Element){
    
  }
  function BooleanAttributesManager(self, element, [ key, attr ], { is_hyperscript, patch, $orgKey }, hx_Element){
    attr=unwrap(attr);
    if(attr || isString(attr)) {
      if (isHTMLIDLAttributes(key)) element[key]=attr;
      else element.setAttribute(key, attr||'');
    }
    if(!is_hyperscript && !len(patch[0])) return;
    hx_Element.VNodeManager.propsTraversers.add(function(observers, vnode){
      attr=_createElementPropsEffectBlock_(self, {
        element, 
        mode:'bool', 
        patch, 
        bindings:{
          value:memMove(attr),
          key
        },
        $orgKey
      }, is_hyperscript, observers);
    });
  }
  function generateCustomDirBinding(self, hx_Element, bindings){
    const { modifiers, deepKeys } = bindings;
    return createObj('Binding', {
      modifiers,
      deepKeys
    });
  }
  function _With_Custom_Directives(self, bindings, element, hx_Element, vNode){
    let { key, value:attr, modifiers, deepKeys, src, directive:Name  } = bindings;
    const isRerender = self[$$$operands].initializedRender;
    let value;
    if(attr) value=_$runModelBind(self, attr, hx_Element, true)
    let has_modifiers=len(modifiers) ? true : false;
    if( !hasOwn(self[$$$register].directives, Name )){
      $debug_log(
        `((unrecognized directive reference))\n\n "${Name}" directive was not registered as a directive on this widget\n\nat...........at>>>\n${element?.outerHTML || ""}`
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
    let dirB=generateCustomDirBinding(self, hx_Element, bindings)
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
    if(isRerender) return;
    if(!isNativeElement(element) && validHouxitWidget(element.prototype_)){
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
          hx_Element.VNodeManager.LifeCycleHooks[hook+'_hook'].add(CustomDir[hook]);
        }else if(validHouxitWidget(element.prototype_)) element[$$$customDirs][hook+'_hook'].add(CustomDir[hook]);
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
      $debug_log(`Callback argument passed  to useModifiers is not a function`);
      return pass
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
  function Special_REF_Modifier(self, node, binding, hx_Element, metrics){
    let { key, value, src, data }=binding;
    const isWidget=!isNativeElement(node);
    const is_hyperscript=hx_Element.is_hyperscript;
    data = is_hyperscript ? value : data ;
    if(!isToken(data)){
      $debug_log(`"ref" prop value expects a Houxit token value\n\nfailed to mount ref token property value`,self, true);
      return;
    }else if(isReadonlyToken(data)){
        $debug_log(`Path provided to the ref special prop resolves to a readonly token value\n\nfailed to mutate excep a readonly readonlyBypasser is to be implemented by the Houxit compiler`, self, true);
        return;
    }
    if(node && isWidget) node.props[$$$$dir__ref$$$$]=data;
    else if(node) {
      hx_Element.compiler_options['ref_$$Prop']=data;
      hx_Element.VNodeManager.templateRefs.add(data);
    }
  }
  function $$dir_HTML(self, bindings, vnode, hx_Element, metrics, text ){
    let { value, modifiers } = bindings;
    modifiers=new Set(modifiers);
    const is_hyperscript=hx_Element.is_hyperscript;
    const item=value;
    let subscribers;
    const initializedRender=self[$$$operands].initializedRender;
    const runBinding= ()=> _$runModelBind(self, value, hx_Element, !modifiers.has('bind'))
    if(!is_hyperscript) {
      [ subscribers, value ] = effectDependencyTracking(self, function(){
        return runBinding();
      } )
    }else value= runBinding();
    value=unwrap(value);
    const innerProp=isTrue(text) ? 'innerText' : 'innerHTML';
    if( isPrimitive(value)) {
      value=compileToRenderable(value);
      if(!isNativeElement(vnode) && value)  self.__public_model__.$attrs[innerProp]=value;
      else if(value) vnode[innerProp]=value;
    }
  }
  function $$dir_SLOT(self, bindings, vnode, hx_Element, metrics){
    let { value, modifiers, key } = bindings;
    if(!key){
      $debug_log(`slot key: "$$slot" directive has no key mapping name defined to the "slot" element\n\nfailed to normalize slot directive`);
      return;
    }
    modifiers=new Set(modifiers);
    const iswt=!isNativeElement(vnode) && validHouxitWidget(vnode?.prototype_);
    if(!iswt) {
      hx_Element.slot_name=key;
    }else vnode.props[$$slotName]=key;
    const slotBindings=assign({}, hx_Element?.VNodeManager.slotBindings || {});
    const dataBind=slotBindings ? slotBindings[key]?.bindings : undefined;
    if(!hx_Element.LabContext) hx_Element.LabContext={};
    else hx_Element.LabContext=assign({}, hx_Element.LabContext)
    if(value && isDestructureSyntax(value)){
      if(!(destructWarn(value, dataBind, self))) return;
      hx_Element.LabContext=smartDextCtxMerging(hx_Element.LabContext, {
        [$$dexTransformKey]:{
          sourcesArray:[ dataBind ],
          syntaxArray:[ value ]
        }
      });
    }else if(value) hx_Element.LabContext[value]=dataBind;
  }
  function __dilateHandler(self, props, hx_Element, is_hyperscript){
    const { key, item, src } = props;
    if(is_hyperscript || (!isOnListener(src) && !hasAt_bind(src) && !src.startsWith("$$on:") ) || isContextMethodString(self, hx_Element, item)){
      return item;
    }
    return `($event)=>${item}`;
  }
  function $$dir_BIND(self, binding, el, hx_Element, metrics){
    const { is_hyperscript, shatteredFlags, ctx } = metrics
    let { key, value:item, modifiers, deepKeys, src }= binding;
    item=__dilateHandler(self, { 
      key,
      item,
      src
    }, hx_Element, is_hyperscript );
    const carrierGetter=()=>effectDependencyTracking(self, function(){
      return isString(item) ? _$runModelBind(self, item, hx_Element || ctx ) : item ;
    });
    let [ subscribers , transform ] =carrierGetter();
    const isRerender=self[$$$operands]?.initializedRender;
    const response=transform;
    transform = unwrap(transform);
    metrics=assign({ 
      patch:[subscribers, carrierGetter, transform]
    }, metrics);
    if(!key && !isPObject(transform)) {
      $debug_log(`"$$bind" directive attributes binding expects a plain props object value when not chained to any attribute/prop argument`, self, true);
      return 
    }else if(!key && isPObject(transform)) {
      for(const [ ky, attr ] of entries(transform)){
        attributes_hydration({
          key:ky,
          attr:unwrap(attr),
          data:attr
        }, self, hx_Element, metrics, el);
      }
    }else attributes_hydration({
      key,
      attr:transform,
      data:response
    }, self, hx_Element, metrics, el);
    hx_Element=!isHouxitElement(hx_Element) ? shatteredFlags : hx_Element;
  }
  function $$dir_ON(self, bindings, node, hx_Element, metrics){
    let { key, value:attr, deepKeys, modifiers, src } = bindings;
    let options=metrics.options;
    const isRerender=self[$$$operands].initializedRender;
    const isWidget=node && validHouxitWidget(node.prototype_) && !IS_ELEMENT_NODE(node);
    if(isString(attr)){
      try{
        const funcToken=attr;
        attr=__dilateHandler(self, {
          key,
          item:attr,
          src
        }, hx_Element, metrics.is_hyperscript);
        attr=_$runModelBind(self, attr, hx_Element);
        attr=object_Has_Path(self.__public_model__, funcToken) && isPFunction(attr) ? attr.bind(self.__public_model__) : attr;
      }catch(err){
        $debug_log(`${err}`, self, true);
        return node;
      }
      attr=unwrap(attr)
      if(!isPFunction(attr)){
        $debug_log(`"${name}" event must be wrapped as or in a function \n\non.....on...\n  "${isWidget ?  '' : node?.localName}" \n`, self, true);
        return node;
      }
    }
    let opts;
    if(len(modifiers) && len(options)) {
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
    }else if(!isRerender && IS_ELEMENT_NODE(node)){
      let index=0;
      for(let event of deepKeys.values()) {
        if(!IS_VALID_EVENT_HANDLER(event)){
          $debug_log(`"${event}" is not a valid event name`, self, true);
        }else node.addEventListener(event, isFunction(attr) ? attr : pass);
      }
    }
    return node;
  }
  function $$dir_CLONE(self, bindings, vnode, hx_Element, metrics){
    const is_hyperscript=hx_Element.is_hyperscript;
    let { key, value:item, modifiers, deepKeys, directive:name }=bindings;
    modifiers=new Set(modifiers);
    if(!object_Has_Path(self.__public_model__, item)){
      $debug_log(`value "${item}" property value was referenced during render, but not initialized on model or is undefined\n\nat at\n ..."${name} directive on ${isWidget ? '$$clone' : vnode.localName} `,self, true);
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
      $debug_log(`There is a problem with accessing the path "${item}" property which was referenced during render, but seems not initialized on model or is undefined\n\nat at\n ..."${name} directive on ${isWidget ? '$$ref' : vnode.localName} `, self, true);
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
  function $$dir_MOTION(self, bindings, node, hx_Element, metrics, patchFlags, transit){
    let { value, modifiers } = bindings;
    modifiers=new Set(modifiers);
    const is_hyperscript=hx_Element.is_hyperscript;
    const item=value;
    let subscribers;
    const runBinding= ()=> _$runModelBind(self, value, hx_Element, !modifiers.has('bind'))
    if(!is_hyperscript) {
      [ subscribers, value ] = effectDependencyTracking(self, function(){
        return runBinding()
      } )
    }else value= runBinding();
    value=unwrap(value)
    motionElementNode(self, node, {
      hx_Element,
      modifiers,
      item : value,
    });
  }
  function $$dir_SCOPED(self, bindings, node, hx_Element,  metrics, patchFlags){
    let { value:item, modifiers, directive:name } = bindings;
    modifiers=new Set(modifiers);
    const isStyleEl=isNativeElement(node) && node.localName === 'style';
    if(!isStyleEl) {
      $debug_log(`"$$scoped" directive is only scoped to document <style> elements only`, self, true);
      return node;
    }
    let subscribers;
    let value;
    const runBinding= ()=>_$runModelBind(self, item, hx_Element, !modifiers.has('bind'));
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
  function $$dir_PROVIDE(self, Binding, vNode, hx_Element, modifiers){
    const node = vNode.GeneticProvider;
    const isWidget=!isNativeElement(node) && validHouxitWidget(node);
    const is_hyperscript=hx_Element.is_hyperscript;
    let { directive, value, key, }=Binding;
    vNode.props[$$$context]=createObj('Provide', { 
      prop:value
    });
    return node;
  }
  function $$dir_MODEL(self, bindings, node, hx_Element, metrics){
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
            hx_Element.render_tracked=true;
          }catch(err){
            $debug_log(`${err}`, self, true);
          }
        });
      }
      hx_Element.patch_tracks.add({
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
      node.props[$$$ModelUpdateKey]['resourceModel:Binding']=new houxitSignal("resourceModel:Binding", compileStraightModelBinding, {});
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
      if(tag === 'input') return _makeMap_(['file'], type) ? 'change' : _makeMap_(['button','submit','reset'], type) ? 'click' : _makeMap_(['image','hidden'], type ) ? 'change' : 'input';
      return tag === 'form' ? 'submit' : tag === 'select' ? 'change' : tag === 'textarea' ? 'input' : 'input';
    }
  }
  function _compileToStaticTemplateScaffold(self, render, recursive=false){
    const NodeList= isString(render) ? __HouxitHTMLParser__(render, [] ) : render;
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
    }else if( !validateType( type , [ String , Object , Function , ...( inBrowserCompiler ? [ HTMLElement ] : []) ] ) && !isHouxitBuiltinSymbolWidget(type) ) {
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
      validators:[[Array, Object]],
      count:1
    } ))) return self.__public_model__.$params;
    paramsManager(self, params, self.__public_model__.$attrs, true);
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
  function useTransmit(transmit){
    const self=getCurrentRunningEffect({
      name:"useTransmit"
    })
    if(!self && !(validateCollectionArgs(arguments, {
      name:"useTransmit",
      validators:[Object],
      count:1
    } ))) return false;
    mapPublicationsTraverse(self, { 
      transmit(){
        return transmit;
      }
    })
    return true;
  }
  function __useReceiver_(receive){
    const self=getCurrentRunningEffect({
      name:'useReceiver'
    })
    if(!self && !(validateCollectionArgs(arguments, {
      name:"useReceiver",
      validators:[[Array, Object]],
      count:1
    } ))) return false;
    return receivePublicationPrefix(self, { 
      receive 
    });
    return true
  }
  function useReceiver(){
    return __useReceiver_(...arguments);
  }
  function __useContext_Adapter(context){
    const self=getCurrentRunningEffect({
      name:'useContext'
    });
    if(!isHouxitBuild(self) && !(validateCollectionArgs(arguments, {
      name:"useContext",
      validators:[Function],
      count:1
    } ))) return false;
    if(!hasOwn(self[$$$core].opts, "context")){
      self[$$$core].opts.context=function(){
        return context.call(this, ...arguments);
      }
    }
    return true;
  }
  function useContext(callback){
    return __useContext_Adapter.call(this, ...arguments);
  }
  function runLifeCircleHooksAdapter(args, name){
    const self=getCurrentRunningEffect({ name });
    const response = validateCollectionArgs(args, {
      count:1,
      name,
      validators:[Function],
      required:[true]
    });
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
        $debug_log(`The computed macro is not allowed in the model option\n\nOnly allowed to be used within the body of the Build method option, in a function based widget or within the <script build> WUF (Widget Unit File) build system scope\n\nUse the "computedTokens" option instead if you are using the options API`, self, true);
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
        if(_makeMap_(props, transpiled) && !_makeMap_(paramsKeys, transpiled)){
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
    if(!_makeMap_(props || {}, ind)){
      paramsSet[ind]=undefined;
      return false;
    }else if(props ){
      const value=props[ind];
      if(validateType(value, param)) paramsSet[ind]=value;
      else{
        paramsSet[ind]=undefined;
        $debug_log(`params validation error\n\nproperty validation for widget default value failed, property "${ind}" is of an invalid type\n\n typeof "${param.name}" required`, self, true);
        return false;
      }
    }
  }
  function arrayParamsResolver(self, paramsSet, metrics ){
    const [ props, param ] = metrics ;
    if(props && _makeMap_(props, param)){
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
    }else if(!validateType(param.type, [Function, Array, Type]) ){
      $debug_log(`unexpected value passed as the type validator option\n expects a function or an Array of type function`, self, true);
      response = false;
    }else if(hasProp(param,'validator') && !isPFunction(param.validator)){
      $debug_log(`The "validator option must be a  function\n\nat ${ind} ${PN}`, self, true);
      response = false;
    }else if(isTrue(param.required) && !_makeMap_(props || {}, ind)){
      $debug_log(`Params validation error........\n\nThe ${PN+ ' of the '+'"'+self[$$$ownProperties].name+'"'+' widget' } params is required and seems not to  be provided "\nrequired ${PN} is missing\n\nat at\n  ....."${ind}"  param`, self, true);
      paramsSet[ind]=undefined;
      response = false;
    }
    return response;
  }
  function defaultParamBuffering(self, paramsSet, deferable){
    const [ props, param, ind ] = deferable ;
    if(hasOwn(param, 'default')){
      const defaultValue=()=> isFunction(param.default) ? param.default.call(self.__public_model__) : param.default;
      if(!hasOwn(props || {}, ind)){
        if(!validateType(defaultValue(), param.type)){
          paramsSet[ind]=undefined;
          $debug_log(`Params validation error .....\n\nproperty validation for widget default value failed, property "${ind}" is of an invalid type\n\n"${ isArray(param.type) ? '"Matches no type in the validation list' :  'typeof '+ param.type.name+" expected"}`, self, true); 
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
      $debug_log(`${pn} validation error .....\n\nproperty validation for ${ self ? 'widget' : 'object'} ${pn} value failed, property "${ind}" is of an invalid type\n\n${ isArray(param.type) ? "Matches no type in the required validation list" :  'typeof '+param.type.name+" expected" }`, self,  true);
      return false;
    }
    return true;
  }
  function resolveParamsPossibility(self, outlinedMetrics, in_build){
    let [ props, params ] = outlinedMetrics;
    if(isFunctionBasedBuild(self) && !in_build){
      entries(props).forEach(([ind, attr])=>{
        self.__public_model__.$attrs[ind]=attr;
      });
      return ;
    }
    let paramsSet={};
    let rv;
    if(params && len(params)){
      paramsSet=self.__public_model__.$params;
      entries(params).forEach(([ind, param])=>{
        if(has$$_bind(ind)){
          $debug_log(`Params validation error "${ind}" passed to widget as a houxit directive binding
            \n\n
            The "$$" may not be appended or used on a params identifier key name`, 
            self, true);
          return;
        }
        param=transform_param_master(self, param);
        if(!validationCoreManager(self, params, paramsSet, {
          ind,
          props,
          param
        })) return paramsSet;
      })
    }
    return paramsSet;
  }
  function transform_param_master(self, param){
    const setup={}
    if(validateType(param, [Array, Function ]) || param instanceof Type) setup.type=param;
    else if(isString(param)) setup.type=Any;
    else if(isPObject(param)) return param;
    return setup;
  }
  function validationCoreManager(self, params, paramsSet, metrics){
    const { ind , props, param } = metrics;
    // if(validateType(param, [Function, Array]) ){
    //   if(isFalse(paramsKeysDefer(self, paramsSet, [ props, ind, param ]))) return false;//Defer type, runs validation for tyoes in Array and JavaScript prototype Methods tyoes
    // }else if(isArray(params) && isString(param)) arrayParamsResolver(self, paramsSet, [props, param])//array and string based validation
    if(isPObject(param)){
      if(!runObjectifiedParamsValidation(self, paramsSet, [ props, param, ind ], 'params')) return false;//params in object type
      if(!defaultParamBuffering(self, paramsSet, [  props, param, ind ])) return false;//validating defaut values
      if(!paramsValidationCircle(self, paramsSet, [props, param, ind ], "params")) return false;
      if(!hasOwn(paramsSet, ind)) paramsSet[ind]=undefined;
    }
    return true;
  }
  function paramsManager(self, params, props, in_build=false){
    // if(in_build) vnode=opts;
    props=assign({}, props);
    const garbage={};
    if(!in_build) defineGetter(self.__public_model__, '$params', new Params())
    if(params && !validateType(params, [ Object, Array ])){
      $debug_log(`param option type validation failed, \n\n
        unexpected data type of "${getType(params)}"`, self,  true);
      return;
    }
    const paramsSet=resolveParamsPossibility(self, [ props, params], in_build);
    if(!paramsSet) return;
    GarbagePropsPrefix(self, paramsSet, garbage, props);
    entries(props||{}).forEach(([ind, value])=>{
      if(!hasOwn(paramsSet||{}, ind) && ind !== $$$Events) {
        self.__public_model__.$attrs[ind]=value;
      }else if(hasOwn(paramsSet || {}, ind) && hasOwn(self.__public_model__.$attrs, ind)) delete self.__public_model__.$attrs[ind];
    });
    if(len(paramsSet)){
      for(const [key, value ] of entries(paramsSet)){
        defineReadonlyGetter(paramsSet, key, value , [ true, false ] );
      }
    }
    // inDomPropsFallback(self, props, params, garbage);
  }
  function GarbagePropsPrefix(self, paramsSet, garbage, props){
  
  }
  function _hydrate_props(opts, self, vnode, metrics){
    const forwardAttrs=self[$$$core].settings.forwardAttrs;
    const Attrs=self.__public_model__.$attrs;
    if(!(forwardAttrs && isHouxitNativeElement(vnode) && len(Attrs))) return vnode ;
    iterate(Attrs).each((attr, key)=>{
      try{
        HTMLAttrsMagnifier(vnode.$element, {
          key,
          value:attr,
          src:key
        }, vnode, self, {
        
        })
      }catch(err){
        $debug_log(`Encountered a road block during attributes fallthrough forwarding on element "<${vnode.$element.localName}>"\n\n
          Check warning details info on attribute "${key}"`, self);
        return Break();
      }
    })
    if(hasOwn(self.__public_model__.$signals, 'resourceModel:Binding')){
      self.__public_model__.$signals["resourceModel:Binding"].fire(vnode.$element, true);
    }
    return vnode;
  }
  const houxitProps="props,children";
  const isHouxitProp=prop=>_makeMap_(houxitProps, prop);
  const initBuildInstaceKey=Symbol("<<<!@---initBuild---@>>>");
  const widgetTypeKey=Symbol("[[[widget-typing-system]]]");
  function registerTemplateClasses(self, options, vnode){
    if(!hasOwn(options, 'templateClasses')) return;
    for(let [key, klass] of entries(options.templateClasses)){
      if(!(isPFunction(klass)|| isTemplateClass(klass))){
        $debug_log(`"${key}" templateClasse property value expects a plain function`, self, true);
        return;
      }
      define(self.__public_model__, key, {
        value:isTemplateClass(klass) ? klass : createTemplateClass((...args)=>klass.call(self.__public_model__, ...args)),
        enumerable,
      });
    }
  }
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
      }else if(isNodeJSOnlyOption(key) && inBrowserCompiler) {
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
      return _hydrateHashToSelector(text, `[data-hx_build=${self[$$$ownProperties].hx_build}]`)+'{';
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
      self[$$$compiler].template.VN_Tree.ELEMENTS.replace(slot, content.$element);
      slot.replaceWith(content.$element);
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
    const renderedSlotsList={};
    const slot_elements=resolveSlotsFilter( self, vnode_build ) ;
    const assynedSlots=new Tuple();
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
        renderedSlotsList['default']=slotContent;
      }
    }
    if(!len(renderedSlotsList)) return vnode_build ;
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
    if(!_makeMap_(configOptionsSettings, key)){
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
  const globalProps="filters,widgets,directives,handlers,transmit,blocks,mixins";
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
        if(!isString(flushType) && !_makeMap_(flushOptions, flushType)){
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
  function _EffectDependencyNotifier(self){
    const postEffList=[];
    self[$$$operands]._OBSERVERS.values().forEach((obs)=>{
      if(obs.flushType==='post') postEffList.push(()=>obs.trigger(self));
      else obs.trigger(self);
    });
    return function(){
      for(let hk of postEffList.values()){
        callbackHookWithCatch(self, hk, "");
      }
    }
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
    if( !props || !len(props) ) return self.__public_model__ ;
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
      if('resourceModel:Binding' === signal){
        $warn(`"resourceModel:Binding" defined signal is a houxit built in signal name`, self);
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
      if(optName === 'blocks' ? isBuiltinBlocks(name) : _makeMap_(BUILT_IN_FILTERS, name)){
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
    self[$$$ownProperties]['hx_build']="_hx_"+generateUUID(10);
  }
  function _Data_Hydrations(self, options){
    const vnode=self[$$$core].virtualNode;
    if(hasProp(options, 'buildConfig')) setConfig(self, options);
    paramsManager(self, options.params, vnode.props);
    modelManager(self, options);
    self.__public_model__=Setup_State_Effect(self, self.__public_model__, true);
    entries(self[$$$register].handlers).forEach(([key, handler])=>{
      define(self.__public_model__, key, { 
        value:handler.bind(self.__public_model__),
        enumerable
      });
      defineGetter(self.__public_model__, "$refs", self[$$$operands].templateTokenizedInputs);
    });
    registerTemplateClasses(self, options, vnode);
    computedTokensCompile(self, options)
    receivePublicationPrefix(self, options);
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
  function deepableObj(obj){
    if(isHouxitBuild(obj) && isHouxitElement(obj) && (inBrowserCompiler && obj instanceof HTMLElement)) return false;
    return true
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
    if(useDeep && deepableObj(obj)) proxyEffectDeepConversion(obj, ReactiveEffect, useDeep, config, master);
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
      exchange(){
        return streamReactiveHook.call(this, Tuple, arguments, 'exchange', callback);
      }
      arrange(){
        return streamReactiveHook.call(this, Tuple, arguments, 'arrange', callback);
      }
    }
    return new TupleStream(...tuple.list());
  }
  function _createArrayStream(array, callback){
    const isSVA=len(array) === 1 && isNumber(array[0]);
    if(isSVA) array.push(undefined);
    class ArrayStream extends Array{
      constructor(){
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
    hx_Element:undefined,
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
      KEYS_INDEXES:new Tuple(),
      LEAGUE_TREE:{},
      priority:new Tuple()
    },
    template:undefined,
    scopeSlotsBindings:{}
  })
  const HXBuildOperandInitial=()=>({
    installers_plugin:new Tuple(),
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
  });
  function createCordinationProperties(self, vnode){
    self.__public_model__=new Model();
    let opts=vnode;
    if(isVNodeClass(vnode)) opts= defineWidget(vnode.prototype_);
    self[$$$ownProperties]=createObj('OwnProperties', HXBuildOwnPropertiesInitial(opts, vnode) );
    if(exists(opts.props) && hasOwn(opts.props, $$slotName)) delete opts.props[$$slotName];
    defineGetter(self, $$$register, registra() );
    defineGetter(self, $$$operands, createObj('Operands', HXBuildOperandInitial()));
    defineGetter(self, $$$core ,createObj('core', HXBuildCoreInitial(opts, vnode) ));
    defineGetter(self[$$$core], '$globals', createObj('$globals',{
      register:createObj('Register', registra() ),
      setupOptions:createObj('setupOptions'), 
      transmited:createObj('Transmited'), 
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
        // use unmount vnodw here
        delete renderedSlotsList[key];
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
      index++;
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
    let [ children, patchFlags, Flaghx_Element ] = setData;
    const defaultSlotsRecord=[];
    const slotsCore=renderedSlotsList ? renderedSlotsList : self[$$$core].slots;
    if(!children || !len(children) ) {
      defineFallbackSlotsToken(self, options, defaultSlotsRecord, slotsCore);
      return renderedSlotsList;
    }
    children = unwrapLoopWrappers(children);
    const hx_Element=options.children?.hx_Element;
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
  function normalizeHyperscriptSlotting(self, children, hx_Element, patchFlags, isRerender, config){
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
          slotRender=_HouxitTemplateParser(slotRender, patchFlags, null, hx_Element, null, config);
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
        const slotRender=_HouxitTemplateParser(value, patchFlags, null, hx_Element, null, config);
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
      hx_Element:vnode.hx_Element,
      config:{}
    } : vnode.filesFilter?.slotsCompilerArgs;
    let { hx_Element, self:patchFlags, is_hyperscript, fall, config } =  slotsCompilerArgs;
    if(!is_hyperscript) config.slotBindings=self[$$$compiler].scopeSlotsBindings;
    const context=self[$$$core].context ;
    const initializedRender=self[$$$operands]?.initializedRender;
    let childrenRender;
    if(is_hyperscript) childrenRender=normalizeHyperscriptSlotting(self, children, hx_Element, patchFlags, context, isRerender, config);
    else childrenRender=_HouxitTemplateParser(children, patchFlags, null, hx_Element, context, config );
    childrenRender = childrenRender && !isArray( childrenRender ) ? [ childrenRender ] : exists(childrenRender) ? childrenRender : [] ;
    return [ childrenRender, patchFlags, hx_Element ] ;
  }
  function $contextEngine(self, options, vnode){
    if(!options.context) return;
    let data;
    let subscribers;
    try{
      [ subscribers , data ] = effectDependencyTracking(self , function(){
        return options.context.call(self.__public_model__);
      });
    }catch(err){
      $debug_log(`Encountered an error when trying to run the context >> provider option method`, self, true);
      $debug_log(`${err}`, self);
      return;
    }
    if(isNull(data)){
      $debug_log(`The context option returns a nullish or undefined value \n\n
        Returning null is an invalid semantic `, self, true);
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
    const { hx_Element, self:patchFlags } = vnode.filesFilter.slotsCompilerArgs;
    if(isFalse(destructWarn(prop, value, self))) return;
    if(isDestructureSyntax(prop)){
      const contextProps = createObj('context');
      contextProps[$$dexTransformKey]=hx_Element.VNodeManager.dexTransform
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
    if(!hasOwn(opts, 'transmit')) return;
    const [ subscribers, value ]=effectDependencyTracking(self, ()=>{
      return opts.transmit.call(self.__public_model__)
    });
    if(!isPObject(value)) {
      $debug_log(`transmit method option expects a plain object as a return value`, self, true);
      return;
    }
    const globalBoard= isInitialBuild(self) ? self[$$$core].$globals.transmited : self[$$$core]._root[$$$core].$globals.transmited;
    for(const [key, valueX] of entries(value)){
      globalBoard[key]=valueX;
    }
  }
  function receivePublicationPrefix(self, opts){
    if(!hasOwn(opts, 'receive')) return;
    const globalBoard= isInitialBuild(self) ? self[$$$core]?.$globals.transmited : (self[$$$core]._root||{})[$$$core]?.$globals.transmited;
    for(let [ key, valueX] of getIterator(opts.receive)){
      let keyName = isArray(opts.receive) ? valueX : key ;
      if( !validateType(keyName, [String, Symbol])){
        $debug_log(`Arrays value of receive option expects a string / Symbol values of transmited property names\n\n
          ........"${keyName}"`, self, true);
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
          $debug_log(`No transmited props with the provided receive key "${keyName}"\n\n
            Unrecognized receive property`, self, true);
          return;
        }
      }
      let received= get_Object_Value( globalBoard , keyName );
      if(isPObject(valueX) && hasOwn(valueX, 'receive')){
        if(!isPFunction(valueX.receive)){
          $debug_log(`receive option of "${key}" receive property expects a function`, self, true);
          return 
        }
        received = !isAFunction(valueX.receive) ? valueX.receive.call(self.__public_model__, received ) : valueX.receive(received);
      }
      if(!hasOwn(globalBoard, keyName) && !exists(received) && hasProp(valueX, 'default') && exists(defaultValue)) received=defaultValue ;
      if(isReactiveToken(received) || isShallowReadonlyToken(received)){
        _mountTokenEffect(received, self, true);
      }
      let aliasKey=keyName;
      if(isPObject(valueX)){
        if(!hasOwn(valueX, 'alias')){
          $debug_log(`receive prop "${keyName}" object expects an "alias" property`, self, true);
          return;
        }else if(!validateType(valueX.alias, [ String, Symbol])){
          $debug_log(`"${keyName}" receive alias property expects a String or a Symbol`, self, true);
          return;
        }else if(!exists(valueX.alias)){
          $debug_log(`alias property of "${keyName}" receive property is an empty string or undefined prop naming`, self, true);
          return
        }else if(validateType(valueX, [String, Symbol])){
          valueX={ alias:valueX };
        }
        aliasKey = valueX.alias;
      }
      if(object_Has_Path(self.__public_model__, aliasKey)){
        $debug_log(`"${aliasKey}" property of receive conflicts with an existing model property\n\n
          Try configuring an alias property instead\n\n............at "${keyName}"`, self, true);
        return;
      }
      define( self.__public_model__ , aliasKey , { 
        value : received  ,
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
    if(!hasOwn(options, 'hx_Element') && !isHouxitElement(options['hx_Element'])) return;
    self[$$$ownProperties].hx_Element=options['hx_Element'];
  }
  function HouxitBuild( options ) {
    const [ opts, vnode ] = createCordinationProperties( this , options ) ; //create properties;
    sanitizedOptions( this , opts, vnode ) ;//sanitize received options
    $ensureLifeCircleHooks( this , opts, vnode ) ;
    setConfig(this, opts, vnode ); 
    $construct_With_Signals(this, opts, false, vnode);
    map_Events_Fall(this , opts, vnode);
    __Ensure_Renderer(this, opts, vnode);
    this[$$$compiler].templateProcessor = function (self, build ){
      if(!self[$$$operands].initializedRender) build=_$slotHydrationRenderer(self, opts, build);
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
  function trackTemplateSource(self, selector, fall, hx_Element, ssc){
    fall = fall || {};
    if(ssc) fall= smartDextCtxMerging(fall, ssc);
    let render = pass;
    const core_build=self[$$$core].build;
    inDomCaveatRemodeling(self);
    const update=()=>self[$$$operands].initializedRender;
    const temp_build=()=> update() ? memMove(self[$$$compiler].StarterTemplate, true ) : self[$$$core].build;
    if(isString(core_build) || isCollection(core_build)){
      render = (instance)=>{
        return _HouxitTemplateParser(temp_build(), instance, false, hx_Element, fall, {
        official:true
      });
      }
      self[$$$core].render=render;
    }else if(!(core_build) && selector && isInitialBuild(self)){
      self[$$$core].build=_GenerateRoot(selector, self)?.innerHTML || '';
      render = (instance)=> _HouxitTemplateParser( temp_build(), instance, false, hx_Element, fall, {
        official:true
      });
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
    
  }
  function portalSpecialHydration(self, vNode){
    const normalizer=vNode.filesFilter.$WidgetNormalizer;
    self[$$$core].build=normalizer.children;
  }
  function handleBuildGenerator(self, selector){
    let context
    let render;
    if(isBuiltinWidgetBuild(self)) HydrateBuiltInTransform(self);
    const widgetBuild=self[$$$core].build;
    if(isFunction(widgetBuild)){
      let responseRender;
      let renderer;
      createGarbageCollector(self);
      const useState=!isAFunction(widgetBuild);
      try{
        if(useState) installCurrentRunningEffect(self);
        renderer = widgetBuild.call(undefined, self.__public_model__.$params, getComposersContext(self), $$houxitPower );
        if(useState) reinstatePreviousRunningEffect();
        responseRender=renderer;
        if(isAFunction(widgetBuild) && !isPFunction(renderer) ) responseRender=()=>renderer;
      }catch(err){
        $debug_log(`Error during the call of the build function`,self, true, DebugFlags.build);
        if(isXtruct(widgetBuild)){
          $debug_log(`build options method seems to be a constructor function`, self);
        }else $debug_log(`${err}`, self);
        return ;
      }
      mapGarbargeHooks(self);
      if(isModelInstance(renderer) && (!isFunctionBasedBuild(self) || isInitialBuild(self))) {
        const options = self[$$$core].opts;
        if(hasOwn(options, 'render')) responseRender=()=>options.render.call(self.__public_model__);
        else{
          self[$$$core].build=hasOwn(options, "template") ? options.template : null ;
          const templateRender= trackTemplateSource(self, selector, null, context?.hx_Element, context?.props || undefined );
          return templateRender;
        }
      }
      if(!isPFunction(responseRender) && !isAFunction(widgetBuild) ){
        $debug_log(`Error during the call of ${ !isFunctionBasedBuild(self) ? 'the build function' : 'functional widget' } context\n
          failed to return a render function when returning the build method::\n
          Cross-Check your returned renderable Data as This may lead to unexpected results during DOM nodes Compilation`, self, true, DebugFlags.build);
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
      return trackTemplateSource(self, selector, context?.hx_Element, context?.props );
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
        if(!hasProp(self[$$$register][name], key) && key !== "$root"){
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
      if(!_makeMap_(registeredOpts, key)){
        $debug_log(`Unrecognised option found\n\n
          "${key}" option is not a valid widget option or not registered,
          \n\n
          You can register this option by passing an "optionRegistry" object prop to "build.controller({})" method as an object argument method`, self, true);
        return;
      }else if(!validateType(opt, registeredOpts[key])){
        $debug_log(`The provided "${key}" option validation failed on the required type\n\n
          Type of "${getType(opt)}"" found`,self, true );
        return;
      }
      
    }
  }
  function widgetSlotsManager(self, options, vnode){
    runtimeSlotsFallThrough( self , options, null, vnode ) ;
    const setData = slotsGeneticProvider( self , options, vnode );
    _induceSlotContents( self , options , setData || [] ) ;
    for(const [key, content] of entries(self[$$$core].slots)){
      self[$$$compiler].composedSlots[key]=function slotRender(){
        return h('slot', {
          name:key
        });
      }
    }
  }
  function activateTemplateTokenizedOptions(self, options){
    if(!options.tokenRefs)return;
    const instanceTemplateTokens=self[$$$operands].templateTokenizedInputs;
    iterate(options.tokenRefs).each((keyName, index)=> _AnchorRefAdapter_(self, keyName));
  }
  function _AnchorRefAdapter_(self, ref){
    if(!isString(ref)){
      $debug_log(`tokenRefs options received an invalid data type`, self, true);
      return;
    }
    const tokenized=new Token(null);
    _mountTokenEffect(tokenized, self, true);
    self[$$$operands].templateTokenizedInputs[ref]=tokenized;
    return tokenized;
  }
  function _useTokenRef(ref){
    const self= getCurrentRunningEffect({
      name:'useTokenRef'
    });
    if(!isHouxitBuild(self) && !validateCollectionArgs(arguments, {
      validators:[String],
      count:1,
      required:[true]
    })) return E_Obj;
    return _AnchorRefAdapter_(self, ref);
  }
  function useTokenRef(ref){
    return _useTokenRef(...arguments);
  }
  function prefixManagement( self ) {
    const options = self[$$$core].opts ;
    mapPublicationsTraverse(self, options) ;
    validateRegistryProvider( self ) ;
    mergeRegisteries( self ) ;
    _$instanciateModelProps( self ) ;
    activateTemplateTokenizedOptions(self, options);
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
    });
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
      $debug_log(`computedToken:: computedToken macro at Parameter 1 expects a getter function or a descriptor object of a "get" and an optional "set" property methods`, self, true);
      computed = pass;
    }
    const [ computedTokenData, subscribers ] =composedTokenHydration(self, computed, config);
    computedTokenData[refInternalEffectKey][ '[[[computed__Token]]]' ] = true;
    computedTokenData[refInternalEffectKey].computed=( isPFunction(computed) ? computed : computed.get ).bind(self.__public_model__)  ;
    computedTokenData[refInternalEffectKey].subscribers.extend(subscribers)
    computedTokenData[refInternalEffectKey].Initial=callDepsGetters(subscribers);
    if( len( subscribers ) ) {
      self.__public_model__._observe( subscribers , () => {
        if( isComputedToken( computedTokenData ) ) {
          computedTokenData[refInternalEffectKey].updateFlags ++;
          if( !computedTokenData[refInternalEffectKey].ModelInstance ){ 
            computedTokenData[refInternalEffectKey].ModelInstance = self.__public_model__;
          }
        }
      }, {
        flushType: "post"
      })
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
    const useSSRCompiler=this[$$$core].settings.useSSRCompiler;
    let domRoot=_GenerateRoot(nodeSelector, this);
    activateWatchObserverPlugin(this, nodeSelector);
    if(IS_ELEMENT_NODE(domRoot) && isInitialBuild(this) && !useSSRCompiler ) domRoot.innerHTML="";
    if(isInitialBuild(this) && !IS_ELEMENT_NODE(domRoot)){
      $debug_log('Initial entry Point mount root expects an element node', this, true);
      return this
    }
    if(isInitialBuild(this) && isTrue(domRoot.IS_HOUXIT_MOUNTROOT)){
      this[$$$operands].initializedRender=false;
        $debug_log(`A Houxit widget has already been mounted on this element, cannot mount more than one Widget on a single root element`, this, true, `When trying to mount this initialBuild instance to the target DOM`);
      this[$$$operands].initializedRender=true;
      return this;
    }
    adapterDOMMountingProduction(this, domRoot)
    return this;
  }
  function activateWatchObserverPlugin(self, nodeSelector){
    _Data_Hydrations(self, self[$$$core].opts)
    prefixManagement(self);
    handleBuildGenerator(self, nodeSelector);
    let initialBuild=self[$$$core].render;
    before_render_semantics(self);
    defineGetter(self, 'build', Render_Template(self, initialBuild) );
    _Reactive_Adapter_Plugin( self.__public_model__ ,async function(){
      const postEffCall=_EffectDependencyNotifier(self);
      _ReconciliationTransformTrigger(self,  nodeSelector );
      deferTick(()=> postEffCall());
    }, self, true);
    callbackHookWithCatch(self, self[$$$operands]._LIFECIRCLEHOOKS.onTracked, 'onTracked');
    callbackHookWithCatch(self, self[$$$operands]._LIFECIRCLEHOOKS.postBuild, 'postBuild');
    deferTick(()=>self[$$$operands].onRenderTracked=true);
    self[$$$operands].initializedRender = true ;
  }
  function before_render_semantics(self){
    const installers=self[$$$operands].installers_plugin;
    if(len(installers)){
      self.install(function(build){
        for(const installer of installers.values()){
          installer(...arguments);
        }
      })
    }
  }
  function adapterDOMMountingProduction(self, domRoot){
    const MoutRootToken={
      IS_HOUXIT_MOUNTROOT:true,
      __mountRootToken:'hx__'+generateUUID(5),
    }
    callbackHookWithCatch(self, self[$$$operands]._LIFECIRCLEHOOKS.preMount, 'preMount');
    domRoot = activateBuildMount(self, domRoot, MoutRootToken);
    const el=self[$$$core].posixVNode;
    whenMounted(self, el.$element, ()=>{
      for(const fn of self[$$$compiler].whenMountedHooks.values()){
        callbackHookWithCatch(self, fn, '')
      }
      callbackHookWithCatch(self, self[$$$operands]._LIFECIRCLEHOOKS.postMount, 'postMount');
    });
    self[$$$operands].hasMountProto=true;
  }
  function activateBuildMount(self, domRoot, MoutRootToken){
    if(isInDomNode(domRoot) && IS_ELEMENT_NODE(domRoot) && isInitialBuild(self)) {
      domRoot.innerHTML='';
      domRoot.append(self.build?.$element || '');
      self.property('$root', self.build);
      domRoot.IS_HOUXIT_MOUNTROOT=true;
      deferTick(()=>{
        if(domRoot.hasAttribute('cloak')) domRoot.removeAttribute('cloak');
      });
    }else domRoot=self.build?.$element;
    return domRoot;
  }
  function createCloakDirectiveHydrator(action){
    const styleEl=document.createElement('style');
    styleEl.append(`
    [cloak]{
      display:none;
    }
    `);
    document.head.appendChild(styleEl);
  }
  createCloakDirectiveHydrator();
  function widget(name, widget){
    if(!validateCollectionArgs(arguments, {
      name:"initBuild().widget()",
      validators:[String, [Function, Object, Class]],
      count:2,
      required:[true, true]
    })) return;
    if(len(new Set(arguments)) === 2) this[$$$core].$globals.register.widgets[name]= widget;
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
    if(!validateCollectionArgs(arguments, {
      name:"initBuild().handler()",
      validators:[String, Function],
      count:2,
      required:[true, true]
    })) return;
    if(len(arguments) === 2) this[$$$core].$globals.register.handlers[name]=handler;
    return this;
  }
  function directive(name, directive){
    if(!validateCollectionArgs(arguments, {
      name:"initBuild().directive()",
      validators:[String, [Function, Object]],
      count:2,
      required:[true, true]
    })) return;
    if(len(arguments) === 2) this[$$$core].$globals.register.directives[name]=directive;
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
    if(!validateCollectionArgs(arguments, {
      name:"initBuild().filter()",
      validators:[String, [Function, Object]],
      count:2,
      required:[true, true]
    })) return;
    if(len(arguments) === 2) this[$$$core].$globals.register.filters[name]=filter;
    return this ;
  }
  function block(name, block){
    if(!validateCollectionArgs(arguments, {
      name:"initBuild().block()",
      validators:[String, [Function, Object]],
      count:2,
      required:[true, true]
    })) return;
    if(len(arguments) === 2) this[$$$core].$globals.register.blocks[name]=block;
    return this ;
  }
  
  function property(name, value){
     if(!validateCollectionArgs(arguments, {
      name:"initBuild().property()",
      validators:[String, Any],
      count:2,
      required:[true, true]
    })) return;
    if(len(arguments) === 2) this[$$$core].$globals.register.properties[name]=value;
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
      // use unMountVNode vnofe macro hete
      unMountVNode(this.build)
      // log(this)
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
    return Object.freeze(this);
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
  function configForwardSlot(forwardSlot){
    return createConfig_Constraint.call(this, "forwardSlot", ...arguments);
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
      if(_makeMap_(globals.legalOptions, key)){
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
  function transmit(prop, value){
    if(!validateType(prop, [ String, Symbol ])){
      $debug_log(`Parameter 1 on .transmit() expects a string or a Symbol `, this, true);
      return this;
    }
    const globalBoard= isInitialBuild(this) ? this[$$$core].$globals.transmited : this[$$$core]._root[$$$core].$globals.transmited;
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
      configForwardSlot, 
      configScopedStyleSheet,
      controller,
      configForwardAttrs,
      hydrate,
      configOptions,
      destroy,
      transmit
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
    HouxitBuild.prototype[key]=fn;
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
          queueMicrotask(()=>self[$$$operands].garbageWatch=false);
        })
      }
      if(persist) new Promise((resolve, reject)=> resolve(self[$$$operands].garbageWatch)).then(()=>queueMicrotask(fn));
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
  function posixVNodeTransform(self, build){
    self[$$$core].posixVNode = new HouxitTextElement("", self);
    if(build) build.$element.prepend(self[$$$core].posixVNode.$element);
    else build=self[$$$core].posixVNode;
    return build;
  }
  function Render_Template( self , initBuild ) {
    const instance =isBuiltinWidgetBuild(self)  ? self[$$$core].virtualNode.filesFilter.INSTANCE_NORMALIZER : self;
    const is_hyperscript=self[$$$core].map.is_hyperscript;
    const isRerender=self[$$$operands].initializedRender;
    if(isPFunction(initBuild)) initBuild = initBuild( instance );
    if(is_hyperscript) initBuild=_HouxitTemplateParser(!isArray(initBuild) ? [initBuild] : initBuild, instance, null, null, null, {
      official:true
    });
    if(isArray(initBuild)) initBuild= new HouxitFragmentElement(initBuild, self, null);
    self[$$$compiler].template=initBuild;
    if(!isRerender) initBuild=posixVNodeTransform(self, initBuild);
    if(!isRerender && !isBuiltinWidgetBuild(self)) widgetSlotsManager(self, self[$$$core].opts, self[$$$core].virtualNode);
    initBuild = self[$$$compiler].templateProcessor( instance , initBuild) ;
    return initBuild ;
  }
  async function _deferTick( fn ) {
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
  async function _Reactive_Adapter_Plugin(data, callback, self, deep=false){
    const observers=[];
    const observe=(getter, callback)=>{
      const observer = new Observer( getter, callback, self);
      observers.push(observer);
      observer.update();
    }
    if(self[$$$operands].PATCH_FLAG ){
      observe(()=>data[$$$StreamProxyKey], function(){
        try{
          callback();
          self[$$$operands].PATCH_FLAG=0;
        }catch(err){
          $debug_log(`Encountered a Problem during DOM rendering effect trigger phase\n\n>>>>>`, self, true);
          $warn(`${err}`, self);
          return;
        }
      })
    }
  }
  function preUpdateHookFlush(self){
    
  }
  function _ReconciliationTransformTrigger(self, selector){
    const observer={ 
      mutated:false, 
      updated_hooks:new Tuple(), 
      active:false , 
      willMutate:false,
      effectFlush:new Tuple()
    };
    triggerHydrationCompile(self, observer);
  }
  function triggerHydrationCompile(self, observer){
    callbackHookWithCatch(self, self[$$$operands]._LIFECIRCLEHOOKS.onEffect, 'onEffect');
    const is_hyperscript=self[$$$core].map.is_hyperscript;
    self.__public_model__._deferTick(function(){
      Render_Effect_Reactive_Transform(self, observer) 
    } ).then(function(){
      if(len(observer.effectFlush)){
        callbackHookWithCatch(self, self[$$$operands]._LIFECIRCLEHOOKS.preUpdate, 'preUpdate');
      }
    }).then(()=>callSetHooks(self, observer.effectFlush )).then(function(){
      if( observer.mutated && len(observer.effectFlush) ){
        callUpdatedHook( self , observer ) ;
        observer.updated_hooks.clear();
      }
    }) ;
  }
  function Render_Effect_Reactive_Transform(self, observer){
    const is_hyperscript=self[$$$core].map.is_hyperscript;
    const isRerender=self[$$$operands].initializedRender;
    try{
      let EffectVNode;
      Promise.try(()=>{
        EffectVNode=Render_Template(self, self[$$$core].render, true);
      }).catch((e)=>console.error(e))
      Promise.try(()=>resolvePatchAlgorithm(self, self.build, EffectVNode, observer, (key, index)=>{
      })).catch((e)=>console.error(e));
    }catch(e){
      $debug_log(`${e}`, self, true);
      $debug_log(`unable to complete the rerender circle patch\nthis is likely a probable bug/error within the houxit's compiler level; please report any problem and open an issue on our github repo`, self, true);
      return;
    }
  }
  function resolvePatchAlgorithm(self, Template, EffectVNode, observer, callback, recursing=false){ 
    const { KEYS_INDEXES:tempIndexes, LEAGUE_TREE:tempLeagues } = Template.VN_Tree;
    const { KEYS_INDEXES, LEAGUE_TREE } = EffectVNode.VN_Tree;
    const posixNode=self[$$$core].posixVNode.$element;
    let standingElement;
    const forAppending=[];
    const forInsertion=[];
    const forRemovals=[];
    const exchangeRecorder=[];
    for(const [index, key ] of tempIndexes.entries()){
      if(!KEYS_INDEXES.has(key)) {
        forRemovals.push([key, tempLeagues[key], index]);
      }
    }
    const NodeList=new Tuple();
    for(const [index, key ] of KEYS_INDEXES.entries()){
      let tempK=tempIndexes.at(index);
      if(hasOwn(tempLeagues, tempK) && index === tempLeagues[tempK][1] &&  tempLeagues[tempK][0]){
        standingElement = transformTargetElement(tempLeagues[tempK][0], posixNode);
      }
      if(key === tempK){ //run effect renderPatches if keys matches on the same index position
        const tempEl=tempLeagues[key][0];
        const effectEl=LEAGUE_TREE[tempK][0];
        renderVnodeDiffSequence(self, tempEl, effectEl, observer, Template, {
          index,
          key
        });
      }else if(key !== tempK ){//if render no more not at this index
        if(tempIndexes.has(key)){//but still exists in new vNodes
          const vnodeTM=tempLeagues[tempK];
          let targetElem= tempK ? transformTargetElement(vnodeTM[0], null, true) : undefined;
          const posixElem=document.createTextNode("");
          if(tempK) targetElem.after(posixElem);
          exchangeRecorder.push({
            elements:[tempLeagues[key], vnodeTM],//the position the current elemet is destinated
            keys:[key, tempK],
            index:[tempIndexes.indexOf(key), index],
            parent:targetElem?.parentNode,
            posixElem
          });
        }else{
          const effectEl=LEAGUE_TREE[key][0];
          const Rerender_Element=__createRerenderBlock(self, effectEl);
          if(index >= len(tempIndexes)){
            forAppending.push([Rerender_Element, key, index]);
          }else{
            const [ targetBox, targetInd]=tempLeagues[tempK];
            const targetElem=transformTargetElement(targetBox, null, );
            const posixElem=document.createTextNode("");
            targetElem.before(posixElem);
            forInsertion.push({
              elements:[Rerender_Element, targetBox],
              posixElem,
              parent:targetElem.parentNode,
              index:[undefined, index],
              keys:[key, tempK]
            });
          }
        }
      }
    }
    fractional_diffing_transform(self, exchangeRecorder, Template, EffectVNode, tempIndexes, tempLeagues, LEAGUE_TREE, KEYS_INDEXES, observer, forAppending, forInsertion, forRemovals);
    tempIndexes.arrange(KEYS_INDEXES.list());
  }
  function fractional_diffing_transform(self, exchangeRecorder, Template, EffectVNode, tempIndexes, tempLeagues, LEAGUE_TREE, KEYS_INDEXES, observer, forAppending, forInsertion, forRemovals ){
    const waitForAddBeforMove=[];
    effect_Position_Transform(self, exchangeRecorder, Template, EffectVNode, {
      tempIndexes,
      tempLeagues,
      LEAGUE_TREE,
      KEYS_INDEXES,
      observer,
      waitForAddBeforMove
    });
    const cleanup_zip=new Tuple();
    for(const { elements, index, keys, parent, posixElem } of forInsertion.values()){
      const [ Element, Target ]=elements;
      const [ ind, tempInd ] = index;
      const [key, tempK] = keys;
      tempLeagues[key]=[Element, tempInd ];
      posixElem.after(Element.$element);
      const parentList=Template.VN_Tree.ELEMENTS;
      const start=parentList.has(posixElem) ? parentList.indexOf(posixElem) : undefined;
      generateWrapElementAction(Element, (el)=>{
        if(isUndefined(start)) return;
        parentList.splice(start, 0, el);
        start++;
      });
      Template.NodeList.splice(EffectVNode.NodeList.indexOf(Target), 0,
      Element);
      cleanup_zip.add(()=> posixElem.remove());
      observer.mutated=true;
    }
    forInsertion.splice(0);
    cleanup_zip.forEach((cleanup)=> cleanup());
    cleanup_zip.clear();
    exchangeRecorder.splice(0);
    for(const [ Element, key, index] of forAppending.values()){
      const adjKey=KEYS_INDEXES.at(index-1);
      const [ targetBox, targetInd ]=tempLeagues[adjKey];
      tempLeagues[key]=[Element, index ];
      const targetElem=transformTargetElement(targetBox, null, true);
      generateWrapElementAction(targetBox, (el)=>{
        Template.VN_Tree.ELEMENTS.add(el);
      });
      Template.NodeList.add(targetBox);
      targetElem.after(Element.$element);
      observer.mutated=true;
    }
    forAppending.splice(0);
    for(const [ key, Element, index ] of forRemovals.values()){
      generateWrapElementAction(Element[0], (el)=>{
        Template.VN_Tree.ELEMENTS.delete(el);
      });
      Template.NodeList.delete(Element[0]);
      unMountVNode(Element[0]);
      observer.mutated=true;
      delete tempLeagues[key];
    }
    for(const { elements, index, keys } of waitForAddBeforMove.values()){
      const [ element, ] = elements;
      const [ ind, tempInd ] = index;
      const [ key, targekey ]=keys;
      const tempK=KEYS_INDEXES.at(tempInd-1);
      const [ targetBox, targetInd ] = tempLeagues[tempK];
      const targetElem=transformTargetElement(targetBox, null, );
      const parent=targetElem.parentNode;
      const posixElem=document.createTextNode("");
      targetElem.after(posixElem);
      generateWrapElementAction(element[0], (el)=> parent.moveBefore(el,
      posixElem));
      observer.mutated=true;
      cleanup_zip.add(function(){
        tempLeagues[key][1]=tempInd;
        posixElem.remove();
      });
      renderVnodeDiffSequence(self, element[0], LEAGUE_TREE[key][0], observer, Template, {
        index,
        key
      });
    }
    waitForAddBeforMove.splice(0);
    cleanup_zip.forEach((cleanup)=> cleanup());
    cleanup_zip.clear();
  }
  function effect_Position_Transform(self, exchangeRecorder, Template, EffectVNode, metrics){
    const { observer, tempIndexes, tempLeagues, LEAGUE_TREE, KEYS_INDEXES, waitForAddBeforMove } = metrics;
    let flow=0;
    const cleanup_zip=new Tuple();
    for(const { elements, index, keys, parent, posixElem } of exchangeRecorder.values()){
      const [ element, target ] = elements;
      let [ key, tempK ] = keys;
      let [ ind, tempInd ] = index;
      if(!tempK){
        if(tempInd >= len(tempIndexes)) {
          waitForAddBeforMove.push({
            elements,
            index,
            keys,
            posixElem
          });
        }
      }else{
        generateWrapElementAction(element[0], (el)=> parent.moveBefore(el, posixElem ));
        observer.mutated=true;
        cleanup_zip.add(function(){
          tempLeagues[key][1]=tempInd;
          posixElem.remove();
        });
        renderVnodeDiffSequence(self, element[0], LEAGUE_TREE[key][0], observer, Template, {
          index,
          key
        });
      }
    }
    cleanup_zip.forEach((cleanup)=> cleanup());
    cleanup_zip.clear();
  }
  function effectiveElement_REPATCH(self, hx_Element, vNode, observer, parent, ignore){
    if(isHouxitTextElement(hx_Element) ) {
      RerenderingTextsContents(self, hx_Element, vNode, observer, parent);
      return;
    }else if(isHouxitWidgetElement(hx_Element)){
      // WidgetEffectTrigger(self, hx_Element, vNode, observer, vNode);
    }else if(isRenderlessElement(hx_Element)) return;
    resolvePatchAlgorithm(self, hx_Element, vNode, observer, pass, false);
    if(isHouxitNativeElement(hx_Element)){
      const traverse=hx_Element.VNodeManager.propsTraversers;
      if(!len(traverse)) return;
      traverse.forEach( trackAttr => trackAttr( observer, vNode.VNodeManager.vNodeClass));
    }
  }
  function __createRerenderBlock(self, vnode){
    self[$$$operands].initializedRender=false;
    const NewNode=vnode.compiler_options.createElement();
    self[$$$operands].initializedRender=true;
    return NewNode;
  }
  function renderVnodeDiffSequence(self, hx_Element, vNode, observer, parent, metrics){
    let { index, key } = metrics;
    if(!HouxitElementDiffing(hx_Element, vNode)) {
      const NewNode=__createRerenderBlock(self, vNode);
      const posixElem=document.createTextNode("");
      const targetElem=transformTargetElement(hx_Element, null, true);
      targetElem.after(posixElem);
      if(parent) parent.VN_Tree.LEAGUE_TREE[key]=[NewNode, index];
      const parentList=parent.VN_Tree.ELEMENTS;
      let start=undefined;
      generateWrapElementAction(hx_Element, (el)=>{
        if(parentList.has(el)){
          if(isUndefined(start)) start=hx_Element.VN_Tree.ELEMENTS.indexOf(el);
          parentList.delete(el);
        }
      });
      unMountVNode(hx_Element);
      parent.NodeList.replace(hx_Element, NewNode);
      posixElem.before(NewNode.$element);
      generateWrapElementAction(NewNode, (el)=>{
        parentList.splice(start, 0, el);
      });
      posixElem.remove();
      observer.mutated=true;
      return ;
    }
    return effectiveElement_REPATCH(self, hx_Element, vNode, observer, parent );
  }
  function transformTargetElement(target, fallback, last=false){
    let targetElem;
    if(isTextOrNativeElement(target)) targetElem = target.$element;
    else{
      if(isHouxitWidgetElement(target)) target=WidgetElementUnwrap(target)
      if(isHouxitFragmentElement(target)) targetElem=target.VN_Tree.ELEMENTS.at( last ? len(target.VN_Tree.ELEMENTS)-1 : 0);
      else if(isTextOrNativeElement(target)) targetElem=target.$element;
    }
    return IS_ELEMENT_NODE(targetElem) || IS_TEXT_NODE(targetElem) ? targetElem : fallback;
  }
  function unMountVNode(vnode){
    if(isHouxitWidgetElement(vnode)){
      vnode.widget_instance.destroy();
    }else if(isHouxitFragmentElement(vnode)) vnode.upload((el)=> {
      el.remove();
    });
    else if(!isRenderlessElement(vnode)) vnode?.$element?.remove();
  }
  function generateWrapElementAction(vnode, callback){
    if(isHouxitWidgetElement(vnode)) vnode=WidgetElementUnwrap(vnode);
    if(isHouxitFragmentElement(vnode)) vnode.upload(callback);
    else if(!isRenderlessElement(vnode)) callback(vnode.$element);
  }
  function WidgetEffectTrigger(self, node, virtualElement, observer, virtualNode){
    const is_hyperscript=self[$$$core].map.is_hyperscript;
    const PropFlags = node.VNodeManager.patchFlags.PropFlags;
    
    instance[$$$compiler].slotsTransformRender(instance, observer, virtualNode.VNodeManager.rawChildren);
  }
  function callDepsGetters(depsArray){
    if(!len(depsArray)) return [];
    const valueDeps=[];
    depsArray.entries().forEach(([index, getter])=>{
      if(isPFunction(getter)) valueDeps[index]= getter();
    });
    return valueDeps;
  }
  function primate_check(node, vNode){
    if(!isPrimitive(node.prototype_) ) return isS(node.prototype_, vNode.prototype_);
    return isPrimitive(node.prototype_);
  }
  function HouxitElementDiffing(node, vNode){
    if(isSameHouxitElementType(node, vNode) || (deepEqualityCheck(node.prototype_, vnode.prototype_)) && primate_check(node, vNode)) return true;
    return false;
  }
  function RerenderingTextsContents(self, node, vNode, observer, parent){
    const value=node.compiler_options.value;
    if(node?.prototype_ !== vNode?.prototype_) {
      node.$element.textContent=vNode?.prototype_;
      node.prototype_=vNode.prototype_;
      if(parent) linkUpdateHook(self, parent, observer);
      observer.mutated=true;
    }
  }
  function WidgetElementUnwrap(vnode){
    if(isHouxitWidgetElement(vnode)) {
      vnode=vnode?.widget_instance?.build;
      vnode=WidgetElementUnwrap(vnode);
    }
    return vnode;
  }
  const isTextOrNativeElement=vnode=>isHouxitTextElement(vnode) || isHouxitNativeElement(vnode);
  function linkUpdateHook(self, vnode, observer){
    if(!isPass(vnode.updated_hook)){
      observer.updated_hooks.add(vnode.updated_hook);
    }
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
  function _Resolve_Directives_Hydration(self, bindings, virtualNode, hx_Element, metrics){
    const { isRerender, is_hyperscript } = metrics;
    let { directive, value, key } = bindings;
    if(!isHouxitDirective(directive)){
      _With_Custom_Directives(self, bindings, virtualNode, hx_Element, metrics );
      return;
    }
    if(directive === "provide"){
      if(!validHouxitWidget(virtualNode?.GeneticProvider)) {
        $debug_log(`"$$provide" directive is only scoped to widget instances vnode only\n\n found on "${isNativeElement(virtualNode) ? virtualNode.outerHTML+" element" : ""}"`, self, true);
        return ;
      }
      $$dir_PROVIDE(self, bindings, virtualNode, hx_Element, metrics);
    }
    const directiveArgs=[self, bindings, virtualNode, hx_Element, metrics];
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
  const nonSBIW=ww=> _makeMap_("suspense,memo,motion,provider", ww.slice(3));
  function Built_in_widget_Transform(self, vNode, hx_Element){
    const type=vNode.prototype_[$$BuiltinWidgetKey].slice(3);
    vNode.filesFilter.INSTANCE_NORMALIZER=self;
    vNode.filesFilter.hx_Element=hx_Element
    if(nonSBIW(vNode.prototype_[$$BuiltinWidgetKey])) NormalizingBuiltinRange(self, vNode);
  }
  function liquidateBuiltinGenerators(self, vNode, selfProp, prop){
    const is_hyperscript=vNode.is_hyperscript;
    let children=vNode.children;
    children = !is_hyperscript ? ( children ? children.NodeList : null ) : ( children && !isArray(children) ? [ children ] : children ? children : null );
    if(!selfProp) return children;
    const dataVnode=h(selfProp, assign({}, vNode.props || {}), children );
    dataVnode.is_hyperscript=vNode.is_hyperscript;
    vNode.filesFilter[prop]=dataVnode;
  }
  function NormalizingBuiltinRange(self, vNode){
    let props=memMove(vNode.props);
    const children=liquidateBuiltinGenerators(self, vNode, null);
    vNode.filesFilter.$WidgetNormalizer={
      children,
      props
    }
  }
  const blockTagRegex=/::@_\(([\w$.\-!:\#.%?&]+)\)_/;
  function isBlockTag(tagName){
    return blockTagRegex.test(tagName);
  }
  function getBlockTagName(block){
    return isBlockTag(block) ? block.match(blockTagRegex)[1] : undefined;
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
    const tagname=isBlockTag(vNode.type) ? getBlockTagName(vNode.type) : vNode.type;
    let widget;
    if(!isBlockTag(vNode.type) && !isDynamicPropTag(vNode.type) && !instance_Has_Widget( self , tagname ) && !(inBrowserCompiler ? customElements.get(tagname) : false )){
      $debug_log(`Template Compilation Error::\n\nUnresolved tagname "<${tagname}>"\n\n   ...if this is a houxit widget, make sure its registered through the "widgets" option or defined through the CustomElementsInstance.define() method if it's a customElement `, self, true);
      return false;
    }else if(isBlockTag(vNode.type)){
      if(isBuiltinBlocks(tagname)) return true;
      if(!instance_Has_Block(self, tagname)){
        $debug_log(`((Block Resolver Error))\n\n"${tagname}" block is not a registered block element`, self, true);
        return false;
      }else vNode.GeneticProvider=normalize_Block(self, tagname)
      return true
    }else if(_makeMap_(BUILT_IN_WIDGETS, tagname)){
      widget=BUILT_IN_WIDGETS[tagname];
    }
    widget=normalize_Widget(self, tagname);
    if(!isDynamicPropTag(tagname) && !validHouxitWidget(widget) && !customElements.get(tagname)){
      $debug_log(`>>>> "${tagname}\n\nCannot compile value as a Houxit widget\nMaybe an invalid houxit widget value`, self, true);
      return false;
    }
    if(validHouxitWidget(widget)) vNode.GeneticProvider=widget;
    vNode.prototype_=validHouxitWidget(widget) ? widget : tagname;
    return true;
  }
  function ResolveWidget(self, hx_Element, vNode, IS_RENDERLESS, slotsCompilerArgs){
    const widget=vNode.GeneticProvider;
    return $compilerEngine(self, vNode, hx_Element, slotsCompilerArgs);//$compilerEngine the widget flags, passed the widget to HouxitBuild, sets global widgets from  its parents if any, installs all GLOBAL_WIDGETS_AND_PLUGINS, mounts the widget to a fragment and return the build'
  }
  function $compilerEngine ( self , virtualNode , hx_Element, slotsCompilerArgs ) {
    let { rawChildren, GeneticProvider:widget } =virtualNode
    const is_hyperscript= self ? self[$$$core]?.map.is_hyperscript : virtualNode.is_hyperscript;
    const isRerender=self ? self[$$$operands].initializedRender : null;
    const propsElements={};
    if(virtualNode.props && self) {
      Props_dilation_compile(virtualNode, self, hx_Element, {
        is_hyperscript
      }, propsElements);
      virtualNode.props=propsElements;
    }
    if(!validHouxitWidget(widget)) return;
    virtualNode[widgetTypeKey]=widget[widgetTypeKey];
    virtualNode.widget_instance=widget;
    virtualNode.filesFilter.slotsCompilerArgs=slotsCompilerArgs;
    // if(isBuiltinWidget(virtualNode.prototype_)) Built_in_widget_Transform(self, virtualNode, hx_Element );
    if(isHouxitElement(hx_Element)) virtualNode[$buildHx_ElementKey]=hx_Element ;
    if(isRerender) return undefined;
    const child = new HouxitBuild( virtualNode ) ;
    integrateUseInstallProto(child);
    if(hx_Element) hx_Element.widget_instance=child;
    if( self ) {
      controllerHydration( self , child ) ;
      child.install( controllerGlobalPlugin , { self } ) ;//build the widget and other installations
    }
    return child.mount( _createFragment() ) ;//mounts the build to a houxit fragment
  }
  function integrateUseInstallProto(self){
    if(hasOwn(self[$$$core].opts, 'install')) self.install(self[$$$core].opts.install);
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
    const registries= getGlobalRegistery(options.self).register;
    for ( const [ key , value ] of entries( registries ) ) {
      const macroAdapter=key === "properties" ? "property" : key === "transmited" ? "transmit" : key.slice(0, -1);
      for ( const [ name, data ] of entries( value ) ) {
        build[macroAdapter]( name, data );//in the root, uses the build.macroAdapter> prototype to define global instances
      }
    }
  }
  function _createFragment(){
    return assign(new DocumentFragment(), {
      isHouxit_Fragment:true,
      NodeList:[],
      PATCH_FLAGS:new Set()
    });
  }
  const devInfo="You're running the development version of houxit "+get_version().slice(7)+", make sure you switched to the minified  version with the (*.min.js) file extension when deploying to production";//development information
  function __traverseRESOLVER(name){//dynamically resolving widget name
    const self=getCurrentRunningEffect({
      name:'resolve'
    });
    if(!validateCollectionArgs(arguments, {
      validators:[String],
      max:1,
      name:'resolve'
    })) return;
    let instance;
    if(!isHouxitBuild(self)) return;
    if (instance_Has_Widget(self, name) ){
      instance=normalize_Widget(self, name);
    }else{
      $debug_log(`resolve macro was unable to find a widget with the provided name "${type.name}"\n\n are you sure this is a builtIn/globaly/localy registered widget`, self, true);
      return;
    }
    return instance;
  }
  function resolve(name){
    return null//procure realtime resolving of prop names, falling to 1st occurance in model-handlers-widgets-directives;
  }
  resolve.widget=function resolveWidget(name){
    return __traverseRESOLVER(...arguments);
  }
  resolve.directive=function resolveDirective(name){
    return _directive_batch__(...arguments);
  }
  function _directive_batch__(name, value, modifiers){//dynamically resolving and controlling of directives and arguments
    const self=getCurrentRunningEffect({
      name:'resolve.directive()'
    });
    if(!validateCollectionArgs(arguments, {
      validators:[[String, Function, Object], Any, Array],
      max:3,
      min:1,
      name:'$$',
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
          $debug_log(`$$ macro was unable to find a directive with the provided name "${type.name}"\n\n are you sure this is a builtIn/globaly/localy registered directive`, self, true);
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
  function $$(name, value, modifiers){
    return _directive_batch__(...arguments);
  }
  function _withDirectives(...dirs){
    const response = validateCollectionArgs(arguments, {
      min:1,
      name: "useDirs"
    });
    let props={};
    dirs=[ ...dirs ];
    if(!response && !len(dirs) ) return isPObject(props) ? props : {} ;
    const dirSet=new Tuple();
    if(len(dirs)){
      for(const directive of dirs.values()){
        if(isArray(directive)) directive = $$(...directive);
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
    if(!len(setup.propValue)) value = isString(value) ? value : null;
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
  const isPlainTextChildrenTagElements=(txt)=> new Set("script,style,title,textarea,code,noscript,iframe,xmp".split(',')).has(txt);
  class comment{
    constructor(value){
      if(value && isString(value)){
        this.content=value;
      }
    }
    content="";
  }
  const isHtmlComment=(value) => value instanceof comment;
  function generateBlockTagRegex(delimiters){
    let [ open, close ] = !delimiters ? [ "{{", "}}"] : delimiters;
    open = hasSpecialCharacters(open) ? escapeDecoder(open) : open;
    close = hasSpecialCharacters(close) ? escapeDecoder(close) : close;
    return new RegExp(`(${open}(\\/|@)([\\w\\-$:]+)(.*?)(\\/)?${close})`,'mg');
  }
  const dynamicPropTagRegex=/::([\w-$:\-!\#\@.()[\]%?&]+)/;
  function isDynamicPropTag(tag){
    return /^::([\w-$:\-!\#\@.()[\]%?&]+)/.test(tag)
  }
  const emptyTagRegex=/\<[\/]?[ ]*\>/;
  const isEmptyTag=(tag)=>emptyTagRegex.test(tag);
  const isOpenEmptyTag=(tag)=>/(\<[ ]*\>)/.test(tag);
  const isCloseEmptyTag=tag=>/(\<\/[ ]*\>)/.test(tag);
  const openingTagsRegex = /(\<[ ]*\>|\<\/[ ]*\>)|(<(\/)?([\w\-\$!:\#\@.()[\]%?\/&]+)(\s+[^>]*?(?:(?:[\w]+[_!@#$'"%^&*()+\-\[\]{};:\\|,.<\/?~`]*)|(?:'[^']*')|(?:"[^"]*")))*\s*(\/)?>)|([\w \s!@#$'"%^&*()+\-\[\]{};:\\|,.\/?`~]+)/mg;
  const openingTagRegex=/<([\w\-\$!:\#\@.()[\]%?&]+)(\s+[^>]*?(?:(?:[\w]+[_!@#$'"%^&*()+\-\[\]{};:\\|,.<\/?`~]*)|(?:'[^']*')|(?:"[^"]*")))*\s*(\/)?>/m;
  const isOpeningTag = (source)=> openingTagRegex.test(source);
  const closingTagRegex= /<[\/]([\w$.:\-\@()[\]%&?]+)[ ]*>/;
  const isClosingTag=(source)=> closingTagRegex.test(source);
  const isText=(text)=> !openingTagRegex.test(text) && /([\w \s!@#$'"%^&*()+\-\[\]{};:\\|,.\/?`~]+)/m.test(text);
  const openingTagAttrRegex=/^<[\w\-\$!\@:.()[\]%?&]+([\s\S]*[^\/>])?\s*(\/)?>\s*$/m;
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
  function createDynamicPropLoader(self, Vnode, config){
    if((isBlockTag(Vnode.type)) || !isString(Vnode.type) || !isDynamicPropTag(Vnode.type) || !isHouxitBuild(self) || config.JSXParser ) return;
    const dTAG=Vnode.type;
    Vnode.type=Build;
    if(!Vnode.props) Vnode.props={
      '$$bind:self':dTAG.slice(2)
    }
    else Vnode.props['$$bind:self']=dTAG.slice(2);
    Vnode.prototype_=Build;
    Vnode.GeneticProvider=Build;
  }
  function finishTagLoader(tagName, setup, NodeList, self, config, tagMatch){
    let { loaderList, trackNodes, child_src } = setup;
    let activeObj=loaderList[0][1];
    activeObj.rawChildren=child_src || "";
    if(isPlainTextChildrenTagElements(tagName)) activeObj.children=child_src;
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
    createDynamicPropLoader(self, activeObj, config);
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
        child_src=child_src+tagMatch.slice(0, -1);
      }else{
        isComment=true;
        loaderList.push(['comment', vnode]);
      }
    }
    tagMatch=isOpeningCommentTag(tagMatch) ? tagMatch.slice(0, -1) : tagMatch;
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
    if(!isHouxitBuild(self) || config.jsx) vnode.is_hyperscript=true;
    if(!is_hyperscript && isHouxitBuild(self)) vnode.props=normalize_Props_State(vnode, self);
    if(hasOwn(vnode.props, 'key')){
      vnode.key=vnode.props.key;
      delete vnode.props.key;
    }
    if(attrs && isBlockTag(tagName)){
      if(!hasOwn(vnode.props, 'exp')  || len(vnode.props) > 1 ) vnode.props={
        exp:attrs
      }
      vnode.props.exp=escapeReverseDecoder(vnode.props.exp || "");
    }
    if(len(vnode.props) < 1) vnode.props = null;
    const isSelfClosed= selfClosed?.trim() == "/";
    if( !(len(loaderList)) && ((isBlockTag(tagName) && isBuiltinVoidBlocks(getBlockTagName(tagName))) || (IS_HTML_VOID_TAG(tagName) || isSelfClosed))){
      vnode.children=null;
      vnode.rawChildren=null
      compelToResolveTagname(self, vnode, config);
      createDynamicPropLoader(self, vnode, config);
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
      return `<${ClosingTag==="/" ? "/" : "" }::@_(${name})_ ${ ClosingTag==="@" ? "exp="+'"'+escapeDecoder(value)+'"' : "" } ${selfClosed ? "/" : ""}>`;
    }).replace(commentRegex, (match, path, r)=> /<!--/.test(match) ? "<!-->" : /-->/.test(match) ? "</-->" : match );
  }
  function __HouxitHTMLParser__(source, NodeList=[], config={}, self){
    if(!isString(source) && !source.trim()) return !isArray(NodeList) ? [] : NodeList;
    assign(config, {
      deep:true,
      trim:true
    });
    source=parserSourceInitializer(source, self);
    let tag_matches=source.match(openingTagsRegex);
    let child_src="";
    let skipComment=false;
    let loaderList=[];
    let trackNodes=[];
    let isComment=false;
    NodeList = NodeList || [];
    for(let [ index, tagMatch ] of tag_matches.entries()){
      if(config.trim && !(len(loaderList) && isPlainTextChildrenTagElements(loaderList[0][0]) )){ 
        tagMatch = tagMatch.trim();
        if(tagMatch == "") continue;
      }else if(!config.trim && !(len(loaderList) && isPlainTextChildrenTagElements(loaderList[0][0]) )) tagMatch=tagMatch.trim();
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
            if(isHtmlComment(comment)) comment.content=child_src+tagMatch.slice(2);
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
            let mIndex=trackNodes.findLastIndex((f)=> f== tagName);
            if(mIndex > -1) trackNodes.splice(mIndex, 1);
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
        let useObjChild=undefined;
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
        NodeList.push(comment);
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
  function specializedTemplateProductionProcessor(self, attributes, node, metrics, config ){
    let [ hx_Element, NodeList , tagName, fall ]=metrics;
    let Vnode;
    if(config.if_Block && !config.props?.status) return
    if(isHouxitBuild(self)){
      negotiateRawDirective(self, node);
      if(!IS_VALID_TAGNAME(tagName) && config.slotBindings && !node.is_hyperscript) hx_Element.VNodeManager.slotBindings=config.slotBindings;
      const createElement=()=>createHouxitElement(node, self, false, assign({}, hx_Element?.LabContext), NodeList, assign({}, fall),  hx_Element );
      Vnode=createElement();
      Vnode.compiler_options.createElement=createElement;
    }else{
      let children=null;
      if(node.children){
        children = isPlainTextChildrenTagElements(tagName) ? node.children : _HouxitTemplateParser(node.rawChildren, null, true, null, null, );
      }
      Vnode=defineVNode({
        type:tagName, 
        props:len(attributes) ? attributes : null,
        children
      });
    }
    NodeList.add(Vnode)
  }
  const validAttrNameRegex= /[\w\$]+/;
  function transcript_to_VNodeClass(){
    
  }
  function templateElementNodeCompiler(self, vNode, hx_Element, config, NodeList, fall){
    let { type:tagName, props, children, rawChildren, key } = vNode;
    let attributes=props;
    let context=smartDextCtxMerging(hx_Element?.LabContext || {}, fall);
    vNode.hx_Element=hx_Element;
    vNode.ctx=context;
    const args=()=> [ hx_Element, NodeList, tagName, context, fall ];
    if(isString(tagName) && isBlockTag(tagName)) {
      if(!isHouxitBuild(self)) {
        $debug_log(`block tags Cannot be used in build/static templates mode`, self, true);
      }else blockElementsPreProcessors(self, vNode, args(), config );
    }else specializedTemplateProductionProcessor(self, attributes, vNode,
    args(), config);
  }
  function templateTextNodeCompiler(self, node, hx_Element, config,  NodeList, fall){
    if(node){
      let LabContext;
      if(len(config.ctx)) fall=smartDextCtxMerging(fall||{}, config.ctx||{})
      if(fall) {
        LabContext=smartDextCtxMerging(hx_Element?.LabContext || {} , fall );
        if(hx_Element) {
          hx_Element.LabContext=LabContext
          LabContext=null
        }
      }
      let value = node;
      node=self ? new HouxitTextElement(value, self, hx_Element, LabContext) : value;
      NodeList.add(node);
    }
  }
  function generateTemplateClasses(self, parser, hx_Element, config, NodeList, fall ){
    fall=assign({}, fall);
    for (let [ index, node ] of parser.entries()){
      if(node){
        if(isString(node) && node.trim()) templateTextNodeCompiler(self, node, hx_Element, config,  NodeList, fall);
        else if(isHtmlComment(node))/*Ignore comment nodes*/pass;
        else if(isVNodeClass(node)) templateElementNodeCompiler(self, node, hx_Element, config, NodeList, fall );
        else if(isTemplateClass(node)){
          const childNodes=node[TemplateClassKey](self, null, hx_Element, fall, config);
          NodeList[isArray(childNodes) ? 'extend' : 'add' ](childNodes);
        }
      }
    }
  }
  function _HouxitTemplateParser(html, self, parent, hx_Element, fall, config={}){
    if(!html && !validateType(html, [String, Array, Object])) return null;
    const isRerender=self[$$$operands]?.initializedRender;
    const templateRender= isString(html) ? __HouxitHTMLParser__(html, [], {
      trim:true,
      is_hyperscript:isHouxitBuild(self) && config.is_hyperscript
    }, self) : isObject(html) ? [ html ] : isArray(html) ? html : [] ;
    if(config.official && !self[$$$compiler].StarterTemplate) self[$$$compiler].StarterTemplate=templateRender;
    const NodeList=new Tuple();
    generateTemplateClasses(self, templateRender, hx_Element, config, NodeList, fall);
    return len(NodeList) > 1 ? NodeList.list() : len(NodeList) === 1 ? NodeList.shift() : null ;
  }
  function controlBuiltInBlocks(self, node, blockN,  metrics, config){
    const [ hx_Element, NodeList, tagName, context, fall ] = metrics ;
    const args=()=>[ self, node, blockN, metrics ];
    const children=node.children;
    const exp=node.props.exp;
    let template=[];
    let subscribers=[];
    let data;
    const ctx=[children, exp ]
    if(blockN === 'if') template = blockIFPreprocessor(...args(), ctx);
    else if(blockN === 'else' || blockN === "else:if") blockElseIfPreprocessor(self, node, config, blockN);
    else if(blockN === 'for') template = blockForProcessor(...args(), ctx);
    else if(blockN === 'const') blockConstPreprocessor(...args(), ctx, config);
    else if(blockN === 'class') blockClassTransformer(...args(), ctx);
    else if(blockN === 'new') template=blockNewRenderProcessor(...args(), ctx);
    else if(blockN === 'html') template = blockHtmlEmbedder(...args(), ctx, config);
    else if(blockN === 'debugger') blockInstallDebugger(self, node, blockN,  metrics , [children, exp], config);
    return !isArray(template) ? (validateType(template, [Set, Tuple]) ? [...arrSet(template)] : [template] ) : template ;
  }
  function blockInstallDebugger(self, node, blockN,  metrics , [children, exp], config){
    const [ hx_Element, NodeList, tagName, context, fall ] = metrics;
  }
  function blockHtmlEmbedder(self, node, blockN,  metrics , [children, exp], config){
    const [ hx_Element, NodeList, tagName, context, fall ] = metrics;
    let [ subscribers, value ] = effectDependencyTracking(self, ()=>{
      return _$runModelBind(self, exists(exp.trim()) ? exp : "undefined", hx_Element);
    });
    value=scaffold(value);
    
    return [  ]
  }
  function blockClassTransformer(self, node, blockN,  metrics , [children, exp], config){
    const [ hx_Element, NodeList, tagName, context, fall ] = metrics
    if(!variableDeclarationRegex.test(exp)){
      $debug_log(`template "@class" block declaration failure \n\ndoes not meet required name and args syntax`, self, true);
      return;
    }
    let [ match, var_name, var_params]= exp.match(variableDeclarationRegex);
    let validator;
    if(var_params) validator=var_params.match(templateClassVslidatorRegex);
    if(validator){
      var_params=var_params.slice(len(validator[0]));
      validator=validator[1];
      validator=_$runModelBind(self, validator, hx_Element);
      if(!isPFunction(validator)){
        $debug_log(`@class: template "@class" block validator prop expects a plain function callback reference`, self, true);
        return;
      }
    }
    if(var_params){
      var_params=var_params.trim();
      if(!(var_params.startsWith("(") && var_params.endsWith(")"))){
        $debug_log(`${var_name}: arguments of template class "${var_name}" does not meet required syntax\nmissing parenthesis in arguments enclosure  "(" and ")"`, self, true);
        return;
      }
    }
    var_name = var_name || match;
    if(!isValidIdentifier(var_name)){
      $debug_log(`template "@class" block name "${var_name}" is not a JavaScript valid identifier`, self, true);
      return;
    }
    function templateKlassGenerator(...props){
      const isValid= validator ? validator([...props]) : true;
      if(!isBoolean(isValid)){
        $debug_log(`TemplateClass validator expects a Boolean return value\nvalidation proceses failed`, self, true);
        return false
      }else if(!isValid){
        $debug_log(`validation method for template class "${var_name}" failed\nreturns falsy in its props validation check`, self, true);
        return false;
      }
      return true;
    };
    if(var_params) var_params=var_params.slice(1).slice(0, -1);
    const parameters=separateArgsLiterals(var_params);
    class TemplateClass extends BaseTemplateClass{
      constructor(...args){
        super(()=>children);
        const validator = templateKlassGenerator(...args);
        if(!validator) return []
        this[TemplateClassKey]=function factory(){
          const ssc=smartDextCtxMerging(fall, {
            [$$dexTransformKey]:{
              syntaxArray:[...parameters],
              sourcesArray:[...args]
            }
          });
          return _HouxitTemplateParser(memMove(children, true), self, null, hx_Element, ssc, config );
        }
      }
    }
    if(!hasOwn(self.__public_model__, var_name)) define(self.__public_model__, var_name, {
      value:TemplateClass,
      enumerable
    });
    return [];
  }
  function createCatacombs(setup, val, char){
    const rChar=char === "{" ? "}" : "]";
    if(val===char) {
      if(setup.open && setup.type === char) setup.openCurlies++;
      else if(!setup.open){
        setup.open=true;
        setup.type=char;
      }
      setup.single.push(val);
    }else if(val===rChar){ 
      if(setup.type === char && setup.openCurlies && setup.open) {
        setup.openCurlies--;
        setup.single.push(val);
      }else if(setup.type===char && setup.open && !setup.openCurlies){
        setup.single.push(val);
        setup.record.push(setup.single.join("").trim());
        setup.single=[];
        setup.open=false;
        setup.type=null;
      }else if(setup.open && setup.type !== char) setup.single.push(val);
    }
  }
  function separateArgsLiterals(syntax){
    const setup={
      record:[],
      single:[],
      open:false,
      openCurlies:0,
      type:undefined,
      next:undefined,
      concat:undefined
    }
    const isStrRegex=val=>/['"`]+/.test(val);
    let i=0;
    for(const val of values(syntax)){
      i++;
      setup.next=syntax[i];
      if(setup.open && isStrRegex(val) && !setup.concat) {
        setup.concat=val;
        single.push(val)
      }else if(isStrRegex(val) && val === setup.concat){ 
        setup.concat=null;
        single.push(val);
      }else if(val==="{" || val==="}" && !setup.concat) createCatacombs(setup, val, "{");
      else if(val===',' || /\s/.test(val)){
        if(setup.concat);
        else if(!setup.open) continue;
        else setup.single.push(val);
      }else if(val === "[" || val==="]" && !setup.concat) createCatacombs(setup, val, "[");
      else{
        if(!setup.open){
          setup.open=true;
          setup.single.push(val);
        }else if(setup.open && !setup.type && (setup.next==="," || /\s/.test(setup.next) || isUndefined(setup.next))){
          setup.open=false;
          setup.single.push(val);
          setup.record.push(setup.single.join("").trim());
          setup.single=[];
        }else if(setup.open) setup.single.push(val);
      }
    }
    return setup.record;
  }
  function blockNewRenderProcessor(self, node, blockN,  metrics , [children, exp], config){
    const [ hx_Element, NodeList, tagName, context, fall ] = metrics
    const name=abstractFilterName(exp.trim());
    const hasArg=len(name) < len(exp.trim());
    let args=hasArg ? ArgsExtractor(exp, name).content : undefined;
    args= args ? _$runModelBind(self, '['+args+']', hx_Element || fall) : [];
    const templateKlass=_$runModelBind(self, name, hx_Element);
    const deb=()=>$debug_log(`"${name}" reference is not a valid TemplateClass instance`, self, true);
    if(!isClass(templateKlass) ){
      deb();
      return [];
    }
    let template=new templateKlass(...args);
    if(!isTemplateClass(template) ){
      deb();
      return [];
    }
    template=template[TemplateClassKey](self, null, hx_Element, fall, config);
    return !isArray(template) ? [ template ] : template;
  }
  function blockConstPreprocessor(self, node, blockN,  metrics , [children, exp], config){
    const [ hx_Element, NodeList, tagName, context, fall ] = metrics ;
    if(exp.trim() && !variableDeclarationRegex.test(exp)){
      $debug_log(`"${exp}" statement is not recognised or not a valid statement or expression`, self);
      return [];
    }else if(!exp.trim()) return [];
    let [ match, variable, expression ] = exp.match(variableDeclarationRegex);
    variable=variable.trim();
    if(!isDestructureSyntax(variable) && !isValidIdentifier(variable)){
      $debug_log(`"${variable}" is an invalid identifier`, self);
      return []
    }
    const data = _$runModelBind(self, expression?.trim(), hx_Element || context );
    if(isDestructureSyntax(variable)){
      if(isFalse(destructWarn(variable, data, self))){
        return []
      }
      smartDextCtxMerging(fall, {
        [$$dexTransformKey]:{
          sourcesArray:[data],
          syntaxArray:[variable]
        }
      }, true);
    }else if(!hasOwn(context, variable)) fall[variable]=data;
    else if(hasOwn(context, variable)){
      $debug_log(`"${variable}" const block namespace already declared\nor instance cannot be re-declared/re-assigned`, self);
    }
  }
  function blockForProcessor(self, node, blockN, metrics , [children, exp]){
    const [ hx_Element, NodeList, tagName, context, fall ] = metrics ;
    let Loop_Data=For_Loop(self, exp, hx_Element, true);
    let template = [];
    if(!isIterable(Loop_Data.obj) && !isNumber(Loop_Data.obj)){
      $debug_log(`${getType(Loop_Data.obj)} value passed to the if block is not an iterable object`, self, true);
      return template;
    }
    function factoryRender(option, config){
      return _HouxitTemplateParser(children, self, true, hx_Element, option, config);
    }
    iterate(unwrap(Loop_Data.obj), Loop_Data.loopType).each((value, key, index)=>{
      const options=assign(fall||{}, {});
      const config={};
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
  function blockIFPreprocessor(self, node, blockN,  metrics, [rawChildren, exp]){
    const [ hx_Element, NodeList, tagName, context, fall ] = metrics ;
    const children=node.children || [];
    const [ subscribers, data ]=effectDependencyTracking(self, ()=>{
      return _$runModelBind(self, exists(exp.trim()) ? exp : "undefined", hx_Element);
    });
    let template = []
    const condition = unwrap(data) ? true : false;
    const config={
      if_Block:true,
      props:{
        status:condition,
        prevBlock:"@if",
        activeBlock:"@if",
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
    const [ hx_Element, tagName, context, fall ] = metrics ;
    const blockN=!isString(vNode) ? ( isBlockTag(vNode.type) ? getBlockTagName(vNode.type) : vNode.type) : vNode;
    if(isString(vNode)){
      if(!config.props.status) return true;
      const node=new HouxitTextElement(vNode, self);
      NodeList.add(node);
      return true;
    }else if( blockN === 'else:if'){
      if(!conditionTagOrderCheck(self, config, 'else:if')) return false;
      if(!config.props.shouldContinue) return false;
      const [ subscribers, data ]=effectDependencyTracking(self, ()=>{
        return _$runModelBind(self, exists(exp.trim()) ? exp : "undefined", hx_Element);
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
    const vNodes=_HouxitTemplateParser(vNode, self, true, hx_Element, fall, config);
    iterate(!isArray(vNode) ? [ vNodes ] : vNodes).each((node)=> NodeList.add(node));
    return true;
  }
  function conditionTagOrderCheck(self, config, tag){
    const prev=config.keywordLists[len(config.keywordLists)-1];
    if(prev === 'else' && (tag === 'else' || tag === 'else:if')){
      $debug_log(`An "@else" block already existing\n\nUnresolved Error:: cannot precced with the "@${tag}" block`, self, true);
      return false;
    }
    config.keywordLists.push(tag);
    return true;
  }
  function blockElseIfPreprocessor(self, node, config, blockN){
    $debug_log(`The "@${blockN}" block cannot be used outside of the "@if" template block scope`, self, true);
    return;
  }
  function instance_Has_Block(self, name ){
    name = name.startsWith("@") ? name.slice(1) : name;
    return _makeMap_(self[$$$register]?.blocks || {}, name ) ;
  }
  const normalize_Block=(self, name)=>{
    name = name.startsWith("@") ? name.slice(1) : name;
    return _makeMap_(self[$$$register].blocks, name) ? self[$$$register].blocks[name]: null;
  }
  function blockElementsPreProcessors(self, vNode,  metrics, config){
    let children = vNode.children;
    const [ hx_Element, NodeList, tagName, context, fall ] = metrics ;
    const blockN=getBlockTagName(tagName);
    let renderedNodes=[];
    if(isBuiltinBlocks(blockN)) {
      renderedNodes = controlBuiltInBlocks(self, vNode, blockN, metrics, config)
    }else if(instance_Has_Block(self, blockN)){
      renderedNodes=customBlocksTraverse(self, vNode, blockN, metrics);
    }else{
      $debug_log(`((Block Resolver Error))\n\n"@${blockN}" block is not a registered block element`, self, true);
      return;
    }
    for(const [ index, vnode ] of (!isArray(renderedNodes) ? (validateType(renderedNodes, [Set, Tuple]) ? [...arrSet(renderedNodes)] : [renderedNodes] ) : renderedNodes).entries()){
      if(vnode) NodeList.add(vnode);
    }
  }
  function customBlocksTraverse(self, node, blockN,  metrics){
    let [ hx_Element, NodeList, tagName, context, fall ] = metrics ;
    const children=node.rawChildren;
    const [ subscribers, data ]=effectDependencyTracking(self, ()=>{
      return _$runModelBind(self, node.props.exp, hx_Element);
    });
    function factoryRender(ctx={}){
      if(!isPObject(ctx)){
        $debug_log(`context data passed to factoryRender expects a plain object`, self);
      }
      fall=smartDextCtxMerging(fall||{}, ctx);
      return _HouxitTemplateParser(children, self, true, hx_Element, fall);
    }
    const template = factoryRender()
    const block=normalize_Block(self, blockN );
    const blockCalllback=isObject(block) ? block.block : block
    const response=blockCalllback.call(self.__public_model__, !template ? [] : !isArray(template) ? (validateType(template, [Set, Tuple]) ? [...arrSet(template)] : [template] ) : template, data, factoryRender )
    return !response ? [] : !isArray(response) ? (validateType(response, [Set, Tuple]) ? [...arrSet(response)] : [response] ) : response
  }
  function createKlassBoilerPlate(callback, ...args){
    return function factory(self, parent, hx_Element, fall, config){
      const boilerPlate=callback(...args);
      return _HouxitTemplateParser( boilerPlate, self, parent, hx_Element, fall, config={});
    }
  }
  function __createTemplateClass_Parser(fn, name){
    if(!validateCollectionArgs(arguments, {
      min:1,
      max:2,
      validators:[Function, String],
      required:[true],
      name:"createTemplateClass"
    })) return pass;
    return class TemplateClass extends BaseTemplateClass{
      constructor(...args){
        super(fn);
        this[TemplateClassKey]=createKlassBoilerPlate(fn, ...args);
      }
    }
  }
  function createTemplateClass(klass, name){
    return __createTemplateClass_Parser(...arguments);
  }
  class TemplateClass extends BaseTemplateClass{
    constructor(...args){
      super();
      this[TemplateClassKey]=createKlassBoilerPlate(this.class, ...args)
    }
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
    return __EncodeJSXParser__(strings, values);
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
  function MKDParser(mkd){
    
  }
  function markdown(mkd, ...values){
    if(!isString(mkd)){
      $debug_log(`markdown helper expects strings values`);
      return null
    }
  }
  function createCustomElement(options){
    return _createCustomElement.call({}, ...arguments);
  }
  class CustomNativeElement extends HTMLElement{
    constructor(){
      super();
    }
    compiler_options={}
    _set_compiler_options(...compiler_options){
      this.compiler_options=compiler_options;
      return ;
    }
  }
  function generateCustomElementConstructor(name){
    name = ToPascalCase(name);
    if(!isValidIdentifier(name)){
      $debug_log(`unable to parse the customElements tag name\n\n
      seems to have been an invalid identifier`);
      return;
    }
    return Function('CustomNativeElement', `
      return class ${name} extends CustomNativeElement{
        constructor(){
          super(...arguments);
        }
      }
    `)(CustomNativeElement);
  }
  function _createCustomElement(opts){
    this.is_Custom_Node=true;
    const response=validateCollectionArgs(arguments, {
      count:1,
      validators:[[Function,Object]],
      name:"createCustomElement"
    });
    if(!response) return
    const LifeCycleHooksList="onConnected,onDisconnected,onAdopted,onAttrChanged,plugin";
    const isMNEOwnOptions=opt=>_makeMap_(LifeCycleHooksList, opt);
    let Hooks={};
    const widget = defineWidget(opts)
    entries(widget).forEach(([ind, value])=>{
      if(_makeMap_(LifeCycleHooksList, ind)){
        if(!isFunction(value)){
          $debug_log(`LifeCycle callback error\n\n"${ind}" is a callback function, received an invalid type`);
          return;
        }
        if('onConnected' === ind) Hooks['connectedCallback']=value;
        if('onDisconnected' === ind) Hooks['disConnectedCallback']=value;
        if('onAdopted' === ind) Hooks['adoptedCallback']=value;
        if('onAttrChanged' === ind) Hooks['attributeChangedCallback']=value;
        delete opts[ind];
      } 
    })
    CustomNativeElement.prototype.disConnectedCallback=Hooks.disConnectedCallback || pass;
    CustomNativeElement.prototype.adoptedCallback=Hooks.adoptedCallback || pass;
    CustomNativeElement.prototype.attributeChangedCallback=Hooks.attributeChangedCallback || pass;
    CustomNativeElement.prototype.connectedCallback=connectedCallback;
    function connectedCallback(){
      let props={};
      if(len(keys(this.attributes))){
        for( const [key, attr ] of entries(this.attributes)) {
          const { name, value } = attr;
          props[name]=value
        }
      }
      // _set_compiler_options
      let [ vnode, self, hx_Element, siblings, IS_RENDERLESS, customElementsArgs ] = this.compiler_options;
      const shadow=this.attachShadow({ mode: 'open'});
      vnode=h(opts, assign(props, vnode.props|| {}), vnode.children);
      customElementsArgs.unshift();
      const createElement=()=> $compilerEngine(null, vnode, null, {}).build;
      const template=createElement();
      shadow.appendChild(template.$element);
      const user_defined_callback=Hooks.connectedCallback || pass
      user_defined_callback.call(this, ...arguments);
    }
    CustomNativeElement.define=function define(name, inherit){
      return __define.call(this, ...arguments);
    }
    function __define(name, inherit){
      if(!validateCollectionArgs(arguments, {
        name:"customElements.define()",
        min:1,
        max:2,
        validators:[String, String]
      })) return;
      if(!isString(name) && isEmptyStr(name) && IS_VALID_TAGNAME(name)){
        $debug_log('Name positional argument passed to define is not a string or a valid name value\n\n or may have conflicted with native html/svg/mathml tags');
        return;
      }
      if(inherit && !isString(inherit) && !IS_HTML_TAG(inherit)){
        $debug_log(`problem with the inherit value, \n\n may not be a string value or a valid HTML tagName`);
        $debug_log(`CustomElement registration failed`);
        return;
      }
      const CustomElementsInstance=generateCustomElementConstructor(name);
      if(inBrowserCompiler) customElements.define(name, CustomElementsInstance, inherit ? { 
        extends:inherit
      } : {});
      return CustomElementsInstance;
    }
    return CustomNativeElement;
  };
  function setAsyncSettings(opts){
    
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
      $debug_log(`widget transform Error\n\n 
        invalid widget instance\n/... at /././. at`);
      return;
    }else if(len(arguments) > 2){
      $debug_log(`Parameter Error\n\nmax-2 argument required\n ${len(arguments)} given`);
      return;
    }else if(isPObject(opts) || isFunction(opts)){
      if(isAFunction(opts) && null) $warn(`Houxit style guides recommend against the use of Arrow functions as widget build instances.\n\n
      "<${opts.name}>" widget is an Arrow functions widget type`);
      const type=hydrate_widget_type(opts);
      let widget= new Object();
      if(isPFunction(opts)) widget.build=opts;
      else if(isPObject(opts)){
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
  function hydrate_widget_type(opts){
    let type=isClass(opts) ? 'class-based' : isPFunction(opts) ? 'function-based' : 'object-based' ;
    return type;
  }
  function initialBuildTransform(options, propsOrChildren, childrenOrProps ){
    if(isVNodeClass(options)) {
      propsOrChildren = options.props;
      childrenOrProps = options.children;
      options = options.type;
    }
    if(!validHouxitWidget(options)){
      $debug_log(`initBuild Error\n\nCannot compile value as a Houxit widget\nMaybe an invalid houxit widget value`);
      return  ;
    }else if(isBuiltinWidget(options)){
      const name = ToPascalCase(options[$$BuiltinWidgetKey].slice(3))
      $debug_log(`The built-in "${name}" widget cannot be used in an initBuild widget App`);
      return ;
    }
    const widget = createVNodeClass(...values(propsAndChildrenGetter( ...arguments )));
    widget[initBuildInstaceKey]=true;
    return widget;
  }
  function _initBuild(options, props, children){
    const widget = initialBuildTransform(...arguments);
    if(!isVNodeClass(widget)) return undefined;
    return new HouxitBuild( widget );
  }
  function initBuild(options, propsOrChildren, childrenOrProps){
    return _initBuild(...arguments);
  }
  function createSSRStreamHack(vnodePlate, ssrConfig){
    const [ options, props = {} , children = [] ] = [ ...vnodePlate ];
    return vnodePlate;
  }
  function renderToString(build, config){
    
  }
  function renderToStreamPipe(){
    
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
      if(!_makeMap_(optionsName, name)) {
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
  const RENDER_ELEMENTS = createObj('RENDER_ELEMENTS');
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
    define(RENDER_ELEMENTS, name, {
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
  function resolveHooks(xhr, opts){
  
  }
  transform_Elements_build();
  _$compiler_engine_hydrator();

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
  global._makeMap_ = _makeMap_ ;
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
  global.Build = Build ;
  global.Self = Self ;
  global.asyncWidget = asyncWidget ;
  global.preUpdate = preUpdate ;
  global.shallowReadonlyStream = shallowReadonlyStream ;
  global.isShallowToken = isShallowToken ;
  global.useTokenRef = useTokenRef ;
  global.Motion = Motion ;
  global.HTMLParser = HTMLParser ;
  global.Provider = Provider ;
  global.postMount = postMount ;
  global.postBuild = postBuild ;
  global.useReceiver = useReceiver ;
  global.unToken = unToken ;
  global.onSlotRender = onSlotRender;
  global.onSlotEffect = onSlotEffect;
  global.useTransmit = useTransmit ;
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
  global.MKDParser = MKDParser ;
  global.validateType = validateType ;
  global.Any = Any ;
  global.Arguments = Arguments ;
  global.mergeProps = mergeProps ;
  global._getNodeListResponse = _getNodeListResponse ;
  global.deferTick = deferTick ;
  global.generateUUID = generateUUID ;
  global.boilerPlate = boilerPlate ;
  global.Type = Type ;
  global.defineWidget = defineWidget ;
  global.isShallowStream = isShallowStream ;
  global.onCatch = onCatch ;
  global.onEffect = onEffect ;
  global.onTracked = onTracked ;
  global.html = html ;
  global.Class = Class ;
  global.deferWatch = deferWatch ;
  global.readonlyToken = readonlyToken ;
  global.escapeDecoder = escapeDecoder ;
  global.useDirs = useDirs ;
  global.resolve = resolve ;
  global.observe = observe ;
  global.effectHook = effectHook ;
  global.$$ = $$ ;
  global.generateTemplateElement = generateTemplateElement ;
  global.memMove = memMove ;
  global.useOptions = useOptions ;
  global.useSignals = useSignals ;
  global.Widget = Widget ;
  global.len = len ;
  global.markRaw = markRaw ;
  global.isRaw = isRaw ;
  global.validateProps = validateProps ;
  global.toReadonlyToken = toReadonlyToken ;
  global.toShallowToken = toShallowToken ;
  global.fromReadonlyToken = fromReadonlyToken ;
  global.validateCollection = validateCollection ;
  global.isStream = isStream ;
  global.useReadonlyBypasser = useReadonlyBypasser ;
  global._EvalWith = _EvalWith ;
  global.stream = stream ;
  global.token = token ;
  global.createNativeElement = createNativeElement ;
  global.Request = Request ;
  global.computedToken = computedToken ;
  global.read = read ;
  global.factoryToken = factoryToken ;
  global.isNativeElement = isNativeElement ;
  global.createWidgetElement = createWidgetElement ;
  global.tokenGENERATOR = tokenGENERATOR ;
  global.RENDER_ELEMENTS = RENDER_ELEMENTS ;
  global.mountEffect = mountEffect ;
  global.toToken = toToken ;
  global.to_kebab_case = to_kebab_case ;
  global.Token = Token ;
  global.ToPascalCase = ToPascalCase ;
  global.toCamelCase = toCamelCase ;
  global.createTextElement = createTextElement ;
  global.renderToString = renderToString ;
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
  global.TemplateClass = TemplateClass ;
  global.createTemplateClass = createTemplateClass ;
  global.isReadonlyStream = isReadonlyStream ;
  global.isStateStream = isStateStream ;
  global.isComputedToken = isComputedToken ;
  global.useAgent = useAgent ;
  console.info( devInfo ) ; //dev
  return global ;
} )( ( { } ) ) ;
