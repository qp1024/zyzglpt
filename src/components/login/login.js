import React, { Component } from 'react'
import {
  NavBar,
  Icon,
  Flex,
  WingBlank,
  WhiteSpace,
  List,
  Button,
  InputItem,
  Toast
} from 'antd-mobile'
import axios from '../../http'
import 'antd-mobile/dist/antd-mobile.css'
import './login.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uname: '',
      pwd: ''
    }
  }
  changeValue = (k, v) => {
    // console.log(k, v)
    this.setState({
      [k]: v
    })
  }
  handleLogin = async () => {
    const body = this.state
    // console.log(body)
    const { history } = this.props

    const res = await axios.post(`users/login`, body)
    // console.log(res)
    const { meta, data } = res
    if (meta.status === 200) {
      //保存token
      localStorage.setItem('token',data.token)
      localStorage.setItem('uid',data.uid)
      // 进入home
      history.push('/')
    } else {
      // 提示
      Toast.fail(meta.msg, 1)
    }
  }

  render() {
    return (
      <Flex direction="column" justify="center">
        <Flex.Item>
          {/* 标题 */}
          {/* <WhiteSpace size="lg" /> */}
            <NavBar mode="dark">登录</NavBar>    
        </Flex.Item>
        <Flex.Item>
          <WhiteSpace size="lg" />

          {/* 表单 */}
          <List>
            <WingBlank>
              <InputItem
               placeholder='请输入用户名...'
                value={this.state.uname}
                onChange={v => {
                  this.changeValue('uname', v)
                }}
              >
                姓名
              </InputItem>
              <InputItem
                  placeholder='请输入密码...'
                 type="password"
                value={this.state.pwd}
                onChange={v => {
                  this.changeValue('pwd', v)
                }}
              >
                密码
              </InputItem>
            </WingBlank>
            <WhiteSpace size="lg" />
            {/* 提交按钮 */}
            <WingBlank>
              <Button
                onClick={this.handleLogin}
                type="primary"
                style={{ marginTop: '4px' }}
              >
                登录
              </Button>
            </WingBlank>
          </List>
        </Flex.Item>
      </Flex>
    )
  }
}

export default Login
