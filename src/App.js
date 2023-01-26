import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [player1, setPlayer1] = useState({ name: '', level: '',index:1 });
  const [player2, setPlayer2] = useState({ name: '', level: '',index:2 });
  const [points, setPoints] = useState([]);
  const [Sets, setSets] = useState([]);
  const [CurrentScore, setCurrentScore] = useState([]);
  const [CurrentGame, setCurrentGame] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePoints();
  }

  const generatePoints = () => {
    let newPoints = [];
    for (let i = 0; i < 150; i++) {
      let point = {};
      point.number = i + 1;
      let winner = Math.random() < Number(player1.level) / (Number(player1.level) + Number(player2.level)) ? player1.name : player2.name;
      let index  =winner===player1.name? player1.index : player2.index;
      point.winner = winner;
      point.index = index;

      newPoints.push(point);
    }
    setPoints(newPoints);
  }

  const handleSendPoints = async () => {
 await axios.post("http://localhost:5000/",{points}).then((res) => {
  setSets(res.data.result)
  setCurrentScore(res.data.CurrentScore)
  setCurrentGame(res.data.CurrentGame)
})
  
    console.log(points)
  }
  return (
    <div>
      <center>
      <form onSubmit={handleSubmit}>
        <label>
          Player 1 name:
          <input type="text" value={player1.name} onChange={e => setPlayer1({ ...player1, name: e.target.value })} />
        </label>
        <br />
        <label>
          Player 1 level:
          <input type="number" value={player1.level} onChange={e => setPlayer1({ ...player1, level: e.target.value })} min="1" max="10" />
        </label>
        <br />
        <label>
          Player 2 name:
          <input type="text" value={player2.name} onChange={e => setPlayer2({ ...player2, name: e.target.value })} />
        </label>
        <br />
        <label>
          Player 2 level:
          <input type="number" value={player2.level} onChange={e => setPlayer2({ ...player2, level: e.target.value })} min="1" max="10" />
        </label>
        <br />
        <button type="submit">Generate Points</button>
        
      </form>
      <button type="submit" onClick={handleSendPoints}>Resulat</button>
      <table>
  <thead>
    <tr>
      <th></th>
      {Sets?.map((x,i)=>
      <td>Set {i+1}</td>
  )}
     {CurrentGame?.jeuxP1==null?null: <td>Set {Sets?.length+1}</td>}
     {CurrentScore?.p1==null?null:  <td>Current Game</td>}
     
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{ player1.name }</td>
{Sets?.map(x=>
      <td>{x.jeuxP1}</td>
  )}

      <td>{CurrentGame?.jeuxP1}</td>
      <td>{CurrentScore?.p1}</td>

    </tr>
    <tr>
      <td> {player2.name }</td>
      {Sets?.map(x=>
      <td>{x.jeuxP2}</td>
        
  )}
        <td>{CurrentGame?.jeuxP1}</td>

        <td>{CurrentScore?.p2}</td>

    </tr>
  </tbody>
</table>

        
      {points.length > 0 && (
        <ul>
          {points.map((point, index) => (
            <li key={index}>Point {point.number}: won by {point.winner}</li>
          ))}
        </ul>
      )}
      </center>
    </div>
  );
};

export default App;
