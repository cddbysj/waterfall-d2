class LazyLoad {
	constructor(imgs) {
		this.imgs = imgs
		this.clientHeight = document.body.clientHeight || document.documentElement.clientHeight
		this.init()
	}

	init() {
		this.traverseImgs()
		this.bindEvent()
	}

	// 判断单个图片或具有背景图的元素是否在视口范围
	isVisible(el) {
		const bound = el.getBoundingClientRect()
		// 加 50 像素是为了提前加载
		return bound.top <= clientHeight + 50
	}

	// 滚动条滚动时，重新遍历图片
	bindEvent() {
		window.addEventListener('scroll', () => {
			this.throttle(this.traverseImgs(), 200)
		})
	}

	// 滚动条滚动，函数节流
	throttle(fn, mustRun = 500) {
	  let previous = null;
	  return function() {
	    const now = new Date();
	    const context = this;
	    const args = arguments;
	    if (!previous){
	      previous = now;
	    }
	    const remaining = now - previous;
	    if (mustRun && remaining >= mustRun) {
	      fn.apply(context, args);
	      previous = now;
	    }
	  }
	}

	traverseImgs() {
		this.imgs.forEach((img, index) => this.loadImg(img))
	}

	// 加载单张图片，这里是作为 div 元素的背景图
	loadImg(el) {
		const imgSrc = el.dataset.url
		if (imgSrc && this.isVisible(el)) {
			el.style.backgroundImage = `url(${imgSrc})`
			// 去除已经加载的图片元素
			this.imgs = this.imgs.filter(img => img !== el)
		}
	}
}