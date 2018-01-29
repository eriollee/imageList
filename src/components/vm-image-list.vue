<template>
  <div class="vm-image-list">
    <Row class="image-list-heading vm-panel">
      <div class="panel-heading">
        {{ title }}    <Button  type="ghost" v-on:click="handleEdit" >截取信息</Button>
      </div>
      <Row type="flex" align="middle" justify="space-between" class="panel-body">
       <div class="search-bar">
          <Input placeholder="Please enter ..." v-model="keyword" style="width: 300px"></Input>
          <Button type="ghost" @click="search"><i class="fa fa-search"></i></Button>
        </div>
        <Row type="flex" align="middle" class="page">
          <span>Show</span>
          <Input :max="40" :min="1" :number="true" v-model="showNum" class="input-number" @on-change=" updateDataShow "></Input>
          <span class="margin-end">/ Page</span>
          <span class="total">Total {{ data.length }}</span>
          <Page :total="data.length" :current="currentPage" :page-size="showNum" @on-change="pageChange"></Page>
        </Row>
      </Row>
    </Row>
    <Row class="image-list" :gutter="16">
      <Col :lg="6" :sm="12" class="vm-margin" v-for="item in dataShow" :key="item.id">
        <VmCard ref="VmCard"  :message="parentMsg" v-on:listen="listenFromChild" :editable="true" :title="item.title" :img="item.img" :desc="item.desc" :detailUrl="item.detailUrl" :editUrl="item.editUrl" @delete-ok=" deleteOk(item) "></VmCard>
      </Col>
    </Row>
  </div>
</template>

<script>
  import VmCard from '@/components/vm-card'
  import XLSX from 'xlsx'
  export default {
    name: 'VmImageList',
    components: {
      VmCard:VmCard
    },
    props: {
      title: {
        type: String,
        default: 'Image List'
      },
      // origin data
      data: {
        type: Array,
        default: function () {
          return [
            {
              id: '19920805',
              title: 'Title',
              img: require('@/assets/img/img-1.jpg'),
              desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s ly dummy tly dummy tly dummy tly dummy tly dummy tly dummy t',
              to: '#'
            }
          ]
        }
      }
    },
    data: function () {
      return {
        parentMsg:'Hello',
        keyword: '', // keyword for search
        dataShow: [], // data for showing
        showNum: 8, // number of item per page
        currentPage: 1,
        imgInfo:[], // 图像信息集合
        outputData:[], // 导出的数据
        settingPanelTitle:"",//文件名称
         // 表头信息
        imgTitle:{
            name:"ImageName",
						aX:'AX',
						aY:'AY',
						bX:'BX',
						bY:'BY',
						cX:'CX',
						cY:'CY',
						dX:'DX',
						dY:'DY'
        },
        imgData:[
        {
            name:"Image1",
						aX:100,
						aY:100,
						bX:100,
						bY:200,
						cX:100,
						cY:200,
						dX:100,
						dY:160
        },
        {
          name:"Image2",
          aX:200,
          aY:2100,
          bX:200,
          bY:200,
          cX:200,
          cY:200,
          dX:200,
          dY:260
        }]
      }
    },
    methods: {
      handleEdit() {//获取图片信息
          //  this.$refs.VmCard[0].sendMsg();
          //  console.log( this.$refs.VmCard[0].sendMsg())
           this.imgInfo.splice(0,this.imgInfo.length);//清空数组 ;//初始化数组
          
          //  console.log(this.imgInfo);
           for (let i=0;i<this.showNum;i++) {
              this.imgInfo.push(this.$refs.VmCard[i].sendMsg());
            }
          this.excelExport();
      },
      listenFromChild:function(data){
        console.log(data);
      },
      updateDataShow: function () {
        let startPage = (this.currentPage - 1) * this.showNum
        let endPage = startPage + this.showNum
        this.dataShow = this.data.slice(startPage, endPage)
      },
      pageChange: function (page) {
        this.currentPage = page
        this.updateDataShow()
      },
      showInfo: function () {
            console.log("1111111");
      },
      search: function () {
        let that = this
        let tempData = that.data
        that.dataShow = []
        tempData.forEach(function (elem) {
          for (let i in elem) {
            if (elem[i].toString().indexOf(that.keyword) > -1) {
              that.dataShow.push(elem)
              return
            }
          }
        })
      },
      deleteOk: function (data) {
        this.$emit('delete-ok', data)
      },	
      excelExport(){
			  this.downloadFile(this.outputData);
			//saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}),"sheetjs.xlsx");
		  },
		
		// 导出功能
      downloadFile: function (rs) { // 点击导出按钮
        //拼接导出的数据
        //1.拼接标题
        // rs.push({title:this.settingPanelTitle});
        //2.拼接表头内容
        // let headContent={};
        //页头项
        // let pHead=this.pageHead[this.value];
        //页头项对应的内容
        // let pHeadContent=this.pageHeadContent[this.value];

        // for(let i in pHead){   
				// 	console.log(pHeadContent[i].name);
        //   headContent[i]=pHead[i].name+""+pHeadContent[i].name;
        // }
        // console.log(headContent);
        // rs.push(headContent);
        //3.拼接表头标题
        rs.push(this.imgTitle);
		
        //4.拼接表内容
			 	rs.push(...this.imgInfo);
				 
				
        //5.拼接表尾
        // rs.push({title:"合计",value:this.settingData[this.value].totalPrice});
        console.log(rs);
        this.downloadExl(rs, this.settingPanelTitle);
        rs.splice(0, rs.length);//清空数组 ;//初始化数组
      },
      downloadExl: function (json, downName, type) {  // 导出到excel
        let tmpdata = [] // 用来保存转换好的json
        let maxLen=0; //最长的一行
        json.map((v, i) => {
          if(maxLen<Object.keys(v).length){
            maxLen=Object.keys(v).length;
					}
				
					return Object.keys(v).map((k, j) => {   //取出键对应的值
            return Object.assign({}, { //拼接输出的sheet
              v: v[k],
              position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
            })}
          )
        }).reduce((prev, next) =>  prev.concat(next)).forEach(function (v) {
          tmpdata[v.position] = { //转换输出json
            v: v.v
          }
        })

        let outputPos = Object.keys(tmpdata)  // 设置区域,比如表格从A1到D10
         //console.log(outputPos);
       // console.log(tmpdata);
        // 转化最长的行所对应的区域码
				maxLen=this.getCharCol(maxLen);
		//		console.log(maxLen)
        // console.log(maxLen+outputPos[outputPos.length-1].slice(1));
        let tmpWB = {
          SheetNames: ['mySheet'], // 保存的表标题
          Sheets: {
            'mySheet': Object.assign({},
              tmpdata, // 内容
              {
                '!ref': outputPos[0] + ':' + (maxLen+outputPos[outputPos.length-1].slice(1)) // 设置填充区域
              })
          }
        }
        // let tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB,
        //   {bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary'} // 这里的数据是用来定义导出的格式类型
        // ))], {
        //   type: ''
		// })  // 创建二进制对象写入转换好的字节流
		 saveAs(new Blob([this.s2ab(XLSX.write(tmpWB,
          {bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary'} // 这里的数据是用来定义导出的格式类型
        ))], {type: "application/octet-stream"}), "1111" + ".xlsx")

        // var href = URL.createObjectURL(tmpDown)  // 创建对象超链接
        // this.outFile.download = downName + '.xlsx'  // 下载名称
        // this.outFile.href = href  // 绑定a标签
        // this.outFile.click()  // 模拟点击实现下载
        // setTimeout(function () {  // 延时释放
        //   URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
        // }, 100)
       
      },
      // 转2进制
      s2ab(s){
        if(typeof ArrayBuffer !== 'undefined'){
          let buf =new ArrayBuffer(s.length);
          let view =new Uint8Array(buf);
          for(var i=0;i!=s.length;++i) view[i] =s.charCodeAt(i) & 0xFF;  
          return buf;      
        }else{
          let buf= new Array(s.length);
          for(var i=0;i!=s.length;++i) buf[i] =s.charCodeAt(i) & 0xFF;
          return buf;
        } 
      },
      // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
      getCharCol(n) { 
        let s = ''
        let m = 0
        while (n > 0) {
          m = n % 26 + 1
          s = String.fromCharCode(m + 64) + s
          n = (n - m) / 26
        }
        return s
      }
    },
    watch: {
      data: function () {
        this.dataShow = this.data.slice(0, this.showNum) // update dataShow once data changed
      }
    },
    mounted: function () {
      this.dataShow = this.data.slice(0, this.showNum)
    }
  }
</script>
