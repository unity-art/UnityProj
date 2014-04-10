#pragma strict

var Health = 100;

function Update ()
{

	if(Health <= 0)
	{
		Dead();
	}
}

function ApplyDamage (TheDammage : int)
{
	Health -= TheDammage; 
}

function ApplyDamage2 (rockDamage : int)
{
	Health -= rockDamage; 
}

function Dead ()
{

	Destroy (gameObject);

}