const ten = document.getElementById('ten')
const ho = document.getElementById('ho')
const sdt = document.getElementById('sdt')
const malop = document.getElementById('malop')
const tenlop = document.getElementById('tenlop')
const image = document.getElementById('image')
const add = document.getElementById('add')
const xoa_condition = document.getElementById('xoa_condition')

let fileU = null

const fileOk = (file) => {
    fileU = file.files[0]
    console.log(fileU)
}


add.addEventListener('click', (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('malop',malop.value)
    formData.append('tenlop',tenlop.value)
    formData.append('ten',ten.value)
    formData.append('ho',ho.value)
    formData.append('sdt',sdt.value)
    formData.append('image',fileU)
    axios({
        method : 'post',
        url : '/lop',
        data : formData,
        headers : {
            'Content-Type' : 'multipart/form-data'
        }
    }).then(d => {
       console.log(d)
    }).catch(e => {
        console.log(e)
    })
})


xoa_condition.addEventListener('click',(e) => {
    e.preventDefault()
    axios({
        'method' : 'delete',
        'url' : '/xoa/' + '13CTT',
    }).then(d => {
        location.reload('/')
    }).catch(e => {
        console.log(e)
    })
})