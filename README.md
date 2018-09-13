# Docker-Tutorial
docker 정리 

### Docker
- 클라우드 환경의 급속한 성장
- 클라우드 환경에서의 설치 및 배포의 어려움
- 서비스 운영 환경을 이미지로 생성해서 배포한다

### Virtual Machine은 느리다
- 항상 guest OS를 설치해야 하는 VM &rightarrow; 이미지 용량이 커짐
- Docker는?
  - guest OS 필요 x
  - Docker Image에 서버 운영을 위해 필요한 것만 따로 설치
  - System Call 같은 OS 자원은 host system과 공유
  - 이미지 용량 줄어듬
  - 하드웨어 가상화 계층 x (mem, file system, network 속도 VM에 비해 매우 빠름)

### Docker Image, Container?
- base image ; 리눅스 배포판에 기본적인 것(유저랜드)만 설치된 이미지
  - OS에는 **kernel / user** space 존재
  - 유저랜드란, user space에서 실행되는 파일과 라이브러리
    - (부팅에 필요한 최소 실행 파일 및 라이브러리, 패키징 시스템)
- **docker image** 라고 하면, 베이스 이미지에 필요한 것들을 설치한 뒤 파일 하나로 만든 것
- docker image는 베이스 이미지에서 *바뀐 부분만 이미지로 생성*하고, 실행할 때는 각각을 합쳐 실행
  - 즉, 바뀐 부분만 이미지로 생성한 뒤, 부모 이미지를 계속 참조
- **docker container** 라고 하면, 이미지를 실행한 상태를 의미. 
  - 하나의 이미지로 여러개의 컨테이너 생성 가능

### 설치
- [는 알아서](https://docs.docker.com/install/linux/docker-ce/centos)
- [일반](http://pyrasis.com/book/DockerForTheReallyImpatient/Chapter02)
- [centos](http://www.kwangsiklee.com/2017/07/centos%EC%97%90%EC%84%9C-docker-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0/)

### 주요 명령어들
- **[주의]** : root 권한 필요, 혹은 현재 계정을 docker 그룹에 포함
```
sudo usermod -aG docker ${USER}
sudo service docker restart
```
- docker hub로 부터 ubuntu **이미지 검색**
```
docker search ubuntu
```
- docker hub로 부터 **이미지(이미지이름:태그) 받기**
  - latest는 최신
  - 당연히 centos에서 ubuntu 이미지 실행 가능
```
docker pull ubuntu:latest
```
- **이미지 목록 출력**, 추가 옵션으로 이름 넣을 수 있음
```
docker images 
```
- **컨테이너 생성**
  - 이미지를 컨테이너화 한 이후에 bash셸 실행하기
  - docker run <옵션> <이미지 이름> <실행할 파일>
  - i, t 옵션 지정시 실행된 bash셸에 입출력 가능 (물론 -it 로 쓸 수 있음)
  - p, P 옵션을 이용해 포트 바인딩을 시킬 수 있다.
  - d 옵션으로 백그라운드 실행 가능하다.
    - 백그라운드로 실행하지 않으면 컨테이너 안에서 foreground로 실행되고 있는 프로세스의 출력화면이 보인다
      - 컨테이너 내부에 foreground로 실행되는 프로세스가 없다면 
        바로 exit되는 것 같다 (매우 중요!!!!, 이것 때문에 몇시간 날려묵음 ..)
      - [flask, gunicorn, supervisor](https://github.com/Leafney/docker-flask/blob/master/py3/app/conf/supervisor_flask.ini)
  - [run 옵션](http://pyrasis.com/book/DockerForTheReallyImpatient/Chapter20/28)
  - [run 읽을거리](https://bestna.wordpress.com/2014/11/10/docker-container-run-%EC%9D%B4%EC%95%BC%EA%B8%B0/)
  - [run cpu 및 mem 제한하기](https://docs.docker.com/config/containers/resource_constraints/#configure-the-default-cfs-scheduler)
    ```
    docker run --name hello --cpus="4" -d -P myappImage:test
    ```
```
docker run -i -t --name hello ubuntu /bin/bash
```
- **컨테이너 목록 확인**
  - a옵션 ; 정지된 컨테이너까지 보여줌
```
docker ps -a
```
- **컨테이너 시작**
  - 재시작은 restart
```
docker start hello
```
- **컨테이너에 접속**
  - 생성시 /bin/bash를 실행해야만 쉘에 접속해 명령을 입력할 수 있고
  - 그렇지 않다면 서버의 출력만 볼 수 있다.
  - 접속 후 **ctrl + D** 를 입력하면 컨테이너가 정지되고
  - **ctrl + P, ctrl + Q**를 차례대로 입력함으로써 컨테이너를 정지하지 않고 빠져나올 수 있다.
```
docker attach hello
```
- /bin/bash를 통하지 않고, **외부에서 컨테이너 안의 명령 실행**
  - docker exec <컨테이너 이름> <명령> <매개 변수>
  - 외부에서 apt-get, yum을 이용한 패키지 설치 혹은 데몬 실행시 활용 가능!
```
docker exec hello echo "hello world"
```
- run 할 때, /bin/bash를 명시하지 않아도, 다음과 같이 접속할 수 있네
```
docker exec -it [CONTAINER ID] /bin/bash
```
- **컨테이너 정지**
  - docker stop <컨테이너 이름>
```
docker ps 후
docker stop hello
```
- **컨테이너 삭제**
```
docker rm hello
```
- **이미지 삭제**
  - docker rmi <이미지 이름>:<태그>
```
docker rmi ubuntu:latest
docker images
```

### 그 외 명령어
- 이미지 history 조회
```
docker history <이미지이름>:<태그>
```
- 컨테이너로 부터 호스트로 파일 꺼내기(복사)
```
docker cp <컨테이너이름>:/etc/nginx/nginx.conf ./
```
```
docker cp ./abc.txt containername:/abc.txt
docker containername:/abc.txt ./abc.txt
```
- 현재 컨테이너의 변경사항 이미지로 생성
  - 다른 명령어에서도 마찬가지이지만 컨테이너 이름엔 ID를 적어도 됨
```
docker commit <옵션> <컨테이너 이름> <이미지 이름>:<태그>
docker commit -a "Jein Song <jeinsong@zum.com>" -m "커밋 메시지" node-nginx node-nginx-image:0.2
```
- 컨테이너의 변경 부분 확인(생성 이미지 기준으로 실행 후 변경된 것들)
```
docker diff <컨테이너 이름>
```
- 이미지 혹은 컨테이너 세부 정보 출력
```
docker inspect node-nginx
```

## Dockerfile 작성 및 Build 방법
- [Bash 사용법](https://github.com/AI-Trolls/docker-tutorial/tree/master/bash_tutorial)
- [Dockfile 작성 후 build 하는 방법](https://github.com/AI-Trolls/docker-tutorial/tree/master/docker-file-tutorial)
- 등등

## docker-compose로 여러 컨테이너 관리하기
  - [공식문서-회사에서안들가짐](docs.docker.com/compose/compose-file/#context)
  - docker-compose.yml을 정의하고 아래의 명령어로 명시된 컨테이너를 한방에 키고 끌 수 있는 기능!!
    ```
    docker-compose up -d
    docker-compose down
    ```
    - docker와 별도로 설치해줘야 한다. centos라서 curl을 통해 [설치](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-centos-7)했음
    - docker-compose 파일 버전은 [링크](https://docs.docker.com/compose/compose-file)에서 시스템의 도커 버전에 따라 선택
  - 실제 내가 사용한 docker-compose 구성
    ```
      version: "3.5"
      services:
        worker:
          image: facethumb:alpha

        proxy: 
          build:
            context: ./nginx/
          image: proxy:latest
          ports:
            - '22223:80'

    ```
    - compose 하는 법을 모를 때는 참고로, 각 이미지를 각각 빌드한 뒤 아래와 같은 과정을 거쳤음...  
      (워커가 늘어나면 늘어나는대로.. 일일히 하나하나 키고, 끄고)
      - compose는 디폴트로 네트워크가 구성되서 서비스들끼리는 통신이 가능하다고 들었는데 실제로 그렇다.
      ```
      docker network create facethumb-network
      docker run --name facethumb1 -d -P --cpus="4" --network facethumb-network facethumb:alpha
      docker run --name facethumb2 -d -P --cpus="4" --network facethumb-network facethumb:alpha
      docker run --name proxy -d -p 22223:80 --network facethumb-network proxy:test
      ```
    - 이후에 docker-compose up --scale worker=3 -d 명령을 통해 proxy 컨테이너를 3대 띄우고
    - 모두 한방에 종료하는 방법은 docker-compose down
    - 매우 간편하다
    - http://jaynewho.com/post/21 이거 좋은 자료인거같은데 추가로 읽어보기
  - [tour of docker-compose](https://medium.freecodecamp.org/the-ups-and-downs-of-docker-compose-how-to-run-multi-container-applications-bf7a8e33017e)
  - [매우 간단한 사용법 및 예제](https://pages.wiserain.com/articles/cheatsheet-docker-compose/)
  - [기초 사용법](http://seulcode.tistory.com/238)
  - [약간 디테일한 참고자료](http://raccoonyy.github.io/docker-usages-for-dev-environment-setup/)
  - [mongodb/nginx/redis 예시](https://gompro.postype.com/post/1735800)
  - [nginx/wordpress 예시](https://blog.osg.kr/archives/186)

## 가능한 것들
- 개인 Docker Hub 쉽게 구축 가능 (docker registry server)
- Docker 컨테이너 끼리 연결 가능 (link 옵션)
  - link 옵션은 deprecated 될 예정이고
  - [network 생성 기능](http://pyrasis.com/book/DockerForTheReallyImpatient/Chapter06/02)을 써보기
- 다른 서버의 컨테이너로도 연결 가능 (Ambassador container 이용)
- 호스트의 디스크 공간 공유 가능 (v 옵션)
- 컨테이너의 자원(CPU, MEM) 제한 가능 ([참고](https://www.serverlab.ca/tutorials/containers/docker/how-to-limit-memory-and-cpu-for-docker-containers/))
- Docker 모니터링 가능 (Graphite)


## 추가 참고자료
- node 배포, https://seokjun.kim/docker-nginx-node/
- Docker Images 저장 경로 변경
  ```
  # /usr/lib/systemd/system/docker.service
  ~~~~ 생략
  ExceStart=/user/bin/docker -g /새로운경로
  ~~~~ 생략
  ```
  - 수정한 다음, sudo systemctl restart docker를 때려준다.
  - 참고
    - http://kisow.github.io/blog/2015/10/28/docker-image-gyeongro-byeongyeonghagi/
    - https://sanenthusiast.com/change-default-image-container-location-docker/
- nginx 띄우기, http://blog.woniper.net/313
  - docker blog https://blog.docker.com/2015/04/tips-for-deploying-nginx-official-image-with-docker/
  - docker 공홈 nginx dockerfile https://docs.docker.com/samples/library/nginx/#hosting-some-simple-static-content
