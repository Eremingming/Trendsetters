<?php

session_start();

// 2. Unset all the session variables
unset($_SESSION['username']);
unset($_SESSION['password']);

?>
<script type="text/javascript">
    window.location = "index.php";
</script>