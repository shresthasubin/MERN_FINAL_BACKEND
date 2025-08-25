import express from 'express';
import {
  createAttendance,
  getAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance
} from '../controllers/attendanceController.js';

const router = express.Router();

router.post('/create', createAttendance);
router.get('/get', getAttendance);
// router.get('/:id', getAttendanceById);
router.put('/update/:id', updateAttendance);
router.delete('/delete/:id', deleteAttendance);

export default router;
