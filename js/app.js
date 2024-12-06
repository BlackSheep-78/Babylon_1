let app = 
{
    babylon : {},

    init: function(obj)
    {
        let that = this;
        let b = this.babylon;

        b.canvas = document.getElementById("renderCanvas");
        b.engine = new BABYLON.Engine(b.canvas, true);
        b.scene  = new BABYLON.Scene(b.engine);

        // Camera setup
        //b.camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), b.scene);
        b.camera = new BABYLON.ArcRotateCamera("camera1", 58, 7, 10, 0, b.scene);
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

        /*
        BABYLON.SceneLoader.Append("assets/models/", "nepali_house.glb", b.scene, function (scene) 
        {
            console.log("Model loaded successfully!");
            
           
            if (scene.animationGroups.length > 0) {
                scene.animationGroups[0].start(true);
            }
        }, null, function (scene, message) {
            console.error("Error loading model: ", message);
        });
        */


        // Run the render loop
        b.engine.runRenderLoop(function() 
        {
            b.scene.render();

        });
    },

    resize: function()
    {
        this.babylon.engine.resize();
    }
}


window.addEventListener('DOMContentLoaded', function() 
{
    app.init()
});

  // Resize the engine on window resize
  window.addEventListener('resize', function() 
  {
    app.resize();
  });


