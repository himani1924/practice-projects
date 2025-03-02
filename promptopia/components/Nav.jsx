'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {signOut, signIn, useSession, getProviders} from 'next-auth/react'
import { useState, useEffect } from 'react'
const Nav = () => {
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)
  useEffect(()=>{
    const setProviders = async()=>{
      const res = await getProviders();
      setProviders(res)
    }
  },[])
  const isUserLoggedIn = true

  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href={'/'}>
            <Image
            src={'/next.svg'}
            width={100}
            height={50}
            alt='logo'/>
        </Link>

        {/* mobile navigation */}
        <div className="sm:flex hidden">
          {isUserLoggedIn ?(
            <div className='flex gap-3 md:gap-5'>
              <Link href={'/create-prompt'} className='black_btn'>
              Create Post
              </Link>
              <button type='button' onClick={signOut} className='outline_btn'>Sign out</button>
              <Link href={'/profile'}>
                <Image
                src={'/globe.svg'}
                height={30}
                width={30}
                alt='profile'
                >
                </Image>
              </Link>

            </div>
          ):(
            <>
              {
                providers && 
                Object.values(providers).map((provider)=>(
                  <button type='button' key={provider.name} onClick={()=>signIn(provider.id)} className='black_btn'>
                    Sign in
                  </button>
                ))
              }
            </>
          )}
        </div>

        {/* mobile devices */}
        <div className='sm:hidden flex relative'>
          {isUserLoggedIn?(
            <div className='flex'>
              <Image
                src={'/globe.svg'}
                height={30}
                width={30}
                alt='profile'
                onClick={()=>{setToggleDropdown((prev)=>!prev)}}
                >
                </Image>
                {toggleDropdown && (
                  <div className='dropdown'>
                    <Link
                      href={'/profile'}
                      className = 'dropdown_link'
                      onClick={()=>setToggleDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href={'/create-prompt'}
                      className = 'dropdown_link'
                      onClick={()=>setToggleDropdown(false)}
                    >
                      Create prompt
                    </Link>
                    <button
                      type='button'
                      className = 'mt-5 w-full black_btn'
                      onClick={()=>{
                        setToggleDropdown(false)
                        signOut()
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                )}
            </div>
          ):(
            <>
              {
                providers && 
                Object.values(providers).map((provider)=>(
                  <button type='button' key={provider.name} onClick={()=>signIn(provider.id)} className='black_btn'>
                    Sign in
                  </button>
                ))
              }
            </>
          )
          
        
        
          }

        </div>
    </nav>
  )
}

export default Nav