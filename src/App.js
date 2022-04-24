import './App.css';
import { BarChart } from './components/BarChart';
import {ScatterPlot} from './components/ScatterPlot';
import {WorldMap} from './components/WorldMap';
import {Histogram} from './components/Histogram';
import {HistogramBrushing} from './components/HistogramBrushing';
function App() {
  return (
    <div className="App">
      <BarChart/>
      <ScatterPlot/>
      <WorldMap/>
      <Histogram/>
      <HistogramBrushing/>
    </div>
  );
}

export default App;
