import { useState, useEffect } from 'react'
import { theme } from './components/sounds.js'

export function LoadingDiv({ isLoaded }) {
    const [textLoading, setTextLoading] = useState('Nikita Stroganov presents')

    useEffect(() => {
     setTimeout(() => {
       setTextLoading('Rick and Morty memory game, Project 2025')
     }, 2000)
     setTimeout(() => {
       setTextLoading('Are you ready???')
     }, 5000)
     setTimeout(() => {
       document.querySelector('.loadingBtn').classList.add('appearBtn')
     }, 7000)
    }, [])

    function startGame() {
        theme.play();
        document.querySelector('.timingBack').classList.add('opacity')
        setTimeout(() => isLoaded(), 2000)
    }
  
    return (
      <>
       <div className='timingBack'>
         <div className='loadingDiv'>
           <h2>{textLoading}</h2>
           <button className='loadingBtn' onClick={startGame}>Yes!</button>
           <img src='./src/assets/images/portal.png' className='portal' alt='loading'></img>
         </div>
         </div>
      </>    
    )
  }