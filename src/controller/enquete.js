import Enquete from '../model/Enquete.js'
import ControllerResposta from '../controller/resposta.js'

async function list_all (req, res) {
  var data = await Enquete.selectAll()
  res.render('index', { enquetes: data })
}
async function createEnquete (req, res) {
  Enquete.create({
    titulo: req.body.titulo,
    inicio: req.body.inicio,
    fim: req.body.fim
  })
    .then(enquete_id => {
      ControllerResposta.createResposta(req, res, enquete_id)
    })
    .then(res.redirect('/'))
    .catch(erro => res.send(erro))
}
async function EnqueteSelect (req, res) {
  if(req.params.id){
    var EnqInfo = await Enquete.selectOne(req.params.id)
    EnqInfo.dt_inicio = EnqInfo.dt_inicio.split("-").reverse().join("/");
    EnqInfo.dt_fim = EnqInfo.dt_fim.split("-").reverse().join("/") ;
    EnqInfo != ''
    ? res.render('votar', {enquete: EnqInfo, respostas: await ControllerResposta.readResposta(req, res, EnqInfo.id)})
    : res.send('Não existe')
  }
}
async function EditionPopulate (req, res) {
  if(req.params.id){
    var EnqInfo = await Enquete.selectOne(req.params.id)
    EnqInfo != ''
    ? res.render('editar', {enquete: EnqInfo, respostas: await ControllerResposta.readResposta(req, res, EnqInfo.id)})
    : res.send('Não existe')
  }
}
async function updateEnquete (req, res) {
  if(req.params.Rid){
    ControllerResposta.updateResposta(req, res)
  }else{
    Enquete.updateE({
      id: req.params.id,
      titulo: req.body.titulo,
      inicio: req.body.inicio,
      fim: req.body.fim
    })
  }
  res.redirect(`/`)
}
//parei aqui
async function deleteEnquete (req, res) {
  ControllerResposta.deleteAllResposta(req).then(
    Enquete.deleteE(req.body.id).then(res.redirect('/'))
  )
}
async function addVote(req, res){
  ControllerResposta.voteResposta(req, res).then(res.redirect(`/enquete/${req.params.id}`))
  
}

export default {
  list_all,
  createEnquete,
  deleteEnquete,
  updateEnquete,
  EnqueteSelect,
  EditionPopulate,
  addVote
}
