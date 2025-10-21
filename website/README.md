# 용인 시민 데이터 허브 사회적협동조합 웹사이트

## 📋 프로젝트 소개

용인 시민 데이터 허브 사회적협동조합의 공식 웹사이트입니다. 이 웹사이트는 협동조합 소개, 서비스 안내, 온라인 조합원 모집을 위해 제작되었습니다.

**핵심 기능:**
- 📱 반응형 디자인 (모바일, 태블릿, 데스크톱 지원)
- 🎨 현대적이고 전문적인 UI/UX
- ✍️ 온라인 조합원 가입 신청 폼
- 🎯 직관적인 네비게이션
- ⚡ 빠른 로딩 속도 및 성능 최적화

## 🚀 시작하기

### 필요 사항

웹 브라우저만 있으면 됩니다! 별도의 설치나 빌드 과정이 필요 없습니다.

### 로컬에서 실행하기

1. **파일 다운로드**
   ```bash
   # 이미 프로젝트 폴더가 있다면 website 폴더로 이동
   cd website
   ```

2. **웹 브라우저로 열기**
   - `index.html` 파일을 더블 클릭하거나
   - 웹 브라우저로 드래그하여 열기

3. **로컬 서버 실행 (선택사항)**

   더 나은 개발 경험을 위해 로컬 서버 사용을 권장합니다:

   **Python 사용:**
   ```bash
   # Python 3.x
   python -m http.server 8000

   # Python 2.x
   python -m SimpleHTTPServer 8000
   ```

   **Node.js 사용:**
   ```bash
   # http-server 설치 (한 번만 실행)
   npm install -g http-server

   # 서버 실행
   http-server -p 8000
   ```

   **VS Code Live Server 사용:**
   - VS Code에서 Live Server 확장 설치
   - `index.html` 파일에서 우클릭 → "Open with Live Server"

   그 다음 브라우저에서 `http://localhost:8000` 열기

## 📁 파일 구조

```
website/
├── index.html          # 메인 HTML 파일
├── styles.css          # 스타일시트
├── script.js           # JavaScript 기능
└── README.md          # 이 문서
```

## 🎨 주요 기능

### 1. 홈페이지 섹션
- **Hero Section**: 눈에 띄는 메인 배너와 CTA 버튼
- **비전**: 협동조합의 미션, 협력, 혁신 가치 소개
- **문제 & 해결책**: 우리가 해결하는 문제와 솔루션 제시
- **서비스**: 3가지 핵심 서비스 소개
- **조합원**: 4가지 조합원 유형과 제공 가치
- **추진계획**: 3단계 로드맵
- **사회적협동조합**: 선택 이유 설명

### 2. 온라인 조합원 가입 폼
- **가입 유형 선택**: 개인/기업 조합원
- **동적 폼**: 기업 선택 시 추가 필드 표시
- **유효성 검사**: 이메일, 전화번호 형식 자동 검증
- **자동 포맷팅**: 전화번호, 사업자등록번호 입력 시 자동 하이픈 추가
- **로컬 저장**: 제출된 데이터는 브라우저 localStorage에 저장

### 3. 인터랙티브 기능
- **스크롤 애니메이션**: 섹션이 화면에 나타날 때 부드러운 애니메이션
- **모바일 메뉴**: 반응형 햄버거 메뉴
- **부드러운 스크롤**: 앵커 링크 클릭 시 부드러운 페이지 이동
- **네비게이션 효과**: 스크롤 시 네비게이션 바 그림자 효과

## 🔧 커스터마이징

### 색상 변경

`styles.css` 파일의 `:root` 섹션에서 CSS 변수를 수정:

```css
:root {
    --primary-color: #2563eb;      /* 주요 색상 */
    --secondary-color: #1e40af;    /* 보조 색상 */
    --accent-color: #3b82f6;       /* 강조 색상 */
    /* ... */
}
```

### 콘텐츠 수정

`index.html` 파일에서 텍스트 내용을 직접 수정할 수 있습니다.

### 폰트 변경

현재 **Noto Sans KR** 폰트를 사용 중입니다. 변경하려면:

1. `index.html`의 `<head>` 섹션에서 Google Fonts 링크 수정
2. `styles.css`의 `body` 폰트 패밀리 수정

## 📊 데이터 수집

조합원 가입 신청 데이터는 현재 브라우저의 **localStorage**에 저장됩니다.

### 제출된 데이터 확인하기

브라우저 개발자 도구(F12)의 Console에서:

```javascript
// 모든 제출 데이터 확인
JSON.parse(localStorage.getItem('ycdh_submissions'))

// 데이터 내보내기
console.table(JSON.parse(localStorage.getItem('ycdh_submissions')))
```

### 실제 서버 연동

실제 운영 시에는 `script.js` 파일의 폼 제출 부분을 수정하여 서버로 데이터를 전송해야 합니다:

```javascript
// script.js의 joinForm.addEventListener('submit', ...) 부분 수정
const response = await fetch('https://your-api-endpoint.com/submit', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
});
```

## 🌐 배포 방법

### 1. GitHub Pages (무료)

```bash
# GitHub 저장소 생성 후
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/ycdh-website.git
git push -u origin main

# GitHub에서 Settings > Pages > Source를 'main' 브랜치로 설정
```

웹사이트 주소: `https://your-username.github.io/ycdh-website/`

### 2. Netlify (무료, 권장)

1. [Netlify](https://www.netlify.com/) 가입
2. "New site from Git" 클릭
3. GitHub 저장소 연결
4. Deploy 클릭

### 3. Vercel (무료)

1. [Vercel](https://vercel.com/) 가입
2. "New Project" 클릭
3. GitHub 저장소 import
4. Deploy 클릭

### 4. 일반 웹 호스팅

FTP를 통해 `website` 폴더의 모든 파일을 웹 호스팅 서버에 업로드합니다.

## 🔒 보안 고려사항

### 현재 구현
- 프론트엔드에서 기본적인 유효성 검사 수행
- localStorage에 데이터 저장 (개발/테스트용)

### 실제 운영 시 필요사항
1. **HTTPS 사용**: 배포 시 반드시 HTTPS 적용
2. **서버 측 검증**: 백엔드에서 모든 입력 데이터 재검증
3. **데이터베이스**: 안전한 데이터베이스에 조합원 정보 저장
4. **개인정보 보호**: GDPR/개인정보보호법 준수
5. **CSRF 보호**: 폼 제출 시 CSRF 토큰 사용
6. **Rate Limiting**: 스팸 방지를 위한 제출 횟수 제한

## 📱 브라우저 호환성

- ✅ Chrome (최신 버전)
- ✅ Firefox (최신 버전)
- ✅ Safari (최신 버전)
- ✅ Edge (최신 버전)
- ✅ 모바일 브라우저 (iOS Safari, Chrome Mobile)

## 🐛 문제 해결

### 폼이 제출되지 않아요
- 브라우저 콘솔(F12)에서 에러 메시지 확인
- 필수 입력 필드가 모두 채워졌는지 확인
- JavaScript가 활성화되어 있는지 확인

### 스타일이 제대로 표시되지 않아요
- `styles.css` 파일이 `index.html`과 같은 폴더에 있는지 확인
- 브라우저 캐시 삭제 후 새로고침 (Ctrl+Shift+R)

### 모바일에서 레이아웃이 깨져요
- 최신 브라우저 사용
- viewport 메타 태그가 `<head>`에 있는지 확인

## 🤝 기여하기

이 프로젝트는 용인 시민 데이터 허브 사회적협동조합을 위해 제작되었습니다.

개선 사항이나 버그를 발견하신 경우:
1. 이슈 생성
2. Pull Request 제출
3. contact@ycdh.or.kr로 문의

## 📞 연락처

- **이메일**: contact@ycdh.or.kr
- **전화**: 031-XXXX-XXXX
- **주소**: 경기도 용인시 (설립 준비 중)

## 📄 라이선스

Copyright © 2025 용인 시민 데이터 허브 사회적협동조합. All rights reserved.

---

**데이터로 함께 성장하는 지역 공동체** 🌱
