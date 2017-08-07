<?php
if($_POST) {
  $action_limit = 2 * 1000; // Should match the action_limit set in the script
  $return = array('new_total' => 0);
  
  // Do something here to get the user's current points
  $previous_total = 0;
  // DEMO STUFF
  $previous_total = $_COOKIE['points'];
  
  // Check if debugging is enabled
  if(isset($_POST['debug']) && $_POST['debug'] == 'true') {
    $_POST['previous_total'] = $previous_total;
    $return['debug'] = $_POST;
  }
  
  // Double check on the backend to make sure the user isn't doing anything funny!
  // It's a good idea to set a PHP variable to match the action_limit you set in the script
  // rather than use the posted value for better security.
  if(($_POST['last_action'] + $action_limit) >=  microtime(true)) {
    // Add up the points
    if(isset($_POST['points_earned']) && is_numeric($_POST['points_earned'])) {
      $points = $_POST['points_earned'] + $previous_total;
    }
    // Now you can save the new total to the DB
    // DEMO STUFF
    setcookie("points", $points, time()+86400); // saves cookie for a day
  }
  
  // Return the user's update point total
  $return['new_total'] = $points;
  echo json_encode($return);
}
?>