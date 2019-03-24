import React, { Component } from 'react'
import { NavBar } from 'antd-mobile'
import axios from '../../http'
import './chat.css'
import Chatwindow from './chatwindow'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      isShow: false,
      item: {}
    }
  }
  componentDidMount = async () => {
    const {
      data: { list }
    } = await axios.post(`chats/list`)
    this.setState({
      list
    })
  }
  showChatwindow = item => {
    // const { history } = this.props
    // history.push('/chatwindow')--->希望true->chatwindow.js显示

    // 改的是列表自己的state->true->>>>>?显示chatwindow-><Chatwindow/>
    this.setState({
      isShow: true,
      item
    })
  }
  render() {
    const listContet = this.state.list.map(item => {
      // console.log(item)
      let getLocalTime=(n)=>{
        return new Date(parseInt(n) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
      }
      return (
        <li key={item.id} onClick={this.showChatwindow.bind(this, item)}>
          <div className="avarter">
            <img src={item.avatar} alt="avarter" />
            <span className="name">{item.username}</span>
            <span className="info">{item.chat_msg}</span>
            <span className="time">{getLocalTime(item.ctime)}</span>
          </div>
        </li>
      )
    })
    return (
      <div>
        {this.state.isShow ? (
          <Chatwindow
            // username={this.state.username}
            item={this.state.item}
            isShow={this.state.isShow}
            cb={isShow => {
              this.setState({
                isShow
              })
            }}
          />
        ) : (
          <div>
            <NavBar>
              <span>{this.props.title}</span>
            </NavBar>
            <div className="chat-list">
              <ul>{listContet}</ul>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Chat
