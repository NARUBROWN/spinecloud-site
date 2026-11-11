# Spine Cloud 공식 사이트

`home.spinecloud.dev`를 예정 주소로 하는 VitePress 사이트입니다. 오픈 베타를 위한 제품 소개와 기술 문서를 제공합니다. 기술 문서에는 운영 검증 범위와 미확인 사항을 구분해 기록합니다.

## 로컬 실행

Node.js 20 이상이 필요합니다.

```sh
npm install
npm run dev
```

## 빌드 및 미리보기

```sh
npm run build
npm run preview
```

정적 빌드 결과는 `.vitepress/dist`에 생성됩니다. 도메인 연결과 배포 설정은 아직 적용하지 않았습니다.

## 화면과 콘텐츠

홈페이지는 `.vitepress/theme/Layout.vue`, 배포 시연은 `.vitepress/theme/components/DeployDemo.vue`에서 관리합니다. 스타일은 `.vitepress/theme/style.css`에 있습니다. 로고와 파비콘은 `spinecloud.dev`와 동일한 SVG를 사용합니다. Public Sans 글꼴은 패키지에서 불러오며 라이선스는 `public/licenses/public-sans.txt`에 포함합니다. 홈페이지와 기술 문서는 대시보드의 다크 테마와 버튼 스타일을 공유합니다.

[FastAPI Cloud](https://fastapicloud.com/)의 제품 소개, 명령어 시연, 배포 과정, 운영 기능 구성을 참고했습니다. Spine Cloud의 기능 설명은 별도 제품 저장소의 README와 검증 기록을 기준으로 작성했습니다. 상단 터미널 시연의 앱 이름과 주소는 설명용 예시입니다. 기능 소개는 실제 대시보드 디자인을 참고한 Vue 컴포넌트 `ProductDemo.vue`로 구현합니다. 앱 목록과 배포 이력은 전환할 수 있으며, 계정 연결과 환경 변수 폼은 설명용 예시입니다. 표시하는 앱 이름과 주소는 예시 데이터이며 실제 계정이나 배포를 변경하지 않습니다. 내부 문구는 `product-demo-locales.json`에서 한국어, 영어, 일본어, 중국어 간체와 번체로 관리합니다.

화면 검증 결과는 Git에서 제외한 `output/playwright`에 저장합니다. 1440px, 768px, 390px 캡처와 테이스트 검사 결과, 디자인 검토 기록을 확인할 수 있습니다.
