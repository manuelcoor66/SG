import * as THREE from '../libs/three.module.js'
import * as MTT from '../libs/MTLLoader.js'
import * as OBJ from '../libs/OBJLoader.js'

class MyObjeto extends THREE.Object3D {
    constructor(gui, titleGui) {
      super();

      this.createGUI(gui, titleGui);

      var material = new MTT.MTLLoader()
      var objeto = new OBJ.OBJLoader();

      var that = this;

      material.load('../models/porsche911/911.mtl',
        function(materiales){
          objeto.setMaterials(materiales);
          objeto.load('../models/porsche911/Porsche_911_GT2.obj',
            function(objetos){
              var obj = objetos;
              that.add(obj);
            },
            null, null);});

    }

    createGUI(gui, titleGui){
      this.guiControls = new function(){
        this.rotY = 0.0;
        this.giro = false;
      }
  
      var folder = gui.addFolder(titleGui);
      folder.add(this.guiControls, 'giro').name('Giro automático: ');
    }
 
   update () {
     this.rotation.y += 0.01;
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

export { MyObjeto }
