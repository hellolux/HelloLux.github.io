---
layout: post
title:  "Laravel的Validator"
date:   2019-03-07 15:42:00 +0800
categories: 技术
tag: 教程
---

* content
{:toc}

# 概述

Validator是Laravel中的一个表单验证，采用自带的表单验证可以有效的提高开发效率。

# 范例

```php
$validator = Validator::make($request->all(), [
    'username' => 'required|max:8|string',
    'password' => 'required'
]);
```

# 规则

- accepted  字段值为yes/on/1时会通过
- active_url   通过checkdnsrr来验证是否为一个有效的网址
- after:date    通过strtotime来验证是否在指定日期之后
- alpha 仅为全字母时通过验证
- alpha_dash    仅允许字母、数字、-、_ 通过验证
- alpha_num 仅允许字母、数字通过验证
- array 仅为数组
- before:date    通过strtotime来验证是否在指定日期之前
- between:min,max   验证介于min和max之间
- confirmed 验证与对应字段的*_confirmation一致，如password必须和password_confirmation一致
- date  通过strtotime来验证是否合法
- date_format:format    通过date_parse_from_format来验证format制定格式的日期是否合法
- different:field   字段需要与指定的字段field值不同
- digits:value  需要长度为value的数字
- digits_between:min,max    需要介于min和max之间的数字
- boolean   字段必须可以转换为bool值，如：true, false, 1, 0, "1", "0"
- email 需要符合email格式
- exists:table,column   与存在于数据库中table的column字段值其一相同
- image 必须为图片，jpeg, png, bmp, gif 或 svg
- in:foo,bar,...    需要符合事先给予的清单中的其中一个值
- integer   需要整数
- ip    需要符合IP格式
- max:value 小于value
- mimes:foo,bar,... 文件MIME类需要在给定清单中的列表中才能通过验证
- min:value 需大于等于value
- not_in:foo,bar,...    不属于给定清单中的其一
- numeric   需要数字
- regex:pattern 符合给定正则
- required  必填
- required_if:field,value   在 field 字段值为 value 时为必填
- required_with:foo,bar,... 仅在 任一指定字段有值情况下为必填
- required_with_all:foo,bar,... 仅在 所有指定字段皆有值情况下为必填
- required_without:foo,bar,...  仅在 任一指定字段没有值情况下为必填
- required_without_all:foo,bar,...  仅在 所有指定字段皆没有值情况下为必填
- same:field    需与指定字段 field 等值
- size:value    需符合给定 value 值
- timezone  timezone_identifiers_list 函数来验证是否为有效的时区
- unique:table,column,except,idColumn   在给定的数据库中需为唯一值
- url   filter_var 方法验证是否符合 URL 的格式