#pragma strict

private var firstName : String = "First Name";
private var lastName : String = "Last Name";

private var submitted : boolean = false;

private var windowRect0 : Rect;
 
function Start()
{
}
 
function OnGUI()
{
    var screenWidth = Screen.width;
    var screenHeight = Screen.height;
     
    var windowWidth = 300;
    var windowHeight = 180;
    var windowX = ( screenWidth - windowWidth ) / 2;
    var windowY = ( screenHeight - windowHeight ) / 2;
     
    
    windowRect0 = Rect( windowX, windowY, windowWidth, windowHeight );
 
    GUILayout.Window( 0, windowRect0, UserForm, "PLAYER INFO" );
}
 
function UserForm()
{
    GUILayout.BeginVertical();
     
   
    GUILayout.BeginHorizontal();
    GUILayout.Label("First Name", GUILayout.Width(80));
    firstName = GUILayout.TextField( firstName );
    GUILayout.EndHorizontal();
     
    
    GUILayout.BeginHorizontal();
    GUILayout.Label("Last Name", GUILayout.Width(80));
    lastName = GUILayout.TextField( lastName );
    GUILayout.EndHorizontal();
     
   
    
     
    if ( GUILayout.Button( "Submit" ) )
    {
        submitted = true;
        Application.LoadLevel(1);
    }
    if ( GUILayout.Button( "Reset" ) )
    {
        firstName = "First Name";
        lastName = "Last Name";
       
        submitted = false;
    }
     
   
    GUILayout.EndVertical();
}