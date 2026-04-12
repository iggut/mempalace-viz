(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const Ec="∕";function Sc(n){return String(n??"").trim()||"unknown"}function Ml(n){return String(n??"").replace(/\//g,Ec)}function El(n){return String(n??"").replace(new RegExp(Ec,"g"),"/")}function It(n,e){return`${Sc(n)}/${Ml(e)}`}function Qn(n){const e=String(n||""),t=e.indexOf("/");return t<=0?null:{wingId:e.slice(0,t),roomName:El(e.slice(t+1))}}function Sl(n){if(!n||typeof n!="object")return{};if(n.wings&&typeof n.wings=="object"&&!Array.isArray(n.wings))return{...n.wings};const e=new Set(["error","message","ok"]),t={};for(const[i,r]of Object.entries(n))e.has(i)||typeof r=="number"&&(t[i]=r);return Object.keys(t).length?t:{}}function bl(n){let e=n;if(e!=null&&e.taxonomy&&typeof e.taxonomy=="object"&&(e=e.taxonomy),typeof e=="string")try{e=JSON.parse(e)}catch{e={}}const t=e&&typeof e=="object"?e:{},i={},r=[],s=[];for(const[a,o]of Object.entries(t)){const c=Sc(a);i[c]||(i[c]=[]);let l=0,u=0;if(o&&typeof o=="object"&&!Array.isArray(o))for(const[f,d]of Object.entries(o)){const m=typeof d=="number"?d:1,_=It(c,f),g={name:f,drawers:m,roomId:_,wingId:c};i[c].push(g),r.push({roomId:_,wingId:c,name:f,drawerCount:m}),l+=m,u+=1}s.push({wingId:c,name:c,drawerCount:l,roomCount:u,rooms:i[c]})}return s.sort((a,o)=>o.drawerCount-a.drawerCount),r.sort((a,o)=>o.drawerCount-a.drawerCount),{taxonomy:t,roomsData:i,rooms:r,wings:s}}function Tl(n){return n.map(e=>({from:e.sourceRoomId,to:e.targetRoomId,wing:e.sourceWingId,sourceRoomId:e.sourceRoomId,targetRoomId:e.targetRoomId,sourceWingId:e.sourceWingId,targetWingId:e.targetWingId,crossWing:e.crossWing,edgeId:e.edgeId,relationshipType:e.relationshipType}))}function bc(){var n;return typeof window<"u"&&((n=window.location)!=null&&n.protocol)&&window.location.protocol!=="file:"?"":"http://localhost:8767"}async function oi(n){const e=await fetch(n,{headers:{Accept:"application/json"}});if(!e.ok){const t=await e.text().catch(()=>"");throw new Error(t||`HTTP ${e.status}`)}return e.json()}function Ii(n,e){return!!(n&&typeof n=="object"&&e in n)}function tr(n,e,t){const i=n==null?void 0:n[e];return Array.isArray(i)?i.some(r=>r.name===t):!1}function wl(n){var x;const{status:e,wingsRaw:t,taxonomyRaw:i,graphStats:r,kgResult:s,overviewBundle:a}=n,o=Sl(t),{taxonomy:c,roomsData:l,rooms:u,wings:f}=bl(i),d=Array.isArray(r==null?void 0:r.edgesResolved)?r.edgesResolved:[],m=Array.isArray(r==null?void 0:r.edgesUnresolved)?r.edgesUnresolved:[],_=r!=null&&r.summary&&typeof r.summary=="object"?r.summary:null;let g=[];d.length?g=Tl(d):(x=r==null?void 0:r.legacyGraphEdges)!=null&&x.length?g=r.legacyGraphEdges:r!=null&&r.tunnels&&typeof r.tunnels=="object"&&(g=Object.entries(r.tunnels).flatMap(([T,P])=>Object.entries(P||{}).map(([R,C])=>({from:T,to:R,wing:C}))));const p=s&&!s.error?s:null,h=a!=null&&a.stats&&typeof a.stats=="object"?a.stats:null,S=(r==null?void 0:r.graphMeta)??(a==null?void 0:a.graphMeta)??null;return{status:e,wingsData:o,taxonomy:c,roomsData:l,rooms:u,wings:f,graphStats:r,graph:{edgesResolved:d,edgesUnresolved:m,summary:_,graphMeta:S},graphEdges:g,overviewBundle:a,overviewStats:h,graphMeta:S,kgStats:p,error:null}}async function Al(){const e=`${bc()}/api`;try{const[t,i,r,s,a,o]=await Promise.all([oi(`${e}/status`),oi(`${e}/wings`),oi(`${e}/taxonomy`),oi(`${e}/graph-stats`),oi(`${e}/kg-stats`).catch(()=>null),oi(`${e}/overview`).catch(()=>null)]);return wl({status:t,wingsRaw:i,taxonomyRaw:r,graphStats:s,kgResult:a,overviewBundle:o})}catch(t){return{status:null,wingsData:{},taxonomy:{},roomsData:{},rooms:[],wings:[],graphStats:null,graph:{edgesResolved:[],edgesUnresolved:[],summary:null,graphMeta:null},graphEdges:[],overviewBundle:null,overviewStats:null,graphMeta:null,kgStats:null,error:t}}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ro="160",ai={ROTATE:0,DOLLY:1,PAN:2},ci={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Rl=0,Ro=1,Cl=2,Tc=1,Ll=2,mn=3,Nn=0,Ut=1,gn=2,Dn=0,Pi=1,Co=2,Lo=3,Po=4,Pl=5,qn=100,Dl=101,Il=102,Do=103,Io=104,Ul=200,Nl=201,Ol=202,Fl=203,Ws=204,Vs=205,Bl=206,zl=207,kl=208,Hl=209,Gl=210,Wl=211,Vl=212,Xl=213,$l=214,jl=0,ql=1,Yl=2,Vr=3,Kl=4,Zl=5,Jl=6,Ql=7,wc=0,eu=1,tu=2,In=0,nu=1,iu=2,ru=3,Ac=4,su=5,ou=6,Rc=300,Ui=301,Ni=302,Xs=303,$s=304,es=306,js=1e3,en=1001,qs=1002,Pt=1003,Uo=1004,us=1005,Xt=1006,au=1007,nr=1008,Un=1009,cu=1010,lu=1011,so=1012,Cc=1013,Cn=1014,Ln=1015,ir=1016,Lc=1017,Pc=1018,Kn=1020,uu=1021,tn=1023,hu=1024,du=1025,Zn=1026,Oi=1027,fu=1028,Dc=1029,pu=1030,Ic=1031,Uc=1033,hs=33776,ds=33777,fs=33778,ps=33779,No=35840,Oo=35841,Fo=35842,Bo=35843,Nc=36196,zo=37492,ko=37496,Ho=37808,Go=37809,Wo=37810,Vo=37811,Xo=37812,$o=37813,jo=37814,qo=37815,Yo=37816,Ko=37817,Zo=37818,Jo=37819,Qo=37820,ea=37821,ms=36492,ta=36494,na=36495,mu=36283,ia=36284,ra=36285,sa=36286,Oc=3e3,Jn=3001,gu=3200,_u=3201,Fc=0,vu=1,Yt="",Mt="srgb",yn="srgb-linear",oo="display-p3",ts="display-p3-linear",Xr="linear",at="srgb",$r="rec709",jr="p3",li=7680,oa=519,xu=512,yu=513,Mu=514,Bc=515,Eu=516,Su=517,bu=518,Tu=519,Ys=35044,aa="300 es",Ks=1035,_n=2e3,qr=2001;class ii{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ca=1234567;const Ji=Math.PI/180,rr=180/Math.PI;function xn(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(wt[n&255]+wt[n>>8&255]+wt[n>>16&255]+wt[n>>24&255]+"-"+wt[e&255]+wt[e>>8&255]+"-"+wt[e>>16&15|64]+wt[e>>24&255]+"-"+wt[t&63|128]+wt[t>>8&255]+"-"+wt[t>>16&255]+wt[t>>24&255]+wt[i&255]+wt[i>>8&255]+wt[i>>16&255]+wt[i>>24&255]).toLowerCase()}function Rt(n,e,t){return Math.max(e,Math.min(t,n))}function ao(n,e){return(n%e+e)%e}function wu(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function Au(n,e,t){return n!==e?(t-n)/(e-n):0}function Qi(n,e,t){return(1-t)*n+t*e}function Ru(n,e,t,i){return Qi(n,e,1-Math.exp(-t*i))}function Cu(n,e=1){return e-Math.abs(ao(n,e*2)-e)}function Lu(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Pu(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Du(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Iu(n,e){return n+Math.random()*(e-n)}function Uu(n){return n*(.5-Math.random())}function Nu(n){n!==void 0&&(ca=n);let e=ca+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ou(n){return n*Ji}function Fu(n){return n*rr}function Zs(n){return(n&n-1)===0&&n!==0}function Bu(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Yr(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function zu(n,e,t,i,r){const s=Math.cos,a=Math.sin,o=s(t/2),c=a(t/2),l=s((e+i)/2),u=a((e+i)/2),f=s((e-i)/2),d=a((e-i)/2),m=s((i-e)/2),_=a((i-e)/2);switch(r){case"XYX":n.set(o*u,c*f,c*d,o*l);break;case"YZY":n.set(c*d,o*u,c*f,o*l);break;case"ZXZ":n.set(c*f,c*d,o*u,o*l);break;case"XZX":n.set(o*u,c*_,c*m,o*l);break;case"YXY":n.set(c*m,o*u,c*_,o*l);break;case"ZYZ":n.set(c*_,c*m,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function on(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function st(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const wn={DEG2RAD:Ji,RAD2DEG:rr,generateUUID:xn,clamp:Rt,euclideanModulo:ao,mapLinear:wu,inverseLerp:Au,lerp:Qi,damp:Ru,pingpong:Cu,smoothstep:Lu,smootherstep:Pu,randInt:Du,randFloat:Iu,randFloatSpread:Uu,seededRandom:Nu,degToRad:Ou,radToDeg:Fu,isPowerOfTwo:Zs,ceilPowerOfTwo:Bu,floorPowerOfTwo:Yr,setQuaternionFromProperEuler:zu,normalize:st,denormalize:on};class Ue{constructor(e=0,t=0){Ue.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Rt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Je{constructor(e,t,i,r,s,a,o,c,l){Je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l)}set(e,t,i,r,s,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=c,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],u=i[4],f=i[7],d=i[2],m=i[5],_=i[8],g=r[0],p=r[3],h=r[6],S=r[1],x=r[4],T=r[7],P=r[2],R=r[5],C=r[8];return s[0]=a*g+o*S+c*P,s[3]=a*p+o*x+c*R,s[6]=a*h+o*T+c*C,s[1]=l*g+u*S+f*P,s[4]=l*p+u*x+f*R,s[7]=l*h+u*T+f*C,s[2]=d*g+m*S+_*P,s[5]=d*p+m*x+_*R,s[8]=d*h+m*T+_*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-i*s*u+i*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],f=u*a-o*l,d=o*c-u*s,m=l*s-a*c,_=t*f+i*d+r*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=f*g,e[1]=(r*l-u*i)*g,e[2]=(o*i-r*a)*g,e[3]=d*g,e[4]=(u*t-r*c)*g,e[5]=(r*s-o*t)*g,e[6]=m*g,e[7]=(i*c-l*t)*g,e[8]=(a*t-i*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(gs.makeScale(e,t)),this}rotate(e){return this.premultiply(gs.makeRotation(-e)),this}translate(e,t){return this.premultiply(gs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const gs=new Je;function zc(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Kr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ku(){const n=Kr("canvas");return n.style.display="block",n}const la={};function er(n){n in la||(la[n]=!0,console.warn(n))}const ua=new Je().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ha=new Je().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),lr={[yn]:{transfer:Xr,primaries:$r,toReference:n=>n,fromReference:n=>n},[Mt]:{transfer:at,primaries:$r,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[ts]:{transfer:Xr,primaries:jr,toReference:n=>n.applyMatrix3(ha),fromReference:n=>n.applyMatrix3(ua)},[oo]:{transfer:at,primaries:jr,toReference:n=>n.convertSRGBToLinear().applyMatrix3(ha),fromReference:n=>n.applyMatrix3(ua).convertLinearToSRGB()}},Hu=new Set([yn,ts]),ot={enabled:!0,_workingColorSpace:yn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Hu.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=lr[e].toReference,r=lr[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return lr[n].primaries},getTransfer:function(n){return n===Yt?Xr:lr[n].transfer}};function Di(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function _s(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ui;class kc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ui===void 0&&(ui=Kr("canvas")),ui.width=e.width,ui.height=e.height;const i=ui.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=ui}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Kr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Di(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Di(t[i]/255)*255):t[i]=Di(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Gu=0;class Hc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gu++}),this.uuid=xn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(vs(r[a].image)):s.push(vs(r[a]))}else s=vs(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function vs(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?kc.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Wu=0;class Ot extends ii{constructor(e=Ot.DEFAULT_IMAGE,t=Ot.DEFAULT_MAPPING,i=en,r=en,s=Xt,a=nr,o=tn,c=Un,l=Ot.DEFAULT_ANISOTROPY,u=Yt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wu++}),this.uuid=xn(),this.name="",this.source=new Hc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ue(0,0),this.repeat=new Ue(1,1),this.center=new Ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(er("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Jn?Mt:Yt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Rc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case js:e.x=e.x-Math.floor(e.x);break;case en:e.x=e.x<0?0:1;break;case qs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case js:e.y=e.y-Math.floor(e.y);break;case en:e.y=e.y<0?0:1;break;case qs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return er("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Mt?Jn:Oc}set encoding(e){er("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Jn?Mt:Yt}}Ot.DEFAULT_IMAGE=null;Ot.DEFAULT_MAPPING=Rc;Ot.DEFAULT_ANISOTROPY=1;class St{constructor(e=0,t=0,i=0,r=1){St.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,l=c[0],u=c[4],f=c[8],d=c[1],m=c[5],_=c[9],g=c[2],p=c[6],h=c[10];if(Math.abs(u-d)<.01&&Math.abs(f-g)<.01&&Math.abs(_-p)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+g)<.1&&Math.abs(_+p)<.1&&Math.abs(l+m+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(l+1)/2,T=(m+1)/2,P=(h+1)/2,R=(u+d)/4,C=(f+g)/4,Q=(_+p)/4;return x>T&&x>P?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=R/i,s=C/i):T>P?T<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(T),i=R/r,s=Q/r):P<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(P),i=C/s,r=Q/s),this.set(i,r,s,t),this}let S=Math.sqrt((p-_)*(p-_)+(f-g)*(f-g)+(d-u)*(d-u));return Math.abs(S)<.001&&(S=1),this.x=(p-_)/S,this.y=(f-g)/S,this.z=(d-u)/S,this.w=Math.acos((l+m+h-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Vu extends ii{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new St(0,0,e,t),this.scissorTest=!1,this.viewport=new St(0,0,e,t);const r={width:e,height:t,depth:1};i.encoding!==void 0&&(er("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Jn?Mt:Yt),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Ot(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Hc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ei extends Vu{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Gc extends Ot{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Pt,this.minFilter=Pt,this.wrapR=en,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xu extends Ot{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Pt,this.minFilter=Pt,this.wrapR=en,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ti{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let c=i[r+0],l=i[r+1],u=i[r+2],f=i[r+3];const d=s[a+0],m=s[a+1],_=s[a+2],g=s[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f;return}if(o===1){e[t+0]=d,e[t+1]=m,e[t+2]=_,e[t+3]=g;return}if(f!==g||c!==d||l!==m||u!==_){let p=1-o;const h=c*d+l*m+u*_+f*g,S=h>=0?1:-1,x=1-h*h;if(x>Number.EPSILON){const P=Math.sqrt(x),R=Math.atan2(P,h*S);p=Math.sin(p*R)/P,o=Math.sin(o*R)/P}const T=o*S;if(c=c*p+d*T,l=l*p+m*T,u=u*p+_*T,f=f*p+g*T,p===1-o){const P=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=P,l*=P,u*=P,f*=P}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],c=i[r+1],l=i[r+2],u=i[r+3],f=s[a],d=s[a+1],m=s[a+2],_=s[a+3];return e[t]=o*_+u*f+c*m-l*d,e[t+1]=c*_+u*d+l*f-o*m,e[t+2]=l*_+u*m+o*d-c*f,e[t+3]=u*_-o*f-c*d-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(r/2),f=o(s/2),d=c(i/2),m=c(r/2),_=c(s/2);switch(a){case"XYZ":this._x=d*u*f+l*m*_,this._y=l*m*f-d*u*_,this._z=l*u*_+d*m*f,this._w=l*u*f-d*m*_;break;case"YXZ":this._x=d*u*f+l*m*_,this._y=l*m*f-d*u*_,this._z=l*u*_-d*m*f,this._w=l*u*f+d*m*_;break;case"ZXY":this._x=d*u*f-l*m*_,this._y=l*m*f+d*u*_,this._z=l*u*_+d*m*f,this._w=l*u*f-d*m*_;break;case"ZYX":this._x=d*u*f-l*m*_,this._y=l*m*f+d*u*_,this._z=l*u*_-d*m*f,this._w=l*u*f+d*m*_;break;case"YZX":this._x=d*u*f+l*m*_,this._y=l*m*f+d*u*_,this._z=l*u*_-d*m*f,this._w=l*u*f-d*m*_;break;case"XZY":this._x=d*u*f-l*m*_,this._y=l*m*f-d*u*_,this._z=l*u*_+d*m*f,this._w=l*u*f+d*m*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],f=t[10],d=i+o+f;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(u-c)*m,this._y=(s-l)*m,this._z=(a-r)*m}else if(i>o&&i>f){const m=2*Math.sqrt(1+i-o-f);this._w=(u-c)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+l)/m}else if(o>f){const m=2*Math.sqrt(1+o-i-f);this._w=(s-l)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(c+u)/m}else{const m=2*Math.sqrt(1+f-i-o);this._w=(a-r)/m,this._x=(s+l)/m,this._y=(c+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Rt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+a*o+r*l-s*c,this._y=r*u+a*c+s*o-i*l,this._z=s*u+a*l+i*c-r*o,this._w=a*u-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*i+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),f=Math.sin((1-t)*u)/l,d=Math.sin(t*u)/l;return this._w=a*f+this._w*d,this._x=i*f+this._x*d,this._y=r*f+this._y*d,this._z=s*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(s),i*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(e=0,t=0,i=0){I.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(da.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(da.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*i),u=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+c*l+a*f-o*u,this.y=i+c*u+o*l-s*f,this.z=r+c*f+s*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return xs.copy(this).projectOnVector(e),this.sub(xs)}reflect(e){return this.sub(xs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Rt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xs=new I,da=new ti;class Bi{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Zt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Zt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Zt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Zt):Zt.fromBufferAttribute(s,a),Zt.applyMatrix4(e.matrixWorld),this.expandByPoint(Zt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ur.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ur.copy(i.boundingBox)),ur.applyMatrix4(e.matrixWorld),this.union(ur)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Zt),Zt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Gi),hr.subVectors(this.max,Gi),hi.subVectors(e.a,Gi),di.subVectors(e.b,Gi),fi.subVectors(e.c,Gi),Mn.subVectors(di,hi),En.subVectors(fi,di),Gn.subVectors(hi,fi);let t=[0,-Mn.z,Mn.y,0,-En.z,En.y,0,-Gn.z,Gn.y,Mn.z,0,-Mn.x,En.z,0,-En.x,Gn.z,0,-Gn.x,-Mn.y,Mn.x,0,-En.y,En.x,0,-Gn.y,Gn.x,0];return!ys(t,hi,di,fi,hr)||(t=[1,0,0,0,1,0,0,0,1],!ys(t,hi,di,fi,hr))?!1:(dr.crossVectors(Mn,En),t=[dr.x,dr.y,dr.z],ys(t,hi,di,fi,hr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Zt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Zt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(un),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const un=[new I,new I,new I,new I,new I,new I,new I,new I],Zt=new I,ur=new Bi,hi=new I,di=new I,fi=new I,Mn=new I,En=new I,Gn=new I,Gi=new I,hr=new I,dr=new I,Wn=new I;function ys(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Wn.fromArray(n,s);const o=r.x*Math.abs(Wn.x)+r.y*Math.abs(Wn.y)+r.z*Math.abs(Wn.z),c=e.dot(Wn),l=t.dot(Wn),u=i.dot(Wn);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const $u=new Bi,Wi=new I,Ms=new I;class or{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):$u.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Wi.subVectors(e,this.center);const t=Wi.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Wi,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ms.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Wi.copy(e.center).add(Ms)),this.expandByPoint(Wi.copy(e.center).sub(Ms))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const hn=new I,Es=new I,fr=new I,Sn=new I,Ss=new I,pr=new I,bs=new I;class ar{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=hn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(hn.copy(this.origin).addScaledVector(this.direction,t),hn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Es.copy(e).add(t).multiplyScalar(.5),fr.copy(t).sub(e).normalize(),Sn.copy(this.origin).sub(Es);const s=e.distanceTo(t)*.5,a=-this.direction.dot(fr),o=Sn.dot(this.direction),c=-Sn.dot(fr),l=Sn.lengthSq(),u=Math.abs(1-a*a);let f,d,m,_;if(u>0)if(f=a*c-o,d=a*o-c,_=s*u,f>=0)if(d>=-_)if(d<=_){const g=1/u;f*=g,d*=g,m=f*(f+a*d+2*o)+d*(a*f+d+2*c)+l}else d=s,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*c)+l;else d=-s,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*c)+l;else d<=-_?(f=Math.max(0,-(-a*s+o)),d=f>0?-s:Math.min(Math.max(-s,-c),s),m=-f*f+d*(d+2*c)+l):d<=_?(f=0,d=Math.min(Math.max(-s,-c),s),m=d*(d+2*c)+l):(f=Math.max(0,-(a*s+o)),d=f>0?s:Math.min(Math.max(-s,-c),s),m=-f*f+d*(d+2*c)+l);else d=a>0?-s:s,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Es).addScaledVector(fr,d),m}intersectSphere(e,t){hn.subVectors(e.center,this.origin);const i=hn.dot(this.direction),r=hn.dot(hn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(i=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(i=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-d.z)*f,c=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,c=(e.min.z-d.z)*f),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,hn)!==null}intersectTriangle(e,t,i,r,s){Ss.subVectors(t,e),pr.subVectors(i,e),bs.crossVectors(Ss,pr);let a=this.direction.dot(bs),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Sn.subVectors(this.origin,e);const c=o*this.direction.dot(pr.crossVectors(Sn,pr));if(c<0)return null;const l=o*this.direction.dot(Ss.cross(Sn));if(l<0||c+l>a)return null;const u=-o*Sn.dot(bs);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ht{constructor(e,t,i,r,s,a,o,c,l,u,f,d,m,_,g,p){ht.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l,u,f,d,m,_,g,p)}set(e,t,i,r,s,a,o,c,l,u,f,d,m,_,g,p){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=r,h[1]=s,h[5]=a,h[9]=o,h[13]=c,h[2]=l,h[6]=u,h[10]=f,h[14]=d,h[3]=m,h[7]=_,h[11]=g,h[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ht().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/pi.setFromMatrixColumn(e,0).length(),s=1/pi.setFromMatrixColumn(e,1).length(),a=1/pi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=a*u,m=a*f,_=o*u,g=o*f;t[0]=c*u,t[4]=-c*f,t[8]=l,t[1]=m+_*l,t[5]=d-g*l,t[9]=-o*c,t[2]=g-d*l,t[6]=_+m*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*u,m=c*f,_=l*u,g=l*f;t[0]=d+g*o,t[4]=_*o-m,t[8]=a*l,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=m*o-_,t[6]=g+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*u,m=c*f,_=l*u,g=l*f;t[0]=d-g*o,t[4]=-a*f,t[8]=_+m*o,t[1]=m+_*o,t[5]=a*u,t[9]=g-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*u,m=a*f,_=o*u,g=o*f;t[0]=c*u,t[4]=_*l-m,t[8]=d*l+g,t[1]=c*f,t[5]=g*l+d,t[9]=m*l-_,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,m=a*l,_=o*c,g=o*l;t[0]=c*u,t[4]=g-d*f,t[8]=_*f+m,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=m*f+_,t[10]=d-g*f}else if(e.order==="XZY"){const d=a*c,m=a*l,_=o*c,g=o*l;t[0]=c*u,t[4]=-f,t[8]=l*u,t[1]=d*f+g,t[5]=a*u,t[9]=m*f-_,t[2]=_*f-m,t[6]=o*u,t[10]=g*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ju,e,qu)}lookAt(e,t,i){const r=this.elements;return Bt.subVectors(e,t),Bt.lengthSq()===0&&(Bt.z=1),Bt.normalize(),bn.crossVectors(i,Bt),bn.lengthSq()===0&&(Math.abs(i.z)===1?Bt.x+=1e-4:Bt.z+=1e-4,Bt.normalize(),bn.crossVectors(i,Bt)),bn.normalize(),mr.crossVectors(Bt,bn),r[0]=bn.x,r[4]=mr.x,r[8]=Bt.x,r[1]=bn.y,r[5]=mr.y,r[9]=Bt.y,r[2]=bn.z,r[6]=mr.z,r[10]=Bt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],u=i[1],f=i[5],d=i[9],m=i[13],_=i[2],g=i[6],p=i[10],h=i[14],S=i[3],x=i[7],T=i[11],P=i[15],R=r[0],C=r[4],Q=r[8],y=r[12],A=r[1],U=r[5],D=r[9],H=r[13],L=r[2],z=r[6],W=r[10],re=r[14],ie=r[3],J=r[7],oe=r[11],me=r[15];return s[0]=a*R+o*A+c*L+l*ie,s[4]=a*C+o*U+c*z+l*J,s[8]=a*Q+o*D+c*W+l*oe,s[12]=a*y+o*H+c*re+l*me,s[1]=u*R+f*A+d*L+m*ie,s[5]=u*C+f*U+d*z+m*J,s[9]=u*Q+f*D+d*W+m*oe,s[13]=u*y+f*H+d*re+m*me,s[2]=_*R+g*A+p*L+h*ie,s[6]=_*C+g*U+p*z+h*J,s[10]=_*Q+g*D+p*W+h*oe,s[14]=_*y+g*H+p*re+h*me,s[3]=S*R+x*A+T*L+P*ie,s[7]=S*C+x*U+T*z+P*J,s[11]=S*Q+x*D+T*W+P*oe,s[15]=S*y+x*H+T*re+P*me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],f=e[6],d=e[10],m=e[14],_=e[3],g=e[7],p=e[11],h=e[15];return _*(+s*c*f-r*l*f-s*o*d+i*l*d+r*o*m-i*c*m)+g*(+t*c*m-t*l*d+s*a*d-r*a*m+r*l*u-s*c*u)+p*(+t*l*f-t*o*m-s*a*f+i*a*m+s*o*u-i*l*u)+h*(-r*o*u-t*c*f+t*o*d+r*a*f-i*a*d+i*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],f=e[9],d=e[10],m=e[11],_=e[12],g=e[13],p=e[14],h=e[15],S=f*p*l-g*d*l+g*c*m-o*p*m-f*c*h+o*d*h,x=_*d*l-u*p*l-_*c*m+a*p*m+u*c*h-a*d*h,T=u*g*l-_*f*l+_*o*m-a*g*m-u*o*h+a*f*h,P=_*f*c-u*g*c-_*o*d+a*g*d+u*o*p-a*f*p,R=t*S+i*x+r*T+s*P;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/R;return e[0]=S*C,e[1]=(g*d*s-f*p*s-g*r*m+i*p*m+f*r*h-i*d*h)*C,e[2]=(o*p*s-g*c*s+g*r*l-i*p*l-o*r*h+i*c*h)*C,e[3]=(f*c*s-o*d*s-f*r*l+i*d*l+o*r*m-i*c*m)*C,e[4]=x*C,e[5]=(u*p*s-_*d*s+_*r*m-t*p*m-u*r*h+t*d*h)*C,e[6]=(_*c*s-a*p*s-_*r*l+t*p*l+a*r*h-t*c*h)*C,e[7]=(a*d*s-u*c*s+u*r*l-t*d*l-a*r*m+t*c*m)*C,e[8]=T*C,e[9]=(_*f*s-u*g*s-_*i*m+t*g*m+u*i*h-t*f*h)*C,e[10]=(a*g*s-_*o*s+_*i*l-t*g*l-a*i*h+t*o*h)*C,e[11]=(u*o*s-a*f*s-u*i*l+t*f*l+a*i*m-t*o*m)*C,e[12]=P*C,e[13]=(u*g*r-_*f*r+_*i*d-t*g*d-u*i*p+t*f*p)*C,e[14]=(_*o*r-a*g*r-_*i*c+t*g*c+a*i*p-t*o*p)*C,e[15]=(a*f*r-u*o*r+u*i*c-t*f*c-a*i*d+t*o*d)*C,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,c=e.z,l=s*a,u=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+i,u*c-r*a,0,l*c-r*o,u*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,u=a+a,f=o+o,d=s*l,m=s*u,_=s*f,g=a*u,p=a*f,h=o*f,S=c*l,x=c*u,T=c*f,P=i.x,R=i.y,C=i.z;return r[0]=(1-(g+h))*P,r[1]=(m+T)*P,r[2]=(_-x)*P,r[3]=0,r[4]=(m-T)*R,r[5]=(1-(d+h))*R,r[6]=(p+S)*R,r[7]=0,r[8]=(_+x)*C,r[9]=(p-S)*C,r[10]=(1-(d+g))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=pi.set(r[0],r[1],r[2]).length();const a=pi.set(r[4],r[5],r[6]).length(),o=pi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Jt.copy(this);const l=1/s,u=1/a,f=1/o;return Jt.elements[0]*=l,Jt.elements[1]*=l,Jt.elements[2]*=l,Jt.elements[4]*=u,Jt.elements[5]*=u,Jt.elements[6]*=u,Jt.elements[8]*=f,Jt.elements[9]*=f,Jt.elements[10]*=f,t.setFromRotationMatrix(Jt),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=_n){const c=this.elements,l=2*s/(t-e),u=2*s/(i-r),f=(t+e)/(t-e),d=(i+r)/(i-r);let m,_;if(o===_n)m=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===qr)m=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=_n){const c=this.elements,l=1/(t-e),u=1/(i-r),f=1/(a-s),d=(t+e)*l,m=(i+r)*u;let _,g;if(o===_n)_=(a+s)*f,g=-2*f;else if(o===qr)_=s*f,g=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=g,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const pi=new I,Jt=new ht,ju=new I(0,0,0),qu=new I(1,1,1),bn=new I,mr=new I,Bt=new I,fa=new ht,pa=new ti;class ns{constructor(e=0,t=0,i=0,r=ns.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],f=r[2],d=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(Rt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Rt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Rt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Rt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Rt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return fa.makeRotationFromQuaternion(e),this.setFromRotationMatrix(fa,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return pa.setFromEuler(this),this.setFromQuaternion(pa,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ns.DEFAULT_ORDER="XYZ";class co{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Yu=0;const ma=new I,mi=new ti,dn=new ht,gr=new I,Vi=new I,Ku=new I,Zu=new ti,ga=new I(1,0,0),_a=new I(0,1,0),va=new I(0,0,1),Ju={type:"added"},Qu={type:"removed"};class pt extends ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yu++}),this.uuid=xn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pt.DEFAULT_UP.clone();const e=new I,t=new ns,i=new ti,r=new I(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ht},normalMatrix:{value:new Je}}),this.matrix=new ht,this.matrixWorld=new ht,this.matrixAutoUpdate=pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new co,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return mi.setFromAxisAngle(e,t),this.quaternion.multiply(mi),this}rotateOnWorldAxis(e,t){return mi.setFromAxisAngle(e,t),this.quaternion.premultiply(mi),this}rotateX(e){return this.rotateOnAxis(ga,e)}rotateY(e){return this.rotateOnAxis(_a,e)}rotateZ(e){return this.rotateOnAxis(va,e)}translateOnAxis(e,t){return ma.copy(e).applyQuaternion(this.quaternion),this.position.add(ma.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ga,e)}translateY(e){return this.translateOnAxis(_a,e)}translateZ(e){return this.translateOnAxis(va,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(dn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?gr.copy(e):gr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Vi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?dn.lookAt(Vi,gr,this.up):dn.lookAt(gr,Vi,this.up),this.quaternion.setFromRotationMatrix(dn),r&&(dn.extractRotation(r.matrixWorld),mi.setFromRotationMatrix(dn),this.quaternion.premultiply(mi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Ju)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Qu)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),dn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),dn.multiply(e.parent.matrixWorld)),e.applyMatrix4(dn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vi,e,Ku),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vi,Zu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];s(e.shapes,f)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),f=a(e.shapes),d=a(e.skeletons),m=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),m.length>0&&(i.animations=m),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}pt.DEFAULT_UP=new I(0,1,0);pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Qt=new I,fn=new I,Ts=new I,pn=new I,gi=new I,_i=new I,xa=new I,ws=new I,As=new I,Rs=new I;let _r=!1;class $t{constructor(e=new I,t=new I,i=new I){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Qt.subVectors(e,t),r.cross(Qt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Qt.subVectors(r,t),fn.subVectors(i,t),Ts.subVectors(e,t);const a=Qt.dot(Qt),o=Qt.dot(fn),c=Qt.dot(Ts),l=fn.dot(fn),u=fn.dot(Ts),f=a*l-o*o;if(f===0)return s.set(0,0,0),null;const d=1/f,m=(l*c-o*u)*d,_=(a*u-o*c)*d;return s.set(1-m-_,_,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,pn)===null?!1:pn.x>=0&&pn.y>=0&&pn.x+pn.y<=1}static getUV(e,t,i,r,s,a,o,c){return _r===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),_r=!0),this.getInterpolation(e,t,i,r,s,a,o,c)}static getInterpolation(e,t,i,r,s,a,o,c){return this.getBarycoord(e,t,i,r,pn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,pn.x),c.addScaledVector(a,pn.y),c.addScaledVector(o,pn.z),c)}static isFrontFacing(e,t,i,r){return Qt.subVectors(i,t),fn.subVectors(e,t),Qt.cross(fn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Qt.subVectors(this.c,this.b),fn.subVectors(this.a,this.b),Qt.cross(fn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return $t.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return $t.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,s){return _r===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),_r=!0),$t.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}getInterpolation(e,t,i,r,s){return $t.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return $t.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return $t.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;gi.subVectors(r,i),_i.subVectors(s,i),ws.subVectors(e,i);const c=gi.dot(ws),l=_i.dot(ws);if(c<=0&&l<=0)return t.copy(i);As.subVectors(e,r);const u=gi.dot(As),f=_i.dot(As);if(u>=0&&f<=u)return t.copy(r);const d=c*f-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(i).addScaledVector(gi,a);Rs.subVectors(e,s);const m=gi.dot(Rs),_=_i.dot(Rs);if(_>=0&&m<=_)return t.copy(s);const g=m*l-c*_;if(g<=0&&l>=0&&_<=0)return o=l/(l-_),t.copy(i).addScaledVector(_i,o);const p=u*_-m*f;if(p<=0&&f-u>=0&&m-_>=0)return xa.subVectors(s,r),o=(f-u)/(f-u+(m-_)),t.copy(r).addScaledVector(xa,o);const h=1/(p+g+d);return a=g*h,o=d*h,t.copy(i).addScaledVector(gi,a).addScaledVector(_i,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Wc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Tn={h:0,s:0,l:0},vr={h:0,s:0,l:0};function Cs(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ye{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Mt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ot.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=ot.workingColorSpace){return this.r=e,this.g=t,this.b=i,ot.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=ot.workingColorSpace){if(e=ao(e,1),t=Rt(t,0,1),i=Rt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Cs(a,s,e+1/3),this.g=Cs(a,s,e),this.b=Cs(a,s,e-1/3)}return ot.toWorkingColorSpace(this,r),this}setStyle(e,t=Mt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Mt){const i=Wc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Di(e.r),this.g=Di(e.g),this.b=Di(e.b),this}copyLinearToSRGB(e){return this.r=_s(e.r),this.g=_s(e.g),this.b=_s(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Mt){return ot.fromWorkingColorSpace(At.copy(this),e),Math.round(Rt(At.r*255,0,255))*65536+Math.round(Rt(At.g*255,0,255))*256+Math.round(Rt(At.b*255,0,255))}getHexString(e=Mt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ot.workingColorSpace){ot.fromWorkingColorSpace(At.copy(this),t);const i=At.r,r=At.g,s=At.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const f=a-o;switch(l=u<=.5?f/(a+o):f/(2-a-o),a){case i:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-i)/f+2;break;case s:c=(i-r)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=ot.workingColorSpace){return ot.fromWorkingColorSpace(At.copy(this),t),e.r=At.r,e.g=At.g,e.b=At.b,e}getStyle(e=Mt){ot.fromWorkingColorSpace(At.copy(this),e);const t=At.r,i=At.g,r=At.b;return e!==Mt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Tn),this.setHSL(Tn.h+e,Tn.s+t,Tn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Tn),e.getHSL(vr);const i=Qi(Tn.h,vr.h,t),r=Qi(Tn.s,vr.s,t),s=Qi(Tn.l,vr.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const At=new Ye;Ye.NAMES=Wc;let eh=0;class On extends ii{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:eh++}),this.uuid=xn(),this.name="",this.type="Material",this.blending=Pi,this.side=Nn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ws,this.blendDst=Vs,this.blendEquation=qn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=Vr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=oa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=li,this.stencilZFail=li,this.stencilZPass=li,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Pi&&(i.blending=this.blending),this.side!==Nn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ws&&(i.blendSrc=this.blendSrc),this.blendDst!==Vs&&(i.blendDst=this.blendDst),this.blendEquation!==qn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Vr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==oa&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==li&&(i.stencilFail=this.stencilFail),this.stencilZFail!==li&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==li&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class lo extends On{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=wc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ft=new I,xr=new Ue;class nn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ys,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ln,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)xr.fromBufferAttribute(this,t),xr.applyMatrix3(e),this.setXY(t,xr.x,xr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix3(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix4(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ft.fromBufferAttribute(this,t),ft.applyNormalMatrix(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ft.fromBufferAttribute(this,t),ft.transformDirection(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=on(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=st(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=on(t,this.array)),t}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=on(t,this.array)),t}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=on(t,this.array)),t}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=on(t,this.array)),t}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),i=st(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),i=st(i,this.array),r=st(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),i=st(i,this.array),r=st(r,this.array),s=st(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ys&&(e.usage=this.usage),e}}class Vc extends nn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Xc extends nn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Kt extends nn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let th=0;const Vt=new ht,Ls=new pt,vi=new I,zt=new Bi,Xi=new Bi,yt=new I;class Gt extends ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:th++}),this.uuid=xn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(zc(e)?Xc:Vc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Je().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Vt.makeRotationFromQuaternion(e),this.applyMatrix4(Vt),this}rotateX(e){return Vt.makeRotationX(e),this.applyMatrix4(Vt),this}rotateY(e){return Vt.makeRotationY(e),this.applyMatrix4(Vt),this}rotateZ(e){return Vt.makeRotationZ(e),this.applyMatrix4(Vt),this}translate(e,t,i){return Vt.makeTranslation(e,t,i),this.applyMatrix4(Vt),this}scale(e,t,i){return Vt.makeScale(e,t,i),this.applyMatrix4(Vt),this}lookAt(e){return Ls.lookAt(e),Ls.updateMatrix(),this.applyMatrix4(Ls.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vi).negate(),this.translate(vi.x,vi.y,vi.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Kt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Bi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];zt.setFromBufferAttribute(s),this.morphTargetsRelative?(yt.addVectors(this.boundingBox.min,zt.min),this.boundingBox.expandByPoint(yt),yt.addVectors(this.boundingBox.max,zt.max),this.boundingBox.expandByPoint(yt)):(this.boundingBox.expandByPoint(zt.min),this.boundingBox.expandByPoint(zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new or);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new I,1/0);return}if(e){const i=this.boundingSphere.center;if(zt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Xi.setFromBufferAttribute(o),this.morphTargetsRelative?(yt.addVectors(zt.min,Xi.min),zt.expandByPoint(yt),yt.addVectors(zt.max,Xi.max),zt.expandByPoint(yt)):(zt.expandByPoint(Xi.min),zt.expandByPoint(Xi.max))}zt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)yt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(yt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)yt.fromBufferAttribute(o,l),c&&(vi.fromBufferAttribute(e,l),yt.add(vi)),r=Math.max(r,i.distanceToSquared(yt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,s=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new nn(new Float32Array(4*o),4));const c=this.getAttribute("tangent").array,l=[],u=[];for(let A=0;A<o;A++)l[A]=new I,u[A]=new I;const f=new I,d=new I,m=new I,_=new Ue,g=new Ue,p=new Ue,h=new I,S=new I;function x(A,U,D){f.fromArray(r,A*3),d.fromArray(r,U*3),m.fromArray(r,D*3),_.fromArray(a,A*2),g.fromArray(a,U*2),p.fromArray(a,D*2),d.sub(f),m.sub(f),g.sub(_),p.sub(_);const H=1/(g.x*p.y-p.x*g.y);isFinite(H)&&(h.copy(d).multiplyScalar(p.y).addScaledVector(m,-g.y).multiplyScalar(H),S.copy(m).multiplyScalar(g.x).addScaledVector(d,-p.x).multiplyScalar(H),l[A].add(h),l[U].add(h),l[D].add(h),u[A].add(S),u[U].add(S),u[D].add(S))}let T=this.groups;T.length===0&&(T=[{start:0,count:i.length}]);for(let A=0,U=T.length;A<U;++A){const D=T[A],H=D.start,L=D.count;for(let z=H,W=H+L;z<W;z+=3)x(i[z+0],i[z+1],i[z+2])}const P=new I,R=new I,C=new I,Q=new I;function y(A){C.fromArray(s,A*3),Q.copy(C);const U=l[A];P.copy(U),P.sub(C.multiplyScalar(C.dot(U))).normalize(),R.crossVectors(Q,U);const H=R.dot(u[A])<0?-1:1;c[A*4]=P.x,c[A*4+1]=P.y,c[A*4+2]=P.z,c[A*4+3]=H}for(let A=0,U=T.length;A<U;++A){const D=T[A],H=D.start,L=D.count;for(let z=H,W=H+L;z<W;z+=3)y(i[z+0]),y(i[z+1]),y(i[z+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new nn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,m=i.count;d<m;d++)i.setXYZ(d,0,0,0);const r=new I,s=new I,a=new I,o=new I,c=new I,l=new I,u=new I,f=new I;if(e)for(let d=0,m=e.count;d<m;d+=3){const _=e.getX(d+0),g=e.getX(d+1),p=e.getX(d+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,p),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(i,_),c.fromBufferAttribute(i,g),l.fromBufferAttribute(i,p),o.add(u),c.add(u),l.add(u),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(g,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let d=0,m=t.count;d<m;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)yt.fromBufferAttribute(e,t),yt.normalize(),e.setXYZ(t,yt.x,yt.y,yt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,f=o.normalized,d=new l.constructor(c.length*u);let m=0,_=0;for(let g=0,p=c.length;g<p;g++){o.isInterleavedBufferAttribute?m=c[g]*o.data.stride+o.offset:m=c[g]*u;for(let h=0;h<u;h++)d[_++]=l[m++]}return new nn(d,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Gt,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,i);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let u=0,f=l.length;u<f;u++){const d=l[u],m=e(d,i);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,d=l.length;f<d;f++){const m=l[f];u.push(m.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],f=s[l];for(let d=0,m=f.length;d<m;d++)u.push(f[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ya=new ht,Vn=new ar,yr=new or,Ma=new I,xi=new I,yi=new I,Mi=new I,Ps=new I,Mr=new I,Er=new Ue,Sr=new Ue,br=new Ue,Ea=new I,Sa=new I,ba=new I,Tr=new I,wr=new I;class Nt extends pt{constructor(e=new Gt,t=new lo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Mr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=o[c],f=s[c];u!==0&&(Ps.fromBufferAttribute(f,e),a?Mr.addScaledVector(Ps,u):Mr.addScaledVector(Ps.sub(t),u))}t.add(Mr)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),yr.copy(i.boundingSphere),yr.applyMatrix4(s),Vn.copy(e.ray).recast(e.near),!(yr.containsPoint(Vn.origin)===!1&&(Vn.intersectSphere(yr,Ma)===null||Vn.origin.distanceToSquared(Ma)>(e.far-e.near)**2))&&(ya.copy(s).invert(),Vn.copy(e.ray).applyMatrix4(ya),!(i.boundingBox!==null&&Vn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Vn)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,d=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,g=d.length;_<g;_++){const p=d[_],h=a[p.materialIndex],S=Math.max(p.start,m.start),x=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let T=S,P=x;T<P;T+=3){const R=o.getX(T),C=o.getX(T+1),Q=o.getX(T+2);r=Ar(this,h,e,i,l,u,f,R,C,Q),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const _=Math.max(0,m.start),g=Math.min(o.count,m.start+m.count);for(let p=_,h=g;p<h;p+=3){const S=o.getX(p),x=o.getX(p+1),T=o.getX(p+2);r=Ar(this,a,e,i,l,u,f,S,x,T),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,g=d.length;_<g;_++){const p=d[_],h=a[p.materialIndex],S=Math.max(p.start,m.start),x=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let T=S,P=x;T<P;T+=3){const R=T,C=T+1,Q=T+2;r=Ar(this,h,e,i,l,u,f,R,C,Q),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const _=Math.max(0,m.start),g=Math.min(c.count,m.start+m.count);for(let p=_,h=g;p<h;p+=3){const S=p,x=p+1,T=p+2;r=Ar(this,a,e,i,l,u,f,S,x,T),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function nh(n,e,t,i,r,s,a,o){let c;if(e.side===Ut?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===Nn,o),c===null)return null;wr.copy(o),wr.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(wr);return l<t.near||l>t.far?null:{distance:l,point:wr.clone(),object:n}}function Ar(n,e,t,i,r,s,a,o,c,l){n.getVertexPosition(o,xi),n.getVertexPosition(c,yi),n.getVertexPosition(l,Mi);const u=nh(n,e,t,i,xi,yi,Mi,Tr);if(u){r&&(Er.fromBufferAttribute(r,o),Sr.fromBufferAttribute(r,c),br.fromBufferAttribute(r,l),u.uv=$t.getInterpolation(Tr,xi,yi,Mi,Er,Sr,br,new Ue)),s&&(Er.fromBufferAttribute(s,o),Sr.fromBufferAttribute(s,c),br.fromBufferAttribute(s,l),u.uv1=$t.getInterpolation(Tr,xi,yi,Mi,Er,Sr,br,new Ue),u.uv2=u.uv1),a&&(Ea.fromBufferAttribute(a,o),Sa.fromBufferAttribute(a,c),ba.fromBufferAttribute(a,l),u.normal=$t.getInterpolation(Tr,xi,yi,Mi,Ea,Sa,ba,new I),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:c,c:l,normal:new I,materialIndex:0};$t.getNormal(xi,yi,Mi,f.normal),u.face=f}return u}class cr extends Gt{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],u=[],f=[];let d=0,m=0;_("z","y","x",-1,-1,i,t,e,a,s,0),_("z","y","x",1,-1,i,t,-e,a,s,1),_("x","z","y",1,1,e,i,t,r,a,2),_("x","z","y",1,-1,e,i,-t,r,a,3),_("x","y","z",1,-1,e,t,i,r,s,4),_("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new Kt(l,3)),this.setAttribute("normal",new Kt(u,3)),this.setAttribute("uv",new Kt(f,2));function _(g,p,h,S,x,T,P,R,C,Q,y){const A=T/C,U=P/Q,D=T/2,H=P/2,L=R/2,z=C+1,W=Q+1;let re=0,ie=0;const J=new I;for(let oe=0;oe<W;oe++){const me=oe*U-H;for(let ge=0;ge<z;ge++){const F=ge*A-D;J[g]=F*S,J[p]=me*x,J[h]=L,l.push(J.x,J.y,J.z),J[g]=0,J[p]=0,J[h]=R>0?1:-1,u.push(J.x,J.y,J.z),f.push(ge/C),f.push(1-oe/Q),re+=1}}for(let oe=0;oe<Q;oe++)for(let me=0;me<C;me++){const ge=d+me+z*oe,F=d+me+z*(oe+1),se=d+(me+1)+z*(oe+1),ve=d+(me+1)+z*oe;c.push(ge,F,ve),c.push(F,se,ve),ie+=6}o.addGroup(m,ie,y),m+=ie,d+=re}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Fi(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Lt(n){const e={};for(let t=0;t<n.length;t++){const i=Fi(n[t]);for(const r in i)e[r]=i[r]}return e}function ih(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function $c(n){return n.getRenderTarget()===null?n.outputColorSpace:ot.workingColorSpace}const rh={clone:Fi,merge:Lt};var sh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,oh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ni extends On{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sh,this.fragmentShader=oh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Fi(e.uniforms),this.uniformsGroups=ih(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class jc extends pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ht,this.projectionMatrix=new ht,this.projectionMatrixInverse=new ht,this.coordinateSystem=_n}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class jt extends jc{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=rr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ji*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return rr*2*Math.atan(Math.tan(Ji*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ji*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ei=-90,Si=1;class ah extends pt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new jt(Ei,Si,e,t);r.layers=this.layers,this.add(r);const s=new jt(Ei,Si,e,t);s.layers=this.layers,this.add(s);const a=new jt(Ei,Si,e,t);a.layers=this.layers,this.add(a);const o=new jt(Ei,Si,e,t);o.layers=this.layers,this.add(o);const c=new jt(Ei,Si,e,t);c.layers=this.layers,this.add(c);const l=new jt(Ei,Si,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===_n)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===qr)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,l),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(f,d,m),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class qc extends Ot{constructor(e,t,i,r,s,a,o,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:Ui,super(e,t,i,r,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ch extends ei{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&(er("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Jn?Mt:Yt),this.texture=new qc(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Xt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new cr(5,5,5),s=new ni({name:"CubemapFromEquirect",uniforms:Fi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ut,blending:Dn});s.uniforms.tEquirect.value=t;const a=new Nt(r,s),o=t.minFilter;return t.minFilter===nr&&(t.minFilter=Xt),new ah(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}const Ds=new I,lh=new I,uh=new Je;class An{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Ds.subVectors(i,t).cross(lh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Ds),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||uh.getNormalMatrix(e),r=this.coplanarPoint(Ds).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Xn=new or,Rr=new I;class uo{constructor(e=new An,t=new An,i=new An,r=new An,s=new An,a=new An){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=_n){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],c=r[3],l=r[4],u=r[5],f=r[6],d=r[7],m=r[8],_=r[9],g=r[10],p=r[11],h=r[12],S=r[13],x=r[14],T=r[15];if(i[0].setComponents(c-s,d-l,p-m,T-h).normalize(),i[1].setComponents(c+s,d+l,p+m,T+h).normalize(),i[2].setComponents(c+a,d+u,p+_,T+S).normalize(),i[3].setComponents(c-a,d-u,p-_,T-S).normalize(),i[4].setComponents(c-o,d-f,p-g,T-x).normalize(),t===_n)i[5].setComponents(c+o,d+f,p+g,T+x).normalize();else if(t===qr)i[5].setComponents(o,f,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xn)}intersectsSprite(e){return Xn.center.set(0,0,0),Xn.radius=.7071067811865476,Xn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xn)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Rr.x=r.normal.x>0?e.max.x:e.min.x,Rr.y=r.normal.y>0?e.max.y:e.min.y,Rr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Rr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Yc(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function hh(n,e){const t=e.isWebGL2,i=new WeakMap;function r(l,u){const f=l.array,d=l.usage,m=f.byteLength,_=n.createBuffer();n.bindBuffer(u,_),n.bufferData(u,f,d),l.onUploadCallback();let g;if(f instanceof Float32Array)g=n.FLOAT;else if(f instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)g=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=n.UNSIGNED_SHORT;else if(f instanceof Int16Array)g=n.SHORT;else if(f instanceof Uint32Array)g=n.UNSIGNED_INT;else if(f instanceof Int32Array)g=n.INT;else if(f instanceof Int8Array)g=n.BYTE;else if(f instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:_,type:g,bytesPerElement:f.BYTES_PER_ELEMENT,version:l.version,size:m}}function s(l,u,f){const d=u.array,m=u._updateRange,_=u.updateRanges;if(n.bindBuffer(f,l),m.count===-1&&_.length===0&&n.bufferSubData(f,0,d),_.length!==0){for(let g=0,p=_.length;g<p;g++){const h=_[g];t?n.bufferSubData(f,h.start*d.BYTES_PER_ELEMENT,d,h.start,h.count):n.bufferSubData(f,h.start*d.BYTES_PER_ELEMENT,d.subarray(h.start,h.start+h.count))}u.clearUpdateRanges()}m.count!==-1&&(t?n.bufferSubData(f,m.offset*d.BYTES_PER_ELEMENT,d,m.offset,m.count):n.bufferSubData(f,m.offset*d.BYTES_PER_ELEMENT,d.subarray(m.offset,m.offset+m.count)),m.count=-1),u.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),i.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);const u=i.get(l);u&&(n.deleteBuffer(u.buffer),i.delete(l))}function c(l,u){if(l.isGLBufferAttribute){const d=i.get(l);(!d||d.version<l.version)&&i.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const f=i.get(l);if(f===void 0)i.set(l,r(l,u));else if(f.version<l.version){if(f.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,l,u),f.version=l.version}}return{get:a,remove:o,update:c}}class ho extends Gt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,u=c+1,f=e/o,d=t/c,m=[],_=[],g=[],p=[];for(let h=0;h<u;h++){const S=h*d-a;for(let x=0;x<l;x++){const T=x*f-s;_.push(T,-S,0),g.push(0,0,1),p.push(x/o),p.push(1-h/c)}}for(let h=0;h<c;h++)for(let S=0;S<o;S++){const x=S+l*h,T=S+l*(h+1),P=S+1+l*(h+1),R=S+1+l*h;m.push(x,T,R),m.push(T,P,R)}this.setIndex(m),this.setAttribute("position",new Kt(_,3)),this.setAttribute("normal",new Kt(g,3)),this.setAttribute("uv",new Kt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ho(e.width,e.height,e.widthSegments,e.heightSegments)}}var dh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,fh=`#ifdef USE_ALPHAHASH
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
#endif`,ph=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,mh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gh=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,_h=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,vh=`#ifdef USE_AOMAP
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
#endif`,xh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,yh=`#ifdef USE_BATCHING
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
#endif`,Mh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Eh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Sh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Th=`#ifdef USE_IRIDESCENCE
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
#endif`,wh=`#ifdef USE_BUMPMAP
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
#endif`,Ah=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Rh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ch=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ph=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Dh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ih=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Uh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Nh=`#define PI 3.141592653589793
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
} // validated`,Oh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Fh=`vec3 transformedNormal = objectNormal;
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
#endif`,Bh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wh=`
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
}`,Vh=`#ifdef USE_ENVMAP
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
#endif`,Xh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,$h=`#ifdef USE_ENVMAP
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
#endif`,jh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qh=`#ifdef USE_ENVMAP
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
#endif`,Yh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Kh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Jh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Qh=`#ifdef USE_GRADIENTMAP
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
}`,ed=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,td=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,id=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rd=`uniform bool receiveShadow;
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
#endif`,sd=`#ifdef USE_ENVMAP
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
#endif`,od=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ad=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,cd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ld=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ud=`PhysicalMaterial material;
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
#endif`,hd=`struct PhysicalMaterial {
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
}`,dd=`
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
#endif`,fd=`#if defined( RE_IndirectDiffuse )
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
#endif`,pd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,md=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_d=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,vd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,xd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,yd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Md=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ed=`#if defined( USE_POINTS_UV )
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
#endif`,Sd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,bd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Td=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wd=`#ifdef USE_MORPHNORMALS
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
#endif`,Ad=`#ifdef USE_MORPHTARGETS
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
#endif`,Rd=`#ifdef USE_MORPHTARGETS
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
#endif`,Cd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ld=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Pd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Id=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ud=`#ifdef USE_NORMALMAP
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
#endif`,Nd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Od=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Fd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Bd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,zd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,kd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Hd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Gd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Vd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Xd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$d=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,qd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Yd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Kd=`float getShadowMask() {
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
}`,Zd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Jd=`#ifdef USE_SKINNING
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
#endif`,Qd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ef=`#ifdef USE_SKINNING
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
#endif`,tf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,nf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,sf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,of=`#ifdef USE_TRANSMISSION
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
#endif`,af=`#ifdef USE_TRANSMISSION
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
#endif`,cf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const df=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ff=`uniform sampler2D t2D;
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
}`,pf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,gf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_f=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vf=`#include <common>
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
}`,xf=`#if DEPTH_PACKING == 3200
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
}`,yf=`#define DISTANCE
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
}`,Mf=`#define DISTANCE
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
}`,Ef=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Sf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bf=`uniform float scale;
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
}`,Tf=`uniform vec3 diffuse;
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
}`,wf=`#include <common>
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
}`,Af=`uniform vec3 diffuse;
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
}`,Rf=`#define LAMBERT
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
}`,Cf=`#define LAMBERT
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
}`,Lf=`#define MATCAP
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
}`,Pf=`#define MATCAP
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
}`,Df=`#define NORMAL
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
}`,If=`#define NORMAL
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
}`,Uf=`#define PHONG
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
}`,Nf=`#define PHONG
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
}`,Of=`#define STANDARD
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
}`,Ff=`#define STANDARD
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
}`,Bf=`#define TOON
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
}`,zf=`#define TOON
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
}`,kf=`uniform float size;
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
}`,Hf=`uniform vec3 diffuse;
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
}`,Gf=`#include <common>
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
}`,Wf=`uniform vec3 color;
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
}`,Vf=`uniform float rotation;
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
}`,Xf=`uniform vec3 diffuse;
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
}`,je={alphahash_fragment:dh,alphahash_pars_fragment:fh,alphamap_fragment:ph,alphamap_pars_fragment:mh,alphatest_fragment:gh,alphatest_pars_fragment:_h,aomap_fragment:vh,aomap_pars_fragment:xh,batching_pars_vertex:yh,batching_vertex:Mh,begin_vertex:Eh,beginnormal_vertex:Sh,bsdfs:bh,iridescence_fragment:Th,bumpmap_pars_fragment:wh,clipping_planes_fragment:Ah,clipping_planes_pars_fragment:Rh,clipping_planes_pars_vertex:Ch,clipping_planes_vertex:Lh,color_fragment:Ph,color_pars_fragment:Dh,color_pars_vertex:Ih,color_vertex:Uh,common:Nh,cube_uv_reflection_fragment:Oh,defaultnormal_vertex:Fh,displacementmap_pars_vertex:Bh,displacementmap_vertex:zh,emissivemap_fragment:kh,emissivemap_pars_fragment:Hh,colorspace_fragment:Gh,colorspace_pars_fragment:Wh,envmap_fragment:Vh,envmap_common_pars_fragment:Xh,envmap_pars_fragment:$h,envmap_pars_vertex:jh,envmap_physical_pars_fragment:sd,envmap_vertex:qh,fog_vertex:Yh,fog_pars_vertex:Kh,fog_fragment:Zh,fog_pars_fragment:Jh,gradientmap_pars_fragment:Qh,lightmap_fragment:ed,lightmap_pars_fragment:td,lights_lambert_fragment:nd,lights_lambert_pars_fragment:id,lights_pars_begin:rd,lights_toon_fragment:od,lights_toon_pars_fragment:ad,lights_phong_fragment:cd,lights_phong_pars_fragment:ld,lights_physical_fragment:ud,lights_physical_pars_fragment:hd,lights_fragment_begin:dd,lights_fragment_maps:fd,lights_fragment_end:pd,logdepthbuf_fragment:md,logdepthbuf_pars_fragment:gd,logdepthbuf_pars_vertex:_d,logdepthbuf_vertex:vd,map_fragment:xd,map_pars_fragment:yd,map_particle_fragment:Md,map_particle_pars_fragment:Ed,metalnessmap_fragment:Sd,metalnessmap_pars_fragment:bd,morphcolor_vertex:Td,morphnormal_vertex:wd,morphtarget_pars_vertex:Ad,morphtarget_vertex:Rd,normal_fragment_begin:Cd,normal_fragment_maps:Ld,normal_pars_fragment:Pd,normal_pars_vertex:Dd,normal_vertex:Id,normalmap_pars_fragment:Ud,clearcoat_normal_fragment_begin:Nd,clearcoat_normal_fragment_maps:Od,clearcoat_pars_fragment:Fd,iridescence_pars_fragment:Bd,opaque_fragment:zd,packing:kd,premultiplied_alpha_fragment:Hd,project_vertex:Gd,dithering_fragment:Wd,dithering_pars_fragment:Vd,roughnessmap_fragment:Xd,roughnessmap_pars_fragment:$d,shadowmap_pars_fragment:jd,shadowmap_pars_vertex:qd,shadowmap_vertex:Yd,shadowmask_pars_fragment:Kd,skinbase_vertex:Zd,skinning_pars_vertex:Jd,skinning_vertex:Qd,skinnormal_vertex:ef,specularmap_fragment:tf,specularmap_pars_fragment:nf,tonemapping_fragment:rf,tonemapping_pars_fragment:sf,transmission_fragment:of,transmission_pars_fragment:af,uv_pars_fragment:cf,uv_pars_vertex:lf,uv_vertex:uf,worldpos_vertex:hf,background_vert:df,background_frag:ff,backgroundCube_vert:pf,backgroundCube_frag:mf,cube_vert:gf,cube_frag:_f,depth_vert:vf,depth_frag:xf,distanceRGBA_vert:yf,distanceRGBA_frag:Mf,equirect_vert:Ef,equirect_frag:Sf,linedashed_vert:bf,linedashed_frag:Tf,meshbasic_vert:wf,meshbasic_frag:Af,meshlambert_vert:Rf,meshlambert_frag:Cf,meshmatcap_vert:Lf,meshmatcap_frag:Pf,meshnormal_vert:Df,meshnormal_frag:If,meshphong_vert:Uf,meshphong_frag:Nf,meshphysical_vert:Of,meshphysical_frag:Ff,meshtoon_vert:Bf,meshtoon_frag:zf,points_vert:kf,points_frag:Hf,shadow_vert:Gf,shadow_frag:Wf,sprite_vert:Vf,sprite_frag:Xf},xe={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Je}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Je},normalScale:{value:new Ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0},uvTransform:{value:new Je}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new Ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}}},sn={basic:{uniforms:Lt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:Lt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Ye(0)}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:Lt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:Lt([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:Lt([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new Ye(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:Lt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:Lt([xe.points,xe.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:Lt([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:Lt([xe.common,xe.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:Lt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:Lt([xe.sprite,xe.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distanceRGBA:{uniforms:Lt([xe.common,xe.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distanceRGBA_vert,fragmentShader:je.distanceRGBA_frag},shadow:{uniforms:Lt([xe.lights,xe.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};sn.physical={uniforms:Lt([sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Je},clearcoatNormalScale:{value:new Ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Je},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Je},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Je},transmissionSamplerSize:{value:new Ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Je},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Je},anisotropyVector:{value:new Ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Je}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const Cr={r:0,b:0,g:0};function $f(n,e,t,i,r,s,a){const o=new Ye(0);let c=s===!0?0:1,l,u,f=null,d=0,m=null;function _(p,h){let S=!1,x=h.isScene===!0?h.background:null;x&&x.isTexture&&(x=(h.backgroundBlurriness>0?t:e).get(x)),x===null?g(o,c):x&&x.isColor&&(g(x,1),S=!0);const T=n.xr.getEnvironmentBlendMode();T==="additive"?i.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||S)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),x&&(x.isCubeTexture||x.mapping===es)?(u===void 0&&(u=new Nt(new cr(1,1,1),new ni({name:"BackgroundCubeMaterial",uniforms:Fi(sn.backgroundCube.uniforms),vertexShader:sn.backgroundCube.vertexShader,fragmentShader:sn.backgroundCube.fragmentShader,side:Ut,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(P,R,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=h.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=h.backgroundIntensity,u.material.toneMapped=ot.getTransfer(x.colorSpace)!==at,(f!==x||d!==x.version||m!==n.toneMapping)&&(u.material.needsUpdate=!0,f=x,d=x.version,m=n.toneMapping),u.layers.enableAll(),p.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Nt(new ho(2,2),new ni({name:"BackgroundMaterial",uniforms:Fi(sn.background.uniforms),vertexShader:sn.background.vertexShader,fragmentShader:sn.background.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=h.backgroundIntensity,l.material.toneMapped=ot.getTransfer(x.colorSpace)!==at,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(f!==x||d!==x.version||m!==n.toneMapping)&&(l.material.needsUpdate=!0,f=x,d=x.version,m=n.toneMapping),l.layers.enableAll(),p.unshift(l,l.geometry,l.material,0,0,null))}function g(p,h){p.getRGB(Cr,$c(n)),i.buffers.color.setClear(Cr.r,Cr.g,Cr.b,h,a)}return{getClearColor:function(){return o},setClearColor:function(p,h=1){o.set(p),c=h,g(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(p){c=p,g(o,c)},render:_}}function jf(n,e,t,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||s!==null,o={},c=p(null);let l=c,u=!1;function f(L,z,W,re,ie){let J=!1;if(a){const oe=g(re,W,z);l!==oe&&(l=oe,m(l.object)),J=h(L,re,W,ie),J&&S(L,re,W,ie)}else{const oe=z.wireframe===!0;(l.geometry!==re.id||l.program!==W.id||l.wireframe!==oe)&&(l.geometry=re.id,l.program=W.id,l.wireframe=oe,J=!0)}ie!==null&&t.update(ie,n.ELEMENT_ARRAY_BUFFER),(J||u)&&(u=!1,Q(L,z,W,re),ie!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(ie).buffer))}function d(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function m(L){return i.isWebGL2?n.bindVertexArray(L):s.bindVertexArrayOES(L)}function _(L){return i.isWebGL2?n.deleteVertexArray(L):s.deleteVertexArrayOES(L)}function g(L,z,W){const re=W.wireframe===!0;let ie=o[L.id];ie===void 0&&(ie={},o[L.id]=ie);let J=ie[z.id];J===void 0&&(J={},ie[z.id]=J);let oe=J[re];return oe===void 0&&(oe=p(d()),J[re]=oe),oe}function p(L){const z=[],W=[],re=[];for(let ie=0;ie<r;ie++)z[ie]=0,W[ie]=0,re[ie]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:W,attributeDivisors:re,object:L,attributes:{},index:null}}function h(L,z,W,re){const ie=l.attributes,J=z.attributes;let oe=0;const me=W.getAttributes();for(const ge in me)if(me[ge].location>=0){const se=ie[ge];let ve=J[ge];if(ve===void 0&&(ge==="instanceMatrix"&&L.instanceMatrix&&(ve=L.instanceMatrix),ge==="instanceColor"&&L.instanceColor&&(ve=L.instanceColor)),se===void 0||se.attribute!==ve||ve&&se.data!==ve.data)return!0;oe++}return l.attributesNum!==oe||l.index!==re}function S(L,z,W,re){const ie={},J=z.attributes;let oe=0;const me=W.getAttributes();for(const ge in me)if(me[ge].location>=0){let se=J[ge];se===void 0&&(ge==="instanceMatrix"&&L.instanceMatrix&&(se=L.instanceMatrix),ge==="instanceColor"&&L.instanceColor&&(se=L.instanceColor));const ve={};ve.attribute=se,se&&se.data&&(ve.data=se.data),ie[ge]=ve,oe++}l.attributes=ie,l.attributesNum=oe,l.index=re}function x(){const L=l.newAttributes;for(let z=0,W=L.length;z<W;z++)L[z]=0}function T(L){P(L,0)}function P(L,z){const W=l.newAttributes,re=l.enabledAttributes,ie=l.attributeDivisors;W[L]=1,re[L]===0&&(n.enableVertexAttribArray(L),re[L]=1),ie[L]!==z&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,z),ie[L]=z)}function R(){const L=l.newAttributes,z=l.enabledAttributes;for(let W=0,re=z.length;W<re;W++)z[W]!==L[W]&&(n.disableVertexAttribArray(W),z[W]=0)}function C(L,z,W,re,ie,J,oe){oe===!0?n.vertexAttribIPointer(L,z,W,ie,J):n.vertexAttribPointer(L,z,W,re,ie,J)}function Q(L,z,W,re){if(i.isWebGL2===!1&&(L.isInstancedMesh||re.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const ie=re.attributes,J=W.getAttributes(),oe=z.defaultAttributeValues;for(const me in J){const ge=J[me];if(ge.location>=0){let F=ie[me];if(F===void 0&&(me==="instanceMatrix"&&L.instanceMatrix&&(F=L.instanceMatrix),me==="instanceColor"&&L.instanceColor&&(F=L.instanceColor)),F!==void 0){const se=F.normalized,ve=F.itemSize,Te=t.get(F);if(Te===void 0)continue;const Re=Te.buffer,Ie=Te.type,ze=Te.bytesPerElement,De=i.isWebGL2===!0&&(Ie===n.INT||Ie===n.UNSIGNED_INT||F.gpuType===Cc);if(F.isInterleavedBufferAttribute){const Ke=F.data,G=Ke.stride,mt=F.offset;if(Ke.isInstancedInterleavedBuffer){for(let Le=0;Le<ge.locationSize;Le++)P(ge.location+Le,Ke.meshPerAttribute);L.isInstancedMesh!==!0&&re._maxInstanceCount===void 0&&(re._maxInstanceCount=Ke.meshPerAttribute*Ke.count)}else for(let Le=0;Le<ge.locationSize;Le++)T(ge.location+Le);n.bindBuffer(n.ARRAY_BUFFER,Re);for(let Le=0;Le<ge.locationSize;Le++)C(ge.location+Le,ve/ge.locationSize,Ie,se,G*ze,(mt+ve/ge.locationSize*Le)*ze,De)}else{if(F.isInstancedBufferAttribute){for(let Ke=0;Ke<ge.locationSize;Ke++)P(ge.location+Ke,F.meshPerAttribute);L.isInstancedMesh!==!0&&re._maxInstanceCount===void 0&&(re._maxInstanceCount=F.meshPerAttribute*F.count)}else for(let Ke=0;Ke<ge.locationSize;Ke++)T(ge.location+Ke);n.bindBuffer(n.ARRAY_BUFFER,Re);for(let Ke=0;Ke<ge.locationSize;Ke++)C(ge.location+Ke,ve/ge.locationSize,Ie,se,ve*ze,ve/ge.locationSize*Ke*ze,De)}}else if(oe!==void 0){const se=oe[me];if(se!==void 0)switch(se.length){case 2:n.vertexAttrib2fv(ge.location,se);break;case 3:n.vertexAttrib3fv(ge.location,se);break;case 4:n.vertexAttrib4fv(ge.location,se);break;default:n.vertexAttrib1fv(ge.location,se)}}}}R()}function y(){D();for(const L in o){const z=o[L];for(const W in z){const re=z[W];for(const ie in re)_(re[ie].object),delete re[ie];delete z[W]}delete o[L]}}function A(L){if(o[L.id]===void 0)return;const z=o[L.id];for(const W in z){const re=z[W];for(const ie in re)_(re[ie].object),delete re[ie];delete z[W]}delete o[L.id]}function U(L){for(const z in o){const W=o[z];if(W[L.id]===void 0)continue;const re=W[L.id];for(const ie in re)_(re[ie].object),delete re[ie];delete W[L.id]}}function D(){H(),u=!0,l!==c&&(l=c,m(l.object))}function H(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:f,reset:D,resetDefaultState:H,dispose:y,releaseStatesOfGeometry:A,releaseStatesOfProgram:U,initAttributes:x,enableAttribute:T,disableUnusedAttributes:R}}function qf(n,e,t,i){const r=i.isWebGL2;let s;function a(u){s=u}function o(u,f){n.drawArrays(s,u,f),t.update(f,s,1)}function c(u,f,d){if(d===0)return;let m,_;if(r)m=n,_="drawArraysInstanced";else if(m=e.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[_](s,u,f,d),t.update(f,s,d)}function l(u,f,d){if(d===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<d;_++)this.render(u[_],f[_]);else{m.multiDrawArraysWEBGL(s,u,0,f,0,d);let _=0;for(let g=0;g<d;g++)_+=f[g];t.update(_,s,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function Yf(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const c=s(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);const l=a||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),p=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),h=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),x=d>0,T=a||e.has("OES_texture_float"),P=x&&T,R=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:u,maxTextures:f,maxVertexTextures:d,maxTextureSize:m,maxCubemapSize:_,maxAttributes:g,maxVertexUniforms:p,maxVaryings:h,maxFragmentUniforms:S,vertexTextures:x,floatFragmentTextures:T,floatVertexTextures:P,maxSamples:R}}function Kf(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new An,o=new Je,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const m=f.length!==0||d||i!==0||r;return r=d,i=f.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,m){const _=f.clippingPlanes,g=f.clipIntersection,p=f.clipShadows,h=n.get(f);if(!r||_===null||_.length===0||s&&!p)s?u(null):l();else{const S=s?0:i,x=S*4;let T=h.clippingState||null;c.value=T,T=u(_,d,x,m);for(let P=0;P!==x;++P)T[P]=t[P];h.clippingState=T,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,d,m,_){const g=f!==null?f.length:0;let p=null;if(g!==0){if(p=c.value,_!==!0||p===null){const h=m+g*4,S=d.matrixWorldInverse;o.getNormalMatrix(S),(p===null||p.length<h)&&(p=new Float32Array(h));for(let x=0,T=m;x!==g;++x,T+=4)a.copy(f[x]).applyMatrix4(S,o),a.normal.toArray(p,T),p[T+3]=a.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,p}}function Zf(n){let e=new WeakMap;function t(a,o){return o===Xs?a.mapping=Ui:o===$s&&(a.mapping=Ni),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Xs||o===$s)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new ch(c.height/2);return l.fromEquirectangularTexture(n,a),e.set(a,l),a.addEventListener("dispose",r),t(l.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Kc extends jc{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ci=4,Ta=[.125,.215,.35,.446,.526,.582],Yn=20,Is=new Kc,wa=new Ye;let Us=null,Ns=0,Os=0;const $n=(1+Math.sqrt(5))/2,bi=1/$n,Aa=[new I(1,1,1),new I(-1,1,1),new I(1,1,-1),new I(-1,1,-1),new I(0,$n,bi),new I(0,$n,-bi),new I(bi,0,$n),new I(-bi,0,$n),new I($n,bi,0),new I(-$n,bi,0)];class Ra{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Us=this._renderer.getRenderTarget(),Ns=this._renderer.getActiveCubeFace(),Os=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pa(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=La(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Us,Ns,Os),e.scissorTest=!1,Lr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ui||e.mapping===Ni?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Us=this._renderer.getRenderTarget(),Ns=this._renderer.getActiveCubeFace(),Os=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Xt,minFilter:Xt,generateMipmaps:!1,type:ir,format:tn,colorSpace:yn,depthBuffer:!1},r=Ca(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ca(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Jf(s)),this._blurMaterial=Qf(s,e,t)}return r}_compileMaterial(e){const t=new Nt(this._lodPlanes[0],e);this._renderer.compile(t,Is)}_sceneToCubeUV(e,t,i,r){const o=new jt(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(wa),u.toneMapping=In,u.autoClear=!1;const m=new lo({name:"PMREM.Background",side:Ut,depthWrite:!1,depthTest:!1}),_=new Nt(new cr,m);let g=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,g=!0):(m.color.copy(wa),g=!0);for(let h=0;h<6;h++){const S=h%3;S===0?(o.up.set(0,c[h],0),o.lookAt(l[h],0,0)):S===1?(o.up.set(0,0,c[h]),o.lookAt(0,l[h],0)):(o.up.set(0,c[h],0),o.lookAt(0,0,l[h]));const x=this._cubeSize;Lr(r,S*x,h>2?x:0,x,x),u.setRenderTarget(r),g&&u.render(_,o),u.render(e,o)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=d,u.autoClear=f,e.background=p}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Ui||e.mapping===Ni;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pa()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=La());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Nt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;Lr(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,Is)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Aa[(r-1)%Aa.length];this._blur(e,r-1,r,s,a)}t.autoClear=i}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new Nt(this._lodPlanes[r],l),d=l.uniforms,m=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Yn-1),g=s/_,p=isFinite(s)?1+Math.floor(u*g):Yn;p>Yn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Yn}`);const h=[];let S=0;for(let C=0;C<Yn;++C){const Q=C/g,y=Math.exp(-Q*Q/2);h.push(y),C===0?S+=y:C<p&&(S+=2*y)}for(let C=0;C<h.length;C++)h[C]=h[C]/S;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=h,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:x}=this;d.dTheta.value=_,d.mipInt.value=x-i;const T=this._sizeLods[r],P=3*T*(r>x-Ci?r-x+Ci:0),R=4*(this._cubeSize-T);Lr(t,P,R,3*T,2*T),c.setRenderTarget(t),c.render(f,Is)}}function Jf(n){const e=[],t=[],i=[];let r=n;const s=n-Ci+1+Ta.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let c=1/o;a>n-Ci?c=Ta[a-n+Ci-1]:a===0&&(c=0),i.push(c);const l=1/(o-2),u=-l,f=1+l,d=[u,u,f,u,f,f,u,u,f,f,u,f],m=6,_=6,g=3,p=2,h=1,S=new Float32Array(g*_*m),x=new Float32Array(p*_*m),T=new Float32Array(h*_*m);for(let R=0;R<m;R++){const C=R%3*2/3-1,Q=R>2?0:-1,y=[C,Q,0,C+2/3,Q,0,C+2/3,Q+1,0,C,Q,0,C+2/3,Q+1,0,C,Q+1,0];S.set(y,g*_*R),x.set(d,p*_*R);const A=[R,R,R,R,R,R];T.set(A,h*_*R)}const P=new Gt;P.setAttribute("position",new nn(S,g)),P.setAttribute("uv",new nn(x,p)),P.setAttribute("faceIndex",new nn(T,h)),e.push(P),r>Ci&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Ca(n,e,t){const i=new ei(n,e,t);return i.texture.mapping=es,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Lr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Qf(n,e,t){const i=new Float32Array(Yn),r=new I(0,1,0);return new ni({name:"SphericalGaussianBlur",defines:{n:Yn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:fo(),fragmentShader:`

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
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function La(){return new ni({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fo(),fragmentShader:`

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
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function Pa(){return new ni({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function fo(){return`

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
	`}function ep(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const c=o.mapping,l=c===Xs||c===$s,u=c===Ui||c===Ni;if(l||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let f=e.get(o);return t===null&&(t=new Ra(n)),f=l?t.fromEquirectangular(o,f):t.fromCubemap(o,f),e.set(o,f),f.texture}else{if(e.has(o))return e.get(o).texture;{const f=o.image;if(l&&f&&f.height>0||u&&f&&r(f)){t===null&&(t=new Ra(n));const d=l?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",s),d.texture}else return null}}}return o}function r(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function s(o){const c=o.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function tp(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function np(n,e,t,i){const r={},s=new WeakMap;function a(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);for(const _ in d.morphAttributes){const g=d.morphAttributes[_];for(let p=0,h=g.length;p<h;p++)e.remove(g[p])}d.removeEventListener("dispose",a),delete r[d.id];const m=s.get(d);m&&(e.remove(m),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function c(f){const d=f.attributes;for(const _ in d)e.update(d[_],n.ARRAY_BUFFER);const m=f.morphAttributes;for(const _ in m){const g=m[_];for(let p=0,h=g.length;p<h;p++)e.update(g[p],n.ARRAY_BUFFER)}}function l(f){const d=[],m=f.index,_=f.attributes.position;let g=0;if(m!==null){const S=m.array;g=m.version;for(let x=0,T=S.length;x<T;x+=3){const P=S[x+0],R=S[x+1],C=S[x+2];d.push(P,R,R,C,C,P)}}else if(_!==void 0){const S=_.array;g=_.version;for(let x=0,T=S.length/3-1;x<T;x+=3){const P=x+0,R=x+1,C=x+2;d.push(P,R,R,C,C,P)}}else return;const p=new(zc(d)?Xc:Vc)(d,1);p.version=g;const h=s.get(f);h&&e.remove(h),s.set(f,p)}function u(f){const d=s.get(f);if(d){const m=f.index;m!==null&&d.version<m.version&&l(f)}else l(f);return s.get(f)}return{get:o,update:c,getWireframeAttribute:u}}function ip(n,e,t,i){const r=i.isWebGL2;let s;function a(m){s=m}let o,c;function l(m){o=m.type,c=m.bytesPerElement}function u(m,_){n.drawElements(s,_,o,m*c),t.update(_,s,1)}function f(m,_,g){if(g===0)return;let p,h;if(r)p=n,h="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),h="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[h](s,_,o,m*c,g),t.update(_,s,g)}function d(m,_,g){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let h=0;h<g;h++)this.render(m[h]/c,_[h]);else{p.multiDrawElementsWEBGL(s,_,0,o,m,0,g);let h=0;for(let S=0;S<g;S++)h+=_[S];t.update(h,s,1)}}this.setMode=a,this.setIndex=l,this.render=u,this.renderInstances=f,this.renderMultiDraw=d}function rp(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function sp(n,e){return n[0]-e[0]}function op(n,e){return Math.abs(e[1])-Math.abs(n[1])}function ap(n,e,t){const i={},r=new Float32Array(8),s=new WeakMap,a=new St,o=[];for(let l=0;l<8;l++)o[l]=[l,0];function c(l,u,f){const d=l.morphTargetInfluences;if(e.isWebGL2===!0){const _=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=_!==void 0?_.length:0;let p=s.get(u);if(p===void 0||p.count!==g){let z=function(){H.dispose(),s.delete(u),u.removeEventListener("dispose",z)};var m=z;p!==void 0&&p.texture.dispose();const x=u.morphAttributes.position!==void 0,T=u.morphAttributes.normal!==void 0,P=u.morphAttributes.color!==void 0,R=u.morphAttributes.position||[],C=u.morphAttributes.normal||[],Q=u.morphAttributes.color||[];let y=0;x===!0&&(y=1),T===!0&&(y=2),P===!0&&(y=3);let A=u.attributes.position.count*y,U=1;A>e.maxTextureSize&&(U=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const D=new Float32Array(A*U*4*g),H=new Gc(D,A,U,g);H.type=Ln,H.needsUpdate=!0;const L=y*4;for(let W=0;W<g;W++){const re=R[W],ie=C[W],J=Q[W],oe=A*U*4*W;for(let me=0;me<re.count;me++){const ge=me*L;x===!0&&(a.fromBufferAttribute(re,me),D[oe+ge+0]=a.x,D[oe+ge+1]=a.y,D[oe+ge+2]=a.z,D[oe+ge+3]=0),T===!0&&(a.fromBufferAttribute(ie,me),D[oe+ge+4]=a.x,D[oe+ge+5]=a.y,D[oe+ge+6]=a.z,D[oe+ge+7]=0),P===!0&&(a.fromBufferAttribute(J,me),D[oe+ge+8]=a.x,D[oe+ge+9]=a.y,D[oe+ge+10]=a.z,D[oe+ge+11]=J.itemSize===4?a.w:1)}}p={count:g,texture:H,size:new Ue(A,U)},s.set(u,p),u.addEventListener("dispose",z)}let h=0;for(let x=0;x<d.length;x++)h+=d[x];const S=u.morphTargetsRelative?1:1-h;f.getUniforms().setValue(n,"morphTargetBaseInfluence",S),f.getUniforms().setValue(n,"morphTargetInfluences",d),f.getUniforms().setValue(n,"morphTargetsTexture",p.texture,t),f.getUniforms().setValue(n,"morphTargetsTextureSize",p.size)}else{const _=d===void 0?0:d.length;let g=i[u.id];if(g===void 0||g.length!==_){g=[];for(let T=0;T<_;T++)g[T]=[T,0];i[u.id]=g}for(let T=0;T<_;T++){const P=g[T];P[0]=T,P[1]=d[T]}g.sort(op);for(let T=0;T<8;T++)T<_&&g[T][1]?(o[T][0]=g[T][0],o[T][1]=g[T][1]):(o[T][0]=Number.MAX_SAFE_INTEGER,o[T][1]=0);o.sort(sp);const p=u.morphAttributes.position,h=u.morphAttributes.normal;let S=0;for(let T=0;T<8;T++){const P=o[T],R=P[0],C=P[1];R!==Number.MAX_SAFE_INTEGER&&C?(p&&u.getAttribute("morphTarget"+T)!==p[R]&&u.setAttribute("morphTarget"+T,p[R]),h&&u.getAttribute("morphNormal"+T)!==h[R]&&u.setAttribute("morphNormal"+T,h[R]),r[T]=C,S+=C):(p&&u.hasAttribute("morphTarget"+T)===!0&&u.deleteAttribute("morphTarget"+T),h&&u.hasAttribute("morphNormal"+T)===!0&&u.deleteAttribute("morphNormal"+T),r[T]=0)}const x=u.morphTargetsRelative?1:1-S;f.getUniforms().setValue(n,"morphTargetBaseInfluence",x),f.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:c}}function cp(n,e,t,i){let r=new WeakMap;function s(c){const l=i.render.frame,u=c.geometry,f=e.get(c,u);if(r.get(f)!==l&&(e.update(f),r.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==l&&(d.update(),r.set(d,l))}return f}function a(){r=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:a}}class Zc extends Ot{constructor(e,t,i,r,s,a,o,c,l,u){if(u=u!==void 0?u:Zn,u!==Zn&&u!==Oi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Zn&&(i=Cn),i===void 0&&u===Oi&&(i=Kn),super(null,r,s,a,o,c,u,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Pt,this.minFilter=c!==void 0?c:Pt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Jc=new Ot,Qc=new Zc(1,1);Qc.compareFunction=Bc;const el=new Gc,tl=new Xu,nl=new qc,Da=[],Ia=[],Ua=new Float32Array(16),Na=new Float32Array(9),Oa=new Float32Array(4);function zi(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Da[r];if(s===void 0&&(s=new Float32Array(r),Da[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function _t(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function vt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function is(n,e){let t=Ia[e];t===void 0&&(t=new Int32Array(e),Ia[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function lp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function up(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;n.uniform2fv(this.addr,e),vt(t,e)}}function hp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(_t(t,e))return;n.uniform3fv(this.addr,e),vt(t,e)}}function dp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;n.uniform4fv(this.addr,e),vt(t,e)}}function fp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(_t(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),vt(t,e)}else{if(_t(t,i))return;Oa.set(i),n.uniformMatrix2fv(this.addr,!1,Oa),vt(t,i)}}function pp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(_t(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),vt(t,e)}else{if(_t(t,i))return;Na.set(i),n.uniformMatrix3fv(this.addr,!1,Na),vt(t,i)}}function mp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(_t(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),vt(t,e)}else{if(_t(t,i))return;Ua.set(i),n.uniformMatrix4fv(this.addr,!1,Ua),vt(t,i)}}function gp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function _p(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;n.uniform2iv(this.addr,e),vt(t,e)}}function vp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;n.uniform3iv(this.addr,e),vt(t,e)}}function xp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;n.uniform4iv(this.addr,e),vt(t,e)}}function yp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Mp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;n.uniform2uiv(this.addr,e),vt(t,e)}}function Ep(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;n.uniform3uiv(this.addr,e),vt(t,e)}}function Sp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;n.uniform4uiv(this.addr,e),vt(t,e)}}function bp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);const s=this.type===n.SAMPLER_2D_SHADOW?Qc:Jc;t.setTexture2D(e||s,r)}function Tp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||tl,r)}function wp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||nl,r)}function Ap(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||el,r)}function Rp(n){switch(n){case 5126:return lp;case 35664:return up;case 35665:return hp;case 35666:return dp;case 35674:return fp;case 35675:return pp;case 35676:return mp;case 5124:case 35670:return gp;case 35667:case 35671:return _p;case 35668:case 35672:return vp;case 35669:case 35673:return xp;case 5125:return yp;case 36294:return Mp;case 36295:return Ep;case 36296:return Sp;case 35678:case 36198:case 36298:case 36306:case 35682:return bp;case 35679:case 36299:case 36307:return Tp;case 35680:case 36300:case 36308:case 36293:return wp;case 36289:case 36303:case 36311:case 36292:return Ap}}function Cp(n,e){n.uniform1fv(this.addr,e)}function Lp(n,e){const t=zi(e,this.size,2);n.uniform2fv(this.addr,t)}function Pp(n,e){const t=zi(e,this.size,3);n.uniform3fv(this.addr,t)}function Dp(n,e){const t=zi(e,this.size,4);n.uniform4fv(this.addr,t)}function Ip(n,e){const t=zi(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Up(n,e){const t=zi(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Np(n,e){const t=zi(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Op(n,e){n.uniform1iv(this.addr,e)}function Fp(n,e){n.uniform2iv(this.addr,e)}function Bp(n,e){n.uniform3iv(this.addr,e)}function zp(n,e){n.uniform4iv(this.addr,e)}function kp(n,e){n.uniform1uiv(this.addr,e)}function Hp(n,e){n.uniform2uiv(this.addr,e)}function Gp(n,e){n.uniform3uiv(this.addr,e)}function Wp(n,e){n.uniform4uiv(this.addr,e)}function Vp(n,e,t){const i=this.cache,r=e.length,s=is(t,r);_t(i,s)||(n.uniform1iv(this.addr,s),vt(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Jc,s[a])}function Xp(n,e,t){const i=this.cache,r=e.length,s=is(t,r);_t(i,s)||(n.uniform1iv(this.addr,s),vt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||tl,s[a])}function $p(n,e,t){const i=this.cache,r=e.length,s=is(t,r);_t(i,s)||(n.uniform1iv(this.addr,s),vt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||nl,s[a])}function jp(n,e,t){const i=this.cache,r=e.length,s=is(t,r);_t(i,s)||(n.uniform1iv(this.addr,s),vt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||el,s[a])}function qp(n){switch(n){case 5126:return Cp;case 35664:return Lp;case 35665:return Pp;case 35666:return Dp;case 35674:return Ip;case 35675:return Up;case 35676:return Np;case 5124:case 35670:return Op;case 35667:case 35671:return Fp;case 35668:case 35672:return Bp;case 35669:case 35673:return zp;case 5125:return kp;case 36294:return Hp;case 36295:return Gp;case 36296:return Wp;case 35678:case 36198:case 36298:case 36306:case 35682:return Vp;case 35679:case 36299:case 36307:return Xp;case 35680:case 36300:case 36308:case 36293:return $p;case 36289:case 36303:case 36311:case 36292:return jp}}class Yp{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Rp(t.type)}}class Kp{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=qp(t.type)}}class Zp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Fs=/(\w+)(\])?(\[|\.)?/g;function Fa(n,e){n.seq.push(e),n.map[e.id]=e}function Jp(n,e,t){const i=n.name,r=i.length;for(Fs.lastIndex=0;;){const s=Fs.exec(i),a=Fs.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){Fa(t,l===void 0?new Yp(o,n,e):new Kp(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new Zp(o),Fa(t,f)),t=f}}}class Gr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);Jp(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Ba(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Qp=37297;let em=0;function tm(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function nm(n){const e=ot.getPrimaries(ot.workingColorSpace),t=ot.getPrimaries(n);let i;switch(e===t?i="":e===jr&&t===$r?i="LinearDisplayP3ToLinearSRGB":e===$r&&t===jr&&(i="LinearSRGBToLinearDisplayP3"),n){case yn:case ts:return[i,"LinearTransferOETF"];case Mt:case oo:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function za(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+tm(n.getShaderSource(e),a)}else return r}function im(n,e){const t=nm(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function rm(n,e){let t;switch(e){case nu:t="Linear";break;case iu:t="Reinhard";break;case ru:t="OptimizedCineon";break;case Ac:t="ACESFilmic";break;case ou:t="AgX";break;case su:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function sm(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Li).join(`
`)}function om(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Li).join(`
`)}function am(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function cm(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Li(n){return n!==""}function ka(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ha(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const lm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Js(n){return n.replace(lm,hm)}const um=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function hm(n,e){let t=je[e];if(t===void 0){const i=um.get(e);if(i!==void 0)t=je[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Js(t)}const dm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ga(n){return n.replace(dm,fm)}function fm(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Wa(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function pm(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Tc?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Ll?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===mn&&(e="SHADOWMAP_TYPE_VSM"),e}function mm(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ui:case Ni:e="ENVMAP_TYPE_CUBE";break;case es:e="ENVMAP_TYPE_CUBE_UV";break}return e}function gm(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Ni:e="ENVMAP_MODE_REFRACTION";break}return e}function _m(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case wc:e="ENVMAP_BLENDING_MULTIPLY";break;case eu:e="ENVMAP_BLENDING_MIX";break;case tu:e="ENVMAP_BLENDING_ADD";break}return e}function vm(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function xm(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=pm(t),l=mm(t),u=gm(t),f=_m(t),d=vm(t),m=t.isWebGL2?"":sm(t),_=om(t),g=am(s),p=r.createProgram();let h,S,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Li).join(`
`),h.length>0&&(h+=`
`),S=[m,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Li).join(`
`),S.length>0&&(S+=`
`)):(h=[Wa(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Li).join(`
`),S=[m,Wa(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==In?"#define TONE_MAPPING":"",t.toneMapping!==In?je.tonemapping_pars_fragment:"",t.toneMapping!==In?rm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,im("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Li).join(`
`)),a=Js(a),a=ka(a,t),a=Ha(a,t),o=Js(o),o=ka(o,t),o=Ha(o,t),a=Ga(a),o=Ga(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,h=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+h,S=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===aa?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===aa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const T=x+h+a,P=x+S+o,R=Ba(r,r.VERTEX_SHADER,T),C=Ba(r,r.FRAGMENT_SHADER,P);r.attachShader(p,R),r.attachShader(p,C),t.index0AttributeName!==void 0?r.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(p,0,"position"),r.linkProgram(p);function Q(D){if(n.debug.checkShaderErrors){const H=r.getProgramInfoLog(p).trim(),L=r.getShaderInfoLog(R).trim(),z=r.getShaderInfoLog(C).trim();let W=!0,re=!0;if(r.getProgramParameter(p,r.LINK_STATUS)===!1)if(W=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,p,R,C);else{const ie=za(r,R,"vertex"),J=za(r,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(p,r.VALIDATE_STATUS)+`

Program Info Log: `+H+`
`+ie+`
`+J)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(L===""||z==="")&&(re=!1);re&&(D.diagnostics={runnable:W,programLog:H,vertexShader:{log:L,prefix:h},fragmentShader:{log:z,prefix:S}})}r.deleteShader(R),r.deleteShader(C),y=new Gr(r,p),A=cm(r,p)}let y;this.getUniforms=function(){return y===void 0&&Q(this),y};let A;this.getAttributes=function(){return A===void 0&&Q(this),A};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=r.getProgramParameter(p,Qp)),U},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=em++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=R,this.fragmentShader=C,this}let ym=0;class Mm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Em(e),t.set(e,i)),i}}class Em{constructor(e){this.id=ym++,this.code=e,this.usedTimes=0}}function Sm(n,e,t,i,r,s,a){const o=new co,c=new Mm,l=[],u=r.isWebGL2,f=r.logarithmicDepthBuffer,d=r.vertexTextures;let m=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return y===0?"uv":`uv${y}`}function p(y,A,U,D,H){const L=D.fog,z=H.geometry,W=y.isMeshStandardMaterial?D.environment:null,re=(y.isMeshStandardMaterial?t:e).get(y.envMap||W),ie=re&&re.mapping===es?re.image.height:null,J=_[y.type];y.precision!==null&&(m=r.getMaxPrecision(y.precision),m!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",m,"instead."));const oe=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,me=oe!==void 0?oe.length:0;let ge=0;z.morphAttributes.position!==void 0&&(ge=1),z.morphAttributes.normal!==void 0&&(ge=2),z.morphAttributes.color!==void 0&&(ge=3);let F,se,ve,Te;if(J){const Qe=sn[J];F=Qe.vertexShader,se=Qe.fragmentShader}else F=y.vertexShader,se=y.fragmentShader,c.update(y),ve=c.getVertexShaderID(y),Te=c.getFragmentShaderID(y);const Re=n.getRenderTarget(),Ie=H.isInstancedMesh===!0,ze=H.isBatchedMesh===!0,De=!!y.map,Ke=!!y.matcap,G=!!re,mt=!!y.aoMap,Le=!!y.lightMap,Be=!!y.bumpMap,be=!!y.normalMap,rt=!!y.displacementMap,He=!!y.emissiveMap,b=!!y.metalnessMap,v=!!y.roughnessMap,k=y.anisotropy>0,de=y.clearcoat>0,le=y.iridescence>0,fe=y.sheen>0,Ae=y.transmission>0,Me=k&&!!y.anisotropyMap,Se=de&&!!y.clearcoatMap,Pe=de&&!!y.clearcoatNormalMap,Ge=de&&!!y.clearcoatRoughnessMap,ue=le&&!!y.iridescenceMap,nt=le&&!!y.iridescenceThicknessMap,We=fe&&!!y.sheenColorMap,N=fe&&!!y.sheenRoughnessMap,B=!!y.specularMap,V=!!y.specularColorMap,M=!!y.specularIntensityMap,q=Ae&&!!y.transmissionMap,ae=Ae&&!!y.thicknessMap,ee=!!y.gradientMap,Y=!!y.alphaMap,w=y.alphaTest>0,ne=!!y.alphaHash,te=!!y.extensions,K=!!z.attributes.uv1,he=!!z.attributes.uv2,ye=!!z.attributes.uv3;let we=In;return y.toneMapped&&(Re===null||Re.isXRRenderTarget===!0)&&(we=n.toneMapping),{isWebGL2:u,shaderID:J,shaderType:y.type,shaderName:y.name,vertexShader:F,fragmentShader:se,defines:y.defines,customVertexShaderID:ve,customFragmentShaderID:Te,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:m,batching:ze,instancing:Ie,instancingColor:Ie&&H.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:Re===null?n.outputColorSpace:Re.isXRRenderTarget===!0?Re.texture.colorSpace:yn,map:De,matcap:Ke,envMap:G,envMapMode:G&&re.mapping,envMapCubeUVHeight:ie,aoMap:mt,lightMap:Le,bumpMap:Be,normalMap:be,displacementMap:d&&rt,emissiveMap:He,normalMapObjectSpace:be&&y.normalMapType===vu,normalMapTangentSpace:be&&y.normalMapType===Fc,metalnessMap:b,roughnessMap:v,anisotropy:k,anisotropyMap:Me,clearcoat:de,clearcoatMap:Se,clearcoatNormalMap:Pe,clearcoatRoughnessMap:Ge,iridescence:le,iridescenceMap:ue,iridescenceThicknessMap:nt,sheen:fe,sheenColorMap:We,sheenRoughnessMap:N,specularMap:B,specularColorMap:V,specularIntensityMap:M,transmission:Ae,transmissionMap:q,thicknessMap:ae,gradientMap:ee,opaque:y.transparent===!1&&y.blending===Pi,alphaMap:Y,alphaTest:w,alphaHash:ne,combine:y.combine,mapUv:De&&g(y.map.channel),aoMapUv:mt&&g(y.aoMap.channel),lightMapUv:Le&&g(y.lightMap.channel),bumpMapUv:Be&&g(y.bumpMap.channel),normalMapUv:be&&g(y.normalMap.channel),displacementMapUv:rt&&g(y.displacementMap.channel),emissiveMapUv:He&&g(y.emissiveMap.channel),metalnessMapUv:b&&g(y.metalnessMap.channel),roughnessMapUv:v&&g(y.roughnessMap.channel),anisotropyMapUv:Me&&g(y.anisotropyMap.channel),clearcoatMapUv:Se&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:Pe&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ge&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ue&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:nt&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:We&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:N&&g(y.sheenRoughnessMap.channel),specularMapUv:B&&g(y.specularMap.channel),specularColorMapUv:V&&g(y.specularColorMap.channel),specularIntensityMapUv:M&&g(y.specularIntensityMap.channel),transmissionMapUv:q&&g(y.transmissionMap.channel),thicknessMapUv:ae&&g(y.thicknessMap.channel),alphaMapUv:Y&&g(y.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(be||k),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,vertexUv1s:K,vertexUv2s:he,vertexUv3s:ye,pointsUvs:H.isPoints===!0&&!!z.attributes.uv&&(De||Y),fog:!!L,useFog:y.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:H.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:me,morphTextureStride:ge,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&U.length>0,shadowMapType:n.shadowMap.type,toneMapping:we,useLegacyLights:n._useLegacyLights,decodeVideoTexture:De&&y.map.isVideoTexture===!0&&ot.getTransfer(y.map.colorSpace)===at,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===gn,flipSided:y.side===Ut,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:te&&y.extensions.derivatives===!0,extensionFragDepth:te&&y.extensions.fragDepth===!0,extensionDrawBuffers:te&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:te&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:te&&y.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function h(y){const A=[];if(y.shaderID?A.push(y.shaderID):(A.push(y.customVertexShaderID),A.push(y.customFragmentShaderID)),y.defines!==void 0)for(const U in y.defines)A.push(U),A.push(y.defines[U]);return y.isRawShaderMaterial===!1&&(S(A,y),x(A,y),A.push(n.outputColorSpace)),A.push(y.customProgramCacheKey),A.join()}function S(y,A){y.push(A.precision),y.push(A.outputColorSpace),y.push(A.envMapMode),y.push(A.envMapCubeUVHeight),y.push(A.mapUv),y.push(A.alphaMapUv),y.push(A.lightMapUv),y.push(A.aoMapUv),y.push(A.bumpMapUv),y.push(A.normalMapUv),y.push(A.displacementMapUv),y.push(A.emissiveMapUv),y.push(A.metalnessMapUv),y.push(A.roughnessMapUv),y.push(A.anisotropyMapUv),y.push(A.clearcoatMapUv),y.push(A.clearcoatNormalMapUv),y.push(A.clearcoatRoughnessMapUv),y.push(A.iridescenceMapUv),y.push(A.iridescenceThicknessMapUv),y.push(A.sheenColorMapUv),y.push(A.sheenRoughnessMapUv),y.push(A.specularMapUv),y.push(A.specularColorMapUv),y.push(A.specularIntensityMapUv),y.push(A.transmissionMapUv),y.push(A.thicknessMapUv),y.push(A.combine),y.push(A.fogExp2),y.push(A.sizeAttenuation),y.push(A.morphTargetsCount),y.push(A.morphAttributeCount),y.push(A.numDirLights),y.push(A.numPointLights),y.push(A.numSpotLights),y.push(A.numSpotLightMaps),y.push(A.numHemiLights),y.push(A.numRectAreaLights),y.push(A.numDirLightShadows),y.push(A.numPointLightShadows),y.push(A.numSpotLightShadows),y.push(A.numSpotLightShadowsWithMaps),y.push(A.numLightProbes),y.push(A.shadowMapType),y.push(A.toneMapping),y.push(A.numClippingPlanes),y.push(A.numClipIntersection),y.push(A.depthPacking)}function x(y,A){o.disableAll(),A.isWebGL2&&o.enable(0),A.supportsVertexTextures&&o.enable(1),A.instancing&&o.enable(2),A.instancingColor&&o.enable(3),A.matcap&&o.enable(4),A.envMap&&o.enable(5),A.normalMapObjectSpace&&o.enable(6),A.normalMapTangentSpace&&o.enable(7),A.clearcoat&&o.enable(8),A.iridescence&&o.enable(9),A.alphaTest&&o.enable(10),A.vertexColors&&o.enable(11),A.vertexAlphas&&o.enable(12),A.vertexUv1s&&o.enable(13),A.vertexUv2s&&o.enable(14),A.vertexUv3s&&o.enable(15),A.vertexTangents&&o.enable(16),A.anisotropy&&o.enable(17),A.alphaHash&&o.enable(18),A.batching&&o.enable(19),y.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.skinning&&o.enable(4),A.morphTargets&&o.enable(5),A.morphNormals&&o.enable(6),A.morphColors&&o.enable(7),A.premultipliedAlpha&&o.enable(8),A.shadowMapEnabled&&o.enable(9),A.useLegacyLights&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),y.push(o.mask)}function T(y){const A=_[y.type];let U;if(A){const D=sn[A];U=rh.clone(D.uniforms)}else U=y.uniforms;return U}function P(y,A){let U;for(let D=0,H=l.length;D<H;D++){const L=l[D];if(L.cacheKey===A){U=L,++U.usedTimes;break}}return U===void 0&&(U=new xm(n,A,y,s),l.push(U)),U}function R(y){if(--y.usedTimes===0){const A=l.indexOf(y);l[A]=l[l.length-1],l.pop(),y.destroy()}}function C(y){c.remove(y)}function Q(){c.dispose()}return{getParameters:p,getProgramCacheKey:h,getUniforms:T,acquireProgram:P,releaseProgram:R,releaseShaderCache:C,programs:l,dispose:Q}}function bm(){let n=new WeakMap;function e(s){let a=n.get(s);return a===void 0&&(a={},n.set(s,a)),a}function t(s){n.delete(s)}function i(s,a,o){n.get(s)[a]=o}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function Tm(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Va(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Xa(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(f,d,m,_,g,p){let h=n[e];return h===void 0?(h={id:f.id,object:f,geometry:d,material:m,groupOrder:_,renderOrder:f.renderOrder,z:g,group:p},n[e]=h):(h.id=f.id,h.object=f,h.geometry=d,h.material=m,h.groupOrder=_,h.renderOrder=f.renderOrder,h.z=g,h.group=p),e++,h}function o(f,d,m,_,g,p){const h=a(f,d,m,_,g,p);m.transmission>0?i.push(h):m.transparent===!0?r.push(h):t.push(h)}function c(f,d,m,_,g,p){const h=a(f,d,m,_,g,p);m.transmission>0?i.unshift(h):m.transparent===!0?r.unshift(h):t.unshift(h)}function l(f,d){t.length>1&&t.sort(f||Tm),i.length>1&&i.sort(d||Va),r.length>1&&r.sort(d||Va)}function u(){for(let f=e,d=n.length;f<d;f++){const m=n[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:c,finish:u,sort:l}}function wm(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Xa,n.set(i,[a])):r>=s.length?(a=new Xa,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Am(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new Ye};break;case"SpotLight":t={position:new I,direction:new I,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new I,halfWidth:new I,halfHeight:new I};break}return n[e.id]=t,t}}}function Rm(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Cm=0;function Lm(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Pm(n,e){const t=new Am,i=Rm(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new I);const s=new I,a=new ht,o=new ht;function c(u,f){let d=0,m=0,_=0;for(let D=0;D<9;D++)r.probe[D].set(0,0,0);let g=0,p=0,h=0,S=0,x=0,T=0,P=0,R=0,C=0,Q=0,y=0;u.sort(Lm);const A=f===!0?Math.PI:1;for(let D=0,H=u.length;D<H;D++){const L=u[D],z=L.color,W=L.intensity,re=L.distance,ie=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)d+=z.r*W*A,m+=z.g*W*A,_+=z.b*W*A;else if(L.isLightProbe){for(let J=0;J<9;J++)r.probe[J].addScaledVector(L.sh.coefficients[J],W);y++}else if(L.isDirectionalLight){const J=t.get(L);if(J.color.copy(L.color).multiplyScalar(L.intensity*A),L.castShadow){const oe=L.shadow,me=i.get(L);me.shadowBias=oe.bias,me.shadowNormalBias=oe.normalBias,me.shadowRadius=oe.radius,me.shadowMapSize=oe.mapSize,r.directionalShadow[g]=me,r.directionalShadowMap[g]=ie,r.directionalShadowMatrix[g]=L.shadow.matrix,T++}r.directional[g]=J,g++}else if(L.isSpotLight){const J=t.get(L);J.position.setFromMatrixPosition(L.matrixWorld),J.color.copy(z).multiplyScalar(W*A),J.distance=re,J.coneCos=Math.cos(L.angle),J.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),J.decay=L.decay,r.spot[h]=J;const oe=L.shadow;if(L.map&&(r.spotLightMap[C]=L.map,C++,oe.updateMatrices(L),L.castShadow&&Q++),r.spotLightMatrix[h]=oe.matrix,L.castShadow){const me=i.get(L);me.shadowBias=oe.bias,me.shadowNormalBias=oe.normalBias,me.shadowRadius=oe.radius,me.shadowMapSize=oe.mapSize,r.spotShadow[h]=me,r.spotShadowMap[h]=ie,R++}h++}else if(L.isRectAreaLight){const J=t.get(L);J.color.copy(z).multiplyScalar(W),J.halfWidth.set(L.width*.5,0,0),J.halfHeight.set(0,L.height*.5,0),r.rectArea[S]=J,S++}else if(L.isPointLight){const J=t.get(L);if(J.color.copy(L.color).multiplyScalar(L.intensity*A),J.distance=L.distance,J.decay=L.decay,L.castShadow){const oe=L.shadow,me=i.get(L);me.shadowBias=oe.bias,me.shadowNormalBias=oe.normalBias,me.shadowRadius=oe.radius,me.shadowMapSize=oe.mapSize,me.shadowCameraNear=oe.camera.near,me.shadowCameraFar=oe.camera.far,r.pointShadow[p]=me,r.pointShadowMap[p]=ie,r.pointShadowMatrix[p]=L.shadow.matrix,P++}r.point[p]=J,p++}else if(L.isHemisphereLight){const J=t.get(L);J.skyColor.copy(L.color).multiplyScalar(W*A),J.groundColor.copy(L.groundColor).multiplyScalar(W*A),r.hemi[x]=J,x++}}S>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=xe.LTC_FLOAT_1,r.rectAreaLTC2=xe.LTC_FLOAT_2):(r.rectAreaLTC1=xe.LTC_HALF_1,r.rectAreaLTC2=xe.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=xe.LTC_FLOAT_1,r.rectAreaLTC2=xe.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=xe.LTC_HALF_1,r.rectAreaLTC2=xe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=m,r.ambient[2]=_;const U=r.hash;(U.directionalLength!==g||U.pointLength!==p||U.spotLength!==h||U.rectAreaLength!==S||U.hemiLength!==x||U.numDirectionalShadows!==T||U.numPointShadows!==P||U.numSpotShadows!==R||U.numSpotMaps!==C||U.numLightProbes!==y)&&(r.directional.length=g,r.spot.length=h,r.rectArea.length=S,r.point.length=p,r.hemi.length=x,r.directionalShadow.length=T,r.directionalShadowMap.length=T,r.pointShadow.length=P,r.pointShadowMap.length=P,r.spotShadow.length=R,r.spotShadowMap.length=R,r.directionalShadowMatrix.length=T,r.pointShadowMatrix.length=P,r.spotLightMatrix.length=R+C-Q,r.spotLightMap.length=C,r.numSpotLightShadowsWithMaps=Q,r.numLightProbes=y,U.directionalLength=g,U.pointLength=p,U.spotLength=h,U.rectAreaLength=S,U.hemiLength=x,U.numDirectionalShadows=T,U.numPointShadows=P,U.numSpotShadows=R,U.numSpotMaps=C,U.numLightProbes=y,r.version=Cm++)}function l(u,f){let d=0,m=0,_=0,g=0,p=0;const h=f.matrixWorldInverse;for(let S=0,x=u.length;S<x;S++){const T=u[S];if(T.isDirectionalLight){const P=r.directional[d];P.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(h),d++}else if(T.isSpotLight){const P=r.spot[_];P.position.setFromMatrixPosition(T.matrixWorld),P.position.applyMatrix4(h),P.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(h),_++}else if(T.isRectAreaLight){const P=r.rectArea[g];P.position.setFromMatrixPosition(T.matrixWorld),P.position.applyMatrix4(h),o.identity(),a.copy(T.matrixWorld),a.premultiply(h),o.extractRotation(a),P.halfWidth.set(T.width*.5,0,0),P.halfHeight.set(0,T.height*.5,0),P.halfWidth.applyMatrix4(o),P.halfHeight.applyMatrix4(o),g++}else if(T.isPointLight){const P=r.point[m];P.position.setFromMatrixPosition(T.matrixWorld),P.position.applyMatrix4(h),m++}else if(T.isHemisphereLight){const P=r.hemi[p];P.direction.setFromMatrixPosition(T.matrixWorld),P.direction.transformDirection(h),p++}}}return{setup:c,setupView:l,state:r}}function $a(n,e){const t=new Pm(n,e),i=[],r=[];function s(){i.length=0,r.length=0}function a(f){i.push(f)}function o(f){r.push(f)}function c(f){t.setup(i,f)}function l(f){t.setupView(i,f)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function Dm(n,e){let t=new WeakMap;function i(s,a=0){const o=t.get(s);let c;return o===void 0?(c=new $a(n,e),t.set(s,[c])):a>=o.length?(c=new $a(n,e),o.push(c)):c=o[a],c}function r(){t=new WeakMap}return{get:i,dispose:r}}class Im extends On{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=gu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Um extends On{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Nm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Om=`uniform sampler2D shadow_pass;
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
}`;function Fm(n,e,t){let i=new uo;const r=new Ue,s=new Ue,a=new St,o=new Im({depthPacking:_u}),c=new Um,l={},u=t.maxTextureSize,f={[Nn]:Ut,[Ut]:Nn,[gn]:gn},d=new ni({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ue},radius:{value:4}},vertexShader:Nm,fragmentShader:Om}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const _=new Gt;_.setAttribute("position",new nn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Nt(_,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Tc;let h=this.type;this.render=function(R,C,Q){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||R.length===0)return;const y=n.getRenderTarget(),A=n.getActiveCubeFace(),U=n.getActiveMipmapLevel(),D=n.state;D.setBlending(Dn),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const H=h!==mn&&this.type===mn,L=h===mn&&this.type!==mn;for(let z=0,W=R.length;z<W;z++){const re=R[z],ie=re.shadow;if(ie===void 0){console.warn("THREE.WebGLShadowMap:",re,"has no shadow.");continue}if(ie.autoUpdate===!1&&ie.needsUpdate===!1)continue;r.copy(ie.mapSize);const J=ie.getFrameExtents();if(r.multiply(J),s.copy(ie.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/J.x),r.x=s.x*J.x,ie.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/J.y),r.y=s.y*J.y,ie.mapSize.y=s.y)),ie.map===null||H===!0||L===!0){const me=this.type!==mn?{minFilter:Pt,magFilter:Pt}:{};ie.map!==null&&ie.map.dispose(),ie.map=new ei(r.x,r.y,me),ie.map.texture.name=re.name+".shadowMap",ie.camera.updateProjectionMatrix()}n.setRenderTarget(ie.map),n.clear();const oe=ie.getViewportCount();for(let me=0;me<oe;me++){const ge=ie.getViewport(me);a.set(s.x*ge.x,s.y*ge.y,s.x*ge.z,s.y*ge.w),D.viewport(a),ie.updateMatrices(re,me),i=ie.getFrustum(),T(C,Q,ie.camera,re,this.type)}ie.isPointLightShadow!==!0&&this.type===mn&&S(ie,Q),ie.needsUpdate=!1}h=this.type,p.needsUpdate=!1,n.setRenderTarget(y,A,U)};function S(R,C){const Q=e.update(g);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new ei(r.x,r.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(C,null,Q,d,g,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value=R.mapSize,m.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(C,null,Q,m,g,null)}function x(R,C,Q,y){let A=null;const U=Q.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(U!==void 0)A=U;else if(A=Q.isPointLight===!0?c:o,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const D=A.uuid,H=C.uuid;let L=l[D];L===void 0&&(L={},l[D]=L);let z=L[H];z===void 0&&(z=A.clone(),L[H]=z,C.addEventListener("dispose",P)),A=z}if(A.visible=C.visible,A.wireframe=C.wireframe,y===mn?A.side=C.shadowSide!==null?C.shadowSide:C.side:A.side=C.shadowSide!==null?C.shadowSide:f[C.side],A.alphaMap=C.alphaMap,A.alphaTest=C.alphaTest,A.map=C.map,A.clipShadows=C.clipShadows,A.clippingPlanes=C.clippingPlanes,A.clipIntersection=C.clipIntersection,A.displacementMap=C.displacementMap,A.displacementScale=C.displacementScale,A.displacementBias=C.displacementBias,A.wireframeLinewidth=C.wireframeLinewidth,A.linewidth=C.linewidth,Q.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const D=n.properties.get(A);D.light=Q}return A}function T(R,C,Q,y,A){if(R.visible===!1)return;if(R.layers.test(C.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&A===mn)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,R.matrixWorld);const H=e.update(R),L=R.material;if(Array.isArray(L)){const z=H.groups;for(let W=0,re=z.length;W<re;W++){const ie=z[W],J=L[ie.materialIndex];if(J&&J.visible){const oe=x(R,J,y,A);R.onBeforeShadow(n,R,C,Q,H,oe,ie),n.renderBufferDirect(Q,null,H,oe,R,ie),R.onAfterShadow(n,R,C,Q,H,oe,ie)}}}else if(L.visible){const z=x(R,L,y,A);R.onBeforeShadow(n,R,C,Q,H,z,null),n.renderBufferDirect(Q,null,H,z,R,null),R.onAfterShadow(n,R,C,Q,H,z,null)}}const D=R.children;for(let H=0,L=D.length;H<L;H++)T(D[H],C,Q,y,A)}function P(R){R.target.removeEventListener("dispose",P);for(const Q in l){const y=l[Q],A=R.target.uuid;A in y&&(y[A].dispose(),delete y[A])}}}function Bm(n,e,t){const i=t.isWebGL2;function r(){let w=!1;const ne=new St;let te=null;const K=new St(0,0,0,0);return{setMask:function(he){te!==he&&!w&&(n.colorMask(he,he,he,he),te=he)},setLocked:function(he){w=he},setClear:function(he,ye,we,tt,Qe){Qe===!0&&(he*=tt,ye*=tt,we*=tt),ne.set(he,ye,we,tt),K.equals(ne)===!1&&(n.clearColor(he,ye,we,tt),K.copy(ne))},reset:function(){w=!1,te=null,K.set(-1,0,0,0)}}}function s(){let w=!1,ne=null,te=null,K=null;return{setTest:function(he){he?ze(n.DEPTH_TEST):De(n.DEPTH_TEST)},setMask:function(he){ne!==he&&!w&&(n.depthMask(he),ne=he)},setFunc:function(he){if(te!==he){switch(he){case jl:n.depthFunc(n.NEVER);break;case ql:n.depthFunc(n.ALWAYS);break;case Yl:n.depthFunc(n.LESS);break;case Vr:n.depthFunc(n.LEQUAL);break;case Kl:n.depthFunc(n.EQUAL);break;case Zl:n.depthFunc(n.GEQUAL);break;case Jl:n.depthFunc(n.GREATER);break;case Ql:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}te=he}},setLocked:function(he){w=he},setClear:function(he){K!==he&&(n.clearDepth(he),K=he)},reset:function(){w=!1,ne=null,te=null,K=null}}}function a(){let w=!1,ne=null,te=null,K=null,he=null,ye=null,we=null,tt=null,Qe=null;return{setTest:function(Ne){w||(Ne?ze(n.STENCIL_TEST):De(n.STENCIL_TEST))},setMask:function(Ne){ne!==Ne&&!w&&(n.stencilMask(Ne),ne=Ne)},setFunc:function(Ne,it,gt){(te!==Ne||K!==it||he!==gt)&&(n.stencilFunc(Ne,it,gt),te=Ne,K=it,he=gt)},setOp:function(Ne,it,gt){(ye!==Ne||we!==it||tt!==gt)&&(n.stencilOp(Ne,it,gt),ye=Ne,we=it,tt=gt)},setLocked:function(Ne){w=Ne},setClear:function(Ne){Qe!==Ne&&(n.clearStencil(Ne),Qe=Ne)},reset:function(){w=!1,ne=null,te=null,K=null,he=null,ye=null,we=null,tt=null,Qe=null}}}const o=new r,c=new s,l=new a,u=new WeakMap,f=new WeakMap;let d={},m={},_=new WeakMap,g=[],p=null,h=!1,S=null,x=null,T=null,P=null,R=null,C=null,Q=null,y=new Ye(0,0,0),A=0,U=!1,D=null,H=null,L=null,z=null,W=null;const re=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ie=!1,J=0;const oe=n.getParameter(n.VERSION);oe.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(oe)[1]),ie=J>=1):oe.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(oe)[1]),ie=J>=2);let me=null,ge={};const F=n.getParameter(n.SCISSOR_BOX),se=n.getParameter(n.VIEWPORT),ve=new St().fromArray(F),Te=new St().fromArray(se);function Re(w,ne,te,K){const he=new Uint8Array(4),ye=n.createTexture();n.bindTexture(w,ye),n.texParameteri(w,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(w,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let we=0;we<te;we++)i&&(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)?n.texImage3D(ne,0,n.RGBA,1,1,K,0,n.RGBA,n.UNSIGNED_BYTE,he):n.texImage2D(ne+we,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,he);return ye}const Ie={};Ie[n.TEXTURE_2D]=Re(n.TEXTURE_2D,n.TEXTURE_2D,1),Ie[n.TEXTURE_CUBE_MAP]=Re(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Ie[n.TEXTURE_2D_ARRAY]=Re(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Ie[n.TEXTURE_3D]=Re(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),l.setClear(0),ze(n.DEPTH_TEST),c.setFunc(Vr),He(!1),b(Ro),ze(n.CULL_FACE),be(Dn);function ze(w){d[w]!==!0&&(n.enable(w),d[w]=!0)}function De(w){d[w]!==!1&&(n.disable(w),d[w]=!1)}function Ke(w,ne){return m[w]!==ne?(n.bindFramebuffer(w,ne),m[w]=ne,i&&(w===n.DRAW_FRAMEBUFFER&&(m[n.FRAMEBUFFER]=ne),w===n.FRAMEBUFFER&&(m[n.DRAW_FRAMEBUFFER]=ne)),!0):!1}function G(w,ne){let te=g,K=!1;if(w)if(te=_.get(ne),te===void 0&&(te=[],_.set(ne,te)),w.isWebGLMultipleRenderTargets){const he=w.texture;if(te.length!==he.length||te[0]!==n.COLOR_ATTACHMENT0){for(let ye=0,we=he.length;ye<we;ye++)te[ye]=n.COLOR_ATTACHMENT0+ye;te.length=he.length,K=!0}}else te[0]!==n.COLOR_ATTACHMENT0&&(te[0]=n.COLOR_ATTACHMENT0,K=!0);else te[0]!==n.BACK&&(te[0]=n.BACK,K=!0);K&&(t.isWebGL2?n.drawBuffers(te):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(te))}function mt(w){return p!==w?(n.useProgram(w),p=w,!0):!1}const Le={[qn]:n.FUNC_ADD,[Dl]:n.FUNC_SUBTRACT,[Il]:n.FUNC_REVERSE_SUBTRACT};if(i)Le[Do]=n.MIN,Le[Io]=n.MAX;else{const w=e.get("EXT_blend_minmax");w!==null&&(Le[Do]=w.MIN_EXT,Le[Io]=w.MAX_EXT)}const Be={[Ul]:n.ZERO,[Nl]:n.ONE,[Ol]:n.SRC_COLOR,[Ws]:n.SRC_ALPHA,[Gl]:n.SRC_ALPHA_SATURATE,[kl]:n.DST_COLOR,[Bl]:n.DST_ALPHA,[Fl]:n.ONE_MINUS_SRC_COLOR,[Vs]:n.ONE_MINUS_SRC_ALPHA,[Hl]:n.ONE_MINUS_DST_COLOR,[zl]:n.ONE_MINUS_DST_ALPHA,[Wl]:n.CONSTANT_COLOR,[Vl]:n.ONE_MINUS_CONSTANT_COLOR,[Xl]:n.CONSTANT_ALPHA,[$l]:n.ONE_MINUS_CONSTANT_ALPHA};function be(w,ne,te,K,he,ye,we,tt,Qe,Ne){if(w===Dn){h===!0&&(De(n.BLEND),h=!1);return}if(h===!1&&(ze(n.BLEND),h=!0),w!==Pl){if(w!==S||Ne!==U){if((x!==qn||R!==qn)&&(n.blendEquation(n.FUNC_ADD),x=qn,R=qn),Ne)switch(w){case Pi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Co:n.blendFunc(n.ONE,n.ONE);break;case Lo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Po:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",w);break}else switch(w){case Pi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Co:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Lo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Po:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",w);break}T=null,P=null,C=null,Q=null,y.set(0,0,0),A=0,S=w,U=Ne}return}he=he||ne,ye=ye||te,we=we||K,(ne!==x||he!==R)&&(n.blendEquationSeparate(Le[ne],Le[he]),x=ne,R=he),(te!==T||K!==P||ye!==C||we!==Q)&&(n.blendFuncSeparate(Be[te],Be[K],Be[ye],Be[we]),T=te,P=K,C=ye,Q=we),(tt.equals(y)===!1||Qe!==A)&&(n.blendColor(tt.r,tt.g,tt.b,Qe),y.copy(tt),A=Qe),S=w,U=!1}function rt(w,ne){w.side===gn?De(n.CULL_FACE):ze(n.CULL_FACE);let te=w.side===Ut;ne&&(te=!te),He(te),w.blending===Pi&&w.transparent===!1?be(Dn):be(w.blending,w.blendEquation,w.blendSrc,w.blendDst,w.blendEquationAlpha,w.blendSrcAlpha,w.blendDstAlpha,w.blendColor,w.blendAlpha,w.premultipliedAlpha),c.setFunc(w.depthFunc),c.setTest(w.depthTest),c.setMask(w.depthWrite),o.setMask(w.colorWrite);const K=w.stencilWrite;l.setTest(K),K&&(l.setMask(w.stencilWriteMask),l.setFunc(w.stencilFunc,w.stencilRef,w.stencilFuncMask),l.setOp(w.stencilFail,w.stencilZFail,w.stencilZPass)),k(w.polygonOffset,w.polygonOffsetFactor,w.polygonOffsetUnits),w.alphaToCoverage===!0?ze(n.SAMPLE_ALPHA_TO_COVERAGE):De(n.SAMPLE_ALPHA_TO_COVERAGE)}function He(w){D!==w&&(w?n.frontFace(n.CW):n.frontFace(n.CCW),D=w)}function b(w){w!==Rl?(ze(n.CULL_FACE),w!==H&&(w===Ro?n.cullFace(n.BACK):w===Cl?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):De(n.CULL_FACE),H=w}function v(w){w!==L&&(ie&&n.lineWidth(w),L=w)}function k(w,ne,te){w?(ze(n.POLYGON_OFFSET_FILL),(z!==ne||W!==te)&&(n.polygonOffset(ne,te),z=ne,W=te)):De(n.POLYGON_OFFSET_FILL)}function de(w){w?ze(n.SCISSOR_TEST):De(n.SCISSOR_TEST)}function le(w){w===void 0&&(w=n.TEXTURE0+re-1),me!==w&&(n.activeTexture(w),me=w)}function fe(w,ne,te){te===void 0&&(me===null?te=n.TEXTURE0+re-1:te=me);let K=ge[te];K===void 0&&(K={type:void 0,texture:void 0},ge[te]=K),(K.type!==w||K.texture!==ne)&&(me!==te&&(n.activeTexture(te),me=te),n.bindTexture(w,ne||Ie[w]),K.type=w,K.texture=ne)}function Ae(){const w=ge[me];w!==void 0&&w.type!==void 0&&(n.bindTexture(w.type,null),w.type=void 0,w.texture=void 0)}function Me(){try{n.compressedTexImage2D.apply(n,arguments)}catch(w){console.error("THREE.WebGLState:",w)}}function Se(){try{n.compressedTexImage3D.apply(n,arguments)}catch(w){console.error("THREE.WebGLState:",w)}}function Pe(){try{n.texSubImage2D.apply(n,arguments)}catch(w){console.error("THREE.WebGLState:",w)}}function Ge(){try{n.texSubImage3D.apply(n,arguments)}catch(w){console.error("THREE.WebGLState:",w)}}function ue(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(w){console.error("THREE.WebGLState:",w)}}function nt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(w){console.error("THREE.WebGLState:",w)}}function We(){try{n.texStorage2D.apply(n,arguments)}catch(w){console.error("THREE.WebGLState:",w)}}function N(){try{n.texStorage3D.apply(n,arguments)}catch(w){console.error("THREE.WebGLState:",w)}}function B(){try{n.texImage2D.apply(n,arguments)}catch(w){console.error("THREE.WebGLState:",w)}}function V(){try{n.texImage3D.apply(n,arguments)}catch(w){console.error("THREE.WebGLState:",w)}}function M(w){ve.equals(w)===!1&&(n.scissor(w.x,w.y,w.z,w.w),ve.copy(w))}function q(w){Te.equals(w)===!1&&(n.viewport(w.x,w.y,w.z,w.w),Te.copy(w))}function ae(w,ne){let te=f.get(ne);te===void 0&&(te=new WeakMap,f.set(ne,te));let K=te.get(w);K===void 0&&(K=n.getUniformBlockIndex(ne,w.name),te.set(w,K))}function ee(w,ne){const K=f.get(ne).get(w);u.get(ne)!==K&&(n.uniformBlockBinding(ne,K,w.__bindingPointIndex),u.set(ne,K))}function Y(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},me=null,ge={},m={},_=new WeakMap,g=[],p=null,h=!1,S=null,x=null,T=null,P=null,R=null,C=null,Q=null,y=new Ye(0,0,0),A=0,U=!1,D=null,H=null,L=null,z=null,W=null,ve.set(0,0,n.canvas.width,n.canvas.height),Te.set(0,0,n.canvas.width,n.canvas.height),o.reset(),c.reset(),l.reset()}return{buffers:{color:o,depth:c,stencil:l},enable:ze,disable:De,bindFramebuffer:Ke,drawBuffers:G,useProgram:mt,setBlending:be,setMaterial:rt,setFlipSided:He,setCullFace:b,setLineWidth:v,setPolygonOffset:k,setScissorTest:de,activeTexture:le,bindTexture:fe,unbindTexture:Ae,compressedTexImage2D:Me,compressedTexImage3D:Se,texImage2D:B,texImage3D:V,updateUBOMapping:ae,uniformBlockBinding:ee,texStorage2D:We,texStorage3D:N,texSubImage2D:Pe,texSubImage3D:Ge,compressedTexSubImage2D:ue,compressedTexSubImage3D:nt,scissor:M,viewport:q,reset:Y}}function zm(n,e,t,i,r,s,a){const o=r.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let f;const d=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(b,v){return m?new OffscreenCanvas(b,v):Kr("canvas")}function g(b,v,k,de){let le=1;if((b.width>de||b.height>de)&&(le=de/Math.max(b.width,b.height)),le<1||v===!0)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap){const fe=v?Yr:Math.floor,Ae=fe(le*b.width),Me=fe(le*b.height);f===void 0&&(f=_(Ae,Me));const Se=k?_(Ae,Me):f;return Se.width=Ae,Se.height=Me,Se.getContext("2d").drawImage(b,0,0,Ae,Me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+b.width+"x"+b.height+") to ("+Ae+"x"+Me+")."),Se}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+b.width+"x"+b.height+")."),b;return b}function p(b){return Zs(b.width)&&Zs(b.height)}function h(b){return o?!1:b.wrapS!==en||b.wrapT!==en||b.minFilter!==Pt&&b.minFilter!==Xt}function S(b,v){return b.generateMipmaps&&v&&b.minFilter!==Pt&&b.minFilter!==Xt}function x(b){n.generateMipmap(b)}function T(b,v,k,de,le=!1){if(o===!1)return v;if(b!==null){if(n[b]!==void 0)return n[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let fe=v;if(v===n.RED&&(k===n.FLOAT&&(fe=n.R32F),k===n.HALF_FLOAT&&(fe=n.R16F),k===n.UNSIGNED_BYTE&&(fe=n.R8)),v===n.RED_INTEGER&&(k===n.UNSIGNED_BYTE&&(fe=n.R8UI),k===n.UNSIGNED_SHORT&&(fe=n.R16UI),k===n.UNSIGNED_INT&&(fe=n.R32UI),k===n.BYTE&&(fe=n.R8I),k===n.SHORT&&(fe=n.R16I),k===n.INT&&(fe=n.R32I)),v===n.RG&&(k===n.FLOAT&&(fe=n.RG32F),k===n.HALF_FLOAT&&(fe=n.RG16F),k===n.UNSIGNED_BYTE&&(fe=n.RG8)),v===n.RGBA){const Ae=le?Xr:ot.getTransfer(de);k===n.FLOAT&&(fe=n.RGBA32F),k===n.HALF_FLOAT&&(fe=n.RGBA16F),k===n.UNSIGNED_BYTE&&(fe=Ae===at?n.SRGB8_ALPHA8:n.RGBA8),k===n.UNSIGNED_SHORT_4_4_4_4&&(fe=n.RGBA4),k===n.UNSIGNED_SHORT_5_5_5_1&&(fe=n.RGB5_A1)}return(fe===n.R16F||fe===n.R32F||fe===n.RG16F||fe===n.RG32F||fe===n.RGBA16F||fe===n.RGBA32F)&&e.get("EXT_color_buffer_float"),fe}function P(b,v,k){return S(b,k)===!0||b.isFramebufferTexture&&b.minFilter!==Pt&&b.minFilter!==Xt?Math.log2(Math.max(v.width,v.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?v.mipmaps.length:1}function R(b){return b===Pt||b===Uo||b===us?n.NEAREST:n.LINEAR}function C(b){const v=b.target;v.removeEventListener("dispose",C),y(v),v.isVideoTexture&&u.delete(v)}function Q(b){const v=b.target;v.removeEventListener("dispose",Q),U(v)}function y(b){const v=i.get(b);if(v.__webglInit===void 0)return;const k=b.source,de=d.get(k);if(de){const le=de[v.__cacheKey];le.usedTimes--,le.usedTimes===0&&A(b),Object.keys(de).length===0&&d.delete(k)}i.remove(b)}function A(b){const v=i.get(b);n.deleteTexture(v.__webglTexture);const k=b.source,de=d.get(k);delete de[v.__cacheKey],a.memory.textures--}function U(b){const v=b.texture,k=i.get(b),de=i.get(v);if(de.__webglTexture!==void 0&&(n.deleteTexture(de.__webglTexture),a.memory.textures--),b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let le=0;le<6;le++){if(Array.isArray(k.__webglFramebuffer[le]))for(let fe=0;fe<k.__webglFramebuffer[le].length;fe++)n.deleteFramebuffer(k.__webglFramebuffer[le][fe]);else n.deleteFramebuffer(k.__webglFramebuffer[le]);k.__webglDepthbuffer&&n.deleteRenderbuffer(k.__webglDepthbuffer[le])}else{if(Array.isArray(k.__webglFramebuffer))for(let le=0;le<k.__webglFramebuffer.length;le++)n.deleteFramebuffer(k.__webglFramebuffer[le]);else n.deleteFramebuffer(k.__webglFramebuffer);if(k.__webglDepthbuffer&&n.deleteRenderbuffer(k.__webglDepthbuffer),k.__webglMultisampledFramebuffer&&n.deleteFramebuffer(k.__webglMultisampledFramebuffer),k.__webglColorRenderbuffer)for(let le=0;le<k.__webglColorRenderbuffer.length;le++)k.__webglColorRenderbuffer[le]&&n.deleteRenderbuffer(k.__webglColorRenderbuffer[le]);k.__webglDepthRenderbuffer&&n.deleteRenderbuffer(k.__webglDepthRenderbuffer)}if(b.isWebGLMultipleRenderTargets)for(let le=0,fe=v.length;le<fe;le++){const Ae=i.get(v[le]);Ae.__webglTexture&&(n.deleteTexture(Ae.__webglTexture),a.memory.textures--),i.remove(v[le])}i.remove(v),i.remove(b)}let D=0;function H(){D=0}function L(){const b=D;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),D+=1,b}function z(b){const v=[];return v.push(b.wrapS),v.push(b.wrapT),v.push(b.wrapR||0),v.push(b.magFilter),v.push(b.minFilter),v.push(b.anisotropy),v.push(b.internalFormat),v.push(b.format),v.push(b.type),v.push(b.generateMipmaps),v.push(b.premultiplyAlpha),v.push(b.flipY),v.push(b.unpackAlignment),v.push(b.colorSpace),v.join()}function W(b,v){const k=i.get(b);if(b.isVideoTexture&&rt(b),b.isRenderTargetTexture===!1&&b.version>0&&k.__version!==b.version){const de=b.image;if(de===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(de.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ve(k,b,v);return}}t.bindTexture(n.TEXTURE_2D,k.__webglTexture,n.TEXTURE0+v)}function re(b,v){const k=i.get(b);if(b.version>0&&k.__version!==b.version){ve(k,b,v);return}t.bindTexture(n.TEXTURE_2D_ARRAY,k.__webglTexture,n.TEXTURE0+v)}function ie(b,v){const k=i.get(b);if(b.version>0&&k.__version!==b.version){ve(k,b,v);return}t.bindTexture(n.TEXTURE_3D,k.__webglTexture,n.TEXTURE0+v)}function J(b,v){const k=i.get(b);if(b.version>0&&k.__version!==b.version){Te(k,b,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture,n.TEXTURE0+v)}const oe={[js]:n.REPEAT,[en]:n.CLAMP_TO_EDGE,[qs]:n.MIRRORED_REPEAT},me={[Pt]:n.NEAREST,[Uo]:n.NEAREST_MIPMAP_NEAREST,[us]:n.NEAREST_MIPMAP_LINEAR,[Xt]:n.LINEAR,[au]:n.LINEAR_MIPMAP_NEAREST,[nr]:n.LINEAR_MIPMAP_LINEAR},ge={[xu]:n.NEVER,[Tu]:n.ALWAYS,[yu]:n.LESS,[Bc]:n.LEQUAL,[Mu]:n.EQUAL,[bu]:n.GEQUAL,[Eu]:n.GREATER,[Su]:n.NOTEQUAL};function F(b,v,k){if(k?(n.texParameteri(b,n.TEXTURE_WRAP_S,oe[v.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,oe[v.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,oe[v.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,me[v.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,me[v.minFilter])):(n.texParameteri(b,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(b,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(v.wrapS!==en||v.wrapT!==en)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(b,n.TEXTURE_MAG_FILTER,R(v.magFilter)),n.texParameteri(b,n.TEXTURE_MIN_FILTER,R(v.minFilter)),v.minFilter!==Pt&&v.minFilter!==Xt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),v.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,ge[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const de=e.get("EXT_texture_filter_anisotropic");if(v.magFilter===Pt||v.minFilter!==us&&v.minFilter!==nr||v.type===Ln&&e.has("OES_texture_float_linear")===!1||o===!1&&v.type===ir&&e.has("OES_texture_half_float_linear")===!1)return;(v.anisotropy>1||i.get(v).__currentAnisotropy)&&(n.texParameterf(b,de.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy)}}function se(b,v){let k=!1;b.__webglInit===void 0&&(b.__webglInit=!0,v.addEventListener("dispose",C));const de=v.source;let le=d.get(de);le===void 0&&(le={},d.set(de,le));const fe=z(v);if(fe!==b.__cacheKey){le[fe]===void 0&&(le[fe]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,k=!0),le[fe].usedTimes++;const Ae=le[b.__cacheKey];Ae!==void 0&&(le[b.__cacheKey].usedTimes--,Ae.usedTimes===0&&A(v)),b.__cacheKey=fe,b.__webglTexture=le[fe].texture}return k}function ve(b,v,k){let de=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(de=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(de=n.TEXTURE_3D);const le=se(b,v),fe=v.source;t.bindTexture(de,b.__webglTexture,n.TEXTURE0+k);const Ae=i.get(fe);if(fe.version!==Ae.__version||le===!0){t.activeTexture(n.TEXTURE0+k);const Me=ot.getPrimaries(ot.workingColorSpace),Se=v.colorSpace===Yt?null:ot.getPrimaries(v.colorSpace),Pe=v.colorSpace===Yt||Me===Se?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);const Ge=h(v)&&p(v.image)===!1;let ue=g(v.image,Ge,!1,r.maxTextureSize);ue=He(v,ue);const nt=p(ue)||o,We=s.convert(v.format,v.colorSpace);let N=s.convert(v.type),B=T(v.internalFormat,We,N,v.colorSpace,v.isVideoTexture);F(de,v,nt);let V;const M=v.mipmaps,q=o&&v.isVideoTexture!==!0&&B!==Nc,ae=Ae.__version===void 0||le===!0,ee=P(v,ue,nt);if(v.isDepthTexture)B=n.DEPTH_COMPONENT,o?v.type===Ln?B=n.DEPTH_COMPONENT32F:v.type===Cn?B=n.DEPTH_COMPONENT24:v.type===Kn?B=n.DEPTH24_STENCIL8:B=n.DEPTH_COMPONENT16:v.type===Ln&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),v.format===Zn&&B===n.DEPTH_COMPONENT&&v.type!==so&&v.type!==Cn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),v.type=Cn,N=s.convert(v.type)),v.format===Oi&&B===n.DEPTH_COMPONENT&&(B=n.DEPTH_STENCIL,v.type!==Kn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),v.type=Kn,N=s.convert(v.type))),ae&&(q?t.texStorage2D(n.TEXTURE_2D,1,B,ue.width,ue.height):t.texImage2D(n.TEXTURE_2D,0,B,ue.width,ue.height,0,We,N,null));else if(v.isDataTexture)if(M.length>0&&nt){q&&ae&&t.texStorage2D(n.TEXTURE_2D,ee,B,M[0].width,M[0].height);for(let Y=0,w=M.length;Y<w;Y++)V=M[Y],q?t.texSubImage2D(n.TEXTURE_2D,Y,0,0,V.width,V.height,We,N,V.data):t.texImage2D(n.TEXTURE_2D,Y,B,V.width,V.height,0,We,N,V.data);v.generateMipmaps=!1}else q?(ae&&t.texStorage2D(n.TEXTURE_2D,ee,B,ue.width,ue.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,ue.width,ue.height,We,N,ue.data)):t.texImage2D(n.TEXTURE_2D,0,B,ue.width,ue.height,0,We,N,ue.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){q&&ae&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ee,B,M[0].width,M[0].height,ue.depth);for(let Y=0,w=M.length;Y<w;Y++)V=M[Y],v.format!==tn?We!==null?q?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,0,V.width,V.height,ue.depth,We,V.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Y,B,V.width,V.height,ue.depth,0,V.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):q?t.texSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,0,V.width,V.height,ue.depth,We,N,V.data):t.texImage3D(n.TEXTURE_2D_ARRAY,Y,B,V.width,V.height,ue.depth,0,We,N,V.data)}else{q&&ae&&t.texStorage2D(n.TEXTURE_2D,ee,B,M[0].width,M[0].height);for(let Y=0,w=M.length;Y<w;Y++)V=M[Y],v.format!==tn?We!==null?q?t.compressedTexSubImage2D(n.TEXTURE_2D,Y,0,0,V.width,V.height,We,V.data):t.compressedTexImage2D(n.TEXTURE_2D,Y,B,V.width,V.height,0,V.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):q?t.texSubImage2D(n.TEXTURE_2D,Y,0,0,V.width,V.height,We,N,V.data):t.texImage2D(n.TEXTURE_2D,Y,B,V.width,V.height,0,We,N,V.data)}else if(v.isDataArrayTexture)q?(ae&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ee,B,ue.width,ue.height,ue.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,We,N,ue.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,B,ue.width,ue.height,ue.depth,0,We,N,ue.data);else if(v.isData3DTexture)q?(ae&&t.texStorage3D(n.TEXTURE_3D,ee,B,ue.width,ue.height,ue.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,We,N,ue.data)):t.texImage3D(n.TEXTURE_3D,0,B,ue.width,ue.height,ue.depth,0,We,N,ue.data);else if(v.isFramebufferTexture){if(ae)if(q)t.texStorage2D(n.TEXTURE_2D,ee,B,ue.width,ue.height);else{let Y=ue.width,w=ue.height;for(let ne=0;ne<ee;ne++)t.texImage2D(n.TEXTURE_2D,ne,B,Y,w,0,We,N,null),Y>>=1,w>>=1}}else if(M.length>0&&nt){q&&ae&&t.texStorage2D(n.TEXTURE_2D,ee,B,M[0].width,M[0].height);for(let Y=0,w=M.length;Y<w;Y++)V=M[Y],q?t.texSubImage2D(n.TEXTURE_2D,Y,0,0,We,N,V):t.texImage2D(n.TEXTURE_2D,Y,B,We,N,V);v.generateMipmaps=!1}else q?(ae&&t.texStorage2D(n.TEXTURE_2D,ee,B,ue.width,ue.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,We,N,ue)):t.texImage2D(n.TEXTURE_2D,0,B,We,N,ue);S(v,nt)&&x(de),Ae.__version=fe.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function Te(b,v,k){if(v.image.length!==6)return;const de=se(b,v),le=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+k);const fe=i.get(le);if(le.version!==fe.__version||de===!0){t.activeTexture(n.TEXTURE0+k);const Ae=ot.getPrimaries(ot.workingColorSpace),Me=v.colorSpace===Yt?null:ot.getPrimaries(v.colorSpace),Se=v.colorSpace===Yt||Ae===Me?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);const Pe=v.isCompressedTexture||v.image[0].isCompressedTexture,Ge=v.image[0]&&v.image[0].isDataTexture,ue=[];for(let Y=0;Y<6;Y++)!Pe&&!Ge?ue[Y]=g(v.image[Y],!1,!0,r.maxCubemapSize):ue[Y]=Ge?v.image[Y].image:v.image[Y],ue[Y]=He(v,ue[Y]);const nt=ue[0],We=p(nt)||o,N=s.convert(v.format,v.colorSpace),B=s.convert(v.type),V=T(v.internalFormat,N,B,v.colorSpace),M=o&&v.isVideoTexture!==!0,q=fe.__version===void 0||de===!0;let ae=P(v,nt,We);F(n.TEXTURE_CUBE_MAP,v,We);let ee;if(Pe){M&&q&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ae,V,nt.width,nt.height);for(let Y=0;Y<6;Y++){ee=ue[Y].mipmaps;for(let w=0;w<ee.length;w++){const ne=ee[w];v.format!==tn?N!==null?M?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,w,0,0,ne.width,ne.height,N,ne.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,w,V,ne.width,ne.height,0,ne.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):M?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,w,0,0,ne.width,ne.height,N,B,ne.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,w,V,ne.width,ne.height,0,N,B,ne.data)}}}else{ee=v.mipmaps,M&&q&&(ee.length>0&&ae++,t.texStorage2D(n.TEXTURE_CUBE_MAP,ae,V,ue[0].width,ue[0].height));for(let Y=0;Y<6;Y++)if(Ge){M?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,ue[Y].width,ue[Y].height,N,B,ue[Y].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,V,ue[Y].width,ue[Y].height,0,N,B,ue[Y].data);for(let w=0;w<ee.length;w++){const te=ee[w].image[Y].image;M?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,w+1,0,0,te.width,te.height,N,B,te.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,w+1,V,te.width,te.height,0,N,B,te.data)}}else{M?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,N,B,ue[Y]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,V,N,B,ue[Y]);for(let w=0;w<ee.length;w++){const ne=ee[w];M?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,w+1,0,0,N,B,ne.image[Y]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,w+1,V,N,B,ne.image[Y])}}}S(v,We)&&x(n.TEXTURE_CUBE_MAP),fe.__version=le.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function Re(b,v,k,de,le,fe){const Ae=s.convert(k.format,k.colorSpace),Me=s.convert(k.type),Se=T(k.internalFormat,Ae,Me,k.colorSpace);if(!i.get(v).__hasExternalTextures){const Ge=Math.max(1,v.width>>fe),ue=Math.max(1,v.height>>fe);le===n.TEXTURE_3D||le===n.TEXTURE_2D_ARRAY?t.texImage3D(le,fe,Se,Ge,ue,v.depth,0,Ae,Me,null):t.texImage2D(le,fe,Se,Ge,ue,0,Ae,Me,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),be(v)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,de,le,i.get(k).__webglTexture,0,Be(v)):(le===n.TEXTURE_2D||le>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&le<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,de,le,i.get(k).__webglTexture,fe),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ie(b,v,k){if(n.bindRenderbuffer(n.RENDERBUFFER,b),v.depthBuffer&&!v.stencilBuffer){let de=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(k||be(v)){const le=v.depthTexture;le&&le.isDepthTexture&&(le.type===Ln?de=n.DEPTH_COMPONENT32F:le.type===Cn&&(de=n.DEPTH_COMPONENT24));const fe=Be(v);be(v)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,fe,de,v.width,v.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,fe,de,v.width,v.height)}else n.renderbufferStorage(n.RENDERBUFFER,de,v.width,v.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,b)}else if(v.depthBuffer&&v.stencilBuffer){const de=Be(v);k&&be(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,de,n.DEPTH24_STENCIL8,v.width,v.height):be(v)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,de,n.DEPTH24_STENCIL8,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,b)}else{const de=v.isWebGLMultipleRenderTargets===!0?v.texture:[v.texture];for(let le=0;le<de.length;le++){const fe=de[le],Ae=s.convert(fe.format,fe.colorSpace),Me=s.convert(fe.type),Se=T(fe.internalFormat,Ae,Me,fe.colorSpace),Pe=Be(v);k&&be(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Pe,Se,v.width,v.height):be(v)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Pe,Se,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,Se,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ze(b,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),W(v.depthTexture,0);const de=i.get(v.depthTexture).__webglTexture,le=Be(v);if(v.depthTexture.format===Zn)be(v)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,de,0,le):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,de,0);else if(v.depthTexture.format===Oi)be(v)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,de,0,le):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,de,0);else throw new Error("Unknown depthTexture format")}function De(b){const v=i.get(b),k=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!v.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");ze(v.__webglFramebuffer,b)}else if(k){v.__webglDepthbuffer=[];for(let de=0;de<6;de++)t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[de]),v.__webglDepthbuffer[de]=n.createRenderbuffer(),Ie(v.__webglDepthbuffer[de],b,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer=n.createRenderbuffer(),Ie(v.__webglDepthbuffer,b,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ke(b,v,k){const de=i.get(b);v!==void 0&&Re(de.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),k!==void 0&&De(b)}function G(b){const v=b.texture,k=i.get(b),de=i.get(v);b.addEventListener("dispose",Q),b.isWebGLMultipleRenderTargets!==!0&&(de.__webglTexture===void 0&&(de.__webglTexture=n.createTexture()),de.__version=v.version,a.memory.textures++);const le=b.isWebGLCubeRenderTarget===!0,fe=b.isWebGLMultipleRenderTargets===!0,Ae=p(b)||o;if(le){k.__webglFramebuffer=[];for(let Me=0;Me<6;Me++)if(o&&v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer[Me]=[];for(let Se=0;Se<v.mipmaps.length;Se++)k.__webglFramebuffer[Me][Se]=n.createFramebuffer()}else k.__webglFramebuffer[Me]=n.createFramebuffer()}else{if(o&&v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer=[];for(let Me=0;Me<v.mipmaps.length;Me++)k.__webglFramebuffer[Me]=n.createFramebuffer()}else k.__webglFramebuffer=n.createFramebuffer();if(fe)if(r.drawBuffers){const Me=b.texture;for(let Se=0,Pe=Me.length;Se<Pe;Se++){const Ge=i.get(Me[Se]);Ge.__webglTexture===void 0&&(Ge.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&b.samples>0&&be(b)===!1){const Me=fe?v:[v];k.__webglMultisampledFramebuffer=n.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let Se=0;Se<Me.length;Se++){const Pe=Me[Se];k.__webglColorRenderbuffer[Se]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,k.__webglColorRenderbuffer[Se]);const Ge=s.convert(Pe.format,Pe.colorSpace),ue=s.convert(Pe.type),nt=T(Pe.internalFormat,Ge,ue,Pe.colorSpace,b.isXRRenderTarget===!0),We=Be(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,We,nt,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.RENDERBUFFER,k.__webglColorRenderbuffer[Se])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(k.__webglDepthRenderbuffer=n.createRenderbuffer(),Ie(k.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(le){t.bindTexture(n.TEXTURE_CUBE_MAP,de.__webglTexture),F(n.TEXTURE_CUBE_MAP,v,Ae);for(let Me=0;Me<6;Me++)if(o&&v.mipmaps&&v.mipmaps.length>0)for(let Se=0;Se<v.mipmaps.length;Se++)Re(k.__webglFramebuffer[Me][Se],b,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Se);else Re(k.__webglFramebuffer[Me],b,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0);S(v,Ae)&&x(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(fe){const Me=b.texture;for(let Se=0,Pe=Me.length;Se<Pe;Se++){const Ge=Me[Se],ue=i.get(Ge);t.bindTexture(n.TEXTURE_2D,ue.__webglTexture),F(n.TEXTURE_2D,Ge,Ae),Re(k.__webglFramebuffer,b,Ge,n.COLOR_ATTACHMENT0+Se,n.TEXTURE_2D,0),S(Ge,Ae)&&x(n.TEXTURE_2D)}t.unbindTexture()}else{let Me=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(o?Me=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(Me,de.__webglTexture),F(Me,v,Ae),o&&v.mipmaps&&v.mipmaps.length>0)for(let Se=0;Se<v.mipmaps.length;Se++)Re(k.__webglFramebuffer[Se],b,v,n.COLOR_ATTACHMENT0,Me,Se);else Re(k.__webglFramebuffer,b,v,n.COLOR_ATTACHMENT0,Me,0);S(v,Ae)&&x(Me),t.unbindTexture()}b.depthBuffer&&De(b)}function mt(b){const v=p(b)||o,k=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let de=0,le=k.length;de<le;de++){const fe=k[de];if(S(fe,v)){const Ae=b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,Me=i.get(fe).__webglTexture;t.bindTexture(Ae,Me),x(Ae),t.unbindTexture()}}}function Le(b){if(o&&b.samples>0&&be(b)===!1){const v=b.isWebGLMultipleRenderTargets?b.texture:[b.texture],k=b.width,de=b.height;let le=n.COLOR_BUFFER_BIT;const fe=[],Ae=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Me=i.get(b),Se=b.isWebGLMultipleRenderTargets===!0;if(Se)for(let Pe=0;Pe<v.length;Pe++)t.bindFramebuffer(n.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Me.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let Pe=0;Pe<v.length;Pe++){fe.push(n.COLOR_ATTACHMENT0+Pe),b.depthBuffer&&fe.push(Ae);const Ge=Me.__ignoreDepthValues!==void 0?Me.__ignoreDepthValues:!1;if(Ge===!1&&(b.depthBuffer&&(le|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&(le|=n.STENCIL_BUFFER_BIT)),Se&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Me.__webglColorRenderbuffer[Pe]),Ge===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[Ae]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[Ae])),Se){const ue=i.get(v[Pe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ue,0)}n.blitFramebuffer(0,0,k,de,0,0,k,de,le,n.NEAREST),l&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,fe)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Se)for(let Pe=0;Pe<v.length;Pe++){t.bindFramebuffer(n.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.RENDERBUFFER,Me.__webglColorRenderbuffer[Pe]);const Ge=i.get(v[Pe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Me.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.TEXTURE_2D,Ge,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}}function Be(b){return Math.min(r.maxSamples,b.samples)}function be(b){const v=i.get(b);return o&&b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function rt(b){const v=a.render.frame;u.get(b)!==v&&(u.set(b,v),b.update())}function He(b,v){const k=b.colorSpace,de=b.format,le=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||b.format===Ks||k!==yn&&k!==Yt&&(ot.getTransfer(k)===at?o===!1?e.has("EXT_sRGB")===!0&&de===tn?(b.format=Ks,b.minFilter=Xt,b.generateMipmaps=!1):v=kc.sRGBToLinear(v):(de!==tn||le!==Un)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),v}this.allocateTextureUnit=L,this.resetTextureUnits=H,this.setTexture2D=W,this.setTexture2DArray=re,this.setTexture3D=ie,this.setTextureCube=J,this.rebindTextures=Ke,this.setupRenderTarget=G,this.updateRenderTargetMipmap=mt,this.updateMultisampleRenderTarget=Le,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=Re,this.useMultisampledRTT=be}function km(n,e,t){const i=t.isWebGL2;function r(s,a=Yt){let o;const c=ot.getTransfer(a);if(s===Un)return n.UNSIGNED_BYTE;if(s===Lc)return n.UNSIGNED_SHORT_4_4_4_4;if(s===Pc)return n.UNSIGNED_SHORT_5_5_5_1;if(s===cu)return n.BYTE;if(s===lu)return n.SHORT;if(s===so)return n.UNSIGNED_SHORT;if(s===Cc)return n.INT;if(s===Cn)return n.UNSIGNED_INT;if(s===Ln)return n.FLOAT;if(s===ir)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===uu)return n.ALPHA;if(s===tn)return n.RGBA;if(s===hu)return n.LUMINANCE;if(s===du)return n.LUMINANCE_ALPHA;if(s===Zn)return n.DEPTH_COMPONENT;if(s===Oi)return n.DEPTH_STENCIL;if(s===Ks)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===fu)return n.RED;if(s===Dc)return n.RED_INTEGER;if(s===pu)return n.RG;if(s===Ic)return n.RG_INTEGER;if(s===Uc)return n.RGBA_INTEGER;if(s===hs||s===ds||s===fs||s===ps)if(c===at)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===hs)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===ds)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===fs)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===ps)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===hs)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===ds)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===fs)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===ps)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===No||s===Oo||s===Fo||s===Bo)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===No)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Oo)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Fo)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Bo)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Nc)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===zo||s===ko)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===zo)return c===at?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===ko)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Ho||s===Go||s===Wo||s===Vo||s===Xo||s===$o||s===jo||s===qo||s===Yo||s===Ko||s===Zo||s===Jo||s===Qo||s===ea)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Ho)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Go)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Wo)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Vo)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Xo)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===$o)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===jo)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===qo)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Yo)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Ko)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Zo)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Jo)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Qo)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===ea)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===ms||s===ta||s===na)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===ms)return c===at?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===ta)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===na)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===mu||s===ia||s===ra||s===sa)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===ms)return o.COMPRESSED_RED_RGTC1_EXT;if(s===ia)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===ra)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===sa)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Kn?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class Hm extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Pr extends pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Gm={type:"move"};class Bs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const g of e.hand.values()){const p=t.getJointPose(g,i),h=this._getHandJoint(l,g);p!==null&&(h.matrix.fromArray(p.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=p.radius),h.visible=p!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=u.position.distanceTo(f.position),m=.02,_=.005;l.inputState.pinching&&d>m+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=m-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Gm)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Pr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Wm extends ii{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,f=null,d=null,m=null,_=null;const g=t.getContextAttributes();let p=null,h=null;const S=[],x=[],T=new Ue;let P=null;const R=new jt;R.layers.enable(1),R.viewport=new St;const C=new jt;C.layers.enable(2),C.viewport=new St;const Q=[R,C],y=new Hm;y.layers.enable(1),y.layers.enable(2);let A=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(F){let se=S[F];return se===void 0&&(se=new Bs,S[F]=se),se.getTargetRaySpace()},this.getControllerGrip=function(F){let se=S[F];return se===void 0&&(se=new Bs,S[F]=se),se.getGripSpace()},this.getHand=function(F){let se=S[F];return se===void 0&&(se=new Bs,S[F]=se),se.getHandSpace()};function D(F){const se=x.indexOf(F.inputSource);if(se===-1)return;const ve=S[se];ve!==void 0&&(ve.update(F.inputSource,F.frame,l||a),ve.dispatchEvent({type:F.type,data:F.inputSource}))}function H(){r.removeEventListener("select",D),r.removeEventListener("selectstart",D),r.removeEventListener("selectend",D),r.removeEventListener("squeeze",D),r.removeEventListener("squeezestart",D),r.removeEventListener("squeezeend",D),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",L);for(let F=0;F<S.length;F++){const se=x[F];se!==null&&(x[F]=null,S[F].disconnect(se))}A=null,U=null,e.setRenderTarget(p),m=null,d=null,f=null,r=null,h=null,ge.stop(),i.isPresenting=!1,e.setPixelRatio(P),e.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(F){s=F,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(F){o=F,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(F){l=F},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(F){if(r=F,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",D),r.addEventListener("selectstart",D),r.addEventListener("selectend",D),r.addEventListener("squeeze",D),r.addEventListener("squeezestart",D),r.addEventListener("squeezeend",D),r.addEventListener("end",H),r.addEventListener("inputsourceschange",L),g.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(T),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const se={antialias:r.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,se),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),h=new ei(m.framebufferWidth,m.framebufferHeight,{format:tn,type:Un,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let se=null,ve=null,Te=null;g.depth&&(Te=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=g.stencil?Oi:Zn,ve=g.stencil?Kn:Cn);const Re={colorFormat:t.RGBA8,depthFormat:Te,scaleFactor:s};f=new XRWebGLBinding(r,t),d=f.createProjectionLayer(Re),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),h=new ei(d.textureWidth,d.textureHeight,{format:tn,type:Un,depthTexture:new Zc(d.textureWidth,d.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0});const Ie=e.properties.get(h);Ie.__ignoreDepthValues=d.ignoreDepthValues}h.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),ge.setContext(r),ge.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function L(F){for(let se=0;se<F.removed.length;se++){const ve=F.removed[se],Te=x.indexOf(ve);Te>=0&&(x[Te]=null,S[Te].disconnect(ve))}for(let se=0;se<F.added.length;se++){const ve=F.added[se];let Te=x.indexOf(ve);if(Te===-1){for(let Ie=0;Ie<S.length;Ie++)if(Ie>=x.length){x.push(ve),Te=Ie;break}else if(x[Ie]===null){x[Ie]=ve,Te=Ie;break}if(Te===-1)break}const Re=S[Te];Re&&Re.connect(ve)}}const z=new I,W=new I;function re(F,se,ve){z.setFromMatrixPosition(se.matrixWorld),W.setFromMatrixPosition(ve.matrixWorld);const Te=z.distanceTo(W),Re=se.projectionMatrix.elements,Ie=ve.projectionMatrix.elements,ze=Re[14]/(Re[10]-1),De=Re[14]/(Re[10]+1),Ke=(Re[9]+1)/Re[5],G=(Re[9]-1)/Re[5],mt=(Re[8]-1)/Re[0],Le=(Ie[8]+1)/Ie[0],Be=ze*mt,be=ze*Le,rt=Te/(-mt+Le),He=rt*-mt;se.matrixWorld.decompose(F.position,F.quaternion,F.scale),F.translateX(He),F.translateZ(rt),F.matrixWorld.compose(F.position,F.quaternion,F.scale),F.matrixWorldInverse.copy(F.matrixWorld).invert();const b=ze+rt,v=De+rt,k=Be-He,de=be+(Te-He),le=Ke*De/v*b,fe=G*De/v*b;F.projectionMatrix.makePerspective(k,de,le,fe,b,v),F.projectionMatrixInverse.copy(F.projectionMatrix).invert()}function ie(F,se){se===null?F.matrixWorld.copy(F.matrix):F.matrixWorld.multiplyMatrices(se.matrixWorld,F.matrix),F.matrixWorldInverse.copy(F.matrixWorld).invert()}this.updateCamera=function(F){if(r===null)return;y.near=C.near=R.near=F.near,y.far=C.far=R.far=F.far,(A!==y.near||U!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),A=y.near,U=y.far);const se=F.parent,ve=y.cameras;ie(y,se);for(let Te=0;Te<ve.length;Te++)ie(ve[Te],se);ve.length===2?re(y,R,C):y.projectionMatrix.copy(R.projectionMatrix),J(F,y,se)};function J(F,se,ve){ve===null?F.matrix.copy(se.matrixWorld):(F.matrix.copy(ve.matrixWorld),F.matrix.invert(),F.matrix.multiply(se.matrixWorld)),F.matrix.decompose(F.position,F.quaternion,F.scale),F.updateMatrixWorld(!0),F.projectionMatrix.copy(se.projectionMatrix),F.projectionMatrixInverse.copy(se.projectionMatrixInverse),F.isPerspectiveCamera&&(F.fov=rr*2*Math.atan(1/F.projectionMatrix.elements[5]),F.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&m===null))return c},this.setFoveation=function(F){c=F,d!==null&&(d.fixedFoveation=F),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=F)};let oe=null;function me(F,se){if(u=se.getViewerPose(l||a),_=se,u!==null){const ve=u.views;m!==null&&(e.setRenderTargetFramebuffer(h,m.framebuffer),e.setRenderTarget(h));let Te=!1;ve.length!==y.cameras.length&&(y.cameras.length=0,Te=!0);for(let Re=0;Re<ve.length;Re++){const Ie=ve[Re];let ze=null;if(m!==null)ze=m.getViewport(Ie);else{const Ke=f.getViewSubImage(d,Ie);ze=Ke.viewport,Re===0&&(e.setRenderTargetTextures(h,Ke.colorTexture,d.ignoreDepthValues?void 0:Ke.depthStencilTexture),e.setRenderTarget(h))}let De=Q[Re];De===void 0&&(De=new jt,De.layers.enable(Re),De.viewport=new St,Q[Re]=De),De.matrix.fromArray(Ie.transform.matrix),De.matrix.decompose(De.position,De.quaternion,De.scale),De.projectionMatrix.fromArray(Ie.projectionMatrix),De.projectionMatrixInverse.copy(De.projectionMatrix).invert(),De.viewport.set(ze.x,ze.y,ze.width,ze.height),Re===0&&(y.matrix.copy(De.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),Te===!0&&y.cameras.push(De)}}for(let ve=0;ve<S.length;ve++){const Te=x[ve],Re=S[ve];Te!==null&&Re!==void 0&&Re.update(Te,se,l||a)}oe&&oe(F,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),_=null}const ge=new Yc;ge.setAnimationLoop(me),this.setAnimationLoop=function(F){oe=F},this.dispose=function(){}}}function Vm(n,e){function t(p,h){p.matrixAutoUpdate===!0&&p.updateMatrix(),h.value.copy(p.matrix)}function i(p,h){h.color.getRGB(p.fogColor.value,$c(n)),h.isFog?(p.fogNear.value=h.near,p.fogFar.value=h.far):h.isFogExp2&&(p.fogDensity.value=h.density)}function r(p,h,S,x,T){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(p,h):h.isMeshToonMaterial?(s(p,h),f(p,h)):h.isMeshPhongMaterial?(s(p,h),u(p,h)):h.isMeshStandardMaterial?(s(p,h),d(p,h),h.isMeshPhysicalMaterial&&m(p,h,T)):h.isMeshMatcapMaterial?(s(p,h),_(p,h)):h.isMeshDepthMaterial?s(p,h):h.isMeshDistanceMaterial?(s(p,h),g(p,h)):h.isMeshNormalMaterial?s(p,h):h.isLineBasicMaterial?(a(p,h),h.isLineDashedMaterial&&o(p,h)):h.isPointsMaterial?c(p,h,S,x):h.isSpriteMaterial?l(p,h):h.isShadowMaterial?(p.color.value.copy(h.color),p.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(p,h){p.opacity.value=h.opacity,h.color&&p.diffuse.value.copy(h.color),h.emissive&&p.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.bumpMap&&(p.bumpMap.value=h.bumpMap,t(h.bumpMap,p.bumpMapTransform),p.bumpScale.value=h.bumpScale,h.side===Ut&&(p.bumpScale.value*=-1)),h.normalMap&&(p.normalMap.value=h.normalMap,t(h.normalMap,p.normalMapTransform),p.normalScale.value.copy(h.normalScale),h.side===Ut&&p.normalScale.value.negate()),h.displacementMap&&(p.displacementMap.value=h.displacementMap,t(h.displacementMap,p.displacementMapTransform),p.displacementScale.value=h.displacementScale,p.displacementBias.value=h.displacementBias),h.emissiveMap&&(p.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,p.emissiveMapTransform)),h.specularMap&&(p.specularMap.value=h.specularMap,t(h.specularMap,p.specularMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest);const S=e.get(h).envMap;if(S&&(p.envMap.value=S,p.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=h.reflectivity,p.ior.value=h.ior,p.refractionRatio.value=h.refractionRatio),h.lightMap){p.lightMap.value=h.lightMap;const x=n._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=h.lightMapIntensity*x,t(h.lightMap,p.lightMapTransform)}h.aoMap&&(p.aoMap.value=h.aoMap,p.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,p.aoMapTransform))}function a(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform))}function o(p,h){p.dashSize.value=h.dashSize,p.totalSize.value=h.dashSize+h.gapSize,p.scale.value=h.scale}function c(p,h,S,x){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.size.value=h.size*S,p.scale.value=x*.5,h.map&&(p.map.value=h.map,t(h.map,p.uvTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function l(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.rotation.value=h.rotation,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function u(p,h){p.specular.value.copy(h.specular),p.shininess.value=Math.max(h.shininess,1e-4)}function f(p,h){h.gradientMap&&(p.gradientMap.value=h.gradientMap)}function d(p,h){p.metalness.value=h.metalness,h.metalnessMap&&(p.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,p.metalnessMapTransform)),p.roughness.value=h.roughness,h.roughnessMap&&(p.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,p.roughnessMapTransform)),e.get(h).envMap&&(p.envMapIntensity.value=h.envMapIntensity)}function m(p,h,S){p.ior.value=h.ior,h.sheen>0&&(p.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),p.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(p.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,p.sheenColorMapTransform)),h.sheenRoughnessMap&&(p.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,p.sheenRoughnessMapTransform))),h.clearcoat>0&&(p.clearcoat.value=h.clearcoat,p.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(p.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,p.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(p.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Ut&&p.clearcoatNormalScale.value.negate())),h.iridescence>0&&(p.iridescence.value=h.iridescence,p.iridescenceIOR.value=h.iridescenceIOR,p.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(p.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,p.iridescenceMapTransform)),h.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),h.transmission>0&&(p.transmission.value=h.transmission,p.transmissionSamplerMap.value=S.texture,p.transmissionSamplerSize.value.set(S.width,S.height),h.transmissionMap&&(p.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,p.transmissionMapTransform)),p.thickness.value=h.thickness,h.thicknessMap&&(p.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=h.attenuationDistance,p.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(p.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(p.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=h.specularIntensity,p.specularColor.value.copy(h.specularColor),h.specularColorMap&&(p.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,p.specularColorMapTransform)),h.specularIntensityMap&&(p.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,h){h.matcap&&(p.matcap.value=h.matcap)}function g(p,h){const S=e.get(h).light;p.referencePosition.value.setFromMatrixPosition(S.matrixWorld),p.nearDistance.value=S.shadow.camera.near,p.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Xm(n,e,t,i){let r={},s={},a=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(S,x){const T=x.program;i.uniformBlockBinding(S,T)}function l(S,x){let T=r[S.id];T===void 0&&(_(S),T=u(S),r[S.id]=T,S.addEventListener("dispose",p));const P=x.program;i.updateUBOMapping(S,P);const R=e.render.frame;s[S.id]!==R&&(d(S),s[S.id]=R)}function u(S){const x=f();S.__bindingPointIndex=x;const T=n.createBuffer(),P=S.__size,R=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,P,R),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,T),T}function f(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const x=r[S.id],T=S.uniforms,P=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let R=0,C=T.length;R<C;R++){const Q=Array.isArray(T[R])?T[R]:[T[R]];for(let y=0,A=Q.length;y<A;y++){const U=Q[y];if(m(U,R,y,P)===!0){const D=U.__offset,H=Array.isArray(U.value)?U.value:[U.value];let L=0;for(let z=0;z<H.length;z++){const W=H[z],re=g(W);typeof W=="number"||typeof W=="boolean"?(U.__data[0]=W,n.bufferSubData(n.UNIFORM_BUFFER,D+L,U.__data)):W.isMatrix3?(U.__data[0]=W.elements[0],U.__data[1]=W.elements[1],U.__data[2]=W.elements[2],U.__data[3]=0,U.__data[4]=W.elements[3],U.__data[5]=W.elements[4],U.__data[6]=W.elements[5],U.__data[7]=0,U.__data[8]=W.elements[6],U.__data[9]=W.elements[7],U.__data[10]=W.elements[8],U.__data[11]=0):(W.toArray(U.__data,L),L+=re.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,D,U.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(S,x,T,P){const R=S.value,C=x+"_"+T;if(P[C]===void 0)return typeof R=="number"||typeof R=="boolean"?P[C]=R:P[C]=R.clone(),!0;{const Q=P[C];if(typeof R=="number"||typeof R=="boolean"){if(Q!==R)return P[C]=R,!0}else if(Q.equals(R)===!1)return Q.copy(R),!0}return!1}function _(S){const x=S.uniforms;let T=0;const P=16;for(let C=0,Q=x.length;C<Q;C++){const y=Array.isArray(x[C])?x[C]:[x[C]];for(let A=0,U=y.length;A<U;A++){const D=y[A],H=Array.isArray(D.value)?D.value:[D.value];for(let L=0,z=H.length;L<z;L++){const W=H[L],re=g(W),ie=T%P;ie!==0&&P-ie<re.boundary&&(T+=P-ie),D.__data=new Float32Array(re.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=T,T+=re.storage}}}const R=T%P;return R>0&&(T+=P-R),S.__size=T,S.__cache={},this}function g(S){const x={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(x.boundary=4,x.storage=4):S.isVector2?(x.boundary=8,x.storage=8):S.isVector3||S.isColor?(x.boundary=16,x.storage=12):S.isVector4?(x.boundary=16,x.storage=16):S.isMatrix3?(x.boundary=48,x.storage=48):S.isMatrix4?(x.boundary=64,x.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),x}function p(S){const x=S.target;x.removeEventListener("dispose",p);const T=a.indexOf(x.__bindingPointIndex);a.splice(T,1),n.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function h(){for(const S in r)n.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:c,update:l,dispose:h}}class il{constructor(e={}){const{canvas:t=ku(),context:i=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=a;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const h=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Mt,this._useLegacyLights=!1,this.toneMapping=In,this.toneMappingExposure=1;const x=this;let T=!1,P=0,R=0,C=null,Q=-1,y=null;const A=new St,U=new St;let D=null;const H=new Ye(0);let L=0,z=t.width,W=t.height,re=1,ie=null,J=null;const oe=new St(0,0,z,W),me=new St(0,0,z,W);let ge=!1;const F=new uo;let se=!1,ve=!1,Te=null;const Re=new ht,Ie=new Ue,ze=new I,De={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ke(){return C===null?re:1}let G=i;function mt(E,O){for(let $=0;$<E.length;$++){const Z=E[$],X=t.getContext(Z,O);if(X!==null)return X}return null}try{const E={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ro}`),t.addEventListener("webglcontextlost",Y,!1),t.addEventListener("webglcontextrestored",w,!1),t.addEventListener("webglcontextcreationerror",ne,!1),G===null){const O=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&O.shift(),G=mt(O,E),G===null)throw mt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&G instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),G.getShaderPrecisionFormat===void 0&&(G.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Le,Be,be,rt,He,b,v,k,de,le,fe,Ae,Me,Se,Pe,Ge,ue,nt,We,N,B,V,M,q;function ae(){Le=new tp(G),Be=new Yf(G,Le,e),Le.init(Be),V=new km(G,Le,Be),be=new Bm(G,Le,Be),rt=new rp(G),He=new bm,b=new zm(G,Le,be,He,Be,V,rt),v=new Zf(x),k=new ep(x),de=new hh(G,Be),M=new jf(G,Le,de,Be),le=new np(G,de,rt,M),fe=new cp(G,le,de,rt),We=new ap(G,Be,b),Ge=new Kf(He),Ae=new Sm(x,v,k,Le,Be,M,Ge),Me=new Vm(x,He),Se=new wm,Pe=new Dm(Le,Be),nt=new $f(x,v,k,be,fe,d,c),ue=new Fm(x,fe,Be),q=new Xm(G,rt,Be,be),N=new qf(G,Le,rt,Be),B=new ip(G,Le,rt,Be),rt.programs=Ae.programs,x.capabilities=Be,x.extensions=Le,x.properties=He,x.renderLists=Se,x.shadowMap=ue,x.state=be,x.info=rt}ae();const ee=new Wm(x,G);this.xr=ee,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const E=Le.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Le.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return re},this.setPixelRatio=function(E){E!==void 0&&(re=E,this.setSize(z,W,!1))},this.getSize=function(E){return E.set(z,W)},this.setSize=function(E,O,$=!0){if(ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=E,W=O,t.width=Math.floor(E*re),t.height=Math.floor(O*re),$===!0&&(t.style.width=E+"px",t.style.height=O+"px"),this.setViewport(0,0,E,O)},this.getDrawingBufferSize=function(E){return E.set(z*re,W*re).floor()},this.setDrawingBufferSize=function(E,O,$){z=E,W=O,re=$,t.width=Math.floor(E*$),t.height=Math.floor(O*$),this.setViewport(0,0,E,O)},this.getCurrentViewport=function(E){return E.copy(A)},this.getViewport=function(E){return E.copy(oe)},this.setViewport=function(E,O,$,Z){E.isVector4?oe.set(E.x,E.y,E.z,E.w):oe.set(E,O,$,Z),be.viewport(A.copy(oe).multiplyScalar(re).floor())},this.getScissor=function(E){return E.copy(me)},this.setScissor=function(E,O,$,Z){E.isVector4?me.set(E.x,E.y,E.z,E.w):me.set(E,O,$,Z),be.scissor(U.copy(me).multiplyScalar(re).floor())},this.getScissorTest=function(){return ge},this.setScissorTest=function(E){be.setScissorTest(ge=E)},this.setOpaqueSort=function(E){ie=E},this.setTransparentSort=function(E){J=E},this.getClearColor=function(E){return E.copy(nt.getClearColor())},this.setClearColor=function(){nt.setClearColor.apply(nt,arguments)},this.getClearAlpha=function(){return nt.getClearAlpha()},this.setClearAlpha=function(){nt.setClearAlpha.apply(nt,arguments)},this.clear=function(E=!0,O=!0,$=!0){let Z=0;if(E){let X=!1;if(C!==null){const Ee=C.texture.format;X=Ee===Uc||Ee===Ic||Ee===Dc}if(X){const Ee=C.texture.type,Ce=Ee===Un||Ee===Cn||Ee===so||Ee===Kn||Ee===Lc||Ee===Pc,Oe=nt.getClearColor(),ke=nt.getClearAlpha(),qe=Oe.r,Ve=Oe.g,$e=Oe.b;Ce?(m[0]=qe,m[1]=Ve,m[2]=$e,m[3]=ke,G.clearBufferuiv(G.COLOR,0,m)):(_[0]=qe,_[1]=Ve,_[2]=$e,_[3]=ke,G.clearBufferiv(G.COLOR,0,_))}else Z|=G.COLOR_BUFFER_BIT}O&&(Z|=G.DEPTH_BUFFER_BIT),$&&(Z|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Y,!1),t.removeEventListener("webglcontextrestored",w,!1),t.removeEventListener("webglcontextcreationerror",ne,!1),Se.dispose(),Pe.dispose(),He.dispose(),v.dispose(),k.dispose(),fe.dispose(),M.dispose(),q.dispose(),Ae.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",Qe),ee.removeEventListener("sessionend",Ne),Te&&(Te.dispose(),Te=null),it.stop()};function Y(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function w(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const E=rt.autoReset,O=ue.enabled,$=ue.autoUpdate,Z=ue.needsUpdate,X=ue.type;ae(),rt.autoReset=E,ue.enabled=O,ue.autoUpdate=$,ue.needsUpdate=Z,ue.type=X}function ne(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function te(E){const O=E.target;O.removeEventListener("dispose",te),K(O)}function K(E){he(E),He.remove(E)}function he(E){const O=He.get(E).programs;O!==void 0&&(O.forEach(function($){Ae.releaseProgram($)}),E.isShaderMaterial&&Ae.releaseShaderCache(E))}this.renderBufferDirect=function(E,O,$,Z,X,Ee){O===null&&(O=De);const Ce=X.isMesh&&X.matrixWorld.determinant()<0,Oe=_l(E,O,$,Z,X);be.setMaterial(Z,Ce);let ke=$.index,qe=1;if(Z.wireframe===!0){if(ke=le.getWireframeAttribute($),ke===void 0)return;qe=2}const Ve=$.drawRange,$e=$.attributes.position;let dt=Ve.start*qe,Ft=(Ve.start+Ve.count)*qe;Ee!==null&&(dt=Math.max(dt,Ee.start*qe),Ft=Math.min(Ft,(Ee.start+Ee.count)*qe)),ke!==null?(dt=Math.max(dt,0),Ft=Math.min(Ft,ke.count)):$e!=null&&(dt=Math.max(dt,0),Ft=Math.min(Ft,$e.count));const xt=Ft-dt;if(xt<0||xt===1/0)return;M.setup(X,Z,Oe,$,ke);let ln,ct=N;if(ke!==null&&(ln=de.get(ke),ct=B,ct.setIndex(ln)),X.isMesh)Z.wireframe===!0?(be.setLineWidth(Z.wireframeLinewidth*Ke()),ct.setMode(G.LINES)):ct.setMode(G.TRIANGLES);else if(X.isLine){let Ze=Z.linewidth;Ze===void 0&&(Ze=1),be.setLineWidth(Ze*Ke()),X.isLineSegments?ct.setMode(G.LINES):X.isLineLoop?ct.setMode(G.LINE_LOOP):ct.setMode(G.LINE_STRIP)}else X.isPoints?ct.setMode(G.POINTS):X.isSprite&&ct.setMode(G.TRIANGLES);if(X.isBatchedMesh)ct.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else if(X.isInstancedMesh)ct.renderInstances(dt,xt,X.count);else if($.isInstancedBufferGeometry){const Ze=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,os=Math.min($.instanceCount,Ze);ct.renderInstances(dt,xt,os)}else ct.render(dt,xt)};function ye(E,O,$){E.transparent===!0&&E.side===gn&&E.forceSinglePass===!1?(E.side=Ut,E.needsUpdate=!0,rn(E,O,$),E.side=Nn,E.needsUpdate=!0,rn(E,O,$),E.side=gn):rn(E,O,$)}this.compile=function(E,O,$=null){$===null&&($=E),p=Pe.get($),p.init(),S.push(p),$.traverseVisible(function(X){X.isLight&&X.layers.test(O.layers)&&(p.pushLight(X),X.castShadow&&p.pushShadow(X))}),E!==$&&E.traverseVisible(function(X){X.isLight&&X.layers.test(O.layers)&&(p.pushLight(X),X.castShadow&&p.pushShadow(X))}),p.setupLights(x._useLegacyLights);const Z=new Set;return E.traverse(function(X){const Ee=X.material;if(Ee)if(Array.isArray(Ee))for(let Ce=0;Ce<Ee.length;Ce++){const Oe=Ee[Ce];ye(Oe,$,X),Z.add(Oe)}else ye(Ee,$,X),Z.add(Ee)}),S.pop(),p=null,Z},this.compileAsync=function(E,O,$=null){const Z=this.compile(E,O,$);return new Promise(X=>{function Ee(){if(Z.forEach(function(Ce){He.get(Ce).currentProgram.isReady()&&Z.delete(Ce)}),Z.size===0){X(E);return}setTimeout(Ee,10)}Le.get("KHR_parallel_shader_compile")!==null?Ee():setTimeout(Ee,10)})};let we=null;function tt(E){we&&we(E)}function Qe(){it.stop()}function Ne(){it.start()}const it=new Yc;it.setAnimationLoop(tt),typeof self<"u"&&it.setContext(self),this.setAnimationLoop=function(E){we=E,ee.setAnimationLoop(E),E===null?it.stop():it.start()},ee.addEventListener("sessionstart",Qe),ee.addEventListener("sessionend",Ne),this.render=function(E,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(O),O=ee.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,O,C),p=Pe.get(E,S.length),p.init(),S.push(p),Re.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),F.setFromProjectionMatrix(Re),ve=this.localClippingEnabled,se=Ge.init(this.clippingPlanes,ve),g=Se.get(E,h.length),g.init(),h.push(g),gt(E,O,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(ie,J),this.info.render.frame++,se===!0&&Ge.beginShadows();const $=p.state.shadowsArray;if(ue.render($,E,O),se===!0&&Ge.endShadows(),this.info.autoReset===!0&&this.info.reset(),nt.render(g,E),p.setupLights(x._useLegacyLights),O.isArrayCamera){const Z=O.cameras;for(let X=0,Ee=Z.length;X<Ee;X++){const Ce=Z[X];Bn(g,E,Ce,Ce.viewport)}}else Bn(g,E,O);C!==null&&(b.updateMultisampleRenderTarget(C),b.updateRenderTargetMipmap(C)),E.isScene===!0&&E.onAfterRender(x,E,O),M.resetDefaultState(),Q=-1,y=null,S.pop(),S.length>0?p=S[S.length-1]:p=null,h.pop(),h.length>0?g=h[h.length-1]:g=null};function gt(E,O,$,Z){if(E.visible===!1)return;if(E.layers.test(O.layers)){if(E.isGroup)$=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(O);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||F.intersectsSprite(E)){Z&&ze.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Re);const Ce=fe.update(E),Oe=E.material;Oe.visible&&g.push(E,Ce,Oe,$,ze.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||F.intersectsObject(E))){const Ce=fe.update(E),Oe=E.material;if(Z&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),ze.copy(E.boundingSphere.center)):(Ce.boundingSphere===null&&Ce.computeBoundingSphere(),ze.copy(Ce.boundingSphere.center)),ze.applyMatrix4(E.matrixWorld).applyMatrix4(Re)),Array.isArray(Oe)){const ke=Ce.groups;for(let qe=0,Ve=ke.length;qe<Ve;qe++){const $e=ke[qe],dt=Oe[$e.materialIndex];dt&&dt.visible&&g.push(E,Ce,dt,$,ze.z,$e)}}else Oe.visible&&g.push(E,Ce,Oe,$,ze.z,null)}}const Ee=E.children;for(let Ce=0,Oe=Ee.length;Ce<Oe;Ce++)gt(Ee[Ce],O,$,Z)}function Bn(E,O,$,Z){const X=E.opaque,Ee=E.transmissive,Ce=E.transparent;p.setupLightsView($),se===!0&&Ge.setGlobalState(x.clippingPlanes,$),Ee.length>0&&an(X,Ee,O,$),Z&&be.viewport(A.copy(Z)),X.length>0&&cn(X,O,$),Ee.length>0&&cn(Ee,O,$),Ce.length>0&&cn(Ce,O,$),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function an(E,O,$,Z){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;const Ee=Be.isWebGL2;Te===null&&(Te=new ei(1,1,{generateMipmaps:!0,type:Le.has("EXT_color_buffer_half_float")?ir:Un,minFilter:nr,samples:Ee?4:0})),x.getDrawingBufferSize(Ie),Ee?Te.setSize(Ie.x,Ie.y):Te.setSize(Yr(Ie.x),Yr(Ie.y));const Ce=x.getRenderTarget();x.setRenderTarget(Te),x.getClearColor(H),L=x.getClearAlpha(),L<1&&x.setClearColor(16777215,.5),x.clear();const Oe=x.toneMapping;x.toneMapping=In,cn(E,$,Z),b.updateMultisampleRenderTarget(Te),b.updateRenderTargetMipmap(Te);let ke=!1;for(let qe=0,Ve=O.length;qe<Ve;qe++){const $e=O[qe],dt=$e.object,Ft=$e.geometry,xt=$e.material,ln=$e.group;if(xt.side===gn&&dt.layers.test(Z.layers)){const ct=xt.side;xt.side=Ut,xt.needsUpdate=!0,zn(dt,$,Z,Ft,xt,ln),xt.side=ct,xt.needsUpdate=!0,ke=!0}}ke===!0&&(b.updateMultisampleRenderTarget(Te),b.updateRenderTargetMipmap(Te)),x.setRenderTarget(Ce),x.setClearColor(H,L),x.toneMapping=Oe}function cn(E,O,$){const Z=O.isScene===!0?O.overrideMaterial:null;for(let X=0,Ee=E.length;X<Ee;X++){const Ce=E[X],Oe=Ce.object,ke=Ce.geometry,qe=Z===null?Ce.material:Z,Ve=Ce.group;Oe.layers.test($.layers)&&zn(Oe,O,$,ke,qe,Ve)}}function zn(E,O,$,Z,X,Ee){E.onBeforeRender(x,O,$,Z,X,Ee),E.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),X.onBeforeRender(x,O,$,Z,E,Ee),X.transparent===!0&&X.side===gn&&X.forceSinglePass===!1?(X.side=Ut,X.needsUpdate=!0,x.renderBufferDirect($,O,Z,X,E,Ee),X.side=Nn,X.needsUpdate=!0,x.renderBufferDirect($,O,Z,X,E,Ee),X.side=gn):x.renderBufferDirect($,O,Z,X,E,Ee),E.onAfterRender(x,O,$,Z,X,Ee)}function rn(E,O,$){O.isScene!==!0&&(O=De);const Z=He.get(E),X=p.state.lights,Ee=p.state.shadowsArray,Ce=X.state.version,Oe=Ae.getParameters(E,X.state,Ee,O,$),ke=Ae.getProgramCacheKey(Oe);let qe=Z.programs;Z.environment=E.isMeshStandardMaterial?O.environment:null,Z.fog=O.fog,Z.envMap=(E.isMeshStandardMaterial?k:v).get(E.envMap||Z.environment),qe===void 0&&(E.addEventListener("dispose",te),qe=new Map,Z.programs=qe);let Ve=qe.get(ke);if(Ve!==void 0){if(Z.currentProgram===Ve&&Z.lightsStateVersion===Ce)return To(E,Oe),Ve}else Oe.uniforms=Ae.getUniforms(E),E.onBuild($,Oe,x),E.onBeforeCompile(Oe,x),Ve=Ae.acquireProgram(Oe,ke),qe.set(ke,Ve),Z.uniforms=Oe.uniforms;const $e=Z.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&($e.clippingPlanes=Ge.uniform),To(E,Oe),Z.needsLights=xl(E),Z.lightsStateVersion=Ce,Z.needsLights&&($e.ambientLightColor.value=X.state.ambient,$e.lightProbe.value=X.state.probe,$e.directionalLights.value=X.state.directional,$e.directionalLightShadows.value=X.state.directionalShadow,$e.spotLights.value=X.state.spot,$e.spotLightShadows.value=X.state.spotShadow,$e.rectAreaLights.value=X.state.rectArea,$e.ltc_1.value=X.state.rectAreaLTC1,$e.ltc_2.value=X.state.rectAreaLTC2,$e.pointLights.value=X.state.point,$e.pointLightShadows.value=X.state.pointShadow,$e.hemisphereLights.value=X.state.hemi,$e.directionalShadowMap.value=X.state.directionalShadowMap,$e.directionalShadowMatrix.value=X.state.directionalShadowMatrix,$e.spotShadowMap.value=X.state.spotShadowMap,$e.spotLightMatrix.value=X.state.spotLightMatrix,$e.spotLightMap.value=X.state.spotLightMap,$e.pointShadowMap.value=X.state.pointShadowMap,$e.pointShadowMatrix.value=X.state.pointShadowMatrix),Z.currentProgram=Ve,Z.uniformsList=null,Ve}function bo(E){if(E.uniformsList===null){const O=E.currentProgram.getUniforms();E.uniformsList=Gr.seqWithValue(O.seq,E.uniforms)}return E.uniformsList}function To(E,O){const $=He.get(E);$.outputColorSpace=O.outputColorSpace,$.batching=O.batching,$.instancing=O.instancing,$.instancingColor=O.instancingColor,$.skinning=O.skinning,$.morphTargets=O.morphTargets,$.morphNormals=O.morphNormals,$.morphColors=O.morphColors,$.morphTargetsCount=O.morphTargetsCount,$.numClippingPlanes=O.numClippingPlanes,$.numIntersection=O.numClipIntersection,$.vertexAlphas=O.vertexAlphas,$.vertexTangents=O.vertexTangents,$.toneMapping=O.toneMapping}function _l(E,O,$,Z,X){O.isScene!==!0&&(O=De),b.resetTextureUnits();const Ee=O.fog,Ce=Z.isMeshStandardMaterial?O.environment:null,Oe=C===null?x.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:yn,ke=(Z.isMeshStandardMaterial?k:v).get(Z.envMap||Ce),qe=Z.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Ve=!!$.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),$e=!!$.morphAttributes.position,dt=!!$.morphAttributes.normal,Ft=!!$.morphAttributes.color;let xt=In;Z.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(xt=x.toneMapping);const ln=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ct=ln!==void 0?ln.length:0,Ze=He.get(Z),os=p.state.lights;if(se===!0&&(ve===!0||E!==y)){const Wt=E===y&&Z.id===Q;Ge.setState(Z,E,Wt)}let ut=!1;Z.version===Ze.__version?(Ze.needsLights&&Ze.lightsStateVersion!==os.state.version||Ze.outputColorSpace!==Oe||X.isBatchedMesh&&Ze.batching===!1||!X.isBatchedMesh&&Ze.batching===!0||X.isInstancedMesh&&Ze.instancing===!1||!X.isInstancedMesh&&Ze.instancing===!0||X.isSkinnedMesh&&Ze.skinning===!1||!X.isSkinnedMesh&&Ze.skinning===!0||X.isInstancedMesh&&Ze.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Ze.instancingColor===!1&&X.instanceColor!==null||Ze.envMap!==ke||Z.fog===!0&&Ze.fog!==Ee||Ze.numClippingPlanes!==void 0&&(Ze.numClippingPlanes!==Ge.numPlanes||Ze.numIntersection!==Ge.numIntersection)||Ze.vertexAlphas!==qe||Ze.vertexTangents!==Ve||Ze.morphTargets!==$e||Ze.morphNormals!==dt||Ze.morphColors!==Ft||Ze.toneMapping!==xt||Be.isWebGL2===!0&&Ze.morphTargetsCount!==ct)&&(ut=!0):(ut=!0,Ze.__version=Z.version);let kn=Ze.currentProgram;ut===!0&&(kn=rn(Z,O,X));let wo=!1,Hi=!1,as=!1;const Tt=kn.getUniforms(),Hn=Ze.uniforms;if(be.useProgram(kn.program)&&(wo=!0,Hi=!0,as=!0),Z.id!==Q&&(Q=Z.id,Hi=!0),wo||y!==E){Tt.setValue(G,"projectionMatrix",E.projectionMatrix),Tt.setValue(G,"viewMatrix",E.matrixWorldInverse);const Wt=Tt.map.cameraPosition;Wt!==void 0&&Wt.setValue(G,ze.setFromMatrixPosition(E.matrixWorld)),Be.logarithmicDepthBuffer&&Tt.setValue(G,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&Tt.setValue(G,"isOrthographic",E.isOrthographicCamera===!0),y!==E&&(y=E,Hi=!0,as=!0)}if(X.isSkinnedMesh){Tt.setOptional(G,X,"bindMatrix"),Tt.setOptional(G,X,"bindMatrixInverse");const Wt=X.skeleton;Wt&&(Be.floatVertexTextures?(Wt.boneTexture===null&&Wt.computeBoneTexture(),Tt.setValue(G,"boneTexture",Wt.boneTexture,b)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}X.isBatchedMesh&&(Tt.setOptional(G,X,"batchingTexture"),Tt.setValue(G,"batchingTexture",X._matricesTexture,b));const cs=$.morphAttributes;if((cs.position!==void 0||cs.normal!==void 0||cs.color!==void 0&&Be.isWebGL2===!0)&&We.update(X,$,kn),(Hi||Ze.receiveShadow!==X.receiveShadow)&&(Ze.receiveShadow=X.receiveShadow,Tt.setValue(G,"receiveShadow",X.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(Hn.envMap.value=ke,Hn.flipEnvMap.value=ke.isCubeTexture&&ke.isRenderTargetTexture===!1?-1:1),Hi&&(Tt.setValue(G,"toneMappingExposure",x.toneMappingExposure),Ze.needsLights&&vl(Hn,as),Ee&&Z.fog===!0&&Me.refreshFogUniforms(Hn,Ee),Me.refreshMaterialUniforms(Hn,Z,re,W,Te),Gr.upload(G,bo(Ze),Hn,b)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(Gr.upload(G,bo(Ze),Hn,b),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&Tt.setValue(G,"center",X.center),Tt.setValue(G,"modelViewMatrix",X.modelViewMatrix),Tt.setValue(G,"normalMatrix",X.normalMatrix),Tt.setValue(G,"modelMatrix",X.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){const Wt=Z.uniformsGroups;for(let ls=0,yl=Wt.length;ls<yl;ls++)if(Be.isWebGL2){const Ao=Wt[ls];q.update(Ao,kn),q.bind(Ao,kn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return kn}function vl(E,O){E.ambientLightColor.needsUpdate=O,E.lightProbe.needsUpdate=O,E.directionalLights.needsUpdate=O,E.directionalLightShadows.needsUpdate=O,E.pointLights.needsUpdate=O,E.pointLightShadows.needsUpdate=O,E.spotLights.needsUpdate=O,E.spotLightShadows.needsUpdate=O,E.rectAreaLights.needsUpdate=O,E.hemisphereLights.needsUpdate=O}function xl(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(E,O,$){He.get(E.texture).__webglTexture=O,He.get(E.depthTexture).__webglTexture=$;const Z=He.get(E);Z.__hasExternalTextures=!0,Z.__hasExternalTextures&&(Z.__autoAllocateDepthBuffer=$===void 0,Z.__autoAllocateDepthBuffer||Le.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Z.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(E,O){const $=He.get(E);$.__webglFramebuffer=O,$.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(E,O=0,$=0){C=E,P=O,R=$;let Z=!0,X=null,Ee=!1,Ce=!1;if(E){const ke=He.get(E);ke.__useDefaultFramebuffer!==void 0?(be.bindFramebuffer(G.FRAMEBUFFER,null),Z=!1):ke.__webglFramebuffer===void 0?b.setupRenderTarget(E):ke.__hasExternalTextures&&b.rebindTextures(E,He.get(E.texture).__webglTexture,He.get(E.depthTexture).__webglTexture);const qe=E.texture;(qe.isData3DTexture||qe.isDataArrayTexture||qe.isCompressedArrayTexture)&&(Ce=!0);const Ve=He.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ve[O])?X=Ve[O][$]:X=Ve[O],Ee=!0):Be.isWebGL2&&E.samples>0&&b.useMultisampledRTT(E)===!1?X=He.get(E).__webglMultisampledFramebuffer:Array.isArray(Ve)?X=Ve[$]:X=Ve,A.copy(E.viewport),U.copy(E.scissor),D=E.scissorTest}else A.copy(oe).multiplyScalar(re).floor(),U.copy(me).multiplyScalar(re).floor(),D=ge;if(be.bindFramebuffer(G.FRAMEBUFFER,X)&&Be.drawBuffers&&Z&&be.drawBuffers(E,X),be.viewport(A),be.scissor(U),be.setScissorTest(D),Ee){const ke=He.get(E.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+O,ke.__webglTexture,$)}else if(Ce){const ke=He.get(E.texture),qe=O||0;G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,ke.__webglTexture,$||0,qe)}Q=-1},this.readRenderTargetPixels=function(E,O,$,Z,X,Ee,Ce){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Oe=He.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ce!==void 0&&(Oe=Oe[Ce]),Oe){be.bindFramebuffer(G.FRAMEBUFFER,Oe);try{const ke=E.texture,qe=ke.format,Ve=ke.type;if(qe!==tn&&V.convert(qe)!==G.getParameter(G.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const $e=Ve===ir&&(Le.has("EXT_color_buffer_half_float")||Be.isWebGL2&&Le.has("EXT_color_buffer_float"));if(Ve!==Un&&V.convert(Ve)!==G.getParameter(G.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ve===Ln&&(Be.isWebGL2||Le.has("OES_texture_float")||Le.has("WEBGL_color_buffer_float")))&&!$e){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=E.width-Z&&$>=0&&$<=E.height-X&&G.readPixels(O,$,Z,X,V.convert(qe),V.convert(Ve),Ee)}finally{const ke=C!==null?He.get(C).__webglFramebuffer:null;be.bindFramebuffer(G.FRAMEBUFFER,ke)}}},this.copyFramebufferToTexture=function(E,O,$=0){const Z=Math.pow(2,-$),X=Math.floor(O.image.width*Z),Ee=Math.floor(O.image.height*Z);b.setTexture2D(O,0),G.copyTexSubImage2D(G.TEXTURE_2D,$,0,0,E.x,E.y,X,Ee),be.unbindTexture()},this.copyTextureToTexture=function(E,O,$,Z=0){const X=O.image.width,Ee=O.image.height,Ce=V.convert($.format),Oe=V.convert($.type);b.setTexture2D($,0),G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,$.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,$.unpackAlignment),O.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,Z,E.x,E.y,X,Ee,Ce,Oe,O.image.data):O.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,Z,E.x,E.y,O.mipmaps[0].width,O.mipmaps[0].height,Ce,O.mipmaps[0].data):G.texSubImage2D(G.TEXTURE_2D,Z,E.x,E.y,Ce,Oe,O.image),Z===0&&$.generateMipmaps&&G.generateMipmap(G.TEXTURE_2D),be.unbindTexture()},this.copyTextureToTexture3D=function(E,O,$,Z,X=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Ee=E.max.x-E.min.x+1,Ce=E.max.y-E.min.y+1,Oe=E.max.z-E.min.z+1,ke=V.convert(Z.format),qe=V.convert(Z.type);let Ve;if(Z.isData3DTexture)b.setTexture3D(Z,0),Ve=G.TEXTURE_3D;else if(Z.isDataArrayTexture||Z.isCompressedArrayTexture)b.setTexture2DArray(Z,0),Ve=G.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,Z.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,Z.unpackAlignment);const $e=G.getParameter(G.UNPACK_ROW_LENGTH),dt=G.getParameter(G.UNPACK_IMAGE_HEIGHT),Ft=G.getParameter(G.UNPACK_SKIP_PIXELS),xt=G.getParameter(G.UNPACK_SKIP_ROWS),ln=G.getParameter(G.UNPACK_SKIP_IMAGES),ct=$.isCompressedTexture?$.mipmaps[X]:$.image;G.pixelStorei(G.UNPACK_ROW_LENGTH,ct.width),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,ct.height),G.pixelStorei(G.UNPACK_SKIP_PIXELS,E.min.x),G.pixelStorei(G.UNPACK_SKIP_ROWS,E.min.y),G.pixelStorei(G.UNPACK_SKIP_IMAGES,E.min.z),$.isDataTexture||$.isData3DTexture?G.texSubImage3D(Ve,X,O.x,O.y,O.z,Ee,Ce,Oe,ke,qe,ct.data):$.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),G.compressedTexSubImage3D(Ve,X,O.x,O.y,O.z,Ee,Ce,Oe,ke,ct.data)):G.texSubImage3D(Ve,X,O.x,O.y,O.z,Ee,Ce,Oe,ke,qe,ct),G.pixelStorei(G.UNPACK_ROW_LENGTH,$e),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,dt),G.pixelStorei(G.UNPACK_SKIP_PIXELS,Ft),G.pixelStorei(G.UNPACK_SKIP_ROWS,xt),G.pixelStorei(G.UNPACK_SKIP_IMAGES,ln),X===0&&Z.generateMipmaps&&G.generateMipmap(Ve),be.unbindTexture()},this.initTexture=function(E){E.isCubeTexture?b.setTextureCube(E,0):E.isData3DTexture?b.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?b.setTexture2DArray(E,0):b.setTexture2D(E,0),be.unbindTexture()},this.resetState=function(){P=0,R=0,C=null,be.reset(),M.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===oo?"display-p3":"srgb",t.unpackColorSpace=ot.workingColorSpace===ts?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Mt?Jn:Oc}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Jn?Mt:yn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class $m extends il{}$m.prototype.isWebGL1Renderer=!0;class po{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ye(e),this.density=t}clone(){return new po(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class jm extends pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class qm{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ys,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=xn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ct=new I;class Zr{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix4(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.applyNormalMatrix(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.transformDirection(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=on(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=on(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=on(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=on(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),i=st(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),i=st(i,this.array),r=st(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),i=st(i,this.array),r=st(r,this.array),s=st(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new nn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Zr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class rl extends On{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ye(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ti;const $i=new I,wi=new I,Ai=new I,Ri=new Ue,ji=new Ue,sl=new ht,Dr=new I,qi=new I,Ir=new I,ja=new Ue,zs=new Ue,qa=new Ue;class Ym extends pt{constructor(e=new rl){if(super(),this.isSprite=!0,this.type="Sprite",Ti===void 0){Ti=new Gt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new qm(t,5);Ti.setIndex([0,1,2,0,2,3]),Ti.setAttribute("position",new Zr(i,3,0,!1)),Ti.setAttribute("uv",new Zr(i,2,3,!1))}this.geometry=Ti,this.material=e,this.center=new Ue(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),wi.setFromMatrixScale(this.matrixWorld),sl.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ai.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&wi.multiplyScalar(-Ai.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const a=this.center;Ur(Dr.set(-.5,-.5,0),Ai,a,wi,r,s),Ur(qi.set(.5,-.5,0),Ai,a,wi,r,s),Ur(Ir.set(.5,.5,0),Ai,a,wi,r,s),ja.set(0,0),zs.set(1,0),qa.set(1,1);let o=e.ray.intersectTriangle(Dr,qi,Ir,!1,$i);if(o===null&&(Ur(qi.set(-.5,.5,0),Ai,a,wi,r,s),zs.set(0,1),o=e.ray.intersectTriangle(Dr,Ir,qi,!1,$i),o===null))return;const c=e.ray.origin.distanceTo($i);c<e.near||c>e.far||t.push({distance:c,point:$i.clone(),uv:$t.getInterpolation($i,Dr,qi,Ir,ja,zs,qa,new Ue),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Ur(n,e,t,i,r,s){Ri.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(ji.x=s*Ri.x-r*Ri.y,ji.y=r*Ri.x+s*Ri.y):ji.copy(Ri),n.copy(e),n.x+=ji.x,n.y+=ji.y,n.applyMatrix4(sl)}class ol extends On{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ya=new I,Ka=new I,Za=new ht,ks=new ar,Nr=new or;class Km extends pt{constructor(e=new Gt,t=new ol){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)Ya.fromBufferAttribute(t,r-1),Ka.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Ya.distanceTo(Ka);e.setAttribute("lineDistance",new Kt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Nr.copy(i.boundingSphere),Nr.applyMatrix4(r),Nr.radius+=s,e.ray.intersectsSphere(Nr)===!1)return;Za.copy(r).invert(),ks.copy(e.ray).applyMatrix4(Za);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=new I,u=new I,f=new I,d=new I,m=this.isLineSegments?2:1,_=i.index,p=i.attributes.position;if(_!==null){const h=Math.max(0,a.start),S=Math.min(_.count,a.start+a.count);for(let x=h,T=S-1;x<T;x+=m){const P=_.getX(x),R=_.getX(x+1);if(l.fromBufferAttribute(p,P),u.fromBufferAttribute(p,R),ks.distanceSqToSegment(l,u,d,f)>c)continue;d.applyMatrix4(this.matrixWorld);const Q=e.ray.origin.distanceTo(d);Q<e.near||Q>e.far||t.push({distance:Q,point:f.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const h=Math.max(0,a.start),S=Math.min(p.count,a.start+a.count);for(let x=h,T=S-1;x<T;x+=m){if(l.fromBufferAttribute(p,x),u.fromBufferAttribute(p,x+1),ks.distanceSqToSegment(l,u,d,f)>c)continue;d.applyMatrix4(this.matrixWorld);const R=e.ray.origin.distanceTo(d);R<e.near||R>e.far||t.push({distance:R,point:f.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}class al extends On{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ye(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Ja=new ht,Qs=new ar,Or=new or,Fr=new I;class Zm extends pt{constructor(e=new Gt,t=new al){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Or.copy(i.boundingSphere),Or.applyMatrix4(r),Or.radius+=s,e.ray.intersectsSphere(Or)===!1)return;Ja.copy(r).invert(),Qs.copy(e.ray).applyMatrix4(Ja);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,f=i.attributes.position;if(l!==null){const d=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let _=d,g=m;_<g;_++){const p=l.getX(_);Fr.fromBufferAttribute(f,p),Qa(Fr,p,c,r,e,t,this)}}else{const d=Math.max(0,a.start),m=Math.min(f.count,a.start+a.count);for(let _=d,g=m;_<g;_++)Fr.fromBufferAttribute(f,_),Qa(Fr,_,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Qa(n,e,t,i,r,s,a){const o=Qs.distanceSqToPoint(n);if(o<t){const c=new I;Qs.closestPointToPoint(n,c),c.applyMatrix4(i);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,object:a})}}class Jm extends Ot{constructor(e,t,i,r,s,a,o,c,l){super(e,t,i,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Rn extends Gt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const u=[],f=new I,d=new I,m=[],_=[],g=[],p=[];for(let h=0;h<=i;h++){const S=[],x=h/i;let T=0;h===0&&a===0?T=.5/t:h===i&&c===Math.PI&&(T=-.5/t);for(let P=0;P<=t;P++){const R=P/t;f.x=-e*Math.cos(r+R*s)*Math.sin(a+x*o),f.y=e*Math.cos(a+x*o),f.z=e*Math.sin(r+R*s)*Math.sin(a+x*o),_.push(f.x,f.y,f.z),d.copy(f).normalize(),g.push(d.x,d.y,d.z),p.push(R+T,1-x),S.push(l++)}u.push(S)}for(let h=0;h<i;h++)for(let S=0;S<t;S++){const x=u[h][S+1],T=u[h][S],P=u[h+1][S],R=u[h+1][S+1];(h!==0||a>0)&&m.push(x,T,R),(h!==i-1||c<Math.PI)&&m.push(T,P,R)}this.setIndex(m),this.setAttribute("position",new Kt(_,3)),this.setAttribute("normal",new Kt(g,3)),this.setAttribute("uv",new Kt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Yi extends On{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fc,this.normalScale=new Ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class cl extends pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class Qm extends cl{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ye(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Hs=new ht,ec=new I,tc=new I;class eg{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ue(512,512),this.map=null,this.mapPass=null,this.matrix=new ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new uo,this._frameExtents=new Ue(1,1),this._viewportCount=1,this._viewports=[new St(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;ec.setFromMatrixPosition(e.matrixWorld),t.position.copy(ec),tc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(tc),t.updateMatrixWorld(),Hs.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Hs),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Hs)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class tg extends eg{constructor(){super(new Kc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class nc extends cl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.shadow=new tg}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ng{constructor(e,t,i=0,r=1/0){this.ray=new ar(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new co,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return eo(e,this,i,t),i.sort(ic),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)eo(e[r],this,i,t);return i.sort(ic),i}}function ic(n,e){return n.distance-e.distance}function eo(n,e,t,i){if(n.layers.test(e.layers)&&n.raycast(e,t),i===!0){const r=n.children;for(let s=0,a=r.length;s<a;s++)eo(r[s],e,t,!0)}}class rc{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Rt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ro}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ro);const sc={type:"change"},Gs={type:"start"},oc={type:"end"},Br=new ar,ac=new An,ig=Math.cos(70*wn.DEG2RAD);class rg extends ii{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ai.ROTATE,MIDDLE:ai.DOLLY,RIGHT:ai.PAN},this.touches={ONE:ci.ROTATE,TWO:ci.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(M){M.addEventListener("keydown",Pe),this._domElementKeyEvents=M},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Pe),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(sc),i.update(),s=r.NONE},this.update=function(){const M=new I,q=new ti().setFromUnitVectors(e.up,new I(0,1,0)),ae=q.clone().invert(),ee=new I,Y=new ti,w=new I,ne=2*Math.PI;return function(K=null){const he=i.object.position;M.copy(he).sub(i.target),M.applyQuaternion(q),o.setFromVector3(M),i.autoRotate&&s===r.NONE&&D(A(K)),i.enableDamping?(o.theta+=c.theta*i.dampingFactor,o.phi+=c.phi*i.dampingFactor):(o.theta+=c.theta,o.phi+=c.phi);let ye=i.minAzimuthAngle,we=i.maxAzimuthAngle;isFinite(ye)&&isFinite(we)&&(ye<-Math.PI?ye+=ne:ye>Math.PI&&(ye-=ne),we<-Math.PI?we+=ne:we>Math.PI&&(we-=ne),ye<=we?o.theta=Math.max(ye,Math.min(we,o.theta)):o.theta=o.theta>(ye+we)/2?Math.max(ye,o.theta):Math.min(we,o.theta)),o.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,o.phi)),o.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(u,i.dampingFactor):i.target.add(u),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor),i.zoomToCursor&&R||i.object.isOrthographicCamera?o.radius=oe(o.radius):o.radius=oe(o.radius*l),M.setFromSpherical(o),M.applyQuaternion(ae),he.copy(i.target).add(M),i.object.lookAt(i.target),i.enableDamping===!0?(c.theta*=1-i.dampingFactor,c.phi*=1-i.dampingFactor,u.multiplyScalar(1-i.dampingFactor)):(c.set(0,0,0),u.set(0,0,0));let tt=!1;if(i.zoomToCursor&&R){let Qe=null;if(i.object.isPerspectiveCamera){const Ne=M.length();Qe=oe(Ne*l);const it=Ne-Qe;i.object.position.addScaledVector(T,it),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){const Ne=new I(P.x,P.y,0);Ne.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/l)),i.object.updateProjectionMatrix(),tt=!0;const it=new I(P.x,P.y,0);it.unproject(i.object),i.object.position.sub(it).add(Ne),i.object.updateMatrixWorld(),Qe=M.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;Qe!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(Qe).add(i.object.position):(Br.origin.copy(i.object.position),Br.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(Br.direction))<ig?e.lookAt(i.target):(ac.setFromNormalAndCoplanarPoint(i.object.up,i.target),Br.intersectPlane(ac,i.target))))}else i.object.isOrthographicCamera&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/l)),i.object.updateProjectionMatrix(),tt=!0);return l=1,R=!1,tt||ee.distanceToSquared(i.object.position)>a||8*(1-Y.dot(i.object.quaternion))>a||w.distanceToSquared(i.target)>0?(i.dispatchEvent(sc),ee.copy(i.object.position),Y.copy(i.object.quaternion),w.copy(i.target),!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",nt),i.domElement.removeEventListener("pointerdown",b),i.domElement.removeEventListener("pointercancel",k),i.domElement.removeEventListener("wheel",fe),i.domElement.removeEventListener("pointermove",v),i.domElement.removeEventListener("pointerup",k),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",Pe),i._domElementKeyEvents=null)};const i=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const a=1e-6,o=new rc,c=new rc;let l=1;const u=new I,f=new Ue,d=new Ue,m=new Ue,_=new Ue,g=new Ue,p=new Ue,h=new Ue,S=new Ue,x=new Ue,T=new I,P=new Ue;let R=!1;const C=[],Q={};let y=!1;function A(M){return M!==null?2*Math.PI/60*i.autoRotateSpeed*M:2*Math.PI/60/60*i.autoRotateSpeed}function U(M){const q=Math.abs(M*.01);return Math.pow(.95,i.zoomSpeed*q)}function D(M){c.theta-=M}function H(M){c.phi-=M}const L=function(){const M=new I;return function(ae,ee){M.setFromMatrixColumn(ee,0),M.multiplyScalar(-ae),u.add(M)}}(),z=function(){const M=new I;return function(ae,ee){i.screenSpacePanning===!0?M.setFromMatrixColumn(ee,1):(M.setFromMatrixColumn(ee,0),M.crossVectors(i.object.up,M)),M.multiplyScalar(ae),u.add(M)}}(),W=function(){const M=new I;return function(ae,ee){const Y=i.domElement;if(i.object.isPerspectiveCamera){const w=i.object.position;M.copy(w).sub(i.target);let ne=M.length();ne*=Math.tan(i.object.fov/2*Math.PI/180),L(2*ae*ne/Y.clientHeight,i.object.matrix),z(2*ee*ne/Y.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(L(ae*(i.object.right-i.object.left)/i.object.zoom/Y.clientWidth,i.object.matrix),z(ee*(i.object.top-i.object.bottom)/i.object.zoom/Y.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function re(M){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?l/=M:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function ie(M){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?l*=M:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function J(M,q){if(!i.zoomToCursor)return;R=!0;const ae=i.domElement.getBoundingClientRect(),ee=M-ae.left,Y=q-ae.top,w=ae.width,ne=ae.height;P.x=ee/w*2-1,P.y=-(Y/ne)*2+1,T.set(P.x,P.y,1).unproject(i.object).sub(i.object.position).normalize()}function oe(M){return Math.max(i.minDistance,Math.min(i.maxDistance,M))}function me(M){f.set(M.clientX,M.clientY)}function ge(M){J(M.clientX,M.clientX),h.set(M.clientX,M.clientY)}function F(M){_.set(M.clientX,M.clientY)}function se(M){d.set(M.clientX,M.clientY),m.subVectors(d,f).multiplyScalar(i.rotateSpeed);const q=i.domElement;D(2*Math.PI*m.x/q.clientHeight),H(2*Math.PI*m.y/q.clientHeight),f.copy(d),i.update()}function ve(M){S.set(M.clientX,M.clientY),x.subVectors(S,h),x.y>0?re(U(x.y)):x.y<0&&ie(U(x.y)),h.copy(S),i.update()}function Te(M){g.set(M.clientX,M.clientY),p.subVectors(g,_).multiplyScalar(i.panSpeed),W(p.x,p.y),_.copy(g),i.update()}function Re(M){J(M.clientX,M.clientY),M.deltaY<0?ie(U(M.deltaY)):M.deltaY>0&&re(U(M.deltaY)),i.update()}function Ie(M){let q=!1;switch(M.code){case i.keys.UP:M.ctrlKey||M.metaKey||M.shiftKey?H(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):W(0,i.keyPanSpeed),q=!0;break;case i.keys.BOTTOM:M.ctrlKey||M.metaKey||M.shiftKey?H(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):W(0,-i.keyPanSpeed),q=!0;break;case i.keys.LEFT:M.ctrlKey||M.metaKey||M.shiftKey?D(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):W(i.keyPanSpeed,0),q=!0;break;case i.keys.RIGHT:M.ctrlKey||M.metaKey||M.shiftKey?D(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):W(-i.keyPanSpeed,0),q=!0;break}q&&(M.preventDefault(),i.update())}function ze(M){if(C.length===1)f.set(M.pageX,M.pageY);else{const q=V(M),ae=.5*(M.pageX+q.x),ee=.5*(M.pageY+q.y);f.set(ae,ee)}}function De(M){if(C.length===1)_.set(M.pageX,M.pageY);else{const q=V(M),ae=.5*(M.pageX+q.x),ee=.5*(M.pageY+q.y);_.set(ae,ee)}}function Ke(M){const q=V(M),ae=M.pageX-q.x,ee=M.pageY-q.y,Y=Math.sqrt(ae*ae+ee*ee);h.set(0,Y)}function G(M){i.enableZoom&&Ke(M),i.enablePan&&De(M)}function mt(M){i.enableZoom&&Ke(M),i.enableRotate&&ze(M)}function Le(M){if(C.length==1)d.set(M.pageX,M.pageY);else{const ae=V(M),ee=.5*(M.pageX+ae.x),Y=.5*(M.pageY+ae.y);d.set(ee,Y)}m.subVectors(d,f).multiplyScalar(i.rotateSpeed);const q=i.domElement;D(2*Math.PI*m.x/q.clientHeight),H(2*Math.PI*m.y/q.clientHeight),f.copy(d)}function Be(M){if(C.length===1)g.set(M.pageX,M.pageY);else{const q=V(M),ae=.5*(M.pageX+q.x),ee=.5*(M.pageY+q.y);g.set(ae,ee)}p.subVectors(g,_).multiplyScalar(i.panSpeed),W(p.x,p.y),_.copy(g)}function be(M){const q=V(M),ae=M.pageX-q.x,ee=M.pageY-q.y,Y=Math.sqrt(ae*ae+ee*ee);S.set(0,Y),x.set(0,Math.pow(S.y/h.y,i.zoomSpeed)),re(x.y),h.copy(S);const w=(M.pageX+q.x)*.5,ne=(M.pageY+q.y)*.5;J(w,ne)}function rt(M){i.enableZoom&&be(M),i.enablePan&&Be(M)}function He(M){i.enableZoom&&be(M),i.enableRotate&&Le(M)}function b(M){i.enabled!==!1&&(C.length===0&&(i.domElement.setPointerCapture(M.pointerId),i.domElement.addEventListener("pointermove",v),i.domElement.addEventListener("pointerup",k)),We(M),M.pointerType==="touch"?Ge(M):de(M))}function v(M){i.enabled!==!1&&(M.pointerType==="touch"?ue(M):le(M))}function k(M){N(M),C.length===0&&(i.domElement.releasePointerCapture(M.pointerId),i.domElement.removeEventListener("pointermove",v),i.domElement.removeEventListener("pointerup",k)),i.dispatchEvent(oc),s=r.NONE}function de(M){let q;switch(M.button){case 0:q=i.mouseButtons.LEFT;break;case 1:q=i.mouseButtons.MIDDLE;break;case 2:q=i.mouseButtons.RIGHT;break;default:q=-1}switch(q){case ai.DOLLY:if(i.enableZoom===!1)return;ge(M),s=r.DOLLY;break;case ai.ROTATE:if(M.ctrlKey||M.metaKey||M.shiftKey){if(i.enablePan===!1)return;F(M),s=r.PAN}else{if(i.enableRotate===!1)return;me(M),s=r.ROTATE}break;case ai.PAN:if(M.ctrlKey||M.metaKey||M.shiftKey){if(i.enableRotate===!1)return;me(M),s=r.ROTATE}else{if(i.enablePan===!1)return;F(M),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(Gs)}function le(M){switch(s){case r.ROTATE:if(i.enableRotate===!1)return;se(M);break;case r.DOLLY:if(i.enableZoom===!1)return;ve(M);break;case r.PAN:if(i.enablePan===!1)return;Te(M);break}}function fe(M){i.enabled===!1||i.enableZoom===!1||s!==r.NONE||(M.preventDefault(),i.dispatchEvent(Gs),Re(Ae(M)),i.dispatchEvent(oc))}function Ae(M){const q=M.deltaMode,ae={clientX:M.clientX,clientY:M.clientY,deltaY:M.deltaY};switch(q){case 1:ae.deltaY*=16;break;case 2:ae.deltaY*=100;break}return M.ctrlKey&&!y&&(ae.deltaY*=10),ae}function Me(M){M.key==="Control"&&(y=!0,document.addEventListener("keyup",Se,{passive:!0,capture:!0}))}function Se(M){M.key==="Control"&&(y=!1,document.removeEventListener("keyup",Se,{passive:!0,capture:!0}))}function Pe(M){i.enabled===!1||i.enablePan===!1||Ie(M)}function Ge(M){switch(B(M),C.length){case 1:switch(i.touches.ONE){case ci.ROTATE:if(i.enableRotate===!1)return;ze(M),s=r.TOUCH_ROTATE;break;case ci.PAN:if(i.enablePan===!1)return;De(M),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(i.touches.TWO){case ci.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;G(M),s=r.TOUCH_DOLLY_PAN;break;case ci.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;mt(M),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(Gs)}function ue(M){switch(B(M),s){case r.TOUCH_ROTATE:if(i.enableRotate===!1)return;Le(M),i.update();break;case r.TOUCH_PAN:if(i.enablePan===!1)return;Be(M),i.update();break;case r.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;rt(M),i.update();break;case r.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;He(M),i.update();break;default:s=r.NONE}}function nt(M){i.enabled!==!1&&M.preventDefault()}function We(M){C.push(M.pointerId)}function N(M){delete Q[M.pointerId];for(let q=0;q<C.length;q++)if(C[q]==M.pointerId){C.splice(q,1);return}}function B(M){let q=Q[M.pointerId];q===void 0&&(q=new Ue,Q[M.pointerId]=q),q.set(M.pageX,M.pageY)}function V(M){const q=M.pointerId===C[0]?C[1]:C[0];return Q[q]}i.domElement.addEventListener("contextmenu",nt),i.domElement.addEventListener("pointerdown",b),i.domElement.addEventListener("pointercancel",k),i.domElement.addEventListener("wheel",fe,{passive:!1}),document.addEventListener("keydown",Me,{passive:!0,capture:!0}),this.update()}}const ll="mempalace-viz-graph-rel-filters-v1",cc={tunnel:{label:"Tunnel",shortLabel:"Tunnel",description:"Same room name appearing in multiple wings — a cross-wing structural link from tunnel discovery (not semantic similarity)."},taxonomy_adjacency:{label:"Taxonomy adjacency",shortLabel:"Adjacency",description:"Inferred same-wing neighbor: consecutive rooms when sorted by name (structural chain, not topical similarity)."},unknown:{label:"Other",shortLabel:"Other",description:"Edges whose relationship type is not listed in the viewer registry."}};function to(n){const e=n&&cc[n]?n:"unknown";return{type:e,...cc[e]}}function rs(n){if(!n||typeof n!="object")return"tunnel";const e=n.relationshipType;return typeof e=="string"&&e.trim()?e.trim():"tunnel"}function mo(n){const e=new Set;for(const t of n||[])e.add(rs(t));return[...e].sort()}function sg(n){const e=n||"tunnel";return e==="tunnel"?{color:5999871,opacity:.44}:e==="taxonomy_adjacency"?{color:4049336,opacity:.28}:e==="unknown"?{color:9741240,opacity:.32}:{color:10980346,opacity:.3}}function og(n,e){const t=new Set(e||[]);if(t.size===0)return new Set;if(n==null)return new Set(t);if(Array.isArray(n)&&n.length===0)return new Set;const i=new Set;for(const r of n)typeof r=="string"&&t.has(r)&&i.add(r);return i}function go(n,e){const t=[...e||[]].sort();return t.length===0?null:!n||n.size===0?new Set:n.size===t.length&&t.every(r=>n.has(r))?null:n}function _o(n,e){if(!e||e.size===0)return[];const t=[];for(const i of n||[])e.has(rs(i))&&t.push(i);return t}function ag(n){const e={};for(const t of n||[]){const i=rs(t);e[i]=(e[i]||0)+1}return e}function cg(n,e){const t=_o(n,e);return{visibleEdgeCount:t.length,visibleByType:ag(t),visibleEdges:t}}function lg(n){if(!n||typeof n!="object")return null;const e=n.enabledTypes;return Array.isArray(e)?e.filter(t=>typeof t=="string"):null}function ug(n,e){const t=[],i=n==null?void 0:n.sources;Array.isArray(i)&&i.length&&t.push(`Sources: ${i.join(", ")}`);const r=n==null?void 0:n.truncatedSources;Array.isArray(r)&&r.some(o=>o==null?void 0:o.truncated)&&t.push("Some sources may be truncated upstream — tunnel list can be incomplete.");const s=((n==null?void 0:n.completenessNotes)||[]).filter(Boolean);s.length&&t.push(s[0]);const a=e!=null&&e.byType&&typeof e.byType=="object"?e.byType:null;if(a&&Object.keys(a).length){const o=Object.entries(a).map(([c,l])=>`${c}: ${l}`).join(" · ");t.push(`Types in payload: ${o}`)}return t.filter(Boolean).join(" ")}function sr(n,e=6){if(!n||typeof n!="object")return"";const t=Object.entries(n).filter(([,r])=>r>0).sort((r,s)=>s[1]-r[1]);return t.length?t.slice(0,e).map(([r,s])=>{const a=to(r);return`${s} ${a.shortLabel.toLowerCase()}`}).join(" · "):""}function hg(n,e){const t=Object.values(n||{}).reduce((c,l)=>c+l,0),i=Object.values(e||{}).reduce((c,l)=>c+l,0);if(i===0)return null;const r=(n==null?void 0:n.tunnel)||0,s=(n==null?void 0:n.taxonomy_adjacency)||0,a=(e==null?void 0:e.tunnel)||0,o=(e==null?void 0:e.taxonomy_adjacency)||0;return t===0&&i>0?"No visible links with current filters; totals above are global.":s>r*2&&o>0?"Most of this room’s visible links are inferred same-wing adjacency.":r>s*2&&a>0?"Most of this room’s visible links are cross-wing tunnel connections.":r>0&&s===0&&o>0?"Only tunnel links are visible; inferred adjacency is hidden by filters.":s>0&&r===0&&a>0?"Only inferred adjacency is visible; tunnel links are hidden by filters.":null}function dg(n,e,t){const i=Math.max(1,n),r=Math.max(0,e),s=Math.max(1,t),a=r/i;let o=0;i>90||a>2.8?o=3:i>48||a>1.75?o=2:(i>24||a>1.05)&&(o=1);const c=o>=3?85:o>=2?130:o>=1?175:235,l=.00155+o*42e-5,u=o>=2?.68:o>=1?.82:1,f=o>=3?.74:o>=2?.86:1,d=o>=2?1.08:1,m=1+o*.22,_=1-o*.04,g=1+o*.12,p=.004+o*.0025,h=4+o*5,S=2.1+o*.55,x=48+o*14;return{tier:o,nodeCount:i,edgeCount:r,wingCount:s,edgeDensity:a,labelBudget:c,fogDensity:l,adjacencyOpacityMult:u,globalEdgeOpacityMult:f,tunnelEmphasisMult:d,repelScale:m,attractScale:_,centerScale:g,wingCohesion:p,depthJitter:h,collisionMinDist:S,forceIterations:x}}function fg(n){return{repelStrength:88*n.repelScale,attractStrength:.0115*n.attractScale,centerStrength:.0052*n.centerScale,wingCohesion:n.wingCohesion,iterations:n.forceIterations}}function zr(n){let e=2166136261;const t=String(n||"");for(let i=0;i<t.length;i+=1)e^=t.charCodeAt(i),e=Math.imul(e,16777619);return(e>>>0)/4294967296}function pg(n,e,t){const i=Math.max(1,e.length),r=26+Math.min(48,n.length*.35),s=7+t.tier*2.2,a=9+t.tier*1.8,o=new Map;e.forEach((l,u)=>{const f=u/i*Math.PI*2,d=r*(1+u%5*.04),m=Math.cos(f)*d,_=Math.sin(f)*d,g=((u+.5)/i-.5)*s*2.2;o.set(l,{x:m,y:g,z:_})});const c=new Map;n.forEach(l=>{if(l.type==="room"&&l.wing){const u=c.get(l.wing)||[];u.push(l),c.set(l.wing,u)}}),e.forEach(l=>{const u=c.get(l)||[],f=o.get(l)||{x:0,y:0,z:0},d=Math.max(u.length,1);u.forEach((m,_)=>{const g=_/d*Math.PI*2,p=zr(`${l}|${m.name}|${_}`),h=zr(`${m.name}|z`),S=a*(.45+.55*p),x=(h-.5)*t.depthJitter;m.x=f.x+Math.cos(g)*S,m.y=f.y+Math.sin(g*1.7)*S*.42+x,m.z=f.z+Math.sin(g)*S})}),n.forEach(l=>{if(l.type==="wing"){const u=o.get(l.name)||{x:0,y:0,z:0},f=zr(`wing|${l.name}`);l.x=u.x*.22+(f-.5)*3,l.y=u.y+(f-.5)*4,l.z=u.z*.22+(zr(`${l.name}z`)-.5)*3}})}function mg(n,e,t,i){const r=fg(t),{repelStrength:s,attractStrength:a,centerStrength:o,wingCohesion:c,iterations:l}=r,u=new Map;n.forEach(f=>{f.type==="wing"&&f.name&&u.set(f.name,f)});for(let f=0;f<l;f+=1){for(let d=0;d<n.length;d+=1)for(let m=d+1;m<n.length;m+=1){const _=n[d].x-n[m].x,g=n[d].y-n[m].y,p=n[d].z-n[m].z,h=Math.sqrt(_*_+g*g+p*p)+.12;let S=s/(h*h);const x=n[d].wing,T=n[m].wing;x&&T&&x!==T&&(S*=1.12),n[d].x+=_*S,n[d].y+=g*S,n[d].z+=p*S,n[m].x-=_*S,n[m].y-=g*S,n[m].z-=p*S}e.forEach(d=>{const m=i(n,d,"from"),_=i(n,d,"to");if(m&&_){let g=_.x-m.x,p=_.y-m.y,h=_.z-m.z,S=a;m.wing&&_.wing&&m.wing!==_.wing&&(S*=1.15),m.x+=g*S,m.y+=p*S,m.z+=h*S,_.x-=g*S,_.y-=p*S,_.z-=h*S}}),n.forEach(d=>{if(d.type==="room"&&d.wing){const m=u.get(d.wing);m&&(d.x+=(m.x-d.x)*c,d.y+=(m.y-d.y)*c,d.z+=(m.z-d.z)*c)}d.x*=1-o,d.y*=1-o,d.z*=1-o})}}function gg(n,e,t=10){for(let i=0;i<t;i+=1)for(let r=0;r<n.length;r+=1)for(let s=r+1;s<n.length;s+=1){const a=n[r],o=n[s];let c=a.x-o.x,l=a.y-o.y,u=a.z-o.z;const f=Math.sqrt(c*c+l*l+u*u)+1e-8;if(f<e){const d=(e-f)*.52,m=c/f,_=l/f,g=u/f;a.x+=m*d,a.y+=_*d,a.z+=g*d,o.x-=m*d,o.y-=_*d,o.z-=g*d}}}function _g(n,e){const{selectedId:t,hoveredId:i,pinActive:r,budget:s}=e,a=Math.max(8,Math.floor(s)),o=n.map(({id:c,baseScore:l})=>{let u=l;return c===t&&(u+=1e6),r&&c===t&&(u+=2e5),c===i&&(u+=5e5),{id:c,score:u}});return o.sort((c,l)=>l.score-c.score),new Set(o.slice(0,a).map(c=>c.id))}function vg(n){const e=Math.min(220,(n.incidentFull||0)*24),t=Math.min(100,(n.drawers||0)*1.8),i=n.type==="wing"?45:0;return 20+e+t+i}function xg(n){const{selectedId:e,hoveredId:t,fromId:i,toId:r,relationshipType:s,densityTier:a}=n,o=e||t,c=o&&(i===o||r===o),l=s==="tunnel";return o?c?l?1.22:1.05:a>=2?.38:a>=1?.52:.62:a>=3?l?.92:.78:1}function lc(n,e,t){const i=e*Math.PI/180,r=1.28+t*.06,a=Math.max(4,n)*r/Math.tan(i/2),o=16+t*4;return Math.min(240,Math.max(o,a))}function yg(n,e){let t=0;for(const i of e){const r=i.x-n.x,s=i.y-n.y,a=i.z-n.z;t=Math.max(t,Math.sqrt(r*r+s*s+a*a))}return t}function Jr(n){return n?n.type==="wing"&&n.name?`wing:${n.name}`:n.type==="room"&&n.wing&&n.name?`room:${n.wing}:${n.name}`:null:null}function Mg(n,e,t){const i=new Map;for(const r of e||[]){const s=t(n,r,"from"),a=t(n,r,"to"),o=Jr(s),c=Jr(a);o!=null&&o.startsWith("room:")&&i.set(o,(i.get(o)||0)+1),c!=null&&c.startsWith("room:")&&i.set(c,(i.get(c)||0)+1)}return i}function kr(n,e,t){const i=t==="from"?e.sourceRoomId||e.from:e.targetRoomId||e.to;if(i==null)return null;const r=String(i);return n.find(s=>s.type!=="room"?!1:It(s.wing,s.name)===r||!r.includes("/")&&s.name===r?!0:`${s.wing}/${s.name}`===r)}const lt={wingColors:{projects:"#8b9cf8",shared_grocery_list:"#6ee7b7",openclaw:"#94a3b8",default:"#fbbf24"},nodeSizes:{wingMin:3,wingMax:8,roomMin:.8,roomMax:2.5},spacing:{wingSeparation:40,roomRadius:15},accent:{linkWing:4015188,center:14870768}};function Eg(n){let e=0;const t=String(n||"");for(let i=0;i<t.length;i+=1)e=e*31+t.charCodeAt(i)>>>0;return e%360}function no(n){return lt.wingColors[n]?lt.wingColors[n]:`hsl(${Eg(n)}, 52%, 68%)`}function Sg(n){n.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose())})}function bg(n){var e,t;(e=n.geometry)==null||e.dispose(),(t=n.material)==null||t.dispose()}function Tg(n,e={}){var We;let t,i,r,s,a,o=0,c=null,l={},u={},f=[],d=[],m=[],_=[],g=new Map,p=[],h=null,S=null,x="wings",T=null,P=1,R=!0,C=!0,Q=null,y={searchQuery:"",hoveredId:null,selectedId:null,pinActive:!1,relationshipTypesVisible:null},A=typeof window<"u"&&((We=window.matchMedia)==null?void 0:We.call(window,"(prefers-reduced-motion: reduce)").matches);const U=new Map,D=new Map,H={onHover:e.onHover||(()=>{}),onClick:e.onClick||(()=>{})},L=new ng,z=new Ue;function W(N,B,V=850){const M=i.position.clone(),q=s.target.clone(),ae=performance.now();c&&cancelAnimationFrame(c);function ee(){const Y=Math.min((performance.now()-ae)/V,1),w=1-(1-Y)**3;i.position.lerpVectors(M,N,w),s.target.lerpVectors(q,B,w),s.update(),Y<1?c=requestAnimationFrame(ee):c=null}c=requestAnimationFrame(ee)}function re(){var N;d.forEach(({mesh:B})=>{t.remove(B),Sg(B)}),m.forEach(({line:B})=>{t.remove(B),bg(B)}),_.forEach(({sprite:B})=>{var V;t.remove(B),(V=B.material.map)==null||V.dispose(),B.material.dispose()}),d=[],m=[],_=[],g=new Map,p=[],h=null,S=null,(N=t==null?void 0:t.fog)!=null&&N.isFogExp2&&(t.fog.density=.0026),a!=null&&a.material&&(a.material.opacity=.35),U.clear(),D.clear()}function ie(){const N=new Gt,B=[];for(let M=0;M<1800;M+=1)B.push(wn.randFloatSpread(380),wn.randFloatSpread(200),wn.randFloatSpread(380));N.setAttribute("position",new Kt(B,3));const V=new al({color:9741240,size:.45,transparent:!0,opacity:.35,depthWrite:!1});a=new Zm(N,V),t.add(a)}function J(N,B="#e2e8f0"){const V=document.createElement("canvas"),M=V.getContext("2d"),q=16;M.font="500 22px ui-sans-serif, system-ui, sans-serif";const ae=Math.ceil(M.measureText(N).width)+q*2;V.width=ae,V.height=44,M.font="500 22px ui-sans-serif, system-ui, sans-serif",M.fillStyle="rgba(15,23,42,0.88)",M.fillRect(4,4,ae-8,36),M.fillStyle=B,M.fillText(N,q,28);const ee=new Jm(V);ee.needsUpdate=!0;const Y=new rl({map:ee,transparent:!0,depthWrite:!1}),w=new Ym(Y),ne=.022*ae;return w.scale.set(ne,11,1),w}function oe(N,B,V){const M=B.material;U.set(N,{mesh:B,data:V,id:N,baseOpacity:M.opacity,baseEmissive:M.emissiveIntensity,baseScale:1,presentationOpacity:1}),B.userData.nodeId=N}function me(N,B,V,M,q,ae){const ee=J(B,ae);ee.visible=R,ee.position.set(V,M+2.2,q),t.add(ee),_.push({sprite:ee,nodeId:N}),D.set(N,ee)}function ge(N,B,V,M=.28,q={}){const ae=[new I(...N),new I(...B)],ee=new Gt().setFromPoints(ae),Y=new ol({color:V,transparent:!0,opacity:M}),w=new Km(ee,Y);return w.userData=q,t.add(w),m.push({line:w,...q}),w}function F(N,B,V,M,q){const ae=no(N),ee=new Ye(ae),Y=`wing:${N}`,w=new Rn(q,28,28),ne=new Yi({color:ee,emissive:ee,emissiveIntensity:.22,metalness:.15,roughness:.45,transparent:!0,opacity:.92}),te=new Nt(w,ne);te.position.set(B,V,M),te.userData={id:Y,name:N,wingId:N,type:"wing",drawers:l[N],label:N,_baseY:V};const K=new Rn(q*1.25,24,24),he=new lo({color:ee,transparent:!0,opacity:.08,side:Ut,depthWrite:!1}),ye=new Nt(K,he);return te.add(ye),t.add(te),d.push({mesh:te,data:te.userData}),oe(Y,te,te.userData),te}function se(N,B,V,M,q,ae){const ee=no(B),Y=new Ye(ee);Y.offsetHSL(0,-.05,-.06);const w=`room:${B}:${N}`,ne=new Rn(ae,20,20),te=new Yi({color:Y,emissive:Y,emissiveIntensity:.18,metalness:.12,roughness:.5,transparent:!0,opacity:.88}),K=new Nt(ne,te);K.position.set(V,M,q);const he=(u[B]||[]).find(we=>we.name===N),ye=(he==null?void 0:he.roomId)||It(B,N);return K.userData={id:w,name:N,type:"room",wing:B,wingId:B,roomId:ye,drawers:he==null?void 0:he.drawers,label:N,_baseY:M},t.add(K),d.push({mesh:K,data:K.userData}),oe(w,K,K.userData),K}function ve(N,B){if(!B)return!0;const V=[N.name,N.label,N.wing,N.type].filter(Boolean).join(" ").toLowerCase();return V.includes(B)||B.split(/\s+/).every(M=>M.length<2||V.includes(M))}function Te(N){return N==null?"":[...N].sort().join("\0")}function Re(N,B){return N.searchQuery===B.searchQuery&&N.hoveredId===B.hoveredId&&N.selectedId===B.selectedId&&N.pinActive===B.pinActive&&Te(N.relationshipTypesVisible)===Te(B.relationshipTypesVisible)}function Ie(){const N=(y.searchQuery||"").trim().toLowerCase(),B=y.hoveredId,V=y.selectedId,M=y.pinActive,q=y.relationshipTypesVisible,ae=new Map,ee=(h==null?void 0:h.tier)??0,Y=(h==null?void 0:h.globalEdgeOpacityMult)??1,w=(h==null?void 0:h.adjacencyOpacityMult)??1,ne=(h==null?void 0:h.tunnelEmphasisMult)??1;if(m.forEach(te=>{var cn,zn;const{line:K,fromId:he,toId:ye,baseOpacity:we=.28,isGraphRelationship:tt,relationshipType:Qe}=te,Ne=he?ve(((cn=U.get(he))==null?void 0:cn.data)||{},N):!0,it=ye?ve(((zn=U.get(ye))==null?void 0:zn.data)||{},N):!0,gt=!N||Ne&&it;let Bn=!0;if(tt&&q!=null){const rn=Qe||"tunnel";Bn=q.has(rn)}if(!gt){K.visible=!0,K.material.opacity=we*.12;return}if(tt&&!Bn){K.visible=!1;return}K.visible=!0;let an=we;if(tt){const rn=Qe||"tunnel";rn==="taxonomy_adjacency"&&(an*=w),rn==="tunnel"&&(an*=ne),an*=Y,an*=xg({selectedId:V,hoveredId:B,fromId:he,toId:ye,relationshipType:rn,densityTier:ee})}K.material.opacity=an,tt&&(he&&ae.set(he,(ae.get(he)||0)+1),ye&&ae.set(ye,(ae.get(ye)||0)+1))}),U.forEach((te,K)=>{const{mesh:he,data:ye,baseOpacity:we,baseEmissive:tt}=te,Qe=he.material;if(!Qe||Qe.type==="MeshBasicMaterial")return;const Ne=ve(ye,N);let it=Ne?1:.14,gt=1;K===B&&(gt*=1.45),K===V&&(gt*=M?1.85:1.65),K===V&&M&&(it=Math.max(it,.85));const Bn=g.get(K)||0,an=ae.get(K)||0;ye.type==="room"&&Bn>0&&an===0&&x==="graph"&&(it*=.32,gt*=.55),te.presentationOpacity=Math.min(1,it),Qe.opacity=Math.min(1,we*it),Qe.emissiveIntensity=tt*gt;const cn=K===V?M?1.09:1.06:K===B?1.04:1,zn=Ne?1:.88;he.scale.setScalar(cn*zn)}),x==="graph"&&p.length){const te=(h==null?void 0:h.labelBudget)??180,K=_g(p,{selectedId:V,hoveredId:B,pinActive:M,budget:te});D.forEach((he,ye)=>{var Ne;const we=(Ne=U.get(ye))==null?void 0:Ne.data;if(!we)return;const tt=ve(we,N),Qe=K.has(ye);he.visible=R&&Qe,he.material.opacity=tt?ye===V?1:ye===B?.96:.88:.18})}else D.forEach((te,K)=>{var we;const he=(we=U.get(K))==null?void 0:we.data;if(!he)return;const ye=ve(he,N);te.visible=R,te.material.opacity=ye?K===V?1:.92:.2})}function ze(){const N=Object.keys(l);if(!N.length)return;const B=Math.PI*2/N.length,V=lt.spacing.wingSeparation/2;N.forEach((ee,Y)=>{const w=Y*B,ne=Math.cos(w)*V,te=Math.sin(w)*V,K=l[ee]||1,he=wn.mapLinear(K,1,200,lt.nodeSizes.wingMin,lt.nodeSizes.wingMax);F(ee,ne,0,te,he),me(`wing:${ee}`,ee,ne,0,te,"#e2e8f0")});const M=new Rn(1.1,20,20),q=new Yi({color:lt.accent.center,emissive:3359061,emissiveIntensity:.4,metalness:.3,roughness:.4,transparent:!0,opacity:.55}),ae=new Nt(M,q);t.add(ae),d.push({mesh:ae,data:{name:"Palace core",type:"center"}}),N.forEach((ee,Y)=>{const w=Y*B,ne=Math.cos(w)*V,te=Math.sin(w)*V;ge([0,0,0],[ne,0,te],lt.accent.linkWing,.22,{fromId:null,toId:`wing:${ee}`,baseOpacity:.22})}),W(new I(0,36,88),new I(0,0,0))}function De(N){const B=u[N]||[],V=lt.nodeSizes.wingMin+1.2;F(N,0,0,0,V),me(`wing:${N}`,N,0,0,0,"#e2e8f0");const M=lt.spacing.roomRadius,q=Math.max(B.length,1),ae=Math.PI*2/q;B.forEach((ee,Y)=>{const w=Y*ae,ne=Math.cos(w)*M,te=Math.sin(w)*M,K=wn.mapLinear(ee.drawers||1,1,80,lt.nodeSizes.roomMin,lt.nodeSizes.roomMax);se(ee.name,N,ne,0,te,K),ge([0,0,0],[ne,0,te],lt.accent.linkWing,.22,{fromId:`wing:${N}`,toId:`room:${N}:${ee.name}`,baseOpacity:.22}),me(`room:${N}:${ee.name}`,ee.name,ne,0,te,"#94a3b8")}),W(new I(0,38,72),new I(0,0,0))}function Ke(){const N=Object.keys(u);if(!N.length)return;const B=Math.PI*2/N.length,V=lt.spacing.wingSeparation/2;N.forEach((ee,Y)=>{const w=Y*B,ne=Math.cos(w)*V,te=Math.sin(w)*V;F(ee,ne,0,te,lt.nodeSizes.wingMin),me(`wing:${ee}`,ee,ne,0,te,"#cbd5e1");const K=u[ee]||[],he=Math.PI*2/Math.max(K.length,1),ye=lt.spacing.roomRadius;K.forEach((we,tt)=>{const Qe=w+tt*he,Ne=ne+Math.cos(Qe)*ye,it=te+Math.sin(Qe)*ye,gt=wn.mapLinear(we.drawers||1,1,80,lt.nodeSizes.roomMin,lt.nodeSizes.roomMax);se(we.name,ee,Ne,0,it,gt),ge([ne,0,te],[Ne,0,it],lt.accent.linkWing,.18,{fromId:`wing:${ee}`,toId:`room:${ee}:${we.name}`,baseOpacity:.18}),me(`room:${ee}:${we.name}`,we.name,Ne,0,it,"#94a3b8")})});const M=new Rn(1.1,20,20),q=new Yi({color:lt.accent.center,emissive:3359061,emissiveIntensity:.35,metalness:.25,roughness:.45,transparent:!0,opacity:.5}),ae=new Nt(M,q);t.add(ae),d.push({mesh:ae,data:{name:"Palace core",type:"center"}}),N.forEach((ee,Y)=>{const w=Y*B;ge([0,0,0],[Math.cos(w)*V,0,Math.sin(w)*V],lt.accent.linkWing,.2,{baseOpacity:.2})}),W(new I(0,52,102),new I(0,0,0))}function G(){T&&u[T]?De(T):Ke()}function mt(N){return[...N].sort((B,V)=>B.localeCompare(V))}function Le(N,B){const V=N.filter(q=>q.id.startsWith("room:")),M=B.nodeCount>300?B.labelBudget*5:B.nodeCount>160?B.labelBudget*4:V.length;return V.sort((q,ae)=>ae.baseScore-q.baseScore),new Set(V.slice(0,Math.min(V.length,M)).map(q=>q.id))}function Be(){const N=new Map;Object.keys(l).forEach(K=>{N.set(K,{name:K,type:"wing",wing:K,x:0,y:0,z:0})}),Object.entries(u).forEach(([K,he])=>{he.forEach(ye=>{N.set(It(K,ye.name),{name:ye.name,type:"room",wing:K,x:0,y:0,z:0,drawers:ye.drawers})})});const B=Array.from(N.values());if(!B.length){const K=new Rn(1.1,16,16),he=new Yi({color:lt.accent.center,emissive:3359061,emissiveIntensity:.25,metalness:.2,roughness:.5,transparent:!0,opacity:.35}),ye=new Nt(K,he);t.add(ye),d.push({mesh:ye,data:{name:"No graph data",type:"center"}}),W(new I(0,28,72),new I(0,0,0));return}const V=mt(Object.keys(l));g=Mg(B,f,kr),h=dg(B.length,f.length,V.length),A&&(h={...h,labelBudget:Math.min(h.labelBudget,95)}),pg(B,V,h),mg(B,f,h,kr),gg(B,h.collisionMinDist,12),t.fog&&t.fog.isFogExp2&&(t.fog.density=h.fogDensity),a!=null&&a.material&&(a.material.opacity=Math.max(.12,.34-h.tier*.055)),p=B.map(K=>{const he=K.type==="wing"?`wing:${K.name}`:`room:${K.wing}:${K.name}`,ye=g.get(he)||0;return{id:he,baseScore:vg({type:K.type,incidentFull:ye,drawers:K.drawers})}});const M=Le(p,h);B.forEach(K=>{const he=K.type==="wing",ye=he?lt.nodeSizes.wingMin+.4:lt.nodeSizes.roomMin+.2;if(he)F(K.name,K.x,K.y,K.z,ye),me(`wing:${K.name}`,K.name,K.x,K.y,K.z,"#cbd5e1");else{const we=`room:${K.wing}:${K.name}`;se(K.name,K.wing,K.x,K.y,K.z,ye),M.has(we)&&me(we,K.name,K.x,K.y,K.z,"#94a3b8")}}),f.forEach(K=>{const he=kr(B,K,"from"),ye=kr(B,K,"to");if(he&&ye){const we=Jr(he),tt=Jr(ye),Qe=rs(K),Ne=sg(Qe);ge([he.x,he.y,he.z],[ye.x,ye.y,ye.z],Ne.color,Ne.opacity,{fromId:we,toId:tt,baseOpacity:Ne.opacity,isGraphRelationship:!0,relationshipType:Qe})}});const q=new Bi;B.forEach(K=>q.expandByPoint(new I(K.x,K.y,K.z)));const ae=new I;q.getCenter(ae);const ee=new I;q.getSize(ee);const Y=Math.max(ee.x,ee.y,ee.z,12),w=lc(Y*.48,i.fov,h.tier),ne=new I(.35,.42,1).normalize(),te=ae.clone().add(ne.multiplyScalar(w));S={position:te.clone(),target:ae.clone()},W(te,ae)}function be(){const B=C&&!(x==="graph")&&!A;s.autoRotate=B,s.autoRotateSpeed=.35*(B?1:0)}function rt(N,B=null){x=N,T=B,re(),Q=null,y.hoveredId=null,be(),N==="wings"?ze():N==="rooms"?G():N==="graph"&&Be(),Ie()}function He(){Q=null,y.hoveredId=null,r.domElement.style.cursor="default",Ie(),H.onHover(null,{x:0,y:0})}function b(N){var ae,ee;const B=r.domElement.getBoundingClientRect();z.x=(N.clientX-B.left)/B.width*2-1,z.y=-((N.clientY-B.top)/B.height)*2+1,L.setFromCamera(z,i);const V=d.map(Y=>Y.mesh).filter(Boolean),M=L.intersectObjects(V,!0);for(let Y=0;Y<M.length;Y+=1){let w=M[Y].object;for(;w&&!((ae=w.userData)!=null&&ae.type);)w=w.parent;if(w&&((ee=w.userData)!=null&&ee.type)&&w.userData.type!=="center"){const ne=w.userData.id||null,te=Q!==w||y.hoveredId!==ne;Q=w,y.hoveredId=ne,r.domElement.style.cursor="pointer",te&&Ie(),H.onHover({...w.userData},{x:N.clientX,y:N.clientY});return}}const q=y.hoveredId!=null;Q=null,y.hoveredId=null,r.domElement.style.cursor="default",q&&Ie(),H.onHover(null,{x:N.clientX,y:N.clientY})}function v(){if(!Q){H.onClick(null);return}const N={...Q.userData};H.onClick(N)}function k(){o=requestAnimationFrame(k),s.update();const N=Date.now()*.001,B=A?0:.42*P,V=A?0:.006*P;d.forEach((q,ae)=>{if(!q.data||q.data.type==="center")return;const ee=ae*.37,Y=q.mesh.userData._baseY??0;q.mesh.position.y=Y+Math.sin(N*.9+ee)*B,q.mesh.rotation.y+=V});const M=(h==null?void 0:h.tier)??0;if(x==="graph"&&M>=1){const q=y.selectedId&&U.get(y.selectedId)?U.get(y.selectedId).mesh.position:s.target;U.forEach(ae=>{const ee=ae.mesh.material;if(!ee||ee.type==="MeshBasicMaterial")return;const Y=ae.mesh.position.distanceTo(q),w=wn.clamp(1.04-(Y-42)/200,.36,1.06);ee.opacity=Math.min(1,ae.baseOpacity*(ae.presentationOpacity??1)*w)})}r.render(t,i)}function de(){t=new jm,t.background=new Ye(724760),t.fog=new po(724760,.0026),i=new jt(58,n.clientWidth/n.clientHeight,.1,1200),i.position.set(0,34,90),r=new il({antialias:!0,alpha:!1,powerPreference:"high-performance"}),r.setSize(n.clientWidth,n.clientHeight),r.setPixelRatio(Math.min(window.devicePixelRatio,2)),r.outputColorSpace=Mt,r.toneMapping=Ac,r.toneMappingExposure=1.05,n.appendChild(r.domElement),s=new rg(i,r.domElement),s.enableDamping=!0,s.dampingFactor=.055,s.autoRotate=!0,s.autoRotateSpeed=.35,s.maxPolarAngle=Math.PI*.495;const N=new Qm(6583435,988970,.85);t.add(N);const B=new nc(10859772,1.1);B.position.set(20,40,24),t.add(B);const V=new nc(3718648,.35);if(V.position.set(-24,12,-18),t.add(V),ie(),typeof window<"u"&&window.matchMedia){const M=window.matchMedia("(prefers-reduced-motion: reduce)");A=M.matches,M.addEventListener("change",q=>{A=q.matches,be()})}r.domElement.addEventListener("pointermove",b),r.domElement.addEventListener("click",v),r.domElement.addEventListener("pointerleave",He),window.addEventListener("resize",le),k()}function le(){if(!i||!r)return;const N=n.clientWidth,B=n.clientHeight;i.aspect=N/B,i.updateProjectionMatrix(),r.setSize(N,B)}function fe(N){l=N.wingsData||{},u=N.roomsData||{},f=N.graphEdges||[]}function Ae(){if(x==="graph"&&S){W(S.position.clone(),S.target.clone());return}W(new I(0,34,90),new I(0,0,0))}function Me(N){const B=U.get(N);if(!B)return;const V=new I;if(B.mesh.getWorldPosition(V),x==="graph"&&h){const ae=[];m.forEach(ne=>{if(!ne.isGraphRelationship)return;let te=null;if(ne.fromId===N?te=ne.toId:ne.toId===N&&(te=ne.fromId),!te)return;const K=U.get(te);K&&ae.push(K.mesh.position.clone())});const ee=yg(V,ae.length?ae:[V.clone()]),Y=lc(ee,i.fov,h.tier);let w=i.position.clone().sub(V);w.lengthSq()<4&&w.set(32,26,72),w.normalize(),W(V.clone().add(w.multiplyScalar(Y)),V);return}const M=i.position.clone().sub(V).normalize(),q=x==="rooms"&&T?26:30;W(V.clone().add(M.multiplyScalar(q)),V)}function Se(){var N;(N=Q==null?void 0:Q.userData)!=null&&N.id&&Me(Q.userData.id)}function Pe(N){const B={...y,...N};Re(y,B)||(y=B,Ie())}function Ge(N){Pe({relationshipTypesVisible:N})}function ue(){y.selectedId=null,Ie()}function nt(){var N;cancelAnimationFrame(o),c&&cancelAnimationFrame(c),window.removeEventListener("resize",le),r!=null&&r.domElement&&(r.domElement.removeEventListener("pointermove",b),r.domElement.removeEventListener("click",v),r.domElement.removeEventListener("pointerleave",He)),re(),a&&(t.remove(a),a.geometry.dispose(),a.material.dispose()),r==null||r.dispose(),(N=r==null?void 0:r.domElement)!=null&&N.parentNode&&r.domElement.parentNode.removeChild(r.domElement)}return{init:de,setData:fe,setView:rt,updatePresentation:Pe,setAutoRotate(N){C=N,be()},setMotionIntensity(N){P=Math.max(0,Math.min(2,N))},setLabelsVisible(N){if(R=!!N,R&&!_.length){rt(x,T);return}_.forEach(({sprite:B})=>{B.visible=R})},resetCamera:Ae,centerOnHovered:Se,centerOnNodeId:Me,clearPin:ue,resize:le,dispose:nt,getView:()=>x,getFocusWing:()=>T,getHovered:()=>Q?{...Q.userData}:null,setCallbacks(N){Object.assign(H,N)},setRelationshipFilters:Ge}}function qt(n,e,t=null){var o,c;if(n==null||typeof n!="string")return null;const i=n.trim();if(!i)return null;const r=Qn(i);if(r){const{wingId:l,roomName:u}=r;if((o=e[l])!=null&&o.some(f=>f.name===u))return{wing:l,room:u,key:It(l,u)}}if(i.includes("/")){const l=i.indexOf("/"),u=i.slice(0,l),f=i.slice(l+1);return(c=e[u])!=null&&c.some(d=>d.name===f)?{wing:u,room:f,key:It(u,f)}:null}const s=[];for(const[l,u]of Object.entries(e||{}))if(Array.isArray(u))for(const f of u)f.name===i&&s.push({wing:l,room:i,key:`${l}/${i}`});if(s.length===0)return null;if(s.length===1){const l=s[0];return{...l,key:It(l.wing,l.room)}}if(t&&s.some(l=>l.wing===t)){const l=s.find(u=>u.wing===t)||s[0];return{...l,key:It(l.wing,l.room)}}const a=s[0];return{...a,key:It(a.wing,a.room)}}function wg(n,e,t=null){if(t!=null&&typeof t=="number")return t;const i=Array.isArray(n)?n:[],r=e&&typeof e=="object"?e:{};let s=0;for(const a of i){const o=qt(a.from,r,null),c=qt(a.to,r,a.wing||null);(!o||!c)&&(s+=1)}return s}function Ag(n,e,t,i){var U;const r=n&&typeof n=="object"?n:{},s=Array.isArray(e)?e:[],a=new Set,o=new Map,c=new Map,l=new Map,u=new Map;function f(D,H){u.has(D)||u.set(D,new Set),u.get(D).add(H)}function d(D,H,L=1){D.set(H,(D.get(H)||0)+L)}let m=0,_=0;for(const D of s){const H=D.sourceRoomId,L=D.targetRoomId;if(!H||!L||H===L)continue;const z=H<L?`${H}||${L}`:`${L}||${H}`;if(a.has(z))continue;a.add(z),d(o,H),d(o,L),D.sourceWingId!==D.targetWingId?(m+=1,d(c,H),d(c,L)):(_+=1,d(l,H),d(l,L)),f(H,L),f(L,H)}const g=new Set([...o.keys()]),p=new Set;for(const[D,H]of Object.entries(r))if(Array.isArray(H))for(const L of H)p.add(L.roomId||It(D,L.name));const h=[];for(const D of p)g.has(D)||h.push(D);let S=m+_;t&&typeof t.resolvedEdgeCount=="number"&&(S=t.resolvedEdgeCount);const x=S>0?m/S:null;let P=[...o.entries()].sort((D,H)=>H[1]-D[1]).slice(0,8).map(([D,H])=>{const L=Qn(D);return{wing:(L==null?void 0:L.wingId)??D.split("/")[0],room:(L==null?void 0:L.roomName)??D.slice(D.indexOf("/")+1),key:D,degree:H}});(U=i==null?void 0:i.topConnectedRooms)!=null&&U.length&&(P=i.topConnectedRooms.slice(0,8).map(D=>({wing:D.wingId,room:D.name,key:D.roomId,degree:D.degree})));const R=new Map;for(const D of s)D.sourceWingId!==D.targetWingId&&(d(R,D.sourceWingId),d(R,D.targetWingId));const C=[...R.entries()].sort((D,H)=>H[1]-D[1]).slice(0,8).map(([D,H])=>({wing:D,crossEdges:H})),Q=ul(o),y=t&&typeof t.crossWingEdgeCount=="number"?t.crossWingEdgeCount:null,A=t&&typeof t.intraWingEdgeCount=="number"?t.intraWingEdgeCount:null;return{edgeCount:s.length,resolvedEdgeCount:S,crossWingEdgeCount:y??m,intraWingEdgeCount:A??_,byRelationshipType:t!=null&&t.byType&&typeof t.byType=="object"?{...t.byType}:null,crossFraction:x,degreeByKey:o,crossByKey:c,intraByKey:l,neighborsByKey:u,topConnectedRooms:P,topCrossLinkedWings:C,roomsWithNoTunnels:typeof(i==null?void 0:i.roomsWithNoLinks)=="number"?i.roomsWithNoLinks:h.length,noTunnelRoomKeys:h.slice(0,50),medianRoomDegree:Q,hasResolvableEdges:S>0}}function Rg(n,e,t,i){var A;const r=Array.isArray(n)?n:[],s=e&&typeof e=="object"?e:{},a=new Set,o=new Map,c=new Map,l=new Map,u=new Map;function f(U,D){u.has(U)||u.set(U,new Set),u.get(U).add(D)}function d(U,D,H=1){U.set(D,(U.get(D)||0)+H)}for(const U of r){const D=qt(U.from,s,null),H=qt(U.to,s,U.wing||null);if(!D||!H)continue;const L=D.key,z=H.key;if(L===z)continue;const W=L<z?`${L}||${z}`:`${z}||${L}`;if(a.has(W))continue;a.add(W),d(o,L),d(o,z),D.wing!==H.wing?(d(c,L),d(c,z)):(d(l,L),d(l,z)),f(L,z),f(z,L)}const m=new Set;for(const[U,D]of Object.entries(s))if(Array.isArray(D))for(const H of D)m.add(It(U,H.name));const _=[];for(const U of m)o.has(U)||_.push(U);let g=0,p=0;for(const U of r){const D=qt(U.from,s,null),H=qt(U.to,s,U.wing||null);!D||!H||(D.wing!==H.wing?g+=1:p+=1)}const h=g+p,S=h>0?g/h:null;let T=[...o.entries()].sort((U,D)=>D[1]-U[1]).slice(0,8).map(([U,D])=>{const H=Qn(U);return{wing:(H==null?void 0:H.wingId)??U.split("/")[0],room:(H==null?void 0:H.roomName)??U.slice(U.indexOf("/")+1),key:U,degree:D}});(A=i==null?void 0:i.topConnectedRooms)!=null&&A.length&&(T=i.topConnectedRooms.slice(0,8).map(U=>({wing:U.wingId,room:U.name,key:U.roomId,degree:U.degree})));const P=new Map;for(const U of r){const D=qt(U.from,s,null),H=qt(U.to,s,U.wing||null);!D||!H||D.wing===H.wing||(d(P,D.wing),d(P,H.wing))}const R=[...P.entries()].sort((U,D)=>D[1]-U[1]).slice(0,8).map(([U,D])=>({wing:U,crossEdges:D})),C=ul(o),Q=t&&typeof t.crossWingEdgeCount=="number"?t.crossWingEdgeCount:null,y=t&&typeof t.intraWingEdgeCount=="number"?t.intraWingEdgeCount:null;return{edgeCount:r.length,resolvedEdgeCount:h,crossWingEdgeCount:Q??g,intraWingEdgeCount:y??p,crossFraction:S,degreeByKey:o,crossByKey:c,intraByKey:l,neighborsByKey:u,topConnectedRooms:T,topCrossLinkedWings:R,roomsWithNoTunnels:typeof(i==null?void 0:i.roomsWithNoLinks)=="number"?i.roomsWithNoLinks:_.length,noTunnelRoomKeys:_.slice(0,50),medianRoomDegree:C,hasResolvableEdges:h>0}}function Cg(n,e={}){const{edgesResolved:t,graphEdges:i,graphSummary:r=null,overviewStats:s=null}=e;return t!=null&&t.length?Ag(n,t,r,s):Rg(i||[],n,r,s)}function ul(n){const e=[...n.values()].sort((i,r)=>i-r);if(!e.length)return null;const t=Math.floor(e.length/2);return e.length%2?e[t]:(e[t-1]+e[t])/2}function Lg(n,e){var u;if(!e||!n)return null;const t=e.degreeByKey.get(n)??0,i=e.crossByKey.get(n)??0,r=e.intraByKey.get(n)??0,s=e.neighborsByKey.get(n),a=s?[...s]:[],o=a.slice(0,12).map(f=>{const d=Qn(f),m=e.degreeByKey.get(f)??0;return{wing:(d==null?void 0:d.wingId)??f.split("/")[0],room:(d==null?void 0:d.roomName)??f.slice(f.indexOf("/")+1),key:f,degree:m}});o.sort((f,d)=>d.degree-f.degree);const c=new Map;for(const f of a){const d=(u=Qn(f))==null?void 0:u.wingId;d&&c.set(d,(c.get(d)||0)+1)}const l=[...c.entries()].sort((f,d)=>d[1]-f[1]).slice(0,8).map(([f,d])=>({wing:f,links:d}));return{degree:t,crossWingLinks:i,intraWingLinks:r,medianDegree:e.medianRoomDegree,relatedRooms:o.slice(0,8),relatedWings:l,isBridge:i>=1&&a.length>0}}function uc(n,e){if(!n||!Array.isArray(e))return{degree:0,crossWingLinks:0,intraWingLinks:0,byType:{},relatedRoomKeys:[]};let t=0,i=0,r=0;const s={},a=[];for(const o of e){const c=o.sourceRoomId,l=o.targetRoomId;if(!c||!l||c!==n&&l!==n)continue;t+=1;const u=o.relationshipType||"tunnel";s[u]=(s[u]||0)+1,o.sourceWingId!=null&&o.targetWingId!=null&&o.sourceWingId!==o.targetWingId?i+=1:r+=1,a.push(c===n?l:c)}return{degree:t,crossWingLinks:i,intraWingLinks:r,byType:s,relatedRoomKeys:[...new Set(a)]}}function hc(n,e){const t={};let i=0;for(const r of e||[]){if(!r.sourceWingId||!r.targetWingId||!(r.sourceWingId===n||r.targetWingId===n))continue;const a=r.relationshipType||"tunnel";t[a]=(t[a]||0)+1,r.sourceWingId!==r.targetWingId&&(i+=1)}return{byType:t,crossWingTouches:i}}function Pg(n,e,t,i=null){if(i!=null&&i.length)return Dg(n,i);const r=Array.isArray(e)?e:[],s=new Map;let a=0;for(const u of r){const f=qt(u.from,t,n),d=qt(u.to,t,u.wing||null);if(!f||!d||f.wing===d.wing||f.wing!==n&&d.wing!==n)continue;a+=1;const m=f.wing===n?d:f;s.set(m.wing,(s.get(m.wing)||0)+1)}const o=[...s.entries()].sort((u,f)=>f[1]-u[1]).slice(0,6).map(([u,f])=>({wing:u,edges:f})),c=new Map;for(const u of r){const f=qt(u.from,t,n),d=qt(u.to,t,u.wing||null);!f||!d||(f.wing===n&&d.wing!==n&&c.set(f.key,(c.get(f.key)||0)+1),d.wing===n&&f.wing!==n&&c.set(d.key,(c.get(d.key)||0)+1))}const l=[...c.entries()].sort((u,f)=>f[1]-u[1]).slice(0,5).map(([u,f])=>{const d=Qn(u);return{wing:(d==null?void 0:d.wingId)??u.split("/")[0],room:(d==null?void 0:d.roomName)??u.slice(u.indexOf("/")+1),key:u,crossEdges:f}});return{crossWingTouches:a,topExternalWings:o,topRoomsByCrossWing:l}}function Dg(n,e){const t=new Map;let i=0;for(const o of e){if(o.sourceWingId===o.targetWingId||o.sourceWingId!==n&&o.targetWingId!==n)continue;i+=1;const c=o.sourceWingId===n?o.targetWingId:o.sourceWingId;t.set(c,(t.get(c)||0)+1)}const r=[...t.entries()].sort((o,c)=>c[1]-o[1]).slice(0,6).map(([o,c])=>({wing:o,edges:c})),s=new Map;for(const o of e)o.sourceWingId!==o.targetWingId&&(o.sourceWingId===n&&o.targetWingId!==n&&s.set(o.sourceRoomId,(s.get(o.sourceRoomId)||0)+1),o.targetWingId===n&&o.sourceWingId!==n&&s.set(o.targetRoomId,(s.get(o.targetRoomId)||0)+1));const a=[...s.entries()].sort((o,c)=>c[1]-o[1]).slice(0,5).map(([o,c])=>{const l=Qn(o);return{wing:(l==null?void 0:l.wingId)??o.split("/")[0],room:(l==null?void 0:l.roomName)??o.slice(o.indexOf("/")+1),key:o,crossEdges:c}});return{crossWingTouches:i,topExternalWings:r,topRoomsByCrossWing:a}}function vo(n){let e=0;for(const t of Object.values(n||{}))Array.isArray(t)&&(e+=t.length);return e}function hl(n,e){const t=n==null?void 0:n[e];return Array.isArray(t)?t.reduce((i,r)=>i+(Number(r.drawers)||0),0):0}function Ig(n){let e=0;for(const t of Object.values(n||{}))typeof t=="number"&&(e+=t);return e}function xo(n){const e=Object.entries(n||{}).filter(([,t])=>typeof t=="number");return e.sort((t,i)=>i[1]-t[1]),e.map(([t,i],r)=>({wing:t,rank:r+1,drawers:i}))}function Ug(n){const e=Object.entries(n||{}).map(([t,i])=>({wing:t,roomCount:Array.isArray(i)?i.length:0}));return e.sort((t,i)=>i.roomCount-t.roomCount),e.map((t,i)=>({...t,rank:i+1}))}function yo(n,e){const t=n==null?void 0:n[e];return Array.isArray(t)?[...t].sort((r,s)=>(s.drawers||0)-(r.drawers||0)).map((r,s)=>({...r,rank:s+1})):[]}function Pn(n){const e=n%10,t=n%100;return t>=11&&t<=13?`${n}th`:e===1?`${n}st`:e===2?`${n}nd`:e===3?`${n}rd`:`${n}th`}function Qr(n,e,t=1){return e==null||e<=0||n==null?null:(100*(Number(n)/e)).toFixed(t)}function Ng({drawers:n=0,wingRoomSum:e,palaceTotal:t},i,r){const s=(i==null?void 0:i.degree)??0,a=(i==null?void 0:i.crossWingLinks)??0,o=(i==null?void 0:i.intraWingLinks)??0,c=(i==null?void 0:i.medianDegree)??null,l=e>0&&n>=e*.2,u=e>0&&n<=e*.05&&n>0,f=c!=null&&s>=c*2&&s>=2,d=s===0;return r?d?{label:"Isolated room",detail:"This room does not appear on any resolved tunnel edge (or naming does not match graph endpoints)."}:a>=2&&f?{label:"Dense cross-wing connector",detail:"High tunnel degree with multiple cross-wing links."}:a>=1&&f?{label:"Highly connected hub",detail:"Above-average tunnel degree with cross-wing reach."}:a>=1&&o<=1?{label:"Cross-wing bridge",detail:"Most links span outside this wing."}:l&&s<=(c||1)?{label:"Large but weakly connected",detail:"Many drawers relative to the wing, few tunnel links."}:u&&f?{label:"Small but structurally important",detail:"Fewer drawers than peers, but high connectivity."}:f?{label:"Highly connected hub",detail:c!=null?`Degree ${s} vs median ${c}.`:`Degree ${s}.`}:t>0&&n/t>=.08&&s<2?{label:"Major archive, few tunnels",detail:"Large share of palace drawers with sparse tunnels."}:{label:"Balanced footprint",detail:"Typical size and connectivity for this palace."}:{label:"Tunnel graph unavailable",detail:"No resolvable tunnel edges for the loaded taxonomy, or graph-stats returned empty."}}function Og(n,e){const{totalDrawers:t,wingCount:i,roomCount:r,tunnelNodeCount:s,graphEdgeCount:a,kgAvailable:o,kgSummary:c,ga:l,wingsData:u}=n,f=xo(u).slice(0,5),d={wings:"Wing spheres are sized by drawer count. Click a wing to open its rooms.",rooms:n.focusWing?`Focused on “${n.focusWing}”: rooms orbit the wing. Click another wing in “all rooms” layout or use search.`:"Each cluster is a wing; rooms orbit their wing. Click a room to inspect and center.",graph:"Force-directed graph. Edges combine tunnel links and same-wing taxonomy adjacency."};let m="";return!l.hasResolvableEdges&&a===0?m="No graph edges loaded.":l.hasResolvableEdges?l.crossFraction!=null&&(m=l.crossFraction>=.5?"Cross-wing tunnel links account for a large share of resolved graph edges.":"Resolved edges mix same-wing taxonomy adjacency with cross-wing tunnels."):m="Graph metadata is present but endpoints could not be matched to taxonomy rooms (check naming).",{totalDrawers:t,wingCount:i,roomCount:r,tunnelNodeCount:s,graphEdgeCount:a,crossWingEdges:l.crossWingEdgeCount,kgAvailable:o,kgSummary:c,largestWingsByDrawers:f,mostConnectedRooms:l.topConnectedRooms.slice(0,5),mostCrossLinkedWings:l.topCrossLinkedWings.slice(0,5),roomsWithNoTunnels:l.roomsWithNoTunnels,viewHint:d[e]||d.wings,graphBlurb:m,ga:l}}const Fg=new Set(["wings","rooms","graph"]);function Bg(n){return n==null||typeof n!="object"?null:n}function zg(n){const e=Bg(n);return e?{view:Fg.has(e.view)?e.view:"wings",currentWing:typeof e.currentWing=="string"?e.currentWing:e.currentWing??null,currentRoom:typeof e.currentRoom=="string"?e.currentRoom:e.currentRoom??null,selected:e.selected&&typeof e.selected=="object"?e.selected:null,pinned:!!e.pinned,searchQuery:typeof e.searchQuery=="string"?e.searchQuery:"",labels:e.labels,rotate:e.rotate,motion:e.motion}:{view:"wings",currentWing:null,currentRoom:null,selected:null,pinned:!1,searchQuery:"",labels:void 0,rotate:void 0,motion:void 0}}function kg(n,e){var r,s;const t=(e==null?void 0:e.wingsData)||{},i=(e==null?void 0:e.roomsData)||{};if(n.currentWing&&!Ii(t,n.currentWing)&&(n.currentWing=null,n.currentRoom=null,n.selected=null,n.pinned=!1),n.currentRoom&&n.currentWing&&(tr(i,n.currentWing,n.currentRoom)||(n.currentRoom=null,((r=n.selected)==null?void 0:r.type)==="room"&&(n.selected=null,n.pinned=!1))),(s=n.selected)!=null&&s.id){const a=n.selected;a.type==="wing"&&!Ii(t,a.name)&&(n.selected=null,n.pinned=!1),a.type==="room"&&(!a.wing||!tr(i,a.wing,a.name))&&(n.selected=null,n.pinned=!1)}n.pinned&&!n.selected&&(n.pinned=!1)}const Mo="mempalace-viz-explorer-v1",dl="mempalace-viz-panel-state-v1";let kt=new Set;const Fn=[{id:"wings",title:"Wings",hint:"High-level structure by domain or project."},{id:"rooms",title:"Rooms",hint:"Rooms within each wing, orbiting their parent."},{id:"graph",title:"Graph",hint:"Tunnel relationships across rooms."}],j={view:"wings",hovered:null,selected:null,pinned:!1,currentWing:null,currentRoom:null,searchQuery:"",filters:{visibleWings:null}};let _e=null,ce=null,dc=null,fc=null,jn=null,pc=null;const pe=n=>document.getElementById(n);function mc(n){if(!n||!(n instanceof HTMLElement))return!1;const e=n.tagName;return!!(e==="INPUT"||e==="TEXTAREA"||e==="SELECT"||n.isContentEditable)}function Hg(n,e=5200){const t=pe("toast-host");t&&(clearTimeout(pc),t.innerHTML=`<div class="toast" role="status">${Xe(n)}</div>`,pc=setTimeout(()=>{t.innerHTML=""},e))}function Gg(n){var s,a,o;if(j.view!=="graph")return"";const e=ce==null?void 0:ce.graphStats,t=ce==null?void 0:ce.graph,i=((s=ce==null?void 0:ce.graphEdges)==null?void 0:s.length)??0,r=Array.isArray(t==null?void 0:t.edgesUnresolved)?t.edgesUnresolved.length:Array.isArray(e==null?void 0:e.edgesUnresolved)?e.edgesUnresolved.length:null;if(!i)return'<div class="inspect-card inspect-card--hint" role="status"><strong>Graph view</strong><p class="inspect-muted inspect-muted--tight">No graph edges were returned from graph-stats. Wings and rooms may still appear if taxonomy is loaded.</p></div>';if(!((a=n.ga)!=null&&a.hasResolvableEdges)){const c=r??wg(ce==null?void 0:ce.graphEdges,ce==null?void 0:ce.roomsData,((o=t==null?void 0:t.edgesUnresolved)==null?void 0:o.length)??null);return`<div class="inspect-card inspect-card--hint" role="status"><strong>Graph view</strong><p class="inspect-muted inspect-muted--tight">Loaded ${i} graph edge${i===1?"":"s"}, but endpoints could not be fully matched to taxonomy rooms${c?` (${c} edge${c===1?"":"s"} unresolved).`:"."} Layout may be sparse.</p></div>`}return""}function Wg(){return!!(j.pinned&&j.selected)}function Xe(n){return String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function Fe(n){return n==null||Number.isNaN(Number(n))?"—":Number(n).toLocaleString()}function Vg(n){if(!n||typeof n!="object")return null;const e=[];for(const[t,i]of Object.entries(n))t!=="error"&&(typeof i=="number"?e.push(`${t}: ${Fe(i)}`):typeof i=="string"&&e.push(`${t}: ${i}`));return e.length?e.slice(0,8).join(" · "):null}function Eo(){var R,C,Q,y;const n=ce==null?void 0:ce.status,e=(ce==null?void 0:ce.wingsData)||{},t=(ce==null?void 0:ce.roomsData)||{},i=(ce==null?void 0:ce.graphEdges)||[],r=ce==null?void 0:ce.graphStats,s=ce==null?void 0:ce.graph,a=(R=s==null?void 0:s.edgesResolved)!=null&&R.length?s.edgesResolved:(r==null?void 0:r.edgesResolved)||[],o=ce==null?void 0:ce.kgStats,c=(ce==null?void 0:ce.overviewStats)??((C=ce==null?void 0:ce.overviewBundle)==null?void 0:C.stats),l=(ce==null?void 0:ce.graphMeta)??((Q=ce==null?void 0:ce.graph)==null?void 0:Q.graphMeta)??(r==null?void 0:r.graphMeta)??((y=ce==null?void 0:ce.overviewBundle)==null?void 0:y.graphMeta),u=typeof(n==null?void 0:n.total_drawers)=="number"?n.total_drawers:typeof(c==null?void 0:c.totalDrawers)=="number"?c.totalDrawers:Ig(e),f=typeof(c==null?void 0:c.totalWings)=="number"?c.totalWings:Object.keys(e).length,d=typeof(c==null?void 0:c.totalRooms)=="number"?c.totalRooms:vo(t);let m=0;const _=(s==null?void 0:s.summary)??(r==null?void 0:r.summary);(_==null?void 0:_.resolvedEdgeCount)!=null?m=_.resolvedEdgeCount:r!=null&&r.tunnels&&typeof r.tunnels=="object"&&(m=Object.keys(r.tunnels).length);const g=typeof(_==null?void 0:_.resolvedEdgeCount)=="number"?_.resolvedEdgeCount:i.length,p=Cg(t,{edgesResolved:a,graphEdges:i,graphSummary:_??null,overviewStats:c??null}),h=Vg(o),S=!!(o&&typeof o=="object"&&!o.error),x=mo(i),T=cg(a,kt),P=go(kt,x)!==null;return{status:n,wingsData:e,roomsData:t,graphEdges:i,graphStats:r,edgesResolved:a,kgStats:o,totalDrawers:u,wingCount:f,roomCount:d,tunnelNodeCount:m,graphEdgeCount:g,ga:p,kgAvailable:S,kgSummary:h,focusWing:j.currentWing,overviewStats:c,graphMeta:l,summary:_,availableRelationshipTypes:x,visibleGraphSummary:T,graphFilterNarrowed:P}}function Xg(){try{const n=localStorage.getItem(ll);return n?JSON.parse(n):null}catch{return null}}function fl(n){try{localStorage.setItem(ll,JSON.stringify({enabledTypes:[...n||[]]}))}catch{}}function $g(){const n=(ce==null?void 0:ce.graphEdges)||[],e=mo(n),t=Xg(),i=t==null?void 0:lg(t);kt=og(i,e),fl(kt),_e==null||_e.setRelationshipFilters(go(kt,e))}function jg(n){const e=mo((ce==null?void 0:ce.graphEdges)||[]);!n||!e.includes(n)||(kt.has(n)?kt.delete(n):kt.add(n),fl(kt),_e==null||_e.setRelationshipFilters(go(kt,e)),bt(),si(),ri())}function ri(){const n=pe("graph-view-extras");if(!n)return;const e=j.view==="graph"&&!!ce&&!ce.error;if(n.hidden=!e,!e)return;const t=Eo(),i=t.availableRelationshipTypes||[],r=pe("graph-rel-chips");r&&(i.length?r.innerHTML=i.map(o=>{const c=to(o),l=kt.has(o),u=o==="tunnel"?"#5b8cff":o==="taxonomy_adjacency"?"#3dc9b8":"#a78bfa";return`<button type="button" class="rel-chip ${l?"is-on":""}" data-rel-type="${Xe(o)}" title="${Xe(c.description)}">
          <span class="rel-chip__swatch" style="background:${u}"></span>
          <span>${Xe(c.shortLabel)}</span>
        </button>`}).join(""):r.innerHTML='<span class="inspect-muted">No typed edges in this graph.</span>');const s=pe("graph-status-pill");if(s){const o=t.graphFilterNarrowed,c=t.visibleGraphSummary,l=ug(t.graphMeta,t.summary),u=o?`Visible edges: ${Fe(c.visibleEdgeCount)} (filtered)`:`Edges: ${Fe(t.graphEdgeCount)} (all types)`;s.innerHTML=`<span class="graph-status-pill__primary">${Xe(u)}</span>${l?`<span class="graph-status-pill__hint">${Xe(l.length>240?`${l.slice(0,240)}…`:l)}</span>`:""}`}const a=pe("graph-legend-compact");a&&(a.innerHTML=i.length?i.map(o=>{const c=to(o);return`<div class="graph-legend-compact__row"><span class="legend-swatch" style="background:${o==="tunnel"?"#5b8cff":o==="taxonomy_adjacency"?"#3dc9b8":"#a78bfa"}"></span><span><strong>${Xe(c.shortLabel)}</strong> — ${Xe(c.description)}</span></div>`}).join(""):"")}function Ht(n,e,t){const i=e&&String(e).trim()?e:`<p class="inspect-empty">${Xe("No data.")}</p>`;return`
    <section class="inspect-section">
      <h3 class="inspect-section__title">${Xe(n)}</h3>
      <div class="inspect-section__body">${i}</div>
    </section>`}function pl(n){return n==null||Number.isNaN(Number(n))?"":`<div class="inspect-bar" aria-hidden="true"><div class="inspect-bar__fill" style="width:${Math.min(100,Math.max(0,Number(n)))}%"></div></div>`}function vn(n,e,t){return`<button type="button" class="inspect-row inspect-row--action"${Object.entries(t||{}).map(([s,a])=>` data-${s}="${Xe(String(a))}"`).join("")}>
    <span class="inspect-row__main">${Xe(n)}</span>
    <span class="inspect-row__meta">${Xe(e)}</span>
  </button>`}function qg(n){var f,d,m,_;const e=Og(n,j.view),t=e.ga.byRelationshipType&&Object.keys(e.ga.byRelationshipType).length?Object.entries(e.ga.byRelationshipType).map(([g,p])=>`${g}: ${Fe(p)}`).join(" · "):"",i=(d=(f=n.graphMeta)==null?void 0:f.truncatedSources)!=null&&d.length?n.graphMeta.truncatedSources.map(g=>{const p=g.totalMatching!=null&&g.totalMatching!==""?Fe(g.totalMatching):"unknown",h=g.inferred?" (heuristic)":"";return`${g.source} limit ${Fe(g.limit)} · ${p} rows reported${h}`}).join("; "):"",r=(((m=n.graphMeta)==null?void 0:m.completenessNotes)||[]).filter(Boolean).join(" "),s=e.kgAvailable?e.kgSummary||"—":"Knowledge graph statistics are unavailable from the current API.",a=e.largestWingsByDrawers.map(g=>vn(g.wing,`${Fe(g.drawers)} drawers · #${g.rank}`,{"inspect-action":"go-wing",wing:g.wing})).join(""),o=e.mostConnectedRooms.length?e.mostConnectedRooms.map(g=>vn(`${g.room}`,`${g.wing} · degree ${g.degree}`,{"inspect-action":"select-room",wing:g.wing,room:g.room})).join(""):"",c=e.mostCrossLinkedWings.length?e.mostCrossLinkedWings.map(g=>vn(g.wing,`${Fe(g.crossEdges)} cross-wing edges`,{"inspect-action":"go-wing",wing:g.wing})).join(""):"",l=[`Palace scale: ${Fe(e.totalDrawers)} drawers across ${Fe(e.wingCount)} wings and ${Fe(e.roomCount)} rooms.`,e.tunnelNodeCount?`Graph summary: ${Fe(e.graphEdgeCount)} resolved undirected edges (all relationship types).`:"No graph edges in graph-stats.",e.graphBlurb].filter(Boolean).join(" "),u=j.view==="graph"&&((_=n.ga)!=null&&_.hasResolvableEdges)?n.graphFilterNarrowed?`<div class="inspect-card inspect-card--hint" role="status"><strong>Graph filters active</strong><p class="inspect-muted inspect-muted--tight">Visible: ${Fe(n.visibleGraphSummary.visibleEdgeCount)} edges (${sr(n.visibleGraphSummary.visibleByType)||"—"}). Inspector “visible” rows match the scene. Footer and resolved totals above remain global.</p></div>`:'<div class="inspect-card inspect-card--hint" role="status"><strong>Graph view</strong><p class="inspect-muted inspect-muted--tight">Brighter blue edges = cross-wing tunnels; softer teal = inferred same-wing adjacency. Narrow types in the left panel.</p></div>':"";return`
    <div class="inspect-stack">
      <div class="inspect-card inspect-card--hero">
        <span class="badge">Overview</span>
        <p class="inspect-lead">${Xe(e.viewHint)}</p>
        <p class="inspect-muted">${Xe(l)}</p>
      </div>
      ${u}
      ${Ht("Palace summary",`
        <div class="meta-block">
          ${et("Total drawers",Fe(e.totalDrawers))}
          ${et("Wings",Fe(e.wingCount))}
          ${et("Rooms (taxonomy)",Fe(e.roomCount))}
          ${et("Resolved graph edges",Fe(e.graphEdgeCount))}
          ${et("Edge types",t||"—")}
          ${et("Cross-wing (tunnels)",e.ga.hasResolvableEdges?Fe(e.crossWingEdges):"—")}
          ${et("Rooms with no graph links",e.ga.hasResolvableEdges?Fe(e.roomsWithNoTunnels):"—")}
          ${et("Upstream truncation",i||"none")}
        </div>
        ${r?`<p class="inspect-muted inspect-muted--tight">${Xe(r)}</p>`:""}
        <p class="inspect-muted inspect-muted--tight">${Xe(s)}</p>
        `)}
      ${Ht("Largest wings",`<div class="inspect-rows">${a||'<p class="inspect-empty">No wing counts available.</p>'}</div>`)}
      ${Ht("Most connected rooms",o||'<p class="inspect-empty">No resolvable tunnel edges, or graph endpoints do not match room names.</p>')}
      ${Ht("Most cross-linked wings",c||'<p class="inspect-empty">No cross-wing tunnel edges resolved.</p>')}
      <div class="inspect-card inspect-card--hint">
        <strong>How to explore</strong>
        <p class="inspect-muted inspect-muted--tight">Use <kbd>1</kbd>–<kbd>3</kbd> to switch views. Click wings and rooms to drill in; Pin keeps the inspector fixed. Search dims non-matching nodes.</p>
      </div>
    </div>`}function Yg(n,e,t){var ge;const{wingsData:i,roomsData:r,totalDrawers:s,ga:a,graphEdges:o}=n,c=Number(i[e])||0,l=r[e]||[],u=l.length,f=xo(i),d=f.find(F=>F.wing===e),m=Ug(r),_=m.find(F=>F.wing===e),g=Qr(c,s),p=vo(r),h=Qr(u,p),S=hl(r,e),x=S>0?S:c,T=u?(x/u).toFixed(1):null,P=yo(r,e),R=P[0],C=P.length>1?P[P.length-1]:null,Q=[g!=null&&d?`This wing holds ${g}% of all drawers and is the ${Pn(d.rank)} largest wing by drawer count.`:null,h!=null&&_&&u?`It ranks ${Pn(_.rank)} among wings by room count (${h}% of all rooms).`:null].filter(Boolean).join(" "),y=Pg(e,o,r,n.edgesResolved),A=n.edgesResolved||[],U=_o(A,kt),D=hc(e,A),H=hc(e,U),L=(()=>{if(!n.graphFilterNarrowed||!a.hasResolvableEdges)return"";const F=D.byType.tunnel||0,se=H.byType.tunnel||0,ve=D.byType.taxonomy_adjacency||0,Te=H.byType.taxonomy_adjacency||0;return se>Te*2&&F>0?"With current filters, this wing shows mostly cross-wing tunnel links.":Te>se*2&&ve>0?"With current filters, visible links here are mostly inferred same-wing adjacency.":H.crossWingTouches===0&&y.crossWingTouches>0?"Cross-wing tunnel links are hidden by filters; only same-wing structure may be visible.":""})(),z=y.crossWingTouches>0?`
      ${et("Cross-wing tunnel touches",Fe(y.crossWingTouches))}
      <div class="inspect-rows">
        ${y.topExternalWings.map(F=>vn(F.wing,`${Fe(F.edges)} edges`,{"inspect-action":"go-wing",wing:F.wing})).join("")}
      </div>`:"",W=y.topRoomsByCrossWing.map(F=>vn(F.room,`cross-wing ${Fe(F.crossEdges)}`,{"inspect-action":"select-room",wing:F.wing,room:F.room})).join(""),re=P.slice(0,5).map(F=>vn(F.name,`${Fe(F.drawers)} drawers`,{"inspect-action":"select-room",wing:e,room:F.name})),ie=[...l].map(F=>{const se=F.roomId||It(e,F.name),ve=a.degreeByKey.get(se)??0;return{...F,deg:ve}}).sort((F,se)=>se.deg-F.deg).slice(0,5),J=ie.length?ie.map(F=>vn(F.name,`degree ${F.deg}`,{"inspect-action":"select-room",wing:e,room:F.name})).join(""):"",oe=u===0?'<p class="inspect-empty">This wing has no room-level drawer breakdown in taxonomy.</p>':`
      ${et("Rooms listed",Fe(u))}
      ${et("Drawers (wing total)",Fe(c))}
      ${T!=null?et("Avg drawers / room",T):""}
      ${R?et("Largest room",`${R.name} (${Fe(R.drawers)})`):""}
      ${C&&C.name!==(R==null?void 0:R.name)?et("Smallest room",`${C.name} (${Fe(C.drawers)})`):""}
    `;return`
    <div class="inspect-stack">
      ${j.view==="graph"?'<p class="inspect-muted inspect-muted--tight">Graph view: node positions are layout-only; drawer ranks use taxonomy and wings API.</p>':""}
      <div class="inspect-card inspect-card--hero">
        <span class="badge">Wing</span>
        <div class="inspect-title">${Xe(e)}</div>
        <p class="inspect-lead">${Xe(Q||"Wing footprint in the palace.")}</p>
        ${g!=null?`<div class="inspect-pct"><span>${g}% of palace drawers</span>${pl(g)}</div>`:""}
      </div>
      ${Ht("Summary",`
        <div class="meta-block">
          ${et("Drawer count",Fe(c))}
          ${et("Rank by drawers",d?`${Pn(d.rank)} of ${f.length}`:"—")}
          ${et("Rooms",Fe(u))}
          ${et("Rank by room count",_?`${Pn(_.rank)} of ${m.length}`:"—")}
        </div>`)}
      ${Ht("Structure",`<div class="meta-block">${oe}</div>`)}
      ${Ht("Connections",a.hasResolvableEdges?`<div class="meta-block">
          ${et("Edge types (global)",sr(D.byType)||"—")}
          ${n.graphFilterNarrowed?et("Edge types (visible)",sr(H.byType)||"—"):""}
          ${n.graphFilterNarrowed?et("Cross-wing touches (visible)",Fe(H.crossWingTouches)):""}
        </div>
        ${L?`<p class="inspect-muted inspect-muted--tight">${Xe(L)}</p>`:""}
        ${z||'<p class="inspect-empty">No cross-wing tunnel relationships touch this wing.</p>'}
             ${W?`<p class="inspect-micro">Rooms with cross-wing links (global)</p><div class="inspect-rows">${W}</div>`:""}`:'<p class="inspect-empty">No tunnel relationships could be resolved against taxonomy rooms.</p>')}
      ${Ht("Related rooms",`<p class="inspect-micro">Largest by drawers</p><div class="inspect-rows">${re.join("")}</div>
         ${J?`<p class="inspect-micro">Most connected (tunnels)</p><div class="inspect-rows">${J}</div>`:'<p class="inspect-empty">No graph degree for rooms in this wing.</p>'}`)}
      ${Ht("Health / graph insight",`<p class="inspect-muted">${Xe(((ge=a.topCrossLinkedWings[0])==null?void 0:ge.wing)===e?"This wing is among the most cross-linked in the tunnel graph.":y.crossWingTouches>0?"Participates in cross-wing tunnels; see Connections for peers.":u>0?"No cross-wing tunnel edges touch this wing in the current graph.":"Add taxonomy rooms to compare structure.")}</p>`)}
    </div>`}function Kg(n,e,t,i){const{wingsData:r,roomsData:s,totalDrawers:a,ga:o}=n,c=s[e]||[],l=c.find(J=>J.name===t),u=l?Number(l.drawers)||0:null,f=Number(r[e])||0,d=hl(s,e),m=d>0?d:f,_=yo(s,e),g=_.find(J=>J.name===t),p=u!=null&&m>0?Qr(u,m):null,h=u!=null&&a>0?Qr(u,a):null,S=[g&&p!=null?`This room is the ${Pn(g.rank)} largest in “${e}” by drawers and holds about ${p}% of that wing’s drawers (by room list).`:null,h!=null?`It is ${h}% of the entire palace by drawers.`:null].filter(Boolean).join(" "),x=It(e,t),T=Lg(x,o),P=o.hasResolvableEdges,R=n.edgesResolved||[],C=_o(R,kt),Q=uc(x,R),y=uc(x,C),A=hg(y.byType,Q.byType),U=Ng({drawers:u??0,wingRoomSum:m,palaceTotal:a},T,P),D=m>0&&c.length?m/c.length:null,H=u!=null&&D!=null?u>=D*1.1?"Above wing average size":u<=D*.9?"Below wing average size":"Near wing average size":"—",L=((T==null?void 0:T.relatedRooms)||[]).filter(J=>!(J.wing===e&&J.room===t)).slice(0,6),z=L.length?L.map(J=>vn(`${J.room}`,`${J.wing} · deg ${J.degree}`,{"inspect-action":"select-room",wing:J.wing,room:J.room})).join(""):"",W=((T==null?void 0:T.relatedWings)||[]).filter(J=>J.wing!==e).slice(0,6).map(J=>vn(J.wing,`${Fe(J.links)} tunnel link${J.links===1?"":"s"}`,{"inspect-action":"go-wing",wing:J.wing})).join(""),re=T&&T.isBridge?"Acts as a bridge: at least one cross-wing tunnel edge is incident to this room.":"No bridge pattern detected (no cross-wing edges on this room).";return`
    <div class="inspect-stack">
      ${j.view==="graph"?'<p class="inspect-muted inspect-muted--tight">Graph view: layout is force-directed; tunnel metrics match the same resolved edges as Rooms/Wings.</p>':""}
      <div class="inspect-card inspect-card--hero">
        <span class="badge">Room</span>
        <div class="inspect-title">${Xe(t)}</div>
        <p class="inspect-lead">${Xe(S||"Room in the palace taxonomy.")}</p>
        ${p!=null?`<div class="inspect-pct"><span>${p}% of wing drawers (room list)</span>${pl(p)}</div>`:""}
      </div>
      ${Ht("Summary",`
        <div class="meta-block">
          ${et("Parent wing",Xe(e))}
          ${et("Drawers",u!=null?Fe(u):"—")}
          ${et("Share of palace",h!=null?`${h}%`:"—")}
        </div>`)}
      ${Ht("Position in wing",c.length?`
        <div class="meta-block">
          ${et("Rank in wing (by drawers)",g?`${Pn(g.rank)} of ${_.length}`:"—")}
          ${et("Wing avg drawers / room",D!=null?D.toFixed(1):"—")}
          ${et("vs average",H)}
        </div>`:'<p class="inspect-empty">This wing has no room-level drawer breakdown.</p>')}
      ${Ht("Connections",P&&T?`
        <div class="meta-block">
          ${et(n.graphFilterNarrowed?"Degree (visible)":"Degree (global)",Fe(y.degree))}
          ${n.graphFilterNarrowed?et("Degree (global)",Fe(Q.degree)):""}
          ${et(n.graphFilterNarrowed?"Cross-wing (visible)":"Cross-wing links",Fe(y.crossWingLinks))}
          ${n.graphFilterNarrowed?et("Cross-wing (global)",Fe(Q.crossWingLinks)):""}
          ${et(n.graphFilterNarrowed?"Intra-wing (visible)":"Intra-wing links",Fe(y.intraWingLinks))}
          ${n.graphFilterNarrowed?et("Intra-wing (global)",Fe(Q.intraWingLinks)):""}
          ${et("Relationship mix (global)",sr(Q.byType)||"—")}
          ${n.graphFilterNarrowed?et("Relationship mix (visible)",sr(y.byType)||"—"):""}
          ${et("Median degree (all rooms)",T.medianDegree!=null?Fe(T.medianDegree):"—")}
        </div>
        ${A?`<p class="inspect-muted inspect-muted--tight">${Xe(A)}</p>`:""}
        <p class="inspect-muted inspect-muted--tight">${Xe(re)}</p>
        ${z?`<p class="inspect-micro">Related rooms (global graph)</p><div class="inspect-rows">${z}</div>`:'<p class="inspect-empty">No tunnel neighbors found for this room.</p>'}
        ${W?`<p class="inspect-micro">Related wings (global graph)</p><div class="inspect-rows">${W}</div>`:""}
        `:'<p class="inspect-empty">No tunnel relationships available for this room (unresolved graph or empty tunnels).</p>')}
      ${Ht("Insight",`<p class="insight-chip">${Xe(U.label)}</p><p class="inspect-muted inspect-muted--tight">${Xe(U.detail)}</p>`)}
    </div>`}function Zg(n){const e=n.target.closest("[data-inspect-action]");if(!e)return;const t=e.getAttribute("data-inspect-action"),i=e.getAttribute("data-wing"),r=e.getAttribute("data-room");if(t==="go-wing"&&i){gl(i);return}t==="select-room"&&i&&r&&Jg(i,r)}function Jg(n,e){var r;if(ss(),!ce||!Ii(ce.wingsData,n)||!tr(ce.roomsData,n,e))return;const t=ce.roomsData[n],i=Array.isArray(t)?t.find(s=>s.name===e):null;j.currentWing=n,j.currentRoom=e,j.selected={id:`room:${n}:${e}`,type:"room",name:e,wing:n,wingId:n,roomId:(i==null?void 0:i.roomId)||It(n,e),drawers:i==null?void 0:i.drawers},j.pinned=!1,j.view="rooms",_e==null||_e.setView("rooms",n),Dt(),_e==null||_e.centerOnNodeId(`room:${n}:${e}`),ki(),pe("view-helper-text").textContent=((r=Fn.find(s=>s.id==="rooms"))==null?void 0:r.hint)||"",ri(),si(),bt(),Et()}function Qg(n){if(!n||n.type==="center"||!n.id)return null;const e=n.wingId??n.wing,t=n.roomId??(n.type==="room"&&e&&n.name!=null?It(e,n.name):null);return{id:n.id,type:n.type,name:n.name,wing:e,wingId:e,roomId:t,drawers:n.drawers}}function e_(){try{const n=localStorage.getItem(Mo);return n?JSON.parse(n):null}catch{return null}}function Et(){clearTimeout(fc),fc=setTimeout(()=>{var n,e,t;try{const i={view:j.view,currentWing:j.currentWing,currentRoom:j.currentRoom,selected:j.selected,pinned:j.pinned,searchQuery:j.searchQuery,labels:((n=pe("toggle-labels"))==null?void 0:n.checked)??!0,rotate:((e=pe("toggle-rotate"))==null?void 0:e.checked)??!0,motion:Number(((t=pe("motion-range"))==null?void 0:t.value)??1)};localStorage.setItem(Mo,JSON.stringify(i))}catch{}},200)}function gc(){ce&&kg(j,ce)}function t_(n){n&&(n.labels!==void 0&&pe("toggle-labels")&&(pe("toggle-labels").checked=!!n.labels),n.rotate!==void 0&&pe("toggle-rotate")&&(pe("toggle-rotate").checked=!!n.rotate),n.motion!==void 0&&pe("motion-range")&&(pe("motion-range").value=String(n.motion)),n.searchQuery!==void 0&&pe("search-wings")&&(pe("search-wings").value=n.searchQuery))}function n_(n){if(n==null)return;const e=zg(n);j.view=e.view,j.currentWing=e.currentWing,j.currentRoom=e.currentRoom,j.selected=e.selected,j.pinned=e.pinned,j.searchQuery=e.searchQuery}function Dt(){var n;_e==null||_e.updatePresentation({searchQuery:j.searchQuery,selectedId:((n=j.selected)==null?void 0:n.id)??null,pinActive:j.pinned})}function Hr(n,e){const t=pe("conn-status");t&&(t.dataset.state=n,t.textContent=e)}function Wr(n){var e;(e=pe("loading-overlay"))==null||e.classList.toggle("is-hidden",!n)}function i_(n,e){var i;Wr(!0);const t=pe("loading-overlay");t&&(t.innerHTML=`
    <div class="err-box">
      <strong>Unable to load data</strong>
      <p>${Xe(n)}</p>
      ${`<code>${Xe(e)}</code>`}
      <p style="margin-top:10px;color:#94a3b8;font-size:0.76rem;">Start the API bridge from the project folder:</p>
      <code style="margin-top:4px;">node server.js</code>
      <div class="btn-row">
        <button type="button" class="btn btn--ghost" id="err-retry">Retry</button>
      </div>
    </div>
  `,(i=pe("err-retry"))==null||i.addEventListener("click",()=>So(!1)))}function io(n,e){const t=pe("metric-context"),i=pe("metric-context-wrap");if(!(!t||!i)){if(!n||!e){i.hidden=!0,t.textContent="";return}if(i.hidden=!1,n.type==="wing"){const r=xo(e.wingsData).find(s=>s.wing===n.name);t.textContent=r?`Selected wing · ${Pn(r.rank)} by drawers`:"Selected wing";return}if(n.type==="room"){const r=yo(e.roomsData,n.wing).find(s=>s.name===n.name);t.textContent=r?`Selected room · ${Pn(r.rank)} in ${n.wing}`:"Selected room"}}}function si(){ce==null||ce.status;const n=ce==null?void 0:ce.graphStats,e=ce==null?void 0:ce.graph,t=(e==null?void 0:e.summary)??(n==null?void 0:n.summary),i=ce==null?void 0:ce.kgStats,r=Eo(),{wingsData:s,roomsData:a,totalDrawers:o,ga:c,overviewStats:l}=r;pe("metric-drawers").textContent=Fe(o??0),pe("metric-wings").textContent=Fe(typeof(l==null?void 0:l.totalWings)=="number"?l.totalWings:Object.keys(s).length),pe("metric-rooms").textContent=Fe(typeof(l==null?void 0:l.totalRooms)=="number"?l.totalRooms:vo(a));let u=0;typeof(t==null?void 0:t.resolvedEdgeCount)=="number"?u=t.resolvedEdgeCount:n!=null&&n.tunnels&&typeof n.tunnels=="object"&&(u=Object.keys(n.tunnels).length),pe("metric-tunnels").textContent=u?Fe(u):"—";const f=pe("metric-cross");f&&(f.textContent=c.hasResolvableEdges?Fe(c.crossWingEdgeCount):"—");const d=pe("metric-footnote");if(d){const m=c.topCrossLinkedWings[0],_=c.topConnectedRooms[0];let g="";c.hasResolvableEdges&&m&&_?g=`Most cross-linked wing: ${m.wing} · Most connected room: ${_.room} (${_.wing})`:c.hasResolvableEdges&&m?g=`Most cross-linked wing: ${m.wing}`:g="Tunnel graph: resolve endpoints to see cross-wing stats.",j.view==="graph"&&r.graphFilterNarrowed&&(g=`Visible ${Fe(r.visibleGraphSummary.visibleEdgeCount)} edges · ${g}`),d.textContent=g}if(i&&typeof i=="object"&&!i.error){const m=[];for(const[_,g]of Object.entries(i))_!=="error"&&(typeof g=="number"?m.push(`${_}: ${Fe(g)}`):typeof g=="string"&&m.push(`${_}: ${g}`));pe("metric-kg").textContent=m.length?m.slice(0,8).join(" · "):"—"}else pe("metric-kg").textContent="—";io(j.selected,r)}function r_(n,e){return e.trim()?n.toLowerCase().includes(e.trim().toLowerCase()):!0}function ml(){const n=pe("legend-host");if(!n)return;const e=ce==null?void 0:ce.status,t=e!=null&&e.wings&&typeof e.wings=="object"?e.wings:(ce==null?void 0:ce.wingsData)||{},i=Object.entries(t);if(!i.length){n.innerHTML='<div class="empty-state" style="padding:8px;">No wing data yet.</div>';return}n.innerHTML=i.map(([r,s])=>{const a=no(r),o=r_(`${r} ${s}`,j.searchQuery);return`
      <div class="legend-item" data-wing="${Xe(r)}" style="${o?"":"display:none"}">
        <span class="legend-color" style="background:${a}"></span>
        <span>${Xe(r)} · ${Fe(s)} drawers</span>
      </div>`}).join("")}function s_(n){const e=n.querySelector(".breadcrumb-nav");if(!e)return;const t=[...e.querySelectorAll(".crumb")];if(!t.length)return;t.forEach((r,s)=>{r.setAttribute("aria-posinset",String(s+1)),r.setAttribute("aria-setsize",String(t.length)),r.tabIndex=s===0?0:-1});const i=e._bcKey;i&&e.removeEventListener("keydown",i),e._bcKey=r=>{const s=t.indexOf(document.activeElement);if(!(s<0)){if(r.key==="ArrowRight"||r.key==="ArrowDown"){r.preventDefault();const a=(s+1)%t.length;t.forEach((o,c)=>{o.tabIndex=c===a?0:-1}),t[a].focus()}else if(r.key==="ArrowLeft"||r.key==="ArrowUp"){r.preventDefault();const a=(s-1+t.length)%t.length;t.forEach((o,c)=>{o.tabIndex=c===a?0:-1}),t[a].focus()}else if(r.key==="Home")r.preventDefault(),t.forEach((a,o)=>{a.tabIndex=o===0?0:-1}),t[0].focus();else if(r.key==="End"){r.preventDefault();const a=t.length-1;t.forEach((o,c)=>{o.tabIndex=c===a?0:-1}),t[a].focus()}}},e.addEventListener("keydown",e._bcKey)}function o_(){var t,i,r;const n=pe("breadcrumb");if(!n)return;const e=['<button type="button" class="crumb" data-crumb="root">All wings</button>'];j.currentWing&&(e.push('<span class="crumb-sep" aria-hidden="true">›</span>'),e.push(`<button type="button" class="crumb" data-crumb="wing" data-wing="${Xe(j.currentWing)}">${Xe(j.currentWing)}</button>`)),j.currentRoom&&j.currentWing&&(e.push('<span class="crumb-sep" aria-hidden="true">›</span>'),e.push(`<button type="button" class="crumb" data-crumb="room" data-wing="${Xe(j.currentWing)}" data-room="${Xe(j.currentRoom)}">${Xe(j.currentRoom)}</button>`)),n.innerHTML=`<nav class="breadcrumb-nav" aria-label="Palace location">${e.join("")}</nav>`,(t=n.querySelector('[data-crumb="root"]'))==null||t.addEventListener("click",()=>a_()),(i=n.querySelector('[data-crumb="wing"]'))==null||i.addEventListener("click",s=>{const a=s.currentTarget.getAttribute("data-wing");a&&gl(a)}),(r=n.querySelector('[data-crumb="room"]'))==null||r.addEventListener("click",s=>{const a=s.currentTarget.getAttribute("data-room"),o=s.currentTarget.getAttribute("data-wing");if(a&&o&&j.currentWing===o&&j.currentRoom===a){const c=`room:${o}:${a}`;_e==null||_e.centerOnNodeId(c)}}),s_(n)}function a_(){var n;ss(),j.view="wings",j.currentWing=null,j.currentRoom=null,j.selected=null,j.pinned=!1,_e==null||_e.setView("wings",null),Dt(),ki(),pe("view-helper-text").textContent=((n=Fn.find(e=>e.id==="wings"))==null?void 0:n.hint)||"",ri(),si(),bt(),Et()}function gl(n){var e;ss(),!(!ce||!Ii(ce.wingsData,n))&&(j.currentWing=n,j.currentRoom=null,j.view="rooms",j.selected=null,j.pinned=!1,_e==null||_e.setView("rooms",n),Dt(),ki(),pe("view-helper-text").textContent=((e=Fn.find(t=>t.id==="rooms"))==null?void 0:e.hint)||"",ri(),si(),bt(),Et())}function c_(){return j.pinned&&j.selected?"pinned":j.selected?"selected":j.hovered?"live":"empty"}function _c(){const n=pe("btn-pin");n&&(n.textContent=j.pinned?"Unpin":"Pin",n.disabled=!j.selected)}function bt(){const n=pe("inspect-body"),e=c_(),t=pe("inspect-mode-badge");if(t){const o={empty:"Nothing selected",live:"Live preview",selected:"Selected",pinned:"Pinned"};t.textContent=o[e],t.dataset.mode=e}let i=null;e==="pinned"||e==="selected"?i=j.selected:e==="live"&&(i=j.hovered),o_();const r=Eo(),s=Gg(r);if(!i||i.type==="center"){e==="empty"?n.innerHTML=s+qg(r):n.innerHTML=s+`
        <div class="empty-state">
          <strong>Hover a node</strong>
          <p>Move the pointer over the scene for a quick preview, or select a wing or room.</p>
        </div>`,io(null,r),_c();return}const a=i;a.type==="wing"?n.innerHTML=s+Yg(r,a.name):a.type==="room"?n.innerHTML=s+Kg(r,a.wing,a.name):n.innerHTML=s+'<div class="inspect-card"><p class="inspect-muted">Unknown node type.</p></div>',io(a,r),_c()}function et(n,e){return`<div class="meta-row"><span class="meta-k">${Xe(n)}</span><span class="meta-v">${e}</span></div>`}function vc(n,e,t){const i=pe("hover-card");if(!i)return;if(!t){i.classList.remove("is-visible");return}const r=16,s=i.offsetWidth||240,a=i.offsetHeight||80;let o=n+r,c=e+r;o+s>window.innerWidth-8&&(o=n-s-r),c+a>window.innerHeight-8&&(c=window.innerHeight-a-8),i.style.left=`${Math.max(8,o)}px`,i.style.top=`${Math.max(8,c)}px`,i.classList.add("is-visible")}function xc(n){const e=pe("hover-card");if(!e)return;if(!n||n.type==="center"){e.classList.remove("is-visible");return}const t=n.name||n.label||"Node";let i="";n.type==="wing"?i=`Wing · ${Fe(n.drawers)} drawers`:n.type==="room"&&(i=`Room in “${Xe(n.wing)}”`),e.innerHTML=`<div class="hc-title">${Xe(t)}</div><div class="hc-sub">${i}</div>`}function ki(){document.querySelectorAll("[data-view]").forEach(n=>{const e=n.getAttribute("data-view")===j.view;n.classList.toggle("is-active",e),n.setAttribute("aria-selected",e?"true":"false"),n.tabIndex=e?0:-1})}function Zi(){var e;const n=pe("help-overlay");n&&(n.classList.remove("is-open"),n.setAttribute("aria-hidden","true"),(e=jn==null?void 0:jn.focus)==null||e.call(jn),jn=null)}function l_(){const n=pe("help-overlay"),e=pe("help-dialog");!n||!e||(jn=document.activeElement instanceof HTMLElement?document.activeElement:null,n.classList.add("is-open"),n.setAttribute("aria-hidden","false"),requestAnimationFrame(()=>{var t;(t=pe("help-close"))==null||t.focus()}))}function ss(){const n=pe("help-overlay");n!=null&&n.classList.contains("is-open")&&Zi()}function Ki(n){var t;ss(),j.view=n,n==="wings"&&(j.currentWing=null,j.currentRoom=null);const e=n==="rooms"?j.currentWing:null;_e==null||_e.setView(n,e),Dt(),ki(),pe("view-helper-text").textContent=((t=Fn.find(i=>i.id===n))==null?void 0:t.hint)||"",ri(),si(),bt(),Et()}function u_(){j.selected&&(j.pinned=!j.pinned,Dt(),bt(),Et())}function yc(){j.selected=null,j.currentRoom=null,j.pinned=!1,Dt(),bt(),Et()}function h_(n){var t;if(!n||n.type==="center"){j.hovered=null,j.pinned||(j.selected=null,j.currentRoom=null),Dt(),bt(),Et();return}const e=Qg(n);if(j.hovered=null,j.view==="wings"&&n.type==="wing"){j.currentWing=n.name,j.currentRoom=null,j.selected=e,j.pinned=!1,j.view="rooms",_e==null||_e.setView("rooms",n.name),Dt(),ki(),pe("view-helper-text").textContent=((t=Fn.find(i=>i.id==="rooms"))==null?void 0:t.hint)||"",ri(),si(),bt(),Et();return}if(j.view==="rooms"&&n.type==="wing"){j.currentWing===n.name?(_e==null||_e.centerOnNodeId(n.id),j.selected=e,j.pinned=!1):(j.currentWing=n.name,j.currentRoom=null,j.selected=e,j.pinned=!1,_e==null||_e.setView("rooms",n.name),Dt()),bt(),Et();return}if(j.view==="rooms"&&n.type==="room"){j.currentWing=n.wing,j.currentRoom=n.name,j.selected=e,j.pinned=!1,_e==null||_e.setView("rooms",j.currentWing),Dt(),_e==null||_e.centerOnNodeId(n.id),bt(),Et();return}if(j.view==="graph"){if(!e)return;j.selected=e,j.pinned=!0,Dt(),bt(),Et();return}j.selected=e,j.pinned=!1,Dt(),bt(),Et()}function d_(){const n=pe("canvas-container");_e=Tg(n,{onHover:(e,t)=>{if(Wg()){xc(null),vc(0,0,!1);return}j.hovered=e&&e.type!=="center"?{...e}:null,bt(),xc(e),vc(t.x,t.y,!!e&&e.type!=="center")},onClick:e=>h_(e)}),_e.init()}function f_(){const n=pe("help-overlay");!n||n._trapWired||(n._trapWired=!0,n.addEventListener("keydown",e=>{if(!n.classList.contains("is-open")||e.key!=="Tab")return;const t=[...n.querySelectorAll("button, [href], input, select, textarea")].filter(s=>!s.hasAttribute("disabled"));if(t.length===0)return;const i=t[0],r=t[t.length-1];e.shiftKey&&document.activeElement===i?(e.preventDefault(),r.focus()):!e.shiftKey&&document.activeElement===r&&(e.preventDefault(),i.focus())}))}function p_(){var s,a;let n=!1,e=!1;try{const o=localStorage.getItem(dl);if(o){const c=JSON.parse(o);n=!!c.leftCollapsed,e=!!c.rightCollapsed}}catch{}const t=pe("app-main-grid"),i=pe("panel-left"),r=pe("panel-right");t==null||t.classList.toggle("has-left-collapsed",n),t==null||t.classList.toggle("has-right-collapsed",e),i==null||i.classList.toggle("panel--collapsed",n),r==null||r.classList.toggle("panel--collapsed",e),(s=pe("btn-collapse-left"))==null||s.setAttribute("aria-expanded",String(!n)),(a=pe("btn-collapse-right"))==null||a.setAttribute("aria-expanded",String(!e))}function Mc(){const n=pe("app-main-grid");try{localStorage.setItem(dl,JSON.stringify({leftCollapsed:(n==null?void 0:n.classList.contains("has-left-collapsed"))??!1,rightCollapsed:(n==null?void 0:n.classList.contains("has-right-collapsed"))??!1}))}catch{}}function m_(){var e,t;const n=pe("app-main-grid");(e=pe("btn-collapse-left"))==null||e.addEventListener("click",()=>{var r,s;n==null||n.classList.toggle("has-left-collapsed"),(r=pe("panel-left"))==null||r.classList.toggle("panel--collapsed");const i=n==null?void 0:n.classList.contains("has-left-collapsed");(s=pe("btn-collapse-left"))==null||s.setAttribute("aria-expanded",String(!i)),Mc()}),(t=pe("btn-collapse-right"))==null||t.addEventListener("click",()=>{var r,s;n==null||n.classList.toggle("has-right-collapsed"),(r=pe("panel-right"))==null||r.classList.toggle("panel--collapsed");const i=n==null?void 0:n.classList.contains("has-right-collapsed");(s=pe("btn-collapse-right"))==null||s.setAttribute("aria-expanded",String(!i)),Mc()})}function g_(){var t,i,r,s,a,o,c,l,u,f,d,m,_;(t=pe("btn-refresh"))==null||t.addEventListener("click",()=>So(!0)),(i=pe("btn-reset-cam"))==null||i.addEventListener("click",()=>_e==null?void 0:_e.resetCamera()),(r=pe("btn-center"))==null||r.addEventListener("click",()=>{var g;(g=j.selected)!=null&&g.id?_e==null||_e.centerOnNodeId(j.selected.id):_e==null||_e.centerOnHovered()}),(s=pe("btn-pin"))==null||s.addEventListener("click",()=>u_()),(a=pe("btn-clear-sel"))==null||a.addEventListener("click",()=>yc()),(o=pe("toggle-rotate"))==null||o.addEventListener("change",g=>{_e==null||_e.setAutoRotate(g.target.checked),Et()}),(c=pe("toggle-labels"))==null||c.addEventListener("change",g=>{_e==null||_e.setLabelsVisible(g.target.checked),Et()});const n=pe("motion-range");n==null||n.addEventListener("input",g=>{const p=Number(g.target.value);_e==null||_e.setMotionIntensity(p),g.target.setAttribute("aria-valuenow",String(p)),Et()}),n&&n.setAttribute("aria-valuenow",n.value),Fn.forEach(g=>{var p;(p=document.querySelector(`[data-view="${g.id}"]`))==null||p.addEventListener("click",()=>Ki(g.id))});const e=pe("view-buttons");if(e==null||e.addEventListener("keydown",g=>{if(g.key!=="ArrowDown"&&g.key!=="ArrowUp"&&g.key!=="ArrowRight"&&g.key!=="ArrowLeft")return;const p=[...document.querySelectorAll("[data-view]")];if(!p.length)return;const h=p.findIndex(T=>T.getAttribute("data-view")===j.view);if(h<0)return;g.preventDefault();const S=g.key==="ArrowDown"||g.key==="ArrowRight"?1:-1,x=(h+S+p.length)%p.length;Ki(p[x].getAttribute("data-view")),p[x].focus()}),(l=pe("search-wings"))==null||l.addEventListener("input",g=>{clearTimeout(dc),dc=setTimeout(()=>{j.searchQuery=g.target.value,Dt(),ml(),Et()},120)}),(u=pe("btn-help"))==null||u.addEventListener("click",()=>{const g=pe("help-overlay");g!=null&&g.classList.contains("is-open")?Zi():l_()}),(f=pe("help-close"))==null||f.addEventListener("click",()=>Zi()),(d=pe("help-overlay"))==null||d.addEventListener("click",g=>{const p=pe("help-overlay");g.target===p&&Zi()}),f_(),p_(),m_(),(m=pe("graph-view-extras"))==null||m.addEventListener("click",g=>{const p=g.target.closest("[data-rel-type]");if(!p)return;const h=p.getAttribute("data-rel-type");h&&jg(h)}),window.addEventListener("keydown",g=>{var p;if(!(mc(g.target)&&g.key!=="Escape")){if(g.key==="Escape"){const h=pe("help-overlay");if(h!=null&&h.classList.contains("is-open")){Zi();return}j.pinned?(j.pinned=!1,Dt(),bt(),Et()):j.selected&&yc();return}if(!mc(g.target)){if(g.key==="1"&&Ki("wings"),g.key==="2"&&Ki("rooms"),g.key==="3"&&Ki("graph"),(g.key==="r"||g.key==="R")&&(_e==null||_e.resetCamera()),g.key==="/"&&!g.ctrlKey&&!g.metaKey&&(g.preventDefault(),(p=pe("search-wings"))==null||p.focus()),g.key==="l"||g.key==="L"){const h=pe("toggle-labels");h&&(h.checked=!h.checked,h.dispatchEvent(new Event("change")))}if(g.key===" "){g.preventDefault();const h=pe("toggle-rotate");h&&(h.checked=!h.checked,h.dispatchEvent(new Event("change")))}}}}),localStorage.getItem("mempalace-viz-onboarded")||(pe("onboard-hint").hidden=!1,localStorage.setItem("mempalace-viz-onboarded","1")),(_=window.matchMedia)!=null&&_.call(window,"(prefers-reduced-motion: reduce)").matches&&!localStorage.getItem(Mo)){const g=pe("toggle-rotate");g&&(g.checked=!1,g.dispatchEvent(new Event("change"))),n&&(n.value="0",n.setAttribute("aria-valuenow","0"),_e==null||_e.setMotionIntensity(0))}}function __(){const n=pe("view-buttons");n&&(n.innerHTML=Fn.map(e=>`
    <button type="button" class="view-seg__btn" data-view="${e.id}" role="tab" aria-selected="${e.id===j.view?"true":"false"}" tabindex="${e.id===j.view?0:-1}">
      <strong>${Xe(e.title)}</strong>
      <span class="view-seg__hint">${Xe(e.hint)}</span>
    </button>`).join(""))}async function So(n){var s,a,o,c,l;const e=n?{view:j.view,currentWing:j.currentWing,currentRoom:j.currentRoom,selected:j.selected,pinned:j.pinned,searchQuery:j.searchQuery}:null,t=ce;Wr(!0),Hr("loading","Connecting…");const i=pe("loading-overlay");if(i&&(i.innerHTML='<div class="spinner"></div><p style="color:#94a3b8;font-size:0.85rem;">Loading palace data…</p>'),ce=await Al(),ce.error){if(n&&t&&!t.error){ce=t,Hr("stale","Offline (cached)"),Hg("Refresh failed — showing last loaded data. Check the API and try again."),Wr(!1),bt();return}Hr("error","Disconnected"),i_(ce.error.message||String(ce.error),bc()||"(same origin)");return}if(Hr("ok","Connected"),Wr(!1),!n){const u=e_();n_(u),t_(u)}if(gc(),n&&e){if(e.currentWing&&Ii(ce.wingsData,e.currentWing)?j.currentWing=e.currentWing:(j.currentWing=null,j.currentRoom=null),e.currentRoom&&j.currentWing&&tr(ce.roomsData,j.currentWing,e.currentRoom)?j.currentRoom=e.currentRoom:j.currentRoom=null,j.view=e.view,(s=e.selected)!=null&&s.id){const u=e.selected;u.type==="wing"&&Ii(ce.wingsData,u.name)||u.type==="room"&&u.wing&&tr(ce.roomsData,u.wing,u.name)?j.selected=u:j.selected=null}else j.selected=null;j.pinned=e.pinned&&!!j.selected,j.searchQuery=e.searchQuery??j.searchQuery,pe("search-wings").value=j.searchQuery}gc(),_e==null||_e.setData({wingsData:ce.wingsData,roomsData:ce.roomsData,graphEdges:ce.graphEdges}),si(),ml();const r=j.view==="rooms"?j.currentWing:null;_e==null||_e.setView(j.view,r),$g(),Dt(),_e==null||_e.setAutoRotate(((a=pe("toggle-rotate"))==null?void 0:a.checked)??!0),_e==null||_e.setLabelsVisible(((o=pe("toggle-labels"))==null?void 0:o.checked)??!0),_e==null||_e.setMotionIntensity(Number(((c=pe("motion-range"))==null?void 0:c.value)??1)),ki(),pe("view-helper-text").textContent=((l=Fn.find(u=>u.id===j.view))==null?void 0:l.hint)||"",Object.keys(ce.wingsData||{}).length?(!ce.roomsData||!Object.keys(ce.roomsData).some(u=>(ce.roomsData[u]||[]).length))&&(pe("view-helper-text").textContent+=" · No rooms in taxonomy yet."):pe("view-helper-text").textContent="No wings returned — check MCP backend.",ri(),bt(),Et()}function v_(){const n=pe("inspect-body");!n||n._delegationWired||(n._delegationWired=!0,n.addEventListener("click",Zg))}function x_(){__(),d_(),g_(),v_(),So(!1)}x_();
