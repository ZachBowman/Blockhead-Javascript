// Blockhead
// Nightmare Games
// Zach Bowman

////////////////////////////////////////////////////////////////////////////////

function handleClick()
  {
  canvas_html.onclick = null;
  }

////////////////////////////////////////////////////////////////////////////////

function mouse_move (e, finger, canvas_html)
  {
  if (!e) var e = event;
  if (!canvas_html) canvas_html = document.getElementById ("canvas");
  if (finger === true) e.preventDefault();

  if (canvas_html)
    {
    mouse_x = e.pageX - canvas_html.offsetLeft;
    mouse_y = e.pageY - canvas_html.offsetTop;
    }
  }

////////////////////////////////////////////////////////////////////////////////

function mouse_down (finger, mouse_x, mouse_y)
  {
  // var click_x = mouse_x;
  // var click_y = mouse_y;  
  
  // if (game_state == SPLASH)
  //   {
  //   if (sound_loaded_flag === true)
  //     {
  //     splash_screen_click();
  //     }
  //   }
  // if (game_state === MENU)
  //   {
  //   if (game_active === true && click_over_sprite (click_x, click_y, menu_resume))
  //     {
  //     fadeout ();
  //     if (game_active === true)
  //       {
  //       newgame = false;
  //       newsong = false;
  //       }
  //     next_game_state = GAME;
  //     sound_click = true;
  //     console.log ("RESUME");
  //     }
  //   if (click_over_sprite (click_x, click_y, menu_new))
  //     {
  //     click_new_game ();
  //     }
  //   else if (click_over_sprite (click_x, click_y, menu_instruct))
  //     {
  //     fadeout ();
  //     next_game_state = INSTRUCT1;
  //     sound_click = true;
  //     console.log ("INSTRUCTIONS");
  //     }
  //   }
  // else if (game_state === INSTRUCT1)
  //   {
  //   fadeout ();
  //   next_game_state = INSTRUCT2;
  //   sound_click = true;
  //   }
  // else if (game_state === INSTRUCT2)
  //   {
  //   fadeout ();
  //   if (played_game === false && clicked_new === true) next_game_state = GAME;
  //   else next_game_state = MENU;
  //   sound_click = true;
  //   }
  // else if (game_state === CREDITS)
  //   {
  //   fadeout ();
  //   next_game_state = MENU;
  //   sound_click = true;
  //   }
  // else if (game_state === TUMBLE || game_state === GAME)
  //   {
  //   if (display_options === false)
  //     {
  //     if (click_over_rect (click_x, click_y, game_region))
  //       {
  //       if (game_won === true || game_lost === true)
  //         {
  //         click_new_game();
  //         }
  //       else if (click_x >= puzzle_x && click_x <= puzzle_x + puzzle_pixel_width
  //         && click_y >= puzzle_y && click_y < puzzle_y + puzzle_pixel_height
  //         && game_active === true)
  //         {
  //         var column = Math.round(((click_x - puzzle_x) / tile_pixel_width) - .50);
 
  //         if (column >= 0 && column < 7)
  //           {
  //           grabber.destination = column;
  //           grabber.control_type = CLICK_CONTROL;
  //           if (grabber.gx === grabber.destination) drop_block ();
  //           particle_vertical_highlight (puzzle_x + (grabber.destination * tile_pixel_width), puzzle_y);
  //           }
  //         }
  //       }

  //     else if (click_over_sprite (click_x, click_y, box_newgame))
  //       {
  //       click_new_game();
  //       }
  //     else if (click_over_sprite (click_x, click_y, box_menu))
  //       {
  //       fadeout();
  //       next_game_state = MENU;
  //       move_menu();
  //       }
  //     else if (click_over_sprite (click_x, click_y, box_options))
  //       {
  //       display_options = true;
  //       }
  //     }
  //   else if (display_options === true)
  //     {
  //     for (let o = 0; o < options.length; o += 1)
  //       {
  //       if (click_over_object (click_x, click_y, options[o])) options[o].click_event();
  //       }
  //     }
  //   }

  pointer_down = true;
  mouse_move (finger);
  }
  
////////////////////////////////////////////////////////////////////////////////

// checks if the click is over a rectangle or any object with x, y, width, and height

function click_over_rect (click_x, click_y, rect)
  {
  if (click_x >= rect.x && click_x <= rect.x + rect.width
      && click_y >= rect.y && click_y <= rect.y + rect.height)
    {
    return true;
    }

  else return false;
  }

////////////////////////////////////////////////////////////////////////////////

// Used if the click is over an object that relies on its sprite for width and height

function click_over_sprite (click_x, click_y, object)
  {
  if (object.draw_from_center === true
      && click_x >= object.x - (object.sprite.width / 2) && click_x <= object.x + (object.sprite.width / 2)
      && click_y >= object.y - (object.sprite.height / 2) && click_y <= object.y + (object.sprite.height / 2))
    {
    return true;
    }

  else if (click_x >= object.x && click_x <= object.x + object.sprite.width
      && click_y >= object.y && click_y <= object.y + object.sprite.height)
    {
    return true;
    }

  else return false;
  }

////////////////////////////////////////////////////////////////////////////////

// Used if the click is over an object that maintains its own width and height

function click_over_object (click_x, click_y, option)
  {
  if (option.draw_from_center === true
      && click_x >= option.x - (option.width / 2) && click_x <= option.x + (option.width / 2)
      && click_y >= option.y - (option.height / 2) && click_y <= option.y + (option.height / 2))
    {
    return true;
    }

  else if (click_x >= option.x && click_x <= option.x + option.width
      && click_y >= option.y && click_y <= option.y + option.height)
    {
    return true;
    }

  else return false;
  }

//////////////////////////////////////////////////////////////////////////////// 

function mouse_up (finger)
  {
  var click_x = mouse_x;
  var click_y = mouse_y;  
  
  if (game_state == SPLASH)
    {
    if (sound_loaded_flag === true)
      {
      splash_screen_click();
      }
    }
  if (game_state === MENU)
    {
    if (game_active === true && click_over_sprite (click_x, click_y, menu_resume))
      {
      fadeout ();
      if (game_active === true)
        {
        newgame = false;
        newsong = false;
        }
      next_game_state = GAME;
      sound_click = true;
      console.log ("RESUME");
      }
    if (click_over_sprite (click_x, click_y, menu_new))
      {
      click_new_game ();
      }
    else if (click_over_sprite (click_x, click_y, menu_instruct))
      {
      fadeout ();
      next_game_state = INSTRUCT1;
      sound_click = true;
      console.log ("INSTRUCTIONS");
      }
    }
  else if (game_state === INSTRUCT1)
    {
    fadeout ();
    next_game_state = INSTRUCT2;
    sound_click = true;
    }
  else if (game_state === INSTRUCT2)
    {
    fadeout ();
    if (played_game === false && clicked_new === true) next_game_state = GAME;
    else next_game_state = MENU;
    sound_click = true;
    }
  else if (game_state === CREDITS)
    {
    fadeout ();
    next_game_state = MENU;
    sound_click = true;
    }
  else if (game_state === TUMBLE || game_state === GAME)
    {
    if (display_options === false)
      {
      if (click_over_rect (click_x, click_y, game_region))
        {
        if (game_won === true || game_lost === true)
          {
          click_new_game();
          }
        else if (click_x >= puzzle_x && click_x <= puzzle_x + puzzle_pixel_width
          && click_y >= puzzle_y && click_y < puzzle_y + puzzle_pixel_height
          && game_active === true)
          {
          var column = Math.round(((click_x - puzzle_x) / tile_pixel_width) - .50);
  
          if (column >= 0 && column < 7)
            {
            grabber.destination = column;
            grabber.control_type = CLICK_CONTROL;
            if (grabber.gx === grabber.destination) drop_block ();
            particle_vertical_highlight (puzzle_x + (grabber.destination * tile_pixel_width), puzzle_y);
            }
          }
        }

      else if (click_over_sprite (click_x, click_y, box_newgame))
        {
        click_new_game();
        }
      else if (click_over_sprite (click_x, click_y, box_menu))
        {
        fadeout();
        next_game_state = MENU;
        move_menu();
        }
      else if (click_over_sprite (click_x, click_y, box_options))
        {
        display_options = true;
        }
      }
    else if (display_options === true)
      {
      for (let o = 0; o < options.length; o += 1)
        {
        if (click_over_object (click_x, click_y, options[o])) options[o].click_event();
        }
      }
    }
  
  pointer_down = false;
  if (finger === false) mouse_move (false);
  }

////////////////////////////////////////////////////////////////////////////////

function keyboard_down (event)
  {
  // escape
  if ((event.code === "Escape" || event.key === "Escape") && key_esc === false)
    {
    key_esc = true;
    if (game_state === MENU) {}
    else if (game_state === GAME)
      {
      toggle_options();
      }
    }

  if ((event.keyIdentifier === "Left" || event.key === "ArrowLeft" || event.code === "ArrowLeft") && key_left === false)
    {
    key_left = true;
    if (game_state === GAME && game_active === true)
      {
      grabber.control_type = KEYBOARD_CONTROL;
      if (grabber.gx > 0) grabber.destination = grabber.gx - 1;
      }
    }

  if ((event.keyIdentifier === "Right" || event.key === "ArrowRight" || event.code === "ArrowRight") && key_right === false)
    {
    key_right = true;
    if (game_state === GAME && game_active === true)
      {
      grabber.control_type = KEYBOARD_CONTROL;
      if (grabber.gx < 5) grabber.destination = grabber.gx + 1;
      }
    }

  if ((event.keyIdentifier === "Down" || event.key === "ArrowDown" || event.code === "ArrowDown") && key_down === false)
    {
    key_down = true;
    if (game_state === GAME && game_active === true)
      {
      grabber.control_type = KEYBOARD_CONTROL;
      drop_block ();
      }
    }

  // spacebar (same as down arrow)
  if (event.code === "Space" && key_space === false)
     {
     key_space = true;
     if (game_state === GAME && game_active === true)
      {
      grabber.control_type = KEYBOARD_CONTROL;
      drop_block ();
      }
    }
  }

////////////////////////////////////////////////////////////////////////////////

function keyboard_up (event)
  {
  if ((event.key === "Escape" || event.code === "Escape") && key_esc === true) key_esc = false;

  if ((event.keyIdentifier === "Left" || event.key === "ArrowLeft" || event.code === "ArrowLeft") && key_left === true)
    {
    key_left = false;
    if (grabber.wantmove === LEFT) grabber.wantmove = NONE;
    }

  if ((event.keyIdentifier === "Right" || event.key === "ArrowRight" || event.code === "ArrowRight") && key_right === true)
    {
    key_right = false;
    if (grabber.wantmove === RIGHT) grabber.wantmove = NONE;
    }

  if ((event.keyIdentifier === "Down" || event.key === "ArrowDown" || event.code === "ArrowDown") && key_down === true) key_down = false;
  if ((event.code === "Space") && key_space === true) key_space = false;
  }

////////////////////////////////////////////////////////////////////////////////

function click_new_game ()
  {
  fadeout ();
  next_game_state = GAME;
  newgame = true;
  sound_click = true;
  clicked_new = true;
  play_sound ("gong");
  }

////////////////////////////////////////////////////////////////////////////////
