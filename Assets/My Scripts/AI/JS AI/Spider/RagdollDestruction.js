#pragma strict

function Start () {
	yield WaitForSeconds(5);
	// Destroy ourselves
	Destroy(gameObject);
}

function Update () {

}