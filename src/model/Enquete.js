//import {connection} from "../data/database.js";
import Enquete from '../data/enquetes.js'
import Resposta from './Resposta.js'
//connection.authenticate( ).then(( )=>{console.log("Conectado !")})

async function get_all () {
   return await Enquete.Enquete.findAll({raw: true, order:[['id', 'DESC']]}).then(dados=>{
    dados.map(dado => {
      var Now = new Date().toISOString()
      if(Now <= dado.dt_inicio){
        dado.status = {class:'Status_NI', text: "Não Iniciado"}
      }else if(Now > dado.dt_fim){
        dado.status = {class:'Status_F', text: "Finalizado"}
      }else{
        dado.status = {class:'Status_EA', text:"Em Andamento"}
      }
      dado.dt_inicio = dado.dt_inicio.split("-").reverse().join("/");
      dado.dt_fim = dado.dt_fim.split("-").reverse().join("/")  
      
    })
    return dados
  })
}
async function selectE(p_id){
  return await Enquete.Enquete.findOne({
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
  return await Enquete.Enquete.create({
    titulo: p_enquete.titulo,
    descricao: p_enquete.descricao,
    dt_inicio: p_enquete.inicio,
    dt_fim: p_enquete.fim
  }).then(result =>{ return result.id})
}
async function deleteE (p_id) {
  Enquete.Enquete.destroy({
    where: {
      id: p_id
    }
  })
}
async function updateE (p_enquete) {
  Enquete.Enquete.update(
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
  get_all,
  create,
  deleteE,
  updateE,
  selectE
}
