<!-- home.php -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes' />
       <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    
    <link rel="stylesheet" href="css/main.css">

    <link href='https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.css' rel='stylesheet' />
    
    <!-- Add markers on map -->
    <link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/MarkerCluster.css' rel='stylesheet' />
    <link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/MarkerCluster.Default.css' rel='stylesheet'/> 

<title>Responder tool - Home</title>

</head>
<body>

  <header id="header">
    <div class="container-fluid">
      
      <div id="mySidenav" class="sidenav">
        <ul>

          <li><a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times; Close menu</a></li> <hr>
          <li><a href="map.php">Projects map</a></li><hr>
          <li><a href="respond.php">Projects list</a></li><hr>
          <li><a href="about.php">About</a></li><hr>
          <li><a href="contact.php">Contact</a></li><hr>
          <li><a href="messages.php">Messages</a></li><hr>
        </ul>
      </div>

      <!-- Use any element to open the sidenav -->
      <div class="nav">
        <span style="font-size:25px;cursor:pointer; color:white;" onclick="openNav()">☰ </span>
      </div>
      <!-- Add all page content inside this div if you want the side nav to push page content to the right (not used if you only want the sidenav to sit on top of the page -->
      <h2>IATI Responder</h2>


      <a class="logo" href="index.php">
        <img src="/images/IATI_studio_logo_icon.svg">  
      </a>

           
       <script>
      function openNav() {
          document.getElementById("mySidenav").style.width = "20rem";
      }

      /* Set the width of the side navigation to 0 */
      function closeNav() {
          document.getElementById("mySidenav").style.width = "0";
      }
      </script>
    </div> 
  </header>

