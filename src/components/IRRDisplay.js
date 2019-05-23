import React, { Component } from "react";

import TextField from '@material-ui/core/TextField';

export default class IRRDisplay extends Component {

	render(){
		const{
			IRR
		}=this.props;

		const type = IRR === -1 ? "text" : "number";
		const value = IRR === -1 ? "Нет реш." : IRR;

		return(
			<div className="full-width-block bottom-margin-1x">
				<div className="param-field-container">
					<TextField
						label="Внутренняя норма доходности"
						value={ value }
						type={ type }
						InputLabelProps={{
							shrink: true,
						}}
						className="param-field wide"
						margin="normal"
						variant="outlined"
						readOnly
					/>
				</div>
			</div>
		);
	}
}