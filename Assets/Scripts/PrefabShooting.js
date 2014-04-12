#pragma strict

//written by JSC Apr 12 2014

public var theBullet : Rigidbody;
var Speed = 20;
var shotDelay = 0;


function Update () 
{
	//var shotDelayAmt = shotDelay / 2;

	if (Input.GetMouseButtonDown(1)) //&& shotDelayAmt % 1 == 0)
	{
	
	
		var clone = Instantiate(theBullet, transform.position, transform.rotation);
		clone.velocity = transform.TransformDirection(Vector3(0, 0, Speed));
			
		Destroy (clone.gameObject, 3);
	
		//shotDelay += 0.5;		
	}	
	
	else
	{
	
	//shotDelay += 0.001;
	
	}
}
