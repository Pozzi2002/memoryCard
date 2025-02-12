import { useState, useEffect } from 'react'; 
import { LoadingDiv } from './components/loadingCp.jsx';
import { fetchAPI } from './components/fetchAPI.js';
import { shuffle } from './components/shuffleArr.js'
import { tick } from './components/sounds.js';
export default function App() {
  const [loading, setLoaded] = useState(true); // Set true for loading

  return (
   <>
   { 
   loading ? (
   <LoadingDiv isLoaded={() => setLoaded(!loading)}/>
   ) : (
   <>
   <Game />
   </>
  )}
   </> 
  )
}

function Game() {
 const [randomArray, setRandomArray] = useState('');
 const [count, setCount] = useState([])
 const [score, setScore] = useState(0);
 const [bestScore, setBestScore] = useState(0);
 const [finish, setFinish] = useState(false);

  useEffect(() => {
    fetchAPI().then((result) => {
      setRandomArray(result.splice(0, 12))
    })
  }, []);

  function primaryClickFn(id) {
     tick.play();
     setRandomArray(shuffle([...randomArray]));
     setScore(score + 1);
     setCount([...count, id])
    let currentScore = [...count, id].length 
     if (count.includes(id)) {
       setScore(0);
       setCount([]);
       if (score > bestScore)
         setBestScore(score);
     }
     

   if (currentScore == 12) {
      setFinish(true)
      setTimeout(() => window.location.reload(), 4000)
    }
  }

  if (finish) {
  return (
    <div className='divCongratulations'>
     <h2 className='congratulations'>Congratulations! Надеюсь тебе понравилось</h2>
    </div>
  )
 }

  if (randomArray != '') {
  return (
    <>
    <div className='divScore'>
      <h2>Score: {score}</h2>
      <h2>Best score: {bestScore}</h2>
   </div>
    <div className='gameBoard'>
      {
        randomArray.map(item=> 
          <HeroCart
          key={item.id}
          id={item.id}
          src={item.image} 
          heroName={item.name} 
          randomizeArr={() => primaryClickFn(item.id)}/>
        )
      }
    </div>
    </>
  )
 }
}

function HeroCart({ src, heroName, id, randomizeArr }) {

  return (
    <>
    <div className='card' id={id} onClick={randomizeArr}>
      <img src={src} alt={heroName}></img>
      <h3>{heroName}</h3>
    </div>
    </>
  )
}