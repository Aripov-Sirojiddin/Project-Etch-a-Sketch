function getDimensions() {
    let height = prompt("Set Height:");
    while (height > 100 || height < 5) {
        height = prompt("Set Height Max = 100, Min = 5: ");
    }
    let width = prompt("Set Width:");
    while (width > 100 || width < 5) {
        width = prompt("Set Width Max = 100, Min = 5: ");
    }

    return [height, width];
}


function generateGrid(dimensions) {
    const row = document.createElement("div");
    row.className = "row";
    const button = document.createElement("button");
    button.className = "pixel";
    for (let column = 0; column < dimensions[1]; column++) {
        row.appendChild(button.cloneNode(true));
    }

    for (let i = 0; i < dimensions[0]; i++) {
        document.body.appendChild(row.cloneNode(true));
        if (document.body.scrollHeight >= window.innerHeight) {
            document.body.lastElementChild.remove();
            break;
        }
    }
}

const canvasState = {
    brushState: "up",
    brushColor: "#FFFF00",
    colors: [
        "#FF0000", // Red
        "#FFA500", // Orange
        "#FFFF00", // Yellow
        "#008000", // Green
        "#0000FF", // Blue
        "#4B0082", // Indigo
        "#EE82EE"  // Violet (often represented by a lighter purple like Violet)
    ]
}

function trackBrushState() {
    document.body.addEventListener('mousedown', () => {
        canvasState.brushState = "down";
    });
    document.body.addEventListener('mouseup', () => {
        canvasState.brushState = "up"
    });
}

function setPixelColor() {
    const allButtons = document.querySelectorAll(".pixel");
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].addEventListener("click", function () {
            this.style = `background: ${canvasState.brushColor};`;
        });
        allButtons[i].addEventListener("mouseover", function () {
            if (canvasState.brushState === "down") {
                this.style = `background: ${canvasState.brushColor};`;
            }
        });
    }
}

function generateColorTable() {
    const row = document.createElement("div");
    row.className = "row";

    for(let i = 0; i < canvasState.colors.length; i++) {
        const button = document.createElement("button");
        button.style = `background: ${canvasState.colors[i]};`;
        button.className = "color-btn";
        button.addEventListener("click", () => {
            canvasState.brushColor = canvasState.colors[i];
        });

        row.appendChild(button); 
    }
    document.body.appendChild(row);
}

generateColorTable();
generateGrid(getDimensions());
trackBrushState();
setPixelColor();