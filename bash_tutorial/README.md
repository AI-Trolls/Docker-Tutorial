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
  - ` `도 같은 역할
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
