const express = require('express')
const multer = require('multer')
const path = require('path')
const uuid = require('uuid')
const hbs = require('hbs')
const { AWS, tableName, tableName1, docClient } = require('./crud')
const axios = require('axios')

const app = express()
const port = process.env.port || 3001
const viewPath = path.join(__dirname, './template')
const publicPath = path.join(__dirname, './public')

app.use(express.json())
app.set('view engine', 'hbs')
app.set('views', viewPath)
app.use(express.static(publicPath))

const s3 = new AWS.S3({
    accessKeyId: '',
    secretAccessKey: ''
})

const storage = multer.memoryStorage()
const upload = multer({ storage }).single('image')





app.get('/home', async (req, resp) => {
    const param = {
        TableName: tableName
    }

    const results = []
    let item;

    item = await docClient.scan(param).promise()

    do {
        item.Items.forEach(sv => {
            results.push(sv)
        });
    } while (typeof item.LastEvaluatedKey != 'undefined')

    resp.render('home', {
        results
    })
})


app.post('/lop', upload, async (req, resp) => {
    const param = {
        TableName: tableName1,
        Item: {
            'malop': `${uuid.v4()}`,
            'reallop': req.body.malop,
            'tenlop': req.body.tenlop
        }
    }

    console.log(req.body)
    const na = req.file.originalname.split('.')[1]
    const pr2 = {
        Bucket : 'dungxoa',
        Key : `${uuid.v4()}.${na}`,
        Body : req.file.buffer,
        ACL : 'public-read'
        
    }

    const datas = await s3.upload(pr2).promise()
    console.log(datas)
    docClient.put(param, (e, d) => {
        if (d) {
            axios({
                'method': 'post',
                'url': 'http://3.83.11.101:3001/sinhvien',
                'data': {
                    ho: req.body.ho,
                    ten: req.body.ten,
                    sdt: req.body.sdt,
                    lop: req.body.malop,
                    avatar : datas.Location
                }
            }).then(d => {
                return resp.status(200).send("NGON")
            }).catch(e => {
                console.log(e)
                return resp.status(500).send(e.message)
            })
        } else {
            console.log(e)
            return resp.status(500).send(e.message)
        }
    })
})


app.post('/sinhvien', (req, resp) => {
    const param = {
        TableName: tableName,
        Item: {
            maso: `${uuid.v4()}`,
            ho: req.body.ho,
            ten: req.body.ten,
            sdt: req.body.sdt,
            lop: req.body.lop,
            avatar : req.body.avatar
        }
    }

    docClient.put(param, (e, d) => {
        if (e) {
            return resp.status(500).send(e.message)
        }
        return resp.status(200).send("NGON")
    })
})



app.delete('/xoa/:lop', async (req, resp) => {
    const malop = req.params.lop

    const arrID = []
    const pr1 = {
        TableName: tableName,
        FilterExpression: "lop = :lop",
        ExpressionAttributeValues: {
            ":lop": malop
        }
    }
    let item = null
    item = await docClient.scan(pr1).promise()
    do {
        item.Items.forEach(sv => {
            arrID.push(sv.maso)
        })
    } while (typeof item.LastEvaluatedKey != 'undefined')

    arrID.forEach(id => {
        const param = {
                TableName : tableName,
                Key : {
                    maso : id
                }
            }

            docClient.delete(param,(e,d) => {
                if(e){
                    return resp.status(500).send(e)
                }
            })

    })

    return resp.status(200).send("NGON")

})

app.listen(port, () => {
    console.log(`Listen at port ${port}`)
})