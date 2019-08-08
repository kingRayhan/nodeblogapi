const app = require('./app')
const boxen = require('boxen')
let port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(
        boxen('Server working at http://localhost:' + port + '\n' + 'NODE_ENV: ' + process.env.NODE_ENV, {
            padding: 1,
        })
    )
})
