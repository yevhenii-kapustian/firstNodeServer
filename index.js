const http = require('http');
const url = require('url');
const fs = require('fs');

const PORT = 3001;

http.createServer((req, res) => {
    const fullPath = url.parse(req.url, true);
    
    res.writeHead(200, "Connection is succssesful!", {"Content-type": "text/html"})
    
    if (fullPath.path === "/") {
        res.write(`<header class="main"> 
            <h1>Welcome to main page!</h1> 
            <div class="main-pages"><a href="/login">Login</a>  <a href="/signUp">Sign Up</a></div> 
            <div class="main-links"><a href='/?name=terms'>Terms</a>    <a href='/?name=privacy'>Privacy</a></div> 
            </header>`)
    }else if (fullPath.path.includes("login")) {
        res.write(`
                <h1>Login</h1>
                <h3>Here you can Login</h3>
                <div class="main-pages"><a href="/">Home</a>  <a href="/signUp">Sign Up</a></div>
            `)
    }else if (fullPath.path.includes("signUp")) {
        res.write(`
            <h1>Sign Up</h1>
            <h3>Here you can Sign Up</h3>
            <div class="main-pages"><a href="/">Home</a>  <a href="/login">Login</a></div>
        `)
    }

    let queries = fullPath.query;

    if (queries.name === "terms") {
        fs.readFile('./data/terms.html', (err, data) => {
            if (err) {
                console.log("Error");
            } else {
                res.write(data)
            }

            fs.readFile('./data/footer.html', (err, footer) => {
                if (err) {
                    res.write("<h2>Error loading Footer</h2>");
                } else {
                    res.write(footer);
                }
                res.end();
            });
        })
        return
    }

    if (queries.name === "privacy") {
        fs.readFile('./data/privacy.html', (err, data) => {
            if (err) {
                res.write("<h2>Error loading Privacy page</h2>");
            } else {
                res.write(data);
            }

            fs.readFile('./data/footer.html', (err, footer) => {
                if (err) {
                    res.write("<h2>Error loading Footer</h2>");
                } else {
                    res.write(footer);
                }
                res.end();
            });
        });
        return;
    }

   fs.readFile('./data/footer.html', (err, data) => {
        if (err) {
            console.log("Something went wrong!");
        }else {
            res.write(data)
        }
        res.end()
   })

}).listen(PORT, () => console.log(`Connecting on port ${PORT}`));
