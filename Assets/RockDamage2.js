#pragma strict

var rockDamage = 5;
//var theRock = rigidbody;

function OnCollisionEnter (info : Collision)
{
	info.transform.SendMessage("ApplyDamage2", rockDamage, SendMessageOptions.DontRequireReceiver);

//	if (Collision.gameObject.CompareTag("Enemy"))
//		{
//			var target=Collision.gameObject;
//		
//			target.collider.SendMessage("ApplyDamage2", rockDamage, SendMessageOptions.DontRequireReceiver);
//		}	

}