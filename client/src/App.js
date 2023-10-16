import './App.css';
import evilcook from './evilcook.jpg';

function App() {
  return (
    <div className="App">
      <div class="header">
        <header>
          <h1>Kuchařka</h1>
            <p>Vítejte v aplikaci Kuchařka!
             Zatím toho moc neumí, ale to se brzo změní!
            </p>
        </header>
      </div>
      <div class="main">
        <img src={evilcook} alt="Evil cook"></img>
      </div>
    </div>
  );
}

export default App;
