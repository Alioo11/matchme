import express from "express";
import companyController from "./controller";

const CompanyRouter = express.Router();

CompanyRouter.get("/get-linkedin", companyController.getLinkedinURLs);
CompanyRouter.get("/get-linkedin-users", companyController.getLinkedinCompanyUsers);
CompanyRouter.get("/get-linkedin-users", companyController.letsTestSomething);



export default CompanyRouter;
