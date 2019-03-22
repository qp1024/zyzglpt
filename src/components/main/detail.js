import React, { Component } from 'react'
import { 
NavBar,
Icon,
Card,
Badge,
NoticeBar,
WingBlank,
} from 'antd-mobile'
import {List} from 'react-virtualized'
import axios from '../../http'
const badgeStyle = {
    marginLeft: 12,
    padding: '0 3px',
    backgroundColor: '#fff',
    borderRadius: 2,
    color: '#f19736',
    border: '1px solid #f19736'
  }
  const thumbStyle = {
    width: '125px',
    height: '95px'
  }
class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
        text:'',
        data:[],
        W:375,
        H:667
    }
  }
  //回到main.js
  backToMain=()=>{
      const {history}=this.props
      history.goBack()
  }
  componentDidMount =async()=>{
    const W=document.documentElement.clientWidth
    const H=document.documentElement.clientHeight
    const {
        text,
        id:home_type
    }=this.props.history.location.state.query.params

    const {data}=await axios.post(`homes/list`,{
        home_type
    })
    this.setState({
        text,
        data,
        W,
        H
    })
  }
  rowRenderer=({
      index
  })=>{
      const item=this.state.data[index]
      return (
        <Card key={index}>
        <Card.Header
          thumb={`http://127.0.0.1:8086/public/${index+1}.png`}
          thumbStyle={thumbStyle}
          extra={
            <div>
              <Badge text={item.home_name} style={badgeStyle} />
              <Badge text={item.home_price} style={badgeStyle} />
              <Badge text={item.home_desc} style={badgeStyle} />
              <Badge text={item.home_tags} style={badgeStyle} />
            </div>
          }
        />
      </Card>
      )
  }
  render() {
    // let detailTemplate = this.state.data.map((item, i) => {
    //     return (
    //       <Card key={i}>
    //         <Card.Header
    //           thumb="http://127.0.0.1:8086/public/home.png"
    //           thumbStyle={thumbStyle}
    //           extra={
    //             <div>
    //               <Badge text={item.home_name} style={badgeStyle} />
    //               <Badge text={item.home_price} style={badgeStyle} />
    //               <Badge text={item.home_desc} style={badgeStyle} />
    //               <Badge text={item.home_tags} style={badgeStyle} />
    //             </div>
    //           }
    //         />
    //       </Card>
    //     )
    //   })
      return (
        <div>
            {/* {NavBar导航} */}
            <NavBar
            // mode='light'
            icon={<Icon type="left"/>}
            onLeftClick={this.backToMain}
            >
            {this.state.text}
            </NavBar>
            <List
          width={this.state.W}
          height={this.state.H}
          rowCount={this.state.data.length}
          rowHeight={200}
          rowRenderer={this.rowRenderer}
        />
        ,
        </div>
      )
    }     
}

export default Detail