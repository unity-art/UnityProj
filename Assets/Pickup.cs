using UnityEngine;
using System.Collections;

public class Pickup : MonoBehaviour {
	void OnTriggerEnter(Collider col){
		if (col.tag == "Player"){
			Debug.Log("Coins!");
			ScoreManager.score += 100;
			Destroy (this.gameObject);
		}
	}
	
}
