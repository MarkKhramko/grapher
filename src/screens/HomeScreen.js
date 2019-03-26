import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  sine,
  selectFunc,
  getFuncName
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

import{
  FUNCTION_ONE,
  FUNCTION_TWO
} from '../constants/ExpressionsConstants';

import ChartDot from '../components/ChartDot';
import ChartControls from '../components/ChartControls';
import FuncSelector from '../components/FuncSelector';
import NPV_T_Display from '../components/NPV_T_Display';
import NPV_R_Display from '../components/NPV_R_Display';
import ParametersControls from '../components/ParametersControls';

const RANGE = 200;

class HomeScreen extends Component {

  constructor(props){
    super(props);

    const localParamA = localStorage.getItem("a");
    const localParamB = localStorage.getItem("b");
    const localParamC = localStorage.getItem("c");

    const selectedFunction = localStorage.getItem("selectedFunction") || FUNCTION_ONE;

    this.state={
      zoomScale: 0.25,
      xOffset: 0,
      yOffset: 0,

      data:[],

      params: {
        a: !!localParamA ? localParamA : 1,
        b: !!localParamB ? localParamB : 1,
        c: !!localParamC ? localParamC : 1
      },

      selectedFunction,

      measureLineIsVisible: selectedFunction === FUNCTION_ONE,
      measureLineX: 0,
      measureLineY: 0,

      funcResults:{
        PP: 0,
        IRR: 0
      }
    };

    this.zoomTimer = null;
    this.lineChart = null;
  }

  componentDidMount(){
    this._countData();
  }

  /* Operations */
  _countChartPoints(zoomScale, xOffset, yOffset, selectedFunction, params){
    const a = params.a;
    const b = params.b;
    const c = params.c;

    const pointStart = selectedFunction === FUNCTION_ONE ? -RANGE : 0;

    // Add all chart points to array
    const data = [];
    for (let i = pointStart; i <= RANGE; i += 0.2){

      const x = i * zoomScale;
      const xName = x;

      const func = selectFunc(selectedFunction);
      const data1 = func(x, a, b, c);

      data.push({
        data1,

        xName
      });
    }

    return data;
  }

  _countDomains(xOffset, yOffset, zoomScale){
    const domainX = [
      (-RANGE + xOffset) * zoomScale,
      (RANGE + xOffset) * zoomScale
    ];

    const domainY = [
      (-RANGE + yOffset) * zoomScale,
      (RANGE + yOffset) * zoomScale
    ];

    return [
      domainX,
      domainY
    ];
  }

  _countMeasureLineY(measureLineX, params){
    const selectedFunc = selectFunc(FUNCTION_ONE);
    const measureLineY = parseFloat(selectedFunc(measureLineX, params.a, params.b, params.c).toFixed(3));

    return measureLineY;
  }

  _countPP(params){

    const a = params.a;
    const b = params.b;
    const c = params.c;
    const func = selectFunc(FUNCTION_ONE);

    for (let x = 0; x <= RANGE; x += 0.001){
      const y = func(x, a, b, c);

      if (y > -0.01 && y < 0.01){
        return x.toFixed(3);
      }
      else if (y > 0.01){
        break;
      }
    }

    return -1;
  }

  _countIRR(params){

    const a = params.a;
    const b = params.b;
    const c = params.c;
    const func = selectFunc(FUNCTION_TWO);

    for (let x = 0; x <= RANGE; x += 0.0001){
      const y = func(x, a, b, c);

      if (y < 0.01 && y > -0.01){
        return x.toFixed(3);
      }
      else if (y > -2 && y < -0.01){
        break;
      }
    }

    return -1;
  }

  async _countData(){
    const{
      zoomScale,
      xOffset,
      yOffset,
      selectedFunction,
      params,

      measureLineX
    }=this.state;

    const data = await this._countChartPoints(zoomScale, xOffset, yOffset, selectedFunction, params);
    const [domainX, domainY] = await this._countDomains(xOffset, yOffset, zoomScale);

    let PP = 0, IRR = 0;
    if (selectedFunction === FUNCTION_ONE){
      PP = await this._countPP(params);
    }
    else if (selectedFunction === FUNCTION_TWO){
      IRR = await this._countIRR(params);
    }

    const funcResults = {
      PP,
      IRR
    };

    const measureLineY = this._countMeasureLineY(measureLineX, params);

    this.setState({ 
      data,
      domainX,
      domainY,
      funcResults,

      measureLineY
    });
  }

  _setTimerForDataCount(){
    if(this.zoomTimer !== null)
      clearTimeout(this.zoomTimer);

    this.zoomTimer = setTimeout(()=>{
      this._countData();
    }, 10);
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

    this.setState({ xOffset });
    this._setTimerForDataCount();
  }

  _handleXMoveRight(){
    let xOffset = this.state.xOffset;
    xOffset -= 1;

    this.setState({ xOffset });
    this._setTimerForDataCount();
  }

  _handleYMoveUp(){
    let yOffset = this.state.yOffset;
    yOffset -= 1;
    
    this.setState({ yOffset });
    this._setTimerForDataCount();
  }

  _handleYMoveDown(){
    let yOffset = this.state.yOffset;
    yOffset += 1;

    this.setState({ yOffset});
    this._setTimerForDataCount();
  }

  _handleChartClick(e){
    return;
  }

  _handleChartMove(e){
    if (this.state.measureLineIsVisible && e !== null && this.lineChart !== null){
      const{
        domainX,
        zoomScale,
        xOffset,
        params
      }=this.state;

      const chartWidth = this.lineChart.props.width;

      const maxX = domainX[1];
      const minX = domainX[0] * (1 + 142/chartWidth);

      const chartX = e.chartX;
      const absoluteX = (chartX + 6)/chartWidth;
      const pointX = absoluteX * maxX + minX * (1-absoluteX);
      const measureLineX = parseFloat(pointX.toFixed(3));

      const measureLineY = this._countMeasureLineY(measureLineX, params);

      this.setState({ 
        measureLineX,
        measureLineY
      });
    }
  }

  _handleFuncSelect(newFunc){

    let zoomScale = 0.25;
    if (newFunc === FUNCTION_TWO){
      zoomScale = 0.0625;
    }

    const selectedFunction = newFunc;
    const measureLineIsVisible = selectedFunction === FUNCTION_ONE;
    const measureLineX = 0;
    const measureLineY = 0;

    this.setState({
      zoomScale,

      selectedFunction,
      measureLineIsVisible,

      measureLineX,
      measureLineY
    });
    // Save selected func
    localStorage.setItem("selectedFunction", selectedFunction);

    this._setTimerForDataCount();
  }

  /* Render */
  render() {
    const{
      windowWidth,
      windowHeight
    }=this.props;

    const{
      selectedFunction,

      data,
      domainX,
      domainY,
      params,

      measureLineIsVisible,
      measureLineX,
      measureLineY,

      funcResults
    }=this.state;

    return (
      <div>
        <LineChart
          ref={(r)=>{ this.lineChart = r;}}
          width={ windowWidth * 0.98 }
          height={ windowHeight * 0.68 }
          data={ data }
          stackOffset="sign"
          onClick={ this._handleChartClick.bind(this) }
          onMouseMove={ this._handleChartMove.bind(this) }
          className="chart bottom-margin-1x"
        >
          <XAxis
            dataKey="xName"
            tick={ true }
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
          <ReferenceLine y={0} stroke="#000" />
          <ReferenceLine x={0} stroke="#000" />
          { measureLineIsVisible ? 
            <ReferenceLine x={ measureLineX } stroke="#00aa99" />
            : ""
          }
          <ChartDot
            chartWidth={ !!this.lineChart ? this.lineChart.props.width : 0 }
            chartHeight={ !!this.lineChart ? this.lineChart.props.height : 0 }
            x={ measureLineX }
            y={ measureLineY }
          />
        </LineChart>
        <ChartControls
          onXMoveLeft={ this._handleXMoveLeft.bind(this) }
          onXMoveRight={ this._handleXMoveRight.bind(this) }
          onYMoveUp={ this._handleYMoveUp.bind(this) }
          onYMoveDown={ this._handleYMoveDown.bind(this) }
          onZoomIn={ this._handleZoomIn.bind(this) }
          onZoomOut={ this._handleZoomOut.bind(this) }
        />
        <FuncSelector
          selectedFunction={ selectedFunction }
          onChange={ this._handleFuncSelect.bind(this) }
        />
        <ParametersControls
          windowWidth={ windowWidth }
          params={ params }
          selectedFunction={ selectedFunction }
          onParamChange={ this._handleParamChange.bind(this) }
        />
        { selectedFunction === FUNCTION_ONE ?
          <NPV_T_Display
            x={ measureLineX }
            NPV={ measureLineY }
            PP={ funcResults.PP }
          />
          :
          <NPV_R_Display
            IRR={ funcResults.IRR }
          />
        }
      </div>
    );
  }
}

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