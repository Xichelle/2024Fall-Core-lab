const dataset = [25, 30, 45, 60, 20, 15, 33, 85, 66, 28];
const names = ['a', 'b', 'c', 'd', 'e','f','g','h','i','j'];

const svgWidth = 500, svgHeight = 300;
const margin = { top: 20, right: 30, bottom: 30, left: 40 };
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

// Create the SVG container
const svg = d3.select("#wrapper")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Define the scales
const x = d3.scaleBand()
  .domain(names)
  .range([0, width])
  .padding(0.1);

const y = d3.scaleLinear()
  .domain([0, d3.max(dataset)])
  .nice()
  .range([height, 0]);

const sequentialScale = d3.scaleSequential()
  .domain([0, d3.max(dataset)])
  .interpolator(d3.interpolateRainbow); // Artistic color scaling

// Create the bars
svg.selectAll(".bar")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", (d, i) => x(names[i]))  // Update to use name for positioning
  .attr("y", d => y(d))
  .attr("width", x.bandwidth())
  .attr("height", d => height - y(d))
  .attr("fill", d => sequentialScale(d))  // Use the color scale
  .on("mouseover", function(event, d) {
    // Show the image on hover
    d3.select("#hover-image")
      .style("display", "block")
      .style("left", `${event.pageX + 10}px`)
      .style("top", `${event.pageY - 50}px`);
  })
  .on("mousemove", function(event) {
    // Move the image with mouse
    d3.select("#hover-image")
      .style("left", `${event.pageX + 10}px`)
      .style("top", `${event.pageY - 50}px`);
  })
  .on("mouseout", function() {
    // Hide the image when mouse leaves
    d3.select("#hover-image")
      .style("display", "none");
  });

// Add the x-axis
svg.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(x));

// Add the y-axis
svg.append("g")
  .call(d3.axisLeft(y));
