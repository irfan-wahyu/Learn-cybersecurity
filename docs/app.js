(function(){
var SK='cybersec_lab_';
function S(k,d){try{var v=localStorage.getItem(SK+k);return v?JSON.parse(v):d}catch(e){return d}}
function W(k,v){try{localStorage.setItem(SK+k,JSON.stringify(v))}catch(e){}}

var XP_L=[0,100,250,500,800,1200,1800,2500,3500,5000,7000,10000,14000,19000,25000,32000,40000,50000,65000,80000];
var XP_T=['Newbie','Script Kiddie','Junior Hacker','Security Analyst','Penetration Tester','Security Engineer','Bug Hunter','Red Teamer','Security Architect','Security Expert','Bug Bounty Hunter','CISO','Security Researcher','Cyber Warrior','Elite Hacker','Security Legend','Cyber God','1337 Hacker','Security Master','Ultimate Hacker'];

function gx(){return S('xp',0)}
function axp(a){var x=gx()+a;W('xp',x);var ol=gl(),nl=lfx(x);return{lu:nl>ol,nl:nl,xp:x}}
function lfx(x){var l=0;for(var i=0;i<XP_L.length&&x>=XP_L[i];i++)l=i+1;return l}
function gl(){return lfx(gx())}
function gt(){return XP_T[Math.min(gl()-1,XP_T.length-1)]}
function gp(){var x=gx(),l=gl();if(l>=XP_L.length)return{p:100,c:0,n:0};var pv=XP_L[l-1]||0,nx=XP_L[l],ci=x-pv,nd=nx-pv;return{p:Math.min(100,ci/nd*100),c:ci,n:nd}}
function bt(){var x=gx();return x>=1000?(x/1000).toFixed(1)+'k XP':x+' XP'}

var st={cur:null,ch:null,cs:null,pr:S('pr',{}),sv:S('sv',[]),li:S('li',false),ig:S('ig',false)};

function toast(msg,type){
  var c=document.getElementById('toast-container');
  if(!c)return;
  var t=document.createElement('div');
  t.className='toast '+(type||'info');
  t.textContent=msg;
  c.appendChild(t);
  setTimeout(function(){if(t.parentNode)t.remove()},3000);
}

function confetti(){
  var c=document.getElementById('confetti-container');
  if(!c)return;
  var cols=['#ffffff','#cccccc','#737373','#a3a3a3'];
  for(var i=0;i<20;i++){
    (function(i){
      setTimeout(function(){
        var p=document.createElement('div');
        p.className='confetti';
        var s=5+Math.random()*8;
        p.style.cssText='left:'+Math.random()*100+'%;width:'+s+'px;height:'+s+'px;background:'+cols[i%cols.length]+';animation-duration:'+(2+Math.random()*2)+'s;';
        c.appendChild(p);
        setTimeout(function(){if(p.parentNode)p.remove()},4000);
      },Math.random()*500);
    })(i);
  }
}

function initMatrix(){
  var cv=document.getElementById('matrix-bg');
  if(!cv)return;
  var cx=cv.getContext('2d');
  function rs(){cv.width=window.innerWidth;cv.height=window.innerHeight;}
  rs();window.addEventListener('resize',rs);
  var ch='0123456789ABCDEF';
  var co=Math.floor(cv.width/30);
  var dr=[];for(var i=0;i<co;i++)dr[i]=1;
  function draw(){
    cx.fillStyle='rgba(10,10,15,0.04)';
    cx.fillRect(0,0,cv.width,cv.height);
    cx.fillStyle='#ffffff';
    cx.font='12px monospace';
    for(var i=0;i<dr.length;i++){
      cx.fillText(ch[Math.floor(Math.random()*ch.length)],i*30,dr[i]*15);
      if(dr[i]*15>cv.height&&Math.random()>0.975)dr[i]=0;
      dr[i]++;
    }
  }
  setInterval(draw,50);
}

function loadData(cb){
  var done=false;
  var p=3;
  function check(){p--;if(p===0&&!done){done=true;cb();}}
  fetch('curriculum.json').then(function(r){if(!r.ok)throw 'err';return r.json()}).then(function(d){st.cur=d;check()}).catch(check);
  fetch('challenges.json').then(function(r){if(!r.ok)throw 'err';return r.json()}).then(function(d){st.ch=d;check()}).catch(check);
  fetch('cheatsheet.json').then(function(r){if(!r.ok)throw 'err';return r.json()}).then(function(d){st.cs=d;check()}).catch(check);
  setTimeout(function(){if(!done){done=true;cb();}},3000);
}

function showLogin(){
  var el=document.getElementById('app');
  el.innerHTML='<div class="login-screen"><div class="login-box"><div class="login-logo">[ CYBERSEC ]</div><div class="login-subtitle">Learning Portfolio</div><input type="password" class="login-input" id="access-code" placeholder="Enter access code"><button class="login-btn" id="login-btn">ENTER</button><div class="login-error" id="login-error"></div><button class="login-guest" id="guest-btn">Continue as Guest</button><div class="login-hint">Access code: irfan123</div></div></div>';
  var inp=document.getElementById('access-code');
  var err=document.getElementById('login-error');
  inp.focus();
  document.getElementById('login-btn').onclick=function(){doLogin()};
  inp.onkeypress=function(e){if(e.keyCode===13)doLogin()};
  document.getElementById('guest-btn').onclick=function(){
    st.li=true;st.ig=true;W('li',true);W('ig',true);
    showApp();
  };
  function doLogin(){
    var v=inp.value.trim();
    if(!v){err.textContent='Please enter an access code';err.className='login-error show';return}
    if(v==='irfan123'||v==='admin'){
      st.li=true;st.ig=false;W('li',true);W('ig',false);
      showApp();toast('Welcome back, Irfan!','success');
    }else{
      err.textContent='Invalid access code';err.className='login-error show';inp.value='';inp.focus();
    }
  }
}

function showApp(){
  document.getElementById('app').innerHTML='';
  document.getElementById('navbar').classList.remove('hidden');
  initMatrix();
  initNav();
  document.getElementById('xp-badge').textContent=bt();
  renderPage('dashboard');
}

function initNav(){
  var links=document.querySelectorAll('.nav-link');
  for(var i=0;i<links.length;i++){
    (function(link){
      link.onclick=function(e){
        e.preventDefault();
        for(var j=0;j<links.length;j++)links[j].classList.remove('active');
        link.classList.add('active');
        renderPage(link.getAttribute('data-page'));
        document.getElementById('nav-links').classList.remove('active');
        return false;
      };
    })(links[i]);
  }
  document.getElementById('nav-toggle').onclick=function(){
    document.getElementById('nav-links').classList.toggle('active');
  };
}

function renderPage(pg){
  var el=document.getElementById('app');
  el.innerHTML='';
  switch(pg){
    case 'dashboard':renderDashboard(el);break;
    case 'path':renderPath(el);break;
    case 'curriculum':renderCurriculum(el);break;
    case 'challenges':renderChallenges(el);break;
    case 'cheatsheet':renderCheatsheet(el);break;
    case 'projects':renderProjects(el);break;
    case 'admin':renderAdmin(el);break;
  }
}

function renderDashboard(el){
  var x=gx(),l=gl(),t=gt(),pr=gp();
  var ph=st.cur?st.cur.phases:[];
  var cm=0,tm=0;
  for(var i=0;i<ph.length;i++){tm+=ph[i].modules.length;for(var j=0;j<ph[i].modules.length;j++){if(st.pr[ph[i].modules[j].id])cm++;}}
  var sc=st.sv.length;

  var s='';
  s+='<div class="dashboard-welcome"><h1 class="welcome-text">Welcome back, <span class="text-white">Irfan</span></h1>';
  s+='<p class="welcome-subtitle">Level '+l+' '+t+' - '+x+' XP</p></div>';
  s+='<div class="stats-grid">';
  s+='<div class="stat-card"><div class="stat-icon">X</div><div class="stat-value">'+x+'</div><div class="stat-label">Total XP</div></div>';
  s+='<div class="stat-card"><div class="stat-icon">L</div><div class="stat-value">'+l+'</div><div class="stat-label">Level</div></div>';
  s+='<div class="stat-card"><div class="stat-icon">M</div><div class="stat-value">'+cm+'/'+tm+'</div><div class="stat-label">Modules</div></div>';
  s+='<div class="stat-card"><div class="stat-icon">C</div><div class="stat-value">'+sc+'/20</div><div class="stat-label">Challenges</div></div>';
  s+='</div>';
  s+='<div class="progress-section"><h2 class="section-title">Progress</h2>';
  s+='<div class="progress-container"><div class="progress-bar" style="width:'+pr.p+'%"></div></div>';
  s+='<div class="progress-info"><span>'+pr.c+' / '+pr.n+' XP to next level</span><span>'+Math.round(pr.p)+'%</span></div></div>';
  s+='<div class="card"><h2 class="section-title">Activity</h2>';
  s+='<div class="activity-list"><div class="activity-item"><div class="activity-icon">&gt;</div><div class="activity-content"><div class="activity-title">Learning journey started</div><div class="activity-time">Just now</div></div></div></div></div>';
  el.innerHTML=s;
}

function renderPath(el){
  var ph=st.cur?st.cur.phases:[];
  var s='<h1 class="section-title">Learning Path</h1><p class="mb-3 text-dim">Complete each phase to unlock the next.</p><div class="path-container">';
  for(var i=0;i<ph.length;i++){
    var p=ph[i];
    var pp=getPhaseProg(p);
    var locked=p.status==='locked'&&i>0&&!isPhaseDone(ph[i-1]);
    var sc=pp===100?'status-completed':p.status==='active'?'status-active':'status-locked';
    var st2=pp===100?'DONE':p.status==='active'?'ACTIVE':'LOCKED';
    s+='<div class="path-node '+(locked?'locked':'')+' '+(pp===100?'completed':'')+'" data-pidx="'+i+'">';
    s+='<div class="path-node-header"><h3 class="path-node-title">'+p.icon+' '+p.title+'</h3>';
    s+='<span class="path-node-status '+sc+'">'+st2+'</span></div>';
    s+='<p class="path-node-desc">'+p.description+'</p>';
    s+='<div class="path-node-modules">';
    var n=Math.min(3,p.modules.length);
    for(var j=0;j<n;j++)s+='<span class="module-tag">'+p.modules[j].title+'</span>';
    if(p.modules.length>3)s+='<span class="module-tag">+'+(p.modules.length-3)+'</span>';
    s+='</div></div>';
    if(i<ph.length-1)s+='<div class="path-connector"></div>';
  }
  s+='</div>';
  el.innerHTML=s;
  var nodes=el.querySelectorAll('.path-node');
  for(var i=0;i<nodes.length;i++){
    (function(node){
      node.onclick=function(){
        if(node.classList.contains('locked'))return;
        renderPage('curriculum');
      };
    })(nodes[i]);
  }
}

function renderCurriculum(el){
  var ph=st.cur?st.cur.phases:[];
  if(!ph.length){el.innerHTML='<h1 class="section-title">Curriculum</h1><p class="text-dim">Loading data...</p>';return;}
  var s='<h1 class="section-title">Curriculum</h1><div class="curriculum-tabs">';
  for(var i=0;i<ph.length;i++){
    s+='<button class="tab-btn '+(i===0?'active':'')+'" data-tidx="'+i+'">'+ph[i].icon+' '+ph[i].title+'</button>';
  }
  s+='</div><div id="mod-list">'+renderMods(ph[0])+'</div>';
  el.innerHTML=s;

  var tabs=el.querySelectorAll('.tab-btn');
  for(var i=0;i<tabs.length;i++){
    (function(tab){
      tab.onclick=function(){
        var idx=parseInt(tab.getAttribute('data-tidx'));
        var all=el.querySelectorAll('.tab-btn');
        for(var j=0;j<all.length;j++)all[j].classList.remove('active');
        tab.classList.add('active');
        document.getElementById('mod-list').innerHTML=renderMods(ph[idx]);
        wireMods();
      };
    })(tabs[i]);
  }
  wireMods();
}

function renderMods(phase){
  if(!phase||!phase.modules)return '';
  var s='';
  for(var i=0;i<phase.modules.length;i++){
    var m=phase.modules[i];
    var done=st.pr[m.id];
    s+='<div class="module-item '+(done?'completed':'')+'" data-mid="'+m.id+'">';
    s+='<div class="module-checkbox"></div>';
    s+='<div class="module-info"><div class="module-number">Module '+m.number+'</div><div class="module-title">'+m.title+'</div></div>';
    s+='<span class="module-xp">'+m.xp+' XP</span></div>';
    s+='<div class="module-detail" id="detail-'+m.id+'"><div class="module-content">';
    s+='<h3>'+m.title+'</h3>';
    if(m.videoId){
      s+='<div class="module-video"><iframe width="100%" height="177" src="https://www.youtube.com/embed/'+m.videoId+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
    }
    s+='<p>'+m.content.intro+'</p>';
    s+='<h4 class="mt-2 mb-1">Key Concepts</h4><ul>';
    for(var j=0;j<m.content.concepts.length;j++)s+='<li>'+m.content.concepts[j]+'</li>';
    s+='</ul>';
    if(m.content.commands.length>0){
      s+='<h4 class="mt-2 mb-1">Commands</h4><pre><code>';
      for(var j=0;j<m.content.commands.length;j++)s+=m.content.commands[j].cmd+' # '+m.content.commands[j].desc+'\n';
      s+='</code></pre>';
    }
    s+='<h4 class="mt-2 mb-1">Practice</h4><ul>';
    for(var j=0;j<m.content.practice.length;j++)s+='<li>'+m.content.practice[j]+'</li>';
    s+='</ul>';
    s+='<button class="btn btn-primary mt-2 complete-btn" data-cmid="'+m.id+'" data-cxp="'+m.xp+'">'+(done?'Completed':'Mark Complete')+'</button>';
    s+='</div></div>';
  }
  return s;
}

function wireMods(){
  var items=document.querySelectorAll('.module-item');
  for(var i=0;i<items.length;i++){
    (function(item){
      item.onclick=function(e){
        if(e.target.classList.contains('complete-btn')||e.target.closest&&e.target.closest('.complete-btn'))return;
        var mid=item.getAttribute('data-mid');
        var det=document.getElementById('detail-'+mid);
        if(det){
          var isActive=det.classList.contains('active');
          var all=document.querySelectorAll('.module-detail');
          for(var j=0;j<all.length;j++)all[j].classList.remove('active');
          if(!isActive)det.classList.add('active');
        }
      };
    })(items[i]);
  }
  var btns=document.querySelectorAll('.complete-btn');
  for(var i=0;i<btns.length;i++){
    (function(btn){
      btn.onclick=function(e){
        e.preventDefault();e.stopPropagation();
        var mid=btn.getAttribute('data-cmid');
        var xp=parseInt(btn.getAttribute('data-cxp'));
        if(st.pr[mid])return;
        st.pr[mid]=true;W('pr',st.pr);
        var r=axp(xp);
        document.getElementById('xp-badge').textContent=bt();
        toast('Module completed! +'+xp+' XP','success');confetti();
        if(r.lu)setTimeout(function(){toast('Level Up! Level '+r.nl+'!','success')},1000);
        renderPage('curriculum');
      };
    })(btns[i]);
  }
}

function renderChallenges(el){
  var chs=st.ch?st.ch.challenges:[];
  var s='<h1 class="section-title">Challenges</h1>';
  s+='<div class="challenges-filter"><button class="filter-btn active" data-fl="all">All</button><button class="filter-btn" data-fl="easy">Easy</button><button class="filter-btn" data-fl="medium">Medium</button><button class="filter-btn" data-fl="hard">Hard</button></div>';
  s+='<div class="challenges-grid" id="ch-grid">'+renderCC(chs)+'</div>';
  el.innerHTML=s;
  wireCF(el,chs);
  wireCS();
}

function renderCC(chs){
  var s='';
  for(var i=0;i<chs.length;i++){
    var ch=chs[i];
    var sv=st.sv.indexOf(ch.id)!==-1;
    s+='<div class="challenge-card '+(sv?'solved':'')+'">';
    s+='<span class="challenge-difficulty">'+ch.difficulty+'</span>';
    s+='<h3 class="challenge-title">'+ch.title+'</h3>';
    s+='<p class="challenge-desc">'+ch.description+'</p>';
    s+='<p class="challenge-xp">'+ch.xp+' XP</p>';
    if(!sv){
      s+='<div class="challenge-input"><input type="text" id="inp-'+ch.id+'" placeholder="Enter answer..."><button id="sub-'+ch.id+'">Submit</button></div>';
      s+='<div class="challenge-feedback" id="fb-'+ch.id+'"></div>';
    }else{
      s+='<p class="text-white mt-1" style="font-size:0.8rem">Solved</p>';
    }
    s+='</div>';
  }
  return s;
}

function wireCF(el,chs){
  var btns=el.querySelectorAll('.filter-btn');
  for(var i=0;i<btns.length;i++){
    (function(btn){
      btn.onclick=function(){
        var all=el.querySelectorAll('.filter-btn');
        for(var j=0;j<all.length;j++)all[j].classList.remove('active');
        btn.classList.add('active');
        var f=btn.getAttribute('data-fl');
        var list=f==='all'?chs:chs.filter(function(c){return c.difficulty===f});
        document.getElementById('ch-grid').innerHTML=renderCC(list);
        wireCS();
      };
    })(btns[i]);
  }
}

function wireCS(){
  for(var i=0;i<st.ch.challenges.length;i++){
    var ch=st.ch.challenges[i];
    var sub=document.getElementById('sub-'+ch.id);
    var inp=document.getElementById('inp-'+ch.id);
    if(sub)(function(ch,sub,inp){
      sub.onclick=function(){doAnswer(ch,inp)};
    })(ch,sub,inp);
    if(inp)(function(ch,sub,inp){
      inp.onkeypress=function(e){if(e.keyCode===13)doAnswer(ch,inp)};
    })(ch,sub,inp);
  }
}

function doAnswer(ch,inp){
  var fb=document.getElementById('fb-'+ch.id);
  var ans=inp.value.trim().toLowerCase();
  var correct=ch.answer.toLowerCase();
  var alts=(ch.altAnswers||[]).map(function(a){return a.toLowerCase()});
  if(ans===correct||alts.indexOf(ans)!==-1){
    st.sv.push(ch.id);W('sv',st.sv);
    var r=axp(ch.xp);
    document.getElementById('xp-badge').textContent=bt();
    fb.className='challenge-feedback show correct';
    fb.textContent='Correct! +'+ch.xp+' XP';
    confetti();toast('Challenge solved! +'+ch.xp+' XP','success');
    if(r.lu)setTimeout(function(){toast('Level Up! Level '+r.nl+'!','success')},1000);
    setTimeout(function(){renderPage('challenges')},1500);
  }else{
    fb.className='challenge-feedback show incorrect';
    fb.textContent='Incorrect. Try again.';
  }
}

function renderCheatsheet(el){
  var cats=['All','Linux','Networking','Nmap','Crypto','Web','Tools'];
  var chs=st.cs?st.cs.cheats:[];
  var s='<h1 class="section-title">Cheat Sheet</h1>';
  s+='<div class="cheatsheet-search"><input type="text" id="cs-search" placeholder="Search commands..."></div>';
  s+='<div class="cheatsheet-categories">';
  for(var i=0;i<cats.length;i++)s+='<button class="category-btn '+(i===0?'active':'')+'" data-cc="'+cats[i]+'">'+cats[i]+'</button>';
  s+='</div><div class="cheatsheet-list" id="cs-list">'+renderCI(chs)+'</div>';
  el.innerHTML=s;

  var search=document.getElementById('cs-search');
  if(search)search.oninput=function(){
    var q=this.value.toLowerCase();
    var f=chs.filter(function(c){return c.command.toLowerCase().indexOf(q)!==-1||c.description.toLowerCase().indexOf(q)!==-1});
    document.getElementById('cs-list').innerHTML=renderCI(f);wireCC();
  };

  var catBtns=el.querySelectorAll('.category-btn');
  for(var i=0;i<catBtns.length;i++){
    (function(btn){
      btn.onclick=function(){
        for(var j=0;j<catBtns.length;j++)catBtns[j].classList.remove('active');
        btn.classList.add('active');
        var cat=btn.getAttribute('data-cc');
        var f=cat==='All'?chs:chs.filter(function(c){return c.category===cat});
        document.getElementById('cs-list').innerHTML=renderCI(f);wireCC();
      };
    })(catBtns[i]);
  }
  wireCC();
}

function renderCI(chs){
  var s='';
  for(var i=0;i<chs.length;i++){
    s+='<div class="cheat-item"><div class="cheat-header"><code class="cheat-command">'+chs[i].command+'</code><span class="cheat-category">'+chs[i].category+'</span></div><p class="cheat-desc">'+chs[i].description+'</p></div>';
  }
  return s;
}

function wireCC(){
  var cmds=document.querySelectorAll('.cheat-command');
  for(var i=0;i<cmds.length;i++){
    (function(cmd){
      cmd.onclick=function(){
        var orig=cmd.textContent;
        navigator.clipboard.writeText(orig);
        cmd.textContent='Copied!';cmd.classList.add('copied');
        setTimeout(function(){cmd.textContent=orig;cmd.classList.remove('copied')},1000);
      };
    })(cmds[i]);
  }
}

function renderProjects(el){
  el.innerHTML='<h1 class="section-title">Projects</h1><p class="mb-3 text-dim">Showcase your work and achievements.</p>'+
    '<div class="projects-grid">'+
    '<div class="project-card"><div class="project-content"><h3 class="project-title">Network Scan Report</h3><p class="project-desc">Nmap scan of local network.</p><div class="project-tags"><span class="project-tag">Nmap</span><span class="project-tag">Networking</span></div></div></div>'+
    '<div class="project-card"><div class="project-content"><h3 class="project-title">Password Cracking Lab</h3><p class="project-desc">Hash cracking with John.</p><div class="project-tags"><span class="project-tag">John</span><span class="project-tag">Crypto</span></div></div></div>'+
    '<div class="project-card"><div class="project-content"><h3 class="project-title">Web App Testing</h3><p class="project-desc">Security assessment of vulnerable web app.</p><div class="project-tags"><span class="project-tag">Burp Suite</span><span class="project-tag">Web</span></div></div></div>'+
    '</div>';
}

function renderAdmin(el){
  el.innerHTML='<h1 class="section-title">Admin Panel</h1><div class="admin-login"><div class="card">'+
    '<h3 class="mb-2" style="color:var(--white)">Settings</h3>'+
    '<p class="mb-2 text-dim" style="font-size:0.8rem">Status: '+(st.ig?'Guest':'Logged In as Irfan')+'</p>'+
    '<button class="btn" id="logout-btn">'+(st.li?'Logout':'Login')+'</button>'+
    '</div></div>';
  document.getElementById('logout-btn').onclick=function(){
    localStorage.removeItem(SK+'li');localStorage.removeItem(SK+'ig');
    st.li=false;location.reload();
  };
}

function getPhaseProg(p){var c=0;for(var i=0;i<p.modules.length;i++){if(st.pr[p.modules[i].id])c++;}
  return(c/p.modules.length)*100;}
function isPhaseDone(p){for(var i=0;i<p.modules.length;i++){if(!st.pr[p.modules[i].id])return false;}return true;}

document.addEventListener('DOMContentLoaded',function(){
  if(st.li){
    loadData(function(){showApp()});
  }else{
    loadData(function(){showLogin()});
  }
});
})();
