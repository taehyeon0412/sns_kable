# 1. 서비스 개요
<img src="https://github.com/user-attachments/assets/1fa0531a-9808-4d94-a7cd-357f943b855c" alt="kable name" width="400" height="300" />

### 카테고리가 있는 SNS 카블!
### 다양한 카테고리별로 글을 올리고 다양한 사람들과 소통해 보세요

<br/>
<br/>


# 2. 개발 환경
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

<br/>

# 3. 폴더 구조

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
📁 hooks
│   
📁 _components
│   ├──📁 chats         # 채팅
│   ├──📁 common        # 공통 (button, 무한스크롤 등)
│   ├──📁 homeSection   # 화면 섹션
│   ├──📁 login         # 로그인
│   └──📁 modal         # 모달창
│
📁 _libs
├──📁 _client         # 클라이언트 관련
├──📁 _server         # 서버 관련
├──📁 config          # aws, firebase config
└──📁 schema          # zod 스키마
```
