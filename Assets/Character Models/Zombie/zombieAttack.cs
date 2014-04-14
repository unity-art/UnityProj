using UnityEngine;
using System.Collections;

public class zombieAttack : MonoBehaviour {

	public float maxDamage = 20f;
	public float minDamage = 10f;
	public AudioClip biteClip;

	private Animator anim;
	private HashIDs hash;
	private Transform player;
	//private PlayerStatsV2 playerHealth;
	private bool attacking;
	private float scaleDamage;

	void Awake()
	{
		anim = GetComponent<Animator>();
		player = GameObject.FindGameObjectWithTag("Player").transform;
		//playerHealth = player.gameObject.GetComponent<PlayerStatsV2>();
		hash = GameObject.FindGameObjectWithTag("GameController").GetComponent<HashIDs>();

		scaleDamage = maxDamage - minDamage;
	}

	void Update()
	{
		float attackingFloat = anim.GetFloat (hash.atking);

		if (attackingFloat > 0.5f && !attacking)
			Attack();
		if (attackingFloat < 0.5f) {
			attacking = false;
		}
	}

	void Attack() {
		attacking = true;
		float damage = minDamage + Random.seed*scaleDamage;
		//playerHealth.ApplyDammage(damage);
	}

}