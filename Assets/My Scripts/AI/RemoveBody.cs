//RemoveBody.cs by Azuline Studios© All Rights Reserved
using UnityEngine;
using System.Collections;
//script to remove bodies after a time for performance
public class RemoveBody : MonoBehaviour {
	private float startTime = 0;
	private float bodyStayTime = 15;

	void Start () {
		startTime = Time.time;
	}

	void FixedUpdate () {
		if(startTime + bodyStayTime < Time.time){
			Object.Destroy(gameObject);
		}
	}
}
