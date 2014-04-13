	using UnityEngine;
	using System.Collections;
	
	public class EndScreen2 : MonoBehaviour
	{
	public string[] intro = {
		"Thanks for Playing, Brave Adventurer",
		"\n",
		"********",
		"\n",
		"COMP 305: FINAL Project - \" Game Name HERE \"",
		"\n",
		"*******",
		"\n",
		"Team Members:",	
		"\n",
		"Clement \"I don't understand why my Prefab is broken\" Ma",
		"\n",
		"Jared \"Everything is Cooler with a Giant Spider\" St. Croix",
		"\n",
		"Jian \"Why Aren't we coding in BOO script?\" Guo",
		"\n",
		"Pardeep \"There's not nearly enough Women in this group \" Kaur"	
	};
	
	public GUISkin skin;
	
		public float off ;
		public float speed = -20;
		
		public void OnGUI()
		{
		
			GUI.skin = skin;			
			off += Time.deltaTime * speed;
			for (int i = 0; i < intro.Length; i++)
			{
				float roff = (intro.Length*-20) + (i*20 + off);
				float alph = Mathf.Sin((roff/Screen.height)*180*Mathf.Deg2Rad);
				GUI.color = new Color(1,1,1, alph);
				GUI.Label(new Rect(0,roff,Screen.width, 80),intro[i]);
				GUI.color = new Color(1,1,1,1);
			}
			
			if ( GUILayout.Button( "Back to Intro" ) )
			{
				Application.LoadLevel("INTRO");
			}
				
			// We can throw in High Scores here
		}
		
	}

