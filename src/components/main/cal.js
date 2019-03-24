import React, { Component } from 'react'
import {
  NavBar,
  Icon,
  Card,
  SegmentedControl,
  Tabs,
  Button,
  InputItem
} from 'antd-mobile'
const tabs = [
    { title: '公积金贷款' },
    { title: '商业贷款' },
    { title: '组合贷款' }
  ]
const titles = ['贷款方式', '贷款年限', '贷款利率']
const segValues = {
    0: ['按贷款总额', '按面积算'],
    1: ['10', '20', '30'],
    2: ['3.25', '9', '9.5']
  }

class Cal extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  //回到main.js
  backToMain=()=>{
      const {history}=this.props
      history.goBack()
  }
  componentDidMount =async()=>{
    
  }
  
  render() {
    const formTempalte = titles.map((item, i) => {
        return (
          <Card.Header
            key={i}
            title={item}
            extra={
              <SegmentedControl
                values={segValues[i]}
                onChange={this.onChange}
                onValueChange={this.onValueChange}
              />
            }
          />
        )
      })
      formTempalte.splice(
        1,
        0,
        <Card.Header
          key={'input'}
          title="贷款总额	"
          extra={<InputItem placeholder="0.00" extra="¥" />}
        />
      )
      return (
        <div>
        {/* 导航 */}
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.backToMain}
        >
          <span>贷款利率计算</span>
        </NavBar>

        {/* tab切换--link+route--tabber */}
        <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}>
          {/* 表单 */}
          <Card full>
            {formTempalte}
            <Button type="ghost" onClick={this.handleCal}>
              计算
            </Button>
          </Card>

          <div>2</div>
          <div>3</div>
        </Tabs>          
        </div>
      )
    }     
}

export default Cal