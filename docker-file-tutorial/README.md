# Dockerfile & build Tutorial
Dockerfile 만들어서 빌드 후 이미지 생성 예시

### Dockerfile
- 디렉터리 만들고, Dockfile을 만든 후 아래와 같은 방식으로 만든다 
```
# 어떤 이미지 기반으로 할지 설정
FROM ubuntu:14.04

MAINTAINER Jein Song <jeinsong200@gmail.com>

# 셀 스크립트 혹은 명령 실행
# 이미지 생성중에는 사용자 입력 받을 수 없음 -y 옵션 필요
RUN apt-get update
RUN apt-get install -y nginx 
RUN echo "\ndemon off;" >> /etc/nginx/nginx.conf
RUN chown -R www-data:www-data /var/lib/nginx

# 호스트와 공유할 디렉터리 목록
# docker run으로 컨테이너 생성시 지정가능 -v
VOLUME ["/tmp"]

# CMD에서 설정한 실행 파일이 실행될 디렉터리
WORKDIR /etc/nginx

# 컨테이너 시작시 실행할 파일 혹은 스크립트  
CMD ["nginx"]

# 호스트와 연결할 포트
EXPOSE 80
EXPOSE 443
```
#### RUN, CMD, ENTRYPOINT 차이 (중요)
- https://m.blog.naver.com/PostView.nhn?blogId=freepsw&logNo=220982529575&proxyReferer=https%3A%2F%2Fwww.google.com%2F
- http://goinbigdata.com/docker-run-vs-cmd-vs-entrypoint/
  - RUN : 베이스 이미지에 레이어를 하나하나 더해가는 역할
  - CMD : run과 함께 실행되는 명령을 추가 
    - docker run할 때 맨뒤에 추가하는 명령과 같은 것
    - 하지만, docker run할 때 명령이 명시되면 CMD 부분은 무시됨
  - ENTRYPOINT : run될 때마다 항상 실행되야 하는 명령 (서버 실행, 디비 실행 등)

### Dockerfile 빌드하기
- Dockerfile이 있는 디렉터리로 가서 빌드 명령어 실행
- 이미지가 생성된다
```
docker build --tag ImageName:Tag .
docker images
```

### 실행
- 컨테이너 안에서 서버가 실행되는 경우엔, host 포트와 연동이 필요한 경우가 있다.
- 그 땐 -p 옵션으로 포트 바인딩을 시켜줄 수 있다.
- -d 옵션으로 백그라운드 실행 가능.
  - 백그라운드로 실행하지 않으면 프로세스가 실행되고 있는 컨테이너의 화면이 보인다
  - 백그라운드로 실행을 해도, 컨테이너 내부에 foreground로 실행되는 프로세스가 없다면 
    바로 exit되는 것 같다 (매우 중요!!!!, 이것 때문에 몇시간 날려묵음 ..)
```
docker run --name ContainerName -d -p 5000:3000 ImageName:Tag
```
- -v 옵션을 이용해서 host의 disk 공간을 공유할수도 있다.
```
docker run --name ContainerName -d -p 80:80 -v /tmp:/tmp ImageName:Tag
```

### 추가 예제
- [간단한 node app 컨테이너 만들기](https://github.com/AI-Trolls/docker-tutorial/tree/master/docker-file-tutorial/node-app)
  - 참고자료: https://seokjun.kim/docker-nginx-node/


### UTF-8 설정
- 한글 설정을 원하면 요런식으로 하면 되는듯 하다.
```
  RUN apt-get install -y locales
  ENV LANG ko_KR.UTF-8
  ENV LANGUAGE ko_KR:UTF-8
  ENV LC_ALL ko_KR.UTF-8
```
- 그냥 UTF-8로 설정하는 것만으로 실행에 문제가 없다면
- 아래와 같이 하는 것으로 충분하다.
```
  ENV LC_ALL C.UTF-8
  ENV LANG C.UTF-8
```
- [참조](https://tetzzang.com/docker-%ED%95%9C%EA%B8%80-%EB%AC%B8%EC%A0%9C%EC%99%80-timezone-%EC%88%98%EC%A0%95%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95/)
