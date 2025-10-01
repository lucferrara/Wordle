# Wordle

Base URL: <a href="https://lucferrara.com/">lucferrara.com</a>
Wordle URL: <a href="https://lucferrara.com/wordle/">lucferrara.com/wordle/</a>

<h1>About</h1>
<ul>
	<li>The frontend of this Wordle application is built in <b>React with TypeScript</b>, and the backend is a <b>Node.js</b> server.</li>
	<li>The node server queries a <b>MySQL database</b> that I created and deployed to <b>AWS RDS</b>. There are two tables: one storing all 15,000 possible words, and another containing a history of games, along with their ids, answers, and guesses.</li>
	<li>The client communicates with the node server through two api endpoints. The first is /startgame, which adds a new entry to the games table. The second is /sendguess/:gameId/:guess, which updates the game in the games table, and returns the colors corresponding to that guess.</li>
	<li>The client begins on the landing page, and by clicking Play, calls the /startgame endpoint, which initializes a new game. </li>
	<li>After clicking play, the client lands on the Game page, with an instructions popup window. After they close the window, they are free to enter letters and send guesses. The player is prohibited from entering anything other than a letter, and can only make one guess at a time.</li>
	<li>As the player makes guesses (either by typing and clicking enter or by using the on-screen keyboard and enter button), the tiles will change color based on how successful the guess was. Also, the letters on the keyboard will change color.</li>
	<li>After the user makes 6 guesses or gets the word correct, the victory screen will appear. If the user did not get the word correct, the victory screen will show a defeat message, and reveal what the word was.</li>
	<li>The player is then given the options to quit (which goes back to the main menu), or to play again.</li>
	<li><b>Bootstrap</b> was used for styling the application</li>
	<li>I used <b>Vite</b> to initialize the react project, and <b>npm</b> to create the node server, and I created the MySQL database locally before migrating the dump file to AWS.</li>
	<li>The entire project was developed using <b>Linux</b>.</li>
</ul>

<h1>Additional Information:</h1>
<p>Wordle words list acquired from: https://github.com/tabatkins/wordle-list. I created the LoadWords.js script (found in the node server), to upload these words into my database table.</p>
