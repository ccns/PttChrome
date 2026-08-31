# PttChrome-CCNS

[![build and deploy status](https://github.com/ccns/PttChrome/actions/workflows/deploy-ghpage.yml/badge.svg)](https://github.com/ccns/PttChrome/actions/workflows/deploy-ghpage.yml)

An HTML5-based Telnet-over-WebSocket client to connect to ANSI-terminal–based BBS sites.
This is the source of the web page hosted on [term.ccns.cc](https://term.ccns.cc/).

## How to Set up the Auto Build

To quickly grasp the idea of how to customize the behavior, see [.github/workflows/deploy-ghpage.yml](.github/workflows/deploy-ghpage.yml).

This workflow sets up the configuration before building PttChrome. The client built with this configuration connects to DreamBBS ([ccns.cc](https://term.ccns.cc)) by default and uses the icon set provided by CCNS.

Without such configuration, the built client will instead connect to Ptt ([ptt.cc](https://term.ptt.cc)) and use the icon set from the original PttChrome as the original version does.

## History

PttChrome-CCNS is forked from
[robertabcd/PttChrome](https://github.com/robertabcd/PttChrome), which was
derived from [iamchucky/PttChrome](https://github.com/iamchucky/PttChrome).

PttChrome-CCNS now also ports patches from [ptt/ptt-term](https://github.com/ptt/ptt-term/).

The original `PttChrome` was a pure Chrome extension.  `robertabcd` added
websocket and ported it to be a pure HTML5 website that does not depend on
Chrome anymore and that became the code running behind `term.ptt.cc` until 2026.

`ptt-term` is the official repo for the `term.ptt.cc` and will collect patches
from other active PttChrome forks, with its own patches.

## How to Contribute

If you want to fix something or add general features, please also consider the upstream:
+ [ptt/ptt-term](https://github.com/ptt/ptt-term)

## Version Information

A semver-like versioning scheme has been employed. See https://github.com/ccns/PttChrome/tags for the list of version tags.

### Major version

- v1: A web page requiring browser extension (Google Chrome–only)
    - Main repo: [iamchucky/PttChrome](https://github.com/iamchucky/PttChrome)
    - v1 is developed on two branches:
        - `gh-pages` (the web page part; the "webapp" branch)
            - The branch was abandoned in v2 but is reused by CCNS's fork
        - `master` (the browser extension part)
            - `master` now also includes a refactored version of `gh-pages`
    - `gh-pages` became independent of `master` after v0.0.5
- v2: A standalone web page (with cross-browser support)
    - Main repo: [ptt/ptt-term](https://github.com/ptt/ptt-term)
    - v2 is developed on the branch `dev`
        - `dev` was forked from [robertabcd/PttChrome](https://github.com/robertabcd/PttChrome)'s branch `dev`, but has been rebased to linearize the commit history
        - [robertabcd/PttChrome](https://github.com/robertabcd/PttChrome)'s branch `dev` was forked from their branch `gh-pages` in 2017

### Minor/Patch Version

#### v1

In v1, since version bumps was done rather regularly, the version tag is retrospectively assigned accordingly:
- `master`
    * All version-bumping commits are tagged.
- `gh-pages`
    * All version-bumping commits are tagged.
    * The latest commit made before a version-bumping commit on `master` is tagged with the bumped version number plus the "webapp" version.

#### v2

In v2, due to the lack of version bumps before, a way for determining the version number retrospectively is needed.

The following commits are tagged:
- A merge commit not immediately followed by a version-bumping commit
- A version-bumping commit
- The last commit before the development taking a break (one day if not sure)

The increased version field determined as follow:
- Minor: After the last tag, there are any ancestor commits containing `feat` in the title.
- Patch: After the last tag, there are any changes to the code and assets (`README.md` and GitHub workflows are excluded).
- Otherwise, the version number is not increased, and tagging is not needed.

### About This Branch

This branch `main-ccns.2021` was rebased onto `dev` in 2021 and is maintained by [CCNS](https://ccns.io).

Versions tagged on this branch have the `-ccns.2021` suffix.
