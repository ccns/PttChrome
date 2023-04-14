# PttChrome-CCNS

## Branch Deprecation Note

This branch (`dev-update`) has been deprecated in favor of branch [`main-ccns.2021`](https://github.com/ccns/PttChrome/tree/main-ccns.2021).

Future developments will be done on the branch [`main-ccns.2021`](https://github.com/ccns/PttChrome/tree/main-ccns.2021) instead.

## Introduction

[![build and deploy status](https://github.com/ccns/PttChrome/actions/workflows/deploy-ghpage.yml/badge.svg)](https://github.com/ccns/PttChrome/actions/workflows/deploy-ghpage.yml)

A Telnet-over-WebSocket client, forked from [robertabcd/PttChrome](https://github.com/robertabcd/PttChrome).

To quickly grasp the idea of how to customize the behavior, see [.github/workflows/deploy-ghpage.yml](.github/workflows/deploy-ghpage.yml).

This workflow sets up the configuration before building PttChrome. The client built with this configuration connects to DreamBBS ([ccns.cc](https://term.ccns.cc)) by default and uses the icon set provided by CCNS.

Without such configuration, the built client will instead connect to Ptt ([ptt.cc](https://term.ptt.cc)) and use the icon set from the original PttChrome as the original version does.

## How to Contribute

If you want to fix something or add general features, please also consider the upstreams:
+ Websocket support: [robertabcd/PttChrome](https://github.com/robertabcd/PttChrome)
+ User interface: [iamchucky/PttChrome](https://github.com/iamchucky/PttChrome)
