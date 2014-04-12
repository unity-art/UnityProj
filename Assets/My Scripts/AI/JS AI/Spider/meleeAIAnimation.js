private var minimumRunSpeed = 3.0;

function Start () {
	// Set all animations to loop
	animation.wrapMode = WrapMode.Loop;

	// Except our action animations, Dont loop those
	animation["attack1"].wrapMode = WrapMode.Once;
	animation["attack2"].wrapMode = WrapMode.Once;
	animation["taunt"].wrapMode = WrapMode.Once;
	animation["jump"].wrapMode = WrapMode.Once;
	animation["hit1"].wrapMode = WrapMode.Once;
	animation["hit2"].wrapMode = WrapMode.Once;
	animation["death1"].wrapMode = WrapMode.Once;
	animation["death2"].wrapMode = WrapMode.Once;	
	//animation["shoot"].speed = 1.75;
	// Put idle and run in a lower layer. They will only animate if our action animations are not playing
	animation["idle"].layer = -1;
	animation["walk"].layer = -1;
	animation["run"].layer = -1;
	
	animation.Stop();
}

function SetSpeed (speed : float) {
	if (speed > minimumRunSpeed){
		animation.CrossFade("run");
	}else{
		if(speed > 0){
			animation.CrossFade("walk");
		}else{
			animation.CrossFade("idle");
		}
	}
}