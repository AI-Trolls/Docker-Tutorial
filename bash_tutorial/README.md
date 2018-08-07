## Bash Tutorial
Docker 이미지 생성시 자주 사용하는 Bash 문법 빠르게 복습스

- 출력 리다이렉션
  - \>\> 두번쓰면 파일에 이어붙임
```
echo "hello" > ./hello.txt
echo "hello" > /dev/null
```
- 입력 리다이렉션
```
cat < ./hello.txt
```
- 표준 출력을 파일에 이어 붙임
```
echo "world" >> ./hello.txt
```
- 명령 실행시 발생하는 stderr을 파일로 저장
  - 2>> 는 이어 붙이기
  - &>는 stdout, stderr 모두 파일에 저장
```
python abc.py 2> error.txt
```
- 표준출력(stdout)을 표준에러(stderr)로 보내버리기
  - echo가 stdout으로 출력하지만
  - stderr로 보내버려서 초기화 안됨
```
hello=$(echo "Hello World" 1>&2)
echo $hello
```
- 2>&1은 반대
  - stderr을 stdout으로 보냄
  - 없는 명령이기 때문에 에러가 나지만 stdout으로 보내짐
```
abcd > /dev/null 2>&1
abcd > abc.txt 2>&1
```
- 파이프, 명령 실행 후 발생하는 stdout을 다른 명령의 stdin으로 보냄
```
ls -al | grep .txt
```
- Bash의 변수 갖다 쓰기
```
hello = "Hello world"
echo $hello
```
- 명령 실행 결과 변수화
  - 명령 실행 결과를 변수에 저장할 때 사용
  - 명령 실행 결과를 다른 명령의 매개변수로 넘길 때 사용
  - 문자열 안에 명령 실행결과 넣을 때 사용
  - \` \`도 같은 역할
```
sudo docker rm $(docker ps -aq)
echo $(date)
```
- 한줄에서 여러개 명령어 실행
  - 앞의 명령어 실패시 뒤에 명령 실행 안됨
  - **;** 은 앞의 명령 실패해도 뒤에 것 실행
```
make && make install
```
- 문자열 '
  - 처리되지 않고 그대로 출력
  - "을 이용한 문자열은 안에 변수가 들어있을 경우, 변수 내용으로 바뀌고, $() 및 \`\`도 정상 동작
```
echo '$USER'
echo "$USER"
echo "Host name is $(hostname)"
echo "Time: `date`"
```
- 명령어 안에서 다시 명령어 실행할 때 "안에 '를 넣어 활용
```
bash -c "bin/echo Hello 'World'"
```
- 이스케이핑 백슬래쉬 \\
```
echo "\$hello \" \`"
```
- 변수 치환
  - 문자열 안에서 변수 출력시 사용
  - 변수의 기본값 설정할 때도 사용 (변수가 없으면 **-** 뒷 부분으로 초기화)
  - **:-** 을 사용하면, 값이 NULL일 경우에 기본 값 대입
```
str="World"
echo "Hello ${str}"

HELLO=
HELLO=${HELLO-"abcd"} # 현재 HELLO가 NULL이기 때문에 기본값 설정 안됨
echo $HELLO

WORLD=
WORLD=${WORLD:-"abcd"}
echo $WORLD
```
- 한 줄로된 명령어 여러줄로 나누어 표현
```
sudo docker run \
  -d \
  --name hello \
  busybox:latest
```
- 연속된 숫자 표현
```
echo {1..10}
```
- 문자열 여러개 지정하여 명령어 실행 횟수 줄이기
```
cp ./{hello.txt, world.txt} hello-dir/
```
- 조건문
  - 숫자 비교
    - eq : 같다, ne : 같지 않다, gt : 초과, ge : 이상, lt : 미만, le : 이하
  - 문자 비교
    - =, == : 같다, != : 같지 않다, -z : 문자열이 NULL일 때, -n : 문자열이 NULL이 아닐 때
```
if [ $a -eq $b ]; then
  echo $a
fi
```
