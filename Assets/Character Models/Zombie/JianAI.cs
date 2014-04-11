using UnityEngine;
using System.Collections;

public class JianAI : MonoBehaviour {
	public Transform target;
	public float attackDistance;
	public float aggroDistance;
	public float height;
	public float speed;
	public float rotationSpeed;
	public int attackSpeed;
	public float attackPower;
	private int attackCooldown;
	private int attackAnimation;
	private int attackAnimationCooldown;
	private Animator animator;
	// Use this for initialization
	void Start () {
		animator = GetComponent<Animator>();
		attackDistance = 4;// MELEE RANGE
		aggroDistance = 30;
		height = 1;
		speed = 6; // 
		rotationSpeed = 60;
		attackSpeed = 60;
		attackCooldown = 0;
		attackAnimation = 10;
		attackAnimationCooldown = 0;
		attackPower = 10;
		target = GameObject.FindGameObjectWithTag("Player").transform;
	}
	
	// Update is called once per frame
	void Update () {
		ensureRefIntact();
		// how far are we from the player?
		float currentDist = Vector3.Distance(target.transform.position, transform.position);

		// if we are outside of attack distance but inside aggrodistance
		if (currentDist > attackDistance && currentDist < aggroDistance){
			// follow player
			transform.position = Vector3.MoveTowards(transform.position, target.position, speed * Time.deltaTime);
			// transform.rotation = Quaternion.RotateTowards(transform.rotation, target.rotation, rotationSpeed * Time.deltaTime);
			transform.LookAt(target.transform);
			animator.SetFloat("xSpeed", speed * Time.deltaTime);
		} else {
			//rigidbody.velocity = Vector3.zero;
		}
		if (currentDist < attackDistance && attackCooldown <= 0){
			// in attack range and can attack
			animator.SetBool("InAtkRange", true);
			animator.SetBool("DetectPlayer", true);
			animator.SetBool ("AttackCooldown", false);
			attackCooldown = attackSpeed;
			attackAnimationCooldown = attackAnimation;
		} else if (currentDist < attackDistance && attackCooldown > 0){
			// in attack range but cant attack
			animator.SetBool ("AttackCooldown", true);
		} else {
			// not in attack range
			animator.SetBool("InAtkRange", false);
			animator.SetBool ("AttackCooldown", false);
		}
		Debug.Log("wtf");
		
		attackAnimationCooldown--;
		attackCooldown--;
		// if zombie is still in range and but attack is still cooling down
		
		 /*else {
			animator.SetBool("InAtkRange", false);
			animator.SetBool("DetectPlayer", false);
		}*/
	}

	private void ensureRefIntact(){
		if (target == null){
			this.enabled = false;
		}
	}
}
