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
```
docker run --name ContainerName -p 5000:3000 ImageName:Tag
```
- -v 옵션을 이용해서 host의 disk 공간을 공유할수도 있다.
```
docker run --name ContainerName -p 80:80 /tmp:/tmp ImageName:Tag
```

### 추가 예제
- [간단한 node app 컨테이너 만들기](https://github.com/AI-Trolls/docker-tutorial/tree/master/docker-file-tutorial/node-app)
  - 참고자료: https://seokjun.kim/docker-nginx-node/
