import * as THREE from '../libs/three.module.js'
import * as CSG from '../libs/CSG-v2.js'

class MyTaza extends THREE.Object3D {
   constructor() {
      super();

      // Definimos el material
      var material = new THREE.MeshNormalMaterial();

      // Previamente se crean las geometrías
      var cilExt = new THREE.CylinderGeometry(5, 5, 10, 24, 1);
      var cilInt = new THREE.CylinderGeometry(4.7, 4.7, 10, 24, 1);
      var toro = new THREE.TorusGeometry(3, 0.5, 24, 24);

      // Se posicionan y orientan
      cilInt.translate(0, 0.3, 0);
      toro.translate(-5, 0, 0);

      // Se construyen los Meshes
      var cilExtMesh = new THREE.Mesh(cilExt, material);
      var cilIntMesh = new THREE.Mesh(cilInt, material);
      var toroMesh = new THREE.Mesh(toro, material);

      // Se crea el objeto CSG y se opera con él
      var csg = new CSG.CSG();
      csg.union([cilExtMesh, toroMesh]); // CORCHETES OBLIGATORIOS
      csg.subtract([cilIntMesh]); // aunque solo haya 1 parámetro

      // Y finalmente
      var resultadoMesh = csg.toMesh();

      // Y añadirlo como hijo del Object3D (el this)
      this.add(resultadoMesh);
   }
 
   update() {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación

      this.rotation.y += 0.01;

   }
}

export { MyTaza }
