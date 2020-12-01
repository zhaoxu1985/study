const one = '赵钱孙李周吴郑王冯陈楚为将沈韩杨朱琴尤许何吕施章孔曹严华金魏陶江'
const two = '一二三四五六七八九十'
const three = '氢氦锂铍硼碳氮氧氟氖钠镁铝硅磷硫氯氩钾钙'
const four = '唧唧复唧唧木兰当户织不闻机杼声唯闻女叹息'
const five = '燃烧我的卡路里我怎么那么好看'

const gender = '男女'

function fn(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a
}

const arr = []

for (let i = 0; i < 2048; i++) {
  arr.push({
    id: i + 1,
    name: one[fn(0, 31)] + two[fn(0, 9)] + three[fn(0, 19)] + '·' + four[fn(0, 19)] + five[fn(0, 13)],
    age: fn(18, 30),
    gender: gender[fn(0, 1)],
    class: fn(1910, 1920),
    score: fn(40, 100)
  })
}
