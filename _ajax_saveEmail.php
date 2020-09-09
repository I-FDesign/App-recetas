<?php

    require('./config.php');

     if($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['email'])) {
        $statement = $db->prepare("SELECT * FROM emails WHERE email = :email");
        $statement->execute(array(
            'email' => $_POST['email']
        ));
        $result = $statement->fetch();

        if(empty($result)) {
            $statement = $db->prepare("INSERT INTO emails(email, fecha) VALUES (:email, :fecha)");
            $statement->execute(array(
                'email' => $_POST['email'],
                'fecha' => date('d-m-y H:i:s')
            ));
        }
    }

?>