import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { 
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  ReferenceLine
} from 'recharts';

import Fab from '@material-ui/core/Fab';
import ArrowUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Icon from '@material-ui/core/Icon';

const RANGE = 10;

class HomeScreen extends Component {

  constructor(props){
    super(props);

    this.state={
      zoomScale: 1,
      xOffset: 0,
      yOffset: 0,

      data:[],

      params: {
        a: 0,
        b: 0,
        c: 0
      }
    };

    this.zoomTimer = null;
  }

  componentDidMount(){
    this._countData();
  }

  /* Interactions */
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

  _doTheCount(zoomScale, xOffset, yOffset){
    const data = [];
    for (let i = -RANGE; i <= RANGE; i += 1){
      const x = i + xOffset;
      const data1 = Math.pow(x, 2) * zoomScale;//Math.pow(mainParam, 2) - 10;
      const xName = x * zoomScale;//Math.round(mainParam)/10;//(i % 200) === 0 ? `${i}` : "";

      data.push({
        data1,
        xName
      });
    }

    return data;
  }

  async _countData(){
    const{
      zoomScale,
      xOffset,
      yOffset
    }=this.state;
    const data = await this._doTheCount(zoomScale, xOffset, yOffset);
    this.setState({ data });
  }

  /* Render */
  _renderChartControlButtons(){
    return(
      <div>
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
      <div>
        
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
      xOffset,
      yOffset,
      params
    }=this.state;

    const domainY = [-RANGE + yOffset, RANGE + yOffset];
    const domainX = [-RANGE + xOffset, RANGE + xOffset];

    return (
      <div>
        <LineChart 
          width={ windowWidth * 0.95 }
          height={ windowHeight * 0.78 }
          data={ data }
          stackOffset="sign"
          onClick={ this._handleChartClick.bind(this) }
          onMouseMove={ this._handleChartMove.bind(this) }
        >
          <XAxis
            dataKey="xName"
            tick={true}
            domain={['dataMin -5', 'dataMax + 5']}
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
        </LineChart>

        { this._renderChartControlButtons() }
        { this._renderParameterControls(windowWidth, params) }
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