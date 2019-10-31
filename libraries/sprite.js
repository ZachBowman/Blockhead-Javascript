(function() {
  function LoaderProxy() {
    return {
      draw: $.noop,
      fill: $.noop,
      frame: $.noop,
      update: $.noop,
      Width: null,
      Height: null
    };
  }

  function Sprite(image, source_x, source_y, width, height) {
    source_x = source_x || 0;
    source_y = source_y || 0;
    width = width || image.width;
    height = height || image.height;

    return {
    
      draw: function (canvas, x, y, opacity = 1.0)
        {
        if (canvas != undefined)
          {
          if (opacity === null) opacity = 1.0;
          if (opacity < 1.0) canvas.globalAlpha = opacity;
          canvas.drawImage (image, 0, 0, width, height, x, y, width, height);
          if (canvas.globalAlpha < 1.0) canvas.globalAlpha = 1.0;
          }
        },

      draw_from_center: function (canvas, x, y, opacity = 1.0)
        {
        if (canvas != undefined)
          {
          if (opacity === null) opacity = 1.0;
          if (opacity < 1.0) canvas.globalAlpha = opacity;
          canvas.drawImage (image, 0, 0, width, height, x - (width / 2), y - (height / 2), width, height);
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
          canvas.drawImage (image, 0, 0, width, height, x - (new_width / 2), y - (new_height / 2), new_width, new_height);
          if (canvas.globalAlpha < 1.0) canvas.globalAlpha = 1.0;
          }
        },

      width: width,
      height: height
      };
    };
  
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
 
  var spriteImagePath = "images/";

  window.Sprite = function(name, callback) {
    return Sprite.load(spriteImagePath + name + ".png", callback);
  };
  window.Sprite.EMPTY = LoaderProxy();
  window.Sprite.load = Sprite.load;
}());
