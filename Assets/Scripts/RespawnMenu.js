//IMPORTANT NOTE! If you are using this script without having watched video number 20 then you must go ahead and remove the "//" from the script.
//The "//" signs were added because the sprintScript was deleted and instead we use the FPSWalkerEnhanced.
//Also note that the variable charMotor was changed to charController because it will then work with both the old and new setup.
//If any of this confuses you, watch tutorial number 20 :)

#pragma strict

//variables so you can disable looking around once dead
var lookAround01 : MouseLook;
var lookAround02 : MouseLook;

//var charMotor : CharacterMotor;

var charController : CharacterController;
//var sprintScript : SprintAndCrouch;

static var playerIsDead = false;

function Start () 
{
	//GetComponenet will find MouseLook for you...
	lookAround01 = gameObject.GetComponent(MouseLook);
	
	//not on the game componet, this script is attached to the player, and we want to find a componet that is a part of the camera, which is a child of the player... 
	//must use Find("MainCamera")... first finding the game object, then the component that we want
	lookAround02 = GameObject.Find("MainCamera").GetComponent(MouseLook);
	
	//charMotor = gameObject.GetComponent(CharacterMotor);
	charController = gameObject.GetComponent(CharacterController);
	//sprintScript = gameObject.GetComponent(SprintAndCrouch);
}

function Update ()
{
	if (playerIsDead == true)
	{
		lookAround01.enabled = false;
		lookAround02.enabled = false;
		//sprintScript.enabled = false;
		charController.enabled = false;
		//charMotor.movement.maxForwardSpeed = 0; //setting the max speed to 0
		//charMotor.enabled = false;
	}
}

//menu will be drawn when player is dead
function OnGUI ()
{
	if (playerIsDead == true)
	{
		//anchor point is lower left corner of GUI... if you want it to be in the centre of the screen, must factor in half the width and height of the screen
		if (GUI.Button(Rect(Screen.width*0.5-50, 200-20, 100, 40), "Respawn"))
		{
			//done in a seperate function for cleanliness and other purposes (ie. yield)
			RespawnPlayer();
		}
		
		if (GUI.Button(Rect(Screen.width*0.5-50, 240, 100, 40), "Menu"))
		{
			Debug.Log("Return to Menu");
		}
	}
}

function RespawnPlayer ()
{
	Debug.Log("Respawn Player");
}

@script RequireComponent(CharacterController)