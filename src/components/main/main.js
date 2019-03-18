import React, { Component } from 'react'
import { Carousel,WingBlank,SearchBar,Grid,NoticeBar,Icon,Card, Badge} from 'antd-mobile'
import axios from '../../http'
//搜索框配置
// 轮播配置
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
class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imagesData:[],
      menuData:[],
      infoData: [],
      faqData:[],
      listData:[],
      listDataNew:[],
      imgHeight: 176,
      data: Array.from(new Array(8)).map((_val, i) => ({
        icon:
          'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: `name${i}`
      })),
     
    }
  }
  //发请求封装函数
  getHomeData=async (path)=>{
    const res=await axios.post(`${path}`)
    const {meta,data}=res
    if(meta.status===200){
      return data.list
    }
  }
  //封装一个数据处理的信息列表,把从后台传过来的数据截取为想要的格式
  fn(arr,...rest){
    let temp=[];
    for(let i=0;i<rest.length;i++){
     temp.push(arr.splice(0,rest[i]))
    }
    return temp
  }
  // 轮播图发请求,发过请求之后把数据接收遍历,然后赋值给模板
  componentDidMount= async ()=> {
    // 走马灯发请求
    let imagesData =this.getHomeData(`homes/swipe`)
    //grid九宫格
    let menuData=this.getHomeData(`homes/menu`)
    //通知栏信息
    let infoData=this.getHomeData(`homes/info`)
    //通知栏问答
    let faqData=this.getHomeData(`homes/faq`)
    //list长列表
    let listData=this.getHomeData(`homes/house`)
    const dataList=await Promise.all([imagesData,menuData,infoData,faqData,listData])
    this.setState({
      imagesData:dataList[0],
      menuData:dataList[1],
      infoData:dataList[2],
      faqData:dataList[3],
      listData:dataList[4]
    },()=>{
      let data=this.state.menuData.map((item,i)=>{
        return {
          icon:`http://127.0.0.1:8086/public/0${i+1}.png`,
          text: item.menu_name
        }
      })
      let listDataNew=this.fn(this.state.listData,2,2,3)
      this.setState({
        data,
        listDataNew
      })
    })
  }

 

  render() {
    //走马灯渲染模板引擎
    const imagesDataTamplate=this.state.imagesData.map((item,i)=>{
      return (
      <a
      key={i}
      href="/"
      style={{
        display: 'inline-block',
        width: '100%',
        height: this.state.imgHeight
      }}
    >
      <img
        src={item.original}
        alt="图片加载中"
        style={{ width: '100%', verticalAlign: 'top' }}
        onLoad={() => {
          window.dispatchEvent(new Event('resize'))
          this.setState({ imgHeight: 'auto' })
        }}
      />
    </a>
      )
    })
  // 通知栏模板
  const infoTemplate=this.state.infoData.map((item,i)=>{
    return (
      <div key={i}>
      <NoticeBar 
      key={i}
      mode="link"
      action={<span>去看看</span>}
      marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
        {item.info_title}
      </NoticeBar>    
    </div>
    )
  })
  //通知栏问答
  let faqTemplate=this.state.faqData.map((item,i)=>{
    return (
      <Card key={i}>
      <Card.Header
        title={item.question_name}
        thumb={<Badge text="HOT" hot style={{ marginLeft: 12 }} />}
        // extra={<span>this is extra</span>}
      />
      <Card.Body>
        <div>
          <Badge text={item.question_tag} style={badgeStyle} />
          <Badge text={item.answer_content} style={badgeStyle} />
          <Badge text={item.atime} style={badgeStyle} />
          <Badge text={item.qnum} style={badgeStyle} />
        </div>
      </Card.Body>
    </Card>
    )
  })
  faqTemplate = [<b key='b'>列表问答</b>, ...faqTemplate]
  //listdata长列表渲染
  const listDataNewTemplate=this.state.listDataNew.map((item1,i)=>{
    let listDataNewTemplate2=item1.map((item2,j)=>{
      return (
        <Card key={j}>
        <Card.Header
          // title="This is title"
          thumb="http://127.0.0.1:8086/public/home.png"
          thumbStyle={thumbStyle}
          extra={
            <div>
              <Badge text={item2.home_name} style={badgeStyle} />
              <Badge text={item2.home_price} style={badgeStyle} />
              <Badge text={item2.home_desc} style={badgeStyle} />
              <Badge text={item2.home_tags} style={badgeStyle} />
            </div>
          }
        />
      </Card>
      )
    })
    let titles = ['最新开盘', '二手精选', '组个家']
    return (
      <div key={i}>
      <b key={i}>{titles[i]}</b>
      {listDataNewTemplate2}
    </div>
    )
  })
    return <div>
    <SearchBar placeholder="Seach" />
    <WingBlank>
    {/* 轮播模板 */}
    <Carousel infinite autoplay={true}>{ imagesDataTamplate}</Carousel>
    {/* 九宫格菜单 */}
        <Grid
        data={this.state.data}
        isCarousel
        onClick={_el => console.log(_el)}
        />
        {/* 通知栏 */}
    {infoTemplate}
    {/* 通知栏问答 */}
    {faqTemplate}
    {/* 长列表模板 */}
    {listDataNewTemplate}
    </WingBlank>
    <div style={{height:'50px'}}></div>
    </div>
  }
}

export default Main
