import Resposta from '../data/respostas.js'

async function SelectResp(p_id){
    return Resposta.Resposta.findAll({
        where: {
          enqueteId: p_id
        }
      })
}

async function createResposta(p_res){
  p_res.titulos.forEach(titulo => {
    if(titulo != ''){
     Resposta.Resposta.create({
      titulo: titulo,
      enqueteId: p_res.enqueteId
    })
  }
  });
 
}


export default{
    SelectResp,
    createResposta
} 