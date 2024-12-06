

window.addEventListener('DOMContentLoaded', function() 
{


    return;










  // Keyboard controls for humanoid movement
  let moveForward = false;
  let moveBackward = false;
  let moveLeft = false;
  let moveRight = false;

  const speed = 0.1; // Movement speed

  // Keyboard events
  window.addEventListener("keydown", function(evt) 
  {
    if (evt.key === "w" || evt.key === "ArrowUp") moveForward = true;
    if (evt.key === "s" || evt.key === "ArrowDown") moveBackward = true;
    if (evt.key === "a" || evt.key === "ArrowLeft") moveLeft = true;
    if (evt.key === "d" || evt.key === "ArrowRight") moveRight = true;
  });

  window.addEventListener("keyup", function(evt) 
  {
    if (evt.key === "w" || evt.key === "ArrowUp") moveForward = false;
    if (evt.key === "s" || evt.key === "ArrowDown") moveBackward = false;
    if (evt.key === "a" || evt.key === "ArrowLeft") moveLeft = false;
    if (evt.key === "d" || evt.key === "ArrowRight") moveRight = false;
  });

  scene.onBeforeRenderObservable.add(function() 
  {
    
    if (moveForward) 
    {
        console.log("moveForward");

        cube.position.z -= speed;
    }

    if (moveBackward)
    {
      cube.position.z += speed;
      console.log("moveBackward");
    } 

    if (moveLeft)
    {
      cube.position.x += speed;
      console.log("moveLeft");
     
    } 

    if (moveRight)
    {
      cube.position.x -= speed;
      console.log("moveRight");
    } 
  });
    
  

  // Enable physics and gravity
  const gravityVector = new BABYLON.Vector3(0, -0.5, 0);
  scene.gravity = gravityVector;
  scene.collisionsEnabled = true;




});