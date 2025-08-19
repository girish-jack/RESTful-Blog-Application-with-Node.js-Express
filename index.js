const express = require("express");
const app = express();
const port = 1718;
//step 4 requiring uuid
const{v4:uuidv4}=require('uuid');

const methodOverride=require('method-override');
uuidv4();
const path = require("path");
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
});

app.get("/", (req, res)=>{
    res.send("server is working well");
});

// creating arr to store data
let posts = [
    {
        username: "apnacollege",
        content: "I Love Coding",
        id:uuidv4(),
    },
    {
        username: "shraddhakhapra",
        content: "hard work is important to achieve internship",
        id:uuidv4(),
    },
    {
        username: "rahulkumar",
        content: "I got selected in google",
        id:uuidv4(),
    },
];

app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
});


//2nd api
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
//to add path whetherr to get the new posts path
//in get req informatn comes in params as the post req comes in body
app.post("/posts",(req,res)=>{
    
    let{username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    
    res.redirect("/posts");
});

//3 rd api get/posts/id
//when we tap on the post it showes separately
app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p) =>id===p.id);//finds the requested post
    res.render("show.ejs",{post});
})

// 5th update content
app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    res.redirect("/posts");
})

// 6 th creating edit route

app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})
// 7 method override

//8 destroy route
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");


})