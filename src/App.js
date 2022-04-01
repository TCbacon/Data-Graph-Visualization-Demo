import './App.css';
import { BarChart } from './components/BarChart';
import {ScatterPlot} from './components/ScatterPlot';

function App() {
  return (
    <div className="App">
      <BarChart/>
      <ScatterPlot/>
    </div>
  );
}

export default App;
