# wanbah5

玩吧移动站点&amp;游戏模拟器。美好的记忆。

## 故事
* 第一阶段<br/>
从最开始的想法，我只是打算做一个玩吧移动站点前端Demo。那时候还没有前后端分离，这只是Demo，最终会合入Node.js的ejs文件里面。

* 第二阶段<br/>
随着公司业务的成长，想尝试做游戏模拟器，看是否能拉动用户黏性。我还记得做的第一款游戏模拟器是全民突击(wefire 简写wf)。这个时候还放到移动站点里面，APP把移动站点加载到webview的形式访问。发现这样的效果很好，又尝试的做了几款。

* 第三阶段<br/>
这个时候老板提出每次都要在线加载，如果图片多一点的模拟器，网速卡一点，体验上是非常糟糕的。所以就有了做成zip包，先上传服务器，再通过服务器下发给APP，下载到APP里面解压出来的方案。将移动站点全部下线， **这样只有APP里面才能查看。** 这个方案有这么几个难点：
  * 1、这个zip先上传到服务器，用户点击下载，从服务器拉取，下载进度显示百分比，再到下载成功解压到对应目录。整个通道的打通。
  * 2、zip解压出来的目录和形式，其实要分别适配iOS和Android还是不一样的，所以我用了gulp来实现分别打包。
  * 3、iOS的客户端主程始终要在顶部加导航，拥有返回按钮以及标题，而Android把整个界面全部交由webview。这个设计其实我觉得跟现在的微信小程序是一样的，微信小程序左上角的返回按钮也是APP天然加的。

* 第四阶段<br/>
野蛮生长，差不多每两周就会出一款APP，这个时候就开始拉了一个写Android的同事过来帮忙。再到后面老板依然觉得很慢，就想着外包出去来做，反正模式已经被证明可行，只要不断的码代码就好了。为此跟老板大吵一架，因为速度是质量永远的敌人。事实证明老板从最开始的热爱游戏，到热爱资本运作，最后玩砸了，原因就不说了。当我还在担心这个项目是不是横向太大了，我该拆分一下了。事实想多了，还没等我拆，老板就套现了。

## 前言
这个项目里面没有游戏素材（只有基础icon），所以你打开看，肯定是有问题，因为每款游戏模拟器的素材都很大，我觉得这是公司的素材不好开源出来，虽然都是到处抓来的。

这个项目有很大风险因素就是，上流游戏公司决定要自己做这个攻略了，那么你一点胜算也没有了，素材、数据、官方天然打的你趴下。

## 目录（字典排序）
* boombeach 海岛奇兵
* cf 穿越火线
* coc 部落冲突
* daota 刀塔传奇
* guaiwulieren 怪物猎人 [荐]
* huangshizhanzheng 皇室战争
* huoyingrenzhe 火影忍者
* jinglingbaokemenggo 精灵宝可梦go
* luobo3 保卫萝卜3
* lushichuanshuo 炉石传说 [荐]
* mhxy 梦幻西游
* mt2 我叫MT2
* myword 我的世界
* qiuqiudazuozhan 球球大作战
* qjnn 奇迹暖暖 [荐]
* quanhuang98 拳皇98
* quanminchaoshen 全民超神 [荐]
* shouwangxianfeng 守望先锋
* vainglory 虚荣 [荐]
* wangzherongyao 王者荣耀 [荐]
* wf 全民突击
* yinyangshi 阴阳师
* zhilongmicheng 智龙迷城
* zhiwudazhanjiangshi2 植物大战僵尸2

## 效果
* 玩吧移动站点<br/>
![mobile_1](https://github.com/huangyunbo/wanbah5/raw/master/github/mobile_1.png)

* qjnn 奇迹暖暖<br/>
![qjnn_1](https://github.com/huangyunbo/wanbah5/raw/master/github/qjnn_1.png)
![qjnn_2](https://github.com/huangyunbo/wanbah5/raw/master/github/qjnn_2.png)
![qjnn_3](https://github.com/huangyunbo/wanbah5/raw/master/github/qjnn_3.png)
![qjnn_4](https://github.com/huangyunbo/wanbah5/raw/master/github/qjnn_4.png)
![qjnn_5](https://github.com/huangyunbo/wanbah5/raw/master/github/qjnn_5.png)
![qjnn_6](https://github.com/huangyunbo/wanbah5/raw/master/github/qjnn_6.png)

* 全民超神<br/>
![quanminchaoshen_1](https://github.com/huangyunbo/wanbah5/raw/master/github/quanminchaoshen_1.png)
![quanminchaoshen_2](https://github.com/huangyunbo/wanbah5/raw/master/github/quanminchaoshen_2.png)
![quanminchaoshen_3](https://github.com/huangyunbo/wanbah5/raw/master/github/quanminchaoshen_3.png)

# 感谢
特别感谢提供数据的baike同学，以及帮助过这个项目一干人等，就不一一言谢了。都是我们的美好回忆。

