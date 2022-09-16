module.exports = func => {
    return (req,res,next)=>{
        func(req,res,next).catch(next); //cathces error and passes to next
    }
}