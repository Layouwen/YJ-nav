const $siteList = $('.site-list')
const $lastLi = $siteList.find('li.last')
// 获取本地数据
const YJData = localStorage.getItem('YJData')
// 转化为对象
const YJObject = JSON.parse(YJData)

// 读取数据或初始化
const hashMap = YJObject || [{
        logo: '我',
        url: 'https://github.com/Layouwen'
    },
    {
        logo: 'G',
        url: 'https://www.github.com'
    }
]

// 清除前缀
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}

// 渲染
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
        <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
                <svg class="icon">
                    <use xlink:href="#icon-close"></use>
                </svg>
            </div>
        </div>
      </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
    })
}

// 首次渲染
render()

// 添加
$('.add-button').on('click', () => {
    let url = window.prompt('请输入需要添加的网址')
    // 对路径进行加工
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    // 添加到本地
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    })
    // 重新渲染
    render()
})

// 离开前保存数据
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('YJData', string)
}