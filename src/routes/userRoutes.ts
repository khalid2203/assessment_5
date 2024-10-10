// routes/userRoutes.ts
import { Router } from 'express';
import { getAgencies, addUser, getJobSeekersByAgency, getAgencyForJobSeeker } from '../controller/userController';

const router = Router();

router.get('/agencies', getAgencies);
router.post('/signup', addUser);
router.get('/agency/:agencyId', getJobSeekersByAgency);
router.get('/jobseeker/:jobSeekerId', getAgencyForJobSeeker);

export default router;
