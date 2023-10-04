import { createSlice } from '@reduxjs/toolkit'

export interface JobsState {
  _id: string;
  title: string;
  location: string;
  description?: string;
  salary?: number;
  position?: 'Full Time' | 'Part Time' | 'Contract' | 'Internship';
  requirements?: string[];
  responsibilities?: string[];
  skills?: string[];
  whatWereLookingFor?: string[];
  created?: string;
  deadline: string;
  remote?: boolean;
  benefits?: string[];
  applicants?: string[];
  selected?: string[];
  selectedForInterview?: string[];
  shortlisted?: string[];
  rejected?: string[];
  requiredDocuments?: string[];
  jobQuestions?: string[];
  views?: number;
  yoe?: number;
  [key: string]: any;
}

const initialJobsState: JobsState[] = []

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState: initialJobsState,
  reducers: {
    overwriteJobsData: (state, action) => {
      return action.payload;
    },
    updateJobById: (state, action) => {
      const updatedJob = action.payload;

      state = state.map((job) => {
        if (job._id === updatedJob._id) {
          return updatedJob;
        }
        return job;
      });

      return state;
    },
    addJob: (state, action) => {
      // Add the item to the array
      state.push(action.payload);
    },
    removeJob: (state, action) => {
      // Remove the item from the array
      return state.filter((item) => item !== action.payload);
    },
  },
});

export const { overwriteJobsData, addJob, updateJobById, removeJob } = jobsSlice.actions

export default jobsSlice.reducer