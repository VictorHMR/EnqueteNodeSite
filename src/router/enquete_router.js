import express from 'express'
import enqueteController from '../Controller/enquete.js'

const router = express.Router()

router.get('/', enqueteController.list_all)
router.get('/cadastrar', (req, res) => {
  res.render('cadastro')
})
router.get('/edit/:id', enqueteController.EditionPopulate)
router.get('/enquete/:id', enqueteController.EnqueteSelect)

router.post('/cadastrar', enqueteController.createEnquete)
router.post('/votar/:id', enqueteController.addVote)


router.post('/edit/:id/:Rid', enqueteController.updateEnquete)
router.post('/edit/:id', enqueteController.updateEnquete)
// router.post('/edit/:id', (req, res)=>{
//     res.send(req.params.id)
// })


router.post('/deleteE', enqueteController.deleteEnquete)

router.put('/updateE', enqueteController.updateEnquete)
export default { router }
