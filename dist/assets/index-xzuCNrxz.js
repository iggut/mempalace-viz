(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const Ic="∕";function Uc(n){return String(n??"").trim()||"unknown"}function Pl(n){return String(n??"").replace(/\//g,Ic)}function Dl(n){return String(n??"").replace(new RegExp(Ic,"g"),"/")}function Ft(n,e){return`${Uc(n)}/${Pl(e)}`}function si(n){const e=String(n||""),t=e.indexOf("/");return t<=0?null:{wingId:e.slice(0,t),roomName:Dl(e.slice(t+1))}}function Il(n){if(!n||typeof n!="object")return{};if(n.wings&&typeof n.wings=="object"&&!Array.isArray(n.wings))return{...n.wings};const e=new Set(["error","message","ok"]),t={};for(const[i,r]of Object.entries(n))e.has(i)||typeof r=="number"&&(t[i]=r);return Object.keys(t).length?t:{}}function Ul(n){let e=n;if(e!=null&&e.taxonomy&&typeof e.taxonomy=="object"&&(e=e.taxonomy),typeof e=="string")try{e=JSON.parse(e)}catch{e={}}const t=e&&typeof e=="object"?e:{},i={},r=[],s=[];for(const[a,o]of Object.entries(t)){const c=Uc(a);i[c]||(i[c]=[]);let l=0,u=0;if(o&&typeof o=="object"&&!Array.isArray(o))for(const[f,d]of Object.entries(o)){const m=typeof d=="number"?d:1,_=Ft(c,f),g={name:f,drawers:m,roomId:_,wingId:c};i[c].push(g),r.push({roomId:_,wingId:c,name:f,drawerCount:m}),l+=m,u+=1}s.push({wingId:c,name:c,drawerCount:l,roomCount:u,rooms:i[c]})}return s.sort((a,o)=>o.drawerCount-a.drawerCount),r.sort((a,o)=>o.drawerCount-a.drawerCount),{taxonomy:t,roomsData:i,rooms:r,wings:s}}function Nl(n){return n.map(e=>({from:e.sourceRoomId,to:e.targetRoomId,wing:e.sourceWingId,sourceRoomId:e.sourceRoomId,targetRoomId:e.targetRoomId,sourceWingId:e.sourceWingId,targetWingId:e.targetWingId,crossWing:e.crossWing,edgeId:e.edgeId,relationshipType:e.relationshipType}))}function Nc(){var n;return typeof window<"u"&&((n=window.location)!=null&&n.protocol)&&window.location.protocol!=="file:"?"":"http://localhost:8767"}async function hi(n){const e=await fetch(n,{headers:{Accept:"application/json"}});if(!e.ok){const t=await e.text().catch(()=>"");throw new Error(t||`HTTP ${e.status}`)}return e.json()}function zi(n,e){return!!(n&&typeof n=="object"&&e in n)}function ki(n,e,t){const i=n==null?void 0:n[e];return Array.isArray(i)?i.some(r=>r.name===t):!1}function Fl(n){var x;const{status:e,wingsRaw:t,taxonomyRaw:i,graphStats:r,kgResult:s,overviewBundle:a}=n,o=Il(t),{taxonomy:c,roomsData:l,rooms:u,wings:f}=Ul(i),d=Array.isArray(r==null?void 0:r.edgesResolved)?r.edgesResolved:[],m=Array.isArray(r==null?void 0:r.edgesUnresolved)?r.edgesUnresolved:[],_=r!=null&&r.summary&&typeof r.summary=="object"?r.summary:null;let g=[];d.length?g=Nl(d):(x=r==null?void 0:r.legacyGraphEdges)!=null&&x.length?g=r.legacyGraphEdges:r!=null&&r.tunnels&&typeof r.tunnels=="object"&&(g=Object.entries(r.tunnels).flatMap(([w,D])=>Object.entries(D||{}).map(([R,A])=>({from:w,to:R,wing:A}))));const p=s&&!s.error?s:null,h=a!=null&&a.stats&&typeof a.stats=="object"?a.stats:null,S=(r==null?void 0:r.graphMeta)??(a==null?void 0:a.graphMeta)??null;return{status:e,wingsData:o,taxonomy:c,roomsData:l,rooms:u,wings:f,graphStats:r,graph:{edgesResolved:d,edgesUnresolved:m,summary:_,graphMeta:S},graphEdges:g,overviewBundle:a,overviewStats:h,graphMeta:S,kgStats:p,error:null}}async function Ol(){const e=`${Nc()}/api`;try{const[t,i,r,s,a,o]=await Promise.all([hi(`${e}/status`),hi(`${e}/wings`),hi(`${e}/taxonomy`),hi(`${e}/graph-stats`),hi(`${e}/kg-stats`).catch(()=>null),hi(`${e}/overview`).catch(()=>null)]);return Fl({status:t,wingsRaw:i,taxonomyRaw:r,graphStats:s,kgResult:a,overviewBundle:o})}catch(t){return{status:null,wingsData:{},taxonomy:{},roomsData:{},rooms:[],wings:[],graphStats:null,graph:{edgesResolved:[],edgesUnresolved:[],summary:null,graphMeta:null},graphEdges:[],overviewBundle:null,overviewStats:null,graphMeta:null,kgStats:null,error:t}}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const go="160",di={ROTATE:0,DOLLY:1,PAN:2},fi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Bl=0,zo=1,zl=2,Fc=1,kl=2,Sn=3,Hn=0,Vt=1,En=2,Bn=0,Oi=1,ko=2,Ho=3,Go=4,Hl=5,ei=100,Gl=101,Wl=102,Wo=103,Vo=104,Vl=200,Xl=201,$l=202,jl=203,Qs=204,eo=205,ql=206,Yl=207,Kl=208,Zl=209,Jl=210,Ql=211,eu=212,tu=213,nu=214,iu=0,ru=1,su=2,Jr=3,ou=4,au=5,cu=6,lu=7,Oc=0,uu=1,hu=2,zn=0,du=1,fu=2,pu=3,Bc=4,mu=5,gu=6,zc=300,Hi=301,Gi=302,to=303,no=304,cs=306,io=1e3,hn=1001,ro=1002,Wt=1003,Xo=1004,xs=1005,tn=1006,_u=1007,dr=1008,kn=1009,vu=1010,xu=1011,_o=1012,kc=1013,Nn=1014,Fn=1015,fr=1016,Hc=1017,Gc=1018,ni=1020,yu=1021,dn=1023,Mu=1024,Su=1025,ii=1026,Wi=1027,Eu=1028,Wc=1029,bu=1030,Vc=1031,Xc=1033,ys=33776,Ms=33777,Ss=33778,Es=33779,$o=35840,jo=35841,qo=35842,Yo=35843,$c=36196,Ko=37492,Zo=37496,Jo=37808,Qo=37809,ea=37810,ta=37811,na=37812,ia=37813,ra=37814,sa=37815,oa=37816,aa=37817,ca=37818,la=37819,ua=37820,ha=37821,bs=36492,da=36494,fa=36495,wu=36283,pa=36284,ma=36285,ga=36286,jc=3e3,ri=3001,Tu=3200,Au=3201,qc=0,Ru=1,on="",It="srgb",An="srgb-linear",vo="display-p3",ls="display-p3-linear",Qr="linear",mt="srgb",es="rec709",ts="p3",pi=7680,_a=519,Cu=512,Lu=513,Pu=514,Yc=515,Du=516,Iu=517,Uu=518,Nu=519,so=35044,va="300 es",oo=1035,bn=2e3,ns=2001;class li{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let xa=1234567;const lr=Math.PI/180,pr=180/Math.PI;function Tn(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Bt[n&255]+Bt[n>>8&255]+Bt[n>>16&255]+Bt[n>>24&255]+"-"+Bt[e&255]+Bt[e>>8&255]+"-"+Bt[e>>16&15|64]+Bt[e>>24&255]+"-"+Bt[t&63|128]+Bt[t>>8&255]+"-"+Bt[t>>16&255]+Bt[t>>24&255]+Bt[i&255]+Bt[i>>8&255]+Bt[i>>16&255]+Bt[i>>24&255]).toLowerCase()}function kt(n,e,t){return Math.max(e,Math.min(t,n))}function xo(n,e){return(n%e+e)%e}function Fu(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function Ou(n,e,t){return n!==e?(t-n)/(e-n):0}function ur(n,e,t){return(1-t)*n+t*e}function Bu(n,e,t,i){return ur(n,e,1-Math.exp(-t*i))}function zu(n,e=1){return e-Math.abs(xo(n,e*2)-e)}function ku(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Hu(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Gu(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Wu(n,e){return n+Math.random()*(e-n)}function Vu(n){return n*(.5-Math.random())}function Xu(n){n!==void 0&&(xa=n);let e=xa+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function $u(n){return n*lr}function ju(n){return n*pr}function ao(n){return(n&n-1)===0&&n!==0}function qu(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function is(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Yu(n,e,t,i,r){const s=Math.cos,a=Math.sin,o=s(t/2),c=a(t/2),l=s((e+i)/2),u=a((e+i)/2),f=s((e-i)/2),d=a((e-i)/2),m=s((i-e)/2),_=a((i-e)/2);switch(r){case"XYX":n.set(o*u,c*f,c*d,o*l);break;case"YZY":n.set(c*d,o*u,c*f,o*l);break;case"ZXZ":n.set(c*f,c*d,o*u,o*l);break;case"XZX":n.set(o*u,c*_,c*m,o*l);break;case"YXY":n.set(c*m,o*u,c*_,o*l);break;case"ZYZ":n.set(c*_,c*m,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function mn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function dt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Zn={DEG2RAD:lr,RAD2DEG:pr,generateUUID:Tn,clamp:kt,euclideanModulo:xo,mapLinear:Fu,inverseLerp:Ou,lerp:ur,damp:Bu,pingpong:zu,smoothstep:ku,smootherstep:Hu,randInt:Gu,randFloat:Wu,randFloatSpread:Vu,seededRandom:Xu,degToRad:$u,radToDeg:ju,isPowerOfTwo:ao,ceilPowerOfTwo:qu,floorPowerOfTwo:is,setQuaternionFromProperEuler:Yu,normalize:dt,denormalize:mn};class We{constructor(e=0,t=0){We.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(kt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class at{constructor(e,t,i,r,s,a,o,c,l){at.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l)}set(e,t,i,r,s,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=c,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],u=i[4],f=i[7],d=i[2],m=i[5],_=i[8],g=r[0],p=r[3],h=r[6],S=r[1],x=r[4],w=r[7],D=r[2],R=r[5],A=r[8];return s[0]=a*g+o*S+c*D,s[3]=a*p+o*x+c*R,s[6]=a*h+o*w+c*A,s[1]=l*g+u*S+f*D,s[4]=l*p+u*x+f*R,s[7]=l*h+u*w+f*A,s[2]=d*g+m*S+_*D,s[5]=d*p+m*x+_*R,s[8]=d*h+m*w+_*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-i*s*u+i*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],f=u*a-o*l,d=o*c-u*s,m=l*s-a*c,_=t*f+i*d+r*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=f*g,e[1]=(r*l-u*i)*g,e[2]=(o*i-r*a)*g,e[3]=d*g,e[4]=(u*t-r*c)*g,e[5]=(r*s-o*t)*g,e[6]=m*g,e[7]=(i*c-l*t)*g,e[8]=(a*t-i*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ws.makeScale(e,t)),this}rotate(e){return this.premultiply(ws.makeRotation(-e)),this}translate(e,t){return this.premultiply(ws.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ws=new at;function Kc(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function rs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Ku(){const n=rs("canvas");return n.style.display="block",n}const ya={};function hr(n){n in ya||(ya[n]=!0,console.warn(n))}const Ma=new at().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Sa=new at().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),xr={[An]:{transfer:Qr,primaries:es,toReference:n=>n,fromReference:n=>n},[It]:{transfer:mt,primaries:es,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[ls]:{transfer:Qr,primaries:ts,toReference:n=>n.applyMatrix3(Sa),fromReference:n=>n.applyMatrix3(Ma)},[vo]:{transfer:mt,primaries:ts,toReference:n=>n.convertSRGBToLinear().applyMatrix3(Sa),fromReference:n=>n.applyMatrix3(Ma).convertLinearToSRGB()}},Zu=new Set([An,ls]),ft={enabled:!0,_workingColorSpace:An,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Zu.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=xr[e].toReference,r=xr[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return xr[n].primaries},getTransfer:function(n){return n===on?Qr:xr[n].transfer}};function Bi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ts(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let mi;class Zc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{mi===void 0&&(mi=rs("canvas")),mi.width=e.width,mi.height=e.height;const i=mi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=mi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=rs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Bi(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Bi(t[i]/255)*255):t[i]=Bi(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ju=0;class Jc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ju++}),this.uuid=Tn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(As(r[a].image)):s.push(As(r[a]))}else s=As(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function As(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Zc.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Qu=0;class $t extends li{constructor(e=$t.DEFAULT_IMAGE,t=$t.DEFAULT_MAPPING,i=hn,r=hn,s=tn,a=dr,o=dn,c=kn,l=$t.DEFAULT_ANISOTROPY,u=on){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qu++}),this.uuid=Tn(),this.name="",this.source=new Jc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new at,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(hr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===ri?It:on),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==zc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case io:e.x=e.x-Math.floor(e.x);break;case hn:e.x=e.x<0?0:1;break;case ro:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case io:e.y=e.y-Math.floor(e.y);break;case hn:e.y=e.y<0?0:1;break;case ro:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return hr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===It?ri:jc}set encoding(e){hr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===ri?It:on}}$t.DEFAULT_IMAGE=null;$t.DEFAULT_MAPPING=zc;$t.DEFAULT_ANISOTROPY=1;class Nt{constructor(e=0,t=0,i=0,r=1){Nt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,l=c[0],u=c[4],f=c[8],d=c[1],m=c[5],_=c[9],g=c[2],p=c[6],h=c[10];if(Math.abs(u-d)<.01&&Math.abs(f-g)<.01&&Math.abs(_-p)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+g)<.1&&Math.abs(_+p)<.1&&Math.abs(l+m+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(l+1)/2,w=(m+1)/2,D=(h+1)/2,R=(u+d)/4,A=(f+g)/4,K=(_+p)/4;return x>w&&x>D?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=R/i,s=A/i):w>D?w<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(w),i=R/r,s=K/r):D<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(D),i=A/s,r=K/s),this.set(i,r,s,t),this}let S=Math.sqrt((p-_)*(p-_)+(f-g)*(f-g)+(d-u)*(d-u));return Math.abs(S)<.001&&(S=1),this.x=(p-_)/S,this.y=(f-g)/S,this.z=(d-u)/S,this.w=Math.acos((l+m+h-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class eh extends li{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Nt(0,0,e,t),this.scissorTest=!1,this.viewport=new Nt(0,0,e,t);const r={width:e,height:t,depth:1};i.encoding!==void 0&&(hr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===ri?It:on),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:tn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new $t(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Jc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class oi extends eh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Qc extends $t{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class th extends $t{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ai{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let c=i[r+0],l=i[r+1],u=i[r+2],f=i[r+3];const d=s[a+0],m=s[a+1],_=s[a+2],g=s[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f;return}if(o===1){e[t+0]=d,e[t+1]=m,e[t+2]=_,e[t+3]=g;return}if(f!==g||c!==d||l!==m||u!==_){let p=1-o;const h=c*d+l*m+u*_+f*g,S=h>=0?1:-1,x=1-h*h;if(x>Number.EPSILON){const D=Math.sqrt(x),R=Math.atan2(D,h*S);p=Math.sin(p*R)/D,o=Math.sin(o*R)/D}const w=o*S;if(c=c*p+d*w,l=l*p+m*w,u=u*p+_*w,f=f*p+g*w,p===1-o){const D=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=D,l*=D,u*=D,f*=D}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],c=i[r+1],l=i[r+2],u=i[r+3],f=s[a],d=s[a+1],m=s[a+2],_=s[a+3];return e[t]=o*_+u*f+c*m-l*d,e[t+1]=c*_+u*d+l*f-o*m,e[t+2]=l*_+u*m+o*d-c*f,e[t+3]=u*_-o*f-c*d-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(r/2),f=o(s/2),d=c(i/2),m=c(r/2),_=c(s/2);switch(a){case"XYZ":this._x=d*u*f+l*m*_,this._y=l*m*f-d*u*_,this._z=l*u*_+d*m*f,this._w=l*u*f-d*m*_;break;case"YXZ":this._x=d*u*f+l*m*_,this._y=l*m*f-d*u*_,this._z=l*u*_-d*m*f,this._w=l*u*f+d*m*_;break;case"ZXY":this._x=d*u*f-l*m*_,this._y=l*m*f+d*u*_,this._z=l*u*_+d*m*f,this._w=l*u*f-d*m*_;break;case"ZYX":this._x=d*u*f-l*m*_,this._y=l*m*f+d*u*_,this._z=l*u*_-d*m*f,this._w=l*u*f+d*m*_;break;case"YZX":this._x=d*u*f+l*m*_,this._y=l*m*f+d*u*_,this._z=l*u*_-d*m*f,this._w=l*u*f-d*m*_;break;case"XZY":this._x=d*u*f-l*m*_,this._y=l*m*f-d*u*_,this._z=l*u*_+d*m*f,this._w=l*u*f+d*m*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],f=t[10],d=i+o+f;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(u-c)*m,this._y=(s-l)*m,this._z=(a-r)*m}else if(i>o&&i>f){const m=2*Math.sqrt(1+i-o-f);this._w=(u-c)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+l)/m}else if(o>f){const m=2*Math.sqrt(1+o-i-f);this._w=(s-l)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(c+u)/m}else{const m=2*Math.sqrt(1+f-i-o);this._w=(a-r)/m,this._x=(s+l)/m,this._y=(c+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(kt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+a*o+r*l-s*c,this._y=r*u+a*c+s*o-i*l,this._z=s*u+a*l+i*c-r*o,this._w=a*u-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*i+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),f=Math.sin((1-t)*u)/l,d=Math.sin(t*u)/l;return this._w=a*f+this._w*d,this._x=i*f+this._x*d,this._y=r*f+this._y*d,this._z=s*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(s),i*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,i=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ea.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ea.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*i),u=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+c*l+a*f-o*u,this.y=i+c*u+o*l-s*f,this.z=r+c*f+s*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Rs.copy(this).projectOnVector(e),this.sub(Rs)}reflect(e){return this.sub(Rs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(kt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Rs=new U,Ea=new ai;class $i{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(cn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(cn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=cn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,cn):cn.fromBufferAttribute(s,a),cn.applyMatrix4(e.matrixWorld),this.expandByPoint(cn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),yr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),yr.copy(i.boundingBox)),yr.applyMatrix4(e.matrixWorld),this.union(yr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,cn),cn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Zi),Mr.subVectors(this.max,Zi),gi.subVectors(e.a,Zi),_i.subVectors(e.b,Zi),vi.subVectors(e.c,Zi),Rn.subVectors(_i,gi),Cn.subVectors(vi,_i),jn.subVectors(gi,vi);let t=[0,-Rn.z,Rn.y,0,-Cn.z,Cn.y,0,-jn.z,jn.y,Rn.z,0,-Rn.x,Cn.z,0,-Cn.x,jn.z,0,-jn.x,-Rn.y,Rn.x,0,-Cn.y,Cn.x,0,-jn.y,jn.x,0];return!Cs(t,gi,_i,vi,Mr)||(t=[1,0,0,0,1,0,0,0,1],!Cs(t,gi,_i,vi,Mr))?!1:(Sr.crossVectors(Rn,Cn),t=[Sr.x,Sr.y,Sr.z],Cs(t,gi,_i,vi,Mr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,cn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(cn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const _n=[new U,new U,new U,new U,new U,new U,new U,new U],cn=new U,yr=new $i,gi=new U,_i=new U,vi=new U,Rn=new U,Cn=new U,jn=new U,Zi=new U,Mr=new U,Sr=new U,qn=new U;function Cs(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){qn.fromArray(n,s);const o=r.x*Math.abs(qn.x)+r.y*Math.abs(qn.y)+r.z*Math.abs(qn.z),c=e.dot(qn),l=t.dot(qn),u=i.dot(qn);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const nh=new $i,Ji=new U,Ls=new U;class gr{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):nh.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ji.subVectors(e,this.center);const t=Ji.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Ji,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ls.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ji.copy(e.center).add(Ls)),this.expandByPoint(Ji.copy(e.center).sub(Ls))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const vn=new U,Ps=new U,Er=new U,Ln=new U,Ds=new U,br=new U,Is=new U;class _r{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,vn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=vn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(vn.copy(this.origin).addScaledVector(this.direction,t),vn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Ps.copy(e).add(t).multiplyScalar(.5),Er.copy(t).sub(e).normalize(),Ln.copy(this.origin).sub(Ps);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Er),o=Ln.dot(this.direction),c=-Ln.dot(Er),l=Ln.lengthSq(),u=Math.abs(1-a*a);let f,d,m,_;if(u>0)if(f=a*c-o,d=a*o-c,_=s*u,f>=0)if(d>=-_)if(d<=_){const g=1/u;f*=g,d*=g,m=f*(f+a*d+2*o)+d*(a*f+d+2*c)+l}else d=s,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*c)+l;else d=-s,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*c)+l;else d<=-_?(f=Math.max(0,-(-a*s+o)),d=f>0?-s:Math.min(Math.max(-s,-c),s),m=-f*f+d*(d+2*c)+l):d<=_?(f=0,d=Math.min(Math.max(-s,-c),s),m=d*(d+2*c)+l):(f=Math.max(0,-(a*s+o)),d=f>0?s:Math.min(Math.max(-s,-c),s),m=-f*f+d*(d+2*c)+l);else d=a>0?-s:s,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Ps).addScaledVector(Er,d),m}intersectSphere(e,t){vn.subVectors(e.center,this.origin);const i=vn.dot(this.direction),r=vn.dot(vn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(i=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(i=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-d.z)*f,c=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,c=(e.min.z-d.z)*f),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,vn)!==null}intersectTriangle(e,t,i,r,s){Ds.subVectors(t,e),br.subVectors(i,e),Is.crossVectors(Ds,br);let a=this.direction.dot(Is),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ln.subVectors(this.origin,e);const c=o*this.direction.dot(br.crossVectors(Ln,br));if(c<0)return null;const l=o*this.direction.dot(Ds.cross(Ln));if(l<0||c+l>a)return null;const u=-o*Ln.dot(Is);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class xt{constructor(e,t,i,r,s,a,o,c,l,u,f,d,m,_,g,p){xt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l,u,f,d,m,_,g,p)}set(e,t,i,r,s,a,o,c,l,u,f,d,m,_,g,p){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=r,h[1]=s,h[5]=a,h[9]=o,h[13]=c,h[2]=l,h[6]=u,h[10]=f,h[14]=d,h[3]=m,h[7]=_,h[11]=g,h[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/xi.setFromMatrixColumn(e,0).length(),s=1/xi.setFromMatrixColumn(e,1).length(),a=1/xi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=a*u,m=a*f,_=o*u,g=o*f;t[0]=c*u,t[4]=-c*f,t[8]=l,t[1]=m+_*l,t[5]=d-g*l,t[9]=-o*c,t[2]=g-d*l,t[6]=_+m*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*u,m=c*f,_=l*u,g=l*f;t[0]=d+g*o,t[4]=_*o-m,t[8]=a*l,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=m*o-_,t[6]=g+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*u,m=c*f,_=l*u,g=l*f;t[0]=d-g*o,t[4]=-a*f,t[8]=_+m*o,t[1]=m+_*o,t[5]=a*u,t[9]=g-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*u,m=a*f,_=o*u,g=o*f;t[0]=c*u,t[4]=_*l-m,t[8]=d*l+g,t[1]=c*f,t[5]=g*l+d,t[9]=m*l-_,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,m=a*l,_=o*c,g=o*l;t[0]=c*u,t[4]=g-d*f,t[8]=_*f+m,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=m*f+_,t[10]=d-g*f}else if(e.order==="XZY"){const d=a*c,m=a*l,_=o*c,g=o*l;t[0]=c*u,t[4]=-f,t[8]=l*u,t[1]=d*f+g,t[5]=a*u,t[9]=m*f-_,t[2]=_*f-m,t[6]=o*u,t[10]=g*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ih,e,rh)}lookAt(e,t,i){const r=this.elements;return qt.subVectors(e,t),qt.lengthSq()===0&&(qt.z=1),qt.normalize(),Pn.crossVectors(i,qt),Pn.lengthSq()===0&&(Math.abs(i.z)===1?qt.x+=1e-4:qt.z+=1e-4,qt.normalize(),Pn.crossVectors(i,qt)),Pn.normalize(),wr.crossVectors(qt,Pn),r[0]=Pn.x,r[4]=wr.x,r[8]=qt.x,r[1]=Pn.y,r[5]=wr.y,r[9]=qt.y,r[2]=Pn.z,r[6]=wr.z,r[10]=qt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],u=i[1],f=i[5],d=i[9],m=i[13],_=i[2],g=i[6],p=i[10],h=i[14],S=i[3],x=i[7],w=i[11],D=i[15],R=r[0],A=r[4],K=r[8],y=r[12],b=r[1],F=r[5],I=r[9],X=r[13],C=r[2],k=r[6],z=r[10],J=r[14],Y=r[3],q=r[7],Q=r[11],fe=r[15];return s[0]=a*R+o*b+c*C+l*Y,s[4]=a*A+o*F+c*k+l*q,s[8]=a*K+o*I+c*z+l*Q,s[12]=a*y+o*X+c*J+l*fe,s[1]=u*R+f*b+d*C+m*Y,s[5]=u*A+f*F+d*k+m*q,s[9]=u*K+f*I+d*z+m*Q,s[13]=u*y+f*X+d*J+m*fe,s[2]=_*R+g*b+p*C+h*Y,s[6]=_*A+g*F+p*k+h*q,s[10]=_*K+g*I+p*z+h*Q,s[14]=_*y+g*X+p*J+h*fe,s[3]=S*R+x*b+w*C+D*Y,s[7]=S*A+x*F+w*k+D*q,s[11]=S*K+x*I+w*z+D*Q,s[15]=S*y+x*X+w*J+D*fe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],f=e[6],d=e[10],m=e[14],_=e[3],g=e[7],p=e[11],h=e[15];return _*(+s*c*f-r*l*f-s*o*d+i*l*d+r*o*m-i*c*m)+g*(+t*c*m-t*l*d+s*a*d-r*a*m+r*l*u-s*c*u)+p*(+t*l*f-t*o*m-s*a*f+i*a*m+s*o*u-i*l*u)+h*(-r*o*u-t*c*f+t*o*d+r*a*f-i*a*d+i*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],f=e[9],d=e[10],m=e[11],_=e[12],g=e[13],p=e[14],h=e[15],S=f*p*l-g*d*l+g*c*m-o*p*m-f*c*h+o*d*h,x=_*d*l-u*p*l-_*c*m+a*p*m+u*c*h-a*d*h,w=u*g*l-_*f*l+_*o*m-a*g*m-u*o*h+a*f*h,D=_*f*c-u*g*c-_*o*d+a*g*d+u*o*p-a*f*p,R=t*S+i*x+r*w+s*D;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/R;return e[0]=S*A,e[1]=(g*d*s-f*p*s-g*r*m+i*p*m+f*r*h-i*d*h)*A,e[2]=(o*p*s-g*c*s+g*r*l-i*p*l-o*r*h+i*c*h)*A,e[3]=(f*c*s-o*d*s-f*r*l+i*d*l+o*r*m-i*c*m)*A,e[4]=x*A,e[5]=(u*p*s-_*d*s+_*r*m-t*p*m-u*r*h+t*d*h)*A,e[6]=(_*c*s-a*p*s-_*r*l+t*p*l+a*r*h-t*c*h)*A,e[7]=(a*d*s-u*c*s+u*r*l-t*d*l-a*r*m+t*c*m)*A,e[8]=w*A,e[9]=(_*f*s-u*g*s-_*i*m+t*g*m+u*i*h-t*f*h)*A,e[10]=(a*g*s-_*o*s+_*i*l-t*g*l-a*i*h+t*o*h)*A,e[11]=(u*o*s-a*f*s-u*i*l+t*f*l+a*i*m-t*o*m)*A,e[12]=D*A,e[13]=(u*g*r-_*f*r+_*i*d-t*g*d-u*i*p+t*f*p)*A,e[14]=(_*o*r-a*g*r-_*i*c+t*g*c+a*i*p-t*o*p)*A,e[15]=(a*f*r-u*o*r+u*i*c-t*f*c-a*i*d+t*o*d)*A,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,c=e.z,l=s*a,u=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+i,u*c-r*a,0,l*c-r*o,u*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,u=a+a,f=o+o,d=s*l,m=s*u,_=s*f,g=a*u,p=a*f,h=o*f,S=c*l,x=c*u,w=c*f,D=i.x,R=i.y,A=i.z;return r[0]=(1-(g+h))*D,r[1]=(m+w)*D,r[2]=(_-x)*D,r[3]=0,r[4]=(m-w)*R,r[5]=(1-(d+h))*R,r[6]=(p+S)*R,r[7]=0,r[8]=(_+x)*A,r[9]=(p-S)*A,r[10]=(1-(d+g))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=xi.set(r[0],r[1],r[2]).length();const a=xi.set(r[4],r[5],r[6]).length(),o=xi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],ln.copy(this);const l=1/s,u=1/a,f=1/o;return ln.elements[0]*=l,ln.elements[1]*=l,ln.elements[2]*=l,ln.elements[4]*=u,ln.elements[5]*=u,ln.elements[6]*=u,ln.elements[8]*=f,ln.elements[9]*=f,ln.elements[10]*=f,t.setFromRotationMatrix(ln),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=bn){const c=this.elements,l=2*s/(t-e),u=2*s/(i-r),f=(t+e)/(t-e),d=(i+r)/(i-r);let m,_;if(o===bn)m=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===ns)m=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=bn){const c=this.elements,l=1/(t-e),u=1/(i-r),f=1/(a-s),d=(t+e)*l,m=(i+r)*u;let _,g;if(o===bn)_=(a+s)*f,g=-2*f;else if(o===ns)_=s*f,g=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=g,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const xi=new U,ln=new xt,ih=new U(0,0,0),rh=new U(1,1,1),Pn=new U,wr=new U,qt=new U,ba=new xt,wa=new ai;class us{constructor(e=0,t=0,i=0,r=us.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],f=r[2],d=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-kt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(kt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-kt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(kt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ba.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ba,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return wa.setFromEuler(this),this.setFromQuaternion(wa,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}us.DEFAULT_ORDER="XYZ";class yo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let sh=0;const Ta=new U,yi=new ai,xn=new xt,Tr=new U,Qi=new U,oh=new U,ah=new ai,Aa=new U(1,0,0),Ra=new U(0,1,0),Ca=new U(0,0,1),ch={type:"added"},lh={type:"removed"};class Tt extends li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sh++}),this.uuid=Tn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Tt.DEFAULT_UP.clone();const e=new U,t=new us,i=new ai,r=new U(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new xt},normalMatrix:{value:new at}}),this.matrix=new xt,this.matrixWorld=new xt,this.matrixAutoUpdate=Tt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return yi.setFromAxisAngle(e,t),this.quaternion.multiply(yi),this}rotateOnWorldAxis(e,t){return yi.setFromAxisAngle(e,t),this.quaternion.premultiply(yi),this}rotateX(e){return this.rotateOnAxis(Aa,e)}rotateY(e){return this.rotateOnAxis(Ra,e)}rotateZ(e){return this.rotateOnAxis(Ca,e)}translateOnAxis(e,t){return Ta.copy(e).applyQuaternion(this.quaternion),this.position.add(Ta.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Aa,e)}translateY(e){return this.translateOnAxis(Ra,e)}translateZ(e){return this.translateOnAxis(Ca,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Tr.copy(e):Tr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Qi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(Qi,Tr,this.up):xn.lookAt(Tr,Qi,this.up),this.quaternion.setFromRotationMatrix(xn),r&&(xn.extractRotation(r.matrixWorld),yi.setFromRotationMatrix(xn),this.quaternion.premultiply(yi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(ch)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(lh)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xn.multiply(e.parent.matrixWorld)),e.applyMatrix4(xn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qi,e,oh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qi,ah,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];s(e.shapes,f)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),f=a(e.shapes),d=a(e.skeletons),m=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),m.length>0&&(i.animations=m),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Tt.DEFAULT_UP=new U(0,1,0);Tt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const un=new U,yn=new U,Us=new U,Mn=new U,Mi=new U,Si=new U,La=new U,Ns=new U,Fs=new U,Os=new U;let Ar=!1;class nn{constructor(e=new U,t=new U,i=new U){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),un.subVectors(e,t),r.cross(un);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){un.subVectors(r,t),yn.subVectors(i,t),Us.subVectors(e,t);const a=un.dot(un),o=un.dot(yn),c=un.dot(Us),l=yn.dot(yn),u=yn.dot(Us),f=a*l-o*o;if(f===0)return s.set(0,0,0),null;const d=1/f,m=(l*c-o*u)*d,_=(a*u-o*c)*d;return s.set(1-m-_,_,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Mn)===null?!1:Mn.x>=0&&Mn.y>=0&&Mn.x+Mn.y<=1}static getUV(e,t,i,r,s,a,o,c){return Ar===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ar=!0),this.getInterpolation(e,t,i,r,s,a,o,c)}static getInterpolation(e,t,i,r,s,a,o,c){return this.getBarycoord(e,t,i,r,Mn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Mn.x),c.addScaledVector(a,Mn.y),c.addScaledVector(o,Mn.z),c)}static isFrontFacing(e,t,i,r){return un.subVectors(i,t),yn.subVectors(e,t),un.cross(yn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return un.subVectors(this.c,this.b),yn.subVectors(this.a,this.b),un.cross(yn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return nn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return nn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,s){return Ar===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ar=!0),nn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}getInterpolation(e,t,i,r,s){return nn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return nn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return nn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;Mi.subVectors(r,i),Si.subVectors(s,i),Ns.subVectors(e,i);const c=Mi.dot(Ns),l=Si.dot(Ns);if(c<=0&&l<=0)return t.copy(i);Fs.subVectors(e,r);const u=Mi.dot(Fs),f=Si.dot(Fs);if(u>=0&&f<=u)return t.copy(r);const d=c*f-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(i).addScaledVector(Mi,a);Os.subVectors(e,s);const m=Mi.dot(Os),_=Si.dot(Os);if(_>=0&&m<=_)return t.copy(s);const g=m*l-c*_;if(g<=0&&l>=0&&_<=0)return o=l/(l-_),t.copy(i).addScaledVector(Si,o);const p=u*_-m*f;if(p<=0&&f-u>=0&&m-_>=0)return La.subVectors(s,r),o=(f-u)/(f-u+(m-_)),t.copy(r).addScaledVector(La,o);const h=1/(p+g+d);return a=g*h,o=d*h,t.copy(i).addScaledVector(Mi,a).addScaledVector(Si,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const el={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Dn={h:0,s:0,l:0},Rr={h:0,s:0,l:0};function Bs(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class rt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=It){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ft.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=ft.workingColorSpace){return this.r=e,this.g=t,this.b=i,ft.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=ft.workingColorSpace){if(e=xo(e,1),t=kt(t,0,1),i=kt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Bs(a,s,e+1/3),this.g=Bs(a,s,e),this.b=Bs(a,s,e-1/3)}return ft.toWorkingColorSpace(this,r),this}setStyle(e,t=It){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=It){const i=el[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Bi(e.r),this.g=Bi(e.g),this.b=Bi(e.b),this}copyLinearToSRGB(e){return this.r=Ts(e.r),this.g=Ts(e.g),this.b=Ts(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=It){return ft.fromWorkingColorSpace(zt.copy(this),e),Math.round(kt(zt.r*255,0,255))*65536+Math.round(kt(zt.g*255,0,255))*256+Math.round(kt(zt.b*255,0,255))}getHexString(e=It){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ft.workingColorSpace){ft.fromWorkingColorSpace(zt.copy(this),t);const i=zt.r,r=zt.g,s=zt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const f=a-o;switch(l=u<=.5?f/(a+o):f/(2-a-o),a){case i:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-i)/f+2;break;case s:c=(i-r)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=ft.workingColorSpace){return ft.fromWorkingColorSpace(zt.copy(this),t),e.r=zt.r,e.g=zt.g,e.b=zt.b,e}getStyle(e=It){ft.fromWorkingColorSpace(zt.copy(this),e);const t=zt.r,i=zt.g,r=zt.b;return e!==It?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Dn),this.setHSL(Dn.h+e,Dn.s+t,Dn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Dn),e.getHSL(Rr);const i=ur(Dn.h,Rr.h,t),r=ur(Dn.s,Rr.s,t),s=ur(Dn.l,Rr.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const zt=new rt;rt.NAMES=el;let uh=0;class Wn extends li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:uh++}),this.uuid=Tn(),this.name="",this.type="Material",this.blending=Oi,this.side=Hn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Qs,this.blendDst=eo,this.blendEquation=ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new rt(0,0,0),this.blendAlpha=0,this.depthFunc=Jr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_a,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pi,this.stencilZFail=pi,this.stencilZPass=pi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Oi&&(i.blending=this.blending),this.side!==Hn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Qs&&(i.blendSrc=this.blendSrc),this.blendDst!==eo&&(i.blendDst=this.blendDst),this.blendEquation!==ei&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Jr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_a&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==pi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==pi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==pi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Mo extends Wn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Oc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const bt=new U,Cr=new We;class fn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=so,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Fn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Cr.fromBufferAttribute(this,t),Cr.applyMatrix3(e),this.setXY(t,Cr.x,Cr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix3(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix4(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.applyNormalMatrix(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.transformDirection(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=mn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=dt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=mn(t,this.array)),t}setX(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=mn(t,this.array)),t}setY(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=mn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=mn(t,this.array)),t}setW(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),i=dt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),i=dt(i,this.array),r=dt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),i=dt(i,this.array),r=dt(r,this.array),s=dt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==so&&(e.usage=this.usage),e}}class tl extends fn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class nl extends fn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class an extends fn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let hh=0;const en=new xt,zs=new Tt,Ei=new U,Yt=new $i,er=new $i,Dt=new U;class Jt extends li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hh++}),this.uuid=Tn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Kc(e)?nl:tl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new at().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return en.makeRotationFromQuaternion(e),this.applyMatrix4(en),this}rotateX(e){return en.makeRotationX(e),this.applyMatrix4(en),this}rotateY(e){return en.makeRotationY(e),this.applyMatrix4(en),this}rotateZ(e){return en.makeRotationZ(e),this.applyMatrix4(en),this}translate(e,t,i){return en.makeTranslation(e,t,i),this.applyMatrix4(en),this}scale(e,t,i){return en.makeScale(e,t,i),this.applyMatrix4(en),this}lookAt(e){return zs.lookAt(e),zs.updateMatrix(),this.applyMatrix4(zs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ei).negate(),this.translate(Ei.x,Ei.y,Ei.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new an(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $i);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Yt.setFromBufferAttribute(s),this.morphTargetsRelative?(Dt.addVectors(this.boundingBox.min,Yt.min),this.boundingBox.expandByPoint(Dt),Dt.addVectors(this.boundingBox.max,Yt.max),this.boundingBox.expandByPoint(Dt)):(this.boundingBox.expandByPoint(Yt.min),this.boundingBox.expandByPoint(Yt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new U,1/0);return}if(e){const i=this.boundingSphere.center;if(Yt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];er.setFromBufferAttribute(o),this.morphTargetsRelative?(Dt.addVectors(Yt.min,er.min),Yt.expandByPoint(Dt),Dt.addVectors(Yt.max,er.max),Yt.expandByPoint(Dt)):(Yt.expandByPoint(er.min),Yt.expandByPoint(er.max))}Yt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Dt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Dt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Dt.fromBufferAttribute(o,l),c&&(Ei.fromBufferAttribute(e,l),Dt.add(Ei)),r=Math.max(r,i.distanceToSquared(Dt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,s=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new fn(new Float32Array(4*o),4));const c=this.getAttribute("tangent").array,l=[],u=[];for(let b=0;b<o;b++)l[b]=new U,u[b]=new U;const f=new U,d=new U,m=new U,_=new We,g=new We,p=new We,h=new U,S=new U;function x(b,F,I){f.fromArray(r,b*3),d.fromArray(r,F*3),m.fromArray(r,I*3),_.fromArray(a,b*2),g.fromArray(a,F*2),p.fromArray(a,I*2),d.sub(f),m.sub(f),g.sub(_),p.sub(_);const X=1/(g.x*p.y-p.x*g.y);isFinite(X)&&(h.copy(d).multiplyScalar(p.y).addScaledVector(m,-g.y).multiplyScalar(X),S.copy(m).multiplyScalar(g.x).addScaledVector(d,-p.x).multiplyScalar(X),l[b].add(h),l[F].add(h),l[I].add(h),u[b].add(S),u[F].add(S),u[I].add(S))}let w=this.groups;w.length===0&&(w=[{start:0,count:i.length}]);for(let b=0,F=w.length;b<F;++b){const I=w[b],X=I.start,C=I.count;for(let k=X,z=X+C;k<z;k+=3)x(i[k+0],i[k+1],i[k+2])}const D=new U,R=new U,A=new U,K=new U;function y(b){A.fromArray(s,b*3),K.copy(A);const F=l[b];D.copy(F),D.sub(A.multiplyScalar(A.dot(F))).normalize(),R.crossVectors(K,F);const X=R.dot(u[b])<0?-1:1;c[b*4]=D.x,c[b*4+1]=D.y,c[b*4+2]=D.z,c[b*4+3]=X}for(let b=0,F=w.length;b<F;++b){const I=w[b],X=I.start,C=I.count;for(let k=X,z=X+C;k<z;k+=3)y(i[k+0]),y(i[k+1]),y(i[k+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new fn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,m=i.count;d<m;d++)i.setXYZ(d,0,0,0);const r=new U,s=new U,a=new U,o=new U,c=new U,l=new U,u=new U,f=new U;if(e)for(let d=0,m=e.count;d<m;d+=3){const _=e.getX(d+0),g=e.getX(d+1),p=e.getX(d+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,p),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(i,_),c.fromBufferAttribute(i,g),l.fromBufferAttribute(i,p),o.add(u),c.add(u),l.add(u),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(g,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let d=0,m=t.count;d<m;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Dt.fromBufferAttribute(e,t),Dt.normalize(),e.setXYZ(t,Dt.x,Dt.y,Dt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,f=o.normalized,d=new l.constructor(c.length*u);let m=0,_=0;for(let g=0,p=c.length;g<p;g++){o.isInterleavedBufferAttribute?m=c[g]*o.data.stride+o.offset:m=c[g]*u;for(let h=0;h<u;h++)d[_++]=l[m++]}return new fn(d,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Jt,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,i);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let u=0,f=l.length;u<f;u++){const d=l[u],m=e(d,i);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,d=l.length;f<d;f++){const m=l[f];u.push(m.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],f=s[l];for(let d=0,m=f.length;d<m;d++)u.push(f[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Pa=new xt,Yn=new _r,Lr=new gr,Da=new U,bi=new U,wi=new U,Ti=new U,ks=new U,Pr=new U,Dr=new We,Ir=new We,Ur=new We,Ia=new U,Ua=new U,Na=new U,Nr=new U,Fr=new U;class Xt extends Tt{constructor(e=new Jt,t=new Mo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Pr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=o[c],f=s[c];u!==0&&(ks.fromBufferAttribute(f,e),a?Pr.addScaledVector(ks,u):Pr.addScaledVector(ks.sub(t),u))}t.add(Pr)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Lr.copy(i.boundingSphere),Lr.applyMatrix4(s),Yn.copy(e.ray).recast(e.near),!(Lr.containsPoint(Yn.origin)===!1&&(Yn.intersectSphere(Lr,Da)===null||Yn.origin.distanceToSquared(Da)>(e.far-e.near)**2))&&(Pa.copy(s).invert(),Yn.copy(e.ray).applyMatrix4(Pa),!(i.boundingBox!==null&&Yn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Yn)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,d=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,g=d.length;_<g;_++){const p=d[_],h=a[p.materialIndex],S=Math.max(p.start,m.start),x=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let w=S,D=x;w<D;w+=3){const R=o.getX(w),A=o.getX(w+1),K=o.getX(w+2);r=Or(this,h,e,i,l,u,f,R,A,K),r&&(r.faceIndex=Math.floor(w/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const _=Math.max(0,m.start),g=Math.min(o.count,m.start+m.count);for(let p=_,h=g;p<h;p+=3){const S=o.getX(p),x=o.getX(p+1),w=o.getX(p+2);r=Or(this,a,e,i,l,u,f,S,x,w),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,g=d.length;_<g;_++){const p=d[_],h=a[p.materialIndex],S=Math.max(p.start,m.start),x=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let w=S,D=x;w<D;w+=3){const R=w,A=w+1,K=w+2;r=Or(this,h,e,i,l,u,f,R,A,K),r&&(r.faceIndex=Math.floor(w/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const _=Math.max(0,m.start),g=Math.min(c.count,m.start+m.count);for(let p=_,h=g;p<h;p+=3){const S=p,x=p+1,w=p+2;r=Or(this,a,e,i,l,u,f,S,x,w),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function dh(n,e,t,i,r,s,a,o){let c;if(e.side===Vt?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===Hn,o),c===null)return null;Fr.copy(o),Fr.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Fr);return l<t.near||l>t.far?null:{distance:l,point:Fr.clone(),object:n}}function Or(n,e,t,i,r,s,a,o,c,l){n.getVertexPosition(o,bi),n.getVertexPosition(c,wi),n.getVertexPosition(l,Ti);const u=dh(n,e,t,i,bi,wi,Ti,Nr);if(u){r&&(Dr.fromBufferAttribute(r,o),Ir.fromBufferAttribute(r,c),Ur.fromBufferAttribute(r,l),u.uv=nn.getInterpolation(Nr,bi,wi,Ti,Dr,Ir,Ur,new We)),s&&(Dr.fromBufferAttribute(s,o),Ir.fromBufferAttribute(s,c),Ur.fromBufferAttribute(s,l),u.uv1=nn.getInterpolation(Nr,bi,wi,Ti,Dr,Ir,Ur,new We),u.uv2=u.uv1),a&&(Ia.fromBufferAttribute(a,o),Ua.fromBufferAttribute(a,c),Na.fromBufferAttribute(a,l),u.normal=nn.getInterpolation(Nr,bi,wi,Ti,Ia,Ua,Na,new U),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:c,c:l,normal:new U,materialIndex:0};nn.getNormal(bi,wi,Ti,f.normal),u.face=f}return u}class vr extends Jt{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],u=[],f=[];let d=0,m=0;_("z","y","x",-1,-1,i,t,e,a,s,0),_("z","y","x",1,-1,i,t,-e,a,s,1),_("x","z","y",1,1,e,i,t,r,a,2),_("x","z","y",1,-1,e,i,-t,r,a,3),_("x","y","z",1,-1,e,t,i,r,s,4),_("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new an(l,3)),this.setAttribute("normal",new an(u,3)),this.setAttribute("uv",new an(f,2));function _(g,p,h,S,x,w,D,R,A,K,y){const b=w/A,F=D/K,I=w/2,X=D/2,C=R/2,k=A+1,z=K+1;let J=0,Y=0;const q=new U;for(let Q=0;Q<z;Q++){const fe=Q*F-X;for(let pe=0;pe<k;pe++){const H=pe*b-I;q[g]=H*S,q[p]=fe*x,q[h]=C,l.push(q.x,q.y,q.z),q[g]=0,q[p]=0,q[h]=R>0?1:-1,u.push(q.x,q.y,q.z),f.push(pe/A),f.push(1-Q/K),J+=1}}for(let Q=0;Q<K;Q++)for(let fe=0;fe<A;fe++){const pe=d+fe+k*Q,H=d+fe+k*(Q+1),ee=d+(fe+1)+k*(Q+1),xe=d+(fe+1)+k*Q;c.push(pe,H,xe),c.push(H,ee,xe),Y+=6}o.addGroup(m,Y,y),m+=Y,d+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Vi(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Gt(n){const e={};for(let t=0;t<n.length;t++){const i=Vi(n[t]);for(const r in i)e[r]=i[r]}return e}function fh(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function il(n){return n.getRenderTarget()===null?n.outputColorSpace:ft.workingColorSpace}const ph={clone:Vi,merge:Gt};var mh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ci extends Wn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mh,this.fragmentShader=gh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vi(e.uniforms),this.uniformsGroups=fh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class rl extends Tt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xt,this.projectionMatrix=new xt,this.projectionMatrixInverse=new xt,this.coordinateSystem=bn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class rn extends rl{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=pr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(lr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return pr*2*Math.atan(Math.tan(lr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(lr*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ai=-90,Ri=1;class _h extends Tt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new rn(Ai,Ri,e,t);r.layers=this.layers,this.add(r);const s=new rn(Ai,Ri,e,t);s.layers=this.layers,this.add(s);const a=new rn(Ai,Ri,e,t);a.layers=this.layers,this.add(a);const o=new rn(Ai,Ri,e,t);o.layers=this.layers,this.add(o);const c=new rn(Ai,Ri,e,t);c.layers=this.layers,this.add(c);const l=new rn(Ai,Ri,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===bn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ns)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,l),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(f,d,m),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class sl extends $t{constructor(e,t,i,r,s,a,o,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:Hi,super(e,t,i,r,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class vh extends oi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&(hr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===ri?It:on),this.texture=new sl(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:tn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new vr(5,5,5),s=new ci({name:"CubemapFromEquirect",uniforms:Vi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Vt,blending:Bn});s.uniforms.tEquirect.value=t;const a=new Xt(r,s),o=t.minFilter;return t.minFilter===dr&&(t.minFilter=tn),new _h(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}const Hs=new U,xh=new U,yh=new at;class In{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Hs.subVectors(i,t).cross(xh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Hs),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||yh.getNormalMatrix(e),r=this.coplanarPoint(Hs).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Kn=new gr,Br=new U;class So{constructor(e=new In,t=new In,i=new In,r=new In,s=new In,a=new In){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=bn){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],c=r[3],l=r[4],u=r[5],f=r[6],d=r[7],m=r[8],_=r[9],g=r[10],p=r[11],h=r[12],S=r[13],x=r[14],w=r[15];if(i[0].setComponents(c-s,d-l,p-m,w-h).normalize(),i[1].setComponents(c+s,d+l,p+m,w+h).normalize(),i[2].setComponents(c+a,d+u,p+_,w+S).normalize(),i[3].setComponents(c-a,d-u,p-_,w-S).normalize(),i[4].setComponents(c-o,d-f,p-g,w-x).normalize(),t===bn)i[5].setComponents(c+o,d+f,p+g,w+x).normalize();else if(t===ns)i[5].setComponents(o,f,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Kn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Kn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Kn)}intersectsSprite(e){return Kn.center.set(0,0,0),Kn.radius=.7071067811865476,Kn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Kn)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Br.x=r.normal.x>0?e.max.x:e.min.x,Br.y=r.normal.y>0?e.max.y:e.min.y,Br.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Br)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ol(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Mh(n,e){const t=e.isWebGL2,i=new WeakMap;function r(l,u){const f=l.array,d=l.usage,m=f.byteLength,_=n.createBuffer();n.bindBuffer(u,_),n.bufferData(u,f,d),l.onUploadCallback();let g;if(f instanceof Float32Array)g=n.FLOAT;else if(f instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)g=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=n.UNSIGNED_SHORT;else if(f instanceof Int16Array)g=n.SHORT;else if(f instanceof Uint32Array)g=n.UNSIGNED_INT;else if(f instanceof Int32Array)g=n.INT;else if(f instanceof Int8Array)g=n.BYTE;else if(f instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:_,type:g,bytesPerElement:f.BYTES_PER_ELEMENT,version:l.version,size:m}}function s(l,u,f){const d=u.array,m=u._updateRange,_=u.updateRanges;if(n.bindBuffer(f,l),m.count===-1&&_.length===0&&n.bufferSubData(f,0,d),_.length!==0){for(let g=0,p=_.length;g<p;g++){const h=_[g];t?n.bufferSubData(f,h.start*d.BYTES_PER_ELEMENT,d,h.start,h.count):n.bufferSubData(f,h.start*d.BYTES_PER_ELEMENT,d.subarray(h.start,h.start+h.count))}u.clearUpdateRanges()}m.count!==-1&&(t?n.bufferSubData(f,m.offset*d.BYTES_PER_ELEMENT,d,m.offset,m.count):n.bufferSubData(f,m.offset*d.BYTES_PER_ELEMENT,d.subarray(m.offset,m.offset+m.count)),m.count=-1),u.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),i.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);const u=i.get(l);u&&(n.deleteBuffer(u.buffer),i.delete(l))}function c(l,u){if(l.isGLBufferAttribute){const d=i.get(l);(!d||d.version<l.version)&&i.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const f=i.get(l);if(f===void 0)i.set(l,r(l,u));else if(f.version<l.version){if(f.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,l,u),f.version=l.version}}return{get:a,remove:o,update:c}}class Eo extends Jt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,u=c+1,f=e/o,d=t/c,m=[],_=[],g=[],p=[];for(let h=0;h<u;h++){const S=h*d-a;for(let x=0;x<l;x++){const w=x*f-s;_.push(w,-S,0),g.push(0,0,1),p.push(x/o),p.push(1-h/c)}}for(let h=0;h<c;h++)for(let S=0;S<o;S++){const x=S+l*h,w=S+l*(h+1),D=S+1+l*(h+1),R=S+1+l*h;m.push(x,w,R),m.push(w,D,R)}this.setIndex(m),this.setAttribute("position",new an(_,3)),this.setAttribute("normal",new an(g,3)),this.setAttribute("uv",new an(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Eo(e.width,e.height,e.widthSegments,e.heightSegments)}}var Sh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Eh=`#ifdef USE_ALPHAHASH
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
#endif`,bh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,wh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Th=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Ah=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Rh=`#ifdef USE_AOMAP
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
#endif`,Ch=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Lh=`#ifdef USE_BATCHING
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
#endif`,Ph=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Dh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ih=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Uh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Nh=`#ifdef USE_IRIDESCENCE
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
#endif`,Fh=`#ifdef USE_BUMPMAP
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
#endif`,Oh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Bh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,zh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,kh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Hh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Gh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Wh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Vh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Xh=`#define PI 3.141592653589793
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
} // validated`,$h=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,jh=`vec3 transformedNormal = objectNormal;
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
#endif`,qh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Kh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Jh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qh=`
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
}`,ed=`#ifdef USE_ENVMAP
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
#endif`,td=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,nd=`#ifdef USE_ENVMAP
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
#endif`,id=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rd=`#ifdef USE_ENVMAP
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
#endif`,sd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,od=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ad=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ld=`#ifdef USE_GRADIENTMAP
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
}`,ud=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,hd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,dd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pd=`uniform bool receiveShadow;
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
#endif`,md=`#ifdef USE_ENVMAP
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
#endif`,gd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_d=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yd=`PhysicalMaterial material;
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
#endif`,Md=`struct PhysicalMaterial {
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
}`,Sd=`
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
#endif`,Ed=`#if defined( RE_IndirectDiffuse )
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
#endif`,bd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Td=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ad=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Rd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Cd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ld=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Pd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Dd=`#if defined( USE_POINTS_UV )
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
#endif`,Id=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ud=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Nd=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Fd=`#ifdef USE_MORPHNORMALS
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
#endif`,Od=`#ifdef USE_MORPHTARGETS
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
#endif`,Bd=`#ifdef USE_MORPHTARGETS
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
#endif`,zd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,kd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Hd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Vd=`#ifdef USE_NORMALMAP
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
#endif`,Xd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$d=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,qd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Zd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Jd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Qd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ef=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,tf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,nf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,rf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,of=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,af=`float getShadowMask() {
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
}`,cf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lf=`#ifdef USE_SKINNING
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
#endif`,uf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hf=`#ifdef USE_SKINNING
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
#endif`,df=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ff=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,gf=`#ifdef USE_TRANSMISSION
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
#endif`,_f=`#ifdef USE_TRANSMISSION
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
#endif`,vf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Sf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ef=`uniform sampler2D t2D;
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
}`,bf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Tf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Af=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rf=`#include <common>
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
}`,Cf=`#if DEPTH_PACKING == 3200
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
}`,Lf=`#define DISTANCE
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
}`,Pf=`#define DISTANCE
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
}`,Df=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,If=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Uf=`uniform float scale;
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
}`,Nf=`uniform vec3 diffuse;
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
}`,Ff=`#include <common>
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
}`,Of=`uniform vec3 diffuse;
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
}`,Bf=`#define LAMBERT
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
}`,zf=`#define LAMBERT
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
}`,kf=`#define MATCAP
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
}`,Hf=`#define MATCAP
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
}`,Gf=`#define NORMAL
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
}`,Wf=`#define NORMAL
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
}`,Vf=`#define PHONG
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
}`,Xf=`#define PHONG
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
}`,$f=`#define STANDARD
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
}`,jf=`#define STANDARD
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
}`,qf=`#define TOON
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
}`,Yf=`#define TOON
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
}`,Kf=`uniform float size;
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
}`,Zf=`uniform vec3 diffuse;
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
}`,Jf=`#include <common>
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
}`,Qf=`uniform vec3 color;
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
}`,ep=`uniform float rotation;
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
}`,tp=`uniform vec3 diffuse;
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
}`,nt={alphahash_fragment:Sh,alphahash_pars_fragment:Eh,alphamap_fragment:bh,alphamap_pars_fragment:wh,alphatest_fragment:Th,alphatest_pars_fragment:Ah,aomap_fragment:Rh,aomap_pars_fragment:Ch,batching_pars_vertex:Lh,batching_vertex:Ph,begin_vertex:Dh,beginnormal_vertex:Ih,bsdfs:Uh,iridescence_fragment:Nh,bumpmap_pars_fragment:Fh,clipping_planes_fragment:Oh,clipping_planes_pars_fragment:Bh,clipping_planes_pars_vertex:zh,clipping_planes_vertex:kh,color_fragment:Hh,color_pars_fragment:Gh,color_pars_vertex:Wh,color_vertex:Vh,common:Xh,cube_uv_reflection_fragment:$h,defaultnormal_vertex:jh,displacementmap_pars_vertex:qh,displacementmap_vertex:Yh,emissivemap_fragment:Kh,emissivemap_pars_fragment:Zh,colorspace_fragment:Jh,colorspace_pars_fragment:Qh,envmap_fragment:ed,envmap_common_pars_fragment:td,envmap_pars_fragment:nd,envmap_pars_vertex:id,envmap_physical_pars_fragment:md,envmap_vertex:rd,fog_vertex:sd,fog_pars_vertex:od,fog_fragment:ad,fog_pars_fragment:cd,gradientmap_pars_fragment:ld,lightmap_fragment:ud,lightmap_pars_fragment:hd,lights_lambert_fragment:dd,lights_lambert_pars_fragment:fd,lights_pars_begin:pd,lights_toon_fragment:gd,lights_toon_pars_fragment:_d,lights_phong_fragment:vd,lights_phong_pars_fragment:xd,lights_physical_fragment:yd,lights_physical_pars_fragment:Md,lights_fragment_begin:Sd,lights_fragment_maps:Ed,lights_fragment_end:bd,logdepthbuf_fragment:wd,logdepthbuf_pars_fragment:Td,logdepthbuf_pars_vertex:Ad,logdepthbuf_vertex:Rd,map_fragment:Cd,map_pars_fragment:Ld,map_particle_fragment:Pd,map_particle_pars_fragment:Dd,metalnessmap_fragment:Id,metalnessmap_pars_fragment:Ud,morphcolor_vertex:Nd,morphnormal_vertex:Fd,morphtarget_pars_vertex:Od,morphtarget_vertex:Bd,normal_fragment_begin:zd,normal_fragment_maps:kd,normal_pars_fragment:Hd,normal_pars_vertex:Gd,normal_vertex:Wd,normalmap_pars_fragment:Vd,clearcoat_normal_fragment_begin:Xd,clearcoat_normal_fragment_maps:$d,clearcoat_pars_fragment:jd,iridescence_pars_fragment:qd,opaque_fragment:Yd,packing:Kd,premultiplied_alpha_fragment:Zd,project_vertex:Jd,dithering_fragment:Qd,dithering_pars_fragment:ef,roughnessmap_fragment:tf,roughnessmap_pars_fragment:nf,shadowmap_pars_fragment:rf,shadowmap_pars_vertex:sf,shadowmap_vertex:of,shadowmask_pars_fragment:af,skinbase_vertex:cf,skinning_pars_vertex:lf,skinning_vertex:uf,skinnormal_vertex:hf,specularmap_fragment:df,specularmap_pars_fragment:ff,tonemapping_fragment:pf,tonemapping_pars_fragment:mf,transmission_fragment:gf,transmission_pars_fragment:_f,uv_pars_fragment:vf,uv_pars_vertex:xf,uv_vertex:yf,worldpos_vertex:Mf,background_vert:Sf,background_frag:Ef,backgroundCube_vert:bf,backgroundCube_frag:wf,cube_vert:Tf,cube_frag:Af,depth_vert:Rf,depth_frag:Cf,distanceRGBA_vert:Lf,distanceRGBA_frag:Pf,equirect_vert:Df,equirect_frag:If,linedashed_vert:Uf,linedashed_frag:Nf,meshbasic_vert:Ff,meshbasic_frag:Of,meshlambert_vert:Bf,meshlambert_frag:zf,meshmatcap_vert:kf,meshmatcap_frag:Hf,meshnormal_vert:Gf,meshnormal_frag:Wf,meshphong_vert:Vf,meshphong_frag:Xf,meshphysical_vert:$f,meshphysical_frag:jf,meshtoon_vert:qf,meshtoon_frag:Yf,points_vert:Kf,points_frag:Zf,shadow_vert:Jf,shadow_frag:Qf,sprite_vert:ep,sprite_frag:tp},_e={common:{diffuse:{value:new rt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new at},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new at}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new at}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new at}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new at},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new at},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new at},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new at}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new at}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new at}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new rt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new rt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0},uvTransform:{value:new at}},sprite:{diffuse:{value:new rt(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new at},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0}}},pn={basic:{uniforms:Gt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:nt.meshbasic_vert,fragmentShader:nt.meshbasic_frag},lambert:{uniforms:Gt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new rt(0)}}]),vertexShader:nt.meshlambert_vert,fragmentShader:nt.meshlambert_frag},phong:{uniforms:Gt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new rt(0)},specular:{value:new rt(1118481)},shininess:{value:30}}]),vertexShader:nt.meshphong_vert,fragmentShader:nt.meshphong_frag},standard:{uniforms:Gt([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new rt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag},toon:{uniforms:Gt([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new rt(0)}}]),vertexShader:nt.meshtoon_vert,fragmentShader:nt.meshtoon_frag},matcap:{uniforms:Gt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:nt.meshmatcap_vert,fragmentShader:nt.meshmatcap_frag},points:{uniforms:Gt([_e.points,_e.fog]),vertexShader:nt.points_vert,fragmentShader:nt.points_frag},dashed:{uniforms:Gt([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:nt.linedashed_vert,fragmentShader:nt.linedashed_frag},depth:{uniforms:Gt([_e.common,_e.displacementmap]),vertexShader:nt.depth_vert,fragmentShader:nt.depth_frag},normal:{uniforms:Gt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:nt.meshnormal_vert,fragmentShader:nt.meshnormal_frag},sprite:{uniforms:Gt([_e.sprite,_e.fog]),vertexShader:nt.sprite_vert,fragmentShader:nt.sprite_frag},background:{uniforms:{uvTransform:{value:new at},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:nt.background_vert,fragmentShader:nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:nt.backgroundCube_vert,fragmentShader:nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:nt.cube_vert,fragmentShader:nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:nt.equirect_vert,fragmentShader:nt.equirect_frag},distanceRGBA:{uniforms:Gt([_e.common,_e.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:nt.distanceRGBA_vert,fragmentShader:nt.distanceRGBA_frag},shadow:{uniforms:Gt([_e.lights,_e.fog,{color:{value:new rt(0)},opacity:{value:1}}]),vertexShader:nt.shadow_vert,fragmentShader:nt.shadow_frag}};pn.physical={uniforms:Gt([pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new at},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new at},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new at},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new at},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new at},sheen:{value:0},sheenColor:{value:new rt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new at},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new at},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new at},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new at},attenuationDistance:{value:0},attenuationColor:{value:new rt(0)},specularColor:{value:new rt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new at},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new at},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new at}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag};const zr={r:0,b:0,g:0};function np(n,e,t,i,r,s,a){const o=new rt(0);let c=s===!0?0:1,l,u,f=null,d=0,m=null;function _(p,h){let S=!1,x=h.isScene===!0?h.background:null;x&&x.isTexture&&(x=(h.backgroundBlurriness>0?t:e).get(x)),x===null?g(o,c):x&&x.isColor&&(g(x,1),S=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?i.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||S)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),x&&(x.isCubeTexture||x.mapping===cs)?(u===void 0&&(u=new Xt(new vr(1,1,1),new ci({name:"BackgroundCubeMaterial",uniforms:Vi(pn.backgroundCube.uniforms),vertexShader:pn.backgroundCube.vertexShader,fragmentShader:pn.backgroundCube.fragmentShader,side:Vt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(D,R,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=h.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=h.backgroundIntensity,u.material.toneMapped=ft.getTransfer(x.colorSpace)!==mt,(f!==x||d!==x.version||m!==n.toneMapping)&&(u.material.needsUpdate=!0,f=x,d=x.version,m=n.toneMapping),u.layers.enableAll(),p.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Xt(new Eo(2,2),new ci({name:"BackgroundMaterial",uniforms:Vi(pn.background.uniforms),vertexShader:pn.background.vertexShader,fragmentShader:pn.background.fragmentShader,side:Hn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=h.backgroundIntensity,l.material.toneMapped=ft.getTransfer(x.colorSpace)!==mt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(f!==x||d!==x.version||m!==n.toneMapping)&&(l.material.needsUpdate=!0,f=x,d=x.version,m=n.toneMapping),l.layers.enableAll(),p.unshift(l,l.geometry,l.material,0,0,null))}function g(p,h){p.getRGB(zr,il(n)),i.buffers.color.setClear(zr.r,zr.g,zr.b,h,a)}return{getClearColor:function(){return o},setClearColor:function(p,h=1){o.set(p),c=h,g(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(p){c=p,g(o,c)},render:_}}function ip(n,e,t,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||s!==null,o={},c=p(null);let l=c,u=!1;function f(C,k,z,J,Y){let q=!1;if(a){const Q=g(J,z,k);l!==Q&&(l=Q,m(l.object)),q=h(C,J,z,Y),q&&S(C,J,z,Y)}else{const Q=k.wireframe===!0;(l.geometry!==J.id||l.program!==z.id||l.wireframe!==Q)&&(l.geometry=J.id,l.program=z.id,l.wireframe=Q,q=!0)}Y!==null&&t.update(Y,n.ELEMENT_ARRAY_BUFFER),(q||u)&&(u=!1,K(C,k,z,J),Y!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function d(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function m(C){return i.isWebGL2?n.bindVertexArray(C):s.bindVertexArrayOES(C)}function _(C){return i.isWebGL2?n.deleteVertexArray(C):s.deleteVertexArrayOES(C)}function g(C,k,z){const J=z.wireframe===!0;let Y=o[C.id];Y===void 0&&(Y={},o[C.id]=Y);let q=Y[k.id];q===void 0&&(q={},Y[k.id]=q);let Q=q[J];return Q===void 0&&(Q=p(d()),q[J]=Q),Q}function p(C){const k=[],z=[],J=[];for(let Y=0;Y<r;Y++)k[Y]=0,z[Y]=0,J[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:z,attributeDivisors:J,object:C,attributes:{},index:null}}function h(C,k,z,J){const Y=l.attributes,q=k.attributes;let Q=0;const fe=z.getAttributes();for(const pe in fe)if(fe[pe].location>=0){const ee=Y[pe];let xe=q[pe];if(xe===void 0&&(pe==="instanceMatrix"&&C.instanceMatrix&&(xe=C.instanceMatrix),pe==="instanceColor"&&C.instanceColor&&(xe=C.instanceColor)),ee===void 0||ee.attribute!==xe||xe&&ee.data!==xe.data)return!0;Q++}return l.attributesNum!==Q||l.index!==J}function S(C,k,z,J){const Y={},q=k.attributes;let Q=0;const fe=z.getAttributes();for(const pe in fe)if(fe[pe].location>=0){let ee=q[pe];ee===void 0&&(pe==="instanceMatrix"&&C.instanceMatrix&&(ee=C.instanceMatrix),pe==="instanceColor"&&C.instanceColor&&(ee=C.instanceColor));const xe={};xe.attribute=ee,ee&&ee.data&&(xe.data=ee.data),Y[pe]=xe,Q++}l.attributes=Y,l.attributesNum=Q,l.index=J}function x(){const C=l.newAttributes;for(let k=0,z=C.length;k<z;k++)C[k]=0}function w(C){D(C,0)}function D(C,k){const z=l.newAttributes,J=l.enabledAttributes,Y=l.attributeDivisors;z[C]=1,J[C]===0&&(n.enableVertexAttribArray(C),J[C]=1),Y[C]!==k&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](C,k),Y[C]=k)}function R(){const C=l.newAttributes,k=l.enabledAttributes;for(let z=0,J=k.length;z<J;z++)k[z]!==C[z]&&(n.disableVertexAttribArray(z),k[z]=0)}function A(C,k,z,J,Y,q,Q){Q===!0?n.vertexAttribIPointer(C,k,z,Y,q):n.vertexAttribPointer(C,k,z,J,Y,q)}function K(C,k,z,J){if(i.isWebGL2===!1&&(C.isInstancedMesh||J.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const Y=J.attributes,q=z.getAttributes(),Q=k.defaultAttributeValues;for(const fe in q){const pe=q[fe];if(pe.location>=0){let H=Y[fe];if(H===void 0&&(fe==="instanceMatrix"&&C.instanceMatrix&&(H=C.instanceMatrix),fe==="instanceColor"&&C.instanceColor&&(H=C.instanceColor)),H!==void 0){const ee=H.normalized,xe=H.itemSize,Ce=t.get(H);if(Ce===void 0)continue;const Pe=Ce.buffer,ze=Ce.type,$e=Ce.bytesPerElement,ke=i.isWebGL2===!0&&(ze===n.INT||ze===n.UNSIGNED_INT||H.gpuType===kc);if(H.isInterleavedBufferAttribute){const st=H.data,$=st.stride,Et=H.offset;if(st.isInstancedInterleavedBuffer){for(let Ue=0;Ue<pe.locationSize;Ue++)D(pe.location+Ue,st.meshPerAttribute);C.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let Ue=0;Ue<pe.locationSize;Ue++)w(pe.location+Ue);n.bindBuffer(n.ARRAY_BUFFER,Pe);for(let Ue=0;Ue<pe.locationSize;Ue++)A(pe.location+Ue,xe/pe.locationSize,ze,ee,$*$e,(Et+xe/pe.locationSize*Ue)*$e,ke)}else{if(H.isInstancedBufferAttribute){for(let st=0;st<pe.locationSize;st++)D(pe.location+st,H.meshPerAttribute);C.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let st=0;st<pe.locationSize;st++)w(pe.location+st);n.bindBuffer(n.ARRAY_BUFFER,Pe);for(let st=0;st<pe.locationSize;st++)A(pe.location+st,xe/pe.locationSize,ze,ee,xe*$e,xe/pe.locationSize*st*$e,ke)}}else if(Q!==void 0){const ee=Q[fe];if(ee!==void 0)switch(ee.length){case 2:n.vertexAttrib2fv(pe.location,ee);break;case 3:n.vertexAttrib3fv(pe.location,ee);break;case 4:n.vertexAttrib4fv(pe.location,ee);break;default:n.vertexAttrib1fv(pe.location,ee)}}}}R()}function y(){I();for(const C in o){const k=o[C];for(const z in k){const J=k[z];for(const Y in J)_(J[Y].object),delete J[Y];delete k[z]}delete o[C]}}function b(C){if(o[C.id]===void 0)return;const k=o[C.id];for(const z in k){const J=k[z];for(const Y in J)_(J[Y].object),delete J[Y];delete k[z]}delete o[C.id]}function F(C){for(const k in o){const z=o[k];if(z[C.id]===void 0)continue;const J=z[C.id];for(const Y in J)_(J[Y].object),delete J[Y];delete z[C.id]}}function I(){X(),u=!0,l!==c&&(l=c,m(l.object))}function X(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:f,reset:I,resetDefaultState:X,dispose:y,releaseStatesOfGeometry:b,releaseStatesOfProgram:F,initAttributes:x,enableAttribute:w,disableUnusedAttributes:R}}function rp(n,e,t,i){const r=i.isWebGL2;let s;function a(u){s=u}function o(u,f){n.drawArrays(s,u,f),t.update(f,s,1)}function c(u,f,d){if(d===0)return;let m,_;if(r)m=n,_="drawArraysInstanced";else if(m=e.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[_](s,u,f,d),t.update(f,s,d)}function l(u,f,d){if(d===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<d;_++)this.render(u[_],f[_]);else{m.multiDrawArraysWEBGL(s,u,0,f,0,d);let _=0;for(let g=0;g<d;g++)_+=f[g];t.update(_,s,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function sp(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const c=s(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);const l=a||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),p=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),h=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),x=d>0,w=a||e.has("OES_texture_float"),D=x&&w,R=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:u,maxTextures:f,maxVertexTextures:d,maxTextureSize:m,maxCubemapSize:_,maxAttributes:g,maxVertexUniforms:p,maxVaryings:h,maxFragmentUniforms:S,vertexTextures:x,floatFragmentTextures:w,floatVertexTextures:D,maxSamples:R}}function op(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new In,o=new at,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const m=f.length!==0||d||i!==0||r;return r=d,i=f.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,m){const _=f.clippingPlanes,g=f.clipIntersection,p=f.clipShadows,h=n.get(f);if(!r||_===null||_.length===0||s&&!p)s?u(null):l();else{const S=s?0:i,x=S*4;let w=h.clippingState||null;c.value=w,w=u(_,d,x,m);for(let D=0;D!==x;++D)w[D]=t[D];h.clippingState=w,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,d,m,_){const g=f!==null?f.length:0;let p=null;if(g!==0){if(p=c.value,_!==!0||p===null){const h=m+g*4,S=d.matrixWorldInverse;o.getNormalMatrix(S),(p===null||p.length<h)&&(p=new Float32Array(h));for(let x=0,w=m;x!==g;++x,w+=4)a.copy(f[x]).applyMatrix4(S,o),a.normal.toArray(p,w),p[w+3]=a.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,p}}function ap(n){let e=new WeakMap;function t(a,o){return o===to?a.mapping=Hi:o===no&&(a.mapping=Gi),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===to||o===no)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new vh(c.height/2);return l.fromEquirectangularTexture(n,a),e.set(a,l),a.addEventListener("dispose",r),t(l.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class al extends rl{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ni=4,Fa=[.125,.215,.35,.446,.526,.582],ti=20,Gs=new al,Oa=new rt;let Ws=null,Vs=0,Xs=0;const Jn=(1+Math.sqrt(5))/2,Ci=1/Jn,Ba=[new U(1,1,1),new U(-1,1,1),new U(1,1,-1),new U(-1,1,-1),new U(0,Jn,Ci),new U(0,Jn,-Ci),new U(Ci,0,Jn),new U(-Ci,0,Jn),new U(Jn,Ci,0),new U(-Jn,Ci,0)];class za{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Ws=this._renderer.getRenderTarget(),Vs=this._renderer.getActiveCubeFace(),Xs=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ga(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ha(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ws,Vs,Xs),e.scissorTest=!1,kr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Hi||e.mapping===Gi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ws=this._renderer.getRenderTarget(),Vs=this._renderer.getActiveCubeFace(),Xs=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:tn,minFilter:tn,generateMipmaps:!1,type:fr,format:dn,colorSpace:An,depthBuffer:!1},r=ka(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ka(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cp(s)),this._blurMaterial=lp(s,e,t)}return r}_compileMaterial(e){const t=new Xt(this._lodPlanes[0],e);this._renderer.compile(t,Gs)}_sceneToCubeUV(e,t,i,r){const o=new rn(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(Oa),u.toneMapping=zn,u.autoClear=!1;const m=new Mo({name:"PMREM.Background",side:Vt,depthWrite:!1,depthTest:!1}),_=new Xt(new vr,m);let g=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,g=!0):(m.color.copy(Oa),g=!0);for(let h=0;h<6;h++){const S=h%3;S===0?(o.up.set(0,c[h],0),o.lookAt(l[h],0,0)):S===1?(o.up.set(0,0,c[h]),o.lookAt(0,l[h],0)):(o.up.set(0,c[h],0),o.lookAt(0,0,l[h]));const x=this._cubeSize;kr(r,S*x,h>2?x:0,x,x),u.setRenderTarget(r),g&&u.render(_,o),u.render(e,o)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=d,u.autoClear=f,e.background=p}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Hi||e.mapping===Gi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ga()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ha());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Xt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;kr(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,Gs)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Ba[(r-1)%Ba.length];this._blur(e,r-1,r,s,a)}t.autoClear=i}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new Xt(this._lodPlanes[r],l),d=l.uniforms,m=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*ti-1),g=s/_,p=isFinite(s)?1+Math.floor(u*g):ti;p>ti&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ti}`);const h=[];let S=0;for(let A=0;A<ti;++A){const K=A/g,y=Math.exp(-K*K/2);h.push(y),A===0?S+=y:A<p&&(S+=2*y)}for(let A=0;A<h.length;A++)h[A]=h[A]/S;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=h,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:x}=this;d.dTheta.value=_,d.mipInt.value=x-i;const w=this._sizeLods[r],D=3*w*(r>x-Ni?r-x+Ni:0),R=4*(this._cubeSize-w);kr(t,D,R,3*w,2*w),c.setRenderTarget(t),c.render(f,Gs)}}function cp(n){const e=[],t=[],i=[];let r=n;const s=n-Ni+1+Fa.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let c=1/o;a>n-Ni?c=Fa[a-n+Ni-1]:a===0&&(c=0),i.push(c);const l=1/(o-2),u=-l,f=1+l,d=[u,u,f,u,f,f,u,u,f,f,u,f],m=6,_=6,g=3,p=2,h=1,S=new Float32Array(g*_*m),x=new Float32Array(p*_*m),w=new Float32Array(h*_*m);for(let R=0;R<m;R++){const A=R%3*2/3-1,K=R>2?0:-1,y=[A,K,0,A+2/3,K,0,A+2/3,K+1,0,A,K,0,A+2/3,K+1,0,A,K+1,0];S.set(y,g*_*R),x.set(d,p*_*R);const b=[R,R,R,R,R,R];w.set(b,h*_*R)}const D=new Jt;D.setAttribute("position",new fn(S,g)),D.setAttribute("uv",new fn(x,p)),D.setAttribute("faceIndex",new fn(w,h)),e.push(D),r>Ni&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function ka(n,e,t){const i=new oi(n,e,t);return i.texture.mapping=cs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function kr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function lp(n,e,t){const i=new Float32Array(ti),r=new U(0,1,0);return new ci({name:"SphericalGaussianBlur",defines:{n:ti,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:bo(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Ha(){return new ci({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bo(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Ga(){return new ci({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function bo(){return`

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
	`}function up(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const c=o.mapping,l=c===to||c===no,u=c===Hi||c===Gi;if(l||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let f=e.get(o);return t===null&&(t=new za(n)),f=l?t.fromEquirectangular(o,f):t.fromCubemap(o,f),e.set(o,f),f.texture}else{if(e.has(o))return e.get(o).texture;{const f=o.image;if(l&&f&&f.height>0||u&&f&&r(f)){t===null&&(t=new za(n));const d=l?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",s),d.texture}else return null}}}return o}function r(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function s(o){const c=o.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function hp(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function dp(n,e,t,i){const r={},s=new WeakMap;function a(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);for(const _ in d.morphAttributes){const g=d.morphAttributes[_];for(let p=0,h=g.length;p<h;p++)e.remove(g[p])}d.removeEventListener("dispose",a),delete r[d.id];const m=s.get(d);m&&(e.remove(m),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function c(f){const d=f.attributes;for(const _ in d)e.update(d[_],n.ARRAY_BUFFER);const m=f.morphAttributes;for(const _ in m){const g=m[_];for(let p=0,h=g.length;p<h;p++)e.update(g[p],n.ARRAY_BUFFER)}}function l(f){const d=[],m=f.index,_=f.attributes.position;let g=0;if(m!==null){const S=m.array;g=m.version;for(let x=0,w=S.length;x<w;x+=3){const D=S[x+0],R=S[x+1],A=S[x+2];d.push(D,R,R,A,A,D)}}else if(_!==void 0){const S=_.array;g=_.version;for(let x=0,w=S.length/3-1;x<w;x+=3){const D=x+0,R=x+1,A=x+2;d.push(D,R,R,A,A,D)}}else return;const p=new(Kc(d)?nl:tl)(d,1);p.version=g;const h=s.get(f);h&&e.remove(h),s.set(f,p)}function u(f){const d=s.get(f);if(d){const m=f.index;m!==null&&d.version<m.version&&l(f)}else l(f);return s.get(f)}return{get:o,update:c,getWireframeAttribute:u}}function fp(n,e,t,i){const r=i.isWebGL2;let s;function a(m){s=m}let o,c;function l(m){o=m.type,c=m.bytesPerElement}function u(m,_){n.drawElements(s,_,o,m*c),t.update(_,s,1)}function f(m,_,g){if(g===0)return;let p,h;if(r)p=n,h="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),h="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[h](s,_,o,m*c,g),t.update(_,s,g)}function d(m,_,g){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let h=0;h<g;h++)this.render(m[h]/c,_[h]);else{p.multiDrawElementsWEBGL(s,_,0,o,m,0,g);let h=0;for(let S=0;S<g;S++)h+=_[S];t.update(h,s,1)}}this.setMode=a,this.setIndex=l,this.render=u,this.renderInstances=f,this.renderMultiDraw=d}function pp(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function mp(n,e){return n[0]-e[0]}function gp(n,e){return Math.abs(e[1])-Math.abs(n[1])}function _p(n,e,t){const i={},r=new Float32Array(8),s=new WeakMap,a=new Nt,o=[];for(let l=0;l<8;l++)o[l]=[l,0];function c(l,u,f){const d=l.morphTargetInfluences;if(e.isWebGL2===!0){const _=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=_!==void 0?_.length:0;let p=s.get(u);if(p===void 0||p.count!==g){let k=function(){X.dispose(),s.delete(u),u.removeEventListener("dispose",k)};var m=k;p!==void 0&&p.texture.dispose();const x=u.morphAttributes.position!==void 0,w=u.morphAttributes.normal!==void 0,D=u.morphAttributes.color!==void 0,R=u.morphAttributes.position||[],A=u.morphAttributes.normal||[],K=u.morphAttributes.color||[];let y=0;x===!0&&(y=1),w===!0&&(y=2),D===!0&&(y=3);let b=u.attributes.position.count*y,F=1;b>e.maxTextureSize&&(F=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const I=new Float32Array(b*F*4*g),X=new Qc(I,b,F,g);X.type=Fn,X.needsUpdate=!0;const C=y*4;for(let z=0;z<g;z++){const J=R[z],Y=A[z],q=K[z],Q=b*F*4*z;for(let fe=0;fe<J.count;fe++){const pe=fe*C;x===!0&&(a.fromBufferAttribute(J,fe),I[Q+pe+0]=a.x,I[Q+pe+1]=a.y,I[Q+pe+2]=a.z,I[Q+pe+3]=0),w===!0&&(a.fromBufferAttribute(Y,fe),I[Q+pe+4]=a.x,I[Q+pe+5]=a.y,I[Q+pe+6]=a.z,I[Q+pe+7]=0),D===!0&&(a.fromBufferAttribute(q,fe),I[Q+pe+8]=a.x,I[Q+pe+9]=a.y,I[Q+pe+10]=a.z,I[Q+pe+11]=q.itemSize===4?a.w:1)}}p={count:g,texture:X,size:new We(b,F)},s.set(u,p),u.addEventListener("dispose",k)}let h=0;for(let x=0;x<d.length;x++)h+=d[x];const S=u.morphTargetsRelative?1:1-h;f.getUniforms().setValue(n,"morphTargetBaseInfluence",S),f.getUniforms().setValue(n,"morphTargetInfluences",d),f.getUniforms().setValue(n,"morphTargetsTexture",p.texture,t),f.getUniforms().setValue(n,"morphTargetsTextureSize",p.size)}else{const _=d===void 0?0:d.length;let g=i[u.id];if(g===void 0||g.length!==_){g=[];for(let w=0;w<_;w++)g[w]=[w,0];i[u.id]=g}for(let w=0;w<_;w++){const D=g[w];D[0]=w,D[1]=d[w]}g.sort(gp);for(let w=0;w<8;w++)w<_&&g[w][1]?(o[w][0]=g[w][0],o[w][1]=g[w][1]):(o[w][0]=Number.MAX_SAFE_INTEGER,o[w][1]=0);o.sort(mp);const p=u.morphAttributes.position,h=u.morphAttributes.normal;let S=0;for(let w=0;w<8;w++){const D=o[w],R=D[0],A=D[1];R!==Number.MAX_SAFE_INTEGER&&A?(p&&u.getAttribute("morphTarget"+w)!==p[R]&&u.setAttribute("morphTarget"+w,p[R]),h&&u.getAttribute("morphNormal"+w)!==h[R]&&u.setAttribute("morphNormal"+w,h[R]),r[w]=A,S+=A):(p&&u.hasAttribute("morphTarget"+w)===!0&&u.deleteAttribute("morphTarget"+w),h&&u.hasAttribute("morphNormal"+w)===!0&&u.deleteAttribute("morphNormal"+w),r[w]=0)}const x=u.morphTargetsRelative?1:1-S;f.getUniforms().setValue(n,"morphTargetBaseInfluence",x),f.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:c}}function vp(n,e,t,i){let r=new WeakMap;function s(c){const l=i.render.frame,u=c.geometry,f=e.get(c,u);if(r.get(f)!==l&&(e.update(f),r.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==l&&(d.update(),r.set(d,l))}return f}function a(){r=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:a}}class cl extends $t{constructor(e,t,i,r,s,a,o,c,l,u){if(u=u!==void 0?u:ii,u!==ii&&u!==Wi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===ii&&(i=Nn),i===void 0&&u===Wi&&(i=ni),super(null,r,s,a,o,c,u,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Wt,this.minFilter=c!==void 0?c:Wt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const ll=new $t,ul=new cl(1,1);ul.compareFunction=Yc;const hl=new Qc,dl=new th,fl=new sl,Wa=[],Va=[],Xa=new Float32Array(16),$a=new Float32Array(9),ja=new Float32Array(4);function ji(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Wa[r];if(s===void 0&&(s=new Float32Array(r),Wa[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Rt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ct(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function hs(n,e){let t=Va[e];t===void 0&&(t=new Int32Array(e),Va[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function xp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function yp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;n.uniform2fv(this.addr,e),Ct(t,e)}}function Mp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Rt(t,e))return;n.uniform3fv(this.addr,e),Ct(t,e)}}function Sp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;n.uniform4fv(this.addr,e),Ct(t,e)}}function Ep(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Rt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,i))return;ja.set(i),n.uniformMatrix2fv(this.addr,!1,ja),Ct(t,i)}}function bp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Rt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,i))return;$a.set(i),n.uniformMatrix3fv(this.addr,!1,$a),Ct(t,i)}}function wp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Rt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,i))return;Xa.set(i),n.uniformMatrix4fv(this.addr,!1,Xa),Ct(t,i)}}function Tp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Ap(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;n.uniform2iv(this.addr,e),Ct(t,e)}}function Rp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;n.uniform3iv(this.addr,e),Ct(t,e)}}function Cp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;n.uniform4iv(this.addr,e),Ct(t,e)}}function Lp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Pp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;n.uniform2uiv(this.addr,e),Ct(t,e)}}function Dp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;n.uniform3uiv(this.addr,e),Ct(t,e)}}function Ip(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;n.uniform4uiv(this.addr,e),Ct(t,e)}}function Up(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);const s=this.type===n.SAMPLER_2D_SHADOW?ul:ll;t.setTexture2D(e||s,r)}function Np(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||dl,r)}function Fp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||fl,r)}function Op(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||hl,r)}function Bp(n){switch(n){case 5126:return xp;case 35664:return yp;case 35665:return Mp;case 35666:return Sp;case 35674:return Ep;case 35675:return bp;case 35676:return wp;case 5124:case 35670:return Tp;case 35667:case 35671:return Ap;case 35668:case 35672:return Rp;case 35669:case 35673:return Cp;case 5125:return Lp;case 36294:return Pp;case 36295:return Dp;case 36296:return Ip;case 35678:case 36198:case 36298:case 36306:case 35682:return Up;case 35679:case 36299:case 36307:return Np;case 35680:case 36300:case 36308:case 36293:return Fp;case 36289:case 36303:case 36311:case 36292:return Op}}function zp(n,e){n.uniform1fv(this.addr,e)}function kp(n,e){const t=ji(e,this.size,2);n.uniform2fv(this.addr,t)}function Hp(n,e){const t=ji(e,this.size,3);n.uniform3fv(this.addr,t)}function Gp(n,e){const t=ji(e,this.size,4);n.uniform4fv(this.addr,t)}function Wp(n,e){const t=ji(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Vp(n,e){const t=ji(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Xp(n,e){const t=ji(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function $p(n,e){n.uniform1iv(this.addr,e)}function jp(n,e){n.uniform2iv(this.addr,e)}function qp(n,e){n.uniform3iv(this.addr,e)}function Yp(n,e){n.uniform4iv(this.addr,e)}function Kp(n,e){n.uniform1uiv(this.addr,e)}function Zp(n,e){n.uniform2uiv(this.addr,e)}function Jp(n,e){n.uniform3uiv(this.addr,e)}function Qp(n,e){n.uniform4uiv(this.addr,e)}function em(n,e,t){const i=this.cache,r=e.length,s=hs(t,r);Rt(i,s)||(n.uniform1iv(this.addr,s),Ct(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||ll,s[a])}function tm(n,e,t){const i=this.cache,r=e.length,s=hs(t,r);Rt(i,s)||(n.uniform1iv(this.addr,s),Ct(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||dl,s[a])}function nm(n,e,t){const i=this.cache,r=e.length,s=hs(t,r);Rt(i,s)||(n.uniform1iv(this.addr,s),Ct(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||fl,s[a])}function im(n,e,t){const i=this.cache,r=e.length,s=hs(t,r);Rt(i,s)||(n.uniform1iv(this.addr,s),Ct(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||hl,s[a])}function rm(n){switch(n){case 5126:return zp;case 35664:return kp;case 35665:return Hp;case 35666:return Gp;case 35674:return Wp;case 35675:return Vp;case 35676:return Xp;case 5124:case 35670:return $p;case 35667:case 35671:return jp;case 35668:case 35672:return qp;case 35669:case 35673:return Yp;case 5125:return Kp;case 36294:return Zp;case 36295:return Jp;case 36296:return Qp;case 35678:case 36198:case 36298:case 36306:case 35682:return em;case 35679:case 36299:case 36307:return tm;case 35680:case 36300:case 36308:case 36293:return nm;case 36289:case 36303:case 36311:case 36292:return im}}class sm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Bp(t.type)}}class om{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=rm(t.type)}}class am{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const $s=/(\w+)(\])?(\[|\.)?/g;function qa(n,e){n.seq.push(e),n.map[e.id]=e}function cm(n,e,t){const i=n.name,r=i.length;for($s.lastIndex=0;;){const s=$s.exec(i),a=$s.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){qa(t,l===void 0?new sm(o,n,e):new om(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new am(o),qa(t,f)),t=f}}}class Kr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);cm(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Ya(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const lm=37297;let um=0;function hm(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function dm(n){const e=ft.getPrimaries(ft.workingColorSpace),t=ft.getPrimaries(n);let i;switch(e===t?i="":e===ts&&t===es?i="LinearDisplayP3ToLinearSRGB":e===es&&t===ts&&(i="LinearSRGBToLinearDisplayP3"),n){case An:case ls:return[i,"LinearTransferOETF"];case It:case vo:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Ka(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+hm(n.getShaderSource(e),a)}else return r}function fm(n,e){const t=dm(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function pm(n,e){let t;switch(e){case du:t="Linear";break;case fu:t="Reinhard";break;case pu:t="OptimizedCineon";break;case Bc:t="ACESFilmic";break;case gu:t="AgX";break;case mu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function mm(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Fi).join(`
`)}function gm(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Fi).join(`
`)}function _m(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function vm(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Fi(n){return n!==""}function Za(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ja(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const xm=/^[ \t]*#include +<([\w\d./]+)>/gm;function co(n){return n.replace(xm,Mm)}const ym=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Mm(n,e){let t=nt[e];if(t===void 0){const i=ym.get(e);if(i!==void 0)t=nt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return co(t)}const Sm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qa(n){return n.replace(Sm,Em)}function Em(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function ec(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function bm(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Fc?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===kl?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Sn&&(e="SHADOWMAP_TYPE_VSM"),e}function wm(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Hi:case Gi:e="ENVMAP_TYPE_CUBE";break;case cs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Tm(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Gi:e="ENVMAP_MODE_REFRACTION";break}return e}function Am(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Oc:e="ENVMAP_BLENDING_MULTIPLY";break;case uu:e="ENVMAP_BLENDING_MIX";break;case hu:e="ENVMAP_BLENDING_ADD";break}return e}function Rm(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Cm(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=bm(t),l=wm(t),u=Tm(t),f=Am(t),d=Rm(t),m=t.isWebGL2?"":mm(t),_=gm(t),g=_m(s),p=r.createProgram();let h,S,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Fi).join(`
`),h.length>0&&(h+=`
`),S=[m,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Fi).join(`
`),S.length>0&&(S+=`
`)):(h=[ec(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fi).join(`
`),S=[m,ec(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==zn?"#define TONE_MAPPING":"",t.toneMapping!==zn?nt.tonemapping_pars_fragment:"",t.toneMapping!==zn?pm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",nt.colorspace_pars_fragment,fm("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Fi).join(`
`)),a=co(a),a=Za(a,t),a=Ja(a,t),o=co(o),o=Za(o,t),o=Ja(o,t),a=Qa(a),o=Qa(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,h=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+h,S=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===va?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===va?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const w=x+h+a,D=x+S+o,R=Ya(r,r.VERTEX_SHADER,w),A=Ya(r,r.FRAGMENT_SHADER,D);r.attachShader(p,R),r.attachShader(p,A),t.index0AttributeName!==void 0?r.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(p,0,"position"),r.linkProgram(p);function K(I){if(n.debug.checkShaderErrors){const X=r.getProgramInfoLog(p).trim(),C=r.getShaderInfoLog(R).trim(),k=r.getShaderInfoLog(A).trim();let z=!0,J=!0;if(r.getProgramParameter(p,r.LINK_STATUS)===!1)if(z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,p,R,A);else{const Y=Ka(r,R,"vertex"),q=Ka(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(p,r.VALIDATE_STATUS)+`

Program Info Log: `+X+`
`+Y+`
`+q)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(C===""||k==="")&&(J=!1);J&&(I.diagnostics={runnable:z,programLog:X,vertexShader:{log:C,prefix:h},fragmentShader:{log:k,prefix:S}})}r.deleteShader(R),r.deleteShader(A),y=new Kr(r,p),b=vm(r,p)}let y;this.getUniforms=function(){return y===void 0&&K(this),y};let b;this.getAttributes=function(){return b===void 0&&K(this),b};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=r.getProgramParameter(p,lm)),F},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=um++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=R,this.fragmentShader=A,this}let Lm=0;class Pm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Dm(e),t.set(e,i)),i}}class Dm{constructor(e){this.id=Lm++,this.code=e,this.usedTimes=0}}function Im(n,e,t,i,r,s,a){const o=new yo,c=new Pm,l=[],u=r.isWebGL2,f=r.logarithmicDepthBuffer,d=r.vertexTextures;let m=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return y===0?"uv":`uv${y}`}function p(y,b,F,I,X){const C=I.fog,k=X.geometry,z=y.isMeshStandardMaterial?I.environment:null,J=(y.isMeshStandardMaterial?t:e).get(y.envMap||z),Y=J&&J.mapping===cs?J.image.height:null,q=_[y.type];y.precision!==null&&(m=r.getMaxPrecision(y.precision),m!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",m,"instead."));const Q=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,fe=Q!==void 0?Q.length:0;let pe=0;k.morphAttributes.position!==void 0&&(pe=1),k.morphAttributes.normal!==void 0&&(pe=2),k.morphAttributes.color!==void 0&&(pe=3);let H,ee,xe,Ce;if(q){const Me=pn[q];H=Me.vertexShader,ee=Me.fragmentShader}else H=y.vertexShader,ee=y.fragmentShader,c.update(y),xe=c.getVertexShaderID(y),Ce=c.getFragmentShaderID(y);const Pe=n.getRenderTarget(),ze=X.isInstancedMesh===!0,$e=X.isBatchedMesh===!0,ke=!!y.map,st=!!y.matcap,$=!!J,Et=!!y.aoMap,Ue=!!y.lightMap,He=!!y.bumpMap,Re=!!y.normalMap,ht=!!y.displacementMap,qe=!!y.emissiveMap,E=!!y.metalnessMap,v=!!y.roughnessMap,W=y.anisotropy>0,le=y.clearcoat>0,se=y.iridescence>0,ue=y.sheen>0,De=y.transmission>0,ye=W&&!!y.anisotropyMap,be=le&&!!y.clearcoatMap,Oe=le&&!!y.clearcoatNormalMap,Ye=le&&!!y.clearcoatRoughnessMap,ie=se&&!!y.iridescenceMap,ut=se&&!!y.iridescenceThicknessMap,Ze=ue&&!!y.sheenColorMap,Xe=ue&&!!y.sheenRoughnessMap,Ne=!!y.specularMap,Ee=!!y.specularColorMap,T=!!y.specularIntensityMap,he=De&&!!y.transmissionMap,Fe=De&&!!y.thicknessMap,we=!!y.gradientMap,oe=!!y.alphaMap,L=y.alphaTest>0,me=!!y.alphaHash,ve=!!y.extensions,P=!!k.attributes.uv1,B=!!k.attributes.uv2,Z=!!k.attributes.uv3;let ae=zn;return y.toneMapped&&(Pe===null||Pe.isXRRenderTarget===!0)&&(ae=n.toneMapping),{isWebGL2:u,shaderID:q,shaderType:y.type,shaderName:y.name,vertexShader:H,fragmentShader:ee,defines:y.defines,customVertexShaderID:xe,customFragmentShaderID:Ce,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:m,batching:$e,instancing:ze,instancingColor:ze&&X.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:Pe===null?n.outputColorSpace:Pe.isXRRenderTarget===!0?Pe.texture.colorSpace:An,map:ke,matcap:st,envMap:$,envMapMode:$&&J.mapping,envMapCubeUVHeight:Y,aoMap:Et,lightMap:Ue,bumpMap:He,normalMap:Re,displacementMap:d&&ht,emissiveMap:qe,normalMapObjectSpace:Re&&y.normalMapType===Ru,normalMapTangentSpace:Re&&y.normalMapType===qc,metalnessMap:E,roughnessMap:v,anisotropy:W,anisotropyMap:ye,clearcoat:le,clearcoatMap:be,clearcoatNormalMap:Oe,clearcoatRoughnessMap:Ye,iridescence:se,iridescenceMap:ie,iridescenceThicknessMap:ut,sheen:ue,sheenColorMap:Ze,sheenRoughnessMap:Xe,specularMap:Ne,specularColorMap:Ee,specularIntensityMap:T,transmission:De,transmissionMap:he,thicknessMap:Fe,gradientMap:we,opaque:y.transparent===!1&&y.blending===Oi,alphaMap:oe,alphaTest:L,alphaHash:me,combine:y.combine,mapUv:ke&&g(y.map.channel),aoMapUv:Et&&g(y.aoMap.channel),lightMapUv:Ue&&g(y.lightMap.channel),bumpMapUv:He&&g(y.bumpMap.channel),normalMapUv:Re&&g(y.normalMap.channel),displacementMapUv:ht&&g(y.displacementMap.channel),emissiveMapUv:qe&&g(y.emissiveMap.channel),metalnessMapUv:E&&g(y.metalnessMap.channel),roughnessMapUv:v&&g(y.roughnessMap.channel),anisotropyMapUv:ye&&g(y.anisotropyMap.channel),clearcoatMapUv:be&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:Oe&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ye&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ie&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:ut&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ze&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:Xe&&g(y.sheenRoughnessMap.channel),specularMapUv:Ne&&g(y.specularMap.channel),specularColorMapUv:Ee&&g(y.specularColorMap.channel),specularIntensityMapUv:T&&g(y.specularIntensityMap.channel),transmissionMapUv:he&&g(y.transmissionMap.channel),thicknessMapUv:Fe&&g(y.thicknessMap.channel),alphaMapUv:oe&&g(y.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(Re||W),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,vertexUv1s:P,vertexUv2s:B,vertexUv3s:Z,pointsUvs:X.isPoints===!0&&!!k.attributes.uv&&(ke||oe),fog:!!C,useFog:y.fog===!0,fogExp2:C&&C.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:X.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:fe,morphTextureStride:pe,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&F.length>0,shadowMapType:n.shadowMap.type,toneMapping:ae,useLegacyLights:n._useLegacyLights,decodeVideoTexture:ke&&y.map.isVideoTexture===!0&&ft.getTransfer(y.map.colorSpace)===mt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===En,flipSided:y.side===Vt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:ve&&y.extensions.derivatives===!0,extensionFragDepth:ve&&y.extensions.fragDepth===!0,extensionDrawBuffers:ve&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:ve&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ve&&y.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function h(y){const b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(const F in y.defines)b.push(F),b.push(y.defines[F]);return y.isRawShaderMaterial===!1&&(S(b,y),x(b,y),b.push(n.outputColorSpace)),b.push(y.customProgramCacheKey),b.join()}function S(y,b){y.push(b.precision),y.push(b.outputColorSpace),y.push(b.envMapMode),y.push(b.envMapCubeUVHeight),y.push(b.mapUv),y.push(b.alphaMapUv),y.push(b.lightMapUv),y.push(b.aoMapUv),y.push(b.bumpMapUv),y.push(b.normalMapUv),y.push(b.displacementMapUv),y.push(b.emissiveMapUv),y.push(b.metalnessMapUv),y.push(b.roughnessMapUv),y.push(b.anisotropyMapUv),y.push(b.clearcoatMapUv),y.push(b.clearcoatNormalMapUv),y.push(b.clearcoatRoughnessMapUv),y.push(b.iridescenceMapUv),y.push(b.iridescenceThicknessMapUv),y.push(b.sheenColorMapUv),y.push(b.sheenRoughnessMapUv),y.push(b.specularMapUv),y.push(b.specularColorMapUv),y.push(b.specularIntensityMapUv),y.push(b.transmissionMapUv),y.push(b.thicknessMapUv),y.push(b.combine),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.morphAttributeCount),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.numLightProbes),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function x(y,b){o.disableAll(),b.isWebGL2&&o.enable(0),b.supportsVertexTextures&&o.enable(1),b.instancing&&o.enable(2),b.instancingColor&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),y.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.skinning&&o.enable(4),b.morphTargets&&o.enable(5),b.morphNormals&&o.enable(6),b.morphColors&&o.enable(7),b.premultipliedAlpha&&o.enable(8),b.shadowMapEnabled&&o.enable(9),b.useLegacyLights&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),y.push(o.mask)}function w(y){const b=_[y.type];let F;if(b){const I=pn[b];F=ph.clone(I.uniforms)}else F=y.uniforms;return F}function D(y,b){let F;for(let I=0,X=l.length;I<X;I++){const C=l[I];if(C.cacheKey===b){F=C,++F.usedTimes;break}}return F===void 0&&(F=new Cm(n,b,y,s),l.push(F)),F}function R(y){if(--y.usedTimes===0){const b=l.indexOf(y);l[b]=l[l.length-1],l.pop(),y.destroy()}}function A(y){c.remove(y)}function K(){c.dispose()}return{getParameters:p,getProgramCacheKey:h,getUniforms:w,acquireProgram:D,releaseProgram:R,releaseShaderCache:A,programs:l,dispose:K}}function Um(){let n=new WeakMap;function e(s){let a=n.get(s);return a===void 0&&(a={},n.set(s,a)),a}function t(s){n.delete(s)}function i(s,a,o){n.get(s)[a]=o}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function Nm(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function tc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function nc(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(f,d,m,_,g,p){let h=n[e];return h===void 0?(h={id:f.id,object:f,geometry:d,material:m,groupOrder:_,renderOrder:f.renderOrder,z:g,group:p},n[e]=h):(h.id=f.id,h.object=f,h.geometry=d,h.material=m,h.groupOrder=_,h.renderOrder=f.renderOrder,h.z=g,h.group=p),e++,h}function o(f,d,m,_,g,p){const h=a(f,d,m,_,g,p);m.transmission>0?i.push(h):m.transparent===!0?r.push(h):t.push(h)}function c(f,d,m,_,g,p){const h=a(f,d,m,_,g,p);m.transmission>0?i.unshift(h):m.transparent===!0?r.unshift(h):t.unshift(h)}function l(f,d){t.length>1&&t.sort(f||Nm),i.length>1&&i.sort(d||tc),r.length>1&&r.sort(d||tc)}function u(){for(let f=e,d=n.length;f<d;f++){const m=n[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:c,finish:u,sort:l}}function Fm(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new nc,n.set(i,[a])):r>=s.length?(a=new nc,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Om(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new rt};break;case"SpotLight":t={position:new U,direction:new U,color:new rt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new rt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new rt,groundColor:new rt};break;case"RectAreaLight":t={color:new rt,position:new U,halfWidth:new U,halfHeight:new U};break}return n[e.id]=t,t}}}function Bm(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let zm=0;function km(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Hm(n,e){const t=new Om,i=Bm(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new U);const s=new U,a=new xt,o=new xt;function c(u,f){let d=0,m=0,_=0;for(let I=0;I<9;I++)r.probe[I].set(0,0,0);let g=0,p=0,h=0,S=0,x=0,w=0,D=0,R=0,A=0,K=0,y=0;u.sort(km);const b=f===!0?Math.PI:1;for(let I=0,X=u.length;I<X;I++){const C=u[I],k=C.color,z=C.intensity,J=C.distance,Y=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)d+=k.r*z*b,m+=k.g*z*b,_+=k.b*z*b;else if(C.isLightProbe){for(let q=0;q<9;q++)r.probe[q].addScaledVector(C.sh.coefficients[q],z);y++}else if(C.isDirectionalLight){const q=t.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity*b),C.castShadow){const Q=C.shadow,fe=i.get(C);fe.shadowBias=Q.bias,fe.shadowNormalBias=Q.normalBias,fe.shadowRadius=Q.radius,fe.shadowMapSize=Q.mapSize,r.directionalShadow[g]=fe,r.directionalShadowMap[g]=Y,r.directionalShadowMatrix[g]=C.shadow.matrix,w++}r.directional[g]=q,g++}else if(C.isSpotLight){const q=t.get(C);q.position.setFromMatrixPosition(C.matrixWorld),q.color.copy(k).multiplyScalar(z*b),q.distance=J,q.coneCos=Math.cos(C.angle),q.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),q.decay=C.decay,r.spot[h]=q;const Q=C.shadow;if(C.map&&(r.spotLightMap[A]=C.map,A++,Q.updateMatrices(C),C.castShadow&&K++),r.spotLightMatrix[h]=Q.matrix,C.castShadow){const fe=i.get(C);fe.shadowBias=Q.bias,fe.shadowNormalBias=Q.normalBias,fe.shadowRadius=Q.radius,fe.shadowMapSize=Q.mapSize,r.spotShadow[h]=fe,r.spotShadowMap[h]=Y,R++}h++}else if(C.isRectAreaLight){const q=t.get(C);q.color.copy(k).multiplyScalar(z),q.halfWidth.set(C.width*.5,0,0),q.halfHeight.set(0,C.height*.5,0),r.rectArea[S]=q,S++}else if(C.isPointLight){const q=t.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity*b),q.distance=C.distance,q.decay=C.decay,C.castShadow){const Q=C.shadow,fe=i.get(C);fe.shadowBias=Q.bias,fe.shadowNormalBias=Q.normalBias,fe.shadowRadius=Q.radius,fe.shadowMapSize=Q.mapSize,fe.shadowCameraNear=Q.camera.near,fe.shadowCameraFar=Q.camera.far,r.pointShadow[p]=fe,r.pointShadowMap[p]=Y,r.pointShadowMatrix[p]=C.shadow.matrix,D++}r.point[p]=q,p++}else if(C.isHemisphereLight){const q=t.get(C);q.skyColor.copy(C.color).multiplyScalar(z*b),q.groundColor.copy(C.groundColor).multiplyScalar(z*b),r.hemi[x]=q,x++}}S>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=_e.LTC_FLOAT_1,r.rectAreaLTC2=_e.LTC_FLOAT_2):(r.rectAreaLTC1=_e.LTC_HALF_1,r.rectAreaLTC2=_e.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=_e.LTC_FLOAT_1,r.rectAreaLTC2=_e.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=_e.LTC_HALF_1,r.rectAreaLTC2=_e.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=m,r.ambient[2]=_;const F=r.hash;(F.directionalLength!==g||F.pointLength!==p||F.spotLength!==h||F.rectAreaLength!==S||F.hemiLength!==x||F.numDirectionalShadows!==w||F.numPointShadows!==D||F.numSpotShadows!==R||F.numSpotMaps!==A||F.numLightProbes!==y)&&(r.directional.length=g,r.spot.length=h,r.rectArea.length=S,r.point.length=p,r.hemi.length=x,r.directionalShadow.length=w,r.directionalShadowMap.length=w,r.pointShadow.length=D,r.pointShadowMap.length=D,r.spotShadow.length=R,r.spotShadowMap.length=R,r.directionalShadowMatrix.length=w,r.pointShadowMatrix.length=D,r.spotLightMatrix.length=R+A-K,r.spotLightMap.length=A,r.numSpotLightShadowsWithMaps=K,r.numLightProbes=y,F.directionalLength=g,F.pointLength=p,F.spotLength=h,F.rectAreaLength=S,F.hemiLength=x,F.numDirectionalShadows=w,F.numPointShadows=D,F.numSpotShadows=R,F.numSpotMaps=A,F.numLightProbes=y,r.version=zm++)}function l(u,f){let d=0,m=0,_=0,g=0,p=0;const h=f.matrixWorldInverse;for(let S=0,x=u.length;S<x;S++){const w=u[S];if(w.isDirectionalLight){const D=r.directional[d];D.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),D.direction.sub(s),D.direction.transformDirection(h),d++}else if(w.isSpotLight){const D=r.spot[_];D.position.setFromMatrixPosition(w.matrixWorld),D.position.applyMatrix4(h),D.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),D.direction.sub(s),D.direction.transformDirection(h),_++}else if(w.isRectAreaLight){const D=r.rectArea[g];D.position.setFromMatrixPosition(w.matrixWorld),D.position.applyMatrix4(h),o.identity(),a.copy(w.matrixWorld),a.premultiply(h),o.extractRotation(a),D.halfWidth.set(w.width*.5,0,0),D.halfHeight.set(0,w.height*.5,0),D.halfWidth.applyMatrix4(o),D.halfHeight.applyMatrix4(o),g++}else if(w.isPointLight){const D=r.point[m];D.position.setFromMatrixPosition(w.matrixWorld),D.position.applyMatrix4(h),m++}else if(w.isHemisphereLight){const D=r.hemi[p];D.direction.setFromMatrixPosition(w.matrixWorld),D.direction.transformDirection(h),p++}}}return{setup:c,setupView:l,state:r}}function ic(n,e){const t=new Hm(n,e),i=[],r=[];function s(){i.length=0,r.length=0}function a(f){i.push(f)}function o(f){r.push(f)}function c(f){t.setup(i,f)}function l(f){t.setupView(i,f)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function Gm(n,e){let t=new WeakMap;function i(s,a=0){const o=t.get(s);let c;return o===void 0?(c=new ic(n,e),t.set(s,[c])):a>=o.length?(c=new ic(n,e),o.push(c)):c=o[a],c}function r(){t=new WeakMap}return{get:i,dispose:r}}class Wm extends Wn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Tu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Vm extends Wn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Xm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$m=`uniform sampler2D shadow_pass;
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
}`;function jm(n,e,t){let i=new So;const r=new We,s=new We,a=new Nt,o=new Wm({depthPacking:Au}),c=new Vm,l={},u=t.maxTextureSize,f={[Hn]:Vt,[Vt]:Hn,[En]:En},d=new ci({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:Xm,fragmentShader:$m}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const _=new Jt;_.setAttribute("position",new fn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Xt(_,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fc;let h=this.type;this.render=function(R,A,K){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||R.length===0)return;const y=n.getRenderTarget(),b=n.getActiveCubeFace(),F=n.getActiveMipmapLevel(),I=n.state;I.setBlending(Bn),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const X=h!==Sn&&this.type===Sn,C=h===Sn&&this.type!==Sn;for(let k=0,z=R.length;k<z;k++){const J=R[k],Y=J.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;r.copy(Y.mapSize);const q=Y.getFrameExtents();if(r.multiply(q),s.copy(Y.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/q.x),r.x=s.x*q.x,Y.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/q.y),r.y=s.y*q.y,Y.mapSize.y=s.y)),Y.map===null||X===!0||C===!0){const fe=this.type!==Sn?{minFilter:Wt,magFilter:Wt}:{};Y.map!==null&&Y.map.dispose(),Y.map=new oi(r.x,r.y,fe),Y.map.texture.name=J.name+".shadowMap",Y.camera.updateProjectionMatrix()}n.setRenderTarget(Y.map),n.clear();const Q=Y.getViewportCount();for(let fe=0;fe<Q;fe++){const pe=Y.getViewport(fe);a.set(s.x*pe.x,s.y*pe.y,s.x*pe.z,s.y*pe.w),I.viewport(a),Y.updateMatrices(J,fe),i=Y.getFrustum(),w(A,K,Y.camera,J,this.type)}Y.isPointLightShadow!==!0&&this.type===Sn&&S(Y,K),Y.needsUpdate=!1}h=this.type,p.needsUpdate=!1,n.setRenderTarget(y,b,F)};function S(R,A){const K=e.update(g);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new oi(r.x,r.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(A,null,K,d,g,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value=R.mapSize,m.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(A,null,K,m,g,null)}function x(R,A,K,y){let b=null;const F=K.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(F!==void 0)b=F;else if(b=K.isPointLight===!0?c:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const I=b.uuid,X=A.uuid;let C=l[I];C===void 0&&(C={},l[I]=C);let k=C[X];k===void 0&&(k=b.clone(),C[X]=k,A.addEventListener("dispose",D)),b=k}if(b.visible=A.visible,b.wireframe=A.wireframe,y===Sn?b.side=A.shadowSide!==null?A.shadowSide:A.side:b.side=A.shadowSide!==null?A.shadowSide:f[A.side],b.alphaMap=A.alphaMap,b.alphaTest=A.alphaTest,b.map=A.map,b.clipShadows=A.clipShadows,b.clippingPlanes=A.clippingPlanes,b.clipIntersection=A.clipIntersection,b.displacementMap=A.displacementMap,b.displacementScale=A.displacementScale,b.displacementBias=A.displacementBias,b.wireframeLinewidth=A.wireframeLinewidth,b.linewidth=A.linewidth,K.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const I=n.properties.get(b);I.light=K}return b}function w(R,A,K,y,b){if(R.visible===!1)return;if(R.layers.test(A.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&b===Sn)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,R.matrixWorld);const X=e.update(R),C=R.material;if(Array.isArray(C)){const k=X.groups;for(let z=0,J=k.length;z<J;z++){const Y=k[z],q=C[Y.materialIndex];if(q&&q.visible){const Q=x(R,q,y,b);R.onBeforeShadow(n,R,A,K,X,Q,Y),n.renderBufferDirect(K,null,X,Q,R,Y),R.onAfterShadow(n,R,A,K,X,Q,Y)}}}else if(C.visible){const k=x(R,C,y,b);R.onBeforeShadow(n,R,A,K,X,k,null),n.renderBufferDirect(K,null,X,k,R,null),R.onAfterShadow(n,R,A,K,X,k,null)}}const I=R.children;for(let X=0,C=I.length;X<C;X++)w(I[X],A,K,y,b)}function D(R){R.target.removeEventListener("dispose",D);for(const K in l){const y=l[K],b=R.target.uuid;b in y&&(y[b].dispose(),delete y[b])}}}function qm(n,e,t){const i=t.isWebGL2;function r(){let L=!1;const me=new Nt;let ve=null;const P=new Nt(0,0,0,0);return{setMask:function(B){ve!==B&&!L&&(n.colorMask(B,B,B,B),ve=B)},setLocked:function(B){L=B},setClear:function(B,Z,ae,ge,Me){Me===!0&&(B*=ge,Z*=ge,ae*=ge),me.set(B,Z,ae,ge),P.equals(me)===!1&&(n.clearColor(B,Z,ae,ge),P.copy(me))},reset:function(){L=!1,ve=null,P.set(-1,0,0,0)}}}function s(){let L=!1,me=null,ve=null,P=null;return{setTest:function(B){B?$e(n.DEPTH_TEST):ke(n.DEPTH_TEST)},setMask:function(B){me!==B&&!L&&(n.depthMask(B),me=B)},setFunc:function(B){if(ve!==B){switch(B){case iu:n.depthFunc(n.NEVER);break;case ru:n.depthFunc(n.ALWAYS);break;case su:n.depthFunc(n.LESS);break;case Jr:n.depthFunc(n.LEQUAL);break;case ou:n.depthFunc(n.EQUAL);break;case au:n.depthFunc(n.GEQUAL);break;case cu:n.depthFunc(n.GREATER);break;case lu:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ve=B}},setLocked:function(B){L=B},setClear:function(B){P!==B&&(n.clearDepth(B),P=B)},reset:function(){L=!1,me=null,ve=null,P=null}}}function a(){let L=!1,me=null,ve=null,P=null,B=null,Z=null,ae=null,ge=null,Me=null;return{setTest:function(re){L||(re?$e(n.STENCIL_TEST):ke(n.STENCIL_TEST))},setMask:function(re){me!==re&&!L&&(n.stencilMask(re),me=re)},setFunc:function(re,Ae,Te){(ve!==re||P!==Ae||B!==Te)&&(n.stencilFunc(re,Ae,Te),ve=re,P=Ae,B=Te)},setOp:function(re,Ae,Te){(Z!==re||ae!==Ae||ge!==Te)&&(n.stencilOp(re,Ae,Te),Z=re,ae=Ae,ge=Te)},setLocked:function(re){L=re},setClear:function(re){Me!==re&&(n.clearStencil(re),Me=re)},reset:function(){L=!1,me=null,ve=null,P=null,B=null,Z=null,ae=null,ge=null,Me=null}}}const o=new r,c=new s,l=new a,u=new WeakMap,f=new WeakMap;let d={},m={},_=new WeakMap,g=[],p=null,h=!1,S=null,x=null,w=null,D=null,R=null,A=null,K=null,y=new rt(0,0,0),b=0,F=!1,I=null,X=null,C=null,k=null,z=null;const J=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,q=0;const Q=n.getParameter(n.VERSION);Q.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(Q)[1]),Y=q>=1):Q.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),Y=q>=2);let fe=null,pe={};const H=n.getParameter(n.SCISSOR_BOX),ee=n.getParameter(n.VIEWPORT),xe=new Nt().fromArray(H),Ce=new Nt().fromArray(ee);function Pe(L,me,ve,P){const B=new Uint8Array(4),Z=n.createTexture();n.bindTexture(L,Z),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ae=0;ae<ve;ae++)i&&(L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY)?n.texImage3D(me,0,n.RGBA,1,1,P,0,n.RGBA,n.UNSIGNED_BYTE,B):n.texImage2D(me+ae,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,B);return Z}const ze={};ze[n.TEXTURE_2D]=Pe(n.TEXTURE_2D,n.TEXTURE_2D,1),ze[n.TEXTURE_CUBE_MAP]=Pe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(ze[n.TEXTURE_2D_ARRAY]=Pe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ze[n.TEXTURE_3D]=Pe(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),l.setClear(0),$e(n.DEPTH_TEST),c.setFunc(Jr),qe(!1),E(zo),$e(n.CULL_FACE),Re(Bn);function $e(L){d[L]!==!0&&(n.enable(L),d[L]=!0)}function ke(L){d[L]!==!1&&(n.disable(L),d[L]=!1)}function st(L,me){return m[L]!==me?(n.bindFramebuffer(L,me),m[L]=me,i&&(L===n.DRAW_FRAMEBUFFER&&(m[n.FRAMEBUFFER]=me),L===n.FRAMEBUFFER&&(m[n.DRAW_FRAMEBUFFER]=me)),!0):!1}function $(L,me){let ve=g,P=!1;if(L)if(ve=_.get(me),ve===void 0&&(ve=[],_.set(me,ve)),L.isWebGLMultipleRenderTargets){const B=L.texture;if(ve.length!==B.length||ve[0]!==n.COLOR_ATTACHMENT0){for(let Z=0,ae=B.length;Z<ae;Z++)ve[Z]=n.COLOR_ATTACHMENT0+Z;ve.length=B.length,P=!0}}else ve[0]!==n.COLOR_ATTACHMENT0&&(ve[0]=n.COLOR_ATTACHMENT0,P=!0);else ve[0]!==n.BACK&&(ve[0]=n.BACK,P=!0);P&&(t.isWebGL2?n.drawBuffers(ve):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ve))}function Et(L){return p!==L?(n.useProgram(L),p=L,!0):!1}const Ue={[ei]:n.FUNC_ADD,[Gl]:n.FUNC_SUBTRACT,[Wl]:n.FUNC_REVERSE_SUBTRACT};if(i)Ue[Wo]=n.MIN,Ue[Vo]=n.MAX;else{const L=e.get("EXT_blend_minmax");L!==null&&(Ue[Wo]=L.MIN_EXT,Ue[Vo]=L.MAX_EXT)}const He={[Vl]:n.ZERO,[Xl]:n.ONE,[$l]:n.SRC_COLOR,[Qs]:n.SRC_ALPHA,[Jl]:n.SRC_ALPHA_SATURATE,[Kl]:n.DST_COLOR,[ql]:n.DST_ALPHA,[jl]:n.ONE_MINUS_SRC_COLOR,[eo]:n.ONE_MINUS_SRC_ALPHA,[Zl]:n.ONE_MINUS_DST_COLOR,[Yl]:n.ONE_MINUS_DST_ALPHA,[Ql]:n.CONSTANT_COLOR,[eu]:n.ONE_MINUS_CONSTANT_COLOR,[tu]:n.CONSTANT_ALPHA,[nu]:n.ONE_MINUS_CONSTANT_ALPHA};function Re(L,me,ve,P,B,Z,ae,ge,Me,re){if(L===Bn){h===!0&&(ke(n.BLEND),h=!1);return}if(h===!1&&($e(n.BLEND),h=!0),L!==Hl){if(L!==S||re!==F){if((x!==ei||R!==ei)&&(n.blendEquation(n.FUNC_ADD),x=ei,R=ei),re)switch(L){case Oi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ko:n.blendFunc(n.ONE,n.ONE);break;case Ho:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Go:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Oi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ko:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Ho:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Go:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}w=null,D=null,A=null,K=null,y.set(0,0,0),b=0,S=L,F=re}return}B=B||me,Z=Z||ve,ae=ae||P,(me!==x||B!==R)&&(n.blendEquationSeparate(Ue[me],Ue[B]),x=me,R=B),(ve!==w||P!==D||Z!==A||ae!==K)&&(n.blendFuncSeparate(He[ve],He[P],He[Z],He[ae]),w=ve,D=P,A=Z,K=ae),(ge.equals(y)===!1||Me!==b)&&(n.blendColor(ge.r,ge.g,ge.b,Me),y.copy(ge),b=Me),S=L,F=!1}function ht(L,me){L.side===En?ke(n.CULL_FACE):$e(n.CULL_FACE);let ve=L.side===Vt;me&&(ve=!ve),qe(ve),L.blending===Oi&&L.transparent===!1?Re(Bn):Re(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),c.setFunc(L.depthFunc),c.setTest(L.depthTest),c.setMask(L.depthWrite),o.setMask(L.colorWrite);const P=L.stencilWrite;l.setTest(P),P&&(l.setMask(L.stencilWriteMask),l.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),l.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),W(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?$e(n.SAMPLE_ALPHA_TO_COVERAGE):ke(n.SAMPLE_ALPHA_TO_COVERAGE)}function qe(L){I!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),I=L)}function E(L){L!==Bl?($e(n.CULL_FACE),L!==X&&(L===zo?n.cullFace(n.BACK):L===zl?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ke(n.CULL_FACE),X=L}function v(L){L!==C&&(Y&&n.lineWidth(L),C=L)}function W(L,me,ve){L?($e(n.POLYGON_OFFSET_FILL),(k!==me||z!==ve)&&(n.polygonOffset(me,ve),k=me,z=ve)):ke(n.POLYGON_OFFSET_FILL)}function le(L){L?$e(n.SCISSOR_TEST):ke(n.SCISSOR_TEST)}function se(L){L===void 0&&(L=n.TEXTURE0+J-1),fe!==L&&(n.activeTexture(L),fe=L)}function ue(L,me,ve){ve===void 0&&(fe===null?ve=n.TEXTURE0+J-1:ve=fe);let P=pe[ve];P===void 0&&(P={type:void 0,texture:void 0},pe[ve]=P),(P.type!==L||P.texture!==me)&&(fe!==ve&&(n.activeTexture(ve),fe=ve),n.bindTexture(L,me||ze[L]),P.type=L,P.texture=me)}function De(){const L=pe[fe];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function ye(){try{n.compressedTexImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function be(){try{n.compressedTexImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Oe(){try{n.texSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ye(){try{n.texSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ie(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ut(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ze(){try{n.texStorage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Xe(){try{n.texStorage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ne(){try{n.texImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ee(){try{n.texImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function T(L){xe.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),xe.copy(L))}function he(L){Ce.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),Ce.copy(L))}function Fe(L,me){let ve=f.get(me);ve===void 0&&(ve=new WeakMap,f.set(me,ve));let P=ve.get(L);P===void 0&&(P=n.getUniformBlockIndex(me,L.name),ve.set(L,P))}function we(L,me){const P=f.get(me).get(L);u.get(me)!==P&&(n.uniformBlockBinding(me,P,L.__bindingPointIndex),u.set(me,P))}function oe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},fe=null,pe={},m={},_=new WeakMap,g=[],p=null,h=!1,S=null,x=null,w=null,D=null,R=null,A=null,K=null,y=new rt(0,0,0),b=0,F=!1,I=null,X=null,C=null,k=null,z=null,xe.set(0,0,n.canvas.width,n.canvas.height),Ce.set(0,0,n.canvas.width,n.canvas.height),o.reset(),c.reset(),l.reset()}return{buffers:{color:o,depth:c,stencil:l},enable:$e,disable:ke,bindFramebuffer:st,drawBuffers:$,useProgram:Et,setBlending:Re,setMaterial:ht,setFlipSided:qe,setCullFace:E,setLineWidth:v,setPolygonOffset:W,setScissorTest:le,activeTexture:se,bindTexture:ue,unbindTexture:De,compressedTexImage2D:ye,compressedTexImage3D:be,texImage2D:Ne,texImage3D:Ee,updateUBOMapping:Fe,uniformBlockBinding:we,texStorage2D:Ze,texStorage3D:Xe,texSubImage2D:Oe,texSubImage3D:Ye,compressedTexSubImage2D:ie,compressedTexSubImage3D:ut,scissor:T,viewport:he,reset:oe}}function Ym(n,e,t,i,r,s,a){const o=r.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let f;const d=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(E,v){return m?new OffscreenCanvas(E,v):rs("canvas")}function g(E,v,W,le){let se=1;if((E.width>le||E.height>le)&&(se=le/Math.max(E.width,E.height)),se<1||v===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){const ue=v?is:Math.floor,De=ue(se*E.width),ye=ue(se*E.height);f===void 0&&(f=_(De,ye));const be=W?_(De,ye):f;return be.width=De,be.height=ye,be.getContext("2d").drawImage(E,0,0,De,ye),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+De+"x"+ye+")."),be}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function p(E){return ao(E.width)&&ao(E.height)}function h(E){return o?!1:E.wrapS!==hn||E.wrapT!==hn||E.minFilter!==Wt&&E.minFilter!==tn}function S(E,v){return E.generateMipmaps&&v&&E.minFilter!==Wt&&E.minFilter!==tn}function x(E){n.generateMipmap(E)}function w(E,v,W,le,se=!1){if(o===!1)return v;if(E!==null){if(n[E]!==void 0)return n[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let ue=v;if(v===n.RED&&(W===n.FLOAT&&(ue=n.R32F),W===n.HALF_FLOAT&&(ue=n.R16F),W===n.UNSIGNED_BYTE&&(ue=n.R8)),v===n.RED_INTEGER&&(W===n.UNSIGNED_BYTE&&(ue=n.R8UI),W===n.UNSIGNED_SHORT&&(ue=n.R16UI),W===n.UNSIGNED_INT&&(ue=n.R32UI),W===n.BYTE&&(ue=n.R8I),W===n.SHORT&&(ue=n.R16I),W===n.INT&&(ue=n.R32I)),v===n.RG&&(W===n.FLOAT&&(ue=n.RG32F),W===n.HALF_FLOAT&&(ue=n.RG16F),W===n.UNSIGNED_BYTE&&(ue=n.RG8)),v===n.RGBA){const De=se?Qr:ft.getTransfer(le);W===n.FLOAT&&(ue=n.RGBA32F),W===n.HALF_FLOAT&&(ue=n.RGBA16F),W===n.UNSIGNED_BYTE&&(ue=De===mt?n.SRGB8_ALPHA8:n.RGBA8),W===n.UNSIGNED_SHORT_4_4_4_4&&(ue=n.RGBA4),W===n.UNSIGNED_SHORT_5_5_5_1&&(ue=n.RGB5_A1)}return(ue===n.R16F||ue===n.R32F||ue===n.RG16F||ue===n.RG32F||ue===n.RGBA16F||ue===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ue}function D(E,v,W){return S(E,W)===!0||E.isFramebufferTexture&&E.minFilter!==Wt&&E.minFilter!==tn?Math.log2(Math.max(v.width,v.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?v.mipmaps.length:1}function R(E){return E===Wt||E===Xo||E===xs?n.NEAREST:n.LINEAR}function A(E){const v=E.target;v.removeEventListener("dispose",A),y(v),v.isVideoTexture&&u.delete(v)}function K(E){const v=E.target;v.removeEventListener("dispose",K),F(v)}function y(E){const v=i.get(E);if(v.__webglInit===void 0)return;const W=E.source,le=d.get(W);if(le){const se=le[v.__cacheKey];se.usedTimes--,se.usedTimes===0&&b(E),Object.keys(le).length===0&&d.delete(W)}i.remove(E)}function b(E){const v=i.get(E);n.deleteTexture(v.__webglTexture);const W=E.source,le=d.get(W);delete le[v.__cacheKey],a.memory.textures--}function F(E){const v=E.texture,W=i.get(E),le=i.get(v);if(le.__webglTexture!==void 0&&(n.deleteTexture(le.__webglTexture),a.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(W.__webglFramebuffer[se]))for(let ue=0;ue<W.__webglFramebuffer[se].length;ue++)n.deleteFramebuffer(W.__webglFramebuffer[se][ue]);else n.deleteFramebuffer(W.__webglFramebuffer[se]);W.__webglDepthbuffer&&n.deleteRenderbuffer(W.__webglDepthbuffer[se])}else{if(Array.isArray(W.__webglFramebuffer))for(let se=0;se<W.__webglFramebuffer.length;se++)n.deleteFramebuffer(W.__webglFramebuffer[se]);else n.deleteFramebuffer(W.__webglFramebuffer);if(W.__webglDepthbuffer&&n.deleteRenderbuffer(W.__webglDepthbuffer),W.__webglMultisampledFramebuffer&&n.deleteFramebuffer(W.__webglMultisampledFramebuffer),W.__webglColorRenderbuffer)for(let se=0;se<W.__webglColorRenderbuffer.length;se++)W.__webglColorRenderbuffer[se]&&n.deleteRenderbuffer(W.__webglColorRenderbuffer[se]);W.__webglDepthRenderbuffer&&n.deleteRenderbuffer(W.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let se=0,ue=v.length;se<ue;se++){const De=i.get(v[se]);De.__webglTexture&&(n.deleteTexture(De.__webglTexture),a.memory.textures--),i.remove(v[se])}i.remove(v),i.remove(E)}let I=0;function X(){I=0}function C(){const E=I;return E>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),I+=1,E}function k(E){const v=[];return v.push(E.wrapS),v.push(E.wrapT),v.push(E.wrapR||0),v.push(E.magFilter),v.push(E.minFilter),v.push(E.anisotropy),v.push(E.internalFormat),v.push(E.format),v.push(E.type),v.push(E.generateMipmaps),v.push(E.premultiplyAlpha),v.push(E.flipY),v.push(E.unpackAlignment),v.push(E.colorSpace),v.join()}function z(E,v){const W=i.get(E);if(E.isVideoTexture&&ht(E),E.isRenderTargetTexture===!1&&E.version>0&&W.__version!==E.version){const le=E.image;if(le===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(le.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{xe(W,E,v);return}}t.bindTexture(n.TEXTURE_2D,W.__webglTexture,n.TEXTURE0+v)}function J(E,v){const W=i.get(E);if(E.version>0&&W.__version!==E.version){xe(W,E,v);return}t.bindTexture(n.TEXTURE_2D_ARRAY,W.__webglTexture,n.TEXTURE0+v)}function Y(E,v){const W=i.get(E);if(E.version>0&&W.__version!==E.version){xe(W,E,v);return}t.bindTexture(n.TEXTURE_3D,W.__webglTexture,n.TEXTURE0+v)}function q(E,v){const W=i.get(E);if(E.version>0&&W.__version!==E.version){Ce(W,E,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture,n.TEXTURE0+v)}const Q={[io]:n.REPEAT,[hn]:n.CLAMP_TO_EDGE,[ro]:n.MIRRORED_REPEAT},fe={[Wt]:n.NEAREST,[Xo]:n.NEAREST_MIPMAP_NEAREST,[xs]:n.NEAREST_MIPMAP_LINEAR,[tn]:n.LINEAR,[_u]:n.LINEAR_MIPMAP_NEAREST,[dr]:n.LINEAR_MIPMAP_LINEAR},pe={[Cu]:n.NEVER,[Nu]:n.ALWAYS,[Lu]:n.LESS,[Yc]:n.LEQUAL,[Pu]:n.EQUAL,[Uu]:n.GEQUAL,[Du]:n.GREATER,[Iu]:n.NOTEQUAL};function H(E,v,W){if(W?(n.texParameteri(E,n.TEXTURE_WRAP_S,Q[v.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,Q[v.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,Q[v.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,fe[v.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,fe[v.minFilter])):(n.texParameteri(E,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(E,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(v.wrapS!==hn||v.wrapT!==hn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(E,n.TEXTURE_MAG_FILTER,R(v.magFilter)),n.texParameteri(E,n.TEXTURE_MIN_FILTER,R(v.minFilter)),v.minFilter!==Wt&&v.minFilter!==tn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),v.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,pe[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const le=e.get("EXT_texture_filter_anisotropic");if(v.magFilter===Wt||v.minFilter!==xs&&v.minFilter!==dr||v.type===Fn&&e.has("OES_texture_float_linear")===!1||o===!1&&v.type===fr&&e.has("OES_texture_half_float_linear")===!1)return;(v.anisotropy>1||i.get(v).__currentAnisotropy)&&(n.texParameterf(E,le.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy)}}function ee(E,v){let W=!1;E.__webglInit===void 0&&(E.__webglInit=!0,v.addEventListener("dispose",A));const le=v.source;let se=d.get(le);se===void 0&&(se={},d.set(le,se));const ue=k(v);if(ue!==E.__cacheKey){se[ue]===void 0&&(se[ue]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,W=!0),se[ue].usedTimes++;const De=se[E.__cacheKey];De!==void 0&&(se[E.__cacheKey].usedTimes--,De.usedTimes===0&&b(v)),E.__cacheKey=ue,E.__webglTexture=se[ue].texture}return W}function xe(E,v,W){let le=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(le=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(le=n.TEXTURE_3D);const se=ee(E,v),ue=v.source;t.bindTexture(le,E.__webglTexture,n.TEXTURE0+W);const De=i.get(ue);if(ue.version!==De.__version||se===!0){t.activeTexture(n.TEXTURE0+W);const ye=ft.getPrimaries(ft.workingColorSpace),be=v.colorSpace===on?null:ft.getPrimaries(v.colorSpace),Oe=v.colorSpace===on||ye===be?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Oe);const Ye=h(v)&&p(v.image)===!1;let ie=g(v.image,Ye,!1,r.maxTextureSize);ie=qe(v,ie);const ut=p(ie)||o,Ze=s.convert(v.format,v.colorSpace);let Xe=s.convert(v.type),Ne=w(v.internalFormat,Ze,Xe,v.colorSpace,v.isVideoTexture);H(le,v,ut);let Ee;const T=v.mipmaps,he=o&&v.isVideoTexture!==!0&&Ne!==$c,Fe=De.__version===void 0||se===!0,we=D(v,ie,ut);if(v.isDepthTexture)Ne=n.DEPTH_COMPONENT,o?v.type===Fn?Ne=n.DEPTH_COMPONENT32F:v.type===Nn?Ne=n.DEPTH_COMPONENT24:v.type===ni?Ne=n.DEPTH24_STENCIL8:Ne=n.DEPTH_COMPONENT16:v.type===Fn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),v.format===ii&&Ne===n.DEPTH_COMPONENT&&v.type!==_o&&v.type!==Nn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),v.type=Nn,Xe=s.convert(v.type)),v.format===Wi&&Ne===n.DEPTH_COMPONENT&&(Ne=n.DEPTH_STENCIL,v.type!==ni&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),v.type=ni,Xe=s.convert(v.type))),Fe&&(he?t.texStorage2D(n.TEXTURE_2D,1,Ne,ie.width,ie.height):t.texImage2D(n.TEXTURE_2D,0,Ne,ie.width,ie.height,0,Ze,Xe,null));else if(v.isDataTexture)if(T.length>0&&ut){he&&Fe&&t.texStorage2D(n.TEXTURE_2D,we,Ne,T[0].width,T[0].height);for(let oe=0,L=T.length;oe<L;oe++)Ee=T[oe],he?t.texSubImage2D(n.TEXTURE_2D,oe,0,0,Ee.width,Ee.height,Ze,Xe,Ee.data):t.texImage2D(n.TEXTURE_2D,oe,Ne,Ee.width,Ee.height,0,Ze,Xe,Ee.data);v.generateMipmaps=!1}else he?(Fe&&t.texStorage2D(n.TEXTURE_2D,we,Ne,ie.width,ie.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,ie.width,ie.height,Ze,Xe,ie.data)):t.texImage2D(n.TEXTURE_2D,0,Ne,ie.width,ie.height,0,Ze,Xe,ie.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){he&&Fe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,we,Ne,T[0].width,T[0].height,ie.depth);for(let oe=0,L=T.length;oe<L;oe++)Ee=T[oe],v.format!==dn?Ze!==null?he?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,0,Ee.width,Ee.height,ie.depth,Ze,Ee.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,oe,Ne,Ee.width,Ee.height,ie.depth,0,Ee.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):he?t.texSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,0,Ee.width,Ee.height,ie.depth,Ze,Xe,Ee.data):t.texImage3D(n.TEXTURE_2D_ARRAY,oe,Ne,Ee.width,Ee.height,ie.depth,0,Ze,Xe,Ee.data)}else{he&&Fe&&t.texStorage2D(n.TEXTURE_2D,we,Ne,T[0].width,T[0].height);for(let oe=0,L=T.length;oe<L;oe++)Ee=T[oe],v.format!==dn?Ze!==null?he?t.compressedTexSubImage2D(n.TEXTURE_2D,oe,0,0,Ee.width,Ee.height,Ze,Ee.data):t.compressedTexImage2D(n.TEXTURE_2D,oe,Ne,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):he?t.texSubImage2D(n.TEXTURE_2D,oe,0,0,Ee.width,Ee.height,Ze,Xe,Ee.data):t.texImage2D(n.TEXTURE_2D,oe,Ne,Ee.width,Ee.height,0,Ze,Xe,Ee.data)}else if(v.isDataArrayTexture)he?(Fe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,we,Ne,ie.width,ie.height,ie.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,Ze,Xe,ie.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ne,ie.width,ie.height,ie.depth,0,Ze,Xe,ie.data);else if(v.isData3DTexture)he?(Fe&&t.texStorage3D(n.TEXTURE_3D,we,Ne,ie.width,ie.height,ie.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,Ze,Xe,ie.data)):t.texImage3D(n.TEXTURE_3D,0,Ne,ie.width,ie.height,ie.depth,0,Ze,Xe,ie.data);else if(v.isFramebufferTexture){if(Fe)if(he)t.texStorage2D(n.TEXTURE_2D,we,Ne,ie.width,ie.height);else{let oe=ie.width,L=ie.height;for(let me=0;me<we;me++)t.texImage2D(n.TEXTURE_2D,me,Ne,oe,L,0,Ze,Xe,null),oe>>=1,L>>=1}}else if(T.length>0&&ut){he&&Fe&&t.texStorage2D(n.TEXTURE_2D,we,Ne,T[0].width,T[0].height);for(let oe=0,L=T.length;oe<L;oe++)Ee=T[oe],he?t.texSubImage2D(n.TEXTURE_2D,oe,0,0,Ze,Xe,Ee):t.texImage2D(n.TEXTURE_2D,oe,Ne,Ze,Xe,Ee);v.generateMipmaps=!1}else he?(Fe&&t.texStorage2D(n.TEXTURE_2D,we,Ne,ie.width,ie.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,Ze,Xe,ie)):t.texImage2D(n.TEXTURE_2D,0,Ne,Ze,Xe,ie);S(v,ut)&&x(le),De.__version=ue.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function Ce(E,v,W){if(v.image.length!==6)return;const le=ee(E,v),se=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+W);const ue=i.get(se);if(se.version!==ue.__version||le===!0){t.activeTexture(n.TEXTURE0+W);const De=ft.getPrimaries(ft.workingColorSpace),ye=v.colorSpace===on?null:ft.getPrimaries(v.colorSpace),be=v.colorSpace===on||De===ye?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const Oe=v.isCompressedTexture||v.image[0].isCompressedTexture,Ye=v.image[0]&&v.image[0].isDataTexture,ie=[];for(let oe=0;oe<6;oe++)!Oe&&!Ye?ie[oe]=g(v.image[oe],!1,!0,r.maxCubemapSize):ie[oe]=Ye?v.image[oe].image:v.image[oe],ie[oe]=qe(v,ie[oe]);const ut=ie[0],Ze=p(ut)||o,Xe=s.convert(v.format,v.colorSpace),Ne=s.convert(v.type),Ee=w(v.internalFormat,Xe,Ne,v.colorSpace),T=o&&v.isVideoTexture!==!0,he=ue.__version===void 0||le===!0;let Fe=D(v,ut,Ze);H(n.TEXTURE_CUBE_MAP,v,Ze);let we;if(Oe){T&&he&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Fe,Ee,ut.width,ut.height);for(let oe=0;oe<6;oe++){we=ie[oe].mipmaps;for(let L=0;L<we.length;L++){const me=we[L];v.format!==dn?Xe!==null?T?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,L,0,0,me.width,me.height,Xe,me.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,L,Ee,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):T?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,L,0,0,me.width,me.height,Xe,Ne,me.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,L,Ee,me.width,me.height,0,Xe,Ne,me.data)}}}else{we=v.mipmaps,T&&he&&(we.length>0&&Fe++,t.texStorage2D(n.TEXTURE_CUBE_MAP,Fe,Ee,ie[0].width,ie[0].height));for(let oe=0;oe<6;oe++)if(Ye){T?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,ie[oe].width,ie[oe].height,Xe,Ne,ie[oe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ee,ie[oe].width,ie[oe].height,0,Xe,Ne,ie[oe].data);for(let L=0;L<we.length;L++){const ve=we[L].image[oe].image;T?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,L+1,0,0,ve.width,ve.height,Xe,Ne,ve.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,L+1,Ee,ve.width,ve.height,0,Xe,Ne,ve.data)}}else{T?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Xe,Ne,ie[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ee,Xe,Ne,ie[oe]);for(let L=0;L<we.length;L++){const me=we[L];T?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,L+1,0,0,Xe,Ne,me.image[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,L+1,Ee,Xe,Ne,me.image[oe])}}}S(v,Ze)&&x(n.TEXTURE_CUBE_MAP),ue.__version=se.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function Pe(E,v,W,le,se,ue){const De=s.convert(W.format,W.colorSpace),ye=s.convert(W.type),be=w(W.internalFormat,De,ye,W.colorSpace);if(!i.get(v).__hasExternalTextures){const Ye=Math.max(1,v.width>>ue),ie=Math.max(1,v.height>>ue);se===n.TEXTURE_3D||se===n.TEXTURE_2D_ARRAY?t.texImage3D(se,ue,be,Ye,ie,v.depth,0,De,ye,null):t.texImage2D(se,ue,be,Ye,ie,0,De,ye,null)}t.bindFramebuffer(n.FRAMEBUFFER,E),Re(v)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,le,se,i.get(W).__webglTexture,0,He(v)):(se===n.TEXTURE_2D||se>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,le,se,i.get(W).__webglTexture,ue),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ze(E,v,W){if(n.bindRenderbuffer(n.RENDERBUFFER,E),v.depthBuffer&&!v.stencilBuffer){let le=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(W||Re(v)){const se=v.depthTexture;se&&se.isDepthTexture&&(se.type===Fn?le=n.DEPTH_COMPONENT32F:se.type===Nn&&(le=n.DEPTH_COMPONENT24));const ue=He(v);Re(v)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ue,le,v.width,v.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,ue,le,v.width,v.height)}else n.renderbufferStorage(n.RENDERBUFFER,le,v.width,v.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,E)}else if(v.depthBuffer&&v.stencilBuffer){const le=He(v);W&&Re(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,le,n.DEPTH24_STENCIL8,v.width,v.height):Re(v)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,le,n.DEPTH24_STENCIL8,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,E)}else{const le=v.isWebGLMultipleRenderTargets===!0?v.texture:[v.texture];for(let se=0;se<le.length;se++){const ue=le[se],De=s.convert(ue.format,ue.colorSpace),ye=s.convert(ue.type),be=w(ue.internalFormat,De,ye,ue.colorSpace),Oe=He(v);W&&Re(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Oe,be,v.width,v.height):Re(v)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Oe,be,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,be,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function $e(E,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,E),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),z(v.depthTexture,0);const le=i.get(v.depthTexture).__webglTexture,se=He(v);if(v.depthTexture.format===ii)Re(v)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,le,0,se):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,le,0);else if(v.depthTexture.format===Wi)Re(v)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,le,0,se):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,le,0);else throw new Error("Unknown depthTexture format")}function ke(E){const v=i.get(E),W=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!v.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");$e(v.__webglFramebuffer,E)}else if(W){v.__webglDepthbuffer=[];for(let le=0;le<6;le++)t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[le]),v.__webglDepthbuffer[le]=n.createRenderbuffer(),ze(v.__webglDepthbuffer[le],E,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer=n.createRenderbuffer(),ze(v.__webglDepthbuffer,E,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function st(E,v,W){const le=i.get(E);v!==void 0&&Pe(le.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),W!==void 0&&ke(E)}function $(E){const v=E.texture,W=i.get(E),le=i.get(v);E.addEventListener("dispose",K),E.isWebGLMultipleRenderTargets!==!0&&(le.__webglTexture===void 0&&(le.__webglTexture=n.createTexture()),le.__version=v.version,a.memory.textures++);const se=E.isWebGLCubeRenderTarget===!0,ue=E.isWebGLMultipleRenderTargets===!0,De=p(E)||o;if(se){W.__webglFramebuffer=[];for(let ye=0;ye<6;ye++)if(o&&v.mipmaps&&v.mipmaps.length>0){W.__webglFramebuffer[ye]=[];for(let be=0;be<v.mipmaps.length;be++)W.__webglFramebuffer[ye][be]=n.createFramebuffer()}else W.__webglFramebuffer[ye]=n.createFramebuffer()}else{if(o&&v.mipmaps&&v.mipmaps.length>0){W.__webglFramebuffer=[];for(let ye=0;ye<v.mipmaps.length;ye++)W.__webglFramebuffer[ye]=n.createFramebuffer()}else W.__webglFramebuffer=n.createFramebuffer();if(ue)if(r.drawBuffers){const ye=E.texture;for(let be=0,Oe=ye.length;be<Oe;be++){const Ye=i.get(ye[be]);Ye.__webglTexture===void 0&&(Ye.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&E.samples>0&&Re(E)===!1){const ye=ue?v:[v];W.__webglMultisampledFramebuffer=n.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let be=0;be<ye.length;be++){const Oe=ye[be];W.__webglColorRenderbuffer[be]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,W.__webglColorRenderbuffer[be]);const Ye=s.convert(Oe.format,Oe.colorSpace),ie=s.convert(Oe.type),ut=w(Oe.internalFormat,Ye,ie,Oe.colorSpace,E.isXRRenderTarget===!0),Ze=He(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ze,ut,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,W.__webglColorRenderbuffer[be])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(W.__webglDepthRenderbuffer=n.createRenderbuffer(),ze(W.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(se){t.bindTexture(n.TEXTURE_CUBE_MAP,le.__webglTexture),H(n.TEXTURE_CUBE_MAP,v,De);for(let ye=0;ye<6;ye++)if(o&&v.mipmaps&&v.mipmaps.length>0)for(let be=0;be<v.mipmaps.length;be++)Pe(W.__webglFramebuffer[ye][be],E,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ye,be);else Pe(W.__webglFramebuffer[ye],E,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0);S(v,De)&&x(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){const ye=E.texture;for(let be=0,Oe=ye.length;be<Oe;be++){const Ye=ye[be],ie=i.get(Ye);t.bindTexture(n.TEXTURE_2D,ie.__webglTexture),H(n.TEXTURE_2D,Ye,De),Pe(W.__webglFramebuffer,E,Ye,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,0),S(Ye,De)&&x(n.TEXTURE_2D)}t.unbindTexture()}else{let ye=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(o?ye=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ye,le.__webglTexture),H(ye,v,De),o&&v.mipmaps&&v.mipmaps.length>0)for(let be=0;be<v.mipmaps.length;be++)Pe(W.__webglFramebuffer[be],E,v,n.COLOR_ATTACHMENT0,ye,be);else Pe(W.__webglFramebuffer,E,v,n.COLOR_ATTACHMENT0,ye,0);S(v,De)&&x(ye),t.unbindTexture()}E.depthBuffer&&ke(E)}function Et(E){const v=p(E)||o,W=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let le=0,se=W.length;le<se;le++){const ue=W[le];if(S(ue,v)){const De=E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,ye=i.get(ue).__webglTexture;t.bindTexture(De,ye),x(De),t.unbindTexture()}}}function Ue(E){if(o&&E.samples>0&&Re(E)===!1){const v=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],W=E.width,le=E.height;let se=n.COLOR_BUFFER_BIT;const ue=[],De=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ye=i.get(E),be=E.isWebGLMultipleRenderTargets===!0;if(be)for(let Oe=0;Oe<v.length;Oe++)t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Oe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Oe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let Oe=0;Oe<v.length;Oe++){ue.push(n.COLOR_ATTACHMENT0+Oe),E.depthBuffer&&ue.push(De);const Ye=ye.__ignoreDepthValues!==void 0?ye.__ignoreDepthValues:!1;if(Ye===!1&&(E.depthBuffer&&(se|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&(se|=n.STENCIL_BUFFER_BIT)),be&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ye.__webglColorRenderbuffer[Oe]),Ye===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[De]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[De])),be){const ie=i.get(v[Oe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ie,0)}n.blitFramebuffer(0,0,W,le,0,0,W,le,se,n.NEAREST),l&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ue)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),be)for(let Oe=0;Oe<v.length;Oe++){t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Oe,n.RENDERBUFFER,ye.__webglColorRenderbuffer[Oe]);const Ye=i.get(v[Oe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Oe,n.TEXTURE_2D,Ye,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}}function He(E){return Math.min(r.maxSamples,E.samples)}function Re(E){const v=i.get(E);return o&&E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function ht(E){const v=a.render.frame;u.get(E)!==v&&(u.set(E,v),E.update())}function qe(E,v){const W=E.colorSpace,le=E.format,se=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===oo||W!==An&&W!==on&&(ft.getTransfer(W)===mt?o===!1?e.has("EXT_sRGB")===!0&&le===dn?(E.format=oo,E.minFilter=tn,E.generateMipmaps=!1):v=Zc.sRGBToLinear(v):(le!==dn||se!==kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),v}this.allocateTextureUnit=C,this.resetTextureUnits=X,this.setTexture2D=z,this.setTexture2DArray=J,this.setTexture3D=Y,this.setTextureCube=q,this.rebindTextures=st,this.setupRenderTarget=$,this.updateRenderTargetMipmap=Et,this.updateMultisampleRenderTarget=Ue,this.setupDepthRenderbuffer=ke,this.setupFrameBufferTexture=Pe,this.useMultisampledRTT=Re}function Km(n,e,t){const i=t.isWebGL2;function r(s,a=on){let o;const c=ft.getTransfer(a);if(s===kn)return n.UNSIGNED_BYTE;if(s===Hc)return n.UNSIGNED_SHORT_4_4_4_4;if(s===Gc)return n.UNSIGNED_SHORT_5_5_5_1;if(s===vu)return n.BYTE;if(s===xu)return n.SHORT;if(s===_o)return n.UNSIGNED_SHORT;if(s===kc)return n.INT;if(s===Nn)return n.UNSIGNED_INT;if(s===Fn)return n.FLOAT;if(s===fr)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===yu)return n.ALPHA;if(s===dn)return n.RGBA;if(s===Mu)return n.LUMINANCE;if(s===Su)return n.LUMINANCE_ALPHA;if(s===ii)return n.DEPTH_COMPONENT;if(s===Wi)return n.DEPTH_STENCIL;if(s===oo)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===Eu)return n.RED;if(s===Wc)return n.RED_INTEGER;if(s===bu)return n.RG;if(s===Vc)return n.RG_INTEGER;if(s===Xc)return n.RGBA_INTEGER;if(s===ys||s===Ms||s===Ss||s===Es)if(c===mt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===ys)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Ms)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Ss)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Es)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===ys)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Ms)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Ss)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Es)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===$o||s===jo||s===qo||s===Yo)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===$o)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===jo)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===qo)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Yo)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===$c)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Ko||s===Zo)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===Ko)return c===mt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Zo)return c===mt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Jo||s===Qo||s===ea||s===ta||s===na||s===ia||s===ra||s===sa||s===oa||s===aa||s===ca||s===la||s===ua||s===ha)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Jo)return c===mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Qo)return c===mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===ea)return c===mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===ta)return c===mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===na)return c===mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===ia)return c===mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===ra)return c===mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===sa)return c===mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===oa)return c===mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===aa)return c===mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===ca)return c===mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===la)return c===mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===ua)return c===mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===ha)return c===mt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===bs||s===da||s===fa)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===bs)return c===mt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===da)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===fa)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===wu||s===pa||s===ma||s===ga)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===bs)return o.COMPRESSED_RED_RGTC1_EXT;if(s===pa)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===ma)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===ga)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===ni?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class Zm extends rn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Hr extends Tt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Jm={type:"move"};class js{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Hr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Hr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Hr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const g of e.hand.values()){const p=t.getJointPose(g,i),h=this._getHandJoint(l,g);p!==null&&(h.matrix.fromArray(p.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=p.radius),h.visible=p!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=u.position.distanceTo(f.position),m=.02,_=.005;l.inputState.pinching&&d>m+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=m-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Jm)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Hr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Qm extends li{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,f=null,d=null,m=null,_=null;const g=t.getContextAttributes();let p=null,h=null;const S=[],x=[],w=new We;let D=null;const R=new rn;R.layers.enable(1),R.viewport=new Nt;const A=new rn;A.layers.enable(2),A.viewport=new Nt;const K=[R,A],y=new Zm;y.layers.enable(1),y.layers.enable(2);let b=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let ee=S[H];return ee===void 0&&(ee=new js,S[H]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(H){let ee=S[H];return ee===void 0&&(ee=new js,S[H]=ee),ee.getGripSpace()},this.getHand=function(H){let ee=S[H];return ee===void 0&&(ee=new js,S[H]=ee),ee.getHandSpace()};function I(H){const ee=x.indexOf(H.inputSource);if(ee===-1)return;const xe=S[ee];xe!==void 0&&(xe.update(H.inputSource,H.frame,l||a),xe.dispatchEvent({type:H.type,data:H.inputSource}))}function X(){r.removeEventListener("select",I),r.removeEventListener("selectstart",I),r.removeEventListener("selectend",I),r.removeEventListener("squeeze",I),r.removeEventListener("squeezestart",I),r.removeEventListener("squeezeend",I),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",C);for(let H=0;H<S.length;H++){const ee=x[H];ee!==null&&(x[H]=null,S[H].disconnect(ee))}b=null,F=null,e.setRenderTarget(p),m=null,d=null,f=null,r=null,h=null,pe.stop(),i.isPresenting=!1,e.setPixelRatio(D),e.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){s=H,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){o=H,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(H){l=H},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(H){if(r=H,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",I),r.addEventListener("selectstart",I),r.addEventListener("selectend",I),r.addEventListener("squeeze",I),r.addEventListener("squeezestart",I),r.addEventListener("squeezeend",I),r.addEventListener("end",X),r.addEventListener("inputsourceschange",C),g.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(w),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const ee={antialias:r.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,ee),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),h=new oi(m.framebufferWidth,m.framebufferHeight,{format:dn,type:kn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let ee=null,xe=null,Ce=null;g.depth&&(Ce=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=g.stencil?Wi:ii,xe=g.stencil?ni:Nn);const Pe={colorFormat:t.RGBA8,depthFormat:Ce,scaleFactor:s};f=new XRWebGLBinding(r,t),d=f.createProjectionLayer(Pe),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),h=new oi(d.textureWidth,d.textureHeight,{format:dn,type:kn,depthTexture:new cl(d.textureWidth,d.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0});const ze=e.properties.get(h);ze.__ignoreDepthValues=d.ignoreDepthValues}h.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),pe.setContext(r),pe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function C(H){for(let ee=0;ee<H.removed.length;ee++){const xe=H.removed[ee],Ce=x.indexOf(xe);Ce>=0&&(x[Ce]=null,S[Ce].disconnect(xe))}for(let ee=0;ee<H.added.length;ee++){const xe=H.added[ee];let Ce=x.indexOf(xe);if(Ce===-1){for(let ze=0;ze<S.length;ze++)if(ze>=x.length){x.push(xe),Ce=ze;break}else if(x[ze]===null){x[ze]=xe,Ce=ze;break}if(Ce===-1)break}const Pe=S[Ce];Pe&&Pe.connect(xe)}}const k=new U,z=new U;function J(H,ee,xe){k.setFromMatrixPosition(ee.matrixWorld),z.setFromMatrixPosition(xe.matrixWorld);const Ce=k.distanceTo(z),Pe=ee.projectionMatrix.elements,ze=xe.projectionMatrix.elements,$e=Pe[14]/(Pe[10]-1),ke=Pe[14]/(Pe[10]+1),st=(Pe[9]+1)/Pe[5],$=(Pe[9]-1)/Pe[5],Et=(Pe[8]-1)/Pe[0],Ue=(ze[8]+1)/ze[0],He=$e*Et,Re=$e*Ue,ht=Ce/(-Et+Ue),qe=ht*-Et;ee.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(qe),H.translateZ(ht),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert();const E=$e+ht,v=ke+ht,W=He-qe,le=Re+(Ce-qe),se=st*ke/v*E,ue=$*ke/v*E;H.projectionMatrix.makePerspective(W,le,se,ue,E,v),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}function Y(H,ee){ee===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(ee.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(r===null)return;y.near=A.near=R.near=H.near,y.far=A.far=R.far=H.far,(b!==y.near||F!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),b=y.near,F=y.far);const ee=H.parent,xe=y.cameras;Y(y,ee);for(let Ce=0;Ce<xe.length;Ce++)Y(xe[Ce],ee);xe.length===2?J(y,R,A):y.projectionMatrix.copy(R.projectionMatrix),q(H,y,ee)};function q(H,ee,xe){xe===null?H.matrix.copy(ee.matrixWorld):(H.matrix.copy(xe.matrixWorld),H.matrix.invert(),H.matrix.multiply(ee.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(ee.projectionMatrix),H.projectionMatrixInverse.copy(ee.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=pr*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&m===null))return c},this.setFoveation=function(H){c=H,d!==null&&(d.fixedFoveation=H),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=H)};let Q=null;function fe(H,ee){if(u=ee.getViewerPose(l||a),_=ee,u!==null){const xe=u.views;m!==null&&(e.setRenderTargetFramebuffer(h,m.framebuffer),e.setRenderTarget(h));let Ce=!1;xe.length!==y.cameras.length&&(y.cameras.length=0,Ce=!0);for(let Pe=0;Pe<xe.length;Pe++){const ze=xe[Pe];let $e=null;if(m!==null)$e=m.getViewport(ze);else{const st=f.getViewSubImage(d,ze);$e=st.viewport,Pe===0&&(e.setRenderTargetTextures(h,st.colorTexture,d.ignoreDepthValues?void 0:st.depthStencilTexture),e.setRenderTarget(h))}let ke=K[Pe];ke===void 0&&(ke=new rn,ke.layers.enable(Pe),ke.viewport=new Nt,K[Pe]=ke),ke.matrix.fromArray(ze.transform.matrix),ke.matrix.decompose(ke.position,ke.quaternion,ke.scale),ke.projectionMatrix.fromArray(ze.projectionMatrix),ke.projectionMatrixInverse.copy(ke.projectionMatrix).invert(),ke.viewport.set($e.x,$e.y,$e.width,$e.height),Pe===0&&(y.matrix.copy(ke.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),Ce===!0&&y.cameras.push(ke)}}for(let xe=0;xe<S.length;xe++){const Ce=x[xe],Pe=S[xe];Ce!==null&&Pe!==void 0&&Pe.update(Ce,ee,l||a)}Q&&Q(H,ee),ee.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ee}),_=null}const pe=new ol;pe.setAnimationLoop(fe),this.setAnimationLoop=function(H){Q=H},this.dispose=function(){}}}function eg(n,e){function t(p,h){p.matrixAutoUpdate===!0&&p.updateMatrix(),h.value.copy(p.matrix)}function i(p,h){h.color.getRGB(p.fogColor.value,il(n)),h.isFog?(p.fogNear.value=h.near,p.fogFar.value=h.far):h.isFogExp2&&(p.fogDensity.value=h.density)}function r(p,h,S,x,w){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(p,h):h.isMeshToonMaterial?(s(p,h),f(p,h)):h.isMeshPhongMaterial?(s(p,h),u(p,h)):h.isMeshStandardMaterial?(s(p,h),d(p,h),h.isMeshPhysicalMaterial&&m(p,h,w)):h.isMeshMatcapMaterial?(s(p,h),_(p,h)):h.isMeshDepthMaterial?s(p,h):h.isMeshDistanceMaterial?(s(p,h),g(p,h)):h.isMeshNormalMaterial?s(p,h):h.isLineBasicMaterial?(a(p,h),h.isLineDashedMaterial&&o(p,h)):h.isPointsMaterial?c(p,h,S,x):h.isSpriteMaterial?l(p,h):h.isShadowMaterial?(p.color.value.copy(h.color),p.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(p,h){p.opacity.value=h.opacity,h.color&&p.diffuse.value.copy(h.color),h.emissive&&p.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.bumpMap&&(p.bumpMap.value=h.bumpMap,t(h.bumpMap,p.bumpMapTransform),p.bumpScale.value=h.bumpScale,h.side===Vt&&(p.bumpScale.value*=-1)),h.normalMap&&(p.normalMap.value=h.normalMap,t(h.normalMap,p.normalMapTransform),p.normalScale.value.copy(h.normalScale),h.side===Vt&&p.normalScale.value.negate()),h.displacementMap&&(p.displacementMap.value=h.displacementMap,t(h.displacementMap,p.displacementMapTransform),p.displacementScale.value=h.displacementScale,p.displacementBias.value=h.displacementBias),h.emissiveMap&&(p.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,p.emissiveMapTransform)),h.specularMap&&(p.specularMap.value=h.specularMap,t(h.specularMap,p.specularMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest);const S=e.get(h).envMap;if(S&&(p.envMap.value=S,p.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=h.reflectivity,p.ior.value=h.ior,p.refractionRatio.value=h.refractionRatio),h.lightMap){p.lightMap.value=h.lightMap;const x=n._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=h.lightMapIntensity*x,t(h.lightMap,p.lightMapTransform)}h.aoMap&&(p.aoMap.value=h.aoMap,p.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,p.aoMapTransform))}function a(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform))}function o(p,h){p.dashSize.value=h.dashSize,p.totalSize.value=h.dashSize+h.gapSize,p.scale.value=h.scale}function c(p,h,S,x){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.size.value=h.size*S,p.scale.value=x*.5,h.map&&(p.map.value=h.map,t(h.map,p.uvTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function l(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.rotation.value=h.rotation,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function u(p,h){p.specular.value.copy(h.specular),p.shininess.value=Math.max(h.shininess,1e-4)}function f(p,h){h.gradientMap&&(p.gradientMap.value=h.gradientMap)}function d(p,h){p.metalness.value=h.metalness,h.metalnessMap&&(p.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,p.metalnessMapTransform)),p.roughness.value=h.roughness,h.roughnessMap&&(p.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,p.roughnessMapTransform)),e.get(h).envMap&&(p.envMapIntensity.value=h.envMapIntensity)}function m(p,h,S){p.ior.value=h.ior,h.sheen>0&&(p.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),p.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(p.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,p.sheenColorMapTransform)),h.sheenRoughnessMap&&(p.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,p.sheenRoughnessMapTransform))),h.clearcoat>0&&(p.clearcoat.value=h.clearcoat,p.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(p.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,p.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(p.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Vt&&p.clearcoatNormalScale.value.negate())),h.iridescence>0&&(p.iridescence.value=h.iridescence,p.iridescenceIOR.value=h.iridescenceIOR,p.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(p.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,p.iridescenceMapTransform)),h.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),h.transmission>0&&(p.transmission.value=h.transmission,p.transmissionSamplerMap.value=S.texture,p.transmissionSamplerSize.value.set(S.width,S.height),h.transmissionMap&&(p.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,p.transmissionMapTransform)),p.thickness.value=h.thickness,h.thicknessMap&&(p.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=h.attenuationDistance,p.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(p.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(p.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=h.specularIntensity,p.specularColor.value.copy(h.specularColor),h.specularColorMap&&(p.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,p.specularColorMapTransform)),h.specularIntensityMap&&(p.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,h){h.matcap&&(p.matcap.value=h.matcap)}function g(p,h){const S=e.get(h).light;p.referencePosition.value.setFromMatrixPosition(S.matrixWorld),p.nearDistance.value=S.shadow.camera.near,p.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function tg(n,e,t,i){let r={},s={},a=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(S,x){const w=x.program;i.uniformBlockBinding(S,w)}function l(S,x){let w=r[S.id];w===void 0&&(_(S),w=u(S),r[S.id]=w,S.addEventListener("dispose",p));const D=x.program;i.updateUBOMapping(S,D);const R=e.render.frame;s[S.id]!==R&&(d(S),s[S.id]=R)}function u(S){const x=f();S.__bindingPointIndex=x;const w=n.createBuffer(),D=S.__size,R=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,w),n.bufferData(n.UNIFORM_BUFFER,D,R),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,w),w}function f(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const x=r[S.id],w=S.uniforms,D=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let R=0,A=w.length;R<A;R++){const K=Array.isArray(w[R])?w[R]:[w[R]];for(let y=0,b=K.length;y<b;y++){const F=K[y];if(m(F,R,y,D)===!0){const I=F.__offset,X=Array.isArray(F.value)?F.value:[F.value];let C=0;for(let k=0;k<X.length;k++){const z=X[k],J=g(z);typeof z=="number"||typeof z=="boolean"?(F.__data[0]=z,n.bufferSubData(n.UNIFORM_BUFFER,I+C,F.__data)):z.isMatrix3?(F.__data[0]=z.elements[0],F.__data[1]=z.elements[1],F.__data[2]=z.elements[2],F.__data[3]=0,F.__data[4]=z.elements[3],F.__data[5]=z.elements[4],F.__data[6]=z.elements[5],F.__data[7]=0,F.__data[8]=z.elements[6],F.__data[9]=z.elements[7],F.__data[10]=z.elements[8],F.__data[11]=0):(z.toArray(F.__data,C),C+=J.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,I,F.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(S,x,w,D){const R=S.value,A=x+"_"+w;if(D[A]===void 0)return typeof R=="number"||typeof R=="boolean"?D[A]=R:D[A]=R.clone(),!0;{const K=D[A];if(typeof R=="number"||typeof R=="boolean"){if(K!==R)return D[A]=R,!0}else if(K.equals(R)===!1)return K.copy(R),!0}return!1}function _(S){const x=S.uniforms;let w=0;const D=16;for(let A=0,K=x.length;A<K;A++){const y=Array.isArray(x[A])?x[A]:[x[A]];for(let b=0,F=y.length;b<F;b++){const I=y[b],X=Array.isArray(I.value)?I.value:[I.value];for(let C=0,k=X.length;C<k;C++){const z=X[C],J=g(z),Y=w%D;Y!==0&&D-Y<J.boundary&&(w+=D-Y),I.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=w,w+=J.storage}}}const R=w%D;return R>0&&(w+=D-R),S.__size=w,S.__cache={},this}function g(S){const x={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(x.boundary=4,x.storage=4):S.isVector2?(x.boundary=8,x.storage=8):S.isVector3||S.isColor?(x.boundary=16,x.storage=12):S.isVector4?(x.boundary=16,x.storage=16):S.isMatrix3?(x.boundary=48,x.storage=48):S.isMatrix4?(x.boundary=64,x.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),x}function p(S){const x=S.target;x.removeEventListener("dispose",p);const w=a.indexOf(x.__bindingPointIndex);a.splice(w,1),n.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function h(){for(const S in r)n.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:c,update:l,dispose:h}}class pl{constructor(e={}){const{canvas:t=Ku(),context:i=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=a;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const h=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=It,this._useLegacyLights=!1,this.toneMapping=zn,this.toneMappingExposure=1;const x=this;let w=!1,D=0,R=0,A=null,K=-1,y=null;const b=new Nt,F=new Nt;let I=null;const X=new rt(0);let C=0,k=t.width,z=t.height,J=1,Y=null,q=null;const Q=new Nt(0,0,k,z),fe=new Nt(0,0,k,z);let pe=!1;const H=new So;let ee=!1,xe=!1,Ce=null;const Pe=new xt,ze=new We,$e=new U,ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function st(){return A===null?J:1}let $=i;function Et(M,N){for(let V=0;V<M.length;V++){const j=M[V],G=t.getContext(j,N);if(G!==null)return G}return null}try{const M={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${go}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",L,!1),t.addEventListener("webglcontextcreationerror",me,!1),$===null){const N=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&N.shift(),$=Et(N,M),$===null)throw Et(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&$ instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),$.getShaderPrecisionFormat===void 0&&($.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let Ue,He,Re,ht,qe,E,v,W,le,se,ue,De,ye,be,Oe,Ye,ie,ut,Ze,Xe,Ne,Ee,T,he;function Fe(){Ue=new hp($),He=new sp($,Ue,e),Ue.init(He),Ee=new Km($,Ue,He),Re=new qm($,Ue,He),ht=new pp($),qe=new Um,E=new Ym($,Ue,Re,qe,He,Ee,ht),v=new ap(x),W=new up(x),le=new Mh($,He),T=new ip($,Ue,le,He),se=new dp($,le,ht,T),ue=new vp($,se,le,ht),Ze=new _p($,He,E),Ye=new op(qe),De=new Im(x,v,W,Ue,He,T,Ye),ye=new eg(x,qe),be=new Fm,Oe=new Gm(Ue,He),ut=new np(x,v,W,Re,ue,d,c),ie=new jm(x,ue,He),he=new tg($,ht,He,Re),Xe=new rp($,Ue,ht,He),Ne=new fp($,Ue,ht,He),ht.programs=De.programs,x.capabilities=He,x.extensions=Ue,x.properties=qe,x.renderLists=be,x.shadowMap=ie,x.state=Re,x.info=ht}Fe();const we=new Qm(x,$);this.xr=we,this.getContext=function(){return $},this.getContextAttributes=function(){return $.getContextAttributes()},this.forceContextLoss=function(){const M=Ue.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Ue.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(M){M!==void 0&&(J=M,this.setSize(k,z,!1))},this.getSize=function(M){return M.set(k,z)},this.setSize=function(M,N,V=!0){if(we.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=M,z=N,t.width=Math.floor(M*J),t.height=Math.floor(N*J),V===!0&&(t.style.width=M+"px",t.style.height=N+"px"),this.setViewport(0,0,M,N)},this.getDrawingBufferSize=function(M){return M.set(k*J,z*J).floor()},this.setDrawingBufferSize=function(M,N,V){k=M,z=N,J=V,t.width=Math.floor(M*V),t.height=Math.floor(N*V),this.setViewport(0,0,M,N)},this.getCurrentViewport=function(M){return M.copy(b)},this.getViewport=function(M){return M.copy(Q)},this.setViewport=function(M,N,V,j){M.isVector4?Q.set(M.x,M.y,M.z,M.w):Q.set(M,N,V,j),Re.viewport(b.copy(Q).multiplyScalar(J).floor())},this.getScissor=function(M){return M.copy(fe)},this.setScissor=function(M,N,V,j){M.isVector4?fe.set(M.x,M.y,M.z,M.w):fe.set(M,N,V,j),Re.scissor(F.copy(fe).multiplyScalar(J).floor())},this.getScissorTest=function(){return pe},this.setScissorTest=function(M){Re.setScissorTest(pe=M)},this.setOpaqueSort=function(M){Y=M},this.setTransparentSort=function(M){q=M},this.getClearColor=function(M){return M.copy(ut.getClearColor())},this.setClearColor=function(){ut.setClearColor.apply(ut,arguments)},this.getClearAlpha=function(){return ut.getClearAlpha()},this.setClearAlpha=function(){ut.setClearAlpha.apply(ut,arguments)},this.clear=function(M=!0,N=!0,V=!0){let j=0;if(M){let G=!1;if(A!==null){const Se=A.texture.format;G=Se===Xc||Se===Vc||Se===Wc}if(G){const Se=A.texture.type,Le=Se===kn||Se===Nn||Se===_o||Se===ni||Se===Hc||Se===Gc,Be=ut.getClearColor(),je=ut.getClearAlpha(),it=Be.r,Je=Be.g,et=Be.b;Le?(m[0]=it,m[1]=Je,m[2]=et,m[3]=je,$.clearBufferuiv($.COLOR,0,m)):(_[0]=it,_[1]=Je,_[2]=et,_[3]=je,$.clearBufferiv($.COLOR,0,_))}else j|=$.COLOR_BUFFER_BIT}N&&(j|=$.DEPTH_BUFFER_BIT),V&&(j|=$.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",L,!1),t.removeEventListener("webglcontextcreationerror",me,!1),be.dispose(),Oe.dispose(),qe.dispose(),v.dispose(),W.dispose(),ue.dispose(),T.dispose(),he.dispose(),De.dispose(),we.dispose(),we.removeEventListener("sessionstart",Me),we.removeEventListener("sessionend",re),Ce&&(Ce.dispose(),Ce=null),Ae.stop()};function oe(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function L(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const M=ht.autoReset,N=ie.enabled,V=ie.autoUpdate,j=ie.needsUpdate,G=ie.type;Fe(),ht.autoReset=M,ie.enabled=N,ie.autoUpdate=V,ie.needsUpdate=j,ie.type=G}function me(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function ve(M){const N=M.target;N.removeEventListener("dispose",ve),P(N)}function P(M){B(M),qe.remove(M)}function B(M){const N=qe.get(M).programs;N!==void 0&&(N.forEach(function(V){De.releaseProgram(V)}),M.isShaderMaterial&&De.releaseShaderCache(M))}this.renderBufferDirect=function(M,N,V,j,G,Se){N===null&&(N=ke);const Le=G.isMesh&&G.matrixWorld.determinant()<0,Be=yt(M,N,V,j,G);Re.setMaterial(j,Le);let je=V.index,it=1;if(j.wireframe===!0){if(je=se.getWireframeAttribute(V),je===void 0)return;it=2}const Je=V.drawRange,et=V.attributes.position;let Mt=Je.start*it,jt=(Je.start+Je.count)*it;Se!==null&&(Mt=Math.max(Mt,Se.start*it),jt=Math.min(jt,(Se.start+Se.count)*it)),je!==null?(Mt=Math.max(Mt,0),jt=Math.min(jt,je.count)):et!=null&&(Mt=Math.max(Mt,0),jt=Math.min(jt,et.count));const Pt=jt-Mt;if(Pt<0||Pt===1/0)return;T.setup(G,j,Be,V,je);let gn,gt=Xe;if(je!==null&&(gn=le.get(je),gt=Ne,gt.setIndex(gn)),G.isMesh)j.wireframe===!0?(Re.setLineWidth(j.wireframeLinewidth*st()),gt.setMode($.LINES)):gt.setMode($.TRIANGLES);else if(G.isLine){let ot=j.linewidth;ot===void 0&&(ot=1),Re.setLineWidth(ot*st()),G.isLineSegments?gt.setMode($.LINES):G.isLineLoop?gt.setMode($.LINE_LOOP):gt.setMode($.LINE_STRIP)}else G.isPoints?gt.setMode($.POINTS):G.isSprite&&gt.setMode($.TRIANGLES);if(G.isBatchedMesh)gt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else if(G.isInstancedMesh)gt.renderInstances(Mt,Pt,G.count);else if(V.isInstancedBufferGeometry){const ot=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,ms=Math.min(V.instanceCount,ot);gt.renderInstances(Mt,Pt,ms)}else gt.render(Mt,Pt)};function Z(M,N,V){M.transparent===!0&&M.side===En&&M.forceSinglePass===!1?(M.side=Vt,M.needsUpdate=!0,Ie(M,N,V),M.side=Hn,M.needsUpdate=!0,Ie(M,N,V),M.side=En):Ie(M,N,V)}this.compile=function(M,N,V=null){V===null&&(V=M),p=Oe.get(V),p.init(),S.push(p),V.traverseVisible(function(G){G.isLight&&G.layers.test(N.layers)&&(p.pushLight(G),G.castShadow&&p.pushShadow(G))}),M!==V&&M.traverseVisible(function(G){G.isLight&&G.layers.test(N.layers)&&(p.pushLight(G),G.castShadow&&p.pushShadow(G))}),p.setupLights(x._useLegacyLights);const j=new Set;return M.traverse(function(G){const Se=G.material;if(Se)if(Array.isArray(Se))for(let Le=0;Le<Se.length;Le++){const Be=Se[Le];Z(Be,V,G),j.add(Be)}else Z(Se,V,G),j.add(Se)}),S.pop(),p=null,j},this.compileAsync=function(M,N,V=null){const j=this.compile(M,N,V);return new Promise(G=>{function Se(){if(j.forEach(function(Le){qe.get(Le).currentProgram.isReady()&&j.delete(Le)}),j.size===0){G(M);return}setTimeout(Se,10)}Ue.get("KHR_parallel_shader_compile")!==null?Se():setTimeout(Se,10)})};let ae=null;function ge(M){ae&&ae(M)}function Me(){Ae.stop()}function re(){Ae.start()}const Ae=new ol;Ae.setAnimationLoop(ge),typeof self<"u"&&Ae.setContext(self),this.setAnimationLoop=function(M){ae=M,we.setAnimationLoop(M),M===null?Ae.stop():Ae.start()},we.addEventListener("sessionstart",Me),we.addEventListener("sessionend",re),this.render=function(M,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),we.enabled===!0&&we.isPresenting===!0&&(we.cameraAutoUpdate===!0&&we.updateCamera(N),N=we.getCamera()),M.isScene===!0&&M.onBeforeRender(x,M,N,A),p=Oe.get(M,S.length),p.init(),S.push(p),Pe.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),H.setFromProjectionMatrix(Pe),xe=this.localClippingEnabled,ee=Ye.init(this.clippingPlanes,xe),g=be.get(M,h.length),g.init(),h.push(g),Te(M,N,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(Y,q),this.info.render.frame++,ee===!0&&Ye.beginShadows();const V=p.state.shadowsArray;if(ie.render(V,M,N),ee===!0&&Ye.endShadows(),this.info.autoReset===!0&&this.info.reset(),ut.render(g,M),p.setupLights(x._useLegacyLights),N.isArrayCamera){const j=N.cameras;for(let G=0,Se=j.length;G<Se;G++){const Le=j[G];tt(g,M,Le,Le.viewport)}}else tt(g,M,N);A!==null&&(E.updateMultisampleRenderTarget(A),E.updateRenderTargetMipmap(A)),M.isScene===!0&&M.onAfterRender(x,M,N),T.resetDefaultState(),K=-1,y=null,S.pop(),S.length>0?p=S[S.length-1]:p=null,h.pop(),h.length>0?g=h[h.length-1]:g=null};function Te(M,N,V,j){if(M.visible===!1)return;if(M.layers.test(N.layers)){if(M.isGroup)V=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(N);else if(M.isLight)p.pushLight(M),M.castShadow&&p.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||H.intersectsSprite(M)){j&&$e.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Pe);const Le=ue.update(M),Be=M.material;Be.visible&&g.push(M,Le,Be,V,$e.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||H.intersectsObject(M))){const Le=ue.update(M),Be=M.material;if(j&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),$e.copy(M.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),$e.copy(Le.boundingSphere.center)),$e.applyMatrix4(M.matrixWorld).applyMatrix4(Pe)),Array.isArray(Be)){const je=Le.groups;for(let it=0,Je=je.length;it<Je;it++){const et=je[it],Mt=Be[et.materialIndex];Mt&&Mt.visible&&g.push(M,Le,Mt,V,$e.z,et)}}else Be.visible&&g.push(M,Le,Be,V,$e.z,null)}}const Se=M.children;for(let Le=0,Be=Se.length;Le<Be;Le++)Te(Se[Le],N,V,j)}function tt(M,N,V,j){const G=M.opaque,Se=M.transmissive,Le=M.transparent;p.setupLightsView(V),ee===!0&&Ye.setGlobalState(x.clippingPlanes,V),Se.length>0&&Ke(G,Se,N,V),j&&Re.viewport(b.copy(j)),G.length>0&&de(G,N,V),Se.length>0&&de(Se,N,V),Le.length>0&&de(Le,N,V),Re.buffers.depth.setTest(!0),Re.buffers.depth.setMask(!0),Re.buffers.color.setMask(!0),Re.setPolygonOffset(!1)}function Ke(M,N,V,j){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;const Se=He.isWebGL2;Ce===null&&(Ce=new oi(1,1,{generateMipmaps:!0,type:Ue.has("EXT_color_buffer_half_float")?fr:kn,minFilter:dr,samples:Se?4:0})),x.getDrawingBufferSize(ze),Se?Ce.setSize(ze.x,ze.y):Ce.setSize(is(ze.x),is(ze.y));const Le=x.getRenderTarget();x.setRenderTarget(Ce),x.getClearColor(X),C=x.getClearAlpha(),C<1&&x.setClearColor(16777215,.5),x.clear();const Be=x.toneMapping;x.toneMapping=zn,de(M,V,j),E.updateMultisampleRenderTarget(Ce),E.updateRenderTargetMipmap(Ce);let je=!1;for(let it=0,Je=N.length;it<Je;it++){const et=N[it],Mt=et.object,jt=et.geometry,Pt=et.material,gn=et.group;if(Pt.side===En&&Mt.layers.test(j.layers)){const gt=Pt.side;Pt.side=Vt,Pt.needsUpdate=!0,Ge(Mt,V,j,jt,Pt,gn),Pt.side=gt,Pt.needsUpdate=!0,je=!0}}je===!0&&(E.updateMultisampleRenderTarget(Ce),E.updateRenderTargetMipmap(Ce)),x.setRenderTarget(Le),x.setClearColor(X,C),x.toneMapping=Be}function de(M,N,V){const j=N.isScene===!0?N.overrideMaterial:null;for(let G=0,Se=M.length;G<Se;G++){const Le=M[G],Be=Le.object,je=Le.geometry,it=j===null?Le.material:j,Je=Le.group;Be.layers.test(V.layers)&&Ge(Be,N,V,je,it,Je)}}function Ge(M,N,V,j,G,Se){M.onBeforeRender(x,N,V,j,G,Se),M.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),G.onBeforeRender(x,N,V,j,M,Se),G.transparent===!0&&G.side===En&&G.forceSinglePass===!1?(G.side=Vt,G.needsUpdate=!0,x.renderBufferDirect(V,N,j,G,M,Se),G.side=Hn,G.needsUpdate=!0,x.renderBufferDirect(V,N,j,G,M,Se),G.side=En):x.renderBufferDirect(V,N,j,G,M,Se),M.onAfterRender(x,N,V,j,G,Se)}function Ie(M,N,V){N.isScene!==!0&&(N=ke);const j=qe.get(M),G=p.state.lights,Se=p.state.shadowsArray,Le=G.state.version,Be=De.getParameters(M,G.state,Se,N,V),je=De.getProgramCacheKey(Be);let it=j.programs;j.environment=M.isMeshStandardMaterial?N.environment:null,j.fog=N.fog,j.envMap=(M.isMeshStandardMaterial?W:v).get(M.envMap||j.environment),it===void 0&&(M.addEventListener("dispose",ve),it=new Map,j.programs=it);let Je=it.get(je);if(Je!==void 0){if(j.currentProgram===Je&&j.lightsStateVersion===Le)return pt(M,Be),Je}else Be.uniforms=De.getUniforms(M),M.onBuild(V,Be,x),M.onBeforeCompile(Be,x),Je=De.acquireProgram(Be,je),it.set(je,Je),j.uniforms=Be.uniforms;const et=j.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(et.clippingPlanes=Ye.uniform),pt(M,Be),j.needsLights=Lt(M),j.lightsStateVersion=Le,j.needsLights&&(et.ambientLightColor.value=G.state.ambient,et.lightProbe.value=G.state.probe,et.directionalLights.value=G.state.directional,et.directionalLightShadows.value=G.state.directionalShadow,et.spotLights.value=G.state.spot,et.spotLightShadows.value=G.state.spotShadow,et.rectAreaLights.value=G.state.rectArea,et.ltc_1.value=G.state.rectAreaLTC1,et.ltc_2.value=G.state.rectAreaLTC2,et.pointLights.value=G.state.point,et.pointLightShadows.value=G.state.pointShadow,et.hemisphereLights.value=G.state.hemi,et.directionalShadowMap.value=G.state.directionalShadowMap,et.directionalShadowMatrix.value=G.state.directionalShadowMatrix,et.spotShadowMap.value=G.state.spotShadowMap,et.spotLightMatrix.value=G.state.spotLightMatrix,et.spotLightMap.value=G.state.spotLightMap,et.pointShadowMap.value=G.state.pointShadowMap,et.pointShadowMatrix.value=G.state.pointShadowMatrix),j.currentProgram=Je,j.uniformsList=null,Je}function ct(M){if(M.uniformsList===null){const N=M.currentProgram.getUniforms();M.uniformsList=Kr.seqWithValue(N.seq,M.uniforms)}return M.uniformsList}function pt(M,N){const V=qe.get(M);V.outputColorSpace=N.outputColorSpace,V.batching=N.batching,V.instancing=N.instancing,V.instancingColor=N.instancingColor,V.skinning=N.skinning,V.morphTargets=N.morphTargets,V.morphNormals=N.morphNormals,V.morphColors=N.morphColors,V.morphTargetsCount=N.morphTargetsCount,V.numClippingPlanes=N.numClippingPlanes,V.numIntersection=N.numClipIntersection,V.vertexAlphas=N.vertexAlphas,V.vertexTangents=N.vertexTangents,V.toneMapping=N.toneMapping}function yt(M,N,V,j,G){N.isScene!==!0&&(N=ke),E.resetTextureUnits();const Se=N.fog,Le=j.isMeshStandardMaterial?N.environment:null,Be=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:An,je=(j.isMeshStandardMaterial?W:v).get(j.envMap||Le),it=j.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Je=!!V.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),et=!!V.morphAttributes.position,Mt=!!V.morphAttributes.normal,jt=!!V.morphAttributes.color;let Pt=zn;j.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Pt=x.toneMapping);const gn=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,gt=gn!==void 0?gn.length:0,ot=qe.get(j),ms=p.state.lights;if(ee===!0&&(xe===!0||M!==y)){const Qt=M===y&&j.id===K;Ye.setState(j,M,Qt)}let vt=!1;j.version===ot.__version?(ot.needsLights&&ot.lightsStateVersion!==ms.state.version||ot.outputColorSpace!==Be||G.isBatchedMesh&&ot.batching===!1||!G.isBatchedMesh&&ot.batching===!0||G.isInstancedMesh&&ot.instancing===!1||!G.isInstancedMesh&&ot.instancing===!0||G.isSkinnedMesh&&ot.skinning===!1||!G.isSkinnedMesh&&ot.skinning===!0||G.isInstancedMesh&&ot.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&ot.instancingColor===!1&&G.instanceColor!==null||ot.envMap!==je||j.fog===!0&&ot.fog!==Se||ot.numClippingPlanes!==void 0&&(ot.numClippingPlanes!==Ye.numPlanes||ot.numIntersection!==Ye.numIntersection)||ot.vertexAlphas!==it||ot.vertexTangents!==Je||ot.morphTargets!==et||ot.morphNormals!==Mt||ot.morphColors!==jt||ot.toneMapping!==Pt||He.isWebGL2===!0&&ot.morphTargetsCount!==gt)&&(vt=!0):(vt=!0,ot.__version=j.version);let Xn=ot.currentProgram;vt===!0&&(Xn=Ie(j,N,G));let Oo=!1,Ki=!1,gs=!1;const Ot=Xn.getUniforms(),$n=ot.uniforms;if(Re.useProgram(Xn.program)&&(Oo=!0,Ki=!0,gs=!0),j.id!==K&&(K=j.id,Ki=!0),Oo||y!==M){Ot.setValue($,"projectionMatrix",M.projectionMatrix),Ot.setValue($,"viewMatrix",M.matrixWorldInverse);const Qt=Ot.map.cameraPosition;Qt!==void 0&&Qt.setValue($,$e.setFromMatrixPosition(M.matrixWorld)),He.logarithmicDepthBuffer&&Ot.setValue($,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&Ot.setValue($,"isOrthographic",M.isOrthographicCamera===!0),y!==M&&(y=M,Ki=!0,gs=!0)}if(G.isSkinnedMesh){Ot.setOptional($,G,"bindMatrix"),Ot.setOptional($,G,"bindMatrixInverse");const Qt=G.skeleton;Qt&&(He.floatVertexTextures?(Qt.boneTexture===null&&Qt.computeBoneTexture(),Ot.setValue($,"boneTexture",Qt.boneTexture,E)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}G.isBatchedMesh&&(Ot.setOptional($,G,"batchingTexture"),Ot.setValue($,"batchingTexture",G._matricesTexture,E));const _s=V.morphAttributes;if((_s.position!==void 0||_s.normal!==void 0||_s.color!==void 0&&He.isWebGL2===!0)&&Ze.update(G,V,Xn),(Ki||ot.receiveShadow!==G.receiveShadow)&&(ot.receiveShadow=G.receiveShadow,Ot.setValue($,"receiveShadow",G.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&($n.envMap.value=je,$n.flipEnvMap.value=je.isCubeTexture&&je.isRenderTargetTexture===!1?-1:1),Ki&&(Ot.setValue($,"toneMappingExposure",x.toneMappingExposure),ot.needsLights&&At($n,gs),Se&&j.fog===!0&&ye.refreshFogUniforms($n,Se),ye.refreshMaterialUniforms($n,j,J,z,Ce),Kr.upload($,ct(ot),$n,E)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(Kr.upload($,ct(ot),$n,E),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&Ot.setValue($,"center",G.center),Ot.setValue($,"modelViewMatrix",G.modelViewMatrix),Ot.setValue($,"normalMatrix",G.normalMatrix),Ot.setValue($,"modelMatrix",G.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){const Qt=j.uniformsGroups;for(let vs=0,Ll=Qt.length;vs<Ll;vs++)if(He.isWebGL2){const Bo=Qt[vs];he.update(Bo,Xn),he.bind(Bo,Xn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Xn}function At(M,N){M.ambientLightColor.needsUpdate=N,M.lightProbe.needsUpdate=N,M.directionalLights.needsUpdate=N,M.directionalLightShadows.needsUpdate=N,M.pointLights.needsUpdate=N,M.pointLightShadows.needsUpdate=N,M.spotLights.needsUpdate=N,M.spotLightShadows.needsUpdate=N,M.rectAreaLights.needsUpdate=N,M.hemisphereLights.needsUpdate=N}function Lt(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(M,N,V){qe.get(M.texture).__webglTexture=N,qe.get(M.depthTexture).__webglTexture=V;const j=qe.get(M);j.__hasExternalTextures=!0,j.__hasExternalTextures&&(j.__autoAllocateDepthBuffer=V===void 0,j.__autoAllocateDepthBuffer||Ue.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),j.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(M,N){const V=qe.get(M);V.__webglFramebuffer=N,V.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(M,N=0,V=0){A=M,D=N,R=V;let j=!0,G=null,Se=!1,Le=!1;if(M){const je=qe.get(M);je.__useDefaultFramebuffer!==void 0?(Re.bindFramebuffer($.FRAMEBUFFER,null),j=!1):je.__webglFramebuffer===void 0?E.setupRenderTarget(M):je.__hasExternalTextures&&E.rebindTextures(M,qe.get(M.texture).__webglTexture,qe.get(M.depthTexture).__webglTexture);const it=M.texture;(it.isData3DTexture||it.isDataArrayTexture||it.isCompressedArrayTexture)&&(Le=!0);const Je=qe.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Je[N])?G=Je[N][V]:G=Je[N],Se=!0):He.isWebGL2&&M.samples>0&&E.useMultisampledRTT(M)===!1?G=qe.get(M).__webglMultisampledFramebuffer:Array.isArray(Je)?G=Je[V]:G=Je,b.copy(M.viewport),F.copy(M.scissor),I=M.scissorTest}else b.copy(Q).multiplyScalar(J).floor(),F.copy(fe).multiplyScalar(J).floor(),I=pe;if(Re.bindFramebuffer($.FRAMEBUFFER,G)&&He.drawBuffers&&j&&Re.drawBuffers(M,G),Re.viewport(b),Re.scissor(F),Re.setScissorTest(I),Se){const je=qe.get(M.texture);$.framebufferTexture2D($.FRAMEBUFFER,$.COLOR_ATTACHMENT0,$.TEXTURE_CUBE_MAP_POSITIVE_X+N,je.__webglTexture,V)}else if(Le){const je=qe.get(M.texture),it=N||0;$.framebufferTextureLayer($.FRAMEBUFFER,$.COLOR_ATTACHMENT0,je.__webglTexture,V||0,it)}K=-1},this.readRenderTargetPixels=function(M,N,V,j,G,Se,Le){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Be=qe.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Le!==void 0&&(Be=Be[Le]),Be){Re.bindFramebuffer($.FRAMEBUFFER,Be);try{const je=M.texture,it=je.format,Je=je.type;if(it!==dn&&Ee.convert(it)!==$.getParameter($.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const et=Je===fr&&(Ue.has("EXT_color_buffer_half_float")||He.isWebGL2&&Ue.has("EXT_color_buffer_float"));if(Je!==kn&&Ee.convert(Je)!==$.getParameter($.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Je===Fn&&(He.isWebGL2||Ue.has("OES_texture_float")||Ue.has("WEBGL_color_buffer_float")))&&!et){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=M.width-j&&V>=0&&V<=M.height-G&&$.readPixels(N,V,j,G,Ee.convert(it),Ee.convert(Je),Se)}finally{const je=A!==null?qe.get(A).__webglFramebuffer:null;Re.bindFramebuffer($.FRAMEBUFFER,je)}}},this.copyFramebufferToTexture=function(M,N,V=0){const j=Math.pow(2,-V),G=Math.floor(N.image.width*j),Se=Math.floor(N.image.height*j);E.setTexture2D(N,0),$.copyTexSubImage2D($.TEXTURE_2D,V,0,0,M.x,M.y,G,Se),Re.unbindTexture()},this.copyTextureToTexture=function(M,N,V,j=0){const G=N.image.width,Se=N.image.height,Le=Ee.convert(V.format),Be=Ee.convert(V.type);E.setTexture2D(V,0),$.pixelStorei($.UNPACK_FLIP_Y_WEBGL,V.flipY),$.pixelStorei($.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),$.pixelStorei($.UNPACK_ALIGNMENT,V.unpackAlignment),N.isDataTexture?$.texSubImage2D($.TEXTURE_2D,j,M.x,M.y,G,Se,Le,Be,N.image.data):N.isCompressedTexture?$.compressedTexSubImage2D($.TEXTURE_2D,j,M.x,M.y,N.mipmaps[0].width,N.mipmaps[0].height,Le,N.mipmaps[0].data):$.texSubImage2D($.TEXTURE_2D,j,M.x,M.y,Le,Be,N.image),j===0&&V.generateMipmaps&&$.generateMipmap($.TEXTURE_2D),Re.unbindTexture()},this.copyTextureToTexture3D=function(M,N,V,j,G=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Se=M.max.x-M.min.x+1,Le=M.max.y-M.min.y+1,Be=M.max.z-M.min.z+1,je=Ee.convert(j.format),it=Ee.convert(j.type);let Je;if(j.isData3DTexture)E.setTexture3D(j,0),Je=$.TEXTURE_3D;else if(j.isDataArrayTexture||j.isCompressedArrayTexture)E.setTexture2DArray(j,0),Je=$.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}$.pixelStorei($.UNPACK_FLIP_Y_WEBGL,j.flipY),$.pixelStorei($.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),$.pixelStorei($.UNPACK_ALIGNMENT,j.unpackAlignment);const et=$.getParameter($.UNPACK_ROW_LENGTH),Mt=$.getParameter($.UNPACK_IMAGE_HEIGHT),jt=$.getParameter($.UNPACK_SKIP_PIXELS),Pt=$.getParameter($.UNPACK_SKIP_ROWS),gn=$.getParameter($.UNPACK_SKIP_IMAGES),gt=V.isCompressedTexture?V.mipmaps[G]:V.image;$.pixelStorei($.UNPACK_ROW_LENGTH,gt.width),$.pixelStorei($.UNPACK_IMAGE_HEIGHT,gt.height),$.pixelStorei($.UNPACK_SKIP_PIXELS,M.min.x),$.pixelStorei($.UNPACK_SKIP_ROWS,M.min.y),$.pixelStorei($.UNPACK_SKIP_IMAGES,M.min.z),V.isDataTexture||V.isData3DTexture?$.texSubImage3D(Je,G,N.x,N.y,N.z,Se,Le,Be,je,it,gt.data):V.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),$.compressedTexSubImage3D(Je,G,N.x,N.y,N.z,Se,Le,Be,je,gt.data)):$.texSubImage3D(Je,G,N.x,N.y,N.z,Se,Le,Be,je,it,gt),$.pixelStorei($.UNPACK_ROW_LENGTH,et),$.pixelStorei($.UNPACK_IMAGE_HEIGHT,Mt),$.pixelStorei($.UNPACK_SKIP_PIXELS,jt),$.pixelStorei($.UNPACK_SKIP_ROWS,Pt),$.pixelStorei($.UNPACK_SKIP_IMAGES,gn),G===0&&j.generateMipmaps&&$.generateMipmap(Je),Re.unbindTexture()},this.initTexture=function(M){M.isCubeTexture?E.setTextureCube(M,0):M.isData3DTexture?E.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?E.setTexture2DArray(M,0):E.setTexture2D(M,0),Re.unbindTexture()},this.resetState=function(){D=0,R=0,A=null,Re.reset(),T.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===vo?"display-p3":"srgb",t.unpackColorSpace=ft.workingColorSpace===ls?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===It?ri:jc}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===ri?It:An}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class ng extends pl{}ng.prototype.isWebGL1Renderer=!0;class wo{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new rt(e),this.density=t}clone(){return new wo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class ig extends Tt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class rg{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=so,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Tn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Tn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Tn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ht=new U;class ss{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix4(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ht.fromBufferAttribute(this,t),Ht.applyNormalMatrix(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ht.fromBufferAttribute(this,t),Ht.transformDirection(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}setX(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=mn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=mn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=mn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=mn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),i=dt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),i=dt(i,this.array),r=dt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),i=dt(i,this.array),r=dt(r,this.array),s=dt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new fn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ss(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ml extends Wn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new rt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Li;const tr=new U,Pi=new U,Di=new U,Ii=new We,nr=new We,gl=new xt,Gr=new U,ir=new U,Wr=new U,rc=new We,qs=new We,sc=new We;class sg extends Tt{constructor(e=new ml){if(super(),this.isSprite=!0,this.type="Sprite",Li===void 0){Li=new Jt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new rg(t,5);Li.setIndex([0,1,2,0,2,3]),Li.setAttribute("position",new ss(i,3,0,!1)),Li.setAttribute("uv",new ss(i,2,3,!1))}this.geometry=Li,this.material=e,this.center=new We(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Pi.setFromMatrixScale(this.matrixWorld),gl.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Di.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Pi.multiplyScalar(-Di.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const a=this.center;Vr(Gr.set(-.5,-.5,0),Di,a,Pi,r,s),Vr(ir.set(.5,-.5,0),Di,a,Pi,r,s),Vr(Wr.set(.5,.5,0),Di,a,Pi,r,s),rc.set(0,0),qs.set(1,0),sc.set(1,1);let o=e.ray.intersectTriangle(Gr,ir,Wr,!1,tr);if(o===null&&(Vr(ir.set(-.5,.5,0),Di,a,Pi,r,s),qs.set(0,1),o=e.ray.intersectTriangle(Gr,Wr,ir,!1,tr),o===null))return;const c=e.ray.origin.distanceTo(tr);c<e.near||c>e.far||t.push({distance:c,point:tr.clone(),uv:nn.getInterpolation(tr,Gr,ir,Wr,rc,qs,sc,new We),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Vr(n,e,t,i,r,s){Ii.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(nr.x=s*Ii.x-r*Ii.y,nr.y=r*Ii.x+s*Ii.y):nr.copy(Ii),n.copy(e),n.x+=nr.x,n.y+=nr.y,n.applyMatrix4(gl)}class _l extends Wn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new rt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const oc=new U,ac=new U,cc=new xt,Ys=new _r,Xr=new gr;class og extends Tt{constructor(e=new Jt,t=new _l){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)oc.fromBufferAttribute(t,r-1),ac.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=oc.distanceTo(ac);e.setAttribute("lineDistance",new an(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Xr.copy(i.boundingSphere),Xr.applyMatrix4(r),Xr.radius+=s,e.ray.intersectsSphere(Xr)===!1)return;cc.copy(r).invert(),Ys.copy(e.ray).applyMatrix4(cc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=new U,u=new U,f=new U,d=new U,m=this.isLineSegments?2:1,_=i.index,p=i.attributes.position;if(_!==null){const h=Math.max(0,a.start),S=Math.min(_.count,a.start+a.count);for(let x=h,w=S-1;x<w;x+=m){const D=_.getX(x),R=_.getX(x+1);if(l.fromBufferAttribute(p,D),u.fromBufferAttribute(p,R),Ys.distanceSqToSegment(l,u,d,f)>c)continue;d.applyMatrix4(this.matrixWorld);const K=e.ray.origin.distanceTo(d);K<e.near||K>e.far||t.push({distance:K,point:f.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const h=Math.max(0,a.start),S=Math.min(p.count,a.start+a.count);for(let x=h,w=S-1;x<w;x+=m){if(l.fromBufferAttribute(p,x),u.fromBufferAttribute(p,x+1),Ys.distanceSqToSegment(l,u,d,f)>c)continue;d.applyMatrix4(this.matrixWorld);const R=e.ray.origin.distanceTo(d);R<e.near||R>e.far||t.push({distance:R,point:f.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}class vl extends Wn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new rt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const lc=new xt,lo=new _r,$r=new gr,jr=new U;class ag extends Tt{constructor(e=new Jt,t=new vl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),$r.copy(i.boundingSphere),$r.applyMatrix4(r),$r.radius+=s,e.ray.intersectsSphere($r)===!1)return;lc.copy(r).invert(),lo.copy(e.ray).applyMatrix4(lc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,f=i.attributes.position;if(l!==null){const d=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let _=d,g=m;_<g;_++){const p=l.getX(_);jr.fromBufferAttribute(f,p),uc(jr,p,c,r,e,t,this)}}else{const d=Math.max(0,a.start),m=Math.min(f.count,a.start+a.count);for(let _=d,g=m;_<g;_++)jr.fromBufferAttribute(f,_),uc(jr,_,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function uc(n,e,t,i,r,s,a){const o=lo.distanceSqToPoint(n);if(o<t){const c=new U;lo.closestPointToPoint(n,c),c.applyMatrix4(i);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,object:a})}}class cg extends $t{constructor(e,t,i,r,s,a,o,c,l){super(e,t,i,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Un extends Jt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const u=[],f=new U,d=new U,m=[],_=[],g=[],p=[];for(let h=0;h<=i;h++){const S=[],x=h/i;let w=0;h===0&&a===0?w=.5/t:h===i&&c===Math.PI&&(w=-.5/t);for(let D=0;D<=t;D++){const R=D/t;f.x=-e*Math.cos(r+R*s)*Math.sin(a+x*o),f.y=e*Math.cos(a+x*o),f.z=e*Math.sin(r+R*s)*Math.sin(a+x*o),_.push(f.x,f.y,f.z),d.copy(f).normalize(),g.push(d.x,d.y,d.z),p.push(R+w,1-x),S.push(l++)}u.push(S)}for(let h=0;h<i;h++)for(let S=0;S<t;S++){const x=u[h][S+1],w=u[h][S],D=u[h+1][S],R=u[h+1][S+1];(h!==0||a>0)&&m.push(x,w,R),(h!==i-1||c<Math.PI)&&m.push(w,D,R)}this.setIndex(m),this.setAttribute("position",new an(_,3)),this.setAttribute("normal",new an(g,3)),this.setAttribute("uv",new an(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Un(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class rr extends Wn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new rt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new rt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=qc,this.normalScale=new We(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class xl extends Tt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new rt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class lg extends xl{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Tt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new rt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ks=new xt,hc=new U,dc=new U;class ug{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new We(512,512),this.map=null,this.mapPass=null,this.matrix=new xt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new So,this._frameExtents=new We(1,1),this._viewportCount=1,this._viewports=[new Nt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;hc.setFromMatrixPosition(e.matrixWorld),t.position.copy(hc),dc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(dc),t.updateMatrixWorld(),Ks.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ks),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ks)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class hg extends ug{constructor(){super(new al(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class fc extends xl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Tt.DEFAULT_UP),this.updateMatrix(),this.target=new Tt,this.shadow=new hg}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class dg{constructor(e,t,i=0,r=1/0){this.ray=new _r(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new yo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return uo(e,this,i,t),i.sort(pc),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)uo(e[r],this,i,t);return i.sort(pc),i}}function pc(n,e){return n.distance-e.distance}function uo(n,e,t,i){if(n.layers.test(e.layers)&&n.raycast(e,t),i===!0){const r=n.children;for(let s=0,a=r.length;s<a;s++)uo(r[s],e,t,!0)}}class mc{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(kt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:go}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=go);const gc={type:"change"},Zs={type:"start"},_c={type:"end"},qr=new _r,vc=new In,fg=Math.cos(70*Zn.DEG2RAD);class pg extends li{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:di.ROTATE,MIDDLE:di.DOLLY,RIGHT:di.PAN},this.touches={ONE:fi.ROTATE,TWO:fi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(T){T.addEventListener("keydown",Oe),this._domElementKeyEvents=T},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Oe),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(gc),i.update(),s=r.NONE},this.update=function(){const T=new U,he=new ai().setFromUnitVectors(e.up,new U(0,1,0)),Fe=he.clone().invert(),we=new U,oe=new ai,L=new U,me=2*Math.PI;return function(P=null){const B=i.object.position;T.copy(B).sub(i.target),T.applyQuaternion(he),o.setFromVector3(T),i.autoRotate&&s===r.NONE&&I(b(P)),i.enableDamping?(o.theta+=c.theta*i.dampingFactor,o.phi+=c.phi*i.dampingFactor):(o.theta+=c.theta,o.phi+=c.phi);let Z=i.minAzimuthAngle,ae=i.maxAzimuthAngle;isFinite(Z)&&isFinite(ae)&&(Z<-Math.PI?Z+=me:Z>Math.PI&&(Z-=me),ae<-Math.PI?ae+=me:ae>Math.PI&&(ae-=me),Z<=ae?o.theta=Math.max(Z,Math.min(ae,o.theta)):o.theta=o.theta>(Z+ae)/2?Math.max(Z,o.theta):Math.min(ae,o.theta)),o.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,o.phi)),o.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(u,i.dampingFactor):i.target.add(u),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor),i.zoomToCursor&&R||i.object.isOrthographicCamera?o.radius=Q(o.radius):o.radius=Q(o.radius*l),T.setFromSpherical(o),T.applyQuaternion(Fe),B.copy(i.target).add(T),i.object.lookAt(i.target),i.enableDamping===!0?(c.theta*=1-i.dampingFactor,c.phi*=1-i.dampingFactor,u.multiplyScalar(1-i.dampingFactor)):(c.set(0,0,0),u.set(0,0,0));let ge=!1;if(i.zoomToCursor&&R){let Me=null;if(i.object.isPerspectiveCamera){const re=T.length();Me=Q(re*l);const Ae=re-Me;i.object.position.addScaledVector(w,Ae),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){const re=new U(D.x,D.y,0);re.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/l)),i.object.updateProjectionMatrix(),ge=!0;const Ae=new U(D.x,D.y,0);Ae.unproject(i.object),i.object.position.sub(Ae).add(re),i.object.updateMatrixWorld(),Me=T.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;Me!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(Me).add(i.object.position):(qr.origin.copy(i.object.position),qr.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(qr.direction))<fg?e.lookAt(i.target):(vc.setFromNormalAndCoplanarPoint(i.object.up,i.target),qr.intersectPlane(vc,i.target))))}else i.object.isOrthographicCamera&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/l)),i.object.updateProjectionMatrix(),ge=!0);return l=1,R=!1,ge||we.distanceToSquared(i.object.position)>a||8*(1-oe.dot(i.object.quaternion))>a||L.distanceToSquared(i.target)>0?(i.dispatchEvent(gc),we.copy(i.object.position),oe.copy(i.object.quaternion),L.copy(i.target),!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",ut),i.domElement.removeEventListener("pointerdown",E),i.domElement.removeEventListener("pointercancel",W),i.domElement.removeEventListener("wheel",ue),i.domElement.removeEventListener("pointermove",v),i.domElement.removeEventListener("pointerup",W),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",Oe),i._domElementKeyEvents=null)};const i=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const a=1e-6,o=new mc,c=new mc;let l=1;const u=new U,f=new We,d=new We,m=new We,_=new We,g=new We,p=new We,h=new We,S=new We,x=new We,w=new U,D=new We;let R=!1;const A=[],K={};let y=!1;function b(T){return T!==null?2*Math.PI/60*i.autoRotateSpeed*T:2*Math.PI/60/60*i.autoRotateSpeed}function F(T){const he=Math.abs(T*.01);return Math.pow(.95,i.zoomSpeed*he)}function I(T){c.theta-=T}function X(T){c.phi-=T}const C=function(){const T=new U;return function(Fe,we){T.setFromMatrixColumn(we,0),T.multiplyScalar(-Fe),u.add(T)}}(),k=function(){const T=new U;return function(Fe,we){i.screenSpacePanning===!0?T.setFromMatrixColumn(we,1):(T.setFromMatrixColumn(we,0),T.crossVectors(i.object.up,T)),T.multiplyScalar(Fe),u.add(T)}}(),z=function(){const T=new U;return function(Fe,we){const oe=i.domElement;if(i.object.isPerspectiveCamera){const L=i.object.position;T.copy(L).sub(i.target);let me=T.length();me*=Math.tan(i.object.fov/2*Math.PI/180),C(2*Fe*me/oe.clientHeight,i.object.matrix),k(2*we*me/oe.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(C(Fe*(i.object.right-i.object.left)/i.object.zoom/oe.clientWidth,i.object.matrix),k(we*(i.object.top-i.object.bottom)/i.object.zoom/oe.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function J(T){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?l/=T:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function Y(T){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?l*=T:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function q(T,he){if(!i.zoomToCursor)return;R=!0;const Fe=i.domElement.getBoundingClientRect(),we=T-Fe.left,oe=he-Fe.top,L=Fe.width,me=Fe.height;D.x=we/L*2-1,D.y=-(oe/me)*2+1,w.set(D.x,D.y,1).unproject(i.object).sub(i.object.position).normalize()}function Q(T){return Math.max(i.minDistance,Math.min(i.maxDistance,T))}function fe(T){f.set(T.clientX,T.clientY)}function pe(T){q(T.clientX,T.clientX),h.set(T.clientX,T.clientY)}function H(T){_.set(T.clientX,T.clientY)}function ee(T){d.set(T.clientX,T.clientY),m.subVectors(d,f).multiplyScalar(i.rotateSpeed);const he=i.domElement;I(2*Math.PI*m.x/he.clientHeight),X(2*Math.PI*m.y/he.clientHeight),f.copy(d),i.update()}function xe(T){S.set(T.clientX,T.clientY),x.subVectors(S,h),x.y>0?J(F(x.y)):x.y<0&&Y(F(x.y)),h.copy(S),i.update()}function Ce(T){g.set(T.clientX,T.clientY),p.subVectors(g,_).multiplyScalar(i.panSpeed),z(p.x,p.y),_.copy(g),i.update()}function Pe(T){q(T.clientX,T.clientY),T.deltaY<0?Y(F(T.deltaY)):T.deltaY>0&&J(F(T.deltaY)),i.update()}function ze(T){let he=!1;switch(T.code){case i.keys.UP:T.ctrlKey||T.metaKey||T.shiftKey?X(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):z(0,i.keyPanSpeed),he=!0;break;case i.keys.BOTTOM:T.ctrlKey||T.metaKey||T.shiftKey?X(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):z(0,-i.keyPanSpeed),he=!0;break;case i.keys.LEFT:T.ctrlKey||T.metaKey||T.shiftKey?I(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):z(i.keyPanSpeed,0),he=!0;break;case i.keys.RIGHT:T.ctrlKey||T.metaKey||T.shiftKey?I(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):z(-i.keyPanSpeed,0),he=!0;break}he&&(T.preventDefault(),i.update())}function $e(T){if(A.length===1)f.set(T.pageX,T.pageY);else{const he=Ee(T),Fe=.5*(T.pageX+he.x),we=.5*(T.pageY+he.y);f.set(Fe,we)}}function ke(T){if(A.length===1)_.set(T.pageX,T.pageY);else{const he=Ee(T),Fe=.5*(T.pageX+he.x),we=.5*(T.pageY+he.y);_.set(Fe,we)}}function st(T){const he=Ee(T),Fe=T.pageX-he.x,we=T.pageY-he.y,oe=Math.sqrt(Fe*Fe+we*we);h.set(0,oe)}function $(T){i.enableZoom&&st(T),i.enablePan&&ke(T)}function Et(T){i.enableZoom&&st(T),i.enableRotate&&$e(T)}function Ue(T){if(A.length==1)d.set(T.pageX,T.pageY);else{const Fe=Ee(T),we=.5*(T.pageX+Fe.x),oe=.5*(T.pageY+Fe.y);d.set(we,oe)}m.subVectors(d,f).multiplyScalar(i.rotateSpeed);const he=i.domElement;I(2*Math.PI*m.x/he.clientHeight),X(2*Math.PI*m.y/he.clientHeight),f.copy(d)}function He(T){if(A.length===1)g.set(T.pageX,T.pageY);else{const he=Ee(T),Fe=.5*(T.pageX+he.x),we=.5*(T.pageY+he.y);g.set(Fe,we)}p.subVectors(g,_).multiplyScalar(i.panSpeed),z(p.x,p.y),_.copy(g)}function Re(T){const he=Ee(T),Fe=T.pageX-he.x,we=T.pageY-he.y,oe=Math.sqrt(Fe*Fe+we*we);S.set(0,oe),x.set(0,Math.pow(S.y/h.y,i.zoomSpeed)),J(x.y),h.copy(S);const L=(T.pageX+he.x)*.5,me=(T.pageY+he.y)*.5;q(L,me)}function ht(T){i.enableZoom&&Re(T),i.enablePan&&He(T)}function qe(T){i.enableZoom&&Re(T),i.enableRotate&&Ue(T)}function E(T){i.enabled!==!1&&(A.length===0&&(i.domElement.setPointerCapture(T.pointerId),i.domElement.addEventListener("pointermove",v),i.domElement.addEventListener("pointerup",W)),Ze(T),T.pointerType==="touch"?Ye(T):le(T))}function v(T){i.enabled!==!1&&(T.pointerType==="touch"?ie(T):se(T))}function W(T){Xe(T),A.length===0&&(i.domElement.releasePointerCapture(T.pointerId),i.domElement.removeEventListener("pointermove",v),i.domElement.removeEventListener("pointerup",W)),i.dispatchEvent(_c),s=r.NONE}function le(T){let he;switch(T.button){case 0:he=i.mouseButtons.LEFT;break;case 1:he=i.mouseButtons.MIDDLE;break;case 2:he=i.mouseButtons.RIGHT;break;default:he=-1}switch(he){case di.DOLLY:if(i.enableZoom===!1)return;pe(T),s=r.DOLLY;break;case di.ROTATE:if(T.ctrlKey||T.metaKey||T.shiftKey){if(i.enablePan===!1)return;H(T),s=r.PAN}else{if(i.enableRotate===!1)return;fe(T),s=r.ROTATE}break;case di.PAN:if(T.ctrlKey||T.metaKey||T.shiftKey){if(i.enableRotate===!1)return;fe(T),s=r.ROTATE}else{if(i.enablePan===!1)return;H(T),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(Zs)}function se(T){switch(s){case r.ROTATE:if(i.enableRotate===!1)return;ee(T);break;case r.DOLLY:if(i.enableZoom===!1)return;xe(T);break;case r.PAN:if(i.enablePan===!1)return;Ce(T);break}}function ue(T){i.enabled===!1||i.enableZoom===!1||s!==r.NONE||(T.preventDefault(),i.dispatchEvent(Zs),Pe(De(T)),i.dispatchEvent(_c))}function De(T){const he=T.deltaMode,Fe={clientX:T.clientX,clientY:T.clientY,deltaY:T.deltaY};switch(he){case 1:Fe.deltaY*=16;break;case 2:Fe.deltaY*=100;break}return T.ctrlKey&&!y&&(Fe.deltaY*=10),Fe}function ye(T){T.key==="Control"&&(y=!0,document.addEventListener("keyup",be,{passive:!0,capture:!0}))}function be(T){T.key==="Control"&&(y=!1,document.removeEventListener("keyup",be,{passive:!0,capture:!0}))}function Oe(T){i.enabled===!1||i.enablePan===!1||ze(T)}function Ye(T){switch(Ne(T),A.length){case 1:switch(i.touches.ONE){case fi.ROTATE:if(i.enableRotate===!1)return;$e(T),s=r.TOUCH_ROTATE;break;case fi.PAN:if(i.enablePan===!1)return;ke(T),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(i.touches.TWO){case fi.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;$(T),s=r.TOUCH_DOLLY_PAN;break;case fi.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Et(T),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(Zs)}function ie(T){switch(Ne(T),s){case r.TOUCH_ROTATE:if(i.enableRotate===!1)return;Ue(T),i.update();break;case r.TOUCH_PAN:if(i.enablePan===!1)return;He(T),i.update();break;case r.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;ht(T),i.update();break;case r.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;qe(T),i.update();break;default:s=r.NONE}}function ut(T){i.enabled!==!1&&T.preventDefault()}function Ze(T){A.push(T.pointerId)}function Xe(T){delete K[T.pointerId];for(let he=0;he<A.length;he++)if(A[he]==T.pointerId){A.splice(he,1);return}}function Ne(T){let he=K[T.pointerId];he===void 0&&(he=new We,K[T.pointerId]=he),he.set(T.pageX,T.pageY)}function Ee(T){const he=T.pointerId===A[0]?A[1]:A[0];return K[he]}i.domElement.addEventListener("contextmenu",ut),i.domElement.addEventListener("pointerdown",E),i.domElement.addEventListener("pointercancel",W),i.domElement.addEventListener("wheel",ue,{passive:!1}),document.addEventListener("keydown",ye,{passive:!0,capture:!0}),this.update()}}const yl="mempalace-viz-graph-rel-filters-v1",xc={tunnel:{label:"Tunnel",shortLabel:"Tunnel",description:"Same room name appearing in multiple wings — a cross-wing structural link from tunnel discovery (not semantic similarity)."},taxonomy_adjacency:{label:"Taxonomy adjacency",shortLabel:"Adjacency",description:"Inferred same-wing neighbor: consecutive rooms when sorted by name (structural chain, not topical similarity)."},unknown:{label:"Other",shortLabel:"Other",description:"Edges whose relationship type is not listed in the viewer registry."}};function ho(n){const e=n&&xc[n]?n:"unknown";return{type:e,...xc[e]}}function ds(n){if(!n||typeof n!="object")return"tunnel";const e=n.relationshipType;return typeof e=="string"&&e.trim()?e.trim():"tunnel"}function To(n){const e=new Set;for(const t of n||[])e.add(ds(t));return[...e].sort()}function mg(n){const e=n||"tunnel";return e==="tunnel"?{color:5999871,opacity:.44}:e==="taxonomy_adjacency"?{color:4049336,opacity:.28}:e==="unknown"?{color:9741240,opacity:.32}:{color:10980346,opacity:.3}}function gg(n,e){const t=new Set(e||[]);if(t.size===0)return new Set;if(n==null)return new Set(t);if(Array.isArray(n)&&n.length===0)return new Set;const i=new Set;for(const r of n)typeof r=="string"&&t.has(r)&&i.add(r);return i}function Ao(n,e){const t=[...e||[]].sort();return t.length===0?null:!n||n.size===0?new Set:n.size===t.length&&t.every(r=>n.has(r))?null:n}function Ro(n,e){if(!e||e.size===0)return[];const t=[];for(const i of n||[])e.has(ds(i))&&t.push(i);return t}function _g(n){const e={};for(const t of n||[]){const i=ds(t);e[i]=(e[i]||0)+1}return e}function vg(n,e){const t=Ro(n,e);return{visibleEdgeCount:t.length,visibleByType:_g(t),visibleEdges:t}}function xg(n){if(!n||typeof n!="object")return null;const e=n.enabledTypes;return Array.isArray(e)?e.filter(t=>typeof t=="string"):null}function yg(n,e){const t=[],i=n==null?void 0:n.sources;Array.isArray(i)&&i.length&&t.push(`Sources: ${i.join(", ")}`);const r=n==null?void 0:n.truncatedSources;Array.isArray(r)&&r.some(o=>o==null?void 0:o.truncated)&&t.push("Some sources may be truncated upstream — tunnel list can be incomplete.");const s=((n==null?void 0:n.completenessNotes)||[]).filter(Boolean);s.length&&t.push(s[0]);const a=e!=null&&e.byType&&typeof e.byType=="object"?e.byType:null;if(a&&Object.keys(a).length){const o=Object.entries(a).map(([c,l])=>`${c}: ${l}`).join(" · ");t.push(`Types in payload: ${o}`)}return t.filter(Boolean).join(" ")}function mr(n,e=6){if(!n||typeof n!="object")return"";const t=Object.entries(n).filter(([,r])=>r>0).sort((r,s)=>s[1]-r[1]);return t.length?t.slice(0,e).map(([r,s])=>{const a=ho(r);return`${s} ${a.shortLabel.toLowerCase()}`}).join(" · "):""}function Mg(n,e){const t=Object.values(n||{}).reduce((c,l)=>c+l,0),i=Object.values(e||{}).reduce((c,l)=>c+l,0);if(i===0)return null;const r=(n==null?void 0:n.tunnel)||0,s=(n==null?void 0:n.taxonomy_adjacency)||0,a=(e==null?void 0:e.tunnel)||0,o=(e==null?void 0:e.taxonomy_adjacency)||0;return t===0&&i>0?"No visible links with current filters; totals above are global.":s>r*2&&o>0?"Most of this room’s visible links are inferred same-wing adjacency.":r>s*2&&a>0?"Most of this room’s visible links are cross-wing tunnel connections.":r>0&&s===0&&o>0?"Only tunnel links are visible; inferred adjacency is hidden by filters.":s>0&&r===0&&a>0?"Only inferred adjacency is visible; tunnel links are hidden by filters.":null}function Sg(n,e,t){const i=Math.max(1,n),r=Math.max(0,e),s=Math.max(1,t),a=r/i;let o=0;i>90||a>2.8?o=3:i>48||a>1.75?o=2:(i>24||a>1.05)&&(o=1);const c=o>=3?85:o>=2?130:o>=1?175:235,l=.00155+o*42e-5,u=o>=2?.68:o>=1?.82:1,f=o>=3?.74:o>=2?.86:1,d=o>=2?1.08:1,m=1+o*.22,_=1-o*.04,g=1+o*.12,p=.004+o*.0025,h=4+o*5,S=2.1+o*.55,x=48+o*14;return{tier:o,nodeCount:i,edgeCount:r,wingCount:s,edgeDensity:a,labelBudget:c,fogDensity:l,adjacencyOpacityMult:u,globalEdgeOpacityMult:f,tunnelEmphasisMult:d,repelScale:m,attractScale:_,centerScale:g,wingCohesion:p,depthJitter:h,collisionMinDist:S,forceIterations:x}}function Eg(n){return{repelStrength:88*n.repelScale,attractStrength:.0115*n.attractScale,centerStrength:.0052*n.centerScale,wingCohesion:n.wingCohesion,iterations:n.forceIterations}}function ar(n){let e=2166136261;const t=String(n||"");for(let i=0;i<t.length;i+=1)e^=t.charCodeAt(i),e=Math.imul(e,16777619);return(e>>>0)/4294967296}function bg(n,e,t){const i=Math.max(1,e.length),r=26+Math.min(48,n.length*.35),s=7+t.tier*2.2,a=9+t.tier*1.8,o=new Map;e.forEach((l,u)=>{const f=u/i*Math.PI*2,d=r*(1+u%5*.04),m=Math.cos(f)*d,_=Math.sin(f)*d,g=((u+.5)/i-.5)*s*2.2;o.set(l,{x:m,y:g,z:_})});const c=new Map;n.forEach(l=>{if(l.type==="room"&&l.wing){const u=c.get(l.wing)||[];u.push(l),c.set(l.wing,u)}}),e.forEach(l=>{const u=c.get(l)||[],f=o.get(l)||{x:0,y:0,z:0},d=Math.max(u.length,1);u.forEach((m,_)=>{const g=_/d*Math.PI*2,p=ar(`${l}|${m.name}|${_}`),h=ar(`${m.name}|z`),S=a*(.45+.55*p),x=(h-.5)*t.depthJitter;m.x=f.x+Math.cos(g)*S,m.y=f.y+Math.sin(g*1.7)*S*.42+x,m.z=f.z+Math.sin(g)*S})}),n.forEach(l=>{if(l.type==="wing"){const u=o.get(l.name)||{x:0,y:0,z:0},f=ar(`wing|${l.name}`);l.x=u.x*.22+(f-.5)*3,l.y=u.y+(f-.5)*4,l.z=u.z*.22+(ar(`${l.name}z`)-.5)*3}})}function wg(n,e,t,i){const r=Eg(t),{repelStrength:s,attractStrength:a,centerStrength:o,wingCohesion:c,iterations:l}=r,u=new Map;n.forEach(f=>{f.type==="wing"&&f.name&&u.set(f.name,f)});for(let f=0;f<l;f+=1){for(let d=0;d<n.length;d+=1)for(let m=d+1;m<n.length;m+=1){const _=n[d].x-n[m].x,g=n[d].y-n[m].y,p=n[d].z-n[m].z,h=Math.sqrt(_*_+g*g+p*p)+.12;let S=s/(h*h);const x=n[d].wing,w=n[m].wing;x&&w&&x!==w&&(S*=1.12),n[d].x+=_*S,n[d].y+=g*S,n[d].z+=p*S,n[m].x-=_*S,n[m].y-=g*S,n[m].z-=p*S}e.forEach(d=>{const m=i(n,d,"from"),_=i(n,d,"to");if(m&&_){let g=_.x-m.x,p=_.y-m.y,h=_.z-m.z,S=a;m.wing&&_.wing&&m.wing!==_.wing&&(S*=1.15),m.x+=g*S,m.y+=p*S,m.z+=h*S,_.x-=g*S,_.y-=p*S,_.z-=h*S}}),n.forEach(d=>{if(d.type==="room"&&d.wing){const m=u.get(d.wing);m&&(d.x+=(m.x-d.x)*c,d.y+=(m.y-d.y)*c,d.z+=(m.z-d.z)*c)}d.x*=1-o,d.y*=1-o,d.z*=1-o})}}function Tg(n,e,t=10){for(let i=0;i<t;i+=1)for(let r=0;r<n.length;r+=1)for(let s=r+1;s<n.length;s+=1){const a=n[r],o=n[s];let c=a.x-o.x,l=a.y-o.y,u=a.z-o.z;const f=Math.sqrt(c*c+l*l+u*u)+1e-8;if(f<e){const d=(e-f)*.52,m=c/f,_=l/f,g=u/f;a.x+=m*d,a.y+=_*d,a.z+=g*d,o.x-=m*d,o.y-=_*d,o.z-=g*d}}}function Ag(n,e){const t=Math.max(12,e),i=t*.85,r=t*4.2,s=(n-i)/(r-i);return Math.max(0,Math.min(1,s))}function Rg(n,e,t){const i=Math.max(8,Math.floor(n)),r=Math.max(0,Math.min(3,t)),s=Math.max(0,Math.min(1,e)),a=.38+r*.06,c=a+(1-a)*s;return Math.max(8,Math.floor(i*c))}function Cg(n,e={}){let i=.74+Math.max(0,Math.min(1,n))*.38;return e.pinned?i*=1.12:e.selected?i*=1.08:e.hovered&&(i*=1.05),i}function Lg(n,e={}){const t=Math.max(0,Math.min(1,n));let i=.52+t*.46;return e.selected&&(i=Math.max(i,.94)),e.hovered&&(i=Math.max(i,.9)),e.neighbor&&(i=Math.max(i,.62+t*.28)),Math.max(.35,Math.min(1,i))}function Ml(n){if(!n||!n.startsWith("room:"))return null;const e=n.slice(5),t=e.indexOf(":");return t===-1?null:e.slice(0,t)}function Pg(n){return n?n.startsWith("room:")?Ml(n):n.startsWith("wing:")?n.slice(5):null:null}function Dg(n,e,t){const i=new Map;function r(s,a){!s||!a||s===a||(i.has(s)||i.set(s,new Set),i.has(a)||i.set(a,new Set),i.get(s).add(a),i.get(a).add(s))}for(const s of n||[]){const a=t(e,s,"from"),o=t(e,s,"to"),c=Xi(a),l=Xi(o);c!=null&&c.startsWith("room:")&&(l!=null&&l.startsWith("room:"))&&r(c,l)}return i}function Ui(n,e){const t=new Set;if(!n)return t;const i=e.get(n);return i&&i.forEach(r=>t.add(r)),t}function fo(n,e){return{primaryId:n||e||null,secondaryHoverId:n&&e&&e!==n?e:null}}function Ig(n,e){const t=n.filter(l=>l.id.startsWith("room:")),i=e.nodeCount>300?e.labelBudget*5:e.nodeCount>160?e.labelBudget*4:t.length,r=Math.max(24,Math.min(t.length,i)),s=t.filter(l=>(l.incidentFull||0)>0),a=t.filter(l=>(l.incidentFull||0)===0),o=(l,u)=>u.baseScore-l.baseScore;s.sort(o),a.sort(o);const c=[];for(const l of s){if(c.length>=r)break;c.push(l.id)}for(const l of a){if(c.length>=r)break;c.push(l.id)}return new Set(c)}function Ug(n,e){const{selectedId:t,hoveredId:i,pinActive:r,budget:s,neighborIds:a=null,focusWingId:o=null,cameraDistanceNorm:c=.55,densityTier:l=0}=e,u=Rg(s,c,l),f=Math.max(8,Math.floor(u)),d=Math.max(0,Math.min(3,l)),m=3500+d*220,_=1200+d*80,g=n.map(({id:p,baseScore:h})=>{let S=h;return p===t&&(S+=1e6),r&&p===t&&(S+=2e5),p===i&&(S+=5e5),a&&a.has(p)&&(S+=m),o&&Ml(p)===o&&(S+=_),{id:p,score:S}});return g.sort((p,h)=>h.score-p.score),new Set(g.slice(0,f).map(p=>p.id))}function Ng(n){const e=Math.min(220,(n.incidentFull||0)*24),t=Math.min(100,(n.drawers||0)*1.8),i=n.type==="wing"?45:0;return 20+e+t+i}function Fg(n){const{selectedId:e,hoveredId:t,fromId:i,toId:r,relationshipType:s,densityTier:a}=n,{primaryId:o,secondaryHoverId:c}=fo(e,t),l=o&&(i===o||r===o),u=c&&(i===c||r===c),f=s==="tunnel",d=Math.max(0,Math.min(3,a));return o?l?f?1.24:1.06:u?(f?.88:.78)*(d>=2?.92:1):d>=3?.36:d>=2?.4:d>=1?.52:.68:d>=3?f?.92:.78:1}function Og(n,e,t={}){const{isNeighbor:i=!1,focusActive:r=!1}=t;if(!r)return 1;const s=Math.max(0,Math.min(3,e)),a=38+s*18,o=155+s*35;let c=1.05-(n-a)/o;return i&&(c=.55+c*.45),c=Math.max(s===0?.58:.34,Math.min(1.08,c)),c}function Bg(n,e,t=0){const i=Math.max(8,n),r=Math.max(0,Math.min(3,e)),s=ar(`frame|${t}`),a=i*(.028+r*.006),o=i*(.045+r*.008)*(s-.5)*2;return{x:o,y:a,z:-o*.4}}function yc(n,e,t,i={}){const r=e*Math.PI/180,s=Math.max(0,i.neighborCount||0),a=1.28+t*.06+Math.min(.14,s*.018),c=Math.max(4,n)*a/Math.tan(r/2),l=16+t*4;return Math.min(240,Math.max(l,c))}function zg(n,e){let t=0;for(const i of e){const r=i.x-n.x,s=i.y-n.y,a=i.z-n.z;t=Math.max(t,Math.sqrt(r*r+s*s+a*a))}return t}function Xi(n){return n?n.type==="wing"&&n.name?`wing:${n.name}`:n.type==="room"&&n.wing&&n.name?`room:${n.wing}:${n.name}`:null:null}function kg(n,e,t){const i=new Map;for(const r of e||[]){const s=t(n,r,"from"),a=t(n,r,"to"),o=Xi(s),c=Xi(a);o!=null&&o.startsWith("room:")&&i.set(o,(i.get(o)||0)+1),c!=null&&c.startsWith("room:")&&i.set(c,(i.get(c)||0)+1)}return i}function sr(n,e,t){const i=t==="from"?e.sourceRoomId||e.from:e.targetRoomId||e.to;if(i==null)return null;const r=String(i);return n.find(s=>s.type!=="room"?!1:Ft(s.wing,s.name)===r||!r.includes("/")&&s.name===r?!0:`${s.wing}/${s.name}`===r)}const _t={wingColors:{projects:"#8b9cf8",shared_grocery_list:"#6ee7b7",openclaw:"#94a3b8",default:"#fbbf24"},nodeSizes:{wingMin:3,wingMax:8,roomMin:.8,roomMax:2.5},spacing:{wingSeparation:40,roomRadius:15},accent:{linkWing:4015188,center:14870768}};function Hg(n){let e=0;const t=String(n||"");for(let i=0;i<t.length;i+=1)e=e*31+t.charCodeAt(i)>>>0;return e%360}function po(n){return _t.wingColors[n]?_t.wingColors[n]:`hsl(${Hg(n)}, 52%, 68%)`}function Gg(n){n.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose())})}function Wg(n){var e,t;(e=n.geometry)==null||e.dispose(),(t=n.material)==null||t.dispose()}function Vg(n,e={}){var ve;let t,i,r,s,a,o=0,c=null,l={},u={},f=[],d=[],m=[],_=[],g=new Map,p=[],h=null,S=null,x=new Map,w=80,D=null,R=0,A=[],K=null,y=0,b="wings",F=null,I=1,X=!0,C=!0,k=null,z={searchQuery:"",hoveredId:null,selectedId:null,pinActive:!1,relationshipTypesVisible:null},J=typeof window<"u"&&((ve=window.matchMedia)==null?void 0:ve.call(window,"(prefers-reduced-motion: reduce)").matches);const Y=new Map,q=new Map,Q={onHover:e.onHover||(()=>{}),onClick:e.onClick||(()=>{}),onBackgroundClick:e.onBackgroundClick||(()=>{})},fe=new dg,pe=new We;function H(P,B,Z=850){const ae=i.position.clone(),ge=s.target.clone(),Me=performance.now();c&&cancelAnimationFrame(c);function re(){const Ae=Math.min((performance.now()-Me)/Z,1),Te=1-(1-Ae)**3;i.position.lerpVectors(ae,P,Te),s.target.lerpVectors(ge,B,Te),s.update(),Ae<1?c=requestAnimationFrame(re):c=null}c=requestAnimationFrame(re)}function ee(){var P;d.forEach(({mesh:B})=>{t.remove(B),Gg(B)}),m.forEach(({line:B})=>{t.remove(B),Wg(B)}),_.forEach(({sprite:B})=>{var Z;t.remove(B),(Z=B.material.map)==null||Z.dispose(),B.material.dispose()}),d=[],m=[],_=[],g=new Map,p=[],h=null,S=null,x=new Map,w=80,D=null,R=0,A=[],K=null,y&&clearTimeout(y),y=0,(P=t==null?void 0:t.fog)!=null&&P.isFogExp2&&(t.fog.density=.0026),a!=null&&a.material&&(a.material.opacity=.35),Y.clear(),q.clear()}function xe(){const P=new Jt,B=[];for(let ae=0;ae<1800;ae+=1)B.push(Zn.randFloatSpread(380),Zn.randFloatSpread(200),Zn.randFloatSpread(380));P.setAttribute("position",new an(B,3));const Z=new vl({color:9741240,size:.45,transparent:!0,opacity:.35,depthWrite:!1});a=new ag(P,Z),t.add(a)}function Ce(P,B="#e2e8f0"){const Z=document.createElement("canvas"),ae=Z.getContext("2d"),ge=16;ae.font="500 22px ui-sans-serif, system-ui, sans-serif";const Me=Math.ceil(ae.measureText(P).width)+ge*2;Z.width=Me,Z.height=44,ae.font="500 22px ui-sans-serif, system-ui, sans-serif",ae.fillStyle="rgba(15,23,42,0.88)",ae.fillRect(4,4,Me-8,36),ae.fillStyle=B,ae.fillText(P,ge,28);const re=new cg(Z);re.needsUpdate=!0;const Ae=new ml({map:re,transparent:!0,depthWrite:!1}),Te=new sg(Ae),tt=.022*Me;return Te.scale.set(tt,11,1),Te.userData.labelBaseScale={x:tt,y:11,z:1},Te}function Pe(P,B,Z){const ae=B.material;Y.set(P,{mesh:B,data:Z,id:P,baseOpacity:ae.opacity,baseEmissive:ae.emissiveIntensity,baseScale:1,presentationOpacity:1}),B.userData.nodeId=P}function ze(P,B,Z,ae,ge,Me){const re=Ce(B,Me);re.visible=X,re.position.set(Z,ae+2.2,ge),t.add(re),_.push({sprite:re,nodeId:P}),q.set(P,re)}const $e=40;function ke(P){var ge;const B=_.findIndex(Me=>Me.nodeId===P);if(B===-1)return;const{sprite:Z}=_[B];t.remove(Z),(ge=Z.material.map)==null||ge.dispose(),Z.material.dispose(),_.splice(B,1),q.delete(P);const ae=A.indexOf(P);ae>=0&&A.splice(ae,1)}function st(){for(let P=0;P<A.length;P+=1){const B=A[P];if(!(B===z.selectedId||B===z.hoveredId||z.selectedId&&Ui(z.selectedId,x).has(B)||!z.selectedId&&z.hoveredId&&Ui(z.hoveredId,x).has(B)))return A.splice(P,1),ke(B),!0}return!1}function $(P){if(q.has(P))return;const B=Y.get(P);if(!(B!=null&&B.data)||B.data.type!=="room")return;for(;A.length>=$e&&st(););if(A.length>=$e)return;const{mesh:Z,data:ae}=B,ge=Z.position;ze(P,ae.name,ge.x,ge.y,ge.z,"#94a3b8"),A.push(P)}function Et(){if(b!=="graph"||!p.length||!i)return;const P=i.position.distanceTo(s.target),B=Ag(P,w),Z=(h==null?void 0:h.tier)??0,ae=(h==null?void 0:h.labelBudget)??180,ge=z.selectedId,Me=z.hoveredId,{primaryId:re}=fo(ge,Me),Ae=re?Ui(re,x):new Set,Te=Pg(ge||Me),tt=Ug(p,{selectedId:ge,hoveredId:Me,pinActive:z.pinActive,budget:ae,neighborIds:Ae,focusWingId:Te,cameraDistanceNorm:B,densityTier:Z}),Ke=(z.searchQuery||"").trim().toLowerCase();for(const de of tt)de.startsWith("room:")&&!q.has(de)&&$(de);q.forEach((de,Ge)=>{var N;const Ie=(N=Y.get(Ge))==null?void 0:N.data;if(!Ie)return;const ct=ht(Ie,Ke),pt=tt.has(Ge),yt={selected:Ge===ge,hovered:Ge===Me,pinned:!!(z.pinActive&&Ge===ge),neighbor:Ae.has(Ge)},At=Cg(B,yt),Lt=de.userData.labelBaseScale;Lt&&de.scale.set(Lt.x*At,Lt.y*At,Lt.z);const M=ct?Lg(B,yt):.12;de.material.opacity=M,de.visible=X&&pt})}function Ue(P,B,Z,ae=.28,ge={}){const Me=[new U(...P),new U(...B)],re=new Jt().setFromPoints(Me),Ae=new _l({color:Z,transparent:!0,opacity:ae}),Te=new og(re,Ae);return Te.userData=ge,t.add(Te),m.push({line:Te,...ge}),Te}function He(P,B,Z,ae,ge){const Me=po(P),re=new rt(Me),Ae=`wing:${P}`,Te=new Un(ge,28,28),tt=new rr({color:re,emissive:re,emissiveIntensity:.22,metalness:.15,roughness:.45,transparent:!0,opacity:.92}),Ke=new Xt(Te,tt);Ke.position.set(B,Z,ae),Ke.userData={id:Ae,name:P,wingId:P,type:"wing",drawers:l[P],label:P,_baseY:Z};const de=new Un(ge*1.25,24,24),Ge=new Mo({color:re,transparent:!0,opacity:.08,side:Vt,depthWrite:!1}),Ie=new Xt(de,Ge);return Ke.add(Ie),t.add(Ke),d.push({mesh:Ke,data:Ke.userData}),Pe(Ae,Ke,Ke.userData),Ke}function Re(P,B,Z,ae,ge,Me){const re=po(B),Ae=new rt(re);Ae.offsetHSL(0,-.05,-.06);const Te=`room:${B}:${P}`,tt=new Un(Me,20,20),Ke=new rr({color:Ae,emissive:Ae,emissiveIntensity:.18,metalness:.12,roughness:.5,transparent:!0,opacity:.88}),de=new Xt(tt,Ke);de.position.set(Z,ae,ge);const Ge=(u[B]||[]).find(ct=>ct.name===P),Ie=(Ge==null?void 0:Ge.roomId)||Ft(B,P);return de.userData={id:Te,name:P,type:"room",wing:B,wingId:B,roomId:Ie,drawers:Ge==null?void 0:Ge.drawers,label:P,_baseY:ae},t.add(de),d.push({mesh:de,data:de.userData}),Pe(Te,de,de.userData),de}function ht(P,B){if(!B)return!0;const Z=[P.name,P.label,P.wing,P.type].filter(Boolean).join(" ").toLowerCase();return Z.includes(B)||B.split(/\s+/).every(ae=>ae.length<2||Z.includes(ae))}function qe(P){return P==null?"":[...P].sort().join("\0")}function E(P,B){return P.searchQuery===B.searchQuery&&P.hoveredId===B.hoveredId&&P.selectedId===B.selectedId&&P.pinActive===B.pinActive&&qe(P.relationshipTypesVisible)===qe(B.relationshipTypesVisible)}function v(){const P=(z.searchQuery||"").trim().toLowerCase(),B=z.hoveredId,Z=z.selectedId,ae=z.pinActive,ge=z.relationshipTypesVisible,Me=(h==null?void 0:h.tier)??0,re=new Map,Ae=(h==null?void 0:h.globalEdgeOpacityMult)??1,Te=(h==null?void 0:h.adjacencyOpacityMult)??1,tt=(h==null?void 0:h.tunnelEmphasisMult)??1;m.forEach(Ge=>{var Se,Le;const{line:Ie,fromId:ct,toId:pt,baseOpacity:yt=.28,isGraphRelationship:At,relationshipType:Lt}=Ge,M=ct?ht(((Se=Y.get(ct))==null?void 0:Se.data)||{},P):!0,N=pt?ht(((Le=Y.get(pt))==null?void 0:Le.data)||{},P):!0,V=!P||M&&N;let j=!0;if(At&&ge!=null){const Be=Lt||"tunnel";j=ge.has(Be)}if(!V){Ie.visible=!0,Ie.material.opacity=yt*.12;return}if(At&&!j){Ie.visible=!1;return}Ie.visible=!0;let G=yt;if(At){const Be=Lt||"tunnel";Be==="taxonomy_adjacency"&&(G*=Te),Be==="tunnel"&&(G*=tt),G*=Ae,G*=Fg({selectedId:Z,hoveredId:B,fromId:ct,toId:pt,relationshipType:Be,densityTier:Me})}Ie.material.opacity=G,At&&(ct&&re.set(ct,(re.get(ct)||0)+1),pt&&re.set(pt,(re.get(pt)||0)+1))});const{primaryId:Ke}=fo(Z,B),de=Ke&&b==="graph"?Ui(Ke,x):null;Y.forEach((Ge,Ie)=>{const{mesh:ct,data:pt,baseOpacity:yt,baseEmissive:At}=Ge,Lt=ct.material;if(!Lt||Lt.type==="MeshBasicMaterial")return;const M=ht(pt,P);let N=M?1:.14,V=1;K&&Ie===K.id&&(V*=1.22),Ie===Z?V*=ae?1.88:1.68:Ie===B&&(V*=Z?1.36:1.48),Ie===Z&&ae?N=Math.max(N,.88):Ie===Z&&(N=Math.max(N,.82));const j=g.get(Ie)||0,G=re.get(Ie)||0;pt.type==="room"&&j>0&&G===0&&b==="graph"&&(N*=Me>=2?.28:Me>=1?.31:.38,V*=Me>=2?.48:.54),de&&(de.has(Ie)&&(N=Math.max(N,Me>=2?.55:.66),V*=1.09),Ie===Ke&&(N=Math.max(N,ae&&Ie===Z?.94:.88))),Ge.presentationOpacity=Math.min(1,N),Lt.opacity=Math.min(1,yt*N),Lt.emissiveIntensity=At*V;const Se=Ie===Z?ae?1.12:1.08:Ie===B?Z&&Ie!==Z?1.04:1.06:de!=null&&de.has(Ie)?1.028:1,Le=M?1:.88;ct.scale.setScalar(Se*Le)}),b==="graph"&&p.length?Et():q.forEach((Ge,Ie)=>{var yt;const ct=(yt=Y.get(Ie))==null?void 0:yt.data;if(!ct)return;const pt=ht(ct,P);Ge.visible=X,Ge.material.opacity=pt?Ie===Z?1:.92:.2})}function W(){const P=Object.keys(l);if(!P.length)return;const B=Math.PI*2/P.length,Z=_t.spacing.wingSeparation/2;P.forEach((re,Ae)=>{const Te=Ae*B,tt=Math.cos(Te)*Z,Ke=Math.sin(Te)*Z,de=l[re]||1,Ge=Zn.mapLinear(de,1,200,_t.nodeSizes.wingMin,_t.nodeSizes.wingMax);He(re,tt,0,Ke,Ge),ze(`wing:${re}`,re,tt,0,Ke,"#e2e8f0")});const ae=new Un(1.1,20,20),ge=new rr({color:_t.accent.center,emissive:3359061,emissiveIntensity:.4,metalness:.3,roughness:.4,transparent:!0,opacity:.55}),Me=new Xt(ae,ge);t.add(Me),d.push({mesh:Me,data:{name:"Palace core",type:"center"}}),P.forEach((re,Ae)=>{const Te=Ae*B,tt=Math.cos(Te)*Z,Ke=Math.sin(Te)*Z;Ue([0,0,0],[tt,0,Ke],_t.accent.linkWing,.22,{fromId:null,toId:`wing:${re}`,baseOpacity:.22})}),H(new U(0,36,88),new U(0,0,0))}function le(P){const B=u[P]||[],Z=_t.nodeSizes.wingMin+1.2;He(P,0,0,0,Z),ze(`wing:${P}`,P,0,0,0,"#e2e8f0");const ae=_t.spacing.roomRadius,ge=Math.max(B.length,1),Me=Math.PI*2/ge;B.forEach((re,Ae)=>{const Te=Ae*Me,tt=Math.cos(Te)*ae,Ke=Math.sin(Te)*ae,de=Zn.mapLinear(re.drawers||1,1,80,_t.nodeSizes.roomMin,_t.nodeSizes.roomMax);Re(re.name,P,tt,0,Ke,de),Ue([0,0,0],[tt,0,Ke],_t.accent.linkWing,.22,{fromId:`wing:${P}`,toId:`room:${P}:${re.name}`,baseOpacity:.22}),ze(`room:${P}:${re.name}`,re.name,tt,0,Ke,"#94a3b8")}),H(new U(0,38,72),new U(0,0,0))}function se(){const P=Object.keys(u);if(!P.length)return;const B=Math.PI*2/P.length,Z=_t.spacing.wingSeparation/2;P.forEach((re,Ae)=>{const Te=Ae*B,tt=Math.cos(Te)*Z,Ke=Math.sin(Te)*Z;He(re,tt,0,Ke,_t.nodeSizes.wingMin),ze(`wing:${re}`,re,tt,0,Ke,"#cbd5e1");const de=u[re]||[],Ge=Math.PI*2/Math.max(de.length,1),Ie=_t.spacing.roomRadius;de.forEach((ct,pt)=>{const yt=Te+pt*Ge,At=tt+Math.cos(yt)*Ie,Lt=Ke+Math.sin(yt)*Ie,M=Zn.mapLinear(ct.drawers||1,1,80,_t.nodeSizes.roomMin,_t.nodeSizes.roomMax);Re(ct.name,re,At,0,Lt,M),Ue([tt,0,Ke],[At,0,Lt],_t.accent.linkWing,.18,{fromId:`wing:${re}`,toId:`room:${re}:${ct.name}`,baseOpacity:.18}),ze(`room:${re}:${ct.name}`,ct.name,At,0,Lt,"#94a3b8")})});const ae=new Un(1.1,20,20),ge=new rr({color:_t.accent.center,emissive:3359061,emissiveIntensity:.35,metalness:.25,roughness:.45,transparent:!0,opacity:.5}),Me=new Xt(ae,ge);t.add(Me),d.push({mesh:Me,data:{name:"Palace core",type:"center"}}),P.forEach((re,Ae)=>{const Te=Ae*B;Ue([0,0,0],[Math.cos(Te)*Z,0,Math.sin(Te)*Z],_t.accent.linkWing,.2,{baseOpacity:.2})}),H(new U(0,52,102),new U(0,0,0))}function ue(){F&&u[F]?le(F):se()}function De(P){return[...P].sort((B,Z)=>B.localeCompare(Z))}function ye(){const P=new Map;Object.keys(l).forEach(de=>{P.set(de,{name:de,type:"wing",wing:de,x:0,y:0,z:0})}),Object.entries(u).forEach(([de,Ge])=>{Ge.forEach(Ie=>{P.set(Ft(de,Ie.name),{name:Ie.name,type:"room",wing:de,x:0,y:0,z:0,drawers:Ie.drawers})})});const B=Array.from(P.values());if(!B.length){const de=new Un(1.1,16,16),Ge=new rr({color:_t.accent.center,emissive:3359061,emissiveIntensity:.25,metalness:.2,roughness:.5,transparent:!0,opacity:.35}),Ie=new Xt(de,Ge);t.add(Ie),d.push({mesh:Ie,data:{name:"No graph data",type:"center"}}),H(new U(0,28,72),new U(0,0,0));return}const Z=De(Object.keys(l));g=kg(B,f,sr),x=Dg(f,B,sr),h=Sg(B.length,f.length,Z.length),J&&(h={...h,labelBudget:Math.min(h.labelBudget,95)}),bg(B,Z,h),wg(B,f,h,sr),Tg(B,h.collisionMinDist,12),t.fog&&t.fog.isFogExp2&&(t.fog.density=h.fogDensity),a!=null&&a.material&&(a.material.opacity=Math.max(.12,.34-h.tier*.055)),p=B.map(de=>{const Ge=de.type==="wing"?`wing:${de.name}`:`room:${de.wing}:${de.name}`,Ie=g.get(Ge)||0;return{id:Ge,incidentFull:Ie,baseScore:Ng({type:de.type,incidentFull:Ie,drawers:de.drawers})}});const ae=Ig(p,h);B.forEach(de=>{const Ge=de.type==="wing",Ie=Ge?_t.nodeSizes.wingMin+.4:_t.nodeSizes.roomMin+.2;if(Ge)He(de.name,de.x,de.y,de.z,Ie),ze(`wing:${de.name}`,de.name,de.x,de.y,de.z,"#cbd5e1");else{const ct=`room:${de.wing}:${de.name}`;Re(de.name,de.wing,de.x,de.y,de.z,Ie),ae.has(ct)&&ze(ct,de.name,de.x,de.y,de.z,"#94a3b8")}}),f.forEach(de=>{const Ge=sr(B,de,"from"),Ie=sr(B,de,"to");if(Ge&&Ie){const ct=Xi(Ge),pt=Xi(Ie),yt=ds(de),At=mg(yt);Ue([Ge.x,Ge.y,Ge.z],[Ie.x,Ie.y,Ie.z],At.color,At.opacity,{fromId:ct,toId:pt,baseOpacity:At.opacity,isGraphRelationship:!0,relationshipType:yt})}});const ge=new $i;B.forEach(de=>ge.expandByPoint(new U(de.x,de.y,de.z)));const Me=new U;ge.getCenter(Me);const re=new U;ge.getSize(re);const Ae=Math.max(re.x,re.y,re.z,12);w=Ae;const Te=yc(Ae*.48,i.fov,h.tier),tt=new U(.35,.42,1).normalize(),Ke=Me.clone().add(tt.multiplyScalar(Te));S={position:Ke.clone(),target:Me.clone()},H(Ke,Me)}function be(){const B=C&&!(b==="graph")&&!J;s.autoRotate=B,s.autoRotateSpeed=.35*(B?1:0)}function Oe(P,B=null){b=P,F=B,ee(),k=null,z.hoveredId=null,be(),P==="wings"?W():P==="rooms"?ue():P==="graph"&&ye(),v()}function Ye(){k=null,z.hoveredId=null,r.domElement.style.cursor="default",v(),Q.onHover(null,{x:0,y:0})}function ie(P){var Me,re;const B=r.domElement.getBoundingClientRect();pe.x=(P.clientX-B.left)/B.width*2-1,pe.y=-((P.clientY-B.top)/B.height)*2+1,fe.setFromCamera(pe,i);const Z=d.map(Ae=>Ae.mesh).filter(Boolean),ae=fe.intersectObjects(Z,!0);for(let Ae=0;Ae<ae.length;Ae+=1){let Te=ae[Ae].object;for(;Te&&!((Me=Te.userData)!=null&&Me.type);)Te=Te.parent;if(Te&&((re=Te.userData)!=null&&re.type)&&Te.userData.type!=="center"){const tt=Te.userData.id||null,Ke=k!==Te||z.hoveredId!==tt;k=Te,z.hoveredId=tt,r.domElement.style.cursor="pointer",Ke&&v(),Q.onHover({...Te.userData},{x:P.clientX,y:P.clientY});return}}const ge=z.hoveredId!=null;k=null,z.hoveredId=null,r.domElement.style.cursor="default",ge&&v(),Q.onHover(null,{x:P.clientX,y:P.clientY})}function ut(){if(!k){K=null,Q.onBackgroundClick(),Q.onClick(null);return}const P={...k.userData};P.id&&P.type!=="center"&&(y&&clearTimeout(y),K={id:P.id,at:performance.now()},v(),y=setTimeout(()=>{y=0,K=null,v()},190)),Q.onClick(P)}function Ze(){o=requestAnimationFrame(Ze),s.update();const P=Date.now()*.001,B=J?0:.42*I,Z=J?0:.006*I;d.forEach((ge,Me)=>{if(!ge.data||ge.data.type==="center")return;const re=Me*.37,Ae=ge.mesh.userData._baseY??0;ge.mesh.position.y=Ae+Math.sin(P*.9+re)*B,ge.mesh.rotation.y+=Z});const ae=(h==null?void 0:h.tier)??0;if(b==="graph"){let ge=s.target;z.selectedId&&Y.get(z.selectedId)?ge=Y.get(z.selectedId).mesh.position:z.hoveredId&&Y.get(z.hoveredId)&&(ge=Y.get(z.hoveredId).mesh.position);const Me=z.selectedId||z.hoveredId,re=Me?Ui(Me,x):new Set,Ae=!!(z.selectedId||z.hoveredId);Y.forEach((Te,tt)=>{const Ke=Te.mesh.material;if(!Ke||Ke.type==="MeshBasicMaterial")return;const de=Te.mesh.position.distanceTo(ge),Ge=Og(de,ae,{isNeighbor:re.has(tt),focusActive:Ae});Ke.opacity=Math.min(1,Te.baseOpacity*(Te.presentationOpacity??1)*Ge)}),Et()}r.render(t,i)}function Xe(){t=new ig,t.background=new rt(724760),t.fog=new wo(724760,.0026),i=new rn(58,n.clientWidth/n.clientHeight,.1,1200),i.position.set(0,34,90),r=new pl({antialias:!0,alpha:!1,powerPreference:"high-performance"}),r.setSize(n.clientWidth,n.clientHeight),r.setPixelRatio(Math.min(window.devicePixelRatio,2)),r.outputColorSpace=It,r.toneMapping=Bc,r.toneMappingExposure=1.05,n.appendChild(r.domElement),s=new pg(i,r.domElement),s.enableDamping=!0,s.dampingFactor=.055,s.autoRotate=!0,s.autoRotateSpeed=.35,s.maxPolarAngle=Math.PI*.495;const P=new lg(6583435,988970,.85);t.add(P);const B=new fc(10859772,1.1);B.position.set(20,40,24),t.add(B);const Z=new fc(3718648,.35);if(Z.position.set(-24,12,-18),t.add(Z),xe(),typeof window<"u"&&window.matchMedia){const ae=window.matchMedia("(prefers-reduced-motion: reduce)");J=ae.matches,ae.addEventListener("change",ge=>{J=ge.matches,be()})}r.domElement.addEventListener("pointermove",ie),r.domElement.addEventListener("click",ut),r.domElement.addEventListener("pointerleave",Ye),window.addEventListener("resize",Ne),Ze()}function Ne(){if(!i||!r)return;const P=n.clientWidth,B=n.clientHeight;i.aspect=P/B,i.updateProjectionMatrix(),r.setSize(P,B)}function Ee(P){l=P.wingsData||{},u=P.roomsData||{},f=P.graphEdges||[]}function T(){if(b==="graph"&&S){H(S.position.clone(),S.target.clone());return}H(new U(0,34,90),new U(0,0,0))}function he(P){const B=Y.get(P);if(!B)return;const Z=new U;if(B.mesh.getWorldPosition(Z),b==="graph"&&h){const Me=[];m.forEach(ct=>{if(!ct.isGraphRelationship)return;let pt=null;if(ct.fromId===P?pt=ct.toId:ct.toId===P&&(pt=ct.fromId),!pt)return;const yt=Y.get(pt);yt&&Me.push(yt.mesh.position.clone())});const re=Me.length,Ae=zg(Z,Me.length?Me:[Z.clone()]),Te=yc(Ae,i.fov,h.tier,{neighborCount:re});let tt=i.position.clone().sub(Z);tt.lengthSq()<4&&tt.set(32,26,72),tt.normalize(),D===P?R+=1:(D=P,R=0);const Ke=Math.max(Ae*2.4,w*.42,28),de=Bg(Ke,h.tier,R),Ge=new U(Z.x+de.x,Z.y+de.y,Z.z+de.z),Ie=R>0?1020:880;H(Z.clone().add(tt.multiplyScalar(Te)),Ge,Ie);return}const ae=i.position.clone().sub(Z).normalize(),ge=b==="rooms"&&F?26:30;H(Z.clone().add(ae.multiplyScalar(ge)),Z)}function Fe(){var P;(P=k==null?void 0:k.userData)!=null&&P.id&&he(k.userData.id)}function we(P){const B={...z,...P};E(z,B)||(z=B,v())}function oe(P){we({relationshipTypesVisible:P})}function L(){z.selectedId=null,v()}function me(){var P;cancelAnimationFrame(o),c&&cancelAnimationFrame(c),window.removeEventListener("resize",Ne),r!=null&&r.domElement&&(r.domElement.removeEventListener("pointermove",ie),r.domElement.removeEventListener("click",ut),r.domElement.removeEventListener("pointerleave",Ye)),ee(),y&&clearTimeout(y),y=0,a&&(t.remove(a),a.geometry.dispose(),a.material.dispose()),r==null||r.dispose(),(P=r==null?void 0:r.domElement)!=null&&P.parentNode&&r.domElement.parentNode.removeChild(r.domElement)}return{init:Xe,setData:Ee,setView:Oe,updatePresentation:we,setAutoRotate(P){C=P,be()},setMotionIntensity(P){I=Math.max(0,Math.min(2,P))},setLabelsVisible(P){if(X=!!P,X&&!_.length){Oe(b,F);return}_.forEach(({sprite:B})=>{B.visible=X})},resetCamera:T,centerOnHovered:Fe,centerOnNodeId:he,clearPin:L,resize:Ne,dispose:me,getView:()=>b,getFocusWing:()=>F,getHovered:()=>k?{...k.userData}:null,setCallbacks(P){Object.assign(Q,P)},setRelationshipFilters:oe,getGraphNeighbors(P){return b!=="graph"||!P?[]:[...Ui(P,x)].sort((Z,ae)=>Z.localeCompare(ae))}}}function sn(n,e,t=null){var o,c;if(n==null||typeof n!="string")return null;const i=n.trim();if(!i)return null;const r=si(i);if(r){const{wingId:l,roomName:u}=r;if((o=e[l])!=null&&o.some(f=>f.name===u))return{wing:l,room:u,key:Ft(l,u)}}if(i.includes("/")){const l=i.indexOf("/"),u=i.slice(0,l),f=i.slice(l+1);return(c=e[u])!=null&&c.some(d=>d.name===f)?{wing:u,room:f,key:Ft(u,f)}:null}const s=[];for(const[l,u]of Object.entries(e||{}))if(Array.isArray(u))for(const f of u)f.name===i&&s.push({wing:l,room:i,key:`${l}/${i}`});if(s.length===0)return null;if(s.length===1){const l=s[0];return{...l,key:Ft(l.wing,l.room)}}if(t&&s.some(l=>l.wing===t)){const l=s.find(u=>u.wing===t)||s[0];return{...l,key:Ft(l.wing,l.room)}}const a=s[0];return{...a,key:Ft(a.wing,a.room)}}function Xg(n,e,t=null){if(t!=null&&typeof t=="number")return t;const i=Array.isArray(n)?n:[],r=e&&typeof e=="object"?e:{};let s=0;for(const a of i){const o=sn(a.from,r,null),c=sn(a.to,r,a.wing||null);(!o||!c)&&(s+=1)}return s}function $g(n,e,t,i){var F;const r=n&&typeof n=="object"?n:{},s=Array.isArray(e)?e:[],a=new Set,o=new Map,c=new Map,l=new Map,u=new Map;function f(I,X){u.has(I)||u.set(I,new Set),u.get(I).add(X)}function d(I,X,C=1){I.set(X,(I.get(X)||0)+C)}let m=0,_=0;for(const I of s){const X=I.sourceRoomId,C=I.targetRoomId;if(!X||!C||X===C)continue;const k=X<C?`${X}||${C}`:`${C}||${X}`;if(a.has(k))continue;a.add(k),d(o,X),d(o,C),I.sourceWingId!==I.targetWingId?(m+=1,d(c,X),d(c,C)):(_+=1,d(l,X),d(l,C)),f(X,C),f(C,X)}const g=new Set([...o.keys()]),p=new Set;for(const[I,X]of Object.entries(r))if(Array.isArray(X))for(const C of X)p.add(C.roomId||Ft(I,C.name));const h=[];for(const I of p)g.has(I)||h.push(I);let S=m+_;t&&typeof t.resolvedEdgeCount=="number"&&(S=t.resolvedEdgeCount);const x=S>0?m/S:null;let D=[...o.entries()].sort((I,X)=>X[1]-I[1]).slice(0,8).map(([I,X])=>{const C=si(I);return{wing:(C==null?void 0:C.wingId)??I.split("/")[0],room:(C==null?void 0:C.roomName)??I.slice(I.indexOf("/")+1),key:I,degree:X}});(F=i==null?void 0:i.topConnectedRooms)!=null&&F.length&&(D=i.topConnectedRooms.slice(0,8).map(I=>({wing:I.wingId,room:I.name,key:I.roomId,degree:I.degree})));const R=new Map;for(const I of s)I.sourceWingId!==I.targetWingId&&(d(R,I.sourceWingId),d(R,I.targetWingId));const A=[...R.entries()].sort((I,X)=>X[1]-I[1]).slice(0,8).map(([I,X])=>({wing:I,crossEdges:X})),K=Sl(o),y=t&&typeof t.crossWingEdgeCount=="number"?t.crossWingEdgeCount:null,b=t&&typeof t.intraWingEdgeCount=="number"?t.intraWingEdgeCount:null;return{edgeCount:s.length,resolvedEdgeCount:S,crossWingEdgeCount:y??m,intraWingEdgeCount:b??_,byRelationshipType:t!=null&&t.byType&&typeof t.byType=="object"?{...t.byType}:null,crossFraction:x,degreeByKey:o,crossByKey:c,intraByKey:l,neighborsByKey:u,topConnectedRooms:D,topCrossLinkedWings:A,roomsWithNoTunnels:typeof(i==null?void 0:i.roomsWithNoLinks)=="number"?i.roomsWithNoLinks:h.length,noTunnelRoomKeys:h.slice(0,50),medianRoomDegree:K,hasResolvableEdges:S>0}}function jg(n,e,t,i){var b;const r=Array.isArray(n)?n:[],s=e&&typeof e=="object"?e:{},a=new Set,o=new Map,c=new Map,l=new Map,u=new Map;function f(F,I){u.has(F)||u.set(F,new Set),u.get(F).add(I)}function d(F,I,X=1){F.set(I,(F.get(I)||0)+X)}for(const F of r){const I=sn(F.from,s,null),X=sn(F.to,s,F.wing||null);if(!I||!X)continue;const C=I.key,k=X.key;if(C===k)continue;const z=C<k?`${C}||${k}`:`${k}||${C}`;if(a.has(z))continue;a.add(z),d(o,C),d(o,k),I.wing!==X.wing?(d(c,C),d(c,k)):(d(l,C),d(l,k)),f(C,k),f(k,C)}const m=new Set;for(const[F,I]of Object.entries(s))if(Array.isArray(I))for(const X of I)m.add(Ft(F,X.name));const _=[];for(const F of m)o.has(F)||_.push(F);let g=0,p=0;for(const F of r){const I=sn(F.from,s,null),X=sn(F.to,s,F.wing||null);!I||!X||(I.wing!==X.wing?g+=1:p+=1)}const h=g+p,S=h>0?g/h:null;let w=[...o.entries()].sort((F,I)=>I[1]-F[1]).slice(0,8).map(([F,I])=>{const X=si(F);return{wing:(X==null?void 0:X.wingId)??F.split("/")[0],room:(X==null?void 0:X.roomName)??F.slice(F.indexOf("/")+1),key:F,degree:I}});(b=i==null?void 0:i.topConnectedRooms)!=null&&b.length&&(w=i.topConnectedRooms.slice(0,8).map(F=>({wing:F.wingId,room:F.name,key:F.roomId,degree:F.degree})));const D=new Map;for(const F of r){const I=sn(F.from,s,null),X=sn(F.to,s,F.wing||null);!I||!X||I.wing===X.wing||(d(D,I.wing),d(D,X.wing))}const R=[...D.entries()].sort((F,I)=>I[1]-F[1]).slice(0,8).map(([F,I])=>({wing:F,crossEdges:I})),A=Sl(o),K=t&&typeof t.crossWingEdgeCount=="number"?t.crossWingEdgeCount:null,y=t&&typeof t.intraWingEdgeCount=="number"?t.intraWingEdgeCount:null;return{edgeCount:r.length,resolvedEdgeCount:h,crossWingEdgeCount:K??g,intraWingEdgeCount:y??p,crossFraction:S,degreeByKey:o,crossByKey:c,intraByKey:l,neighborsByKey:u,topConnectedRooms:w,topCrossLinkedWings:R,roomsWithNoTunnels:typeof(i==null?void 0:i.roomsWithNoLinks)=="number"?i.roomsWithNoLinks:_.length,noTunnelRoomKeys:_.slice(0,50),medianRoomDegree:A,hasResolvableEdges:h>0}}function qg(n,e={}){const{edgesResolved:t,graphEdges:i,graphSummary:r=null,overviewStats:s=null}=e;return t!=null&&t.length?$g(n,t,r,s):jg(i||[],n,r,s)}function Sl(n){const e=[...n.values()].sort((i,r)=>i-r);if(!e.length)return null;const t=Math.floor(e.length/2);return e.length%2?e[t]:(e[t-1]+e[t])/2}function Yg(n,e){var u;if(!e||!n)return null;const t=e.degreeByKey.get(n)??0,i=e.crossByKey.get(n)??0,r=e.intraByKey.get(n)??0,s=e.neighborsByKey.get(n),a=s?[...s]:[],o=a.slice(0,12).map(f=>{const d=si(f),m=e.degreeByKey.get(f)??0;return{wing:(d==null?void 0:d.wingId)??f.split("/")[0],room:(d==null?void 0:d.roomName)??f.slice(f.indexOf("/")+1),key:f,degree:m}});o.sort((f,d)=>d.degree-f.degree);const c=new Map;for(const f of a){const d=(u=si(f))==null?void 0:u.wingId;d&&c.set(d,(c.get(d)||0)+1)}const l=[...c.entries()].sort((f,d)=>d[1]-f[1]).slice(0,8).map(([f,d])=>({wing:f,links:d}));return{degree:t,crossWingLinks:i,intraWingLinks:r,medianDegree:e.medianRoomDegree,relatedRooms:o.slice(0,8),relatedWings:l,isBridge:i>=1&&a.length>0}}function Mc(n,e){if(!n||!Array.isArray(e))return{degree:0,crossWingLinks:0,intraWingLinks:0,byType:{},relatedRoomKeys:[]};let t=0,i=0,r=0;const s={},a=[];for(const o of e){const c=o.sourceRoomId,l=o.targetRoomId;if(!c||!l||c!==n&&l!==n)continue;t+=1;const u=o.relationshipType||"tunnel";s[u]=(s[u]||0)+1,o.sourceWingId!=null&&o.targetWingId!=null&&o.sourceWingId!==o.targetWingId?i+=1:r+=1,a.push(c===n?l:c)}return{degree:t,crossWingLinks:i,intraWingLinks:r,byType:s,relatedRoomKeys:[...new Set(a)]}}function Sc(n,e){const t={};let i=0;for(const r of e||[]){if(!r.sourceWingId||!r.targetWingId||!(r.sourceWingId===n||r.targetWingId===n))continue;const a=r.relationshipType||"tunnel";t[a]=(t[a]||0)+1,r.sourceWingId!==r.targetWingId&&(i+=1)}return{byType:t,crossWingTouches:i}}function Kg(n,e,t,i=null){if(i!=null&&i.length)return Zg(n,i);const r=Array.isArray(e)?e:[],s=new Map;let a=0;for(const u of r){const f=sn(u.from,t,n),d=sn(u.to,t,u.wing||null);if(!f||!d||f.wing===d.wing||f.wing!==n&&d.wing!==n)continue;a+=1;const m=f.wing===n?d:f;s.set(m.wing,(s.get(m.wing)||0)+1)}const o=[...s.entries()].sort((u,f)=>f[1]-u[1]).slice(0,6).map(([u,f])=>({wing:u,edges:f})),c=new Map;for(const u of r){const f=sn(u.from,t,n),d=sn(u.to,t,u.wing||null);!f||!d||(f.wing===n&&d.wing!==n&&c.set(f.key,(c.get(f.key)||0)+1),d.wing===n&&f.wing!==n&&c.set(d.key,(c.get(d.key)||0)+1))}const l=[...c.entries()].sort((u,f)=>f[1]-u[1]).slice(0,5).map(([u,f])=>{const d=si(u);return{wing:(d==null?void 0:d.wingId)??u.split("/")[0],room:(d==null?void 0:d.roomName)??u.slice(u.indexOf("/")+1),key:u,crossEdges:f}});return{crossWingTouches:a,topExternalWings:o,topRoomsByCrossWing:l}}function Zg(n,e){const t=new Map;let i=0;for(const o of e){if(o.sourceWingId===o.targetWingId||o.sourceWingId!==n&&o.targetWingId!==n)continue;i+=1;const c=o.sourceWingId===n?o.targetWingId:o.sourceWingId;t.set(c,(t.get(c)||0)+1)}const r=[...t.entries()].sort((o,c)=>c[1]-o[1]).slice(0,6).map(([o,c])=>({wing:o,edges:c})),s=new Map;for(const o of e)o.sourceWingId!==o.targetWingId&&(o.sourceWingId===n&&o.targetWingId!==n&&s.set(o.sourceRoomId,(s.get(o.sourceRoomId)||0)+1),o.targetWingId===n&&o.sourceWingId!==n&&s.set(o.targetRoomId,(s.get(o.targetRoomId)||0)+1));const a=[...s.entries()].sort((o,c)=>c[1]-o[1]).slice(0,5).map(([o,c])=>{const l=si(o);return{wing:(l==null?void 0:l.wingId)??o.split("/")[0],room:(l==null?void 0:l.roomName)??o.slice(o.indexOf("/")+1),key:o,crossEdges:c}});return{crossWingTouches:i,topExternalWings:r,topRoomsByCrossWing:a}}function Co(n){let e=0;for(const t of Object.values(n||{}))Array.isArray(t)&&(e+=t.length);return e}function El(n,e){const t=n==null?void 0:n[e];return Array.isArray(t)?t.reduce((i,r)=>i+(Number(r.drawers)||0),0):0}function Jg(n){let e=0;for(const t of Object.values(n||{}))typeof t=="number"&&(e+=t);return e}function Lo(n){const e=Object.entries(n||{}).filter(([,t])=>typeof t=="number");return e.sort((t,i)=>i[1]-t[1]),e.map(([t,i],r)=>({wing:t,rank:r+1,drawers:i}))}function Qg(n){const e=Object.entries(n||{}).map(([t,i])=>({wing:t,roomCount:Array.isArray(i)?i.length:0}));return e.sort((t,i)=>i.roomCount-t.roomCount),e.map((t,i)=>({...t,rank:i+1}))}function Po(n,e){const t=n==null?void 0:n[e];return Array.isArray(t)?[...t].sort((r,s)=>(s.drawers||0)-(r.drawers||0)).map((r,s)=>({...r,rank:s+1})):[]}function On(n){const e=n%10,t=n%100;return t>=11&&t<=13?`${n}th`:e===1?`${n}st`:e===2?`${n}nd`:e===3?`${n}rd`:`${n}th`}function os(n,e,t=1){return e==null||e<=0||n==null?null:(100*(Number(n)/e)).toFixed(t)}function e_({drawers:n=0,wingRoomSum:e,palaceTotal:t},i,r){const s=(i==null?void 0:i.degree)??0,a=(i==null?void 0:i.crossWingLinks)??0,o=(i==null?void 0:i.intraWingLinks)??0,c=(i==null?void 0:i.medianDegree)??null,l=e>0&&n>=e*.2,u=e>0&&n<=e*.05&&n>0,f=c!=null&&s>=c*2&&s>=2,d=s===0;return r?d?{label:"Isolated room",detail:"This room does not appear on any resolved tunnel edge (or naming does not match graph endpoints)."}:a>=2&&f?{label:"Dense cross-wing connector",detail:"High tunnel degree with multiple cross-wing links."}:a>=1&&f?{label:"Highly connected hub",detail:"Above-average tunnel degree with cross-wing reach."}:a>=1&&o<=1?{label:"Cross-wing bridge",detail:"Most links span outside this wing."}:l&&s<=(c||1)?{label:"Large but weakly connected",detail:"Many drawers relative to the wing, few tunnel links."}:u&&f?{label:"Small but structurally important",detail:"Fewer drawers than peers, but high connectivity."}:f?{label:"Highly connected hub",detail:c!=null?`Degree ${s} vs median ${c}.`:`Degree ${s}.`}:t>0&&n/t>=.08&&s<2?{label:"Major archive, few tunnels",detail:"Large share of palace drawers with sparse tunnels."}:{label:"Balanced footprint",detail:"Typical size and connectivity for this palace."}:{label:"Tunnel graph unavailable",detail:"No resolvable tunnel edges for the loaded taxonomy, or graph-stats returned empty."}}function t_(n,e){const{totalDrawers:t,wingCount:i,roomCount:r,tunnelNodeCount:s,graphEdgeCount:a,kgAvailable:o,kgSummary:c,ga:l,wingsData:u}=n,f=Lo(u).slice(0,5),d={wings:"Wing spheres are sized by drawer count. Click a wing to open its rooms.",rooms:n.focusWing?`Focused on “${n.focusWing}”: rooms orbit the wing. Click another wing in “all rooms” layout or use search.`:"Each cluster is a wing; rooms orbit their wing. Click a room to inspect and center.",graph:"Force-directed graph. Edges combine tunnel links and same-wing taxonomy adjacency."};let m="";return!l.hasResolvableEdges&&a===0?m="No graph edges loaded.":l.hasResolvableEdges?l.crossFraction!=null&&(m=l.crossFraction>=.5?"Cross-wing tunnel links account for a large share of resolved graph edges.":"Resolved edges mix same-wing taxonomy adjacency with cross-wing tunnels."):m="Graph metadata is present but endpoints could not be matched to taxonomy rooms (check naming).",{totalDrawers:t,wingCount:i,roomCount:r,tunnelNodeCount:s,graphEdgeCount:a,crossWingEdges:l.crossWingEdgeCount,kgAvailable:o,kgSummary:c,largestWingsByDrawers:f,mostConnectedRooms:l.topConnectedRooms.slice(0,5),mostCrossLinkedWings:l.topCrossLinkedWings.slice(0,5),roomsWithNoTunnels:l.roomsWithNoTunnels,viewHint:d[e]||d.wings,graphBlurb:m,ga:l}}const n_=new Set(["wings","rooms","graph"]);function i_(n){return n==null||typeof n!="object"?null:n}function r_(n){const e=i_(n);return e?{view:n_.has(e.view)?e.view:"wings",currentWing:typeof e.currentWing=="string"?e.currentWing:e.currentWing??null,currentRoom:typeof e.currentRoom=="string"?e.currentRoom:e.currentRoom??null,selected:e.selected&&typeof e.selected=="object"?e.selected:null,pinned:!!e.pinned,searchQuery:typeof e.searchQuery=="string"?e.searchQuery:"",labels:e.labels,rotate:e.rotate,motion:e.motion}:{view:"wings",currentWing:null,currentRoom:null,selected:null,pinned:!1,searchQuery:"",labels:void 0,rotate:void 0,motion:void 0}}function s_(n,e){var r,s;const t=(e==null?void 0:e.wingsData)||{},i=(e==null?void 0:e.roomsData)||{};if(n.currentWing&&!zi(t,n.currentWing)&&(n.currentWing=null,n.currentRoom=null,n.selected=null,n.pinned=!1),n.currentRoom&&n.currentWing&&(ki(i,n.currentWing,n.currentRoom)||(n.currentRoom=null,((r=n.selected)==null?void 0:r.type)==="room"&&(n.selected=null,n.pinned=!1))),(s=n.selected)!=null&&s.id){const a=n.selected;a.type==="wing"&&!zi(t,a.name)&&(n.selected=null,n.pinned=!1),a.type==="room"&&(!a.wing||!ki(i,a.wing,a.name))&&(n.selected=null,n.pinned=!1)}n.pinned&&!n.selected&&(n.pinned=!1)}function Do(n,e,t=8){if(!e||e.view!=="graph")return n;for(n.push(e);n.length>t;)n.shift();return n}function o_(n){return n.length?n.pop():null}function a_(n,e,t){const i=n;if(!i.length)return null;const r=i.indexOf(e),s=i.length;return r===-1?t>=0?i[0]:i[s-1]:i[(r+t+s*16)%s]}function c_(n){if(!n||!n.startsWith("room:"))return null;const e=n.slice(5),t=e.indexOf(":");return t<=0?null:{wing:e.slice(0,t),room:e.slice(t+1)}}const Io="mempalace-viz-explorer-v1",bl="mempalace-viz-panel-state-v1";let Kt=new Set;const Vn=[{id:"wings",title:"Wings",hint:"High-level structure by domain or project."},{id:"rooms",title:"Rooms",hint:"Rooms within each wing, orbiting their parent."},{id:"graph",title:"Graph",hint:"Tunnel relationships across rooms."}],O={view:"wings",hovered:null,selected:null,pinned:!1,currentWing:null,currentRoom:null,searchQuery:"",filters:{visibleWings:null}};let te=null,ne=null,Ec=null,bc=null,Qn=null,wc=null;const qi=[],ce=n=>document.getElementById(n);function Tc(n){if(!n||!(n instanceof HTMLElement))return!1;const e=n.tagName;return!!(e==="INPUT"||e==="TEXTAREA"||e==="SELECT"||n.isContentEditable)}function fs(n,e=5200){const t=ce("toast-host");t&&(clearTimeout(wc),t.innerHTML=`<div class="toast" role="status">${Qe(n)}</div>`,wc=setTimeout(()=>{t.innerHTML=""},e))}function l_(n){var s,a,o;if(O.view!=="graph")return"";const e=ne==null?void 0:ne.graphStats,t=ne==null?void 0:ne.graph,i=((s=ne==null?void 0:ne.graphEdges)==null?void 0:s.length)??0,r=Array.isArray(t==null?void 0:t.edgesUnresolved)?t.edgesUnresolved.length:Array.isArray(e==null?void 0:e.edgesUnresolved)?e.edgesUnresolved.length:null;if(!i)return'<div class="inspect-card inspect-card--hint" role="status"><strong>Graph view</strong><p class="inspect-muted inspect-muted--tight">No graph edges were returned from graph-stats. Wings and rooms may still appear if taxonomy is loaded.</p></div>';if(!((a=n.ga)!=null&&a.hasResolvableEdges)){const c=r??Xg(ne==null?void 0:ne.graphEdges,ne==null?void 0:ne.roomsData,((o=t==null?void 0:t.edgesUnresolved)==null?void 0:o.length)??null);return`<div class="inspect-card inspect-card--hint" role="status"><strong>Graph view</strong><p class="inspect-muted inspect-muted--tight">Loaded ${i} graph edge${i===1?"":"s"}, but endpoints could not be fully matched to taxonomy rooms${c?` (${c} edge${c===1?"":"s"} unresolved).`:"."} Layout may be sparse.</p></div>`}return""}function u_(){return!!(O.pinned&&O.selected)}function Uo(){return{view:"graph",selected:O.selected,pinned:O.pinned,currentWing:O.currentWing,currentRoom:O.currentRoom}}function Js(){var i,r;if(O.view!=="graph"||!O.selected||O.selected.type==="center")return"";const n=O.selected.id,e=((r=(i=te==null?void 0:te.getGraphNeighbors)==null?void 0:i.call(te,n))==null?void 0:r.length)??0,t=e>0;return`<div class="graph-explore-strip" role="group" aria-label="Graph exploration">
    <button type="button" class="btn btn--ghost btn--sm" data-graph-action="frame-nbr" title="Re-frame camera on selection and its neighbors">Frame neighborhood</button>
    <span class="graph-explore-strip__nav">
      <button type="button" class="btn btn--ghost btn--sm" data-graph-action="prev" ${t?"":"disabled"} title="Previous connected room ([)">◀</button>
      <button type="button" class="btn btn--ghost btn--sm" data-graph-action="next" ${t?"":"disabled"} title="Next connected room (])">▶</button>
    </span>
    <button type="button" class="btn btn--ghost btn--sm" data-graph-action="back" title="Prior graph focus (U)">Back</button>
    <span class="graph-explore-strip__meta" aria-hidden="true">${e} link${e===1?"":"s"}</span>
  </div>`}function h_(){var n;O.view!=="graph"||!((n=O.selected)!=null&&n.id)||te==null||te.centerOnNodeId(O.selected.id)}function as(n){var a;if(O.view!=="graph"||!((a=O.selected)!=null&&a.id)||!(te!=null&&te.getGraphNeighbors))return;const e=O.selected.id,t=te.getGraphNeighbors(e),i=a_(t,e,n);if(!i){fs("No connected rooms in this graph slice.");return}if(i===e)return;const r=c_(i);if(!r||!ne||!ki(ne.roomsData,r.wing,r.room))return;Do(qi,Uo());const s=(ne.roomsData[r.wing]||[]).find(o=>o.name===r.room);O.currentWing=r.wing,O.currentRoom=r.room,O.selected={id:i,type:"room",name:r.room,wing:r.wing,wingId:r.wing,roomId:(s==null?void 0:s.roomId)||Ft(r.wing,r.room),drawers:s==null?void 0:s.drawers},O.pinned=!0,Ut(),te==null||te.centerOnNodeId(i),wt(),St()}function wl(){var e;const n=o_(qi);if(!n||n.view!=="graph"||!((e=n.selected)!=null&&e.id)){fs("No prior focus in history.");return}O.selected=n.selected,O.pinned=n.pinned,O.currentWing=n.currentWing,O.currentRoom=n.currentRoom,Ut(),te==null||te.centerOnNodeId(n.selected.id),wt(),St()}function Qe(n){return String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function Ve(n){return n==null||Number.isNaN(Number(n))?"—":Number(n).toLocaleString()}function d_(n){if(!n||typeof n!="object")return null;const e=[];for(const[t,i]of Object.entries(n))t!=="error"&&(typeof i=="number"?e.push(`${t}: ${Ve(i)}`):typeof i=="string"&&e.push(`${t}: ${i}`));return e.length?e.slice(0,8).join(" · "):null}function No(){var R,A,K,y;const n=ne==null?void 0:ne.status,e=(ne==null?void 0:ne.wingsData)||{},t=(ne==null?void 0:ne.roomsData)||{},i=(ne==null?void 0:ne.graphEdges)||[],r=ne==null?void 0:ne.graphStats,s=ne==null?void 0:ne.graph,a=(R=s==null?void 0:s.edgesResolved)!=null&&R.length?s.edgesResolved:(r==null?void 0:r.edgesResolved)||[],o=ne==null?void 0:ne.kgStats,c=(ne==null?void 0:ne.overviewStats)??((A=ne==null?void 0:ne.overviewBundle)==null?void 0:A.stats),l=(ne==null?void 0:ne.graphMeta)??((K=ne==null?void 0:ne.graph)==null?void 0:K.graphMeta)??(r==null?void 0:r.graphMeta)??((y=ne==null?void 0:ne.overviewBundle)==null?void 0:y.graphMeta),u=typeof(n==null?void 0:n.total_drawers)=="number"?n.total_drawers:typeof(c==null?void 0:c.totalDrawers)=="number"?c.totalDrawers:Jg(e),f=typeof(c==null?void 0:c.totalWings)=="number"?c.totalWings:Object.keys(e).length,d=typeof(c==null?void 0:c.totalRooms)=="number"?c.totalRooms:Co(t);let m=0;const _=(s==null?void 0:s.summary)??(r==null?void 0:r.summary);(_==null?void 0:_.resolvedEdgeCount)!=null?m=_.resolvedEdgeCount:r!=null&&r.tunnels&&typeof r.tunnels=="object"&&(m=Object.keys(r.tunnels).length);const g=typeof(_==null?void 0:_.resolvedEdgeCount)=="number"?_.resolvedEdgeCount:i.length,p=qg(t,{edgesResolved:a,graphEdges:i,graphSummary:_??null,overviewStats:c??null}),h=d_(o),S=!!(o&&typeof o=="object"&&!o.error),x=To(i),w=vg(a,Kt),D=Ao(Kt,x)!==null;return{status:n,wingsData:e,roomsData:t,graphEdges:i,graphStats:r,edgesResolved:a,kgStats:o,totalDrawers:u,wingCount:f,roomCount:d,tunnelNodeCount:m,graphEdgeCount:g,ga:p,kgAvailable:S,kgSummary:h,focusWing:O.currentWing,overviewStats:c,graphMeta:l,summary:_,availableRelationshipTypes:x,visibleGraphSummary:w,graphFilterNarrowed:D}}function f_(){try{const n=localStorage.getItem(yl);return n?JSON.parse(n):null}catch{return null}}function Tl(n){try{localStorage.setItem(yl,JSON.stringify({enabledTypes:[...n||[]]}))}catch{}}function p_(){const n=(ne==null?void 0:ne.graphEdges)||[],e=To(n),t=f_(),i=t==null?void 0:xg(t);Kt=gg(i,e),Tl(Kt),te==null||te.setRelationshipFilters(Ao(Kt,e))}function m_(n){const e=To((ne==null?void 0:ne.graphEdges)||[]);!n||!e.includes(n)||(Kt.has(n)?Kt.delete(n):Kt.add(n),Tl(Kt),te==null||te.setRelationshipFilters(Ao(Kt,e)),wt(),Gn(),ui())}function ui(){const n=ce("graph-view-extras");if(!n)return;const e=O.view==="graph"&&!!ne&&!ne.error;if(n.hidden=!e,!e)return;const t=No(),i=t.availableRelationshipTypes||[],r=ce("graph-rel-chips");r&&(i.length?r.innerHTML=i.map(o=>{const c=ho(o),l=Kt.has(o),u=o==="tunnel"?"#5b8cff":o==="taxonomy_adjacency"?"#3dc9b8":"#a78bfa";return`<button type="button" class="rel-chip ${l?"is-on":""}" data-rel-type="${Qe(o)}" title="${Qe(c.description)}">
          <span class="rel-chip__swatch" style="background:${u}"></span>
          <span>${Qe(c.shortLabel)}</span>
        </button>`}).join(""):r.innerHTML='<span class="inspect-muted">No typed edges in this graph.</span>');const s=ce("graph-status-pill");if(s){const o=t.graphFilterNarrowed,c=t.visibleGraphSummary,l=yg(t.graphMeta,t.summary),u=o?`Visible edges: ${Ve(c.visibleEdgeCount)} (filtered)`:`Edges: ${Ve(t.graphEdgeCount)} (all types)`;s.innerHTML=`<span class="graph-status-pill__primary">${Qe(u)}</span>${l?`<span class="graph-status-pill__hint">${Qe(l.length>240?`${l.slice(0,240)}…`:l)}</span>`:""}`}const a=ce("graph-legend-compact");a&&(a.innerHTML=i.length?i.map(o=>{const c=ho(o);return`<div class="graph-legend-compact__row"><span class="legend-swatch" style="background:${o==="tunnel"?"#5b8cff":o==="taxonomy_adjacency"?"#3dc9b8":"#a78bfa"}"></span><span><strong>${Qe(c.shortLabel)}</strong> — ${Qe(c.description)}</span></div>`}).join(""):"")}function Zt(n,e,t){const i=e&&String(e).trim()?e:`<p class="inspect-empty">${Qe("No data.")}</p>`;return`
    <section class="inspect-section">
      <h3 class="inspect-section__title">${Qe(n)}</h3>
      <div class="inspect-section__body">${i}</div>
    </section>`}function Al(n){return n==null||Number.isNaN(Number(n))?"":`<div class="inspect-bar" aria-hidden="true"><div class="inspect-bar__fill" style="width:${Math.min(100,Math.max(0,Number(n)))}%"></div></div>`}function wn(n,e,t){return`<button type="button" class="inspect-row inspect-row--action"${Object.entries(t||{}).map(([s,a])=>` data-${s}="${Qe(String(a))}"`).join("")}>
    <span class="inspect-row__main">${Qe(n)}</span>
    <span class="inspect-row__meta">${Qe(e)}</span>
  </button>`}function g_(n){var f,d,m,_;const e=t_(n,O.view),t=e.ga.byRelationshipType&&Object.keys(e.ga.byRelationshipType).length?Object.entries(e.ga.byRelationshipType).map(([g,p])=>`${g}: ${Ve(p)}`).join(" · "):"",i=(d=(f=n.graphMeta)==null?void 0:f.truncatedSources)!=null&&d.length?n.graphMeta.truncatedSources.map(g=>{const p=g.totalMatching!=null&&g.totalMatching!==""?Ve(g.totalMatching):"unknown",h=g.inferred?" (heuristic)":"";return`${g.source} limit ${Ve(g.limit)} · ${p} rows reported${h}`}).join("; "):"",r=(((m=n.graphMeta)==null?void 0:m.completenessNotes)||[]).filter(Boolean).join(" "),s=e.kgAvailable?e.kgSummary||"—":"Knowledge graph statistics are unavailable from the current API.",a=e.largestWingsByDrawers.map(g=>wn(g.wing,`${Ve(g.drawers)} drawers · #${g.rank}`,{"inspect-action":"go-wing",wing:g.wing})).join(""),o=e.mostConnectedRooms.length?e.mostConnectedRooms.map(g=>wn(`${g.room}`,`${g.wing} · degree ${g.degree}`,{"inspect-action":"select-room",wing:g.wing,room:g.room})).join(""):"",c=e.mostCrossLinkedWings.length?e.mostCrossLinkedWings.map(g=>wn(g.wing,`${Ve(g.crossEdges)} cross-wing edges`,{"inspect-action":"go-wing",wing:g.wing})).join(""):"",l=[`Palace scale: ${Ve(e.totalDrawers)} drawers across ${Ve(e.wingCount)} wings and ${Ve(e.roomCount)} rooms.`,e.tunnelNodeCount?`Graph summary: ${Ve(e.graphEdgeCount)} resolved undirected edges (all relationship types).`:"No graph edges in graph-stats.",e.graphBlurb].filter(Boolean).join(" "),u=O.view==="graph"&&((_=n.ga)!=null&&_.hasResolvableEdges)?n.graphFilterNarrowed?`<div class="inspect-card inspect-card--hint" role="status"><strong>Graph filters active</strong><p class="inspect-muted inspect-muted--tight">Visible: ${Ve(n.visibleGraphSummary.visibleEdgeCount)} edges (${mr(n.visibleGraphSummary.visibleByType)||"—"}). Inspector “visible” rows match the scene. Footer and resolved totals above remain global.</p></div>`:'<div class="inspect-card inspect-card--hint" role="status"><strong>Graph view</strong><p class="inspect-muted inspect-muted--tight">Brighter blue edges = cross-wing tunnels; softer teal = inferred same-wing adjacency. Narrow types in the left panel.</p></div>':"";return`
    <div class="inspect-stack">
      <div class="inspect-card inspect-card--hero">
        <span class="badge">Overview</span>
        <p class="inspect-lead">${Qe(e.viewHint)}</p>
        <p class="inspect-muted">${Qe(l)}</p>
      </div>
      ${u}
      ${Zt("Palace summary",`
        <div class="meta-block">
          ${lt("Total drawers",Ve(e.totalDrawers))}
          ${lt("Wings",Ve(e.wingCount))}
          ${lt("Rooms (taxonomy)",Ve(e.roomCount))}
          ${lt("Resolved graph edges",Ve(e.graphEdgeCount))}
          ${lt("Edge types",t||"—")}
          ${lt("Cross-wing (tunnels)",e.ga.hasResolvableEdges?Ve(e.crossWingEdges):"—")}
          ${lt("Rooms with no graph links",e.ga.hasResolvableEdges?Ve(e.roomsWithNoTunnels):"—")}
          ${lt("Upstream truncation",i||"none")}
        </div>
        ${r?`<p class="inspect-muted inspect-muted--tight">${Qe(r)}</p>`:""}
        <p class="inspect-muted inspect-muted--tight">${Qe(s)}</p>
        `)}
      ${Zt("Largest wings",`<div class="inspect-rows">${a||'<p class="inspect-empty">No wing counts available.</p>'}</div>`)}
      ${Zt("Most connected rooms",o||'<p class="inspect-empty">No resolvable tunnel edges, or graph endpoints do not match room names.</p>')}
      ${Zt("Most cross-linked wings",c||'<p class="inspect-empty">No cross-wing tunnel edges resolved.</p>')}
      <div class="inspect-card inspect-card--hint">
        <strong>How to explore</strong>
        <p class="inspect-muted inspect-muted--tight">Use <kbd>1</kbd>–<kbd>3</kbd> to switch views. Click wings and rooms to drill in; Pin keeps the inspector fixed. Search dims non-matching nodes.</p>
      </div>
    </div>`}function __(n,e,t){var pe;const{wingsData:i,roomsData:r,totalDrawers:s,ga:a,graphEdges:o}=n,c=Number(i[e])||0,l=r[e]||[],u=l.length,f=Lo(i),d=f.find(H=>H.wing===e),m=Qg(r),_=m.find(H=>H.wing===e),g=os(c,s),p=Co(r),h=os(u,p),S=El(r,e),x=S>0?S:c,w=u?(x/u).toFixed(1):null,D=Po(r,e),R=D[0],A=D.length>1?D[D.length-1]:null,K=[g!=null&&d?`This wing holds ${g}% of all drawers and is the ${On(d.rank)} largest wing by drawer count.`:null,h!=null&&_&&u?`It ranks ${On(_.rank)} among wings by room count (${h}% of all rooms).`:null].filter(Boolean).join(" "),y=Kg(e,o,r,n.edgesResolved),b=n.edgesResolved||[],F=Ro(b,Kt),I=Sc(e,b),X=Sc(e,F),C=(()=>{if(!n.graphFilterNarrowed||!a.hasResolvableEdges)return"";const H=I.byType.tunnel||0,ee=X.byType.tunnel||0,xe=I.byType.taxonomy_adjacency||0,Ce=X.byType.taxonomy_adjacency||0;return ee>Ce*2&&H>0?"With current filters, this wing shows mostly cross-wing tunnel links.":Ce>ee*2&&xe>0?"With current filters, visible links here are mostly inferred same-wing adjacency.":X.crossWingTouches===0&&y.crossWingTouches>0?"Cross-wing tunnel links are hidden by filters; only same-wing structure may be visible.":""})(),k=y.crossWingTouches>0?`
      ${lt("Cross-wing tunnel touches",Ve(y.crossWingTouches))}
      <div class="inspect-rows">
        ${y.topExternalWings.map(H=>wn(H.wing,`${Ve(H.edges)} edges`,{"inspect-action":"go-wing",wing:H.wing})).join("")}
      </div>`:"",z=y.topRoomsByCrossWing.map(H=>wn(H.room,`cross-wing ${Ve(H.crossEdges)}`,{"inspect-action":"select-room",wing:H.wing,room:H.room})).join(""),J=D.slice(0,5).map(H=>wn(H.name,`${Ve(H.drawers)} drawers`,{"inspect-action":"select-room",wing:e,room:H.name})),Y=[...l].map(H=>{const ee=H.roomId||Ft(e,H.name),xe=a.degreeByKey.get(ee)??0;return{...H,deg:xe}}).sort((H,ee)=>ee.deg-H.deg).slice(0,5),q=Y.length?Y.map(H=>wn(H.name,`degree ${H.deg}`,{"inspect-action":"select-room",wing:e,room:H.name})).join(""):"",Q=u===0?'<p class="inspect-empty">This wing has no room-level drawer breakdown in taxonomy.</p>':`
      ${lt("Rooms listed",Ve(u))}
      ${lt("Drawers (wing total)",Ve(c))}
      ${w!=null?lt("Avg drawers / room",w):""}
      ${R?lt("Largest room",`${R.name} (${Ve(R.drawers)})`):""}
      ${A&&A.name!==(R==null?void 0:R.name)?lt("Smallest room",`${A.name} (${Ve(A.drawers)})`):""}
    `;return`
    <div class="inspect-stack">
      ${O.view==="graph"?'<p class="inspect-muted inspect-muted--tight">Graph view: node positions are layout-only; drawer ranks use taxonomy and wings API.</p>':""}
      <div class="inspect-card inspect-card--hero">
        <span class="badge">Wing</span>
        <div class="inspect-title">${Qe(e)}</div>
        <p class="inspect-lead">${Qe(K||"Wing footprint in the palace.")}</p>
        ${g!=null?`<div class="inspect-pct"><span>${g}% of palace drawers</span>${Al(g)}</div>`:""}
      </div>
      ${Zt("Summary",`
        <div class="meta-block">
          ${lt("Drawer count",Ve(c))}
          ${lt("Rank by drawers",d?`${On(d.rank)} of ${f.length}`:"—")}
          ${lt("Rooms",Ve(u))}
          ${lt("Rank by room count",_?`${On(_.rank)} of ${m.length}`:"—")}
        </div>`)}
      ${Zt("Structure",`<div class="meta-block">${Q}</div>`)}
      ${Zt("Connections",a.hasResolvableEdges?`<div class="meta-block">
          ${lt("Edge types (global)",mr(I.byType)||"—")}
          ${n.graphFilterNarrowed?lt("Edge types (visible)",mr(X.byType)||"—"):""}
          ${n.graphFilterNarrowed?lt("Cross-wing touches (visible)",Ve(X.crossWingTouches)):""}
        </div>
        ${C?`<p class="inspect-muted inspect-muted--tight">${Qe(C)}</p>`:""}
        ${k||'<p class="inspect-empty">No cross-wing tunnel relationships touch this wing.</p>'}
             ${z?`<p class="inspect-micro">Rooms with cross-wing links (global)</p><div class="inspect-rows">${z}</div>`:""}`:'<p class="inspect-empty">No tunnel relationships could be resolved against taxonomy rooms.</p>')}
      ${Zt("Related rooms",`<p class="inspect-micro">Largest by drawers</p><div class="inspect-rows">${J.join("")}</div>
         ${q?`<p class="inspect-micro">Most connected (tunnels)</p><div class="inspect-rows">${q}</div>`:'<p class="inspect-empty">No graph degree for rooms in this wing.</p>'}`)}
      ${Zt("Health / graph insight",`<p class="inspect-muted">${Qe(((pe=a.topCrossLinkedWings[0])==null?void 0:pe.wing)===e?"This wing is among the most cross-linked in the tunnel graph.":y.crossWingTouches>0?"Participates in cross-wing tunnels; see Connections for peers.":u>0?"No cross-wing tunnel edges touch this wing in the current graph.":"Add taxonomy rooms to compare structure.")}</p>`)}
    </div>`}function v_(n,e,t,i){const{wingsData:r,roomsData:s,totalDrawers:a,ga:o}=n,c=s[e]||[],l=c.find(q=>q.name===t),u=l?Number(l.drawers)||0:null,f=Number(r[e])||0,d=El(s,e),m=d>0?d:f,_=Po(s,e),g=_.find(q=>q.name===t),p=u!=null&&m>0?os(u,m):null,h=u!=null&&a>0?os(u,a):null,S=[g&&p!=null?`This room is the ${On(g.rank)} largest in “${e}” by drawers and holds about ${p}% of that wing’s drawers (by room list).`:null,h!=null?`It is ${h}% of the entire palace by drawers.`:null].filter(Boolean).join(" "),x=Ft(e,t),w=Yg(x,o),D=o.hasResolvableEdges,R=n.edgesResolved||[],A=Ro(R,Kt),K=Mc(x,R),y=Mc(x,A),b=Mg(y.byType,K.byType),F=e_({drawers:u??0,wingRoomSum:m,palaceTotal:a},w,D),I=m>0&&c.length?m/c.length:null,X=u!=null&&I!=null?u>=I*1.1?"Above wing average size":u<=I*.9?"Below wing average size":"Near wing average size":"—",C=((w==null?void 0:w.relatedRooms)||[]).filter(q=>!(q.wing===e&&q.room===t)).slice(0,6),k=C.length?C.map(q=>wn(`${q.room}`,`${q.wing} · deg ${q.degree}`,{"inspect-action":"select-room",wing:q.wing,room:q.room})).join(""):"",z=((w==null?void 0:w.relatedWings)||[]).filter(q=>q.wing!==e).slice(0,6).map(q=>wn(q.wing,`${Ve(q.links)} tunnel link${q.links===1?"":"s"}`,{"inspect-action":"go-wing",wing:q.wing})).join(""),J=w&&w.isBridge?"Acts as a bridge: at least one cross-wing tunnel edge is incident to this room.":"No bridge pattern detected (no cross-wing edges on this room).";return`
    <div class="inspect-stack">
      ${O.view==="graph"?'<p class="inspect-muted inspect-muted--tight">Graph view: layout is force-directed; tunnel metrics match the same resolved edges as Rooms/Wings.</p>':""}
      <div class="inspect-card inspect-card--hero">
        <span class="badge">Room</span>
        <div class="inspect-title">${Qe(t)}</div>
        <p class="inspect-lead">${Qe(S||"Room in the palace taxonomy.")}</p>
        ${p!=null?`<div class="inspect-pct"><span>${p}% of wing drawers (room list)</span>${Al(p)}</div>`:""}
      </div>
      ${Zt("Summary",`
        <div class="meta-block">
          ${lt("Parent wing",Qe(e))}
          ${lt("Drawers",u!=null?Ve(u):"—")}
          ${lt("Share of palace",h!=null?`${h}%`:"—")}
        </div>`)}
      ${Zt("Position in wing",c.length?`
        <div class="meta-block">
          ${lt("Rank in wing (by drawers)",g?`${On(g.rank)} of ${_.length}`:"—")}
          ${lt("Wing avg drawers / room",I!=null?I.toFixed(1):"—")}
          ${lt("vs average",X)}
        </div>`:'<p class="inspect-empty">This wing has no room-level drawer breakdown.</p>')}
      ${Zt("Connections",D&&w?`
        <div class="meta-block">
          ${lt(n.graphFilterNarrowed?"Degree (visible)":"Degree (global)",Ve(y.degree))}
          ${n.graphFilterNarrowed?lt("Degree (global)",Ve(K.degree)):""}
          ${lt(n.graphFilterNarrowed?"Cross-wing (visible)":"Cross-wing links",Ve(y.crossWingLinks))}
          ${n.graphFilterNarrowed?lt("Cross-wing (global)",Ve(K.crossWingLinks)):""}
          ${lt(n.graphFilterNarrowed?"Intra-wing (visible)":"Intra-wing links",Ve(y.intraWingLinks))}
          ${n.graphFilterNarrowed?lt("Intra-wing (global)",Ve(K.intraWingLinks)):""}
          ${lt("Relationship mix (global)",mr(K.byType)||"—")}
          ${n.graphFilterNarrowed?lt("Relationship mix (visible)",mr(y.byType)||"—"):""}
          ${lt("Median degree (all rooms)",w.medianDegree!=null?Ve(w.medianDegree):"—")}
        </div>
        ${b?`<p class="inspect-muted inspect-muted--tight">${Qe(b)}</p>`:""}
        <p class="inspect-muted inspect-muted--tight">${Qe(J)}</p>
        ${k?`<p class="inspect-micro">Related rooms (global graph)</p><div class="inspect-rows">${k}</div>`:'<p class="inspect-empty">No tunnel neighbors found for this room.</p>'}
        ${z?`<p class="inspect-micro">Related wings (global graph)</p><div class="inspect-rows">${z}</div>`:""}
        `:'<p class="inspect-empty">No tunnel relationships available for this room (unresolved graph or empty tunnels).</p>')}
      ${Zt("Insight",`<p class="insight-chip">${Qe(F.label)}</p><p class="inspect-muted inspect-muted--tight">${Qe(F.detail)}</p>`)}
    </div>`}function x_(n){const e=n.target.closest("[data-graph-action]");if(e){const a=e.getAttribute("data-graph-action");a==="frame-nbr"?h_():a==="next"?as(1):a==="prev"?as(-1):a==="back"&&wl();return}const t=n.target.closest("[data-inspect-action]");if(!t)return;const i=t.getAttribute("data-inspect-action"),r=t.getAttribute("data-wing"),s=t.getAttribute("data-room");if(i==="go-wing"&&r){Cl(r);return}i==="select-room"&&r&&s&&y_(r,s)}function y_(n,e){var s,a;if(ps(),!ne||!zi(ne.wingsData,n)||!ki(ne.roomsData,n,e))return;const t=ne.roomsData[n],i=Array.isArray(t)?t.find(o=>o.name===e):null,r=`room:${n}:${e}`;if(O.view==="graph"){(s=O.selected)!=null&&s.id&&O.selected.id!==r&&Do(qi,Uo()),O.currentWing=n,O.currentRoom=e,O.selected={id:r,type:"room",name:e,wing:n,wingId:n,roomId:(i==null?void 0:i.roomId)||Ft(n,e),drawers:i==null?void 0:i.drawers},O.pinned=!0,Ut(),te==null||te.centerOnNodeId(r),Gn(),wt(),St();return}O.currentWing=n,O.currentRoom=e,O.selected={id:r,type:"room",name:e,wing:n,wingId:n,roomId:(i==null?void 0:i.roomId)||Ft(n,e),drawers:i==null?void 0:i.drawers},O.pinned=!1,O.view="rooms",te==null||te.setView("rooms",n),Ut(),te==null||te.centerOnNodeId(r),Yi(),ce("view-helper-text").textContent=((a=Vn.find(o=>o.id==="rooms"))==null?void 0:a.hint)||"",ui(),Gn(),wt(),St()}function M_(n){if(!n||n.type==="center"||!n.id)return null;const e=n.wingId??n.wing,t=n.roomId??(n.type==="room"&&e&&n.name!=null?Ft(e,n.name):null);return{id:n.id,type:n.type,name:n.name,wing:e,wingId:e,roomId:t,drawers:n.drawers}}function S_(){try{const n=localStorage.getItem(Io);return n?JSON.parse(n):null}catch{return null}}function St(){clearTimeout(bc),bc=setTimeout(()=>{var n,e,t;try{const i={view:O.view,currentWing:O.currentWing,currentRoom:O.currentRoom,selected:O.selected,pinned:O.pinned,searchQuery:O.searchQuery,labels:((n=ce("toggle-labels"))==null?void 0:n.checked)??!0,rotate:((e=ce("toggle-rotate"))==null?void 0:e.checked)??!0,motion:Number(((t=ce("motion-range"))==null?void 0:t.value)??1)};localStorage.setItem(Io,JSON.stringify(i))}catch{}},200)}function Ac(){ne&&s_(O,ne)}function E_(n){n&&(n.labels!==void 0&&ce("toggle-labels")&&(ce("toggle-labels").checked=!!n.labels),n.rotate!==void 0&&ce("toggle-rotate")&&(ce("toggle-rotate").checked=!!n.rotate),n.motion!==void 0&&ce("motion-range")&&(ce("motion-range").value=String(n.motion)),n.searchQuery!==void 0&&ce("search-wings")&&(ce("search-wings").value=n.searchQuery))}function b_(n){if(n==null)return;const e=r_(n);O.view=e.view,O.currentWing=e.currentWing,O.currentRoom=e.currentRoom,O.selected=e.selected,O.pinned=e.pinned,O.searchQuery=e.searchQuery}function Ut(){var n;te==null||te.updatePresentation({searchQuery:O.searchQuery,selectedId:((n=O.selected)==null?void 0:n.id)??null,pinActive:O.pinned})}function Yr(n,e){const t=ce("conn-status");t&&(t.dataset.state=n,t.textContent=e)}function Zr(n){var e;(e=ce("loading-overlay"))==null||e.classList.toggle("is-hidden",!n)}function w_(n,e){var i;Zr(!0);const t=ce("loading-overlay");t&&(t.innerHTML=`
    <div class="err-box">
      <strong>Unable to load data</strong>
      <p>${Qe(n)}</p>
      ${`<code>${Qe(e)}</code>`}
      <p style="margin-top:10px;color:#94a3b8;font-size:0.76rem;">Start the API bridge from the project folder:</p>
      <code style="margin-top:4px;">node server.js</code>
      <div class="btn-row">
        <button type="button" class="btn btn--ghost" id="err-retry">Retry</button>
      </div>
    </div>
  `,(i=ce("err-retry"))==null||i.addEventListener("click",()=>Fo(!1)))}function mo(n,e){const t=ce("metric-context"),i=ce("metric-context-wrap");if(!(!t||!i)){if(!n||!e){i.hidden=!0,t.textContent="";return}if(i.hidden=!1,n.type==="wing"){const r=Lo(e.wingsData).find(s=>s.wing===n.name);t.textContent=r?`Selected wing · ${On(r.rank)} by drawers`:"Selected wing";return}if(n.type==="room"){const r=Po(e.roomsData,n.wing).find(s=>s.name===n.name);t.textContent=r?`Selected room · ${On(r.rank)} in ${n.wing}`:"Selected room"}}}function Gn(){ne==null||ne.status;const n=ne==null?void 0:ne.graphStats,e=ne==null?void 0:ne.graph,t=(e==null?void 0:e.summary)??(n==null?void 0:n.summary),i=ne==null?void 0:ne.kgStats,r=No(),{wingsData:s,roomsData:a,totalDrawers:o,ga:c,overviewStats:l}=r;ce("metric-drawers").textContent=Ve(o??0),ce("metric-wings").textContent=Ve(typeof(l==null?void 0:l.totalWings)=="number"?l.totalWings:Object.keys(s).length),ce("metric-rooms").textContent=Ve(typeof(l==null?void 0:l.totalRooms)=="number"?l.totalRooms:Co(a));let u=0;typeof(t==null?void 0:t.resolvedEdgeCount)=="number"?u=t.resolvedEdgeCount:n!=null&&n.tunnels&&typeof n.tunnels=="object"&&(u=Object.keys(n.tunnels).length),ce("metric-tunnels").textContent=u?Ve(u):"—";const f=ce("metric-cross");f&&(f.textContent=c.hasResolvableEdges?Ve(c.crossWingEdgeCount):"—");const d=ce("metric-footnote");if(d){const m=c.topCrossLinkedWings[0],_=c.topConnectedRooms[0];let g="";c.hasResolvableEdges&&m&&_?g=`Most cross-linked wing: ${m.wing} · Most connected room: ${_.room} (${_.wing})`:c.hasResolvableEdges&&m?g=`Most cross-linked wing: ${m.wing}`:g="Tunnel graph: resolve endpoints to see cross-wing stats.",O.view==="graph"&&r.graphFilterNarrowed&&(g=`Visible ${Ve(r.visibleGraphSummary.visibleEdgeCount)} edges · ${g}`),d.textContent=g}if(i&&typeof i=="object"&&!i.error){const m=[];for(const[_,g]of Object.entries(i))_!=="error"&&(typeof g=="number"?m.push(`${_}: ${Ve(g)}`):typeof g=="string"&&m.push(`${_}: ${g}`));ce("metric-kg").textContent=m.length?m.slice(0,8).join(" · "):"—"}else ce("metric-kg").textContent="—";mo(O.selected,r)}function T_(n,e){return e.trim()?n.toLowerCase().includes(e.trim().toLowerCase()):!0}function Rl(){const n=ce("legend-host");if(!n)return;const e=ne==null?void 0:ne.status,t=e!=null&&e.wings&&typeof e.wings=="object"?e.wings:(ne==null?void 0:ne.wingsData)||{},i=Object.entries(t);if(!i.length){n.innerHTML='<div class="empty-state" style="padding:8px;">No wing data yet.</div>';return}n.innerHTML=i.map(([r,s])=>{const a=po(r),o=T_(`${r} ${s}`,O.searchQuery);return`
      <div class="legend-item" data-wing="${Qe(r)}" style="${o?"":"display:none"}">
        <span class="legend-color" style="background:${a}"></span>
        <span>${Qe(r)} · ${Ve(s)} drawers</span>
      </div>`}).join("")}function A_(n){const e=n.querySelector(".breadcrumb-nav");if(!e)return;const t=[...e.querySelectorAll(".crumb")];if(!t.length)return;t.forEach((r,s)=>{r.setAttribute("aria-posinset",String(s+1)),r.setAttribute("aria-setsize",String(t.length)),r.tabIndex=s===0?0:-1});const i=e._bcKey;i&&e.removeEventListener("keydown",i),e._bcKey=r=>{const s=t.indexOf(document.activeElement);if(!(s<0)){if(r.key==="ArrowRight"||r.key==="ArrowDown"){r.preventDefault();const a=(s+1)%t.length;t.forEach((o,c)=>{o.tabIndex=c===a?0:-1}),t[a].focus()}else if(r.key==="ArrowLeft"||r.key==="ArrowUp"){r.preventDefault();const a=(s-1+t.length)%t.length;t.forEach((o,c)=>{o.tabIndex=c===a?0:-1}),t[a].focus()}else if(r.key==="Home")r.preventDefault(),t.forEach((a,o)=>{a.tabIndex=o===0?0:-1}),t[0].focus();else if(r.key==="End"){r.preventDefault();const a=t.length-1;t.forEach((o,c)=>{o.tabIndex=c===a?0:-1}),t[a].focus()}}},e.addEventListener("keydown",e._bcKey)}function R_(){var t,i,r;const n=ce("breadcrumb");if(!n)return;const e=['<button type="button" class="crumb" data-crumb="root">All wings</button>'];O.currentWing&&(e.push('<span class="crumb-sep" aria-hidden="true">›</span>'),e.push(`<button type="button" class="crumb" data-crumb="wing" data-wing="${Qe(O.currentWing)}">${Qe(O.currentWing)}</button>`)),O.currentRoom&&O.currentWing&&(e.push('<span class="crumb-sep" aria-hidden="true">›</span>'),e.push(`<button type="button" class="crumb" data-crumb="room" data-wing="${Qe(O.currentWing)}" data-room="${Qe(O.currentRoom)}">${Qe(O.currentRoom)}</button>`)),n.innerHTML=`<nav class="breadcrumb-nav" aria-label="Palace location">${e.join("")}</nav>`,(t=n.querySelector('[data-crumb="root"]'))==null||t.addEventListener("click",()=>C_()),(i=n.querySelector('[data-crumb="wing"]'))==null||i.addEventListener("click",s=>{const a=s.currentTarget.getAttribute("data-wing");a&&Cl(a)}),(r=n.querySelector('[data-crumb="room"]'))==null||r.addEventListener("click",s=>{const a=s.currentTarget.getAttribute("data-room"),o=s.currentTarget.getAttribute("data-wing");if(a&&o&&O.currentWing===o&&O.currentRoom===a){const c=`room:${o}:${a}`;te==null||te.centerOnNodeId(c)}}),A_(n)}function C_(){var n;ps(),qi.length=0,O.view="wings",O.currentWing=null,O.currentRoom=null,O.selected=null,O.pinned=!1,te==null||te.setView("wings",null),Ut(),Yi(),ce("view-helper-text").textContent=((n=Vn.find(e=>e.id==="wings"))==null?void 0:n.hint)||"",ui(),Gn(),wt(),St()}function Cl(n){var e;ps(),!(!ne||!zi(ne.wingsData,n))&&(O.currentWing=n,O.currentRoom=null,O.view="rooms",O.selected=null,O.pinned=!1,te==null||te.setView("rooms",n),Ut(),Yi(),ce("view-helper-text").textContent=((e=Vn.find(t=>t.id==="rooms"))==null?void 0:e.hint)||"",ui(),Gn(),wt(),St())}function L_(){return O.pinned&&O.selected?O.view==="graph"?"graphFocus":"pinned":O.selected?"selected":O.hovered?"live":"empty"}function Rc(){const n=ce("btn-pin");n&&(n.textContent=O.pinned?"Unpin":"Pin",n.disabled=!O.selected)}function wt(){const n=ce("inspect-body"),e=L_(),t=ce("inspect-mode-badge");if(t){const c={empty:"Nothing selected",live:"Live preview",selected:"Selected",pinned:"Pinned",graphFocus:"Graph focus"};t.textContent=c[e],t.dataset.mode=e}let i=null;e==="pinned"||e==="selected"?i=O.selected:e==="live"&&(i=O.hovered),R_();const r=No(),s=l_(r);if(!i||i.type==="center"){e==="empty"?n.innerHTML=Js()+s+g_(r):n.innerHTML=Js()+s+`
        <div class="empty-state">
          <strong>Hover a node</strong>
          <p>Move the pointer over the scene for a quick preview, or select a wing or room.</p>
        </div>`,mo(null,r),Rc();return}const a=i,o=Js();a.type==="wing"?n.innerHTML=o+s+__(r,a.name):a.type==="room"?n.innerHTML=o+s+v_(r,a.wing,a.name):n.innerHTML=o+s+'<div class="inspect-card"><p class="inspect-muted">Unknown node type.</p></div>',mo(a,r),Rc()}function lt(n,e){return`<div class="meta-row"><span class="meta-k">${Qe(n)}</span><span class="meta-v">${e}</span></div>`}function Cc(n,e,t){const i=ce("hover-card");if(!i)return;if(!t){i.classList.remove("is-visible");return}const r=16,s=i.offsetWidth||240,a=i.offsetHeight||80;let o=n+r,c=e+r;o+s>window.innerWidth-8&&(o=n-s-r),c+a>window.innerHeight-8&&(c=window.innerHeight-a-8),i.style.left=`${Math.max(8,o)}px`,i.style.top=`${Math.max(8,c)}px`,i.classList.add("is-visible")}function Lc(n){const e=ce("hover-card");if(!e)return;if(!n||n.type==="center"){e.classList.remove("is-visible");return}const t=n.name||n.label||"Node";let i="";n.type==="wing"?i=`Wing · ${Ve(n.drawers)} drawers`:n.type==="room"&&(i=`Room in “${Qe(n.wing)}”`),e.innerHTML=`<div class="hc-title">${Qe(t)}</div><div class="hc-sub">${i}</div>`}function Yi(){document.querySelectorAll("[data-view]").forEach(n=>{const e=n.getAttribute("data-view")===O.view;n.classList.toggle("is-active",e),n.setAttribute("aria-selected",e?"true":"false"),n.tabIndex=e?0:-1})}function cr(){var e;const n=ce("help-overlay");n&&(n.classList.remove("is-open"),n.setAttribute("aria-hidden","true"),(e=Qn==null?void 0:Qn.focus)==null||e.call(Qn),Qn=null)}function P_(){const n=ce("help-overlay"),e=ce("help-dialog");!n||!e||(Qn=document.activeElement instanceof HTMLElement?document.activeElement:null,n.classList.add("is-open"),n.setAttribute("aria-hidden","false"),requestAnimationFrame(()=>{var t;(t=ce("help-close"))==null||t.focus()}))}function ps(){const n=ce("help-overlay");n!=null&&n.classList.contains("is-open")&&cr()}function or(n){var t;ps(),O.view==="graph"&&n!=="graph"&&(qi.length=0),O.view=n,n==="wings"&&(O.currentWing=null,O.currentRoom=null),n==="graph"&&!sessionStorage.getItem("mempalace-graph-enter-hint")&&(sessionStorage.setItem("mempalace-graph-enter-hint","1"),fs("Graph: drag to orbit · click spheres to focus · [ ] step links · U prior focus",7e3));const e=n==="rooms"?O.currentWing:null;te==null||te.setView(n,e),Ut(),Yi(),ce("view-helper-text").textContent=((t=Vn.find(i=>i.id===n))==null?void 0:t.hint)||"",ui(),Gn(),wt(),St()}function D_(){O.selected&&(O.pinned=!O.pinned,Ut(),wt(),St())}function Pc(){O.selected=null,O.currentRoom=null,O.pinned=!1,Ut(),wt(),St()}function I_(n){var t,i;if(!n||n.type==="center"){O.hovered=null,O.pinned||(O.selected=null,O.currentRoom=null),Ut(),wt(),St();return}const e=M_(n);if(O.hovered=null,O.view==="wings"&&n.type==="wing"){O.currentWing=n.name,O.currentRoom=null,O.selected=e,O.pinned=!1,O.view="rooms",te==null||te.setView("rooms",n.name),Ut(),Yi(),ce("view-helper-text").textContent=((t=Vn.find(r=>r.id==="rooms"))==null?void 0:t.hint)||"",ui(),Gn(),wt(),St();return}if(O.view==="rooms"&&n.type==="wing"){O.currentWing===n.name?(te==null||te.centerOnNodeId(n.id),O.selected=e,O.pinned=!1):(O.currentWing=n.name,O.currentRoom=null,O.selected=e,O.pinned=!1,te==null||te.setView("rooms",n.name),Ut()),wt(),St();return}if(O.view==="rooms"&&n.type==="room"){O.currentWing=n.wing,O.currentRoom=n.name,O.selected=e,O.pinned=!1,te==null||te.setView("rooms",O.currentWing),Ut(),te==null||te.centerOnNodeId(n.id),wt(),St();return}if(O.view==="graph"){if(!e)return;e.id&&((i=O.selected)!=null&&i.id)&&O.selected.id!==e.id&&Do(qi,Uo()),O.selected=e,e.type==="room"?(O.currentWing=e.wing,O.currentRoom=e.name):e.type==="wing"&&(O.currentWing=e.name,O.currentRoom=null),O.pinned=!0,Ut(),te==null||te.centerOnNodeId(e.id),wt(),St();return}O.selected=e,O.pinned=!1,Ut(),wt(),St()}function U_(){const n=ce("canvas-container");te=Vg(n,{onHover:(e,t)=>{if(u_()){Lc(null),Cc(0,0,!1);return}O.hovered=e&&e.type!=="center"?{...e}:null,wt(),Lc(e),Cc(t.x,t.y,!!e&&e.type!=="center")},onClick:e=>I_(e),onBackgroundClick:()=>{const e=ce("canvas-container");e==null||e.classList.add("canvas-bg-dismiss"),setTimeout(()=>e==null?void 0:e.classList.remove("canvas-bg-dismiss"),160)}}),te.init()}function N_(){const n=ce("help-overlay");!n||n._trapWired||(n._trapWired=!0,n.addEventListener("keydown",e=>{if(!n.classList.contains("is-open")||e.key!=="Tab")return;const t=[...n.querySelectorAll("button, [href], input, select, textarea")].filter(s=>!s.hasAttribute("disabled"));if(t.length===0)return;const i=t[0],r=t[t.length-1];e.shiftKey&&document.activeElement===i?(e.preventDefault(),r.focus()):!e.shiftKey&&document.activeElement===r&&(e.preventDefault(),i.focus())}))}function F_(){var s,a;let n=!1,e=!1;try{const o=localStorage.getItem(bl);if(o){const c=JSON.parse(o);n=!!c.leftCollapsed,e=!!c.rightCollapsed}}catch{}const t=ce("app-main-grid"),i=ce("panel-left"),r=ce("panel-right");t==null||t.classList.toggle("has-left-collapsed",n),t==null||t.classList.toggle("has-right-collapsed",e),i==null||i.classList.toggle("panel--collapsed",n),r==null||r.classList.toggle("panel--collapsed",e),(s=ce("btn-collapse-left"))==null||s.setAttribute("aria-expanded",String(!n)),(a=ce("btn-collapse-right"))==null||a.setAttribute("aria-expanded",String(!e))}function Dc(){const n=ce("app-main-grid");try{localStorage.setItem(bl,JSON.stringify({leftCollapsed:(n==null?void 0:n.classList.contains("has-left-collapsed"))??!1,rightCollapsed:(n==null?void 0:n.classList.contains("has-right-collapsed"))??!1}))}catch{}}function O_(){var e,t;const n=ce("app-main-grid");(e=ce("btn-collapse-left"))==null||e.addEventListener("click",()=>{var r,s;n==null||n.classList.toggle("has-left-collapsed"),(r=ce("panel-left"))==null||r.classList.toggle("panel--collapsed");const i=n==null?void 0:n.classList.contains("has-left-collapsed");(s=ce("btn-collapse-left"))==null||s.setAttribute("aria-expanded",String(!i)),Dc()}),(t=ce("btn-collapse-right"))==null||t.addEventListener("click",()=>{var r,s;n==null||n.classList.toggle("has-right-collapsed"),(r=ce("panel-right"))==null||r.classList.toggle("panel--collapsed");const i=n==null?void 0:n.classList.contains("has-right-collapsed");(s=ce("btn-collapse-right"))==null||s.setAttribute("aria-expanded",String(!i)),Dc()})}function B_(){var t,i,r,s,a,o,c,l,u,f,d,m,_;(t=ce("btn-refresh"))==null||t.addEventListener("click",()=>Fo(!0)),(i=ce("btn-reset-cam"))==null||i.addEventListener("click",()=>te==null?void 0:te.resetCamera()),(r=ce("btn-center"))==null||r.addEventListener("click",()=>{var g;(g=O.selected)!=null&&g.id?te==null||te.centerOnNodeId(O.selected.id):te==null||te.centerOnHovered()}),(s=ce("btn-pin"))==null||s.addEventListener("click",()=>D_()),(a=ce("btn-clear-sel"))==null||a.addEventListener("click",()=>Pc()),(o=ce("toggle-rotate"))==null||o.addEventListener("change",g=>{te==null||te.setAutoRotate(g.target.checked),St()}),(c=ce("toggle-labels"))==null||c.addEventListener("change",g=>{te==null||te.setLabelsVisible(g.target.checked),St()});const n=ce("motion-range");n==null||n.addEventListener("input",g=>{const p=Number(g.target.value);te==null||te.setMotionIntensity(p),g.target.setAttribute("aria-valuenow",String(p)),St()}),n&&n.setAttribute("aria-valuenow",n.value),Vn.forEach(g=>{var p;(p=document.querySelector(`[data-view="${g.id}"]`))==null||p.addEventListener("click",()=>or(g.id))});const e=ce("view-buttons");if(e==null||e.addEventListener("keydown",g=>{if(g.key!=="ArrowDown"&&g.key!=="ArrowUp"&&g.key!=="ArrowRight"&&g.key!=="ArrowLeft")return;const p=[...document.querySelectorAll("[data-view]")];if(!p.length)return;const h=p.findIndex(w=>w.getAttribute("data-view")===O.view);if(h<0)return;g.preventDefault();const S=g.key==="ArrowDown"||g.key==="ArrowRight"?1:-1,x=(h+S+p.length)%p.length;or(p[x].getAttribute("data-view")),p[x].focus()}),(l=ce("search-wings"))==null||l.addEventListener("input",g=>{clearTimeout(Ec),Ec=setTimeout(()=>{O.searchQuery=g.target.value,Ut(),Rl(),St()},120)}),(u=ce("btn-help"))==null||u.addEventListener("click",()=>{const g=ce("help-overlay");g!=null&&g.classList.contains("is-open")?cr():P_()}),(f=ce("help-close"))==null||f.addEventListener("click",()=>cr()),(d=ce("help-overlay"))==null||d.addEventListener("click",g=>{const p=ce("help-overlay");g.target===p&&cr()}),N_(),F_(),O_(),(m=ce("graph-view-extras"))==null||m.addEventListener("click",g=>{const p=g.target.closest("[data-rel-type]");if(!p)return;const h=p.getAttribute("data-rel-type");h&&m_(h)}),window.addEventListener("keydown",g=>{var p;if(!(Tc(g.target)&&g.key!=="Escape")){if(g.key==="Escape"){const h=ce("help-overlay");if(h!=null&&h.classList.contains("is-open")){cr();return}O.pinned?(O.pinned=!1,Ut(),wt(),St()):O.selected&&Pc();return}if(!Tc(g.target)){if(g.key==="1"&&or("wings"),g.key==="2"&&or("rooms"),g.key==="3"&&or("graph"),(g.key==="r"||g.key==="R")&&(te==null||te.resetCamera()),O.view==="graph"&&!g.ctrlKey&&!g.metaKey&&!g.altKey&&(g.key==="["&&(g.preventDefault(),as(-1)),g.key==="]"&&(g.preventDefault(),as(1)),(g.key==="u"||g.key==="U")&&(g.preventDefault(),wl())),g.key==="/"&&!g.ctrlKey&&!g.metaKey&&(g.preventDefault(),(p=ce("search-wings"))==null||p.focus()),g.key==="l"||g.key==="L"){const h=ce("toggle-labels");h&&(h.checked=!h.checked,h.dispatchEvent(new Event("change")))}if(g.key===" "){g.preventDefault();const h=ce("toggle-rotate");h&&(h.checked=!h.checked,h.dispatchEvent(new Event("change")))}}}}),localStorage.getItem("mempalace-viz-onboarded")||(ce("onboard-hint").hidden=!1,localStorage.setItem("mempalace-viz-onboarded","1")),(_=window.matchMedia)!=null&&_.call(window,"(prefers-reduced-motion: reduce)").matches&&!localStorage.getItem(Io)){const g=ce("toggle-rotate");g&&(g.checked=!1,g.dispatchEvent(new Event("change"))),n&&(n.value="0",n.setAttribute("aria-valuenow","0"),te==null||te.setMotionIntensity(0))}}function z_(){const n=ce("view-buttons");n&&(n.innerHTML=Vn.map(e=>`
    <button type="button" class="view-seg__btn" data-view="${e.id}" role="tab" aria-selected="${e.id===O.view?"true":"false"}" tabindex="${e.id===O.view?0:-1}">
      <strong>${Qe(e.title)}</strong>
      <span class="view-seg__hint">${Qe(e.hint)}</span>
    </button>`).join(""))}async function Fo(n){var s,a,o,c,l;const e=n?{view:O.view,currentWing:O.currentWing,currentRoom:O.currentRoom,selected:O.selected,pinned:O.pinned,searchQuery:O.searchQuery}:null,t=ne;Zr(!0),Yr("loading","Connecting…");const i=ce("loading-overlay");if(i&&(i.innerHTML='<div class="spinner"></div><p style="color:#94a3b8;font-size:0.85rem;">Loading palace data…</p>'),ne=await Ol(),ne.error){if(n&&t&&!t.error){ne=t,Yr("stale","Offline (cached)"),fs("Refresh failed — showing last loaded data. Check the API and try again."),Zr(!1),wt();return}Yr("error","Disconnected"),w_(ne.error.message||String(ne.error),Nc()||"(same origin)");return}if(Yr("ok","Connected"),Zr(!1),!n){const u=S_();b_(u),E_(u)}if(Ac(),n&&e){if(e.currentWing&&zi(ne.wingsData,e.currentWing)?O.currentWing=e.currentWing:(O.currentWing=null,O.currentRoom=null),e.currentRoom&&O.currentWing&&ki(ne.roomsData,O.currentWing,e.currentRoom)?O.currentRoom=e.currentRoom:O.currentRoom=null,O.view=e.view,(s=e.selected)!=null&&s.id){const u=e.selected;u.type==="wing"&&zi(ne.wingsData,u.name)||u.type==="room"&&u.wing&&ki(ne.roomsData,u.wing,u.name)?O.selected=u:O.selected=null}else O.selected=null;O.pinned=e.pinned&&!!O.selected,O.searchQuery=e.searchQuery??O.searchQuery,ce("search-wings").value=O.searchQuery}Ac(),te==null||te.setData({wingsData:ne.wingsData,roomsData:ne.roomsData,graphEdges:ne.graphEdges}),Gn(),Rl();const r=O.view==="rooms"?O.currentWing:null;te==null||te.setView(O.view,r),p_(),Ut(),te==null||te.setAutoRotate(((a=ce("toggle-rotate"))==null?void 0:a.checked)??!0),te==null||te.setLabelsVisible(((o=ce("toggle-labels"))==null?void 0:o.checked)??!0),te==null||te.setMotionIntensity(Number(((c=ce("motion-range"))==null?void 0:c.value)??1)),Yi(),ce("view-helper-text").textContent=((l=Vn.find(u=>u.id===O.view))==null?void 0:l.hint)||"",Object.keys(ne.wingsData||{}).length?(!ne.roomsData||!Object.keys(ne.roomsData).some(u=>(ne.roomsData[u]||[]).length))&&(ce("view-helper-text").textContent+=" · No rooms in taxonomy yet."):ce("view-helper-text").textContent="No wings returned — check MCP backend.",ui(),wt(),St()}function k_(){const n=ce("inspect-body");!n||n._delegationWired||(n._delegationWired=!0,n.addEventListener("click",x_))}function H_(){z_(),U_(),B_(),k_(),Fo(!1)}H_();
