#pragma strict

//the effect whenever the ray hits a target
var Effect : Transform;

var Damage2 = 100;

private var lineTransform : Vector3;
private var startTransform : Vector3;

function Start ()
{

	lineTransform = transform.position;
	startTransform = transform.position;

}

function Update () {
	
	//since these are in funciton Update, each variable will be changed constantly
	//the hit variable stores information about the enemy being hit (ie. when and where the enemy was hit)
	var hit : RaycastHit;
	//the actual raycast... ie. the line drawn... the centre of the screen should send out the ray... ScreenPointToRay will send a line straight from a screen 2D coordinate
	var ray : Ray = Camera.main.ScreenPointToRay(Vector3(Screen.width*0.5, Screen.height*0.5, 0));
	
	//the 0 means the left mouse button
	if (Input.GetMouseButtonDown(1))
	{
		if (Physics.Raycast (ray, hit, 100))
		{
			//for showing particles when hitting target or missing... Instantiate is what you use when you want to spawn an object
			//hit.normal is so the particles will emit outward when hitting target... normal is the line-span stretching across the face of the closest point of an object (ie. sphere)
			var particleClone = Instantiate(Effect, hit.point, Quaternion.LookRotation(hit.normal));
			//destroys particles after 2 seconds
			Destroy(particleClone.gameObject, 2);
			
			//the enemy taking damage and/or dying
			hit.transform.SendMessage("ApplyDamage", Damage2, SendMessageOptions.DontRequireReceiver);
		
			lineTransform = hit.point;
		}
	}
	
	Debug.DrawRay(startTransform, lineTransform, Color.red);
}