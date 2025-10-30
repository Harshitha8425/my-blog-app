import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';
import { useRef } from "react";

const API_BASE_URL='http://localhost:3001'
const API_URL=`${API_BASE_URL}/api/posts`;

export default function BlogModule()
{
  const[title,setTitle]=useState('');
  const[content,setContent]=useState('');
  const[author,setAuthor]=useState('');
  const[posts,setPosts]=useState([]);
  const[editingPostId,setEditingPostId]=useState(null);
  const navigate=useNavigate();
  const token=localStorage.getItem('token');
  const fileInputRef=useRef(null);
  const[image,setImage]=useState(null);

  useEffect(()=>{
    if(!token){
      navigate('/auth')
    }
  },[token,navigate])

  const fetchPosts = async() =>
  {
    try{
      const response=await fetch(API_URL);
      const data=await response.json();
      setPosts(data);
    }
    catch(error)
    {
      console.error(error)
    }
  }
  useEffect(()=>{
      fetchPosts()
  } ,[])

  const handleSubmit = async(event) => {
    event.preventDefault();
    const formData=new FormData();
    formData.append('title',title);
    formData.append('content',content);
    formData.append('author',author);
    if(image){
      formData.append('image',image);
    }
    const url=editingPostId? `${API_URL}/${editingPostId}`:API_URL;
    const method=editingPostId? 'PUT':'POST';
    try{
      const response= await fetch(url,{
        method:method,
        body:formData
      })
      if(response.ok) {
        setTitle('');
        setContent('');
        setAuthor('');
        setEditingPostId(null);
        if(fileInputRef.current){
          fileInputRef.current.value=""
        }
        fetchPosts();
      }
    }
    catch{}
  }

  const handleDelete=async(postId)=> {
    const response=await fetch(`${API_URL}/${postId}`,{method:'DELETE'});
    if(response.ok)
    {
      await fetchPosts();
    }
  }

  const handleEdit = async(post) =>{
    setEditingPostId(post._id);
    setTitle(post.title);
    setContent(post.content);
    setAuthor(post.author);
  } 

  return(
    <div className="app-container">
      <button onClick={handleLogout} style={{float:'right',padding:'10px',margin:'10px'}}>Log Out</button>
     <div className="form-section">
      <h2>Create a New Posts</h2>
      <form onSubmit={handleSubmit}>
         <input type="text" placeholder="Author Name" value={author} onChange={(e)=>setAuthor(e.target.value)}></input>
         <input type="text" placeholder="Post Title" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
         <textarea placeholder="Write Your Content Here...." value={content} onChange={(e)=>setContent(e.target.value)} />

          <labe>Upload Image:</labe>
          <input type="file"
                 ref={fileInputRef}
                 onChange={(e)=>setImage(e.target.files[0])}
                 accept="image/*" />
                 
         <button type="submit">{editingPostId?'Update Post': 'Create Post'}</button>
      </form>
      </div> 
      <div className="posts-section">
        <h2>Latest Posts</h2>
        {posts.map((post)=>(
          <div key={post._id} className="post-card">
            <h3>{post.title}</h3>
            <p className="post-author">by {post.author}</p>
            <p>{post.content}</p>
            <div className="post-actions">
            <button onClick={()=>handleEdit(post)}>Edit</button>
            <button onClick={()=>handleDelete(post._id)}>Delete</button>
            </div>
            </div>
        ))}
      </div>
    </div>
  )
}