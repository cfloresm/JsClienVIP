/* PluginDetect v0.7.6 by Eric Gerds www.pinlady.net/PluginDetect [ onWindowLoaded isMinVersion getVersion onDetectionDone Java(OTF & NOTF) QT DevalVR Shockwave Flash WMP Silverlight VLC AdobeReader PDFreader(OTF & NOTF) RealPlayer ] */var PluginDetect={version:"0.7.6",name:"PluginDetect",handler:function(c,b,a){return function(){c(b,a)}},isDefined:function(b){return typeof b!="undefined"},isArray:function(b){return(/array/i).test(Object.prototype.toString.call(b))},isFunc:function(b){return typeof b=="function"},isString:function(b){return typeof b=="string"},isNum:function(b){return typeof b=="number"},isStrNum:function(b){return(typeof b=="string"&&(/\d/).test(b))},getNumRegx:/[\d][\d\.\_,-]*/,splitNumRegx:/[\.\_,-]/g,getNum:function(b,c){var d=this,a=d.isStrNum(b)?(d.isDefined(c)?new RegExp(c):d.getNumRegx).exec(b):null;return a?a[0]:null},compareNums:function(h,f,d){var e=this,c,b,a,g=parseInt;if(e.isStrNum(h)&&e.isStrNum(f)){if(e.isDefined(d)&&d.compareNums){return d.compareNums(h,f)}c=h.split(e.splitNumRegx);b=f.split(e.splitNumRegx);for(a=0;a<Math.min(c.length,b.length);a++){if(g(c[a],10)>g(b[a],10)){return 1}if(g(c[a],10)<g(b[a],10)){return -1}}}return 0},formatNum:function(b,c){var d=this,a,e;if(!d.isStrNum(b)){return null}if(!d.isNum(c)){c=4}c--;e=b.replace(/\s/g,"").split(d.splitNumRegx).concat(["0","0","0","0"]);for(a=0;a<4;a++){if(/^(0+)(.+)$/.test(e[a])){e[a]=RegExp.$2}if(a>c||!(/\d/).test(e[a])){e[a]="0"}}return e.slice(0,4).join(",")},$$hasMimeType:function(a){return function(d){if(!a.isIE&&d){var c,b,e,f=a.isString(d)?[d]:d;if(!f||!f.length){return null}for(e=0;e<f.length;e++){if(/[^\s]/.test(f[e])&&(c=navigator.mimeTypes[f[e]])&&(b=c.enabledPlugin)&&(b.name||b.description)){return c}}}return null}},findNavPlugin:function(l,e,c){var j=this,h=new RegExp(l,"i"),d=(!j.isDefined(e)||e)?/\d/:0,k=c?new RegExp(c,"i"):0,a=navigator.plugins,g="",f,b,m;for(f=0;f<a.length;f++){m=a[f].description||g;b=a[f].name||g;if((h.test(m)&&(!d||d.test(RegExp.leftContext+RegExp.rightContext)))||(h.test(b)&&(!d||d.test(RegExp.leftContext+RegExp.rightContext)))){if(!k||!(k.test(m)||k.test(b))){return a[f]}}}return null},getMimeEnabledPlugin:function(k,m,c){var e=this,f,b=new RegExp(m,"i"),h="",g=c?new RegExp(c,"i"):0,a,l,d,j=e.isString(k)?[k]:k;for(d=0;d<j.length;d++){if((f=e.hasMimeType(j[d]))&&(f=f.enabledPlugin)){l=f.description||h;a=f.name||h;if(b.test(l)||b.test(a)){if(!g||!(g.test(l)||g.test(a))){return f}}}}return 0},getPluginFileVersion:function(f,b){var h=this,e,d,g,a,c=-1;if(h.OS>2||!f||!f.version||!(e=h.getNum(f.version))){return b}if(!b){return e}e=h.formatNum(e);b=h.formatNum(b);d=b.split(h.splitNumRegx);g=e.split(h.splitNumRegx);for(a=0;a<d.length;a++){if(c>-1&&a>c&&d[a]!="0"){return b}if(g[a]!=d[a]){if(c==-1){c=a}if(d[a]!="0"){return b}}}return e},AXO:window.ActiveXObject,getAXO:function(a){var f=null,d,b=this,c={};try{f=new b.AXO(a)}catch(d){}return f},convertFuncs:function(g){var a,h,f,b=/^[\$][\$]/,d={},c=this;for(a in g){if(b.test(a)){d[a]=1}}for(a in d){try{h=a.slice(2);if(h.length>0&&!g[h]){g[h]=g[a](g);delete g[a]}}catch(f){}}},initScript:function(){var c=this,a=navigator,e="/",i=a.userAgent||"",g=a.vendor||"",b=a.platform||"",h=a.product||"";if(c.file){c.file.$=c}if(c.verify){c.verify.$=c};c.OS=100;if(b){var f,d=["Win",1,"Mac",2,"Linux",3,"FreeBSD",4,"iPhone",21.1,"iPod",21.2,"iPad",21.3,"Win.*CE",22.1,"Win.*Mobile",22.2,"Pocket\\s*PC",22.3,"",100];for(f=d.length-2;f>=0;f=f-2){if(d[f]&&new RegExp(d[f],"i").test(b)){c.OS=d[f+1];break}}}c.convertFuncs(c);c.isIE=new Function("return "+e+"*@cc_on!@*"+e+"false")();c.verIE=c.isIE&&(/MSIE\s*(\d+\.?\d*)/i).test(i)?parseFloat(RegExp.$1,10):null;c.ActiveXEnabled=false;if(c.isIE){var f,j=["Msxml2.XMLHTTP","Msxml2.DOMDocument","Microsoft.XMLDOM","ShockwaveFlash.ShockwaveFlash","TDCCtl.TDCCtl","Shell.UIHelper","Scripting.Dictionary","wmplayer.ocx"];for(f=0;f<j.length;f++){if(c.getAXO(j[f])){c.ActiveXEnabled=true;break}}c.head=c.isDefined(document.getElementsByTagName)?document.getElementsByTagName("head")[0]:null}c.isGecko=(/Gecko/i).test(h)&&(/Gecko\s*\/\s*\d/i).test(i);c.verGecko=c.isGecko?c.formatNum((/rv\s*\:\s*([\.\,\d]+)/i).test(i)?RegExp.$1:"0.9"):null;c.isSafari=(/Safari\s*\/\s*\d/i).test(i)&&(/Apple/i).test(g);c.isChrome=(/Chrome\s*\/\s*(\d[\d\.]*)/i).test(i);c.verChrome=c.isChrome?c.formatNum(RegExp.$1):null;c.isOpera=(/Opera\s*[\/]?\s*(\d+\.?\d*)/i).test(i);c.verOpera=c.isOpera&&((/Version\s*\/\s*(\d+\.?\d*)/i).test(i)||1)?parseFloat(RegExp.$1,10):null;c.addWinEvent("load",c.handler(c.runWLfuncs,c))},init:function(c){var b=this,a,c;if(!b.isString(c)){return -3}if(c.length==1){b.getVersionDelimiter=c;return -3}c=c.toLowerCase().replace(/\s/g,"");a=b[c];if(!a||!a.getVersion){return -3}b.plugin=a;if(!b.isDefined(a.installed)){a.installed=a.version=a.version0=a.getVersionDone=null;a.$=b;a.pluginName=c}b.garbage=false;if(b.isIE&&!b.ActiveXEnabled){if(a!==b.java){return -2}}return 1},fPush:function(b,a){var c=this;if(c.isArray(a)&&(c.isFunc(b)||(c.isArray(b)&&b.length>0&&c.isFunc(b[0])))){a.push(b)}},callArray:function(b){var c=this,a;if(c.isArray(b)){for(a=0;a<b.length;a++){if(b[a]===null){return}c.call(b[a]);b[a]=null}}},call:function(c){var b=this,a=b.isArray(c)?c.length:-1;if(a>0&&b.isFunc(c[0])){c[0](b,a>1?c[1]:0,a>2?c[2]:0,a>3?c[3]:0)}else{if(b.isFunc(c)){c(b)}}},$$isMinVersion:function(a){return function(h,g,d,c){var e=a.init(h),f,b=-1,j={};if(e<0){return e}f=a.plugin;g=a.formatNum(a.isNum(g)?g.toString():(a.isStrNum(g)?a.getNum(g):"0"));if(f.getVersionDone!=1){f.getVersion(g,d,c);if(f.getVersionDone===null){f.getVersionDone=1}}a.cleanup();if(f.installed!==null){b=f.installed<=0.5?f.installed:(f.installed==0.7?1:(f.version===null?0:(a.compareNums(f.version,g,f)>=0?1:-0.1)))};return b}},getVersionDelimiter:",",$$getVersion:function(a){return function(g,d,c){var e=a.init(g),f,b,h={};if(e<0){return null};f=a.plugin;if(f.getVersionDone!=1){f.getVersion(null,d,c);if(f.getVersionDone===null){f.getVersionDone=1}}a.cleanup();b=(f.version||f.version0);b=b?b.replace(a.splitNumRegx,a.getVersionDelimiter):b;return b}},cleanup:function(){var a=this;if(a.garbage&&a.isDefined(window.CollectGarbage)){window.CollectGarbage()}},isActiveXObject:function(f,b){var g=this,a=false,h,c="<",d=c+'object width="1" height="1" style="display:none" '+f.getCodeBaseVersion(b)+">"+f.HTML+c+"/object>";if(!g.head){return a}if(g.head.firstChild){g.head.insertBefore(document.createElement("object"),g.head.firstChild)}else{g.head.appendChild(document.createElement("object"))}g.head.firstChild.outerHTML=d;try{g.head.firstChild.classid=f.classID}catch(h){}try{if(g.head.firstChild.object){a=true}}catch(h){}try{if(a&&g.head.firstChild.readyState<4){g.garbage=true}}catch(h){}g.head.removeChild(g.head.firstChild);return a},codebaseSearch:function(f,b){var c=this;if(!c.ActiveXEnabled||!f){return null}if(f.BIfuncs&&f.BIfuncs.length&&f.BIfuncs[f.BIfuncs.length-1]!==null){c.callArray(f.BIfuncs)}var d,o=f.SEARCH,k={};if(c.isStrNum(b)){if(o.match&&o.min&&c.compareNums(b,o.min)<=0){return true}if(o.match&&o.max&&c.compareNums(b,o.max)>=0){return false}d=c.isActiveXObject(f,b);if(d&&(!o.min||c.compareNums(b,o.min)>0)){o.min=b}if(!d&&(!o.max||c.compareNums(b,o.max)<0)){o.max=b}return d};var e=[0,0,0,0],l=[].concat(o.digits),a=o.min?1:0,j,i,h,g,m,n=function(p,r){var q=[].concat(e);q[p]=r;return c.isActiveXObject(f,q.join(","))};if(o.max){g=o.max.split(c.splitNumRegx);for(j=0;j<g.length;j++){g[j]=parseInt(g[j],10)}if(g[0]<l[0]){l[0]=g[0]}}if(o.min){m=o.min.split(c.splitNumRegx);for(j=0;j<m.length;j++){m[j]=parseInt(m[j],10)}if(m[0]>e[0]){e[0]=m[0]}}if(m&&g){for(j=1;j<m.length;j++){if(m[j-1]!=g[j-1]){break}if(g[j]<l[j]){l[j]=g[j]}if(m[j]>e[j]){e[j]=m[j]}}}if(o.max){for(j=1;j<l.length;j++){if(g[j]>0&&l[j]==0&&l[j-1]<o.digits[j-1]){l[j-1]+=1;break}}};for(j=0;j<l.length;j++){h={};for(i=0;i<20;i++){if(l[j]-e[j]<1){break}d=Math.round((l[j]+e[j])/2);if(h["a"+d]){break}h["a"+d]=1;if(n(j,d)){e[j]=d;a=1}else{l[j]=d}}l[j]=e[j];if(!a&&n(j,e[j])){a=1};if(!a){break}};return a?e.join(","):null},addWinEvent:function(d,c){var e=this,a=window,b;if(e.isFunc(c)){if(a.addEventListener){a.addEventListener(d,c,false)}else{if(a.attachEvent){a.attachEvent("on"+d,c)}else{b=a["on"+d];a["on"+d]=e.winHandler(c,b)}}}},winHandler:function(d,c){return function(){d();if(typeof c=="function"){c()}}},WLfuncs0:[],WLfuncs:[],runWLfuncs:function(a){var b={};a.winLoaded=true;a.callArray(a.WLfuncs0);a.callArray(a.WLfuncs);if(a.onDoneEmptyDiv){a.onDoneEmptyDiv()}},winLoaded:false,$$onWindowLoaded:function(a){return function(b){if(a.winLoaded){a.call(b)}else{a.fPush(b,a.WLfuncs)}}},$$onDetectionDone:function(a){return function(h,g,c,b){var d=a.init(h),k,e,j={};if(d==-3){return -1}e=a.plugin;if(!a.isArray(e.funcs)){e.funcs=[]}if(e.getVersionDone!=1){k=a.isMinVersion?a.isMinVersion(h,"0",c,b):a.getVersion(h,c,b)}if(e.installed!=-0.5&&e.installed!=0.5){a.call(g);return 1}if(e.NOTF){a.fPush(g,e.funcs);return 0}return 1}},div:null,divID:"plugindetect",divWidth:50,pluginSize:1,emptyDiv:function(){var d=this,b,h,c,a,f,g;if(d.div&&d.div.childNodes){for(b=d.div.childNodes.length-1;b>=0;b--){c=d.div.childNodes[b];if(c&&c.childNodes){for(h=c.childNodes.length-1;h>=0;h--){g=c.childNodes[h];try{c.removeChild(g)}catch(f){}}}if(c){try{d.div.removeChild(c)}catch(f){}}}}if(!d.div){a=document.getElementById(d.divID);if(a){d.div=a}}if(d.div&&d.div.parentNode){try{d.div.parentNode.removeChild(d.div)}catch(f){}d.div=null}},DONEfuncs:[],onDoneEmptyDiv:function(){var c=this,a,b;if(!c.winLoaded){return}if(c.WLfuncs&&c.WLfuncs.length&&c.WLfuncs[c.WLfuncs.length-1]!==null){return}for(a in c){b=c[a];if(b&&b.funcs){if(b.OTF==3){return}if(b.funcs.length&&b.funcs[b.funcs.length-1]!==null){return}}}for(a=0;a<c.DONEfuncs.length;a++){c.callArray(c.DONEfuncs)}c.emptyDiv()},getWidth:function(c){if(c){var a=c.scrollWidth||c.offsetWidth,b=this;if(b.isNum(a)){return a}}return -1},getTagStatus:function(m,g,a,b){var c=this,f,k=m.span,l=c.getWidth(k),h=a.span,j=c.getWidth(h),d=g.span,i=c.getWidth(d);if(!k||!h||!d||!c.getDOMobj(m)){return -2}if(j<i||l<0||j<0||i<0||i<=c.pluginSize||c.pluginSize<1){return 0}if(l>=i){return -1}try{if(l==c.pluginSize&&(!c.isIE||c.getDOMobj(m).readyState==4)){if(!m.winLoaded&&c.winLoaded){return 1}if(m.winLoaded&&c.isNum(b)){if(!c.isNum(m.count)){m.count=b}if(b-m.count>=10){return 1}}}}catch(f){}return 0},getDOMobj:function(g,a){var f,d=this,c=g?g.span:0,b=c&&c.firstChild?1:0;try{if(b&&a){c.firstChild.focus()}}catch(f){}return b?c.firstChild:null},setStyle:function(b,g){var f=b.style,a,d,c=this;if(f&&g){for(a=0;a<g.length;a=a+2){try{f[g[a]]=g[a+1]}catch(d){}}}},insertDivInBody:function(a,i){var h,f=this,b="pd33993399",d=null,j=i?window.top.document:window.document,c="<",g=(j.getElementsByTagName("body")[0]||j.body);if(!g){try{j.write(c+'div id="'+b+'">o'+c+"/div>");d=j.getElementById(b)}catch(h){}}g=(j.getElementsByTagName("body")[0]||j.body);if(g){if(g.firstChild&&f.isDefined(g.insertBefore)){g.insertBefore(a,g.firstChild)}else{g.appendChild(a)}if(d){g.removeChild(d)}}else{}},insertHTML:function(g,b,h,a,k){var l,m=document,j=this,p,o=m.createElement("span"),n,i,f="<";var c=["outlineStyle","none","borderStyle","none","padding","0px","margin","0px","visibility","visible"];if(!j.isDefined(a)){a=""}if(j.isString(g)&&(/[^\s]/).test(g)){p=f+g+' width="'+j.pluginSize+'" height="'+j.pluginSize+'" ';for(n=0;n<b.length;n=n+2){if(/[^\s]/.test(b[n+1])){p+=b[n]+'="'+b[n+1]+'" '}}p+=">";for(n=0;n<h.length;n=n+2){if(/[^\s]/.test(h[n+1])){p+=f+'param name="'+h[n]+'" value="'+h[n+1]+'" />'}}p+=a+f+"/"+g+">"}else{p=a}if(!j.div){i=m.getElementById(j.divID);if(i){j.div=i}else{j.div=m.createElement("div");j.div.id=j.divID;j.insertDivInBody(j.div)}j.setStyle(j.div,c.concat(["width",j.divWidth+"px","height",(j.pluginSize+3)+"px","fontSize",(j.pluginSize+3)+"px","lineHeight",(j.pluginSize+3)+"px","verticalAlign","baseline","display","block"]));if(!i){j.setStyle(j.div,["position","absolute","right","0px","top","0px"])}}if(j.div&&j.div.parentNode){j.div.appendChild(o);j.setStyle(o,c.concat(["fontSize",(j.pluginSize+3)+"px","lineHeight",(j.pluginSize+3)+"px","verticalAlign","baseline","display","inline"]));try{if(o&&o.parentNode){o.focus()}}catch(l){}try{o.innerHTML=p}catch(l){}if(o.childNodes.length==1&&!(j.isGecko&&j.compareNums(j.verGecko,"1,5,0,0")<0)){j.setStyle(o.firstChild,c.concat(["display","inline"]))}return{span:o,winLoaded:j.winLoaded,tagName:(j.isString(g)?g:"")}}return{span:null,winLoaded:j.winLoaded,tagName:""}},file:{any:"fileStorageAny999",valid:"fileStorageValid999",save:function(d,f,c){var b=this,e=b.$,a;if(d&&e.isDefined(c)){if(!d[b.any]){d[b.any]=[]}if(!d[b.valid]){d[b.valid]=[]}d[b.any].push(c);a=b.split(f,c);if(a){d[b.valid].push(a)}}},getValidLength:function(a){return a&&a[this.valid]?a[this.valid].length:0},getAnyLength:function(a){return a&&a[this.any]?a[this.any].length:0},getValid:function(c,a){var b=this;return c&&c[b.valid]?b.get(c[b.valid],a):null},getAny:function(c,a){var b=this;return c&&c[b.any]?b.get(c[b.any],a):null},get:function(d,a){var c=d.length-1,b=this.$.isNum(a)?a:c;return(b<0||b>c)?null:d[b]},split:function(g,c){var b=this,e=b.$,f=null,a,d;g=g?g.replace(".","\\."):"";d=new RegExp("^(.*[^\\/])("+g+"\\s*)$");if(e.isString(c)&&d.test(c)){a=(RegExp.$1).split("/");f={name:a[a.length-1],ext:RegExp.$2,full:c};a[a.length-1]="";f.path=a.join("/")}return f},z:0},quicktime:{mimeType:["video/quicktime","application/x-quicktimeplayer","image/x-macpaint","image/x-quicktime"],progID:"QuickTimeCheckObject.QuickTimeCheck.1",progID0:"QuickTime.QuickTime",classID:"clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B",minIEver:7,HTML:("<")+'param name="src" value="" />'+("<")+'param name="controller" value="false" />',getCodeBaseVersion:function(a){return'codebase="#version='+a+'"'},SEARCH:{min:0,max:0,match:0,digits:[16,128,128,0]},getVersion:function(c){var f=this,d=f.$,a=null,e=null,b;if(!d.isIE){if(d.hasMimeType(f.mimeType)){e=d.OS!=3?d.findNavPlugin("QuickTime.*Plug-?in",0):null;if(e&&e.name){a=d.getNum(e.name)}}}else{if(d.isStrNum(c)){b=c.split(d.splitNumRegx);if(b.length>3&&parseInt(b[3],10)>0){b[3]="9999"}c=b.join(",")}if(d.isStrNum(c)&&d.verIE>=f.minIEver&&f.canUseIsMin()>0){f.installed=f.isMin(c);f.getVersionDone=0;return}f.getVersionDone=1;if(!a&&d.verIE>=f.minIEver){a=f.CDBASE2VER(d.codebaseSearch(f))}if(!a){e=d.getAXO(f.progID);if(e&&e.QuickTimeVersion){a=e.QuickTimeVersion.toString(16);a=parseInt(a.charAt(0),16)+"."+parseInt(a.charAt(1),16)+"."+parseInt(a.charAt(2),16)}}}f.installed=a?1:(e?0:-1);f.version=d.formatNum(a,3)},cdbaseUpper:["7,60,0,0","0,0,0,0"],cdbaseLower:["7,50,0,0",null],cdbase2ver:[function(c,b){var a=b.split(c.$.splitNumRegx);return[a[0],a[1].charAt(0),a[1].charAt(1),a[2]].join(",")},null],CDBASE2VER:function(f){var e=this,c=e.$,b,a=e.cdbaseUpper,d=e.cdbaseLower;if(f){f=c.formatNum(f);for(b=0;b<a.length;b++){if(a[b]&&c.compareNums(f,a[b])<0&&d[b]&&c.compareNums(f,d[b])>=0&&e.cdbase2ver[b]){return e.cdbase2ver[b](e,f)}}}return f},canUseIsMin:function(){var f=this,d=f.$,b,c=f.canUseIsMin,a=f.cdbaseUpper,e=f.cdbaseLower;if(!c.value){c.value=-1;for(b=0;b<a.length;b++){if(a[b]&&d.codebaseSearch(f,a[b])){c.value=1;break}if(e[b]&&d.codebaseSearch(f,e[b])){c.value=-1;break}}}f.SEARCH.match=c.value==1?1:0;return c.value},isMin:function(c){var b=this,a=b.$;return a.codebaseSearch(b,c)?0.7:-1}},java:{mimeType:["application/x-java-applet","application/x-java-vm","application/x-java-bean"],mimeTypeJPI:"application/x-java-applet;jpi-version=",classID:"clsid:8AD9C840-044E-11D1-B3E9-00805F499D93",DTKclassID:"clsid:CAFEEFAC-DEC7-0000-0000-ABCDEFFEDCBA",DTKmimeType:["application/java-deployment-toolkit","application/npruntime-scriptable-plugin;DeploymentToolkit"],forceVerifyTag:[],Enabled:navigator.javaEnabled(),VENDORS:["Sun Microsystems Inc.","Apple Computer, Inc."],OTF:null,All_versions:[],mimeTypeJPIresult:"",JavaPlugin_versions:[],JavaVersions:[[1,9,2,30],[1,8,2,30],[1,7,2,30],[1,6,1,40],[1,5,1,30],[1,4,2,30],[1,3,1,30]],searchJavaPluginAXO:function(){var h=null,a=this,c=a.$,g=[],j=[1,5,0,14],i=[1,6,0,2],f=[1,3,1,0],e=[1,4,2,0],d=[1,5,0,7],b=false,k={};if(!c.ActiveXEnabled){return null};if(c.verIE>=a.minIEver){g=a.searchJavaAXO(i,i,b);if(g.length>0&&b){g=a.searchJavaAXO(j,j,b)}}else{if(g.length==0){g=a.searchJavaAXO(f,e,false)}}if(g.length>0){h=g[0]}a.JavaPlugin_versions=[].concat(g);return h},searchJavaAXO:function(l,i,m){var n,f,h=this.$,p,k,a,e,g,j,b,q=[];if(h.compareNums(l.join(","),i.join(","))>0){i=l}i=h.formatNum(i.join(","));var o,d="1,4,2,0",c="JavaPlugin."+l[0]+""+l[1]+""+l[2]+""+(l[3]>0?("_"+(l[3]<10?"0":"")+l[3]):"");for(n=0;n<this.JavaVersions.length;n++){f=this.JavaVersions[n];p="JavaPlugin."+f[0]+""+f[1];g=f[0]+"."+f[1]+".";for(a=f[2];a>=0;a--){b="JavaWebStart.isInstalled."+g+a+".0";if(h.compareNums(f[0]+","+f[1]+","+a+",0",i)>=0&&!h.getAXO(b)){continue}o=h.compareNums(f[0]+","+f[1]+","+a+",0",d)<0?true:false;for(e=f[3];e>=0;e--){k=a+"_"+(e<10?"0"+e:e);j=p+k;if(h.getAXO(j)&&(o||h.getAXO(b))){q.push(g+k);if(!m){return q}}if(j==c){return q}}if(h.getAXO(p+a)&&(o||h.getAXO(b))){q.push(g+a);if(!m){return q}}if(p+a==c){return q}}}return q},minIEver:7,getMimeJPIversion:function(){var h,a=this,d=a.$,c=new RegExp("("+a.mimeTypeJPI+")(\\d.*)","i"),k=new RegExp("Java","i"),e,j,f="",i={},g=0,b;for(h=0;h<navigator.mimeTypes.length;h++){j=navigator.mimeTypes[h];if(c.test(j.type)&&(e=j.enabledPlugin)&&(j=RegExp.$2)&&(k.test(e.description||f)||k.test(e.name||f))){i["a"+d.formatNum(j)]=j}}b="0,0,0,0";for(h in i){g++;e=h.slice(1);if(d.compareNums(e,b)>0){b=e}}a.mimeTypeJPIresult=g>0?a.mimeTypeJPI+i["a"+b]:"";return g>0?b:null},getVersion:function(q,e,j){var s,m=this,g=m.$,k=m.NOTF,i=m.applet,b=m.verify,h=m.jar,f=null,r=null,t=null;if(m.getVersionDone===null){m.OTF=0;m.mimeObj=g.hasMimeType(m.mimeType);m.deployTK.$=g;m.deployTK.parentNode=m;i.$=g;i.parentNode=m;if(k){k.$=g;k.parentNode=m}if(b){b.parentNode=m;b.$=g;b.begin()}}var l;if(g.isArray(j)){for(l=0;l<i.allowed.length;l++){if(g.isNum(j[l])){i.allowed[l]=j[l]}}}for(l=0;l<m.forceVerifyTag.length;l++){i.allowed[l]=m.forceVerifyTag[l]}g.file.save(m,".jar",e);if(m.getVersionDone===0){if(!m.version||i.shouldTryAny()){s=i.insertHTMLQueryAll();if(s[0]){m.installed=1}m.EndGetVersion(s[0],s[1])}return}var o=m.deployTK.query();if(o.JRE){f=o.JRE;r=m.VENDORS[0]}if(!g.isIE){var d,c,n,a;a=(m.mimeObj&&m.Enabled)?true:false;if(!f&&(s=m.getMimeJPIversion())!==null){f=s}if(!f&&m.mimeObj){s="Java[^\\d]*Plug-in";n=g.findNavPlugin(s);if(n){s=new RegExp(s,"i");d=s.test(n.description||"")?g.getNum(n.description):null;c=s.test(n.name||"")?g.getNum(n.name):null;if(d&&c){f=(g.compareNums(g.formatNum(d),g.formatNum(c))>=0)?d:c}else{f=d||c}}}if(!f&&m.mimeObj&&g.isSafari&&g.OS==2){n=g.findNavPlugin("Java.*\\d.*Plug-in.*Cocoa",0);if(n){d=g.getNum(n.description);if(d){f=d}}}if(f){m.version0=f;if(m.Enabled){t=f}}}else{if(!f&&o.status==0){f=m.searchJavaPluginAXO();if(f){r=m.VENDORS[0]}}if(f){m.version0=f;if(m.Enabled&&g.ActiveXEnabled){t=f}}}if(!t||i.shouldTryAny()){s=i.insertHTMLQueryAll();if(s[0]){t=s[0];r=s[1]}}if(!t&&(s=m.queryWithoutApplets())[0]){m.version0=t=s[0];r=s[1];if(m.installed==-0.5){m.installed=0.5}}if(g.isSafari&&g.OS==2){if(!t&&a){if(m.installed===null){m.installed=0}else{if(m.installed==-0.5){m.installed=0.5}}}}if(m.jreDisabled()){t=null};if(m.installed===null){m.installed=t?1:(f?-0.2:-1)}m.EndGetVersion(t,r)},EndGetVersion:function(b,d){var a=this,c=a.$;if(a.version0){a.version0=c.formatNum(c.getNum(a.version0))}if(b){a.version=c.formatNum(c.getNum(b))}if(d&&c.isString(d)){a.vendor=d}if(!d){a.vendor=""}if(a.forceVerifyTag.length>0){a.getVersionDone=0}else{if(a.getVersionDone!=1){if(a.OTF<2){a.getVersionDone=0}else{a.getVersionDone=a.applet.canTryAny()?0:1}}}},jreDisabled:function(){var b=this,d=b.$,c=b.deployTK.query().JRE,a;if(c&&d.OS==1){if((d.isGecko&&d.compareNums(d.verGecko,"1,9,2,0")>=0&&d.compareNums(c,"1,6,0,12")<0)||(d.isChrome&&d.compareNums(c,"1,6,0,12")<0)){return 1}};if(d.isOpera&&d.verOpera>=9&&!b.Enabled&&!b.mimeObj&&!b.queryWithoutApplets()[0]){return 1}if((d.isGecko||d.isChrome)&&!b.mimeObj&&!b.queryWithoutApplets()[0]){return 1}return 0},deployTK:{status:null,JREall:[],JRE:null,HTML:null,query:function(){var i=this,d=i.$,c=i.parentNode,h,j,f,k={},b=null,g=null;if(i.status!==null){return i}i.status=0;if((d.isGecko&&d.compareNums(d.verGecko,d.formatNum("1.6"))<=0)||d.isSafari||d.isChrome||(d.isIE&&!d.ActiveXEnabled)){return i};if(d.isIE&&d.verIE>=6){i.HTML=d.insertHTML("object",[],[]);b=d.getDOMobj(i.HTML)}else{if(!d.isIE&&(f=d.hasMimeType(c.DTKmimeType))&&f.type){i.HTML=d.insertHTML("object",["type",f.type],[]);b=d.getDOMobj(i.HTML)}}if(b){if(d.isIE&&d.verIE>=6){try{b.classid=c.DTKclassID}catch(h){}};try{var a=b.jvms;if(a){g=a.getLength();if(d.isNum(g)){i.status=g>0?1:-1;for(j=0;j<g;j++){f=d.getNum(a.get(g-1-j).version);if(f){i.JREall[j]=f}}}}}catch(h){}}if(i.JREall.length>0){i.JRE=d.formatNum(i.JREall[0])};return i}},queryWithoutApplets00:function(c,a){var b=window.java,d;try{if(b&&b.lang&&b.lang.System){a.value=[b.lang.System.getProperty("java.version")+" ",b.lang.System.getProperty("java.vendor")+" "]}}catch(d){}},queryWithoutApplets:function(){var c=this,f=c.$,g,a=c.queryWithoutApplets;if(!a.value){a.value=[null,null];if(!f.isIE&&window.java){if(f.OS==2&&f.isOpera&&f.verOpera<9.2&&f.verOpera>=9){}else{if(f.isGecko&&f.compareNums(f.verGecko,"1,9,0,0")<0&&f.compareNums(f.verGecko,"1,8,0,0")>=0){}else{if(f.isGecko){var i,b,h=document;if(h.createElement&&h.createEvent){try{i=h.createElement("div"),b=h.createEvent("HTMLEvents");b.initEvent("change",false,false);i.addEventListener("change",f.handler(c.queryWithoutApplets00,f,a),false);i.dispatchEvent(b)}catch(g){}}}else{c.queryWithoutApplets00(f,a)}}}}}return a.value},applet:{results:[[null,null],[null,null],[null,null]],HTML:[0,0,0],active:[0,0,0],allowed:[2,2,2],DummyObjTagHTML:0,DummySpanTagHTML:0,getResult:function(){var c=this.results,a,b;for(a=0;a<c.length;a++){b=c[a];if(b[0]){break}}return[].concat(b)},canTry:function(c){var a=this,b=a.$;if(a.HTML[c]){return false}if(c==2&&!b.isIE){return false}if((c===0||c==2)&&!a.canUseObjectTag()){return false}if(c==1&&!a.canUseAppletTag()){return false}return true},canTryAny:function(){var b=this,a;for(a=0;a<b.results.length;a++){if(b.canTry(a)){return true}}return false},shouldTry:function(d){var b=this,c=b.$,a=b.parentNode;if(!b.canTry(d)){return false}if(b.allowed[d]==3){return true}if(!a.version0||!a.Enabled||(c.isIE&&!c.ActiveXEnabled)){if(b.allowed[d]==2){return true}if(b.allowed[d]==1&&!b.getResult()[0]){return true}}return false},shouldTryAny:function(){var b=this,a;for(a=0;a<b.allowed.length;a++){if(b.shouldTry(a)){return true}}return false},canUseAppletTag:function(){var b=this,c=b.$,a=b.parentNode;return(!c.isIE||a.Enabled)},canUseObjectTag:function(){var a=this,b=a.$;return(!b.isIE||b.ActiveXEnabled)},queryThis:function(h){var g,c=this,b=c.parentNode,f=b.$,a=vendor=null,d=f.getDOMobj(c.HTML[h],true);if(d){try{a=d.getVersion()+" ";vendor=d.getVendor()+" ";d.statusbar(f.winLoaded?" ":" ")}catch(g){}if(f.isStrNum(a)){c.results[h]=[a,vendor]}try{if(f.isIE&&a&&d.readyState!=4){f.garbage=true;d.parentNode.removeChild(d)}}catch(g){}}},insertHTMLQueryAll:function(){var d=this,e=d.parentNode,i=e.$,l=d.results,p=d.HTML,a="&nbsp;&nbsp;&nbsp;&nbsp;",g="A.class",n=i.file.getValid(e);if(!n){return[null,null]}if(e.OTF<1){e.OTF=1}if(e.jreDisabled()){return[null,null]}if(e.OTF<2){e.OTF=2}var j=n.name+n.ext,h=n.path;var f=["archive",j,"code",g],c=["mayscript","true"],o=["scriptable","true"].concat(c),b=!i.isIE&&e.mimeObj&&e.mimeObj.type?e.mimeObj.type:e.mimeType[0];if(d.shouldTry(0)){p[0]=i.isIE?i.insertHTML("object",["type",b].concat(f),["codebase",h].concat(f).concat(o),a,e):i.insertHTML("object",["type",b],["codebase",h].concat(f).concat(o),a,e);l[0]=[0,0];d.queryThis(0)}if(d.shouldTry(1)){p[1]=i.isIE?i.insertHTML("applet",["alt",a].concat(c).concat(f),["codebase",h].concat(c),a,e):i.insertHTML("applet",["codebase",h,"alt",a].concat(c).concat(f),[].concat(c),a,e);l[1]=[0,0];d.queryThis(1)}if(d.shouldTry(2)){p[2]=i.isIE?i.insertHTML("object",["classid",e.classID],["codebase",h].concat(f).concat(o),a,e):i.insertHTML();l[2]=[0,0];d.queryThis(2)}if(!d.DummyObjTagHTML&&d.canUseObjectTag()){d.DummyObjTagHTML=i.insertHTML("object",[],[],a)}if(!d.DummySpanTagHTML){d.DummySpanTagHTML=i.insertHTML("",[],[],a)};if(e.OTF<3&&((p[0]&&!l[0][0])||(p[1]&&!l[1][0])||(i.isIE&&p[2]&&!l[2][0]))){var k=e.NOTF,m=k.isJavaActive();if(m>=0){e.OTF=3;e.installed=m==1?0.5:-0.5;k.onIntervalQuery=i.handler(k.$$onIntervalQuery,k);if(!i.winLoaded){i.WLfuncs0.push([k.winOnLoadQuery,k])}setTimeout(k.onIntervalQuery,k.intervalLength)}};return d.getResult()}},NOTF:{count:0,countMax:25,intervalLength:250,isJavaActive:function(){var e=this,c=e.parentNode,a,b,d=-9;for(a=0;a<c.applet.HTML.length;a++){b=e.isAppletActive(a);c.applet.active[a]=b;if(b>d){d=b}}return d},isAppletActive:function(g){var h=this,d=h.$,c=h.parentNode,b=c.applet,f,a=d.getTagStatus(b.HTML[g],b.DummySpanTagHTML,b.DummyObjTagHTML,h.count);if(a==-2){return -2}try{if(d.isIE&&d.verIE>=c.minIEver&&d.getDOMobj(b.HTML[g]).object){return 1}}catch(f){}if(a==1&&(d.isIE||((c.version0&&c.Enabled&&c.mimeObj)||c.queryWithoutApplets()[0]))){return 1}if(a<0){return -1}return 0},winOnLoadQuery:function(c,d){var b=d.parentNode,a;if(b.OTF==3){a=d.queryAllApplets();d.queryCompleted(a[1],a[2])}},$$onIntervalQuery:function(d){var c=d.$,b=d.parentNode,a;if(b.OTF==3){a=d.queryAllApplets();if(a[0]||(c.winLoaded&&d.count>d.countMax)){d.queryCompleted(a[1],a[2])}}d.count++;if(b.OTF==3){setTimeout(d.onIntervalQuery,d.intervalLength)}},queryAllApplets:function(){var g=this,f=g.$,e=g.parentNode,d=e.applet,b,a,c;for(b=0;b<d.results.length;b++){d.queryThis(b)}a=d.getResult();c=(a[0]||g.isJavaActive()<0)?true:false;return[c,a[0],a[1]]},queryCompleted:function(c,f){var e=this,d=e.$,b=e.parentNode;if(b.OTF==4){return}b.OTF=4;var a=e.isJavaActive()==1?true:false;if(c||b.queryWithoutApplets()[0]){b.installed=1}else{if(a){if(b.version0){b.installed=1;c=b.version0}else{b.installed=0}}else{if(b.installed==0.5){b.installed=0}else{if(b.version0){b.installed=-0.2}else{b.installed=-1}}}}b.EndGetVersion(c,f);if(b.funcs){d.callArray(b.funcs)}if(d.onDoneEmptyDiv){d.onDoneEmptyDiv()}}},append:function(e,d){for(var c=0;c<d.length;c++){e.push(d[c])}},zz:0},devalvr:{mimeType:"application/x-devalvrx",progID:"DevalVRXCtrl.DevalVRXCtrl.1",classID:"clsid:5D2CF9D0-113A-476B-986F-288B54571614",getVersion:function(){var h=this,a=null,f,b=h.$,d;if(!b.isIE){f=b.findNavPlugin("DevalVR");if(f&&f.name&&b.hasMimeType(h.mimeType)){a=f.description.split(" ")[3]}h.installed=a?1:-1}else{var g,c;g=b.getAXO(h.progID);if(g){c=b.getDOMobj(b.insertHTML("object",["classid",h.classID],["src",""],"",h));if(c){try{if(c.pluginversion){a="00000000"+c.pluginversion.toString(16);a=a.substr(a.length-8,8);a=parseInt(a.substr(0,2),16)+","+parseInt(a.substr(2,2),16)+","+parseInt(a.substr(4,2),16)+","+parseInt(a.substr(6,2),16)}}catch(d){}}}h.installed=a?1:(g?0:-1)}h.version=b.formatNum(a)}},flash:{mimeType:"application/x-shockwave-flash",progID:"ShockwaveFlash.ShockwaveFlash",classID:"clsid:D27CDB6E-AE6D-11CF-96B8-444553540000",getVersion:function(){var b=function(i){if(!i){return null}var e=/[\d][\d\,\.\s]*[rRdD]{0,1}[\d\,]*/.exec(i);return e?e[0].replace(/[rRdD\.]/g,",").replace(/\s/g,""):null};var j=this,g=j.$,k,h,l=null,c=null,a=null,f,m,d;if(!g.isIE){m=g.hasMimeType(j.mimeType);if(m){f=g.getDOMobj(g.insertHTML("object",["type",j.mimeType],[],"",j));try{l=g.getNum(f.GetVariable("$version"))}catch(k){}}if(!l){d=m?m.enabledPlugin:null;if(d&&d.description){l=b(d.description)}if(l){l=g.getPluginFileVersion(d,l)}}}else{for(h=15;h>2;h--){c=g.getAXO(j.progID+"."+h);if(c){a=h.toString();break}}if(!c){c=g.getAXO(j.progID)}if(a=="6"){try{c.AllowScriptAccess="always"}catch(k){return"6,0,21,0"}}try{l=b(c.GetVariable("$version"))}catch(k){}if(!l&&a){l=a}}j.installed=l?1:-1;j.version=g.formatNum(l);return true}},shockwave:{mimeType:"application/x-director",progID:"SWCtl.SWCtl",classID:"clsid:166B1BCA-3F9C-11CF-8075-444553540000",getVersion:function(){var a=null,b=null,g,f,d=this,c=d.$;if(!c.isIE){f=c.findNavPlugin("Shockwave\\s*for\\s*Director");if(f&&f.description&&c.hasMimeType(d.mimeType)){a=c.getNum(f.description)}if(a){a=c.getPluginFileVersion(f,a)}}else{try{b=c.getAXO(d.progID).ShockwaveVersion("")}catch(g){}if(c.isString(b)&&b.length>0){a=c.getNum(b)}else{if(c.getAXO(d.progID+".8")){a="8"}else{if(c.getAXO(d.progID+".7")){a="7"}else{if(c.getAXO(d.progID+".1")){a="6"}}}}}d.installed=a?1:-1;d.version=c.formatNum(a)}},windowsmediaplayer:{mimeType:["application/x-mplayer2","application/asx","application/x-ms-wmp"],navPluginObj:null,progID:"wmplayer.ocx",classID:"clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6",INSTALLED:{dfault:null,inputMime:{}},getVersion:function(i,g){var c=this,f=c.$,l,e=null,h=null,j=c.mimeType,k="Totem|VLC",b,d,a;c.installed=-1;if(f.isString(g)){g=g.replace(/\s/g,"");if(g){j=g}}else{g=null}if(g){d=c.INSTALLED.inputMime[g];if(f.isDefined(d)){c.installed=d;return}}else{d=c.INSTALLED.dfault;if(d!==null){c.installed=d;return}}if(!f.isIE){if(f.OS<20&&f.OS>=3){c.installed=-1;return}a={wmp:"Windows\\s*Media\\s*Player.*Plug-?in|Flip4Mac.*Windows\\s*Media.*Plug-?in",wmpFirefox:"Windows\\s*Media\\s*Player.*Firefox.*Plug-?in",avoidPlayers:"Totem|VLC|RealPlayer"};if(c.getVersionDone!==0){c.getVersionDone=0;e=f.getMimeEnabledPlugin(c.mimeType,a.wmp,a.avoidPlayers);if(!g){l=e}if(!e&&f.hasMimeType(c.mimeType)){e=f.findNavPlugin(a.wmp,0,a.avoidPlayers)}if(e){c.navPluginObj=e;b=(f.isGecko&&f.compareNums(f.verGecko,f.formatNum("1.8"))<0);b=b||(f.isOpera&&f.verOpera<10);b=b||f.isChrome;if(!b&&f.getMimeEnabledPlugin(c.mimeType[2],a.wmpFirefox,a.avoidPlayers)){d=f.getDOMobj(f.insertHTML("object",["type",c.mimeType[2],"data",""],["src",""],"",c));if(d){h=d.versionInfo}}}}else{h=c.version}if(!f.isDefined(l)){l=f.getMimeEnabledPlugin(j,a.wmp,a.avoidPlayers)}c.installed=l&&h?1:(l?0:(c.navPluginObj?-0.2:-1))}else{e=f.getAXO(c.progID);if(e){h=e.versionInfo}c.installed=e&&h?1:(e?0:-1)}if(!c.version){c.version=f.formatNum(h)}if(g){c.INSTALLED.inputMime[g]=c.installed}else{c.INSTALLED.dfault=c.installed}}},silverlight:{mimeType:"application/x-silverlight",progID:"AgControl.AgControl",digits:[20,20,9,12,31],getVersion:function(){var e=this,c=e.$,k=document,i=null,b=null,f=null,h=true,a=[1,0,1,1,1],r=[1,0,1,1,1],j=function(d){return(d<10?"0":"")+d.toString()},n=function(s,d,u,v,t){return(s+"."+d+"."+u+j(v)+j(t)+".0")},o=function(s,d,t){return q(s,(d==0?t:r[0]),(d==1?t:r[1]),(d==2?t:r[2]),(d==3?t:r[3]),(d==4?t:r[4]))},q=function(v,t,s,x,w,u){var u;try{return v.IsVersionSupported(n(t,s,x,w,u))}catch(u){}return false};if(!c.isIE){var g;if(c.hasMimeType(e.mimeType)){g=c.isGecko&&c.compareNums(c.verGecko,c.formatNum("1.6"))<=0;if(c.isGecko&&g){h=false}f=c.findNavPlugin("Silverlight.*Plug-?in",0);if(f&&f.description){i=c.formatNum(f.description)}if(i){r=i.split(c.splitNumRegx);if(parseInt(r[2],10)>=30226&&parseInt(r[0],10)<2){r[0]="2"}i=r.join(",")}}e.installed=f&&h&&i?1:(f&&h?0:(f?-0.2:-1))}else{b=c.getAXO(e.progID);var m,l,p;if(b&&q(b,a[0],a[1],a[2],a[3],a[4])){for(m=0;m<e.digits.length;m++){p=r[m];for(l=p+(m==0?0:1);l<=e.digits[m];l++){if(o(b,m,l)){h=true;r[m]=l}else{break}}if(!h){break}}if(h){i=n(r[0],r[1],r[2],r[3],r[4])}}e.installed=b&&h&&i?1:(b&&h?0:(b?-0.2:-1))}e.version=c.formatNum(i)}},vlc:{mimeType:"application/x-vlc-plugin",progID:"VideoLAN.VLCPlugin",classID:"clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921",compareNums:function(e,d){var c=this.$,k=e.split(c.splitNumRegx),i=d.split(c.splitNumRegx),h,b,a,g,f,j;for(h=0;h<Math.min(k.length,i.length);h++){j=/([\d]+)([a-z]?)/.test(k[h]);b=parseInt(RegExp.$1,10);g=(h==2&&RegExp.$2.length>0)?RegExp.$2.charCodeAt(0):-1;j=/([\d]+)([a-z]?)/.test(i[h]);a=parseInt(RegExp.$1,10);f=(h==2&&RegExp.$2.length>0)?RegExp.$2.charCodeAt(0):-1;if(b!=a){return(b>a?1:-1)}if(h==2&&g!=f){return(g>f?1:-1)}}return 0},getVersion:function(){var c=this,b=c.$,f,a=null,d;if(!b.isIE){if(b.hasMimeType(c.mimeType)){f=b.findNavPlugin("VLC.*Plug-?in",0,"Totem");if(f&&f.description){a=b.getNum(f.description,"[\\d][\\d\\.]*[a-z]*")}}c.installed=a?1:-1}else{f=b.getAXO(c.progID);if(f){try{a=b.getNum(f.VersionInfo,"[\\d][\\d\\.]*[a-z]*")}catch(d){}}c.installed=a?1:(f?0:-1)}c.version=b.formatNum(a)}},adobereader:{mimeType:"application/pdf",navPluginObj:null,progID:["AcroPDF.PDF","PDF.PdfCtrl"],classID:"clsid:CA8A9780-280D-11CF-A24D-444553540000",INSTALLED:{},pluginHasMimeType:function(d,c,f){var b=this,e=b.$,a;for(a in d){if(d[a]&&d[a].type&&d[a].type==c){return 1}}if(e.getMimeEnabledPlugin(c,f)){return 1}return 0},getVersion:function(l,j){var g=this,d=g.$,i,f,m,n,b=null,h=null,k=g.mimeType,a,c;if(d.isString(j)){j=j.replace(/\s/g,"");if(j){k=j}}else{j=null}if(d.isDefined(g.INSTALLED[k])){g.installed=g.INSTALLED[k];return}if(!d.isIE){a="Adobe.*PDF.*Plug-?in|Adobe.*Acrobat.*Plug-?in|Adobe.*Reader.*Plug-?in";if(g.getVersionDone!==0){g.getVersionDone=0;b=d.getMimeEnabledPlugin(g.mimeType,a);if(!j){n=b}if(!b&&d.hasMimeType(g.mimeType)){b=d.findNavPlugin(a,0)}if(b){g.navPluginObj=b;h=d.getNum(b.description)||d.getNum(b.name);h=d.getPluginFileVersion(b,h);if(!h&&d.OS==1){if(g.pluginHasMimeType(b,"application/vnd.adobe.pdfxml",a)){h="9"}else{if(g.pluginHasMimeType(b,"application/vnd.adobe.x-mars",a)){h="8"}}}}}else{h=g.version}if(!d.isDefined(n)){n=d.getMimeEnabledPlugin(k,a)}g.installed=n&&h?1:(n?0:(g.navPluginObj?-0.2:-1))}else{b=d.getAXO(g.progID[0])||d.getAXO(g.progID[1]);c=/=\s*([\d\.]+)/g;try{f=(b||d.getDOMobj(d.insertHTML("object",["classid",g.classID],["src",""],"",g))).GetVersions();for(m=0;m<5;m++){if(c.test(f)&&(!h||RegExp.$1>h)){h=RegExp.$1}}}catch(i){}g.installed=h?1:(b?0:-1)}if(!g.version){g.version=d.formatNum(h)}g.INSTALLED[k]=g.installed}},pdfreader:{mimeType:"application/pdf",progID:["AcroPDF.PDF","PDF.PdfCtrl"],classID:"clsid:CA8A9780-280D-11CF-A24D-444553540000",OTF:null,fileUsed:0,fileEnabled:1,setPluginStatus:function(c,b){var a=this,d=a.$;a.version=null;if(a.installed!==0&&a.installed!=1){if(b==3){a.installed=-0.5}else{a.installed=c?0:(d.isIE?-1.5:-1)}}if(a.verify&&a.verify.verifyPDFEnabled){a.getVersionDone=0}else{if(a.getVersionDone!=1){a.getVersionDone=b<2&&a.fileEnabled&&a.installed<=-1?0:1}}},getVersion:function(l,f,b){var g=this,c=g.$,i=false,d,a,j,h=g.NOTF,m=g.doc,k=g.verify;if(b!==true){b=false}if(g.getVersionDone===null){g.OTF=0;m.$=c;m.parentNode=g;if(h){h.$=c;h.parentNode=g}if(k){k.parentNode=g;k.$=c;k.begin()}}if(((c.isGecko&&c.compareNums(c.verGecko,"2,0,0,0")<=0&&c.OS<=4)||(c.isOpera&&c.verOpera<=11&&c.OS<=4)||(c.isChrome&&c.compareNums(c.verChrome,"10,0,0,0")<0&&c.OS<=4)||0)&&!b){g.fileEnabled=0}c.file.save(g,".pdf",f);if(g.getVersionDone===0){if(g.OTF<2&&(g.installed<0||b)){if(m.insertHTMLQuery(b)>0){i=true}g.setPluginStatus(i,g.OTF)}return}if(!b){if(!c.isIE){if(c.hasMimeType(g.mimeType)){i=true}}else{try{if((c.getAXO(g.progID[0])||c.getAXO(g.progID[1])).GetVersions()){i=true}}catch(j){}}}if(g.OTF<2&&(!i||b)){if(m.insertHTMLQuery(b)>0){i=true}}g.setPluginStatus(i,g.OTF)},doc:{HTML:0,DummyObjTagHTML:0,DummySpanTagHTML:0,queryObject:function(c){var g=this,b=g.parentNode,d=b.$,a;if(d.isIE){a=-1;try{if(d.getDOMobj(g.HTML).GetVersions()){a=1}}catch(f){}}else{a=d.getTagStatus(g.HTML,g.DummySpanTagHTML,g.DummyObjTagHTML,c)};return a},insertHTMLQuery:function(c){var h=this,f=h.parentNode,d=f.$,i,b=f.pdf,e=d.file.getValid(f),a="&nbsp;&nbsp;&nbsp;&nbsp;";if(e){e=e.full}if(d.isIE){if(c&&(!e||!f.fileEnabled)){return 0}if(!h.HTML){h.HTML=d.insertHTML("object",["classid",f.classID],["src",c&&e?e:""],a,f)}if(c){f.fileUsed=1}}else{if(!e||!f.fileEnabled){return 0}if(!h.HTML){h.HTML=d.insertHTML("object",["type",f.mimeType,"data",e],["src",e],a,f)}f.fileUsed=1}if(f.OTF<2){f.OTF=2}if(!h.DummyObjTagHTML){h.DummyObjTagHTML=d.insertHTML("object",[],[],a)}if(!h.DummySpanTagHTML){h.DummySpanTagHTML=d.insertHTML("",[],[],a)}i=h.queryObject();if(i!==0){return i};var g=f.NOTF;if(f.OTF<3&&h.HTML&&g){f.OTF=3;g.onIntervalQuery=d.handler(g.$$onIntervalQuery,g);if(!d.winLoaded){d.WLfuncs0.push([g.winOnLoadQuery,g])}setTimeout(g.onIntervalQuery,g.intervalLength)};return i}},NOTF:{count:0,countMax:25,intervalLength:250,$$onIntervalQuery:function(e){var c=e.$,b=e.parentNode,d=b.doc,a;if(b.OTF==3){a=d.queryObject(e.count);if(a>0||a<0||(c.winLoaded&&e.count>e.countMax)){e.queryCompleted(a)}}e.count++;if(b.OTF==3){setTimeout(e.onIntervalQuery,e.intervalLength)}},winOnLoadQuery:function(c,e){var b=e.parentNode,d=b.doc,a;if(b.OTF==3){a=d.queryObject(e.count);e.queryCompleted(a)}},queryCompleted:function(b){var d=this,c=d.$,a=d.parentNode;if(a.OTF==4){return}a.OTF=4;a.setPluginStatus(b>0?true:false,a.OTF);if(a.funcs){c.callArray(a.funcs)}if(c.onDoneEmptyDiv){c.onDoneEmptyDiv()}}},zz:0},realplayer:{mimeType:["audio/x-pn-realaudio-plugin"],progID:["rmocx.RealPlayer G2 Control","rmocx.RealPlayer G2 Control.1","RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)","RealVideo.RealVideo(tm) ActiveX Control (32-bit)","RealPlayer"],classID:"clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA",INSTALLED:{},q1:[[11,0,0],[999],[663],[663],[663],[660],[468],[468],[468],[468],[468],[468],[431],[431],[431],[372],[180],[180],[172],[172],[167],[114],[0]],q3:[[6,0],[12,99],[12,69],[12,69],[12,69],[12,69],[12,69],[12,69],[12,69],[12,69],[12,69],[12,69],[12,46],[12,46],[12,46],[11,3006],[11,2806],[11,2806],[11,2804],[11,2804],[11,2799],[11,2749],[11,2700]],compare:function(g,f){var e,d=g.length,i=f.length,c,h;for(e=0;e<Math.max(d,i);e++){c=e<d?g[e]:0;h=e<i?f[e]:0;if(c>h){return 1}if(c<h){return -1}}return 0},convertNum:function(a,f,e){var g=this,c=g.$,d,b,h,i=null;if(!a||!(d=c.formatNum(a))){return i}d=d.split(c.splitNumRegx);for(h=0;h<d.length;h++){d[h]=parseInt(d[h],10)}if(g.compare(d.slice(0,Math.min(f[0].length,d.length)),f[0])!=0){return i}b=d.length>f[0].length?d.slice(f[0].length):[];if(g.compare(b,f[1])>0||g.compare(b,f[f.length-1])<0){return i}for(h=f.length-1;h>=1;h--){if(h==1){break}if(g.compare(f[h],b)==0&&g.compare(f[h],f[h-1])==0){break}if(g.compare(b,f[h])>=0&&g.compare(b,f[h-1])<0){break}}return e[0].join(".")+"."+e[h].join(".")},getVersion:function(m,n){var j=this,k=null,c=0,g=0,d=j.$,q,i,s,a=j.mimeType[0];if(d.isString(n)){n=n.replace(/\s/g,"");if(n){a=n}}else{n=null}if(d.isDefined(j.INSTALLED[a])){j.installed=j.INSTALLED[a];return}if(!d.isIE){var l="RealPlayer.*Plug-?in",h=d.hasMimeType(j.mimeType),o=d.findNavPlugin(l,0);if(h&&o){c=1;if(n){if(d.getMimeEnabledPlugin(n,l)){g=1}else{g=0}}else{g=1}}if(j.getVersionDone!==0){j.getVersionDone=0;if(h){var p=1,b=null,r=null;s=d.hasMimeType("application/vnd.rn-realplayer-javascript");if(s){b=d.formatNum(d.getNum(s.enabledPlugin.description))}if(d.OS==1&&b){var f=b.split(d.splitNumRegx);r=true;if(j.compare(f,[6,0,12,200])<0){r=false}else{if(j.compare(f,[6,0,12,1739])<=0&&j.compare(f,[6,0,12,857])>=0){r=false}}}if(r===false){p=0}if(d.OS<=2){if(d.isGecko&&d.compareNums(d.verGecko,d.formatNum("1,8"))<0){p=0}if(d.isChrome){p=0}if(d.isOpera&&d.verOpera<10){p=0}}else{p=0}if(p){s=d.insertHTML("object",["type",j.mimeType[0]],["src","","autostart","false","imagestatus","false","controls","stopbutton"],"",j);s=d.getDOMobj(s);try{k=d.getNum(s.GetVersionInfo())}catch(q){}d.setStyle(s,["display","none"])}if(!k&&b&&r===false){s=j.convertNum(b,j.q3,j.q1);k=s?s:b}}}else{k=j.version}j.installed=c&&g&&k?1:(c&&g?0:(c?-0.2:-1))}else{s=null;for(i=0;i<j.progID.length;i++){s=d.getAXO(j.progID[i]);if(s){try{k=d.getNum(s.GetVersionInfo());break}catch(q){}}}j.installed=k?1:-1}if(!j.version){j.version=d.formatNum(k)}j.INSTALLED[a]=j.installed}},zz:0};PluginDetect.initScript();

var IaDfp = (function () {
    var api         = {},
        SEP         = '|',
        PAIR        = '=',
        VERSION_DELIMITER = '.',
        version     = '2',
        verPrefix	= "_v02",
        fds_ua      = navigator.userAgent.toLowerCase(),
        fds_opera   = fds_ua.indexOf("opera") >= 0,
        fds_ie      = fds_ua.indexOf("msie") >= 0 && !fds_opera,
        fds_iemac   = fds_ie && fds_ua.indexOf("mac") >= 0,
        fds_moz     = fds_ua.indexOf("mozilla") && !fds_ie && !fds_opera,
        fds_os      = navigator.platform,
        Modernizr   = null,
        iaTagName1  = "__vip_ia_tag__",
        iaTagName2  = "_ia01",
        tName		= "_iat1",
        iaTagIdKey  = "_ia_tag_id",
        tagNameFromCookie = iaTagName2 + "_" ;
	//+ parentDomainToBeTagged;


    /*
	 * Modernizr custom build of 1.7pre: fontface | flexbox | textshadow | rgba |
	 * hsla | borderimage | borderradius | boxshadow | opacity | backgroundsize |
	 * multiplebgs | cssanimations | csscolumns | cssgradients | cssreflections |
	 * csstransforms | csstransforms3d | csstransitions | applicationcache |
	 * canvas | canvastext | draganddrop | hashchange | history | audio | video |
	 * indexeddb | inputtypes | input | localstorage | postmessage |
	 * sessionstorage | webworkers | websockets | websqldatabase | geolocation |
	 * inlinesvg | svg | smil | svgclippaths | touch | webgl | iepp
	 */
    /* Modernizr.load enabled */
        // MYC - Fixed mixed content security warning in IE6, 7.
    // Modernizr=function(a,b,c){function G(){e.input=function(a){for(var
	// b=0,c=a.length;b<c;b++)t[a[b]]=!!(a[b]in l);return t}("autocomplete
	// autofocus list placeholder max min multiple pattern required
	// step".split(" ")),e.inputtypes=function(a){for(var
	// d=0,e,f,h,i=a.length;d<i;d++)l.setAttribute("type",f=a[d]),e=l.type!=="text",e&&(l.value=m,l.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&l.style.WebkitAppearance!==c?(g.appendChild(l),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(l,null).WebkitAppearance!=="textfield"&&l.offsetHeight!==0,g.removeChild(l)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=l.checkValidity&&l.checkValidity()===!1:/^color$/.test(f)?(g.appendChild(l),g.offsetWidth,e=l.value!=m,g.removeChild(l)):e=l.value!=m)),s[a[d]]=!!e;return
	// s}("search tel url email datetime date month week time datetime-local
	// number range color".split(" "))}function F(a,b){var
	// c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+p.join(c+" ")+c).split("
	// ");return!!E(d,b)}function E(a,b){for(var d in
	// a)if(k[a[d]]!==c&&(!b||b(a[d],j)))return!0}function
	// D(a,b){return(""+a).indexOf(b)!==-1}function C(a,b){return typeof
	// a===b}function B(a,b){return A(o.join(a+";")+(b||""))}function
	// A(a){k.cssText=a}var
	// d="1.7pre",e={},f=!0,g=b.documentElement,h=b.head||b.getElementsByTagName("head")[0],i="modernizr",j=b.createElement(i),k=j.style,l=b.createElement("input"),m=":)",n=Object.prototype.toString,o="
	// -webkit- -moz- -o- -ms- -khtml- ".split(" "),p="Webkit Moz O ms
	// Khtml".split("
	// "),q={svg:"http://www.w3.org/2000/svg"},r={},s={},t={},u=[],v,w=function(a){var
	// c=b.createElement("style"),d=b.createElement("div"),e;c.textContent=a+"{#modernizr{height:3px}}",h.appendChild(c),d.id="modernizr",g.appendChild(d),e=d.offsetHeight===3,c.parentNode.removeChild(c),d.parentNode.removeChild(d);return!!e},x=function(){function
	// d(d,e){e=e||b.createElement(a[d]||"div");var f=(d="on"+d)in
	// e;f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=C(e[d],"function"),C(e[d],c)||(e[d]=c),e.removeAttribute(d))),e=null;return
	// f}var
	// a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return
	// d}(),y=({}).hasOwnProperty,z;C(y,c)||C(y.call,c)?z=function(a,b){return b
	// in a&&C(a.constructor.prototype[b],c)}:z=function(a,b){return
	// y.call(a,b)},r.flexbox=function(){function
	// c(a,b,c,d){a.style.cssText=o.join(b+":"+c+";")+(d||"")}function
	// a(a,b,c,d){b+=":",a.style.cssText=(b+o.join(c+";"+b)).slice(0,-b.length)+(d||"")}var
	// d=b.createElement("div"),e=b.createElement("div");a(d,"display","box","width:42px;padding:0;"),c(e,"box-flex","1","width:10px;"),d.appendChild(e),g.appendChild(d);var
	// f=e.offsetWidth===42;d.removeChild(e),g.removeChild(d);return
	// f},r.canvas=function(){var a=b.createElement("canvas");return
	// a.getContext&&a.getContext("2d")},r.canvastext=function(){return
	// e.canvas&&C(b.createElement("canvas").getContext("2d").fillText,"function")},r.webgl=function(){return!!a.WebGLRenderingContext},r.touch=function(){return"ontouchstart"in
	// a||w("@media
	// ("+o.join("touch-enabled),(")+"modernizr)")},r.geolocation=function(){return!!navigator.geolocation},r.postmessage=function(){return!!a.postMessage},r.websqldatabase=function(){var
	// b=!!a.openDatabase;return b},r.indexedDB=function(){for(var
	// b=-1,c=p.length;++b<c;){var
	// d=p[b].toLowerCase();if(a[d+"_indexedDB"]||a[d+"IndexedDB"])return!0}return!1},r.hashchange=function(){return
	// x("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},r.history=function(){return
	// a.history&&history.pushState},r.draganddrop=function(){return
	// x("dragstart")&&x("drop")},r.websockets=function(){return"WebSocket"in
	// a},r.rgba=function(){A("background-color:rgba(150,255,150,.5)");return
	// D(k.backgroundColor,"rgba")},r.hsla=function(){A("background-color:hsla(120,40%,100%,.5)");return
	// D(k.backgroundColor,"rgba")||D(k.backgroundColor,"hsla")},r.multiplebgs=function(){A("background:url(//:),url(//:),red
	// url(//:)");return(new
	// RegExp("(url\\s*\\(.*?){3}")).test(k.background)},r.backgroundsize=function(){return
	// F("backgroundSize")},r.borderimage=function(){return
	// F("borderImage")},r.borderradius=function(){return
	// F("borderRadius","",function(a){return
	// D(a,"orderRadius")})},r.boxshadow=function(){return
	// F("boxShadow")},r.textshadow=function(){return
	// b.createElement("div").style.textShadow===""},r.opacity=function(){B("opacity:.55");return/^0.55$/.test(k.opacity)},r.cssanimations=function(){return
	// F("animationName")},r.csscolumns=function(){return
	// F("columnCount")},r.cssgradients=function(){var
	// a="background-image:",b="gradient(linear,left top,right
	// bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9,
	// white);";A((a+o.join(b+a)+o.join(c+a)).slice(0,-a.length));return
	// D(k.backgroundImage,"gradient")},r.cssreflections=function(){return
	// F("boxReflect")},r.csstransforms=function(){return!!E(["transformProperty","WebkitTransform","MozTransform","OTransform","msTransform"])},r.csstransforms3d=function(){var
	// a=!!E(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]);a&&"webkitPerspective"in
	// g.style&&(a=w("@media ("+o.join("transform-3d),(")+"modernizr)"));return
	// a},r.csstransitions=function(){return
	// F("transitionProperty")},r.fontface=function(){var
	// a,c,d=h||g,e=b.createElement("style"),f=b.implementation||{hasFeature:function(){return!1}};e.type="text/css",d.insertBefore(e,d.firstChild),a=e.sheet||e.styleSheet;var
	// i=f.hasFeature("CSS2","")?function(b){if(!a||!b)return!1;var
	// c=!1;try{a.insertRule(b,0),c=/src/i.test(a.cssRules[0].cssText),a.deleteRule(a.cssRules.length-1)}catch(d){}return
	// c}:function(b){if(!a||!b)return!1;a.cssText=b;return
	// a.cssText.length!==0&&/src/i.test(a.cssText)&&a.cssText.replace(/\r+|\n+/g,"").indexOf(b.split("
	// ")[0])===0};c=i('@font-face { font-family: "font"; src: "//:";
	// }'),d.removeChild(e);return c},r.video=function(){var
	// a=b.createElement("video"),c=!!a.canPlayType;if(c){c=new
	// Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"');var
	// d='video/mp4;
	// codecs="avc1.42E01E';c.h264=a.canPlayType(d+'"')||a.canPlayType(d+',
	// mp4a.40.2"'),c.webm=a.canPlayType('video/webm; codecs="vp8,
	// vorbis"')}return c},r.audio=function(){var
	// a=b.createElement("audio"),c=!!a.canPlayType;c&&(c=new
	// Boolean(c),c.ogg=a.canPlayType('audio/ogg;
	// codecs="vorbis"'),c.mp3=a.canPlayType("audio/mpeg;"),c.wav=a.canPlayType('audio/wav;
	// codecs="1"'),c.m4a=a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;"));return
	// c},r.localstorage=function(){try{return!!localStorage.getItem}catch(a){return!1}},r.sessionstorage=function(){try{return!!sessionStorage.getItem}catch(a){return!1}},r.webWorkers=function(){return!!a.Worker},r.applicationcache=function(){return!!a.applicationCache},r.svg=function(){return!!b.createElementNS&&!!b.createElementNS(q.svg,"svg").createSVGRect},r.inlinesvg=function(){var
	// a=b.createElement("div");a.innerHTML="<svg/>";return(a.firstChild&&a.firstChild.namespaceURI)==q.svg},r.smil=function(){return!!b.createElementNS&&/SVG/.test(n.call(b.createElementNS(q.svg,"animate")))},r.svgclippaths=function(){return!!b.createElementNS&&/SVG/.test(n.call(b.createElementNS(q.svg,"clipPath")))};for(var
	// H in
	// r)z(r,H)&&(v=H.toLowerCase(),e[v]=r[H](),u.push((e[v]?"":"no-")+v));e.input||G(),e.crosswindowmessaging=e.postmessage,e.historymanagement=e.history,e.addTest=function(a,b){a=a.toLowerCase();if(!e[a]){b=!!b(),g.className+="
	// "+(b?"":"no-")+a,e[a]=b;return
	// e}},A(""),j=l=null,f&&a.attachEvent&&function(){var
	// a=b.createElement("div");a.innerHTML="<elem></elem>";return
	// a.childNodes.length!==1}()&&function(a,b){function p(a,b){var
	// c=-1,d=a.length,e,f=[];while(++c<d)e=a[c],(b=e.media||b)!="screen"&&f.push(p(e.imports,b),e.cssText);return
	// f.join("")}function o(a){var b=-1;while(++b<e)a.createElement(d[b])}var
	// c="abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",d=c.split("|"),e=d.length,f=new
	// RegExp("(^|\\s)("+c+")","gi"),g=new RegExp("<(/*)("+c+")","gi"),h=new
	// RegExp("(^|[^\\n]*?\\s)("+c+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),i=b.createDocumentFragment(),j=b.documentElement,k=j.firstChild,l=b.createElement("body"),m=b.createElement("style"),n;o(b),o(i),k.insertBefore(m,k.firstChild),m.media="print",a.attachEvent("onbeforeprint",function(){var
	// a=-1,c=p(b.styleSheets,"all"),k=[],o;n=n||b.body;while((o=h.exec(c))!=null)k.push((o[1]+o[2]+o[3]).replace(f,"$1.iepp_$2")+o[4]);m.styleSheet.cssText=k.join("\n");while(++a<e){var
	// q=b.getElementsByTagName(d[a]),r=q.length,s=-1;while(++s<r)q[s].className.indexOf("iepp_")<0&&(q[s].className+="
	// iepp_"+d[a])}i.appendChild(n),j.appendChild(l),l.className=n.className,l.innerHTML=n.innerHTML.replace(g,"<$1font")}),a.attachEvent("onafterprint",function(){l.innerHTML="",j.removeChild(l),j.appendChild(n),m.styleSheet.cssText=""})}(a,b),e._enableHTML5=f,e._version=d,g.className=g.className.replace(/\bno-js\b/,"")+"
	// js "+u.join(" ");return e}(this,this.document),function(a,b,c){function
	// E(){var a=w;a.loader={load:D,i:0};return a}function D(a,b,c){var
	// e=b=="c"?o:n;i=0,b=b||"j",r(a)?C(e,a,b,this.i++,d,c):h.splice(this.i++,0,a);return
	// this}function C(a,c,d,f,g,j){function
	// o(){!m&&x(k.readyState)&&(n.r=m=1,!i&&y(),k.onload=k.onreadystatechange=null,g.removeChild(k))}var
	// k=b.createElement(a),m=0,n={t:d,s:c,e:j};k.src=k.data=c,k.width=k.height="0",a!="object"&&(k.type=d),k.onload=k.onreadystatechange=o,a=="img"?k.onerror=o:a=="script"&&(k.onerror=function(){n.r=1,B(1)}),h.splice(f,0,n),g.appendChild(k),(l&&a=="script"||a=="object")&&e(function(){m||(g.removeChild(k),n.r=n.e=m=1,y())},w.errorTimeout)}function
	// B(a){var
	// b=h.shift(),d=b?b.s:c,f=b?b.t:c;i=1,a&&d&&(b=h.shift(),d=c),b?d&&f=="j"?e(function(){z(b)},0):d&&f=="c"?A(b):(b(),y()):i=0}function
	// A(a){var
	// c=b.createElement("link"),g;c.href=a.s,c.rel="stylesheet",c.type="text/css",a.e||!m&&!j?(c.onload=function(){g||(g=1,e(function(){y()},0))},a.e&&c.onload()):function
	// h(a){e(function(){if(!g)try{a.sheet&&a.sheet.cssRules&&a.sheet.cssRules.length?(g=1,y()):h(a)}catch(b){b.code==1e3||b.message.match(/security|denied/i)?(g=1,e(function(){y()},0)):h(a)}},0)}(c),e(function(){g||(g=1,d.removeChild(c),y())},w.errorTimeout),!a.e&&d.insertBefore(c,f)}function
	// z(a){var
	// c=b.createElement("script"),f;c.src=a.s,c.onreadystatechange=c.onload=function(){!f&&x(c.readyState)&&(f=1,y(),c.onload=c.onreadystatechange=null,!a.e&&d.removeChild(c))},e(function(){f||(f=1,d.removeChild(c),y())},w.errorTimeout),a.e?c.onload():d.appendChild(c)}function
	// y(){var a=1,b=-1;while(h.length-
	// ++b)if(h[b].s&&!(a=h[b].r))break;a&&B()}function
	// x(a){return!a||a=="loaded"||a=="complete"}var
	// d=b.documentElement,e=a.setTimeout,f=b.getElementsByTagName("head")[0],g=({}).toString,h=[],i=0,j="MozAppearance"in
	// d.style,k=j&&!!a.Event.prototype.preventBubble,l=a.opera&&g.call(a.opera)=="[object
	// Opera]",m="webkitAppearance"in
	// d.style,n=l||j&&!k?"img":j?"object":"script",o=m?"img":n,p=Array.isArray||function(a){return
	// g.call(a)=="[object Array]"},q=function(a){return typeof
	// a=="object"},r=function(a){return typeof
	// a=="string"},s=function(a){return g.call(a)=="[object
	// Function]"},t=[],u={},v,w;w=function(a){function h(a,b){function
	// i(a){if(r(a))g(a,f,b,0,c);else if(q(a))for(h in
	// a)a.hasOwnProperty(h)&&g(a[h],f,b,h,c)}var
	// c=!!a.test,d=c?a.yep:a.nope,e=a.load||a.both,f=a.callback,h;i(d),i(e),a.complete&&b.load(a.complete)}function
	// g(a,b,d,e,g){var
	// h=f(a),i=h.autoCallback;if(!h.bypass){b&&(b=s(b)?b:b[a]||b[e]||b[a.split("/").pop().split("?")[0]]);if(h.instead)return
	// h.instead(a,b,d,e,g);d.load(h.url,h.forceCSS||!h.forceJS&&/css$/.test(h.url)?"c":c,h.noexec),(s(b)||s(i))&&d.load(function(){E(),b&&b(h.origUrl,g,e),i&&i(h.origUrl,g,e)})}}function
	// f(a){var
	// b=a.split("!"),c=t.length,d=b.pop(),e=b.length,f={url:d,origUrl:d,prefixes:b},g,h;for(h=0;h<e;h++)g=u[b[h]],g&&(f=g(f));for(h=0;h<c;h++)f=t[h](f);return
	// f}var b,d,e=this.yepnope.loader;if(r(a))g(a,0,e,0);else
	// if(p(a))for(b=0;b<a.length;b++)d=a[b],r(d)?g(d,0,e,0):p(d)?w(d):q(d)&&h(d,e);else
	// q(a)&&h(a,e)},w.addPrefix=function(a,b){u[a]=b},w.addFilter=function(a){t.push(a)},w.errorTimeout=1e4,b.readyState==null&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",v=function(){b.removeEventListener("DOMContentLoaded",v,0),b.readyState="complete"},0)),a.yepnope=w=E()}(this,this.document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
        
    // GSK
    // artf 108351( Javascript error "Not Implemented" in iadfp.js )
    // Solution - Use newer version of modernizr script since it handles
	// javascript errors for Win 2008 and IE 9 gracefully and exits gracefully.
    // Also added changes for bug fix - MYC - Fixed mixed content security
	// warning in IE6, 7.
    /*
	 * Modernizr 2.6.2 (Custom Build) | MIT & BSD Build:
	 * http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-flexboxlegacy-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-printshiv-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
	 */
    Modernizr=function(a,b,c){function B(a){i.cssText=a}function C(a,b){return B(m.join(a+";")+(b||""))}function D(a,b){return typeof a===b}function E(a,b){return!!~(""+a).indexOf(b)}function F(a,b){for(var d in a){var e=a[d];if(!E(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function G(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:D(f,"function")?f.bind(d||b):f}return!1}function H(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return D(b,"string")||D(b,"undefined")?F(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),G(e,b,c))}function I(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)t[c[d]]=c[d]in j;return t.list&&(t.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),t}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,g,h,i=a.length;d<i;d++)j.setAttribute("type",g=a[d]),e=j.type!=="text",e&&(j.value=k,j.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(g)&&j.style.WebkitAppearance!==c?(f.appendChild(j),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(j,null).WebkitAppearance!=="textfield"&&j.offsetHeight!==0,f.removeChild(j)):/^(search|tel)$/.test(g)||(/^(url|email)$/.test(g)?e=j.checkValidity&&j.checkValidity()===!1:e=j.value!=k)),s[a[d]]=!!e;return s}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.6.2",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j=b.createElement("input"),k=":)",l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={svg:"http://www.w3.org/2000/svg"},r={},s={},t={},u=[],v=u.slice,w,x=function(a,c,d,e){var h,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:g+(d+1),l.appendChild(j);return h=["&#173;",'<style id="s',g,'">',a,"</style>"].join(""),l.id=g,(m?l:n).innerHTML+=h,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=f.style.overflow,f.style.overflow="hidden",f.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),f.style.overflow=k),!!i},y=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=D(e[d],"function"),D(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),z={}.hasOwnProperty,A;!D(z,"undefined")&&!D(z.call,"undefined")?A=function(a,b){return z.call(a,b)}:A=function(a,b){return b in a&&D(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=v.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(v.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(v.call(arguments)))};return e}),r.flexbox=function(){return H("flexWrap")},r.flexboxlegacy=function(){return H("boxDirection")},r.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},r.canvastext=function(){return!!e.canvas&&!!D(b.createElement("canvas").getContext("2d").fillText,"function")},r.webgl=function(){return!!a.WebGLRenderingContext},r.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:x(["@media (",m.join("touch-enabled),("),g,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},r.geolocation=function(){return"geolocation"in navigator},r.postmessage=function(){return!!a.postMessage},r.websqldatabase=function(){return!!a.openDatabase},r.indexedDB=function(){return!!H("indexedDB",a)},r.hashchange=function(){return y("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},r.history=function(){return!!a.history&&!!history.pushState},r.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},r.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},r.rgba=function(){return B("background-color:rgba(150,255,150,.5)"),E(i.backgroundColor,"rgba")},r.hsla=function(){return B("background-color:hsla(120,40%,100%,.5)"),E(i.backgroundColor,"rgba")||E(i.backgroundColor,"hsla")},r.multiplebgs=function(){return B("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(i.background)},r.backgroundsize=function(){return H("backgroundSize")},r.borderimage=function(){return H("borderImage")},r.borderradius=function(){return H("borderRadius")},r.boxshadow=function(){return H("boxShadow")},r.textshadow=function(){return b.createElement("div").style.textShadow===""},r.opacity=function(){return C("opacity:.55"),/^0.55$/.test(i.opacity)},r.cssanimations=function(){return H("animationName")},r.csscolumns=function(){return H("columnCount")},r.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return B((a+"-webkit- ".split(" ").join(b+a)+m.join(c+a)).slice(0,-a.length)),E(i.backgroundImage,"gradient")},r.cssreflections=function(){return H("boxReflect")},r.csstransforms=function(){return!!H("transform")},r.csstransforms3d=function(){var a=!!H("perspective");return a&&"webkitPerspective"in f.style&&x("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},r.csstransitions=function(){return H("transition")},r.fontface=function(){var a;return x('@font-face {font-family:"font";src:"//:";}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},r.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},r.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},r.localstorage=function(){try{return localStorage.setItem(g,g),localStorage.removeItem(g),!0}catch(a){return!1}},r.sessionstorage=function(){try{return sessionStorage.setItem(g,g),sessionStorage.removeItem(g),!0}catch(a){return!1}},r.webworkers=function(){return!!a.Worker},r.applicationcache=function(){return!!a.applicationCache},r.svg=function(){return!!b.createElementNS&&!!b.createElementNS(q.svg,"svg").createSVGRect},r.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==q.svg},r.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(l.call(b.createElementNS(q.svg,"animate")))},r.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(l.call(b.createElementNS(q.svg,"clipPath")))};for(var J in r)A(r,J)&&(w=J.toLowerCase(),e[w]=r[J](),u.push((e[w]?"":"no-")+w));return e.input||I(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)A(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},B(""),h=j=null,e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.hasEvent=y,e.testProp=function(a){return F([a])},e.testAllProps=H,e.testStyles=x,e}(this,this.document),function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}function v(a){var b,c=a.getElementsByTagName("*"),d=c.length,e=RegExp("^(?:"+l().join("|")+")$","i"),f=[];while(d--)b=c[d],e.test(b.nodeName)&&f.push(b.applyElement(w(b)));return f}function w(a){var b,c=a.attributes,d=c.length,e=a.ownerDocument.createElement(t+":"+a.nodeName);while(d--)b=c[d],b.specified&&e.setAttribute(b.nodeName,b.nodeValue);return e.style.cssText=a.style.cssText,e}function x(a){var b,c=a.split("{"),d=c.length,e=RegExp("(^|[\\s,>+~])("+l().join("|")+")(?=[[\\s,>+~#.:]|$)","gi"),f="$1"+t+"\\:$2";while(d--)b=c[d]=c[d].split("}"),b[b.length-1]=b[b.length-1].replace(e,f),c[d]=b.join("}");return c.join("{")}function y(a){var b=a.length;while(b--)a[b].removeNode()}function z(a){function g(){clearTimeout(d._removeSheetTimer),b&&b.removeNode(!0),b=null}var b,c,d=m(a),e=a.namespaces,f=a.parentWindow;return!u||a.printShived?a:(typeof e[t]=="undefined"&&e.add(t),f.attachEvent("onbeforeprint",function(){g();var d,e,f,h=a.styleSheets,i=[],j=h.length,l=Array(j);while(j--)l[j]=h[j];while(f=l.pop())if(!f.disabled&&s.test(f.media)){try{d=f.imports,e=d.length}catch(m){e=0}for(j=0;j<e;j++)l.push(d[j]);try{i.push(f.cssText)}catch(m){}}i=x(i.reverse().join("")),c=v(a),b=k(a,i)}),f.attachEvent("onafterprint",function(){y(c),clearTimeout(d._removeSheetTimer),d._removeSheetTimer=setTimeout(g,500)}),a.printShived=!0,a)}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b);var s=/^$|\b(?:all|print)\b/,t="html5shiv",u=!j&&function(){var c=b.documentElement;return typeof b.namespaces!="undefined"&&typeof b.parentWindow!="undefined"&&typeof c.applyElement!="undefined"&&typeof c.removeNode!="undefined"&&typeof a.attachEvent!="undefined"}();r.type+=" print",r.shivPrint=z,z(b)}(this,document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};    
    	        
	function getTag(name) {
		return store.get(name);
	}
	
	function setTag(name, tag) {
		store.set(name, tag);
	}
	
	function removeTag(name) {
		store.remove(name);
	}
	
	function activeXDetect(componentClassID) {
		componentVersion = document.body.getComponentVersion('{'+componentClassID+'}','ComponentID');
		return (componentVersion != null) ? componentVersion : false;
	}

	function stripIllegalChars(value) {
		var t = "";
		// first we need to escape any "\n" or "/" or "\"
		value = value.toLowerCase();
		for (var i=0; i < value.length; i++) {
			if (value.charAt(i) != '\n' && value.charAt(i) != '/' && value.charAt(i) != "\\") {
				t += value.charAt(i);
			}
			else if (value.charAt(i) == '\n') {
				t += "n";
			}
		}
		return t;
	}
	
	function normalizePlugin(plugin) {
		if (!plugin) return "";
		var cleaned = plugin.replace("|", "");
		var sizeCap = 32;
		if (cleaned.length > sizeCap) {
			return SHA1(cleaned).substring(0, sizeCap);
		}
		else {
			return cleaned;
		}
	}

	/* fingerprinting functions */	
	
	function fingerprint_browser() {
		return navigator.userAgent + SEP + navigator.platform;
	}
	
	function fingerprint_display() {
		var t = "";
		if (self.screen) {
			t += screen.colorDepth + SEP + screen.width + SEP + screen.height + SEP + screen.availWidth + SEP + screen.availHeight;
		}
		return t;
	}

	function fingerprint_software() {
		var t = "";
		var isFirst = true;
		if (navigator.plugins.length > 0) {
			var temp = "";
			var numPlugins = Math.min(navigator.plugins.length, 30);
			for (var i=0; i < numPlugins; i++) {
				var plugin = navigator.plugins[i];
				var normPlugin = normalizePlugin(plugin.filename);
				if (isFirst) {
					temp += normPlugin;
					isFirst=false;
				}
				else {
					temp += SEP + normPlugin;
				}
			}
			t = stripIllegalChars(temp);
		}
		else if (fds_ie) 
		{
			names = new Array(
			"abk", // Address Book
			"wnt", // Windows Desktop Update NT
			"aol", // AOL ART Image Format Support
			"arb", // Arabic Text Display Support
			"chs", // Chinese (Simplified) Text Display Support
			"cht", // Chinese (traditional) Text Display Support
			"dht", // Dynamic HTML Data Binding
			"dhj", // Dynamic HTML Data Binding for Java
			"dan", // DirectAnimation
			"dsh", // DirectShow
			"heb", // Hebrew Text Display Support
			"ie5", // Internet Explorer 5 Browser
			"icw", // Internet Connection Wizard
			"ibe", // Internet Explorer Browsing Enhancements
			"iec", // Internet Explorer Classes for Java
			"ieh", // Internet Explorer Help
			"iee", // Internet Explorer Help Engine
			"jap", // Japanese Text Display Support
			"krn", // Korean Text Display Support
			"lan", // Language Auto-Selection
			"swf", // Macromedia Flash
			"shw", // Macromedia Shockwave Director
			"msn", // MSN Messenger Service
			"wmp", // Windows Media Player
			"obp", // Offline Browsing Pack
			"oex", // Outlook Express
			"net", // NetMeeting NT
			"pan", // Pan-European Text Display Support
			"thi", // Thai Text Display Support
			"tks", // Task Scheduler
			"uni", // Uniscribe
			"vtc", // Vector Graphics Rendering (VML)
			"vnm", // Vietnamese Text Display Support
			"mvm", // Microsoft virtual machine
			"vbs", // Visual Basic Scripting Support
			"wfd"  // Web Folders
			);	
			
			/*
			 * create a table of IE components guids
			 */			
			components = new Array(
			"7790769C-0471-11D2-AF11-00C04FA35D02", 
			"89820200-ECBD-11CF-8B85-00AA005B4340", 
			"47F67D00-9E55-11D1-BAEF-00C04FC2D130", 
			"76C19B38-F0C8-11CF-87CC-0020AFEECF20", 
			"76C19B34-F0C8-11CF-87CC-0020AFEECF20",  
			"76C19B33-F0C8-11CF-87CC-0020AFEECF20",  
			"9381D8F2-0288-11D0-9501-00AA00B911A5", 
			"4F216970-C90C-11D1-B5C7-0000F8051515", 
			"283807B5-2C60-11D0-A31D-00AA00B92C03", 
			"44BBA848-CC51-11CF-AAFA-00AA00B6015C", 
			"76C19B36-F0C8-11CF-87CC-0020AFEECF20", 
			"89820200-ECBD-11CF-8B85-00AA005B4383", 
			"5A8D6EE0-3E18-11D0-821E-444553540000", 
			"630B1DA0-B465-11D1-9948-00C04F98BBC9", 
			"08B0E5C0-4FCB-11CF-AAA5-00401C608555", 
			"45EA75A0-A269-11D1-B5BF-0000F8051515", 
			"DE5AED00-A4BF-11D1-9948-00C04F98BBC9", 
			"76C19B30-F0C8-11CF-87CC-0020AFEECF20", 
			"76C19B31-F0C8-11CF-87CC-0020AFEECF20", 
			"76C19B50-F0C8-11CF-87CC-0020AFEECF20", 
			"D27CDB6E-AE6D-11CF-96B8-444553540000",
			"2A202491-F00D-11CF-87CC-0020AFEECF20", 
			"5945C046-LE7D-LLDL-BC44-00C04FD912BE", 
			"22D6F312-B0F6-11D0-94AB-0080C74C7E95", 
			"3AF36230-A269-11D1-B5BF-0000F8051515", 
			"44BBA840-CC51-11CF-AAFA-00AA00B6015C", 
			"44BBA842-CC51-11CF-AAFA-00AA00B6015B", 
			"76C19B32-F0C8-11CF-87CC-0020AFEECF20", 
			"76C19B35-F0C8-11CF-87CC-0020AFEECF20", 
			"CC2A9BA0-3BDD-11D0-821E-444553540000", 
			"3BF42070-B3B1-11D1-B5C5-0000F8051515", 
			"10072CEC-8CC1-11D1-986E-00A0C955B42F", 
			"76C19B37-F0C8-11CF-87CC-0020AFEECF20", 
			"08B0E5C0-4FCB-11CF-AAA5-00401C608500", 
			"4F645220-306D-11D2-995D-00C04F98BBC9", 
			"73FA19D0-2D75-11D2-995D-00C04F98BBC9" 		
			);

			document.body.addBehavior("#default#clientCaps")
			for (var i=0; i < components.length; i++) 
			{		
				ver = activeXDetect(components[i]);	
				var name = names[i];
				if (ver) 
				{
					if (isFirst==true) 
					{					
						t += name + PAIR + ver;
						isFirst=false;
					} 
					else 
					{
						t += SEP + name + PAIR + ver;
					}
				}
				else 
				{
					t +="";
					isFirst=false;
				}
			}
		}
		return t;
	}
	
	function fingerprint_plugins() {

		components = new Array(
				 "Flash",
				 "Java",
				 "QuickTime",
				 "DevalVR",
				 "Shockwave",
				 "WindowsMediaPlayer",
				 "Silverlight",
				 "VLC",
				 "pdfreader",
				 "adobereader",
				 "realplayer"
				);			
		
		names = new Array (
				"swf",	// Flash
				"java",	// Java
				"qt",	// QuickTime
				"vr",	// DevalVR
				"shw",	// Shockwave
				"wmp",	// WindowsMediaPlayer
				"xap",	// Silverlight
				"vlc",	// VLC
				"pdf",	// pdfreader
				"adbr",	// adobereader
				"rm"	// realplayer
				);
		
		var t = "";
		var isFirst = true;
		
		PluginDetect.getVersion(VERSION_DELIMITER); // set delimiter
		for (var i=0; i < components.length; i++) 
		{		
			ver = PluginDetect.getVersion(components[i]);	
			var name = names[i];
			if (ver) 
			{
				if (isFirst==true) 
				{					
					t += name + PAIR + ver;
					isFirst=false;
				} 
				else 
				{
					t += SEP + name + PAIR + ver;
				}
			}
			else 
			{
				t +="";
				isFirst=false;
			}
		}		
		
		return t;
	}
	
	
	function fingerprint_timezone () {					
		var gmtHours = (new Date().getTimezoneOffset()/60)*(-1);				
		return gmtHours;
	}
		
	/*
	 * This function captures the user's browser language. Note: this is
	 * captured in the User Agent String, but this function provides more
	 * detailed information for IE (system language)
	 */		
	function fingerprint_language () {					
		var lang = "";

		lang += (typeof(navigator.language) != "undefined") ? navigator.language : "";
		lang += SEP;
		lang += (typeof(navigator.browserLanguage) != "undefined") ? navigator.browserLanguage : "";		
		lang += SEP;
		lang += (typeof(navigator.systemLanguage) != "undefined") ? navigator.systemLanguage : "";
		lang += SEP;
		lang += (typeof(navigator.userLanguage) != "undefined") ? navigator.userLanguage : "";
			
		return lang;
	}
	
	/*
	 * This function captures whether or not Java is enabled
	 */
	function fingerprint_capabilities() 
	{	
		var javaEnabled = (navigator.javaEnabled()) ? "1" : "0";

		var cookieEnabled=(navigator.cookieEnabled)? "1" : "0";
		// if not IE4+ nor NS6+
		if (typeof navigator.cookieEnabled=="undefined" && !cookieEnabled)
		{ 
			document.cookie="testcookie"
			cookieEnabled=(document.cookie.indexOf("testcookie")!=-1)? "1" : "0";
		}
		
		var s;
		try {
			s = new XMLSerializer();
		} catch (e) {
		}
		var serializerEnabled = (s) ? "1" : "0"
		
		var xmlEnabled = "0";
		try {
			new ActiveXObject("Microsoft.XMLDOM");
			xmlEnabled = "1";
		} catch (e) {
		}
		try {
			var parser = new DOMParser();
			xmlEnabled = "1";
		} catch (e) {
		}
		return javaEnabled + cookieEnabled + serializerEnabled + xmlEnabled + conv(Modernizr.fontface) + conv(Modernizr.flexbox) + conv(Modernizr.textshadow) + conv(Modernizr.rgba) + conv(Modernizr.hsla) + conv(Modernizr.borderimage) + conv(Modernizr.borderradius) + conv(Modernizr.boxshadow) + conv(Modernizr.opacity) + conv(Modernizr.backgroundsize) + conv(Modernizr.multiplebgs) + conv(Modernizr.cssanimations) + conv(Modernizr.csscolumns) + conv(Modernizr.cssgradients) + conv(Modernizr.cssreflections) + conv(Modernizr.csstransforms) + conv(Modernizr.csstransforms3d) + conv(Modernizr.csstransitions) + conv(Modernizr.applicationcache) + conv(Modernizr.canvas) + conv(Modernizr.canvastext) + conv(Modernizr.draganddrop) + conv(Modernizr.hashchange) + conv(Modernizr.history) + conv(Modernizr.audio) + conv(Modernizr.video) + conv(Modernizr.indexeddb) + conv(Modernizr.inputtypes.search) + conv(Modernizr.inputtypes.tel) + conv(Modernizr.inputtypes.url) + conv(Modernizr.inputtypes.email) + conv(Modernizr.inputtypes.datetime) + conv(Modernizr.inputtypes.date) + conv(Modernizr.inputtypes.month) + conv(Modernizr.inputtypes.week) + conv(Modernizr.inputtypes.time) + conv(Modernizr.inputtypes.datetimelocal) + conv(Modernizr.inputtypes.number) + conv(Modernizr.inputtypes.range) + conv(Modernizr.inputtypes.color) + conv(Modernizr.input.autocomplete) + conv(Modernizr.input.autofocus) + conv(Modernizr.input.list) + conv(Modernizr.input.placeholder) + conv(Modernizr.input.max) + conv(Modernizr.input.min) + conv(Modernizr.input.multiple) + conv(Modernizr.input.pattern) + conv(Modernizr.input.required) + conv(Modernizr.input.step) + conv(Modernizr.localstorage) + conv(Modernizr.postmessage) + conv(Modernizr.sessionstorage) + conv(Modernizr.webworkers) + conv(Modernizr.websockets) + conv(Modernizr.websqldatabase) + conv(Modernizr.geolocation) + conv(Modernizr.inlinesvg) + conv(Modernizr.svg) + conv(Modernizr.smil) + conv(Modernizr.svgclippaths) + conv(Modernizr.touch) + conv(Modernizr.webgl) + conv(Modernizr.iepp);		
	}
	
	function conv(boolVal) {
		return boolVal == true ? "1" : "0";
	}
	
	function fingerprint_iadid() {
		var element = document.getElementById("SYMC_VIP_IADID_ID");
		if (element) return element.value;
		else return "";
	}

	function getNonTagFp() 
	{
		var t = "fpua=" + fingerprint_browser("") + "&fpsc=" + fingerprint_display("") + "&fpsw=" + fingerprint_software("")
				+ "&fppi=" + fingerprint_plugins("")
				+ "&fptz=" + fingerprint_timezone("") + "&fpln=" + fingerprint_language("") + "&fpcp=" + fingerprint_capabilities("")
				+ "&fpvc=" + fingerprint_iadid() + "&fpvs=" + version;
		return t;
	}

	var Base64 = {
	 
		// private property
		_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	 
		// public method for encoding
		encode : function (input) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
	 
			input = Base64._utf8_encode(input);
	 
			while (i < input.length) {
	 
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
	 
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
	 
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
	 
				output = output +
				this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
				this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
	 
			}
	 
			return output;
		},
	 
		// private method for UTF-8 encoding
		_utf8_encode : function (string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";
	 
			for (var n = 0; n < string.length; n++) {
	 
				var c = string.charCodeAt(n);
	 
				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
	 
			}
	 
			return utftext;
		}
	}

	function SHA1 (msg) {
	
		function rotate_left(n,s) {
			var t4 = ( n<<s ) | (n>>>(32-s));
			return t4;
		};
	
		function lsb_hex(val) {
			var str="";
			var i;
			var vh;
			var vl;
	
			for( i=0; i<=6; i+=2 ) {
				vh = (val>>>(i*4+4))&0x0f;
				vl = (val>>>(i*4))&0x0f;
				str += vh.toString(16) + vl.toString(16);
			}
			return str;
		};
	
		function cvt_hex(val) {
			var str="";
			var i;
			var v;
	
			for( i=7; i>=0; i-- ) {
				v = (val>>>(i*4))&0x0f;
				str += v.toString(16);
			}
			return str;
		};
	
	
		function Utf8Encode(string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";
	
			for (var n = 0; n < string.length; n++) {
	
				var c = string.charCodeAt(n);
	
				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
	
			}
	
			return utftext;
		};
	
		var blockstart;
		var i, j;
		var W = new Array(80);
		var H0 = 0x67452301;
		var H1 = 0xEFCDAB89;
		var H2 = 0x98BADCFE;
		var H3 = 0x10325476;
		var H4 = 0xC3D2E1F0;
		var A, B, C, D, E;
		var temp;
	
		msg = Utf8Encode(msg);
	
		var msg_len = msg.length;
	
		var word_array = new Array();
		for( i=0; i<msg_len-3; i+=4 ) {
			j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
			msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
			word_array.push( j );
		}
	
		switch( msg_len % 4 ) {
			case 0:
				i = 0x080000000;
			break;
			case 1:
				i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
			break;
	
			case 2:
				i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
			break;
	
			case 3:
				i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8	| 0x80;
			break;
		}
	
		word_array.push( i );
	
		while( (word_array.length % 16) != 14 ) word_array.push( 0 );
	
		word_array.push( msg_len>>>29 );
		word_array.push( (msg_len<<3)&0x0ffffffff );
	
	
		for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
	
			for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
			for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
	
			A = H0;
			B = H1;
			C = H2;
			D = H3;
			E = H4;
	
			for( i= 0; i<=19; i++ ) {
				temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
				E = D;
				D = C;
				C = rotate_left(B,30);
				B = A;
				A = temp;
			}
	
			for( i=20; i<=39; i++ ) {
				temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
				E = D;
				D = C;
				C = rotate_left(B,30);
				B = A;
				A = temp;
			}
	
			for( i=40; i<=59; i++ ) {
				temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
				E = D;
				D = C;
				C = rotate_left(B,30);
				B = A;
				A = temp;
			}
	
			for( i=60; i<=79; i++ ) {
				temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
				E = D;
				D = C;
				C = rotate_left(B,30);
				B = A;
				A = temp;
			}
	
			H0 = (H0 + A) & 0x0ffffffff;
			H1 = (H1 + B) & 0x0ffffffff;
			H2 = (H2 + C) & 0x0ffffffff;
			H3 = (H3 + D) & 0x0ffffffff;
			H4 = (H4 + E) & 0x0ffffffff;
	
		}
	
		var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
	
		return temp.toLowerCase();
	}

	var store = (function () {
	    var api               = {},
	        win               = window,
	        doc               = win.document,
	        localStorageName  = 'localStorage',
	        globalStorageName = 'globalStorage',
	        storage;
	
	    api.set    = function (key, value) {};
	    api.get    = function (key)        {};
	    api.remove = function (key)        {};
	    api.clear  = function ()           {};
	
	    if (localStorageName in win && win[localStorageName]) {
	        storage    = win[localStorageName];
	        api.set    = function (key, val) { storage.setItem(key, val) };
	        api.get    = function (key)      { return storage.getItem(key) };
	        api.remove = function (key)      { storage.removeItem(key) };
	        api.clear  = function ()         { storage.clear() };
	
	    } else if (globalStorageName in win && win[globalStorageName]) {
	        storage    = win[globalStorageName][win.location.hostname];
	        api.set    = function (key, val) { storage[key] = val };
	        api.get    = function (key)      { return storage[key] && storage[key].value };
	        api.remove = function (key)      { delete storage[key] };
	        api.clear  = function ()         { for (var key in storage ) { delete storage[key] } };
	
	    } else if (doc.documentElement.addBehavior) {
	        function getStorage() {
	            if (storage) { return storage }
	            storage = doc.body.appendChild(doc.createElement('div'));
	            storage.style.display = 'none';
	            // See
				// http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
	            // and
				// http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
	            storage.addBehavior('#default#userData');
	            storage.load(localStorageName);
	            return storage;
	        }
	        api.set = function (key, val) {
	            var storage = getStorage();
	            storage.setAttribute(key, val);
	            storage.save(localStorageName);
	        };
	        api.get = function (key) {
	            var storage = getStorage();
	            return storage.getAttribute(key);
	        };
	        api.remove = function (key) {
	            var storage = getStorage();
	            storage.removeAttribute(key);
	            storage.save(localStorageName);
	        }
	        api.clear = function () {
	            var storage = getStorage();
	            var attributes = storage.XMLDocument.documentElement.attributes;;
	            storage.load(localStorageName);
	            for (var i=0, attr; attr = attributes[i]; i++) {
	                storage.removeAttribute(attr.name);
	            }
	            storage.save(localStorageName);
	        }
	    }
	    return api;
	})();
	
	function randomFromTo(from, to){
		return Math.floor(Math.random() * (to - from + 1) + from);
	}
	
	function generateT () {
		var d = new Date();
		var t = d.getTime();
		var r = randomFromTo (10, 99);
		return r + "" + t;
	}
	
	function setCookie (name, value, expires, path, domain, secure) {
		// set time, it's in milliseconds
		var today = new Date();
		today.setTime(today.getTime());

		/*
		 * if the expires variable is set, make the correct expires time, the
		 * current script below will set it for x number of days, to make it for
		 * hours, delete * 24, for minutes, delete * 60 * 24
		 */
		if (expires) {
			expires = expires * 1000 * 60 * 60 * 24;
		}
		var expires_date = new Date(today.getTime() + (expires));

		document.cookie = name + "=" + escape(value) +
		( (expires) ? ";expires=" + expires_date.toGMTString() : "" ) +
		( (path) ? ";path=" + path : "" ) +
		( (domain) ? ";domain=" + domain : "" ) +
		( (secure) ? ";secure" : "" );
	}
	
	function getCookie(check_name) {
		// first we'll split this cookie up into name/value pairs
		// note: document.cookie only returns name=value, not the other
		// components
		var a_all_cookies = document.cookie.split(';');
		var a_temp_cookie = '';
		var cookie_name = '';
		var cookie_value = '';
		var b_cookie_found = false; // set boolean t/f default f

		for (i = 0; i < a_all_cookies.length; i++) {
			// now we'll split apart each name=value pair
			a_temp_cookie = a_all_cookies[i].split('=');

			// and trim left/right whitespace while we're at it
			cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

			// if the extracted name matches passed check_name
			if (cookie_name == check_name) {
				b_cookie_found = true;
				// we need to handle case where cookie has no value but exists
				// (no = sign, that is):
				if (a_temp_cookie.length > 1)	{
					cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
				}
				// note that in cases where cookie is initialized but no value,
				// null is returned
				return cookie_value;
				break;
			}
			a_temp_cookie = null;
			cookie_name = '';
		}
		if (!b_cookie_found) {
			return null;
		}
	}
	
	function encode(value) {
		var original = (unescape(encodeURIComponent(value)));
		var encoded = "";
		for (i=0; i<original.length; i++) {
			var x = original.charCodeAt(i);
			var y = x ^ 0x55;
			encoded = encoded + String.fromCharCode(y);
		}
		if (window.btoa) return verPrefix + window.btoa(encoded);
		else return verPrefix + Base64.encode(encoded);
	}

	function getFingerprint() {
		var tag1 = getTag(iaTagName1); // Old tag name "__vip_ia_tag__"
		var tag2 = getTag(iaTagName2); // New tag name "_ia01"
		var tagFromCookie = getCookie(tagNameFromCookie); // PATCH: Tag name on cookie "_ia01_"+parentDomainToBeTagged
		
		var tag = tag2 || tag1 || tagFromCookie || "";
		// if the tag retieved not from tag2
		if (tag && !tag2) { setTag(iaTagName2, tag);}
		// Migration clean up to the old tag
		if(tag1){ removeTag (iaTagName1);}		
		
		// Only set the cookie if parentDomainToBeTagged returned from the
		// server
		// if the tag is set, but cookie does not have this tag. Set it to the
		// cookie too.
		if(parentDomainToBeTagged && tag && !tagFromCookie){
			setCookie(tagNameFromCookie, tag, "365", "/", parentDomainToBeTagged, "");
		}

		var t = getCookie(tName);
		return getNonTagFp() + "&fpts=" + (t == null ? "" : t)
			+ "&fptg=" + (tag == null ? "" : tag) 
			+ (parentDomainToBeTagged ? "&parentDomain=" + parentDomainToBeTagged : "");
	}

	api.readFingerprint = function () {
		return encode(getFingerprint());
	};
	
	api.writeTag = function (tag, remember) {
		if (tag == "null")
			return;
		
		if (remember) {
			setTag(iaTagName2, tag);
			setCookie(tName, generateT(), "365", "/", "", "");
			
			// Only write the tag into cookie if parentDomainToBeTagged returned
			// from the server
			if(parentDomainToBeTagged){
				setCookie(tagNameFromCookie, tag, "365", "/", parentDomainToBeTagged, "");
			}						
		}				
	};
	
	api.writeTagId = function(tagId) {
		// README: for now we are using 1st party tag and has only 1 tag,
		// otherwise we need to add the account id and associate the tag id with
		// the tag
		store.set(iaTagIdKey, tagId);
		// Only write the tag ID into cookie if parentDomainToBeTagged is not empty
		if(parentDomainToBeTagged){
			var iaTagIdKeyName = iaTagIdKey + "_" + parentDomainToBeTagged;
			setCookie(iaTagIdKeyName, tagId, "365", "/", parentDomainToBeTagged, "");
		}
	}

    return api;
})();

