import "./assets/css/reset.css";
import "./App.css";
import WeatherFunction from "./components/WeatherFunction";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> App Component </h1>
        <br/>
        <WeatherFunction />
      </header>
    </div>
  );
}

export default App;
