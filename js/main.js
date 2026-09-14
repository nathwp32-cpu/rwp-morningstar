(function(){"use strict";const themeBtn=document.getElementById("themeToggle"),saved=localStorage.getItem("rwp-theme");saved&&document.documentElement.setAttribute("data-theme",saved);function updateThemeIcon(){const cur=document.documentElement.getAttribute("data-theme");themeBtn&&(themeBtn.textContent=cur==="dark"?"☀️":"🌙")}updateThemeIcon(),themeBtn&&themeBtn.addEventListener("click",function(){const cur=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",cur),localStorage.setItem("rwp-theme",cur),updateThemeIcon()});const hamburger=document.getElementById("hamburger"),mobileNav=document.getElementById("mobileNav"),closeMnav=document.getElementById("closeMnav");function toggleMnav(open){mobileNav&&(open?mobileNav.classList.add("open"):mobileNav.classList.remove("open"))}hamburger&&hamburger.addEventListener("click",function(){toggleMnav(!0)}),closeMnav&&closeMnav.addEventListener("click",function(){toggleMnav(!1)}),mobileNav&&mobileNav.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){toggleMnav(!1)})});const revealEls=document.querySelectorAll(".reveal");if("IntersectionObserver"in window){const io=new IntersectionObserver(function(entries){entries.forEach(function(e){e.isIntersecting&&(e.target.classList.add("visible"),io.unobserve(e.target))})},{threshold:.12});revealEls.forEach(function(el,i){el.style.transitionDelay=i%4*.06+"s",io.observe(el)})}else revealEls.forEach(function(el){el.classList.add("visible")});const scrollTop=document.getElementById("scrollTop"),progressBar=document.getElementById("progressBar"),sections=Array.prototype.slice.call(document.querySelectorAll("section[id]")),navLinks=Array.prototype.slice.call(document.querySelectorAll(".nav a[href^='#']"));function onScroll(){const y=window.scrollY||document.documentElement.scrollTop;if(scrollTop&&scrollTop.classList.toggle("show",y>500),progressBar){const h=document.documentElement.scrollHeight-window.innerHeight;progressBar.style.width=(h>0?y/h*100:0)+"%"}let currentId="";sections.forEach(function(s){y>=s.offsetTop-140&&(currentId=s.id)}),navLinks.forEach(function(l){l.classList.toggle("active",l.getAttribute("href")==="#"+currentId)})}window.addEventListener("scroll",onScroll,{passive:!0}),onScroll(),scrollTop&&scrollTop.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});const searchBtn=document.getElementById("searchBtn"),searchModal=document.getElementById("searchModal"),searchInput=document.getElementById("searchInput"),searchClose=document.getElementById("searchClose"),searchResults=document.getElementById("searchResults"),searchIndex=Array.prototype.slice.call(document.querySelectorAll("section[id]")).map(function(s){return{id:s.id,title:(s.querySelector("h2")||s.querySelector("h3")||{}).textContent||s.id,text:(s.textContent||"").slice(0,1200).toLowerCase()}});function runSearch(q){if(!searchResults)return;if(q=q.trim().toLowerCase(),searchResults.innerHTML="",q.length<2){searchResults.innerHTML='<div style="color:#8b857c;padding:.6rem 0;font-size:.9rem">Ketik minimal 2 huruf untuk mencari…</div>';return}const hits=searchIndex.filter(function(s){return s.title.toLowerCase().indexOf(q)!==-1||s.text.indexOf(q)!==-1}).slice(0,8);if(!hits.length){searchResults.innerHTML='<div style="color:#8b857c;padding:.6rem 0;font-size:.9rem">Tidak ditemukan. Coba kata kunci lain (mis. “dialektika”, “nilai lebih”, “PEPERA”).</div>';return}hits.forEach(function(h){const a=document.createElement("a");a.href="#"+h.id,a.innerHTML='<span class="sr-tag">Bagian</span><br>'+h.title,a.addEventListener("click",function(){searchModal.classList.remove("open"),searchInput.value=""}),searchResults.appendChild(a)})}searchBtn&&searchModal&&searchBtn.addEventListener("click",function(){searchModal.classList.add("open"),setTimeout(function(){searchInput&&searchInput.focus()},80)}),searchClose&&searchModal&&searchClose.addEventListener("click",function(){searchModal.classList.remove("open")}),searchInput&&(searchInput.addEventListener("input",function(){runSearch(searchInput.value)}),searchInput.addEventListener("keydown",function(e){e.key==="Escape"&&searchModal.classList.remove("open")})),searchModal&&searchModal.addEventListener("click",function(e){e.target===searchModal&&searchModal.classList.remove("open")}),document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener("click",function(e){const target=document.querySelector(a.getAttribute("href"));if(target){e.preventDefault();const top=target.getBoundingClientRect().top+window.scrollY-76;window.scrollTo({top,behavior:"smooth"})}})});
})();
/* ===== v5 hero slider ===== */
(function(){
  var slider=document.querySelector("[data-slider]");
  if(!slider)return;
  var track=slider.querySelector("[data-slider-track]");
  var slides=Array.prototype.slice.call(slider.querySelectorAll(".slide"));
  var dots=Array.prototype.slice.call(slider.querySelectorAll("[data-slider-dot]"));
  var prev=slider.querySelector("[data-slider-prev]");
  var next=slider.querySelector("[data-slider-next]");
  var playBtn=slider.querySelector("[data-slider-play]");
  var count=slides.length,index=0,timer=null,reduced=false,manualPaused=false;
  if("matchMedia"in window)reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function goTo(i){
    index=(i+count)%count;
    if(track)track.style.transform="translateX(-"+(index*100)+"%)";
    dots.forEach(function(d,k){d.setAttribute("aria-selected",k===index?"true":"false")});
    slides.forEach(function(s,k){s.setAttribute("aria-hidden",k===index?"false":"true")});
  }
  function setPlayState(paused){
    if(!playBtn)return;
    playBtn.setAttribute("aria-pressed",paused?"true":"false");
    playBtn.setAttribute("aria-label",paused?"Lanjutkan autoplay":"Jeda autoplay");
  }
  function play(){if(reduced||manualPaused)return;stop();timer=setInterval(function(){goTo(index+1)},6000);setPlayState(false)}
  function stop(){if(timer){clearInterval(timer);timer=null}}
  function onVis(){document.hidden?stop():play()}
  if(prev)prev.addEventListener("click",function(){goTo(index-1);play()});
  if(next)next.addEventListener("click",function(){goTo(index+1);play()});
  dots.forEach(function(d){d.addEventListener("click",function(){goTo(parseInt(d.getAttribute("data-slider-dot"),10));play()})});
  if(playBtn)playBtn.addEventListener("click",function(){
    manualPaused=!manualPaused;
    if(manualPaused){stop();setPlayState(true)}else{play()}
  });
  slider.addEventListener("mouseenter",stop);
  slider.addEventListener("mouseleave",function(){if(!manualPaused)play()});
  slider.addEventListener("focusin",stop);
  slider.addEventListener("focusout",function(){if(!manualPaused)play()});
  document.addEventListener("visibilitychange",onVis);
  goTo(0);play();
})();
/* ===== v6 FAQ accordion ===== */
(function(){
  var items=Array.prototype.slice.call(document.querySelectorAll(".faq-item"));
  if(!items.length)return;
  items.forEach(function(item){
    var q=item.querySelector(".faq-q");
    var a=item.querySelector(".faq-a");
    if(!q||!a)return;
    q.addEventListener("click",function(){
      var isOpen=q.getAttribute("aria-expanded")==="true";
      // close all
      items.forEach(function(other){
        var oq=other.querySelector(".faq-q");
        var oa=other.querySelector(".faq-a");
        if(oq){oq.setAttribute("aria-expanded","false");oq.classList.remove("open")}
        if(oa){oa.style.maxHeight=null;oa.setAttribute("aria-hidden","true")}
      });
      if(!isOpen){
        q.setAttribute("aria-expanded","true");
        q.classList.add("open");
        a.style.maxHeight=a.scrollHeight+"px";
        a.setAttribute("aria-hidden","false");
      }
    });
  });
})();
/* ===== v6 forum (localStorage) ===== */
(function(){
  var form=document.querySelector("[data-forum-form]");
  var list=document.querySelector("[data-forum-list]");
  var countEl=document.querySelector("#forumCount");
  var KEY="rwp-forum-v1";
  var posts=[];
  try{posts=JSON.parse(localStorage.getItem(KEY)||"[]")}catch(e){posts=[]}
  var currentFilter="all";
  var currentTag="all";
  var searchQuery="";
  var currentSort="newest";
  var currentPinFilter="all";
  var viewedFlags={};
  var likedFlags={};
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
  function fmtTime(ts){
    var d=new Date(ts),now=new Date();
    var diff=Math.floor((now-d)/1000);
    if(diff<60)return "baru saja";
    if(diff<3600)return Math.floor(diff/60)+" menit lalu";
    if(diff<86400)return Math.floor(diff/3600)+" jam lalu";
    if(diff<604800)return Math.floor(diff/86400)+" hari lalu";
    return d.toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"});
  }
  function render(){
    if(!list)return;
    var filtered=posts.filter(function(p){
      var okTopic=currentFilter==="all"||p.topic===currentFilter;
      var okTag=currentTag==="all"||p.tag===currentTag;
      var okPin=currentPinFilter==="all"||!!p.pinned;
      var okSearch=!searchQuery||(p.name+" "+p.msg+" "+(p.topic||"")+" "+(p.tag||"")).toLowerCase().indexOf(searchQuery)!==-1;
      return okTopic&&okTag&&okPin&&okSearch;
    });
    filtered.sort(function(a,b){
      var pa=a.pinned?1:0,pb=b.pinned?1:0;
      if(pa!==pb)return pb-pa;
      if(currentSort==="popular"){var va=a.views||0,vb=b.views||0;if(va!==vb)return vb-va;}
      if(currentSort==="replies"){var ra=(a.replies||[]).length,rb=(b.replies||[]).length;if(ra!==rb)return rb-ra;}
      return (b.ts||0)-(a.ts||0);
    });
    if(countEl){countEl.textContent=(filtered.length===posts.length?posts.length:filtered.length+" dari "+posts.length)+" diskusi"}
    if(!filtered.length){
      list.innerHTML='<p class="forum-empty">'+(currentFilter==="all"?"Belum ada diskusi. Jadilah yang pertama berbagi! ✊":"Tidak ada diskusi pada topik ini.")+'</p>';
      return;
    }
    list.innerHTML=filtered.map(function(p){
      var replies=(p.replies||[]).map(function(r){
        return '<div class="fp-reply">'+
          '<div class="fp-reply-head"><span class="fp-reply-avatar" aria-hidden="true">'+esc((r.name||"?").charAt(0).toUpperCase())+'</span>'+
          '<span class="fp-reply-name">'+esc(r.name)+'</span>'+
          '<span class="fp-reply-time">'+fmtTime(r.ts)+'</span>'+
          '<button type="button" class="fp-reply-del" data-reply-del="'+p.id+'" data-reply-id="'+r.id+'" aria-label="Hapus balasan">✕</button></div>'+
          '<p class="fp-reply-body">'+esc(r.msg)+'</p>'+
        '</div>';
      }).join("");
      var isNew=(Date.now()-(p.ts||0))<172800000;
      return '<article class="forum-post" data-id="'+p.id+'">'+
        '<div class="fp-head"><span class="fp-avatar" aria-hidden="true">'+esc((p.name||"?").charAt(0).toUpperCase())+'</span>'+
        '<div class="fp-meta"><span class="fp-name">'+esc(p.name)+'</span>'+
        '<span class="fp-time">'+fmtTime(p.ts)+'</span>'+(isNew?'<span class="fp-new-badge" title="Diskusi baru (kurang dari 48 jam)">🆕 Terbaru</span>':'')+(p.pinned?'<span class="fp-pin-badge" title="Diskusi tersemat">📌 Tersemat</span>':'')+
        '<span class="fp-views" title="Jumlah tampilan">👁 '+(p.views||0)+'</span>'+(p.likes?'<span class="fp-likes" title="Jumlah dukungan">👍 '+p.likes+'</span>':'')+'</div>'+
        '<span class="fp-topic">'+esc(p.topic)+'</span></div>'+
        '<p class="fp-body" title="Klik untuk menambah penghitung tampilan">'+esc(p.msg)+'</p>'+
        (p.tag?'<div class="fp-tags"><span class="fp-tag">#'+esc(p.tag)+'</span></div>':'')+
        (replies?'<div class="fp-replies">'+replies+'</div>':'')+
        '<div class="fp-actions">'+
          '<span class="fp-reply-count">'+(p.replies||[]).length+' balasan</span>'+
          '<button type="button" class="fp-reply-toggle" data-reply-toggle="'+p.id+'" aria-expanded="false">💬 Balas</button>'+
          '<button type="button" class="fp-pin-toggle" data-pin-toggle="'+p.id+'" aria-pressed="'+(p.pinned?'true':'false')+'" title="Sematkan / lepaskan sematan">'+(p.pinned?'📌 Lepas sematan':'📌 Sematkan')+'</button>'+
          '<button type="button" class="fp-pin-toggle fp-like" data-like-toggle="'+p.id+'" aria-pressed="'+(likedFlags[p.id]?'true':'false')+'" title="Tandai dukungan Anda untuk diskusi ini">'+(likedFlags[p.id]?'👍 Didukung':'👍 Dukung')+'</button>'+
          '<button type="button" class="fp-del" data-del="'+p.id+'" aria-label="Hapus diskusi">🗑 Hapus</button>'+
        '</div>'+
      '</article>';
    }).join("");
    list.querySelectorAll("[data-del]").forEach(function(btn){
      btn.addEventListener("click",function(){
        var id=btn.getAttribute("data-del");
        posts=posts.filter(function(p){return p.id!==id});
        try{localStorage.setItem(KEY,JSON.stringify(posts))}catch(e){}
        render();
      });
    });
    // reply toggle: show/hide reply form
    list.querySelectorAll("[data-reply-toggle]").forEach(function(btn){
      btn.addEventListener("click",function(){
        var id=btn.getAttribute("data-reply-toggle");
        var post=list.querySelector('.forum-post[data-id="'+id+'"]');
        if(!post)return;
        var existing=post.querySelector("[data-reply-form]");
        if(existing){existing.remove();btn.setAttribute("aria-expanded","false");return}
        var tpl=document.getElementById("replyFormTpl");
        if(!tpl)return;
        var frag=tpl.content.cloneNode(true);
        var form=frag.querySelector("[data-reply-form]");
        form.addEventListener("submit",function(e){
          e.preventDefault();
          var name=form.querySelector(".reply-name").value.trim();
          var msg=form.querySelector(".reply-msg").value.trim();
          if(!name||!msg)return;
          var target=posts.filter(function(p){return p.id===id})[0];
          if(!target)return;
          if(!target.replies)target.replies=[];
          target.replies.push({id:"r"+Date.now(),name:name,msg:msg,ts:Date.now()});
          try{localStorage.setItem(KEY,JSON.stringify(posts))}catch(err){}
          render();
        });
        form.querySelector(".reply-cancel").addEventListener("click",function(){form.remove();btn.setAttribute("aria-expanded","false")});
        post.appendChild(form);
        btn.setAttribute("aria-expanded","true");
        form.querySelector(".reply-name").focus();
      });
    });
    // pin toggle + view counter
    list.querySelectorAll("[data-pin-toggle]").forEach(function(btn){
      btn.addEventListener("click",function(){
        var id=btn.getAttribute("data-pin-toggle");
        var target=posts.filter(function(p){return p.id===id})[0];
        if(!target)return;
        target.pinned=!target.pinned;
        try{localStorage.setItem(KEY,JSON.stringify(posts))}catch(e){}
        render();
      });
    });
    list.querySelectorAll(".fp-body").forEach(function(bodyEl){
      bodyEl.addEventListener("click",function(){
        var post=bodyEl.closest?bodyEl.closest(".forum-post"):null;
        if(!post)return;
        var id=post.getAttribute("data-id");
        if(viewedFlags[id])return;
        viewedFlags[id]=true;
        var target=posts.filter(function(p){return p.id===id})[0];
        if(!target)return;
        target.views=(target.views||0)+1;
        try{localStorage.setItem(KEY,JSON.stringify(posts))}catch(e){}
        render();
      });
    });
    list.querySelectorAll("[data-like-toggle]").forEach(function(btn){
      btn.addEventListener("click",function(){
        var id=btn.getAttribute("data-like-toggle");
        var target=posts.filter(function(p){return p.id===id})[0];
        if(!target)return;
        if(likedFlags[id]){delete likedFlags[id];target.likes=Math.max(0,(target.likes||0)-1)}
        else{likedFlags[id]=true;target.likes=(target.likes||0)+1}
        try{localStorage.setItem(KEY,JSON.stringify(posts))}catch(e){}
        render();
      });
    });
    // delete a reply
    list.querySelectorAll("[data-reply-del]").forEach(function(btn){
      btn.addEventListener("click",function(){
        var pid=btn.getAttribute("data-reply-del");
        var rid=btn.getAttribute("data-reply-id");
        var target=posts.filter(function(p){return p.id===pid})[0];
        if(!target||!target.replies)return;
        target.replies=target.replies.filter(function(r){return r.id!==rid});
        try{localStorage.setItem(KEY,JSON.stringify(posts))}catch(e){}
        render();
      });
    });
  }
  if(form){
    form.addEventListener("submit",function(e){
      e.preventDefault();
      var name=form.querySelector("#forumName").value.trim();
      var topic=form.querySelector("#forumTopic").value;
      var tagEl=form.querySelector("#forumTag");
      var tag=tagEl?tagEl.value:"";
      var pinEl=form.querySelector("#forumPin");
      var pinned=!!(pinEl&&pinEl.checked);
      var msg=form.querySelector("#forumMsg").value.trim();
      if(!name||!topic||!msg)return;
      posts.unshift({id:"p"+Date.now(),name:name,topic:topic,tag:tag,msg:msg,ts:Date.now(),views:0,likes:0,pinned:pinned,replies:[]});
      try{localStorage.setItem(KEY,JSON.stringify(posts))}catch(err){}
      form.reset();
      render();
    });
  }
  document.querySelectorAll("[data-filter]").forEach(function(chip){
    chip.addEventListener("click",function(){
      document.querySelectorAll("[data-filter]").forEach(function(c){c.classList.remove("active")});
      chip.classList.add("active");
      currentFilter=chip.getAttribute("data-filter");
      render();
    });
  });
  document.querySelectorAll("[data-tag-filter]").forEach(function(chip){
    chip.addEventListener("click",function(){
      document.querySelectorAll("[data-tag-filter]").forEach(function(c){c.classList.remove("active")});
      chip.classList.add("active");
      currentTag=chip.getAttribute("data-tag-filter");
      render();
    });
  });
  document.querySelectorAll("[data-pin-filter]").forEach(function(chip){
    chip.addEventListener("click",function(){
      document.querySelectorAll("[data-pin-filter]").forEach(function(c){c.classList.remove("active")});
      chip.classList.add("active");
      currentPinFilter=chip.getAttribute("data-pin-filter");
      render();
    });
  });
  var sortSel=document.getElementById("forumSort");
  if(sortSel)sortSel.addEventListener("change",function(){currentSort=sortSel.value||"newest";render()});
  function downloadFile(name,text,mime){
    var blob=new Blob([text],{type:mime||"application/json"});
    var url=URL.createObjectURL(blob);
    var a=document.createElement("a");
    a.href=url;a.download=name;
    document.body.appendChild(a);a.click();
    setTimeout(function(){URL.revokeObjectURL(url);a.remove()},200);
  }
  var expJson=document.getElementById("forumExportJson");
  if(expJson)expJson.addEventListener("click",function(){
    downloadFile("rwp-forum.json",JSON.stringify(posts,null,2),"application/json");
  });
  var expCsv=document.getElementById("forumExportCsv");
  if(expCsv)expCsv.addEventListener("click",function(){
    function q(s){return '"'+String(s==null?"":s).replace(/"/g,'""')+'"'}
    var rows=[["id","nama","topik","tag","pesan","waktu","jumlah_balasan","jumlah_dukungan","jumlah_tampilan"]];
    posts.forEach(function(p){
      rows.push([p.id,p.name,p.topic,p.tag||"",p.msg,new Date(p.ts).toISOString(),(p.replies||[]).length,p.likes||0,p.views||0]);
    });
    downloadFile("rwp-forum.csv",rows.map(function(r){return r.map(q).join(",")}).join("\n"),"text/csv");
  });
  var searchInput=document.getElementById("forumSearch");
  if(searchInput){
    searchInput.addEventListener("input",function(){
      searchQuery=searchInput.value.trim().toLowerCase();
      render();
    });
  }
  render();
})();

/* ===== v11 YouTube slider — Papua Berbicara (@papuaberbicara) ===== */
(function(){
  "use strict";
  var roots=Array.prototype.slice.call(document.querySelectorAll("[data-yt-slider]"));
  if(!roots.length)return;
  var reduced=!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  roots.forEach(function(root){
    var track=root.querySelector("[data-yt-track]");
    var slides=Array.prototype.slice.call(root.querySelectorAll(".yt-slide"));
    var dots=Array.prototype.slice.call(root.querySelectorAll("[data-yt-dot]"));
    var prevBtn=root.querySelector("[data-yt-prev]");
    var nextBtn=root.querySelector("[data-yt-next]");
    var toggle=root.querySelector("[data-yt-toggle]");
    var status=root.querySelector("[data-yt-status]");
    if(!track||!slides.length)return;

    var delay=parseInt(root.getAttribute("data-delay"),10);
    if(isNaN(delay)||delay<3000)delay=6000;
    var manualPaused=root.getAttribute("data-autoplay")==="false";
    var hovering=false,offscreen=false,index=0,timer=null;

    function goTo(i){
      index=((i%slides.length)+slides.length)%slides.length;
      track.style.transform="translateX("+(-index*100)+"%)";
      slides.forEach(function(s,n){s.setAttribute("aria-hidden",n===index?"false":"true");try{s.inert=n!==index}catch(e){}});
      dots.forEach(function(d,n){d.setAttribute("aria-selected",n===index?"true":"false")});
    }
    function setToggle(paused){
      if(toggle){
        toggle.setAttribute("aria-pressed",paused?"true":"false");
        toggle.textContent=paused?"\u25b6 Lanjut":"\u275a\u275a Jeda";
      }
      if(status)status.textContent=paused?"Autoplay dijeda":"Autoplay \u00b7 bergilir otomatis";
    }
    function stop(){if(timer){clearInterval(timer);timer=null}}
    function sync(){
      var ok=!manualPaused&&!hovering&&!offscreen&&!reduced&&!document.hidden;
      if(ok){stop();timer=setInterval(function(){goTo(index+1)},delay)}
      else stop();
    }
    function clearPlayers(){
      slides.forEach(function(s){
        var f=s.querySelector(".yt-frame"),t=s.querySelector(".yt-thumb");
        if(f&&f.querySelector("iframe")){f.innerHTML="";f.hidden=true;if(t)t.hidden=false}
      });
    }
    function activate(slide){
      var frame=slide.querySelector(".yt-frame");
      var thumb=slide.querySelector(".yt-thumb");
      var id=slide.getAttribute("data-yt-id");
      if(!frame||!id)return;
      if(!frame.querySelector("iframe")){
        var ifr=document.createElement("iframe");
        ifr.setAttribute("src","https://www.youtube-nocookie.com/embed/"+id+"?autoplay=1&rel=0&modestbranding=1&playsinline=1");
        ifr.setAttribute("title",slide.getAttribute("data-yt-title")||"Video YouTube \u2014 Papua Berbicara");
        ifr.setAttribute("loading","lazy");
        ifr.setAttribute("allow","accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
        ifr.setAttribute("allowfullscreen","");
        ifr.setAttribute("referrerpolicy","strict-origin-when-cross-origin");
        frame.appendChild(ifr);
      }
      if(thumb)thumb.hidden=true;
      frame.hidden=false;
      manualPaused=true;
      if(toggle){toggle.setAttribute("aria-pressed","true");toggle.textContent="\u25b6 Lanjut"}
      if(status)status.textContent="Video diputar \u2014 autoplay dijeda";
      stop();
    }

    if(prevBtn)prevBtn.addEventListener("click",function(){goTo(index-1);sync()});
    if(nextBtn)nextBtn.addEventListener("click",function(){goTo(index+1);sync()});
    dots.forEach(function(d,n){d.addEventListener("click",function(){goTo(n);sync()})});
    if(toggle)toggle.addEventListener("click",function(){
      if(manualPaused){clearPlayers();manualPaused=false;setToggle(false)}
      else{manualPaused=true;setToggle(true)}
      sync();
    });
    root.addEventListener("mouseenter",function(){hovering=true;stop()});
    root.addEventListener("mouseleave",function(){hovering=false;sync()});
    root.addEventListener("keydown",function(e){
      if(e.key==="ArrowLeft"){goTo(index-1);sync();e.preventDefault()}
      else if(e.key==="ArrowRight"){goTo(index+1);sync();e.preventDefault()}
    });
    slides.forEach(function(s){
      var t=s.querySelector(".yt-thumb");
      if(t)t.addEventListener("click",function(){activate(s)});
      var f=s.querySelector(".yt-frame");
      if(f)f.hidden=true;
    });
    document.addEventListener("visibilitychange",function(){sync()});
    if("IntersectionObserver" in window){
      var io=new IntersectionObserver(function(entries){
        entries.forEach(function(en){offscreen=!en.isIntersecting;sync()});
      },{threshold:.2});
      io.observe(root);
    }
    setToggle(manualPaused);
    goTo(0);
    sync();
  });
})();

/* ===== v14 gallery (filter) + lightbox ===== */
(function(){
  "use strict";
  var cards=Array.prototype.slice.call(document.querySelectorAll("[data-gal-card]"));
  var lb=document.getElementById("lightbox");
  if(!cards.length||!lb)return;
  var imgEl=document.getElementById("lbImg");
  var tEl=document.getElementById("lbTitle");
  var mEl=document.getElementById("lbMeta");
  var dEl=document.getElementById("lbDesc");
  var cEl=document.getElementById("lbCat");
  var nEl=document.getElementById("lbCounter");
  var closeBtn=lb.querySelector("[data-lb-close]");
  var prevBtn=lb.querySelector("[data-lb-prev]");
  var nextBtn=lb.querySelector("[data-lb-next]");
  var countEl=document.getElementById("galCount");
  var emptyEl=document.getElementById("galEmpty");
  var filtered=cards.slice();
  var cur=0;

  function txt(el,v){if(el)el.textContent=v||""}
  function renderLB(){
    var c=filtered[cur];
    if(!c)return;
    if(imgEl){imgEl.src=c.getAttribute("data-gal-src");imgEl.alt=c.getAttribute("data-gal-alt")||""}
    txt(tEl,c.getAttribute("data-gal-title"));
    txt(mEl,c.getAttribute("data-gal-meta"));
    txt(dEl,c.getAttribute("data-gal-desc"));
    txt(cEl,c.getAttribute("data-gal-cat"));
    txt(nEl,(cur+1)+" / "+filtered.length);
  }
  function open(list,i){
    if(!list.length)return;
    filtered=list;
    cur=((i%list.length)+list.length)%list.length;
    renderLB();
    lb.classList.add("open");
    lb.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
    if(closeBtn&&closeBtn.focus)closeBtn.focus();
  }
  function close(){
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden","true");
    document.body.style.overflow="";
  }
  function step(k){
    if(!filtered.length)return;
    cur=(cur+k+filtered.length)%filtered.length;
    renderLB();
  }
  function openCard(card){
    var list=filtered.indexOf(card)!==-1?filtered:cards;
    var i=list.indexOf(card);
    if(i!==-1)open(list,i);
  }
  cards.forEach(function(card){
    card.addEventListener("click",function(){openCard(card)});
  });
  Array.prototype.slice.call(document.querySelectorAll("[data-gal-open]")).forEach(function(btn){
    btn.addEventListener("click",function(){
      var i=parseInt(btn.getAttribute("data-gal-open"),10);
      if(!isNaN(i)&&cards[i])open(cards,i);
    });
  });
  var chips=Array.prototype.slice.call(document.querySelectorAll("[data-gal-filter]"));
  function applyFilter(f){
    filtered=cards.filter(function(c){
      return f==="all"||c.getAttribute("data-gal-cat-key")===f;
    });
    cards.forEach(function(c){c.classList.toggle("hide",filtered.indexOf(c)===-1)});
    if(countEl)countEl.textContent="Menampilkan "+filtered.length+" dari "+cards.length+" foto";
    if(emptyEl)emptyEl.hidden=filtered.length>0;
  }
  chips.forEach(function(chip){
    chip.addEventListener("click",function(){
      chips.forEach(function(c){c.classList.remove("active")});
      chip.classList.add("active");
      applyFilter(chip.getAttribute("data-gal-filter"));
    });
  });
  if(closeBtn)closeBtn.addEventListener("click",close);
  if(prevBtn)prevBtn.addEventListener("click",function(){step(-1)});
  if(nextBtn)nextBtn.addEventListener("click",function(){step(1)});
  lb.addEventListener("click",function(e){if(e.target===lb)close()});
  document.addEventListener("keydown",function(e){
    if(!lb.classList.contains("open"))return;
    if(e.key==="Escape"){close();e.preventDefault()}
    else if(e.key==="ArrowLeft"){step(-1);e.preventDefault()}
    else if(e.key==="ArrowRight"){step(1);e.preventDefault()}
  });
  applyFilter("all");
})();
