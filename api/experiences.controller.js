import ExperienceDAO from "../dao/experienceDAO.js";

export default class ExperiencesController {
    static async apiGetExperiences(req, res, next) {
        const experiencesPerPage = req.query.experiencesPerPage ? parseInt(req.query.experiencesPerPage, 10) : 50
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}

        if (req.query.Classification) {
            filters.Classification = req.query.Classification
          } else if (req.query.Zip) {
            filters.Zip = req.query.Zip
          } else if (req.query.name) {
            filters.name = req.query.name
          }
        
          const { experiencesList, totalNumExperiences } = await ExperienceDAO.getExperiences({
            filters,
            page, 
            experiencesPerPage,
          })

          let response = {
            experiences: experiencesList,
            page: page,
            filters: filters,
            entries_per_page: experiencesPerPage,
            total_results: totalNumExperiences,
          }
        res.json(response)
    }
}