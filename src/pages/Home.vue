<template>
  <div class="home">
    <Row class="header" type="flex" align="middle">
      <div class="logo">
        <span>工行</span>图像识别系统 
      </div>
    </Row>   
    <div class="sidebar">
      <Menu theme="dark" width="100%" class="menu" :active-name="activeName" :accordion="true">
          <Menu-item name="ImageList">
              <router-link to="/imagelist">
                <i class="fa fa-photo"></i>
                Image List  
              </router-link>
          </Menu-item>
      </Menu>
    </div>
    <div class="main-content">
      <router-view></router-view> 
    </div>
  </div>
  </div>
</template>
<script>
import VmMsgPush from '@/components/vm-msg-push.vue'
export default {
  name: 'home',
  components: {
    VmMsgPush
  },
  mounted: function () {
    this.activeName = this.$route.name
  },
  data () {
    return {
      activeName: 'Dashboard',
      msgPushData: [
        {
          image: require('@/assets/img/photo.jpg'),
          from: 'JesseLuo',
          time: '2017-1-8',
          message: 'I like your website very much!'
        },
        {
          image: require('@/assets/img/photo.jpg'),
          from: 'JesseLuo',
          time: '2017-1-8',
          message: 'I like your website very much!'
        },
        {
          image: require('@/assets/img/photo.jpg'),
          from: 'JesseLuo',
          time: '2017-1-8',
          message: 'I like your website very much!'
        },
        {
          image: require('@/assets/img/photo.jpg'),
          from: 'JesseLuo',
          time: '2017-1-8',
          message: 'I like your website very much!'
        },
        {
          image: require('@/assets/img/photo.jpg'),
          from: 'JesseLuo',
          time: '2017-1-8',
          message: 'I like your website very much!'
        }
      ]
    }
  }
}
</script>
