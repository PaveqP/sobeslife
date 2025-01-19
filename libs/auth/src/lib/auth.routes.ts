import { Router } from 'express';
import { authorization, registration } from './auth.controller';

const router = Router();

router.post('/reg', registration);
router.post('/login', authorization);

export { router };
