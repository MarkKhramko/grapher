import React, { Component } from "react";
import ReactDOM from 'react-dom';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import{
	FUNCTION_ONE,
	FUNCTION_TWO
} from '../constants/ExpressionsConstants';

import {
  getFuncName
} from '../utils/ExpressionService';

export default class FuncSelector extends Component {

	constructor(props){
		super(props);

		this.state = {
			selectedFunction: props.selectedFunction,
			labelWidth: 0
		};
	}

	componentDidMount() {
		const labelWidth = ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth;

		this.setState({
			labelWidth
		});
	}

	_handleChange(event){
		const{
			onChange
		}=this.props;

		const selectedFunction = event.target.value;
		this.setState({ selectedFunction });

		if (!!onChange){
			onChange(selectedFunction);
		}
	}

	_renderOptions(selectedFunction){
		const options = [];//[ <option value=""/> ];

		const funcConsts = [
			(FUNCTION_ONE === selectedFunction ? FUNCTION_ONE : FUNCTION_TWO),
			(FUNCTION_TWO === selectedFunction ? FUNCTION_ONE : FUNCTION_TWO)
		];

		for (let i=0; i < funcConsts.length; i++){
			const func = funcConsts[i];
			const funcName = getFuncName(func);

			const option = (
				<option
					key={ i }
					id={ i }
					value={ func }
				>
						{ funcName }
				</option>
			);
			options.push(option);
		}

		return options;
	}

	render(){
		const{
			selectedFunction,
			labelWidth
		}=this.state;

		const funcName = getFuncName(selectedFunction);

		return(
			<div className="half-width-block top-margin-1px bottom-margin-1x">
				<FormControl
					variant="outlined"
					className="select-field"
				>
					<InputLabel
						ref={ref => {
			            	this.InputLabelRef = ref;
			            }}
			            htmlFor="func-selector"
			        >
						Функция
					</InputLabel>
					<Select
						native
						value={ funcName }
						onChange={ this._handleChange.bind(this) }
						input={ 
							<OutlinedInput
								id="func-selector"
								name="func"
								labelWidth={ labelWidth }
							/>
						}
					>
						{ this._renderOptions(selectedFunction) }
					</Select>
				</FormControl>
			</div>
		)
	}
}