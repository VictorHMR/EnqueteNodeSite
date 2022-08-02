import Resposta from '../data/respostas.js'

async function SelectR (p_id) {
  return Resposta.Resposta.findAll({
    where: {
      enqueteId: p_id
    }
  })
}

async function createR (p_res) {
  p_res.titulos.forEach(titulo => {
    if (titulo != '') {
      Resposta.Resposta.create({
        titulo: titulo,
        enqueteId: p_res.enqueteId
      })
    }
  })
}

async function updateR (p_resposta) {
  Resposta.Resposta.update(
    {
      titulo: p_resposta.titulo
    },
    {
      where: {
        id: p_resposta.id,
        enqueteId: p_resposta.Eid
      }
    }
  )
}
async function deleteAll (p_Eid) {
  Resposta.Resposta.destroy({
    where: {
      enqueteId: p_Eid
    }
  })
}
async function increaseVote (p_idR, p_idE) {
  await Resposta.Resposta.findOne({
    raw: true,
    where: {
      id: p_idR
    }
  }).then(result => {
    Resposta.Resposta.update(
      {
        votos: result.votos + 1
      },
      {
        where: {
          id: p_idR,
          enqueteId: p_idE
        }
      }
    )
  })
}

export default {
  SelectR,
  createR,
  updateR,
  deleteAll,
  increaseVote
}
