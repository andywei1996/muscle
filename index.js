var linebot = require('linebot');
var express = require('express');

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
var server = app.listen(process.env.PORT || 8000,function(){
    var port = server.address().port;
    console.log("App now running on port", port);

});

//回復一模一樣的訊息
bot.on('message',function(event){
    if (event.message.type = 'text'){
        var msg = event.message.text + "收到！";
        event.reply(msg).then(function(data){
            colsole.log(msg);
        }).catch(function(error){
            console.log('error');   //若有錯誤，catch下來後註記在log中
        });
    }
});