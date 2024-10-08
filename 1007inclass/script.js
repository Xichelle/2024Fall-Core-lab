console.log(d3)
const dataset = [25, 30, 45, 60, 20];

const svg = d3.select("body")
  .append("svg")
  .attr("width", 500)
  .attr("height", 100);

svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", (d, i) => i * 60)
  .attr("y", d => 100 - d)
  .attr("width", 50)
  .attr("height", d => d)
  .attr("fill", "teal");

// const svg = d3.select("body")
// 			.append("svg")
// 			.attr("width", 500)
// 			.attr("height", 500);
			// or you can write it like .attr("viewBox", [0, 0, 500, 500])

//             d3.selectAll("circle").style("fill", "blue");

// d3.select("svg")
//   .append("rect")
//   .attr("cx", 50)
//   .attr("cy", 50)
//   .attr("width", 40)
//   .attr("height",90)
//   .style("fill", "black");

// d3.select("svg")
//     .append("circle")
//     .attr("cx",70)
//     .attr("cy",100)
//     .attr("r", 15)
//     .style("fill", "blue");

// const data = [10, 20, 30, 40, 50];

// d3.select("svg")
//   .selectAll("circle")
//   .data(data)
//   .enter()
//   .append("circle")
//   .attr("cx", (d, i) => (i * 60) + 50)
//   .attr("cy", 50)
//   .attr("r", d => d)
//   .style("fill", "orange");