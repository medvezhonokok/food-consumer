// noinspection JSUnresolvedFunction

db = connect("mongodb://localhost:27017/freechat")
db.createUser(
    {
        user:"root",
        pwd:"123456",
        roles:[ { role: "readWrite", db: "freechat" }]
    }
)

