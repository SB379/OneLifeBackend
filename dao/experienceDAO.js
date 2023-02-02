let experiences

export default class ExperienceDAO {
    static async injectDB(conn) {
        if(experiences)
        {
            return
        }

        try {
            experiences = await conn.db(process.env.EXPERIENCE_NS).collection("experiences")
        } catch (e) {
            console.error(`Unable to establish a connection handle in experienceDAO: ${e}`)
        }
    }

    static async getExperiences({
        filters = null,
        page = 0,
        experiencesPerPage = 50,
    } = {}) {
        let query

        if(filters){
            if("name" in filters){
                query = {$text: {$search: filters["name"]}}
            } else if("Classification" in filters) {
                query = {"Classification": {$eq: filters["Classification"]}}
            } else if ("Area" in filters){
                query = {"Area": {$eq: filters["Area"]}}
            }
        }

        let cursor

        try {
            cursor = await experiences.find(query)
        } catch(e) {
            console.error(`Unable to issue find command ${e}`)
            return {experiencesList: [], totalNumExperiences: 0}
        }

        const displayCursor = cursor.limit(experiencesPerPage).skip(experiencesPerPage * page)

        try {
            const experiencesList = await displayCursor.toArray();
            const totalNumExperiences = await experiences.countDocuments(query)

            return {experiencesList, totalNumExperiences}
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents. ${e}`)
            return {experiencesList: [], totalNumExperiences: 0}
        }
    }
}