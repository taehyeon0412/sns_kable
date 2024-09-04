# 1. 서비스 개요
<div align="center">
  <img src="https://github.com/user-attachments/assets/1fa0531a-9808-4d94-a7cd-357f943b855c" alt="kable name" width="400" height="300" />
</div>

### 카테고리가 있는 SNS 카블!
### 카테고리별로 글을 올리고 다양한 사람들과 소통해 보세요

<br/>

<blockquote>
<p dir="auto">
  <strong>개발 기간 : 2024.08 ~ 2024.09</strong> 
  </p>
</blockquote>

  <br/> 

  <blockquote>
    <p dir="auto">
  <strong>배포 주소 : 나중에 추가하기</strong>
      </p>
</blockquote>
  <br/>
  
   <blockquote>
    <p dir="auto">
<strong>Kable 게스트 계정 정보</strong>
</p>
</blockquote>

<markdown-accessiblity-table data-catalyst=""><table>
<thead>
<tr>
<th align="center">아이디</th>
<th align="left"><a href="mailto:ssafymate@gmail.com">kable@gmail.com</a></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">비밀번호</td>
<td align="left">kable12345!A</td>
</tr>
</tbody>
</table></markdown-accessiblity-table>

<br/>
<br/>


# 2. 개발 환경
![Next JS](https://img.shields.io/badge/Next-14-black?style=for-the-badge&logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) ![AWS](https://img.shields.io/badge/AWS⠀S3-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)



<br/>

# 3.  프로젝트 구성도

<details>
  <summary>폴더 구조 보기</summary>

  <br/>
  
  ```
📁 public
├──📁 assets
│   ├──📁 icons
│   └──📁 images
│
📁 app                  # 라우팅 폴더
├──📁 (auth)            # 그룹 라우팅 (auth)
│   ├──📁 create-account
│   ├──📁 enter
│   ├──📁 github
│   │   ├──📁 complete
│   │   └──📁 start
│   └──📁 kakao
│       ├──📁 complete
│       └──📁 start
│
├──📁 (tabs)            # 그룹 라우팅 (tabs)
│   ├──📁 category
│   ├──📁 chats
│   │   └──📁 [id]
│   ├──📁 following
│   ├──📁 home
│   ├──📁 items
│   │   ├──📁 upload
│   │   └──📁 [id]
│   └──📁 profile
│       └──📁 [id]
│
├──📁 api               # api
│   ├──📁 category
│   ├──📁 items
│   │   └──📁 [id]
│   │      ├──📁 comments
│   │      ├──📁 heart
│   │      └──📁 views
│   ├──📁 user
│   │   └──📁 [id]
│   │      └──📁 follow
│   └──📁 logout
│
📁 hooks                # React-Query hook (api)
│   
📁 _components
│   ├──📁 chats         # 채팅
│   ├──📁 common        # 공통 (button, 무한스크롤 등)
│   ├──📁 homeSection   # 화면 섹션
│   ├──📁 login         # 로그인
│   └──📁 modal         # 모달창
│
📁 _libs
├──📁 _client           # 클라이언트 관련
├──📁 _server           # 서버 관련
├──📁 config            # aws, firebase config
└──📁 schema            # zod 스키마
```

</details>

<details>
  <summary>API 문서</summary>

  <br/>
  
  - 유저 정보
    - **HTTP Method**: ”GET”
    - **Endpoint**: / api / user
    - 설명 : 현재 인증된 사용자의 정보를 가져옵니다.


- 로그아웃
    - **HTTP Method**: “POST”
    - **Endpoint**: / api / logout
    - 설명 : 현재 인증된 사용자의 쿠키를 제거합니다.
   

- 카테고리 정보
    - **HTTP Method**: ”GET”
    - **Endpoint**: / api / category
    - 설명 : 서버에 저장된 카테고리 정보를 가져옵니다.


- 아이템 정보
    - **HTTP Method**: ”GET”
    - **Endpoint**: / api / items
    - 설명 : 서버에 저장된 아이템 정보를 모두 가져옵니다.


- 아이템 디테일 정보
    - **HTTP Method**: ”GET”
    - **Endpoint**: / api / items / [id]
    - 설명 : 서버에 저장된 아이템 정보를 id를 매칭하여 가져옵니다.
   

- 아이템 삭제
    - **HTTP Method**: ”DELETE”
    - **Endpoint**: / api / items / [id]
    - 설명 : 서버에 저장된 아이템 정보 중 id를 매칭하여 삭제합니다.


- 좋아요 정보
    - **HTTP Method**: ”POST”
    - **Endpoint**: / api / items / [id] / heart
    - 설명 : 사용자가 하트를 누르면 하트를 생성 / 하트를 다시 누르면 하트를 삭제합니다.
    

- 댓글 생성
    - **HTTP Method**: ”POST”
    - **Endpoint**: / api / items / [id] / comments
    - 설명 : 사용자가 폼을 submit하면 현재 로그인 된 userId와 input의 payload를 서버로 전송하여 새로운 댓글을 추가합니다.
   

- 댓글 삭제
    - **HTTP Method**: ”DELETE”
    - **Endpoint**: / api / items / [id] / comments / [commentId]
    - 설명 : 버튼을 누르면 댓글을 삭제합니다.
  

- 댓글 수정
    - **HTTP Method**: ”PUT”
    - **Endpoint**: / api / items / [id] / comments / [commentId]
    - 설명 : 버튼을 누르면 댓글을 수정합니다.
   

- 프로필 페이지 유저 정보
    - **HTTP Method**: ”GET”
    - **Endpoint**: / api / user / [id] / route.ts
    - 설명 : url에 있는 id로 유저 정보를 불러옵니다.
   

- 특정 유저 아이템 들고 오기
    - **HTTP Method**: ”GET”
    - **Endpoint**: / api / items / user / [id] / route.ts
    - 설명 : url에 있는 id로 유저 정보를 불러옵니다.
    

- 아이템 조회수 증가
    - **HTTP Method**: ”POST”
    - **Endpoint**: / api / items / [id] / views / route.ts
    - 설명 : item의 views를 증가시킵니다.
    

- 팔로우 / 팔로잉
    - **HTTP Method**: ”POST”
    - **Endpoint**: / api / items / [id] / follow / route.ts
    - 설명 : 버튼을 눌렀을 때 팔로우 / 언팔로우 합니다.

  </details>

  <br/>

<table>
  <thead>
    <tr>
      <th align="center">아키텍처(Architecture)</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td align="center">
      아키텍쳐 이미지 넣기
    </td>
    </tr>
  </tbody>
</table>

<br/>

# 4. 기능 소개



















