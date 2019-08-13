
import React,{useState,useEffect,useRef} from "react";
import "./App.css";
import BottomRow from "./BottomRow";

function Home(props){
  return(
    <div className="home">
    <h2 className="home__name">Lions</h2>
    <div className="home__score">{props.score}</div>
    </div>)
};

function Away(props){
  return(
  <div className="away">
  <h2 className="away__name">Tigers</h2>
  <div className="away__score">{props.score}</div>
  </div>
  )
};

function Timer(props){
  return <div className="timer">{props.time}</div>
};



function App() {
  const [homeScore,setHomeScore]=useState(0);
  const [awayScore,setAwayScore]=useState(0);
  const [quarter,setQuarter]=useState(1);
//start @ 15 min
  // let time=useRef(900);
  const [time,setTime]=useState(900);
  let currMin=Math.floor(time/60);
  let currSec=parseInt(time)-(parseInt(currMin)*60);
  let displaySec=0;
  if (parseInt(currSec)<10){
    displaySec="0"+String(currSec);
  } else {
    displaySec=String(currSec);
  }
  // console.log(parseInt(currMin),time.current,displaySec);

  let currTime=currMin+":"+displaySec;
  let isActive=true;
  useEffect(() => {
    let interval = null;
    let isActive=true;

    if (isActive) {
      interval = setInterval(() => {
        setTime(time-1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  // useEffect(() => {
  //   let id = setInterval(() => {
  //     setTime(time-1);
  //   }, 1000);
  //   return () => clearInterval(id);
  // });

  // componentDidMount() {
  //   this.timerID = setInterval(
  //     () => this.tick(),
  //     1000
  //   );
  // }
 
  // componentWillUnmount() {
  //   clearInterval(this.timerID);
  // }
 
  // tick() {
  //   time.current-=1;
  // }





  function scoreHandler(team,amount){
    if (team==="Lions"){
      setHomeScore(homeScore+amount);
    } else {
      setAwayScore(awayScore+amount);
    }
  };
  
  function handleQuarter(){
    if (quarter===4){
      setQuarter(1)
    } else {
      setQuarter(quarter+1)
    }

  };

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <Home score={homeScore}/> 
          <Timer time={currTime} />
          <Away score={awayScore}/> 
        </div>
        <BottomRow quarter={quarter}/>
      </section>
      <section className="buttons">
        <div className="homeButtons">
          <button className="homeButtons__touchdown" onClick={()=>scoreHandler("Lions",7)}>Home Touchdown</button>
          <button className="homeButtons__fieldGoal" onClick={()=>scoreHandler("Lions",3)}>Home Field Goal</button>
        </div>
        <div className="awayButtons">
          <button className="awayButtons__touchdown" onClick={()=>scoreHandler("Away",7)}>Away Touchdown</button>
          <button className="awayButtons__fieldGoal" onClick={()=>scoreHandler("Away",3)}>Away Field Goal</button>
        </div>
        <div className="newButtons">
          <button className="quarterButton" onClick={()=>handleQuarter()}>Add Quarter</button>
          {/* <button className="quarterButton" onClick={()=>{time.current-=1;console.log(time.current)}}>remove time</button> */}
        </div>
      </section>
    </div>
  );
}

export default App;
