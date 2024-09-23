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

**FrontEnd**
<br/>

![Next JS](https://img.shields.io/badge/Next-14-black?style=for-the-badge&logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) 

**BackEnd**
<br/>

![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) 

**Cloud Services**
<br/>

![AWS](https://img.shields.io/badge/AWS⠀S3-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34) 

**Deployment | Package Management**
<br/>

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

<br/>

# 프로젝트 구성도

<details>
  <summary>폴더 구조</summary>

  <br/>
  
  ```
📁 public
├──📁 assets
│   ├──📁 icons
│   └──📁 images
│
📁 app                    # 라우팅 폴더 / (그룹별, api, hooks, components, libs 분류)
├──📁 (auth)              # 그룹 라우팅 (로그인, 사용자 인증 관련)
│   ├──📁 create-account
│   ├──📁 enter
│   ├──📁 github
│   │   ├──📁 complete
│   │   └──📁 start
│   └──📁 kakao
│       ├──📁 complete
│       └──📁 start
│
├──📁 (tabs)              # 그룹 라우팅 (페이지 관련)
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
📁 _components            # 컴포넌트 기능별로 정리
│   ├──📁 chats           # 채팅
│   ├──📁 common          # 공통 (button, 무한스크롤 등)
│   ├──📁 homeSection     # 화면 섹션
│   ├──📁 login           # 로그인
│   └──📁 modal           # 모달창
│
📁 _libs                  # 라이브러리(유틸리티 함수)
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
  - **Endpoint**: / api / user / [id]
  - 설명 : url에 있는 id로 유저 정보를 불러옵니다.

- 특정 유저 아이템 들고 오기

  - **HTTP Method**: ”GET”
  - **Endpoint**: / api / items / user / [id]
  - 설명 : url에 있는 id로 유저 정보를 불러옵니다.

- 아이템 조회수 증가

  - **HTTP Method**: ”POST”
  - **Endpoint**: / api / items / [id] / views
  - 설명 : item의 views를 증가시킵니다.

- 팔로우 / 팔로잉

  - **HTTP Method**: ”POST”
  - **Endpoint**: / api / items / [id] / follow
  - 설명 : 버튼을 눌렀을 때 팔로우 / 언팔로우 합니다.
 
- 인기글 순위
  - **HTTP Method**: ”GET”
  - **Endpoint**: / api / items / popular
  - 설명 : view, heart를 계산하여 인기글 순위를 가져옵니다.

  </details>

  <details>
  <summary>Prisma DB 설계</summary>
    표넣기
  </details>
  

  <br/>

<table >
  <thead>
    <tr>
      <th align="center">아키텍처(Architecture)</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/a128bbbb-dc78-4249-99c6-295312d364b0" alt="아키텍처 이미지" width="750px" style="max-width: 100%;">
    </td>
    </tr>
  </tbody>
</table>

 <br/>

<table >
  <thead>
    <tr>
      <th align="center">유저 플로우(Architecture)</th>
    </tr>
  </thead>
<tbody>
  <tr>
     <td align="center">
          <img src="https://github.com/user-attachments/assets/fc560578-21c1-4d52-b0f7-7227bb85f0b8" alt="유저 플로우 이미지" width="750px" style="max-width: 100%;">
        </td>
    </tr>
  </tbody>
</table>

<br/>

# 기능 소개

**토글을 열면 시연 영상을 확인하실 수 있습니다**

<br/>

<details>
  <summary>로그인 / 회원가입</summary>

  <br/>

   <table>
    <thead>
      <tr>
        <th align="center">로그인</th>
         <th align="center">회원가입</th>
        </tr>
      </thead>
        <tbody>
        <tr>
        <td align="center">
          <img src="https://github.com/user-attachments/assets/b6d307c2-a68d-4914-9184-499ab07df27b" alt="로그인" width="500px" style="max-width: 100%;">
        </td>
           <td align="center">
         <img src="https://github.com/user-attachments/assets/7c4b400d-9d9c-4e19-89e1-584b368d0544" alt="회원가입" width="500px" style="max-width: 100%;" >
        </td>
      </tr>
    </tbody>
  </table>

</details>

- 폼 유효성 검증 (email 형식, 사용자 닉네임 중복 검사, 특수문자 포함 10글자 이상 비밀번호)
- 카카오, 깃허브 소셜 로그인
- iron-session을 이용한 인증 상태 유지 및 유저 정보 관리
- 인증 된 유저에 따른 서비스 접근 제한 및 보호

  <br/>

<details>
  <summary>전체 게시글 조회 & 게시글 상세 조회 & 카테고리 필터링 & 인기글 순위</summary>

<br/>

   <table>
    <thead>
      <tr>
        <th align="center">게시글 조회 & 상세 조회</th>
        <th align="center">카테고리 필터링 & 인기글 순위</th>
        </tr>
      </thead>
        <tbody>
        <tr>
        <td align="center">
          <img src="https://github.com/user-attachments/assets/0642f03c-79f0-45d3-be93-887aaf0df2e2" alt="게시물" width="500px" style="max-width: 100%;">
        </td>
        <td align="center">
         <img src="https://github.com/user-attachments/assets/031f9d7e-2fe9-4192-ba6e-42080f4c61e6" alt="카테고리 인기글 필터링" width="500px" style="max-width: 100%;" >
        </td>
      </tr>
    </tbody>
  </table>

</details>

- 무한스크롤을 활용한 페이지네이션
- 게시물 상세 정보 조회 기능

  <br/>

<details>
  <summary>게시글 CRUD & 댓글 CRUD</summary>

<br/>

   <table>
    <thead>
      <tr>
        <th align="center">게시글 시연</th>
         <th align="center">댓글 시연</th>
        </tr>
      </thead>
        <tbody>
        <tr>
        <td align="center">
          <img src="https://github.com/user-attachments/assets/20ea7f9c-abf2-4437-a590-dab3692c9175" alt="게시글" width="500px" style="max-width: 100%;">
        </td>
           <td align="center">
         <img src="https://github.com/user-attachments/assets/192f85cb-0629-4a08-885e-54b6d2744828" alt="댓글" width="500px" style="max-width: 100%;" >
        </td>
      </tr>
    </tbody>
  </table>

</details>

- 텍스트와 이미지, 카테고리를 이용한 게시글 작성 및 수정 삭제 기능
- 이미지 업로드 가능 (webp 변환 후 업로드)
- 댓글 CRUD 기능

  <br/>

<details>
  <summary>게시글 좋아요 & 유저 팔로우 & 팔로우 페이지</summary>

<br/>

   <table>
    <thead>
      <tr>
        <th align="center">게시물 좋아요 & 유저 팔로우</th>
        <th align="center">팔로우 페이지 & 좋아요 페이지</th>
        </tr>
      </thead>
        <tbody>
        <tr>
        <td align="center">
          <img src="https://github.com/user-attachments/assets/f2fbf640-78ce-49cc-bf81-91a800b4387c" alt="게시물 좋아요 & 유저 팔로우" width="500px" style="max-width: 100%;">
          </td>
           <td align="center">
          <img src="https://github.com/user-attachments/assets/19bee51c-63b5-495b-8c7e-9f55b407d3bc" alt="팔로우 & 좋아요 페이지" width="500px" style="max-width: 100%;">
          </td>
      </tr>
    </tbody>
  </table>
</details>

- 게시글 좋아요 기능 & 게시글 모아보기 기능
- 유저 팔로우/언팔로우 기능 & 팔로우 유저 게시글 모아보기 기능

<br/>

<details>
  <summary>실시간 채팅</summary>
<br/>
  
![채팅 구현](https://github.com/user-attachments/assets/9218bb8e-a2ac-4c12-ad32-72d1a5e289bf)

</details>

- 게시물 유저 카드 & 유저 프로필을 통해 채팅방 입장

<br/>

<details>
  <summary>반응형 페이지</summary>
<br/>
  
 <table>
    <thead>
      <tr>
        <th align="center">데스크톱</th>
         <th align="center">모바일</th>
        </tr>
      </thead>
        <tbody>
        <tr>
        <td align="center">
          <img src="https://github.com/user-attachments/assets/a4367846-a812-4775-bcc8-3207af18b940" alt="데스크톱" width="650px" style="max-width: 100%;">
        </td>
           <td align="center">
         <img src="https://github.com/user-attachments/assets/28adf06d-bfc6-47f4-ba62-d69271668165" alt="모바일" width="350px" style="max-width: 100%;" >
        </td>
      </tr>
    </tbody>
  </table>

</details>

<br/>

# 🔥 개선 사항
### 성능 개선

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

   
- 웹 성능 최적화 점수 약 **29.8%** 증가
  - [이미지 최적화로 사이즈 약 **84%** 감소](https://taehyeon-smilestudy.tistory.com/51)
  - <details>
      <summary>LCP 시간 2.8s -> 0.7s로 <strong>75%</strong> 개선</summary>
    
      - next/image 컴포넌트는 기본적으로 지연 로딩(lazy loading)을 수행,<br/>
        첫화면에 보이는 로고나 배너 같은 중요한 요소들은 즉시 로드 하는게 오히려 LCP의 점수에 더 좋은 영향을 끼치는 것을 발견
        
        - priority 속성을 추가하여 이미지를 즉시 로드하게 변경
        - sizes를 이용해서 뷰포트에 맞는 이미지를 가져오게 변경
        - fetchPriority="high"를 사용하여 먼저 로드 되도록 우선순위를 높임 
      </details>
  <br/>

<table>
    <thead>
      <tr>
        <th align="center">무한 스크롤 적용 전</th>
        <th align="center">무한 스크롤 적용 후</th>
        </tr>
      </thead>
        <tbody>
        <tr>
        <td align="center">
          <img src="https://github.com/user-attachments/assets/aa506587-109c-4cf2-a067-3bc490ea386a" alt="무한스크롤 적용 전" width="500px" style="max-width: 100%;">
        </td>
        <td align="center">
         <img src="https://github.com/user-attachments/assets/76ece647-ce14-4cbb-8de9-b1eb8f5a6cff" alt="무한스크롤 적용 후" width="500px" style="max-width: 100%;">
        </td>
      </tr>
    </tbody>
  </table>
  
- <details>
      <summary>무한 스크롤 도입, API 응답 시간 약 <strong>84%</strong> 개선</summary>
  <br/>
  
  - 무한 스크롤을 도입하여 초기 데이터 요청량을 줄였고, 필요한 데이터만 점진적으로 요청함으로써 API 응답 시간을 개선하였습니다.
  </details>

  <br/>

### 사용자 경험 개선
- <details>
      <summary>pending 상태를 추적하여 서버 액션을 할 때 사용자가 시각적으로 볼 수 있게 처리</summary>
      <br/>
    
    <table>
      <tr>
        <td align="center">
          <img src="https://github.com/user-attachments/assets/bae24b88-6f83-463a-9a01-25fee34f3f7a" alt="댓글" width="500px" style="max-width: 100%;">
        </td>
        <td align="center">
         <img src="https://github.com/user-attachments/assets/3995c8f7-455e-4b74-9843-1b96651cf610" alt="업로드" width="500px" style="max-width: 100%;">
        </td>
      </tr>
    </table>
    </details>
    
- <details>
      <summary>페이지 이동 시 스켈레톤을 추가하여 로딩이 시각적으로 보여지게 처리</summary>
       <br/>
    
    <table>
      <tr>
        <td align="center">
          <img src="https://github.com/user-attachments/assets/02bb8ec1-9796-45d1-b119-7f278ce89446" alt="홈 스켈레톤" width="500px" style="max-width: 100%;">
        </td>
        <td align="center">
         <img src="https://github.com/user-attachments/assets/02a546b8-bd19-4a07-b407-540c4502b5de" alt="아이템 스켈레톤" width="500px" style="max-width: 100%;">
        </td>
      </tr>
    </table>
    
    </details>
    
- <details>
    <summary>react-query의 invalidateQueries를 사용, 유저가 새로고침을 하지 않아도 게시글 자동으로 갱신</summary>
      <br/>
    
  <table>
      <tr>
        <td align="center">
          <img src="https://github.com/user-attachments/assets/8a367a45-7aea-4e5b-984f-a35e2c484be5" alt="생성갱신" width="500px" style="max-width: 100%;">
        </td>
        <td align="center">
         <img src="https://github.com/user-attachments/assets/10486784-6886-4ce9-9669-1f6d787029c3" alt="삭제갱신" width="500px" style="max-width: 100%;">
        </td>
      </tr>
      </table>
    
    </details>

- <details>
    <summary>낙관적 업데이트를 추가하여 사용자 액션에 딜레이를 없앰</summary>
    <br/>
    
  <table>
      <tr>
        <td align="center">
          <img src="https://github.com/user-attachments/assets/0d8e54e0-c955-4db0-9d59-7f4e95754251" alt="팔로우 낙관적 업데이트" width="500px" style="max-width: 100%;">
        </td>
        <td align="center">
         <img src="https://github.com/user-attachments/assets/7d516010-e6bf-4c1d-98f8-e4b8f77a2ffb" alt="좋아요 낙관적 업데이트" width="500px" style="max-width: 100%;">
        </td>
      </tr>
      </table>
  </details>

<br/>
