(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const hl="∕";function Vo(n){return String(n??"").trim()||"unknown"}function Mu(n){return String(n??"").replace(/\//g,hl)}function Su(n){return String(n??"").replace(new RegExp(hl,"g"),"/")}function It(n,e){return`${Vo(n)}/${Mu(e)}`}function yn(n){const e=String(n||""),t=e.indexOf("/");return t<=0?null:{wingId:e.slice(0,t),roomName:Su(e.slice(t+1))}}function Eu(n,e){return`room:${Vo(n)}:${e}`}function dl(n){const e=yn(n);return e?Eu(e.wingId,e.roomName):null}function bu(n){if(!n||typeof n!="object")return{};if(n.wings&&typeof n.wings=="object"&&!Array.isArray(n.wings))return{...n.wings};const e=new Set(["error","message","ok"]),t={};for(const[i,r]of Object.entries(n))e.has(i)||typeof r=="number"&&(t[i]=r);return Object.keys(t).length?t:{}}function wu(n){let e=n;if(e!=null&&e.taxonomy&&typeof e.taxonomy=="object"&&(e=e.taxonomy),typeof e=="string")try{e=JSON.parse(e)}catch{e={}}const t=e&&typeof e=="object"?e:{},i={},r=[],s=[];for(const[a,o]of Object.entries(t)){const c=Vo(a);i[c]||(i[c]=[]);let l=0,h=0;if(o&&typeof o=="object"&&!Array.isArray(o))for(const[f,d]of Object.entries(o)){const m=typeof d=="number"?d:1,_=It(c,f),g={name:f,drawers:m,roomId:_,wingId:c};i[c].push(g),r.push({roomId:_,wingId:c,name:f,drawerCount:m}),l+=m,h+=1}s.push({wingId:c,name:c,drawerCount:l,roomCount:h,rooms:i[c]})}return s.sort((a,o)=>o.drawerCount-a.drawerCount),r.sort((a,o)=>o.drawerCount-a.drawerCount),{taxonomy:t,roomsData:i,rooms:r,wings:s}}function fl(n){return n.map(e=>({from:e.sourceRoomId,to:e.targetRoomId,wing:e.sourceWingId,sourceRoomId:e.sourceRoomId,targetRoomId:e.targetRoomId,sourceWingId:e.sourceWingId,targetWingId:e.targetWingId,crossWing:e.crossWing,edgeId:e.edgeId,relationshipType:e.relationshipType}))}function pl(n){return Array.isArray(n==null?void 0:n.edgesResolved)?n.edgesResolved:[]}function gi(n){return fl(pl(n))}function ml(){var n;return typeof window<"u"&&((n=window.location)!=null&&n.protocol)&&window.location.protocol!=="file:"?"":"http://localhost:8767"}async function Ai(n){const e=await fetch(n,{headers:{Accept:"application/json"}});if(!e.ok){const t=await e.text().catch(()=>"");throw new Error(t||`HTTP ${e.status}`)}return e.json()}function _i(n,e){return!!(n&&typeof n=="object"&&e in n)}function vi(n,e,t){const i=n==null?void 0:n[e];return Array.isArray(i)?i.some(r=>r.name===t):!1}function Tu(n){var P;const{status:e,wingsRaw:t,taxonomyRaw:i,graphStats:r,kgResult:s,overviewBundle:a}=n,o=bu(t),{taxonomy:c,roomsData:l,rooms:h,wings:f}=wu(i),d=Array.isArray(r==null?void 0:r.edgesResolved)?r.edgesResolved:[],m=Array.isArray(r==null?void 0:r.edgesInferred)?r.edgesInferred:[],_=Array.isArray(r==null?void 0:r.edgesUnresolved)?r.edgesUnresolved:[],g=r!=null&&r.summary&&typeof r.summary=="object"?r.summary:null,p=r!=null&&r.summaryInferred&&typeof r.summaryInferred=="object"?r.summaryInferred:null;let u=[];d.length?u=fl(d):(P=r==null?void 0:r.legacyGraphEdges)!=null&&P.length?u=r.legacyGraphEdges:r!=null&&r.tunnels&&typeof r.tunnels=="object"&&(u=Object.entries(r.tunnels).flatMap(([T,A])=>Object.entries(A||{}).map(([K,M])=>({from:T,to:K,wing:M}))));const v=s&&!s.error?s:null,x=a!=null&&a.stats&&typeof a.stats=="object"?a.stats:null,E=(r==null?void 0:r.graphMeta)??(a==null?void 0:a.graphMeta)??null;return{status:e,wingsData:o,taxonomy:c,roomsData:l,rooms:h,wings:f,graphStats:r,graph:{edgesResolved:d,edgesInferred:m,edgesUnresolved:_,summary:g,summaryInferred:p,graphMeta:E},graphEdges:u,overviewBundle:a,overviewStats:x,graphMeta:E,kgStats:v,error:null}}async function Au(){const e=`${ml()}/api`;try{const[t,i,r,s,a,o]=await Promise.all([Ai(`${e}/status`),Ai(`${e}/wings`),Ai(`${e}/taxonomy`),Ai(`${e}/graph-stats`),Ai(`${e}/kg-stats`).catch(()=>null),Ai(`${e}/overview`).catch(()=>null)]);return Tu({status:t,wingsRaw:i,taxonomyRaw:r,graphStats:s,kgResult:a,overviewBundle:o})}catch(t){return{status:null,wingsData:{},taxonomy:{},roomsData:{},rooms:[],wings:[],graphStats:null,graph:{edgesResolved:[],edgesInferred:[],edgesUnresolved:[],summary:null,summaryInferred:null,graphMeta:null},graphEdges:[],overviewBundle:null,overviewStats:null,graphMeta:null,kgStats:null,error:t}}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const $o="160",Ri={ROTATE:0,DOLLY:1,PAN:2},Ci={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ru=0,ha=1,Cu=2,gl=1,Lu=2,Pn=3,Jn=0,qt=1,In=2,Yn=0,Qi=1,da=2,fa=3,pa=4,Pu=5,hi=100,Iu=101,Du=102,ma=103,ga=104,Uu=200,Nu=201,Fu=202,Ou=203,bo=204,wo=205,Bu=206,zu=207,ku=208,Gu=209,Hu=210,Wu=211,Vu=212,$u=213,Xu=214,ju=0,qu=1,Yu=2,Ms=3,Ku=4,Zu=5,Ju=6,Qu=7,_l=0,eh=1,th=2,Kn=0,nh=1,ih=2,rh=3,vl=4,sh=5,oh=6,xl=300,tr=301,nr=302,To=303,Ao=304,Us=306,Ro=1e3,vn=1001,Co=1002,jt=1003,_a=1004,Hs=1005,ln=1006,ah=1007,Lr=1008,Zn=1009,ch=1010,lh=1011,Xo=1012,yl=1013,Xn=1014,jn=1015,Pr=1016,Ml=1017,Sl=1018,fi=1020,uh=1021,xn=1023,hh=1024,dh=1025,pi=1026,ir=1027,fh=1028,El=1029,ph=1030,bl=1031,wl=1033,Ws=33776,Vs=33777,$s=33778,Xs=33779,va=35840,xa=35841,ya=35842,Ma=35843,Tl=36196,Sa=37492,Ea=37496,ba=37808,wa=37809,Ta=37810,Aa=37811,Ra=37812,Ca=37813,La=37814,Pa=37815,Ia=37816,Da=37817,Ua=37818,Na=37819,Fa=37820,Oa=37821,js=36492,Ba=36494,za=36495,mh=36283,ka=36284,Ga=36285,Ha=36286,Al=3e3,mi=3001,gh=3200,_h=3201,Rl=0,vh=1,dn="",Bt="srgb",On="srgb-linear",jo="display-p3",Ns="display-p3-linear",Ss="linear",wt="srgb",Es="rec709",bs="p3",Li=7680,Wa=519,xh=512,yh=513,Mh=514,Cl=515,Sh=516,Eh=517,bh=518,wh=519,Lo=35044,Va="300 es",Po=1035,Dn=2e3,ws=2001;class Si{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Ht=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let $a=1234567;const Tr=Math.PI/180,Ir=180/Math.PI;function Nn(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ht[n&255]+Ht[n>>8&255]+Ht[n>>16&255]+Ht[n>>24&255]+"-"+Ht[e&255]+Ht[e>>8&255]+"-"+Ht[e>>16&15|64]+Ht[e>>24&255]+"-"+Ht[t&63|128]+Ht[t>>8&255]+"-"+Ht[t>>16&255]+Ht[t>>24&255]+Ht[i&255]+Ht[i>>8&255]+Ht[i>>16&255]+Ht[i>>24&255]).toLowerCase()}function Vt(n,e,t){return Math.max(e,Math.min(t,n))}function qo(n,e){return(n%e+e)%e}function Th(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function Ah(n,e,t){return n!==e?(t-n)/(e-n):0}function Ar(n,e,t){return(1-t)*n+t*e}function Rh(n,e,t,i){return Ar(n,e,1-Math.exp(-t*i))}function Ch(n,e=1){return e-Math.abs(qo(n,e*2)-e)}function Lh(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Ph(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Ih(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Dh(n,e){return n+Math.random()*(e-n)}function Uh(n){return n*(.5-Math.random())}function Nh(n){n!==void 0&&($a=n);let e=$a+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Fh(n){return n*Tr}function Oh(n){return n*Ir}function Io(n){return(n&n-1)===0&&n!==0}function Bh(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Ts(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function zh(n,e,t,i,r){const s=Math.cos,a=Math.sin,o=s(t/2),c=a(t/2),l=s((e+i)/2),h=a((e+i)/2),f=s((e-i)/2),d=a((e-i)/2),m=s((i-e)/2),_=a((i-e)/2);switch(r){case"XYX":n.set(o*h,c*f,c*d,o*l);break;case"YZY":n.set(c*d,o*h,c*f,o*l);break;case"ZXZ":n.set(c*f,c*d,o*h,o*l);break;case"XZX":n.set(o*h,c*_,c*m,o*l);break;case"YXY":n.set(c*m,o*h,c*_,o*l);break;case"ZYZ":n.set(c*_,c*m,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function En(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function xt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const ci={DEG2RAD:Tr,RAD2DEG:Ir,generateUUID:Nn,clamp:Vt,euclideanModulo:qo,mapLinear:Th,inverseLerp:Ah,lerp:Ar,damp:Rh,pingpong:Ch,smoothstep:Lh,smootherstep:Ph,randInt:Ih,randFloat:Dh,randFloatSpread:Uh,seededRandom:Nh,degToRad:Fh,radToDeg:Oh,isPowerOfTwo:Io,ceilPowerOfTwo:Bh,floorPowerOfTwo:Ts,setQuaternionFromProperEuler:zh,normalize:xt,denormalize:En};class je{constructor(e=0,t=0){je.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Vt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class dt{constructor(e,t,i,r,s,a,o,c,l){dt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l)}set(e,t,i,r,s,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],h=i[4],f=i[7],d=i[2],m=i[5],_=i[8],g=r[0],p=r[3],u=r[6],v=r[1],x=r[4],E=r[7],P=r[2],T=r[5],A=r[8];return s[0]=a*g+o*v+c*P,s[3]=a*p+o*x+c*T,s[6]=a*u+o*E+c*A,s[1]=l*g+h*v+f*P,s[4]=l*p+h*x+f*T,s[7]=l*u+h*E+f*A,s[2]=d*g+m*v+_*P,s[5]=d*p+m*x+_*T,s[8]=d*u+m*E+_*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-i*s*h+i*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=h*a-o*l,d=o*c-h*s,m=l*s-a*c,_=t*f+i*d+r*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=f*g,e[1]=(r*l-h*i)*g,e[2]=(o*i-r*a)*g,e[3]=d*g,e[4]=(h*t-r*c)*g,e[5]=(r*s-o*t)*g,e[6]=m*g,e[7]=(i*c-l*t)*g,e[8]=(a*t-i*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(qs.makeScale(e,t)),this}rotate(e){return this.premultiply(qs.makeRotation(-e)),this}translate(e,t){return this.premultiply(qs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const qs=new dt;function Ll(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function As(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function kh(){const n=As("canvas");return n.style.display="block",n}const Xa={};function Rr(n){n in Xa||(Xa[n]=!0,console.warn(n))}const ja=new dt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),qa=new dt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Hr={[On]:{transfer:Ss,primaries:Es,toReference:n=>n,fromReference:n=>n},[Bt]:{transfer:wt,primaries:Es,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Ns]:{transfer:Ss,primaries:bs,toReference:n=>n.applyMatrix3(qa),fromReference:n=>n.applyMatrix3(ja)},[jo]:{transfer:wt,primaries:bs,toReference:n=>n.convertSRGBToLinear().applyMatrix3(qa),fromReference:n=>n.applyMatrix3(ja).convertLinearToSRGB()}},Gh=new Set([On,Ns]),yt={enabled:!0,_workingColorSpace:On,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Gh.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=Hr[e].toReference,r=Hr[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Hr[n].primaries},getTransfer:function(n){return n===dn?Ss:Hr[n].transfer}};function er(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ys(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Pi;class Pl{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Pi===void 0&&(Pi=As("canvas")),Pi.width=e.width,Pi.height=e.height;const i=Pi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Pi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=As("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=er(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(er(t[i]/255)*255):t[i]=er(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Hh=0;class Il{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Hh++}),this.uuid=Nn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Ks(r[a].image)):s.push(Ks(r[a]))}else s=Ks(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Ks(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Pl.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Wh=0;class tn extends Si{constructor(e=tn.DEFAULT_IMAGE,t=tn.DEFAULT_MAPPING,i=vn,r=vn,s=ln,a=Lr,o=xn,c=Zn,l=tn.DEFAULT_ANISOTROPY,h=dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=Nn(),this.name="",this.source=new Il(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new je(0,0),this.repeat=new je(1,1),this.center=new je(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Rr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===mi?Bt:dn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==xl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ro:e.x=e.x-Math.floor(e.x);break;case vn:e.x=e.x<0?0:1;break;case Co:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ro:e.y=e.y-Math.floor(e.y);break;case vn:e.y=e.y<0?0:1;break;case Co:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Rr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Bt?mi:Al}set encoding(e){Rr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===mi?Bt:dn}}tn.DEFAULT_IMAGE=null;tn.DEFAULT_MAPPING=xl;tn.DEFAULT_ANISOTROPY=1;class zt{constructor(e=0,t=0,i=0,r=1){zt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,l=c[0],h=c[4],f=c[8],d=c[1],m=c[5],_=c[9],g=c[2],p=c[6],u=c[10];if(Math.abs(h-d)<.01&&Math.abs(f-g)<.01&&Math.abs(_-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(f+g)<.1&&Math.abs(_+p)<.1&&Math.abs(l+m+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(l+1)/2,E=(m+1)/2,P=(u+1)/2,T=(h+d)/4,A=(f+g)/4,K=(_+p)/4;return x>E&&x>P?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=T/i,s=A/i):E>P?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=T/r,s=K/r):P<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(P),i=A/s,r=K/s),this.set(i,r,s,t),this}let v=Math.sqrt((p-_)*(p-_)+(f-g)*(f-g)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(p-_)/v,this.y=(f-g)/v,this.z=(d-h)/v,this.w=Math.acos((l+m+u-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Vh extends Si{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new zt(0,0,e,t),this.scissorTest=!1,this.viewport=new zt(0,0,e,t);const r={width:e,height:t,depth:1};i.encoding!==void 0&&(Rr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===mi?Bt:dn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ln,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new tn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Il(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class xi extends Vh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Dl extends tn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=jt,this.minFilter=jt,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $h extends tn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=jt,this.minFilter=jt,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class yi{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let c=i[r+0],l=i[r+1],h=i[r+2],f=i[r+3];const d=s[a+0],m=s[a+1],_=s[a+2],g=s[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f;return}if(o===1){e[t+0]=d,e[t+1]=m,e[t+2]=_,e[t+3]=g;return}if(f!==g||c!==d||l!==m||h!==_){let p=1-o;const u=c*d+l*m+h*_+f*g,v=u>=0?1:-1,x=1-u*u;if(x>Number.EPSILON){const P=Math.sqrt(x),T=Math.atan2(P,u*v);p=Math.sin(p*T)/P,o=Math.sin(o*T)/P}const E=o*v;if(c=c*p+d*E,l=l*p+m*E,h=h*p+_*E,f=f*p+g*E,p===1-o){const P=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=P,l*=P,h*=P,f*=P}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],c=i[r+1],l=i[r+2],h=i[r+3],f=s[a],d=s[a+1],m=s[a+2],_=s[a+3];return e[t]=o*_+h*f+c*m-l*d,e[t+1]=c*_+h*d+l*f-o*m,e[t+2]=l*_+h*m+o*d-c*f,e[t+3]=h*_-o*f-c*d-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(r/2),f=o(s/2),d=c(i/2),m=c(r/2),_=c(s/2);switch(a){case"XYZ":this._x=d*h*f+l*m*_,this._y=l*m*f-d*h*_,this._z=l*h*_+d*m*f,this._w=l*h*f-d*m*_;break;case"YXZ":this._x=d*h*f+l*m*_,this._y=l*m*f-d*h*_,this._z=l*h*_-d*m*f,this._w=l*h*f+d*m*_;break;case"ZXY":this._x=d*h*f-l*m*_,this._y=l*m*f+d*h*_,this._z=l*h*_+d*m*f,this._w=l*h*f-d*m*_;break;case"ZYX":this._x=d*h*f-l*m*_,this._y=l*m*f+d*h*_,this._z=l*h*_-d*m*f,this._w=l*h*f+d*m*_;break;case"YZX":this._x=d*h*f+l*m*_,this._y=l*m*f+d*h*_,this._z=l*h*_-d*m*f,this._w=l*h*f-d*m*_;break;case"XZY":this._x=d*h*f-l*m*_,this._y=l*m*f-d*h*_,this._z=l*h*_+d*m*f,this._w=l*h*f+d*m*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],f=t[10],d=i+o+f;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(h-c)*m,this._y=(s-l)*m,this._z=(a-r)*m}else if(i>o&&i>f){const m=2*Math.sqrt(1+i-o-f);this._w=(h-c)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+l)/m}else if(o>f){const m=2*Math.sqrt(1+o-i-f);this._w=(s-l)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(c+h)/m}else{const m=2*Math.sqrt(1+f-i-o);this._w=(a-r)/m,this._x=(s+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Vt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+a*o+r*l-s*c,this._y=r*h+a*c+s*o-i*l,this._z=s*h+a*l+i*c-r*o,this._w=a*h-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*i+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),f=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=a*f+this._w*d,this._x=i*f+this._x*d,this._y=r*f+this._y*d,this._z=s*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(s),i*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,i=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ya.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ya.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*i),h=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+c*l+a*f-o*h,this.y=i+c*h+o*l-s*f,this.z=r+c*f+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Zs.copy(this).projectOnVector(e),this.sub(Zs)}reflect(e){return this.sub(Zs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Vt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Zs=new U,Ya=new yi;class lr{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,mn):mn.fromBufferAttribute(s,a),mn.applyMatrix4(e.matrixWorld),this.expandByPoint(mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Wr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Wr.copy(i.boundingBox)),Wr.applyMatrix4(e.matrixWorld),this.union(Wr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,mn),mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(pr),Vr.subVectors(this.max,pr),Ii.subVectors(e.a,pr),Di.subVectors(e.b,pr),Ui.subVectors(e.c,pr),Bn.subVectors(Di,Ii),zn.subVectors(Ui,Di),ri.subVectors(Ii,Ui);let t=[0,-Bn.z,Bn.y,0,-zn.z,zn.y,0,-ri.z,ri.y,Bn.z,0,-Bn.x,zn.z,0,-zn.x,ri.z,0,-ri.x,-Bn.y,Bn.x,0,-zn.y,zn.x,0,-ri.y,ri.x,0];return!Js(t,Ii,Di,Ui,Vr)||(t=[1,0,0,0,1,0,0,0,1],!Js(t,Ii,Di,Ui,Vr))?!1:($r.crossVectors(Bn,zn),t=[$r.x,$r.y,$r.z],Js(t,Ii,Di,Ui,Vr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Tn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Tn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Tn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Tn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Tn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Tn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Tn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Tn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Tn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Tn=[new U,new U,new U,new U,new U,new U,new U,new U],mn=new U,Wr=new lr,Ii=new U,Di=new U,Ui=new U,Bn=new U,zn=new U,ri=new U,pr=new U,Vr=new U,$r=new U,si=new U;function Js(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){si.fromArray(n,s);const o=r.x*Math.abs(si.x)+r.y*Math.abs(si.y)+r.z*Math.abs(si.z),c=e.dot(si),l=t.dot(si),h=i.dot(si);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Xh=new lr,mr=new U,Qs=new U;class Fr{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Xh.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;mr.subVectors(e,this.center);const t=mr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(mr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Qs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(mr.copy(e.center).add(Qs)),this.expandByPoint(mr.copy(e.center).sub(Qs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const An=new U,eo=new U,Xr=new U,kn=new U,to=new U,jr=new U,no=new U;class Or{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,An)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=An.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(An.copy(this.origin).addScaledVector(this.direction,t),An.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){eo.copy(e).add(t).multiplyScalar(.5),Xr.copy(t).sub(e).normalize(),kn.copy(this.origin).sub(eo);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Xr),o=kn.dot(this.direction),c=-kn.dot(Xr),l=kn.lengthSq(),h=Math.abs(1-a*a);let f,d,m,_;if(h>0)if(f=a*c-o,d=a*o-c,_=s*h,f>=0)if(d>=-_)if(d<=_){const g=1/h;f*=g,d*=g,m=f*(f+a*d+2*o)+d*(a*f+d+2*c)+l}else d=s,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*c)+l;else d=-s,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*c)+l;else d<=-_?(f=Math.max(0,-(-a*s+o)),d=f>0?-s:Math.min(Math.max(-s,-c),s),m=-f*f+d*(d+2*c)+l):d<=_?(f=0,d=Math.min(Math.max(-s,-c),s),m=d*(d+2*c)+l):(f=Math.max(0,-(a*s+o)),d=f>0?s:Math.min(Math.max(-s,-c),s),m=-f*f+d*(d+2*c)+l);else d=a>0?-s:s,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(eo).addScaledVector(Xr,d),m}intersectSphere(e,t){An.subVectors(e.center,this.origin);const i=An.dot(this.direction),r=An.dot(An)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(i=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(i=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-d.z)*f,c=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,c=(e.min.z-d.z)*f),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,An)!==null}intersectTriangle(e,t,i,r,s){to.subVectors(t,e),jr.subVectors(i,e),no.crossVectors(to,jr);let a=this.direction.dot(no),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;kn.subVectors(this.origin,e);const c=o*this.direction.dot(jr.crossVectors(kn,jr));if(c<0)return null;const l=o*this.direction.dot(to.cross(kn));if(l<0||c+l>a)return null;const h=-o*kn.dot(no);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ct{constructor(e,t,i,r,s,a,o,c,l,h,f,d,m,_,g,p){Ct.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l,h,f,d,m,_,g,p)}set(e,t,i,r,s,a,o,c,l,h,f,d,m,_,g,p){const u=this.elements;return u[0]=e,u[4]=t,u[8]=i,u[12]=r,u[1]=s,u[5]=a,u[9]=o,u[13]=c,u[2]=l,u[6]=h,u[10]=f,u[14]=d,u[3]=m,u[7]=_,u[11]=g,u[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ct().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Ni.setFromMatrixColumn(e,0).length(),s=1/Ni.setFromMatrixColumn(e,1).length(),a=1/Ni.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=a*h,m=a*f,_=o*h,g=o*f;t[0]=c*h,t[4]=-c*f,t[8]=l,t[1]=m+_*l,t[5]=d-g*l,t[9]=-o*c,t[2]=g-d*l,t[6]=_+m*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*h,m=c*f,_=l*h,g=l*f;t[0]=d+g*o,t[4]=_*o-m,t[8]=a*l,t[1]=a*f,t[5]=a*h,t[9]=-o,t[2]=m*o-_,t[6]=g+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*h,m=c*f,_=l*h,g=l*f;t[0]=d-g*o,t[4]=-a*f,t[8]=_+m*o,t[1]=m+_*o,t[5]=a*h,t[9]=g-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*h,m=a*f,_=o*h,g=o*f;t[0]=c*h,t[4]=_*l-m,t[8]=d*l+g,t[1]=c*f,t[5]=g*l+d,t[9]=m*l-_,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,m=a*l,_=o*c,g=o*l;t[0]=c*h,t[4]=g-d*f,t[8]=_*f+m,t[1]=f,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=m*f+_,t[10]=d-g*f}else if(e.order==="XZY"){const d=a*c,m=a*l,_=o*c,g=o*l;t[0]=c*h,t[4]=-f,t[8]=l*h,t[1]=d*f+g,t[5]=a*h,t[9]=m*f-_,t[2]=_*f-m,t[6]=o*h,t[10]=g*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(jh,e,qh)}lookAt(e,t,i){const r=this.elements;return rn.subVectors(e,t),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),Gn.crossVectors(i,rn),Gn.lengthSq()===0&&(Math.abs(i.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),Gn.crossVectors(i,rn)),Gn.normalize(),qr.crossVectors(rn,Gn),r[0]=Gn.x,r[4]=qr.x,r[8]=rn.x,r[1]=Gn.y,r[5]=qr.y,r[9]=rn.y,r[2]=Gn.z,r[6]=qr.z,r[10]=rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],h=i[1],f=i[5],d=i[9],m=i[13],_=i[2],g=i[6],p=i[10],u=i[14],v=i[3],x=i[7],E=i[11],P=i[15],T=r[0],A=r[4],K=r[8],M=r[12],w=r[1],O=r[5],D=r[9],$=r[13],L=r[2],z=r[6],q=r[10],X=r[14],ee=r[3],J=r[7],ne=r[11],ce=r[15];return s[0]=a*T+o*w+c*L+l*ee,s[4]=a*A+o*O+c*z+l*J,s[8]=a*K+o*D+c*q+l*ne,s[12]=a*M+o*$+c*X+l*ce,s[1]=h*T+f*w+d*L+m*ee,s[5]=h*A+f*O+d*z+m*J,s[9]=h*K+f*D+d*q+m*ne,s[13]=h*M+f*$+d*X+m*ce,s[2]=_*T+g*w+p*L+u*ee,s[6]=_*A+g*O+p*z+u*J,s[10]=_*K+g*D+p*q+u*ne,s[14]=_*M+g*$+p*X+u*ce,s[3]=v*T+x*w+E*L+P*ee,s[7]=v*A+x*O+E*z+P*J,s[11]=v*K+x*D+E*q+P*ne,s[15]=v*M+x*$+E*X+P*ce,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],f=e[6],d=e[10],m=e[14],_=e[3],g=e[7],p=e[11],u=e[15];return _*(+s*c*f-r*l*f-s*o*d+i*l*d+r*o*m-i*c*m)+g*(+t*c*m-t*l*d+s*a*d-r*a*m+r*l*h-s*c*h)+p*(+t*l*f-t*o*m-s*a*f+i*a*m+s*o*h-i*l*h)+u*(-r*o*h-t*c*f+t*o*d+r*a*f-i*a*d+i*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=e[9],d=e[10],m=e[11],_=e[12],g=e[13],p=e[14],u=e[15],v=f*p*l-g*d*l+g*c*m-o*p*m-f*c*u+o*d*u,x=_*d*l-h*p*l-_*c*m+a*p*m+h*c*u-a*d*u,E=h*g*l-_*f*l+_*o*m-a*g*m-h*o*u+a*f*u,P=_*f*c-h*g*c-_*o*d+a*g*d+h*o*p-a*f*p,T=t*v+i*x+r*E+s*P;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return e[0]=v*A,e[1]=(g*d*s-f*p*s-g*r*m+i*p*m+f*r*u-i*d*u)*A,e[2]=(o*p*s-g*c*s+g*r*l-i*p*l-o*r*u+i*c*u)*A,e[3]=(f*c*s-o*d*s-f*r*l+i*d*l+o*r*m-i*c*m)*A,e[4]=x*A,e[5]=(h*p*s-_*d*s+_*r*m-t*p*m-h*r*u+t*d*u)*A,e[6]=(_*c*s-a*p*s-_*r*l+t*p*l+a*r*u-t*c*u)*A,e[7]=(a*d*s-h*c*s+h*r*l-t*d*l-a*r*m+t*c*m)*A,e[8]=E*A,e[9]=(_*f*s-h*g*s-_*i*m+t*g*m+h*i*u-t*f*u)*A,e[10]=(a*g*s-_*o*s+_*i*l-t*g*l-a*i*u+t*o*u)*A,e[11]=(h*o*s-a*f*s-h*i*l+t*f*l+a*i*m-t*o*m)*A,e[12]=P*A,e[13]=(h*g*r-_*f*r+_*i*d-t*g*d-h*i*p+t*f*p)*A,e[14]=(_*o*r-a*g*r-_*i*c+t*g*c+a*i*p-t*o*p)*A,e[15]=(a*f*r-h*o*r+h*i*c-t*f*c-a*i*d+t*o*d)*A,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,h*o+i,h*c-r*a,0,l*c-r*o,h*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,f=o+o,d=s*l,m=s*h,_=s*f,g=a*h,p=a*f,u=o*f,v=c*l,x=c*h,E=c*f,P=i.x,T=i.y,A=i.z;return r[0]=(1-(g+u))*P,r[1]=(m+E)*P,r[2]=(_-x)*P,r[3]=0,r[4]=(m-E)*T,r[5]=(1-(d+u))*T,r[6]=(p+v)*T,r[7]=0,r[8]=(_+x)*A,r[9]=(p-v)*A,r[10]=(1-(d+g))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Ni.set(r[0],r[1],r[2]).length();const a=Ni.set(r[4],r[5],r[6]).length(),o=Ni.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],gn.copy(this);const l=1/s,h=1/a,f=1/o;return gn.elements[0]*=l,gn.elements[1]*=l,gn.elements[2]*=l,gn.elements[4]*=h,gn.elements[5]*=h,gn.elements[6]*=h,gn.elements[8]*=f,gn.elements[9]*=f,gn.elements[10]*=f,t.setFromRotationMatrix(gn),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=Dn){const c=this.elements,l=2*s/(t-e),h=2*s/(i-r),f=(t+e)/(t-e),d=(i+r)/(i-r);let m,_;if(o===Dn)m=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===ws)m=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Dn){const c=this.elements,l=1/(t-e),h=1/(i-r),f=1/(a-s),d=(t+e)*l,m=(i+r)*h;let _,g;if(o===Dn)_=(a+s)*f,g=-2*f;else if(o===ws)_=s*f,g=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=g,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ni=new U,gn=new Ct,jh=new U(0,0,0),qh=new U(1,1,1),Gn=new U,qr=new U,rn=new U,Ka=new Ct,Za=new yi;class Fs{constructor(e=0,t=0,i=0,r=Fs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],h=r[9],f=r[2],d=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(Vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Vt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Vt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Vt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Vt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Ka.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ka,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Za.setFromEuler(this),this.setFromQuaternion(Za,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Fs.DEFAULT_ORDER="XYZ";class Yo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Yh=0;const Ja=new U,Fi=new yi,Rn=new Ct,Yr=new U,gr=new U,Kh=new U,Zh=new yi,Qa=new U(1,0,0),ec=new U(0,1,0),tc=new U(0,0,1),Jh={type:"added"},Qh={type:"removed"};class Dt extends Si{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yh++}),this.uuid=Nn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Dt.DEFAULT_UP.clone();const e=new U,t=new Fs,i=new yi,r=new U(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ct},normalMatrix:{value:new dt}}),this.matrix=new Ct,this.matrixWorld=new Ct,this.matrixAutoUpdate=Dt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Yo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Fi.setFromAxisAngle(e,t),this.quaternion.multiply(Fi),this}rotateOnWorldAxis(e,t){return Fi.setFromAxisAngle(e,t),this.quaternion.premultiply(Fi),this}rotateX(e){return this.rotateOnAxis(Qa,e)}rotateY(e){return this.rotateOnAxis(ec,e)}rotateZ(e){return this.rotateOnAxis(tc,e)}translateOnAxis(e,t){return Ja.copy(e).applyQuaternion(this.quaternion),this.position.add(Ja.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Qa,e)}translateY(e){return this.translateOnAxis(ec,e)}translateZ(e){return this.translateOnAxis(tc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Yr.copy(e):Yr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),gr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(gr,Yr,this.up):Rn.lookAt(Yr,gr,this.up),this.quaternion.setFromRotationMatrix(Rn),r&&(Rn.extractRotation(r.matrixWorld),Fi.setFromRotationMatrix(Rn),this.quaternion.premultiply(Fi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Jh)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Qh)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Rn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Rn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gr,e,Kh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gr,Zh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const f=c[l];s(e.shapes,f)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),f=a(e.shapes),d=a(e.skeletons),m=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),m.length>0&&(i.animations=m),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Dt.DEFAULT_UP=new U(0,1,0);Dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const _n=new U,Cn=new U,io=new U,Ln=new U,Oi=new U,Bi=new U,nc=new U,ro=new U,so=new U,oo=new U;let Kr=!1;class un{constructor(e=new U,t=new U,i=new U){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),_n.subVectors(e,t),r.cross(_n);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){_n.subVectors(r,t),Cn.subVectors(i,t),io.subVectors(e,t);const a=_n.dot(_n),o=_n.dot(Cn),c=_n.dot(io),l=Cn.dot(Cn),h=Cn.dot(io),f=a*l-o*o;if(f===0)return s.set(0,0,0),null;const d=1/f,m=(l*c-o*h)*d,_=(a*h-o*c)*d;return s.set(1-m-_,_,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Ln)===null?!1:Ln.x>=0&&Ln.y>=0&&Ln.x+Ln.y<=1}static getUV(e,t,i,r,s,a,o,c){return Kr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Kr=!0),this.getInterpolation(e,t,i,r,s,a,o,c)}static getInterpolation(e,t,i,r,s,a,o,c){return this.getBarycoord(e,t,i,r,Ln)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Ln.x),c.addScaledVector(a,Ln.y),c.addScaledVector(o,Ln.z),c)}static isFrontFacing(e,t,i,r){return _n.subVectors(i,t),Cn.subVectors(e,t),_n.cross(Cn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return _n.subVectors(this.c,this.b),Cn.subVectors(this.a,this.b),_n.cross(Cn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return un.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return un.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,s){return Kr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Kr=!0),un.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}getInterpolation(e,t,i,r,s){return un.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return un.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return un.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;Oi.subVectors(r,i),Bi.subVectors(s,i),ro.subVectors(e,i);const c=Oi.dot(ro),l=Bi.dot(ro);if(c<=0&&l<=0)return t.copy(i);so.subVectors(e,r);const h=Oi.dot(so),f=Bi.dot(so);if(h>=0&&f<=h)return t.copy(r);const d=c*f-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(i).addScaledVector(Oi,a);oo.subVectors(e,s);const m=Oi.dot(oo),_=Bi.dot(oo);if(_>=0&&m<=_)return t.copy(s);const g=m*l-c*_;if(g<=0&&l>=0&&_<=0)return o=l/(l-_),t.copy(i).addScaledVector(Bi,o);const p=h*_-m*f;if(p<=0&&f-h>=0&&m-_>=0)return nc.subVectors(s,r),o=(f-h)/(f-h+(m-_)),t.copy(r).addScaledVector(nc,o);const u=1/(p+g+d);return a=g*u,o=d*u,t.copy(i).addScaledVector(Oi,a).addScaledVector(Bi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ul={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hn={h:0,s:0,l:0},Zr={h:0,s:0,l:0};function ao(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class st{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,yt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=yt.workingColorSpace){return this.r=e,this.g=t,this.b=i,yt.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=yt.workingColorSpace){if(e=qo(e,1),t=Vt(t,0,1),i=Vt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=ao(a,s,e+1/3),this.g=ao(a,s,e),this.b=ao(a,s,e-1/3)}return yt.toWorkingColorSpace(this,r),this}setStyle(e,t=Bt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Bt){const i=Ul[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=er(e.r),this.g=er(e.g),this.b=er(e.b),this}copyLinearToSRGB(e){return this.r=Ys(e.r),this.g=Ys(e.g),this.b=Ys(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Bt){return yt.fromWorkingColorSpace(Wt.copy(this),e),Math.round(Vt(Wt.r*255,0,255))*65536+Math.round(Vt(Wt.g*255,0,255))*256+Math.round(Vt(Wt.b*255,0,255))}getHexString(e=Bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=yt.workingColorSpace){yt.fromWorkingColorSpace(Wt.copy(this),t);const i=Wt.r,r=Wt.g,s=Wt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const f=a-o;switch(l=h<=.5?f/(a+o):f/(2-a-o),a){case i:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-i)/f+2;break;case s:c=(i-r)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=yt.workingColorSpace){return yt.fromWorkingColorSpace(Wt.copy(this),t),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=Bt){yt.fromWorkingColorSpace(Wt.copy(this),e);const t=Wt.r,i=Wt.g,r=Wt.b;return e!==Bt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Hn),this.setHSL(Hn.h+e,Hn.s+t,Hn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Hn),e.getHSL(Zr);const i=Ar(Hn.h,Zr.h,t),r=Ar(Hn.s,Zr.s,t),s=Ar(Hn.l,Zr.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Wt=new st;st.NAMES=Ul;let ed=0;class ei extends Si{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ed++}),this.uuid=Nn(),this.name="",this.type="Material",this.blending=Qi,this.side=Jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bo,this.blendDst=wo,this.blendEquation=hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new st(0,0,0),this.blendAlpha=0,this.depthFunc=Ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Wa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Li,this.stencilZFail=Li,this.stencilZPass=Li,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Qi&&(i.blending=this.blending),this.side!==Jn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==bo&&(i.blendSrc=this.blendSrc),this.blendDst!==wo&&(i.blendDst=this.blendDst),this.blendEquation!==hi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ms&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Wa&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Li&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Li&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Li&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ko extends ei{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new st(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=_l,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Pt=new U,Jr=new je;class Mn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Lo,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=jn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Jr.fromBufferAttribute(this,t),Jr.applyMatrix3(e),this.setXY(t,Jr.x,Jr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix3(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=En(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=xt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=En(t,this.array)),t}setX(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=En(t,this.array)),t}setY(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=En(t,this.array)),t}setZ(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=En(t,this.array)),t}setW(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),i=xt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),i=xt(i,this.array),r=xt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),i=xt(i,this.array),r=xt(r,this.array),s=xt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Lo&&(e.usage=this.usage),e}}class Nl extends Mn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Fl extends Mn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class pn extends Mn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let td=0;const cn=new Ct,co=new Dt,zi=new U,sn=new lr,_r=new lr,Ot=new U;class on extends Si{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:td++}),this.uuid=Nn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ll(e)?Fl:Nl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new dt().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return cn.makeRotationFromQuaternion(e),this.applyMatrix4(cn),this}rotateX(e){return cn.makeRotationX(e),this.applyMatrix4(cn),this}rotateY(e){return cn.makeRotationY(e),this.applyMatrix4(cn),this}rotateZ(e){return cn.makeRotationZ(e),this.applyMatrix4(cn),this}translate(e,t,i){return cn.makeTranslation(e,t,i),this.applyMatrix4(cn),this}scale(e,t,i){return cn.makeScale(e,t,i),this.applyMatrix4(cn),this}lookAt(e){return co.lookAt(e),co.updateMatrix(),this.applyMatrix4(co.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zi).negate(),this.translate(zi.x,zi.y,zi.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new pn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new lr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];sn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new U,1/0);return}if(e){const i=this.boundingSphere.center;if(sn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];_r.setFromBufferAttribute(o),this.morphTargetsRelative?(Ot.addVectors(sn.min,_r.min),sn.expandByPoint(Ot),Ot.addVectors(sn.max,_r.max),sn.expandByPoint(Ot)):(sn.expandByPoint(_r.min),sn.expandByPoint(_r.max))}sn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Ot.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ot));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Ot.fromBufferAttribute(o,l),c&&(zi.fromBufferAttribute(e,l),Ot.add(zi)),r=Math.max(r,i.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,s=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Mn(new Float32Array(4*o),4));const c=this.getAttribute("tangent").array,l=[],h=[];for(let w=0;w<o;w++)l[w]=new U,h[w]=new U;const f=new U,d=new U,m=new U,_=new je,g=new je,p=new je,u=new U,v=new U;function x(w,O,D){f.fromArray(r,w*3),d.fromArray(r,O*3),m.fromArray(r,D*3),_.fromArray(a,w*2),g.fromArray(a,O*2),p.fromArray(a,D*2),d.sub(f),m.sub(f),g.sub(_),p.sub(_);const $=1/(g.x*p.y-p.x*g.y);isFinite($)&&(u.copy(d).multiplyScalar(p.y).addScaledVector(m,-g.y).multiplyScalar($),v.copy(m).multiplyScalar(g.x).addScaledVector(d,-p.x).multiplyScalar($),l[w].add(u),l[O].add(u),l[D].add(u),h[w].add(v),h[O].add(v),h[D].add(v))}let E=this.groups;E.length===0&&(E=[{start:0,count:i.length}]);for(let w=0,O=E.length;w<O;++w){const D=E[w],$=D.start,L=D.count;for(let z=$,q=$+L;z<q;z+=3)x(i[z+0],i[z+1],i[z+2])}const P=new U,T=new U,A=new U,K=new U;function M(w){A.fromArray(s,w*3),K.copy(A);const O=l[w];P.copy(O),P.sub(A.multiplyScalar(A.dot(O))).normalize(),T.crossVectors(K,O);const $=T.dot(h[w])<0?-1:1;c[w*4]=P.x,c[w*4+1]=P.y,c[w*4+2]=P.z,c[w*4+3]=$}for(let w=0,O=E.length;w<O;++w){const D=E[w],$=D.start,L=D.count;for(let z=$,q=$+L;z<q;z+=3)M(i[z+0]),M(i[z+1]),M(i[z+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Mn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,m=i.count;d<m;d++)i.setXYZ(d,0,0,0);const r=new U,s=new U,a=new U,o=new U,c=new U,l=new U,h=new U,f=new U;if(e)for(let d=0,m=e.count;d<m;d+=3){const _=e.getX(d+0),g=e.getX(d+1),p=e.getX(d+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,p),h.subVectors(a,s),f.subVectors(r,s),h.cross(f),o.fromBufferAttribute(i,_),c.fromBufferAttribute(i,g),l.fromBufferAttribute(i,p),o.add(h),c.add(h),l.add(h),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(g,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let d=0,m=t.count;d<m;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),f.subVectors(r,s),h.cross(f),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,f=o.normalized,d=new l.constructor(c.length*h);let m=0,_=0;for(let g=0,p=c.length;g<p;g++){o.isInterleavedBufferAttribute?m=c[g]*o.data.stride+o.offset:m=c[g]*h;for(let u=0;u<h;u++)d[_++]=l[m++]}return new Mn(d,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new on,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,i);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let h=0,f=l.length;h<f;h++){const d=l[h],m=e(d,i);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let f=0,d=l.length;f<d;f++){const m=l[f];h.push(m.toJSON(e.data))}h.length>0&&(r[c]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const l in r){const h=r[l];this.setAttribute(l,h.clone(t))}const s=e.morphAttributes;for(const l in s){const h=[],f=s[l];for(let d=0,m=f.length;d<m;d++)h.push(f[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ic=new Ct,oi=new Or,Qr=new Fr,rc=new U,ki=new U,Gi=new U,Hi=new U,lo=new U,es=new U,ts=new je,ns=new je,is=new je,sc=new U,oc=new U,ac=new U,rs=new U,ss=new U;class Kt extends Dt{constructor(e=new on,t=new Ko){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){es.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=o[c],f=s[c];h!==0&&(lo.fromBufferAttribute(f,e),a?es.addScaledVector(lo,h):es.addScaledVector(lo.sub(t),h))}t.add(es)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Qr.copy(i.boundingSphere),Qr.applyMatrix4(s),oi.copy(e.ray).recast(e.near),!(Qr.containsPoint(oi.origin)===!1&&(oi.intersectSphere(Qr,rc)===null||oi.origin.distanceToSquared(rc)>(e.far-e.near)**2))&&(ic.copy(s).invert(),oi.copy(e.ray).applyMatrix4(ic),!(i.boundingBox!==null&&oi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,oi)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,f=s.attributes.normal,d=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,g=d.length;_<g;_++){const p=d[_],u=a[p.materialIndex],v=Math.max(p.start,m.start),x=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let E=v,P=x;E<P;E+=3){const T=o.getX(E),A=o.getX(E+1),K=o.getX(E+2);r=os(this,u,e,i,l,h,f,T,A,K),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const _=Math.max(0,m.start),g=Math.min(o.count,m.start+m.count);for(let p=_,u=g;p<u;p+=3){const v=o.getX(p),x=o.getX(p+1),E=o.getX(p+2);r=os(this,a,e,i,l,h,f,v,x,E),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,g=d.length;_<g;_++){const p=d[_],u=a[p.materialIndex],v=Math.max(p.start,m.start),x=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let E=v,P=x;E<P;E+=3){const T=E,A=E+1,K=E+2;r=os(this,u,e,i,l,h,f,T,A,K),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const _=Math.max(0,m.start),g=Math.min(c.count,m.start+m.count);for(let p=_,u=g;p<u;p+=3){const v=p,x=p+1,E=p+2;r=os(this,a,e,i,l,h,f,v,x,E),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function nd(n,e,t,i,r,s,a,o){let c;if(e.side===qt?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===Jn,o),c===null)return null;ss.copy(o),ss.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(ss);return l<t.near||l>t.far?null:{distance:l,point:ss.clone(),object:n}}function os(n,e,t,i,r,s,a,o,c,l){n.getVertexPosition(o,ki),n.getVertexPosition(c,Gi),n.getVertexPosition(l,Hi);const h=nd(n,e,t,i,ki,Gi,Hi,rs);if(h){r&&(ts.fromBufferAttribute(r,o),ns.fromBufferAttribute(r,c),is.fromBufferAttribute(r,l),h.uv=un.getInterpolation(rs,ki,Gi,Hi,ts,ns,is,new je)),s&&(ts.fromBufferAttribute(s,o),ns.fromBufferAttribute(s,c),is.fromBufferAttribute(s,l),h.uv1=un.getInterpolation(rs,ki,Gi,Hi,ts,ns,is,new je),h.uv2=h.uv1),a&&(sc.fromBufferAttribute(a,o),oc.fromBufferAttribute(a,c),ac.fromBufferAttribute(a,l),h.normal=un.getInterpolation(rs,ki,Gi,Hi,sc,oc,ac,new U),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:c,c:l,normal:new U,materialIndex:0};un.getNormal(ki,Gi,Hi,f.normal),h.face=f}return h}class Br extends on{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],h=[],f=[];let d=0,m=0;_("z","y","x",-1,-1,i,t,e,a,s,0),_("z","y","x",1,-1,i,t,-e,a,s,1),_("x","z","y",1,1,e,i,t,r,a,2),_("x","z","y",1,-1,e,i,-t,r,a,3),_("x","y","z",1,-1,e,t,i,r,s,4),_("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new pn(l,3)),this.setAttribute("normal",new pn(h,3)),this.setAttribute("uv",new pn(f,2));function _(g,p,u,v,x,E,P,T,A,K,M){const w=E/A,O=P/K,D=E/2,$=P/2,L=T/2,z=A+1,q=K+1;let X=0,ee=0;const J=new U;for(let ne=0;ne<q;ne++){const ce=ne*O-$;for(let de=0;de<z;de++){const k=de*w-D;J[g]=k*v,J[p]=ce*x,J[u]=L,l.push(J.x,J.y,J.z),J[g]=0,J[p]=0,J[u]=T>0?1:-1,h.push(J.x,J.y,J.z),f.push(de/A),f.push(1-ne/K),X+=1}}for(let ne=0;ne<K;ne++)for(let ce=0;ce<A;ce++){const de=d+ce+z*ne,k=d+ce+z*(ne+1),te=d+(ce+1)+z*(ne+1),se=d+(ce+1)+z*ne;c.push(de,k,se),c.push(k,te,se),ee+=6}o.addGroup(m,ee,M),m+=ee,d+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Br(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function rr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Xt(n){const e={};for(let t=0;t<n.length;t++){const i=rr(n[t]);for(const r in i)e[r]=i[r]}return e}function id(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Ol(n){return n.getRenderTarget()===null?n.outputColorSpace:yt.workingColorSpace}const rd={clone:rr,merge:Xt};var sd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,od=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Mi extends ei{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sd,this.fragmentShader=od,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=rr(e.uniforms),this.uniformsGroups=id(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Bl extends Dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ct,this.projectionMatrix=new Ct,this.projectionMatrixInverse=new Ct,this.coordinateSystem=Dn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class hn extends Bl{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ir*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Tr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ir*2*Math.atan(Math.tan(Tr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Tr*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Wi=-90,Vi=1;class ad extends Dt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new hn(Wi,Vi,e,t);r.layers=this.layers,this.add(r);const s=new hn(Wi,Vi,e,t);s.layers=this.layers,this.add(s);const a=new hn(Wi,Vi,e,t);a.layers=this.layers,this.add(a);const o=new hn(Wi,Vi,e,t);o.layers=this.layers,this.add(o);const c=new hn(Wi,Vi,e,t);c.layers=this.layers,this.add(c);const l=new hn(Wi,Vi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===Dn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ws)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,h]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,l),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,r),e.render(t,h),e.setRenderTarget(f,d,m),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class zl extends tn{constructor(e,t,i,r,s,a,o,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:tr,super(e,t,i,r,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class cd extends xi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&(Rr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===mi?Bt:dn),this.texture=new zl(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ln}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Br(5,5,5),s=new Mi({name:"CubemapFromEquirect",uniforms:rr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:qt,blending:Yn});s.uniforms.tEquirect.value=t;const a=new Kt(r,s),o=t.minFilter;return t.minFilter===Lr&&(t.minFilter=ln),new ad(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}const uo=new U,ld=new U,ud=new dt;class Wn{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=uo.subVectors(i,t).cross(ld.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(uo),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||ud.getNormalMatrix(e),r=this.coplanarPoint(uo).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ai=new Fr,as=new U;class Zo{constructor(e=new Wn,t=new Wn,i=new Wn,r=new Wn,s=new Wn,a=new Wn){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Dn){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],c=r[3],l=r[4],h=r[5],f=r[6],d=r[7],m=r[8],_=r[9],g=r[10],p=r[11],u=r[12],v=r[13],x=r[14],E=r[15];if(i[0].setComponents(c-s,d-l,p-m,E-u).normalize(),i[1].setComponents(c+s,d+l,p+m,E+u).normalize(),i[2].setComponents(c+a,d+h,p+_,E+v).normalize(),i[3].setComponents(c-a,d-h,p-_,E-v).normalize(),i[4].setComponents(c-o,d-f,p-g,E-x).normalize(),t===Dn)i[5].setComponents(c+o,d+f,p+g,E+x).normalize();else if(t===ws)i[5].setComponents(o,f,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ai.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ai.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ai)}intersectsSprite(e){return ai.center.set(0,0,0),ai.radius=.7071067811865476,ai.applyMatrix4(e.matrixWorld),this.intersectsSphere(ai)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(as.x=r.normal.x>0?e.max.x:e.min.x,as.y=r.normal.y>0?e.max.y:e.min.y,as.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(as)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function kl(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function hd(n,e){const t=e.isWebGL2,i=new WeakMap;function r(l,h){const f=l.array,d=l.usage,m=f.byteLength,_=n.createBuffer();n.bindBuffer(h,_),n.bufferData(h,f,d),l.onUploadCallback();let g;if(f instanceof Float32Array)g=n.FLOAT;else if(f instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)g=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=n.UNSIGNED_SHORT;else if(f instanceof Int16Array)g=n.SHORT;else if(f instanceof Uint32Array)g=n.UNSIGNED_INT;else if(f instanceof Int32Array)g=n.INT;else if(f instanceof Int8Array)g=n.BYTE;else if(f instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:_,type:g,bytesPerElement:f.BYTES_PER_ELEMENT,version:l.version,size:m}}function s(l,h,f){const d=h.array,m=h._updateRange,_=h.updateRanges;if(n.bindBuffer(f,l),m.count===-1&&_.length===0&&n.bufferSubData(f,0,d),_.length!==0){for(let g=0,p=_.length;g<p;g++){const u=_[g];t?n.bufferSubData(f,u.start*d.BYTES_PER_ELEMENT,d,u.start,u.count):n.bufferSubData(f,u.start*d.BYTES_PER_ELEMENT,d.subarray(u.start,u.start+u.count))}h.clearUpdateRanges()}m.count!==-1&&(t?n.bufferSubData(f,m.offset*d.BYTES_PER_ELEMENT,d,m.offset,m.count):n.bufferSubData(f,m.offset*d.BYTES_PER_ELEMENT,d.subarray(m.offset,m.offset+m.count)),m.count=-1),h.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),i.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);const h=i.get(l);h&&(n.deleteBuffer(h.buffer),i.delete(l))}function c(l,h){if(l.isGLBufferAttribute){const d=i.get(l);(!d||d.version<l.version)&&i.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const f=i.get(l);if(f===void 0)i.set(l,r(l,h));else if(f.version<l.version){if(f.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,l,h),f.version=l.version}}return{get:a,remove:o,update:c}}class Jo extends on{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,h=c+1,f=e/o,d=t/c,m=[],_=[],g=[],p=[];for(let u=0;u<h;u++){const v=u*d-a;for(let x=0;x<l;x++){const E=x*f-s;_.push(E,-v,0),g.push(0,0,1),p.push(x/o),p.push(1-u/c)}}for(let u=0;u<c;u++)for(let v=0;v<o;v++){const x=v+l*u,E=v+l*(u+1),P=v+1+l*(u+1),T=v+1+l*u;m.push(x,E,T),m.push(E,P,T)}this.setIndex(m),this.setAttribute("position",new pn(_,3)),this.setAttribute("normal",new pn(g,3)),this.setAttribute("uv",new pn(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jo(e.width,e.height,e.widthSegments,e.heightSegments)}}var dd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,fd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,pd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,md=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gd=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,_d=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,vd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,xd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,yd=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Md=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Sd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ed=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,wd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Td=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ad=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Rd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Cd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ld=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Pd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Id=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Dd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Ud=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Nd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Fd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Od=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Bd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Gd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wd=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Vd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,$d=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Xd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,jd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Yd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Kd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Jd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Qd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ef=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,tf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,of=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,af=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,uf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,df=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ff=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,pf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,mf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,gf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_f=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,xf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,yf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Mf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Sf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ef=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,wf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Tf=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Af=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Rf=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Cf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Lf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Pf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,If=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Df=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Uf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Nf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ff=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Of=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Bf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,zf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Gf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Hf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Wf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Vf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$f=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Xf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,jf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,qf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Yf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Kf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Zf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Jf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Qf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ep=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,np=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ip=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,sp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,op=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ap=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,cp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,lp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,up=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,hp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const dp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,fp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_p=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,xp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,yp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Mp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Sp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ep=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,wp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Tp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ap=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Pp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ip=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Dp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Up=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Np=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Op=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Gp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Hp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Vp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$p=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,at={alphahash_fragment:dd,alphahash_pars_fragment:fd,alphamap_fragment:pd,alphamap_pars_fragment:md,alphatest_fragment:gd,alphatest_pars_fragment:_d,aomap_fragment:vd,aomap_pars_fragment:xd,batching_pars_vertex:yd,batching_vertex:Md,begin_vertex:Sd,beginnormal_vertex:Ed,bsdfs:bd,iridescence_fragment:wd,bumpmap_pars_fragment:Td,clipping_planes_fragment:Ad,clipping_planes_pars_fragment:Rd,clipping_planes_pars_vertex:Cd,clipping_planes_vertex:Ld,color_fragment:Pd,color_pars_fragment:Id,color_pars_vertex:Dd,color_vertex:Ud,common:Nd,cube_uv_reflection_fragment:Fd,defaultnormal_vertex:Od,displacementmap_pars_vertex:Bd,displacementmap_vertex:zd,emissivemap_fragment:kd,emissivemap_pars_fragment:Gd,colorspace_fragment:Hd,colorspace_pars_fragment:Wd,envmap_fragment:Vd,envmap_common_pars_fragment:$d,envmap_pars_fragment:Xd,envmap_pars_vertex:jd,envmap_physical_pars_fragment:of,envmap_vertex:qd,fog_vertex:Yd,fog_pars_vertex:Kd,fog_fragment:Zd,fog_pars_fragment:Jd,gradientmap_pars_fragment:Qd,lightmap_fragment:ef,lightmap_pars_fragment:tf,lights_lambert_fragment:nf,lights_lambert_pars_fragment:rf,lights_pars_begin:sf,lights_toon_fragment:af,lights_toon_pars_fragment:cf,lights_phong_fragment:lf,lights_phong_pars_fragment:uf,lights_physical_fragment:hf,lights_physical_pars_fragment:df,lights_fragment_begin:ff,lights_fragment_maps:pf,lights_fragment_end:mf,logdepthbuf_fragment:gf,logdepthbuf_pars_fragment:_f,logdepthbuf_pars_vertex:vf,logdepthbuf_vertex:xf,map_fragment:yf,map_pars_fragment:Mf,map_particle_fragment:Sf,map_particle_pars_fragment:Ef,metalnessmap_fragment:bf,metalnessmap_pars_fragment:wf,morphcolor_vertex:Tf,morphnormal_vertex:Af,morphtarget_pars_vertex:Rf,morphtarget_vertex:Cf,normal_fragment_begin:Lf,normal_fragment_maps:Pf,normal_pars_fragment:If,normal_pars_vertex:Df,normal_vertex:Uf,normalmap_pars_fragment:Nf,clearcoat_normal_fragment_begin:Ff,clearcoat_normal_fragment_maps:Of,clearcoat_pars_fragment:Bf,iridescence_pars_fragment:zf,opaque_fragment:kf,packing:Gf,premultiplied_alpha_fragment:Hf,project_vertex:Wf,dithering_fragment:Vf,dithering_pars_fragment:$f,roughnessmap_fragment:Xf,roughnessmap_pars_fragment:jf,shadowmap_pars_fragment:qf,shadowmap_pars_vertex:Yf,shadowmap_vertex:Kf,shadowmask_pars_fragment:Zf,skinbase_vertex:Jf,skinning_pars_vertex:Qf,skinning_vertex:ep,skinnormal_vertex:tp,specularmap_fragment:np,specularmap_pars_fragment:ip,tonemapping_fragment:rp,tonemapping_pars_fragment:sp,transmission_fragment:op,transmission_pars_fragment:ap,uv_pars_fragment:cp,uv_pars_vertex:lp,uv_vertex:up,worldpos_vertex:hp,background_vert:dp,background_frag:fp,backgroundCube_vert:pp,backgroundCube_frag:mp,cube_vert:gp,cube_frag:_p,depth_vert:vp,depth_frag:xp,distanceRGBA_vert:yp,distanceRGBA_frag:Mp,equirect_vert:Sp,equirect_frag:Ep,linedashed_vert:bp,linedashed_frag:wp,meshbasic_vert:Tp,meshbasic_frag:Ap,meshlambert_vert:Rp,meshlambert_frag:Cp,meshmatcap_vert:Lp,meshmatcap_frag:Pp,meshnormal_vert:Ip,meshnormal_frag:Dp,meshphong_vert:Up,meshphong_frag:Np,meshphysical_vert:Fp,meshphysical_frag:Op,meshtoon_vert:Bp,meshtoon_frag:zp,points_vert:kp,points_frag:Gp,shadow_vert:Hp,shadow_frag:Wp,sprite_vert:Vp,sprite_frag:$p},ve={common:{diffuse:{value:new st(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new dt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new dt},normalScale:{value:new je(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new st(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new st(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0},uvTransform:{value:new dt}},sprite:{diffuse:{value:new st(16777215)},opacity:{value:1},center:{value:new je(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}}},Sn={basic:{uniforms:Xt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:at.meshbasic_vert,fragmentShader:at.meshbasic_frag},lambert:{uniforms:Xt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new st(0)}}]),vertexShader:at.meshlambert_vert,fragmentShader:at.meshlambert_frag},phong:{uniforms:Xt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new st(0)},specular:{value:new st(1118481)},shininess:{value:30}}]),vertexShader:at.meshphong_vert,fragmentShader:at.meshphong_frag},standard:{uniforms:Xt([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new st(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag},toon:{uniforms:Xt([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new st(0)}}]),vertexShader:at.meshtoon_vert,fragmentShader:at.meshtoon_frag},matcap:{uniforms:Xt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:at.meshmatcap_vert,fragmentShader:at.meshmatcap_frag},points:{uniforms:Xt([ve.points,ve.fog]),vertexShader:at.points_vert,fragmentShader:at.points_frag},dashed:{uniforms:Xt([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:at.linedashed_vert,fragmentShader:at.linedashed_frag},depth:{uniforms:Xt([ve.common,ve.displacementmap]),vertexShader:at.depth_vert,fragmentShader:at.depth_frag},normal:{uniforms:Xt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:at.meshnormal_vert,fragmentShader:at.meshnormal_frag},sprite:{uniforms:Xt([ve.sprite,ve.fog]),vertexShader:at.sprite_vert,fragmentShader:at.sprite_frag},background:{uniforms:{uvTransform:{value:new dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:at.background_vert,fragmentShader:at.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:at.backgroundCube_vert,fragmentShader:at.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:at.cube_vert,fragmentShader:at.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:at.equirect_vert,fragmentShader:at.equirect_frag},distanceRGBA:{uniforms:Xt([ve.common,ve.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:at.distanceRGBA_vert,fragmentShader:at.distanceRGBA_frag},shadow:{uniforms:Xt([ve.lights,ve.fog,{color:{value:new st(0)},opacity:{value:1}}]),vertexShader:at.shadow_vert,fragmentShader:at.shadow_frag}};Sn.physical={uniforms:Xt([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new dt},clearcoatNormalScale:{value:new je(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new dt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new dt},sheen:{value:0},sheenColor:{value:new st(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new dt},transmissionSamplerSize:{value:new je},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new dt},attenuationDistance:{value:0},attenuationColor:{value:new st(0)},specularColor:{value:new st(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new dt},anisotropyVector:{value:new je},anisotropyMap:{value:null},anisotropyMapTransform:{value:new dt}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag};const cs={r:0,b:0,g:0};function Xp(n,e,t,i,r,s,a){const o=new st(0);let c=s===!0?0:1,l,h,f=null,d=0,m=null;function _(p,u){let v=!1,x=u.isScene===!0?u.background:null;x&&x.isTexture&&(x=(u.backgroundBlurriness>0?t:e).get(x)),x===null?g(o,c):x&&x.isColor&&(g(x,1),v=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?i.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||v)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),x&&(x.isCubeTexture||x.mapping===Us)?(h===void 0&&(h=new Kt(new Br(1,1,1),new Mi({name:"BackgroundCubeMaterial",uniforms:rr(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=u.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,h.material.toneMapped=yt.getTransfer(x.colorSpace)!==wt,(f!==x||d!==x.version||m!==n.toneMapping)&&(h.material.needsUpdate=!0,f=x,d=x.version,m=n.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Kt(new Jo(2,2),new Mi({name:"BackgroundMaterial",uniforms:rr(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,l.material.toneMapped=yt.getTransfer(x.colorSpace)!==wt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(f!==x||d!==x.version||m!==n.toneMapping)&&(l.material.needsUpdate=!0,f=x,d=x.version,m=n.toneMapping),l.layers.enableAll(),p.unshift(l,l.geometry,l.material,0,0,null))}function g(p,u){p.getRGB(cs,Ol(n)),i.buffers.color.setClear(cs.r,cs.g,cs.b,u,a)}return{getClearColor:function(){return o},setClearColor:function(p,u=1){o.set(p),c=u,g(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(p){c=p,g(o,c)},render:_}}function jp(n,e,t,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||s!==null,o={},c=p(null);let l=c,h=!1;function f(L,z,q,X,ee){let J=!1;if(a){const ne=g(X,q,z);l!==ne&&(l=ne,m(l.object)),J=u(L,X,q,ee),J&&v(L,X,q,ee)}else{const ne=z.wireframe===!0;(l.geometry!==X.id||l.program!==q.id||l.wireframe!==ne)&&(l.geometry=X.id,l.program=q.id,l.wireframe=ne,J=!0)}ee!==null&&t.update(ee,n.ELEMENT_ARRAY_BUFFER),(J||h)&&(h=!1,K(L,z,q,X),ee!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(ee).buffer))}function d(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function m(L){return i.isWebGL2?n.bindVertexArray(L):s.bindVertexArrayOES(L)}function _(L){return i.isWebGL2?n.deleteVertexArray(L):s.deleteVertexArrayOES(L)}function g(L,z,q){const X=q.wireframe===!0;let ee=o[L.id];ee===void 0&&(ee={},o[L.id]=ee);let J=ee[z.id];J===void 0&&(J={},ee[z.id]=J);let ne=J[X];return ne===void 0&&(ne=p(d()),J[X]=ne),ne}function p(L){const z=[],q=[],X=[];for(let ee=0;ee<r;ee++)z[ee]=0,q[ee]=0,X[ee]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:q,attributeDivisors:X,object:L,attributes:{},index:null}}function u(L,z,q,X){const ee=l.attributes,J=z.attributes;let ne=0;const ce=q.getAttributes();for(const de in ce)if(ce[de].location>=0){const te=ee[de];let se=J[de];if(se===void 0&&(de==="instanceMatrix"&&L.instanceMatrix&&(se=L.instanceMatrix),de==="instanceColor"&&L.instanceColor&&(se=L.instanceColor)),te===void 0||te.attribute!==se||se&&te.data!==se.data)return!0;ne++}return l.attributesNum!==ne||l.index!==X}function v(L,z,q,X){const ee={},J=z.attributes;let ne=0;const ce=q.getAttributes();for(const de in ce)if(ce[de].location>=0){let te=J[de];te===void 0&&(de==="instanceMatrix"&&L.instanceMatrix&&(te=L.instanceMatrix),de==="instanceColor"&&L.instanceColor&&(te=L.instanceColor));const se={};se.attribute=te,te&&te.data&&(se.data=te.data),ee[de]=se,ne++}l.attributes=ee,l.attributesNum=ne,l.index=X}function x(){const L=l.newAttributes;for(let z=0,q=L.length;z<q;z++)L[z]=0}function E(L){P(L,0)}function P(L,z){const q=l.newAttributes,X=l.enabledAttributes,ee=l.attributeDivisors;q[L]=1,X[L]===0&&(n.enableVertexAttribArray(L),X[L]=1),ee[L]!==z&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,z),ee[L]=z)}function T(){const L=l.newAttributes,z=l.enabledAttributes;for(let q=0,X=z.length;q<X;q++)z[q]!==L[q]&&(n.disableVertexAttribArray(q),z[q]=0)}function A(L,z,q,X,ee,J,ne){ne===!0?n.vertexAttribIPointer(L,z,q,ee,J):n.vertexAttribPointer(L,z,q,X,ee,J)}function K(L,z,q,X){if(i.isWebGL2===!1&&(L.isInstancedMesh||X.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const ee=X.attributes,J=q.getAttributes(),ne=z.defaultAttributeValues;for(const ce in J){const de=J[ce];if(de.location>=0){let k=ee[ce];if(k===void 0&&(ce==="instanceMatrix"&&L.instanceMatrix&&(k=L.instanceMatrix),ce==="instanceColor"&&L.instanceColor&&(k=L.instanceColor)),k!==void 0){const te=k.normalized,se=k.itemSize,De=t.get(k);if(De===void 0)continue;const Pe=De.buffer,et=De.type,We=De.bytesPerElement,Ve=i.isWebGL2===!0&&(et===n.INT||et===n.UNSIGNED_INT||k.gpuType===yl);if(k.isInterleavedBufferAttribute){const lt=k.data,j=lt.stride,Lt=k.offset;if(lt.isInstancedInterleavedBuffer){for(let Be=0;Be<de.locationSize;Be++)P(de.location+Be,lt.meshPerAttribute);L.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let Be=0;Be<de.locationSize;Be++)E(de.location+Be);n.bindBuffer(n.ARRAY_BUFFER,Pe);for(let Be=0;Be<de.locationSize;Be++)A(de.location+Be,se/de.locationSize,et,te,j*We,(Lt+se/de.locationSize*Be)*We,Ve)}else{if(k.isInstancedBufferAttribute){for(let lt=0;lt<de.locationSize;lt++)P(de.location+lt,k.meshPerAttribute);L.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let lt=0;lt<de.locationSize;lt++)E(de.location+lt);n.bindBuffer(n.ARRAY_BUFFER,Pe);for(let lt=0;lt<de.locationSize;lt++)A(de.location+lt,se/de.locationSize,et,te,se*We,se/de.locationSize*lt*We,Ve)}}else if(ne!==void 0){const te=ne[ce];if(te!==void 0)switch(te.length){case 2:n.vertexAttrib2fv(de.location,te);break;case 3:n.vertexAttrib3fv(de.location,te);break;case 4:n.vertexAttrib4fv(de.location,te);break;default:n.vertexAttrib1fv(de.location,te)}}}}T()}function M(){D();for(const L in o){const z=o[L];for(const q in z){const X=z[q];for(const ee in X)_(X[ee].object),delete X[ee];delete z[q]}delete o[L]}}function w(L){if(o[L.id]===void 0)return;const z=o[L.id];for(const q in z){const X=z[q];for(const ee in X)_(X[ee].object),delete X[ee];delete z[q]}delete o[L.id]}function O(L){for(const z in o){const q=o[z];if(q[L.id]===void 0)continue;const X=q[L.id];for(const ee in X)_(X[ee].object),delete X[ee];delete q[L.id]}}function D(){$(),h=!0,l!==c&&(l=c,m(l.object))}function $(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:f,reset:D,resetDefaultState:$,dispose:M,releaseStatesOfGeometry:w,releaseStatesOfProgram:O,initAttributes:x,enableAttribute:E,disableUnusedAttributes:T}}function qp(n,e,t,i){const r=i.isWebGL2;let s;function a(h){s=h}function o(h,f){n.drawArrays(s,h,f),t.update(f,s,1)}function c(h,f,d){if(d===0)return;let m,_;if(r)m=n,_="drawArraysInstanced";else if(m=e.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[_](s,h,f,d),t.update(f,s,d)}function l(h,f,d){if(d===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<d;_++)this.render(h[_],f[_]);else{m.multiDrawArraysWEBGL(s,h,0,f,0,d);let _=0;for(let g=0;g<d;g++)_+=f[g];t.update(_,s,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function Yp(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const c=s(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);const l=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),p=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),u=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),x=d>0,E=a||e.has("OES_texture_float"),P=x&&E,T=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:h,maxTextures:f,maxVertexTextures:d,maxTextureSize:m,maxCubemapSize:_,maxAttributes:g,maxVertexUniforms:p,maxVaryings:u,maxFragmentUniforms:v,vertexTextures:x,floatFragmentTextures:E,floatVertexTextures:P,maxSamples:T}}function Kp(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new Wn,o=new dt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const m=f.length!==0||d||i!==0||r;return r=d,i=f.length,m},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){t=h(f,d,0)},this.setState=function(f,d,m){const _=f.clippingPlanes,g=f.clipIntersection,p=f.clipShadows,u=n.get(f);if(!r||_===null||_.length===0||s&&!p)s?h(null):l();else{const v=s?0:i,x=v*4;let E=u.clippingState||null;c.value=E,E=h(_,d,x,m);for(let P=0;P!==x;++P)E[P]=t[P];u.clippingState=E,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(f,d,m,_){const g=f!==null?f.length:0;let p=null;if(g!==0){if(p=c.value,_!==!0||p===null){const u=m+g*4,v=d.matrixWorldInverse;o.getNormalMatrix(v),(p===null||p.length<u)&&(p=new Float32Array(u));for(let x=0,E=m;x!==g;++x,E+=4)a.copy(f[x]).applyMatrix4(v,o),a.normal.toArray(p,E),p[E+3]=a.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,p}}function Zp(n){let e=new WeakMap;function t(a,o){return o===To?a.mapping=tr:o===Ao&&(a.mapping=nr),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===To||o===Ao)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new cd(c.height/2);return l.fromEquirectangularTexture(n,a),e.set(a,l),a.addEventListener("dispose",r),t(l.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Gl extends Bl{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Zi=4,cc=[.125,.215,.35,.446,.526,.582],di=20,ho=new Gl,lc=new st;let fo=null,po=0,mo=0;const li=(1+Math.sqrt(5))/2,$i=1/li,uc=[new U(1,1,1),new U(-1,1,1),new U(1,1,-1),new U(-1,1,-1),new U(0,li,$i),new U(0,li,-$i),new U($i,0,li),new U(-$i,0,li),new U(li,$i,0),new U(-li,$i,0)];class hc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){fo=this._renderer.getRenderTarget(),po=this._renderer.getActiveCubeFace(),mo=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=pc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(fo,po,mo),e.scissorTest=!1,ls(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===tr||e.mapping===nr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fo=this._renderer.getRenderTarget(),po=this._renderer.getActiveCubeFace(),mo=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:ln,minFilter:ln,generateMipmaps:!1,type:Pr,format:xn,colorSpace:On,depthBuffer:!1},r=dc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=dc(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Jp(s)),this._blurMaterial=Qp(s,e,t)}return r}_compileMaterial(e){const t=new Kt(this._lodPlanes[0],e);this._renderer.compile(t,ho)}_sceneToCubeUV(e,t,i,r){const o=new hn(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(lc),h.toneMapping=Kn,h.autoClear=!1;const m=new Ko({name:"PMREM.Background",side:qt,depthWrite:!1,depthTest:!1}),_=new Kt(new Br,m);let g=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,g=!0):(m.color.copy(lc),g=!0);for(let u=0;u<6;u++){const v=u%3;v===0?(o.up.set(0,c[u],0),o.lookAt(l[u],0,0)):v===1?(o.up.set(0,0,c[u]),o.lookAt(0,l[u],0)):(o.up.set(0,c[u],0),o.lookAt(0,0,l[u]));const x=this._cubeSize;ls(r,v*x,u>2?x:0,x,x),h.setRenderTarget(r),g&&h.render(_,o),h.render(e,o)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=d,h.autoClear=f,e.background=p}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===tr||e.mapping===nr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=pc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Kt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;ls(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,ho)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=uc[(r-1)%uc.length];this._blur(e,r-1,r,s,a)}t.autoClear=i}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new Kt(this._lodPlanes[r],l),d=l.uniforms,m=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*di-1),g=s/_,p=isFinite(s)?1+Math.floor(h*g):di;p>di&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${di}`);const u=[];let v=0;for(let A=0;A<di;++A){const K=A/g,M=Math.exp(-K*K/2);u.push(M),A===0?v+=M:A<p&&(v+=2*M)}for(let A=0;A<u.length;A++)u[A]=u[A]/v;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=u,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:x}=this;d.dTheta.value=_,d.mipInt.value=x-i;const E=this._sizeLods[r],P=3*E*(r>x-Zi?r-x+Zi:0),T=4*(this._cubeSize-E);ls(t,P,T,3*E,2*E),c.setRenderTarget(t),c.render(f,ho)}}function Jp(n){const e=[],t=[],i=[];let r=n;const s=n-Zi+1+cc.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let c=1/o;a>n-Zi?c=cc[a-n+Zi-1]:a===0&&(c=0),i.push(c);const l=1/(o-2),h=-l,f=1+l,d=[h,h,f,h,f,f,h,h,f,f,h,f],m=6,_=6,g=3,p=2,u=1,v=new Float32Array(g*_*m),x=new Float32Array(p*_*m),E=new Float32Array(u*_*m);for(let T=0;T<m;T++){const A=T%3*2/3-1,K=T>2?0:-1,M=[A,K,0,A+2/3,K,0,A+2/3,K+1,0,A,K,0,A+2/3,K+1,0,A,K+1,0];v.set(M,g*_*T),x.set(d,p*_*T);const w=[T,T,T,T,T,T];E.set(w,u*_*T)}const P=new on;P.setAttribute("position",new Mn(v,g)),P.setAttribute("uv",new Mn(x,p)),P.setAttribute("faceIndex",new Mn(E,u)),e.push(P),r>Zi&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function dc(n,e,t){const i=new xi(n,e,t);return i.texture.mapping=Us,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ls(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Qp(n,e,t){const i=new Float32Array(di),r=new U(0,1,0);return new Mi({name:"SphericalGaussianBlur",defines:{n:di,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Qo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function fc(){return new Mi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Qo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function pc(){return new Mi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Qo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function Qo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function em(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const c=o.mapping,l=c===To||c===Ao,h=c===tr||c===nr;if(l||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let f=e.get(o);return t===null&&(t=new hc(n)),f=l?t.fromEquirectangular(o,f):t.fromCubemap(o,f),e.set(o,f),f.texture}else{if(e.has(o))return e.get(o).texture;{const f=o.image;if(l&&f&&f.height>0||h&&f&&r(f)){t===null&&(t=new hc(n));const d=l?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",s),d.texture}else return null}}}return o}function r(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function s(o){const c=o.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function tm(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function nm(n,e,t,i){const r={},s=new WeakMap;function a(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);for(const _ in d.morphAttributes){const g=d.morphAttributes[_];for(let p=0,u=g.length;p<u;p++)e.remove(g[p])}d.removeEventListener("dispose",a),delete r[d.id];const m=s.get(d);m&&(e.remove(m),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function c(f){const d=f.attributes;for(const _ in d)e.update(d[_],n.ARRAY_BUFFER);const m=f.morphAttributes;for(const _ in m){const g=m[_];for(let p=0,u=g.length;p<u;p++)e.update(g[p],n.ARRAY_BUFFER)}}function l(f){const d=[],m=f.index,_=f.attributes.position;let g=0;if(m!==null){const v=m.array;g=m.version;for(let x=0,E=v.length;x<E;x+=3){const P=v[x+0],T=v[x+1],A=v[x+2];d.push(P,T,T,A,A,P)}}else if(_!==void 0){const v=_.array;g=_.version;for(let x=0,E=v.length/3-1;x<E;x+=3){const P=x+0,T=x+1,A=x+2;d.push(P,T,T,A,A,P)}}else return;const p=new(Ll(d)?Fl:Nl)(d,1);p.version=g;const u=s.get(f);u&&e.remove(u),s.set(f,p)}function h(f){const d=s.get(f);if(d){const m=f.index;m!==null&&d.version<m.version&&l(f)}else l(f);return s.get(f)}return{get:o,update:c,getWireframeAttribute:h}}function im(n,e,t,i){const r=i.isWebGL2;let s;function a(m){s=m}let o,c;function l(m){o=m.type,c=m.bytesPerElement}function h(m,_){n.drawElements(s,_,o,m*c),t.update(_,s,1)}function f(m,_,g){if(g===0)return;let p,u;if(r)p=n,u="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),u="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[u](s,_,o,m*c,g),t.update(_,s,g)}function d(m,_,g){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let u=0;u<g;u++)this.render(m[u]/c,_[u]);else{p.multiDrawElementsWEBGL(s,_,0,o,m,0,g);let u=0;for(let v=0;v<g;v++)u+=_[v];t.update(u,s,1)}}this.setMode=a,this.setIndex=l,this.render=h,this.renderInstances=f,this.renderMultiDraw=d}function rm(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function sm(n,e){return n[0]-e[0]}function om(n,e){return Math.abs(e[1])-Math.abs(n[1])}function am(n,e,t){const i={},r=new Float32Array(8),s=new WeakMap,a=new zt,o=[];for(let l=0;l<8;l++)o[l]=[l,0];function c(l,h,f){const d=l.morphTargetInfluences;if(e.isWebGL2===!0){const _=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=_!==void 0?_.length:0;let p=s.get(h);if(p===void 0||p.count!==g){let z=function(){$.dispose(),s.delete(h),h.removeEventListener("dispose",z)};var m=z;p!==void 0&&p.texture.dispose();const x=h.morphAttributes.position!==void 0,E=h.morphAttributes.normal!==void 0,P=h.morphAttributes.color!==void 0,T=h.morphAttributes.position||[],A=h.morphAttributes.normal||[],K=h.morphAttributes.color||[];let M=0;x===!0&&(M=1),E===!0&&(M=2),P===!0&&(M=3);let w=h.attributes.position.count*M,O=1;w>e.maxTextureSize&&(O=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const D=new Float32Array(w*O*4*g),$=new Dl(D,w,O,g);$.type=jn,$.needsUpdate=!0;const L=M*4;for(let q=0;q<g;q++){const X=T[q],ee=A[q],J=K[q],ne=w*O*4*q;for(let ce=0;ce<X.count;ce++){const de=ce*L;x===!0&&(a.fromBufferAttribute(X,ce),D[ne+de+0]=a.x,D[ne+de+1]=a.y,D[ne+de+2]=a.z,D[ne+de+3]=0),E===!0&&(a.fromBufferAttribute(ee,ce),D[ne+de+4]=a.x,D[ne+de+5]=a.y,D[ne+de+6]=a.z,D[ne+de+7]=0),P===!0&&(a.fromBufferAttribute(J,ce),D[ne+de+8]=a.x,D[ne+de+9]=a.y,D[ne+de+10]=a.z,D[ne+de+11]=J.itemSize===4?a.w:1)}}p={count:g,texture:$,size:new je(w,O)},s.set(h,p),h.addEventListener("dispose",z)}let u=0;for(let x=0;x<d.length;x++)u+=d[x];const v=h.morphTargetsRelative?1:1-u;f.getUniforms().setValue(n,"morphTargetBaseInfluence",v),f.getUniforms().setValue(n,"morphTargetInfluences",d),f.getUniforms().setValue(n,"morphTargetsTexture",p.texture,t),f.getUniforms().setValue(n,"morphTargetsTextureSize",p.size)}else{const _=d===void 0?0:d.length;let g=i[h.id];if(g===void 0||g.length!==_){g=[];for(let E=0;E<_;E++)g[E]=[E,0];i[h.id]=g}for(let E=0;E<_;E++){const P=g[E];P[0]=E,P[1]=d[E]}g.sort(om);for(let E=0;E<8;E++)E<_&&g[E][1]?(o[E][0]=g[E][0],o[E][1]=g[E][1]):(o[E][0]=Number.MAX_SAFE_INTEGER,o[E][1]=0);o.sort(sm);const p=h.morphAttributes.position,u=h.morphAttributes.normal;let v=0;for(let E=0;E<8;E++){const P=o[E],T=P[0],A=P[1];T!==Number.MAX_SAFE_INTEGER&&A?(p&&h.getAttribute("morphTarget"+E)!==p[T]&&h.setAttribute("morphTarget"+E,p[T]),u&&h.getAttribute("morphNormal"+E)!==u[T]&&h.setAttribute("morphNormal"+E,u[T]),r[E]=A,v+=A):(p&&h.hasAttribute("morphTarget"+E)===!0&&h.deleteAttribute("morphTarget"+E),u&&h.hasAttribute("morphNormal"+E)===!0&&h.deleteAttribute("morphNormal"+E),r[E]=0)}const x=h.morphTargetsRelative?1:1-v;f.getUniforms().setValue(n,"morphTargetBaseInfluence",x),f.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:c}}function cm(n,e,t,i){let r=new WeakMap;function s(c){const l=i.render.frame,h=c.geometry,f=e.get(c,h);if(r.get(f)!==l&&(e.update(f),r.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==l&&(d.update(),r.set(d,l))}return f}function a(){r=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:a}}class Hl extends tn{constructor(e,t,i,r,s,a,o,c,l,h){if(h=h!==void 0?h:pi,h!==pi&&h!==ir)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===pi&&(i=Xn),i===void 0&&h===ir&&(i=fi),super(null,r,s,a,o,c,h,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:jt,this.minFilter=c!==void 0?c:jt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Wl=new tn,Vl=new Hl(1,1);Vl.compareFunction=Cl;const $l=new Dl,Xl=new $h,jl=new zl,mc=[],gc=[],_c=new Float32Array(16),vc=new Float32Array(9),xc=new Float32Array(4);function ur(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=mc[r];if(s===void 0&&(s=new Float32Array(r),mc[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Nt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ft(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Os(n,e){let t=gc[e];t===void 0&&(t=new Int32Array(e),gc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function lm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function um(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2fv(this.addr,e),Ft(t,e)}}function hm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nt(t,e))return;n.uniform3fv(this.addr,e),Ft(t,e)}}function dm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4fv(this.addr,e),Ft(t,e)}}function fm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ft(t,e)}else{if(Nt(t,i))return;xc.set(i),n.uniformMatrix2fv(this.addr,!1,xc),Ft(t,i)}}function pm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ft(t,e)}else{if(Nt(t,i))return;vc.set(i),n.uniformMatrix3fv(this.addr,!1,vc),Ft(t,i)}}function mm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ft(t,e)}else{if(Nt(t,i))return;_c.set(i),n.uniformMatrix4fv(this.addr,!1,_c),Ft(t,i)}}function gm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function _m(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2iv(this.addr,e),Ft(t,e)}}function vm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3iv(this.addr,e),Ft(t,e)}}function xm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4iv(this.addr,e),Ft(t,e)}}function ym(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Mm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2uiv(this.addr,e),Ft(t,e)}}function Sm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3uiv(this.addr,e),Ft(t,e)}}function Em(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4uiv(this.addr,e),Ft(t,e)}}function bm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);const s=this.type===n.SAMPLER_2D_SHADOW?Vl:Wl;t.setTexture2D(e||s,r)}function wm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Xl,r)}function Tm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||jl,r)}function Am(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||$l,r)}function Rm(n){switch(n){case 5126:return lm;case 35664:return um;case 35665:return hm;case 35666:return dm;case 35674:return fm;case 35675:return pm;case 35676:return mm;case 5124:case 35670:return gm;case 35667:case 35671:return _m;case 35668:case 35672:return vm;case 35669:case 35673:return xm;case 5125:return ym;case 36294:return Mm;case 36295:return Sm;case 36296:return Em;case 35678:case 36198:case 36298:case 36306:case 35682:return bm;case 35679:case 36299:case 36307:return wm;case 35680:case 36300:case 36308:case 36293:return Tm;case 36289:case 36303:case 36311:case 36292:return Am}}function Cm(n,e){n.uniform1fv(this.addr,e)}function Lm(n,e){const t=ur(e,this.size,2);n.uniform2fv(this.addr,t)}function Pm(n,e){const t=ur(e,this.size,3);n.uniform3fv(this.addr,t)}function Im(n,e){const t=ur(e,this.size,4);n.uniform4fv(this.addr,t)}function Dm(n,e){const t=ur(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Um(n,e){const t=ur(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Nm(n,e){const t=ur(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Fm(n,e){n.uniform1iv(this.addr,e)}function Om(n,e){n.uniform2iv(this.addr,e)}function Bm(n,e){n.uniform3iv(this.addr,e)}function zm(n,e){n.uniform4iv(this.addr,e)}function km(n,e){n.uniform1uiv(this.addr,e)}function Gm(n,e){n.uniform2uiv(this.addr,e)}function Hm(n,e){n.uniform3uiv(this.addr,e)}function Wm(n,e){n.uniform4uiv(this.addr,e)}function Vm(n,e,t){const i=this.cache,r=e.length,s=Os(t,r);Nt(i,s)||(n.uniform1iv(this.addr,s),Ft(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Wl,s[a])}function $m(n,e,t){const i=this.cache,r=e.length,s=Os(t,r);Nt(i,s)||(n.uniform1iv(this.addr,s),Ft(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Xl,s[a])}function Xm(n,e,t){const i=this.cache,r=e.length,s=Os(t,r);Nt(i,s)||(n.uniform1iv(this.addr,s),Ft(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||jl,s[a])}function jm(n,e,t){const i=this.cache,r=e.length,s=Os(t,r);Nt(i,s)||(n.uniform1iv(this.addr,s),Ft(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||$l,s[a])}function qm(n){switch(n){case 5126:return Cm;case 35664:return Lm;case 35665:return Pm;case 35666:return Im;case 35674:return Dm;case 35675:return Um;case 35676:return Nm;case 5124:case 35670:return Fm;case 35667:case 35671:return Om;case 35668:case 35672:return Bm;case 35669:case 35673:return zm;case 5125:return km;case 36294:return Gm;case 36295:return Hm;case 36296:return Wm;case 35678:case 36198:case 36298:case 36306:case 35682:return Vm;case 35679:case 36299:case 36307:return $m;case 35680:case 36300:case 36308:case 36293:return Xm;case 36289:case 36303:case 36311:case 36292:return jm}}class Ym{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Rm(t.type)}}class Km{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=qm(t.type)}}class Zm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const go=/(\w+)(\])?(\[|\.)?/g;function yc(n,e){n.seq.push(e),n.map[e.id]=e}function Jm(n,e,t){const i=n.name,r=i.length;for(go.lastIndex=0;;){const s=go.exec(i),a=go.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){yc(t,l===void 0?new Ym(o,n,e):new Km(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new Zm(o),yc(t,f)),t=f}}}class xs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);Jm(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Mc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Qm=37297;let eg=0;function tg(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function ng(n){const e=yt.getPrimaries(yt.workingColorSpace),t=yt.getPrimaries(n);let i;switch(e===t?i="":e===bs&&t===Es?i="LinearDisplayP3ToLinearSRGB":e===Es&&t===bs&&(i="LinearSRGBToLinearDisplayP3"),n){case On:case Ns:return[i,"LinearTransferOETF"];case Bt:case jo:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Sc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+tg(n.getShaderSource(e),a)}else return r}function ig(n,e){const t=ng(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function rg(n,e){let t;switch(e){case nh:t="Linear";break;case ih:t="Reinhard";break;case rh:t="OptimizedCineon";break;case vl:t="ACESFilmic";break;case oh:t="AgX";break;case sh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function sg(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ji).join(`
`)}function og(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ji).join(`
`)}function ag(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function cg(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Ji(n){return n!==""}function Ec(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function bc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const lg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Do(n){return n.replace(lg,hg)}const ug=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function hg(n,e){let t=at[e];if(t===void 0){const i=ug.get(e);if(i!==void 0)t=at[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Do(t)}const dg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wc(n){return n.replace(dg,fg)}function fg(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Tc(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function pg(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===gl?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Lu?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Pn&&(e="SHADOWMAP_TYPE_VSM"),e}function mg(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case tr:case nr:e="ENVMAP_TYPE_CUBE";break;case Us:e="ENVMAP_TYPE_CUBE_UV";break}return e}function gg(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case nr:e="ENVMAP_MODE_REFRACTION";break}return e}function _g(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case _l:e="ENVMAP_BLENDING_MULTIPLY";break;case eh:e="ENVMAP_BLENDING_MIX";break;case th:e="ENVMAP_BLENDING_ADD";break}return e}function vg(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function xg(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=pg(t),l=mg(t),h=gg(t),f=_g(t),d=vg(t),m=t.isWebGL2?"":sg(t),_=og(t),g=ag(s),p=r.createProgram();let u,v,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ji).join(`
`),u.length>0&&(u+=`
`),v=[m,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ji).join(`
`),v.length>0&&(v+=`
`)):(u=[Tc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ji).join(`
`),v=[m,Tc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Kn?"#define TONE_MAPPING":"",t.toneMapping!==Kn?at.tonemapping_pars_fragment:"",t.toneMapping!==Kn?rg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",at.colorspace_pars_fragment,ig("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ji).join(`
`)),a=Do(a),a=Ec(a,t),a=bc(a,t),o=Do(o),o=Ec(o,t),o=bc(o,t),a=wc(a),o=wc(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,u=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,v=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Va?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Va?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const E=x+u+a,P=x+v+o,T=Mc(r,r.VERTEX_SHADER,E),A=Mc(r,r.FRAGMENT_SHADER,P);r.attachShader(p,T),r.attachShader(p,A),t.index0AttributeName!==void 0?r.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(p,0,"position"),r.linkProgram(p);function K(D){if(n.debug.checkShaderErrors){const $=r.getProgramInfoLog(p).trim(),L=r.getShaderInfoLog(T).trim(),z=r.getShaderInfoLog(A).trim();let q=!0,X=!0;if(r.getProgramParameter(p,r.LINK_STATUS)===!1)if(q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,p,T,A);else{const ee=Sc(r,T,"vertex"),J=Sc(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(p,r.VALIDATE_STATUS)+`

Program Info Log: `+$+`
`+ee+`
`+J)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(L===""||z==="")&&(X=!1);X&&(D.diagnostics={runnable:q,programLog:$,vertexShader:{log:L,prefix:u},fragmentShader:{log:z,prefix:v}})}r.deleteShader(T),r.deleteShader(A),M=new xs(r,p),w=cg(r,p)}let M;this.getUniforms=function(){return M===void 0&&K(this),M};let w;this.getAttributes=function(){return w===void 0&&K(this),w};let O=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=r.getProgramParameter(p,Qm)),O},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=eg++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=T,this.fragmentShader=A,this}let yg=0;class Mg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Sg(e),t.set(e,i)),i}}class Sg{constructor(e){this.id=yg++,this.code=e,this.usedTimes=0}}function Eg(n,e,t,i,r,s,a){const o=new Yo,c=new Mg,l=[],h=r.isWebGL2,f=r.logarithmicDepthBuffer,d=r.vertexTextures;let m=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(M){return M===0?"uv":`uv${M}`}function p(M,w,O,D,$){const L=D.fog,z=$.geometry,q=M.isMeshStandardMaterial?D.environment:null,X=(M.isMeshStandardMaterial?t:e).get(M.envMap||q),ee=X&&X.mapping===Us?X.image.height:null,J=_[M.type];M.precision!==null&&(m=r.getMaxPrecision(M.precision),m!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",m,"instead."));const ne=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,ce=ne!==void 0?ne.length:0;let de=0;z.morphAttributes.position!==void 0&&(de=1),z.morphAttributes.normal!==void 0&&(de=2),z.morphAttributes.color!==void 0&&(de=3);let k,te,se,De;if(J){const W=Sn[J];k=W.vertexShader,te=W.fragmentShader}else k=M.vertexShader,te=M.fragmentShader,c.update(M),se=c.getVertexShaderID(M),De=c.getFragmentShaderID(M);const Pe=n.getRenderTarget(),et=$.isInstancedMesh===!0,We=$.isBatchedMesh===!0,Ve=!!M.map,lt=!!M.matcap,j=!!X,Lt=!!M.aoMap,Be=!!M.lightMap,$e=!!M.bumpMap,Ae=!!M.normalMap,gt=!!M.displacementMap,Je=!!M.emissiveMap,b=!!M.metalnessMap,y=!!M.roughnessMap,V=M.anisotropy>0,le=M.clearcoat>0,ie=M.iridescence>0,ue=M.sheen>0,Le=M.transmission>0,ye=V&&!!M.anisotropyMap,we=le&&!!M.clearcoatMap,He=le&&!!M.clearcoatNormalMap,nt=le&&!!M.clearcoatRoughnessMap,oe=ie&&!!M.iridescenceMap,pt=ie&&!!M.iridescenceThicknessMap,ot=ue&&!!M.sheenColorMap,Ye=ue&&!!M.sheenRoughnessMap,Ue=!!M.specularMap,Me=!!M.specularColorMap,R=!!M.specularIntensityMap,he=Le&&!!M.transmissionMap,Ie=Le&&!!M.thicknessMap,be=!!M.gradientMap,ae=!!M.alphaMap,I=M.alphaTest>0,fe=!!M.alphaHash,xe=!!M.extensions,Xe=!!z.attributes.uv1,ke=!!z.attributes.uv2,ut=!!z.attributes.uv3;let ct=Kn;return M.toneMapped&&(Pe===null||Pe.isXRRenderTarget===!0)&&(ct=n.toneMapping),{isWebGL2:h,shaderID:J,shaderType:M.type,shaderName:M.name,vertexShader:k,fragmentShader:te,defines:M.defines,customVertexShaderID:se,customFragmentShaderID:De,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:m,batching:We,instancing:et,instancingColor:et&&$.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:Pe===null?n.outputColorSpace:Pe.isXRRenderTarget===!0?Pe.texture.colorSpace:On,map:Ve,matcap:lt,envMap:j,envMapMode:j&&X.mapping,envMapCubeUVHeight:ee,aoMap:Lt,lightMap:Be,bumpMap:$e,normalMap:Ae,displacementMap:d&&gt,emissiveMap:Je,normalMapObjectSpace:Ae&&M.normalMapType===vh,normalMapTangentSpace:Ae&&M.normalMapType===Rl,metalnessMap:b,roughnessMap:y,anisotropy:V,anisotropyMap:ye,clearcoat:le,clearcoatMap:we,clearcoatNormalMap:He,clearcoatRoughnessMap:nt,iridescence:ie,iridescenceMap:oe,iridescenceThicknessMap:pt,sheen:ue,sheenColorMap:ot,sheenRoughnessMap:Ye,specularMap:Ue,specularColorMap:Me,specularIntensityMap:R,transmission:Le,transmissionMap:he,thicknessMap:Ie,gradientMap:be,opaque:M.transparent===!1&&M.blending===Qi,alphaMap:ae,alphaTest:I,alphaHash:fe,combine:M.combine,mapUv:Ve&&g(M.map.channel),aoMapUv:Lt&&g(M.aoMap.channel),lightMapUv:Be&&g(M.lightMap.channel),bumpMapUv:$e&&g(M.bumpMap.channel),normalMapUv:Ae&&g(M.normalMap.channel),displacementMapUv:gt&&g(M.displacementMap.channel),emissiveMapUv:Je&&g(M.emissiveMap.channel),metalnessMapUv:b&&g(M.metalnessMap.channel),roughnessMapUv:y&&g(M.roughnessMap.channel),anisotropyMapUv:ye&&g(M.anisotropyMap.channel),clearcoatMapUv:we&&g(M.clearcoatMap.channel),clearcoatNormalMapUv:He&&g(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:nt&&g(M.clearcoatRoughnessMap.channel),iridescenceMapUv:oe&&g(M.iridescenceMap.channel),iridescenceThicknessMapUv:pt&&g(M.iridescenceThicknessMap.channel),sheenColorMapUv:ot&&g(M.sheenColorMap.channel),sheenRoughnessMapUv:Ye&&g(M.sheenRoughnessMap.channel),specularMapUv:Ue&&g(M.specularMap.channel),specularColorMapUv:Me&&g(M.specularColorMap.channel),specularIntensityMapUv:R&&g(M.specularIntensityMap.channel),transmissionMapUv:he&&g(M.transmissionMap.channel),thicknessMapUv:Ie&&g(M.thicknessMap.channel),alphaMapUv:ae&&g(M.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Ae||V),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,vertexUv1s:Xe,vertexUv2s:ke,vertexUv3s:ut,pointsUvs:$.isPoints===!0&&!!z.attributes.uv&&(Ve||ae),fog:!!L,useFog:M.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:$.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:ce,morphTextureStride:de,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&O.length>0,shadowMapType:n.shadowMap.type,toneMapping:ct,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Ve&&M.map.isVideoTexture===!0&&yt.getTransfer(M.map.colorSpace)===wt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===In,flipSided:M.side===qt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:xe&&M.extensions.derivatives===!0,extensionFragDepth:xe&&M.extensions.fragDepth===!0,extensionDrawBuffers:xe&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:xe&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:xe&&M.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function u(M){const w=[];if(M.shaderID?w.push(M.shaderID):(w.push(M.customVertexShaderID),w.push(M.customFragmentShaderID)),M.defines!==void 0)for(const O in M.defines)w.push(O),w.push(M.defines[O]);return M.isRawShaderMaterial===!1&&(v(w,M),x(w,M),w.push(n.outputColorSpace)),w.push(M.customProgramCacheKey),w.join()}function v(M,w){M.push(w.precision),M.push(w.outputColorSpace),M.push(w.envMapMode),M.push(w.envMapCubeUVHeight),M.push(w.mapUv),M.push(w.alphaMapUv),M.push(w.lightMapUv),M.push(w.aoMapUv),M.push(w.bumpMapUv),M.push(w.normalMapUv),M.push(w.displacementMapUv),M.push(w.emissiveMapUv),M.push(w.metalnessMapUv),M.push(w.roughnessMapUv),M.push(w.anisotropyMapUv),M.push(w.clearcoatMapUv),M.push(w.clearcoatNormalMapUv),M.push(w.clearcoatRoughnessMapUv),M.push(w.iridescenceMapUv),M.push(w.iridescenceThicknessMapUv),M.push(w.sheenColorMapUv),M.push(w.sheenRoughnessMapUv),M.push(w.specularMapUv),M.push(w.specularColorMapUv),M.push(w.specularIntensityMapUv),M.push(w.transmissionMapUv),M.push(w.thicknessMapUv),M.push(w.combine),M.push(w.fogExp2),M.push(w.sizeAttenuation),M.push(w.morphTargetsCount),M.push(w.morphAttributeCount),M.push(w.numDirLights),M.push(w.numPointLights),M.push(w.numSpotLights),M.push(w.numSpotLightMaps),M.push(w.numHemiLights),M.push(w.numRectAreaLights),M.push(w.numDirLightShadows),M.push(w.numPointLightShadows),M.push(w.numSpotLightShadows),M.push(w.numSpotLightShadowsWithMaps),M.push(w.numLightProbes),M.push(w.shadowMapType),M.push(w.toneMapping),M.push(w.numClippingPlanes),M.push(w.numClipIntersection),M.push(w.depthPacking)}function x(M,w){o.disableAll(),w.isWebGL2&&o.enable(0),w.supportsVertexTextures&&o.enable(1),w.instancing&&o.enable(2),w.instancingColor&&o.enable(3),w.matcap&&o.enable(4),w.envMap&&o.enable(5),w.normalMapObjectSpace&&o.enable(6),w.normalMapTangentSpace&&o.enable(7),w.clearcoat&&o.enable(8),w.iridescence&&o.enable(9),w.alphaTest&&o.enable(10),w.vertexColors&&o.enable(11),w.vertexAlphas&&o.enable(12),w.vertexUv1s&&o.enable(13),w.vertexUv2s&&o.enable(14),w.vertexUv3s&&o.enable(15),w.vertexTangents&&o.enable(16),w.anisotropy&&o.enable(17),w.alphaHash&&o.enable(18),w.batching&&o.enable(19),M.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.skinning&&o.enable(4),w.morphTargets&&o.enable(5),w.morphNormals&&o.enable(6),w.morphColors&&o.enable(7),w.premultipliedAlpha&&o.enable(8),w.shadowMapEnabled&&o.enable(9),w.useLegacyLights&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),M.push(o.mask)}function E(M){const w=_[M.type];let O;if(w){const D=Sn[w];O=rd.clone(D.uniforms)}else O=M.uniforms;return O}function P(M,w){let O;for(let D=0,$=l.length;D<$;D++){const L=l[D];if(L.cacheKey===w){O=L,++O.usedTimes;break}}return O===void 0&&(O=new xg(n,w,M,s),l.push(O)),O}function T(M){if(--M.usedTimes===0){const w=l.indexOf(M);l[w]=l[l.length-1],l.pop(),M.destroy()}}function A(M){c.remove(M)}function K(){c.dispose()}return{getParameters:p,getProgramCacheKey:u,getUniforms:E,acquireProgram:P,releaseProgram:T,releaseShaderCache:A,programs:l,dispose:K}}function bg(){let n=new WeakMap;function e(s){let a=n.get(s);return a===void 0&&(a={},n.set(s,a)),a}function t(s){n.delete(s)}function i(s,a,o){n.get(s)[a]=o}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function wg(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Ac(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Rc(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(f,d,m,_,g,p){let u=n[e];return u===void 0?(u={id:f.id,object:f,geometry:d,material:m,groupOrder:_,renderOrder:f.renderOrder,z:g,group:p},n[e]=u):(u.id=f.id,u.object=f,u.geometry=d,u.material=m,u.groupOrder=_,u.renderOrder=f.renderOrder,u.z=g,u.group=p),e++,u}function o(f,d,m,_,g,p){const u=a(f,d,m,_,g,p);m.transmission>0?i.push(u):m.transparent===!0?r.push(u):t.push(u)}function c(f,d,m,_,g,p){const u=a(f,d,m,_,g,p);m.transmission>0?i.unshift(u):m.transparent===!0?r.unshift(u):t.unshift(u)}function l(f,d){t.length>1&&t.sort(f||wg),i.length>1&&i.sort(d||Ac),r.length>1&&r.sort(d||Ac)}function h(){for(let f=e,d=n.length;f<d;f++){const m=n[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:c,finish:h,sort:l}}function Tg(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Rc,n.set(i,[a])):r>=s.length?(a=new Rc,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Ag(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new st};break;case"SpotLight":t={position:new U,direction:new U,color:new st,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new st,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new st,groundColor:new st};break;case"RectAreaLight":t={color:new st,position:new U,halfWidth:new U,halfHeight:new U};break}return n[e.id]=t,t}}}function Rg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Cg=0;function Lg(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Pg(n,e){const t=new Ag,i=Rg(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)r.probe.push(new U);const s=new U,a=new Ct,o=new Ct;function c(h,f){let d=0,m=0,_=0;for(let D=0;D<9;D++)r.probe[D].set(0,0,0);let g=0,p=0,u=0,v=0,x=0,E=0,P=0,T=0,A=0,K=0,M=0;h.sort(Lg);const w=f===!0?Math.PI:1;for(let D=0,$=h.length;D<$;D++){const L=h[D],z=L.color,q=L.intensity,X=L.distance,ee=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)d+=z.r*q*w,m+=z.g*q*w,_+=z.b*q*w;else if(L.isLightProbe){for(let J=0;J<9;J++)r.probe[J].addScaledVector(L.sh.coefficients[J],q);M++}else if(L.isDirectionalLight){const J=t.get(L);if(J.color.copy(L.color).multiplyScalar(L.intensity*w),L.castShadow){const ne=L.shadow,ce=i.get(L);ce.shadowBias=ne.bias,ce.shadowNormalBias=ne.normalBias,ce.shadowRadius=ne.radius,ce.shadowMapSize=ne.mapSize,r.directionalShadow[g]=ce,r.directionalShadowMap[g]=ee,r.directionalShadowMatrix[g]=L.shadow.matrix,E++}r.directional[g]=J,g++}else if(L.isSpotLight){const J=t.get(L);J.position.setFromMatrixPosition(L.matrixWorld),J.color.copy(z).multiplyScalar(q*w),J.distance=X,J.coneCos=Math.cos(L.angle),J.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),J.decay=L.decay,r.spot[u]=J;const ne=L.shadow;if(L.map&&(r.spotLightMap[A]=L.map,A++,ne.updateMatrices(L),L.castShadow&&K++),r.spotLightMatrix[u]=ne.matrix,L.castShadow){const ce=i.get(L);ce.shadowBias=ne.bias,ce.shadowNormalBias=ne.normalBias,ce.shadowRadius=ne.radius,ce.shadowMapSize=ne.mapSize,r.spotShadow[u]=ce,r.spotShadowMap[u]=ee,T++}u++}else if(L.isRectAreaLight){const J=t.get(L);J.color.copy(z).multiplyScalar(q),J.halfWidth.set(L.width*.5,0,0),J.halfHeight.set(0,L.height*.5,0),r.rectArea[v]=J,v++}else if(L.isPointLight){const J=t.get(L);if(J.color.copy(L.color).multiplyScalar(L.intensity*w),J.distance=L.distance,J.decay=L.decay,L.castShadow){const ne=L.shadow,ce=i.get(L);ce.shadowBias=ne.bias,ce.shadowNormalBias=ne.normalBias,ce.shadowRadius=ne.radius,ce.shadowMapSize=ne.mapSize,ce.shadowCameraNear=ne.camera.near,ce.shadowCameraFar=ne.camera.far,r.pointShadow[p]=ce,r.pointShadowMap[p]=ee,r.pointShadowMatrix[p]=L.shadow.matrix,P++}r.point[p]=J,p++}else if(L.isHemisphereLight){const J=t.get(L);J.skyColor.copy(L.color).multiplyScalar(q*w),J.groundColor.copy(L.groundColor).multiplyScalar(q*w),r.hemi[x]=J,x++}}v>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ve.LTC_FLOAT_1,r.rectAreaLTC2=ve.LTC_FLOAT_2):(r.rectAreaLTC1=ve.LTC_HALF_1,r.rectAreaLTC2=ve.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ve.LTC_FLOAT_1,r.rectAreaLTC2=ve.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=ve.LTC_HALF_1,r.rectAreaLTC2=ve.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=m,r.ambient[2]=_;const O=r.hash;(O.directionalLength!==g||O.pointLength!==p||O.spotLength!==u||O.rectAreaLength!==v||O.hemiLength!==x||O.numDirectionalShadows!==E||O.numPointShadows!==P||O.numSpotShadows!==T||O.numSpotMaps!==A||O.numLightProbes!==M)&&(r.directional.length=g,r.spot.length=u,r.rectArea.length=v,r.point.length=p,r.hemi.length=x,r.directionalShadow.length=E,r.directionalShadowMap.length=E,r.pointShadow.length=P,r.pointShadowMap.length=P,r.spotShadow.length=T,r.spotShadowMap.length=T,r.directionalShadowMatrix.length=E,r.pointShadowMatrix.length=P,r.spotLightMatrix.length=T+A-K,r.spotLightMap.length=A,r.numSpotLightShadowsWithMaps=K,r.numLightProbes=M,O.directionalLength=g,O.pointLength=p,O.spotLength=u,O.rectAreaLength=v,O.hemiLength=x,O.numDirectionalShadows=E,O.numPointShadows=P,O.numSpotShadows=T,O.numSpotMaps=A,O.numLightProbes=M,r.version=Cg++)}function l(h,f){let d=0,m=0,_=0,g=0,p=0;const u=f.matrixWorldInverse;for(let v=0,x=h.length;v<x;v++){const E=h[v];if(E.isDirectionalLight){const P=r.directional[d];P.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(u),d++}else if(E.isSpotLight){const P=r.spot[_];P.position.setFromMatrixPosition(E.matrixWorld),P.position.applyMatrix4(u),P.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(u),_++}else if(E.isRectAreaLight){const P=r.rectArea[g];P.position.setFromMatrixPosition(E.matrixWorld),P.position.applyMatrix4(u),o.identity(),a.copy(E.matrixWorld),a.premultiply(u),o.extractRotation(a),P.halfWidth.set(E.width*.5,0,0),P.halfHeight.set(0,E.height*.5,0),P.halfWidth.applyMatrix4(o),P.halfHeight.applyMatrix4(o),g++}else if(E.isPointLight){const P=r.point[m];P.position.setFromMatrixPosition(E.matrixWorld),P.position.applyMatrix4(u),m++}else if(E.isHemisphereLight){const P=r.hemi[p];P.direction.setFromMatrixPosition(E.matrixWorld),P.direction.transformDirection(u),p++}}}return{setup:c,setupView:l,state:r}}function Cc(n,e){const t=new Pg(n,e),i=[],r=[];function s(){i.length=0,r.length=0}function a(f){i.push(f)}function o(f){r.push(f)}function c(f){t.setup(i,f)}function l(f){t.setupView(i,f)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function Ig(n,e){let t=new WeakMap;function i(s,a=0){const o=t.get(s);let c;return o===void 0?(c=new Cc(n,e),t.set(s,[c])):a>=o.length?(c=new Cc(n,e),o.push(c)):c=o[a],c}function r(){t=new WeakMap}return{get:i,dispose:r}}class Dg extends ei{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=gh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Ug extends ei{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Ng=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Fg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Og(n,e,t){let i=new Zo;const r=new je,s=new je,a=new zt,o=new Dg({depthPacking:_h}),c=new Ug,l={},h=t.maxTextureSize,f={[Jn]:qt,[qt]:Jn,[In]:In},d=new Mi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new je},radius:{value:4}},vertexShader:Ng,fragmentShader:Fg}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const _=new on;_.setAttribute("position",new Mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Kt(_,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=gl;let u=this.type;this.render=function(T,A,K){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;const M=n.getRenderTarget(),w=n.getActiveCubeFace(),O=n.getActiveMipmapLevel(),D=n.state;D.setBlending(Yn),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const $=u!==Pn&&this.type===Pn,L=u===Pn&&this.type!==Pn;for(let z=0,q=T.length;z<q;z++){const X=T[z],ee=X.shadow;if(ee===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(ee.autoUpdate===!1&&ee.needsUpdate===!1)continue;r.copy(ee.mapSize);const J=ee.getFrameExtents();if(r.multiply(J),s.copy(ee.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/J.x),r.x=s.x*J.x,ee.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/J.y),r.y=s.y*J.y,ee.mapSize.y=s.y)),ee.map===null||$===!0||L===!0){const ce=this.type!==Pn?{minFilter:jt,magFilter:jt}:{};ee.map!==null&&ee.map.dispose(),ee.map=new xi(r.x,r.y,ce),ee.map.texture.name=X.name+".shadowMap",ee.camera.updateProjectionMatrix()}n.setRenderTarget(ee.map),n.clear();const ne=ee.getViewportCount();for(let ce=0;ce<ne;ce++){const de=ee.getViewport(ce);a.set(s.x*de.x,s.y*de.y,s.x*de.z,s.y*de.w),D.viewport(a),ee.updateMatrices(X,ce),i=ee.getFrustum(),E(A,K,ee.camera,X,this.type)}ee.isPointLightShadow!==!0&&this.type===Pn&&v(ee,K),ee.needsUpdate=!1}u=this.type,p.needsUpdate=!1,n.setRenderTarget(M,w,O)};function v(T,A){const K=e.update(g);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,m.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new xi(r.x,r.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(A,null,K,d,g,null),m.uniforms.shadow_pass.value=T.mapPass.texture,m.uniforms.resolution.value=T.mapSize,m.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(A,null,K,m,g,null)}function x(T,A,K,M){let w=null;const O=K.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(O!==void 0)w=O;else if(w=K.isPointLight===!0?c:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const D=w.uuid,$=A.uuid;let L=l[D];L===void 0&&(L={},l[D]=L);let z=L[$];z===void 0&&(z=w.clone(),L[$]=z,A.addEventListener("dispose",P)),w=z}if(w.visible=A.visible,w.wireframe=A.wireframe,M===Pn?w.side=A.shadowSide!==null?A.shadowSide:A.side:w.side=A.shadowSide!==null?A.shadowSide:f[A.side],w.alphaMap=A.alphaMap,w.alphaTest=A.alphaTest,w.map=A.map,w.clipShadows=A.clipShadows,w.clippingPlanes=A.clippingPlanes,w.clipIntersection=A.clipIntersection,w.displacementMap=A.displacementMap,w.displacementScale=A.displacementScale,w.displacementBias=A.displacementBias,w.wireframeLinewidth=A.wireframeLinewidth,w.linewidth=A.linewidth,K.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const D=n.properties.get(w);D.light=K}return w}function E(T,A,K,M,w){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&w===Pn)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,T.matrixWorld);const $=e.update(T),L=T.material;if(Array.isArray(L)){const z=$.groups;for(let q=0,X=z.length;q<X;q++){const ee=z[q],J=L[ee.materialIndex];if(J&&J.visible){const ne=x(T,J,M,w);T.onBeforeShadow(n,T,A,K,$,ne,ee),n.renderBufferDirect(K,null,$,ne,T,ee),T.onAfterShadow(n,T,A,K,$,ne,ee)}}}else if(L.visible){const z=x(T,L,M,w);T.onBeforeShadow(n,T,A,K,$,z,null),n.renderBufferDirect(K,null,$,z,T,null),T.onAfterShadow(n,T,A,K,$,z,null)}}const D=T.children;for(let $=0,L=D.length;$<L;$++)E(D[$],A,K,M,w)}function P(T){T.target.removeEventListener("dispose",P);for(const K in l){const M=l[K],w=T.target.uuid;w in M&&(M[w].dispose(),delete M[w])}}}function Bg(n,e,t){const i=t.isWebGL2;function r(){let I=!1;const fe=new zt;let xe=null;const Xe=new zt(0,0,0,0);return{setMask:function(ke){xe!==ke&&!I&&(n.colorMask(ke,ke,ke,ke),xe=ke)},setLocked:function(ke){I=ke},setClear:function(ke,ut,ct,N,W){W===!0&&(ke*=N,ut*=N,ct*=N),fe.set(ke,ut,ct,N),Xe.equals(fe)===!1&&(n.clearColor(ke,ut,ct,N),Xe.copy(fe))},reset:function(){I=!1,xe=null,Xe.set(-1,0,0,0)}}}function s(){let I=!1,fe=null,xe=null,Xe=null;return{setTest:function(ke){ke?We(n.DEPTH_TEST):Ve(n.DEPTH_TEST)},setMask:function(ke){fe!==ke&&!I&&(n.depthMask(ke),fe=ke)},setFunc:function(ke){if(xe!==ke){switch(ke){case ju:n.depthFunc(n.NEVER);break;case qu:n.depthFunc(n.ALWAYS);break;case Yu:n.depthFunc(n.LESS);break;case Ms:n.depthFunc(n.LEQUAL);break;case Ku:n.depthFunc(n.EQUAL);break;case Zu:n.depthFunc(n.GEQUAL);break;case Ju:n.depthFunc(n.GREATER);break;case Qu:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}xe=ke}},setLocked:function(ke){I=ke},setClear:function(ke){Xe!==ke&&(n.clearDepth(ke),Xe=ke)},reset:function(){I=!1,fe=null,xe=null,Xe=null}}}function a(){let I=!1,fe=null,xe=null,Xe=null,ke=null,ut=null,ct=null,N=null,W=null;return{setTest:function(Q){I||(Q?We(n.STENCIL_TEST):Ve(n.STENCIL_TEST))},setMask:function(Q){fe!==Q&&!I&&(n.stencilMask(Q),fe=Q)},setFunc:function(Q,pe,Ee){(xe!==Q||Xe!==pe||ke!==Ee)&&(n.stencilFunc(Q,pe,Ee),xe=Q,Xe=pe,ke=Ee)},setOp:function(Q,pe,Ee){(ut!==Q||ct!==pe||N!==Ee)&&(n.stencilOp(Q,pe,Ee),ut=Q,ct=pe,N=Ee)},setLocked:function(Q){I=Q},setClear:function(Q){W!==Q&&(n.clearStencil(Q),W=Q)},reset:function(){I=!1,fe=null,xe=null,Xe=null,ke=null,ut=null,ct=null,N=null,W=null}}}const o=new r,c=new s,l=new a,h=new WeakMap,f=new WeakMap;let d={},m={},_=new WeakMap,g=[],p=null,u=!1,v=null,x=null,E=null,P=null,T=null,A=null,K=null,M=new st(0,0,0),w=0,O=!1,D=null,$=null,L=null,z=null,q=null;const X=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ee=!1,J=0;const ne=n.getParameter(n.VERSION);ne.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(ne)[1]),ee=J>=1):ne.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),ee=J>=2);let ce=null,de={};const k=n.getParameter(n.SCISSOR_BOX),te=n.getParameter(n.VIEWPORT),se=new zt().fromArray(k),De=new zt().fromArray(te);function Pe(I,fe,xe,Xe){const ke=new Uint8Array(4),ut=n.createTexture();n.bindTexture(I,ut),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ct=0;ct<xe;ct++)i&&(I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY)?n.texImage3D(fe,0,n.RGBA,1,1,Xe,0,n.RGBA,n.UNSIGNED_BYTE,ke):n.texImage2D(fe+ct,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ke);return ut}const et={};et[n.TEXTURE_2D]=Pe(n.TEXTURE_2D,n.TEXTURE_2D,1),et[n.TEXTURE_CUBE_MAP]=Pe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(et[n.TEXTURE_2D_ARRAY]=Pe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),et[n.TEXTURE_3D]=Pe(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),l.setClear(0),We(n.DEPTH_TEST),c.setFunc(Ms),Je(!1),b(ha),We(n.CULL_FACE),Ae(Yn);function We(I){d[I]!==!0&&(n.enable(I),d[I]=!0)}function Ve(I){d[I]!==!1&&(n.disable(I),d[I]=!1)}function lt(I,fe){return m[I]!==fe?(n.bindFramebuffer(I,fe),m[I]=fe,i&&(I===n.DRAW_FRAMEBUFFER&&(m[n.FRAMEBUFFER]=fe),I===n.FRAMEBUFFER&&(m[n.DRAW_FRAMEBUFFER]=fe)),!0):!1}function j(I,fe){let xe=g,Xe=!1;if(I)if(xe=_.get(fe),xe===void 0&&(xe=[],_.set(fe,xe)),I.isWebGLMultipleRenderTargets){const ke=I.texture;if(xe.length!==ke.length||xe[0]!==n.COLOR_ATTACHMENT0){for(let ut=0,ct=ke.length;ut<ct;ut++)xe[ut]=n.COLOR_ATTACHMENT0+ut;xe.length=ke.length,Xe=!0}}else xe[0]!==n.COLOR_ATTACHMENT0&&(xe[0]=n.COLOR_ATTACHMENT0,Xe=!0);else xe[0]!==n.BACK&&(xe[0]=n.BACK,Xe=!0);Xe&&(t.isWebGL2?n.drawBuffers(xe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(xe))}function Lt(I){return p!==I?(n.useProgram(I),p=I,!0):!1}const Be={[hi]:n.FUNC_ADD,[Iu]:n.FUNC_SUBTRACT,[Du]:n.FUNC_REVERSE_SUBTRACT};if(i)Be[ma]=n.MIN,Be[ga]=n.MAX;else{const I=e.get("EXT_blend_minmax");I!==null&&(Be[ma]=I.MIN_EXT,Be[ga]=I.MAX_EXT)}const $e={[Uu]:n.ZERO,[Nu]:n.ONE,[Fu]:n.SRC_COLOR,[bo]:n.SRC_ALPHA,[Hu]:n.SRC_ALPHA_SATURATE,[ku]:n.DST_COLOR,[Bu]:n.DST_ALPHA,[Ou]:n.ONE_MINUS_SRC_COLOR,[wo]:n.ONE_MINUS_SRC_ALPHA,[Gu]:n.ONE_MINUS_DST_COLOR,[zu]:n.ONE_MINUS_DST_ALPHA,[Wu]:n.CONSTANT_COLOR,[Vu]:n.ONE_MINUS_CONSTANT_COLOR,[$u]:n.CONSTANT_ALPHA,[Xu]:n.ONE_MINUS_CONSTANT_ALPHA};function Ae(I,fe,xe,Xe,ke,ut,ct,N,W,Q){if(I===Yn){u===!0&&(Ve(n.BLEND),u=!1);return}if(u===!1&&(We(n.BLEND),u=!0),I!==Pu){if(I!==v||Q!==O){if((x!==hi||T!==hi)&&(n.blendEquation(n.FUNC_ADD),x=hi,T=hi),Q)switch(I){case Qi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case da:n.blendFunc(n.ONE,n.ONE);break;case fa:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case pa:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Qi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case da:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case fa:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case pa:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}E=null,P=null,A=null,K=null,M.set(0,0,0),w=0,v=I,O=Q}return}ke=ke||fe,ut=ut||xe,ct=ct||Xe,(fe!==x||ke!==T)&&(n.blendEquationSeparate(Be[fe],Be[ke]),x=fe,T=ke),(xe!==E||Xe!==P||ut!==A||ct!==K)&&(n.blendFuncSeparate($e[xe],$e[Xe],$e[ut],$e[ct]),E=xe,P=Xe,A=ut,K=ct),(N.equals(M)===!1||W!==w)&&(n.blendColor(N.r,N.g,N.b,W),M.copy(N),w=W),v=I,O=!1}function gt(I,fe){I.side===In?Ve(n.CULL_FACE):We(n.CULL_FACE);let xe=I.side===qt;fe&&(xe=!xe),Je(xe),I.blending===Qi&&I.transparent===!1?Ae(Yn):Ae(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),c.setFunc(I.depthFunc),c.setTest(I.depthTest),c.setMask(I.depthWrite),o.setMask(I.colorWrite);const Xe=I.stencilWrite;l.setTest(Xe),Xe&&(l.setMask(I.stencilWriteMask),l.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),l.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),V(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?We(n.SAMPLE_ALPHA_TO_COVERAGE):Ve(n.SAMPLE_ALPHA_TO_COVERAGE)}function Je(I){D!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),D=I)}function b(I){I!==Ru?(We(n.CULL_FACE),I!==$&&(I===ha?n.cullFace(n.BACK):I===Cu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ve(n.CULL_FACE),$=I}function y(I){I!==L&&(ee&&n.lineWidth(I),L=I)}function V(I,fe,xe){I?(We(n.POLYGON_OFFSET_FILL),(z!==fe||q!==xe)&&(n.polygonOffset(fe,xe),z=fe,q=xe)):Ve(n.POLYGON_OFFSET_FILL)}function le(I){I?We(n.SCISSOR_TEST):Ve(n.SCISSOR_TEST)}function ie(I){I===void 0&&(I=n.TEXTURE0+X-1),ce!==I&&(n.activeTexture(I),ce=I)}function ue(I,fe,xe){xe===void 0&&(ce===null?xe=n.TEXTURE0+X-1:xe=ce);let Xe=de[xe];Xe===void 0&&(Xe={type:void 0,texture:void 0},de[xe]=Xe),(Xe.type!==I||Xe.texture!==fe)&&(ce!==xe&&(n.activeTexture(xe),ce=xe),n.bindTexture(I,fe||et[I]),Xe.type=I,Xe.texture=fe)}function Le(){const I=de[ce];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function ye(){try{n.compressedTexImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function we(){try{n.compressedTexImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function He(){try{n.texSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function nt(){try{n.texSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function oe(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function pt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ot(){try{n.texStorage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ye(){try{n.texStorage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ue(){try{n.texImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Me(){try{n.texImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function R(I){se.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),se.copy(I))}function he(I){De.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),De.copy(I))}function Ie(I,fe){let xe=f.get(fe);xe===void 0&&(xe=new WeakMap,f.set(fe,xe));let Xe=xe.get(I);Xe===void 0&&(Xe=n.getUniformBlockIndex(fe,I.name),xe.set(I,Xe))}function be(I,fe){const Xe=f.get(fe).get(I);h.get(fe)!==Xe&&(n.uniformBlockBinding(fe,Xe,I.__bindingPointIndex),h.set(fe,Xe))}function ae(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},ce=null,de={},m={},_=new WeakMap,g=[],p=null,u=!1,v=null,x=null,E=null,P=null,T=null,A=null,K=null,M=new st(0,0,0),w=0,O=!1,D=null,$=null,L=null,z=null,q=null,se.set(0,0,n.canvas.width,n.canvas.height),De.set(0,0,n.canvas.width,n.canvas.height),o.reset(),c.reset(),l.reset()}return{buffers:{color:o,depth:c,stencil:l},enable:We,disable:Ve,bindFramebuffer:lt,drawBuffers:j,useProgram:Lt,setBlending:Ae,setMaterial:gt,setFlipSided:Je,setCullFace:b,setLineWidth:y,setPolygonOffset:V,setScissorTest:le,activeTexture:ie,bindTexture:ue,unbindTexture:Le,compressedTexImage2D:ye,compressedTexImage3D:we,texImage2D:Ue,texImage3D:Me,updateUBOMapping:Ie,uniformBlockBinding:be,texStorage2D:ot,texStorage3D:Ye,texSubImage2D:He,texSubImage3D:nt,compressedTexSubImage2D:oe,compressedTexSubImage3D:pt,scissor:R,viewport:he,reset:ae}}function zg(n,e,t,i,r,s,a){const o=r.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let f;const d=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(b,y){return m?new OffscreenCanvas(b,y):As("canvas")}function g(b,y,V,le){let ie=1;if((b.width>le||b.height>le)&&(ie=le/Math.max(b.width,b.height)),ie<1||y===!0)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap){const ue=y?Ts:Math.floor,Le=ue(ie*b.width),ye=ue(ie*b.height);f===void 0&&(f=_(Le,ye));const we=V?_(Le,ye):f;return we.width=Le,we.height=ye,we.getContext("2d").drawImage(b,0,0,Le,ye),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+b.width+"x"+b.height+") to ("+Le+"x"+ye+")."),we}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+b.width+"x"+b.height+")."),b;return b}function p(b){return Io(b.width)&&Io(b.height)}function u(b){return o?!1:b.wrapS!==vn||b.wrapT!==vn||b.minFilter!==jt&&b.minFilter!==ln}function v(b,y){return b.generateMipmaps&&y&&b.minFilter!==jt&&b.minFilter!==ln}function x(b){n.generateMipmap(b)}function E(b,y,V,le,ie=!1){if(o===!1)return y;if(b!==null){if(n[b]!==void 0)return n[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let ue=y;if(y===n.RED&&(V===n.FLOAT&&(ue=n.R32F),V===n.HALF_FLOAT&&(ue=n.R16F),V===n.UNSIGNED_BYTE&&(ue=n.R8)),y===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(ue=n.R8UI),V===n.UNSIGNED_SHORT&&(ue=n.R16UI),V===n.UNSIGNED_INT&&(ue=n.R32UI),V===n.BYTE&&(ue=n.R8I),V===n.SHORT&&(ue=n.R16I),V===n.INT&&(ue=n.R32I)),y===n.RG&&(V===n.FLOAT&&(ue=n.RG32F),V===n.HALF_FLOAT&&(ue=n.RG16F),V===n.UNSIGNED_BYTE&&(ue=n.RG8)),y===n.RGBA){const Le=ie?Ss:yt.getTransfer(le);V===n.FLOAT&&(ue=n.RGBA32F),V===n.HALF_FLOAT&&(ue=n.RGBA16F),V===n.UNSIGNED_BYTE&&(ue=Le===wt?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT_4_4_4_4&&(ue=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(ue=n.RGB5_A1)}return(ue===n.R16F||ue===n.R32F||ue===n.RG16F||ue===n.RG32F||ue===n.RGBA16F||ue===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ue}function P(b,y,V){return v(b,V)===!0||b.isFramebufferTexture&&b.minFilter!==jt&&b.minFilter!==ln?Math.log2(Math.max(y.width,y.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?y.mipmaps.length:1}function T(b){return b===jt||b===_a||b===Hs?n.NEAREST:n.LINEAR}function A(b){const y=b.target;y.removeEventListener("dispose",A),M(y),y.isVideoTexture&&h.delete(y)}function K(b){const y=b.target;y.removeEventListener("dispose",K),O(y)}function M(b){const y=i.get(b);if(y.__webglInit===void 0)return;const V=b.source,le=d.get(V);if(le){const ie=le[y.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&w(b),Object.keys(le).length===0&&d.delete(V)}i.remove(b)}function w(b){const y=i.get(b);n.deleteTexture(y.__webglTexture);const V=b.source,le=d.get(V);delete le[y.__cacheKey],a.memory.textures--}function O(b){const y=b.texture,V=i.get(b),le=i.get(y);if(le.__webglTexture!==void 0&&(n.deleteTexture(le.__webglTexture),a.memory.textures--),b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++){if(Array.isArray(V.__webglFramebuffer[ie]))for(let ue=0;ue<V.__webglFramebuffer[ie].length;ue++)n.deleteFramebuffer(V.__webglFramebuffer[ie][ue]);else n.deleteFramebuffer(V.__webglFramebuffer[ie]);V.__webglDepthbuffer&&n.deleteRenderbuffer(V.__webglDepthbuffer[ie])}else{if(Array.isArray(V.__webglFramebuffer))for(let ie=0;ie<V.__webglFramebuffer.length;ie++)n.deleteFramebuffer(V.__webglFramebuffer[ie]);else n.deleteFramebuffer(V.__webglFramebuffer);if(V.__webglDepthbuffer&&n.deleteRenderbuffer(V.__webglDepthbuffer),V.__webglMultisampledFramebuffer&&n.deleteFramebuffer(V.__webglMultisampledFramebuffer),V.__webglColorRenderbuffer)for(let ie=0;ie<V.__webglColorRenderbuffer.length;ie++)V.__webglColorRenderbuffer[ie]&&n.deleteRenderbuffer(V.__webglColorRenderbuffer[ie]);V.__webglDepthRenderbuffer&&n.deleteRenderbuffer(V.__webglDepthRenderbuffer)}if(b.isWebGLMultipleRenderTargets)for(let ie=0,ue=y.length;ie<ue;ie++){const Le=i.get(y[ie]);Le.__webglTexture&&(n.deleteTexture(Le.__webglTexture),a.memory.textures--),i.remove(y[ie])}i.remove(y),i.remove(b)}let D=0;function $(){D=0}function L(){const b=D;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),D+=1,b}function z(b){const y=[];return y.push(b.wrapS),y.push(b.wrapT),y.push(b.wrapR||0),y.push(b.magFilter),y.push(b.minFilter),y.push(b.anisotropy),y.push(b.internalFormat),y.push(b.format),y.push(b.type),y.push(b.generateMipmaps),y.push(b.premultiplyAlpha),y.push(b.flipY),y.push(b.unpackAlignment),y.push(b.colorSpace),y.join()}function q(b,y){const V=i.get(b);if(b.isVideoTexture&&gt(b),b.isRenderTargetTexture===!1&&b.version>0&&V.__version!==b.version){const le=b.image;if(le===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(le.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{se(V,b,y);return}}t.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+y)}function X(b,y){const V=i.get(b);if(b.version>0&&V.__version!==b.version){se(V,b,y);return}t.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+y)}function ee(b,y){const V=i.get(b);if(b.version>0&&V.__version!==b.version){se(V,b,y);return}t.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+y)}function J(b,y){const V=i.get(b);if(b.version>0&&V.__version!==b.version){De(V,b,y);return}t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+y)}const ne={[Ro]:n.REPEAT,[vn]:n.CLAMP_TO_EDGE,[Co]:n.MIRRORED_REPEAT},ce={[jt]:n.NEAREST,[_a]:n.NEAREST_MIPMAP_NEAREST,[Hs]:n.NEAREST_MIPMAP_LINEAR,[ln]:n.LINEAR,[ah]:n.LINEAR_MIPMAP_NEAREST,[Lr]:n.LINEAR_MIPMAP_LINEAR},de={[xh]:n.NEVER,[wh]:n.ALWAYS,[yh]:n.LESS,[Cl]:n.LEQUAL,[Mh]:n.EQUAL,[bh]:n.GEQUAL,[Sh]:n.GREATER,[Eh]:n.NOTEQUAL};function k(b,y,V){if(V?(n.texParameteri(b,n.TEXTURE_WRAP_S,ne[y.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,ne[y.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,ne[y.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,ce[y.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,ce[y.minFilter])):(n.texParameteri(b,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(b,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(y.wrapS!==vn||y.wrapT!==vn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(b,n.TEXTURE_MAG_FILTER,T(y.magFilter)),n.texParameteri(b,n.TEXTURE_MIN_FILTER,T(y.minFilter)),y.minFilter!==jt&&y.minFilter!==ln&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,de[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const le=e.get("EXT_texture_filter_anisotropic");if(y.magFilter===jt||y.minFilter!==Hs&&y.minFilter!==Lr||y.type===jn&&e.has("OES_texture_float_linear")===!1||o===!1&&y.type===Pr&&e.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||i.get(y).__currentAnisotropy)&&(n.texParameterf(b,le.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy)}}function te(b,y){let V=!1;b.__webglInit===void 0&&(b.__webglInit=!0,y.addEventListener("dispose",A));const le=y.source;let ie=d.get(le);ie===void 0&&(ie={},d.set(le,ie));const ue=z(y);if(ue!==b.__cacheKey){ie[ue]===void 0&&(ie[ue]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,V=!0),ie[ue].usedTimes++;const Le=ie[b.__cacheKey];Le!==void 0&&(ie[b.__cacheKey].usedTimes--,Le.usedTimes===0&&w(y)),b.__cacheKey=ue,b.__webglTexture=ie[ue].texture}return V}function se(b,y,V){let le=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(le=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(le=n.TEXTURE_3D);const ie=te(b,y),ue=y.source;t.bindTexture(le,b.__webglTexture,n.TEXTURE0+V);const Le=i.get(ue);if(ue.version!==Le.__version||ie===!0){t.activeTexture(n.TEXTURE0+V);const ye=yt.getPrimaries(yt.workingColorSpace),we=y.colorSpace===dn?null:yt.getPrimaries(y.colorSpace),He=y.colorSpace===dn||ye===we?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,He);const nt=u(y)&&p(y.image)===!1;let oe=g(y.image,nt,!1,r.maxTextureSize);oe=Je(y,oe);const pt=p(oe)||o,ot=s.convert(y.format,y.colorSpace);let Ye=s.convert(y.type),Ue=E(y.internalFormat,ot,Ye,y.colorSpace,y.isVideoTexture);k(le,y,pt);let Me;const R=y.mipmaps,he=o&&y.isVideoTexture!==!0&&Ue!==Tl,Ie=Le.__version===void 0||ie===!0,be=P(y,oe,pt);if(y.isDepthTexture)Ue=n.DEPTH_COMPONENT,o?y.type===jn?Ue=n.DEPTH_COMPONENT32F:y.type===Xn?Ue=n.DEPTH_COMPONENT24:y.type===fi?Ue=n.DEPTH24_STENCIL8:Ue=n.DEPTH_COMPONENT16:y.type===jn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===pi&&Ue===n.DEPTH_COMPONENT&&y.type!==Xo&&y.type!==Xn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=Xn,Ye=s.convert(y.type)),y.format===ir&&Ue===n.DEPTH_COMPONENT&&(Ue=n.DEPTH_STENCIL,y.type!==fi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=fi,Ye=s.convert(y.type))),Ie&&(he?t.texStorage2D(n.TEXTURE_2D,1,Ue,oe.width,oe.height):t.texImage2D(n.TEXTURE_2D,0,Ue,oe.width,oe.height,0,ot,Ye,null));else if(y.isDataTexture)if(R.length>0&&pt){he&&Ie&&t.texStorage2D(n.TEXTURE_2D,be,Ue,R[0].width,R[0].height);for(let ae=0,I=R.length;ae<I;ae++)Me=R[ae],he?t.texSubImage2D(n.TEXTURE_2D,ae,0,0,Me.width,Me.height,ot,Ye,Me.data):t.texImage2D(n.TEXTURE_2D,ae,Ue,Me.width,Me.height,0,ot,Ye,Me.data);y.generateMipmaps=!1}else he?(Ie&&t.texStorage2D(n.TEXTURE_2D,be,Ue,oe.width,oe.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,oe.width,oe.height,ot,Ye,oe.data)):t.texImage2D(n.TEXTURE_2D,0,Ue,oe.width,oe.height,0,ot,Ye,oe.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){he&&Ie&&t.texStorage3D(n.TEXTURE_2D_ARRAY,be,Ue,R[0].width,R[0].height,oe.depth);for(let ae=0,I=R.length;ae<I;ae++)Me=R[ae],y.format!==xn?ot!==null?he?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,Me.width,Me.height,oe.depth,ot,Me.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ae,Ue,Me.width,Me.height,oe.depth,0,Me.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):he?t.texSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,Me.width,Me.height,oe.depth,ot,Ye,Me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ae,Ue,Me.width,Me.height,oe.depth,0,ot,Ye,Me.data)}else{he&&Ie&&t.texStorage2D(n.TEXTURE_2D,be,Ue,R[0].width,R[0].height);for(let ae=0,I=R.length;ae<I;ae++)Me=R[ae],y.format!==xn?ot!==null?he?t.compressedTexSubImage2D(n.TEXTURE_2D,ae,0,0,Me.width,Me.height,ot,Me.data):t.compressedTexImage2D(n.TEXTURE_2D,ae,Ue,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):he?t.texSubImage2D(n.TEXTURE_2D,ae,0,0,Me.width,Me.height,ot,Ye,Me.data):t.texImage2D(n.TEXTURE_2D,ae,Ue,Me.width,Me.height,0,ot,Ye,Me.data)}else if(y.isDataArrayTexture)he?(Ie&&t.texStorage3D(n.TEXTURE_2D_ARRAY,be,Ue,oe.width,oe.height,oe.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,ot,Ye,oe.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ue,oe.width,oe.height,oe.depth,0,ot,Ye,oe.data);else if(y.isData3DTexture)he?(Ie&&t.texStorage3D(n.TEXTURE_3D,be,Ue,oe.width,oe.height,oe.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,ot,Ye,oe.data)):t.texImage3D(n.TEXTURE_3D,0,Ue,oe.width,oe.height,oe.depth,0,ot,Ye,oe.data);else if(y.isFramebufferTexture){if(Ie)if(he)t.texStorage2D(n.TEXTURE_2D,be,Ue,oe.width,oe.height);else{let ae=oe.width,I=oe.height;for(let fe=0;fe<be;fe++)t.texImage2D(n.TEXTURE_2D,fe,Ue,ae,I,0,ot,Ye,null),ae>>=1,I>>=1}}else if(R.length>0&&pt){he&&Ie&&t.texStorage2D(n.TEXTURE_2D,be,Ue,R[0].width,R[0].height);for(let ae=0,I=R.length;ae<I;ae++)Me=R[ae],he?t.texSubImage2D(n.TEXTURE_2D,ae,0,0,ot,Ye,Me):t.texImage2D(n.TEXTURE_2D,ae,Ue,ot,Ye,Me);y.generateMipmaps=!1}else he?(Ie&&t.texStorage2D(n.TEXTURE_2D,be,Ue,oe.width,oe.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,ot,Ye,oe)):t.texImage2D(n.TEXTURE_2D,0,Ue,ot,Ye,oe);v(y,pt)&&x(le),Le.__version=ue.version,y.onUpdate&&y.onUpdate(y)}b.__version=y.version}function De(b,y,V){if(y.image.length!==6)return;const le=te(b,y),ie=y.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+V);const ue=i.get(ie);if(ie.version!==ue.__version||le===!0){t.activeTexture(n.TEXTURE0+V);const Le=yt.getPrimaries(yt.workingColorSpace),ye=y.colorSpace===dn?null:yt.getPrimaries(y.colorSpace),we=y.colorSpace===dn||Le===ye?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);const He=y.isCompressedTexture||y.image[0].isCompressedTexture,nt=y.image[0]&&y.image[0].isDataTexture,oe=[];for(let ae=0;ae<6;ae++)!He&&!nt?oe[ae]=g(y.image[ae],!1,!0,r.maxCubemapSize):oe[ae]=nt?y.image[ae].image:y.image[ae],oe[ae]=Je(y,oe[ae]);const pt=oe[0],ot=p(pt)||o,Ye=s.convert(y.format,y.colorSpace),Ue=s.convert(y.type),Me=E(y.internalFormat,Ye,Ue,y.colorSpace),R=o&&y.isVideoTexture!==!0,he=ue.__version===void 0||le===!0;let Ie=P(y,pt,ot);k(n.TEXTURE_CUBE_MAP,y,ot);let be;if(He){R&&he&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ie,Me,pt.width,pt.height);for(let ae=0;ae<6;ae++){be=oe[ae].mipmaps;for(let I=0;I<be.length;I++){const fe=be[I];y.format!==xn?Ye!==null?R?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,I,0,0,fe.width,fe.height,Ye,fe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,I,Me,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,I,0,0,fe.width,fe.height,Ye,Ue,fe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,I,Me,fe.width,fe.height,0,Ye,Ue,fe.data)}}}else{be=y.mipmaps,R&&he&&(be.length>0&&Ie++,t.texStorage2D(n.TEXTURE_CUBE_MAP,Ie,Me,oe[0].width,oe[0].height));for(let ae=0;ae<6;ae++)if(nt){R?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,oe[ae].width,oe[ae].height,Ye,Ue,oe[ae].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Me,oe[ae].width,oe[ae].height,0,Ye,Ue,oe[ae].data);for(let I=0;I<be.length;I++){const xe=be[I].image[ae].image;R?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,I+1,0,0,xe.width,xe.height,Ye,Ue,xe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,I+1,Me,xe.width,xe.height,0,Ye,Ue,xe.data)}}else{R?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Ye,Ue,oe[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Me,Ye,Ue,oe[ae]);for(let I=0;I<be.length;I++){const fe=be[I];R?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,I+1,0,0,Ye,Ue,fe.image[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,I+1,Me,Ye,Ue,fe.image[ae])}}}v(y,ot)&&x(n.TEXTURE_CUBE_MAP),ue.__version=ie.version,y.onUpdate&&y.onUpdate(y)}b.__version=y.version}function Pe(b,y,V,le,ie,ue){const Le=s.convert(V.format,V.colorSpace),ye=s.convert(V.type),we=E(V.internalFormat,Le,ye,V.colorSpace);if(!i.get(y).__hasExternalTextures){const nt=Math.max(1,y.width>>ue),oe=Math.max(1,y.height>>ue);ie===n.TEXTURE_3D||ie===n.TEXTURE_2D_ARRAY?t.texImage3D(ie,ue,we,nt,oe,y.depth,0,Le,ye,null):t.texImage2D(ie,ue,we,nt,oe,0,Le,ye,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),Ae(y)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,le,ie,i.get(V).__webglTexture,0,$e(y)):(ie===n.TEXTURE_2D||ie>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,le,ie,i.get(V).__webglTexture,ue),t.bindFramebuffer(n.FRAMEBUFFER,null)}function et(b,y,V){if(n.bindRenderbuffer(n.RENDERBUFFER,b),y.depthBuffer&&!y.stencilBuffer){let le=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(V||Ae(y)){const ie=y.depthTexture;ie&&ie.isDepthTexture&&(ie.type===jn?le=n.DEPTH_COMPONENT32F:ie.type===Xn&&(le=n.DEPTH_COMPONENT24));const ue=$e(y);Ae(y)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ue,le,y.width,y.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,ue,le,y.width,y.height)}else n.renderbufferStorage(n.RENDERBUFFER,le,y.width,y.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,b)}else if(y.depthBuffer&&y.stencilBuffer){const le=$e(y);V&&Ae(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,le,n.DEPTH24_STENCIL8,y.width,y.height):Ae(y)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,le,n.DEPTH24_STENCIL8,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,b)}else{const le=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let ie=0;ie<le.length;ie++){const ue=le[ie],Le=s.convert(ue.format,ue.colorSpace),ye=s.convert(ue.type),we=E(ue.internalFormat,Le,ye,ue.colorSpace),He=$e(y);V&&Ae(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,He,we,y.width,y.height):Ae(y)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,He,we,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,we,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function We(b,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),q(y.depthTexture,0);const le=i.get(y.depthTexture).__webglTexture,ie=$e(y);if(y.depthTexture.format===pi)Ae(y)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,le,0,ie):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,le,0);else if(y.depthTexture.format===ir)Ae(y)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,le,0,ie):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,le,0);else throw new Error("Unknown depthTexture format")}function Ve(b){const y=i.get(b),V=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!y.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");We(y.__webglFramebuffer,b)}else if(V){y.__webglDepthbuffer=[];for(let le=0;le<6;le++)t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[le]),y.__webglDepthbuffer[le]=n.createRenderbuffer(),et(y.__webglDepthbuffer[le],b,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=n.createRenderbuffer(),et(y.__webglDepthbuffer,b,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function lt(b,y,V){const le=i.get(b);y!==void 0&&Pe(le.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&Ve(b)}function j(b){const y=b.texture,V=i.get(b),le=i.get(y);b.addEventListener("dispose",K),b.isWebGLMultipleRenderTargets!==!0&&(le.__webglTexture===void 0&&(le.__webglTexture=n.createTexture()),le.__version=y.version,a.memory.textures++);const ie=b.isWebGLCubeRenderTarget===!0,ue=b.isWebGLMultipleRenderTargets===!0,Le=p(b)||o;if(ie){V.__webglFramebuffer=[];for(let ye=0;ye<6;ye++)if(o&&y.mipmaps&&y.mipmaps.length>0){V.__webglFramebuffer[ye]=[];for(let we=0;we<y.mipmaps.length;we++)V.__webglFramebuffer[ye][we]=n.createFramebuffer()}else V.__webglFramebuffer[ye]=n.createFramebuffer()}else{if(o&&y.mipmaps&&y.mipmaps.length>0){V.__webglFramebuffer=[];for(let ye=0;ye<y.mipmaps.length;ye++)V.__webglFramebuffer[ye]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(ue)if(r.drawBuffers){const ye=b.texture;for(let we=0,He=ye.length;we<He;we++){const nt=i.get(ye[we]);nt.__webglTexture===void 0&&(nt.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&b.samples>0&&Ae(b)===!1){const ye=ue?y:[y];V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let we=0;we<ye.length;we++){const He=ye[we];V.__webglColorRenderbuffer[we]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[we]);const nt=s.convert(He.format,He.colorSpace),oe=s.convert(He.type),pt=E(He.internalFormat,nt,oe,He.colorSpace,b.isXRRenderTarget===!0),ot=$e(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,ot,pt,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.RENDERBUFFER,V.__webglColorRenderbuffer[we])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),et(V.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ie){t.bindTexture(n.TEXTURE_CUBE_MAP,le.__webglTexture),k(n.TEXTURE_CUBE_MAP,y,Le);for(let ye=0;ye<6;ye++)if(o&&y.mipmaps&&y.mipmaps.length>0)for(let we=0;we<y.mipmaps.length;we++)Pe(V.__webglFramebuffer[ye][we],b,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ye,we);else Pe(V.__webglFramebuffer[ye],b,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0);v(y,Le)&&x(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){const ye=b.texture;for(let we=0,He=ye.length;we<He;we++){const nt=ye[we],oe=i.get(nt);t.bindTexture(n.TEXTURE_2D,oe.__webglTexture),k(n.TEXTURE_2D,nt,Le),Pe(V.__webglFramebuffer,b,nt,n.COLOR_ATTACHMENT0+we,n.TEXTURE_2D,0),v(nt,Le)&&x(n.TEXTURE_2D)}t.unbindTexture()}else{let ye=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(o?ye=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ye,le.__webglTexture),k(ye,y,Le),o&&y.mipmaps&&y.mipmaps.length>0)for(let we=0;we<y.mipmaps.length;we++)Pe(V.__webglFramebuffer[we],b,y,n.COLOR_ATTACHMENT0,ye,we);else Pe(V.__webglFramebuffer,b,y,n.COLOR_ATTACHMENT0,ye,0);v(y,Le)&&x(ye),t.unbindTexture()}b.depthBuffer&&Ve(b)}function Lt(b){const y=p(b)||o,V=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let le=0,ie=V.length;le<ie;le++){const ue=V[le];if(v(ue,y)){const Le=b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,ye=i.get(ue).__webglTexture;t.bindTexture(Le,ye),x(Le),t.unbindTexture()}}}function Be(b){if(o&&b.samples>0&&Ae(b)===!1){const y=b.isWebGLMultipleRenderTargets?b.texture:[b.texture],V=b.width,le=b.height;let ie=n.COLOR_BUFFER_BIT;const ue=[],Le=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ye=i.get(b),we=b.isWebGLMultipleRenderTargets===!0;if(we)for(let He=0;He<y.length;He++)t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+He,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+He,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let He=0;He<y.length;He++){ue.push(n.COLOR_ATTACHMENT0+He),b.depthBuffer&&ue.push(Le);const nt=ye.__ignoreDepthValues!==void 0?ye.__ignoreDepthValues:!1;if(nt===!1&&(b.depthBuffer&&(ie|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&(ie|=n.STENCIL_BUFFER_BIT)),we&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ye.__webglColorRenderbuffer[He]),nt===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[Le]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[Le])),we){const oe=i.get(y[He]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,oe,0)}n.blitFramebuffer(0,0,V,le,0,0,V,le,ie,n.NEAREST),l&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ue)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),we)for(let He=0;He<y.length;He++){t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+He,n.RENDERBUFFER,ye.__webglColorRenderbuffer[He]);const nt=i.get(y[He]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+He,n.TEXTURE_2D,nt,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}}function $e(b){return Math.min(r.maxSamples,b.samples)}function Ae(b){const y=i.get(b);return o&&b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function gt(b){const y=a.render.frame;h.get(b)!==y&&(h.set(b,y),b.update())}function Je(b,y){const V=b.colorSpace,le=b.format,ie=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||b.format===Po||V!==On&&V!==dn&&(yt.getTransfer(V)===wt?o===!1?e.has("EXT_sRGB")===!0&&le===xn?(b.format=Po,b.minFilter=ln,b.generateMipmaps=!1):y=Pl.sRGBToLinear(y):(le!==xn||ie!==Zn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),y}this.allocateTextureUnit=L,this.resetTextureUnits=$,this.setTexture2D=q,this.setTexture2DArray=X,this.setTexture3D=ee,this.setTextureCube=J,this.rebindTextures=lt,this.setupRenderTarget=j,this.updateRenderTargetMipmap=Lt,this.updateMultisampleRenderTarget=Be,this.setupDepthRenderbuffer=Ve,this.setupFrameBufferTexture=Pe,this.useMultisampledRTT=Ae}function kg(n,e,t){const i=t.isWebGL2;function r(s,a=dn){let o;const c=yt.getTransfer(a);if(s===Zn)return n.UNSIGNED_BYTE;if(s===Ml)return n.UNSIGNED_SHORT_4_4_4_4;if(s===Sl)return n.UNSIGNED_SHORT_5_5_5_1;if(s===ch)return n.BYTE;if(s===lh)return n.SHORT;if(s===Xo)return n.UNSIGNED_SHORT;if(s===yl)return n.INT;if(s===Xn)return n.UNSIGNED_INT;if(s===jn)return n.FLOAT;if(s===Pr)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===uh)return n.ALPHA;if(s===xn)return n.RGBA;if(s===hh)return n.LUMINANCE;if(s===dh)return n.LUMINANCE_ALPHA;if(s===pi)return n.DEPTH_COMPONENT;if(s===ir)return n.DEPTH_STENCIL;if(s===Po)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===fh)return n.RED;if(s===El)return n.RED_INTEGER;if(s===ph)return n.RG;if(s===bl)return n.RG_INTEGER;if(s===wl)return n.RGBA_INTEGER;if(s===Ws||s===Vs||s===$s||s===Xs)if(c===wt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===Ws)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Vs)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===$s)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Xs)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===Ws)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Vs)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===$s)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Xs)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===va||s===xa||s===ya||s===Ma)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===va)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===xa)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===ya)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Ma)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Tl)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Sa||s===Ea)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===Sa)return c===wt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Ea)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===ba||s===wa||s===Ta||s===Aa||s===Ra||s===Ca||s===La||s===Pa||s===Ia||s===Da||s===Ua||s===Na||s===Fa||s===Oa)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===ba)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===wa)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Ta)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Aa)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Ra)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Ca)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===La)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Pa)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Ia)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Da)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Ua)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Na)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Fa)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Oa)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===js||s===Ba||s===za)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===js)return c===wt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Ba)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===za)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===mh||s===ka||s===Ga||s===Ha)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===js)return o.COMPRESSED_RED_RGTC1_EXT;if(s===ka)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Ga)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Ha)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===fi?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class Gg extends hn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class us extends Dt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Hg={type:"move"};class _o{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new us,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new us,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new us,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const g of e.hand.values()){const p=t.getJointPose(g,i),u=this._getHandJoint(l,g);p!==null&&(u.matrix.fromArray(p.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=p.radius),u.visible=p!==null}const h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=h.position.distanceTo(f.position),m=.02,_=.005;l.inputState.pinching&&d>m+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=m-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Hg)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new us;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Wg extends Si{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,f=null,d=null,m=null,_=null;const g=t.getContextAttributes();let p=null,u=null;const v=[],x=[],E=new je;let P=null;const T=new hn;T.layers.enable(1),T.viewport=new zt;const A=new hn;A.layers.enable(2),A.viewport=new zt;const K=[T,A],M=new Gg;M.layers.enable(1),M.layers.enable(2);let w=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let te=v[k];return te===void 0&&(te=new _o,v[k]=te),te.getTargetRaySpace()},this.getControllerGrip=function(k){let te=v[k];return te===void 0&&(te=new _o,v[k]=te),te.getGripSpace()},this.getHand=function(k){let te=v[k];return te===void 0&&(te=new _o,v[k]=te),te.getHandSpace()};function D(k){const te=x.indexOf(k.inputSource);if(te===-1)return;const se=v[te];se!==void 0&&(se.update(k.inputSource,k.frame,l||a),se.dispatchEvent({type:k.type,data:k.inputSource}))}function $(){r.removeEventListener("select",D),r.removeEventListener("selectstart",D),r.removeEventListener("selectend",D),r.removeEventListener("squeeze",D),r.removeEventListener("squeezestart",D),r.removeEventListener("squeezeend",D),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",L);for(let k=0;k<v.length;k++){const te=x[k];te!==null&&(x[k]=null,v[k].disconnect(te))}w=null,O=null,e.setRenderTarget(p),m=null,d=null,f=null,r=null,u=null,de.stop(),i.isPresenting=!1,e.setPixelRatio(P),e.setSize(E.width,E.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){s=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){o=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(k){l=k},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(k){if(r=k,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",D),r.addEventListener("selectstart",D),r.addEventListener("selectend",D),r.addEventListener("squeeze",D),r.addEventListener("squeezestart",D),r.addEventListener("squeezeend",D),r.addEventListener("end",$),r.addEventListener("inputsourceschange",L),g.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(E),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const te={antialias:r.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,te),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),u=new xi(m.framebufferWidth,m.framebufferHeight,{format:xn,type:Zn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let te=null,se=null,De=null;g.depth&&(De=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=g.stencil?ir:pi,se=g.stencil?fi:Xn);const Pe={colorFormat:t.RGBA8,depthFormat:De,scaleFactor:s};f=new XRWebGLBinding(r,t),d=f.createProjectionLayer(Pe),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),u=new xi(d.textureWidth,d.textureHeight,{format:xn,type:Zn,depthTexture:new Hl(d.textureWidth,d.textureHeight,se,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0});const et=e.properties.get(u);et.__ignoreDepthValues=d.ignoreDepthValues}u.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),de.setContext(r),de.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function L(k){for(let te=0;te<k.removed.length;te++){const se=k.removed[te],De=x.indexOf(se);De>=0&&(x[De]=null,v[De].disconnect(se))}for(let te=0;te<k.added.length;te++){const se=k.added[te];let De=x.indexOf(se);if(De===-1){for(let et=0;et<v.length;et++)if(et>=x.length){x.push(se),De=et;break}else if(x[et]===null){x[et]=se,De=et;break}if(De===-1)break}const Pe=v[De];Pe&&Pe.connect(se)}}const z=new U,q=new U;function X(k,te,se){z.setFromMatrixPosition(te.matrixWorld),q.setFromMatrixPosition(se.matrixWorld);const De=z.distanceTo(q),Pe=te.projectionMatrix.elements,et=se.projectionMatrix.elements,We=Pe[14]/(Pe[10]-1),Ve=Pe[14]/(Pe[10]+1),lt=(Pe[9]+1)/Pe[5],j=(Pe[9]-1)/Pe[5],Lt=(Pe[8]-1)/Pe[0],Be=(et[8]+1)/et[0],$e=We*Lt,Ae=We*Be,gt=De/(-Lt+Be),Je=gt*-Lt;te.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(Je),k.translateZ(gt),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert();const b=We+gt,y=Ve+gt,V=$e-Je,le=Ae+(De-Je),ie=lt*Ve/y*b,ue=j*Ve/y*b;k.projectionMatrix.makePerspective(V,le,ie,ue,b,y),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}function ee(k,te){te===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(te.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(r===null)return;M.near=A.near=T.near=k.near,M.far=A.far=T.far=k.far,(w!==M.near||O!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),w=M.near,O=M.far);const te=k.parent,se=M.cameras;ee(M,te);for(let De=0;De<se.length;De++)ee(se[De],te);se.length===2?X(M,T,A):M.projectionMatrix.copy(T.projectionMatrix),J(k,M,te)};function J(k,te,se){se===null?k.matrix.copy(te.matrixWorld):(k.matrix.copy(se.matrixWorld),k.matrix.invert(),k.matrix.multiply(te.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(te.projectionMatrix),k.projectionMatrixInverse.copy(te.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=Ir*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&m===null))return c},this.setFoveation=function(k){c=k,d!==null&&(d.fixedFoveation=k),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=k)};let ne=null;function ce(k,te){if(h=te.getViewerPose(l||a),_=te,h!==null){const se=h.views;m!==null&&(e.setRenderTargetFramebuffer(u,m.framebuffer),e.setRenderTarget(u));let De=!1;se.length!==M.cameras.length&&(M.cameras.length=0,De=!0);for(let Pe=0;Pe<se.length;Pe++){const et=se[Pe];let We=null;if(m!==null)We=m.getViewport(et);else{const lt=f.getViewSubImage(d,et);We=lt.viewport,Pe===0&&(e.setRenderTargetTextures(u,lt.colorTexture,d.ignoreDepthValues?void 0:lt.depthStencilTexture),e.setRenderTarget(u))}let Ve=K[Pe];Ve===void 0&&(Ve=new hn,Ve.layers.enable(Pe),Ve.viewport=new zt,K[Pe]=Ve),Ve.matrix.fromArray(et.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(et.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(We.x,We.y,We.width,We.height),Pe===0&&(M.matrix.copy(Ve.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),De===!0&&M.cameras.push(Ve)}}for(let se=0;se<v.length;se++){const De=x[se],Pe=v[se];De!==null&&Pe!==void 0&&Pe.update(De,te,l||a)}ne&&ne(k,te),te.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:te}),_=null}const de=new kl;de.setAnimationLoop(ce),this.setAnimationLoop=function(k){ne=k},this.dispose=function(){}}}function Vg(n,e){function t(p,u){p.matrixAutoUpdate===!0&&p.updateMatrix(),u.value.copy(p.matrix)}function i(p,u){u.color.getRGB(p.fogColor.value,Ol(n)),u.isFog?(p.fogNear.value=u.near,p.fogFar.value=u.far):u.isFogExp2&&(p.fogDensity.value=u.density)}function r(p,u,v,x,E){u.isMeshBasicMaterial||u.isMeshLambertMaterial?s(p,u):u.isMeshToonMaterial?(s(p,u),f(p,u)):u.isMeshPhongMaterial?(s(p,u),h(p,u)):u.isMeshStandardMaterial?(s(p,u),d(p,u),u.isMeshPhysicalMaterial&&m(p,u,E)):u.isMeshMatcapMaterial?(s(p,u),_(p,u)):u.isMeshDepthMaterial?s(p,u):u.isMeshDistanceMaterial?(s(p,u),g(p,u)):u.isMeshNormalMaterial?s(p,u):u.isLineBasicMaterial?(a(p,u),u.isLineDashedMaterial&&o(p,u)):u.isPointsMaterial?c(p,u,v,x):u.isSpriteMaterial?l(p,u):u.isShadowMaterial?(p.color.value.copy(u.color),p.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(p,u){p.opacity.value=u.opacity,u.color&&p.diffuse.value.copy(u.color),u.emissive&&p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(p.map.value=u.map,t(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.bumpMap&&(p.bumpMap.value=u.bumpMap,t(u.bumpMap,p.bumpMapTransform),p.bumpScale.value=u.bumpScale,u.side===qt&&(p.bumpScale.value*=-1)),u.normalMap&&(p.normalMap.value=u.normalMap,t(u.normalMap,p.normalMapTransform),p.normalScale.value.copy(u.normalScale),u.side===qt&&p.normalScale.value.negate()),u.displacementMap&&(p.displacementMap.value=u.displacementMap,t(u.displacementMap,p.displacementMapTransform),p.displacementScale.value=u.displacementScale,p.displacementBias.value=u.displacementBias),u.emissiveMap&&(p.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,p.emissiveMapTransform)),u.specularMap&&(p.specularMap.value=u.specularMap,t(u.specularMap,p.specularMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest);const v=e.get(u).envMap;if(v&&(p.envMap.value=v,p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=u.reflectivity,p.ior.value=u.ior,p.refractionRatio.value=u.refractionRatio),u.lightMap){p.lightMap.value=u.lightMap;const x=n._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=u.lightMapIntensity*x,t(u.lightMap,p.lightMapTransform)}u.aoMap&&(p.aoMap.value=u.aoMap,p.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,p.aoMapTransform))}function a(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,u.map&&(p.map.value=u.map,t(u.map,p.mapTransform))}function o(p,u){p.dashSize.value=u.dashSize,p.totalSize.value=u.dashSize+u.gapSize,p.scale.value=u.scale}function c(p,u,v,x){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.size.value=u.size*v,p.scale.value=x*.5,u.map&&(p.map.value=u.map,t(u.map,p.uvTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function l(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.rotation.value=u.rotation,u.map&&(p.map.value=u.map,t(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function h(p,u){p.specular.value.copy(u.specular),p.shininess.value=Math.max(u.shininess,1e-4)}function f(p,u){u.gradientMap&&(p.gradientMap.value=u.gradientMap)}function d(p,u){p.metalness.value=u.metalness,u.metalnessMap&&(p.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,p.metalnessMapTransform)),p.roughness.value=u.roughness,u.roughnessMap&&(p.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,p.roughnessMapTransform)),e.get(u).envMap&&(p.envMapIntensity.value=u.envMapIntensity)}function m(p,u,v){p.ior.value=u.ior,u.sheen>0&&(p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),p.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(p.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,p.sheenColorMapTransform)),u.sheenRoughnessMap&&(p.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,p.sheenRoughnessMapTransform))),u.clearcoat>0&&(p.clearcoat.value=u.clearcoat,p.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(p.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,p.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(p.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===qt&&p.clearcoatNormalScale.value.negate())),u.iridescence>0&&(p.iridescence.value=u.iridescence,p.iridescenceIOR.value=u.iridescenceIOR,p.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(p.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,p.iridescenceMapTransform)),u.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),u.transmission>0&&(p.transmission.value=u.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),u.transmissionMap&&(p.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,p.transmissionMapTransform)),p.thickness.value=u.thickness,u.thicknessMap&&(p.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=u.attenuationDistance,p.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(p.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(p.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=u.specularIntensity,p.specularColor.value.copy(u.specularColor),u.specularColorMap&&(p.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,p.specularColorMapTransform)),u.specularIntensityMap&&(p.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,u){u.matcap&&(p.matcap.value=u.matcap)}function g(p,u){const v=e.get(u).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function $g(n,e,t,i){let r={},s={},a=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(v,x){const E=x.program;i.uniformBlockBinding(v,E)}function l(v,x){let E=r[v.id];E===void 0&&(_(v),E=h(v),r[v.id]=E,v.addEventListener("dispose",p));const P=x.program;i.updateUBOMapping(v,P);const T=e.render.frame;s[v.id]!==T&&(d(v),s[v.id]=T)}function h(v){const x=f();v.__bindingPointIndex=x;const E=n.createBuffer(),P=v.__size,T=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,P,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,E),E}function f(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const x=r[v.id],E=v.uniforms,P=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let T=0,A=E.length;T<A;T++){const K=Array.isArray(E[T])?E[T]:[E[T]];for(let M=0,w=K.length;M<w;M++){const O=K[M];if(m(O,T,M,P)===!0){const D=O.__offset,$=Array.isArray(O.value)?O.value:[O.value];let L=0;for(let z=0;z<$.length;z++){const q=$[z],X=g(q);typeof q=="number"||typeof q=="boolean"?(O.__data[0]=q,n.bufferSubData(n.UNIFORM_BUFFER,D+L,O.__data)):q.isMatrix3?(O.__data[0]=q.elements[0],O.__data[1]=q.elements[1],O.__data[2]=q.elements[2],O.__data[3]=0,O.__data[4]=q.elements[3],O.__data[5]=q.elements[4],O.__data[6]=q.elements[5],O.__data[7]=0,O.__data[8]=q.elements[6],O.__data[9]=q.elements[7],O.__data[10]=q.elements[8],O.__data[11]=0):(q.toArray(O.__data,L),L+=X.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,D,O.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(v,x,E,P){const T=v.value,A=x+"_"+E;if(P[A]===void 0)return typeof T=="number"||typeof T=="boolean"?P[A]=T:P[A]=T.clone(),!0;{const K=P[A];if(typeof T=="number"||typeof T=="boolean"){if(K!==T)return P[A]=T,!0}else if(K.equals(T)===!1)return K.copy(T),!0}return!1}function _(v){const x=v.uniforms;let E=0;const P=16;for(let A=0,K=x.length;A<K;A++){const M=Array.isArray(x[A])?x[A]:[x[A]];for(let w=0,O=M.length;w<O;w++){const D=M[w],$=Array.isArray(D.value)?D.value:[D.value];for(let L=0,z=$.length;L<z;L++){const q=$[L],X=g(q),ee=E%P;ee!==0&&P-ee<X.boundary&&(E+=P-ee),D.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=E,E+=X.storage}}}const T=E%P;return T>0&&(E+=P-T),v.__size=E,v.__cache={},this}function g(v){const x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function p(v){const x=v.target;x.removeEventListener("dispose",p);const E=a.indexOf(x.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function u(){for(const v in r)n.deleteBuffer(r[v]);a=[],r={},s={}}return{bind:c,update:l,dispose:u}}class ql{constructor(e={}){const{canvas:t=kh(),context:i=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=a;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const u=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Bt,this._useLegacyLights=!1,this.toneMapping=Kn,this.toneMappingExposure=1;const x=this;let E=!1,P=0,T=0,A=null,K=-1,M=null;const w=new zt,O=new zt;let D=null;const $=new st(0);let L=0,z=t.width,q=t.height,X=1,ee=null,J=null;const ne=new zt(0,0,z,q),ce=new zt(0,0,z,q);let de=!1;const k=new Zo;let te=!1,se=!1,De=null;const Pe=new Ct,et=new je,We=new U,Ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function lt(){return A===null?X:1}let j=i;function Lt(S,B){for(let H=0;H<S.length;H++){const G=S[H],F=t.getContext(G,B);if(F!==null)return F}return null}try{const S={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${$o}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",I,!1),t.addEventListener("webglcontextcreationerror",fe,!1),j===null){const B=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&B.shift(),j=Lt(B,S),j===null)throw Lt(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&j instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),j.getShaderPrecisionFormat===void 0&&(j.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Be,$e,Ae,gt,Je,b,y,V,le,ie,ue,Le,ye,we,He,nt,oe,pt,ot,Ye,Ue,Me,R,he;function Ie(){Be=new tm(j),$e=new Yp(j,Be,e),Be.init($e),Me=new kg(j,Be,$e),Ae=new Bg(j,Be,$e),gt=new rm(j),Je=new bg,b=new zg(j,Be,Ae,Je,$e,Me,gt),y=new Zp(x),V=new em(x),le=new hd(j,$e),R=new jp(j,Be,le,$e),ie=new nm(j,le,gt,R),ue=new cm(j,ie,le,gt),ot=new am(j,$e,b),nt=new Kp(Je),Le=new Eg(x,y,V,Be,$e,R,nt),ye=new Vg(x,Je),we=new Tg,He=new Ig(Be,$e),pt=new Xp(x,y,V,Ae,ue,d,c),oe=new Og(x,ue,$e),he=new $g(j,gt,$e,Ae),Ye=new qp(j,Be,gt,$e),Ue=new im(j,Be,gt,$e),gt.programs=Le.programs,x.capabilities=$e,x.extensions=Be,x.properties=Je,x.renderLists=we,x.shadowMap=oe,x.state=Ae,x.info=gt}Ie();const be=new Wg(x,j);this.xr=be,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){const S=Be.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Be.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(S){S!==void 0&&(X=S,this.setSize(z,q,!1))},this.getSize=function(S){return S.set(z,q)},this.setSize=function(S,B,H=!0){if(be.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=S,q=B,t.width=Math.floor(S*X),t.height=Math.floor(B*X),H===!0&&(t.style.width=S+"px",t.style.height=B+"px"),this.setViewport(0,0,S,B)},this.getDrawingBufferSize=function(S){return S.set(z*X,q*X).floor()},this.setDrawingBufferSize=function(S,B,H){z=S,q=B,X=H,t.width=Math.floor(S*H),t.height=Math.floor(B*H),this.setViewport(0,0,S,B)},this.getCurrentViewport=function(S){return S.copy(w)},this.getViewport=function(S){return S.copy(ne)},this.setViewport=function(S,B,H,G){S.isVector4?ne.set(S.x,S.y,S.z,S.w):ne.set(S,B,H,G),Ae.viewport(w.copy(ne).multiplyScalar(X).floor())},this.getScissor=function(S){return S.copy(ce)},this.setScissor=function(S,B,H,G){S.isVector4?ce.set(S.x,S.y,S.z,S.w):ce.set(S,B,H,G),Ae.scissor(O.copy(ce).multiplyScalar(X).floor())},this.getScissorTest=function(){return de},this.setScissorTest=function(S){Ae.setScissorTest(de=S)},this.setOpaqueSort=function(S){ee=S},this.setTransparentSort=function(S){J=S},this.getClearColor=function(S){return S.copy(pt.getClearColor())},this.setClearColor=function(){pt.setClearColor.apply(pt,arguments)},this.getClearAlpha=function(){return pt.getClearAlpha()},this.setClearAlpha=function(){pt.setClearAlpha.apply(pt,arguments)},this.clear=function(S=!0,B=!0,H=!0){let G=0;if(S){let F=!1;if(A!==null){const me=A.texture.format;F=me===wl||me===bl||me===El}if(F){const me=A.texture.type,Se=me===Zn||me===Xn||me===Xo||me===fi||me===Ml||me===Sl,Fe=pt.getClearColor(),Ge=pt.getClearAlpha(),Ke=Fe.r,qe=Fe.g,Oe=Fe.b;Se?(m[0]=Ke,m[1]=qe,m[2]=Oe,m[3]=Ge,j.clearBufferuiv(j.COLOR,0,m)):(_[0]=Ke,_[1]=qe,_[2]=Oe,_[3]=Ge,j.clearBufferiv(j.COLOR,0,_))}else G|=j.COLOR_BUFFER_BIT}B&&(G|=j.DEPTH_BUFFER_BIT),H&&(G|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),j.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",I,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),we.dispose(),He.dispose(),Je.dispose(),y.dispose(),V.dispose(),ue.dispose(),R.dispose(),he.dispose(),Le.dispose(),be.dispose(),be.removeEventListener("sessionstart",W),be.removeEventListener("sessionend",Q),De&&(De.dispose(),De=null),pe.stop()};function ae(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function I(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const S=gt.autoReset,B=oe.enabled,H=oe.autoUpdate,G=oe.needsUpdate,F=oe.type;Ie(),gt.autoReset=S,oe.enabled=B,oe.autoUpdate=H,oe.needsUpdate=G,oe.type=F}function fe(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function xe(S){const B=S.target;B.removeEventListener("dispose",xe),Xe(B)}function Xe(S){ke(S),Je.remove(S)}function ke(S){const B=Je.get(S).programs;B!==void 0&&(B.forEach(function(H){Le.releaseProgram(H)}),S.isShaderMaterial&&Le.releaseShaderCache(S))}this.renderBufferDirect=function(S,B,H,G,F,me){B===null&&(B=Ve);const Se=F.isMesh&&F.matrixWorld.determinant()<0,Fe=Qe(S,B,H,G,F);Ae.setMaterial(G,Se);let Ge=H.index,Ke=1;if(G.wireframe===!0){if(Ge=ie.getWireframeAttribute(H),Ge===void 0)return;Ke=2}const qe=H.drawRange,Oe=H.attributes.position;let ft=qe.start*Ke,kt=(qe.start+qe.count)*Ke;me!==null&&(ft=Math.max(ft,me.start*Ke),kt=Math.min(kt,(me.start+me.count)*Ke)),Ge!==null?(ft=Math.max(ft,0),kt=Math.min(kt,Ge.count)):Oe!=null&&(ft=Math.max(ft,0),kt=Math.min(kt,Oe.count));const At=kt-ft;if(At<0||At===1/0)return;R.setup(F,G,Fe,H,Ge);let bt,vt=Ye;if(Ge!==null&&(bt=le.get(Ge),vt=Ue,vt.setIndex(bt)),F.isMesh)G.wireframe===!0?(Ae.setLineWidth(G.wireframeLinewidth*lt()),vt.setMode(j.LINES)):vt.setMode(j.TRIANGLES);else if(F.isLine){let rt=G.linewidth;rt===void 0&&(rt=1),Ae.setLineWidth(rt*lt()),F.isLineSegments?vt.setMode(j.LINES):F.isLineLoop?vt.setMode(j.LINE_LOOP):vt.setMode(j.LINE_STRIP)}else F.isPoints?vt.setMode(j.POINTS):F.isSprite&&vt.setMode(j.TRIANGLES);if(F.isBatchedMesh)vt.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else if(F.isInstancedMesh)vt.renderInstances(ft,At,F.count);else if(H.isInstancedBufferGeometry){const rt=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,nn=Math.min(H.instanceCount,rt);vt.renderInstances(ft,At,nn)}else vt.render(ft,At)};function ut(S,B,H){S.transparent===!0&&S.side===In&&S.forceSinglePass===!1?(S.side=qt,S.needsUpdate=!0,tt(S,B,H),S.side=Jn,S.needsUpdate=!0,tt(S,B,H),S.side=In):tt(S,B,H)}this.compile=function(S,B,H=null){H===null&&(H=S),p=He.get(H),p.init(),v.push(p),H.traverseVisible(function(F){F.isLight&&F.layers.test(B.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),S!==H&&S.traverseVisible(function(F){F.isLight&&F.layers.test(B.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights(x._useLegacyLights);const G=new Set;return S.traverse(function(F){const me=F.material;if(me)if(Array.isArray(me))for(let Se=0;Se<me.length;Se++){const Fe=me[Se];ut(Fe,H,F),G.add(Fe)}else ut(me,H,F),G.add(me)}),v.pop(),p=null,G},this.compileAsync=function(S,B,H=null){const G=this.compile(S,B,H);return new Promise(F=>{function me(){if(G.forEach(function(Se){Je.get(Se).currentProgram.isReady()&&G.delete(Se)}),G.size===0){F(S);return}setTimeout(me,10)}Be.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let ct=null;function N(S){ct&&ct(S)}function W(){pe.stop()}function Q(){pe.start()}const pe=new kl;pe.setAnimationLoop(N),typeof self<"u"&&pe.setContext(self),this.setAnimationLoop=function(S){ct=S,be.setAnimationLoop(S),S===null?pe.stop():pe.start()},be.addEventListener("sessionstart",W),be.addEventListener("sessionend",Q),this.render=function(S,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),be.enabled===!0&&be.isPresenting===!0&&(be.cameraAutoUpdate===!0&&be.updateCamera(B),B=be.getCamera()),S.isScene===!0&&S.onBeforeRender(x,S,B,A),p=He.get(S,v.length),p.init(),v.push(p),Pe.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),k.setFromProjectionMatrix(Pe),se=this.localClippingEnabled,te=nt.init(this.clippingPlanes,se),g=we.get(S,u.length),g.init(),u.push(g),Ee(S,B,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(ee,J),this.info.render.frame++,te===!0&&nt.beginShadows();const H=p.state.shadowsArray;if(oe.render(H,S,B),te===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset(),pt.render(g,S),p.setupLights(x._useLegacyLights),B.isArrayCamera){const G=B.cameras;for(let F=0,me=G.length;F<me;F++){const Se=G[F];Ne(g,S,Se,Se.viewport)}}else Ne(g,S,B);A!==null&&(b.updateMultisampleRenderTarget(A),b.updateRenderTargetMipmap(A)),S.isScene===!0&&S.onAfterRender(x,S,B),R.resetDefaultState(),K=-1,M=null,v.pop(),v.length>0?p=v[v.length-1]:p=null,u.pop(),u.length>0?g=u[u.length-1]:g=null};function Ee(S,B,H,G){if(S.visible===!1)return;if(S.layers.test(B.layers)){if(S.isGroup)H=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(B);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||k.intersectsSprite(S)){G&&We.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Pe);const Se=ue.update(S),Fe=S.material;Fe.visible&&g.push(S,Se,Fe,H,We.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||k.intersectsObject(S))){const Se=ue.update(S),Fe=S.material;if(G&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),We.copy(S.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),We.copy(Se.boundingSphere.center)),We.applyMatrix4(S.matrixWorld).applyMatrix4(Pe)),Array.isArray(Fe)){const Ge=Se.groups;for(let Ke=0,qe=Ge.length;Ke<qe;Ke++){const Oe=Ge[Ke],ft=Fe[Oe.materialIndex];ft&&ft.visible&&g.push(S,Se,ft,H,We.z,Oe)}}else Fe.visible&&g.push(S,Se,Fe,H,We.z,null)}}const me=S.children;for(let Se=0,Fe=me.length;Se<Fe;Se++)Ee(me[Se],B,H,G)}function Ne(S,B,H,G){const F=S.opaque,me=S.transmissive,Se=S.transparent;p.setupLightsView(H),te===!0&&nt.setGlobalState(x.clippingPlanes,H),me.length>0&&_e(F,me,B,H),G&&Ae.viewport(w.copy(G)),F.length>0&&ze(F,B,H),me.length>0&&ze(me,B,H),Se.length>0&&ze(Se,B,H),Ae.buffers.depth.setTest(!0),Ae.buffers.depth.setMask(!0),Ae.buffers.color.setMask(!0),Ae.setPolygonOffset(!1)}function _e(S,B,H,G){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;const me=$e.isWebGL2;De===null&&(De=new xi(1,1,{generateMipmaps:!0,type:Be.has("EXT_color_buffer_half_float")?Pr:Zn,minFilter:Lr,samples:me?4:0})),x.getDrawingBufferSize(et),me?De.setSize(et.x,et.y):De.setSize(Ts(et.x),Ts(et.y));const Se=x.getRenderTarget();x.setRenderTarget(De),x.getClearColor($),L=x.getClearAlpha(),L<1&&x.setClearColor(16777215,.5),x.clear();const Fe=x.toneMapping;x.toneMapping=Kn,ze(S,H,G),b.updateMultisampleRenderTarget(De),b.updateRenderTargetMipmap(De);let Ge=!1;for(let Ke=0,qe=B.length;Ke<qe;Ke++){const Oe=B[Ke],ft=Oe.object,kt=Oe.geometry,At=Oe.material,bt=Oe.group;if(At.side===In&&ft.layers.test(G.layers)){const vt=At.side;At.side=qt,At.needsUpdate=!0,Re(ft,H,G,kt,At,bt),At.side=vt,At.needsUpdate=!0,Ge=!0}}Ge===!0&&(b.updateMultisampleRenderTarget(De),b.updateRenderTargetMipmap(De)),x.setRenderTarget(Se),x.setClearColor($,L),x.toneMapping=Fe}function ze(S,B,H){const G=B.isScene===!0?B.overrideMaterial:null;for(let F=0,me=S.length;F<me;F++){const Se=S[F],Fe=Se.object,Ge=Se.geometry,Ke=G===null?Se.material:G,qe=Se.group;Fe.layers.test(H.layers)&&Re(Fe,B,H,Ge,Ke,qe)}}function Re(S,B,H,G,F,me){S.onBeforeRender(x,B,H,G,F,me),S.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),F.onBeforeRender(x,B,H,G,S,me),F.transparent===!0&&F.side===In&&F.forceSinglePass===!1?(F.side=qt,F.needsUpdate=!0,x.renderBufferDirect(H,B,G,F,S,me),F.side=Jn,F.needsUpdate=!0,x.renderBufferDirect(H,B,G,F,S,me),F.side=In):x.renderBufferDirect(H,B,G,F,S,me),S.onAfterRender(x,B,H,G,F,me)}function tt(S,B,H){B.isScene!==!0&&(B=Ve);const G=Je.get(S),F=p.state.lights,me=p.state.shadowsArray,Se=F.state.version,Fe=Le.getParameters(S,F.state,me,B,H),Ge=Le.getProgramCacheKey(Fe);let Ke=G.programs;G.environment=S.isMeshStandardMaterial?B.environment:null,G.fog=B.fog,G.envMap=(S.isMeshStandardMaterial?V:y).get(S.envMap||G.environment),Ke===void 0&&(S.addEventListener("dispose",xe),Ke=new Map,G.programs=Ke);let qe=Ke.get(Ge);if(qe!==void 0){if(G.currentProgram===qe&&G.lightsStateVersion===Se)return ge(S,Fe),qe}else Fe.uniforms=Le.getUniforms(S),S.onBuild(H,Fe,x),S.onBeforeCompile(Fe,x),qe=Le.acquireProgram(Fe,Ge),Ke.set(Ge,qe),G.uniforms=Fe.uniforms;const Oe=G.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Oe.clippingPlanes=nt.uniform),ge(S,Fe),G.needsLights=Tt(S),G.lightsStateVersion=Se,G.needsLights&&(Oe.ambientLightColor.value=F.state.ambient,Oe.lightProbe.value=F.state.probe,Oe.directionalLights.value=F.state.directional,Oe.directionalLightShadows.value=F.state.directionalShadow,Oe.spotLights.value=F.state.spot,Oe.spotLightShadows.value=F.state.spotShadow,Oe.rectAreaLights.value=F.state.rectArea,Oe.ltc_1.value=F.state.rectAreaLTC1,Oe.ltc_2.value=F.state.rectAreaLTC2,Oe.pointLights.value=F.state.point,Oe.pointLightShadows.value=F.state.pointShadow,Oe.hemisphereLights.value=F.state.hemi,Oe.directionalShadowMap.value=F.state.directionalShadowMap,Oe.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Oe.spotShadowMap.value=F.state.spotShadowMap,Oe.spotLightMatrix.value=F.state.spotLightMatrix,Oe.spotLightMap.value=F.state.spotLightMap,Oe.pointShadowMap.value=F.state.pointShadowMap,Oe.pointShadowMatrix.value=F.state.pointShadowMatrix),G.currentProgram=qe,G.uniformsList=null,qe}function it(S){if(S.uniformsList===null){const B=S.currentProgram.getUniforms();S.uniformsList=xs.seqWithValue(B.seq,S.uniforms)}return S.uniformsList}function ge(S,B){const H=Je.get(S);H.outputColorSpace=B.outputColorSpace,H.batching=B.batching,H.instancing=B.instancing,H.instancingColor=B.instancingColor,H.skinning=B.skinning,H.morphTargets=B.morphTargets,H.morphNormals=B.morphNormals,H.morphColors=B.morphColors,H.morphTargetsCount=B.morphTargetsCount,H.numClippingPlanes=B.numClippingPlanes,H.numIntersection=B.numClipIntersection,H.vertexAlphas=B.vertexAlphas,H.vertexTangents=B.vertexTangents,H.toneMapping=B.toneMapping}function Qe(S,B,H,G,F){B.isScene!==!0&&(B=Ve),b.resetTextureUnits();const me=B.fog,Se=G.isMeshStandardMaterial?B.environment:null,Fe=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:On,Ge=(G.isMeshStandardMaterial?V:y).get(G.envMap||Se),Ke=G.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,qe=!!H.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Oe=!!H.morphAttributes.position,ft=!!H.morphAttributes.normal,kt=!!H.morphAttributes.color;let At=Kn;G.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(At=x.toneMapping);const bt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,vt=bt!==void 0?bt.length:0,rt=Je.get(G),nn=p.state.lights;if(te===!0&&(se===!0||S!==M)){const an=S===M&&G.id===K;nt.setState(G,S,an)}let Et=!1;G.version===rt.__version?(rt.needsLights&&rt.lightsStateVersion!==nn.state.version||rt.outputColorSpace!==Fe||F.isBatchedMesh&&rt.batching===!1||!F.isBatchedMesh&&rt.batching===!0||F.isInstancedMesh&&rt.instancing===!1||!F.isInstancedMesh&&rt.instancing===!0||F.isSkinnedMesh&&rt.skinning===!1||!F.isSkinnedMesh&&rt.skinning===!0||F.isInstancedMesh&&rt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&rt.instancingColor===!1&&F.instanceColor!==null||rt.envMap!==Ge||G.fog===!0&&rt.fog!==me||rt.numClippingPlanes!==void 0&&(rt.numClippingPlanes!==nt.numPlanes||rt.numIntersection!==nt.numIntersection)||rt.vertexAlphas!==Ke||rt.vertexTangents!==qe||rt.morphTargets!==Oe||rt.morphNormals!==ft||rt.morphColors!==kt||rt.toneMapping!==At||$e.isWebGL2===!0&&rt.morphTargetsCount!==vt)&&(Et=!0):(Et=!0,rt.__version=G.version);let Yt=rt.currentProgram;Et===!0&&(Yt=tt(G,B,F));let Ti=!1,ni=!1,wn=!1;const Gt=Yt.getUniforms(),ii=rt.uniforms;if(Ae.useProgram(Yt.program)&&(Ti=!0,ni=!0,wn=!0),G.id!==K&&(K=G.id,ni=!0),Ti||M!==S){Gt.setValue(j,"projectionMatrix",S.projectionMatrix),Gt.setValue(j,"viewMatrix",S.matrixWorldInverse);const an=Gt.map.cameraPosition;an!==void 0&&an.setValue(j,We.setFromMatrixPosition(S.matrixWorld)),$e.logarithmicDepthBuffer&&Gt.setValue(j,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&Gt.setValue(j,"isOrthographic",S.isOrthographicCamera===!0),M!==S&&(M=S,ni=!0,wn=!0)}if(F.isSkinnedMesh){Gt.setOptional(j,F,"bindMatrix"),Gt.setOptional(j,F,"bindMatrixInverse");const an=F.skeleton;an&&($e.floatVertexTextures?(an.boneTexture===null&&an.computeBoneTexture(),Gt.setValue(j,"boneTexture",an.boneTexture,b)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}F.isBatchedMesh&&(Gt.setOptional(j,F,"batchingTexture"),Gt.setValue(j,"batchingTexture",F._matricesTexture,b));const ks=H.morphAttributes;if((ks.position!==void 0||ks.normal!==void 0||ks.color!==void 0&&$e.isWebGL2===!0)&&ot.update(F,H,Yt),(ni||rt.receiveShadow!==F.receiveShadow)&&(rt.receiveShadow=F.receiveShadow,Gt.setValue(j,"receiveShadow",F.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(ii.envMap.value=Ge,ii.flipEnvMap.value=Ge.isCubeTexture&&Ge.isRenderTargetTexture===!1?-1:1),ni&&(Gt.setValue(j,"toneMappingExposure",x.toneMappingExposure),rt.needsLights&&mt(ii,wn),me&&G.fog===!0&&ye.refreshFogUniforms(ii,me),ye.refreshMaterialUniforms(ii,G,X,q,De),xs.upload(j,it(rt),ii,b)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(xs.upload(j,it(rt),ii,b),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&Gt.setValue(j,"center",F.center),Gt.setValue(j,"modelViewMatrix",F.modelViewMatrix),Gt.setValue(j,"normalMatrix",F.normalMatrix),Gt.setValue(j,"modelMatrix",F.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const an=G.uniformsGroups;for(let Gs=0,yu=an.length;Gs<yu;Gs++)if($e.isWebGL2){const ua=an[Gs];he.update(ua,Yt),he.bind(ua,Yt)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Yt}function mt(S,B){S.ambientLightColor.needsUpdate=B,S.lightProbe.needsUpdate=B,S.directionalLights.needsUpdate=B,S.directionalLightShadows.needsUpdate=B,S.pointLights.needsUpdate=B,S.pointLightShadows.needsUpdate=B,S.spotLights.needsUpdate=B,S.spotLightShadows.needsUpdate=B,S.rectAreaLights.needsUpdate=B,S.hemisphereLights.needsUpdate=B}function Tt(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(S,B,H){Je.get(S.texture).__webglTexture=B,Je.get(S.depthTexture).__webglTexture=H;const G=Je.get(S);G.__hasExternalTextures=!0,G.__hasExternalTextures&&(G.__autoAllocateDepthBuffer=H===void 0,G.__autoAllocateDepthBuffer||Be.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(S,B){const H=Je.get(S);H.__webglFramebuffer=B,H.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(S,B=0,H=0){A=S,P=B,T=H;let G=!0,F=null,me=!1,Se=!1;if(S){const Ge=Je.get(S);Ge.__useDefaultFramebuffer!==void 0?(Ae.bindFramebuffer(j.FRAMEBUFFER,null),G=!1):Ge.__webglFramebuffer===void 0?b.setupRenderTarget(S):Ge.__hasExternalTextures&&b.rebindTextures(S,Je.get(S.texture).__webglTexture,Je.get(S.depthTexture).__webglTexture);const Ke=S.texture;(Ke.isData3DTexture||Ke.isDataArrayTexture||Ke.isCompressedArrayTexture)&&(Se=!0);const qe=Je.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(qe[B])?F=qe[B][H]:F=qe[B],me=!0):$e.isWebGL2&&S.samples>0&&b.useMultisampledRTT(S)===!1?F=Je.get(S).__webglMultisampledFramebuffer:Array.isArray(qe)?F=qe[H]:F=qe,w.copy(S.viewport),O.copy(S.scissor),D=S.scissorTest}else w.copy(ne).multiplyScalar(X).floor(),O.copy(ce).multiplyScalar(X).floor(),D=de;if(Ae.bindFramebuffer(j.FRAMEBUFFER,F)&&$e.drawBuffers&&G&&Ae.drawBuffers(S,F),Ae.viewport(w),Ae.scissor(O),Ae.setScissorTest(D),me){const Ge=Je.get(S.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+B,Ge.__webglTexture,H)}else if(Se){const Ge=Je.get(S.texture),Ke=B||0;j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,Ge.__webglTexture,H||0,Ke)}K=-1},this.readRenderTargetPixels=function(S,B,H,G,F,me,Se){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=Je.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Se!==void 0&&(Fe=Fe[Se]),Fe){Ae.bindFramebuffer(j.FRAMEBUFFER,Fe);try{const Ge=S.texture,Ke=Ge.format,qe=Ge.type;if(Ke!==xn&&Me.convert(Ke)!==j.getParameter(j.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Oe=qe===Pr&&(Be.has("EXT_color_buffer_half_float")||$e.isWebGL2&&Be.has("EXT_color_buffer_float"));if(qe!==Zn&&Me.convert(qe)!==j.getParameter(j.IMPLEMENTATION_COLOR_READ_TYPE)&&!(qe===jn&&($e.isWebGL2||Be.has("OES_texture_float")||Be.has("WEBGL_color_buffer_float")))&&!Oe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=S.width-G&&H>=0&&H<=S.height-F&&j.readPixels(B,H,G,F,Me.convert(Ke),Me.convert(qe),me)}finally{const Ge=A!==null?Je.get(A).__webglFramebuffer:null;Ae.bindFramebuffer(j.FRAMEBUFFER,Ge)}}},this.copyFramebufferToTexture=function(S,B,H=0){const G=Math.pow(2,-H),F=Math.floor(B.image.width*G),me=Math.floor(B.image.height*G);b.setTexture2D(B,0),j.copyTexSubImage2D(j.TEXTURE_2D,H,0,0,S.x,S.y,F,me),Ae.unbindTexture()},this.copyTextureToTexture=function(S,B,H,G=0){const F=B.image.width,me=B.image.height,Se=Me.convert(H.format),Fe=Me.convert(H.type);b.setTexture2D(H,0),j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,H.flipY),j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),j.pixelStorei(j.UNPACK_ALIGNMENT,H.unpackAlignment),B.isDataTexture?j.texSubImage2D(j.TEXTURE_2D,G,S.x,S.y,F,me,Se,Fe,B.image.data):B.isCompressedTexture?j.compressedTexSubImage2D(j.TEXTURE_2D,G,S.x,S.y,B.mipmaps[0].width,B.mipmaps[0].height,Se,B.mipmaps[0].data):j.texSubImage2D(j.TEXTURE_2D,G,S.x,S.y,Se,Fe,B.image),G===0&&H.generateMipmaps&&j.generateMipmap(j.TEXTURE_2D),Ae.unbindTexture()},this.copyTextureToTexture3D=function(S,B,H,G,F=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const me=S.max.x-S.min.x+1,Se=S.max.y-S.min.y+1,Fe=S.max.z-S.min.z+1,Ge=Me.convert(G.format),Ke=Me.convert(G.type);let qe;if(G.isData3DTexture)b.setTexture3D(G,0),qe=j.TEXTURE_3D;else if(G.isDataArrayTexture||G.isCompressedArrayTexture)b.setTexture2DArray(G,0),qe=j.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,G.flipY),j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),j.pixelStorei(j.UNPACK_ALIGNMENT,G.unpackAlignment);const Oe=j.getParameter(j.UNPACK_ROW_LENGTH),ft=j.getParameter(j.UNPACK_IMAGE_HEIGHT),kt=j.getParameter(j.UNPACK_SKIP_PIXELS),At=j.getParameter(j.UNPACK_SKIP_ROWS),bt=j.getParameter(j.UNPACK_SKIP_IMAGES),vt=H.isCompressedTexture?H.mipmaps[F]:H.image;j.pixelStorei(j.UNPACK_ROW_LENGTH,vt.width),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,vt.height),j.pixelStorei(j.UNPACK_SKIP_PIXELS,S.min.x),j.pixelStorei(j.UNPACK_SKIP_ROWS,S.min.y),j.pixelStorei(j.UNPACK_SKIP_IMAGES,S.min.z),H.isDataTexture||H.isData3DTexture?j.texSubImage3D(qe,F,B.x,B.y,B.z,me,Se,Fe,Ge,Ke,vt.data):H.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),j.compressedTexSubImage3D(qe,F,B.x,B.y,B.z,me,Se,Fe,Ge,vt.data)):j.texSubImage3D(qe,F,B.x,B.y,B.z,me,Se,Fe,Ge,Ke,vt),j.pixelStorei(j.UNPACK_ROW_LENGTH,Oe),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,ft),j.pixelStorei(j.UNPACK_SKIP_PIXELS,kt),j.pixelStorei(j.UNPACK_SKIP_ROWS,At),j.pixelStorei(j.UNPACK_SKIP_IMAGES,bt),F===0&&G.generateMipmaps&&j.generateMipmap(qe),Ae.unbindTexture()},this.initTexture=function(S){S.isCubeTexture?b.setTextureCube(S,0):S.isData3DTexture?b.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?b.setTexture2DArray(S,0):b.setTexture2D(S,0),Ae.unbindTexture()},this.resetState=function(){P=0,T=0,A=null,Ae.reset(),R.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===jo?"display-p3":"srgb",t.unpackColorSpace=yt.workingColorSpace===Ns?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Bt?mi:Al}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===mi?Bt:On}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Xg extends ql{}Xg.prototype.isWebGL1Renderer=!0;class ea{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new st(e),this.density=t}clone(){return new ea(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class jg extends Dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class qg{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Lo,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Nn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const $t=new U;class Rs{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix4(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)$t.fromBufferAttribute(this,t),$t.applyNormalMatrix(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)$t.fromBufferAttribute(this,t),$t.transformDirection(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}setX(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=En(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=En(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=En(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=En(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=xt(t,this.array),i=xt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=xt(t,this.array),i=xt(i,this.array),r=xt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=xt(t,this.array),i=xt(i,this.array),r=xt(r,this.array),s=xt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Mn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Rs(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Yl extends ei{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new st(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Xi;const vr=new U,ji=new U,qi=new U,Yi=new je,xr=new je,Kl=new Ct,hs=new U,yr=new U,ds=new U,Lc=new je,vo=new je,Pc=new je;class Yg extends Dt{constructor(e=new Yl){if(super(),this.isSprite=!0,this.type="Sprite",Xi===void 0){Xi=new on;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new qg(t,5);Xi.setIndex([0,1,2,0,2,3]),Xi.setAttribute("position",new Rs(i,3,0,!1)),Xi.setAttribute("uv",new Rs(i,2,3,!1))}this.geometry=Xi,this.material=e,this.center=new je(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ji.setFromMatrixScale(this.matrixWorld),Kl.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),qi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ji.multiplyScalar(-qi.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const a=this.center;fs(hs.set(-.5,-.5,0),qi,a,ji,r,s),fs(yr.set(.5,-.5,0),qi,a,ji,r,s),fs(ds.set(.5,.5,0),qi,a,ji,r,s),Lc.set(0,0),vo.set(1,0),Pc.set(1,1);let o=e.ray.intersectTriangle(hs,yr,ds,!1,vr);if(o===null&&(fs(yr.set(-.5,.5,0),qi,a,ji,r,s),vo.set(0,1),o=e.ray.intersectTriangle(hs,ds,yr,!1,vr),o===null))return;const c=e.ray.origin.distanceTo(vr);c<e.near||c>e.far||t.push({distance:c,point:vr.clone(),uv:un.getInterpolation(vr,hs,yr,ds,Lc,vo,Pc,new je),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function fs(n,e,t,i,r,s){Yi.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(xr.x=s*Yi.x-r*Yi.y,xr.y=r*Yi.x+s*Yi.y):xr.copy(Yi),n.copy(e),n.x+=xr.x,n.y+=xr.y,n.applyMatrix4(Kl)}class Zl extends ei{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new st(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ic=new U,Dc=new U,Uc=new Ct,xo=new Or,ps=new Fr;class Kg extends Dt{constructor(e=new on,t=new Zl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)Ic.fromBufferAttribute(t,r-1),Dc.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Ic.distanceTo(Dc);e.setAttribute("lineDistance",new pn(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ps.copy(i.boundingSphere),ps.applyMatrix4(r),ps.radius+=s,e.ray.intersectsSphere(ps)===!1)return;Uc.copy(r).invert(),xo.copy(e.ray).applyMatrix4(Uc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=new U,h=new U,f=new U,d=new U,m=this.isLineSegments?2:1,_=i.index,p=i.attributes.position;if(_!==null){const u=Math.max(0,a.start),v=Math.min(_.count,a.start+a.count);for(let x=u,E=v-1;x<E;x+=m){const P=_.getX(x),T=_.getX(x+1);if(l.fromBufferAttribute(p,P),h.fromBufferAttribute(p,T),xo.distanceSqToSegment(l,h,d,f)>c)continue;d.applyMatrix4(this.matrixWorld);const K=e.ray.origin.distanceTo(d);K<e.near||K>e.far||t.push({distance:K,point:f.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const u=Math.max(0,a.start),v=Math.min(p.count,a.start+a.count);for(let x=u,E=v-1;x<E;x+=m){if(l.fromBufferAttribute(p,x),h.fromBufferAttribute(p,x+1),xo.distanceSqToSegment(l,h,d,f)>c)continue;d.applyMatrix4(this.matrixWorld);const T=e.ray.origin.distanceTo(d);T<e.near||T>e.far||t.push({distance:T,point:f.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}class Jl extends ei{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new st(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Nc=new Ct,Uo=new Or,ms=new Fr,gs=new U;class Zg extends Dt{constructor(e=new on,t=new Jl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ms.copy(i.boundingSphere),ms.applyMatrix4(r),ms.radius+=s,e.ray.intersectsSphere(ms)===!1)return;Nc.copy(r).invert(),Uo.copy(e.ray).applyMatrix4(Nc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,f=i.attributes.position;if(l!==null){const d=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let _=d,g=m;_<g;_++){const p=l.getX(_);gs.fromBufferAttribute(f,p),Fc(gs,p,c,r,e,t,this)}}else{const d=Math.max(0,a.start),m=Math.min(f.count,a.start+a.count);for(let _=d,g=m;_<g;_++)gs.fromBufferAttribute(f,_),Fc(gs,_,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Fc(n,e,t,i,r,s,a){const o=Uo.distanceSqToPoint(n);if(o<t){const c=new U;Uo.closestPointToPoint(n,c),c.applyMatrix4(i);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,object:a})}}class Jg extends tn{constructor(e,t,i,r,s,a,o,c,l){super(e,t,i,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Vn extends on{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const h=[],f=new U,d=new U,m=[],_=[],g=[],p=[];for(let u=0;u<=i;u++){const v=[],x=u/i;let E=0;u===0&&a===0?E=.5/t:u===i&&c===Math.PI&&(E=-.5/t);for(let P=0;P<=t;P++){const T=P/t;f.x=-e*Math.cos(r+T*s)*Math.sin(a+x*o),f.y=e*Math.cos(a+x*o),f.z=e*Math.sin(r+T*s)*Math.sin(a+x*o),_.push(f.x,f.y,f.z),d.copy(f).normalize(),g.push(d.x,d.y,d.z),p.push(T+E,1-x),v.push(l++)}h.push(v)}for(let u=0;u<i;u++)for(let v=0;v<t;v++){const x=h[u][v+1],E=h[u][v],P=h[u+1][v],T=h[u+1][v+1];(u!==0||a>0)&&m.push(x,E,T),(u!==i-1||c<Math.PI)&&m.push(E,P,T)}this.setIndex(m),this.setAttribute("position",new pn(_,3)),this.setAttribute("normal",new pn(g,3)),this.setAttribute("uv",new pn(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Mr extends ei{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new st(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new st(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Rl,this.normalScale=new je(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ql extends Dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new st(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class Qg extends Ql{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Dt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new st(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const yo=new Ct,Oc=new U,Bc=new U;class e_{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new je(512,512),this.map=null,this.mapPass=null,this.matrix=new Ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zo,this._frameExtents=new je(1,1),this._viewportCount=1,this._viewports=[new zt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Oc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Oc),Bc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Bc),t.updateMatrixWorld(),yo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yo),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(yo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class t_ extends e_{constructor(){super(new Gl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class zc extends Ql{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Dt.DEFAULT_UP),this.updateMatrix(),this.target=new Dt,this.shadow=new t_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class n_{constructor(e,t,i=0,r=1/0){this.ray=new Or(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Yo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return No(e,this,i,t),i.sort(kc),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)No(e[r],this,i,t);return i.sort(kc),i}}function kc(n,e){return n.distance-e.distance}function No(n,e,t,i){if(n.layers.test(e.layers)&&n.raycast(e,t),i===!0){const r=n.children;for(let s=0,a=r.length;s<a;s++)No(r[s],e,t,!0)}}class Gc{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Vt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:$o}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=$o);const Hc={type:"change"},Mo={type:"start"},Wc={type:"end"},_s=new Or,Vc=new Wn,i_=Math.cos(70*ci.DEG2RAD);class r_ extends Si{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ri.ROTATE,MIDDLE:Ri.DOLLY,RIGHT:Ri.PAN},this.touches={ONE:Ci.ROTATE,TWO:Ci.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(R){R.addEventListener("keydown",He),this._domElementKeyEvents=R},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",He),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(Hc),i.update(),s=r.NONE},this.update=function(){const R=new U,he=new yi().setFromUnitVectors(e.up,new U(0,1,0)),Ie=he.clone().invert(),be=new U,ae=new yi,I=new U,fe=2*Math.PI;return function(Xe=null){const ke=i.object.position;R.copy(ke).sub(i.target),R.applyQuaternion(he),o.setFromVector3(R),i.autoRotate&&s===r.NONE&&D(w(Xe)),i.enableDamping?(o.theta+=c.theta*i.dampingFactor,o.phi+=c.phi*i.dampingFactor):(o.theta+=c.theta,o.phi+=c.phi);let ut=i.minAzimuthAngle,ct=i.maxAzimuthAngle;isFinite(ut)&&isFinite(ct)&&(ut<-Math.PI?ut+=fe:ut>Math.PI&&(ut-=fe),ct<-Math.PI?ct+=fe:ct>Math.PI&&(ct-=fe),ut<=ct?o.theta=Math.max(ut,Math.min(ct,o.theta)):o.theta=o.theta>(ut+ct)/2?Math.max(ut,o.theta):Math.min(ct,o.theta)),o.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,o.phi)),o.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(h,i.dampingFactor):i.target.add(h),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor),i.zoomToCursor&&T||i.object.isOrthographicCamera?o.radius=ne(o.radius):o.radius=ne(o.radius*l),R.setFromSpherical(o),R.applyQuaternion(Ie),ke.copy(i.target).add(R),i.object.lookAt(i.target),i.enableDamping===!0?(c.theta*=1-i.dampingFactor,c.phi*=1-i.dampingFactor,h.multiplyScalar(1-i.dampingFactor)):(c.set(0,0,0),h.set(0,0,0));let N=!1;if(i.zoomToCursor&&T){let W=null;if(i.object.isPerspectiveCamera){const Q=R.length();W=ne(Q*l);const pe=Q-W;i.object.position.addScaledVector(E,pe),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){const Q=new U(P.x,P.y,0);Q.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/l)),i.object.updateProjectionMatrix(),N=!0;const pe=new U(P.x,P.y,0);pe.unproject(i.object),i.object.position.sub(pe).add(Q),i.object.updateMatrixWorld(),W=R.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;W!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(W).add(i.object.position):(_s.origin.copy(i.object.position),_s.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(_s.direction))<i_?e.lookAt(i.target):(Vc.setFromNormalAndCoplanarPoint(i.object.up,i.target),_s.intersectPlane(Vc,i.target))))}else i.object.isOrthographicCamera&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/l)),i.object.updateProjectionMatrix(),N=!0);return l=1,T=!1,N||be.distanceToSquared(i.object.position)>a||8*(1-ae.dot(i.object.quaternion))>a||I.distanceToSquared(i.target)>0?(i.dispatchEvent(Hc),be.copy(i.object.position),ae.copy(i.object.quaternion),I.copy(i.target),!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",pt),i.domElement.removeEventListener("pointerdown",b),i.domElement.removeEventListener("pointercancel",V),i.domElement.removeEventListener("wheel",ue),i.domElement.removeEventListener("pointermove",y),i.domElement.removeEventListener("pointerup",V),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",He),i._domElementKeyEvents=null)};const i=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const a=1e-6,o=new Gc,c=new Gc;let l=1;const h=new U,f=new je,d=new je,m=new je,_=new je,g=new je,p=new je,u=new je,v=new je,x=new je,E=new U,P=new je;let T=!1;const A=[],K={};let M=!1;function w(R){return R!==null?2*Math.PI/60*i.autoRotateSpeed*R:2*Math.PI/60/60*i.autoRotateSpeed}function O(R){const he=Math.abs(R*.01);return Math.pow(.95,i.zoomSpeed*he)}function D(R){c.theta-=R}function $(R){c.phi-=R}const L=function(){const R=new U;return function(Ie,be){R.setFromMatrixColumn(be,0),R.multiplyScalar(-Ie),h.add(R)}}(),z=function(){const R=new U;return function(Ie,be){i.screenSpacePanning===!0?R.setFromMatrixColumn(be,1):(R.setFromMatrixColumn(be,0),R.crossVectors(i.object.up,R)),R.multiplyScalar(Ie),h.add(R)}}(),q=function(){const R=new U;return function(Ie,be){const ae=i.domElement;if(i.object.isPerspectiveCamera){const I=i.object.position;R.copy(I).sub(i.target);let fe=R.length();fe*=Math.tan(i.object.fov/2*Math.PI/180),L(2*Ie*fe/ae.clientHeight,i.object.matrix),z(2*be*fe/ae.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(L(Ie*(i.object.right-i.object.left)/i.object.zoom/ae.clientWidth,i.object.matrix),z(be*(i.object.top-i.object.bottom)/i.object.zoom/ae.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function X(R){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?l/=R:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function ee(R){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?l*=R:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function J(R,he){if(!i.zoomToCursor)return;T=!0;const Ie=i.domElement.getBoundingClientRect(),be=R-Ie.left,ae=he-Ie.top,I=Ie.width,fe=Ie.height;P.x=be/I*2-1,P.y=-(ae/fe)*2+1,E.set(P.x,P.y,1).unproject(i.object).sub(i.object.position).normalize()}function ne(R){return Math.max(i.minDistance,Math.min(i.maxDistance,R))}function ce(R){f.set(R.clientX,R.clientY)}function de(R){J(R.clientX,R.clientX),u.set(R.clientX,R.clientY)}function k(R){_.set(R.clientX,R.clientY)}function te(R){d.set(R.clientX,R.clientY),m.subVectors(d,f).multiplyScalar(i.rotateSpeed);const he=i.domElement;D(2*Math.PI*m.x/he.clientHeight),$(2*Math.PI*m.y/he.clientHeight),f.copy(d),i.update()}function se(R){v.set(R.clientX,R.clientY),x.subVectors(v,u),x.y>0?X(O(x.y)):x.y<0&&ee(O(x.y)),u.copy(v),i.update()}function De(R){g.set(R.clientX,R.clientY),p.subVectors(g,_).multiplyScalar(i.panSpeed),q(p.x,p.y),_.copy(g),i.update()}function Pe(R){J(R.clientX,R.clientY),R.deltaY<0?ee(O(R.deltaY)):R.deltaY>0&&X(O(R.deltaY)),i.update()}function et(R){let he=!1;switch(R.code){case i.keys.UP:R.ctrlKey||R.metaKey||R.shiftKey?$(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):q(0,i.keyPanSpeed),he=!0;break;case i.keys.BOTTOM:R.ctrlKey||R.metaKey||R.shiftKey?$(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):q(0,-i.keyPanSpeed),he=!0;break;case i.keys.LEFT:R.ctrlKey||R.metaKey||R.shiftKey?D(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):q(i.keyPanSpeed,0),he=!0;break;case i.keys.RIGHT:R.ctrlKey||R.metaKey||R.shiftKey?D(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):q(-i.keyPanSpeed,0),he=!0;break}he&&(R.preventDefault(),i.update())}function We(R){if(A.length===1)f.set(R.pageX,R.pageY);else{const he=Me(R),Ie=.5*(R.pageX+he.x),be=.5*(R.pageY+he.y);f.set(Ie,be)}}function Ve(R){if(A.length===1)_.set(R.pageX,R.pageY);else{const he=Me(R),Ie=.5*(R.pageX+he.x),be=.5*(R.pageY+he.y);_.set(Ie,be)}}function lt(R){const he=Me(R),Ie=R.pageX-he.x,be=R.pageY-he.y,ae=Math.sqrt(Ie*Ie+be*be);u.set(0,ae)}function j(R){i.enableZoom&&lt(R),i.enablePan&&Ve(R)}function Lt(R){i.enableZoom&&lt(R),i.enableRotate&&We(R)}function Be(R){if(A.length==1)d.set(R.pageX,R.pageY);else{const Ie=Me(R),be=.5*(R.pageX+Ie.x),ae=.5*(R.pageY+Ie.y);d.set(be,ae)}m.subVectors(d,f).multiplyScalar(i.rotateSpeed);const he=i.domElement;D(2*Math.PI*m.x/he.clientHeight),$(2*Math.PI*m.y/he.clientHeight),f.copy(d)}function $e(R){if(A.length===1)g.set(R.pageX,R.pageY);else{const he=Me(R),Ie=.5*(R.pageX+he.x),be=.5*(R.pageY+he.y);g.set(Ie,be)}p.subVectors(g,_).multiplyScalar(i.panSpeed),q(p.x,p.y),_.copy(g)}function Ae(R){const he=Me(R),Ie=R.pageX-he.x,be=R.pageY-he.y,ae=Math.sqrt(Ie*Ie+be*be);v.set(0,ae),x.set(0,Math.pow(v.y/u.y,i.zoomSpeed)),X(x.y),u.copy(v);const I=(R.pageX+he.x)*.5,fe=(R.pageY+he.y)*.5;J(I,fe)}function gt(R){i.enableZoom&&Ae(R),i.enablePan&&$e(R)}function Je(R){i.enableZoom&&Ae(R),i.enableRotate&&Be(R)}function b(R){i.enabled!==!1&&(A.length===0&&(i.domElement.setPointerCapture(R.pointerId),i.domElement.addEventListener("pointermove",y),i.domElement.addEventListener("pointerup",V)),ot(R),R.pointerType==="touch"?nt(R):le(R))}function y(R){i.enabled!==!1&&(R.pointerType==="touch"?oe(R):ie(R))}function V(R){Ye(R),A.length===0&&(i.domElement.releasePointerCapture(R.pointerId),i.domElement.removeEventListener("pointermove",y),i.domElement.removeEventListener("pointerup",V)),i.dispatchEvent(Wc),s=r.NONE}function le(R){let he;switch(R.button){case 0:he=i.mouseButtons.LEFT;break;case 1:he=i.mouseButtons.MIDDLE;break;case 2:he=i.mouseButtons.RIGHT;break;default:he=-1}switch(he){case Ri.DOLLY:if(i.enableZoom===!1)return;de(R),s=r.DOLLY;break;case Ri.ROTATE:if(R.ctrlKey||R.metaKey||R.shiftKey){if(i.enablePan===!1)return;k(R),s=r.PAN}else{if(i.enableRotate===!1)return;ce(R),s=r.ROTATE}break;case Ri.PAN:if(R.ctrlKey||R.metaKey||R.shiftKey){if(i.enableRotate===!1)return;ce(R),s=r.ROTATE}else{if(i.enablePan===!1)return;k(R),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(Mo)}function ie(R){switch(s){case r.ROTATE:if(i.enableRotate===!1)return;te(R);break;case r.DOLLY:if(i.enableZoom===!1)return;se(R);break;case r.PAN:if(i.enablePan===!1)return;De(R);break}}function ue(R){i.enabled===!1||i.enableZoom===!1||s!==r.NONE||(R.preventDefault(),i.dispatchEvent(Mo),Pe(Le(R)),i.dispatchEvent(Wc))}function Le(R){const he=R.deltaMode,Ie={clientX:R.clientX,clientY:R.clientY,deltaY:R.deltaY};switch(he){case 1:Ie.deltaY*=16;break;case 2:Ie.deltaY*=100;break}return R.ctrlKey&&!M&&(Ie.deltaY*=10),Ie}function ye(R){R.key==="Control"&&(M=!0,document.addEventListener("keyup",we,{passive:!0,capture:!0}))}function we(R){R.key==="Control"&&(M=!1,document.removeEventListener("keyup",we,{passive:!0,capture:!0}))}function He(R){i.enabled===!1||i.enablePan===!1||et(R)}function nt(R){switch(Ue(R),A.length){case 1:switch(i.touches.ONE){case Ci.ROTATE:if(i.enableRotate===!1)return;We(R),s=r.TOUCH_ROTATE;break;case Ci.PAN:if(i.enablePan===!1)return;Ve(R),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(i.touches.TWO){case Ci.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;j(R),s=r.TOUCH_DOLLY_PAN;break;case Ci.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Lt(R),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(Mo)}function oe(R){switch(Ue(R),s){case r.TOUCH_ROTATE:if(i.enableRotate===!1)return;Be(R),i.update();break;case r.TOUCH_PAN:if(i.enablePan===!1)return;$e(R),i.update();break;case r.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;gt(R),i.update();break;case r.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Je(R),i.update();break;default:s=r.NONE}}function pt(R){i.enabled!==!1&&R.preventDefault()}function ot(R){A.push(R.pointerId)}function Ye(R){delete K[R.pointerId];for(let he=0;he<A.length;he++)if(A[he]==R.pointerId){A.splice(he,1);return}}function Ue(R){let he=K[R.pointerId];he===void 0&&(he=new je,K[R.pointerId]=he),he.set(R.pageX,R.pageY)}function Me(R){const he=R.pointerId===A[0]?A[1]:A[0];return K[he]}i.domElement.addEventListener("contextmenu",pt),i.domElement.addEventListener("pointerdown",b),i.domElement.addEventListener("pointercancel",V),i.domElement.addEventListener("wheel",ue,{passive:!1}),document.addEventListener("keydown",ye,{passive:!0,capture:!0}),this.update()}}const eu="mempalace-viz-graph-rel-filters-v1",$c={tunnel:{label:"Tunnel",shortLabel:"Tunnel",description:"Same room name appearing in multiple wings — a cross-wing structural link from MemPalace tunnel discovery (`mempalace_find_tunnels`)."},unknown:{label:"Other",shortLabel:"Other",description:"Edges whose relationship type is not listed in the viewer registry."}};function Fo(n){const e=n&&$c[n]?n:"unknown";return{type:e,...$c[e]}}function Ei(n){if(!n||typeof n!="object")return"tunnel";const e=n.relationshipType;return typeof e=="string"&&e.trim()?e.trim():"tunnel"}function hr(n){const e=new Set;for(const t of n||[])e.add(Ei(t));return[...e].sort()}function Xc(n){const e=n||"tunnel";return e==="tunnel"?{color:5999871,opacity:.44}:e==="unknown"?{color:9741240,opacity:.32}:{color:10980346,opacity:.3}}function s_(n,e){const t=new Set(e||[]);if(t.size===0)return new Set;if(n==null)return new Set(t);if(Array.isArray(n)&&n.length===0)return new Set;const i=new Set;for(const r of n)typeof r=="string"&&t.has(r)&&i.add(r);return i}function zr(n,e){const t=[...e||[]].sort();return t.length===0?null:!n||n.size===0?new Set:n.size===t.length&&t.every(r=>n.has(r))?null:n}function Bs(n,e){if(!e||e.size===0)return[];const t=[];for(const i of n||[])e.has(Ei(i))&&t.push(i);return t}function o_(n){const e={};for(const t of n||[]){const i=Ei(t);e[i]=(e[i]||0)+1}return e}function a_(n,e){const t=Bs(n,e);return{visibleEdgeCount:t.length,visibleByType:o_(t),visibleEdges:t}}function c_(n){if(!n||typeof n!="object")return null;const e=n.enabledTypes;return Array.isArray(e)?e.filter(t=>typeof t=="string"):null}function l_(n,e){const t=[],i=n==null?void 0:n.sources;Array.isArray(i)&&i.length&&t.push(`Sources: ${i.join(", ")}`);const r=n==null?void 0:n.truncatedSources;Array.isArray(r)&&r.some(o=>o==null?void 0:o.truncated)&&t.push("Some sources may be truncated upstream — tunnel list can be incomplete.");const s=((n==null?void 0:n.completenessNotes)||[]).filter(Boolean);s.length&&t.push(s[0]);const a=e!=null&&e.byType&&typeof e.byType=="object"?e.byType:null;if(a&&Object.keys(a).length){const o=Object.entries(a).map(([c,l])=>`${c}: ${l}`).join(" · ");t.push(`Types in payload: ${o}`)}return t.filter(Boolean).join(" ")}function sr(n,e=6){if(!n||typeof n!="object")return"";const t=Object.entries(n).filter(([,r])=>r>0).sort((r,s)=>s[1]-r[1]);return t.length?t.slice(0,e).map(([r,s])=>{const a=Fo(r);return`${s} ${a.shortLabel.toLowerCase()}`}).join(" · "):""}function u_(n,e){const t=Object.values(n||{}).reduce((a,o)=>a+o,0),i=Object.values(e||{}).reduce((a,o)=>a+o,0);if(i===0)return null;const r=(n==null?void 0:n.tunnel)||0,s=(e==null?void 0:e.tunnel)||0;return t===0&&i>0?"No visible links with current filters; totals above are global.":r>0&&s>0&&r>=t*.85?"Visible links here are tunnel connections (MCP-backed).":null}function h_(n,e,t){const i=Math.max(1,n),r=Math.max(0,e),s=Math.max(1,t),a=r/i;let o=0;i>90||a>2.8?o=3:i>48||a>1.75?o=2:(i>24||a>1.05)&&(o=1);const c=o>=3?85:o>=2?130:o>=1?175:235,l=.00155+o*42e-5,h=o>=2?.68:o>=1?.82:1,f=o>=3?.74:o>=2?.86:1,d=o>=2?1.08:1,m=1+o*.22,_=1-o*.04,g=1+o*.12,p=.004+o*.0025,u=4+o*5,v=2.1+o*.55,x=48+o*14;return{tier:o,nodeCount:i,edgeCount:r,wingCount:s,edgeDensity:a,labelBudget:c,fogDensity:l,adjacencyOpacityMult:h,globalEdgeOpacityMult:f,tunnelEmphasisMult:d,repelScale:m,attractScale:_,centerScale:g,wingCohesion:p,depthJitter:u,collisionMinDist:v,forceIterations:x}}function d_(n){return{repelStrength:88*n.repelScale,attractStrength:.0115*n.attractScale,centerStrength:.0052*n.centerScale,wingCohesion:n.wingCohesion,iterations:n.forceIterations}}function br(n){let e=2166136261;const t=String(n||"");for(let i=0;i<t.length;i+=1)e^=t.charCodeAt(i),e=Math.imul(e,16777619);return(e>>>0)/4294967296}function f_(n,e,t){const i=Math.max(1,e.length),r=26+Math.min(48,n.length*.35),s=7+t.tier*2.2,a=9+t.tier*1.8,o=new Map;e.forEach((l,h)=>{const f=h/i*Math.PI*2,d=r*(1+h%5*.04),m=Math.cos(f)*d,_=Math.sin(f)*d,g=((h+.5)/i-.5)*s*2.2;o.set(l,{x:m,y:g,z:_})});const c=new Map;n.forEach(l=>{if(l.type==="room"&&l.wing){const h=c.get(l.wing)||[];h.push(l),c.set(l.wing,h)}}),e.forEach(l=>{const h=c.get(l)||[],f=o.get(l)||{x:0,y:0,z:0},d=Math.max(h.length,1);h.forEach((m,_)=>{const g=_/d*Math.PI*2,p=br(`${l}|${m.name}|${_}`),u=br(`${m.name}|z`),v=a*(.45+.55*p),x=(u-.5)*t.depthJitter;m.x=f.x+Math.cos(g)*v,m.y=f.y+Math.sin(g*1.7)*v*.42+x,m.z=f.z+Math.sin(g)*v})}),n.forEach(l=>{if(l.type==="wing"){const h=o.get(l.name)||{x:0,y:0,z:0},f=br(`wing|${l.name}`);l.x=h.x*.22+(f-.5)*3,l.y=h.y+(f-.5)*4,l.z=h.z*.22+(br(`${l.name}z`)-.5)*3}})}function p_(n,e,t,i){const r=d_(t),{repelStrength:s,attractStrength:a,centerStrength:o,wingCohesion:c,iterations:l}=r,h=new Map;n.forEach(f=>{f.type==="wing"&&f.name&&h.set(f.name,f)});for(let f=0;f<l;f+=1){for(let d=0;d<n.length;d+=1)for(let m=d+1;m<n.length;m+=1){const _=n[d].x-n[m].x,g=n[d].y-n[m].y,p=n[d].z-n[m].z,u=Math.sqrt(_*_+g*g+p*p)+.12;let v=s/(u*u);const x=n[d].wing,E=n[m].wing;x&&E&&x!==E&&(v*=1.12),n[d].x+=_*v,n[d].y+=g*v,n[d].z+=p*v,n[m].x-=_*v,n[m].y-=g*v,n[m].z-=p*v}e.forEach(d=>{const m=i(n,d,"from"),_=i(n,d,"to");if(m&&_){let g=_.x-m.x,p=_.y-m.y,u=_.z-m.z,v=a;m.wing&&_.wing&&m.wing!==_.wing&&(v*=1.15),m.x+=g*v,m.y+=p*v,m.z+=u*v,_.x-=g*v,_.y-=p*v,_.z-=u*v}}),n.forEach(d=>{if(d.type==="room"&&d.wing){const m=h.get(d.wing);m&&(d.x+=(m.x-d.x)*c,d.y+=(m.y-d.y)*c,d.z+=(m.z-d.z)*c)}d.x*=1-o,d.y*=1-o,d.z*=1-o})}}function m_(n,e,t=10){for(let i=0;i<t;i+=1)for(let r=0;r<n.length;r+=1)for(let s=r+1;s<n.length;s+=1){const a=n[r],o=n[s];let c=a.x-o.x,l=a.y-o.y,h=a.z-o.z;const f=Math.sqrt(c*c+l*l+h*h)+1e-8;if(f<e){const d=(e-f)*.52,m=c/f,_=l/f,g=h/f;a.x+=m*d,a.y+=_*d,a.z+=g*d,o.x-=m*d,o.y-=_*d,o.z-=g*d}}}function g_(n,e){const t=Math.max(12,e),i=t*.85,r=t*4.2,s=(n-i)/(r-i);return Math.max(0,Math.min(1,s))}function __(n,e,t){const i=Math.max(8,Math.floor(n)),r=Math.max(0,Math.min(3,t)),s=Math.max(0,Math.min(1,e)),a=.38+r*.06,c=a+(1-a)*s;return Math.max(8,Math.floor(i*c))}function v_(n,e={}){let i=.74+Math.max(0,Math.min(1,n))*.38;return e.pinned?i*=1.12:e.selected?i*=1.08:e.hovered&&(i*=1.05),i}function x_(n,e={}){const t=Math.max(0,Math.min(1,n));let i=.52+t*.46;return e.selected&&(i=Math.max(i,.94)),e.hovered&&(i=Math.max(i,.9)),e.neighbor&&(i=Math.max(i,.62+t*.28)),Math.max(.35,Math.min(1,i))}function tu(n){if(!n||!n.startsWith("room:"))return null;const e=n.slice(5),t=e.indexOf(":");return t===-1?null:e.slice(0,t)}function y_(n){return n?n.startsWith("room:")?tu(n):n.startsWith("wing:")?n.slice(5):null:null}function M_(n,e,t){const i=new Map;function r(s,a){!s||!a||s===a||(i.has(s)||i.set(s,new Set),i.has(a)||i.set(a,new Set),i.get(s).add(a),i.get(a).add(s))}for(const s of n||[]){const a=t(e,s,"from"),o=t(e,s,"to"),c=or(a),l=or(o);c!=null&&c.startsWith("room:")&&(l!=null&&l.startsWith("room:"))&&r(c,l)}return i}function Ki(n,e){const t=new Set;if(!n)return t;const i=e.get(n);return i&&i.forEach(r=>t.add(r)),t}function Oo(n,e){return{primaryId:n||e||null,secondaryHoverId:n&&e&&e!==n?e:null}}function S_(n,e){const t=n.filter(l=>l.id.startsWith("room:")),i=e.nodeCount>300?e.labelBudget*5:e.nodeCount>160?e.labelBudget*4:t.length,r=Math.max(24,Math.min(t.length,i)),s=t.filter(l=>(l.incidentFull||0)>0),a=t.filter(l=>(l.incidentFull||0)===0),o=(l,h)=>h.baseScore-l.baseScore;s.sort(o),a.sort(o);const c=[];for(const l of s){if(c.length>=r)break;c.push(l.id)}for(const l of a){if(c.length>=r)break;c.push(l.id)}return new Set(c)}function E_(n,e){const{selectedId:t,hoveredId:i,pinActive:r,budget:s,neighborIds:a=null,focusWingId:o=null,cameraDistanceNorm:c=.55,densityTier:l=0}=e,h=__(s,c,l),f=Math.max(8,Math.floor(h)),d=Math.max(0,Math.min(3,l)),m=3500+d*220,_=1200+d*80,g=n.map(({id:p,baseScore:u})=>{let v=u;return p===t&&(v+=1e6),r&&p===t&&(v+=2e5),p===i&&(v+=5e5),a&&a.has(p)&&(v+=m),o&&tu(p)===o&&(v+=_),{id:p,score:v}});return g.sort((p,u)=>u.score-p.score),new Set(g.slice(0,f).map(p=>p.id))}function b_(n){const e=Math.min(220,(n.incidentFull||0)*24),t=Math.min(100,(n.drawers||0)*1.8),i=n.type==="wing"?45:0;return 20+e+t+i}function w_(n){const{selectedId:e,hoveredId:t,fromId:i,toId:r,relationshipType:s,densityTier:a}=n,{primaryId:o,secondaryHoverId:c}=Oo(e,t),l=o&&(i===o||r===o),h=c&&(i===c||r===c),f=s==="tunnel",d=Math.max(0,Math.min(3,a));return o?l?f?1.24:1.06:h?(f?.88:.78)*(d>=2?.92:1):d>=3?.36:d>=2?.4:d>=1?.52:.68:d>=3?f?.92:.78:1}function T_(n,e,t={}){const{isNeighbor:i=!1,focusActive:r=!1}=t;if(!r)return 1;const s=Math.max(0,Math.min(3,e)),a=38+s*18,o=155+s*35;let c=1.05-(n-a)/o;return i&&(c=.55+c*.45),c=Math.max(s===0?.58:.34,Math.min(1.08,c)),c}function A_(n,e,t=0){const i=Math.max(8,n),r=Math.max(0,Math.min(3,e)),s=br(`frame|${t}`),a=i*(.028+r*.006),o=i*(.045+r*.008)*(s-.5)*2;return{x:o,y:a,z:-o*.4}}function jc(n,e,t,i={}){const r=e*Math.PI/180,s=Math.max(0,i.neighborCount||0),a=1.28+t*.06+Math.min(.14,s*.018),c=Math.max(4,n)*a/Math.tan(r/2),l=16+t*4;return Math.min(240,Math.max(l,c))}function R_(n,e){let t=0;for(const i of e){const r=i.x-n.x,s=i.y-n.y,a=i.z-n.z;t=Math.max(t,Math.sqrt(r*r+s*s+a*a))}return t}function or(n){return n?n.type==="wing"&&n.name?`wing:${n.name}`:n.type==="room"&&n.wing&&n.name?`room:${n.wing}:${n.name}`:null:null}function C_(n,e,t){const i=new Map;for(const r of e||[]){const s=t(n,r,"from"),a=t(n,r,"to"),o=or(s),c=or(a);o!=null&&o.startsWith("room:")&&i.set(o,(i.get(o)||0)+1),c!=null&&c.startsWith("room:")&&i.set(c,(i.get(c)||0)+1)}return i}function Sr(n,e={}){const t=!!e.graphFilterNarrowed;switch(n){case"missing_endpoint":return"Choose a start room and a target room.";case"no_edges":return t?"No edges match the current relationship filters — enable more types or reset filters. The graph shows only explicit MemPalace structure.":"No graph edges in the current data. Refresh after MemPalace changes; this viewer does not add links.";case"no_path":return"No explicit MCP path exists between these rooms on the edges currently shown.";case"id_map_failed":return"Could not map route to scene nodes.";case"bad_scene":return"Could not resolve route endpoints.";default:return"Route unavailable."}}function L_(n,e={}){const t=!!e.graphFilterNarrowed;if(n==="no_path"){const i=["This graph only shows explicit MemPalace tunnel structure from MCP — it does not invent missing links."];return t&&i.push("Some edges may be hidden by your relationship filters — try widening them to reveal a path."),i.push("To create a tunnel in MemPalace, use the same room name in multiple wings, then refresh data here."),i}if(n==="no_edges"){const i=["Routing needs at least one visible graph edge between rooms."];return t?i.push("Widen relationship filters so tunnel edges can appear, or reload after MemPalace updates."):i.push("Reload after MemPalace updates if you expect tunnels; stock MCP does not support arbitrary graph link writes."),i}return[]}function P_(){return"No adjacent rooms on the visible edges — the graph may be disconnected here, or filters may hide links."}function I_(){return["Graph edges come from MemPalace MCP data (tunnel discovery), not from this viewer.","A tunnel appears when the same room name exists in more than one wing.","This visualization does not invent missing links.","Stock MemPalace MCP does not support arbitrary room-to-room graph links or persisting custom cross-links."]}function D_(){return["Want a new tunnel? Create or reuse the same room name in two wings using normal MemPalace workflows.","Drawers can be added via MCP tools such as mempalace_add_drawer — that adds palace content, not arbitrary graph edges.","After MemPalace data changes, use Refresh here to update the graph."]}function U_(n={}){return!!n.viewIsGraph&&!!n.palaceDataOk}function N_(n={}){return!!n.viewIsGraph&&!!n.hasResolvableGraph}function F_(){return{title:"Graph view",body:"No tunnel edges were returned from graph-stats. Wings and rooms can still appear from taxonomy. Edges come only from MemPalace tunnel discovery (mempalace_find_tunnels)."}}function O_(){return"No tunnel neighbors for this room in the current MCP graph — that is expected when there is no shared room name across wings. This viewer does not add links."}function B_(){return"Uses only explicit edges from MemPalace MCP data (what is visible in the scene)."}function z_(){return"Explicit MemPalace edges only — this viewer does not add or infer links."}function k_(n){const t=Number(n.resolvedCount)===1?"":"s",i=`${n.resolvedFormatted} resolved graph edge${t} from MCP`;return n.graphFilterNarrowed&&n.visibleFormatted!=null&&n.visibleCount!=null?`Visible: ${n.visibleFormatted} (filtered) · base ${i}`:i}function G_(){return"Knowledge graph statistics are unavailable from the current API."}function H_(){return"No explicit edges for this room in the current MCP data — unresolved endpoints or no tunnels yet is a valid state."}function W_(n,e){const t=e??0;return{title:"Graph view",body:`Loaded ${n} graph edge${n===1?"":"s"}, but some endpoints could not be matched to taxonomy rooms${t?` (${t} edge${t===1?"":"s"} unresolved)`:""}. Layout may be sparse — this is a data alignment limitation, not a viewer bug.`}}function Zt(n,e,t=null){var o,c;if(n==null||typeof n!="string")return null;const i=n.trim();if(!i)return null;const r=yn(i);if(r){const{wingId:l,roomName:h}=r;if((o=e[l])!=null&&o.some(f=>f.name===h))return{wing:l,room:h,key:It(l,h)}}if(i.includes("/")){const l=i.indexOf("/"),h=i.slice(0,l),f=i.slice(l+1);return(c=e[h])!=null&&c.some(d=>d.name===f)?{wing:h,room:f,key:It(h,f)}:null}const s=[];for(const[l,h]of Object.entries(e||{}))if(Array.isArray(h))for(const f of h)f.name===i&&s.push({wing:l,room:i,key:`${l}/${i}`});if(s.length===0)return null;if(s.length===1){const l=s[0];return{...l,key:It(l.wing,l.room)}}if(t&&s.some(l=>l.wing===t)){const l=s.find(h=>h.wing===t)||s[0];return{...l,key:It(l.wing,l.room)}}const a=s[0];return{...a,key:It(a.wing,a.room)}}function V_(n,e,t=null){if(t!=null&&typeof t=="number")return t;const i=Array.isArray(n)?n:[],r=e&&typeof e=="object"?e:{};let s=0;for(const a of i){const o=Zt(a.from,r,null),c=Zt(a.to,r,a.wing||null);(!o||!c)&&(s+=1)}return s}function $_(n,e,t,i){var O;const r=n&&typeof n=="object"?n:{},s=Array.isArray(e)?e:[],a=new Set,o=new Map,c=new Map,l=new Map,h=new Map;function f(D,$){h.has(D)||h.set(D,new Set),h.get(D).add($)}function d(D,$,L=1){D.set($,(D.get($)||0)+L)}let m=0,_=0;for(const D of s){const $=D.sourceRoomId,L=D.targetRoomId;if(!$||!L||$===L)continue;const z=$<L?`${$}||${L}`:`${L}||${$}`;if(a.has(z))continue;a.add(z),d(o,$),d(o,L),D.sourceWingId!==D.targetWingId?(m+=1,d(c,$),d(c,L)):(_+=1,d(l,$),d(l,L)),f($,L),f(L,$)}const g=new Set([...o.keys()]),p=new Set;for(const[D,$]of Object.entries(r))if(Array.isArray($))for(const L of $)p.add(L.roomId||It(D,L.name));const u=[];for(const D of p)g.has(D)||u.push(D);let v=m+_;t&&typeof t.resolvedEdgeCount=="number"&&(v=t.resolvedEdgeCount);const x=v>0?m/v:null;let P=[...o.entries()].sort((D,$)=>$[1]-D[1]).slice(0,8).map(([D,$])=>{const L=yn(D);return{wing:(L==null?void 0:L.wingId)??D.split("/")[0],room:(L==null?void 0:L.roomName)??D.slice(D.indexOf("/")+1),key:D,degree:$}});(O=i==null?void 0:i.topConnectedRooms)!=null&&O.length&&(P=i.topConnectedRooms.slice(0,8).map(D=>({wing:D.wingId,room:D.name,key:D.roomId,degree:D.degree})));const T=new Map;for(const D of s)D.sourceWingId!==D.targetWingId&&(d(T,D.sourceWingId),d(T,D.targetWingId));const A=[...T.entries()].sort((D,$)=>$[1]-D[1]).slice(0,8).map(([D,$])=>({wing:D,crossEdges:$})),K=nu(o),M=t&&typeof t.crossWingEdgeCount=="number"?t.crossWingEdgeCount:null,w=t&&typeof t.intraWingEdgeCount=="number"?t.intraWingEdgeCount:null;return{edgeCount:s.length,resolvedEdgeCount:v,crossWingEdgeCount:M??m,intraWingEdgeCount:w??_,byRelationshipType:t!=null&&t.byType&&typeof t.byType=="object"?{...t.byType}:null,crossFraction:x,degreeByKey:o,crossByKey:c,intraByKey:l,neighborsByKey:h,topConnectedRooms:P,topCrossLinkedWings:A,roomsWithNoTunnels:typeof(i==null?void 0:i.roomsWithNoLinks)=="number"?i.roomsWithNoLinks:u.length,noTunnelRoomKeys:u.slice(0,50),medianRoomDegree:K,hasResolvableEdges:v>0}}function X_(n,e,t,i){var w;const r=Array.isArray(n)?n:[],s=e&&typeof e=="object"?e:{},a=new Set,o=new Map,c=new Map,l=new Map,h=new Map;function f(O,D){h.has(O)||h.set(O,new Set),h.get(O).add(D)}function d(O,D,$=1){O.set(D,(O.get(D)||0)+$)}for(const O of r){const D=Zt(O.from,s,null),$=Zt(O.to,s,O.wing||null);if(!D||!$)continue;const L=D.key,z=$.key;if(L===z)continue;const q=L<z?`${L}||${z}`:`${z}||${L}`;if(a.has(q))continue;a.add(q),d(o,L),d(o,z),D.wing!==$.wing?(d(c,L),d(c,z)):(d(l,L),d(l,z)),f(L,z),f(z,L)}const m=new Set;for(const[O,D]of Object.entries(s))if(Array.isArray(D))for(const $ of D)m.add(It(O,$.name));const _=[];for(const O of m)o.has(O)||_.push(O);let g=0,p=0;for(const O of r){const D=Zt(O.from,s,null),$=Zt(O.to,s,O.wing||null);!D||!$||(D.wing!==$.wing?g+=1:p+=1)}const u=g+p,v=u>0?g/u:null;let E=[...o.entries()].sort((O,D)=>D[1]-O[1]).slice(0,8).map(([O,D])=>{const $=yn(O);return{wing:($==null?void 0:$.wingId)??O.split("/")[0],room:($==null?void 0:$.roomName)??O.slice(O.indexOf("/")+1),key:O,degree:D}});(w=i==null?void 0:i.topConnectedRooms)!=null&&w.length&&(E=i.topConnectedRooms.slice(0,8).map(O=>({wing:O.wingId,room:O.name,key:O.roomId,degree:O.degree})));const P=new Map;for(const O of r){const D=Zt(O.from,s,null),$=Zt(O.to,s,O.wing||null);!D||!$||D.wing===$.wing||(d(P,D.wing),d(P,$.wing))}const T=[...P.entries()].sort((O,D)=>D[1]-O[1]).slice(0,8).map(([O,D])=>({wing:O,crossEdges:D})),A=nu(o),K=t&&typeof t.crossWingEdgeCount=="number"?t.crossWingEdgeCount:null,M=t&&typeof t.intraWingEdgeCount=="number"?t.intraWingEdgeCount:null;return{edgeCount:r.length,resolvedEdgeCount:u,crossWingEdgeCount:K??g,intraWingEdgeCount:M??p,crossFraction:v,degreeByKey:o,crossByKey:c,intraByKey:l,neighborsByKey:h,topConnectedRooms:E,topCrossLinkedWings:T,roomsWithNoTunnels:typeof(i==null?void 0:i.roomsWithNoLinks)=="number"?i.roomsWithNoLinks:_.length,noTunnelRoomKeys:_.slice(0,50),medianRoomDegree:A,hasResolvableEdges:u>0}}function qc(n,e={}){const{edgesResolved:t,graphEdges:i,graphSummary:r=null,overviewStats:s=null}=e;return t!=null&&t.length?$_(n,t,r,s):X_(i||[],n,r,s)}function nu(n){const e=[...n.values()].sort((i,r)=>i-r);if(!e.length)return null;const t=Math.floor(e.length/2);return e.length%2?e[t]:(e[t-1]+e[t])/2}function j_(n,e){var h;if(!e||!n)return null;const t=e.degreeByKey.get(n)??0,i=e.crossByKey.get(n)??0,r=e.intraByKey.get(n)??0,s=e.neighborsByKey.get(n),a=s?[...s]:[],o=a.slice(0,12).map(f=>{const d=yn(f),m=e.degreeByKey.get(f)??0;return{wing:(d==null?void 0:d.wingId)??f.split("/")[0],room:(d==null?void 0:d.roomName)??f.slice(f.indexOf("/")+1),key:f,degree:m}});o.sort((f,d)=>d.degree-f.degree);const c=new Map;for(const f of a){const d=(h=yn(f))==null?void 0:h.wingId;d&&c.set(d,(c.get(d)||0)+1)}const l=[...c.entries()].sort((f,d)=>d[1]-f[1]).slice(0,8).map(([f,d])=>({wing:f,links:d}));return{degree:t,crossWingLinks:i,intraWingLinks:r,medianDegree:e.medianRoomDegree,relatedRooms:o.slice(0,8),relatedWings:l,isBridge:i>=1&&a.length>0}}function Yc(n,e){if(!n||!Array.isArray(e))return{degree:0,crossWingLinks:0,intraWingLinks:0,byType:{},relatedRoomKeys:[]};let t=0,i=0,r=0;const s={},a=[];for(const o of e){const c=o.sourceRoomId,l=o.targetRoomId;if(!c||!l||c!==n&&l!==n)continue;t+=1;const h=o.relationshipType||"tunnel";s[h]=(s[h]||0)+1,o.sourceWingId!=null&&o.targetWingId!=null&&o.sourceWingId!==o.targetWingId?i+=1:r+=1,a.push(c===n?l:c)}return{degree:t,crossWingLinks:i,intraWingLinks:r,byType:s,relatedRoomKeys:[...new Set(a)]}}function Kc(n,e){const t={};let i=0;for(const r of e||[]){if(!r.sourceWingId||!r.targetWingId||!(r.sourceWingId===n||r.targetWingId===n))continue;const a=r.relationshipType||"tunnel";t[a]=(t[a]||0)+1,r.sourceWingId!==r.targetWingId&&(i+=1)}return{byType:t,crossWingTouches:i}}function q_(n,e,t,i=null){if(i!=null&&i.length)return Y_(n,i);const r=Array.isArray(e)?e:[],s=new Map;let a=0;for(const h of r){const f=Zt(h.from,t,n),d=Zt(h.to,t,h.wing||null);if(!f||!d||f.wing===d.wing||f.wing!==n&&d.wing!==n)continue;a+=1;const m=f.wing===n?d:f;s.set(m.wing,(s.get(m.wing)||0)+1)}const o=[...s.entries()].sort((h,f)=>f[1]-h[1]).slice(0,6).map(([h,f])=>({wing:h,edges:f})),c=new Map;for(const h of r){const f=Zt(h.from,t,n),d=Zt(h.to,t,h.wing||null);!f||!d||(f.wing===n&&d.wing!==n&&c.set(f.key,(c.get(f.key)||0)+1),d.wing===n&&f.wing!==n&&c.set(d.key,(c.get(d.key)||0)+1))}const l=[...c.entries()].sort((h,f)=>f[1]-h[1]).slice(0,5).map(([h,f])=>{const d=yn(h);return{wing:(d==null?void 0:d.wingId)??h.split("/")[0],room:(d==null?void 0:d.roomName)??h.slice(h.indexOf("/")+1),key:h,crossEdges:f}});return{crossWingTouches:a,topExternalWings:o,topRoomsByCrossWing:l}}function Y_(n,e){const t=new Map;let i=0;for(const o of e){if(o.sourceWingId===o.targetWingId||o.sourceWingId!==n&&o.targetWingId!==n)continue;i+=1;const c=o.sourceWingId===n?o.targetWingId:o.sourceWingId;t.set(c,(t.get(c)||0)+1)}const r=[...t.entries()].sort((o,c)=>c[1]-o[1]).slice(0,6).map(([o,c])=>({wing:o,edges:c})),s=new Map;for(const o of e)o.sourceWingId!==o.targetWingId&&(o.sourceWingId===n&&o.targetWingId!==n&&s.set(o.sourceRoomId,(s.get(o.sourceRoomId)||0)+1),o.targetWingId===n&&o.sourceWingId!==n&&s.set(o.targetRoomId,(s.get(o.targetRoomId)||0)+1));const a=[...s.entries()].sort((o,c)=>c[1]-o[1]).slice(0,5).map(([o,c])=>{const l=yn(o);return{wing:(l==null?void 0:l.wingId)??o.split("/")[0],room:(l==null?void 0:l.roomName)??o.slice(o.indexOf("/")+1),key:o,crossEdges:c}});return{crossWingTouches:i,topExternalWings:r,topRoomsByCrossWing:a}}function ta(n){let e=0;for(const t of Object.values(n||{}))Array.isArray(t)&&(e+=t.length);return e}function iu(n,e){const t=n==null?void 0:n[e];return Array.isArray(t)?t.reduce((i,r)=>i+(Number(r.drawers)||0),0):0}function K_(n){let e=0;for(const t of Object.values(n||{}))typeof t=="number"&&(e+=t);return e}function na(n){const e=Object.entries(n||{}).filter(([,t])=>typeof t=="number");return e.sort((t,i)=>i[1]-t[1]),e.map(([t,i],r)=>({wing:t,rank:r+1,drawers:i}))}function Z_(n){const e=Object.entries(n||{}).map(([t,i])=>({wing:t,roomCount:Array.isArray(i)?i.length:0}));return e.sort((t,i)=>i.roomCount-t.roomCount),e.map((t,i)=>({...t,rank:i+1}))}function ia(n,e){const t=n==null?void 0:n[e];return Array.isArray(t)?[...t].sort((r,s)=>(s.drawers||0)-(r.drawers||0)).map((r,s)=>({...r,rank:s+1})):[]}function qn(n){const e=n%10,t=n%100;return t>=11&&t<=13?`${n}th`:e===1?`${n}st`:e===2?`${n}nd`:e===3?`${n}rd`:`${n}th`}function Cs(n,e,t=1){return e==null||e<=0||n==null?null:(100*(Number(n)/e)).toFixed(t)}function J_({drawers:n=0,wingRoomSum:e,palaceTotal:t},i,r){const s=(i==null?void 0:i.degree)??0,a=(i==null?void 0:i.crossWingLinks)??0,o=(i==null?void 0:i.intraWingLinks)??0,c=(i==null?void 0:i.medianDegree)??null,l=e>0&&n>=e*.2,h=e>0&&n<=e*.05&&n>0,f=c!=null&&s>=c*2&&s>=2,d=s===0;return r?d?{label:"Isolated room",detail:"This room does not appear on any resolved tunnel edge (or naming does not match graph endpoints)."}:a>=2&&f?{label:"Dense cross-wing connector",detail:"High tunnel degree with multiple cross-wing links."}:a>=1&&f?{label:"Highly connected hub",detail:"Above-average tunnel degree with cross-wing reach."}:a>=1&&o<=1?{label:"Cross-wing bridge",detail:"Most links span outside this wing."}:l&&s<=(c||1)?{label:"Large but weakly connected",detail:"Many drawers relative to the wing, few tunnel links."}:h&&f?{label:"Small but structurally important",detail:"Fewer drawers than peers, but high connectivity."}:f?{label:"Highly connected hub",detail:c!=null?`Degree ${s} vs median ${c}.`:`Degree ${s}.`}:t>0&&n/t>=.08&&s<2?{label:"Major archive, few tunnels",detail:"Large share of palace drawers with sparse tunnels."}:{label:"Balanced footprint",detail:"Typical size and connectivity for this palace."}:{label:"Tunnel graph unavailable",detail:"No resolvable tunnel edges for the loaded taxonomy, or graph-stats returned empty."}}function Q_(n,e){const{totalDrawers:t,wingCount:i,roomCount:r,tunnelNodeCount:s,graphEdgeCount:a,kgAvailable:o,kgSummary:c,ga:l,wingsData:h}=n,f=na(h).slice(0,5),d={wings:"Wing spheres are sized by drawer count. Click a wing to open its rooms.",rooms:n.focusWing?`Focused on “${n.focusWing}”: rooms orbit the wing. Click another wing in “all rooms” layout or use search.`:"Each cluster is a wing; rooms orbit their wing. Click a room to inspect and center.",graph:"Force-directed graph. Edges are explicit MCP tunnel links from MemPalace tunnel discovery only."};let m="";return!l.hasResolvableEdges&&a===0?m="No explicit MCP tunnel edges loaded.":l.hasResolvableEdges?l.crossFraction!=null&&(m=l.crossFraction>=.5?"Cross-wing tunnel links account for a large share of explicit resolved edges.":"Explicit resolved edges mix cross-wing tunnels with same-wing structure (see relationship toggles)."):m="Graph metadata is present but endpoints could not be matched to taxonomy rooms (check naming).",{totalDrawers:t,wingCount:i,roomCount:r,tunnelNodeCount:s,graphEdgeCount:a,crossWingEdges:l.crossWingEdgeCount,kgAvailable:o,kgSummary:c,largestWingsByDrawers:f,mostConnectedRooms:l.topConnectedRooms.slice(0,5),mostCrossLinkedWings:l.topCrossLinkedWings.slice(0,5),roomsWithNoTunnels:l.roomsWithNoTunnels,viewHint:d[e]||d.wings,graphBlurb:m,ga:l}}function Dr(n,e,t=8){if(!e||e.view!=="graph")return n;for(n.push(e);n.length>t;)n.shift();return n}function e0(n){return n.length?n.pop():null}function t0(n,e,t){const i=n;if(!i.length)return null;const r=i.indexOf(e),s=i.length;return r===-1?t>=0?i[0]:i[s-1]:i[(r+t+s*16)%s]}function ar(n){if(!n||!n.startsWith("room:"))return null;const e=n.slice(5),t=e.indexOf(":");return t<=0?null:{wing:e.slice(0,t),room:e.slice(t+1)}}function Zc(n,e,t){return!!(t&&n&&e&&n!==e)}const ru=["shortest","tunnel_preferred","balanced","adjacency_light"],ra="shortest",Ur={shortest:{label:"Shortest",shortLabel:"Shortest",hint:"Fewest hops on visible edges (BFS)."},tunnel_preferred:{label:"Tunnel-preferred",shortLabel:"Tunnels",hint:"Prefer explicit tunnel edges; may add hops vs shortest."},balanced:{label:"Balanced",shortLabel:"Balanced",hint:"Trade hop count vs edge-type cost (tunnel cheaper than adjacency)."},adjacency_light:{label:"Adjacency-light",shortLabel:"Adj-light",hint:"Strongly avoid taxonomy_adjacency hops when alternatives exist."}};function bi(n){const e=String(n||"").trim();return ru.includes(e)?e:ra}function n0(n,e){const t=n||"tunnel",i=bi(e);return i==="shortest"?1:i==="tunnel_preferred"?t==="tunnel"?2:t==="taxonomy_adjacency"?10:4:i==="balanced"?t==="tunnel"?3:t==="taxonomy_adjacency"?7:4:i==="adjacency_light"?t==="tunnel"?2:t==="taxonomy_adjacency"?14:3:4}function su(n,e){if(!n||!e||n.length!==e.length)return!1;for(let t=0;t<n.length;t+=1)if(n[t]!==e[t])return!1;return!0}function ou(n,e){if(!n||typeof n!="object")return null;if(n.sourceRoomId&&n.targetRoomId)return{a:String(n.sourceRoomId),b:String(n.targetRoomId)};if(n.from==null||n.to==null)return null;const t=Zt(String(n.from),e,null),i=Zt(String(n.to),e,n.wing||null);return!t||!i?null:{a:t.key,b:i.key}}function i0(n,e,t){const i=Array.isArray(n)?n:[],r=t!=null&&t.length?t:hr(i),s=zr(e,r);return s==null?i:s.size===0?[]:Bs(i,s)}function r0(n,e){return n<e?`${n}\0${e}`:`${e}\0${n}`}function au(n,e){const t=new Map;function i(s,a,o,c){if(!s||!a||s===a)return;t.has(s)||t.set(s,new Map),t.has(a)||t.set(a,new Map);const l=t.get(s).get(a);(!l||c<l.edgeKey)&&(t.get(s).set(a,{relationshipType:o,edgeKey:c}),t.get(a).set(s,{relationshipType:o,edgeKey:c}))}for(let s=0;s<n.length;s+=1){const a=n[s],o=ou(a,e);if(!o)continue;const c=Ei(a),l=a.edgeId!=null?String(a.edgeId):`legacy:${s}`;i(o.a,o.b,c,l)}const r=new Map;return t.forEach((s,a)=>{const o=[...s.entries()].map(([c,l])=>({to:c,relationshipType:l.relationshipType,edgeKey:l.edgeKey})).sort((c,l)=>c.to.localeCompare(l.to));r.set(a,o)}),r}function s0(n,e,t){const i=bi(t),r=new Map;function s(o,c){if(!o||c.cost<o.cost)return c;if(c.cost>o.cost)return o;const l=o.relationshipType.localeCompare(c.relationshipType);return l!==0?l<0?o:c:o.edgeKey<=c.edgeKey?o:c}for(let o=0;o<n.length;o+=1){const c=n[o],l=ou(c,e);if(!l)continue;const h=Ei(c),f=c.edgeId!=null?String(c.edgeId):`legacy:${o}`,d=n0(h,i),m={a:l.a,b:l.b,relationshipType:h,edgeKey:f,cost:d},_=r0(l.a,l.b);r.set(_,s(r.get(_),m))}const a=new Map;return r.forEach(o=>{a.has(o.a)||a.set(o.a,[]),a.has(o.b)||a.set(o.b,[]),a.get(o.a).push({to:o.b,relationshipType:o.relationshipType,edgeKey:o.edgeKey,cost:o.cost}),a.get(o.b).push({to:o.a,relationshipType:o.relationshipType,edgeKey:o.edgeKey,cost:o.cost})}),a.forEach(o=>{o.sort((c,l)=>c.to.localeCompare(l.to))}),a}function cu(n,e,t){const i=String(e),r=String(t);if(!n.has(i)||!n.has(r))return null;if(i===r)return{pathRoomIds:[i],segmentTypes:[],segmentEdgeKeys:[]};const s=new Map;s.set(i,{prev:null,relationshipType:"",edgeKey:""});const a=[i],o=new Set([i]);for(;a.length;){const c=a.shift(),l=n.get(c);if(l){for(const{to:h,relationshipType:f,edgeKey:d}of l)if(!o.has(h)){if(o.add(h),s.set(h,{prev:c,relationshipType:f,edgeKey:d}),h===r)return lu(s,i,r);a.push(h)}}}return null}function o0(n,e,t){const i=String(e),r=String(t);if(!n.has(i)||!n.has(r))return null;if(i===r)return{pathRoomIds:[i],segmentTypes:[],segmentEdgeKeys:[],totalCost:0};const s=Number.MAX_SAFE_INTEGER,a=[...n.keys()],o=new Map,c=new Map,l=new Map,h=new Map;for(const m of a)o.set(m,s),c.set(m,s),l.set(m,null);o.set(i,0),c.set(i,0),h.set(i,{prev:null,relationshipType:"",edgeKey:""});const f=new Set;for(;f.size<a.length;){let m=null,_=s,g=s;for(const u of a){if(f.has(u))continue;const v=o.get(u),x=c.get(u);v!==s&&(m==null||v<_||v===_&&x<g||v===_&&x===g&&u<m)&&(m=u,_=v,g=x)}if(m==null||_===s||(f.add(m),m===r))break;const p=n.get(m);if(p)for(const{to:u,relationshipType:v,edgeKey:x,cost:E}of p){const P=o.get(m)+E,T=c.get(m)+1,A=o.get(u),K=c.get(u);let M=!1;(P<A||P===A&&T<K||P===A&&T===K&&m<(l.get(u)||"￿"))&&(M=!0),M&&(o.set(u,P),c.set(u,T),l.set(u,m),h.set(u,{prev:m,relationshipType:v,edgeKey:x}))}}if(o.get(r)===s)return null;const d=lu(h,i,r);return d?{...d,totalCost:o.get(r)}:null}function lu(n,e,t){const i=[];let r=t;for(;i.push(r),r!==e;){const o=n.get(r);if(!(o!=null&&o.prev))return null;r=o.prev}i.reverse();const s=[],a=[];for(let o=1;o<i.length;o+=1){const c=n.get(i[o]);if(!c)return null;s.push(c.relationshipType||"tunnel"),a.push(c.edgeKey||"")}return{pathRoomIds:i,segmentTypes:s,segmentEdgeKeys:a}}function a0(n){return dl(n)}function Jc(n){const e=ar(n);return e?It(e.wing,e.room):null}function c0(n){if(!n||n.length<=2)return[];const e=[];for(let t=1;t<n.length-1;t+=1){const i=yn(n[t-1]),r=yn(n[t]),s=yn(n[t+1]);!i||!r||!s||(i.wingId!==r.wingId||r.wingId!==s.wingId)&&e.push(n[t])}return e}function uu(n){const e={};for(const t of n||[]){const i=t||"tunnel";e[i]=(e[i]||0)+1}return e}function l0(n){const e=(n==null?void 0:n.length)??0;if(!e)return"";const t=uu(n),i=t.tunnel||0,r=t.taxonomy_adjacency||0;let s=0;for(const[a,o]of Object.entries(t))a!=="tunnel"&&a!=="taxonomy_adjacency"&&(s+=o);return i===e?"Edge mix: all tunnel.":r===e?"Edge mix: all taxonomy_adjacency.":s?`Edge mix: ${i} tunnel, ${r} adjacency, ${s} other.`:`Edge mix: ${i} tunnel, ${r} adjacency.`}function u0(n,e,t,i){const r=(n||[]).filter(a=>Ei(a)==="tunnel");if(!r.length)return!1;const s=au(r,e);return!!cu(s,t,i)}function h0(n,e,t,i={}){const r=bi(n),s=!!i.tunnelOnlyPossible,a=i.segmentTypes||[];if(!e||!t)return null;if(r==="shortest")return"Fewest-hop path (reference mode).";const o=su(e.pathRoomIds,t.pathRoomIds),c=Math.max(0,e.pathRoomIds.length-1),l=Math.max(0,t.pathRoomIds.length-1),h=[];o?h.push("Same path as Shortest (fewest hops)."):c>l?h.push(`Adds ${c-l} hop(s) vs Shortest to satisfy ${Ur[r].shortLabel} scoring.`):c<l?h.push(`Uses ${l-c} fewer hop(s) than Shortest (unusual — check parallel edges).`):h.push("Same hop count as Shortest but a different path — tie-break or parallel edges.");const f=a.length>0&&a.every(d=>(d||"tunnel")==="tunnel");return(r==="tunnel_preferred"||r==="adjacency_light")&&(!s&&!f?h.push("No tunnel-only route under current filters — path mixes edge types as needed."):s&&f&&h.push("Tunnel-only path is available; this route uses tunnel edges.")),h.join(" ")}function d0(n){const{graphEdges:e=[],roomsData:t={},enabledRelTypes:i,availableRelTypes:r,startRoomId:s,endRoomId:a,routeMode:o}=n||{},c=bi(o),l=String(s||""),h=String(a||"");if(!l||!h)return{ok:!1,reason:"missing_endpoint",message:Sr("missing_endpoint")};const f=r!=null&&r.length?r:hr(e),m=zr(i,f)!==null,_=Array.isArray(e)?e.length:0,g=i0(e,i,f);if(!g.length)return{ok:!1,reason:"no_edges",message:Sr("no_edges",{graphFilterNarrowed:_>0}),routingBasis:"explicit_mcp_only",inferredLayerEnabled:!1,graphFilterNarrowed:m};const p=au(g,t),u=cu(p,l,h);if(!u)return{ok:!1,reason:"no_path",message:Sr("no_path"),routingBasis:"explicit_mcp_only",inferredLayerEnabled:!1,graphFilterNarrowed:m};let v,x=null;if(c==="shortest")v=u;else{const D=s0(g,t,c),$=o0(D,l,h);if(v=$,x=$?$.totalCost:null,!v)return{ok:!1,reason:"no_path",message:Sr("no_path"),routingBasis:"explicit_mcp_only",inferredLayerEnabled:!1,graphFilterNarrowed:m}}const E=v.pathRoomIds.map(D=>dl(D)).filter(Boolean);if(E.length!==v.pathRoomIds.length)return{ok:!1,reason:"id_map_failed",message:Sr("id_map_failed"),graphFilterNarrowed:m};const P=Math.max(0,v.pathRoomIds.length-1),T=Math.max(0,u.pathRoomIds.length-1),A=!su(v.pathRoomIds,u.pathRoomIds),K=u0(g,t,l,h),M=h0(c,v,u,{tunnelOnlyPossible:K,segmentTypes:v.segmentTypes}),w=l0(v.segmentTypes),O=(v.segmentTypes||[]).some(D=>(D||"")==="taxonomy_adjacency");return{ok:!0,pathRoomIds:v.pathRoomIds,pathSceneIds:E,segmentTypes:v.segmentTypes,segmentEdgeKeys:v.segmentEdgeKeys,hops:P,bridges:c0(v.pathRoomIds),typeCounts:uu(v.segmentTypes),routeMode:c,totalCost:x,referenceShortestHops:T,differsFromShortest:A,comparisonNote:M,mixSummary:w,tunnelOnlyPathExists:K,inferredLayerEnabled:!1,usesInferredSegments:O,routingBasis:"explicit_mcp_only",graphFilterNarrowed:m}}function f0(n,e,t){if(t<=0)return 0;const i=t-1;let r=Number(n)||0;r=Math.max(0,Math.min(i,r));const s=t;return(r+e+s*32)%s}function dr(n,e){if(!e||e<1)return 0;let t=Math.floor(Number(n));return Number.isFinite(t)||(t=0),t<0&&(t=0),t>e-1&&(t=e-1),t}function Er(n,e,t){const i=t==="from"?e.sourceRoomId||e.from:e.targetRoomId||e.to;if(i==null)return null;const r=String(i);return n.find(s=>s.type!=="room"?!1:It(s.wing,s.name)===r||!r.includes("/")&&s.name===r?!0:`${s.wing}/${s.name}`===r)}const Rt={wingColors:{projects:"#8b9cf8",shared_grocery_list:"#6ee7b7",openclaw:"#94a3b8",default:"#fbbf24"},nodeSizes:{wingMin:3,wingMax:8,roomMin:.8,roomMax:2.5},spacing:{wingSeparation:40,roomRadius:15},accent:{linkWing:4015188,center:14870768}};function p0(n){let e=0;const t=String(n||"");for(let i=0;i<t.length;i+=1)e=e*31+t.charCodeAt(i)>>>0;return e%360}function Bo(n){return Rt.wingColors[n]?Rt.wingColors[n]:`hsl(${p0(n)}, 52%, 68%)`}function m0(n){n.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose())})}function g0(n){var e,t;(e=n.geometry)==null||e.dispose(),(t=n.material)==null||t.dispose()}function _0(n,e={}){var ct;let t,i,r,s,a,o=0,c=null,l={},h={},f=[],d=[],m=[],_=[],g=new Map,p=[],u=null,v=null,x=new Map,E=80,P=null,T=0,A=[],K=null,M=0,w="wings",O=null,D=1,$=!0,L=!0,z=null;const q=()=>({active:!1,pathSceneIds:[],stepIndex:0,segmentTypes:[],bridgeSceneIds:[]});let X={searchQuery:"",hoveredId:null,selectedId:null,pinActive:!1,relationshipTypesVisible:null,route:q()},ee=typeof window<"u"&&((ct=window.matchMedia)==null?void 0:ct.call(window,"(prefers-reduced-motion: reduce)").matches);const J=new Map,ne=new Map,ce={onHover:e.onHover||(()=>{}),onClick:e.onClick||(()=>{}),onBackgroundClick:e.onBackgroundClick||(()=>{})},de=new n_,k=new je;function te(N,W,Q=850){const pe=i.position.clone(),Ee=s.target.clone(),Ne=performance.now();c&&cancelAnimationFrame(c);function _e(){const ze=Math.min((performance.now()-Ne)/Q,1),Re=1-(1-ze)**3;i.position.lerpVectors(pe,N,Re),s.target.lerpVectors(Ee,W,Re),s.update(),ze<1?c=requestAnimationFrame(_e):c=null}c=requestAnimationFrame(_e)}function se(){var N;d.forEach(({mesh:W})=>{t.remove(W),m0(W)}),m.forEach(({line:W})=>{t.remove(W),g0(W)}),_.forEach(({sprite:W})=>{var Q;t.remove(W),(Q=W.material.map)==null||Q.dispose(),W.material.dispose()}),d=[],m=[],_=[],g=new Map,p=[],u=null,v=null,x=new Map,E=80,P=null,T=0,A=[],K=null,M&&clearTimeout(M),M=0,(N=t==null?void 0:t.fog)!=null&&N.isFogExp2&&(t.fog.density=.0026),a!=null&&a.material&&(a.material.opacity=.35),J.clear(),ne.clear()}function De(){const N=new on,W=[];for(let pe=0;pe<1800;pe+=1)W.push(ci.randFloatSpread(380),ci.randFloatSpread(200),ci.randFloatSpread(380));N.setAttribute("position",new pn(W,3));const Q=new Jl({color:9741240,size:.45,transparent:!0,opacity:.35,depthWrite:!1});a=new Zg(N,Q),t.add(a)}function Pe(N,W="#e2e8f0"){const Q=document.createElement("canvas"),pe=Q.getContext("2d"),Ee=16;pe.font="500 22px ui-sans-serif, system-ui, sans-serif";const Ne=Math.ceil(pe.measureText(N).width)+Ee*2;Q.width=Ne,Q.height=44,pe.font="500 22px ui-sans-serif, system-ui, sans-serif",pe.fillStyle="rgba(15,23,42,0.88)",pe.fillRect(4,4,Ne-8,36),pe.fillStyle=W,pe.fillText(N,Ee,28);const _e=new Jg(Q);_e.needsUpdate=!0;const ze=new Yl({map:_e,transparent:!0,depthWrite:!1}),Re=new Yg(ze),tt=.022*Ne;return Re.scale.set(tt,11,1),Re.userData.labelBaseScale={x:tt,y:11,z:1},Re}function et(N,W,Q){const pe=W.material;J.set(N,{mesh:W,data:Q,id:N,baseOpacity:pe.opacity,baseEmissive:pe.emissiveIntensity,baseScale:1,presentationOpacity:1}),W.userData.nodeId=N}function We(N,W,Q,pe,Ee,Ne){const _e=Pe(W,Ne);_e.visible=$,_e.position.set(Q,pe+2.2,Ee),t.add(_e),_.push({sprite:_e,nodeId:N}),ne.set(N,_e)}const Ve=40;function lt(N){var Ee;const W=_.findIndex(Ne=>Ne.nodeId===N);if(W===-1)return;const{sprite:Q}=_[W];t.remove(Q),(Ee=Q.material.map)==null||Ee.dispose(),Q.material.dispose(),_.splice(W,1),ne.delete(N);const pe=A.indexOf(N);pe>=0&&A.splice(pe,1)}function j(){for(let N=0;N<A.length;N+=1){const W=A[N];if(!(W===X.selectedId||W===X.hoveredId||X.selectedId&&Ki(X.selectedId,x).has(W)||!X.selectedId&&X.hoveredId&&Ki(X.hoveredId,x).has(W)))return A.splice(N,1),lt(W),!0}return!1}function Lt(N){if(ne.has(N))return;const W=J.get(N);if(!(W!=null&&W.data)||W.data.type!=="room")return;for(;A.length>=Ve&&j(););if(A.length>=Ve)return;const{mesh:Q,data:pe}=W,Ee=Q.position;We(N,pe.name,Ee.x,Ee.y,Ee.z,"#94a3b8"),A.push(N)}function Be(){if(w!=="graph"||!p.length||!i)return;const N=i.position.distanceTo(s.target),W=g_(N,E),Q=(u==null?void 0:u.tier)??0,pe=(u==null?void 0:u.labelBudget)??180,Ee=X.selectedId,Ne=X.hoveredId,{primaryId:_e}=Oo(Ee,Ne),ze=_e?Ki(_e,x):new Set,Re=y_(Ee||Ne),tt=E_(p,{selectedId:Ee,hoveredId:Ne,pinActive:X.pinActive,budget:pe,neighborIds:ze,focusWingId:Re,cameraDistanceNorm:W,densityTier:Q}),it=(X.searchQuery||"").trim().toLowerCase();for(const ge of tt)ge.startsWith("room:")&&!ne.has(ge)&&Lt(ge);ne.forEach((ge,Qe)=>{var me;const mt=(me=J.get(Qe))==null?void 0:me.data;if(!mt)return;const Tt=Je(mt,it),S=tt.has(Qe),B={selected:Qe===Ee,hovered:Qe===Ne,pinned:!!(X.pinActive&&Qe===Ee),neighbor:ze.has(Qe)},H=v_(W,B),G=ge.userData.labelBaseScale;G&&ge.scale.set(G.x*H,G.y*H,G.z);const F=Tt?x_(W,B):.12;ge.material.opacity=F,ge.visible=$&&S})}function $e(N,W,Q,pe=.28,Ee={}){const Ne=[new U(...N),new U(...W)],_e=new on().setFromPoints(Ne),ze=new Zl({color:Q,transparent:!0,opacity:pe}),Re=new Kg(_e,ze);return Re.userData=Ee,t.add(Re),m.push({line:Re,...Ee}),Re}function Ae(N,W,Q,pe,Ee){const Ne=Bo(N),_e=new st(Ne),ze=`wing:${N}`,Re=new Vn(Ee,28,28),tt=new Mr({color:_e,emissive:_e,emissiveIntensity:.22,metalness:.15,roughness:.45,transparent:!0,opacity:.92}),it=new Kt(Re,tt);it.position.set(W,Q,pe),it.userData={id:ze,name:N,wingId:N,type:"wing",drawers:l[N],label:N,_baseY:Q};const ge=new Vn(Ee*1.25,24,24),Qe=new Ko({color:_e,transparent:!0,opacity:.08,side:qt,depthWrite:!1}),mt=new Kt(ge,Qe);return it.add(mt),t.add(it),d.push({mesh:it,data:it.userData}),et(ze,it,it.userData),it}function gt(N,W,Q,pe,Ee,Ne){const _e=Bo(W),ze=new st(_e);ze.offsetHSL(0,-.05,-.06);const Re=`room:${W}:${N}`,tt=new Vn(Ne,20,20),it=new Mr({color:ze,emissive:ze,emissiveIntensity:.18,metalness:.12,roughness:.5,transparent:!0,opacity:.88}),ge=new Kt(tt,it);ge.position.set(Q,pe,Ee);const Qe=(h[W]||[]).find(Tt=>Tt.name===N),mt=(Qe==null?void 0:Qe.roomId)||It(W,N);return ge.userData={id:Re,name:N,type:"room",wing:W,wingId:W,roomId:mt,drawers:Qe==null?void 0:Qe.drawers,label:N,_baseY:pe},t.add(ge),d.push({mesh:ge,data:ge.userData}),et(Re,ge,ge.userData),ge}function Je(N,W){if(!W)return!0;const Q=[N.name,N.label,N.wing,N.type].filter(Boolean).join(" ").toLowerCase();return Q.includes(W)||W.split(/\s+/).every(pe=>pe.length<2||Q.includes(pe))}function b(N){return N==null?"":[...N].sort().join("\0")}function y(N,W){const Q=N||q(),pe=W||q();if(!!Q.active!=!!pe.active)return!1;if(!Q.active)return!0;if(Q.stepIndex!==pe.stepIndex)return!1;const Ee=(Q.pathSceneIds||[]).join("\0"),Ne=(pe.pathSceneIds||[]).join("\0");if(Ee!==Ne)return!1;const _e=(Q.segmentTypes||[]).join("\0"),ze=(pe.segmentTypes||[]).join("\0");if(_e!==ze)return!1;const Re=(Q.bridgeSceneIds||[]).join("\0"),tt=(pe.bridgeSceneIds||[]).join("\0");return Re===tt}function V(N,W){return!N||!W?"":N<W?`${N}\0${W}`:`${W}\0${N}`}function le(N,W){return N.searchQuery===W.searchQuery&&N.hoveredId===W.hoveredId&&N.selectedId===W.selectedId&&N.pinActive===W.pinActive&&b(N.relationshipTypesVisible)===b(W.relationshipTypesVisible)&&y(N.route,W.route)}function ie(){const N=(X.searchQuery||"").trim().toLowerCase(),W=X.hoveredId,Q=X.selectedId,pe=X.pinActive,Ee=X.relationshipTypesVisible,Ne=(u==null?void 0:u.tier)??0,_e=X.route||q(),ze=w==="graph"&&_e.active&&Array.isArray(_e.pathSceneIds)&&_e.pathSceneIds.length>0,Re=new Set,tt=new Map;if(ze){const G=_e.pathSceneIds;for(let F=0;F<G.length-1;F+=1)Re.add(V(G[F],G[F+1])),tt.set(V(G[F],G[F+1]),F)}const it=new Set(_e.bridgeSceneIds||[]),ge=ze&&_e.pathSceneIds.length>0?_e.pathSceneIds[dr(_e.stepIndex,_e.pathSceneIds.length)]:null,Qe=new Map,mt=(u==null?void 0:u.globalEdgeOpacityMult)??1,Tt=(u==null?void 0:u.adjacencyOpacityMult)??1,S=(u==null?void 0:u.tunnelEmphasisMult)??1;m.forEach(G=>{var vt,rt;const{line:F,fromId:me,toId:Se,baseOpacity:Fe=.28,isGraphRelationship:Ge,relationshipType:Ke,styleColorHex:qe}=G,Oe=me?Je(((vt=J.get(me))==null?void 0:vt.data)||{},N):!0,ft=Se?Je(((rt=J.get(Se))==null?void 0:rt.data)||{},N):!0,kt=!N||Oe&&ft;let At=!0;if(Ge&&Ee!=null){const nn=Ke||"tunnel";At=Ee.has(nn)}if(!kt){F.visible=!0,F.material.opacity=Fe*.12;return}if(Ge&&!At){F.visible=!1;return}F.visible=!0;let bt=Fe;if(Ge){const nn=Ke||"tunnel";nn==="taxonomy_adjacency"&&(bt*=Tt),nn==="tunnel"&&(bt*=S),bt*=mt,bt*=w_({selectedId:Q,hoveredId:W,fromId:me,toId:Se,relationshipType:nn,densityTier:Ne})}if(ze&&Ge&&me&&Se){const nn=V(me,Se),Et=Re.has(nn),Yt=tt.get(nn),Ti=Yt!=null&&Array.isArray(_e.segmentTypes)&&_e.segmentTypes[Yt]?_e.segmentTypes[Yt]:Ke||"tunnel",ni=qe??Xc(Ti).color,wn=new st(ni);Et?(bt=Math.min(1,bt*1.52),wn.lerp(new st(16777215),.11),Ti==="tunnel"?(wn.lerp(new st(5999871),.06),bt=Math.min(1,bt*1.03)):Ti==="taxonomy_adjacency"&&wn.lerp(new st(4049336),.05)):(bt*=.32,wn.multiplyScalar(.72)),F.material.color.copy(wn)}else Ge&&qe!=null&&F.material.color.setHex(qe);F.material.opacity=bt,Ge&&(me&&Qe.set(me,(Qe.get(me)||0)+1),Se&&Qe.set(Se,(Qe.get(Se)||0)+1))});const{primaryId:B}=Oo(Q,W),H=B&&w==="graph"?Ki(B,x):null;J.forEach((G,F)=>{const{mesh:me,data:Se,baseOpacity:Fe,baseEmissive:Ge}=G,Ke=me.material;if(!Ke||Ke.type==="MeshBasicMaterial")return;const qe=Je(Se,N);let Oe=qe?1:.14,ft=1;K&&F===K.id&&(ft*=1.22),F===Q?ft*=pe?1.88:1.68:F===W&&(ft*=Q?1.36:1.48),F===Q&&pe?Oe=Math.max(Oe,.88):F===Q&&(Oe=Math.max(Oe,.82));const kt=g.get(F)||0,At=Qe.get(F)||0;Se.type==="room"&&kt>0&&At===0&&w==="graph"&&(Oe*=Ne>=2?.28:Ne>=1?.31:.38,ft*=Ne>=2?.48:.54),H&&(H.has(F)&&(Oe=Math.max(Oe,Ne>=2?.55:.66),ft*=1.09),F===B&&(Oe=Math.max(Oe,pe&&F===Q?.94:.88)));let bt=1;if(ze&&Se.type==="room")if(!new Set(_e.pathSceneIds).has(F))Oe*=.4,ft*=.75;else{const Et=_e.pathSceneIds[0],Yt=_e.pathSceneIds[_e.pathSceneIds.length-1];F===Et&&(ft*=1.1),F===Yt&&(ft*=1.08),it.has(F)&&F!==Et&&F!==Yt&&(ft*=1.06,bt=Math.max(bt,1.03)),ge&&F===ge&&(ft*=1.18,bt=1.05)}G.presentationOpacity=Math.min(1,Oe),Ke.opacity=Math.min(1,Fe*Oe),Ke.emissiveIntensity=Ge*ft;const vt=F===Q?pe?1.12:1.08:F===W?Q&&F!==Q?1.04:1.06:H!=null&&H.has(F)?1.028:1,rt=qe?1:.88;me.scale.setScalar(vt*rt*bt)}),ze&&_e.pathSceneIds.length&&_e.pathSceneIds.forEach(G=>{G&&G.startsWith("room:")&&Lt(G)}),w==="graph"&&p.length?Be():ne.forEach((G,F)=>{var Fe;const me=(Fe=J.get(F))==null?void 0:Fe.data;if(!me)return;const Se=Je(me,N);G.visible=$,G.material.opacity=Se?F===Q?1:.92:.2})}function ue(){const N=Object.keys(l);if(!N.length)return;const W=Math.PI*2/N.length,Q=Rt.spacing.wingSeparation/2;N.forEach((_e,ze)=>{const Re=ze*W,tt=Math.cos(Re)*Q,it=Math.sin(Re)*Q,ge=l[_e]||1,Qe=ci.mapLinear(ge,1,200,Rt.nodeSizes.wingMin,Rt.nodeSizes.wingMax);Ae(_e,tt,0,it,Qe),We(`wing:${_e}`,_e,tt,0,it,"#e2e8f0")});const pe=new Vn(1.1,20,20),Ee=new Mr({color:Rt.accent.center,emissive:3359061,emissiveIntensity:.4,metalness:.3,roughness:.4,transparent:!0,opacity:.55}),Ne=new Kt(pe,Ee);t.add(Ne),d.push({mesh:Ne,data:{name:"Palace core",type:"center"}}),N.forEach((_e,ze)=>{const Re=ze*W,tt=Math.cos(Re)*Q,it=Math.sin(Re)*Q;$e([0,0,0],[tt,0,it],Rt.accent.linkWing,.22,{fromId:null,toId:`wing:${_e}`,baseOpacity:.22})}),te(new U(0,36,88),new U(0,0,0))}function Le(N){const W=h[N]||[],Q=Rt.nodeSizes.wingMin+1.2;Ae(N,0,0,0,Q),We(`wing:${N}`,N,0,0,0,"#e2e8f0");const pe=Rt.spacing.roomRadius,Ee=Math.max(W.length,1),Ne=Math.PI*2/Ee;W.forEach((_e,ze)=>{const Re=ze*Ne,tt=Math.cos(Re)*pe,it=Math.sin(Re)*pe,ge=ci.mapLinear(_e.drawers||1,1,80,Rt.nodeSizes.roomMin,Rt.nodeSizes.roomMax);gt(_e.name,N,tt,0,it,ge),$e([0,0,0],[tt,0,it],Rt.accent.linkWing,.22,{fromId:`wing:${N}`,toId:`room:${N}:${_e.name}`,baseOpacity:.22}),We(`room:${N}:${_e.name}`,_e.name,tt,0,it,"#94a3b8")}),te(new U(0,38,72),new U(0,0,0))}function ye(){const N=Object.keys(h);if(!N.length)return;const W=Math.PI*2/N.length,Q=Rt.spacing.wingSeparation/2;N.forEach((_e,ze)=>{const Re=ze*W,tt=Math.cos(Re)*Q,it=Math.sin(Re)*Q;Ae(_e,tt,0,it,Rt.nodeSizes.wingMin),We(`wing:${_e}`,_e,tt,0,it,"#cbd5e1");const ge=h[_e]||[],Qe=Math.PI*2/Math.max(ge.length,1),mt=Rt.spacing.roomRadius;ge.forEach((Tt,S)=>{const B=Re+S*Qe,H=tt+Math.cos(B)*mt,G=it+Math.sin(B)*mt,F=ci.mapLinear(Tt.drawers||1,1,80,Rt.nodeSizes.roomMin,Rt.nodeSizes.roomMax);gt(Tt.name,_e,H,0,G,F),$e([tt,0,it],[H,0,G],Rt.accent.linkWing,.18,{fromId:`wing:${_e}`,toId:`room:${_e}:${Tt.name}`,baseOpacity:.18}),We(`room:${_e}:${Tt.name}`,Tt.name,H,0,G,"#94a3b8")})});const pe=new Vn(1.1,20,20),Ee=new Mr({color:Rt.accent.center,emissive:3359061,emissiveIntensity:.35,metalness:.25,roughness:.45,transparent:!0,opacity:.5}),Ne=new Kt(pe,Ee);t.add(Ne),d.push({mesh:Ne,data:{name:"Palace core",type:"center"}}),N.forEach((_e,ze)=>{const Re=ze*W;$e([0,0,0],[Math.cos(Re)*Q,0,Math.sin(Re)*Q],Rt.accent.linkWing,.2,{baseOpacity:.2})}),te(new U(0,52,102),new U(0,0,0))}function we(){O&&h[O]?Le(O):ye()}function He(N){return[...N].sort((W,Q)=>W.localeCompare(Q))}function nt(){const N=new Map;Object.keys(l).forEach(ge=>{N.set(ge,{name:ge,type:"wing",wing:ge,x:0,y:0,z:0})}),Object.entries(h).forEach(([ge,Qe])=>{Qe.forEach(mt=>{N.set(It(ge,mt.name),{name:mt.name,type:"room",wing:ge,x:0,y:0,z:0,drawers:mt.drawers})})});const W=Array.from(N.values());if(!W.length){const ge=new Vn(1.1,16,16),Qe=new Mr({color:Rt.accent.center,emissive:3359061,emissiveIntensity:.25,metalness:.2,roughness:.5,transparent:!0,opacity:.35}),mt=new Kt(ge,Qe);t.add(mt),d.push({mesh:mt,data:{name:"No graph data",type:"center"}}),te(new U(0,28,72),new U(0,0,0));return}const Q=He(Object.keys(l));g=C_(W,f,Er),x=M_(f,W,Er),u=h_(W.length,f.length,Q.length),ee&&(u={...u,labelBudget:Math.min(u.labelBudget,95)}),f_(W,Q,u),p_(W,f,u,Er),m_(W,u.collisionMinDist,12),t.fog&&t.fog.isFogExp2&&(t.fog.density=u.fogDensity),a!=null&&a.material&&(a.material.opacity=Math.max(.12,.34-u.tier*.055)),p=W.map(ge=>{const Qe=ge.type==="wing"?`wing:${ge.name}`:`room:${ge.wing}:${ge.name}`,mt=g.get(Qe)||0;return{id:Qe,incidentFull:mt,baseScore:b_({type:ge.type,incidentFull:mt,drawers:ge.drawers})}});const pe=S_(p,u);W.forEach(ge=>{const Qe=ge.type==="wing",mt=Qe?Rt.nodeSizes.wingMin+.4:Rt.nodeSizes.roomMin+.2;if(Qe)Ae(ge.name,ge.x,ge.y,ge.z,mt),We(`wing:${ge.name}`,ge.name,ge.x,ge.y,ge.z,"#cbd5e1");else{const Tt=`room:${ge.wing}:${ge.name}`;gt(ge.name,ge.wing,ge.x,ge.y,ge.z,mt),pe.has(Tt)&&We(Tt,ge.name,ge.x,ge.y,ge.z,"#94a3b8")}}),f.forEach(ge=>{const Qe=Er(W,ge,"from"),mt=Er(W,ge,"to");if(Qe&&mt){const Tt=or(Qe),S=or(mt),B=Ei(ge),H=Xc(B);$e([Qe.x,Qe.y,Qe.z],[mt.x,mt.y,mt.z],H.color,H.opacity,{fromId:Tt,toId:S,baseOpacity:H.opacity,isGraphRelationship:!0,relationshipType:B,styleColorHex:H.color})}});const Ee=new lr;W.forEach(ge=>Ee.expandByPoint(new U(ge.x,ge.y,ge.z)));const Ne=new U;Ee.getCenter(Ne);const _e=new U;Ee.getSize(_e);const ze=Math.max(_e.x,_e.y,_e.z,12);E=ze;const Re=jc(ze*.48,i.fov,u.tier),tt=new U(.35,.42,1).normalize(),it=Ne.clone().add(tt.multiplyScalar(Re));v={position:it.clone(),target:Ne.clone()},te(it,Ne)}function oe(){const W=L&&!(w==="graph")&&!ee;s.autoRotate=W,s.autoRotateSpeed=.35*(W?1:0)}function pt(N,W=null){w=N,O=W,se(),z=null,X.hoveredId=null,oe(),N==="wings"?ue():N==="rooms"?we():N==="graph"&&nt(),ie()}function ot(){z=null,X.hoveredId=null,r.domElement.style.cursor="default",ie(),ce.onHover(null,{x:0,y:0})}function Ye(N){var Ne,_e;const W=r.domElement.getBoundingClientRect();k.x=(N.clientX-W.left)/W.width*2-1,k.y=-((N.clientY-W.top)/W.height)*2+1,de.setFromCamera(k,i);const Q=d.map(ze=>ze.mesh).filter(Boolean),pe=de.intersectObjects(Q,!0);for(let ze=0;ze<pe.length;ze+=1){let Re=pe[ze].object;for(;Re&&!((Ne=Re.userData)!=null&&Ne.type);)Re=Re.parent;if(Re&&((_e=Re.userData)!=null&&_e.type)&&Re.userData.type!=="center"){const tt=Re.userData.id||null,it=z!==Re||X.hoveredId!==tt;z=Re,X.hoveredId=tt,r.domElement.style.cursor="pointer",it&&ie(),ce.onHover({...Re.userData},{x:N.clientX,y:N.clientY});return}}const Ee=X.hoveredId!=null;z=null,X.hoveredId=null,r.domElement.style.cursor="default",Ee&&ie(),ce.onHover(null,{x:N.clientX,y:N.clientY})}function Ue(){if(!z){K=null,ce.onBackgroundClick(),ce.onClick(null);return}const N={...z.userData};N.id&&N.type!=="center"&&(M&&clearTimeout(M),K={id:N.id,at:performance.now()},ie(),M=setTimeout(()=>{M=0,K=null,ie()},190)),ce.onClick(N)}function Me(){o=requestAnimationFrame(Me),s.update();const N=Date.now()*.001,W=ee?0:.42*D,Q=ee?0:.006*D;d.forEach((Ee,Ne)=>{if(!Ee.data||Ee.data.type==="center")return;const _e=Ne*.37,ze=Ee.mesh.userData._baseY??0;Ee.mesh.position.y=ze+Math.sin(N*.9+_e)*W,Ee.mesh.rotation.y+=Q});const pe=(u==null?void 0:u.tier)??0;if(w==="graph"){let Ee=s.target;X.selectedId&&J.get(X.selectedId)?Ee=J.get(X.selectedId).mesh.position:X.hoveredId&&J.get(X.hoveredId)&&(Ee=J.get(X.hoveredId).mesh.position);const Ne=X.selectedId||X.hoveredId,_e=Ne?Ki(Ne,x):new Set,ze=!!(X.selectedId||X.hoveredId);J.forEach((Re,tt)=>{const it=Re.mesh.material;if(!it||it.type==="MeshBasicMaterial")return;const ge=Re.mesh.position.distanceTo(Ee),Qe=T_(ge,pe,{isNeighbor:_e.has(tt),focusActive:ze});it.opacity=Math.min(1,Re.baseOpacity*(Re.presentationOpacity??1)*Qe)}),Be()}r.render(t,i)}function R(){t=new jg,t.background=new st(724760),t.fog=new ea(724760,.0026),i=new hn(58,n.clientWidth/n.clientHeight,.1,1200),i.position.set(0,34,90),r=new ql({antialias:!0,alpha:!1,powerPreference:"high-performance"}),r.setSize(n.clientWidth,n.clientHeight),r.setPixelRatio(Math.min(window.devicePixelRatio,2)),r.outputColorSpace=Bt,r.toneMapping=vl,r.toneMappingExposure=1.05,n.appendChild(r.domElement),s=new r_(i,r.domElement),s.enableDamping=!0,s.dampingFactor=.055,s.autoRotate=!0,s.autoRotateSpeed=.35,s.maxPolarAngle=Math.PI*.495;const N=new Qg(6583435,988970,.85);t.add(N);const W=new zc(10859772,1.1);W.position.set(20,40,24),t.add(W);const Q=new zc(3718648,.35);if(Q.position.set(-24,12,-18),t.add(Q),De(),typeof window<"u"&&window.matchMedia){const pe=window.matchMedia("(prefers-reduced-motion: reduce)");ee=pe.matches,pe.addEventListener("change",Ee=>{ee=Ee.matches,oe()})}r.domElement.addEventListener("pointermove",Ye),r.domElement.addEventListener("click",Ue),r.domElement.addEventListener("pointerleave",ot),window.addEventListener("resize",he),Me()}function he(){if(!i||!r)return;const N=n.clientWidth,W=n.clientHeight;i.aspect=N/W,i.updateProjectionMatrix(),r.setSize(N,W)}function Ie(N){l=N.wingsData||{},h=N.roomsData||{},f=N.graphEdges||[]}function be(){if(w==="graph"&&v){te(v.position.clone(),v.target.clone());return}te(new U(0,34,90),new U(0,0,0))}function ae(N){const W=J.get(N);if(!W)return;const Q=new U;if(W.mesh.getWorldPosition(Q),w==="graph"&&u){const Ne=[];m.forEach(Tt=>{if(!Tt.isGraphRelationship)return;let S=null;if(Tt.fromId===N?S=Tt.toId:Tt.toId===N&&(S=Tt.fromId),!S)return;const B=J.get(S);B&&Ne.push(B.mesh.position.clone())});const _e=Ne.length,ze=R_(Q,Ne.length?Ne:[Q.clone()]),Re=jc(ze,i.fov,u.tier,{neighborCount:_e});let tt=i.position.clone().sub(Q);tt.lengthSq()<4&&tt.set(32,26,72),tt.normalize(),P===N?T+=1:(P=N,T=0);const it=Math.max(ze*2.4,E*.42,28),ge=A_(it,u.tier,T),Qe=new U(Q.x+ge.x,Q.y+ge.y,Q.z+ge.z),mt=T>0?1020:880;te(Q.clone().add(tt.multiplyScalar(Re)),Qe,mt);return}const pe=i.position.clone().sub(Q).normalize(),Ee=w==="rooms"&&O?26:30;te(Q.clone().add(pe.multiplyScalar(Ee)),Q)}function I(){var N;(N=z==null?void 0:z.userData)!=null&&N.id&&ae(z.userData.id)}function fe(N,W=420){!N||!J.get(N)||(M&&clearTimeout(M),K={id:N,at:performance.now()},ie(),M=setTimeout(()=>{M=0,K=null,ie()},W))}function xe(N){const W={...X,...N};N.route!==void 0&&(W.route={...q(),...N.route}),!le(X,W)&&(X=W,ie())}function Xe(N){xe({relationshipTypesVisible:N})}function ke(){X.selectedId=null,ie()}function ut(){var N;cancelAnimationFrame(o),c&&cancelAnimationFrame(c),window.removeEventListener("resize",he),r!=null&&r.domElement&&(r.domElement.removeEventListener("pointermove",Ye),r.domElement.removeEventListener("click",Ue),r.domElement.removeEventListener("pointerleave",ot)),se(),M&&clearTimeout(M),M=0,a&&(t.remove(a),a.geometry.dispose(),a.material.dispose()),r==null||r.dispose(),(N=r==null?void 0:r.domElement)!=null&&N.parentNode&&r.domElement.parentNode.removeChild(r.domElement)}return{init:R,setData:Ie,setView:pt,updatePresentation:xe,setAutoRotate(N){L=N,oe()},setMotionIntensity(N){D=Math.max(0,Math.min(2,N))},setLabelsVisible(N){if($=!!N,$&&!_.length){pt(w,O);return}_.forEach(({sprite:W})=>{W.visible=$})},resetCamera:be,centerOnHovered:I,centerOnNodeId:ae,pulseNodeEmphasis:fe,clearPin:ke,resize:he,dispose:ut,getView:()=>w,getFocusWing:()=>O,getHovered:()=>z?{...z.userData}:null,setCallbacks(N){Object.assign(ce,N)},setRelationshipFilters:Xe,getGraphNeighbors(N){return w!=="graph"||!N?[]:[...Ki(N,x)].sort((Q,pe)=>Q.localeCompare(pe))}}}const v0=new Set(["wings","rooms","graph"]);function x0(n){return n==null||typeof n!="object"?null:n}function y0(n){const e=x0(n);return e?{view:v0.has(e.view)?e.view:"wings",currentWing:typeof e.currentWing=="string"?e.currentWing:e.currentWing??null,currentRoom:typeof e.currentRoom=="string"?e.currentRoom:e.currentRoom??null,selected:e.selected&&typeof e.selected=="object"?e.selected:null,pinned:!!e.pinned,searchQuery:typeof e.searchQuery=="string"?e.searchQuery:"",labels:e.labels,rotate:e.rotate,motion:e.motion}:{view:"wings",currentWing:null,currentRoom:null,selected:null,pinned:!1,searchQuery:"",labels:void 0,rotate:void 0,motion:void 0}}function M0(n,e){var r,s;const t=(e==null?void 0:e.wingsData)||{},i=(e==null?void 0:e.roomsData)||{};if(n.currentWing&&!_i(t,n.currentWing)&&(n.currentWing=null,n.currentRoom=null,n.selected=null,n.pinned=!1),n.currentRoom&&n.currentWing&&(vi(i,n.currentWing,n.currentRoom)||(n.currentRoom=null,((r=n.selected)==null?void 0:r.type)==="room"&&(n.selected=null,n.pinned=!1))),(s=n.selected)!=null&&s.id){const a=n.selected;a.type==="wing"&&!_i(t,a.name)&&(n.selected=null,n.pinned=!1),a.type==="room"&&(!a.wing||!vi(i,a.wing,a.name))&&(n.selected=null,n.pinned=!1)}n.pinned&&!n.selected&&(n.pinned=!1)}function hu(n){return String(n??"").trim().toLowerCase()}function So(n,e){if(!n)return 0;const t=String(e??"").toLowerCase();if(!t)return 0;if(t===n)return 1e4;if(t.startsWith(n))return 8200-Math.min(n.length,40);const i=t.indexOf(n);if(i>=0)return 5200-Math.min(i,200);const r=n.split(/\s+/).filter(o=>o.length>1);if(r.length<2)return 0;let s=0,a=1/0;for(const o of r){const c=t.indexOf(o);if(c<0)return 0;s+=400,a=Math.min(a,c)}return 3e3-Math.min(a,200)+Math.min(s,800)}function S0(n,e){const t=new Map,i=new Set([...Object.keys(n||{}),...Object.keys(e||{})]);for(const s of i)t.set(s,{kind:"wing",sceneId:`wing:${s}`,wingId:s,label:s});const r=[...t.values()];for(const s of i){const a=n[s]||[];for(const o of a)!o||o.name==null||r.push({kind:"room",sceneId:`room:${s}:${o.name}`,wingId:s,roomName:o.name,label:o.name})}return r}function E0(n){return n.kind==="wing"?"Wing":`Room · ${n.wingId}`}function b0(n,e){if(!e)return 0;if(n.kind==="wing")return So(e,n.wingId);const t=So(e,n.roomName),i=So(e,n.wingId);return Math.max(t,i*.94)}function w0(n,e){const t=hu(e);if(!t||!n.length)return[];const i=new Map;for(const r of n){const s=b0(r,t);if(s<=0)continue;const a=E0(r),o={...r,score:s,sublabel:a},c=i.get(r.sceneId);(!c||o.score>c.score)&&i.set(r.sceneId,o)}return[...i.values()].sort((r,s)=>s.score-r.score||r.label.localeCompare(s.label))}function zo(n,e,t){return e<=0?0:(n+t+e*64)%e}const sa="mempalace-viz-explorer-v1",du="mempalace-viz-route-mode-v1",fu="mempalace-viz-panel-state-v1";let Qt=new Set;const ti=[{id:"wings",title:"Wings",hint:"High-level structure by domain or project."},{id:"rooms",title:"Rooms",hint:"Rooms within each wing, orbiting their parent."},{id:"graph",title:"Graph",hint:"Explicit MemPalace tunnel links (same room name across wings)."}],C={view:"wings",hovered:null,selected:null,pinned:!1,currentWing:null,currentRoom:null,searchQuery:"",filters:{visibleWings:null}};let Y=null,Z=null,Qc=null,el=null,ui=null,tl=null;const Qn=[];let ko=[],Ut=[],Jt=0,Cr=!1,Ls="",Ce={startSceneId:null,targetSceneId:null,result:null,stepIndex:0},Fn=ra;function T0(){try{const n=localStorage.getItem(du);if(n)return bi(JSON.parse(n))}catch{}return ra}function A0(n){try{localStorage.setItem(du,JSON.stringify(bi(n)))}catch{}}Fn=T0();const re=n=>document.getElementById(n);function nl(n){if(!n||!(n instanceof HTMLElement))return!1;const e=n.tagName;return!!(e==="INPUT"||e==="TEXTAREA"||e==="SELECT"||n.isContentEditable)}function fn(n,e=5200){const t=re("toast-host");t&&(clearTimeout(tl),t.innerHTML=`<div class="toast" role="status">${Te(n)}</div>`,tl=setTimeout(()=>{t.innerHTML=""},e))}function R0(n){var s,a,o,c,l;if(C.view!=="graph")return"";const e=Z==null?void 0:Z.graphStats,t=Z==null?void 0:Z.graph,i=((a=(s=Z==null?void 0:Z.graph)==null?void 0:s.edgesResolved)==null?void 0:a.length)??((o=Z==null?void 0:Z.graphEdges)==null?void 0:o.length)??0,r=Array.isArray(t==null?void 0:t.edgesUnresolved)?t.edgesUnresolved.length:Array.isArray(e==null?void 0:e.edgesUnresolved)?e.edgesUnresolved.length:null;if(!i){const h=F_();return`<div class="inspect-card inspect-card--hint" role="status"><strong>${Te(h.title)}</strong><p class="inspect-muted inspect-muted--tight">${Te(h.body)}</p></div>`}if(!((c=n.ga)!=null&&c.hasResolvableEdges)){const h=r??V_(Z==null?void 0:Z.graphEdges,Z==null?void 0:Z.roomsData,((l=t==null?void 0:t.edgesUnresolved)==null?void 0:l.length)??null),f=W_(i,h);return`<div class="inspect-card inspect-card--hint" role="status"><strong>${Te(f.title)}</strong><p class="inspect-muted inspect-muted--tight">${Te(f.body)}</p></div>`}return""}function C0(n){var s;const e=!!Z&&!Z.error;if(!U_({viewIsGraph:C.view==="graph",palaceDataOk:e}))return"";const t=I_().map(a=>`<li>${Te(a)}</li>`).join(""),i=N_({viewIsGraph:C.view==="graph",hasResolvableGraph:!!((s=n.ga)!=null&&s.hasResolvableEdges)}),r=i?D_().map(a=>`<li>${Te(a)}</li>`).join(""):"";return`
    <details class="graph-guidance-details inspect-card inspect-card--hint">
      <summary class="graph-guidance-details__summary">How connections work</summary>
      <ul class="graph-guidance-list inspect-muted inspect-muted--tight">${t}</ul>
    </details>
    ${i?`<details class="graph-guidance-details inspect-card inspect-card--hint">
      <summary class="graph-guidance-details__summary">Tunnels &amp; refresh</summary>
      <ul class="graph-guidance-list inspect-muted inspect-muted--tight">${r}</ul>
    </details>`:""}`}function L0(){return!!(C.pinned&&C.selected)}function Nr(){return{view:"graph",selected:C.selected,pinned:C.pinned,currentWing:C.currentWing,currentRoom:C.currentRoom}}function Eo(){var f,d,m,_;if(C.view!=="graph"||!C.selected||C.selected.type==="center")return"";const n=C.selected.id,e=((d=(f=Y==null?void 0:Y.getGraphNeighbors)==null?void 0:f.call(Y,n))==null?void 0:d.length)??0,t=e>0,i=Ce.result,r=(i==null?void 0:i.ok)&&((m=i.pathSceneIds)==null?void 0:m.length),s=r?i.pathSceneIds.length:0,a=r?`Hop ${dr(Ce.stepIndex,s)+1} / ${s}`:"",o=C.view==="graph"&&Ce.startSceneId,c=o?`<div class="graph-route-mode" role="group" aria-label="Route mode">${ru.map(g=>{const p=Fn===g,u=Ur[g];return`<button type="button" class="route-mode-chip ${p?"is-on":""}" data-route-mode="${Te(g)}" title="${Te(u.hint)}">${Te(u.shortLabel)}</button>`}).join("")}</div>`:"",l=r&&i.comparisonNote?`<div class="graph-route-strip__compare">${Te(i.comparisonNote)}</div>`:"";return`${r?`<div class="graph-route-strip" role="group" aria-label="Route along highlighted path">
    ${c}
    ${l}
    <span class="graph-route-strip__meta">${Te(a)} · ${i.hops} edge${i.hops===1?"":"s"} · ${Te(((_=Ur[Fn])==null?void 0:_.shortLabel)||Fn)}</span>
    <span class="graph-route-strip__nav">
      <button type="button" class="btn btn--ghost btn--sm" data-graph-action="route-start" title="Jump to route start">Start</button>
      <button type="button" class="btn btn--ghost btn--sm" data-graph-action="route-prev" ${s>1?"":"disabled"} title="Previous hop ([ when route active)">◀</button>
      <button type="button" class="btn btn--ghost btn--sm" data-graph-action="route-next" ${s>1?"":"disabled"} title="Next hop (] when route active)">▶</button>
      <button type="button" class="btn btn--ghost btn--sm" data-graph-action="route-end" title="Jump to route end">End</button>
      <button type="button" class="btn btn--ghost btn--sm" data-graph-action="route-clear" title="Clear route highlight">Clear route</button>
    </span>
  </div>`:o?`<div class="graph-route-strip graph-route-strip--mode-only" role="group" aria-label="Route mode">${c}<span class="graph-route-strip__hint">Applies when you route to a target.</span></div>`:""}<div class="graph-explore-strip" role="group" aria-label="Graph exploration">
    <button type="button" class="btn btn--ghost btn--sm" data-graph-action="frame-nbr" title="Re-frame camera on selection and its neighbors">Frame neighborhood</button>
    <span class="graph-explore-strip__nav">
      <button type="button" class="btn btn--ghost btn--sm" data-graph-action="prev" ${t&&!r?"":"disabled"} title="Previous connected room ([)">◀</button>
      <button type="button" class="btn btn--ghost btn--sm" data-graph-action="next" ${t&&!r?"":"disabled"} title="Next connected room (])">▶</button>
    </span>
    <button type="button" class="btn btn--ghost btn--sm" data-graph-action="back" title="Prior graph focus (U)">Back</button>
    <span class="graph-explore-strip__meta" aria-hidden="true">${e} link${e===1?"":"s"}</span>
  </div>`}function P0(){var n;C.view!=="graph"||!((n=C.selected)!=null&&n.id)||Y==null||Y.centerOnNodeId(C.selected.id)}function Ps(n){var a;if(C.view!=="graph"||!((a=C.selected)!=null&&a.id)||!(Y!=null&&Y.getGraphNeighbors))return;const e=C.selected.id,t=Y.getGraphNeighbors(e),i=t0(t,e,n);if(!i){fn(P_());return}if(i===e)return;const r=ar(i);if(!r||!Z||!vi(Z.roomsData,r.wing,r.room))return;Dr(Qn,Nr());const s=(Z.roomsData[r.wing]||[]).find(o=>o.name===r.room);C.currentWing=r.wing,C.currentRoom=r.room,C.selected={id:i,type:"room",name:r.room,wing:r.wing,wingId:r.wing,roomId:(s==null?void 0:s.roomId)||It(r.wing,r.room),drawers:s==null?void 0:s.drawers},C.pinned=!0,Mt(),Y==null||Y.centerOnNodeId(i),St(),_t()}function pu(){var e;const n=e0(Qn);if(!n||n.view!=="graph"||!((e=n.selected)!=null&&e.id)){fn("No prior focus in history.");return}C.selected=n.selected,C.pinned=n.pinned,C.currentWing=n.currentWing,C.currentRoom=n.currentRoom,Mt(),Y==null||Y.centerOnNodeId(n.selected.id),St(),_t()}function Go(){Ce={startSceneId:null,targetSceneId:null,result:null,stepIndex:0},Mt(),St(),_t()}function I0(n){var t,i;const e=bi(n);if(e!==Fn){if(Fn=e,A0(e),Ce.startSceneId&&Ce.targetSceneId){const r=Ce.stepIndex;kr();const s=Ce.result;s!=null&&s.ok&&((t=s.pathSceneIds)!=null&&t.length)?(Ce.stepIndex=dr(r,s.pathSceneIds.length),zs(),Y==null||Y.centerOnNodeId((i=C.selected)==null?void 0:i.id)):Ce.stepIndex=0,s&&!s.ok&&fn(s.message||"No route for this mode.")}Mt(),St()}}function D0(){const n=Ce.result;if(n&&n.ok&&Array.isArray(n.pathSceneIds)&&n.pathSceneIds.length){const e=n.pathSceneIds.length,t=dr(Ce.stepIndex,e),i=(n.bridges||[]).map(r=>a0(r)).filter(Boolean);return{active:!0,pathSceneIds:n.pathSceneIds,stepIndex:t,segmentTypes:n.segmentTypes||[],bridgeSceneIds:i}}return{active:!1,pathSceneIds:[],stepIndex:0,segmentTypes:[],bridgeSceneIds:[]}}function kr(){var s;if(!Z||C.view!=="graph"){Ce.result=null;return}const n=Ce.startSceneId,e=Ce.targetSceneId;if(!n||!e||!n.startsWith("room:")||!e.startsWith("room:")){Ce.result=null;return}const t=Jc(n),i=Jc(e);if(!t||!i){Ce.result={ok:!1,reason:"bad_scene",message:"Could not resolve route endpoints."};return}const r=hr(gi(Z.graph));Ce.result=d0({graphEdges:gi(Z.graph),roomsData:Z.roomsData||{},enabledRelTypes:Qt,availableRelTypes:r,startRoomId:t,endRoomId:i,routeMode:Fn}),Ce.result.ok&&((s=Ce.result.pathSceneIds)!=null&&s.length)?Ce.stepIndex=dr(Ce.stepIndex,Ce.result.pathSceneIds.length):Ce.stepIndex=0}function zs(){var s;const n=Ce.result;if(!(n!=null&&n.ok)||!((s=n.pathSceneIds)!=null&&s.length))return;const e=dr(Ce.stepIndex,n.pathSceneIds.length),t=n.pathSceneIds[e],i=ar(t);if(!i||!Z)return;const r=(Z.roomsData[i.wing]||[]).find(a=>a.name===i.room);C.currentWing=i.wing,C.currentRoom=i.room,C.selected={id:t,type:"room",name:i.room,wing:i.wing,wingId:i.wing,roomId:(r==null?void 0:r.roomId)||It(i.wing,i.room),drawers:r==null?void 0:r.drawers},C.pinned=!0}function U0(){var n,e;if(C.view!=="graph"||((n=C.selected)==null?void 0:n.type)!=="room"||!((e=C.selected)!=null&&e.id)){fn("Select a room in Graph view first.");return}Ce.startSceneId=C.selected.id,Ce.targetSceneId?kr():Ce.result=null,Mt(),St(),_t(),fn("Route start set — pick a target room or use search “Route”.")}function mu(n){var t,i;if(C.view!=="graph"&&$n("graph"),!n||!n.startsWith("room:")){fn("Route target must be a room.");return}if(!Ce.startSceneId){fn("Set a route start first (inspector: “Set as route start”).");return}Ce.targetSceneId=n,kr();const e=Ce.result;e&&!e.ok?fn(e.message||"No route found."):e!=null&&e.ok&&(Ce.stepIndex=0,zs(),Y==null||Y.centerOnNodeId((t=C.selected)==null?void 0:t.id),fn(`Route · ${e.hops} hop${e.hops===1?"":"s"} · ${((i=Ur[Fn])==null?void 0:i.shortLabel)||Fn}`)),Mt(),St(),_t()}function Is(n){var i,r;const e=Ce.result;if(!(e!=null&&e.ok)||!((i=e.pathSceneIds)!=null&&i.length))return;const t=e.pathSceneIds.length;Ce.stepIndex=f0(Ce.stepIndex,n,t),zs(),Mt(),Y==null||Y.centerOnNodeId((r=C.selected)==null?void 0:r.id),St(),_t()}function il(n){var i,r;const e=Ce.result;if(!(e!=null&&e.ok)||!((i=e.pathSceneIds)!=null&&i.length))return;const t=e.pathSceneIds.length;Ce.stepIndex=n==="end"?t-1:0,zs(),Mt(),Y==null||Y.centerOnNodeId((r=C.selected)==null?void 0:r.id),St(),_t()}function Te(n){return String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function N0(n){var l;if(!(n!=null&&n.ok))return"";const e=sr(n.typeCounts)||"—",t=n.bridges||[],i=t.length>0?`Bridge rooms (cross-wing connectors): ${t.map(h=>h.split("/").pop()).join(", ")}.`:"No interior cross-wing bridge hops — path is short or stays within-wing.",r=((l=Ur[n.routeMode])==null?void 0:l.label)||n.routeMode,s=n.routeMode!=="shortest"&&n.totalCost!=null?` · weighted cost ${n.totalCost}`:"",a=n.mixSummary?`${n.mixSummary} `:"",o=n.comparisonNote?` ${n.comparisonNote}`:"";return`${B_()} Mode: ${r}${s}. ${n.hops} hop(s) on visible edges. ${a}Types: ${e}. ${i}${o}`}function Ze(n){return n==null||Number.isNaN(Number(n))?"—":Number(n).toLocaleString()}function F0(n){if(!n||typeof n!="object")return null;const e=[];for(const[t,i]of Object.entries(n))t!=="error"&&(typeof i=="number"?e.push(`${t}: ${Ze(i)}`):typeof i=="string"&&e.push(`${t}: ${i}`));return e.length?e.slice(0,8).join(" · "):null}function oa(){var M,w,O,D;const n=Z==null?void 0:Z.status,e=(Z==null?void 0:Z.wingsData)||{},t=(Z==null?void 0:Z.roomsData)||{},i=Z==null?void 0:Z.graphStats,r=Z==null?void 0:Z.graph,s=(M=r==null?void 0:r.edgesResolved)!=null&&M.length?r.edgesResolved:(i==null?void 0:i.edgesResolved)||[],a=pl(r),o=gi(r),c=Z==null?void 0:Z.kgStats,l=(Z==null?void 0:Z.overviewStats)??((w=Z==null?void 0:Z.overviewBundle)==null?void 0:w.stats),h=(Z==null?void 0:Z.graphMeta)??((O=Z==null?void 0:Z.graph)==null?void 0:O.graphMeta)??(i==null?void 0:i.graphMeta)??((D=Z==null?void 0:Z.overviewBundle)==null?void 0:D.graphMeta),f=typeof(n==null?void 0:n.total_drawers)=="number"?n.total_drawers:typeof(l==null?void 0:l.totalDrawers)=="number"?l.totalDrawers:K_(e),d=typeof(l==null?void 0:l.totalWings)=="number"?l.totalWings:Object.keys(e).length,m=typeof(l==null?void 0:l.totalRooms)=="number"?l.totalRooms:ta(t);let _=0;const g=(r==null?void 0:r.summary)??(i==null?void 0:i.summary);(g==null?void 0:g.resolvedEdgeCount)!=null?_=g.resolvedEdgeCount:i!=null&&i.tunnels&&typeof i.tunnels=="object"&&(_=Object.keys(i.tunnels).length);const p=typeof(g==null?void 0:g.resolvedEdgeCount)=="number"?g.resolvedEdgeCount:s.length,u=qc(t,{edgesResolved:s,graphEdges:gi(r),graphSummary:g??null,overviewStats:l??null}),v=qc(t,{edgesResolved:a,graphEdges:o,graphSummary:null,overviewStats:null}),x=C.view==="graph"?v:u,E=F0(c),P=!!(c&&typeof c=="object"&&!c.error),T=hr(o),A=a_(a,Qt),K=zr(Qt,T)!==null;return{status:n,wingsData:e,roomsData:t,graphEdges:o,graphStats:i,edgesResolved:a,edgesExplicit:s,kgStats:c,totalDrawers:f,wingCount:d,roomCount:m,tunnelNodeCount:_,graphEdgeCount:p,ga:x,gaPalace:u,gaGraph:v,kgAvailable:P,kgSummary:E,focusWing:C.currentWing,overviewStats:l,graphMeta:h,summary:g,availableRelationshipTypes:T,visibleGraphSummary:A,graphFilterNarrowed:K}}function O0(){try{const n=localStorage.getItem(eu);return n?JSON.parse(n):null}catch{return null}}function gu(n){try{localStorage.setItem(eu,JSON.stringify({enabledTypes:[...n||[]]}))}catch{}}function B0(){const n=gi(Z==null?void 0:Z.graph),e=hr(n),t=O0(),i=t==null?void 0:c_(t);Qt=s_(i,e),gu(Qt),Y==null||Y.setRelationshipFilters(zr(Qt,e))}function z0(n){const e=hr(gi(Z==null?void 0:Z.graph));if(!(!n||!e.includes(n))){if(Qt.has(n)?Qt.delete(n):Qt.add(n),gu(Qt),Y==null||Y.setRelationshipFilters(zr(Qt,e)),Ce.startSceneId&&Ce.targetSceneId){kr();const t=Ce.result;t&&!t.ok&&fn(t.message||"No route on current visible edges — adjust filters or clear route.")}St(),bn(),wi(),Mt()}}function wi(){const n=re("graph-view-extras");if(!n)return;const e=C.view==="graph"&&!!Z&&!Z.error;if(n.hidden=!e,!e)return;const t=oa(),i=t.availableRelationshipTypes||[],r=re("graph-rel-chips");r&&(i.length?r.innerHTML=i.map(o=>{const c=Fo(o),l=Qt.has(o),h=o==="tunnel"?"#5b8cff":"#a78bfa";return`<button type="button" class="rel-chip ${l?"is-on":""}" data-rel-type="${Te(o)}" title="${Te(c.description)}">
          <span class="rel-chip__swatch" style="background:${h}"></span>
          <span>${Te(c.shortLabel)}</span>
        </button>`}).join(""):r.innerHTML='<span class="inspect-muted">No relationship-typed edges in the current graph payload.</span>');const s=re("graph-status-pill");if(s){const o=t.graphFilterNarrowed,c=t.visibleGraphSummary,l=l_(t.graphMeta,t.summary),h=k_({resolvedFormatted:Ze(t.graphEdgeCount),resolvedCount:t.graphEdgeCount,visibleFormatted:Ze(c.visibleEdgeCount),visibleCount:c.visibleEdgeCount,graphFilterNarrowed:o});s.innerHTML=`<span class="graph-status-pill__primary">${Te(h)}</span>${l?`<span class="graph-status-pill__hint">${Te(l.length>240?`${l.slice(0,240)}…`:l)}</span>`:""}`}const a=re("graph-legend-compact");a&&(a.innerHTML=i.length?i.map(o=>{const c=Fo(o);return`<div class="graph-legend-compact__row"><span class="legend-swatch" style="background:${o==="tunnel"?"#5b8cff":"#a78bfa"}"></span><span><strong>${Te(c.shortLabel)}</strong> — ${Te(c.description)}</span></div>`}).join(""):"")}function en(n,e,t){const i=e&&String(e).trim()?e:`<p class="inspect-empty">${Te("No data.")}</p>`;return`
    <section class="inspect-section">
      <h3 class="inspect-section__title">${Te(n)}</h3>
      <div class="inspect-section__body">${i}</div>
    </section>`}function _u(n){return n==null||Number.isNaN(Number(n))?"":`<div class="inspect-bar" aria-hidden="true"><div class="inspect-bar__fill" style="width:${Math.min(100,Math.max(0,Number(n)))}%"></div></div>`}function Un(n,e,t){return`<button type="button" class="inspect-row inspect-row--action"${Object.entries(t||{}).map(([s,a])=>` data-${s}="${Te(String(a))}"`).join("")}>
    <span class="inspect-row__main">${Te(n)}</span>
    <span class="inspect-row__meta">${Te(e)}</span>
  </button>`}function k0(n){var f,d,m,_;const e=Q_(n,C.view),t=e.ga.byRelationshipType&&Object.keys(e.ga.byRelationshipType).length?Object.entries(e.ga.byRelationshipType).map(([g,p])=>`${g}: ${Ze(p)}`).join(" · "):"",i=(d=(f=n.graphMeta)==null?void 0:f.truncatedSources)!=null&&d.length?n.graphMeta.truncatedSources.map(g=>{const p=g.totalMatching!=null&&g.totalMatching!==""?Ze(g.totalMatching):"unknown",u=g.inferred?" (heuristic)":"";return`${g.source} limit ${Ze(g.limit)} · ${p} rows reported${u}`}).join("; "):"",r=(((m=n.graphMeta)==null?void 0:m.completenessNotes)||[]).filter(Boolean).join(" "),s=e.kgAvailable?e.kgSummary||"—":G_(),a=e.largestWingsByDrawers.map(g=>Un(g.wing,`${Ze(g.drawers)} drawers · #${g.rank}`,{"inspect-action":"go-wing",wing:g.wing})).join(""),o=e.mostConnectedRooms.length?e.mostConnectedRooms.map(g=>Un(`${g.room}`,`${g.wing} · degree ${g.degree}`,{"inspect-action":"select-room",wing:g.wing,room:g.room})).join(""):"",c=e.mostCrossLinkedWings.length?e.mostCrossLinkedWings.map(g=>Un(g.wing,`${Ze(g.crossEdges)} cross-wing edges`,{"inspect-action":"go-wing",wing:g.wing})).join(""):"",l=[`Palace scale: ${Ze(e.totalDrawers)} drawers across ${Ze(e.wingCount)} wings and ${Ze(e.roomCount)} rooms.`,e.tunnelNodeCount?`Graph summary: ${Ze(e.graphEdgeCount)} resolved undirected edges (all relationship types).`:"No graph edges in graph-stats.",e.graphBlurb].filter(Boolean).join(" "),h=C.view==="graph"&&((_=n.ga)!=null&&_.hasResolvableEdges)&&n.graphFilterNarrowed?`<div class="inspect-card inspect-card--hint" role="status"><strong>Graph filters active</strong><p class="inspect-muted inspect-muted--tight">Visible: ${Ze(n.visibleGraphSummary.visibleEdgeCount)} edges (${sr(n.visibleGraphSummary.visibleByType)||"—"}). Inspector “visible” rows match the scene. Footer and resolved totals above remain global.</p></div>`:"";return`
    <div class="inspect-stack">
      <div class="inspect-card inspect-card--hero">
        <span class="badge">Overview</span>
        <p class="inspect-lead">${Te(e.viewHint)}</p>
        <p class="inspect-muted">${Te(l)}</p>
      </div>
      ${C0(n)}
      ${h}
      ${en("Palace summary",`
        <div class="meta-block">
          ${ht("Total drawers",Ze(e.totalDrawers))}
          ${ht("Wings",Ze(e.wingCount))}
          ${ht("Rooms (taxonomy)",Ze(e.roomCount))}
          ${ht("Resolved graph edges",Ze(e.graphEdgeCount))}
          ${ht("Edge types",t||"—")}
          ${ht("Cross-wing (tunnels)",e.ga.hasResolvableEdges?Ze(e.crossWingEdges):"—")}
          ${ht("Rooms with no graph links",e.ga.hasResolvableEdges?Ze(e.roomsWithNoTunnels):"—")}
          ${ht("Upstream truncation",i||"none")}
        </div>
        ${r?`<p class="inspect-muted inspect-muted--tight">${Te(r)}</p>`:""}
        <p class="inspect-muted inspect-muted--tight">${Te(s)}</p>
        `)}
      ${en("Largest wings",`<div class="inspect-rows">${a||'<p class="inspect-empty">No wing counts available.</p>'}</div>`)}
      ${en("Most connected rooms",o||'<p class="inspect-empty">No resolvable tunnel edges, or graph endpoints do not match room names.</p>')}
      ${en("Most cross-linked wings",c||'<p class="inspect-empty">No cross-wing tunnel edges resolved.</p>')}
      <div class="inspect-card inspect-card--hint">
        <strong>How to explore</strong>
        <p class="inspect-muted inspect-muted--tight">Use <kbd>1</kbd>–<kbd>3</kbd> to switch views. Click wings and rooms to drill in; Pin keeps the inspector fixed. Search dims non-matching nodes.</p>
      </div>
    </div>`}function G0(n,e,t){var de;const{wingsData:i,roomsData:r,totalDrawers:s,ga:a,graphEdges:o}=n,c=Number(i[e])||0,l=r[e]||[],h=l.length,f=na(i),d=f.find(k=>k.wing===e),m=Z_(r),_=m.find(k=>k.wing===e),g=Cs(c,s),p=ta(r),u=Cs(h,p),v=iu(r,e),x=v>0?v:c,E=h?(x/h).toFixed(1):null,P=ia(r,e),T=P[0],A=P.length>1?P[P.length-1]:null,K=[g!=null&&d?`This wing holds ${g}% of all drawers and is the ${qn(d.rank)} largest wing by drawer count.`:null,u!=null&&_&&h?`It ranks ${qn(_.rank)} among wings by room count (${u}% of all rooms).`:null].filter(Boolean).join(" "),M=q_(e,o,r,n.edgesExplicit),w=n.edgesResolved||[],O=Bs(w,Qt),D=Kc(e,w),$=Kc(e,O),L=(()=>{if(!n.graphFilterNarrowed||!a.hasResolvableEdges)return"";const k=D.byType.tunnel||0,te=$.byType.tunnel||0;return te>0&&k>0&&te<k*.5?"With current filters, some cross-wing tunnel links in this wing are hidden.":$.crossWingTouches===0&&M.crossWingTouches>0?"Cross-wing tunnel links are hidden by filters.":""})(),z=M.crossWingTouches>0?`
      ${ht("Cross-wing tunnel touches",Ze(M.crossWingTouches))}
      <div class="inspect-rows">
        ${M.topExternalWings.map(k=>Un(k.wing,`${Ze(k.edges)} edges`,{"inspect-action":"go-wing",wing:k.wing})).join("")}
      </div>`:"",q=M.topRoomsByCrossWing.map(k=>Un(k.room,`cross-wing ${Ze(k.crossEdges)}`,{"inspect-action":"select-room",wing:k.wing,room:k.room})).join(""),X=P.slice(0,5).map(k=>Un(k.name,`${Ze(k.drawers)} drawers`,{"inspect-action":"select-room",wing:e,room:k.name})),ee=[...l].map(k=>{const te=k.roomId||It(e,k.name),se=a.degreeByKey.get(te)??0;return{...k,deg:se}}).sort((k,te)=>te.deg-k.deg).slice(0,5),J=ee.length?ee.map(k=>Un(k.name,`degree ${k.deg}`,{"inspect-action":"select-room",wing:e,room:k.name})).join(""):"",ne=h===0?'<p class="inspect-empty">This wing has no room-level drawer breakdown in taxonomy.</p>':`
      ${ht("Rooms listed",Ze(h))}
      ${ht("Drawers (wing total)",Ze(c))}
      ${E!=null?ht("Avg drawers / room",E):""}
      ${T?ht("Largest room",`${T.name} (${Ze(T.drawers)})`):""}
      ${A&&A.name!==(T==null?void 0:T.name)?ht("Smallest room",`${A.name} (${Ze(A.drawers)})`):""}
    `;return`
    <div class="inspect-stack">
      ${C.view==="graph"?'<p class="inspect-muted inspect-muted--tight">Graph view: node positions are layout-only; drawer ranks use taxonomy and wings API.</p>':""}
      <div class="inspect-card inspect-card--hero">
        <span class="badge">Wing</span>
        <div class="inspect-title">${Te(e)}</div>
        <p class="inspect-lead">${Te(K||"Wing footprint in the palace.")}</p>
        ${g!=null?`<div class="inspect-pct"><span>${g}% of palace drawers</span>${_u(g)}</div>`:""}
      </div>
      ${en("Summary",`
        <div class="meta-block">
          ${ht("Drawer count",Ze(c))}
          ${ht("Rank by drawers",d?`${qn(d.rank)} of ${f.length}`:"—")}
          ${ht("Rooms",Ze(h))}
          ${ht("Rank by room count",_?`${qn(_.rank)} of ${m.length}`:"—")}
        </div>`)}
      ${en("Structure",`<div class="meta-block">${ne}</div>`)}
      ${en("Connections",a.hasResolvableEdges?`<div class="meta-block">
          ${ht("Edge types (global)",sr(D.byType)||"—")}
          ${n.graphFilterNarrowed?ht("Edge types (visible)",sr($.byType)||"—"):""}
          ${n.graphFilterNarrowed?ht("Cross-wing touches (visible)",Ze($.crossWingTouches)):""}
        </div>
        ${L?`<p class="inspect-muted inspect-muted--tight">${Te(L)}</p>`:""}
        ${z||'<p class="inspect-empty">No cross-wing tunnel relationships touch this wing.</p>'}
             ${q?`<p class="inspect-micro">Rooms with cross-wing links (global)</p><div class="inspect-rows">${q}</div>`:""}`:'<p class="inspect-empty">No tunnel relationships could be resolved against taxonomy rooms.</p>')}
      ${en("Related rooms",`<p class="inspect-micro">Largest by drawers</p><div class="inspect-rows">${X.join("")}</div>
         ${J?`<p class="inspect-micro">Most connected (tunnels)</p><div class="inspect-rows">${J}</div>`:'<p class="inspect-empty">No graph degree for rooms in this wing.</p>'}`)}
      ${en("Health / graph insight",`<p class="inspect-muted">${Te(((de=a.topCrossLinkedWings[0])==null?void 0:de.wing)===e?"This wing is among the most cross-linked in the tunnel graph.":M.crossWingTouches>0?"Participates in cross-wing tunnels; see Connections for peers.":h>0?"No cross-wing tunnel edges touch this wing in the current graph.":"Add taxonomy rooms to compare structure.")}</p>`)}
    </div>`}function H0(n,e,t,i){var te;const{wingsData:r,roomsData:s,totalDrawers:a,ga:o}=n,c=s[e]||[],l=c.find(se=>se.name===t),h=l?Number(l.drawers)||0:null,f=Number(r[e])||0,d=iu(s,e),m=d>0?d:f,_=ia(s,e),g=_.find(se=>se.name===t),p=h!=null&&m>0?Cs(h,m):null,u=h!=null&&a>0?Cs(h,a):null,v=[g&&p!=null?`This room is the ${qn(g.rank)} largest in “${e}” by drawers and holds about ${p}% of that wing’s drawers (by room list).`:null,u!=null?`It is ${u}% of the entire palace by drawers.`:null].filter(Boolean).join(" "),x=It(e,t),E=j_(x,o),P=o.hasResolvableEdges,T=n.edgesResolved||[],A=Bs(T,Qt),K=Yc(x,T),M=Yc(x,A),w=u_(M.byType,K.byType),O=J_({drawers:h??0,wingRoomSum:m,palaceTotal:a},E,P),D=m>0&&c.length?m/c.length:null,$=h!=null&&D!=null?h>=D*1.1?"Above wing average size":h<=D*.9?"Below wing average size":"Near wing average size":"—",L=((E==null?void 0:E.relatedRooms)||[]).filter(se=>!(se.wing===e&&se.room===t)).slice(0,6),z=L.length?L.map(se=>Un(`${se.room}`,`${se.wing} · deg ${se.degree}`,{"inspect-action":"select-room",wing:se.wing,room:se.room})).join(""):"",q=((E==null?void 0:E.relatedWings)||[]).filter(se=>se.wing!==e).slice(0,6).map(se=>Un(se.wing,`${Ze(se.links)} tunnel link${se.links===1?"":"s"}`,{"inspect-action":"go-wing",wing:se.wing})).join(""),X=E&&E.isBridge?"Acts as a bridge: at least one cross-wing tunnel edge is incident to this room.":"No bridge pattern detected (no cross-wing edges on this room).",ee=C.view==="graph"?'<p class="inspect-muted inspect-muted--tight">Graph view: layout is force-directed; tunnel metrics match the same resolved edges as Rooms/Wings.</p>':"",J=`room:${e}:${t}`,ne=Ce.startSceneId?ar(Ce.startSceneId):null,ce=ne?`${ne.room} · ${ne.wing}`:"—",de=P&&Ce.startSceneId&&Ce.startSceneId!==J,k=C.view==="graph"&&P?en("Route",`<div class="meta-block">
            ${ht("Route start",Te(ce))}
            ${ht("Route target",Ce.targetSceneId?Te((()=>{const se=ar(Ce.targetSceneId);return se?`${se.room} · ${se.wing}`:Ce.targetSceneId})()):"—")}
          </div>
          <div class="btn-row" style="margin-top:8px;flex-wrap:wrap;gap:6px">
            <button type="button" class="btn btn--ghost btn--sm" data-route-action="set-start">Set as route start</button>
            <button type="button" class="btn btn--ghost btn--sm" data-route-action="route-here" data-wing="${Te(e)}" data-room="${Te(t)}" ${de?"":"disabled"} title="Compute route along visible edges (current mode)">Route to here</button>
            <button type="button" class="btn btn--ghost btn--sm" data-route-action="clear-route" ${Ce.startSceneId||Ce.targetSceneId?"":"disabled"}>Clear route</button>
          </div>
          ${(te=Ce.result)!=null&&te.ok?`<p class="inspect-muted inspect-muted--tight" role="status">${Te(N0(Ce.result))}</p>`:""}
          ${Ce.result&&!Ce.result.ok?`<div class="route-fail-guidance" role="status">
            <p class="inspect-muted inspect-muted--tight">${Te(Ce.result.message||"")}</p>
            ${L_(String(Ce.result.reason||""),{graphFilterNarrowed:Ce.result.graphFilterNarrowed??n.graphFilterNarrowed}).map(se=>`<p class="inspect-muted inspect-muted--tight inspect-guidance-line">${Te(se)}</p>`).join("")}
          </div>`:""}`):"";return`
    <div class="inspect-stack">
      ${ee}
      ${k}
      <div class="inspect-card inspect-card--hero">
        <span class="badge">Room</span>
        <div class="inspect-title">${Te(t)}</div>
        <p class="inspect-lead">${Te(v||"Room in the palace taxonomy.")}</p>
        ${p!=null?`<div class="inspect-pct"><span>${p}% of wing drawers (room list)</span>${_u(p)}</div>`:""}
      </div>
      ${en("Summary",`
        <div class="meta-block">
          ${ht("Parent wing",Te(e))}
          ${ht("Drawers",h!=null?Ze(h):"—")}
          ${ht("Share of palace",u!=null?`${u}%`:"—")}
        </div>`)}
      ${en("Position in wing",c.length?`
        <div class="meta-block">
          ${ht("Rank in wing (by drawers)",g?`${qn(g.rank)} of ${_.length}`:"—")}
          ${ht("Wing avg drawers / room",D!=null?D.toFixed(1):"—")}
          ${ht("vs average",$)}
        </div>`:'<p class="inspect-empty">This wing has no room-level drawer breakdown.</p>')}
      ${en("Connections",P&&E?`
        <div class="meta-block">
          ${ht(n.graphFilterNarrowed?"Degree (visible)":"Degree (global)",Ze(M.degree))}
          ${n.graphFilterNarrowed?ht("Degree (global)",Ze(K.degree)):""}
          ${ht(n.graphFilterNarrowed?"Cross-wing (visible)":"Cross-wing links",Ze(M.crossWingLinks))}
          ${n.graphFilterNarrowed?ht("Cross-wing (global)",Ze(K.crossWingLinks)):""}
          ${ht(n.graphFilterNarrowed?"Intra-wing (visible)":"Intra-wing links",Ze(M.intraWingLinks))}
          ${n.graphFilterNarrowed?ht("Intra-wing (global)",Ze(K.intraWingLinks)):""}
          ${ht("Relationship mix (global)",sr(K.byType)||"—")}
          ${n.graphFilterNarrowed?ht("Relationship mix (visible)",sr(M.byType)||"—"):""}
          ${ht("Median degree (all rooms)",E.medianDegree!=null?Ze(E.medianDegree):"—")}
        </div>
        ${w?`<p class="inspect-muted inspect-muted--tight">${Te(w)}</p>`:""}
        <p class="inspect-muted inspect-muted--tight">${Te(X)}</p>
        ${z?`<p class="inspect-micro">Related rooms (global graph)</p><div class="inspect-rows">${z}</div>`:`<p class="inspect-empty">No tunnel neighbors found for this room.</p>${P?`<p class="inspect-muted inspect-muted--tight">${Te(O_())}</p>`:""}`}
        ${q?`<p class="inspect-micro">Related wings (global graph)</p><div class="inspect-rows">${q}</div>`:""}
        `:`<p class="inspect-empty">${Te(H_())}</p>`)}
      ${en("Insight",`<p class="insight-chip">${Te(O.label)}</p><p class="inspect-muted inspect-muted--tight">${Te(O.detail)}</p>`)}
    </div>`}function W0(n){const e=n.target.closest("[data-route-mode]");if(e){const c=e.getAttribute("data-route-mode");c&&I0(c);return}const t=n.target.closest("[data-route-action]");if(t){const c=t.getAttribute("data-route-action");if(c==="set-start")U0();else if(c==="route-here"){const l=t.getAttribute("data-wing"),h=t.getAttribute("data-room");l&&h&&mu(`room:${l}:${h}`)}else c==="clear-route"&&Go();return}const i=n.target.closest("[data-graph-action]");if(i){const c=i.getAttribute("data-graph-action");c==="frame-nbr"?P0():c==="next"?Ps(1):c==="prev"?Ps(-1):c==="back"?pu():c==="route-start"?il("start"):c==="route-end"?il("end"):c==="route-prev"?Is(-1):c==="route-next"?Is(1):c==="route-clear"&&Go();return}const r=n.target.closest("[data-inspect-action]");if(!r)return;const s=r.getAttribute("data-inspect-action"),a=r.getAttribute("data-wing"),o=r.getAttribute("data-room");if(s==="go-wing"&&a){xu(a);return}s==="select-room"&&a&&o&&V0(a,o)}function V0(n,e){var s,a;if(Gr(),!Z||!_i(Z.wingsData,n)||!vi(Z.roomsData,n,e))return;const t=Z.roomsData[n],i=Array.isArray(t)?t.find(o=>o.name===e):null,r=`room:${n}:${e}`;if(C.view==="graph"){(s=C.selected)!=null&&s.id&&C.selected.id!==r&&Dr(Qn,Nr()),C.currentWing=n,C.currentRoom=e,C.selected={id:r,type:"room",name:e,wing:n,wingId:n,roomId:(i==null?void 0:i.roomId)||It(n,e),drawers:i==null?void 0:i.drawers},C.pinned=!0,Mt(),Y==null||Y.centerOnNodeId(r),bn(),St(),_t();return}C.currentWing=n,C.currentRoom=e,C.selected={id:r,type:"room",name:e,wing:n,wingId:n,roomId:(i==null?void 0:i.roomId)||It(n,e),drawers:i==null?void 0:i.drawers},C.pinned=!1,C.view="rooms",Y==null||Y.setView("rooms",n),Mt(),Y==null||Y.centerOnNodeId(r),fr(),re("view-helper-text").textContent=((a=ti.find(o=>o.id==="rooms"))==null?void 0:a.hint)||"",wi(),bn(),St(),_t()}function $0(n){if(!n||n.type==="center"||!n.id)return null;const e=n.wingId??n.wing,t=n.roomId??(n.type==="room"&&e&&n.name!=null?It(e,n.name):null);return{id:n.id,type:n.type,name:n.name,wing:e,wingId:e,roomId:t,drawers:n.drawers}}function X0(){try{const n=localStorage.getItem(sa);return n?JSON.parse(n):null}catch{return null}}function _t(){clearTimeout(el),el=setTimeout(()=>{var n,e,t;try{const i={view:C.view,currentWing:C.currentWing,currentRoom:C.currentRoom,selected:C.selected,pinned:C.pinned,searchQuery:C.searchQuery,labels:((n=re("toggle-labels"))==null?void 0:n.checked)??!0,rotate:((e=re("toggle-rotate"))==null?void 0:e.checked)??!0,motion:Number(((t=re("motion-range"))==null?void 0:t.value)??1)};localStorage.setItem(sa,JSON.stringify(i))}catch{}},200)}function rl(){Z&&M0(C,Z)}function j0(n){n&&(n.labels!==void 0&&re("toggle-labels")&&(re("toggle-labels").checked=!!n.labels),n.rotate!==void 0&&re("toggle-rotate")&&(re("toggle-rotate").checked=!!n.rotate),n.motion!==void 0&&re("motion-range")&&(re("motion-range").value=String(n.motion)),n.searchQuery!==void 0&&re("search-wings")&&(re("search-wings").value=n.searchQuery))}function q0(n){if(n==null)return;const e=y0(n);C.view=e.view,C.currentWing=e.currentWing,C.currentRoom=e.currentRoom,C.selected=e.selected,C.pinned=e.pinned,C.searchQuery=e.searchQuery}function Mt(){var n;Y==null||Y.updatePresentation({searchQuery:C.searchQuery,selectedId:((n=C.selected)==null?void 0:n.id)??null,pinActive:C.pinned,route:D0()})}function vs(n,e){const t=re("conn-status");t&&(t.dataset.state=n,t.textContent=e)}function ys(n){var e;(e=re("loading-overlay"))==null||e.classList.toggle("is-hidden",!n)}function Y0(n,e){var i;ys(!0);const t=re("loading-overlay");t&&(t.innerHTML=`
    <div class="err-box">
      <strong>Unable to load data</strong>
      <p>${Te(n)}</p>
      ${`<code>${Te(e)}</code>`}
      <p style="margin-top:10px;color:#94a3b8;font-size:0.76rem;">Start the API bridge from the project folder:</p>
      <code style="margin-top:4px;">node server.js</code>
      <div class="btn-row">
        <button type="button" class="btn btn--ghost" id="err-retry">Retry</button>
      </div>
    </div>
  `,(i=re("err-retry"))==null||i.addEventListener("click",()=>la(!1)))}function Ho(n,e){const t=re("metric-context"),i=re("metric-context-wrap");if(!(!t||!i)){if(!n||!e){i.hidden=!0,t.textContent="";return}if(i.hidden=!1,n.type==="wing"){const r=na(e.wingsData).find(s=>s.wing===n.name);t.textContent=r?`Selected wing · ${qn(r.rank)} by drawers`:"Selected wing";return}if(n.type==="room"){const r=ia(e.roomsData,n.wing).find(s=>s.name===n.name);t.textContent=r?`Selected room · ${qn(r.rank)} in ${n.wing}`:"Selected room"}}}function bn(){Z==null||Z.status;const n=Z==null?void 0:Z.graphStats,e=Z==null?void 0:Z.graph,t=(e==null?void 0:e.summary)??(n==null?void 0:n.summary),i=Z==null?void 0:Z.kgStats,r=oa(),{wingsData:s,roomsData:a,totalDrawers:o,gaPalace:c,overviewStats:l}=r,h=c;re("metric-drawers").textContent=Ze(o??0),re("metric-wings").textContent=Ze(typeof(l==null?void 0:l.totalWings)=="number"?l.totalWings:Object.keys(s).length),re("metric-rooms").textContent=Ze(typeof(l==null?void 0:l.totalRooms)=="number"?l.totalRooms:ta(a));let f=0;typeof(t==null?void 0:t.resolvedEdgeCount)=="number"?f=t.resolvedEdgeCount:n!=null&&n.tunnels&&typeof n.tunnels=="object"&&(f=Object.keys(n.tunnels).length),re("metric-tunnels").textContent=f?Ze(f):"—";const d=re("metric-cross");d&&(d.textContent=h.hasResolvableEdges?Ze(h.crossWingEdgeCount):"—");const m=re("metric-footnote");if(m){const _=h.topCrossLinkedWings[0],g=h.topConnectedRooms[0];let p="";h.hasResolvableEdges&&_&&g?p=`Most cross-linked wing: ${_.wing} · Most connected room: ${g.room} (${g.wing})`:h.hasResolvableEdges&&_?p=`Most cross-linked wing: ${_.wing}`:p="Tunnel graph: resolve endpoints to see cross-wing stats.",C.view==="graph"&&(p=`${z_()} · ${p}`),C.view==="graph"&&r.graphFilterNarrowed&&(p=`Visible ${Ze(r.visibleGraphSummary.visibleEdgeCount)} edges · ${p}`),m.textContent=p}if(i&&typeof i=="object"&&!i.error){const _=[];for(const[g,p]of Object.entries(i))g!=="error"&&(typeof p=="number"?_.push(`${g}: ${Ze(p)}`):typeof p=="string"&&_.push(`${g}: ${p}`));re("metric-kg").textContent=_.length?_.slice(0,8).join(" · "):"—"}else re("metric-kg").textContent="—";Ho(C.selected,r)}function K0(n,e){return e.trim()?n.toLowerCase().includes(e.trim().toLowerCase()):!0}function Z0(){if(!(Z!=null&&Z.roomsData)||!(Z!=null&&Z.wingsData)){ko=[];return}ko=S0(Z.roomsData,Z.wingsData)}function J0(){return hu(C.searchQuery)}function aa(){const n=J0();n!==Ls&&(Ls=n,Cr=!1,Jt=0),Ut=w0(ko,C.searchQuery),Jt>=Ut.length&&(Jt=Math.max(0,Ut.length-1)),cr()}function cr(){const n=re("graph-search-panel"),e=re("graph-search-meta"),t=re("graph-search-list"),i=re("graph-search-empty"),r=re("graph-search-nav");if(!n||!e||!t)return;if(!C.searchQuery.trim()){n.hidden=!0;return}n.hidden=!1;const a=Ut.length,o=a>1;if(r&&(r.hidden=!o),!a){i.hidden=!1,t.innerHTML="",e.textContent="No matches";return}i.hidden=!0;const c=Math.min(Jt,a-1),l=a>12?` · ${a} total`:"";e.textContent=`Result ${c+1} of ${a}${l}`;const h=12;let f=0;a>h&&(f=Math.min(Math.max(0,c-5),Math.max(0,a-h)));const d=Ut.slice(f,f+h);t.innerHTML=d.map((m,_)=>{const g=f+_,p=g===c,u=m.kind==="room"?`<button type="button" class="btn btn--ghost btn--sm graph-search-hit__route" data-graph-route-to="${g}" title="Use as route target (needs route start)">Route</button>`:"";return`<li class="graph-search-hit-row">
        <button type="button" class="graph-search-hit ${p?"is-active":""}" data-graph-hit-ix="${g}" role="option" aria-selected="${p?"true":"false"}">
          <span class="graph-search-hit__label">${Te(m.label)}</span>
          <span class="graph-search-hit__sub">${Te(m.sublabel)}</span>
        </button>
        ${u}
      </li>`}).join(""),a>h&&t.insertAdjacentHTML("beforeend",`<li class="graph-search-more"><span class="inspect-muted">Scroll list with ↑↓ · Alt+N / Alt+P for all ${a} matches</span></li>`)}function vu(){const n=re("graph-search-first-hint");if(!n)return;const e=C.view==="graph"&&!sessionStorage.getItem("mempalace-graph-search-hint")&&!!Z&&!Z.error;n.hidden=!e}function Ds(){sessionStorage.setItem("mempalace-graph-search-hint","1");const n=re("graph-search-first-hint");n&&(n.hidden=!0)}function Q0(){C.searchQuery="";const n=re("search-wings");n&&(n.value=""),Ut=[],Jt=0,Cr=!1,Ls="",Mt(),ca(),cr(),_t()}function Wo(n){var s,a;if(Gr(),!Z||!n)return;const e=!Cr;if(n.startsWith("wing:")){const o=n.slice(5);if(!_i(Z.wingsData,o))return;C.view!=="graph"&&$n("graph"),C.view==="graph"&&Zc((s=C.selected)==null?void 0:s.id,n,e)&&Dr(Qn,Nr()),Cr=!0,C.currentWing=o,C.currentRoom=null,C.selected={id:n,type:"wing",name:o,wing:o,wingId:o,drawers:Z.wingsData[o]},C.pinned=!0,Mt(),Y==null||Y.centerOnNodeId(n),Y==null||Y.pulseNodeEmphasis(n),bn(),St(),cr(),_t(),Ds();return}const t=ar(n);if(!t||!vi(Z.roomsData,t.wing,t.room))return;const i=Z.roomsData[t.wing],r=Array.isArray(i)?i.find(o=>o.name===t.room):null;C.view!=="graph"&&$n("graph"),C.view==="graph"&&Zc((a=C.selected)==null?void 0:a.id,n,e)&&Dr(Qn,Nr()),Cr=!0,C.currentWing=t.wing,C.currentRoom=t.room,C.selected={id:n,type:"room",name:t.room,wing:t.wing,wingId:t.wing,roomId:(r==null?void 0:r.roomId)||It(t.wing,t.room),drawers:r==null?void 0:r.drawers},C.pinned=!0,Mt(),Y==null||Y.centerOnNodeId(n),Y==null||Y.pulseNodeEmphasis(n),bn(),St(),cr(),_t(),Ds()}function sl(n){Ut.length<2||(Jt=zo(Jt,Ut.length,n),Wo(Ut[Jt].sceneId))}function ev(){var n;Ds(),(n=re("search-wings"))==null||n.focus()}function ca(){const n=re("legend-host");if(!n)return;const e=Z==null?void 0:Z.status,t=e!=null&&e.wings&&typeof e.wings=="object"?e.wings:(Z==null?void 0:Z.wingsData)||{},i=Object.entries(t);if(!i.length){n.innerHTML='<div class="empty-state" style="padding:8px;">No wing data yet.</div>';return}n.innerHTML=i.map(([r,s])=>{const a=Bo(r),o=K0(`${r} ${s}`,C.searchQuery);return`
      <div class="legend-item" data-wing="${Te(r)}" style="${o?"":"display:none"}">
        <span class="legend-color" style="background:${a}"></span>
        <span>${Te(r)} · ${Ze(s)} drawers</span>
      </div>`}).join("")}function tv(n){const e=n.querySelector(".breadcrumb-nav");if(!e)return;const t=[...e.querySelectorAll(".crumb")];if(!t.length)return;t.forEach((r,s)=>{r.setAttribute("aria-posinset",String(s+1)),r.setAttribute("aria-setsize",String(t.length)),r.tabIndex=s===0?0:-1});const i=e._bcKey;i&&e.removeEventListener("keydown",i),e._bcKey=r=>{const s=t.indexOf(document.activeElement);if(!(s<0)){if(r.key==="ArrowRight"||r.key==="ArrowDown"){r.preventDefault();const a=(s+1)%t.length;t.forEach((o,c)=>{o.tabIndex=c===a?0:-1}),t[a].focus()}else if(r.key==="ArrowLeft"||r.key==="ArrowUp"){r.preventDefault();const a=(s-1+t.length)%t.length;t.forEach((o,c)=>{o.tabIndex=c===a?0:-1}),t[a].focus()}else if(r.key==="Home")r.preventDefault(),t.forEach((a,o)=>{a.tabIndex=o===0?0:-1}),t[0].focus();else if(r.key==="End"){r.preventDefault();const a=t.length-1;t.forEach((o,c)=>{o.tabIndex=c===a?0:-1}),t[a].focus()}}},e.addEventListener("keydown",e._bcKey)}function nv(){var t,i,r;const n=re("breadcrumb");if(!n)return;const e=['<button type="button" class="crumb" data-crumb="root">All wings</button>'];C.currentWing&&(e.push('<span class="crumb-sep" aria-hidden="true">›</span>'),e.push(`<button type="button" class="crumb" data-crumb="wing" data-wing="${Te(C.currentWing)}">${Te(C.currentWing)}</button>`)),C.currentRoom&&C.currentWing&&(e.push('<span class="crumb-sep" aria-hidden="true">›</span>'),e.push(`<button type="button" class="crumb" data-crumb="room" data-wing="${Te(C.currentWing)}" data-room="${Te(C.currentRoom)}">${Te(C.currentRoom)}</button>`)),n.innerHTML=`<nav class="breadcrumb-nav" aria-label="Palace location">${e.join("")}</nav>`,(t=n.querySelector('[data-crumb="root"]'))==null||t.addEventListener("click",()=>iv()),(i=n.querySelector('[data-crumb="wing"]'))==null||i.addEventListener("click",s=>{const a=s.currentTarget.getAttribute("data-wing");a&&xu(a)}),(r=n.querySelector('[data-crumb="room"]'))==null||r.addEventListener("click",s=>{const a=s.currentTarget.getAttribute("data-room"),o=s.currentTarget.getAttribute("data-wing");if(a&&o&&C.currentWing===o&&C.currentRoom===a){const c=`room:${o}:${a}`;Y==null||Y.centerOnNodeId(c)}}),tv(n)}function iv(){var n;Gr(),Qn.length=0,C.view="wings",C.currentWing=null,C.currentRoom=null,C.selected=null,C.pinned=!1,Y==null||Y.setView("wings",null),Mt(),fr(),re("view-helper-text").textContent=((n=ti.find(e=>e.id==="wings"))==null?void 0:n.hint)||"",wi(),bn(),St(),_t()}function xu(n){var e;Gr(),!(!Z||!_i(Z.wingsData,n))&&(C.currentWing=n,C.currentRoom=null,C.view="rooms",C.selected=null,C.pinned=!1,Y==null||Y.setView("rooms",n),Mt(),fr(),re("view-helper-text").textContent=((e=ti.find(t=>t.id==="rooms"))==null?void 0:e.hint)||"",wi(),bn(),St(),_t())}function rv(){return C.pinned&&C.selected?C.view==="graph"?"graphFocus":"pinned":C.selected?"selected":C.hovered?"live":"empty"}function ol(){const n=re("btn-pin");n&&(n.textContent=C.pinned?"Unpin":"Pin",n.disabled=!C.selected)}function St(){const n=re("inspect-body"),e=rv(),t=re("inspect-mode-badge");if(t){const c={empty:"Nothing selected",live:"Live preview",selected:"Selected",pinned:"Pinned",graphFocus:"Graph focus"};t.textContent=c[e],t.dataset.mode=e}let i=null;e==="pinned"||e==="selected"?i=C.selected:e==="live"&&(i=C.hovered),nv();const r=oa(),s=R0(r);if(!i||i.type==="center"){e==="empty"?n.innerHTML=Eo()+s+k0(r):n.innerHTML=Eo()+s+`
        <div class="empty-state">
          <strong>Hover a node</strong>
          <p>Move the pointer over the scene for a quick preview, or select a wing or room.</p>
        </div>`,Ho(null,r),ol();return}const a=i,o=Eo();a.type==="wing"?n.innerHTML=o+s+G0(r,a.name):a.type==="room"?n.innerHTML=o+s+H0(r,a.wing,a.name):n.innerHTML=o+s+'<div class="inspect-card"><p class="inspect-muted">Unknown node type.</p></div>',Ho(a,r),ol()}function ht(n,e){return`<div class="meta-row"><span class="meta-k">${Te(n)}</span><span class="meta-v">${e}</span></div>`}function al(n,e,t){const i=re("hover-card");if(!i)return;if(!t){i.classList.remove("is-visible");return}const r=16,s=i.offsetWidth||240,a=i.offsetHeight||80;let o=n+r,c=e+r;o+s>window.innerWidth-8&&(o=n-s-r),c+a>window.innerHeight-8&&(c=window.innerHeight-a-8),i.style.left=`${Math.max(8,o)}px`,i.style.top=`${Math.max(8,c)}px`,i.classList.add("is-visible")}function cl(n){const e=re("hover-card");if(!e)return;if(!n||n.type==="center"){e.classList.remove("is-visible");return}const t=n.name||n.label||"Node";let i="";n.type==="wing"?i=`Wing · ${Ze(n.drawers)} drawers`:n.type==="room"&&(i=`Room in “${Te(n.wing)}”`),e.innerHTML=`<div class="hc-title">${Te(t)}</div><div class="hc-sub">${i}</div>`}function fr(){document.querySelectorAll("[data-view]").forEach(n=>{const e=n.getAttribute("data-view")===C.view;n.classList.toggle("is-active",e),n.setAttribute("aria-selected",e?"true":"false"),n.tabIndex=e?0:-1})}function wr(){var e;const n=re("help-overlay");n&&(n.classList.remove("is-open"),n.setAttribute("aria-hidden","true"),(e=ui==null?void 0:ui.focus)==null||e.call(ui),ui=null)}function sv(){const n=re("help-overlay"),e=re("help-dialog");!n||!e||(ui=document.activeElement instanceof HTMLElement?document.activeElement:null,n.classList.add("is-open"),n.setAttribute("aria-hidden","false"),requestAnimationFrame(()=>{var t;(t=re("help-close"))==null||t.focus()}))}function Gr(){const n=re("help-overlay");n!=null&&n.classList.contains("is-open")&&wr()}function $n(n){var t;Gr(),C.view==="graph"&&n!=="graph"&&(Qn.length=0,Go()),C.view=n,n==="wings"&&(C.currentWing=null,C.currentRoom=null),n==="graph"&&!sessionStorage.getItem("mempalace-graph-enter-hint")&&(sessionStorage.setItem("mempalace-graph-enter-hint","1"),fn("Graph: drag to orbit · click spheres to focus · [ ] step links · U prior focus",7e3));const e=n==="rooms"?C.currentWing:null;Y==null||Y.setView(n,e),Mt(),fr(),re("view-helper-text").textContent=((t=ti.find(i=>i.id===n))==null?void 0:t.hint)||"",wi(),bn(),St(),vu(),aa(),_t()}function ov(){C.selected&&(C.pinned=!C.pinned,Mt(),St(),_t())}function ll(){C.selected=null,C.currentRoom=null,C.pinned=!1,Mt(),St(),_t()}function av(n){var t,i;if(!n||n.type==="center"){C.hovered=null,C.pinned||(C.selected=null,C.currentRoom=null),Mt(),St(),_t();return}const e=$0(n);if(C.hovered=null,C.view==="wings"&&n.type==="wing"){C.currentWing=n.name,C.currentRoom=null,C.selected=e,C.pinned=!1,C.view="rooms",Y==null||Y.setView("rooms",n.name),Mt(),fr(),re("view-helper-text").textContent=((t=ti.find(r=>r.id==="rooms"))==null?void 0:t.hint)||"",wi(),bn(),St(),_t();return}if(C.view==="rooms"&&n.type==="wing"){C.currentWing===n.name?(Y==null||Y.centerOnNodeId(n.id),C.selected=e,C.pinned=!1):(C.currentWing=n.name,C.currentRoom=null,C.selected=e,C.pinned=!1,Y==null||Y.setView("rooms",n.name),Mt()),St(),_t();return}if(C.view==="rooms"&&n.type==="room"){C.currentWing=n.wing,C.currentRoom=n.name,C.selected=e,C.pinned=!1,Y==null||Y.setView("rooms",C.currentWing),Mt(),Y==null||Y.centerOnNodeId(n.id),St(),_t();return}if(C.view==="graph"){if(!e)return;e.id&&((i=C.selected)!=null&&i.id)&&C.selected.id!==e.id&&Dr(Qn,Nr()),C.selected=e,e.type==="room"?(C.currentWing=e.wing,C.currentRoom=e.name):e.type==="wing"&&(C.currentWing=e.name,C.currentRoom=null),C.pinned=!0,Mt(),Y==null||Y.centerOnNodeId(e.id),St(),_t();return}C.selected=e,C.pinned=!1,Mt(),St(),_t()}function cv(){const n=re("canvas-container");Y=_0(n,{onHover:(e,t)=>{if(L0()){cl(null),al(0,0,!1);return}C.hovered=e&&e.type!=="center"?{...e}:null,St(),cl(e),al(t.x,t.y,!!e&&e.type!=="center")},onClick:e=>av(e),onBackgroundClick:()=>{const e=re("canvas-container");e==null||e.classList.add("canvas-bg-dismiss"),setTimeout(()=>e==null?void 0:e.classList.remove("canvas-bg-dismiss"),160)}}),Y.init()}function lv(){const n=re("help-overlay");!n||n._trapWired||(n._trapWired=!0,n.addEventListener("keydown",e=>{if(!n.classList.contains("is-open")||e.key!=="Tab")return;const t=[...n.querySelectorAll("button, [href], input, select, textarea")].filter(s=>!s.hasAttribute("disabled"));if(t.length===0)return;const i=t[0],r=t[t.length-1];e.shiftKey&&document.activeElement===i?(e.preventDefault(),r.focus()):!e.shiftKey&&document.activeElement===r&&(e.preventDefault(),i.focus())}))}function uv(){var s,a;let n=!1,e=!1;try{const o=localStorage.getItem(fu);if(o){const c=JSON.parse(o);n=!!c.leftCollapsed,e=!!c.rightCollapsed}}catch{}const t=re("app-main-grid"),i=re("panel-left"),r=re("panel-right");t==null||t.classList.toggle("has-left-collapsed",n),t==null||t.classList.toggle("has-right-collapsed",e),i==null||i.classList.toggle("panel--collapsed",n),r==null||r.classList.toggle("panel--collapsed",e),(s=re("btn-collapse-left"))==null||s.setAttribute("aria-expanded",String(!n)),(a=re("btn-collapse-right"))==null||a.setAttribute("aria-expanded",String(!e))}function ul(){const n=re("app-main-grid");try{localStorage.setItem(fu,JSON.stringify({leftCollapsed:(n==null?void 0:n.classList.contains("has-left-collapsed"))??!1,rightCollapsed:(n==null?void 0:n.classList.contains("has-right-collapsed"))??!1}))}catch{}}function hv(){var e,t;const n=re("app-main-grid");(e=re("btn-collapse-left"))==null||e.addEventListener("click",()=>{var r,s;n==null||n.classList.toggle("has-left-collapsed"),(r=re("panel-left"))==null||r.classList.toggle("panel--collapsed");const i=n==null?void 0:n.classList.contains("has-left-collapsed");(s=re("btn-collapse-left"))==null||s.setAttribute("aria-expanded",String(!i)),ul()}),(t=re("btn-collapse-right"))==null||t.addEventListener("click",()=>{var r,s;n==null||n.classList.toggle("has-right-collapsed"),(r=re("panel-right"))==null||r.classList.toggle("panel--collapsed");const i=n==null?void 0:n.classList.contains("has-right-collapsed");(s=re("btn-collapse-right"))==null||s.setAttribute("aria-expanded",String(!i)),ul()})}function dv(){var t,i,r,s,a,o,c,l,h,f,d,m,_,g,p;(t=re("btn-refresh"))==null||t.addEventListener("click",()=>la(!0)),(i=re("btn-reset-cam"))==null||i.addEventListener("click",()=>Y==null?void 0:Y.resetCamera()),(r=re("btn-center"))==null||r.addEventListener("click",()=>{var u;(u=C.selected)!=null&&u.id?Y==null||Y.centerOnNodeId(C.selected.id):Y==null||Y.centerOnHovered()}),(s=re("btn-pin"))==null||s.addEventListener("click",()=>ov()),(a=re("btn-clear-sel"))==null||a.addEventListener("click",()=>ll()),(o=re("toggle-rotate"))==null||o.addEventListener("change",u=>{Y==null||Y.setAutoRotate(u.target.checked),_t()}),(c=re("toggle-labels"))==null||c.addEventListener("change",u=>{Y==null||Y.setLabelsVisible(u.target.checked),_t()});const n=re("motion-range");n==null||n.addEventListener("input",u=>{const v=Number(u.target.value);Y==null||Y.setMotionIntensity(v),u.target.setAttribute("aria-valuenow",String(v)),_t()}),n&&n.setAttribute("aria-valuenow",n.value),ti.forEach(u=>{var v;(v=document.querySelector(`[data-view="${u.id}"]`))==null||v.addEventListener("click",()=>$n(u.id))});const e=re("view-buttons");if(e==null||e.addEventListener("keydown",u=>{if(u.key!=="ArrowDown"&&u.key!=="ArrowUp"&&u.key!=="ArrowRight"&&u.key!=="ArrowLeft")return;const v=[...document.querySelectorAll("[data-view]")];if(!v.length)return;const x=v.findIndex(T=>T.getAttribute("data-view")===C.view);if(x<0)return;u.preventDefault();const E=u.key==="ArrowDown"||u.key==="ArrowRight"?1:-1,P=(x+E+v.length)%v.length;$n(v[P].getAttribute("data-view")),v[P].focus()}),(l=re("search-wings"))==null||l.addEventListener("input",u=>{clearTimeout(Qc),Qc=setTimeout(()=>{C.searchQuery=u.target.value,Mt(),ca(),aa(),_t()},120)}),(h=re("search-wings"))==null||h.addEventListener("keydown",u=>{if(u.key==="Enter"&&Ut.length>0){u.preventDefault(),Wo(Ut[Jt].sceneId);return}Ut.length&&(u.key==="ArrowDown"?(u.preventDefault(),Jt=zo(Jt,Ut.length,1),cr()):u.key==="ArrowUp"&&(u.preventDefault(),Jt=zo(Jt,Ut.length,-1),cr()))}),(f=re("graph-search-panel"))==null||f.addEventListener("click",u=>{const v=u.target.closest("[data-graph-route-to]");if(v){const T=Number(v.getAttribute("data-graph-route-to"));if(Number.isNaN(T)||!Ut[T])return;const A=Ut[T];if(A.kind!=="room")return;mu(A.sceneId),Ds();return}const x=u.target.closest("[data-graph-search-step]");if(x){const T=Number(x.getAttribute("data-graph-search-step"));(T===1||T===-1)&&sl(T);return}const E=u.target.closest("[data-graph-hit-ix]");if(!E)return;const P=Number(E.getAttribute("data-graph-hit-ix"));Number.isNaN(P)||!Ut[P]||(Jt=P,Wo(Ut[P].sceneId))}),(d=re("btn-help"))==null||d.addEventListener("click",()=>{const u=re("help-overlay");u!=null&&u.classList.contains("is-open")?wr():sv()}),(m=re("help-close"))==null||m.addEventListener("click",()=>wr()),(_=re("help-overlay"))==null||_.addEventListener("click",u=>{const v=re("help-overlay");u.target===v&&wr()}),lv(),uv(),hv(),(g=re("graph-view-extras"))==null||g.addEventListener("click",u=>{const v=u.target.closest("[data-rel-type]");if(!v)return;const x=v.getAttribute("data-rel-type");x&&z0(x)}),window.addEventListener("keydown",u=>{var v,x;if(u.altKey&&!u.ctrlKey&&!u.metaKey&&(u.key==="n"||u.key==="N"||u.key==="p"||u.key==="P")&&C.view==="graph"&&Ut.length>1){u.preventDefault(),sl(u.key==="n"||u.key==="N"?1:-1);return}if(!(nl(u.target)&&u.key!=="Escape")){if(u.key==="Escape"){const E=re("help-overlay");if(E!=null&&E.classList.contains("is-open")){wr();return}if(C.searchQuery.trim()){u.preventDefault(),Q0();return}C.pinned?(C.pinned=!1,Mt(),St(),_t()):C.selected&&ll();return}if(!nl(u.target)){if(u.key==="1"&&$n("wings"),u.key==="2"&&$n("rooms"),u.key==="3"&&$n("graph"),(u.key==="r"||u.key==="R")&&(Y==null||Y.resetCamera()),C.view==="graph"&&!u.ctrlKey&&!u.metaKey&&!u.altKey){const E=((v=Ce.result)==null?void 0:v.ok)&&((x=Ce.result.pathSceneIds)==null?void 0:x.length)>1;u.key==="["&&(u.preventDefault(),E?Is(-1):Ps(-1)),u.key==="]"&&(u.preventDefault(),E?Is(1):Ps(1)),(u.key==="u"||u.key==="U")&&(u.preventDefault(),pu())}if(u.key==="/"&&!u.ctrlKey&&!u.metaKey&&(u.preventDefault(),ev()),u.key==="l"||u.key==="L"){const E=re("toggle-labels");E&&(E.checked=!E.checked,E.dispatchEvent(new Event("change")))}if(u.key===" "){u.preventDefault();const E=re("toggle-rotate");E&&(E.checked=!E.checked,E.dispatchEvent(new Event("change")))}}}}),localStorage.getItem("mempalace-viz-onboarded")||(re("onboard-hint").hidden=!1,localStorage.setItem("mempalace-viz-onboarded","1")),(p=window.matchMedia)!=null&&p.call(window,"(prefers-reduced-motion: reduce)").matches&&!localStorage.getItem(sa)){const u=re("toggle-rotate");u&&(u.checked=!1,u.dispatchEvent(new Event("change"))),n&&(n.value="0",n.setAttribute("aria-valuenow","0"),Y==null||Y.setMotionIntensity(0))}}function fv(){const n=re("view-buttons");n&&(n.innerHTML=ti.map(e=>`
    <button type="button" class="view-seg__btn" data-view="${e.id}" role="tab" aria-selected="${e.id===C.view?"true":"false"}" tabindex="${e.id===C.view?0:-1}">
      <strong>${Te(e.title)}</strong>
      <span class="view-seg__hint">${Te(e.hint)}</span>
    </button>`).join(""))}async function la(n){var s,a,o,c,l;const e=n?{view:C.view,currentWing:C.currentWing,currentRoom:C.currentRoom,selected:C.selected,pinned:C.pinned,searchQuery:C.searchQuery}:null,t=Z;ys(!0),vs("loading","Connecting…");const i=re("loading-overlay");if(i&&(i.innerHTML='<div class="spinner"></div><p style="color:#94a3b8;font-size:0.85rem;">Loading palace data…</p>'),Z=await Au(),Z.error){if(n&&t&&!t.error){Z=t,vs("stale","Offline (cached)"),fn("Refresh failed — showing last loaded data. Check the API and try again."),ys(!1),St();return}vs("error","Disconnected"),Y0(Z.error.message||String(Z.error),ml()||"(same origin)");return}if(vs("ok","Connected"),ys(!1),!n){const h=X0();q0(h),j0(h)}if(rl(),n&&e){if(e.currentWing&&_i(Z.wingsData,e.currentWing)?C.currentWing=e.currentWing:(C.currentWing=null,C.currentRoom=null),e.currentRoom&&C.currentWing&&vi(Z.roomsData,C.currentWing,e.currentRoom)?C.currentRoom=e.currentRoom:C.currentRoom=null,C.view=e.view,(s=e.selected)!=null&&s.id){const h=e.selected;h.type==="wing"&&_i(Z.wingsData,h.name)||h.type==="room"&&h.wing&&vi(Z.roomsData,h.wing,h.name)?C.selected=h:C.selected=null}else C.selected=null;C.pinned=e.pinned&&!!C.selected,C.searchQuery=e.searchQuery??C.searchQuery,re("search-wings").value=C.searchQuery}rl(),Y==null||Y.setData({wingsData:Z.wingsData,roomsData:Z.roomsData,graphEdges:gi(Z.graph)}),bn(),ca();const r=C.view==="rooms"?C.currentWing:null;Y==null||Y.setView(C.view,r),B0(),Ce.startSceneId&&Ce.targetSceneId&&kr(),Mt(),Y==null||Y.setAutoRotate(((a=re("toggle-rotate"))==null?void 0:a.checked)??!0),Y==null||Y.setLabelsVisible(((o=re("toggle-labels"))==null?void 0:o.checked)??!0),Y==null||Y.setMotionIntensity(Number(((c=re("motion-range"))==null?void 0:c.value)??1)),fr(),re("view-helper-text").textContent=((l=ti.find(h=>h.id===C.view))==null?void 0:l.hint)||"",Object.keys(Z.wingsData||{}).length?(!Z.roomsData||!Object.keys(Z.roomsData).some(h=>(Z.roomsData[h]||[]).length))&&(re("view-helper-text").textContent+=" · No rooms in taxonomy yet."):re("view-helper-text").textContent="No wings returned — check MCP backend.",wi(),Z0(),Ls="",aa(),vu(),St(),_t()}function pv(){const n=re("inspect-body");!n||n._delegationWired||(n._delegationWired=!0,n.addEventListener("click",W0))}function mv(){fv(),cv(),dv(),pv(),la(!1)}mv();
