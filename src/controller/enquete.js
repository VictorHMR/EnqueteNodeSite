import Enquete from '../model/Enquete.js'
import Resposta from '../model/Resposta.js'

async function list_all (req, res) {
  var data = await Enquete.get_all()
  res.render('index', { enquetes: data })
}
async function createEnquete (req, res) {
  Enquete.create({
    titulo: req.body.titulo,
    inicio: req.body.inicio,
    fim: req.body.fim
  })
    .then(id => {
      Resposta.createR({ titulos: req.body.resposta, enqueteId: id })
    })
    .then(res.redirect('/'))
    .catch(erro => res.send(erro))
}
async function EnqueteSelect (req, res) {
  if(req.params.id){
    var Einfo = await Enquete.selectE(req.params.id)
    Einfo != ''
    ? res.render('votar', {enquete: Einfo, respostas: await Resposta.SelectR(Einfo.id)})
    : res.send('Não existe')
  }
}
async function EnqueteEdit (req, res) {
  if(req.params.id){
    var Einfo = await Enquete.selectE(req.params.id)
    Einfo != ''
    ? res.render('editar', {enquete: Einfo, respostas: await Resposta.SelectR(Einfo.id)})
    : res.send('Não existe')
  }
}
async function updateEnquete (req, res) {
  if(req.params.Rid){
    Resposta.updateR({
      id: req.params.Rid,
      titulo: req.body.resposta,
      Eid: req.params.id
    }).then(res.redirect(`/edit/${req.params.id}`))
  }else{
    Enquete.updateE({
      id: req.params.id,
      titulo: req.body.titulo,
      inicio: req.body.inicio,
      fim: req.body.fim
    }).then(res.redirect(`/edit/${req.params.id}`))
  }
  
}
async function deleteEnquete (req, res) {
  Resposta.deleteAll(req.body.id).then(
    Enquete.deleteE(req.body.id).then(res.redirect('/'))
  )
}
async function addVote(req, res){
  Resposta.increaseVote(req.body.resposta, req.params.id)
  res.redirect(`/enquete/${req.params.id}`)
}

export default {
  list_all,
  createEnquete,
  deleteEnquete,
  updateEnquete,
  EnqueteSelect,
  EnqueteEdit,
  addVote
}
