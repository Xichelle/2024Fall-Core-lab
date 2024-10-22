// Constants
const startYear = 1900;
const endYear = 2000;
const width = 5000;
const height = 150;
const margin = { top: 50, right: 30, bottom: 30, left: 50 };

// Create the SVG container for the timeline
const svg = d3.select("#timeline")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Set up the time scale for positioning points based on year
const timeScale = d3.scaleLinear()
  .domain([startYear, endYear])
  .range([0, width]);

// Fetch artworks for the selected year from the Met API
const fetchWorksForYear = (year) => {
  const apiUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects?dateBegin=${year}&dateEnd=${year}`;
  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => data.objectIDs || []);
};

// Fetch details for each work based on ID
const fetchWorkDetails = (id) => {
  const detailsUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
  return fetch(detailsUrl)
    .then(response => response.json())
    .then(data => ({
      title: data.title,
      culture: data.culture || 'Unknown',
      country: data.country || 'Unknown',
      artist: data.artistDisplayName || 'Unknown Artist',
      year: data.objectBeginDate || startYear // Use objectBeginDate to position along the timeline
    }));
};

// Color scale for different cultures or countries
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

// Update timeline and chart for selected year
const updateVisualization = async (year) => {
  const works = await fetchWorksForYear(year);
  const details = await Promise.all(works.slice(0, 50).map(fetchWorkDetails)); // Limit to 50 works for performance

  // Clear previous visualization
  svg.selectAll(".year-point").remove();

  // Group works by country
  const countryData = d3.rollup(details, v => v.length, d => d.country);

  // Create year points for the fetched details
  svg.selectAll(".year-point")
    .data(details)
    .enter()
    .append("circle")
    .attr("class", "year-point")
    // Spread points horizontally based on their creation year
    .attr("cx", d => timeScale(d.year))
    // Stagger points vertically to avoid overlap
    .attr("cy", (d, i) => (i % 10) * 25) // Stagger points in rows of 10
    .attr("r", 10)
    .attr("fill", (d, i) => colorScale(d.country))
    .on("mouseenter", function (event, d) {
      const detailsDiv = d3.select("#work-details");
      detailsDiv.style("display", "block")
        .html(`<strong>${d.title}</strong><br>Artist: ${d.artist}<br>Country: ${d.country}`)
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY + 10}px`);

      d3.select(this)
        .transition()
        .duration(200)
        .attr("r", 20); // Pop up effect on hover
    })
    .on("mouseleave", function () {
      d3.select("#work-details").style("display", "none");
      d3.select(this)
        .transition()
        .duration(200)
        .attr("r", 10); // Reset size
    });

  // Update the bar chart for countries
  updateCountryChart(countryData);
};

// Update bar chart showing number of works by country
const updateCountryChart = (countryData) => {
  const chartWidth = 600;
  const chartHeight = 400;
  const chartSvg = d3.select("#country-chart");
  const xScale = d3.scaleBand()
    .domain([...countryData.keys()])
    .range([0, chartWidth])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max([...countryData.values()])])
    .range([chartHeight, 0]);

  // Clear previous chart
  chartSvg.selectAll("*").remove();

  // Add bars
  chartSvg.selectAll(".chart-bar")
    .data([...countryData.entries()])
    .enter()
    .append("rect")
    .attr("class", "chart-bar")
    .attr("x", d => xScale(d[0]))
    .attr("y", d => yScale(d[1]))
    .attr("width", xScale.bandwidth())
    .attr("height", d => chartHeight - yScale(d[1]))
    .attr("fill", "steelblue");

  // Add X axis
  chartSvg.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(d3.axisBottom(xScale));

  // Add Y axis
  chartSvg.append("g")
    .call(d3.axisLeft(yScale));
};

// Handle year selection change
document.getElementById("year-select").addEventListener("input", function () {
  const selectedYear = +this.value;
  updateVisualization(selectedYear);
});

// Initialize visualization with default year
updateVisualization(1900);
