# Personal Blog Project

## Overview

This repository houses a personal blog project.

## Features

- **Authentication**: User registration and login capability.
- **Text Editor**: Content creation and editing functionality.
- **Image Upload**: Allows for image attachments in posts.
- **LaTeX Support**: Integration for mathematical formulas and notations.

## Tech Stack

Initially developed with **ReactJS** (frontend) and **Node.js** (backend). Transitioning to **SvelteKit** is in
progress.

## Transition to SvelteKit

The move to SvelteKit aims for:

- Enhanced performance.
- Reduction in boilerplate code.
- Preparation for long-term development proficiency.

## Contribution

Issues and pull requests are welcome for feature suggestions or improvements.

## Questions

For inquiries or feedback, please use the repository's issues section.

## TODO

- [X] Finish Write page.
    - [X] Show Code Block properly in editor.
    - [X] Show language selector properly in editor.
    - [X] Show previous code block properly in post.
    - [X] Check if the new codes are saved with language.
        - [X] Save with language specified
    - [X] Finish KaTex.
    - [X] Finish 'write' request.
    - [X] Redirect after 'write'.
    - [X] Delete the input box before saving.
- [X] After CRUD operations, the posts should be updated.
    - [X] /test에서 하나씩 테스트해보자.
        - [X] layout에서 parent()로 받아다 쓴 게 문제였음.
        - [X] Delete을 test와 똑같이 만들기.
- [X] Finish Edit and Draft page.
- [X] Return 404 when accessing deleted posts.
- [X] Separate write and update.
- [X] List is not properly shown in the post.
    - [X] Recognise unordered list properly (QuillJS defect)
    - [X] Add tailwind list style to all old posts, too.
- [X] In TextEditor, I can't see <ul> with tailwind class. Fix this.
- [X] In TextEditor, I can't see codes. Fix this.
- [X] Separate public and private.
- [X] Make the post non-nullable.
- [X] Get the next and previous posts.
- [ ] In the post, some images are not shown (429 error).
- [ ] Search function needs to be finished.
- [ ] Verify the token properly. (check if login/logout affects parent properly.)
- [ ] Finish Footer.
- [ ] Make new categories.
- [ ] Other TODOs remaining.
- [ ] Token 만료되면 loggedInUser 없애고 Delete 버튼도 없어야 함.
- [X] Write and Logout button are hovered together.
- [ ] Change /test to principles or another page.
- [ ] Indentation... 이 문제는 나중에 해결하자. Tailwind 자체 결함.
    - [ ] Second-level indentation
- [ ] 전반적인 리팩터링 (중복 코드 없애고, 깔끔하게 만들기)
    - [X] CRUD 과정 복기하기
    - [ ] Auth 과정 복기하기
    - [ ] TextEditor 로직 특히 복잡함
- [ ] Add loading spinner
- [ ] QC
- [ ] CI/CD and deployment
- [ ] Manage DB pool
- [ ] Disssemble addAge function and show datetime properly for next and previous posts.
- [X] getPost, getPosts 등등... 레코드 없는 경우 에러 핸들링을 서버로 빼자.
- [ ] 홈 화면 엄청 오래 걸린다 갑자기. Next, Prev 작업한 이후부터 그럼.
- [X] Timestamp 관련 의문 해결
    - 현재 DB에는 한국 시간으로 저장돼 있다. 내가 실제로 글을 작성한 시간.
    - 서버에서 글을 불러와 created_at을 확인하면 GMT로 출력된다. 한국 시간이 아니라.
        - 서버에서는 어떻게 DB에서 불러온 값이 한국 시간인 걸 아는 걸까?
        - MySQL 타임존이 Asia/Seoul이고, 그 상태에서 저장된 시각이라서 그 정보를 아는 건가?
        - GPT 왈, 서버는 DB가 보내주는 timestamp가 어떤 타임존에서 작성된 건지 모른다고 한다.
        - 대신, 그 타임존이 "현재 서버 자신이 존재하는 타임존"에서 작성됐을 거라고 추측한다고 한다.
        - 따라서 DB가 보내주는 timestamp가 GMT+9 기준이겠거니 하는 가정을 한다는 것이다.
    - 서버로부터 글을 받아 프론트에 출력하면 GMT+0900 (Korean Standard Time)가 출력된다.
        - 결국 서버에서 UTC 시간을 잘 주었고, 그걸 브라우저 현지 시각으로 표현해주는 것이다.
        - 그러면 애초에 서버에서 왜 정확히 시간을 알고 있는지가 궁금해진다.