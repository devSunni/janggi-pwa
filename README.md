# 장기 (Janggi) PWA

컴퓨터와 두는 한국 장기. 설치하면 앱처럼 실행되고 오프라인에서도 동작해요.

- 컴퓨터 4단계 난이도, 둘이서 두기, 시계(1분·3분+2초·5분·10분), 기권·무르기·한수쉼
- 기보 표와 되돌려보기, 드래그 앤 드롭, 힌트, 배우기 모드, 수 평가 배지(`!!` ~ `??`), 효과음
- 넓은 화면(폴드 펼침)에서는 왼쪽 판 + 오른쪽 패널, 메뉴 숨기기 지원

## 실행
```bash
npm start        # http://localhost:8080
npm test         # 엔진 유닛테스트 + 화면 로직 스모크 테스트
```
서비스 워커는 `localhost`와 `https`에서만 동작해요 (`file://`로 열면 일반 웹페이지로만 동작).

## 배포 (GitHub Pages)
1. 저장소 → **Settings → Pages → Build and deployment → Source: GitHub Actions**
2. `main`에 push하면 테스트 후 자동 배포돼요. 주소는 `https://<사용자>.github.io/<저장소>/`
3. 업데이트를 배포할 때는 `sw.js`의 `VERSION`을 올려주세요.

## 설치
- 안드로이드/PC 크롬·엣지: 주소창의 설치 아이콘 또는 메뉴 → 앱 설치
- 아이폰 사파리: 공유 → 홈 화면에 추가

## 구조
`index.html` 게임 전체(단일 파일) · `manifest.webmanifest` · `sw.js` 오프라인 캐시 · `icons/` · `tests/`
