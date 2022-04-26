import * as THREE from '../libs/three.module.js'


class MyReloj extends THREE.Object3D {
  constructor(gui) {
  super();

  // Se crea la parte de la interfaz que corresponde a la caja
  // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
  this.createGUI(gui);
  
  var verde = new THREE.MeshBasicMaterial({color: 0x00ff00});
  var rojo = new THREE.MeshBasicMaterial({color: 0x0ff0000});

  this.esfera_rotando = this.createSphere(1,10,10,rojo);
  this.esfera_rotando.position.set(0, 0, -11);

  this.esfera_roja = new THREE.Object3D();
  this.esfera_roja.add(this.esfera_rotando);

  this.reloj = new THREE.Object3D();
  this.reloj.add(this.esfera_roja);

  for (var i = 0; i < 2*Math.PI; i+=Math.PI/6) {
    this.esfera_hora = this.createSphere(1,10,10, verde);
    this.esfera_hora.position.set(15 * Math.cos(i), 0, 15 * Math.sin(i));
    this.reloj.add(this.esfera_hora);
  }


  this.add(this.reloj);

  this.tiempo = Date.now(); 
  }

  createSphere(x,y,z, material){
    var sphereGeom = new THREE.SphereBufferGeometry (x,y,z);

    var sphere = new THREE.Mesh (sphereGeom, material);

    return sphere;
  }


  createGUI (gui) {
    this.guiControls = {
      velocidad : 1.0,

      reset : () => {
        this.guiControls.velocidad = 1.0;
      }
    }


    var folder = gui.addFolder("Controles");
    folder.add(this.guiControls, 'velocidad', -12, 12, 1).name('Marca: ').listen();   
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  update () {
    var t_act = Date.now();
    var seg = (t_act - this.tiempo)/1000;
    this.esfera_roja.rotation.y += seg * this.guiControls.velocidad*Math.PI/6;
    this.tiempo = t_act;
  }
}

export { MyReloj }
