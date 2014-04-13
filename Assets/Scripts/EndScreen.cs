using UnityEngine;
using System.Collections;

public class EndScreen : MonoBehaviour {
	
	public float off;
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void OnGUI () {
	
		string text = "Some long text \nSome Other Text \nYet More";
	
		string[] intro = {
		"This",
		"That",
		"Those"
		};
	
		off += (Time.deltaTime*50);
		GUI.Label(new Rect(0,0 + off,Screen.width, 1000),text);
	}
}
