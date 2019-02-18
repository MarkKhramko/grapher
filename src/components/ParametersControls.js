import React, { Component } from "react";

import TextField from '@material-ui/core/TextField';

export default class ParametersControls extends Component {

	constructor(props){
		super(props);

		const params = props.params;

		this.state={
			a: params.a,
			b: params.b,
			c: params.c
		}
	}

	_handleParamChange(paramKey, value){
		const{
			onParamChange
		}=this.props;

		const newState = { ...this.state };
		newState[paramKey] = value;
		this.setState(newState);

		if (!!onParamChange){
			onParamChange(paramKey, value);
		}
	}

	render() {
		const{
			a,
			b,
			c
		}=this.state;

		return (
			<div className="full-width-block bottom-margin-1x">
				<div className="param-field-container">
					<TextField
						id="a"
						label="a"
						value={ a }
						onChange={ (e)=>{this._handleParamChange("a", e.target.value)} }
						type="number"
						InputLabelProps={{
							shrink: true,
						}}
						className="param-field"
						margin="normal"
						variant="outlined"
					/>
				</div>

				<div className="param-field-container">
					<TextField
						id="b"
						label="b"
						value={ b }
						onChange={ (e)=>{this._handleParamChange("b", e.target.value)} }
						type="number"
						InputLabelProps={{
							shrink: true,
						}}
						className="param-field"
						margin="normal"
						variant="outlined"
					/>
				</div>

				<div className="param-field-container">
					<TextField
						id="c"
						label="c"
						value={ c }
						onChange={ (e)=>{this._handleParamChange("c", e.target.value)} }
						type="number"
						InputLabelProps={{
							shrink: true,
						}}
						className="param-field"
						margin="normal"
						variant="outlined"
					/>
				</div>
			</div>
		);
	}
}