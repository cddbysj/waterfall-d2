/*
	抛弃img标签，使用元素背景图展示图片
	可以提前展示站位图片，同时实现懒加载图片
	但是需要提前知道图片的尺寸信息
*/

// 对象数组，存储图片的链接和尺寸等信息
const imageInfos = [
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/fc631413452_zpsnl4zvc1g.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/eba41419251_zpswzkm3smd.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/f366f0492aaaddb18927a63b77ec2ce6_zpsfuu8opli.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/ee37db5d2b900f7d28903a8a0555e69d_zps8l6j3yat.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/ef391415739_zpsj7coufty.jpg","width":751,"height":1024},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/41097018577611125_zpsudpbl2xe.jpg","width":1024,"height":416},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/20311415748_zpsdivqswfk.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/e6a31419271_zpscrp4xteq.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/99a6e4c721e4df52ddd17007e8a36eea_zpsvqvej2bp.jpeg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/e3a21414468_zpsvdb833mm.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/cd30ac9aba94adaaf0e8ca5749e7bce6_zpsu3ijazz6.jpeg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/c58888739d88239a3d62378e4da06e3f_zpsosgx5zww.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/b7c2af837477ce000a4d15bb373a54cf_zpseoxeu62n.jpg","width":978,"height":1024},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/dc44c2782698bf108e868f1dd0cb2978_zps7m1ornij.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/d09a1420756_zpsnuvabmam.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/bc50204e89844ee981438522e0bf6385_zps5ov8okiz.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/2c8dce8d7eeac64768fc7e7b90653320_zps5wwbcrmo.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/e6e2330fa447d2751dcc2a1d58b8b9c3_zpslsuojjck.jpeg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/d1ed2d57d1ef2b744134d9579934f810_zpsu1vswzru.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/08491413341_zpssswonri0.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/41097018547909411_zpstgplowj5.jpg","width":1024,"height":416},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/64851414485_zpstkcs9yxx.png","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/d09a1420757_zpsxykij7lv.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/41097018561010117_zpsng8rrghy.jpg","width":1024,"height":690},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/4109701854780931_zpsv6jeylu7.jpg","width":1024,"height":416},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/41097018547909414_zpsrwaa2s6k.jpg","width":1024,"height":640},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/41097018558109915_zps5t4sqswe.jpg","width":1024,"height":640},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/0e8d1413401_zpshbdnrkyb.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/41097018547909410_zps2rtmzwiy.jpg","width":1024,"height":424},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/41097018564910318_zpsluxme7ok.jpg","width":1024,"height":426},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/41097018566010419_zps9ojcnliv.jpg","width":1024,"height":416},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/41097018580211226_zpscoyhewi0.jpg","width":1024,"height":416},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/41097018547909413_zpsbblpxebm.jpg","width":1024,"height":640},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/41097018569710622_zpsfx5m9qqw.jpg","width":1024,"height":416},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/41097018567410520_zpsc66ugbhc.jpg","width":1024,"height":292},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/41097018568510521_zps0koxggyh.jpg","width":1024,"height":544},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/2b02949b439cd44f5293830383afba5e_zpsqo1duixp.jpg","width":1024,"height":640},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/41097018547909412_zpshc1rni1u.jpg","width":1024,"height":415},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/95455e4f3f092cb43b9dd2ea0cdefdea_zpstopewpph.jpeg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/3013e578da7dfa6f176b852b804eac64_zpsw95bp9uh.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/549eafefd0de760d13fc622d506ff9ee_zpsf2phjkbr.jpg","width":1024,"height":647},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/8bda1420727_zpssnlpabct.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/8e661419238_zps0y0e7urt.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/41097018585811528_zpsmk2652fn.jpg","width":1024,"height":289},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/67091415084_zpsxfovk23w.jpg","width":737,"height":1024},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/41097018581911327_zpsv0eeih1f.jpg","width":1024,"height":417},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/463c4e246dc07e853eec2c92572591ed_zpssimqzdqb.jpeg","width":1024,"height":640},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/4a0027989ddf5fcd2e560442660db891_zpssxlqjbon.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/41097018586111529_zpsbh032nq7.jpg","width":1024,"height":414},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/6567877dfa51340158af1042c4654003_zpskleoc49v.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/a9a2189279e35a69521583b806722d44_zpsinumjert.jpg","width":1024,"height":640},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/13101417147_zpsu8qfwxzv.png","width":580,"height":827},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/9ba2738235050386d24aab11f42f17d1_zpsx7q0sdw9.jpg","width":1024,"height":499},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/48341415250_zpsw22i21s9.jpg","width":713,"height":1024},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/a84a1416046_zpslzlktxej.jpg","width":1024,"height":559},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/b70f1417154_zpskdmdfbgl.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/b232d75660e691a96057761805443fb7_zpsoif76rsd.jpeg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/cc0b9d82ac0c6feb489ef4878397c283_zpsemajjzem.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/a49e0090c78ce39b5e27eb6ad4906cfe_zpssxghe5id.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/all_hero_zps6ncrowm9.jpg","width":1024,"height":640},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/8ebb1419338_zpsfjuidigh.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/b8ad1417356_zpsjyxldu2u.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/ad38378ed0fa9829b41b32b276c00a44_zpsujulisxv.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/a872b796fb517e5e925cd99e773e1c93_zps31olcrwf.jpg","width":1024,"height":647},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/d524bf791f2bbc3553392137e7ed2b39_zps08u1zzpm.jpg","width":1024,"height":558},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/d5531413486_zpspoiqbgma.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/e3bf1420700_zpsqbbvtqci.jpg","width":1024,"height":559},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/d25e1416039_zpszs8alin1.jpg","width":1024,"height":453},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/bb941413458_zps3po2bzkj.jpg","width":1024,"height":576},
	{"url":"http://i36.photobucket.com/albums/e41/node10086/dota2hero/d7e98e0fb56607ec3fe1fb76798b666d_zpsumw9esjf.jpg","width":1024,"height":768}
]

new Vue({
	el: '#app',
	data: {
		imageInfos: imageInfos,
		fullSizeSrc: '',
		targetImg: ''
	},
	methods: {
		showFullSize(imageInfo, event) {
			this.fullSizeSrc = imageInfo.url
			this.targetImg = event.target
		},
		hideFullSize() {
			this.fullSizeSrc = ''
			console.log(this.targetImg.scrollIntoView)
			this.targetImg.scrollIntoView()
		}
	}
})

function fixedBody() {
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    document.body.style.cssText += `position: fixed;top: -${scrollTop}px;`
}

function looseBody() {
    let body = document.body;
    body.style.position = '';
    let top = body.style.top;
    document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
    body.style.top = '';
}

const domContainer = document.querySelector('#container')
const domBoxs = document.querySelectorAll('.box')
const domImages = document.querySelectorAll('.img-lazyload')

const wf = new Waterfall(domContainer, domBoxs)
const lazyLoad = new LazyLoad(domImages)