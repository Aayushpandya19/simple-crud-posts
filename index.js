require('dotenv').config();

const express  =require('express');
const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.urlencoded({extended:true}))

const path=require('path');


const { v4: uuidv4 } = require('uuid');
//import { v4 as uuidv4 } from 'uuid';
//uuidv4();  ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const methodOverride=require('method-override')
// use method override to changr post req. into patch
app.use(methodOverride('_method'))


app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"));


app.use(express.static(path.join(__dirname,"public")));


let posts = [
    {   
        id:uuidv4(),
        username:"aayush",
        content:"i love cricket"
    },
    {
        id:uuidv4(),
        username:"krunal",
        content:"i love hiphop"
    },
    {
        id:uuidv4(),
        username:"ak",
        content:"we love coding"
    },
]



app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Server Status</title>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f4f8; /* light background */
            font-family: Arial, sans-serif;
          }
          .container {
            text-align: center;
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
          }
          h1 {
            color: #333;
          }
          button {
            background-color: #007BFF;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s ease;
          }
          button:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>✅ Server is working well</h1>
            <button type="button" onclick="window.location.href='/posts'">
            Go to Posts
            </button>

        </div>
      </body>
    </html>
  `);
});


app.get('/posts',(req,res) => {
    res.render("index.ejs",{posts});                            //index
});


app.get('/posts/new',(req,res) => {                             //Create
    res.render("new.ejs");
});


app.post('/posts',(req,res) => {                                   //response page for create 
   // console.log(req.body);                

    let{username,content}=req.body;

    let id = uuidv4();

    posts.push({id,username,content});
    //res.send("post request is working");
    res.redirect("/posts");
});





app.get("/posts/:id",(req,res)=>{                                  //Read
    let{id} = req.params;
    //console.log(id);
    let post =posts.find((p)=> id === p.id)
    //console.log(post);
    //res.send("Request working")

    res.render("show.ejs",{post});
    
});


app.patch("/posts/:id",(req,res)=>{                                //Update
    let{id} = req.params;
    //console.log(id);
    let newContent=req.body.content;
    let post =posts.find((p)=> id === p.id);
    post.content=newContent
    console.log(post);
    //res.send("patch request working")
res.redirect("/posts");
});


app.get('/posts/:id/edit',(req,res)=>{                              //response page for update
    let{id} = req.params;
    let post =posts.find((p)=> id === p.id);
    res.render("edit.ejs",{post})
});

app.delete('/posts/:id',(req,res)=>{                                //Delete
    let{id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    //res.send("your posrt is Deleted")
    res.redirect("/posts")

});

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
    console.log(`Server URL: http://localhost:${PORT}`);
})

