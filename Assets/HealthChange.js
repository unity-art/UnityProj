#pragma strict

var label : GUIText;

function Start () {


}

function Update () 
{
	var healthDisplay = gameObject.Find("Player").GetComponent(PlayerStatsV2);
    
   	var ourHealth = healthDisplay.Health;
                
    label.text = ourHealth.ToString(); 
}
