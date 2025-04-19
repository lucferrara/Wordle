export default function Wordle(app, db_conn) {

    // 1. Chooses a random word from the words table
    // 2. Creates a game in the games table.
    // 3. Returns the id of the game in the games table
    const startGame = async (req, res) => {
        try {
            const query = 'SELECT word FROM words ORDER BY RAND() LIMIT 1';
            const [wordResults] = await db_conn.query(query);
            const answer = wordResults[0].word;

            const create_game_query = 'INSERT INTO games (answer) VALUES (?);'
            const [insertResults] = await db_conn.query(create_game_query, [answer]);
            const gameId = insertResults.insertId; 

            res.json({gameId});
        } catch (err) {
            console.log(err)
        }
    }
    
    app.get("/startgame", startGame); 
}