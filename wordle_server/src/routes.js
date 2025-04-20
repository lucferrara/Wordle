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

    // 1. Sends a guess for a given game with gameId 
    // 2. Stores the guess at the correct index in the games table. 
    // 3. Returns how close the guess was to the answer. 
    const sendGuess = async (req, res) => {
        try {
            const { guess, gameId } = req.params;  
            const game_query = 'SELECT * FROM games WHERE game_id = (?)';
            const [gameResults] = await db_conn.query(game_query, [gameId]);
            const answer = gameResults[0].answer.toLowerCase();
            const guess_lower = guess.toLowerCase();
            let guessCol = "";

            if (gameResults[0].guess1 === null) 
            {
                guessCol = "guess1";
            }
            else if (gameResults[0].guess2 === null)
            {
                guessCol = "guess2";
            }
            else if (gameResults[0].guess3 === null)
            {
                guessCol = "guess3";
            }
            else if (gameResults[0].guess4 === null)
            {
                guessCol = "guess4";
            }
            else if (gameResults[0].guess5 === null)
            {
                guessCol = "guess5";
            }
            else 
            {
                guessCol = "guess6";
            }

            const store_guess_query = `UPDATE games SET ${guessCol} = ? WHERE game_id = ?`;
            await db_conn.query(store_guess_query, [guess, gameId])
            
            let output = ["", "", "", "", ""]; 
            let answerLetterCountMap = new Map(); 
            for (let i =0 ; i<answer.length ; i++)
            {
                const answer_letter = answer[i];
                answerLetterCountMap.set(answer_letter, (answerLetterCountMap.get(answer_letter) || 0) + 1);
            }
            
            // First loop through and check for green. Update answer letter count map. 
            for (let i =0 ; i<guess_lower.length ; i++)
            {
                if (guess_lower[i] == answer[i]) {
                    output[i] = "Green";
                    answerLetterCountMap.set(guess_lower[i], answerLetterCountMap.get(guess_lower[i]) - 1);
                }
            }
            // Next, loop through and check for yellow/gray
            for (let i=0 ; i<guess_lower.length ; i++)
            {
                if (output[i] == "Green") {
                    continue;
                }

                if(answer.indexOf(guess_lower[i]) > -1 && answerLetterCountMap.get(guess_lower[i]) > 0)
                {
                    output[i] = "Yellow";
                    answerLetterCountMap.set(guess_lower[i], answerLetterCountMap.get(guess_lower[i]) - 1);
                } 
                else {
                    output[i] = "Gray";
                }
            }
            res.json(output);

        } catch (err) {
            console.log(err); 
        }
    }
    
    app.get("/startgame", startGame); 
    app.post("/sendguess/:gameId/:guess", sendGuess)
}