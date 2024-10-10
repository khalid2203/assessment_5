// controllers/UserController.ts
import { Request, Response } from 'express';
import Userdetails from '../models/Userdetails';

export const getAgencies = async (req: Request, res: Response):Promise<void> => {
    try {
        const agencies = await Userdetails.findAll({
            where: { role: 2 }, // Assuming 2 is for Agency
            attributes: ['id', 'firstName', 'lastName'], // Select only needed fields
        });
         res.json(agencies);
         return
    } catch (error:any) {
        console.error('Error fetching agencies:', error);
         res.status(500).json({ message: 'Server error', error: error.message });
         return
    }
};

export const addUser = async (req: Request, res: Response):Promise<void> => {
    try {
        const { firstName, lastName, email, password, gender, contact, role, agencyId } = req.body;
      console.log("req.body data.....",req.body)
        // Validate required fields
        if (!firstName || !lastName || !email || !password || !gender || !contact || role === undefined) {
             res.status(400).json({ message: 'All fields are required.' });
             return
        }

        // Create the user
        const user = await Userdetails.create({
            firstName,
            lastName,
            email,
            password, // Ensure you hash the password before saving it
            gender,
            contact,
            role, // 1 for Job seeker, 2 for Agency
            agencyId: role === 1 ? agencyId : null // Associate agencyId only if the role is Job seeker
        });

         res.status(201).json({ message: 'User created successfully', user });
         return
    } catch (error:any) {
        console.error('Error creating user:', error);
         res.status(500).json({ message: 'Server error', error: error.message });
         return
    }
};

export const getJobSeekersByAgency = async (req: Request, res: Response):Promise<void> => {
    const agencyId = parseInt(req.params.agencyId, 10); // Assume agencyId is passed as a URL parameter
    try {
        const jobSeekers = await Userdetails.findAll({
            where: {
                agencyId,
                role: 1 // 1 for Job seekers
            }
        });
         res.json(jobSeekers);
         return
    } catch (error:any) {
        console.error('Error fetching job seekers:', error);
         res.status(500).json({ message: 'Server error', error: error.message });
         return
    }
};


export const getAgencyForJobSeeker = async (req: Request, res: Response):Promise<void> => {
  const jobSeekerId = parseInt(req.params.jobSeekerId, 10); // Extract job seeker ID from the URL
  try {
      const jobSeeker = await Userdetails.findOne({
          where: { id: jobSeekerId, role: 1 }, // Ensure it's a job seeker
          include: [{
              model: Userdetails,
              as: 'Agency', // Using the alias defined in the model
              attributes: ['id', 'firstName', 'lastName'], // Fetch only necessary fields
          }]
      });

      if (!jobSeeker) {
           res.status(404).json({ message: 'Job seeker not found' });
           return
      }

       res.json(jobSeeker);
       return
  } catch (error:any) {
      console.error('Error fetching agency for job seeker:', error);
       res.status(500).json({ message: 'Server error', error: error.message });
       return
  }
};