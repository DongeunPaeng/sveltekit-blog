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
- [ ] After CRUD operations, the posts should be updated.
    - [ ] FIXME FROM HERE부터 하나씩 차근차근 테스트해보자. 어디서부터 rehydration이 안 되는지.
        - [X] CREATE
        - [X] READ
        - [ ] UPDATE
        - [X] DELETE
    - [ ] (superior) 프론트엔드 코드에서 layout.server.ts만 한 번 더 호출할 수 있으면 된다.
    - [ ] (inferior) store를 두고, 변경이 발생하면 store를 고쳐주면 된다.
- [ ] Finish Edit and Draft page.
- [ ] Return 404 when accessing deleted posts.
- [ ] Get the next and previous posts.
- [ ] Search function needs to be finished.
- [ ] Verify the token properly (client - before edit, server - before edit).
- [ ] Finish Footer.
- [ ] Make new categories.
- [ ] Other TODOs remaining.
- [ ] Token 만료되면 loggedInUser 없애고 Delete 버튼도 없어야 함.
- [ ] Write and Logout button are hovered together.
