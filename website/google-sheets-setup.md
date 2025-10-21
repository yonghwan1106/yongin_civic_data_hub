# Google Sheets 연동 설정 가이드

## 📋 개요

조합원 가입 신청 데이터를 Google Sheets에 자동으로 저장하는 방법입니다.

## 🎯 1단계: Google Sheets 파일 생성

1. **Google Sheets 열기**
   - https://sheets.google.com 접속
   - 로그인

2. **새 스프레드시트 만들기**
   - "비어 있음" 클릭
   - 파일 이름: `용인 시민 데이터 허브 조합원 신청`

3. **헤더 작성** (첫 번째 행에)
   ```
   A열: 신청일시
   B열: 가입유형
   C열: 이름(기업명)
   D열: 이메일
   E열: 연락처
   F열: 주소
   G열: 사업자등록번호
   H열: 업종
   I열: 관심분야
   J열: 가입동기
   ```

## 🔧 2단계: Apps Script 설정

1. **Apps Script 열기**
   - 상단 메뉴: `확장 프로그램` → `Apps Script` 클릭
   - 새 창이 열림

2. **기존 코드 삭제 후 아래 코드 복사/붙여넣기**

```javascript
function doPost(e) {
  try {
    // 스프레드시트 연결
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // POST 데이터 파싱
    var data = JSON.parse(e.postData.contents);

    // 한국 시간으로 변환
    var timestamp = new Date();
    var kstOffset = 9 * 60; // KST는 UTC+9
    var kstTime = new Date(timestamp.getTime() + kstOffset * 60000);
    var formattedTime = Utilities.formatDate(kstTime, "GMT", "yyyy-MM-dd HH:mm:ss");

    // 가입유형 한글로 변환
    var memberType = data.memberType === 'individual' ? '개인' : '기업';

    // 관심분야 배열을 문자열로 변환
    var interests = Array.isArray(data.interests) ? data.interests.join(', ') : data.interests || '';

    // 관심분야 한글로 변환
    var interestsMap = {
      'data-education': '데이터 교육/워크숍',
      'market-analysis': '상권 분석 서비스',
      'platform': '데이터 분석 플랫폼',
      'collaboration': '협력 프로젝트',
      'challenge': '데이터 챌린지'
    };

    var interestsKorean = interests.split(', ').map(function(item) {
      return interestsMap[item] || item;
    }).join(', ');

    // 시트에 데이터 추가
    sheet.appendRow([
      formattedTime,           // A: 신청일시
      memberType,              // B: 가입유형
      data.name || '',         // C: 이름(기업명)
      data.email || '',        // D: 이메일
      data.phone || '',        // E: 연락처
      data.address || '',      // F: 주소
      data.businessNumber || '', // G: 사업자등록번호
      data.businessType || '', // H: 업종
      interestsKorean,         // I: 관심분야
      data.motivation || ''    // J: 가입동기
    ]);

    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': '신청이 완료되었습니다.'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 에러 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET 요청 테스트용
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      'status': 'ok',
      'message': '용인 시민 데이터 허브 조합원 신청 API가 작동 중입니다.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. **저장**
   - 상단의 💾 아이콘 클릭 또는 `Ctrl+S`
   - 프로젝트 이름: `조합원 신청 API`

## 🚀 3단계: 웹앱으로 배포

1. **배포 버튼 클릭**
   - 상단 오른쪽 `배포` → `새 배포` 클릭

2. **설정**
   - **유형 선택**: ⚙️ (톱니바퀴) 클릭 → `웹 앱` 선택
   - **설명**: `조합원 신청 수집 v1`
   - **액세스 권한 설정**:
     - `실행 사용자`: **나**
     - `액세스 권한`: **모든 사용자** (누구나 접근 가능하도록)

3. **배포 클릭**
   - `배포` 버튼 클릭
   - 권한 검토 창이 뜨면:
     - `액세스 권한 검토` 클릭
     - 본인 구글 계정 선택
     - "Google에서 확인하지 않은 앱" 경고가 나오면:
       - `고급` 클릭
       - `[프로젝트 이름](안전하지 않음)(으)로 이동` 클릭
       - `허용` 클릭

4. **웹 앱 URL 복사**
   - 배포가 완료되면 `웹 앱 URL`이 표시됨
   - **이 URL을 복사해두세요!** (매우 중요)
   - 예시: `https://script.google.com/macros/s/AKfycby.../exec`

## 🔗 4단계: 웹사이트에 URL 연결

1. **script.js 파일 열기**

2. **파일 맨 위에 다음 코드 추가** (1번 라인)

```javascript
// Google Sheets Apps Script 웹앱 URL
const GOOGLE_SHEETS_URL = '여기에_복사한_URL_붙여넣기';
```

3. **예시**
```javascript
// Google Sheets Apps Script 웹앱 URL
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycby1234567890abcdefg/exec';
```

## ✅ 5단계: 테스트

1. **웹사이트 열기**
   - `index.html` 파일 열기

2. **조합원 가입 신청**
   - 폼 작성
   - "가입 신청하기" 클릭

3. **Google Sheets 확인**
   - 스프레드시트로 돌아가기
   - 새로운 행에 데이터가 추가되었는지 확인!

## 🎨 데이터 확인 및 관리

### 데이터 확인
- Google Sheets 파일을 열면 실시간으로 신청 내역 확인 가능
- 자동으로 시간순 정렬

### 데이터 내보내기
1. `파일` → `다운로드` → `Microsoft Excel (.xlsx)`
2. 또는 `CSV 파일 (.csv)`

### 알림 설정 (선택사항)
1. **Google Sheets에서**
   - `도구` → `알림 규칙` 클릭
   - "스프레드시트가 변경되는 경우" 선택
   - 이메일로 알림 받기

### 팀과 공유
1. 상단 `공유` 버튼 클릭
2. 팀원 이메일 입력
3. 권한 설정:
   - `뷰어`: 보기만 가능
   - `편집자`: 수정 가능

## 🔒 보안 설정

### URL 변경 필요 시 (중요!)
만약 Apps Script URL이 유출되었다면:

1. **Apps Script로 이동**
2. `배포` → `배포 관리` 클릭
3. `새 버전` 생성
4. 새 URL을 다시 복사하여 `script.js` 업데이트

### 데이터 백업
- 정기적으로 데이터 다운로드
- Google Drive 자동 백업 기능 활용

## 🛠️ 문제 해결

### 데이터가 저장되지 않는 경우

1. **Apps Script URL 확인**
   - `script.js`의 URL이 정확한지 확인
   - URL 끝에 `/exec`가 있는지 확인

2. **권한 확인**
   - Apps Script 배포 시 "모든 사용자" 선택했는지 확인

3. **브라우저 콘솔 확인**
   - F12 누르기 → Console 탭
   - 에러 메시지 확인

4. **Apps Script 로그 확인**
   - Apps Script 편집기에서
   - `실행` → `실행 로그 보기`

### CORS 에러 발생 시
- Apps Script는 자동으로 CORS 처리됨
- 에러가 계속되면 배포 권한 재설정

## 📊 고급 기능 (선택사항)

### 자동 이메일 알림
Apps Script에 추가:

```javascript
function sendEmailNotification(data) {
  var email = "your-email@example.com"; // 받을 이메일
  var subject = "[용인 시민 데이터 허브] 새로운 조합원 신청";
  var body = "새로운 조합원 신청이 접수되었습니다.\n\n" +
             "이름: " + data.name + "\n" +
             "이메일: " + data.email + "\n" +
             "연락처: " + data.phone;

  MailApp.sendEmail(email, subject, body);
}

// doPost 함수 내부 sheet.appendRow(...) 다음에 추가:
// sendEmailNotification(data);
```

### 중복 신청 체크
```javascript
function isDuplicate(email) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    if (data[i][3] === email) { // D열 (이메일)
      return true;
    }
  }
  return false;
}
```

## 📞 지원

문제가 발생하면:
1. 이 문서 다시 확인
2. Apps Script 로그 확인
3. 브라우저 콘솔 에러 메시지 확인

---

**축하합니다! 🎉**
이제 조합원 가입 신청이 자동으로 Google Sheets에 저장됩니다!
