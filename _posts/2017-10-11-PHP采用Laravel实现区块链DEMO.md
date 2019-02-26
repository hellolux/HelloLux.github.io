---
layout: post
title:  "PHP采用Laravel实现区块链DEMO"
date:   2017-10-11 13:31:01 +0800
categories: 技术
tag: PHP
---

* content
{:toc}

### 前言
最近由于比特币的暴涨，导致背后的区块链技术被人给当作热点拿出来。我也不例外的对区块链技术进行了分析。至于比特币，我个人是没有过多的关注。这点见仁见智吧。

我参考了各种区块链技术的介绍以及科普，总觉得讲的有些云里雾里，并没有很好的全面的提及，以及也没有相关整合的代码demo等。于是我准备整合一下，可能会涉及很多原创。故所有参考后的原文尽量提在最后的参考文献中。

对区块链的技术还在摸索中，如果有什么不对的地方，敬请谅解。

### 区块链含义
>A **blockchain**,<sup>[[1]](https://en.wikipedia.org/wiki/Blockchain#cite_note-te20151031-1)</sup><sup>[[2]](https://en.wikipedia.org/wiki/Blockchain#cite_note-fortune20160515-2)</sup><sup>[[3]](https://en.wikipedia.org/wiki/Blockchain#cite_note-nyt20160521-3)</sup> originally **block chain**,<sup>[[4]](https://en.wikipedia.org/wiki/Blockchain#cite_note-primer-4)</sup><sup>[[5]](https://en.wikipedia.org/wiki/Blockchain#cite_note-obmh-5)</sup> is a continuously growing list of [records](https://en.wikipedia.org/wiki/Record_(computer_science) "Record (computer science)"), called *blocks*, which are linked and secured using [cryptography](https://en.wikipedia.org/wiki/Cryptography "Cryptography").<sup>[[1]](https://en.wikipedia.org/wiki/Blockchain#cite_note-te20151031-1)</sup><sup>[[6]](https://en.wikipedia.org/wiki/Blockchain#cite_note-cryptocurrencytech-6)</sup> Each block typically contains a [cryptographic hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function "Cryptographic hash function") of the previous block,<sup>[[6]](https://en.wikipedia.org/wiki/Blockchain#cite_note-cryptocurrencytech-6)</sup> a [timestamp](https://en.wikipedia.org/wiki/Trusted_timestamping "Trusted timestamping") and transaction data.<sup>[[7]](https://en.wikipedia.org/wiki/Blockchain#cite_note-IPblockchain-7)</sup> By design, a blockchain is inherently resistant to modification of the data. It is "an open, [distributed ledger](https://en.wikipedia.org/wiki/Distributed_ledger "Distributed ledger") that can record transactions between two parties efficiently and in a verifiable and permanent way".<sup>[[8]](https://en.wikipedia.org/wiki/Blockchain#cite_note-hbr201701-8)</sup> For use as a distributed ledger, a blockchain is typically managed by a [peer-to-peer](https://en.wikipedia.org/wiki/Peer-to-peer "Peer-to-peer") network collectively adhering to a protocol for validating new blocks. Once recorded, the data in any given block cannot be altered retroactively without the alteration of all subsequent blocks, which requires collusion of the network majority.
&emsp;&emsp;——[Wiki](https://en.wikipedia.org/wiki/Blockchain)

>&emsp;&emsp;狭义来讲，区块链是一种按照时间顺序将数据区块以顺序相连的方式组合成的一种链式数据结构， 并以密码学方式保证的不可篡改和不可伪造的分布式账本。
&emsp;&emsp;广义来讲，区块链技术是利用块链式数据结构来验证与存储数据、利用分布式节点共识算法来生成和更新数据、利用密码学的方式保证数据传输和访问的安全、利用由自动化脚本代码组成的智能合约来编程和操作数据的一种全新的分布式基础架构与计算范式。
&emsp;&emsp;——[百度百科](https://baike.baidu.com/item/%E5%8C%BA%E5%9D%97%E9%93%BE/13465666?fr=aladdin)


百度百科给出的含义定义是这样的，通过这个，我们知道了，区块链其实就是一种数据结构，和二叉树、图等一样。那么其实比特币就是基于这种数据结构搞出的一种虚拟货币罢了。

但是注意看，它提及了能够“存储数据、利用分布式节点共识...”，由此可以看出，它同时也是一个特殊的分布式数据库。

那么我们就知道了，区块链，是一种数据结构，也是一个特殊的分布式数据库。

### 中心化与去中心化

中心化（Centralization），与之对立的是去中心化（Decentralization）。为了简单的理解，我举一个例子。

比如大家一起做生意，总要有个账本，这个账本由账房先生管理。账房先生每次记录后，会将每次记录后数据公开给大家，这就是中心化。
![中心化](http://upload-images.jianshu.io/upload_images/6109899-639079ec66a9acc3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

那么什么是去中心化呢？很简单，就是账本不给账房先生管了，因为这个账房先生可能老是把账本丢了，或者说账本自己跑了等等借口，导致自己乱改账。于是每个人都有一个账本了，任何人改动了自己的账本都要告诉其他所有人，其他人也会在自己的账本记上一笔。但是怎么知道你是不是做假账呢？于是规定只要有人发现新的账目不对，可以拒绝接受。最后以大多数人一致的账目为准。

### 区块链去中心化

那么一个既是数据结构，又是一个特殊的分布式数据库有什么特别之处呢？这个特点就是所谓的**“去中心化”**。那么我们可以发现，去中心化是需要资源的，为什么呢？因为比如上面的例子，人人都记账了。但是有人天天记，有人偷懒不记，会产生不公平。于是大家决定每天早上掷骰子，根据点数决定谁来记当天的账，其他人核对一下，没问题就复制过来。并且，当天的记账者会获得一点点奖励（这就是挖矿）。

### 区块链算法

因为区块链的去中心化，所以是没有管理员，也不需要人工审核和干涉，它是彻底无中心的。那么怎么保证数据的安全呢？这时候就请出了共识算法和加密算法。

算法一听就头疼，那简单理解来概括下：

因为人人都会记账，所以肯定会碰到分歧，怎么保证谁记得是对的呢？**共识算法，少数服从多数。**

因为记当天的账会得到奖励，人人都想获得奖励，那么谁来记呢？**Hash碰撞，你能最快的计算出结果，就给你来记当天的账并得到奖励。**

如果两个人同时记当天的账，都是正确的，形成了分叉，怎么区别谁的帐是正统的呢？**看跟着后面账本长度，后面的长度越长，说明是正统的账本。**

如果不断的有人记账，我来不及同步账单怎么办？**动态难度，如果太容易出现账单，那么把难度增加，减缓记账速度。如果好久没出账单了，那么把难度下降，加快记账的速度。**

### 环境
Laravel 5.5
PHP 7.0.12（Cli）
Redis of Windows
Apache
Windows10 专业版 x64

### DEMO

道理讲了一大堆，那么现在我们来模拟一个demo看看，由于去中心化的机制，每个人既要成为服务器，也要成为客户端。所以对PHP来说，每一个人等于要装一个apache的环境成为服务器一样，同时还要有发送广播之类等机制来进行传播。所以这里的demo只是模仿出最基本的原理。具体来说的话，编程语言不是问题，主要是思想。

### DEMO—区块的结构

首先我们要定义一下区块的结构。
```php
/*
    一个区块的结构:
    block = {
        'index': 1,
        'timestamp': 1506057125.900785,
        'transactions': [
            {
                'sender': "8527147fe1f5426f9dd545de4b27ee00",
                'recipient': "a77f5cdfa2934df3954a5c7c7da5df1f",
                'amount': 5,
            }
        ],
        'proof': 324984774000,
        'previous_hash': "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
    }
*/
```

这里面每个区块包含属性：索引（index），Unix时间戳（timestamp），交易列表（transactions），工作量证明以及前一个区块的Hash值。每个新的区块都包含上一个区块的Hash，这是关键的一点，它保障了区块链不可变性。如果攻击者破坏了前面的某个区块，那么后面所有区块的Hash都会变得不正确。

### DEMO—区块类

我直接定义了一个区块类，用于对区块的操作等。同时我采用了Redis进行对一些变量进行存储。
```php
class Blockchain{      

    # 区块链
    public  $chain;
    # 交易
    public  $current_transactions;
    # 节点
    public  $node;

    public function __construct()
    {        
        $this->chain = json_decode( Redis::get('BlockChain'),true);        
        $this->node = json_decode(Redis::get('BlockNode'),true);
        $this->current_transactions = array();

        # 创建创世块
        if( count($this->last_block()) == 0 ){
            $this->new_block('1',100);
        }         
    }    
    
    # 获取区块链信息
    public function getChain()
    {
        return $this->chain;
    }

    # 获取交易信息
    public function getTran(Type $var = null)
    {
        return $this->current_transactions;
    }

    # 获取节点信息
    public function getNode(Type $var = null)
    {
        return $this->node;
    }

    /*
        将新节点添加到节点列表中
        :param address: <str> 节点的地址
        :return: None
    */
    public function register_node($address)
    {
        $this->node[] = $address;
        Redis::set('BlockNode',json_encode( $this->node ));
    }

    /*
        确定给定的区块链是否有效
        :param chain: <list> 区块链
        :return: <bool> 如果有效则为真，否则为假
    */
    public function valid_chain($chain)
    {
        $last_block = $chain[0];
        $current_index = 1;
        while($current_index < count($chain)){
            $block = $chain[$current_index];
            // print_r( $last_block );
            // print_r( $block );
            // print("\n-----------\n");
            # 检查块的散列是否正确
            if($block['previous_hash'] != $this->hash($last_block)){
                return false;
            }
            # 检查工作证明是否正确
            if( ! $this->valid_proof($last_block['proof'],$block['proof'])){
                return false;
            }
            $last_block = $block;
            $current_index ++;
        }
        return true;
    }

    /*
        共识算法解决冲突
        使用网络中最长的链.
        :return: <bool> True 如果链被取代, 否则为False
    */
    public function resolve_conflicts()
    {
        $neighbours = $this->node;
        # 去除重复的节点
        $neighbours = array_unique($neighbours);
        $new_chain = null;
        # 我们只是在寻找比我们更长的链条
        $max_length = count($this->chain);
        # 抓取并验证我们网络中所有节点的链
        foreach($neighbours as $node){
            $url = "http://".$node."/block/chain";
            $ch  = curl_init($url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);  //返回数据不直接输出
            $content = curl_exec($ch);                    //执行并存储结果
            curl_close($ch);
            if($content == null)
                continue;
            $content = json_decode($content,true);
            $length = $content['length'];
            $chain = $content['chain'];
            # 检查长度是否更长，链条是否有效
            if($length > $max_length && $this->valid_chain($chain)){
                $max_length = $length;
                $new_chain = $chain;
            }
        }
        # 如果我们发现一个比我们的更长的新的有效链条，就取代我们的链条
        if($new_chain != null){
            $this->chain = $new_chain;
            Redis::set('BlockChain',json_encode( $this->chain ));
            return true;
        }
        return false;
    }

    /*
        生成新块        
        :param previous_hash: (Optional) <str> 前面的块的哈希
        :param proof: <int> 证明工作算法给出的证明
        :return: <dict> 新的块
    */
    public function new_block($previous_hash,$proof)
    {
        $previous_hash = $previous_hash != "1" ? $this->hash($this->last_block()) : $previous_hash;

        # 创建一个新的块并将其添加到链中
        $tmpBlock = array(
            'index' => count(@$this->chain) + 1,
            'timestamp' => time(),
            'transactions' => @$this->current_transactions,
            'proof' => $proof,
            'previous_hash' => $previous_hash
        );

        $this->current_transactions = array();
        $this->chain[] = $tmpBlock;
        Redis::set('BlockChain',json_encode( $this->chain ));
        return $tmpBlock;
    }

    /*
        生成新交易信息，信息将加入到下一个待挖的区块中
        :param sender: <str> 发件人的地址
        :param recipient: <str> 收件人的地址
        :param amount: <int> 数量
        :return: <int> 将持有此交易的Block的索引
    */    
    public function new_transaction($sender,$recipient,$amount)
    {
        # 将新的交易添加到交易列表        
        $this->current_transactions[] = array(
            'sender' => $sender,
            'recipient' => $recipient,
            'amount' => $amount
        );
        return $this->last_block();
    }

    /*
        简单的工作量证明:
         - 查找一个 p' 使得 hash(pp') 以4个0开头
         - p 是上一个块的证明,  p' 是当前的证明
        :param last_proof: <int>
        :return: <int>
    */
    public function proof_of_work($last_proof)
    {
        $proof = 0;
        while(!$this->valid_proof($last_proof,$proof)){
            $proof ++;
        }
        return $proof;
    }

    /*
        验证证明: 是否hash(last_proof, proof)以4个0开头?
        :param last_proof: <int> 先前的证明
        :param proof: <int> 当前证明
        :return: <bool> 如果正确则为真，否则为假。
    */
    public function valid_proof($last_proof,$proof)
    {
        $guess = $last_proof . $proof;
        $guess_hash = bin2hex(hash('sha256', $guess, true));
        return preg_match('/^0000/is', $guess_hash ) ? true : false;
    }
    
    /*
        生成块的 SHA-256 hash值
        :param block: <dict> 区块
        :return: <str>
    */
    public function hash($block)
    {
        # Hash区块
        # 我们必须确保字典是有序的，否则我们将有不一致的哈希值
        $block_string = json_encode($block);
        return bin2hex(hash('sha256', $block_string, true));
    }

    # 返回链中的最后一个块
    public function last_block()
    {
        return @end($this->chain);
    }
}
```

### DEMO—Controller
```php
class BlockController extends Controller
{

    # index
    public function Index(Request $request)
    {
        # 获取最新的节点信息
        return view('block');
    }

    # 挖掘新区域块
    public function Mine(Request $request)
    {
        $BC = new Blockchain();
        $node_identifier = Uuid::uuid4(time())->toString();
        # 我们运行工作证明算法来获得下一个证明。
        $last_block = $BC->last_block();
        $last_proof = $last_block['proof'];
        $proof = $BC->proof_of_work($last_proof);
        # 给工作量证明的节点提供奖励.
        # 发送者为 "0" 表明是新挖出的币
        $BC->new_transaction("0",$node_identifier,1);
        # 通过将其添加到链中来锻造新块
        $block = $BC->new_block("0",$proof);
        $response = array(
            'message' => "新区块",
            'index' => $block['index'],
            'transactions' => $block['transactions'],
            'proof' => $block['proof'],
            'previous_hash' => $block['previous_hash']
        );
        $str = array(
            'message' => "新区块".$block['index'].":   ".$block['previous_hash']
        );
        # 添加节点记录
        $BC->register_node(explode('/',$request->url())[2]);
        echo json_encode($str);
    }

    # 新的交易记录
    public function TransactionsNew(Request $request)
    {
        $BC = new Blockchain();
        $sender = $request->post('sender');
        $recipient = $request->post('recipient');
        $amount = $request->post('amount');
        if($sender == null || $recipient == null || $amount == null){
            return false;
        }        
        # 创建一个新的交易记录
        $index = $BC->new_transaction($sender,$recipient,$amount);
        $response = array(
            'message' => "交易将被添加到块 " . $index
        );
        print_r($response);
    }

    # 显示整个区块链
    public function Chain()
    {
        $BC = new Blockchain();
        $response = array(
            'chain' => $BC->getChain(),
            'length' => count($BC->getChain())
        );
        echo json_encode($response);
    }

    # 注册节点
    public function NodesRegister(Request $request)
    {
        $BC = new Blockchain();
        $nodes = $request->post('nodes');
        if($nodes == null){
            return "错误：请提供一个有效的节点列表";
        }
        foreach($nodes as $node){
            $BC->register_node($node);
        }
        $response = array(
            'message' => '新的节点已被添加',
            'total_nodes' => $BC->getNode(),
        );
        print_r($response);
    }

    # 解决节点冲突
    public function NodesResolve()
    {
        $BC = new Blockchain();
        $replaced = $BC->resolve_conflicts();
        if($replaced){
            $response = array(
                'message' => '我们的链已被取代',
                'new_chain' => $BC->getChain()
            );
        }else{
            $response = array(
                'message' => '我们的链是权威的',
                'new_chain' => $BC->getChain()
            );
        }
        echo json_encode($response);
        // print_r($response);
    }
}
```

### DEMO—Route
```php
# 区块链
Route::get('/block','BlockController@Index');
Route::get('/block/mine','BlockController@Mine');
Route::post('/block/transactions/new','BlockController@TransactionsNew');
Route::get('/block/chain','BlockController@Chain');
Route::post('/block/nodes/register','BlockController@NodesRegister');
Route::get('/block/nodes/resolve','BlockController@NodesResolve');
```

### 相关参考
[百度百科](https://baike.baidu.com/item/%E5%8C%BA%E5%9D%97%E9%93%BE/13465666?fr=aladdin)

[区块链入门教程](http://www.ruanyifeng.com/blog/2017/12/blockchain-tutorial.html)

[互联网经常提起‘中心化’和‘去中心化’是什么 ？](https://www.douban.com/note/476273729/?type=like)

[九分钟了解区块链](https://mp.weixin.qq.com/s?__biz=MzAxMTI4MTkwNQ==&mid=2650824894&idx=1&sn=da104fe275ea3658ea90735fb2731942&chksm=80b7b420b7c03d36869676376968fb321cb6eff1386e9be6a344420dedf88c8c8c65fc27f7f4&mpshare=1&scene=2&srcid=0123KqViS1jj3WEnzetC673M&from=timeline#rd)

[区块链记账原理](https://learnblockchain.cn/2017/10/25/whatbc/)

[用Python从零开始创建区块链](https://learnblockchain.cn/2017/10/27/build_blockchain_by_python/)

