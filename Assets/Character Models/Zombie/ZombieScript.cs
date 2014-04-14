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
	private HashIDs hash;
	private zombieAnimatorSetup animSetup;
	public float deadZone = 5f;
	private NavMeshAgent nav;
	// Use this for initialization
	void Awake () {
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
		nav = GetComponent<NavMeshAgent>();
		hash = GameObject.FindGameObjectWithTag("GameController").GetComponent<HashIDs>();

		nav.updateRotation = false;

		animSetup = new zombieAnimatorSetup(animator, hash);
		animator.SetLayerWeight(1,1f);
		deadZone *= Mathf.Deg2Rad;
	}
	void OnAnimatorMove(){
		nav.velocity = animator.deltaPosition / Time.deltaTime;
		transform.rotation = animator.rootRotation;
	}
	// Update is called once per frame
	void Update () {
		NavAnimSetup ();
		// how far are we from the player?
		float currentDist = Vector3.Distance(target.transform.position, transform.position);
		
		// if we are outside of attack distance but inside aggrodistance
		if (currentDist > attackDistance && currentDist < aggroDistance && seePlayer){
			// follow player
			transform.position = Vector3.MoveTowards(transform.position, target.position, speed * Time.deltaTime);
			// transform.rotation = Quaternion.RotateTowards(transform.rotation, target.rotation, rotationSpeed * Time.deltaTime);
			transform.LookAt(target.transform);
			animator.SetFloat("Speed", speed * Time.deltaTime);
		} else {
			rigidbody.isKinematic = false;
			rigidbody.velocity = Vector3.zero;
			rigidbody.isKinematic = true;
		}
		/*
		if (currentDist < attackDistance){
			// in attack range and can attack
			animator.SetBool("InAtkRange", true);
		} else {
			// not in attack range
			animator.SetBool("InAtkRange", false);
		}*/

		Camera cam = this.camera;
		Plane[] planes = GeometryUtility.CalculateFrustumPlanes(cam);
		if (GeometryUtility.TestPlanesAABB(planes,target.collider.bounds)){
			//if true, player is in camera view, raycast at player head for further check
			Debug.Log("see player");
			animator.SetBool("DetectPlayer", true);
			animator.SetLayerWeight(1,1f);
			seePlayer = true;
		} else {
			animator.SetBool("DetectPlayer", false);
			animator.SetLayerWeight(0,1f);
			seePlayer = false;
		}
		attackCooldown--;
	}

	void NavAnimSetup(){
		float speed;
		float angle;
		if (seePlayer){
			speed = Vector3.Project (nav.desiredVelocity, transform.forward).magnitude;
			angle = findAngle( transform.forward, nav.desiredVelocity, transform.up);
			if (Mathf.Abs(angle) < deadZone){
				transform.LookAt (transform.position + nav.desiredVelocity);
				angle = 0f;
			}
		} else {
			speed = 0f;
			angle = findAngle(transform.forward, target.position - transform.position, transform.up);
		}

		animSetup.Setup (speed, angle);
	}
	float findAngle(Vector3 fromVector, Vector3 toVector, Vector3 upVector){
		if (toVector == Vector3.zero){
			return 0f;
		}
		float angle = Vector3.Angle(fromVector, toVector);
		Vector3 normal = Vector3.Cross(fromVector, toVector);
		angle *= Mathf.Sign(Vector3.Dot(normal, upVector));
		angle *= Mathf.Deg2Rad;

		return angle;
	}
	bool seePlayer;
	private void ensureRefIntact(){
		if (target == null){
			this.enabled = false;
		}
	}
}
