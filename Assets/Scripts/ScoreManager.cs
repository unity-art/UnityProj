using UnityEngine;
using System.Collections;

public class ScoreManager : MonoBehaviour {
	public static int score;
	// Use this for initialization
	void Start () {
		score = 0;
	}
	
	public int EndLevel(int timeElapsed){
		score += (int) Time.timeSinceLevelLoad;
		return score;
	}
}
