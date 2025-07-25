import './App.css'
import { TwitterFollowCard } from './components/TwitterFollowCard'
import { useState } from 'react'

export function App(){

    return (
        <section className='App'>

            <TwitterFollowCard 
            userName='zenencontreras' 
            name='Zenen Contreras'
            initialIsFollowing = {true}
            />

            <TwitterFollowCard 
            userName="midudev" 
            name='Midu Dev'/>
        </section> 

    )
}

