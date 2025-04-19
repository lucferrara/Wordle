export default function Wordle(app, db_conn) {

    const getRandomWord = async (req, res) => {
        const query = 'SELECT word FROM words ORDER BY RAND() LIMIT 1';
        db_conn.query(query, (err, results) => {
            res.json(results[0].word);
        });
    }
    
    app.get("/randomword", getRandomWord); 
}