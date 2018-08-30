import React, { Component } from 'react'
import { withFauxDOM } from 'react-faux-dom'

import * as d3 from 'd3'
import { max, min } from 'd3-array'
import { scaleLinear } from 'd3-scale'

import { connect } from 'react-redux'

class PopulationGraph extends Component {
  constructor(props) {
    super(props)

    this.animateChart = this.animateChart.bind(this)
    this.setupFauxDom = this.setupFauxDom.bind(this)

    this.state = {
      faux: null,
      handles: null
    }
  }

  componentDidMount() {
    this.setupFauxDom()
      .then(() => this.animateChart())
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data != this.props.data) {
      this.animateChart()
    }
  }

  setupFauxDom() {
    const faux = this.props.connectFauxDOM('svg', 'chart')

    const svgSize = [800, 600]

    const handles = {
      svg: d3.select(faux)
        .attr('width', svgSize[0])
        .attr('height', svgSize[1])
    }

    handles.g = handles.svg.append('g')
    handles.xAxis = handles.g.append('g')
    handles.yAxis = handles.g.append('g')
    handles.xScale = d3.scaleTime()
    handles.yScale = d3.scaleLinear()
    handles.line = d3.line()
    handles.path = handles.g.append("path")

    return new Promise((resolve, reject) => {
      this.setState({
        faux,
        handles
      }, resolve)
    })
  }

  animateChart() {
    const faux = this.props.faux
    const { svg, g, xAxis, yAxis, xScale, yScale, line, path } = this.state.handles

    const margin = { top: 20, right: 20, bottom: 30, left: 80 };

    const svgSize = [800, 600]
    const size = [svgSize[0] - margin.left - margin.right, svgSize[1] - margin.top - margin.bottom]

    svg.attr('width', svgSize[0])
      .attr('height', svgSize[1])

    const data = this.props.data

    data.map(e => { if (typeof e.year !== 'object') e.year = new Date(e.year, 1) })

    g.attr('transform', `translate(${margin.left},${margin.top})`)

    xScale.rangeRound([0, size[0]])
      .domain(d3.extent(data, d => d.year))

    yScale.rangeRound([size[1], 0])
      // .domain(d3.extent(data, d => d.population))
      .domain([0, max(data.map(d => d.population))])

    line.curve(d3.curveMonotoneX)
      .x(d => xScale(d.year))
      .y(d => yScale(d.population))

    // add xAxis and labels
    xAxis.attr('transform', `translate(0,${size[1]})`)
      .call(d3.axisBottom(xScale))
    // .select('.domain')
    // .remove();

    // add yAxis and labels
    yAxis.call(d3.axisLeft(yScale))

    // const yLabel = fleshedYAxis.selectAll('text')
    //   .data([1])
    //   .enter().append('text')

    // yLabel.attr('fill', '#000')
    //   .attr("transform", "rotate(-90)")
    //  .attr("y", 6)
    //  .attr("dy", "0.71em")
    //  .attr("text-anchor", "end")
    //  .text("Population");

    path.datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);


    this.props.drawFauxDOM()
  }

  render() {
    console.log(this.props.data);

    return (
      <div className="container" >
        <h1>Population</h1>
        {this.props.chart}
      </div>
    )
  }
}

function mapStateToProps({ popData }) {
  return {
    data: popData
  }
}

export default connect(mapStateToProps)(withFauxDOM(PopulationGraph))
