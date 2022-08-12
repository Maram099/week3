

#include <Servo.h>

Servo gripper;
Servo wrist;
Servo elbow;
Servo shoulder;
Servo base;

double base_angle=90;
double shoulder_angle=90;
double elbow_angle=90;
double wrist_angle=90;
double gripper_angle=0;

void setup() {
  Serial.begin(9600);
  base.attach(8);
  shoulder.attach(9);
  elbow.attach(10);
  wrist.attach(11);
  gripper.attach(12);

  base.write(90);
  shoulder.write(90);
  elbow.write(90);
  wrist.write(90); 
  gripper.write(0);
}

void loop() {
   if (Serial.available() > 0) {
  int dir = Serial.parseInt();;
  
  if (dir != 1 || dir != 2) {
    return;
  }
 // 1 = right 
 // 2 = left
  

    if (dir == 1) { 
      base.write(base_angle + 90);//180
    }
    if (dir == 2) {
     base.write(base_angle - 90);//0
    }

  
  delay(1000);
   }
}
