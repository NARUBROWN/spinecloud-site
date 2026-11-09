---
title: 자주 묻는 질문
---

# 자주 묻는 질문

## Spine Cloud는 무엇인가요?

Spine Cloud는 Go로 작성한 Spine 앱을 CLI에서 배포하고 웹 대시보드에서 관리하는 서비스입니다. 배포 이력과 성공한 배포의 공개 주소를 확인할 수 있습니다.

## 어떻게 시작하나요?

Spine Cloud는 오픈 베타이며 배포에는 preview로 설치한 Spine CLI가 필요합니다. Go가 설치된 환경에서 다음 명령을 실행하세요.

```bash
go install github.com/NARUBROWN/spine-cli/cmd/spine@preview
```

[대시보드](https://spinecloud.dev/)에서 계정을 만들고 이용약관을 확인하세요. CLI에서는 `spine cloud auth login`을 실행한 뒤 브라우저에서 일회용 코드를 승인해 같은 계정을 연결합니다.

## 어떤 앱을 배포할 수 있나요?

Go로 작성한 Spine 앱을 대상으로 합니다. 배포에는 지원되는 CLI와 이용 가능한 계정 및 배포 대상이 필요합니다.

## 앱은 어떻게 배포하나요?

계정을 연결한 CLI에서 `spine deploy`를 실행하고 앱을 선택합니다. CLI에서 배포 진행 상태와 결과를 확인할 수 있습니다. 요청이 접수됐다고 해서 배포가 완료된 것은 아닙니다.

## 배포한 앱의 주소는 어디서 확인하나요?

배포가 성공하면 CLI의 결과와 대시보드의 배포 이력에서 공개 주소를 확인할 수 있습니다.

## 비용이 있나요?

오픈 베타 기간에는 모든 기능을 무료로 제공합니다. 이후 유료 기능을 도입하면 결제 전에 요금과 이용 조건을 안내합니다. 자세한 내용은 [서비스 이용약관](https://spinecloud.dev/terms)을 확인하세요.

## Spine 프레임워크와 Spine Cloud는 어떻게 다른가요?

Spine 프레임워크는 MIT 라이선스로 제공됩니다. Spine Cloud는 Spine 앱의 배포와 관리를 위한 별도 서비스입니다.
