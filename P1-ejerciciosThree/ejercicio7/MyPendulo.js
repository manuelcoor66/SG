import * as THREE from '../libs/three.module.js'


class MyPendulo extends THREE.Object3D {
  constructor(gui) {
  super();

  // Se crea la parte de la interfaz que corresponde a la caja
  // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
  this.createGUI(gui);

  //Variables de animación

  this.escaladoPequeño = true;
  this.escaladoGrande = true;
  this.rotPequeño = true;
  this.rotGrande = true;
  this.rotando = true;

  var verde = new THREE.MeshBasicMaterial({color: 0x00ff00});
  var rojo = new THREE.MeshBasicMaterial({color: 0x0ff0000});
  var morado = new THREE.MeshBasicMaterial({color: 0x8d4b8e});
  var azul = new THREE.MeshBasicMaterial({color: 0x0000ff});

  this.pequeño_size = new THREE.Vector3(2,10,1);
  this.caja_pequeñaA = this.createBox(2,10,1, azul);
  this.caja_pequeñaA.position.set(0, -this.pequeño_size.y/2, this.pequeño_size.z/2);

  this.caja_pequeñaB = new THREE.Object3D();
  this.caja_pequeñaB.add(this.caja_pequeñaA);
  this.caja_pequeñaB.position.y = this.pequeño_size.y/10;

  this.tuercaPequeña_size = new THREE.Vector3(0.25, 10.0, 10.0);
  this.tuercaPequeña = this.createtuerca(0.25, 10.0, 10.0, morado);
  this.tuercaPequeña.position.z = this.pequeño_size.z;

  this.cajaRoja_size = new THREE.Vector3(4,5,2);
  this.cajaRojaA = this.createBox(4,5,2,rojo);
  this.cajaRojaA.position.set(0,-this.cajaRoja_size.y/2,this.cajaRoja_size.z/2);

  this.cajaRojaB = new THREE.Object3D();
  this.cajaRojaB.add(this.cajaRojaA);

  this.cajaVerde_size = new THREE.Vector3(4,4,2);
  this.cajaVerdeInf = this.createBox(4,4,2,verde);
  this.cajaVerdeInf.position.z = this.cajaVerde_size.z/2;

  this.caja_pequeña = new THREE.Object3D();
  this.caja_pequeña.add(this.caja_pequeñaB);
  this.caja_pequeña.add(this.tuercaPequeña);

  this.cajaVerdeSup= this.createBox(4,4,2,verde);
  this.cajaVerdeSup.position.z = this.cajaVerde_size.z/2;

  this.tuercaGrande_size = new THREE.Vector3(0.75, 10.0, 10.0);
  this.tuercaGrande = this.createtuerca(0.75, 10.0, 10.0, morado);
  this.tuercaGrande.position.z = this.cajaVerde_size.z;

  this.unionPiezas = new THREE.Object3D();
  this.unionPiezas.add(this.caja_pequeña);
  this.unionPiezas.add(this.cajaRojaB);
  this.unionPiezas.add(this.cajaVerdeInf);
  this.unionPiezas.position.y = -this.cajaVerde_size.y/2;

  this.pendulo = new THREE.Object3D();
  this.pendulo.add(this.tuercaGrande);
  this.pendulo.add(this.cajaVerdeSup);
  this.pendulo.add(this.unionPiezas);

  //Nodo final
  this.add(this.pendulo);

  }

  createBox(x,y,z, material){
    var boxGeom = new THREE.BoxBufferGeometry (x,y,z);

    var box = new THREE.Mesh (boxGeom, material);

    return box;
  }

  createtuerca(x,y,z, material){
    var tuercaGeom = new THREE.SphereBufferGeometry(x,y,z);

    // Ya podemos construir el Mesh
    var tuerca = new THREE.Mesh (tuercaGeom, material);

    return tuerca;
  }


    createGUI (gui) {

      // La escena le va a añadir sus propios controles.
      // Se definen mediante una   new function()
      // En este caso la intensidad de la luz y si se muestran o no los ejes
      this.guiControls = new function() {
        this.animacionOnOff = false;
        this.porcentaje = 10;
        this.rotZpequeño = 0;
        this.rotZgrande = 0;
        this.scaleYpequeño = 10;
        this.scaleYgrande = 5;
      }

      // Se crea una sección para los controles de esta clase
      var foldercaja_pequeña = gui.addFolder ("Péndulo Pequeño");
      // Y otro para mostrar u ocultar los ejes
      foldercaja_pequeña.add (this.guiControls, 'rotZpequeño', -Math.PI/4, Math.PI/4, Math.PI/180).name ('Rotación Z : ').listen();
      foldercaja_pequeña.add (this.guiControls, 'scaleYpequeño', 10, 20, 0.1).name ('Tamaño Y : ').listen();
      foldercaja_pequeña.add (this.guiControls, 'porcentaje', 10, 90, 1).name ('% : ').listen();

      var folderPenduloGrande = gui.addFolder ("Péndulo Grande");
      folderPenduloGrande.add (this.guiControls, 'rotZgrande', -Math.PI/4, Math.PI/4, Math.PI/180).name ('Rotación Z : ').listen();
      folderPenduloGrande.add (this.guiControls, 'scaleYgrande', 5,10, 0.1).name ('Tamaño Y: ').listen();

      var folder = gui.addFolder("Controles de la Animación");
      folder.add (this.guiControls, 'animacionOnOff').name ('Animación activa : ');

  }

  update () {
    this.caja_pequeñaB.scale.set(1,this.guiControls.scaleYpequeño/this.pequeño_size.y,1);
    this.caja_pequeña.rotation.z = this.guiControls.rotZpequeño;
    this.caja_pequeña.position.set(0,-this.guiControls.scaleYgrande*this.guiControls.porcentaje/100,this.cajaRoja_size.z);
    this.cajaRojaB.scale.set(1,this.guiControls.scaleYgrande/this.cajaRoja_size.y,1);
    this.cajaVerdeInf.position.y = -this.guiControls.scaleYgrande -this.cajaVerde_size.y/2;
    this.pendulo.rotation.z = this.guiControls.rotZgrande;


    if (this.guiControls.animacionOnOff){

      if(this.guiControls.scaleYpequeño < this.pequeño_size.y*2 && this.escaladoPequeño){
        this.guiControls.scaleYpequeño += 0.1;
        if(this.guiControls.scaleYpequeño >= this.pequeño_size.y*2) this.escaladoPequeño = false;
      }
      else if(this.guiControls.scaleYpequeño > this.pequeño_size.y && !this.escaladoPequeño){
        this.guiControls.scaleYpequeño -= 0.1;
        if(this.guiControls.scaleYpequeño <= this.pequeño_size.y) this.escaladoPequeño = true;
      }

      if(this.guiControls.rotZpequeño < Math.PI/4 && this.rotPequeño){
        this.guiControls.rotZpequeño += Math.PI/180;
        if(this.guiControls.rotZpequeño >= Math.PI/4) this.rotPequeño = false;
      }
      else if(this.guiControls.rotZpequeño > -Math.PI/4 && !this.rotPequeño){
        this.guiControls.rotZpequeño -= Math.PI/180;
        if(this.guiControls.rotZpequeño <= -Math.PI/4) this.rotPequeño = true;
      }

      if(this.guiControls.porcentaje < 90 && this.rotando){
        this.guiControls.porcentaje += 1;
        if(this.guiControls.porcentaje >= 90) this.rotando = false;
      }
      else if(this.guiControls.porcentaje > 10 && !this.rotando){
        this.guiControls.porcentaje -= 1;
        if(this.guiControls.porcentaje <= 10) this.rotando = true;
      }

      if(this.guiControls.scaleYgrande < this.cajaRoja_size.y*2 && this.escaladoGrande){
        this.guiControls.scaleYgrande += 0.1;
        if(this.guiControls.scaleYgrande >= this.cajaRoja_size.y*2) this.escaladoGrande = false;
      }
      else if(this.guiControls.scaleYgrande > this.cajaRoja_size.y && !this.escaladoGrande){
        this.guiControls.scaleYgrande -= 0.1;
        if(this.guiControls.scaleYgrande <= this.cajaRoja_size.y) this.escaladoGrande = true;
      }

      if(this.guiControls.rotZgrande < Math.PI/4 && this.rotGrande){
        this.guiControls.rotZgrande += Math.PI/180;
        if(this.guiControls.rotZgrande >= Math.PI/4) this.rotGrande = false;
      }
      else if(this.guiControls.rotZgrande > -Math.PI/4 && !this.rotGrande){
        this.guiControls.rotZgrande -= Math.PI/180;
        if(this.guiControls.rotZgrande <= -Math.PI/4) this.rotGrande = true;
      }
    }
  }
}

export { MyPendulo }
