import express from "express"
import { resolve } from "path"

const app = express()

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use('/', express.static(
  
    './build'
  )
)

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// app.use('/', express.static(
  
//     './build'
//   )
// )

app.listen(process.env.PORT || 3000, (err)=>{
  if (err){ return console.log(err)}
  console.log("deu certo")
})