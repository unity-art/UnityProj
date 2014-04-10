#pragma strict

var theDoor2 : Transform;
private var drawGUI = false;
//determines if door is closed or not
private var doorIsClosed2 = true;

function Update () 
{
	//for player to open the door... must be inside zone and pressing key
	if (drawGUI == true && Input.GetKeyDown(KeyCode.E))
	{
		changeDoorState2();
	}
}

//this code will check if something enters, and store informaton about the object that enters (theCollider)
function OnTriggerEnter (theCollider : Collider)
{
	//if the object that entered is the player, it will 
	if (theCollider.tag == "Player")
	{
		drawGUI = true;
	}
}

//so the on-screen message will turn off when you leave the area
function OnTriggerExit (theCollider : Collider)
{
	if (theCollider.tag == "Player")
	{
		drawGUI = false;
	}
}

//drawGUI is what we use to draw something on screen, such as 2D elements such as text
//GUI elements can only be made within the OnGUI function
function OnGUI ()
{
	if (drawGUI == true)
	
	{
		//the first two variables determine where on the screen it will be drawn... so its x, y, x, y (width of the label)
		//first x, y is position, second x, y is for size of label
		GUI.Box (Rect (Screen.width*0.5-51, 200, 102, 22), "Press E to open");
	}
}

function changeDoorState2 ()
{
	if (doorIsClosed2 == true)
	{
		theDoor2.animation.CrossFade("Open2");
		//theDoor.audio.PlayOneShot();
		doorIsClosed2 = false;
		
		//yields are used to time the sound effect correctly... a yield CANNOT be used within a function Update (would slow computer's frame rate)
		yield WaitForSeconds(3);
		
		//could also reverse the Open animation video, but that is more difficult
		theDoor2.animation.CrossFade("Close2");
		//theDoor.audio.Play();
		doorIsClosed2 = true;
	}
}