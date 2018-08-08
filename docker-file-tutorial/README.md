

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
