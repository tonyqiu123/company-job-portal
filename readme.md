# Job Portal Web App 

## Description 
The Job Portal Web App is a platform designed to allow a single company with a team of administrators to efficiently post and manage job listings on their own website. This web app also syncs job postings with their accounts on popular job platforms such as LinkedIn, Glassdoor, ZipRecruiter, and SimplyHired, saving valuable time and effort. Additionally, the job portal enables users to apply to jobs efficiently by utilizing their applicant profiles, which include their resume and basic background information like name, email, and URLs. 


## Overview
![User Search Jobs](readmeImages/userSearchJobs.jpg)
![Admin Job Management](readmeImages/adminJobManagement.jpg)
![User View Job](readmeImages/userViewJob.jpg)
![Admin View Applicant](readmeImages/adminViewApplicant.jpg)

## Employer/Admin Usage
1. Open your web browser and navigate to `https://company-job-portal.netlify.app/admin/login`
2. Enter the value you set for `ADMIN_PASSWORD` in the `.env` file.

## Job Seeker Usage
1. Open your web browser and go to `https://company-job-portal.netlify.app/sign-up`
2. Enter your first name, last name, email, and password.

## Installation

PREREQUISITES: Ensure Docker and Docker Compose are installed on your machine. Docker Compose is included in Docker Desktop installation for Windows and Mac. For Linux, you may need to install it separately. Docker Desktop can be downloaded from the official Docker website. 

### 1. Clone the repository

If your application is stored in a Git repository, clone it to your local machine with the following command:

```bash
git clone https://github.com/tonyqiu123/company-job-portal
``` 

### 2. Navigate to the project directory
After cloning the repository, navigate to the project's root directory.

### 3. Build and run the application
To build your Docker images and start your application, execute this command:
```bash
docker-compose up --build
```

Backend: `http://localhost:5000`
Frontend: `http://localhost:3000`
MongoDB: `mongodb://localhost:27017/test`
Please ensure these ports are free. If they are not, you'll need to free up these ports or modify the port mapping in your docker-compose.yml.

## Future Updates
- **Monthly Statistics Storage:** Implement functionality to store monthly statistics in the database for better data analysis and insights.
- **Recent Job Applications View:** Enhance the admin dashboard with the ability to view the most recent job applications, allowing for quicker and more efficient response times.
- **Integration with Additional Job Platforms:** Expand the list of integrated job platforms to provide a wider range of options for managing job listings.

## Contact Information:
For any inquiries or support regarding the Job Portal Web App, please reach out to me at [tonyqiu12345@gmail.com](mailto:tonyqiu12345@gmail.com).
