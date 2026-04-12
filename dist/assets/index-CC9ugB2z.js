(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const cl="∕";function Go(n){return String(n??"").trim()||"unknown"}function gu(n){return String(n??"").replace(/\//g,cl)}function _u(n){return String(n??"").replace(new RegExp(cl,"g"),"/")}function It(n,e){return`${Go(n)}/${gu(e)}`}function yn(n){const e=String(n||""),t=e.indexOf("/");return t<=0?null:{wingId:e.slice(0,t),roomName:_u(e.slice(t+1))}}function vu(n,e){return`room:${Go(n)}:${e}`}function ll(n){const e=yn(n);return e?vu(e.wingId,e.roomName):null}function xu(n){if(!n||typeof n!="object")return{};if(n.wings&&typeof n.wings=="object"&&!Array.isArray(n.wings))return{...n.wings};const e=new Set(["error","message","ok"]),t={};for(const[i,r]of Object.entries(n))e.has(i)||typeof r=="number"&&(t[i]=r);return Object.keys(t).length?t:{}}function yu(n){let e=n;if(e!=null&&e.taxonomy&&typeof e.taxonomy=="object"&&(e=e.taxonomy),typeof e=="string")try{e=JSON.parse(e)}catch{e={}}const t=e&&typeof e=="object"?e:{},i={},r=[],s=[];for(const[a,o]of Object.entries(t)){const c=Go(a);i[c]||(i[c]=[]);let l=0,h=0;if(o&&typeof o=="object"&&!Array.isArray(o))for(const[f,d]of Object.entries(o)){const m=typeof d=="number"?d:1,_=It(c,f),g={name:f,drawers:m,roomId:_,wingId:c};i[c].push(g),r.push({roomId:_,wingId:c,name:f,drawerCount:m}),l+=m,h+=1}s.push({wingId:c,name:c,drawerCount:l,roomCount:h,rooms:i[c]})}return s.sort((a,o)=>o.drawerCount-a.drawerCount),r.sort((a,o)=>o.drawerCount-a.drawerCount),{taxonomy:t,roomsData:i,rooms:r,wings:s}}function Mu(n){return n.map(e=>({from:e.sourceRoomId,to:e.targetRoomId,wing:e.sourceWingId,sourceRoomId:e.sourceRoomId,targetRoomId:e.targetRoomId,sourceWingId:e.sourceWingId,targetWingId:e.targetWingId,crossWing:e.crossWing,edgeId:e.edgeId,relationshipType:e.relationshipType}))}function ul(){var n;return typeof window<"u"&&((n=window.location)!=null&&n.protocol)&&window.location.protocol!=="file:"?"":"http://localhost:8767"}async function Ti(n){const e=await fetch(n,{headers:{Accept:"application/json"}});if(!e.ok){const t=await e.text().catch(()=>"");throw new Error(t||`HTTP ${e.status}`)}return e.json()}function gi(n,e){return!!(n&&typeof n=="object"&&e in n)}function _i(n,e,t){const i=n==null?void 0:n[e];return Array.isArray(i)?i.some(r=>r.name===t):!1}function Su(n){var v;const{status:e,wingsRaw:t,taxonomyRaw:i,graphStats:r,kgResult:s,overviewBundle:a}=n,o=xu(t),{taxonomy:c,roomsData:l,rooms:h,wings:f}=yu(i),d=Array.isArray(r==null?void 0:r.edgesResolved)?r.edgesResolved:[],m=Array.isArray(r==null?void 0:r.edgesUnresolved)?r.edgesUnresolved:[],_=r!=null&&r.summary&&typeof r.summary=="object"?r.summary:null;let g=[];d.length?g=Mu(d):(v=r==null?void 0:r.legacyGraphEdges)!=null&&v.length?g=r.legacyGraphEdges:r!=null&&r.tunnels&&typeof r.tunnels=="object"&&(g=Object.entries(r.tunnels).flatMap(([E,P])=>Object.entries(P||{}).map(([A,T])=>({from:E,to:A,wing:T}))));const p=s&&!s.error?s:null,u=a!=null&&a.stats&&typeof a.stats=="object"?a.stats:null,x=(r==null?void 0:r.graphMeta)??(a==null?void 0:a.graphMeta)??null;return{status:e,wingsData:o,taxonomy:c,roomsData:l,rooms:h,wings:f,graphStats:r,graph:{edgesResolved:d,edgesUnresolved:m,summary:_,graphMeta:x},graphEdges:g,overviewBundle:a,overviewStats:u,graphMeta:x,kgStats:p,error:null}}async function Eu(){const e=`${ul()}/api`;try{const[t,i,r,s,a,o]=await Promise.all([Ti(`${e}/status`),Ti(`${e}/wings`),Ti(`${e}/taxonomy`),Ti(`${e}/graph-stats`),Ti(`${e}/kg-stats`).catch(()=>null),Ti(`${e}/overview`).catch(()=>null)]);return Su({status:t,wingsRaw:i,taxonomyRaw:r,graphStats:s,kgResult:a,overviewBundle:o})}catch(t){return{status:null,wingsData:{},taxonomy:{},roomsData:{},rooms:[],wings:[],graphStats:null,graph:{edgesResolved:[],edgesUnresolved:[],summary:null,graphMeta:null},graphEdges:[],overviewBundle:null,overviewStats:null,graphMeta:null,kgStats:null,error:t}}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Wo="160",Ai={ROTATE:0,DOLLY:1,PAN:2},Ri={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},bu=0,la=1,wu=2,hl=1,Tu=2,Pn=3,Jn=0,qt=1,In=2,Yn=0,Ji=1,ua=2,ha=3,da=4,Au=5,hi=100,Ru=101,Cu=102,fa=103,pa=104,Lu=200,Pu=201,Iu=202,Du=203,So=204,Eo=205,Uu=206,Nu=207,Ou=208,Fu=209,Bu=210,zu=211,ku=212,Hu=213,Gu=214,Wu=0,Vu=1,$u=2,vs=3,Xu=4,ju=5,qu=6,Yu=7,dl=0,Ku=1,Zu=2,Kn=0,Ju=1,Qu=2,eh=3,fl=4,th=5,nh=6,pl=300,er=301,tr=302,bo=303,wo=304,Ps=306,To=1e3,vn=1001,Ao=1002,jt=1003,ma=1004,ks=1005,ln=1006,ih=1007,Rr=1008,Zn=1009,rh=1010,sh=1011,Vo=1012,ml=1013,Xn=1014,jn=1015,Cr=1016,gl=1017,_l=1018,fi=1020,oh=1021,xn=1023,ah=1024,ch=1025,pi=1026,nr=1027,lh=1028,vl=1029,uh=1030,xl=1031,yl=1033,Hs=33776,Gs=33777,Ws=33778,Vs=33779,ga=35840,_a=35841,va=35842,xa=35843,Ml=36196,ya=37492,Ma=37496,Sa=37808,Ea=37809,ba=37810,wa=37811,Ta=37812,Aa=37813,Ra=37814,Ca=37815,La=37816,Pa=37817,Ia=37818,Da=37819,Ua=37820,Na=37821,$s=36492,Oa=36494,Fa=36495,hh=36283,Ba=36284,za=36285,ka=36286,Sl=3e3,mi=3001,dh=3200,fh=3201,El=0,ph=1,dn="",Bt="srgb",Fn="srgb-linear",$o="display-p3",Is="display-p3-linear",xs="linear",wt="srgb",ys="rec709",Ms="p3",Ci=7680,Ha=519,mh=512,gh=513,_h=514,bl=515,vh=516,xh=517,yh=518,Mh=519,Ro=35044,Ga="300 es",Co=1035,Dn=2e3,Ss=2001;class Mi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Wa=1234567;const br=Math.PI/180,Lr=180/Math.PI;function Nn(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Gt[n&255]+Gt[n>>8&255]+Gt[n>>16&255]+Gt[n>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[t&63|128]+Gt[t>>8&255]+"-"+Gt[t>>16&255]+Gt[t>>24&255]+Gt[i&255]+Gt[i>>8&255]+Gt[i>>16&255]+Gt[i>>24&255]).toLowerCase()}function Vt(n,e,t){return Math.max(e,Math.min(t,n))}function Xo(n,e){return(n%e+e)%e}function Sh(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function Eh(n,e,t){return n!==e?(t-n)/(e-n):0}function wr(n,e,t){return(1-t)*n+t*e}function bh(n,e,t,i){return wr(n,e,1-Math.exp(-t*i))}function wh(n,e=1){return e-Math.abs(Xo(n,e*2)-e)}function Th(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Ah(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Rh(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Ch(n,e){return n+Math.random()*(e-n)}function Lh(n){return n*(.5-Math.random())}function Ph(n){n!==void 0&&(Wa=n);let e=Wa+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ih(n){return n*br}function Dh(n){return n*Lr}function Lo(n){return(n&n-1)===0&&n!==0}function Uh(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Es(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Nh(n,e,t,i,r){const s=Math.cos,a=Math.sin,o=s(t/2),c=a(t/2),l=s((e+i)/2),h=a((e+i)/2),f=s((e-i)/2),d=a((e-i)/2),m=s((i-e)/2),_=a((i-e)/2);switch(r){case"XYX":n.set(o*h,c*f,c*d,o*l);break;case"YZY":n.set(c*d,o*h,c*f,o*l);break;case"ZXZ":n.set(c*f,c*d,o*h,o*l);break;case"XZX":n.set(o*h,c*_,c*m,o*l);break;case"YXY":n.set(c*m,o*h,c*_,o*l);break;case"ZYZ":n.set(c*_,c*m,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function En(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function xt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const ci={DEG2RAD:br,RAD2DEG:Lr,generateUUID:Nn,clamp:Vt,euclideanModulo:Xo,mapLinear:Sh,inverseLerp:Eh,lerp:wr,damp:bh,pingpong:wh,smoothstep:Th,smootherstep:Ah,randInt:Rh,randFloat:Ch,randFloatSpread:Lh,seededRandom:Ph,degToRad:Ih,radToDeg:Dh,isPowerOfTwo:Lo,ceilPowerOfTwo:Uh,floorPowerOfTwo:Es,setQuaternionFromProperEuler:Nh,normalize:xt,denormalize:En};class je{constructor(e=0,t=0){je.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Vt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class dt{constructor(e,t,i,r,s,a,o,c,l){dt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l)}set(e,t,i,r,s,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],h=i[4],f=i[7],d=i[2],m=i[5],_=i[8],g=r[0],p=r[3],u=r[6],x=r[1],v=r[4],E=r[7],P=r[2],A=r[5],T=r[8];return s[0]=a*g+o*x+c*P,s[3]=a*p+o*v+c*A,s[6]=a*u+o*E+c*T,s[1]=l*g+h*x+f*P,s[4]=l*p+h*v+f*A,s[7]=l*u+h*E+f*T,s[2]=d*g+m*x+_*P,s[5]=d*p+m*v+_*A,s[8]=d*u+m*E+_*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-i*s*h+i*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=h*a-o*l,d=o*c-h*s,m=l*s-a*c,_=t*f+i*d+r*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=f*g,e[1]=(r*l-h*i)*g,e[2]=(o*i-r*a)*g,e[3]=d*g,e[4]=(h*t-r*c)*g,e[5]=(r*s-o*t)*g,e[6]=m*g,e[7]=(i*c-l*t)*g,e[8]=(a*t-i*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Xs.makeScale(e,t)),this}rotate(e){return this.premultiply(Xs.makeRotation(-e)),this}translate(e,t){return this.premultiply(Xs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Xs=new dt;function wl(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function bs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Oh(){const n=bs("canvas");return n.style.display="block",n}const Va={};function Tr(n){n in Va||(Va[n]=!0,console.warn(n))}const $a=new dt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Xa=new dt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),zr={[Fn]:{transfer:xs,primaries:ys,toReference:n=>n,fromReference:n=>n},[Bt]:{transfer:wt,primaries:ys,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Is]:{transfer:xs,primaries:Ms,toReference:n=>n.applyMatrix3(Xa),fromReference:n=>n.applyMatrix3($a)},[$o]:{transfer:wt,primaries:Ms,toReference:n=>n.convertSRGBToLinear().applyMatrix3(Xa),fromReference:n=>n.applyMatrix3($a).convertLinearToSRGB()}},Fh=new Set([Fn,Is]),yt={enabled:!0,_workingColorSpace:Fn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Fh.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=zr[e].toReference,r=zr[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return zr[n].primaries},getTransfer:function(n){return n===dn?xs:zr[n].transfer}};function Qi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function js(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Li;class Tl{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Li===void 0&&(Li=bs("canvas")),Li.width=e.width,Li.height=e.height;const i=Li.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Li}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=bs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Qi(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Qi(t[i]/255)*255):t[i]=Qi(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Bh=0;class Al{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Bh++}),this.uuid=Nn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(qs(r[a].image)):s.push(qs(r[a]))}else s=qs(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function qs(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Tl.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let zh=0;class tn extends Mi{constructor(e=tn.DEFAULT_IMAGE,t=tn.DEFAULT_MAPPING,i=vn,r=vn,s=ln,a=Rr,o=xn,c=Zn,l=tn.DEFAULT_ANISOTROPY,h=dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:zh++}),this.uuid=Nn(),this.name="",this.source=new Al(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new je(0,0),this.repeat=new je(1,1),this.center=new je(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Tr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===mi?Bt:dn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==pl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case To:e.x=e.x-Math.floor(e.x);break;case vn:e.x=e.x<0?0:1;break;case Ao:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case To:e.y=e.y-Math.floor(e.y);break;case vn:e.y=e.y<0?0:1;break;case Ao:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Tr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Bt?mi:Sl}set encoding(e){Tr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===mi?Bt:dn}}tn.DEFAULT_IMAGE=null;tn.DEFAULT_MAPPING=pl;tn.DEFAULT_ANISOTROPY=1;class zt{constructor(e=0,t=0,i=0,r=1){zt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,l=c[0],h=c[4],f=c[8],d=c[1],m=c[5],_=c[9],g=c[2],p=c[6],u=c[10];if(Math.abs(h-d)<.01&&Math.abs(f-g)<.01&&Math.abs(_-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(f+g)<.1&&Math.abs(_+p)<.1&&Math.abs(l+m+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(l+1)/2,E=(m+1)/2,P=(u+1)/2,A=(h+d)/4,T=(f+g)/4,K=(_+p)/4;return v>E&&v>P?v<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(v),r=A/i,s=T/i):E>P?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=A/r,s=K/r):P<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(P),i=T/s,r=K/s),this.set(i,r,s,t),this}let x=Math.sqrt((p-_)*(p-_)+(f-g)*(f-g)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(p-_)/x,this.y=(f-g)/x,this.z=(d-h)/x,this.w=Math.acos((l+m+u-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class kh extends Mi{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new zt(0,0,e,t),this.scissorTest=!1,this.viewport=new zt(0,0,e,t);const r={width:e,height:t,depth:1};i.encoding!==void 0&&(Tr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===mi?Bt:dn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ln,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new tn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Al(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class vi extends kh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Rl extends tn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=jt,this.minFilter=jt,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Hh extends tn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=jt,this.minFilter=jt,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class xi{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let c=i[r+0],l=i[r+1],h=i[r+2],f=i[r+3];const d=s[a+0],m=s[a+1],_=s[a+2],g=s[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f;return}if(o===1){e[t+0]=d,e[t+1]=m,e[t+2]=_,e[t+3]=g;return}if(f!==g||c!==d||l!==m||h!==_){let p=1-o;const u=c*d+l*m+h*_+f*g,x=u>=0?1:-1,v=1-u*u;if(v>Number.EPSILON){const P=Math.sqrt(v),A=Math.atan2(P,u*x);p=Math.sin(p*A)/P,o=Math.sin(o*A)/P}const E=o*x;if(c=c*p+d*E,l=l*p+m*E,h=h*p+_*E,f=f*p+g*E,p===1-o){const P=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=P,l*=P,h*=P,f*=P}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],c=i[r+1],l=i[r+2],h=i[r+3],f=s[a],d=s[a+1],m=s[a+2],_=s[a+3];return e[t]=o*_+h*f+c*m-l*d,e[t+1]=c*_+h*d+l*f-o*m,e[t+2]=l*_+h*m+o*d-c*f,e[t+3]=h*_-o*f-c*d-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(r/2),f=o(s/2),d=c(i/2),m=c(r/2),_=c(s/2);switch(a){case"XYZ":this._x=d*h*f+l*m*_,this._y=l*m*f-d*h*_,this._z=l*h*_+d*m*f,this._w=l*h*f-d*m*_;break;case"YXZ":this._x=d*h*f+l*m*_,this._y=l*m*f-d*h*_,this._z=l*h*_-d*m*f,this._w=l*h*f+d*m*_;break;case"ZXY":this._x=d*h*f-l*m*_,this._y=l*m*f+d*h*_,this._z=l*h*_+d*m*f,this._w=l*h*f-d*m*_;break;case"ZYX":this._x=d*h*f-l*m*_,this._y=l*m*f+d*h*_,this._z=l*h*_-d*m*f,this._w=l*h*f+d*m*_;break;case"YZX":this._x=d*h*f+l*m*_,this._y=l*m*f+d*h*_,this._z=l*h*_-d*m*f,this._w=l*h*f-d*m*_;break;case"XZY":this._x=d*h*f-l*m*_,this._y=l*m*f-d*h*_,this._z=l*h*_+d*m*f,this._w=l*h*f+d*m*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],f=t[10],d=i+o+f;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(h-c)*m,this._y=(s-l)*m,this._z=(a-r)*m}else if(i>o&&i>f){const m=2*Math.sqrt(1+i-o-f);this._w=(h-c)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+l)/m}else if(o>f){const m=2*Math.sqrt(1+o-i-f);this._w=(s-l)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(c+h)/m}else{const m=2*Math.sqrt(1+f-i-o);this._w=(a-r)/m,this._x=(s+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Vt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+a*o+r*l-s*c,this._y=r*h+a*c+s*o-i*l,this._z=s*h+a*l+i*c-r*o,this._w=a*h-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*i+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),f=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=a*f+this._w*d,this._x=i*f+this._x*d,this._y=r*f+this._y*d,this._z=s*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(s),i*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,i=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ja.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ja.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*i),h=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+c*l+a*f-o*h,this.y=i+c*h+o*l-s*f,this.z=r+c*f+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ys.copy(this).projectOnVector(e),this.sub(Ys)}reflect(e){return this.sub(Ys.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Vt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ys=new U,ja=new xi;class cr{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,mn):mn.fromBufferAttribute(s,a),mn.applyMatrix4(e.matrixWorld),this.expandByPoint(mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),kr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),kr.copy(i.boundingBox)),kr.applyMatrix4(e.matrixWorld),this.union(kr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,mn),mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(fr),Hr.subVectors(this.max,fr),Pi.subVectors(e.a,fr),Ii.subVectors(e.b,fr),Di.subVectors(e.c,fr),Bn.subVectors(Ii,Pi),zn.subVectors(Di,Ii),ri.subVectors(Pi,Di);let t=[0,-Bn.z,Bn.y,0,-zn.z,zn.y,0,-ri.z,ri.y,Bn.z,0,-Bn.x,zn.z,0,-zn.x,ri.z,0,-ri.x,-Bn.y,Bn.x,0,-zn.y,zn.x,0,-ri.y,ri.x,0];return!Ks(t,Pi,Ii,Di,Hr)||(t=[1,0,0,0,1,0,0,0,1],!Ks(t,Pi,Ii,Di,Hr))?!1:(Gr.crossVectors(Bn,zn),t=[Gr.x,Gr.y,Gr.z],Ks(t,Pi,Ii,Di,Hr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Tn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Tn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Tn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Tn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Tn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Tn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Tn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Tn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Tn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Tn=[new U,new U,new U,new U,new U,new U,new U,new U],mn=new U,kr=new cr,Pi=new U,Ii=new U,Di=new U,Bn=new U,zn=new U,ri=new U,fr=new U,Hr=new U,Gr=new U,si=new U;function Ks(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){si.fromArray(n,s);const o=r.x*Math.abs(si.x)+r.y*Math.abs(si.y)+r.z*Math.abs(si.z),c=e.dot(si),l=t.dot(si),h=i.dot(si);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Gh=new cr,pr=new U,Zs=new U;class Ur{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Gh.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;pr.subVectors(e,this.center);const t=pr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(pr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Zs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(pr.copy(e.center).add(Zs)),this.expandByPoint(pr.copy(e.center).sub(Zs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const An=new U,Js=new U,Wr=new U,kn=new U,Qs=new U,Vr=new U,eo=new U;class Nr{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,An)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=An.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(An.copy(this.origin).addScaledVector(this.direction,t),An.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Js.copy(e).add(t).multiplyScalar(.5),Wr.copy(t).sub(e).normalize(),kn.copy(this.origin).sub(Js);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Wr),o=kn.dot(this.direction),c=-kn.dot(Wr),l=kn.lengthSq(),h=Math.abs(1-a*a);let f,d,m,_;if(h>0)if(f=a*c-o,d=a*o-c,_=s*h,f>=0)if(d>=-_)if(d<=_){const g=1/h;f*=g,d*=g,m=f*(f+a*d+2*o)+d*(a*f+d+2*c)+l}else d=s,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*c)+l;else d=-s,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*c)+l;else d<=-_?(f=Math.max(0,-(-a*s+o)),d=f>0?-s:Math.min(Math.max(-s,-c),s),m=-f*f+d*(d+2*c)+l):d<=_?(f=0,d=Math.min(Math.max(-s,-c),s),m=d*(d+2*c)+l):(f=Math.max(0,-(a*s+o)),d=f>0?s:Math.min(Math.max(-s,-c),s),m=-f*f+d*(d+2*c)+l);else d=a>0?-s:s,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Js).addScaledVector(Wr,d),m}intersectSphere(e,t){An.subVectors(e.center,this.origin);const i=An.dot(this.direction),r=An.dot(An)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(i=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(i=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-d.z)*f,c=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,c=(e.min.z-d.z)*f),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,An)!==null}intersectTriangle(e,t,i,r,s){Qs.subVectors(t,e),Vr.subVectors(i,e),eo.crossVectors(Qs,Vr);let a=this.direction.dot(eo),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;kn.subVectors(this.origin,e);const c=o*this.direction.dot(Vr.crossVectors(kn,Vr));if(c<0)return null;const l=o*this.direction.dot(Qs.cross(kn));if(l<0||c+l>a)return null;const h=-o*kn.dot(eo);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ct{constructor(e,t,i,r,s,a,o,c,l,h,f,d,m,_,g,p){Ct.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l,h,f,d,m,_,g,p)}set(e,t,i,r,s,a,o,c,l,h,f,d,m,_,g,p){const u=this.elements;return u[0]=e,u[4]=t,u[8]=i,u[12]=r,u[1]=s,u[5]=a,u[9]=o,u[13]=c,u[2]=l,u[6]=h,u[10]=f,u[14]=d,u[3]=m,u[7]=_,u[11]=g,u[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ct().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Ui.setFromMatrixColumn(e,0).length(),s=1/Ui.setFromMatrixColumn(e,1).length(),a=1/Ui.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=a*h,m=a*f,_=o*h,g=o*f;t[0]=c*h,t[4]=-c*f,t[8]=l,t[1]=m+_*l,t[5]=d-g*l,t[9]=-o*c,t[2]=g-d*l,t[6]=_+m*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*h,m=c*f,_=l*h,g=l*f;t[0]=d+g*o,t[4]=_*o-m,t[8]=a*l,t[1]=a*f,t[5]=a*h,t[9]=-o,t[2]=m*o-_,t[6]=g+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*h,m=c*f,_=l*h,g=l*f;t[0]=d-g*o,t[4]=-a*f,t[8]=_+m*o,t[1]=m+_*o,t[5]=a*h,t[9]=g-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*h,m=a*f,_=o*h,g=o*f;t[0]=c*h,t[4]=_*l-m,t[8]=d*l+g,t[1]=c*f,t[5]=g*l+d,t[9]=m*l-_,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,m=a*l,_=o*c,g=o*l;t[0]=c*h,t[4]=g-d*f,t[8]=_*f+m,t[1]=f,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=m*f+_,t[10]=d-g*f}else if(e.order==="XZY"){const d=a*c,m=a*l,_=o*c,g=o*l;t[0]=c*h,t[4]=-f,t[8]=l*h,t[1]=d*f+g,t[5]=a*h,t[9]=m*f-_,t[2]=_*f-m,t[6]=o*h,t[10]=g*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Wh,e,Vh)}lookAt(e,t,i){const r=this.elements;return rn.subVectors(e,t),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),Hn.crossVectors(i,rn),Hn.lengthSq()===0&&(Math.abs(i.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),Hn.crossVectors(i,rn)),Hn.normalize(),$r.crossVectors(rn,Hn),r[0]=Hn.x,r[4]=$r.x,r[8]=rn.x,r[1]=Hn.y,r[5]=$r.y,r[9]=rn.y,r[2]=Hn.z,r[6]=$r.z,r[10]=rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],h=i[1],f=i[5],d=i[9],m=i[13],_=i[2],g=i[6],p=i[10],u=i[14],x=i[3],v=i[7],E=i[11],P=i[15],A=r[0],T=r[4],K=r[8],M=r[12],w=r[1],F=r[5],D=r[9],X=r[13],C=r[2],z=r[6],q=r[10],$=r[14],ee=r[3],Z=r[7],ne=r[11],ce=r[15];return s[0]=a*A+o*w+c*C+l*ee,s[4]=a*T+o*F+c*z+l*Z,s[8]=a*K+o*D+c*q+l*ne,s[12]=a*M+o*X+c*$+l*ce,s[1]=h*A+f*w+d*C+m*ee,s[5]=h*T+f*F+d*z+m*Z,s[9]=h*K+f*D+d*q+m*ne,s[13]=h*M+f*X+d*$+m*ce,s[2]=_*A+g*w+p*C+u*ee,s[6]=_*T+g*F+p*z+u*Z,s[10]=_*K+g*D+p*q+u*ne,s[14]=_*M+g*X+p*$+u*ce,s[3]=x*A+v*w+E*C+P*ee,s[7]=x*T+v*F+E*z+P*Z,s[11]=x*K+v*D+E*q+P*ne,s[15]=x*M+v*X+E*$+P*ce,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],f=e[6],d=e[10],m=e[14],_=e[3],g=e[7],p=e[11],u=e[15];return _*(+s*c*f-r*l*f-s*o*d+i*l*d+r*o*m-i*c*m)+g*(+t*c*m-t*l*d+s*a*d-r*a*m+r*l*h-s*c*h)+p*(+t*l*f-t*o*m-s*a*f+i*a*m+s*o*h-i*l*h)+u*(-r*o*h-t*c*f+t*o*d+r*a*f-i*a*d+i*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=e[9],d=e[10],m=e[11],_=e[12],g=e[13],p=e[14],u=e[15],x=f*p*l-g*d*l+g*c*m-o*p*m-f*c*u+o*d*u,v=_*d*l-h*p*l-_*c*m+a*p*m+h*c*u-a*d*u,E=h*g*l-_*f*l+_*o*m-a*g*m-h*o*u+a*f*u,P=_*f*c-h*g*c-_*o*d+a*g*d+h*o*p-a*f*p,A=t*x+i*v+r*E+s*P;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/A;return e[0]=x*T,e[1]=(g*d*s-f*p*s-g*r*m+i*p*m+f*r*u-i*d*u)*T,e[2]=(o*p*s-g*c*s+g*r*l-i*p*l-o*r*u+i*c*u)*T,e[3]=(f*c*s-o*d*s-f*r*l+i*d*l+o*r*m-i*c*m)*T,e[4]=v*T,e[5]=(h*p*s-_*d*s+_*r*m-t*p*m-h*r*u+t*d*u)*T,e[6]=(_*c*s-a*p*s-_*r*l+t*p*l+a*r*u-t*c*u)*T,e[7]=(a*d*s-h*c*s+h*r*l-t*d*l-a*r*m+t*c*m)*T,e[8]=E*T,e[9]=(_*f*s-h*g*s-_*i*m+t*g*m+h*i*u-t*f*u)*T,e[10]=(a*g*s-_*o*s+_*i*l-t*g*l-a*i*u+t*o*u)*T,e[11]=(h*o*s-a*f*s-h*i*l+t*f*l+a*i*m-t*o*m)*T,e[12]=P*T,e[13]=(h*g*r-_*f*r+_*i*d-t*g*d-h*i*p+t*f*p)*T,e[14]=(_*o*r-a*g*r-_*i*c+t*g*c+a*i*p-t*o*p)*T,e[15]=(a*f*r-h*o*r+h*i*c-t*f*c-a*i*d+t*o*d)*T,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,h*o+i,h*c-r*a,0,l*c-r*o,h*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,f=o+o,d=s*l,m=s*h,_=s*f,g=a*h,p=a*f,u=o*f,x=c*l,v=c*h,E=c*f,P=i.x,A=i.y,T=i.z;return r[0]=(1-(g+u))*P,r[1]=(m+E)*P,r[2]=(_-v)*P,r[3]=0,r[4]=(m-E)*A,r[5]=(1-(d+u))*A,r[6]=(p+x)*A,r[7]=0,r[8]=(_+v)*T,r[9]=(p-x)*T,r[10]=(1-(d+g))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Ui.set(r[0],r[1],r[2]).length();const a=Ui.set(r[4],r[5],r[6]).length(),o=Ui.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],gn.copy(this);const l=1/s,h=1/a,f=1/o;return gn.elements[0]*=l,gn.elements[1]*=l,gn.elements[2]*=l,gn.elements[4]*=h,gn.elements[5]*=h,gn.elements[6]*=h,gn.elements[8]*=f,gn.elements[9]*=f,gn.elements[10]*=f,t.setFromRotationMatrix(gn),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=Dn){const c=this.elements,l=2*s/(t-e),h=2*s/(i-r),f=(t+e)/(t-e),d=(i+r)/(i-r);let m,_;if(o===Dn)m=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===Ss)m=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Dn){const c=this.elements,l=1/(t-e),h=1/(i-r),f=1/(a-s),d=(t+e)*l,m=(i+r)*h;let _,g;if(o===Dn)_=(a+s)*f,g=-2*f;else if(o===Ss)_=s*f,g=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=g,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ui=new U,gn=new Ct,Wh=new U(0,0,0),Vh=new U(1,1,1),Hn=new U,$r=new U,rn=new U,qa=new Ct,Ya=new xi;class Ds{constructor(e=0,t=0,i=0,r=Ds.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],h=r[9],f=r[2],d=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(Vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Vt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Vt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Vt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Vt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return qa.makeRotationFromQuaternion(e),this.setFromRotationMatrix(qa,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ya.setFromEuler(this),this.setFromQuaternion(Ya,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ds.DEFAULT_ORDER="XYZ";class jo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let $h=0;const Ka=new U,Ni=new xi,Rn=new Ct,Xr=new U,mr=new U,Xh=new U,jh=new xi,Za=new U(1,0,0),Ja=new U(0,1,0),Qa=new U(0,0,1),qh={type:"added"},Yh={type:"removed"};class Dt extends Mi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:$h++}),this.uuid=Nn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Dt.DEFAULT_UP.clone();const e=new U,t=new Ds,i=new xi,r=new U(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ct},normalMatrix:{value:new dt}}),this.matrix=new Ct,this.matrixWorld=new Ct,this.matrixAutoUpdate=Dt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ni.setFromAxisAngle(e,t),this.quaternion.multiply(Ni),this}rotateOnWorldAxis(e,t){return Ni.setFromAxisAngle(e,t),this.quaternion.premultiply(Ni),this}rotateX(e){return this.rotateOnAxis(Za,e)}rotateY(e){return this.rotateOnAxis(Ja,e)}rotateZ(e){return this.rotateOnAxis(Qa,e)}translateOnAxis(e,t){return Ka.copy(e).applyQuaternion(this.quaternion),this.position.add(Ka.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Za,e)}translateY(e){return this.translateOnAxis(Ja,e)}translateZ(e){return this.translateOnAxis(Qa,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Xr.copy(e):Xr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),mr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(mr,Xr,this.up):Rn.lookAt(Xr,mr,this.up),this.quaternion.setFromRotationMatrix(Rn),r&&(Rn.extractRotation(r.matrixWorld),Ni.setFromRotationMatrix(Rn),this.quaternion.premultiply(Ni.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(qh)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Yh)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Rn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Rn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mr,e,Xh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mr,jh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const f=c[l];s(e.shapes,f)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),f=a(e.shapes),d=a(e.skeletons),m=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),m.length>0&&(i.animations=m),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Dt.DEFAULT_UP=new U(0,1,0);Dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const _n=new U,Cn=new U,to=new U,Ln=new U,Oi=new U,Fi=new U,ec=new U,no=new U,io=new U,ro=new U;let jr=!1;class un{constructor(e=new U,t=new U,i=new U){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),_n.subVectors(e,t),r.cross(_n);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){_n.subVectors(r,t),Cn.subVectors(i,t),to.subVectors(e,t);const a=_n.dot(_n),o=_n.dot(Cn),c=_n.dot(to),l=Cn.dot(Cn),h=Cn.dot(to),f=a*l-o*o;if(f===0)return s.set(0,0,0),null;const d=1/f,m=(l*c-o*h)*d,_=(a*h-o*c)*d;return s.set(1-m-_,_,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Ln)===null?!1:Ln.x>=0&&Ln.y>=0&&Ln.x+Ln.y<=1}static getUV(e,t,i,r,s,a,o,c){return jr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),jr=!0),this.getInterpolation(e,t,i,r,s,a,o,c)}static getInterpolation(e,t,i,r,s,a,o,c){return this.getBarycoord(e,t,i,r,Ln)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Ln.x),c.addScaledVector(a,Ln.y),c.addScaledVector(o,Ln.z),c)}static isFrontFacing(e,t,i,r){return _n.subVectors(i,t),Cn.subVectors(e,t),_n.cross(Cn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return _n.subVectors(this.c,this.b),Cn.subVectors(this.a,this.b),_n.cross(Cn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return un.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return un.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,s){return jr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),jr=!0),un.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}getInterpolation(e,t,i,r,s){return un.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return un.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return un.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;Oi.subVectors(r,i),Fi.subVectors(s,i),no.subVectors(e,i);const c=Oi.dot(no),l=Fi.dot(no);if(c<=0&&l<=0)return t.copy(i);io.subVectors(e,r);const h=Oi.dot(io),f=Fi.dot(io);if(h>=0&&f<=h)return t.copy(r);const d=c*f-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(i).addScaledVector(Oi,a);ro.subVectors(e,s);const m=Oi.dot(ro),_=Fi.dot(ro);if(_>=0&&m<=_)return t.copy(s);const g=m*l-c*_;if(g<=0&&l>=0&&_<=0)return o=l/(l-_),t.copy(i).addScaledVector(Fi,o);const p=h*_-m*f;if(p<=0&&f-h>=0&&m-_>=0)return ec.subVectors(s,r),o=(f-h)/(f-h+(m-_)),t.copy(r).addScaledVector(ec,o);const u=1/(p+g+d);return a=g*u,o=d*u,t.copy(i).addScaledVector(Oi,a).addScaledVector(Fi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Cl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gn={h:0,s:0,l:0},qr={h:0,s:0,l:0};function so(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class st{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,yt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=yt.workingColorSpace){return this.r=e,this.g=t,this.b=i,yt.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=yt.workingColorSpace){if(e=Xo(e,1),t=Vt(t,0,1),i=Vt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=so(a,s,e+1/3),this.g=so(a,s,e),this.b=so(a,s,e-1/3)}return yt.toWorkingColorSpace(this,r),this}setStyle(e,t=Bt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Bt){const i=Cl[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Qi(e.r),this.g=Qi(e.g),this.b=Qi(e.b),this}copyLinearToSRGB(e){return this.r=js(e.r),this.g=js(e.g),this.b=js(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Bt){return yt.fromWorkingColorSpace(Wt.copy(this),e),Math.round(Vt(Wt.r*255,0,255))*65536+Math.round(Vt(Wt.g*255,0,255))*256+Math.round(Vt(Wt.b*255,0,255))}getHexString(e=Bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=yt.workingColorSpace){yt.fromWorkingColorSpace(Wt.copy(this),t);const i=Wt.r,r=Wt.g,s=Wt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const f=a-o;switch(l=h<=.5?f/(a+o):f/(2-a-o),a){case i:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-i)/f+2;break;case s:c=(i-r)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=yt.workingColorSpace){return yt.fromWorkingColorSpace(Wt.copy(this),t),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=Bt){yt.fromWorkingColorSpace(Wt.copy(this),e);const t=Wt.r,i=Wt.g,r=Wt.b;return e!==Bt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Gn),this.setHSL(Gn.h+e,Gn.s+t,Gn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Gn),e.getHSL(qr);const i=wr(Gn.h,qr.h,t),r=wr(Gn.s,qr.s,t),s=wr(Gn.l,qr.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Wt=new st;st.NAMES=Cl;let Kh=0;class ei extends Mi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kh++}),this.uuid=Nn(),this.name="",this.type="Material",this.blending=Ji,this.side=Jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=So,this.blendDst=Eo,this.blendEquation=hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new st(0,0,0),this.blendAlpha=0,this.depthFunc=vs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ha,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ci,this.stencilZFail=Ci,this.stencilZPass=Ci,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ji&&(i.blending=this.blending),this.side!==Jn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==So&&(i.blendSrc=this.blendSrc),this.blendDst!==Eo&&(i.blendDst=this.blendDst),this.blendEquation!==hi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==vs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ha&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ci&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ci&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ci&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class qo extends ei{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new st(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=dl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Pt=new U,Yr=new je;class Mn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ro,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=jn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Yr.fromBufferAttribute(this,t),Yr.applyMatrix3(e),this.setXY(t,Yr.x,Yr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix3(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=En(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=xt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=En(t,this.array)),t}setX(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=En(t,this.array)),t}setY(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=En(t,this.array)),t}setZ(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=En(t,this.array)),t}setW(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),i=xt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),i=xt(i,this.array),r=xt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),i=xt(i,this.array),r=xt(r,this.array),s=xt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ro&&(e.usage=this.usage),e}}class Ll extends Mn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Pl extends Mn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class pn extends Mn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Zh=0;const cn=new Ct,oo=new Dt,Bi=new U,sn=new cr,gr=new cr,Ft=new U;class on extends Mi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zh++}),this.uuid=Nn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(wl(e)?Pl:Ll)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new dt().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return cn.makeRotationFromQuaternion(e),this.applyMatrix4(cn),this}rotateX(e){return cn.makeRotationX(e),this.applyMatrix4(cn),this}rotateY(e){return cn.makeRotationY(e),this.applyMatrix4(cn),this}rotateZ(e){return cn.makeRotationZ(e),this.applyMatrix4(cn),this}translate(e,t,i){return cn.makeTranslation(e,t,i),this.applyMatrix4(cn),this}scale(e,t,i){return cn.makeScale(e,t,i),this.applyMatrix4(cn),this}lookAt(e){return oo.lookAt(e),oo.updateMatrix(),this.applyMatrix4(oo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bi).negate(),this.translate(Bi.x,Bi.y,Bi.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new pn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new cr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];sn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ur);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new U,1/0);return}if(e){const i=this.boundingSphere.center;if(sn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];gr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ft.addVectors(sn.min,gr.min),sn.expandByPoint(Ft),Ft.addVectors(sn.max,gr.max),sn.expandByPoint(Ft)):(sn.expandByPoint(gr.min),sn.expandByPoint(gr.max))}sn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Ft.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ft));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Ft.fromBufferAttribute(o,l),c&&(Bi.fromBufferAttribute(e,l),Ft.add(Bi)),r=Math.max(r,i.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,s=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Mn(new Float32Array(4*o),4));const c=this.getAttribute("tangent").array,l=[],h=[];for(let w=0;w<o;w++)l[w]=new U,h[w]=new U;const f=new U,d=new U,m=new U,_=new je,g=new je,p=new je,u=new U,x=new U;function v(w,F,D){f.fromArray(r,w*3),d.fromArray(r,F*3),m.fromArray(r,D*3),_.fromArray(a,w*2),g.fromArray(a,F*2),p.fromArray(a,D*2),d.sub(f),m.sub(f),g.sub(_),p.sub(_);const X=1/(g.x*p.y-p.x*g.y);isFinite(X)&&(u.copy(d).multiplyScalar(p.y).addScaledVector(m,-g.y).multiplyScalar(X),x.copy(m).multiplyScalar(g.x).addScaledVector(d,-p.x).multiplyScalar(X),l[w].add(u),l[F].add(u),l[D].add(u),h[w].add(x),h[F].add(x),h[D].add(x))}let E=this.groups;E.length===0&&(E=[{start:0,count:i.length}]);for(let w=0,F=E.length;w<F;++w){const D=E[w],X=D.start,C=D.count;for(let z=X,q=X+C;z<q;z+=3)v(i[z+0],i[z+1],i[z+2])}const P=new U,A=new U,T=new U,K=new U;function M(w){T.fromArray(s,w*3),K.copy(T);const F=l[w];P.copy(F),P.sub(T.multiplyScalar(T.dot(F))).normalize(),A.crossVectors(K,F);const X=A.dot(h[w])<0?-1:1;c[w*4]=P.x,c[w*4+1]=P.y,c[w*4+2]=P.z,c[w*4+3]=X}for(let w=0,F=E.length;w<F;++w){const D=E[w],X=D.start,C=D.count;for(let z=X,q=X+C;z<q;z+=3)M(i[z+0]),M(i[z+1]),M(i[z+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Mn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,m=i.count;d<m;d++)i.setXYZ(d,0,0,0);const r=new U,s=new U,a=new U,o=new U,c=new U,l=new U,h=new U,f=new U;if(e)for(let d=0,m=e.count;d<m;d+=3){const _=e.getX(d+0),g=e.getX(d+1),p=e.getX(d+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,p),h.subVectors(a,s),f.subVectors(r,s),h.cross(f),o.fromBufferAttribute(i,_),c.fromBufferAttribute(i,g),l.fromBufferAttribute(i,p),o.add(h),c.add(h),l.add(h),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(g,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let d=0,m=t.count;d<m;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),f.subVectors(r,s),h.cross(f),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ft.fromBufferAttribute(e,t),Ft.normalize(),e.setXYZ(t,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,f=o.normalized,d=new l.constructor(c.length*h);let m=0,_=0;for(let g=0,p=c.length;g<p;g++){o.isInterleavedBufferAttribute?m=c[g]*o.data.stride+o.offset:m=c[g]*h;for(let u=0;u<h;u++)d[_++]=l[m++]}return new Mn(d,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new on,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,i);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let h=0,f=l.length;h<f;h++){const d=l[h],m=e(d,i);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let f=0,d=l.length;f<d;f++){const m=l[f];h.push(m.toJSON(e.data))}h.length>0&&(r[c]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const l in r){const h=r[l];this.setAttribute(l,h.clone(t))}const s=e.morphAttributes;for(const l in s){const h=[],f=s[l];for(let d=0,m=f.length;d<m;d++)h.push(f[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const tc=new Ct,oi=new Nr,Kr=new Ur,nc=new U,zi=new U,ki=new U,Hi=new U,ao=new U,Zr=new U,Jr=new je,Qr=new je,es=new je,ic=new U,rc=new U,sc=new U,ts=new U,ns=new U;class Kt extends Dt{constructor(e=new on,t=new qo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Zr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=o[c],f=s[c];h!==0&&(ao.fromBufferAttribute(f,e),a?Zr.addScaledVector(ao,h):Zr.addScaledVector(ao.sub(t),h))}t.add(Zr)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Kr.copy(i.boundingSphere),Kr.applyMatrix4(s),oi.copy(e.ray).recast(e.near),!(Kr.containsPoint(oi.origin)===!1&&(oi.intersectSphere(Kr,nc)===null||oi.origin.distanceToSquared(nc)>(e.far-e.near)**2))&&(tc.copy(s).invert(),oi.copy(e.ray).applyMatrix4(tc),!(i.boundingBox!==null&&oi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,oi)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,f=s.attributes.normal,d=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,g=d.length;_<g;_++){const p=d[_],u=a[p.materialIndex],x=Math.max(p.start,m.start),v=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let E=x,P=v;E<P;E+=3){const A=o.getX(E),T=o.getX(E+1),K=o.getX(E+2);r=is(this,u,e,i,l,h,f,A,T,K),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const _=Math.max(0,m.start),g=Math.min(o.count,m.start+m.count);for(let p=_,u=g;p<u;p+=3){const x=o.getX(p),v=o.getX(p+1),E=o.getX(p+2);r=is(this,a,e,i,l,h,f,x,v,E),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,g=d.length;_<g;_++){const p=d[_],u=a[p.materialIndex],x=Math.max(p.start,m.start),v=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let E=x,P=v;E<P;E+=3){const A=E,T=E+1,K=E+2;r=is(this,u,e,i,l,h,f,A,T,K),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const _=Math.max(0,m.start),g=Math.min(c.count,m.start+m.count);for(let p=_,u=g;p<u;p+=3){const x=p,v=p+1,E=p+2;r=is(this,a,e,i,l,h,f,x,v,E),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function Jh(n,e,t,i,r,s,a,o){let c;if(e.side===qt?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===Jn,o),c===null)return null;ns.copy(o),ns.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(ns);return l<t.near||l>t.far?null:{distance:l,point:ns.clone(),object:n}}function is(n,e,t,i,r,s,a,o,c,l){n.getVertexPosition(o,zi),n.getVertexPosition(c,ki),n.getVertexPosition(l,Hi);const h=Jh(n,e,t,i,zi,ki,Hi,ts);if(h){r&&(Jr.fromBufferAttribute(r,o),Qr.fromBufferAttribute(r,c),es.fromBufferAttribute(r,l),h.uv=un.getInterpolation(ts,zi,ki,Hi,Jr,Qr,es,new je)),s&&(Jr.fromBufferAttribute(s,o),Qr.fromBufferAttribute(s,c),es.fromBufferAttribute(s,l),h.uv1=un.getInterpolation(ts,zi,ki,Hi,Jr,Qr,es,new je),h.uv2=h.uv1),a&&(ic.fromBufferAttribute(a,o),rc.fromBufferAttribute(a,c),sc.fromBufferAttribute(a,l),h.normal=un.getInterpolation(ts,zi,ki,Hi,ic,rc,sc,new U),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:c,c:l,normal:new U,materialIndex:0};un.getNormal(zi,ki,Hi,f.normal),h.face=f}return h}class Or extends on{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],h=[],f=[];let d=0,m=0;_("z","y","x",-1,-1,i,t,e,a,s,0),_("z","y","x",1,-1,i,t,-e,a,s,1),_("x","z","y",1,1,e,i,t,r,a,2),_("x","z","y",1,-1,e,i,-t,r,a,3),_("x","y","z",1,-1,e,t,i,r,s,4),_("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new pn(l,3)),this.setAttribute("normal",new pn(h,3)),this.setAttribute("uv",new pn(f,2));function _(g,p,u,x,v,E,P,A,T,K,M){const w=E/T,F=P/K,D=E/2,X=P/2,C=A/2,z=T+1,q=K+1;let $=0,ee=0;const Z=new U;for(let ne=0;ne<q;ne++){const ce=ne*F-X;for(let de=0;de<z;de++){const k=de*w-D;Z[g]=k*x,Z[p]=ce*v,Z[u]=C,l.push(Z.x,Z.y,Z.z),Z[g]=0,Z[p]=0,Z[u]=A>0?1:-1,h.push(Z.x,Z.y,Z.z),f.push(de/T),f.push(1-ne/K),$+=1}}for(let ne=0;ne<K;ne++)for(let ce=0;ce<T;ce++){const de=d+ce+z*ne,k=d+ce+z*(ne+1),te=d+(ce+1)+z*(ne+1),se=d+(ce+1)+z*ne;c.push(de,k,se),c.push(k,te,se),ee+=6}o.addGroup(m,ee,M),m+=ee,d+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Or(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ir(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Xt(n){const e={};for(let t=0;t<n.length;t++){const i=ir(n[t]);for(const r in i)e[r]=i[r]}return e}function Qh(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Il(n){return n.getRenderTarget()===null?n.outputColorSpace:yt.workingColorSpace}const ed={clone:ir,merge:Xt};var td=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,nd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class yi extends ei{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=td,this.fragmentShader=nd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ir(e.uniforms),this.uniformsGroups=Qh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Dl extends Dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ct,this.projectionMatrix=new Ct,this.projectionMatrixInverse=new Ct,this.coordinateSystem=Dn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class hn extends Dl{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Lr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(br*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Lr*2*Math.atan(Math.tan(br*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(br*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Gi=-90,Wi=1;class id extends Dt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new hn(Gi,Wi,e,t);r.layers=this.layers,this.add(r);const s=new hn(Gi,Wi,e,t);s.layers=this.layers,this.add(s);const a=new hn(Gi,Wi,e,t);a.layers=this.layers,this.add(a);const o=new hn(Gi,Wi,e,t);o.layers=this.layers,this.add(o);const c=new hn(Gi,Wi,e,t);c.layers=this.layers,this.add(c);const l=new hn(Gi,Wi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===Dn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ss)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,h]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,l),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,r),e.render(t,h),e.setRenderTarget(f,d,m),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Ul extends tn{constructor(e,t,i,r,s,a,o,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:er,super(e,t,i,r,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class rd extends vi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&(Tr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===mi?Bt:dn),this.texture=new Ul(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ln}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Or(5,5,5),s=new yi({name:"CubemapFromEquirect",uniforms:ir(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:qt,blending:Yn});s.uniforms.tEquirect.value=t;const a=new Kt(r,s),o=t.minFilter;return t.minFilter===Rr&&(t.minFilter=ln),new id(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}const co=new U,sd=new U,od=new dt;class Wn{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=co.subVectors(i,t).cross(sd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(co),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||od.getNormalMatrix(e),r=this.coplanarPoint(co).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ai=new Ur,rs=new U;class Yo{constructor(e=new Wn,t=new Wn,i=new Wn,r=new Wn,s=new Wn,a=new Wn){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Dn){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],c=r[3],l=r[4],h=r[5],f=r[6],d=r[7],m=r[8],_=r[9],g=r[10],p=r[11],u=r[12],x=r[13],v=r[14],E=r[15];if(i[0].setComponents(c-s,d-l,p-m,E-u).normalize(),i[1].setComponents(c+s,d+l,p+m,E+u).normalize(),i[2].setComponents(c+a,d+h,p+_,E+x).normalize(),i[3].setComponents(c-a,d-h,p-_,E-x).normalize(),i[4].setComponents(c-o,d-f,p-g,E-v).normalize(),t===Dn)i[5].setComponents(c+o,d+f,p+g,E+v).normalize();else if(t===Ss)i[5].setComponents(o,f,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ai.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ai.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ai)}intersectsSprite(e){return ai.center.set(0,0,0),ai.radius=.7071067811865476,ai.applyMatrix4(e.matrixWorld),this.intersectsSphere(ai)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(rs.x=r.normal.x>0?e.max.x:e.min.x,rs.y=r.normal.y>0?e.max.y:e.min.y,rs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(rs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Nl(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function ad(n,e){const t=e.isWebGL2,i=new WeakMap;function r(l,h){const f=l.array,d=l.usage,m=f.byteLength,_=n.createBuffer();n.bindBuffer(h,_),n.bufferData(h,f,d),l.onUploadCallback();let g;if(f instanceof Float32Array)g=n.FLOAT;else if(f instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)g=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=n.UNSIGNED_SHORT;else if(f instanceof Int16Array)g=n.SHORT;else if(f instanceof Uint32Array)g=n.UNSIGNED_INT;else if(f instanceof Int32Array)g=n.INT;else if(f instanceof Int8Array)g=n.BYTE;else if(f instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:_,type:g,bytesPerElement:f.BYTES_PER_ELEMENT,version:l.version,size:m}}function s(l,h,f){const d=h.array,m=h._updateRange,_=h.updateRanges;if(n.bindBuffer(f,l),m.count===-1&&_.length===0&&n.bufferSubData(f,0,d),_.length!==0){for(let g=0,p=_.length;g<p;g++){const u=_[g];t?n.bufferSubData(f,u.start*d.BYTES_PER_ELEMENT,d,u.start,u.count):n.bufferSubData(f,u.start*d.BYTES_PER_ELEMENT,d.subarray(u.start,u.start+u.count))}h.clearUpdateRanges()}m.count!==-1&&(t?n.bufferSubData(f,m.offset*d.BYTES_PER_ELEMENT,d,m.offset,m.count):n.bufferSubData(f,m.offset*d.BYTES_PER_ELEMENT,d.subarray(m.offset,m.offset+m.count)),m.count=-1),h.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),i.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);const h=i.get(l);h&&(n.deleteBuffer(h.buffer),i.delete(l))}function c(l,h){if(l.isGLBufferAttribute){const d=i.get(l);(!d||d.version<l.version)&&i.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const f=i.get(l);if(f===void 0)i.set(l,r(l,h));else if(f.version<l.version){if(f.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,l,h),f.version=l.version}}return{get:a,remove:o,update:c}}class Ko extends on{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,h=c+1,f=e/o,d=t/c,m=[],_=[],g=[],p=[];for(let u=0;u<h;u++){const x=u*d-a;for(let v=0;v<l;v++){const E=v*f-s;_.push(E,-x,0),g.push(0,0,1),p.push(v/o),p.push(1-u/c)}}for(let u=0;u<c;u++)for(let x=0;x<o;x++){const v=x+l*u,E=x+l*(u+1),P=x+1+l*(u+1),A=x+1+l*u;m.push(v,E,A),m.push(E,P,A)}this.setIndex(m),this.setAttribute("position",new pn(_,3)),this.setAttribute("normal",new pn(g,3)),this.setAttribute("uv",new pn(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ko(e.width,e.height,e.widthSegments,e.heightSegments)}}var cd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ld=`#ifdef USE_ALPHAHASH
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
#endif`,ud=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,hd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dd=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,fd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,pd=`#ifdef USE_AOMAP
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
#endif`,md=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gd=`#ifdef USE_BATCHING
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
#endif`,_d=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,vd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,xd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Md=`#ifdef USE_IRIDESCENCE
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
#endif`,Sd=`#ifdef USE_BUMPMAP
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
#endif`,Ed=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,bd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Td=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ad=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Rd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Cd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Ld=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Pd=`#define PI 3.141592653589793
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
} // validated`,Id=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Dd=`vec3 transformedNormal = objectNormal;
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
#endif`,Ud=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Nd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Od=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Fd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Bd="gl_FragColor = linearToOutputTexel( gl_FragColor );",zd=`
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
}`,kd=`#ifdef USE_ENVMAP
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
#endif`,Hd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Gd=`#ifdef USE_ENVMAP
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
#endif`,Wd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Vd=`#ifdef USE_ENVMAP
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
#endif`,$d=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,jd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,qd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Yd=`#ifdef USE_GRADIENTMAP
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
}`,Kd=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Zd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Jd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Qd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ef=`uniform bool receiveShadow;
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
#endif`,tf=`#ifdef USE_ENVMAP
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
#endif`,nf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,rf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,sf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,of=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,af=`PhysicalMaterial material;
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
#endif`,cf=`struct PhysicalMaterial {
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
}`,lf=`
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
#endif`,uf=`#if defined( RE_IndirectDiffuse )
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
#endif`,hf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,df=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ff=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,mf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,gf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,_f=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,xf=`#if defined( USE_POINTS_UV )
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
#endif`,yf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Mf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Sf=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ef=`#ifdef USE_MORPHNORMALS
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
#endif`,bf=`#ifdef USE_MORPHTARGETS
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
#endif`,wf=`#ifdef USE_MORPHTARGETS
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
#endif`,Tf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Af=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Rf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Lf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Pf=`#ifdef USE_NORMALMAP
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
#endif`,If=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Df=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Uf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Nf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Of=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ff=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Bf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,kf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Hf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Gf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Wf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Vf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$f=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Xf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,jf=`float getShadowMask() {
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
}`,qf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Yf=`#ifdef USE_SKINNING
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
#endif`,Kf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Zf=`#ifdef USE_SKINNING
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
#endif`,Jf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Qf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ep=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,np=`#ifdef USE_TRANSMISSION
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
#endif`,ip=`#ifdef USE_TRANSMISSION
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
#endif`,rp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,op=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ap=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const cp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lp=`uniform sampler2D t2D;
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
}`,up=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,dp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pp=`#include <common>
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
}`,mp=`#if DEPTH_PACKING == 3200
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
}`,gp=`#define DISTANCE
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
}`,_p=`#define DISTANCE
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
}`,vp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yp=`uniform float scale;
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
}`,Mp=`uniform vec3 diffuse;
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
}`,Sp=`#include <common>
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
}`,Ep=`uniform vec3 diffuse;
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
}`,bp=`#define LAMBERT
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
}`,wp=`#define LAMBERT
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
}`,Tp=`#define MATCAP
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
}`,Ap=`#define MATCAP
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
}`,Rp=`#define NORMAL
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
}`,Cp=`#define NORMAL
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
}`,Lp=`#define PHONG
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
}`,Pp=`#define PHONG
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
}`,Ip=`#define STANDARD
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
}`,Dp=`#define STANDARD
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
}`,Up=`#define TOON
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
}`,Np=`#define TOON
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
}`,Op=`uniform float size;
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
}`,Fp=`uniform vec3 diffuse;
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
}`,Bp=`#include <common>
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
}`,zp=`uniform vec3 color;
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
}`,kp=`uniform float rotation;
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
}`,Hp=`uniform vec3 diffuse;
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
}`,at={alphahash_fragment:cd,alphahash_pars_fragment:ld,alphamap_fragment:ud,alphamap_pars_fragment:hd,alphatest_fragment:dd,alphatest_pars_fragment:fd,aomap_fragment:pd,aomap_pars_fragment:md,batching_pars_vertex:gd,batching_vertex:_d,begin_vertex:vd,beginnormal_vertex:xd,bsdfs:yd,iridescence_fragment:Md,bumpmap_pars_fragment:Sd,clipping_planes_fragment:Ed,clipping_planes_pars_fragment:bd,clipping_planes_pars_vertex:wd,clipping_planes_vertex:Td,color_fragment:Ad,color_pars_fragment:Rd,color_pars_vertex:Cd,color_vertex:Ld,common:Pd,cube_uv_reflection_fragment:Id,defaultnormal_vertex:Dd,displacementmap_pars_vertex:Ud,displacementmap_vertex:Nd,emissivemap_fragment:Od,emissivemap_pars_fragment:Fd,colorspace_fragment:Bd,colorspace_pars_fragment:zd,envmap_fragment:kd,envmap_common_pars_fragment:Hd,envmap_pars_fragment:Gd,envmap_pars_vertex:Wd,envmap_physical_pars_fragment:tf,envmap_vertex:Vd,fog_vertex:$d,fog_pars_vertex:Xd,fog_fragment:jd,fog_pars_fragment:qd,gradientmap_pars_fragment:Yd,lightmap_fragment:Kd,lightmap_pars_fragment:Zd,lights_lambert_fragment:Jd,lights_lambert_pars_fragment:Qd,lights_pars_begin:ef,lights_toon_fragment:nf,lights_toon_pars_fragment:rf,lights_phong_fragment:sf,lights_phong_pars_fragment:of,lights_physical_fragment:af,lights_physical_pars_fragment:cf,lights_fragment_begin:lf,lights_fragment_maps:uf,lights_fragment_end:hf,logdepthbuf_fragment:df,logdepthbuf_pars_fragment:ff,logdepthbuf_pars_vertex:pf,logdepthbuf_vertex:mf,map_fragment:gf,map_pars_fragment:_f,map_particle_fragment:vf,map_particle_pars_fragment:xf,metalnessmap_fragment:yf,metalnessmap_pars_fragment:Mf,morphcolor_vertex:Sf,morphnormal_vertex:Ef,morphtarget_pars_vertex:bf,morphtarget_vertex:wf,normal_fragment_begin:Tf,normal_fragment_maps:Af,normal_pars_fragment:Rf,normal_pars_vertex:Cf,normal_vertex:Lf,normalmap_pars_fragment:Pf,clearcoat_normal_fragment_begin:If,clearcoat_normal_fragment_maps:Df,clearcoat_pars_fragment:Uf,iridescence_pars_fragment:Nf,opaque_fragment:Of,packing:Ff,premultiplied_alpha_fragment:Bf,project_vertex:zf,dithering_fragment:kf,dithering_pars_fragment:Hf,roughnessmap_fragment:Gf,roughnessmap_pars_fragment:Wf,shadowmap_pars_fragment:Vf,shadowmap_pars_vertex:$f,shadowmap_vertex:Xf,shadowmask_pars_fragment:jf,skinbase_vertex:qf,skinning_pars_vertex:Yf,skinning_vertex:Kf,skinnormal_vertex:Zf,specularmap_fragment:Jf,specularmap_pars_fragment:Qf,tonemapping_fragment:ep,tonemapping_pars_fragment:tp,transmission_fragment:np,transmission_pars_fragment:ip,uv_pars_fragment:rp,uv_pars_vertex:sp,uv_vertex:op,worldpos_vertex:ap,background_vert:cp,background_frag:lp,backgroundCube_vert:up,backgroundCube_frag:hp,cube_vert:dp,cube_frag:fp,depth_vert:pp,depth_frag:mp,distanceRGBA_vert:gp,distanceRGBA_frag:_p,equirect_vert:vp,equirect_frag:xp,linedashed_vert:yp,linedashed_frag:Mp,meshbasic_vert:Sp,meshbasic_frag:Ep,meshlambert_vert:bp,meshlambert_frag:wp,meshmatcap_vert:Tp,meshmatcap_frag:Ap,meshnormal_vert:Rp,meshnormal_frag:Cp,meshphong_vert:Lp,meshphong_frag:Pp,meshphysical_vert:Ip,meshphysical_frag:Dp,meshtoon_vert:Up,meshtoon_frag:Np,points_vert:Op,points_frag:Fp,shadow_vert:Bp,shadow_frag:zp,sprite_vert:kp,sprite_frag:Hp},ve={common:{diffuse:{value:new st(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new dt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new dt},normalScale:{value:new je(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new st(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new st(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0},uvTransform:{value:new dt}},sprite:{diffuse:{value:new st(16777215)},opacity:{value:1},center:{value:new je(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}}},Sn={basic:{uniforms:Xt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:at.meshbasic_vert,fragmentShader:at.meshbasic_frag},lambert:{uniforms:Xt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new st(0)}}]),vertexShader:at.meshlambert_vert,fragmentShader:at.meshlambert_frag},phong:{uniforms:Xt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new st(0)},specular:{value:new st(1118481)},shininess:{value:30}}]),vertexShader:at.meshphong_vert,fragmentShader:at.meshphong_frag},standard:{uniforms:Xt([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new st(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag},toon:{uniforms:Xt([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new st(0)}}]),vertexShader:at.meshtoon_vert,fragmentShader:at.meshtoon_frag},matcap:{uniforms:Xt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:at.meshmatcap_vert,fragmentShader:at.meshmatcap_frag},points:{uniforms:Xt([ve.points,ve.fog]),vertexShader:at.points_vert,fragmentShader:at.points_frag},dashed:{uniforms:Xt([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:at.linedashed_vert,fragmentShader:at.linedashed_frag},depth:{uniforms:Xt([ve.common,ve.displacementmap]),vertexShader:at.depth_vert,fragmentShader:at.depth_frag},normal:{uniforms:Xt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:at.meshnormal_vert,fragmentShader:at.meshnormal_frag},sprite:{uniforms:Xt([ve.sprite,ve.fog]),vertexShader:at.sprite_vert,fragmentShader:at.sprite_frag},background:{uniforms:{uvTransform:{value:new dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:at.background_vert,fragmentShader:at.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:at.backgroundCube_vert,fragmentShader:at.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:at.cube_vert,fragmentShader:at.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:at.equirect_vert,fragmentShader:at.equirect_frag},distanceRGBA:{uniforms:Xt([ve.common,ve.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:at.distanceRGBA_vert,fragmentShader:at.distanceRGBA_frag},shadow:{uniforms:Xt([ve.lights,ve.fog,{color:{value:new st(0)},opacity:{value:1}}]),vertexShader:at.shadow_vert,fragmentShader:at.shadow_frag}};Sn.physical={uniforms:Xt([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new dt},clearcoatNormalScale:{value:new je(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new dt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new dt},sheen:{value:0},sheenColor:{value:new st(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new dt},transmissionSamplerSize:{value:new je},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new dt},attenuationDistance:{value:0},attenuationColor:{value:new st(0)},specularColor:{value:new st(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new dt},anisotropyVector:{value:new je},anisotropyMap:{value:null},anisotropyMapTransform:{value:new dt}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag};const ss={r:0,b:0,g:0};function Gp(n,e,t,i,r,s,a){const o=new st(0);let c=s===!0?0:1,l,h,f=null,d=0,m=null;function _(p,u){let x=!1,v=u.isScene===!0?u.background:null;v&&v.isTexture&&(v=(u.backgroundBlurriness>0?t:e).get(v)),v===null?g(o,c):v&&v.isColor&&(g(v,1),x=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?i.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||x)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Ps)?(h===void 0&&(h=new Kt(new Or(1,1,1),new yi({name:"BackgroundCubeMaterial",uniforms:ir(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,A,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=u.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,h.material.toneMapped=yt.getTransfer(v.colorSpace)!==wt,(f!==v||d!==v.version||m!==n.toneMapping)&&(h.material.needsUpdate=!0,f=v,d=v.version,m=n.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Kt(new Ko(2,2),new yi({name:"BackgroundMaterial",uniforms:ir(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,l.material.toneMapped=yt.getTransfer(v.colorSpace)!==wt,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(f!==v||d!==v.version||m!==n.toneMapping)&&(l.material.needsUpdate=!0,f=v,d=v.version,m=n.toneMapping),l.layers.enableAll(),p.unshift(l,l.geometry,l.material,0,0,null))}function g(p,u){p.getRGB(ss,Il(n)),i.buffers.color.setClear(ss.r,ss.g,ss.b,u,a)}return{getClearColor:function(){return o},setClearColor:function(p,u=1){o.set(p),c=u,g(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(p){c=p,g(o,c)},render:_}}function Wp(n,e,t,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||s!==null,o={},c=p(null);let l=c,h=!1;function f(C,z,q,$,ee){let Z=!1;if(a){const ne=g($,q,z);l!==ne&&(l=ne,m(l.object)),Z=u(C,$,q,ee),Z&&x(C,$,q,ee)}else{const ne=z.wireframe===!0;(l.geometry!==$.id||l.program!==q.id||l.wireframe!==ne)&&(l.geometry=$.id,l.program=q.id,l.wireframe=ne,Z=!0)}ee!==null&&t.update(ee,n.ELEMENT_ARRAY_BUFFER),(Z||h)&&(h=!1,K(C,z,q,$),ee!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(ee).buffer))}function d(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function m(C){return i.isWebGL2?n.bindVertexArray(C):s.bindVertexArrayOES(C)}function _(C){return i.isWebGL2?n.deleteVertexArray(C):s.deleteVertexArrayOES(C)}function g(C,z,q){const $=q.wireframe===!0;let ee=o[C.id];ee===void 0&&(ee={},o[C.id]=ee);let Z=ee[z.id];Z===void 0&&(Z={},ee[z.id]=Z);let ne=Z[$];return ne===void 0&&(ne=p(d()),Z[$]=ne),ne}function p(C){const z=[],q=[],$=[];for(let ee=0;ee<r;ee++)z[ee]=0,q[ee]=0,$[ee]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:q,attributeDivisors:$,object:C,attributes:{},index:null}}function u(C,z,q,$){const ee=l.attributes,Z=z.attributes;let ne=0;const ce=q.getAttributes();for(const de in ce)if(ce[de].location>=0){const te=ee[de];let se=Z[de];if(se===void 0&&(de==="instanceMatrix"&&C.instanceMatrix&&(se=C.instanceMatrix),de==="instanceColor"&&C.instanceColor&&(se=C.instanceColor)),te===void 0||te.attribute!==se||se&&te.data!==se.data)return!0;ne++}return l.attributesNum!==ne||l.index!==$}function x(C,z,q,$){const ee={},Z=z.attributes;let ne=0;const ce=q.getAttributes();for(const de in ce)if(ce[de].location>=0){let te=Z[de];te===void 0&&(de==="instanceMatrix"&&C.instanceMatrix&&(te=C.instanceMatrix),de==="instanceColor"&&C.instanceColor&&(te=C.instanceColor));const se={};se.attribute=te,te&&te.data&&(se.data=te.data),ee[de]=se,ne++}l.attributes=ee,l.attributesNum=ne,l.index=$}function v(){const C=l.newAttributes;for(let z=0,q=C.length;z<q;z++)C[z]=0}function E(C){P(C,0)}function P(C,z){const q=l.newAttributes,$=l.enabledAttributes,ee=l.attributeDivisors;q[C]=1,$[C]===0&&(n.enableVertexAttribArray(C),$[C]=1),ee[C]!==z&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](C,z),ee[C]=z)}function A(){const C=l.newAttributes,z=l.enabledAttributes;for(let q=0,$=z.length;q<$;q++)z[q]!==C[q]&&(n.disableVertexAttribArray(q),z[q]=0)}function T(C,z,q,$,ee,Z,ne){ne===!0?n.vertexAttribIPointer(C,z,q,ee,Z):n.vertexAttribPointer(C,z,q,$,ee,Z)}function K(C,z,q,$){if(i.isWebGL2===!1&&(C.isInstancedMesh||$.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const ee=$.attributes,Z=q.getAttributes(),ne=z.defaultAttributeValues;for(const ce in Z){const de=Z[ce];if(de.location>=0){let k=ee[ce];if(k===void 0&&(ce==="instanceMatrix"&&C.instanceMatrix&&(k=C.instanceMatrix),ce==="instanceColor"&&C.instanceColor&&(k=C.instanceColor)),k!==void 0){const te=k.normalized,se=k.itemSize,Re=t.get(k);if(Re===void 0)continue;const Pe=Re.buffer,et=Re.type,We=Re.bytesPerElement,Ve=i.isWebGL2===!0&&(et===n.INT||et===n.UNSIGNED_INT||k.gpuType===ml);if(k.isInterleavedBufferAttribute){const lt=k.data,j=lt.stride,Lt=k.offset;if(lt.isInstancedInterleavedBuffer){for(let Be=0;Be<de.locationSize;Be++)P(de.location+Be,lt.meshPerAttribute);C.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let Be=0;Be<de.locationSize;Be++)E(de.location+Be);n.bindBuffer(n.ARRAY_BUFFER,Pe);for(let Be=0;Be<de.locationSize;Be++)T(de.location+Be,se/de.locationSize,et,te,j*We,(Lt+se/de.locationSize*Be)*We,Ve)}else{if(k.isInstancedBufferAttribute){for(let lt=0;lt<de.locationSize;lt++)P(de.location+lt,k.meshPerAttribute);C.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let lt=0;lt<de.locationSize;lt++)E(de.location+lt);n.bindBuffer(n.ARRAY_BUFFER,Pe);for(let lt=0;lt<de.locationSize;lt++)T(de.location+lt,se/de.locationSize,et,te,se*We,se/de.locationSize*lt*We,Ve)}}else if(ne!==void 0){const te=ne[ce];if(te!==void 0)switch(te.length){case 2:n.vertexAttrib2fv(de.location,te);break;case 3:n.vertexAttrib3fv(de.location,te);break;case 4:n.vertexAttrib4fv(de.location,te);break;default:n.vertexAttrib1fv(de.location,te)}}}}A()}function M(){D();for(const C in o){const z=o[C];for(const q in z){const $=z[q];for(const ee in $)_($[ee].object),delete $[ee];delete z[q]}delete o[C]}}function w(C){if(o[C.id]===void 0)return;const z=o[C.id];for(const q in z){const $=z[q];for(const ee in $)_($[ee].object),delete $[ee];delete z[q]}delete o[C.id]}function F(C){for(const z in o){const q=o[z];if(q[C.id]===void 0)continue;const $=q[C.id];for(const ee in $)_($[ee].object),delete $[ee];delete q[C.id]}}function D(){X(),h=!0,l!==c&&(l=c,m(l.object))}function X(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:f,reset:D,resetDefaultState:X,dispose:M,releaseStatesOfGeometry:w,releaseStatesOfProgram:F,initAttributes:v,enableAttribute:E,disableUnusedAttributes:A}}function Vp(n,e,t,i){const r=i.isWebGL2;let s;function a(h){s=h}function o(h,f){n.drawArrays(s,h,f),t.update(f,s,1)}function c(h,f,d){if(d===0)return;let m,_;if(r)m=n,_="drawArraysInstanced";else if(m=e.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[_](s,h,f,d),t.update(f,s,d)}function l(h,f,d){if(d===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<d;_++)this.render(h[_],f[_]);else{m.multiDrawArraysWEBGL(s,h,0,f,0,d);let _=0;for(let g=0;g<d;g++)_+=f[g];t.update(_,s,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function $p(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const c=s(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);const l=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),p=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),u=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),v=d>0,E=a||e.has("OES_texture_float"),P=v&&E,A=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:h,maxTextures:f,maxVertexTextures:d,maxTextureSize:m,maxCubemapSize:_,maxAttributes:g,maxVertexUniforms:p,maxVaryings:u,maxFragmentUniforms:x,vertexTextures:v,floatFragmentTextures:E,floatVertexTextures:P,maxSamples:A}}function Xp(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new Wn,o=new dt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const m=f.length!==0||d||i!==0||r;return r=d,i=f.length,m},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){t=h(f,d,0)},this.setState=function(f,d,m){const _=f.clippingPlanes,g=f.clipIntersection,p=f.clipShadows,u=n.get(f);if(!r||_===null||_.length===0||s&&!p)s?h(null):l();else{const x=s?0:i,v=x*4;let E=u.clippingState||null;c.value=E,E=h(_,d,v,m);for(let P=0;P!==v;++P)E[P]=t[P];u.clippingState=E,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(f,d,m,_){const g=f!==null?f.length:0;let p=null;if(g!==0){if(p=c.value,_!==!0||p===null){const u=m+g*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(p===null||p.length<u)&&(p=new Float32Array(u));for(let v=0,E=m;v!==g;++v,E+=4)a.copy(f[v]).applyMatrix4(x,o),a.normal.toArray(p,E),p[E+3]=a.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,p}}function jp(n){let e=new WeakMap;function t(a,o){return o===bo?a.mapping=er:o===wo&&(a.mapping=tr),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===bo||o===wo)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new rd(c.height/2);return l.fromEquirectangularTexture(n,a),e.set(a,l),a.addEventListener("dispose",r),t(l.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Ol extends Dl{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ki=4,oc=[.125,.215,.35,.446,.526,.582],di=20,lo=new Ol,ac=new st;let uo=null,ho=0,fo=0;const li=(1+Math.sqrt(5))/2,Vi=1/li,cc=[new U(1,1,1),new U(-1,1,1),new U(1,1,-1),new U(-1,1,-1),new U(0,li,Vi),new U(0,li,-Vi),new U(Vi,0,li),new U(-Vi,0,li),new U(li,Vi,0),new U(-li,Vi,0)];class lc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){uo=this._renderer.getRenderTarget(),ho=this._renderer.getActiveCubeFace(),fo=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=dc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(uo,ho,fo),e.scissorTest=!1,os(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===er||e.mapping===tr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),uo=this._renderer.getRenderTarget(),ho=this._renderer.getActiveCubeFace(),fo=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:ln,minFilter:ln,generateMipmaps:!1,type:Cr,format:xn,colorSpace:Fn,depthBuffer:!1},r=uc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=uc(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=qp(s)),this._blurMaterial=Yp(s,e,t)}return r}_compileMaterial(e){const t=new Kt(this._lodPlanes[0],e);this._renderer.compile(t,lo)}_sceneToCubeUV(e,t,i,r){const o=new hn(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(ac),h.toneMapping=Kn,h.autoClear=!1;const m=new qo({name:"PMREM.Background",side:qt,depthWrite:!1,depthTest:!1}),_=new Kt(new Or,m);let g=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,g=!0):(m.color.copy(ac),g=!0);for(let u=0;u<6;u++){const x=u%3;x===0?(o.up.set(0,c[u],0),o.lookAt(l[u],0,0)):x===1?(o.up.set(0,0,c[u]),o.lookAt(0,l[u],0)):(o.up.set(0,c[u],0),o.lookAt(0,0,l[u]));const v=this._cubeSize;os(r,x*v,u>2?v:0,v,v),h.setRenderTarget(r),g&&h.render(_,o),h.render(e,o)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=d,h.autoClear=f,e.background=p}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===er||e.mapping===tr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=dc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Kt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;os(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,lo)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=cc[(r-1)%cc.length];this._blur(e,r-1,r,s,a)}t.autoClear=i}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new Kt(this._lodPlanes[r],l),d=l.uniforms,m=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*di-1),g=s/_,p=isFinite(s)?1+Math.floor(h*g):di;p>di&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${di}`);const u=[];let x=0;for(let T=0;T<di;++T){const K=T/g,M=Math.exp(-K*K/2);u.push(M),T===0?x+=M:T<p&&(x+=2*M)}for(let T=0;T<u.length;T++)u[T]=u[T]/x;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=u,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:v}=this;d.dTheta.value=_,d.mipInt.value=v-i;const E=this._sizeLods[r],P=3*E*(r>v-Ki?r-v+Ki:0),A=4*(this._cubeSize-E);os(t,P,A,3*E,2*E),c.setRenderTarget(t),c.render(f,lo)}}function qp(n){const e=[],t=[],i=[];let r=n;const s=n-Ki+1+oc.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let c=1/o;a>n-Ki?c=oc[a-n+Ki-1]:a===0&&(c=0),i.push(c);const l=1/(o-2),h=-l,f=1+l,d=[h,h,f,h,f,f,h,h,f,f,h,f],m=6,_=6,g=3,p=2,u=1,x=new Float32Array(g*_*m),v=new Float32Array(p*_*m),E=new Float32Array(u*_*m);for(let A=0;A<m;A++){const T=A%3*2/3-1,K=A>2?0:-1,M=[T,K,0,T+2/3,K,0,T+2/3,K+1,0,T,K,0,T+2/3,K+1,0,T,K+1,0];x.set(M,g*_*A),v.set(d,p*_*A);const w=[A,A,A,A,A,A];E.set(w,u*_*A)}const P=new on;P.setAttribute("position",new Mn(x,g)),P.setAttribute("uv",new Mn(v,p)),P.setAttribute("faceIndex",new Mn(E,u)),e.push(P),r>Ki&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function uc(n,e,t){const i=new vi(n,e,t);return i.texture.mapping=Ps,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function os(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Yp(n,e,t){const i=new Float32Array(di),r=new U(0,1,0);return new yi({name:"SphericalGaussianBlur",defines:{n:di,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Zo(),fragmentShader:`

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
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function hc(){return new yi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zo(),fragmentShader:`

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
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function dc(){return new yi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function Zo(){return`

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
	`}function Kp(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const c=o.mapping,l=c===bo||c===wo,h=c===er||c===tr;if(l||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let f=e.get(o);return t===null&&(t=new lc(n)),f=l?t.fromEquirectangular(o,f):t.fromCubemap(o,f),e.set(o,f),f.texture}else{if(e.has(o))return e.get(o).texture;{const f=o.image;if(l&&f&&f.height>0||h&&f&&r(f)){t===null&&(t=new lc(n));const d=l?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",s),d.texture}else return null}}}return o}function r(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function s(o){const c=o.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function Zp(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Jp(n,e,t,i){const r={},s=new WeakMap;function a(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);for(const _ in d.morphAttributes){const g=d.morphAttributes[_];for(let p=0,u=g.length;p<u;p++)e.remove(g[p])}d.removeEventListener("dispose",a),delete r[d.id];const m=s.get(d);m&&(e.remove(m),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function c(f){const d=f.attributes;for(const _ in d)e.update(d[_],n.ARRAY_BUFFER);const m=f.morphAttributes;for(const _ in m){const g=m[_];for(let p=0,u=g.length;p<u;p++)e.update(g[p],n.ARRAY_BUFFER)}}function l(f){const d=[],m=f.index,_=f.attributes.position;let g=0;if(m!==null){const x=m.array;g=m.version;for(let v=0,E=x.length;v<E;v+=3){const P=x[v+0],A=x[v+1],T=x[v+2];d.push(P,A,A,T,T,P)}}else if(_!==void 0){const x=_.array;g=_.version;for(let v=0,E=x.length/3-1;v<E;v+=3){const P=v+0,A=v+1,T=v+2;d.push(P,A,A,T,T,P)}}else return;const p=new(wl(d)?Pl:Ll)(d,1);p.version=g;const u=s.get(f);u&&e.remove(u),s.set(f,p)}function h(f){const d=s.get(f);if(d){const m=f.index;m!==null&&d.version<m.version&&l(f)}else l(f);return s.get(f)}return{get:o,update:c,getWireframeAttribute:h}}function Qp(n,e,t,i){const r=i.isWebGL2;let s;function a(m){s=m}let o,c;function l(m){o=m.type,c=m.bytesPerElement}function h(m,_){n.drawElements(s,_,o,m*c),t.update(_,s,1)}function f(m,_,g){if(g===0)return;let p,u;if(r)p=n,u="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),u="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[u](s,_,o,m*c,g),t.update(_,s,g)}function d(m,_,g){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let u=0;u<g;u++)this.render(m[u]/c,_[u]);else{p.multiDrawElementsWEBGL(s,_,0,o,m,0,g);let u=0;for(let x=0;x<g;x++)u+=_[x];t.update(u,s,1)}}this.setMode=a,this.setIndex=l,this.render=h,this.renderInstances=f,this.renderMultiDraw=d}function em(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function tm(n,e){return n[0]-e[0]}function nm(n,e){return Math.abs(e[1])-Math.abs(n[1])}function im(n,e,t){const i={},r=new Float32Array(8),s=new WeakMap,a=new zt,o=[];for(let l=0;l<8;l++)o[l]=[l,0];function c(l,h,f){const d=l.morphTargetInfluences;if(e.isWebGL2===!0){const _=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=_!==void 0?_.length:0;let p=s.get(h);if(p===void 0||p.count!==g){let z=function(){X.dispose(),s.delete(h),h.removeEventListener("dispose",z)};var m=z;p!==void 0&&p.texture.dispose();const v=h.morphAttributes.position!==void 0,E=h.morphAttributes.normal!==void 0,P=h.morphAttributes.color!==void 0,A=h.morphAttributes.position||[],T=h.morphAttributes.normal||[],K=h.morphAttributes.color||[];let M=0;v===!0&&(M=1),E===!0&&(M=2),P===!0&&(M=3);let w=h.attributes.position.count*M,F=1;w>e.maxTextureSize&&(F=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const D=new Float32Array(w*F*4*g),X=new Rl(D,w,F,g);X.type=jn,X.needsUpdate=!0;const C=M*4;for(let q=0;q<g;q++){const $=A[q],ee=T[q],Z=K[q],ne=w*F*4*q;for(let ce=0;ce<$.count;ce++){const de=ce*C;v===!0&&(a.fromBufferAttribute($,ce),D[ne+de+0]=a.x,D[ne+de+1]=a.y,D[ne+de+2]=a.z,D[ne+de+3]=0),E===!0&&(a.fromBufferAttribute(ee,ce),D[ne+de+4]=a.x,D[ne+de+5]=a.y,D[ne+de+6]=a.z,D[ne+de+7]=0),P===!0&&(a.fromBufferAttribute(Z,ce),D[ne+de+8]=a.x,D[ne+de+9]=a.y,D[ne+de+10]=a.z,D[ne+de+11]=Z.itemSize===4?a.w:1)}}p={count:g,texture:X,size:new je(w,F)},s.set(h,p),h.addEventListener("dispose",z)}let u=0;for(let v=0;v<d.length;v++)u+=d[v];const x=h.morphTargetsRelative?1:1-u;f.getUniforms().setValue(n,"morphTargetBaseInfluence",x),f.getUniforms().setValue(n,"morphTargetInfluences",d),f.getUniforms().setValue(n,"morphTargetsTexture",p.texture,t),f.getUniforms().setValue(n,"morphTargetsTextureSize",p.size)}else{const _=d===void 0?0:d.length;let g=i[h.id];if(g===void 0||g.length!==_){g=[];for(let E=0;E<_;E++)g[E]=[E,0];i[h.id]=g}for(let E=0;E<_;E++){const P=g[E];P[0]=E,P[1]=d[E]}g.sort(nm);for(let E=0;E<8;E++)E<_&&g[E][1]?(o[E][0]=g[E][0],o[E][1]=g[E][1]):(o[E][0]=Number.MAX_SAFE_INTEGER,o[E][1]=0);o.sort(tm);const p=h.morphAttributes.position,u=h.morphAttributes.normal;let x=0;for(let E=0;E<8;E++){const P=o[E],A=P[0],T=P[1];A!==Number.MAX_SAFE_INTEGER&&T?(p&&h.getAttribute("morphTarget"+E)!==p[A]&&h.setAttribute("morphTarget"+E,p[A]),u&&h.getAttribute("morphNormal"+E)!==u[A]&&h.setAttribute("morphNormal"+E,u[A]),r[E]=T,x+=T):(p&&h.hasAttribute("morphTarget"+E)===!0&&h.deleteAttribute("morphTarget"+E),u&&h.hasAttribute("morphNormal"+E)===!0&&h.deleteAttribute("morphNormal"+E),r[E]=0)}const v=h.morphTargetsRelative?1:1-x;f.getUniforms().setValue(n,"morphTargetBaseInfluence",v),f.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:c}}function rm(n,e,t,i){let r=new WeakMap;function s(c){const l=i.render.frame,h=c.geometry,f=e.get(c,h);if(r.get(f)!==l&&(e.update(f),r.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==l&&(d.update(),r.set(d,l))}return f}function a(){r=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:a}}class Fl extends tn{constructor(e,t,i,r,s,a,o,c,l,h){if(h=h!==void 0?h:pi,h!==pi&&h!==nr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===pi&&(i=Xn),i===void 0&&h===nr&&(i=fi),super(null,r,s,a,o,c,h,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:jt,this.minFilter=c!==void 0?c:jt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Bl=new tn,zl=new Fl(1,1);zl.compareFunction=bl;const kl=new Rl,Hl=new Hh,Gl=new Ul,fc=[],pc=[],mc=new Float32Array(16),gc=new Float32Array(9),_c=new Float32Array(4);function lr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=fc[r];if(s===void 0&&(s=new Float32Array(r),fc[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Nt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ot(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Us(n,e){let t=pc[e];t===void 0&&(t=new Int32Array(e),pc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function sm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function om(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2fv(this.addr,e),Ot(t,e)}}function am(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nt(t,e))return;n.uniform3fv(this.addr,e),Ot(t,e)}}function cm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4fv(this.addr,e),Ot(t,e)}}function lm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ot(t,e)}else{if(Nt(t,i))return;_c.set(i),n.uniformMatrix2fv(this.addr,!1,_c),Ot(t,i)}}function um(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ot(t,e)}else{if(Nt(t,i))return;gc.set(i),n.uniformMatrix3fv(this.addr,!1,gc),Ot(t,i)}}function hm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ot(t,e)}else{if(Nt(t,i))return;mc.set(i),n.uniformMatrix4fv(this.addr,!1,mc),Ot(t,i)}}function dm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function fm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2iv(this.addr,e),Ot(t,e)}}function pm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3iv(this.addr,e),Ot(t,e)}}function mm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4iv(this.addr,e),Ot(t,e)}}function gm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function _m(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2uiv(this.addr,e),Ot(t,e)}}function vm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3uiv(this.addr,e),Ot(t,e)}}function xm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4uiv(this.addr,e),Ot(t,e)}}function ym(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);const s=this.type===n.SAMPLER_2D_SHADOW?zl:Bl;t.setTexture2D(e||s,r)}function Mm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Hl,r)}function Sm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Gl,r)}function Em(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||kl,r)}function bm(n){switch(n){case 5126:return sm;case 35664:return om;case 35665:return am;case 35666:return cm;case 35674:return lm;case 35675:return um;case 35676:return hm;case 5124:case 35670:return dm;case 35667:case 35671:return fm;case 35668:case 35672:return pm;case 35669:case 35673:return mm;case 5125:return gm;case 36294:return _m;case 36295:return vm;case 36296:return xm;case 35678:case 36198:case 36298:case 36306:case 35682:return ym;case 35679:case 36299:case 36307:return Mm;case 35680:case 36300:case 36308:case 36293:return Sm;case 36289:case 36303:case 36311:case 36292:return Em}}function wm(n,e){n.uniform1fv(this.addr,e)}function Tm(n,e){const t=lr(e,this.size,2);n.uniform2fv(this.addr,t)}function Am(n,e){const t=lr(e,this.size,3);n.uniform3fv(this.addr,t)}function Rm(n,e){const t=lr(e,this.size,4);n.uniform4fv(this.addr,t)}function Cm(n,e){const t=lr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Lm(n,e){const t=lr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Pm(n,e){const t=lr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Im(n,e){n.uniform1iv(this.addr,e)}function Dm(n,e){n.uniform2iv(this.addr,e)}function Um(n,e){n.uniform3iv(this.addr,e)}function Nm(n,e){n.uniform4iv(this.addr,e)}function Om(n,e){n.uniform1uiv(this.addr,e)}function Fm(n,e){n.uniform2uiv(this.addr,e)}function Bm(n,e){n.uniform3uiv(this.addr,e)}function zm(n,e){n.uniform4uiv(this.addr,e)}function km(n,e,t){const i=this.cache,r=e.length,s=Us(t,r);Nt(i,s)||(n.uniform1iv(this.addr,s),Ot(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Bl,s[a])}function Hm(n,e,t){const i=this.cache,r=e.length,s=Us(t,r);Nt(i,s)||(n.uniform1iv(this.addr,s),Ot(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Hl,s[a])}function Gm(n,e,t){const i=this.cache,r=e.length,s=Us(t,r);Nt(i,s)||(n.uniform1iv(this.addr,s),Ot(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Gl,s[a])}function Wm(n,e,t){const i=this.cache,r=e.length,s=Us(t,r);Nt(i,s)||(n.uniform1iv(this.addr,s),Ot(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||kl,s[a])}function Vm(n){switch(n){case 5126:return wm;case 35664:return Tm;case 35665:return Am;case 35666:return Rm;case 35674:return Cm;case 35675:return Lm;case 35676:return Pm;case 5124:case 35670:return Im;case 35667:case 35671:return Dm;case 35668:case 35672:return Um;case 35669:case 35673:return Nm;case 5125:return Om;case 36294:return Fm;case 36295:return Bm;case 36296:return zm;case 35678:case 36198:case 36298:case 36306:case 35682:return km;case 35679:case 36299:case 36307:return Hm;case 35680:case 36300:case 36308:case 36293:return Gm;case 36289:case 36303:case 36311:case 36292:return Wm}}class $m{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=bm(t.type)}}class Xm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Vm(t.type)}}class jm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const po=/(\w+)(\])?(\[|\.)?/g;function vc(n,e){n.seq.push(e),n.map[e.id]=e}function qm(n,e,t){const i=n.name,r=i.length;for(po.lastIndex=0;;){const s=po.exec(i),a=po.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){vc(t,l===void 0?new $m(o,n,e):new Xm(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new jm(o),vc(t,f)),t=f}}}class gs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);qm(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function xc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Ym=37297;let Km=0;function Zm(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function Jm(n){const e=yt.getPrimaries(yt.workingColorSpace),t=yt.getPrimaries(n);let i;switch(e===t?i="":e===Ms&&t===ys?i="LinearDisplayP3ToLinearSRGB":e===ys&&t===Ms&&(i="LinearSRGBToLinearDisplayP3"),n){case Fn:case Is:return[i,"LinearTransferOETF"];case Bt:case $o:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function yc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Zm(n.getShaderSource(e),a)}else return r}function Qm(n,e){const t=Jm(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function eg(n,e){let t;switch(e){case Ju:t="Linear";break;case Qu:t="Reinhard";break;case eh:t="OptimizedCineon";break;case fl:t="ACESFilmic";break;case nh:t="AgX";break;case th:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function tg(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Zi).join(`
`)}function ng(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Zi).join(`
`)}function ig(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function rg(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Zi(n){return n!==""}function Mc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Sc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const sg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Po(n){return n.replace(sg,ag)}const og=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function ag(n,e){let t=at[e];if(t===void 0){const i=og.get(e);if(i!==void 0)t=at[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Po(t)}const cg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ec(n){return n.replace(cg,lg)}function lg(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function bc(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function ug(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===hl?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Tu?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Pn&&(e="SHADOWMAP_TYPE_VSM"),e}function hg(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case er:case tr:e="ENVMAP_TYPE_CUBE";break;case Ps:e="ENVMAP_TYPE_CUBE_UV";break}return e}function dg(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case tr:e="ENVMAP_MODE_REFRACTION";break}return e}function fg(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case dl:e="ENVMAP_BLENDING_MULTIPLY";break;case Ku:e="ENVMAP_BLENDING_MIX";break;case Zu:e="ENVMAP_BLENDING_ADD";break}return e}function pg(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function mg(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=ug(t),l=hg(t),h=dg(t),f=fg(t),d=pg(t),m=t.isWebGL2?"":tg(t),_=ng(t),g=ig(s),p=r.createProgram();let u,x,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Zi).join(`
`),u.length>0&&(u+=`
`),x=[m,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Zi).join(`
`),x.length>0&&(x+=`
`)):(u=[bc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zi).join(`
`),x=[m,bc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Kn?"#define TONE_MAPPING":"",t.toneMapping!==Kn?at.tonemapping_pars_fragment:"",t.toneMapping!==Kn?eg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",at.colorspace_pars_fragment,Qm("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Zi).join(`
`)),a=Po(a),a=Mc(a,t),a=Sc(a,t),o=Po(o),o=Mc(o,t),o=Sc(o,t),a=Ec(a),o=Ec(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,u=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,x=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Ga?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ga?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const E=v+u+a,P=v+x+o,A=xc(r,r.VERTEX_SHADER,E),T=xc(r,r.FRAGMENT_SHADER,P);r.attachShader(p,A),r.attachShader(p,T),t.index0AttributeName!==void 0?r.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(p,0,"position"),r.linkProgram(p);function K(D){if(n.debug.checkShaderErrors){const X=r.getProgramInfoLog(p).trim(),C=r.getShaderInfoLog(A).trim(),z=r.getShaderInfoLog(T).trim();let q=!0,$=!0;if(r.getProgramParameter(p,r.LINK_STATUS)===!1)if(q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,p,A,T);else{const ee=yc(r,A,"vertex"),Z=yc(r,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(p,r.VALIDATE_STATUS)+`

Program Info Log: `+X+`
`+ee+`
`+Z)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(C===""||z==="")&&($=!1);$&&(D.diagnostics={runnable:q,programLog:X,vertexShader:{log:C,prefix:u},fragmentShader:{log:z,prefix:x}})}r.deleteShader(A),r.deleteShader(T),M=new gs(r,p),w=rg(r,p)}let M;this.getUniforms=function(){return M===void 0&&K(this),M};let w;this.getAttributes=function(){return w===void 0&&K(this),w};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=r.getProgramParameter(p,Ym)),F},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Km++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=A,this.fragmentShader=T,this}let gg=0;class _g{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new vg(e),t.set(e,i)),i}}class vg{constructor(e){this.id=gg++,this.code=e,this.usedTimes=0}}function xg(n,e,t,i,r,s,a){const o=new jo,c=new _g,l=[],h=r.isWebGL2,f=r.logarithmicDepthBuffer,d=r.vertexTextures;let m=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(M){return M===0?"uv":`uv${M}`}function p(M,w,F,D,X){const C=D.fog,z=X.geometry,q=M.isMeshStandardMaterial?D.environment:null,$=(M.isMeshStandardMaterial?t:e).get(M.envMap||q),ee=$&&$.mapping===Ps?$.image.height:null,Z=_[M.type];M.precision!==null&&(m=r.getMaxPrecision(M.precision),m!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",m,"instead."));const ne=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,ce=ne!==void 0?ne.length:0;let de=0;z.morphAttributes.position!==void 0&&(de=1),z.morphAttributes.normal!==void 0&&(de=2),z.morphAttributes.color!==void 0&&(de=3);let k,te,se,Re;if(Z){const W=Sn[Z];k=W.vertexShader,te=W.fragmentShader}else k=M.vertexShader,te=M.fragmentShader,c.update(M),se=c.getVertexShaderID(M),Re=c.getFragmentShaderID(M);const Pe=n.getRenderTarget(),et=X.isInstancedMesh===!0,We=X.isBatchedMesh===!0,Ve=!!M.map,lt=!!M.matcap,j=!!$,Lt=!!M.aoMap,Be=!!M.lightMap,$e=!!M.bumpMap,Te=!!M.normalMap,gt=!!M.displacementMap,Je=!!M.emissiveMap,b=!!M.metalnessMap,y=!!M.roughnessMap,V=M.anisotropy>0,le=M.clearcoat>0,ie=M.iridescence>0,ue=M.sheen>0,Ce=M.transmission>0,ye=V&&!!M.anisotropyMap,we=le&&!!M.clearcoatMap,Ge=le&&!!M.clearcoatNormalMap,nt=le&&!!M.clearcoatRoughnessMap,oe=ie&&!!M.iridescenceMap,pt=ie&&!!M.iridescenceThicknessMap,ot=ue&&!!M.sheenColorMap,Ye=ue&&!!M.sheenRoughnessMap,De=!!M.specularMap,Me=!!M.specularColorMap,R=!!M.specularIntensityMap,he=Ce&&!!M.transmissionMap,Ie=Ce&&!!M.thicknessMap,be=!!M.gradientMap,ae=!!M.alphaMap,I=M.alphaTest>0,fe=!!M.alphaHash,xe=!!M.extensions,Xe=!!z.attributes.uv1,ke=!!z.attributes.uv2,ut=!!z.attributes.uv3;let ct=Kn;return M.toneMapped&&(Pe===null||Pe.isXRRenderTarget===!0)&&(ct=n.toneMapping),{isWebGL2:h,shaderID:Z,shaderType:M.type,shaderName:M.name,vertexShader:k,fragmentShader:te,defines:M.defines,customVertexShaderID:se,customFragmentShaderID:Re,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:m,batching:We,instancing:et,instancingColor:et&&X.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:Pe===null?n.outputColorSpace:Pe.isXRRenderTarget===!0?Pe.texture.colorSpace:Fn,map:Ve,matcap:lt,envMap:j,envMapMode:j&&$.mapping,envMapCubeUVHeight:ee,aoMap:Lt,lightMap:Be,bumpMap:$e,normalMap:Te,displacementMap:d&&gt,emissiveMap:Je,normalMapObjectSpace:Te&&M.normalMapType===ph,normalMapTangentSpace:Te&&M.normalMapType===El,metalnessMap:b,roughnessMap:y,anisotropy:V,anisotropyMap:ye,clearcoat:le,clearcoatMap:we,clearcoatNormalMap:Ge,clearcoatRoughnessMap:nt,iridescence:ie,iridescenceMap:oe,iridescenceThicknessMap:pt,sheen:ue,sheenColorMap:ot,sheenRoughnessMap:Ye,specularMap:De,specularColorMap:Me,specularIntensityMap:R,transmission:Ce,transmissionMap:he,thicknessMap:Ie,gradientMap:be,opaque:M.transparent===!1&&M.blending===Ji,alphaMap:ae,alphaTest:I,alphaHash:fe,combine:M.combine,mapUv:Ve&&g(M.map.channel),aoMapUv:Lt&&g(M.aoMap.channel),lightMapUv:Be&&g(M.lightMap.channel),bumpMapUv:$e&&g(M.bumpMap.channel),normalMapUv:Te&&g(M.normalMap.channel),displacementMapUv:gt&&g(M.displacementMap.channel),emissiveMapUv:Je&&g(M.emissiveMap.channel),metalnessMapUv:b&&g(M.metalnessMap.channel),roughnessMapUv:y&&g(M.roughnessMap.channel),anisotropyMapUv:ye&&g(M.anisotropyMap.channel),clearcoatMapUv:we&&g(M.clearcoatMap.channel),clearcoatNormalMapUv:Ge&&g(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:nt&&g(M.clearcoatRoughnessMap.channel),iridescenceMapUv:oe&&g(M.iridescenceMap.channel),iridescenceThicknessMapUv:pt&&g(M.iridescenceThicknessMap.channel),sheenColorMapUv:ot&&g(M.sheenColorMap.channel),sheenRoughnessMapUv:Ye&&g(M.sheenRoughnessMap.channel),specularMapUv:De&&g(M.specularMap.channel),specularColorMapUv:Me&&g(M.specularColorMap.channel),specularIntensityMapUv:R&&g(M.specularIntensityMap.channel),transmissionMapUv:he&&g(M.transmissionMap.channel),thicknessMapUv:Ie&&g(M.thicknessMap.channel),alphaMapUv:ae&&g(M.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Te||V),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,vertexUv1s:Xe,vertexUv2s:ke,vertexUv3s:ut,pointsUvs:X.isPoints===!0&&!!z.attributes.uv&&(Ve||ae),fog:!!C,useFog:M.fog===!0,fogExp2:C&&C.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:X.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:ce,morphTextureStride:de,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&F.length>0,shadowMapType:n.shadowMap.type,toneMapping:ct,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Ve&&M.map.isVideoTexture===!0&&yt.getTransfer(M.map.colorSpace)===wt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===In,flipSided:M.side===qt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:xe&&M.extensions.derivatives===!0,extensionFragDepth:xe&&M.extensions.fragDepth===!0,extensionDrawBuffers:xe&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:xe&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:xe&&M.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function u(M){const w=[];if(M.shaderID?w.push(M.shaderID):(w.push(M.customVertexShaderID),w.push(M.customFragmentShaderID)),M.defines!==void 0)for(const F in M.defines)w.push(F),w.push(M.defines[F]);return M.isRawShaderMaterial===!1&&(x(w,M),v(w,M),w.push(n.outputColorSpace)),w.push(M.customProgramCacheKey),w.join()}function x(M,w){M.push(w.precision),M.push(w.outputColorSpace),M.push(w.envMapMode),M.push(w.envMapCubeUVHeight),M.push(w.mapUv),M.push(w.alphaMapUv),M.push(w.lightMapUv),M.push(w.aoMapUv),M.push(w.bumpMapUv),M.push(w.normalMapUv),M.push(w.displacementMapUv),M.push(w.emissiveMapUv),M.push(w.metalnessMapUv),M.push(w.roughnessMapUv),M.push(w.anisotropyMapUv),M.push(w.clearcoatMapUv),M.push(w.clearcoatNormalMapUv),M.push(w.clearcoatRoughnessMapUv),M.push(w.iridescenceMapUv),M.push(w.iridescenceThicknessMapUv),M.push(w.sheenColorMapUv),M.push(w.sheenRoughnessMapUv),M.push(w.specularMapUv),M.push(w.specularColorMapUv),M.push(w.specularIntensityMapUv),M.push(w.transmissionMapUv),M.push(w.thicknessMapUv),M.push(w.combine),M.push(w.fogExp2),M.push(w.sizeAttenuation),M.push(w.morphTargetsCount),M.push(w.morphAttributeCount),M.push(w.numDirLights),M.push(w.numPointLights),M.push(w.numSpotLights),M.push(w.numSpotLightMaps),M.push(w.numHemiLights),M.push(w.numRectAreaLights),M.push(w.numDirLightShadows),M.push(w.numPointLightShadows),M.push(w.numSpotLightShadows),M.push(w.numSpotLightShadowsWithMaps),M.push(w.numLightProbes),M.push(w.shadowMapType),M.push(w.toneMapping),M.push(w.numClippingPlanes),M.push(w.numClipIntersection),M.push(w.depthPacking)}function v(M,w){o.disableAll(),w.isWebGL2&&o.enable(0),w.supportsVertexTextures&&o.enable(1),w.instancing&&o.enable(2),w.instancingColor&&o.enable(3),w.matcap&&o.enable(4),w.envMap&&o.enable(5),w.normalMapObjectSpace&&o.enable(6),w.normalMapTangentSpace&&o.enable(7),w.clearcoat&&o.enable(8),w.iridescence&&o.enable(9),w.alphaTest&&o.enable(10),w.vertexColors&&o.enable(11),w.vertexAlphas&&o.enable(12),w.vertexUv1s&&o.enable(13),w.vertexUv2s&&o.enable(14),w.vertexUv3s&&o.enable(15),w.vertexTangents&&o.enable(16),w.anisotropy&&o.enable(17),w.alphaHash&&o.enable(18),w.batching&&o.enable(19),M.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.skinning&&o.enable(4),w.morphTargets&&o.enable(5),w.morphNormals&&o.enable(6),w.morphColors&&o.enable(7),w.premultipliedAlpha&&o.enable(8),w.shadowMapEnabled&&o.enable(9),w.useLegacyLights&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),M.push(o.mask)}function E(M){const w=_[M.type];let F;if(w){const D=Sn[w];F=ed.clone(D.uniforms)}else F=M.uniforms;return F}function P(M,w){let F;for(let D=0,X=l.length;D<X;D++){const C=l[D];if(C.cacheKey===w){F=C,++F.usedTimes;break}}return F===void 0&&(F=new mg(n,w,M,s),l.push(F)),F}function A(M){if(--M.usedTimes===0){const w=l.indexOf(M);l[w]=l[l.length-1],l.pop(),M.destroy()}}function T(M){c.remove(M)}function K(){c.dispose()}return{getParameters:p,getProgramCacheKey:u,getUniforms:E,acquireProgram:P,releaseProgram:A,releaseShaderCache:T,programs:l,dispose:K}}function yg(){let n=new WeakMap;function e(s){let a=n.get(s);return a===void 0&&(a={},n.set(s,a)),a}function t(s){n.delete(s)}function i(s,a,o){n.get(s)[a]=o}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function Mg(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function wc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Tc(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(f,d,m,_,g,p){let u=n[e];return u===void 0?(u={id:f.id,object:f,geometry:d,material:m,groupOrder:_,renderOrder:f.renderOrder,z:g,group:p},n[e]=u):(u.id=f.id,u.object=f,u.geometry=d,u.material=m,u.groupOrder=_,u.renderOrder=f.renderOrder,u.z=g,u.group=p),e++,u}function o(f,d,m,_,g,p){const u=a(f,d,m,_,g,p);m.transmission>0?i.push(u):m.transparent===!0?r.push(u):t.push(u)}function c(f,d,m,_,g,p){const u=a(f,d,m,_,g,p);m.transmission>0?i.unshift(u):m.transparent===!0?r.unshift(u):t.unshift(u)}function l(f,d){t.length>1&&t.sort(f||Mg),i.length>1&&i.sort(d||wc),r.length>1&&r.sort(d||wc)}function h(){for(let f=e,d=n.length;f<d;f++){const m=n[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:c,finish:h,sort:l}}function Sg(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Tc,n.set(i,[a])):r>=s.length?(a=new Tc,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Eg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new st};break;case"SpotLight":t={position:new U,direction:new U,color:new st,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new st,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new st,groundColor:new st};break;case"RectAreaLight":t={color:new st,position:new U,halfWidth:new U,halfHeight:new U};break}return n[e.id]=t,t}}}function bg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let wg=0;function Tg(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Ag(n,e){const t=new Eg,i=bg(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)r.probe.push(new U);const s=new U,a=new Ct,o=new Ct;function c(h,f){let d=0,m=0,_=0;for(let D=0;D<9;D++)r.probe[D].set(0,0,0);let g=0,p=0,u=0,x=0,v=0,E=0,P=0,A=0,T=0,K=0,M=0;h.sort(Tg);const w=f===!0?Math.PI:1;for(let D=0,X=h.length;D<X;D++){const C=h[D],z=C.color,q=C.intensity,$=C.distance,ee=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)d+=z.r*q*w,m+=z.g*q*w,_+=z.b*q*w;else if(C.isLightProbe){for(let Z=0;Z<9;Z++)r.probe[Z].addScaledVector(C.sh.coefficients[Z],q);M++}else if(C.isDirectionalLight){const Z=t.get(C);if(Z.color.copy(C.color).multiplyScalar(C.intensity*w),C.castShadow){const ne=C.shadow,ce=i.get(C);ce.shadowBias=ne.bias,ce.shadowNormalBias=ne.normalBias,ce.shadowRadius=ne.radius,ce.shadowMapSize=ne.mapSize,r.directionalShadow[g]=ce,r.directionalShadowMap[g]=ee,r.directionalShadowMatrix[g]=C.shadow.matrix,E++}r.directional[g]=Z,g++}else if(C.isSpotLight){const Z=t.get(C);Z.position.setFromMatrixPosition(C.matrixWorld),Z.color.copy(z).multiplyScalar(q*w),Z.distance=$,Z.coneCos=Math.cos(C.angle),Z.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),Z.decay=C.decay,r.spot[u]=Z;const ne=C.shadow;if(C.map&&(r.spotLightMap[T]=C.map,T++,ne.updateMatrices(C),C.castShadow&&K++),r.spotLightMatrix[u]=ne.matrix,C.castShadow){const ce=i.get(C);ce.shadowBias=ne.bias,ce.shadowNormalBias=ne.normalBias,ce.shadowRadius=ne.radius,ce.shadowMapSize=ne.mapSize,r.spotShadow[u]=ce,r.spotShadowMap[u]=ee,A++}u++}else if(C.isRectAreaLight){const Z=t.get(C);Z.color.copy(z).multiplyScalar(q),Z.halfWidth.set(C.width*.5,0,0),Z.halfHeight.set(0,C.height*.5,0),r.rectArea[x]=Z,x++}else if(C.isPointLight){const Z=t.get(C);if(Z.color.copy(C.color).multiplyScalar(C.intensity*w),Z.distance=C.distance,Z.decay=C.decay,C.castShadow){const ne=C.shadow,ce=i.get(C);ce.shadowBias=ne.bias,ce.shadowNormalBias=ne.normalBias,ce.shadowRadius=ne.radius,ce.shadowMapSize=ne.mapSize,ce.shadowCameraNear=ne.camera.near,ce.shadowCameraFar=ne.camera.far,r.pointShadow[p]=ce,r.pointShadowMap[p]=ee,r.pointShadowMatrix[p]=C.shadow.matrix,P++}r.point[p]=Z,p++}else if(C.isHemisphereLight){const Z=t.get(C);Z.skyColor.copy(C.color).multiplyScalar(q*w),Z.groundColor.copy(C.groundColor).multiplyScalar(q*w),r.hemi[v]=Z,v++}}x>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ve.LTC_FLOAT_1,r.rectAreaLTC2=ve.LTC_FLOAT_2):(r.rectAreaLTC1=ve.LTC_HALF_1,r.rectAreaLTC2=ve.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ve.LTC_FLOAT_1,r.rectAreaLTC2=ve.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=ve.LTC_HALF_1,r.rectAreaLTC2=ve.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=m,r.ambient[2]=_;const F=r.hash;(F.directionalLength!==g||F.pointLength!==p||F.spotLength!==u||F.rectAreaLength!==x||F.hemiLength!==v||F.numDirectionalShadows!==E||F.numPointShadows!==P||F.numSpotShadows!==A||F.numSpotMaps!==T||F.numLightProbes!==M)&&(r.directional.length=g,r.spot.length=u,r.rectArea.length=x,r.point.length=p,r.hemi.length=v,r.directionalShadow.length=E,r.directionalShadowMap.length=E,r.pointShadow.length=P,r.pointShadowMap.length=P,r.spotShadow.length=A,r.spotShadowMap.length=A,r.directionalShadowMatrix.length=E,r.pointShadowMatrix.length=P,r.spotLightMatrix.length=A+T-K,r.spotLightMap.length=T,r.numSpotLightShadowsWithMaps=K,r.numLightProbes=M,F.directionalLength=g,F.pointLength=p,F.spotLength=u,F.rectAreaLength=x,F.hemiLength=v,F.numDirectionalShadows=E,F.numPointShadows=P,F.numSpotShadows=A,F.numSpotMaps=T,F.numLightProbes=M,r.version=wg++)}function l(h,f){let d=0,m=0,_=0,g=0,p=0;const u=f.matrixWorldInverse;for(let x=0,v=h.length;x<v;x++){const E=h[x];if(E.isDirectionalLight){const P=r.directional[d];P.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(u),d++}else if(E.isSpotLight){const P=r.spot[_];P.position.setFromMatrixPosition(E.matrixWorld),P.position.applyMatrix4(u),P.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(u),_++}else if(E.isRectAreaLight){const P=r.rectArea[g];P.position.setFromMatrixPosition(E.matrixWorld),P.position.applyMatrix4(u),o.identity(),a.copy(E.matrixWorld),a.premultiply(u),o.extractRotation(a),P.halfWidth.set(E.width*.5,0,0),P.halfHeight.set(0,E.height*.5,0),P.halfWidth.applyMatrix4(o),P.halfHeight.applyMatrix4(o),g++}else if(E.isPointLight){const P=r.point[m];P.position.setFromMatrixPosition(E.matrixWorld),P.position.applyMatrix4(u),m++}else if(E.isHemisphereLight){const P=r.hemi[p];P.direction.setFromMatrixPosition(E.matrixWorld),P.direction.transformDirection(u),p++}}}return{setup:c,setupView:l,state:r}}function Ac(n,e){const t=new Ag(n,e),i=[],r=[];function s(){i.length=0,r.length=0}function a(f){i.push(f)}function o(f){r.push(f)}function c(f){t.setup(i,f)}function l(f){t.setupView(i,f)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function Rg(n,e){let t=new WeakMap;function i(s,a=0){const o=t.get(s);let c;return o===void 0?(c=new Ac(n,e),t.set(s,[c])):a>=o.length?(c=new Ac(n,e),o.push(c)):c=o[a],c}function r(){t=new WeakMap}return{get:i,dispose:r}}class Cg extends ei{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=dh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Lg extends ei{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Pg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ig=`uniform sampler2D shadow_pass;
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
}`;function Dg(n,e,t){let i=new Yo;const r=new je,s=new je,a=new zt,o=new Cg({depthPacking:fh}),c=new Lg,l={},h=t.maxTextureSize,f={[Jn]:qt,[qt]:Jn,[In]:In},d=new yi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new je},radius:{value:4}},vertexShader:Pg,fragmentShader:Ig}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const _=new on;_.setAttribute("position",new Mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Kt(_,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hl;let u=this.type;this.render=function(A,T,K){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;const M=n.getRenderTarget(),w=n.getActiveCubeFace(),F=n.getActiveMipmapLevel(),D=n.state;D.setBlending(Yn),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const X=u!==Pn&&this.type===Pn,C=u===Pn&&this.type!==Pn;for(let z=0,q=A.length;z<q;z++){const $=A[z],ee=$.shadow;if(ee===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(ee.autoUpdate===!1&&ee.needsUpdate===!1)continue;r.copy(ee.mapSize);const Z=ee.getFrameExtents();if(r.multiply(Z),s.copy(ee.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/Z.x),r.x=s.x*Z.x,ee.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/Z.y),r.y=s.y*Z.y,ee.mapSize.y=s.y)),ee.map===null||X===!0||C===!0){const ce=this.type!==Pn?{minFilter:jt,magFilter:jt}:{};ee.map!==null&&ee.map.dispose(),ee.map=new vi(r.x,r.y,ce),ee.map.texture.name=$.name+".shadowMap",ee.camera.updateProjectionMatrix()}n.setRenderTarget(ee.map),n.clear();const ne=ee.getViewportCount();for(let ce=0;ce<ne;ce++){const de=ee.getViewport(ce);a.set(s.x*de.x,s.y*de.y,s.x*de.z,s.y*de.w),D.viewport(a),ee.updateMatrices($,ce),i=ee.getFrustum(),E(T,K,ee.camera,$,this.type)}ee.isPointLightShadow!==!0&&this.type===Pn&&x(ee,K),ee.needsUpdate=!1}u=this.type,p.needsUpdate=!1,n.setRenderTarget(M,w,F)};function x(A,T){const K=e.update(g);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new vi(r.x,r.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(T,null,K,d,g,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(T,null,K,m,g,null)}function v(A,T,K,M){let w=null;const F=K.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(F!==void 0)w=F;else if(w=K.isPointLight===!0?c:o,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const D=w.uuid,X=T.uuid;let C=l[D];C===void 0&&(C={},l[D]=C);let z=C[X];z===void 0&&(z=w.clone(),C[X]=z,T.addEventListener("dispose",P)),w=z}if(w.visible=T.visible,w.wireframe=T.wireframe,M===Pn?w.side=T.shadowSide!==null?T.shadowSide:T.side:w.side=T.shadowSide!==null?T.shadowSide:f[T.side],w.alphaMap=T.alphaMap,w.alphaTest=T.alphaTest,w.map=T.map,w.clipShadows=T.clipShadows,w.clippingPlanes=T.clippingPlanes,w.clipIntersection=T.clipIntersection,w.displacementMap=T.displacementMap,w.displacementScale=T.displacementScale,w.displacementBias=T.displacementBias,w.wireframeLinewidth=T.wireframeLinewidth,w.linewidth=T.linewidth,K.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const D=n.properties.get(w);D.light=K}return w}function E(A,T,K,M,w){if(A.visible===!1)return;if(A.layers.test(T.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&w===Pn)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,A.matrixWorld);const X=e.update(A),C=A.material;if(Array.isArray(C)){const z=X.groups;for(let q=0,$=z.length;q<$;q++){const ee=z[q],Z=C[ee.materialIndex];if(Z&&Z.visible){const ne=v(A,Z,M,w);A.onBeforeShadow(n,A,T,K,X,ne,ee),n.renderBufferDirect(K,null,X,ne,A,ee),A.onAfterShadow(n,A,T,K,X,ne,ee)}}}else if(C.visible){const z=v(A,C,M,w);A.onBeforeShadow(n,A,T,K,X,z,null),n.renderBufferDirect(K,null,X,z,A,null),A.onAfterShadow(n,A,T,K,X,z,null)}}const D=A.children;for(let X=0,C=D.length;X<C;X++)E(D[X],T,K,M,w)}function P(A){A.target.removeEventListener("dispose",P);for(const K in l){const M=l[K],w=A.target.uuid;w in M&&(M[w].dispose(),delete M[w])}}}function Ug(n,e,t){const i=t.isWebGL2;function r(){let I=!1;const fe=new zt;let xe=null;const Xe=new zt(0,0,0,0);return{setMask:function(ke){xe!==ke&&!I&&(n.colorMask(ke,ke,ke,ke),xe=ke)},setLocked:function(ke){I=ke},setClear:function(ke,ut,ct,N,W){W===!0&&(ke*=N,ut*=N,ct*=N),fe.set(ke,ut,ct,N),Xe.equals(fe)===!1&&(n.clearColor(ke,ut,ct,N),Xe.copy(fe))},reset:function(){I=!1,xe=null,Xe.set(-1,0,0,0)}}}function s(){let I=!1,fe=null,xe=null,Xe=null;return{setTest:function(ke){ke?We(n.DEPTH_TEST):Ve(n.DEPTH_TEST)},setMask:function(ke){fe!==ke&&!I&&(n.depthMask(ke),fe=ke)},setFunc:function(ke){if(xe!==ke){switch(ke){case Wu:n.depthFunc(n.NEVER);break;case Vu:n.depthFunc(n.ALWAYS);break;case $u:n.depthFunc(n.LESS);break;case vs:n.depthFunc(n.LEQUAL);break;case Xu:n.depthFunc(n.EQUAL);break;case ju:n.depthFunc(n.GEQUAL);break;case qu:n.depthFunc(n.GREATER);break;case Yu:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}xe=ke}},setLocked:function(ke){I=ke},setClear:function(ke){Xe!==ke&&(n.clearDepth(ke),Xe=ke)},reset:function(){I=!1,fe=null,xe=null,Xe=null}}}function a(){let I=!1,fe=null,xe=null,Xe=null,ke=null,ut=null,ct=null,N=null,W=null;return{setTest:function(Q){I||(Q?We(n.STENCIL_TEST):Ve(n.STENCIL_TEST))},setMask:function(Q){fe!==Q&&!I&&(n.stencilMask(Q),fe=Q)},setFunc:function(Q,pe,Ee){(xe!==Q||Xe!==pe||ke!==Ee)&&(n.stencilFunc(Q,pe,Ee),xe=Q,Xe=pe,ke=Ee)},setOp:function(Q,pe,Ee){(ut!==Q||ct!==pe||N!==Ee)&&(n.stencilOp(Q,pe,Ee),ut=Q,ct=pe,N=Ee)},setLocked:function(Q){I=Q},setClear:function(Q){W!==Q&&(n.clearStencil(Q),W=Q)},reset:function(){I=!1,fe=null,xe=null,Xe=null,ke=null,ut=null,ct=null,N=null,W=null}}}const o=new r,c=new s,l=new a,h=new WeakMap,f=new WeakMap;let d={},m={},_=new WeakMap,g=[],p=null,u=!1,x=null,v=null,E=null,P=null,A=null,T=null,K=null,M=new st(0,0,0),w=0,F=!1,D=null,X=null,C=null,z=null,q=null;const $=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ee=!1,Z=0;const ne=n.getParameter(n.VERSION);ne.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(ne)[1]),ee=Z>=1):ne.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),ee=Z>=2);let ce=null,de={};const k=n.getParameter(n.SCISSOR_BOX),te=n.getParameter(n.VIEWPORT),se=new zt().fromArray(k),Re=new zt().fromArray(te);function Pe(I,fe,xe,Xe){const ke=new Uint8Array(4),ut=n.createTexture();n.bindTexture(I,ut),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ct=0;ct<xe;ct++)i&&(I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY)?n.texImage3D(fe,0,n.RGBA,1,1,Xe,0,n.RGBA,n.UNSIGNED_BYTE,ke):n.texImage2D(fe+ct,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ke);return ut}const et={};et[n.TEXTURE_2D]=Pe(n.TEXTURE_2D,n.TEXTURE_2D,1),et[n.TEXTURE_CUBE_MAP]=Pe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(et[n.TEXTURE_2D_ARRAY]=Pe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),et[n.TEXTURE_3D]=Pe(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),l.setClear(0),We(n.DEPTH_TEST),c.setFunc(vs),Je(!1),b(la),We(n.CULL_FACE),Te(Yn);function We(I){d[I]!==!0&&(n.enable(I),d[I]=!0)}function Ve(I){d[I]!==!1&&(n.disable(I),d[I]=!1)}function lt(I,fe){return m[I]!==fe?(n.bindFramebuffer(I,fe),m[I]=fe,i&&(I===n.DRAW_FRAMEBUFFER&&(m[n.FRAMEBUFFER]=fe),I===n.FRAMEBUFFER&&(m[n.DRAW_FRAMEBUFFER]=fe)),!0):!1}function j(I,fe){let xe=g,Xe=!1;if(I)if(xe=_.get(fe),xe===void 0&&(xe=[],_.set(fe,xe)),I.isWebGLMultipleRenderTargets){const ke=I.texture;if(xe.length!==ke.length||xe[0]!==n.COLOR_ATTACHMENT0){for(let ut=0,ct=ke.length;ut<ct;ut++)xe[ut]=n.COLOR_ATTACHMENT0+ut;xe.length=ke.length,Xe=!0}}else xe[0]!==n.COLOR_ATTACHMENT0&&(xe[0]=n.COLOR_ATTACHMENT0,Xe=!0);else xe[0]!==n.BACK&&(xe[0]=n.BACK,Xe=!0);Xe&&(t.isWebGL2?n.drawBuffers(xe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(xe))}function Lt(I){return p!==I?(n.useProgram(I),p=I,!0):!1}const Be={[hi]:n.FUNC_ADD,[Ru]:n.FUNC_SUBTRACT,[Cu]:n.FUNC_REVERSE_SUBTRACT};if(i)Be[fa]=n.MIN,Be[pa]=n.MAX;else{const I=e.get("EXT_blend_minmax");I!==null&&(Be[fa]=I.MIN_EXT,Be[pa]=I.MAX_EXT)}const $e={[Lu]:n.ZERO,[Pu]:n.ONE,[Iu]:n.SRC_COLOR,[So]:n.SRC_ALPHA,[Bu]:n.SRC_ALPHA_SATURATE,[Ou]:n.DST_COLOR,[Uu]:n.DST_ALPHA,[Du]:n.ONE_MINUS_SRC_COLOR,[Eo]:n.ONE_MINUS_SRC_ALPHA,[Fu]:n.ONE_MINUS_DST_COLOR,[Nu]:n.ONE_MINUS_DST_ALPHA,[zu]:n.CONSTANT_COLOR,[ku]:n.ONE_MINUS_CONSTANT_COLOR,[Hu]:n.CONSTANT_ALPHA,[Gu]:n.ONE_MINUS_CONSTANT_ALPHA};function Te(I,fe,xe,Xe,ke,ut,ct,N,W,Q){if(I===Yn){u===!0&&(Ve(n.BLEND),u=!1);return}if(u===!1&&(We(n.BLEND),u=!0),I!==Au){if(I!==x||Q!==F){if((v!==hi||A!==hi)&&(n.blendEquation(n.FUNC_ADD),v=hi,A=hi),Q)switch(I){case Ji:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ua:n.blendFunc(n.ONE,n.ONE);break;case ha:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case da:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Ji:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ua:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case ha:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case da:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}E=null,P=null,T=null,K=null,M.set(0,0,0),w=0,x=I,F=Q}return}ke=ke||fe,ut=ut||xe,ct=ct||Xe,(fe!==v||ke!==A)&&(n.blendEquationSeparate(Be[fe],Be[ke]),v=fe,A=ke),(xe!==E||Xe!==P||ut!==T||ct!==K)&&(n.blendFuncSeparate($e[xe],$e[Xe],$e[ut],$e[ct]),E=xe,P=Xe,T=ut,K=ct),(N.equals(M)===!1||W!==w)&&(n.blendColor(N.r,N.g,N.b,W),M.copy(N),w=W),x=I,F=!1}function gt(I,fe){I.side===In?Ve(n.CULL_FACE):We(n.CULL_FACE);let xe=I.side===qt;fe&&(xe=!xe),Je(xe),I.blending===Ji&&I.transparent===!1?Te(Yn):Te(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),c.setFunc(I.depthFunc),c.setTest(I.depthTest),c.setMask(I.depthWrite),o.setMask(I.colorWrite);const Xe=I.stencilWrite;l.setTest(Xe),Xe&&(l.setMask(I.stencilWriteMask),l.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),l.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),V(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?We(n.SAMPLE_ALPHA_TO_COVERAGE):Ve(n.SAMPLE_ALPHA_TO_COVERAGE)}function Je(I){D!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),D=I)}function b(I){I!==bu?(We(n.CULL_FACE),I!==X&&(I===la?n.cullFace(n.BACK):I===wu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ve(n.CULL_FACE),X=I}function y(I){I!==C&&(ee&&n.lineWidth(I),C=I)}function V(I,fe,xe){I?(We(n.POLYGON_OFFSET_FILL),(z!==fe||q!==xe)&&(n.polygonOffset(fe,xe),z=fe,q=xe)):Ve(n.POLYGON_OFFSET_FILL)}function le(I){I?We(n.SCISSOR_TEST):Ve(n.SCISSOR_TEST)}function ie(I){I===void 0&&(I=n.TEXTURE0+$-1),ce!==I&&(n.activeTexture(I),ce=I)}function ue(I,fe,xe){xe===void 0&&(ce===null?xe=n.TEXTURE0+$-1:xe=ce);let Xe=de[xe];Xe===void 0&&(Xe={type:void 0,texture:void 0},de[xe]=Xe),(Xe.type!==I||Xe.texture!==fe)&&(ce!==xe&&(n.activeTexture(xe),ce=xe),n.bindTexture(I,fe||et[I]),Xe.type=I,Xe.texture=fe)}function Ce(){const I=de[ce];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function ye(){try{n.compressedTexImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function we(){try{n.compressedTexImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ge(){try{n.texSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function nt(){try{n.texSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function oe(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function pt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ot(){try{n.texStorage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ye(){try{n.texStorage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function De(){try{n.texImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Me(){try{n.texImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function R(I){se.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),se.copy(I))}function he(I){Re.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),Re.copy(I))}function Ie(I,fe){let xe=f.get(fe);xe===void 0&&(xe=new WeakMap,f.set(fe,xe));let Xe=xe.get(I);Xe===void 0&&(Xe=n.getUniformBlockIndex(fe,I.name),xe.set(I,Xe))}function be(I,fe){const Xe=f.get(fe).get(I);h.get(fe)!==Xe&&(n.uniformBlockBinding(fe,Xe,I.__bindingPointIndex),h.set(fe,Xe))}function ae(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},ce=null,de={},m={},_=new WeakMap,g=[],p=null,u=!1,x=null,v=null,E=null,P=null,A=null,T=null,K=null,M=new st(0,0,0),w=0,F=!1,D=null,X=null,C=null,z=null,q=null,se.set(0,0,n.canvas.width,n.canvas.height),Re.set(0,0,n.canvas.width,n.canvas.height),o.reset(),c.reset(),l.reset()}return{buffers:{color:o,depth:c,stencil:l},enable:We,disable:Ve,bindFramebuffer:lt,drawBuffers:j,useProgram:Lt,setBlending:Te,setMaterial:gt,setFlipSided:Je,setCullFace:b,setLineWidth:y,setPolygonOffset:V,setScissorTest:le,activeTexture:ie,bindTexture:ue,unbindTexture:Ce,compressedTexImage2D:ye,compressedTexImage3D:we,texImage2D:De,texImage3D:Me,updateUBOMapping:Ie,uniformBlockBinding:be,texStorage2D:ot,texStorage3D:Ye,texSubImage2D:Ge,texSubImage3D:nt,compressedTexSubImage2D:oe,compressedTexSubImage3D:pt,scissor:R,viewport:he,reset:ae}}function Ng(n,e,t,i,r,s,a){const o=r.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let f;const d=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(b,y){return m?new OffscreenCanvas(b,y):bs("canvas")}function g(b,y,V,le){let ie=1;if((b.width>le||b.height>le)&&(ie=le/Math.max(b.width,b.height)),ie<1||y===!0)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap){const ue=y?Es:Math.floor,Ce=ue(ie*b.width),ye=ue(ie*b.height);f===void 0&&(f=_(Ce,ye));const we=V?_(Ce,ye):f;return we.width=Ce,we.height=ye,we.getContext("2d").drawImage(b,0,0,Ce,ye),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+b.width+"x"+b.height+") to ("+Ce+"x"+ye+")."),we}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+b.width+"x"+b.height+")."),b;return b}function p(b){return Lo(b.width)&&Lo(b.height)}function u(b){return o?!1:b.wrapS!==vn||b.wrapT!==vn||b.minFilter!==jt&&b.minFilter!==ln}function x(b,y){return b.generateMipmaps&&y&&b.minFilter!==jt&&b.minFilter!==ln}function v(b){n.generateMipmap(b)}function E(b,y,V,le,ie=!1){if(o===!1)return y;if(b!==null){if(n[b]!==void 0)return n[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let ue=y;if(y===n.RED&&(V===n.FLOAT&&(ue=n.R32F),V===n.HALF_FLOAT&&(ue=n.R16F),V===n.UNSIGNED_BYTE&&(ue=n.R8)),y===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(ue=n.R8UI),V===n.UNSIGNED_SHORT&&(ue=n.R16UI),V===n.UNSIGNED_INT&&(ue=n.R32UI),V===n.BYTE&&(ue=n.R8I),V===n.SHORT&&(ue=n.R16I),V===n.INT&&(ue=n.R32I)),y===n.RG&&(V===n.FLOAT&&(ue=n.RG32F),V===n.HALF_FLOAT&&(ue=n.RG16F),V===n.UNSIGNED_BYTE&&(ue=n.RG8)),y===n.RGBA){const Ce=ie?xs:yt.getTransfer(le);V===n.FLOAT&&(ue=n.RGBA32F),V===n.HALF_FLOAT&&(ue=n.RGBA16F),V===n.UNSIGNED_BYTE&&(ue=Ce===wt?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT_4_4_4_4&&(ue=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(ue=n.RGB5_A1)}return(ue===n.R16F||ue===n.R32F||ue===n.RG16F||ue===n.RG32F||ue===n.RGBA16F||ue===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ue}function P(b,y,V){return x(b,V)===!0||b.isFramebufferTexture&&b.minFilter!==jt&&b.minFilter!==ln?Math.log2(Math.max(y.width,y.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?y.mipmaps.length:1}function A(b){return b===jt||b===ma||b===ks?n.NEAREST:n.LINEAR}function T(b){const y=b.target;y.removeEventListener("dispose",T),M(y),y.isVideoTexture&&h.delete(y)}function K(b){const y=b.target;y.removeEventListener("dispose",K),F(y)}function M(b){const y=i.get(b);if(y.__webglInit===void 0)return;const V=b.source,le=d.get(V);if(le){const ie=le[y.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&w(b),Object.keys(le).length===0&&d.delete(V)}i.remove(b)}function w(b){const y=i.get(b);n.deleteTexture(y.__webglTexture);const V=b.source,le=d.get(V);delete le[y.__cacheKey],a.memory.textures--}function F(b){const y=b.texture,V=i.get(b),le=i.get(y);if(le.__webglTexture!==void 0&&(n.deleteTexture(le.__webglTexture),a.memory.textures--),b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++){if(Array.isArray(V.__webglFramebuffer[ie]))for(let ue=0;ue<V.__webglFramebuffer[ie].length;ue++)n.deleteFramebuffer(V.__webglFramebuffer[ie][ue]);else n.deleteFramebuffer(V.__webglFramebuffer[ie]);V.__webglDepthbuffer&&n.deleteRenderbuffer(V.__webglDepthbuffer[ie])}else{if(Array.isArray(V.__webglFramebuffer))for(let ie=0;ie<V.__webglFramebuffer.length;ie++)n.deleteFramebuffer(V.__webglFramebuffer[ie]);else n.deleteFramebuffer(V.__webglFramebuffer);if(V.__webglDepthbuffer&&n.deleteRenderbuffer(V.__webglDepthbuffer),V.__webglMultisampledFramebuffer&&n.deleteFramebuffer(V.__webglMultisampledFramebuffer),V.__webglColorRenderbuffer)for(let ie=0;ie<V.__webglColorRenderbuffer.length;ie++)V.__webglColorRenderbuffer[ie]&&n.deleteRenderbuffer(V.__webglColorRenderbuffer[ie]);V.__webglDepthRenderbuffer&&n.deleteRenderbuffer(V.__webglDepthRenderbuffer)}if(b.isWebGLMultipleRenderTargets)for(let ie=0,ue=y.length;ie<ue;ie++){const Ce=i.get(y[ie]);Ce.__webglTexture&&(n.deleteTexture(Ce.__webglTexture),a.memory.textures--),i.remove(y[ie])}i.remove(y),i.remove(b)}let D=0;function X(){D=0}function C(){const b=D;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),D+=1,b}function z(b){const y=[];return y.push(b.wrapS),y.push(b.wrapT),y.push(b.wrapR||0),y.push(b.magFilter),y.push(b.minFilter),y.push(b.anisotropy),y.push(b.internalFormat),y.push(b.format),y.push(b.type),y.push(b.generateMipmaps),y.push(b.premultiplyAlpha),y.push(b.flipY),y.push(b.unpackAlignment),y.push(b.colorSpace),y.join()}function q(b,y){const V=i.get(b);if(b.isVideoTexture&&gt(b),b.isRenderTargetTexture===!1&&b.version>0&&V.__version!==b.version){const le=b.image;if(le===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(le.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{se(V,b,y);return}}t.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+y)}function $(b,y){const V=i.get(b);if(b.version>0&&V.__version!==b.version){se(V,b,y);return}t.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+y)}function ee(b,y){const V=i.get(b);if(b.version>0&&V.__version!==b.version){se(V,b,y);return}t.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+y)}function Z(b,y){const V=i.get(b);if(b.version>0&&V.__version!==b.version){Re(V,b,y);return}t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+y)}const ne={[To]:n.REPEAT,[vn]:n.CLAMP_TO_EDGE,[Ao]:n.MIRRORED_REPEAT},ce={[jt]:n.NEAREST,[ma]:n.NEAREST_MIPMAP_NEAREST,[ks]:n.NEAREST_MIPMAP_LINEAR,[ln]:n.LINEAR,[ih]:n.LINEAR_MIPMAP_NEAREST,[Rr]:n.LINEAR_MIPMAP_LINEAR},de={[mh]:n.NEVER,[Mh]:n.ALWAYS,[gh]:n.LESS,[bl]:n.LEQUAL,[_h]:n.EQUAL,[yh]:n.GEQUAL,[vh]:n.GREATER,[xh]:n.NOTEQUAL};function k(b,y,V){if(V?(n.texParameteri(b,n.TEXTURE_WRAP_S,ne[y.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,ne[y.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,ne[y.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,ce[y.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,ce[y.minFilter])):(n.texParameteri(b,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(b,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(y.wrapS!==vn||y.wrapT!==vn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(b,n.TEXTURE_MAG_FILTER,A(y.magFilter)),n.texParameteri(b,n.TEXTURE_MIN_FILTER,A(y.minFilter)),y.minFilter!==jt&&y.minFilter!==ln&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,de[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const le=e.get("EXT_texture_filter_anisotropic");if(y.magFilter===jt||y.minFilter!==ks&&y.minFilter!==Rr||y.type===jn&&e.has("OES_texture_float_linear")===!1||o===!1&&y.type===Cr&&e.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||i.get(y).__currentAnisotropy)&&(n.texParameterf(b,le.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy)}}function te(b,y){let V=!1;b.__webglInit===void 0&&(b.__webglInit=!0,y.addEventListener("dispose",T));const le=y.source;let ie=d.get(le);ie===void 0&&(ie={},d.set(le,ie));const ue=z(y);if(ue!==b.__cacheKey){ie[ue]===void 0&&(ie[ue]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,V=!0),ie[ue].usedTimes++;const Ce=ie[b.__cacheKey];Ce!==void 0&&(ie[b.__cacheKey].usedTimes--,Ce.usedTimes===0&&w(y)),b.__cacheKey=ue,b.__webglTexture=ie[ue].texture}return V}function se(b,y,V){let le=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(le=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(le=n.TEXTURE_3D);const ie=te(b,y),ue=y.source;t.bindTexture(le,b.__webglTexture,n.TEXTURE0+V);const Ce=i.get(ue);if(ue.version!==Ce.__version||ie===!0){t.activeTexture(n.TEXTURE0+V);const ye=yt.getPrimaries(yt.workingColorSpace),we=y.colorSpace===dn?null:yt.getPrimaries(y.colorSpace),Ge=y.colorSpace===dn||ye===we?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ge);const nt=u(y)&&p(y.image)===!1;let oe=g(y.image,nt,!1,r.maxTextureSize);oe=Je(y,oe);const pt=p(oe)||o,ot=s.convert(y.format,y.colorSpace);let Ye=s.convert(y.type),De=E(y.internalFormat,ot,Ye,y.colorSpace,y.isVideoTexture);k(le,y,pt);let Me;const R=y.mipmaps,he=o&&y.isVideoTexture!==!0&&De!==Ml,Ie=Ce.__version===void 0||ie===!0,be=P(y,oe,pt);if(y.isDepthTexture)De=n.DEPTH_COMPONENT,o?y.type===jn?De=n.DEPTH_COMPONENT32F:y.type===Xn?De=n.DEPTH_COMPONENT24:y.type===fi?De=n.DEPTH24_STENCIL8:De=n.DEPTH_COMPONENT16:y.type===jn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===pi&&De===n.DEPTH_COMPONENT&&y.type!==Vo&&y.type!==Xn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=Xn,Ye=s.convert(y.type)),y.format===nr&&De===n.DEPTH_COMPONENT&&(De=n.DEPTH_STENCIL,y.type!==fi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=fi,Ye=s.convert(y.type))),Ie&&(he?t.texStorage2D(n.TEXTURE_2D,1,De,oe.width,oe.height):t.texImage2D(n.TEXTURE_2D,0,De,oe.width,oe.height,0,ot,Ye,null));else if(y.isDataTexture)if(R.length>0&&pt){he&&Ie&&t.texStorage2D(n.TEXTURE_2D,be,De,R[0].width,R[0].height);for(let ae=0,I=R.length;ae<I;ae++)Me=R[ae],he?t.texSubImage2D(n.TEXTURE_2D,ae,0,0,Me.width,Me.height,ot,Ye,Me.data):t.texImage2D(n.TEXTURE_2D,ae,De,Me.width,Me.height,0,ot,Ye,Me.data);y.generateMipmaps=!1}else he?(Ie&&t.texStorage2D(n.TEXTURE_2D,be,De,oe.width,oe.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,oe.width,oe.height,ot,Ye,oe.data)):t.texImage2D(n.TEXTURE_2D,0,De,oe.width,oe.height,0,ot,Ye,oe.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){he&&Ie&&t.texStorage3D(n.TEXTURE_2D_ARRAY,be,De,R[0].width,R[0].height,oe.depth);for(let ae=0,I=R.length;ae<I;ae++)Me=R[ae],y.format!==xn?ot!==null?he?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,Me.width,Me.height,oe.depth,ot,Me.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ae,De,Me.width,Me.height,oe.depth,0,Me.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):he?t.texSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,Me.width,Me.height,oe.depth,ot,Ye,Me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ae,De,Me.width,Me.height,oe.depth,0,ot,Ye,Me.data)}else{he&&Ie&&t.texStorage2D(n.TEXTURE_2D,be,De,R[0].width,R[0].height);for(let ae=0,I=R.length;ae<I;ae++)Me=R[ae],y.format!==xn?ot!==null?he?t.compressedTexSubImage2D(n.TEXTURE_2D,ae,0,0,Me.width,Me.height,ot,Me.data):t.compressedTexImage2D(n.TEXTURE_2D,ae,De,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):he?t.texSubImage2D(n.TEXTURE_2D,ae,0,0,Me.width,Me.height,ot,Ye,Me.data):t.texImage2D(n.TEXTURE_2D,ae,De,Me.width,Me.height,0,ot,Ye,Me.data)}else if(y.isDataArrayTexture)he?(Ie&&t.texStorage3D(n.TEXTURE_2D_ARRAY,be,De,oe.width,oe.height,oe.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,ot,Ye,oe.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,De,oe.width,oe.height,oe.depth,0,ot,Ye,oe.data);else if(y.isData3DTexture)he?(Ie&&t.texStorage3D(n.TEXTURE_3D,be,De,oe.width,oe.height,oe.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,ot,Ye,oe.data)):t.texImage3D(n.TEXTURE_3D,0,De,oe.width,oe.height,oe.depth,0,ot,Ye,oe.data);else if(y.isFramebufferTexture){if(Ie)if(he)t.texStorage2D(n.TEXTURE_2D,be,De,oe.width,oe.height);else{let ae=oe.width,I=oe.height;for(let fe=0;fe<be;fe++)t.texImage2D(n.TEXTURE_2D,fe,De,ae,I,0,ot,Ye,null),ae>>=1,I>>=1}}else if(R.length>0&&pt){he&&Ie&&t.texStorage2D(n.TEXTURE_2D,be,De,R[0].width,R[0].height);for(let ae=0,I=R.length;ae<I;ae++)Me=R[ae],he?t.texSubImage2D(n.TEXTURE_2D,ae,0,0,ot,Ye,Me):t.texImage2D(n.TEXTURE_2D,ae,De,ot,Ye,Me);y.generateMipmaps=!1}else he?(Ie&&t.texStorage2D(n.TEXTURE_2D,be,De,oe.width,oe.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,ot,Ye,oe)):t.texImage2D(n.TEXTURE_2D,0,De,ot,Ye,oe);x(y,pt)&&v(le),Ce.__version=ue.version,y.onUpdate&&y.onUpdate(y)}b.__version=y.version}function Re(b,y,V){if(y.image.length!==6)return;const le=te(b,y),ie=y.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+V);const ue=i.get(ie);if(ie.version!==ue.__version||le===!0){t.activeTexture(n.TEXTURE0+V);const Ce=yt.getPrimaries(yt.workingColorSpace),ye=y.colorSpace===dn?null:yt.getPrimaries(y.colorSpace),we=y.colorSpace===dn||Ce===ye?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);const Ge=y.isCompressedTexture||y.image[0].isCompressedTexture,nt=y.image[0]&&y.image[0].isDataTexture,oe=[];for(let ae=0;ae<6;ae++)!Ge&&!nt?oe[ae]=g(y.image[ae],!1,!0,r.maxCubemapSize):oe[ae]=nt?y.image[ae].image:y.image[ae],oe[ae]=Je(y,oe[ae]);const pt=oe[0],ot=p(pt)||o,Ye=s.convert(y.format,y.colorSpace),De=s.convert(y.type),Me=E(y.internalFormat,Ye,De,y.colorSpace),R=o&&y.isVideoTexture!==!0,he=ue.__version===void 0||le===!0;let Ie=P(y,pt,ot);k(n.TEXTURE_CUBE_MAP,y,ot);let be;if(Ge){R&&he&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ie,Me,pt.width,pt.height);for(let ae=0;ae<6;ae++){be=oe[ae].mipmaps;for(let I=0;I<be.length;I++){const fe=be[I];y.format!==xn?Ye!==null?R?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,I,0,0,fe.width,fe.height,Ye,fe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,I,Me,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,I,0,0,fe.width,fe.height,Ye,De,fe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,I,Me,fe.width,fe.height,0,Ye,De,fe.data)}}}else{be=y.mipmaps,R&&he&&(be.length>0&&Ie++,t.texStorage2D(n.TEXTURE_CUBE_MAP,Ie,Me,oe[0].width,oe[0].height));for(let ae=0;ae<6;ae++)if(nt){R?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,oe[ae].width,oe[ae].height,Ye,De,oe[ae].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Me,oe[ae].width,oe[ae].height,0,Ye,De,oe[ae].data);for(let I=0;I<be.length;I++){const xe=be[I].image[ae].image;R?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,I+1,0,0,xe.width,xe.height,Ye,De,xe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,I+1,Me,xe.width,xe.height,0,Ye,De,xe.data)}}else{R?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Ye,De,oe[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Me,Ye,De,oe[ae]);for(let I=0;I<be.length;I++){const fe=be[I];R?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,I+1,0,0,Ye,De,fe.image[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,I+1,Me,Ye,De,fe.image[ae])}}}x(y,ot)&&v(n.TEXTURE_CUBE_MAP),ue.__version=ie.version,y.onUpdate&&y.onUpdate(y)}b.__version=y.version}function Pe(b,y,V,le,ie,ue){const Ce=s.convert(V.format,V.colorSpace),ye=s.convert(V.type),we=E(V.internalFormat,Ce,ye,V.colorSpace);if(!i.get(y).__hasExternalTextures){const nt=Math.max(1,y.width>>ue),oe=Math.max(1,y.height>>ue);ie===n.TEXTURE_3D||ie===n.TEXTURE_2D_ARRAY?t.texImage3D(ie,ue,we,nt,oe,y.depth,0,Ce,ye,null):t.texImage2D(ie,ue,we,nt,oe,0,Ce,ye,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),Te(y)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,le,ie,i.get(V).__webglTexture,0,$e(y)):(ie===n.TEXTURE_2D||ie>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,le,ie,i.get(V).__webglTexture,ue),t.bindFramebuffer(n.FRAMEBUFFER,null)}function et(b,y,V){if(n.bindRenderbuffer(n.RENDERBUFFER,b),y.depthBuffer&&!y.stencilBuffer){let le=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(V||Te(y)){const ie=y.depthTexture;ie&&ie.isDepthTexture&&(ie.type===jn?le=n.DEPTH_COMPONENT32F:ie.type===Xn&&(le=n.DEPTH_COMPONENT24));const ue=$e(y);Te(y)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ue,le,y.width,y.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,ue,le,y.width,y.height)}else n.renderbufferStorage(n.RENDERBUFFER,le,y.width,y.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,b)}else if(y.depthBuffer&&y.stencilBuffer){const le=$e(y);V&&Te(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,le,n.DEPTH24_STENCIL8,y.width,y.height):Te(y)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,le,n.DEPTH24_STENCIL8,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,b)}else{const le=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let ie=0;ie<le.length;ie++){const ue=le[ie],Ce=s.convert(ue.format,ue.colorSpace),ye=s.convert(ue.type),we=E(ue.internalFormat,Ce,ye,ue.colorSpace),Ge=$e(y);V&&Te(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ge,we,y.width,y.height):Te(y)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ge,we,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,we,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function We(b,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),q(y.depthTexture,0);const le=i.get(y.depthTexture).__webglTexture,ie=$e(y);if(y.depthTexture.format===pi)Te(y)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,le,0,ie):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,le,0);else if(y.depthTexture.format===nr)Te(y)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,le,0,ie):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,le,0);else throw new Error("Unknown depthTexture format")}function Ve(b){const y=i.get(b),V=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!y.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");We(y.__webglFramebuffer,b)}else if(V){y.__webglDepthbuffer=[];for(let le=0;le<6;le++)t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[le]),y.__webglDepthbuffer[le]=n.createRenderbuffer(),et(y.__webglDepthbuffer[le],b,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=n.createRenderbuffer(),et(y.__webglDepthbuffer,b,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function lt(b,y,V){const le=i.get(b);y!==void 0&&Pe(le.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&Ve(b)}function j(b){const y=b.texture,V=i.get(b),le=i.get(y);b.addEventListener("dispose",K),b.isWebGLMultipleRenderTargets!==!0&&(le.__webglTexture===void 0&&(le.__webglTexture=n.createTexture()),le.__version=y.version,a.memory.textures++);const ie=b.isWebGLCubeRenderTarget===!0,ue=b.isWebGLMultipleRenderTargets===!0,Ce=p(b)||o;if(ie){V.__webglFramebuffer=[];for(let ye=0;ye<6;ye++)if(o&&y.mipmaps&&y.mipmaps.length>0){V.__webglFramebuffer[ye]=[];for(let we=0;we<y.mipmaps.length;we++)V.__webglFramebuffer[ye][we]=n.createFramebuffer()}else V.__webglFramebuffer[ye]=n.createFramebuffer()}else{if(o&&y.mipmaps&&y.mipmaps.length>0){V.__webglFramebuffer=[];for(let ye=0;ye<y.mipmaps.length;ye++)V.__webglFramebuffer[ye]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(ue)if(r.drawBuffers){const ye=b.texture;for(let we=0,Ge=ye.length;we<Ge;we++){const nt=i.get(ye[we]);nt.__webglTexture===void 0&&(nt.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&b.samples>0&&Te(b)===!1){const ye=ue?y:[y];V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let we=0;we<ye.length;we++){const Ge=ye[we];V.__webglColorRenderbuffer[we]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[we]);const nt=s.convert(Ge.format,Ge.colorSpace),oe=s.convert(Ge.type),pt=E(Ge.internalFormat,nt,oe,Ge.colorSpace,b.isXRRenderTarget===!0),ot=$e(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,ot,pt,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.RENDERBUFFER,V.__webglColorRenderbuffer[we])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),et(V.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ie){t.bindTexture(n.TEXTURE_CUBE_MAP,le.__webglTexture),k(n.TEXTURE_CUBE_MAP,y,Ce);for(let ye=0;ye<6;ye++)if(o&&y.mipmaps&&y.mipmaps.length>0)for(let we=0;we<y.mipmaps.length;we++)Pe(V.__webglFramebuffer[ye][we],b,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ye,we);else Pe(V.__webglFramebuffer[ye],b,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0);x(y,Ce)&&v(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){const ye=b.texture;for(let we=0,Ge=ye.length;we<Ge;we++){const nt=ye[we],oe=i.get(nt);t.bindTexture(n.TEXTURE_2D,oe.__webglTexture),k(n.TEXTURE_2D,nt,Ce),Pe(V.__webglFramebuffer,b,nt,n.COLOR_ATTACHMENT0+we,n.TEXTURE_2D,0),x(nt,Ce)&&v(n.TEXTURE_2D)}t.unbindTexture()}else{let ye=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(o?ye=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ye,le.__webglTexture),k(ye,y,Ce),o&&y.mipmaps&&y.mipmaps.length>0)for(let we=0;we<y.mipmaps.length;we++)Pe(V.__webglFramebuffer[we],b,y,n.COLOR_ATTACHMENT0,ye,we);else Pe(V.__webglFramebuffer,b,y,n.COLOR_ATTACHMENT0,ye,0);x(y,Ce)&&v(ye),t.unbindTexture()}b.depthBuffer&&Ve(b)}function Lt(b){const y=p(b)||o,V=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let le=0,ie=V.length;le<ie;le++){const ue=V[le];if(x(ue,y)){const Ce=b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,ye=i.get(ue).__webglTexture;t.bindTexture(Ce,ye),v(Ce),t.unbindTexture()}}}function Be(b){if(o&&b.samples>0&&Te(b)===!1){const y=b.isWebGLMultipleRenderTargets?b.texture:[b.texture],V=b.width,le=b.height;let ie=n.COLOR_BUFFER_BIT;const ue=[],Ce=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ye=i.get(b),we=b.isWebGLMultipleRenderTargets===!0;if(we)for(let Ge=0;Ge<y.length;Ge++)t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ge,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ge,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let Ge=0;Ge<y.length;Ge++){ue.push(n.COLOR_ATTACHMENT0+Ge),b.depthBuffer&&ue.push(Ce);const nt=ye.__ignoreDepthValues!==void 0?ye.__ignoreDepthValues:!1;if(nt===!1&&(b.depthBuffer&&(ie|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&(ie|=n.STENCIL_BUFFER_BIT)),we&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ye.__webglColorRenderbuffer[Ge]),nt===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[Ce]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[Ce])),we){const oe=i.get(y[Ge]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,oe,0)}n.blitFramebuffer(0,0,V,le,0,0,V,le,ie,n.NEAREST),l&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ue)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),we)for(let Ge=0;Ge<y.length;Ge++){t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ge,n.RENDERBUFFER,ye.__webglColorRenderbuffer[Ge]);const nt=i.get(y[Ge]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ge,n.TEXTURE_2D,nt,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}}function $e(b){return Math.min(r.maxSamples,b.samples)}function Te(b){const y=i.get(b);return o&&b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function gt(b){const y=a.render.frame;h.get(b)!==y&&(h.set(b,y),b.update())}function Je(b,y){const V=b.colorSpace,le=b.format,ie=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||b.format===Co||V!==Fn&&V!==dn&&(yt.getTransfer(V)===wt?o===!1?e.has("EXT_sRGB")===!0&&le===xn?(b.format=Co,b.minFilter=ln,b.generateMipmaps=!1):y=Tl.sRGBToLinear(y):(le!==xn||ie!==Zn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),y}this.allocateTextureUnit=C,this.resetTextureUnits=X,this.setTexture2D=q,this.setTexture2DArray=$,this.setTexture3D=ee,this.setTextureCube=Z,this.rebindTextures=lt,this.setupRenderTarget=j,this.updateRenderTargetMipmap=Lt,this.updateMultisampleRenderTarget=Be,this.setupDepthRenderbuffer=Ve,this.setupFrameBufferTexture=Pe,this.useMultisampledRTT=Te}function Og(n,e,t){const i=t.isWebGL2;function r(s,a=dn){let o;const c=yt.getTransfer(a);if(s===Zn)return n.UNSIGNED_BYTE;if(s===gl)return n.UNSIGNED_SHORT_4_4_4_4;if(s===_l)return n.UNSIGNED_SHORT_5_5_5_1;if(s===rh)return n.BYTE;if(s===sh)return n.SHORT;if(s===Vo)return n.UNSIGNED_SHORT;if(s===ml)return n.INT;if(s===Xn)return n.UNSIGNED_INT;if(s===jn)return n.FLOAT;if(s===Cr)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===oh)return n.ALPHA;if(s===xn)return n.RGBA;if(s===ah)return n.LUMINANCE;if(s===ch)return n.LUMINANCE_ALPHA;if(s===pi)return n.DEPTH_COMPONENT;if(s===nr)return n.DEPTH_STENCIL;if(s===Co)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===lh)return n.RED;if(s===vl)return n.RED_INTEGER;if(s===uh)return n.RG;if(s===xl)return n.RG_INTEGER;if(s===yl)return n.RGBA_INTEGER;if(s===Hs||s===Gs||s===Ws||s===Vs)if(c===wt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===Hs)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Gs)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Ws)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Vs)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===Hs)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Gs)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Ws)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Vs)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===ga||s===_a||s===va||s===xa)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===ga)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===_a)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===va)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===xa)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Ml)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===ya||s===Ma)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===ya)return c===wt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Ma)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Sa||s===Ea||s===ba||s===wa||s===Ta||s===Aa||s===Ra||s===Ca||s===La||s===Pa||s===Ia||s===Da||s===Ua||s===Na)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Sa)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Ea)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===ba)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===wa)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Ta)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Aa)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Ra)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Ca)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===La)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Pa)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Ia)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Da)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Ua)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Na)return c===wt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===$s||s===Oa||s===Fa)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===$s)return c===wt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Oa)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Fa)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===hh||s===Ba||s===za||s===ka)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===$s)return o.COMPRESSED_RED_RGTC1_EXT;if(s===Ba)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===za)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===ka)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===fi?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class Fg extends hn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class as extends Dt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Bg={type:"move"};class mo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new as,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new as,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new as,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const g of e.hand.values()){const p=t.getJointPose(g,i),u=this._getHandJoint(l,g);p!==null&&(u.matrix.fromArray(p.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=p.radius),u.visible=p!==null}const h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=h.position.distanceTo(f.position),m=.02,_=.005;l.inputState.pinching&&d>m+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=m-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Bg)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new as;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class zg extends Mi{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,f=null,d=null,m=null,_=null;const g=t.getContextAttributes();let p=null,u=null;const x=[],v=[],E=new je;let P=null;const A=new hn;A.layers.enable(1),A.viewport=new zt;const T=new hn;T.layers.enable(2),T.viewport=new zt;const K=[A,T],M=new Fg;M.layers.enable(1),M.layers.enable(2);let w=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let te=x[k];return te===void 0&&(te=new mo,x[k]=te),te.getTargetRaySpace()},this.getControllerGrip=function(k){let te=x[k];return te===void 0&&(te=new mo,x[k]=te),te.getGripSpace()},this.getHand=function(k){let te=x[k];return te===void 0&&(te=new mo,x[k]=te),te.getHandSpace()};function D(k){const te=v.indexOf(k.inputSource);if(te===-1)return;const se=x[te];se!==void 0&&(se.update(k.inputSource,k.frame,l||a),se.dispatchEvent({type:k.type,data:k.inputSource}))}function X(){r.removeEventListener("select",D),r.removeEventListener("selectstart",D),r.removeEventListener("selectend",D),r.removeEventListener("squeeze",D),r.removeEventListener("squeezestart",D),r.removeEventListener("squeezeend",D),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",C);for(let k=0;k<x.length;k++){const te=v[k];te!==null&&(v[k]=null,x[k].disconnect(te))}w=null,F=null,e.setRenderTarget(p),m=null,d=null,f=null,r=null,u=null,de.stop(),i.isPresenting=!1,e.setPixelRatio(P),e.setSize(E.width,E.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){s=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){o=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(k){l=k},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(k){if(r=k,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",D),r.addEventListener("selectstart",D),r.addEventListener("selectend",D),r.addEventListener("squeeze",D),r.addEventListener("squeezestart",D),r.addEventListener("squeezeend",D),r.addEventListener("end",X),r.addEventListener("inputsourceschange",C),g.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(E),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const te={antialias:r.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,te),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),u=new vi(m.framebufferWidth,m.framebufferHeight,{format:xn,type:Zn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let te=null,se=null,Re=null;g.depth&&(Re=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=g.stencil?nr:pi,se=g.stencil?fi:Xn);const Pe={colorFormat:t.RGBA8,depthFormat:Re,scaleFactor:s};f=new XRWebGLBinding(r,t),d=f.createProjectionLayer(Pe),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),u=new vi(d.textureWidth,d.textureHeight,{format:xn,type:Zn,depthTexture:new Fl(d.textureWidth,d.textureHeight,se,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0});const et=e.properties.get(u);et.__ignoreDepthValues=d.ignoreDepthValues}u.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),de.setContext(r),de.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function C(k){for(let te=0;te<k.removed.length;te++){const se=k.removed[te],Re=v.indexOf(se);Re>=0&&(v[Re]=null,x[Re].disconnect(se))}for(let te=0;te<k.added.length;te++){const se=k.added[te];let Re=v.indexOf(se);if(Re===-1){for(let et=0;et<x.length;et++)if(et>=v.length){v.push(se),Re=et;break}else if(v[et]===null){v[et]=se,Re=et;break}if(Re===-1)break}const Pe=x[Re];Pe&&Pe.connect(se)}}const z=new U,q=new U;function $(k,te,se){z.setFromMatrixPosition(te.matrixWorld),q.setFromMatrixPosition(se.matrixWorld);const Re=z.distanceTo(q),Pe=te.projectionMatrix.elements,et=se.projectionMatrix.elements,We=Pe[14]/(Pe[10]-1),Ve=Pe[14]/(Pe[10]+1),lt=(Pe[9]+1)/Pe[5],j=(Pe[9]-1)/Pe[5],Lt=(Pe[8]-1)/Pe[0],Be=(et[8]+1)/et[0],$e=We*Lt,Te=We*Be,gt=Re/(-Lt+Be),Je=gt*-Lt;te.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(Je),k.translateZ(gt),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert();const b=We+gt,y=Ve+gt,V=$e-Je,le=Te+(Re-Je),ie=lt*Ve/y*b,ue=j*Ve/y*b;k.projectionMatrix.makePerspective(V,le,ie,ue,b,y),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}function ee(k,te){te===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(te.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(r===null)return;M.near=T.near=A.near=k.near,M.far=T.far=A.far=k.far,(w!==M.near||F!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),w=M.near,F=M.far);const te=k.parent,se=M.cameras;ee(M,te);for(let Re=0;Re<se.length;Re++)ee(se[Re],te);se.length===2?$(M,A,T):M.projectionMatrix.copy(A.projectionMatrix),Z(k,M,te)};function Z(k,te,se){se===null?k.matrix.copy(te.matrixWorld):(k.matrix.copy(se.matrixWorld),k.matrix.invert(),k.matrix.multiply(te.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(te.projectionMatrix),k.projectionMatrixInverse.copy(te.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=Lr*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&m===null))return c},this.setFoveation=function(k){c=k,d!==null&&(d.fixedFoveation=k),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=k)};let ne=null;function ce(k,te){if(h=te.getViewerPose(l||a),_=te,h!==null){const se=h.views;m!==null&&(e.setRenderTargetFramebuffer(u,m.framebuffer),e.setRenderTarget(u));let Re=!1;se.length!==M.cameras.length&&(M.cameras.length=0,Re=!0);for(let Pe=0;Pe<se.length;Pe++){const et=se[Pe];let We=null;if(m!==null)We=m.getViewport(et);else{const lt=f.getViewSubImage(d,et);We=lt.viewport,Pe===0&&(e.setRenderTargetTextures(u,lt.colorTexture,d.ignoreDepthValues?void 0:lt.depthStencilTexture),e.setRenderTarget(u))}let Ve=K[Pe];Ve===void 0&&(Ve=new hn,Ve.layers.enable(Pe),Ve.viewport=new zt,K[Pe]=Ve),Ve.matrix.fromArray(et.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(et.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(We.x,We.y,We.width,We.height),Pe===0&&(M.matrix.copy(Ve.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),Re===!0&&M.cameras.push(Ve)}}for(let se=0;se<x.length;se++){const Re=v[se],Pe=x[se];Re!==null&&Pe!==void 0&&Pe.update(Re,te,l||a)}ne&&ne(k,te),te.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:te}),_=null}const de=new Nl;de.setAnimationLoop(ce),this.setAnimationLoop=function(k){ne=k},this.dispose=function(){}}}function kg(n,e){function t(p,u){p.matrixAutoUpdate===!0&&p.updateMatrix(),u.value.copy(p.matrix)}function i(p,u){u.color.getRGB(p.fogColor.value,Il(n)),u.isFog?(p.fogNear.value=u.near,p.fogFar.value=u.far):u.isFogExp2&&(p.fogDensity.value=u.density)}function r(p,u,x,v,E){u.isMeshBasicMaterial||u.isMeshLambertMaterial?s(p,u):u.isMeshToonMaterial?(s(p,u),f(p,u)):u.isMeshPhongMaterial?(s(p,u),h(p,u)):u.isMeshStandardMaterial?(s(p,u),d(p,u),u.isMeshPhysicalMaterial&&m(p,u,E)):u.isMeshMatcapMaterial?(s(p,u),_(p,u)):u.isMeshDepthMaterial?s(p,u):u.isMeshDistanceMaterial?(s(p,u),g(p,u)):u.isMeshNormalMaterial?s(p,u):u.isLineBasicMaterial?(a(p,u),u.isLineDashedMaterial&&o(p,u)):u.isPointsMaterial?c(p,u,x,v):u.isSpriteMaterial?l(p,u):u.isShadowMaterial?(p.color.value.copy(u.color),p.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(p,u){p.opacity.value=u.opacity,u.color&&p.diffuse.value.copy(u.color),u.emissive&&p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(p.map.value=u.map,t(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.bumpMap&&(p.bumpMap.value=u.bumpMap,t(u.bumpMap,p.bumpMapTransform),p.bumpScale.value=u.bumpScale,u.side===qt&&(p.bumpScale.value*=-1)),u.normalMap&&(p.normalMap.value=u.normalMap,t(u.normalMap,p.normalMapTransform),p.normalScale.value.copy(u.normalScale),u.side===qt&&p.normalScale.value.negate()),u.displacementMap&&(p.displacementMap.value=u.displacementMap,t(u.displacementMap,p.displacementMapTransform),p.displacementScale.value=u.displacementScale,p.displacementBias.value=u.displacementBias),u.emissiveMap&&(p.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,p.emissiveMapTransform)),u.specularMap&&(p.specularMap.value=u.specularMap,t(u.specularMap,p.specularMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest);const x=e.get(u).envMap;if(x&&(p.envMap.value=x,p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=u.reflectivity,p.ior.value=u.ior,p.refractionRatio.value=u.refractionRatio),u.lightMap){p.lightMap.value=u.lightMap;const v=n._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=u.lightMapIntensity*v,t(u.lightMap,p.lightMapTransform)}u.aoMap&&(p.aoMap.value=u.aoMap,p.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,p.aoMapTransform))}function a(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,u.map&&(p.map.value=u.map,t(u.map,p.mapTransform))}function o(p,u){p.dashSize.value=u.dashSize,p.totalSize.value=u.dashSize+u.gapSize,p.scale.value=u.scale}function c(p,u,x,v){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.size.value=u.size*x,p.scale.value=v*.5,u.map&&(p.map.value=u.map,t(u.map,p.uvTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function l(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.rotation.value=u.rotation,u.map&&(p.map.value=u.map,t(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function h(p,u){p.specular.value.copy(u.specular),p.shininess.value=Math.max(u.shininess,1e-4)}function f(p,u){u.gradientMap&&(p.gradientMap.value=u.gradientMap)}function d(p,u){p.metalness.value=u.metalness,u.metalnessMap&&(p.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,p.metalnessMapTransform)),p.roughness.value=u.roughness,u.roughnessMap&&(p.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,p.roughnessMapTransform)),e.get(u).envMap&&(p.envMapIntensity.value=u.envMapIntensity)}function m(p,u,x){p.ior.value=u.ior,u.sheen>0&&(p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),p.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(p.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,p.sheenColorMapTransform)),u.sheenRoughnessMap&&(p.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,p.sheenRoughnessMapTransform))),u.clearcoat>0&&(p.clearcoat.value=u.clearcoat,p.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(p.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,p.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(p.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===qt&&p.clearcoatNormalScale.value.negate())),u.iridescence>0&&(p.iridescence.value=u.iridescence,p.iridescenceIOR.value=u.iridescenceIOR,p.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(p.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,p.iridescenceMapTransform)),u.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),u.transmission>0&&(p.transmission.value=u.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),u.transmissionMap&&(p.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,p.transmissionMapTransform)),p.thickness.value=u.thickness,u.thicknessMap&&(p.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=u.attenuationDistance,p.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(p.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(p.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=u.specularIntensity,p.specularColor.value.copy(u.specularColor),u.specularColorMap&&(p.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,p.specularColorMapTransform)),u.specularIntensityMap&&(p.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,u){u.matcap&&(p.matcap.value=u.matcap)}function g(p,u){const x=e.get(u).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Hg(n,e,t,i){let r={},s={},a=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(x,v){const E=v.program;i.uniformBlockBinding(x,E)}function l(x,v){let E=r[x.id];E===void 0&&(_(x),E=h(x),r[x.id]=E,x.addEventListener("dispose",p));const P=v.program;i.updateUBOMapping(x,P);const A=e.render.frame;s[x.id]!==A&&(d(x),s[x.id]=A)}function h(x){const v=f();x.__bindingPointIndex=v;const E=n.createBuffer(),P=x.__size,A=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,P,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,E),E}function f(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const v=r[x.id],E=x.uniforms,P=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let A=0,T=E.length;A<T;A++){const K=Array.isArray(E[A])?E[A]:[E[A]];for(let M=0,w=K.length;M<w;M++){const F=K[M];if(m(F,A,M,P)===!0){const D=F.__offset,X=Array.isArray(F.value)?F.value:[F.value];let C=0;for(let z=0;z<X.length;z++){const q=X[z],$=g(q);typeof q=="number"||typeof q=="boolean"?(F.__data[0]=q,n.bufferSubData(n.UNIFORM_BUFFER,D+C,F.__data)):q.isMatrix3?(F.__data[0]=q.elements[0],F.__data[1]=q.elements[1],F.__data[2]=q.elements[2],F.__data[3]=0,F.__data[4]=q.elements[3],F.__data[5]=q.elements[4],F.__data[6]=q.elements[5],F.__data[7]=0,F.__data[8]=q.elements[6],F.__data[9]=q.elements[7],F.__data[10]=q.elements[8],F.__data[11]=0):(q.toArray(F.__data,C),C+=$.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,D,F.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(x,v,E,P){const A=x.value,T=v+"_"+E;if(P[T]===void 0)return typeof A=="number"||typeof A=="boolean"?P[T]=A:P[T]=A.clone(),!0;{const K=P[T];if(typeof A=="number"||typeof A=="boolean"){if(K!==A)return P[T]=A,!0}else if(K.equals(A)===!1)return K.copy(A),!0}return!1}function _(x){const v=x.uniforms;let E=0;const P=16;for(let T=0,K=v.length;T<K;T++){const M=Array.isArray(v[T])?v[T]:[v[T]];for(let w=0,F=M.length;w<F;w++){const D=M[w],X=Array.isArray(D.value)?D.value:[D.value];for(let C=0,z=X.length;C<z;C++){const q=X[C],$=g(q),ee=E%P;ee!==0&&P-ee<$.boundary&&(E+=P-ee),D.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=E,E+=$.storage}}}const A=E%P;return A>0&&(E+=P-A),x.__size=E,x.__cache={},this}function g(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),v}function p(x){const v=x.target;v.removeEventListener("dispose",p);const E=a.indexOf(v.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function u(){for(const x in r)n.deleteBuffer(r[x]);a=[],r={},s={}}return{bind:c,update:l,dispose:u}}class Wl{constructor(e={}){const{canvas:t=Oh(),context:i=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=a;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const u=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Bt,this._useLegacyLights=!1,this.toneMapping=Kn,this.toneMappingExposure=1;const v=this;let E=!1,P=0,A=0,T=null,K=-1,M=null;const w=new zt,F=new zt;let D=null;const X=new st(0);let C=0,z=t.width,q=t.height,$=1,ee=null,Z=null;const ne=new zt(0,0,z,q),ce=new zt(0,0,z,q);let de=!1;const k=new Yo;let te=!1,se=!1,Re=null;const Pe=new Ct,et=new je,We=new U,Ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function lt(){return T===null?$:1}let j=i;function Lt(S,B){for(let G=0;G<S.length;G++){const H=S[G],O=t.getContext(H,B);if(O!==null)return O}return null}try{const S={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Wo}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",I,!1),t.addEventListener("webglcontextcreationerror",fe,!1),j===null){const B=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&B.shift(),j=Lt(B,S),j===null)throw Lt(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&j instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),j.getShaderPrecisionFormat===void 0&&(j.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Be,$e,Te,gt,Je,b,y,V,le,ie,ue,Ce,ye,we,Ge,nt,oe,pt,ot,Ye,De,Me,R,he;function Ie(){Be=new Zp(j),$e=new $p(j,Be,e),Be.init($e),Me=new Og(j,Be,$e),Te=new Ug(j,Be,$e),gt=new em(j),Je=new yg,b=new Ng(j,Be,Te,Je,$e,Me,gt),y=new jp(v),V=new Kp(v),le=new ad(j,$e),R=new Wp(j,Be,le,$e),ie=new Jp(j,le,gt,R),ue=new rm(j,ie,le,gt),ot=new im(j,$e,b),nt=new Xp(Je),Ce=new xg(v,y,V,Be,$e,R,nt),ye=new kg(v,Je),we=new Sg,Ge=new Rg(Be,$e),pt=new Gp(v,y,V,Te,ue,d,c),oe=new Dg(v,ue,$e),he=new Hg(j,gt,$e,Te),Ye=new Vp(j,Be,gt,$e),De=new Qp(j,Be,gt,$e),gt.programs=Ce.programs,v.capabilities=$e,v.extensions=Be,v.properties=Je,v.renderLists=we,v.shadowMap=oe,v.state=Te,v.info=gt}Ie();const be=new zg(v,j);this.xr=be,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){const S=Be.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Be.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(S){S!==void 0&&($=S,this.setSize(z,q,!1))},this.getSize=function(S){return S.set(z,q)},this.setSize=function(S,B,G=!0){if(be.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=S,q=B,t.width=Math.floor(S*$),t.height=Math.floor(B*$),G===!0&&(t.style.width=S+"px",t.style.height=B+"px"),this.setViewport(0,0,S,B)},this.getDrawingBufferSize=function(S){return S.set(z*$,q*$).floor()},this.setDrawingBufferSize=function(S,B,G){z=S,q=B,$=G,t.width=Math.floor(S*G),t.height=Math.floor(B*G),this.setViewport(0,0,S,B)},this.getCurrentViewport=function(S){return S.copy(w)},this.getViewport=function(S){return S.copy(ne)},this.setViewport=function(S,B,G,H){S.isVector4?ne.set(S.x,S.y,S.z,S.w):ne.set(S,B,G,H),Te.viewport(w.copy(ne).multiplyScalar($).floor())},this.getScissor=function(S){return S.copy(ce)},this.setScissor=function(S,B,G,H){S.isVector4?ce.set(S.x,S.y,S.z,S.w):ce.set(S,B,G,H),Te.scissor(F.copy(ce).multiplyScalar($).floor())},this.getScissorTest=function(){return de},this.setScissorTest=function(S){Te.setScissorTest(de=S)},this.setOpaqueSort=function(S){ee=S},this.setTransparentSort=function(S){Z=S},this.getClearColor=function(S){return S.copy(pt.getClearColor())},this.setClearColor=function(){pt.setClearColor.apply(pt,arguments)},this.getClearAlpha=function(){return pt.getClearAlpha()},this.setClearAlpha=function(){pt.setClearAlpha.apply(pt,arguments)},this.clear=function(S=!0,B=!0,G=!0){let H=0;if(S){let O=!1;if(T!==null){const me=T.texture.format;O=me===yl||me===xl||me===vl}if(O){const me=T.texture.type,Se=me===Zn||me===Xn||me===Vo||me===fi||me===gl||me===_l,Ne=pt.getClearColor(),He=pt.getClearAlpha(),Ke=Ne.r,qe=Ne.g,Oe=Ne.b;Se?(m[0]=Ke,m[1]=qe,m[2]=Oe,m[3]=He,j.clearBufferuiv(j.COLOR,0,m)):(_[0]=Ke,_[1]=qe,_[2]=Oe,_[3]=He,j.clearBufferiv(j.COLOR,0,_))}else H|=j.COLOR_BUFFER_BIT}B&&(H|=j.DEPTH_BUFFER_BIT),G&&(H|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),j.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",I,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),we.dispose(),Ge.dispose(),Je.dispose(),y.dispose(),V.dispose(),ue.dispose(),R.dispose(),he.dispose(),Ce.dispose(),be.dispose(),be.removeEventListener("sessionstart",W),be.removeEventListener("sessionend",Q),Re&&(Re.dispose(),Re=null),pe.stop()};function ae(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function I(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const S=gt.autoReset,B=oe.enabled,G=oe.autoUpdate,H=oe.needsUpdate,O=oe.type;Ie(),gt.autoReset=S,oe.enabled=B,oe.autoUpdate=G,oe.needsUpdate=H,oe.type=O}function fe(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function xe(S){const B=S.target;B.removeEventListener("dispose",xe),Xe(B)}function Xe(S){ke(S),Je.remove(S)}function ke(S){const B=Je.get(S).programs;B!==void 0&&(B.forEach(function(G){Ce.releaseProgram(G)}),S.isShaderMaterial&&Ce.releaseShaderCache(S))}this.renderBufferDirect=function(S,B,G,H,O,me){B===null&&(B=Ve);const Se=O.isMesh&&O.matrixWorld.determinant()<0,Ne=Qe(S,B,G,H,O);Te.setMaterial(H,Se);let He=G.index,Ke=1;if(H.wireframe===!0){if(He=ie.getWireframeAttribute(G),He===void 0)return;Ke=2}const qe=G.drawRange,Oe=G.attributes.position;let ft=qe.start*Ke,kt=(qe.start+qe.count)*Ke;me!==null&&(ft=Math.max(ft,me.start*Ke),kt=Math.min(kt,(me.start+me.count)*Ke)),He!==null?(ft=Math.max(ft,0),kt=Math.min(kt,He.count)):Oe!=null&&(ft=Math.max(ft,0),kt=Math.min(kt,Oe.count));const At=kt-ft;if(At<0||At===1/0)return;R.setup(O,H,Ne,G,He);let bt,vt=Ye;if(He!==null&&(bt=le.get(He),vt=De,vt.setIndex(bt)),O.isMesh)H.wireframe===!0?(Te.setLineWidth(H.wireframeLinewidth*lt()),vt.setMode(j.LINES)):vt.setMode(j.TRIANGLES);else if(O.isLine){let rt=H.linewidth;rt===void 0&&(rt=1),Te.setLineWidth(rt*lt()),O.isLineSegments?vt.setMode(j.LINES):O.isLineLoop?vt.setMode(j.LINE_LOOP):vt.setMode(j.LINE_STRIP)}else O.isPoints?vt.setMode(j.POINTS):O.isSprite&&vt.setMode(j.TRIANGLES);if(O.isBatchedMesh)vt.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else if(O.isInstancedMesh)vt.renderInstances(ft,At,O.count);else if(G.isInstancedBufferGeometry){const rt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,nn=Math.min(G.instanceCount,rt);vt.renderInstances(ft,At,nn)}else vt.render(ft,At)};function ut(S,B,G){S.transparent===!0&&S.side===In&&S.forceSinglePass===!1?(S.side=qt,S.needsUpdate=!0,tt(S,B,G),S.side=Jn,S.needsUpdate=!0,tt(S,B,G),S.side=In):tt(S,B,G)}this.compile=function(S,B,G=null){G===null&&(G=S),p=Ge.get(G),p.init(),x.push(p),G.traverseVisible(function(O){O.isLight&&O.layers.test(B.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),S!==G&&S.traverseVisible(function(O){O.isLight&&O.layers.test(B.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights(v._useLegacyLights);const H=new Set;return S.traverse(function(O){const me=O.material;if(me)if(Array.isArray(me))for(let Se=0;Se<me.length;Se++){const Ne=me[Se];ut(Ne,G,O),H.add(Ne)}else ut(me,G,O),H.add(me)}),x.pop(),p=null,H},this.compileAsync=function(S,B,G=null){const H=this.compile(S,B,G);return new Promise(O=>{function me(){if(H.forEach(function(Se){Je.get(Se).currentProgram.isReady()&&H.delete(Se)}),H.size===0){O(S);return}setTimeout(me,10)}Be.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let ct=null;function N(S){ct&&ct(S)}function W(){pe.stop()}function Q(){pe.start()}const pe=new Nl;pe.setAnimationLoop(N),typeof self<"u"&&pe.setContext(self),this.setAnimationLoop=function(S){ct=S,be.setAnimationLoop(S),S===null?pe.stop():pe.start()},be.addEventListener("sessionstart",W),be.addEventListener("sessionend",Q),this.render=function(S,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),be.enabled===!0&&be.isPresenting===!0&&(be.cameraAutoUpdate===!0&&be.updateCamera(B),B=be.getCamera()),S.isScene===!0&&S.onBeforeRender(v,S,B,T),p=Ge.get(S,x.length),p.init(),x.push(p),Pe.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),k.setFromProjectionMatrix(Pe),se=this.localClippingEnabled,te=nt.init(this.clippingPlanes,se),g=we.get(S,u.length),g.init(),u.push(g),Ee(S,B,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(ee,Z),this.info.render.frame++,te===!0&&nt.beginShadows();const G=p.state.shadowsArray;if(oe.render(G,S,B),te===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset(),pt.render(g,S),p.setupLights(v._useLegacyLights),B.isArrayCamera){const H=B.cameras;for(let O=0,me=H.length;O<me;O++){const Se=H[O];Ue(g,S,Se,Se.viewport)}}else Ue(g,S,B);T!==null&&(b.updateMultisampleRenderTarget(T),b.updateRenderTargetMipmap(T)),S.isScene===!0&&S.onAfterRender(v,S,B),R.resetDefaultState(),K=-1,M=null,x.pop(),x.length>0?p=x[x.length-1]:p=null,u.pop(),u.length>0?g=u[u.length-1]:g=null};function Ee(S,B,G,H){if(S.visible===!1)return;if(S.layers.test(B.layers)){if(S.isGroup)G=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(B);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||k.intersectsSprite(S)){H&&We.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Pe);const Se=ue.update(S),Ne=S.material;Ne.visible&&g.push(S,Se,Ne,G,We.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||k.intersectsObject(S))){const Se=ue.update(S),Ne=S.material;if(H&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),We.copy(S.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),We.copy(Se.boundingSphere.center)),We.applyMatrix4(S.matrixWorld).applyMatrix4(Pe)),Array.isArray(Ne)){const He=Se.groups;for(let Ke=0,qe=He.length;Ke<qe;Ke++){const Oe=He[Ke],ft=Ne[Oe.materialIndex];ft&&ft.visible&&g.push(S,Se,ft,G,We.z,Oe)}}else Ne.visible&&g.push(S,Se,Ne,G,We.z,null)}}const me=S.children;for(let Se=0,Ne=me.length;Se<Ne;Se++)Ee(me[Se],B,G,H)}function Ue(S,B,G,H){const O=S.opaque,me=S.transmissive,Se=S.transparent;p.setupLightsView(G),te===!0&&nt.setGlobalState(v.clippingPlanes,G),me.length>0&&_e(O,me,B,G),H&&Te.viewport(w.copy(H)),O.length>0&&ze(O,B,G),me.length>0&&ze(me,B,G),Se.length>0&&ze(Se,B,G),Te.buffers.depth.setTest(!0),Te.buffers.depth.setMask(!0),Te.buffers.color.setMask(!0),Te.setPolygonOffset(!1)}function _e(S,B,G,H){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;const me=$e.isWebGL2;Re===null&&(Re=new vi(1,1,{generateMipmaps:!0,type:Be.has("EXT_color_buffer_half_float")?Cr:Zn,minFilter:Rr,samples:me?4:0})),v.getDrawingBufferSize(et),me?Re.setSize(et.x,et.y):Re.setSize(Es(et.x),Es(et.y));const Se=v.getRenderTarget();v.setRenderTarget(Re),v.getClearColor(X),C=v.getClearAlpha(),C<1&&v.setClearColor(16777215,.5),v.clear();const Ne=v.toneMapping;v.toneMapping=Kn,ze(S,G,H),b.updateMultisampleRenderTarget(Re),b.updateRenderTargetMipmap(Re);let He=!1;for(let Ke=0,qe=B.length;Ke<qe;Ke++){const Oe=B[Ke],ft=Oe.object,kt=Oe.geometry,At=Oe.material,bt=Oe.group;if(At.side===In&&ft.layers.test(H.layers)){const vt=At.side;At.side=qt,At.needsUpdate=!0,Ae(ft,G,H,kt,At,bt),At.side=vt,At.needsUpdate=!0,He=!0}}He===!0&&(b.updateMultisampleRenderTarget(Re),b.updateRenderTargetMipmap(Re)),v.setRenderTarget(Se),v.setClearColor(X,C),v.toneMapping=Ne}function ze(S,B,G){const H=B.isScene===!0?B.overrideMaterial:null;for(let O=0,me=S.length;O<me;O++){const Se=S[O],Ne=Se.object,He=Se.geometry,Ke=H===null?Se.material:H,qe=Se.group;Ne.layers.test(G.layers)&&Ae(Ne,B,G,He,Ke,qe)}}function Ae(S,B,G,H,O,me){S.onBeforeRender(v,B,G,H,O,me),S.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),O.onBeforeRender(v,B,G,H,S,me),O.transparent===!0&&O.side===In&&O.forceSinglePass===!1?(O.side=qt,O.needsUpdate=!0,v.renderBufferDirect(G,B,H,O,S,me),O.side=Jn,O.needsUpdate=!0,v.renderBufferDirect(G,B,H,O,S,me),O.side=In):v.renderBufferDirect(G,B,H,O,S,me),S.onAfterRender(v,B,G,H,O,me)}function tt(S,B,G){B.isScene!==!0&&(B=Ve);const H=Je.get(S),O=p.state.lights,me=p.state.shadowsArray,Se=O.state.version,Ne=Ce.getParameters(S,O.state,me,B,G),He=Ce.getProgramCacheKey(Ne);let Ke=H.programs;H.environment=S.isMeshStandardMaterial?B.environment:null,H.fog=B.fog,H.envMap=(S.isMeshStandardMaterial?V:y).get(S.envMap||H.environment),Ke===void 0&&(S.addEventListener("dispose",xe),Ke=new Map,H.programs=Ke);let qe=Ke.get(He);if(qe!==void 0){if(H.currentProgram===qe&&H.lightsStateVersion===Se)return ge(S,Ne),qe}else Ne.uniforms=Ce.getUniforms(S),S.onBuild(G,Ne,v),S.onBeforeCompile(Ne,v),qe=Ce.acquireProgram(Ne,He),Ke.set(He,qe),H.uniforms=Ne.uniforms;const Oe=H.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Oe.clippingPlanes=nt.uniform),ge(S,Ne),H.needsLights=Tt(S),H.lightsStateVersion=Se,H.needsLights&&(Oe.ambientLightColor.value=O.state.ambient,Oe.lightProbe.value=O.state.probe,Oe.directionalLights.value=O.state.directional,Oe.directionalLightShadows.value=O.state.directionalShadow,Oe.spotLights.value=O.state.spot,Oe.spotLightShadows.value=O.state.spotShadow,Oe.rectAreaLights.value=O.state.rectArea,Oe.ltc_1.value=O.state.rectAreaLTC1,Oe.ltc_2.value=O.state.rectAreaLTC2,Oe.pointLights.value=O.state.point,Oe.pointLightShadows.value=O.state.pointShadow,Oe.hemisphereLights.value=O.state.hemi,Oe.directionalShadowMap.value=O.state.directionalShadowMap,Oe.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Oe.spotShadowMap.value=O.state.spotShadowMap,Oe.spotLightMatrix.value=O.state.spotLightMatrix,Oe.spotLightMap.value=O.state.spotLightMap,Oe.pointShadowMap.value=O.state.pointShadowMap,Oe.pointShadowMatrix.value=O.state.pointShadowMatrix),H.currentProgram=qe,H.uniformsList=null,qe}function it(S){if(S.uniformsList===null){const B=S.currentProgram.getUniforms();S.uniformsList=gs.seqWithValue(B.seq,S.uniforms)}return S.uniformsList}function ge(S,B){const G=Je.get(S);G.outputColorSpace=B.outputColorSpace,G.batching=B.batching,G.instancing=B.instancing,G.instancingColor=B.instancingColor,G.skinning=B.skinning,G.morphTargets=B.morphTargets,G.morphNormals=B.morphNormals,G.morphColors=B.morphColors,G.morphTargetsCount=B.morphTargetsCount,G.numClippingPlanes=B.numClippingPlanes,G.numIntersection=B.numClipIntersection,G.vertexAlphas=B.vertexAlphas,G.vertexTangents=B.vertexTangents,G.toneMapping=B.toneMapping}function Qe(S,B,G,H,O){B.isScene!==!0&&(B=Ve),b.resetTextureUnits();const me=B.fog,Se=H.isMeshStandardMaterial?B.environment:null,Ne=T===null?v.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Fn,He=(H.isMeshStandardMaterial?V:y).get(H.envMap||Se),Ke=H.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,qe=!!G.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Oe=!!G.morphAttributes.position,ft=!!G.morphAttributes.normal,kt=!!G.morphAttributes.color;let At=Kn;H.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(At=v.toneMapping);const bt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,vt=bt!==void 0?bt.length:0,rt=Je.get(H),nn=p.state.lights;if(te===!0&&(se===!0||S!==M)){const an=S===M&&H.id===K;nt.setState(H,S,an)}let Et=!1;H.version===rt.__version?(rt.needsLights&&rt.lightsStateVersion!==nn.state.version||rt.outputColorSpace!==Ne||O.isBatchedMesh&&rt.batching===!1||!O.isBatchedMesh&&rt.batching===!0||O.isInstancedMesh&&rt.instancing===!1||!O.isInstancedMesh&&rt.instancing===!0||O.isSkinnedMesh&&rt.skinning===!1||!O.isSkinnedMesh&&rt.skinning===!0||O.isInstancedMesh&&rt.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&rt.instancingColor===!1&&O.instanceColor!==null||rt.envMap!==He||H.fog===!0&&rt.fog!==me||rt.numClippingPlanes!==void 0&&(rt.numClippingPlanes!==nt.numPlanes||rt.numIntersection!==nt.numIntersection)||rt.vertexAlphas!==Ke||rt.vertexTangents!==qe||rt.morphTargets!==Oe||rt.morphNormals!==ft||rt.morphColors!==kt||rt.toneMapping!==At||$e.isWebGL2===!0&&rt.morphTargetsCount!==vt)&&(Et=!0):(Et=!0,rt.__version=H.version);let Yt=rt.currentProgram;Et===!0&&(Yt=tt(H,B,O));let wi=!1,ni=!1,wn=!1;const Ht=Yt.getUniforms(),ii=rt.uniforms;if(Te.useProgram(Yt.program)&&(wi=!0,ni=!0,wn=!0),H.id!==K&&(K=H.id,ni=!0),wi||M!==S){Ht.setValue(j,"projectionMatrix",S.projectionMatrix),Ht.setValue(j,"viewMatrix",S.matrixWorldInverse);const an=Ht.map.cameraPosition;an!==void 0&&an.setValue(j,We.setFromMatrixPosition(S.matrixWorld)),$e.logarithmicDepthBuffer&&Ht.setValue(j,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Ht.setValue(j,"isOrthographic",S.isOrthographicCamera===!0),M!==S&&(M=S,ni=!0,wn=!0)}if(O.isSkinnedMesh){Ht.setOptional(j,O,"bindMatrix"),Ht.setOptional(j,O,"bindMatrixInverse");const an=O.skeleton;an&&($e.floatVertexTextures?(an.boneTexture===null&&an.computeBoneTexture(),Ht.setValue(j,"boneTexture",an.boneTexture,b)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}O.isBatchedMesh&&(Ht.setOptional(j,O,"batchingTexture"),Ht.setValue(j,"batchingTexture",O._matricesTexture,b));const Bs=G.morphAttributes;if((Bs.position!==void 0||Bs.normal!==void 0||Bs.color!==void 0&&$e.isWebGL2===!0)&&ot.update(O,G,Yt),(ni||rt.receiveShadow!==O.receiveShadow)&&(rt.receiveShadow=O.receiveShadow,Ht.setValue(j,"receiveShadow",O.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(ii.envMap.value=He,ii.flipEnvMap.value=He.isCubeTexture&&He.isRenderTargetTexture===!1?-1:1),ni&&(Ht.setValue(j,"toneMappingExposure",v.toneMappingExposure),rt.needsLights&&mt(ii,wn),me&&H.fog===!0&&ye.refreshFogUniforms(ii,me),ye.refreshMaterialUniforms(ii,H,$,q,Re),gs.upload(j,it(rt),ii,b)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(gs.upload(j,it(rt),ii,b),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Ht.setValue(j,"center",O.center),Ht.setValue(j,"modelViewMatrix",O.modelViewMatrix),Ht.setValue(j,"normalMatrix",O.normalMatrix),Ht.setValue(j,"modelMatrix",O.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const an=H.uniformsGroups;for(let zs=0,mu=an.length;zs<mu;zs++)if($e.isWebGL2){const ca=an[zs];he.update(ca,Yt),he.bind(ca,Yt)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Yt}function mt(S,B){S.ambientLightColor.needsUpdate=B,S.lightProbe.needsUpdate=B,S.directionalLights.needsUpdate=B,S.directionalLightShadows.needsUpdate=B,S.pointLights.needsUpdate=B,S.pointLightShadows.needsUpdate=B,S.spotLights.needsUpdate=B,S.spotLightShadows.needsUpdate=B,S.rectAreaLights.needsUpdate=B,S.hemisphereLights.needsUpdate=B}function Tt(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(S,B,G){Je.get(S.texture).__webglTexture=B,Je.get(S.depthTexture).__webglTexture=G;const H=Je.get(S);H.__hasExternalTextures=!0,H.__hasExternalTextures&&(H.__autoAllocateDepthBuffer=G===void 0,H.__autoAllocateDepthBuffer||Be.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(S,B){const G=Je.get(S);G.__webglFramebuffer=B,G.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(S,B=0,G=0){T=S,P=B,A=G;let H=!0,O=null,me=!1,Se=!1;if(S){const He=Je.get(S);He.__useDefaultFramebuffer!==void 0?(Te.bindFramebuffer(j.FRAMEBUFFER,null),H=!1):He.__webglFramebuffer===void 0?b.setupRenderTarget(S):He.__hasExternalTextures&&b.rebindTextures(S,Je.get(S.texture).__webglTexture,Je.get(S.depthTexture).__webglTexture);const Ke=S.texture;(Ke.isData3DTexture||Ke.isDataArrayTexture||Ke.isCompressedArrayTexture)&&(Se=!0);const qe=Je.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(qe[B])?O=qe[B][G]:O=qe[B],me=!0):$e.isWebGL2&&S.samples>0&&b.useMultisampledRTT(S)===!1?O=Je.get(S).__webglMultisampledFramebuffer:Array.isArray(qe)?O=qe[G]:O=qe,w.copy(S.viewport),F.copy(S.scissor),D=S.scissorTest}else w.copy(ne).multiplyScalar($).floor(),F.copy(ce).multiplyScalar($).floor(),D=de;if(Te.bindFramebuffer(j.FRAMEBUFFER,O)&&$e.drawBuffers&&H&&Te.drawBuffers(S,O),Te.viewport(w),Te.scissor(F),Te.setScissorTest(D),me){const He=Je.get(S.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+B,He.__webglTexture,G)}else if(Se){const He=Je.get(S.texture),Ke=B||0;j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,He.__webglTexture,G||0,Ke)}K=-1},this.readRenderTargetPixels=function(S,B,G,H,O,me,Se){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=Je.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Se!==void 0&&(Ne=Ne[Se]),Ne){Te.bindFramebuffer(j.FRAMEBUFFER,Ne);try{const He=S.texture,Ke=He.format,qe=He.type;if(Ke!==xn&&Me.convert(Ke)!==j.getParameter(j.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Oe=qe===Cr&&(Be.has("EXT_color_buffer_half_float")||$e.isWebGL2&&Be.has("EXT_color_buffer_float"));if(qe!==Zn&&Me.convert(qe)!==j.getParameter(j.IMPLEMENTATION_COLOR_READ_TYPE)&&!(qe===jn&&($e.isWebGL2||Be.has("OES_texture_float")||Be.has("WEBGL_color_buffer_float")))&&!Oe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=S.width-H&&G>=0&&G<=S.height-O&&j.readPixels(B,G,H,O,Me.convert(Ke),Me.convert(qe),me)}finally{const He=T!==null?Je.get(T).__webglFramebuffer:null;Te.bindFramebuffer(j.FRAMEBUFFER,He)}}},this.copyFramebufferToTexture=function(S,B,G=0){const H=Math.pow(2,-G),O=Math.floor(B.image.width*H),me=Math.floor(B.image.height*H);b.setTexture2D(B,0),j.copyTexSubImage2D(j.TEXTURE_2D,G,0,0,S.x,S.y,O,me),Te.unbindTexture()},this.copyTextureToTexture=function(S,B,G,H=0){const O=B.image.width,me=B.image.height,Se=Me.convert(G.format),Ne=Me.convert(G.type);b.setTexture2D(G,0),j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,G.flipY),j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),j.pixelStorei(j.UNPACK_ALIGNMENT,G.unpackAlignment),B.isDataTexture?j.texSubImage2D(j.TEXTURE_2D,H,S.x,S.y,O,me,Se,Ne,B.image.data):B.isCompressedTexture?j.compressedTexSubImage2D(j.TEXTURE_2D,H,S.x,S.y,B.mipmaps[0].width,B.mipmaps[0].height,Se,B.mipmaps[0].data):j.texSubImage2D(j.TEXTURE_2D,H,S.x,S.y,Se,Ne,B.image),H===0&&G.generateMipmaps&&j.generateMipmap(j.TEXTURE_2D),Te.unbindTexture()},this.copyTextureToTexture3D=function(S,B,G,H,O=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const me=S.max.x-S.min.x+1,Se=S.max.y-S.min.y+1,Ne=S.max.z-S.min.z+1,He=Me.convert(H.format),Ke=Me.convert(H.type);let qe;if(H.isData3DTexture)b.setTexture3D(H,0),qe=j.TEXTURE_3D;else if(H.isDataArrayTexture||H.isCompressedArrayTexture)b.setTexture2DArray(H,0),qe=j.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,H.flipY),j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),j.pixelStorei(j.UNPACK_ALIGNMENT,H.unpackAlignment);const Oe=j.getParameter(j.UNPACK_ROW_LENGTH),ft=j.getParameter(j.UNPACK_IMAGE_HEIGHT),kt=j.getParameter(j.UNPACK_SKIP_PIXELS),At=j.getParameter(j.UNPACK_SKIP_ROWS),bt=j.getParameter(j.UNPACK_SKIP_IMAGES),vt=G.isCompressedTexture?G.mipmaps[O]:G.image;j.pixelStorei(j.UNPACK_ROW_LENGTH,vt.width),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,vt.height),j.pixelStorei(j.UNPACK_SKIP_PIXELS,S.min.x),j.pixelStorei(j.UNPACK_SKIP_ROWS,S.min.y),j.pixelStorei(j.UNPACK_SKIP_IMAGES,S.min.z),G.isDataTexture||G.isData3DTexture?j.texSubImage3D(qe,O,B.x,B.y,B.z,me,Se,Ne,He,Ke,vt.data):G.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),j.compressedTexSubImage3D(qe,O,B.x,B.y,B.z,me,Se,Ne,He,vt.data)):j.texSubImage3D(qe,O,B.x,B.y,B.z,me,Se,Ne,He,Ke,vt),j.pixelStorei(j.UNPACK_ROW_LENGTH,Oe),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,ft),j.pixelStorei(j.UNPACK_SKIP_PIXELS,kt),j.pixelStorei(j.UNPACK_SKIP_ROWS,At),j.pixelStorei(j.UNPACK_SKIP_IMAGES,bt),O===0&&H.generateMipmaps&&j.generateMipmap(qe),Te.unbindTexture()},this.initTexture=function(S){S.isCubeTexture?b.setTextureCube(S,0):S.isData3DTexture?b.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?b.setTexture2DArray(S,0):b.setTexture2D(S,0),Te.unbindTexture()},this.resetState=function(){P=0,A=0,T=null,Te.reset(),R.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===$o?"display-p3":"srgb",t.unpackColorSpace=yt.workingColorSpace===Is?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Bt?mi:Sl}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===mi?Bt:Fn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Gg extends Wl{}Gg.prototype.isWebGL1Renderer=!0;class Jo{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new st(e),this.density=t}clone(){return new Jo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Wg extends Dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Vg{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ro,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Nn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const $t=new U;class ws{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix4(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)$t.fromBufferAttribute(this,t),$t.applyNormalMatrix(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)$t.fromBufferAttribute(this,t),$t.transformDirection(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}setX(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=En(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=En(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=En(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=En(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=xt(t,this.array),i=xt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=xt(t,this.array),i=xt(i,this.array),r=xt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=xt(t,this.array),i=xt(i,this.array),r=xt(r,this.array),s=xt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Mn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ws(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Vl extends ei{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new st(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let $i;const _r=new U,Xi=new U,ji=new U,qi=new je,vr=new je,$l=new Ct,cs=new U,xr=new U,ls=new U,Rc=new je,go=new je,Cc=new je;class $g extends Dt{constructor(e=new Vl){if(super(),this.isSprite=!0,this.type="Sprite",$i===void 0){$i=new on;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Vg(t,5);$i.setIndex([0,1,2,0,2,3]),$i.setAttribute("position",new ws(i,3,0,!1)),$i.setAttribute("uv",new ws(i,2,3,!1))}this.geometry=$i,this.material=e,this.center=new je(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Xi.setFromMatrixScale(this.matrixWorld),$l.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ji.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Xi.multiplyScalar(-ji.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const a=this.center;us(cs.set(-.5,-.5,0),ji,a,Xi,r,s),us(xr.set(.5,-.5,0),ji,a,Xi,r,s),us(ls.set(.5,.5,0),ji,a,Xi,r,s),Rc.set(0,0),go.set(1,0),Cc.set(1,1);let o=e.ray.intersectTriangle(cs,xr,ls,!1,_r);if(o===null&&(us(xr.set(-.5,.5,0),ji,a,Xi,r,s),go.set(0,1),o=e.ray.intersectTriangle(cs,ls,xr,!1,_r),o===null))return;const c=e.ray.origin.distanceTo(_r);c<e.near||c>e.far||t.push({distance:c,point:_r.clone(),uv:un.getInterpolation(_r,cs,xr,ls,Rc,go,Cc,new je),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function us(n,e,t,i,r,s){qi.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(vr.x=s*qi.x-r*qi.y,vr.y=r*qi.x+s*qi.y):vr.copy(qi),n.copy(e),n.x+=vr.x,n.y+=vr.y,n.applyMatrix4($l)}class Xl extends ei{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new st(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Lc=new U,Pc=new U,Ic=new Ct,_o=new Nr,hs=new Ur;class Xg extends Dt{constructor(e=new on,t=new Xl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)Lc.fromBufferAttribute(t,r-1),Pc.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Lc.distanceTo(Pc);e.setAttribute("lineDistance",new pn(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),hs.copy(i.boundingSphere),hs.applyMatrix4(r),hs.radius+=s,e.ray.intersectsSphere(hs)===!1)return;Ic.copy(r).invert(),_o.copy(e.ray).applyMatrix4(Ic);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=new U,h=new U,f=new U,d=new U,m=this.isLineSegments?2:1,_=i.index,p=i.attributes.position;if(_!==null){const u=Math.max(0,a.start),x=Math.min(_.count,a.start+a.count);for(let v=u,E=x-1;v<E;v+=m){const P=_.getX(v),A=_.getX(v+1);if(l.fromBufferAttribute(p,P),h.fromBufferAttribute(p,A),_o.distanceSqToSegment(l,h,d,f)>c)continue;d.applyMatrix4(this.matrixWorld);const K=e.ray.origin.distanceTo(d);K<e.near||K>e.far||t.push({distance:K,point:f.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const u=Math.max(0,a.start),x=Math.min(p.count,a.start+a.count);for(let v=u,E=x-1;v<E;v+=m){if(l.fromBufferAttribute(p,v),h.fromBufferAttribute(p,v+1),_o.distanceSqToSegment(l,h,d,f)>c)continue;d.applyMatrix4(this.matrixWorld);const A=e.ray.origin.distanceTo(d);A<e.near||A>e.far||t.push({distance:A,point:f.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}class jl extends ei{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new st(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Dc=new Ct,Io=new Nr,ds=new Ur,fs=new U;class jg extends Dt{constructor(e=new on,t=new jl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ds.copy(i.boundingSphere),ds.applyMatrix4(r),ds.radius+=s,e.ray.intersectsSphere(ds)===!1)return;Dc.copy(r).invert(),Io.copy(e.ray).applyMatrix4(Dc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,f=i.attributes.position;if(l!==null){const d=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let _=d,g=m;_<g;_++){const p=l.getX(_);fs.fromBufferAttribute(f,p),Uc(fs,p,c,r,e,t,this)}}else{const d=Math.max(0,a.start),m=Math.min(f.count,a.start+a.count);for(let _=d,g=m;_<g;_++)fs.fromBufferAttribute(f,_),Uc(fs,_,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Uc(n,e,t,i,r,s,a){const o=Io.distanceSqToPoint(n);if(o<t){const c=new U;Io.closestPointToPoint(n,c),c.applyMatrix4(i);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,object:a})}}class qg extends tn{constructor(e,t,i,r,s,a,o,c,l){super(e,t,i,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Vn extends on{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const h=[],f=new U,d=new U,m=[],_=[],g=[],p=[];for(let u=0;u<=i;u++){const x=[],v=u/i;let E=0;u===0&&a===0?E=.5/t:u===i&&c===Math.PI&&(E=-.5/t);for(let P=0;P<=t;P++){const A=P/t;f.x=-e*Math.cos(r+A*s)*Math.sin(a+v*o),f.y=e*Math.cos(a+v*o),f.z=e*Math.sin(r+A*s)*Math.sin(a+v*o),_.push(f.x,f.y,f.z),d.copy(f).normalize(),g.push(d.x,d.y,d.z),p.push(A+E,1-v),x.push(l++)}h.push(x)}for(let u=0;u<i;u++)for(let x=0;x<t;x++){const v=h[u][x+1],E=h[u][x],P=h[u+1][x],A=h[u+1][x+1];(u!==0||a>0)&&m.push(v,E,A),(u!==i-1||c<Math.PI)&&m.push(E,P,A)}this.setIndex(m),this.setAttribute("position",new pn(_,3)),this.setAttribute("normal",new pn(g,3)),this.setAttribute("uv",new pn(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class yr extends ei{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new st(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new st(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=El,this.normalScale=new je(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ql extends Dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new st(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class Yg extends ql{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Dt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new st(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const vo=new Ct,Nc=new U,Oc=new U;class Kg{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new je(512,512),this.map=null,this.mapPass=null,this.matrix=new Ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Yo,this._frameExtents=new je(1,1),this._viewportCount=1,this._viewports=[new zt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Nc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Nc),Oc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Oc),t.updateMatrixWorld(),vo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vo),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(vo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Zg extends Kg{constructor(){super(new Ol(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Fc extends ql{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Dt.DEFAULT_UP),this.updateMatrix(),this.target=new Dt,this.shadow=new Zg}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Jg{constructor(e,t,i=0,r=1/0){this.ray=new Nr(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new jo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return Do(e,this,i,t),i.sort(Bc),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Do(e[r],this,i,t);return i.sort(Bc),i}}function Bc(n,e){return n.distance-e.distance}function Do(n,e,t,i){if(n.layers.test(e.layers)&&n.raycast(e,t),i===!0){const r=n.children;for(let s=0,a=r.length;s<a;s++)Do(r[s],e,t,!0)}}class zc{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Vt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wo);const kc={type:"change"},xo={type:"start"},Hc={type:"end"},ps=new Nr,Gc=new Wn,Qg=Math.cos(70*ci.DEG2RAD);class e_ extends Mi{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ai.ROTATE,MIDDLE:Ai.DOLLY,RIGHT:Ai.PAN},this.touches={ONE:Ri.ROTATE,TWO:Ri.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(R){R.addEventListener("keydown",Ge),this._domElementKeyEvents=R},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Ge),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(kc),i.update(),s=r.NONE},this.update=function(){const R=new U,he=new xi().setFromUnitVectors(e.up,new U(0,1,0)),Ie=he.clone().invert(),be=new U,ae=new xi,I=new U,fe=2*Math.PI;return function(Xe=null){const ke=i.object.position;R.copy(ke).sub(i.target),R.applyQuaternion(he),o.setFromVector3(R),i.autoRotate&&s===r.NONE&&D(w(Xe)),i.enableDamping?(o.theta+=c.theta*i.dampingFactor,o.phi+=c.phi*i.dampingFactor):(o.theta+=c.theta,o.phi+=c.phi);let ut=i.minAzimuthAngle,ct=i.maxAzimuthAngle;isFinite(ut)&&isFinite(ct)&&(ut<-Math.PI?ut+=fe:ut>Math.PI&&(ut-=fe),ct<-Math.PI?ct+=fe:ct>Math.PI&&(ct-=fe),ut<=ct?o.theta=Math.max(ut,Math.min(ct,o.theta)):o.theta=o.theta>(ut+ct)/2?Math.max(ut,o.theta):Math.min(ct,o.theta)),o.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,o.phi)),o.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(h,i.dampingFactor):i.target.add(h),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor),i.zoomToCursor&&A||i.object.isOrthographicCamera?o.radius=ne(o.radius):o.radius=ne(o.radius*l),R.setFromSpherical(o),R.applyQuaternion(Ie),ke.copy(i.target).add(R),i.object.lookAt(i.target),i.enableDamping===!0?(c.theta*=1-i.dampingFactor,c.phi*=1-i.dampingFactor,h.multiplyScalar(1-i.dampingFactor)):(c.set(0,0,0),h.set(0,0,0));let N=!1;if(i.zoomToCursor&&A){let W=null;if(i.object.isPerspectiveCamera){const Q=R.length();W=ne(Q*l);const pe=Q-W;i.object.position.addScaledVector(E,pe),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){const Q=new U(P.x,P.y,0);Q.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/l)),i.object.updateProjectionMatrix(),N=!0;const pe=new U(P.x,P.y,0);pe.unproject(i.object),i.object.position.sub(pe).add(Q),i.object.updateMatrixWorld(),W=R.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;W!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(W).add(i.object.position):(ps.origin.copy(i.object.position),ps.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(ps.direction))<Qg?e.lookAt(i.target):(Gc.setFromNormalAndCoplanarPoint(i.object.up,i.target),ps.intersectPlane(Gc,i.target))))}else i.object.isOrthographicCamera&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/l)),i.object.updateProjectionMatrix(),N=!0);return l=1,A=!1,N||be.distanceToSquared(i.object.position)>a||8*(1-ae.dot(i.object.quaternion))>a||I.distanceToSquared(i.target)>0?(i.dispatchEvent(kc),be.copy(i.object.position),ae.copy(i.object.quaternion),I.copy(i.target),!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",pt),i.domElement.removeEventListener("pointerdown",b),i.domElement.removeEventListener("pointercancel",V),i.domElement.removeEventListener("wheel",ue),i.domElement.removeEventListener("pointermove",y),i.domElement.removeEventListener("pointerup",V),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",Ge),i._domElementKeyEvents=null)};const i=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const a=1e-6,o=new zc,c=new zc;let l=1;const h=new U,f=new je,d=new je,m=new je,_=new je,g=new je,p=new je,u=new je,x=new je,v=new je,E=new U,P=new je;let A=!1;const T=[],K={};let M=!1;function w(R){return R!==null?2*Math.PI/60*i.autoRotateSpeed*R:2*Math.PI/60/60*i.autoRotateSpeed}function F(R){const he=Math.abs(R*.01);return Math.pow(.95,i.zoomSpeed*he)}function D(R){c.theta-=R}function X(R){c.phi-=R}const C=function(){const R=new U;return function(Ie,be){R.setFromMatrixColumn(be,0),R.multiplyScalar(-Ie),h.add(R)}}(),z=function(){const R=new U;return function(Ie,be){i.screenSpacePanning===!0?R.setFromMatrixColumn(be,1):(R.setFromMatrixColumn(be,0),R.crossVectors(i.object.up,R)),R.multiplyScalar(Ie),h.add(R)}}(),q=function(){const R=new U;return function(Ie,be){const ae=i.domElement;if(i.object.isPerspectiveCamera){const I=i.object.position;R.copy(I).sub(i.target);let fe=R.length();fe*=Math.tan(i.object.fov/2*Math.PI/180),C(2*Ie*fe/ae.clientHeight,i.object.matrix),z(2*be*fe/ae.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(C(Ie*(i.object.right-i.object.left)/i.object.zoom/ae.clientWidth,i.object.matrix),z(be*(i.object.top-i.object.bottom)/i.object.zoom/ae.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function $(R){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?l/=R:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function ee(R){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?l*=R:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function Z(R,he){if(!i.zoomToCursor)return;A=!0;const Ie=i.domElement.getBoundingClientRect(),be=R-Ie.left,ae=he-Ie.top,I=Ie.width,fe=Ie.height;P.x=be/I*2-1,P.y=-(ae/fe)*2+1,E.set(P.x,P.y,1).unproject(i.object).sub(i.object.position).normalize()}function ne(R){return Math.max(i.minDistance,Math.min(i.maxDistance,R))}function ce(R){f.set(R.clientX,R.clientY)}function de(R){Z(R.clientX,R.clientX),u.set(R.clientX,R.clientY)}function k(R){_.set(R.clientX,R.clientY)}function te(R){d.set(R.clientX,R.clientY),m.subVectors(d,f).multiplyScalar(i.rotateSpeed);const he=i.domElement;D(2*Math.PI*m.x/he.clientHeight),X(2*Math.PI*m.y/he.clientHeight),f.copy(d),i.update()}function se(R){x.set(R.clientX,R.clientY),v.subVectors(x,u),v.y>0?$(F(v.y)):v.y<0&&ee(F(v.y)),u.copy(x),i.update()}function Re(R){g.set(R.clientX,R.clientY),p.subVectors(g,_).multiplyScalar(i.panSpeed),q(p.x,p.y),_.copy(g),i.update()}function Pe(R){Z(R.clientX,R.clientY),R.deltaY<0?ee(F(R.deltaY)):R.deltaY>0&&$(F(R.deltaY)),i.update()}function et(R){let he=!1;switch(R.code){case i.keys.UP:R.ctrlKey||R.metaKey||R.shiftKey?X(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):q(0,i.keyPanSpeed),he=!0;break;case i.keys.BOTTOM:R.ctrlKey||R.metaKey||R.shiftKey?X(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):q(0,-i.keyPanSpeed),he=!0;break;case i.keys.LEFT:R.ctrlKey||R.metaKey||R.shiftKey?D(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):q(i.keyPanSpeed,0),he=!0;break;case i.keys.RIGHT:R.ctrlKey||R.metaKey||R.shiftKey?D(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):q(-i.keyPanSpeed,0),he=!0;break}he&&(R.preventDefault(),i.update())}function We(R){if(T.length===1)f.set(R.pageX,R.pageY);else{const he=Me(R),Ie=.5*(R.pageX+he.x),be=.5*(R.pageY+he.y);f.set(Ie,be)}}function Ve(R){if(T.length===1)_.set(R.pageX,R.pageY);else{const he=Me(R),Ie=.5*(R.pageX+he.x),be=.5*(R.pageY+he.y);_.set(Ie,be)}}function lt(R){const he=Me(R),Ie=R.pageX-he.x,be=R.pageY-he.y,ae=Math.sqrt(Ie*Ie+be*be);u.set(0,ae)}function j(R){i.enableZoom&&lt(R),i.enablePan&&Ve(R)}function Lt(R){i.enableZoom&&lt(R),i.enableRotate&&We(R)}function Be(R){if(T.length==1)d.set(R.pageX,R.pageY);else{const Ie=Me(R),be=.5*(R.pageX+Ie.x),ae=.5*(R.pageY+Ie.y);d.set(be,ae)}m.subVectors(d,f).multiplyScalar(i.rotateSpeed);const he=i.domElement;D(2*Math.PI*m.x/he.clientHeight),X(2*Math.PI*m.y/he.clientHeight),f.copy(d)}function $e(R){if(T.length===1)g.set(R.pageX,R.pageY);else{const he=Me(R),Ie=.5*(R.pageX+he.x),be=.5*(R.pageY+he.y);g.set(Ie,be)}p.subVectors(g,_).multiplyScalar(i.panSpeed),q(p.x,p.y),_.copy(g)}function Te(R){const he=Me(R),Ie=R.pageX-he.x,be=R.pageY-he.y,ae=Math.sqrt(Ie*Ie+be*be);x.set(0,ae),v.set(0,Math.pow(x.y/u.y,i.zoomSpeed)),$(v.y),u.copy(x);const I=(R.pageX+he.x)*.5,fe=(R.pageY+he.y)*.5;Z(I,fe)}function gt(R){i.enableZoom&&Te(R),i.enablePan&&$e(R)}function Je(R){i.enableZoom&&Te(R),i.enableRotate&&Be(R)}function b(R){i.enabled!==!1&&(T.length===0&&(i.domElement.setPointerCapture(R.pointerId),i.domElement.addEventListener("pointermove",y),i.domElement.addEventListener("pointerup",V)),ot(R),R.pointerType==="touch"?nt(R):le(R))}function y(R){i.enabled!==!1&&(R.pointerType==="touch"?oe(R):ie(R))}function V(R){Ye(R),T.length===0&&(i.domElement.releasePointerCapture(R.pointerId),i.domElement.removeEventListener("pointermove",y),i.domElement.removeEventListener("pointerup",V)),i.dispatchEvent(Hc),s=r.NONE}function le(R){let he;switch(R.button){case 0:he=i.mouseButtons.LEFT;break;case 1:he=i.mouseButtons.MIDDLE;break;case 2:he=i.mouseButtons.RIGHT;break;default:he=-1}switch(he){case Ai.DOLLY:if(i.enableZoom===!1)return;de(R),s=r.DOLLY;break;case Ai.ROTATE:if(R.ctrlKey||R.metaKey||R.shiftKey){if(i.enablePan===!1)return;k(R),s=r.PAN}else{if(i.enableRotate===!1)return;ce(R),s=r.ROTATE}break;case Ai.PAN:if(R.ctrlKey||R.metaKey||R.shiftKey){if(i.enableRotate===!1)return;ce(R),s=r.ROTATE}else{if(i.enablePan===!1)return;k(R),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(xo)}function ie(R){switch(s){case r.ROTATE:if(i.enableRotate===!1)return;te(R);break;case r.DOLLY:if(i.enableZoom===!1)return;se(R);break;case r.PAN:if(i.enablePan===!1)return;Re(R);break}}function ue(R){i.enabled===!1||i.enableZoom===!1||s!==r.NONE||(R.preventDefault(),i.dispatchEvent(xo),Pe(Ce(R)),i.dispatchEvent(Hc))}function Ce(R){const he=R.deltaMode,Ie={clientX:R.clientX,clientY:R.clientY,deltaY:R.deltaY};switch(he){case 1:Ie.deltaY*=16;break;case 2:Ie.deltaY*=100;break}return R.ctrlKey&&!M&&(Ie.deltaY*=10),Ie}function ye(R){R.key==="Control"&&(M=!0,document.addEventListener("keyup",we,{passive:!0,capture:!0}))}function we(R){R.key==="Control"&&(M=!1,document.removeEventListener("keyup",we,{passive:!0,capture:!0}))}function Ge(R){i.enabled===!1||i.enablePan===!1||et(R)}function nt(R){switch(De(R),T.length){case 1:switch(i.touches.ONE){case Ri.ROTATE:if(i.enableRotate===!1)return;We(R),s=r.TOUCH_ROTATE;break;case Ri.PAN:if(i.enablePan===!1)return;Ve(R),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(i.touches.TWO){case Ri.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;j(R),s=r.TOUCH_DOLLY_PAN;break;case Ri.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Lt(R),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(xo)}function oe(R){switch(De(R),s){case r.TOUCH_ROTATE:if(i.enableRotate===!1)return;Be(R),i.update();break;case r.TOUCH_PAN:if(i.enablePan===!1)return;$e(R),i.update();break;case r.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;gt(R),i.update();break;case r.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Je(R),i.update();break;default:s=r.NONE}}function pt(R){i.enabled!==!1&&R.preventDefault()}function ot(R){T.push(R.pointerId)}function Ye(R){delete K[R.pointerId];for(let he=0;he<T.length;he++)if(T[he]==R.pointerId){T.splice(he,1);return}}function De(R){let he=K[R.pointerId];he===void 0&&(he=new je,K[R.pointerId]=he),he.set(R.pageX,R.pageY)}function Me(R){const he=R.pointerId===T[0]?T[1]:T[0];return K[he]}i.domElement.addEventListener("contextmenu",pt),i.domElement.addEventListener("pointerdown",b),i.domElement.addEventListener("pointercancel",V),i.domElement.addEventListener("wheel",ue,{passive:!1}),document.addEventListener("keydown",ye,{passive:!0,capture:!0}),this.update()}}const Yl="mempalace-viz-graph-rel-filters-v1",Wc={tunnel:{label:"Tunnel",shortLabel:"Tunnel",description:"Same room name appearing in multiple wings — a cross-wing structural link from tunnel discovery (not semantic similarity)."},taxonomy_adjacency:{label:"Taxonomy adjacency",shortLabel:"Adjacency",description:"Inferred same-wing neighbor: consecutive rooms when sorted by name (structural chain, not topical similarity)."},unknown:{label:"Other",shortLabel:"Other",description:"Edges whose relationship type is not listed in the viewer registry."}};function Uo(n){const e=n&&Wc[n]?n:"unknown";return{type:e,...Wc[e]}}function Si(n){if(!n||typeof n!="object")return"tunnel";const e=n.relationshipType;return typeof e=="string"&&e.trim()?e.trim():"tunnel"}function ur(n){const e=new Set;for(const t of n||[])e.add(Si(t));return[...e].sort()}function Vc(n){const e=n||"tunnel";return e==="tunnel"?{color:5999871,opacity:.44}:e==="taxonomy_adjacency"?{color:4049336,opacity:.28}:e==="unknown"?{color:9741240,opacity:.32}:{color:10980346,opacity:.3}}function t_(n,e){const t=new Set(e||[]);if(t.size===0)return new Set;if(n==null)return new Set(t);if(Array.isArray(n)&&n.length===0)return new Set;const i=new Set;for(const r of n)typeof r=="string"&&t.has(r)&&i.add(r);return i}function Ns(n,e){const t=[...e||[]].sort();return t.length===0?null:!n||n.size===0?new Set:n.size===t.length&&t.every(r=>n.has(r))?null:n}function Os(n,e){if(!e||e.size===0)return[];const t=[];for(const i of n||[])e.has(Si(i))&&t.push(i);return t}function n_(n){const e={};for(const t of n||[]){const i=Si(t);e[i]=(e[i]||0)+1}return e}function i_(n,e){const t=Os(n,e);return{visibleEdgeCount:t.length,visibleByType:n_(t),visibleEdges:t}}function r_(n){if(!n||typeof n!="object")return null;const e=n.enabledTypes;return Array.isArray(e)?e.filter(t=>typeof t=="string"):null}function s_(n,e){const t=[],i=n==null?void 0:n.sources;Array.isArray(i)&&i.length&&t.push(`Sources: ${i.join(", ")}`);const r=n==null?void 0:n.truncatedSources;Array.isArray(r)&&r.some(o=>o==null?void 0:o.truncated)&&t.push("Some sources may be truncated upstream — tunnel list can be incomplete.");const s=((n==null?void 0:n.completenessNotes)||[]).filter(Boolean);s.length&&t.push(s[0]);const a=e!=null&&e.byType&&typeof e.byType=="object"?e.byType:null;if(a&&Object.keys(a).length){const o=Object.entries(a).map(([c,l])=>`${c}: ${l}`).join(" · ");t.push(`Types in payload: ${o}`)}return t.filter(Boolean).join(" ")}function rr(n,e=6){if(!n||typeof n!="object")return"";const t=Object.entries(n).filter(([,r])=>r>0).sort((r,s)=>s[1]-r[1]);return t.length?t.slice(0,e).map(([r,s])=>{const a=Uo(r);return`${s} ${a.shortLabel.toLowerCase()}`}).join(" · "):""}function o_(n,e){const t=Object.values(n||{}).reduce((c,l)=>c+l,0),i=Object.values(e||{}).reduce((c,l)=>c+l,0);if(i===0)return null;const r=(n==null?void 0:n.tunnel)||0,s=(n==null?void 0:n.taxonomy_adjacency)||0,a=(e==null?void 0:e.tunnel)||0,o=(e==null?void 0:e.taxonomy_adjacency)||0;return t===0&&i>0?"No visible links with current filters; totals above are global.":s>r*2&&o>0?"Most of this room’s visible links are inferred same-wing adjacency.":r>s*2&&a>0?"Most of this room’s visible links are cross-wing tunnel connections.":r>0&&s===0&&o>0?"Only tunnel links are visible; inferred adjacency is hidden by filters.":s>0&&r===0&&a>0?"Only inferred adjacency is visible; tunnel links are hidden by filters.":null}function a_(n,e,t){const i=Math.max(1,n),r=Math.max(0,e),s=Math.max(1,t),a=r/i;let o=0;i>90||a>2.8?o=3:i>48||a>1.75?o=2:(i>24||a>1.05)&&(o=1);const c=o>=3?85:o>=2?130:o>=1?175:235,l=.00155+o*42e-5,h=o>=2?.68:o>=1?.82:1,f=o>=3?.74:o>=2?.86:1,d=o>=2?1.08:1,m=1+o*.22,_=1-o*.04,g=1+o*.12,p=.004+o*.0025,u=4+o*5,x=2.1+o*.55,v=48+o*14;return{tier:o,nodeCount:i,edgeCount:r,wingCount:s,edgeDensity:a,labelBudget:c,fogDensity:l,adjacencyOpacityMult:h,globalEdgeOpacityMult:f,tunnelEmphasisMult:d,repelScale:m,attractScale:_,centerScale:g,wingCohesion:p,depthJitter:u,collisionMinDist:x,forceIterations:v}}function c_(n){return{repelStrength:88*n.repelScale,attractStrength:.0115*n.attractScale,centerStrength:.0052*n.centerScale,wingCohesion:n.wingCohesion,iterations:n.forceIterations}}function Sr(n){let e=2166136261;const t=String(n||"");for(let i=0;i<t.length;i+=1)e^=t.charCodeAt(i),e=Math.imul(e,16777619);return(e>>>0)/4294967296}function l_(n,e,t){const i=Math.max(1,e.length),r=26+Math.min(48,n.length*.35),s=7+t.tier*2.2,a=9+t.tier*1.8,o=new Map;e.forEach((l,h)=>{const f=h/i*Math.PI*2,d=r*(1+h%5*.04),m=Math.cos(f)*d,_=Math.sin(f)*d,g=((h+.5)/i-.5)*s*2.2;o.set(l,{x:m,y:g,z:_})});const c=new Map;n.forEach(l=>{if(l.type==="room"&&l.wing){const h=c.get(l.wing)||[];h.push(l),c.set(l.wing,h)}}),e.forEach(l=>{const h=c.get(l)||[],f=o.get(l)||{x:0,y:0,z:0},d=Math.max(h.length,1);h.forEach((m,_)=>{const g=_/d*Math.PI*2,p=Sr(`${l}|${m.name}|${_}`),u=Sr(`${m.name}|z`),x=a*(.45+.55*p),v=(u-.5)*t.depthJitter;m.x=f.x+Math.cos(g)*x,m.y=f.y+Math.sin(g*1.7)*x*.42+v,m.z=f.z+Math.sin(g)*x})}),n.forEach(l=>{if(l.type==="wing"){const h=o.get(l.name)||{x:0,y:0,z:0},f=Sr(`wing|${l.name}`);l.x=h.x*.22+(f-.5)*3,l.y=h.y+(f-.5)*4,l.z=h.z*.22+(Sr(`${l.name}z`)-.5)*3}})}function u_(n,e,t,i){const r=c_(t),{repelStrength:s,attractStrength:a,centerStrength:o,wingCohesion:c,iterations:l}=r,h=new Map;n.forEach(f=>{f.type==="wing"&&f.name&&h.set(f.name,f)});for(let f=0;f<l;f+=1){for(let d=0;d<n.length;d+=1)for(let m=d+1;m<n.length;m+=1){const _=n[d].x-n[m].x,g=n[d].y-n[m].y,p=n[d].z-n[m].z,u=Math.sqrt(_*_+g*g+p*p)+.12;let x=s/(u*u);const v=n[d].wing,E=n[m].wing;v&&E&&v!==E&&(x*=1.12),n[d].x+=_*x,n[d].y+=g*x,n[d].z+=p*x,n[m].x-=_*x,n[m].y-=g*x,n[m].z-=p*x}e.forEach(d=>{const m=i(n,d,"from"),_=i(n,d,"to");if(m&&_){let g=_.x-m.x,p=_.y-m.y,u=_.z-m.z,x=a;m.wing&&_.wing&&m.wing!==_.wing&&(x*=1.15),m.x+=g*x,m.y+=p*x,m.z+=u*x,_.x-=g*x,_.y-=p*x,_.z-=u*x}}),n.forEach(d=>{if(d.type==="room"&&d.wing){const m=h.get(d.wing);m&&(d.x+=(m.x-d.x)*c,d.y+=(m.y-d.y)*c,d.z+=(m.z-d.z)*c)}d.x*=1-o,d.y*=1-o,d.z*=1-o})}}function h_(n,e,t=10){for(let i=0;i<t;i+=1)for(let r=0;r<n.length;r+=1)for(let s=r+1;s<n.length;s+=1){const a=n[r],o=n[s];let c=a.x-o.x,l=a.y-o.y,h=a.z-o.z;const f=Math.sqrt(c*c+l*l+h*h)+1e-8;if(f<e){const d=(e-f)*.52,m=c/f,_=l/f,g=h/f;a.x+=m*d,a.y+=_*d,a.z+=g*d,o.x-=m*d,o.y-=_*d,o.z-=g*d}}}function d_(n,e){const t=Math.max(12,e),i=t*.85,r=t*4.2,s=(n-i)/(r-i);return Math.max(0,Math.min(1,s))}function f_(n,e,t){const i=Math.max(8,Math.floor(n)),r=Math.max(0,Math.min(3,t)),s=Math.max(0,Math.min(1,e)),a=.38+r*.06,c=a+(1-a)*s;return Math.max(8,Math.floor(i*c))}function p_(n,e={}){let i=.74+Math.max(0,Math.min(1,n))*.38;return e.pinned?i*=1.12:e.selected?i*=1.08:e.hovered&&(i*=1.05),i}function m_(n,e={}){const t=Math.max(0,Math.min(1,n));let i=.52+t*.46;return e.selected&&(i=Math.max(i,.94)),e.hovered&&(i=Math.max(i,.9)),e.neighbor&&(i=Math.max(i,.62+t*.28)),Math.max(.35,Math.min(1,i))}function Kl(n){if(!n||!n.startsWith("room:"))return null;const e=n.slice(5),t=e.indexOf(":");return t===-1?null:e.slice(0,t)}function g_(n){return n?n.startsWith("room:")?Kl(n):n.startsWith("wing:")?n.slice(5):null:null}function __(n,e,t){const i=new Map;function r(s,a){!s||!a||s===a||(i.has(s)||i.set(s,new Set),i.has(a)||i.set(a,new Set),i.get(s).add(a),i.get(a).add(s))}for(const s of n||[]){const a=t(e,s,"from"),o=t(e,s,"to"),c=sr(a),l=sr(o);c!=null&&c.startsWith("room:")&&(l!=null&&l.startsWith("room:"))&&r(c,l)}return i}function Yi(n,e){const t=new Set;if(!n)return t;const i=e.get(n);return i&&i.forEach(r=>t.add(r)),t}function No(n,e){return{primaryId:n||e||null,secondaryHoverId:n&&e&&e!==n?e:null}}function v_(n,e){const t=n.filter(l=>l.id.startsWith("room:")),i=e.nodeCount>300?e.labelBudget*5:e.nodeCount>160?e.labelBudget*4:t.length,r=Math.max(24,Math.min(t.length,i)),s=t.filter(l=>(l.incidentFull||0)>0),a=t.filter(l=>(l.incidentFull||0)===0),o=(l,h)=>h.baseScore-l.baseScore;s.sort(o),a.sort(o);const c=[];for(const l of s){if(c.length>=r)break;c.push(l.id)}for(const l of a){if(c.length>=r)break;c.push(l.id)}return new Set(c)}function x_(n,e){const{selectedId:t,hoveredId:i,pinActive:r,budget:s,neighborIds:a=null,focusWingId:o=null,cameraDistanceNorm:c=.55,densityTier:l=0}=e,h=f_(s,c,l),f=Math.max(8,Math.floor(h)),d=Math.max(0,Math.min(3,l)),m=3500+d*220,_=1200+d*80,g=n.map(({id:p,baseScore:u})=>{let x=u;return p===t&&(x+=1e6),r&&p===t&&(x+=2e5),p===i&&(x+=5e5),a&&a.has(p)&&(x+=m),o&&Kl(p)===o&&(x+=_),{id:p,score:x}});return g.sort((p,u)=>u.score-p.score),new Set(g.slice(0,f).map(p=>p.id))}function y_(n){const e=Math.min(220,(n.incidentFull||0)*24),t=Math.min(100,(n.drawers||0)*1.8),i=n.type==="wing"?45:0;return 20+e+t+i}function M_(n){const{selectedId:e,hoveredId:t,fromId:i,toId:r,relationshipType:s,densityTier:a}=n,{primaryId:o,secondaryHoverId:c}=No(e,t),l=o&&(i===o||r===o),h=c&&(i===c||r===c),f=s==="tunnel",d=Math.max(0,Math.min(3,a));return o?l?f?1.24:1.06:h?(f?.88:.78)*(d>=2?.92:1):d>=3?.36:d>=2?.4:d>=1?.52:.68:d>=3?f?.92:.78:1}function S_(n,e,t={}){const{isNeighbor:i=!1,focusActive:r=!1}=t;if(!r)return 1;const s=Math.max(0,Math.min(3,e)),a=38+s*18,o=155+s*35;let c=1.05-(n-a)/o;return i&&(c=.55+c*.45),c=Math.max(s===0?.58:.34,Math.min(1.08,c)),c}function E_(n,e,t=0){const i=Math.max(8,n),r=Math.max(0,Math.min(3,e)),s=Sr(`frame|${t}`),a=i*(.028+r*.006),o=i*(.045+r*.008)*(s-.5)*2;return{x:o,y:a,z:-o*.4}}function $c(n,e,t,i={}){const r=e*Math.PI/180,s=Math.max(0,i.neighborCount||0),a=1.28+t*.06+Math.min(.14,s*.018),c=Math.max(4,n)*a/Math.tan(r/2),l=16+t*4;return Math.min(240,Math.max(l,c))}function b_(n,e){let t=0;for(const i of e){const r=i.x-n.x,s=i.y-n.y,a=i.z-n.z;t=Math.max(t,Math.sqrt(r*r+s*s+a*a))}return t}function sr(n){return n?n.type==="wing"&&n.name?`wing:${n.name}`:n.type==="room"&&n.wing&&n.name?`room:${n.wing}:${n.name}`:null:null}function w_(n,e,t){const i=new Map;for(const r of e||[]){const s=t(n,r,"from"),a=t(n,r,"to"),o=sr(s),c=sr(a);o!=null&&o.startsWith("room:")&&i.set(o,(i.get(o)||0)+1),c!=null&&c.startsWith("room:")&&i.set(c,(i.get(c)||0)+1)}return i}function Zt(n,e,t=null){var o,c;if(n==null||typeof n!="string")return null;const i=n.trim();if(!i)return null;const r=yn(i);if(r){const{wingId:l,roomName:h}=r;if((o=e[l])!=null&&o.some(f=>f.name===h))return{wing:l,room:h,key:It(l,h)}}if(i.includes("/")){const l=i.indexOf("/"),h=i.slice(0,l),f=i.slice(l+1);return(c=e[h])!=null&&c.some(d=>d.name===f)?{wing:h,room:f,key:It(h,f)}:null}const s=[];for(const[l,h]of Object.entries(e||{}))if(Array.isArray(h))for(const f of h)f.name===i&&s.push({wing:l,room:i,key:`${l}/${i}`});if(s.length===0)return null;if(s.length===1){const l=s[0];return{...l,key:It(l.wing,l.room)}}if(t&&s.some(l=>l.wing===t)){const l=s.find(h=>h.wing===t)||s[0];return{...l,key:It(l.wing,l.room)}}const a=s[0];return{...a,key:It(a.wing,a.room)}}function T_(n,e,t=null){if(t!=null&&typeof t=="number")return t;const i=Array.isArray(n)?n:[],r=e&&typeof e=="object"?e:{};let s=0;for(const a of i){const o=Zt(a.from,r,null),c=Zt(a.to,r,a.wing||null);(!o||!c)&&(s+=1)}return s}function A_(n,e,t,i){var F;const r=n&&typeof n=="object"?n:{},s=Array.isArray(e)?e:[],a=new Set,o=new Map,c=new Map,l=new Map,h=new Map;function f(D,X){h.has(D)||h.set(D,new Set),h.get(D).add(X)}function d(D,X,C=1){D.set(X,(D.get(X)||0)+C)}let m=0,_=0;for(const D of s){const X=D.sourceRoomId,C=D.targetRoomId;if(!X||!C||X===C)continue;const z=X<C?`${X}||${C}`:`${C}||${X}`;if(a.has(z))continue;a.add(z),d(o,X),d(o,C),D.sourceWingId!==D.targetWingId?(m+=1,d(c,X),d(c,C)):(_+=1,d(l,X),d(l,C)),f(X,C),f(C,X)}const g=new Set([...o.keys()]),p=new Set;for(const[D,X]of Object.entries(r))if(Array.isArray(X))for(const C of X)p.add(C.roomId||It(D,C.name));const u=[];for(const D of p)g.has(D)||u.push(D);let x=m+_;t&&typeof t.resolvedEdgeCount=="number"&&(x=t.resolvedEdgeCount);const v=x>0?m/x:null;let P=[...o.entries()].sort((D,X)=>X[1]-D[1]).slice(0,8).map(([D,X])=>{const C=yn(D);return{wing:(C==null?void 0:C.wingId)??D.split("/")[0],room:(C==null?void 0:C.roomName)??D.slice(D.indexOf("/")+1),key:D,degree:X}});(F=i==null?void 0:i.topConnectedRooms)!=null&&F.length&&(P=i.topConnectedRooms.slice(0,8).map(D=>({wing:D.wingId,room:D.name,key:D.roomId,degree:D.degree})));const A=new Map;for(const D of s)D.sourceWingId!==D.targetWingId&&(d(A,D.sourceWingId),d(A,D.targetWingId));const T=[...A.entries()].sort((D,X)=>X[1]-D[1]).slice(0,8).map(([D,X])=>({wing:D,crossEdges:X})),K=Zl(o),M=t&&typeof t.crossWingEdgeCount=="number"?t.crossWingEdgeCount:null,w=t&&typeof t.intraWingEdgeCount=="number"?t.intraWingEdgeCount:null;return{edgeCount:s.length,resolvedEdgeCount:x,crossWingEdgeCount:M??m,intraWingEdgeCount:w??_,byRelationshipType:t!=null&&t.byType&&typeof t.byType=="object"?{...t.byType}:null,crossFraction:v,degreeByKey:o,crossByKey:c,intraByKey:l,neighborsByKey:h,topConnectedRooms:P,topCrossLinkedWings:T,roomsWithNoTunnels:typeof(i==null?void 0:i.roomsWithNoLinks)=="number"?i.roomsWithNoLinks:u.length,noTunnelRoomKeys:u.slice(0,50),medianRoomDegree:K,hasResolvableEdges:x>0}}function R_(n,e,t,i){var w;const r=Array.isArray(n)?n:[],s=e&&typeof e=="object"?e:{},a=new Set,o=new Map,c=new Map,l=new Map,h=new Map;function f(F,D){h.has(F)||h.set(F,new Set),h.get(F).add(D)}function d(F,D,X=1){F.set(D,(F.get(D)||0)+X)}for(const F of r){const D=Zt(F.from,s,null),X=Zt(F.to,s,F.wing||null);if(!D||!X)continue;const C=D.key,z=X.key;if(C===z)continue;const q=C<z?`${C}||${z}`:`${z}||${C}`;if(a.has(q))continue;a.add(q),d(o,C),d(o,z),D.wing!==X.wing?(d(c,C),d(c,z)):(d(l,C),d(l,z)),f(C,z),f(z,C)}const m=new Set;for(const[F,D]of Object.entries(s))if(Array.isArray(D))for(const X of D)m.add(It(F,X.name));const _=[];for(const F of m)o.has(F)||_.push(F);let g=0,p=0;for(const F of r){const D=Zt(F.from,s,null),X=Zt(F.to,s,F.wing||null);!D||!X||(D.wing!==X.wing?g+=1:p+=1)}const u=g+p,x=u>0?g/u:null;let E=[...o.entries()].sort((F,D)=>D[1]-F[1]).slice(0,8).map(([F,D])=>{const X=yn(F);return{wing:(X==null?void 0:X.wingId)??F.split("/")[0],room:(X==null?void 0:X.roomName)??F.slice(F.indexOf("/")+1),key:F,degree:D}});(w=i==null?void 0:i.topConnectedRooms)!=null&&w.length&&(E=i.topConnectedRooms.slice(0,8).map(F=>({wing:F.wingId,room:F.name,key:F.roomId,degree:F.degree})));const P=new Map;for(const F of r){const D=Zt(F.from,s,null),X=Zt(F.to,s,F.wing||null);!D||!X||D.wing===X.wing||(d(P,D.wing),d(P,X.wing))}const A=[...P.entries()].sort((F,D)=>D[1]-F[1]).slice(0,8).map(([F,D])=>({wing:F,crossEdges:D})),T=Zl(o),K=t&&typeof t.crossWingEdgeCount=="number"?t.crossWingEdgeCount:null,M=t&&typeof t.intraWingEdgeCount=="number"?t.intraWingEdgeCount:null;return{edgeCount:r.length,resolvedEdgeCount:u,crossWingEdgeCount:K??g,intraWingEdgeCount:M??p,crossFraction:x,degreeByKey:o,crossByKey:c,intraByKey:l,neighborsByKey:h,topConnectedRooms:E,topCrossLinkedWings:A,roomsWithNoTunnels:typeof(i==null?void 0:i.roomsWithNoLinks)=="number"?i.roomsWithNoLinks:_.length,noTunnelRoomKeys:_.slice(0,50),medianRoomDegree:T,hasResolvableEdges:u>0}}function C_(n,e={}){const{edgesResolved:t,graphEdges:i,graphSummary:r=null,overviewStats:s=null}=e;return t!=null&&t.length?A_(n,t,r,s):R_(i||[],n,r,s)}function Zl(n){const e=[...n.values()].sort((i,r)=>i-r);if(!e.length)return null;const t=Math.floor(e.length/2);return e.length%2?e[t]:(e[t-1]+e[t])/2}function L_(n,e){var h;if(!e||!n)return null;const t=e.degreeByKey.get(n)??0,i=e.crossByKey.get(n)??0,r=e.intraByKey.get(n)??0,s=e.neighborsByKey.get(n),a=s?[...s]:[],o=a.slice(0,12).map(f=>{const d=yn(f),m=e.degreeByKey.get(f)??0;return{wing:(d==null?void 0:d.wingId)??f.split("/")[0],room:(d==null?void 0:d.roomName)??f.slice(f.indexOf("/")+1),key:f,degree:m}});o.sort((f,d)=>d.degree-f.degree);const c=new Map;for(const f of a){const d=(h=yn(f))==null?void 0:h.wingId;d&&c.set(d,(c.get(d)||0)+1)}const l=[...c.entries()].sort((f,d)=>d[1]-f[1]).slice(0,8).map(([f,d])=>({wing:f,links:d}));return{degree:t,crossWingLinks:i,intraWingLinks:r,medianDegree:e.medianRoomDegree,relatedRooms:o.slice(0,8),relatedWings:l,isBridge:i>=1&&a.length>0}}function Xc(n,e){if(!n||!Array.isArray(e))return{degree:0,crossWingLinks:0,intraWingLinks:0,byType:{},relatedRoomKeys:[]};let t=0,i=0,r=0;const s={},a=[];for(const o of e){const c=o.sourceRoomId,l=o.targetRoomId;if(!c||!l||c!==n&&l!==n)continue;t+=1;const h=o.relationshipType||"tunnel";s[h]=(s[h]||0)+1,o.sourceWingId!=null&&o.targetWingId!=null&&o.sourceWingId!==o.targetWingId?i+=1:r+=1,a.push(c===n?l:c)}return{degree:t,crossWingLinks:i,intraWingLinks:r,byType:s,relatedRoomKeys:[...new Set(a)]}}function jc(n,e){const t={};let i=0;for(const r of e||[]){if(!r.sourceWingId||!r.targetWingId||!(r.sourceWingId===n||r.targetWingId===n))continue;const a=r.relationshipType||"tunnel";t[a]=(t[a]||0)+1,r.sourceWingId!==r.targetWingId&&(i+=1)}return{byType:t,crossWingTouches:i}}function P_(n,e,t,i=null){if(i!=null&&i.length)return I_(n,i);const r=Array.isArray(e)?e:[],s=new Map;let a=0;for(const h of r){const f=Zt(h.from,t,n),d=Zt(h.to,t,h.wing||null);if(!f||!d||f.wing===d.wing||f.wing!==n&&d.wing!==n)continue;a+=1;const m=f.wing===n?d:f;s.set(m.wing,(s.get(m.wing)||0)+1)}const o=[...s.entries()].sort((h,f)=>f[1]-h[1]).slice(0,6).map(([h,f])=>({wing:h,edges:f})),c=new Map;for(const h of r){const f=Zt(h.from,t,n),d=Zt(h.to,t,h.wing||null);!f||!d||(f.wing===n&&d.wing!==n&&c.set(f.key,(c.get(f.key)||0)+1),d.wing===n&&f.wing!==n&&c.set(d.key,(c.get(d.key)||0)+1))}const l=[...c.entries()].sort((h,f)=>f[1]-h[1]).slice(0,5).map(([h,f])=>{const d=yn(h);return{wing:(d==null?void 0:d.wingId)??h.split("/")[0],room:(d==null?void 0:d.roomName)??h.slice(h.indexOf("/")+1),key:h,crossEdges:f}});return{crossWingTouches:a,topExternalWings:o,topRoomsByCrossWing:l}}function I_(n,e){const t=new Map;let i=0;for(const o of e){if(o.sourceWingId===o.targetWingId||o.sourceWingId!==n&&o.targetWingId!==n)continue;i+=1;const c=o.sourceWingId===n?o.targetWingId:o.sourceWingId;t.set(c,(t.get(c)||0)+1)}const r=[...t.entries()].sort((o,c)=>c[1]-o[1]).slice(0,6).map(([o,c])=>({wing:o,edges:c})),s=new Map;for(const o of e)o.sourceWingId!==o.targetWingId&&(o.sourceWingId===n&&o.targetWingId!==n&&s.set(o.sourceRoomId,(s.get(o.sourceRoomId)||0)+1),o.targetWingId===n&&o.sourceWingId!==n&&s.set(o.targetRoomId,(s.get(o.targetRoomId)||0)+1));const a=[...s.entries()].sort((o,c)=>c[1]-o[1]).slice(0,5).map(([o,c])=>{const l=yn(o);return{wing:(l==null?void 0:l.wingId)??o.split("/")[0],room:(l==null?void 0:l.roomName)??o.slice(o.indexOf("/")+1),key:o,crossEdges:c}});return{crossWingTouches:i,topExternalWings:r,topRoomsByCrossWing:a}}function Qo(n){let e=0;for(const t of Object.values(n||{}))Array.isArray(t)&&(e+=t.length);return e}function Jl(n,e){const t=n==null?void 0:n[e];return Array.isArray(t)?t.reduce((i,r)=>i+(Number(r.drawers)||0),0):0}function D_(n){let e=0;for(const t of Object.values(n||{}))typeof t=="number"&&(e+=t);return e}function ea(n){const e=Object.entries(n||{}).filter(([,t])=>typeof t=="number");return e.sort((t,i)=>i[1]-t[1]),e.map(([t,i],r)=>({wing:t,rank:r+1,drawers:i}))}function U_(n){const e=Object.entries(n||{}).map(([t,i])=>({wing:t,roomCount:Array.isArray(i)?i.length:0}));return e.sort((t,i)=>i.roomCount-t.roomCount),e.map((t,i)=>({...t,rank:i+1}))}function ta(n,e){const t=n==null?void 0:n[e];return Array.isArray(t)?[...t].sort((r,s)=>(s.drawers||0)-(r.drawers||0)).map((r,s)=>({...r,rank:s+1})):[]}function qn(n){const e=n%10,t=n%100;return t>=11&&t<=13?`${n}th`:e===1?`${n}st`:e===2?`${n}nd`:e===3?`${n}rd`:`${n}th`}function Ts(n,e,t=1){return e==null||e<=0||n==null?null:(100*(Number(n)/e)).toFixed(t)}function N_({drawers:n=0,wingRoomSum:e,palaceTotal:t},i,r){const s=(i==null?void 0:i.degree)??0,a=(i==null?void 0:i.crossWingLinks)??0,o=(i==null?void 0:i.intraWingLinks)??0,c=(i==null?void 0:i.medianDegree)??null,l=e>0&&n>=e*.2,h=e>0&&n<=e*.05&&n>0,f=c!=null&&s>=c*2&&s>=2,d=s===0;return r?d?{label:"Isolated room",detail:"This room does not appear on any resolved tunnel edge (or naming does not match graph endpoints)."}:a>=2&&f?{label:"Dense cross-wing connector",detail:"High tunnel degree with multiple cross-wing links."}:a>=1&&f?{label:"Highly connected hub",detail:"Above-average tunnel degree with cross-wing reach."}:a>=1&&o<=1?{label:"Cross-wing bridge",detail:"Most links span outside this wing."}:l&&s<=(c||1)?{label:"Large but weakly connected",detail:"Many drawers relative to the wing, few tunnel links."}:h&&f?{label:"Small but structurally important",detail:"Fewer drawers than peers, but high connectivity."}:f?{label:"Highly connected hub",detail:c!=null?`Degree ${s} vs median ${c}.`:`Degree ${s}.`}:t>0&&n/t>=.08&&s<2?{label:"Major archive, few tunnels",detail:"Large share of palace drawers with sparse tunnels."}:{label:"Balanced footprint",detail:"Typical size and connectivity for this palace."}:{label:"Tunnel graph unavailable",detail:"No resolvable tunnel edges for the loaded taxonomy, or graph-stats returned empty."}}function O_(n,e){const{totalDrawers:t,wingCount:i,roomCount:r,tunnelNodeCount:s,graphEdgeCount:a,kgAvailable:o,kgSummary:c,ga:l,wingsData:h}=n,f=ea(h).slice(0,5),d={wings:"Wing spheres are sized by drawer count. Click a wing to open its rooms.",rooms:n.focusWing?`Focused on “${n.focusWing}”: rooms orbit the wing. Click another wing in “all rooms” layout or use search.`:"Each cluster is a wing; rooms orbit their wing. Click a room to inspect and center.",graph:"Force-directed graph. Edges combine tunnel links and same-wing taxonomy adjacency."};let m="";return!l.hasResolvableEdges&&a===0?m="No graph edges loaded.":l.hasResolvableEdges?l.crossFraction!=null&&(m=l.crossFraction>=.5?"Cross-wing tunnel links account for a large share of resolved graph edges.":"Resolved edges mix same-wing taxonomy adjacency with cross-wing tunnels."):m="Graph metadata is present but endpoints could not be matched to taxonomy rooms (check naming).",{totalDrawers:t,wingCount:i,roomCount:r,tunnelNodeCount:s,graphEdgeCount:a,crossWingEdges:l.crossWingEdgeCount,kgAvailable:o,kgSummary:c,largestWingsByDrawers:f,mostConnectedRooms:l.topConnectedRooms.slice(0,5),mostCrossLinkedWings:l.topCrossLinkedWings.slice(0,5),roomsWithNoTunnels:l.roomsWithNoTunnels,viewHint:d[e]||d.wings,graphBlurb:m,ga:l}}function Pr(n,e,t=8){if(!e||e.view!=="graph")return n;for(n.push(e);n.length>t;)n.shift();return n}function F_(n){return n.length?n.pop():null}function B_(n,e,t){const i=n;if(!i.length)return null;const r=i.indexOf(e),s=i.length;return r===-1?t>=0?i[0]:i[s-1]:i[(r+t+s*16)%s]}function or(n){if(!n||!n.startsWith("room:"))return null;const e=n.slice(5),t=e.indexOf(":");return t<=0?null:{wing:e.slice(0,t),room:e.slice(t+1)}}function qc(n,e,t){return!!(t&&n&&e&&n!==e)}const Ql=["shortest","tunnel_preferred","balanced","adjacency_light"],na="shortest",Ir={shortest:{label:"Shortest",shortLabel:"Shortest",hint:"Fewest hops on visible edges (BFS)."},tunnel_preferred:{label:"Tunnel-preferred",shortLabel:"Tunnels",hint:"Prefer explicit tunnel edges; may add hops vs shortest."},balanced:{label:"Balanced",shortLabel:"Balanced",hint:"Trade hop count vs edge-type cost (tunnel cheaper than adjacency)."},adjacency_light:{label:"Adjacency-light",shortLabel:"Adj-light",hint:"Strongly avoid taxonomy_adjacency hops when alternatives exist."}};function Ei(n){const e=String(n||"").trim();return Ql.includes(e)?e:na}function z_(n,e){const t=n||"tunnel",i=Ei(e);return i==="shortest"?1:i==="tunnel_preferred"?t==="tunnel"?2:t==="taxonomy_adjacency"?10:4:i==="balanced"?t==="tunnel"?3:t==="taxonomy_adjacency"?7:4:i==="adjacency_light"?t==="tunnel"?2:t==="taxonomy_adjacency"?14:3:4}function eu(n,e){if(!n||!e||n.length!==e.length)return!1;for(let t=0;t<n.length;t+=1)if(n[t]!==e[t])return!1;return!0}function tu(n,e){if(!n||typeof n!="object")return null;if(n.sourceRoomId&&n.targetRoomId)return{a:String(n.sourceRoomId),b:String(n.targetRoomId)};if(n.from==null||n.to==null)return null;const t=Zt(String(n.from),e,null),i=Zt(String(n.to),e,n.wing||null);return!t||!i?null:{a:t.key,b:i.key}}function k_(n,e,t){const i=Array.isArray(n)?n:[],r=t!=null&&t.length?t:ur(i),s=Ns(e,r);return s==null?i:s.size===0?[]:Os(i,s)}function H_(n,e){return n<e?`${n}\0${e}`:`${e}\0${n}`}function nu(n,e){const t=new Map;function i(s,a,o,c){if(!s||!a||s===a)return;t.has(s)||t.set(s,new Map),t.has(a)||t.set(a,new Map);const l=t.get(s).get(a);(!l||c<l.edgeKey)&&(t.get(s).set(a,{relationshipType:o,edgeKey:c}),t.get(a).set(s,{relationshipType:o,edgeKey:c}))}for(let s=0;s<n.length;s+=1){const a=n[s],o=tu(a,e);if(!o)continue;const c=Si(a),l=a.edgeId!=null?String(a.edgeId):`legacy:${s}`;i(o.a,o.b,c,l)}const r=new Map;return t.forEach((s,a)=>{const o=[...s.entries()].map(([c,l])=>({to:c,relationshipType:l.relationshipType,edgeKey:l.edgeKey})).sort((c,l)=>c.to.localeCompare(l.to));r.set(a,o)}),r}function G_(n,e,t){const i=Ei(t),r=new Map;function s(o,c){if(!o||c.cost<o.cost)return c;if(c.cost>o.cost)return o;const l=o.relationshipType.localeCompare(c.relationshipType);return l!==0?l<0?o:c:o.edgeKey<=c.edgeKey?o:c}for(let o=0;o<n.length;o+=1){const c=n[o],l=tu(c,e);if(!l)continue;const h=Si(c),f=c.edgeId!=null?String(c.edgeId):`legacy:${o}`,d=z_(h,i),m={a:l.a,b:l.b,relationshipType:h,edgeKey:f,cost:d},_=H_(l.a,l.b);r.set(_,s(r.get(_),m))}const a=new Map;return r.forEach(o=>{a.has(o.a)||a.set(o.a,[]),a.has(o.b)||a.set(o.b,[]),a.get(o.a).push({to:o.b,relationshipType:o.relationshipType,edgeKey:o.edgeKey,cost:o.cost}),a.get(o.b).push({to:o.a,relationshipType:o.relationshipType,edgeKey:o.edgeKey,cost:o.cost})}),a.forEach(o=>{o.sort((c,l)=>c.to.localeCompare(l.to))}),a}function iu(n,e,t){const i=String(e),r=String(t);if(!n.has(i)||!n.has(r))return null;if(i===r)return{pathRoomIds:[i],segmentTypes:[],segmentEdgeKeys:[]};const s=new Map;s.set(i,{prev:null,relationshipType:"",edgeKey:""});const a=[i],o=new Set([i]);for(;a.length;){const c=a.shift(),l=n.get(c);if(l){for(const{to:h,relationshipType:f,edgeKey:d}of l)if(!o.has(h)){if(o.add(h),s.set(h,{prev:c,relationshipType:f,edgeKey:d}),h===r)return ru(s,i,r);a.push(h)}}}return null}function W_(n,e,t){const i=String(e),r=String(t);if(!n.has(i)||!n.has(r))return null;if(i===r)return{pathRoomIds:[i],segmentTypes:[],segmentEdgeKeys:[],totalCost:0};const s=Number.MAX_SAFE_INTEGER,a=[...n.keys()],o=new Map,c=new Map,l=new Map,h=new Map;for(const m of a)o.set(m,s),c.set(m,s),l.set(m,null);o.set(i,0),c.set(i,0),h.set(i,{prev:null,relationshipType:"",edgeKey:""});const f=new Set;for(;f.size<a.length;){let m=null,_=s,g=s;for(const u of a){if(f.has(u))continue;const x=o.get(u),v=c.get(u);x!==s&&(m==null||x<_||x===_&&v<g||x===_&&v===g&&u<m)&&(m=u,_=x,g=v)}if(m==null||_===s||(f.add(m),m===r))break;const p=n.get(m);if(p)for(const{to:u,relationshipType:x,edgeKey:v,cost:E}of p){const P=o.get(m)+E,A=c.get(m)+1,T=o.get(u),K=c.get(u);let M=!1;(P<T||P===T&&A<K||P===T&&A===K&&m<(l.get(u)||"￿"))&&(M=!0),M&&(o.set(u,P),c.set(u,A),l.set(u,m),h.set(u,{prev:m,relationshipType:x,edgeKey:v}))}}if(o.get(r)===s)return null;const d=ru(h,i,r);return d?{...d,totalCost:o.get(r)}:null}function ru(n,e,t){const i=[];let r=t;for(;i.push(r),r!==e;){const o=n.get(r);if(!(o!=null&&o.prev))return null;r=o.prev}i.reverse();const s=[],a=[];for(let o=1;o<i.length;o+=1){const c=n.get(i[o]);if(!c)return null;s.push(c.relationshipType||"tunnel"),a.push(c.edgeKey||"")}return{pathRoomIds:i,segmentTypes:s,segmentEdgeKeys:a}}function V_(n){return ll(n)}function Yc(n){const e=or(n);return e?It(e.wing,e.room):null}function $_(n){if(!n||n.length<=2)return[];const e=[];for(let t=1;t<n.length-1;t+=1){const i=yn(n[t-1]),r=yn(n[t]),s=yn(n[t+1]);!i||!r||!s||(i.wingId!==r.wingId||r.wingId!==s.wingId)&&e.push(n[t])}return e}function su(n){const e={};for(const t of n||[]){const i=t||"tunnel";e[i]=(e[i]||0)+1}return e}function X_(n){const e=(n==null?void 0:n.length)??0;if(!e)return"";const t=su(n),i=t.tunnel||0,r=t.taxonomy_adjacency||0;let s=0;for(const[a,o]of Object.entries(t))a!=="tunnel"&&a!=="taxonomy_adjacency"&&(s+=o);return i===e?"Edge mix: all tunnel.":r===e?"Edge mix: all taxonomy_adjacency.":s?`Edge mix: ${i} tunnel, ${r} adjacency, ${s} other.`:`Edge mix: ${i} tunnel, ${r} adjacency.`}function j_(n,e,t,i){const r=(n||[]).filter(a=>Si(a)==="tunnel");if(!r.length)return!1;const s=nu(r,e);return!!iu(s,t,i)}function q_(n,e,t,i={}){const r=Ei(n),s=!!i.tunnelOnlyPossible,a=i.segmentTypes||[];if(!e||!t)return null;if(r==="shortest")return"Fewest-hop path (reference mode).";const o=eu(e.pathRoomIds,t.pathRoomIds),c=Math.max(0,e.pathRoomIds.length-1),l=Math.max(0,t.pathRoomIds.length-1),h=[];o?h.push("Same path as Shortest (fewest hops)."):c>l?h.push(`Adds ${c-l} hop(s) vs Shortest to satisfy ${Ir[r].shortLabel} scoring.`):c<l?h.push(`Uses ${l-c} fewer hop(s) than Shortest (unusual — check parallel edges).`):h.push("Same hop count as Shortest but a different path — tie-break or parallel edges.");const f=a.length>0&&a.every(d=>(d||"tunnel")==="tunnel");return(r==="tunnel_preferred"||r==="adjacency_light")&&(!s&&!f?h.push("No tunnel-only route under current filters — path mixes edge types as needed."):s&&f&&h.push("Tunnel-only path is available; this route uses tunnel edges.")),h.join(" ")}function Y_(n){const{graphEdges:e=[],roomsData:t={},enabledRelTypes:i,availableRelTypes:r,startRoomId:s,endRoomId:a,routeMode:o}=n||{},c=Ei(o),l=String(s||""),h=String(a||"");if(!l||!h)return{ok:!1,reason:"missing_endpoint",message:"Choose a start room and a target room."};const f=r!=null&&r.length?r:ur(e),d=k_(e,i,f);if(!d.length)return{ok:!1,reason:"no_edges",message:"No graph edges match the current relationship filters — widen filters or refresh data."};const m=nu(d,t),_=iu(m,l,h);if(!_)return{ok:!1,reason:"no_path",message:"No route through visible edges — try enabling more relationship types or pick different rooms."};let g,p=null;if(c==="shortest")g=_;else{const K=G_(d,t,c),M=W_(K,l,h);if(g=M,p=M?M.totalCost:null,!g)return{ok:!1,reason:"no_path",message:"No route through visible edges — try enabling more relationship types or pick different rooms."}}const u=g.pathRoomIds.map(K=>ll(K)).filter(Boolean);if(u.length!==g.pathRoomIds.length)return{ok:!1,reason:"id_map_failed",message:"Could not map route to scene nodes."};const x=Math.max(0,g.pathRoomIds.length-1),v=Math.max(0,_.pathRoomIds.length-1),E=!eu(g.pathRoomIds,_.pathRoomIds),P=j_(d,t,l,h),A=q_(c,g,_,{tunnelOnlyPossible:P,segmentTypes:g.segmentTypes}),T=X_(g.segmentTypes);return{ok:!0,pathRoomIds:g.pathRoomIds,pathSceneIds:u,segmentTypes:g.segmentTypes,segmentEdgeKeys:g.segmentEdgeKeys,hops:x,bridges:$_(g.pathRoomIds),typeCounts:su(g.segmentTypes),routeMode:c,totalCost:p,referenceShortestHops:v,differsFromShortest:E,comparisonNote:A,mixSummary:T,tunnelOnlyPathExists:P}}function K_(n,e,t){if(t<=0)return 0;const i=t-1;let r=Number(n)||0;r=Math.max(0,Math.min(i,r));const s=t;return(r+e+s*32)%s}function hr(n,e){if(!e||e<1)return 0;let t=Math.floor(Number(n));return Number.isFinite(t)||(t=0),t<0&&(t=0),t>e-1&&(t=e-1),t}function Mr(n,e,t){const i=t==="from"?e.sourceRoomId||e.from:e.targetRoomId||e.to;if(i==null)return null;const r=String(i);return n.find(s=>s.type!=="room"?!1:It(s.wing,s.name)===r||!r.includes("/")&&s.name===r?!0:`${s.wing}/${s.name}`===r)}const Rt={wingColors:{projects:"#8b9cf8",shared_grocery_list:"#6ee7b7",openclaw:"#94a3b8",default:"#fbbf24"},nodeSizes:{wingMin:3,wingMax:8,roomMin:.8,roomMax:2.5},spacing:{wingSeparation:40,roomRadius:15},accent:{linkWing:4015188,center:14870768}};function Z_(n){let e=0;const t=String(n||"");for(let i=0;i<t.length;i+=1)e=e*31+t.charCodeAt(i)>>>0;return e%360}function Oo(n){return Rt.wingColors[n]?Rt.wingColors[n]:`hsl(${Z_(n)}, 52%, 68%)`}function J_(n){n.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose())})}function Q_(n){var e,t;(e=n.geometry)==null||e.dispose(),(t=n.material)==null||t.dispose()}function e0(n,e={}){var ct;let t,i,r,s,a,o=0,c=null,l={},h={},f=[],d=[],m=[],_=[],g=new Map,p=[],u=null,x=null,v=new Map,E=80,P=null,A=0,T=[],K=null,M=0,w="wings",F=null,D=1,X=!0,C=!0,z=null;const q=()=>({active:!1,pathSceneIds:[],stepIndex:0,segmentTypes:[],bridgeSceneIds:[]});let $={searchQuery:"",hoveredId:null,selectedId:null,pinActive:!1,relationshipTypesVisible:null,route:q()},ee=typeof window<"u"&&((ct=window.matchMedia)==null?void 0:ct.call(window,"(prefers-reduced-motion: reduce)").matches);const Z=new Map,ne=new Map,ce={onHover:e.onHover||(()=>{}),onClick:e.onClick||(()=>{}),onBackgroundClick:e.onBackgroundClick||(()=>{})},de=new Jg,k=new je;function te(N,W,Q=850){const pe=i.position.clone(),Ee=s.target.clone(),Ue=performance.now();c&&cancelAnimationFrame(c);function _e(){const ze=Math.min((performance.now()-Ue)/Q,1),Ae=1-(1-ze)**3;i.position.lerpVectors(pe,N,Ae),s.target.lerpVectors(Ee,W,Ae),s.update(),ze<1?c=requestAnimationFrame(_e):c=null}c=requestAnimationFrame(_e)}function se(){var N;d.forEach(({mesh:W})=>{t.remove(W),J_(W)}),m.forEach(({line:W})=>{t.remove(W),Q_(W)}),_.forEach(({sprite:W})=>{var Q;t.remove(W),(Q=W.material.map)==null||Q.dispose(),W.material.dispose()}),d=[],m=[],_=[],g=new Map,p=[],u=null,x=null,v=new Map,E=80,P=null,A=0,T=[],K=null,M&&clearTimeout(M),M=0,(N=t==null?void 0:t.fog)!=null&&N.isFogExp2&&(t.fog.density=.0026),a!=null&&a.material&&(a.material.opacity=.35),Z.clear(),ne.clear()}function Re(){const N=new on,W=[];for(let pe=0;pe<1800;pe+=1)W.push(ci.randFloatSpread(380),ci.randFloatSpread(200),ci.randFloatSpread(380));N.setAttribute("position",new pn(W,3));const Q=new jl({color:9741240,size:.45,transparent:!0,opacity:.35,depthWrite:!1});a=new jg(N,Q),t.add(a)}function Pe(N,W="#e2e8f0"){const Q=document.createElement("canvas"),pe=Q.getContext("2d"),Ee=16;pe.font="500 22px ui-sans-serif, system-ui, sans-serif";const Ue=Math.ceil(pe.measureText(N).width)+Ee*2;Q.width=Ue,Q.height=44,pe.font="500 22px ui-sans-serif, system-ui, sans-serif",pe.fillStyle="rgba(15,23,42,0.88)",pe.fillRect(4,4,Ue-8,36),pe.fillStyle=W,pe.fillText(N,Ee,28);const _e=new qg(Q);_e.needsUpdate=!0;const ze=new Vl({map:_e,transparent:!0,depthWrite:!1}),Ae=new $g(ze),tt=.022*Ue;return Ae.scale.set(tt,11,1),Ae.userData.labelBaseScale={x:tt,y:11,z:1},Ae}function et(N,W,Q){const pe=W.material;Z.set(N,{mesh:W,data:Q,id:N,baseOpacity:pe.opacity,baseEmissive:pe.emissiveIntensity,baseScale:1,presentationOpacity:1}),W.userData.nodeId=N}function We(N,W,Q,pe,Ee,Ue){const _e=Pe(W,Ue);_e.visible=X,_e.position.set(Q,pe+2.2,Ee),t.add(_e),_.push({sprite:_e,nodeId:N}),ne.set(N,_e)}const Ve=40;function lt(N){var Ee;const W=_.findIndex(Ue=>Ue.nodeId===N);if(W===-1)return;const{sprite:Q}=_[W];t.remove(Q),(Ee=Q.material.map)==null||Ee.dispose(),Q.material.dispose(),_.splice(W,1),ne.delete(N);const pe=T.indexOf(N);pe>=0&&T.splice(pe,1)}function j(){for(let N=0;N<T.length;N+=1){const W=T[N];if(!(W===$.selectedId||W===$.hoveredId||$.selectedId&&Yi($.selectedId,v).has(W)||!$.selectedId&&$.hoveredId&&Yi($.hoveredId,v).has(W)))return T.splice(N,1),lt(W),!0}return!1}function Lt(N){if(ne.has(N))return;const W=Z.get(N);if(!(W!=null&&W.data)||W.data.type!=="room")return;for(;T.length>=Ve&&j(););if(T.length>=Ve)return;const{mesh:Q,data:pe}=W,Ee=Q.position;We(N,pe.name,Ee.x,Ee.y,Ee.z,"#94a3b8"),T.push(N)}function Be(){if(w!=="graph"||!p.length||!i)return;const N=i.position.distanceTo(s.target),W=d_(N,E),Q=(u==null?void 0:u.tier)??0,pe=(u==null?void 0:u.labelBudget)??180,Ee=$.selectedId,Ue=$.hoveredId,{primaryId:_e}=No(Ee,Ue),ze=_e?Yi(_e,v):new Set,Ae=g_(Ee||Ue),tt=x_(p,{selectedId:Ee,hoveredId:Ue,pinActive:$.pinActive,budget:pe,neighborIds:ze,focusWingId:Ae,cameraDistanceNorm:W,densityTier:Q}),it=($.searchQuery||"").trim().toLowerCase();for(const ge of tt)ge.startsWith("room:")&&!ne.has(ge)&&Lt(ge);ne.forEach((ge,Qe)=>{var me;const mt=(me=Z.get(Qe))==null?void 0:me.data;if(!mt)return;const Tt=Je(mt,it),S=tt.has(Qe),B={selected:Qe===Ee,hovered:Qe===Ue,pinned:!!($.pinActive&&Qe===Ee),neighbor:ze.has(Qe)},G=p_(W,B),H=ge.userData.labelBaseScale;H&&ge.scale.set(H.x*G,H.y*G,H.z);const O=Tt?m_(W,B):.12;ge.material.opacity=O,ge.visible=X&&S})}function $e(N,W,Q,pe=.28,Ee={}){const Ue=[new U(...N),new U(...W)],_e=new on().setFromPoints(Ue),ze=new Xl({color:Q,transparent:!0,opacity:pe}),Ae=new Xg(_e,ze);return Ae.userData=Ee,t.add(Ae),m.push({line:Ae,...Ee}),Ae}function Te(N,W,Q,pe,Ee){const Ue=Oo(N),_e=new st(Ue),ze=`wing:${N}`,Ae=new Vn(Ee,28,28),tt=new yr({color:_e,emissive:_e,emissiveIntensity:.22,metalness:.15,roughness:.45,transparent:!0,opacity:.92}),it=new Kt(Ae,tt);it.position.set(W,Q,pe),it.userData={id:ze,name:N,wingId:N,type:"wing",drawers:l[N],label:N,_baseY:Q};const ge=new Vn(Ee*1.25,24,24),Qe=new qo({color:_e,transparent:!0,opacity:.08,side:qt,depthWrite:!1}),mt=new Kt(ge,Qe);return it.add(mt),t.add(it),d.push({mesh:it,data:it.userData}),et(ze,it,it.userData),it}function gt(N,W,Q,pe,Ee,Ue){const _e=Oo(W),ze=new st(_e);ze.offsetHSL(0,-.05,-.06);const Ae=`room:${W}:${N}`,tt=new Vn(Ue,20,20),it=new yr({color:ze,emissive:ze,emissiveIntensity:.18,metalness:.12,roughness:.5,transparent:!0,opacity:.88}),ge=new Kt(tt,it);ge.position.set(Q,pe,Ee);const Qe=(h[W]||[]).find(Tt=>Tt.name===N),mt=(Qe==null?void 0:Qe.roomId)||It(W,N);return ge.userData={id:Ae,name:N,type:"room",wing:W,wingId:W,roomId:mt,drawers:Qe==null?void 0:Qe.drawers,label:N,_baseY:pe},t.add(ge),d.push({mesh:ge,data:ge.userData}),et(Ae,ge,ge.userData),ge}function Je(N,W){if(!W)return!0;const Q=[N.name,N.label,N.wing,N.type].filter(Boolean).join(" ").toLowerCase();return Q.includes(W)||W.split(/\s+/).every(pe=>pe.length<2||Q.includes(pe))}function b(N){return N==null?"":[...N].sort().join("\0")}function y(N,W){const Q=N||q(),pe=W||q();if(!!Q.active!=!!pe.active)return!1;if(!Q.active)return!0;if(Q.stepIndex!==pe.stepIndex)return!1;const Ee=(Q.pathSceneIds||[]).join("\0"),Ue=(pe.pathSceneIds||[]).join("\0");if(Ee!==Ue)return!1;const _e=(Q.segmentTypes||[]).join("\0"),ze=(pe.segmentTypes||[]).join("\0");if(_e!==ze)return!1;const Ae=(Q.bridgeSceneIds||[]).join("\0"),tt=(pe.bridgeSceneIds||[]).join("\0");return Ae===tt}function V(N,W){return!N||!W?"":N<W?`${N}\0${W}`:`${W}\0${N}`}function le(N,W){return N.searchQuery===W.searchQuery&&N.hoveredId===W.hoveredId&&N.selectedId===W.selectedId&&N.pinActive===W.pinActive&&b(N.relationshipTypesVisible)===b(W.relationshipTypesVisible)&&y(N.route,W.route)}function ie(){const N=($.searchQuery||"").trim().toLowerCase(),W=$.hoveredId,Q=$.selectedId,pe=$.pinActive,Ee=$.relationshipTypesVisible,Ue=(u==null?void 0:u.tier)??0,_e=$.route||q(),ze=w==="graph"&&_e.active&&Array.isArray(_e.pathSceneIds)&&_e.pathSceneIds.length>0,Ae=new Set,tt=new Map;if(ze){const H=_e.pathSceneIds;for(let O=0;O<H.length-1;O+=1)Ae.add(V(H[O],H[O+1])),tt.set(V(H[O],H[O+1]),O)}const it=new Set(_e.bridgeSceneIds||[]),ge=ze&&_e.pathSceneIds.length>0?_e.pathSceneIds[hr(_e.stepIndex,_e.pathSceneIds.length)]:null,Qe=new Map,mt=(u==null?void 0:u.globalEdgeOpacityMult)??1,Tt=(u==null?void 0:u.adjacencyOpacityMult)??1,S=(u==null?void 0:u.tunnelEmphasisMult)??1;m.forEach(H=>{var vt,rt;const{line:O,fromId:me,toId:Se,baseOpacity:Ne=.28,isGraphRelationship:He,relationshipType:Ke,styleColorHex:qe}=H,Oe=me?Je(((vt=Z.get(me))==null?void 0:vt.data)||{},N):!0,ft=Se?Je(((rt=Z.get(Se))==null?void 0:rt.data)||{},N):!0,kt=!N||Oe&&ft;let At=!0;if(He&&Ee!=null){const nn=Ke||"tunnel";At=Ee.has(nn)}if(!kt){O.visible=!0,O.material.opacity=Ne*.12;return}if(He&&!At){O.visible=!1;return}O.visible=!0;let bt=Ne;if(He){const nn=Ke||"tunnel";nn==="taxonomy_adjacency"&&(bt*=Tt),nn==="tunnel"&&(bt*=S),bt*=mt,bt*=M_({selectedId:Q,hoveredId:W,fromId:me,toId:Se,relationshipType:nn,densityTier:Ue})}if(ze&&He&&me&&Se){const nn=V(me,Se),Et=Ae.has(nn),Yt=tt.get(nn),wi=Yt!=null&&Array.isArray(_e.segmentTypes)&&_e.segmentTypes[Yt]?_e.segmentTypes[Yt]:Ke||"tunnel",ni=qe??Vc(wi).color,wn=new st(ni);Et?(bt=Math.min(1,bt*1.52),wn.lerp(new st(16777215),.11),wi==="tunnel"?(wn.lerp(new st(5999871),.06),bt=Math.min(1,bt*1.03)):wi==="taxonomy_adjacency"&&wn.lerp(new st(4049336),.05)):(bt*=.32,wn.multiplyScalar(.72)),O.material.color.copy(wn)}else He&&qe!=null&&O.material.color.setHex(qe);O.material.opacity=bt,He&&(me&&Qe.set(me,(Qe.get(me)||0)+1),Se&&Qe.set(Se,(Qe.get(Se)||0)+1))});const{primaryId:B}=No(Q,W),G=B&&w==="graph"?Yi(B,v):null;Z.forEach((H,O)=>{const{mesh:me,data:Se,baseOpacity:Ne,baseEmissive:He}=H,Ke=me.material;if(!Ke||Ke.type==="MeshBasicMaterial")return;const qe=Je(Se,N);let Oe=qe?1:.14,ft=1;K&&O===K.id&&(ft*=1.22),O===Q?ft*=pe?1.88:1.68:O===W&&(ft*=Q?1.36:1.48),O===Q&&pe?Oe=Math.max(Oe,.88):O===Q&&(Oe=Math.max(Oe,.82));const kt=g.get(O)||0,At=Qe.get(O)||0;Se.type==="room"&&kt>0&&At===0&&w==="graph"&&(Oe*=Ue>=2?.28:Ue>=1?.31:.38,ft*=Ue>=2?.48:.54),G&&(G.has(O)&&(Oe=Math.max(Oe,Ue>=2?.55:.66),ft*=1.09),O===B&&(Oe=Math.max(Oe,pe&&O===Q?.94:.88)));let bt=1;if(ze&&Se.type==="room")if(!new Set(_e.pathSceneIds).has(O))Oe*=.4,ft*=.75;else{const Et=_e.pathSceneIds[0],Yt=_e.pathSceneIds[_e.pathSceneIds.length-1];O===Et&&(ft*=1.1),O===Yt&&(ft*=1.08),it.has(O)&&O!==Et&&O!==Yt&&(ft*=1.06,bt=Math.max(bt,1.03)),ge&&O===ge&&(ft*=1.18,bt=1.05)}H.presentationOpacity=Math.min(1,Oe),Ke.opacity=Math.min(1,Ne*Oe),Ke.emissiveIntensity=He*ft;const vt=O===Q?pe?1.12:1.08:O===W?Q&&O!==Q?1.04:1.06:G!=null&&G.has(O)?1.028:1,rt=qe?1:.88;me.scale.setScalar(vt*rt*bt)}),ze&&_e.pathSceneIds.length&&_e.pathSceneIds.forEach(H=>{H&&H.startsWith("room:")&&Lt(H)}),w==="graph"&&p.length?Be():ne.forEach((H,O)=>{var Ne;const me=(Ne=Z.get(O))==null?void 0:Ne.data;if(!me)return;const Se=Je(me,N);H.visible=X,H.material.opacity=Se?O===Q?1:.92:.2})}function ue(){const N=Object.keys(l);if(!N.length)return;const W=Math.PI*2/N.length,Q=Rt.spacing.wingSeparation/2;N.forEach((_e,ze)=>{const Ae=ze*W,tt=Math.cos(Ae)*Q,it=Math.sin(Ae)*Q,ge=l[_e]||1,Qe=ci.mapLinear(ge,1,200,Rt.nodeSizes.wingMin,Rt.nodeSizes.wingMax);Te(_e,tt,0,it,Qe),We(`wing:${_e}`,_e,tt,0,it,"#e2e8f0")});const pe=new Vn(1.1,20,20),Ee=new yr({color:Rt.accent.center,emissive:3359061,emissiveIntensity:.4,metalness:.3,roughness:.4,transparent:!0,opacity:.55}),Ue=new Kt(pe,Ee);t.add(Ue),d.push({mesh:Ue,data:{name:"Palace core",type:"center"}}),N.forEach((_e,ze)=>{const Ae=ze*W,tt=Math.cos(Ae)*Q,it=Math.sin(Ae)*Q;$e([0,0,0],[tt,0,it],Rt.accent.linkWing,.22,{fromId:null,toId:`wing:${_e}`,baseOpacity:.22})}),te(new U(0,36,88),new U(0,0,0))}function Ce(N){const W=h[N]||[],Q=Rt.nodeSizes.wingMin+1.2;Te(N,0,0,0,Q),We(`wing:${N}`,N,0,0,0,"#e2e8f0");const pe=Rt.spacing.roomRadius,Ee=Math.max(W.length,1),Ue=Math.PI*2/Ee;W.forEach((_e,ze)=>{const Ae=ze*Ue,tt=Math.cos(Ae)*pe,it=Math.sin(Ae)*pe,ge=ci.mapLinear(_e.drawers||1,1,80,Rt.nodeSizes.roomMin,Rt.nodeSizes.roomMax);gt(_e.name,N,tt,0,it,ge),$e([0,0,0],[tt,0,it],Rt.accent.linkWing,.22,{fromId:`wing:${N}`,toId:`room:${N}:${_e.name}`,baseOpacity:.22}),We(`room:${N}:${_e.name}`,_e.name,tt,0,it,"#94a3b8")}),te(new U(0,38,72),new U(0,0,0))}function ye(){const N=Object.keys(h);if(!N.length)return;const W=Math.PI*2/N.length,Q=Rt.spacing.wingSeparation/2;N.forEach((_e,ze)=>{const Ae=ze*W,tt=Math.cos(Ae)*Q,it=Math.sin(Ae)*Q;Te(_e,tt,0,it,Rt.nodeSizes.wingMin),We(`wing:${_e}`,_e,tt,0,it,"#cbd5e1");const ge=h[_e]||[],Qe=Math.PI*2/Math.max(ge.length,1),mt=Rt.spacing.roomRadius;ge.forEach((Tt,S)=>{const B=Ae+S*Qe,G=tt+Math.cos(B)*mt,H=it+Math.sin(B)*mt,O=ci.mapLinear(Tt.drawers||1,1,80,Rt.nodeSizes.roomMin,Rt.nodeSizes.roomMax);gt(Tt.name,_e,G,0,H,O),$e([tt,0,it],[G,0,H],Rt.accent.linkWing,.18,{fromId:`wing:${_e}`,toId:`room:${_e}:${Tt.name}`,baseOpacity:.18}),We(`room:${_e}:${Tt.name}`,Tt.name,G,0,H,"#94a3b8")})});const pe=new Vn(1.1,20,20),Ee=new yr({color:Rt.accent.center,emissive:3359061,emissiveIntensity:.35,metalness:.25,roughness:.45,transparent:!0,opacity:.5}),Ue=new Kt(pe,Ee);t.add(Ue),d.push({mesh:Ue,data:{name:"Palace core",type:"center"}}),N.forEach((_e,ze)=>{const Ae=ze*W;$e([0,0,0],[Math.cos(Ae)*Q,0,Math.sin(Ae)*Q],Rt.accent.linkWing,.2,{baseOpacity:.2})}),te(new U(0,52,102),new U(0,0,0))}function we(){F&&h[F]?Ce(F):ye()}function Ge(N){return[...N].sort((W,Q)=>W.localeCompare(Q))}function nt(){const N=new Map;Object.keys(l).forEach(ge=>{N.set(ge,{name:ge,type:"wing",wing:ge,x:0,y:0,z:0})}),Object.entries(h).forEach(([ge,Qe])=>{Qe.forEach(mt=>{N.set(It(ge,mt.name),{name:mt.name,type:"room",wing:ge,x:0,y:0,z:0,drawers:mt.drawers})})});const W=Array.from(N.values());if(!W.length){const ge=new Vn(1.1,16,16),Qe=new yr({color:Rt.accent.center,emissive:3359061,emissiveIntensity:.25,metalness:.2,roughness:.5,transparent:!0,opacity:.35}),mt=new Kt(ge,Qe);t.add(mt),d.push({mesh:mt,data:{name:"No graph data",type:"center"}}),te(new U(0,28,72),new U(0,0,0));return}const Q=Ge(Object.keys(l));g=w_(W,f,Mr),v=__(f,W,Mr),u=a_(W.length,f.length,Q.length),ee&&(u={...u,labelBudget:Math.min(u.labelBudget,95)}),l_(W,Q,u),u_(W,f,u,Mr),h_(W,u.collisionMinDist,12),t.fog&&t.fog.isFogExp2&&(t.fog.density=u.fogDensity),a!=null&&a.material&&(a.material.opacity=Math.max(.12,.34-u.tier*.055)),p=W.map(ge=>{const Qe=ge.type==="wing"?`wing:${ge.name}`:`room:${ge.wing}:${ge.name}`,mt=g.get(Qe)||0;return{id:Qe,incidentFull:mt,baseScore:y_({type:ge.type,incidentFull:mt,drawers:ge.drawers})}});const pe=v_(p,u);W.forEach(ge=>{const Qe=ge.type==="wing",mt=Qe?Rt.nodeSizes.wingMin+.4:Rt.nodeSizes.roomMin+.2;if(Qe)Te(ge.name,ge.x,ge.y,ge.z,mt),We(`wing:${ge.name}`,ge.name,ge.x,ge.y,ge.z,"#cbd5e1");else{const Tt=`room:${ge.wing}:${ge.name}`;gt(ge.name,ge.wing,ge.x,ge.y,ge.z,mt),pe.has(Tt)&&We(Tt,ge.name,ge.x,ge.y,ge.z,"#94a3b8")}}),f.forEach(ge=>{const Qe=Mr(W,ge,"from"),mt=Mr(W,ge,"to");if(Qe&&mt){const Tt=sr(Qe),S=sr(mt),B=Si(ge),G=Vc(B);$e([Qe.x,Qe.y,Qe.z],[mt.x,mt.y,mt.z],G.color,G.opacity,{fromId:Tt,toId:S,baseOpacity:G.opacity,isGraphRelationship:!0,relationshipType:B,styleColorHex:G.color})}});const Ee=new cr;W.forEach(ge=>Ee.expandByPoint(new U(ge.x,ge.y,ge.z)));const Ue=new U;Ee.getCenter(Ue);const _e=new U;Ee.getSize(_e);const ze=Math.max(_e.x,_e.y,_e.z,12);E=ze;const Ae=$c(ze*.48,i.fov,u.tier),tt=new U(.35,.42,1).normalize(),it=Ue.clone().add(tt.multiplyScalar(Ae));x={position:it.clone(),target:Ue.clone()},te(it,Ue)}function oe(){const W=C&&!(w==="graph")&&!ee;s.autoRotate=W,s.autoRotateSpeed=.35*(W?1:0)}function pt(N,W=null){w=N,F=W,se(),z=null,$.hoveredId=null,oe(),N==="wings"?ue():N==="rooms"?we():N==="graph"&&nt(),ie()}function ot(){z=null,$.hoveredId=null,r.domElement.style.cursor="default",ie(),ce.onHover(null,{x:0,y:0})}function Ye(N){var Ue,_e;const W=r.domElement.getBoundingClientRect();k.x=(N.clientX-W.left)/W.width*2-1,k.y=-((N.clientY-W.top)/W.height)*2+1,de.setFromCamera(k,i);const Q=d.map(ze=>ze.mesh).filter(Boolean),pe=de.intersectObjects(Q,!0);for(let ze=0;ze<pe.length;ze+=1){let Ae=pe[ze].object;for(;Ae&&!((Ue=Ae.userData)!=null&&Ue.type);)Ae=Ae.parent;if(Ae&&((_e=Ae.userData)!=null&&_e.type)&&Ae.userData.type!=="center"){const tt=Ae.userData.id||null,it=z!==Ae||$.hoveredId!==tt;z=Ae,$.hoveredId=tt,r.domElement.style.cursor="pointer",it&&ie(),ce.onHover({...Ae.userData},{x:N.clientX,y:N.clientY});return}}const Ee=$.hoveredId!=null;z=null,$.hoveredId=null,r.domElement.style.cursor="default",Ee&&ie(),ce.onHover(null,{x:N.clientX,y:N.clientY})}function De(){if(!z){K=null,ce.onBackgroundClick(),ce.onClick(null);return}const N={...z.userData};N.id&&N.type!=="center"&&(M&&clearTimeout(M),K={id:N.id,at:performance.now()},ie(),M=setTimeout(()=>{M=0,K=null,ie()},190)),ce.onClick(N)}function Me(){o=requestAnimationFrame(Me),s.update();const N=Date.now()*.001,W=ee?0:.42*D,Q=ee?0:.006*D;d.forEach((Ee,Ue)=>{if(!Ee.data||Ee.data.type==="center")return;const _e=Ue*.37,ze=Ee.mesh.userData._baseY??0;Ee.mesh.position.y=ze+Math.sin(N*.9+_e)*W,Ee.mesh.rotation.y+=Q});const pe=(u==null?void 0:u.tier)??0;if(w==="graph"){let Ee=s.target;$.selectedId&&Z.get($.selectedId)?Ee=Z.get($.selectedId).mesh.position:$.hoveredId&&Z.get($.hoveredId)&&(Ee=Z.get($.hoveredId).mesh.position);const Ue=$.selectedId||$.hoveredId,_e=Ue?Yi(Ue,v):new Set,ze=!!($.selectedId||$.hoveredId);Z.forEach((Ae,tt)=>{const it=Ae.mesh.material;if(!it||it.type==="MeshBasicMaterial")return;const ge=Ae.mesh.position.distanceTo(Ee),Qe=S_(ge,pe,{isNeighbor:_e.has(tt),focusActive:ze});it.opacity=Math.min(1,Ae.baseOpacity*(Ae.presentationOpacity??1)*Qe)}),Be()}r.render(t,i)}function R(){t=new Wg,t.background=new st(724760),t.fog=new Jo(724760,.0026),i=new hn(58,n.clientWidth/n.clientHeight,.1,1200),i.position.set(0,34,90),r=new Wl({antialias:!0,alpha:!1,powerPreference:"high-performance"}),r.setSize(n.clientWidth,n.clientHeight),r.setPixelRatio(Math.min(window.devicePixelRatio,2)),r.outputColorSpace=Bt,r.toneMapping=fl,r.toneMappingExposure=1.05,n.appendChild(r.domElement),s=new e_(i,r.domElement),s.enableDamping=!0,s.dampingFactor=.055,s.autoRotate=!0,s.autoRotateSpeed=.35,s.maxPolarAngle=Math.PI*.495;const N=new Yg(6583435,988970,.85);t.add(N);const W=new Fc(10859772,1.1);W.position.set(20,40,24),t.add(W);const Q=new Fc(3718648,.35);if(Q.position.set(-24,12,-18),t.add(Q),Re(),typeof window<"u"&&window.matchMedia){const pe=window.matchMedia("(prefers-reduced-motion: reduce)");ee=pe.matches,pe.addEventListener("change",Ee=>{ee=Ee.matches,oe()})}r.domElement.addEventListener("pointermove",Ye),r.domElement.addEventListener("click",De),r.domElement.addEventListener("pointerleave",ot),window.addEventListener("resize",he),Me()}function he(){if(!i||!r)return;const N=n.clientWidth,W=n.clientHeight;i.aspect=N/W,i.updateProjectionMatrix(),r.setSize(N,W)}function Ie(N){l=N.wingsData||{},h=N.roomsData||{},f=N.graphEdges||[]}function be(){if(w==="graph"&&x){te(x.position.clone(),x.target.clone());return}te(new U(0,34,90),new U(0,0,0))}function ae(N){const W=Z.get(N);if(!W)return;const Q=new U;if(W.mesh.getWorldPosition(Q),w==="graph"&&u){const Ue=[];m.forEach(Tt=>{if(!Tt.isGraphRelationship)return;let S=null;if(Tt.fromId===N?S=Tt.toId:Tt.toId===N&&(S=Tt.fromId),!S)return;const B=Z.get(S);B&&Ue.push(B.mesh.position.clone())});const _e=Ue.length,ze=b_(Q,Ue.length?Ue:[Q.clone()]),Ae=$c(ze,i.fov,u.tier,{neighborCount:_e});let tt=i.position.clone().sub(Q);tt.lengthSq()<4&&tt.set(32,26,72),tt.normalize(),P===N?A+=1:(P=N,A=0);const it=Math.max(ze*2.4,E*.42,28),ge=E_(it,u.tier,A),Qe=new U(Q.x+ge.x,Q.y+ge.y,Q.z+ge.z),mt=A>0?1020:880;te(Q.clone().add(tt.multiplyScalar(Ae)),Qe,mt);return}const pe=i.position.clone().sub(Q).normalize(),Ee=w==="rooms"&&F?26:30;te(Q.clone().add(pe.multiplyScalar(Ee)),Q)}function I(){var N;(N=z==null?void 0:z.userData)!=null&&N.id&&ae(z.userData.id)}function fe(N,W=420){!N||!Z.get(N)||(M&&clearTimeout(M),K={id:N,at:performance.now()},ie(),M=setTimeout(()=>{M=0,K=null,ie()},W))}function xe(N){const W={...$,...N};N.route!==void 0&&(W.route={...q(),...N.route}),!le($,W)&&($=W,ie())}function Xe(N){xe({relationshipTypesVisible:N})}function ke(){$.selectedId=null,ie()}function ut(){var N;cancelAnimationFrame(o),c&&cancelAnimationFrame(c),window.removeEventListener("resize",he),r!=null&&r.domElement&&(r.domElement.removeEventListener("pointermove",Ye),r.domElement.removeEventListener("click",De),r.domElement.removeEventListener("pointerleave",ot)),se(),M&&clearTimeout(M),M=0,a&&(t.remove(a),a.geometry.dispose(),a.material.dispose()),r==null||r.dispose(),(N=r==null?void 0:r.domElement)!=null&&N.parentNode&&r.domElement.parentNode.removeChild(r.domElement)}return{init:R,setData:Ie,setView:pt,updatePresentation:xe,setAutoRotate(N){C=N,oe()},setMotionIntensity(N){D=Math.max(0,Math.min(2,N))},setLabelsVisible(N){if(X=!!N,X&&!_.length){pt(w,F);return}_.forEach(({sprite:W})=>{W.visible=X})},resetCamera:be,centerOnHovered:I,centerOnNodeId:ae,pulseNodeEmphasis:fe,clearPin:ke,resize:he,dispose:ut,getView:()=>w,getFocusWing:()=>F,getHovered:()=>z?{...z.userData}:null,setCallbacks(N){Object.assign(ce,N)},setRelationshipFilters:Xe,getGraphNeighbors(N){return w!=="graph"||!N?[]:[...Yi(N,v)].sort((Q,pe)=>Q.localeCompare(pe))}}}const t0=new Set(["wings","rooms","graph"]);function n0(n){return n==null||typeof n!="object"?null:n}function i0(n){const e=n0(n);return e?{view:t0.has(e.view)?e.view:"wings",currentWing:typeof e.currentWing=="string"?e.currentWing:e.currentWing??null,currentRoom:typeof e.currentRoom=="string"?e.currentRoom:e.currentRoom??null,selected:e.selected&&typeof e.selected=="object"?e.selected:null,pinned:!!e.pinned,searchQuery:typeof e.searchQuery=="string"?e.searchQuery:"",labels:e.labels,rotate:e.rotate,motion:e.motion}:{view:"wings",currentWing:null,currentRoom:null,selected:null,pinned:!1,searchQuery:"",labels:void 0,rotate:void 0,motion:void 0}}function r0(n,e){var r,s;const t=(e==null?void 0:e.wingsData)||{},i=(e==null?void 0:e.roomsData)||{};if(n.currentWing&&!gi(t,n.currentWing)&&(n.currentWing=null,n.currentRoom=null,n.selected=null,n.pinned=!1),n.currentRoom&&n.currentWing&&(_i(i,n.currentWing,n.currentRoom)||(n.currentRoom=null,((r=n.selected)==null?void 0:r.type)==="room"&&(n.selected=null,n.pinned=!1))),(s=n.selected)!=null&&s.id){const a=n.selected;a.type==="wing"&&!gi(t,a.name)&&(n.selected=null,n.pinned=!1),a.type==="room"&&(!a.wing||!_i(i,a.wing,a.name))&&(n.selected=null,n.pinned=!1)}n.pinned&&!n.selected&&(n.pinned=!1)}function ou(n){return String(n??"").trim().toLowerCase()}function yo(n,e){if(!n)return 0;const t=String(e??"").toLowerCase();if(!t)return 0;if(t===n)return 1e4;if(t.startsWith(n))return 8200-Math.min(n.length,40);const i=t.indexOf(n);if(i>=0)return 5200-Math.min(i,200);const r=n.split(/\s+/).filter(o=>o.length>1);if(r.length<2)return 0;let s=0,a=1/0;for(const o of r){const c=t.indexOf(o);if(c<0)return 0;s+=400,a=Math.min(a,c)}return 3e3-Math.min(a,200)+Math.min(s,800)}function s0(n,e){const t=new Map,i=new Set([...Object.keys(n||{}),...Object.keys(e||{})]);for(const s of i)t.set(s,{kind:"wing",sceneId:`wing:${s}`,wingId:s,label:s});const r=[...t.values()];for(const s of i){const a=n[s]||[];for(const o of a)!o||o.name==null||r.push({kind:"room",sceneId:`room:${s}:${o.name}`,wingId:s,roomName:o.name,label:o.name})}return r}function o0(n){return n.kind==="wing"?"Wing":`Room · ${n.wingId}`}function a0(n,e){if(!e)return 0;if(n.kind==="wing")return yo(e,n.wingId);const t=yo(e,n.roomName),i=yo(e,n.wingId);return Math.max(t,i*.94)}function c0(n,e){const t=ou(e);if(!t||!n.length)return[];const i=new Map;for(const r of n){const s=a0(r,t);if(s<=0)continue;const a=o0(r),o={...r,score:s,sublabel:a},c=i.get(r.sceneId);(!c||o.score>c.score)&&i.set(r.sceneId,o)}return[...i.values()].sort((r,s)=>s.score-r.score||r.label.localeCompare(s.label))}function Fo(n,e,t){return e<=0?0:(n+t+e*64)%e}const ia="mempalace-viz-explorer-v1",au="mempalace-viz-route-mode-v1",cu="mempalace-viz-panel-state-v1";let Qt=new Set;const ti=[{id:"wings",title:"Wings",hint:"High-level structure by domain or project."},{id:"rooms",title:"Rooms",hint:"Rooms within each wing, orbiting their parent."},{id:"graph",title:"Graph",hint:"Tunnel relationships across rooms."}],L={view:"wings",hovered:null,selected:null,pinned:!1,currentWing:null,currentRoom:null,searchQuery:"",filters:{visibleWings:null}};let Y=null,J=null,Kc=null,Zc=null,ui=null,Jc=null;const Qn=[];let Bo=[],Ut=[],Jt=0,Ar=!1,As="",Le={startSceneId:null,targetSceneId:null,result:null,stepIndex:0},On=na;function l0(){try{const n=localStorage.getItem(au);if(n)return Ei(JSON.parse(n))}catch{}return na}function u0(n){try{localStorage.setItem(au,JSON.stringify(Ei(n)))}catch{}}On=l0();const re=n=>document.getElementById(n);function Qc(n){if(!n||!(n instanceof HTMLElement))return!1;const e=n.tagName;return!!(e==="INPUT"||e==="TEXTAREA"||e==="SELECT"||n.isContentEditable)}function fn(n,e=5200){const t=re("toast-host");t&&(clearTimeout(Jc),t.innerHTML=`<div class="toast" role="status">${Fe(n)}</div>`,Jc=setTimeout(()=>{t.innerHTML=""},e))}function h0(n){var s,a,o;if(L.view!=="graph")return"";const e=J==null?void 0:J.graphStats,t=J==null?void 0:J.graph,i=((s=J==null?void 0:J.graphEdges)==null?void 0:s.length)??0,r=Array.isArray(t==null?void 0:t.edgesUnresolved)?t.edgesUnresolved.length:Array.isArray(e==null?void 0:e.edgesUnresolved)?e.edgesUnresolved.length:null;if(!i)return'<div class="inspect-card inspect-card--hint" role="status"><strong>Graph view</strong><p class="inspect-muted inspect-muted--tight">No graph edges were returned from graph-stats. Wings and rooms may still appear if taxonomy is loaded.</p></div>';if(!((a=n.ga)!=null&&a.hasResolvableEdges)){const c=r??T_(J==null?void 0:J.graphEdges,J==null?void 0:J.roomsData,((o=t==null?void 0:t.edgesUnresolved)==null?void 0:o.length)??null);return`<div class="inspect-card inspect-card--hint" role="status"><strong>Graph view</strong><p class="inspect-muted inspect-muted--tight">Loaded ${i} graph edge${i===1?"":"s"}, but endpoints could not be fully matched to taxonomy rooms${c?` (${c} edge${c===1?"":"s"} unresolved).`:"."} Layout may be sparse.</p></div>`}return""}function d0(){return!!(L.pinned&&L.selected)}function Dr(){return{view:"graph",selected:L.selected,pinned:L.pinned,currentWing:L.currentWing,currentRoom:L.currentRoom}}function Mo(){var f,d,m,_;if(L.view!=="graph"||!L.selected||L.selected.type==="center")return"";const n=L.selected.id,e=((d=(f=Y==null?void 0:Y.getGraphNeighbors)==null?void 0:f.call(Y,n))==null?void 0:d.length)??0,t=e>0,i=Le.result,r=(i==null?void 0:i.ok)&&((m=i.pathSceneIds)==null?void 0:m.length),s=r?i.pathSceneIds.length:0,a=r?`Hop ${hr(Le.stepIndex,s)+1} / ${s}`:"",o=L.view==="graph"&&Le.startSceneId,c=o?`<div class="graph-route-mode" role="group" aria-label="Route mode">${Ql.map(g=>{const p=On===g,u=Ir[g];return`<button type="button" class="route-mode-chip ${p?"is-on":""}" data-route-mode="${Fe(g)}" title="${Fe(u.hint)}">${Fe(u.shortLabel)}</button>`}).join("")}</div>`:"",l=r&&i.comparisonNote?`<div class="graph-route-strip__compare">${Fe(i.comparisonNote)}</div>`:"";return`${r?`<div class="graph-route-strip" role="group" aria-label="Route along highlighted path">
    ${c}
    ${l}
    <span class="graph-route-strip__meta">${Fe(a)} · ${i.hops} edge${i.hops===1?"":"s"} · ${Fe(((_=Ir[On])==null?void 0:_.shortLabel)||On)}</span>
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
  </div>`}function f0(){var n;L.view!=="graph"||!((n=L.selected)!=null&&n.id)||Y==null||Y.centerOnNodeId(L.selected.id)}function Rs(n){var a;if(L.view!=="graph"||!((a=L.selected)!=null&&a.id)||!(Y!=null&&Y.getGraphNeighbors))return;const e=L.selected.id,t=Y.getGraphNeighbors(e),i=B_(t,e,n);if(!i){fn("No connected rooms in this graph slice.");return}if(i===e)return;const r=or(i);if(!r||!J||!_i(J.roomsData,r.wing,r.room))return;Pr(Qn,Dr());const s=(J.roomsData[r.wing]||[]).find(o=>o.name===r.room);L.currentWing=r.wing,L.currentRoom=r.room,L.selected={id:i,type:"room",name:r.room,wing:r.wing,wingId:r.wing,roomId:(s==null?void 0:s.roomId)||It(r.wing,r.room),drawers:s==null?void 0:s.drawers},L.pinned=!0,Mt(),Y==null||Y.centerOnNodeId(i),St(),_t()}function lu(){var e;const n=F_(Qn);if(!n||n.view!=="graph"||!((e=n.selected)!=null&&e.id)){fn("No prior focus in history.");return}L.selected=n.selected,L.pinned=n.pinned,L.currentWing=n.currentWing,L.currentRoom=n.currentRoom,Mt(),Y==null||Y.centerOnNodeId(n.selected.id),St(),_t()}function zo(){Le={startSceneId:null,targetSceneId:null,result:null,stepIndex:0},Mt(),St(),_t()}function p0(n){var t,i;const e=Ei(n);if(e!==On){if(On=e,u0(e),Le.startSceneId&&Le.targetSceneId){const r=Le.stepIndex;Fr();const s=Le.result;s!=null&&s.ok&&((t=s.pathSceneIds)!=null&&t.length)?(Le.stepIndex=hr(r,s.pathSceneIds.length),Fs(),Y==null||Y.centerOnNodeId((i=L.selected)==null?void 0:i.id)):Le.stepIndex=0,s&&!s.ok&&fn(s.message||"No route for this mode.")}Mt(),St()}}function m0(){const n=Le.result;if(n&&n.ok&&Array.isArray(n.pathSceneIds)&&n.pathSceneIds.length){const e=n.pathSceneIds.length,t=hr(Le.stepIndex,e),i=(n.bridges||[]).map(r=>V_(r)).filter(Boolean);return{active:!0,pathSceneIds:n.pathSceneIds,stepIndex:t,segmentTypes:n.segmentTypes||[],bridgeSceneIds:i}}return{active:!1,pathSceneIds:[],stepIndex:0,segmentTypes:[],bridgeSceneIds:[]}}function Fr(){var s;if(!J||L.view!=="graph"){Le.result=null;return}const n=Le.startSceneId,e=Le.targetSceneId;if(!n||!e||!n.startsWith("room:")||!e.startsWith("room:")){Le.result=null;return}const t=Yc(n),i=Yc(e);if(!t||!i){Le.result={ok:!1,reason:"bad_scene",message:"Could not resolve route endpoints."};return}const r=ur(J.graphEdges||[]);Le.result=Y_({graphEdges:J.graphEdges||[],roomsData:J.roomsData||{},enabledRelTypes:Qt,availableRelTypes:r,startRoomId:t,endRoomId:i,routeMode:On}),Le.result.ok&&((s=Le.result.pathSceneIds)!=null&&s.length)?Le.stepIndex=hr(Le.stepIndex,Le.result.pathSceneIds.length):Le.stepIndex=0}function Fs(){var s;const n=Le.result;if(!(n!=null&&n.ok)||!((s=n.pathSceneIds)!=null&&s.length))return;const e=hr(Le.stepIndex,n.pathSceneIds.length),t=n.pathSceneIds[e],i=or(t);if(!i||!J)return;const r=(J.roomsData[i.wing]||[]).find(a=>a.name===i.room);L.currentWing=i.wing,L.currentRoom=i.room,L.selected={id:t,type:"room",name:i.room,wing:i.wing,wingId:i.wing,roomId:(r==null?void 0:r.roomId)||It(i.wing,i.room),drawers:r==null?void 0:r.drawers},L.pinned=!0}function g0(){var n,e;if(L.view!=="graph"||((n=L.selected)==null?void 0:n.type)!=="room"||!((e=L.selected)!=null&&e.id)){fn("Select a room in Graph view first.");return}Le.startSceneId=L.selected.id,Le.targetSceneId?Fr():Le.result=null,Mt(),St(),_t(),fn("Route start set — pick a target room or use search “Route”.")}function uu(n){var t,i;if(L.view!=="graph"&&$n("graph"),!n||!n.startsWith("room:")){fn("Route target must be a room.");return}if(!Le.startSceneId){fn("Set a route start first (inspector: “Set as route start”).");return}Le.targetSceneId=n,Fr();const e=Le.result;e&&!e.ok?fn(e.message||"No route found."):e!=null&&e.ok&&(Le.stepIndex=0,Fs(),Y==null||Y.centerOnNodeId((t=L.selected)==null?void 0:t.id),fn(`Route · ${e.hops} hop${e.hops===1?"":"s"} · ${((i=Ir[On])==null?void 0:i.shortLabel)||On}`)),Mt(),St(),_t()}function Cs(n){var i,r;const e=Le.result;if(!(e!=null&&e.ok)||!((i=e.pathSceneIds)!=null&&i.length))return;const t=e.pathSceneIds.length;Le.stepIndex=K_(Le.stepIndex,n,t),Fs(),Mt(),Y==null||Y.centerOnNodeId((r=L.selected)==null?void 0:r.id),St(),_t()}function el(n){var i,r;const e=Le.result;if(!(e!=null&&e.ok)||!((i=e.pathSceneIds)!=null&&i.length))return;const t=e.pathSceneIds.length;Le.stepIndex=n==="end"?t-1:0,Fs(),Mt(),Y==null||Y.centerOnNodeId((r=L.selected)==null?void 0:r.id),St(),_t()}function Fe(n){return String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function _0(n){var c;if(!(n!=null&&n.ok))return"";const e=rr(n.typeCounts)||"—",t=n.bridges||[],i=t.length>0?`Bridge rooms (cross-wing connectors): ${t.map(l=>l.split("/").pop()).join(", ")}.`:"No interior cross-wing bridge hops — path is short or stays within-wing.",r=((c=Ir[n.routeMode])==null?void 0:c.label)||n.routeMode,s=n.routeMode!=="shortest"&&n.totalCost!=null?` · weighted cost ${n.totalCost}`:"",a=n.mixSummary?`${n.mixSummary} `:"",o=n.comparisonNote?` ${n.comparisonNote}`:"";return`Mode: ${r}${s}. ${n.hops} hop(s) on visible edges. ${a}Types: ${e}. ${i}${o}`}function Ze(n){return n==null||Number.isNaN(Number(n))?"—":Number(n).toLocaleString()}function v0(n){if(!n||typeof n!="object")return null;const e=[];for(const[t,i]of Object.entries(n))t!=="error"&&(typeof i=="number"?e.push(`${t}: ${Ze(i)}`):typeof i=="string"&&e.push(`${t}: ${i}`));return e.length?e.slice(0,8).join(" · "):null}function ra(){var A,T,K,M;const n=J==null?void 0:J.status,e=(J==null?void 0:J.wingsData)||{},t=(J==null?void 0:J.roomsData)||{},i=(J==null?void 0:J.graphEdges)||[],r=J==null?void 0:J.graphStats,s=J==null?void 0:J.graph,a=(A=s==null?void 0:s.edgesResolved)!=null&&A.length?s.edgesResolved:(r==null?void 0:r.edgesResolved)||[],o=J==null?void 0:J.kgStats,c=(J==null?void 0:J.overviewStats)??((T=J==null?void 0:J.overviewBundle)==null?void 0:T.stats),l=(J==null?void 0:J.graphMeta)??((K=J==null?void 0:J.graph)==null?void 0:K.graphMeta)??(r==null?void 0:r.graphMeta)??((M=J==null?void 0:J.overviewBundle)==null?void 0:M.graphMeta),h=typeof(n==null?void 0:n.total_drawers)=="number"?n.total_drawers:typeof(c==null?void 0:c.totalDrawers)=="number"?c.totalDrawers:D_(e),f=typeof(c==null?void 0:c.totalWings)=="number"?c.totalWings:Object.keys(e).length,d=typeof(c==null?void 0:c.totalRooms)=="number"?c.totalRooms:Qo(t);let m=0;const _=(s==null?void 0:s.summary)??(r==null?void 0:r.summary);(_==null?void 0:_.resolvedEdgeCount)!=null?m=_.resolvedEdgeCount:r!=null&&r.tunnels&&typeof r.tunnels=="object"&&(m=Object.keys(r.tunnels).length);const g=typeof(_==null?void 0:_.resolvedEdgeCount)=="number"?_.resolvedEdgeCount:i.length,p=C_(t,{edgesResolved:a,graphEdges:i,graphSummary:_??null,overviewStats:c??null}),u=v0(o),x=!!(o&&typeof o=="object"&&!o.error),v=ur(i),E=i_(a,Qt),P=Ns(Qt,v)!==null;return{status:n,wingsData:e,roomsData:t,graphEdges:i,graphStats:r,edgesResolved:a,kgStats:o,totalDrawers:h,wingCount:f,roomCount:d,tunnelNodeCount:m,graphEdgeCount:g,ga:p,kgAvailable:x,kgSummary:u,focusWing:L.currentWing,overviewStats:c,graphMeta:l,summary:_,availableRelationshipTypes:v,visibleGraphSummary:E,graphFilterNarrowed:P}}function x0(){try{const n=localStorage.getItem(Yl);return n?JSON.parse(n):null}catch{return null}}function hu(n){try{localStorage.setItem(Yl,JSON.stringify({enabledTypes:[...n||[]]}))}catch{}}function y0(){const n=(J==null?void 0:J.graphEdges)||[],e=ur(n),t=x0(),i=t==null?void 0:r_(t);Qt=t_(i,e),hu(Qt),Y==null||Y.setRelationshipFilters(Ns(Qt,e))}function M0(n){const e=ur((J==null?void 0:J.graphEdges)||[]);if(!(!n||!e.includes(n))){if(Qt.has(n)?Qt.delete(n):Qt.add(n),hu(Qt),Y==null||Y.setRelationshipFilters(Ns(Qt,e)),Le.startSceneId&&Le.targetSceneId){Fr();const t=Le.result;t&&!t.ok&&fn(t.message||"Route no longer exists with these filters — adjust or clear route.")}St(),bn(),bi(),Mt()}}function bi(){const n=re("graph-view-extras");if(!n)return;const e=L.view==="graph"&&!!J&&!J.error;if(n.hidden=!e,!e)return;const t=ra(),i=t.availableRelationshipTypes||[],r=re("graph-rel-chips");r&&(i.length?r.innerHTML=i.map(o=>{const c=Uo(o),l=Qt.has(o),h=o==="tunnel"?"#5b8cff":o==="taxonomy_adjacency"?"#3dc9b8":"#a78bfa";return`<button type="button" class="rel-chip ${l?"is-on":""}" data-rel-type="${Fe(o)}" title="${Fe(c.description)}">
          <span class="rel-chip__swatch" style="background:${h}"></span>
          <span>${Fe(c.shortLabel)}</span>
        </button>`}).join(""):r.innerHTML='<span class="inspect-muted">No typed edges in this graph.</span>');const s=re("graph-status-pill");if(s){const o=t.graphFilterNarrowed,c=t.visibleGraphSummary,l=s_(t.graphMeta,t.summary),h=o?`Visible edges: ${Ze(c.visibleEdgeCount)} (filtered)`:`Edges: ${Ze(t.graphEdgeCount)} (all types)`;s.innerHTML=`<span class="graph-status-pill__primary">${Fe(h)}</span>${l?`<span class="graph-status-pill__hint">${Fe(l.length>240?`${l.slice(0,240)}…`:l)}</span>`:""}`}const a=re("graph-legend-compact");a&&(a.innerHTML=i.length?i.map(o=>{const c=Uo(o);return`<div class="graph-legend-compact__row"><span class="legend-swatch" style="background:${o==="tunnel"?"#5b8cff":o==="taxonomy_adjacency"?"#3dc9b8":"#a78bfa"}"></span><span><strong>${Fe(c.shortLabel)}</strong> — ${Fe(c.description)}</span></div>`}).join(""):"")}function en(n,e,t){const i=e&&String(e).trim()?e:`<p class="inspect-empty">${Fe("No data.")}</p>`;return`
    <section class="inspect-section">
      <h3 class="inspect-section__title">${Fe(n)}</h3>
      <div class="inspect-section__body">${i}</div>
    </section>`}function du(n){return n==null||Number.isNaN(Number(n))?"":`<div class="inspect-bar" aria-hidden="true"><div class="inspect-bar__fill" style="width:${Math.min(100,Math.max(0,Number(n)))}%"></div></div>`}function Un(n,e,t){return`<button type="button" class="inspect-row inspect-row--action"${Object.entries(t||{}).map(([s,a])=>` data-${s}="${Fe(String(a))}"`).join("")}>
    <span class="inspect-row__main">${Fe(n)}</span>
    <span class="inspect-row__meta">${Fe(e)}</span>
  </button>`}function S0(n){var f,d,m,_;const e=O_(n,L.view),t=e.ga.byRelationshipType&&Object.keys(e.ga.byRelationshipType).length?Object.entries(e.ga.byRelationshipType).map(([g,p])=>`${g}: ${Ze(p)}`).join(" · "):"",i=(d=(f=n.graphMeta)==null?void 0:f.truncatedSources)!=null&&d.length?n.graphMeta.truncatedSources.map(g=>{const p=g.totalMatching!=null&&g.totalMatching!==""?Ze(g.totalMatching):"unknown",u=g.inferred?" (heuristic)":"";return`${g.source} limit ${Ze(g.limit)} · ${p} rows reported${u}`}).join("; "):"",r=(((m=n.graphMeta)==null?void 0:m.completenessNotes)||[]).filter(Boolean).join(" "),s=e.kgAvailable?e.kgSummary||"—":"Knowledge graph statistics are unavailable from the current API.",a=e.largestWingsByDrawers.map(g=>Un(g.wing,`${Ze(g.drawers)} drawers · #${g.rank}`,{"inspect-action":"go-wing",wing:g.wing})).join(""),o=e.mostConnectedRooms.length?e.mostConnectedRooms.map(g=>Un(`${g.room}`,`${g.wing} · degree ${g.degree}`,{"inspect-action":"select-room",wing:g.wing,room:g.room})).join(""):"",c=e.mostCrossLinkedWings.length?e.mostCrossLinkedWings.map(g=>Un(g.wing,`${Ze(g.crossEdges)} cross-wing edges`,{"inspect-action":"go-wing",wing:g.wing})).join(""):"",l=[`Palace scale: ${Ze(e.totalDrawers)} drawers across ${Ze(e.wingCount)} wings and ${Ze(e.roomCount)} rooms.`,e.tunnelNodeCount?`Graph summary: ${Ze(e.graphEdgeCount)} resolved undirected edges (all relationship types).`:"No graph edges in graph-stats.",e.graphBlurb].filter(Boolean).join(" "),h=L.view==="graph"&&((_=n.ga)!=null&&_.hasResolvableEdges)?n.graphFilterNarrowed?`<div class="inspect-card inspect-card--hint" role="status"><strong>Graph filters active</strong><p class="inspect-muted inspect-muted--tight">Visible: ${Ze(n.visibleGraphSummary.visibleEdgeCount)} edges (${rr(n.visibleGraphSummary.visibleByType)||"—"}). Inspector “visible” rows match the scene. Footer and resolved totals above remain global.</p></div>`:'<div class="inspect-card inspect-card--hint" role="status"><strong>Graph view</strong><p class="inspect-muted inspect-muted--tight">Brighter blue edges = cross-wing tunnels; softer teal = inferred same-wing adjacency. Narrow types in the left panel.</p></div>':"";return`
    <div class="inspect-stack">
      <div class="inspect-card inspect-card--hero">
        <span class="badge">Overview</span>
        <p class="inspect-lead">${Fe(e.viewHint)}</p>
        <p class="inspect-muted">${Fe(l)}</p>
      </div>
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
        ${r?`<p class="inspect-muted inspect-muted--tight">${Fe(r)}</p>`:""}
        <p class="inspect-muted inspect-muted--tight">${Fe(s)}</p>
        `)}
      ${en("Largest wings",`<div class="inspect-rows">${a||'<p class="inspect-empty">No wing counts available.</p>'}</div>`)}
      ${en("Most connected rooms",o||'<p class="inspect-empty">No resolvable tunnel edges, or graph endpoints do not match room names.</p>')}
      ${en("Most cross-linked wings",c||'<p class="inspect-empty">No cross-wing tunnel edges resolved.</p>')}
      <div class="inspect-card inspect-card--hint">
        <strong>How to explore</strong>
        <p class="inspect-muted inspect-muted--tight">Use <kbd>1</kbd>–<kbd>3</kbd> to switch views. Click wings and rooms to drill in; Pin keeps the inspector fixed. Search dims non-matching nodes.</p>
      </div>
    </div>`}function E0(n,e,t){var de;const{wingsData:i,roomsData:r,totalDrawers:s,ga:a,graphEdges:o}=n,c=Number(i[e])||0,l=r[e]||[],h=l.length,f=ea(i),d=f.find(k=>k.wing===e),m=U_(r),_=m.find(k=>k.wing===e),g=Ts(c,s),p=Qo(r),u=Ts(h,p),x=Jl(r,e),v=x>0?x:c,E=h?(v/h).toFixed(1):null,P=ta(r,e),A=P[0],T=P.length>1?P[P.length-1]:null,K=[g!=null&&d?`This wing holds ${g}% of all drawers and is the ${qn(d.rank)} largest wing by drawer count.`:null,u!=null&&_&&h?`It ranks ${qn(_.rank)} among wings by room count (${u}% of all rooms).`:null].filter(Boolean).join(" "),M=P_(e,o,r,n.edgesResolved),w=n.edgesResolved||[],F=Os(w,Qt),D=jc(e,w),X=jc(e,F),C=(()=>{if(!n.graphFilterNarrowed||!a.hasResolvableEdges)return"";const k=D.byType.tunnel||0,te=X.byType.tunnel||0,se=D.byType.taxonomy_adjacency||0,Re=X.byType.taxonomy_adjacency||0;return te>Re*2&&k>0?"With current filters, this wing shows mostly cross-wing tunnel links.":Re>te*2&&se>0?"With current filters, visible links here are mostly inferred same-wing adjacency.":X.crossWingTouches===0&&M.crossWingTouches>0?"Cross-wing tunnel links are hidden by filters; only same-wing structure may be visible.":""})(),z=M.crossWingTouches>0?`
      ${ht("Cross-wing tunnel touches",Ze(M.crossWingTouches))}
      <div class="inspect-rows">
        ${M.topExternalWings.map(k=>Un(k.wing,`${Ze(k.edges)} edges`,{"inspect-action":"go-wing",wing:k.wing})).join("")}
      </div>`:"",q=M.topRoomsByCrossWing.map(k=>Un(k.room,`cross-wing ${Ze(k.crossEdges)}`,{"inspect-action":"select-room",wing:k.wing,room:k.room})).join(""),$=P.slice(0,5).map(k=>Un(k.name,`${Ze(k.drawers)} drawers`,{"inspect-action":"select-room",wing:e,room:k.name})),ee=[...l].map(k=>{const te=k.roomId||It(e,k.name),se=a.degreeByKey.get(te)??0;return{...k,deg:se}}).sort((k,te)=>te.deg-k.deg).slice(0,5),Z=ee.length?ee.map(k=>Un(k.name,`degree ${k.deg}`,{"inspect-action":"select-room",wing:e,room:k.name})).join(""):"",ne=h===0?'<p class="inspect-empty">This wing has no room-level drawer breakdown in taxonomy.</p>':`
      ${ht("Rooms listed",Ze(h))}
      ${ht("Drawers (wing total)",Ze(c))}
      ${E!=null?ht("Avg drawers / room",E):""}
      ${A?ht("Largest room",`${A.name} (${Ze(A.drawers)})`):""}
      ${T&&T.name!==(A==null?void 0:A.name)?ht("Smallest room",`${T.name} (${Ze(T.drawers)})`):""}
    `;return`
    <div class="inspect-stack">
      ${L.view==="graph"?'<p class="inspect-muted inspect-muted--tight">Graph view: node positions are layout-only; drawer ranks use taxonomy and wings API.</p>':""}
      <div class="inspect-card inspect-card--hero">
        <span class="badge">Wing</span>
        <div class="inspect-title">${Fe(e)}</div>
        <p class="inspect-lead">${Fe(K||"Wing footprint in the palace.")}</p>
        ${g!=null?`<div class="inspect-pct"><span>${g}% of palace drawers</span>${du(g)}</div>`:""}
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
          ${ht("Edge types (global)",rr(D.byType)||"—")}
          ${n.graphFilterNarrowed?ht("Edge types (visible)",rr(X.byType)||"—"):""}
          ${n.graphFilterNarrowed?ht("Cross-wing touches (visible)",Ze(X.crossWingTouches)):""}
        </div>
        ${C?`<p class="inspect-muted inspect-muted--tight">${Fe(C)}</p>`:""}
        ${z||'<p class="inspect-empty">No cross-wing tunnel relationships touch this wing.</p>'}
             ${q?`<p class="inspect-micro">Rooms with cross-wing links (global)</p><div class="inspect-rows">${q}</div>`:""}`:'<p class="inspect-empty">No tunnel relationships could be resolved against taxonomy rooms.</p>')}
      ${en("Related rooms",`<p class="inspect-micro">Largest by drawers</p><div class="inspect-rows">${$.join("")}</div>
         ${Z?`<p class="inspect-micro">Most connected (tunnels)</p><div class="inspect-rows">${Z}</div>`:'<p class="inspect-empty">No graph degree for rooms in this wing.</p>'}`)}
      ${en("Health / graph insight",`<p class="inspect-muted">${Fe(((de=a.topCrossLinkedWings[0])==null?void 0:de.wing)===e?"This wing is among the most cross-linked in the tunnel graph.":M.crossWingTouches>0?"Participates in cross-wing tunnels; see Connections for peers.":h>0?"No cross-wing tunnel edges touch this wing in the current graph.":"Add taxonomy rooms to compare structure.")}</p>`)}
    </div>`}function b0(n,e,t,i){var te;const{wingsData:r,roomsData:s,totalDrawers:a,ga:o}=n,c=s[e]||[],l=c.find(se=>se.name===t),h=l?Number(l.drawers)||0:null,f=Number(r[e])||0,d=Jl(s,e),m=d>0?d:f,_=ta(s,e),g=_.find(se=>se.name===t),p=h!=null&&m>0?Ts(h,m):null,u=h!=null&&a>0?Ts(h,a):null,x=[g&&p!=null?`This room is the ${qn(g.rank)} largest in “${e}” by drawers and holds about ${p}% of that wing’s drawers (by room list).`:null,u!=null?`It is ${u}% of the entire palace by drawers.`:null].filter(Boolean).join(" "),v=It(e,t),E=L_(v,o),P=o.hasResolvableEdges,A=n.edgesResolved||[],T=Os(A,Qt),K=Xc(v,A),M=Xc(v,T),w=o_(M.byType,K.byType),F=N_({drawers:h??0,wingRoomSum:m,palaceTotal:a},E,P),D=m>0&&c.length?m/c.length:null,X=h!=null&&D!=null?h>=D*1.1?"Above wing average size":h<=D*.9?"Below wing average size":"Near wing average size":"—",C=((E==null?void 0:E.relatedRooms)||[]).filter(se=>!(se.wing===e&&se.room===t)).slice(0,6),z=C.length?C.map(se=>Un(`${se.room}`,`${se.wing} · deg ${se.degree}`,{"inspect-action":"select-room",wing:se.wing,room:se.room})).join(""):"",q=((E==null?void 0:E.relatedWings)||[]).filter(se=>se.wing!==e).slice(0,6).map(se=>Un(se.wing,`${Ze(se.links)} tunnel link${se.links===1?"":"s"}`,{"inspect-action":"go-wing",wing:se.wing})).join(""),$=E&&E.isBridge?"Acts as a bridge: at least one cross-wing tunnel edge is incident to this room.":"No bridge pattern detected (no cross-wing edges on this room).",ee=L.view==="graph"?'<p class="inspect-muted inspect-muted--tight">Graph view: layout is force-directed; tunnel metrics match the same resolved edges as Rooms/Wings.</p>':"",Z=`room:${e}:${t}`,ne=Le.startSceneId?or(Le.startSceneId):null,ce=ne?`${ne.room} · ${ne.wing}`:"—",de=P&&Le.startSceneId&&Le.startSceneId!==Z,k=L.view==="graph"&&P?en("Route",`<div class="meta-block">
            ${ht("Route start",Fe(ce))}
            ${ht("Route target",Le.targetSceneId?Fe((()=>{const se=or(Le.targetSceneId);return se?`${se.room} · ${se.wing}`:Le.targetSceneId})()):"—")}
          </div>
          <div class="btn-row" style="margin-top:8px;flex-wrap:wrap;gap:6px">
            <button type="button" class="btn btn--ghost btn--sm" data-route-action="set-start">Set as route start</button>
            <button type="button" class="btn btn--ghost btn--sm" data-route-action="route-here" data-wing="${Fe(e)}" data-room="${Fe(t)}" ${de?"":"disabled"} title="Compute route along visible edges (current mode)">Route to here</button>
            <button type="button" class="btn btn--ghost btn--sm" data-route-action="clear-route" ${Le.startSceneId||Le.targetSceneId?"":"disabled"}>Clear route</button>
          </div>
          ${(te=Le.result)!=null&&te.ok?`<p class="inspect-muted inspect-muted--tight" role="status">${Fe(_0(Le.result))}</p>`:""}
          ${Le.result&&!Le.result.ok?`<p class="inspect-muted inspect-muted--tight" role="status">${Fe(Le.result.message||"")}</p>`:""}`):"";return`
    <div class="inspect-stack">
      ${ee}
      ${k}
      <div class="inspect-card inspect-card--hero">
        <span class="badge">Room</span>
        <div class="inspect-title">${Fe(t)}</div>
        <p class="inspect-lead">${Fe(x||"Room in the palace taxonomy.")}</p>
        ${p!=null?`<div class="inspect-pct"><span>${p}% of wing drawers (room list)</span>${du(p)}</div>`:""}
      </div>
      ${en("Summary",`
        <div class="meta-block">
          ${ht("Parent wing",Fe(e))}
          ${ht("Drawers",h!=null?Ze(h):"—")}
          ${ht("Share of palace",u!=null?`${u}%`:"—")}
        </div>`)}
      ${en("Position in wing",c.length?`
        <div class="meta-block">
          ${ht("Rank in wing (by drawers)",g?`${qn(g.rank)} of ${_.length}`:"—")}
          ${ht("Wing avg drawers / room",D!=null?D.toFixed(1):"—")}
          ${ht("vs average",X)}
        </div>`:'<p class="inspect-empty">This wing has no room-level drawer breakdown.</p>')}
      ${en("Connections",P&&E?`
        <div class="meta-block">
          ${ht(n.graphFilterNarrowed?"Degree (visible)":"Degree (global)",Ze(M.degree))}
          ${n.graphFilterNarrowed?ht("Degree (global)",Ze(K.degree)):""}
          ${ht(n.graphFilterNarrowed?"Cross-wing (visible)":"Cross-wing links",Ze(M.crossWingLinks))}
          ${n.graphFilterNarrowed?ht("Cross-wing (global)",Ze(K.crossWingLinks)):""}
          ${ht(n.graphFilterNarrowed?"Intra-wing (visible)":"Intra-wing links",Ze(M.intraWingLinks))}
          ${n.graphFilterNarrowed?ht("Intra-wing (global)",Ze(K.intraWingLinks)):""}
          ${ht("Relationship mix (global)",rr(K.byType)||"—")}
          ${n.graphFilterNarrowed?ht("Relationship mix (visible)",rr(M.byType)||"—"):""}
          ${ht("Median degree (all rooms)",E.medianDegree!=null?Ze(E.medianDegree):"—")}
        </div>
        ${w?`<p class="inspect-muted inspect-muted--tight">${Fe(w)}</p>`:""}
        <p class="inspect-muted inspect-muted--tight">${Fe($)}</p>
        ${z?`<p class="inspect-micro">Related rooms (global graph)</p><div class="inspect-rows">${z}</div>`:'<p class="inspect-empty">No tunnel neighbors found for this room.</p>'}
        ${q?`<p class="inspect-micro">Related wings (global graph)</p><div class="inspect-rows">${q}</div>`:""}
        `:'<p class="inspect-empty">No tunnel relationships available for this room (unresolved graph or empty tunnels).</p>')}
      ${en("Insight",`<p class="insight-chip">${Fe(F.label)}</p><p class="inspect-muted inspect-muted--tight">${Fe(F.detail)}</p>`)}
    </div>`}function w0(n){const e=n.target.closest("[data-route-mode]");if(e){const c=e.getAttribute("data-route-mode");c&&p0(c);return}const t=n.target.closest("[data-route-action]");if(t){const c=t.getAttribute("data-route-action");if(c==="set-start")g0();else if(c==="route-here"){const l=t.getAttribute("data-wing"),h=t.getAttribute("data-room");l&&h&&uu(`room:${l}:${h}`)}else c==="clear-route"&&zo();return}const i=n.target.closest("[data-graph-action]");if(i){const c=i.getAttribute("data-graph-action");c==="frame-nbr"?f0():c==="next"?Rs(1):c==="prev"?Rs(-1):c==="back"?lu():c==="route-start"?el("start"):c==="route-end"?el("end"):c==="route-prev"?Cs(-1):c==="route-next"?Cs(1):c==="route-clear"&&zo();return}const r=n.target.closest("[data-inspect-action]");if(!r)return;const s=r.getAttribute("data-inspect-action"),a=r.getAttribute("data-wing"),o=r.getAttribute("data-room");if(s==="go-wing"&&a){pu(a);return}s==="select-room"&&a&&o&&T0(a,o)}function T0(n,e){var s,a;if(Br(),!J||!gi(J.wingsData,n)||!_i(J.roomsData,n,e))return;const t=J.roomsData[n],i=Array.isArray(t)?t.find(o=>o.name===e):null,r=`room:${n}:${e}`;if(L.view==="graph"){(s=L.selected)!=null&&s.id&&L.selected.id!==r&&Pr(Qn,Dr()),L.currentWing=n,L.currentRoom=e,L.selected={id:r,type:"room",name:e,wing:n,wingId:n,roomId:(i==null?void 0:i.roomId)||It(n,e),drawers:i==null?void 0:i.drawers},L.pinned=!0,Mt(),Y==null||Y.centerOnNodeId(r),bn(),St(),_t();return}L.currentWing=n,L.currentRoom=e,L.selected={id:r,type:"room",name:e,wing:n,wingId:n,roomId:(i==null?void 0:i.roomId)||It(n,e),drawers:i==null?void 0:i.drawers},L.pinned=!1,L.view="rooms",Y==null||Y.setView("rooms",n),Mt(),Y==null||Y.centerOnNodeId(r),dr(),re("view-helper-text").textContent=((a=ti.find(o=>o.id==="rooms"))==null?void 0:a.hint)||"",bi(),bn(),St(),_t()}function A0(n){if(!n||n.type==="center"||!n.id)return null;const e=n.wingId??n.wing,t=n.roomId??(n.type==="room"&&e&&n.name!=null?It(e,n.name):null);return{id:n.id,type:n.type,name:n.name,wing:e,wingId:e,roomId:t,drawers:n.drawers}}function R0(){try{const n=localStorage.getItem(ia);return n?JSON.parse(n):null}catch{return null}}function _t(){clearTimeout(Zc),Zc=setTimeout(()=>{var n,e,t;try{const i={view:L.view,currentWing:L.currentWing,currentRoom:L.currentRoom,selected:L.selected,pinned:L.pinned,searchQuery:L.searchQuery,labels:((n=re("toggle-labels"))==null?void 0:n.checked)??!0,rotate:((e=re("toggle-rotate"))==null?void 0:e.checked)??!0,motion:Number(((t=re("motion-range"))==null?void 0:t.value)??1)};localStorage.setItem(ia,JSON.stringify(i))}catch{}},200)}function tl(){J&&r0(L,J)}function C0(n){n&&(n.labels!==void 0&&re("toggle-labels")&&(re("toggle-labels").checked=!!n.labels),n.rotate!==void 0&&re("toggle-rotate")&&(re("toggle-rotate").checked=!!n.rotate),n.motion!==void 0&&re("motion-range")&&(re("motion-range").value=String(n.motion)),n.searchQuery!==void 0&&re("search-wings")&&(re("search-wings").value=n.searchQuery))}function L0(n){if(n==null)return;const e=i0(n);L.view=e.view,L.currentWing=e.currentWing,L.currentRoom=e.currentRoom,L.selected=e.selected,L.pinned=e.pinned,L.searchQuery=e.searchQuery}function Mt(){var n;Y==null||Y.updatePresentation({searchQuery:L.searchQuery,selectedId:((n=L.selected)==null?void 0:n.id)??null,pinActive:L.pinned,route:m0()})}function ms(n,e){const t=re("conn-status");t&&(t.dataset.state=n,t.textContent=e)}function _s(n){var e;(e=re("loading-overlay"))==null||e.classList.toggle("is-hidden",!n)}function P0(n,e){var i;_s(!0);const t=re("loading-overlay");t&&(t.innerHTML=`
    <div class="err-box">
      <strong>Unable to load data</strong>
      <p>${Fe(n)}</p>
      ${`<code>${Fe(e)}</code>`}
      <p style="margin-top:10px;color:#94a3b8;font-size:0.76rem;">Start the API bridge from the project folder:</p>
      <code style="margin-top:4px;">node server.js</code>
      <div class="btn-row">
        <button type="button" class="btn btn--ghost" id="err-retry">Retry</button>
      </div>
    </div>
  `,(i=re("err-retry"))==null||i.addEventListener("click",()=>aa(!1)))}function ko(n,e){const t=re("metric-context"),i=re("metric-context-wrap");if(!(!t||!i)){if(!n||!e){i.hidden=!0,t.textContent="";return}if(i.hidden=!1,n.type==="wing"){const r=ea(e.wingsData).find(s=>s.wing===n.name);t.textContent=r?`Selected wing · ${qn(r.rank)} by drawers`:"Selected wing";return}if(n.type==="room"){const r=ta(e.roomsData,n.wing).find(s=>s.name===n.name);t.textContent=r?`Selected room · ${qn(r.rank)} in ${n.wing}`:"Selected room"}}}function bn(){J==null||J.status;const n=J==null?void 0:J.graphStats,e=J==null?void 0:J.graph,t=(e==null?void 0:e.summary)??(n==null?void 0:n.summary),i=J==null?void 0:J.kgStats,r=ra(),{wingsData:s,roomsData:a,totalDrawers:o,ga:c,overviewStats:l}=r;re("metric-drawers").textContent=Ze(o??0),re("metric-wings").textContent=Ze(typeof(l==null?void 0:l.totalWings)=="number"?l.totalWings:Object.keys(s).length),re("metric-rooms").textContent=Ze(typeof(l==null?void 0:l.totalRooms)=="number"?l.totalRooms:Qo(a));let h=0;typeof(t==null?void 0:t.resolvedEdgeCount)=="number"?h=t.resolvedEdgeCount:n!=null&&n.tunnels&&typeof n.tunnels=="object"&&(h=Object.keys(n.tunnels).length),re("metric-tunnels").textContent=h?Ze(h):"—";const f=re("metric-cross");f&&(f.textContent=c.hasResolvableEdges?Ze(c.crossWingEdgeCount):"—");const d=re("metric-footnote");if(d){const m=c.topCrossLinkedWings[0],_=c.topConnectedRooms[0];let g="";c.hasResolvableEdges&&m&&_?g=`Most cross-linked wing: ${m.wing} · Most connected room: ${_.room} (${_.wing})`:c.hasResolvableEdges&&m?g=`Most cross-linked wing: ${m.wing}`:g="Tunnel graph: resolve endpoints to see cross-wing stats.",L.view==="graph"&&r.graphFilterNarrowed&&(g=`Visible ${Ze(r.visibleGraphSummary.visibleEdgeCount)} edges · ${g}`),d.textContent=g}if(i&&typeof i=="object"&&!i.error){const m=[];for(const[_,g]of Object.entries(i))_!=="error"&&(typeof g=="number"?m.push(`${_}: ${Ze(g)}`):typeof g=="string"&&m.push(`${_}: ${g}`));re("metric-kg").textContent=m.length?m.slice(0,8).join(" · "):"—"}else re("metric-kg").textContent="—";ko(L.selected,r)}function I0(n,e){return e.trim()?n.toLowerCase().includes(e.trim().toLowerCase()):!0}function D0(){if(!(J!=null&&J.roomsData)||!(J!=null&&J.wingsData)){Bo=[];return}Bo=s0(J.roomsData,J.wingsData)}function U0(){return ou(L.searchQuery)}function sa(){const n=U0();n!==As&&(As=n,Ar=!1,Jt=0),Ut=c0(Bo,L.searchQuery),Jt>=Ut.length&&(Jt=Math.max(0,Ut.length-1)),ar()}function ar(){const n=re("graph-search-panel"),e=re("graph-search-meta"),t=re("graph-search-list"),i=re("graph-search-empty"),r=re("graph-search-nav");if(!n||!e||!t)return;if(!L.searchQuery.trim()){n.hidden=!0;return}n.hidden=!1;const a=Ut.length,o=a>1;if(r&&(r.hidden=!o),!a){i.hidden=!1,t.innerHTML="",e.textContent="No matches";return}i.hidden=!0;const c=Math.min(Jt,a-1),l=a>12?` · ${a} total`:"";e.textContent=`Result ${c+1} of ${a}${l}`;const h=12;let f=0;a>h&&(f=Math.min(Math.max(0,c-5),Math.max(0,a-h)));const d=Ut.slice(f,f+h);t.innerHTML=d.map((m,_)=>{const g=f+_,p=g===c,u=m.kind==="room"?`<button type="button" class="btn btn--ghost btn--sm graph-search-hit__route" data-graph-route-to="${g}" title="Use as route target (needs route start)">Route</button>`:"";return`<li class="graph-search-hit-row">
        <button type="button" class="graph-search-hit ${p?"is-active":""}" data-graph-hit-ix="${g}" role="option" aria-selected="${p?"true":"false"}">
          <span class="graph-search-hit__label">${Fe(m.label)}</span>
          <span class="graph-search-hit__sub">${Fe(m.sublabel)}</span>
        </button>
        ${u}
      </li>`}).join(""),a>h&&t.insertAdjacentHTML("beforeend",`<li class="graph-search-more"><span class="inspect-muted">Scroll list with ↑↓ · Alt+N / Alt+P for all ${a} matches</span></li>`)}function fu(){const n=re("graph-search-first-hint");if(!n)return;const e=L.view==="graph"&&!sessionStorage.getItem("mempalace-graph-search-hint")&&!!J&&!J.error;n.hidden=!e}function Ls(){sessionStorage.setItem("mempalace-graph-search-hint","1");const n=re("graph-search-first-hint");n&&(n.hidden=!0)}function N0(){L.searchQuery="";const n=re("search-wings");n&&(n.value=""),Ut=[],Jt=0,Ar=!1,As="",Mt(),oa(),ar(),_t()}function Ho(n){var s,a;if(Br(),!J||!n)return;const e=!Ar;if(n.startsWith("wing:")){const o=n.slice(5);if(!gi(J.wingsData,o))return;L.view!=="graph"&&$n("graph"),L.view==="graph"&&qc((s=L.selected)==null?void 0:s.id,n,e)&&Pr(Qn,Dr()),Ar=!0,L.currentWing=o,L.currentRoom=null,L.selected={id:n,type:"wing",name:o,wing:o,wingId:o,drawers:J.wingsData[o]},L.pinned=!0,Mt(),Y==null||Y.centerOnNodeId(n),Y==null||Y.pulseNodeEmphasis(n),bn(),St(),ar(),_t(),Ls();return}const t=or(n);if(!t||!_i(J.roomsData,t.wing,t.room))return;const i=J.roomsData[t.wing],r=Array.isArray(i)?i.find(o=>o.name===t.room):null;L.view!=="graph"&&$n("graph"),L.view==="graph"&&qc((a=L.selected)==null?void 0:a.id,n,e)&&Pr(Qn,Dr()),Ar=!0,L.currentWing=t.wing,L.currentRoom=t.room,L.selected={id:n,type:"room",name:t.room,wing:t.wing,wingId:t.wing,roomId:(r==null?void 0:r.roomId)||It(t.wing,t.room),drawers:r==null?void 0:r.drawers},L.pinned=!0,Mt(),Y==null||Y.centerOnNodeId(n),Y==null||Y.pulseNodeEmphasis(n),bn(),St(),ar(),_t(),Ls()}function nl(n){Ut.length<2||(Jt=Fo(Jt,Ut.length,n),Ho(Ut[Jt].sceneId))}function O0(){var n;Ls(),(n=re("search-wings"))==null||n.focus()}function oa(){const n=re("legend-host");if(!n)return;const e=J==null?void 0:J.status,t=e!=null&&e.wings&&typeof e.wings=="object"?e.wings:(J==null?void 0:J.wingsData)||{},i=Object.entries(t);if(!i.length){n.innerHTML='<div class="empty-state" style="padding:8px;">No wing data yet.</div>';return}n.innerHTML=i.map(([r,s])=>{const a=Oo(r),o=I0(`${r} ${s}`,L.searchQuery);return`
      <div class="legend-item" data-wing="${Fe(r)}" style="${o?"":"display:none"}">
        <span class="legend-color" style="background:${a}"></span>
        <span>${Fe(r)} · ${Ze(s)} drawers</span>
      </div>`}).join("")}function F0(n){const e=n.querySelector(".breadcrumb-nav");if(!e)return;const t=[...e.querySelectorAll(".crumb")];if(!t.length)return;t.forEach((r,s)=>{r.setAttribute("aria-posinset",String(s+1)),r.setAttribute("aria-setsize",String(t.length)),r.tabIndex=s===0?0:-1});const i=e._bcKey;i&&e.removeEventListener("keydown",i),e._bcKey=r=>{const s=t.indexOf(document.activeElement);if(!(s<0)){if(r.key==="ArrowRight"||r.key==="ArrowDown"){r.preventDefault();const a=(s+1)%t.length;t.forEach((o,c)=>{o.tabIndex=c===a?0:-1}),t[a].focus()}else if(r.key==="ArrowLeft"||r.key==="ArrowUp"){r.preventDefault();const a=(s-1+t.length)%t.length;t.forEach((o,c)=>{o.tabIndex=c===a?0:-1}),t[a].focus()}else if(r.key==="Home")r.preventDefault(),t.forEach((a,o)=>{a.tabIndex=o===0?0:-1}),t[0].focus();else if(r.key==="End"){r.preventDefault();const a=t.length-1;t.forEach((o,c)=>{o.tabIndex=c===a?0:-1}),t[a].focus()}}},e.addEventListener("keydown",e._bcKey)}function B0(){var t,i,r;const n=re("breadcrumb");if(!n)return;const e=['<button type="button" class="crumb" data-crumb="root">All wings</button>'];L.currentWing&&(e.push('<span class="crumb-sep" aria-hidden="true">›</span>'),e.push(`<button type="button" class="crumb" data-crumb="wing" data-wing="${Fe(L.currentWing)}">${Fe(L.currentWing)}</button>`)),L.currentRoom&&L.currentWing&&(e.push('<span class="crumb-sep" aria-hidden="true">›</span>'),e.push(`<button type="button" class="crumb" data-crumb="room" data-wing="${Fe(L.currentWing)}" data-room="${Fe(L.currentRoom)}">${Fe(L.currentRoom)}</button>`)),n.innerHTML=`<nav class="breadcrumb-nav" aria-label="Palace location">${e.join("")}</nav>`,(t=n.querySelector('[data-crumb="root"]'))==null||t.addEventListener("click",()=>z0()),(i=n.querySelector('[data-crumb="wing"]'))==null||i.addEventListener("click",s=>{const a=s.currentTarget.getAttribute("data-wing");a&&pu(a)}),(r=n.querySelector('[data-crumb="room"]'))==null||r.addEventListener("click",s=>{const a=s.currentTarget.getAttribute("data-room"),o=s.currentTarget.getAttribute("data-wing");if(a&&o&&L.currentWing===o&&L.currentRoom===a){const c=`room:${o}:${a}`;Y==null||Y.centerOnNodeId(c)}}),F0(n)}function z0(){var n;Br(),Qn.length=0,L.view="wings",L.currentWing=null,L.currentRoom=null,L.selected=null,L.pinned=!1,Y==null||Y.setView("wings",null),Mt(),dr(),re("view-helper-text").textContent=((n=ti.find(e=>e.id==="wings"))==null?void 0:n.hint)||"",bi(),bn(),St(),_t()}function pu(n){var e;Br(),!(!J||!gi(J.wingsData,n))&&(L.currentWing=n,L.currentRoom=null,L.view="rooms",L.selected=null,L.pinned=!1,Y==null||Y.setView("rooms",n),Mt(),dr(),re("view-helper-text").textContent=((e=ti.find(t=>t.id==="rooms"))==null?void 0:e.hint)||"",bi(),bn(),St(),_t())}function k0(){return L.pinned&&L.selected?L.view==="graph"?"graphFocus":"pinned":L.selected?"selected":L.hovered?"live":"empty"}function il(){const n=re("btn-pin");n&&(n.textContent=L.pinned?"Unpin":"Pin",n.disabled=!L.selected)}function St(){const n=re("inspect-body"),e=k0(),t=re("inspect-mode-badge");if(t){const c={empty:"Nothing selected",live:"Live preview",selected:"Selected",pinned:"Pinned",graphFocus:"Graph focus"};t.textContent=c[e],t.dataset.mode=e}let i=null;e==="pinned"||e==="selected"?i=L.selected:e==="live"&&(i=L.hovered),B0();const r=ra(),s=h0(r);if(!i||i.type==="center"){e==="empty"?n.innerHTML=Mo()+s+S0(r):n.innerHTML=Mo()+s+`
        <div class="empty-state">
          <strong>Hover a node</strong>
          <p>Move the pointer over the scene for a quick preview, or select a wing or room.</p>
        </div>`,ko(null,r),il();return}const a=i,o=Mo();a.type==="wing"?n.innerHTML=o+s+E0(r,a.name):a.type==="room"?n.innerHTML=o+s+b0(r,a.wing,a.name):n.innerHTML=o+s+'<div class="inspect-card"><p class="inspect-muted">Unknown node type.</p></div>',ko(a,r),il()}function ht(n,e){return`<div class="meta-row"><span class="meta-k">${Fe(n)}</span><span class="meta-v">${e}</span></div>`}function rl(n,e,t){const i=re("hover-card");if(!i)return;if(!t){i.classList.remove("is-visible");return}const r=16,s=i.offsetWidth||240,a=i.offsetHeight||80;let o=n+r,c=e+r;o+s>window.innerWidth-8&&(o=n-s-r),c+a>window.innerHeight-8&&(c=window.innerHeight-a-8),i.style.left=`${Math.max(8,o)}px`,i.style.top=`${Math.max(8,c)}px`,i.classList.add("is-visible")}function sl(n){const e=re("hover-card");if(!e)return;if(!n||n.type==="center"){e.classList.remove("is-visible");return}const t=n.name||n.label||"Node";let i="";n.type==="wing"?i=`Wing · ${Ze(n.drawers)} drawers`:n.type==="room"&&(i=`Room in “${Fe(n.wing)}”`),e.innerHTML=`<div class="hc-title">${Fe(t)}</div><div class="hc-sub">${i}</div>`}function dr(){document.querySelectorAll("[data-view]").forEach(n=>{const e=n.getAttribute("data-view")===L.view;n.classList.toggle("is-active",e),n.setAttribute("aria-selected",e?"true":"false"),n.tabIndex=e?0:-1})}function Er(){var e;const n=re("help-overlay");n&&(n.classList.remove("is-open"),n.setAttribute("aria-hidden","true"),(e=ui==null?void 0:ui.focus)==null||e.call(ui),ui=null)}function H0(){const n=re("help-overlay"),e=re("help-dialog");!n||!e||(ui=document.activeElement instanceof HTMLElement?document.activeElement:null,n.classList.add("is-open"),n.setAttribute("aria-hidden","false"),requestAnimationFrame(()=>{var t;(t=re("help-close"))==null||t.focus()}))}function Br(){const n=re("help-overlay");n!=null&&n.classList.contains("is-open")&&Er()}function $n(n){var t;Br(),L.view==="graph"&&n!=="graph"&&(Qn.length=0,zo()),L.view=n,n==="wings"&&(L.currentWing=null,L.currentRoom=null),n==="graph"&&!sessionStorage.getItem("mempalace-graph-enter-hint")&&(sessionStorage.setItem("mempalace-graph-enter-hint","1"),fn("Graph: drag to orbit · click spheres to focus · [ ] step links · U prior focus",7e3));const e=n==="rooms"?L.currentWing:null;Y==null||Y.setView(n,e),Mt(),dr(),re("view-helper-text").textContent=((t=ti.find(i=>i.id===n))==null?void 0:t.hint)||"",bi(),bn(),St(),fu(),sa(),_t()}function G0(){L.selected&&(L.pinned=!L.pinned,Mt(),St(),_t())}function ol(){L.selected=null,L.currentRoom=null,L.pinned=!1,Mt(),St(),_t()}function W0(n){var t,i;if(!n||n.type==="center"){L.hovered=null,L.pinned||(L.selected=null,L.currentRoom=null),Mt(),St(),_t();return}const e=A0(n);if(L.hovered=null,L.view==="wings"&&n.type==="wing"){L.currentWing=n.name,L.currentRoom=null,L.selected=e,L.pinned=!1,L.view="rooms",Y==null||Y.setView("rooms",n.name),Mt(),dr(),re("view-helper-text").textContent=((t=ti.find(r=>r.id==="rooms"))==null?void 0:t.hint)||"",bi(),bn(),St(),_t();return}if(L.view==="rooms"&&n.type==="wing"){L.currentWing===n.name?(Y==null||Y.centerOnNodeId(n.id),L.selected=e,L.pinned=!1):(L.currentWing=n.name,L.currentRoom=null,L.selected=e,L.pinned=!1,Y==null||Y.setView("rooms",n.name),Mt()),St(),_t();return}if(L.view==="rooms"&&n.type==="room"){L.currentWing=n.wing,L.currentRoom=n.name,L.selected=e,L.pinned=!1,Y==null||Y.setView("rooms",L.currentWing),Mt(),Y==null||Y.centerOnNodeId(n.id),St(),_t();return}if(L.view==="graph"){if(!e)return;e.id&&((i=L.selected)!=null&&i.id)&&L.selected.id!==e.id&&Pr(Qn,Dr()),L.selected=e,e.type==="room"?(L.currentWing=e.wing,L.currentRoom=e.name):e.type==="wing"&&(L.currentWing=e.name,L.currentRoom=null),L.pinned=!0,Mt(),Y==null||Y.centerOnNodeId(e.id),St(),_t();return}L.selected=e,L.pinned=!1,Mt(),St(),_t()}function V0(){const n=re("canvas-container");Y=e0(n,{onHover:(e,t)=>{if(d0()){sl(null),rl(0,0,!1);return}L.hovered=e&&e.type!=="center"?{...e}:null,St(),sl(e),rl(t.x,t.y,!!e&&e.type!=="center")},onClick:e=>W0(e),onBackgroundClick:()=>{const e=re("canvas-container");e==null||e.classList.add("canvas-bg-dismiss"),setTimeout(()=>e==null?void 0:e.classList.remove("canvas-bg-dismiss"),160)}}),Y.init()}function $0(){const n=re("help-overlay");!n||n._trapWired||(n._trapWired=!0,n.addEventListener("keydown",e=>{if(!n.classList.contains("is-open")||e.key!=="Tab")return;const t=[...n.querySelectorAll("button, [href], input, select, textarea")].filter(s=>!s.hasAttribute("disabled"));if(t.length===0)return;const i=t[0],r=t[t.length-1];e.shiftKey&&document.activeElement===i?(e.preventDefault(),r.focus()):!e.shiftKey&&document.activeElement===r&&(e.preventDefault(),i.focus())}))}function X0(){var s,a;let n=!1,e=!1;try{const o=localStorage.getItem(cu);if(o){const c=JSON.parse(o);n=!!c.leftCollapsed,e=!!c.rightCollapsed}}catch{}const t=re("app-main-grid"),i=re("panel-left"),r=re("panel-right");t==null||t.classList.toggle("has-left-collapsed",n),t==null||t.classList.toggle("has-right-collapsed",e),i==null||i.classList.toggle("panel--collapsed",n),r==null||r.classList.toggle("panel--collapsed",e),(s=re("btn-collapse-left"))==null||s.setAttribute("aria-expanded",String(!n)),(a=re("btn-collapse-right"))==null||a.setAttribute("aria-expanded",String(!e))}function al(){const n=re("app-main-grid");try{localStorage.setItem(cu,JSON.stringify({leftCollapsed:(n==null?void 0:n.classList.contains("has-left-collapsed"))??!1,rightCollapsed:(n==null?void 0:n.classList.contains("has-right-collapsed"))??!1}))}catch{}}function j0(){var e,t;const n=re("app-main-grid");(e=re("btn-collapse-left"))==null||e.addEventListener("click",()=>{var r,s;n==null||n.classList.toggle("has-left-collapsed"),(r=re("panel-left"))==null||r.classList.toggle("panel--collapsed");const i=n==null?void 0:n.classList.contains("has-left-collapsed");(s=re("btn-collapse-left"))==null||s.setAttribute("aria-expanded",String(!i)),al()}),(t=re("btn-collapse-right"))==null||t.addEventListener("click",()=>{var r,s;n==null||n.classList.toggle("has-right-collapsed"),(r=re("panel-right"))==null||r.classList.toggle("panel--collapsed");const i=n==null?void 0:n.classList.contains("has-right-collapsed");(s=re("btn-collapse-right"))==null||s.setAttribute("aria-expanded",String(!i)),al()})}function q0(){var t,i,r,s,a,o,c,l,h,f,d,m,_,g,p;(t=re("btn-refresh"))==null||t.addEventListener("click",()=>aa(!0)),(i=re("btn-reset-cam"))==null||i.addEventListener("click",()=>Y==null?void 0:Y.resetCamera()),(r=re("btn-center"))==null||r.addEventListener("click",()=>{var u;(u=L.selected)!=null&&u.id?Y==null||Y.centerOnNodeId(L.selected.id):Y==null||Y.centerOnHovered()}),(s=re("btn-pin"))==null||s.addEventListener("click",()=>G0()),(a=re("btn-clear-sel"))==null||a.addEventListener("click",()=>ol()),(o=re("toggle-rotate"))==null||o.addEventListener("change",u=>{Y==null||Y.setAutoRotate(u.target.checked),_t()}),(c=re("toggle-labels"))==null||c.addEventListener("change",u=>{Y==null||Y.setLabelsVisible(u.target.checked),_t()});const n=re("motion-range");n==null||n.addEventListener("input",u=>{const x=Number(u.target.value);Y==null||Y.setMotionIntensity(x),u.target.setAttribute("aria-valuenow",String(x)),_t()}),n&&n.setAttribute("aria-valuenow",n.value),ti.forEach(u=>{var x;(x=document.querySelector(`[data-view="${u.id}"]`))==null||x.addEventListener("click",()=>$n(u.id))});const e=re("view-buttons");if(e==null||e.addEventListener("keydown",u=>{if(u.key!=="ArrowDown"&&u.key!=="ArrowUp"&&u.key!=="ArrowRight"&&u.key!=="ArrowLeft")return;const x=[...document.querySelectorAll("[data-view]")];if(!x.length)return;const v=x.findIndex(A=>A.getAttribute("data-view")===L.view);if(v<0)return;u.preventDefault();const E=u.key==="ArrowDown"||u.key==="ArrowRight"?1:-1,P=(v+E+x.length)%x.length;$n(x[P].getAttribute("data-view")),x[P].focus()}),(l=re("search-wings"))==null||l.addEventListener("input",u=>{clearTimeout(Kc),Kc=setTimeout(()=>{L.searchQuery=u.target.value,Mt(),oa(),sa(),_t()},120)}),(h=re("search-wings"))==null||h.addEventListener("keydown",u=>{if(u.key==="Enter"&&Ut.length>0){u.preventDefault(),Ho(Ut[Jt].sceneId);return}Ut.length&&(u.key==="ArrowDown"?(u.preventDefault(),Jt=Fo(Jt,Ut.length,1),ar()):u.key==="ArrowUp"&&(u.preventDefault(),Jt=Fo(Jt,Ut.length,-1),ar()))}),(f=re("graph-search-panel"))==null||f.addEventListener("click",u=>{const x=u.target.closest("[data-graph-route-to]");if(x){const A=Number(x.getAttribute("data-graph-route-to"));if(Number.isNaN(A)||!Ut[A])return;const T=Ut[A];if(T.kind!=="room")return;uu(T.sceneId),Ls();return}const v=u.target.closest("[data-graph-search-step]");if(v){const A=Number(v.getAttribute("data-graph-search-step"));(A===1||A===-1)&&nl(A);return}const E=u.target.closest("[data-graph-hit-ix]");if(!E)return;const P=Number(E.getAttribute("data-graph-hit-ix"));Number.isNaN(P)||!Ut[P]||(Jt=P,Ho(Ut[P].sceneId))}),(d=re("btn-help"))==null||d.addEventListener("click",()=>{const u=re("help-overlay");u!=null&&u.classList.contains("is-open")?Er():H0()}),(m=re("help-close"))==null||m.addEventListener("click",()=>Er()),(_=re("help-overlay"))==null||_.addEventListener("click",u=>{const x=re("help-overlay");u.target===x&&Er()}),$0(),X0(),j0(),(g=re("graph-view-extras"))==null||g.addEventListener("click",u=>{const x=u.target.closest("[data-rel-type]");if(!x)return;const v=x.getAttribute("data-rel-type");v&&M0(v)}),window.addEventListener("keydown",u=>{var x,v;if(u.altKey&&!u.ctrlKey&&!u.metaKey&&(u.key==="n"||u.key==="N"||u.key==="p"||u.key==="P")&&L.view==="graph"&&Ut.length>1){u.preventDefault(),nl(u.key==="n"||u.key==="N"?1:-1);return}if(!(Qc(u.target)&&u.key!=="Escape")){if(u.key==="Escape"){const E=re("help-overlay");if(E!=null&&E.classList.contains("is-open")){Er();return}if(L.searchQuery.trim()){u.preventDefault(),N0();return}L.pinned?(L.pinned=!1,Mt(),St(),_t()):L.selected&&ol();return}if(!Qc(u.target)){if(u.key==="1"&&$n("wings"),u.key==="2"&&$n("rooms"),u.key==="3"&&$n("graph"),(u.key==="r"||u.key==="R")&&(Y==null||Y.resetCamera()),L.view==="graph"&&!u.ctrlKey&&!u.metaKey&&!u.altKey){const E=((x=Le.result)==null?void 0:x.ok)&&((v=Le.result.pathSceneIds)==null?void 0:v.length)>1;u.key==="["&&(u.preventDefault(),E?Cs(-1):Rs(-1)),u.key==="]"&&(u.preventDefault(),E?Cs(1):Rs(1)),(u.key==="u"||u.key==="U")&&(u.preventDefault(),lu())}if(u.key==="/"&&!u.ctrlKey&&!u.metaKey&&(u.preventDefault(),O0()),u.key==="l"||u.key==="L"){const E=re("toggle-labels");E&&(E.checked=!E.checked,E.dispatchEvent(new Event("change")))}if(u.key===" "){u.preventDefault();const E=re("toggle-rotate");E&&(E.checked=!E.checked,E.dispatchEvent(new Event("change")))}}}}),localStorage.getItem("mempalace-viz-onboarded")||(re("onboard-hint").hidden=!1,localStorage.setItem("mempalace-viz-onboarded","1")),(p=window.matchMedia)!=null&&p.call(window,"(prefers-reduced-motion: reduce)").matches&&!localStorage.getItem(ia)){const u=re("toggle-rotate");u&&(u.checked=!1,u.dispatchEvent(new Event("change"))),n&&(n.value="0",n.setAttribute("aria-valuenow","0"),Y==null||Y.setMotionIntensity(0))}}function Y0(){const n=re("view-buttons");n&&(n.innerHTML=ti.map(e=>`
    <button type="button" class="view-seg__btn" data-view="${e.id}" role="tab" aria-selected="${e.id===L.view?"true":"false"}" tabindex="${e.id===L.view?0:-1}">
      <strong>${Fe(e.title)}</strong>
      <span class="view-seg__hint">${Fe(e.hint)}</span>
    </button>`).join(""))}async function aa(n){var s,a,o,c,l;const e=n?{view:L.view,currentWing:L.currentWing,currentRoom:L.currentRoom,selected:L.selected,pinned:L.pinned,searchQuery:L.searchQuery}:null,t=J;_s(!0),ms("loading","Connecting…");const i=re("loading-overlay");if(i&&(i.innerHTML='<div class="spinner"></div><p style="color:#94a3b8;font-size:0.85rem;">Loading palace data…</p>'),J=await Eu(),J.error){if(n&&t&&!t.error){J=t,ms("stale","Offline (cached)"),fn("Refresh failed — showing last loaded data. Check the API and try again."),_s(!1),St();return}ms("error","Disconnected"),P0(J.error.message||String(J.error),ul()||"(same origin)");return}if(ms("ok","Connected"),_s(!1),!n){const h=R0();L0(h),C0(h)}if(tl(),n&&e){if(e.currentWing&&gi(J.wingsData,e.currentWing)?L.currentWing=e.currentWing:(L.currentWing=null,L.currentRoom=null),e.currentRoom&&L.currentWing&&_i(J.roomsData,L.currentWing,e.currentRoom)?L.currentRoom=e.currentRoom:L.currentRoom=null,L.view=e.view,(s=e.selected)!=null&&s.id){const h=e.selected;h.type==="wing"&&gi(J.wingsData,h.name)||h.type==="room"&&h.wing&&_i(J.roomsData,h.wing,h.name)?L.selected=h:L.selected=null}else L.selected=null;L.pinned=e.pinned&&!!L.selected,L.searchQuery=e.searchQuery??L.searchQuery,re("search-wings").value=L.searchQuery}tl(),Y==null||Y.setData({wingsData:J.wingsData,roomsData:J.roomsData,graphEdges:J.graphEdges}),bn(),oa();const r=L.view==="rooms"?L.currentWing:null;Y==null||Y.setView(L.view,r),y0(),Le.startSceneId&&Le.targetSceneId&&Fr(),Mt(),Y==null||Y.setAutoRotate(((a=re("toggle-rotate"))==null?void 0:a.checked)??!0),Y==null||Y.setLabelsVisible(((o=re("toggle-labels"))==null?void 0:o.checked)??!0),Y==null||Y.setMotionIntensity(Number(((c=re("motion-range"))==null?void 0:c.value)??1)),dr(),re("view-helper-text").textContent=((l=ti.find(h=>h.id===L.view))==null?void 0:l.hint)||"",Object.keys(J.wingsData||{}).length?(!J.roomsData||!Object.keys(J.roomsData).some(h=>(J.roomsData[h]||[]).length))&&(re("view-helper-text").textContent+=" · No rooms in taxonomy yet."):re("view-helper-text").textContent="No wings returned — check MCP backend.",bi(),D0(),As="",sa(),fu(),St(),_t()}function K0(){const n=re("inspect-body");!n||n._delegationWired||(n._delegationWired=!0,n.addEventListener("click",w0))}function Z0(){Y0(),V0(),q0(),K0(),aa(!1)}Z0();
