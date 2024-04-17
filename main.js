d3.csv("healthcare-dataset-stroke-data 2.csv").then(function(data) {
  let processedData = data.map(d => ({
    age: +d.age,
    avg_glucose_level: +d.avg_glucose_level,
    stroke: +d.stroke  
  }));

  let width = 1000,
      height = 500;

  let margin = {
    top: 40,
    bottom: 30,
    left: 30,
    right: 30
  };

  let svg = d3
    .select('body')
    .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background', '#fdf9f5');

  let xScale = d3.scaleLinear()
    .domain([0, d3.max(processedData, d => d.age)])
    .range([margin.left, width - margin.right]);

  let yScale = d3.scaleLinear()
    .domain([0, d3.max(processedData, d => d.avg_glucose_level)])
    .range([height - margin.bottom, margin.top]);

  let xAxis = svg
    .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom().scale(xScale));

  xAxis
    .append('text')
      .attr('x', width - margin.right)
      .attr('y', -10)
      .style('stroke', 'black')
      .text('Age');

  let yAxis = svg
    .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft().scale(yScale));

  yAxis
    .append('text')
      .attr('y', 30)
      .attr('x', 65)
      .style('stroke', 'black')
      .text('Avg Glucose Level');

  let circle = svg
      .selectAll('circle')
      .data(processedData)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.age))
      .attr('cy', d => yScale(d.avg_glucose_level))
      .attr('r', 4)
      .attr('fill', d => d.stroke === 1 ? 'darkblue' : '#F1B3D3')
      .attr('fill-opacity', d => d.stroke === 1 ? 0.8 : 0.5);
  
  // Render dark blue circles after pink circles to ensure they are in front
  let darkBlueCircles = svg.selectAll('circle').filter(d => d.stroke === 1);
  darkBlueCircles.raise();

  // Append a group element for the legend
  let legend = svg.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${width - margin.right - 150}, ${margin.top})`);

  // Add legend title
  legend.append('text')
    .attr('x', 0)
    .attr('y', -10)
    .style('font-size', '14px')
    .style('font-weight', 'bold');

  // Add legend items
  let legendItems = legend.selectAll('.legend-item')
    .data(['No Stroke', 'Stroke'])
    .enter().append('g')
    .attr('class', 'legend-item')
    .attr('transform', (d, i) => `translate(0, ${i * 20})`);

  legendItems.append('rect')
    .attr('x', 70)
    .attr('y', -35)
    .attr('width', 10)
    .attr('height', 10)
    .attr('fill', (d, i) => i === 0 ? 'pink' : 'darkblue');

  legendItems.append('text')
    .attr('x', 86)
    .attr('y', -25)
    .style('font-size', '12px')
    .text(d => d);

  saveSvgAsPng(document.getElementsByTagName("svg")[0], "plot.png");
  d3.select("#download")
.on('click', function(){
    // Get the d3js SVG element and save using saveSvgAsPng.js
    saveSvgAsPng(downloads.getElementsByTagName("svg")[0], "plot.png", {scale: 2, backgroundColor: "#FFFFFF"});
})
});
