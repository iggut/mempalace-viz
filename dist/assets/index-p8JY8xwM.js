(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const wc="∕";function Ac(i){return String(i??"").trim()||"unknown"}function Sl(i){return String(i??"").replace(/\//g,wc)}function bl(i){return String(i??"").replace(new RegExp(wc,"g"),"/")}function Gt(i,e){return`${Ac(i)}/${Sl(e)}`}function ri(i){const e=String(i||""),t=e.indexOf("/");return t<=0?null:{wingId:e.slice(0,t),roomName:bl(e.slice(t+1))}}function Tl(i){if(!i||typeof i!="object")return{};if(i.wings&&typeof i.wings=="object"&&!Array.isArray(i.wings))return{...i.wings};const e=new Set(["error","message","ok"]),t={};for(const[n,r]of Object.entries(i))e.has(n)||typeof r=="number"&&(t[n]=r);return Object.keys(t).length?t:{}}function wl(i){let e=i;if(e!=null&&e.taxonomy&&typeof e.taxonomy=="object"&&(e=e.taxonomy),typeof e=="string")try{e=JSON.parse(e)}catch{e={}}const t=e&&typeof e=="object"?e:{},n={},r=[],s=[];for(const[a,o]of Object.entries(t)){const c=Ac(a);n[c]||(n[c]=[]);let l=0,u=0;if(o&&typeof o=="object"&&!Array.isArray(o))for(const[f,d]of Object.entries(o)){const m=typeof d=="number"?d:1,_=Gt(c,f),g={name:f,drawers:m,roomId:_,wingId:c};n[c].push(g),r.push({roomId:_,wingId:c,name:f,drawerCount:m}),l+=m,u+=1}s.push({wingId:c,name:c,drawerCount:l,roomCount:u,rooms:n[c]})}return s.sort((a,o)=>o.drawerCount-a.drawerCount),r.sort((a,o)=>o.drawerCount-a.drawerCount),{taxonomy:t,roomsData:n,rooms:r,wings:s}}function Al(i){return i.map(e=>({from:e.sourceRoomId,to:e.targetRoomId,wing:e.sourceWingId,sourceRoomId:e.sourceRoomId,targetRoomId:e.targetRoomId,sourceWingId:e.sourceWingId,targetWingId:e.targetWingId,crossWing:e.crossWing,edgeId:e.edgeId,relationshipType:e.relationshipType}))}function Rc(){var i;return typeof window<"u"&&((i=window.location)!=null&&i.protocol)&&window.location.protocol!=="file:"?"":"http://localhost:8767"}async function hi(i){const e=await fetch(i,{headers:{Accept:"application/json"}});if(!e.ok){const t=await e.text().catch(()=>"");throw new Error(t||`HTTP ${e.status}`)}return e.json()}function Bi(i,e){return!!(i&&typeof i=="object"&&e in i)}function ur(i,e,t){const n=i==null?void 0:i[e];return Array.isArray(n)?n.some(r=>r.name===t):!1}function Rl(i){var x;const{status:e,wingsRaw:t,taxonomyRaw:n,graphStats:r,kgResult:s,overviewBundle:a}=i,o=Tl(t),{taxonomy:c,roomsData:l,rooms:u,wings:f}=wl(n),d=Array.isArray(r==null?void 0:r.edgesResolved)?r.edgesResolved:[],m=Array.isArray(r==null?void 0:r.edgesUnresolved)?r.edgesUnresolved:[],_=r!=null&&r.summary&&typeof r.summary=="object"?r.summary:null;let g=[];d.length?g=Al(d):(x=r==null?void 0:r.legacyGraphEdges)!=null&&x.length?g=r.legacyGraphEdges:r!=null&&r.tunnels&&typeof r.tunnels=="object"&&(g=Object.entries(r.tunnels).flatMap(([b,I])=>Object.entries(I||{}).map(([L,R])=>({from:b,to:L,wing:R}))));const p=s&&!s.error?s:null,h=a!=null&&a.stats&&typeof a.stats=="object"?a.stats:null,E=(r==null?void 0:r.graphMeta)??(a==null?void 0:a.graphMeta)??null;return{status:e,wingsData:o,taxonomy:c,roomsData:l,rooms:u,wings:f,graphStats:r,graph:{edgesResolved:d,edgesUnresolved:m,summary:_,graphMeta:E},graphEdges:g,overviewBundle:a,overviewStats:h,graphMeta:E,kgStats:p,error:null}}async function Cl(){const e=`${Rc()}/api`;try{const[t,n,r,s,a,o]=await Promise.all([hi(`${e}/status`),hi(`${e}/wings`),hi(`${e}/taxonomy`),hi(`${e}/graph-stats`),hi(`${e}/kg-stats`).catch(()=>null),hi(`${e}/overview`).catch(()=>null)]);return Rl({status:t,wingsRaw:n,taxonomyRaw:r,graphStats:s,kgResult:a,overviewBundle:o})}catch(t){return{status:null,wingsData:{},taxonomy:{},roomsData:{},rooms:[],wings:[],graphStats:null,graph:{edgesResolved:[],edgesUnresolved:[],summary:null,graphMeta:null},graphEdges:[],overviewBundle:null,overviewStats:null,graphMeta:null,kgStats:null,error:t}}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const uo="160",di={ROTATE:0,DOLLY:1,PAN:2},fi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ll=0,Do=1,Pl=2,Cc=1,Dl=2,En=3,Hn=0,Wt=1,Sn=2,Bn=0,Fi=1,Io=2,Uo=3,No=4,Il=5,Qn=100,Ul=101,Nl=102,Fo=103,Oo=104,Fl=200,Ol=201,Bl=202,zl=203,Ys=204,Ks=205,kl=206,Hl=207,Gl=208,Wl=209,Vl=210,Xl=211,$l=212,jl=213,ql=214,Yl=0,Kl=1,Zl=2,Zr=3,Jl=4,Ql=5,eu=6,tu=7,Lc=0,nu=1,iu=2,zn=0,ru=1,su=2,ou=3,Pc=4,au=5,cu=6,Dc=300,zi=301,ki=302,Zs=303,Js=304,os=306,Qs=1e3,un=1001,eo=1002,kt=1003,Bo=1004,gs=1005,en=1006,lu=1007,hr=1008,kn=1009,uu=1010,hu=1011,ho=1012,Ic=1013,Nn=1014,Fn=1015,dr=1016,Uc=1017,Nc=1018,ti=1020,du=1021,hn=1023,fu=1024,pu=1025,ni=1026,Hi=1027,mu=1028,Fc=1029,gu=1030,Oc=1031,Bc=1033,_s=33776,vs=33777,xs=33778,Ms=33779,zo=35840,ko=35841,Ho=35842,Go=35843,zc=36196,Wo=37492,Vo=37496,Xo=37808,$o=37809,jo=37810,qo=37811,Yo=37812,Ko=37813,Zo=37814,Jo=37815,Qo=37816,ea=37817,ta=37818,na=37819,ia=37820,ra=37821,ys=36492,sa=36494,oa=36495,_u=36283,aa=36284,ca=36285,la=36286,kc=3e3,ii=3001,vu=3200,xu=3201,Hc=0,Mu=1,sn="",Ct="srgb",An="srgb-linear",fo="display-p3",as="display-p3-linear",Jr="linear",ft="srgb",Qr="rec709",es="p3",pi=7680,ua=519,yu=512,Eu=513,Su=514,Gc=515,bu=516,Tu=517,wu=518,Au=519,to=35044,ha="300 es",no=1035,bn=2e3,ts=2001;class ci{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Nt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let da=1234567;const ar=Math.PI/180,fr=180/Math.PI;function wn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Nt[i&255]+Nt[i>>8&255]+Nt[i>>16&255]+Nt[i>>24&255]+"-"+Nt[e&255]+Nt[e>>8&255]+"-"+Nt[e>>16&15|64]+Nt[e>>24&255]+"-"+Nt[t&63|128]+Nt[t>>8&255]+"-"+Nt[t>>16&255]+Nt[t>>24&255]+Nt[n&255]+Nt[n>>8&255]+Nt[n>>16&255]+Nt[n>>24&255]).toLowerCase()}function Ot(i,e,t){return Math.max(e,Math.min(t,i))}function po(i,e){return(i%e+e)%e}function Ru(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function Cu(i,e,t){return i!==e?(t-i)/(e-i):0}function cr(i,e,t){return(1-t)*i+t*e}function Lu(i,e,t,n){return cr(i,e,1-Math.exp(-t*n))}function Pu(i,e=1){return e-Math.abs(po(i,e*2)-e)}function Du(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Iu(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Uu(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Nu(i,e){return i+Math.random()*(e-i)}function Fu(i){return i*(.5-Math.random())}function Ou(i){i!==void 0&&(da=i);let e=da+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Bu(i){return i*ar}function zu(i){return i*fr}function io(i){return(i&i-1)===0&&i!==0}function ku(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function ns(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Hu(i,e,t,n,r){const s=Math.cos,a=Math.sin,o=s(t/2),c=a(t/2),l=s((e+n)/2),u=a((e+n)/2),f=s((e-n)/2),d=a((e-n)/2),m=s((n-e)/2),_=a((n-e)/2);switch(r){case"XYX":i.set(o*u,c*f,c*d,o*l);break;case"YZY":i.set(c*d,o*u,c*f,o*l);break;case"ZXZ":i.set(c*f,c*d,o*u,o*l);break;case"XZX":i.set(o*u,c*_,c*m,o*l);break;case"YXY":i.set(c*m,o*u,c*_,o*l);break;case"ZYZ":i.set(c*_,c*m,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function mn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function lt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Kn={DEG2RAD:ar,RAD2DEG:fr,generateUUID:wn,clamp:Ot,euclideanModulo:po,mapLinear:Ru,inverseLerp:Cu,lerp:cr,damp:Lu,pingpong:Pu,smoothstep:Du,smootherstep:Iu,randInt:Uu,randFloat:Nu,randFloatSpread:Fu,seededRandom:Ou,degToRad:Bu,radToDeg:zu,isPowerOfTwo:io,ceilPowerOfTwo:ku,floorPowerOfTwo:ns,setQuaternionFromProperEuler:Hu,normalize:lt,denormalize:mn};class ke{constructor(e=0,t=0){ke.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class st{constructor(e,t,n,r,s,a,o,c,l){st.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l)}set(e,t,n,r,s,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],f=n[7],d=n[2],m=n[5],_=n[8],g=r[0],p=r[3],h=r[6],E=r[1],x=r[4],b=r[7],I=r[2],L=r[5],R=r[8];return s[0]=a*g+o*E+c*I,s[3]=a*p+o*x+c*L,s[6]=a*h+o*b+c*R,s[1]=l*g+u*E+f*I,s[4]=l*p+u*x+f*L,s[7]=l*h+u*b+f*R,s[2]=d*g+m*E+_*I,s[5]=d*p+m*x+_*L,s[8]=d*h+m*b+_*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*s*u+n*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],f=u*a-o*l,d=o*c-u*s,m=l*s-a*c,_=t*f+n*d+r*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=f*g,e[1]=(r*l-u*n)*g,e[2]=(o*n-r*a)*g,e[3]=d*g,e[4]=(u*t-r*c)*g,e[5]=(r*s-o*t)*g,e[6]=m*g,e[7]=(n*c-l*t)*g,e[8]=(a*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Es.makeScale(e,t)),this}rotate(e){return this.premultiply(Es.makeRotation(-e)),this}translate(e,t){return this.premultiply(Es.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Es=new st;function Wc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function is(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Gu(){const i=is("canvas");return i.style.display="block",i}const fa={};function lr(i){i in fa||(fa[i]=!0,console.warn(i))}const pa=new st().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ma=new st().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),vr={[An]:{transfer:Jr,primaries:Qr,toReference:i=>i,fromReference:i=>i},[Ct]:{transfer:ft,primaries:Qr,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[as]:{transfer:Jr,primaries:es,toReference:i=>i.applyMatrix3(ma),fromReference:i=>i.applyMatrix3(pa)},[fo]:{transfer:ft,primaries:es,toReference:i=>i.convertSRGBToLinear().applyMatrix3(ma),fromReference:i=>i.applyMatrix3(pa).convertLinearToSRGB()}},Wu=new Set([An,as]),ut={enabled:!0,_workingColorSpace:An,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Wu.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=vr[e].toReference,r=vr[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return vr[i].primaries},getTransfer:function(i){return i===sn?Jr:vr[i].transfer}};function Oi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ss(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let mi;class Vc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{mi===void 0&&(mi=is("canvas")),mi.width=e.width,mi.height=e.height;const n=mi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=mi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=is("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Oi(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Oi(t[n]/255)*255):t[n]=Oi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Vu=0;class Xc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Vu++}),this.uuid=wn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(bs(r[a].image)):s.push(bs(r[a]))}else s=bs(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function bs(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Vc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Xu=0;class Xt extends ci{constructor(e=Xt.DEFAULT_IMAGE,t=Xt.DEFAULT_MAPPING,n=un,r=un,s=en,a=hr,o=hn,c=kn,l=Xt.DEFAULT_ANISOTROPY,u=sn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xu++}),this.uuid=wn(),this.name="",this.source=new Xc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ke(0,0),this.repeat=new ke(1,1),this.center=new ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new st,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(lr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===ii?Ct:sn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Dc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qs:e.x=e.x-Math.floor(e.x);break;case un:e.x=e.x<0?0:1;break;case eo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Qs:e.y=e.y-Math.floor(e.y);break;case un:e.y=e.y<0?0:1;break;case eo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return lr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Ct?ii:kc}set encoding(e){lr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===ii?Ct:sn}}Xt.DEFAULT_IMAGE=null;Xt.DEFAULT_MAPPING=Dc;Xt.DEFAULT_ANISOTROPY=1;class Pt{constructor(e=0,t=0,n=0,r=1){Pt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const c=e.elements,l=c[0],u=c[4],f=c[8],d=c[1],m=c[5],_=c[9],g=c[2],p=c[6],h=c[10];if(Math.abs(u-d)<.01&&Math.abs(f-g)<.01&&Math.abs(_-p)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+g)<.1&&Math.abs(_+p)<.1&&Math.abs(l+m+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(l+1)/2,b=(m+1)/2,I=(h+1)/2,L=(u+d)/4,R=(f+g)/4,Y=(_+p)/4;return x>b&&x>I?x<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(x),r=L/n,s=R/n):b>I?b<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),n=L/r,s=Y/r):I<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(I),n=R/s,r=Y/s),this.set(n,r,s,t),this}let E=Math.sqrt((p-_)*(p-_)+(f-g)*(f-g)+(d-u)*(d-u));return Math.abs(E)<.001&&(E=1),this.x=(p-_)/E,this.y=(f-g)/E,this.z=(d-u)/E,this.w=Math.acos((l+m+h-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $u extends ci{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Pt(0,0,e,t),this.scissorTest=!1,this.viewport=new Pt(0,0,e,t);const r={width:e,height:t,depth:1};n.encoding!==void 0&&(lr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===ii?Ct:sn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Xt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Xc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class si extends $u{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class $c extends Xt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=kt,this.minFilter=kt,this.wrapR=un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ju extends Xt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=kt,this.minFilter=kt,this.wrapR=un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class oi{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let c=n[r+0],l=n[r+1],u=n[r+2],f=n[r+3];const d=s[a+0],m=s[a+1],_=s[a+2],g=s[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f;return}if(o===1){e[t+0]=d,e[t+1]=m,e[t+2]=_,e[t+3]=g;return}if(f!==g||c!==d||l!==m||u!==_){let p=1-o;const h=c*d+l*m+u*_+f*g,E=h>=0?1:-1,x=1-h*h;if(x>Number.EPSILON){const I=Math.sqrt(x),L=Math.atan2(I,h*E);p=Math.sin(p*L)/I,o=Math.sin(o*L)/I}const b=o*E;if(c=c*p+d*b,l=l*p+m*b,u=u*p+_*b,f=f*p+g*b,p===1-o){const I=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=I,l*=I,u*=I,f*=I}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],c=n[r+1],l=n[r+2],u=n[r+3],f=s[a],d=s[a+1],m=s[a+2],_=s[a+3];return e[t]=o*_+u*f+c*m-l*d,e[t+1]=c*_+u*d+l*f-o*m,e[t+2]=l*_+u*m+o*d-c*f,e[t+3]=u*_-o*f-c*d-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(r/2),f=o(s/2),d=c(n/2),m=c(r/2),_=c(s/2);switch(a){case"XYZ":this._x=d*u*f+l*m*_,this._y=l*m*f-d*u*_,this._z=l*u*_+d*m*f,this._w=l*u*f-d*m*_;break;case"YXZ":this._x=d*u*f+l*m*_,this._y=l*m*f-d*u*_,this._z=l*u*_-d*m*f,this._w=l*u*f+d*m*_;break;case"ZXY":this._x=d*u*f-l*m*_,this._y=l*m*f+d*u*_,this._z=l*u*_+d*m*f,this._w=l*u*f-d*m*_;break;case"ZYX":this._x=d*u*f-l*m*_,this._y=l*m*f+d*u*_,this._z=l*u*_-d*m*f,this._w=l*u*f+d*m*_;break;case"YZX":this._x=d*u*f+l*m*_,this._y=l*m*f+d*u*_,this._z=l*u*_-d*m*f,this._w=l*u*f-d*m*_;break;case"XZY":this._x=d*u*f-l*m*_,this._y=l*m*f-d*u*_,this._z=l*u*_+d*m*f,this._w=l*u*f+d*m*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],f=t[10],d=n+o+f;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(u-c)*m,this._y=(s-l)*m,this._z=(a-r)*m}else if(n>o&&n>f){const m=2*Math.sqrt(1+n-o-f);this._w=(u-c)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+l)/m}else if(o>f){const m=2*Math.sqrt(1+o-n-f);this._w=(s-l)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(c+u)/m}else{const m=2*Math.sqrt(1+f-n-o);this._w=(a-r)/m,this._x=(s+l)/m,this._y=(c+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ot(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+r*l-s*c,this._y=r*u+a*c+s*o-n*l,this._z=s*u+a*l+n*c-r*o,this._w=a*u-n*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),f=Math.sin((1-t)*u)/l,d=Math.sin(t*u)/l;return this._w=a*f+this._w*d,this._x=n*f+this._x*d,this._y=r*f+this._y*d,this._z=s*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),n*Math.sin(s),n*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,n=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ga.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ga.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*n),u=2*(o*t-s*r),f=2*(s*n-a*t);return this.x=t+c*l+a*f-o*u,this.y=n+c*u+o*l-s*f,this.z=r+c*f+s*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ts.copy(this).projectOnVector(e),this.sub(Ts)}reflect(e){return this.sub(Ts.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ts=new N,ga=new oi;class Vi{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(an.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(an.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=an.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,an):an.fromBufferAttribute(s,a),an.applyMatrix4(e.matrixWorld),this.expandByPoint(an);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),xr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),xr.copy(n.boundingBox)),xr.applyMatrix4(e.matrixWorld),this.union(xr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,an),an.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(qi),Mr.subVectors(this.max,qi),gi.subVectors(e.a,qi),_i.subVectors(e.b,qi),vi.subVectors(e.c,qi),Rn.subVectors(_i,gi),Cn.subVectors(vi,_i),$n.subVectors(gi,vi);let t=[0,-Rn.z,Rn.y,0,-Cn.z,Cn.y,0,-$n.z,$n.y,Rn.z,0,-Rn.x,Cn.z,0,-Cn.x,$n.z,0,-$n.x,-Rn.y,Rn.x,0,-Cn.y,Cn.x,0,-$n.y,$n.x,0];return!ws(t,gi,_i,vi,Mr)||(t=[1,0,0,0,1,0,0,0,1],!ws(t,gi,_i,vi,Mr))?!1:(yr.crossVectors(Rn,Cn),t=[yr.x,yr.y,yr.z],ws(t,gi,_i,vi,Mr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,an).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(an).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const _n=[new N,new N,new N,new N,new N,new N,new N,new N],an=new N,xr=new Vi,gi=new N,_i=new N,vi=new N,Rn=new N,Cn=new N,$n=new N,qi=new N,Mr=new N,yr=new N,jn=new N;function ws(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){jn.fromArray(i,s);const o=r.x*Math.abs(jn.x)+r.y*Math.abs(jn.y)+r.z*Math.abs(jn.z),c=e.dot(jn),l=t.dot(jn),u=n.dot(jn);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const qu=new Vi,Yi=new N,As=new N;class mr{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):qu.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Yi.subVectors(e,this.center);const t=Yi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Yi,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(As.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Yi.copy(e.center).add(As)),this.expandByPoint(Yi.copy(e.center).sub(As))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const vn=new N,Rs=new N,Er=new N,Ln=new N,Cs=new N,Sr=new N,Ls=new N;class gr{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,vn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=vn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(vn.copy(this.origin).addScaledVector(this.direction,t),vn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Rs.copy(e).add(t).multiplyScalar(.5),Er.copy(t).sub(e).normalize(),Ln.copy(this.origin).sub(Rs);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Er),o=Ln.dot(this.direction),c=-Ln.dot(Er),l=Ln.lengthSq(),u=Math.abs(1-a*a);let f,d,m,_;if(u>0)if(f=a*c-o,d=a*o-c,_=s*u,f>=0)if(d>=-_)if(d<=_){const g=1/u;f*=g,d*=g,m=f*(f+a*d+2*o)+d*(a*f+d+2*c)+l}else d=s,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*c)+l;else d=-s,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*c)+l;else d<=-_?(f=Math.max(0,-(-a*s+o)),d=f>0?-s:Math.min(Math.max(-s,-c),s),m=-f*f+d*(d+2*c)+l):d<=_?(f=0,d=Math.min(Math.max(-s,-c),s),m=d*(d+2*c)+l):(f=Math.max(0,-(a*s+o)),d=f>0?s:Math.min(Math.max(-s,-c),s),m=-f*f+d*(d+2*c)+l);else d=a>0?-s:s,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Rs).addScaledVector(Er,d),m}intersectSphere(e,t){vn.subVectors(e.center,this.origin);const n=vn.dot(this.direction),r=vn.dot(vn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-d.z)*f,c=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,c=(e.min.z-d.z)*f),n>c||o>r)||((o>n||n!==n)&&(n=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,vn)!==null}intersectTriangle(e,t,n,r,s){Cs.subVectors(t,e),Sr.subVectors(n,e),Ls.crossVectors(Cs,Sr);let a=this.direction.dot(Ls),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ln.subVectors(this.origin,e);const c=o*this.direction.dot(Sr.crossVectors(Ln,Sr));if(c<0)return null;const l=o*this.direction.dot(Cs.cross(Ln));if(l<0||c+l>a)return null;const u=-o*Ln.dot(Ls);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vt{constructor(e,t,n,r,s,a,o,c,l,u,f,d,m,_,g,p){vt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l,u,f,d,m,_,g,p)}set(e,t,n,r,s,a,o,c,l,u,f,d,m,_,g,p){const h=this.elements;return h[0]=e,h[4]=t,h[8]=n,h[12]=r,h[1]=s,h[5]=a,h[9]=o,h[13]=c,h[2]=l,h[6]=u,h[10]=f,h[14]=d,h[3]=m,h[7]=_,h[11]=g,h[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/xi.setFromMatrixColumn(e,0).length(),s=1/xi.setFromMatrixColumn(e,1).length(),a=1/xi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=a*u,m=a*f,_=o*u,g=o*f;t[0]=c*u,t[4]=-c*f,t[8]=l,t[1]=m+_*l,t[5]=d-g*l,t[9]=-o*c,t[2]=g-d*l,t[6]=_+m*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*u,m=c*f,_=l*u,g=l*f;t[0]=d+g*o,t[4]=_*o-m,t[8]=a*l,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=m*o-_,t[6]=g+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*u,m=c*f,_=l*u,g=l*f;t[0]=d-g*o,t[4]=-a*f,t[8]=_+m*o,t[1]=m+_*o,t[5]=a*u,t[9]=g-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*u,m=a*f,_=o*u,g=o*f;t[0]=c*u,t[4]=_*l-m,t[8]=d*l+g,t[1]=c*f,t[5]=g*l+d,t[9]=m*l-_,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,m=a*l,_=o*c,g=o*l;t[0]=c*u,t[4]=g-d*f,t[8]=_*f+m,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=m*f+_,t[10]=d-g*f}else if(e.order==="XZY"){const d=a*c,m=a*l,_=o*c,g=o*l;t[0]=c*u,t[4]=-f,t[8]=l*u,t[1]=d*f+g,t[5]=a*u,t[9]=m*f-_,t[2]=_*f-m,t[6]=o*u,t[10]=g*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Yu,e,Ku)}lookAt(e,t,n){const r=this.elements;return jt.subVectors(e,t),jt.lengthSq()===0&&(jt.z=1),jt.normalize(),Pn.crossVectors(n,jt),Pn.lengthSq()===0&&(Math.abs(n.z)===1?jt.x+=1e-4:jt.z+=1e-4,jt.normalize(),Pn.crossVectors(n,jt)),Pn.normalize(),br.crossVectors(jt,Pn),r[0]=Pn.x,r[4]=br.x,r[8]=jt.x,r[1]=Pn.y,r[5]=br.y,r[9]=jt.y,r[2]=Pn.z,r[6]=br.z,r[10]=jt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],f=n[5],d=n[9],m=n[13],_=n[2],g=n[6],p=n[10],h=n[14],E=n[3],x=n[7],b=n[11],I=n[15],L=r[0],R=r[4],Y=r[8],M=r[12],T=r[1],F=r[5],U=r[9],k=r[13],w=r[2],B=r[6],H=r[10],J=r[14],Z=r[3],q=r[7],ee=r[11],oe=r[15];return s[0]=a*L+o*T+c*w+l*Z,s[4]=a*R+o*F+c*B+l*q,s[8]=a*Y+o*U+c*H+l*ee,s[12]=a*M+o*k+c*J+l*oe,s[1]=u*L+f*T+d*w+m*Z,s[5]=u*R+f*F+d*B+m*q,s[9]=u*Y+f*U+d*H+m*ee,s[13]=u*M+f*k+d*J+m*oe,s[2]=_*L+g*T+p*w+h*Z,s[6]=_*R+g*F+p*B+h*q,s[10]=_*Y+g*U+p*H+h*ee,s[14]=_*M+g*k+p*J+h*oe,s[3]=E*L+x*T+b*w+I*Z,s[7]=E*R+x*F+b*B+I*q,s[11]=E*Y+x*U+b*H+I*ee,s[15]=E*M+x*k+b*J+I*oe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],f=e[6],d=e[10],m=e[14],_=e[3],g=e[7],p=e[11],h=e[15];return _*(+s*c*f-r*l*f-s*o*d+n*l*d+r*o*m-n*c*m)+g*(+t*c*m-t*l*d+s*a*d-r*a*m+r*l*u-s*c*u)+p*(+t*l*f-t*o*m-s*a*f+n*a*m+s*o*u-n*l*u)+h*(-r*o*u-t*c*f+t*o*d+r*a*f-n*a*d+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],f=e[9],d=e[10],m=e[11],_=e[12],g=e[13],p=e[14],h=e[15],E=f*p*l-g*d*l+g*c*m-o*p*m-f*c*h+o*d*h,x=_*d*l-u*p*l-_*c*m+a*p*m+u*c*h-a*d*h,b=u*g*l-_*f*l+_*o*m-a*g*m-u*o*h+a*f*h,I=_*f*c-u*g*c-_*o*d+a*g*d+u*o*p-a*f*p,L=t*E+n*x+r*b+s*I;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/L;return e[0]=E*R,e[1]=(g*d*s-f*p*s-g*r*m+n*p*m+f*r*h-n*d*h)*R,e[2]=(o*p*s-g*c*s+g*r*l-n*p*l-o*r*h+n*c*h)*R,e[3]=(f*c*s-o*d*s-f*r*l+n*d*l+o*r*m-n*c*m)*R,e[4]=x*R,e[5]=(u*p*s-_*d*s+_*r*m-t*p*m-u*r*h+t*d*h)*R,e[6]=(_*c*s-a*p*s-_*r*l+t*p*l+a*r*h-t*c*h)*R,e[7]=(a*d*s-u*c*s+u*r*l-t*d*l-a*r*m+t*c*m)*R,e[8]=b*R,e[9]=(_*f*s-u*g*s-_*n*m+t*g*m+u*n*h-t*f*h)*R,e[10]=(a*g*s-_*o*s+_*n*l-t*g*l-a*n*h+t*o*h)*R,e[11]=(u*o*s-a*f*s-u*n*l+t*f*l+a*n*m-t*o*m)*R,e[12]=I*R,e[13]=(u*g*r-_*f*r+_*n*d-t*g*d-u*n*p+t*f*p)*R,e[14]=(_*o*r-a*g*r-_*n*c+t*g*c+a*n*p-t*o*p)*R,e[15]=(a*f*r-u*o*r+u*n*c-t*f*c-a*n*d+t*o*d)*R,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,u=s*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+n,u*c-r*a,0,l*c-r*o,u*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,u=a+a,f=o+o,d=s*l,m=s*u,_=s*f,g=a*u,p=a*f,h=o*f,E=c*l,x=c*u,b=c*f,I=n.x,L=n.y,R=n.z;return r[0]=(1-(g+h))*I,r[1]=(m+b)*I,r[2]=(_-x)*I,r[3]=0,r[4]=(m-b)*L,r[5]=(1-(d+h))*L,r[6]=(p+E)*L,r[7]=0,r[8]=(_+x)*R,r[9]=(p-E)*R,r[10]=(1-(d+g))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=xi.set(r[0],r[1],r[2]).length();const a=xi.set(r[4],r[5],r[6]).length(),o=xi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],cn.copy(this);const l=1/s,u=1/a,f=1/o;return cn.elements[0]*=l,cn.elements[1]*=l,cn.elements[2]*=l,cn.elements[4]*=u,cn.elements[5]*=u,cn.elements[6]*=u,cn.elements[8]*=f,cn.elements[9]*=f,cn.elements[10]*=f,t.setFromRotationMatrix(cn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a,o=bn){const c=this.elements,l=2*s/(t-e),u=2*s/(n-r),f=(t+e)/(t-e),d=(n+r)/(n-r);let m,_;if(o===bn)m=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===ts)m=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=bn){const c=this.elements,l=1/(t-e),u=1/(n-r),f=1/(a-s),d=(t+e)*l,m=(n+r)*u;let _,g;if(o===bn)_=(a+s)*f,g=-2*f;else if(o===ts)_=s*f,g=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=g,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const xi=new N,cn=new vt,Yu=new N(0,0,0),Ku=new N(1,1,1),Pn=new N,br=new N,jt=new N,_a=new vt,va=new oi;class cs{constructor(e=0,t=0,n=0,r=cs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],f=r[2],d=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(Ot(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ot(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ot(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Ot(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ot(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Ot(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return _a.makeRotationFromQuaternion(e),this.setFromRotationMatrix(_a,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return va.setFromEuler(this),this.setFromQuaternion(va,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}cs.DEFAULT_ORDER="XYZ";class mo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Zu=0;const xa=new N,Mi=new oi,xn=new vt,Tr=new N,Ki=new N,Ju=new N,Qu=new oi,Ma=new N(1,0,0),ya=new N(0,1,0),Ea=new N(0,0,1),eh={type:"added"},th={type:"removed"};class Et extends ci{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zu++}),this.uuid=wn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Et.DEFAULT_UP.clone();const e=new N,t=new cs,n=new oi,r=new N(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new vt},normalMatrix:{value:new st}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=Et.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Mi.setFromAxisAngle(e,t),this.quaternion.multiply(Mi),this}rotateOnWorldAxis(e,t){return Mi.setFromAxisAngle(e,t),this.quaternion.premultiply(Mi),this}rotateX(e){return this.rotateOnAxis(Ma,e)}rotateY(e){return this.rotateOnAxis(ya,e)}rotateZ(e){return this.rotateOnAxis(Ea,e)}translateOnAxis(e,t){return xa.copy(e).applyQuaternion(this.quaternion),this.position.add(xa.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ma,e)}translateY(e){return this.translateOnAxis(ya,e)}translateZ(e){return this.translateOnAxis(Ea,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Tr.copy(e):Tr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ki.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(Ki,Tr,this.up):xn.lookAt(Tr,Ki,this.up),this.quaternion.setFromRotationMatrix(xn),r&&(xn.extractRotation(r.matrixWorld),Mi.setFromRotationMatrix(xn),this.quaternion.premultiply(Mi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(eh)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(th)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xn.multiply(e.parent.matrixWorld)),e.applyMatrix4(xn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ki,e,Ju),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ki,Qu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];s(e.shapes,f)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),f=a(e.shapes),d=a(e.skeletons),m=a(e.animations),_=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),_.length>0&&(n.nodes=_)}return n.object=r,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}Et.DEFAULT_UP=new N(0,1,0);Et.DEFAULT_MATRIX_AUTO_UPDATE=!0;Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ln=new N,Mn=new N,Ps=new N,yn=new N,yi=new N,Ei=new N,Sa=new N,Ds=new N,Is=new N,Us=new N;let wr=!1;class tn{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),ln.subVectors(e,t),r.cross(ln);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){ln.subVectors(r,t),Mn.subVectors(n,t),Ps.subVectors(e,t);const a=ln.dot(ln),o=ln.dot(Mn),c=ln.dot(Ps),l=Mn.dot(Mn),u=Mn.dot(Ps),f=a*l-o*o;if(f===0)return s.set(0,0,0),null;const d=1/f,m=(l*c-o*u)*d,_=(a*u-o*c)*d;return s.set(1-m-_,_,m)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,yn)===null?!1:yn.x>=0&&yn.y>=0&&yn.x+yn.y<=1}static getUV(e,t,n,r,s,a,o,c){return wr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),wr=!0),this.getInterpolation(e,t,n,r,s,a,o,c)}static getInterpolation(e,t,n,r,s,a,o,c){return this.getBarycoord(e,t,n,r,yn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,yn.x),c.addScaledVector(a,yn.y),c.addScaledVector(o,yn.z),c)}static isFrontFacing(e,t,n,r){return ln.subVectors(n,t),Mn.subVectors(e,t),ln.cross(Mn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ln.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),ln.cross(Mn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return tn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return tn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,r,s){return wr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),wr=!0),tn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}getInterpolation(e,t,n,r,s){return tn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return tn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return tn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;yi.subVectors(r,n),Ei.subVectors(s,n),Ds.subVectors(e,n);const c=yi.dot(Ds),l=Ei.dot(Ds);if(c<=0&&l<=0)return t.copy(n);Is.subVectors(e,r);const u=yi.dot(Is),f=Ei.dot(Is);if(u>=0&&f<=u)return t.copy(r);const d=c*f-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(yi,a);Us.subVectors(e,s);const m=yi.dot(Us),_=Ei.dot(Us);if(_>=0&&m<=_)return t.copy(s);const g=m*l-c*_;if(g<=0&&l>=0&&_<=0)return o=l/(l-_),t.copy(n).addScaledVector(Ei,o);const p=u*_-m*f;if(p<=0&&f-u>=0&&m-_>=0)return Sa.subVectors(s,r),o=(f-u)/(f-u+(m-_)),t.copy(r).addScaledVector(Sa,o);const h=1/(p+g+d);return a=g*h,o=d*h,t.copy(n).addScaledVector(yi,a).addScaledVector(Ei,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const jc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Dn={h:0,s:0,l:0},Ar={h:0,s:0,l:0};function Ns(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class it{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ct){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ut.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=ut.workingColorSpace){return this.r=e,this.g=t,this.b=n,ut.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=ut.workingColorSpace){if(e=po(e,1),t=Ot(t,0,1),n=Ot(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Ns(a,s,e+1/3),this.g=Ns(a,s,e),this.b=Ns(a,s,e-1/3)}return ut.toWorkingColorSpace(this,r),this}setStyle(e,t=Ct){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ct){const n=jc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Oi(e.r),this.g=Oi(e.g),this.b=Oi(e.b),this}copyLinearToSRGB(e){return this.r=Ss(e.r),this.g=Ss(e.g),this.b=Ss(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ct){return ut.fromWorkingColorSpace(Ft.copy(this),e),Math.round(Ot(Ft.r*255,0,255))*65536+Math.round(Ot(Ft.g*255,0,255))*256+Math.round(Ot(Ft.b*255,0,255))}getHexString(e=Ct){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ut.workingColorSpace){ut.fromWorkingColorSpace(Ft.copy(this),t);const n=Ft.r,r=Ft.g,s=Ft.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const f=a-o;switch(l=u<=.5?f/(a+o):f/(2-a-o),a){case n:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-n)/f+2;break;case s:c=(n-r)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=ut.workingColorSpace){return ut.fromWorkingColorSpace(Ft.copy(this),t),e.r=Ft.r,e.g=Ft.g,e.b=Ft.b,e}getStyle(e=Ct){ut.fromWorkingColorSpace(Ft.copy(this),e);const t=Ft.r,n=Ft.g,r=Ft.b;return e!==Ct?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Dn),this.setHSL(Dn.h+e,Dn.s+t,Dn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Dn),e.getHSL(Ar);const n=cr(Dn.h,Ar.h,t),r=cr(Dn.s,Ar.s,t),s=cr(Dn.l,Ar.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ft=new it;it.NAMES=jc;let nh=0;class Gn extends ci{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:nh++}),this.uuid=wn(),this.name="",this.type="Material",this.blending=Fi,this.side=Hn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ys,this.blendDst=Ks,this.blendEquation=Qn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new it(0,0,0),this.blendAlpha=0,this.depthFunc=Zr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ua,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pi,this.stencilZFail=pi,this.stencilZPass=pi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Fi&&(n.blending=this.blending),this.side!==Hn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ys&&(n.blendSrc=this.blendSrc),this.blendDst!==Ks&&(n.blendDst=this.blendDst),this.blendEquation!==Qn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Zr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ua&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==pi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==pi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==pi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class go extends Gn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new it(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Lc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const yt=new N,Rr=new ke;class dn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=to,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Fn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Rr.fromBufferAttribute(this,t),Rr.applyMatrix3(e),this.setXY(t,Rr.x,Rr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix3(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix4(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyNormalMatrix(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.transformDirection(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=mn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=lt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=mn(t,this.array)),t}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=mn(t,this.array)),t}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=mn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=mn(t,this.array)),t}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),r=lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),r=lt(r,this.array),s=lt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==to&&(e.usage=this.usage),e}}class qc extends dn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Yc extends dn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class on extends dn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let ih=0;const Qt=new vt,Fs=new Et,Si=new N,qt=new Vi,Zi=new Vi,Rt=new N;class Zt extends ci{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ih++}),this.uuid=wn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Wc(e)?Yc:qc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new st().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Qt.makeRotationFromQuaternion(e),this.applyMatrix4(Qt),this}rotateX(e){return Qt.makeRotationX(e),this.applyMatrix4(Qt),this}rotateY(e){return Qt.makeRotationY(e),this.applyMatrix4(Qt),this}rotateZ(e){return Qt.makeRotationZ(e),this.applyMatrix4(Qt),this}translate(e,t,n){return Qt.makeTranslation(e,t,n),this.applyMatrix4(Qt),this}scale(e,t,n){return Qt.makeScale(e,t,n),this.applyMatrix4(Qt),this}lookAt(e){return Fs.lookAt(e),Fs.updateMatrix(),this.applyMatrix4(Fs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Si).negate(),this.translate(Si.x,Si.y,Si.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new on(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];qt.setFromBufferAttribute(s),this.morphTargetsRelative?(Rt.addVectors(this.boundingBox.min,qt.min),this.boundingBox.expandByPoint(Rt),Rt.addVectors(this.boundingBox.max,qt.max),this.boundingBox.expandByPoint(Rt)):(this.boundingBox.expandByPoint(qt.min),this.boundingBox.expandByPoint(qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new N,1/0);return}if(e){const n=this.boundingSphere.center;if(qt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Zi.setFromBufferAttribute(o),this.morphTargetsRelative?(Rt.addVectors(qt.min,Zi.min),qt.expandByPoint(Rt),Rt.addVectors(qt.max,Zi.max),qt.expandByPoint(Rt)):(qt.expandByPoint(Zi.min),qt.expandByPoint(Zi.max))}qt.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Rt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Rt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Rt.fromBufferAttribute(o,l),c&&(Si.fromBufferAttribute(e,l),Rt.add(Si)),r=Math.max(r,n.distanceToSquared(Rt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,r=t.position.array,s=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new dn(new Float32Array(4*o),4));const c=this.getAttribute("tangent").array,l=[],u=[];for(let T=0;T<o;T++)l[T]=new N,u[T]=new N;const f=new N,d=new N,m=new N,_=new ke,g=new ke,p=new ke,h=new N,E=new N;function x(T,F,U){f.fromArray(r,T*3),d.fromArray(r,F*3),m.fromArray(r,U*3),_.fromArray(a,T*2),g.fromArray(a,F*2),p.fromArray(a,U*2),d.sub(f),m.sub(f),g.sub(_),p.sub(_);const k=1/(g.x*p.y-p.x*g.y);isFinite(k)&&(h.copy(d).multiplyScalar(p.y).addScaledVector(m,-g.y).multiplyScalar(k),E.copy(m).multiplyScalar(g.x).addScaledVector(d,-p.x).multiplyScalar(k),l[T].add(h),l[F].add(h),l[U].add(h),u[T].add(E),u[F].add(E),u[U].add(E))}let b=this.groups;b.length===0&&(b=[{start:0,count:n.length}]);for(let T=0,F=b.length;T<F;++T){const U=b[T],k=U.start,w=U.count;for(let B=k,H=k+w;B<H;B+=3)x(n[B+0],n[B+1],n[B+2])}const I=new N,L=new N,R=new N,Y=new N;function M(T){R.fromArray(s,T*3),Y.copy(R);const F=l[T];I.copy(F),I.sub(R.multiplyScalar(R.dot(F))).normalize(),L.crossVectors(Y,F);const k=L.dot(u[T])<0?-1:1;c[T*4]=I.x,c[T*4+1]=I.y,c[T*4+2]=I.z,c[T*4+3]=k}for(let T=0,F=b.length;T<F;++T){const U=b[T],k=U.start,w=U.count;for(let B=k,H=k+w;B<H;B+=3)M(n[B+0]),M(n[B+1]),M(n[B+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new dn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);const r=new N,s=new N,a=new N,o=new N,c=new N,l=new N,u=new N,f=new N;if(e)for(let d=0,m=e.count;d<m;d+=3){const _=e.getX(d+0),g=e.getX(d+1),p=e.getX(d+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,p),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),l.fromBufferAttribute(n,p),o.add(u),c.add(u),l.add(u),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let d=0,m=t.count;d<m;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Rt.fromBufferAttribute(e,t),Rt.normalize(),e.setXYZ(t,Rt.x,Rt.y,Rt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,f=o.normalized,d=new l.constructor(c.length*u);let m=0,_=0;for(let g=0,p=c.length;g<p;g++){o.isInterleavedBufferAttribute?m=c[g]*o.data.stride+o.offset:m=c[g]*u;for(let h=0;h<u;h++)d[_++]=l[m++]}return new dn(d,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Zt,n=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,n);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let u=0,f=l.length;u<f;u++){const d=l[u],m=e(d,n);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,d=l.length;f<d;f++){const m=l[f];u.push(m.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],f=s[l];for(let d=0,m=f.length;d<m;d++)u.push(f[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ba=new vt,qn=new gr,Cr=new mr,Ta=new N,bi=new N,Ti=new N,wi=new N,Os=new N,Lr=new N,Pr=new ke,Dr=new ke,Ir=new ke,wa=new N,Aa=new N,Ra=new N,Ur=new N,Nr=new N;class Vt extends Et{constructor(e=new Zt,t=new go){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Lr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=o[c],f=s[c];u!==0&&(Os.fromBufferAttribute(f,e),a?Lr.addScaledVector(Os,u):Lr.addScaledVector(Os.sub(t),u))}t.add(Lr)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Cr.copy(n.boundingSphere),Cr.applyMatrix4(s),qn.copy(e.ray).recast(e.near),!(Cr.containsPoint(qn.origin)===!1&&(qn.intersectSphere(Cr,Ta)===null||qn.origin.distanceToSquared(Ta)>(e.far-e.near)**2))&&(ba.copy(s).invert(),qn.copy(e.ray).applyMatrix4(ba),!(n.boundingBox!==null&&qn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,qn)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,d=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,g=d.length;_<g;_++){const p=d[_],h=a[p.materialIndex],E=Math.max(p.start,m.start),x=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let b=E,I=x;b<I;b+=3){const L=o.getX(b),R=o.getX(b+1),Y=o.getX(b+2);r=Fr(this,h,e,n,l,u,f,L,R,Y),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const _=Math.max(0,m.start),g=Math.min(o.count,m.start+m.count);for(let p=_,h=g;p<h;p+=3){const E=o.getX(p),x=o.getX(p+1),b=o.getX(p+2);r=Fr(this,a,e,n,l,u,f,E,x,b),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,g=d.length;_<g;_++){const p=d[_],h=a[p.materialIndex],E=Math.max(p.start,m.start),x=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let b=E,I=x;b<I;b+=3){const L=b,R=b+1,Y=b+2;r=Fr(this,h,e,n,l,u,f,L,R,Y),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const _=Math.max(0,m.start),g=Math.min(c.count,m.start+m.count);for(let p=_,h=g;p<h;p+=3){const E=p,x=p+1,b=p+2;r=Fr(this,a,e,n,l,u,f,E,x,b),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function rh(i,e,t,n,r,s,a,o){let c;if(e.side===Wt?c=n.intersectTriangle(a,s,r,!0,o):c=n.intersectTriangle(r,s,a,e.side===Hn,o),c===null)return null;Nr.copy(o),Nr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Nr);return l<t.near||l>t.far?null:{distance:l,point:Nr.clone(),object:i}}function Fr(i,e,t,n,r,s,a,o,c,l){i.getVertexPosition(o,bi),i.getVertexPosition(c,Ti),i.getVertexPosition(l,wi);const u=rh(i,e,t,n,bi,Ti,wi,Ur);if(u){r&&(Pr.fromBufferAttribute(r,o),Dr.fromBufferAttribute(r,c),Ir.fromBufferAttribute(r,l),u.uv=tn.getInterpolation(Ur,bi,Ti,wi,Pr,Dr,Ir,new ke)),s&&(Pr.fromBufferAttribute(s,o),Dr.fromBufferAttribute(s,c),Ir.fromBufferAttribute(s,l),u.uv1=tn.getInterpolation(Ur,bi,Ti,wi,Pr,Dr,Ir,new ke),u.uv2=u.uv1),a&&(wa.fromBufferAttribute(a,o),Aa.fromBufferAttribute(a,c),Ra.fromBufferAttribute(a,l),u.normal=tn.getInterpolation(Ur,bi,Ti,wi,wa,Aa,Ra,new N),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:c,c:l,normal:new N,materialIndex:0};tn.getNormal(bi,Ti,wi,f.normal),u.face=f}return u}class _r extends Zt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],u=[],f=[];let d=0,m=0;_("z","y","x",-1,-1,n,t,e,a,s,0),_("z","y","x",1,-1,n,t,-e,a,s,1),_("x","z","y",1,1,e,n,t,r,a,2),_("x","z","y",1,-1,e,n,-t,r,a,3),_("x","y","z",1,-1,e,t,n,r,s,4),_("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new on(l,3)),this.setAttribute("normal",new on(u,3)),this.setAttribute("uv",new on(f,2));function _(g,p,h,E,x,b,I,L,R,Y,M){const T=b/R,F=I/Y,U=b/2,k=I/2,w=L/2,B=R+1,H=Y+1;let J=0,Z=0;const q=new N;for(let ee=0;ee<H;ee++){const oe=ee*F-k;for(let me=0;me<B;me++){const z=me*T-U;q[g]=z*E,q[p]=oe*x,q[h]=w,l.push(q.x,q.y,q.z),q[g]=0,q[p]=0,q[h]=L>0?1:-1,u.push(q.x,q.y,q.z),f.push(me/R),f.push(1-ee/Y),J+=1}}for(let ee=0;ee<Y;ee++)for(let oe=0;oe<R;oe++){const me=d+oe+B*ee,z=d+oe+B*(ee+1),te=d+(oe+1)+B*(ee+1),xe=d+(oe+1)+B*ee;c.push(me,z,xe),c.push(z,te,xe),Z+=6}o.addGroup(m,Z,M),m+=Z,d+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Gi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function zt(i){const e={};for(let t=0;t<i.length;t++){const n=Gi(i[t]);for(const r in n)e[r]=n[r]}return e}function sh(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Kc(i){return i.getRenderTarget()===null?i.outputColorSpace:ut.workingColorSpace}const oh={clone:Gi,merge:zt};var ah=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ch=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ai extends Gn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ah,this.fragmentShader=ch,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Gi(e.uniforms),this.uniformsGroups=sh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Zc extends Et{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=bn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class nn extends Zc{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=fr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ar*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return fr*2*Math.atan(Math.tan(ar*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ar*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*n/l,r*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ai=-90,Ri=1;class lh extends Et{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new nn(Ai,Ri,e,t);r.layers=this.layers,this.add(r);const s=new nn(Ai,Ri,e,t);s.layers=this.layers,this.add(s);const a=new nn(Ai,Ri,e,t);a.layers=this.layers,this.add(a);const o=new nn(Ai,Ri,e,t);o.layers=this.layers,this.add(o);const c=new nn(Ai,Ri,e,t);c.layers=this.layers,this.add(c);const l=new nn(Ai,Ri,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===bn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ts)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,c),e.setRenderTarget(n,4,r),e.render(t,l),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(f,d,m),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Jc extends Xt{constructor(e,t,n,r,s,a,o,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:zi,super(e,t,n,r,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class uh extends si{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];t.encoding!==void 0&&(lr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===ii?Ct:sn),this.texture=new Jc(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:en}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new _r(5,5,5),s=new ai({name:"CubemapFromEquirect",uniforms:Gi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Wt,blending:Bn});s.uniforms.tEquirect.value=t;const a=new Vt(r,s),o=t.minFilter;return t.minFilter===hr&&(t.minFilter=en),new lh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}const Bs=new N,hh=new N,dh=new st;class In{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Bs.subVectors(n,t).cross(hh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Bs),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||dh.getNormalMatrix(e),r=this.coplanarPoint(Bs).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Yn=new mr,Or=new N;class _o{constructor(e=new In,t=new In,n=new In,r=new In,s=new In,a=new In){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=bn){const n=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],c=r[3],l=r[4],u=r[5],f=r[6],d=r[7],m=r[8],_=r[9],g=r[10],p=r[11],h=r[12],E=r[13],x=r[14],b=r[15];if(n[0].setComponents(c-s,d-l,p-m,b-h).normalize(),n[1].setComponents(c+s,d+l,p+m,b+h).normalize(),n[2].setComponents(c+a,d+u,p+_,b+E).normalize(),n[3].setComponents(c-a,d-u,p-_,b-E).normalize(),n[4].setComponents(c-o,d-f,p-g,b-x).normalize(),t===bn)n[5].setComponents(c+o,d+f,p+g,b+x).normalize();else if(t===ts)n[5].setComponents(o,f,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Yn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Yn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Yn)}intersectsSprite(e){return Yn.center.set(0,0,0),Yn.radius=.7071067811865476,Yn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Yn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Or.x=r.normal.x>0?e.max.x:e.min.x,Or.y=r.normal.y>0?e.max.y:e.min.y,Or.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Or)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Qc(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function fh(i,e){const t=e.isWebGL2,n=new WeakMap;function r(l,u){const f=l.array,d=l.usage,m=f.byteLength,_=i.createBuffer();i.bindBuffer(u,_),i.bufferData(u,f,d),l.onUploadCallback();let g;if(f instanceof Float32Array)g=i.FLOAT;else if(f instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)g=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=i.UNSIGNED_SHORT;else if(f instanceof Int16Array)g=i.SHORT;else if(f instanceof Uint32Array)g=i.UNSIGNED_INT;else if(f instanceof Int32Array)g=i.INT;else if(f instanceof Int8Array)g=i.BYTE;else if(f instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:_,type:g,bytesPerElement:f.BYTES_PER_ELEMENT,version:l.version,size:m}}function s(l,u,f){const d=u.array,m=u._updateRange,_=u.updateRanges;if(i.bindBuffer(f,l),m.count===-1&&_.length===0&&i.bufferSubData(f,0,d),_.length!==0){for(let g=0,p=_.length;g<p;g++){const h=_[g];t?i.bufferSubData(f,h.start*d.BYTES_PER_ELEMENT,d,h.start,h.count):i.bufferSubData(f,h.start*d.BYTES_PER_ELEMENT,d.subarray(h.start,h.start+h.count))}u.clearUpdateRanges()}m.count!==-1&&(t?i.bufferSubData(f,m.offset*d.BYTES_PER_ELEMENT,d,m.offset,m.count):i.bufferSubData(f,m.offset*d.BYTES_PER_ELEMENT,d.subarray(m.offset,m.offset+m.count)),m.count=-1),u.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);const u=n.get(l);u&&(i.deleteBuffer(u.buffer),n.delete(l))}function c(l,u){if(l.isGLBufferAttribute){const d=n.get(l);(!d||d.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const f=n.get(l);if(f===void 0)n.set(l,r(l,u));else if(f.version<l.version){if(f.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,l,u),f.version=l.version}}return{get:a,remove:o,update:c}}class vo extends Zt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(r),l=o+1,u=c+1,f=e/o,d=t/c,m=[],_=[],g=[],p=[];for(let h=0;h<u;h++){const E=h*d-a;for(let x=0;x<l;x++){const b=x*f-s;_.push(b,-E,0),g.push(0,0,1),p.push(x/o),p.push(1-h/c)}}for(let h=0;h<c;h++)for(let E=0;E<o;E++){const x=E+l*h,b=E+l*(h+1),I=E+1+l*(h+1),L=E+1+l*h;m.push(x,b,L),m.push(b,I,L)}this.setIndex(m),this.setAttribute("position",new on(_,3)),this.setAttribute("normal",new on(g,3)),this.setAttribute("uv",new on(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vo(e.width,e.height,e.widthSegments,e.heightSegments)}}var ph=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,mh=`#ifdef USE_ALPHAHASH
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
#endif`,gh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_h=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vh=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,xh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Mh=`#ifdef USE_AOMAP
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
#endif`,yh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Eh=`#ifdef USE_BATCHING
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
#endif`,Sh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,bh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Th=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ah=`#ifdef USE_IRIDESCENCE
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
#endif`,Rh=`#ifdef USE_BUMPMAP
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
#endif`,Ch=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Lh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ph=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Dh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ih=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Uh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Nh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Fh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Oh=`#define PI 3.141592653589793
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
} // validated`,Bh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,zh=`vec3 transformedNormal = objectNormal;
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
#endif`,kh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Hh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Gh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Vh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Xh=`
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
}`,$h=`#ifdef USE_ENVMAP
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
#endif`,jh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,qh=`#ifdef USE_ENVMAP
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
#endif`,Yh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Kh=`#ifdef USE_ENVMAP
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
#endif`,Zh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Jh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Qh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ed=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,td=`#ifdef USE_GRADIENTMAP
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
}`,nd=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,id=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,rd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,od=`uniform bool receiveShadow;
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
#endif`,ad=`#ifdef USE_ENVMAP
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
#endif`,cd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ld=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ud=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,dd=`PhysicalMaterial material;
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
#endif`,fd=`struct PhysicalMaterial {
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
}`,pd=`
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
#endif`,md=`#if defined( RE_IndirectDiffuse )
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
#endif`,gd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_d=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,vd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Md=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,yd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ed=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Sd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,bd=`#if defined( USE_POINTS_UV )
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
#endif`,Td=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,wd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ad=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Rd=`#ifdef USE_MORPHNORMALS
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
#endif`,Cd=`#ifdef USE_MORPHTARGETS
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
#endif`,Ld=`#ifdef USE_MORPHTARGETS
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
#endif`,Pd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Dd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Id=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ud=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Fd=`#ifdef USE_NORMALMAP
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
#endif`,Od=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Bd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,kd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Hd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Gd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Wd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Vd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Xd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$d=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Yd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Kd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Zd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Jd=`float getShadowMask() {
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
}`,Qd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ef=`#ifdef USE_SKINNING
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
#endif`,tf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,nf=`#ifdef USE_SKINNING
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
#endif`,rf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,of=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,af=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,cf=`#ifdef USE_TRANSMISSION
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
#endif`,lf=`#ifdef USE_TRANSMISSION
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
#endif`,uf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,df=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ff=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const pf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mf=`uniform sampler2D t2D;
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
}`,gf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_f=`#ifdef ENVMAP_TYPE_CUBE
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
}`,vf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mf=`#include <common>
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
}`,yf=`#if DEPTH_PACKING == 3200
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
}`,Ef=`#define DISTANCE
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
}`,Sf=`#define DISTANCE
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
}`,bf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Tf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wf=`uniform float scale;
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
}`,Af=`uniform vec3 diffuse;
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
}`,Rf=`#include <common>
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
}`,Cf=`uniform vec3 diffuse;
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
}`,Lf=`#define LAMBERT
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
}`,Pf=`#define LAMBERT
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
}`,Df=`#define MATCAP
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
}`,If=`#define MATCAP
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
}`,Uf=`#define NORMAL
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
}`,Nf=`#define NORMAL
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
}`,Ff=`#define PHONG
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
}`,Of=`#define PHONG
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
}`,Bf=`#define STANDARD
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
}`,zf=`#define STANDARD
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
}`,kf=`#define TOON
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
}`,Hf=`#define TOON
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
}`,Gf=`uniform float size;
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
}`,Wf=`uniform vec3 diffuse;
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
}`,Vf=`#include <common>
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
}`,Xf=`uniform vec3 color;
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
}`,$f=`uniform float rotation;
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
}`,jf=`uniform vec3 diffuse;
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
}`,et={alphahash_fragment:ph,alphahash_pars_fragment:mh,alphamap_fragment:gh,alphamap_pars_fragment:_h,alphatest_fragment:vh,alphatest_pars_fragment:xh,aomap_fragment:Mh,aomap_pars_fragment:yh,batching_pars_vertex:Eh,batching_vertex:Sh,begin_vertex:bh,beginnormal_vertex:Th,bsdfs:wh,iridescence_fragment:Ah,bumpmap_pars_fragment:Rh,clipping_planes_fragment:Ch,clipping_planes_pars_fragment:Lh,clipping_planes_pars_vertex:Ph,clipping_planes_vertex:Dh,color_fragment:Ih,color_pars_fragment:Uh,color_pars_vertex:Nh,color_vertex:Fh,common:Oh,cube_uv_reflection_fragment:Bh,defaultnormal_vertex:zh,displacementmap_pars_vertex:kh,displacementmap_vertex:Hh,emissivemap_fragment:Gh,emissivemap_pars_fragment:Wh,colorspace_fragment:Vh,colorspace_pars_fragment:Xh,envmap_fragment:$h,envmap_common_pars_fragment:jh,envmap_pars_fragment:qh,envmap_pars_vertex:Yh,envmap_physical_pars_fragment:ad,envmap_vertex:Kh,fog_vertex:Zh,fog_pars_vertex:Jh,fog_fragment:Qh,fog_pars_fragment:ed,gradientmap_pars_fragment:td,lightmap_fragment:nd,lightmap_pars_fragment:id,lights_lambert_fragment:rd,lights_lambert_pars_fragment:sd,lights_pars_begin:od,lights_toon_fragment:cd,lights_toon_pars_fragment:ld,lights_phong_fragment:ud,lights_phong_pars_fragment:hd,lights_physical_fragment:dd,lights_physical_pars_fragment:fd,lights_fragment_begin:pd,lights_fragment_maps:md,lights_fragment_end:gd,logdepthbuf_fragment:_d,logdepthbuf_pars_fragment:vd,logdepthbuf_pars_vertex:xd,logdepthbuf_vertex:Md,map_fragment:yd,map_pars_fragment:Ed,map_particle_fragment:Sd,map_particle_pars_fragment:bd,metalnessmap_fragment:Td,metalnessmap_pars_fragment:wd,morphcolor_vertex:Ad,morphnormal_vertex:Rd,morphtarget_pars_vertex:Cd,morphtarget_vertex:Ld,normal_fragment_begin:Pd,normal_fragment_maps:Dd,normal_pars_fragment:Id,normal_pars_vertex:Ud,normal_vertex:Nd,normalmap_pars_fragment:Fd,clearcoat_normal_fragment_begin:Od,clearcoat_normal_fragment_maps:Bd,clearcoat_pars_fragment:zd,iridescence_pars_fragment:kd,opaque_fragment:Hd,packing:Gd,premultiplied_alpha_fragment:Wd,project_vertex:Vd,dithering_fragment:Xd,dithering_pars_fragment:$d,roughnessmap_fragment:jd,roughnessmap_pars_fragment:qd,shadowmap_pars_fragment:Yd,shadowmap_pars_vertex:Kd,shadowmap_vertex:Zd,shadowmask_pars_fragment:Jd,skinbase_vertex:Qd,skinning_pars_vertex:ef,skinning_vertex:tf,skinnormal_vertex:nf,specularmap_fragment:rf,specularmap_pars_fragment:sf,tonemapping_fragment:of,tonemapping_pars_fragment:af,transmission_fragment:cf,transmission_pars_fragment:lf,uv_pars_fragment:uf,uv_pars_vertex:hf,uv_vertex:df,worldpos_vertex:ff,background_vert:pf,background_frag:mf,backgroundCube_vert:gf,backgroundCube_frag:_f,cube_vert:vf,cube_frag:xf,depth_vert:Mf,depth_frag:yf,distanceRGBA_vert:Ef,distanceRGBA_frag:Sf,equirect_vert:bf,equirect_frag:Tf,linedashed_vert:wf,linedashed_frag:Af,meshbasic_vert:Rf,meshbasic_frag:Cf,meshlambert_vert:Lf,meshlambert_frag:Pf,meshmatcap_vert:Df,meshmatcap_frag:If,meshnormal_vert:Uf,meshnormal_frag:Nf,meshphong_vert:Ff,meshphong_frag:Of,meshphysical_vert:Bf,meshphysical_frag:zf,meshtoon_vert:kf,meshtoon_frag:Hf,points_vert:Gf,points_frag:Wf,shadow_vert:Vf,shadow_frag:Xf,sprite_vert:$f,sprite_frag:jf},ve={common:{diffuse:{value:new it(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new st}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new st}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new st}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new st},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new st},normalScale:{value:new ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new st},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new st}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new st}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new st}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new it(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new it(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0},uvTransform:{value:new st}},sprite:{diffuse:{value:new it(16777215)},opacity:{value:1},center:{value:new ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}}},pn={basic:{uniforms:zt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:zt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new it(0)}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:zt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new it(0)},specular:{value:new it(1118481)},shininess:{value:30}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:zt([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new it(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:zt([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new it(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:zt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:zt([ve.points,ve.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:zt([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:zt([ve.common,ve.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:zt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:zt([ve.sprite,ve.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new st},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distanceRGBA:{uniforms:zt([ve.common,ve.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distanceRGBA_vert,fragmentShader:et.distanceRGBA_frag},shadow:{uniforms:zt([ve.lights,ve.fog,{color:{value:new it(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};pn.physical={uniforms:zt([pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new st},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new st},clearcoatNormalScale:{value:new ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new st},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new st},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new st},sheen:{value:0},sheenColor:{value:new it(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new st},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new st},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new st},transmissionSamplerSize:{value:new ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new st},attenuationDistance:{value:0},attenuationColor:{value:new it(0)},specularColor:{value:new it(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new st},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new st},anisotropyVector:{value:new ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new st}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};const Br={r:0,b:0,g:0};function qf(i,e,t,n,r,s,a){const o=new it(0);let c=s===!0?0:1,l,u,f=null,d=0,m=null;function _(p,h){let E=!1,x=h.isScene===!0?h.background:null;x&&x.isTexture&&(x=(h.backgroundBlurriness>0?t:e).get(x)),x===null?g(o,c):x&&x.isColor&&(g(x,1),E=!0);const b=i.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||E)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),x&&(x.isCubeTexture||x.mapping===os)?(u===void 0&&(u=new Vt(new _r(1,1,1),new ai({name:"BackgroundCubeMaterial",uniforms:Gi(pn.backgroundCube.uniforms),vertexShader:pn.backgroundCube.vertexShader,fragmentShader:pn.backgroundCube.fragmentShader,side:Wt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(I,L,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=h.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=h.backgroundIntensity,u.material.toneMapped=ut.getTransfer(x.colorSpace)!==ft,(f!==x||d!==x.version||m!==i.toneMapping)&&(u.material.needsUpdate=!0,f=x,d=x.version,m=i.toneMapping),u.layers.enableAll(),p.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Vt(new vo(2,2),new ai({name:"BackgroundMaterial",uniforms:Gi(pn.background.uniforms),vertexShader:pn.background.vertexShader,fragmentShader:pn.background.fragmentShader,side:Hn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=h.backgroundIntensity,l.material.toneMapped=ut.getTransfer(x.colorSpace)!==ft,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(f!==x||d!==x.version||m!==i.toneMapping)&&(l.material.needsUpdate=!0,f=x,d=x.version,m=i.toneMapping),l.layers.enableAll(),p.unshift(l,l.geometry,l.material,0,0,null))}function g(p,h){p.getRGB(Br,Kc(i)),n.buffers.color.setClear(Br.r,Br.g,Br.b,h,a)}return{getClearColor:function(){return o},setClearColor:function(p,h=1){o.set(p),c=h,g(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(p){c=p,g(o,c)},render:_}}function Yf(i,e,t,n){const r=i.getParameter(i.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||s!==null,o={},c=p(null);let l=c,u=!1;function f(w,B,H,J,Z){let q=!1;if(a){const ee=g(J,H,B);l!==ee&&(l=ee,m(l.object)),q=h(w,J,H,Z),q&&E(w,J,H,Z)}else{const ee=B.wireframe===!0;(l.geometry!==J.id||l.program!==H.id||l.wireframe!==ee)&&(l.geometry=J.id,l.program=H.id,l.wireframe=ee,q=!0)}Z!==null&&t.update(Z,i.ELEMENT_ARRAY_BUFFER),(q||u)&&(u=!1,Y(w,B,H,J),Z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function d(){return n.isWebGL2?i.createVertexArray():s.createVertexArrayOES()}function m(w){return n.isWebGL2?i.bindVertexArray(w):s.bindVertexArrayOES(w)}function _(w){return n.isWebGL2?i.deleteVertexArray(w):s.deleteVertexArrayOES(w)}function g(w,B,H){const J=H.wireframe===!0;let Z=o[w.id];Z===void 0&&(Z={},o[w.id]=Z);let q=Z[B.id];q===void 0&&(q={},Z[B.id]=q);let ee=q[J];return ee===void 0&&(ee=p(d()),q[J]=ee),ee}function p(w){const B=[],H=[],J=[];for(let Z=0;Z<r;Z++)B[Z]=0,H[Z]=0,J[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:H,attributeDivisors:J,object:w,attributes:{},index:null}}function h(w,B,H,J){const Z=l.attributes,q=B.attributes;let ee=0;const oe=H.getAttributes();for(const me in oe)if(oe[me].location>=0){const te=Z[me];let xe=q[me];if(xe===void 0&&(me==="instanceMatrix"&&w.instanceMatrix&&(xe=w.instanceMatrix),me==="instanceColor"&&w.instanceColor&&(xe=w.instanceColor)),te===void 0||te.attribute!==xe||xe&&te.data!==xe.data)return!0;ee++}return l.attributesNum!==ee||l.index!==J}function E(w,B,H,J){const Z={},q=B.attributes;let ee=0;const oe=H.getAttributes();for(const me in oe)if(oe[me].location>=0){let te=q[me];te===void 0&&(me==="instanceMatrix"&&w.instanceMatrix&&(te=w.instanceMatrix),me==="instanceColor"&&w.instanceColor&&(te=w.instanceColor));const xe={};xe.attribute=te,te&&te.data&&(xe.data=te.data),Z[me]=xe,ee++}l.attributes=Z,l.attributesNum=ee,l.index=J}function x(){const w=l.newAttributes;for(let B=0,H=w.length;B<H;B++)w[B]=0}function b(w){I(w,0)}function I(w,B){const H=l.newAttributes,J=l.enabledAttributes,Z=l.attributeDivisors;H[w]=1,J[w]===0&&(i.enableVertexAttribArray(w),J[w]=1),Z[w]!==B&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](w,B),Z[w]=B)}function L(){const w=l.newAttributes,B=l.enabledAttributes;for(let H=0,J=B.length;H<J;H++)B[H]!==w[H]&&(i.disableVertexAttribArray(H),B[H]=0)}function R(w,B,H,J,Z,q,ee){ee===!0?i.vertexAttribIPointer(w,B,H,Z,q):i.vertexAttribPointer(w,B,H,J,Z,q)}function Y(w,B,H,J){if(n.isWebGL2===!1&&(w.isInstancedMesh||J.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const Z=J.attributes,q=H.getAttributes(),ee=B.defaultAttributeValues;for(const oe in q){const me=q[oe];if(me.location>=0){let z=Z[oe];if(z===void 0&&(oe==="instanceMatrix"&&w.instanceMatrix&&(z=w.instanceMatrix),oe==="instanceColor"&&w.instanceColor&&(z=w.instanceColor)),z!==void 0){const te=z.normalized,xe=z.itemSize,Se=t.get(z);if(Se===void 0)continue;const Le=Se.buffer,$e=Se.type,je=Se.bytesPerElement,Be=n.isWebGL2===!0&&($e===i.INT||$e===i.UNSIGNED_INT||z.gpuType===Ic);if(z.isInterleavedBufferAttribute){const tt=z.data,G=tt.stride,gt=z.offset;if(tt.isInstancedInterleavedBuffer){for(let Ie=0;Ie<me.locationSize;Ie++)I(me.location+Ie,tt.meshPerAttribute);w.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let Ie=0;Ie<me.locationSize;Ie++)b(me.location+Ie);i.bindBuffer(i.ARRAY_BUFFER,Le);for(let Ie=0;Ie<me.locationSize;Ie++)R(me.location+Ie,xe/me.locationSize,$e,te,G*je,(gt+xe/me.locationSize*Ie)*je,Be)}else{if(z.isInstancedBufferAttribute){for(let tt=0;tt<me.locationSize;tt++)I(me.location+tt,z.meshPerAttribute);w.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let tt=0;tt<me.locationSize;tt++)b(me.location+tt);i.bindBuffer(i.ARRAY_BUFFER,Le);for(let tt=0;tt<me.locationSize;tt++)R(me.location+tt,xe/me.locationSize,$e,te,xe*je,xe/me.locationSize*tt*je,Be)}}else if(ee!==void 0){const te=ee[oe];if(te!==void 0)switch(te.length){case 2:i.vertexAttrib2fv(me.location,te);break;case 3:i.vertexAttrib3fv(me.location,te);break;case 4:i.vertexAttrib4fv(me.location,te);break;default:i.vertexAttrib1fv(me.location,te)}}}}L()}function M(){U();for(const w in o){const B=o[w];for(const H in B){const J=B[H];for(const Z in J)_(J[Z].object),delete J[Z];delete B[H]}delete o[w]}}function T(w){if(o[w.id]===void 0)return;const B=o[w.id];for(const H in B){const J=B[H];for(const Z in J)_(J[Z].object),delete J[Z];delete B[H]}delete o[w.id]}function F(w){for(const B in o){const H=o[B];if(H[w.id]===void 0)continue;const J=H[w.id];for(const Z in J)_(J[Z].object),delete J[Z];delete H[w.id]}}function U(){k(),u=!0,l!==c&&(l=c,m(l.object))}function k(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:f,reset:U,resetDefaultState:k,dispose:M,releaseStatesOfGeometry:T,releaseStatesOfProgram:F,initAttributes:x,enableAttribute:b,disableUnusedAttributes:L}}function Kf(i,e,t,n){const r=n.isWebGL2;let s;function a(u){s=u}function o(u,f){i.drawArrays(s,u,f),t.update(f,s,1)}function c(u,f,d){if(d===0)return;let m,_;if(r)m=i,_="drawArraysInstanced";else if(m=e.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[_](s,u,f,d),t.update(f,s,d)}function l(u,f,d){if(d===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<d;_++)this.render(u[_],f[_]);else{m.multiDrawArraysWEBGL(s,u,0,f,0,d);let _=0;for(let g=0;g<d;g++)_+=f[g];t.update(_,s,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function Zf(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const c=s(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);const l=a||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_TEXTURE_SIZE),_=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),p=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),h=i.getParameter(i.MAX_VARYING_VECTORS),E=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),x=d>0,b=a||e.has("OES_texture_float"),I=x&&b,L=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:u,maxTextures:f,maxVertexTextures:d,maxTextureSize:m,maxCubemapSize:_,maxAttributes:g,maxVertexUniforms:p,maxVaryings:h,maxFragmentUniforms:E,vertexTextures:x,floatFragmentTextures:b,floatVertexTextures:I,maxSamples:L}}function Jf(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new In,o=new st,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const m=f.length!==0||d||n!==0||r;return r=d,n=f.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,m){const _=f.clippingPlanes,g=f.clipIntersection,p=f.clipShadows,h=i.get(f);if(!r||_===null||_.length===0||s&&!p)s?u(null):l();else{const E=s?0:n,x=E*4;let b=h.clippingState||null;c.value=b,b=u(_,d,x,m);for(let I=0;I!==x;++I)b[I]=t[I];h.clippingState=b,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,d,m,_){const g=f!==null?f.length:0;let p=null;if(g!==0){if(p=c.value,_!==!0||p===null){const h=m+g*4,E=d.matrixWorldInverse;o.getNormalMatrix(E),(p===null||p.length<h)&&(p=new Float32Array(h));for(let x=0,b=m;x!==g;++x,b+=4)a.copy(f[x]).applyMatrix4(E,o),a.normal.toArray(p,b),p[b+3]=a.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,p}}function Qf(i){let e=new WeakMap;function t(a,o){return o===Zs?a.mapping=zi:o===Js&&(a.mapping=ki),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Zs||o===Js)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new uh(c.height/2);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",r),t(l.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class el extends Zc{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ui=4,Ca=[.125,.215,.35,.446,.526,.582],ei=20,zs=new el,La=new it;let ks=null,Hs=0,Gs=0;const Zn=(1+Math.sqrt(5))/2,Ci=1/Zn,Pa=[new N(1,1,1),new N(-1,1,1),new N(1,1,-1),new N(-1,1,-1),new N(0,Zn,Ci),new N(0,Zn,-Ci),new N(Ci,0,Zn),new N(-Ci,0,Zn),new N(Zn,Ci,0),new N(-Zn,Ci,0)];class Da{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){ks=this._renderer.getRenderTarget(),Hs=this._renderer.getActiveCubeFace(),Gs=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Na(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ua(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ks,Hs,Gs),e.scissorTest=!1,zr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===zi||e.mapping===ki?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ks=this._renderer.getRenderTarget(),Hs=this._renderer.getActiveCubeFace(),Gs=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:en,minFilter:en,generateMipmaps:!1,type:dr,format:hn,colorSpace:An,depthBuffer:!1},r=Ia(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ia(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ep(s)),this._blurMaterial=tp(s,e,t)}return r}_compileMaterial(e){const t=new Vt(this._lodPlanes[0],e);this._renderer.compile(t,zs)}_sceneToCubeUV(e,t,n,r){const o=new nn(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(La),u.toneMapping=zn,u.autoClear=!1;const m=new go({name:"PMREM.Background",side:Wt,depthWrite:!1,depthTest:!1}),_=new Vt(new _r,m);let g=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,g=!0):(m.color.copy(La),g=!0);for(let h=0;h<6;h++){const E=h%3;E===0?(o.up.set(0,c[h],0),o.lookAt(l[h],0,0)):E===1?(o.up.set(0,0,c[h]),o.lookAt(0,l[h],0)):(o.up.set(0,c[h],0),o.lookAt(0,0,l[h]));const x=this._cubeSize;zr(r,E*x,h>2?x:0,x,x),u.setRenderTarget(r),g&&u.render(_,o),u.render(e,o)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=d,u.autoClear=f,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===zi||e.mapping===ki;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Na()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ua());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Vt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;zr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,zs)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Pa[(r-1)%Pa.length];this._blur(e,r-1,r,s,a)}t.autoClear=n}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new Vt(this._lodPlanes[r],l),d=l.uniforms,m=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*ei-1),g=s/_,p=isFinite(s)?1+Math.floor(u*g):ei;p>ei&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ei}`);const h=[];let E=0;for(let R=0;R<ei;++R){const Y=R/g,M=Math.exp(-Y*Y/2);h.push(M),R===0?E+=M:R<p&&(E+=2*M)}for(let R=0;R<h.length;R++)h[R]=h[R]/E;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=h,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:x}=this;d.dTheta.value=_,d.mipInt.value=x-n;const b=this._sizeLods[r],I=3*b*(r>x-Ui?r-x+Ui:0),L=4*(this._cubeSize-b);zr(t,I,L,3*b,2*b),c.setRenderTarget(t),c.render(f,zs)}}function ep(i){const e=[],t=[],n=[];let r=i;const s=i-Ui+1+Ca.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let c=1/o;a>i-Ui?c=Ca[a-i+Ui-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,f=1+l,d=[u,u,f,u,f,f,u,u,f,f,u,f],m=6,_=6,g=3,p=2,h=1,E=new Float32Array(g*_*m),x=new Float32Array(p*_*m),b=new Float32Array(h*_*m);for(let L=0;L<m;L++){const R=L%3*2/3-1,Y=L>2?0:-1,M=[R,Y,0,R+2/3,Y,0,R+2/3,Y+1,0,R,Y,0,R+2/3,Y+1,0,R,Y+1,0];E.set(M,g*_*L),x.set(d,p*_*L);const T=[L,L,L,L,L,L];b.set(T,h*_*L)}const I=new Zt;I.setAttribute("position",new dn(E,g)),I.setAttribute("uv",new dn(x,p)),I.setAttribute("faceIndex",new dn(b,h)),e.push(I),r>Ui&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ia(i,e,t){const n=new si(i,e,t);return n.texture.mapping=os,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function zr(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function tp(i,e,t){const n=new Float32Array(ei),r=new N(0,1,0);return new ai({name:"SphericalGaussianBlur",defines:{n:ei,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:xo(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Ua(){return new ai({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xo(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Na(){return new ai({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function xo(){return`

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
	`}function np(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===Zs||c===Js,u=c===zi||c===ki;if(l||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let f=e.get(o);return t===null&&(t=new Da(i)),f=l?t.fromEquirectangular(o,f):t.fromCubemap(o,f),e.set(o,f),f.texture}else{if(e.has(o))return e.get(o).texture;{const f=o.image;if(l&&f&&f.height>0||u&&f&&r(f)){t===null&&(t=new Da(i));const d=l?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",s),d.texture}else return null}}}return o}function r(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function s(o){const c=o.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function ip(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function rp(i,e,t,n){const r={},s=new WeakMap;function a(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);for(const _ in d.morphAttributes){const g=d.morphAttributes[_];for(let p=0,h=g.length;p<h;p++)e.remove(g[p])}d.removeEventListener("dispose",a),delete r[d.id];const m=s.get(d);m&&(e.remove(m),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function c(f){const d=f.attributes;for(const _ in d)e.update(d[_],i.ARRAY_BUFFER);const m=f.morphAttributes;for(const _ in m){const g=m[_];for(let p=0,h=g.length;p<h;p++)e.update(g[p],i.ARRAY_BUFFER)}}function l(f){const d=[],m=f.index,_=f.attributes.position;let g=0;if(m!==null){const E=m.array;g=m.version;for(let x=0,b=E.length;x<b;x+=3){const I=E[x+0],L=E[x+1],R=E[x+2];d.push(I,L,L,R,R,I)}}else if(_!==void 0){const E=_.array;g=_.version;for(let x=0,b=E.length/3-1;x<b;x+=3){const I=x+0,L=x+1,R=x+2;d.push(I,L,L,R,R,I)}}else return;const p=new(Wc(d)?Yc:qc)(d,1);p.version=g;const h=s.get(f);h&&e.remove(h),s.set(f,p)}function u(f){const d=s.get(f);if(d){const m=f.index;m!==null&&d.version<m.version&&l(f)}else l(f);return s.get(f)}return{get:o,update:c,getWireframeAttribute:u}}function sp(i,e,t,n){const r=n.isWebGL2;let s;function a(m){s=m}let o,c;function l(m){o=m.type,c=m.bytesPerElement}function u(m,_){i.drawElements(s,_,o,m*c),t.update(_,s,1)}function f(m,_,g){if(g===0)return;let p,h;if(r)p=i,h="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),h="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[h](s,_,o,m*c,g),t.update(_,s,g)}function d(m,_,g){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let h=0;h<g;h++)this.render(m[h]/c,_[h]);else{p.multiDrawElementsWEBGL(s,_,0,o,m,0,g);let h=0;for(let E=0;E<g;E++)h+=_[E];t.update(h,s,1)}}this.setMode=a,this.setIndex=l,this.render=u,this.renderInstances=f,this.renderMultiDraw=d}function op(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function ap(i,e){return i[0]-e[0]}function cp(i,e){return Math.abs(e[1])-Math.abs(i[1])}function lp(i,e,t){const n={},r=new Float32Array(8),s=new WeakMap,a=new Pt,o=[];for(let l=0;l<8;l++)o[l]=[l,0];function c(l,u,f){const d=l.morphTargetInfluences;if(e.isWebGL2===!0){const _=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=_!==void 0?_.length:0;let p=s.get(u);if(p===void 0||p.count!==g){let B=function(){k.dispose(),s.delete(u),u.removeEventListener("dispose",B)};var m=B;p!==void 0&&p.texture.dispose();const x=u.morphAttributes.position!==void 0,b=u.morphAttributes.normal!==void 0,I=u.morphAttributes.color!==void 0,L=u.morphAttributes.position||[],R=u.morphAttributes.normal||[],Y=u.morphAttributes.color||[];let M=0;x===!0&&(M=1),b===!0&&(M=2),I===!0&&(M=3);let T=u.attributes.position.count*M,F=1;T>e.maxTextureSize&&(F=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const U=new Float32Array(T*F*4*g),k=new $c(U,T,F,g);k.type=Fn,k.needsUpdate=!0;const w=M*4;for(let H=0;H<g;H++){const J=L[H],Z=R[H],q=Y[H],ee=T*F*4*H;for(let oe=0;oe<J.count;oe++){const me=oe*w;x===!0&&(a.fromBufferAttribute(J,oe),U[ee+me+0]=a.x,U[ee+me+1]=a.y,U[ee+me+2]=a.z,U[ee+me+3]=0),b===!0&&(a.fromBufferAttribute(Z,oe),U[ee+me+4]=a.x,U[ee+me+5]=a.y,U[ee+me+6]=a.z,U[ee+me+7]=0),I===!0&&(a.fromBufferAttribute(q,oe),U[ee+me+8]=a.x,U[ee+me+9]=a.y,U[ee+me+10]=a.z,U[ee+me+11]=q.itemSize===4?a.w:1)}}p={count:g,texture:k,size:new ke(T,F)},s.set(u,p),u.addEventListener("dispose",B)}let h=0;for(let x=0;x<d.length;x++)h+=d[x];const E=u.morphTargetsRelative?1:1-h;f.getUniforms().setValue(i,"morphTargetBaseInfluence",E),f.getUniforms().setValue(i,"morphTargetInfluences",d),f.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),f.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}else{const _=d===void 0?0:d.length;let g=n[u.id];if(g===void 0||g.length!==_){g=[];for(let b=0;b<_;b++)g[b]=[b,0];n[u.id]=g}for(let b=0;b<_;b++){const I=g[b];I[0]=b,I[1]=d[b]}g.sort(cp);for(let b=0;b<8;b++)b<_&&g[b][1]?(o[b][0]=g[b][0],o[b][1]=g[b][1]):(o[b][0]=Number.MAX_SAFE_INTEGER,o[b][1]=0);o.sort(ap);const p=u.morphAttributes.position,h=u.morphAttributes.normal;let E=0;for(let b=0;b<8;b++){const I=o[b],L=I[0],R=I[1];L!==Number.MAX_SAFE_INTEGER&&R?(p&&u.getAttribute("morphTarget"+b)!==p[L]&&u.setAttribute("morphTarget"+b,p[L]),h&&u.getAttribute("morphNormal"+b)!==h[L]&&u.setAttribute("morphNormal"+b,h[L]),r[b]=R,E+=R):(p&&u.hasAttribute("morphTarget"+b)===!0&&u.deleteAttribute("morphTarget"+b),h&&u.hasAttribute("morphNormal"+b)===!0&&u.deleteAttribute("morphNormal"+b),r[b]=0)}const x=u.morphTargetsRelative?1:1-E;f.getUniforms().setValue(i,"morphTargetBaseInfluence",x),f.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:c}}function up(i,e,t,n){let r=new WeakMap;function s(c){const l=n.render.frame,u=c.geometry,f=e.get(c,u);if(r.get(f)!==l&&(e.update(f),r.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==l&&(d.update(),r.set(d,l))}return f}function a(){r=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:a}}class tl extends Xt{constructor(e,t,n,r,s,a,o,c,l,u){if(u=u!==void 0?u:ni,u!==ni&&u!==Hi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===ni&&(n=Nn),n===void 0&&u===Hi&&(n=ti),super(null,r,s,a,o,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:kt,this.minFilter=c!==void 0?c:kt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const nl=new Xt,il=new tl(1,1);il.compareFunction=Gc;const rl=new $c,sl=new ju,ol=new Jc,Fa=[],Oa=[],Ba=new Float32Array(16),za=new Float32Array(9),ka=new Float32Array(4);function Xi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Fa[r];if(s===void 0&&(s=new Float32Array(r),Fa[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function bt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Tt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ls(i,e){let t=Oa[e];t===void 0&&(t=new Int32Array(e),Oa[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function hp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function dp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2fv(this.addr,e),Tt(t,e)}}function fp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(bt(t,e))return;i.uniform3fv(this.addr,e),Tt(t,e)}}function pp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4fv(this.addr,e),Tt(t,e)}}function mp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(bt(t,n))return;ka.set(n),i.uniformMatrix2fv(this.addr,!1,ka),Tt(t,n)}}function gp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(bt(t,n))return;za.set(n),i.uniformMatrix3fv(this.addr,!1,za),Tt(t,n)}}function _p(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(bt(t,n))return;Ba.set(n),i.uniformMatrix4fv(this.addr,!1,Ba),Tt(t,n)}}function vp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function xp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2iv(this.addr,e),Tt(t,e)}}function Mp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;i.uniform3iv(this.addr,e),Tt(t,e)}}function yp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4iv(this.addr,e),Tt(t,e)}}function Ep(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Sp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2uiv(this.addr,e),Tt(t,e)}}function bp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;i.uniform3uiv(this.addr,e),Tt(t,e)}}function Tp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4uiv(this.addr,e),Tt(t,e)}}function wp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);const s=this.type===i.SAMPLER_2D_SHADOW?il:nl;t.setTexture2D(e||s,r)}function Ap(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||sl,r)}function Rp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||ol,r)}function Cp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||rl,r)}function Lp(i){switch(i){case 5126:return hp;case 35664:return dp;case 35665:return fp;case 35666:return pp;case 35674:return mp;case 35675:return gp;case 35676:return _p;case 5124:case 35670:return vp;case 35667:case 35671:return xp;case 35668:case 35672:return Mp;case 35669:case 35673:return yp;case 5125:return Ep;case 36294:return Sp;case 36295:return bp;case 36296:return Tp;case 35678:case 36198:case 36298:case 36306:case 35682:return wp;case 35679:case 36299:case 36307:return Ap;case 35680:case 36300:case 36308:case 36293:return Rp;case 36289:case 36303:case 36311:case 36292:return Cp}}function Pp(i,e){i.uniform1fv(this.addr,e)}function Dp(i,e){const t=Xi(e,this.size,2);i.uniform2fv(this.addr,t)}function Ip(i,e){const t=Xi(e,this.size,3);i.uniform3fv(this.addr,t)}function Up(i,e){const t=Xi(e,this.size,4);i.uniform4fv(this.addr,t)}function Np(i,e){const t=Xi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Fp(i,e){const t=Xi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Op(i,e){const t=Xi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Bp(i,e){i.uniform1iv(this.addr,e)}function zp(i,e){i.uniform2iv(this.addr,e)}function kp(i,e){i.uniform3iv(this.addr,e)}function Hp(i,e){i.uniform4iv(this.addr,e)}function Gp(i,e){i.uniform1uiv(this.addr,e)}function Wp(i,e){i.uniform2uiv(this.addr,e)}function Vp(i,e){i.uniform3uiv(this.addr,e)}function Xp(i,e){i.uniform4uiv(this.addr,e)}function $p(i,e,t){const n=this.cache,r=e.length,s=ls(t,r);bt(n,s)||(i.uniform1iv(this.addr,s),Tt(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||nl,s[a])}function jp(i,e,t){const n=this.cache,r=e.length,s=ls(t,r);bt(n,s)||(i.uniform1iv(this.addr,s),Tt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||sl,s[a])}function qp(i,e,t){const n=this.cache,r=e.length,s=ls(t,r);bt(n,s)||(i.uniform1iv(this.addr,s),Tt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||ol,s[a])}function Yp(i,e,t){const n=this.cache,r=e.length,s=ls(t,r);bt(n,s)||(i.uniform1iv(this.addr,s),Tt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||rl,s[a])}function Kp(i){switch(i){case 5126:return Pp;case 35664:return Dp;case 35665:return Ip;case 35666:return Up;case 35674:return Np;case 35675:return Fp;case 35676:return Op;case 5124:case 35670:return Bp;case 35667:case 35671:return zp;case 35668:case 35672:return kp;case 35669:case 35673:return Hp;case 5125:return Gp;case 36294:return Wp;case 36295:return Vp;case 36296:return Xp;case 35678:case 36198:case 36298:case 36306:case 35682:return $p;case 35679:case 36299:case 36307:return jp;case 35680:case 36300:case 36308:case 36293:return qp;case 36289:case 36303:case 36311:case 36292:return Yp}}class Zp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Lp(t.type)}}class Jp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Kp(t.type)}}class Qp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const Ws=/(\w+)(\])?(\[|\.)?/g;function Ha(i,e){i.seq.push(e),i.map[e.id]=e}function em(i,e,t){const n=i.name,r=n.length;for(Ws.lastIndex=0;;){const s=Ws.exec(n),a=Ws.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){Ha(t,l===void 0?new Zp(o,i,e):new Jp(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new Qp(o),Ha(t,f)),t=f}}}class Yr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);em(s,a,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function Ga(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const tm=37297;let nm=0;function im(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function rm(i){const e=ut.getPrimaries(ut.workingColorSpace),t=ut.getPrimaries(i);let n;switch(e===t?n="":e===es&&t===Qr?n="LinearDisplayP3ToLinearSRGB":e===Qr&&t===es&&(n="LinearSRGBToLinearDisplayP3"),i){case An:case as:return[n,"LinearTransferOETF"];case Ct:case fo:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Wa(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+im(i.getShaderSource(e),a)}else return r}function sm(i,e){const t=rm(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function om(i,e){let t;switch(e){case ru:t="Linear";break;case su:t="Reinhard";break;case ou:t="OptimizedCineon";break;case Pc:t="ACESFilmic";break;case cu:t="AgX";break;case au:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function am(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ni).join(`
`)}function cm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ni).join(`
`)}function lm(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function um(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Ni(i){return i!==""}function Va(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Xa(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const hm=/^[ \t]*#include +<([\w\d./]+)>/gm;function ro(i){return i.replace(hm,fm)}const dm=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function fm(i,e){let t=et[e];if(t===void 0){const n=dm.get(e);if(n!==void 0)t=et[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ro(t)}const pm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $a(i){return i.replace(pm,mm)}function mm(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function ja(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function gm(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Cc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Dl?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===En&&(e="SHADOWMAP_TYPE_VSM"),e}function _m(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case zi:case ki:e="ENVMAP_TYPE_CUBE";break;case os:e="ENVMAP_TYPE_CUBE_UV";break}return e}function vm(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ki:e="ENVMAP_MODE_REFRACTION";break}return e}function xm(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Lc:e="ENVMAP_BLENDING_MULTIPLY";break;case nu:e="ENVMAP_BLENDING_MIX";break;case iu:e="ENVMAP_BLENDING_ADD";break}return e}function Mm(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function ym(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=gm(t),l=_m(t),u=vm(t),f=xm(t),d=Mm(t),m=t.isWebGL2?"":am(t),_=cm(t),g=lm(s),p=r.createProgram();let h,E,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ni).join(`
`),h.length>0&&(h+=`
`),E=[m,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ni).join(`
`),E.length>0&&(E+=`
`)):(h=[ja(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ni).join(`
`),E=[m,ja(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==zn?"#define TONE_MAPPING":"",t.toneMapping!==zn?et.tonemapping_pars_fragment:"",t.toneMapping!==zn?om("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,sm("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ni).join(`
`)),a=ro(a),a=Va(a,t),a=Xa(a,t),o=ro(o),o=Va(o,t),o=Xa(o,t),a=$a(a),o=$a(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,h=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+h,E=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===ha?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ha?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+E);const b=x+h+a,I=x+E+o,L=Ga(r,r.VERTEX_SHADER,b),R=Ga(r,r.FRAGMENT_SHADER,I);r.attachShader(p,L),r.attachShader(p,R),t.index0AttributeName!==void 0?r.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(p,0,"position"),r.linkProgram(p);function Y(U){if(i.debug.checkShaderErrors){const k=r.getProgramInfoLog(p).trim(),w=r.getShaderInfoLog(L).trim(),B=r.getShaderInfoLog(R).trim();let H=!0,J=!0;if(r.getProgramParameter(p,r.LINK_STATUS)===!1)if(H=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,p,L,R);else{const Z=Wa(r,L,"vertex"),q=Wa(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(p,r.VALIDATE_STATUS)+`

Program Info Log: `+k+`
`+Z+`
`+q)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(w===""||B==="")&&(J=!1);J&&(U.diagnostics={runnable:H,programLog:k,vertexShader:{log:w,prefix:h},fragmentShader:{log:B,prefix:E}})}r.deleteShader(L),r.deleteShader(R),M=new Yr(r,p),T=um(r,p)}let M;this.getUniforms=function(){return M===void 0&&Y(this),M};let T;this.getAttributes=function(){return T===void 0&&Y(this),T};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=r.getProgramParameter(p,tm)),F},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=nm++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=L,this.fragmentShader=R,this}let Em=0;class Sm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new bm(e),t.set(e,n)),n}}class bm{constructor(e){this.id=Em++,this.code=e,this.usedTimes=0}}function Tm(i,e,t,n,r,s,a){const o=new mo,c=new Sm,l=[],u=r.isWebGL2,f=r.logarithmicDepthBuffer,d=r.vertexTextures;let m=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(M){return M===0?"uv":`uv${M}`}function p(M,T,F,U,k){const w=U.fog,B=k.geometry,H=M.isMeshStandardMaterial?U.environment:null,J=(M.isMeshStandardMaterial?t:e).get(M.envMap||H),Z=J&&J.mapping===os?J.image.height:null,q=_[M.type];M.precision!==null&&(m=r.getMaxPrecision(M.precision),m!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",m,"instead."));const ee=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,oe=ee!==void 0?ee.length:0;let me=0;B.morphAttributes.position!==void 0&&(me=1),B.morphAttributes.normal!==void 0&&(me=2),B.morphAttributes.color!==void 0&&(me=3);let z,te,xe,Se;if(q){const we=pn[q];z=we.vertexShader,te=we.fragmentShader}else z=M.vertexShader,te=M.fragmentShader,c.update(M),xe=c.getVertexShaderID(M),Se=c.getFragmentShaderID(M);const Le=i.getRenderTarget(),$e=k.isInstancedMesh===!0,je=k.isBatchedMesh===!0,Be=!!M.map,tt=!!M.matcap,G=!!J,gt=!!M.aoMap,Ie=!!M.lightMap,ze=!!M.bumpMap,Ae=!!M.normalMap,ht=!!M.displacementMap,Ge=!!M.emissiveMap,S=!!M.metalnessMap,v=!!M.roughnessMap,W=M.anisotropy>0,ae=M.clearcoat>0,re=M.iridescence>0,ce=M.sheen>0,Re=M.transmission>0,Me=W&&!!M.anisotropyMap,be=ae&&!!M.clearcoatMap,Fe=ae&&!!M.clearcoatNormalMap,Ye=ae&&!!M.clearcoatRoughnessMap,ie=re&&!!M.iridescenceMap,ct=re&&!!M.iridescenceThicknessMap,Ke=ce&&!!M.sheenColorMap,Xe=ce&&!!M.sheenRoughnessMap,Ue=!!M.specularMap,Ee=!!M.specularColorMap,A=!!M.specularIntensityMap,he=Re&&!!M.transmissionMap,Pe=Re&&!!M.thicknessMap,Te=!!M.gradientMap,se=!!M.alphaMap,P=M.alphaTest>0,C=!!M.alphaHash,D=!!M.extensions,K=!!B.attributes.uv1,Q=!!B.attributes.uv2,ue=!!B.attributes.uv3;let fe=zn;return M.toneMapped&&(Le===null||Le.isXRRenderTarget===!0)&&(fe=i.toneMapping),{isWebGL2:u,shaderID:q,shaderType:M.type,shaderName:M.name,vertexShader:z,fragmentShader:te,defines:M.defines,customVertexShaderID:xe,customFragmentShaderID:Se,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:m,batching:je,instancing:$e,instancingColor:$e&&k.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:Le===null?i.outputColorSpace:Le.isXRRenderTarget===!0?Le.texture.colorSpace:An,map:Be,matcap:tt,envMap:G,envMapMode:G&&J.mapping,envMapCubeUVHeight:Z,aoMap:gt,lightMap:Ie,bumpMap:ze,normalMap:Ae,displacementMap:d&&ht,emissiveMap:Ge,normalMapObjectSpace:Ae&&M.normalMapType===Mu,normalMapTangentSpace:Ae&&M.normalMapType===Hc,metalnessMap:S,roughnessMap:v,anisotropy:W,anisotropyMap:Me,clearcoat:ae,clearcoatMap:be,clearcoatNormalMap:Fe,clearcoatRoughnessMap:Ye,iridescence:re,iridescenceMap:ie,iridescenceThicknessMap:ct,sheen:ce,sheenColorMap:Ke,sheenRoughnessMap:Xe,specularMap:Ue,specularColorMap:Ee,specularIntensityMap:A,transmission:Re,transmissionMap:he,thicknessMap:Pe,gradientMap:Te,opaque:M.transparent===!1&&M.blending===Fi,alphaMap:se,alphaTest:P,alphaHash:C,combine:M.combine,mapUv:Be&&g(M.map.channel),aoMapUv:gt&&g(M.aoMap.channel),lightMapUv:Ie&&g(M.lightMap.channel),bumpMapUv:ze&&g(M.bumpMap.channel),normalMapUv:Ae&&g(M.normalMap.channel),displacementMapUv:ht&&g(M.displacementMap.channel),emissiveMapUv:Ge&&g(M.emissiveMap.channel),metalnessMapUv:S&&g(M.metalnessMap.channel),roughnessMapUv:v&&g(M.roughnessMap.channel),anisotropyMapUv:Me&&g(M.anisotropyMap.channel),clearcoatMapUv:be&&g(M.clearcoatMap.channel),clearcoatNormalMapUv:Fe&&g(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ye&&g(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ie&&g(M.iridescenceMap.channel),iridescenceThicknessMapUv:ct&&g(M.iridescenceThicknessMap.channel),sheenColorMapUv:Ke&&g(M.sheenColorMap.channel),sheenRoughnessMapUv:Xe&&g(M.sheenRoughnessMap.channel),specularMapUv:Ue&&g(M.specularMap.channel),specularColorMapUv:Ee&&g(M.specularColorMap.channel),specularIntensityMapUv:A&&g(M.specularIntensityMap.channel),transmissionMapUv:he&&g(M.transmissionMap.channel),thicknessMapUv:Pe&&g(M.thicknessMap.channel),alphaMapUv:se&&g(M.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Ae||W),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,vertexUv1s:K,vertexUv2s:Q,vertexUv3s:ue,pointsUvs:k.isPoints===!0&&!!B.attributes.uv&&(Be||se),fog:!!w,useFog:M.fog===!0,fogExp2:w&&w.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:k.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:oe,morphTextureStride:me,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&F.length>0,shadowMapType:i.shadowMap.type,toneMapping:fe,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Be&&M.map.isVideoTexture===!0&&ut.getTransfer(M.map.colorSpace)===ft,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Sn,flipSided:M.side===Wt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:D&&M.extensions.derivatives===!0,extensionFragDepth:D&&M.extensions.fragDepth===!0,extensionDrawBuffers:D&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:D&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:D&&M.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function h(M){const T=[];if(M.shaderID?T.push(M.shaderID):(T.push(M.customVertexShaderID),T.push(M.customFragmentShaderID)),M.defines!==void 0)for(const F in M.defines)T.push(F),T.push(M.defines[F]);return M.isRawShaderMaterial===!1&&(E(T,M),x(T,M),T.push(i.outputColorSpace)),T.push(M.customProgramCacheKey),T.join()}function E(M,T){M.push(T.precision),M.push(T.outputColorSpace),M.push(T.envMapMode),M.push(T.envMapCubeUVHeight),M.push(T.mapUv),M.push(T.alphaMapUv),M.push(T.lightMapUv),M.push(T.aoMapUv),M.push(T.bumpMapUv),M.push(T.normalMapUv),M.push(T.displacementMapUv),M.push(T.emissiveMapUv),M.push(T.metalnessMapUv),M.push(T.roughnessMapUv),M.push(T.anisotropyMapUv),M.push(T.clearcoatMapUv),M.push(T.clearcoatNormalMapUv),M.push(T.clearcoatRoughnessMapUv),M.push(T.iridescenceMapUv),M.push(T.iridescenceThicknessMapUv),M.push(T.sheenColorMapUv),M.push(T.sheenRoughnessMapUv),M.push(T.specularMapUv),M.push(T.specularColorMapUv),M.push(T.specularIntensityMapUv),M.push(T.transmissionMapUv),M.push(T.thicknessMapUv),M.push(T.combine),M.push(T.fogExp2),M.push(T.sizeAttenuation),M.push(T.morphTargetsCount),M.push(T.morphAttributeCount),M.push(T.numDirLights),M.push(T.numPointLights),M.push(T.numSpotLights),M.push(T.numSpotLightMaps),M.push(T.numHemiLights),M.push(T.numRectAreaLights),M.push(T.numDirLightShadows),M.push(T.numPointLightShadows),M.push(T.numSpotLightShadows),M.push(T.numSpotLightShadowsWithMaps),M.push(T.numLightProbes),M.push(T.shadowMapType),M.push(T.toneMapping),M.push(T.numClippingPlanes),M.push(T.numClipIntersection),M.push(T.depthPacking)}function x(M,T){o.disableAll(),T.isWebGL2&&o.enable(0),T.supportsVertexTextures&&o.enable(1),T.instancing&&o.enable(2),T.instancingColor&&o.enable(3),T.matcap&&o.enable(4),T.envMap&&o.enable(5),T.normalMapObjectSpace&&o.enable(6),T.normalMapTangentSpace&&o.enable(7),T.clearcoat&&o.enable(8),T.iridescence&&o.enable(9),T.alphaTest&&o.enable(10),T.vertexColors&&o.enable(11),T.vertexAlphas&&o.enable(12),T.vertexUv1s&&o.enable(13),T.vertexUv2s&&o.enable(14),T.vertexUv3s&&o.enable(15),T.vertexTangents&&o.enable(16),T.anisotropy&&o.enable(17),T.alphaHash&&o.enable(18),T.batching&&o.enable(19),M.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.skinning&&o.enable(4),T.morphTargets&&o.enable(5),T.morphNormals&&o.enable(6),T.morphColors&&o.enable(7),T.premultipliedAlpha&&o.enable(8),T.shadowMapEnabled&&o.enable(9),T.useLegacyLights&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),M.push(o.mask)}function b(M){const T=_[M.type];let F;if(T){const U=pn[T];F=oh.clone(U.uniforms)}else F=M.uniforms;return F}function I(M,T){let F;for(let U=0,k=l.length;U<k;U++){const w=l[U];if(w.cacheKey===T){F=w,++F.usedTimes;break}}return F===void 0&&(F=new ym(i,T,M,s),l.push(F)),F}function L(M){if(--M.usedTimes===0){const T=l.indexOf(M);l[T]=l[l.length-1],l.pop(),M.destroy()}}function R(M){c.remove(M)}function Y(){c.dispose()}return{getParameters:p,getProgramCacheKey:h,getUniforms:b,acquireProgram:I,releaseProgram:L,releaseShaderCache:R,programs:l,dispose:Y}}function wm(){let i=new WeakMap;function e(s){let a=i.get(s);return a===void 0&&(a={},i.set(s,a)),a}function t(s){i.delete(s)}function n(s,a,o){i.get(s)[a]=o}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function Am(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function qa(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Ya(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(f,d,m,_,g,p){let h=i[e];return h===void 0?(h={id:f.id,object:f,geometry:d,material:m,groupOrder:_,renderOrder:f.renderOrder,z:g,group:p},i[e]=h):(h.id=f.id,h.object=f,h.geometry=d,h.material=m,h.groupOrder=_,h.renderOrder=f.renderOrder,h.z=g,h.group=p),e++,h}function o(f,d,m,_,g,p){const h=a(f,d,m,_,g,p);m.transmission>0?n.push(h):m.transparent===!0?r.push(h):t.push(h)}function c(f,d,m,_,g,p){const h=a(f,d,m,_,g,p);m.transmission>0?n.unshift(h):m.transparent===!0?r.unshift(h):t.unshift(h)}function l(f,d){t.length>1&&t.sort(f||Am),n.length>1&&n.sort(d||qa),r.length>1&&r.sort(d||qa)}function u(){for(let f=e,d=i.length;f<d;f++){const m=i[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:o,unshift:c,finish:u,sort:l}}function Rm(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new Ya,i.set(n,[a])):r>=s.length?(a=new Ya,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Cm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new it};break;case"SpotLight":t={position:new N,direction:new N,color:new it,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new it,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new it,groundColor:new it};break;case"RectAreaLight":t={color:new it,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function Lm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Pm=0;function Dm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Im(i,e){const t=new Cm,n=Lm(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new N);const s=new N,a=new vt,o=new vt;function c(u,f){let d=0,m=0,_=0;for(let U=0;U<9;U++)r.probe[U].set(0,0,0);let g=0,p=0,h=0,E=0,x=0,b=0,I=0,L=0,R=0,Y=0,M=0;u.sort(Dm);const T=f===!0?Math.PI:1;for(let U=0,k=u.length;U<k;U++){const w=u[U],B=w.color,H=w.intensity,J=w.distance,Z=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)d+=B.r*H*T,m+=B.g*H*T,_+=B.b*H*T;else if(w.isLightProbe){for(let q=0;q<9;q++)r.probe[q].addScaledVector(w.sh.coefficients[q],H);M++}else if(w.isDirectionalLight){const q=t.get(w);if(q.color.copy(w.color).multiplyScalar(w.intensity*T),w.castShadow){const ee=w.shadow,oe=n.get(w);oe.shadowBias=ee.bias,oe.shadowNormalBias=ee.normalBias,oe.shadowRadius=ee.radius,oe.shadowMapSize=ee.mapSize,r.directionalShadow[g]=oe,r.directionalShadowMap[g]=Z,r.directionalShadowMatrix[g]=w.shadow.matrix,b++}r.directional[g]=q,g++}else if(w.isSpotLight){const q=t.get(w);q.position.setFromMatrixPosition(w.matrixWorld),q.color.copy(B).multiplyScalar(H*T),q.distance=J,q.coneCos=Math.cos(w.angle),q.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),q.decay=w.decay,r.spot[h]=q;const ee=w.shadow;if(w.map&&(r.spotLightMap[R]=w.map,R++,ee.updateMatrices(w),w.castShadow&&Y++),r.spotLightMatrix[h]=ee.matrix,w.castShadow){const oe=n.get(w);oe.shadowBias=ee.bias,oe.shadowNormalBias=ee.normalBias,oe.shadowRadius=ee.radius,oe.shadowMapSize=ee.mapSize,r.spotShadow[h]=oe,r.spotShadowMap[h]=Z,L++}h++}else if(w.isRectAreaLight){const q=t.get(w);q.color.copy(B).multiplyScalar(H),q.halfWidth.set(w.width*.5,0,0),q.halfHeight.set(0,w.height*.5,0),r.rectArea[E]=q,E++}else if(w.isPointLight){const q=t.get(w);if(q.color.copy(w.color).multiplyScalar(w.intensity*T),q.distance=w.distance,q.decay=w.decay,w.castShadow){const ee=w.shadow,oe=n.get(w);oe.shadowBias=ee.bias,oe.shadowNormalBias=ee.normalBias,oe.shadowRadius=ee.radius,oe.shadowMapSize=ee.mapSize,oe.shadowCameraNear=ee.camera.near,oe.shadowCameraFar=ee.camera.far,r.pointShadow[p]=oe,r.pointShadowMap[p]=Z,r.pointShadowMatrix[p]=w.shadow.matrix,I++}r.point[p]=q,p++}else if(w.isHemisphereLight){const q=t.get(w);q.skyColor.copy(w.color).multiplyScalar(H*T),q.groundColor.copy(w.groundColor).multiplyScalar(H*T),r.hemi[x]=q,x++}}E>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ve.LTC_FLOAT_1,r.rectAreaLTC2=ve.LTC_FLOAT_2):(r.rectAreaLTC1=ve.LTC_HALF_1,r.rectAreaLTC2=ve.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ve.LTC_FLOAT_1,r.rectAreaLTC2=ve.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=ve.LTC_HALF_1,r.rectAreaLTC2=ve.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=m,r.ambient[2]=_;const F=r.hash;(F.directionalLength!==g||F.pointLength!==p||F.spotLength!==h||F.rectAreaLength!==E||F.hemiLength!==x||F.numDirectionalShadows!==b||F.numPointShadows!==I||F.numSpotShadows!==L||F.numSpotMaps!==R||F.numLightProbes!==M)&&(r.directional.length=g,r.spot.length=h,r.rectArea.length=E,r.point.length=p,r.hemi.length=x,r.directionalShadow.length=b,r.directionalShadowMap.length=b,r.pointShadow.length=I,r.pointShadowMap.length=I,r.spotShadow.length=L,r.spotShadowMap.length=L,r.directionalShadowMatrix.length=b,r.pointShadowMatrix.length=I,r.spotLightMatrix.length=L+R-Y,r.spotLightMap.length=R,r.numSpotLightShadowsWithMaps=Y,r.numLightProbes=M,F.directionalLength=g,F.pointLength=p,F.spotLength=h,F.rectAreaLength=E,F.hemiLength=x,F.numDirectionalShadows=b,F.numPointShadows=I,F.numSpotShadows=L,F.numSpotMaps=R,F.numLightProbes=M,r.version=Pm++)}function l(u,f){let d=0,m=0,_=0,g=0,p=0;const h=f.matrixWorldInverse;for(let E=0,x=u.length;E<x;E++){const b=u[E];if(b.isDirectionalLight){const I=r.directional[d];I.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),I.direction.sub(s),I.direction.transformDirection(h),d++}else if(b.isSpotLight){const I=r.spot[_];I.position.setFromMatrixPosition(b.matrixWorld),I.position.applyMatrix4(h),I.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),I.direction.sub(s),I.direction.transformDirection(h),_++}else if(b.isRectAreaLight){const I=r.rectArea[g];I.position.setFromMatrixPosition(b.matrixWorld),I.position.applyMatrix4(h),o.identity(),a.copy(b.matrixWorld),a.premultiply(h),o.extractRotation(a),I.halfWidth.set(b.width*.5,0,0),I.halfHeight.set(0,b.height*.5,0),I.halfWidth.applyMatrix4(o),I.halfHeight.applyMatrix4(o),g++}else if(b.isPointLight){const I=r.point[m];I.position.setFromMatrixPosition(b.matrixWorld),I.position.applyMatrix4(h),m++}else if(b.isHemisphereLight){const I=r.hemi[p];I.direction.setFromMatrixPosition(b.matrixWorld),I.direction.transformDirection(h),p++}}}return{setup:c,setupView:l,state:r}}function Ka(i,e){const t=new Im(i,e),n=[],r=[];function s(){n.length=0,r.length=0}function a(f){n.push(f)}function o(f){r.push(f)}function c(f){t.setup(n,f)}function l(f){t.setupView(n,f)}return{init:s,state:{lightsArray:n,shadowsArray:r,lights:t},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function Um(i,e){let t=new WeakMap;function n(s,a=0){const o=t.get(s);let c;return o===void 0?(c=new Ka(i,e),t.set(s,[c])):a>=o.length?(c=new Ka(i,e),o.push(c)):c=o[a],c}function r(){t=new WeakMap}return{get:n,dispose:r}}class Nm extends Gn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Fm extends Gn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Om=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Bm=`uniform sampler2D shadow_pass;
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
}`;function zm(i,e,t){let n=new _o;const r=new ke,s=new ke,a=new Pt,o=new Nm({depthPacking:xu}),c=new Fm,l={},u=t.maxTextureSize,f={[Hn]:Wt,[Wt]:Hn,[Sn]:Sn},d=new ai({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ke},radius:{value:4}},vertexShader:Om,fragmentShader:Bm}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const _=new Zt;_.setAttribute("position",new dn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Vt(_,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cc;let h=this.type;this.render=function(L,R,Y){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||L.length===0)return;const M=i.getRenderTarget(),T=i.getActiveCubeFace(),F=i.getActiveMipmapLevel(),U=i.state;U.setBlending(Bn),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const k=h!==En&&this.type===En,w=h===En&&this.type!==En;for(let B=0,H=L.length;B<H;B++){const J=L[B],Z=J.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;r.copy(Z.mapSize);const q=Z.getFrameExtents();if(r.multiply(q),s.copy(Z.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/q.x),r.x=s.x*q.x,Z.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/q.y),r.y=s.y*q.y,Z.mapSize.y=s.y)),Z.map===null||k===!0||w===!0){const oe=this.type!==En?{minFilter:kt,magFilter:kt}:{};Z.map!==null&&Z.map.dispose(),Z.map=new si(r.x,r.y,oe),Z.map.texture.name=J.name+".shadowMap",Z.camera.updateProjectionMatrix()}i.setRenderTarget(Z.map),i.clear();const ee=Z.getViewportCount();for(let oe=0;oe<ee;oe++){const me=Z.getViewport(oe);a.set(s.x*me.x,s.y*me.y,s.x*me.z,s.y*me.w),U.viewport(a),Z.updateMatrices(J,oe),n=Z.getFrustum(),b(R,Y,Z.camera,J,this.type)}Z.isPointLightShadow!==!0&&this.type===En&&E(Z,Y),Z.needsUpdate=!1}h=this.type,p.needsUpdate=!1,i.setRenderTarget(M,T,F)};function E(L,R){const Y=e.update(g);d.defines.VSM_SAMPLES!==L.blurSamples&&(d.defines.VSM_SAMPLES=L.blurSamples,m.defines.VSM_SAMPLES=L.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new si(r.x,r.y)),d.uniforms.shadow_pass.value=L.map.texture,d.uniforms.resolution.value=L.mapSize,d.uniforms.radius.value=L.radius,i.setRenderTarget(L.mapPass),i.clear(),i.renderBufferDirect(R,null,Y,d,g,null),m.uniforms.shadow_pass.value=L.mapPass.texture,m.uniforms.resolution.value=L.mapSize,m.uniforms.radius.value=L.radius,i.setRenderTarget(L.map),i.clear(),i.renderBufferDirect(R,null,Y,m,g,null)}function x(L,R,Y,M){let T=null;const F=Y.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(F!==void 0)T=F;else if(T=Y.isPointLight===!0?c:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const U=T.uuid,k=R.uuid;let w=l[U];w===void 0&&(w={},l[U]=w);let B=w[k];B===void 0&&(B=T.clone(),w[k]=B,R.addEventListener("dispose",I)),T=B}if(T.visible=R.visible,T.wireframe=R.wireframe,M===En?T.side=R.shadowSide!==null?R.shadowSide:R.side:T.side=R.shadowSide!==null?R.shadowSide:f[R.side],T.alphaMap=R.alphaMap,T.alphaTest=R.alphaTest,T.map=R.map,T.clipShadows=R.clipShadows,T.clippingPlanes=R.clippingPlanes,T.clipIntersection=R.clipIntersection,T.displacementMap=R.displacementMap,T.displacementScale=R.displacementScale,T.displacementBias=R.displacementBias,T.wireframeLinewidth=R.wireframeLinewidth,T.linewidth=R.linewidth,Y.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const U=i.properties.get(T);U.light=Y}return T}function b(L,R,Y,M,T){if(L.visible===!1)return;if(L.layers.test(R.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&T===En)&&(!L.frustumCulled||n.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,L.matrixWorld);const k=e.update(L),w=L.material;if(Array.isArray(w)){const B=k.groups;for(let H=0,J=B.length;H<J;H++){const Z=B[H],q=w[Z.materialIndex];if(q&&q.visible){const ee=x(L,q,M,T);L.onBeforeShadow(i,L,R,Y,k,ee,Z),i.renderBufferDirect(Y,null,k,ee,L,Z),L.onAfterShadow(i,L,R,Y,k,ee,Z)}}}else if(w.visible){const B=x(L,w,M,T);L.onBeforeShadow(i,L,R,Y,k,B,null),i.renderBufferDirect(Y,null,k,B,L,null),L.onAfterShadow(i,L,R,Y,k,B,null)}}const U=L.children;for(let k=0,w=U.length;k<w;k++)b(U[k],R,Y,M,T)}function I(L){L.target.removeEventListener("dispose",I);for(const Y in l){const M=l[Y],T=L.target.uuid;T in M&&(M[T].dispose(),delete M[T])}}}function km(i,e,t){const n=t.isWebGL2;function r(){let P=!1;const C=new Pt;let D=null;const K=new Pt(0,0,0,0);return{setMask:function(Q){D!==Q&&!P&&(i.colorMask(Q,Q,Q,Q),D=Q)},setLocked:function(Q){P=Q},setClear:function(Q,ue,fe,pe,we){we===!0&&(Q*=pe,ue*=pe,fe*=pe),C.set(Q,ue,fe,pe),K.equals(C)===!1&&(i.clearColor(Q,ue,fe,pe),K.copy(C))},reset:function(){P=!1,D=null,K.set(-1,0,0,0)}}}function s(){let P=!1,C=null,D=null,K=null;return{setTest:function(Q){Q?je(i.DEPTH_TEST):Be(i.DEPTH_TEST)},setMask:function(Q){C!==Q&&!P&&(i.depthMask(Q),C=Q)},setFunc:function(Q){if(D!==Q){switch(Q){case Yl:i.depthFunc(i.NEVER);break;case Kl:i.depthFunc(i.ALWAYS);break;case Zl:i.depthFunc(i.LESS);break;case Zr:i.depthFunc(i.LEQUAL);break;case Jl:i.depthFunc(i.EQUAL);break;case Ql:i.depthFunc(i.GEQUAL);break;case eu:i.depthFunc(i.GREATER);break;case tu:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}D=Q}},setLocked:function(Q){P=Q},setClear:function(Q){K!==Q&&(i.clearDepth(Q),K=Q)},reset:function(){P=!1,C=null,D=null,K=null}}}function a(){let P=!1,C=null,D=null,K=null,Q=null,ue=null,fe=null,pe=null,we=null;return{setTest:function(de){P||(de?je(i.STENCIL_TEST):Be(i.STENCIL_TEST))},setMask:function(de){C!==de&&!P&&(i.stencilMask(de),C=de)},setFunc:function(de,De,Oe){(D!==de||K!==De||Q!==Oe)&&(i.stencilFunc(de,De,Oe),D=de,K=De,Q=Oe)},setOp:function(de,De,Oe){(ue!==de||fe!==De||pe!==Oe)&&(i.stencilOp(de,De,Oe),ue=de,fe=De,pe=Oe)},setLocked:function(de){P=de},setClear:function(de){we!==de&&(i.clearStencil(de),we=de)},reset:function(){P=!1,C=null,D=null,K=null,Q=null,ue=null,fe=null,pe=null,we=null}}}const o=new r,c=new s,l=new a,u=new WeakMap,f=new WeakMap;let d={},m={},_=new WeakMap,g=[],p=null,h=!1,E=null,x=null,b=null,I=null,L=null,R=null,Y=null,M=new it(0,0,0),T=0,F=!1,U=null,k=null,w=null,B=null,H=null;const J=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,q=0;const ee=i.getParameter(i.VERSION);ee.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(ee)[1]),Z=q>=1):ee.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),Z=q>=2);let oe=null,me={};const z=i.getParameter(i.SCISSOR_BOX),te=i.getParameter(i.VIEWPORT),xe=new Pt().fromArray(z),Se=new Pt().fromArray(te);function Le(P,C,D,K){const Q=new Uint8Array(4),ue=i.createTexture();i.bindTexture(P,ue),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let fe=0;fe<D;fe++)n&&(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)?i.texImage3D(C,0,i.RGBA,1,1,K,0,i.RGBA,i.UNSIGNED_BYTE,Q):i.texImage2D(C+fe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Q);return ue}const $e={};$e[i.TEXTURE_2D]=Le(i.TEXTURE_2D,i.TEXTURE_2D,1),$e[i.TEXTURE_CUBE_MAP]=Le(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&($e[i.TEXTURE_2D_ARRAY]=Le(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),$e[i.TEXTURE_3D]=Le(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),l.setClear(0),je(i.DEPTH_TEST),c.setFunc(Zr),Ge(!1),S(Do),je(i.CULL_FACE),Ae(Bn);function je(P){d[P]!==!0&&(i.enable(P),d[P]=!0)}function Be(P){d[P]!==!1&&(i.disable(P),d[P]=!1)}function tt(P,C){return m[P]!==C?(i.bindFramebuffer(P,C),m[P]=C,n&&(P===i.DRAW_FRAMEBUFFER&&(m[i.FRAMEBUFFER]=C),P===i.FRAMEBUFFER&&(m[i.DRAW_FRAMEBUFFER]=C)),!0):!1}function G(P,C){let D=g,K=!1;if(P)if(D=_.get(C),D===void 0&&(D=[],_.set(C,D)),P.isWebGLMultipleRenderTargets){const Q=P.texture;if(D.length!==Q.length||D[0]!==i.COLOR_ATTACHMENT0){for(let ue=0,fe=Q.length;ue<fe;ue++)D[ue]=i.COLOR_ATTACHMENT0+ue;D.length=Q.length,K=!0}}else D[0]!==i.COLOR_ATTACHMENT0&&(D[0]=i.COLOR_ATTACHMENT0,K=!0);else D[0]!==i.BACK&&(D[0]=i.BACK,K=!0);K&&(t.isWebGL2?i.drawBuffers(D):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(D))}function gt(P){return p!==P?(i.useProgram(P),p=P,!0):!1}const Ie={[Qn]:i.FUNC_ADD,[Ul]:i.FUNC_SUBTRACT,[Nl]:i.FUNC_REVERSE_SUBTRACT};if(n)Ie[Fo]=i.MIN,Ie[Oo]=i.MAX;else{const P=e.get("EXT_blend_minmax");P!==null&&(Ie[Fo]=P.MIN_EXT,Ie[Oo]=P.MAX_EXT)}const ze={[Fl]:i.ZERO,[Ol]:i.ONE,[Bl]:i.SRC_COLOR,[Ys]:i.SRC_ALPHA,[Vl]:i.SRC_ALPHA_SATURATE,[Gl]:i.DST_COLOR,[kl]:i.DST_ALPHA,[zl]:i.ONE_MINUS_SRC_COLOR,[Ks]:i.ONE_MINUS_SRC_ALPHA,[Wl]:i.ONE_MINUS_DST_COLOR,[Hl]:i.ONE_MINUS_DST_ALPHA,[Xl]:i.CONSTANT_COLOR,[$l]:i.ONE_MINUS_CONSTANT_COLOR,[jl]:i.CONSTANT_ALPHA,[ql]:i.ONE_MINUS_CONSTANT_ALPHA};function Ae(P,C,D,K,Q,ue,fe,pe,we,de){if(P===Bn){h===!0&&(Be(i.BLEND),h=!1);return}if(h===!1&&(je(i.BLEND),h=!0),P!==Il){if(P!==E||de!==F){if((x!==Qn||L!==Qn)&&(i.blendEquation(i.FUNC_ADD),x=Qn,L=Qn),de)switch(P){case Fi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Io:i.blendFunc(i.ONE,i.ONE);break;case Uo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case No:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case Fi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Io:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Uo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case No:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}b=null,I=null,R=null,Y=null,M.set(0,0,0),T=0,E=P,F=de}return}Q=Q||C,ue=ue||D,fe=fe||K,(C!==x||Q!==L)&&(i.blendEquationSeparate(Ie[C],Ie[Q]),x=C,L=Q),(D!==b||K!==I||ue!==R||fe!==Y)&&(i.blendFuncSeparate(ze[D],ze[K],ze[ue],ze[fe]),b=D,I=K,R=ue,Y=fe),(pe.equals(M)===!1||we!==T)&&(i.blendColor(pe.r,pe.g,pe.b,we),M.copy(pe),T=we),E=P,F=!1}function ht(P,C){P.side===Sn?Be(i.CULL_FACE):je(i.CULL_FACE);let D=P.side===Wt;C&&(D=!D),Ge(D),P.blending===Fi&&P.transparent===!1?Ae(Bn):Ae(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),c.setFunc(P.depthFunc),c.setTest(P.depthTest),c.setMask(P.depthWrite),o.setMask(P.colorWrite);const K=P.stencilWrite;l.setTest(K),K&&(l.setMask(P.stencilWriteMask),l.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),l.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),W(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?je(i.SAMPLE_ALPHA_TO_COVERAGE):Be(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ge(P){U!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),U=P)}function S(P){P!==Ll?(je(i.CULL_FACE),P!==k&&(P===Do?i.cullFace(i.BACK):P===Pl?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Be(i.CULL_FACE),k=P}function v(P){P!==w&&(Z&&i.lineWidth(P),w=P)}function W(P,C,D){P?(je(i.POLYGON_OFFSET_FILL),(B!==C||H!==D)&&(i.polygonOffset(C,D),B=C,H=D)):Be(i.POLYGON_OFFSET_FILL)}function ae(P){P?je(i.SCISSOR_TEST):Be(i.SCISSOR_TEST)}function re(P){P===void 0&&(P=i.TEXTURE0+J-1),oe!==P&&(i.activeTexture(P),oe=P)}function ce(P,C,D){D===void 0&&(oe===null?D=i.TEXTURE0+J-1:D=oe);let K=me[D];K===void 0&&(K={type:void 0,texture:void 0},me[D]=K),(K.type!==P||K.texture!==C)&&(oe!==D&&(i.activeTexture(D),oe=D),i.bindTexture(P,C||$e[P]),K.type=P,K.texture=C)}function Re(){const P=me[oe];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function Me(){try{i.compressedTexImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function be(){try{i.compressedTexImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Fe(){try{i.texSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ye(){try{i.texSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ie(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ct(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ke(){try{i.texStorage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Xe(){try{i.texStorage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ue(){try{i.texImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ee(){try{i.texImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function A(P){xe.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),xe.copy(P))}function he(P){Se.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),Se.copy(P))}function Pe(P,C){let D=f.get(C);D===void 0&&(D=new WeakMap,f.set(C,D));let K=D.get(P);K===void 0&&(K=i.getUniformBlockIndex(C,P.name),D.set(P,K))}function Te(P,C){const K=f.get(C).get(P);u.get(C)!==K&&(i.uniformBlockBinding(C,K,P.__bindingPointIndex),u.set(C,K))}function se(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},oe=null,me={},m={},_=new WeakMap,g=[],p=null,h=!1,E=null,x=null,b=null,I=null,L=null,R=null,Y=null,M=new it(0,0,0),T=0,F=!1,U=null,k=null,w=null,B=null,H=null,xe.set(0,0,i.canvas.width,i.canvas.height),Se.set(0,0,i.canvas.width,i.canvas.height),o.reset(),c.reset(),l.reset()}return{buffers:{color:o,depth:c,stencil:l},enable:je,disable:Be,bindFramebuffer:tt,drawBuffers:G,useProgram:gt,setBlending:Ae,setMaterial:ht,setFlipSided:Ge,setCullFace:S,setLineWidth:v,setPolygonOffset:W,setScissorTest:ae,activeTexture:re,bindTexture:ce,unbindTexture:Re,compressedTexImage2D:Me,compressedTexImage3D:be,texImage2D:Ue,texImage3D:Ee,updateUBOMapping:Pe,uniformBlockBinding:Te,texStorage2D:Ke,texStorage3D:Xe,texSubImage2D:Fe,texSubImage3D:Ye,compressedTexSubImage2D:ie,compressedTexSubImage3D:ct,scissor:A,viewport:he,reset:se}}function Hm(i,e,t,n,r,s,a){const o=r.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let f;const d=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(S,v){return m?new OffscreenCanvas(S,v):is("canvas")}function g(S,v,W,ae){let re=1;if((S.width>ae||S.height>ae)&&(re=ae/Math.max(S.width,S.height)),re<1||v===!0)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap){const ce=v?ns:Math.floor,Re=ce(re*S.width),Me=ce(re*S.height);f===void 0&&(f=_(Re,Me));const be=W?_(Re,Me):f;return be.width=Re,be.height=Me,be.getContext("2d").drawImage(S,0,0,Re,Me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+S.width+"x"+S.height+") to ("+Re+"x"+Me+")."),be}else return"data"in S&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+S.width+"x"+S.height+")."),S;return S}function p(S){return io(S.width)&&io(S.height)}function h(S){return o?!1:S.wrapS!==un||S.wrapT!==un||S.minFilter!==kt&&S.minFilter!==en}function E(S,v){return S.generateMipmaps&&v&&S.minFilter!==kt&&S.minFilter!==en}function x(S){i.generateMipmap(S)}function b(S,v,W,ae,re=!1){if(o===!1)return v;if(S!==null){if(i[S]!==void 0)return i[S];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let ce=v;if(v===i.RED&&(W===i.FLOAT&&(ce=i.R32F),W===i.HALF_FLOAT&&(ce=i.R16F),W===i.UNSIGNED_BYTE&&(ce=i.R8)),v===i.RED_INTEGER&&(W===i.UNSIGNED_BYTE&&(ce=i.R8UI),W===i.UNSIGNED_SHORT&&(ce=i.R16UI),W===i.UNSIGNED_INT&&(ce=i.R32UI),W===i.BYTE&&(ce=i.R8I),W===i.SHORT&&(ce=i.R16I),W===i.INT&&(ce=i.R32I)),v===i.RG&&(W===i.FLOAT&&(ce=i.RG32F),W===i.HALF_FLOAT&&(ce=i.RG16F),W===i.UNSIGNED_BYTE&&(ce=i.RG8)),v===i.RGBA){const Re=re?Jr:ut.getTransfer(ae);W===i.FLOAT&&(ce=i.RGBA32F),W===i.HALF_FLOAT&&(ce=i.RGBA16F),W===i.UNSIGNED_BYTE&&(ce=Re===ft?i.SRGB8_ALPHA8:i.RGBA8),W===i.UNSIGNED_SHORT_4_4_4_4&&(ce=i.RGBA4),W===i.UNSIGNED_SHORT_5_5_5_1&&(ce=i.RGB5_A1)}return(ce===i.R16F||ce===i.R32F||ce===i.RG16F||ce===i.RG32F||ce===i.RGBA16F||ce===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ce}function I(S,v,W){return E(S,W)===!0||S.isFramebufferTexture&&S.minFilter!==kt&&S.minFilter!==en?Math.log2(Math.max(v.width,v.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?v.mipmaps.length:1}function L(S){return S===kt||S===Bo||S===gs?i.NEAREST:i.LINEAR}function R(S){const v=S.target;v.removeEventListener("dispose",R),M(v),v.isVideoTexture&&u.delete(v)}function Y(S){const v=S.target;v.removeEventListener("dispose",Y),F(v)}function M(S){const v=n.get(S);if(v.__webglInit===void 0)return;const W=S.source,ae=d.get(W);if(ae){const re=ae[v.__cacheKey];re.usedTimes--,re.usedTimes===0&&T(S),Object.keys(ae).length===0&&d.delete(W)}n.remove(S)}function T(S){const v=n.get(S);i.deleteTexture(v.__webglTexture);const W=S.source,ae=d.get(W);delete ae[v.__cacheKey],a.memory.textures--}function F(S){const v=S.texture,W=n.get(S),ae=n.get(v);if(ae.__webglTexture!==void 0&&(i.deleteTexture(ae.__webglTexture),a.memory.textures--),S.depthTexture&&S.depthTexture.dispose(),S.isWebGLCubeRenderTarget)for(let re=0;re<6;re++){if(Array.isArray(W.__webglFramebuffer[re]))for(let ce=0;ce<W.__webglFramebuffer[re].length;ce++)i.deleteFramebuffer(W.__webglFramebuffer[re][ce]);else i.deleteFramebuffer(W.__webglFramebuffer[re]);W.__webglDepthbuffer&&i.deleteRenderbuffer(W.__webglDepthbuffer[re])}else{if(Array.isArray(W.__webglFramebuffer))for(let re=0;re<W.__webglFramebuffer.length;re++)i.deleteFramebuffer(W.__webglFramebuffer[re]);else i.deleteFramebuffer(W.__webglFramebuffer);if(W.__webglDepthbuffer&&i.deleteRenderbuffer(W.__webglDepthbuffer),W.__webglMultisampledFramebuffer&&i.deleteFramebuffer(W.__webglMultisampledFramebuffer),W.__webglColorRenderbuffer)for(let re=0;re<W.__webglColorRenderbuffer.length;re++)W.__webglColorRenderbuffer[re]&&i.deleteRenderbuffer(W.__webglColorRenderbuffer[re]);W.__webglDepthRenderbuffer&&i.deleteRenderbuffer(W.__webglDepthRenderbuffer)}if(S.isWebGLMultipleRenderTargets)for(let re=0,ce=v.length;re<ce;re++){const Re=n.get(v[re]);Re.__webglTexture&&(i.deleteTexture(Re.__webglTexture),a.memory.textures--),n.remove(v[re])}n.remove(v),n.remove(S)}let U=0;function k(){U=0}function w(){const S=U;return S>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+r.maxTextures),U+=1,S}function B(S){const v=[];return v.push(S.wrapS),v.push(S.wrapT),v.push(S.wrapR||0),v.push(S.magFilter),v.push(S.minFilter),v.push(S.anisotropy),v.push(S.internalFormat),v.push(S.format),v.push(S.type),v.push(S.generateMipmaps),v.push(S.premultiplyAlpha),v.push(S.flipY),v.push(S.unpackAlignment),v.push(S.colorSpace),v.join()}function H(S,v){const W=n.get(S);if(S.isVideoTexture&&ht(S),S.isRenderTargetTexture===!1&&S.version>0&&W.__version!==S.version){const ae=S.image;if(ae===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ae.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{xe(W,S,v);return}}t.bindTexture(i.TEXTURE_2D,W.__webglTexture,i.TEXTURE0+v)}function J(S,v){const W=n.get(S);if(S.version>0&&W.__version!==S.version){xe(W,S,v);return}t.bindTexture(i.TEXTURE_2D_ARRAY,W.__webglTexture,i.TEXTURE0+v)}function Z(S,v){const W=n.get(S);if(S.version>0&&W.__version!==S.version){xe(W,S,v);return}t.bindTexture(i.TEXTURE_3D,W.__webglTexture,i.TEXTURE0+v)}function q(S,v){const W=n.get(S);if(S.version>0&&W.__version!==S.version){Se(W,S,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture,i.TEXTURE0+v)}const ee={[Qs]:i.REPEAT,[un]:i.CLAMP_TO_EDGE,[eo]:i.MIRRORED_REPEAT},oe={[kt]:i.NEAREST,[Bo]:i.NEAREST_MIPMAP_NEAREST,[gs]:i.NEAREST_MIPMAP_LINEAR,[en]:i.LINEAR,[lu]:i.LINEAR_MIPMAP_NEAREST,[hr]:i.LINEAR_MIPMAP_LINEAR},me={[yu]:i.NEVER,[Au]:i.ALWAYS,[Eu]:i.LESS,[Gc]:i.LEQUAL,[Su]:i.EQUAL,[wu]:i.GEQUAL,[bu]:i.GREATER,[Tu]:i.NOTEQUAL};function z(S,v,W){if(W?(i.texParameteri(S,i.TEXTURE_WRAP_S,ee[v.wrapS]),i.texParameteri(S,i.TEXTURE_WRAP_T,ee[v.wrapT]),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,ee[v.wrapR]),i.texParameteri(S,i.TEXTURE_MAG_FILTER,oe[v.magFilter]),i.texParameteri(S,i.TEXTURE_MIN_FILTER,oe[v.minFilter])):(i.texParameteri(S,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(S,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(v.wrapS!==un||v.wrapT!==un)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(S,i.TEXTURE_MAG_FILTER,L(v.magFilter)),i.texParameteri(S,i.TEXTURE_MIN_FILTER,L(v.minFilter)),v.minFilter!==kt&&v.minFilter!==en&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),v.compareFunction&&(i.texParameteri(S,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(S,i.TEXTURE_COMPARE_FUNC,me[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ae=e.get("EXT_texture_filter_anisotropic");if(v.magFilter===kt||v.minFilter!==gs&&v.minFilter!==hr||v.type===Fn&&e.has("OES_texture_float_linear")===!1||o===!1&&v.type===dr&&e.has("OES_texture_half_float_linear")===!1)return;(v.anisotropy>1||n.get(v).__currentAnisotropy)&&(i.texParameterf(S,ae.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy)}}function te(S,v){let W=!1;S.__webglInit===void 0&&(S.__webglInit=!0,v.addEventListener("dispose",R));const ae=v.source;let re=d.get(ae);re===void 0&&(re={},d.set(ae,re));const ce=B(v);if(ce!==S.__cacheKey){re[ce]===void 0&&(re[ce]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,W=!0),re[ce].usedTimes++;const Re=re[S.__cacheKey];Re!==void 0&&(re[S.__cacheKey].usedTimes--,Re.usedTimes===0&&T(v)),S.__cacheKey=ce,S.__webglTexture=re[ce].texture}return W}function xe(S,v,W){let ae=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(ae=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(ae=i.TEXTURE_3D);const re=te(S,v),ce=v.source;t.bindTexture(ae,S.__webglTexture,i.TEXTURE0+W);const Re=n.get(ce);if(ce.version!==Re.__version||re===!0){t.activeTexture(i.TEXTURE0+W);const Me=ut.getPrimaries(ut.workingColorSpace),be=v.colorSpace===sn?null:ut.getPrimaries(v.colorSpace),Fe=v.colorSpace===sn||Me===be?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe);const Ye=h(v)&&p(v.image)===!1;let ie=g(v.image,Ye,!1,r.maxTextureSize);ie=Ge(v,ie);const ct=p(ie)||o,Ke=s.convert(v.format,v.colorSpace);let Xe=s.convert(v.type),Ue=b(v.internalFormat,Ke,Xe,v.colorSpace,v.isVideoTexture);z(ae,v,ct);let Ee;const A=v.mipmaps,he=o&&v.isVideoTexture!==!0&&Ue!==zc,Pe=Re.__version===void 0||re===!0,Te=I(v,ie,ct);if(v.isDepthTexture)Ue=i.DEPTH_COMPONENT,o?v.type===Fn?Ue=i.DEPTH_COMPONENT32F:v.type===Nn?Ue=i.DEPTH_COMPONENT24:v.type===ti?Ue=i.DEPTH24_STENCIL8:Ue=i.DEPTH_COMPONENT16:v.type===Fn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),v.format===ni&&Ue===i.DEPTH_COMPONENT&&v.type!==ho&&v.type!==Nn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),v.type=Nn,Xe=s.convert(v.type)),v.format===Hi&&Ue===i.DEPTH_COMPONENT&&(Ue=i.DEPTH_STENCIL,v.type!==ti&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),v.type=ti,Xe=s.convert(v.type))),Pe&&(he?t.texStorage2D(i.TEXTURE_2D,1,Ue,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,Ue,ie.width,ie.height,0,Ke,Xe,null));else if(v.isDataTexture)if(A.length>0&&ct){he&&Pe&&t.texStorage2D(i.TEXTURE_2D,Te,Ue,A[0].width,A[0].height);for(let se=0,P=A.length;se<P;se++)Ee=A[se],he?t.texSubImage2D(i.TEXTURE_2D,se,0,0,Ee.width,Ee.height,Ke,Xe,Ee.data):t.texImage2D(i.TEXTURE_2D,se,Ue,Ee.width,Ee.height,0,Ke,Xe,Ee.data);v.generateMipmaps=!1}else he?(Pe&&t.texStorage2D(i.TEXTURE_2D,Te,Ue,ie.width,ie.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,ie.width,ie.height,Ke,Xe,ie.data)):t.texImage2D(i.TEXTURE_2D,0,Ue,ie.width,ie.height,0,Ke,Xe,ie.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){he&&Pe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Te,Ue,A[0].width,A[0].height,ie.depth);for(let se=0,P=A.length;se<P;se++)Ee=A[se],v.format!==hn?Ke!==null?he?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,Ee.width,Ee.height,ie.depth,Ke,Ee.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,se,Ue,Ee.width,Ee.height,ie.depth,0,Ee.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):he?t.texSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,Ee.width,Ee.height,ie.depth,Ke,Xe,Ee.data):t.texImage3D(i.TEXTURE_2D_ARRAY,se,Ue,Ee.width,Ee.height,ie.depth,0,Ke,Xe,Ee.data)}else{he&&Pe&&t.texStorage2D(i.TEXTURE_2D,Te,Ue,A[0].width,A[0].height);for(let se=0,P=A.length;se<P;se++)Ee=A[se],v.format!==hn?Ke!==null?he?t.compressedTexSubImage2D(i.TEXTURE_2D,se,0,0,Ee.width,Ee.height,Ke,Ee.data):t.compressedTexImage2D(i.TEXTURE_2D,se,Ue,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):he?t.texSubImage2D(i.TEXTURE_2D,se,0,0,Ee.width,Ee.height,Ke,Xe,Ee.data):t.texImage2D(i.TEXTURE_2D,se,Ue,Ee.width,Ee.height,0,Ke,Xe,Ee.data)}else if(v.isDataArrayTexture)he?(Pe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Te,Ue,ie.width,ie.height,ie.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,Ke,Xe,ie.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ue,ie.width,ie.height,ie.depth,0,Ke,Xe,ie.data);else if(v.isData3DTexture)he?(Pe&&t.texStorage3D(i.TEXTURE_3D,Te,Ue,ie.width,ie.height,ie.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,Ke,Xe,ie.data)):t.texImage3D(i.TEXTURE_3D,0,Ue,ie.width,ie.height,ie.depth,0,Ke,Xe,ie.data);else if(v.isFramebufferTexture){if(Pe)if(he)t.texStorage2D(i.TEXTURE_2D,Te,Ue,ie.width,ie.height);else{let se=ie.width,P=ie.height;for(let C=0;C<Te;C++)t.texImage2D(i.TEXTURE_2D,C,Ue,se,P,0,Ke,Xe,null),se>>=1,P>>=1}}else if(A.length>0&&ct){he&&Pe&&t.texStorage2D(i.TEXTURE_2D,Te,Ue,A[0].width,A[0].height);for(let se=0,P=A.length;se<P;se++)Ee=A[se],he?t.texSubImage2D(i.TEXTURE_2D,se,0,0,Ke,Xe,Ee):t.texImage2D(i.TEXTURE_2D,se,Ue,Ke,Xe,Ee);v.generateMipmaps=!1}else he?(Pe&&t.texStorage2D(i.TEXTURE_2D,Te,Ue,ie.width,ie.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ke,Xe,ie)):t.texImage2D(i.TEXTURE_2D,0,Ue,Ke,Xe,ie);E(v,ct)&&x(ae),Re.__version=ce.version,v.onUpdate&&v.onUpdate(v)}S.__version=v.version}function Se(S,v,W){if(v.image.length!==6)return;const ae=te(S,v),re=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,S.__webglTexture,i.TEXTURE0+W);const ce=n.get(re);if(re.version!==ce.__version||ae===!0){t.activeTexture(i.TEXTURE0+W);const Re=ut.getPrimaries(ut.workingColorSpace),Me=v.colorSpace===sn?null:ut.getPrimaries(v.colorSpace),be=v.colorSpace===sn||Re===Me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const Fe=v.isCompressedTexture||v.image[0].isCompressedTexture,Ye=v.image[0]&&v.image[0].isDataTexture,ie=[];for(let se=0;se<6;se++)!Fe&&!Ye?ie[se]=g(v.image[se],!1,!0,r.maxCubemapSize):ie[se]=Ye?v.image[se].image:v.image[se],ie[se]=Ge(v,ie[se]);const ct=ie[0],Ke=p(ct)||o,Xe=s.convert(v.format,v.colorSpace),Ue=s.convert(v.type),Ee=b(v.internalFormat,Xe,Ue,v.colorSpace),A=o&&v.isVideoTexture!==!0,he=ce.__version===void 0||ae===!0;let Pe=I(v,ct,Ke);z(i.TEXTURE_CUBE_MAP,v,Ke);let Te;if(Fe){A&&he&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Pe,Ee,ct.width,ct.height);for(let se=0;se<6;se++){Te=ie[se].mipmaps;for(let P=0;P<Te.length;P++){const C=Te[P];v.format!==hn?Xe!==null?A?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,P,0,0,C.width,C.height,Xe,C.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,P,Ee,C.width,C.height,0,C.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):A?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,P,0,0,C.width,C.height,Xe,Ue,C.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,P,Ee,C.width,C.height,0,Xe,Ue,C.data)}}}else{Te=v.mipmaps,A&&he&&(Te.length>0&&Pe++,t.texStorage2D(i.TEXTURE_CUBE_MAP,Pe,Ee,ie[0].width,ie[0].height));for(let se=0;se<6;se++)if(Ye){A?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,ie[se].width,ie[se].height,Xe,Ue,ie[se].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Ee,ie[se].width,ie[se].height,0,Xe,Ue,ie[se].data);for(let P=0;P<Te.length;P++){const D=Te[P].image[se].image;A?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,P+1,0,0,D.width,D.height,Xe,Ue,D.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,P+1,Ee,D.width,D.height,0,Xe,Ue,D.data)}}else{A?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Xe,Ue,ie[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Ee,Xe,Ue,ie[se]);for(let P=0;P<Te.length;P++){const C=Te[P];A?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,P+1,0,0,Xe,Ue,C.image[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,P+1,Ee,Xe,Ue,C.image[se])}}}E(v,Ke)&&x(i.TEXTURE_CUBE_MAP),ce.__version=re.version,v.onUpdate&&v.onUpdate(v)}S.__version=v.version}function Le(S,v,W,ae,re,ce){const Re=s.convert(W.format,W.colorSpace),Me=s.convert(W.type),be=b(W.internalFormat,Re,Me,W.colorSpace);if(!n.get(v).__hasExternalTextures){const Ye=Math.max(1,v.width>>ce),ie=Math.max(1,v.height>>ce);re===i.TEXTURE_3D||re===i.TEXTURE_2D_ARRAY?t.texImage3D(re,ce,be,Ye,ie,v.depth,0,Re,Me,null):t.texImage2D(re,ce,be,Ye,ie,0,Re,Me,null)}t.bindFramebuffer(i.FRAMEBUFFER,S),Ae(v)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ae,re,n.get(W).__webglTexture,0,ze(v)):(re===i.TEXTURE_2D||re>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ae,re,n.get(W).__webglTexture,ce),t.bindFramebuffer(i.FRAMEBUFFER,null)}function $e(S,v,W){if(i.bindRenderbuffer(i.RENDERBUFFER,S),v.depthBuffer&&!v.stencilBuffer){let ae=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(W||Ae(v)){const re=v.depthTexture;re&&re.isDepthTexture&&(re.type===Fn?ae=i.DEPTH_COMPONENT32F:re.type===Nn&&(ae=i.DEPTH_COMPONENT24));const ce=ze(v);Ae(v)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ce,ae,v.width,v.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,ce,ae,v.width,v.height)}else i.renderbufferStorage(i.RENDERBUFFER,ae,v.width,v.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,S)}else if(v.depthBuffer&&v.stencilBuffer){const ae=ze(v);W&&Ae(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ae,i.DEPTH24_STENCIL8,v.width,v.height):Ae(v)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ae,i.DEPTH24_STENCIL8,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,S)}else{const ae=v.isWebGLMultipleRenderTargets===!0?v.texture:[v.texture];for(let re=0;re<ae.length;re++){const ce=ae[re],Re=s.convert(ce.format,ce.colorSpace),Me=s.convert(ce.type),be=b(ce.internalFormat,Re,Me,ce.colorSpace),Fe=ze(v);W&&Ae(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Fe,be,v.width,v.height):Ae(v)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Fe,be,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,be,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function je(S,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,S),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),H(v.depthTexture,0);const ae=n.get(v.depthTexture).__webglTexture,re=ze(v);if(v.depthTexture.format===ni)Ae(v)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ae,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ae,0);else if(v.depthTexture.format===Hi)Ae(v)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ae,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ae,0);else throw new Error("Unknown depthTexture format")}function Be(S){const v=n.get(S),W=S.isWebGLCubeRenderTarget===!0;if(S.depthTexture&&!v.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");je(v.__webglFramebuffer,S)}else if(W){v.__webglDepthbuffer=[];for(let ae=0;ae<6;ae++)t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[ae]),v.__webglDepthbuffer[ae]=i.createRenderbuffer(),$e(v.__webglDepthbuffer[ae],S,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer=i.createRenderbuffer(),$e(v.__webglDepthbuffer,S,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function tt(S,v,W){const ae=n.get(S);v!==void 0&&Le(ae.__webglFramebuffer,S,S.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),W!==void 0&&Be(S)}function G(S){const v=S.texture,W=n.get(S),ae=n.get(v);S.addEventListener("dispose",Y),S.isWebGLMultipleRenderTargets!==!0&&(ae.__webglTexture===void 0&&(ae.__webglTexture=i.createTexture()),ae.__version=v.version,a.memory.textures++);const re=S.isWebGLCubeRenderTarget===!0,ce=S.isWebGLMultipleRenderTargets===!0,Re=p(S)||o;if(re){W.__webglFramebuffer=[];for(let Me=0;Me<6;Me++)if(o&&v.mipmaps&&v.mipmaps.length>0){W.__webglFramebuffer[Me]=[];for(let be=0;be<v.mipmaps.length;be++)W.__webglFramebuffer[Me][be]=i.createFramebuffer()}else W.__webglFramebuffer[Me]=i.createFramebuffer()}else{if(o&&v.mipmaps&&v.mipmaps.length>0){W.__webglFramebuffer=[];for(let Me=0;Me<v.mipmaps.length;Me++)W.__webglFramebuffer[Me]=i.createFramebuffer()}else W.__webglFramebuffer=i.createFramebuffer();if(ce)if(r.drawBuffers){const Me=S.texture;for(let be=0,Fe=Me.length;be<Fe;be++){const Ye=n.get(Me[be]);Ye.__webglTexture===void 0&&(Ye.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&S.samples>0&&Ae(S)===!1){const Me=ce?v:[v];W.__webglMultisampledFramebuffer=i.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let be=0;be<Me.length;be++){const Fe=Me[be];W.__webglColorRenderbuffer[be]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,W.__webglColorRenderbuffer[be]);const Ye=s.convert(Fe.format,Fe.colorSpace),ie=s.convert(Fe.type),ct=b(Fe.internalFormat,Ye,ie,Fe.colorSpace,S.isXRRenderTarget===!0),Ke=ze(S);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ke,ct,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,W.__webglColorRenderbuffer[be])}i.bindRenderbuffer(i.RENDERBUFFER,null),S.depthBuffer&&(W.__webglDepthRenderbuffer=i.createRenderbuffer(),$e(W.__webglDepthRenderbuffer,S,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(re){t.bindTexture(i.TEXTURE_CUBE_MAP,ae.__webglTexture),z(i.TEXTURE_CUBE_MAP,v,Re);for(let Me=0;Me<6;Me++)if(o&&v.mipmaps&&v.mipmaps.length>0)for(let be=0;be<v.mipmaps.length;be++)Le(W.__webglFramebuffer[Me][be],S,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,be);else Le(W.__webglFramebuffer[Me],S,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0);E(v,Re)&&x(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ce){const Me=S.texture;for(let be=0,Fe=Me.length;be<Fe;be++){const Ye=Me[be],ie=n.get(Ye);t.bindTexture(i.TEXTURE_2D,ie.__webglTexture),z(i.TEXTURE_2D,Ye,Re),Le(W.__webglFramebuffer,S,Ye,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,0),E(Ye,Re)&&x(i.TEXTURE_2D)}t.unbindTexture()}else{let Me=i.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(o?Me=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(Me,ae.__webglTexture),z(Me,v,Re),o&&v.mipmaps&&v.mipmaps.length>0)for(let be=0;be<v.mipmaps.length;be++)Le(W.__webglFramebuffer[be],S,v,i.COLOR_ATTACHMENT0,Me,be);else Le(W.__webglFramebuffer,S,v,i.COLOR_ATTACHMENT0,Me,0);E(v,Re)&&x(Me),t.unbindTexture()}S.depthBuffer&&Be(S)}function gt(S){const v=p(S)||o,W=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let ae=0,re=W.length;ae<re;ae++){const ce=W[ae];if(E(ce,v)){const Re=S.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Me=n.get(ce).__webglTexture;t.bindTexture(Re,Me),x(Re),t.unbindTexture()}}}function Ie(S){if(o&&S.samples>0&&Ae(S)===!1){const v=S.isWebGLMultipleRenderTargets?S.texture:[S.texture],W=S.width,ae=S.height;let re=i.COLOR_BUFFER_BIT;const ce=[],Re=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=n.get(S),be=S.isWebGLMultipleRenderTargets===!0;if(be)for(let Fe=0;Fe<v.length;Fe++)t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Fe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Fe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let Fe=0;Fe<v.length;Fe++){ce.push(i.COLOR_ATTACHMENT0+Fe),S.depthBuffer&&ce.push(Re);const Ye=Me.__ignoreDepthValues!==void 0?Me.__ignoreDepthValues:!1;if(Ye===!1&&(S.depthBuffer&&(re|=i.DEPTH_BUFFER_BIT),S.stencilBuffer&&(re|=i.STENCIL_BUFFER_BIT)),be&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Me.__webglColorRenderbuffer[Fe]),Ye===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[Re]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[Re])),be){const ie=n.get(v[Fe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ie,0)}i.blitFramebuffer(0,0,W,ae,0,0,W,ae,re,i.NEAREST),l&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ce)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),be)for(let Fe=0;Fe<v.length;Fe++){t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Fe,i.RENDERBUFFER,Me.__webglColorRenderbuffer[Fe]);const Ye=n.get(v[Fe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Fe,i.TEXTURE_2D,Ye,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}}function ze(S){return Math.min(r.maxSamples,S.samples)}function Ae(S){const v=n.get(S);return o&&S.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function ht(S){const v=a.render.frame;u.get(S)!==v&&(u.set(S,v),S.update())}function Ge(S,v){const W=S.colorSpace,ae=S.format,re=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||S.format===no||W!==An&&W!==sn&&(ut.getTransfer(W)===ft?o===!1?e.has("EXT_sRGB")===!0&&ae===hn?(S.format=no,S.minFilter=en,S.generateMipmaps=!1):v=Vc.sRGBToLinear(v):(ae!==hn||re!==kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),v}this.allocateTextureUnit=w,this.resetTextureUnits=k,this.setTexture2D=H,this.setTexture2DArray=J,this.setTexture3D=Z,this.setTextureCube=q,this.rebindTextures=tt,this.setupRenderTarget=G,this.updateRenderTargetMipmap=gt,this.updateMultisampleRenderTarget=Ie,this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=Le,this.useMultisampledRTT=Ae}function Gm(i,e,t){const n=t.isWebGL2;function r(s,a=sn){let o;const c=ut.getTransfer(a);if(s===kn)return i.UNSIGNED_BYTE;if(s===Uc)return i.UNSIGNED_SHORT_4_4_4_4;if(s===Nc)return i.UNSIGNED_SHORT_5_5_5_1;if(s===uu)return i.BYTE;if(s===hu)return i.SHORT;if(s===ho)return i.UNSIGNED_SHORT;if(s===Ic)return i.INT;if(s===Nn)return i.UNSIGNED_INT;if(s===Fn)return i.FLOAT;if(s===dr)return n?i.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===du)return i.ALPHA;if(s===hn)return i.RGBA;if(s===fu)return i.LUMINANCE;if(s===pu)return i.LUMINANCE_ALPHA;if(s===ni)return i.DEPTH_COMPONENT;if(s===Hi)return i.DEPTH_STENCIL;if(s===no)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===mu)return i.RED;if(s===Fc)return i.RED_INTEGER;if(s===gu)return i.RG;if(s===Oc)return i.RG_INTEGER;if(s===Bc)return i.RGBA_INTEGER;if(s===_s||s===vs||s===xs||s===Ms)if(c===ft)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===_s)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===vs)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===xs)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Ms)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===_s)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===vs)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===xs)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Ms)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===zo||s===ko||s===Ho||s===Go)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===zo)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===ko)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Ho)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Go)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===zc)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Wo||s===Vo)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===Wo)return c===ft?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Vo)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Xo||s===$o||s===jo||s===qo||s===Yo||s===Ko||s===Zo||s===Jo||s===Qo||s===ea||s===ta||s===na||s===ia||s===ra)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Xo)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===$o)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===jo)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===qo)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Yo)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Ko)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Zo)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Jo)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Qo)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===ea)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===ta)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===na)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===ia)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===ra)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===ys||s===sa||s===oa)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===ys)return c===ft?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===sa)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===oa)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===_u||s===aa||s===ca||s===la)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===ys)return o.COMPRESSED_RED_RGTC1_EXT;if(s===aa)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===ca)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===la)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===ti?n?i.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[s]!==void 0?i[s]:null}return{convert:r}}class Wm extends nn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class kr extends Et{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Vm={type:"move"};class Vs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new kr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new kr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new kr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const g of e.hand.values()){const p=t.getJointPose(g,n),h=this._getHandJoint(l,g);p!==null&&(h.matrix.fromArray(p.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=p.radius),h.visible=p!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=u.position.distanceTo(f.position),m=.02,_=.005;l.inputState.pinching&&d>m+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=m-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Vm)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new kr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Xm extends ci{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,f=null,d=null,m=null,_=null;const g=t.getContextAttributes();let p=null,h=null;const E=[],x=[],b=new ke;let I=null;const L=new nn;L.layers.enable(1),L.viewport=new Pt;const R=new nn;R.layers.enable(2),R.viewport=new Pt;const Y=[L,R],M=new Wm;M.layers.enable(1),M.layers.enable(2);let T=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let te=E[z];return te===void 0&&(te=new Vs,E[z]=te),te.getTargetRaySpace()},this.getControllerGrip=function(z){let te=E[z];return te===void 0&&(te=new Vs,E[z]=te),te.getGripSpace()},this.getHand=function(z){let te=E[z];return te===void 0&&(te=new Vs,E[z]=te),te.getHandSpace()};function U(z){const te=x.indexOf(z.inputSource);if(te===-1)return;const xe=E[te];xe!==void 0&&(xe.update(z.inputSource,z.frame,l||a),xe.dispatchEvent({type:z.type,data:z.inputSource}))}function k(){r.removeEventListener("select",U),r.removeEventListener("selectstart",U),r.removeEventListener("selectend",U),r.removeEventListener("squeeze",U),r.removeEventListener("squeezestart",U),r.removeEventListener("squeezeend",U),r.removeEventListener("end",k),r.removeEventListener("inputsourceschange",w);for(let z=0;z<E.length;z++){const te=x[z];te!==null&&(x[z]=null,E[z].disconnect(te))}T=null,F=null,e.setRenderTarget(p),m=null,d=null,f=null,r=null,h=null,me.stop(),n.isPresenting=!1,e.setPixelRatio(I),e.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){s=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){o=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(z){l=z},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(z){if(r=z,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",U),r.addEventListener("selectstart",U),r.addEventListener("selectend",U),r.addEventListener("squeeze",U),r.addEventListener("squeezestart",U),r.addEventListener("squeezeend",U),r.addEventListener("end",k),r.addEventListener("inputsourceschange",w),g.xrCompatible!==!0&&await t.makeXRCompatible(),I=e.getPixelRatio(),e.getSize(b),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const te={antialias:r.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,te),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),h=new si(m.framebufferWidth,m.framebufferHeight,{format:hn,type:kn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let te=null,xe=null,Se=null;g.depth&&(Se=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=g.stencil?Hi:ni,xe=g.stencil?ti:Nn);const Le={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:s};f=new XRWebGLBinding(r,t),d=f.createProjectionLayer(Le),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),h=new si(d.textureWidth,d.textureHeight,{format:hn,type:kn,depthTexture:new tl(d.textureWidth,d.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0});const $e=e.properties.get(h);$e.__ignoreDepthValues=d.ignoreDepthValues}h.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),me.setContext(r),me.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function w(z){for(let te=0;te<z.removed.length;te++){const xe=z.removed[te],Se=x.indexOf(xe);Se>=0&&(x[Se]=null,E[Se].disconnect(xe))}for(let te=0;te<z.added.length;te++){const xe=z.added[te];let Se=x.indexOf(xe);if(Se===-1){for(let $e=0;$e<E.length;$e++)if($e>=x.length){x.push(xe),Se=$e;break}else if(x[$e]===null){x[$e]=xe,Se=$e;break}if(Se===-1)break}const Le=E[Se];Le&&Le.connect(xe)}}const B=new N,H=new N;function J(z,te,xe){B.setFromMatrixPosition(te.matrixWorld),H.setFromMatrixPosition(xe.matrixWorld);const Se=B.distanceTo(H),Le=te.projectionMatrix.elements,$e=xe.projectionMatrix.elements,je=Le[14]/(Le[10]-1),Be=Le[14]/(Le[10]+1),tt=(Le[9]+1)/Le[5],G=(Le[9]-1)/Le[5],gt=(Le[8]-1)/Le[0],Ie=($e[8]+1)/$e[0],ze=je*gt,Ae=je*Ie,ht=Se/(-gt+Ie),Ge=ht*-gt;te.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(Ge),z.translateZ(ht),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert();const S=je+ht,v=Be+ht,W=ze-Ge,ae=Ae+(Se-Ge),re=tt*Be/v*S,ce=G*Be/v*S;z.projectionMatrix.makePerspective(W,ae,re,ce,S,v),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}function Z(z,te){te===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(te.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(r===null)return;M.near=R.near=L.near=z.near,M.far=R.far=L.far=z.far,(T!==M.near||F!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),T=M.near,F=M.far);const te=z.parent,xe=M.cameras;Z(M,te);for(let Se=0;Se<xe.length;Se++)Z(xe[Se],te);xe.length===2?J(M,L,R):M.projectionMatrix.copy(L.projectionMatrix),q(z,M,te)};function q(z,te,xe){xe===null?z.matrix.copy(te.matrixWorld):(z.matrix.copy(xe.matrixWorld),z.matrix.invert(),z.matrix.multiply(te.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(te.projectionMatrix),z.projectionMatrixInverse.copy(te.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=fr*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&m===null))return c},this.setFoveation=function(z){c=z,d!==null&&(d.fixedFoveation=z),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=z)};let ee=null;function oe(z,te){if(u=te.getViewerPose(l||a),_=te,u!==null){const xe=u.views;m!==null&&(e.setRenderTargetFramebuffer(h,m.framebuffer),e.setRenderTarget(h));let Se=!1;xe.length!==M.cameras.length&&(M.cameras.length=0,Se=!0);for(let Le=0;Le<xe.length;Le++){const $e=xe[Le];let je=null;if(m!==null)je=m.getViewport($e);else{const tt=f.getViewSubImage(d,$e);je=tt.viewport,Le===0&&(e.setRenderTargetTextures(h,tt.colorTexture,d.ignoreDepthValues?void 0:tt.depthStencilTexture),e.setRenderTarget(h))}let Be=Y[Le];Be===void 0&&(Be=new nn,Be.layers.enable(Le),Be.viewport=new Pt,Y[Le]=Be),Be.matrix.fromArray($e.transform.matrix),Be.matrix.decompose(Be.position,Be.quaternion,Be.scale),Be.projectionMatrix.fromArray($e.projectionMatrix),Be.projectionMatrixInverse.copy(Be.projectionMatrix).invert(),Be.viewport.set(je.x,je.y,je.width,je.height),Le===0&&(M.matrix.copy(Be.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),Se===!0&&M.cameras.push(Be)}}for(let xe=0;xe<E.length;xe++){const Se=x[xe],Le=E[xe];Se!==null&&Le!==void 0&&Le.update(Se,te,l||a)}ee&&ee(z,te),te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:te}),_=null}const me=new Qc;me.setAnimationLoop(oe),this.setAnimationLoop=function(z){ee=z},this.dispose=function(){}}}function $m(i,e){function t(p,h){p.matrixAutoUpdate===!0&&p.updateMatrix(),h.value.copy(p.matrix)}function n(p,h){h.color.getRGB(p.fogColor.value,Kc(i)),h.isFog?(p.fogNear.value=h.near,p.fogFar.value=h.far):h.isFogExp2&&(p.fogDensity.value=h.density)}function r(p,h,E,x,b){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(p,h):h.isMeshToonMaterial?(s(p,h),f(p,h)):h.isMeshPhongMaterial?(s(p,h),u(p,h)):h.isMeshStandardMaterial?(s(p,h),d(p,h),h.isMeshPhysicalMaterial&&m(p,h,b)):h.isMeshMatcapMaterial?(s(p,h),_(p,h)):h.isMeshDepthMaterial?s(p,h):h.isMeshDistanceMaterial?(s(p,h),g(p,h)):h.isMeshNormalMaterial?s(p,h):h.isLineBasicMaterial?(a(p,h),h.isLineDashedMaterial&&o(p,h)):h.isPointsMaterial?c(p,h,E,x):h.isSpriteMaterial?l(p,h):h.isShadowMaterial?(p.color.value.copy(h.color),p.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(p,h){p.opacity.value=h.opacity,h.color&&p.diffuse.value.copy(h.color),h.emissive&&p.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.bumpMap&&(p.bumpMap.value=h.bumpMap,t(h.bumpMap,p.bumpMapTransform),p.bumpScale.value=h.bumpScale,h.side===Wt&&(p.bumpScale.value*=-1)),h.normalMap&&(p.normalMap.value=h.normalMap,t(h.normalMap,p.normalMapTransform),p.normalScale.value.copy(h.normalScale),h.side===Wt&&p.normalScale.value.negate()),h.displacementMap&&(p.displacementMap.value=h.displacementMap,t(h.displacementMap,p.displacementMapTransform),p.displacementScale.value=h.displacementScale,p.displacementBias.value=h.displacementBias),h.emissiveMap&&(p.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,p.emissiveMapTransform)),h.specularMap&&(p.specularMap.value=h.specularMap,t(h.specularMap,p.specularMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest);const E=e.get(h).envMap;if(E&&(p.envMap.value=E,p.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=h.reflectivity,p.ior.value=h.ior,p.refractionRatio.value=h.refractionRatio),h.lightMap){p.lightMap.value=h.lightMap;const x=i._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=h.lightMapIntensity*x,t(h.lightMap,p.lightMapTransform)}h.aoMap&&(p.aoMap.value=h.aoMap,p.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,p.aoMapTransform))}function a(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform))}function o(p,h){p.dashSize.value=h.dashSize,p.totalSize.value=h.dashSize+h.gapSize,p.scale.value=h.scale}function c(p,h,E,x){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.size.value=h.size*E,p.scale.value=x*.5,h.map&&(p.map.value=h.map,t(h.map,p.uvTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function l(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.rotation.value=h.rotation,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function u(p,h){p.specular.value.copy(h.specular),p.shininess.value=Math.max(h.shininess,1e-4)}function f(p,h){h.gradientMap&&(p.gradientMap.value=h.gradientMap)}function d(p,h){p.metalness.value=h.metalness,h.metalnessMap&&(p.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,p.metalnessMapTransform)),p.roughness.value=h.roughness,h.roughnessMap&&(p.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,p.roughnessMapTransform)),e.get(h).envMap&&(p.envMapIntensity.value=h.envMapIntensity)}function m(p,h,E){p.ior.value=h.ior,h.sheen>0&&(p.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),p.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(p.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,p.sheenColorMapTransform)),h.sheenRoughnessMap&&(p.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,p.sheenRoughnessMapTransform))),h.clearcoat>0&&(p.clearcoat.value=h.clearcoat,p.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(p.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,p.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(p.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Wt&&p.clearcoatNormalScale.value.negate())),h.iridescence>0&&(p.iridescence.value=h.iridescence,p.iridescenceIOR.value=h.iridescenceIOR,p.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(p.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,p.iridescenceMapTransform)),h.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),h.transmission>0&&(p.transmission.value=h.transmission,p.transmissionSamplerMap.value=E.texture,p.transmissionSamplerSize.value.set(E.width,E.height),h.transmissionMap&&(p.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,p.transmissionMapTransform)),p.thickness.value=h.thickness,h.thicknessMap&&(p.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=h.attenuationDistance,p.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(p.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(p.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=h.specularIntensity,p.specularColor.value.copy(h.specularColor),h.specularColorMap&&(p.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,p.specularColorMapTransform)),h.specularIntensityMap&&(p.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,h){h.matcap&&(p.matcap.value=h.matcap)}function g(p,h){const E=e.get(h).light;p.referencePosition.value.setFromMatrixPosition(E.matrixWorld),p.nearDistance.value=E.shadow.camera.near,p.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function jm(i,e,t,n){let r={},s={},a=[];const o=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(E,x){const b=x.program;n.uniformBlockBinding(E,b)}function l(E,x){let b=r[E.id];b===void 0&&(_(E),b=u(E),r[E.id]=b,E.addEventListener("dispose",p));const I=x.program;n.updateUBOMapping(E,I);const L=e.render.frame;s[E.id]!==L&&(d(E),s[E.id]=L)}function u(E){const x=f();E.__bindingPointIndex=x;const b=i.createBuffer(),I=E.__size,L=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,I,L),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,b),b}function f(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){const x=r[E.id],b=E.uniforms,I=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let L=0,R=b.length;L<R;L++){const Y=Array.isArray(b[L])?b[L]:[b[L]];for(let M=0,T=Y.length;M<T;M++){const F=Y[M];if(m(F,L,M,I)===!0){const U=F.__offset,k=Array.isArray(F.value)?F.value:[F.value];let w=0;for(let B=0;B<k.length;B++){const H=k[B],J=g(H);typeof H=="number"||typeof H=="boolean"?(F.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,U+w,F.__data)):H.isMatrix3?(F.__data[0]=H.elements[0],F.__data[1]=H.elements[1],F.__data[2]=H.elements[2],F.__data[3]=0,F.__data[4]=H.elements[3],F.__data[5]=H.elements[4],F.__data[6]=H.elements[5],F.__data[7]=0,F.__data[8]=H.elements[6],F.__data[9]=H.elements[7],F.__data[10]=H.elements[8],F.__data[11]=0):(H.toArray(F.__data,w),w+=J.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,F.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(E,x,b,I){const L=E.value,R=x+"_"+b;if(I[R]===void 0)return typeof L=="number"||typeof L=="boolean"?I[R]=L:I[R]=L.clone(),!0;{const Y=I[R];if(typeof L=="number"||typeof L=="boolean"){if(Y!==L)return I[R]=L,!0}else if(Y.equals(L)===!1)return Y.copy(L),!0}return!1}function _(E){const x=E.uniforms;let b=0;const I=16;for(let R=0,Y=x.length;R<Y;R++){const M=Array.isArray(x[R])?x[R]:[x[R]];for(let T=0,F=M.length;T<F;T++){const U=M[T],k=Array.isArray(U.value)?U.value:[U.value];for(let w=0,B=k.length;w<B;w++){const H=k[w],J=g(H),Z=b%I;Z!==0&&I-Z<J.boundary&&(b+=I-Z),U.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=b,b+=J.storage}}}const L=b%I;return L>0&&(b+=I-L),E.__size=b,E.__cache={},this}function g(E){const x={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(x.boundary=4,x.storage=4):E.isVector2?(x.boundary=8,x.storage=8):E.isVector3||E.isColor?(x.boundary=16,x.storage=12):E.isVector4?(x.boundary=16,x.storage=16):E.isMatrix3?(x.boundary=48,x.storage=48):E.isMatrix4?(x.boundary=64,x.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),x}function p(E){const x=E.target;x.removeEventListener("dispose",p);const b=a.indexOf(x.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function h(){for(const E in r)i.deleteBuffer(r[E]);a=[],r={},s={}}return{bind:c,update:l,dispose:h}}class al{constructor(e={}){const{canvas:t=Gu(),context:n=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=a;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const h=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ct,this._useLegacyLights=!1,this.toneMapping=zn,this.toneMappingExposure=1;const x=this;let b=!1,I=0,L=0,R=null,Y=-1,M=null;const T=new Pt,F=new Pt;let U=null;const k=new it(0);let w=0,B=t.width,H=t.height,J=1,Z=null,q=null;const ee=new Pt(0,0,B,H),oe=new Pt(0,0,B,H);let me=!1;const z=new _o;let te=!1,xe=!1,Se=null;const Le=new vt,$e=new ke,je=new N,Be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function tt(){return R===null?J:1}let G=n;function gt(y,O){for(let V=0;V<y.length;V++){const $=y[V],X=t.getContext($,O);if(X!==null)return X}return null}try{const y={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${uo}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",P,!1),t.addEventListener("webglcontextcreationerror",C,!1),G===null){const O=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&O.shift(),G=gt(O,y),G===null)throw gt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&G instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),G.getShaderPrecisionFormat===void 0&&(G.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Ie,ze,Ae,ht,Ge,S,v,W,ae,re,ce,Re,Me,be,Fe,Ye,ie,ct,Ke,Xe,Ue,Ee,A,he;function Pe(){Ie=new ip(G),ze=new Zf(G,Ie,e),Ie.init(ze),Ee=new Gm(G,Ie,ze),Ae=new km(G,Ie,ze),ht=new op(G),Ge=new wm,S=new Hm(G,Ie,Ae,Ge,ze,Ee,ht),v=new Qf(x),W=new np(x),ae=new fh(G,ze),A=new Yf(G,Ie,ae,ze),re=new rp(G,ae,ht,A),ce=new up(G,re,ae,ht),Ke=new lp(G,ze,S),Ye=new Jf(Ge),Re=new Tm(x,v,W,Ie,ze,A,Ye),Me=new $m(x,Ge),be=new Rm,Fe=new Um(Ie,ze),ct=new qf(x,v,W,Ae,ce,d,c),ie=new zm(x,ce,ze),he=new jm(G,ht,ze,Ae),Xe=new Kf(G,Ie,ht,ze),Ue=new sp(G,Ie,ht,ze),ht.programs=Re.programs,x.capabilities=ze,x.extensions=Ie,x.properties=Ge,x.renderLists=be,x.shadowMap=ie,x.state=Ae,x.info=ht}Pe();const Te=new Xm(x,G);this.xr=Te,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const y=Ie.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Ie.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(y){y!==void 0&&(J=y,this.setSize(B,H,!1))},this.getSize=function(y){return y.set(B,H)},this.setSize=function(y,O,V=!0){if(Te.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=y,H=O,t.width=Math.floor(y*J),t.height=Math.floor(O*J),V===!0&&(t.style.width=y+"px",t.style.height=O+"px"),this.setViewport(0,0,y,O)},this.getDrawingBufferSize=function(y){return y.set(B*J,H*J).floor()},this.setDrawingBufferSize=function(y,O,V){B=y,H=O,J=V,t.width=Math.floor(y*V),t.height=Math.floor(O*V),this.setViewport(0,0,y,O)},this.getCurrentViewport=function(y){return y.copy(T)},this.getViewport=function(y){return y.copy(ee)},this.setViewport=function(y,O,V,$){y.isVector4?ee.set(y.x,y.y,y.z,y.w):ee.set(y,O,V,$),Ae.viewport(T.copy(ee).multiplyScalar(J).floor())},this.getScissor=function(y){return y.copy(oe)},this.setScissor=function(y,O,V,$){y.isVector4?oe.set(y.x,y.y,y.z,y.w):oe.set(y,O,V,$),Ae.scissor(F.copy(oe).multiplyScalar(J).floor())},this.getScissorTest=function(){return me},this.setScissorTest=function(y){Ae.setScissorTest(me=y)},this.setOpaqueSort=function(y){Z=y},this.setTransparentSort=function(y){q=y},this.getClearColor=function(y){return y.copy(ct.getClearColor())},this.setClearColor=function(){ct.setClearColor.apply(ct,arguments)},this.getClearAlpha=function(){return ct.getClearAlpha()},this.setClearAlpha=function(){ct.setClearAlpha.apply(ct,arguments)},this.clear=function(y=!0,O=!0,V=!0){let $=0;if(y){let X=!1;if(R!==null){const ye=R.texture.format;X=ye===Bc||ye===Oc||ye===Fc}if(X){const ye=R.texture.type,Ne=ye===kn||ye===Nn||ye===ho||ye===ti||ye===Uc||ye===Nc,We=ct.getClearColor(),qe=ct.getClearAlpha(),nt=We.r,Ze=We.g,Qe=We.b;Ne?(m[0]=nt,m[1]=Ze,m[2]=Qe,m[3]=qe,G.clearBufferuiv(G.COLOR,0,m)):(_[0]=nt,_[1]=Ze,_[2]=Qe,_[3]=qe,G.clearBufferiv(G.COLOR,0,_))}else $|=G.COLOR_BUFFER_BIT}O&&($|=G.DEPTH_BUFFER_BIT),V&&($|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",P,!1),t.removeEventListener("webglcontextcreationerror",C,!1),be.dispose(),Fe.dispose(),Ge.dispose(),v.dispose(),W.dispose(),ce.dispose(),A.dispose(),he.dispose(),Re.dispose(),Te.dispose(),Te.removeEventListener("sessionstart",we),Te.removeEventListener("sessionend",de),Se&&(Se.dispose(),Se=null),De.stop()};function se(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function P(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const y=ht.autoReset,O=ie.enabled,V=ie.autoUpdate,$=ie.needsUpdate,X=ie.type;Pe(),ht.autoReset=y,ie.enabled=O,ie.autoUpdate=V,ie.needsUpdate=$,ie.type=X}function C(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function D(y){const O=y.target;O.removeEventListener("dispose",D),K(O)}function K(y){Q(y),Ge.remove(y)}function Q(y){const O=Ge.get(y).programs;O!==void 0&&(O.forEach(function(V){Re.releaseProgram(V)}),y.isShaderMaterial&&Re.releaseShaderCache(y))}this.renderBufferDirect=function(y,O,V,$,X,ye){O===null&&(O=Be);const Ne=X.isMesh&&X.matrixWorld.determinant()<0,We=wt(y,O,V,$,X);Ae.setMaterial($,Ne);let qe=V.index,nt=1;if($.wireframe===!0){if(qe=re.getWireframeAttribute(V),qe===void 0)return;nt=2}const Ze=V.drawRange,Qe=V.attributes.position;let xt=Ze.start*nt,$t=(Ze.start+Ze.count)*nt;ye!==null&&(xt=Math.max(xt,ye.start*nt),$t=Math.min($t,(ye.start+ye.count)*nt)),qe!==null?(xt=Math.max(xt,0),$t=Math.min($t,qe.count)):Qe!=null&&(xt=Math.max(xt,0),$t=Math.min($t,Qe.count));const At=$t-xt;if(At<0||At===1/0)return;A.setup(X,$,We,V,qe);let gn,pt=Xe;if(qe!==null&&(gn=ae.get(qe),pt=Ue,pt.setIndex(gn)),X.isMesh)$.wireframe===!0?(Ae.setLineWidth($.wireframeLinewidth*tt()),pt.setMode(G.LINES)):pt.setMode(G.TRIANGLES);else if(X.isLine){let rt=$.linewidth;rt===void 0&&(rt=1),Ae.setLineWidth(rt*tt()),X.isLineSegments?pt.setMode(G.LINES):X.isLineLoop?pt.setMode(G.LINE_LOOP):pt.setMode(G.LINE_STRIP)}else X.isPoints?pt.setMode(G.POINTS):X.isSprite&&pt.setMode(G.TRIANGLES);if(X.isBatchedMesh)pt.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else if(X.isInstancedMesh)pt.renderInstances(xt,At,X.count);else if(V.isInstancedBufferGeometry){const rt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,ds=Math.min(V.instanceCount,rt);pt.renderInstances(xt,At,ds)}else pt.render(xt,At)};function ue(y,O,V){y.transparent===!0&&y.side===Sn&&y.forceSinglePass===!1?(y.side=Wt,y.needsUpdate=!0,dt(y,O,V),y.side=Hn,y.needsUpdate=!0,dt(y,O,V),y.side=Sn):dt(y,O,V)}this.compile=function(y,O,V=null){V===null&&(V=y),p=Fe.get(V),p.init(),E.push(p),V.traverseVisible(function(X){X.isLight&&X.layers.test(O.layers)&&(p.pushLight(X),X.castShadow&&p.pushShadow(X))}),y!==V&&y.traverseVisible(function(X){X.isLight&&X.layers.test(O.layers)&&(p.pushLight(X),X.castShadow&&p.pushShadow(X))}),p.setupLights(x._useLegacyLights);const $=new Set;return y.traverse(function(X){const ye=X.material;if(ye)if(Array.isArray(ye))for(let Ne=0;Ne<ye.length;Ne++){const We=ye[Ne];ue(We,V,X),$.add(We)}else ue(ye,V,X),$.add(ye)}),E.pop(),p=null,$},this.compileAsync=function(y,O,V=null){const $=this.compile(y,O,V);return new Promise(X=>{function ye(){if($.forEach(function(Ne){Ge.get(Ne).currentProgram.isReady()&&$.delete(Ne)}),$.size===0){X(y);return}setTimeout(ye,10)}Ie.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let fe=null;function pe(y){fe&&fe(y)}function we(){De.stop()}function de(){De.start()}const De=new Qc;De.setAnimationLoop(pe),typeof self<"u"&&De.setContext(self),this.setAnimationLoop=function(y){fe=y,Te.setAnimationLoop(y),y===null?De.stop():De.start()},Te.addEventListener("sessionstart",we),Te.addEventListener("sessionend",de),this.render=function(y,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Te.enabled===!0&&Te.isPresenting===!0&&(Te.cameraAutoUpdate===!0&&Te.updateCamera(O),O=Te.getCamera()),y.isScene===!0&&y.onBeforeRender(x,y,O,R),p=Fe.get(y,E.length),p.init(),E.push(p),Le.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),z.setFromProjectionMatrix(Le),xe=this.localClippingEnabled,te=Ye.init(this.clippingPlanes,xe),g=be.get(y,h.length),g.init(),h.push(g),Oe(y,O,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(Z,q),this.info.render.frame++,te===!0&&Ye.beginShadows();const V=p.state.shadowsArray;if(ie.render(V,y,O),te===!0&&Ye.endShadows(),this.info.autoReset===!0&&this.info.reset(),ct.render(g,y),p.setupLights(x._useLegacyLights),O.isArrayCamera){const $=O.cameras;for(let X=0,ye=$.length;X<ye;X++){const Ne=$[X];ge(g,y,Ne,Ne.viewport)}}else ge(g,y,O);R!==null&&(S.updateMultisampleRenderTarget(R),S.updateRenderTargetMipmap(R)),y.isScene===!0&&y.onAfterRender(x,y,O),A.resetDefaultState(),Y=-1,M=null,E.pop(),E.length>0?p=E[E.length-1]:p=null,h.pop(),h.length>0?g=h[h.length-1]:g=null};function Oe(y,O,V,$){if(y.visible===!1)return;if(y.layers.test(O.layers)){if(y.isGroup)V=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(O);else if(y.isLight)p.pushLight(y),y.castShadow&&p.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||z.intersectsSprite(y)){$&&je.setFromMatrixPosition(y.matrixWorld).applyMatrix4(Le);const Ne=ce.update(y),We=y.material;We.visible&&g.push(y,Ne,We,V,je.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||z.intersectsObject(y))){const Ne=ce.update(y),We=y.material;if($&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),je.copy(y.boundingSphere.center)):(Ne.boundingSphere===null&&Ne.computeBoundingSphere(),je.copy(Ne.boundingSphere.center)),je.applyMatrix4(y.matrixWorld).applyMatrix4(Le)),Array.isArray(We)){const qe=Ne.groups;for(let nt=0,Ze=qe.length;nt<Ze;nt++){const Qe=qe[nt],xt=We[Qe.materialIndex];xt&&xt.visible&&g.push(y,Ne,xt,V,je.z,Qe)}}else We.visible&&g.push(y,Ne,We,V,je.z,null)}}const ye=y.children;for(let Ne=0,We=ye.length;Ne<We;Ne++)Oe(ye[Ne],O,V,$)}function ge(y,O,V,$){const X=y.opaque,ye=y.transmissive,Ne=y.transparent;p.setupLightsView(V),te===!0&&Ye.setGlobalState(x.clippingPlanes,V),ye.length>0&&He(X,ye,O,V),$&&Ae.viewport(T.copy($)),X.length>0&&Ce(X,O,V),ye.length>0&&Ce(ye,O,V),Ne.length>0&&Ce(Ne,O,V),Ae.buffers.depth.setTest(!0),Ae.buffers.depth.setMask(!0),Ae.buffers.color.setMask(!0),Ae.setPolygonOffset(!1)}function He(y,O,V,$){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;const ye=ze.isWebGL2;Se===null&&(Se=new si(1,1,{generateMipmaps:!0,type:Ie.has("EXT_color_buffer_half_float")?dr:kn,minFilter:hr,samples:ye?4:0})),x.getDrawingBufferSize($e),ye?Se.setSize($e.x,$e.y):Se.setSize(ns($e.x),ns($e.y));const Ne=x.getRenderTarget();x.setRenderTarget(Se),x.getClearColor(k),w=x.getClearAlpha(),w<1&&x.setClearColor(16777215,.5),x.clear();const We=x.toneMapping;x.toneMapping=zn,Ce(y,V,$),S.updateMultisampleRenderTarget(Se),S.updateRenderTargetMipmap(Se);let qe=!1;for(let nt=0,Ze=O.length;nt<Ze;nt++){const Qe=O[nt],xt=Qe.object,$t=Qe.geometry,At=Qe.material,gn=Qe.group;if(At.side===Sn&&xt.layers.test($.layers)){const pt=At.side;At.side=Wt,At.needsUpdate=!0,at(xt,V,$,$t,At,gn),At.side=pt,At.needsUpdate=!0,qe=!0}}qe===!0&&(S.updateMultisampleRenderTarget(Se),S.updateRenderTargetMipmap(Se)),x.setRenderTarget(Ne),x.setClearColor(k,w),x.toneMapping=We}function Ce(y,O,V){const $=O.isScene===!0?O.overrideMaterial:null;for(let X=0,ye=y.length;X<ye;X++){const Ne=y[X],We=Ne.object,qe=Ne.geometry,nt=$===null?Ne.material:$,Ze=Ne.group;We.layers.test(V.layers)&&at(We,O,V,qe,nt,Ze)}}function at(y,O,V,$,X,ye){y.onBeforeRender(x,O,V,$,X,ye),y.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),X.onBeforeRender(x,O,V,$,y,ye),X.transparent===!0&&X.side===Sn&&X.forceSinglePass===!1?(X.side=Wt,X.needsUpdate=!0,x.renderBufferDirect(V,O,$,X,y,ye),X.side=Hn,X.needsUpdate=!0,x.renderBufferDirect(V,O,$,X,y,ye),X.side=Sn):x.renderBufferDirect(V,O,$,X,y,ye),y.onAfterRender(x,O,V,$,X,ye)}function dt(y,O,V){O.isScene!==!0&&(O=Be);const $=Ge.get(y),X=p.state.lights,ye=p.state.shadowsArray,Ne=X.state.version,We=Re.getParameters(y,X.state,ye,O,V),qe=Re.getProgramCacheKey(We);let nt=$.programs;$.environment=y.isMeshStandardMaterial?O.environment:null,$.fog=O.fog,$.envMap=(y.isMeshStandardMaterial?W:v).get(y.envMap||$.environment),nt===void 0&&(y.addEventListener("dispose",D),nt=new Map,$.programs=nt);let Ze=nt.get(qe);if(Ze!==void 0){if($.currentProgram===Ze&&$.lightsStateVersion===Ne)return Mt(y,We),Ze}else We.uniforms=Re.getUniforms(y),y.onBuild(V,We,x),y.onBeforeCompile(We,x),Ze=Re.acquireProgram(We,qe),nt.set(qe,Ze),$.uniforms=We.uniforms;const Qe=$.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Qe.clippingPlanes=Ye.uniform),Mt(y,We),$.needsLights=It(y),$.lightsStateVersion=Ne,$.needsLights&&(Qe.ambientLightColor.value=X.state.ambient,Qe.lightProbe.value=X.state.probe,Qe.directionalLights.value=X.state.directional,Qe.directionalLightShadows.value=X.state.directionalShadow,Qe.spotLights.value=X.state.spot,Qe.spotLightShadows.value=X.state.spotShadow,Qe.rectAreaLights.value=X.state.rectArea,Qe.ltc_1.value=X.state.rectAreaLTC1,Qe.ltc_2.value=X.state.rectAreaLTC2,Qe.pointLights.value=X.state.point,Qe.pointLightShadows.value=X.state.pointShadow,Qe.hemisphereLights.value=X.state.hemi,Qe.directionalShadowMap.value=X.state.directionalShadowMap,Qe.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Qe.spotShadowMap.value=X.state.spotShadowMap,Qe.spotLightMatrix.value=X.state.spotLightMatrix,Qe.spotLightMap.value=X.state.spotLightMap,Qe.pointShadowMap.value=X.state.pointShadowMap,Qe.pointShadowMatrix.value=X.state.pointShadowMatrix),$.currentProgram=Ze,$.uniformsList=null,Ze}function St(y){if(y.uniformsList===null){const O=y.currentProgram.getUniforms();y.uniformsList=Yr.seqWithValue(O.seq,y.uniforms)}return y.uniformsList}function Mt(y,O){const V=Ge.get(y);V.outputColorSpace=O.outputColorSpace,V.batching=O.batching,V.instancing=O.instancing,V.instancingColor=O.instancingColor,V.skinning=O.skinning,V.morphTargets=O.morphTargets,V.morphNormals=O.morphNormals,V.morphColors=O.morphColors,V.morphTargetsCount=O.morphTargetsCount,V.numClippingPlanes=O.numClippingPlanes,V.numIntersection=O.numClipIntersection,V.vertexAlphas=O.vertexAlphas,V.vertexTangents=O.vertexTangents,V.toneMapping=O.toneMapping}function wt(y,O,V,$,X){O.isScene!==!0&&(O=Be),S.resetTextureUnits();const ye=O.fog,Ne=$.isMeshStandardMaterial?O.environment:null,We=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:An,qe=($.isMeshStandardMaterial?W:v).get($.envMap||Ne),nt=$.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Ze=!!V.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Qe=!!V.morphAttributes.position,xt=!!V.morphAttributes.normal,$t=!!V.morphAttributes.color;let At=zn;$.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(At=x.toneMapping);const gn=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,pt=gn!==void 0?gn.length:0,rt=Ge.get($),ds=p.state.lights;if(te===!0&&(xe===!0||y!==M)){const Jt=y===M&&$.id===Y;Ye.setState($,y,Jt)}let _t=!1;$.version===rt.__version?(rt.needsLights&&rt.lightsStateVersion!==ds.state.version||rt.outputColorSpace!==We||X.isBatchedMesh&&rt.batching===!1||!X.isBatchedMesh&&rt.batching===!0||X.isInstancedMesh&&rt.instancing===!1||!X.isInstancedMesh&&rt.instancing===!0||X.isSkinnedMesh&&rt.skinning===!1||!X.isSkinnedMesh&&rt.skinning===!0||X.isInstancedMesh&&rt.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&rt.instancingColor===!1&&X.instanceColor!==null||rt.envMap!==qe||$.fog===!0&&rt.fog!==ye||rt.numClippingPlanes!==void 0&&(rt.numClippingPlanes!==Ye.numPlanes||rt.numIntersection!==Ye.numIntersection)||rt.vertexAlphas!==nt||rt.vertexTangents!==Ze||rt.morphTargets!==Qe||rt.morphNormals!==xt||rt.morphColors!==$t||rt.toneMapping!==At||ze.isWebGL2===!0&&rt.morphTargetsCount!==pt)&&(_t=!0):(_t=!0,rt.__version=$.version);let Vn=rt.currentProgram;_t===!0&&(Vn=dt($,O,X));let Lo=!1,ji=!1,fs=!1;const Ut=Vn.getUniforms(),Xn=rt.uniforms;if(Ae.useProgram(Vn.program)&&(Lo=!0,ji=!0,fs=!0),$.id!==Y&&(Y=$.id,ji=!0),Lo||M!==y){Ut.setValue(G,"projectionMatrix",y.projectionMatrix),Ut.setValue(G,"viewMatrix",y.matrixWorldInverse);const Jt=Ut.map.cameraPosition;Jt!==void 0&&Jt.setValue(G,je.setFromMatrixPosition(y.matrixWorld)),ze.logarithmicDepthBuffer&&Ut.setValue(G,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&Ut.setValue(G,"isOrthographic",y.isOrthographicCamera===!0),M!==y&&(M=y,ji=!0,fs=!0)}if(X.isSkinnedMesh){Ut.setOptional(G,X,"bindMatrix"),Ut.setOptional(G,X,"bindMatrixInverse");const Jt=X.skeleton;Jt&&(ze.floatVertexTextures?(Jt.boneTexture===null&&Jt.computeBoneTexture(),Ut.setValue(G,"boneTexture",Jt.boneTexture,S)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}X.isBatchedMesh&&(Ut.setOptional(G,X,"batchingTexture"),Ut.setValue(G,"batchingTexture",X._matricesTexture,S));const ps=V.morphAttributes;if((ps.position!==void 0||ps.normal!==void 0||ps.color!==void 0&&ze.isWebGL2===!0)&&Ke.update(X,V,Vn),(ji||rt.receiveShadow!==X.receiveShadow)&&(rt.receiveShadow=X.receiveShadow,Ut.setValue(G,"receiveShadow",X.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(Xn.envMap.value=qe,Xn.flipEnvMap.value=qe.isCubeTexture&&qe.isRenderTargetTexture===!1?-1:1),ji&&(Ut.setValue(G,"toneMappingExposure",x.toneMappingExposure),rt.needsLights&&fn(Xn,fs),ye&&$.fog===!0&&Me.refreshFogUniforms(Xn,ye),Me.refreshMaterialUniforms(Xn,$,J,H,Se),Yr.upload(G,St(rt),Xn,S)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Yr.upload(G,St(rt),Xn,S),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&Ut.setValue(G,"center",X.center),Ut.setValue(G,"modelViewMatrix",X.modelViewMatrix),Ut.setValue(G,"normalMatrix",X.normalMatrix),Ut.setValue(G,"modelMatrix",X.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const Jt=$.uniformsGroups;for(let ms=0,El=Jt.length;ms<El;ms++)if(ze.isWebGL2){const Po=Jt[ms];he.update(Po,Vn),he.bind(Po,Vn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Vn}function fn(y,O){y.ambientLightColor.needsUpdate=O,y.lightProbe.needsUpdate=O,y.directionalLights.needsUpdate=O,y.directionalLightShadows.needsUpdate=O,y.pointLights.needsUpdate=O,y.pointLightShadows.needsUpdate=O,y.spotLights.needsUpdate=O,y.spotLightShadows.needsUpdate=O,y.rectAreaLights.needsUpdate=O,y.hemisphereLights.needsUpdate=O}function It(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(y,O,V){Ge.get(y.texture).__webglTexture=O,Ge.get(y.depthTexture).__webglTexture=V;const $=Ge.get(y);$.__hasExternalTextures=!0,$.__hasExternalTextures&&($.__autoAllocateDepthBuffer=V===void 0,$.__autoAllocateDepthBuffer||Ie.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(y,O){const V=Ge.get(y);V.__webglFramebuffer=O,V.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(y,O=0,V=0){R=y,I=O,L=V;let $=!0,X=null,ye=!1,Ne=!1;if(y){const qe=Ge.get(y);qe.__useDefaultFramebuffer!==void 0?(Ae.bindFramebuffer(G.FRAMEBUFFER,null),$=!1):qe.__webglFramebuffer===void 0?S.setupRenderTarget(y):qe.__hasExternalTextures&&S.rebindTextures(y,Ge.get(y.texture).__webglTexture,Ge.get(y.depthTexture).__webglTexture);const nt=y.texture;(nt.isData3DTexture||nt.isDataArrayTexture||nt.isCompressedArrayTexture)&&(Ne=!0);const Ze=Ge.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Ze[O])?X=Ze[O][V]:X=Ze[O],ye=!0):ze.isWebGL2&&y.samples>0&&S.useMultisampledRTT(y)===!1?X=Ge.get(y).__webglMultisampledFramebuffer:Array.isArray(Ze)?X=Ze[V]:X=Ze,T.copy(y.viewport),F.copy(y.scissor),U=y.scissorTest}else T.copy(ee).multiplyScalar(J).floor(),F.copy(oe).multiplyScalar(J).floor(),U=me;if(Ae.bindFramebuffer(G.FRAMEBUFFER,X)&&ze.drawBuffers&&$&&Ae.drawBuffers(y,X),Ae.viewport(T),Ae.scissor(F),Ae.setScissorTest(U),ye){const qe=Ge.get(y.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+O,qe.__webglTexture,V)}else if(Ne){const qe=Ge.get(y.texture),nt=O||0;G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,qe.__webglTexture,V||0,nt)}Y=-1},this.readRenderTargetPixels=function(y,O,V,$,X,ye,Ne){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let We=Ge.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Ne!==void 0&&(We=We[Ne]),We){Ae.bindFramebuffer(G.FRAMEBUFFER,We);try{const qe=y.texture,nt=qe.format,Ze=qe.type;if(nt!==hn&&Ee.convert(nt)!==G.getParameter(G.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Qe=Ze===dr&&(Ie.has("EXT_color_buffer_half_float")||ze.isWebGL2&&Ie.has("EXT_color_buffer_float"));if(Ze!==kn&&Ee.convert(Ze)!==G.getParameter(G.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ze===Fn&&(ze.isWebGL2||Ie.has("OES_texture_float")||Ie.has("WEBGL_color_buffer_float")))&&!Qe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=y.width-$&&V>=0&&V<=y.height-X&&G.readPixels(O,V,$,X,Ee.convert(nt),Ee.convert(Ze),ye)}finally{const qe=R!==null?Ge.get(R).__webglFramebuffer:null;Ae.bindFramebuffer(G.FRAMEBUFFER,qe)}}},this.copyFramebufferToTexture=function(y,O,V=0){const $=Math.pow(2,-V),X=Math.floor(O.image.width*$),ye=Math.floor(O.image.height*$);S.setTexture2D(O,0),G.copyTexSubImage2D(G.TEXTURE_2D,V,0,0,y.x,y.y,X,ye),Ae.unbindTexture()},this.copyTextureToTexture=function(y,O,V,$=0){const X=O.image.width,ye=O.image.height,Ne=Ee.convert(V.format),We=Ee.convert(V.type);S.setTexture2D(V,0),G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,V.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,V.unpackAlignment),O.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,$,y.x,y.y,X,ye,Ne,We,O.image.data):O.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,$,y.x,y.y,O.mipmaps[0].width,O.mipmaps[0].height,Ne,O.mipmaps[0].data):G.texSubImage2D(G.TEXTURE_2D,$,y.x,y.y,Ne,We,O.image),$===0&&V.generateMipmaps&&G.generateMipmap(G.TEXTURE_2D),Ae.unbindTexture()},this.copyTextureToTexture3D=function(y,O,V,$,X=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ye=y.max.x-y.min.x+1,Ne=y.max.y-y.min.y+1,We=y.max.z-y.min.z+1,qe=Ee.convert($.format),nt=Ee.convert($.type);let Ze;if($.isData3DTexture)S.setTexture3D($,0),Ze=G.TEXTURE_3D;else if($.isDataArrayTexture||$.isCompressedArrayTexture)S.setTexture2DArray($,0),Ze=G.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,$.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,$.unpackAlignment);const Qe=G.getParameter(G.UNPACK_ROW_LENGTH),xt=G.getParameter(G.UNPACK_IMAGE_HEIGHT),$t=G.getParameter(G.UNPACK_SKIP_PIXELS),At=G.getParameter(G.UNPACK_SKIP_ROWS),gn=G.getParameter(G.UNPACK_SKIP_IMAGES),pt=V.isCompressedTexture?V.mipmaps[X]:V.image;G.pixelStorei(G.UNPACK_ROW_LENGTH,pt.width),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,pt.height),G.pixelStorei(G.UNPACK_SKIP_PIXELS,y.min.x),G.pixelStorei(G.UNPACK_SKIP_ROWS,y.min.y),G.pixelStorei(G.UNPACK_SKIP_IMAGES,y.min.z),V.isDataTexture||V.isData3DTexture?G.texSubImage3D(Ze,X,O.x,O.y,O.z,ye,Ne,We,qe,nt,pt.data):V.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),G.compressedTexSubImage3D(Ze,X,O.x,O.y,O.z,ye,Ne,We,qe,pt.data)):G.texSubImage3D(Ze,X,O.x,O.y,O.z,ye,Ne,We,qe,nt,pt),G.pixelStorei(G.UNPACK_ROW_LENGTH,Qe),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,xt),G.pixelStorei(G.UNPACK_SKIP_PIXELS,$t),G.pixelStorei(G.UNPACK_SKIP_ROWS,At),G.pixelStorei(G.UNPACK_SKIP_IMAGES,gn),X===0&&$.generateMipmaps&&G.generateMipmap(Ze),Ae.unbindTexture()},this.initTexture=function(y){y.isCubeTexture?S.setTextureCube(y,0):y.isData3DTexture?S.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?S.setTexture2DArray(y,0):S.setTexture2D(y,0),Ae.unbindTexture()},this.resetState=function(){I=0,L=0,R=null,Ae.reset(),A.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===fo?"display-p3":"srgb",t.unpackColorSpace=ut.workingColorSpace===as?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Ct?ii:kc}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===ii?Ct:An}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class qm extends al{}qm.prototype.isWebGL1Renderer=!0;class Mo{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new it(e),this.density=t}clone(){return new Mo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Ym extends Et{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Km{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=to,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=wn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Bt=new N;class rs{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=mn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=mn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=mn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=mn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),r=lt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),r=lt(r,this.array),s=lt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new dn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new rs(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class cl extends Gn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new it(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Li;const Ji=new N,Pi=new N,Di=new N,Ii=new ke,Qi=new ke,ll=new vt,Hr=new N,er=new N,Gr=new N,Za=new ke,Xs=new ke,Ja=new ke;class Zm extends Et{constructor(e=new cl){if(super(),this.isSprite=!0,this.type="Sprite",Li===void 0){Li=new Zt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Km(t,5);Li.setIndex([0,1,2,0,2,3]),Li.setAttribute("position",new rs(n,3,0,!1)),Li.setAttribute("uv",new rs(n,2,3,!1))}this.geometry=Li,this.material=e,this.center=new ke(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Pi.setFromMatrixScale(this.matrixWorld),ll.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Di.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Pi.multiplyScalar(-Di.z);const n=this.material.rotation;let r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));const a=this.center;Wr(Hr.set(-.5,-.5,0),Di,a,Pi,r,s),Wr(er.set(.5,-.5,0),Di,a,Pi,r,s),Wr(Gr.set(.5,.5,0),Di,a,Pi,r,s),Za.set(0,0),Xs.set(1,0),Ja.set(1,1);let o=e.ray.intersectTriangle(Hr,er,Gr,!1,Ji);if(o===null&&(Wr(er.set(-.5,.5,0),Di,a,Pi,r,s),Xs.set(0,1),o=e.ray.intersectTriangle(Hr,Gr,er,!1,Ji),o===null))return;const c=e.ray.origin.distanceTo(Ji);c<e.near||c>e.far||t.push({distance:c,point:Ji.clone(),uv:tn.getInterpolation(Ji,Hr,er,Gr,Za,Xs,Ja,new ke),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Wr(i,e,t,n,r,s){Ii.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(Qi.x=s*Ii.x-r*Ii.y,Qi.y=r*Ii.x+s*Ii.y):Qi.copy(Ii),i.copy(e),i.x+=Qi.x,i.y+=Qi.y,i.applyMatrix4(ll)}class ul extends Gn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new it(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Qa=new N,ec=new N,tc=new vt,$s=new gr,Vr=new mr;class Jm extends Et{constructor(e=new Zt,t=new ul){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Qa.fromBufferAttribute(t,r-1),ec.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Qa.distanceTo(ec);e.setAttribute("lineDistance",new on(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vr.copy(n.boundingSphere),Vr.applyMatrix4(r),Vr.radius+=s,e.ray.intersectsSphere(Vr)===!1)return;tc.copy(r).invert(),$s.copy(e.ray).applyMatrix4(tc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=new N,u=new N,f=new N,d=new N,m=this.isLineSegments?2:1,_=n.index,p=n.attributes.position;if(_!==null){const h=Math.max(0,a.start),E=Math.min(_.count,a.start+a.count);for(let x=h,b=E-1;x<b;x+=m){const I=_.getX(x),L=_.getX(x+1);if(l.fromBufferAttribute(p,I),u.fromBufferAttribute(p,L),$s.distanceSqToSegment(l,u,d,f)>c)continue;d.applyMatrix4(this.matrixWorld);const Y=e.ray.origin.distanceTo(d);Y<e.near||Y>e.far||t.push({distance:Y,point:f.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const h=Math.max(0,a.start),E=Math.min(p.count,a.start+a.count);for(let x=h,b=E-1;x<b;x+=m){if(l.fromBufferAttribute(p,x),u.fromBufferAttribute(p,x+1),$s.distanceSqToSegment(l,u,d,f)>c)continue;d.applyMatrix4(this.matrixWorld);const L=e.ray.origin.distanceTo(d);L<e.near||L>e.far||t.push({distance:L,point:f.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}class hl extends Gn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new it(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const nc=new vt,so=new gr,Xr=new mr,$r=new N;class Qm extends Et{constructor(e=new Zt,t=new hl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xr.copy(n.boundingSphere),Xr.applyMatrix4(r),Xr.radius+=s,e.ray.intersectsSphere(Xr)===!1)return;nc.copy(r).invert(),so.copy(e.ray).applyMatrix4(nc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,f=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let _=d,g=m;_<g;_++){const p=l.getX(_);$r.fromBufferAttribute(f,p),ic($r,p,c,r,e,t,this)}}else{const d=Math.max(0,a.start),m=Math.min(f.count,a.start+a.count);for(let _=d,g=m;_<g;_++)$r.fromBufferAttribute(f,_),ic($r,_,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function ic(i,e,t,n,r,s,a){const o=so.distanceSqToPoint(i);if(o<t){const c=new N;so.closestPointToPoint(i,c),c.applyMatrix4(n);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,object:a})}}class eg extends Xt{constructor(e,t,n,r,s,a,o,c,l){super(e,t,n,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Un extends Zt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],f=new N,d=new N,m=[],_=[],g=[],p=[];for(let h=0;h<=n;h++){const E=[],x=h/n;let b=0;h===0&&a===0?b=.5/t:h===n&&c===Math.PI&&(b=-.5/t);for(let I=0;I<=t;I++){const L=I/t;f.x=-e*Math.cos(r+L*s)*Math.sin(a+x*o),f.y=e*Math.cos(a+x*o),f.z=e*Math.sin(r+L*s)*Math.sin(a+x*o),_.push(f.x,f.y,f.z),d.copy(f).normalize(),g.push(d.x,d.y,d.z),p.push(L+b,1-x),E.push(l++)}u.push(E)}for(let h=0;h<n;h++)for(let E=0;E<t;E++){const x=u[h][E+1],b=u[h][E],I=u[h+1][E],L=u[h+1][E+1];(h!==0||a>0)&&m.push(x,b,L),(h!==n-1||c<Math.PI)&&m.push(b,I,L)}this.setIndex(m),this.setAttribute("position",new on(_,3)),this.setAttribute("normal",new on(g,3)),this.setAttribute("uv",new on(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Un(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class tr extends Gn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new it(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new it(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Hc,this.normalScale=new ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class dl extends Et{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new it(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class tg extends dl{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.groundColor=new it(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const js=new vt,rc=new N,sc=new N;class ng{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ke(512,512),this.map=null,this.mapPass=null,this.matrix=new vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _o,this._frameExtents=new ke(1,1),this._viewportCount=1,this._viewports=[new Pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;rc.setFromMatrixPosition(e.matrixWorld),t.position.copy(rc),sc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(sc),t.updateMatrixWorld(),js.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(js),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(js)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class ig extends ng{constructor(){super(new el(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class oc extends dl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.shadow=new ig}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class rg{constructor(e,t,n=0,r=1/0){this.ray=new gr(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new mo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return oo(e,this,n,t),n.sort(ac),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)oo(e[r],this,n,t);return n.sort(ac),n}}function ac(i,e){return i.distance-e.distance}function oo(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){const r=i.children;for(let s=0,a=r.length;s<a;s++)oo(r[s],e,t,!0)}}class cc{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ot(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:uo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=uo);const lc={type:"change"},qs={type:"start"},uc={type:"end"},jr=new gr,hc=new In,sg=Math.cos(70*Kn.DEG2RAD);class og extends ci{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:di.ROTATE,MIDDLE:di.DOLLY,RIGHT:di.PAN},this.touches={ONE:fi.ROTATE,TWO:fi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(A){A.addEventListener("keydown",Fe),this._domElementKeyEvents=A},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Fe),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(lc),n.update(),s=r.NONE},this.update=function(){const A=new N,he=new oi().setFromUnitVectors(e.up,new N(0,1,0)),Pe=he.clone().invert(),Te=new N,se=new oi,P=new N,C=2*Math.PI;return function(K=null){const Q=n.object.position;A.copy(Q).sub(n.target),A.applyQuaternion(he),o.setFromVector3(A),n.autoRotate&&s===r.NONE&&U(T(K)),n.enableDamping?(o.theta+=c.theta*n.dampingFactor,o.phi+=c.phi*n.dampingFactor):(o.theta+=c.theta,o.phi+=c.phi);let ue=n.minAzimuthAngle,fe=n.maxAzimuthAngle;isFinite(ue)&&isFinite(fe)&&(ue<-Math.PI?ue+=C:ue>Math.PI&&(ue-=C),fe<-Math.PI?fe+=C:fe>Math.PI&&(fe-=C),ue<=fe?o.theta=Math.max(ue,Math.min(fe,o.theta)):o.theta=o.theta>(ue+fe)/2?Math.max(ue,o.theta):Math.min(fe,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(u,n.dampingFactor):n.target.add(u),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&L||n.object.isOrthographicCamera?o.radius=ee(o.radius):o.radius=ee(o.radius*l),A.setFromSpherical(o),A.applyQuaternion(Pe),Q.copy(n.target).add(A),n.object.lookAt(n.target),n.enableDamping===!0?(c.theta*=1-n.dampingFactor,c.phi*=1-n.dampingFactor,u.multiplyScalar(1-n.dampingFactor)):(c.set(0,0,0),u.set(0,0,0));let pe=!1;if(n.zoomToCursor&&L){let we=null;if(n.object.isPerspectiveCamera){const de=A.length();we=ee(de*l);const De=de-we;n.object.position.addScaledVector(b,De),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){const de=new N(I.x,I.y,0);de.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),pe=!0;const De=new N(I.x,I.y,0);De.unproject(n.object),n.object.position.sub(De).add(de),n.object.updateMatrixWorld(),we=A.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;we!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(we).add(n.object.position):(jr.origin.copy(n.object.position),jr.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(jr.direction))<sg?e.lookAt(n.target):(hc.setFromNormalAndCoplanarPoint(n.object.up,n.target),jr.intersectPlane(hc,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),pe=!0);return l=1,L=!1,pe||Te.distanceToSquared(n.object.position)>a||8*(1-se.dot(n.object.quaternion))>a||P.distanceToSquared(n.target)>0?(n.dispatchEvent(lc),Te.copy(n.object.position),se.copy(n.object.quaternion),P.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",ct),n.domElement.removeEventListener("pointerdown",S),n.domElement.removeEventListener("pointercancel",W),n.domElement.removeEventListener("wheel",ce),n.domElement.removeEventListener("pointermove",v),n.domElement.removeEventListener("pointerup",W),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Fe),n._domElementKeyEvents=null)};const n=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const a=1e-6,o=new cc,c=new cc;let l=1;const u=new N,f=new ke,d=new ke,m=new ke,_=new ke,g=new ke,p=new ke,h=new ke,E=new ke,x=new ke,b=new N,I=new ke;let L=!1;const R=[],Y={};let M=!1;function T(A){return A!==null?2*Math.PI/60*n.autoRotateSpeed*A:2*Math.PI/60/60*n.autoRotateSpeed}function F(A){const he=Math.abs(A*.01);return Math.pow(.95,n.zoomSpeed*he)}function U(A){c.theta-=A}function k(A){c.phi-=A}const w=function(){const A=new N;return function(Pe,Te){A.setFromMatrixColumn(Te,0),A.multiplyScalar(-Pe),u.add(A)}}(),B=function(){const A=new N;return function(Pe,Te){n.screenSpacePanning===!0?A.setFromMatrixColumn(Te,1):(A.setFromMatrixColumn(Te,0),A.crossVectors(n.object.up,A)),A.multiplyScalar(Pe),u.add(A)}}(),H=function(){const A=new N;return function(Pe,Te){const se=n.domElement;if(n.object.isPerspectiveCamera){const P=n.object.position;A.copy(P).sub(n.target);let C=A.length();C*=Math.tan(n.object.fov/2*Math.PI/180),w(2*Pe*C/se.clientHeight,n.object.matrix),B(2*Te*C/se.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(w(Pe*(n.object.right-n.object.left)/n.object.zoom/se.clientWidth,n.object.matrix),B(Te*(n.object.top-n.object.bottom)/n.object.zoom/se.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function J(A){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l/=A:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function Z(A){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l*=A:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function q(A,he){if(!n.zoomToCursor)return;L=!0;const Pe=n.domElement.getBoundingClientRect(),Te=A-Pe.left,se=he-Pe.top,P=Pe.width,C=Pe.height;I.x=Te/P*2-1,I.y=-(se/C)*2+1,b.set(I.x,I.y,1).unproject(n.object).sub(n.object.position).normalize()}function ee(A){return Math.max(n.minDistance,Math.min(n.maxDistance,A))}function oe(A){f.set(A.clientX,A.clientY)}function me(A){q(A.clientX,A.clientX),h.set(A.clientX,A.clientY)}function z(A){_.set(A.clientX,A.clientY)}function te(A){d.set(A.clientX,A.clientY),m.subVectors(d,f).multiplyScalar(n.rotateSpeed);const he=n.domElement;U(2*Math.PI*m.x/he.clientHeight),k(2*Math.PI*m.y/he.clientHeight),f.copy(d),n.update()}function xe(A){E.set(A.clientX,A.clientY),x.subVectors(E,h),x.y>0?J(F(x.y)):x.y<0&&Z(F(x.y)),h.copy(E),n.update()}function Se(A){g.set(A.clientX,A.clientY),p.subVectors(g,_).multiplyScalar(n.panSpeed),H(p.x,p.y),_.copy(g),n.update()}function Le(A){q(A.clientX,A.clientY),A.deltaY<0?Z(F(A.deltaY)):A.deltaY>0&&J(F(A.deltaY)),n.update()}function $e(A){let he=!1;switch(A.code){case n.keys.UP:A.ctrlKey||A.metaKey||A.shiftKey?k(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):H(0,n.keyPanSpeed),he=!0;break;case n.keys.BOTTOM:A.ctrlKey||A.metaKey||A.shiftKey?k(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):H(0,-n.keyPanSpeed),he=!0;break;case n.keys.LEFT:A.ctrlKey||A.metaKey||A.shiftKey?U(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):H(n.keyPanSpeed,0),he=!0;break;case n.keys.RIGHT:A.ctrlKey||A.metaKey||A.shiftKey?U(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):H(-n.keyPanSpeed,0),he=!0;break}he&&(A.preventDefault(),n.update())}function je(A){if(R.length===1)f.set(A.pageX,A.pageY);else{const he=Ee(A),Pe=.5*(A.pageX+he.x),Te=.5*(A.pageY+he.y);f.set(Pe,Te)}}function Be(A){if(R.length===1)_.set(A.pageX,A.pageY);else{const he=Ee(A),Pe=.5*(A.pageX+he.x),Te=.5*(A.pageY+he.y);_.set(Pe,Te)}}function tt(A){const he=Ee(A),Pe=A.pageX-he.x,Te=A.pageY-he.y,se=Math.sqrt(Pe*Pe+Te*Te);h.set(0,se)}function G(A){n.enableZoom&&tt(A),n.enablePan&&Be(A)}function gt(A){n.enableZoom&&tt(A),n.enableRotate&&je(A)}function Ie(A){if(R.length==1)d.set(A.pageX,A.pageY);else{const Pe=Ee(A),Te=.5*(A.pageX+Pe.x),se=.5*(A.pageY+Pe.y);d.set(Te,se)}m.subVectors(d,f).multiplyScalar(n.rotateSpeed);const he=n.domElement;U(2*Math.PI*m.x/he.clientHeight),k(2*Math.PI*m.y/he.clientHeight),f.copy(d)}function ze(A){if(R.length===1)g.set(A.pageX,A.pageY);else{const he=Ee(A),Pe=.5*(A.pageX+he.x),Te=.5*(A.pageY+he.y);g.set(Pe,Te)}p.subVectors(g,_).multiplyScalar(n.panSpeed),H(p.x,p.y),_.copy(g)}function Ae(A){const he=Ee(A),Pe=A.pageX-he.x,Te=A.pageY-he.y,se=Math.sqrt(Pe*Pe+Te*Te);E.set(0,se),x.set(0,Math.pow(E.y/h.y,n.zoomSpeed)),J(x.y),h.copy(E);const P=(A.pageX+he.x)*.5,C=(A.pageY+he.y)*.5;q(P,C)}function ht(A){n.enableZoom&&Ae(A),n.enablePan&&ze(A)}function Ge(A){n.enableZoom&&Ae(A),n.enableRotate&&Ie(A)}function S(A){n.enabled!==!1&&(R.length===0&&(n.domElement.setPointerCapture(A.pointerId),n.domElement.addEventListener("pointermove",v),n.domElement.addEventListener("pointerup",W)),Ke(A),A.pointerType==="touch"?Ye(A):ae(A))}function v(A){n.enabled!==!1&&(A.pointerType==="touch"?ie(A):re(A))}function W(A){Xe(A),R.length===0&&(n.domElement.releasePointerCapture(A.pointerId),n.domElement.removeEventListener("pointermove",v),n.domElement.removeEventListener("pointerup",W)),n.dispatchEvent(uc),s=r.NONE}function ae(A){let he;switch(A.button){case 0:he=n.mouseButtons.LEFT;break;case 1:he=n.mouseButtons.MIDDLE;break;case 2:he=n.mouseButtons.RIGHT;break;default:he=-1}switch(he){case di.DOLLY:if(n.enableZoom===!1)return;me(A),s=r.DOLLY;break;case di.ROTATE:if(A.ctrlKey||A.metaKey||A.shiftKey){if(n.enablePan===!1)return;z(A),s=r.PAN}else{if(n.enableRotate===!1)return;oe(A),s=r.ROTATE}break;case di.PAN:if(A.ctrlKey||A.metaKey||A.shiftKey){if(n.enableRotate===!1)return;oe(A),s=r.ROTATE}else{if(n.enablePan===!1)return;z(A),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&n.dispatchEvent(qs)}function re(A){switch(s){case r.ROTATE:if(n.enableRotate===!1)return;te(A);break;case r.DOLLY:if(n.enableZoom===!1)return;xe(A);break;case r.PAN:if(n.enablePan===!1)return;Se(A);break}}function ce(A){n.enabled===!1||n.enableZoom===!1||s!==r.NONE||(A.preventDefault(),n.dispatchEvent(qs),Le(Re(A)),n.dispatchEvent(uc))}function Re(A){const he=A.deltaMode,Pe={clientX:A.clientX,clientY:A.clientY,deltaY:A.deltaY};switch(he){case 1:Pe.deltaY*=16;break;case 2:Pe.deltaY*=100;break}return A.ctrlKey&&!M&&(Pe.deltaY*=10),Pe}function Me(A){A.key==="Control"&&(M=!0,document.addEventListener("keyup",be,{passive:!0,capture:!0}))}function be(A){A.key==="Control"&&(M=!1,document.removeEventListener("keyup",be,{passive:!0,capture:!0}))}function Fe(A){n.enabled===!1||n.enablePan===!1||$e(A)}function Ye(A){switch(Ue(A),R.length){case 1:switch(n.touches.ONE){case fi.ROTATE:if(n.enableRotate===!1)return;je(A),s=r.TOUCH_ROTATE;break;case fi.PAN:if(n.enablePan===!1)return;Be(A),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(n.touches.TWO){case fi.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;G(A),s=r.TOUCH_DOLLY_PAN;break;case fi.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;gt(A),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&n.dispatchEvent(qs)}function ie(A){switch(Ue(A),s){case r.TOUCH_ROTATE:if(n.enableRotate===!1)return;Ie(A),n.update();break;case r.TOUCH_PAN:if(n.enablePan===!1)return;ze(A),n.update();break;case r.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;ht(A),n.update();break;case r.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Ge(A),n.update();break;default:s=r.NONE}}function ct(A){n.enabled!==!1&&A.preventDefault()}function Ke(A){R.push(A.pointerId)}function Xe(A){delete Y[A.pointerId];for(let he=0;he<R.length;he++)if(R[he]==A.pointerId){R.splice(he,1);return}}function Ue(A){let he=Y[A.pointerId];he===void 0&&(he=new ke,Y[A.pointerId]=he),he.set(A.pageX,A.pageY)}function Ee(A){const he=A.pointerId===R[0]?R[1]:R[0];return Y[he]}n.domElement.addEventListener("contextmenu",ct),n.domElement.addEventListener("pointerdown",S),n.domElement.addEventListener("pointercancel",W),n.domElement.addEventListener("wheel",ce,{passive:!1}),document.addEventListener("keydown",Me,{passive:!0,capture:!0}),this.update()}}const fl="mempalace-viz-graph-rel-filters-v1",dc={tunnel:{label:"Tunnel",shortLabel:"Tunnel",description:"Same room name appearing in multiple wings — a cross-wing structural link from tunnel discovery (not semantic similarity)."},taxonomy_adjacency:{label:"Taxonomy adjacency",shortLabel:"Adjacency",description:"Inferred same-wing neighbor: consecutive rooms when sorted by name (structural chain, not topical similarity)."},unknown:{label:"Other",shortLabel:"Other",description:"Edges whose relationship type is not listed in the viewer registry."}};function ao(i){const e=i&&dc[i]?i:"unknown";return{type:e,...dc[e]}}function us(i){if(!i||typeof i!="object")return"tunnel";const e=i.relationshipType;return typeof e=="string"&&e.trim()?e.trim():"tunnel"}function yo(i){const e=new Set;for(const t of i||[])e.add(us(t));return[...e].sort()}function ag(i){const e=i||"tunnel";return e==="tunnel"?{color:5999871,opacity:.44}:e==="taxonomy_adjacency"?{color:4049336,opacity:.28}:e==="unknown"?{color:9741240,opacity:.32}:{color:10980346,opacity:.3}}function cg(i,e){const t=new Set(e||[]);if(t.size===0)return new Set;if(i==null)return new Set(t);if(Array.isArray(i)&&i.length===0)return new Set;const n=new Set;for(const r of i)typeof r=="string"&&t.has(r)&&n.add(r);return n}function Eo(i,e){const t=[...e||[]].sort();return t.length===0?null:!i||i.size===0?new Set:i.size===t.length&&t.every(r=>i.has(r))?null:i}function So(i,e){if(!e||e.size===0)return[];const t=[];for(const n of i||[])e.has(us(n))&&t.push(n);return t}function lg(i){const e={};for(const t of i||[]){const n=us(t);e[n]=(e[n]||0)+1}return e}function ug(i,e){const t=So(i,e);return{visibleEdgeCount:t.length,visibleByType:lg(t),visibleEdges:t}}function hg(i){if(!i||typeof i!="object")return null;const e=i.enabledTypes;return Array.isArray(e)?e.filter(t=>typeof t=="string"):null}function dg(i,e){const t=[],n=i==null?void 0:i.sources;Array.isArray(n)&&n.length&&t.push(`Sources: ${n.join(", ")}`);const r=i==null?void 0:i.truncatedSources;Array.isArray(r)&&r.some(o=>o==null?void 0:o.truncated)&&t.push("Some sources may be truncated upstream — tunnel list can be incomplete.");const s=((i==null?void 0:i.completenessNotes)||[]).filter(Boolean);s.length&&t.push(s[0]);const a=e!=null&&e.byType&&typeof e.byType=="object"?e.byType:null;if(a&&Object.keys(a).length){const o=Object.entries(a).map(([c,l])=>`${c}: ${l}`).join(" · ");t.push(`Types in payload: ${o}`)}return t.filter(Boolean).join(" ")}function pr(i,e=6){if(!i||typeof i!="object")return"";const t=Object.entries(i).filter(([,r])=>r>0).sort((r,s)=>s[1]-r[1]);return t.length?t.slice(0,e).map(([r,s])=>{const a=ao(r);return`${s} ${a.shortLabel.toLowerCase()}`}).join(" · "):""}function fg(i,e){const t=Object.values(i||{}).reduce((c,l)=>c+l,0),n=Object.values(e||{}).reduce((c,l)=>c+l,0);if(n===0)return null;const r=(i==null?void 0:i.tunnel)||0,s=(i==null?void 0:i.taxonomy_adjacency)||0,a=(e==null?void 0:e.tunnel)||0,o=(e==null?void 0:e.taxonomy_adjacency)||0;return t===0&&n>0?"No visible links with current filters; totals above are global.":s>r*2&&o>0?"Most of this room’s visible links are inferred same-wing adjacency.":r>s*2&&a>0?"Most of this room’s visible links are cross-wing tunnel connections.":r>0&&s===0&&o>0?"Only tunnel links are visible; inferred adjacency is hidden by filters.":s>0&&r===0&&a>0?"Only inferred adjacency is visible; tunnel links are hidden by filters.":null}function pg(i,e,t){const n=Math.max(1,i),r=Math.max(0,e),s=Math.max(1,t),a=r/n;let o=0;n>90||a>2.8?o=3:n>48||a>1.75?o=2:(n>24||a>1.05)&&(o=1);const c=o>=3?85:o>=2?130:o>=1?175:235,l=.00155+o*42e-5,u=o>=2?.68:o>=1?.82:1,f=o>=3?.74:o>=2?.86:1,d=o>=2?1.08:1,m=1+o*.22,_=1-o*.04,g=1+o*.12,p=.004+o*.0025,h=4+o*5,E=2.1+o*.55,x=48+o*14;return{tier:o,nodeCount:n,edgeCount:r,wingCount:s,edgeDensity:a,labelBudget:c,fogDensity:l,adjacencyOpacityMult:u,globalEdgeOpacityMult:f,tunnelEmphasisMult:d,repelScale:m,attractScale:_,centerScale:g,wingCohesion:p,depthJitter:h,collisionMinDist:E,forceIterations:x}}function mg(i){return{repelStrength:88*i.repelScale,attractStrength:.0115*i.attractScale,centerStrength:.0052*i.centerScale,wingCohesion:i.wingCohesion,iterations:i.forceIterations}}function sr(i){let e=2166136261;const t=String(i||"");for(let n=0;n<t.length;n+=1)e^=t.charCodeAt(n),e=Math.imul(e,16777619);return(e>>>0)/4294967296}function gg(i,e,t){const n=Math.max(1,e.length),r=26+Math.min(48,i.length*.35),s=7+t.tier*2.2,a=9+t.tier*1.8,o=new Map;e.forEach((l,u)=>{const f=u/n*Math.PI*2,d=r*(1+u%5*.04),m=Math.cos(f)*d,_=Math.sin(f)*d,g=((u+.5)/n-.5)*s*2.2;o.set(l,{x:m,y:g,z:_})});const c=new Map;i.forEach(l=>{if(l.type==="room"&&l.wing){const u=c.get(l.wing)||[];u.push(l),c.set(l.wing,u)}}),e.forEach(l=>{const u=c.get(l)||[],f=o.get(l)||{x:0,y:0,z:0},d=Math.max(u.length,1);u.forEach((m,_)=>{const g=_/d*Math.PI*2,p=sr(`${l}|${m.name}|${_}`),h=sr(`${m.name}|z`),E=a*(.45+.55*p),x=(h-.5)*t.depthJitter;m.x=f.x+Math.cos(g)*E,m.y=f.y+Math.sin(g*1.7)*E*.42+x,m.z=f.z+Math.sin(g)*E})}),i.forEach(l=>{if(l.type==="wing"){const u=o.get(l.name)||{x:0,y:0,z:0},f=sr(`wing|${l.name}`);l.x=u.x*.22+(f-.5)*3,l.y=u.y+(f-.5)*4,l.z=u.z*.22+(sr(`${l.name}z`)-.5)*3}})}function _g(i,e,t,n){const r=mg(t),{repelStrength:s,attractStrength:a,centerStrength:o,wingCohesion:c,iterations:l}=r,u=new Map;i.forEach(f=>{f.type==="wing"&&f.name&&u.set(f.name,f)});for(let f=0;f<l;f+=1){for(let d=0;d<i.length;d+=1)for(let m=d+1;m<i.length;m+=1){const _=i[d].x-i[m].x,g=i[d].y-i[m].y,p=i[d].z-i[m].z,h=Math.sqrt(_*_+g*g+p*p)+.12;let E=s/(h*h);const x=i[d].wing,b=i[m].wing;x&&b&&x!==b&&(E*=1.12),i[d].x+=_*E,i[d].y+=g*E,i[d].z+=p*E,i[m].x-=_*E,i[m].y-=g*E,i[m].z-=p*E}e.forEach(d=>{const m=n(i,d,"from"),_=n(i,d,"to");if(m&&_){let g=_.x-m.x,p=_.y-m.y,h=_.z-m.z,E=a;m.wing&&_.wing&&m.wing!==_.wing&&(E*=1.15),m.x+=g*E,m.y+=p*E,m.z+=h*E,_.x-=g*E,_.y-=p*E,_.z-=h*E}}),i.forEach(d=>{if(d.type==="room"&&d.wing){const m=u.get(d.wing);m&&(d.x+=(m.x-d.x)*c,d.y+=(m.y-d.y)*c,d.z+=(m.z-d.z)*c)}d.x*=1-o,d.y*=1-o,d.z*=1-o})}}function vg(i,e,t=10){for(let n=0;n<t;n+=1)for(let r=0;r<i.length;r+=1)for(let s=r+1;s<i.length;s+=1){const a=i[r],o=i[s];let c=a.x-o.x,l=a.y-o.y,u=a.z-o.z;const f=Math.sqrt(c*c+l*l+u*u)+1e-8;if(f<e){const d=(e-f)*.52,m=c/f,_=l/f,g=u/f;a.x+=m*d,a.y+=_*d,a.z+=g*d,o.x-=m*d,o.y-=_*d,o.z-=g*d}}}function xg(i,e){const t=Math.max(12,e),n=t*.85,r=t*4.2,s=(i-n)/(r-n);return Math.max(0,Math.min(1,s))}function Mg(i,e,t){const n=Math.max(8,Math.floor(i)),r=Math.max(0,Math.min(3,t)),s=Math.max(0,Math.min(1,e)),a=.38+r*.06,c=a+(1-a)*s;return Math.max(8,Math.floor(n*c))}function yg(i,e={}){let n=.74+Math.max(0,Math.min(1,i))*.38;return e.pinned?n*=1.12:e.selected?n*=1.08:e.hovered&&(n*=1.05),n}function Eg(i,e={}){const t=Math.max(0,Math.min(1,i));let n=.52+t*.46;return e.selected&&(n=Math.max(n,.94)),e.hovered&&(n=Math.max(n,.9)),e.neighbor&&(n=Math.max(n,.62+t*.28)),Math.max(.35,Math.min(1,n))}function pl(i){if(!i||!i.startsWith("room:"))return null;const e=i.slice(5),t=e.indexOf(":");return t===-1?null:e.slice(0,t)}function Sg(i){return i?i.startsWith("room:")?pl(i):i.startsWith("wing:")?i.slice(5):null:null}function bg(i,e,t){const n=new Map;function r(s,a){!s||!a||s===a||(n.has(s)||n.set(s,new Set),n.has(a)||n.set(a,new Set),n.get(s).add(a),n.get(a).add(s))}for(const s of i||[]){const a=t(e,s,"from"),o=t(e,s,"to"),c=Wi(a),l=Wi(o);c!=null&&c.startsWith("room:")&&(l!=null&&l.startsWith("room:"))&&r(c,l)}return n}function nr(i,e){const t=new Set;if(!i)return t;const n=e.get(i);return n&&n.forEach(r=>t.add(r)),t}function Tg(i,e){const t=i.filter(l=>l.id.startsWith("room:")),n=e.nodeCount>300?e.labelBudget*5:e.nodeCount>160?e.labelBudget*4:t.length,r=Math.max(24,Math.min(t.length,n)),s=t.filter(l=>(l.incidentFull||0)>0),a=t.filter(l=>(l.incidentFull||0)===0),o=(l,u)=>u.baseScore-l.baseScore;s.sort(o),a.sort(o);const c=[];for(const l of s){if(c.length>=r)break;c.push(l.id)}for(const l of a){if(c.length>=r)break;c.push(l.id)}return new Set(c)}function wg(i,e){const{selectedId:t,hoveredId:n,pinActive:r,budget:s,neighborIds:a=null,focusWingId:o=null,cameraDistanceNorm:c=.55,densityTier:l=0}=e,u=Mg(s,c,l),f=Math.max(8,Math.floor(u)),d=Math.max(0,Math.min(3,l)),m=3500+d*220,_=1200+d*80,g=i.map(({id:p,baseScore:h})=>{let E=h;return p===t&&(E+=1e6),r&&p===t&&(E+=2e5),p===n&&(E+=5e5),a&&a.has(p)&&(E+=m),o&&pl(p)===o&&(E+=_),{id:p,score:E}});return g.sort((p,h)=>h.score-p.score),new Set(g.slice(0,f).map(p=>p.id))}function Ag(i){const e=Math.min(220,(i.incidentFull||0)*24),t=Math.min(100,(i.drawers||0)*1.8),n=i.type==="wing"?45:0;return 20+e+t+n}function Rg(i){const{selectedId:e,hoveredId:t,fromId:n,toId:r,relationshipType:s,densityTier:a}=i,o=e||t,c=o&&(n===o||r===o),l=s==="tunnel",u=Math.max(0,Math.min(3,a));return o?c?l?1.24:1.06:u>=3?.36:u>=2?.4:u>=1?.52:.68:u>=3?l?.92:.78:1}function Cg(i,e,t={}){const{isNeighbor:n=!1,focusActive:r=!1}=t;if(!r)return 1;const s=Math.max(0,Math.min(3,e)),a=38+s*18,o=155+s*35;let c=1.05-(i-a)/o;return n&&(c=.55+c*.45),c=Math.max(s===0?.58:.34,Math.min(1.08,c)),c}function Lg(i,e,t=0){const n=Math.max(8,i),r=Math.max(0,Math.min(3,e)),s=sr(`frame|${t}`),a=n*(.028+r*.006),o=n*(.045+r*.008)*(s-.5)*2;return{x:o,y:a,z:-o*.4}}function fc(i,e,t,n={}){const r=e*Math.PI/180,s=Math.max(0,n.neighborCount||0),a=1.28+t*.06+Math.min(.14,s*.018),c=Math.max(4,i)*a/Math.tan(r/2),l=16+t*4;return Math.min(240,Math.max(l,c))}function Pg(i,e){let t=0;for(const n of e){const r=n.x-i.x,s=n.y-i.y,a=n.z-i.z;t=Math.max(t,Math.sqrt(r*r+s*s+a*a))}return t}function Wi(i){return i?i.type==="wing"&&i.name?`wing:${i.name}`:i.type==="room"&&i.wing&&i.name?`room:${i.wing}:${i.name}`:null:null}function Dg(i,e,t){const n=new Map;for(const r of e||[]){const s=t(i,r,"from"),a=t(i,r,"to"),o=Wi(s),c=Wi(a);o!=null&&o.startsWith("room:")&&n.set(o,(n.get(o)||0)+1),c!=null&&c.startsWith("room:")&&n.set(c,(n.get(c)||0)+1)}return n}function ir(i,e,t){const n=t==="from"?e.sourceRoomId||e.from:e.targetRoomId||e.to;if(n==null)return null;const r=String(n);return i.find(s=>s.type!=="room"?!1:Gt(s.wing,s.name)===r||!r.includes("/")&&s.name===r?!0:`${s.wing}/${s.name}`===r)}const mt={wingColors:{projects:"#8b9cf8",shared_grocery_list:"#6ee7b7",openclaw:"#94a3b8",default:"#fbbf24"},nodeSizes:{wingMin:3,wingMax:8,roomMin:.8,roomMax:2.5},spacing:{wingSeparation:40,roomRadius:15},accent:{linkWing:4015188,center:14870768}};function Ig(i){let e=0;const t=String(i||"");for(let n=0;n<t.length;n+=1)e=e*31+t.charCodeAt(n)>>>0;return e%360}function co(i){return mt.wingColors[i]?mt.wingColors[i]:`hsl(${Ig(i)}, 52%, 68%)`}function Ug(i){i.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose())})}function Ng(i){var e,t;(e=i.geometry)==null||e.dispose(),(t=i.material)==null||t.dispose()}function Fg(i,e={}){var P;let t,n,r,s,a,o=0,c=null,l={},u={},f=[],d=[],m=[],_=[],g=new Map,p=[],h=null,E=null,x=new Map,b=80,I=null,L=0,R=[],Y="wings",M=null,T=1,F=!0,U=!0,k=null,w={searchQuery:"",hoveredId:null,selectedId:null,pinActive:!1,relationshipTypesVisible:null},B=typeof window<"u"&&((P=window.matchMedia)==null?void 0:P.call(window,"(prefers-reduced-motion: reduce)").matches);const H=new Map,J=new Map,Z={onHover:e.onHover||(()=>{}),onClick:e.onClick||(()=>{})},q=new rg,ee=new ke;function oe(C,D,K=850){const Q=n.position.clone(),ue=s.target.clone(),fe=performance.now();c&&cancelAnimationFrame(c);function pe(){const we=Math.min((performance.now()-fe)/K,1),de=1-(1-we)**3;n.position.lerpVectors(Q,C,de),s.target.lerpVectors(ue,D,de),s.update(),we<1?c=requestAnimationFrame(pe):c=null}c=requestAnimationFrame(pe)}function me(){var C;d.forEach(({mesh:D})=>{t.remove(D),Ug(D)}),m.forEach(({line:D})=>{t.remove(D),Ng(D)}),_.forEach(({sprite:D})=>{var K;t.remove(D),(K=D.material.map)==null||K.dispose(),D.material.dispose()}),d=[],m=[],_=[],g=new Map,p=[],h=null,E=null,x=new Map,b=80,I=null,L=0,R=[],(C=t==null?void 0:t.fog)!=null&&C.isFogExp2&&(t.fog.density=.0026),a!=null&&a.material&&(a.material.opacity=.35),H.clear(),J.clear()}function z(){const C=new Zt,D=[];for(let Q=0;Q<1800;Q+=1)D.push(Kn.randFloatSpread(380),Kn.randFloatSpread(200),Kn.randFloatSpread(380));C.setAttribute("position",new on(D,3));const K=new hl({color:9741240,size:.45,transparent:!0,opacity:.35,depthWrite:!1});a=new Qm(C,K),t.add(a)}function te(C,D="#e2e8f0"){const K=document.createElement("canvas"),Q=K.getContext("2d"),ue=16;Q.font="500 22px ui-sans-serif, system-ui, sans-serif";const fe=Math.ceil(Q.measureText(C).width)+ue*2;K.width=fe,K.height=44,Q.font="500 22px ui-sans-serif, system-ui, sans-serif",Q.fillStyle="rgba(15,23,42,0.88)",Q.fillRect(4,4,fe-8,36),Q.fillStyle=D,Q.fillText(C,ue,28);const pe=new eg(K);pe.needsUpdate=!0;const we=new cl({map:pe,transparent:!0,depthWrite:!1}),de=new Zm(we),De=.022*fe;return de.scale.set(De,11,1),de.userData.labelBaseScale={x:De,y:11,z:1},de}function xe(C,D,K){const Q=D.material;H.set(C,{mesh:D,data:K,id:C,baseOpacity:Q.opacity,baseEmissive:Q.emissiveIntensity,baseScale:1,presentationOpacity:1}),D.userData.nodeId=C}function Se(C,D,K,Q,ue,fe){const pe=te(D,fe);pe.visible=F,pe.position.set(K,Q+2.2,ue),t.add(pe),_.push({sprite:pe,nodeId:C}),J.set(C,pe)}const Le=40;function $e(C){var ue;const D=_.findIndex(fe=>fe.nodeId===C);if(D===-1)return;const{sprite:K}=_[D];t.remove(K),(ue=K.material.map)==null||ue.dispose(),K.material.dispose(),_.splice(D,1),J.delete(C);const Q=R.indexOf(C);Q>=0&&R.splice(Q,1)}function je(){for(let C=0;C<R.length;C+=1){const D=R[C];if(!(D===w.selectedId||D===w.hoveredId||w.selectedId&&nr(w.selectedId,x).has(D)||!w.selectedId&&w.hoveredId&&nr(w.hoveredId,x).has(D)))return R.splice(C,1),$e(D),!0}return!1}function Be(C){if(J.has(C))return;const D=H.get(C);if(!(D!=null&&D.data)||D.data.type!=="room")return;for(;R.length>=Le&&je(););if(R.length>=Le)return;const{mesh:K,data:Q}=D,ue=K.position;Se(C,Q.name,ue.x,ue.y,ue.z,"#94a3b8"),R.push(C)}function tt(){if(Y!=="graph"||!p.length||!n)return;const C=n.position.distanceTo(s.target),D=xg(C,b),K=(h==null?void 0:h.tier)??0,Q=(h==null?void 0:h.labelBudget)??180,ue=w.selectedId,fe=w.hoveredId,pe=ue||fe,we=pe?nr(pe,x):new Set,de=Sg(ue||fe),De=wg(p,{selectedId:ue,hoveredId:fe,pinActive:w.pinActive,budget:Q,neighborIds:we,focusWingId:de,cameraDistanceNorm:D,densityTier:K}),Oe=(w.searchQuery||"").trim().toLowerCase();for(const ge of De)ge.startsWith("room:")&&!J.has(ge)&&Be(ge);J.forEach((ge,He)=>{var It;const Ce=(It=H.get(He))==null?void 0:It.data;if(!Ce)return;const at=ze(Ce,Oe),dt=De.has(He),St={selected:He===ue,hovered:He===fe,pinned:!!(w.pinActive&&He===ue),neighbor:we.has(He)},Mt=yg(D,St),wt=ge.userData.labelBaseScale;wt&&ge.scale.set(wt.x*Mt,wt.y*Mt,wt.z);const fn=at?Eg(D,St):.12;ge.material.opacity=fn,ge.visible=F&&dt})}function G(C,D,K,Q=.28,ue={}){const fe=[new N(...C),new N(...D)],pe=new Zt().setFromPoints(fe),we=new ul({color:K,transparent:!0,opacity:Q}),de=new Jm(pe,we);return de.userData=ue,t.add(de),m.push({line:de,...ue}),de}function gt(C,D,K,Q,ue){const fe=co(C),pe=new it(fe),we=`wing:${C}`,de=new Un(ue,28,28),De=new tr({color:pe,emissive:pe,emissiveIntensity:.22,metalness:.15,roughness:.45,transparent:!0,opacity:.92}),Oe=new Vt(de,De);Oe.position.set(D,K,Q),Oe.userData={id:we,name:C,wingId:C,type:"wing",drawers:l[C],label:C,_baseY:K};const ge=new Un(ue*1.25,24,24),He=new go({color:pe,transparent:!0,opacity:.08,side:Wt,depthWrite:!1}),Ce=new Vt(ge,He);return Oe.add(Ce),t.add(Oe),d.push({mesh:Oe,data:Oe.userData}),xe(we,Oe,Oe.userData),Oe}function Ie(C,D,K,Q,ue,fe){const pe=co(D),we=new it(pe);we.offsetHSL(0,-.05,-.06);const de=`room:${D}:${C}`,De=new Un(fe,20,20),Oe=new tr({color:we,emissive:we,emissiveIntensity:.18,metalness:.12,roughness:.5,transparent:!0,opacity:.88}),ge=new Vt(De,Oe);ge.position.set(K,Q,ue);const He=(u[D]||[]).find(at=>at.name===C),Ce=(He==null?void 0:He.roomId)||Gt(D,C);return ge.userData={id:de,name:C,type:"room",wing:D,wingId:D,roomId:Ce,drawers:He==null?void 0:He.drawers,label:C,_baseY:Q},t.add(ge),d.push({mesh:ge,data:ge.userData}),xe(de,ge,ge.userData),ge}function ze(C,D){if(!D)return!0;const K=[C.name,C.label,C.wing,C.type].filter(Boolean).join(" ").toLowerCase();return K.includes(D)||D.split(/\s+/).every(Q=>Q.length<2||K.includes(Q))}function Ae(C){return C==null?"":[...C].sort().join("\0")}function ht(C,D){return C.searchQuery===D.searchQuery&&C.hoveredId===D.hoveredId&&C.selectedId===D.selectedId&&C.pinActive===D.pinActive&&Ae(C.relationshipTypesVisible)===Ae(D.relationshipTypesVisible)}function Ge(){const C=(w.searchQuery||"").trim().toLowerCase(),D=w.hoveredId,K=w.selectedId,Q=w.pinActive,ue=w.relationshipTypesVisible,fe=(h==null?void 0:h.tier)??0,pe=new Map,we=(h==null?void 0:h.globalEdgeOpacityMult)??1,de=(h==null?void 0:h.adjacencyOpacityMult)??1,De=(h==null?void 0:h.tunnelEmphasisMult)??1;m.forEach(He=>{var $,X;const{line:Ce,fromId:at,toId:dt,baseOpacity:St=.28,isGraphRelationship:Mt,relationshipType:wt}=He,fn=at?ze((($=H.get(at))==null?void 0:$.data)||{},C):!0,It=dt?ze(((X=H.get(dt))==null?void 0:X.data)||{},C):!0,y=!C||fn&&It;let O=!0;if(Mt&&ue!=null){const ye=wt||"tunnel";O=ue.has(ye)}if(!y){Ce.visible=!0,Ce.material.opacity=St*.12;return}if(Mt&&!O){Ce.visible=!1;return}Ce.visible=!0;let V=St;if(Mt){const ye=wt||"tunnel";ye==="taxonomy_adjacency"&&(V*=de),ye==="tunnel"&&(V*=De),V*=we,V*=Rg({selectedId:K,hoveredId:D,fromId:at,toId:dt,relationshipType:ye,densityTier:fe})}Ce.material.opacity=V,Mt&&(at&&pe.set(at,(pe.get(at)||0)+1),dt&&pe.set(dt,(pe.get(dt)||0)+1))});const Oe=K||D,ge=Oe&&Y==="graph"?nr(Oe,x):null;H.forEach((He,Ce)=>{const{mesh:at,data:dt,baseOpacity:St,baseEmissive:Mt}=He,wt=at.material;if(!wt||wt.type==="MeshBasicMaterial")return;const fn=ze(dt,C);let It=fn?1:.14,y=1;Ce===D&&(y*=1.45),Ce===K&&(y*=Q?1.85:1.65),Ce===K&&Q&&(It=Math.max(It,.85));const O=g.get(Ce)||0,V=pe.get(Ce)||0;dt.type==="room"&&O>0&&V===0&&Y==="graph"&&(It*=fe>=2?.28:fe>=1?.31:.38,y*=fe>=2?.48:.54),ge&&(ge.has(Ce)&&(It=Math.max(It,fe>=2?.55:.66),y*=1.09),Ce===Oe&&(It=Math.max(It,Q&&Ce===K?.93:.87))),He.presentationOpacity=Math.min(1,It),wt.opacity=Math.min(1,St*It),wt.emissiveIntensity=Mt*y;const $=Ce===K?Q?1.1:1.07:Ce===D?1.05:ge!=null&&ge.has(Ce)?1.025:1,X=fn?1:.88;at.scale.setScalar($*X)}),Y==="graph"&&p.length?tt():J.forEach((He,Ce)=>{var St;const at=(St=H.get(Ce))==null?void 0:St.data;if(!at)return;const dt=ze(at,C);He.visible=F,He.material.opacity=dt?Ce===K?1:.92:.2})}function S(){const C=Object.keys(l);if(!C.length)return;const D=Math.PI*2/C.length,K=mt.spacing.wingSeparation/2;C.forEach((pe,we)=>{const de=we*D,De=Math.cos(de)*K,Oe=Math.sin(de)*K,ge=l[pe]||1,He=Kn.mapLinear(ge,1,200,mt.nodeSizes.wingMin,mt.nodeSizes.wingMax);gt(pe,De,0,Oe,He),Se(`wing:${pe}`,pe,De,0,Oe,"#e2e8f0")});const Q=new Un(1.1,20,20),ue=new tr({color:mt.accent.center,emissive:3359061,emissiveIntensity:.4,metalness:.3,roughness:.4,transparent:!0,opacity:.55}),fe=new Vt(Q,ue);t.add(fe),d.push({mesh:fe,data:{name:"Palace core",type:"center"}}),C.forEach((pe,we)=>{const de=we*D,De=Math.cos(de)*K,Oe=Math.sin(de)*K;G([0,0,0],[De,0,Oe],mt.accent.linkWing,.22,{fromId:null,toId:`wing:${pe}`,baseOpacity:.22})}),oe(new N(0,36,88),new N(0,0,0))}function v(C){const D=u[C]||[],K=mt.nodeSizes.wingMin+1.2;gt(C,0,0,0,K),Se(`wing:${C}`,C,0,0,0,"#e2e8f0");const Q=mt.spacing.roomRadius,ue=Math.max(D.length,1),fe=Math.PI*2/ue;D.forEach((pe,we)=>{const de=we*fe,De=Math.cos(de)*Q,Oe=Math.sin(de)*Q,ge=Kn.mapLinear(pe.drawers||1,1,80,mt.nodeSizes.roomMin,mt.nodeSizes.roomMax);Ie(pe.name,C,De,0,Oe,ge),G([0,0,0],[De,0,Oe],mt.accent.linkWing,.22,{fromId:`wing:${C}`,toId:`room:${C}:${pe.name}`,baseOpacity:.22}),Se(`room:${C}:${pe.name}`,pe.name,De,0,Oe,"#94a3b8")}),oe(new N(0,38,72),new N(0,0,0))}function W(){const C=Object.keys(u);if(!C.length)return;const D=Math.PI*2/C.length,K=mt.spacing.wingSeparation/2;C.forEach((pe,we)=>{const de=we*D,De=Math.cos(de)*K,Oe=Math.sin(de)*K;gt(pe,De,0,Oe,mt.nodeSizes.wingMin),Se(`wing:${pe}`,pe,De,0,Oe,"#cbd5e1");const ge=u[pe]||[],He=Math.PI*2/Math.max(ge.length,1),Ce=mt.spacing.roomRadius;ge.forEach((at,dt)=>{const St=de+dt*He,Mt=De+Math.cos(St)*Ce,wt=Oe+Math.sin(St)*Ce,fn=Kn.mapLinear(at.drawers||1,1,80,mt.nodeSizes.roomMin,mt.nodeSizes.roomMax);Ie(at.name,pe,Mt,0,wt,fn),G([De,0,Oe],[Mt,0,wt],mt.accent.linkWing,.18,{fromId:`wing:${pe}`,toId:`room:${pe}:${at.name}`,baseOpacity:.18}),Se(`room:${pe}:${at.name}`,at.name,Mt,0,wt,"#94a3b8")})});const Q=new Un(1.1,20,20),ue=new tr({color:mt.accent.center,emissive:3359061,emissiveIntensity:.35,metalness:.25,roughness:.45,transparent:!0,opacity:.5}),fe=new Vt(Q,ue);t.add(fe),d.push({mesh:fe,data:{name:"Palace core",type:"center"}}),C.forEach((pe,we)=>{const de=we*D;G([0,0,0],[Math.cos(de)*K,0,Math.sin(de)*K],mt.accent.linkWing,.2,{baseOpacity:.2})}),oe(new N(0,52,102),new N(0,0,0))}function ae(){M&&u[M]?v(M):W()}function re(C){return[...C].sort((D,K)=>D.localeCompare(K))}function ce(){const C=new Map;Object.keys(l).forEach(ge=>{C.set(ge,{name:ge,type:"wing",wing:ge,x:0,y:0,z:0})}),Object.entries(u).forEach(([ge,He])=>{He.forEach(Ce=>{C.set(Gt(ge,Ce.name),{name:Ce.name,type:"room",wing:ge,x:0,y:0,z:0,drawers:Ce.drawers})})});const D=Array.from(C.values());if(!D.length){const ge=new Un(1.1,16,16),He=new tr({color:mt.accent.center,emissive:3359061,emissiveIntensity:.25,metalness:.2,roughness:.5,transparent:!0,opacity:.35}),Ce=new Vt(ge,He);t.add(Ce),d.push({mesh:Ce,data:{name:"No graph data",type:"center"}}),oe(new N(0,28,72),new N(0,0,0));return}const K=re(Object.keys(l));g=Dg(D,f,ir),x=bg(f,D,ir),h=pg(D.length,f.length,K.length),B&&(h={...h,labelBudget:Math.min(h.labelBudget,95)}),gg(D,K,h),_g(D,f,h,ir),vg(D,h.collisionMinDist,12),t.fog&&t.fog.isFogExp2&&(t.fog.density=h.fogDensity),a!=null&&a.material&&(a.material.opacity=Math.max(.12,.34-h.tier*.055)),p=D.map(ge=>{const He=ge.type==="wing"?`wing:${ge.name}`:`room:${ge.wing}:${ge.name}`,Ce=g.get(He)||0;return{id:He,incidentFull:Ce,baseScore:Ag({type:ge.type,incidentFull:Ce,drawers:ge.drawers})}});const Q=Tg(p,h);D.forEach(ge=>{const He=ge.type==="wing",Ce=He?mt.nodeSizes.wingMin+.4:mt.nodeSizes.roomMin+.2;if(He)gt(ge.name,ge.x,ge.y,ge.z,Ce),Se(`wing:${ge.name}`,ge.name,ge.x,ge.y,ge.z,"#cbd5e1");else{const at=`room:${ge.wing}:${ge.name}`;Ie(ge.name,ge.wing,ge.x,ge.y,ge.z,Ce),Q.has(at)&&Se(at,ge.name,ge.x,ge.y,ge.z,"#94a3b8")}}),f.forEach(ge=>{const He=ir(D,ge,"from"),Ce=ir(D,ge,"to");if(He&&Ce){const at=Wi(He),dt=Wi(Ce),St=us(ge),Mt=ag(St);G([He.x,He.y,He.z],[Ce.x,Ce.y,Ce.z],Mt.color,Mt.opacity,{fromId:at,toId:dt,baseOpacity:Mt.opacity,isGraphRelationship:!0,relationshipType:St})}});const ue=new Vi;D.forEach(ge=>ue.expandByPoint(new N(ge.x,ge.y,ge.z)));const fe=new N;ue.getCenter(fe);const pe=new N;ue.getSize(pe);const we=Math.max(pe.x,pe.y,pe.z,12);b=we;const de=fc(we*.48,n.fov,h.tier),De=new N(.35,.42,1).normalize(),Oe=fe.clone().add(De.multiplyScalar(de));E={position:Oe.clone(),target:fe.clone()},oe(Oe,fe)}function Re(){const D=U&&!(Y==="graph")&&!B;s.autoRotate=D,s.autoRotateSpeed=.35*(D?1:0)}function Me(C,D=null){Y=C,M=D,me(),k=null,w.hoveredId=null,Re(),C==="wings"?S():C==="rooms"?ae():C==="graph"&&ce(),Ge()}function be(){k=null,w.hoveredId=null,r.domElement.style.cursor="default",Ge(),Z.onHover(null,{x:0,y:0})}function Fe(C){var fe,pe;const D=r.domElement.getBoundingClientRect();ee.x=(C.clientX-D.left)/D.width*2-1,ee.y=-((C.clientY-D.top)/D.height)*2+1,q.setFromCamera(ee,n);const K=d.map(we=>we.mesh).filter(Boolean),Q=q.intersectObjects(K,!0);for(let we=0;we<Q.length;we+=1){let de=Q[we].object;for(;de&&!((fe=de.userData)!=null&&fe.type);)de=de.parent;if(de&&((pe=de.userData)!=null&&pe.type)&&de.userData.type!=="center"){const De=de.userData.id||null,Oe=k!==de||w.hoveredId!==De;k=de,w.hoveredId=De,r.domElement.style.cursor="pointer",Oe&&Ge(),Z.onHover({...de.userData},{x:C.clientX,y:C.clientY});return}}const ue=w.hoveredId!=null;k=null,w.hoveredId=null,r.domElement.style.cursor="default",ue&&Ge(),Z.onHover(null,{x:C.clientX,y:C.clientY})}function Ye(){if(!k){Z.onClick(null);return}const C={...k.userData};Z.onClick(C)}function ie(){o=requestAnimationFrame(ie),s.update();const C=Date.now()*.001,D=B?0:.42*T,K=B?0:.006*T;d.forEach((ue,fe)=>{if(!ue.data||ue.data.type==="center")return;const pe=fe*.37,we=ue.mesh.userData._baseY??0;ue.mesh.position.y=we+Math.sin(C*.9+pe)*D,ue.mesh.rotation.y+=K});const Q=(h==null?void 0:h.tier)??0;if(Y==="graph"){let ue=s.target;w.selectedId&&H.get(w.selectedId)?ue=H.get(w.selectedId).mesh.position:w.hoveredId&&H.get(w.hoveredId)&&(ue=H.get(w.hoveredId).mesh.position);const fe=w.selectedId||w.hoveredId,pe=fe?nr(fe,x):new Set,we=!!(w.selectedId||w.hoveredId);H.forEach((de,De)=>{const Oe=de.mesh.material;if(!Oe||Oe.type==="MeshBasicMaterial")return;const ge=de.mesh.position.distanceTo(ue),He=Cg(ge,Q,{isNeighbor:pe.has(De),focusActive:we});Oe.opacity=Math.min(1,de.baseOpacity*(de.presentationOpacity??1)*He)}),tt()}r.render(t,n)}function ct(){t=new Ym,t.background=new it(724760),t.fog=new Mo(724760,.0026),n=new nn(58,i.clientWidth/i.clientHeight,.1,1200),n.position.set(0,34,90),r=new al({antialias:!0,alpha:!1,powerPreference:"high-performance"}),r.setSize(i.clientWidth,i.clientHeight),r.setPixelRatio(Math.min(window.devicePixelRatio,2)),r.outputColorSpace=Ct,r.toneMapping=Pc,r.toneMappingExposure=1.05,i.appendChild(r.domElement),s=new og(n,r.domElement),s.enableDamping=!0,s.dampingFactor=.055,s.autoRotate=!0,s.autoRotateSpeed=.35,s.maxPolarAngle=Math.PI*.495;const C=new tg(6583435,988970,.85);t.add(C);const D=new oc(10859772,1.1);D.position.set(20,40,24),t.add(D);const K=new oc(3718648,.35);if(K.position.set(-24,12,-18),t.add(K),z(),typeof window<"u"&&window.matchMedia){const Q=window.matchMedia("(prefers-reduced-motion: reduce)");B=Q.matches,Q.addEventListener("change",ue=>{B=ue.matches,Re()})}r.domElement.addEventListener("pointermove",Fe),r.domElement.addEventListener("click",Ye),r.domElement.addEventListener("pointerleave",be),window.addEventListener("resize",Ke),ie()}function Ke(){if(!n||!r)return;const C=i.clientWidth,D=i.clientHeight;n.aspect=C/D,n.updateProjectionMatrix(),r.setSize(C,D)}function Xe(C){l=C.wingsData||{},u=C.roomsData||{},f=C.graphEdges||[]}function Ue(){if(Y==="graph"&&E){oe(E.position.clone(),E.target.clone());return}oe(new N(0,34,90),new N(0,0,0))}function Ee(C){const D=H.get(C);if(!D)return;const K=new N;if(D.mesh.getWorldPosition(K),Y==="graph"&&h){const fe=[];m.forEach(Ce=>{if(!Ce.isGraphRelationship)return;let at=null;if(Ce.fromId===C?at=Ce.toId:Ce.toId===C&&(at=Ce.fromId),!at)return;const dt=H.get(at);dt&&fe.push(dt.mesh.position.clone())});const pe=fe.length,we=Pg(K,fe.length?fe:[K.clone()]),de=fc(we,n.fov,h.tier,{neighborCount:pe});let De=n.position.clone().sub(K);De.lengthSq()<4&&De.set(32,26,72),De.normalize(),I===C?L+=1:(I=C,L=0);const Oe=Math.max(we*2.4,b*.42,28),ge=Lg(Oe,h.tier,L),He=new N(K.x+ge.x,K.y+ge.y,K.z+ge.z);oe(K.clone().add(De.multiplyScalar(de)),He);return}const Q=n.position.clone().sub(K).normalize(),ue=Y==="rooms"&&M?26:30;oe(K.clone().add(Q.multiplyScalar(ue)),K)}function A(){var C;(C=k==null?void 0:k.userData)!=null&&C.id&&Ee(k.userData.id)}function he(C){const D={...w,...C};ht(w,D)||(w=D,Ge())}function Pe(C){he({relationshipTypesVisible:C})}function Te(){w.selectedId=null,Ge()}function se(){var C;cancelAnimationFrame(o),c&&cancelAnimationFrame(c),window.removeEventListener("resize",Ke),r!=null&&r.domElement&&(r.domElement.removeEventListener("pointermove",Fe),r.domElement.removeEventListener("click",Ye),r.domElement.removeEventListener("pointerleave",be)),me(),a&&(t.remove(a),a.geometry.dispose(),a.material.dispose()),r==null||r.dispose(),(C=r==null?void 0:r.domElement)!=null&&C.parentNode&&r.domElement.parentNode.removeChild(r.domElement)}return{init:ct,setData:Xe,setView:Me,updatePresentation:he,setAutoRotate(C){U=C,Re()},setMotionIntensity(C){T=Math.max(0,Math.min(2,C))},setLabelsVisible(C){if(F=!!C,F&&!_.length){Me(Y,M);return}_.forEach(({sprite:D})=>{D.visible=F})},resetCamera:Ue,centerOnHovered:A,centerOnNodeId:Ee,clearPin:Te,resize:Ke,dispose:se,getView:()=>Y,getFocusWing:()=>M,getHovered:()=>k?{...k.userData}:null,setCallbacks(C){Object.assign(Z,C)},setRelationshipFilters:Pe}}function rn(i,e,t=null){var o,c;if(i==null||typeof i!="string")return null;const n=i.trim();if(!n)return null;const r=ri(n);if(r){const{wingId:l,roomName:u}=r;if((o=e[l])!=null&&o.some(f=>f.name===u))return{wing:l,room:u,key:Gt(l,u)}}if(n.includes("/")){const l=n.indexOf("/"),u=n.slice(0,l),f=n.slice(l+1);return(c=e[u])!=null&&c.some(d=>d.name===f)?{wing:u,room:f,key:Gt(u,f)}:null}const s=[];for(const[l,u]of Object.entries(e||{}))if(Array.isArray(u))for(const f of u)f.name===n&&s.push({wing:l,room:n,key:`${l}/${n}`});if(s.length===0)return null;if(s.length===1){const l=s[0];return{...l,key:Gt(l.wing,l.room)}}if(t&&s.some(l=>l.wing===t)){const l=s.find(u=>u.wing===t)||s[0];return{...l,key:Gt(l.wing,l.room)}}const a=s[0];return{...a,key:Gt(a.wing,a.room)}}function Og(i,e,t=null){if(t!=null&&typeof t=="number")return t;const n=Array.isArray(i)?i:[],r=e&&typeof e=="object"?e:{};let s=0;for(const a of n){const o=rn(a.from,r,null),c=rn(a.to,r,a.wing||null);(!o||!c)&&(s+=1)}return s}function Bg(i,e,t,n){var F;const r=i&&typeof i=="object"?i:{},s=Array.isArray(e)?e:[],a=new Set,o=new Map,c=new Map,l=new Map,u=new Map;function f(U,k){u.has(U)||u.set(U,new Set),u.get(U).add(k)}function d(U,k,w=1){U.set(k,(U.get(k)||0)+w)}let m=0,_=0;for(const U of s){const k=U.sourceRoomId,w=U.targetRoomId;if(!k||!w||k===w)continue;const B=k<w?`${k}||${w}`:`${w}||${k}`;if(a.has(B))continue;a.add(B),d(o,k),d(o,w),U.sourceWingId!==U.targetWingId?(m+=1,d(c,k),d(c,w)):(_+=1,d(l,k),d(l,w)),f(k,w),f(w,k)}const g=new Set([...o.keys()]),p=new Set;for(const[U,k]of Object.entries(r))if(Array.isArray(k))for(const w of k)p.add(w.roomId||Gt(U,w.name));const h=[];for(const U of p)g.has(U)||h.push(U);let E=m+_;t&&typeof t.resolvedEdgeCount=="number"&&(E=t.resolvedEdgeCount);const x=E>0?m/E:null;let I=[...o.entries()].sort((U,k)=>k[1]-U[1]).slice(0,8).map(([U,k])=>{const w=ri(U);return{wing:(w==null?void 0:w.wingId)??U.split("/")[0],room:(w==null?void 0:w.roomName)??U.slice(U.indexOf("/")+1),key:U,degree:k}});(F=n==null?void 0:n.topConnectedRooms)!=null&&F.length&&(I=n.topConnectedRooms.slice(0,8).map(U=>({wing:U.wingId,room:U.name,key:U.roomId,degree:U.degree})));const L=new Map;for(const U of s)U.sourceWingId!==U.targetWingId&&(d(L,U.sourceWingId),d(L,U.targetWingId));const R=[...L.entries()].sort((U,k)=>k[1]-U[1]).slice(0,8).map(([U,k])=>({wing:U,crossEdges:k})),Y=ml(o),M=t&&typeof t.crossWingEdgeCount=="number"?t.crossWingEdgeCount:null,T=t&&typeof t.intraWingEdgeCount=="number"?t.intraWingEdgeCount:null;return{edgeCount:s.length,resolvedEdgeCount:E,crossWingEdgeCount:M??m,intraWingEdgeCount:T??_,byRelationshipType:t!=null&&t.byType&&typeof t.byType=="object"?{...t.byType}:null,crossFraction:x,degreeByKey:o,crossByKey:c,intraByKey:l,neighborsByKey:u,topConnectedRooms:I,topCrossLinkedWings:R,roomsWithNoTunnels:typeof(n==null?void 0:n.roomsWithNoLinks)=="number"?n.roomsWithNoLinks:h.length,noTunnelRoomKeys:h.slice(0,50),medianRoomDegree:Y,hasResolvableEdges:E>0}}function zg(i,e,t,n){var T;const r=Array.isArray(i)?i:[],s=e&&typeof e=="object"?e:{},a=new Set,o=new Map,c=new Map,l=new Map,u=new Map;function f(F,U){u.has(F)||u.set(F,new Set),u.get(F).add(U)}function d(F,U,k=1){F.set(U,(F.get(U)||0)+k)}for(const F of r){const U=rn(F.from,s,null),k=rn(F.to,s,F.wing||null);if(!U||!k)continue;const w=U.key,B=k.key;if(w===B)continue;const H=w<B?`${w}||${B}`:`${B}||${w}`;if(a.has(H))continue;a.add(H),d(o,w),d(o,B),U.wing!==k.wing?(d(c,w),d(c,B)):(d(l,w),d(l,B)),f(w,B),f(B,w)}const m=new Set;for(const[F,U]of Object.entries(s))if(Array.isArray(U))for(const k of U)m.add(Gt(F,k.name));const _=[];for(const F of m)o.has(F)||_.push(F);let g=0,p=0;for(const F of r){const U=rn(F.from,s,null),k=rn(F.to,s,F.wing||null);!U||!k||(U.wing!==k.wing?g+=1:p+=1)}const h=g+p,E=h>0?g/h:null;let b=[...o.entries()].sort((F,U)=>U[1]-F[1]).slice(0,8).map(([F,U])=>{const k=ri(F);return{wing:(k==null?void 0:k.wingId)??F.split("/")[0],room:(k==null?void 0:k.roomName)??F.slice(F.indexOf("/")+1),key:F,degree:U}});(T=n==null?void 0:n.topConnectedRooms)!=null&&T.length&&(b=n.topConnectedRooms.slice(0,8).map(F=>({wing:F.wingId,room:F.name,key:F.roomId,degree:F.degree})));const I=new Map;for(const F of r){const U=rn(F.from,s,null),k=rn(F.to,s,F.wing||null);!U||!k||U.wing===k.wing||(d(I,U.wing),d(I,k.wing))}const L=[...I.entries()].sort((F,U)=>U[1]-F[1]).slice(0,8).map(([F,U])=>({wing:F,crossEdges:U})),R=ml(o),Y=t&&typeof t.crossWingEdgeCount=="number"?t.crossWingEdgeCount:null,M=t&&typeof t.intraWingEdgeCount=="number"?t.intraWingEdgeCount:null;return{edgeCount:r.length,resolvedEdgeCount:h,crossWingEdgeCount:Y??g,intraWingEdgeCount:M??p,crossFraction:E,degreeByKey:o,crossByKey:c,intraByKey:l,neighborsByKey:u,topConnectedRooms:b,topCrossLinkedWings:L,roomsWithNoTunnels:typeof(n==null?void 0:n.roomsWithNoLinks)=="number"?n.roomsWithNoLinks:_.length,noTunnelRoomKeys:_.slice(0,50),medianRoomDegree:R,hasResolvableEdges:h>0}}function kg(i,e={}){const{edgesResolved:t,graphEdges:n,graphSummary:r=null,overviewStats:s=null}=e;return t!=null&&t.length?Bg(i,t,r,s):zg(n||[],i,r,s)}function ml(i){const e=[...i.values()].sort((n,r)=>n-r);if(!e.length)return null;const t=Math.floor(e.length/2);return e.length%2?e[t]:(e[t-1]+e[t])/2}function Hg(i,e){var u;if(!e||!i)return null;const t=e.degreeByKey.get(i)??0,n=e.crossByKey.get(i)??0,r=e.intraByKey.get(i)??0,s=e.neighborsByKey.get(i),a=s?[...s]:[],o=a.slice(0,12).map(f=>{const d=ri(f),m=e.degreeByKey.get(f)??0;return{wing:(d==null?void 0:d.wingId)??f.split("/")[0],room:(d==null?void 0:d.roomName)??f.slice(f.indexOf("/")+1),key:f,degree:m}});o.sort((f,d)=>d.degree-f.degree);const c=new Map;for(const f of a){const d=(u=ri(f))==null?void 0:u.wingId;d&&c.set(d,(c.get(d)||0)+1)}const l=[...c.entries()].sort((f,d)=>d[1]-f[1]).slice(0,8).map(([f,d])=>({wing:f,links:d}));return{degree:t,crossWingLinks:n,intraWingLinks:r,medianDegree:e.medianRoomDegree,relatedRooms:o.slice(0,8),relatedWings:l,isBridge:n>=1&&a.length>0}}function pc(i,e){if(!i||!Array.isArray(e))return{degree:0,crossWingLinks:0,intraWingLinks:0,byType:{},relatedRoomKeys:[]};let t=0,n=0,r=0;const s={},a=[];for(const o of e){const c=o.sourceRoomId,l=o.targetRoomId;if(!c||!l||c!==i&&l!==i)continue;t+=1;const u=o.relationshipType||"tunnel";s[u]=(s[u]||0)+1,o.sourceWingId!=null&&o.targetWingId!=null&&o.sourceWingId!==o.targetWingId?n+=1:r+=1,a.push(c===i?l:c)}return{degree:t,crossWingLinks:n,intraWingLinks:r,byType:s,relatedRoomKeys:[...new Set(a)]}}function mc(i,e){const t={};let n=0;for(const r of e||[]){if(!r.sourceWingId||!r.targetWingId||!(r.sourceWingId===i||r.targetWingId===i))continue;const a=r.relationshipType||"tunnel";t[a]=(t[a]||0)+1,r.sourceWingId!==r.targetWingId&&(n+=1)}return{byType:t,crossWingTouches:n}}function Gg(i,e,t,n=null){if(n!=null&&n.length)return Wg(i,n);const r=Array.isArray(e)?e:[],s=new Map;let a=0;for(const u of r){const f=rn(u.from,t,i),d=rn(u.to,t,u.wing||null);if(!f||!d||f.wing===d.wing||f.wing!==i&&d.wing!==i)continue;a+=1;const m=f.wing===i?d:f;s.set(m.wing,(s.get(m.wing)||0)+1)}const o=[...s.entries()].sort((u,f)=>f[1]-u[1]).slice(0,6).map(([u,f])=>({wing:u,edges:f})),c=new Map;for(const u of r){const f=rn(u.from,t,i),d=rn(u.to,t,u.wing||null);!f||!d||(f.wing===i&&d.wing!==i&&c.set(f.key,(c.get(f.key)||0)+1),d.wing===i&&f.wing!==i&&c.set(d.key,(c.get(d.key)||0)+1))}const l=[...c.entries()].sort((u,f)=>f[1]-u[1]).slice(0,5).map(([u,f])=>{const d=ri(u);return{wing:(d==null?void 0:d.wingId)??u.split("/")[0],room:(d==null?void 0:d.roomName)??u.slice(u.indexOf("/")+1),key:u,crossEdges:f}});return{crossWingTouches:a,topExternalWings:o,topRoomsByCrossWing:l}}function Wg(i,e){const t=new Map;let n=0;for(const o of e){if(o.sourceWingId===o.targetWingId||o.sourceWingId!==i&&o.targetWingId!==i)continue;n+=1;const c=o.sourceWingId===i?o.targetWingId:o.sourceWingId;t.set(c,(t.get(c)||0)+1)}const r=[...t.entries()].sort((o,c)=>c[1]-o[1]).slice(0,6).map(([o,c])=>({wing:o,edges:c})),s=new Map;for(const o of e)o.sourceWingId!==o.targetWingId&&(o.sourceWingId===i&&o.targetWingId!==i&&s.set(o.sourceRoomId,(s.get(o.sourceRoomId)||0)+1),o.targetWingId===i&&o.sourceWingId!==i&&s.set(o.targetRoomId,(s.get(o.targetRoomId)||0)+1));const a=[...s.entries()].sort((o,c)=>c[1]-o[1]).slice(0,5).map(([o,c])=>{const l=ri(o);return{wing:(l==null?void 0:l.wingId)??o.split("/")[0],room:(l==null?void 0:l.roomName)??o.slice(o.indexOf("/")+1),key:o,crossEdges:c}});return{crossWingTouches:n,topExternalWings:r,topRoomsByCrossWing:a}}function bo(i){let e=0;for(const t of Object.values(i||{}))Array.isArray(t)&&(e+=t.length);return e}function gl(i,e){const t=i==null?void 0:i[e];return Array.isArray(t)?t.reduce((n,r)=>n+(Number(r.drawers)||0),0):0}function Vg(i){let e=0;for(const t of Object.values(i||{}))typeof t=="number"&&(e+=t);return e}function To(i){const e=Object.entries(i||{}).filter(([,t])=>typeof t=="number");return e.sort((t,n)=>n[1]-t[1]),e.map(([t,n],r)=>({wing:t,rank:r+1,drawers:n}))}function Xg(i){const e=Object.entries(i||{}).map(([t,n])=>({wing:t,roomCount:Array.isArray(n)?n.length:0}));return e.sort((t,n)=>n.roomCount-t.roomCount),e.map((t,n)=>({...t,rank:n+1}))}function wo(i,e){const t=i==null?void 0:i[e];return Array.isArray(t)?[...t].sort((r,s)=>(s.drawers||0)-(r.drawers||0)).map((r,s)=>({...r,rank:s+1})):[]}function On(i){const e=i%10,t=i%100;return t>=11&&t<=13?`${i}th`:e===1?`${i}st`:e===2?`${i}nd`:e===3?`${i}rd`:`${i}th`}function ss(i,e,t=1){return e==null||e<=0||i==null?null:(100*(Number(i)/e)).toFixed(t)}function $g({drawers:i=0,wingRoomSum:e,palaceTotal:t},n,r){const s=(n==null?void 0:n.degree)??0,a=(n==null?void 0:n.crossWingLinks)??0,o=(n==null?void 0:n.intraWingLinks)??0,c=(n==null?void 0:n.medianDegree)??null,l=e>0&&i>=e*.2,u=e>0&&i<=e*.05&&i>0,f=c!=null&&s>=c*2&&s>=2,d=s===0;return r?d?{label:"Isolated room",detail:"This room does not appear on any resolved tunnel edge (or naming does not match graph endpoints)."}:a>=2&&f?{label:"Dense cross-wing connector",detail:"High tunnel degree with multiple cross-wing links."}:a>=1&&f?{label:"Highly connected hub",detail:"Above-average tunnel degree with cross-wing reach."}:a>=1&&o<=1?{label:"Cross-wing bridge",detail:"Most links span outside this wing."}:l&&s<=(c||1)?{label:"Large but weakly connected",detail:"Many drawers relative to the wing, few tunnel links."}:u&&f?{label:"Small but structurally important",detail:"Fewer drawers than peers, but high connectivity."}:f?{label:"Highly connected hub",detail:c!=null?`Degree ${s} vs median ${c}.`:`Degree ${s}.`}:t>0&&i/t>=.08&&s<2?{label:"Major archive, few tunnels",detail:"Large share of palace drawers with sparse tunnels."}:{label:"Balanced footprint",detail:"Typical size and connectivity for this palace."}:{label:"Tunnel graph unavailable",detail:"No resolvable tunnel edges for the loaded taxonomy, or graph-stats returned empty."}}function jg(i,e){const{totalDrawers:t,wingCount:n,roomCount:r,tunnelNodeCount:s,graphEdgeCount:a,kgAvailable:o,kgSummary:c,ga:l,wingsData:u}=i,f=To(u).slice(0,5),d={wings:"Wing spheres are sized by drawer count. Click a wing to open its rooms.",rooms:i.focusWing?`Focused on “${i.focusWing}”: rooms orbit the wing. Click another wing in “all rooms” layout or use search.`:"Each cluster is a wing; rooms orbit their wing. Click a room to inspect and center.",graph:"Force-directed graph. Edges combine tunnel links and same-wing taxonomy adjacency."};let m="";return!l.hasResolvableEdges&&a===0?m="No graph edges loaded.":l.hasResolvableEdges?l.crossFraction!=null&&(m=l.crossFraction>=.5?"Cross-wing tunnel links account for a large share of resolved graph edges.":"Resolved edges mix same-wing taxonomy adjacency with cross-wing tunnels."):m="Graph metadata is present but endpoints could not be matched to taxonomy rooms (check naming).",{totalDrawers:t,wingCount:n,roomCount:r,tunnelNodeCount:s,graphEdgeCount:a,crossWingEdges:l.crossWingEdgeCount,kgAvailable:o,kgSummary:c,largestWingsByDrawers:f,mostConnectedRooms:l.topConnectedRooms.slice(0,5),mostCrossLinkedWings:l.topCrossLinkedWings.slice(0,5),roomsWithNoTunnels:l.roomsWithNoTunnels,viewHint:d[e]||d.wings,graphBlurb:m,ga:l}}const qg=new Set(["wings","rooms","graph"]);function Yg(i){return i==null||typeof i!="object"?null:i}function Kg(i){const e=Yg(i);return e?{view:qg.has(e.view)?e.view:"wings",currentWing:typeof e.currentWing=="string"?e.currentWing:e.currentWing??null,currentRoom:typeof e.currentRoom=="string"?e.currentRoom:e.currentRoom??null,selected:e.selected&&typeof e.selected=="object"?e.selected:null,pinned:!!e.pinned,searchQuery:typeof e.searchQuery=="string"?e.searchQuery:"",labels:e.labels,rotate:e.rotate,motion:e.motion}:{view:"wings",currentWing:null,currentRoom:null,selected:null,pinned:!1,searchQuery:"",labels:void 0,rotate:void 0,motion:void 0}}function Zg(i,e){var r,s;const t=(e==null?void 0:e.wingsData)||{},n=(e==null?void 0:e.roomsData)||{};if(i.currentWing&&!Bi(t,i.currentWing)&&(i.currentWing=null,i.currentRoom=null,i.selected=null,i.pinned=!1),i.currentRoom&&i.currentWing&&(ur(n,i.currentWing,i.currentRoom)||(i.currentRoom=null,((r=i.selected)==null?void 0:r.type)==="room"&&(i.selected=null,i.pinned=!1))),(s=i.selected)!=null&&s.id){const a=i.selected;a.type==="wing"&&!Bi(t,a.name)&&(i.selected=null,i.pinned=!1),a.type==="room"&&(!a.wing||!ur(n,a.wing,a.name))&&(i.selected=null,i.pinned=!1)}i.pinned&&!i.selected&&(i.pinned=!1)}const Ao="mempalace-viz-explorer-v1",_l="mempalace-viz-panel-state-v1";let Yt=new Set;const Wn=[{id:"wings",title:"Wings",hint:"High-level structure by domain or project."},{id:"rooms",title:"Rooms",hint:"Rooms within each wing, orbiting their parent."},{id:"graph",title:"Graph",hint:"Tunnel relationships across rooms."}],j={view:"wings",hovered:null,selected:null,pinned:!1,currentWing:null,currentRoom:null,searchQuery:"",filters:{visibleWings:null}};let _e=null,ne=null,gc=null,_c=null,Jn=null,vc=null;const le=i=>document.getElementById(i);function xc(i){if(!i||!(i instanceof HTMLElement))return!1;const e=i.tagName;return!!(e==="INPUT"||e==="TEXTAREA"||e==="SELECT"||i.isContentEditable)}function Jg(i,e=5200){const t=le("toast-host");t&&(clearTimeout(vc),t.innerHTML=`<div class="toast" role="status">${Je(i)}</div>`,vc=setTimeout(()=>{t.innerHTML=""},e))}function Qg(i){var s,a,o;if(j.view!=="graph")return"";const e=ne==null?void 0:ne.graphStats,t=ne==null?void 0:ne.graph,n=((s=ne==null?void 0:ne.graphEdges)==null?void 0:s.length)??0,r=Array.isArray(t==null?void 0:t.edgesUnresolved)?t.edgesUnresolved.length:Array.isArray(e==null?void 0:e.edgesUnresolved)?e.edgesUnresolved.length:null;if(!n)return'<div class="inspect-card inspect-card--hint" role="status"><strong>Graph view</strong><p class="inspect-muted inspect-muted--tight">No graph edges were returned from graph-stats. Wings and rooms may still appear if taxonomy is loaded.</p></div>';if(!((a=i.ga)!=null&&a.hasResolvableEdges)){const c=r??Og(ne==null?void 0:ne.graphEdges,ne==null?void 0:ne.roomsData,((o=t==null?void 0:t.edgesUnresolved)==null?void 0:o.length)??null);return`<div class="inspect-card inspect-card--hint" role="status"><strong>Graph view</strong><p class="inspect-muted inspect-muted--tight">Loaded ${n} graph edge${n===1?"":"s"}, but endpoints could not be fully matched to taxonomy rooms${c?` (${c} edge${c===1?"":"s"} unresolved).`:"."} Layout may be sparse.</p></div>`}return""}function e_(){return!!(j.pinned&&j.selected)}function Je(i){return String(i??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function Ve(i){return i==null||Number.isNaN(Number(i))?"—":Number(i).toLocaleString()}function t_(i){if(!i||typeof i!="object")return null;const e=[];for(const[t,n]of Object.entries(i))t!=="error"&&(typeof n=="number"?e.push(`${t}: ${Ve(n)}`):typeof n=="string"&&e.push(`${t}: ${n}`));return e.length?e.slice(0,8).join(" · "):null}function Ro(){var L,R,Y,M;const i=ne==null?void 0:ne.status,e=(ne==null?void 0:ne.wingsData)||{},t=(ne==null?void 0:ne.roomsData)||{},n=(ne==null?void 0:ne.graphEdges)||[],r=ne==null?void 0:ne.graphStats,s=ne==null?void 0:ne.graph,a=(L=s==null?void 0:s.edgesResolved)!=null&&L.length?s.edgesResolved:(r==null?void 0:r.edgesResolved)||[],o=ne==null?void 0:ne.kgStats,c=(ne==null?void 0:ne.overviewStats)??((R=ne==null?void 0:ne.overviewBundle)==null?void 0:R.stats),l=(ne==null?void 0:ne.graphMeta)??((Y=ne==null?void 0:ne.graph)==null?void 0:Y.graphMeta)??(r==null?void 0:r.graphMeta)??((M=ne==null?void 0:ne.overviewBundle)==null?void 0:M.graphMeta),u=typeof(i==null?void 0:i.total_drawers)=="number"?i.total_drawers:typeof(c==null?void 0:c.totalDrawers)=="number"?c.totalDrawers:Vg(e),f=typeof(c==null?void 0:c.totalWings)=="number"?c.totalWings:Object.keys(e).length,d=typeof(c==null?void 0:c.totalRooms)=="number"?c.totalRooms:bo(t);let m=0;const _=(s==null?void 0:s.summary)??(r==null?void 0:r.summary);(_==null?void 0:_.resolvedEdgeCount)!=null?m=_.resolvedEdgeCount:r!=null&&r.tunnels&&typeof r.tunnels=="object"&&(m=Object.keys(r.tunnels).length);const g=typeof(_==null?void 0:_.resolvedEdgeCount)=="number"?_.resolvedEdgeCount:n.length,p=kg(t,{edgesResolved:a,graphEdges:n,graphSummary:_??null,overviewStats:c??null}),h=t_(o),E=!!(o&&typeof o=="object"&&!o.error),x=yo(n),b=ug(a,Yt),I=Eo(Yt,x)!==null;return{status:i,wingsData:e,roomsData:t,graphEdges:n,graphStats:r,edgesResolved:a,kgStats:o,totalDrawers:u,wingCount:f,roomCount:d,tunnelNodeCount:m,graphEdgeCount:g,ga:p,kgAvailable:E,kgSummary:h,focusWing:j.currentWing,overviewStats:c,graphMeta:l,summary:_,availableRelationshipTypes:x,visibleGraphSummary:b,graphFilterNarrowed:I}}function n_(){try{const i=localStorage.getItem(fl);return i?JSON.parse(i):null}catch{return null}}function vl(i){try{localStorage.setItem(fl,JSON.stringify({enabledTypes:[...i||[]]}))}catch{}}function i_(){const i=(ne==null?void 0:ne.graphEdges)||[],e=yo(i),t=n_(),n=t==null?void 0:hg(t);Yt=cg(n,e),vl(Yt),_e==null||_e.setRelationshipFilters(Eo(Yt,e))}function r_(i){const e=yo((ne==null?void 0:ne.graphEdges)||[]);!i||!e.includes(i)||(Yt.has(i)?Yt.delete(i):Yt.add(i),vl(Yt),_e==null||_e.setRelationshipFilters(Eo(Yt,e)),Dt(),ui(),li())}function li(){const i=le("graph-view-extras");if(!i)return;const e=j.view==="graph"&&!!ne&&!ne.error;if(i.hidden=!e,!e)return;const t=Ro(),n=t.availableRelationshipTypes||[],r=le("graph-rel-chips");r&&(n.length?r.innerHTML=n.map(o=>{const c=ao(o),l=Yt.has(o),u=o==="tunnel"?"#5b8cff":o==="taxonomy_adjacency"?"#3dc9b8":"#a78bfa";return`<button type="button" class="rel-chip ${l?"is-on":""}" data-rel-type="${Je(o)}" title="${Je(c.description)}">
          <span class="rel-chip__swatch" style="background:${u}"></span>
          <span>${Je(c.shortLabel)}</span>
        </button>`}).join(""):r.innerHTML='<span class="inspect-muted">No typed edges in this graph.</span>');const s=le("graph-status-pill");if(s){const o=t.graphFilterNarrowed,c=t.visibleGraphSummary,l=dg(t.graphMeta,t.summary),u=o?`Visible edges: ${Ve(c.visibleEdgeCount)} (filtered)`:`Edges: ${Ve(t.graphEdgeCount)} (all types)`;s.innerHTML=`<span class="graph-status-pill__primary">${Je(u)}</span>${l?`<span class="graph-status-pill__hint">${Je(l.length>240?`${l.slice(0,240)}…`:l)}</span>`:""}`}const a=le("graph-legend-compact");a&&(a.innerHTML=n.length?n.map(o=>{const c=ao(o);return`<div class="graph-legend-compact__row"><span class="legend-swatch" style="background:${o==="tunnel"?"#5b8cff":o==="taxonomy_adjacency"?"#3dc9b8":"#a78bfa"}"></span><span><strong>${Je(c.shortLabel)}</strong> — ${Je(c.description)}</span></div>`}).join(""):"")}function Kt(i,e,t){const n=e&&String(e).trim()?e:`<p class="inspect-empty">${Je("No data.")}</p>`;return`
    <section class="inspect-section">
      <h3 class="inspect-section__title">${Je(i)}</h3>
      <div class="inspect-section__body">${n}</div>
    </section>`}function xl(i){return i==null||Number.isNaN(Number(i))?"":`<div class="inspect-bar" aria-hidden="true"><div class="inspect-bar__fill" style="width:${Math.min(100,Math.max(0,Number(i)))}%"></div></div>`}function Tn(i,e,t){return`<button type="button" class="inspect-row inspect-row--action"${Object.entries(t||{}).map(([s,a])=>` data-${s}="${Je(String(a))}"`).join("")}>
    <span class="inspect-row__main">${Je(i)}</span>
    <span class="inspect-row__meta">${Je(e)}</span>
  </button>`}function s_(i){var f,d,m,_;const e=jg(i,j.view),t=e.ga.byRelationshipType&&Object.keys(e.ga.byRelationshipType).length?Object.entries(e.ga.byRelationshipType).map(([g,p])=>`${g}: ${Ve(p)}`).join(" · "):"",n=(d=(f=i.graphMeta)==null?void 0:f.truncatedSources)!=null&&d.length?i.graphMeta.truncatedSources.map(g=>{const p=g.totalMatching!=null&&g.totalMatching!==""?Ve(g.totalMatching):"unknown",h=g.inferred?" (heuristic)":"";return`${g.source} limit ${Ve(g.limit)} · ${p} rows reported${h}`}).join("; "):"",r=(((m=i.graphMeta)==null?void 0:m.completenessNotes)||[]).filter(Boolean).join(" "),s=e.kgAvailable?e.kgSummary||"—":"Knowledge graph statistics are unavailable from the current API.",a=e.largestWingsByDrawers.map(g=>Tn(g.wing,`${Ve(g.drawers)} drawers · #${g.rank}`,{"inspect-action":"go-wing",wing:g.wing})).join(""),o=e.mostConnectedRooms.length?e.mostConnectedRooms.map(g=>Tn(`${g.room}`,`${g.wing} · degree ${g.degree}`,{"inspect-action":"select-room",wing:g.wing,room:g.room})).join(""):"",c=e.mostCrossLinkedWings.length?e.mostCrossLinkedWings.map(g=>Tn(g.wing,`${Ve(g.crossEdges)} cross-wing edges`,{"inspect-action":"go-wing",wing:g.wing})).join(""):"",l=[`Palace scale: ${Ve(e.totalDrawers)} drawers across ${Ve(e.wingCount)} wings and ${Ve(e.roomCount)} rooms.`,e.tunnelNodeCount?`Graph summary: ${Ve(e.graphEdgeCount)} resolved undirected edges (all relationship types).`:"No graph edges in graph-stats.",e.graphBlurb].filter(Boolean).join(" "),u=j.view==="graph"&&((_=i.ga)!=null&&_.hasResolvableEdges)?i.graphFilterNarrowed?`<div class="inspect-card inspect-card--hint" role="status"><strong>Graph filters active</strong><p class="inspect-muted inspect-muted--tight">Visible: ${Ve(i.visibleGraphSummary.visibleEdgeCount)} edges (${pr(i.visibleGraphSummary.visibleByType)||"—"}). Inspector “visible” rows match the scene. Footer and resolved totals above remain global.</p></div>`:'<div class="inspect-card inspect-card--hint" role="status"><strong>Graph view</strong><p class="inspect-muted inspect-muted--tight">Brighter blue edges = cross-wing tunnels; softer teal = inferred same-wing adjacency. Narrow types in the left panel.</p></div>':"";return`
    <div class="inspect-stack">
      <div class="inspect-card inspect-card--hero">
        <span class="badge">Overview</span>
        <p class="inspect-lead">${Je(e.viewHint)}</p>
        <p class="inspect-muted">${Je(l)}</p>
      </div>
      ${u}
      ${Kt("Palace summary",`
        <div class="meta-block">
          ${ot("Total drawers",Ve(e.totalDrawers))}
          ${ot("Wings",Ve(e.wingCount))}
          ${ot("Rooms (taxonomy)",Ve(e.roomCount))}
          ${ot("Resolved graph edges",Ve(e.graphEdgeCount))}
          ${ot("Edge types",t||"—")}
          ${ot("Cross-wing (tunnels)",e.ga.hasResolvableEdges?Ve(e.crossWingEdges):"—")}
          ${ot("Rooms with no graph links",e.ga.hasResolvableEdges?Ve(e.roomsWithNoTunnels):"—")}
          ${ot("Upstream truncation",n||"none")}
        </div>
        ${r?`<p class="inspect-muted inspect-muted--tight">${Je(r)}</p>`:""}
        <p class="inspect-muted inspect-muted--tight">${Je(s)}</p>
        `)}
      ${Kt("Largest wings",`<div class="inspect-rows">${a||'<p class="inspect-empty">No wing counts available.</p>'}</div>`)}
      ${Kt("Most connected rooms",o||'<p class="inspect-empty">No resolvable tunnel edges, or graph endpoints do not match room names.</p>')}
      ${Kt("Most cross-linked wings",c||'<p class="inspect-empty">No cross-wing tunnel edges resolved.</p>')}
      <div class="inspect-card inspect-card--hint">
        <strong>How to explore</strong>
        <p class="inspect-muted inspect-muted--tight">Use <kbd>1</kbd>–<kbd>3</kbd> to switch views. Click wings and rooms to drill in; Pin keeps the inspector fixed. Search dims non-matching nodes.</p>
      </div>
    </div>`}function o_(i,e,t){var me;const{wingsData:n,roomsData:r,totalDrawers:s,ga:a,graphEdges:o}=i,c=Number(n[e])||0,l=r[e]||[],u=l.length,f=To(n),d=f.find(z=>z.wing===e),m=Xg(r),_=m.find(z=>z.wing===e),g=ss(c,s),p=bo(r),h=ss(u,p),E=gl(r,e),x=E>0?E:c,b=u?(x/u).toFixed(1):null,I=wo(r,e),L=I[0],R=I.length>1?I[I.length-1]:null,Y=[g!=null&&d?`This wing holds ${g}% of all drawers and is the ${On(d.rank)} largest wing by drawer count.`:null,h!=null&&_&&u?`It ranks ${On(_.rank)} among wings by room count (${h}% of all rooms).`:null].filter(Boolean).join(" "),M=Gg(e,o,r,i.edgesResolved),T=i.edgesResolved||[],F=So(T,Yt),U=mc(e,T),k=mc(e,F),w=(()=>{if(!i.graphFilterNarrowed||!a.hasResolvableEdges)return"";const z=U.byType.tunnel||0,te=k.byType.tunnel||0,xe=U.byType.taxonomy_adjacency||0,Se=k.byType.taxonomy_adjacency||0;return te>Se*2&&z>0?"With current filters, this wing shows mostly cross-wing tunnel links.":Se>te*2&&xe>0?"With current filters, visible links here are mostly inferred same-wing adjacency.":k.crossWingTouches===0&&M.crossWingTouches>0?"Cross-wing tunnel links are hidden by filters; only same-wing structure may be visible.":""})(),B=M.crossWingTouches>0?`
      ${ot("Cross-wing tunnel touches",Ve(M.crossWingTouches))}
      <div class="inspect-rows">
        ${M.topExternalWings.map(z=>Tn(z.wing,`${Ve(z.edges)} edges`,{"inspect-action":"go-wing",wing:z.wing})).join("")}
      </div>`:"",H=M.topRoomsByCrossWing.map(z=>Tn(z.room,`cross-wing ${Ve(z.crossEdges)}`,{"inspect-action":"select-room",wing:z.wing,room:z.room})).join(""),J=I.slice(0,5).map(z=>Tn(z.name,`${Ve(z.drawers)} drawers`,{"inspect-action":"select-room",wing:e,room:z.name})),Z=[...l].map(z=>{const te=z.roomId||Gt(e,z.name),xe=a.degreeByKey.get(te)??0;return{...z,deg:xe}}).sort((z,te)=>te.deg-z.deg).slice(0,5),q=Z.length?Z.map(z=>Tn(z.name,`degree ${z.deg}`,{"inspect-action":"select-room",wing:e,room:z.name})).join(""):"",ee=u===0?'<p class="inspect-empty">This wing has no room-level drawer breakdown in taxonomy.</p>':`
      ${ot("Rooms listed",Ve(u))}
      ${ot("Drawers (wing total)",Ve(c))}
      ${b!=null?ot("Avg drawers / room",b):""}
      ${L?ot("Largest room",`${L.name} (${Ve(L.drawers)})`):""}
      ${R&&R.name!==(L==null?void 0:L.name)?ot("Smallest room",`${R.name} (${Ve(R.drawers)})`):""}
    `;return`
    <div class="inspect-stack">
      ${j.view==="graph"?'<p class="inspect-muted inspect-muted--tight">Graph view: node positions are layout-only; drawer ranks use taxonomy and wings API.</p>':""}
      <div class="inspect-card inspect-card--hero">
        <span class="badge">Wing</span>
        <div class="inspect-title">${Je(e)}</div>
        <p class="inspect-lead">${Je(Y||"Wing footprint in the palace.")}</p>
        ${g!=null?`<div class="inspect-pct"><span>${g}% of palace drawers</span>${xl(g)}</div>`:""}
      </div>
      ${Kt("Summary",`
        <div class="meta-block">
          ${ot("Drawer count",Ve(c))}
          ${ot("Rank by drawers",d?`${On(d.rank)} of ${f.length}`:"—")}
          ${ot("Rooms",Ve(u))}
          ${ot("Rank by room count",_?`${On(_.rank)} of ${m.length}`:"—")}
        </div>`)}
      ${Kt("Structure",`<div class="meta-block">${ee}</div>`)}
      ${Kt("Connections",a.hasResolvableEdges?`<div class="meta-block">
          ${ot("Edge types (global)",pr(U.byType)||"—")}
          ${i.graphFilterNarrowed?ot("Edge types (visible)",pr(k.byType)||"—"):""}
          ${i.graphFilterNarrowed?ot("Cross-wing touches (visible)",Ve(k.crossWingTouches)):""}
        </div>
        ${w?`<p class="inspect-muted inspect-muted--tight">${Je(w)}</p>`:""}
        ${B||'<p class="inspect-empty">No cross-wing tunnel relationships touch this wing.</p>'}
             ${H?`<p class="inspect-micro">Rooms with cross-wing links (global)</p><div class="inspect-rows">${H}</div>`:""}`:'<p class="inspect-empty">No tunnel relationships could be resolved against taxonomy rooms.</p>')}
      ${Kt("Related rooms",`<p class="inspect-micro">Largest by drawers</p><div class="inspect-rows">${J.join("")}</div>
         ${q?`<p class="inspect-micro">Most connected (tunnels)</p><div class="inspect-rows">${q}</div>`:'<p class="inspect-empty">No graph degree for rooms in this wing.</p>'}`)}
      ${Kt("Health / graph insight",`<p class="inspect-muted">${Je(((me=a.topCrossLinkedWings[0])==null?void 0:me.wing)===e?"This wing is among the most cross-linked in the tunnel graph.":M.crossWingTouches>0?"Participates in cross-wing tunnels; see Connections for peers.":u>0?"No cross-wing tunnel edges touch this wing in the current graph.":"Add taxonomy rooms to compare structure.")}</p>`)}
    </div>`}function a_(i,e,t,n){const{wingsData:r,roomsData:s,totalDrawers:a,ga:o}=i,c=s[e]||[],l=c.find(q=>q.name===t),u=l?Number(l.drawers)||0:null,f=Number(r[e])||0,d=gl(s,e),m=d>0?d:f,_=wo(s,e),g=_.find(q=>q.name===t),p=u!=null&&m>0?ss(u,m):null,h=u!=null&&a>0?ss(u,a):null,E=[g&&p!=null?`This room is the ${On(g.rank)} largest in “${e}” by drawers and holds about ${p}% of that wing’s drawers (by room list).`:null,h!=null?`It is ${h}% of the entire palace by drawers.`:null].filter(Boolean).join(" "),x=Gt(e,t),b=Hg(x,o),I=o.hasResolvableEdges,L=i.edgesResolved||[],R=So(L,Yt),Y=pc(x,L),M=pc(x,R),T=fg(M.byType,Y.byType),F=$g({drawers:u??0,wingRoomSum:m,palaceTotal:a},b,I),U=m>0&&c.length?m/c.length:null,k=u!=null&&U!=null?u>=U*1.1?"Above wing average size":u<=U*.9?"Below wing average size":"Near wing average size":"—",w=((b==null?void 0:b.relatedRooms)||[]).filter(q=>!(q.wing===e&&q.room===t)).slice(0,6),B=w.length?w.map(q=>Tn(`${q.room}`,`${q.wing} · deg ${q.degree}`,{"inspect-action":"select-room",wing:q.wing,room:q.room})).join(""):"",H=((b==null?void 0:b.relatedWings)||[]).filter(q=>q.wing!==e).slice(0,6).map(q=>Tn(q.wing,`${Ve(q.links)} tunnel link${q.links===1?"":"s"}`,{"inspect-action":"go-wing",wing:q.wing})).join(""),J=b&&b.isBridge?"Acts as a bridge: at least one cross-wing tunnel edge is incident to this room.":"No bridge pattern detected (no cross-wing edges on this room).";return`
    <div class="inspect-stack">
      ${j.view==="graph"?'<p class="inspect-muted inspect-muted--tight">Graph view: layout is force-directed; tunnel metrics match the same resolved edges as Rooms/Wings.</p>':""}
      <div class="inspect-card inspect-card--hero">
        <span class="badge">Room</span>
        <div class="inspect-title">${Je(t)}</div>
        <p class="inspect-lead">${Je(E||"Room in the palace taxonomy.")}</p>
        ${p!=null?`<div class="inspect-pct"><span>${p}% of wing drawers (room list)</span>${xl(p)}</div>`:""}
      </div>
      ${Kt("Summary",`
        <div class="meta-block">
          ${ot("Parent wing",Je(e))}
          ${ot("Drawers",u!=null?Ve(u):"—")}
          ${ot("Share of palace",h!=null?`${h}%`:"—")}
        </div>`)}
      ${Kt("Position in wing",c.length?`
        <div class="meta-block">
          ${ot("Rank in wing (by drawers)",g?`${On(g.rank)} of ${_.length}`:"—")}
          ${ot("Wing avg drawers / room",U!=null?U.toFixed(1):"—")}
          ${ot("vs average",k)}
        </div>`:'<p class="inspect-empty">This wing has no room-level drawer breakdown.</p>')}
      ${Kt("Connections",I&&b?`
        <div class="meta-block">
          ${ot(i.graphFilterNarrowed?"Degree (visible)":"Degree (global)",Ve(M.degree))}
          ${i.graphFilterNarrowed?ot("Degree (global)",Ve(Y.degree)):""}
          ${ot(i.graphFilterNarrowed?"Cross-wing (visible)":"Cross-wing links",Ve(M.crossWingLinks))}
          ${i.graphFilterNarrowed?ot("Cross-wing (global)",Ve(Y.crossWingLinks)):""}
          ${ot(i.graphFilterNarrowed?"Intra-wing (visible)":"Intra-wing links",Ve(M.intraWingLinks))}
          ${i.graphFilterNarrowed?ot("Intra-wing (global)",Ve(Y.intraWingLinks)):""}
          ${ot("Relationship mix (global)",pr(Y.byType)||"—")}
          ${i.graphFilterNarrowed?ot("Relationship mix (visible)",pr(M.byType)||"—"):""}
          ${ot("Median degree (all rooms)",b.medianDegree!=null?Ve(b.medianDegree):"—")}
        </div>
        ${T?`<p class="inspect-muted inspect-muted--tight">${Je(T)}</p>`:""}
        <p class="inspect-muted inspect-muted--tight">${Je(J)}</p>
        ${B?`<p class="inspect-micro">Related rooms (global graph)</p><div class="inspect-rows">${B}</div>`:'<p class="inspect-empty">No tunnel neighbors found for this room.</p>'}
        ${H?`<p class="inspect-micro">Related wings (global graph)</p><div class="inspect-rows">${H}</div>`:""}
        `:'<p class="inspect-empty">No tunnel relationships available for this room (unresolved graph or empty tunnels).</p>')}
      ${Kt("Insight",`<p class="insight-chip">${Je(F.label)}</p><p class="inspect-muted inspect-muted--tight">${Je(F.detail)}</p>`)}
    </div>`}function c_(i){const e=i.target.closest("[data-inspect-action]");if(!e)return;const t=e.getAttribute("data-inspect-action"),n=e.getAttribute("data-wing"),r=e.getAttribute("data-room");if(t==="go-wing"&&n){yl(n);return}t==="select-room"&&n&&r&&l_(n,r)}function l_(i,e){var r;if(hs(),!ne||!Bi(ne.wingsData,i)||!ur(ne.roomsData,i,e))return;const t=ne.roomsData[i],n=Array.isArray(t)?t.find(s=>s.name===e):null;j.currentWing=i,j.currentRoom=e,j.selected={id:`room:${i}:${e}`,type:"room",name:e,wing:i,wingId:i,roomId:(n==null?void 0:n.roomId)||Gt(i,e),drawers:n==null?void 0:n.drawers},j.pinned=!1,j.view="rooms",_e==null||_e.setView("rooms",i),Ht(),_e==null||_e.centerOnNodeId(`room:${i}:${e}`),$i(),le("view-helper-text").textContent=((r=Wn.find(s=>s.id==="rooms"))==null?void 0:r.hint)||"",li(),ui(),Dt(),Lt()}function u_(i){if(!i||i.type==="center"||!i.id)return null;const e=i.wingId??i.wing,t=i.roomId??(i.type==="room"&&e&&i.name!=null?Gt(e,i.name):null);return{id:i.id,type:i.type,name:i.name,wing:e,wingId:e,roomId:t,drawers:i.drawers}}function h_(){try{const i=localStorage.getItem(Ao);return i?JSON.parse(i):null}catch{return null}}function Lt(){clearTimeout(_c),_c=setTimeout(()=>{var i,e,t;try{const n={view:j.view,currentWing:j.currentWing,currentRoom:j.currentRoom,selected:j.selected,pinned:j.pinned,searchQuery:j.searchQuery,labels:((i=le("toggle-labels"))==null?void 0:i.checked)??!0,rotate:((e=le("toggle-rotate"))==null?void 0:e.checked)??!0,motion:Number(((t=le("motion-range"))==null?void 0:t.value)??1)};localStorage.setItem(Ao,JSON.stringify(n))}catch{}},200)}function Mc(){ne&&Zg(j,ne)}function d_(i){i&&(i.labels!==void 0&&le("toggle-labels")&&(le("toggle-labels").checked=!!i.labels),i.rotate!==void 0&&le("toggle-rotate")&&(le("toggle-rotate").checked=!!i.rotate),i.motion!==void 0&&le("motion-range")&&(le("motion-range").value=String(i.motion)),i.searchQuery!==void 0&&le("search-wings")&&(le("search-wings").value=i.searchQuery))}function f_(i){if(i==null)return;const e=Kg(i);j.view=e.view,j.currentWing=e.currentWing,j.currentRoom=e.currentRoom,j.selected=e.selected,j.pinned=e.pinned,j.searchQuery=e.searchQuery}function Ht(){var i;_e==null||_e.updatePresentation({searchQuery:j.searchQuery,selectedId:((i=j.selected)==null?void 0:i.id)??null,pinActive:j.pinned})}function qr(i,e){const t=le("conn-status");t&&(t.dataset.state=i,t.textContent=e)}function Kr(i){var e;(e=le("loading-overlay"))==null||e.classList.toggle("is-hidden",!i)}function p_(i,e){var n;Kr(!0);const t=le("loading-overlay");t&&(t.innerHTML=`
    <div class="err-box">
      <strong>Unable to load data</strong>
      <p>${Je(i)}</p>
      ${`<code>${Je(e)}</code>`}
      <p style="margin-top:10px;color:#94a3b8;font-size:0.76rem;">Start the API bridge from the project folder:</p>
      <code style="margin-top:4px;">node server.js</code>
      <div class="btn-row">
        <button type="button" class="btn btn--ghost" id="err-retry">Retry</button>
      </div>
    </div>
  `,(n=le("err-retry"))==null||n.addEventListener("click",()=>Co(!1)))}function lo(i,e){const t=le("metric-context"),n=le("metric-context-wrap");if(!(!t||!n)){if(!i||!e){n.hidden=!0,t.textContent="";return}if(n.hidden=!1,i.type==="wing"){const r=To(e.wingsData).find(s=>s.wing===i.name);t.textContent=r?`Selected wing · ${On(r.rank)} by drawers`:"Selected wing";return}if(i.type==="room"){const r=wo(e.roomsData,i.wing).find(s=>s.name===i.name);t.textContent=r?`Selected room · ${On(r.rank)} in ${i.wing}`:"Selected room"}}}function ui(){ne==null||ne.status;const i=ne==null?void 0:ne.graphStats,e=ne==null?void 0:ne.graph,t=(e==null?void 0:e.summary)??(i==null?void 0:i.summary),n=ne==null?void 0:ne.kgStats,r=Ro(),{wingsData:s,roomsData:a,totalDrawers:o,ga:c,overviewStats:l}=r;le("metric-drawers").textContent=Ve(o??0),le("metric-wings").textContent=Ve(typeof(l==null?void 0:l.totalWings)=="number"?l.totalWings:Object.keys(s).length),le("metric-rooms").textContent=Ve(typeof(l==null?void 0:l.totalRooms)=="number"?l.totalRooms:bo(a));let u=0;typeof(t==null?void 0:t.resolvedEdgeCount)=="number"?u=t.resolvedEdgeCount:i!=null&&i.tunnels&&typeof i.tunnels=="object"&&(u=Object.keys(i.tunnels).length),le("metric-tunnels").textContent=u?Ve(u):"—";const f=le("metric-cross");f&&(f.textContent=c.hasResolvableEdges?Ve(c.crossWingEdgeCount):"—");const d=le("metric-footnote");if(d){const m=c.topCrossLinkedWings[0],_=c.topConnectedRooms[0];let g="";c.hasResolvableEdges&&m&&_?g=`Most cross-linked wing: ${m.wing} · Most connected room: ${_.room} (${_.wing})`:c.hasResolvableEdges&&m?g=`Most cross-linked wing: ${m.wing}`:g="Tunnel graph: resolve endpoints to see cross-wing stats.",j.view==="graph"&&r.graphFilterNarrowed&&(g=`Visible ${Ve(r.visibleGraphSummary.visibleEdgeCount)} edges · ${g}`),d.textContent=g}if(n&&typeof n=="object"&&!n.error){const m=[];for(const[_,g]of Object.entries(n))_!=="error"&&(typeof g=="number"?m.push(`${_}: ${Ve(g)}`):typeof g=="string"&&m.push(`${_}: ${g}`));le("metric-kg").textContent=m.length?m.slice(0,8).join(" · "):"—"}else le("metric-kg").textContent="—";lo(j.selected,r)}function m_(i,e){return e.trim()?i.toLowerCase().includes(e.trim().toLowerCase()):!0}function Ml(){const i=le("legend-host");if(!i)return;const e=ne==null?void 0:ne.status,t=e!=null&&e.wings&&typeof e.wings=="object"?e.wings:(ne==null?void 0:ne.wingsData)||{},n=Object.entries(t);if(!n.length){i.innerHTML='<div class="empty-state" style="padding:8px;">No wing data yet.</div>';return}i.innerHTML=n.map(([r,s])=>{const a=co(r),o=m_(`${r} ${s}`,j.searchQuery);return`
      <div class="legend-item" data-wing="${Je(r)}" style="${o?"":"display:none"}">
        <span class="legend-color" style="background:${a}"></span>
        <span>${Je(r)} · ${Ve(s)} drawers</span>
      </div>`}).join("")}function g_(i){const e=i.querySelector(".breadcrumb-nav");if(!e)return;const t=[...e.querySelectorAll(".crumb")];if(!t.length)return;t.forEach((r,s)=>{r.setAttribute("aria-posinset",String(s+1)),r.setAttribute("aria-setsize",String(t.length)),r.tabIndex=s===0?0:-1});const n=e._bcKey;n&&e.removeEventListener("keydown",n),e._bcKey=r=>{const s=t.indexOf(document.activeElement);if(!(s<0)){if(r.key==="ArrowRight"||r.key==="ArrowDown"){r.preventDefault();const a=(s+1)%t.length;t.forEach((o,c)=>{o.tabIndex=c===a?0:-1}),t[a].focus()}else if(r.key==="ArrowLeft"||r.key==="ArrowUp"){r.preventDefault();const a=(s-1+t.length)%t.length;t.forEach((o,c)=>{o.tabIndex=c===a?0:-1}),t[a].focus()}else if(r.key==="Home")r.preventDefault(),t.forEach((a,o)=>{a.tabIndex=o===0?0:-1}),t[0].focus();else if(r.key==="End"){r.preventDefault();const a=t.length-1;t.forEach((o,c)=>{o.tabIndex=c===a?0:-1}),t[a].focus()}}},e.addEventListener("keydown",e._bcKey)}function __(){var t,n,r;const i=le("breadcrumb");if(!i)return;const e=['<button type="button" class="crumb" data-crumb="root">All wings</button>'];j.currentWing&&(e.push('<span class="crumb-sep" aria-hidden="true">›</span>'),e.push(`<button type="button" class="crumb" data-crumb="wing" data-wing="${Je(j.currentWing)}">${Je(j.currentWing)}</button>`)),j.currentRoom&&j.currentWing&&(e.push('<span class="crumb-sep" aria-hidden="true">›</span>'),e.push(`<button type="button" class="crumb" data-crumb="room" data-wing="${Je(j.currentWing)}" data-room="${Je(j.currentRoom)}">${Je(j.currentRoom)}</button>`)),i.innerHTML=`<nav class="breadcrumb-nav" aria-label="Palace location">${e.join("")}</nav>`,(t=i.querySelector('[data-crumb="root"]'))==null||t.addEventListener("click",()=>v_()),(n=i.querySelector('[data-crumb="wing"]'))==null||n.addEventListener("click",s=>{const a=s.currentTarget.getAttribute("data-wing");a&&yl(a)}),(r=i.querySelector('[data-crumb="room"]'))==null||r.addEventListener("click",s=>{const a=s.currentTarget.getAttribute("data-room"),o=s.currentTarget.getAttribute("data-wing");if(a&&o&&j.currentWing===o&&j.currentRoom===a){const c=`room:${o}:${a}`;_e==null||_e.centerOnNodeId(c)}}),g_(i)}function v_(){var i;hs(),j.view="wings",j.currentWing=null,j.currentRoom=null,j.selected=null,j.pinned=!1,_e==null||_e.setView("wings",null),Ht(),$i(),le("view-helper-text").textContent=((i=Wn.find(e=>e.id==="wings"))==null?void 0:i.hint)||"",li(),ui(),Dt(),Lt()}function yl(i){var e;hs(),!(!ne||!Bi(ne.wingsData,i))&&(j.currentWing=i,j.currentRoom=null,j.view="rooms",j.selected=null,j.pinned=!1,_e==null||_e.setView("rooms",i),Ht(),$i(),le("view-helper-text").textContent=((e=Wn.find(t=>t.id==="rooms"))==null?void 0:e.hint)||"",li(),ui(),Dt(),Lt())}function x_(){return j.pinned&&j.selected?"pinned":j.selected?"selected":j.hovered?"live":"empty"}function yc(){const i=le("btn-pin");i&&(i.textContent=j.pinned?"Unpin":"Pin",i.disabled=!j.selected)}function Dt(){const i=le("inspect-body"),e=x_(),t=le("inspect-mode-badge");if(t){const o={empty:"Nothing selected",live:"Live preview",selected:"Selected",pinned:"Pinned"};t.textContent=o[e],t.dataset.mode=e}let n=null;e==="pinned"||e==="selected"?n=j.selected:e==="live"&&(n=j.hovered),__();const r=Ro(),s=Qg(r);if(!n||n.type==="center"){e==="empty"?i.innerHTML=s+s_(r):i.innerHTML=s+`
        <div class="empty-state">
          <strong>Hover a node</strong>
          <p>Move the pointer over the scene for a quick preview, or select a wing or room.</p>
        </div>`,lo(null,r),yc();return}const a=n;a.type==="wing"?i.innerHTML=s+o_(r,a.name):a.type==="room"?i.innerHTML=s+a_(r,a.wing,a.name):i.innerHTML=s+'<div class="inspect-card"><p class="inspect-muted">Unknown node type.</p></div>',lo(a,r),yc()}function ot(i,e){return`<div class="meta-row"><span class="meta-k">${Je(i)}</span><span class="meta-v">${e}</span></div>`}function Ec(i,e,t){const n=le("hover-card");if(!n)return;if(!t){n.classList.remove("is-visible");return}const r=16,s=n.offsetWidth||240,a=n.offsetHeight||80;let o=i+r,c=e+r;o+s>window.innerWidth-8&&(o=i-s-r),c+a>window.innerHeight-8&&(c=window.innerHeight-a-8),n.style.left=`${Math.max(8,o)}px`,n.style.top=`${Math.max(8,c)}px`,n.classList.add("is-visible")}function Sc(i){const e=le("hover-card");if(!e)return;if(!i||i.type==="center"){e.classList.remove("is-visible");return}const t=i.name||i.label||"Node";let n="";i.type==="wing"?n=`Wing · ${Ve(i.drawers)} drawers`:i.type==="room"&&(n=`Room in “${Je(i.wing)}”`),e.innerHTML=`<div class="hc-title">${Je(t)}</div><div class="hc-sub">${n}</div>`}function $i(){document.querySelectorAll("[data-view]").forEach(i=>{const e=i.getAttribute("data-view")===j.view;i.classList.toggle("is-active",e),i.setAttribute("aria-selected",e?"true":"false"),i.tabIndex=e?0:-1})}function or(){var e;const i=le("help-overlay");i&&(i.classList.remove("is-open"),i.setAttribute("aria-hidden","true"),(e=Jn==null?void 0:Jn.focus)==null||e.call(Jn),Jn=null)}function M_(){const i=le("help-overlay"),e=le("help-dialog");!i||!e||(Jn=document.activeElement instanceof HTMLElement?document.activeElement:null,i.classList.add("is-open"),i.setAttribute("aria-hidden","false"),requestAnimationFrame(()=>{var t;(t=le("help-close"))==null||t.focus()}))}function hs(){const i=le("help-overlay");i!=null&&i.classList.contains("is-open")&&or()}function rr(i){var t;hs(),j.view=i,i==="wings"&&(j.currentWing=null,j.currentRoom=null);const e=i==="rooms"?j.currentWing:null;_e==null||_e.setView(i,e),Ht(),$i(),le("view-helper-text").textContent=((t=Wn.find(n=>n.id===i))==null?void 0:t.hint)||"",li(),ui(),Dt(),Lt()}function y_(){j.selected&&(j.pinned=!j.pinned,Ht(),Dt(),Lt())}function bc(){j.selected=null,j.currentRoom=null,j.pinned=!1,Ht(),Dt(),Lt()}function E_(i){var t;if(!i||i.type==="center"){j.hovered=null,j.pinned||(j.selected=null,j.currentRoom=null),Ht(),Dt(),Lt();return}const e=u_(i);if(j.hovered=null,j.view==="wings"&&i.type==="wing"){j.currentWing=i.name,j.currentRoom=null,j.selected=e,j.pinned=!1,j.view="rooms",_e==null||_e.setView("rooms",i.name),Ht(),$i(),le("view-helper-text").textContent=((t=Wn.find(n=>n.id==="rooms"))==null?void 0:t.hint)||"",li(),ui(),Dt(),Lt();return}if(j.view==="rooms"&&i.type==="wing"){j.currentWing===i.name?(_e==null||_e.centerOnNodeId(i.id),j.selected=e,j.pinned=!1):(j.currentWing=i.name,j.currentRoom=null,j.selected=e,j.pinned=!1,_e==null||_e.setView("rooms",i.name),Ht()),Dt(),Lt();return}if(j.view==="rooms"&&i.type==="room"){j.currentWing=i.wing,j.currentRoom=i.name,j.selected=e,j.pinned=!1,_e==null||_e.setView("rooms",j.currentWing),Ht(),_e==null||_e.centerOnNodeId(i.id),Dt(),Lt();return}if(j.view==="graph"){if(!e)return;j.selected=e,j.pinned=!0,Ht(),Dt(),Lt();return}j.selected=e,j.pinned=!1,Ht(),Dt(),Lt()}function S_(){const i=le("canvas-container");_e=Fg(i,{onHover:(e,t)=>{if(e_()){Sc(null),Ec(0,0,!1);return}j.hovered=e&&e.type!=="center"?{...e}:null,Dt(),Sc(e),Ec(t.x,t.y,!!e&&e.type!=="center")},onClick:e=>E_(e)}),_e.init()}function b_(){const i=le("help-overlay");!i||i._trapWired||(i._trapWired=!0,i.addEventListener("keydown",e=>{if(!i.classList.contains("is-open")||e.key!=="Tab")return;const t=[...i.querySelectorAll("button, [href], input, select, textarea")].filter(s=>!s.hasAttribute("disabled"));if(t.length===0)return;const n=t[0],r=t[t.length-1];e.shiftKey&&document.activeElement===n?(e.preventDefault(),r.focus()):!e.shiftKey&&document.activeElement===r&&(e.preventDefault(),n.focus())}))}function T_(){var s,a;let i=!1,e=!1;try{const o=localStorage.getItem(_l);if(o){const c=JSON.parse(o);i=!!c.leftCollapsed,e=!!c.rightCollapsed}}catch{}const t=le("app-main-grid"),n=le("panel-left"),r=le("panel-right");t==null||t.classList.toggle("has-left-collapsed",i),t==null||t.classList.toggle("has-right-collapsed",e),n==null||n.classList.toggle("panel--collapsed",i),r==null||r.classList.toggle("panel--collapsed",e),(s=le("btn-collapse-left"))==null||s.setAttribute("aria-expanded",String(!i)),(a=le("btn-collapse-right"))==null||a.setAttribute("aria-expanded",String(!e))}function Tc(){const i=le("app-main-grid");try{localStorage.setItem(_l,JSON.stringify({leftCollapsed:(i==null?void 0:i.classList.contains("has-left-collapsed"))??!1,rightCollapsed:(i==null?void 0:i.classList.contains("has-right-collapsed"))??!1}))}catch{}}function w_(){var e,t;const i=le("app-main-grid");(e=le("btn-collapse-left"))==null||e.addEventListener("click",()=>{var r,s;i==null||i.classList.toggle("has-left-collapsed"),(r=le("panel-left"))==null||r.classList.toggle("panel--collapsed");const n=i==null?void 0:i.classList.contains("has-left-collapsed");(s=le("btn-collapse-left"))==null||s.setAttribute("aria-expanded",String(!n)),Tc()}),(t=le("btn-collapse-right"))==null||t.addEventListener("click",()=>{var r,s;i==null||i.classList.toggle("has-right-collapsed"),(r=le("panel-right"))==null||r.classList.toggle("panel--collapsed");const n=i==null?void 0:i.classList.contains("has-right-collapsed");(s=le("btn-collapse-right"))==null||s.setAttribute("aria-expanded",String(!n)),Tc()})}function A_(){var t,n,r,s,a,o,c,l,u,f,d,m,_;(t=le("btn-refresh"))==null||t.addEventListener("click",()=>Co(!0)),(n=le("btn-reset-cam"))==null||n.addEventListener("click",()=>_e==null?void 0:_e.resetCamera()),(r=le("btn-center"))==null||r.addEventListener("click",()=>{var g;(g=j.selected)!=null&&g.id?_e==null||_e.centerOnNodeId(j.selected.id):_e==null||_e.centerOnHovered()}),(s=le("btn-pin"))==null||s.addEventListener("click",()=>y_()),(a=le("btn-clear-sel"))==null||a.addEventListener("click",()=>bc()),(o=le("toggle-rotate"))==null||o.addEventListener("change",g=>{_e==null||_e.setAutoRotate(g.target.checked),Lt()}),(c=le("toggle-labels"))==null||c.addEventListener("change",g=>{_e==null||_e.setLabelsVisible(g.target.checked),Lt()});const i=le("motion-range");i==null||i.addEventListener("input",g=>{const p=Number(g.target.value);_e==null||_e.setMotionIntensity(p),g.target.setAttribute("aria-valuenow",String(p)),Lt()}),i&&i.setAttribute("aria-valuenow",i.value),Wn.forEach(g=>{var p;(p=document.querySelector(`[data-view="${g.id}"]`))==null||p.addEventListener("click",()=>rr(g.id))});const e=le("view-buttons");if(e==null||e.addEventListener("keydown",g=>{if(g.key!=="ArrowDown"&&g.key!=="ArrowUp"&&g.key!=="ArrowRight"&&g.key!=="ArrowLeft")return;const p=[...document.querySelectorAll("[data-view]")];if(!p.length)return;const h=p.findIndex(b=>b.getAttribute("data-view")===j.view);if(h<0)return;g.preventDefault();const E=g.key==="ArrowDown"||g.key==="ArrowRight"?1:-1,x=(h+E+p.length)%p.length;rr(p[x].getAttribute("data-view")),p[x].focus()}),(l=le("search-wings"))==null||l.addEventListener("input",g=>{clearTimeout(gc),gc=setTimeout(()=>{j.searchQuery=g.target.value,Ht(),Ml(),Lt()},120)}),(u=le("btn-help"))==null||u.addEventListener("click",()=>{const g=le("help-overlay");g!=null&&g.classList.contains("is-open")?or():M_()}),(f=le("help-close"))==null||f.addEventListener("click",()=>or()),(d=le("help-overlay"))==null||d.addEventListener("click",g=>{const p=le("help-overlay");g.target===p&&or()}),b_(),T_(),w_(),(m=le("graph-view-extras"))==null||m.addEventListener("click",g=>{const p=g.target.closest("[data-rel-type]");if(!p)return;const h=p.getAttribute("data-rel-type");h&&r_(h)}),window.addEventListener("keydown",g=>{var p;if(!(xc(g.target)&&g.key!=="Escape")){if(g.key==="Escape"){const h=le("help-overlay");if(h!=null&&h.classList.contains("is-open")){or();return}j.pinned?(j.pinned=!1,Ht(),Dt(),Lt()):j.selected&&bc();return}if(!xc(g.target)){if(g.key==="1"&&rr("wings"),g.key==="2"&&rr("rooms"),g.key==="3"&&rr("graph"),(g.key==="r"||g.key==="R")&&(_e==null||_e.resetCamera()),g.key==="/"&&!g.ctrlKey&&!g.metaKey&&(g.preventDefault(),(p=le("search-wings"))==null||p.focus()),g.key==="l"||g.key==="L"){const h=le("toggle-labels");h&&(h.checked=!h.checked,h.dispatchEvent(new Event("change")))}if(g.key===" "){g.preventDefault();const h=le("toggle-rotate");h&&(h.checked=!h.checked,h.dispatchEvent(new Event("change")))}}}}),localStorage.getItem("mempalace-viz-onboarded")||(le("onboard-hint").hidden=!1,localStorage.setItem("mempalace-viz-onboarded","1")),(_=window.matchMedia)!=null&&_.call(window,"(prefers-reduced-motion: reduce)").matches&&!localStorage.getItem(Ao)){const g=le("toggle-rotate");g&&(g.checked=!1,g.dispatchEvent(new Event("change"))),i&&(i.value="0",i.setAttribute("aria-valuenow","0"),_e==null||_e.setMotionIntensity(0))}}function R_(){const i=le("view-buttons");i&&(i.innerHTML=Wn.map(e=>`
    <button type="button" class="view-seg__btn" data-view="${e.id}" role="tab" aria-selected="${e.id===j.view?"true":"false"}" tabindex="${e.id===j.view?0:-1}">
      <strong>${Je(e.title)}</strong>
      <span class="view-seg__hint">${Je(e.hint)}</span>
    </button>`).join(""))}async function Co(i){var s,a,o,c,l;const e=i?{view:j.view,currentWing:j.currentWing,currentRoom:j.currentRoom,selected:j.selected,pinned:j.pinned,searchQuery:j.searchQuery}:null,t=ne;Kr(!0),qr("loading","Connecting…");const n=le("loading-overlay");if(n&&(n.innerHTML='<div class="spinner"></div><p style="color:#94a3b8;font-size:0.85rem;">Loading palace data…</p>'),ne=await Cl(),ne.error){if(i&&t&&!t.error){ne=t,qr("stale","Offline (cached)"),Jg("Refresh failed — showing last loaded data. Check the API and try again."),Kr(!1),Dt();return}qr("error","Disconnected"),p_(ne.error.message||String(ne.error),Rc()||"(same origin)");return}if(qr("ok","Connected"),Kr(!1),!i){const u=h_();f_(u),d_(u)}if(Mc(),i&&e){if(e.currentWing&&Bi(ne.wingsData,e.currentWing)?j.currentWing=e.currentWing:(j.currentWing=null,j.currentRoom=null),e.currentRoom&&j.currentWing&&ur(ne.roomsData,j.currentWing,e.currentRoom)?j.currentRoom=e.currentRoom:j.currentRoom=null,j.view=e.view,(s=e.selected)!=null&&s.id){const u=e.selected;u.type==="wing"&&Bi(ne.wingsData,u.name)||u.type==="room"&&u.wing&&ur(ne.roomsData,u.wing,u.name)?j.selected=u:j.selected=null}else j.selected=null;j.pinned=e.pinned&&!!j.selected,j.searchQuery=e.searchQuery??j.searchQuery,le("search-wings").value=j.searchQuery}Mc(),_e==null||_e.setData({wingsData:ne.wingsData,roomsData:ne.roomsData,graphEdges:ne.graphEdges}),ui(),Ml();const r=j.view==="rooms"?j.currentWing:null;_e==null||_e.setView(j.view,r),i_(),Ht(),_e==null||_e.setAutoRotate(((a=le("toggle-rotate"))==null?void 0:a.checked)??!0),_e==null||_e.setLabelsVisible(((o=le("toggle-labels"))==null?void 0:o.checked)??!0),_e==null||_e.setMotionIntensity(Number(((c=le("motion-range"))==null?void 0:c.value)??1)),$i(),le("view-helper-text").textContent=((l=Wn.find(u=>u.id===j.view))==null?void 0:l.hint)||"",Object.keys(ne.wingsData||{}).length?(!ne.roomsData||!Object.keys(ne.roomsData).some(u=>(ne.roomsData[u]||[]).length))&&(le("view-helper-text").textContent+=" · No rooms in taxonomy yet."):le("view-helper-text").textContent="No wings returned — check MCP backend.",li(),Dt(),Lt()}function C_(){const i=le("inspect-body");!i||i._delegationWired||(i._delegationWired=!0,i.addEventListener("click",c_))}function L_(){R_(),S_(),A_(),C_(),Co(!1)}L_();
