/*!
 * Interaction Points jQuery Plugin v1.0
 * Author: Ben Marshall (benmarshall.me)
 * Description: Allows points to be accured while user's are on your site.
 * Example: $('.points').interactionPoints();
 */

;(function ( $, window, document, undefined ) {
  $.fn.interactionPoints = function(options) {
    var defaults = {
      url:          '',       // The URL the points get posted to, required
      container:    window,   // The element to track interactions on
      value:        1,        // The amount of points each second is worth
      post:         30,       // Number of seconds to post points to script
      data:         [],       // Additional data you want passed to the php script (ie. userID)
      debug:        0,        // Enables/diables debugging
      action_limit: 300       // Number of seconds until the user is timeout after their last key press
    };
    var options = $.extend(defaults, options),
      element = $(this), // The element on the page to update with the latest points
      last = new Date(),
      current,
      interval,
      points_earned;
    u();
    $(window).keypress(function() {
      u();
    });
    post();
    function u() {
      current = new Date();
      interval = (current.getTime() - last.getTime()) / 1000;
      points_earned = interval * options.value;
      last = new Date();
    }
    
    function post() {
      current = new Date();
      options.data.points_earned = points_earned;
      options.data.last_action = last.getTime();
      options.data.current_time  = current.getTime();
      options.data.action_limit  = options.action_limit;
      
      // Check if debugging is enabled
      if(options.debug === 1) {
        options.data.debug = true;
      }
        
      // Only update points if the last time a key was is less than the defined time
      if((options.data.last_action + (options.action_limit * 1000)) >=  options.data.current_time) {
        $.post(options.url, options.data, function(r) {
          var obj = $.parseJSON(r);
          if(options.debug === 1) {
            // Shows what was posted in the browser console
            console.log(obj.debug);
          }
          element.text(obj.new_total);
        });
      } else {
        if(options.debug === 1) {
          // Shows what was posted in the browser console
          console.log(options.data);
        }
      }
      setTimeout(post,(options.post * 1000));
    }
  };
})(jQuery, window, document);