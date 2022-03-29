module.exports = (text)=>{
    setTimeout(
            ()=>{
                console.log(text.split('').reverse().join('')) //to reverse the string
            }
        ,text.length*1000) // to make the function sleep for the number of seconds equal to the text length
}