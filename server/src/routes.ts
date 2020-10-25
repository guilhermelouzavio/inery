import {Router} from 'express'
import MedicineController from './controllers/MedicineController'
import PacientController from './controllers/PatientController'
import RecipeController from './controllers/RecipeController'
const routes = Router()

routes.post('/pacient', PacientController.create)
routes.get('/pacient', PacientController.index)
routes.get('/pacient/:id', PacientController.show)

routes.post('/medicine', MedicineController.create)
routes.get('/medicine', MedicineController.index)
routes.get('/medicine/:id', MedicineController.show)

routes.post('/recipe', RecipeController.create)

export default routes