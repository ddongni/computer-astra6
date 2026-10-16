export const icons = {
 box:'<path d="m12 3 9 5v8l-9 5-9-5V8z"/><path d="m3 8 9 5 9-5M12 13v8M7.5 5.5l9 5"/>',
 unbox:'<path d="m3 8 9 5 9-5M3 8v8l9 5 9-5V8M12 13v8M7 3 3 8M17 3l4 5M12 8V2m-3 3 3-3 3 3"/>',
 layers:'<path d="m12 3 10 5-10 5L2 8zM2 12l10 5 10-5M2 16l10 5 10-5"/>',
 sparkles:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5zM20 2v4m-2-2h4"/>',
 'arrow-up-right':'<path d="M6 18 18 6M6 6h12v12"/>',
 'arrow-right':'<path d="M4 12h16m-6-6 6 6-6 6"/>','arrow-left':'<path d="M20 12H4m6-6-6 6 6 6"/>','arrow-down':'<path d="M12 4v16m-6-6 6 6 6-6"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.1"/>',
 power:'<path d="M12 2v10m-6-7a9 9 0 1 0 12 0"/>',
 tag:'<path d="m3 3 9 .1 9 9-9 9-9-9z"/><circle cx="7.5" cy="7.5" r="1"/>',
 rotate:'<path d="M3 4v6h6M3 10a9 9 0 1 1 1 8"/>',
 expand:'<path d="M3 9V3h6m6 0h6v6M3 15v6h6m6 0h6v-6"/>',
 mouse:'<rect x="6" y="2" width="12" height="20" rx="6"/><path d="M12 5v5"/>',
 zoom:'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6M10 7v6m-3-3h6"/>',
 pointer:'<path d="m4 3 5 17 3-7 7-3z"/><path d="m13 14 5 6"/>',
 play:'<path d="m7 4 13 8-13 8z"/>',pause:'<path d="M8 4v16M16 4v16"/>',
 close:'<path d="m6 6 12 12M6 18 18 6"/>',check:'<path d="m5 12 4 4L19 6"/>',
 chip:'<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4M18 9h4m-4 6h4"/>',
 ram:'<path d="M3 6h18v11H3zM6 17v3m4-3v3m4-3v3m4-3v3M6 9h4v5H6zm8 0h4v5h-4z"/>',
 fan:'<circle cx="12" cy="12" r="2"/><path d="M10 10C3 8 6 2 10 3s3 5 2 7m2 0c2-7 8-4 7 0s-5 3-7 2m0 2c7 2 4 8 0 7s-3-5-2-7m-2 0c-2 7-8 4-7 0s5-3 7-2"/>',
 cable:'<path d="M6 2v4m4-4v4M4 6h8v3a4 4 0 0 1-8 0zM8 13v3a4 4 0 0 0 8 0v-5m-2 0h4V7h-4z"/>',
 gpu:'<path d="M2 7h20v11H2zM4 3v4m3 11v3h4v-3m3 0v3h4v-3"/><circle cx="8" cy="12.5" r="3"/><circle cx="17" cy="12.5" r="3"/>',
 ssd:'<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M6 9h5v6H6zM14 9h4m-4 3h4m-4 3h4"/>',
 motherboard:'<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M7 6h7v7H7zm10 0v7M7 16h10m-10 2h6"/>',
 shield:'<path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6z"/><path d="m8 12 3 3 5-6"/>'
};
export const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.box}</svg>`;
export const parts = {
 gpu:{name:'그래픽카드',english:'GRAPHICS CARD',short:'화면을 그리는 아티스트',icon:'gpu',description:'수많은 계산을 동시에 처리해 화면에 표시할 이미지를 만듭니다. 게임의 3D 그래픽, 영상 편집, AI 연산 등에서 활약해요. GPU는 그래픽카드 안에 있는 핵심 연산 칩입니다.',connection:'PCIe x16 슬롯',role:'그래픽 · 병렬 연산',tip:'PCIe 슬롯 잠금장치를 풀고, 보조 전원과 케이스 고정 나사를 먼저 분리하세요. 카드를 양손으로 잡아 수평으로 빼주세요.'},
 cpu:{name:'프로세서',english:'CPU / PROCESSOR',short:'컴퓨터의 생각을 담당해요',icon:'chip',description:'프로그램의 명령을 해석하고 계산하며 다른 부품의 작업을 조율합니다. 컴퓨터의 두뇌에 해당하는 중앙 처리 장치예요. 작업 중 발생하는 열은 CPU 쿨러가 식혀줍니다.',connection:'메인보드 CPU 소켓',role:'명령 해석 · 연산',tip:'소켓과 CPU의 삼각형 표시를 맞추세요. 접점이나 핀을 만지지 말고 가장자리만 잡으세요. 방향이 맞으면 힘을 주지 않아도 들어갑니다.'},
 ram:{name:'메모리',english:'RAM / MEMORY',short:'지금 하는 일의 작업 공간',icon:'ram',description:'실행 중인 프로그램과 데이터를 CPU가 빠르게 사용할 수 있도록 임시 보관합니다. 책상 위 작업 공간처럼 넉넉할수록 여러 작업을 함께 하기 좋아요. 전원을 끄면 저장된 내용은 사라집니다.',connection:'DIMM 메모리 슬롯',role:'작업 데이터 임시 보관',tip:'메모리 아래쪽 홈을 슬롯의 돌기와 맞추세요. 듀얼 채널 장착 위치와 한쪽 또는 양쪽 래치 구조는 메인보드 설명서에서 확인하세요.'},
 motherboard:{name:'메인보드',english:'MOTHERBOARD',short:'모든 부품을 연결하는 길',icon:'motherboard',description:'CPU, 메모리, 그래픽카드와 저장 장치가 서로 통신하도록 연결하는 중심 기판입니다. 소켓과 슬롯, 칩셋, 전원 회로가 모여 있어 컴퓨터 전체의 기반이 됩니다.',connection:'케이스 스탠드오프',role:'통신 연결 · 전원 분배',tip:'케이스 스탠드오프와 메인보드 나사 구멍이 일치하는지 확인하세요. 보드 아래 불필요한 스탠드오프가 있으면 합선이 생길 수 있습니다.'},
 ssd:{name:'SSD',english:'SOLID STATE DRIVE',short:'기억을 오래 간직하는 곳',icon:'ssd',description:'운영체제, 프로그램, 사진과 문서를 장기간 보관합니다. 전원을 꺼도 데이터가 유지됩니다. 이 모델은 메인보드에 직접 연결되는 M.2 NVMe SSD를 사용합니다.',connection:'M.2 슬롯',role:'운영체제 · 파일 저장',tip:'고정 나사를 푼 뒤 살짝 올라온 SSD를 슬롯 방향으로 빼주세요. 장착할 때는 비스듬히 꽂고 눌러 고정합니다. 나사를 과하게 조이지 마세요.'},
 psu:{name:'전원 공급 장치',english:'POWER SUPPLY',short:'모든 부품에 에너지를',icon:'power',description:'콘센트의 교류 전기를 PC 부품에 필요한 직류 전압으로 변환합니다. 메인보드와 CPU, 그래픽카드에 안정적인 전력을 공급해요. 다른 부품의 소비 전력을 고려해 용량을 선택합니다.',connection:'ATX · EPS · PCIe 전원',role:'전력 변환 · 공급',tip:'PSU 본체 내부는 열지 마세요. 전원을 뽑아도 위험한 전하가 남아 있을 수 있습니다. 모듈러 케이블은 반드시 해당 PSU와 호환되는 제품을 사용하세요.'},
 cooler:{name:'CPU 쿨러',english:'CPU COOLER',short:'뜨거운 열기를 식혀줘요',icon:'fan',description:'CPU의 열을 방열판으로 전달하고 팬의 바람으로 외부에 내보냅니다. CPU와 쿨러 사이의 서멀 페이스트는 미세한 틈을 메워 열 전달을 돕습니다.',connection:'CPU 브래킷 · CPU_FAN',role:'CPU 냉각',tip:'장착 방식에 맞춰 나사를 대각선 순서로 조금씩 풀거나 조이세요. 재장착할 때는 기존 서멀 페이스트를 닦고 제품 지침에 따라 새로 도포하세요.'},
 panel:{name:'사이드 패널',english:'SIDE PANEL',short:'부품을 보호하는 바깥 껍질',icon:'box',description:'컴퓨터 내부를 먼지와 외부 충격으로부터 보호합니다. 케이스는 부품을 단단히 지지하고 공기의 흐름을 만드는 역할도 합니다. 이 모델은 내부를 볼 수 있는 투명 패널을 사용합니다.',connection:'케이스 고정 나사',role:'보호 · 내부 접근',tip:'패널이 떨어지지 않도록 받친 뒤 고정 장치를 풀어주세요. 강화유리 패널은 모서리 충격과 단단한 바닥에 특히 주의하세요.'},
 cables:{name:'연결 케이블',english:'CABLE CONNECTIONS',short:'전기와 신호가 흐르는 통로',icon:'cable',description:'전원 케이블은 부품에 에너지를 전달하고, 신호 케이블은 버튼과 포트 등을 메인보드에 연결합니다. 이 모델에서는 메인보드 24핀 전원과 그래픽카드 전원 등을 묶어 보여줍니다.',connection:'전원 · 팬 · 전면 패널 헤더',role:'전력 · 신호 전달',tip:'다시 연결할 수 있도록 위치를 사진으로 남겨두세요. 잠금 탭을 누르고 플러그 몸체를 잡아 빼세요. 선 자체를 잡아당기지 마세요.'}
};
export const disassembly = [
 {part:null,name:'시작하기 전에',tag:'준비',icon:'power',body:'컴퓨터를 종료하고 전원 케이블과 주변 기기를 분리하세요. PSU 스위치를 끄고 전원 버튼을 잠시 누른 뒤, 정전기를 줄일 수 있는 작업 환경을 준비합니다.',tip:'시뮬레이션은 전원이 분리된 상태로 진행돼요.',action:'준비 완료'},
 {part:'panel',name:'사이드 패널 열기',tag:'케이스',body:'케이스 뒤쪽의 패널 고정 나사를 풀어주세요. 패널을 손으로 받치면서 바깥쪽으로 분리하면 컴퓨터 내부가 드러납니다.',tip:'분리한 패널은 부드럽고 평평한 곳에 놓아주세요.',action:'패널 분리하기'},
 {part:'cables',name:'연결 케이블 분리',tag:'연결',body:'메인보드, CPU, 그래픽카드 전원과 팬·전면 패널 케이블을 분리합니다. 잠금 탭을 먼저 누르고 커넥터 몸체를 잡아 조심히 빼주세요.',tip:'케이블 위치를 사진으로 남기면 재조립할 때 편리해요.',action:'케이블 분리하기'},
 {part:'gpu',name:'그래픽카드 분리',tag:'그래픽',body:'케이스 확장 슬롯의 고정 나사를 풀고 PCIe 슬롯의 잠금장치를 해제하세요. 그래픽카드를 양손으로 받쳐 슬롯에서 수평으로 빼냅니다.',tip:'보조 전원이 분리되었는지 먼저 확인하세요.',action:'그래픽카드 분리'},
 {part:'ram',name:'메모리 분리',tag:'메모리',body:'DIMM 슬롯의 고정 래치를 열어주세요. 메모리가 느슨해지면 양쪽 가장자리를 잡고 위로 곧게 들어 올립니다.',tip:'금색 접점을 만지지 말고 기판 가장자리를 잡으세요.',action:'메모리 분리하기'},
 {part:'cooler',name:'CPU 쿨러 분리',tag:'냉각',body:'쿨러의 고정 나사를 대각선 순서로 조금씩 풀어주세요. 장착 방식에 따라 서멀 페이스트의 접착을 조심히 풀고 쿨러를 들어 올립니다.',tip:'팬 커넥터가 분리됐는지 확인하고 무리하게 당기지 마세요.',action:'쿨러 분리하기'},
 {part:'cpu',name:'CPU 분리',tag:'프로세서',body:'CPU 소켓의 레버와 고정 덮개를 열어주세요. CPU의 가장자리를 잡고 수직으로 들어 올려 안전한 보관함에 놓습니다.',tip:'CPU 접점과 메인보드 소켓 핀을 건드리지 않도록 주의하세요.',action:'CPU 분리하기'},
 {part:'ssd',name:'SSD 분리',tag:'저장 장치',body:'M.2 SSD의 끝을 잡고 고정 나사를 풀어주세요. SSD가 살짝 올라오면 슬롯에서 비스듬히 빼냅니다.',tip:'작은 M.2 나사는 잃어버리지 않도록 따로 보관하세요.',action:'SSD 분리하기'},
 {part:'motherboard',name:'메인보드 분리',tag:'메인보드',body:'연결된 케이블이 없는지 다시 확인하고 보드 고정 나사를 풀어주세요. 메인보드 가장자리를 잡고 케이스에서 조심히 들어냅니다.',tip:'케이스 스탠드오프 위치를 기억해 두세요.',action:'메인보드 분리'},
 {part:'psu',name:'전원 공급 장치 분리',tag:'전원',body:'전원 공급 장치에 연결된 케이블을 확인한 뒤 케이스 뒤쪽 고정 나사를 풀어주세요. PSU를 받치며 케이스 밖으로 꺼냅니다.',tip:'PSU 전체만 분리하세요. PSU 본체 내부는 절대 열지 마세요.',action:'PSU 분리하기'}
];
export const assembly = [
 {part:'psu',name:'전원 공급 장치 장착',tag:'전원',body:'모든 전원이 분리된 상태에서 시작합니다. 케이스의 흡기구 방향에 맞춰 PSU를 넣고 뒤쪽 고정 나사를 체결하세요.',tip:'이 시뮬레이션의 조립 순서예요. 실제로는 제품 설명서와 작업 공간에 따라 달라져요.',action:'PSU 장착하기'},
 {part:'motherboard',name:'메인보드 장착',tag:'메인보드',body:'케이스의 스탠드오프와 메인보드 나사 구멍을 맞춥니다. I/O 쉴드가 별도라면 먼저 끼운 뒤, 보드를 놓고 고정 나사를 고르게 조여주세요.',tip:'나사를 너무 세게 조이지 마세요. 보드가 휘지 않아야 합니다.',action:'메인보드 장착'},
 {part:'ssd',name:'SSD 장착',tag:'저장 장치',body:'M.2 슬롯의 홈을 맞춰 SSD를 비스듬히 삽입합니다. 반대쪽 끝을 살짝 내려 스탠드오프에 맞춘 뒤 나사로 고정하세요.',tip:'메인보드 방열판을 사용하는 경우 보호 필름과 장착 지침을 확인하세요.',action:'SSD 장착하기'},
 {part:'cpu',name:'CPU 장착',tag:'프로세서',body:'소켓 레버와 덮개를 엽니다. CPU와 소켓의 방향 표시를 맞춰 살며시 놓은 뒤 고정 덮개와 레버를 닫아주세요.',tip:'CPU를 누르거나 밀어 넣지 마세요. 접점이나 핀은 만지지 않습니다.',action:'CPU 장착하기'},
 {part:'cooler',name:'CPU 쿨러 장착',tag:'냉각',body:'기존 서멀 페이스트를 닦고 제품 지침에 맞게 새로 도포합니다. 쿨러 바닥의 보호 필름을 확인하고, 브래킷에 맞춰 대각선 순서로 고르게 고정하세요.',tip:'쿨러에 서멀 페이스트가 미리 도포돼 있다면 추가 도포가 필요하지 않을 수 있어요.',action:'쿨러 장착하기'},
 {part:'ram',name:'메모리 장착',tag:'메모리',body:'설명서에서 권장 DIMM 슬롯을 확인하고 래치를 엽니다. 메모리의 홈을 맞춰 양쪽 끝을 고르게 눌러 고정하세요.',tip:'딸깍 소리와 함께 래치가 잠기고 메모리가 수평으로 고정되는지 확인하세요.',action:'메모리 장착하기'},
 {part:'gpu',name:'그래픽카드 장착',tag:'그래픽',body:'해당 확장 슬롯 커버를 분리하고 그래픽카드를 PCIe x16 슬롯에 맞춰 끼웁니다. 잠금장치가 걸리면 케이스에 나사로 고정하세요.',tip:'무거운 그래픽카드는 처짐을 막는 지지대가 필요할 수 있어요.',action:'그래픽카드 장착'},
 {part:'cables',name:'연결 케이블 연결',tag:'연결',body:'24핀 메인보드 전원, CPU 보조 전원, 그래픽카드 전원을 연결합니다. CPU_FAN, 전면 패널, USB 등 필요한 커넥터도 설명서에 맞춰 연결하세요.',tip:'CPU와 그래픽카드 전원 케이블을 혼동하지 마세요. 케이블이 팬에 닿지 않게 정리합니다.',action:'케이블 연결하기'},
 {part:'panel',name:'사이드 패널 닫기',tag:'케이스',body:'빠진 연결이나 남은 나사가 없는지 살펴봅니다. 패널이 케이블을 누르지 않도록 정리하고 케이스에 맞춰 고정하세요.',tip:'패널 나사는 부품을 흔들림 없이 고정할 정도로만 조여주세요.',action:'패널 장착하기'},
 {part:null,name:'마지막 연결 확인',tag:'완료 점검',icon:'shield',body:'CPU 쿨러, 전원 커넥터, 메모리와 그래픽카드의 체결을 확인하세요. 실제 PC에서는 주변 기기와 전원을 연결한 뒤 첫 부팅 및 BIOS에서 부품 인식을 점검합니다.',tip:'잘했어요! 부품의 연결 구조를 모두 살펴봤습니다.',action:'조립 완료하기'}
];
