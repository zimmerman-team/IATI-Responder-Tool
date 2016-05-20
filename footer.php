    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js"></script>
    <script src='https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.js'></script>
    <script src='https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/leaflet.markercluster.js'></script>
    
<?php     
    if($page == 'list'){ ?> 
    <script src="js/respond.js"></script>
    <script>getLocation();</script>

<?  } else if($page == 'map'){ ?>
    <script src="js/map.js"></script>
    <script>start_location();</script>

<?  } else if($page == 'detail'){ ?>
    <script src="js/detail.js"></script>
    <script>info();</script>

<?  } else if($page == 'about'){ ?>
    <script>("h2").text("About")</script>

<?  } else if($page == 'form'){ ?>
    <script src="js/form.js"></script>
<? } ?>


</body>
</html>





        