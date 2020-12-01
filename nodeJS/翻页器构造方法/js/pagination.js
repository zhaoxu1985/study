function Pagination(id, options) {
  this.ele = document.querySelector(id)
  this.pageInfo = {
    pagenum: 1,
    pagesize: options ? options.pagesize || 10 : 10,
    total: options ? options.total || 90 : 90
  }
  this.textInfo = {
    first: options ? options.first || 'first' : 'first',
    prev: options ? options.prev || 'prev' : 'prev',
    list: '',
    next: options ? options.next || 'next' : 'next',
    last: options ? options.last || 'last' : 'last'
  }
  this.change = options ? options.change || function () {} : function () {}
  this.list = null

  // 这个位置的 this 是谁 p1 当前实例
  this.init() // => p1.init()
}

// 0. 启动器
Pagination.prototype.init = function () {
  this.computedTotalPage() // => p1.computedTotalPage()
  this.createEle() // => p1.createEle()
  this.setEleStyle()
  this.createGo()
  this.createPagelist()
  this.isDisable()
  this.dongcidaci()
}

// 1. 根据一页多少条和一共多少条算出多少页
Pagination.prototype.computedTotalPage = function () {
  this.pageInfo.totalpage = Math.ceil(this.pageInfo.total / this.pageInfo.pagesize)
}

// 2. 添加 上一页 / 下一页 / ... 的盒子
Pagination.prototype.createEle = function () {
  const frg = document.createDocumentFragment()
  for (let attr in this.textInfo) {
    const div = document.createElement('div')
    if (attr === 'list') {
      setCss(div, {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      })
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
    frg.appendChild(div)
  }

  // 一次性丢到 this.ele 里面
  this.ele.appendChild(frg)
}

// 3. 给 this.ele 添加一些样式
Pagination.prototype.setEleStyle = function () {
  setCss(this.ele, {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  })
}

// 4. 创建一个文本框和按钮
Pagination.prototype.createGo = function () {
  const inp = document.createElement('input')
  const btn = document.createElement('button')
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
  inp.value = this.pageInfo.pagenum
  inp.type = 'number'
  btn.innerHTML = 'go'
  this.ele.appendChild(inp)
  this.ele.appendChild(btn)
}

// 5. 创建分页列表按钮
Pagination.prototype.createPagelist = function () {
  const { totalpage, pagenum } = this.pageInfo
  const frg = document.createDocumentFragment()
  if (totalpage <= 9) {
    for (let i = 1; i <= totalpage; i++) {
      const p = createP(i, pagenum)
      frg.appendChild(p)
    }
  } else {
    if (pagenum < 5) {
      for (let i = 1; i <= 5; i++) {
        const p = createP(i, pagenum)
        frg.appendChild(p)
      }
      const span = document.createElement('span')
      span.innerHTML = '...'
      frg.appendChild(span)
      for (let i = totalpage - 1; i <= totalpage; i++) {
        const p = createP(i, pagenum)
        frg.appendChild(p)
      }
    }
    if (pagenum === 5) {
      for (let i = 1; i <= 7; i++) {
        const p = createP(i, pagenum)
        frg.appendChild(p)
      }
      const span = document.createElement('span')
      span.innerHTML = '...'
      frg.appendChild(span)
      for (let i = totalpage - 1; i <= totalpage; i++) {
        const p = createP(i, pagenum)
        frg.appendChild(p)
      }
    }
    if (pagenum > 5 && pagenum < totalpage - 4) {
      for (let i = 1; i <= 2; i++) {
        const p = createP(i, pagenum)
        frg.appendChild(p)
      }
      const span = document.createElement('span')
      span.innerHTML = '...'
      frg.appendChild(span)
      for (let i = pagenum - 2; i <= pagenum + 2; i++) {
        const p = createP(i, pagenum)
        frg.appendChild(p)
      }
      const span2 = document.createElement('span')
      span2.innerHTML = '...'
      frg.appendChild(span2)
      for (let i = totalpage - 1; i <= totalpage; i++) {
        const p = createP(i, pagenum)
        frg.appendChild(p)
      }
    }

    if (pagenum === totalpage - 4) {
      for (let i = 1; i <= 2; i++) {
        const p = createP(i, pagenum)
        frg.appendChild(p)
      }
      const span = document.createElement('span')
      span.innerHTML = '...'
      frg.appendChild(span)
      for (let i = totalpage - 6; i <= totalpage; i++) {
        const p = createP(i, pagenum)
        frg.appendChild(p)
      }
    }

    if (pagenum > totalpage - 4) {
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
  this.ele.children[5].value = pagenum
  this.change(pagenum)
  this.list.innerHTML = ''
  this.list.appendChild(frg)
}

// 6. 判断一个禁用标识
Pagination.prototype.isDisable = function () {
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
  this.ele.addEventListener('click', e => {
    e = e || window.event
    const target = e.target || e.srcElement
    if (target.className === 'first' && this.pageInfo.pagenum !== 1) {
      this.pageInfo.pagenum = 1
      this.createPagelist()
      this.isDisable()
    }
    if (target.className === 'prev' && this.pageInfo.pagenum !== 1) {
      this.pageInfo.pagenum--
      this.createPagelist()
      this.isDisable()
    }
    if (target.className === 'next' && this.pageInfo.pagenum !== this.pageInfo.totalpage) {
      this.pageInfo.pagenum++
      this.createPagelist()
      this.isDisable()
    }
    if (target.className === 'last' && this.pageInfo.pagenum !== this.pageInfo.totalpage) {
      this.pageInfo.pagenum = this.pageInfo.totalpage
      this.createPagelist()
      this.isDisable()
    }
    if (target.tagName === 'P') {
      if (this.pageInfo.pagenum !== target.innerHTML - 0) {
        console.log('你点击的是某一页')
        this.pageInfo.pagenum = target.innerHTML - 0
        this.createPagelist()
        this.isDisable()
      }
    }
    if (target.tagName === 'BUTTON') {
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
