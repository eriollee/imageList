<template>
	<div class="wrapper">
    <h2>{{message}}</h2><Button v-on:click="sendMsg"> 向父组件传值</Button>
				<div class="test test1">
					<vueCropper
						ref="cropper2"
						:img="example2.img"
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

export default {
  name:"VmCard",
  props:["message"],
  data: function () {
    return {
			model: false,
			a:[],//截图左上角距离图片左上角的坐标
			b:[],//截图右上角距离图片左上角的坐标
			c:[],//截图左下角距离图片左上角的坐标
			d:[],//截图右下角距离图片左上角的坐标
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
			downImg: '#'
    }
  },
	methods: {
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

			
			oriPointW = ~~((this.$refs.cropper2.oriCropX/2)-(~~(this.$refs.cropper2.trueWidth*this.$refs.cropper2.originalScale))/2);
			oriPointH = ~~(this.$refs.cropper2.h/2-((this.$refs.cropper2.trueHeight*this.$refs.cropper2.originalScale))/2-this.$refs.cropper2.cropOffsertY);
			let actCropW =  this.$refs.cropper2.cropOffsertX;//原坐标比实际偏移X坐标
			let actCropH =  this.$refs.cropper2.cropOffsertY-this.$refs.cropper2.cropOfforiCropY;//原坐标比实际偏移Y坐标
			//console.log(actCropH);
			//console.log(oriPointW);
			
			// console.log(scale);
			// console.log(originalScale);
			dX =   (zoomX-originX)/2;
			dY =   (zoomY-originY)/2;
			// console.log(dX);
			actPointW = oriPointW+ dX;
			actPointH = dY-oriPointH;
			//console.log(actPointH);
			if(scale>originalScale){
				console.log(111);
				// console.log(~~((actPointW+actCropW)/scale))); 距离左上角原点实际坐标
				console.log(~~((actPointH+actCropH)/scale));
			}else{
				console.log(222);
				console.log(~~((actPointH+actCropH)/scale));
				// console.log((actCropW-actPointW)/scale);
			}
			
			 
			
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
