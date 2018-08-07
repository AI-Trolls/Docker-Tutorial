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
