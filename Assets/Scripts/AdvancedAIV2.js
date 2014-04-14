//IMPORTANT NOTE! THIS SCRIPT WAS MADE IN VIDEO NUMBER 21! CHECK OUT THE EARLIER VERSION (NOT V2) IF YOU HAVEN'T REACHED THAT VIDEO.

var Distance;
var Target : Transform;
var lookAtDistance = 25.0;
var chaseRange = 15.0;
var attackRange = 4;
var moveSpeed = 5.0;
var Damping = 6.0;
var attackRepeatTime = 1;
var anim : Animator;
var TheDammage = 40;

private var attackTime : float;

var controller : CharacterController;
var gravity : float = 20.0;
private var MoveDirection : Vector3 = Vector3.zero;

function Start ()
{
	attackTime = Time.time;
	anim = GetComponent("Animator");
}

function Update ()
{
	//using player-is-dead check from RespawnMenuV2
	if(RespawnMenuV2.playerIsDead == false)
	{
		Distance = Vector3.Distance(Target.position, transform.position);
				
		if (Distance < attackRange)
		{
			attack();
			anim.SetBool("InAtkRange", true);
		} else {
			anim.SetBool("InAtkRange", false);
		}
	}
}

function attack ()
{
	if (Time.time > attackTime)
	{
		Target.SendMessage("ApplyDammage", TheDammage);
		Debug.Log("The Enemy Has Attacked");
		attackTime = Time.time + attackRepeatTime;
	}
}

function ApplyDammage ()
{
	chaseRange += 30;
	moveSpeed += 2;
	lookAtDistance += 40;
}