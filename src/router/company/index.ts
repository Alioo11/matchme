import express from "express";
import companyController from "./controller";

const companyRouter = express.Router();

companyRouter.get("/get-linkedin", companyController.getLinkedinURLs);
companyRouter.get("/get-linkedin-users", companyController.getLinkedinCompanyUsers);


export default companyRouter;
