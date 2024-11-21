import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import {supabase} from '../../client'
import './create.css'
import Navbar from '../nav/nav'

function Create(){
    const [post, setPost] = useState({title: "", content: "", image: "", comment: []})

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })    }

    const createPost = async (event) => {
        event.preventDefault()
        const {data, error} = await supabase
            .from('post')
            .insert(
                {title: post.title, content: post.content, image: post.image}).select();
        if (error) {
            console.log(error)
            return
        }
        window.location = "/"
    }

    return (
     <div>
            <div className='create'>
            <h2>CREATE POST</h2>
            <h3>Title</h3>
            <input type='text' name = "title" placeholder='Title' onChange = {handleChange}/>
            <h3>Content</h3>
            <textarea name = "content" placeholder='Description' onChange = {handleChange}></textarea>
            <h3>Image URL</h3>
            <input type='text' name = "image" placeholder='OPTIONAL' onChange = {handleChange}/>
            <input type="submit" value='CREATE' onClick={createPost}/>
            </div>
        </div>
    )
}

export default Create