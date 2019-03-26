import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';

import{
	FUNCTION_ONE,
	FUNCTION_TWO
} from '../constants/ExpressionsConstants';

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

	_getParametersLabels(selectedFunction){

		const a = "Прибыль";
		const b = "Инвестиции";
		let c;

		switch(selectedFunction){
			case FUNCTION_ONE:{
				c = "Ставка дисконт.";
				break;
			}
			case FUNCTION_TWO:{
				c = "Горизонт план.";
				break;
			}
			default:
				break;
		}

		return [a, b, c];
	}

	render() {
		const{
			selectedFunction
		}=this.props;

		const{
			a,
			b,
			c
		}=this.state;

		const [labelA, labelB, labelC] = this._getParametersLabels(selectedFunction);

		return (
			<div className="half-width-block bottom-margin-1x">
				<div className="param-field-container">
					<TextField
						id="a"
						label={ labelA }
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
						label={ labelB }
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
						label={ labelC }
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