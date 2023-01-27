import "./styles.css";
import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";

var deleteIcon =
  "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
var deleteimg = document.createElement("img");
deleteimg.src = deleteIcon;

var rotateIcon =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyIDZ2M2w0LTQtNC00djNjLTQuNDIgMC04IDMuNTgtOCA4IDAgMS41Ny40NiAzLjAzIDEuMjQgNC4yNkw2LjcgMTQuOGMtLjQ1LS44My0uNy0xLjc5LS43LTIuOCAwLTMuMzEgMi42OS02IDYtNnptNi43NiAxLjc0TDE3LjMgOS4yYy40NC44NC43IDEuNzkuNyAyLjggMCAzLjMxLTIuNjkgNi02IDZ2LTNsLTQgNCA0IDR2LTNjNC40MiAwIDgtMy41OCA4LTggMC0xLjU3LS40Ni0zLjAzLTEuMjQtNC4yNnoiLz48L3N2Zz4=";
var rotateimg = document.createElement("img");
rotateimg.src = rotateIcon;

var state = [];
var mods = 0;

export default function App() {
  const canvasRef = useRef(null);

  const [drawingMode, setDrawingMode] = useState(false);

  const [selectedColor, setSelectedColor] = useState("red");
  const [colorMode, setColorMode] = useState(false);

  const [fontMode, setFontMode] = useState(false);
  const [fontSize, setFontSize] = useState(20);

  useEffect(() => {
    if (!canvasRef.current) {
      canvasRef.current = new fabric.Canvas("canvas", {
        height: 720,
        width: 1280,
        backgroundColor: "gray"
      });
      canvasRef.current.on(
        "object:modified",
        () => {
          updateModifications(true);
        },
        "object:added",
        () => {
          updateModifications(true);
        }
      );
    }
  }, []);

  function updateModifications(savehistory) {
    if (savehistory === true) {
      let myjson = JSON.stringify(canvasRef.current);
      state.push(myjson);
    }
  }

  const undo = function undo() {
    if (mods < state.length) {
      canvasRef.current.remove(...canvasRef.current.getObjects());
      canvasRef.current.loadFromJSON(state[state.length - 1 - mods - 1]);
      canvasRef.current.renderAll();
      mods += 1;
    }
  };

  const redo = function redo() {
    if (mods > 0) {
      canvasRef.current.remove(...canvasRef.current.getObjects());
      canvasRef.current.loadFromJSON(state[state.length - 1 - mods + 1]);
      canvasRef.current.renderAll();
      mods -= 1;
    }
  };

  const clearAll = function clearcan() {
    canvasRef.current.remove(...canvasRef.current.getObjects());
  };

  const addBox = () => {
    if (canvasRef.current) {
      const box = new fabric.Rect({
        width: 100,
        height: 100,
        top: 0,
        left: 50,
        fill: "rgba(0,0,0,0.0)",
        stroke: "red",
        strokeWidth: 3,
        transparentCorners: false,
        borderColor: "rgb(255,255,255)",
        cornerColor: "rgb(255,255,255)",
        cornerStyle: "circle"
      });

      canvasRef.current.add(box);
      box.center();
      box.setCoords();

      canvasRef.current.renderAll();
      updateModifications(true);
    }
  };

  const addCircle = () => {
    if (canvasRef.current) {
      const circle = new fabric.Circle({
        top: 0,
        left: 50,
        radius: 25,
        fill: "rgba(255,0,0,0.0)",
        stroke: "red",
        strokeWidth: 3,
        transparentCorners: false,
        borderColor: "rgb(255,255,255)",
        cornerColor: "rgb(255,255,255)",
        cornerStyle: "circle"
      });

      canvasRef.current.add(circle);
      circle.center();
      circle.setCoords();

      canvasRef.current.renderAll();
      updateModifications(true);
    }
  };

  function addArrow() {
    var triangle = new fabric.Triangle({
      width: 10,
      height: 15,
      fill: "red",
      left: 235,
      top: 65,
      angle: 90
    });

    var line = new fabric.Line([50, 100, 200, 100], {
      left: 75,
      top: 70,
      stroke: "red"
    });

    var objs = [line, triangle];

    var arrow = new fabric.Group(objs);
    canvasRef.current.add(arrow);
    arrow.center();
    arrow.setCoords();

    canvasRef.current.renderAll();
    updateModifications(true);
  }

  function addTextBox() {
    var text = new fabric.Textbox("Text Area", {
      width: 450,
      fontSize: 20,
      transparentCorners: false,
      borderColor: "rgb(255,255,255)",
      cornerColor: "rgb(255,255,255)",
      cornerStyle: "circle"
    });

    canvasRef.current.add(text);
    text.center();
    text.setCoords();

    canvasRef.current.renderAll();
    updateModifications(true);
  }

  function renderDeleteIcon(ctx, left, top, styleOverride, fabricObject) {
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(deleteimg, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  function renderRotateIcon(ctx, left, top, styleOverride, fabricObject) {
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(rotateimg, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  fabric.Object.prototype.controls.mtr = new fabric.Control({
    x: 0,
    y: -0.5,
    offsetY: -40,
    cursorStyle: "crosshair",
    actionHandler: fabric.controlsUtils.rotationWithSnapping,
    actionName: "rotate",
    render: renderRotateIcon,
    cornerSize: 28,
    withConnection: true
  });

  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.85,
    offsetY: 0,
    cursorStyle: "pointer",
    mouseUpHandler: () => {
      canvasRef.current.remove(canvasRef.current.getActiveObject());
    },
    render: renderDeleteIcon,
    cornerSize: 24
  });

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    let activeObject = canvasRef.current.getActiveObject();
    if (activeObject) {
      if (activeObject.get("type") === "textbox") {
        activeObject.set("stroke", color.hex);
        activeObject.set("fill", color.hex);
      } else if (activeObject.get("type") === "group") {
        activeObject._objects.map((obj) => {
          obj.set("stroke", color.hex);
          obj.set("fill", color.hex);
        });
      } else {
        activeObject.set("stroke", color.hex);
      }
      canvasRef.current.renderAll();
      updateModifications(true);
    }
  };

  const handleFontSizeChange = (e) => {
    let activeObject = canvasRef.current.getActiveObject();
    setFontSize(e.target.value);
    if (activeObject.get("type") === "textbox") {
      activeObject.set("fontSize", Number(e.target.value));
    }
    canvasRef.current.renderAll();
    updateModifications(true);
  };

  return (
    <div className="App">
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button onClick={addCircle}>Add circle</button>
        <button onClick={addBox}>Add rectangle</button>
        <button onClick={addArrow}>Add arrow</button>
        <button
          onClick={() => {
            canvasRef.current.isDrawingMode = !canvasRef.current.isDrawingMode;
            setDrawingMode(!drawingMode);
          }}
        >
          Free pen {drawingMode ? "(Enabled)" : "(Disabled)"}
        </button>
        <button onClick={addTextBox}>Add text</button>
        <button onClick={() => setColorMode(!colorMode)}>
          Color
          {colorMode && (
            <div style={{ position: "absolute", zIndex: 5 }}>
              <SketchPicker
                style={{ position: "absolute" }}
                color={selectedColor}
                onChangeComplete={handleColorChange}
              />
            </div>
          )}
        </button>
        <button
          onClick={() => {
            if (canvasRef.current.getActiveObject().get("type") === "textbox") {
              setFontMode(!fontMode);
            }
          }}
        >
          Font size
          {fontMode && (
            <div style={{ position: "absolute" }}>
              <input
                value={fontSize}
                onChange={handleFontSizeChange}
                type="number"
              ></input>
            </div>
          )}
        </button>
        <button onClick={() => undo()}>Undo</button>
        <button onClick={() => redo()}>Redo</button>
        <button onClick={() => clearAll()}>Reset</button>
      </div>

      <canvas id="canvas" />
    </div>
  );
}
