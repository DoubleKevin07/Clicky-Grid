/*
TODO:
    - Prevent null errors in console.
    - Make more realistic waving.
    - Prevent from being able to scroll out?
    - Add a window on top explaining what the webpage is.
    - Clean code

*/

const box_size = 100;
const num_rows = Math.ceil(window.innerHeight / box_size);
const num_cols = Math.ceil(window.innerWidth / box_size);
var total_num_tiles;
// Create the grid.
function fill_grid() {

    var width = 5;


    var Grid = document.getElementById("Grid");
    /* What we're going to do here is, we're going to create a bunch of canvas elements, manually. During this, we will make sure we fill the entirety of the webpage. */

    var curr_tile_id = 1;
    for (var i = 0; i < num_rows; i++) {
        for (var j = 0; j < num_cols; j++) {

            // Add canvas element
            Grid.innerHTML = Grid.innerHTML + `
            <svg width = "${box_size + width}" height = "${box_size + width}">
                <rect width="${box_size}" height="${box_size}" class = "tile" id = "tile${curr_tile_id.toString()}"/>
            </svg>`;


            /*
                // Add canvas element
                Grid.innerHTML = Grid.innerHTML + `<canvas class = "tile" id = "tile${curr_tile_id.toString()}"></canvas>`;

                // Get the tile.
                var tile = document.getElementById("tile" + curr_tile_id.toString());
                // console.log(to_string
                // Get its internal context.
                var context = tile.getContext("2d");

                context.fillRect(15, 15, 200, 200);
            */
            curr_tile_id++;
        }
        Grid.innerHTML = Grid.innerHTML + `<br>`;

    }
    total_num_tiles = curr_tile_id;



}
fill_grid()

// Add trigger to each tile.
var tiles = document.getElementsByClassName("tile"); // Get set of tiles.
for (var i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener('click', function() { bump_tile(this); });
}

// From this: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function select_top_tile(source_tile) {
    var tile = source_tile.id;
    var tile_num = parseInt(tile.replace("tile", ""));
    var target_tile_num = tile_num - num_cols;

    // Catching null tiles.
    if (target_tile_num > total_num_tiles || target_tile_num < 1) {
        var target_tile;
        target_tile.isBumped = true;
        return target_tile;
    }

    var target_tile = "tile" + target_tile_num.toString();
    return document.getElementById(target_tile);
}

function select_bottom_tile(source_tile) {
    var tile = source_tile.id;
    var tile_num = parseInt(tile.replace("tile", ""));
    var target_tile_num = tile_num + num_cols;

    // Catching null tiles.
    if (target_tile_num > total_num_tiles || target_tile_num < 1) {
        var target_tile;
        target_tile.isBumped = true;
        return target_tile;
    }

    var target_tile = "tile" + target_tile_num.toString();
    return document.getElementById(target_tile);
}

function select_right_tile(source_tile) {
    var tile = source_tile.id;
    var tile_num = parseInt(tile.replace("tile", ""));
    var target_tile_num = tile_num + 1;

    // Catching null tiles.
    if (target_tile_num > total_num_tiles || target_tile_num < 1) {
        var target_tile;
        target_tile.isBumped = true;
        return target_tile;
    }

    var target_tile = "tile" + target_tile_num.toString();
    return document.getElementById(target_tile);
}

function select_left_tile(source_tile) {
    var tile = source_tile.id;
    var tile_num = parseInt(tile.replace("tile", ""));
    var target_tile_num = tile_num - 1;

    // Catching null tiles.
    if (target_tile_num > total_num_tiles || target_tile_num < 1) {
        var target_tile;
        target_tile.isBumped = true;
        return target_tile;
    }

    var target_tile = "tile" + target_tile_num.toString();
    return document.getElementById(target_tile);
}

async function bump_tile(elem, amount = 0.1) {
    var decrement = 0.1; // How much less opacity we want on the other tiles.
    if (amount > 1)
        return;

    console.log(elem.id);


    elem.setAttribute("opacity", amount);
    elem.isBumped = true;

    // Bump delay time before bumping others.
    await sleep(100);
    var top_tile = select_top_tile(elem);
    if (!top_tile.isBumped)
        bump_tile(top_tile, amount += decrement);
    var right_tile = select_right_tile(elem);
    if (!right_tile.isBumped)
        bump_tile(right_tile, amount += decrement);
    var bottom_tile = select_bottom_tile(elem);
    if (!bottom_tile.isBumped)
        bump_tile(bottom_tile, amount += decrement);
    var left_tile = select_left_tile(elem);
    if (!left_tile.isBumped)
        bump_tile(left_tile, amount += decrement);

    await sleep(300);
    elem.setAttribute("opacity", "1");
    elem.isBumped = false;

}

function RotateTowards() {
    var mouse = Input.mousePosition;
    var screenPoint = Camera.main.WorldToScreenPoint(tankTransform.localPosition);
    var offset = new Vector2(mouse.x - screenPoint.x, mouse.y - screenPoint.y);
    var angle = Mathf.Atan2(offset.y, offset.x) * Mathf.Rad2Deg;
    transform.rotation = Quaternion.Euler(0, angle, 0);
}

// Src: https://stackoverflow.com/questions/11409895/whats-the-most-elegant-way-to-cap-a-number-to-a-segment
function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}

// Parallax effect.

document.addEventListener('mousemove', function(event) {
    const x = event.pageX;
    const y = event.pageY;

    var midX = (x - window.innerWidth / 2) * -0.02;
    var degY = clamp(midX, -35, 35);

    var midY = (y - window.innerHeight / 2) * -0.02;
    var degX = clamp(midY, -35, 35);

    var Grid = document.getElementById("Grid");

    Grid.style.transform = "rotateX(" + degX + "deg) rotateY(" + degY + "deg) rotateZ(" + 0 + "deg)";


});