function Pagination(id, options) {
  // 获取分页器盒子
  this.ele = document.querySelector(id)

  // options 是一个对象
  // 里面由一个成员叫做 change 是一个函数地址
  // options.change 就是一个函数地址
  // options.change()
  // console.log(options)

  // this.change = options.change || function () {}

  // if (options === undefined) {
  //   options = {}
  // }

  // // 代码能执行到这一行，证明 options 至少是一个对象
  // if (options.pagesize === undefined) {
  //   options.pagesize = 10
  // }

  // if (options.total === undefined) {
  //   options.total = 90
  // }

  // if (options.first === undefined) {
  //   options.first = 'first'
  // }

  // if (options.prev === undefined) {
  //   options.prev = 'prev'
  // }

  // if (options.next === undefined) {
  //   options.next = 'next'
  // }

  // if (options.last === undefined) {
  //   options.last = 'last'
  // }

  // 我去渲染页面时候使用的数据
  // // 分页相关的信息
  // this.pageInfo = {
  //   pagenum: 1,
  //   pagesize: options.pagesize,
  //   total: options.total
  // }

  this.pageInfo = {
    pagenum: 1,
    pagesize: options ? options.pagesize || 10 : 10,
    total: options ? options.total || 90 : 90
  }
  // 准备一个文字相关的信息
  // this.textInfo = {
  //   first: options.first,
  //   prev: options.prev,
  //   list: '',
  //   next: options.next,
  //   last: options.last
  // }

  this.textInfo = {
    first: options ? options.first || 'first' : 'first',
    prev: options ? options.prev || 'prev' : 'prev',
    list: '',
    next: options ? options.next || 'next' : 'next',
    last: options ? options.last || 'last' : 'last'
  }

  // 处理默认函数
  // 这个 this.change 不管怎么样，执行的时候不会报错
  // 这个 this.change 就是你传递进来的那个函数
  // 将来 this.change() 的时候就是再调用你传递进来的那个函数
  // 每一次我也换页面的时候都会调用一遍 this.change()
  this.change = options ? options.change || function () {} : function () {}

  // 准备一个东西保存 list 标签
  this.list = null
}

// 0. 启动器
Pagination.prototype.init = function () {
  // 将来实例页可以调用
  // 当实例调用这个方法的时候
  // 这个函数里面的 this 指向当前实例

  this.computedTotalPage() // => p1.computedTotalPage()
  this.createEle() // => p1.createEle()
  this.setEleStyle()
  this.createGo()
  this.createPagelist()
  this.isDisable()
  this.dongcidaci()
}

// 该写方法去渲染
// 1. 根据一页多少条和一共多少条算出多少页
Pagination.prototype.computedTotalPage = function () {
  // 使用 向上取整（多少条数据 / 一页展示多少条）
  this.pageInfo.totalpage = Math.ceil(this.pageInfo.total / this.pageInfo.pagesize)
}

// 2. 添加 上一页 / 下一页 / ... 的盒子
Pagination.prototype.createEle = function () {
  // 我应该创建一堆元素添加进去，添加到 this.ele 身上
  // 创建多少个元素
  // 根据 textInfo 放 五个元素
  const frg = document.createDocumentFragment()
  for (let attr in this.textInfo) {
    // attr 是什么 textInfo 里面的每一个 key
    // 创建元素
    const div = document.createElement('div')
    // 分别判断一个内容
    // 当 attr === list 的时候
    // 不需要样式

    if (attr === 'list') {

      setCss(div, {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      })

      // 赋值给我提前准备好的变量
      this.list = div
    } else {
      setCss(div, {
        border: '1px solid #333',
        padding: '0 5px',
        margin: '0 5px',
        cursor: 'pointer'
      })
    }

    div.innerHTML = this.textInfo[attr]
    div.className = attr
    // 丢到文档碎片里面
    frg.appendChild(div)
  }

  // 一次性丢到 this.ele 里面
  this.ele.appendChild(frg)
}

// 3. 给 this.ele 添加一些样式
Pagination.prototype.setEleStyle = function () {
  // this.ele.style.display = 'flex'
  // this.ele.style.justifyContent = 'center'
  // this.ele.style.alignItems = 'center'
  setCss(this.ele, {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  })
}

// 4. 创建一个文本框和按钮
Pagination.prototype.createGo = function () {
  // 创建一个文本框和一个按钮
  const inp = document.createElement('input')
  const btn = document.createElement('button')

  // 设置样式
  setCss(inp, {
    outline: 'none',
    width: '50px',
    height: '20px'
  })

  setCss(btn, {
    outline: 'none',
    width: '30px',
    height: '24px'
  })

  // 设置文字
  inp.value = this.pageInfo.pagenum
  inp.type = 'number'
  btn.innerHTML = 'go'

  // 丢到 this.ele 里面
  this.ele.appendChild(inp)
  this.ele.appendChild(btn)
}

// 5. 创建分页列表按钮
Pagination.prototype.createPagelist = function () {
  // 创建若干个元素，放在 this.list 里面
  // 创建多少个元素
  // 小于 9 页，就直接创建 9 个盒子放进去
  // 大于 9 页，渲染一部分，一部分用 ...
  const totalpage = this.pageInfo.totalpage // => const totalpage = this.pageInfo.totalpage
  const pagenum = this.pageInfo.pagenum
  // const { totalpage, pagenum } = this.pageInfo
  const frg = document.createDocumentFragment()

  // 先判断一个小于九页的情况
  if (totalpage <= 9) {
    for (let i = 1; i <= totalpage; i++) {
      const p = createP(i, pagenum)
      frg.appendChild(p)
    }
  } else {
    // 大于 9 页的情况
    // 判断当前页面是不是小于 5
    if (pagenum < 5) {
      // 1 2 3 4 5 ... totalpage-1 totalpage
      for (let i = 1; i <= 5; i++) {
        const p = createP(i, pagenum)
        frg.appendChild(p)
      }

      // span 标签用来书写 ...
      const span = document.createElement('span')
      span.innerHTML = '...'
      // 丢到 frg 里面
      frg.appendChild(span)

      for (let i = totalpage - 1; i <= totalpage; i++) {
        const p = createP(i, pagenum)
        frg.appendChild(p)
      }
    }

    // 判断当前页面刚好是 5 的时候
    if (pagenum === 5) {
      // 1 2 3 4 5 6 7 ... totalpage-1 totalpage
      for (let i = 1; i <= 7; i++) {
        const p = createP(i, pagenum)
        frg.appendChild(p)
      }

      // span 标签用来书写 ...
      const span = document.createElement('span')
      span.innerHTML = '...'
      // 丢到 frg 里面
      frg.appendChild(span)

      for (let i = totalpage - 1; i <= totalpage; i++) {
        const p = createP(i, pagenum)
        frg.appendChild(p)
      }
    }

    // 判断大于 5 页 小于 倒数第五页
    // pagenum > 5 && pagenum < totalpage - 4
    if (pagenum > 5 && pagenum < totalpage - 4) {
      // 1 2 ... 当前页前两个到当前页后两个 ... 最后两个
      for (let i = 1; i <= 2; i++) {
        const p = createP(i, pagenum)
        frg.appendChild(p)
      }

      const span = document.createElement('span')
      span.innerHTML = '...'
      // 丢到 frg 里面
      frg.appendChild(span)

      // 渲染当前页的前两个到后两个
      for (let i = pagenum - 2; i <= pagenum + 2; i++) {
        const p = createP(i, pagenum)
        frg.appendChild(p)
      }

      const span2 = document.createElement('span')
      span2.innerHTML = '...'
      // 丢到 frg 里面
      frg.appendChild(span2)

      // 渲染后两个
      for (let i = totalpage - 1; i <= totalpage; i++) {
        const p = createP(i, pagenum)
        frg.appendChild(p)
      }
    }

    // 判断刚好是倒数第五页
    if (pagenum === totalpage - 4) {
      for (let i = 1; i <= 2; i++) {
        const p = createP(i, pagenum)
        frg.appendChild(p)
      }

      const span = document.createElement('span')
      span.innerHTML = '...'
      frg.appendChild(span)

      // 倒数第五页向前到两个一直到最后
      // totalpage - 6  ~  totalpage
      for (let i = totalpage - 6; i <= totalpage; i++) {
        const p = createP(i, pagenum)
        frg.appendChild(p)
      }
    }

    // 当前页面大于倒数第五页的时候
    if (pagenum > totalpage - 4) {
      // 1 2 ... 最后五页
      for (let i = 1; i <= 2; i++) {
        const p = createP(i, pagenum)
        frg.appendChild(p)
      }

      const span = document.createElement('span')
      span.innerHTML = '...'
      frg.appendChild(span)

      for (let i = totalpage - 4; i <= totalpage; i++) {
        const p = createP(i, pagenum)
        frg.appendChild(p)
      }
    }
  }

  // 渲染完毕就知道当前页面是哪一个了
  // 可不可以把当前页面的值赋值给那个文本框的value
  this.ele.children[5].value = pagenum

  // 每一次创建完毕或者切换的时候调用以下 this.change
  this.change(pagenum)

  // 一次性丢到 this.list 里面
  this.list.innerHTML = ''
  this.list.appendChild(frg)
}

// 6. 判断一个禁用标识
Pagination.prototype.isDisable = function () {
  // 如果当前是第一页 让首页和上一页由一个禁用标识
  // 如果当前页是最后一页，让下一页和末页由一个禁用标识
  if (this.pageInfo.pagenum === 1) {
    this.ele.children[0].style.backgroundColor = '#ccc'
    this.ele.children[1].style.backgroundColor = '#ccc'
  } else {
    this.ele.children[0].style.backgroundColor = 'transparent'
    this.ele.children[1].style.backgroundColor = 'transparent'
  }

  if (this.pageInfo.pagenum === this.pageInfo.totalpage) {
    this.ele.children[3].style.backgroundColor = '#ccc'
    this.ele.children[4].style.backgroundColor = '#ccc'
  } else {
    this.ele.children[3].style.backgroundColor = 'transparent'
    this.ele.children[4].style.backgroundColor = 'transparent'
  }
}

// 7. 让分页器动起来
Pagination.prototype.dongcidaci = function () {
  // 点击事件
  // 因为我们的所有元素都是动态添加的
  // 事件委托 this.ele
  this.ele.addEventListener('click', e => {
    e = e || window.event
    const target = e.target || e.srcElement

    // 使用 id 条件判断来决定你点击的是哪一个按钮
    if (target.className === 'first' && this.pageInfo.pagenum !== 1) {
      // console.log('你点击的是首页')
      this.pageInfo.pagenum = 1
      this.createPagelist()
      this.isDisable()
    }

    if (target.className === 'prev' && this.pageInfo.pagenum !== 1) {
      // console.log('你点击的是上一页')
      this.pageInfo.pagenum--
      this.createPagelist()
      this.isDisable()
    }

    if (target.className === 'next' && this.pageInfo.pagenum !== this.pageInfo.totalpage) {
      // console.log('你点击的是下一页')
      // this.pageInfo.pagenum ++
      this.pageInfo.pagenum++
      this.createPagelist()
      this.isDisable()
    }

    if (target.className === 'last' && this.pageInfo.pagenum !== this.pageInfo.totalpage) {
      // console.log('你点击的是末页')
      this.pageInfo.pagenum = this.pageInfo.totalpage
      this.createPagelist()
      this.isDisable()
    }

    if (target.tagName === 'P') {
      // 知道你点击的是那一页
      if (this.pageInfo.pagenum !== target.innerHTML - 0) {
        console.log('你点击的是某一页')
        this.pageInfo.pagenum = target.innerHTML - 0
        this.createPagelist()
        this.isDisable()
      }
    }

    if (target.tagName === 'BUTTON') {
      // console.log('你点击的是跳转')
      // 获取文本框的 value
      let value = target.previousElementSibling.value - 0

      if (value <= 1) {
        value = 1
      }

      if (value >= this.pageInfo.totalpage) {
        value = this.pageInfo.totalpage
      }

      this.pageInfo.pagenum = value
      target.previousElementSibling.value = value
      this.createPagelist()
      this.isDisable()
    }
  })
}

function setCss(ele, styles) {
  for (let attr in styles) {
    ele.style[attr] = styles[attr]
  }
}

function createP(i, pagenum) {
  const p = document.createElement('p')

  setCss(p, {
    border: '1px solid #333',
    padding: '0 5px',
    margin: '0 5px',
    cursor: 'pointer'
  })

  if (i === pagenum) {
    p.style.backgroundColor = 'orange'
  }

  p.innerHTML = i

  return p
}

// var obj = {}
// var obj2 = {
//   name: 'Jack',
//   age: 18,
//   gender: '男'
// }

// for (let attr in obj2) {
//   console.log(attr)
//   // attr 就是 name age gender 三个字符串
//   obj[attr] = obj2[attr]
// }

// console.log(obj)
