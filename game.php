<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Bug Out</title>
    <link href="https://fonts.googleapis.com/css?family=Luckiest+Guy|Oswald:700" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="css/game_style.css">
</head>

<body>
    <?php  
       require('connect.php');
       if (!function_exists('mysqli_fetch_all')) {
            function mysqli_fetch_all(mysqli_result $result) {
                $data = [];
                while ($data[] = $result->fetch_assoc()) {}
                return $data;
            }
       }   
       $query = 'SELECT * FROM score ORDER BY score DESC LIMIT 10';
       $result = mysqli_query($conn, $query);
       $scores = mysqli_fetch_all($result, MYSQLI_ASSOC); 
       //$rows = mysqli_fetch_array($result, MYSQLI_ASSOC);
       //$scores = $result->fetch_all();
       mysqli_free_result($result);
       mysqli_close($conn); 
    ?>
    <div class="game-over">
        <div class="game-over-container">
            <p class="game-over-text">GAME OVER</p>
            <a href="https://joemoran.me/game.php">Try Again</a>
        </div>
    </div>
    <div class="high-score">
        <div class="high-score-container">
            <h3 class="congrats-text">Congratulations</h3>
            <h3 class="high-score-text">New High Score!</h3>
            <h4 class="new-high-score"></h4>
            <div class="form">
                <form method="post" action="get_score.php">
                    <input type="hidden" name="score" class="hidden">
                    <p class="initial-text">Enter your initials below</p>
                    <input id="name-input" type="text" name="name" maxlength="3" required>
                    <button id="submit" value="submit" name="submit">Enter</button>
                </form>
            </div>
        </div>
    </div>
    <div id="start-screen">
        <div class="title-container">
            <h1 id="title">Bug Out</h1>
            <p>Choose your character<br>&amp;<br>Start</p>
        </div>
        <div class="char-select">
            <img id="boy-char" class="char-select" src="game_images/char-boy.png">
            <img id="girl-char" class="char-select" src="game_images/char-cat-girl.png">
        </div>
        <div id="info-container">
            <div class="score-container">
                <h2>Top 10 High Scores</h2>
                <table>
                    <tr>
                        <th class="score-header">Rank</th>
                        <th class="score-header">Score</th>
                        <th class="score-header">Name</th>
                    </tr>
                    <?php foreach($scores as $key=>$score) : ?>
                    <tr>
                        <td>
                            <?php echo $key + 1; ?>
                        </td>
                        <td class="scoreboard-score">
                            <?php echo $score['score']; ?>
                        </td>
                        <td>
                            <?php echo $score['name']; ?>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </table>
            </div>
            <div class="how-to-container">
                <h2>How to Play</h2>
                <p>Use the arrow keys to move your character<br> 
                    Reach the water to score a point<br> 
                    Lose a life if a bug hits you<br>
                    Collect 3 gems and get a extra life<br> 
                    Good Luck!
                </p>
            </div>
        </div>
    </div>
    <div class="game-info">
        <div class="life-container">
            <p><img class="life-img"><span>x </span><span id="life-count">3</span></p>
        </div>
        <div class="gem-container">
            <p><img class="gem-img" src="game_images/gem-blue.png"><span> x </span><span id="gem-count">0</span></p>
        </div>
    </div>
    <div id="scoreContainer">
        <span id="scoreText">Score</span>
        <span id="score">0</span>
    </div>


    <audio autoplay loop>
        <source src="game_music/background-music.mp3">
    </audio>

    <audio class="diff-select">
         <source src="game_music/Emerge6.wav">
    </audio>
    <audio id="movement">
         <source src="game_music/Beep4.wav">
    </audio>
    <audio id="playerHit">
        <source src="game_music/Shut_Down7.wav">
    </audio>
    <audio id="gemPickUp">
        <source src="game_music/gem-pick-up.mp3">
    </audio>
    <audio id="scored">
        <source src="game_music/Beep17.wav">
    </audio>

    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
    <script src="game_js/app.js"></script>
    <script src="game_js/resources.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script src="game_js/engine.js"></script>

</body>

</html>
