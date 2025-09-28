# 🔐 Auth Demo

이 프로젝트는 OAuth 2.0 인증 플로우를 구현하기 위한 데모 애플리케이션입니다.

네이버와 카카오 소셜 로그인을 지원하며, 로컬스토리지를 활용한 임시 사용자 관리 시스템을 구현했습니다.

실제 데이터베이스 대신 로컬스토리지를 사용하여 사용자 정보를 관리하며, 소셜 로그인과 일반 회원가입/로그인 기능을 모두 제공합니다.

## 🛠 기술 스택

- **Next.js 15.5.3**
  - App Router 사용
  - API Routes를 통한 서버사이드 로직 처리
- **React 19.1.0**
- **TypeScript**
- **Tailwind CSS 4** - 유틸리티 퍼스트 CSS 프레임워크
- **Zod** - 스키마 검증을 통한 타입 안전성 보장

### 개발 도구

- **Biome** - 빠른 린팅 및 포맷팅 도구 (ESLint + Prettier 대체)
- **Turbopack** - Next.js의 빠른 번들러

## 🚀 실행 방법

### 1. 프로젝트 클론

```bash
git clone https://github.com/im-ian/auth-demo
cd auth-demo
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.local` 파일을 생성하고 아래 내용을 추가하세요:

```env
# 네이버 OAuth 설정
NAVER_OAUTH_CLIENT_ID={your_naver_oauth_client_id}
NAVER_OAUTH_CLIENT_SECRET={your_naver_oauth_client_secret}
NAVER_OAUTH_REDIRECT_URI=http://localhost:3000/oauth/naver

# 카카오 OAuth 설정
KAKAO_OAUTH_CLIENT_ID={your_kakao_oauth_client_id}
KAKAO_OAUTH_CLIENT_SECRET={your_kakao_oauth_client_secret}
KAKAO_OAUTH_REDIRECT_URI=http://localhost:3000/oauth/kakao
```

### 4. 개발 서버 실행

```bash
npm run dev
```

### 5. 브라우저에서 확인

```
http://localhost:3000
```

## 🔧 환경 변수 설정 방법

### 네이버 OAuth 설정

1. [네이버 개발자 센터](https://developers.naver.com/) 접속
2. 애플리케이션 등록
3. 서비스 환경 설정:
   - **서비스 URL**: `http://localhost:3000`
   - **Callback URL**: `http://localhost:3000/oauth/naver`
4. 발급받은 Client ID와 Client Secret을 환경 변수에 설정

### 카카오 OAuth 설정

1. [카카오 개발자 센터](https://developers.kakao.com/) 접속
2. 애플리케이션 생성
3. 플랫폼 설정:
   - **Web 플랫폼 등록**: `http://localhost:3000`
   - **Redirect URI**: `http://localhost:3000/oauth/kakao`
4. 발급받은 REST API 키를 Client ID로, Client Secret을 환경 변수에 설정
