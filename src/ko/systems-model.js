// All devices, commands, addresses and files below are a browser-local teaching model.
// No command is executed and no network traffic leaves the browser.
export const desktopConnections=[
 {id:'pcPower',label:'PC 전원',type:'power',from:'멀티탭',to:'PC · AC IN',detail:'전원은 PSU에서 각 부품에 필요한 직류 전압으로 변환돼요.'},
 {id:'monitorPower',label:'모니터 전원',type:'power',from:'멀티탭',to:'모니터 · DC IN',detail:'화면 신호와 전원은 별개입니다. HDMI만 연결하면 모니터가 켜지지 않아요.'},
 {id:'display',label:'화면 케이블',type:'video',from:'PC · HDMI OUT',to:'모니터 · HDMI IN',detail:'GPU가 만든 화면을 모니터로 보냅니다. 이 실습은 외장 GPU 출력에 연결해요.'},
 {id:'keyboard',label:'키보드',type:'usb',from:'키보드 · USB',to:'PC · USB 포트',detail:'키 입력을 USB HID 보고서로 보냅니다. PC가 입력을 해석해 프로그램에 전달해요.'},
 {id:'mouse',label:'마우스',type:'usb',from:'마우스 · USB',to:'PC · USB 포트',detail:'이동량과 버튼 상태가 USB로 전달됩니다. 커서와 클릭 결과는 모니터로 출력돼요.'},
 {id:'ethernet',label:'네트워크',type:'network',from:'PC · RJ45',to:'라우터 · LAN 1',detail:'이더넷 링크와 IP 설정이 있어야 통신할 수 있어요. 실습의 라우터는 DHCP로 192.168.10.20을 할당합니다.'}
];
export const serverConnections=[
 {id:'mains',label:'시설 전원 → UPS',type:'power',from:'시설 전원',to:'UPS 입력',detail:'UPS는 정전 시 잠시 전력을 유지해 안전한 종료 시간을 확보합니다. 이 실습은 배터리 유지 시간을 15초로 압축한 모델입니다.'},
 {id:'pdu',label:'UPS → PDU',type:'power',from:'UPS 출력',to:'랙 PDU',detail:'PDU가 랙의 서버·스위치·라우터에 전력을 분배합니다. 이 모델의 이중 PSU는 같은 UPS/PDU를 공유하므로 전원 경로 전체가 이중화된 것은 아니에요.'},
 {id:'psuA',label:'PSU A',type:'power',from:'PDU · 01',to:'서버 전원 A',detail:'서버에 전력을 공급하는 첫 번째 전원 모듈입니다. 단독으로도 전체 부하를 감당하는 모델이에요.'},
 {id:'psuB',label:'PSU B',type:'power',from:'PDU · 02',to:'서버 전원 B',detail:'A와 B 중 하나가 분리돼도 나머지가 부하를 담당합니다. 독립 회로 구성은 별도 설계가 필요해요.'},
 {id:'nic',label:'서버 → 스위치',type:'network',from:'서버 · NIC 1',to:'스위치 · 01',detail:'같은 서브넷의 관리 PC와 서버 사이에서 프레임을 전달합니다. 서버의 IP는 설치 화면에서 설정해요.'},
 {id:'uplink',label:'스위치 → 라우터',type:'network',from:'스위치 · 24',to:'라우터 · LAN',detail:'다른 네트워크로 가는 기본 경로입니다. 같은 VLAN의 PC↔서버 통신은 라우터를 거치지 않습니다.'},
 {id:'client',label:'관리 PC → 스위치',type:'network',from:'관리 PC · RJ45',to:'스위치 · 02',detail:'관리 PC 10.20.0.100에서 SSH나 HTTP로 서버에 접근합니다. 이 실습은 하나의 VLAN을 사용해요.'},
 {id:'console',label:'로컬 콘솔',type:'usb',from:'KVM · USB + 영상',to:'서버 · 콘솔 포트',detail:'네트워크가 끊겨도 서버에 직접 연결된 화면과 키보드로 관리할 수 있어요.'}
];
export const deskSteps=[
 ['PC 전원 연결','에너지의 출발점','pcPower','PC 뒤 PSU의 AC 입력과 멀티탭을 연결합니다. 아직 컴퓨터는 꺼져 있어요.','전원 연결'],
 ['모니터 전원 연결','화면도 전기가 필요해요','monitorPower','모니터 어댑터를 연결합니다. 화면 신호가 없으면 대기 상태가 됩니다.','모니터 전원 연결'],
 ['영상 케이블 연결','픽셀이 이동하는 길','display','PC의 HDMI 출력과 모니터 입력을 연결합니다. 전원과 영상 케이블을 따로 구분해 보세요.','HDMI 연결'],
 ['키보드 연결','글자 입력의 시작','keyboard','키보드의 USB 플러그를 PC에 연결합니다. 입력 장치의 신호는 운영체제를 거쳐 프로그램으로 전달돼요.','키보드 연결'],
 ['마우스 연결','움직임을 입력하다','mouse','마우스를 USB 포트에 연결합니다. 물리적인 움직임이 화면 속 포인터의 이동으로 바뀝니다.','마우스 연결'],
 ['네트워크 연결','컴퓨터 밖과 대화하기','ethernet','RJ45 케이블로 라우터의 LAN 포트와 연결합니다. 이 실습은 DHCP가 주소를 자동 할당하는 작은 네트워크입니다.','LAN 케이블 연결'],
 ['전원 켜기','POST → 운영체제','boot','전원 버튼을 누르면 하드웨어 점검 후 실습용 운영체제로 부팅합니다. 모니터 전원과 HDMI가 모두 연결돼야 화면이 보여요.','PC 켜기'],
 ['키보드 입출력','입력 → 처리 → 출력','input','HELLO, PC!라는 입력을 보내보세요. USB 신호가 PC에 들어가고 글자가 화면으로 나오는 경로가 빛납니다. 아래 입력창에 다른 문장도 보낼 수 있어요.','예시 키 입력 보내기'],
 ['마우스 입출력','클릭이 화면을 바꾸다','pointer','가상 마우스로 화면의 버튼을 클릭합니다. 클릭 이벤트가 처리되면 모니터에 완료 표시가 나타나요.','마우스로 클릭'],
 ['통신 확인 · 분리 실험','연결이 끊기면?','ping','게이트웨이에 ICMP 요청과 응답을 주고받습니다. 이제 아래 연결 패널에서 HDMI·USB·LAN을 하나씩 분리하고 무엇이 멈추는지 비교해 보세요.','ping 테스트']
].map(([name,tag,action,body,button])=>({name,tag,action,body,button}));
export const serverSteps=[
 ['랙에 서버 장착','01 / HARDWARE','rack','레일을 고정하고 서버를 랙으로 밀어 넣습니다. 무거운 장비는 아래쪽에 배치하고 앞뒤 공기 흐름을 확보합니다. 실습 모델은 2U 서버와 12U 랙입니다.','서버 장착'],
 ['스토리지 장착','02 / HARDWARE','disks','480 GB SSD 두 개를 드라이브 베이에 장착합니다. 설치 과정에서 단일 디스크 또는 데이터 미러링(RAID 1) 개념 구성을 선택할 수 있어요.','SSD 2개 장착'],
 ['전원 경로 연결','03 / POWER','power','시설 전원 → UPS → PDU → 서버 PSU A/B를 연결합니다. 스위치와 라우터도 PDU에서 전력을 공급받습니다.','전원 배선 연결'],
 ['네트워크 배선','04 / NETWORK','network','서버와 관리 PC를 같은 스위치에 연결하고 라우터로 업링크를 연결합니다. LAN은 10.20.0.0/24, 라우터는 10.20.0.1입니다.','네트워크 배선 연결'],
 ['콘솔 연결','05 / CONSOLE','console','KVM의 모니터·키보드를 서버에 직접 연결합니다. 설치 전이나 네트워크 장애 상황에서도 로컬 콘솔을 사용할 수 있어요.','KVM 연결'],
 ['설치 미디어 준비','06 / BOOT MEDIA','media','Ubuntu Server 24.04 LTS 설치 ISO를 가상 USB에 넣습니다. 실제 장비에서는 공식 ISO의 무결성을 확인하고 부팅 USB 또는 BMC 가상 미디어를 사용합니다.','가상 USB 연결'],
 ['전원 · UEFI 부팅','07 / BOOT','boot','서버를 켜고 POST에서 CPU·RAM·SSD를 확인합니다. UEFI 부팅 메뉴에서 설치 USB를 선택해 Linux 설치 프로그램으로 진입합니다.','UEFI에서 USB 부팅'],
 ['Linux 설치','08 / OPERATING SYSTEM','install','언어·키보드 → IP → 저장 장치 → 관리자 계정·SSH → 설치 순서로 진행합니다. 실제 디스크를 쓰지 않는 Ubuntu Server 기반의 학습용 설치 화면입니다.','Linux 설치 시작'],
 ['미디어 제거 · 재부팅','09 / FIRST BOOT','reboot','설치 USB를 분리하고 로컬 디스크에서 재부팅합니다. 커널과 서비스가 시작되고 새 Linux 서버의 로그인 환경이 준비됩니다.','USB 제거 후 재부팅'],
 ['SSH 원격 접속','10 / REMOTE ACCESS','ssh','관리 PC에서 SSH로 접속합니다. 같은 서브넷이므로 PC → 스위치 → 서버 경로를 사용해요. 실습용 공개키 인증을 적용합니다.','관리 PC에서 SSH 접속'],
 ['웹 서비스 설치','11 / SERVICE','service','패키지 정보를 갱신하고 nginx를 설치합니다. 웹 서버가 TCP 80번 포트에서 HTTP 요청을 기다리게 됩니다. 실습 콘솔에서도 명령을 직접 입력할 수 있어요.','nginx 설치 · 시작'],
 ['방화벽 구성','12 / FIREWALL','firewall','SSH 접속을 유지할 22번 포트와 HTTP 80번 포트를 허용한 뒤 UFW를 켭니다. 이 실습은 업무용 LAN 안의 접근만 다루며 인터넷 공개는 하지 않습니다.','SSH · HTTP 허용 후 활성화'],
 ['요청 · 응답 확인','13 / VERIFY','request','관리 PC가 office.example의 IP를 DNS로 찾고 HTTP 요청을 보냅니다. 서버가 페이지를 반환하면 네트워크·운영체제·서비스가 함께 동작한 것입니다.','웹 페이지 요청'],
 ['백업 · 장애 실험','14 / OPERATE','backup','웹 콘텐츠의 별도 백업을 생성합니다. RAID는 디스크 장애 대응이며 삭제·손상에 대비한 백업을 대체하지 않아요. 이제 전원·LAN·DNS 장애도 시험해 보세요.','실습 백업 생성']
].map(([name,tag,action,body,button])=>({name,tag,action,body,button}));
export function createDesktop(){return {connections:Object.fromEntries(desktopConnections.map(c=>[c.id,false])),on:false,text:'',clicks:0,step:0,completed:0,events:[],lastFlow:null};}
export function createServer(){return {connections:Object.fromEntries(serverConnections.map(c=>[c.id,false])),rack:false,disks:false,media:false,on:false,booted:false,installed:false,installing:false,needsReboot:false,step:0,completed:0,battery:15,batteryActive:false,dnsFault:false,session:'local',ssh:false,nginx:false,nginxInstalled:false,firewall:false,allowSSH:false,allowHTTP:false,backup:false,webContent:'Hello from PC LAB',network:{mode:'static',ip:'10.20.0.10',prefix:24,gateway:'10.20.0.1',dns:'10.20.0.1'},host:'office-web',user:'admin',storage:'mirror',language:'English',keyboard:'us',sshRequested:true,events:[],lastFlow:null};}
export function desktopStatus(s){const c=s.connections;const running=s.on&&c.pcPower;return {running,screen:running&&c.monitorPower&&c.display,keyboard:running&&c.keyboard,mouse:running&&c.mouse,network:running&&c.ethernet,ip:running&&c.ethernet?'192.168.10.20':'—'};}
export function serverStatus(s){const c=s.connections;const ups=c.mains||s.batteryActive&&s.battery>0;const distribution=ups&&c.pdu;const power=distribution&&(c.psuA||c.psuB);const running=power&&s.on&&s.booted&&s.installed&&!s.needsReboot;const serverLink=running&&distribution&&c.nic;const clientLink=distribution&&c.client;const lan=serverLink&&clientLink;const gateway=serverLink&&c.uplink;const clientGateway=clientLink&&c.uplink;const dns=gateway&&!s.dnsFault&&s.network.dns==='10.20.0.1';const clientDNS=clientGateway&&!s.dnsFault;return {power,distribution,running,lan,gateway,clientGateway,dns,clientDNS,local:running&&c.console,ssh:lan&&s.ssh&&(!s.firewall||s.allowSSH),http:lan&&s.nginx&&(!s.firewall||s.allowHTTP),redundant:power&&c.psuA&&c.psuB};}
export function event(s,message){s.events.unshift(message);s.events=s.events.slice(0,7);}
export function reconcileServer(s){const q=serverStatus(s);if(!q.power){if(s.on)event(s,'전원 상실: 서버가 정지했습니다. 연결 복구 후 전원을 다시 켜세요.');s.on=false;s.booted=false;if(s.installing){s.installing=false;s.installed=false;s.needsReboot=false;event(s,'설치 중단: 가상 디스크 설치를 처음부터 다시 진행하세요.');}}if(s.session==='remote'&&!q.ssh){s.session='client';event(s,'SSH 세션 종료: 전원·LAN·SSH 방화벽을 확인하세요.');}}
export function toggleConnection(kind,s,id){if(!(id in s.connections))return;s.connections[id]=!s.connections[id];event(s,`${id} ${s.connections[id]?'연결':'분리'}`);if(kind==='desktop'&&!s.connections.pcPower)s.on=false;if(kind==='server'){if(id==='mains'){if(s.connections.mains){s.battery=15;s.batteryActive=false;}else{s.batteryActive=s.battery>0;}}reconcileServer(s);}}
export function validateConfig(c){const ipv4=v=>/^\d{1,3}(\.\d{1,3}){3}$/.test(v)&&v.split('.').every(n=>Number(n)<=255);if(!/^[a-z][a-z0-9-]{0,30}$/.test(c.host))return '호스트 이름은 소문자로 시작하고 소문자·숫자·하이픈을 사용하세요 (최대 31자).';if(!/^[a-z][a-z0-9_-]{0,30}$/.test(c.user))return '사용자 이름은 소문자로 시작하는 영문·숫자·밑줄·하이픈을 사용하세요.';if(c.network.mode==='static'){if(!ipv4(c.network.ip)||!c.network.ip.startsWith('10.20.0.'))return '이 실습 LAN의 IPv4는 10.20.0.2–254 범위입니다.';const end=Number(c.network.ip.split('.')[3]);if(end<2||end>254||end===100)return '게이트웨이(.1), 관리 PC(.100), 네트워크(.0), 브로드캐스트(.255) 주소를 제외하세요.';}if(c.network.gateway!=='10.20.0.1')return '실습 라우터의 게이트웨이는 10.20.0.1입니다.';if(!ipv4(c.network.dns))return 'DNS 서버의 IPv4 주소 형식을 확인하세요.';return '';}
export function desktopAction(s,action,value){const q=desktopStatus(s);if(action in s.connections){s.connections[action]=true;return `${action} 연결 완료`;}if(action==='boot'){if(!s.connections.pcPower)return {error:'PC 전원 케이블을 먼저 연결하세요.'};s.on=true;event(s,'POST OK → 실습 운영체제 부팅 완료');return '부팅 완료';}if(action==='input'){if(!q.keyboard)return {error:'PC를 켜고 키보드를 연결하세요.'};s.text=value||'HELLO, PC!';s.lastFlow='input';return q.screen?'USB 입력 → CPU 처리 → HDMI 출력':'키 입력은 처리됐지만 화면 출력이 끊겼어요.';}if(action==='pointer'){if(!q.mouse)return {error:'PC를 켜고 마우스를 연결하세요.'};s.clicks++;s.lastFlow='pointer';return q.screen?'마우스 클릭을 처리하고 화면을 갱신했어요.':'클릭은 처리됐지만 화면 출력이 끊겼어요.';}if(action==='ping'){if(!q.network)return {error:'PC 전원과 LAN 케이블을 확인하세요.'};s.lastFlow='ping';return '192.168.10.1 응답 · 4/4 수신 · 모의 RTT 1 ms';}}
export function serverAction(s,action){const c=s.connections,q=serverStatus(s);const fail=error=>({error});
 if(action==='rack'){s.rack=true;return '랙 레일에 서버 고정 완료';}
 if(action==='disks'){if(!s.rack)return fail('먼저 서버를 랙에 장착하세요.');s.disks=true;return 'SSD 480 GB × 2 감지';}
 if(action==='power'){if(!s.rack)return fail('먼저 서버를 랙에 장착하세요.');for(const id of ['mains','pdu','psuA','psuB'])c[id]=true;s.battery=15;s.batteryActive=false;return 'UPS · PDU · 이중 PSU 전원 경로 연결';}
 if(action==='network'){for(const id of ['nic','uplink','client'])c[id]=true;return '서버 · 스위치 · 라우터 · 관리 PC 링크 연결';}
 if(action==='console'){c.console=true;return 'KVM 콘솔 연결';}
 if(action==='media'){s.media=true;return 'Ubuntu Server 24.04 LTS 가상 USB 준비';}
 if(action==='boot'){if(!q.power)return fail('UPS → PDU → PSU 중 하나 이상의 전원 경로가 필요해요.');if(!s.disks)return fail('먼저 SSD를 장착하세요.');if(!c.console)return fail('부팅 화면을 볼 KVM 콘솔을 연결하세요.');if(!s.media&&!s.installed)return fail('설치 USB를 연결하세요.');s.on=true;s.booted=true;return s.installed&&!s.media?'Linux 부팅 완료':'POST OK · UEFI USB → Ubuntu 설치 준비';}
 if(action==='install'){if(!q.power||!s.on||!s.booted||!s.media||!c.console)return fail('전원·KVM·설치 USB를 연결하고 UEFI USB 부팅을 먼저 진행하세요.');return {installer:true};}
 if(action==='reboot'){if(!s.installed)return fail('먼저 Linux 설치를 완료하세요.');if(!q.power)return fail('전원 경로를 복구하세요.');s.media=false;s.needsReboot=false;s.on=true;s.booted=true;return '설치 미디어 제거 → 디스크 부팅 → Linux 준비 완료';}
 if(action==='ssh'){if(!q.ssh)return fail('서버 부팅, LAN 연결, OpenSSH 설치와 22번 포트 허용 상태를 확인하세요. 로컬 콘솔에서 sudo apt install openssh-server로 설치할 수 있어요.');s.session='remote';s.lastFlow='ssh';return `공개키 인증 성공 · ${s.user}@${s.host} 접속`;}
 if(action==='service'){if(!q.running)return fail('먼저 Linux를 부팅하세요.');if(!q.gateway||!q.dns)return fail('패키지 저장소에 접근하려면 LAN·업링크·DNS가 필요해요.');s.nginx=true;s.nginxInstalled=true;return 'apt update → apt install nginx → nginx active (running)';}
 if(action==='firewall'){if(!q.running)return fail('먼저 Linux를 부팅하세요.');s.allowSSH=true;s.allowHTTP=true;s.firewall=true;return '22/tcp · 80/tcp 허용 → UFW 활성화';}
 if(action==='request'){if(!q.clientDNS)return fail('office.example 이름을 찾을 수 없어요. 업링크와 DNS 설정을 확인하세요. IP 주소 요청과 비교해 보세요.');if(!q.http)return fail('HTTP 연결 실패: 서버·LAN·nginx·80번 포트 허용 상태를 확인하세요.');s.lastFlow='http';return `DNS office.example → ${s.network.ip} · HTTP/1.1 200 OK · ${s.webContent}`;}
 if(action==='backup'){if(!q.running||!s.nginx)return fail('Linux와 웹 서비스를 먼저 준비하세요.');s.backup=true;s.backupContent=s.webContent;return '별도 모의 백업 저장소에 웹 콘텐츠 복사 완료';}
 return fail('지원하지 않는 실습 동작입니다.');
}
export function runCommand(s,raw){const cmd=raw.trim().replace(/\s+/g,' '),q=serverStatus(s);const result=(output,flow=null)=>({output,flow});
 if(cmd==='help')return result('실습 명령 (실제 시스템에는 실행되지 않음)\nhelp · clear · hostname · whoami · uname -a · ls · pwd\nip addr · ip route · df -h · free -h\nping 10.20.0.1 · ping office.example\nssh '+s.user+'@'+s.network.ip+' · exit\nsudo apt update · sudo apt install nginx · sudo apt install openssh-server\nsystemctl status nginx · sudo systemctl start nginx · sudo systemctl stop nginx\nsudo ufw allow OpenSSH · sudo ufw allow 80/tcp · sudo ufw enable · sudo ufw status\ncurl http://office.example · curl http://'+s.network.ip+'\nbackup · restore');
 if(cmd==='clear')return {clear:true};
 const client=s.session==='client';const resolver=client?q.clientDNS:q.dns;
 if(!client&&!q.local&&s.session!=='remote')return result('로컬 콘솔 사용 불가: Linux 부팅과 KVM 연결을 확인하세요.');
 if(s.session==='remote'&&!q.ssh){s.session='client';return result('SSH 연결이 끊겼습니다. 관리 PC로 돌아갑니다.');}
 if(cmd==='exit'){s.session='client';return result('Connection closed. 관리 PC로 돌아왔습니다.');}
 if(cmd.startsWith('ssh ')){if(!client)return result('관리 PC 탭에서 SSH 접속을 시작하세요.');const target=cmd.slice(4);if(target!==`${s.user}@${s.network.ip}`&&target!==`${s.user}@office.example`)return result('실습 서버의 사용자@IP 또는 사용자@office.example을 입력하세요.');if(target.endsWith('office.example')&&!resolver)return result('ssh: Could not resolve hostname office.example');if(!q.ssh)return result('ssh: Connection failed. 전원·LAN·OpenSSH·22/tcp를 확인하세요.');s.session='remote';return result(`Ubuntu Server 24.04 LTS (simulation)\nPublic-key authentication accepted.\nWelcome, ${s.user}.`,'ssh');}
 if(cmd==='whoami')return result(client?'operator':s.user);if(cmd==='hostname')return result(client?'admin-pc':s.host);
 if(cmd==='uname -a')return result('Linux '+(client?'admin-pc':s.host)+' 6.8.0-generic x86_64 GNU/Linux [SIMULATED]');
 if(cmd==='pwd')return result(client?'/home/operator':`/home/${s.user}`);if(cmd==='ls')return result(client?'Documents  Downloads':`README.txt  www`);
 if(cmd==='ip addr')return result(client?'eth0: '+(s.connections.client&&q.distribution?'UP':'DOWN')+'\ninet 10.20.0.100/24':`eno1: ${s.connections.nic&&q.distribution?'UP':'NO-CARRIER'}\ninet ${s.network.ip}/24\nlo: 127.0.0.1/8`);
 if(cmd==='ip route')return result(`default via 10.20.0.1 dev ${client?'eth0':'eno1'}\n10.20.0.0/24 dev ${client?'eth0':'eno1'}`);
 if(cmd==='df -h')return result(client?'Filesystem /dev/sda2 · 80G · 22G used':`Filesystem             Size   Used   Mounted on\n${s.storage==='mirror'?'/dev/md0':'/dev/sda2'}                446G   4.2G   /\n/dev/sda1              1.0G   6M     /boot/efi\n용량과 파티션은 학습용 근사치입니다. 미러링은 백업이 아닙니다.`);
 if(cmd==='free -h')return result('              total      used      available\nMem:           32Gi     1.2Gi         30Gi');
 if(cmd.startsWith('ping ')){const target=cmd.slice(5);if(!['10.20.0.1','office.example',s.network.ip,'10.20.0.100'].includes(target))return result('실습 대상: 10.20.0.1, office.example, '+s.network.ip+', 10.20.0.100');if(target==='office.example'&&!resolver)return result('ping: office.example: Temporary failure in name resolution');const self=(!client&&target===s.network.ip)||(client&&target==='10.20.0.100');const reach=self||(target==='10.20.0.1'?(client?q.clientGateway:q.gateway):q.lan);if(!reach)return result('Destination Host Unreachable\n4 packets transmitted, 0 received, 100% packet loss');return result(`64 bytes from ${target}: icmp_seq=1 ttl=64 time=0.8 ms\n64 bytes from ${target}: icmp_seq=2 ttl=64 time=1.0 ms\n4 packets transmitted, 4 received, 0% packet loss\n(응답 시간은 모의 값입니다.)`,self?'loopback':target==='10.20.0.1'?'ping-gateway':target==='office.example'?'ping-dns':'ping');}
 if(cmd.startsWith('curl ')){const target=cmd.slice(5).replace(/^https?:\/\//,'').replace(/\/$/,'');if(!['office.example',s.network.ip,'localhost','127.0.0.1'].includes(target))return result('이 실습의 HTTP 대상은 office.example 또는 서버 IP입니다.');const local=['localhost','127.0.0.1'].includes(target);if(local&&client)return result('curl: Failed to connect to localhost port 80 (관리 PC에는 웹 서버가 없습니다.)');if(target==='office.example'&&!resolver)return result('curl: (6) Could not resolve host: office.example');if(local?!s.nginx:!q.http)return result('curl: (7) Failed to connect to port 80. LAN·nginx·UFW를 확인하세요.');return result(`HTTP/1.1 200 OK\nServer: nginx\n\n${s.webContent}\nHost: ${s.host}`,target==='office.example'?'http':local?'http-local':'http-ip');}
 if(client)return result('이 명령은 서버에서 실행하세요. SSH로 접속하거나 로컬 콘솔을 선택하세요.');
 if(cmd==='sudo apt update'){if(!q.dns)return result('Temporary failure resolving archive.ubuntu.com — 업링크·DNS를 확인하세요.');return result('Hit: Ubuntu noble / noble-updates / noble-security\nReading package lists... Done (simulation)');}
 if(cmd==='sudo apt install nginx'||cmd==='sudo apt install openssh-server'){if(!q.dns)return result('패키지 다운로드 실패: 게이트웨이와 DNS 연결을 확인하세요.');if(cmd.endsWith('nginx')){s.nginx=true;s.nginxInstalled=true;}else s.ssh=true;return result('Package installed. Service started. [simulation]');}
 if(cmd==='systemctl status nginx'||cmd==='sudo systemctl status nginx')return result(`nginx.service — A high performance web server\nActive: ${s.nginx?'active (running)':'inactive (dead)'}`);
 if(cmd==='sudo systemctl start nginx'){if(!s.nginxInstalled)return result('Unit nginx.service could not be found. 먼저 sudo apt install nginx로 설치하세요.');s.nginx=true;return result('nginx started.');}if(cmd==='sudo systemctl stop nginx'){s.nginx=false;return result('nginx stopped.');}
 if(cmd==='sudo ufw allow OpenSSH'||cmd==='sudo ufw allow 22/tcp'){s.allowSSH=true;return result('Rule added: 22/tcp ALLOW');}if(cmd==='sudo ufw allow 80/tcp'){s.allowHTTP=true;return result('Rule added: 80/tcp ALLOW');}
 if(cmd==='sudo ufw enable'){s.firewall=true;reconcileServer(s);return result(s.session==='client'?'Firewall active. SSH 규칙이 없어 세션이 끊겼습니다. KVM 콘솔에서 복구하세요.':'Firewall is active.');}
 if(cmd==='sudo ufw status')return result(`Status: ${s.firewall?'active':'inactive'}\n${s.allowSSH?'22/tcp ALLOW\n':''}${s.allowHTTP?'80/tcp ALLOW':''}`);
 if(cmd==='backup'){s.backup=true;s.backupContent=s.webContent;return result('웹 콘텐츠를 별도 모의 백업 저장소에 복사했습니다.');}
 if(cmd==='restore'){if(!s.backup)return result('백업이 없습니다. 먼저 backup을 실행하세요.');s.webContent=s.backupContent;return result('백업에서 웹 콘텐츠를 복원했습니다. curl로 확인하세요.');}
 return result('지원하지 않는 실습 명령입니다. help로 목록을 확인하세요.');
}
