import React, { Component } from "react";

import Fab from '@material-ui/core/Fab';
import ArrowUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

export default class ChartControls extends Component {

	constructor(props){
		super(props);
	}

	render(){
		const{
			onXMoveLeft,
			onXMoveRight,
			onYMoveUp,
			onYMoveDown,
			onZoomIn,
			onZoomOut
		}=this.props;

		return(
			<div className="full-width-block bottom-margin-1x">
				<Fab 
				  color="primary"
				  aria-label="X +"
				  onClick={ onXMoveLeft }
				>
				  <ArrowLeftIcon/>
				</Fab>
				<Fab 
				  color="primary"
				  aria-label="X -"
				  onClick={ onXMoveRight }
				>
				  <ArrowRightIcon/>
				</Fab>

				<Fab 
				  color="primary"
				  aria-label="Y +"
				  onClick={ onYMoveUp }
				>
				  <ArrowUpIcon/>
				</Fab>
				<Fab 
				  color="primary"
				  aria-label="Y -"
				  onClick={ onYMoveDown }
				>
				  <ArrowDownIcon/>
				</Fab>

				<Fab 
				  color="primary"
				  aria-label="Увеличить масштаб"
				  onClick={ onZoomIn }
				>
				  <AddIcon/>
				</Fab>
				<Fab 
				  color="primary"
				  aria-label="Уменьшить масштаб"
				  onClick={ onZoomOut }
				>
				  <RemoveIcon/>
				</Fab>
			</div>
		);
	}
}