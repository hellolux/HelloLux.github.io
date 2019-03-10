---
layout: post
title:  "Mac搭建本地Gitlab"
date:   2019-03-10 14:23:00 +0800
categories: 技术
tag: 教程
---

* content
{:toc}

# 前言

昨天的文章阐述了我个人对于本地代码保存的方案,所以今天来研究下,如何在本地搭建Gitlab来对所有的代码库进行管理.

# 安装Docker

[Docker](https://link.jianshu.com/?t=https://www.docker.com/products/docker-toolbox)

因为我的是Mac系统,所以需要借助docker来进行安装.

众所周知,Mac安装软件还是很快的.

然后打开Docker后,进入Kitematic.如果没有安装的话,Docker会提示你进行安装.

安装好Kitematic后,搜索Gitlab,选择具体的镜像,据说是有相应的中文版,gitlab-ce-cn.我下载的是gitlab-ce英文官方版本,中文版好像是一些team翻译的,具体我也没有去仔细看过,有兴趣的小伙伴可以去试试看.

安装还是需要一些时间的.毕竟有墙.

# 进入Gitlab

安装完后,在Kitematic中,有一个Settings -> Hostname/Ports ,可以看到80端口的具体URL,一般是localhost:32769,直接在浏览器中打开即可.

刚打开要求输入初始密码,一般强度的话,我认为是大写+小写+数字+特殊符号这样.

初始密码修改好后,即可登录,用户名为root.