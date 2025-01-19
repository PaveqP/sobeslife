import { Router } from 'express';
import { registration } from '../controllers/auth-controller';

const router = Router();

router.post('/reg', registration);

export default router;
