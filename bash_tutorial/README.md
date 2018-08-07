## Bash Tutorial
Docker 이미지 생성시 자주 사용하는 Bash 문법 복습스

- 출력 리다이렉션
  - >> 두번쓰면 파일에 이어붙임
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
