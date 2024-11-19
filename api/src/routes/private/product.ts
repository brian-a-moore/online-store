import { Router } from 'express';
import { createProduct, deleteProduct, getProductPrivate, listProductsPrivate, updateProduct } from '../../controllers';

const router = Router({ mergeParams: true });

router.get('/list', listProductsPrivate);
router.get('/:productId', getProductPrivate);
router.post('/', createProduct);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);

export default router;
