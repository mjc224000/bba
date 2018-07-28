const orm = require('orm');
const option = {
    host: 'mjc224000.top',
    port: "3306",
    username: 'root',
    password: '7898ikuojl',
    database: 'CMS',
    protocol: 'mysql'
}
orm.connect(option, function (err, db) {
    if (err) {
        console.log(err);
        return
    }
    const User = db.define('user', {
            id: {type: 'serial', key: true},
            name: String,
        }
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

    module.exports = new Promise(function (resolve) {
        db.drop(function (v) {
            db.sync(function (err) {
                ['admin', 'student', 'teacher'].forEach(v => {
                    let role = new Role({name: v});
                    role.save();
                    resolve(db);
                })
            })
        });
    })


})


