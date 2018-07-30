const express = require('express');
const apiRouter = require('./api')
const orm = require('./model');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
app.use(function (req, res, next) {
    next();
})
app.use(cookieParser());
app.use(bodyParser());
app.use('/api', apiRouter);
app.use(function (req, res, next) {

    if (!req.cookies['token']) {
        if (['/login.html', 'signup.html', '/signup', '/login'].indexOf(req.url) === -1) {
            res.redirect('/login.html');
            return
        }
    }
    next()
})

app.use(express.static('view'));
app.post('/login', function (req, res) {
    const {username: name, password} = req.body;
    orm.then(models => {
        models.user.one({name, password}, function (err, doc) {
            if (doc) {
                res.cookie('token', 'welcome', {maxAge: 9000000, httpOnly: true});

                res.redirect(`/${doc.role.name}.html`);

            } else {
                res.send('用户名或密码错误');
            }
        })
    })
})

app.post('/signup', function (req, res) {
    const {username, password, type} = req.body;
    orm.then(function (modles) {
        let user = modles.user;
        user.find({name: username}, function (err, doc) {
            if (doc.length) {

                res.send('用户名已经存在');
                return
            }
            user.create({name: username, password}, function (err, doc) {
                if (err) {
                    res.send('失败')
                }

                modles.role.find({name: type}, function (err, role) {
                    if (role.length) {
                        doc.setRole(role[0], function (err) {
                            if (err) return
                            res.send('成功');
                        })
                    }

                })


            });

        })


    })
})
app.get('/logout', function (req, res) {
    res.cookie('token', '', {maxAge: 0});
    res.redirect('/login.html');
})
app.listen(80)