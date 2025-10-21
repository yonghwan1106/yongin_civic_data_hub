# Vercel 배포 가이드

## 🚀 Vercel로 배포하기

용인 시민 데이터 허브 웹사이트를 Vercel에 배포하는 방법입니다.

---

## 📋 사전 준비

✅ GitHub 저장소에 코드 업로드 완료
✅ Vercel 계정 (없으면 아래에서 생성)

---

## 🔧 1단계: Vercel 계정 생성

1. **Vercel 웹사이트 접속**
   - https://vercel.com 방문

2. **GitHub로 로그인**
   - "Sign Up" 클릭
   - "Continue with GitHub" 선택
   - GitHub 계정으로 인증

3. **권한 승인**
   - Vercel이 GitHub 저장소 접근을 요청하면 승인

---

## 🎯 2단계: 프로젝트 배포

### 방법 1: Vercel 대시보드에서 배포 (권장)

1. **New Project 클릭**
   - Vercel 대시보드: https://vercel.com/new
   - "Add New..." → "Project" 클릭

2. **저장소 Import**
   - "Import Git Repository" 섹션에서
   - `yonghwan1106/yongin_civic_data_hub` 검색
   - "Import" 클릭

3. **프로젝트 설정**
   ```
   Project Name: yongin-civic-data-hub (자동 생성)
   Framework Preset: Other (선택하지 않음)
   Root Directory: website (중요!)
   Build Command: (비워둠)
   Output Directory: (비워둠 또는 .)
   Install Command: (비워둠)
   ```

4. **환경 변수** (선택사항)
   - 지금은 건너뛰기
   - 나중에 Google Sheets URL 추가 가능

5. **Deploy 클릭**
   - 약 30초~1분 소요
   - 배포 완료!

### 방법 2: CLI로 배포 (선택사항)

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 폴더로 이동
cd website

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

---

## 🌐 3단계: 배포 확인

1. **배포 완료 화면**
   - Vercel이 자동으로 URL 생성
   - 예시: `https://yongin-civic-data-hub.vercel.app`

2. **웹사이트 접속**
   - 생성된 URL 클릭
   - 웹사이트가 정상적으로 표시되는지 확인

3. **도메인 확인**
   - Dashboard → Project → Settings → Domains
   - 자동 생성된 도메인 확인

---

## 🔧 4단계: 추가 설정

### 커스텀 도메인 연결 (선택사항)

1. **도메인 추가**
   - Project Settings → Domains
   - "Add" 클릭
   - 원하는 도메인 입력 (예: `ycdh.or.kr`)

2. **DNS 설정**
   - 도메인 등록업체에서 DNS 레코드 추가
   - Vercel이 제공하는 값 입력
   - Type: A 또는 CNAME
   - Value: Vercel 제공 주소

### 환경 변수 설정

Google Sheets 연동을 위해:

1. **Settings → Environment Variables**
2. **추가**:
   ```
   Name: GOOGLE_SHEETS_URL
   Value: [Google Apps Script URL]
   ```
3. **Redeploy** 클릭

---

## 🔄 5단계: 자동 배포 설정

Vercel은 GitHub와 자동 연동됩니다!

### 자동 배포 작동 방식

```
GitHub에 Push → Vercel 자동 감지 → 자동 배포
```

**예시:**
1. 로컬에서 코드 수정
2. `git add .`
3. `git commit -m "Update website"`
4. `git push`
5. ✨ Vercel이 자동으로 새 버전 배포!

### 브랜치별 배포

- **main/master 브랜치**: 프로덕션 배포
- **다른 브랜치**: 프리뷰 배포 (테스트용 URL 생성)

---

## 📊 6단계: 배포 모니터링

### Deployments 페이지

- **위치**: Project → Deployments
- **확인 사항**:
  - ✅ 배포 상태 (Building, Ready, Error)
  - 📅 배포 시간
  - 🔗 각 배포의 고유 URL
  - 📝 커밋 메시지

### 실시간 로그 확인

1. Deployment 클릭
2. "Building" 탭에서 실시간 로그 확인
3. 에러 발생 시 로그에서 원인 파악

---

## 🛠️ 문제 해결

### ❌ 배포 실패

**증상**: "Build failed" 에러

**해결책**:
1. Root Directory가 `website`로 설정되었는지 확인
2. Project Settings → General → Root Directory 수정
3. Redeploy

### ❌ 페이지가 비어있음

**증상**: 배포는 성공했지만 빈 페이지

**해결책**:
1. `index.html`이 `website` 폴더에 있는지 확인
2. Root Directory 설정 재확인

### ❌ 404 Not Found

**증상**: 메인 페이지는 되지만 다른 경로는 404

**해결책**:
- 현재 프로젝트는 단일 페이지이므로 정상
- 다중 페이지 필요 시 routing 설정 추가

---

## 🎨 성능 최적화 (선택사항)

### 1. 이미지 최적화

Vercel은 자동으로 이미지 최적화를 지원합니다.

```html
<!-- 기존 -->
<img src="image.png" alt="설명">

<!-- Vercel 최적화 (나중에) -->
<img src="/_next/image?url=/image.png&w=1920&q=75" alt="설명">
```

### 2. 캐싱 설정

`vercel.json` 파일 추가 (선택사항):

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## 📈 Analytics 설정 (선택사항)

### Vercel Analytics 활성화

1. **Project Settings → Analytics**
2. **Enable** 클릭
3. 무료 플랜: 2,500 이벤트/월

### 확인 가능한 지표
- 📊 페이지 뷰
- 🌍 방문자 위치
- 📱 디바이스 유형
- ⚡ 페이지 로딩 속도

---

## 🔒 보안 설정

### HTTPS

- ✅ Vercel은 자동으로 HTTPS 제공
- 별도 설정 불필요

### Security Headers

`vercel.json`에 추가 (선택사항):

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## 📱 모바일 테스트

배포 후 다양한 기기에서 테스트:

1. **Chrome DevTools**
   - F12 → Toggle Device Toolbar (Ctrl+Shift+M)
   - 다양한 기기 시뮬레이션

2. **실제 모바일 기기**
   - 배포된 URL을 모바일에서 직접 접속

---

## 🎯 배포 완료 체크리스트

- [ ] Vercel 계정 생성
- [ ] GitHub 저장소 연결
- [ ] Root Directory: `website` 설정
- [ ] 배포 완료 확인
- [ ] 배포된 URL 접속 테스트
- [ ] 모바일 반응형 확인
- [ ] 조합원 가입 폼 테스트
- [ ] (선택) 커스텀 도메인 연결
- [ ] (선택) Google Sheets 연동

---

## 📞 추가 지원

### Vercel 문서
- https://vercel.com/docs

### Vercel 커뮤니티
- https://github.com/vercel/vercel/discussions

### 프로젝트 문의
- contact@ycdh.or.kr

---

## 🎉 완료!

축하합니다! 웹사이트가 성공적으로 배포되었습니다.

**배포 URL**: `https://yongin-civic-data-hub.vercel.app`

이제 전 세계 어디서나 웹사이트에 접속할 수 있습니다! 🌍

---

**Made with ❤️ by 용인 시민 데이터 허브 사회적협동조합**
