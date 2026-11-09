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

[대시보드](https://spinecloud.dev/)에서 계정을 만들고 이용약관을 확인하세요. CLI에서는 `spine cloud auth login`을 실행한 뒤 브라우저에서 일회용 코드를 승인해 같은 계정을 연결합니다. 처음 배포한다면 [Spine Cloud 오픈 베타에 참여하는 법](/open-beta)을 따라 하세요.

## 어떤 앱을 배포할 수 있나요?

Go로 작성한 Spine 앱을 대상으로 합니다. 배포에는 지원되는 CLI와 이용 가능한 계정 및 배포 대상이 필요합니다.

## 앱은 어떻게 배포하나요?

계정을 연결한 뒤 프로젝트 디렉터리에서 `spine deploy`를 실행합니다. CLI에서 배포 진행 상태와 결과를 확인할 수 있습니다. 요청이 접수됐다고 해서 배포가 완료된 것은 아닙니다.

## 배포가 실패해요 {#deployment-failed}

터미널의 오류 메시지를 먼저 확인하세요. 배포가 접수됐거나 CLI가 결과를 기다리다 종료됐다면, [대시보드](https://spinecloud.dev/)에서 앱을 선택하고 **배포 이력**을 확인하세요. CLI 버전에 따라 오류 코드 대신 메시지가 표시될 수 있습니다.

| 메시지 또는 증상 | 원인 | 확인할 내용과 해결 방법 |
| --- | --- | --- |
| `spine deploy` 명령이 없거나 인증 실패 | 설치된 CLI가 오래됐거나 계정 연결이 만료됐습니다. | [오픈 베타 가이드](/open-beta)에 따라 `@preview`로 CLI를 설치하세요. `spine cloud auth login`으로 대시보드와 같은 계정을 연결하세요. |
| `Spine contract validation failed` 또는 `Linux ARM64 build failed` | 프로젝트 설정을 확인하거나 Go 앱을 빌드하는 중 오류가 났습니다. | `spine.toml`이 있는 디렉터리에서 `spine contract check`를 실행하세요. 빌드 오류라면 터미널에 표시된 Go 오류를 확인하고 의존성이 Linux ARM64를 지원하는지 점검하세요. |
| `INSTANCE_LIMIT` 또는 `APP_NAME_EXISTS` | 계정의 앱 한도인 2개에 도달했거나, 같은 이름의 앱이 이미 있습니다. | 기존 앱에 배포하려면 `spine deploy --app <앱 ID>`로 대상을 지정하세요. 새 앱이 필요하고 한도에 도달했다면 사용하지 않는 앱을 먼저 삭제하세요. |
| `ARTIFACT_TOO_LARGE` 또는 `DEPLOYMENT_REQUEST_TOO_LARGE` | 실행 파일이 64 MiB를 넘었거나 업로드 요청 본문이 너무 큽니다. | 실행 파일에 포함된 정적 파일과 의존성을 점검해 64 MiB 이하로 줄인 뒤 다시 빌드하세요. |
| `ARTIFACT_STORAGE_LIMIT` | 압축과 암호화를 거친 파일이 저장소의 파일당 업로드 한도를 넘었습니다. | 실행 파일의 크기를 줄여 다시 배포하세요. 변환된 파일에는 최대 65 MiB가 허용됩니다. |
| `ARTIFACT_CAPACITY_EXHAUSTED` | 배포 파일을 보관할 자리가 부족합니다. | 오래된 배포 파일이 정리된 뒤 다시 시도하세요. 사용하지 않는 앱이 있다면 삭제해 저장 공간을 확보할 수 있습니다. |
| `INVALID_ARTIFACT` | 실행 파일 형식이나 무결성 검사에 실패했습니다. | 프로젝트 디렉터리에서 preview CLI로 다시 빌드하고 배포하세요. |
| `DEPLOYMENT_CONFLICT` | 배포 요청이 기존 요청과 충돌했습니다. | 배포 이력을 확인하세요. 새 빌드라면 이전 `--request-id`를 지정하지 않고 `spine deploy`를 실행하세요. |
| `ARTIFACT_UPLOAD_EXPIRED` 또는 `ARTIFACT_UNAVAILABLE` | 업로드가 시간 안에 끝나지 않았거나 서버가 저장된 파일을 가져오지 못했습니다. | 이력에 실패가 기록됐는지 확인하고, 잠시 후 `spine deploy`를 다시 실행하세요. |
| `INSUFFICIENT_CPU`, `INSUFFICIENT_MEMORY` 또는 `CAPACITY_UNAVAILABLE` | 배포 서버에 실행 여유가 부족하거나 여유를 확인할 수 없습니다. | 잠시 후 다시 시도하세요. 계속 실패하면 [서비스 상태](https://spinecloud.dev/status)를 확인하세요. |
| `START_FAILED` | 실행 파일을 시작하지 못했습니다. | 인스턴스 로그에서 시작 오류를 확인하세요. 앱에 필요한 환경 변수나 시크릿이 설정됐는지도 확인하세요. |
| `HEALTH_CHECK_FAILED` | 앱의 `/health`가 시작 후 HTTP `200`을 반환하지 않았습니다. | 앱이 `SPINE_PORT`로 지정된 포트에서 요청을 받고, `/health`에서 HTTP `200`을 반환하는지 확인하세요. |
| `PUBLIC_CONNECTION_FAILED` | 서버가 공개 주소에서 앱의 응답을 확인하지 못했습니다. | [서비스 상태](https://spinecloud.dev/status)와 앱 로그를 확인하세요. 공개 연결이 복구된 뒤 다시 시도하세요. |
| `DEPLOYMENT_UNAVAILABLE` 또는 결과 확인 시간 초과 | 배포를 접수하지 못했거나 CLI에서 결과를 확인하지 못했습니다. | 대시보드에서 배포가 진행 중이면 기다리세요. 업로드 응답을 받지 못해 같은 요청을 다시 보낼 때는 터미널에 표시된 ID를 `--request-id`로 지정하세요. |
| `DEPLOYMENT_FAILED` | 배포가 실패했고 CLI에 구체적인 사유가 표시되지 않았습니다. | 대시보드의 배포 이력과 인스턴스 로그에서 실패 사유를 확인하세요. |

해결 후 배포 이력에 **배포 완료**가 표시되고 공개 주소가 열리는지 확인하세요.

## 배포한 앱의 주소는 어디서 확인하나요?

배포가 성공하면 CLI의 결과와 대시보드의 배포 이력에서 공개 주소를 확인할 수 있습니다.

## 비용이 있나요?

오픈 베타 기간에는 모든 기능을 무료로 제공합니다. 이후 유료 기능을 도입하면 결제 전에 요금과 이용 조건을 안내합니다. 자세한 내용은 [서비스 이용약관](https://spinecloud.dev/terms)을 확인하세요.

## Spine 프레임워크와 Spine Cloud는 어떻게 다른가요?

Spine 프레임워크는 MIT 라이선스로 제공됩니다. Spine Cloud는 Spine 앱의 배포와 관리를 위한 별도 서비스입니다.
