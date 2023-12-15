// apparition d'un color picker sur le clic du symbole multicolor

var myParent = document.querySelector('#parent');
var page = document.querySelector('body');
var picker = new Picker({
  parent: myParent,
  color: '#e4c29a',
  onChange: function(color) {
                /*page.style.backgroundColor = color.rgbaString;*/
                page.style.color = color.rgbaString;
            },
});

// reset de la couleur de fond sur clic du titre

const resetColor = document.querySelector("h1");
resetColor.addEventListener("click", function (e) {
  page.style.color = "#e4c29a"; 
});