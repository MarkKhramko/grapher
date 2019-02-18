import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  sine,
  func1,
  func2_t_t,
  func2_t_5,
  func2_t_10
} from '../utils/ExpressionService';

import { 
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  ReferenceLine,
} from 'recharts';

import Fab from '@material-ui/core/Fab';
import ArrowUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import ParametersControls from '../components/ParametersControls';

const RANGE = 60;

class HomeScreen extends Component {

  constructor(props){
    super(props);

    const localParamA = localStorage.getItem("a");
    const localParamB = localStorage.getItem("b");
    const localParamC = localStorage.getItem("c");

    this.state={
      zoomScale: 0.25,
      xOffset: 0,
      yOffset: 0,

      data:[],

      params: {
        a: !!localParamA ? localParamA : 1,
        b: !!localParamB ? localParamB : 1,
        c: !!localParamC ? localParamC : 1
      }
    };

    this.zoomTimer = null;
  }

  componentDidMount(){
    this._countData();
  }

  /* Interactions */
  _handleParamChange(paramKey, value){
    const params = {...this.state.params};
    params[paramKey] = value;
    this.setState({ params });
    this._setTimerForDataCount();

    localStorage.setItem(paramKey, value);
  }

  _handleZoomIn(){
    let zoomScale = this.state.zoomScale;
    zoomScale = zoomScale / 2;
    this.setState({ zoomScale });
    this._setTimerForDataCount();
  }

  _handleZoomOut(){
    let zoomScale = this.state.zoomScale;
    zoomScale = zoomScale * 2;
    this.setState({ zoomScale });
    this._setTimerForDataCount();
  }

  _handleXMoveLeft(){
    let xOffset = this.state.xOffset;
    xOffset += 1;

    this.setState({ 
      xOffset
    });

    this._setTimerForDataCount();
  }

  _handleXMoveRight(){
    let xOffset = this.state.xOffset;
    xOffset -= 1;

    this.setState({ 
      xOffset
    });

    this._setTimerForDataCount();
  }

  _handleYMoveUp(){
    let yOffset = this.state.yOffset;
    yOffset -= 1;
    
    this.setState({
      yOffset
    });

    this._setTimerForDataCount();
  }

  _handleYMoveDown(){
    let yOffset = this.state.yOffset;
    yOffset += 1;

    this.setState({
      yOffset
    });

    this._setTimerForDataCount();
  }

  _handleChartClick(e){
    console.log({ e });
  }

  _handleChartMove(e){
    // console.log({ e });
  }

  /* Perfomance */
  _setTimerForDataCount(){
    if(this.zoomTimer !== null)
      clearTimeout(this.zoomTimer);

    this.zoomTimer = setTimeout(()=>{
      this._countData();
    }, 10);
  }

  _doTheCount(zoomScale, xOffset, yOffset, params){
    const a = params.a;
    const b = params.b;
    const c = params.c;

    const data = [];
    for (let i = -RANGE; i <= RANGE; i += 1){

      const x = (i + xOffset) * zoomScale;
      const data1 = func1(x, a, b, c);
      const xName = x;

      // data2
      const data2 = func2_t_5(x, a, b, c);

      data.push({
        data1,
        data2,

        xName
      });
    }

    return data;
  }

  async _countData(){
    const{
      zoomScale,
      xOffset,
      yOffset,
      params
    }=this.state;

    const data = await this._doTheCount(zoomScale, xOffset, yOffset, params);
    this.setState({ data });
  }

  /* Render */
  _renderChartControlButtons(){
    return(
      <div className="full-width-block bottom-margin-1x">
        <Fab 
          color="primary"
          aria-label="X +"
          onClick={ this._handleXMoveLeft.bind(this) }
        >
          <ArrowLeftIcon/>
        </Fab>
        <Fab 
          color="primary"
          aria-label="X -"
          onClick={ this._handleXMoveRight.bind(this) }
        >
          <ArrowRightIcon/>
        </Fab>
        
        <Fab 
          color="primary"
          aria-label="Y +"
          onClick={ this._handleYMoveUp.bind(this) }
        >
          <ArrowUpIcon/>
        </Fab>
        <Fab 
          color="primary"
          aria-label="Y -"
          onClick={ this._handleYMoveDown.bind(this) }
        >
          <ArrowDownIcon/>
        </Fab>

        <Fab 
          color="primary"
          aria-label="Увеличить масштаб"
          onClick={ this._handleZoomIn.bind(this) }
        >
          <AddIcon/>
        </Fab>
        <Fab 
          color="primary"
          aria-label="Уменьшить масштаб"
          onClick={ this._handleZoomOut.bind(this) }
        >
          <RemoveIcon/>
        </Fab>
      </div>
    );
  }

  _renderParameterControls(windowWidth, params){
    return(
      <div className="full-width-block bottom-margin-1x">
        { windowWidth }
      </div>
    );
  }

  render() {
    const{
      windowWidth,
      windowHeight
    }=this.props;

    const{
      data,
      zoomScale,
      xOffset,
      yOffset,
      params
    }=this.state;

    const domainY = [
      (-RANGE + yOffset) * zoomScale,
      (RANGE + yOffset) * zoomScale
    ];
    const domainX = [
      (-RANGE + xOffset) * zoomScale,
      (RANGE + xOffset) * zoomScale
    ];

    return (
      <div>
        <LineChart 
          width={ windowWidth * 0.98 }
          height={ windowHeight * 0.78 }
          data={ data }
          stackOffset="sign"
          onClick={ this._handleChartClick.bind(this) }
          onMouseMove={ this._handleChartMove.bind(this) }
          className="chart bottom-margin-1x"
        >
          <XAxis
            dataKey="xName"
            tick={true}
            type="number"
            tickCount={ 8 }
            allowDataOverflow={ true }
            domain={ domainX }
          />
          <YAxis
            type="number"
            tickCount={ 5 }
            allowDataOverflow={ true }
            domain={ domainY }
          />
          <CartesianGrid
            stroke="#ddd"
            strokeDasharray="5 5"
          />
          <Line type="monotone" dataKey="data1" stroke="#8884d8" isAnimationActive={false} dot={false}/>
          <Line type="monotone" dataKey="data2" stroke="#ff84d8" isAnimationActive={false} dot={false}/>
          <ReferenceLine y={0} stroke="#000" />
          <ReferenceLine x={0} stroke="#000" />
        </LineChart>

        { this._renderChartControlButtons() }
        <ParametersControls
          windowWidth={ windowWidth }
          params={ params }
          onParamChange={ this._handleParamChange.bind(this) }
        />
      </div>
    );
  }
}

// <Line type="monotone" dataKey="data2" stroke="#8800d8" isAnimationActive={false} dot={false}/>
function mapStateToProps(state) {
  return {
    windowWidth: state.windowReducer.width,
    windowHeight: state.windowReducer.height,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);