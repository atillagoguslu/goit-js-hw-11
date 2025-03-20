import{S as d,i as c}from"./assets/vendor-5ObWk2rO.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const f=document.querySelector("[data-search-input]"),u=document.querySelector("[data-search-button]"),h="49441477-341b75558156795e6f3713ba3",p="https://pixabay.com/api/",l={position:"topCenter",timeout:3e3,progressBarColor:"red",transitionIn:"fadeInDown",transitionOut:"fadeOutUp"};let y=[];const m={lang:"en",image_type:"photo",orientation:"horizontal",safesearch:!0},g=async(e,t=1)=>{try{return(await(await fetch(`${p}?key=${h}&q=${e}&page=${t}&${m}`)).json()).hits}catch{return c.show({...l,title:"Error",message:"🟥 We cannot reach the server. Please try again later. 🟥",color:"red"}),[]}},b=async e=>{e.preventDefault(),i.innerHTML=`
  <div class="loader">
    <p>Loading...</p>
  </div>
  `;const t=document.querySelector(".loader");t&&(t.style.display="flex");const s=f.value;try{const n=await g(s);if(n.length===0){c.show({...l,title:"Error",message:`No images found with "${s}" query.`,color:"red"});return}y=n,L(n)}finally{t&&(t.style.display="none")}};u.addEventListener("click",b);const i=document.querySelector(".gallery-section");let v=new d(".gallery-section a",{captionsData:"alt",captionDelay:250});const w=e=>{const t=document.createElement("div");return t.classList.add("gallery-item"),t.innerHTML=`
    <a href="${e.largeImageURL}">
      <img width="${e.webformatWidth}" height="${e.webformatHeight}" src="${e.webformatURL}" alt="${e.tags}" />
    </a>
    <div class="info">
      <div class="info-box">
        <b>Likes</b>
        ${e.likes}
      </div>
      <div class="info-box">
        <b>Views</b>
        ${e.views}
      </div>
      <div class="info-box">
        <b>Comments</b>
        ${e.comments}
      </div>
      <div class="info-box">
        <b>Downloads</b>
        ${e.downloads}
      </div>
    </div>
  `,t},L=e=>{i.innerHTML="",e.forEach(t=>{const s=w(t);i.appendChild(s)}),v.refresh()};
//# sourceMappingURL=index.js.map
