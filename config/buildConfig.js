/**
    시작/빌드 환경 설정 모듈
    --
    start, build시 옵션에 따라 동작 환경을 분기시킬 수 있다.
    여기에 사용하는 옵션을 동적으로 구성할 수 있다.
 */
const buildConfig = {
  // 개발기 관련 설정
  development: {
    indexHtml: "index.dev.html",
    buildFolderName: "build-development",
  },
  // 운영기 설정
  production: {
    indexHtml: "index.html",
    buildFolderName: "build-production",
  },
  // 공공 설정
  wehagov: {
    indexHtml: "index.wehagov.html",
    buildFolderName: "build-wehagov",
  },
  // 로컬설정
  local: {
    indexHtml: "index.dev.html",
    buildFolderName: "build-development",
  },
};

module.exports = buildConfig;
