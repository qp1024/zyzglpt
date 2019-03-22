import React, { Component } from 'react'
import { Carousel,WingBlank,WhiteSpace,SearchBar,Grid,NoticeBar,Icon,Card, Badge} from 'antd-mobile'
import axios from '../../http'
//搜索框配置
// 轮播配置
const badgeStyle = {
  marginLeft: 12,
  padding: '0 2px',
  backgroundColor: '#fff',
  borderRadius: 2,
  color: '#f19736',
  border: '1px solid #f19736'
}
const thumbStyle = {
  width: '125px',
  height: '80px'
}
class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // imagesData:[],
      data1:['1', '2', '3'],
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
  //点击展示详情
  changeMenuTab(el){
    const {history}=this.props
    const {text,icon,id}=el
    switch(id){
      case 1:
      case 2:
      case 3:
      case 5:
          history.push('/detail',{query:{params:{text:text,id:id}}})
      break
      case 4:
        history.push('/login')
      break
      case 6:
        history.push('/cal')
    }
    console.log(el,111)
  }
  // 轮播图发请求,发过请求之后把数据接收遍历,然后赋值给模板
  componentDidMount= async ()=> {
    // 走马灯发请求
    // let imagesData =this.getHomeData(`homes/swipe`)
    setTimeout(() => {
      this.setState({
        data1: ['1', '2', '3'],
      });
    }, 100);
    //grid九宫格
    let menuData=this.getHomeData(`homes/menu`)
    //通知栏信息
    let infoData=this.getHomeData(`homes/info`)
    //通知栏问答
    let faqData=this.getHomeData(`homes/faq`)
    //list长列表
    let listData=this.getHomeData(`homes/house`)
    const dataList=await Promise.all([menuData,infoData,faqData,listData])
    this.setState({
      // imagesData:dataList[0],
      menuData:dataList[0],
      infoData:dataList[1],
      faqData:dataList[2],
      listData:dataList[3]
    },()=>{
      let data=this.state.menuData.map((item,i)=>{
        return {
          icon:`http://127.0.0.1:8086/public/0${i+1}.png`,
          text: item.menu_name,
          id:i+1
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
          thumb={`http://127.0.0.1:8086/public/${j+1}.png`}
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
   
    <Carousel
          autoplay={true}
          infinite
        >
          {this.state.data1.map(val => (
            <a
              key={val}
              href="/"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={`/images/${val}.png`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
    {/* 九宫格菜单 */}
    <WhiteSpace size="lg" />
    <Grid
    columnNum={3}
    carouselMaxRow={2}
    data={this.state.data}
    isCarousel
    onClick={el=>{
      this.changeMenuTab(el)
    }}
    />
     <WhiteSpace size="lg" />
    {/* 通知栏 */}
    {/* {infoTemplate} */}
    {/* 通知栏问答 */}
    {faqTemplate}
    {/* 长列表模板 */}
    {/* {listDataNewTemplate} */}
    </WingBlank>
    <div style={{height:'50px'}}></div>
    </div>
  }
}

export default Main
