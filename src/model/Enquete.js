//import {connection} from "../data/database.js";
import Enquete from '../data/enquetes.js'
//connection.authenticate( ).then(( )=>{console.log("Conectado !")})

async function get_all () {
  var dados = await Enquete.Enquete.findAll({raw: true})
  dados.map(dado => {
    var Now = new Date()
    if(Now < dado.dt_inicio){
      dado.status = 'Status_NI'
    }else if(Now > dado.dt_fim){
      dado.status = 'Status_F'
    }else{
      dado.status = 'Status_EA'
    }
    dado.dt_inicio = dado.dt_inicio.split("-").reverse().join("/");
    dado.dt_fim = dado.dt_fim.split("-").reverse().join("/")  
    
  })
  return await dados
}
async function selectE(p_id){
  return await Enquete.Enquete.findAll({
    raw: true,
    where: {
      id: p_id
    }
  })
}
async function create (p_enquete) {
  var r_id = await Enquete.Enquete.create({
    titulo: p_enquete.titulo,
    descricao: p_enquete.descricao,
    dt_inicio: p_enquete.inicio,
    dt_fim: p_enquete.fim
  }).then(result =>{ return result.id})
  return r_id
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
