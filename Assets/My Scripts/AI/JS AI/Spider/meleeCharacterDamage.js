var hitPoints = 280.0;
var deadReplacement : Transform;
var dieSound : AudioClip;
var shrapnelDamage = 150.0;
var gasDamage = 90;
var shrapnelPrefab : GameObject[];
var delayDeathTime = 0.7;

function Update()
{
if (transform.position.y < -150) {

	Destroy(gameObject);

}
}

function ApplyDamage (damage : int) {
	// We already have less than 0 hitpoints, maybe we got killed already?
	
	if (hitPoints <= 0.0)
		return;

	hitPoints -= damage;
	//expand enemy search radius if attacked outside default search radius to defend against sniping
	transform.GetComponent(meleeAI).attackRangeAmt = transform.GetComponent(meleeAI).attackRange * 3;
	
	var number = Random.Range(1,100);
	var number2 = Random.Range(1,100);
	var number3 = Random.Range(1, 100);
	var number4 = Random.Range(1, 100);
	var number5 = Random.Range(1, 100);
	var number6 = Random.Range(1, 100);
	
	if (hitPoints <= 350 && number3 >= 70)
	{
		animation.CrossFade("jump", 0.3);
	}
	
	if (hitPoints <= 200 && number3 >= 50)
	{
		animation.CrossFade("jump", 0.3);
	}
	
	if (hitPoints <= 150 && number3 >= 30)
	{
		animation.CrossFade("jump", 0.3);
	}
	
	if (hitPoints <= 100 && number3 >= 10)
	{
		animation.CrossFade("jump", 0.3);
	}	
	
	if (hitPoints <= 379 && number4 >= 20)
	{
		animation.CrossFade("taunt", 0.3);
	}
	
	if (hitPoints <= 200 && number5 >= 50)
	{
		animation.CrossFade("taunt", 0.3);
	}
	
	if (hitPoints <= 80 && number6 >= 90)
	{
		animation.CrossFade("taunt", 0.3);
	}
	
	//the rest all number2, so that if it takes a hit once, it takes a hit over and over until death (continued weakness)	-jsc
	if (hitPoints <= 250 && number2 > 50)
	{
		Hit();
	}
	
	if (hitPoints <= 200 && number2 > 40)
	{
		Hit();
	}
	
	if (hitPoints <= 150 && number2 > 30)
	{
		Hit();
	}
	
	if (hitPoints <= 100 && number2 > 20)
	{
		Hit();
	}	
	
	if (hitPoints <= 50 && number2 > 10)
	{
		Hit();
	}
	
	if (hitPoints <= 0.0)
	{
		Detonate();
	}
}



function ApplyDamage2 (rockDamage : float) {
	// We already have less than 0 hitpoints, maybe we got killed already?
	
	if (hitPoints <= 0.0)
		return;

	hitPoints -= rockDamage;
	//expand enemy search radius if attacked outside default search radius to defend against sniping
	transform.GetComponent(meleeAI).attackRangeAmt = transform.GetComponent(meleeAI).attackRange * 3;
	
	var number = Random.Range(1,100);
	var number2 = Random.Range(1,100);
	var number3 = Random.Range(1, 100);
	var number4 = Random.Range(1, 100);
	var number5 = Random.Range(1, 100);
	var number6 = Random.Range(1, 100);
	
	if (hitPoints <= 350 && number3 >= 70)
	{
		animation.CrossFade("jump", 0.3);
	}
	
	if (hitPoints <= 200 && number3 >= 50)
	{
		animation.CrossFade("jump", 0.3);
	}
	
	if (hitPoints <= 150 && number3 >= 30)
	{
		animation.CrossFade("jump", 0.3);
	}
	
	if (hitPoints <= 100 && number3 >= 10)
	{
		animation.CrossFade("jump", 0.3);
	}	
	
	if (hitPoints <= 379 && number4 >= 20)
	{
		animation.CrossFade("taunt", 0.3);
	}
	
	if (hitPoints <= 200 && number5 >= 50)
	{
		animation.CrossFade("taunt", 0.3);
	}
	
	if (hitPoints <= 80 && number6 >= 90)
	{
		animation.CrossFade("taunt", 0.3);
	}
	
	//the rest all number2, so that if it takes a hit once, it takes a hit over and over until death (continued weakness)	-jsc
	if (hitPoints <= 250 && number2 > 50)
	{
		Hit();
	}
	
	if (hitPoints <= 200 && number2 > 40)
	{
		Hit();
	}
	
	if (hitPoints <= 150 && number2 > 30)
	{
		Hit();
	}
	
	if (hitPoints <= 100 && number2 > 20)
	{
		Hit();
	}	
	
	if (hitPoints <= 50 && number2 > 10)
	{
		Hit();
	}
	
	if (hitPoints <= 0.0)
	{
		Detonate();
	}
}






function Detonate () {

	animation.Stop();

	var ranDeath = Random.Range(1, 100);
	
	if (ranDeath >= 50)
	{
		animation.CrossFade("death1", 0.3);
	}

	if (ranDeath < 50)
	{
		animation.CrossFade("death2", 0.3);
	}	
	yield WaitForSeconds(delayDeathTime);
	// Destroy ourselves
	Destroy(gameObject);
	
	// Play a dying audio clip
	if (dieSound)
		AudioSource.PlayClipAtPoint(dieSound, transform.position);

	// Replace ourselves with the dead body
	if (deadReplacement) {
		var dead : Transform = Instantiate(deadReplacement, transform.position, transform.rotation);
		
		// Copy position & rotation from the old hierarchy into the dead replacement
		CopyTransformsRecurse(transform, dead);
	}
}

static function CopyTransformsRecurse (src : Transform,  dst : Transform) {
	dst.position = src.position;
	dst.rotation = src.rotation;
	
	for (var child : Transform in dst) {
		// Match the transform with the same name
		var curSrc = src.Find(child.name);
		if (curSrc)
			CopyTransformsRecurse(curSrc, child);
	}
}

function Hit ()
{

	var rando = Random.Range(1, 100);
	
	if (rando >= 50)
	{
		animation.CrossFade("hit1", 0.2);
	}
	
	if (rando < 50)
	{
		animation.CrossFade("hit2", 0.2);
	}	
}

function OnTriggerEnter (col2 : Collider) 
{

	//shrapnel damage apply
	if (col2.gameObject == shrapnelPrefab || col2.gameObject.tag == "Shrapnel")	
	{		
    	gameObject.BroadcastMessage("ApplyDamage", shrapnelDamage, SendMessageOptions.DontRequireReceiver);
    	Hit();
	}		

	//gas damage apply
	if (col2.gameObject.tag == "gasCloud")	

	{
		var i : int = 0;			
	
		while(i < 10)
		{
			gameObject.BroadcastMessage("ApplyDamage", gasDamage, SendMessageOptions.DontRequireReceiver);
			i++;
			yield WaitForSeconds(3);
			Hit();
		}
	}	
}	