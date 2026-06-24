(function(){
var SK='cybersec_lab_';
function S(k,d){try{var v=localStorage.getItem(SK+k);return v?JSON.parse(v):d}catch(e){return d}}
function W(k,v){try{localStorage.setItem(SK+k,JSON.stringify(v))}catch(e){}}

var XP_LEVELS=[0,100,250,500,800,1200,1800,2500,3500,5000,7000,10000,14000,19000,25000,32000,40000,50000,65000,80000];
var XP_TITLES=['Newbie','Script Kiddie','Junior Hacker','Security Analyst','Penetration Tester','Security Engineer','Bug Hunter','Red Teamer','Security Architect','Security Expert','Bug Bounty Hunter','CISO','Security Researcher','Cyber Warrior','Elite Hacker','Security Legend','Cyber God','1337 Hacker','Security Master','Ultimate Hacker'];

function getXP(){return S('xp',0)}
function addXP(a){var x=getXP()+a;W('xp',x);var ol=getLevel(),nl=levelFromXP(x);return{levelUp:nl>ol,newLevel:nl,xp:x}}
function levelFromXP(x){var l=0;for(var i=0;i<XP_LEVELS.length&&x>=XP_LEVELS[i];i++)l=i+1;return l}
function getLevel(){return levelFromXP(getXP())}
function getTitle(){return XP_TITLES[Math.min(getLevel()-1,XP_TITLES.length-1)]}
function getProgress(){var x=getXP(),l=getLevel();if(l>=XP_LEVELS.length)return{p:100,c:0,n:0};var prev=XP_LEVELS[l-1]||0,next=XP_LEVELS[l],ci=x-prev,need=next-prev;return{p:Math.min(100,ci/need*100),c:ci,n:need}}
function badgeText(){var x=getXP();return x>=1000?(x/1000).toFixed(1)+'k XP':x+' XP'}

var state={curriculum:null,challenges:null,cheatsheet:null,progress:S('progress',{}),solved:S('solved',[]),loggedIn:S('loggedIn',false),isGuest:S('isGuest',false)};

function toast(msg,type){
  var c=document.getElementById('toast-container');
  var t=document.createElement('div');
  t.className='toast '+(type||'info');
  t.textContent=msg;
  c.appendChild(t);
  setTimeout(function(){t.remove()},3000);
}

function confetti(){
  var c=document.getElementById('confetti-container');
  var cols=['#ffffff','#cccccc','#737373','#a3a3a3'];
  for(var i=0;i<25;i++){
    (function(i){
      setTimeout(function(){
        var p=document.createElement('div');
        p.className='confetti';
        p.style.cssText='left:'+Math.random()*100+'%;width:'+(5+Math.random()*8)+'px;height:'+(5+Math.random()*8)+'px;background:'+cols[i%cols.length]+';animation-duration:'+(2+Math.random()*2)+'s;';
        c.appendChild(p);
        setTimeout(function(){p.remove()},4000);
      },Math.random()*500);
    })(i);
  }
}

function initMatrix(){
  var canvas=document.getElementById('matrix-bg');
  if(!canvas)return;
  var ctx=canvas.getContext('2d');
  function resize(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
  resize();window.addEventListener('resize',resize);
  var chars='0123456789ABCDEF';
  var cols=Math.floor(canvas.width/30);
  var drops=[];for(var i=0;i<cols;i++)drops[i]=1;
  function draw(){
    ctx.fillStyle='rgba(10,10,15,0.04)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#ffffff';
    ctx.font='12px monospace';
    for(var i=0;i<drops.length;i++){
      ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*30,drops[i]*15);
      if(drops[i]*15>canvas.height&&Math.random()>0.975)drops[i]=0;
      drops[i]++;
    }
  }
  setInterval(draw,50);
}

function loadData(cb){
  var pending=3;
  function done(){if(--pending===0)cb()}
  fetch('curriculum.json').then(function(r){return r.json()}).then(function(d){state.curriculum=d;done()}).catch(done);
  fetch('challenges.json').then(function(r){return r.json()}).then(function(d){state.challenges=d;done()}).catch(done);
  fetch('cheatsheet.json').then(function(r){return r.json()}).then(function(d){state.cheatsheet=d;done()}).catch(done);
}

function showLogin(){
  var el=document.getElementById('app');
  el.innerHTML='<div class="login-screen"><div class="login-box"><div class="login-logo">[ CYBERSEC ]</div><div class="login-subtitle">Learning Portfolio</div><input type="password" class="login-input" id="access-code" placeholder="Enter access code"><button class="login-btn" id="login-btn">ENTER</button><div class="login-error" id="login-error">Invalid access code</div><button class="login-guest" id="guest-btn">Continue as Guest</button><div class="login-hint">Access code: irfan123</div></div></div>';
  var input=document.getElementById('access-code');
  var btn=document.getElementById('login-btn');
  var err=document.getElementById('login-error');
  input.addEventListener('keypress',function(e){if(e.key==='Enter')doLogin()});
  btn.addEventListener('click',doLogin);
  document.getElementById('guest-btn').addEventListener('click',function(){
    state.loggedIn=true;state.isGuest=true;W('loggedIn',true);W('isGuest',true);
    showApp();
  });
  function doLogin(){
    var code=input.value.trim();
    if(!code){err.textContent='Please enter an access code';err.classList.add('show');return}
    if(code==='irfan123'||code==='admin'){
      state.loggedIn=true;state.isGuest=false;W('loggedIn',true);W('isGuest',false);
      showApp();toast('Welcome back, Irfan!','success');
    }else{
      err.textContent='Invalid access code';err.classList.add('show');input.value='';input.focus();
    }
  }
}

function showApp(){
  document.getElementById('app').innerHTML='';
  document.getElementById('navbar').classList.remove('hidden');
  initMatrix();
  initNav();
  document.getElementById('xp-badge').textContent=badgeText();
  renderPage('dashboard');
}

function initNav(){
  var links=document.querySelectorAll('.nav-link');
  for(var i=0;i<links.length;i++){
    links[i].addEventListener('click',function(e){
      e.preventDefault();
      for(var j=0;j<links.length;j++)links[j].classList.remove('active');
      this.classList.add('active');
      renderPage(this.getAttribute('data-page'));
      document.getElementById('nav-links').classList.remove('active');
    });
  }
  document.getElementById('nav-toggle').addEventListener('click',function(){
    document.getElementById('nav-links').classList.toggle('active');
  });
}

function renderPage(page){
  var el=document.getElementById('app');
  el.innerHTML='';
  switch(page){
    case 'dashboard':renderDashboard(el);break;
    case 'path':renderPath(el);break;
    case 'curriculum':renderCurriculum(el);break;
    case 'challenges':renderChallenges(el);break;
    case 'cheatsheet':renderCheatsheet(el);break;
    case 'projects':renderProjects(el);break;
    case 'admin':renderAdmin(el);break;
  }
}

function h(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html)e.innerHTML=html;return e}

function renderDashboard(el){
  var x=getXP(),l=getLevel(),t=getTitle(),pr=getProgress();
  var phases=state.curriculum?state.curriculum.phases:[];
  var cm=0,tm=0;
  for(var i=0;i<phases.length;i++){tm+=phases[i].modules.length;for(var j=0;j<phases[i].modules.length;j++){if(state.progress[phases[i].modules[j].id])cm++;}}
  var sc=state.solved.length;

  el.innerHTML=
    '<div class="dashboard-welcome"><h1 class="welcome-text">Welcome back, <span class="text-white">Irfan</span></h1><p class="welcome-subtitle">Level '+l+' '+t+' &mdash; '+x+' XP</p></div>'+
    '<div class="stats-grid">'+
      '<div class="stat-card"><div class="stat-icon">&#9889;</div><div class="stat-value">'+x+'</div><div class="stat-label">Total XP</div></div>'+
      '<div class="stat-card"><div class="stat-icon">&#9673;</div><div class="stat-value">'+l+'</div><div class="stat-label">Level</div></div>'+
      '<div class="stat-card"><div class="stat-icon">&#9670;</div><div class="stat-value">'+cm+'/'+tm+'</div><div class="stat-label">Modules</div></div>'+
      '<div class="stat-card"><div class="stat-icon">&#127942;</div><div class="stat-value">'+sc+'/20</div><div class="stat-label">Challenges</div></div>'+
    '</div>'+
    '<div class="progress-section"><h2 class="section-title">Progress</h2>'+
      '<div class="progress-container"><div class="progress-bar" style="width:'+pr.p+'%"></div></div>'+
      '<div class="progress-info"><span>'+pr.c+' / '+pr.n+' XP to next level</span><span>'+Math.round(pr.p)+'%</span></div>'+
    '</div>'+
    '<div class="card"><h2 class="section-title">Activity</h2>'+
      '<div class="activity-list"><div class="activity-item"><div class="activity-icon">&#9654;</div><div class="activity-content"><div class="activity-title">Learning journey started</div><div class="activity-time">Just now</div></div></div></div>'+
    '</div>';
}

function renderPath(el){
  var phases=state.curriculum?state.curriculum.phases:[];
  var html='<h1 class="section-title">Learning Path</h1><p class="mb-3 text-dim">Complete each phase to unlock the next.</p><div class="path-container">';
  for(var i=0;i<phases.length;i++){
    var p=phases[i];
    var pp=getPhaseProgress(p);
    var locked=p.status==='locked'&&i>0&&!isPhaseDone(phases[i-1]);
    var statusCls=pp===100?'status-completed':p.status==='active'?'status-active':'status-locked';
    var statusTxt=pp===100?'DONE':p.status==='active'?'ACTIVE':'LOCKED';
    html+='<div class="path-node '+(locked?'locked':'')+' '+(pp===100?'completed':'')+'" data-idx="'+i+'">';
    html+='<div class="path-node-header"><h3 class="path-node-title">'+p.icon+' '+p.title+'</h3>';
    html+='<span class="path-node-status '+statusCls+'">'+statusTxt+'</span></div>';
    html+='<p class="path-node-desc">'+p.description+'</p>';
    html+='<div class="path-node-modules">';
    var show=Math.min(3,p.modules.length);
    for(var j=0;j<show;j++)html+='<span class="module-tag">'+p.modules[j].title+'</span>';
    if(p.modules.length>3)html+='<span class="module-tag">+'+(p.modules.length-3)+'</span>';
    html+='</div></div>';
    if(i<phases.length-1)html+='<div class="path-connector"></div>';
  }
  html+='</div>';
  el.innerHTML=html;
}

function renderCurriculum(el){
  var phases=state.curriculum?state.curriculum.phases:[];
  var html='<h1 class="section-title">Curriculum</h1><div class="curriculum-tabs">';
  for(var i=0;i<phases.length;i++){
    html+='<button class="tab-btn '+(i===0?'active':'')+'" data-idx="'+i+'">'+phases[i].icon+' '+phases[i].title+'</button>';
  }
  html+='</div><div class="module-list" id="mod-list">'+renderMods(phases[0])+'</div>';
  el.innerHTML=html;

  var tabs=el.querySelectorAll('.tab-btn');
  for(var i=0;i<tabs.length;i++){
    tabs[i].addEventListener('click',function(){
      var idx=parseInt(this.getAttribute('data-idx'));
      var allTabs=el.querySelectorAll('.tab-btn');
      for(var j=0;j<allTabs.length;j++)allTabs[j].classList.remove('active');
      this.classList.add('active');
      document.getElementById('mod-list').innerHTML=renderMods(phases[idx]);
      wireModClicks();
    });
  }
  wireModClicks();
}

function renderMods(phase){
  var html='';
  for(var i=0;i<phase.modules.length;i++){
    var m=phase.modules[i];
    var done=state.progress[m.id];
    html+='<div class="module-item '+(done?'completed':'')+'" data-mod="'+m.id+'">';
    html+='<div class="module-checkbox"></div>';
    html+='<div class="module-info"><div class="module-number">Module '+m.number+'</div><div class="module-title">'+m.title+'</div></div>';
    html+='<span class="module-xp">'+m.xp+' XP</span></div>';
    html+='<div class="module-detail" id="detail-'+m.id+'"><div class="module-content">';
    html+='<h3>'+m.title+'</h3><p>'+m.content.intro+'</p>';
    html+='<h4 class="mt-2 mb-1">Key Concepts</h4><ul>';
    for(var j=0;j<m.content.concepts.length;j++)html+='<li>'+m.content.concepts[j]+'</li>';
    html+='</ul>';
    if(m.content.commands.length>0){
      html+='<h4 class="mt-2 mb-1">Commands</h4><pre><code>';
      for(var j=0;j<m.content.commands.length;j++)html+=m.content.commands[j].cmd+' # '+m.content.commands[j].desc+'\n';
      html+='</code></pre>';
    }
    html+='<h4 class="mt-2 mb-1">Practice</h4><ul>';
    for(var j=0;j<m.content.practice.length;j++)html+='<li>'+m.content.practice[j]+'</li>';
    html+='</ul>';
    html+='<button class="btn btn-primary mt-2 complete-btn" data-mod="'+m.id+'" data-xp="'+m.xp+'">'+(done?'Completed':'Mark Complete')+'</button>';
    html+='</div></div>';
  }
  return html;
}

function wireModClicks(){
  var items=document.querySelectorAll('.module-item');
  for(var i=0;i<items.length;i++){
    items[i].addEventListener('click',function(e){
      if(e.target.closest('.complete-btn'))return;
      var det=document.getElementById('detail-'+this.getAttribute('data-mod'));
      if(det)det.classList.toggle('active');
    });
  }
  var btns=document.querySelectorAll('.complete-btn');
  for(var i=0;i<btns.length;i++){
    btns[i].addEventListener('click',function(e){
      e.stopPropagation();
      var mid=this.getAttribute('data-mod');
      var xb=parseInt(this.getAttribute('data-xp'));
      if(state.progress[mid])return;
      state.progress[mid]=true;W('progress',state.progress);
      var r=addXP(xb);
      document.getElementById('xp-badge').textContent=badgeText();
      toast('Module completed! +'+xb+' XP','success');confetti();
      if(r.levelUp)setTimeout(function(){toast('Level Up! Level '+r.newLevel+'!','success')},1000);
      renderPage('curriculum');
    });
  }
}

function renderChallenges(el){
  var chs=state.challenges?state.challenges.challenges:[];
  var html='<h1 class="section-title">Challenges</h1>';
  html+='<div class="challenges-filter"><button class="filter-btn active" data-f="all">All</button><button class="filter-btn" data-f="easy">Easy</button><button class="filter-btn" data-f="medium">Medium</button><button class="filter-btn" data-f="hard">Hard</button></div>';
  html+='<div class="challenges-grid" id="ch-grid">'+renderCCards(chs)+'</div>';
  el.innerHTML=html;
  wireChallengeFilter(el,chs);
  wireChallengeSubmit();
}

function renderCCards(chs){
  var html='';
  for(var i=0;i<chs.length;i++){
    var ch=chs[i];
    var solved=state.solved.indexOf(ch.id)!==-1;
    html+='<div class="challenge-card '+(solved?'solved':'')+'">';
    html+='<span class="challenge-difficulty">'+ch.difficulty+'</span>';
    html+='<h3 class="challenge-title">'+ch.title+'</h3>';
    html+='<p class="challenge-desc">'+ch.description+'</p>';
    html+='<p class="challenge-xp">'+ch.xp+' XP</p>';
    if(!solved){
      html+='<div class="challenge-input"><input type="text" data-ch="'+ch.id+'" placeholder="Enter answer..."><button data-sub="'+ch.id+'">Submit</button></div>';
      html+='<div class="challenge-feedback" id="fb-'+ch.id+'"></div>';
    }else{
      html+='<p class="text-white mt-1" style="font-size:0.8rem">Solved</p>';
    }
    html+='</div>';
  }
  return html;
}

function wireChallengeFilter(el,chs){
  var btns=el.querySelectorAll('.filter-btn');
  for(var i=0;i<btns.length;i++){
    btns[i].addEventListener('click',function(){
      var allBtns=el.querySelectorAll('.filter-btn');
      for(var j=0;j<allBtns.length;j++)allBtns[j].classList.remove('active');
      this.classList.add('active');
      var f=this.getAttribute('data-f');
      var list=f==='all'?chs:chs.filter(function(c){return c.difficulty===f});
      document.getElementById('ch-grid').innerHTML=renderCCards(list);
      wireChallengeSubmit();
    });
  }
}

function wireChallengeSubmit(){
  var btns=document.querySelectorAll('[data-sub]');
  for(var i=0;i<btns.length;i++){
    btns[i].addEventListener('click',function(){submitAnswer(this.getAttribute('data-sub'))});
  }
  var inputs=document.querySelectorAll('[data-ch]');
  for(var i=0;i<inputs.length;i++){
    inputs[i].addEventListener('keypress',function(e){if(e.key==='Enter')submitAnswer(this.getAttribute('data-ch'))});
  }
}

function submitAnswer(cid){
  var chs=state.challenges.challenges;
  var ch=null;
  for(var i=0;i<chs.length;i++){if(chs[i].id===cid){ch=chs[i];break;}}
  if(!ch)return;
  var input=document.querySelector('[data-ch="'+cid+'"]');
  var fb=document.getElementById('fb-'+cid);
  var ans=input.value.trim().toLowerCase();
  var correct=ch.answer.toLowerCase();
  var alts=(ch.altAnswers||[]).map(function(a){return a.toLowerCase()});
  if(ans===correct||alts.indexOf(ans)!==-1){
    state.solved.push(cid);W('solved',state.solved);
    var r=addXP(ch.xp);
    document.getElementById('xp-badge').textContent=badgeText();
    fb.className='challenge-feedback show correct';
    fb.textContent='Correct! +'+ch.xp+' XP';
    confetti();toast('Challenge solved! +'+ch.xp+' XP','success');
    if(r.levelUp)setTimeout(function(){toast('Level Up! Level '+r.newLevel+'!','success')},1000);
    setTimeout(function(){renderPage('challenges')},1500);
  }else{
    fb.className='challenge-feedback show incorrect';
    fb.textContent='Incorrect. Try again.';
  }
}

function renderCheatsheet(el){
  var cats=['All','Linux','Networking','Nmap','Crypto','Web','Tools'];
  var cheats=state.cheatsheet?state.cheatsheet.cheats:[];
  var html='<h1 class="section-title">Cheat Sheet</h1>';
  html+='<div class="cheatsheet-search"><input type="text" id="cs-search" placeholder="Search commands..."></div>';
  html+='<div class="cheatsheet-categories">';
  for(var i=0;i<cats.length;i++)html+='<button class="category-btn '+(i===0?'active':'')+'" data-cat="'+cats[i]+'">'+cats[i]+'</button>';
  html+='</div><div class="cheatsheet-list" id="cs-list">'+renderCItems(cheats)+'</div>';
  el.innerHTML=html;

  document.getElementById('cs-search').addEventListener('input',function(){
    var q=this.value.toLowerCase();
    var f=cheats.filter(function(c){return c.command.toLowerCase().indexOf(q)!==-1||c.description.toLowerCase().indexOf(q)!==-1});
    document.getElementById('cs-list').innerHTML=renderCItems(f);wireCopy();
  });

  var catBtns=el.querySelectorAll('.category-btn');
  for(var i=0;i<catBtns.length;i++){
    catBtns[i].addEventListener('click',function(){
      for(var j=0;j<catBtns.length;j++)catBtns[j].classList.remove('active');
      this.classList.add('active');
      var cat=this.getAttribute('data-cat');
      var f=cat==='All'?cheats:cheats.filter(function(c){return c.category===cat});
      document.getElementById('cs-list').innerHTML=renderCItems(f);wireCopy();
    });
  }
  wireCopy();
}

function renderCItems(cheats){
  var html='';
  for(var i=0;i<cheats.length;i++){
    html+='<div class="cheat-item"><div class="cheat-header"><code class="cheat-command">'+cheats[i].command+'</code><span class="cheat-category">'+cheats[i].category+'</span></div><p class="cheat-desc">'+cheats[i].description+'</p></div>';
  }
  return html;
}

function wireCopy(){
  var cmds=document.querySelectorAll('.cheat-command');
  for(var i=0;i<cmds.length;i++){
    cmds[i].addEventListener('click',function(){
      var el=this;var orig=el.textContent;
      navigator.clipboard.writeText(orig);
      el.textContent='Copied!';el.classList.add('copied');
      setTimeout(function(){el.textContent=orig;el.classList.remove('copied')},1000);
    });
  }
}

function renderProjects(el){
  el.innerHTML='<h1 class="section-title">Projects</h1><p class="mb-3 text-dim">Showcase your work and achievements.</p>'+
    '<div class="projects-grid">'+
      '<div class="project-card"><div class="project-image">&#128272;</div><div class="project-content"><h3 class="project-title">Network Scan Report</h3><p class="project-desc">Nmap scan of local network.</p><div class="project-tags"><span class="project-tag">Nmap</span><span class="project-tag">Networking</span></div></div></div>'+
      '<div class="project-card"><div class="project-image">&#128128;</div><div class="project-content"><h3 class="project-title">Password Cracking Lab</h3><p class="project-desc">Hash cracking with John.</p><div class="project-tags"><span class="project-tag">John</span><span class="project-tag">Crypto</span></div></div></div>'+
      '<div class="project-card"><div class="project-image">&#127760;</div><div class="project-content"><h3 class="project-title">Web App Testing</h3><p class="project-desc">Security assessment of vulnerable web app.</p><div class="project-tags"><span class="project-tag">Burp Suite</span><span class="project-tag">Web</span></div></div></div>'+
    '</div>';
}

function renderAdmin(el){
  el.innerHTML='<h1 class="section-title">Admin Panel</h1><div class="admin-login"><div class="card">'+
    '<h3 class="mb-2" style="color:var(--white)">Settings</h3>'+
    '<p class="mb-2 text-dim" style="font-size:0.8rem">Status: '+(state.isGuest?'Guest':'Logged In')+'</p>'+
    '<button class="btn" id="logout-btn">'+(state.loggedIn?'Logout':'Login')+'</button>'+
    '</div></div>';
  document.getElementById('logout-btn').addEventListener('click',function(){
    localStorage.removeItem(SK+'loggedIn');localStorage.removeItem(SK+'isGuest');
    state.loggedIn=false;location.reload();
  });
}

function getPhaseProgress(phase){
  var c=0;for(var i=0;i<phase.modules.length;i++){if(state.progress[phase.modules[i].id])c++;}
  return(c/phase.modules.length)*100;
}
function isPhaseDone(phase){
  for(var i=0;i<phase.modules.length;i++){if(!state.progress[phase.modules[i].id])return false;}return true;
}

document.addEventListener('DOMContentLoaded',function(){
  if(state.loggedIn){
    loadData(function(){showApp()});
  }else{
    showLogin();
  }
});
})();
