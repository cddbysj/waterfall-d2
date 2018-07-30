// 面向对象的写法
class Waterfall {
	constructor(container, boxs) {
		this.container = container
		this.boxs = Array.from(boxs)
		this.clientWidth = document.documentElement.clientWidth || document.body.clientWidth
		this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight
		this.init()
	}

	init() {
		this.colWidth = this.boxs[0].offsetWidth
		this.cols = ~~(this.clientWidth / this.colWidth)
		this.colsHeight = []
		/*
		实现瀑布流的思路：
		1. 第1行按照向左浮动依照CSS正常排列
		2. 从2行开始使用JS控制布局
		3. 使用一个与列数相等长度的数组来存储各列的高度
		4. 首先找出前一行中各列的最小高度列，存储其高度以及数组内索引
		5. 新的一行的图片元素添加到上一行最小高度列的后面
		6. 更新最小高度列的高度
		7. 依次循环
		*/
		this.boxs.forEach((box, index) => {
			if (index < this.cols) {
				this.colsHeight.push(box.offsetHeight)
			} else {
				this.minColsHeight = Math.min(...this.colsHeight)
				this.minColsHeightIndex = this.colsHeight.indexOf(this.minColsHeight)
				// 设置接下来一张图片的布局
				box.style.cssText = `
					position: absolute;
					left: ${this.minColsHeightIndex * this.colWidth}px;
					top: ${this.minColsHeight}px;
				`
				// 更新数组中的最小高度值
				this.colsHeight[this.minColsHeightIndex] += box.offsetHeight
			}
		})
	}
}