
app.get('/hello', (req,res) => {
  const { limit, search } = req.query
  let copy = [...products]

  if(limit){
    copy = copy.slice(0, Number(limit))
  }

  if (search){
    copy = copy.filter((pro) => {
      return pro.name.startsWith(search)
    })
  }

  res.status(200).json(copy)
})

/*
how a request flows through an app

incoming request --> app.js --> routes --> controllers --> database (if needed) --> controllers --> routes --> app.js --> response to client



*/