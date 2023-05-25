<?php
session_start();

include("php/config.php");

if (isset($_POST['submit'])) {
    $emailOrUsername = mysqli_real_escape_string($con, $_POST['email_or_username']);
    $password = mysqli_real_escape_string($con, $_POST['password']);

    $result = mysqli_query($con, "SELECT * FROM users WHERE (Email='$emailOrUsername' OR Username='$emailOrUsername') AND Password='$password'") or die("Select Error");
    $row = mysqli_fetch_assoc($result);

    if (is_array($row) && !empty($row)) {
        $_SESSION['valid'] = $row['Email'];
        $_SESSION['username'] = $row['Username'];
        $_SESSION['age'] = $row['Age'];
        $_SESSION['id'] = $row['Id'];

        header("Location: index.php");
        exit;
    } else {
        $errorMessage = "Wrong Email or Password";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="icon" type="image/x-icon" href="assets/hanger.png"/>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/style.css">
    <title>TRENDSETTERS</title>
</head>
<body>
    <div class="container">
        <div class="box form-box">
            <?php
            if (isset($errorMessage)) {
                echo "<div class='message'> 
                    <p>$errorMessage</p>
                </div><br>";
            }
            ?>

            <header>Login</header>
            <form action="" method="post">
                <div class="field input">
                    <label for="email_or_username">Email or Username</label>
                    <input type="text" name="email_or_username" id="email_or_username" autocomplete="off" required>
                </div>

                <div class="field input">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" autocomplete="off" required>
                </div>

                <div class="field">
                    <input type="submit" class="btn" name="submit" value="Login" required>
                </div>
                <div class="links">
                    Don't have an account? <a href="register.php">Sign Up Now</a>
                </div>
            </form>
        </div>
    </div>
    <script src="php/session.php"></script>
</body>
</html>