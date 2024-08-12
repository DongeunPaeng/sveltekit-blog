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

- [ ] Finish Write page.
    - [X] Show Code Block properly in editor.
    - [X] Show language selector properly in editor.
    - [X] Show previous code block properly in post.
    - [X] Check if the new codes are saved with language.
        - [X] Save with language specified
    - [X] Finish KaTex.
    - [X] Finish 'write' request.
    - [X] Redirect after 'write'.
    - [ ] Delete the input box before saving.
- [ ] Return 404 when accessing deleted posts.
- [ ] Finish Edit and Draft page.
- [ ] Get the next and previous posts.
- [ ] After CRUD operations, the posts should be updated.
    - It's because layout.server.ts does not run after update.
    - Let's use the life cycle hooks.
- [ ] Search function needs to be finished.
- [ ] Verify the token properly (client - before edit, server - before edit).
- [ ] Finish Footer.
- [ ] Make new categories.
- [ ] Other TODOs remaining.
- [ ] Token 만료되면 loggedInUser 없애고 Delete 버튼도 없어야 함.
