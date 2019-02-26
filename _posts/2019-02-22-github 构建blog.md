---
layout: post
title:  "github 构建blog"
date:   2019-02-22 13:31:01 +0800
categories: 技术
tag: 教程
---

* content
{:toc}


#### 查找Blog模板

[jekyllthemes](http://jekyllthemes.org/)这里有很多的Blog模板，可以根据自己的喜好选择一款。

我这里选的是[Less Or More](http://jekyllthemes.org/themes/Less-Or-More/)这款。

点击Homepage进入对应的GitHub后，看对应的README对Blog进行配置修改。

#### 配置Blog

我这里均采用的是[Less Or More](http://jekyllthemes.org/themes/Less-Or-More/)这款主题为例子，进行配置操作。

首先，我在该GitHub的右上角给Fork下来。

等待一段时间后，该主题就已经Fork到我的名下了。选择Settings————Options————Repository name，这个地方更改为 需要显示的域名+.github.io 这种格式。例如我的是：HelloLux.github.io 然后Rename即可。

此时，需要根据对应主题的README进行配置了。

首先，先Clone到本地。

打开_config.yml，根据提示进行配置

```shell
name: 博客名称
email: 邮箱地址
author: 作者名
url: 个人网站
# baseurl修改为项目名，如果项目是'***.github.io'，则设置为空''
baseurl: "/LessOrMore"
resume_site: 个人简历网站
github: github地址
github_username: github用户名称
# 请到百度统计官网[https://tongji.baidu.com/](https://tongji.baidu.com/)申请自己的网站ID并在此处替换，否则将无法正常统计访问量
baidu_analysis: 94be4b0f9fc5d94cc0d0415ea6761ae9
# 请到revolvermaps [http://www.revolvermaps.com/?target=setupgl](http://www.revolvermaps.com/?target=setupgl)申请自己的网站ID并在此处替换，否则将无法正常统计访问量
revolvermaps: 5ytn1ssq6za
```

配置完上传后，刷新后，发现可以进行使用了。

#### 本地调试

当然，每次更新前肯定要进行本地化的调试测试。所以正好一起也配置一下本地的开发环境。

我的工作环境是MacBook Pro + MacOS 10.14.3，所以我此次介绍的就是Mac环境下的配置。

因为采用的Jekyll，Jekyll是基于Ruby的，所以Mac有自带的。

```bash
##这条命令来查看是否安装了Ruby
ruby -v

=> ruby 2.3.7p456 (2018-03-28 revision 63024) [universal.x86_64-darwin18]
```

**安装Gem**

Gem是Ruby第三方插件管理器
可以先检查是否安装有Gem
```bash
## 检查gem版本
gem -v
```
如果没有的话，[Gem安装官网](https://rubygems.org/pages/download)

接着，查看是否安装jekyll
```bash
jekyll -v
```

如果没有安装的话，执行下面的命令进行安装jekyll
```bash
sudo gem install jekyll
```

安装好后，cd到blog的根目录，执行命令后就可以在http://localhost:4000/中查看了。
```bash
jekyll server
```