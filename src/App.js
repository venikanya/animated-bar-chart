import { useEffect} from 'react';
import * as d3 from "d3";
import _ from "lodash";
import './App.css';

function App() {
  const rectWidth = 50;
  const svgHeight = 100;
  useEffect(() => {
  
    function updateBars() {
      // select svg so that transition can be localized within selection
      const t = d3.select('svg').transition().duration(1000)
    
      // randomly generate an array of data
      const data = _.times(_.random(3, 8), i => _.random(0, 100))
    
      // ✨ YOUR CODE HERE
      d3.select('svg').selectAll('rect')
        .data(data, d => d)
        .join(
          enter => {
            return enter.append('rect')
              .attr('height', 0)
              .attr('x', (d , i) => i * rectWidth)
              .attr('y', svgHeight)
          },
          update => update,
          exit => {
            return exit.transition(t)
              .attr('height', 0)
              .attr('y', svgHeight)
          }
        )
        .attr('width', rectWidth)
        .attr('fill', 'pink')
        .attr('stroke', 'plum')
        .attr('stroke-width', 3)
        .transition(t)
        .attr('x', (d, i) => i * rectWidth)
        .attr('y', d => svgHeight - d)
        .attr('height', d => d)
        
      
      // update div with new data array:
      d3.select('code').text(JSON.stringify(data).replace(/\,/g, ', '))
    }
  
    updateBars()
    d3.select('button').on('click', updateBars)
  
  }, [])
  return (
    <div className="App">
      <svg className='container'></svg>
      <div className='inputs'>
        <button>new data!</button>
        <code></code>
      </div>
    </div>
  );
}

export default App;
