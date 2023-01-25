import express from 'express'
import ExperienceCtrl from "./experiences.controller.js"

const router = express.Router();

router.route("/").get(ExperienceCtrl.apiGetExperiences)

export default router