#pragma strict

var walkSpeed : float = 7; //Regular speed
var sprintSpeed : float = 13; // Speed while sprinting

var crouchSpeed : float = 3; //Speed while crouching

//allows us to change the character's speed
private var charMotor : CharacterMotor;
//this controller checks if we are standing or floating in the air... ie. can only sprint if standing on ground
private var charController : CharacterController;
private var theTransform : Transform;

//crouch only code
private var charHeight : float; //Initial height

function Start () 
{
	//GetComponent - used when you need to get a component from an object... can only be one type
	//these variables and such are technically not required, however a very good idea for caching purposes
	charMotor = GetComponent(CharacterMotor);
	//what we access when we want to get the position, size, rotation, etc.
	theTransform = transform;
	//to check height of character
	charController = GetComponent(CharacterController);
	
	//crouch only... this line must be last or at least beneath the charController -js
	charHeight = charController.height;
}

function Update () 
{
	//our intitial height
	var h = charHeight;
	//making the default speed var
	var speed = walkSpeed;
	
	//check if character controller is grounded, AND sprint key is pressed
	if (charController.isGrounded && Input.GetKey("left shift") || Input.GetKey("right shift"))
	{
		//set speed to sprint
		speed = sprintSpeed;
	}
	
	if (Input.GetKey("x"))
	{
		//valve for height change... set to 50% reduction
		h = charHeight*0.4;
		//makes sure you can't sprint while crouching... changes speed at end, such that crouchSpeed overrides sprintSpeed
		speed = crouchSpeed;
	}
	
	//sprint
	charMotor.movement.maxForwardSpeed = speed; // Setting the max speed
	
	//crouch
	var lastHeight = charController.height; //Stand up or crouch smoothly... by storing the lastHeight we can use Lerp to smoothly transition between the two heights
	charController.height = Mathf.Lerp(charController.height, h, 5*Time.deltaTime); //it will transition from the current height to the h (lastHeight.Mathf.Lerp also works)
	theTransform.position.y += (charController.height-lastHeight)/2; //Fix vertical position
}