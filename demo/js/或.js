const arr = [{
        a: '刀具',
        b: '不是'
    },
    {
        a: '刀具',
        b: '不是'
    },
    {
        a: '刀具',
        b: '刀具'
    },
    {
        a: '不是',
        b: '刀具'
    },
    {
        a: '不是',
        b: '刀具'
    },
    {
        a: '刀具',
        b: '刀具'
    }, ,
    {
        a: '不是',
        b: '不是'
    }, ,
    {
        a: '你不',
        b: '不是'
    },
]
const isKnife = []
arr.forEach(item => {
    if (item.a !== '刀具' && (!/刀具/.test(item.b))) {
        isKnife.push(item)
    }
})
console.log(isKnife)