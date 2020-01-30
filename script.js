var tiles = document.getElementsByClassName("tile"); // Get set of tiles.

for (var i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener('click', function() { bump_tile(this); });
}

// From this: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bump_tile(elem) {
    // elem.setAttribute('y', -50);
    elem.setAttribute("zoom", 1.5);
    await sleep(300);
    elem.setAttribute("zoom", 0);
    
    /*
    function frame() {

        if (pos == 0) {
            clearInterval(id);
        } else {
            pos--;
            opacity += 0.02;


            elem.style.left = pos + 'px';
            elem.style.opacity = opacity;

        }
    }*/
}

function RotateTowards()
{
    var mouse = Input.mousePosition;
    var screenPoint = Camera.main.WorldToScreenPoint(tankTransform.localPosition);
    var offset = new Vector2(mouse.x - screenPoint.x, mouse.y - screenPoint.y);
    var angle = Mathf.Atan2(offset.y, offset.x) * Mathf.Rad2Deg;
    transform.rotation = Quaternion.Euler(0, angle, 0);
}




document.addEventListener('mousemove', function(event) 
{
    const x = event.pageX;
    const y = event.pageY;

    const midX = x - window.innerWidth / 50000;
    const midY = y - window.innerHeight / 2;

    var Grid = document.getElementById("Grid");

    Grid.style.transform =  "rotateX(" + midX + "deg) rotateY(" + midY + "deg)";

    console.log("rotateZ(" + midX + "deg) rotateY(" + midY + "deg)")


});
