# 용인 시민 데이터 허브 사회적협동조합

> 데이터로 함께 성장하는 지역 공동체

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

## 🌟 프로젝트 소개

**용인 시민 데이터 허브 사회적협동조합(YCDH)**은 용인특례시의 시민, 소상공인, 중소기업이 데이터의 주체가 되어 지역 문제를 해결하고 새로운 경제적 가치를 창출하는 협동조합입니다.

### 우리의 미션
- 📊 용인시 공공 데이터를 시민들이 쉽게 활용할 수 있도록 개방
- 🤝 지역 산업의 데이터 활용 어려움을 공동으로 해결
- 💡 데이터 기반 혁신이 지역 경제와 시민의 삶에 기여하는 생태계 구축

## 🎯 핵심 서비스

### 1. 데이터 사랑방
- 공공 데이터 활용 교육 및 워크숍
- 데이터 리빙랩 프로젝트
- 용인 데이터 챌린지

### 2. 우리동네 데이터 분석실
- 클라우드 기반 공유 분석 플랫폼
- 맞춤형 상권 분석 리포트
- 데이터 바우처 연계 컨설팅

### 3. 함께 푸는 산업 문제
- 소부장 기업 특화 협력 프로젝트
- 공정 개선 데이터 분석
- 공동 물류 최적화

## 📁 프로젝트 구조

```
yongin_civic_data_hub/
├── docs/                       # 문서
│   └── proposal.md            # 사업계획서
├── website/                   # 웹사이트
│   ├── index.html            # 메인 페이지
│   ├── styles.css            # 스타일시트
│   ├── script.js             # JavaScript
│   ├── google-sheets-setup.md # Google Sheets 연동 가이드
│   └── README.md             # 웹사이트 사용 설명서
├── .gitignore                # Git 제외 파일 목록
└── README.md                 # 프로젝트 README (현재 파일)
```

## 🚀 빠른 시작

### 웹사이트 로컬 실행

1. **저장소 클론**
   ```bash
   git clone https://github.com/yonghwan1106/yongin_civic_data_hub.git
   cd yongin_civic_data_hub
   ```

2. **웹사이트 열기**
   ```bash
   cd website
   # 브라우저로 index.html 열기
   # 또는 로컬 서버 실행:
   python -m http.server 8000
   ```

3. **브라우저 접속**
   ```
   http://localhost:8000
   ```

### Google Sheets 연동 설정

조합원 가입 신청 데이터를 Google Sheets에 자동으로 저장하려면:

1. `website/google-sheets-setup.md` 파일 참조
2. Google Apps Script 설정
3. `script.js` 파일에 URL 입력

자세한 내용은 [Google Sheets 설정 가이드](./website/google-sheets-setup.md) 참조

## 🎨 주요 기능

### 웹사이트
- ✅ 완전 반응형 디자인 (모바일, 태블릿, 데스크톱)
- ✅ 현대적인 Glassmorphism 디자인
- ✅ 부드러운 애니메이션 효과
- ✅ 온라인 조합원 가입 신청 폼
- ✅ Google Sheets 자동 연동

### 디자인 특징
- 🎨 모던한 색상 팔레트 및 그라디언트
- 🪟 Glassmorphism (글래스모피즘) 효과
- 🎬 스크롤 애니메이션
- 💳 3D 카드 호버 효과
- ✨ 그라디언트 텍스트

## 📊 조합원 유형

| 조합원 그룹 | 주요 니즈 | 제공 가치 |
|------------|----------|----------|
| **반도체 소부장 중소기업** | 데이터 분석을 통한 공정 개선, 수율 향상 | 저렴한 공유 분석 플랫폼, 협력 프로젝트 |
| **소상공인** | 상권 분석, 고객 패턴 파악 | 맞춤형 상권 분석 리포트, 마케팅 교육 |
| **시민 및 학생** | 데이터 리터러시 향상 | 공공데이터 활용 교육, 데이터 챌린지 |
| **용인시** | 데이터기반행정 실현 | 공식 데이터 분석 파트너, 정책 인사이트 |

## 🗺️ 로드맵

### 1단계 (설립 후 1년): 신뢰의 씨앗 뿌리기
- 협동조합 법인 설립
- 초기 조합원 30인(사) 확보
- 시범 프로젝트 성공
- 용인시 위탁 계약 체결

### 2단계 (2-3년차): 함께 가꾸는 데이터 텃밭
- 조합원 100인(사) 이상 확대
- 데이터 사랑방 정기 운영
- 분석실 공식 오픈
- 용인 데이터 챌린지 개최

### 3단계 (4-5년차): 풍성한 열매 나누기
- 재정적 자립 기반 마련
- 신규 데이터 솔루션 개발
- 청년 창업 인큐베이팅
- 연차보고서 발간

## 🌐 배포

### Vercel 배포 (권장)

1. **Vercel 계정 생성**: https://vercel.com
2. **GitHub 저장소 연결**
3. **배포 설정**:
   - Root Directory: `website`
   - Build Command: (없음 - 정적 사이트)
   - Output Directory: `.`

자세한 배포 가이드는 배포 후 제공됩니다.

### 기타 배포 옵션
- **Netlify**: 무료, 쉬운 설정
- **GitHub Pages**: GitHub 통합
- **일반 웹 호스팅**: FTP 업로드

## 🤝 기여하기

이 프로젝트는 용인 시민 데이터 허브 사회적협동조합을 위해 제작되었습니다.

개선 사항이나 버그를 발견하신 경우:
1. Issue 생성
2. Pull Request 제출
3. contact@ycdh.or.kr로 문의

## 📄 라이선스

Copyright © 2025 용인 시민 데이터 허브 사회적협동조합. All rights reserved.

## 📞 연락처

- **이메일**: contact@ycdh.or.kr
- **전화**: 031-XXXX-XXXX
- **주소**: 경기도 용인시 (설립 준비 중)

---

**데이터로 함께 성장하는 지역 공동체** 🌱

Made with ❤️ by 용인 시민 데이터 허브 사회적협동조합
