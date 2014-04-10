var Distance;

var Target : Transform;

var lookAtDistance = 25.0;

var attackRange = 15.0;

var moveSpeed = 5.0;

var Damping = 6.0;

function Update()
{

	//a Vector is a line in 3D space... this code measures the distance from point A; target, to point B; player
	Distance = Vector3.Distance(Target.position, transform.position);

	if (Distance < lookAtDistance)
	{
		//if the distance is smaller than lookAtDistance, the enemy will shift its colour to yellow
		renderer.material.color = Color.yellow;
		//call function lookAt
		lookAt();
	}
	
	if (Distance > lookAtDistance)
	{
		//enemy not within range, and ignoring player
		renderer.material.color = Color.green;
	}	

	if (Distance < attackRange)
	{
		//enemy aggressive and attacking
		renderer.material.color = Color.red;
		attack ();
	
	}

}

function lookAt()
{
	//enemy will look at you when alerted... quaternion means rotation... this is creating a new variable called rotation which will store the Quaternion.LookRotation 
	//at target's position less our positon
	var rotation = Quaternion.LookRotation(Target.position - transform.position);
	//we want the enemy's current rotation, transform.rotation, is now equal to Quaternion.Slerp... which will slowly turn when damping is applied... 
	//change from current rotation of enemy, rotation... Time.deltaTime makes sure no matter how many frames you're running at, the rotation will always be the same
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * Damping);
}

function attack()
{
	//using Vector as a direction this time... Time.deltaTime only there to make sure the frame rate doesn't affect anything
	transform.Translate(Vector3.forward * moveSpeed * Time.deltaTime);
	//the enemy with move forward by the move speed we have set (and not be affect by frame rate)
}