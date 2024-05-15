---
title: github_action_test
date: 2024-05-15 17:01:08
tags:
---

## use GitHub Action to automatically deploy Hexo blogs 
���� 1: ׼������ GitHub �ֿ�

ȷ������ Hexo ����Դ�����Ѿ��й��� GitHub �ϡ���Ӧ����������֧��һ������Դ���루���� main����һ�����ڲ���ͨ���� gh-pages����

���� 2: ���� GitHub Actions

������ Hexo ��Ŀ��Ŀ¼�У�����һ�� .github/workflows Ŀ¼����������ڣ���
�ڸ�Ŀ¼�´���һ���µ� YAML �ļ������� hexo-deploy.yml��
�ڸ��ļ��У���д GitHub Actions �ű����Զ���װ�������������Ͳ����� GitHub Pages��������һ������������ʾ����
```
name: Deploy Hexo Site

on:
  push:
    branches:
      - source  # �����͵� source ��֧ʱ����

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v2
      
    - name: Setup Node
      uses: actions/setup-node@v1
      with:
        node-version: '12'  # ָ�� Node.js �İ汾

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
        publish_dir: ./public  # ָ�� Hexo ���ɵ��ļ���
```
���� 3: ������Կ

�����ֶ����ã�GitHub Actions Ĭ��ʹ�� secrets.GITHUB_TOKEN�������Զ����ɵġ�

���� 4: ���͸��Ĳ��Զ�����

ÿ�������͵� main ��֧ʱ��GitHub Actions ���Զ���������ű����������������Ĳ��͵� gh-pages ��֧��

