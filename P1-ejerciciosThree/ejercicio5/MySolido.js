import * as THREE from '../libs/three.module.js'
import * as CSG from '../libs/CSG-v2.js'

class MySolido extends THREE.Object3D {
    constructor() {
      super();

      // Definimos el material
      var material = new THREE.MeshNormalMaterial();
  
      var cubo = new THREE.BoxGeometry(5,5,5);
      var esfera = new THREE.SphereGeometry(3.4, 20.0, 20.0);
      var cilindro1 = new THREE.CylinderGeometry(1.75, 1.75, 5, 40, 3);
      var cilindro2 = new THREE.CylinderGeometry(1.75, 1.75, 5, 40, 3);
      var cilindro3 = new THREE.CylinderGeometry(1.75, 1.75, 5, 40, 3);
  
      cilindro1.rotateZ(Math.PI/2);
      cilindro1.rotateY(Math.PI/2);
      cilindro3.rotateZ(Math.PI/2);


      var cuboMesh = new THREE.Mesh(cubo, material);
      var esferaMesh = new THREE.Mesh(esfera, material);
      var cilindro1Mesh = new THREE.Mesh(cilindro1, material);
      var cilindro2Mesh = new THREE.Mesh(cilindro2, material);
      var cilindro3Mesh = new THREE.Mesh(cilindro3, material);

      var csg = new CSG.CSG();
      csg.intersect([cuboMesh, esferaMesh]);
      csg.subtract([cilindro1Mesh]);
      csg.subtract([cilindro2Mesh]);
      csg.subtract([cilindro3Mesh]);

      var resultadoMesh = csg.toMesh();
  
      this.add(resultadoMesh);

      this.translateX(15.0);
    }
 
   update () {
     this.rotation.y += 0.01;
     this.rotation.z += 0.01;
     // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
     // Primero, el escalado
     // Segundo, la rotación en Z
     // Después, la rotación en Y
     // Luego, la rotación en X
     // Y por último la traslación
     //this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
     //this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
     //this.scale.set(2*this.guiControls.radius,this.guiControls.height,2*this.guiControls.radius);
   }
} 

export { MySolido }
