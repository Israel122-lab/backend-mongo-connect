
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


Why is it called "save"?

Mongoose has different "hooks" for different actions.
.pre("save"): Runs before creating a new user or updating an existing one.
.pre("remove"): Runs before deleting a user (maybe to delete their posts too).
.pre("validate"): Runs before checking if the email/name fits your schema rules.

A Real-World Analogy:
Imagine you are sending a letter (the User data).
Without .pre("save"): You just drop the letter in the mailbox. Anyone who opens the mailbox can read it (Plain text).
With .pre("save"): Before the letter hits the mailbox, a machine automatically puts it into a shredder/scrambler (Bcrypt). By the time it’s in the mailbox, it’s unreadable code.

*/