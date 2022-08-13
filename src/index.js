const express = require('express');
const cors = require('cors')
const axios = require('axios')
const app = express();
const bodyParser = require('body-parser');
const serverPort = 3000
const ip = '3.225.165.237'


app.use(express.static(__dirname + '/public'))
app.use(cors({ origin: true, credentials: true }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', 3000)




function sendImage(req,res){
	let serverURL = 'http://' + ip + ':' + serverPort;
    console.log(req.body.image.name)
    axios({
        method: 'post',
        url: serverURL + '/receiveImage',
        data: req.body.image
    }).then(imgRes=>{
        let data = imgRes.data;
        console.log("Image returns", data);
        
        if(data.ok){
            data.imgURL = serverURL + '/' + req.body.image.name;
        }else{
            console.log("receive image", imgRes.data);
        }
        res.send(imgRes.data);
    }).catch(err=>{
        console.log(err);
    });
}


app.post('/uploadData', (req, res) =>{
    imagePath = sendImage(req, res);
    
})

app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`);
});