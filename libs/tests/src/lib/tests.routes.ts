import { Router } from 'express';
import { getTestByParams } from './tests.controller';
import { protectMiddleware } from '@sobes-life-server/shared-utils';

const router = Router();

router.get('/:specialization/:level', protectMiddleware, getTestByParams);

export { router };
