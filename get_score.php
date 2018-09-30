<?php
    require("connect.php");

    if(isset($_POST['name']) && isset($_POST['score'])) {
        $name = strip_tags(mysqli_real_escape_string($conn, $_POST['name']));
        $score = strip_tags(mysqli_real_escape_string($conn, $_POST['score']));

        $checkExist = mysqli_query($conn, "SELECT `name`, `score` FROM `score` WHERE `name` = '$name'");
        $row = mysqli_fetch_assoc($checkExist);

        if (mysqli_num_rows($checkExist) > 0){
            if ($score > $row['score']){
                $sql = mysqli_query($conn, "UPDATE `score` SET `score` = '$score' WHERE `name` = '$name'");
            } 

        } else {
            $sql = mysqli_query($conn, "INSERT INTO `score` (`id`,`name`,`score`) VALUES ('','$name','$score');");
        }

    }
    header('Location: '.$root_url.'');
?>
