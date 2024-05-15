---
title: github_action_test
date: 2024-05-15 17:01:08
tags:
---

## use GitHub Action to automatically deploy Hexo blogs 
步骤 1: 准备您的 GitHub 仓库

确保您的 Hexo 博客源代码已经托管在 GitHub 上。您应该有两个分支：一个用于源代码（例如 main），一个用于部署（通常是 gh-pages）。

步骤 2: 配置 GitHub Actions

在您的 Hexo 项目根目录中，创建一个 .github/workflows 目录（如果不存在）。
在该目录下创建一个新的 YAML 文件，例如 hexo-deploy.yml。
在该文件中，编写 GitHub Actions 脚本来自动安装依赖、构建博客并部署到 GitHub Pages。以下是一个基本的配置示例：
```
name: Deploy Hexo Site

on:
  push:
    branches:
      - source  # 当推送到 source 分支时触发

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v2
      
    - name: Setup Node
      uses: actions/setup-node@v1
      with:
        node-version: '12'  # 指定 Node.js 的版本

    - name: Cache Node modules
      uses: actions/cache@v1
      with:
        path: node_modules
        key: ${{ runner.OS }}-node-${{ hashFiles('**/package-lock.json') }}
        restore-keys: |
          ${{ runner.OS }}-node-
          
    - name: Install Dependencies
      run: npm install
      
    - name: Generate
      run: hexo generate

    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./public  # 指定 Hexo 生成的文件夹
```
步骤 3: 配置密钥

无需手动配置，GitHub Actions 默认使用 secrets.GITHUB_TOKEN，这是自动生成的。

步骤 4: 推送更改并自动部署

每次您推送到 main 分支时，GitHub Actions 将自动运行这个脚本，构建并部署您的博客到 gh-pages 分支。

