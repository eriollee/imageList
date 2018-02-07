<template>
	<div class="wrapper">
    <h2>{{title}}</h2>
		<!-- <Button v-on:click="sendMsg"> 向父组件传值</Button> -->
				<div class="test test1">
					<vueCropper
						ref="cropper2"
						:img="img"
						:outputSize="example2.size"
						:outputType="example2.outputType"
						:info="example2.info"
						:canScale="example2.canScale"
						:autoCrop="example2.autoCrop"
						:autoCropWidth="example2.autoCropWidth"
						:autoCropHeight="example2.autoCropHeight"
						:canMove = "false"
					></vueCropper>
				</div>
	</div>
</template>

<script>
import vueCropper from './vue-cropper'
import codes from './code'
import XLSX from 'xlsx'
import Vue from 'vue'

export default {
  name:"VmCard",
	props:{ 
		message:"",
		img: {
        type: String,
        default: require('@/assets/img/img-1.jpg')
		},
		title: {
        type: String,
        default: 'Title'
    },
		
	},
	

  data: function () {
    return {
			model: false,
			a:[],//截图左上角距离图片左上角的坐标
			b:[],//截图右上角距离图片左上角的坐标
			c:[],//截图左下角距离图片左上角的坐标
			d:[],//截图右下角距离图片左上角的坐标
			coodinateData: {
				imageName:'imageName',
				aX:0,
				aY:0,
				bX:0,
				bY:0,
				cX:0,
				cY:0,
				dX:0,
				aY:0
			},
			modelSrc: '',
		    crap: false,
			previews: {},
			lists: [
				// {
				// 	img: 'https://fengyuanchen.github.io/cropper/images/picture.jpg'
				// },
				{
					img: 'http://ofyaji162.bkt.clouddn.com/touxiang.jpg'
				},
				{
					img: 'https://o90cnn3g2.qnssl.com/0C3ABE8D05322EAC3120DDB11F9D1F72.png'
				},
				{
					img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
				},
				{
					img: 'http://ofyaji162.bkt.clouddn.com/bg2.jpg',
				},
				{
					img: 'http://ofyaji162.bkt.clouddn.com/can.jpg'
				},
				{
					img: 'http://ofyaji162.bkt.clouddn.com/nightcat.jpg'
				}
			],
			option: {
				img: '',
				size: 1,
				full: false,
				outputType: 'png',
				canMove: true,
				fixedBox: false,
				original: false,
				canMoveBox: true
			},
			example2: {
				img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
				info: true,
				size: 1,
				outputType: 'jpeg',
				canScale: true,
				autoCrop: true,
				// 只有自动截图开启 宽度高度才生效
				autoCropWidth: 300,
				autoCropHeight: 250,
				fixed: true,
				fixedNumber: [4, 3]
			},
			example3: {
				img: 'https://o90cnn3g2.qnssl.com/0C3ABE8D05322EAC3120DDB11F9D1F72.png',
				autoCrop: true,
				autoCropWidth: 200,
				autoCropHeight: 200,
				fixedBox: true
			},
			downImg: '#',
			// 设置面板标题
        settingPanelTitle:"",
        col:1,
        // 是否编辑
        isEdit:true,
        // 表头数据
        headerData: {
          "offerData":{
            name:"项目名称",
            spec:"规格",
            unit:"单位",
            count:"数量",
            unitPrice:"单价",
            total:"金额",
            cardNum:"卡数",
            comments:"备注"
          },
          "offerData1":{
            name:"项目名称1",
            spec:"规格1",
            unit:"单位1",
            count:"数量1",
            unitPrice:"单价1",
            total:"金额1",
            cardNum:"卡数1",
            comments:"备注1"
					},
          "offerData2":{
            name:"ImageName",
						aX:'AX',
						aY:'AY',
						bX:'BX',
						bY:'BY',
						cX:'CX',
						cY:'CY',
						dX:'DX',
						dY:'DY'
          }
        },
        // 表格数据
        allData:{
          "offerData":[
            {
              name:"柜体1",
              spec:"sasd",
              unit:"sadad",
              count:"5",
              unitPrice:"145",
              total:"",
              cardNum:5,
              comments:"大师大师多撒好低"
            },
            {
              name:"柜体2",
              spec:"sasd",
              unit:"sadad",
              count:"10",
              unitPrice:"522",
              total:"",
              cardNum:5,
              comments:"大师大师多撒好低"
            },
            {
              name:"柜体3",
              spec:"sasd",
              unit:"sadad",
              count:"15",
              unitPrice:"142",
              total:"",
              cardNum:5,
              comments:"大师大师多撒好低"
            },
            {
              name:"柜体4",
              spec:"sasd",
              unit:"sadad",
              count:"20",
              unitPrice:"22",
              total:"",
              cardNum:5,
              comments:"大师大师多撒好低"
            },
            {
              name:"柜体5",
              spec:"sasd",
              unit:"sadad",
              count:"25",
              unitPrice:"222",
              total:"",
              cardNum:5,
              comments:"大师大师多撒好低"
            },
            {
              name:"柜体6",
              spec:"sasd",
              unit:"sadad",
              count:"12",
              unitPrice:"322",
              total:"",
              cardNum:5,
              comments:"大师大师多撒好低"
            }
          ],
          "offerData1":[
            {
              name:"边框1",
              spec:"sasd",
              unit:"sadad",
              count:"12",
              unitPrice:"14522",
              total:"",
              cardNum:5,
              comments:"大师大师多撒好低"
            },
            {
              name:"边框2",
              spec:"sasd",
              unit:"sadad",
              count:"12",
              unitPrice:"14522",
              total:"",
              cardNum:5,
              comments:"大师大师多撒好低"
            },
            {
              name:"边框3",
              spec:"sasd",
              unit:"sadad",
              count:"12",
              unitPrice:"14522",
              total:"",
              cardNum:5,
              comments:"大师大师多撒好低"
            },
            {
              name:"边框4",
              spec:"sasd",
              unit:"sadad",
              count:"12",
              unitPrice:"14522",
              total:"",
              cardNum:5,
              comments:"大师大师多撒好低"
            },
            {
              name:"边框5",
              spec:"sasd",
              unit:"sadad",
              count:"12",
              unitPrice:"14522",
              total:"",
              cardNum:5,
              comments:"大师大师多撒好低"
            },
            {
              name:"边框6",
              spec:"sasd",
              unit:"sadad",
              count:"12",
              unitPrice:"14522",
              total:"",
              cardNum:5,
              comments:"大师大师多撒好低"
            }
					]
					,
          "offerData2":[
						{
            name:"Image1",
						aX:0,
						aY:0,
						bX:0,
						bY:0,
						cX:0,
						cY:0,
						dX:0,
						dY:0
						},	{
            name:"Image2",
						aX:1,
						aY:1,
						bX:1,
						bY:1,
						cX:1,
						cY:1,
						dX:1,
						dY:1
						}
          ]
        },
        //页头部分
        pageHead:{
          "offerData":[
            {
              name:"订单号：",
              isEdit:false
            },
            {
              name:"客户名称：",
              isEdit:false
            },
            {
              name:"销售日期：",
              isEdit:false
            },
            {
              name:"联系人：",
              isEdit:false
            },
            {
              name:"联系地址：",
              isEdit:false
            }
          ],
          "offerData1":[
            {
              name:"订单号1：",
              isEdit:false
            },
            {
              name:"客户名称1：",
              isEdit:false
            },
            {
              name:"销售日期1：",
              isEdit:false
            },
            {
              name:"联系人1：",
              isEdit:false
            },
            {
              name:"联系地址1：",
              isEdit:false
            }
          ], "offerData2":[
            {
              name:"ImageName",
              isEdit:false
            },
            {
              name:"CoordinateA",
              isEdit:false
            },
            {
              name:"CoordinateB",
              isEdit:false
            },
            {
              name:"CoordinateC",
              isEdit:false
            },
            {
              name:"CoordinateD",
              isEdit:false
            }
          ]
        },
        // 页头部分内容
        pageHeadContent:{
          "offerData":[
            {
              name:"1231312313"
            },
            {
              name:"zoe"
            },
            {
              name:"2017-10-21"

            },
            {
              name:"joe"

            },
            {
              name:"beijibng"
            }
          ],
          "offerData1":[
            {
              name:"2231312313"
            },
            {
              name:"zoe1"
            },
            {
              name:"2017-10-21"

            },
            {
              name:"joe11"

            },
            {
              name:"beijibng111"
            }
          ]
        },
        options: {
          'offerData':{
            value: 'offerData',
            label: '报价明细单'
          }, 
          'offerData1':{
            value: 'offerData1',
            label: '报价明细单1'
          }
        },
        value: 'offerData2', //选择的表格
        outputData:[], // 导出的数据
        outFile: '' // 导出文件el
    }
  },
	methods: {
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
        
        rs.push(this.headerData[this.value]);
				this.coodinateData.aX=this.a[0];
				this.coodinateData.aY=this.a[1];
				this.coodinateData.dX=this.d[0];
				this.coodinateData.dY=this.d[1];
				this.allData[this.value].aX = this.coodinateData.aX;
				this.allData[this.value].aY = this.coodinateData.aY;
			 console.log(this.allData[this.value][0].name);
				  Vue.set(this.allData[this.value][0], 'name', 'aaaaa');
				// Vue.set(this.allData[this.value][1], this.allData[this.value][1], 'aaaaaa');
				//Vue.set(this.allData[this.value], 1, 'bbbbbbb');
				// Vue.set(this.allData[this.value], 0, a);
        //4.拼接表内容
				rs.push(...this.allData[this.value]);
				 
				console.log(1111);
				
				console.log(this.allData[this.value]);
				 console.log(2222);
        //5.拼接表尾
        // rs.push({title:"合计",value:this.settingData[this.value].totalPrice});
         console.log(rs);
        this.downloadExl(rs, this.settingPanelTitle)
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
      },


		getUser(){
                console.log("11111");
        },
		sendMsg(){
			// this.$emit("listen","this is fromchild");
			//console.log(this.$refs.cropper2.cropOffsertX);
			//console.log(this.$refs.cropper2.cropX);
			//console.log(~~(this.$refs.cropper2.h/2-((this.$refs.cropper2.trueHeight*this.$refs.cropper2.originalScale))/2-this.$refs.cropper2.cropOfforiCropY));
			//console.log(this.$refs.cropper2.cropY);
			//console.log(this.$refs.cropper2.moveX);
			//console.log(this.$refs.cropper2.moveY);
		 	//console.log(this.$refs.cropper2.cropOffsertX);
			//console.log(this.$refs.cropper2.cropOffsertY);
			//   console.log(this.$refs.cropper2.cropW);
			//   console.log(this.$refs.cropper2.cropH);
			//   console.log(~~(this.$refs.cropper2.trueWidth*this.$refs.cropper2.scale));
			//   console.log(~~(this.$refs.cropper2.trueHeight*this.$refs.cropper2.scale));
			//获取左上角坐标
			let originX = ~~(this.$refs.cropper2.trueWidth*this.$refs.cropper2.originalScale);
			let originY = ~~(this.$refs.cropper2.trueHeight*this.$refs.cropper2.originalScale);
			
			let zoomX = ~~(this.$refs.cropper2.trueWidth*this.$refs.cropper2.scale);
			let zoomY = ~~(this.$refs.cropper2.trueHeight*this.$refs.cropper2.scale);
			
			let scaled = this.$refs.cropper2.scaled;
			let originalScale = this.$refs.cropper2.originalScale;
			let scale = this.$refs.cropper2.scale;
			let dX = 0;
			let dY = 0;
			let oriPointW = 0 ;//原始X坐标
			let oriPointH = 0 ;//原始Y坐标
			let actPointW = 0 ;//原图比实际偏移X坐标
			let actPointH = 0 ;//原图比实际偏移Y坐标
			
			//console.log(actCropH);

			console.log("cropOffsertY=="+this.$refs.cropper2.cropOffsertY)
			oriPointW = ~~((this.$refs.cropper2.oriCropX/2)-(~~(this.$refs.cropper2.trueWidth*this.$refs.cropper2.originalScale))/2);
			oriPointH = -(~~(this.$refs.cropper2.h/2-(this.$refs.cropper2.trueHeight*this.$refs.cropper2.originalScale)/2-this.$refs.cropper2.cropOffsertY));
			console.log("oriPointH=="+oriPointH)
			let actCropW =  this.$refs.cropper2.cropOffsertX;//原坐标比实际偏移X坐标
			let actCropH =  oriPointH;//原坐标比实际偏移Y坐标
			//console.log(actCropH);
			//console.log(oriPointW);
			
			// console.log(scale);
			// console.log(originalScale);
			dX =   (zoomX-originX)/2;
			dY =   (zoomY-originY)/2;
			  console.log("dY=="+dY);
			actPointW = oriPointW+ dX;
			actPointH = dY;
			//console.log(actPointH);
			let oriWidth = ~~(this.$refs.cropper2.cropW/scale);//截图宽度
			let oriHeight= ~~(this.$refs.cropper2.cropH/scale);//截图长度
			// if(scale>=originalScale){
				console.log(111);
				console.log(~~((actPointW+actCropW)/scale));
				console.log(~~((actCropH)/scale));
				this.a[0]=~~((actPointW+actCropW)/scale);
				this.a[1]=~~((actCropH+actPointH)/scale);
				console.log(this.a[0]+","+this.a[1]);
				this.b[0]=this.a[0]+oriWidth;
				this.b[1]=this.a[1];
				console.log(this.b[0]+","+this.b[1]);
				this.c[0]=this.a[0]
				this.c[1]=this.a[1]+oriHeight;
				console.log(this.c[0]+","+this.c[1]);
				this.d[0]=this.a[0]+oriWidth;
				this.d[1]=this.a[1]+oriHeight;
				console.log(this.d[0]+","+this.d[1]);
			// }else{
			// 	console.log(222);
			// 	console.log((actCropW+actPointW)/scale);
			// 	this.a[0]=~~((actCropW+actPointW)/scale);
			// 	console.log(~~((actPointH+actCropH)/scale));
			// 	this.a[1]=~~((actPointH+actCropH)/scale);
			// }
			// console.log(img);
			this.coodinateData.imageName =this.title;
			this.coodinateData.aX=this.a[0];
			this.coodinateData.aY=this.a[1];
			this.coodinateData.bX=this.b[0];
			this.coodinateData.bY=this.b[1];
			this.coodinateData.cX=this.c[0];
			this.coodinateData.cY=this.c[1];
			this.coodinateData.dX=this.d[0];
			this.coodinateData.dY=this.d[1];
			return this.coodinateData;
			// this.excelExport();
			 
			
			// console.log((this.$refs.cropper2.cropW/2)-(~~(this.$refs.cropper2.trueWidth*this.$refs.cropper2.scale))/2);
			// this.a[0] = ~~(((this.$refs.cropper2.cropW/2)-(~~(this.$refs.cropper2.trueWidth*this.$refs.cropper2.scale))/2)/this.$refs.cropper2.scale);
			// this.a[1] = ~~(((this.$refs.cropper2.cropH/2)-(~~(this.$refs.cropper2.trueHeight*this.$refs.cropper2.scale))/2)/this.$refs.cropper2.scale);
			// this.b[0]=a[0]+this.$refs.cropper2.cropW;
			// this.b[1]=a[1];
			// this.c[0]=a[0]
			// this.c[1]=a[1]+this.$refs.cropper2.cropH;
			// this.d[0]=a[0]+this.$refs.cropper2.cropW;
			// this.d[1]=a[0]+this.$refs.cropper2.cropH;
			// console.log("a[0]:"+this.a[0]+"a[1]:"+this.a[1]);
			//console.log(a[0]);
			// console.log((this.$refs.cropper2.cropW/2)-(~~(this.$refs.cropper2.trueWidth*this.$refs.cropper2.scale))/2);
			 //this.a[0]=(this.$refs.cropper2.cropW/2)-(~~(this.$refs.cropper2.trueWidth*this.$refs.cropper2.scale))/2;
			// console.log(this.a[0]+"======"+this.a[1]);
			//  console.log(this.$refs.cropper2.imgW);
			//  console.log(this.$refs.cropper2.imgH);
			// console.log(this.$refs.cropper2.scale);
			// console.log(this.$refs.cropper2.trueWidth);
			// console.log(this.$refs.cropper2.trueHeight);
			// console.log(this.$refs.cropper2.$refs.cropperImg.x); 与左上角原点x坐标
			// console.log(this.$refs.cropper2.$refs.cropperImg.y); 与左上角原点y坐标
			// console.log(this.$refs.cropper2.$refs.cropper);
			// console.log(this.$refs.cropper2.$refs.cropper);
		},
		changeImg () {
			this.option.img = this.lists[~~(Math.random() * this.lists.length)].img
		},
		startCrop () {
			// start
			this.crap = true
			this.$refs.cropper.startCrop()
		},
		stopCrop () {
			//  stop
			this.crap = false
			this.$refs.cropper.stopCrop()
		},
		clearCrop () {
			// clear
			this.$refs.cropper.clearCrop()
		},
		refreshCrop () {
			// clear
			this.$refs.cropper.refresh()
		},
		changeScale (num) {
			num = num || 1
			this.$refs.cropper.changeScale(num)
		},
		rotateLeft () {
			this.$refs.cropper.rotateLeft()
		},
		rotateRight () {
			this.$refs.cropper.rotateRight()
		},
		finish (type) {
			// 输出
			// var test = window.open('about:blank')
			// test.document.body.innerHTML = '图片生成中..'
			if (type === 'blob') {
				this.$refs.cropper.getCropBlob((data) => {
					var img = window.URL.createObjectURL(data)
					this.model = true
					this.modelSrc = img
				})
			} else {
				this.$refs.cropper.getCropData((data) => {
					this.model = true
					this.modelSrc = data
				})
			}
		},
		// 实时预览函数
		realTime (data) {
			this.previews = data
		},

		finish2 (type) {
			this.$refs.cropper2.getCropData((data) => {
				this.model = true
				this.modelSrc = data
			})
		},
		finish3 (type) {
			this.$refs.cropper3.getCropData((data) => {
				this.model = true
				this.modelSrc = data
			})
		},
		down (type) {
			// event.preventDefault()
			var aLink = document.createElement('a')
			aLink.download = 'demo'
			// 输出
			if (type === 'blob') {
				this.$refs.cropper.getCropBlob((data) => {
					this.downImg = window.URL.createObjectURL(data)
					aLink.href = window.URL.createObjectURL(data)
					aLink.click()
				})
			} else {
				this.$refs.cropper.getCropData((data) => {
					this.downImg = data
					aLink.href = data
					aLink.click()
				})
			}
		},

		uploadImg (e, num) {
			//上传图片
			// this.option.img
			var file = e.target.files[0]
			if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
				 alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
				 return false
			 }
			var reader = new FileReader()
			reader.onload = (e) => {
				let data
				if (typeof e.target.result === 'object') {
					// 把Array Buffer转化为blob 如果是base64不需要
					data = window.URL.createObjectURL(new Blob([e.target.result]))
				} else {
					data = e.target.result
				}
				if (num === 1) {
					this.option.img = data
				} else if (num === 2) {
					this.example2.img = data
				}
			}
			// 转化为base64
			// reader.readAsDataURL(file)
			// 转化为blobimgLoad
			reader.readAsArrayBuffer(file)
		},
		imgLoad (msg) {
			console.log(msg)
		}
	},
	components: {
		vueCropper,
		codes
	},
	mounted () {
		this.changeImg()
		// hljs.configure({useBR: true})
		var list = [].slice.call(document.querySelectorAll('pre code'))
		list.forEach((val, index) => {
		  hljs.highlightBlock(val)
		})
		
	}
}
</script>

<style>
  * {
	  margin: 0;
		padding: 0;
	}

	.content {
		margin: auto;
		max-width: 1200px;
		margin-bottom: 100px;
	}

	.test-button {
		display: flex;
		flex-wrap: wrap;
	}

	.btn {
		display: inline-block;
		line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c0ccda;
    color: #1f2d3d;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin:20px 10px 0px 0px;
    padding: 9px 15px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #50bfff;
    border-color: #50bfff;
    transition: all .2s ease;
		text-decoration: none;
		user-select: none;
	}

	.des {
		line-height: 30px;
	}

	code.language-html {
		padding: 10px 20px;
		margin: 10px 0px;
		display: block;
		background-color: #333;
		color: #fff;
		overflow-x: auto;
		font-family: Consolas, Monaco, Droid, Sans, Mono, Source, Code, Pro, Menlo, Lucida, Sans, Type, Writer, Ubuntu, Mono;
		border-radius: 5px;
		white-space: pre;
	}

	.show-info {
		margin-bottom: 50px;
	}

	.show-info h2 {
		line-height: 50px;
	}

	/*.title, .title:hover, .title-focus, .title:visited {
		color: black;
	}*/

	.title {
		display: block;
		text-decoration: none;
		text-align: center;
		line-height: 1.5;
		margin: 20px 0px;
		background-image: -webkit-linear-gradient(left,#3498db,#f47920 10%,#d71345 20%,#f7acbc 30%,#ffd400 40%,#3498db 50%,#f47920 60%,#d71345 70%,#f7acbc 80%,#ffd400 90%,#3498db);
    color: transparent;
    -webkit-background-clip: text;
    background-size: 200% 100%;
    animation: slide 5s infinite linear;
		font-size: 40px;
	}

	.test {
	  height: 500px;
	}

	.model {
		position: fixed;
		z-index: 10;
		width: 100vw;
		height: 100vh;
		overflow: auto;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.8);
	}

	.model-show {
		display: flex;
    justify-content: center;
    align-items: center;
		width: 100vw;
		height: 100vh;
	}

	.model img {
		display: block;
		margin: auto;
		max-width: 80%;
		user-select: none;
		background-position: 0px 0px, 10px 10px;
		background-size: 20px 20px;
    background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
	}

	.c-item {
		display: block;
		padding: 10px 0;
		user-select: none;
	}

	@keyframes slide {
    0%  {
      background-position: 0 0;
    }
    100% {
      background-position: -100% 0;
    }
  }

</style>
