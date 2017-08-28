var linebot = require('linebot');
var express = require('express');
require('./scripts/main.js');
dict1 = require('./scripts/data/dictionary.js');
dict2 = require('./scripts/data/dict_custom.js');
var stopwords=[];
var fs = require("fs");

function readLines(input, func){
    var remaining = "";
    input.on("data", function(data){
        remaining += data;
        var index = remaining.indexOf("\n");  
        //indexOf : 回傳指定字串 在整個標的字串中首次出現的位置。
        while(index > -1){  //indexOf回傳-1時代表下面已經沒有指定字串
            var line = remaining.substring(0, index);
            //substring 可以回傳在兩個指定的關鍵字之間的資料
            remaining = remaining.substring(index+1);
            //將提取過後的資料去除，使remaining變數變成全部尚未處理的內容
            func(line);
            index = remaining.indexOf("\n");
        }
    });

    input.on("end", function(){
        if(remaining.length > 0){
            func(remaining);
        }
    });
}
function showdata(data){
    console.log("Line:"+ data);
}
var input = fs.createReadStream("./scripts/data/stopwords.txt");
readLines(input,showdata);

var bot =linebot({
    channelId: "1523378933",  //註冊Line Bot的Channel ID
    channelSecret: "ae98c240a2aa06f654e873aefceb4e81",    //Channel Secret
    channelAccessToken: "jHRM9rD3O8NyJL8817rGwaWzimo15AUrWRj1oTnJLyjJC8L+guKxnO3KD1jfkBxXAvY75Xa1Pv/nW4GK0mvb9TpPp7Y53UPhuuf+KQdc9b2Vm60RwlrNFWwynvms+sOqQOZvfPGSAw1gOyLAKLwgBwdB04t89/1O/w1cDnyilFU="    //Channel Access Token
});

//印出從LINE收到的訊息
bot.on('message',function(event){
    console.log(event);
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//express預設是走port 3000，而heroku不是，所以以下程式碼將進行轉換
var server = app.listen(process.env.PORT || 8080,function(){
    var port = server.address().port;
    console.log("App now running on port", port);

});

//回復一模一樣的訊息
bot.on('message',function(event){
    //收到通關密語後，建立一個選單讓使用者選擇想要使用的功能
    if (event.message.type = 'text' && event.message.text == "我想鍛鍊"){
        var msg = {
            "type": "template",
            "altText": "您好，初次見面！",
            "template":{
                "type": "buttons",
                "title": "您好，初次見面！",
                "text": "請問您想使用哪一項功能呢？",
                "thumbnailImageUrl": "https://farm3.staticflickr.com/2873/34376500995_622529550b_k.jpg",
                "actions":[
                    {
                        "type": "postback",
                        "label":"知識詢問",
                        "data": "#"
                    },
                    {
                        "type": "postback",
                        "label": "鍛鍊姿勢查詢",
                        "data": "#"
                    }
                ]
            }
        }
        event.reply(msg).then(function(data){
            colsole.log(msg);
        }).catch(function(error){
            console.log('error');   //若有錯誤，catch下來後註記在log中
        });
    }
    else if (event.message.type = 'text'){
        var msg = event.message.text + " 收到！";
        
        //使用Jieba方法將接收到的文字內容(event.message.text)進行斷詞，並逐詞儲存至(_result)陣列
        //同時將斷詞結果輸出到log中。
		node_jieba_parsing([dict1, dict2], event.message.text, function (_result) {
            for (i = 0; i < _result.length ; i++){
                for (j=0;j<stopwords.length;j++){
                    if(_result[i] == stopwords[j]){
                        _result.splice(i,1);
                    }
                }
            }
			console.log(_result.join("/"));
        });
        //=======================
        event.reply(msg).then(function(data){
            colsole.log(msg);
        }).catch(function(error){
            console.log('error');   //若有錯誤，catch下來後註記在log中
        });
    }
    
});

