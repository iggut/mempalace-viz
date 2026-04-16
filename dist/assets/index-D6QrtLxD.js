(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`∕`;function t(e){return String(e??``).trim()||`unknown`}function n(t){return String(t??``).replace(/\//g,e)}function r(t){return String(t??``).replace(new RegExp(e,`g`),`/`)}function i(e,r){return`${t(e)}/${n(r)}`}function a(e){let t=String(e||``),n=t.indexOf(`/`);return n<=0?null:{wingId:t.slice(0,n),roomName:r(t.slice(n+1))}}function o(e,n){return`room:${t(e)}:${n}`}function s(e){let t=a(e);return t?o(t.wingId,t.roomName):null}function c(e){if(!e||typeof e!=`object`)return{};if(e.wings&&typeof e.wings==`object`&&!Array.isArray(e.wings))return{...e.wings};let t=new Set([`error`,`message`,`ok`]),n={};for(let[r,i]of Object.entries(e))t.has(r)||typeof i==`number`&&(n[r]=i);return Object.keys(n).length?n:{}}function l(e){let n=e;if(n?.taxonomy&&typeof n.taxonomy==`object`&&(n=n.taxonomy),typeof n==`string`)try{n=JSON.parse(n)}catch{n={}}let r=n&&typeof n==`object`?n:{},a={},o=[],s=[];for(let[e,n]of Object.entries(r)){let r=t(e);a[r]||(a[r]=[]);let c=0,l=0;if(n&&typeof n==`object`&&!Array.isArray(n))for(let[e,t]of Object.entries(n)){let n=typeof t==`number`?t:1,s=i(r,e),u={name:e,drawers:n,roomId:s,wingId:r};a[r].push(u),o.push({roomId:s,wingId:r,name:e,drawerCount:n}),c+=n,l+=1}s.push({wingId:r,name:r,drawerCount:c,roomCount:l,rooms:a[r]})}return s.sort((e,t)=>t.drawerCount-e.drawerCount),o.sort((e,t)=>t.drawerCount-e.drawerCount),{taxonomy:r,roomsData:a,rooms:o,wings:s}}function u(e){return e.map(e=>({from:e.sourceRoomId,to:e.targetRoomId,wing:e.sourceWingId,sourceRoomId:e.sourceRoomId,targetRoomId:e.targetRoomId,sourceWingId:e.sourceWingId,targetWingId:e.targetWingId,crossWing:e.crossWing,edgeId:e.edgeId,relationshipType:e.relationshipType}))}function d(e){return Array.isArray(e?.edgesResolved)?e.edgesResolved:[]}function f(e){return u(d(e))}function p(){return typeof window<`u`&&window.location?.protocol&&window.location.protocol!==`file:`?``:`http://localhost:8767`}async function m(e,{timeoutMs:t=12e3}={}){let n=new AbortController,r=setTimeout(()=>n.abort(),t);try{let t=await fetch(e,{headers:{Accept:`application/json`},signal:n.signal});if(!t.ok){let e=await t.text().catch(()=>``);throw Error(e||`HTTP ${t.status}`)}return t.json()}catch(e){throw e?.name===`AbortError`?Error(`Request timed out after ${t}ms`):e}finally{clearTimeout(r)}}function h(e,t){return!!(e&&typeof e==`object`&&t in e)}function g(e,t,n){let r=e?.[t];return Array.isArray(r)?r.some(e=>e.name===n):!1}function _(e){let{fetchedAt:t,status:n,wingsRaw:r,taxonomyRaw:i,graphStats:a,kgResult:o,overviewBundle:s}=e,d=c(r),{taxonomy:f,roomsData:p,rooms:m,wings:h}=l(i),g=s?.graphContractVersion??a?.graphContractVersion??null;if(g!=null&&g!==2)throw Error(`Unsupported palace graph contract version: ${g}`);let _=Array.isArray(a?.edgesResolved)?a.edgesResolved:[],v=Array.isArray(a?.edgesInferred)?a.edgesInferred:[],y=Array.isArray(a?.edgesUnresolved)?a.edgesUnresolved:[],b=a?.summary&&typeof a.summary==`object`?a.summary:null,x=a?.summaryInferred&&typeof a.summaryInferred==`object`?a.summaryInferred:null,S=[];_.length?S=u(_):a?.legacyGraphEdges?.length?S=a.legacyGraphEdges:a?.tunnels&&typeof a.tunnels==`object`&&(S=Object.entries(a.tunnels).flatMap(([e,t])=>Object.entries(t||{}).map(([t,n])=>({from:e,to:t,wing:n}))));let C=o&&!o.error?o:null,w=s?.stats&&typeof s.stats==`object`?s.stats:null,T=a?.graphMeta??s?.graphMeta??null;return{status:n,fetchedAt:t??s?.fetchedAt??T?.fetchedAt??null,wingsData:d,taxonomy:f,roomsData:p,rooms:m,wings:h,graphStats:a,graphContractVersion:g,graph:{edgesResolved:_,edgesInferred:v,edgesUnresolved:y,summary:b,summaryInferred:x,graphMeta:T},graphEdges:S,overviewBundle:s,overviewStats:w,graphMeta:T,kgStats:C,error:null}}async function v(){let e=`${p()}/api`;try{let t=await m(`${e}/palace`),n={graphContractVersion:t.graphContractVersion,fetchedAt:t.fetchedAt,...t.graph||{}},r={graphContractVersion:t.graphContractVersion,fetchedAt:t.fetchedAt,graphMeta:t.graph?.graphMeta??null,stats:t.overviewStats??null};return _({fetchedAt:t.fetchedAt,status:t.status,wingsRaw:t.wingsData,taxonomyRaw:{taxonomy:t.taxonomy},graphStats:n,kgResult:t.kgStats??null,overviewBundle:r})}catch(e){return{status:null,fetchedAt:null,wingsData:{},taxonomy:{},roomsData:{},rooms:[],wings:[],graphStats:null,graphContractVersion:null,graph:{edgesResolved:[],edgesInferred:[],edgesUnresolved:[],summary:null,summaryInferred:null,graphMeta:null},graphEdges:[],overviewBundle:null,overviewStats:null,graphMeta:null,kgStats:null,error:e}}}var y={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},b={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},x=1e3,S=1001,C=1002,w=1003,T=1004,E=1005,D=1006,O=1007,k=1008,ee=1009,te=1014,A=1015,ne=1016,j=1020,M=1023,re=1026,ie=1027,ae=2300,oe=2301,se=2302,ce=2400,le=2401,ue=2402,de=3e3,fe=3001,pe=3200,me=3201,he=`srgb`,ge=`srgb-linear`,_e=`display-p3`,ve=`display-p3-linear`,N=`linear`,ye=`srgb`,be=`rec709`,P=7680,F=35044,xe=1035,I=2e3,L=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let n=this._listeners[e];if(n!==void 0){let e=n.indexOf(t);e!==-1&&n.splice(e,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let t=this._listeners[e.type];if(t!==void 0){e.target=this;let n=t.slice(0);for(let t=0,r=n.length;t<r;t++)n[t].call(this,e);e.target=null}}},R=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Se=1234567,Ce=Math.PI/180,we=180/Math.PI;function Te(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(R[e&255]+R[e>>8&255]+R[e>>16&255]+R[e>>24&255]+`-`+R[t&255]+R[t>>8&255]+`-`+R[t>>16&15|64]+R[t>>24&255]+`-`+R[n&63|128]+R[n>>8&255]+`-`+R[n>>16&255]+R[n>>24&255]+R[r&255]+R[r>>8&255]+R[r>>16&255]+R[r>>24&255]).toLowerCase()}function z(e,t,n){return Math.max(t,Math.min(n,e))}function Ee(e,t){return(e%t+t)%t}function De(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function Oe(e,t,n){return e===t?0:(n-e)/(t-e)}function ke(e,t,n){return(1-n)*e+n*t}function Ae(e,t,n,r){return ke(e,t,1-Math.exp(-n*r))}function je(e,t=1){return t-Math.abs(Ee(e,t*2)-t)}function Me(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function Ne(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function Pe(e,t){return e+Math.floor(Math.random()*(t-e+1))}function Fe(e,t){return e+Math.random()*(t-e)}function Ie(e){return e*(.5-Math.random())}function Le(e){e!==void 0&&(Se=e);let t=Se+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Re(e){return e*Ce}function ze(e){return e*we}function Be(e){return(e&e-1)==0&&e!==0}function Ve(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function He(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Ue(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:console.warn(`THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function We(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`Invalid component type.`)}}function Ge(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`Invalid component type.`)}}var Ke={DEG2RAD:Ce,RAD2DEG:we,generateUUID:Te,clamp:z,euclideanModulo:Ee,mapLinear:De,inverseLerp:Oe,lerp:ke,damp:Ae,pingpong:je,smoothstep:Me,smootherstep:Ne,randInt:Pe,randFloat:Fe,randFloatSpread:Ie,seededRandom:Le,degToRad:Re,radToDeg:ze,isPowerOfTwo:Be,ceilPowerOfTwo:Ve,floorPowerOfTwo:He,setQuaternionFromProperEuler:Ue,normalize:Ge,denormalize:We},B=class e{constructor(t=0,n=0){e.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(z(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},V=class e{constructor(t,n,r,i,a,o,s,c,l){e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,r,i,a,o,s,c,l)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(qe.makeScale(e,t)),this}rotate(e){return this.premultiply(qe.makeRotation(-e)),this}translate(e,t){return this.premultiply(qe.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},qe=new V;function Je(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Ye(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Xe(){let e=Ye(`canvas`);return e.style.display=`block`,e}var Ze={};function Qe(e){e in Ze||(Ze[e]=!0,console.warn(e))}var $e=new V().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),et=new V().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),tt={[ge]:{transfer:N,primaries:be,toReference:e=>e,fromReference:e=>e},[he]:{transfer:ye,primaries:be,toReference:e=>e.convertSRGBToLinear(),fromReference:e=>e.convertLinearToSRGB()},[ve]:{transfer:N,primaries:`p3`,toReference:e=>e.applyMatrix3(et),fromReference:e=>e.applyMatrix3($e)},[_e]:{transfer:ye,primaries:`p3`,toReference:e=>e.convertSRGBToLinear().applyMatrix3(et),fromReference:e=>e.applyMatrix3($e).convertLinearToSRGB()}},nt=new Set([ge,ve]),rt={enabled:!0,_workingColorSpace:ge,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(e){if(!nt.has(e))throw Error(`Unsupported working color space, "${e}".`);this._workingColorSpace=e},convert:function(e,t,n){if(this.enabled===!1||t===n||!t||!n)return e;let r=tt[t].toReference,i=tt[n].fromReference;return i(r(e))},fromWorkingColorSpace:function(e,t){return this.convert(e,this._workingColorSpace,t)},toWorkingColorSpace:function(e,t){return this.convert(e,t,this._workingColorSpace)},getPrimaries:function(e){return tt[e].primaries},getTransfer:function(e){return e===``?N:tt[e].transfer}};function it(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function at(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var ot,st=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ot===void 0&&(ot=Ye(`canvas`)),ot.width=e.width,ot.height=e.height;let n=ot.getContext(`2d`);e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ot}return t.width>2048||t.height>2048?(console.warn(`THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons`,e),t.toDataURL(`image/jpeg`,.6)):t.toDataURL(`image/png`)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Ye(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=it(i[e]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(it(t[e]/255)*255):t[e]=it(t[e]);return{data:t,width:e.width,height:e.height}}else return console.warn(`THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},ct=0,lt=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,`id`,{value:ct++}),this.uuid=Te(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(ut(r[t].image)):e.push(ut(r[t]))}else e=ut(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function ut(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?st.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn(`THREE.Texture: Unable to serialize Texture.`),{})}var dt=0,ft=class e extends L{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=S,i=S,a=D,o=k,s=M,c=ee,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,`id`,{value:dt++}),this.uuid=Te(),this.name=``,this.source=new lt(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new B(0,0),this.repeat=new B(1,1),this.center=new B(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new V,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u==`string`?this.colorSpace=u:(Qe(`THREE.Texture: Property .encoding has been replaced by .colorSpace.`),this.colorSpace=u===3001?he:``),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case x:e.x-=Math.floor(e.x);break;case S:e.x=e.x<0?0:1;break;case C:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case x:e.y-=Math.floor(e.y);break;case S:e.y=e.y<0?0:1;break;case C:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Qe(`THREE.Texture: Property .encoding has been replaced by .colorSpace.`),this.colorSpace===`srgb`?fe:de}set encoding(e){Qe(`THREE.Texture: Property .encoding has been replaced by .colorSpace.`),this.colorSpace=e===3001?he:``}};ft.DEFAULT_IMAGE=null,ft.DEFAULT_MAPPING=300,ft.DEFAULT_ANISOTROPY=1;var pt=class e{constructor(t=0,n=0,r=0,i=1){e.prototype.isVector4=!0,this.x=t,this.y=n,this.z=r,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},mt=class extends L{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new pt(0,0,e,t),this.scissorTest=!1,this.viewport=new pt(0,0,e,t);let r={width:e,height:t,depth:1};n.encoding!==void 0&&(Qe(`THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace.`),n.colorSpace=n.encoding===3001?he:``),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:D,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new ft(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new lt(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:`dispose`})}},ht=class extends mt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},gt=class extends ft{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=w,this.minFilter=w,this.wrapR=S,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},_t=class extends ft{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=w,this.minFilter=w,this.wrapR=S,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},vt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(o===0){e[t+0]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=p,e[t+3]=m;return}if(u!==m||s!==d||c!==f||l!==p){let e=1-o,t=s*d+c*f+l*p+u*m,n=t>=0?1:-1,r=1-t*t;if(r>2**-52){let i=Math.sqrt(r),a=Math.atan2(i,t*n);e=Math.sin(e*a)/i,o=Math.sin(o*a)/i}let i=o*n;if(s=s*e+d*i,c=c*e+f*i,l=l*e+p*i,u=u*e+m*i,e===1-o){let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:console.warn(`THREE.Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<2**-52?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(z(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,i=this._z,a=this._w,o=a*e._w+n*e._x+r*e._y+i*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=i,this;let s=1-o*o;if(s<=2**-52){let e=1-t;return this._w=e*a+t*this._w,this._x=e*n+t*this._x,this._y=e*r+t*this._y,this._z=e*i+t*this._z,this.normalize(),this}let c=Math.sqrt(s),l=Math.atan2(c,o),u=Math.sin((1-t)*l)/c,d=Math.sin(t*l)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=r*u+this._y*d,this._z=i*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),r=2*Math.PI*Math.random(),i=2*Math.PI*Math.random();return this.set(t*Math.cos(r),n*Math.sin(i),n*Math.cos(i),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},H=class e{constructor(t=0,n=0,r=0){e.prototype.isVector3=!0,this.x=t,this.y=n,this.z=r}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(bt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(bt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return yt.copy(this).projectOnVector(e),this.sub(yt)}reflect(e){return this.sub(yt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(z(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},yt=new H,bt=new vt,xt=class{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ct.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ct.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Ct.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Ct):Ct.fromBufferAttribute(r,t),Ct.applyMatrix4(e.matrixWorld),this.expandByPoint(Ct);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),wt.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),wt.copy(e.boundingBox)),wt.applyMatrix4(e.matrixWorld),this.union(wt)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Ct),Ct.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(jt),Mt.subVectors(this.max,jt),Tt.subVectors(e.a,jt),Et.subVectors(e.b,jt),Dt.subVectors(e.c,jt),Ot.subVectors(Et,Tt),kt.subVectors(Dt,Et),At.subVectors(Tt,Dt);let t=[0,-Ot.z,Ot.y,0,-kt.z,kt.y,0,-At.z,At.y,Ot.z,0,-Ot.x,kt.z,0,-kt.x,At.z,0,-At.x,-Ot.y,Ot.x,0,-kt.y,kt.x,0,-At.y,At.x,0];return!Ft(t,Tt,Et,Dt,Mt)||(t=[1,0,0,0,1,0,0,0,1],!Ft(t,Tt,Et,Dt,Mt))?!1:(Nt.crossVectors(Ot,kt),t=[Nt.x,Nt.y,Nt.z],Ft(t,Tt,Et,Dt,Mt))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ct).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ct).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(St[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),St[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),St[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),St[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),St[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),St[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),St[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),St[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(St),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},St=[new H,new H,new H,new H,new H,new H,new H,new H],Ct=new H,wt=new xt,Tt=new H,Et=new H,Dt=new H,Ot=new H,kt=new H,At=new H,jt=new H,Mt=new H,Nt=new H,Pt=new H;function Ft(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Pt.fromArray(e,a);let o=i.x*Math.abs(Pt.x)+i.y*Math.abs(Pt.y)+i.z*Math.abs(Pt.z),s=t.dot(Pt),c=n.dot(Pt),l=r.dot(Pt);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var It=new xt,Lt=new H,Rt=new H,zt=class{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?It.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Lt.subVectors(e,this.center);let t=Lt.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Lt,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Rt.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Lt.copy(e.center).add(Rt)),this.expandByPoint(Lt.copy(e.center).sub(Rt))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Bt=new H,Vt=new H,Ht=new H,Ut=new H,Wt=new H,Gt=new H,Kt=new H,qt=class{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Bt)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Bt.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Bt.copy(this.origin).addScaledVector(this.direction,t),Bt.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Vt.copy(e).add(t).multiplyScalar(.5),Ht.copy(t).sub(e).normalize(),Ut.copy(this.origin).sub(Vt);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Ht),o=Ut.dot(this.direction),s=-Ut.dot(Ht),c=Ut.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0)if(u=a*s-o,d=a*o-s,p=i*l,u>=0)if(d>=-p)if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c);else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Vt).addScaledVector(Ht,d),f}intersectSphere(e,t){Bt.subVectors(e.center,this.origin);let n=Bt.dot(this.direction),r=Bt.dot(Bt)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Bt)!==null}intersectTriangle(e,t,n,r,i){Wt.subVectors(t,e),Gt.subVectors(n,e),Kt.crossVectors(Wt,Gt);let a=this.direction.dot(Kt),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ut.subVectors(this.origin,e);let s=o*this.direction.dot(Gt.crossVectors(Ut,Gt));if(s<0)return null;let c=o*this.direction.dot(Wt.cross(Ut));if(c<0||s+c>a)return null;let l=-o*Ut.dot(Kt);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Jt=class e{constructor(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g){e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/Yt.setFromMatrixColumn(e,0).length(),i=1/Yt.setFromMatrixColumn(e,1).length(),a=1/Yt.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Zt,e,Qt)}lookAt(e,t,n){let r=this.elements;return tn.subVectors(e,t),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),$t.crossVectors(n,tn),$t.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),$t.crossVectors(n,tn)),$t.normalize(),en.crossVectors(tn,$t),r[0]=$t.x,r[4]=en.x,r[8]=tn.x,r[1]=$t.y,r[5]=en.y,r[9]=tn.y,r[2]=$t.z,r[6]=en.z,r[10]=tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],ee=r[6],te=r[10],A=r[14],ne=r[3],j=r[7],M=r[11],re=r[15];return i[0]=a*x+o*T+s*k+c*ne,i[4]=a*S+o*E+s*ee+c*j,i[8]=a*C+o*D+s*te+c*M,i[12]=a*w+o*O+s*A+c*re,i[1]=l*x+u*T+d*k+f*ne,i[5]=l*S+u*E+d*ee+f*j,i[9]=l*C+u*D+d*te+f*M,i[13]=l*w+u*O+d*A+f*re,i[2]=p*x+m*T+h*k+g*ne,i[6]=p*S+m*E+h*ee+g*j,i[10]=p*C+m*D+h*te+g*M,i[14]=p*w+m*O+h*A+g*re,i[3]=_*x+v*T+y*k+b*ne,i[7]=_*S+v*E+y*ee+b*j,i[11]=_*C+v*D+y*te+b*M,i[15]=_*w+v*O+y*A+b*re,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15];return p*(+i*s*u-r*c*u-i*o*d+n*c*d+r*o*f-n*s*f)+m*(+t*s*f-t*c*d+i*a*d-r*a*f+r*c*l-i*s*l)+h*(+t*c*u-t*o*f-i*a*u+n*a*f+i*o*l-n*c*l)+g*(-r*o*l-t*s*u+t*o*d+r*a*u-n*a*d+n*s*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=u*h*c-m*d*c+m*s*f-o*h*f-u*s*g+o*d*g,v=p*d*c-l*h*c-p*s*f+a*h*f+l*s*g-a*d*g,y=l*m*c-p*u*c+p*o*f-a*m*f-l*o*g+a*u*g,b=p*u*s-l*m*s-p*o*d+a*m*d+l*o*h-a*u*h,x=t*_+n*v+r*y+i*b;if(x===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let S=1/x;return e[0]=_*S,e[1]=(m*d*i-u*h*i-m*r*f+n*h*f+u*r*g-n*d*g)*S,e[2]=(o*h*i-m*s*i+m*r*c-n*h*c-o*r*g+n*s*g)*S,e[3]=(u*s*i-o*d*i-u*r*c+n*d*c+o*r*f-n*s*f)*S,e[4]=v*S,e[5]=(l*h*i-p*d*i+p*r*f-t*h*f-l*r*g+t*d*g)*S,e[6]=(p*s*i-a*h*i-p*r*c+t*h*c+a*r*g-t*s*g)*S,e[7]=(a*d*i-l*s*i+l*r*c-t*d*c-a*r*f+t*s*f)*S,e[8]=y*S,e[9]=(p*u*i-l*m*i-p*n*f+t*m*f+l*n*g-t*u*g)*S,e[10]=(a*m*i-p*o*i+p*n*c-t*m*c-a*n*g+t*o*g)*S,e[11]=(l*o*i-a*u*i-l*n*c+t*u*c+a*n*f-t*o*f)*S,e[12]=b*S,e[13]=(l*m*r-p*u*r+p*n*d-t*m*d-l*n*h+t*u*h)*S,e[14]=(p*o*r-a*m*r-p*n*s+t*m*s+a*n*h-t*o*h)*S,e[15]=(a*u*r-l*o*r+l*n*s-t*u*s-a*n*d+t*o*d)*S,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,i=Yt.set(r[0],r[1],r[2]).length(),a=Yt.set(r[4],r[5],r[6]).length(),o=Yt.set(r[8],r[9],r[10]).length();this.determinant()<0&&(i=-i),e.x=r[12],e.y=r[13],e.z=r[14],Xt.copy(this);let s=1/i,c=1/a,l=1/o;return Xt.elements[0]*=s,Xt.elements[1]*=s,Xt.elements[2]*=s,Xt.elements[4]*=c,Xt.elements[5]*=c,Xt.elements[6]*=c,Xt.elements[8]*=l,Xt.elements[9]*=l,Xt.elements[10]*=l,t.setFromRotationMatrix(Xt),n.x=i,n.y=a,n.z=o,this}makePerspective(e,t,n,r,i,a,o=I){let s=this.elements,c=2*i/(t-e),l=2*i/(n-r),u=(t+e)/(t-e),d=(n+r)/(n-r),f,p;if(o===2e3)f=-(a+i)/(a-i),p=-2*a*i/(a-i);else if(o===2001)f=-a/(a-i),p=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return s[0]=c,s[4]=0,s[8]=u,s[12]=0,s[1]=0,s[5]=l,s[9]=d,s[13]=0,s[2]=0,s[6]=0,s[10]=f,s[14]=p,s[3]=0,s[7]=0,s[11]=-1,s[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=I){let s=this.elements,c=1/(t-e),l=1/(n-r),u=1/(a-i),d=(t+e)*c,f=(n+r)*l,p,m;if(o===2e3)p=(a+i)*u,m=-2*u;else if(o===2001)p=i*u,m=-1*u;else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return s[0]=2*c,s[4]=0,s[8]=0,s[12]=-d,s[1]=0,s[5]=2*l,s[9]=0,s[13]=-f,s[2]=0,s[6]=0,s[10]=m,s[14]=-p,s[3]=0,s[7]=0,s[11]=0,s[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Yt=new H,Xt=new Jt,Zt=new H(0,0,0),Qt=new H(1,1,1),$t=new H,en=new H,tn=new H,nn=new Jt,rn=new vt,an=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(z(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-z(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(z(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-z(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(z(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-z(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:console.warn(`THREE.Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return nn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(nn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return rn.setFromEuler(this),this.setFromQuaternion(rn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};an.DEFAULT_ORDER=`XYZ`;var on=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!=0}},sn=0,cn=new H,ln=new vt,un=new Jt,dn=new H,fn=new H,pn=new H,mn=new vt,hn=new H(1,0,0),gn=new H(0,1,0),_n=new H(0,0,1),vn={type:`added`},yn={type:`removed`},bn=class e extends L{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,`id`,{value:sn++}),this.uuid=Te(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new H,n=new an,r=new vt,i=new H(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Jt},normalMatrix:{value:new V}}),this.matrix=new Jt,this.matrixWorld=new Jt,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new on,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ln.setFromAxisAngle(e,t),this.quaternion.multiply(ln),this}rotateOnWorldAxis(e,t){return ln.setFromAxisAngle(e,t),this.quaternion.premultiply(ln),this}rotateX(e){return this.rotateOnAxis(hn,e)}rotateY(e){return this.rotateOnAxis(gn,e)}rotateZ(e){return this.rotateOnAxis(_n,e)}translateOnAxis(e,t){return cn.copy(e).applyQuaternion(this.quaternion),this.position.add(cn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(hn,e)}translateY(e){return this.translateOnAxis(gn,e)}translateZ(e){return this.translateOnAxis(_n,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(un.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?dn.copy(e):dn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),fn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?un.lookAt(fn,dn,this.up):un.lookAt(dn,fn,this.up),this.quaternion.setFromRotationMatrix(un),r&&(un.extractRotation(r.matrixWorld),ln.setFromRotationMatrix(un),this.quaternion.premultiply(ln.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(console.error(`THREE.Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(vn)):console.error(`THREE.Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(yn)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),un.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),un.multiply(e.parent.matrixWorld)),e.applyMatrix4(un),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fn,e,pn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fn,mn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let e=this.children;for(let t=0,n=e.length;t<n;t++){let n=e[t];n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(e=>({boxInitialized:e.boxInitialized,boxMin:e.box.min.toArray(),boxMax:e.box.max.toArray(),sphereInitialized:e.sphereInitialized,sphereRadius:e.sphere.radius,sphereCenter:e.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material);if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};bn.DEFAULT_UP=new H(0,1,0),bn.DEFAULT_MATRIX_AUTO_UPDATE=!0,bn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var xn=new H,Sn=new H,Cn=new H,wn=new H,Tn=new H,En=new H,Dn=new H,On=new H,kn=new H,An=new H,jn=!1,Mn=class e{constructor(e=new H,t=new H,n=new H){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),xn.subVectors(e,t),r.cross(xn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){xn.subVectors(r,t),Sn.subVectors(n,t),Cn.subVectors(e,t);let a=xn.dot(xn),o=xn.dot(Sn),s=xn.dot(Cn),c=Sn.dot(Sn),l=Sn.dot(Cn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,wn)===null?!1:wn.x>=0&&wn.y>=0&&wn.x+wn.y<=1}static getUV(e,t,n,r,i,a,o,s){return jn===!1&&(console.warn(`THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation().`),jn=!0),this.getInterpolation(e,t,n,r,i,a,o,s)}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,wn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,wn.x),s.addScaledVector(a,wn.y),s.addScaledVector(o,wn.z),s)}static isFrontFacing(e,t,n,r){return xn.subVectors(n,t),Sn.subVectors(e,t),xn.cross(Sn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xn.subVectors(this.c,this.b),Sn.subVectors(this.a,this.b),xn.cross(Sn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getUV(t,n,r,i,a){return jn===!1&&(console.warn(`THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation().`),jn=!0),e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Tn.subVectors(r,n),En.subVectors(i,n),On.subVectors(e,n);let s=Tn.dot(On),c=En.dot(On);if(s<=0&&c<=0)return t.copy(n);kn.subVectors(e,r);let l=Tn.dot(kn),u=En.dot(kn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Tn,a);An.subVectors(e,i);let f=Tn.dot(An),p=En.dot(An);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(En,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Dn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Dn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Tn,a).addScaledVector(En,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Nn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pn={h:0,s:0,l:0},Fn={h:0,s:0,l:0};function In(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var U=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=he){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,rt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=rt.workingColorSpace){return this.r=e,this.g=t,this.b=n,rt.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=rt.workingColorSpace){if(e=Ee(e,1),t=z(t,0,1),n=z(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=In(i,r,e+1/3),this.g=In(i,r,e),this.b=In(i,r,e-1/3)}return rt.toWorkingColorSpace(this,r),this}setStyle(e,t=he){function n(t){t!==void 0&&parseFloat(t)<1&&console.warn(`THREE.Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:console.warn(`THREE.Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);console.warn(`THREE.Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=he){let n=Nn[e.toLowerCase()];return n===void 0?console.warn(`THREE.Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=it(e.r),this.g=it(e.g),this.b=it(e.b),this}copyLinearToSRGB(e){return this.r=at(e.r),this.g=at(e.g),this.b=at(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=he){return rt.fromWorkingColorSpace(Ln.copy(this),e),Math.round(z(Ln.r*255,0,255))*65536+Math.round(z(Ln.g*255,0,255))*256+Math.round(z(Ln.b*255,0,255))}getHexString(e=he){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=rt.workingColorSpace){rt.fromWorkingColorSpace(Ln.copy(this),t);let n=Ln.r,r=Ln.g,i=Ln.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4;break}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=rt.workingColorSpace){return rt.fromWorkingColorSpace(Ln.copy(this),t),e.r=Ln.r,e.g=Ln.g,e.b=Ln.b,e}getStyle(e=he){rt.fromWorkingColorSpace(Ln.copy(this),e);let t=Ln.r,n=Ln.g,r=Ln.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Pn),this.setHSL(Pn.h+e,Pn.s+t,Pn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Pn),e.getHSL(Fn);let n=ke(Pn.h,Fn.h,t),r=ke(Pn.s,Fn.s,t),i=ke(Pn.l,Fn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ln=new U;U.NAMES=Nn;var Rn=0,zn=class extends L{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,`id`,{value:Rn++}),this.uuid=Te(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new U(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=P,this.stencilZFail=P,this.stencilZPass=P,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Bn=class extends zn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new U(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Vn=new H,Hn=new B,Un=class{constructor(e,t,n=!1){if(Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=F,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=A,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn(`THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead.`),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Hn.fromBufferAttribute(this,t),Hn.applyMatrix3(e),this.setXY(t,Hn.x,Hn.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Vn.fromBufferAttribute(this,t),Vn.applyMatrix3(e),this.setXYZ(t,Vn.x,Vn.y,Vn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Vn.fromBufferAttribute(this,t),Vn.applyMatrix4(e),this.setXYZ(t,Vn.x,Vn.y,Vn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Vn.fromBufferAttribute(this,t),Vn.applyNormalMatrix(e),this.setXYZ(t,Vn.x,Vn.y,Vn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Vn.fromBufferAttribute(this,t),Vn.transformDirection(e),this.setXYZ(t,Vn.x,Vn.y,Vn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=We(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ge(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=We(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ge(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=We(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ge(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=We(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ge(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=We(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ge(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ge(t,this.array),n=Ge(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Ge(t,this.array),n=Ge(n,this.array),r=Ge(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Ge(t,this.array),n=Ge(n,this.array),r=Ge(r,this.array),i=Ge(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}},Wn=class extends Un{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Gn=class extends Un{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Kn=class extends Un{constructor(e,t,n){super(new Float32Array(e),t,n)}},qn=0,Jn=new Jt,Yn=new bn,Xn=new H,Zn=new xt,Qn=new xt,$n=new H,er=class e extends L{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,`id`,{value:qn++}),this.uuid=Te(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Je(e)?Gn:Wn)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new V().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Jn.makeRotationFromQuaternion(e),this.applyMatrix4(Jn),this}rotateX(e){return Jn.makeRotationX(e),this.applyMatrix4(Jn),this}rotateY(e){return Jn.makeRotationY(e),this.applyMatrix4(Jn),this}rotateZ(e){return Jn.makeRotationZ(e),this.applyMatrix4(Jn),this}translate(e,t,n){return Jn.makeTranslation(e,t,n),this.applyMatrix4(Jn),this}scale(e,t,n){return Jn.makeScale(e,t,n),this.applyMatrix4(Jn),this}lookAt(e){return Yn.lookAt(e),Yn.updateMatrix(),this.applyMatrix4(Yn.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xn).negate(),this.translate(Xn.x,Xn.y,Xn.z),this}setFromPoints(e){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute(`position`,new Kn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error(`THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".`,this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Zn.setFromBufferAttribute(n),this.morphTargetsRelative?($n.addVectors(this.boundingBox.min,Zn.min),this.boundingBox.expandByPoint($n),$n.addVectors(this.boundingBox.max,Zn.max),this.boundingBox.expandByPoint($n)):(this.boundingBox.expandByPoint(Zn.min),this.boundingBox.expandByPoint(Zn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error(`THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error(`THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".`,this),this.boundingSphere.set(new H,1/0);return}if(e){let n=this.boundingSphere.center;if(Zn.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Qn.setFromBufferAttribute(n),this.morphTargetsRelative?($n.addVectors(Zn.min,Qn.min),Zn.expandByPoint($n),$n.addVectors(Zn.max,Qn.max),Zn.expandByPoint($n)):(Zn.expandByPoint(Qn.min),Zn.expandByPoint(Qn.max))}Zn.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)$n.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared($n));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)$n.fromBufferAttribute(a,t),o&&(Xn.fromBufferAttribute(e,t),$n.add(Xn)),r=Math.max(r,n.distanceToSquared($n))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error(`THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=e.array,r=t.position.array,i=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute(`tangent`)===!1&&this.setAttribute(`tangent`,new Un(new Float32Array(4*o),4));let s=this.getAttribute(`tangent`).array,c=[],l=[];for(let e=0;e<o;e++)c[e]=new H,l[e]=new H;let u=new H,d=new H,f=new H,p=new B,m=new B,h=new B,g=new H,_=new H;function v(e,t,n){u.fromArray(r,e*3),d.fromArray(r,t*3),f.fromArray(r,n*3),p.fromArray(a,e*2),m.fromArray(a,t*2),h.fromArray(a,n*2),d.sub(u),f.sub(u),m.sub(p),h.sub(p);let i=1/(m.x*h.y-h.x*m.y);isFinite(i)&&(g.copy(d).multiplyScalar(h.y).addScaledVector(f,-m.y).multiplyScalar(i),_.copy(f).multiplyScalar(m.x).addScaledVector(d,-h.x).multiplyScalar(i),c[e].add(g),c[t].add(g),c[n].add(g),l[e].add(_),l[t].add(_),l[n].add(_))}let y=this.groups;y.length===0&&(y=[{start:0,count:n.length}]);for(let e=0,t=y.length;e<t;++e){let t=y[e],r=t.start,i=t.count;for(let e=r,t=r+i;e<t;e+=3)v(n[e+0],n[e+1],n[e+2])}let b=new H,x=new H,S=new H,C=new H;function w(e){S.fromArray(i,e*3),C.copy(S);let t=c[e];b.copy(t),b.sub(S.multiplyScalar(S.dot(t))).normalize(),x.crossVectors(C,t);let n=x.dot(l[e])<0?-1:1;s[e*4]=b.x,s[e*4+1]=b.y,s[e*4+2]=b.z,s[e*4+3]=n}for(let e=0,t=y.length;e<t;++e){let t=y[e],r=t.start,i=t.count;for(let e=r,t=r+i;e<t;e+=3)w(n[e+0]),w(n[e+1]),w(n[e+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0)n=new Un(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new H,i=new H,a=new H,o=new H,s=new H,c=new H,l=new H,u=new H;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)$n.fromBufferAttribute(e,t),$n.normalize(),e.setXYZ(t,$n.x,$n.y,$n.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Un(a,r,i)}if(this.index===null)return console.warn(`THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.6,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:`dispose`})}},tr=new Jt,nr=new qt,rr=new zt,ir=new H,ar=new H,or=new H,sr=new H,cr=new H,lr=new H,ur=new B,dr=new B,fr=new B,pr=new H,mr=new H,hr=new H,gr=new H,_r=new H,vr=class extends bn{constructor(e=new er,t=new Bn){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){lr.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(cr.fromBufferAttribute(s,e),a?lr.addScaledVector(cr,r):lr.addScaledVector(cr.sub(t),r))}t.add(lr)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),rr.copy(n.boundingSphere),rr.applyMatrix4(i),nr.copy(e.ray).recast(e.near),!(rr.containsPoint(nr.origin)===!1&&(nr.intersectSphere(rr,ir)===null||nr.origin.distanceToSquared(ir)>(e.far-e.near)**2))&&(tr.copy(i).invert(),nr.copy(e.ray).applyMatrix4(tr),!(n.boundingBox!==null&&nr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,nr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null)if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=br(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=br(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}else if(s!==void 0)if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=br(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=br(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}};function yr(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;_r.copy(s),_r.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(_r);return l<n.near||l>n.far?null:{distance:l,point:_r.clone(),object:e}}function br(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,ar),e.getVertexPosition(c,or),e.getVertexPosition(l,sr);let u=yr(e,t,n,r,ar,or,sr,gr);if(u){i&&(ur.fromBufferAttribute(i,s),dr.fromBufferAttribute(i,c),fr.fromBufferAttribute(i,l),u.uv=Mn.getInterpolation(gr,ar,or,sr,ur,dr,fr,new B)),a&&(ur.fromBufferAttribute(a,s),dr.fromBufferAttribute(a,c),fr.fromBufferAttribute(a,l),u.uv1=Mn.getInterpolation(gr,ar,or,sr,ur,dr,fr,new B),u.uv2=u.uv1),o&&(pr.fromBufferAttribute(o,s),mr.fromBufferAttribute(o,c),hr.fromBufferAttribute(o,l),u.normal=Mn.getInterpolation(gr,ar,or,sr,pr,mr,hr,new H),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let e={a:s,b:c,c:l,normal:new H,materialIndex:0};Mn.getNormal(ar,or,sr,e.normal),u.face=e}return u}var xr=class e extends er{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Kn(c,3)),this.setAttribute(`normal`,new Kn(l,3)),this.setAttribute(`uv`,new Kn(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new H;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Sr(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone():Array.isArray(i)?t[n][r]=i.slice():t[n][r]=i}}return t}function Cr(e){let t={};for(let n=0;n<e.length;n++){let r=Sr(e[n]);for(let e in r)t[e]=r[e]}return t}function wr(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Tr(e){return e.getRenderTarget()===null?e.outputColorSpace:rt.workingColorSpace}var Er={clone:Sr,merge:Cr},Dr=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Or=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,kr=class extends zn{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Dr,this.fragmentShader=Or,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Sr(e.uniforms),this.uniformsGroups=wr(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Ar=class extends bn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Jt,this.projectionMatrix=new Jt,this.projectionMatrixInverse=new Jt,this.coordinateSystem=I}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},jr=class extends Ar{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=we*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ce*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return we*2*Math.atan(Math.tan(Ce*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ce*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Mr=-90,Nr=1,Pr=class extends bn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new jr(Mr,Nr,e,t);r.layers=this.layers,this.add(r);let i=new jr(Mr,Nr,e,t);i.layers=this.layers,this.add(i);let a=new jr(Mr,Nr,e,t);a.layers=this.layers,this.add(a);let o=new jr(Mr,Nr,e,t);o.layers=this.layers,this.add(o);let s=new jr(Mr,Nr,e,t);s.layers=this.layers,this.add(s);let c=new jr(Mr,Nr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,i),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,s),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Fr=class extends ft{constructor(e,t,n,r,i,a,o,s,c,l){e=e===void 0?[]:e,t=t===void 0?301:t,super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ir=class extends ht{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];t.encoding!==void 0&&(Qe(`THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace.`),t.colorSpace=t.encoding===3001?he:``),this.texture=new Fr(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps===void 0?!1:t.generateMipmaps,this.texture.minFilter=t.minFilter===void 0?D:t.minFilter}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new xr(5,5,5),i=new kr({name:`CubemapFromEquirect`,uniforms:Sr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new vr(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=D),new Pr(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},Lr=new H,Rr=new H,zr=new V,Br=class{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Lr.subVectors(n,t).cross(Rr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Lr),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let i=-(e.start.dot(this.normal)+this.constant)/r;return i<0||i>1?null:t.copy(e.start).addScaledVector(n,i)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||zr.getNormalMatrix(e),r=this.coplanarPoint(Lr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Vr=new zt,Hr=new H,Ur=class{constructor(e=new Br,t=new Br,n=new Br,r=new Br,i=new Br,a=new Br){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=I){let n=this.planes,r=e.elements,i=r[0],a=r[1],o=r[2],s=r[3],c=r[4],l=r[5],u=r[6],d=r[7],f=r[8],p=r[9],m=r[10],h=r[11],g=r[12],_=r[13],v=r[14],y=r[15];if(n[0].setComponents(s-i,d-c,h-f,y-g).normalize(),n[1].setComponents(s+i,d+c,h+f,y+g).normalize(),n[2].setComponents(s+a,d+l,h+p,y+_).normalize(),n[3].setComponents(s-a,d-l,h-p,y-_).normalize(),n[4].setComponents(s-o,d-u,h-m,y-v).normalize(),t===2e3)n[5].setComponents(s+o,d+u,h+m,y+v).normalize();else if(t===2001)n[5].setComponents(o,u,m,v).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Vr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Vr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Vr)}intersectsSprite(e){return Vr.center.set(0,0,0),Vr.radius=.7071067811865476,Vr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Vr)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Hr.x=r.normal.x>0?e.max.x:e.min.x,Hr.y=r.normal.y>0?e.max.y:e.min.y,Hr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Hr)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Wr(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Gr(e,t){let n=t.isWebGL2,r=new WeakMap;function i(t,r){let i=t.array,a=t.usage,o=i.byteLength,s=e.createBuffer();e.bindBuffer(r,s),e.bufferData(r,i,a),t.onUploadCallback();let c;if(i instanceof Float32Array)c=e.FLOAT;else if(i instanceof Uint16Array)if(t.isFloat16BufferAttribute)if(n)c=e.HALF_FLOAT;else throw Error(`THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.`);else c=e.UNSIGNED_SHORT;else if(i instanceof Int16Array)c=e.SHORT;else if(i instanceof Uint32Array)c=e.UNSIGNED_INT;else if(i instanceof Int32Array)c=e.INT;else if(i instanceof Int8Array)c=e.BYTE;else if(i instanceof Uint8Array)c=e.UNSIGNED_BYTE;else if(i instanceof Uint8ClampedArray)c=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+i);return{buffer:s,type:c,bytesPerElement:i.BYTES_PER_ELEMENT,version:t.version,size:o}}function a(t,r,i){let a=r.array,o=r._updateRange,s=r.updateRanges;if(e.bindBuffer(i,t),o.count===-1&&s.length===0&&e.bufferSubData(i,0,a),s.length!==0){for(let t=0,r=s.length;t<r;t++){let r=s[t];n?e.bufferSubData(i,r.start*a.BYTES_PER_ELEMENT,a,r.start,r.count):e.bufferSubData(i,r.start*a.BYTES_PER_ELEMENT,a.subarray(r.start,r.start+r.count))}r.clearUpdateRanges()}o.count!==-1&&(n?e.bufferSubData(i,o.offset*a.BYTES_PER_ELEMENT,a,o.offset,o.count):e.bufferSubData(i,o.offset*a.BYTES_PER_ELEMENT,a.subarray(o.offset,o.offset+o.count)),o.count=-1),r.onUploadCallback()}function o(e){return e.isInterleavedBufferAttribute&&(e=e.data),r.get(e)}function s(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=r.get(t);n&&(e.deleteBuffer(n.buffer),r.delete(t))}function c(e,t){if(e.isGLBufferAttribute){let t=r.get(e);(!t||t.version<e.version)&&r.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}e.isInterleavedBufferAttribute&&(e=e.data);let n=r.get(e);if(n===void 0)r.set(e,i(e,t));else if(n.version<e.version){if(n.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);a(n.buffer,e,t),n.version=e.version}}return{get:o,remove:s,update:c}}var Kr=class e extends er{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Kn(p,3)),this.setAttribute(`normal`,new Kn(m,3)),this.setAttribute(`uv`,new Kn(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},W={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
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
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
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
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
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
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
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
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
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
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
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
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
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
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,common:`#define PI 3.141592653589793
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
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
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
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`
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
}`,envmap_fragment:`#ifdef USE_ENVMAP
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
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
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
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
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
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
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
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
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
}`,lightmap_fragment:`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
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
#endif`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
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
#endif`,lights_physical_pars_fragment:`struct PhysicalMaterial {
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
}`,lights_fragment_begin:`
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
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
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
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
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
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
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
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
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
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
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
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
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
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
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
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
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
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
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
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
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
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
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
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
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
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
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
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
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
}`,depth_frag:`#if DEPTH_PACKING == 3200
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
}`,distanceRGBA_vert:`#define DISTANCE
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
}`,distanceRGBA_frag:`#define DISTANCE
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
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
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
}`,linedashed_frag:`uniform vec3 diffuse;
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
}`,meshbasic_vert:`#include <common>
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
}`,meshbasic_frag:`uniform vec3 diffuse;
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
}`,meshlambert_vert:`#define LAMBERT
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
}`,meshlambert_frag:`#define LAMBERT
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
}`,meshmatcap_vert:`#define MATCAP
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
}`,meshmatcap_frag:`#define MATCAP
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
}`,meshnormal_vert:`#define NORMAL
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
}`,meshnormal_frag:`#define NORMAL
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
}`,meshphong_vert:`#define PHONG
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
}`,meshphong_frag:`#define PHONG
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
}`,meshphysical_vert:`#define STANDARD
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
}`,meshphysical_frag:`#define STANDARD
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
}`,meshtoon_vert:`#define TOON
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
}`,meshtoon_frag:`#define TOON
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
}`,points_vert:`uniform float size;
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
}`,points_frag:`uniform vec3 diffuse;
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
}`,shadow_vert:`#include <common>
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
}`,shadow_frag:`uniform vec3 color;
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
}`,sprite_vert:`uniform float rotation;
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
}`,sprite_frag:`uniform vec3 diffuse;
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
}`},G={common:{diffuse:{value:new U(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new V},alphaMap:{value:null},alphaMapTransform:{value:new V},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new V}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new V}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new V}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new V},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new V},normalScale:{value:new B(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new V},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new V}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new V}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new V}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new U(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new U(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new V},alphaTest:{value:0},uvTransform:{value:new V}},sprite:{diffuse:{value:new U(16777215)},opacity:{value:1},center:{value:new B(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new V},alphaMap:{value:null},alphaMapTransform:{value:new V},alphaTest:{value:0}}},qr={basic:{uniforms:Cr([G.common,G.specularmap,G.envmap,G.aomap,G.lightmap,G.fog]),vertexShader:W.meshbasic_vert,fragmentShader:W.meshbasic_frag},lambert:{uniforms:Cr([G.common,G.specularmap,G.envmap,G.aomap,G.lightmap,G.emissivemap,G.bumpmap,G.normalmap,G.displacementmap,G.fog,G.lights,{emissive:{value:new U(0)}}]),vertexShader:W.meshlambert_vert,fragmentShader:W.meshlambert_frag},phong:{uniforms:Cr([G.common,G.specularmap,G.envmap,G.aomap,G.lightmap,G.emissivemap,G.bumpmap,G.normalmap,G.displacementmap,G.fog,G.lights,{emissive:{value:new U(0)},specular:{value:new U(1118481)},shininess:{value:30}}]),vertexShader:W.meshphong_vert,fragmentShader:W.meshphong_frag},standard:{uniforms:Cr([G.common,G.envmap,G.aomap,G.lightmap,G.emissivemap,G.bumpmap,G.normalmap,G.displacementmap,G.roughnessmap,G.metalnessmap,G.fog,G.lights,{emissive:{value:new U(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:W.meshphysical_vert,fragmentShader:W.meshphysical_frag},toon:{uniforms:Cr([G.common,G.aomap,G.lightmap,G.emissivemap,G.bumpmap,G.normalmap,G.displacementmap,G.gradientmap,G.fog,G.lights,{emissive:{value:new U(0)}}]),vertexShader:W.meshtoon_vert,fragmentShader:W.meshtoon_frag},matcap:{uniforms:Cr([G.common,G.bumpmap,G.normalmap,G.displacementmap,G.fog,{matcap:{value:null}}]),vertexShader:W.meshmatcap_vert,fragmentShader:W.meshmatcap_frag},points:{uniforms:Cr([G.points,G.fog]),vertexShader:W.points_vert,fragmentShader:W.points_frag},dashed:{uniforms:Cr([G.common,G.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:W.linedashed_vert,fragmentShader:W.linedashed_frag},depth:{uniforms:Cr([G.common,G.displacementmap]),vertexShader:W.depth_vert,fragmentShader:W.depth_frag},normal:{uniforms:Cr([G.common,G.bumpmap,G.normalmap,G.displacementmap,{opacity:{value:1}}]),vertexShader:W.meshnormal_vert,fragmentShader:W.meshnormal_frag},sprite:{uniforms:Cr([G.sprite,G.fog]),vertexShader:W.sprite_vert,fragmentShader:W.sprite_frag},background:{uniforms:{uvTransform:{value:new V},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:W.background_vert,fragmentShader:W.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:W.backgroundCube_vert,fragmentShader:W.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:W.cube_vert,fragmentShader:W.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:W.equirect_vert,fragmentShader:W.equirect_frag},distanceRGBA:{uniforms:Cr([G.common,G.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:W.distanceRGBA_vert,fragmentShader:W.distanceRGBA_frag},shadow:{uniforms:Cr([G.lights,G.fog,{color:{value:new U(0)},opacity:{value:1}}]),vertexShader:W.shadow_vert,fragmentShader:W.shadow_frag}};qr.physical={uniforms:Cr([qr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new V},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new V},clearcoatNormalScale:{value:new B(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new V},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new V},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new V},sheen:{value:0},sheenColor:{value:new U(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new V},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new V},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new V},transmissionSamplerSize:{value:new B},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new V},attenuationDistance:{value:0},attenuationColor:{value:new U(0)},specularColor:{value:new U(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new V},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new V},anisotropyVector:{value:new B},anisotropyMap:{value:null},anisotropyMapTransform:{value:new V}}]),vertexShader:W.meshphysical_vert,fragmentShader:W.meshphysical_frag};var Jr={r:0,b:0,g:0};function Yr(e,t,n,r,i,a,o){let s=new U(0),c=a===!0?0:1,l,u,d=null,f=0,p=null;function m(a,m){let g=!1,_=m.isScene===!0?m.background:null;_&&_.isTexture&&(_=(m.backgroundBlurriness>0?n:t).get(_)),_===null?h(s,c):_&&_.isColor&&(h(_,1),g=!0);let v=e.xr.getEnvironmentBlendMode();v===`additive`?r.buffers.color.setClear(0,0,0,1,o):v===`alpha-blend`&&r.buffers.color.setClear(0,0,0,0,o),(e.autoClear||g)&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),_&&(_.isCubeTexture||_.mapping===306)?(u===void 0&&(u=new vr(new xr(1,1,1),new kr({name:`BackgroundCubeMaterial`,uniforms:Sr(qr.backgroundCube.uniforms),vertexShader:qr.backgroundCube.vertexShader,fragmentShader:qr.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute(`normal`),u.geometry.deleteAttribute(`uv`),u.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(u.material,`envMap`,{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,u.material.toneMapped=rt.getTransfer(_.colorSpace)!==ye,(d!==_||f!==_.version||p!==e.toneMapping)&&(u.material.needsUpdate=!0,d=_,f=_.version,p=e.toneMapping),u.layers.enableAll(),a.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new vr(new Kr(2,2),new kr({name:`BackgroundMaterial`,uniforms:Sr(qr.background.uniforms),vertexShader:qr.background.vertexShader,fragmentShader:qr.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute(`normal`),Object.defineProperty(l.material,`map`,{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,l.material.toneMapped=rt.getTransfer(_.colorSpace)!==ye,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(d!==_||f!==_.version||p!==e.toneMapping)&&(l.material.needsUpdate=!0,d=_,f=_.version,p=e.toneMapping),l.layers.enableAll(),a.unshift(l,l.geometry,l.material,0,0,null))}function h(t,n){t.getRGB(Jr,Tr(e)),r.buffers.color.setClear(Jr.r,Jr.g,Jr.b,n,o)}return{getClearColor:function(){return s},setClearColor:function(e,t=1){s.set(e),c=t,h(s,c)},getClearAlpha:function(){return c},setClearAlpha:function(e){c=e,h(s,c)},render:m}}function Xr(e,t,n,r){let i=e.getParameter(e.MAX_VERTEX_ATTRIBS),a=r.isWebGL2?null:t.get(`OES_vertex_array_object`),o=r.isWebGL2||a!==null,s={},c=g(null),l=c,u=!1;function d(t,r,i,a,s){let c=!1;if(o){let e=h(a,i,r);l!==e&&(l=e,p(l.object)),c=_(t,a,i,s),c&&v(t,a,i,s)}else{let e=r.wireframe===!0;(l.geometry!==a.id||l.program!==i.id||l.wireframe!==e)&&(l.geometry=a.id,l.program=i.id,l.wireframe=e,c=!0)}s!==null&&n.update(s,e.ELEMENT_ARRAY_BUFFER),(c||u)&&(u=!1,w(t,r,i,a),s!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(s).buffer))}function f(){return r.isWebGL2?e.createVertexArray():a.createVertexArrayOES()}function p(t){return r.isWebGL2?e.bindVertexArray(t):a.bindVertexArrayOES(t)}function m(t){return r.isWebGL2?e.deleteVertexArray(t):a.deleteVertexArrayOES(t)}function h(e,t,n){let r=n.wireframe===!0,i=s[e.id];i===void 0&&(i={},s[e.id]=i);let a=i[t.id];a===void 0&&(a={},i[t.id]=a);let o=a[r];return o===void 0&&(o=g(f()),a[r]=o),o}function g(e){let t=[],n=[],r=[];for(let e=0;e<i;e++)t[e]=0,n[e]=0,r[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:n,attributeDivisors:r,object:e,attributes:{},index:null}}function _(e,t,n,r){let i=l.attributes,a=t.attributes,o=0,s=n.getAttributes();for(let t in s)if(s[t].location>=0){let n=i[t],r=a[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;o++}return l.attributesNum!==o||l.index!==r}function v(e,t,n,r){let i={},a=t.attributes,o=0,s=n.getAttributes();for(let t in s)if(s[t].location>=0){let n=a[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,o++}l.attributes=i,l.attributesNum=o,l.index=r}function y(){let e=l.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function b(e){x(e,0)}function x(n,i){let a=l.newAttributes,o=l.enabledAttributes,s=l.attributeDivisors;a[n]=1,o[n]===0&&(e.enableVertexAttribArray(n),o[n]=1),s[n]!==i&&((r.isWebGL2?e:t.get(`ANGLE_instanced_arrays`))[r.isWebGL2?`vertexAttribDivisor`:`vertexAttribDivisorANGLE`](n,i),s[n]=i)}function S(){let t=l.newAttributes,n=l.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function C(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function w(i,a,o,s){if(r.isWebGL2===!1&&(i.isInstancedMesh||s.isInstancedBufferGeometry)&&t.get(`ANGLE_instanced_arrays`)===null)return;y();let c=s.attributes,l=o.getAttributes(),u=a.defaultAttributeValues;for(let t in l){let a=l[t];if(a.location>=0){let o=c[t];if(o===void 0&&(t===`instanceMatrix`&&i.instanceMatrix&&(o=i.instanceMatrix),t===`instanceColor`&&i.instanceColor&&(o=i.instanceColor)),o!==void 0){let t=o.normalized,c=o.itemSize,l=n.get(o);if(l===void 0)continue;let u=l.buffer,d=l.type,f=l.bytesPerElement,p=r.isWebGL2===!0&&(d===e.INT||d===e.UNSIGNED_INT||o.gpuType===1013);if(o.isInterleavedBufferAttribute){let n=o.data,r=n.stride,l=o.offset;if(n.isInstancedInterleavedBuffer){for(let e=0;e<a.locationSize;e++)x(a.location+e,n.meshPerAttribute);i.isInstancedMesh!==!0&&s._maxInstanceCount===void 0&&(s._maxInstanceCount=n.meshPerAttribute*n.count)}else for(let e=0;e<a.locationSize;e++)b(a.location+e);e.bindBuffer(e.ARRAY_BUFFER,u);for(let e=0;e<a.locationSize;e++)C(a.location+e,c/a.locationSize,d,t,r*f,(l+c/a.locationSize*e)*f,p)}else{if(o.isInstancedBufferAttribute){for(let e=0;e<a.locationSize;e++)x(a.location+e,o.meshPerAttribute);i.isInstancedMesh!==!0&&s._maxInstanceCount===void 0&&(s._maxInstanceCount=o.meshPerAttribute*o.count)}else for(let e=0;e<a.locationSize;e++)b(a.location+e);e.bindBuffer(e.ARRAY_BUFFER,u);for(let e=0;e<a.locationSize;e++)C(a.location+e,c/a.locationSize,d,t,c*f,c/a.locationSize*e*f,p)}}else if(u!==void 0){let n=u[t];if(n!==void 0)switch(n.length){case 2:e.vertexAttrib2fv(a.location,n);break;case 3:e.vertexAttrib3fv(a.location,n);break;case 4:e.vertexAttrib4fv(a.location,n);break;default:e.vertexAttrib1fv(a.location,n)}}}}S()}function T(){O();for(let e in s){let t=s[e];for(let e in t){let n=t[e];for(let e in n)m(n[e].object),delete n[e];delete t[e]}delete s[e]}}function E(e){if(s[e.id]===void 0)return;let t=s[e.id];for(let e in t){let n=t[e];for(let e in n)m(n[e].object),delete n[e];delete t[e]}delete s[e.id]}function D(e){for(let t in s){let n=s[t];if(n[e.id]===void 0)continue;let r=n[e.id];for(let e in r)m(r[e].object),delete r[e];delete n[e.id]}}function O(){k(),u=!0,l!==c&&(l=c,p(l.object))}function k(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:d,reset:O,resetDefaultState:k,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfProgram:D,initAttributes:y,enableAttribute:b,disableUnusedAttributes:S}}function Zr(e,t,n,r){let i=r.isWebGL2,a;function o(e){a=e}function s(t,r){e.drawArrays(a,t,r),n.update(r,a,1)}function c(r,o,s){if(s===0)return;let c,l;if(i)c=e,l=`drawArraysInstanced`;else if(c=t.get(`ANGLE_instanced_arrays`),l=`drawArraysInstancedANGLE`,c===null){console.error(`THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.`);return}c[l](a,r,o,s),n.update(o,a,s)}function l(e,r,i){if(i===0)return;let o=t.get(`WEBGL_multi_draw`);if(o===null)for(let t=0;t<i;t++)this.render(e[t],r[t]);else{o.multiDrawArraysWEBGL(a,e,0,r,0,i);let t=0;for(let e=0;e<i;e++)t+=r[e];n.update(t,a,1)}}this.setMode=o,this.render=s,this.renderInstances=c,this.renderMultiDraw=l}function Qr(e,t,n){let r;function i(){if(r!==void 0)return r;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);r=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let o=typeof WebGL2RenderingContext<`u`&&e.constructor.name===`WebGL2RenderingContext`,s=n.precision===void 0?`highp`:n.precision,c=a(s);c!==s&&(console.warn(`THREE.WebGLRenderer:`,s,`not supported, using`,c,`instead.`),s=c);let l=o||t.has(`WEBGL_draw_buffers`),u=n.logarithmicDepthBuffer===!0,d=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),f=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=e.getParameter(e.MAX_TEXTURE_SIZE),m=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),h=e.getParameter(e.MAX_VERTEX_ATTRIBS),g=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),_=e.getParameter(e.MAX_VARYING_VECTORS),v=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),y=f>0,b=o||t.has(`OES_texture_float`),x=y&&b,S=o?e.getParameter(e.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:a,precision:s,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:g,maxVaryings:_,maxFragmentUniforms:v,vertexTextures:y,floatFragmentTextures:b,floatVertexTextures:x,maxSamples:S}}function $r(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Br,s=new V,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}function ei(e){let t=new WeakMap;function n(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function r(r){if(r&&r.isTexture){let a=r.mapping;if(a===303||a===304)if(t.has(r)){let e=t.get(r).texture;return n(e,r.mapping)}else{let a=r.image;if(a&&a.height>0){let o=new Ir(a.height/2);return o.fromEquirectangularTexture(e,r),t.set(r,o),r.addEventListener(`dispose`,i),n(o.texture,r.mapping)}else return null}}return r}function i(e){let n=e.target;n.removeEventListener(`dispose`,i);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function a(){t=new WeakMap}return{get:r,dispose:a}}var ti=class extends Ar{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ni=4,ri=[.125,.215,.35,.446,.526,.582],ii=20,ai=new ti,oi=new U,si=null,ci=0,li=0,ui=(1+Math.sqrt(5))/2,di=1/ui,fi=[new H(1,1,1),new H(-1,1,1),new H(1,1,-1),new H(-1,1,-1),new H(0,ui,di),new H(0,ui,-di),new H(di,0,ui),new H(-di,0,ui),new H(ui,di,0),new H(-ui,di,0)],pi=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){si=this._renderer.getRenderTarget(),ci=this._renderer.getActiveCubeFace(),li=this._renderer.getActiveMipmapLevel(),this._setSize(256);let i=this._allocateTargets();return i.depthBuffer=!0,this._sceneToCubeUV(e,n,r,i),t>0&&this._blur(i,0,0,t),this._applyPMREM(i),this._cleanup(i),i}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yi(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vi(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(si,ci,li),e.scissorTest=!1,gi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),si=this._renderer.getRenderTarget(),ci=this._renderer.getActiveCubeFace(),li=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:D,minFilter:D,generateMipmaps:!1,type:ne,format:M,colorSpace:ge,depthBuffer:!1},r=hi(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hi(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=mi(r)),this._blurMaterial=_i(r,e,t)}return r}_compileMaterial(e){let t=new vr(this._lodPlanes[0],e);this._renderer.compile(t,ai)}_sceneToCubeUV(e,t,n,r){let i=new jr(90,1,t,n),a=[1,-1,1,1,1,1],o=[1,1,1,-1,-1,-1],s=this._renderer,c=s.autoClear,l=s.toneMapping;s.getClearColor(oi),s.toneMapping=0,s.autoClear=!1;let u=new Bn({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1}),d=new vr(new xr,u),f=!1,p=e.background;p?p.isColor&&(u.color.copy(p),e.background=null,f=!0):(u.color.copy(oi),f=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(i.up.set(0,a[t],0),i.lookAt(o[t],0,0)):n===1?(i.up.set(0,0,a[t]),i.lookAt(0,o[t],0)):(i.up.set(0,a[t],0),i.lookAt(0,0,o[t]));let c=this._cubeSize;gi(r,n*c,t>2?c:0,c,c),s.setRenderTarget(r),f&&s.render(d,i),s.render(e,i)}d.geometry.dispose(),d.material.dispose(),s.toneMapping=l,s.autoClear=c,e.background=p}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=yi()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=vi());let i=r?this._cubemapMaterial:this._equirectMaterial,a=new vr(this._lodPlanes[0],i),o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;gi(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,ai)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let t=1;t<this._lodPlanes.length;t++){let n=Math.sqrt(this._sigmas[t]*this._sigmas[t]-this._sigmas[t-1]*this._sigmas[t-1]),r=fi[(t-1)%fi.length];this._blur(e,t-1,t,n,r)}t.autoClear=n}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&console.error(`blur direction must be either latitudinal or longitudinal!`);let l=new vr(this._lodPlanes[r],c),u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/(2*ii-1),p=i/f,m=isFinite(i)?1+Math.floor(3*p):ii;m>ii&&console.warn(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ii}`);let h=[],g=0;for(let e=0;e<ii;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];gi(t,3*v*(r>_-ni?r-_+ni:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,ai)}};function mi(e){let t=[],n=[],r=[],i=e,a=e-ni+1+ri.length;for(let o=0;o<a;o++){let a=2**i;n.push(a);let s=1/a;o>e-ni?s=ri[o-e+ni-1]:o===0&&(s=0),r.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new er;h.setAttribute(`position`,new Un(f,3)),h.setAttribute(`uv`,new Un(p,2)),h.setAttribute(`faceIndex`,new Un(m,1)),t.push(h),i>ni&&i--}return{lodPlanes:t,sizeLods:n,sigmas:r}}function hi(e,t,n){let r=new ht(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function gi(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function _i(e,t,n){let r=new Float32Array(ii),i=new H(0,1,0);return new kr({name:`SphericalGaussianBlur`,defines:{n:ii,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:bi(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function vi(){return new kr({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:bi(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function yi(){return new kr({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bi(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function bi(){return`

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
	`}function xi(e){let t=new WeakMap,n=null;function r(r){if(r&&r.isTexture){let o=r.mapping,s=o===303||o===304,c=o===301||o===302;if(s||c)if(r.isRenderTargetTexture&&r.needsPMREMUpdate===!0){r.needsPMREMUpdate=!1;let i=t.get(r);return n===null&&(n=new pi(e)),i=s?n.fromEquirectangular(r,i):n.fromCubemap(r,i),t.set(r,i),i.texture}else if(t.has(r))return t.get(r).texture;else{let o=r.image;if(s&&o&&o.height>0||c&&o&&i(o)){n===null&&(n=new pi(e));let i=s?n.fromEquirectangular(r):n.fromCubemap(r);return t.set(r,i),r.addEventListener(`dispose`,a),i.texture}else return null}}return r}function i(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function a(e){let n=e.target;n.removeEventListener(`dispose`,a);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function o(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:o}}function Si(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r;switch(n){case`WEBGL_depth_texture`:r=e.getExtension(`WEBGL_depth_texture`)||e.getExtension(`MOZ_WEBGL_depth_texture`)||e.getExtension(`WEBKIT_WEBGL_depth_texture`);break;case`EXT_texture_filter_anisotropic`:r=e.getExtension(`EXT_texture_filter_anisotropic`)||e.getExtension(`MOZ_EXT_texture_filter_anisotropic`)||e.getExtension(`WEBKIT_EXT_texture_filter_anisotropic`);break;case`WEBGL_compressed_texture_s3tc`:r=e.getExtension(`WEBGL_compressed_texture_s3tc`)||e.getExtension(`MOZ_WEBGL_compressed_texture_s3tc`)||e.getExtension(`WEBKIT_WEBGL_compressed_texture_s3tc`);break;case`WEBGL_compressed_texture_pvrtc`:r=e.getExtension(`WEBGL_compressed_texture_pvrtc`)||e.getExtension(`WEBKIT_WEBGL_compressed_texture_pvrtc`);break;default:r=e.getExtension(n)}return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(e){e.isWebGL2?(n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`)):(n(`WEBGL_depth_texture`),n(`OES_texture_float`),n(`OES_texture_half_float`),n(`OES_texture_half_float_linear`),n(`OES_standard_derivatives`),n(`OES_element_index_uint`),n(`OES_vertex_array_object`),n(`ANGLE_instanced_arrays`)),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`)},get:function(e){let t=n(e);return t===null&&console.warn(`THREE.WebGLRenderer: `+e+` extension not supported.`),t}}}function Ci(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);for(let e in s.morphAttributes){let n=s.morphAttributes[e];for(let e=0,r=n.length;e<r;e++)t.remove(n[e])}s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER);let i=n.morphAttributes;for(let n in i){let r=i[n];for(let n=0,i=r.length;n<i;n++)t.update(r[n],e.ARRAY_BUFFER)}}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else if(i!==void 0){let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}else return;let s=new(Je(n)?Gn:Wn)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function wi(e,t,n,r){let i=r.isWebGL2,a;function o(e){a=e}let s,c;function l(e){s=e.type,c=e.bytesPerElement}function u(t,r){e.drawElements(a,r,s,t*c),n.update(r,a,1)}function d(r,o,l){if(l===0)return;let u,d;if(i)u=e,d=`drawElementsInstanced`;else if(u=t.get(`ANGLE_instanced_arrays`),d=`drawElementsInstancedANGLE`,u===null){console.error(`THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.`);return}u[d](a,o,s,r*c,l),n.update(o,a,l)}function f(e,r,i){if(i===0)return;let o=t.get(`WEBGL_multi_draw`);if(o===null)for(let t=0;t<i;t++)this.render(e[t]/c,r[t]);else{o.multiDrawElementsWEBGL(a,r,0,s,e,0,i);let t=0;for(let e=0;e<i;e++)t+=r[e];n.update(t,a,1)}}this.setMode=o,this.setIndex=l,this.render=u,this.renderInstances=d,this.renderMultiDraw=f}function Ti(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:console.error(`THREE.WebGLInfo: Unknown draw mode:`,r);break}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Ei(e,t){return e[0]-t[0]}function Di(e,t){return Math.abs(t[1])-Math.abs(e[1])}function Oi(e,t,n){let r={},i=new Float32Array(8),a=new WeakMap,o=new pt,s=[];for(let e=0;e<8;e++)s[e]=[e,0];function c(c,l,u){let d=c.morphTargetInfluences;if(t.isWebGL2===!0){let r=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,i=r===void 0?0:r.length,s=a.get(l);if(s===void 0||s.count!==i){s!==void 0&&s.texture.dispose();let e=l.morphAttributes.position!==void 0,n=l.morphAttributes.normal!==void 0,r=l.morphAttributes.color!==void 0,c=l.morphAttributes.position||[],u=l.morphAttributes.normal||[],d=l.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),r===!0&&(f=3);let p=l.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*i),g=new gt(h,p,m,i);g.type=A,g.needsUpdate=!0;let _=f*4;for(let t=0;t<i;t++){let i=c[t],a=u[t],s=d[t],l=p*m*4*t;for(let t=0;t<i.count;t++){let c=t*_;e===!0&&(o.fromBufferAttribute(i,t),h[l+c+0]=o.x,h[l+c+1]=o.y,h[l+c+2]=o.z,h[l+c+3]=0),n===!0&&(o.fromBufferAttribute(a,t),h[l+c+4]=o.x,h[l+c+5]=o.y,h[l+c+6]=o.z,h[l+c+7]=0),r===!0&&(o.fromBufferAttribute(s,t),h[l+c+8]=o.x,h[l+c+9]=o.y,h[l+c+10]=o.z,h[l+c+11]=s.itemSize===4?o.w:1)}}s={count:i,texture:g,size:new B(p,m)},a.set(l,s);function v(){g.dispose(),a.delete(l),l.removeEventListener(`dispose`,v)}l.addEventListener(`dispose`,v)}let c=0;for(let e=0;e<d.length;e++)c+=d[e];let f=l.morphTargetsRelative?1:1-c;u.getUniforms().setValue(e,`morphTargetBaseInfluence`,f),u.getUniforms().setValue(e,`morphTargetInfluences`,d),u.getUniforms().setValue(e,`morphTargetsTexture`,s.texture,n),u.getUniforms().setValue(e,`morphTargetsTextureSize`,s.size)}else{let t=d===void 0?0:d.length,n=r[l.id];if(n===void 0||n.length!==t){n=[];for(let e=0;e<t;e++)n[e]=[e,0];r[l.id]=n}for(let e=0;e<t;e++){let t=n[e];t[0]=e,t[1]=d[e]}n.sort(Di);for(let e=0;e<8;e++)e<t&&n[e][1]?(s[e][0]=n[e][0],s[e][1]=n[e][1]):(s[e][0]=2**53-1,s[e][1]=0);s.sort(Ei);let a=l.morphAttributes.position,o=l.morphAttributes.normal,c=0;for(let e=0;e<8;e++){let t=s[e],n=t[0],r=t[1];n!==2**53-1&&r?(a&&l.getAttribute(`morphTarget`+e)!==a[n]&&l.setAttribute(`morphTarget`+e,a[n]),o&&l.getAttribute(`morphNormal`+e)!==o[n]&&l.setAttribute(`morphNormal`+e,o[n]),i[e]=r,c+=r):(a&&l.hasAttribute(`morphTarget`+e)===!0&&l.deleteAttribute(`morphTarget`+e),o&&l.hasAttribute(`morphNormal`+e)===!0&&l.deleteAttribute(`morphNormal`+e),i[e]=0)}let f=l.morphTargetsRelative?1:1-c;u.getUniforms().setValue(e,`morphTargetBaseInfluence`,f),u.getUniforms().setValue(e,`morphTargetInfluences`,i)}}return{update:c}}function ki(e,t,n,r){let i=new WeakMap;function a(a){let o=r.render.frame,c=a.geometry,l=t.get(a,c);if(i.get(l)!==o&&(t.update(l),i.set(l,o)),a.isInstancedMesh&&(a.hasEventListener(`dispose`,s)===!1&&a.addEventListener(`dispose`,s),i.get(a)!==o&&(n.update(a.instanceMatrix,e.ARRAY_BUFFER),a.instanceColor!==null&&n.update(a.instanceColor,e.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let e=a.skeleton;i.get(e)!==o&&(e.update(),i.set(e,o))}return l}function o(){i=new WeakMap}function s(e){let t=e.target;t.removeEventListener(`dispose`,s),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:a,dispose:o}}var Ai=class extends ft{constructor(e,t,n,r,i,a,o,s,c,l){if(l=l===void 0?re:l,l!==1026&&l!==1027)throw Error(`DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);n===void 0&&l===1026&&(n=te),n===void 0&&l===1027&&(n=j),super(null,r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o===void 0?w:o,this.minFilter=s===void 0?w:s,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},ji=new ft,Mi=new Ai(1,1);Mi.compareFunction=515;var Ni=new gt,Pi=new _t,Fi=new Fr,Ii=[],Li=[],Ri=new Float32Array(16),zi=new Float32Array(9),Bi=new Float32Array(4);function Vi(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Ii[i];if(a===void 0&&(a=new Float32Array(i),Ii[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Hi(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Ui(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Wi(e,t){let n=Li[t];n===void 0&&(n=new Int32Array(t),Li[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Gi(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Ki(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Hi(n,t))return;e.uniform2fv(this.addr,t),Ui(n,t)}}function qi(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Hi(n,t))return;e.uniform3fv(this.addr,t),Ui(n,t)}}function Ji(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Hi(n,t))return;e.uniform4fv(this.addr,t),Ui(n,t)}}function Yi(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Hi(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Ui(n,t)}else{if(Hi(n,r))return;Bi.set(r),e.uniformMatrix2fv(this.addr,!1,Bi),Ui(n,r)}}function Xi(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Hi(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Ui(n,t)}else{if(Hi(n,r))return;zi.set(r),e.uniformMatrix3fv(this.addr,!1,zi),Ui(n,r)}}function Zi(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Hi(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Ui(n,t)}else{if(Hi(n,r))return;Ri.set(r),e.uniformMatrix4fv(this.addr,!1,Ri),Ui(n,r)}}function Qi(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function $i(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Hi(n,t))return;e.uniform2iv(this.addr,t),Ui(n,t)}}function ea(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Hi(n,t))return;e.uniform3iv(this.addr,t),Ui(n,t)}}function ta(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Hi(n,t))return;e.uniform4iv(this.addr,t),Ui(n,t)}}function na(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function ra(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Hi(n,t))return;e.uniform2uiv(this.addr,t),Ui(n,t)}}function ia(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Hi(n,t))return;e.uniform3uiv(this.addr,t),Ui(n,t)}}function aa(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Hi(n,t))return;e.uniform4uiv(this.addr,t),Ui(n,t)}}function oa(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a=this.type===e.SAMPLER_2D_SHADOW?Mi:ji;n.setTexture2D(t||a,i)}function sa(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Pi,i)}function ca(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Fi,i)}function la(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Ni,i)}function ua(e){switch(e){case 5126:return Gi;case 35664:return Ki;case 35665:return qi;case 35666:return Ji;case 35674:return Yi;case 35675:return Xi;case 35676:return Zi;case 5124:case 35670:return Qi;case 35667:case 35671:return $i;case 35668:case 35672:return ea;case 35669:case 35673:return ta;case 5125:return na;case 36294:return ra;case 36295:return ia;case 36296:return aa;case 35678:case 36198:case 36298:case 36306:case 35682:return oa;case 35679:case 36299:case 36307:return sa;case 35680:case 36300:case 36308:case 36293:return ca;case 36289:case 36303:case 36311:case 36292:return la}}function da(e,t){e.uniform1fv(this.addr,t)}function fa(e,t){let n=Vi(t,this.size,2);e.uniform2fv(this.addr,n)}function pa(e,t){let n=Vi(t,this.size,3);e.uniform3fv(this.addr,n)}function ma(e,t){let n=Vi(t,this.size,4);e.uniform4fv(this.addr,n)}function ha(e,t){let n=Vi(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function ga(e,t){let n=Vi(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function _a(e,t){let n=Vi(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function va(e,t){e.uniform1iv(this.addr,t)}function ya(e,t){e.uniform2iv(this.addr,t)}function ba(e,t){e.uniform3iv(this.addr,t)}function xa(e,t){e.uniform4iv(this.addr,t)}function Sa(e,t){e.uniform1uiv(this.addr,t)}function Ca(e,t){e.uniform2uiv(this.addr,t)}function wa(e,t){e.uniform3uiv(this.addr,t)}function Ta(e,t){e.uniform4uiv(this.addr,t)}function Ea(e,t,n){let r=this.cache,i=t.length,a=Wi(n,i);Hi(r,a)||(e.uniform1iv(this.addr,a),Ui(r,a));for(let e=0;e!==i;++e)n.setTexture2D(t[e]||ji,a[e])}function Da(e,t,n){let r=this.cache,i=t.length,a=Wi(n,i);Hi(r,a)||(e.uniform1iv(this.addr,a),Ui(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Pi,a[e])}function Oa(e,t,n){let r=this.cache,i=t.length,a=Wi(n,i);Hi(r,a)||(e.uniform1iv(this.addr,a),Ui(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Fi,a[e])}function ka(e,t,n){let r=this.cache,i=t.length,a=Wi(n,i);Hi(r,a)||(e.uniform1iv(this.addr,a),Ui(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Ni,a[e])}function Aa(e){switch(e){case 5126:return da;case 35664:return fa;case 35665:return pa;case 35666:return ma;case 35674:return ha;case 35675:return ga;case 35676:return _a;case 5124:case 35670:return va;case 35667:case 35671:return ya;case 35668:case 35672:return ba;case 35669:case 35673:return xa;case 5125:return Sa;case 36294:return Ca;case 36295:return wa;case 36296:return Ta;case 35678:case 36198:case 36298:case 36306:case 35682:return Ea;case 35679:case 36299:case 36307:return Da;case 35680:case 36300:case 36308:case 36293:return Oa;case 36289:case 36303:case 36311:case 36292:return ka}}var ja=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ua(t.type)}},Ma=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Aa(t.type)}},Na=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Pa=/(\w+)(\])?(\[|\.)?/g;function Fa(e,t){e.seq.push(t),e.map[t.id]=t}function Ia(e,t,n){let r=e.name,i=r.length;for(Pa.lastIndex=0;;){let a=Pa.exec(r),o=Pa.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Fa(n,l===void 0?new ja(s,e,t):new Ma(s,e,t));break}else{let e=n.map[s];e===void 0&&(e=new Na(s),Fa(n,e)),n=e}}}var La=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Ia(n,e.getUniformLocation(t,n.name),this)}}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Ra(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var za=37297,Ba=0;function Va(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}function Ha(e){let t=rt.getPrimaries(rt.workingColorSpace),n=rt.getPrimaries(e),r;switch(t===n?r=``:t===`p3`&&n===`rec709`?r=`LinearDisplayP3ToLinearSRGB`:t===`rec709`&&n===`p3`&&(r=`LinearSRGBToLinearDisplayP3`),e){case ge:case ve:return[r,`LinearTransferOETF`];case he:case _e:return[r,`sRGBTransferOETF`];default:return console.warn(`THREE.WebGLProgram: Unsupported color space:`,e),[r,`LinearTransferOETF`]}}function Ua(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=e.getShaderInfoLog(t).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Va(e.getShaderSource(t),r)}else return i}function Wa(e,t){let n=Ha(t);return`vec4 ${e}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function Ga(e,t){let n;switch(t){case 1:n=`Linear`;break;case 2:n=`Reinhard`;break;case 3:n=`OptimizedCineon`;break;case 4:n=`ACESFilmic`;break;case 6:n=`AgX`;break;case 5:n=`Custom`;break;default:console.warn(`THREE.WebGLProgram: Unsupported toneMapping:`,t),n=`Linear`}return`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}function Ka(e){return[e.extensionDerivatives||e.envMapCubeUVHeight||e.bumpMap||e.normalMapTangentSpace||e.clearcoatNormalMap||e.flatShading||e.shaderID===`physical`?`#extension GL_OES_standard_derivatives : enable`:``,(e.extensionFragDepth||e.logarithmicDepthBuffer)&&e.rendererExtensionFragDepth?`#extension GL_EXT_frag_depth : enable`:``,e.extensionDrawBuffers&&e.rendererExtensionDrawBuffers?`#extension GL_EXT_draw_buffers : require`:``,(e.extensionShaderTextureLOD||e.envMap||e.transmission)&&e.rendererExtensionShaderTextureLod?`#extension GL_EXT_shader_texture_lod : enable`:``].filter(Xa).join(`
`)}function qa(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``].filter(Xa).join(`
`)}function Ja(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Ya(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Xa(e){return e!==``}function Za(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Qa(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var $a=/^[ \t]*#include +<([\w\d./]+)>/gm;function eo(e){return e.replace($a,no)}var to=new Map([[`encodings_fragment`,`colorspace_fragment`],[`encodings_pars_fragment`,`colorspace_pars_fragment`],[`output_fragment`,`opaque_fragment`]]);function no(e,t){let n=W[t];if(n===void 0){let e=to.get(t);if(e!==void 0)n=W[e],console.warn(`THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`Can not resolve #include <`+t+`>`)}return eo(n)}var ro=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function io(e){return e.replace(ro,ao)}function ao(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function oo(e){let t=`precision `+e.precision+` float;
precision `+e.precision+` int;`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}function so(e){let t=`SHADOWMAP_TYPE_BASIC`;return e.shadowMapType===1?t=`SHADOWMAP_TYPE_PCF`:e.shadowMapType===2?t=`SHADOWMAP_TYPE_PCF_SOFT`:e.shadowMapType===3&&(t=`SHADOWMAP_TYPE_VSM`),t}function co(e){let t=`ENVMAP_TYPE_CUBE`;if(e.envMap)switch(e.envMapMode){case 301:case 302:t=`ENVMAP_TYPE_CUBE`;break;case 306:t=`ENVMAP_TYPE_CUBE_UV`;break}return t}function lo(e){let t=`ENVMAP_MODE_REFLECTION`;if(e.envMap)switch(e.envMapMode){case 302:t=`ENVMAP_MODE_REFRACTION`;break}return t}function uo(e){let t=`ENVMAP_BLENDING_NONE`;if(e.envMap)switch(e.combine){case 0:t=`ENVMAP_BLENDING_MULTIPLY`;break;case 1:t=`ENVMAP_BLENDING_MIX`;break;case 2:t=`ENVMAP_BLENDING_ADD`;break}return t}function fo(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function po(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=so(n),l=co(n),u=lo(n),d=uo(n),f=fo(n),p=n.isWebGL2?``:Ka(n),m=qa(n),h=Ja(a),g=i.createProgram(),_,v,y=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h].filter(Xa).join(`
`),_.length>0&&(_+=`
`),v=[p,`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h].filter(Xa).join(`
`),v.length>0&&(v+=`
`)):(_=[oo(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors&&n.isWebGL2?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0&&n.isWebGL2?`#define MORPHTARGETS_TEXTURE`:``,n.morphTargetsCount>0&&n.isWebGL2?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0&&n.isWebGL2?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.useLegacyLights?`#define LEGACY_LIGHTS`:``,n.logarithmicDepthBuffer?`#define USE_LOGDEPTHBUF`:``,n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?`#define USE_LOGDEPTHBUF_EXT`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )`,`	attribute vec3 morphTarget0;`,`	attribute vec3 morphTarget1;`,`	attribute vec3 morphTarget2;`,`	attribute vec3 morphTarget3;`,`	#ifdef USE_MORPHNORMALS`,`		attribute vec3 morphNormal0;`,`		attribute vec3 morphNormal1;`,`		attribute vec3 morphNormal2;`,`		attribute vec3 morphNormal3;`,`	#else`,`		attribute vec3 morphTarget4;`,`		attribute vec3 morphTarget5;`,`		attribute vec3 morphTarget6;`,`		attribute vec3 morphTarget7;`,`	#endif`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Xa).join(`
`),v=[p,oo(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.useLegacyLights?`#define LEGACY_LIGHTS`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.logarithmicDepthBuffer?`#define USE_LOGDEPTHBUF`:``,n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?`#define USE_LOGDEPTHBUF_EXT`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:W.tonemapping_pars_fragment,n.toneMapping===0?``:Ga(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,W.colorspace_pars_fragment,Wa(`linearToOutputTexel`,n.outputColorSpace),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Xa).join(`
`)),o=eo(o),o=Za(o,n),o=Qa(o,n),s=eo(s),s=Za(s,n),s=Qa(s,n),o=io(o),s=io(s),n.isWebGL2&&n.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,_=[m,`precision mediump sampler2DArray;`,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+_,v=[`precision mediump sampler2DArray;`,`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+v);let b=y+_+o,x=y+v+s,S=Ra(i,i.VERTEX_SHADER,b),C=Ra(i,i.FRAGMENT_SHADER,x);i.attachShader(g,S),i.attachShader(g,C),n.index0AttributeName===void 0?n.morphTargets===!0&&i.bindAttribLocation(g,0,`position`):i.bindAttribLocation(g,0,n.index0AttributeName),i.linkProgram(g);function w(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(g).trim(),r=i.getShaderInfoLog(S).trim(),a=i.getShaderInfoLog(C).trim(),o=!0,s=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(o=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,g,S,C);else{let e=Ua(i,S,`vertex`),t=Ua(i,C,`fragment`);console.error(`THREE.WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Program Info Log: `+n+`
`+e+`
`+t)}else n===``?(r===``||a===``)&&(s=!1):console.warn(`THREE.WebGLProgram: Program Info Log:`,n);s&&(t.diagnostics={runnable:o,programLog:n,vertexShader:{log:r,prefix:_},fragmentShader:{log:a,prefix:v}})}i.deleteShader(S),i.deleteShader(C),T=new La(i,g),E=Ya(i,g)}let T;this.getUniforms=function(){return T===void 0&&w(this),T};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let D=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=i.getProgramParameter(g,za)),D},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Ba++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=S,this.fragmentShader=C,this}var mo=0,ho=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),i=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new go(e),t.set(e,n)),n}},go=class{constructor(e){this.id=mo++,this.code=e,this.usedTimes=0}};function _o(e,t,n,r,i,a,o){let s=new on,c=new ho,l=[],u=i.isWebGL2,d=i.logarithmicDepthBuffer,f=i.vertexTextures,p=i.precision,m={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distanceRGBA`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function h(e){return e===0?`uv`:`uv${e}`}function g(a,s,l,g,_){let v=g.fog,y=_.geometry,b=a.isMeshStandardMaterial?g.environment:null,x=(a.isMeshStandardMaterial?n:t).get(a.envMap||b),S=x&&x.mapping===306?x.image.height:null,C=m[a.type];a.precision!==null&&(p=i.getMaxPrecision(a.precision),p!==a.precision&&console.warn(`THREE.WebGLProgram.getParameters:`,a.precision,`not supported, using`,p,`instead.`));let w=y.morphAttributes.position||y.morphAttributes.normal||y.morphAttributes.color,T=w===void 0?0:w.length,E=0;y.morphAttributes.position!==void 0&&(E=1),y.morphAttributes.normal!==void 0&&(E=2),y.morphAttributes.color!==void 0&&(E=3);let D,O,k,ee;if(C){let e=qr[C];D=e.vertexShader,O=e.fragmentShader}else D=a.vertexShader,O=a.fragmentShader,c.update(a),k=c.getVertexShaderID(a),ee=c.getFragmentShaderID(a);let te=e.getRenderTarget(),A=_.isInstancedMesh===!0,ne=_.isBatchedMesh===!0,j=!!a.map,M=!!a.matcap,re=!!x,ie=!!a.aoMap,ae=!!a.lightMap,oe=!!a.bumpMap,se=!!a.normalMap,ce=!!a.displacementMap,le=!!a.emissiveMap,ue=!!a.metalnessMap,de=!!a.roughnessMap,fe=a.anisotropy>0,pe=a.clearcoat>0,me=a.iridescence>0,he=a.sheen>0,_e=a.transmission>0,ve=fe&&!!a.anisotropyMap,N=pe&&!!a.clearcoatMap,ye=pe&&!!a.clearcoatNormalMap,be=pe&&!!a.clearcoatRoughnessMap,P=me&&!!a.iridescenceMap,F=me&&!!a.iridescenceThicknessMap,xe=he&&!!a.sheenColorMap,I=he&&!!a.sheenRoughnessMap,L=!!a.specularMap,R=!!a.specularColorMap,Se=!!a.specularIntensityMap,Ce=_e&&!!a.transmissionMap,we=_e&&!!a.thicknessMap,Te=!!a.gradientMap,z=!!a.alphaMap,Ee=a.alphaTest>0,De=!!a.alphaHash,Oe=!!a.extensions,ke=!!y.attributes.uv1,Ae=!!y.attributes.uv2,je=!!y.attributes.uv3,Me=0;return a.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Me=e.toneMapping),{isWebGL2:u,shaderID:C,shaderType:a.type,shaderName:a.name,vertexShader:D,fragmentShader:O,defines:a.defines,customVertexShaderID:k,customFragmentShaderID:ee,isRawShaderMaterial:a.isRawShaderMaterial===!0,glslVersion:a.glslVersion,precision:p,batching:ne,instancing:A,instancingColor:A&&_.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:te===null?e.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:ge,map:j,matcap:M,envMap:re,envMapMode:re&&x.mapping,envMapCubeUVHeight:S,aoMap:ie,lightMap:ae,bumpMap:oe,normalMap:se,displacementMap:f&&ce,emissiveMap:le,normalMapObjectSpace:se&&a.normalMapType===1,normalMapTangentSpace:se&&a.normalMapType===0,metalnessMap:ue,roughnessMap:de,anisotropy:fe,anisotropyMap:ve,clearcoat:pe,clearcoatMap:N,clearcoatNormalMap:ye,clearcoatRoughnessMap:be,iridescence:me,iridescenceMap:P,iridescenceThicknessMap:F,sheen:he,sheenColorMap:xe,sheenRoughnessMap:I,specularMap:L,specularColorMap:R,specularIntensityMap:Se,transmission:_e,transmissionMap:Ce,thicknessMap:we,gradientMap:Te,opaque:a.transparent===!1&&a.blending===1,alphaMap:z,alphaTest:Ee,alphaHash:De,combine:a.combine,mapUv:j&&h(a.map.channel),aoMapUv:ie&&h(a.aoMap.channel),lightMapUv:ae&&h(a.lightMap.channel),bumpMapUv:oe&&h(a.bumpMap.channel),normalMapUv:se&&h(a.normalMap.channel),displacementMapUv:ce&&h(a.displacementMap.channel),emissiveMapUv:le&&h(a.emissiveMap.channel),metalnessMapUv:ue&&h(a.metalnessMap.channel),roughnessMapUv:de&&h(a.roughnessMap.channel),anisotropyMapUv:ve&&h(a.anisotropyMap.channel),clearcoatMapUv:N&&h(a.clearcoatMap.channel),clearcoatNormalMapUv:ye&&h(a.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&h(a.clearcoatRoughnessMap.channel),iridescenceMapUv:P&&h(a.iridescenceMap.channel),iridescenceThicknessMapUv:F&&h(a.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&h(a.sheenColorMap.channel),sheenRoughnessMapUv:I&&h(a.sheenRoughnessMap.channel),specularMapUv:L&&h(a.specularMap.channel),specularColorMapUv:R&&h(a.specularColorMap.channel),specularIntensityMapUv:Se&&h(a.specularIntensityMap.channel),transmissionMapUv:Ce&&h(a.transmissionMap.channel),thicknessMapUv:we&&h(a.thicknessMap.channel),alphaMapUv:z&&h(a.alphaMap.channel),vertexTangents:!!y.attributes.tangent&&(se||fe),vertexColors:a.vertexColors,vertexAlphas:a.vertexColors===!0&&!!y.attributes.color&&y.attributes.color.itemSize===4,vertexUv1s:ke,vertexUv2s:Ae,vertexUv3s:je,pointsUvs:_.isPoints===!0&&!!y.attributes.uv&&(j||z),fog:!!v,useFog:a.fog===!0,fogExp2:v&&v.isFogExp2,flatShading:a.flatShading===!0,sizeAttenuation:a.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:_.isSkinnedMesh===!0,morphTargets:y.morphAttributes.position!==void 0,morphNormals:y.morphAttributes.normal!==void 0,morphColors:y.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numDirLights:s.directional.length,numPointLights:s.point.length,numSpotLights:s.spot.length,numSpotLightMaps:s.spotLightMap.length,numRectAreaLights:s.rectArea.length,numHemiLights:s.hemi.length,numDirLightShadows:s.directionalShadowMap.length,numPointLightShadows:s.pointShadowMap.length,numSpotLightShadows:s.spotShadowMap.length,numSpotLightShadowsWithMaps:s.numSpotLightShadowsWithMaps,numLightProbes:s.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:a.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Me,useLegacyLights:e._useLegacyLights,decodeVideoTexture:j&&a.map.isVideoTexture===!0&&rt.getTransfer(a.map.colorSpace)===`srgb`,premultipliedAlpha:a.premultipliedAlpha,doubleSided:a.side===2,flipSided:a.side===1,useDepthPacking:a.depthPacking>=0,depthPacking:a.depthPacking||0,index0AttributeName:a.index0AttributeName,extensionDerivatives:Oe&&a.extensions.derivatives===!0,extensionFragDepth:Oe&&a.extensions.fragDepth===!0,extensionDrawBuffers:Oe&&a.extensions.drawBuffers===!0,extensionShaderTextureLOD:Oe&&a.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Oe&&a.extensions.clipCullDistance&&r.has(`WEBGL_clip_cull_distance`),rendererExtensionFragDepth:u||r.has(`EXT_frag_depth`),rendererExtensionDrawBuffers:u||r.has(`WEBGL_draw_buffers`),rendererExtensionShaderTextureLod:u||r.has(`EXT_shader_texture_lod`),rendererExtensionParallelShaderCompile:r.has(`KHR_parallel_shader_compile`),customProgramCacheKey:a.customProgramCacheKey()}}function _(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(v(n,t),y(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function v(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function y(e,t){s.disableAll(),t.isWebGL2&&s.enable(0),t.supportsVertexTextures&&s.enable(1),t.instancing&&s.enable(2),t.instancingColor&&s.enable(3),t.matcap&&s.enable(4),t.envMap&&s.enable(5),t.normalMapObjectSpace&&s.enable(6),t.normalMapTangentSpace&&s.enable(7),t.clearcoat&&s.enable(8),t.iridescence&&s.enable(9),t.alphaTest&&s.enable(10),t.vertexColors&&s.enable(11),t.vertexAlphas&&s.enable(12),t.vertexUv1s&&s.enable(13),t.vertexUv2s&&s.enable(14),t.vertexUv3s&&s.enable(15),t.vertexTangents&&s.enable(16),t.anisotropy&&s.enable(17),t.alphaHash&&s.enable(18),t.batching&&s.enable(19),e.push(s.mask),s.disableAll(),t.fog&&s.enable(0),t.useFog&&s.enable(1),t.flatShading&&s.enable(2),t.logarithmicDepthBuffer&&s.enable(3),t.skinning&&s.enable(4),t.morphTargets&&s.enable(5),t.morphNormals&&s.enable(6),t.morphColors&&s.enable(7),t.premultipliedAlpha&&s.enable(8),t.shadowMapEnabled&&s.enable(9),t.useLegacyLights&&s.enable(10),t.doubleSided&&s.enable(11),t.flipSided&&s.enable(12),t.useDepthPacking&&s.enable(13),t.dithering&&s.enable(14),t.transmission&&s.enable(15),t.sheen&&s.enable(16),t.opaque&&s.enable(17),t.pointsUvs&&s.enable(18),t.decodeVideoTexture&&s.enable(19),e.push(s.mask)}function b(e){let t=m[e.type],n;if(t){let e=qr[t];n=Er.clone(e.uniforms)}else n=e.uniforms;return n}function x(t,n){let r;for(let e=0,t=l.length;e<t;e++){let t=l[e];if(t.cacheKey===n){r=t,++r.usedTimes;break}}return r===void 0&&(r=new po(e,n,t,a),l.push(r)),r}function S(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),e.destroy()}}function C(e){c.remove(e)}function w(){c.dispose()}return{getParameters:g,getProgramCacheKey:_,getUniforms:b,acquireProgram:x,releaseProgram:S,releaseShaderCache:C,programs:l,dispose:w}}function vo(){let e=new WeakMap;function t(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function n(t){e.delete(t)}function r(t,n,r){e.get(t)[n]=r}function i(){e=new WeakMap}return{get:t,remove:n,update:r,dispose:i}}function yo(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.z===t.z?e.id-t.id:e.z-t.z:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function bo(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function xo(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(n,r,i,a,o,s){let c=e[t];return c===void 0?(c={id:n.id,object:n,geometry:r,material:i,groupOrder:a,renderOrder:n.renderOrder,z:o,group:s},e[t]=c):(c.id=n.id,c.object=n,c.geometry=r,c.material=i,c.groupOrder=a,c.renderOrder=n.renderOrder,c.z=o,c.group=s),t++,c}function s(e,t,a,s,c,l){let u=o(e,t,a,s,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function c(e,t,a,s,c,l){let u=o(e,t,a,s,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function l(e,t){n.length>1&&n.sort(e||yo),r.length>1&&r.sort(t||bo),i.length>1&&i.sort(t||bo)}function u(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:s,unshift:c,finish:u,sort:l}}function So(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new xo,e.set(t,[i])):n>=r.length?(i=new xo,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Co(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new H,color:new U};break;case`SpotLight`:n={position:new H,direction:new H,color:new U,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new H,color:new U,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new H,skyColor:new U,groundColor:new U};break;case`RectAreaLight`:n={color:new U,position:new H,halfWidth:new H,halfHeight:new H};break}return e[t.id]=n,n}}}function wo(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new B};break;case`SpotLight`:n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new B};break;case`PointLight`:n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new B,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var To=0;function Eo(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Do(e,t){let n=new Co,r=wo(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)i.probe.push(new H);let a=new H,o=new Jt,s=new Jt;function c(a,o){let s=0,c=0,l=0;for(let e=0;e<9;e++)i.probe[e].set(0,0,0);let u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0;a.sort(Eo);let x=o===!0?Math.PI:1;for(let e=0,t=a.length;e<t;e++){let t=a[e],o=t.color,S=t.intensity,C=t.distance,w=t.shadow&&t.shadow.map?t.shadow.map.texture:null;if(t.isAmbientLight)s+=o.r*S*x,c+=o.g*S*x,l+=o.b*S*x;else if(t.isLightProbe){for(let e=0;e<9;e++)i.probe[e].addScaledVector(t.sh.coefficients[e],S);b++}else if(t.isDirectionalLight){let e=n.get(t);if(e.color.copy(t.color).multiplyScalar(t.intensity*x),t.castShadow){let e=t.shadow,n=r.get(t);n.shadowBias=e.bias,n.shadowNormalBias=e.normalBias,n.shadowRadius=e.radius,n.shadowMapSize=e.mapSize,i.directionalShadow[u]=n,i.directionalShadowMap[u]=w,i.directionalShadowMatrix[u]=t.shadow.matrix,h++}i.directional[u]=e,u++}else if(t.isSpotLight){let e=n.get(t);e.position.setFromMatrixPosition(t.matrixWorld),e.color.copy(o).multiplyScalar(S*x),e.distance=C,e.coneCos=Math.cos(t.angle),e.penumbraCos=Math.cos(t.angle*(1-t.penumbra)),e.decay=t.decay,i.spot[f]=e;let a=t.shadow;if(t.map&&(i.spotLightMap[v]=t.map,v++,a.updateMatrices(t),t.castShadow&&y++),i.spotLightMatrix[f]=a.matrix,t.castShadow){let e=r.get(t);e.shadowBias=a.bias,e.shadowNormalBias=a.normalBias,e.shadowRadius=a.radius,e.shadowMapSize=a.mapSize,i.spotShadow[f]=e,i.spotShadowMap[f]=w,_++}f++}else if(t.isRectAreaLight){let e=n.get(t);e.color.copy(o).multiplyScalar(S),e.halfWidth.set(t.width*.5,0,0),e.halfHeight.set(0,t.height*.5,0),i.rectArea[p]=e,p++}else if(t.isPointLight){let e=n.get(t);if(e.color.copy(t.color).multiplyScalar(t.intensity*x),e.distance=t.distance,e.decay=t.decay,t.castShadow){let e=t.shadow,n=r.get(t);n.shadowBias=e.bias,n.shadowNormalBias=e.normalBias,n.shadowRadius=e.radius,n.shadowMapSize=e.mapSize,n.shadowCameraNear=e.camera.near,n.shadowCameraFar=e.camera.far,i.pointShadow[d]=n,i.pointShadowMap[d]=w,i.pointShadowMatrix[d]=t.shadow.matrix,g++}i.point[d]=e,d++}else if(t.isHemisphereLight){let e=n.get(t);e.skyColor.copy(t.color).multiplyScalar(S*x),e.groundColor.copy(t.groundColor).multiplyScalar(S*x),i.hemi[m]=e,m++}}p>0&&(t.isWebGL2?e.has(`OES_texture_float_linear`)===!0?(i.rectAreaLTC1=G.LTC_FLOAT_1,i.rectAreaLTC2=G.LTC_FLOAT_2):(i.rectAreaLTC1=G.LTC_HALF_1,i.rectAreaLTC2=G.LTC_HALF_2):e.has(`OES_texture_float_linear`)===!0?(i.rectAreaLTC1=G.LTC_FLOAT_1,i.rectAreaLTC2=G.LTC_FLOAT_2):e.has(`OES_texture_half_float_linear`)===!0?(i.rectAreaLTC1=G.LTC_HALF_1,i.rectAreaLTC2=G.LTC_HALF_2):console.error(`THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.`)),i.ambient[0]=s,i.ambient[1]=c,i.ambient[2]=l;let S=i.hash;(S.directionalLength!==u||S.pointLength!==d||S.spotLength!==f||S.rectAreaLength!==p||S.hemiLength!==m||S.numDirectionalShadows!==h||S.numPointShadows!==g||S.numSpotShadows!==_||S.numSpotMaps!==v||S.numLightProbes!==b)&&(i.directional.length=u,i.spot.length=f,i.rectArea.length=p,i.point.length=d,i.hemi.length=m,i.directionalShadow.length=h,i.directionalShadowMap.length=h,i.pointShadow.length=g,i.pointShadowMap.length=g,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=h,i.pointShadowMatrix.length=g,i.spotLightMatrix.length=_+v-y,i.spotLightMap.length=v,i.numSpotLightShadowsWithMaps=y,i.numLightProbes=b,S.directionalLength=u,S.pointLength=d,S.spotLength=f,S.rectAreaLength=p,S.hemiLength=m,S.numDirectionalShadows=h,S.numPointShadows=g,S.numSpotShadows=_,S.numSpotMaps=v,S.numLightProbes=b,i.version=To++)}function l(e,t){let n=0,r=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=i.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),a.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(a),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=i.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),a.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(a),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=i.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s.identity(),o.copy(f.matrixWorld),o.premultiply(d),s.extractRotation(o),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(s),e.halfHeight.applyMatrix4(s),l++}else if(f.isPointLight){let e=i.point[r];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),r++}else if(f.isHemisphereLight){let e=i.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:c,setupView:l,state:i}}function Oo(e,t){let n=new Do(e,t),r=[],i=[];function a(){r.length=0,i.length=0}function o(e){r.push(e)}function s(e){i.push(e)}function c(e){n.setup(r,e)}function l(e){n.setupView(r,e)}return{init:a,state:{lightsArray:r,shadowsArray:i,lights:n},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function ko(e,t){let n=new WeakMap;function r(r,i=0){let a=n.get(r),o;return a===void 0?(o=new Oo(e,t),n.set(r,[o])):i>=a.length?(o=new Oo(e,t),a.push(o)):o=a[i],o}function i(){n=new WeakMap}return{get:r,dispose:i}}var Ao=class extends zn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=pe,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},jo=class extends zn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},Mo=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,No=`uniform sampler2D shadow_pass;
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
}`;function Po(e,t,n){let r=new Ur,i=new B,a=new B,o=new pt,s=new Ao({depthPacking:me}),c=new jo,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new kr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new B},radius:{value:4}},vertexShader:Mo,fragmentShader:No}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new er;m.setAttribute(`position`,new Un(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new vr(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==3&&this.type===3,m=_===3&&this.type!==3;for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){console.warn(`THREE.WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let h=d.getFrameExtents();if(i.multiply(h),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/h.x),i.x=a.x*h.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/h.y),i.y=a.y*h.y,d.mapSize.y=a.y)),d.map===null||p===!0||m===!0){let e=this.type===3?{}:{minFilter:w,magFilter:w};d.map!==null&&d.map.dispose(),d.map=new ht(i.x,i.y,e),d.map.texture.name=l.name+`.shadowMap`,d.camera.updateProjectionMatrix()}e.setRenderTarget(d.map),e.clear();let g=d.getViewportCount();for(let e=0;e<g;e++){let t=d.getViewport(e);o.set(a.x*t.x,a.y*t.y,a.x*t.z,a.y*t.w),f.viewport(o),d.updateMatrices(l,e),r=d.getFrustum(),b(n,s,d.camera,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new ht(i.x,i.y)),f.uniforms.shadow_pass.value=n.map.texture,f.uniforms.resolution.value=n.mapSize,f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value=n.mapSize,p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||r.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Fo(e,t,n){let r=n.isWebGL2;function i(){let t=!1,n=new pt,r=null,i=new pt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function a(){let t=!1,n=null,r=null,i=null;return{setTest:function(t){t?fe(e.DEPTH_TEST):pe(e.DEPTH_TEST)},setMask:function(r){n!==r&&!t&&(e.depthMask(r),n=r)},setFunc:function(t){if(r!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}r=t}},setLocked:function(e){t=e},setClear:function(t){i!==t&&(e.clearDepth(t),i=t)},reset:function(){t=!1,n=null,r=null,i=null}}}function o(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?fe(e.STENCIL_TEST):pe(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let s=new i,c=new a,l=new o,u=new WeakMap,d=new WeakMap,f={},p={},m=new WeakMap,h=[],g=null,_=!1,v=null,y=null,b=null,x=null,S=null,C=null,w=null,T=new U(0,0,0),E=0,D=!1,O=null,k=null,ee=null,te=null,A=null,ne=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,M=0,re=e.getParameter(e.VERSION);re.indexOf(`WebGL`)===-1?re.indexOf(`OpenGL ES`)!==-1&&(M=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),j=M>=2):(M=parseFloat(/^WebGL (\d)/.exec(re)[1]),j=M>=1);let ie=null,ae={},oe=e.getParameter(e.SCISSOR_BOX),se=e.getParameter(e.VIEWPORT),ce=new pt().fromArray(oe),le=new pt().fromArray(se);function ue(t,n,i,a){let o=new Uint8Array(4),s=e.createTexture();e.bindTexture(t,s),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let s=0;s<i;s++)r&&(t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY)?e.texImage3D(n,0,e.RGBA,1,1,a,0,e.RGBA,e.UNSIGNED_BYTE,o):e.texImage2D(n+s,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,o);return s}let de={};de[e.TEXTURE_2D]=ue(e.TEXTURE_2D,e.TEXTURE_2D,1),de[e.TEXTURE_CUBE_MAP]=ue(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),r&&(de[e.TEXTURE_2D_ARRAY]=ue(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),de[e.TEXTURE_3D]=ue(e.TEXTURE_3D,e.TEXTURE_3D,1,1)),s.setClear(0,0,0,1),c.setClear(1),l.setClear(0),fe(e.DEPTH_TEST),c.setFunc(3),be(!1),P(1),fe(e.CULL_FACE),N(0);function fe(t){f[t]!==!0&&(e.enable(t),f[t]=!0)}function pe(t){f[t]!==!1&&(e.disable(t),f[t]=!1)}function me(t,n){return p[t]===n?!1:(e.bindFramebuffer(t,n),p[t]=n,r&&(t===e.DRAW_FRAMEBUFFER&&(p[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(p[e.DRAW_FRAMEBUFFER]=n)),!0)}function he(r,i){let a=h,o=!1;if(r)if(a=m.get(i),a===void 0&&(a=[],m.set(i,a)),r.isWebGLMultipleRenderTargets){let t=r.texture;if(a.length!==t.length||a[0]!==e.COLOR_ATTACHMENT0){for(let n=0,r=t.length;n<r;n++)a[n]=e.COLOR_ATTACHMENT0+n;a.length=t.length,o=!0}}else a[0]!==e.COLOR_ATTACHMENT0&&(a[0]=e.COLOR_ATTACHMENT0,o=!0);else a[0]!==e.BACK&&(a[0]=e.BACK,o=!0);o&&(n.isWebGL2?e.drawBuffers(a):t.get(`WEBGL_draw_buffers`).drawBuffersWEBGL(a))}function ge(t){return g===t?!1:(e.useProgram(t),g=t,!0)}let _e={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};if(r)_e[103]=e.MIN,_e[104]=e.MAX;else{let e=t.get(`EXT_blend_minmax`);e!==null&&(_e[103]=e.MIN_EXT,_e[104]=e.MAX_EXT)}let ve={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function N(t,n,r,i,a,o,s,c,l,u){if(t===0){_===!0&&(pe(e.BLEND),_=!1);return}if(_===!1&&(fe(e.BLEND),_=!0),t!==5){if(t!==v||u!==D){if((y!==100||S!==100)&&(e.blendEquation(e.FUNC_ADD),y=100,S=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ZERO,e.SRC_ALPHA);break;default:console.error(`THREE.WebGLState: Invalid blending: `,t);break}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.SRC_ALPHA,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFunc(e.ZERO,e.SRC_COLOR);break;default:console.error(`THREE.WebGLState: Invalid blending: `,t);break}b=null,x=null,C=null,w=null,T.set(0,0,0),E=0,v=t,D=u}return}a||=n,o||=r,s||=i,(n!==y||a!==S)&&(e.blendEquationSeparate(_e[n],_e[a]),y=n,S=a),(r!==b||i!==x||o!==C||s!==w)&&(e.blendFuncSeparate(ve[r],ve[i],ve[o],ve[s]),b=r,x=i,C=o,w=s),(c.equals(T)===!1||l!==E)&&(e.blendColor(c.r,c.g,c.b,l),T.copy(c),E=l),v=t,D=!1}function ye(t,n){t.side===2?pe(e.CULL_FACE):fe(e.CULL_FACE);let r=t.side===1;n&&(r=!r),be(r),t.blending===1&&t.transparent===!1?N(0):N(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),c.setFunc(t.depthFunc),c.setTest(t.depthTest),c.setMask(t.depthWrite),s.setMask(t.colorWrite);let i=t.stencilWrite;l.setTest(i),i&&(l.setMask(t.stencilWriteMask),l.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),l.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),xe(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?fe(e.SAMPLE_ALPHA_TO_COVERAGE):pe(e.SAMPLE_ALPHA_TO_COVERAGE)}function be(t){O!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),O=t)}function P(t){t===0?pe(e.CULL_FACE):(fe(e.CULL_FACE),t!==k&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),k=t}function F(t){t!==ee&&(j&&e.lineWidth(t),ee=t)}function xe(t,n,r){t?(fe(e.POLYGON_OFFSET_FILL),(te!==n||A!==r)&&(e.polygonOffset(n,r),te=n,A=r)):pe(e.POLYGON_OFFSET_FILL)}function I(t){t?fe(e.SCISSOR_TEST):pe(e.SCISSOR_TEST)}function L(t){t===void 0&&(t=e.TEXTURE0+ne-1),ie!==t&&(e.activeTexture(t),ie=t)}function R(t,n,r){r===void 0&&(r=ie===null?e.TEXTURE0+ne-1:ie);let i=ae[r];i===void 0&&(i={type:void 0,texture:void 0},ae[r]=i),(i.type!==t||i.texture!==n)&&(ie!==r&&(e.activeTexture(r),ie=r),e.bindTexture(t,n||de[t]),i.type=t,i.texture=n)}function Se(){let t=ae[ie];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ce(){try{e.compressedTexImage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function we(){try{e.compressedTexImage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Te(){try{e.texSubImage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function z(){try{e.texSubImage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ee(){try{e.compressedTexSubImage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function De(){try{e.compressedTexSubImage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Oe(){try{e.texStorage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function ke(){try{e.texStorage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ae(){try{e.texImage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function je(){try{e.texImage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Me(t){ce.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ce.copy(t))}function Ne(t){le.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),le.copy(t))}function Pe(t,n){let r=d.get(n);r===void 0&&(r=new WeakMap,d.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Fe(t,n){let r=d.get(n).get(t);u.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),u.set(n,r))}function Ie(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),r===!0&&(e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null)),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),f={},ie=null,ae={},p={},m=new WeakMap,h=[],g=null,_=!1,v=null,y=null,b=null,x=null,S=null,C=null,w=null,T=new U(0,0,0),E=0,D=!1,O=null,k=null,ee=null,te=null,A=null,ce.set(0,0,e.canvas.width,e.canvas.height),le.set(0,0,e.canvas.width,e.canvas.height),s.reset(),c.reset(),l.reset()}return{buffers:{color:s,depth:c,stencil:l},enable:fe,disable:pe,bindFramebuffer:me,drawBuffers:he,useProgram:ge,setBlending:N,setMaterial:ye,setFlipSided:be,setCullFace:P,setLineWidth:F,setPolygonOffset:xe,setScissorTest:I,activeTexture:L,bindTexture:R,unbindTexture:Se,compressedTexImage2D:Ce,compressedTexImage3D:we,texImage2D:Ae,texImage3D:je,updateUBOMapping:Pe,uniformBlockBinding:Fe,texStorage2D:Oe,texStorage3D:ke,texSubImage2D:Te,texSubImage3D:z,compressedTexSubImage2D:Ee,compressedTexSubImage3D:De,scissor:Me,viewport:Ne,reset:Ie}}function Io(e,t,n,r,i,a,o){let s=i.isWebGL2,c=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,l=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap,d,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function m(e,t){return p?new OffscreenCanvas(e,t):Ye(`canvas`)}function h(e,t,n,r){let i=1;if((e.width>r||e.height>r)&&(i=r/Math.max(e.width,e.height)),i<1||t===!0)if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let r=t?He:Math.floor,a=r(i*e.width),o=r(i*e.height);d===void 0&&(d=m(a,o));let s=n?m(a,o):d;return s.width=a,s.height=o,s.getContext(`2d`).drawImage(e,0,0,a,o),console.warn(`THREE.WebGLRenderer: Texture has been resized from (`+e.width+`x`+e.height+`) to (`+a+`x`+o+`).`),s}else return`data`in e&&console.warn(`THREE.WebGLRenderer: Image in DataTexture is too big (`+e.width+`x`+e.height+`).`),e;return e}function g(e){return Be(e.width)&&Be(e.height)}function _(e){return s?!1:e.wrapS!==1001||e.wrapT!==1001||e.minFilter!==1003&&e.minFilter!==1006}function v(e,t){return e.generateMipmaps&&t&&e.minFilter!==1003&&e.minFilter!==1006}function y(t){e.generateMipmap(t)}function b(n,r,i,a,o=!1){if(s===!1)return r;if(n!==null){if(e[n]!==void 0)return e[n];console.warn(`THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c=r;if(r===e.RED&&(i===e.FLOAT&&(c=e.R32F),i===e.HALF_FLOAT&&(c=e.R16F),i===e.UNSIGNED_BYTE&&(c=e.R8)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(c=e.R8UI),i===e.UNSIGNED_SHORT&&(c=e.R16UI),i===e.UNSIGNED_INT&&(c=e.R32UI),i===e.BYTE&&(c=e.R8I),i===e.SHORT&&(c=e.R16I),i===e.INT&&(c=e.R32I)),r===e.RG&&(i===e.FLOAT&&(c=e.RG32F),i===e.HALF_FLOAT&&(c=e.RG16F),i===e.UNSIGNED_BYTE&&(c=e.RG8)),r===e.RGBA){let t=o?N:rt.getTransfer(a);i===e.FLOAT&&(c=e.RGBA32F),i===e.HALF_FLOAT&&(c=e.RGBA16F),i===e.UNSIGNED_BYTE&&(c=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT_4_4_4_4&&(c=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(c=e.RGB5_A1)}return(c===e.R16F||c===e.R32F||c===e.RG16F||c===e.RG32F||c===e.RGBA16F||c===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),c}function ee(e,t,n){return v(e,n)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function A(t){return t===1003||t===1004||t===1005?e.NEAREST:e.LINEAR}function ne(e){let t=e.target;t.removeEventListener(`dispose`,ne),re(t),t.isVideoTexture&&u.delete(t)}function M(e){let t=e.target;t.removeEventListener(`dispose`,M),ae(t)}function re(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=f.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&ie(e),Object.keys(i).length===0&&f.delete(n)}r.remove(e)}function ie(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=f.get(i);delete a[n.__cacheKey],o.memory.textures--}function ae(t){let n=t.texture,i=r.get(t),a=r.get(n);if(a.__webglTexture!==void 0&&(e.deleteTexture(a.__webglTexture),o.memory.textures--),t.depthTexture&&t.depthTexture.dispose(),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(i.__webglFramebuffer[t]))for(let n=0;n<i.__webglFramebuffer[t].length;n++)e.deleteFramebuffer(i.__webglFramebuffer[t][n]);else e.deleteFramebuffer(i.__webglFramebuffer[t]);i.__webglDepthbuffer&&e.deleteRenderbuffer(i.__webglDepthbuffer[t])}else{if(Array.isArray(i.__webglFramebuffer))for(let t=0;t<i.__webglFramebuffer.length;t++)e.deleteFramebuffer(i.__webglFramebuffer[t]);else e.deleteFramebuffer(i.__webglFramebuffer);if(i.__webglDepthbuffer&&e.deleteRenderbuffer(i.__webglDepthbuffer),i.__webglMultisampledFramebuffer&&e.deleteFramebuffer(i.__webglMultisampledFramebuffer),i.__webglColorRenderbuffer)for(let t=0;t<i.__webglColorRenderbuffer.length;t++)i.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(i.__webglColorRenderbuffer[t]);i.__webglDepthRenderbuffer&&e.deleteRenderbuffer(i.__webglDepthRenderbuffer)}if(t.isWebGLMultipleRenderTargets)for(let t=0,i=n.length;t<i;t++){let i=r.get(n[t]);i.__webglTexture&&(e.deleteTexture(i.__webglTexture),o.memory.textures--),r.remove(n[t])}r.remove(n),r.remove(t)}let oe=0;function se(){oe=0}function ce(){let e=oe;return e>=i.maxTextures&&console.warn(`THREE.WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+i.maxTextures),oe+=1,e}function le(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function ue(t,i){let a=r.get(t);if(t.isVideoTexture&&Ee(t),t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)console.warn(`THREE.WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)console.warn(`THREE.WebGLRenderer: Texture marked for update but image is incomplete`);else{ye(a,t,i);return}}n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function de(t,i){let a=r.get(t);if(t.version>0&&a.__version!==t.version){ye(a,t,i);return}n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function fe(t,i){let a=r.get(t);if(t.version>0&&a.__version!==t.version){ye(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function pe(t,i){let a=r.get(t);if(t.version>0&&a.__version!==t.version){be(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let me={[x]:e.REPEAT,[S]:e.CLAMP_TO_EDGE,[C]:e.MIRRORED_REPEAT},he={[w]:e.NEAREST,[T]:e.NEAREST_MIPMAP_NEAREST,[E]:e.NEAREST_MIPMAP_LINEAR,[D]:e.LINEAR,[O]:e.LINEAR_MIPMAP_NEAREST,[k]:e.LINEAR_MIPMAP_LINEAR},ge={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function _e(n,a,o){if(o?(e.texParameteri(n,e.TEXTURE_WRAP_S,me[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,me[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,me[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,he[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,he[a.minFilter])):(e.texParameteri(n,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(n,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,e.CLAMP_TO_EDGE),(a.wrapS!==1001||a.wrapT!==1001)&&console.warn(`THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.`),e.texParameteri(n,e.TEXTURE_MAG_FILTER,A(a.magFilter)),e.texParameteri(n,e.TEXTURE_MIN_FILTER,A(a.minFilter)),a.minFilter!==1003&&a.minFilter!==1006&&console.warn(`THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.`)),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ge[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){let o=t.get(`EXT_texture_filter_anisotropic`);if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1||s===!1&&a.type===1016&&t.has(`OES_texture_half_float_linear`)===!1)return;(a.anisotropy>1||r.get(a).__currentAnisotropy)&&(e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy)}}function ve(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,ne));let i=n.source,a=f.get(i);a===void 0&&(a={},f.set(i,a));let s=le(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&ie(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function ye(t,o,c){let l=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(l=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(l=e.TEXTURE_3D);let u=ve(t,o),d=o.source;n.bindTexture(l,t.__webglTexture,e.TEXTURE0+c);let f=r.get(d);if(d.version!==f.__version||u===!0){n.activeTexture(e.TEXTURE0+c);let t=rt.getPrimaries(rt.workingColorSpace),r=o.colorSpace===``?null:rt.getPrimaries(o.colorSpace),p=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,p);let m=_(o)&&g(o.image)===!1,x=h(o.image,m,!1,i.maxTextureSize);x=De(o,x);let S=g(x)||s,C=a.convert(o.format,o.colorSpace),w=a.convert(o.type),T=b(o.internalFormat,C,w,o.colorSpace,o.isVideoTexture);_e(l,o,S);let E,D=o.mipmaps,O=s&&o.isVideoTexture!==!0&&T!==36196,k=f.__version===void 0||u===!0,A=ee(o,x,S);if(o.isDepthTexture)T=e.DEPTH_COMPONENT,s?T=o.type===1015?e.DEPTH_COMPONENT32F:o.type===1014?e.DEPTH_COMPONENT24:o.type===1020?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT16:o.type===1015&&console.error(`WebGLRenderer: Floating point depth texture requires WebGL2.`),o.format===1026&&T===e.DEPTH_COMPONENT&&o.type!==1012&&o.type!==1014&&(console.warn(`THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture.`),o.type=te,w=a.convert(o.type)),o.format===1027&&T===e.DEPTH_COMPONENT&&(T=e.DEPTH_STENCIL,o.type!==1020&&(console.warn(`THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture.`),o.type=j,w=a.convert(o.type))),k&&(O?n.texStorage2D(e.TEXTURE_2D,1,T,x.width,x.height):n.texImage2D(e.TEXTURE_2D,0,T,x.width,x.height,0,C,w,null));else if(o.isDataTexture)if(D.length>0&&S){O&&k&&n.texStorage2D(e.TEXTURE_2D,A,T,D[0].width,D[0].height);for(let t=0,r=D.length;t<r;t++)E=D[t],O?n.texSubImage2D(e.TEXTURE_2D,t,0,0,E.width,E.height,C,w,E.data):n.texImage2D(e.TEXTURE_2D,t,T,E.width,E.height,0,C,w,E.data);o.generateMipmaps=!1}else O?(k&&n.texStorage2D(e.TEXTURE_2D,A,T,x.width,x.height),n.texSubImage2D(e.TEXTURE_2D,0,0,0,x.width,x.height,C,w,x.data)):n.texImage2D(e.TEXTURE_2D,0,T,x.width,x.height,0,C,w,x.data);else if(o.isCompressedTexture)if(o.isCompressedArrayTexture){O&&k&&n.texStorage3D(e.TEXTURE_2D_ARRAY,A,T,D[0].width,D[0].height,x.depth);for(let t=0,r=D.length;t<r;t++)E=D[t],o.format===1023?O?n.texSubImage3D(e.TEXTURE_2D_ARRAY,t,0,0,0,E.width,E.height,x.depth,C,w,E.data):n.texImage3D(e.TEXTURE_2D_ARRAY,t,T,E.width,E.height,x.depth,0,C,w,E.data):C===null?console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):O?n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,t,0,0,0,E.width,E.height,x.depth,C,E.data,0,0):n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,t,T,E.width,E.height,x.depth,0,E.data,0,0)}else{O&&k&&n.texStorage2D(e.TEXTURE_2D,A,T,D[0].width,D[0].height);for(let t=0,r=D.length;t<r;t++)E=D[t],o.format===1023?O?n.texSubImage2D(e.TEXTURE_2D,t,0,0,E.width,E.height,C,w,E.data):n.texImage2D(e.TEXTURE_2D,t,T,E.width,E.height,0,C,w,E.data):C===null?console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):O?n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,E.width,E.height,C,E.data):n.compressedTexImage2D(e.TEXTURE_2D,t,T,E.width,E.height,0,E.data)}else if(o.isDataArrayTexture)O?(k&&n.texStorage3D(e.TEXTURE_2D_ARRAY,A,T,x.width,x.height,x.depth),n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,x.width,x.height,x.depth,C,w,x.data)):n.texImage3D(e.TEXTURE_2D_ARRAY,0,T,x.width,x.height,x.depth,0,C,w,x.data);else if(o.isData3DTexture)O?(k&&n.texStorage3D(e.TEXTURE_3D,A,T,x.width,x.height,x.depth),n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,x.width,x.height,x.depth,C,w,x.data)):n.texImage3D(e.TEXTURE_3D,0,T,x.width,x.height,x.depth,0,C,w,x.data);else if(o.isFramebufferTexture){if(k)if(O)n.texStorage2D(e.TEXTURE_2D,A,T,x.width,x.height);else{let t=x.width,r=x.height;for(let i=0;i<A;i++)n.texImage2D(e.TEXTURE_2D,i,T,t,r,0,C,w,null),t>>=1,r>>=1}}else if(D.length>0&&S){O&&k&&n.texStorage2D(e.TEXTURE_2D,A,T,D[0].width,D[0].height);for(let t=0,r=D.length;t<r;t++)E=D[t],O?n.texSubImage2D(e.TEXTURE_2D,t,0,0,C,w,E):n.texImage2D(e.TEXTURE_2D,t,T,C,w,E);o.generateMipmaps=!1}else O?(k&&n.texStorage2D(e.TEXTURE_2D,A,T,x.width,x.height),n.texSubImage2D(e.TEXTURE_2D,0,0,0,C,w,x)):n.texImage2D(e.TEXTURE_2D,0,T,C,w,x);v(o,S)&&y(l),f.__version=d.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function be(t,o,c){if(o.image.length!==6)return;let l=ve(t,o),u=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+c);let d=r.get(u);if(u.version!==d.__version||l===!0){n.activeTexture(e.TEXTURE0+c);let t=rt.getPrimaries(rt.workingColorSpace),r=o.colorSpace===``?null:rt.getPrimaries(o.colorSpace),f=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,f);let p=o.isCompressedTexture||o.image[0].isCompressedTexture,m=o.image[0]&&o.image[0].isDataTexture,_=[];for(let e=0;e<6;e++)!p&&!m?_[e]=h(o.image[e],!1,!0,i.maxCubemapSize):_[e]=m?o.image[e].image:o.image[e],_[e]=De(o,_[e]);let x=_[0],S=g(x)||s,C=a.convert(o.format,o.colorSpace),w=a.convert(o.type),T=b(o.internalFormat,C,w,o.colorSpace),E=s&&o.isVideoTexture!==!0,D=d.__version===void 0||l===!0,O=ee(o,x,S);_e(e.TEXTURE_CUBE_MAP,o,S);let k;if(p){E&&D&&n.texStorage2D(e.TEXTURE_CUBE_MAP,O,T,x.width,x.height);for(let t=0;t<6;t++){k=_[t].mipmaps;for(let r=0;r<k.length;r++){let i=k[r];o.format===1023?E?n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,C,w,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,T,i.width,i.height,0,C,w,i.data):C===null?console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):E?n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,C,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,T,i.width,i.height,0,i.data)}}}else{k=o.mipmaps,E&&D&&(k.length>0&&O++,n.texStorage2D(e.TEXTURE_CUBE_MAP,O,T,_[0].width,_[0].height));for(let t=0;t<6;t++)if(m){E?n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,_[t].width,_[t].height,C,w,_[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,T,_[t].width,_[t].height,0,C,w,_[t].data);for(let r=0;r<k.length;r++){let i=k[r].image[t].image;E?n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,C,w,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,T,i.width,i.height,0,C,w,i.data)}}else{E?n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,C,w,_[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,T,C,w,_[t]);for(let r=0;r<k.length;r++){let i=k[r];E?n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,C,w,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,T,C,w,i.image[t])}}}v(o,S)&&y(e.TEXTURE_CUBE_MAP),d.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function P(t,i,o,s,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.colorSpace);if(!r.get(i).__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),z(i)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,s,l,r.get(o).__webglTexture,0,Te(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,s,l,r.get(o).__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function F(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer&&!n.stencilBuffer){let i=s===!0?e.DEPTH_COMPONENT24:e.DEPTH_COMPONENT16;if(r||z(n)){let t=n.depthTexture;t&&t.isDepthTexture&&(t.type===1015?i=e.DEPTH_COMPONENT32F:t.type===1014&&(i=e.DEPTH_COMPONENT24));let r=Te(n);z(n)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,r,i,n.width,n.height):e.renderbufferStorageMultisample(e.RENDERBUFFER,r,i,n.width,n.height)}else e.renderbufferStorage(e.RENDERBUFFER,i,n.width,n.height);e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,t)}else if(n.depthBuffer&&n.stencilBuffer){let i=Te(n);r&&z(n)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,i,e.DEPTH24_STENCIL8,n.width,n.height):z(n)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,i,e.DEPTH24_STENCIL8,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_STENCIL,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.RENDERBUFFER,t)}else{let t=n.isWebGLMultipleRenderTargets===!0?n.texture:[n.texture];for(let i=0;i<t.length;i++){let o=t[i],s=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,s,l,o.colorSpace),d=Te(n);r&&z(n)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,d,u,n.width,n.height):z(n)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,d,u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function I(t,i){if(i&&i.isWebGLCubeRenderTarget)throw Error(`Depth Texture with cube render targets is not supported`);if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`renderTarget.depthTexture must be an instance of THREE.DepthTexture`);(!r.get(i.depthTexture).__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),ue(i.depthTexture,0);let a=r.get(i.depthTexture).__webglTexture,o=Te(i);if(i.depthTexture.format===1026)z(i)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,a,0,o):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,a,0);else if(i.depthTexture.format===1027)z(i)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,a,0,o):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,a,0);else throw Error(`Unknown depthTexture format`)}function L(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)throw Error(`target.depthTexture not supported in Cube render targets`);I(i.__webglFramebuffer,t)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]=e.createRenderbuffer(),F(i.__webglDepthbuffer[r],t,!1)}else n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer=e.createRenderbuffer(),F(i.__webglDepthbuffer,t,!1);n.bindFramebuffer(e.FRAMEBUFFER,null)}function R(t,n,i){let a=r.get(t);n!==void 0&&P(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&L(t)}function Se(t){let c=t.texture,l=r.get(t),u=r.get(c);t.addEventListener(`dispose`,M),t.isWebGLMultipleRenderTargets!==!0&&(u.__webglTexture===void 0&&(u.__webglTexture=e.createTexture()),u.__version=c.version,o.memory.textures++);let d=t.isWebGLCubeRenderTarget===!0,f=t.isWebGLMultipleRenderTargets===!0,p=g(t)||s;if(d){l.__webglFramebuffer=[];for(let t=0;t<6;t++)if(s&&c.mipmaps&&c.mipmaps.length>0){l.__webglFramebuffer[t]=[];for(let n=0;n<c.mipmaps.length;n++)l.__webglFramebuffer[t][n]=e.createFramebuffer()}else l.__webglFramebuffer[t]=e.createFramebuffer()}else{if(s&&c.mipmaps&&c.mipmaps.length>0){l.__webglFramebuffer=[];for(let t=0;t<c.mipmaps.length;t++)l.__webglFramebuffer[t]=e.createFramebuffer()}else l.__webglFramebuffer=e.createFramebuffer();if(f)if(i.drawBuffers){let n=t.texture;for(let t=0,i=n.length;t<i;t++){let i=r.get(n[t]);i.__webglTexture===void 0&&(i.__webglTexture=e.createTexture(),o.memory.textures++)}}else console.warn(`THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.`);if(s&&t.samples>0&&z(t)===!1){let r=f?c:[c];l.__webglMultisampledFramebuffer=e.createFramebuffer(),l.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,l.__webglMultisampledFramebuffer);for(let n=0;n<r.length;n++){let i=r[n];l.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,l.__webglColorRenderbuffer[n]);let o=a.convert(i.format,i.colorSpace),s=a.convert(i.type),c=b(i.internalFormat,o,s,i.colorSpace,t.isXRRenderTarget===!0),u=Te(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,l.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(l.__webglDepthRenderbuffer=e.createRenderbuffer(),F(l.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(d){n.bindTexture(e.TEXTURE_CUBE_MAP,u.__webglTexture),_e(e.TEXTURE_CUBE_MAP,c,p);for(let n=0;n<6;n++)if(s&&c.mipmaps&&c.mipmaps.length>0)for(let r=0;r<c.mipmaps.length;r++)P(l.__webglFramebuffer[n][r],t,c,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else P(l.__webglFramebuffer[n],t,c,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);v(c,p)&&y(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(f){let i=t.texture;for(let a=0,o=i.length;a<o;a++){let o=i[a],s=r.get(o);n.bindTexture(e.TEXTURE_2D,s.__webglTexture),_e(e.TEXTURE_2D,o,p),P(l.__webglFramebuffer,t,o,e.COLOR_ATTACHMENT0+a,e.TEXTURE_2D,0),v(o,p)&&y(e.TEXTURE_2D)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(s?r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY:console.error(`THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.`)),n.bindTexture(r,u.__webglTexture),_e(r,c,p),s&&c.mipmaps&&c.mipmaps.length>0)for(let n=0;n<c.mipmaps.length;n++)P(l.__webglFramebuffer[n],t,c,e.COLOR_ATTACHMENT0,r,n);else P(l.__webglFramebuffer,t,c,e.COLOR_ATTACHMENT0,r,0);v(c,p)&&y(r),n.unbindTexture()}t.depthBuffer&&L(t)}function Ce(t){let i=g(t)||s,a=t.isWebGLMultipleRenderTargets===!0?t.texture:[t.texture];for(let o=0,s=a.length;o<s;o++){let s=a[o];if(v(s,i)){let i=t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:e.TEXTURE_2D,a=r.get(s).__webglTexture;n.bindTexture(i,a),y(i),n.unbindTexture()}}}function we(t){if(s&&t.samples>0&&z(t)===!1){let i=t.isWebGLMultipleRenderTargets?t.texture:[t.texture],a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,c=[],u=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,d=r.get(t),f=t.isWebGLMultipleRenderTargets===!0;if(f)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,d.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,d.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,d.__webglMultisampledFramebuffer),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,d.__webglFramebuffer);for(let n=0;n<i.length;n++){c.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&c.push(u);let p=d.__ignoreDepthValues===void 0?!1:d.__ignoreDepthValues;if(p===!1&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),f&&e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,d.__webglColorRenderbuffer[n]),p===!0&&(e.invalidateFramebuffer(e.READ_FRAMEBUFFER,[u]),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[u])),f){let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),l&&e.invalidateFramebuffer(e.READ_FRAMEBUFFER,c)}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),f)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,d.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,d.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,d.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,d.__webglMultisampledFramebuffer)}}function Te(e){return Math.min(i.maxSamples,e.samples)}function z(e){let n=r.get(e);return s&&e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Ee(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function De(e,n){let r=e.colorSpace,i=e.format,a=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||e.format===1035||r!==`srgb-linear`&&r!==``&&(rt.getTransfer(r)===`srgb`?s===!1?t.has(`EXT_sRGB`)===!0&&i===1023?(e.format=xe,e.minFilter=D,e.generateMipmaps=!1):n=st.sRGBToLinear(n):(i!==1023||a!==1009)&&console.warn(`THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):console.error(`THREE.WebGLTextures: Unsupported texture color space:`,r)),n}this.allocateTextureUnit=ce,this.resetTextureUnits=se,this.setTexture2D=ue,this.setTexture2DArray=de,this.setTexture3D=fe,this.setTextureCube=pe,this.rebindTextures=R,this.setupRenderTarget=Se,this.updateRenderTargetMipmap=Ce,this.updateMultisampleRenderTarget=we,this.setupDepthRenderbuffer=L,this.setupFrameBufferTexture=P,this.useMultisampledRTT=z}function Lo(e,t,n){let r=n.isWebGL2;function i(n,i=``){let a,o=rt.getTransfer(i);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return r?e.HALF_FLOAT:(a=t.get(`OES_texture_half_float`),a===null?null:a.HALF_FLOAT_OES);if(n===1021)return e.ALPHA;if(n===1023)return e.RGBA;if(n===1024)return e.LUMINANCE;if(n===1025)return e.LUMINANCE_ALPHA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1035)return a=t.get(`EXT_sRGB`),a===null?null:a.SRGB_ALPHA_EXT;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(o===`srgb`)if(a=t.get(`WEBGL_compressed_texture_s3tc_srgb`),a!==null){if(n===33776)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get(`WEBGL_compressed_texture_s3tc`),a!==null){if(n===33776)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(a=t.get(`WEBGL_compressed_texture_pvrtc`),a!==null){if(n===35840)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196)return a=t.get(`WEBGL_compressed_texture_etc1`),a===null?null:a.COMPRESSED_RGB_ETC1_WEBGL;if(n===37492||n===37496)if(a=t.get(`WEBGL_compressed_texture_etc`),a!==null){if(n===37492)return o===`srgb`?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(n===37496)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(a=t.get(`WEBGL_compressed_texture_astc`),a!==null){if(n===37808)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return o===`srgb`?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(a=t.get(`EXT_texture_compression_bptc`),a!==null){if(n===36492)return o===`srgb`?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(a=t.get(`EXT_texture_compression_rgtc`),a!==null){if(n===36492)return a.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?r?e.UNSIGNED_INT_24_8:(a=t.get(`WEBGL_depth_texture`),a===null?null:a.UNSIGNED_INT_24_8_WEBGL):e[n]===void 0?null:e[n]}return{convert:i}}var Ro=class extends jr{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},zo=class extends bn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Bo={type:`move`},Vo=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zo,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zo,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zo,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position),s=.02,l=.005;c.inputState.pinching&&o>s+l?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=s-l&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Bo)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new zo;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Ho=class extends L{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=t.getContextAttributes(),h=null,g=null,_=[],v=[],y=new B,b=null,x=new jr;x.layers.enable(1),x.viewport=new pt;let S=new jr;S.layers.enable(2),S.viewport=new pt;let C=[x,S],w=new Ro;w.layers.enable(1),w.layers.enable(2);let T=null,E=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=_[e];return t===void 0&&(t=new Vo,_[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=_[e];return t===void 0&&(t=new Vo,_[e]=t),t.getGripSpace()},this.getHand=function(e){let t=_[e];return t===void 0&&(t=new Vo,_[e]=t),t.getHandSpace()};function D(e){let t=v.indexOf(e.inputSource);if(t===-1)return;let n=_[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function O(){r.removeEventListener(`select`,D),r.removeEventListener(`selectstart`,D),r.removeEventListener(`selectend`,D),r.removeEventListener(`squeeze`,D),r.removeEventListener(`squeezestart`,D),r.removeEventListener(`squeezeend`,D),r.removeEventListener(`end`,O),r.removeEventListener(`inputsourceschange`,k);for(let e=0;e<_.length;e++){let t=v[e];t!==null&&(v[e]=null,_[e].disconnect(t))}T=null,E=null,e.setRenderTarget(h),f=null,d=null,u=null,r=null,g=null,ue.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(y.width,y.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&console.warn(`THREE.WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&console.warn(`THREE.WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(h=e.getRenderTarget(),r.addEventListener(`select`,D),r.addEventListener(`selectstart`,D),r.addEventListener(`selectend`,D),r.addEventListener(`squeeze`,D),r.addEventListener(`squeezestart`,D),r.addEventListener(`squeezeend`,D),r.addEventListener(`end`,O),r.addEventListener(`inputsourceschange`,k),m.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(y),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let n={antialias:r.renderState.layers===void 0?m.antialias:!0,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),g=new ht(f.framebufferWidth,f.framebufferHeight,{format:M,type:ee,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let n=null,a=null,o=null;m.depth&&(o=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=m.stencil?ie:re,a=m.stencil?j:te);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=new XRWebGLBinding(r,t),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),g=new ht(d.textureWidth,d.textureHeight,{format:M,type:ee,depthTexture:new Ai(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0});let c=e.properties.get(g);c.__ignoreDepthValues=d.ignoreDepthValues}g.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),ue.setContext(r),ue.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function k(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=v.indexOf(n);r>=0&&(v[r]=null,_[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=v.indexOf(n);if(r===-1){for(let e=0;e<_.length;e++)if(e>=v.length){v.push(n),r=e;break}else if(v[e]===null){v[e]=n,r=e;break}if(r===-1)break}let i=_[r];i&&i.connect(n)}}let A=new H,ne=new H;function ae(e,t,n){A.setFromMatrixPosition(t.matrixWorld),ne.setFromMatrixPosition(n.matrixWorld);let r=A.distanceTo(ne),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert();let g=o+m,_=s+m,v=f-h,y=p+(r-h),b=c*s/_*g,x=l*s/_*g;e.projectionMatrix.makePerspective(v,y,b,x,g,_),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}function oe(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;w.near=S.near=x.near=e.near,w.far=S.far=x.far=e.far,(T!==w.near||E!==w.far)&&(r.updateRenderState({depthNear:w.near,depthFar:w.far}),T=w.near,E=w.far);let t=e.parent,n=w.cameras;oe(w,t);for(let e=0;e<n.length;e++)oe(n[e],t);n.length===2?ae(w,x,S):w.projectionMatrix.copy(x.projectionMatrix),se(e,w,t)};function se(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=we*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(d===null&&f===null))return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)};let ce=null;function le(t,r){if(l=r.getViewerPose(c||a),p=r,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(g,f.framebuffer),e.setRenderTarget(g));let n=!1;t.length!==w.cameras.length&&(w.cameras.length=0,n=!0);for(let r=0;r<t.length;r++){let i=t[r],a=null;if(f!==null)a=f.getViewport(i);else{let t=u.getViewSubImage(d,i);a=t.viewport,r===0&&(e.setRenderTargetTextures(g,t.colorTexture,d.ignoreDepthValues?void 0:t.depthStencilTexture),e.setRenderTarget(g))}let o=C[r];o===void 0&&(o=new jr,o.layers.enable(r),o.viewport=new pt,C[r]=o),o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(i.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),r===0&&(w.matrix.copy(o.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),n===!0&&w.cameras.push(o)}}for(let e=0;e<_.length;e++){let t=v[e],n=_[e];t!==null&&n!==void 0&&n.update(t,r,c||a)}ce&&ce(t,r),r.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:r}),p=null}let ue=new Wr;ue.setAnimationLoop(le),this.setAnimationLoop=function(e){ce=e},this.dispose=function(){}}};function Uo(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Tr(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isMeshBasicMaterial||t.isMeshLambertMaterial?a(e,t):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(r,i){r.opacity.value=i.opacity,i.color&&r.diffuse.value.copy(i.color),i.emissive&&r.emissive.value.copy(i.emissive).multiplyScalar(i.emissiveIntensity),i.map&&(r.map.value=i.map,n(i.map,r.mapTransform)),i.alphaMap&&(r.alphaMap.value=i.alphaMap,n(i.alphaMap,r.alphaMapTransform)),i.bumpMap&&(r.bumpMap.value=i.bumpMap,n(i.bumpMap,r.bumpMapTransform),r.bumpScale.value=i.bumpScale,i.side===1&&(r.bumpScale.value*=-1)),i.normalMap&&(r.normalMap.value=i.normalMap,n(i.normalMap,r.normalMapTransform),r.normalScale.value.copy(i.normalScale),i.side===1&&r.normalScale.value.negate()),i.displacementMap&&(r.displacementMap.value=i.displacementMap,n(i.displacementMap,r.displacementMapTransform),r.displacementScale.value=i.displacementScale,r.displacementBias.value=i.displacementBias),i.emissiveMap&&(r.emissiveMap.value=i.emissiveMap,n(i.emissiveMap,r.emissiveMapTransform)),i.specularMap&&(r.specularMap.value=i.specularMap,n(i.specularMap,r.specularMapTransform)),i.alphaTest>0&&(r.alphaTest.value=i.alphaTest);let a=t.get(i).envMap;if(a&&(r.envMap.value=a,r.flipEnvMap.value=a.isCubeTexture&&a.isRenderTargetTexture===!1?-1:1,r.reflectivity.value=i.reflectivity,r.ior.value=i.ior,r.refractionRatio.value=i.refractionRatio),i.lightMap){r.lightMap.value=i.lightMap;let t=e._useLegacyLights===!0?Math.PI:1;r.lightMapIntensity.value=i.lightMapIntensity*t,n(i.lightMap,r.lightMapTransform)}i.aoMap&&(r.aoMap.value=i.aoMap,r.aoMapIntensity.value=i.aoMapIntensity,n(i.aoMap,r.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,r){e.metalness.value=r.metalness,r.metalnessMap&&(e.metalnessMap.value=r.metalnessMap,n(r.metalnessMap,e.metalnessMapTransform)),e.roughness.value=r.roughness,r.roughnessMap&&(e.roughnessMap.value=r.roughnessMap,n(r.roughnessMap,e.roughnessMapTransform)),t.get(r).envMap&&(e.envMapIntensity.value=r.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Wo(e,t,n,r){let i={},a={},o=[],s=n.isWebGL2?e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(m(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return console.error(`THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let t=0,n=r.length;t<n;t++){let n=Array.isArray(r[t])?r[t]:[r[t]];for(let r=0,i=n.length;r<i;r++){let i=n[r];if(p(i,t,r,a)===!0){let t=i.__offset,n=Array.isArray(i.value)?i.value:[i.value],r=0;for(let a=0;a<n.length;a++){let o=n[a],s=h(o);typeof o==`number`||typeof o==`boolean`?(i.__data[0]=o,e.bufferSubData(e.UNIFORM_BUFFER,t+r,i.__data)):o.isMatrix3?(i.__data[0]=o.elements[0],i.__data[1]=o.elements[1],i.__data[2]=o.elements[2],i.__data[3]=0,i.__data[4]=o.elements[3],i.__data[5]=o.elements[4],i.__data[6]=o.elements[5],i.__data[7]=0,i.__data[8]=o.elements[6],i.__data[9]=o.elements[7],i.__data[10]=o.elements[8],i.__data[11]=0):(o.toArray(i.__data,r),r+=s.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,t,i.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return typeof i==`number`||typeof i==`boolean`?r[a]=i:r[a]=i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=h(r),o=n%16;o!==0&&16-o<a.boundary&&(n+=16-o),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?console.warn(`THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.`):console.warn(`THREE.WebGLRenderer: Unsupported uniform value type.`,e),t}function g(t){let n=t.target;n.removeEventListener(`dispose`,g);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:_}}var Go=class{constructor(e={}){let{canvas:t=Xe(),context:n=null,depth:r=!0,stencil:i=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;d=n===null?a:n.getContextAttributes().alpha;let f=new Uint32Array(4),p=new Int32Array(4),m=null,h=null,g=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=he,this._useLegacyLights=!1,this.toneMapping=0,this.toneMappingExposure=1;let v=this,y=!1,b=0,x=0,S=null,C=-1,w=null,T=new pt,E=new pt,D=null,O=new U(0),te=0,A=t.width,j=t.height,M=1,re=null,ie=null,ae=new pt(0,0,A,j),oe=new pt(0,0,A,j),se=!1,ce=new Ur,le=!1,ue=!1,de=null,fe=new Jt,pe=new B,me=new H,_e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ve(){return S===null?M:1}let N=n;function ye(e,n){for(let r=0;r<e.length;r++){let i=e[r],a=t.getContext(i,n);if(a!==null)return a}return null}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r160`),t.addEventListener(`webglcontextlost`,Be,!1),t.addEventListener(`webglcontextrestored`,Ve,!1),t.addEventListener(`webglcontextcreationerror`,Ue,!1),N===null){let t=[`webgl2`,`webgl`,`experimental-webgl`];if(v.isWebGL1Renderer===!0&&t.shift(),N=ye(t,e),N===null)throw ye(t)?Error(`Error creating WebGL context with your selected attributes.`):Error(`Error creating WebGL context.`)}typeof WebGLRenderingContext<`u`&&N instanceof WebGLRenderingContext&&console.warn(`THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163.`),N.getShaderPrecisionFormat===void 0&&(N.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(e){throw console.error(`THREE.WebGLRenderer: `+e.message),e}let be,P,F,xe,I,L,R,Se,Ce,we,Te,z,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le;function Re(){be=new Si(N),P=new Qr(N,be,e),be.init(P),Fe=new Lo(N,be,P),F=new Fo(N,be,P),xe=new Ti(N),I=new vo,L=new Io(N,be,F,I,P,Fe,xe),R=new ei(v),Se=new xi(v),Ce=new Gr(N,P),Ie=new Xr(N,be,Ce,P),we=new Ci(N,Ce,xe,Ie),Te=new ki(N,we,Ce,xe),Me=new Oi(N,P,L),ke=new $r(I),z=new _o(v,R,Se,be,P,Ie,ke),Ee=new Uo(v,I),De=new So,Oe=new ko(be,P),je=new Yr(v,R,Se,F,Te,d,s),Ae=new Po(v,Te,P),Le=new Wo(N,xe,P,F),Ne=new Zr(N,be,xe,P),Pe=new wi(N,be,xe,P),xe.programs=z.programs,v.capabilities=P,v.extensions=be,v.properties=I,v.renderLists=De,v.shadowMap=Ae,v.state=F,v.info=xe}Re();let ze=new Ho(v,N);this.xr=ze,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let e=be.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=be.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return M},this.setPixelRatio=function(e){e!==void 0&&(M=e,this.setSize(A,j,!1))},this.getSize=function(e){return e.set(A,j)},this.setSize=function(e,n,r=!0){if(ze.isPresenting){console.warn(`THREE.WebGLRenderer: Can't change size while VR device is presenting.`);return}A=e,j=n,t.width=Math.floor(e*M),t.height=Math.floor(n*M),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(A*M,j*M).floor()},this.setDrawingBufferSize=function(e,n,r){A=e,j=n,M=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.getCurrentViewport=function(e){return e.copy(T)},this.getViewport=function(e){return e.copy(ae)},this.setViewport=function(e,t,n,r){e.isVector4?ae.set(e.x,e.y,e.z,e.w):ae.set(e,t,n,r),F.viewport(T.copy(ae).multiplyScalar(M).floor())},this.getScissor=function(e){return e.copy(oe)},this.setScissor=function(e,t,n,r){e.isVector4?oe.set(e.x,e.y,e.z,e.w):oe.set(e,t,n,r),F.scissor(E.copy(oe).multiplyScalar(M).floor())},this.getScissorTest=function(){return se},this.setScissorTest=function(e){F.setScissorTest(se=e)},this.setOpaqueSort=function(e){re=e},this.setTransparentSort=function(e){ie=e},this.getClearColor=function(e){return e.copy(je.getClearColor())},this.setClearColor=function(){je.setClearColor.apply(je,arguments)},this.getClearAlpha=function(){return je.getClearAlpha()},this.setClearAlpha=function(){je.setClearAlpha.apply(je,arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(S!==null){let t=S.texture.format;e=t===1033||t===1031||t===1029}if(e){let e=S.texture.type,t=e===1009||e===1014||e===1012||e===1020||e===1017||e===1018,n=je.getClearColor(),r=je.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(f[0]=i,f[1]=a,f[2]=o,f[3]=r,N.clearBufferuiv(N.COLOR,0,f)):(p[0]=i,p[1]=a,p[2]=o,p[3]=r,N.clearBufferiv(N.COLOR,0,p))}else r|=N.COLOR_BUFFER_BIT}t&&(r|=N.DEPTH_BUFFER_BIT),n&&(r|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Be,!1),t.removeEventListener(`webglcontextrestored`,Ve,!1),t.removeEventListener(`webglcontextcreationerror`,Ue,!1),De.dispose(),Oe.dispose(),I.dispose(),R.dispose(),Se.dispose(),Te.dispose(),Ie.dispose(),Le.dispose(),z.dispose(),ze.dispose(),ze.removeEventListener(`sessionstart`,Ye),ze.removeEventListener(`sessionend`,Ze),de&&=(de.dispose(),null),Qe.stop()};function Be(e){e.preventDefault(),console.log(`THREE.WebGLRenderer: Context Lost.`),y=!0}function Ve(){console.log(`THREE.WebGLRenderer: Context Restored.`),y=!1;let e=xe.autoReset,t=Ae.enabled,n=Ae.autoUpdate,r=Ae.needsUpdate,i=Ae.type;Re(),xe.autoReset=e,Ae.enabled=t,Ae.autoUpdate=n,Ae.needsUpdate=r,Ae.type=i}function Ue(e){console.error(`THREE.WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function We(e){let t=e.target;t.removeEventListener(`dispose`,We),Ge(t)}function Ge(e){Ke(e),I.remove(e)}function Ke(e){let t=I.get(e).programs;t!==void 0&&(t.forEach(function(e){z.releaseProgram(e)}),e.isShaderMaterial&&z.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=_e);let o=i.isMesh&&i.matrixWorld.determinant()<0,s=st(e,t,n,r,i);F.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=we.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ie.setup(i,r,s,n,c);let h,g=Ne;if(c!==null&&(h=Ce.get(c),g=Pe,g.setIndex(h)),i.isMesh)r.wireframe===!0?(F.setLineWidth(r.wireframeLinewidth*ve()),g.setMode(N.LINES)):g.setMode(N.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),F.setLineWidth(e*ve()),i.isLineSegments?g.setMode(N.LINES):i.isLineLoop?g.setMode(N.LINE_LOOP):g.setMode(N.LINE_STRIP)}else i.isPoints?g.setMode(N.POINTS):i.isSprite&&g.setMode(N.TRIANGLES);if(i.isBatchedMesh)g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function V(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,it(e,t,n),e.side=0,e.needsUpdate=!0,it(e,t,n),e.side=2):it(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),h=Oe.get(n),h.init(),_.push(h),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(h.pushLight(e),e.castShadow&&h.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(h.pushLight(e),e.castShadow&&h.pushShadow(e))}),h.setupLights(v._useLegacyLights);let r=new Set;return e.traverse(function(e){let t=e.material;if(t)if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];V(a,n,e),r.add(a)}else V(t,n,e),r.add(t)}),_.pop(),h=null,r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){I.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}be.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let qe=null;function Je(e){qe&&qe(e)}function Ye(){Qe.stop()}function Ze(){Qe.start()}let Qe=new Wr;Qe.setAnimationLoop(Je),typeof self<`u`&&Qe.setContext(self),this.setAnimationLoop=function(e){qe=e,ze.setAnimationLoop(e),e===null?Qe.stop():Qe.start()},ze.addEventListener(`sessionstart`,Ye),ze.addEventListener(`sessionend`,Ze),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){console.error(`THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(y===!0)return;e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),ze.enabled===!0&&ze.isPresenting===!0&&(ze.cameraAutoUpdate===!0&&ze.updateCamera(t),t=ze.getCamera()),e.isScene===!0&&e.onBeforeRender(v,e,t,S),h=Oe.get(e,_.length),h.init(),_.push(h),fe.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),ce.setFromProjectionMatrix(fe),ue=this.localClippingEnabled,le=ke.init(this.clippingPlanes,ue),m=De.get(e,g.length),m.init(),g.push(m),$e(e,t,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(re,ie),this.info.render.frame++,le===!0&&ke.beginShadows();let n=h.state.shadowsArray;if(Ae.render(n,e,t),le===!0&&ke.endShadows(),this.info.autoReset===!0&&this.info.reset(),je.render(m,e),h.setupLights(v._useLegacyLights),t.isArrayCamera){let n=t.cameras;for(let t=0,r=n.length;t<r;t++){let r=n[t];et(m,e,r,r.viewport)}}else et(m,e,t);S!==null&&(L.updateMultisampleRenderTarget(S),L.updateRenderTargetMipmap(S)),e.isScene===!0&&e.onAfterRender(v,e,t),Ie.resetDefaultState(),C=-1,w=null,_.pop(),h=_.length>0?_[_.length-1]:null,g.pop(),m=g.length>0?g[g.length-1]:null};function $e(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)h.pushLight(e),e.castShadow&&h.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||ce.intersectsSprite(e)){r&&me.setFromMatrixPosition(e.matrixWorld).applyMatrix4(fe);let t=Te.update(e),i=e.material;i.visible&&m.push(e,t,i,n,me.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||ce.intersectsObject(e))){let t=Te.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),me.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),me.copy(e.boundingSphere.center)),me.applyMatrix4(e.matrixWorld).applyMatrix4(fe)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&m.push(e,t,s,n,me.z,o)}}else i.visible&&m.push(e,t,i,n,me.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)$e(i[e],t,n,r)}function et(e,t,n,r){let i=e.opaque,a=e.transmissive,o=e.transparent;h.setupLightsView(n),le===!0&&ke.setGlobalState(v.clippingPlanes,n),a.length>0&&tt(i,a,t,n),r&&F.viewport(T.copy(r)),i.length>0&&nt(i,t,n),a.length>0&&nt(a,t,n),o.length>0&&nt(o,t,n),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function tt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;let i=P.isWebGL2;de===null&&(de=new ht(1,1,{generateMipmaps:!0,type:be.has(`EXT_color_buffer_half_float`)?ne:ee,minFilter:k,samples:i?4:0})),v.getDrawingBufferSize(pe),i?de.setSize(pe.x,pe.y):de.setSize(He(pe.x),He(pe.y));let a=v.getRenderTarget();v.setRenderTarget(de),v.getClearColor(O),te=v.getClearAlpha(),te<1&&v.setClearColor(16777215,.5),v.clear();let o=v.toneMapping;v.toneMapping=0,nt(e,n,r),L.updateMultisampleRenderTarget(de),L.updateRenderTargetMipmap(de);let s=!1;for(let e=0,i=t.length;e<i;e++){let i=t[e],a=i.object,o=i.geometry,c=i.material,l=i.group;if(c.side===2&&a.layers.test(r.layers)){let e=c.side;c.side=1,c.needsUpdate=!0,rt(a,n,r,o,c,l),c.side=e,c.needsUpdate=!0,s=!0}}s===!0&&(L.updateMultisampleRenderTarget(de),L.updateRenderTargetMipmap(de)),v.setRenderTarget(a),v.setClearColor(O,te),v.toneMapping=o}function nt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],o=a.object,s=a.geometry,c=r===null?a.material:r,l=a.group;o.layers.test(n.layers)&&rt(o,t,n,s,c,l)}}function rt(e,t,n,r,i,a){e.onBeforeRender(v,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(v,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,v.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,v.renderBufferDirect(n,t,r,i,e,a),i.side=2):v.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(v,t,n,r,i,a)}function it(e,t,n){t.isScene!==!0&&(t=_e);let r=I.get(e),i=h.state.lights,a=h.state.shadowsArray,o=i.state.version,s=z.getParameters(e,i.state,a,t,n),c=z.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial?t.environment:null,r.fog=t.fog,r.envMap=(e.isMeshStandardMaterial?Se:R).get(e.envMap||r.environment),l===void 0&&(e.addEventListener(`dispose`,We),l=new Map,r.programs=l);let u=l.get(c);if(u!==void 0){if(r.currentProgram===u&&r.lightsStateVersion===o)return ot(e,s),u}else s.uniforms=z.getUniforms(e),e.onBuild(n,s,v),e.onBeforeCompile(s,v),u=z.acquireProgram(s,c),l.set(c,u),r.uniforms=s.uniforms;let d=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(d.clippingPlanes=ke.uniform),ot(e,s),r.needsLights=lt(e),r.lightsStateVersion=o,r.needsLights&&(d.ambientLightColor.value=i.state.ambient,d.lightProbe.value=i.state.probe,d.directionalLights.value=i.state.directional,d.directionalLightShadows.value=i.state.directionalShadow,d.spotLights.value=i.state.spot,d.spotLightShadows.value=i.state.spotShadow,d.rectAreaLights.value=i.state.rectArea,d.ltc_1.value=i.state.rectAreaLTC1,d.ltc_2.value=i.state.rectAreaLTC2,d.pointLights.value=i.state.point,d.pointLightShadows.value=i.state.pointShadow,d.hemisphereLights.value=i.state.hemi,d.directionalShadowMap.value=i.state.directionalShadowMap,d.directionalShadowMatrix.value=i.state.directionalShadowMatrix,d.spotShadowMap.value=i.state.spotShadowMap,d.spotLightMatrix.value=i.state.spotLightMatrix,d.spotLightMap.value=i.state.spotLightMap,d.pointShadowMap.value=i.state.pointShadowMap,d.pointShadowMatrix.value=i.state.pointShadowMatrix),r.currentProgram=u,r.uniformsList=null,u}function at(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=La.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function ot(e,t){let n=I.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function st(e,t,n,r,i){t.isScene!==!0&&(t=_e),L.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial?t.environment:null,s=S===null?v.outputColorSpace:S.isXRRenderTarget===!0?S.texture.colorSpace:ge,c=(r.isMeshStandardMaterial?Se:R).get(r.envMap||o),l=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,u=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),d=!!n.morphAttributes.position,f=!!n.morphAttributes.normal,p=!!n.morphAttributes.color,m=0;r.toneMapped&&(S===null||S.isXRRenderTarget===!0)&&(m=v.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,y=I.get(r),b=h.state.lights;if(le===!0&&(ue===!0||e!==w)){let t=e===w&&r.id===C;ke.setState(r,e,t)}let x=!1;r.version===y.__version?y.needsLights&&y.lightsStateVersion!==b.state.version?x=!0:y.outputColorSpace===s?i.isBatchedMesh&&y.batching===!1||!i.isBatchedMesh&&y.batching===!0||i.isInstancedMesh&&y.instancing===!1||!i.isInstancedMesh&&y.instancing===!0||i.isSkinnedMesh&&y.skinning===!1||!i.isSkinnedMesh&&y.skinning===!0||i.isInstancedMesh&&y.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&y.instancingColor===!1&&i.instanceColor!==null?x=!0:y.envMap===c?r.fog===!0&&y.fog!==a||y.numClippingPlanes!==void 0&&(y.numClippingPlanes!==ke.numPlanes||y.numIntersection!==ke.numIntersection)?x=!0:y.vertexAlphas===l&&y.vertexTangents===u&&y.morphTargets===d&&y.morphNormals===f&&y.morphColors===p&&y.toneMapping===m?P.isWebGL2===!0&&y.morphTargetsCount!==_&&(x=!0):x=!0:x=!0:x=!0:(x=!0,y.__version=r.version);let T=y.currentProgram;x===!0&&(T=it(r,t,i));let E=!1,D=!1,O=!1,k=T.getUniforms(),ee=y.uniforms;if(F.useProgram(T.program)&&(E=!0,D=!0,O=!0),r.id!==C&&(C=r.id,D=!0),E||w!==e){k.setValue(N,`projectionMatrix`,e.projectionMatrix),k.setValue(N,`viewMatrix`,e.matrixWorldInverse);let t=k.map.cameraPosition;t!==void 0&&t.setValue(N,me.setFromMatrixPosition(e.matrixWorld)),P.logarithmicDepthBuffer&&k.setValue(N,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&k.setValue(N,`isOrthographic`,e.isOrthographicCamera===!0),w!==e&&(w=e,D=!0,O=!0)}if(i.isSkinnedMesh){k.setOptional(N,i,`bindMatrix`),k.setOptional(N,i,`bindMatrixInverse`);let e=i.skeleton;e&&(P.floatVertexTextures?(e.boneTexture===null&&e.computeBoneTexture(),k.setValue(N,`boneTexture`,e.boneTexture,L)):console.warn(`THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required.`))}i.isBatchedMesh&&(k.setOptional(N,i,`batchingTexture`),k.setValue(N,`batchingTexture`,i._matricesTexture,L));let te=n.morphAttributes;if((te.position!==void 0||te.normal!==void 0||te.color!==void 0&&P.isWebGL2===!0)&&Me.update(i,n,T),(D||y.receiveShadow!==i.receiveShadow)&&(y.receiveShadow=i.receiveShadow,k.setValue(N,`receiveShadow`,i.receiveShadow)),r.isMeshGouraudMaterial&&r.envMap!==null&&(ee.envMap.value=c,ee.flipEnvMap.value=c.isCubeTexture&&c.isRenderTargetTexture===!1?-1:1),D&&(k.setValue(N,`toneMappingExposure`,v.toneMappingExposure),y.needsLights&&ct(ee,O),a&&r.fog===!0&&Ee.refreshFogUniforms(ee,a),Ee.refreshMaterialUniforms(ee,r,M,j,de),La.upload(N,at(y),ee,L)),r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(La.upload(N,at(y),ee,L),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&k.setValue(N,`center`,i.center),k.setValue(N,`modelViewMatrix`,i.modelViewMatrix),k.setValue(N,`normalMatrix`,i.normalMatrix),k.setValue(N,`modelMatrix`,i.matrixWorld),r.isShaderMaterial||r.isRawShaderMaterial){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++)if(P.isWebGL2){let n=e[t];Le.update(n,T),Le.bind(n,T)}else console.warn(`THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.`)}return T}function ct(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function lt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return x},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(e,t,n){I.get(e.texture).__webglTexture=t,I.get(e.depthTexture).__webglTexture=n;let r=I.get(e);r.__hasExternalTextures=!0,r.__hasExternalTextures&&(r.__autoAllocateDepthBuffer=n===void 0,r.__autoAllocateDepthBuffer||be.has(`WEBGL_multisampled_render_to_texture`)===!0&&(console.warn(`THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided`),r.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(e,t){let n=I.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){S=e,b=t,x=n;let r=!0,i=null,a=!1,o=!1;if(e){let s=I.get(e);s.__useDefaultFramebuffer===void 0?s.__webglFramebuffer===void 0?L.setupRenderTarget(e):s.__hasExternalTextures&&L.rebindTextures(e,I.get(e.texture).__webglTexture,I.get(e.depthTexture).__webglTexture):(F.bindFramebuffer(N.FRAMEBUFFER,null),r=!1);let c=e.texture;(c.isData3DTexture||c.isDataArrayTexture||c.isCompressedArrayTexture)&&(o=!0);let l=I.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(i=Array.isArray(l[t])?l[t][n]:l[t],a=!0):i=P.isWebGL2&&e.samples>0&&L.useMultisampledRTT(e)===!1?I.get(e).__webglMultisampledFramebuffer:Array.isArray(l)?l[n]:l,T.copy(e.viewport),E.copy(e.scissor),D=e.scissorTest}else T.copy(ae).multiplyScalar(M).floor(),E.copy(oe).multiplyScalar(M).floor(),D=se;if(F.bindFramebuffer(N.FRAMEBUFFER,i)&&P.drawBuffers&&r&&F.drawBuffers(e,i),F.viewport(T),F.scissor(E),F.setScissorTest(D),a){let r=I.get(e.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(o){let r=I.get(e.texture),i=t||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,r.__webglTexture,n||0,i)}C=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o){if(!(e&&e.isWebGLRenderTarget)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let s=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(s=s[o]),s){F.bindFramebuffer(N.FRAMEBUFFER,s);try{let o=e.texture,s=o.format,c=o.type;if(s!==1023&&Fe.convert(s)!==N.getParameter(N.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}let l=c===1016&&(be.has(`EXT_color_buffer_half_float`)||P.isWebGL2&&be.has(`EXT_color_buffer_float`));if(c!==1009&&Fe.convert(c)!==N.getParameter(N.IMPLEMENTATION_COLOR_READ_TYPE)&&!(c===1015&&(P.isWebGL2||be.has(`OES_texture_float`)||be.has(`WEBGL_color_buffer_float`)))&&!l){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&N.readPixels(t,n,r,i,Fe.convert(s),Fe.convert(c),a)}finally{let e=S===null?null:I.get(S).__webglFramebuffer;F.bindFramebuffer(N.FRAMEBUFFER,e)}}},this.copyFramebufferToTexture=function(e,t,n=0){let r=2**-n,i=Math.floor(t.image.width*r),a=Math.floor(t.image.height*r);L.setTexture2D(t,0),N.copyTexSubImage2D(N.TEXTURE_2D,n,0,0,e.x,e.y,i,a),F.unbindTexture()},this.copyTextureToTexture=function(e,t,n,r=0){let i=t.image.width,a=t.image.height,o=Fe.convert(n.format),s=Fe.convert(n.type);L.setTexture2D(n,0),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,n.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,n.unpackAlignment),t.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,r,e.x,e.y,i,a,o,s,t.image.data):t.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,r,e.x,e.y,t.mipmaps[0].width,t.mipmaps[0].height,o,t.mipmaps[0].data):N.texSubImage2D(N.TEXTURE_2D,r,e.x,e.y,o,s,t.image),r===0&&n.generateMipmaps&&N.generateMipmap(N.TEXTURE_2D),F.unbindTexture()},this.copyTextureToTexture3D=function(e,t,n,r,i=0){if(v.isWebGL1Renderer){console.warn(`THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.`);return}let a=e.max.x-e.min.x+1,o=e.max.y-e.min.y+1,s=e.max.z-e.min.z+1,c=Fe.convert(r.format),l=Fe.convert(r.type),u;if(r.isData3DTexture)L.setTexture3D(r,0),u=N.TEXTURE_3D;else if(r.isDataArrayTexture||r.isCompressedArrayTexture)L.setTexture2DArray(r,0),u=N.TEXTURE_2D_ARRAY;else{console.warn(`THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.`);return}N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,r.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,r.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,r.unpackAlignment);let d=N.getParameter(N.UNPACK_ROW_LENGTH),f=N.getParameter(N.UNPACK_IMAGE_HEIGHT),p=N.getParameter(N.UNPACK_SKIP_PIXELS),m=N.getParameter(N.UNPACK_SKIP_ROWS),h=N.getParameter(N.UNPACK_SKIP_IMAGES),g=n.isCompressedTexture?n.mipmaps[i]:n.image;N.pixelStorei(N.UNPACK_ROW_LENGTH,g.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,g.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,e.min.x),N.pixelStorei(N.UNPACK_SKIP_ROWS,e.min.y),N.pixelStorei(N.UNPACK_SKIP_IMAGES,e.min.z),n.isDataTexture||n.isData3DTexture?N.texSubImage3D(u,i,t.x,t.y,t.z,a,o,s,c,l,g.data):n.isCompressedArrayTexture?(console.warn(`THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture.`),N.compressedTexSubImage3D(u,i,t.x,t.y,t.z,a,o,s,c,g.data)):N.texSubImage3D(u,i,t.x,t.y,t.z,a,o,s,c,l,g),N.pixelStorei(N.UNPACK_ROW_LENGTH,d),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,f),N.pixelStorei(N.UNPACK_SKIP_PIXELS,p),N.pixelStorei(N.UNPACK_SKIP_ROWS,m),N.pixelStorei(N.UNPACK_SKIP_IMAGES,h),i===0&&r.generateMipmaps&&N.generateMipmap(u),F.unbindTexture()},this.initTexture=function(e){e.isCubeTexture?L.setTextureCube(e,0):e.isData3DTexture?L.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?L.setTexture2DArray(e,0):L.setTexture2D(e,0),F.unbindTexture()},this.resetState=function(){b=0,x=0,S=null,F.reset(),Ie.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return I}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===`display-p3`?`display-p3`:`srgb`,t.unpackColorSpace=rt.workingColorSpace===`display-p3-linear`?`display-p3`:`srgb`}get outputEncoding(){return console.warn(`THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead.`),this.outputColorSpace===`srgb`?fe:de}set outputEncoding(e){console.warn(`THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead.`),this.outputColorSpace=e===3001?he:ge}get useLegacyLights(){return console.warn(`THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733.`),this._useLegacyLights}set useLegacyLights(e){console.warn(`THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733.`),this._useLegacyLights=e}},Ko=class extends Go{};Ko.prototype.isWebGL1Renderer=!0;var qo=class e{constructor(e,t=25e-5){this.isFogExp2=!0,this.name=``,this.color=new U(e),this.density=t}clone(){return new e(this.color,this.density)}toJSON(){return{type:`FogExp2`,name:this.name,color:this.color.getHex(),density:this.density}}},Jo=class extends bn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}},Yo=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=F,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Te()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn(`THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead.`),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Te()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Te()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Xo=new H,Zo=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Xo.fromBufferAttribute(this,t),Xo.applyMatrix4(e),this.setXYZ(t,Xo.x,Xo.y,Xo.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Xo.fromBufferAttribute(this,t),Xo.applyNormalMatrix(e),this.setXYZ(t,Xo.x,Xo.y,Xo.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Xo.fromBufferAttribute(this,t),Xo.transformDirection(e),this.setXYZ(t,Xo.x,Xo.y,Xo.z);return this}setX(e,t){return this.normalized&&(t=Ge(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ge(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ge(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ge(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=We(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=We(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=We(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=We(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ge(t,this.array),n=Ge(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ge(t,this.array),n=Ge(n,this.array),r=Ge(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ge(t,this.array),n=Ge(n,this.array),r=Ge(r,this.array),i=Ge(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){console.log(`THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new Un(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log(`THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Qo=class extends zn{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new U(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},$o,es=new H,ts=new H,ns=new H,rs=new B,is=new B,as=new Jt,os=new H,ss=new H,cs=new H,ls=new B,us=new B,ds=new B,fs=class extends bn{constructor(e=new Qo){if(super(),this.isSprite=!0,this.type=`Sprite`,$o===void 0){$o=new er;let e=new Yo(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);$o.setIndex([0,1,2,0,2,3]),$o.setAttribute(`position`,new Zo(e,3,0,!1)),$o.setAttribute(`uv`,new Zo(e,2,3,!1))}this.geometry=$o,this.material=e,this.center=new B(.5,.5)}raycast(e,t){e.camera===null&&console.error(`THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),ts.setFromMatrixScale(this.matrixWorld),as.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ns.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ts.multiplyScalar(-ns.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;ps(os.set(-.5,-.5,0),ns,a,ts,r,i),ps(ss.set(.5,-.5,0),ns,a,ts,r,i),ps(cs.set(.5,.5,0),ns,a,ts,r,i),ls.set(0,0),us.set(1,0),ds.set(1,1);let o=e.ray.intersectTriangle(os,ss,cs,!1,es);if(o===null&&(ps(ss.set(-.5,.5,0),ns,a,ts,r,i),us.set(0,1),o=e.ray.intersectTriangle(os,cs,ss,!1,es),o===null))return;let s=e.ray.origin.distanceTo(es);s<e.near||s>e.far||t.push({distance:s,point:es.clone(),uv:Mn.getInterpolation(es,os,ss,cs,ls,us,ds,new B),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function ps(e,t,n,r,i,a){rs.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?is.copy(rs):(is.x=a*rs.x-i*rs.y,is.y=i*rs.x+a*rs.y),e.copy(t),e.x+=is.x,e.y+=is.y,e.applyMatrix4(as)}var ms=class extends zn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new U(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},hs=new H,gs=new H,_s=new Jt,vs=new qt,ys=new zt,bs=class extends bn{constructor(e=new er,t=new ms){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)hs.fromBufferAttribute(t,e-1),gs.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=hs.distanceTo(gs);e.setAttribute(`lineDistance`,new Kn(n,1))}else console.warn(`THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ys.copy(n.boundingSphere),ys.applyMatrix4(r),ys.radius+=i,e.ray.intersectsSphere(ys)===!1)return;_s.copy(r).invert(),vs.copy(e.ray).applyMatrix4(_s);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=new H,l=new H,u=new H,d=new H,f=this.isLineSegments?2:1,p=n.index,m=n.attributes.position;if(p!==null){let n=Math.max(0,a.start),r=Math.min(p.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=f){let n=p.getX(i),r=p.getX(i+1);if(c.fromBufferAttribute(m,n),l.fromBufferAttribute(m,r),vs.distanceSqToSegment(c,l,d,u)>s)continue;d.applyMatrix4(this.matrixWorld);let a=e.ray.origin.distanceTo(d);a<e.near||a>e.far||t.push({distance:a,point:u.clone().applyMatrix4(this.matrixWorld),index:i,face:null,faceIndex:null,object:this})}}else{let n=Math.max(0,a.start),r=Math.min(m.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=f){if(c.fromBufferAttribute(m,i),l.fromBufferAttribute(m,i+1),vs.distanceSqToSegment(c,l,d,u)>s)continue;d.applyMatrix4(this.matrixWorld);let n=e.ray.origin.distanceTo(d);n<e.near||n>e.far||t.push({distance:n,point:u.clone().applyMatrix4(this.matrixWorld),index:i,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}},xs=class extends zn{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new U(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ss=new Jt,Cs=new qt,ws=new zt,Ts=new H,Es=class extends bn{constructor(e=new er,t=new xs){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ws.copy(n.boundingSphere),ws.applyMatrix4(r),ws.radius+=i,e.ray.intersectsSphere(ws)===!1)return;Ss.copy(r).invert(),Cs.copy(e.ray).applyMatrix4(Ss);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Ts.fromBufferAttribute(l,n),Ds(Ts,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Ts.fromBufferAttribute(l,a),Ds(Ts,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Ds(e,t,n,r,i,a,o){let s=Cs.distanceSqToPoint(e);if(s<n){let n=new H;Cs.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,object:o})}}var Os=class extends ft{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},ks=class e extends er{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new H,d=new H,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=0;f===0&&a===0?v=.5/t:f===n&&s===Math.PI&&(v=-.5/t);for(let n=0;n<=t;n++){let s=n/t;u.x=-e*Math.cos(r+s*i)*Math.sin(a+_*o),u.y=e*Math.cos(a+_*o),u.z=e*Math.sin(r+s*i)*Math.sin(a+_*o),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(s+v,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new Kn(p,3)),this.setAttribute(`normal`,new Kn(m,3)),this.setAttribute(`uv`,new Kn(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},As=class extends zn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:``},this.type=`MeshStandardMaterial`,this.color=new U(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new U(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new B(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function js(e,t,n){return!e||!n&&e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Ms(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}var Ns=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`call to abstract method`)}intervalChanged_(){}},Ps=class extends Ns{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ce,endingEnd:ce}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case le:i=e,o=2*t-n;break;case ue:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case le:a=e,s=2*n-t;break;case ue:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Fs=class extends Ns{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Is=class extends Ns{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Ls=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=js(t,this.TimeBufferType),this.values=js(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:js(e.times,Array),values:js(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Is(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Fs(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ps(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ae:t=this.InterpolantFactoryMethodDiscrete;break;case oe:t=this.InterpolantFactoryMethodLinear;break;case se:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t);return console.warn(`THREE.KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ae;case this.InterpolantFactoryMethodLinear:return oe;case this.InterpolantFactoryMethodSmooth:return se}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error(`THREE.KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(console.error(`THREE.KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){console.error(`THREE.KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){console.error(`THREE.KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Ms(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){console.error(`THREE.KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===se,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0]))if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Ls.prototype.TimeBufferType=Float32Array,Ls.prototype.ValueBufferType=Float32Array,Ls.prototype.DefaultInterpolation=oe;var Rs=class extends Ls{};Rs.prototype.ValueTypeName=`bool`,Rs.prototype.ValueBufferType=Array,Rs.prototype.DefaultInterpolation=ae,Rs.prototype.InterpolantFactoryMethodLinear=void 0,Rs.prototype.InterpolantFactoryMethodSmooth=void 0;var zs=class extends Ls{};zs.prototype.ValueTypeName=`color`;var Bs=class extends Ls{};Bs.prototype.ValueTypeName=`number`;var Vs=class extends Ns{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)vt.slerpFlat(i,0,a,c-o,a,c,s);return i}},Hs=class extends Ls{InterpolantFactoryMethodLinear(e){return new Vs(this.times,this.values,this.getValueSize(),e)}};Hs.prototype.ValueTypeName=`quaternion`,Hs.prototype.DefaultInterpolation=oe,Hs.prototype.InterpolantFactoryMethodSmooth=void 0;var Us=class extends Ls{};Us.prototype.ValueTypeName=`string`,Us.prototype.ValueBufferType=Array,Us.prototype.DefaultInterpolation=ae,Us.prototype.InterpolantFactoryMethodLinear=void 0,Us.prototype.InterpolantFactoryMethodSmooth=void 0;var Ws=class extends Ls{};Ws.prototype.ValueTypeName=`vector`;var Gs=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null}}},Ks=class{constructor(e){this.manager=e===void 0?Gs:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Ks.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var qs=class extends bn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new U(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}},Js=class extends qs{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(bn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new U(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Ys=new Jt,Xs=new H,Zs=new H,Qs=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new B(512,512),this.map=null,this.mapPass=null,this.matrix=new Jt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ur,this._frameExtents=new B(1,1),this._viewportCount=1,this._viewports=[new pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Xs.setFromMatrixPosition(e.matrixWorld),t.position.copy(Xs),Zs.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Zs),t.updateMatrixWorld(),Ys.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ys),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ys)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},$s=class extends Qs{constructor(){super(new ti(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ec=class extends qs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(bn.DEFAULT_UP),this.updateMatrix(),this.target=new bn,this.shadow=new $s}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},tc=`\\[\\]\\.:\\/`,nc=RegExp(`[`+tc+`]`,`g`),rc=`[^`+tc+`]`,ic=`[^`+tc.replace(`\\.`,``)+`]`,ac=`((?:WC+[\\/:])*)`.replace(`WC`,rc),oc=`(WCOD+)?`.replace(`WCOD`,ic),sc=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,rc),cc=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,rc),lc=RegExp(`^`+ac+oc+sc+cc+`$`),uc=[`material`,`materials`,`bones`,`map`],dc=class{constructor(e,t,n){let r=n||fc.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},fc=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(nc,``)}static parseTrackName(e){let t=lc.exec(e);if(t===null)throw Error(`PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);uc.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn(`THREE.PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){console.error(`THREE.PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){console.error(`THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){console.error(`THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){console.error(`THREE.PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){console.error(`THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){console.error(`THREE.PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){console.error(`THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;console.error(`THREE.PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.needsUpdate===void 0?t.matrixWorldNeedsUpdate!==void 0&&(s=this.Versioning.MatrixWorldNeedsUpdate):s=this.Versioning.NeedsUpdate;let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){console.error(`THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){console.error(`THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};fc.Composite=dc,fc.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},fc.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},fc.prototype.GetterByBindingType=[fc.prototype._getValue_direct,fc.prototype._getValue_array,fc.prototype._getValue_arrayElement,fc.prototype._getValue_toArray],fc.prototype.SetterByBindingTypeAndVersioning=[[fc.prototype._setValue_direct,fc.prototype._setValue_direct_setNeedsUpdate,fc.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[fc.prototype._setValue_array,fc.prototype._setValue_array_setNeedsUpdate,fc.prototype._setValue_array_setMatrixWorldNeedsUpdate],[fc.prototype._setValue_arrayElement,fc.prototype._setValue_arrayElement_setNeedsUpdate,fc.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[fc.prototype._setValue_fromArray,fc.prototype._setValue_fromArray_setNeedsUpdate,fc.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var pc=class{constructor(e,t,n=0,r=1/0){this.ray=new qt(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new on,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error(`THREE.Raycaster: Unsupported camera type: `+t.type)}intersectObject(e,t=!0,n=[]){return hc(e,this,n,t),n.sort(mc),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)hc(e[r],this,n,t);return n.sort(mc),n}};function mc(e,t){return e.distance-t.distance}function hc(e,t,n,r){if(e.layers.test(t.layers)&&e.raycast(t,n),r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)hc(r[e],t,n,!0)}}var gc=class{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){let e=1e-6;return this.phi=Math.max(e,Math.min(Math.PI-e,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(z(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`160`}})),typeof window<`u`&&(window.__THREE__?console.warn(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`160`);var _c={type:`change`},vc={type:`start`},yc={type:`end`},bc=new qt,xc=new Br,Sc=Math.cos(70*Ke.DEG2RAD),Cc=class extends L{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction=`none`,this.enabled=!0,this.target=new H,this.cursor=new H,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:`ArrowLeft`,UP:`ArrowUp`,RIGHT:`ArrowRight`,BOTTOM:`ArrowDown`},this.mouseButtons={LEFT:y.ROTATE,MIDDLE:y.DOLLY,RIGHT:y.PAN},this.touches={ONE:b.ROTATE,TWO:b.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(e){e.addEventListener(`keydown`,z),this._domElementKeyEvents=e},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener(`keydown`,z),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(_c),n.update(),i=r.NONE},this.update=function(){let t=new H,u=new vt().setFromUnitVectors(e.up,new H(0,1,0)),d=u.clone().invert(),f=new H,p=new vt,m=new H,h=2*Math.PI;return function(g=null){let _=n.object.position;t.copy(_).sub(n.target),t.applyQuaternion(u),o.setFromVector3(t),n.autoRotate&&i===r.NONE&&k(D(g)),n.enableDamping?(o.theta+=s.theta*n.dampingFactor,o.phi+=s.phi*n.dampingFactor):(o.theta+=s.theta,o.phi+=s.phi);let v=n.minAzimuthAngle,y=n.maxAzimuthAngle;isFinite(v)&&isFinite(y)&&(v<-Math.PI?v+=h:v>Math.PI&&(v-=h),y<-Math.PI?y+=h:y>Math.PI&&(y-=h),v<=y?o.theta=Math.max(v,Math.min(y,o.theta)):o.theta=o.theta>(v+y)/2?Math.max(v,o.theta):Math.min(y,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(l,n.dampingFactor):n.target.add(l),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&C||n.object.isOrthographicCamera?o.radius=ie(o.radius):o.radius=ie(o.radius*c),t.setFromSpherical(o),t.applyQuaternion(d),_.copy(n.target).add(t),n.object.lookAt(n.target),n.enableDamping===!0?(s.theta*=1-n.dampingFactor,s.phi*=1-n.dampingFactor,l.multiplyScalar(1-n.dampingFactor)):(s.set(0,0,0),l.set(0,0,0));let b=!1;if(n.zoomToCursor&&C){let r=null;if(n.object.isPerspectiveCamera){let e=t.length();r=ie(e*c);let i=e-r;n.object.position.addScaledVector(x,i),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){let e=new H(S.x,S.y,0);e.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),b=!0;let i=new H(S.x,S.y,0);i.unproject(n.object),n.object.position.sub(i).add(e),n.object.updateMatrixWorld(),r=t.length()}else console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.`),n.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(r).add(n.object.position):(bc.origin.copy(n.object.position),bc.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(bc.direction))<Sc?e.lookAt(n.target):(xc.setFromNormalAndCoplanarPoint(n.object.up,n.target),bc.intersectPlane(xc,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),b=!0);return c=1,C=!1,b||f.distanceToSquared(n.object.position)>a||8*(1-p.dot(n.object.quaternion))>a||m.distanceToSquared(n.target)>0?(n.dispatchEvent(_c),f.copy(n.object.position),p.copy(n.object.quaternion),m.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener(`contextmenu`,Oe),n.domElement.removeEventListener(`pointerdown`,F),n.domElement.removeEventListener(`pointercancel`,I),n.domElement.removeEventListener(`wheel`,Se),n.domElement.removeEventListener(`pointermove`,xe),n.domElement.removeEventListener(`pointerup`,I),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener(`keydown`,z),n._domElementKeyEvents=null)};let n=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},i=r.NONE,a=1e-6,o=new gc,s=new gc,c=1,l=new H,u=new B,d=new B,f=new B,p=new B,m=new B,h=new B,g=new B,_=new B,v=new B,x=new H,S=new B,C=!1,w=[],T={},E=!1;function D(e){return e===null?2*Math.PI/60/60*n.autoRotateSpeed:2*Math.PI/60*n.autoRotateSpeed*e}function O(e){let t=Math.abs(e*.01);return .95**(n.zoomSpeed*t)}function k(e){s.theta-=e}function ee(e){s.phi-=e}let te=function(){let e=new H;return function(t,n){e.setFromMatrixColumn(n,0),e.multiplyScalar(-t),l.add(e)}}(),A=function(){let e=new H;return function(t,r){n.screenSpacePanning===!0?e.setFromMatrixColumn(r,1):(e.setFromMatrixColumn(r,0),e.crossVectors(n.object.up,e)),e.multiplyScalar(t),l.add(e)}}(),ne=function(){let e=new H;return function(t,r){let i=n.domElement;if(n.object.isPerspectiveCamera){let a=n.object.position;e.copy(a).sub(n.target);let o=e.length();o*=Math.tan(n.object.fov/2*Math.PI/180),te(2*t*o/i.clientHeight,n.object.matrix),A(2*r*o/i.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(te(t*(n.object.right-n.object.left)/n.object.zoom/i.clientWidth,n.object.matrix),A(r*(n.object.top-n.object.bottom)/n.object.zoom/i.clientHeight,n.object.matrix)):(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.`),n.enablePan=!1)}}();function j(e){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c/=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),n.enableZoom=!1)}function M(e){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c*=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),n.enableZoom=!1)}function re(e,t){if(!n.zoomToCursor)return;C=!0;let r=n.domElement.getBoundingClientRect(),i=e-r.left,a=t-r.top,o=r.width,s=r.height;S.x=i/o*2-1,S.y=-(a/s)*2+1,x.set(S.x,S.y,1).unproject(n.object).sub(n.object.position).normalize()}function ie(e){return Math.max(n.minDistance,Math.min(n.maxDistance,e))}function ae(e){u.set(e.clientX,e.clientY)}function oe(e){re(e.clientX,e.clientX),g.set(e.clientX,e.clientY)}function se(e){p.set(e.clientX,e.clientY)}function ce(e){d.set(e.clientX,e.clientY),f.subVectors(d,u).multiplyScalar(n.rotateSpeed);let t=n.domElement;k(2*Math.PI*f.x/t.clientHeight),ee(2*Math.PI*f.y/t.clientHeight),u.copy(d),n.update()}function le(e){_.set(e.clientX,e.clientY),v.subVectors(_,g),v.y>0?j(O(v.y)):v.y<0&&M(O(v.y)),g.copy(_),n.update()}function ue(e){m.set(e.clientX,e.clientY),h.subVectors(m,p).multiplyScalar(n.panSpeed),ne(h.x,h.y),p.copy(m),n.update()}function de(e){re(e.clientX,e.clientY),e.deltaY<0?M(O(e.deltaY)):e.deltaY>0&&j(O(e.deltaY)),n.update()}function fe(e){let t=!1;switch(e.code){case n.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?ee(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):ne(0,n.keyPanSpeed),t=!0;break;case n.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?ee(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):ne(0,-n.keyPanSpeed),t=!0;break;case n.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?k(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):ne(n.keyPanSpeed,0),t=!0;break;case n.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?k(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):ne(-n.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),n.update())}function pe(e){if(w.length===1)u.set(e.pageX,e.pageY);else{let t=Me(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);u.set(n,r)}}function me(e){if(w.length===1)p.set(e.pageX,e.pageY);else{let t=Me(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);p.set(n,r)}}function he(e){let t=Me(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);g.set(0,i)}function ge(e){n.enableZoom&&he(e),n.enablePan&&me(e)}function _e(e){n.enableZoom&&he(e),n.enableRotate&&pe(e)}function ve(e){if(w.length==1)d.set(e.pageX,e.pageY);else{let t=Me(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);d.set(n,r)}f.subVectors(d,u).multiplyScalar(n.rotateSpeed);let t=n.domElement;k(2*Math.PI*f.x/t.clientHeight),ee(2*Math.PI*f.y/t.clientHeight),u.copy(d)}function N(e){if(w.length===1)m.set(e.pageX,e.pageY);else{let t=Me(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);m.set(n,r)}h.subVectors(m,p).multiplyScalar(n.panSpeed),ne(h.x,h.y),p.copy(m)}function ye(e){let t=Me(e),r=e.pageX-t.x,i=e.pageY-t.y,a=Math.sqrt(r*r+i*i);_.set(0,a),v.set(0,(_.y/g.y)**+n.zoomSpeed),j(v.y),g.copy(_),re((e.pageX+t.x)*.5,(e.pageY+t.y)*.5)}function be(e){n.enableZoom&&ye(e),n.enablePan&&N(e)}function P(e){n.enableZoom&&ye(e),n.enableRotate&&ve(e)}function F(e){n.enabled!==!1&&(w.length===0&&(n.domElement.setPointerCapture(e.pointerId),n.domElement.addEventListener(`pointermove`,xe),n.domElement.addEventListener(`pointerup`,I)),ke(e),e.pointerType===`touch`?Ee(e):L(e))}function xe(e){n.enabled!==!1&&(e.pointerType===`touch`?De(e):R(e))}function I(e){Ae(e),w.length===0&&(n.domElement.releasePointerCapture(e.pointerId),n.domElement.removeEventListener(`pointermove`,xe),n.domElement.removeEventListener(`pointerup`,I)),n.dispatchEvent(yc),i=r.NONE}function L(e){let t;switch(e.button){case 0:t=n.mouseButtons.LEFT;break;case 1:t=n.mouseButtons.MIDDLE;break;case 2:t=n.mouseButtons.RIGHT;break;default:t=-1}switch(t){case y.DOLLY:if(n.enableZoom===!1)return;oe(e),i=r.DOLLY;break;case y.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(n.enablePan===!1)return;se(e),i=r.PAN}else{if(n.enableRotate===!1)return;ae(e),i=r.ROTATE}break;case y.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(n.enableRotate===!1)return;ae(e),i=r.ROTATE}else{if(n.enablePan===!1)return;se(e),i=r.PAN}break;default:i=r.NONE}i!==r.NONE&&n.dispatchEvent(vc)}function R(e){switch(i){case r.ROTATE:if(n.enableRotate===!1)return;ce(e);break;case r.DOLLY:if(n.enableZoom===!1)return;le(e);break;case r.PAN:if(n.enablePan===!1)return;ue(e);break}}function Se(e){n.enabled===!1||n.enableZoom===!1||i!==r.NONE||(e.preventDefault(),n.dispatchEvent(vc),de(Ce(e)),n.dispatchEvent(yc))}function Ce(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!E&&(n.deltaY*=10),n}function we(e){e.key===`Control`&&(E=!0,document.addEventListener(`keyup`,Te,{passive:!0,capture:!0}))}function Te(e){e.key===`Control`&&(E=!1,document.removeEventListener(`keyup`,Te,{passive:!0,capture:!0}))}function z(e){n.enabled===!1||n.enablePan===!1||fe(e)}function Ee(e){switch(je(e),w.length){case 1:switch(n.touches.ONE){case b.ROTATE:if(n.enableRotate===!1)return;pe(e),i=r.TOUCH_ROTATE;break;case b.PAN:if(n.enablePan===!1)return;me(e),i=r.TOUCH_PAN;break;default:i=r.NONE}break;case 2:switch(n.touches.TWO){case b.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;ge(e),i=r.TOUCH_DOLLY_PAN;break;case b.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;_e(e),i=r.TOUCH_DOLLY_ROTATE;break;default:i=r.NONE}break;default:i=r.NONE}i!==r.NONE&&n.dispatchEvent(vc)}function De(e){switch(je(e),i){case r.TOUCH_ROTATE:if(n.enableRotate===!1)return;ve(e),n.update();break;case r.TOUCH_PAN:if(n.enablePan===!1)return;N(e),n.update();break;case r.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;be(e),n.update();break;case r.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;P(e),n.update();break;default:i=r.NONE}}function Oe(e){n.enabled!==!1&&e.preventDefault()}function ke(e){w.push(e.pointerId)}function Ae(e){delete T[e.pointerId];for(let t=0;t<w.length;t++)if(w[t]==e.pointerId){w.splice(t,1);return}}function je(e){let t=T[e.pointerId];t===void 0&&(t=new B,T[e.pointerId]=t),t.set(e.pageX,e.pageY)}function Me(e){return T[e.pointerId===w[0]?w[1]:w[0]]}n.domElement.addEventListener(`contextmenu`,Oe),n.domElement.addEventListener(`pointerdown`,F),n.domElement.addEventListener(`pointercancel`,I),n.domElement.addEventListener(`wheel`,Se,{passive:!1}),document.addEventListener(`keydown`,we,{passive:!0,capture:!0}),this.update()}},wc=`mempalace-viz-graph-rel-filters-v1`,Tc={tunnel:{label:`Tunnel`,shortLabel:`Tunnel`,description:"Same room name appearing in multiple wings — a cross-wing structural link from MemPalace tunnel discovery (`mempalace_find_tunnels`)."},unknown:{label:`Other`,shortLabel:`Other`,description:`Edges whose relationship type is not listed in the viewer registry.`}};function Ec(e){let t=e&&Tc[e]?e:`unknown`;return{type:t,...Tc[t]}}function Dc(e){if(!e||typeof e!=`object`)return`tunnel`;let t=e.relationshipType;return typeof t==`string`&&t.trim()?t.trim():`tunnel`}function Oc(e){let t=new Set;for(let n of e||[])t.add(Dc(n));return[...t].sort()}function kc(e){let t=e||`tunnel`;return t===`tunnel`?{color:5999871,opacity:.44}:t===`unknown`?{color:9741240,opacity:.32}:{color:10980346,opacity:.3}}function Ac(e,t){let n=new Set(t||[]);if(n.size===0)return new Set;if(e==null)return new Set(n);if(Array.isArray(e)&&e.length===0)return new Set;let r=new Set;for(let t of e)typeof t==`string`&&n.has(t)&&r.add(t);return r}function jc(e,t){let n=[...t||[]].sort();return n.length===0?null:!e||e.size===0?new Set:e.size===n.length&&n.every(t=>e.has(t))?null:e}function Mc(e,t){if(!t||t.size===0)return[];let n=[];for(let r of e||[])t.has(Dc(r))&&n.push(r);return n}function Nc(e){let t={};for(let n of e||[]){let e=Dc(n);t[e]=(t[e]||0)+1}return t}function Pc(e,t){let n=Mc(e,t);return{visibleEdgeCount:n.length,visibleByType:Nc(n),visibleEdges:n}}function Fc(e){if(!e||typeof e!=`object`)return null;let t=e.enabledTypes;return Array.isArray(t)?t.filter(e=>typeof e==`string`):null}function Ic(e,t){let n=[],r=e?.sources;Array.isArray(r)&&r.length&&n.push(`Sources: ${r.join(`, `)}`);let i=e?.truncatedSources;Array.isArray(i)&&i.some(e=>e?.truncated)&&n.push(`Some sources may be truncated upstream — tunnel list can be incomplete.`);let a=(e?.completenessNotes||[]).filter(Boolean);a.length&&n.push(a[0]);let o=t?.byType&&typeof t.byType==`object`?t.byType:null;if(o&&Object.keys(o).length){let e=Object.entries(o).map(([e,t])=>`${e}: ${t}`).join(` · `);n.push(`Types in payload: ${e}`)}return n.filter(Boolean).join(` `)}function Lc(e,t=6){if(!e||typeof e!=`object`)return``;let n=Object.entries(e).filter(([,e])=>e>0).sort((e,t)=>t[1]-e[1]);return n.length?n.slice(0,t).map(([e,t])=>`${t} ${Ec(e).shortLabel.toLowerCase()}`).join(` · `):``}function Rc(e,t){let n=Object.values(e||{}).reduce((e,t)=>e+t,0),r=Object.values(t||{}).reduce((e,t)=>e+t,0);if(r===0)return null;let i=e?.tunnel||0,a=t?.tunnel||0;return n===0&&r>0?`No visible links with current filters; totals above are global.`:i>0&&a>0&&i>=n*.85?`Visible links here are tunnel connections (MCP-backed).`:null}function zc(e,t,n){let r=Math.max(1,e),i=Math.max(0,t),a=Math.max(1,n),o=i/r,s=0;r>90||o>2.8?s=3:r>48||o>1.75?s=2:(r>24||o>1.05)&&(s=1);let c=s>=3?85:s>=2?130:s>=1?175:235,l=.00155+s*42e-5,u=s>=2?.68:s>=1?.82:1,d=s>=3?.74:s>=2?.86:1,f=s>=2?1.08:1,p=1+s*.22,m=1-s*.04,h=1+s*.12,g=.004+s*.0025,_=4+s*5,v=2.1+s*.55,y=48+s*14;return{tier:s,nodeCount:r,edgeCount:i,wingCount:a,edgeDensity:o,labelBudget:c,fogDensity:l,adjacencyOpacityMult:u,globalEdgeOpacityMult:d,tunnelEmphasisMult:f,repelScale:p,attractScale:m,centerScale:h,wingCohesion:g,depthJitter:_,collisionMinDist:v,forceIterations:y}}function Bc(e){return{repelStrength:88*e.repelScale,attractStrength:.0115*e.attractScale,centerStrength:.0052*e.centerScale,wingCohesion:e.wingCohesion,iterations:e.forceIterations}}function Vc(e){let t=2166136261,n=String(e||``);for(let e=0;e<n.length;e+=1)t^=n.charCodeAt(e),t=Math.imul(t,16777619);return(t>>>0)/4294967296}function Hc(e,t,n){let r=Math.max(1,t.length),i=26+Math.min(48,e.length*.35),a=7+n.tier*2.2,o=9+n.tier*1.8,s=new Map;t.forEach((e,t)=>{let n=t/r*Math.PI*2,o=i*(1+t%5*.04),c=Math.cos(n)*o,l=Math.sin(n)*o,u=((t+.5)/r-.5)*a*2.2;s.set(e,{x:c,y:u,z:l})});let c=new Map;e.forEach(e=>{if(e.type===`room`&&e.wing){let t=c.get(e.wing)||[];t.push(e),c.set(e.wing,t)}}),t.forEach(e=>{let t=c.get(e)||[],r=s.get(e)||{x:0,y:0,z:0},i=Math.max(t.length,1);t.forEach((t,a)=>{let s=a/i*Math.PI*2,c=Vc(`${e}|${t.name}|${a}`),l=Vc(`${t.name}|z`),u=o*(.45+.55*c),d=(l-.5)*n.depthJitter;t.x=r.x+Math.cos(s)*u,t.y=r.y+Math.sin(s*1.7)*u*.42+d,t.z=r.z+Math.sin(s)*u})}),e.forEach(e=>{if(e.type===`wing`){let t=s.get(e.name)||{x:0,y:0,z:0},n=Vc(`wing|${e.name}`);e.x=t.x*.22+(n-.5)*3,e.y=t.y+(n-.5)*4,e.z=t.z*.22+(Vc(`${e.name}z`)-.5)*3}})}function Uc(e,t,n,r){let{repelStrength:i,attractStrength:a,centerStrength:o,wingCohesion:s,iterations:c}=Bc(n),l=new Map;e.forEach(e=>{e.type===`wing`&&e.name&&l.set(e.name,e)});for(let n=0;n<c;n+=1){for(let t=0;t<e.length;t+=1)for(let n=t+1;n<e.length;n+=1){let r=e[t].x-e[n].x,a=e[t].y-e[n].y,o=e[t].z-e[n].z,s=Math.sqrt(r*r+a*a+o*o)+.12,c=i/(s*s),l=e[t].wing,u=e[n].wing;l&&u&&l!==u&&(c*=1.12),e[t].x+=r*c,e[t].y+=a*c,e[t].z+=o*c,e[n].x-=r*c,e[n].y-=a*c,e[n].z-=o*c}t.forEach(t=>{let n=r(e,t,`from`),i=r(e,t,`to`);if(n&&i){let e=i.x-n.x,t=i.y-n.y,r=i.z-n.z,o=a;n.wing&&i.wing&&n.wing!==i.wing&&(o*=1.15),n.x+=e*o,n.y+=t*o,n.z+=r*o,i.x-=e*o,i.y-=t*o,i.z-=r*o}}),e.forEach(e=>{if(e.type===`room`&&e.wing){let t=l.get(e.wing);t&&(e.x+=(t.x-e.x)*s,e.y+=(t.y-e.y)*s,e.z+=(t.z-e.z)*s)}e.x*=1-o,e.y*=1-o,e.z*=1-o})}}function Wc(e,t,n=10){for(let r=0;r<n;r+=1)for(let n=0;n<e.length;n+=1)for(let r=n+1;r<e.length;r+=1){let i=e[n],a=e[r],o=i.x-a.x,s=i.y-a.y,c=i.z-a.z,l=Math.sqrt(o*o+s*s+c*c)+1e-8;if(l<t){let e=(t-l)*.52,n=o/l,r=s/l,u=c/l;i.x+=n*e,i.y+=r*e,i.z+=u*e,a.x-=n*e,a.y-=r*e,a.z-=u*e}}}function Gc(e,t){let n=Math.max(12,t),r=n*.85,i=n*4.2,a=(e-r)/(i-r);return Math.max(0,Math.min(1,a))}function Kc(e,t,n){let r=Math.max(8,Math.floor(e)),i=Math.max(0,Math.min(3,n)),a=Math.max(0,Math.min(1,t)),o=.38+i*.06,s=o+(1-o)*a;return Math.max(8,Math.floor(r*s))}function qc(e,t={}){let n=.74+Math.max(0,Math.min(1,e))*.38;return t.pinned?n*=1.12:t.selected?n*=1.08:t.hovered&&(n*=1.05),n}function Jc(e,t={}){let n=Math.max(0,Math.min(1,e)),r=.52+n*.46;return t.selected&&(r=Math.max(r,.94)),t.hovered&&(r=Math.max(r,.9)),t.neighbor&&(r=Math.max(r,.62+n*.28)),Math.max(.35,Math.min(1,r))}function Yc(e){if(!e||!e.startsWith(`room:`))return null;let t=e.slice(5),n=t.indexOf(`:`);return n===-1?null:t.slice(0,n)}function Xc(e){return e?e.startsWith(`room:`)?Yc(e):e.startsWith(`wing:`)?e.slice(5):null:null}function Zc(e,t,n){let r=new Map;function i(e,t){!e||!t||e===t||(r.has(e)||r.set(e,new Set),r.has(t)||r.set(t,new Set),r.get(e).add(t),r.get(t).add(e))}for(let r of e||[]){let e=n(t,r,`from`),a=n(t,r,`to`),o=cl(e),s=cl(a);o?.startsWith(`room:`)&&s?.startsWith(`room:`)&&i(o,s)}return r}function Qc(e,t){let n=new Set;if(!e)return n;let r=t.get(e);return r&&r.forEach(e=>n.add(e)),n}function $c(e,t){return{primaryId:e||t||null,secondaryHoverId:e&&t&&t!==e?t:null}}function el(e,t){let n=e.filter(e=>e.id.startsWith(`room:`)),r=t.nodeCount>300?t.labelBudget*5:t.nodeCount>160?t.labelBudget*4:n.length,i=Math.max(24,Math.min(n.length,r)),a=n.filter(e=>(e.incidentFull||0)>0),o=n.filter(e=>(e.incidentFull||0)===0),s=(e,t)=>t.baseScore-e.baseScore;a.sort(s),o.sort(s);let c=[];for(let e of a){if(c.length>=i)break;c.push(e.id)}for(let e of o){if(c.length>=i)break;c.push(e.id)}return new Set(c)}function tl(e,t){let{selectedId:n,hoveredId:r,pinActive:i,budget:a,neighborIds:o=null,focusWingId:s=null,cameraDistanceNorm:c=.55,densityTier:l=0}=t,u=Kc(a,c,l),d=Math.max(8,Math.floor(u)),f=Math.max(0,Math.min(3,l)),p=3500+f*220,m=1200+f*80,h=e.map(({id:e,baseScore:t})=>{let a=t;return e===n&&(a+=1e6),i&&e===n&&(a+=2e5),e===r&&(a+=5e5),o&&o.has(e)&&(a+=p),s&&Yc(e)===s&&(a+=m),{id:e,score:a}});return h.sort((e,t)=>t.score-e.score),new Set(h.slice(0,d).map(e=>e.id))}function nl(e){let t=Math.min(220,(e.incidentFull||0)*24),n=Math.min(100,(e.drawers||0)*1.8),r=e.type===`wing`?45:0;return 20+t+n+r}function rl(e){let{selectedId:t,hoveredId:n,fromId:r,toId:i,relationshipType:a,densityTier:o,isGraphRelationship:s}=e;if(!s)return 1;let{primaryId:c,secondaryHoverId:l}=$c(t,n),u=c&&(r===c||i===c),d=l&&(r===l||i===l),f=a===`tunnel`,p=Math.max(0,Math.min(3,o));return c?u?f?1.24:1.06:d?(f?.88:.78)*(p>=2?.92:1):p>=3?.36:p>=2?.4:p>=1?.52:.68:p>=3?f?.92:.78:1}function il(e,t,n={}){let{isNeighbor:r=!1,focusActive:i=!1}=n;if(!i)return 1;let a=Math.max(0,Math.min(3,t)),o=38+a*18,s=155+a*35,c=1.05-(e-o)/s;return r&&(c=.55+c*.45),c=Math.max(a===0?.58:.34,Math.min(1.08,c)),c}function al(e,t,n=0){let r=Math.max(8,e),i=Math.max(0,Math.min(3,t)),a=Vc(`frame|${n}`),o=r*(.028+i*.006),s=r*(.045+i*.008)*(a-.5)*2;return{x:s,y:o,z:-s*.4}}function ol(e,t,n,r={}){let i=t*Math.PI/180,a=Math.max(0,r.neighborCount||0),o=1.28+n*.06+Math.min(.14,a*.018),s=Math.max(4,e)*o/Math.tan(i/2),c=16+n*4;return Math.min(240,Math.max(c,s))}function sl(e,t){let n=0;for(let r of t){let t=r.x-e.x,i=r.y-e.y,a=r.z-e.z;n=Math.max(n,Math.sqrt(t*t+i*i+a*a))}return n}function cl(e){return e?e.type===`wing`&&e.name?`wing:${e.name}`:e.type===`room`&&e.wing&&e.name?`room:${e.wing}:${e.name}`:null:null}function ll(e,t,n){let r=new Map;for(let i of t||[]){let t=n(e,i,`from`),a=n(e,i,`to`),o=cl(t),s=cl(a);o?.startsWith(`room:`)&&r.set(o,(r.get(o)||0)+1),s?.startsWith(`room:`)&&r.set(s,(r.get(s)||0)+1)}return r}function ul(e,t={}){let n=!!t.graphFilterNarrowed;switch(e){case`missing_endpoint`:return`Choose a start room and a target room.`;case`no_edges`:return n?`No edges match the current relationship filters — enable more types or reset filters. The graph shows only explicit MemPalace structure.`:`No graph edges in the current data. Refresh after MemPalace changes; this viewer does not add links.`;case`no_path`:return`No explicit MCP path exists between these rooms on the edges currently shown.`;case`id_map_failed`:return`Could not map route to scene nodes.`;case`bad_scene`:return`Could not resolve route endpoints.`;default:return`Route unavailable.`}}function dl(e,t={}){let n=!!t.graphFilterNarrowed;if(e===`no_path`){let e=[`This graph only shows explicit MemPalace tunnel structure from MCP — it does not invent missing links.`];return n&&e.push(`Some edges may be hidden by your relationship filters — try widening them to reveal a path.`),e.push(`To create a tunnel in MemPalace, use the same room name in multiple wings, then refresh data here.`),e}if(e===`no_edges`){let e=[`Routing needs at least one visible graph edge between rooms.`];return n?e.push(`Widen relationship filters so tunnel edges can appear, or reload after MemPalace updates.`):e.push(`Reload after MemPalace updates if you expect tunnels; stock MCP does not support arbitrary graph link writes.`),e}return[]}function fl(){return`No adjacent rooms on the visible edges — the graph may be disconnected here, or filters may hide links.`}function pl(){return[`Graph edges come from MemPalace MCP data (tunnel discovery), not from this viewer.`,`A tunnel appears when the same room name exists in more than one wing.`,`This visualization does not invent missing links.`,`Stock MemPalace MCP does not support arbitrary room-to-room graph links or persisting custom cross-links.`]}function ml(){return[`Want a new tunnel? Create or reuse the same room name in two wings using normal MemPalace workflows.`,`Drawers can be added via MCP tools such as mempalace_add_drawer — that adds palace content, not arbitrary graph edges.`,`After MemPalace data changes, use Refresh here to update the graph.`]}function hl(e={}){return!!e.viewIsGraph&&!!e.palaceDataOk}function gl(e={}){return!!e.viewIsGraph&&!!e.hasResolvableGraph}function _l(){return{title:`Graph view`,body:`No tunnel edges were returned from graph-stats. Wings and rooms can still appear from taxonomy. Edges come only from MemPalace tunnel discovery (mempalace_find_tunnels).`}}function vl(){return`No tunnel neighbors for this room in the current MCP graph — that is expected when there is no shared room name across wings. This viewer does not add links.`}function yl(){return`Uses only explicit edges from MemPalace MCP data (what is visible in the scene).`}function bl(){return`Explicit MemPalace edges only — this viewer does not add or infer links.`}function xl(e){let t=Number(e.resolvedCount)===1?``:`s`,n=`${e.resolvedFormatted} resolved graph edge${t} from MCP`;return e.graphFilterNarrowed&&e.visibleFormatted!=null&&e.visibleCount!=null?`Visible: ${e.visibleFormatted} (filtered) · base ${n}`:n}function Sl(){return`Knowledge graph statistics are unavailable from the current API.`}function Cl(){return`No explicit edges for this room in the current MCP data — unresolved endpoints or no tunnels yet is a valid state.`}function wl(e,t){let n=t??0;return{title:`Graph view`,body:`Loaded ${e} graph edge${e===1?``:`s`}, but some endpoints could not be matched to taxonomy rooms${n?` (${n} edge${n===1?``:`s`} unresolved)`:``}. Layout may be sparse — this is a data alignment limitation, not a viewer bug.`}}function Tl(e,t,n=null){if(e==null||typeof e!=`string`)return null;let r=e.trim();if(!r)return null;let o=a(r);if(o){let{wingId:e,roomName:n}=o;if(t[e]?.some(e=>e.name===n))return{wing:e,room:n,key:i(e,n)}}if(r.includes(`/`)){let e=r.indexOf(`/`),n=r.slice(0,e),a=r.slice(e+1);return t[n]?.some(e=>e.name===a)?{wing:n,room:a,key:i(n,a)}:null}let s=[];for(let[e,n]of Object.entries(t||{}))if(Array.isArray(n))for(let t of n)t.name===r&&s.push({wing:e,room:r,key:`${e}/${r}`});if(s.length===0)return null;if(s.length===1){let e=s[0];return{...e,key:i(e.wing,e.room)}}if(n&&s.some(e=>e.wing===n)){let e=s.find(e=>e.wing===n)||s[0];return{...e,key:i(e.wing,e.room)}}let c=s[0];return{...c,key:i(c.wing,c.room)}}function El(e,t,n=null){if(n!=null&&typeof n==`number`)return n;let r=Array.isArray(e)?e:[],i=t&&typeof t==`object`?t:{},a=0;for(let e of r){let t=Tl(e.from,i,null),n=Tl(e.to,i,e.wing||null);(!t||!n)&&(a+=1)}return a}function Dl(e,t,n,r){let o=e&&typeof e==`object`?e:{},s=Array.isArray(t)?t:[],c=new Set,l=new Map,u=new Map,d=new Map,f=new Map;function p(e,t){f.has(e)||f.set(e,new Set),f.get(e).add(t)}function m(e,t,n=1){e.set(t,(e.get(t)||0)+n)}let h=0,g=0;for(let e of s){let t=e.sourceRoomId,n=e.targetRoomId;if(!t||!n||t===n)continue;let r=t<n?`${t}||${n}`:`${n}||${t}`;c.has(r)||(c.add(r),m(l,t),m(l,n),e.sourceWingId===e.targetWingId?(g+=1,m(d,t),m(d,n)):(h+=1,m(u,t),m(u,n)),p(t,n),p(n,t))}let _=new Set([...l.keys()]),v=new Set;for(let[e,t]of Object.entries(o))if(Array.isArray(t))for(let n of t)v.add(n.roomId||i(e,n.name));let y=[];for(let e of v)_.has(e)||y.push(e);let b=h+g;n&&typeof n.resolvedEdgeCount==`number`&&(b=n.resolvedEdgeCount);let x=b>0?h/b:null,S=[...l.entries()].sort((e,t)=>t[1]-e[1]).slice(0,8).map(([e,t])=>{let n=a(e);return{wing:n?.wingId??e.split(`/`)[0],room:n?.roomName??e.slice(e.indexOf(`/`)+1),key:e,degree:t}});r?.topConnectedRooms?.length&&(S=r.topConnectedRooms.slice(0,8).map(e=>({wing:e.wingId,room:e.name,key:e.roomId,degree:e.degree})));let C=new Map;for(let e of s)e.sourceWingId!==e.targetWingId&&(m(C,e.sourceWingId),m(C,e.targetWingId));let w=[...C.entries()].sort((e,t)=>t[1]-e[1]).slice(0,8).map(([e,t])=>({wing:e,crossEdges:t})),T=Al(l),E=n&&typeof n.crossWingEdgeCount==`number`?n.crossWingEdgeCount:null,D=n&&typeof n.intraWingEdgeCount==`number`?n.intraWingEdgeCount:null;return{edgeCount:s.length,resolvedEdgeCount:b,crossWingEdgeCount:E??h,intraWingEdgeCount:D??g,byRelationshipType:n?.byType&&typeof n.byType==`object`?{...n.byType}:null,crossFraction:x,degreeByKey:l,crossByKey:u,intraByKey:d,neighborsByKey:f,topConnectedRooms:S,topCrossLinkedWings:w,roomsWithNoTunnels:typeof r?.roomsWithNoLinks==`number`?r.roomsWithNoLinks:y.length,noTunnelRoomKeys:y.slice(0,50),medianRoomDegree:T,hasResolvableEdges:b>0}}function Ol(e,t,n,r){let o=Array.isArray(e)?e:[],s=t&&typeof t==`object`?t:{},c=new Set,l=new Map,u=new Map,d=new Map,f=new Map;function p(e,t){f.has(e)||f.set(e,new Set),f.get(e).add(t)}function m(e,t,n=1){e.set(t,(e.get(t)||0)+n)}for(let e of o){let t=Tl(e.from,s,null),n=Tl(e.to,s,e.wing||null);if(!t||!n)continue;let r=t.key,i=n.key;if(r===i)continue;let a=r<i?`${r}||${i}`:`${i}||${r}`;c.has(a)||(c.add(a),m(l,r),m(l,i),t.wing===n.wing?(m(d,r),m(d,i)):(m(u,r),m(u,i)),p(r,i),p(i,r))}let h=new Set;for(let[e,t]of Object.entries(s))if(Array.isArray(t))for(let n of t)h.add(i(e,n.name));let g=[];for(let e of h)l.has(e)||g.push(e);let _=0,v=0;for(let e of o){let t=Tl(e.from,s,null),n=Tl(e.to,s,e.wing||null);!t||!n||(t.wing===n.wing?v+=1:_+=1)}let y=_+v,b=y>0?_/y:null,x=[...l.entries()].sort((e,t)=>t[1]-e[1]).slice(0,8).map(([e,t])=>{let n=a(e);return{wing:n?.wingId??e.split(`/`)[0],room:n?.roomName??e.slice(e.indexOf(`/`)+1),key:e,degree:t}});r?.topConnectedRooms?.length&&(x=r.topConnectedRooms.slice(0,8).map(e=>({wing:e.wingId,room:e.name,key:e.roomId,degree:e.degree})));let S=new Map;for(let e of o){let t=Tl(e.from,s,null),n=Tl(e.to,s,e.wing||null);!t||!n||t.wing===n.wing||(m(S,t.wing),m(S,n.wing))}let C=[...S.entries()].sort((e,t)=>t[1]-e[1]).slice(0,8).map(([e,t])=>({wing:e,crossEdges:t})),w=Al(l),T=n&&typeof n.crossWingEdgeCount==`number`?n.crossWingEdgeCount:null,E=n&&typeof n.intraWingEdgeCount==`number`?n.intraWingEdgeCount:null;return{edgeCount:o.length,resolvedEdgeCount:y,crossWingEdgeCount:T??_,intraWingEdgeCount:E??v,crossFraction:b,degreeByKey:l,crossByKey:u,intraByKey:d,neighborsByKey:f,topConnectedRooms:x,topCrossLinkedWings:C,roomsWithNoTunnels:typeof r?.roomsWithNoLinks==`number`?r.roomsWithNoLinks:g.length,noTunnelRoomKeys:g.slice(0,50),medianRoomDegree:w,hasResolvableEdges:y>0}}function kl(e,t={}){let{edgesResolved:n,graphEdges:r,graphSummary:i=null,overviewStats:a=null}=t;return n?.length?Dl(e,n,i,a):Ol(r||[],e,i,a)}function Al(e){let t=[...e.values()].sort((e,t)=>e-t);if(!t.length)return null;let n=Math.floor(t.length/2);return t.length%2?t[n]:(t[n-1]+t[n])/2}function jl(e,t){if(!t||!e)return null;let n=t.degreeByKey.get(e)??0,r=t.crossByKey.get(e)??0,i=t.intraByKey.get(e)??0,o=t.neighborsByKey.get(e),s=o?[...o]:[],c=s.slice(0,12).map(e=>{let n=a(e),r=t.degreeByKey.get(e)??0;return{wing:n?.wingId??e.split(`/`)[0],room:n?.roomName??e.slice(e.indexOf(`/`)+1),key:e,degree:r}});c.sort((e,t)=>t.degree-e.degree);let l=new Map;for(let e of s){let t=a(e)?.wingId;t&&l.set(t,(l.get(t)||0)+1)}let u=[...l.entries()].sort((e,t)=>t[1]-e[1]).slice(0,8).map(([e,t])=>({wing:e,links:t}));return{degree:n,crossWingLinks:r,intraWingLinks:i,medianDegree:t.medianRoomDegree,relatedRooms:c.slice(0,8),relatedWings:u,isBridge:r>=1&&s.length>0}}function Ml(e,t){if(!e||!Array.isArray(t))return{degree:0,crossWingLinks:0,intraWingLinks:0,byType:{},relatedRoomKeys:[]};let n=0,r=0,i=0,a={},o=[];for(let s of t){let t=s.sourceRoomId,c=s.targetRoomId;if(!t||!c||t!==e&&c!==e)continue;n+=1;let l=s.relationshipType||`tunnel`;a[l]=(a[l]||0)+1,s.sourceWingId!=null&&s.targetWingId!=null&&s.sourceWingId!==s.targetWingId?r+=1:i+=1,o.push(t===e?c:t)}return{degree:n,crossWingLinks:r,intraWingLinks:i,byType:a,relatedRoomKeys:[...new Set(o)]}}function Nl(e,t){let n={},r=0;for(let i of t||[]){if(!i.sourceWingId||!i.targetWingId||!(i.sourceWingId===e||i.targetWingId===e))continue;let t=i.relationshipType||`tunnel`;n[t]=(n[t]||0)+1,i.sourceWingId!==i.targetWingId&&(r+=1)}return{byType:n,crossWingTouches:r}}function Pl(e,t,n,r=null){if(r?.length)return Fl(e,r);let i=Array.isArray(t)?t:[],o=new Map,s=0;for(let t of i){let r=Tl(t.from,n,e),i=Tl(t.to,n,t.wing||null);if(!r||!i||r.wing===i.wing||r.wing!==e&&i.wing!==e)continue;s+=1;let a=r.wing===e?i:r;o.set(a.wing,(o.get(a.wing)||0)+1)}let c=[...o.entries()].sort((e,t)=>t[1]-e[1]).slice(0,6).map(([e,t])=>({wing:e,edges:t})),l=new Map;for(let t of i){let r=Tl(t.from,n,e),i=Tl(t.to,n,t.wing||null);!r||!i||(r.wing===e&&i.wing!==e&&l.set(r.key,(l.get(r.key)||0)+1),i.wing===e&&r.wing!==e&&l.set(i.key,(l.get(i.key)||0)+1))}let u=[...l.entries()].sort((e,t)=>t[1]-e[1]).slice(0,5).map(([e,t])=>{let n=a(e);return{wing:n?.wingId??e.split(`/`)[0],room:n?.roomName??e.slice(e.indexOf(`/`)+1),key:e,crossEdges:t}});return{crossWingTouches:s,topExternalWings:c,topRoomsByCrossWing:u}}function Fl(e,t){let n=new Map,r=0;for(let i of t){if(i.sourceWingId===i.targetWingId||i.sourceWingId!==e&&i.targetWingId!==e)continue;r+=1;let t=i.sourceWingId===e?i.targetWingId:i.sourceWingId;n.set(t,(n.get(t)||0)+1)}let i=[...n.entries()].sort((e,t)=>t[1]-e[1]).slice(0,6).map(([e,t])=>({wing:e,edges:t})),o=new Map;for(let n of t)n.sourceWingId!==n.targetWingId&&(n.sourceWingId===e&&n.targetWingId!==e&&o.set(n.sourceRoomId,(o.get(n.sourceRoomId)||0)+1),n.targetWingId===e&&n.sourceWingId!==e&&o.set(n.targetRoomId,(o.get(n.targetRoomId)||0)+1));let s=[...o.entries()].sort((e,t)=>t[1]-e[1]).slice(0,5).map(([e,t])=>{let n=a(e);return{wing:n?.wingId??e.split(`/`)[0],room:n?.roomName??e.slice(e.indexOf(`/`)+1),key:e,crossEdges:t}});return{crossWingTouches:r,topExternalWings:i,topRoomsByCrossWing:s}}function Il(e){let t=0;for(let n of Object.values(e||{}))Array.isArray(n)&&(t+=n.length);return t}function Ll(e,t){let n=e?.[t];return Array.isArray(n)?n.reduce((e,t)=>e+(Number(t.drawers)||0),0):0}function Rl(e){let t=0;for(let n of Object.values(e||{}))typeof n==`number`&&(t+=n);return t}function zl(e){let t=Object.entries(e||{}).filter(([,e])=>typeof e==`number`);return t.sort((e,t)=>t[1]-e[1]),t.map(([e,t],n)=>({wing:e,rank:n+1,drawers:t}))}function Bl(e){let t=Object.entries(e||{}).map(([e,t])=>({wing:e,roomCount:Array.isArray(t)?t.length:0}));return t.sort((e,t)=>t.roomCount-e.roomCount),t.map((e,t)=>({...e,rank:t+1}))}function Vl(e,t){let n=e?.[t];return Array.isArray(n)?[...n].sort((e,t)=>(t.drawers||0)-(e.drawers||0)).map((e,t)=>({...e,rank:t+1})):[]}function Hl(e){let t=e%10,n=e%100;return n>=11&&n<=13?`${e}th`:t===1?`${e}st`:t===2?`${e}nd`:t===3?`${e}rd`:`${e}th`}function Ul(e,t,n=1){return t==null||t<=0||e==null?null:(100*(Number(e)/t)).toFixed(n)}function Wl({drawers:e=0,wingRoomSum:t,palaceTotal:n},r,i){let a=r?.degree??0,o=r?.crossWingLinks??0,s=r?.intraWingLinks??0,c=r?.medianDegree??null,l=t>0&&e>=t*.2,u=t>0&&e<=t*.05&&e>0,d=c!=null&&a>=c*2&&a>=2;return i?a===0?{label:`Isolated room`,detail:`This room does not appear on any resolved tunnel edge (or naming does not match graph endpoints).`}:o>=2&&d?{label:`Dense cross-wing connector`,detail:`High tunnel degree with multiple cross-wing links.`}:o>=1&&d?{label:`Highly connected hub`,detail:`Above-average tunnel degree with cross-wing reach.`}:o>=1&&s<=1?{label:`Cross-wing bridge`,detail:`Most links span outside this wing.`}:l&&a<=(c||1)?{label:`Large but weakly connected`,detail:`Many drawers relative to the wing, few tunnel links.`}:u&&d?{label:`Small but structurally important`,detail:`Fewer drawers than peers, but high connectivity.`}:d?{label:`Highly connected hub`,detail:c==null?`Degree ${a}.`:`Degree ${a} vs median ${c}.`}:n>0&&e/n>=.08&&a<2?{label:`Major archive, few tunnels`,detail:`Large share of palace drawers with sparse tunnels.`}:{label:`Balanced footprint`,detail:`Typical size and connectivity for this palace.`}:{label:`Tunnel graph unavailable`,detail:`No resolvable tunnel edges for the loaded taxonomy, or graph-stats returned empty.`}}function Gl(e,t){let{totalDrawers:n,wingCount:r,roomCount:i,tunnelNodeCount:a,graphEdgeCount:o,kgAvailable:s,kgSummary:c,ga:l,wingsData:u}=e,d=zl(u).slice(0,5),f={wings:`Wing spheres are sized by drawer count. Click a wing to open its rooms.`,rooms:e.focusWing?`Focused on “${e.focusWing}”: rooms orbit the wing. Click another wing in “all rooms” layout or use search.`:`Each cluster is a wing; rooms orbit their wing. Click a room to inspect and center.`,graph:`Force-directed graph. Edges are explicit MCP tunnel links from MemPalace tunnel discovery only.`},p=``;return!l.hasResolvableEdges&&o===0?p=`No explicit MCP tunnel edges loaded.`:l.hasResolvableEdges?l.crossFraction!=null&&(p=l.crossFraction>=.5?`Cross-wing tunnel links account for a large share of explicit resolved edges.`:`Explicit resolved edges mix cross-wing tunnels with same-wing structure (see relationship toggles).`):p=`Graph metadata is present but endpoints could not be matched to taxonomy rooms (check naming).`,{totalDrawers:n,wingCount:r,roomCount:i,tunnelNodeCount:a,graphEdgeCount:o,crossWingEdges:l.crossWingEdgeCount,kgAvailable:s,kgSummary:c,largestWingsByDrawers:d,mostConnectedRooms:l.topConnectedRooms.slice(0,5),mostCrossLinkedWings:l.topCrossLinkedWings.slice(0,5),roomsWithNoTunnels:l.roomsWithNoTunnels,viewHint:f[t]||f.wings,graphBlurb:p,ga:l}}function Kl(e,t,n=8){if(!t||t.view!==`graph`)return e;for(e.push(t);e.length>n;)e.shift();return e}function ql(e){return e.length?e.pop():null}function Jl(e,t,n){let r=e;if(!r.length)return null;let i=r.indexOf(t),a=r.length;return i===-1?n>=0?r[0]:r[a-1]:r[(i+n+a*16)%a]}function Yl(e){if(!e||!e.startsWith(`room:`))return null;let t=e.slice(5),n=t.indexOf(`:`);return n<=0?null:{wing:t.slice(0,n),room:t.slice(n+1)}}function Xl(e,t,n){return!!(n&&e&&t&&e!==t)}var Zl=[`shortest`,`tunnel_preferred`,`balanced`,`adjacency_light`],Ql=`shortest`,$l={shortest:{label:`Shortest`,shortLabel:`Shortest`,hint:`Fewest hops on visible edges (BFS).`},tunnel_preferred:{label:`Tunnel-preferred`,shortLabel:`Tunnels`,hint:`Prefer explicit tunnel edges; may add hops vs shortest.`},balanced:{label:`Balanced`,shortLabel:`Balanced`,hint:`Trade hop count vs edge-type cost (tunnel cheaper than adjacency).`},adjacency_light:{label:`Adjacency-light`,shortLabel:`Adj-light`,hint:`Strongly avoid taxonomy_adjacency hops when alternatives exist.`}};function eu(e){let t=String(e||``).trim();return Zl.includes(t)?t:Ql}function tu(e,t){let n=e||`tunnel`,r=eu(t);return r===`shortest`?1:r===`tunnel_preferred`?n===`tunnel`?2:n===`taxonomy_adjacency`?10:4:r===`balanced`?n===`tunnel`?3:n===`taxonomy_adjacency`?7:4:r===`adjacency_light`?n===`tunnel`?2:n===`taxonomy_adjacency`?14:3:4}function nu(e,t){if(!e||!t||e.length!==t.length)return!1;for(let n=0;n<e.length;n+=1)if(e[n]!==t[n])return!1;return!0}function ru(e,t){if(!e||typeof e!=`object`)return null;if(e.sourceRoomId&&e.targetRoomId)return{a:String(e.sourceRoomId),b:String(e.targetRoomId)};if(e.from==null||e.to==null)return null;let n=Tl(String(e.from),t,null),r=Tl(String(e.to),t,e.wing||null);return!n||!r?null:{a:n.key,b:r.key}}function iu(e,t,n){let r=Array.isArray(e)?e:[],i=jc(t,n?.length?n:Oc(r));return i==null?r:i.size===0?[]:Mc(r,i)}function au(e,t){return e<t?`${e}\0${t}`:`${t}\0${e}`}function ou(e,t){let n=new Map;function r(e,t,r,i){if(!e||!t||e===t)return;n.has(e)||n.set(e,new Map),n.has(t)||n.set(t,new Map);let a=n.get(e).get(t);(!a||i<a.edgeKey)&&(n.get(e).set(t,{relationshipType:r,edgeKey:i}),n.get(t).set(e,{relationshipType:r,edgeKey:i}))}for(let n=0;n<e.length;n+=1){let i=e[n],a=ru(i,t);if(!a)continue;let o=Dc(i),s=i.edgeId==null?`legacy:${n}`:String(i.edgeId);r(a.a,a.b,o,s)}let i=new Map;return n.forEach((e,t)=>{let n=[...e.entries()].map(([e,t])=>({to:e,relationshipType:t.relationshipType,edgeKey:t.edgeKey})).sort((e,t)=>e.to.localeCompare(t.to));i.set(t,n)}),i}function su(e,t,n){let r=eu(n),i=new Map;function a(e,t){if(!e||t.cost<e.cost)return t;if(t.cost>e.cost)return e;let n=e.relationshipType.localeCompare(t.relationshipType);return n===0?e.edgeKey<=t.edgeKey?e:t:n<0?e:t}for(let n=0;n<e.length;n+=1){let o=e[n],s=ru(o,t);if(!s)continue;let c=Dc(o),l=o.edgeId==null?`legacy:${n}`:String(o.edgeId),u=tu(c,r),d={a:s.a,b:s.b,relationshipType:c,edgeKey:l,cost:u},f=au(s.a,s.b);i.set(f,a(i.get(f),d))}let o=new Map;return i.forEach(e=>{o.has(e.a)||o.set(e.a,[]),o.has(e.b)||o.set(e.b,[]),o.get(e.a).push({to:e.b,relationshipType:e.relationshipType,edgeKey:e.edgeKey,cost:e.cost}),o.get(e.b).push({to:e.a,relationshipType:e.relationshipType,edgeKey:e.edgeKey,cost:e.cost})}),o.forEach(e=>{e.sort((e,t)=>e.to.localeCompare(t.to))}),o}function cu(e,t,n){let r=String(t),i=String(n);if(!e.has(r)||!e.has(i))return null;if(r===i)return{pathRoomIds:[r],segmentTypes:[],segmentEdgeKeys:[]};let a=new Map;a.set(r,{prev:null,relationshipType:``,edgeKey:``});let o=[r],s=new Set([r]);for(;o.length;){let t=o.shift(),n=e.get(t);if(n){for(let{to:e,relationshipType:c,edgeKey:l}of n)if(!s.has(e)){if(s.add(e),a.set(e,{prev:t,relationshipType:c,edgeKey:l}),e===i)return uu(a,r,i);o.push(e)}}}return null}function lu(e,t,n){let r=String(t),i=String(n);if(!e.has(r)||!e.has(i))return null;if(r===i)return{pathRoomIds:[r],segmentTypes:[],segmentEdgeKeys:[],totalCost:0};let a=2**53-1,o=[...e.keys()],s=new Map,c=new Map,l=new Map,u=new Map;for(let e of o)s.set(e,a),c.set(e,a),l.set(e,null);s.set(r,0),c.set(r,0),u.set(r,{prev:null,relationshipType:``,edgeKey:``});let d=new Set;for(;d.size<o.length;){let t=null,n=a,r=a;for(let e of o){if(d.has(e))continue;let i=s.get(e),o=c.get(e);i!==a&&(t==null||i<n||i===n&&o<r||i===n&&o===r&&e<t)&&(t=e,n=i,r=o)}if(t==null||n===a||(d.add(t),t===i))break;let f=e.get(t);if(f)for(let{to:e,relationshipType:n,edgeKey:r,cost:i}of f){let a=s.get(t)+i,o=c.get(t)+1,d=s.get(e),f=c.get(e),p=!1;(a<d||a===d&&o<f||a===d&&o===f&&t<(l.get(e)||`￿`))&&(p=!0),p&&(s.set(e,a),c.set(e,o),l.set(e,t),u.set(e,{prev:t,relationshipType:n,edgeKey:r}))}}if(s.get(i)===a)return null;let f=uu(u,r,i);return f?{...f,totalCost:s.get(i)}:null}function uu(e,t,n){let r=[],i=n;for(;r.push(i),i!==t;){let t=e.get(i);if(!t?.prev)return null;i=t.prev}r.reverse();let a=[],o=[];for(let t=1;t<r.length;t+=1){let n=e.get(r[t]);if(!n)return null;a.push(n.relationshipType||`tunnel`),o.push(n.edgeKey||``)}return{pathRoomIds:r,segmentTypes:a,segmentEdgeKeys:o}}function du(e){return s(e)}function fu(e){let t=Yl(e);return t?i(t.wing,t.room):null}function pu(e){if(!e||e.length<=2)return[];let t=[];for(let n=1;n<e.length-1;n+=1){let r=a(e[n-1]),i=a(e[n]),o=a(e[n+1]);!r||!i||!o||(r.wingId!==i.wingId||i.wingId!==o.wingId)&&t.push(e[n])}return t}function mu(e){let t={};for(let n of e||[]){let e=n||`tunnel`;t[e]=(t[e]||0)+1}return t}function hu(e){let t=e?.length??0;if(!t)return``;let n=mu(e),r=n.tunnel||0,i=n.taxonomy_adjacency||0,a=0;for(let[e,t]of Object.entries(n))e!==`tunnel`&&e!==`taxonomy_adjacency`&&(a+=t);return r===t?`Edge mix: all tunnel.`:i===t?`Edge mix: all taxonomy_adjacency.`:a?`Edge mix: ${r} tunnel, ${i} adjacency, ${a} other.`:`Edge mix: ${r} tunnel, ${i} adjacency.`}function gu(e,t,n,r){let i=(e||[]).filter(e=>Dc(e)===`tunnel`);return i.length?!!cu(ou(i,t),n,r):!1}function _u(e,t,n,r={}){let i=eu(e),a=!!r.tunnelOnlyPossible,o=r.segmentTypes||[];if(!t||!n)return null;if(i===`shortest`)return`Fewest-hop path (reference mode).`;let s=nu(t.pathRoomIds,n.pathRoomIds),c=Math.max(0,t.pathRoomIds.length-1),l=Math.max(0,n.pathRoomIds.length-1),u=[];s?u.push(`Same path as Shortest (fewest hops).`):c>l?u.push(`Adds ${c-l} hop(s) vs Shortest to satisfy ${$l[i].shortLabel} scoring.`):c<l?u.push(`Uses ${l-c} fewer hop(s) than Shortest (unusual — check parallel edges).`):u.push(`Same hop count as Shortest but a different path — tie-break or parallel edges.`);let d=o.length>0&&o.every(e=>(e||`tunnel`)===`tunnel`);return(i===`tunnel_preferred`||i===`adjacency_light`)&&(!a&&!d?u.push(`No tunnel-only route under current filters — path mixes edge types as needed.`):a&&d&&u.push(`Tunnel-only path is available; this route uses tunnel edges.`)),u.join(` `)}function vu(e){let{graphEdges:t=[],roomsData:n={},enabledRelTypes:r,availableRelTypes:i,startRoomId:a,endRoomId:o,routeMode:c}=e||{},l=eu(c),u=String(a||``),d=String(o||``);if(!u||!d)return{ok:!1,reason:`missing_endpoint`,message:ul(`missing_endpoint`)};let f=i?.length?i:Oc(t),p=jc(r,f)!==null,m=Array.isArray(t)?t.length:0,h=iu(t,r,f);if(!h.length)return{ok:!1,reason:`no_edges`,message:ul(`no_edges`,{graphFilterNarrowed:m>0}),routingBasis:`explicit_mcp_only`,inferredLayerEnabled:!1,graphFilterNarrowed:p};let g=cu(ou(h,n),u,d);if(!g)return{ok:!1,reason:`no_path`,message:ul(`no_path`),routingBasis:`explicit_mcp_only`,inferredLayerEnabled:!1,graphFilterNarrowed:p};let _,v=null;if(l===`shortest`)_=g;else{let e=lu(su(h,n,l),u,d);if(_=e,v=e?e.totalCost:null,!_)return{ok:!1,reason:`no_path`,message:ul(`no_path`),routingBasis:`explicit_mcp_only`,inferredLayerEnabled:!1,graphFilterNarrowed:p}}let y=_.pathRoomIds.map(e=>s(e)).filter(Boolean);if(y.length!==_.pathRoomIds.length)return{ok:!1,reason:`id_map_failed`,message:ul(`id_map_failed`),graphFilterNarrowed:p};let b=Math.max(0,_.pathRoomIds.length-1),x=Math.max(0,g.pathRoomIds.length-1),S=!nu(_.pathRoomIds,g.pathRoomIds),C=gu(h,n,u,d),w=_u(l,_,g,{tunnelOnlyPossible:C,segmentTypes:_.segmentTypes}),T=hu(_.segmentTypes),E=(_.segmentTypes||[]).some(e=>(e||``)===`taxonomy_adjacency`);return{ok:!0,pathRoomIds:_.pathRoomIds,pathSceneIds:y,segmentTypes:_.segmentTypes,segmentEdgeKeys:_.segmentEdgeKeys,hops:b,bridges:pu(_.pathRoomIds),typeCounts:mu(_.segmentTypes),routeMode:l,totalCost:v,referenceShortestHops:x,differsFromShortest:S,comparisonNote:w,mixSummary:T,tunnelOnlyPathExists:C,inferredLayerEnabled:!1,usesInferredSegments:E,routingBasis:`explicit_mcp_only`,graphFilterNarrowed:p}}function yu(e,t,n){if(n<=0)return 0;let r=n-1,i=Number(e)||0;i=Math.max(0,Math.min(r,i));let a=n;return(i+t+a*32)%a}function bu(e,t){if(!t||t<1)return 0;let n=Math.floor(Number(e));return Number.isFinite(n)||(n=0),n<0&&(n=0),n>t-1&&(n=t-1),n}function xu(e,t,n){let r=n===`from`?t.sourceRoomId||t.from:t.targetRoomId||t.to;if(r==null)return null;let a=String(r);return e.find(e=>e.type===`room`?i(e.wing,e.name)===a||!a.includes(`/`)&&e.name===a?!0:`${e.wing}/${e.name}`===a:!1)}var Su={wingColors:{projects:`#8b9cf8`,shared_grocery_list:`#6ee7b7`,openclaw:`#94a3b8`,default:`#fbbf24`},nodeSizes:{wingMin:3,wingMax:8,roomMin:.8,roomMax:2.5},spacing:{wingSeparation:40,roomRadius:15},accent:{linkWing:4015188,linkGraph:5999871,center:14870768}};function Cu(e){let t=0,n=String(e||``);for(let e=0;e<n.length;e+=1)t=t*31+n.charCodeAt(e)>>>0;return t%360}function wu(e){return Su.wingColors[e]?Su.wingColors[e]:`hsl(${Cu(e)}, 52%, 68%)`}function Tu(e){e.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.dispose()):e.material.dispose())})}function Eu(e){e.geometry?.dispose(),e.material?.dispose()}function Du(e,t={}){let n,r,a,o,s,c=0,l=null,u={},d={},f=[],p=[],m=[],h=[],g=new Map,_=[],v=null,y=null,b=new Map,x=80,S=null,C=0,w=[],T=null,E=0,D=`wings`,O=null,k=1,ee=!0,te=!0,A=null,ne=()=>({active:!1,pathSceneIds:[],stepIndex:0,segmentTypes:[],bridgeSceneIds:[]}),j={searchQuery:``,hoveredId:null,selectedId:null,pinActive:!1,relationshipTypesVisible:null,route:ne()},M=typeof window<`u`&&window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches,re=new Map,ie=new Map,ae={onHover:t.onHover||(()=>{}),onClick:t.onClick||(()=>{}),onBackgroundClick:t.onBackgroundClick||(()=>{})},oe=new pc,se=new B;function ce(e,t,n=850){let i=r.position.clone(),a=o.target.clone(),s=performance.now();l&&cancelAnimationFrame(l);function c(){let u=Math.min((performance.now()-s)/n,1),d=1-(1-u)**3;r.position.lerpVectors(i,e,d),o.target.lerpVectors(a,t,d),o.update(),l=u<1?requestAnimationFrame(c):null}l=requestAnimationFrame(c)}function le(){p.forEach(({mesh:e})=>{n.remove(e),Tu(e)}),m.forEach(({line:e})=>{n.remove(e),Eu(e)}),h.forEach(({sprite:e})=>{n.remove(e),e.material.map?.dispose(),e.material.dispose()}),p=[],m=[],h=[],g=new Map,_=[],v=null,y=null,b=new Map,x=80,S=null,C=0,w=[],T=null,E&&clearTimeout(E),E=0,n?.fog?.isFogExp2&&(n.fog.density=.0026),s?.material&&(s.material.opacity=.35),re.clear(),ie.clear()}function ue(){let e=new er,t=[];for(let e=0;e<1800;e+=1)t.push(Ke.randFloatSpread(380),Ke.randFloatSpread(200),Ke.randFloatSpread(380));e.setAttribute(`position`,new Kn(t,3)),s=new Es(e,new xs({color:9741240,size:.45,transparent:!0,opacity:.35,depthWrite:!1})),n.add(s)}function de(e,t=`#e2e8f0`){let n=document.createElement(`canvas`),r=n.getContext(`2d`);r.font=`500 22px ui-sans-serif, system-ui, sans-serif`;let i=Math.ceil(r.measureText(e).width)+32;n.width=i,n.height=44,r.font=`500 22px ui-sans-serif, system-ui, sans-serif`,r.fillStyle=`rgba(15,23,42,0.88)`,r.fillRect(4,4,i-8,36),r.fillStyle=t,r.fillText(e,16,28);let a=new Os(n);a.needsUpdate=!0;let o=new fs(new Qo({map:a,transparent:!0,depthWrite:!1})),s=.022*i;return o.scale.set(s,11,1),o.userData.labelBaseScale={x:s,y:11,z:1},o}function fe(e,t,n){let r=t.material;re.set(e,{mesh:t,data:n,id:e,baseOpacity:r.opacity,baseEmissive:r.emissiveIntensity,baseScale:1,presentationOpacity:1}),t.userData.nodeId=e}function pe(e,t,r,i,a,o){let s=de(t,o);s.visible=ee,s.position.set(r,i+2.2,a),n.add(s),h.push({sprite:s,nodeId:e}),ie.set(e,s)}function me(e){let t=h.findIndex(t=>t.nodeId===e);if(t===-1)return;let{sprite:r}=h[t];n.remove(r),r.material.map?.dispose(),r.material.dispose(),h.splice(t,1),ie.delete(e);let i=w.indexOf(e);i>=0&&w.splice(i,1)}function ge(){for(let e=0;e<w.length;e+=1){let t=w[e];if(!(t===j.selectedId||t===j.hoveredId||j.selectedId&&Qc(j.selectedId,b).has(t)||!j.selectedId&&j.hoveredId&&Qc(j.hoveredId,b).has(t)))return w.splice(e,1),me(t),!0}return!1}function _e(e){if(ie.has(e))return;let t=re.get(e);if(!t?.data||t.data.type!==`room`)return;for(;w.length>=40&&ge(););if(w.length>=40)return;let{mesh:n,data:r}=t,i=n.position;pe(e,r.name,i.x,i.y,i.z,`#94a3b8`),w.push(e)}function ve(){if(D!==`graph`||!_.length||!r)return;let e=Gc(r.position.distanceTo(o.target),x),t=v?.tier??0,n=v?.labelBudget??180,i=j.selectedId,a=j.hoveredId,{primaryId:s}=$c(i,a),c=s?Qc(s,b):new Set,l=Xc(i||a),u=tl(_,{selectedId:i,hoveredId:a,pinActive:j.pinActive,budget:n,neighborIds:c,focusWingId:l,cameraDistanceNorm:e,densityTier:t}),d=(j.searchQuery||``).trim().toLowerCase();for(let e of u)e.startsWith(`room:`)&&!ie.has(e)&&_e(e);ie.forEach((t,n)=>{let r=re.get(n)?.data;if(!r)return;let o=P(r,d),s=u.has(n),l={selected:n===i,hovered:n===a,pinned:!!(j.pinActive&&n===i),neighbor:c.has(n)},f=qc(e,l),p=t.userData.labelBaseScale;p&&t.scale.set(p.x*f,p.y*f,p.z);let m=o?Jc(e,l):.12;t.material.opacity=m,t.visible=ee&&s})}function N(e,t,r,i=.28,a={}){let o=[new H(...e),new H(...t)],s=new bs(new er().setFromPoints(o),new ms({color:r,transparent:!0,opacity:i}));return s.userData=a,n.add(s),m.push({line:s,...a}),s}function ye(e,t,r,i,a){let o=new U(wu(e)),s=`wing:${e}`,c=new vr(new ks(a,28,28),new As({color:o,emissive:o,emissiveIntensity:.22,metalness:.15,roughness:.45,transparent:!0,opacity:.92}));c.position.set(t,r,i),c.userData={id:s,name:e,wingId:e,type:`wing`,drawers:u[e],label:e,_baseY:r};let l=new vr(new ks(a*1.25,24,24),new Bn({color:o,transparent:!0,opacity:.08,side:1,depthWrite:!1}));return c.add(l),n.add(c),p.push({mesh:c,data:c.userData}),fe(s,c,c.userData),c}function be(e,t,r,a,o,s){let c=new U(wu(t));c.offsetHSL(0,-.05,-.06);let l=`room:${t}:${e}`,u=new vr(new ks(s,20,20),new As({color:c,emissive:c,emissiveIntensity:.18,metalness:.12,roughness:.5,transparent:!0,opacity:.88}));u.position.set(r,a,o);let f=(d[t]||[]).find(t=>t.name===e);return u.userData={id:l,name:e,type:`room`,wing:t,wingId:t,roomId:f?.roomId||i(t,e),drawers:f?.drawers,label:e,_baseY:a},n.add(u),p.push({mesh:u,data:u.userData}),fe(l,u,u.userData),u}function P(e,t){if(!t)return!0;let n=[e.name,e.label,e.wing,e.type].filter(Boolean).join(` `).toLowerCase();return n.includes(t)||t.split(/\s+/).every(e=>e.length<2||n.includes(e))}function F(e){return e==null?``:[...e].sort().join(`\0`)}function xe(e,t){let n=e||ne(),r=t||ne();return!!n.active==!!r.active?n.active?n.stepIndex!==r.stepIndex||(n.pathSceneIds||[]).join(`\0`)!==(r.pathSceneIds||[]).join(`\0`)||(n.segmentTypes||[]).join(`\0`)!==(r.segmentTypes||[]).join(`\0`)?!1:(n.bridgeSceneIds||[]).join(`\0`)===(r.bridgeSceneIds||[]).join(`\0`):!0:!1}function I(e,t){return!e||!t?``:e<t?`${e}\0${t}`:`${t}\0${e}`}function L(e,t){return e.searchQuery===t.searchQuery&&e.hoveredId===t.hoveredId&&e.selectedId===t.selectedId&&e.pinActive===t.pinActive&&F(e.relationshipTypesVisible)===F(t.relationshipTypesVisible)&&xe(e.route,t.route)}function R(){let e=(j.searchQuery||``).trim().toLowerCase(),t=j.hoveredId,n=j.selectedId,r=j.pinActive,i=j.relationshipTypesVisible,a=v?.tier??0,o=j.route||ne(),s=D===`graph`&&o.active&&Array.isArray(o.pathSceneIds)&&o.pathSceneIds.length>0,c=new Set,l=new Map;if(s){let e=o.pathSceneIds;for(let t=0;t<e.length-1;t+=1)c.add(I(e[t],e[t+1])),l.set(I(e[t],e[t+1]),t)}let u=new Set(o.bridgeSceneIds||[]),d=s&&o.pathSceneIds.length>0?o.pathSceneIds[bu(o.stepIndex,o.pathSceneIds.length)]:null,f=new Map,p=v?.globalEdgeOpacityMult??1,h=v?.adjacencyOpacityMult??1,y=v?.tunnelEmphasisMult??1;m.forEach(r=>{let{line:u,fromId:d,toId:m,baseOpacity:g=.28,isGraphRelationship:_,relationshipType:v,styleColorHex:b}=r,x=d?P(re.get(d)?.data||{},e):!0,S=m?P(re.get(m)?.data||{},e):!0,C=!e||x&&S,w=!0;if(_&&i!=null){let e=v||`tunnel`;w=i.has(e)}if(!C){u.visible=!0,u.material.opacity=g*.12;return}if(_&&!w){u.visible=!1;return}u.visible=!0;let T=g;if(_){let e=v||`tunnel`;e===`taxonomy_adjacency`&&(T*=h),e===`tunnel`&&(T*=y),T*=p,T*=rl({selectedId:n,hoveredId:t,fromId:d,toId:m,relationshipType:e,densityTier:a,isGraphRelationship:!0})}if(s&&_&&d&&m){let e=I(d,m),t=c.has(e),n=l.get(e),r=n!=null&&Array.isArray(o.segmentTypes)&&o.segmentTypes[n]?o.segmentTypes[n]:v||`tunnel`,i=new U(b??kc(r).color);t?(T=Math.min(1,T*1.52),i.lerp(new U(16777215),.11),r===`tunnel`?(i.lerp(new U(5999871),.06),T=Math.min(1,T*1.03)):r===`taxonomy_adjacency`&&i.lerp(new U(4049336),.05)):(T*=.32,i.multiplyScalar(.72)),u.material.color.copy(i)}else _&&b!=null&&u.material.color.setHex(b);u.material.opacity=T,_&&(d&&f.set(d,(f.get(d)||0)+1),m&&f.set(m,(f.get(m)||0)+1))});let{primaryId:x}=$c(n,t),S=x&&D===`graph`?Qc(x,b):null;re.forEach((i,c)=>{let{mesh:l,data:p,baseOpacity:m,baseEmissive:h}=i,_=l.material;if(!_||_.type===`MeshBasicMaterial`)return;let v=P(p,e),y=v?1:.14,b=1;T&&c===T.id&&(b*=1.22),c===n?b*=r?1.88:1.68:c===t&&(b*=n?1.36:1.48),c===n&&r?y=Math.max(y,.88):c===n&&(y=Math.max(y,.82));let C=g.get(c)||0,w=f.get(c)||0;p.type===`room`&&C>0&&w===0&&D===`graph`&&(y*=a>=2?.28:a>=1?.31:.38,b*=a>=2?.48:.54),S&&(S.has(c)&&(y=Math.max(y,a>=2?.55:.66),b*=1.09),c===x&&(y=Math.max(y,r&&c===n?.94:.88)));let E=1;if(s&&p.type===`room`)if(!new Set(o.pathSceneIds).has(c))y*=.4,b*=.75;else{let e=o.pathSceneIds[0],t=o.pathSceneIds[o.pathSceneIds.length-1];c===e&&(b*=1.1),c===t&&(b*=1.08),u.has(c)&&c!==e&&c!==t&&(b*=1.06,E=Math.max(E,1.03)),d&&c===d&&(b*=1.18,E=1.05)}i.presentationOpacity=Math.min(1,y),_.opacity=Math.min(1,m*y),_.emissiveIntensity=h*b;let O=c===n?r?1.12:1.08:c===t?n&&c!==n?1.04:1.06:S?.has(c)?1.028:1,k=v?1:.88;l.scale.setScalar(O*k*E)}),s&&o.pathSceneIds.length&&o.pathSceneIds.forEach(e=>{e&&e.startsWith(`room:`)&&_e(e)}),D===`graph`&&_.length?ve():ie.forEach((t,r)=>{let i=re.get(r)?.data;if(!i)return;let a=P(i,e);t.visible=ee,t.material.opacity=a?r===n?1:.92:.2})}function Se(){let e=Object.keys(u);if(!e.length)return;let t=Math.PI*2/e.length,r=Su.spacing.wingSeparation/2;e.forEach((e,n)=>{let i=n*t,a=Math.cos(i)*r,o=Math.sin(i)*r,s=u[e]||1;ye(e,a,0,o,Ke.mapLinear(s,1,200,Su.nodeSizes.wingMin,Su.nodeSizes.wingMax)),pe(`wing:${e}`,e,a,0,o,`#e2e8f0`)});let i=new vr(new ks(1.1,20,20),new As({color:Su.accent.center,emissive:3359061,emissiveIntensity:.4,metalness:.3,roughness:.4,transparent:!0,opacity:.55}));n.add(i),p.push({mesh:i,data:{name:`Palace core`,type:`center`}}),e.forEach((e,n)=>{let i=n*t;N([0,0,0],[Math.cos(i)*r,0,Math.sin(i)*r],Su.accent.linkWing,.22,{fromId:null,toId:`wing:${e}`,baseOpacity:.22})}),ce(new H(0,36,88),new H(0,0,0))}function Ce(e){let t=d[e]||[];ye(e,0,0,0,Su.nodeSizes.wingMin+1.2),pe(`wing:${e}`,e,0,0,0,`#e2e8f0`);let n=Su.spacing.roomRadius,r=Math.max(t.length,1),i=Math.PI*2/r;t.forEach((t,r)=>{let a=r*i,o=Math.cos(a)*n,s=Math.sin(a)*n,c=Ke.mapLinear(t.drawers||1,1,80,Su.nodeSizes.roomMin,Su.nodeSizes.roomMax);be(t.name,e,o,0,s,c),N([0,0,0],[o,0,s],Su.accent.linkWing,.22,{fromId:`wing:${e}`,toId:`room:${e}:${t.name}`,baseOpacity:.22}),pe(`room:${e}:${t.name}`,t.name,o,0,s,`#94a3b8`)}),ce(new H(0,38,72),new H(0,0,0))}function we(){let e=Object.keys(d);if(!e.length)return;let t=Math.PI*2/e.length,r=Su.spacing.wingSeparation/2;e.forEach((e,n)=>{let i=n*t,a=Math.cos(i)*r,o=Math.sin(i)*r;ye(e,a,0,o,Su.nodeSizes.wingMin),pe(`wing:${e}`,e,a,0,o,`#cbd5e1`);let s=d[e]||[],c=Math.PI*2/Math.max(s.length,1),l=Su.spacing.roomRadius;s.forEach((t,n)=>{let r=i+n*c,s=a+Math.cos(r)*l,u=o+Math.sin(r)*l,d=Ke.mapLinear(t.drawers||1,1,80,Su.nodeSizes.roomMin,Su.nodeSizes.roomMax);be(t.name,e,s,0,u,d),N([a,0,o],[s,0,u],Su.accent.linkWing,.18,{fromId:`wing:${e}`,toId:`room:${e}:${t.name}`,baseOpacity:.18}),pe(`room:${e}:${t.name}`,t.name,s,0,u,`#94a3b8`)})});let i=new vr(new ks(1.1,20,20),new As({color:Su.accent.center,emissive:3359061,emissiveIntensity:.35,metalness:.25,roughness:.45,transparent:!0,opacity:.5}));n.add(i),p.push({mesh:i,data:{name:`Palace core`,type:`center`}}),e.forEach((e,n)=>{let i=n*t;N([0,0,0],[Math.cos(i)*r,0,Math.sin(i)*r],Su.accent.linkWing,.2,{baseOpacity:.2})}),ce(new H(0,52,102),new H(0,0,0))}function Te(){O&&d[O]?Ce(O):we()}function z(e){return[...e].sort((e,t)=>e.localeCompare(t))}function Ee(){let e=new Map;Object.keys(u).forEach(t=>{e.set(t,{name:t,type:`wing`,wing:t,x:0,y:0,z:0})}),Object.entries(d).forEach(([t,n])=>{n.forEach(n=>{e.set(i(t,n.name),{name:n.name,type:`room`,wing:t,x:0,y:0,z:0,drawers:n.drawers})})});let t=Array.from(e.values());if(!t.length){let e=new vr(new ks(1.1,16,16),new As({color:Su.accent.center,emissive:3359061,emissiveIntensity:.25,metalness:.2,roughness:.5,transparent:!0,opacity:.35}));n.add(e),p.push({mesh:e,data:{name:`No graph data`,type:`center`}}),ce(new H(0,28,72),new H(0,0,0));return}let a=z(Object.keys(u));g=ll(t,f,xu),b=Zc(f,t,xu),v=zc(t.length,f.length,a.length),M&&(v={...v,labelBudget:Math.min(v.labelBudget,95)}),Hc(t,a,v),Uc(t,f,v,xu),Wc(t,v.collisionMinDist,12),n.fog&&n.fog.isFogExp2&&(n.fog.density=v.fogDensity),s?.material&&(s.material.opacity=Math.max(.12,.34-v.tier*.055)),_=t.map(e=>{let t=e.type===`wing`?`wing:${e.name}`:`room:${e.wing}:${e.name}`,n=g.get(t)||0;return{id:t,incidentFull:n,baseScore:nl({type:e.type,incidentFull:n,drawers:e.drawers})}});let o=el(_,v);t.forEach(e=>{let t=e.type===`wing`,n=t?Su.nodeSizes.wingMin+.4:Su.nodeSizes.roomMin+.2;if(t)ye(e.name,e.x,e.y,e.z,n),pe(`wing:${e.name}`,e.name,e.x,e.y,e.z,`#cbd5e1`);else{let t=`room:${e.wing}:${e.name}`;be(e.name,e.wing,e.x,e.y,e.z,n),o.has(t)&&pe(t,e.name,e.x,e.y,e.z,`#94a3b8`)}}),f.forEach(e=>{let n=xu(t,e,`from`),r=xu(t,e,`to`);if(n&&r){let t=cl(n),i=cl(r),a=Dc(e),o=kc(a);N([n.x,n.y,n.z],[r.x,r.y,r.z],o.color,o.opacity,{fromId:t,toId:i,baseOpacity:o.opacity,isGraphRelationship:!0,relationshipType:a,styleColorHex:o.color})}});let c=new xt;t.forEach(e=>c.expandByPoint(new H(e.x,e.y,e.z)));let l=new H;c.getCenter(l);let m=new H;c.getSize(m);let h=Math.max(m.x,m.y,m.z,12);x=h;let S=ol(h*.48,r.fov,v.tier),C=new H(.35,.42,1).normalize(),w=l.clone().add(C.multiplyScalar(S));y={position:w.clone(),target:l.clone()},ce(w,l)}function De(){let e=te&&D!==`graph`&&!M;o.autoRotate=e,o.autoRotateSpeed=.35*!!e}function Oe(e,t=null){D=e,O=t,le(),A=null,j.hoveredId=null,De(),e===`wings`?Se():e===`rooms`?Te():e===`graph`&&Ee(),R()}function ke(){A=null,j.hoveredId=null,a.domElement.style.cursor=`default`,R(),ae.onHover(null,{x:0,y:0})}function Ae(e){let t=a.domElement.getBoundingClientRect();se.x=(e.clientX-t.left)/t.width*2-1,se.y=-((e.clientY-t.top)/t.height)*2+1,oe.setFromCamera(se,r);let n=p.map(e=>e.mesh).filter(Boolean),i=oe.intersectObjects(n,!0);for(let t=0;t<i.length;t+=1){let n=i[t].object;for(;n&&!n.userData?.type;)n=n.parent;if(n&&n.userData?.type&&n.userData.type!==`center`){let t=n.userData.id||null,r=A!==n||j.hoveredId!==t;A=n,j.hoveredId=t,a.domElement.style.cursor=`pointer`,r&&R(),ae.onHover({...n.userData},{x:e.clientX,y:e.clientY});return}}let o=j.hoveredId!=null;A=null,j.hoveredId=null,a.domElement.style.cursor=`default`,o&&R(),ae.onHover(null,{x:e.clientX,y:e.clientY})}function je(){if(!A){T=null,ae.onBackgroundClick(),ae.onClick(null);return}let e={...A.userData};e.id&&e.type!==`center`&&(E&&clearTimeout(E),T={id:e.id,at:performance.now()},R(),E=setTimeout(()=>{E=0,T=null,R()},190)),ae.onClick(e)}function Me(){c=requestAnimationFrame(Me),o.update();let e=Date.now()*.001,t=M?0:.42*k,i=M?0:.006*k;p.forEach((n,r)=>{if(!n.data||n.data.type===`center`)return;let a=r*.37,o=n.mesh.userData._baseY??0;n.mesh.position.y=o+Math.sin(e*.9+a)*t,n.mesh.rotation.y+=i});let s=v?.tier??0;if(D===`graph`){let e=o.target;j.selectedId&&re.get(j.selectedId)?e=re.get(j.selectedId).mesh.position:j.hoveredId&&re.get(j.hoveredId)&&(e=re.get(j.hoveredId).mesh.position);let t=j.selectedId||j.hoveredId,n=t?Qc(t,b):new Set,r=!!(j.selectedId||j.hoveredId);re.forEach((t,i)=>{let a=t.mesh.material;if(!a||a.type===`MeshBasicMaterial`)return;let o=il(t.mesh.position.distanceTo(e),s,{isNeighbor:n.has(i),focusActive:r});a.opacity=Math.min(1,t.baseOpacity*(t.presentationOpacity??1)*o)}),ve()}a.render(n,r)}function Ne(){n=new Jo,n.background=new U(724760),n.fog=new qo(724760,.0026),r=new jr(58,e.clientWidth/e.clientHeight,.1,1200),r.position.set(0,34,90),a=new Go({antialias:!0,alpha:!1,powerPreference:`high-performance`}),a.setSize(e.clientWidth,e.clientHeight),a.setPixelRatio(Math.min(window.devicePixelRatio,2)),a.outputColorSpace=he,a.toneMapping=4,a.toneMappingExposure=1.05,e.appendChild(a.domElement),o=new Cc(r,a.domElement),o.enableDamping=!0,o.dampingFactor=.055,o.autoRotate=!0,o.autoRotateSpeed=.35,o.maxPolarAngle=Math.PI*.495;let t=new Js(6583435,988970,.85);n.add(t);let i=new ec(10859772,1.1);i.position.set(20,40,24),n.add(i);let s=new ec(3718648,.35);if(s.position.set(-24,12,-18),n.add(s),ue(),typeof window<`u`&&window.matchMedia){let e=window.matchMedia(`(prefers-reduced-motion: reduce)`);M=e.matches,e.addEventListener(`change`,e=>{M=e.matches,De()})}a.domElement.addEventListener(`pointermove`,Ae),a.domElement.addEventListener(`click`,je),a.domElement.addEventListener(`pointerleave`,ke),window.addEventListener(`resize`,Pe),Me()}function Pe(){if(!r||!a)return;let t=e.clientWidth,n=e.clientHeight;r.aspect=t/n,r.updateProjectionMatrix(),a.setSize(t,n)}function Fe(e){u=e.wingsData||{},d=e.roomsData||{},f=e.graphEdges||[]}function Ie(){if(D===`graph`&&y){ce(y.position.clone(),y.target.clone());return}ce(new H(0,34,90),new H(0,0,0))}function Le(e){let t=re.get(e);if(!t)return;let n=new H;if(t.mesh.getWorldPosition(n),D===`graph`&&v){let t=[];m.forEach(n=>{if(!n.isGraphRelationship)return;let r=null;if(n.fromId===e?r=n.toId:n.toId===e&&(r=n.fromId),!r)return;let i=re.get(r);i&&t.push(i.mesh.position.clone())});let i=t.length,a=sl(n,t.length?t:[n.clone()]),o=ol(a,r.fov,v.tier,{neighborCount:i}),s=r.position.clone().sub(n);s.lengthSq()<4&&s.set(32,26,72),s.normalize(),S===e?C+=1:(S=e,C=0);let c=al(Math.max(a*2.4,x*.42,28),v.tier,C),l=new H(n.x+c.x,n.y+c.y,n.z+c.z),u=C>0?1020:880;ce(n.clone().add(s.multiplyScalar(o)),l,u);return}let i=r.position.clone().sub(n).normalize(),a=D===`rooms`&&O?26:30;ce(n.clone().add(i.multiplyScalar(a)),n)}function Re(){A?.userData?.id&&Le(A.userData.id)}function ze(e,t=420){!e||!re.get(e)||(E&&clearTimeout(E),T={id:e,at:performance.now()},R(),E=setTimeout(()=>{E=0,T=null,R()},t))}function Be(e){let t={...j,...e};e.route!==void 0&&(t.route={...ne(),...e.route}),!L(j,t)&&(j=t,R())}function Ve(e){Be({relationshipTypesVisible:e})}function He(){j.selectedId=null,R()}function Ue(){cancelAnimationFrame(c),l&&cancelAnimationFrame(l),window.removeEventListener(`resize`,Pe),a?.domElement&&(a.domElement.removeEventListener(`pointermove`,Ae),a.domElement.removeEventListener(`click`,je),a.domElement.removeEventListener(`pointerleave`,ke)),le(),E&&clearTimeout(E),E=0,s&&(n.remove(s),s.geometry.dispose(),s.material.dispose()),a?.dispose(),a?.domElement?.parentNode&&a.domElement.parentNode.removeChild(a.domElement)}return{init:Ne,setData:Fe,setView:Oe,updatePresentation:Be,setAutoRotate(e){te=e,De()},setMotionIntensity(e){k=Math.max(0,Math.min(2,e))},setLabelsVisible(e){if(ee=!!e,ee&&!h.length){Oe(D,O);return}h.forEach(({sprite:e})=>{e.visible=ee})},resetCamera:Ie,centerOnHovered:Re,centerOnNodeId:Le,pulseNodeEmphasis:ze,clearPin:He,resize:Pe,dispose:Ue,getView:()=>D,getFocusWing:()=>O,getHovered:()=>A?{...A.userData}:null,setCallbacks(e){Object.assign(ae,e)},setRelationshipFilters:Ve,getGraphNeighbors(e){return D!==`graph`||!e?[]:[...Qc(e,b)].sort((e,t)=>e.localeCompare(t))}}}var Ou=new Set([`wings`,`rooms`,`graph`]);function ku(e){return typeof e!=`object`||!e?null:e}function Au(e){let t=ku(e);return t?{view:Ou.has(t.view)?t.view:`wings`,currentWing:typeof t.currentWing==`string`?t.currentWing:t.currentWing??null,currentRoom:typeof t.currentRoom==`string`?t.currentRoom:t.currentRoom??null,selected:t.selected&&typeof t.selected==`object`?t.selected:null,pinned:!!t.pinned,searchQuery:typeof t.searchQuery==`string`?t.searchQuery:``,labels:t.labels,rotate:t.rotate,motion:t.motion}:{view:`wings`,currentWing:null,currentRoom:null,selected:null,pinned:!1,searchQuery:``,labels:void 0,rotate:void 0,motion:void 0}}function ju(e,t){let n=t?.wingsData||{},r=t?.roomsData||{};if(e.currentWing&&!h(n,e.currentWing)&&(e.currentWing=null,e.currentRoom=null,e.selected=null,e.pinned=!1),e.currentRoom&&e.currentWing&&(g(r,e.currentWing,e.currentRoom)||(e.currentRoom=null,e.selected?.type===`room`&&(e.selected=null,e.pinned=!1))),e.selected?.id){let t=e.selected;t.type===`wing`&&!h(n,t.name)&&(e.selected=null,e.pinned=!1),t.type===`room`&&(!t.wing||!g(r,t.wing,t.name))&&(e.selected=null,e.pinned=!1)}e.pinned&&!e.selected&&(e.pinned=!1)}function Mu(e,t,n={}){let r=n.assert||(()=>{});r(Ou.has(e.view),`view must be wings|rooms|graph`),e.currentWing&&r(h(t?.wingsData,e.currentWing),`currentWing must exist in wingsData`),e.currentRoom&&e.currentWing&&r(g(t?.roomsData,e.currentWing,e.currentRoom),`currentRoom must exist`),e.selected?.type===`wing`&&r(h(t?.wingsData,e.selected.name),`selected wing must exist`),e.selected?.type===`room`&&r(g(t?.roomsData,e.selected.wing,e.selected.name),`selected room must exist`),e.pinned&&r(!!e.selected,`pinned requires selection`)}var Nu=typeof process<`u`&&!1;function Pu(...e){Nu&&console.warn(`[mempalace-viz]`,...e)}function Fu(){return!!Nu}function Iu(e){return String(e??``).trim().toLowerCase()}function Lu(e,t){if(!e)return 0;let n=String(t??``).toLowerCase();if(!n)return 0;if(n===e)return 1e4;if(n.startsWith(e))return 8200-Math.min(e.length,40);let r=n.indexOf(e);if(r>=0)return 5200-Math.min(r,200);let i=e.split(/\s+/).filter(e=>e.length>1);if(i.length<2)return 0;let a=0,o=1/0;for(let e of i){let t=n.indexOf(e);if(t<0)return 0;a+=400,o=Math.min(o,t)}return 3e3-Math.min(o,200)+Math.min(a,800)}function Ru(e,t){let n=new Map,r=new Set([...Object.keys(e||{}),...Object.keys(t||{})]);for(let e of r)n.set(e,{kind:`wing`,sceneId:`wing:${e}`,wingId:e,label:e});let i=[...n.values()];for(let t of r){let n=e[t]||[];for(let e of n)!e||e.name==null||i.push({kind:`room`,sceneId:`room:${t}:${e.name}`,wingId:t,roomName:e.name,label:e.name})}return i}function zu(e){return e.kind===`wing`?`Wing`:`Room · ${e.wingId}`}function Bu(e,t){if(!t)return 0;if(e.kind===`wing`)return Lu(t,e.wingId);let n=Lu(t,e.roomName),r=Lu(t,e.wingId);return Math.max(n,r*.94)}function Vu(e,t){let n=Iu(t);if(!n||!e.length)return[];let r=new Map;for(let t of e){let e=Bu(t,n);if(e<=0)continue;let i=zu(t),a={...t,score:e,sublabel:i},o=r.get(t.sceneId);(!o||a.score>o.score)&&r.set(t.sceneId,a)}return[...r.values()].sort((e,t)=>t.score-e.score||e.label.localeCompare(t.label))}function Hu(e,t,n){return t<=0?0:(e+n+t*64)%t}var Uu=`mempalace-viz-explorer-v1`,Wu=`mempalace-viz-route-mode-v1`,Gu=`mempalace-viz-panel-state-v1`,Ku=new Set,qu=[{id:`wings`,title:`Wings`,hint:`High-level structure by domain or project.`},{id:`rooms`,title:`Rooms`,hint:`Rooms within each wing, orbiting their parent.`},{id:`graph`,title:`Graph`,hint:`Explicit MemPalace tunnel links (same room name across wings).`}],K={view:`wings`,hovered:null,selected:null,pinned:!1,currentWing:null,currentRoom:null,searchQuery:``,filters:{visibleWings:null}},q=null,J=null,Ju=null,Yu=null,Xu=null,Zu=null,Qu=null,$u=[],ed=[],td=[],nd=0,rd=!1,id=``,Y={startSceneId:null,targetSceneId:null,result:null,stepIndex:0},ad=Ql;function od(){try{let e=localStorage.getItem(Wu);if(e)return eu(JSON.parse(e))}catch{}return Ql}function sd(e){try{localStorage.setItem(Wu,JSON.stringify(eu(e)))}catch{}}ad=od();var X=e=>document.getElementById(e);function cd(e){if(!e||!(e instanceof HTMLElement))return!1;let t=e.tagName;return!!(t===`INPUT`||t===`TEXTAREA`||t===`SELECT`||e.isContentEditable)}function ld(e,t=5200){let n=X(`toast-host`);n&&(clearTimeout(Qu),n.innerHTML=`<div class="toast" role="status">${Z(e)}</div>`,Qu=setTimeout(()=>{n.innerHTML=``},t))}function ud(e){if(K.view!==`graph`)return``;let t=J?.graphStats,n=J?.graph,r=J?.graph?.edgesResolved?.length??J?.graphEdges?.length??0,i=Array.isArray(n?.edgesUnresolved)?n.edgesUnresolved.length:Array.isArray(t?.edgesUnresolved)?t.edgesUnresolved.length:null;if(!r){let e=_l();return`<div class="inspect-card inspect-card--hint" role="status"><strong>${Z(e.title)}</strong><p class="inspect-muted inspect-muted--tight">${Z(e.body)}</p></div>`}if(!e.ga?.hasResolvableEdges){let e=wl(r,i??El(J?.graphEdges,J?.roomsData,n?.edgesUnresolved?.length??null));return`<div class="inspect-card inspect-card--hint" role="status"><strong>${Z(e.title)}</strong><p class="inspect-muted inspect-muted--tight">${Z(e.body)}</p></div>`}return``}function dd(e){let t=!!J&&!J.error;if(!hl({viewIsGraph:K.view===`graph`,palaceDataOk:t}))return``;let n=pl().map(e=>`<li>${Z(e)}</li>`).join(``),r=gl({viewIsGraph:K.view===`graph`,hasResolvableGraph:!!e.ga?.hasResolvableEdges}),i=r?ml().map(e=>`<li>${Z(e)}</li>`).join(``):``;return`
    <details class="graph-guidance-details inspect-card inspect-card--hint">
      <summary class="graph-guidance-details__summary">How connections work</summary>
      <ul class="graph-guidance-list inspect-muted inspect-muted--tight">${n}</ul>
    </details>
    ${r?`<details class="graph-guidance-details inspect-card inspect-card--hint">
      <summary class="graph-guidance-details__summary">Tunnels &amp; refresh</summary>
      <ul class="graph-guidance-list inspect-muted inspect-muted--tight">${i}</ul>
    </details>`:``}`}function fd(){return!!(K.pinned&&K.selected)}function pd(){return{view:`graph`,selected:K.selected,pinned:K.pinned,currentWing:K.currentWing,currentRoom:K.currentRoom}}function md(){if(K.view!==`graph`||!K.selected||K.selected.type===`center`)return``;let e=K.selected.id,t=q?.getGraphNeighbors?.(e)?.length??0,n=t>0,r=Y.result,i=r?.ok&&r.pathSceneIds?.length,a=i?r.pathSceneIds.length:0,o=i?`Hop ${bu(Y.stepIndex,a)+1} / ${a}`:``,s=K.view===`graph`&&Y.startSceneId,c=s?`<div class="graph-route-mode" role="group" aria-label="Route mode">${Zl.map(e=>{let t=ad===e,n=$l[e];return`<button type="button" class="route-mode-chip ${t?`is-on`:``}" data-route-mode="${Z(e)}" title="${Z(n.hint)}">${Z(n.shortLabel)}</button>`}).join(``)}</div>`:``,l=i&&r.comparisonNote?`<div class="graph-route-strip__compare">${Z(r.comparisonNote)}</div>`:``;return`${i?`<div class="graph-route-strip" role="group" aria-label="Route along highlighted path">
    ${c}
    ${l}
    <span class="graph-route-strip__meta">${Z(o)} · ${r.hops} edge${r.hops===1?``:`s`} · ${Z($l[ad]?.shortLabel||ad)}</span>
    <span class="graph-route-strip__nav">
      <button type="button" class="btn btn--ghost btn--sm" data-graph-action="route-start" title="Jump to route start">Start</button>
      <button type="button" class="btn btn--ghost btn--sm" data-graph-action="route-prev" ${a>1?``:`disabled`} title="Previous hop ([ when route active)">◀</button>
      <button type="button" class="btn btn--ghost btn--sm" data-graph-action="route-next" ${a>1?``:`disabled`} title="Next hop (] when route active)">▶</button>
      <button type="button" class="btn btn--ghost btn--sm" data-graph-action="route-end" title="Jump to route end">End</button>
      <button type="button" class="btn btn--ghost btn--sm" data-graph-action="route-clear" title="Clear route highlight">Clear route</button>
    </span>
  </div>`:s?`<div class="graph-route-strip graph-route-strip--mode-only" role="group" aria-label="Route mode">${c}<span class="graph-route-strip__hint">Applies when you route to a target.</span></div>`:``}<div class="graph-explore-strip" role="group" aria-label="Graph exploration">
    <button type="button" class="btn btn--ghost btn--sm" data-graph-action="frame-nbr" title="Re-frame camera on selection and its neighbors">Frame neighborhood</button>
    <span class="graph-explore-strip__nav">
      <button type="button" class="btn btn--ghost btn--sm" data-graph-action="prev" ${n&&!i?``:`disabled`} title="Previous connected room ([)">◀</button>
      <button type="button" class="btn btn--ghost btn--sm" data-graph-action="next" ${n&&!i?``:`disabled`} title="Next connected room (])">▶</button>
    </span>
    <button type="button" class="btn btn--ghost btn--sm" data-graph-action="back" title="Prior graph focus (U)">Back</button>
    <span class="graph-explore-strip__meta" aria-hidden="true">${t} link${t===1?``:`s`}</span>
  </div>`}function hd(){K.view!==`graph`||!K.selected?.id||q?.centerOnNodeId(K.selected.id)}function gd(e){if(K.view!==`graph`||!K.selected?.id||!q?.getGraphNeighbors)return;let t=K.selected.id,n=Jl(q.getGraphNeighbors(t),t,e);if(!n){ld(fl());return}if(n===t)return;let r=Yl(n);if(!r||!J||!g(J.roomsData,r.wing,r.room))return;Kl($u,pd());let a=(J.roomsData[r.wing]||[]).find(e=>e.name===r.room);K.currentWing=r.wing,K.currentRoom=r.room,K.selected={id:n,type:`room`,name:r.room,wing:r.wing,wingId:r.wing,roomId:a?.roomId||i(r.wing,r.room),drawers:a?.drawers},K.pinned=!0,Yd(),q?.centerOnNodeId(n),wf(),Gd()}function _d(){let e=ql($u);if(!e||e.view!==`graph`||!e.selected?.id){ld(`No prior focus in history.`);return}K.selected=e.selected,K.pinned=e.pinned,K.currentWing=e.currentWing,K.currentRoom=e.currentRoom,Yd(),q?.centerOnNodeId(e.selected.id),wf(),Gd()}function vd(){Y={startSceneId:null,targetSceneId:null,result:null,stepIndex:0},Yd(),wf(),Gd()}function yd(e){let t=eu(e);if(t!==ad){if(ad=t,sd(t),Y.startSceneId&&Y.targetSceneId){let e=Y.stepIndex;xd();let t=Y.result;t?.ok&&t.pathSceneIds?.length?(Y.stepIndex=bu(e,t.pathSceneIds.length),Sd(),q?.centerOnNodeId(K.selected?.id)):Y.stepIndex=0,t&&!t.ok&&ld(t.message||`No route for this mode.`)}Yd(),wf()}}function bd(){let e=Y.result;if(e&&e.ok&&Array.isArray(e.pathSceneIds)&&e.pathSceneIds.length){let t=e.pathSceneIds.length,n=bu(Y.stepIndex,t),r=(e.bridges||[]).map(e=>du(e)).filter(Boolean);return{active:!0,pathSceneIds:e.pathSceneIds,stepIndex:n,segmentTypes:e.segmentTypes||[],bridgeSceneIds:r}}return{active:!1,pathSceneIds:[],stepIndex:0,segmentTypes:[],bridgeSceneIds:[]}}function xd(){if(!J||K.view!==`graph`){Y.result=null;return}let e=Y.startSceneId,t=Y.targetSceneId;if(!e||!t||!e.startsWith(`room:`)||!t.startsWith(`room:`)){Y.result=null;return}let n=fu(e),r=fu(t);if(!n||!r){Y.result={ok:!1,reason:`bad_scene`,message:`Could not resolve route endpoints.`};return}let i=Oc(f(J.graph));Y.result=vu({graphEdges:f(J.graph),roomsData:J.roomsData||{},enabledRelTypes:Ku,availableRelTypes:i,startRoomId:n,endRoomId:r,routeMode:ad}),Y.result.ok&&Y.result.pathSceneIds?.length?Y.stepIndex=bu(Y.stepIndex,Y.result.pathSceneIds.length):Y.stepIndex=0}function Sd(){let e=Y.result;if(!e?.ok||!e.pathSceneIds?.length)return;let t=bu(Y.stepIndex,e.pathSceneIds.length),n=e.pathSceneIds[t],r=Yl(n);if(!r||!J)return;let a=(J.roomsData[r.wing]||[]).find(e=>e.name===r.room);K.currentWing=r.wing,K.currentRoom=r.room,K.selected={id:n,type:`room`,name:r.room,wing:r.wing,wingId:r.wing,roomId:a?.roomId||i(r.wing,r.room),drawers:a?.drawers},K.pinned=!0}function Cd(){if(K.view!==`graph`||K.selected?.type!==`room`||!K.selected?.id){ld(`Select a room in Graph view first.`);return}Y.startSceneId=K.selected.id,Y.targetSceneId?xd():Y.result=null,Yd(),wf(),Gd(),ld(`Route start set — pick a target room or use search “Route”.`)}function wd(e){if(K.view!==`graph`&&jf(`graph`),!e||!e.startsWith(`room:`)){ld(`Route target must be a room.`);return}if(!Y.startSceneId){ld(`Set a route start first (inspector: “Set as route start”).`);return}Y.targetSceneId=e,xd();let t=Y.result;t&&!t.ok?ld(t.message||`No route found.`):t?.ok&&(Y.stepIndex=0,Sd(),q?.centerOnNodeId(K.selected?.id),ld(`Route · ${t.hops} hop${t.hops===1?``:`s`} · ${$l[ad]?.shortLabel||ad}`)),Yd(),wf(),Gd()}function Td(e){let t=Y.result;if(!t?.ok||!t.pathSceneIds?.length)return;let n=t.pathSceneIds.length;Y.stepIndex=yu(Y.stepIndex,e,n),Sd(),Yd(),q?.centerOnNodeId(K.selected?.id),wf(),Gd()}function Ed(e){let t=Y.result;if(!t?.ok||!t.pathSceneIds?.length)return;let n=t.pathSceneIds.length;Y.stepIndex=e===`end`?n-1:0,Sd(),Yd(),q?.centerOnNodeId(K.selected?.id),wf(),Gd()}function Z(e){return String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}function Dd(e){if(!e?.ok)return``;let t=Lc(e.typeCounts)||`—`,n=e.bridges||[],r=n.length>0?`Bridge rooms (cross-wing connectors): ${n.map(e=>e.split(`/`).pop()).join(`, `)}.`:`No interior cross-wing bridge hops — path is short or stays within-wing.`,i=$l[e.routeMode]?.label||e.routeMode,a=e.routeMode!==`shortest`&&e.totalCost!=null?` · weighted cost ${e.totalCost}`:``,o=e.mixSummary?`${e.mixSummary} `:``,s=e.comparisonNote?` ${e.comparisonNote}`:``;return`${yl()} Mode: ${i}${a}. ${e.hops} hop(s) on visible edges. ${o}Types: ${t}. ${r}${s}`}function Q(e){return e==null||Number.isNaN(Number(e))?`—`:Number(e).toLocaleString()}function Od(e){if(!e||typeof e!=`object`)return null;let t=[];for(let[n,r]of Object.entries(e))n!==`error`&&(typeof r==`number`?t.push(`${n}: ${Q(r)}`):typeof r==`string`&&t.push(`${n}: ${r}`));return t.length?t.slice(0,8).join(` · `):null}function kd(){let e=J?.status,t=J?.wingsData||{},n=J?.roomsData||{},r=J?.graphStats,i=J?.graph,a=i?.edgesResolved?.length?i.edgesResolved:r?.edgesResolved||[],o=d(i),s=f(i),c=J?.kgStats,l=J?.overviewStats??J?.overviewBundle?.stats,u=J?.graphMeta??J?.graph?.graphMeta??r?.graphMeta??J?.overviewBundle?.graphMeta,p=typeof e?.total_drawers==`number`?e.total_drawers:typeof l?.totalDrawers==`number`?l.totalDrawers:Rl(t),m=typeof l?.totalWings==`number`?l.totalWings:Object.keys(t).length,h=typeof l?.totalRooms==`number`?l.totalRooms:Il(n),g=0,_=i?.summary??r?.summary;_?.resolvedEdgeCount==null?r?.tunnels&&typeof r.tunnels==`object`&&(g=Object.keys(r.tunnels).length):g=_.resolvedEdgeCount;let v=typeof _?.resolvedEdgeCount==`number`?_.resolvedEdgeCount:a.length,y=kl(n,{edgesResolved:a,graphEdges:f(i),graphSummary:_??null,overviewStats:l??null}),b=kl(n,{edgesResolved:o,graphEdges:s,graphSummary:null,overviewStats:null}),x=K.view===`graph`?b:y,S=Od(c),C=!!(c&&typeof c==`object`&&!c.error),w=Oc(s),T=Pc(o,Ku),E=jc(Ku,w)!==null;return{status:e,wingsData:t,roomsData:n,graphEdges:s,graphStats:r,edgesResolved:o,edgesExplicit:a,kgStats:c,totalDrawers:p,wingCount:m,roomCount:h,tunnelNodeCount:g,graphEdgeCount:v,ga:x,gaPalace:y,gaGraph:b,kgAvailable:C,kgSummary:S,focusWing:K.currentWing,overviewStats:l,graphMeta:u,summary:_,availableRelationshipTypes:w,visibleGraphSummary:T,graphFilterNarrowed:E}}function Ad(){try{let e=localStorage.getItem(wc);return e?JSON.parse(e):null}catch{return null}}function jd(e){try{localStorage.setItem(wc,JSON.stringify({enabledTypes:[...e||[]]}))}catch{}}function Md(){let e=Oc(f(J?.graph)),t=Ad();Ku=Ac(t==null?void 0:Fc(t),e),jd(Ku),q?.setRelationshipFilters(jc(Ku,e))}function Nd(e){let t=Oc(f(J?.graph));if(!(!e||!t.includes(e))){if(Ku.has(e)?Ku.delete(e):Ku.add(e),jd(Ku),q?.setRelationshipFilters(jc(Ku,t)),Y.startSceneId&&Y.targetSceneId){xd();let e=Y.result;e&&!e.ok&&ld(e.message||`No route on current visible edges — adjust filters or clear route.`)}wf(),af(),Pd(),Yd()}}function Pd(){let e=X(`graph-view-extras`);if(!e)return;let t=K.view===`graph`&&!!J&&!J.error;if(e.hidden=!t,!t)return;let n=kd(),r=n.availableRelationshipTypes||[],i=X(`graph-rel-chips`);i&&(r.length?i.innerHTML=r.map(e=>{let t=Ec(e),n=Ku.has(e),r=e===`tunnel`?`#5b8cff`:`#a78bfa`;return`<button type="button" class="rel-chip ${n?`is-on`:``}" data-rel-type="${Z(e)}" title="${Z(t.description)}">
          <span class="rel-chip__swatch" style="background:${r}"></span>
          <span>${Z(t.shortLabel)}</span>
        </button>`}).join(``):i.innerHTML=`<span class="inspect-muted">No relationship-typed edges in the current graph payload.</span>`);let a=X(`graph-status-pill`);if(a){let e=n.graphFilterNarrowed,t=n.visibleGraphSummary,r=Ic(n.graphMeta,n.summary);a.innerHTML=`<span class="graph-status-pill__primary">${Z(xl({resolvedFormatted:Q(n.graphEdgeCount),resolvedCount:n.graphEdgeCount,visibleFormatted:Q(t.visibleEdgeCount),visibleCount:t.visibleEdgeCount,graphFilterNarrowed:e}))}</span>${r?`<span class="graph-status-pill__hint">${Z(r.length>240?`${r.slice(0,240)}…`:r)}</span>`:``}`}let o=X(`graph-legend-compact`);o&&(o.innerHTML=r.length?r.map(e=>{let t=Ec(e);return`<div class="graph-legend-compact__row"><span class="legend-swatch" style="background:${e===`tunnel`?`#5b8cff`:`#a78bfa`}"></span><span><strong>${Z(t.shortLabel)}</strong> — ${Z(t.description)}</span></div>`}).join(``):``)}function Fd(e,t,n){let r=t&&String(t).trim()?t:`<p class="inspect-empty">${Z(n||`No data.`)}</p>`;return`
    <section class="inspect-section">
      <h3 class="inspect-section__title">${Z(e)}</h3>
      <div class="inspect-section__body">${r}</div>
    </section>`}function Id(e){return e==null||Number.isNaN(Number(e))?``:`<div class="inspect-bar" aria-hidden="true"><div class="inspect-bar__fill" style="width:${Math.min(100,Math.max(0,Number(e)))}%"></div></div>`}function Ld(e,t,n){return`<button type="button" class="inspect-row inspect-row--action"${Object.entries(n||{}).map(([e,t])=>` data-${e}="${Z(String(t))}"`).join(``)}>
    <span class="inspect-row__main">${Z(e)}</span>
    <span class="inspect-row__meta">${Z(t)}</span>
  </button>`}function Rd(e){let t=Gl(e,K.view),n=t.ga.byRelationshipType&&Object.keys(t.ga.byRelationshipType).length?Object.entries(t.ga.byRelationshipType).map(([e,t])=>`${e}: ${Q(t)}`).join(` · `):``,r=e.graphMeta?.truncatedSources?.length?e.graphMeta.truncatedSources.map(e=>{let t=e.totalMatching!=null&&e.totalMatching!==``?Q(e.totalMatching):`unknown`,n=e.inferred?` (heuristic)`:``;return`${e.source} limit ${Q(e.limit)} · ${t} rows reported${n}`}).join(`; `):``,i=(e.graphMeta?.completenessNotes||[]).filter(Boolean).join(` `),a=t.kgAvailable?t.kgSummary||`—`:Sl(),o=t.largestWingsByDrawers.map(e=>Ld(e.wing,`${Q(e.drawers)} drawers · #${e.rank}`,{"inspect-action":`go-wing`,wing:e.wing})).join(``),s=t.mostConnectedRooms.length?t.mostConnectedRooms.map(e=>Ld(`${e.room}`,`${e.wing} · degree ${e.degree}`,{"inspect-action":`select-room`,wing:e.wing,room:e.room})).join(``):``,c=t.mostCrossLinkedWings.length?t.mostCrossLinkedWings.map(e=>Ld(e.wing,`${Q(e.crossEdges)} cross-wing edges`,{"inspect-action":`go-wing`,wing:e.wing})).join(``):``,l=[`Palace scale: ${Q(t.totalDrawers)} drawers across ${Q(t.wingCount)} wings and ${Q(t.roomCount)} rooms.`,t.tunnelNodeCount?`Graph summary: ${Q(t.graphEdgeCount)} resolved undirected edges (all relationship types).`:`No graph edges in graph-stats.`,t.graphBlurb].filter(Boolean).join(` `),u=K.view===`graph`&&e.ga?.hasResolvableEdges&&e.graphFilterNarrowed?`<div class="inspect-card inspect-card--hint" role="status"><strong>Graph filters active</strong><p class="inspect-muted inspect-muted--tight">Visible: ${Q(e.visibleGraphSummary.visibleEdgeCount)} edges (${Lc(e.visibleGraphSummary.visibleByType)||`—`}). Inspector “visible” rows match the scene. Footer and resolved totals above remain global.</p></div>`:``;return`
    <div class="inspect-stack">
      <div class="inspect-card inspect-card--hero">
        <span class="badge">Overview</span>
        <p class="inspect-lead">${Z(t.viewHint)}</p>
        <p class="inspect-muted">${Z(l)}</p>
      </div>
      ${dd(e)}
      ${u}
      ${Fd(`Palace summary`,`
        <div class="meta-block">
          ${$(`Total drawers`,Q(t.totalDrawers))}
          ${$(`Wings`,Q(t.wingCount))}
          ${$(`Rooms (taxonomy)`,Q(t.roomCount))}
          ${$(`Resolved graph edges`,Q(t.graphEdgeCount))}
          ${$(`Edge types`,n||`—`)}
          ${$(`Cross-wing (tunnels)`,t.ga.hasResolvableEdges?Q(t.crossWingEdges):`—`)}
          ${$(`Rooms with no graph links`,t.ga.hasResolvableEdges?Q(t.roomsWithNoTunnels):`—`)}
          ${$(`Upstream truncation`,r||`none`)}
        </div>
        ${i?`<p class="inspect-muted inspect-muted--tight">${Z(i)}</p>`:``}
        <p class="inspect-muted inspect-muted--tight">${Z(a)}</p>
        `)}
      ${Fd(`Largest wings`,`<div class="inspect-rows">${o||`<p class="inspect-empty">No wing counts available.</p>`}</div>`)}
      ${Fd(`Most connected rooms`,s||`<p class="inspect-empty">No resolvable tunnel edges, or graph endpoints do not match room names.</p>`)}
      ${Fd(`Most cross-linked wings`,c||`<p class="inspect-empty">No cross-wing tunnel edges resolved.</p>`)}
      <div class="inspect-card inspect-card--hint">
        <strong>How to explore</strong>
        <p class="inspect-muted inspect-muted--tight">Use <kbd>1</kbd>–<kbd>3</kbd> to switch views. Click wings and rooms to drill in; Pin keeps the inspector fixed. Search dims non-matching nodes.</p>
      </div>
    </div>`}function zd(e,t,n){let{wingsData:r,roomsData:a,totalDrawers:o,ga:s,graphEdges:c}=e,l=Number(r[t])||0,u=a[t]||[],d=u.length,f=zl(r),p=f.find(e=>e.wing===t),m=Bl(a),h=m.find(e=>e.wing===t),g=Ul(l,o),_=Ul(d,Il(a)),v=Ll(a,t),y=d?((v>0?v:l)/d).toFixed(1):null,b=Vl(a,t),x=b[0],S=b.length>1?b[b.length-1]:null,C=[g!=null&&p?`This wing holds ${g}% of all drawers and is the ${Hl(p.rank)} largest wing by drawer count.`:null,_!=null&&h&&d?`It ranks ${Hl(h.rank)} among wings by room count (${_}% of all rooms).`:null].filter(Boolean).join(` `),w=Pl(t,c,a,e.edgesExplicit),T=e.edgesResolved||[],E=Mc(T,Ku),D=Nl(t,T),O=Nl(t,E),k=(()=>{if(!e.graphFilterNarrowed||!s.hasResolvableEdges)return``;let t=D.byType.tunnel||0,n=O.byType.tunnel||0;return n>0&&t>0&&n<t*.5?`With current filters, some cross-wing tunnel links in this wing are hidden.`:O.crossWingTouches===0&&w.crossWingTouches>0?`Cross-wing tunnel links are hidden by filters.`:``})(),ee=w.crossWingTouches>0?`
      ${$(`Cross-wing tunnel touches`,Q(w.crossWingTouches))}
      <div class="inspect-rows">
        ${w.topExternalWings.map(e=>Ld(e.wing,`${Q(e.edges)} edges`,{"inspect-action":`go-wing`,wing:e.wing})).join(``)}
      </div>`:``,te=w.topRoomsByCrossWing.map(e=>Ld(e.room,`cross-wing ${Q(e.crossEdges)}`,{"inspect-action":`select-room`,wing:e.wing,room:e.room})).join(``),A=b.slice(0,5).map(e=>Ld(e.name,`${Q(e.drawers)} drawers`,{"inspect-action":`select-room`,wing:t,room:e.name})),ne=[...u].map(e=>{let n=e.roomId||i(t,e.name),r=s.degreeByKey.get(n)??0;return{...e,deg:r}}).sort((e,t)=>t.deg-e.deg).slice(0,5),j=ne.length?ne.map(e=>Ld(e.name,`degree ${e.deg}`,{"inspect-action":`select-room`,wing:t,room:e.name})).join(``):``,M=d===0?`<p class="inspect-empty">This wing has no room-level drawer breakdown in taxonomy.</p>`:`
      ${$(`Rooms listed`,Q(d))}
      ${$(`Drawers (wing total)`,Q(l))}
      ${y==null?``:$(`Avg drawers / room`,y)}
      ${x?$(`Largest room`,`${x.name} (${Q(x.drawers)})`):``}
      ${S&&S.name!==x?.name?$(`Smallest room`,`${S.name} (${Q(S.drawers)})`):``}
    `;return`
    <div class="inspect-stack">
      ${K.view===`graph`?`<p class="inspect-muted inspect-muted--tight">Graph view: node positions are layout-only; drawer ranks use taxonomy and wings API.</p>`:``}
      <div class="inspect-card inspect-card--hero">
        <span class="badge">Wing</span>
        <div class="inspect-title">${Z(t)}</div>
        <p class="inspect-lead">${Z(C||`Wing footprint in the palace.`)}</p>
        ${g==null?``:`<div class="inspect-pct"><span>${g}% of palace drawers</span>${Id(g)}</div>`}
      </div>
      ${Fd(`Summary`,`
        <div class="meta-block">
          ${$(`Drawer count`,Q(l))}
          ${$(`Rank by drawers`,p?`${Hl(p.rank)} of ${f.length}`:`—`)}
          ${$(`Rooms`,Q(d))}
          ${$(`Rank by room count`,h?`${Hl(h.rank)} of ${m.length}`:`—`)}
        </div>`)}
      ${Fd(`Structure`,`<div class="meta-block">${M}</div>`)}
      ${Fd(`Connections`,s.hasResolvableEdges?`<div class="meta-block">
          ${$(`Edge types (global)`,Lc(D.byType)||`—`)}
          ${e.graphFilterNarrowed?$(`Edge types (visible)`,Lc(O.byType)||`—`):``}
          ${e.graphFilterNarrowed?$(`Cross-wing touches (visible)`,Q(O.crossWingTouches)):``}
        </div>
        ${k?`<p class="inspect-muted inspect-muted--tight">${Z(k)}</p>`:``}
        ${ee||`<p class="inspect-empty">No cross-wing tunnel relationships touch this wing.</p>`}
             ${te?`<p class="inspect-micro">Rooms with cross-wing links (global)</p><div class="inspect-rows">${te}</div>`:``}`:`<p class="inspect-empty">No tunnel relationships could be resolved against taxonomy rooms.</p>`)}
      ${Fd(`Related rooms`,`<p class="inspect-micro">Largest by drawers</p><div class="inspect-rows">${A.join(``)}</div>
         ${j?`<p class="inspect-micro">Most connected (tunnels)</p><div class="inspect-rows">${j}</div>`:`<p class="inspect-empty">No graph degree for rooms in this wing.</p>`}`)}
      ${Fd(`Health / graph insight`,`<p class="inspect-muted">${Z(s.topCrossLinkedWings[0]?.wing===t?`This wing is among the most cross-linked in the tunnel graph.`:w.crossWingTouches>0?`Participates in cross-wing tunnels; see Connections for peers.`:d>0?`No cross-wing tunnel edges touch this wing in the current graph.`:`Add taxonomy rooms to compare structure.`)}</p>`)}
    </div>`}function Bd(e,t,n,r){let{wingsData:a,roomsData:o,totalDrawers:s,ga:c}=e,l=o[t]||[],u=l.find(e=>e.name===n),d=u?Number(u.drawers)||0:null,f=Number(a[t])||0,p=Ll(o,t),m=p>0?p:f,h=Vl(o,t),g=h.find(e=>e.name===n),_=d!=null&&m>0?Ul(d,m):null,v=d!=null&&s>0?Ul(d,s):null,y=[g&&_!=null?`This room is the ${Hl(g.rank)} largest in “${t}” by drawers and holds about ${_}% of that wing’s drawers (by room list).`:null,v==null?null:`It is ${v}% of the entire palace by drawers.`].filter(Boolean).join(` `),b=i(t,n),x=jl(b,c),S=c.hasResolvableEdges,C=e.edgesResolved||[],w=Mc(C,Ku),T=Ml(b,C),E=Ml(b,w),D=Rc(E.byType,T.byType),O=Wl({drawers:d??0,wingRoomSum:m,palaceTotal:s},x,S),k=m>0&&l.length?m/l.length:null,ee=d!=null&&k!=null?d>=k*1.1?`Above wing average size`:d<=k*.9?`Below wing average size`:`Near wing average size`:`—`,te=(x?.relatedRooms||[]).filter(e=>!(e.wing===t&&e.room===n)).slice(0,6),A=te.length?te.map(e=>Ld(`${e.room}`,`${e.wing} · deg ${e.degree}`,{"inspect-action":`select-room`,wing:e.wing,room:e.room})).join(``):``,ne=(x?.relatedWings||[]).filter(e=>e.wing!==t).slice(0,6).map(e=>Ld(e.wing,`${Q(e.links)} tunnel link${e.links===1?``:`s`}`,{"inspect-action":`go-wing`,wing:e.wing})).join(``),j=x&&x.isBridge?`Acts as a bridge: at least one cross-wing tunnel edge is incident to this room.`:`No bridge pattern detected (no cross-wing edges on this room).`,M=K.view===`graph`?`<p class="inspect-muted inspect-muted--tight">Graph view: layout is force-directed; tunnel metrics match the same resolved edges as Rooms/Wings.</p>`:``,re=`room:${t}:${n}`,ie=Y.startSceneId?Yl(Y.startSceneId):null,ae=ie?`${ie.room} · ${ie.wing}`:`—`,oe=S&&Y.startSceneId&&Y.startSceneId!==re;return`
    <div class="inspect-stack">
      ${M}
      ${K.view===`graph`&&S?Fd(`Route`,`<div class="meta-block">
            ${$(`Route start`,Z(ae))}
            ${$(`Route target`,Y.targetSceneId?Z((()=>{let e=Yl(Y.targetSceneId);return e?`${e.room} · ${e.wing}`:Y.targetSceneId})()):`—`)}
          </div>
          <div class="btn-row" style="margin-top:8px;flex-wrap:wrap;gap:6px">
            <button type="button" class="btn btn--ghost btn--sm" data-route-action="set-start">Set as route start</button>
            <button type="button" class="btn btn--ghost btn--sm" data-route-action="route-here" data-wing="${Z(t)}" data-room="${Z(n)}" ${oe?``:`disabled`} title="Compute route along visible edges (current mode)">Route to here</button>
            <button type="button" class="btn btn--ghost btn--sm" data-route-action="clear-route" ${Y.startSceneId||Y.targetSceneId?``:`disabled`}>Clear route</button>
          </div>
          ${Y.result?.ok?`<p class="inspect-muted inspect-muted--tight" role="status">${Z(Dd(Y.result))}</p>`:``}
          ${Y.result&&!Y.result.ok?`<div class="route-fail-guidance" role="status">
            <p class="inspect-muted inspect-muted--tight">${Z(Y.result.message||``)}</p>
            ${dl(String(Y.result.reason||``),{graphFilterNarrowed:Y.result.graphFilterNarrowed??e.graphFilterNarrowed}).map(e=>`<p class="inspect-muted inspect-muted--tight inspect-guidance-line">${Z(e)}</p>`).join(``)}
          </div>`:``}`):``}
      <div class="inspect-card inspect-card--hero">
        <span class="badge">Room</span>
        <div class="inspect-title">${Z(n)}</div>
        <p class="inspect-lead">${Z(y||`Room in the palace taxonomy.`)}</p>
        ${_==null?``:`<div class="inspect-pct"><span>${_}% of wing drawers (room list)</span>${Id(_)}</div>`}
      </div>
      ${Fd(`Summary`,`
        <div class="meta-block">
          ${$(`Parent wing`,Z(t))}
          ${$(`Drawers`,d==null?`—`:Q(d))}
          ${$(`Share of palace`,v==null?`—`:`${v}%`)}
        </div>`)}
      ${Fd(`Position in wing`,l.length?`
        <div class="meta-block">
          ${$(`Rank in wing (by drawers)`,g?`${Hl(g.rank)} of ${h.length}`:`—`)}
          ${$(`Wing avg drawers / room`,k==null?`—`:k.toFixed(1))}
          ${$(`vs average`,ee)}
        </div>`:`<p class="inspect-empty">This wing has no room-level drawer breakdown.</p>`)}
      ${Fd(`Connections`,S&&x?`
        <div class="meta-block">
          ${$(e.graphFilterNarrowed?`Degree (visible)`:`Degree (global)`,Q(E.degree))}
          ${e.graphFilterNarrowed?$(`Degree (global)`,Q(T.degree)):``}
          ${$(e.graphFilterNarrowed?`Cross-wing (visible)`:`Cross-wing links`,Q(E.crossWingLinks))}
          ${e.graphFilterNarrowed?$(`Cross-wing (global)`,Q(T.crossWingLinks)):``}
          ${$(e.graphFilterNarrowed?`Intra-wing (visible)`:`Intra-wing links`,Q(E.intraWingLinks))}
          ${e.graphFilterNarrowed?$(`Intra-wing (global)`,Q(T.intraWingLinks)):``}
          ${$(`Relationship mix (global)`,Lc(T.byType)||`—`)}
          ${e.graphFilterNarrowed?$(`Relationship mix (visible)`,Lc(E.byType)||`—`):``}
          ${$(`Median degree (all rooms)`,x.medianDegree==null?`—`:Q(x.medianDegree))}
        </div>
        ${D?`<p class="inspect-muted inspect-muted--tight">${Z(D)}</p>`:``}
        <p class="inspect-muted inspect-muted--tight">${Z(j)}</p>
        ${A?`<p class="inspect-micro">Related rooms (global graph)</p><div class="inspect-rows">${A}</div>`:`<p class="inspect-empty">No tunnel neighbors found for this room.</p>${S?`<p class="inspect-muted inspect-muted--tight">${Z(vl())}</p>`:``}`}
        ${ne?`<p class="inspect-micro">Related wings (global graph)</p><div class="inspect-rows">${ne}</div>`:``}
        `:`<p class="inspect-empty">${Z(Cl())}</p>`)}
      ${Fd(`Insight`,`<p class="insight-chip">${Z(O.label)}</p><p class="inspect-muted inspect-muted--tight">${Z(O.detail)}</p>`)}
    </div>`}function Vd(e){let t=e.target.closest(`[data-route-mode]`);if(t){let e=t.getAttribute(`data-route-mode`);e&&yd(e);return}let n=e.target.closest(`[data-route-action]`);if(n){let e=n.getAttribute(`data-route-action`);if(e===`set-start`)Cd();else if(e===`route-here`){let e=n.getAttribute(`data-wing`),t=n.getAttribute(`data-room`);e&&t&&wd(`room:${e}:${t}`)}else e===`clear-route`&&vd();return}let r=e.target.closest(`[data-graph-action]`);if(r){let e=r.getAttribute(`data-graph-action`);e===`frame-nbr`?hd():e===`next`?gd(1):e===`prev`?gd(-1):e===`back`?_d():e===`route-start`?Ed(`start`):e===`route-end`?Ed(`end`):e===`route-prev`?Td(-1):e===`route-next`?Td(1):e===`route-clear`&&vd();return}let i=e.target.closest(`[data-inspect-action]`);if(!i)return;let a=i.getAttribute(`data-inspect-action`),o=i.getAttribute(`data-wing`),s=i.getAttribute(`data-room`);if(a===`go-wing`&&o){xf(o);return}a===`select-room`&&o&&s&&Hd(o,s)}function Hd(e,t){if(Af(),!J||!h(J.wingsData,e)||!g(J.roomsData,e,t))return;let n=J.roomsData[e],r=Array.isArray(n)?n.find(e=>e.name===t):null,a=`room:${e}:${t}`;if(K.view===`graph`){K.selected?.id&&K.selected.id!==a&&Kl($u,pd()),K.currentWing=e,K.currentRoom=t,K.selected={id:a,type:`room`,name:t,wing:e,wingId:e,roomId:r?.roomId||i(e,t),drawers:r?.drawers},K.pinned=!0,Yd(),q?.centerOnNodeId(a),af(),wf(),Gd();return}K.currentWing=e,K.currentRoom=t,K.selected={id:a,type:`room`,name:t,wing:e,wingId:e,roomId:r?.roomId||i(e,t),drawers:r?.drawers},K.pinned=!1,K.view=`rooms`,q?.setView(`rooms`,e),Yd(),q?.centerOnNodeId(a),Df(),X(`view-helper-text`).textContent=qu.find(e=>e.id===`rooms`)?.hint||``,$d(),Pd(),af(),wf(),Gd()}function Ud(e){if(!e||e.type===`center`||!e.id)return null;let t=e.wingId??e.wing,n=e.roomId??(e.type===`room`&&t&&e.name!=null?i(t,e.name):null);return{id:e.id,type:e.type,name:e.name,wing:t,wingId:t,roomId:n,drawers:e.drawers}}function Wd(){try{let e=localStorage.getItem(Uu);return e?JSON.parse(e):null}catch{return null}}function Gd(){clearTimeout(Xu),Xu=setTimeout(()=>{try{let e={view:K.view,currentWing:K.currentWing,currentRoom:K.currentRoom,selected:K.selected,pinned:K.pinned,searchQuery:K.searchQuery,labels:X(`toggle-labels`)?.checked??!0,rotate:X(`toggle-rotate`)?.checked??!0,motion:Number(X(`motion-range`)?.value??1)};localStorage.setItem(Uu,JSON.stringify(e))}catch{}},200)}function Kd(){J&&ju(K,J)}function qd(e){e&&(e.labels!==void 0&&X(`toggle-labels`)&&(X(`toggle-labels`).checked=!!e.labels),e.rotate!==void 0&&X(`toggle-rotate`)&&(X(`toggle-rotate`).checked=!!e.rotate),e.motion!==void 0&&X(`motion-range`)&&(X(`motion-range`).value=String(e.motion)),e.searchQuery!==void 0&&X(`search-wings`)&&(X(`search-wings`).value=e.searchQuery))}function Jd(e){if(e==null)return;let t=Au(e);K.view=t.view,K.currentWing=t.currentWing,K.currentRoom=t.currentRoom,K.selected=t.selected,K.pinned=t.pinned,K.searchQuery=t.searchQuery}function Yd(){q?.updatePresentation({searchQuery:K.searchQuery,selectedId:K.selected?.id??null,pinActive:K.pinned,route:bd()})}function Xd(e,t,n=``){let r=X(`conn-status`);if(!r)return;r.dataset.state=e,r.textContent=t;let i=X(`conn-detail`);i&&(i.textContent=n)}function Zd(e){if(!e)return``;let t=Date.parse(e);if(!Number.isFinite(t))return``;let n=Math.max(0,Math.round((Date.now()-t)/1e3));return n<5?`just now`:n<60?`${n}s ago`:n<3600?`${Math.floor(n/60)}m ago`:`${Math.floor(n/3600)}h ago`}function Qd(e){X(`app-main-grid`)?.setAttribute(`aria-busy`,String(!!e)),X(`inspect-body`)?.setAttribute(`aria-busy`,String(!!e))}function $d(){let e=X(`search-wings-label`),t=X(`search-wings`),n=X(`search-mode-hint`);if(!e||!t||!n)return;let r=K.view===`graph`;e.textContent=r?`Find graph nodes`:`Filter wings and rooms`,t.placeholder=r?`Find a room or wing in Graph…`:`Filter wings and rooms…`,n.innerHTML=r?`Graph view: <kbd>Enter</kbd> frames the active match · <kbd>Alt+N</kbd> / <kbd>Alt+P</kbd> steps through results.`:`Wings/Rooms view: filters the explorer and dims non-matching nodes.`}function ef(e,t,n){X(e)?.setAttribute(`aria-hidden`,String(!!n));let r=X(t);r&&(r.hidden=!!n,`inert`in r&&(r.inert=!!n))}function tf(e){Qd(e),X(`loading-overlay`)?.classList.toggle(`is-hidden`,!e)}function nf(e,t){tf(!0);let n=X(`loading-overlay`);n&&(n.innerHTML=`
    <div class="err-box">
      <strong>Unable to load data</strong>
      <p>${Z(e)}</p>
      ${t?`<code>${Z(t)}</code>`:``}
      <p style="margin-top:10px;color:#94a3b8;font-size:0.76rem;">Start the API bridge from the project folder:</p>
      <code style="margin-top:4px;">node server.js</code>
      <div class="btn-row">
        <button type="button" class="btn btn--ghost" id="err-retry">Retry</button>
      </div>
    </div>
  `,X(`err-retry`)?.addEventListener(`click`,()=>Hf(!1)))}function rf(e,t){let n=X(`metric-context`),r=X(`metric-context-wrap`);if(!(!n||!r)){if(!e||!t){r.hidden=!0,n.textContent=``;return}if(r.hidden=!1,e.type===`wing`){let r=zl(t.wingsData).find(t=>t.wing===e.name);n.textContent=r?`Selected wing · ${Hl(r.rank)} by drawers`:`Selected wing`;return}if(e.type===`room`){let r=Vl(t.roomsData,e.wing).find(t=>t.name===e.name);n.textContent=r?`Selected room · ${Hl(r.rank)} in ${e.wing}`:`Selected room`}}}function af(){J?.status;let e=J?.graphStats,t=J?.graph?.summary??e?.summary;J?.kgStats;let n=kd(),{wingsData:r,roomsData:i,totalDrawers:a,gaPalace:o,overviewStats:s}=n,c=o;X(`metric-drawers`).textContent=Q(a??0),X(`metric-wings`).textContent=Q(typeof s?.totalWings==`number`?s.totalWings:Object.keys(r).length),X(`metric-rooms`).textContent=Q(typeof s?.totalRooms==`number`?s.totalRooms:Il(i));let l=0;typeof t?.resolvedEdgeCount==`number`?l=t.resolvedEdgeCount:e?.tunnels&&typeof e.tunnels==`object`&&(l=Object.keys(e.tunnels).length),X(`metric-tunnels`).textContent=l?Q(l):`—`;let u=X(`metric-cross`);u&&(u.textContent=c.hasResolvableEdges?Q(c.crossWingEdgeCount):`—`);let d=X(`metric-footnote`);if(d){let e=c.topCrossLinkedWings[0],t=c.topConnectedRooms[0],r=``;r=c.hasResolvableEdges&&e&&t?`Most cross-linked wing: ${e.wing} · Most connected room: ${t.room} (${t.wing})`:c.hasResolvableEdges&&e?`Most cross-linked wing: ${e.wing}`:`Tunnel graph: resolve endpoints to see cross-wing stats.`,K.view===`graph`&&(r=`${bl()} · ${r}`),K.view===`graph`&&n.graphFilterNarrowed&&(r=`Visible ${Q(n.visibleGraphSummary.visibleEdgeCount)} edges · ${r}`),d.textContent=r}let f=X(`metric-refreshed`);f&&(f.textContent=Zd(J?.fetchedAt||Ju)||`—`),rf(K.selected,n)}function of(e,t){return t.trim()?e.toLowerCase().includes(t.trim().toLowerCase()):!0}function sf(){if(!J?.roomsData||!J?.wingsData){ed=[];return}ed=Ru(J.roomsData,J.wingsData)}function cf(){return Iu(K.searchQuery)}function lf(){let e=cf();e!==id&&(id=e,rd=!1,nd=0),td=Vu(ed,K.searchQuery),nd>=td.length&&(nd=Math.max(0,td.length-1)),uf()}function uf(){let e=X(`graph-search-panel`),t=X(`graph-search-meta`),n=X(`graph-search-list`),r=X(`graph-search-empty`),i=X(`graph-search-nav`);if(!e||!t||!n)return;if(!K.searchQuery.trim()){e.hidden=!0;return}e.hidden=!1;let a=td.length;if(i&&(i.hidden=!(a>1)),!a){r.hidden=!1,n.innerHTML=``,t.textContent=`No matches`;return}r.hidden=!0;let o=Math.min(nd,a-1),s=a>12?` · ${a} total`:``;t.textContent=`Result ${o+1} of ${a}${s}`;let c=0;a>12&&(c=Math.min(Math.max(0,o-5),Math.max(0,a-12))),n.innerHTML=td.slice(c,c+12).map((e,t)=>{let n=c+t,r=n===o,i=e.kind===`room`?`<button type="button" class="btn btn--ghost btn--sm graph-search-hit__route" data-graph-route-to="${n}" title="Use as route target (needs route start)">Route</button>`:``;return`<li class="graph-search-hit-row">
        <button type="button" class="graph-search-hit ${r?`is-active`:``}" data-graph-hit-ix="${n}" role="option" aria-selected="${r?`true`:`false`}">
          <span class="graph-search-hit__label">${Z(e.label)}</span>
          <span class="graph-search-hit__sub">${Z(e.sublabel)}</span>
        </button>
        ${i}
      </li>`}).join(``),a>12&&n.insertAdjacentHTML(`beforeend`,`<li class="graph-search-more"><span class="inspect-muted">Scroll list with ↑↓ · Alt+N / Alt+P for all ${a} matches</span></li>`)}function df(){let e=X(`graph-search-first-hint`);e&&(e.hidden=!(K.view===`graph`&&!sessionStorage.getItem(`mempalace-graph-search-hint`)&&J&&!J.error))}function ff(){sessionStorage.setItem(`mempalace-graph-search-hint`,`1`);let e=X(`graph-search-first-hint`);e&&(e.hidden=!0)}function pf(){K.searchQuery=``;let e=X(`search-wings`);e&&(e.value=``),td=[],nd=0,rd=!1,id=``,Yd(),_f(),uf(),Gd()}function mf(e){if(Af(),!J||!e)return;let t=!rd;if(e.startsWith(`wing:`)){let n=e.slice(5);if(!h(J.wingsData,n))return;K.view!==`graph`&&jf(`graph`),K.view===`graph`&&Xl(K.selected?.id,e,t)&&Kl($u,pd()),rd=!0,K.currentWing=n,K.currentRoom=null,K.selected={id:e,type:`wing`,name:n,wing:n,wingId:n,drawers:J.wingsData[n]},K.pinned=!0,Yd(),q?.centerOnNodeId(e),q?.pulseNodeEmphasis(e),af(),wf(),uf(),Gd(),ff();return}let n=Yl(e);if(!n||!g(J.roomsData,n.wing,n.room))return;let r=J.roomsData[n.wing],a=Array.isArray(r)?r.find(e=>e.name===n.room):null;K.view!==`graph`&&jf(`graph`),K.view===`graph`&&Xl(K.selected?.id,e,t)&&Kl($u,pd()),rd=!0,K.currentWing=n.wing,K.currentRoom=n.room,K.selected={id:e,type:`room`,name:n.room,wing:n.wing,wingId:n.wing,roomId:a?.roomId||i(n.wing,n.room),drawers:a?.drawers},K.pinned=!0,Yd(),q?.centerOnNodeId(e),q?.pulseNodeEmphasis(e),af(),wf(),uf(),Gd(),ff()}function hf(e){td.length<2||(nd=Hu(nd,td.length,e),mf(td[nd].sceneId))}function gf(){ff(),X(`search-wings`)?.focus()}function _f(){let e=X(`legend-host`);if(!e)return;let t=J?.status,n=t?.wings&&typeof t.wings==`object`?t.wings:J?.wingsData||{},r=Object.entries(n);if(!r.length){e.innerHTML=`<div class="empty-state" style="padding:8px;">No wing data yet.</div>`;return}e.innerHTML=r.map(([e,t])=>{let n=wu(e),r=of(`${e} ${t}`,K.searchQuery);return`
      <div class="legend-item" data-wing="${Z(e)}" style="${r?``:`display:none`}">
        <span class="legend-color" style="background:${n}"></span>
        <span>${Z(e)} · ${Q(t)} drawers</span>
      </div>`}).join(``)}function vf(e){let t=e.querySelector(`.breadcrumb-nav`);if(!t)return;let n=[...t.querySelectorAll(`.crumb`)];if(!n.length)return;n.forEach((e,t)=>{e.setAttribute(`aria-posinset`,String(t+1)),e.setAttribute(`aria-setsize`,String(n.length)),e.tabIndex=t===0?0:-1});let r=t._bcKey;r&&t.removeEventListener(`keydown`,r),t._bcKey=e=>{let t=n.indexOf(document.activeElement);if(!(t<0)){if(e.key===`ArrowRight`||e.key===`ArrowDown`){e.preventDefault();let r=(t+1)%n.length;n.forEach((e,t)=>{e.tabIndex=t===r?0:-1}),n[r].focus()}else if(e.key===`ArrowLeft`||e.key===`ArrowUp`){e.preventDefault();let r=(t-1+n.length)%n.length;n.forEach((e,t)=>{e.tabIndex=t===r?0:-1}),n[r].focus()}else if(e.key===`Home`)e.preventDefault(),n.forEach((e,t)=>{e.tabIndex=t===0?0:-1}),n[0].focus();else if(e.key===`End`){e.preventDefault();let t=n.length-1;n.forEach((e,n)=>{e.tabIndex=n===t?0:-1}),n[t].focus()}}},t.addEventListener(`keydown`,t._bcKey)}function yf(){let e=X(`breadcrumb`);if(!e)return;let t=[`<button type="button" class="crumb" data-crumb="root">All wings</button>`];K.currentWing&&(t.push(`<span class="crumb-sep" aria-hidden="true">›</span>`),t.push(`<button type="button" class="crumb" data-crumb="wing" data-wing="${Z(K.currentWing)}">${Z(K.currentWing)}</button>`)),K.currentRoom&&K.currentWing&&(t.push(`<span class="crumb-sep" aria-hidden="true">›</span>`),t.push(`<button type="button" class="crumb" data-crumb="room" data-wing="${Z(K.currentWing)}" data-room="${Z(K.currentRoom)}">${Z(K.currentRoom)}</button>`)),e.innerHTML=`<nav class="breadcrumb-nav" aria-label="Palace location">${t.join(``)}</nav>`,e.querySelector(`[data-crumb="root"]`)?.addEventListener(`click`,()=>bf()),e.querySelector(`[data-crumb="wing"]`)?.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-wing`);t&&xf(t)}),e.querySelector(`[data-crumb="room"]`)?.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-room`),n=e.currentTarget.getAttribute(`data-wing`);if(t&&n&&K.currentWing===n&&K.currentRoom===t){let e=`room:${n}:${t}`;q?.centerOnNodeId(e)}}),vf(e)}function bf(){Af(),$u.length=0,K.view=`wings`,K.currentWing=null,K.currentRoom=null,K.selected=null,K.pinned=!1,q?.setView(`wings`,null),Yd(),Df(),X(`view-helper-text`).textContent=qu.find(e=>e.id===`wings`)?.hint||``,$d(),Pd(),af(),wf(),Gd()}function xf(e){Af(),!(!J||!h(J.wingsData,e))&&(K.currentWing=e,K.currentRoom=null,K.view=`rooms`,K.selected=null,K.pinned=!1,q?.setView(`rooms`,e),Yd(),Df(),X(`view-helper-text`).textContent=qu.find(e=>e.id===`rooms`)?.hint||``,$d(),Pd(),af(),wf(),Gd())}function Sf(){return K.pinned&&K.selected?K.view===`graph`?`graphFocus`:`pinned`:K.selected?`selected`:K.hovered?`live`:`empty`}function Cf(){let e=X(`btn-pin`);e&&(e.textContent=K.pinned?`Unpin`:`Pin`,e.disabled=!K.selected)}function wf(){let e=X(`inspect-body`),t=Sf(),n=X(`inspect-mode-badge`);n&&(n.textContent={empty:`Nothing selected`,live:`Live preview`,selected:`Selected`,pinned:`Pinned`,graphFocus:`Graph focus`}[t],n.dataset.mode=t);let r=null;t===`pinned`||t===`selected`?r=K.selected:t===`live`&&(r=K.hovered),yf();let i=kd(),a=ud(i);if(!r||r.type===`center`){t===`empty`?e.innerHTML=md()+a+Rd(i):e.innerHTML=md()+a+`
        <div class="empty-state">
          <strong>Hover a node</strong>
          <p>Move the pointer over the scene for a quick preview, or select a wing or room.</p>
        </div>`,rf(null,i),Cf();return}let o=r,s=md();o.type===`wing`?e.innerHTML=s+a+zd(i,o.name,t):o.type===`room`?e.innerHTML=s+a+Bd(i,o.wing,o.name,t):e.innerHTML=s+a+`<div class="inspect-card"><p class="inspect-muted">Unknown node type.</p></div>`,rf(o,i),Cf()}function $(e,t){return`<div class="meta-row"><span class="meta-k">${Z(e)}</span><span class="meta-v">${t}</span></div>`}function Tf(e,t,n){let r=X(`hover-card`);if(!r)return;if(!n){r.classList.remove(`is-visible`);return}let i=r.offsetWidth||240,a=r.offsetHeight||80,o=e+16,s=t+16;o+i>window.innerWidth-8&&(o=e-i-16),s+a>window.innerHeight-8&&(s=window.innerHeight-a-8),r.style.left=`${Math.max(8,o)}px`,r.style.top=`${Math.max(8,s)}px`,r.classList.add(`is-visible`)}function Ef(e){let t=X(`hover-card`);if(!t)return;if(!e||e.type===`center`){t.classList.remove(`is-visible`);return}let n=e.name||e.label||`Node`,r=``;e.type===`wing`?r=`Wing · ${Q(e.drawers)} drawers`:e.type===`room`&&(r=`Room in “${Z(e.wing)}”`),t.innerHTML=`<div class="hc-title">${Z(n)}</div><div class="hc-sub">${r}</div>`}function Df(){document.querySelectorAll(`[data-view]`).forEach(e=>{let t=e.getAttribute(`data-view`)===K.view;e.classList.toggle(`is-active`,t),e.setAttribute(`aria-selected`,t?`true`:`false`),e.tabIndex=t?0:-1})}function Of(){let e=X(`help-overlay`);e&&(e.classList.remove(`is-open`),e.setAttribute(`aria-hidden`,`true`),Zu?.focus?.(),Zu=null)}function kf(){let e=X(`help-overlay`),t=X(`help-dialog`);!e||!t||(Zu=document.activeElement instanceof HTMLElement?document.activeElement:null,e.classList.add(`is-open`),e.setAttribute(`aria-hidden`,`false`),requestAnimationFrame(()=>{X(`help-close`)?.focus()}))}function Af(){X(`help-overlay`)?.classList.contains(`is-open`)&&Of()}function jf(e){Af(),K.view===`graph`&&e!==`graph`&&($u.length=0,vd()),K.view=e,e===`wings`&&(K.currentWing=null,K.currentRoom=null),e===`graph`&&!sessionStorage.getItem(`mempalace-graph-enter-hint`)&&(sessionStorage.setItem(`mempalace-graph-enter-hint`,`1`),ld(`Graph: drag to orbit · click spheres to focus · [ ] step links · U prior focus`,7e3));let t=e===`rooms`?K.currentWing:null;q?.setView(e,t),Yd(),Df(),X(`view-helper-text`).textContent=qu.find(t=>t.id===e)?.hint||``,$d(),Pd(),af(),wf(),df(),lf(),Gd()}function Mf(){K.selected&&(K.pinned=!K.pinned,Yd(),wf(),Gd())}function Nf(){K.selected=null,K.currentRoom=null,K.pinned=!1,Yd(),wf(),Gd()}function Pf(e){if(!e||e.type===`center`){K.hovered=null,K.pinned||(K.selected=null,K.currentRoom=null),Yd(),wf(),Gd();return}let t=Ud(e);if(K.hovered=null,K.view===`wings`&&e.type===`wing`){K.currentWing=e.name,K.currentRoom=null,K.selected=t,K.pinned=!1,K.view=`rooms`,q?.setView(`rooms`,e.name),Yd(),Df(),X(`view-helper-text`).textContent=qu.find(e=>e.id===`rooms`)?.hint||``,$d(),Pd(),af(),wf(),Gd();return}if(K.view===`rooms`&&e.type===`wing`){K.currentWing===e.name?(q?.centerOnNodeId(e.id),K.selected=t,K.pinned=!1):(K.currentWing=e.name,K.currentRoom=null,K.selected=t,K.pinned=!1,q?.setView(`rooms`,e.name),Yd()),wf(),Gd();return}if(K.view===`rooms`&&e.type===`room`){K.currentWing=e.wing,K.currentRoom=e.name,K.selected=t,K.pinned=!1,q?.setView(`rooms`,K.currentWing),Yd(),q?.centerOnNodeId(e.id),wf(),Gd();return}if(K.view===`graph`){if(!t)return;t.id&&K.selected?.id&&K.selected.id!==t.id&&Kl($u,pd()),K.selected=t,t.type===`room`?(K.currentWing=t.wing,K.currentRoom=t.name):t.type===`wing`&&(K.currentWing=t.name,K.currentRoom=null),K.pinned=!0,Yd(),q?.centerOnNodeId(t.id),wf(),Gd();return}K.selected=t,K.pinned=!1,Yd(),wf(),Gd()}function Ff(){q=Du(X(`canvas-container`),{onHover:(e,t)=>{if(fd()){Ef(null),Tf(0,0,!1);return}K.hovered=e&&e.type!==`center`?{...e}:null,wf(),Ef(e),Tf(t.x,t.y,!!e&&e.type!==`center`)},onClick:e=>Pf(e),onBackgroundClick:()=>{let e=X(`canvas-container`);e?.classList.add(`canvas-bg-dismiss`),setTimeout(()=>e?.classList.remove(`canvas-bg-dismiss`),160)}}),q.init()}function If(){let e=X(`help-overlay`);!e||e._trapWired||(e._trapWired=!0,e.addEventListener(`keydown`,t=>{if(!e.classList.contains(`is-open`)||t.key!==`Tab`)return;let n=[...e.querySelectorAll(`button, [href], input, select, textarea`)].filter(e=>!e.hasAttribute(`disabled`));if(n.length===0)return;let r=n[0],i=n[n.length-1];t.shiftKey&&document.activeElement===r?(t.preventDefault(),i.focus()):!t.shiftKey&&document.activeElement===i&&(t.preventDefault(),r.focus())}))}function Lf(){let e=!1,t=!1;try{let n=localStorage.getItem(Gu);if(n){let r=JSON.parse(n);e=!!r.leftCollapsed,t=!!r.rightCollapsed}}catch{}let n=X(`app-main-grid`),r=X(`panel-left`),i=X(`panel-right`);n?.classList.toggle(`has-left-collapsed`,e),n?.classList.toggle(`has-right-collapsed`,t),r?.classList.toggle(`panel--collapsed`,e),i?.classList.toggle(`panel--collapsed`,t),X(`btn-collapse-left`)?.setAttribute(`aria-expanded`,String(!e)),X(`btn-collapse-right`)?.setAttribute(`aria-expanded`,String(!t)),ef(`panel-left`,`panel-left-body`,e),ef(`panel-right`,`panel-right-body`,t)}function Rf(){let e=X(`app-main-grid`);try{localStorage.setItem(Gu,JSON.stringify({leftCollapsed:e?.classList.contains(`has-left-collapsed`)??!1,rightCollapsed:e?.classList.contains(`has-right-collapsed`)??!1}))}catch{}}function zf(){let e=X(`app-main-grid`);X(`btn-collapse-left`)?.addEventListener(`click`,()=>{e?.classList.toggle(`has-left-collapsed`),X(`panel-left`)?.classList.toggle(`panel--collapsed`);let t=e?.classList.contains(`has-left-collapsed`);X(`btn-collapse-left`)?.setAttribute(`aria-expanded`,String(!t)),ef(`panel-left`,`panel-left-body`,t),Rf()}),X(`btn-collapse-right`)?.addEventListener(`click`,()=>{e?.classList.toggle(`has-right-collapsed`),X(`panel-right`)?.classList.toggle(`panel--collapsed`);let t=e?.classList.contains(`has-right-collapsed`);X(`btn-collapse-right`)?.setAttribute(`aria-expanded`,String(!t)),ef(`panel-right`,`panel-right-body`,t),Rf()})}function Bf(){X(`btn-refresh`)?.addEventListener(`click`,()=>Hf(!0)),X(`btn-reset-cam`)?.addEventListener(`click`,()=>q?.resetCamera()),X(`btn-center`)?.addEventListener(`click`,()=>{K.selected?.id?q?.centerOnNodeId(K.selected.id):q?.centerOnHovered()}),X(`btn-pin`)?.addEventListener(`click`,()=>Mf()),X(`btn-clear-sel`)?.addEventListener(`click`,()=>Nf()),X(`toggle-rotate`)?.addEventListener(`change`,e=>{q?.setAutoRotate(e.target.checked),Gd()}),X(`toggle-labels`)?.addEventListener(`change`,e=>{q?.setLabelsVisible(e.target.checked),Gd()});let e=X(`motion-range`);if(e?.addEventListener(`input`,e=>{let t=Number(e.target.value);q?.setMotionIntensity(t),e.target.setAttribute(`aria-valuenow`,String(t)),Gd()}),e&&e.setAttribute(`aria-valuenow`,e.value),qu.forEach(e=>{document.querySelector(`[data-view="${e.id}"]`)?.addEventListener(`click`,()=>jf(e.id))}),X(`view-buttons`)?.addEventListener(`keydown`,e=>{if(e.key!==`ArrowDown`&&e.key!==`ArrowUp`&&e.key!==`ArrowRight`&&e.key!==`ArrowLeft`)return;let t=[...document.querySelectorAll(`[data-view]`)];if(!t.length)return;let n=t.findIndex(e=>e.getAttribute(`data-view`)===K.view);if(n<0)return;e.preventDefault();let r=(n+(e.key===`ArrowDown`||e.key===`ArrowRight`?1:-1)+t.length)%t.length;jf(t[r].getAttribute(`data-view`)),t[r].focus()}),X(`search-wings`)?.addEventListener(`input`,e=>{clearTimeout(Yu),Yu=setTimeout(()=>{K.searchQuery=e.target.value,Yd(),_f(),lf(),Gd()},120)}),X(`search-wings`)?.addEventListener(`keydown`,e=>{if(e.key===`Enter`&&td.length>0){e.preventDefault(),mf(td[nd].sceneId);return}td.length&&(e.key===`ArrowDown`?(e.preventDefault(),nd=Hu(nd,td.length,1),uf()):e.key===`ArrowUp`&&(e.preventDefault(),nd=Hu(nd,td.length,-1),uf()))}),X(`graph-search-panel`)?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-graph-route-to]`);if(t){let e=Number(t.getAttribute(`data-graph-route-to`));if(Number.isNaN(e)||!td[e])return;let n=td[e];if(n.kind!==`room`)return;wd(n.sceneId),ff();return}let n=e.target.closest(`[data-graph-search-step]`);if(n){let e=Number(n.getAttribute(`data-graph-search-step`));(e===1||e===-1)&&hf(e);return}let r=e.target.closest(`[data-graph-hit-ix]`);if(!r)return;let i=Number(r.getAttribute(`data-graph-hit-ix`));Number.isNaN(i)||!td[i]||(nd=i,mf(td[i].sceneId))}),X(`btn-help`)?.addEventListener(`click`,()=>{X(`help-overlay`)?.classList.contains(`is-open`)?Of():kf()}),X(`help-close`)?.addEventListener(`click`,()=>Of()),X(`help-overlay`)?.addEventListener(`click`,e=>{let t=X(`help-overlay`);e.target===t&&Of()}),If(),Lf(),zf(),X(`graph-view-extras`)?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-rel-type]`);if(!t)return;let n=t.getAttribute(`data-rel-type`);n&&Nd(n)}),window.addEventListener(`keydown`,e=>{if(e.altKey&&!e.ctrlKey&&!e.metaKey&&(e.key===`n`||e.key===`N`||e.key===`p`||e.key===`P`)&&K.view===`graph`&&td.length>1){e.preventDefault(),hf(e.key===`n`||e.key===`N`?1:-1);return}if(!(cd(e.target)&&e.key!==`Escape`)){if(e.key===`Escape`){if(X(`help-overlay`)?.classList.contains(`is-open`)){Of();return}if(K.searchQuery.trim()){e.preventDefault(),pf();return}K.pinned?(K.pinned=!1,Yd(),wf(),Gd()):K.selected&&Nf();return}if(!cd(e.target)){if(e.key===`1`&&jf(`wings`),e.key===`2`&&jf(`rooms`),e.key===`3`&&jf(`graph`),(e.key===`r`||e.key===`R`)&&q?.resetCamera(),K.view===`graph`&&!e.ctrlKey&&!e.metaKey&&!e.altKey){let t=Y.result?.ok&&Y.result.pathSceneIds?.length>1;e.key===`[`&&(e.preventDefault(),t?Td(-1):gd(-1)),e.key===`]`&&(e.preventDefault(),t?Td(1):gd(1)),(e.key===`u`||e.key===`U`)&&(e.preventDefault(),_d())}if(e.key===`/`&&!e.ctrlKey&&!e.metaKey&&(e.preventDefault(),gf()),e.key===`l`||e.key===`L`){let e=X(`toggle-labels`);e&&(e.checked=!e.checked,e.dispatchEvent(new Event(`change`)))}if(e.key===` `){e.preventDefault();let t=X(`toggle-rotate`);t&&(t.checked=!t.checked,t.dispatchEvent(new Event(`change`)))}}}}),localStorage.getItem(`mempalace-viz-onboarded`)||(X(`onboard-hint`).hidden=!1,localStorage.setItem(`mempalace-viz-onboarded`,`1`)),window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches&&!localStorage.getItem(Uu)){let t=X(`toggle-rotate`);t&&(t.checked=!1,t.dispatchEvent(new Event(`change`))),e&&(e.value=`0`,e.setAttribute(`aria-valuenow`,`0`),q?.setMotionIntensity(0))}}function Vf(){let e=X(`view-buttons`);e&&(e.innerHTML=qu.map(e=>`
    <button type="button" class="view-seg__btn" data-view="${e.id}" role="tab" aria-selected="${e.id===K.view?`true`:`false`}" tabindex="${e.id===K.view?0:-1}">
      <strong>${Z(e.title)}</strong>
      <span class="view-seg__hint">${Z(e.hint)}</span>
    </button>`).join(``))}async function Hf(e){let t=e?{view:K.view,currentWing:K.currentWing,currentRoom:K.currentRoom,selected:K.selected,pinned:K.pinned,searchQuery:K.searchQuery}:null,n=J;tf(!0),Xd(`loading`,`Connecting…`,e&&Ju?`Refreshing snapshot from ${Zd(Ju)} while keeping the current scene visible.`:`Loading the latest palace snapshot.`);let r=X(`loading-overlay`);if(r&&(r.innerHTML=`<div class="spinner"></div><p style="color:#94a3b8;font-size:0.85rem;">Loading palace data…</p>`),J=await v(),J.error){if(e&&n&&!n.error){J=n,Xd(`stale`,`Offline (cached)`,Ju?`Last successful snapshot: ${Zd(Ju)}.`:`Showing previously loaded data.`),ld(`Refresh failed — showing last loaded data. Check the API and try again.`),tf(!1),wf();return}Xd(`error`,`Disconnected`,`Unable to reach the MemPalace API bridge.`),nf(J.error.message||String(J.error),p()||`(same origin)`);return}if(Ju=J.fetchedAt||new Date().toISOString(),Xd(`ok`,`Connected`,`Last refresh ${Zd(Ju)}.`),tf(!1),!e){let e=Wd();Jd(e),qd(e)}if(Kd(),e&&t){if(t.currentWing&&h(J.wingsData,t.currentWing)?K.currentWing=t.currentWing:(K.currentWing=null,K.currentRoom=null),t.currentRoom&&K.currentWing&&g(J.roomsData,K.currentWing,t.currentRoom)?K.currentRoom=t.currentRoom:K.currentRoom=null,K.view=t.view,t.selected?.id){let e=t.selected;e.type===`wing`&&h(J.wingsData,e.name)||e.type===`room`&&e.wing&&g(J.roomsData,e.wing,e.name)?K.selected=e:K.selected=null}else K.selected=null;K.pinned=t.pinned&&!!K.selected,K.searchQuery=t.searchQuery??K.searchQuery,X(`search-wings`).value=K.searchQuery}Kd(),q?.setData({wingsData:J.wingsData,roomsData:J.roomsData,graphEdges:f(J.graph)}),af(),_f();let i=K.view===`rooms`?K.currentWing:null;if(q?.setView(K.view,i),Md(),Y.startSceneId&&Y.targetSceneId&&xd(),Yd(),q?.setAutoRotate(X(`toggle-rotate`)?.checked??!0),q?.setLabelsVisible(X(`toggle-labels`)?.checked??!0),q?.setMotionIntensity(Number(X(`motion-range`)?.value??1)),Df(),X(`view-helper-text`).textContent=qu.find(e=>e.id===K.view)?.hint||``,$d(),Object.keys(J.wingsData||{}).length?(!J.roomsData||!Object.keys(J.roomsData).some(e=>(J.roomsData[e]||[]).length))&&(X(`view-helper-text`).textContent+=` · No rooms in taxonomy yet.`):X(`view-helper-text`).textContent=`No wings returned — check MCP backend.`,Fu()&&J.graphEdges?.length){let e=El(J.graphEdges,J.roomsData,J.graph?.edgesUnresolved?.length??null);e&&Pu(`${e} tunnel edge(s) have unresolved endpoints vs taxonomy`)}if(Pd(),sf(),id=``,lf(),df(),wf(),Gd(),Fu())try{Mu(K,J,{assert(e,t){e||Pu(`assertValidState:`,t)}})}catch{}}function Uf(){let e=X(`inspect-body`);!e||e._delegationWired||(e._delegationWired=!0,e.addEventListener(`click`,Vd))}function Wf(){Vf(),Ff(),Bf(),Uf(),$d(),window.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&J&&!J.error&&Hf(!0)}),Hf(!1)}Wf();