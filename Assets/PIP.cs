using UnityEngine;
using System.Collections;

public class PIP : MonoBehaviour {

	bool pip = true;
	void Update () {
		if (Input.GetKeyDown("p")){
			if (pip) {
				transform.camera.depth = -9;
				pip = false;
			} else {
				transform.camera.depth = 9;
				pip = true;
			}
		}
	}
	void OnGui() {
		GUILayout.Label("Test");
	}
}
