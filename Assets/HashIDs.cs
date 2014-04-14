using UnityEngine;
using System.Collections;

public class HashIDs : MonoBehaviour {

	public int walkingState;
	public int detectPlayerBool;
	public int inAtkRangeBool;
	public int atking;
	public int atkidle;
	public int notatking;
	public int SpeedFloat;
	public int DirectionFloat;
	public int atkWeightFloat;

	void Awake(){
		walkingState = Animator.StringToHash ("Base Layer.Locomotion");
		detectPlayerBool = Animator.StringToHash("DetectPlayer");
		inAtkRangeBool = Animator.StringToHash("InAtkRange");
		atking = Animator.StringToHash("Attack.attack");
		atkidle = Animator.StringToHash("Attack.attack idle");
		notatking = Animator.StringToHash("Attack.New State");
		SpeedFloat = Animator.StringToHash("Speed");
		DirectionFloat = Animator.StringToHash("Direction");
		atkWeightFloat = Animator.StringToHash("AtkWeight");
	}
}