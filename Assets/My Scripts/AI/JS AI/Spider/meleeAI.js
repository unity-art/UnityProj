var speed = 3.0;
private var speedAmt = 1.0;
var rotationSpeed = 15.0;
var shootRange = 2.0;
var attackRange = 30.0;
@HideInInspector
var attackRangeAmt = 30.0;
private var shootAngle = 2.0;
var dontComeCloserRange = 0.0;
var delayShootTime = 0.55;
private var delayShootTimeRand = 0.0;
var pickNextWaypointDistance = 2.0;
@HideInInspector
var target : Transform;
private var myTransform : Transform;
var doPatrol = true;
var searchMask : LayerMask = 0;//only layers to include in target search (for efficiency)

//taken from SeekSteer	-jsc
	var waypoints : Transform[];
    var waypointRadius : float  = 1.5;
    var damping : float = 0.1;
    var loop : boolean = false;
    var faceHeading : boolean = true;
    private var targetHeading : Vector3;
    private var currentHeading : Vector3;
    private var targetwaypoint : int;
	private var xform : Transform;
//    private var useRigidbody : boolean;
//    private var rigidmember : Rigidbody;

private var lastShot = -10.0;

// Make sure there is always a character controller
@script RequireComponent (CharacterController)

function Start () {

		//var firstWay = GameObject.Find("MyWaypoint").transform;
		//waypoints[0] = firstWay;
		
		//from SeekSteer	-jsc
		xform = transform;
        currentHeading = xform.forward;
        if(waypoints.Length<=0)
        {
            Debug.Log("No waypoints on "+name);
            enabled = false;
        }
        targetwaypoint = 0; 

	attackRangeAmt = attackRange;
	// Auto setup player as target through tags
	if(target == null && GameObject.FindWithTag("Player2")){
		target = GameObject.FindWithTag("Player2").transform;
		
		target = GameObject.Find("Player").transform;
		
	}
	if(doPatrol){
	
	Patrol();		
	
	}else{
		StandWatch();
	}
}

function Awake () {
    myTransform = transform;
}

function StandWatch () {
	animation.CrossFade("idle", 0.3);
	while (true) {

		// Attack the player and wait until
		// - player is killed
		// - player is out of sight		
		if (CanSeeTarget ()){
			yield StartCoroutine("AttackPlayer");
		}
		yield new WaitForFixedUpdate ();
	}
}

function Patrol () {
	
		//var curWayPoint = AutoWayPoint.FindClosest(myTransform.position);
		
		
		
	
			//from SeekSteer	-jsc
		//MoveTowards(waypoints[targetwaypoint].position);
		
//		if(Vector3.Distance(xform.position,waypoints[targetwaypoint].position)<=waypointRadius)
//        {
            //targetwaypoint++;
            
            if(targetwaypoint>=waypoints.Length)
            {
                targetwaypoint = 0;
                if(!loop)
                    enabled = false;
            }
        //}	

	while (true) {
//		var waypointPosition = curWayPoint.transform.position;
//		// Are we close to a waypoint? -> pick the next one!
//		if(Vector3.Distance(waypointPosition, myTransform.position) < pickNextWaypointDistance){
//			curWayPoint = PickNextWaypoint (curWayPoint);
//		}
		// Attack the player and wait until
		// - player is killed
		// - player is out of sight		
		if(CanSeeTarget ()){
			yield StartCoroutine("AttackPlayer");
		}
		// Move towards our target
		//MoveTowards(waypointPosition);
		
		MoveTowards(waypoints[targetwaypoint].position);
		
		yield new WaitForFixedUpdate ();
		
		if(Vector3.Distance(xform.position,waypoints[targetwaypoint].position)<=waypointRadius)
        {
            targetwaypoint++;
            
            if(targetwaypoint>=waypoints.Length)
            {
                targetwaypoint = 0;
                if(!loop)
                    enabled = false;
            }
        }
	}
}

//function Patrol () {
//	var curWayPoint = AutoWayPoint.FindClosest(myTransform.position);
//
//	while (true) {
//		var waypointPosition = curWayPoint.transform.position;
//		// Are we close to a waypoint? -> pick the next one!
//		if(Vector3.Distance(waypointPosition, myTransform.position) < pickNextWaypointDistance){
//			curWayPoint = PickNextWaypoint (curWayPoint);
//		}
//		// Attack the player and wait until
//		// - player is killed
//		// - player is out of sight		
//		if(CanSeeTarget ()){
//			yield StartCoroutine("AttackPlayer");
//		}
//		// Move towards our target
//		MoveTowards(waypointPosition);
//		
//		yield new WaitForFixedUpdate ();
//	}
//}


function CanSeeTarget () : boolean {
	if(Vector3.Distance(myTransform.position, target.position) > attackRangeAmt){
		return false;
	}
	var hit : RaycastHit;
	if(Physics.Linecast (myTransform.position, target.position, hit, searchMask)){
	
	//to determine what we are running into for debuggin' -jsc
	//Debug.Log(hit.collider.name); 
	
		return hit.transform == target;
	}
	return false;
}

function Shoot () {
	// Start MELEE animation
	animation.CrossFade("attack1", 0.3);
	speedAmt = 0.0f;
	SendMessage("SetSpeed", 0.0);
	doLightDamage();
	// Wait until half the animation has played
	yield WaitForSeconds(delayShootTime);
	// Fire gun
	//BroadcastMessage("Fire");
	// Wait for the rest of the animation to finish
	//yield WaitForSeconds(animation["shoot"].length - delayShootTime + Random.Range(0.0f, 0.75f));
	var randoc = Random.Range(1, 100);
	if (randoc >= 50)
	{
		animation.CrossFade("attack2", 0.3);
		doHeavyDamage();
	}
}

var damageTimer = 0.0;
var damageHAmount = 3;
var damageLAmount = 1;

function doHeavyDamage()
{
	yield WaitForSeconds(0.25);

	if(damageTimer==0.0)
	{
		damageTimer = Time.time;
	}
	if((damageTimer+0.05) > Time.time)
	{
		return;
	}
	else
	{		
		target.transform.SendMessage("ApplyDammage", damageHAmount, SendMessageOptions.DontRequireReceiver);
		
		damageTimer = Time.time;
	}
}

function doLightDamage()
{
	yield WaitForSeconds(0.15);

	if(damageTimer==0.0)
	{
		damageTimer = Time.time;
	}
	if((damageTimer+0.05) > Time.time)
	{
		return;
	}
	else
	{		
		target.transform.SendMessage("ApplyDammage", damageLAmount, SendMessageOptions.DontRequireReceiver);
		
		damageTimer = Time.time;
	}
}

function AttackPlayer () {
	var lastVisiblePlayerPosition = target.position;
	while (true) {
		if(CanSeeTarget ()){
			// Target is dead - stop hunting
			if(target == null){
				speedAmt = 1.0f;
				return;
			}
			// Target is too far away - give up	
			var distance = Vector3.Distance(myTransform.position, target.position);
			if(distance > attackRangeAmt){
				speedAmt = 1.0f;
				return;
			}
			speedAmt = speed;
			lastVisiblePlayerPosition = target.position;
			if(distance > dontComeCloserRange){
				MoveTowards (lastVisiblePlayerPosition);
			}else{
				RotateTowards(lastVisiblePlayerPosition);
			}
			var forward = myTransform.TransformDirection(Vector3.forward);
			var targetDirection = lastVisiblePlayerPosition - myTransform.position;
			targetDirection.y = 0;

			var angle = Vector3.Angle(targetDirection, forward);

			// Start shooting if close and player is in sight
			if(distance < shootRange && angle < shootAngle){
				yield StartCoroutine("Shoot");
			}
		}else{
			speedAmt = speed;
			yield StartCoroutine("SearchPlayer", lastVisiblePlayerPosition);
			// Player not visible anymore - stop attacking
			if (!CanSeeTarget ()){
				speedAmt = 1.0f;
				return;
			}
		}

		yield new WaitForFixedUpdate ();
	}
}

function SearchPlayer (position : Vector3) {
	// Run towards the player but after 3 seconds timeout and go back to Patroling
	var timeout = 3.0;
	while(timeout > 0.0){
		MoveTowards(position);

		// We found the player
		if(CanSeeTarget()){
			return;
		}
		timeout -= Time.deltaTime;
		yield new WaitForFixedUpdate ();
	}
}

function RotateTowards (position : Vector3) {
	SendMessage("SetSpeed", 0.0);
	
	var direction = position - myTransform.position;
	direction.y = 0;
	if(direction.magnitude < 0.1){
		return;
	}
	// Rotate towards the target
	myTransform.rotation = Quaternion.Slerp (myTransform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime * 100);
	myTransform.eulerAngles = Vector3(0, myTransform.eulerAngles.y, 0);
}

function MoveTowards (position : Vector3) {
	var direction = position - myTransform.position;
	direction.y = 0;
	if(direction.magnitude < 0.5){
		SendMessage("SetSpeed", 0.0);
		return;
	}
	
	// Rotate towards the target
	myTransform.rotation = Quaternion.Slerp (myTransform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);
	myTransform.eulerAngles = Vector3(0, myTransform.eulerAngles.y, 0);
	// Modify speed so we slow down when we are not facing the target
	var forward = myTransform.TransformDirection(Vector3.forward);
	var speedModifier = Vector3.Dot(forward, direction.normalized);
	speedModifier = Mathf.Clamp01(speedModifier);
	// Move the character
	direction = forward * speedAmt * speedModifier;
	GetComponent (CharacterController).SimpleMove(direction);
	
	SendMessage("SetSpeed", speedAmt * speedModifier, SendMessageOptions.DontRequireReceiver);
	
}

function OnDrawGizmos(){
 
        Gizmos.color = Color.red;
        for(var i : int = 0; i < waypoints.Length;i++)
        {
           var pos : Vector3 = waypoints[i].position;
            if(i>0)
            {
                var prev : Vector3 = waypoints[i-1].position;
                Gizmos.DrawLine(prev,pos);
            }
        }
    }

//function PickNextWaypoint (currentWaypoint : AutoWayPoint) {
//	// The direction in which we are walking
//	var forward = myTransform.TransformDirection(Vector3.forward);
//	// The closer two vectors, the larger the dot product will be.
//	var best = currentWaypoint;
//	var bestDot = -10.0;
//	for(var cur : AutoWayPoint in currentWaypoint.connected){
//		var direction = Vector3.Normalize(cur.transform.position - myTransform.position);
//		var dot = Vector3.Dot(direction, forward);
//		if(dot > bestDot && cur != currentWaypoint){
//			bestDot = dot;
//			best = cur;
//		}
//	}
//	
//	return best;
//}
