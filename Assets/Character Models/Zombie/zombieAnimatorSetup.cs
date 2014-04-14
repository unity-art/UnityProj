﻿using UnityEngine;
using System.Collections;

public class zombieAnimatorSetup{
	public float speedDampTime = 0.1f;
	public float angularSpeedDampTime = 0.7f;
	public float angleResponseTime = 0.6f;

	private Animator anim;
	public HashIDs hash;

	public zombieAnimatorSetup(Animator animator, HashIDs hashids){
		anim = animator;
		hash = hashids;
	}

	public void Setup(float speed, float angle)
	{
		float angularSpeed = angle / angleResponseTime;
		anim.SetFloat (hash.SpeedFloat, speed, speedDampTime, Time.deltaTime);
		anim.SetFloat (hash.DirectionFloat, angularSpeed, angularSpeedDampTime, Time.deltaTime);
	}
}