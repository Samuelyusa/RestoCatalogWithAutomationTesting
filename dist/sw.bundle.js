if(!self.define){let e,i={};const c=(c,n)=>(c=new URL(c+".js",n).href,i[c]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=i,document.head.appendChild(e)}else e=c,importScripts(c),i()})).then((()=>{let e=i[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(n,a)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let s={};const o=e=>c(e,r),f={module:{uri:r},exports:s,require:o};i[r]=Promise.all(n.map((e=>f[e]||o(e)))).then((e=>(a(...e),s)))}}define(["./workbox-e5b96673"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"872.bundle.js",revision:"8d6fa649d54e219b4ad7e21e0286982f"},{url:"app.webmanifest",revision:"5c8fc00cab0cc59638f5656a3fadb663"},{url:"app~309f7e27.bundle.js",revision:"932c7cd7a68ccc6eda8fa3427f581c9d"},{url:"app~49ea73a0.bundle.js",revision:"ece7ba13d04ec1d6d1e4169227a8510f"},{url:"app~4e5ec22b.bundle.js",revision:"8889ffc6197c14fe9b45ca95d47b89a8"},{url:"app~4e5ec22b.css",revision:"07ce1b1529f46ceea8d7948589d98178"},{url:"app~ca0940c6.bundle.js",revision:"14fa84034bd1f824612f55448498880b"},{url:"app~e4317507.bundle.js",revision:"9e670213a66a53cf135e4360d08ea46f"},{url:"favicon.png",revision:"7920cf868d6a1f08d8cc92e1446ae163"},{url:"icons/icon-128.png",revision:"be09c6589d8c241559df05047dd87b4a"},{url:"icons/icon-144.png",revision:"8580bf52db6ba6b701834931c53d851e"},{url:"icons/icon-152.png",revision:"fbdf0850832a85b64b6bf21fa5a24b59"},{url:"icons/icon-192.png",revision:"1c508d0a6ba2cf052f371ed7bbaa7a31"},{url:"icons/icon-256.png",revision:"c0027b951453af876fdcdf6aa62ed3ed"},{url:"icons/icon-384.png",revision:"20390278c4186269034ed0220c5d7c4a"},{url:"icons/icon-512.png",revision:"615fb4838cdb3c6ef75627e8f7dadbc3"},{url:"icons/icon-72.png",revision:"886c01d992204eef4d0914b44016305a"},{url:"icons/icon-96.png",revision:"4a8673715c7414391a28edfdeea6c52a"},{url:"images/heros/hero-image_2.jpg",revision:"49f78cae81de4f48caf1c2fe0271c828"},{url:"images/heros/hero-image_2_small.jpg",revision:"f89213bb509d6af3f4ef321cb45f6fce"},{url:"images/icon/star-rate.png",revision:"a76111ee76aa8005297cac049fdd6f52"},{url:"index.html",revision:"cf3fef990c85cfae2cdf8dffe15663ee"}],{}),e.registerRoute(/^https:\/\/restaurant-api.dicoding.dev\//,new e.StaleWhileRevalidate({cacheName:"restocatalog_pwa",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
//# sourceMappingURL=sw.bundle.js.map