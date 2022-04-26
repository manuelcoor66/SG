import * as THREE from '../libs/three.module.js'
import * as COCHE from '../ejercicio6/MyObjeto.js'
import * as TWEEN from '../libs/tween.esm.js'


class MyRecorrido extends THREE.Object3D {
  constructor(gui, titlegui) {
  super();

  // Se crea la parte de la interfaz que corresponde a la caja
  // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
  this.createGUI(gui, titlegui);
  this.clock = new THREE.Clock();
  
  this.coche = new COCHE.MyObjeto(gui, 'Coche');

  this.path = [
    new THREE.Vector3(-10, 0, 0),
    new THREE.Vector3(-10, 8, 0),
    new THREE.Vector3(0, 10, 0),
    new THREE.Vector3(10, 8, 0),
    new THREE.Vector3(10, 0, 0),
  ];

  this.curva = new THREE.CatmullRomCurve3(this.path);
  
  var puntos = this.curva.getPoints(50);
  var geometry = new THREE.BufferGeometry().setFromPoints(puntos);

  this.add(this.coche);

  // Para pintar el recorrido
  var material_8 = new THREE.LineBasicMaterial({color: 0x000000});
  var spline = new THREE.Line(geometry, material_8);
  
  this.add(spline);

  var origen = {p: 0}
  var destino = {p: 1}

  this.movement = new TWEEN.Tween(origen).to(destino, 4000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(() => {
      var posicion = this.curva.getPointAt(origen.p)
      this.coche.position.copy(posicion)

      // var tangente = this.path.getTangentAt(origen.p)
      // posicion.add(tangente)
      // this.auriculares.lookAt(posicion)
    })
    .onComplete(() => {origen.p = 0;})
    .repeat(Infinity)
    .yoyo(true)
    .start()
  }

  createSphere(x,y,z, material){
    var sphereGeom = new THREE.SphereBufferGeometry (x,y,z);

    var sphere = new THREE.Mesh (sphereGeom, material);

    return sphere;
  }

  createMovement(){
    
  }


  createGUI (gui,titleGui) {
    this.guiControls = {
      speed : 2.0,
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      reset : () => {
        this.guiControls.speed = 2.0;
      }
    }

    var folder = gui.addFolder (titleGui);

    folder.add (this.guiControls, 'speed', 2, 8, 1).name ('Segundos/vuelta : ').listen();
        
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }
  
  update () {
    this.segundosTranscurridos = this.clock.getDelta();
    //this.coche.rotation.y +=  2 * Math.PI * this.segundosTranscurridos / this.guiControls.speed ;
    TWEEN.update();
  }
}

export { MyRecorrido }
