import React, { Component } from "react";

import TextField from '@material-ui/core/TextField';

export default class NPV_R_Display extends Component {

	render(){
		const{
			IRR
		}=this.props;

		return(
			<div className="full-width-block bottom-margin-1x">
				<div className="param-field-container">
					<TextField
						label="IRR"
						value={ IRR }
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