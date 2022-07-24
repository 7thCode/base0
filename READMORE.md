## 0. logを消す。
```bash
$ find /var/log/ -type f -name \* -exec cp -f /dev/null {} \;
```

## 0. 再起動。

```bash
$ pm2 restart base0
$ sudo service mongodb restart
``` 

## コレクションのコンパクション
```bash
$ mongo
```
```js
use mydb
db.runCommand( { compact : 'mycollectionname' } )


```
use base0
db.runCommand( { compact : 'fs.chunks' } )

## 1.sudoでパスが通らない場合

```bash
    sudo nano /etc/sudoers
```

    Defaults    env_reset

    を

    Defaults    env_keep += "PATH"

    コメントアウト
    #Defaults    secure_path = /sbin:/bin:/usr/sbin:/usr/bin

## 2.Build-essential
### まずは基本的な物をインストール
```bash
$ sudo apt-get update
$ sudo apt-get install build-essential
$ sudo apt-get install python
```

## 3.タイムゾーン
```bash
$ timedatectl set-timezone Asia/Tokyo
```

## USER追加
```bash
$ adduser USER
```
### USERをGROUPに追加
```bash
$ gpasswd -a USER GROUP
```
### GROUPを追加
```bash
$ groupadd GROUP
```
### GROUPを確認
```bash
$ groups USER
```
### sudoer
```bash
$ adduser USER
$ gpasswd -a USER sudo
```
## 依存する物...
    node.js - プラットフォーム
    mongodb - メインストレージ
## Node.jsインストール
### Ubuntu/Mac
    まず、nodebrewをインストール
```bash
$ curl -L git.io/nodebrew | perl - setup
$ export PATH=$HOME/.nodebrew/current/bin:$PATH
```
    nodeをインストール
```bash
$ nodebrew install-binary v6.X.0
$ nodebrew use v6.X.0
```

## mongodbインストール
### Ubuntu
```bash
$ sudo apt install mongodb
$ sudo apt install mongo-tools
```    
### Mac(Homebrew)
```bash
$ brew install mongodb-community
$ brew install mongo-tools
```    
### Windows

    see http://qiita.com/moto_pipedo/items/c3bb40370ba2792143ad

### 設定

#### 外部からの操作禁止

### Ubuntu
```bash
$ sudo nano /etc/mongod.conf
```    
    で

    bindIp: 127.0.0.1

    を

    bindIp: 0.0.0.0

```bash
$ sudo service mongod restart
```   

### Mac

```bash
$ sudo nano/usr/local/etc/mongod.conf
``` 
```bash
$ brew services stop mongodb-community
$ brew services start mongodb-community
```   


#### セキュリティON
```bash 
$ sudo nano /etc/mongod.conf
```  
    追記

    auth = true

```bash
$ sudo service mongod restart
``` 
#### 起動スクリプト

    /etc/init.d/mongodb

#### 起動コマンド
```bash
$ sudo service mongodb stop
$ sudo service mongodb start
$ sudo service mongodb restart
```
#### 初期化

##### DB全体の認証
```bash
$ mongo
```
```js
use admin
db.createUser({user: "admin",pwd: "zz0101",roles:[{role: "userAdminAnyDatabase",db: "admin"}]})
```


##### 個々のDBの認証(auth-dbはtarget-db自体)
```bash
$ mongo
```
```js	
use base0
db.createUser({user:"base0master", pwd:"33550336", roles:[ "readWrite", "dbOwner" ]})
```

,

##### Index
```bash
$ mongo
```
```js	
db.fs.files.createIndex({ "filename" : 1, "uploadDate" : 1 })
```

#### ログ
##### Ubuntu
```bash
$ cd /var/log/mongodb
$ rm mongo.log.2016*
```
##### Mac
```bash
$ cd /usr/local/var/log/mongodb
$ rm mongo.log.2016*
```

#### Backup

##### full backup

3.0 以前
```bash
$ sudo service mongodb stop
$ sudo mongodump --dbpath /var/lib/mongo
```

3.0以降
```bash
$ sudo mongodump --authenticationDatabase admin -u oda -p zz0101
```

##### full restore
3.0 以前
```bash
$ sudo service mongodb stop
$ sudo mongorestore --dbpath /var/lib/mongo dump

sudo mongorestore --drop -d base0 shots.bson -u base0master -p 33550336
```

3.0以降
フルリストアは不明。

##### buckup
3.0以降
```bash
$ mongodump --authenticationDatabase **AUTH-DBNAME** -u **DBUSER** -p **DBPASS** -d **TARGET-DBNAME** -o "**OUTPUT-PATH**"
```
##### restore

3.0以降
```js
use **TARGET-DBNAME**
db.createUser({user:"**DBUSER**", pwd:"**DBPASS**", roles:[ "readWrite", "dbOwner" ]})
```
で対象ユーザ作成後,
```bash
$ mongorestore --authenticationDatabase **AUTH-DBNAME** -u **DBUSER** -p **DBPASS** -d **TARGET-DBNAME** "**OUTPUT-PATH**"
```

#### Tips
##### コンパクション

```js
db.getCollectionNames().forEach(function (collectionName) {
print('Compacting: ' + collectionName);
db.runCommand({ compact: collectionName });
});
```

```bash
$ mongodump -d DATABASE_NAME
$ echo 'db.dropDatabase()' | mongo DATABASE_NAME
$ mongorestore dump
```

##### クエリーロギング

スタート
```js
db.setProfilingLevel(1,20)
```
ストップ
```js
db.setProfilingLevel(0)
```

##### mongodbたまに実行
```bash
$ mongo
```
```js
use admin
db.runCommand( { logRotate : 1 } )
```

##### localでmongoをcsvで落とす方法（例）
```bash
$ mongoexport --host=127.0.0.1  --db test2 --collection businesscards --out businesscard.csv  --type=csv --fields=Template,UpdateDate
```
##### メモリー使用量
    /proc/**PID**/statusのVmRSS

## pm2インストール

see http://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/
```bash
    $ sudo npm install pm2 -g
    $ sudo pm2 startup ubuntu
```
### Use
```bash
    $ sudo pm2 start start.json --env production
    $ sudo pm2 save
```
### Test
```bash
$ sudo reboot
      .
      .
      .
$ sudo pm2 list
```
### メモリー（GC)
```bash
$ sudo pm2 start app.js --node-args="--optimize_for_size --max_old_space_size=920 --gc_interval=100"
```
### Cluster

cluster.json(例)
```json
        {
          "apps" : [
          {
            "name"        : "app",
            "script"      : "app.js",
            "instances"  : 2,
            "exec_mode"  : "cluster_mode",
            "args"        : [],
            "node_args"   : "--optimize_for_size --max_old_space_size=720 --gc_interval=100",
            "env": {
              "NODE_ENV": "development"
            },
            "env_production" : {
              "NODE_ENV": "production"
            }
          }
          ]
        }
```

```bash
$ sudo pm2 start cluster.json --env production
```

### Angular + Express

```bash
$ ng new [PROJECT]
$ express [SERVER]
```

    “package.json”以外を[PROJECT]ディレクトリにコピー
    [SERVER]ディレクトリの”package.json”の[dependencies]の内容を[PROJECT]ディレクトリの”package.json”の[dependencies]に追加
    [SERVER]ディレクトリの”package.json”の[scripts]の[start]を[PROJECT]ディレクトリの”package.json”の[scripts]の[start]に上書き

    中身を詰めて確認

```bash
$ npm install
$ npm start
```

    localhost:3000を確認、expressが起動していたらOK
    “Angular.json”ファイルの[projects->[PROJECT]->architect->build->options->outputPath]を”public”に書き換えビルド

```bash
$ ng build
```

### i18n
```bash
$ npx ng xi18n --i18n-format xlf --out-file translation.ja.xlf
```




# linuxエトセトラ

## ディレクトリ
##### 中身ごと削除
```bash
$ rm -R DIRECTORY
```    
## プロセス
##### 確認
```bash
$ ps -elf
```    
## シンボリックリンク(ショートカットっぽいの)
##### 作成
```bash
$ ln -s
```
##ドメイン(Nginx)

#### 最新版インストール

/etc/apt/sources.listに追記
```bash
$ deb http://nginx.org/packages/ubuntu/ trusty nginx
```  

「trusty」てのはでDebian系のバージョン表記なんだって。
なので、適宜変えてね。
```bash
$ apt-get update
$ sudo service nginx stop
$ sudo apt-get remove nginx-common
$ sudo apt-get install nginx
$ sudo service nginx start
``` 
##### ディレクトリ
```bash
$ cd /etc/nginx
``` 
##### 存在すべきサイトとして登録
```bash
$ cd sites-aveilable
$ cp default xxx.vvv.jp.conf
``` 
##### 編集
```bash
$ sudo nano xxx.vvv.jp.conf
```
```
      server {
              client_max_body_size 50M;
              listen        80;
              server_name   ドメイン(xxx.netなど);
              #return 301   https://$host$request_uri;
              #access_log   logs/host.access.log  main

              location / {
                        proxy_buffering off;
                        proxy_pass アドレス(http://128.199.232.217:20000など)
                        proxy_http_version 1.1;
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_set_header Connection "upgrade";
                        proxy_redirect http:// https://;
                        }
              }
```
Let's EncryptでHTTPSならば
```
      server {
              client_max_body_size 50M;
              listen 443 ssl;

              (nginxが1.9.6以上ならば)

              listen 443 ssl http2;

              server_name ドメイン(xxx.netなど);
              ssl_certificate      /etc/letsencrypt/live/[ファイル名確認]/fullchain.pe$
              ssl_certificate_key  /etc/letsencrypt/live/[ファイル名確認]/privkey.pem;

              #access_log  logs/host.access.log  main;

              location / {
                  proxy_buffering off;
                  proxy_pass http://localhost:30000;
                  proxy_http_version 1.1;
                  proxy_set_header Upgrade $http_upgrade;
                  proxy_set_header Connection "upgrade";
              }
      }
```
```bash
      cd ../sites-enabled
      ln -s ../sites-aveilable/xxxxx .
```       
#### 開始/終了/再起動
終了
```bash
$ sudo service nginx stop
``` 

開始
```bash
$ sudo service nginx start
``` 

再起動
```bash
$ sudo service nginx configtest
``` 
#### MacOS(Homebrew)
    /usr/local/etc/nginx/nginx.conf

終了
```bash
$ nginx -s stop
``` 
再起動
```bash
$ nginx -s reload
``` 
localhost:8080/,,,,,,

#### Zip
```bash
$ zip -r dump.zip dump
```     
#### SCP
```bash
$ scp dump.zip XXX.XXX.XXX.XXX:/path/to/dist
``` 
#### sudo
    pathを引き継ぐ。(digital ocean, etc..)

    Defaults    env_reset
    #Defaults   secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
    Defaults    env_keep += "PATH"
#### mail
```bash
$ sudo saslpasswd2 -u seventh-code.com -c oda
```
## Mecab ユーザ辞書
##### mac(homebrew)
```bash
$ /usr/local/Cellar/mecab/0.996/libexec/mecab/mecab-dict-index  -d /usr/local/lib/mecab/dic/ipadic -u /usr/local/lib/mecab/dic/userdic/music.dic -f utf-8 -t utf-8 mecab_music_dic.csv
$ /usr/local/etc/mecabrc
```
##### ubuntu(apt-get)
```bash
$ /usr/lib/mecab/mecab-dict-index                               -d /usr/share/mecab/dic/ipadic     -u /var/lib/mecab/dic/music.dic               -f utf-8 -t utf-8 mecab_music_dic.csv
$ sudo nano /etc/mecabrc
```
#### GMail
    セキュリティ

    https://myaccount.google.com/u/1/security

    安全性の低いアプリの許可: 有効とする
#### Let's Encrypt（HTTPSの認証)
ここ見ろ

https://letsencrypt.jp/usage/

まず、certbotをインストール
```bash
$ apt install certbot
```
実行（OK)
```bash
$ sudo service nginx stop
$ certbot certonly --no-self-upgrade -n --standalone  --agree-tos --email oda.mikio@gmail.com -d www.aaa.com
$ sudo service nginx start
```
-nginxってのが使えるプラグイン。使うと楽？
```bash
$ sudo apt install python3-certbot-nginx
```
#### 複数
```bash
$ sudo certbot certonly --nginx -d DOMAIN.co.jp -d www.DOMAIN.co.jp
```
#### 更新
```bash
$ cd ~
$ cd certbot
$ sudo service nginx stop
$ sudo ./certbot-auto renew -q --no-self-upgrade
$ sudo service nginx start
```
```bash
$ sudo apt install certbot
$ sudo apt-get install python-certbot-nginx
$ sudo certbot renew
```
#### 自動更新（週間)
```bash
$ sudo crontab -e
```
```
@weekly /usr/bin/certbot renew >> /var/log/letsencrypt-renew.log
```

証明書の取得時に使用したオプションは

    /etc/letsencrypt/renewal/${DOMAIN}.conf

## openssl

    作るもの

    秘密鍵
    公開鍵
    証明書

#### 秘密鍵
```bash
$ openssl genrsa -aes128 1024 > server.key
```
#### 公開鍵
```bash
$ openssl req -new -key server.key > server.csr
```
#### 証明書
```bash
$ openssl x509 -in server.csr -days 365 -req -signkey server.key > server.crt
```
#### npmのパーミッション
    ”sudo npm install xxx"だとうまくいかない場合は、npmのパーミッション変えて"npm install xxx"。

    https://docs.npmjs.com/getting-started/fixing-npm-permissions
###### ホームディレクトリにnpmディレクトリ作る。
```bash
$ mkdir ~/.npm-global
```
###### npmの設定
```bash
$ npm config set prefix '~/.npm-global'
```
###### パス追加（~/.profile）
```bash
$ export PATH=~/.npm-global/bin:$PATH
$ source ~/.profile
```
#### 監査
###### npmモジュール監査
```bash
$ npm audit
```
#### npmモジュールバージョン
##### npmモジュールバージョン
```bash
$ npm install -g npm-check-updates
 ```
#####  確認
```bash
$ ncu
 ```
#####  更新
```bash
$ ncu -u
 ```
##### メジャーバージョン固定
```bash
$ ncu --semverLevel major
 ```
###　ジャーナル
```bash
$ sudo journalctl --vacuum-size=100M
 ```

## サーバ基本設定

### FireWall基本　ufw

有効化
```bash
$ sudo ufw enable
 ```
まずは全て禁止
```bash
$ sudo ufw default DENY
 ```
SSH許可
```bash
$ sudo ufw allow 22
 ```
SSH連続ログイン禁止
```bash
$ sudo ufw limit 22
 ```
確認
```bash
$ sudo ufw status verbose
 ```
NGINX
```bash
$ sudo ufw allow 'Nginx Full'
 ```

### ブルートフォース攻撃対策　Fail2ban

ブルートフォース攻撃対策
```bash
$ sudo apt install fail2ban
$ sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
$ sudo nano /etc/fail2ban/jail.d/ssh_iptables.conf
```
ssh_iptables.confの中身
```
    [sshd_iptables]
    enabled  = true
    filter   = sshd
    action   = iptables[name=SSH, port=22, protocol=tcp]
    port     = 22
    logpath  = /var/log/auth.log
    maxretry = 5
    findtime = 60m
    bantime  = 60m
```
起動
```bash
$ sudo /etc/init.d/fail2ban restart
```
確認
```bash
$ sudo fail2ban-client status
```
ssh確認
```bash
$ sudo fail2ban-client status sshd_iptables
```

ssh確認
```bash
$ sudo fail2ban-client set unbani　
```


ファイアウォール確認
```bash
$ sudo iptables -L -n
```

### SSH
```bash
$ ssh-keygen -t rsa
 ```
Mac
```bash
$ ssh-add -K ~/.ssh/id_rsa
$ ssh-copy-id user@domain.com
 ```
確認
```bash
$ ssh user@domain.com
 ```
パスフレーズ再設定
```bash
$ ssh-keygen -f ~/.ssh/id_rsa -p
 ```

## Angular + Node.js

Angularプロジェクト作成
```bash
$ ng new [A]
```
とりあえずサーバーの雛形を生成。
```bash
$ express [E]
```

以下でpackage.jsonを統合する。
[E]ディレクトリの“package.json”以外を[A]ディレクトリにコピー
[E]ディレクトリの”package.json”の[dependencies]の内容を[A]ディレクトリの”package.json”の[dependencies]に追加
[E]ディレクトリの”package.json”の[scripts]の[start]を[A]ディレクトリの”package.json”の[scripts]の[start]に上書き

```bash
$ npm install
$ npm start
```

localhost:3000を確認、expressが起動していたら一旦OK

“angular.json”ファイルの[projects->example-angular-material->architect->build->options->outputPath]を”public”に書き換え
```bash
$ ng build
```

# 独り言
### iOSのBase64 Tips
      NSData通るとなぜか"+"が" "になってるんです。
      逆変換するべし。。。？？？
      なんかあるんやろな。。
      こんなかんじ。

      let data1 = data0.replace( / /g , "+" );
#### "a || b"パターンの使用は控えよう。
    完全にJavaScriptに閉じたイディオムの上、あんま意味もないので、教育上よくない。。。
    平たく書けば

        let result = HOGE || PIYO;

    は

        let result = HOGE;
        if (!HOGE) {
            result = PIYO;
        }

    なんら条件分岐が減るわけでもなく、単純にタイピング量wが減るだけ。。
    "a"がfalsyなら"b"って...
    たくさーん連結すればなんかいいこともあるかな？
    最後のtrueまで評価なんだろうな。。知らんけど。
    なんかなあ。。。

    ソースのサイズは複雑さに非らず。
    キーボード打つのがそんな嫌いなら、この商売向いてないよ？
#### "!!"パターンの使用もあかん。
    これも完全に形無し言語に閉じたイディオムの上、あんま意味もないので、教育上よくない。。。
    ちゃんと"Boolean()"しよう。それだけ。
#### パターン・イディオムは無理やり使わない
    適応できない部分はあっさり諦めよう。
    パターンを変化させればもはやそれはパターンではない。
#### みんな大好きPromise, async/await
    Promiseとそのシンタックスシュガーのasync/await。
    Promiseはシステムリソースであるsemaphoreを使用してるはず。(SpinLockならばなにおかいわんや...)
    リソース効率から、必須な場合をのぞいて単純な制御構造であるコールバックを使用すべき、と思うが。。
	実装はどうなんかな。。
# いつか使う
### WebDriver
##### インストール(Mac Homebrew)
```bash
$ brew install selenium-server-standalone
$ brew install chromedriver
```
### 起動(Mac Homebrew)
```bash
$ java -Dwebdriver.chrome.driver=/usr/local/bin/chromedriver -jar /usr/local/Cellar/selenium-server-standalone/3.6.0/libexec/selenium-server-standalone-3.6.0.jar
```

GraphQL

        あんまり好きくない感じ。。。
        サーバ・クライアント間で型安全。


ECMAScript パーサー

        http://esprima.org/

ジェネレータ

        https://github.com/estools/escodegen

Parser API

        https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API#Expressions


chromeサービスワーカー

        止める

        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            // 登録されているworkerを全て削除する
            for(let registration of registrations) {
                registration.unregister();
            }
        });
        caches.keys().then(function(keys) {
            var promises = [];
            // キャッシュストレージを全て削除する
            keys.forEach(function(cacheName) {
                if (cacheName) {
                    promises.push(caches.delete(cacheName));
                }
            });
        });

Google Map API Key

        https://developers.google.com/maps/web/

# Docker
##### コンテナインストール・起動
```bash
$ docker run -d -p 80:80 --name webserver nginx
```
##### コンテナ表示
```bash
$ docker container ls
```
##### コンテナ起動
```bash
$ docker container start webserver
```
##### コンテナ終了
```bash
$ docker container stop webserver
```
##### コンテナ削除
```bash
$ docker container rm webserver
```
##### イメージ削除
```bash
$ docker image rm nginx
```
##### ログイン
```bash
$ docker container exec -ti webserver bash
```
##### ファイル共有して起動
```bash
$ docker run -d -p 80:80 -v /host/path:/container/path --name webserver nginx
```
##### Ex
```bash
$ docker run -d -p 80:80 -v /Users/oda/Desktop/moon:/usr/share/nginx/html --name webserver nginx
$ docker container exec -ti webserver bash
.
.
.
$ docker container stop webserver
$ docker image rm nginx
```
# Angular + Capacitor + Express
## Express
```
まずexpress。(req express-generator)
```
```bash
$ express **PROJECT-T**
```
## Angular
```
別ディレクトリにAngularをインストール。(req anguler-cli)
```
```bash
$ ng new **PROJECT**
$ cd **PROJECT**
.
.
.
$ ng build
```
## Express + Angular
```
**PROJECT-T**の内容を**PROJECT**に移動
package.jsonは統合
```
```js
app.use(express.static(path.join(__dirname, 'dist')));
```
```bash
$ npm install
```
ここまでで動作させてみる。

##### /app.js編集
routingあるなら。
(パスは適宜)
```
// pass all request to Angular app-routing.
router.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../index.html"));
});
```
Express + Angularならここで終了。
```
```bash
$ node bin/www
```
```
ブラウザから
http://localhost:3000
```
## + Electron
###### Electron
```
まず、デスクトップアプリシェルのElectronで動作させる。
パッケージング後、プロジェクト中のファイルパスを意識するモジュールなどは動かない(ex config等)
事前に修正必要。
```
```bash
$ npm install --save-dev electron@latest
$ npm install --save-dev electron-builder@latest
```
###### /main.js作成
```js
const {app, BrowserWindow} = require('electron')
const url = require("url");
const path = require("path");

let mainWindow

function createWindow () {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	})

	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, `/dist/index.html`),
			protocol: "file:",
			slashes: true
		})
	);
	// Open the DevTools.
	mainWindow.webContents.openDevTools()

	mainWindow.on('closed', function () {
		mainWindow = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
	if (mainWindow === null) createWindow()
})

```
##### /package.json編集
```json5
{
  "name": "**PROJECT**",
  "version": "0.0.0",
  "main": "main.js",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "electron": "ng build --base-href ./ && electron .",
    "package": "electron-builder --mac --x64"
  },
  "build": {
    "appId": "com.seventhcode.**PROJECT**",
    "mac": {
      "target": "dmg"
    },
    "win": {
      "target": "nsis"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true
    },
    "directories": {
      "output": "dmg"
    }
  },
```
##### /tsconfig.json編集
```json5
  "compilerOptions": {
    "target": "es5",
    }
```
##### /angular.json編集
```json5
 "architect": {
        "build": {
          "options": {
            "outputPath": "dist",
            }
          },
```
##### 実行
```
実行してみる。
PCアプリならここで終了。
```
```bash
$ npm install
$ npm run electron
```
##### ビルド
```bash
$ npm run package
```
## + Capacitor
##### Capacitor追加
```
iOS,Android,PC,Webに対応するためにCapacitorインストール.
```
```bash
$ npm install --save @capacitor/core @capacitor/cli
$ npx cap init --web-dir dist
```
##### capacitor - Electron
```bash
$ npx cap add electron
$ npx cap open electron
```
##### capacitor - iOS
```bash
$ npx cap add ios
$ npx cap open ios
```
##### capacitor - Web
```bash
$ npx cap copy web
$ npx cap serve
```
##### capacitor - Android
```bash
$ npx cap add android
$ npx cap open android
```
##### Electronビルド
```bash
$ npm run package
```
##### デバッガー
```bash
$ npm install --save-dev devtron
$ electron .
```
デバッガの[Console]から
```
require('devtron').install()
```
## Vue
##### vuejsのプロジェクト作成
```bash
$ vue create **PROJECT-T**
```
##### /public/index.html編集
```html
<base href=".">
```
```
を追加する。
```
##### vuejsをbuildする
```bash
yarn build
```
##### capacitor - iOS
```bash
$ npx cap add ios
$ npx cap open ios
```
## Angular Material
##### Angular Material
```bash
$ npm install --save @angular/material @angular/cdk @angular/animations
$ npm install --save angular/material2-builds angular/cdk-builds angular/animations-builds
```
##### /src/app/app.module.ts編集
```js
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  ...
  imports: [BrowserAnimationsModule],
  ...
})
export class HogeAppModule { }
```
##### /styles.css編集
```css
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
```
##### /hammerインストール
```bash
$ npm install --save hammerjs
```
##### /src/main.ts編集
```js
import 'hammerjs';
```
##### /src/index.html編集
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```
## Flex Layout
##### Flex Layout
```bash
$ npm install @angular/flex-layout --save
```
##### /src/app/app.module.ts編集
```js
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [ FlexLayoutModule ],
});
```
## Angular Elements
普通の静的なサイトにAngularで作ったコンポーネントを貼り付ける。
```bash
$ ng new hogefuga
$ cd hogefuga
$ ng add @angular/elements
```

##### /src/app/app.component.ts編集
この辺がキモ。
```js
import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { HogeFugaComponent } from './hogefuga/hogefuga.component';

@Component({
  selector: 'app-hogefuga',
  template: ``,
})
export class AppComponent  {
  constructor(
    private injector: Injector,
  ) {
    const AppHogeFugaElement = createCustomElement(
      HogeFugaComponent,
      { injector: this.injector }
    );
    customElements.define('app-hogefuga', AppHogeFugaElement);
  }
}
```
##### /src/app/app.module.ts編集
bootstrapにAppComponent, entryComponentsに新しく作るコンポーネント。
```js
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HogeFugaComponent } from './hogefuga/hogefuga.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent],
  entryComponents: [HogeFugaComponent]
})
export class AppModule { }
```
##### /src/app/hogefuga/hogefuga.component.ts編集
普通。
```js
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hogefuga',
  template: `
    <div>
      <h1>Hello {{ name }}!!</h1>
      <input [(ngModel)]="value">
      <button (click)="handleClick()">Click!</button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      border: 1px solid black;
    }

    div {
      padding: 16px;
      text-align: center;
      font-family: Lato;
    }
  `]
})
export class HogeFugaComponent  {
  value: string;

  @Input() name: string;
  @Output() clickButton: EventEmitter = new EventEmitter();

  handleClick() {
    this.clickButton.emit(this.value);
    this.value = '';
  }
}
```
##### Build
```bash
$ npm run build
```
##### Deploy
/dist/hogefuga/runtime-es2015.js
/dist/polyfills-es2015.js
/dist/scripts.js
/dist/main-es2015.js

を対象のサイトにコピー。
こんな感じで使う。
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>AngularElementsSample</title>

    <style>
      .angular-elemtents-sample input {
        border: 2px solid #333;
        font-size: 16px;
        padding: 2px;
      }
      .angular-elemtents-sample button {
        background-color: #616161;
        color: #fff;
        padding: 4px 8px;
        font-size: 16px;
        border: none;
        cursor: pointer;
      }
    </style>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>

    <app-hogefuga name="Angular Elements!" class="angular-elemtents-sample">loading</app-hogefuga>

    <script src="runtime-es2015.js"></script>
    <script src="polyfills-es2015.js"></script>
    <script src="scripts.js"></script>
    <script src="main-es2015.js"></script>
    <script>
      const appHogeFuga = document.querySelector('app-hogefuga');
      appHogeFuga.addEventListener('clickButton', (e) => {
        console.log(e.detail);
        appHogeFuga.setAttribute('name', e.detail);
      });
    </script>
  </body>
</html>
```


# linuxエトセトラ

## ディレクトリ
##### 中身ごと削除
    rm -R DIRECTORY
## プロセス
##### 確認
    ps -elf
## シンボリックリンク(ショートカットっぽいの)
##### 作成
    ln -s

##ドメイン(Nginx)

#### 最新版インストール

    /etc/apt/sources.listに追記

    deb http://nginx.org/packages/ubuntu/ trusty nginx

    「trusty」てのはでDebian系のバージョン表記なんだって。
    なので、適宜変えてね。

    apt-get update

    sudo service nginx stop

    sudo apt-get remove nginx-common

    sudo apt-get install nginx

    sudo service nginx start
##### ディレクトリ
      cd /etc/nginx
##### 存在すべきサイトとして登録
      cd sites-aveilable
      cp default xxx.vvv.jp.conf
##### 編集
      sudo nano xxx.vvv.jp.conf

      server {
              client_max_body_size 50M;
              listen        80;
              server_name   ドメイン(xxx.netなど);
              #return 301   https://$host$request_uri;
              #access_log   logs/host.access.log  main

              location / {
                        proxy_buffering off;
                        proxy_pass アドレス(http://128.199.232.217:20000など)
                        proxy_http_version 1.1;
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_set_header Connection "upgrade";
                        proxy_redirect http:// https://;
                        }
              }

      Let's EncryptでHTTPSならば

      server {
              client_max_body_size 50M;
              listen 443 ssl;

              (nginxが1.9.6以上ならば)

              listen 443 ssl http2;

              server_name ドメイン(xxx.netなど);
              ssl_certificate      /etc/letsencrypt/live/[ファイル名確認]/fullchain.pe$
              ssl_certificate_key  /etc/letsencrypt/live/[ファイル名確認]/privkey.pem;

              #access_log  logs/host.access.log  main;

              location / {
                  proxy_buffering off;
                  proxy_pass http://localhost:30000;
                  proxy_http_version 1.1;
                  proxy_set_header Upgrade $http_upgrade;
                  proxy_set_header Connection "upgrade";
              }
      }

      cd ../sites-enabled
      ln -s ../sites-aveilable/xxxxx .
#### 開始/終了/再起動
    終了
    sudo service nginx stop

    開始
    sudo service nginx start

    再起動
    sudo service nginx configtest
#### MacOS(Homebrew)
    /usr/local/etc/nginx/nginx.conf

    終了
    nginx -s stop

    再起動
    nginx -s reload

    localhost:8080/,,,,,,

## Backup

#### full backup

    3.0 以前
    // > sudo service mongodb stop
    // > sudo mongodump --dbpath /var/lib/mongo


    3.0以降
    > sudo mongodump --authenticationDatabase admin -u oda -p zz0101

    > https://blog.supersonico.info/?p=1018

	> mongodump --host localhost --db bard -u bardmaster -p 33557336
	> mongorestore --host localhost --db bard ./dump/bard

#### full restore
    3.0 以前
    // > sudo service mongodb stop
    // > sudo mongorestore --dbpath /var/lib/mongo dump

    3.0以降

    フルリストアは不明。
#### buckup
    3.0以降
    > mongodump --authenticationDatabase **AUTH-DBNAME** -u **DBUSER** -p **DBPASS** -d **TARGET-DBNAME** -o "**OUTPUT-PATH**"
#### restore
    3.0以降

    > use **TARGET-DBNAME**
    > db.createUser({user:"**DBUSER**", pwd:"**DBPASS**", roles:[ "readWrite", "dbOwner" ]})

    で対象ユーザ作成後,

    > mongorestore --authenticationDatabase **AUTH-DBNAME** -u **DBUSER** -p **DBPASS** -d **TARGET-DBNAME** "**OUTPUT-PATH**"
#### Zip
    zip -r dump.zip dump
#### SCP
     scp dump.zip XXX.XXX.XXX.XXX:/path/to/dist
#### sudo
    pathを引き継ぐ。(digital ocean, etc..)

    Defaults    env_reset
    #Defaults   secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
    Defaults    env_keep += "PATH"
#### mail
```bash
$ sudo saslpasswd2 -u seventh-code.com -c oda
```
## Mecab ユーザ辞書
##### mac(homebrew)
```bash
$ /usr/local/Cellar/mecab/0.996/libexec/mecab/mecab-dict-index  -d /usr/local/lib/mecab/dic/ipadic -u /usr/local/lib/mecab/dic/userdic/music.dic -f utf-8 -t utf-8 mecab_music_dic.csv
$ /usr/local/etc/mecabrc
```
##### ubuntu(apt-get)
```bash
$ /usr/lib/mecab/mecab-dict-index                               -d /usr/share/mecab/dic/ipadic     -u /var/lib/mecab/dic/music.dic               -f utf-8 -t utf-8 mecab_music_dic.csv
$ sudo nano /etc/mecabrc
```
#### GMail
    セキュリティ

    https://myaccount.google.com/u/1/security

    安全性の低いアプリの許可: 有効とする
#### Let's Encrypt（HTTPSの認証)
    ここ見ろ

    https://letsencrypt.jp/usage/

    まず、certbot-autoってのをインストール
```bash
$ cd ~
$ mkdir certbot
$ cd certbot
$ wget https://dl.eff.org/certbot-auto
$ chmod a+x certbot-auto
$ sudo service nginx stop
$ ./certbot-auto
        エラー出たら
$ ./certbot-auto certonly
$ sudo service nginx start
```
    実行
```bash
$ cd ~
$ cd cartbot
$ sudo service nginx stop
$ ./certbot-auto certonly --no-self-upgrade -n --standalone  --agree-tos --email oda.mikio@gmail.com -d www.aaa.com
$ sudo service nginx start
```
    -nginxってのが使える？使うと楽？
    
# sudo apt install python3-certbot-nginx
    
#### 複数
```bash
$ cd ~
$ cd certbot
$ sudo ./certbot-auto certonly --nginx -d DOMAIN.co.jp -d www.DOMAIN.co.jp
```
#### 更新
```bash
$ cd ~
$ cd certbot
$ sudo service nginx stop
$ sudo ./certbot-auto renew -q --no-self-upgrade
$ sudo service nginx start
```

$ sudo apt install certbot
$ sudo apt-get install python-certbot-nginx
$ sudo certbot renew
 
 
    証明書の取得時に使用したオプションは

    /etc/letsencrypt/renewal/${DOMAIN}.conf

## openssl

    作るもの

    秘密鍵
    公開鍵
    証明書

#### 秘密鍵
```bash
$ openssl genrsa -aes128 1024 > server.key
```
#### 公開鍵
```bash
$ openssl req -new -key server.key > server.csr
```
#### 証明書
```bash
$ openssl x509 -in server.csr -days 365 -req -signkey server.key > server.crt
```
#### npmのパーミッション
    ”sudo npm install xxx"だとうまくいかない場合は、npmのパーミッション変えて"npm install xxx"。

    https://docs.npmjs.com/getting-started/fixing-npm-permissions
###### ホームディレクトリにnpmディレクトリ作る。
```bash
$ mkdir ~/.npm-global
```
###### npmの設定
```bash
$ npm config set prefix '~/.npm-global'
```
###### パス追加（~/.profile）
```bash
$ export PATH=~/.npm-global/bin:$PATH
$ source ~/.profile
```
#### 監査
###### npmモジュール監査
```bash
$ npm audit
```
#### npmモジュールバージョン
##### npmモジュールバージョン
```bash
$ npm install -g npm-check-updates
 ```
#####  確認
```bash
$ ncu
 ```
#####  更新
```bash
$ ncu -u
 ```
##### メジャーバージョン固定
```bash
$ ncu --semverLevel major
 ```
###　ジャーナル
```bash
$ sudo journalctl --vacuum-size=100M
```

### SSH
```bash
$ sudo nano /etc/ssh/sshd_config
```
ポートを変更。

### FireWall基本(ufw)

有効化
```bash
$ sudo ufw enable
```
まずは全て禁止
```bash
$ sudo ufw default DENY
```
SSH許可
```bash
$ sudo ufw allow 22
```
SSH連続ログイン禁止
```bash
$ sudo ufw limit 22
```
NGINX
```bash
$ sudo ufw allow 'Nginx Full'
```
確認
```bash
$ sudo ufw status verbose
```
### fail2ban(侵入抑止)

インストール
```bash
$ sudo apt install fail2ban
```
確認
```bash
$ systemctl status fail2ban
```
SSHフィルタ動作状況を確認
```bash
$ sudo fail2ban-client status sshd
```
banしたIPアドレスをunbanする
```bash
$ sudo fail2ban-client set sshd unbanip [IPアドレス]
```

設定変更
```bash
$ sudo nano jail.conf
```

```bash
[sshd]
# To use more aggressive sshd modes set filter parameter "mode" in jail.local:
# normal (default), ddos, extra or aggressive (combines all).
# See "tests/files/logs/sshd" or "filter.d/sshd.conf" for usage example and details.
#mode   = normal
port    = ssh <- ポート
logpath = %(sshd_log)s
backend = %(sshd_backend)s
```

### SSH(キー)
```bash
$ ssh-keygen -t rsa
```
Mac
```bash
$ ssh-add -K ~/.ssh/id_rsa
$ ssh-copy-id user@domain.com
```
確認
```bash
$ ssh user@domain.com
```
パスフレーズ再設定
```bash
$ ssh-keygen -f ~/.ssh/id_rsa -p
```

### Server name
```bash
$ hostnamectl set-hostname  NEWNAME
```
### Ntp(時刻サーバ)

```bash
$ apt install ntp
```

/etc/ntp.confファイル

poolをコメント

pool ntp.nict.jp iburst

restrict 10.0.0.0 mask 255.255.255.0 nomodify notrap



Timezone

timedatectl set-timezone Asia/Tokyo
