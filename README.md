# 서비스 개요
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
<th align="left"><a href="kable@gmail.com">kable@gmail.com</a></th>
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


# 개발 환경
![Next JS](https://img.shields.io/badge/Next-14-black?style=for-the-badge&logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) ![AWS](https://img.shields.io/badge/AWS⠀S3-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)



<br/>

# 프로젝트 구성도

<details>
  <summary>폴더 구조 보기</summary>

  <br/>
  
  ```
📁 public
├──📁 assets
│   ├──📁 icons
│   └──📁 images
│
📁 app                    # 라우팅 폴더
├──📁 (auth)              # 그룹 라우팅 (auth)
│   ├──📁 create-account
│   ├──📁 enter
│   ├──📁 github
│   │   ├──📁 complete
│   │   └──📁 start
│   └──📁 kakao
│       ├──📁 complete
│       └──📁 start
│
├──📁 (tabs)              # 그룹 라우팅 (tabs)
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
├──📁 api                 # api
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
📁 hooks                  # React-Query hook (api)
│   
📁 _components
│   ├──📁 chats           # 채팅
│   ├──📁 common          # 공통 (button, 무한스크롤 등)
│   ├──📁 homeSection     # 화면 섹션
│   ├──📁 login           # 로그인
│   └──📁 modal           # 모달창
│
📁 _libs
├──📁 _client             # 클라이언트 관련
├──📁 _server             # 서버 관련
├──📁 config              # aws, firebase config
└──📁 schema              # zod 스키마
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

# 기능 소개

__토글을 열면 시연 영상을 확인하실 수 있습니다__

<br/>

<details>
  <summary>로그인 / 회원가입</summary>

  시연 gif 넣기
</details>

* 폼 유효성 검증 (email 형식, 사용자 닉네임 중복 검사, 특수문자 포함 10글자 이상 비밀번호)
* 카카오, 깃허브 소셜 로그인
* iron-session을 이용한 인증 상태 유지 및 유저 정보 관리
* 인증 된 유저에 따른 서비스 접근 제한 및 보호

  <br/>

<details>
  <summary>전체 게시글 조회 & 게시글 상세 조회</summary>

  시연 gif 넣기
</details>

* 무한스크롤을 활용한 페이지네이션
* 게시물 상세 정보 조회 기능

  <br/>

<details>
  <summary>게시글 CRUD & 댓글 CRUD</summary>

  시연 gif 넣기
</details>

* 텍스트와 이미지, 카테고리를 이용한 게시글 작성 및 수정 삭제 기능
* 이미지 업로드 가능 (webp 변환 후 업로드)
* 댓글 CRUD 기능

  <br/>

<details>
  <summary>게시글 좋아요 & 유저 팔로우</summary>

  시연 gif 넣기
</details>

* 게시글 좋아요 기능 & 게시글 모아보기 기능
* 유저 팔로우/언팔로우 기능 & 팔로우 유저 게시글 모아보기 기능

<br/>

<details>
  <summary>실시간 채팅</summary>

  시연 gif 넣기
</details>

* 게시물 유저 카드 & 유저 프로필을 통해 채팅방 입장

<br/>

# 🔥 성능 최적화
* [이미지 최적화로 사이즈 약 84% 감소 & Lcp 개선](https://taehyeon-smilestudy.tistory.com/51)
  * next/image 컴포넌트는 기본적으로 지연 로딩(lazy loading)을 수행
    * 첫화면에 보이는 로고나 배너 같은 중요한 요소들은 즉시 로드 하는게 오히려 LCP의 점수에 더 좋은 영향을 끼치는 것을 발견
    * priority 속성을 추가하여 이미지를 즉시 로드하게 변경
    * sizes를 이용해서 뷰포트에 맞는 이미지를 가져오게 변경
    * fetchPriority="high"를 사용하여 먼저 로드 되도록 우선순위를 높임
   
    <br/>
   
  <table>
    <thead>
      <tr>
        <th align="center">웹 성능 최적화 전</th>
        <th align="center">웹 성능 최적화 후</th>
        </tr>
      </thead>
        <tbody>
        <tr>
        <td align="center">
          <img src="https://github.com/user-attachments/assets/31a0daa8-bce0-48ea-9c1d-36b4bbabfc2e" alt="웹 성능 최적화 전 이미지" width="500px" style="max-width: 100%;">
        </td>
        <td align="center">
         <img src="https://github.com/user-attachments/assets/cea62949-ef5d-4960-9333-e570f243689f" alt="웹 성능 최적화 후 이미지" width="500px" style="max-width: 100%;">
        </td>
      </tr>
    </tbody>
  </table>

   <br/>
   
* 최적화 후 추가 예정

<br/>

# ☄️ 트러블 슈팅
* 추가 예정






















