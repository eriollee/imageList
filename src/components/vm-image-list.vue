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
        imgInfo:[
          {
            id:"imageName",
            aX:0,
            aY:0,
            bX:0,
            bY:0,
            cX:0,
            cY:0,
            dX:0,
            dY:0,
            aX:0
          }
        ]
      }
    },
    methods: {
      handleEdit() {//获取图片信息
           this.$refs.VmCard[0].sendMsg();
          //  for (let i=0;i<this.showNum;i++) {
          //     this.$refs.VmCard[i].sendMsg();
          //   }
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
