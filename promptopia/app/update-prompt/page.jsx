'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@/components/Form'
const EditPrompt = () => {
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt:'',
        tag:'',
    })
    useEffect(()=>{
        const getPromptDetails = async ()=>{
            const res = await fetch(`/api/prompt/${promptId}`)
            const data = await res.json()
            setPost({prompt: data.prompt, tag: data.tag})
        }
        if(promptId) getPromptDetails()
    },[promptId])
    const updatePrompt = async (e)=>{
        e.preventDefault()
        setSubmitting(true)
        if(!promptId) alert('Prompt id not found')
        try {
            const res = await fetch('/api/prompt/new')
        } catch (error) {
            
        }
    }
  return (
    <Form
        type='Edit'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={()=>{}}
    />
  )
}

export default EditPrompt