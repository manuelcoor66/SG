import * as THREE from '../libs/three.module.js'

class ObjetoRevolucion extends THREE.Object3D {
  constructor(gui, titleGui) {
     super();

     // Se crea la parte de la interfaz que corresponde a la caja
     // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
     this.createGUI(gui,titleGui);

     // Puntos
     this.points = [];
     this.points.push(new THREE.Vector3(0.0,0.0,0.0));
     this.points.push(new THREE.Vector3(3.0,0.0,0.0));
     this.points.push(new THREE.Vector3(3.0,1.0,0.0));
     this.points.push(new THREE.Vector3(2.75,1.5,0.0));
     this.points.push(new THREE.Vector3(2.0,2.25,0.0));
     this.points.push(new THREE.Vector3(1.75,3.25,0.0));
     this.points.push(new THREE.Vector3(1.5,4.5,0.0));
     this.points.push(new THREE.Vector3(1.25,6.0,0.0));
     this.points.push(new THREE.Vector3(1.25,7.0,0.0));
     this.points.push(new THREE.Vector3(1.5,7.25,0.0));
     this.points.push(new THREE.Vector3(1.75,7.75,0.0));
     this.points.push(new THREE.Vector3(2.0,8.5,0.0));
     this.points.push(new THREE.Vector3(2.0,9.0,0.0));
     this.points.push(new THREE.Vector3(1.75,9.75,0.0));
     this.points.push(new THREE.Vector3(1.5,10.25,0.0));
     this.points.push(new THREE.Vector3(1.25,10.5,0.0));
     this.points.push(new THREE.Vector3(0.75,10.75,0.0));
     this.points.push(new THREE.Vector3(0.0,11.0,0.0));

     // Para crear la fugura por revolución
     this.latheGeometry = new THREE.Mesh(new THREE.LatheGeometry(this.points, this.guiControls.segments, this.guiControls.phiStart, this.guiControls.phiLength), new THREE.MeshNormalMaterial());
     this.add(this.latheGeometry);

     // Para crear una línea visible, como en el vídeo
     var lineGeometry = new THREE.BufferGeometry();
     lineGeometry.setFromPoints(this.points);
     this.line = new THREE.Line(lineGeometry, new THREE.MeshNormalMaterial());
     this.line.translateX(1.5);
     this.add(this.line);
     


  }

  createGUI(gui,titleGui) {
     // Controles para el tamaño, la orientación y la posición de la caja
     this.guiControls = new function () {
        this.segments = 10.0;
        this.phiStart = 0.0;
        this.phiLength = 0.0;

        // Un botón para dejarlo todo en su posición inicial
        // Cuando se pulse se ejecutará esta función.
        this.reset = function () {
          this.segments = 10.0;
          this.phiStart = 0.0;
          this.phiLength = 0.0;
        }
     }

     // Se crea una sección para los controles de la caja
     var folder = gui.addFolder(titleGui);
     // Estas lineas son las que añaden los componentes de la interfaz
     // Las tres cifras indican un valor mínimo, un máximo y el incremento
     // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
     var that = this;
     folder.add(this.guiControls, 'segments', 3.0, 30.0, 1.0).name('Resolución : ').onChange(function(value){that.cambiarGeometria()}).listen();
     folder.add(this.guiControls, 'phiStart', 0.0, 6.3, 0.1).name('Inicio : ').onChange(function(value){that.cambiarGeometria()}).listen();
     folder.add(this.guiControls, 'phiLength', 0.0, 6.3, 0.1).name('Ángulo : ').onChange(function(value){that.cambiarGeometria()}).listen();

     folder.add(this.guiControls, 'reset').name('[ Reset ]');
  }

  cambiarGeometria() {
     this.latheGeometry.geometry = new THREE.LatheGeometry(this.points, this.guiControls.segments, this.guiControls.phiStart, this.guiControls.phiLength);
  }

  update() {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
  }
}

export { ObjetoRevolucion }
