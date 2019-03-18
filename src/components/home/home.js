import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
import Main from '../main/main'
import News from '../news/news'
import Chat from '../chat/chat'
import Mine from '../mine/mine'
import './home.css'
import TabBarDataFromJson from './tabbardata.json'



class Home extends Component{
  constructor(props){
    super(props)
    this.state={
      selectedTab: 'blueTab',
      hidden: false,
    }
  }
  renderContent = () => {
    let selectedTab=this.state.selectedTab
    if(selectedTab==='blueTab'){
      return (<div><Main/></div>)
    }else if(selectedTab==='redTab'){
      return (<div><News /></div>)
    }else if(selectedTab==='greenTab'){
      return (<div><Chat /></div>)
    }else if(selectedTab==='yellowTab'){
      return (<div> <Mine /></div>)
    }
  }

  render() {
    // 封装tabdata的遍历函数
    let TabBarItemsTemplate=TabBarDataFromJson.TabBarItemsData.map((item,i)=>{
      return (
        <TabBar.Item
        title={item.title}
        key={item.key}
        icon={
          <div
          style={{
            width: '22px',
            height: '22px',
            background:`${item.icon_bg_url}`
          }}
        />
        }
        selectedIcon={
          <div
            style={{
              width: '22px',
              height: '22px',
              background:`${item.sele_bg_url}`
            }}
          />
        }
        selected={this.state.selectedTab ===item.selectedTab}
        onPress={() => {
          this.setState({
            selectedTab: item.selectedTab
          })
        }}
      >
        {this.renderContent()}
      </TabBar.Item>
      )
    })
    return (
      <div>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
          tabBarPosition="bottom"
        >
        {/* tab页面渲染模板 */}
        {TabBarItemsTemplate}
         
          
        </TabBar>
      </div>
    )
  }
}

export default Home
