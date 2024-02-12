import express from 'express';
import {
  createHostel,
  getAllHostels,
  getHostel,
  updateHostel,
  deleteHostel,
  getNearbyHostels
} from '../controller/hostel.controller.js'; 

const router = express.Router();
router.get('/nearby', getNearbyHostels);

router.route('/')
  .get(getAllHostels)
  .post(createHostel);

router.route('/:id')
  .get(getHostel)
  .patch(updateHostel)
  .delete(deleteHostel);


export default router;
