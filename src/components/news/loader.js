import React, { Component } from 'react'
import {Card,Badge,Button,Modal,Toast} from 'antd-mobile'
import axios from '../../http'
import Tloader from 'react-touch-loader'
import './tab.css'

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
// 资讯或头条模板
const NewsOrTopCom=(props)=>{
    const {list}=props
    let newsTemplate=list.map((item,i)=>{
        return (
            <Card key={i}>
            <Card.Header
            thumb={`http://127.0.0.1:8086/public/${i+1}.png`}
            thumbStyle={thumbStyle}
            extra={
                <div>
                <Badge text={item.info_title} style={badgeStyle} />
                <Badge text={item.info_type} style={badgeStyle} />
                </div>
            }
            />
        </Card>
        )
    })
    return <div>{newsTemplate}</div>
} 
// 问答模板
const AnswerCom=(props)=>{
    const {list}=props
    const prompt=Modal.prompt
    let answerComTemplate=list.map((item,i)=>{
        return (
            <Card full key={i}>
            <Card.Body>
            <div>{item.question_name}</div>
            </Card.Body>
            <Card.Footer
            content={item.question_tag}
            extra={
                <div>
                <Badge text={item.question_tag} style={badgeStyle} />
                <Badge text={item.answer_content} style={badgeStyle} />
                </div>
            }
            />
            </Card>
        )
    })
    // 点击展示模态框
    const showModal=()=>{
     prompt('输入内容', '',
    [
      {
        text: 'Close',
        onPress: value =>console.log('关闭----')
      },
      {
        text: 'Hold on',
        onPress: async value => {
          const res=await axios.post(`infos/question`,{
            question:value
          })
          console.log(res)
        }
      }
    ], 'default', null, ['请输入留言内容']
    )
  }
    return (<div>{[<Button icon="check-circle-o" size="small" type="ghost" key="btn" onClick={showModal}>
    小留言
  </Button>,...answerComTemplate]}</div>)
}
class Loader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pagenum:0,
      pagesize:2,
      type:1,
      list:[],
      total:0,
      hasMore:1,
      initializing:1
    }
  }
  getData=async ()=>{
    const {
        data:{
            list:{data,total}
        }
    }= await axios.post('infos/list',{
        pagenum:this.state.pagenum,
        pagesize:this.state.pagesize,
        type:this.state.type
    })
    this.setState({
        list:data,
        total
    },()=>{
    })
    return data;
  }
  //下拉刷新
  refresh=(resolve)=>{
    //下拉刷新是第一次刷新时pagenum=0,获取最新数据,
    this.setState({
        pagenum:0
    },()=>{
        this.getData()
       //停止 
        resolve()
    })
  }
  //加载更多
  loadMore=(resolve)=>{
      //实现原理点击加载更多,发送请求,新的pagenum发请求,发完请求之后,把新的list和旧的list整合一下,就形成新的列表
    this.setState({
        pagenum:this.state.pagenum+this.state.pagesize
    },async ()=>{
        const oldArr=this.state.list
        const newArr=await this.getData()
        // hasMore是控制是否显示刷新和点击加载的东西,默认是显示,判断什么情况下它会不显示,当pagenum<total this.state.pagesize时,
        this.setState({
            list:[...oldArr,...newArr],
            hasMore:this.state.pagenum>0&&this.state.pagenum<this.state.total-this.state.pagesize
        },()=>{
            resolve()
        })
    })
  }
  componentDidMount(){
      const {type}=this.props
      this.setState({
          type
      },()=>{
          this.getData()
      })
  }
  render() {
    return (
        <div>
        <Tloader
          onRefresh={this.refresh}
          onLoadMore={this.loadMore}
          hasMore={this.state.hasMore}
          initializing={this.state.initializing}
        >
          {/* <自定义组件-></自定义组件->> */}
          {this.state.type !== 3 ? (
            <NewsOrTopCom list={this.state.list} />
          ) : (
            <AnswerCom list={this.state.list} />
          )}
        </Tloader>
      </div>
    )
  }
}

export default Loader