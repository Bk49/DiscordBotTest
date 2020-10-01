const axios = require('axios')
const { response } = require('express')
const { REPLServer } = require('repl')

module.exports = {
    getQuotePromise(){
        const PROMISE = axios.get('https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?')
        const dataPromise = PROMISE.then((response)=> response.data)
        return dataPromise
    },
    getColor(){
        const colorAry = ['#E74C3C','#9B59B6','#5DADE2','#2ECC71','#F4D03F','#E67E22','#F0F3F4','#99A3A4']
        return colorAry[Math.floor(Math.random()*colorAry.length)]
    }
}
