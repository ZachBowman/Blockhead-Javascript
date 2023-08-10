(function() {
  function LoaderProxy() {
    return {};
  }

  function Sprite(image) {

    return {
    
      width: image.width,
      height: image.height,

      draw: function (canvas, x, y, opacity = 1.0)
        {
        if (canvas != undefined)
          {
          if (opacity === null) opacity = 1.0;
          if (opacity < 1.0) canvas.globalAlpha = opacity;
          canvas.drawImage (image, 0, 0, image.width, image.height, x, y, image.width, image.height);
          if (canvas.globalAlpha < 1.0) canvas.globalAlpha = 1.0;
          }
        },

      draw_from_center: function (canvas, x, y, opacity = 1.0)
        {
        if (canvas != undefined)
          {
          if (opacity === null) opacity = 1.0;
          if (opacity < 1.0) canvas.globalAlpha = opacity;
          canvas.drawImage (image, 0, 0, image.width, image.height, x - (image.width / 2), y - (image.height / 2), image.width, image.height);
          if (canvas.globalAlpha < 1.0) canvas.globalAlpha = 1.0;
          }
        },

      draw_part: function (canvas, source_rect, x, y, opacity)
        {
        if (canvas != undefined)
          {
          if (opacity < 1.0) canvas.globalAlpha = opacity;
          canvas.drawImage (image, source_rect.x, source_rect.y, source_rect.width, source_rect.height, x, y, source_rect.width, source_rect.height);
          if (canvas.globalAlpha < 1.0) canvas.globalAlpha = 1.0;
          }
        },

      draw_scaled: function (canvas, dest_rect, opacity)
        {
        if (canvas != undefined)
          {
          if (opacity < 1.0) canvas.globalAlpha = opacity;
          canvas.drawImage (image, 0, 0, image.width, image.height, dest_rect.x, dest_rect.y, dest_rect.width, dest_rect.height);
          if (canvas.globalAlpha < 1.0) canvas.globalAlpha = 1.0;
          }
        },
        
      draw_part_scaled: function (canvas, source_rect, dest_rect, opacity)
        {
        if (canvas != undefined)
          {
          if (opacity < 1.0) canvas.globalAlpha = opacity;
          canvas.drawImage (image, source_rect.x, source_rect.y, source_rect.width, source_rect.height, dest_rect.x, dest_rect.y, dest_rect.width, dest_rect.height);
          if (canvas.globalAlpha < 1.0) canvas.globalAlpha = 1.0;
          }
        },

      draw_from_center_scaled: function (canvas, x, y, new_width, new_height, opacity = 1.0)
        {
        if (canvas != undefined)
          {
          if (opacity === null) opacity = 1.0;
          if (opacity < 1.0) canvas.globalAlpha = opacity;
          canvas.drawImage (image, 0, 0, image.width, image.height, x - (new_width / 2), y - (new_height / 2), new_width, new_height);
          if (canvas.globalAlpha < 1.0) canvas.globalAlpha = 1.0;
          }
        }

      // THE FOLLOWING FUNCTIONS DON'T WORK PROPERLY BECAUSE COMMANDS TO RESTORE OR UNTRANSLATE THE CANVAS BACK TO ITS ORIGINAL POSITION DON'T WORK.  REASON UNKNOWN.

      // draw_rotated: function (canvas, x, y, degrees)
      //   {
      //   if (canvas != undefined)
      //     {
      //     let radians = degrees * 3.14159 / 180;

      //     // We can only rotate the entire canvas, and only around (0, 0).
      //     canvas.translate(-x, -y);
      //     canvas.rotate(radians);
      //     canvas.drawImage (image, 0, 0, image.width, image.height, x, y, image.width, image.height);
      //     canvas.rotate(-radians);
      //     canvas.translate(x, y);
      //     }
      //   },

      // draw_rotated_from_center: function (canvas, x, y, degrees)
      //   {
      //   if (canvas != undefined)
      //     {
      //     let radians = degrees * 3.14159 / 180;

      //     // We can only rotate the entire canvas, and only around (0, 0).
      //     canvas.save();
      //     canvas.translate(-x, -y);
      //     canvas.rotate(radians);
      //     canvas.drawImage (image, 0, 0, image.width, image.height, x - (image.width / 2), y - (image.height / 2), image.width, image.height);
      //     canvas.restore();
      //     }
      //   }
      };
    };
  
  ////////////////////////////////////////////////////////////////////////////////

  Sprite.load = function(url, loadedCallback) {
    var img = new Image();
    var proxy = LoaderProxy();
    
    img.onload = function() {
      var tile = Sprite(this);
      
      $.extend(proxy, tile);
      
      if(loadedCallback) {
        loadedCallback(proxy);
      }
    };
    
    img.src = url;
    
    return proxy;
  };
 
  ////////////////////////////////////////////////////////////////////////////////

  var spriteImagePath = "images/";

  window.Sprite = function(name, callback) {
    return Sprite.load(spriteImagePath + name + ".png", callback);
  };
  window.Sprite.EMPTY = LoaderProxy();
  window.Sprite.load = Sprite.load;
}());
