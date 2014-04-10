#pragma strict

private var theCollider : String;

//OnTriggerEnter is called whenever a game object enters the Collider... other means we want to collect data from this entry, (data called 'other'), Collider is what we want to know about
function OnTriggerEnter (other : Collider)
{
	//this is a tag, equals the 'collidee', the one we are colliding with
	theCollider = other.tag;
	
	if (theCollider == "Player")
	{
		//play audio attached to audio zone, loop until infinity
		audio.Play();
		audio.loop = true;
	
	}

}

function OnTriggerExit (other : Collider)
{
	theCollider = other.tag;
	
	if (theCollider == "Player")
	{
		//because audio files are long (15-20 sec. recommended for blending purposes) must force stop
		audio.Stop();
	
		//audio will play out until finished, then not repeat... for when player leaving audio area
		audio.loop = false;
	
	}

}