var slider : float;
var slider2 : float;
var Hour : float;
private var Tod: float;

var sun: Light;

var speed = 50;

var NightFogColor : Color;
var DuskFogColor : Color;
var MorningFogColor : Color;
var MiddayFogColor : Color;

var NightAmbientLight : Color;
var DuskAmbientLight : Color;
var MorningAmbientLight : Color;
var MiddayAmbientLight : Color;

var NightTint : Color;
var DuskTint : Color;
var MorningTint : Color;
var MiddayTint : Color;

var SkyBoxMaterial1 : Material;
var SkyBoxMaterial2 : Material;

var SunNight : Color;
var SunDay : Color;

//THIS WAS ADDED IN TUTORIAL NUMBER 24. It allows for changing the color that reflects of a water object.
//Uncheck IncludeWater if you are not interested in using this.
var Water : GameObject;
var Water2 : GameObject;
var Water3 : GameObject;
var Water4 : GameObject;
var Water5 : GameObject;
var Water6 : GameObject;
var Water7 : GameObject;
var Water8 : GameObject;
var Water9 : GameObject;
var Water10 : GameObject;
var Water11 : GameObject;
var Water12 : GameObject;
var Water13 : GameObject;
var Water14 : GameObject;


var IncludeWater = false;
var WaterNight : Color;
var WaterDay : Color;


function OnGUI () {

if(slider >= 1.0)
{
	slider = 0;
}

///GUI slider size, location VALVE... comment out to disable!
//slider= GUI.HorizontalSlider( Rect(20,20,200,30), slider, 0,1.0);
Hour= slider*24;
Tod= slider2*24;
///sun that rotates
sun.transform.localEulerAngles = Vector3((slider*360)-90, 0, 0);
///movement of the slider based on time, doesn't change b/c of frame rate
slider = slider +Time.deltaTime/speed;
//sun colour Lerp to change colours
sun.color = Color.Lerp (SunNight, SunDay, slider*2);

//THIS WAS ADDED IN TUTORIAL NUMBER 24. It allows for changing the color that reflects of a water object.
//Uncheck IncludeWater if you are not interested in using this.
if (IncludeWater == true)
{
	Water.renderer.material.SetColor("_horizonColor", Color.Lerp (WaterNight, WaterDay, slider2*2-0.2));
	Water2.renderer.material.SetColor("_horizonColor", Color.Lerp (WaterNight, WaterDay, slider2*2-0.2));
	Water3.renderer.material.SetColor("_horizonColor", Color.Lerp (WaterNight, WaterDay, slider2*2-0.2));
	Water4.renderer.material.SetColor("_horizonColor", Color.Lerp (WaterNight, WaterDay, slider2*2-0.2));
	Water5.renderer.material.SetColor("_horizonColor", Color.Lerp (WaterNight, WaterDay, slider2*2-0.2));
	Water6.renderer.material.SetColor("_horizonColor", Color.Lerp (WaterNight, WaterDay, slider2*2-0.2));
	Water7.renderer.material.SetColor("_horizonColor", Color.Lerp (WaterNight, WaterDay, slider2*2-0.2));
	Water8.renderer.material.SetColor("_horizonColor", Color.Lerp (WaterNight, WaterDay, slider2*2-0.2));
	Water9.renderer.material.SetColor("_horizonColor", Color.Lerp (WaterNight, WaterDay, slider2*2-0.2));
	Water10.renderer.material.SetColor("_horizonColor", Color.Lerp (WaterNight, WaterDay, slider2*2-0.2));
	Water11.renderer.material.SetColor("_horizonColor", Color.Lerp (WaterNight, WaterDay, slider2*2-0.2));
	Water12.renderer.material.SetColor("_horizonColor", Color.Lerp (WaterNight, WaterDay, slider2*2-0.2));
	Water13.renderer.material.SetColor("_horizonColor", Color.Lerp (WaterNight, WaterDay, slider2*2-0.2));
	Water14.renderer.material.SetColor("_horizonColor", Color.Lerp (WaterNight, WaterDay, slider2*2-0.2));
}

if(slider<0.5){
slider2= slider;
}
if(slider>0.5){
slider2= (1-slider);
}

///sun's intensity changes based on slider
sun.intensity = (slider2-0.2)*1.3;


if(Tod<4){
//it is Night
RenderSettings.skybox=SkyBoxMaterial1;
RenderSettings.skybox.SetFloat("_Blend", 0);
SkyBoxMaterial1.SetColor ("_Tint", NightTint);
RenderSettings.ambientLight = NightAmbientLight;
RenderSettings.fogColor = NightFogColor;
}
if(Tod>4&&Tod<6){
RenderSettings.skybox=SkyBoxMaterial1;
RenderSettings.skybox.SetFloat("_Blend", 0);
RenderSettings.skybox.SetFloat("_Blend", (Tod/2)-2);
SkyBoxMaterial1.SetColor ("_Tint", Color.Lerp (NightTint, DuskTint, (Tod/2)-2) );
RenderSettings.ambientLight = Color.Lerp (NightAmbientLight, DuskAmbientLight, (Tod/2)-2);
RenderSettings.fogColor = Color.Lerp (NightFogColor,DuskFogColor, (Tod/2)-2);
//it is Dusk

}
if(Tod>6&&Tod<8){
RenderSettings.skybox=SkyBoxMaterial2;
RenderSettings.skybox.SetFloat("_Blend", 0);
RenderSettings.skybox.SetFloat("_Blend", (Tod/2)-3);
SkyBoxMaterial2.SetColor ("_Tint", Color.Lerp (DuskTint,MorningTint,  (Tod/2)-3) );
RenderSettings.ambientLight = Color.Lerp (DuskAmbientLight, MorningAmbientLight, (Tod/2)-3);
RenderSettings.fogColor = Color.Lerp (DuskFogColor,MorningFogColor, (Tod/2)-3);
//it is Morning

}
if(Tod>8&&Tod<10){
RenderSettings.ambientLight = MiddayAmbientLight;
RenderSettings.skybox=SkyBoxMaterial2;
RenderSettings.skybox.SetFloat("_Blend", 1);
SkyBoxMaterial2.SetColor ("_Tint", Color.Lerp (MorningTint,MiddayTint,  (Tod/2)-4) );
RenderSettings.ambientLight = Color.Lerp (MorningAmbientLight, MiddayAmbientLight, (Tod/2)-4);
RenderSettings.fogColor = Color.Lerp (MorningFogColor,MiddayFogColor, (Tod/2)-4);

//it is getting Midday

}
}