#pragma strict

var Damage : int = 50;
var Distance : float ;
var TheSystem : Transform;
//var TheMace : Transform;

//setting for enemy distance
var MaxDistance : float = 1.5;


function Update ()
{

	if (Input.GetButtonDown("Fire1"))
	
	{
	
		//attack animation
		animation.Play("Swing");
		AttackDamage();
					
	}

//	if (TheMace.animation.isPlaying == false)
//	{
//	
//		TheMace.animation.CrossFade("ForIdle");
//	
//	}
//	
//	if (Input.GetKey (KeyCode.LeftShift))
//	{
//	
//	TheMace.animation.CrossFade("Sprint");
//	
//	}
//	
//	//to stop sprint animation
//	if (Input.GetKeyUp(KeyCode.LeftShift))
//	{
//	
//		TheMace.animation.CrossFade("ForIdle");
//	
//	}
	
			
}

function AttackDamage ()
{

		//attack function
		var hit : RaycastHit;
	
		if (Physics.Raycast (TheSystem.transform.position, TheSystem.transform.TransformDirection(Vector3.forward), hit))
		{
		
			//keep all below code because you always want the animation to play regardless of distance of enemy
			Distance = hit.distance;
	
			//if statement to determine enemy distance
			if(Distance < MaxDistance) 
	
			{
			//result if true - enemy takes damage
				hit.transform.SendMessage("ApplyDamage", Damage, SendMessageOptions.DontRequireReceiver);
			}
			
		}

}