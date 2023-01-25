let experiences

export default class ExperiencesDAO{
    static async injectDB(conn)
    {
        if(experiences)
        {
            return
        }

        try {
            experiences = await conn.db(process.env.EXPERIENCES_NS).collection("experiences")
        } catch (e)
        {
            console.error(`Unable to establish a connection handle in experienceDAO: ${e}`)
        }
    }

    static async getExperiences()
    {
        let cursor 

        try {
            cursor = await experiences
        } catch(e) {
            console.error(`Unable to find command ${e}`)
            return {experienceList: []}
        }

        
    }
}