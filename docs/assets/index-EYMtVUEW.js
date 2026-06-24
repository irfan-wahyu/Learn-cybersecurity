(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`cybersec_lab_`,t={get(t,n=null){try{let r=localStorage.getItem(e+t);return r?JSON.parse(r):n}catch(e){return console.error(`Storage get error:`,e),n}},set(t,n){try{return localStorage.setItem(e+t,JSON.stringify(n)),!0}catch(e){return console.error(`Storage set error:`,e),!1}},remove(t){try{return localStorage.removeItem(e+t),!0}catch(e){return console.error(`Storage remove error:`,e),!1}},clear(){try{return Object.keys(localStorage).filter(t=>t.startsWith(e)).forEach(e=>localStorage.removeItem(e)),!0}catch(e){return console.error(`Storage clear error:`,e),!1}},keys(){return Object.keys(localStorage).filter(t=>t.startsWith(e)).map(t=>t.replace(e,``))}},n=`xp`,r=[0,100,250,500,800,1200,1800,2500,3500,5e3,7e3,1e4,14e3,19e3,25e3,32e3,4e4,5e4,65e3,8e4],i=[`Newbie`,`Script Kiddie`,`Junior Hacker`,`Security Analyst`,`Penetration Tester`,`Security Engineer`,`Bug Hunter`,`Red Teamer`,`Security Architect`,`Security Expert`,`Bug Bounty Hunter`,`CISO`,`Security Researcher`,`Cyber Warrior`,`Elite Hacker`,`Security Legend`,`Cyber God`,`1337 Hacker`,`Security Master`,`Ultimate Hacker`],a={getXP(){return t.get(n,0)},addXP(e){let r=this.getXP()+e;t.set(n,r);let i=this.getLevel(),a=this.getLevelFromXP(r);return a>i?{levelUp:!0,newLevel:a,xp:r}:{levelUp:!1,xp:r}},getLevelFromXP(e){let t=0;for(let n=0;n<r.length&&e>=r[n];n++)t=n+1;return t},getLevel(){let e=this.getXP();return this.getLevelFromXP(e)},getLevelTitle(){let e=this.getLevel();return i[Math.min(e-1,i.length-1)]},getProgress(){let e=this.getXP(),t=this.getLevel();if(t>=r.length)return{percentage:100,current:e,needed:0};let n=r[t-1]||0,i=r[t],a=e-n,o=i-n;return{percentage:Math.min(100,a/o*100),current:a,needed:o}},getBadgeText(){let e=this.getXP();return e>=1e3?`${(e/1e3).toFixed(1)}k XP`:`${e} XP`}},o=`アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ`,s=14,c=50;function l(){let e=document.getElementById(`matrix-bg`);if(!e)return;let t=e.getContext(`2d`);function n(){e.width=window.innerWidth,e.height=window.innerHeight}n(),window.addEventListener(`resize`,n);let r=Math.floor(e.width/c),i=Array(r).fill(1);function a(){t.fillStyle=`rgba(10, 10, 15, 0.05)`,t.fillRect(0,0,e.width,e.height),t.fillStyle=`#00ff41`,t.font=`${s}px monospace`;for(let n=0;n<i.length;n++){let r=o[Math.floor(Math.random()*82)];t.fillText(r,n*c,i[n]*s),i[n]*s>e.height&&Math.random()>.975&&(i[n]=0),i[n]++}}setInterval(a,50)}var u=3e3,d=`toast-container`,f={success:`✓`,error:`✗`,info:`ℹ`,warning:`⚠`,xp:`⚡`},p={success:`var(--success)`,error:`var(--danger)`,info:`var(--info)`,warning:`var(--warning)`,xp:`var(--warning)`};function m(e,t=`info`,n=u){let r=document.getElementById(d);if(!r)return;let i=document.createElement(`div`);i.className=`toast ${t}`,i.innerHTML=`
    <span class="toast-icon" style="color: ${p[t]}">${f[t]}</span>
    <span class="toast-message">${e}</span>
  `,r.appendChild(i),setTimeout(()=>{i.style.animation=`slideOutRight 0.3s ease forwards`,setTimeout(()=>i.remove(),300)},n)}var h=[`#00ff41`,`#00ffff`,`#ff3860`,`#ffbd2e`,`#ff6b35`],g=50;function _(){let e=document.getElementById(`confetti-container`);if(e)for(let t=0;t<g;t++)setTimeout(()=>{v(e)},Math.random()*500)}function v(e){let t=document.createElement(`div`);t.className=`confetti`;let n=h[Math.floor(Math.random()*h.length)],r=Math.random()*100,i=Math.random()*2,a=2+Math.random()*2,o=5+Math.random()*10;t.style.cssText=`
    left: ${r}%;
    width: ${o}px;
    height: ${o}px;
    background: ${n};
    animation-delay: ${i}s;
    animation-duration: ${a}s;
  `,e.appendChild(t),setTimeout(()=>{t.remove()},(i+a)*1e3)}var y=`github_token`,b=`irfan-wahyu`,x=`Learn-cybersecurity`,S=`https://api.github.com`,C={getToken(){return t.get(y,``)},setToken(e){t.set(y,e)},removeToken(){t.remove(y)},hasToken(){return!!this.getToken()},async request(e,t={}){let n=this.getToken(),r={Accept:`application/vnd.github.v3+json`,...t.headers};n&&(r.Authorization=`token ${n}`);try{let n=await fetch(`${S}${e}`,{...t,headers:r});if(!n.ok){let e=await n.json();throw Error(e.message||`GitHub API request failed`)}return await n.json()}catch(e){throw console.error(`GitHub API Error:`,e),e}},async getFile(e){try{let t=await this.request(`/repos/${b}/${x}/contents/${e}`),n=atob(t.content);return JSON.parse(n)}catch(e){return console.error(`Error getting file:`,e),null}},async updateFile(e,t,n){if(!this.getToken())throw Error(`GitHub token not set`);try{let r=null;try{r=(await this.request(`/repos/${b}/${x}/contents/${e}`)).sha}catch{}let i={message:n,content:btoa(JSON.stringify(t,null,2)),...r&&{sha:r}};return await this.request(`/repos/${b}/${x}/contents/${e}`,{method:`PUT`,body:JSON.stringify(i)})}catch(e){throw console.error(`Error updating file:`,e),e}},async commitProgress(e){return this.updateFile(`data/progress.json`,e,`Update learning progress`)},async commitChallengeCompletion(e,t){let n={challengeId:e,answer:t,timestamp:new Date().toISOString(),user:`irfan`};return this.updateFile(`challenges/${e}.json`,n,`Solved challenge: ${e}`)},async verifyToken(){try{let e=await this.request(`/user`);return{valid:!0,user:{login:e.login,name:e.name,avatar_url:e.avatar_url}}}catch(e){return{valid:!1,error:e.message}}}},w={currentPage:`dashboard`,curriculum:{phases:[{id:`fundamental`,title:`FUNDAMENTAL LINUX`,icon:`💻`,description:`Master the basics of Linux command line and system`,status:`unlocked`,modules:[{id:`mod-1`,number:1,title:`Linux Basic Navigation`,xp:100,description:`Learn pwd, ls, cd, mkdir, and basic directory operations`,content:{intro:`Linux navigation is the foundation of everything in cybersecurity. You must be comfortable moving around the filesystem.`,concepts:[`pwd - Print Working Directory: shows where you are`,`ls - List: shows files and folders`,`cd - Change Directory: move between folders`,`mkdir - Make Directory: create new folders`,`rmdir - Remove Directory: delete empty folders`],commands:[{cmd:`pwd`,desc:`Show current location`},{cmd:`ls`,desc:`List files in current directory`},{cmd:`ls -la`,desc:`List all files including hidden with details`},{cmd:`cd /home`,desc:`Go to /home directory`},{cmd:`cd ..`,desc:`Go up one directory`},{cmd:`cd ~`,desc:`Go to home directory`},{cmd:`mkdir latihan`,desc:`Create folder named 'latihan'`},{cmd:`rmdir latihan`,desc:`Remove empty folder 'latihan'`}],practice:[`Navigate to /tmp and create a folder named 'myfolder'`,`Go inside 'myfolder' and create 3 files`,`List all files with details`,`Go back to your home directory`]}},{id:`mod-2`,number:2,title:`File Operations`,xp:100,description:`Create, copy, move, and delete files`,content:{intro:`Files are everywhere in Linux. Mastering file operations is essential for daily tasks.`,concepts:[`touch - Create empty file`,`cp - Copy file or directory`,`mv - Move or rename file`,`rm - Remove file (careful! no undo)`,`cat - Display file contents`],commands:[{cmd:`touch file.txt`,desc:`Create empty file`},{cmd:`cp file.txt backup.txt`,desc:`Copy file`},{cmd:`mv file.txt /tmp/`,desc:`Move file to /tmp`},{cmd:`mv old.txt new.txt`,desc:`Rename file`},{cmd:`rm file.txt`,desc:`Delete file`},{cmd:`cat file.txt`,desc:`Show file contents`},{cmd:`cp -r folder1 folder2`,desc:`Copy directory recursively`}],practice:[`Create a file named 'notes.txt' with touch`,`Copy it to 'notes_backup.txt'`,`Rename 'notes_backup.txt' to 'backup.txt'`,`Delete the backup file`]}},{id:`mod-3`,number:3,title:`File Permissions`,xp:150,description:`Understand and modify file permissions (chmod, chown)`,content:{intro:`Linux permissions control who can read, write, and execute files. Critical for security.`,concepts:[`r (read) = 4, w (write) = 2, x (execute) = 1`,`Owner, Group, Others`,`chmod - Change file mode/permissions`,`chown - Change file owner`],commands:[{cmd:`ls -la`,desc:`View permissions`},{cmd:`chmod 755 script.sh`,desc:`rwxr-xr-x (owner:full, others:read+exec)`},{cmd:`chmod 644 file.txt`,desc:`rw-r--r-- (owner:read+write, others:read)`},{cmd:`chmod +x script.sh`,desc:`Add execute permission`},{cmd:`chmod -R 700 folder/`,desc:`Recursive, owner only`},{cmd:`chown user:group file.txt`,desc:`Change owner and group`}],practice:[`Create a script.sh and make it executable`,`Change permissions to 600 (owner read+write only)`,`View the permission changes with ls -la`]}},{id:`mod-4`,number:4,title:`User Management`,xp:100,description:`Manage users, groups, and sudo access`,content:{intro:`User management is key for system administration and security.`,concepts:[`whoami - Current user`,`sudo - Superuser do (admin commands)`,`useradd - Create new user`,`passwd - Change password`],commands:[{cmd:`whoami`,desc:`Show current user`},{cmd:`id`,desc:`Show user ID and groups`},{cmd:`sudo su`,desc:`Switch to root user`},{cmd:`exit`,desc:`Exit root/back to normal user`},{cmd:`sudo useradd -m newuser`,desc:`Create new user with home dir`},{cmd:`sudo passwd newuser`,desc:`Set password for new user`},{cmd:`sudo userdel -r olduser`,desc:`Delete user and home dir`}],practice:[`Check who you are with whoami and id`,`Switch to root with sudo su and back with exit`,`Create a new user 'testuser'`]}},{id:`mod-5`,number:5,title:`Process Management`,xp:100,description:`View and manage running processes`,content:{intro:`Processes are running programs. Managing them is crucial for security and system administration.`,concepts:[`ps - Process status`,`top/htop - Real-time process viewer`,`kill - Terminate a process`,`jobs - Background jobs`],commands:[{cmd:`ps aux`,desc:`Show all running processes`},{cmd:`top`,desc:`Real-time process monitor`},{cmd:`kill PID`,desc:`Kill process by ID`},{cmd:`kill -9 PID`,desc:`Force kill process`},{cmd:`ps aux | grep name`,desc:`Find process by name`},{cmd:`bg`,desc:`Run job in background`},{cmd:`fg`,desc:`Bring job to foreground`}],practice:[`Run 'top' and identify the top 3 processes by CPU`,`Find all processes with 'sshd' in the name`,`Start a background process and bring it back`]}},{id:`mod-6`,number:6,title:`Text Processing`,xp:150,description:`grep, sed, awk, and text manipulation`,content:{intro:`Text processing is essential for log analysis, parsing outputs, and automation.`,concepts:[`grep - Search text patterns`,`sed - Stream editor`,`awk - Pattern scanning`,`pipe | - Chain commands together`],commands:[{cmd:`grep 'pattern' file`,desc:`Search for pattern in file`},{cmd:`grep -i 'error' log.txt`,desc:`Case-insensitive search`},{cmd:`grep -r 'password' /etc/`,desc:`Recursive search`},{cmd:`cat file | head -10`,desc:`Show first 10 lines`},{cmd:`cat file | tail -10`,desc:`Show last 10 lines`},{cmd:`wc -l file.txt`,desc:`Count lines`},{cmd:`sort file.txt`,desc:`Sort lines`}],practice:[`Search for 'root' in /etc/passwd`,`Count how many users are in the system`,`Find all .conf files in /etc/ using grep`]}},{id:`mod-7`,number:7,title:`Shell Scripting Basics`,xp:200,description:`Write your first bash scripts`,content:{intro:`Shell scripting automates tasks and is fundamental for penetration testing and system admin.`,concepts:[`#!/bin/bash - Shebang line`,`Variables - Store data`,`if/else - Conditionals`,`for/while - Loops`],commands:[{cmd:`#!/bin/bash`,desc:`Script header`},{cmd:`var="hello"`,desc:`Assign variable`},{cmd:`echo $var`,desc:`Print variable`},{cmd:`if [ condition ]; then ... fi`,desc:`If statement`},{cmd:`for i in 1 2 3; do ... done`,desc:`For loop`},{cmd:`chmod +x script.sh`,desc:`Make script executable`},{cmd:`./script.sh`,desc:`Run script`}],practice:[`Create a script that prints your name and today's date`,`Write a script that counts files in current directory`,`Create a script that asks for user input`]}},{id:`mod-8`,number:8,title:`Package Management`,xp:100,description:`Install, update, and remove software packages`,content:{intro:`Package management is how you install tools and software on Linux.`,concepts:[`apt - Debian/Ubuntu package manager`,`dpkg - Low-level package manager`,`snap/flatpak - Universal packages`],commands:[{cmd:`sudo apt update`,desc:`Update package list`},{cmd:`sudo apt upgrade`,desc:`Upgrade all packages`},{cmd:`sudo apt install nmap`,desc:`Install a package`},{cmd:`sudo apt remove nmap`,desc:`Remove a package`},{cmd:`dpkg -l | grep nmap`,desc:`Check if package installed`},{cmd:`which nmap`,desc:`Find package location`}],practice:[`Update your system with sudo apt update && upgrade`,`Install nmap if not already installed`,`Check nmap version with nmap --version`]}}]},{id:`networking`,title:`NETWORKING BASICS`,icon:`🌐`,description:`Understand network fundamentals for security`,status:`locked`,modules:[{id:`mod-9`,number:9,title:`IP Address & Subnet`,xp:150,description:`Understand IP addressing and subnetting`,content:{intro:`IP addresses are like home addresses for devices on a network.`,concepts:[`IPv4 vs IPv6`,`Private vs Public IP`,`Subnet mask and CIDR notation`,`127.0.0.1 = localhost`],commands:[{cmd:`ifconfig`,desc:`Show network interfaces`},{cmd:`ip a`,desc:`Show IP addresses (modern)`},{cmd:`ping 8.8.8.8`,desc:`Test connectivity`},{cmd:`hostname -I`,desc:`Show local IP`}],practice:[`Find your IP address`,`Ping google.com and observe output`,`Understand the difference between 192.168.x.x and public IPs`]}},{id:`mod-10`,number:10,title:`DNS Basics`,xp:100,description:`Domain Name System resolution`,content:{intro:`DNS translates domain names to IP addresses.`,concepts:[`Domain → IP resolution`,`DNS records (A, AAAA, MX, CNAME)`,`/etc/hosts file`,`DNS servers`],commands:[{cmd:`nslookup google.com`,desc:`Query DNS`},{cmd:`dig google.com`,desc:`Detailed DNS query`},{cmd:`host google.com`,desc:`Simple DNS lookup`},{cmd:`cat /etc/hosts`,desc:`Local DNS entries`}],practice:[`Lookup the IP of google.com`,`Add a custom entry to /etc/hosts`,`Query different DNS record types`]}},{id:`mod-11`,number:11,title:`TCP/UDP & Ports`,xp:150,description:`Understand ports, protocols, and connections`,content:{intro:`Ports are like doors to a computer. Each service uses specific ports.`,concepts:[`TCP = reliable connection (HTTP, SSH)`,`UDP = fast but unreliable (DNS, gaming)`,`Common ports: 22(SSH), 80(HTTP), 443(HTTPS)`,`Port scanning basics`],commands:[{cmd:`netstat -tuln`,desc:`Show open ports`},{cmd:`ss -tuln`,desc:`Modern port display`},{cmd:`lsof -i :22`,desc:`What's using port 22`},{cmd:`nmap localhost`,desc:`Scan own ports`}],practice:[`List all open ports on your machine`,`Identify which ports SSH and HTTP use`,`Scan localhost with nmap`]}},{id:`mod-12`,number:12,title:`Network Commands`,xp:100,description:`Essential network diagnostic tools`,content:{intro:`These tools help diagnose and troubleshoot network issues.`,concepts:[`ping - Test connectivity`,`traceroute - Trace packet path`,`curl - Transfer data`,`wget - Download files`],commands:[{cmd:`ping -c 4 google.com`,desc:`Ping 4 times`},{cmd:`traceroute google.com`,desc:`Trace route to destination`},{cmd:`curl ifconfig.me`,desc:`Show public IP`},{cmd:`wget http://example.com/file.txt`,desc:`Download file`}],practice:[`Ping google.com 10 times`,`Trace the route to a remote server`,`Download a file with wget`]}},{id:`mod-13`,number:13,title:`Wireshark Basics`,xp:200,description:`Packet capture and analysis introduction`,content:{intro:`Wireshark is a network protocol analyzer for deep packet inspection.`,concepts:[`Packet capture (pcap)`,`Protocol filters`,`TCP stream following`,`HTTP packet inspection`],commands:[{cmd:`wireshark`,desc:`Launch Wireshark GUI`},{cmd:`tshark -i eth0`,desc:`Terminal-based capture`},{cmd:`tcpdump -i eth0`,desc:`Command-line capture`},{cmd:`tcpdump port 80 -w capture.pcap`,desc:`Capture HTTP to file`}],practice:[`Capture 10 packets with tcpdump`,`Filter for HTTP traffic only`,`Analyze a simple packet capture`]}}]},{id:`security`,title:`SECURITY FUNDAMENTALS`,icon:`🔒`,description:`Core security concepts and principles`,status:`locked`,modules:[{id:`mod-14`,number:14,title:`CIA Triad`,xp:100,description:`Confidentiality, Integrity, Availability`,content:{intro:`The CIA Triad is the foundation of information security.`,concepts:[`Confidentiality - Only authorized access`,`Integrity - Data is accurate and unmodified`,`Availability - Systems are accessible when needed`],commands:[],practice:[`Identify CIA in real-world scenarios`,`Analyze a security breach using CIA framework`,`Design security controls for each CIA component`]}},{id:`mod-15`,number:15,title:`Authentication & Authorization`,xp:150,description:`Who are you and what can you do?`,content:{intro:`Authentication verifies identity, authorization determines permissions.`,concepts:[`Authentication factors: something you know/have/are`,`Multi-factor authentication (MFA)`,`Role-based access control (RBAC)`,`Principle of least privilege`],commands:[],practice:[`Compare different authentication methods`,`Set up SSH key-based authentication`,`Analyze access control in Linux permissions`]}},{id:`mod-16`,number:16,title:`Cryptography Basics`,xp:200,description:`Encryption, hashing, and digital signatures`,content:{intro:`Cryptography protects data through mathematical techniques.`,concepts:[`Symmetric vs Asymmetric encryption`,`Hashing (MD5, SHA-256)`,`Digital certificates and PKI`,`SSL/TLS`],commands:[{cmd:`echo -n 'text' | md5sum`,desc:`Generate MD5 hash`},{cmd:`echo -n 'text' | sha256sum`,desc:`Generate SHA256 hash`},{cmd:`openssl enc -aes-256-cbc -in file -out encrypted`,desc:`Encrypt file`},{cmd:`openssl enc -d -aes-256-cbc -in encrypted -out decrypted`,desc:`Decrypt file`}],practice:[`Generate hash of a string`,`Compare MD5 and SHA256 outputs`,`Encrypt and decrypt a file with openssl`]}},{id:`mod-17`,number:17,title:`Common Attacks`,xp:200,description:`SQL injection, XSS, phishing, and more`,content:{intro:`Understanding attacks is essential for defense.`,concepts:[`SQL Injection (SQLi)`,`Cross-Site Scripting (XSS)`,`Phishing and Social Engineering`,`Brute Force attacks`],commands:[],practice:[`Identify SQL injection in a sample code`,`Recognize phishing email patterns`,`Test for XSS vulnerabilities`]}}]},{id:`offensive`,title:`OFFENSIVE SECURITY`,icon:`⚔️`,description:`Penetration testing and ethical hacking`,status:`locked`,modules:[{id:`mod-18`,number:18,title:`Reconnaissance`,xp:200,description:`Information gathering techniques`,content:{intro:`Recon is the first phase of penetration testing.`,concepts:[`Passive vs Active recon`,`OSINT (Open Source Intelligence)`,`Google dorking`,`WHOIS and DNS enumeration`],commands:[{cmd:`whois target.com`,desc:`Domain information`},{cmd:`theHarvester -d target.com -b google`,desc:`Email/domain harvest`},{cmd:`google 'site:target.com filetype:pdf'`,desc:`Google dorking`}],practice:[`Perform WHOIS lookup on a domain`,`Use Google dorking to find information`,`Gather emails and subdomains`]}},{id:`mod-19`,number:19,title:`Nmap Deep Dive`,xp:250,description:`Master network scanning with Nmap`,content:{intro:`Nmap is the most important tool for network scanning.`,concepts:[`Scan types (SYN, TCP, UDP)`,`Service detection`,`OS detection`,`Scripting Engine (NSE)`],commands:[{cmd:`nmap target.com`,desc:`Basic scan`},{cmd:`nmap -sV -sC target.com`,desc:`Version + default scripts`},{cmd:`nmap -O target.com`,desc:`OS detection`},{cmd:`nmap -A target.com`,desc:`Aggressive scan`},{cmd:`nmap -p- target.com`,desc:`All 65535 ports`},{cmd:`nmap --script vuln target.com`,desc:`Vulnerability scan`}],practice:[`Scan localhost with different options`,`Scan for open ports on a target`,`Identify running services and versions`]}},{id:`mod-20`,number:20,title:`Metasploit Basics`,xp:300,description:`Exploitation framework introduction`,content:{intro:`Metasploit is the world's most used penetration testing framework.`,concepts:[`Modules (exploit, payload, auxiliary)`,`Meterpreter sessions`,`Database integration`,`Post-exploitation`],commands:[{cmd:`msfconsole`,desc:`Launch Metasploit`},{cmd:`search exploit_name`,desc:`Search for exploits`},{cmd:`use exploit/path`,desc:`Select an exploit`},{cmd:`show options`,desc:`View required options`},{cmd:`set RHOSTS target`,desc:`Set target host`},{cmd:`exploit`,desc:`Run the exploit`}],practice:[`Search for vsftpd backdoor exploit`,`Configure and run an exploit against a lab target`,`Navigate Meterpreter after successful exploit`]}}]},{id:`defensive`,title:`DEFENSIVE SECURITY`,icon:`🛡️`,description:`SOC, Blue Team, and incident response`,status:`locked`,modules:[{id:`mod-21`,number:21,title:`Log Analysis`,xp:200,description:`Analyze system and security logs`,content:{intro:`Logs are the eyes and ears of security monitoring.`,concepts:[`Syslog and journalctl`,`Apache/Nginx logs`,`Authentication logs`,`SIEM concepts`],commands:[{cmd:`journalctl -f`,desc:`Follow system logs`},{cmd:`cat /var/log/auth.log | grep 'Failed'`,desc:`Failed logins`},{cmd:`tail -f /var/log/apache2/access.log`,desc:`Web access log`},{cmd:`grep 'error' /var/log/syslog`,desc:`Find errors`}],practice:[`Find failed SSH login attempts`,`Analyze web server access logs`,`Create a simple log monitoring script`]}},{id:`mod-22`,number:22,title:`Incident Response`,xp:200,description:`How to respond to security incidents`,content:{intro:`Incident response is structured approach to handling security breaches.`,concepts:[`Preparation`,`Detection and Analysis`,`Containment, Eradication, Recovery`,`Post-incident activity`],commands:[],practice:[`Create an incident response checklist`,`Analyze a compromised system scenario`,`Document findings and recommendations`]}}]},{id:`web`,title:`WEB SECURITY`,icon:`🕸️`,description:`Web application security testing`,status:`locked`,modules:[{id:`mod-23`,number:23,title:`OWASP Top 10`,xp:200,description:`Most critical web application security risks`,content:{intro:`The OWASP Top 10 lists the most critical web security risks.`,concepts:[`Injection (SQL, NoSQL, LDAP)`,`Broken Authentication`,`Cross-Site Scripting (XSS)`,`Insecure Deserialization`],commands:[],practice:[`Study each OWASP Top 10 vulnerability`,`Test against DVWA (Damn Vulnerable Web App)`,`Write a basic security report`]}},{id:`mod-24`,number:24,title:`Burp Suite Basics`,xp:250,description:`Web application security testing tool`,content:{intro:`Burp Suite is the leading web security testing tool.`,concepts:[`Proxy setup`,`Repeater for request manipulation`,`Intruder for brute force`,`Scanner for vulnerabilities`],commands:[],practice:[`Configure browser proxy`,`Intercept and modify HTTP requests`,`Test a web application for vulnerabilities`]}}]},{id:`ai-security`,title:`AI SECURITY`,icon:`🤖`,description:`AI/ML security and adversarial attacks`,status:`locked`,modules:[{id:`mod-25`,number:25,title:`AI Security Fundamentals`,xp:200,description:`Security implications of AI systems`,content:{intro:`As AI becomes prevalent, securing AI systems becomes critical.`,concepts:[`Adversarial attacks on ML models`,`Data poisoning`,`Model theft/extraction`,`AI-powered attacks`],commands:[],practice:[`Understand adversarial examples`,`Analyze AI model vulnerabilities`,`Explore defensive techniques`]}}]}]},challenges:{challenges:[{id:`ch-1`,title:`Reverse String`,difficulty:`easy`,category:`linux`,xp:50,description:`Reverse the string 'gnihcah' to get the answer`,hint:`Think backwards...`,answer:`hacking`,solved:!1},{id:`ch-2`,title:`Decode Base64`,difficulty:`easy`,category:`crypto`,xp:75,description:`Decode this Base64 string: SGVsbG8gSGFja2Vy`,hint:`Use echo 'string' | base64 -d`,answer:`Hello Hacker`,solved:!1},{id:`ch-3`,title:`Find the File`,difficulty:`easy`,category:`linux`,xp:50,description:`What command would you use to find all .txt files in /home?`,hint:`Think 'find' command`,answer:`find /home -name '*.txt'`,altAnswers:[`find /home -name "*.txt"`,`find /home -iname '*.txt'`],solved:!1},{id:`ch-4`,title:`File Permissions`,difficulty:`medium`,category:`linux`,xp:100,description:`What chmod command gives read/write to owner and read-only to group and others?`,hint:`Owner=6, Group=4, Others=4`,answer:`chmod 644`,solved:!1},{id:`ch-5`,title:`SQL Injection`,difficulty:`medium`,category:`web`,xp:150,description:`What SQL injection payload can bypass a login form?`,hint:`Think about OR conditions and comments`,answer:`' OR 1=1 --`,altAnswers:[`' or 1=1 --`,`' OR '1'='1`,`' or '1'='1' --`],solved:!1},{id:`ch-6`,title:`Nmap Scan Type`,difficulty:`medium`,category:`networking`,xp:100,description:`What Nmap flag performs a SYN stealth scan?`,hint:`It's the default scan type`,answer:`-sS`,altAnswers:[`-sS`,`-sS --top-ports 1000`],solved:!1},{id:`ch-7`,title:`Hash Identification`,difficulty:`medium`,category:`crypto`,xp:125,description:`What hash algorithm produces a 32-character hexadecimal output?`,hint:`It's commonly broken and considered insecure`,answer:`MD5`,altAnswers:[`md5`,`MD5`],solved:!1},{id:`ch-8`,title:`Port Number`,difficulty:`easy`,category:`networking`,xp:50,description:`What port number does SSH typically use?`,hint:`It's a well-known port below 100`,answer:`22`,solved:!1},{id:`ch-9`,title:`Linux Hidden File`,difficulty:`easy`,category:`linux`,xp:50,description:`What prefix makes a file hidden in Linux?`,hint:`It's a special character at the start of filename`,answer:`.`,altAnswers:[`dot`,`.`],solved:!1},{id:`ch-10`,title:`CIA Triad`,difficulty:`easy`,category:`security`,xp:50,description:`What does 'C' stand for in the CIA Triad?`,hint:`It relates to keeping data secret`,answer:`Confidentiality`,altAnswers:[`confidentiality`,`Confidentiality`],solved:!1},{id:`ch-11`,title:`XSS Payload`,difficulty:`hard`,category:`web`,xp:200,description:`What is a basic XSS payload that shows an alert?`,hint:`It involves script tags`,answer:`<script>alert(1)<\/script>`,altAnswers:[`<script>alert('1')<\/script>`,`<script>alert(1)<\/script>`,`<script>alert('XSS')<\/script>`],solved:!1},{id:`ch-12`,title:`Decode Hex`,difficulty:`medium`,category:`crypto`,xp:100,description:`Decode this hex string to ASCII: 68656c6c6f`,hint:`Use printf or python`,answer:`hello`,altAnswers:[`hello`,`Hello`,`HELLO`],solved:!1},{id:`ch-13`,title:`Process Killer`,difficulty:`easy`,category:`linux`,xp:50,description:`What command forcefully kills a process with PID 1234?`,hint:`It's a two-letter command with signal 9`,answer:`kill -9 1234`,altAnswers:[`kill -9 1234`,`kill -9 PID`,`killall`],solved:!1},{id:`ch-14`,title:`OS Detection`,difficulty:`medium`,category:`networking`,xp:100,description:`What Nmap flag enables OS detection?`,hint:`It's a single letter flag`,answer:`-O`,solved:!1},{id:`ch-15`,title:`Password Hashing`,difficulty:`hard`,category:`crypto`,xp:175,description:`What tool is commonly used to crack password hashes?`,hint:`Named after a famous British detective`,answer:`John the Ripper`,altAnswers:[`John`,`john`,`John the Ripper`,`john the ripper`],solved:!1},{id:`ch-16`,title:`Brute Force Tool`,difficulty:`medium`,category:`tools`,xp:100,description:`What tool is used for brute force attacks on network services?`,hint:`Named after a legendary warrior`,answer:`Hydra`,altAnswers:[`hydra`,`THC-Hydra`,`thc-hydra`],solved:!1},{id:`ch-17`,title:`DNS Lookup`,difficulty:`easy`,category:`networking`,xp:50,description:`What command queries DNS records for a domain?`,hint:`It's also a unit of power`,answer:`dig`,altAnswers:[`dig`,`nslookup`,`host`],solved:!1},{id:`ch-18`,title:`Grep Pattern`,difficulty:`medium`,category:`linux`,xp:100,description:`What grep flag performs a recursive search through directories?`,hint:`It's a single letter flag`,answer:`-r`,altAnswers:[`-r`,`-R`,`--recursive`],solved:!1},{id:`ch-19`,title:`Web Proxy`,difficulty:`hard`,category:`tools`,xp:200,description:`What tool intercepts and modifies HTTP/HTTPS traffic?`,hint:`It's the most popular web security testing tool`,answer:`Burp Suite`,altAnswers:[`Burp`,`burp`,`Burp Suite`,`burpsuite`],solved:!1},{id:`ch-20`,title:`Privilege Escalation`,difficulty:`hard`,category:`linux`,xp:250,description:`What command shows sudo permissions for current user?`,hint:`It's sudo with a list flag`,answer:`sudo -l`,altAnswers:[`sudo -l`,`sudo -L`],solved:!1}]},cheatsheet:{categories:[`All`,`Linux`,`Networking`,`Nmap`,`Crypto`,`Web`,`Tools`],cheats:[{command:`ls -la`,description:`List all files with details and hidden files`,category:`Linux`},{command:`cd /path/to/dir`,description:`Navigate to a directory`,category:`Linux`},{command:`pwd`,description:`Print current working directory`,category:`Linux`},{command:`chmod 755 file`,description:`Set read/write/execute for owner, read/execute for others`,category:`Linux`},{command:`chmod +x script.sh`,description:`Make a script executable`,category:`Linux`},{command:`chown user:group file`,description:`Change file owner and group`,category:`Linux`},{command:`cp -r dir1 dir2`,description:`Copy directory recursively`,category:`Linux`},{command:`mv old.txt new.txt`,description:`Rename a file`,category:`Linux`},{command:`rm -rf directory`,description:`Force remove directory and contents`,category:`Linux`},{command:`grep -r 'pattern' /path`,description:`Recursive search for pattern in files`,category:`Linux`},{command:`grep -i 'error' log.txt`,description:`Case-insensitive search in file`,category:`Linux`},{command:`cat file | head -20`,description:`Show first 20 lines of file`,category:`Linux`},{command:`cat file | tail -20`,description:`Show last 20 lines of file`,category:`Linux`},{command:`find / -name '*.txt' 2>/dev/null`,description:`Find all .txt files on system`,category:`Linux`},{command:`ps aux | grep process`,description:`Find specific process`,category:`Linux`},{command:`kill -9 PID`,description:`Force kill a process`,category:`Linux`},{command:`top`,description:`Real-time process monitor`,category:`Linux`},{command:`df -h`,description:`Show disk usage in human readable format`,category:`Linux`},{command:`du -sh /path`,description:`Show directory size`,category:`Linux`},{command:`chmod 600 file`,description:`Read/write for owner only (secure)`,category:`Linux`},{command:`sudo apt update && sudo apt upgrade -y`,description:`Update and upgrade all packages`,category:`Linux`},{command:`sudo apt install package-name`,description:`Install a package`,category:`Linux`},{command:`ifconfig`,description:`Show network interfaces (classic)`,category:`Networking`},{command:`ip a`,description:`Show all IP addresses (modern)`,category:`Networking`},{command:`ip addr show eth0`,description:`Show specific interface IP`,category:`Networking`},{command:`ping -c 4 target.com`,description:`Send 4 ICMP echo requests`,category:`Networking`},{command:`traceroute target.com`,description:`Trace route to destination`,category:`Networking`},{command:`nslookup domain.com`,description:`Query DNS records`,category:`Networking`},{command:`dig domain.com`,description:`Detailed DNS query`,category:`Networking`},{command:`dig @8.8.8.8 domain.com`,description:`Query specific DNS server`,category:`Networking`},{command:`host domain.com`,description:`Simple DNS lookup`,category:`Networking`},{command:`netstat -tuln`,description:`Show listening ports`,category:`Networking`},{command:`ss -tuln`,description:`Show listening ports (modern)`,category:`Networking`},{command:`lsof -i :22`,description:`Show what's using port 22`,category:`Networking`},{command:`curl ifconfig.me`,description:`Show public IP address`,category:`Networking`},{command:`wget http://url/file`,description:`Download file from URL`,category:`Networking`},{command:`ssh user@host`,description:`SSH connect to remote host`,category:`Networking`},{command:`ssh -i key.pem user@host`,description:`SSH with specific key`,category:`Networking`},{command:`scp file user@host:/path`,description:`Copy file to remote host via SSH`,category:`Networking`},{command:`nmap target.com`,description:`Basic port scan`,category:`Nmap`},{command:`nmap -sV target.com`,description:`Detect service versions`,category:`Nmap`},{command:`nmap -sC target.com`,description:`Run default scripts`,category:`Nmap`},{command:`nmap -O target.com`,description:`OS detection`,category:`Nmap`},{command:`nmap -A target.com`,description:`Aggressive scan (OS + version + scripts)`,category:`Nmap`},{command:`nmap -p- target.com`,description:`Scan all 65535 ports`,category:`Nmap`},{command:`nmap -p 22,80,443 target.com`,description:`Scan specific ports`,category:`Nmap`},{command:`nmap -sS target.com`,description:`SYN stealth scan`,category:`Nmap`},{command:`nmap -sU target.com`,description:`UDP scan`,category:`Nmap`},{command:`nmap --script vuln target.com`,description:`Vulnerability scan with NSE`,category:`Nmap`},{command:`nmap -oN output.txt target.com`,description:`Save output to file`,category:`Nmap`},{command:`echo -n 'text' | md5sum`,description:`Generate MD5 hash`,category:`Crypto`},{command:`echo -n 'text' | sha256sum`,description:`Generate SHA256 hash`,category:`Crypto`},{command:`hashid hash_value`,description:`Identify hash type`,category:`Crypto`},{command:`echo 'string' | base64 -d`,description:`Decode Base64 string`,category:`Crypto`},{command:`echo -n 'text' | base64`,description:`Encode to Base64`,category:`Crypto`},{command:`openssl enc -aes-256-cbc -in file -out file.enc`,description:`Encrypt file with AES`,category:`Crypto`},{command:`openssl enc -d -aes-256-cbc -in file.enc -out file`,description:`Decrypt file with AES`,category:`Crypto`},{command:`john --wordlist=rockyou.txt hash.txt`,description:`Crack hashes with wordlist`,category:`Crypto`},{command:`hashcat -m 0 hash.txt rockyou.txt`,description:`Crack MD5 hashes with GPU`,category:`Crypto`},{command:`sqlmap -u 'http://target/?id=1' --dbs`,description:`SQL injection database enumeration`,category:`Web`},{command:`nikto -h target.com`,description:`Web server scanner`,category:`Web`},{command:`dirb http://target.com`,description:`Directory brute force`,category:`Web`},{command:`gobuster dir -u http://target -w wordlist.txt`,description:`Directory enumeration`,category:`Web`},{command:`hydra -l admin -P rockyou.txt target ssh`,description:`SSH brute force`,category:`Tools`},{command:`hydra -l admin -P rockyou.txt target ftp`,description:`FTP brute force`,category:`Tools`},{command:`theHarvester -d target.com -b google`,description:`Gather emails and subdomains`,category:`Tools`},{command:`whois target.com`,description:`Domain registration information`,category:`Tools`},{command:`recon-ng`,description:`OSINT reconnaissance framework`,category:`Tools`},{command:`msfconsole`,description:`Launch Metasploit Framework`,category:`Tools`},{command:`aircrack-ng capture.cap`,description:`Crack WiFi handshake`,category:`Tools`},{command:`tcpdump -i eth0 -w capture.pcap`,description:`Capture network packets`,category:`Tools`},{command:`tshark -r capture.pcap`,description:`Analyze packet capture file`,category:`Tools`},{command:`steghide extract -sf image.jpg`,description:`Extract hidden data from image`,category:`Tools`},{command:`binwalk firmware.bin`,description:`Analyze firmware files`,category:`Tools`},{command:`strings binary | grep flag`,description:`Search for strings in binary`,category:`Tools`}]},progress:t.get(`progress`,{}),solvedChallenges:t.get(`solvedChallenges`,[])};document.addEventListener(`DOMContentLoaded`,()=>{l(),T(),B(),E(`dashboard`),t.get(`visited`)||(t.set(`visited`,!0),setTimeout(()=>{m(`Welcome to CYBERSEC LAB, Irfan! 🎉`,`success`,5e3),_()},500))});function T(){let e=document.querySelectorAll(`.nav-link`),t=document.getElementById(`nav-toggle`),n=document.getElementById(`nav-links`);e.forEach(t=>{t.addEventListener(`click`,r=>{r.preventDefault();let i=t.dataset.page;e.forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`),E(i),n.classList.remove(`active`)})}),t.addEventListener(`click`,()=>{n.classList.toggle(`active`)})}function E(e){w.currentPage=e;let t=document.getElementById(e);switch(e){case`dashboard`:D(t);break;case`path`:O(t);break;case`curriculum`:k(t);break;case`challenges`:M(t);break;case`cheatsheet`:P(t);break;case`projects`:I(t);break;case`admin`:L(t);break}}function D(e){let t=a.getXP(),n=a.getLevel(),r=a.getLevelTitle(),i=a.getProgress();e.innerHTML=`
    <div class="dashboard-welcome">
      <h1 class="welcome-text">Welcome back, <span class="name">Irfan</span></h1>
      <p class="welcome-subtitle">Level ${n} ${r} | Keep learning, keep growing!</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">⚡</div>
        <div class="stat-value">${t}</div>
        <div class="stat-label">Total XP</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🎯</div>
        <div class="stat-value">${n}</div>
        <div class="stat-label">Level</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📚</div>
        <div class="stat-value">${Object.keys(w.progress).filter(e=>w.progress[e]).length}/${w.curriculum.phases.reduce((e,t)=>e+t.modules.length,0)}</div>
        <div class="stat-label">Modules Done</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🏆</div>
        <div class="stat-value">${w.solvedChallenges.length}/${w.challenges.challenges.length}</div>
        <div class="stat-label">Challenges Solved</div>
      </div>
    </div>

    <div class="progress-section">
      <h2 class="section-title">Level Progress</h2>
      <div class="progress-container">
        <div class="progress-bar" style="width: ${i.percentage}%"></div>
      </div>
      <div class="progress-info">
        <span>${i.current} / ${i.needed} XP to next level</span>
        <span>${Math.round(i.percentage)}%</span>
      </div>
    </div>

    <div class="card">
      <h2 class="section-title">Recent Activity</h2>
      <div class="activity-list" id="activity-list">
        <div class="activity-item">
          <div class="activity-icon">🚀</div>
          <div class="activity-content">
            <div class="activity-title">Started learning journey</div>
            <div class="activity-time">Just now</div>
          </div>
        </div>
      </div>
    </div>
  `}function O(e){let t=w.curriculum.phases;e.innerHTML=`
    <h1 class="section-title">Learning Path</h1>
    <p class="mb-3" style="color: var(--text-dim);">Complete each phase to unlock the next. Choose your specialization!</p>
    
    <div class="path-container">
      ${t.map((e,n)=>{let r=R(e),i=e.status===`locked`&&n>0&&!z(t[n-1]);return`
          <div class="path-node ${i?`locked`:``} ${r===100?`completed`:``} ${e.status===`active`?`active`:``}" 
               onclick="${i?``:`showPhaseDetail('${e.id}')`}">
            <div class="path-node-header">
              <h3 class="path-node-title">${e.icon} ${e.title}</h3>
              <span class="path-node-status ${r===100?`status-completed`:e.status===`active`?`status-active`:`status-locked`}">
                ${r===100?`✓ COMPLETED`:e.status===`active`?`► IN PROGRESS`:`🔒 LOCKED`}
              </span>
            </div>
            <p class="path-node-desc">${e.description}</p>
            <div class="path-node-modules">
              ${e.modules.slice(0,3).map(e=>`<span class="module-tag">${e.title}</span>`).join(``)}
              ${e.modules.length>3?`<span class="module-tag">+${e.modules.length-3} more</span>`:``}
            </div>
          </div>
          ${n<t.length-1?`<div class="path-connector"></div>`:``}
        `}).join(``)}
    </div>
  `}function k(e){let t=w.curriculum.phases;e.innerHTML=`
    <h1 class="section-title">Curriculum</h1>
    
    <div class="curriculum-tabs">
      ${t.map((e,t)=>`
        <button class="tab-btn ${t===0?`active`:``}" onclick="switchTab('${e.id}')">
          ${e.icon} ${e.title}
        </button>
      `).join(``)}
    </div>

    <div class="module-list" id="module-list">
      ${A(t[0])}
    </div>
  `,window.switchTab=e=>{let n=t.find(t=>t.id===e);document.querySelectorAll(`.tab-btn`).forEach(e=>e.classList.remove(`active`)),event.target.classList.add(`active`),document.getElementById(`module-list`).innerHTML=A(n),j()},j()}function A(e){return e.modules.map(e=>{let t=w.progress[e.id];return`
      <div class="module-item ${t?`completed`:``}" data-module="${e.id}">
        <div class="module-checkbox"></div>
        <div class="module-info">
          <div class="module-number">Module ${e.number}</div>
          <div class="module-title">${e.title}</div>
        </div>
        <span class="module-xp">${e.xp} XP</span>
      </div>
      <div class="module-detail" id="detail-${e.id}">
        <div class="module-content">
          <h3>${e.title}</h3>
          <p>${e.content.intro}</p>
          
          <h4 class="mt-2 mb-1">Key Concepts:</h4>
          <ul>
            ${e.content.concepts.map(e=>`<li>${e}</li>`).join(``)}
          </ul>
          
          ${e.content.commands.length>0?`
            <h4 class="mt-2 mb-1">Commands:</h4>
            <pre><code>${e.content.commands.map(e=>`${e.cmd}\n# ${e.desc}`).join(`

`)}</code></pre>
          `:``}
          
          <h4 class="mt-2 mb-1">Practice:</h4>
          <ul>
            ${e.content.practice.map(e=>`<li>${e}</li>`).join(``)}
          </ul>
          
          <button class="btn btn-success mt-2" onclick="completeModule('${e.id}', ${e.xp})">
            ${t?`✓ Completed`:`Mark as Complete`}
          </button>
        </div>
      </div>
    `}).join(``)}function j(){document.querySelectorAll(`.module-item`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.module;document.getElementById(`detail-${t}`).classList.toggle(`active`)})})}window.completeModule=(e,n)=>{if(w.progress[e])return;w.progress[e]=!0,t.set(`progress`,w.progress);let r=a.addXP(n);B(),_(),m(`Module completed! +${n} XP`,`success`),r.levelUp&&setTimeout(()=>{m(`🎉 Level Up! You're now Level ${r.newLevel}!`,`xp`,5e3)},1e3),E(w.currentPage)};function M(e){let t=w.challenges.challenges;e.innerHTML=`
    <h1 class="section-title">Challenges</h1>
    
    <div class="challenges-filter">
      <button class="filter-btn active" onclick="filterChallenges('all')">All</button>
      <button class="filter-btn" onclick="filterChallenges('easy')">Easy</button>
      <button class="filter-btn" onclick="filterChallenges('medium')">Medium</button>
      <button class="filter-btn" onclick="filterChallenges('hard')">Hard</button>
    </div>

    <div class="challenges-grid" id="challenges-grid">
      ${t.map(e=>N(e)).join(``)}
    </div>
  `,window.filterChallenges=e=>{document.querySelectorAll(`.filter-btn`).forEach(e=>e.classList.remove(`active`)),event.target.classList.add(`active`);let n=e===`all`?t:t.filter(t=>t.difficulty===e);document.getElementById(`challenges-grid`).innerHTML=n.map(e=>N(e)).join(``)}}function N(e){let t=w.solvedChallenges.includes(e.id);return`
    <div class="challenge-card ${t?`solved`:``}">
      <span class="challenge-difficulty difficulty-${e.difficulty}">
        ${e.difficulty}
      </span>
      <h3 class="challenge-title">${e.title}</h3>
      <p class="challenge-desc">${e.description}</p>
      <p class="challenge-xp">⚡ ${e.xp} XP</p>
      
      ${t?`<p class="text-primary mt-1">✓ Solved!</p>`:`
        <div class="challenge-input">
          <input type="text" id="input-${e.id}" placeholder="Enter answer...">
          <button onclick="submitAnswer('${e.id}')">Submit</button>
        </div>
        <div class="challenge-feedback" id="feedback-${e.id}"></div>
      `}
    </div>
  `}window.submitAnswer=e=>{let n=w.challenges.challenges.find(t=>t.id===e),r=document.getElementById(`input-${e}`),i=document.getElementById(`feedback-${e}`),o=r.value.trim().toLowerCase(),s=n.answer.toLowerCase(),c=(n.altAnswers||[]).map(e=>e.toLowerCase());if(o===s||c.includes(o)){w.solvedChallenges.push(e),t.set(`solvedChallenges`,w.solvedChallenges);let r=a.addXP(n.xp);B(),i.className=`challenge-feedback show correct`,i.textContent=`✓ Correct! +${n.xp} XP`,_(),m(`Challenge solved! +${n.xp} XP`,`success`),r.levelUp&&setTimeout(()=>{m(`🎉 Level Up! Level ${r.newLevel}!`,`xp`,5e3)},1e3),setTimeout(()=>{E(`challenges`)},1500)}else i.className=`challenge-feedback show incorrect`,i.textContent=`✗ Incorrect. Try again!`};function P(e){let t=w.cheatsheet.categories,n=w.cheatsheet.cheats;e.innerHTML=`
    <h1 class="section-title">Cheat Sheet</h1>
    
    <div class="cheatsheet-search">
      <input type="text" id="cheatsheet-search" placeholder="Search commands..." oninput="searchCheatsheet()">
    </div>

    <div class="cheatsheet-categories">
      ${t.map(e=>`
        <button class="category-btn ${e===`All`?`active`:``}" onclick="filterCheatsheet('${e}')">
          ${e}
        </button>
      `).join(``)}
    </div>

    <div class="cheatsheet-list" id="cheatsheet-list">
      ${n.map(e=>F(e)).join(``)}
    </div>
  `,window.searchCheatsheet=()=>{let e=document.getElementById(`cheatsheet-search`).value.toLowerCase(),t=n.filter(t=>t.command.toLowerCase().includes(e)||t.description.toLowerCase().includes(e));document.getElementById(`cheatsheet-list`).innerHTML=t.map(e=>F(e)).join(``)},window.filterCheatsheet=e=>{document.querySelectorAll(`.category-btn`).forEach(e=>e.classList.remove(`active`)),event.target.classList.add(`active`);let t=e===`All`?n:n.filter(t=>t.category===e);document.getElementById(`cheatsheet-list`).innerHTML=t.map(e=>F(e)).join(``)}}function F(e){return`
    <div class="cheat-item">
      <div class="cheat-header">
        <code class="cheat-command" onclick="copyCommand(this)">${e.command}</code>
        <span class="cheat-category">${e.category}</span>
      </div>
      <p class="cheat-desc">${e.description}</p>
    </div>
  `}window.copyCommand=e=>{navigator.clipboard.writeText(e.textContent),e.classList.add(`copied`),e.textContent=`Copied!`,setTimeout(()=>{e.classList.remove(`copied`),e.textContent=e.dataset.original||e.textContent},1500)};function I(e){e.innerHTML=`
    <h1 class="section-title">Projects</h1>
    <p class="mb-3" style="color: var(--text-dim);">Showcase your work and achievements!</p>
    
    <div class="projects-grid">
      <div class="project-card">
        <div class="project-image">🔐</div>
        <div class="project-content">
          <h3 class="project-title">Network Scan Report</h3>
          <p class="project-desc">Completed Nmap scan of local network with service detection.</p>
          <div class="project-tags">
            <span class="project-tag">Nmap</span>
            <span class="project-tag">Networking</span>
          </div>
        </div>
      </div>
      
      <div class="project-card">
        <div class="project-image">💀</div>
        <div class="project-content">
          <h3 class="project-title">Password Cracking Lab</h3>
          <p class="project-desc">Practiced hash cracking with John the Ripper.</p>
          <div class="project-tags">
            <span class="project-tag">John</span>
            <span class="project-tag">Crypto</span>
          </div>
        </div>
      </div>
      
      <div class="project-card">
        <div class="project-image">🌐</div>
        <div class="project-content">
          <h3 class="project-title">Web App Testing</h3>
          <p class="project-desc">Basic security assessment of a vulnerable web application.</p>
          <div class="project-tags">
            <span class="project-tag">Burp Suite</span>
            <span class="project-tag">Web Security</span>
          </div>
        </div>
      </div>
    </div>
  `}function L(e){e.innerHTML=`
    <h1 class="section-title">Admin Panel</h1>
    
    ${C.hasToken()?`
      <div class="admin-panel active">
        <div class="flex-between mb-2">
          <p class="text-primary">✓ Connected to GitHub</p>
          <button class="btn" onclick="disconnectGitHub()">Disconnect</button>
        </div>
        
        <div class="admin-tabs">
          <button class="admin-tab active" onclick="switchAdminTab('progress')">Progress</button>
          <button class="admin-tab" onclick="switchAdminTab('challenges')">Challenges</button>
          <button class="admin-tab" onclick="switchAdminTab('settings')">Settings</button>
        </div>
        
        <div class="admin-content" id="admin-content">
          <h3 class="mb-2">Sync Progress</h3>
          <p class="mb-2" style="color: var(--text-dim);">Save your learning progress to GitHub.</p>
          <button class="btn btn-success" onclick="syncProgress()">⬆ Sync to GitHub</button>
        </div>
      </div>
    `:`
      <div class="admin-login">
        <div class="card">
          <h3 class="card-title mb-2">GitHub Authentication</h3>
          <p class="mb-2" style="color: var(--text-dim);">Connect your GitHub account to sync progress.</p>
          
          <div class="admin-form">
            <div class="form-group">
              <label>GitHub Token (Classic)</label>
              <input type="password" id="github-token" placeholder="ghp_xxxxxxxxxxxx">
              <small style="color: var(--text-dim);">Settings → Developer settings → Personal access tokens → Tokens (classic)</small>
            </div>
            
            <button class="btn btn-success" onclick="connectGitHub()">Connect</button>
          </div>
        </div>
      </div>
    `}
  `}window.connectGitHub=async()=>{let e=document.getElementById(`github-token`).value.trim();if(!e){m(`Please enter a token`,`error`);return}C.setToken(e);let t=await C.verifyToken();t.valid?(m(`Connected as ${t.user.login}!`,`success`),E(`admin`)):(C.removeToken(),m(`Invalid token. Please check and try again.`,`error`))},window.disconnectGitHub=()=>{C.removeToken(),m(`Disconnected from GitHub`,`info`),E(`admin`)},window.syncProgress=async()=>{try{let e={user:`irfan`,lastUpdated:new Date().toISOString(),xp:a.getXP(),level:a.getLevel(),completedModules:w.progress,solvedChallenges:w.solvedChallenges};await C.commitProgress(e),m(`Progress synced to GitHub!`,`success`)}catch(e){m(`Failed to sync: `+e.message,`error`)}};function R(e){return e.modules.filter(e=>w.progress[e.id]).length/e.modules.length*100}function z(e){return e.modules.every(e=>w.progress[e.id])}function B(){let e=document.getElementById(`xp-badge`);e&&(e.textContent=a.getBadgeText())}window.showPhaseDetail=e=>{console.log(`Phase clicked:`,e)};