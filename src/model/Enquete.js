import EnqueteDB from '../data/enquetes.js'

async function selectAll () {
   return await EnqueteDB.Enquete.findAll({raw: true, order:[['id', 'DESC']]}).then(results =>{
    results.map(dados => {
      var dataNow = new Date().toISOString()
      if(dataNow <= dados.dt_inicio){
        dados.status = {class:'Status_NI', text: "Não Iniciado"}
      }else if(dataNow > dados.dt_fim){
        dados.status = {class:'Status_F', text: "Finalizado"}
      }else{
        dados.status = {class:'Status_EA', text:"Em Andamento"}
      }
      dados.dt_inicio = dados.dt_inicio.split("-").reverse().join("/");
      dados.dt_fim = dados.dt_fim.split("-").reverse().join("/")  
      
    })
    return results
  })
}
async function selectOne(p_id){
  return await EnqueteDB.Enquete.findOne({
    raw: true,
    where: {
      id: p_id
    }
  }).then(dados=>{
      var Now = new Date().toISOString()
      dados.dt_inicio <= Now && dados.dt_fim >= Now ? dados.status = true : dados.status = false   
    return dados
  })
  
}
async function create (p_enquete) {
  return await EnqueteDB.Enquete.create({
    titulo: p_enquete.titulo,
    descricao: p_enquete.descricao,
    dt_inicio: p_enquete.inicio,
    dt_fim: p_enquete.fim
  }).then(result =>{ return result.id})
}
async function deleteE (p_id) {
  EnqueteDB.Enquete.destroy({
    where: {
      id: p_id
    }
  })
}
async function updateE (p_enquete) {
  EnqueteDB.Enquete.update(
    {
      titulo: p_enquete.titulo,
      descricao: p_enquete.descricao,
      dt_inicio: p_enquete.inicio,
      dt_fim: p_enquete.fim
    },
    {
        where:{
            id: p_enquete.id
        }
    }
  )
}

export default {
  selectAll,
  create,
  deleteE,
  updateE,
  selectOne
}
