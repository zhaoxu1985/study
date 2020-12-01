var attributes = [
  {
    "name": "一般",
    "id": 1,
    "pic": {
      "statmpic": "../public/image/attr/m-1.png",
      "statspic": "../public/image/attr/s-1.png",
      "mpic": "http://media.52poke.com/wiki/thumb/9/97/%E6%97%A0%E8%89%B2_TCG.png/25px-%E6%97%A0%E8%89%B2_TCG.png",
      "spic": "http://media.52poke.com/wiki/thumb/1/16/LPLE_%E4%B8%80%E8%88%AC_icon.png/20px-LPLE_%E4%B8%80%E8%88%AC_icon.png"
    },
    "color": {
      "bordercolor": "#8a8a7b",
      "titcolor": "#bbbbaa",
      "bgcolor": "#e7e7d8",
      "tabcolor": "#9199a1",
      "textcolor": "#4c4f52"
    }
  },
  {
    "name": "格斗",
    "id": 2,
    "pic": {
      "statmpic": "../public/image/attr/m-2.png",
      "statspic": "../public/image/attr/s-2.png",
      "mpic": "http://media.52poke.com/wiki/thumb/a/ab/%E6%96%97_TCG.png/25px-%E6%96%97_TCG.png",
      "spic": "http://media.52poke.com/wiki/thumb/1/1a/LPLE_%E6%A0%BC%E6%96%97_icon.png/20px-LPLE_%E6%A0%BC%E6%96%97_icon.png"
    }, "color": { "bordercolor": "#912e1e", "titcolor": "#bb5544", "bgcolor": "#dd9988", "tabcolor": "#cd406a", "textcolor": "#57404a" }
  },
  { "name": "飞行", "id": 3, "pic": { "mpic": "http://media.52poke.com/wiki/thumb/9/97/%E6%97%A0%E8%89%B2_TCG.png/25px-%E6%97%A0%E8%89%B2_TCG.png", "spic": "http://media.52poke.com/wiki/thumb/0/02/LPLE_%E9%A3%9E%E8%A1%8C_icon.png/20px-LPLE_%E9%A3%9E%E8%A1%8C_icon.png", "statmpic": "../public/image/attr/m-3.png", "statspic": "../public/image/attr/s-3.png" }, "color": { "bordercolor": "#3678ff", "titcolor": "#6699ff", "bgcolor": "#99bbff", "tabcolor": "#8ea8de", "textcolor": "#4c525a" } },
  { "name": "毒", "id": 4, "pic": { "mpic": "http://media.52poke.com/wiki/thumb/1/1b/%E8%B6%85_TCG.png/25px-%E8%B6%85_TCG.png", "spic": "http://media.52poke.com/wiki/thumb/7/7b/LPLE_%E6%AF%92_icon.png/20px-LPLE_%E6%AF%92_icon.png", "statmpic": "../public/image/attr/m-4.png", "statspic": "../public/image/attr/s-4.png" }, "color": { "bordercolor": "#792f6a", "titcolor": "#aa5599", "bgcolor": "#c689ba", "tabcolor": "#a96ac8", "textcolor": "#524857" } },
  { "name": "地面", "id": 5, "pic": { "mpic": "http://media.52poke.com/wiki/thumb/a/ab/%E6%96%97_TCG.png/25px-%E6%96%97_TCG.png", "spic": "http://media.52poke.com/wiki/thumb/5/5b/LPLE_%E5%9C%B0%E9%9D%A2_icon.png/20px-LPLE_%E5%9C%B0%E9%9D%A2_icon.png", "statmpic": "../public/image/attr/m-5.png", "statspic": "../public/image/attr/s-5.png" }, "color": { "bordercolor": "#b59226", "titcolor": "#ddbb55", "bgcolor": "#f1dda0", "tabcolor": "#d87844", "textcolor": "#5a4a41" } },
  { "name": "岩石", "id": 6, "pic": { "mpic": "http://media.52poke.com/wiki/thumb/a/ab/%E6%96%97_TCG.png/25px-%E6%96%97_TCG.png", "spic": "http://media.52poke.com/wiki/thumb/8/88/LPLE_%E5%B2%A9%E7%9F%B3_icon.png/20px-LPLE_%E5%B2%A9%E7%9F%B3_icon.png", "statmpic": "../public/image/attr/m-6.png", "statspic": "../public/image/attr/s-6.png" }, "color": { "bordercolor": "#88762c", "titcolor": "#bbaa66", "bgcolor": "#e1d08c", "tabcolor": "#c5b78b", "textcolor": "#57544f" } },
  { "name": "虫", "id": 7, "pic": { "mpic": "http://media.52poke.com/wiki/thumb/c/c2/%E8%8D%89_TCG.png/25px-%E8%8D%89_TCG.png", "spic": "http://media.52poke.com/wiki/thumb/3/3b/LPLE_%E8%99%AB_icon.png/20px-LPLE_%E8%99%AB_icon.png", "statmpic": "../public/image/attr/m-7.png", "statspic": "../public/image/attr/s-7.png" }, "color": { "bordercolor": "#849400", "titcolor": "#aabb22", "bgcolor": "#daec44", "tabcolor": "#91c02e", "textcolor": "#4c543f" } },
  { "name": "幽灵", "id": 8, "pic": { "mpic": "http://media.52poke.com/wiki/thumb/1/1b/%E8%B6%85_TCG.png/25px-%E8%B6%85_TCG.png", "spic": "http://media.52poke.com/wiki/thumb/c/c0/LPLE_%E5%B9%BD%E7%81%B5_icon.png/20px-LPLE_%E5%B9%BD%E7%81%B5_icon.png", "statmpic": "../public/image/attr/m-8.png", "statspic": "../public/image/attr/s-8.png" }, "color": { "bordercolor": "#42428e", "titcolor": "#6666bb", "bgcolor": "#9f9fec", "tabcolor": "#5269ac", "textcolor": "#414852" } },
  { "name": "钢", "id": 9, "pic": { "mpic": "http://media.52poke.com/wiki/thumb/8/84/%E9%92%A2_TCG.png/25px-%E9%92%A2_TCG.png", "spic": "http://media.52poke.com/wiki/thumb/e/e6/LPLE_%E9%92%A2_icon.png/20px-LPLE_%E9%92%A2_icon.png", "statmpic": "../public/image/attr/m-9.png", "statspic": "../public/image/attr/s-9.png" }, "color": { "bordercolor": "#74747b", "titcolor": "#aaaabb", "bgcolor": "#dfdfe1", "tabcolor": "#5a8da1", "textcolor": "#444c52" } },
  { "name": "火", "id": 10, "pic": { "mpic": "http://media.52poke.com/wiki/thumb/f/ff/%E7%81%AB_TCG.png/25px-%E7%81%AB_TCG.png", "spic": "http://media.52poke.com/wiki/thumb/d/d0/LPLE_%E7%81%AB_icon.png/20px-LPLE_%E7%81%AB_icon.png", "statmpic": "../public/image/attr/m-10.png", "statspic": "../public/image/attr/s-10.png" }, "color": { "bordercolor": "#ba1f00", "titcolor": "#ff4422", "bgcolor": "#ff927d", "tabcolor": "#fe9c54", "textcolor": "#5f4f44" } },
  { "name": "水", "id": 11, "pic": { "mpic": "http://media.52poke.com/wiki/thumb/d/dd/%E6%B0%B4_TCG.png/25px-%E6%B0%B4_TCG.png", "spic": "http://media.52poke.com/wiki/thumb/f/ff/LPLE_%E6%B0%B4_icon.png/20px-LPLE_%E6%B0%B4_icon.png", "statmpic": "../public/image/attr/m-11.png", "statspic": "../public/image/attr/s-11.png" }, "color": { "bordercolor": "#0d6ac8", "titcolor": "#3399ff", "bgcolor": "#77bbff", "tabcolor": "#4f90d5", "textcolor": "#414e5a" } },
  { "name": "草", "id": 12, "pic": { "mpic": "http://media.52poke.com/wiki/thumb/c/c2/%E8%8D%89_TCG.png/25px-%E8%8D%89_TCG.png", "spic": "http://media.52poke.com/wiki/thumb/e/ef/LPLE_%E8%8D%89_icon.png/20px-LPLE_%E8%8D%89_icon.png", "statmpic": "../public/image/attr/m-12.png", "statspic": "../public/image/attr/s-12.png" }, "color": { "bordercolor": "#40c60a", "titcolor": "#77cc55", "bgcolor": "#bdffa3", "tabcolor": "#62bb5a", "textcolor": "#445447" } },
  { "name": "电", "id": 13, "pic": { "mpic": "http://media.52poke.com/wiki/thumb/e/ea/%E9%9B%B7_TCG.png/25px-%E9%9B%B7_TCG.png", "spic": "http://media.52poke.com/wiki/thumb/3/36/LPLE_%E7%94%B5_icon.png/20px-LPLE_%E7%94%B5_icon.png", "statmpic": "../public/image/attr/m-13.png", "statspic": "../public/image/attr/s-13.png" }, "color": { "bordercolor": "#bd8e00", "titcolor": "#ffcc33", "bgcolor": "#fae078", "tabcolor": "#f4d23c", "textcolor": "#5d5941" } },
  { "name": "超能力", "id": 14, "pic": { "mpic": "http://media.52poke.com/wiki/thumb/1/1b/%E8%B6%85_TCG.png/25px-%E8%B6%85_TCG.png", "spic": "http://media.52poke.com/wiki/thumb/e/ea/LPLE_%E8%B6%85%E8%83%BD%E5%8A%9B_icon.png/20px-LPLE_%E8%B6%85%E8%83%BD%E5%8A%9B_icon.png", "statmpic": "../public/image/attr/m-14.png", "statspic": "../public/image/attr/s-14.png" }, "color": { "bordercolor": "#d00053", "titcolor": "#ff5599", "bgcolor": "#ff9cc4", "tabcolor": "#f97178", "textcolor": "#5d484a" } },
  { "name": "冰", "id": 15, "pic": { "mpic": "http://media.52poke.com/wiki/thumb/d/dd/%E6%B0%B4_TCG.png/25px-%E6%B0%B4_TCG.png", "spic": "http://media.52poke.com/wiki/thumb/b/ba/LPLE_%E5%86%B0_icon.png/20px-LPLE_%E5%86%B0_icon.png", "statmpic": "../public/image/attr/m-15.png", "statspic": "../public/image/attr/s-15.png" }, "color": { "bordercolor": "#13a8d9", "titcolor": "#77ddff", "bgcolor": "#dbf6ff", "tabcolor": "#73cebf", "textcolor": "#475757" } },
  { "name": "龙", "id": 16, "pic": { "mpic": "http://media.52poke.com/wiki/thumb/6/62/%E9%BE%99_TCG.png/25px-%E9%BE%99_TCG.png", "spic": "http://media.52poke.com/wiki/thumb/6/61/LPLE_%E9%BE%99_icon.png/20px-LPLE_%E9%BE%99_icon.png", "statmpic": "../public/image/attr/m-16.png", "statspic": "../public/image/attr/s-16.png" }, "color": { "bordercolor": "#31229d", "titcolor": "#7766ee", "bgcolor": "#a194ff", "tabcolor": "#0a6dc2", "textcolor": "#364857" } },
  { "name": "恶", "id": 17, "pic": { "mpic": "http://media.52poke.com/wiki/thumb/2/21/%E6%81%B6_TCG.png/25px-%E6%81%B6_TCG.png", "spic": "http://media.52poke.com/wiki/thumb/3/33/LPLE_%E6%81%B6_icon.png/20px-LPLE_%E6%81%B6_icon.png", "statmpic": "../public/image/attr/m-17.png", "statspic": "../public/image/attr/s-17.png" }, "color": { "bordercolor": "#442c21", "titcolor": "#775544", "bgcolor": "#bda396", "tabcolor": "#5a5365", "textcolor": "#44444a" } },
  { "name": "妖精", "id": 18, "pic": { "mpic": "http://media.52poke.com/wiki/thumb/1/1c/%E5%A6%96_TCG.png/25px-%E5%A6%96_TCG.png", "spic": "http://media.52poke.com/wiki/thumb/6/6e/LPLE_%E5%A6%96%E7%B2%BE_icon.png/20px-LPLE_%E5%A6%96%E7%B2%BE_icon.png", "statmpic": "../public/image/attr/m-18.png", "statspic": "../public/image/attr/s-18.png" }, "color": { "bordercolor": "#ec67ea", "titcolor": "#ffaaff", "bgcolor": "#fbcbfb", "tabcolor": "#eb8fe6", "textcolor": "#5d4e5d" } }
]