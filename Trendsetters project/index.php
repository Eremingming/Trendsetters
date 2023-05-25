<!DOCTYPE html>
<html lang="en">
<head>
<script>
        function preventBack() {
            window.history.forward();
        }

        setTimeout("preventBack()", 0);

        window.onunload = function() {TREN
            null
        };
    </script>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>TRENDSETTERS</title>
    <!-- Favicon-->
    <link rel="icon" type="image/x-icon" href="assets/hanger.png"/>
    <!-- Bootstrap icons-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
    <!-- Core theme CSS (includes Bootstrap)-->
    <link href="style/homepagestyle.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body>
<div id="ajax-content"></div>
<div id="navbar-container"></div>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container px-4 px-lg-5">
        <a class="navbar-brand" href="index.php">TRENDSETTERS</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                <li class="nav-item"><a class="nav-link active" aria-current="page" href="index.php">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
                <li class="nav-item"><a class="nav-link active" aria-current="page" href="faq.html">F.A.Q</a></li>
                <li class="nav-item"><a class="nav-link" href="mainpage.php">Logout</a></li>
            </ul>
            <form class="d-flex">
    <a href="cart.html" class="btn btn-outline-dark">
        <i class="bi-cart-fill me-1"></i>
        Cart
        <span class="badge bg-dark text-white ms-1 rounded-pill cart-badge">0</span>
    </a>
</form>

<a href="payment.html" class="btn btn-outline-dark">
    <i class="bi-cart-fill me-1"></i>
    Checkout
</a>

        </div>
    </div>
</nav>

<!-- Header-->
<header class="bg-success py-5">
    <div class="container px-4 px-lg-5 my-5">
        <div class="text-center text-white">
            <h1 class="display-4 fw-bolder">TRENDSETTERS</h1>
            <p class="lead fw-normal text-white-50 mb-0">"Step into the World of Fashion Excellence"</p>
        </div>
    </div>
</header>

<!-- Section-->
<section class="py-5">
    <div class="container px-4 px-lg-5 mt-5">
        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center" id="product-list">
            <!-- Products will be dynamically added here using AJAX -->
        </div>
    </div>
</section>

<!-- Footer-->
<footer class="py-5 bg-success">
    <div class="container">
        <p class="m-0 text-center text-white">
            &copy; 2023 Trendsetters. All rights reserved.
        </p>
    </div>
</footer>

<!-- JavaScript Libraries -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.2/js/bootstrap.bundle.min.js"></script>

<!-- Bootstrap core JS-->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
<!-- Core theme JS-->
<script src="js/scripts.js"></script>
<script src="php/session.php"></script>
<script>
    // Add event listener for the "Add to Cart" buttons
        $(document).on('click', '.btn-add-to-cart', function(e) {
            e.preventDefault();
            var productId = $(this).data('product');

            // Update the cart badge count
            var currentCount = parseInt($('.badge').text());
            $('.badge').text(currentCount + 1);
        });
</script>
</body>
</html>