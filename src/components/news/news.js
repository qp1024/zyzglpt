import React, { Component } from 'react'
import {NavBar,Tabs} from 'antd-mobile'
import Loader from './loader'
import './news.css'
class News extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabs:[{title:'资讯'},{title:'头条'},{title:'问答'}]
    }
  }
  changeTab=(tabData,index)=>{
    this.tabOne(index+1)
  }
  tabOne=(index)=>{
    return <Loader type={index}/>
  }
  render() {
    return (
      <div className="news">
       <NavBar
    >{this.props.title}</NavBar>
      <Tabs tabs={this.state.tabs}
        initalPage={0}
        animated={false}
        useOnPan={false}
        onChange={this.changeTab}
      >
      {this.tabOne(1)}
      {this.tabOne(2)}
      {this.tabOne(3)}
      </Tabs>
    </div>
    )
  }
}

export default News
