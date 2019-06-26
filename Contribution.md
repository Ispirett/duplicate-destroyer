# Getting started

### Clone Repository

```
npm install
```

### To run project

```
npm start
```

### List branches and switch too branch

```
git branch

git branch -a

git checkout branch-name



```

### GIT GUIDELINES

#### Branching Model

- [GITFLOW](https://datasift.github.io/gitflow/IntroducingGitFlow.html)

#### Commit Messages

- Always in english
- **One line**, 100 chars max.
- Format: `type(context):description`

<p align="center"><span style="font-weight: 800">Example:</span></br>feat(accounts):add sign in</p>

##### Type

- **feat**: new feature
- **fix**: bugfixes
- **docs**: changes on documentation
- **style**: identation, styling
- **refactor**: code refactor
- **perf** performance improvements
- **test**: changes on test
- **chore**: build and tools

##### Context

Word that makes reference to place where commit makes changes

##### Description

- imperative verb (example. “change“)
- no space or tab at the begining
- no dot at the end
