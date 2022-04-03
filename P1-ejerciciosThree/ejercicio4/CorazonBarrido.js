import * as THREE from '../libs/three.module.js'

class CorazonBarrido extends THREE.Object3D {
   constructor() {
      super();

      const heartShape = new THREE.Shape();

      heartShape.moveTo( 2.5, 2.5 );
      heartShape.bezierCurveTo( 2.5, 2.5, 2.0, 0, 0, 0 );
      heartShape.bezierCurveTo( - 3.0, 0, - 3.0, 3.5, - 3.0, 3.5 );
      heartShape.bezierCurveTo( - 3.0, 5.5, - 1.0, 7.7, 2.5, 9.5 );
      heartShape.bezierCurveTo( 6.0, 7.7, 8.0, 5.5, 8.0, 3.5 );
      heartShape.bezierCurveTo( 8.0, 3.5, 8.0, 0, 5.0, 0 );
      heartShape.bezierCurveTo( 3.5, 0, 2.5, 2.5, 2.5, 2.5 );

      const extrudeSettings = { depth: 1, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

      const geometriaBarrido = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
		// Material
      var materialBarrido = new THREE.MeshNormalMaterial();
      
      // Formar nodos de rotación y translación para la animación
      this.ab = new THREE.Mesh(geometriaBarrido, materialBarrido);   // Geometría del Barrido

      this.cd = new THREE.Object3D();  // Nodo que mantiene verticalidad y se fija a una distancia x
      //this.cd.position.x = -20; // Transformación fija
      this.cd.add(this.ab);

      this.e = new THREE.Object3D();   // Nodo que rota sobre el eje z a la distancia definida
      this.e.add(this.cd);

      // Y añadirlo como hijo del Object3D (el this)
      this.add(this.e);
   }
 
   update() {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      this.e.rotation.z += 0.02;
      this.ab.rotation.x += 0.02;
      this.cd.rotation. x += 0.02;
   }
}

export { CorazonBarrido }