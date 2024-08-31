const http = require('http')
const url = require('url')
const fs = require('fs')
const { exec } = require('child_process')
const { setTimeout } = require('timers/promises')

// 10 sample reviews
const reviews = [
  {
    "name": "John Doe",
    "job": "Software Engineer",
    "stars": "5",
    "msg": "This is the best book I've ever read!"
  },
  {
    "name": "Jane Smith",
    "job": "Graphic Designer",
    "stars": "4",
    "msg": "I really enjoyed reading this book. It was informative and engaging."
  },
  {
    "name": "Bob Johnson",
    "job": "Marketing Specialist",
    "stars": "3",
    "msg": "This book was okay, but I didn't find it as interesting as some others."
  },
  {
    "name": "Alice Brown",
    "job": "Product Manager",
    "stars": "5",
    "msg": "This book changed my perspective on life. I highly recommend it to everyone."
  },
  {
    "name": "Mike Davis",
    "job": "Sales Manager",
    "stars": "4",
    "msg": "I found this book to be a great resource for my job. It provided valuable insights."
  },
  {
    "name": "Emily Wilson",
    "job": "HR Manager",
    "stars": "5",
    "msg": "This book was a game-changer for me. It helped me improve my leadership skills."
  },
  {
    "name": "David Taylor",
    "job": "Project Manager",
    "stars": "3",
    "msg": "I didn't find this book to be as helpful as I had hoped. It could have been more detailed."
  },
  {
    "name": "Sarah Thompson",
    "job": "Customer Service Representative",
    "stars": "4",
    "msg": "This book was a great read. It provided some interesting insights into customer behavior."
  }
]
const stats = [
  {
    "name": "Satıp alıwshılar",
    "statistics": "37"
  },
  {
    "name": "Platformadan paydalanıwshılar",
    "statistics": "19"
  },
  {
    "name": "Tarmaqlardaǵı paydalanıwshılar",
    "statistics": "248"
  },
  {
    "name": "Tarqatılǵan kitaplar",
    "statistics": "45"
  }
]

const errorHTML = (code, msg = "Bul bet endi tayarlanıw ústinde, iltimas bıraz waqıttan soń qaytadan kiriń yáki qollap-quwwatlawǵa qátelik haqqında maǵlıwmat beriń") => `
  <main class="main" style="margin-top: 100px;">

    <div class="container ">
      <section id="blog-details" class="blog-details section">
        <div class="container">
          <article class="article"
            style="min-height: 300px; align-items: center; justify-content: center; display: flex;">
            <div>
              <h2>${code} kodlı qátelik júz berdi :(</h2>
              <p class="bad-page-message">
                ${msg}
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>

  </main>
`

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname
  const query = parsedUrl.query
  const method = req.method

  console.log(method, pathname, query)

  if (method === 'GET' && pathname === '/api') {
    exec('ls', (error, stdout, stderr) => {
      if (error) {
        console.error(`Qátelik: ${error}`)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Serverde qtelik' }))
        return
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ output: "HI" }))
    })
  }
  else if (method === 'GET' && pathname === '/book/demo') {
    const data = fs.readFileSync('./assets/book/sample.pdf')
    if (data) {
      res.writeHead(200, { 'Content-Type': 'application/pdf' })
      res.end(data)
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(errorHTML(404, 'Demo kitap júklenbegen'))
    }
  }
  else if (['OPTIONS', 'POST'].includes(method) && pathname === '/buy') {
    console.log('THE REQUEST HAS COME')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
    res.setHeader('Access-Control-Max-Age', 2592000)
    res.setHeader("Access-Control-Allow-Headers", "*")

    await setTimeout(5000)

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ message: 'Buyırtpańıs qabıllandı, jaqın arada siz benen baylanısamıs' }))
  }
  else if (['OPTIONS', 'GET'].includes(method) && pathname === '/reviews') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
    res.setHeader('Access-Control-Max-Age', 2592000)
    res.setHeader("Access-Control-Allow-Headers", "*")

    await setTimeout(2000)

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(reviews))
  }
  else if (['OPTIONS', 'GET'].includes(method) && pathname === '/stats') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
    res.setHeader('Access-Control-Max-Age', 2592000)
    res.setHeader("Access-Control-Allow-Headers", "*")

    await setTimeout(2000)

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(stats))
  }
  else if (['OPTIONS', 'POST'].includes(method) && pathname === '/platform') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
    res.setHeader('Access-Control-Max-Age', 2592000)
    res.setHeader("Access-Control-Allow-Headers", "*")

    await setTimeout(2000)

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ message: 'Bunday maǵlıwmatlarǵa iye paydalanıwshı tabılmadı' }))
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(errorHTML(404))
  }
})

server.listen(3000, () => {
  console.log('Server 3000-portda islemekte')
})
