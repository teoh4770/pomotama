# Contributing to Pomotama🍅

Welcome to Pomotama! I'm excited to have you contribute. Before you get started, please take a moment to review the following guidelines.

## Quick Start

> Install Node.js

```sh
https://nodejs.org/en/download/
```

> Install pnpm using npm

```sh
$ npm install -g pnpm
```

> Fork the Repository
> Clone the Repository

```sh
$ git clone https://github.com/teoh4770/Pomotama.git
```

> From your terminal, navigate to the root path of clone

```sh
cd path/to/your/clone
```

> Install Dependencies

```sh
pnpm i
```

> Run local server

```sh
pnpm run dev
```

## How to Contribute

### <ins>TL:DR</ins>

1. **Fork the Repository**: Click the "Fork" button in the upper right corner of the repository's page on GitHub.

2. **Clone the Repository**: Clone your fork of the repository to your local machine using Git:

    ```bash
    git clone https://github.com/teoh4770/Pomotama.git
    ```

3. **Pick an issue**: Checkout the [Issues](https://github.com/teoh4770/Pomotama/issues) and get an issue assigned to you.

4. **Create a Branch**: Create a new branch for your contribution:

    **Branch for creating a feature**

    ```bash
    git checkout -b feature/issue-number/description
    ```

    **Branch for fixing a bug**

    ```bash
    git checkout -b bugfix/issue-number/description
    ```

5. **Make Changes**: Make your changes to the project locally on your computer.

6. **Commit Changes**: Commit your changes with a descriptive commit message:

    ```bash
    git commit -m "✨feat: description"
    git commit -m "🐛fix: description"
    git commit -m "✅test: descripition"
    git commit -m "♻️refactor: description"
    git commit -m "💄style: description"
    ```

    Reference: https://gitmoji.dev/

7. **Push Changes**: Push your changes to your fork of the repository on GitHub:

    ```bash
    git push origin feature/issue-number/description
    ```

8. **Create Pull Request**: Go to [Pomotama](https://github.com/teoh4770/Pomotama/pulls?q=sort:updated-desc+is:pr+is:open) on GitHub, and click the "New Pull Request" button. Fill out the necessary information and submit your pull request.

### <ins>Issues</ins>

#### Create a new issue

Before making a new issue, make sure there is no duplicate of the issue. If there is no existing issue for the problem
create one using the [issue form](https://github.com/teoh4770/Pomotama/issues/new).

**New Issue Checklist**:

-   [ ] Issue is not duplicated
-   [ ] Descripting Title
-   [ ] Description of the problem/feature
-   [ ] Steps to replicate problem (if applicable)
-   [ ] Assign correct labels

#### Work on an issue

For this project, in general, we don't assign issues to anyone. If you find an issue that you can work on, you can assign yourself to the issue. Make sure to link your development branch to the issue.

### <ins>Branching</ins>

As a general rule, always branch off from `main`. If you need a specific feature that is being worked on, you can branch off from that but make sure to note down which one has to be merged first in the PR.

#### Name a branch

Here is the convention we have for branch names:

-   `feature/issue-number/description`
-   `bugfix/issue-number/description`
-   `doc/issue-number/description`
-   `refactor/issue-number/description`
-   `release/version`

A very simple example: `feature/1/register-form`

### <ins>Pull Requests</ins>

Pull request checklist:

-   [ ] Does my PR have an appropriate title?
-   [ ] Is my PR up to date with `main` and there are no merge conflict?

## Contact

If you have any questions or need further assistance, feel free to reach out to CK at [Discord](https://discord.com/users/ck6226) or [Email](cheekianteoh0306@gmail.com).

Happy coding!
