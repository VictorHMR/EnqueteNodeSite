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
      Resposta.createResposta({ titulos: req.body.resposta, enqueteId: id })
    })
    .then(res.redirect('/'))
    .catch(erro => res.send(erro))
}
async function deleteEnquete (req, res) {
  Enquete.deleteE(req.body.id).then(res.send('Deletado'))
}
async function updateEnquete (req, res) {
  Enquete.updateE({
    id: req.body.id,
    titulo: req.body.titulo,
    inicio: req.body.inicio,
    fim: req.body.fim
  }).then(
    res.redirect('/')
    // Resposta.updateR({

    // })
  )
}
async function EnqueteSelect (req, res) {
  var Einfo = await Enquete.selectE(req.params.id)
  Einfo != ''
    ? res.render('editar', {enquete: Einfo[0], respostas: await Resposta.SelectResp(Einfo[0].id)})
    : res.send('Não existe')
}

export default {
  list_all,
  createEnquete,
  deleteEnquete,
  updateEnquete,
  EnqueteSelect
}
