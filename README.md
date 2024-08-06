# Personal Blog Project

## Overview

This repository houses a personal blog project.

## Features

- **Authentication**: User registration and login capability.
- **Text Editor**: Content creation and editing functionality.
- **Image Upload**: Allows for image attachments in posts.
- **LaTeX Support**: Integration for mathematical formulas and notations.

## Tech Stack

Initially developed with **ReactJS** (frontend) and **NodeJS** (backend). Transitioning to **SvelteKit** is in progress.

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

- [ ] Finish Write, Edit and Draft page.
    - [X] Show Code Block properly in editor.
    - [X] Show language selector properly in editor.
    - [X] Show previous code block properly in post.
    - [ ] Check if the new codes are saved with language.
        - 일단 한 번 저장해보자. DB에 어떻게 쌓이는지.
    - [X] Finish KaTex.
    - [ ] Finish 'write' request.
    - [ ] Return 404 when accessing deleted posts.
- [ ] Get the next and previous posts.
- [ ] After delete, the deleted post should be gone.
    - It's because layout.server.ts doesn't run after update.
    - Let's use the life cycle hooks.
- [ ] Search function needs to be finished.
- [ ] Verify the token properly (client - before edit, server - before edit).
- [ ] Finish Footer.
- [ ] Make new categories.
- [ ] Other TODOs remaining.
