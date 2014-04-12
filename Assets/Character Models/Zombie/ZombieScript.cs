using UnityEngine;
using System.Collections;

public class ZombieScript : MonoBehaviour {
	public Transform target;
	public float attackDistance;
	public float aggroDistance;
	public float height;
	public float speed;
	public float rotationSpeed;
	public int attackSpeed;
	public float attackPower;
	private int attackCooldown;
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
		attackPower = 10;
		target = GameObject.FindGameObjectWithTag("Player").transform;
	}
	
	// Update is called once per frame
	void Update () {
		ensureRefIntact();
		// how far are we from the player?
		float currentDist = Vector3.Distance(target.transform.position, transform.position);
		
		// if we are outside of attack distance but inside aggrodistance
		if (currentDist > attackDistance && currentDist < aggroDistance && seePlayer){
			// follow player
			transform.position = Vector3.MoveTowards(transform.position, target.position, speed * Time.deltaTime);
			// transform.rotation = Quaternion.RotateTowards(transform.rotation, target.rotation, rotationSpeed * Time.deltaTime);
			transform.LookAt(target.transform);
			animator.SetFloat("xSpeed", speed * Time.deltaTime);
		}
		
		if (currentDist < attackDistance){
			// in attack range and can attack
			animator.SetBool("InAtkRange", true);
		} else {
			// not in attack range
			animator.SetBool("InAtkRange", false);
		}
		
		if (attackCooldown <= 0){
			animator.SetBool ("AttackCooldown", false);
			attackCooldown = attackSpeed;
		} else {
			animator.SetBool ("AttackCooldown", true);
		}
		Camera cam = this.camera;
		Plane[] planes = GeometryUtility.CalculateFrustumPlanes(cam);
		if (GeometryUtility.TestPlanesAABB(planes,target.collider.bounds)){
			//if true, player is in camera view, raycast at player head for further check
			Debug.Log("see player");
			animator.SetBool("DetectPlayer", true);
			seePlayer = true;
		} else {
			animator.SetBool("DetectPlayer", false);
			seePlayer = false;
		}
		attackCooldown--;
	}
	
	bool seePlayer;
	private void ensureRefIntact(){
		if (target == null){
			this.enabled = false;
		}
	}
}
