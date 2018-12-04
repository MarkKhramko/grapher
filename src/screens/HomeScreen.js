import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { 
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Icon from '@material-ui/core/Icon';

class HomeScreen extends Component {

  constructor(props){
    super(props);

    this.state={
      zoomScale: 20,
      data:[]
    };

    this.zoomTimer = null;
  }

  componentDidMount(){
    this._countData();
  }

  /* Interactions */
  _handleZoomIn(){
    let zoomScale = this.state.zoomScale;
    zoomScale += 1.25;
    this.setState({ zoomScale });

    this._setTimerForDataCount();
  }

  _handleZoomOut(){
    let zoomScale = this.state.zoomScale;
    zoomScale -= 1.25;
    this.setState({ zoomScale });

    this._setTimerForDataCount();
  }

  /* Perfomance */
  _setTimerForDataCount(){
    if(this.zoomTimer !== null)
      clearTimeout(this.zoomTimer);

    this.zoomTimer = setTimeout(()=>{
      this._countData();
    }, 100);
  }

  _doTheCount(zoomScale){
    const data = [];
    for(let i = -1000; i < 1000; i++){

      const mainParam = i / zoomScale;

      const data1 = Math.pow(mainParam, 2) - 10;
      const data2 = Math.pow(mainParam, 4);

      const xName = mainParam/10;//(i % 200) === 0 ? `${i}` : "";
      const yName = mainParam/5;

      data.push({
        data1,
        data2,
        xName,
        yName
      });
    }

    return data;
  }

  async _countData(){
    console.log('Count');
    const{ zoomScale }=this.state;
    const data = await this._doTheCount(zoomScale);
    this.setState({ data });
  }

  /* Render */
  _renderZoomButtons(){
    return(
      <div>
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

  render() {
    const{
      windowWidth,
      windowHeight
    }=this.props;
    const{
      data
    }=this.state;

    return (
      <div>
        <LineChart width={ windowWidth * 0.7 } height={ windowHeight * 0.78 } data={ data } stackOffset="sign">
          <XAxis dataKey="xName"/>
          <YAxis dataKey="yName"/>
          <CartesianGrid stroke="#ddd" strokeDasharray="5 5"/>
          <Line type="monotone" dataKey="data1" stroke="#8884d8" isAnimationActive={false} dot={false}/>
          <Line type="monotone" dataKey="data2" stroke="#8800d8" isAnimationActive={false} dot={false}/>
        </LineChart>

        { this._renderZoomButtons() }
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