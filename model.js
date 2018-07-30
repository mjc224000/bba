const orm = require('orm');
const option = {
    host: 'mjc224000.top',
    port: "3306",
    username: 'root',
    password: '7898ikuojl',
    database: 'CMS',
    protocol: 'mysql'
}


async function init(modles) {
    let user = modles.user;
    let role = modles.role;
    new Promise(function (resolve, reject) {
        modles.role.create([{name: 'admin'}, {name: 'teacher'}, {name: 'student'}], function (err) {
            resolve();
        })
    }).then(function () {
        return new Promise(function (resolve) {
            modles.user.create({name: 'admin', password: '123'}, function (err, doc) {

                role.getAsync(1).then(admin => doc.setRole(admin, function () {

                }))
            });
        })
    })
}


module.exports = (function () {
    var ret = {};
    ret.then = function (cb) {
        orm.connect(option, function (err, db) {
            if (err) {
                console.log(err);
                return
            }
            const User = db.define('user', {
                    id: {type: 'serial', key: true},
                    name: String,
                    desc: String,
                    password: String
                },{autoFetch:true}
            )
            const Role = db.define('role', {
                id: {type: 'serial', key: true},
                name: String
            })
            const Course = db.define('course', {
                id: {type: 'serial', key: true},
                name: String
            })
            User.hasMany('course', Course);
            User.hasOne('role', Role, {revers: 'members'});
            cb(db.models);
            /*  db.drop(function (v) {
                  db.sync(function (err) {
                      init(db.models);

                  })
              });*/


        })
    }
return ret
})()


