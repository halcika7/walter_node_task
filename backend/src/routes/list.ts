import { Router } from 'express';
import { addingListValidator, updateListValidator } from '@validation/list';
import {
  addList,
  getLists,
  getTotalNumberOfLists,
  getList,
  deleteList,
  getListReport,
  updateList,
} from '@controller/List';
import { authMiddleware } from '@middleware/auth';

const router = Router();

router.post('/', authMiddleware, addingListValidator, addList);
router.put('/:id', authMiddleware, updateListValidator, updateList);
router.delete('/:id', authMiddleware, deleteList);
router.get('/report', authMiddleware, getListReport);
router.get('/number-of-lists', authMiddleware, getTotalNumberOfLists);
router.get('/:id', authMiddleware, getList);
router.get('/lists/:skip', authMiddleware, getLists);

export default router;
