# 가계부 서비스 10팀

<p>
  <a href="https://www.npmjs.com/package/front" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/front.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> 가계부 서비스 입니다.

![main](https://user-images.githubusercontent.com/38618187/89118751-2f08ec00-d4e3-11ea-81ae-1fedf50090dc.gif)

## 폴더 구조

이 프로젝트는 frontend 와 backend 가 구분되어있습니다.

```bash
├── back
│   ├── env           # dot env 에 사용할 파일들을 모아놓은 폴더입니다.
│   ├── node_modules  # 사용하는 모듈들이 설치되어있는 파일입니다.
│   └── src           # backend 소스들이 있는 파일입니다.
└── front
    ├── dist          # build 후 나온 파일들 입니다.
    ├── node_modules  # 사용하는 모듈들이 설치되어있는 파일입니다.
    └── src           # frontend 소스들이 있는 파일입니다.
```

각 파트의 폴더 구조는 다음과 같습니다.

### front

```bash
├── components  # 컴포넌트들을 모아놓음
├── fetch       # API 요청을 보내는 코드
├── models      # 데이터를 갖는 model 파일들
├── router      # 라우팅 관련 코드
├── store       # 전역으로 사용하고자 하는 객체
└── utils       # 유틸성 파일들
```

### back

```bash
├── apis          # API 관련 코드
├── controllers   # 컨트롤러
├── daos          # DAO 객체들
└── shared        # 공통으로 사용할 파일들 (constant, log ...)
```

## 페이지 구조

이 프로젝트는 SPA (single page application) 으로 되어있습니다.

```text
/history      # 내역 페이지 입니다.
/calendar     # 달력 페이지 입니다.
/statistics   # 통계 페이지 입니다.
```

## 설치

> 이 프로젝트는 yarn을 사용합니다.

install.sh를 실행해주세요

```bash
sh ./install.sh
```

혹은 직접 다음 명령들을 실행해주세요

```bash
cd front/
yarn

cd ../back/
yarn
```

### dot env

front/env/ & back/env/ 폴더에 각각 .env 파일을 만들어주세요

```bash
touch .env
```

#### backend env

```env
# 서버 설정
PORT=3000

# 데이터베이스 설정
DB_HOST=DB 서버주소
DB_PORT=DB 서버포트
DB_USER=DB 유저
DB_PASSWORD=DB 비밀번호
DB_NAME=DB 이름
```

#### frontend env

```env
# 백엔드 서버 주소
API_HOST=backend 서버 주소
API_PORT=backend 서버 포트 번호
```

## 실행

front 와 back을 각각 실행시켜야 합니다.

```bash
cd front/
yarn start
```

```bash
cd back/
yarn start
```

## 테스트

다음 명령을 실행하면 테스트가 실행됩니다.

```sh
yarn test
```

## 배포

먼저 frontend 파일들을 빌드하기 위해 다음 쉘 스크립트를 실행합니다.

```bash
sh ./build.sh
```

배포를 위해 PM2를 사용하고 있습니다.

자동 배포를 원하는 경우 check.sh를 주기적으로 실행시켜주세요

```bash
*/5 * * * * /your_directory/check.sh >> /dev/null 2>&1
```

## 후원하기

프로젝트가 마음에 들면 ⭐️을 주세요!
