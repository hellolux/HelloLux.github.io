---
layout: post
title:  "MacOS不用Homestead构建Larvel开发环境"
date:   2019-03-08 16:14:00 +0800
categories: 技术
tag: 教程
---

* content
{:toc}

# 前言

很早之前我写过一篇文章,是 macOS10.13.1 安装 Laravel Homestead ,利用的是Laravel Homestead来进行构建Laravel的开发环境.

好处和缺点其实就是参照虚拟机的优缺点吧.

所以我今天打算不采用Laravel Homestead来构建Laravel的开发环境了.

# 硬件环境

- MacBook Pro (13-inch, 2017, Four Thunderbolt 3 Ports)

# 软件环境

- MacOS 10.14.3

- PHP 7.1.23 (cli)

- Composer version 1.7.3  (貌似我的Composer没更新?)

# 条件

以上是我的电脑目前的环境,如果有不同的话,可以参考下百度具体的安装教程,还是挺多的,我记录的话,还是以我现有的条件下进行的记录为主吧.

今天我打开Laravel的文档,发现版本已经变为了5.8了.所以,要最新的Laravel的话,还是要看看他有哪些条件.

- PHP版本>=7.1.3    (已达成)
- OpenSSL PHP Extension (未知)
- PDO PHP Extension (未知)
- Mbstring PHP Extension    (未知)
- Tokenizer PHP Extension   (未知)
- XML PHP Extension (未知)
- Ctype PHP Extension   (未知)
- JSON PHP Extension    (未知)
- BCMath PHP Extension  (未知)

其实仔细看看的话,其实要求就是PHP的版本大于7.1.3,然后打开对应的PHP拓展就好了,待会儿我去一个个的检测看下.

# 流程

## 安装Laravel

```shell
composer global require laravel/installer
```

如果安装成功的话,会在 ~/.composer/vendor/bin 下,看到laravel.

## 创建一个Laravel项目

```shell
~/.composer/vendor/bin/laravel new Ecommerce
```

Ecommerce 可以更改成你想要创建的任意项目名,这里是因为我要做一个独立开发的电商项目,所以才取得这个名字.

经过一定的等待时间后,出现最后的 Application ready! Build something amazing. 就代表你的项目已经生成了.

# 启动Laravel

## 查看Apache

```shell
apachectl -v
```

我的版本为Apache/2.4.34 (Unix),如果没有安装的话,可以百度下.

## 配置Apache

```shell
# 进入apache的配置目录
cd /etc/apache2/
# 备份配置文件
sudo cp http.conf http.conf.back
# 编辑配置文件
sudo vi http.conf
```

更改以下地方

```conf
# 更改路径为laravel项目的路径DocumentRoot,比如我的:
DocumentRoot "/Users/hellolux/Documents/Github/E-commerce/public"
<Directory "/Users/hellolux/Documents/Github/E-commerce/public">
# 配置下面的权限
AllowOverride None

# 去掉前面的#,开启重写和PHP支持
LoadModule rewrite_module libexec/apache2/mod_rewrite.so
LoadModule php7_module libexec/apache2/libphp7.so

# 配置权限
<Directory />
    AllowOverride All
    Require all granted
</Directory>

```

## 配置Apache路径的权限

如果不对该路径上的文件夹依次授权,可能会产生无法读取到该目录的一个麻烦错误,所以,以我这个路径作为参考.

```shell
# 对Documents授权
sudo chmod 777 /Users/hellolux/Documents/
# 对Github文件夹授权
sudo chmod 777 /Users/hellolux/Documents/Github/
# 对E-commerce下所有文件授权
sudo chmod -R 777 /Users/hellolux/Documents/Github/E-commerce/
```

当然,权限为755也是可以的.

# 运行Laravel

在浏览器中执行localhost,OK~