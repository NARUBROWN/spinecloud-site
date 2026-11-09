---
title: Spine Cloud 오픈 베타에 참여하는 법
description: preview CLI를 설치하고 Spine Cloud 계정을 연결해 첫 Spine 앱을 배포합니다.
pageClass: beta-guide
---

# Spine Cloud 오픈 베타에 참여하는 법

preview CLI를 설치하고 Spine Cloud 계정을 연결한 뒤 Spine 앱을 배포합니다. 배포가 완료되면 공개 주소에서 앱이 응답하는지 확인할 수 있습니다.

## 1. 계정 만들기

[Spine Cloud 대시보드](https://spinecloud.dev/?mode=signup)에서 소셜 계정으로 가입하고 이용약관을 확인하세요. 이후 CLI를 연결할 때도 같은 계정으로 로그인합니다.

## 2. Spine CLI preview 설치하기

터미널에서 `go version`으로 Go가 설치되어 있는지 확인하세요. Go 1.25.5 이상에서 다음 명령을 실행합니다. 오픈 베타의 배포 명령은 `@preview`로 설치한 Spine CLI에서 사용할 수 있습니다.

```bash
go install github.com/NARUBROWN/spine-cli/cmd/spine@preview
spine version
spine deploy --help
```

`spine version`에 `preview`가 표시되고 `spine deploy --help`에 배포 명령의 사용법이 나오면 다음 단계로 진행하세요.

`spine`을 찾지 못하거나 다른 버전이 실행되면 `go env GOBIN`으로 설치 위치를 확인하세요. 출력이 비어 있으면 `go env GOPATH`가 가리키는 경로 아래의 `bin`에 설치됩니다. 해당 디렉터리를 `PATH`에 추가하고, 기존 `spine`보다 먼저 선택되는지 확인하세요.

## 3. CLI에 계정 연결하기

```bash
spine cloud auth login
```

브라우저에 열린 승인 화면에서 가입한 계정으로 로그인하세요. 브라우저가 열리지 않으면 터미널에 표시된 주소를 직접 여세요. 터미널에 표시된 일회용 코드를 입력하고 승인한 뒤, CLI에서 로그인 완료를 확인합니다.

## 4. 배포할 앱 준비하기

기존 Spine 앱이 있으면 `spine.toml`이 있는 프로젝트 디렉터리로 이동하세요. 처음 시작한다면 다음 명령으로 HTTP 예제 앱을 만들 수 있습니다.

```bash
spine new cloud-hello --module example.com/cloud-hello --channel preview --platform echo --no-interactive
cd cloud-hello
```

배포 전에 프로젝트 계약을 확인합니다. 오류가 나오면 출력에 안내된 항목을 수정하세요.

```bash
spine contract check
```

`spine deploy`는 Go 앱을 Linux ARM64 실행 파일로 빌드합니다. 앱에서 제공하는 HTML, CSS, JavaScript 같은 정적 파일을 `go:embed`로 내장하면 실행 파일과 함께 배포할 수 있습니다.

## 5. 배포하고 공개 주소 확인하기

같은 프로젝트 디렉터리에서 실행하세요.

```bash
spine deploy
```

CLI는 프로젝트의 모듈 이름으로 배포할 앱을 찾고, 같은 이름의 앱이 없으면 새로 만듭니다. 이어서 실행 파일을 빌드해 업로드하고 배포 결과를 기다립니다.

터미널에 `Deployment is live:`와 공개 주소가 나오면 배포가 완료된 것입니다. 예제 앱을 만들었다면 브라우저에서 공개 주소 끝에 `/health`를 붙여 `{"status":"ok"}` 응답을 확인하세요. [대시보드](https://spinecloud.dev/)에서도 앱의 공개 주소와 배포 이력을 확인할 수 있습니다.

배포가 실패하거나 터미널이 결과를 기다리다 종료되면 대시보드에서 해당 앱의 배포 이력을 먼저 확인하세요. 배포가 실패했다면 표시된 사유를 확인한 뒤 다시 시도합니다.
