module.exports = {

    addChore: async (req, res) => {
        const db = req.app.get('db')
        const { task, min_age, max_age, difficulty, frequency } = req.body
        const { user_id } = req.session.user

        const [chore] = await db.chores.addChore([task, min_age, max_age, difficulty, user_id, frequency])


    }




}