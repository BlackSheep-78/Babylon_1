let app = 
{
    babylon : {},
    _move : {
        forward : false,
        backward : false,
        left : false,
        right : false
    },

    move : function(data)
    {
        let ap = this;
        let mem = {};

        if(typeof data == "object")
        {
            for (const property in data) 
            {
                ap._move[property] = data[property];
            } 
        } 
    },

    init: function()
    {
        let ap = this;
        let b  = this.babylon;

        b.canvas = document.getElementById("renderCanvas");
        b.engine = new BABYLON.Engine(b.canvas, true);
        b.scene  = new BABYLON.Scene(b.engine);

        // Camera setup
        b.camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), b.scene);
        // b.camera = new BABYLON.ArcRotateCamera("camera1", 58, 7, 10, 0, b.scene);
         b.camera.attachControl(b.canvas, true);
        b.camera.checkCollisions = true;

        // Light setup
        b.light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), b.scene);
        b.light.intensity = 0.7;

        b.textureGrass = new BABYLON.Texture("images/textures/grass/001.png", b.scene);
        b.materialGrass = new BABYLON.StandardMaterial("material1", b.scene);
        b.materialGrass.diffuseTexture = b.textureGrass;
        b.materialGrass.diffuseTexture.uScale = 4; // Repeat texture 2 times horizontally
        b.materialGrass.diffuseTexture.vScale = 4;

        // Create floor
        b.floor = BABYLON.MeshBuilder.CreateGround("ground", { width: 100, height: 100 }, b.scene);
        b.floor.checkCollisions = true; // Enable collision on the floor
        b.floor.material =  b.materialGrass;

        b.texture = new BABYLON.Texture("https://www.babylonjs.com/assets/wood.jpg", b.scene);

        // Create a material and assign the texture to it
        b.material = new BABYLON.StandardMaterial("material1", b.scene);
        b.material.diffuseTexture = b.texture;

        // Create the cube with size 1
        b.cube = BABYLON.MeshBuilder.CreateBox("cube", { size: 1 }, b.scene);
        b.cube.position = new BABYLON.Vector3(0,0.5,0);

        // Create material
        //b.material = new BABYLON.StandardMaterial("boxMaterial", b.scene);
        //b.material.diffuseColor = new BABYLON.Color3(1, 0, 0); // RGB values (1, 0, 0) for red
        b.cube.material = b.material;

        b.scene.onBeforeRenderObservable.add(function() 
        {
            let movementSpeed = 0.1;
            let rotationSpeed = 0.01;

            if (ap._move.forward) 
            {
                //b.cube.position.z -= movementSpeed;

                var forward = b.cube.getDirection(BABYLON.Axis.Z);
                b.cube.position.addInPlace(forward.scale(movementSpeed));
                console.log("forward");
            }

            if (ap._move.backward)
            {
                var forward = b.cube.getDirection(BABYLON.Axis.Z);
                b.cube.position.addInPlace(forward.scale(-movementSpeed));
                console.log("backward");
            } 

            if (ap._move.left)
            {
                b.cube.rotation.y -= rotationSpeed;
            } 

            if (ap._move.right)
            {
                b.cube.rotation.y += rotationSpeed;
            } 

            let followSpeed = 0.01;
            let targetPosition = b.cube.position.clone();

            targetPosition.y += 5; // Set camera height offset
            targetPosition.x += 10; // Set camera offset on X-axis
            targetPosition.z -= 10; // Set camera offset on Z-axis

            b.camera.position = BABYLON.Vector3.Lerp(b.camera.position, targetPosition, followSpeed);

            b.camera.setTarget(b.cube.position);


        });

        // Enable physics and gravity
        b.gravityVector = new BABYLON.Vector3(0, -0.5, 0);
        b.scene.gravity = b.gravityVector;
        b.scene.collisionsEnabled = true;

        // Run the render loop
        b.engine.runRenderLoop(function() 
        {



            b.scene.render();
        });
    },

    resize: function()
    {
        this.babylon.engine.resize();
    },

    keydown: function(evt)
    {
        let ap = this;

        if (evt.key === "w" || evt.key === "ArrowUp")    ap.move({"forward":true});
        if (evt.key === "s" || evt.key === "ArrowDown")  ap.move({"backward":true});   
        if (evt.key === "a" || evt.key === "ArrowLeft")  ap.move({"left":true});    
        if (evt.key === "d" || evt.key === "ArrowRight") ap.move({"right":true}); 
    },

    keyup: function(evt)
    {
        let ap = this;

        if (evt.key === "w" || evt.key === "ArrowUp")    ap.move({"forward":false});
        if (evt.key === "s" || evt.key === "ArrowDown")  ap.move({"backward":false});   
        if (evt.key === "a" || evt.key === "ArrowLeft")  ap.move({"left":false});    
        if (evt.key === "d" || evt.key === "ArrowRight") ap.move({"right":false}); 
    },

    mouseclick: function(evt)
    {
        let ap = this;

        switch (evt.target.id) 
        {
            case "cameraAttachControl":
                if(evt.target.checked)
                {
                    ap.babylon.camera.attachControl(ap.babylon.canvas,true);
                }
                else
                {
                    ap.babylon.camera.detachControl(ap.babylon.canvas);
                }
            break;
        
            default:
            break;
        }
    }
}


window.addEventListener('DOMContentLoaded', function() 
{
    app.init()
});

// Keyboard events
window.addEventListener("keydown", function(evt) 
{
    app.keydown(evt);
});

window.addEventListener("keyup", function(evt) 
{
    app.keyup(evt);
});

// Resize the engine on window resize
window.addEventListener('resize', function() 
{
    app.resize();
});

// Resize the engine on window resize
window.addEventListener('click', function(evt) 
{
    app.mouseclick(evt);
});




