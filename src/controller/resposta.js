import Resposta from '../model/Resposta.js'

async function readResposta(req, res, E_id){
    return await Resposta.SelectR(E_id)
}

function createResposta(req, res, E_id){
    Resposta.createR({ titulos: req.body.resposta, enqueteId: E_id })
}

function updateResposta(req, res){
    Resposta.updateR({
        id: req.params.Rid,
        titulo: req.body.resposta,
        Eid: req.params.id
      })
}

async function deleteAllResposta(req){
    Resposta.deleteAll(req.body.id)
}

async function voteResposta(req, res){
    Resposta.increaseVote(req.body.resposta, req.params.id)
}

export default{
    readResposta,
    createResposta,
    updateResposta,
    deleteAllResposta,
    voteResposta
}