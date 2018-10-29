import React, { Component } from 'react'
import PropTypes from "prop-types"
import * as d3 from "d3";

class ProgressArc extends Component {

    componentDidMount(){
        const  context = this.setContext();
        this.setBackground(context);
        this.setForeground(context);
    }

    radius = Math.min(this.props.width, this.props.height) / 2;

    setContext(){
        const { height, width, id } = this.props;
        return d3.select(this.refs.arc)
            .append('svg')
            .attr('height', height)
            .attr('width', width)
            .attr('id', id)
            .append('g')
            .attr('transform',`translate(${height / 2}, ${width / 2})`);
    }

    setBackground(context){
        return context.append('path')
            .datum({ endAngle: this.tau })
            .style('fill', this.props.backgroundColor)
            .attr('d', this.arc());
    }

    setForeground(context) {
        return context.append('path')
            .datum({ endAngle: this.tau * this.props.percentComplete})
            .style('fill', this.props.foregroundColor)
            .attr('d', this.arc())
    }

    /*
        We’re defining tau as 2π here. D3 uses radians to measure arc length,
        which is fine, except most datasets don’t come in terms of radians, and to keep
        things simple, we’ll use tau as a way to quickly convert radians to percent. All
        you really need to know about this is that the circumference of any circle is equal
        to 2 x π. We can then multiply tau by a percentage and get a visualization that
        matches our expectations. (If I pass in 0.50, I should expect to see the path be a semi-circle.)
    */
    tau = Math.PI * 2;
    arc() {
        return d3.arc()
            .innerRadius(this.radius * this.props.donut)
            .outerRadius(this.radius - 1)
            .cornerRadius((this.radius - (this.radius * this.props.donut))*this.props.cornerRadius)
            .startAngle(0)
    }

  render() {
      console.log(this.radius);
      console.log((this.radius - (this.radius * this.props.donut))*0.9);
    return (
      <div ref="arc">
      </div>
    )
  }
}

ProgressArc.propTypes = {
    id: PropTypes.string,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    donut: PropTypes.number.isRequired,
    cornerRadius: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    foregroundColor: PropTypes.string.isRequired,
    percentComplete: PropTypes.number.isRequired
}

export default ProgressArc