import React, { Component } from "react";

import TextField from '@material-ui/core/TextField';

export default class NPVDisplay extends Component {

	render(){
		const{
			x,
			NPV,
			PP
		}=this.props;

		return(
			<div className="full-width-block bottom-margin-1x">
				<div className="param-field-container">
					<TextField
						label="T"
						value={ x }
						type="number"
						InputLabelProps={{
							shrink: true,
						}}
						className="param-field"
						margin="normal"
						variant="outlined"
						readOnly
					/>
				</div>
				<div className="param-field-container">
					<TextField
						label="NPV"
						value={ NPV }
						type="number"
						InputLabelProps={{
							shrink: true,
						}}
						className="param-field"
						margin="normal"
						variant="outlined"
						readOnly
					/>
				</div>
				<div className="param-field-container">
					<TextField
						label="PP"
						value={ PP }
						type="number"
						InputLabelProps={{
							shrink: true,
						}}
						className="param-field"
						margin="normal"
						variant="outlined"
						readOnly
					/>
				</div>
			</div>
		);
	}
}