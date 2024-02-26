console.log("正在加载：链接活跃性检测" + Date())
if (localStorage.getItem("ondeload") == "true") {
    let beloadDate = new Date()
    let beload = beloadDate.getFullYear() * 10000 + beloadDate.getMonth() * 100 + beloadDate.getDate()
    let deload = localStorage.getItem("deload")
    let list = {}
    Object.assign(list, JSON.parse(localStorage.getItem("loaded")))
    document.querySelectorAll("a").forEach((v, k) => {
        if (list[v.href] == "true") v.style = "color: green;"
        else if (list[v.href] == "false") v.style = "color: red;"
    })
    if (beload - Number(deload) > 7) {
        document.querySelectorAll("a").forEach((v, k) => {
            fetch(`${location.href.slice(-1)=="/"?location.href.slice(0,-1):location.href}:93?name=${v.innerHTML}&url=${v.href}`).then(res => res.json()).then(data => {
                console.log(data.msg)
                if(data.code=="200") {
                    list[v.href] = "true"
                    v.style = "color: green;"
                    localStorage.setItem("loaded", JSON.stringify(list))
                }else{
                    list[v.href] = "false"
                    v.style = "color: red;"
                    localStorage.setItem("loaded", JSON.stringify(list))
                }
            }).catch(err => {
                console.log(`测试服务器未连接： ${err}`)
                let p = document.createElement("link")
                p.rel = "stylesheet"
                p.type = "text/css"
                p.href = v.href
                p.onload = () => {
                    list[v.href] = "true"
                    v.style = "color: green;"
                    document.querySelector("body").removeChild(p)
                    localStorage.setItem("loaded", JSON.stringify(list))
                }
                p.onabort = () => {
                    list[v.href] = "false"
                    v.style = "color: red;"
                    document.querySelector("body").removeChild(p)
                    localStorage.setItem("loaded", JSON.stringify(list))
                }
                p.onerror = () => {
                    list[v.href] = "false"
                    v.style = "color: red;"
                    document.querySelector("body").removeChild(p)
                    localStorage.setItem("loaded", JSON.stringify(list))
                }
                document.querySelector("body").appendChild(p)
            })
        })
        localStorage.setItem("deload", beload)
    }
}
if(localStorage.getItem("ondeload") == 'true') document.querySelector("#box-linkavilible").checked = true
document.querySelector("#box-linkavilible").onclick = (e)=>{
    localStorage.setItem("ondeload", e.target.checked)
}
console.log("已加载：链接活跃性检测" + Date())