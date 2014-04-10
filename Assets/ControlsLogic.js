#pragma strict

private var drawGUI = false;

function Update () 
{

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
		GUI.contentColor = Color.green;
		GUI.backgroundColor = Color.gray;
		GUI.Box (Rect (Screen.width*0.5-500, 200, 1000, 130), "<size=30>Press <RIGHT MOUSE> to throw a rock\nPress <SHIFT> to sprint\nPress <C> to crouch</size>");
	}
}