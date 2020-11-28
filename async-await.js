setImmediate(() => {
    console.log('setImmediate'); // 宏任务 优先级低
})

async function async1() {
    console.log('async1 start') // 同步
    await async2() // 同步
    console.log('async1 end'); // await后面内容，异步微任务
}

async function async2() {
    console.log('async2') 
}

console.log('script start') // 同步

setTimeout(() => {
    console.log('setTimeout') // 异步宏任务
})

async1() // 同步

new Promise((resolve) => {
    console.log('promise1') // 同步
    resolve()
}).then(() => {
    console.log('promise2') // 异步微任务
})

process.nextTick(() => {
    console.log('nextTick') // 异步微任务，优先级在微任务中最高
})

console.log('script end') // 同步

// script start, async1 start, async2, promise1, script end, nextTick, async1 end, promise2, setTimeout, setImmediate