import express from "express";
import companyController from "./controller";

const CompanyRouter = express.Router();

CompanyRouter.get("/check-visa" , companyController.checkCompaniesVisaSponsorShip);
CompanyRouter.get("/get-linkedin", companyController.getLinkedinURLs);
CompanyRouter.get("/get-linkedin-users", companyController.getLinkedinCompanyUsers);
CompanyRouter.get("/visa-status", companyController.checkVisaStatus);
CompanyRouter.get("/", companyController.getAllCompanies);


export default CompanyRouter;