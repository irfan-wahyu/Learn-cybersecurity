(function(){
const STORAGE_KEY='cybersec_lab_';
const storage={
  get(k,d=null){try{const v=localStorage.getItem(STORAGE_KEY+k);return v?JSON.parse(v):d}catch(e){return d}},
  set(k,v){try{localStorage.setItem(STORAGE_KEY+k,JSON.stringify(v));return true}catch(e){return false}},
  remove(k){try{localStorage.removeItem(STORAGE_KEY+k);return true}catch(e){return false}}
};
const XP_KEY='xp';
const LEVELS=[0,100,250,500,800,1200,1800,2500,3500,5000,7000,10000,14000,19000,25000,32000,40000,50000,65000,80000];
const TITLES=['Newbie','Script Kiddie','Junior Hacker','Security Analyst','Penetration Tester','Security Engineer','Bug Hunter','Red Teamer','Security Architect','Security Expert','Bug Bounty Hunter','CISO','Security Researcher','Cyber Warrior','Elite Hacker','Security Legend','Cyber God','1337 Hacker','Security Master','Ultimate Hacker'];
const xp={
  getXP(){return storage.get(XP_KEY,0)},
  addXP(a){const c=this.getXP()+a;storage.set(XP_KEY,c);const ol=this.getLevel(),nl=this.getLevelFromXP(c);return nl>ol?{levelUp:true,newLevel:nl,xp:c}:{levelUp:false,xp:c}},
  getLevelFromXP(x){let l=0;for(let i=0;i<LEVELS.length&&x>=LEVELS[i];i++)l=i+1;return l},
  getLevel(){return this.getLevelFromXP(this.getXP())},
  getLevelTitle(){return TITLES[Math.min(this.getLevel()-1,TITLES.length-1)]},
  getProgress(){const x=this.getXP(),l=this.getLevel();if(l>=LEVELS.length)return{p:100,c:0,n:0};const prev=LEVELS[l-1]||0,next=LEVELS[l],ci=x-prev,need=next-prev;return{p:Math.min(100,ci/need*100),c:ci,n:need}},
  badge(){const x=this.getXP();return x>=1000?`${(x/1000).toFixed(1)}k XP`:`${x} XP`}
};

const CURRICULUM={"phases":[{"id":"fundamental","title":"FUNDAMENTAL LINUX","icon":"💻","description":"Master the basics of Linux command line and system","status":"unlocked","modules":[{"id":"mod-1","number":1,"title":"Linux Basic Navigation","xp":100,"description":"Learn pwd, ls, cd, mkdir, and basic directory operations","content":{"intro":"Linux navigation is the foundation of everything in cybersecurity. You must be comfortable moving around the filesystem.","concepts":["pwd - Print Working Directory: shows where you are","ls - List: shows files and folders","cd - Change Directory: move between folders","mkdir - Make Directory: create new folders","rmdir - Remove Directory: delete empty folders"],"commands":[{"cmd":"pwd","desc":"Show current location"},{"cmd":"ls","desc":"List files in current directory"},{"cmd":"ls -la","desc":"List all files including hidden with details"},{"cmd":"cd /home","desc":"Go to /home directory"},{"cmd":"cd ..","desc":"Go up one directory"},{"cmd":"cd ~","desc":"Go to home directory"},{"cmd":"mkdir latihan","desc":"Create folder named 'latihan'"},{"cmd":"rmdir latihan","desc":"Remove empty folder 'latihan'"}],"practice":["Navigate to /tmp and create a folder named 'myfolder'","Go inside 'myfolder' and create 3 files","List all files with details","Go back to your home directory"]}},{"id":"mod-2","number":2,"title":"File Operations","xp":100,"description":"Create, copy, move, and delete files","content":{"intro":"Files are everywhere in Linux. Mastering file operations is essential for daily tasks.","concepts":["touch - Create empty file","cp - Copy file or directory","mv - Move or rename file","rm - Remove file (careful! no undo)","cat - Display file contents"],"commands":[{"cmd":"touch file.txt","desc":"Create empty file"},{"cmd":"cp file.txt backup.txt","desc":"Copy file"},{"cmd":"mv file.txt /tmp/","desc":"Move file to /tmp"},{"cmd":"mv old.txt new.txt","desc":"Rename file"},{"cmd":"rm file.txt","desc":"Delete file"},{"cmd":"cat file.txt","desc":"Show file contents"}],"practice":["Create a file named 'notes.txt' with touch","Copy it to 'notes_backup.txt'","Rename 'notes_backup.txt' to 'backup.txt'","Delete the backup file"]}},{"id":"mod-3","number":3,"title":"File Permissions","xp":150,"description":"Understand and modify file permissions (chmod, chown)","content":{"intro":"Linux permissions control who can read, write, and execute files. Critical for security.","concepts":["r (read) = 4, w (write) = 2, x (execute) = 1","Owner, Group, Others","chmod - Change file mode/permissions","chown - Change file owner"],"commands":[{"cmd":"ls -la","desc":"View permissions"},{"cmd":"chmod 755 script.sh","desc":"rwxr-xr-x"},{"cmd":"chmod 644 file.txt","desc":"rw-r--r--"},{"cmd":"chmod +x script.sh","desc":"Add execute permission"}],"practice":["Create a script.sh and make it executable","Change permissions to 600","View the permission changes with ls -la"]}},{"id":"mod-4","number":4,"title":"User Management","xp":100,"description":"Manage users, groups, and sudo access","content":{"intro":"User management is key for system administration and security.","concepts":["whoami - Current user","sudo - Superuser do","useradd - Create new user","passwd - Change password"],"commands":[{"cmd":"whoami","desc":"Show current user"},{"cmd":"id","desc":"Show user ID and groups"},{"cmd":"sudo su","desc":"Switch to root user"},{"cmd":"exit","desc":"Exit root"}],"practice":["Check who you are with whoami and id","Switch to root with sudo su and back with exit"]}},{"id":"mod-5","number":5,"title":"Process Management","xp":100,"description":"View and manage running processes","content":{"intro":"Processes are running programs. Managing them is crucial for security.","concepts":["ps - Process status","top/htop - Real-time process viewer","kill - Terminate a process","jobs - Background jobs"],"commands":[{"cmd":"ps aux","desc":"Show all running processes"},{"cmd":"top","desc":"Real-time process monitor"},{"cmd":"kill PID","desc":"Kill process by ID"},{"cmd":"kill -9 PID","desc":"Force kill process"}],"practice":["Run 'top' and identify top processes","Find all processes with 'sshd'"]}},{"id":"mod-6","number":6,"title":"Text Processing","xp":150,"description":"grep, sed, awk, and text manipulation","content":{"intro":"Text processing is essential for log analysis and automation.","concepts":["grep - Search text patterns","sed - Stream editor","awk - Pattern scanning","pipe | - Chain commands"],"commands":[{"cmd":"grep 'pattern' file","desc":"Search for pattern"},{"cmd":"grep -i 'error' log.txt","desc":"Case-insensitive search"},{"cmd":"cat file | head -10","desc":"Show first 10 lines"}],"practice":["Search for 'root' in /etc/passwd","Count users in the system"]}},{"id":"mod-7","number":7,"title":"Shell Scripting Basics","xp":200,"description":"Write your first bash scripts","content":{"intro":"Shell scripting automates tasks and is fundamental for pentesting.","concepts":["#!/bin/bash - Shebang","Variables - Store data","if/else - Conditionals","for/while - Loops"],"commands":[{"cmd":"#!/bin/bash","desc":"Script header"},{"cmd":"var=\"hello\"","desc":"Assign variable"},{"cmd":"echo $var","desc":"Print variable"}],"practice":["Create a script that prints your name","Write a script that counts files"]}},{"id":"mod-8","number":8,"title":"Package Management","xp":100,"description":"Install, update, and remove software packages","content":{"intro":"Package management is how you install tools on Linux.","concepts":["apt - Debian/Ubuntu package manager","dpkg - Low-level package manager"],"commands":[{"cmd":"sudo apt update","desc":"Update package list"},{"cmd":"sudo apt install nmap","desc":"Install a package"}],"practice":["Update your system","Install nmap if not already installed"]}]}]},{"id":"networking","title":"NETWORKING BASICS","icon":"🌐","description":"Understand network fundamentals for security","status":"locked","modules":[{"id":"mod-9","number":9,"title":"IP Address & Subnet","xp":150,"description":"Understand IP addressing and subnetting","content":{"intro":"IP addresses are like home addresses for devices on a network.","concepts":["IPv4 vs IPv6","Private vs Public IP","Subnet mask and CIDR notation"],"commands":[{"cmd":"ifconfig","desc":"Show network interfaces"},{"cmd":"ip a","desc":"Show IP addresses"},{"cmd":"ping 8.8.8.8","desc":"Test connectivity"}],"practice":["Find your IP address","Ping google.com"]}},{"id":"mod-10","number":10,"title":"DNS Basics","xp":100,"description":"Domain Name System resolution","content":{"intro":"DNS translates domain names to IP addresses.","concepts":["Domain to IP resolution","DNS records (A, AAAA, MX)","/etc/hosts file"],"commands":[{"cmd":"nslookup google.com","desc":"Query DNS"},{"cmd":"dig google.com","desc":"Detailed DNS query"}],"practice":["Lookup the IP of google.com","Add a custom entry to /etc/hosts"]}},{"id":"mod-11","number":11,"title":"TCP/UDP & Ports","xp":150,"description":"Understand ports, protocols, and connections","content":{"intro":"Ports are like doors to a computer.","concepts":["TCP = reliable (HTTP, SSH)","UDP = fast but unreliable","Common ports: 22, 80, 443"],"commands":[{"cmd":"netstat -tuln","desc":"Show open ports"},{"cmd":"nmap localhost","desc":"Scan own ports"}],"practice":["List all open ports","Identify which ports SSH and HTTP use"]}},{"id":"mod-12","number":12,"title":"Network Commands","xp":100,"description":"Essential network diagnostic tools","content":{"intro":"These tools help diagnose network issues.","concepts":["ping - Test connectivity","traceroute - Trace packet path","curl - Transfer data"],"commands":[{"cmd":"ping -c 4 google.com","desc":"Ping 4 times"},{"cmd":"curl ifconfig.me","desc":"Show public IP"}],"practice":["Ping google.com 10 times","Download a file with wget"]}},{"id":"mod-13","number":13,"title":"Wireshark Basics","xp":200,"description":"Packet capture and analysis","content":{"intro":"Wireshark is a network protocol analyzer.","concepts":["Packet capture (pcap)","Protocol filters","TCP stream following"],"commands":[{"cmd":"tcpdump -i eth0","desc":"Command-line capture"}],"practice":["Capture 10 packets with tcpdump","Filter for HTTP traffic"]}]}]},{"id":"security","title":"SECURITY FUNDAMENTALS","icon":"🔒","description":"Core security concepts and principles","status":"locked","modules":[{"id":"mod-14","number":14,"title":"CIA Triad","xp":100,"description":"Confidentiality, Integrity, Availability","content":{"intro":"The CIA Triad is the foundation of information security.","concepts":["Confidentiality - Only authorized access","Integrity - Data is accurate","Availability - Systems accessible when needed"],"commands":[],"practice":["Identify CIA in real-world scenarios","Design security controls for each component"]}},{"id":"mod-15","number":15,"title":"Authentication & Authorization","xp":150,"description":"Who are you and what can you do?","content":{"intro":"Authentication verifies identity, authorization determines permissions.","concepts":["Something you know/have/are","Multi-factor authentication (MFA)","Principle of least privilege"],"commands":[],"practice":["Compare different auth methods","Set up SSH key-based authentication"]}},{"id":"mod-16","number":16,"title":"Cryptography Basics","xp":200,"description":"Encryption, hashing, and digital signatures","content":{"intro":"Cryptography protects data through mathematical techniques.","concepts":["Symmetric vs Asymmetric encryption","Hashing (MD5, SHA-256)","SSL/TLS"],"commands":[{"cmd":"echo -n 'text' | md5sum","desc":"Generate MD5 hash"},{"cmd":"echo -n 'text' | sha256sum","desc":"Generate SHA256 hash"}],"practice":["Generate hash of a string","Encrypt and decrypt a file"]}},{"id":"mod-17","number":17,"title":"Common Attacks","xp":200,"description":"SQL injection, XSS, phishing, and more","content":{"intro":"Understanding attacks is essential for defense.","concepts":["SQL Injection (SQLi)","Cross-Site Scripting (XSS)","Phishing and Social Engineering","Brute Force attacks"],"commands":[],"practice":["Identify SQL injection in sample code","Test for XSS vulnerabilities"]}]}]},{"id":"offensive","title":"OFFENSIVE SECURITY","icon":"⚔️","description":"Penetration testing and ethical hacking","status":"locked","modules":[{"id":"mod-18","number":18,"title":"Reconnaissance","xp":200,"description":"Information gathering techniques","content":{"intro":"Recon is the first phase of penetration testing.","concepts":["Passive vs Active recon","OSINT","Google dorking","WHOIS enumeration"],"commands":[{"cmd":"whois target.com","desc":"Domain information"}],"practice":["Perform WHOIS lookup","Use Google dorking"]}},{"id":"mod-19","number":19,"title":"Nmap Deep Dive","xp":250,"description":"Master network scanning with Nmap","content":{"intro":"Nmap is the most important tool for network scanning.","concepts":["Scan types (SYN, TCP, UDP)","Service detection","OS detection","NSE scripts"],"commands":[{"cmd":"nmap target.com","desc":"Basic scan"},{"cmd":"nmap -sV -sC target.com","desc":"Version + scripts"},{"cmd":"nmap -O target.com","desc":"OS detection"},{"cmd":"nmap -A target.com","desc":"Aggressive scan"},{"cmd":"nmap -p- target.com","desc":"All ports"}],"practice":["Scan localhost with different options","Identify running services"]}},{"id":"mod-20","number":20,"title":"Metasploit Basics","xp":300,"description":"Exploitation framework introduction","content":{"intro":"Metasploit is the world's most used pentesting framework.","concepts":["Modules (exploit, payload, auxiliary)","Meterpreter sessions","Post-exploitation"],"commands":[{"cmd":"msfconsole","desc":"Launch Metasploit"},{"cmd":"search exploit_name","desc":"Search for exploits"},{"cmd":"use exploit/path","desc":"Select exploit"},{"cmd":"exploit","desc":"Run the exploit"}],"practice":["Search for vsftpd backdoor exploit","Run an exploit against a lab target"]}]}]},{"id":"defensive","title":"DEFENSIVE SECURITY","icon":"🛡️","description":"SOC, Blue Team, and incident response","status":"locked","modules":[{"id":"mod-21","number":21,"title":"Log Analysis","xp":200,"description":"Analyze system and security logs","content":{"intro":"Logs are the eyes and ears of security monitoring.","concepts":["Syslog and journalctl","Authentication logs","SIEM concepts"],"commands":[{"cmd":"journalctl -f","desc":"Follow system logs"},{"cmd":"grep 'error' /var/log/syslog","desc":"Find errors"}],"practice":["Find failed SSH login attempts","Create a log monitoring script"]}},{"id":"mod-22","number":22,"title":"Incident Response","xp":200,"description":"How to respond to security incidents","content":{"intro":"Incident response is a structured approach to handling breaches.","concepts":["Preparation","Detection and Analysis","Containment and Recovery"],"commands":[],"practice":["Create an incident response checklist","Document findings"]}]}]},{"id":"web","title":"WEB SECURITY","icon":"🕸️","description":"Web application security testing","status":"locked","modules":[{"id":"mod-23","number":23,"title":"OWASP Top 10","xp":200,"description":"Most critical web application security risks","content":{"intro":"The OWASP Top 10 lists the most critical web security risks.","concepts":["Injection","Broken Authentication","Cross-Site Scripting (XSS)","Insecure Deserialization"],"commands":[],"practice":["Study each OWASP Top 10 vulnerability","Test against DVWA"]}},{"id":"mod-24","number":24,"title":"Burp Suite Basics","xp":250,"description":"Web application security testing tool","content":{"intro":"Burp Suite is the leading web security testing tool.","concepts":["Proxy setup","Repeater for request manipulation","Intruder for brute force"],"commands":[],"practice":["Configure browser proxy","Intercept and modify HTTP requests"]}]}]},{"id":"ai-security","title":"AI SECURITY","icon":"🤖","description":"AI/ML security and adversarial attacks","status":"locked","modules":[{"id":"mod-25","number":25,"title":"AI Security Fundamentals","xp":200,"description":"Security implications of AI systems","content":{"intro":"As AI becomes prevalent, securing AI systems becomes critical.","concepts":["Adversarial attacks on ML models","Data poisoning","AI-powered attacks"],"commands":[],"practice":["Understand adversarial examples","Analyze AI model vulnerabilities"]}]}]};

const CHALLENGES=[{id:"ch-1",title:"Reverse String",difficulty:"easy",xp:50,description:"Reverse the string 'gnihcah' to get the answer",answer:"hacking",altAnswers:[]},{id:"ch-2",title:"Decode Base64",difficulty:"easy",xp:75,description:"Decode: SGVsbG8gSGFja2Vy",answer:"Hello Hacker",altAnswers:[]},{id:"ch-3",title:"Find the File",difficulty:"easy",xp:50,description:"What command finds all .txt files in /home?",answer:"find /home -name '*.txt'",altAnswers:['find /home -name "*.txt"']},{id:"ch-4",title:"File Permissions",difficulty:"medium",xp:100,description:"What chmod gives read/write to owner, read to others?",answer:"chmod 644",altAnswers:[]},{id:"ch-5",title:"SQL Injection",difficulty:"medium",xp:150,description:"What payload bypasses a login form?",answer:"' OR 1=1 --",altAnswers:["' or 1=1 --","' OR '1'='1"]},{id:"ch-6",title:"Nmap Scan Type",difficulty:"medium",xp:100,description:"What Nmap flag performs a SYN stealth scan?",answer:"-sS",altAnswers:[]},{id:"ch-7",title:"Hash Identification",difficulty:"medium",xp:125,description:"What hash produces 32-character hex output?",answer:"MD5",altAnswers:["md5"]},{id:"ch-8",title:"Port Number",difficulty:"easy",xp:50,description:"What port does SSH use?",answer:"22",altAnswers:[]},{id:"ch-9",title:"Hidden File",difficulty:"easy",xp:50,description:"What prefix makes a file hidden in Linux?",answer:".",altAnswers:["dot"]},{id:"ch-10",title:"CIA Triad",difficulty:"easy",xp:50,description:"What does 'C' stand for in CIA Triad?",answer:"Confidentiality",altAnswers:["confidentiality"]},{id:"ch-11",title:"XSS Payload",difficulty:"hard",xp:200,description:"Basic XSS payload that shows an alert?",answer:"<script>alert(1)</script>",altAnswers:["<script>alert('1')</script>"]},{id:"ch-12",title:"Decode Hex",difficulty:"medium",xp:100,description:"Decode hex: 68656c6c6f",answer:"hello",altAnswers:["Hello","HELLO"]},{id:"ch-13",title:"Process Killer",difficulty:"easy",xp:50,description:"Command to force kill PID 1234?",answer:"kill -9 1234",altAnswers:["kill -9 PID"]},{id:"ch-14",title:"OS Detection",difficulty:"medium",xp:100,description:"Nmap flag for OS detection?",answer:"-O",altAnswers:[]},{id:"ch-15",title:"Password Hashing",difficulty:"hard",xp:175,description:"Tool to crack password hashes?",answer:"John the Ripper",altAnswers:["John","john"]},{id:"ch-16",title:"Brute Force Tool",difficulty:"medium",xp:100,description:"Tool for brute force on network services?",answer:"Hydra",altAnswers:["hydra"]},{id:"ch-17",title:"DNS Lookup",difficulty:"easy",xp:50,description:"Command to query DNS records?",answer:"dig",altAnswers:["nslookup","host"]},{id:"ch-18",title:"Grep Pattern",difficulty:"medium",xp:100,description:"Grep flag for recursive search?",answer:"-r",altAnswers:["-R","--recursive"]},{id:"ch-19",title:"Web Proxy",difficulty:"hard",xp:200,description:"Tool to intercept HTTP/HTTPS traffic?",answer:"Burp Suite",altAnswers:["Burp","burp"]},{id:"ch-20",title:"Privilege Escalation",difficulty:"hard",xp:250,description:"Command to show sudo permissions?",answer:"sudo -l",altAnswers:["sudo -L"]}];

const CHEATSHEET=[
{command:"ls -la",description:"List all files with details and hidden",category:"Linux"},
{command:"cd /path/to/dir",description:"Navigate to a directory",category:"Linux"},
{command:"pwd",description:"Print current working directory",category:"Linux"},
{command:"chmod 755 file",description:"Set rwx for owner, rx for others",category:"Linux"},
{command:"chmod +x script.sh",description:"Make script executable",category:"Linux"},
{command:"cp -r dir1 dir2",description:"Copy directory recursively",category:"Linux"},
{command:"rm -rf directory",description:"Force remove directory",category:"Linux"},
{command:"grep -r 'pattern' /path",description:"Recursive search for pattern",category:"Linux"},
{command:"find / -name '*.txt' 2>/dev/null",description:"Find all .txt files",category:"Linux"},
{command:"ps aux | grep process",description:"Find specific process",category:"Linux"},
{command:"kill -9 PID",description:"Force kill a process",category:"Linux"},
{command:"top",description:"Real-time process monitor",category:"Linux"},
{command:"ifconfig",description:"Show network interfaces",category:"Networking"},
{command:"ip a",description:"Show all IP addresses",category:"Networking"},
{command:"ping -c 4 target.com",description:"Send 4 ICMP echo requests",category:"Networking"},
{command:"traceroute target.com",description:"Trace route to destination",category:"Networking"},
{command:"nslookup domain.com",description:"Query DNS records",category:"Networking"},
{command:"dig domain.com",description:"Detailed DNS query",category:"Networking"},
{command:"netstat -tuln",description:"Show listening ports",category:"Networking"},
{command:"curl ifconfig.me",description:"Show public IP address",category:"Networking"},
{command:"ssh user@host",description:"SSH connect to remote host",category:"Networking"},
{command:"scp file user@host:/path",description:"Copy file via SSH",category:"Networking"},
{command:"nmap target.com",description:"Basic port scan",category:"Nmap"},
{command:"nmap -sV target.com",description:"Detect service versions",category:"Nmap"},
{command:"nmap -sC target.com",description:"Run default scripts",category:"Nmap"},
{command:"nmap -O target.com",description:"OS detection",category:"Nmap"},
{command:"nmap -A target.com",description:"Aggressive scan",category:"Nmap"},
{command:"nmap -p- target.com",description:"Scan all 65535 ports",category:"Nmap"},
{command:"nmap -sS target.com",description:"SYN stealth scan",category:"Nmap"},
{command:"nmap --script vuln target.com",description:"Vulnerability scan with NSE",category:"Nmap"},
{command:"echo -n 'text' | md5sum",description:"Generate MD5 hash",category:"Crypto"},
{command:"echo -n 'text' | sha256sum",description:"Generate SHA256 hash",category:"Crypto"},
{command:"hashid hash_value",description:"Identify hash type",category:"Crypto"},
{command:"echo 'string' | base64 -d",description:"Decode Base64 string",category:"Crypto"},
{command:"john --wordlist=rockyou.txt hash.txt",description:"Crack hashes with wordlist",category:"Crypto"},
{command:"hashcat -m 0 hash.txt rockyou.txt",description:"Crack MD5 with GPU",category:"Crypto"},
{command:"sqlmap -u 'http://target/?id=1' --dbs",description:"SQL injection enumeration",category:"Web"},
{command:"nikto -h target.com",description:"Web server scanner",category:"Web"},
{command:"gobuster dir -u http://target -w wordlist.txt",description:"Directory enumeration",category:"Web"},
{command:"hydra -l admin -P rockyou.txt target ssh",description:"SSH brute force",category:"Tools"},
{command:"whois target.com",description:"Domain registration info",category:"Tools"},
{command:"msfconsole",description:"Launch Metasploit",category:"Tools"},
{command:"tcpdump -i eth0 -w capture.pcap",description:"Capture packets",category:"Tools"}
];

const state={currentPage:'dashboard',progress:storage.get('progress',{}),solvedChallenges:storage.get('solvedChallenges',[]),isLoggedIn:storage.get('isLoggedIn',false),isGuest:storage.get('isGuest',false)};

function toast(msg,type='info'){
  const c=document.getElementById('toast-container');
  const t=document.createElement('div');
  t.className='toast '+type;
  t.textContent=msg;
  c.appendChild(t);
  setTimeout(()=>{t.remove()},3000);
}

function confetti(){
  const c=document.getElementById('confetti-container');
  const colors=['#ffffff','#cccccc','#737373','#a3a3a3','#525252'];
  for(let i=0;i<30;i++){
    setTimeout(()=>{
      const p=document.createElement('div');
      p.className='confetti';
      p.style.cssText='left:'+Math.random()*100+'%;width:'+(5+Math.random()*8)+'px;height:'+(5+Math.random()*8)+'px;background:'+colors[Math.floor(Math.random()*colors.length)]+';animation-delay:'+Math.random()*1+'s;animation-duration:'+(2+Math.random()*2)+'s;';
      c.appendChild(p);
      setTimeout(()=>p.remove(),4000);
    },Math.random()*500);
  }
}

function initMatrix(){
  const canvas=document.getElementById('matrix-bg');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  function resize(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
  resize();window.addEventListener('resize',resize);
  const chars='アイウエオカキクケコサシスセソタチツテト0123456789ABCDEF';
  const cols=Math.floor(canvas.width/30);
  const drops=Array(cols).fill(1);
  function draw(){
    ctx.fillStyle='rgba(10,10,15,0.04)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#ffffff';
    ctx.font='12px monospace';
    for(let i=0;i<drops.length;i++){
      ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*30,drops[i]*15);
      if(drops[i]*15>canvas.height&&Math.random()>0.975)drops[i]=0;
      drops[i]++;
    }
  }
  setInterval(draw,50);
}

function showLogin(){
  document.getElementById('app').innerHTML='<div class="login-screen"><div class="login-box"><div class="login-logo">[ CYBERSEC ]</div><div class="login-subtitle">Learning Portfolio</div><input type="password" class="login-input" id="access-code" placeholder="Enter access code" autocomplete="off"><button class="login-btn" id="login-btn">ENTER</button><div class="login-error" id="login-error">Invalid access code</div><button class="login-guest" id="guest-btn">Continue as Guest</button><div class="login-hint">Access code: irfan123<br>Or click Guest for limited access</div></div></div>';
  const input=document.getElementById('access-code');
  const btn=document.getElementById('login-btn');
  const error=document.getElementById('login-error');
  const guestBtn=document.getElementById('guest-btn');
  input.addEventListener('keypress',e=>{if(e.key==='Enter')doLogin()});
  btn.addEventListener('click',doLogin);
  guestBtn.addEventListener('click',()=>{state.isLoggedIn=true;state.isGuest=true;storage.set('isLoggedIn',true);storage.set('isGuest',true);showApp()});
  function doLogin(){
    const code=input.value.trim();
    if(!code){error.textContent='Please enter an access code';error.classList.add('show');return}
    if(code==='irfan123'||code==='admin'){
      state.isLoggedIn=true;state.isGuest=false;storage.set('isLoggedIn',true);storage.set('isGuest',false);showApp();toast('Welcome back, Irfan!','success');
    }else{error.textContent='Invalid access code';error.classList.add('show');input.value='';input.focus();}
  }
}

function showApp(){
  document.getElementById('app').innerHTML='';
  const nav=document.getElementById('navbar');
  if(nav)nav.classList.remove('hidden');
  initMatrix();
  initNav();
  renderPage('dashboard');
}

function initNav(){
  document.querySelectorAll('.nav-link').forEach(link=>{
    link.addEventListener('click',e=>{
      e.preventDefault();
      document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
      link.classList.add('active');
      renderPage(link.dataset.page);
      document.getElementById('nav-links').classList.remove('active');
    });
  });
  document.getElementById('nav-toggle').addEventListener('click',()=>{
    document.getElementById('nav-links').classList.toggle('active');
  });
}

function renderPage(page){
  state.currentPage=page;
  const el=document.getElementById('app');
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

function renderDashboard(el){
  const x=xp.getXP(),l=xp.getLevel(),t=xp.getLevelTitle(),pr=xp.getProgress();
  const cm=Object.keys(state.progress).filter(k=>state.progress[k]).length;
  const tm=CURRICULUM.phases.reduce((a,p)=>a+p.modules.length,0);
  const sc=state.solvedChallenges.length;
  el.innerHTML=`<div class="dashboard-welcome"><h1 class="welcome-text">Welcome back, <span class="text-white">Irfan</span></h1><p class="welcome-subtitle">Level ${l} ${t} — ${x} XP accumulated</p></div><div class="stats-grid"><div class="stat-card"><div class="stat-icon">⚡</div><div class="stat-value">${x}</div><div class="stat-label">Total XP</div></div><div class="stat-card"><div class="stat-icon">◉</div><div class="stat-value">${l}</div><div class="stat-label">Level</div></div><div class="stat-card"><div class="stat-icon">◈</div><div class="stat-value">${cm}/${tm}</div><div class="stat-label">Modules</div></div><div class="stat-card"><div class="stat-icon">🏆</div><div class="stat-value">${sc}/20</div><div class="stat-label">Challenges</div></div></div><div class="progress-section"><h2 class="section-title">Progress</h2><div class="progress-container"><div class="progress-bar" style="width:${pr.p}%"></div></div><div class="progress-info"><span>${pr.c} / ${pr.n} XP to next level</span><span>${Math.round(pr.p)}%</span></div></div><div class="card"><h2 class="section-title">Activity</h2><div class="activity-list"><div class="activity-item"><div class="activity-icon">►</div><div class="activity-content"><div class="activity-title">Learning journey started</div><div class="activity-time">Just now</div></div></div></div></div>`;
}

function renderPath(el){
  const phases=CURRICULUM.phases;
  el.innerHTML=`<h1 class="section-title">Learning Path</h1><p class="mb-3 text-dim">Complete each phase to unlock the next.</p><div class="path-container">${phases.map((p,i)=>{
    const pp=getPhaseProgress(p);const locked=p.status==='locked'&&i>0&&!isPhaseCompleted(phases[i-1]);
    return `<div class="path-node ${locked?'locked':''} ${pp===100?'completed':''} ${p.status==='active'?'active':''}" data-phase="${p.id}"><div class="path-node-header"><h3 class="path-node-title">${p.icon} ${p.title}</h3><span class="path-node-status ${pp===100?'status-completed':p.status==='active'?'status-active':'status-locked'}">${pp===100?'✓ DONE':p.status==='active'?'► ACTIVE':'LOCKED'}</span></div><p class="path-node-desc">${p.description}</p><div class="path-node-modules">${p.modules.slice(0,3).map(m=>`<span class="module-tag">${m.title}</span>`).join('')}${p.modules.length>3?`<span class="module-tag">+${p.modules.length-3}</span>`:''}</div></div>${i<phases.length-1?'<div class="path-connector"></div>':''}`;
  }).join('')}</div>`;
}

function renderCurriculum(el){
  const phases=CURRICULUM.phases;
  el.innerHTML=`<h1 class="section-title">Curriculum</h1><div class="curriculum-tabs">${phases.map((p,i)=>`<button class="tab-btn ${i===0?'active':''}" data-phase="${p.id}">${p.icon} ${p.title}</button>`).join('')}</div><div class="module-list" id="module-list">${renderMods(phases[0])}</div>`;
  el.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const phase=phases.find(p=>p.id===btn.dataset.phase);
      el.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('module-list').innerHTML=renderMods(phase);
      initModClicks();
    });
  });
  initModClicks();
}

function renderMods(phase){
  return phase.modules.map(m=>{
    const done=state.progress[m.id];
    return `<div class="module-item ${done?'completed':''}" data-module="${m.id}"><div class="module-checkbox"></div><div class="module-info"><div class="module-number">Module ${m.number}</div><div class="module-title">${m.title}</div></div><span class="module-xp">${m.xp} XP</span></div><div class="module-detail" id="detail-${m.id}"><div class="module-content"><h3>${m.title}</h3><p>${m.content.intro}</p><h4 class="mt-2 mb-1">Key Concepts</h4><ul>${m.content.concepts.map(c=>`<li>${c}</li>`).join('')}</ul>${m.content.commands.length?`<h4 class="mt-2 mb-1">Commands</h4><pre><code>${m.content.commands.map(c=>c.cmd+' # '+c.desc).join('\n')}</code></pre>`:''}<h4 class="mt-2 mb-1">Practice</h4><ul>${m.content.practice.map(p=>`<li>${p}</li>`).join('')}</ul><button class="btn btn-primary mt-2 complete-btn" data-module="${m.id}" data-xp="${m.xp}">${done?'✓ Completed':'Mark Complete'}</button></div></div>`;
  }).join('');
}

function initModClicks(){
  document.querySelectorAll('.module-item').forEach(item=>{
    item.addEventListener('click',e=>{
      if(e.target.closest('.complete-btn'))return;
      document.getElementById('detail-'+item.dataset.module).classList.toggle('active');
    });
  });
  document.querySelectorAll('.complete-btn').forEach(btn=>{
    btn.addEventListener('click',e=>{
      e.stopPropagation();
      const mid=btn.dataset.module,xb=parseInt(btn.dataset.xp);
      if(state.progress[mid])return;
      state.progress[mid]=true;storage.set('progress',state.progress);
      const r=xp.addXP(xb);toast('Module completed! +'+xb+' XP','success');confetti();
      if(r.levelUp)setTimeout(()=>toast('Level Up! Level '+r.newLevel+'!','success'),1000);
      document.getElementById('xp-badge').textContent=xp.badge();
      renderPage(state.currentPage);
    });
  });
}

function renderChallenges(el){
  el.innerHTML=`<h1 class="section-title">Challenges</h1><div class="challenges-filter"><button class="filter-btn active" data-f="all">All</button><button class="filter-btn" data-f="easy">Easy</button><button class="filter-btn" data-f="medium">Medium</button><button class="filter-btn" data-f="hard">Hard</button></div><div class="challenges-grid" id="challenges-grid">${CHALLENGES.map(renderCC).join('')}</div>`;
  el.querySelectorAll('.filter-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      el.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f=btn.dataset.f;
      const list=f==='all'?CHALLENGES:CHALLENGES.filter(c=>c.difficulty===f);
      document.getElementById('challenges-grid').innerHTML=list.map(renderCC).join('');
      initChallengeSubmit();
    });
  });
  initChallengeSubmit();
}

function renderCC(ch){
  const solved=state.solvedChallenges.includes(ch.id);
  return `<div class="challenge-card ${solved?'solved':''}"><span class="challenge-difficulty">${ch.difficulty}</span><h3 class="challenge-title">${ch.title}</h3><p class="challenge-desc">${ch.description}</p><p class="challenge-xp">${ch.xp} XP</p>${!solved?`<div class="challenge-input"><input type="text" data-ch="${ch.id}" placeholder="Enter answer..."><button data-sub="${ch.id}">Submit</button></div><div class="challenge-feedback" id="fb-${ch.id}"></div>`:'<p class="text-white mt-1" style="font-size:0.8rem">✓ Solved</p>'}</div>`;
}

function initChallengeSubmit(){
  document.querySelectorAll('[data-sub]').forEach(btn=>{
    btn.addEventListener('click',()=>submitAnswer(btn.dataset.sub));
  });
  document.querySelectorAll('[data-ch]').forEach(input=>{
    input.addEventListener('keypress',e=>{if(e.key==='Enter')submitAnswer(input.dataset.ch)});
  });
}

function submitAnswer(cid){
  const ch=CHALLENGES.find(c=>c.id===cid);
  const input=document.querySelector('[data-ch="'+cid+'"]');
  const fb=document.getElementById('fb-'+cid);
  const ans=input.value.trim().toLowerCase();
  const correct=ch.answer.toLowerCase();
  const alts=(ch.altAnswers||[]).map(a=>a.toLowerCase());
  if(ans===correct||alts.includes(ans)){
    state.solvedChallenges.push(cid);storage.set('solvedChallenges',state.solvedChallenges);
    const r=xp.addXP(ch.xp);document.getElementById('xp-badge').textContent=xp.badge();
    fb.className='challenge-feedback show correct';fb.textContent='✓ Correct! +'+ch.xp+' XP';
    confetti();toast('Challenge solved! +'+ch.xp+' XP','success');
    if(r.levelUp)setTimeout(()=>toast('Level Up! Level '+r.newLevel+'!','success'),1000);
    setTimeout(()=>renderPage('challenges'),1500);
  }else{fb.className='challenge-feedback show incorrect';fb.textContent='✗ Incorrect. Try again.';}
}

function renderCheatsheet(el){
  const cats=['All','Linux','Networking','Nmap','Crypto','Web','Tools'];
  el.innerHTML=`<h1 class="section-title">Cheat Sheet</h1><div class="cheatsheet-search"><input type="text" id="cs-search" placeholder="Search commands..."></div><div class="cheatsheet-categories">${cats.map(c=>`<button class="category-btn ${c==='All'?'active':''}" data-cat="${c}">${c}</button>`).join('')}</div><div class="cheatsheet-list" id="cs-list">${CHEATSHEET.map(ci=>renderCI(ci)).join('')}</div>`;
  document.getElementById('cs-search').addEventListener('input',e=>{
    const q=e.target.value.toLowerCase();
    const f=CHEATSHEET.filter(c=>c.command.toLowerCase().includes(q)||c.description.toLowerCase().includes(q));
    document.getElementById('cs-list').innerHTML=f.map(ci=>renderCI(ci)).join('');
    initCopy();
  });
  el.querySelectorAll('.category-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      el.querySelectorAll('.category-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const cat=btn.dataset.cat;
      const f=cat==='All'?CHEATSHEET:CHEATSHEET.filter(c=>c.category===cat);
      document.getElementById('cs-list').innerHTML=f.map(ci=>renderCI(ci)).join('');
      initCopy();
    });
  });
  initCopy();
}

function renderCI(c){
  return `<div class="cheat-item"><div class="cheat-header"><code class="cheat-command">${c.command}</code><span class="cheat-category">${c.category}</span></div><p class="cheat-desc">${c.description}</p></div>`;
}

function initCopy(){
  document.querySelectorAll('.cheat-command').forEach(cmd=>{
    cmd.addEventListener('click',()=>{
      navigator.clipboard.writeText(cmd.textContent);
      const orig=cmd.textContent;cmd.textContent='Copied!';cmd.classList.add('copied');
      setTimeout(()=>{cmd.textContent=orig;cmd.classList.remove('copied')},1000);
    });
  });
}

function renderProjects(el){
  el.innerHTML=`<h1 class="section-title">Projects</h1><p class="mb-3 text-dim">Showcase your work and achievements.</p><div class="projects-grid"><div class="project-card"><div class="project-image">🔐</div><div class="project-content"><h3 class="project-title">Network Scan Report</h3><p class="project-desc">Nmap scan of local network with service detection.</p><div class="project-tags"><span class="project-tag">Nmap</span><span class="project-tag">Networking</span></div></div></div><div class="project-card"><div class="project-image">💀</div><div class="project-content"><h3 class="project-title">Password Cracking Lab</h3><p class="project-desc">Hash cracking practice with John the Ripper.</p><div class="project-tags"><span class="project-tag">John</span><span class="project-tag">Crypto</span></div></div></div><div class="project-card"><div class="project-image">🌐</div><div class="project-content"><h3 class="project-title">Web App Testing</h3><p class="project-desc">Security assessment of a vulnerable web app.</p><div class="project-tags"><span class="project-tag">Burp Suite</span><span class="project-tag">Web</span></div></div></div></div>`;
}

function renderAdmin(el){
  el.innerHTML=`<h1 class="section-title">Admin Panel</h1><div class="admin-login"><div class="card"><h3 class="mb-2" style="color:var(--white)">Settings</h3><p class="mb-2 text-dim" style="font-size:0.8rem">Manage your learning profile.</p><div class="form-group"><label>Status</label><p style="color:var(--white);font-size:0.85rem">${state.isGuest?'Guest Mode':'Logged In'}</p></div><button class="btn" id="logout-btn" style="border-color:var(--gray-600)">${state.isLoggedIn?'Logout':'Login'}</button></div></div>`;
  document.getElementById('logout-btn').addEventListener('click',()=>{
    storage.remove('isLoggedIn');storage.remove('isGuest');
    state.isLoggedIn=false;location.reload();
  });
}

function getPhaseProgress(phase){const c=phase.modules.filter(m=>state.progress[m.id]).length;return(c/phase.modules.length)*100;}
function isPhaseCompleted(phase){return phase.modules.every(m=>state.progress[m.id]);}

document.addEventListener('DOMContentLoaded',()=>{
  if(state.isLoggedIn)showApp();else showLogin();
  document.getElementById('xp-badge').textContent=xp.badge();
});
})();
