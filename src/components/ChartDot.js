import React, { Component } from "react";

export default class ChartDot extends Component {

	render(){
		const{
			chartWidth,
			chartHeight,

			x,
			y
		}=this.props;

		const r = 5;

		const cx = x * 5; //- r/2;
		const cy = y; //- r/2;

		console.log({
			cx,
			cy
		});

		return(
			<circle
				cx={ cx }
				cy={ cy }
				r={ r }
				stroke="black"
				strokeWidth={ 3 }
				fill="#ff84d8"
			/>
		);
	}
}