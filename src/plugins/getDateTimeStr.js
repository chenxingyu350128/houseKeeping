export default function dateTimeFormat(x) {
    if (x instanceof Date) {
        const y = x.getFullYear()
        const m = pretty(x.getMonth() + 1)
        const d = pretty(x.getDate())
        const h = pretty(x.getHours())
        const n = pretty(x.getMinutes())
        const s = pretty(x.getSeconds())
        console.log(`${y}-${m}-${d} ${h}:${n}:${s}`)
        return `${y}-${m}-${d} ${h}:${n}:${s}`
    } 
    console.error('这不是一个date类型')
};
function pretty(x) {
    return x < 10 ? '0' + x : x
}
