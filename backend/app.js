let express=require('express');
let app=express();
let cors = require('cors')
let main = require('./getHtml')

app.use(cors());
app.use(express.json());

// app.post("/getHtml",async(req,res)=>{
//     try{
//         let data=await main(req.body.url);
//         return res.status(200).json(data);
//     }
//     catch(err){
//         return res.status(500).json({message:err});
//     }
// })
const spawn=require('child_process').spawn;

app.post("/getKeyData",(req,res)=>{
    try{
        let {url,text}=req.body;
        // console.log(req.body);
        const pythonProcess=spawn('python',["scraperFunctions/getKeyData.py",url,text]);
        pythonProcess.stdout.on('data',(data)=>{
            let str=data.toString();
            // console.log(str);
            let obj=JSON.parse( str );
            return res.json(obj);
        })
    }
    catch(err){
        console.log(err);
        return res.json({"error":err.message})
    }
})

app.post("/getAllKeysData",(req,res)=>{
    try{
        let {url,wantedList}=req.body;
        console.log(req.body);
        const pythonProcess=spawn('python',["scraperFunctions/getAllKeysData.py",url,...wantedList]);
        pythonProcess.stdout.on('data',(data)=>{
            let str=data.toString();
            // console.log(str);
            let obj=JSON.parse( str );
            return res.json(obj);
        })
    }
    catch(err){
        console.log(err);
        return res.json({"error":err.message})
    }
})

app.listen(5000,()=>{
    console.log("server started");
})